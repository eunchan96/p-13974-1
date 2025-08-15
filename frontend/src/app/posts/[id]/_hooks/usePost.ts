import { useEffect, useState } from "react";
import client from "@/lib/backend/client";
import type { components } from "@/lib/backend/apiV1/schema";

type PostWithContentDto = components["schemas"]["PostWithContentDto"];
type RsDataVoid = components["schemas"]["RsDataVoid"];

export default function usePost(id: number) {
  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    client
      .GET("/api/v1/posts/{id}", {
        params: {
          path: {
            id,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(`${res.error.resultCode} : ${res.error.msg}`);
          return;
        }
        setPost(res.data);
      });
  }, [id]);

  const deletePost = (onSuccess: () => void) => {
    client
      .DELETE("/api/v1/posts/{id}", {
        params: {
          path: {
            id,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(`${res.error.resultCode} : ${res.error.msg}`);
          return;
        }
        onSuccess();
      });
  };

  const modifyPost = (
    title: string,
    content: string,
    onSuccess: (data: RsDataVoid) => void,
  ) => {
    client
      .PUT("/api/v1/posts/{id}", {
        params: {
          path: {
            id,
          },
        },
        body: {
          title,
          content,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(`${res.error.resultCode} : ${res.error.msg}`);
          return;
        }
        onSuccess(res.data);
      });
  };

  return { id, post, deletePost, modifyPost };
}
