import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { useEffect, useState } from "react";

type PostCommentDto = components["schemas"]["PostCommentDto"];
type RsDataPostCommentDto = components["schemas"]["RsDataPostCommentDto"];
type RsDataVoid = components["schemas"]["RsDataVoid"];

export default function usePostComments(postId: number) {
  const [postComments, setPostComments] = useState<PostCommentDto[] | null>(
    null,
  );

  useEffect(() => {
    client
      .GET("/api/v1/posts/{postId}/comments", {
        params: {
          path: {
            postId,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(`${res.error.resultCode} : ${res.error.msg}`);
          return;
        }
        setPostComments(res.data);
      });
  }, [postId]);

  const deleteComment = (
    commentId: number,
    onSuccess: (data: RsDataPostCommentDto) => void,
  ) => {
    client
      .DELETE("/api/v1/posts/{postId}/comments/{id}", {
        params: {
          path: {
            id: commentId,
            postId,
          },
        },
      })
      .then((res) => {
        if (res.error) {
          alert(`${res.error.resultCode} : ${res.error.msg}`);
          return;
        }
        if (postComments == null) return;
        setPostComments(
          postComments.filter((comment) => comment.id !== commentId),
        );
        onSuccess(res.data);
      });
  };

  const writeComment = (
    content: string,
    onSuccess: (data: RsDataPostCommentDto) => void,
  ) => {
    client
      .POST("/api/v1/posts/{postId}/comments", {
        params: {
          path: {
            postId,
          },
        },
        body: {
          content,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(`${res.error.resultCode} : ${res.error.msg}`);
          return;
        }
        if (postComments == null) return;
        setPostComments([...postComments, res.data.data]);

        onSuccess(res.data);
      });
  };

  const editComment = (
    commentId: number,
    content: string,
    onSuccess: (data: RsDataVoid) => void,
  ) => {
    client
      .PUT("/api/v1/posts/{postId}/comments/{id}", {
        params: {
          path: {
            id: commentId,
            postId,
          },
        },
        body: {
          content,
        },
      })
      .then((res) => {
        if (res.error) {
          alert(`${res.error.resultCode} : ${res.error.msg}`);
          return;
        }
        if (postComments == null) return;
        setPostComments(
          postComments.map((comment) =>
            comment.id === commentId ? { ...comment, content } : comment,
          ),
        );

        onSuccess(res.data);
      });
  };

  return { postId, postComments, deleteComment, writeComment, editComment };
}
