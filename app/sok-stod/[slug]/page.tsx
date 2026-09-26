import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/interior-page";
import { supportAreas } from "@/content/expanded";

export function generateStaticParams() {
  return supportAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = supportAreas.find((item) => item.slug === slug);
  return { title: area ? `${area.title} | Kockska stiftelserna` : "Sök stöd | Kockska stiftelserna", description: area?.intro };
}

export default async function SupportDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = supportAreas.find((item) => item.slug === slug);
  if (!area) notFound();

  return (
    <InteriorPage eyebrow="Sök stöd" title={area.title} intro={area.intro} source="Villkor och datum är bearbetade från stiftelsernas nuvarande webbplats, kontrollerad 27 september 2026. Kontakta kansliet för aktuell blankett och slutlig bedömning.">
      <section className="shell interior-section">
        <div className="text-split"><p className="eyebrow">{area.foundation}</p><div className="fact-stack">{area.facts.map((fact) => <section key={fact.title}><h2>{fact.title}</h2><p>{fact.text}</p></section>)}</div></div>
      </section>
      <section className="interior-band"><div className="shell text-split"><p className="eyebrow">Nästa steg</p><div><h2>Så går du vidare.</h2><p>{area.action}</p>{"documentUrl" in area && <p><a className="text-link" href={area.documentUrl} download>{area.documentLabel} <span aria-hidden="true">↗</span></a></p>}{"applicationUrl" in area && <a className="dark-button" href={area.applicationUrl} target="_blank" rel="noopener noreferrer">Öppna ansökningstjänsten <span aria-hidden="true">↗</span></a>}<p><a className="text-link" href="mailto:info@kockskastiftelsen.se">info@kockskastiftelsen.se</a> · <a className="text-link" href="tel:+4641013320">0410-133 20</a></p></div></div></section>
    </InteriorPage>
  );
}
