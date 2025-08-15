"use client";

import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MemberDto = components["schemas"]["MemberDto"];

function useAuth() {
  const [loginMember, setLoginMember] = useState<MemberDto | null>(null);
  const isLogin = loginMember !== null;

  useEffect(() => {
    client.GET("/api/v1/members/me").then((res) => {
      if (res.error) return;
      setLoginMember(res.data);
    });
  }, []);

  const logout = (onSuccess: () => void) => {
    client.DELETE("/api/v1/members/logout").then((res) => {
      if (res.error) {
        alert(`${res.error.resultCode} : ${res.error.msg}`);
        return;
      }
      onSuccess();
    });
  };

  if (isLogin) return { loginMember, isLogin: true, logout } as const;
  return { loginMember: null, isLogin: false, logout } as const;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loginMember, isLogin, logout: _logout } = useAuth();

  const logout = () => {
    _logout(() => router.replace("/"));
  };

  return (
    <>
      <header>
        <nav className="flex gap-4">
          <Link href="/" className="p-2 rounded hover:bg-gray-100">
            메인
          </Link>
          <Link href="/posts" className="p-2 rounded hover:bg-gray-100">
            글 목록
          </Link>
          {!isLogin && (
            <Link
              href="/members/login"
              className="p-2 rounded hover:bg-gray-100"
            >
              로그인
            </Link>
          )}
          {isLogin && (
            <button
              onClick={logout}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              로그아웃
            </button>
          )}
          {isLogin && (
            <Link href="/members/me" className="p-2 rounded hover:bg-gray-100">
              {loginMember.name}님의 정보
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="text-center p-2">푸터</footer>
    </>
  );
}
