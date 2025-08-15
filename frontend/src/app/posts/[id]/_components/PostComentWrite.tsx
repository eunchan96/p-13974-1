"use client";

import usePostComments from "../_hooks/usePostComments";

export default function PostCommentWrite({
  postCommentsState,
}: {
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const { writeComment } = postCommentsState;

  const handleCommentWriteFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const content = form.elements.namedItem("content") as HTMLTextAreaElement;
    content.value = content.value.trim();

    if (content.value.length === 0) {
      alert("댓글 내용을 입력해주세요.");
      content.focus();
      return;
    }

    if (content.value.length < 2) {
      alert("댓글 내용을 2자 이상 입력해주세요.");
      content.focus();
      return;
    }

    writeComment(content.value, (data) => {
      alert(data.msg);
      content.value = "";
    });
  };

  return (
    <form
      className="flex gap-2 p-2 items-center"
      onSubmit={handleCommentWriteFormSubmit}
    >
      <textarea
        className="border rounded p-2"
        name="content"
        placeholder="댓글 내용"
        maxLength={5000}
        rows={5}
      />
      <button className="border rounded p-2 cursor-pointer" type="submit">
        작성
      </button>
    </form>
  );
}
