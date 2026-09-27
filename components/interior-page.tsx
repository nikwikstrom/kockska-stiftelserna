import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";

export function InteriorPage({ eyebrow, title, intro, children, source, parent }: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  source?: string;
  parent?: { label: string; href: string };
}) {
  return (
    <>
      <a href="#main" className="skip-link">Hoppa till innehåll</a>
      <SiteHeader />
      <main id="main" className="interior-page">
        <div className="shell interior-intro">
          <nav className="breadcrumb" aria-label="Brödsmulor"><a href="/">Startsida</a><span aria-hidden="true"> / </span>{parent && <><a href={parent.href}>{parent.label}</a><span aria-hidden="true"> / </span></>}<span aria-current="page">{parent ? title : eyebrow}</span></nav>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="interior-lead">{intro}</p>
        </div>
        {children}
        {source && <p className="shell interior-source">{source}</p>}
      </main>
      <SiteFooter contact={siteContent.contact} />
    </>
  );
}
