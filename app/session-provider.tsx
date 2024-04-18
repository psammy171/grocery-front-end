"use client";

import { SessionProvider } from "next-auth/react";
import SessionLoader from "./session-loader";

const Session = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SessionLoader>{children}</SessionLoader>
    </SessionProvider>
  );
};

export default Session;
