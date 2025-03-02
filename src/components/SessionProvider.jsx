"use client"; // Esto convierte al componente en un componente cliente.

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

const SessionProvider = ({ children }) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;