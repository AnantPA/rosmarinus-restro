"use client";

import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "#kitchens", label: "Our menu" },
  { href: "#evenings", label: "Evenings" },
  { href: "#evenings", label: "Banquets" },
  { href: "#visit", label: "Find us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="wrap bar">
        <a className="brand" href="#top" aria-label="Rosmarinus Restro, back to top">
          <Image src="/images/logo-gold.png" alt="" width={40} height={52} priority />
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
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav className={`nav${open ? " open" : ""}`} id="site-nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-teal" href="#book" onClick={close}>
            Book a table
          </a>
        </nav>
      </div>
    </header>
  );
}
