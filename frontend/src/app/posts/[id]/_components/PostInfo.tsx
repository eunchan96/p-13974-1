"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import usePost from "../_hooks/usePost";

export default function PostInfo({
  postState,
}: {
  postState: ReturnType<typeof usePost>;
}) {
  const router = useRouter();
  const { post, deletePost: _deletePost } = postState;

  if (post == null) {
    return <div>로딩중...</div>;
  }

  const deletePost = () => {
    if (!confirm(`${post.id}번 글을 정말 삭제하시겠습니까?`)) return;

    _deletePost(() => router.replace("/posts"));
  };

  return (
    <>
      <div>번호 : {post.id}</div>
      <div>제목 : {post.title}</div>
      <div style={{ whiteSpace: "pre-line" }}>내용 : {post.content}</div>

      <div className="flex gap-2">
        <button
          className="border rounded p-2 cursor-pointer"
          onClick={deletePost}
        >
          삭제
        </button>
        <Link className="border rounded p-2" href={`/posts/${post.id}/edit`}>
          수정
        </Link>
      </div>
    </>
  );
}
