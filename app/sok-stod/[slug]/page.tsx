import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/interior-page";
import { ApplicationGuide, ResearchApplication } from "@/components/application-guide";
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
    <InteriorPage parent={{ label: "Sök stöd", href: "/sok-stod" }} eyebrow="Sök stöd" title={area.title} intro={area.intro} source="Villkor och originalhandlingar kontrollerade 27 september 2026. Stiftelsen bedömer din ansökan.">
      <nav className="shell page-jumps" aria-label="På den här sidan"><a href="#ansokan">Till ansökan och checklista ↓</a><a href="/sok-stod">Alla stödformer</a></nav>
      <section className="shell interior-section">
        <div className="text-split"><p className="eyebrow">{area.foundation}</p><div className="fact-stack">{area.facts.map((fact) => <section key={fact.title}><h2>{fact.title}</h2><p>{fact.text}</p></section>)}</div></div>
      </section>
      <div className="shell interior-section">{slug === "medicinsk-forskning" ? <ResearchApplication /> : <ApplicationGuide kind={slug as "privatpersoner" | "foreningar" | "aldre"} />}</div>
      <section className="interior-band"><div className="shell"><h2>Mer om stiftelsens uppdrag</h2><a className="text-link" href={slug === "aldre" ? "/stiftelserna/hemmet-for-gamla" : slug === "medicinsk-forskning" ? "/stiftelserna/medicinsk-forskning" : "/stiftelserna/fromma"}>Fullständiga verksamhetsuppgifter och villkor →</a></div></section>
    </InteriorPage>
  );
}
