import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";
import { newsItems } from "@/content/expanded";

export const metadata: Metadata = {
  title: "Aktuellt | Kockska stiftelserna",
  description: "Nyheter om forskning, utlysningar och Kockska stiftelsernas arbete.",
};

export default function NewsPage() {
  return (
    <InteriorPage eyebrow="Aktuellt" title="Det som händer nu." intro="Nyheter och utlysningar från stiftelsernas verksamhet. Avslutade ansökningsperioder visas som arkiv, så att gamla möjligheter inte ser öppna ut." source="Artiklarna är redaktionellt sammanfattade från nyhetsarkivet på den nuvarande webbplatsen, kontrollerat 27 september 2026.">
      <section className="shell interior-section" aria-label="Nyhetsarkiv"><div className="news-archive">{newsItems.map((item) => <article key={item.title}><div><span className="overline">{item.category}</span><time>{item.date}</time></div><div><h2>{item.title}</h2><p>{item.text}</p>{"href" in item && <a className="text-link" href={item.href}>Läs vidare <span aria-hidden="true">↗</span></a>}</div></article>)}</div></section>
    </InteriorPage>
  );
}
