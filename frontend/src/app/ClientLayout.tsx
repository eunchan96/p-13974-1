"use client";

import { useAuthContext } from "@/global/auth/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loginMember, isLogin, logout: _logout } = useAuthContext();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL as string;
  const redirectUrl = encodeURIComponent(`${frontendBaseUrl}/members/me`);

  const kakaoLoginUrl = `${apiBaseUrl}/oauth2/authorization/kakao?redirectUrl=${redirectUrl}`;
  const googleLoginUrl = `${apiBaseUrl}/oauth2/authorization/google?redirectUrl=${redirectUrl}`;

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
            <>
              <Link
                href="/members/login"
                className="p-2 rounded hover:bg-gray-100"
              >
                로그인
              </Link>
              <a href={kakaoLoginUrl} className="p-2 rounded hover:bg-gray-100">
                카카오 로그인
              </a>
              <a
                href={googleLoginUrl}
                className="p-2 rounded hover:bg-gray-100"
              >
                구글 로그인
              </a>
            </>
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
