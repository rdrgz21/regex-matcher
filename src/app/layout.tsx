import type { Metadata } from "next";
import "./globals.css";
import { RegexProvider } from "@/context/RegexContext";

export const metadata: Metadata = {
  title: "Regex Matcher",
  description: "Regex Matcher",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RegexProvider>{children}</RegexProvider>
      </body>
    </html>
  );
}
