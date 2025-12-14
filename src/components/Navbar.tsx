"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
   { href: "/", label: "Anasayfa" },
   { href: "/about", label: "Hakkında" }, 
   { href: "/progress", label: "Süreç" },
   { href: "/results", label: "Sonuçlar" },
   { href: "/demo", label: "Demo" },
 
 

];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight text-zinc-100">
          <span className="text-violet-300">ML</span> Film Tür Tahmini
        </Link>

        <nav className="flex items-center gap-2">
          {nav.map((x) => {
            const active = pathname === x.href;
            return (
              <Link
                key={x.href}
                href={x.href}
                className={[
                  "rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "bg-violet-600/20 text-violet-200 ring-1 ring-violet-600/40"
                    : "text-zinc-200 hover:bg-zinc-900 hover:text-white",
                ].join(" ")}
              >
                {x.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
