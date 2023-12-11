"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const AuthProvider = ({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
