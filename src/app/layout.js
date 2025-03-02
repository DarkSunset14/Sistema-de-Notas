import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sistema de Notas",
  description: " evaluar y registrar el rendimiento académico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      
      <main className="mx-10 h-[calc(100vh-5rem)]">
        <SessionProvider>{children}</SessionProvider>
      </main>
    </body>
  </html>
  );
}
