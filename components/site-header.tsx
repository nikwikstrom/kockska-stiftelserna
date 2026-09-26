"use client";

import Image from "next/image";

const navigation = [
  { label: "Sök stöd", href: "/#sok-stod" },
  { label: "Vad vi gör", href: "/#vad-vi-gor" },
  { label: "Historien", href: "/om-kockska/historia" },
  { label: "Aktuellt", href: "/#aktuellt" },
  { label: "Kontakt", href: "/#kontakt" },
];

function Wordmark() {
  return (
    <a className="wordmark" href="/" aria-label="Kockska stiftelserna, till startsidan">
      <Image src="/brand/kockska-wordmark-navy.svg" alt="Greta och Johan Kocks stiftelser" width={411} height={50} priority />
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Huvudnavigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Meny"><span>Meny</span><span className="menu-lines" aria-hidden="true" /></summary>
          <nav aria-label="Mobilnavigation">
            {navigation.map((item) => <a key={item.href} href={item.href} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>{item.label}</a>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
