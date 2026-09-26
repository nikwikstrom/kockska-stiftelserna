import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";
import { foundationAreas } from "@/content/expanded";

export const metadata: Metadata = {
  title: "Stiftelserna och deras ändamål | Kockska stiftelserna",
  description: "Lär känna Fromma stiftelsen, Hemmet för gamla och Försköningsstiftelsen.",
};

export default function FoundationsPage() {
  return (
    <InteriorPage eyebrow="Stiftelserna" title="Flera ändamål. Ett gemensamt arv." intro="Greta och Johan Kocks gåva lever vidare genom stiftelser med olika uppdrag. Här finns de juridiska namnen och vad verksamheterna betyder i praktiken." source="Ändamål och historiska uppgifter är bearbetade från stiftelsernas nuvarande webbplats, kontrollerad 27 september 2026.">
      <section className="shell interior-section">
        <div className="directory-list">
          {foundationAreas.map((area, index) => <article className="foundation-row" id={area.id} key={area.id}><span className="directory-index">0{index + 1}</span><div><p className="overline">{area.subtitle}</p><h2>{area.title}</h2><p>{area.text}</p><a className="text-link" href={area.href}>Läs vidare <span aria-hidden="true">↗</span></a></div></article>)}
        </div>
      </section>
      <section className="interior-band"><div className="shell text-split"><p className="eyebrow">Arv och ansvar</p><div><h2>Hur stiftelserna kom till.</h2><p>Greta och Johan Kock gifte sig 1891. Efter deras död 1941 respektive 1945 gick kvarlåtenskapen enligt deras förordnande till tre stiftelser. En släktstiftelse är senare avvecklad. Hemmet för gamla bildades i början av 1950-talet.</p><p>Styrelsen fördelar anslag utifrån respektive stiftelses ändamål. Ett vetenskapligt råd bereder forskningsansökningar innan styrelsen beslutar.</p><div className="inline-links"><a className="text-link" href="/om-kockska/historia">Läs historien</a><a className="text-link" href="/om-kockska/organisation">Styrelse och organisation</a></div></div></div></section>
    </InteriorPage>
  );
}
