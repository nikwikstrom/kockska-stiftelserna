import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";
import { SourceContent, sourceHeadings } from "@/components/source-content";
import pages from "@/content/migration/pages.json";

const foundations = [
  { slug: "fromma", source: "fromma-stiftelsen", title: "Fromma stiftelsen", intro: "Understödsfonden fördelar cirka 1,5 miljoner kronor årligen till behov i Trelleborg. Verksamheten omfattar också stipendier och riktade anslag till utbildning och vård.", links: [["Ansök som privatperson", "/sok-stod/privatpersoner"], ["Ansök som förening", "/sok-stod/foreningar"]] },
  { slug: "medicinsk-forskning", source: "fromma-stiftelsen-medicin", title: "Fonden för medicinsk forskning", intro: "Kliniskt patientnära forskning om kroniskt invalidiserande sjukdomar, med särskilt fokus på artros och demens.", links: [["Till forskningsansökan", "/sok-stod/medicinsk-forskning#ansokan"], ["Vetenskapligt råd", "/om-kockska/organisation"]] },
  { slug: "hemmet-for-gamla", source: "hemmet-fr-gamla", title: "Hemmet för gamla", intro: "Bostadsbidrag och stöd till vård av behövande äldre och sjuka i Trelleborg.", links: [["Ansök om bostadsbidrag eller annat stöd", "/sok-stod/aldre#ansokan"]] },
  { slug: "forskoning", source: "frskningsstiftelsen", title: "Försköningsstiftelsen", intro: "Konst, kulturmiljöer och offentliga platser som kommer Trelleborgs invånare till del.", links: [["Utforska konstarkivet", "/vad-vi-gor/konst"], ["Kontakta stiftelsen", "/kontakt"]] },
];
export function generateStaticParams() { return foundations.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const f = foundations.find(f => f.slug === slug);
  return { title: `${f?.title ?? "Stiftelserna"} | Kockska stiftelserna`, description: f?.intro };
}
export default async function Foundation({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const f = foundations.find(f => f.slug === slug); if (!f) notFound();
  const source = pages.find(p => p.slug === f.source)!;
  const html = source.html.slice(1).join("\n");
  const headings = sourceHeadings(html);
  return <InteriorPage parent={{ label: "Stiftelserna", href: "/stiftelserna" }} eyebrow="Stiftelserna" title={f.title} intro={f.intro} source="Verksamhetsuppgifter från stiftelsernas webbplats, kontrollerade 27 september 2026.">
    <nav className="shell page-jumps" aria-label="Gå vidare">{f.links.map(([label, href]) => <a href={href} key={href}>{label} →</a>)}<a href="/stiftelserna">Alla stiftelser</a></nav>
    <section className="shell reading-layout interior-section"><aside><p className="eyebrow">På den här sidan</p>{headings.map(h => <a key={h.id} href={`#${h.id}`}>{h.label}</a>)}{f.links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}<a href="/dokument">Blanketter och dokument</a></aside><div>
      {slug === "medicinsk-forskning" && <p className="notice">Projektutlysning 2026: sista ansökningsdag 18 oktober 2026. Symposiet 23–25 september är avslutat. <a href="/aktuellt">Läs rapporteringen</a>.</p>}
      {slug === "fromma" && <p className="notice">Ansökningsanvisningen skiljer mellan stöd till särskilda ändamål (1 april) och nya projekt eller ny verksamhet (1 april och 1 oktober). <a href="/sok-stod/foreningar#ansokan">Läs guiden innan du ansöker</a>.</p>}
      <SourceContent html={html} />
      {slug === "hemmet-for-gamla" && <a className="dark-button" href="/sok-stod/aldre#ansokan">Blankett och ansökningsguide →</a>}
      {slug === "forskoning" && <a className="dark-button" href="/vad-vi-gor/konst">Se konstverken med bilder och upphovspersoner →</a>}
    </div></section>
  </InteriorPage>;
}
