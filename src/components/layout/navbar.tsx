"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, siteConfig } from "@/lib/content";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink-800/80 bg-surface/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink-50 font-sans font-bold tracking-tight text-[1.05rem]"
          aria-label={`${siteConfig.name} — Accueil`}
        >
          <LogoMark />
          <span>{siteConfig.name}</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-ink-800 bg-ink-900/60 p-1 backdrop-blur-xl">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "text-ink-950"
                        : "text-ink-200 hover:text-ink-50",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gold"
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">Audit gratuit</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-800 bg-ink-900/60 text-ink-50 cursor-pointer"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink-800 bg-surface/95 backdrop-blur-xl">
          <nav aria-label="Navigation mobile" className="container mx-auto py-4">
            <ul className="flex flex-col">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block border-b border-ink-800 py-3 text-base",
                        active
                          ? "text-gold font-medium"
                          : "text-ink-200",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-4">
                <Button asChild variant="primary" size="md" className="w-full">
                  <Link href="/contact">Audit gratuit</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </motion.header>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center">
      <span className="absolute inset-0 rounded-lg bg-gold/20 blur-md" aria-hidden="true" />
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="relative"
      >
        <rect
          x="2"
          y="2"
          width="24"
          height="24"
          rx="6"
          fill="#0F0F11"
          stroke="#EAB308"
          strokeWidth="1.25"
        />
        <path
          d="M8 17L12 12.5L16 15.5L20 10"
          stroke="#EAB308"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="10" r="1.5" fill="#EAB308" />
      </svg>
    </span>
  );
}
