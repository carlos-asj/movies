import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oscar Movies",
  description: "Sorteie filmes do vencedores do Oscar para assistir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#870007] min-h-screen">{children}</body>
    </html>
  );
}
