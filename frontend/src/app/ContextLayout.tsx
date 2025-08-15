"use client";

import useAuth, { AuthContext } from "@/global/auth/hooks/useAuth";
import ClientLayout from "./ClientLayout";

export default function ContextLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authState = useAuth();

  return (
    <AuthContext value={authState}>
      <ClientLayout>{children}</ClientLayout>
    </AuthContext>
  );
}
