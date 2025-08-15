"use client";

import { AuthContext } from "@/global/auth/hooks/useAuth";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {
    loginMember = null,
    isLogin = false,
    logout: _logout = () => {},
  } = use(AuthContext) ?? {};

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
              {loginMember?.name}님의 정보
            </Link>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="text-center p-2">푸터</footer>
    </>
  );
}
