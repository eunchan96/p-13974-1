import type { components } from "@/global/backend/apiV1/schema";
import client from "@/global/backend/client";
import { createContext, use, useEffect, useState } from "react";

type MemberDto = components["schemas"]["MemberDto"];

export default function useAuth() {
  const [loginMember, setLoginMember] = useState<MemberDto>(
    null as unknown as MemberDto,
  );
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
      setLoginMember(null as unknown as MemberDto);
      onSuccess();
    });
  };

  return {
    isLogin,
    isAdmin,
    loginMember,
    logout,
    setLoginMember,
  };
}

export const AuthContext = createContext<ReturnType<typeof useAuth>>(
  null as unknown as ReturnType<typeof useAuth>,
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
