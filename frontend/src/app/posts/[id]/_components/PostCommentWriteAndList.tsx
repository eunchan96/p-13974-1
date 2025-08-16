"use client";

import usePostComments from "../_hooks/usePostComments";
import PostCommentWrite from "./PostComentWrite";
import PostCommentList from "./PostCommentList";

export default function PostCommentWriteAndList({
  postCommentsState,
}: {
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const { postComments } = postCommentsState;

  if (postComments == null) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <PostCommentWrite postCommentsState={postCommentsState} />
      <PostCommentList postCommentsState={postCommentsState} />
    </>
  );
}
