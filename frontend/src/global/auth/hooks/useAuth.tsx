import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { createContext, use, useEffect, useState } from "react";

type MemberDto = components["schemas"]["MemberDto"];

export default function useAuth() {
  const [loginMember, setLoginMember] = useState<MemberDto | null>(null);
  const isLogin = loginMember !== null;
  const isAdmin = isLogin && loginMember.isAdmin;

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
      setLoginMember(null);
      onSuccess();
    });
  };

  const baseRs = {
    logout,
    setLoginMember,
    isAdmin,
  };

  if (isLogin) return { loginMember, isLogin: true, ...baseRs } as const;
  return { loginMember: null, isLogin: false, ...baseRs } as const;
}

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(
  null,
);

export function useAuthContext() {
  const authState = use(AuthContext);

  if (authState == null) throw new Error("AuthContext is not found");
  return authState;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authState = useAuth();

  return <AuthContext value={authState}>{children}</AuthContext>;
}
