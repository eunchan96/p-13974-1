"use client";

import type { components } from "@/global/backend/apiV1/schema";
import { useState } from "react";
import usePostComments from "../_hooks/usePostComments";

type PostCommentDto = components["schemas"]["PostCommentDto"];

export default function PostCommentListItem({
  comment,
  postCommentsState,
}: {
  comment: PostCommentDto;
  postCommentsState: ReturnType<typeof usePostComments>;
}) {
  const [editMode, setEditMode] = useState(false);

  const { deleteComment: _deleteComment, editComment } = postCommentsState;

  const deleteComment = (commentId: number) => {
    if (!confirm(`${commentId}번 댓글을 정말 삭제하시겠습니까?`)) return;

    _deleteComment(commentId, (data) => {
      alert(data.msg);
    });
  };

  const toggleEditComment = () => {
    setEditMode(!editMode);
  };

  const handleCommentEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    editComment(comment.id, content.value, (data) => {
      alert(data.msg);
      toggleEditComment();
    });
  };

  return (
    <li className="flex gap-2 items-start">
      <span>{comment.id} : </span>
      {!editMode ? (
        <span className="whitespace-pre-line">{comment.content}</span>
      ) : (
        <form
          className="flex gap-2 items-start"
          onSubmit={handleCommentEditFormSubmit}
        >
          <textarea
            className="border rounded p-2"
            name="content"
            defaultValue={comment.content}
            placeholder="댓글 내용"
            maxLength={100}
            rows={5}
            autoFocus
          />
          <button className="border rounded p-2 cursor-pointer" type="submit">
            저장
          </button>
        </form>
      )}
      <button
        className="border rounded p-2 cursor-pointer"
        onClick={toggleEditComment}
      >
        {editMode ? "수정취소" : "수정"}
      </button>
      <button
        className="border rounded p-2 cursor-pointer"
        onClick={() => deleteComment(comment.id)}
      >
        삭제
      </button>
    </li>
  );
}
