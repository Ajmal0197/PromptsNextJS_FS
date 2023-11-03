"use client";

import { SessionProvider } from "next-auth/react";

const AuthSessionProvider = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default AuthSessionProvider;
