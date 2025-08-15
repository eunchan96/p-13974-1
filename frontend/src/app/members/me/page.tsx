"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";

export default function Page() {
  const { isLogin, loginMember } = useAuthContext();

  if (!isLogin) return <div>로그인 후 이용해주세요.</div>;

  return (
    <>
      <h1>내 정보</h1>

      <div>ID : {loginMember.id}</div>
      <div>가입 : {loginMember.createDate}</div>
      <div>수정 : {loginMember.modifyDate}</div>
      <div>이름 : {loginMember.name}</div>
    </>
  );
}
