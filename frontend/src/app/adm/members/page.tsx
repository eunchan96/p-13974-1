"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";
import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { useEffect, useState } from "react";
import Link from "next/link";

type MemberWithUsernameDto = components["schemas"]["MemberWithUsernameDto"];

export default function Page() {
  const [members, setMembers] = useState<MemberWithUsernameDto[] | null>(null);
  const { isLogin, isAdmin } = useAuthContext();

  useEffect(() => {
    client
      .GET("/api/v1/adm/members")
      .then((res) => res.data && setMembers(res.data));
  }, []);

  if (!isLogin) return <div>로그인 후 이용해주세요.</div>;
  if (!isAdmin) return <div>관리자 권한이 없습니다.</div>;

  if (members == null) return <div>로딩중...</div>;

  return (
    <>
      <h1>회원 목록</h1>
      {members.length == 0 && <div>회원이 없습니다.</div>}

      {members.length > 0 && (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <Link href={`/members/${member.id}`}>
                {member.id} : {member.username} / {member.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
