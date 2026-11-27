"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#banquets", label: "Banquets" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Find us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const update = () => {
      setScrolled(window.scrollY > 8);
      const mid = window.innerHeight * 0.45;
      // The nav section whose top most recently passed the middle of the screen.
      let current = "";
      let best = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= mid && top > best) {
          best = top;
          current = id;
        }
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="wrap bar">
        <a className="brand" href="#top" aria-label="Rosmarinus Restro, back to top" onClick={close}>
          <Image src="/images/logo-gold.png" alt="" width={36} height={47} priority />
          <span className="brand-name">
            <b>Rosmarinus</b>
            <span>Restro</span>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`burger${open ? " x" : ""}`} aria-hidden="true"><i /><i /><i /></span>
        </button>
        <nav className={`nav${open ? " open" : ""}`} id="site-nav" aria-label="Main">
          <a href="#top" className={active === "" ? "on" : undefined} aria-current={active === "" ? "true" : undefined} onClick={close}>
            Home
          </a>
          {links.map((l) => {
            const on = active === l.href.slice(1);
            return (
              <a key={l.label} href={l.href} className={on ? "on" : undefined} aria-current={on ? "true" : undefined} onClick={close}>
                {l.label}
              </a>
            );
          })}
          <a className="btn btn-gold" href="#book" onClick={close}>
            Book a table
          </a>
        </nav>
      </div>
    </header>
  );
}
