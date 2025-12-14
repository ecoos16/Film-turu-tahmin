import "../globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "ML Film Tür Tahmini",
  description: "Makine Öğrenmesi projesi web sunumu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}

