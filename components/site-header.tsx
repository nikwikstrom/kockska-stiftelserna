"use client";

import Image from "next/image";

const navigation = [
  {
    label: "Sök stöd",
    links: [
      { label: "Översikt", href: "/sok-stod" },
      { label: "Privatpersoner", href: "/sok-stod/privatpersoner" },
      { label: "Föreningar", href: "/sok-stod/foreningar" },
      { label: "Äldre och bostadsbidrag", href: "/sok-stod/aldre" },
      { label: "Medicinsk forskning", href: "/sok-stod/medicinsk-forskning" },
    ],
  },
  {
    label: "Stiftelserna",
    links: [
      { label: "Stiftelserna och deras ändamål", href: "/stiftelserna" },
      { label: "Fromma stiftelsen", href: "/stiftelserna#fromma" },
      { label: "Fromma – medicinsk forskning", href: "/stiftelserna#medicin" },
      { label: "Hemmet för gamla", href: "/stiftelserna#hemmet" },
      { label: "Försköningsstiftelsen", href: "/stiftelserna#forsk" },
    ],
  },
  { label: "Vad vi gör", href: "/vad-vi-gor" },
  {
    label: "Om Kockska",
    links: [
      { label: "Historien", href: "/om-kockska/historia" },
      { label: "Styrelse och organisation", href: "/om-kockska/organisation" },
    ],
  },
  { label: "Aktuellt", href: "/aktuellt" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

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
          {navigation.map((item) => "links" in item ? (
            <details className="nav-group" key={item.label}>
              <summary>{item.label}<span aria-hidden="true">⌄</span></summary>
              <div className="nav-submenu">{item.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div>
            </details>
          ) : <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Meny"><span>Meny</span><span className="menu-lines" aria-hidden="true" /></summary>
          <nav aria-label="Mobilnavigation">
            {navigation.map((item) => "links" in item ? (
              <details className="mobile-nav-group" key={item.label}>
                <summary aria-label={item.label}>{item.label}<span aria-hidden="true">⌄</span></summary>
                <div>{item.links.map((link) => <a key={link.href} href={link.href} aria-label={link.label} onClick={(event) => event.currentTarget.closest(".mobile-nav")?.removeAttribute("open")}>{link.label}</a>)}</div>
              </details>
            ) : <a key={item.href} href={item.href} onClick={(event) => event.currentTarget.closest(".mobile-nav")?.removeAttribute("open")}>{item.label}</a>)}
          </nav>
        </details>
      </div>
    </header>
  );
}
