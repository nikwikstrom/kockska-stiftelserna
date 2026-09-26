import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";
import { supportAreas } from "@/content/expanded";

export const metadata: Metadata = {
  title: "Sök stöd | Kockska stiftelserna",
  description: "Hitta rätt stöd för privatpersoner, föreningar, äldre och medicinska forskare.",
};

export default function SupportOverview() {
  return (
    <InteriorPage eyebrow="Sök stöd" title="Hitta rätt väg till stöd." intro="Stiftelserna har olika ändamål och ansökningssätt. Börja med den väg som beskriver dig eller din organisation bäst." source="Uppgifterna är bearbetade från stiftelsernas nuvarande webbplats, kontrollerad 27 september 2026. Aktuella villkor bekräftas av kansliet.">
      <section className="shell interior-section" aria-labelledby="support-options">
        <h2 id="support-options" className="section-title">Vem söker?</h2>
        <div className="directory-list">
          {supportAreas.map((area, index) => <a className="directory-row" href={'/sok-stod/' + area.slug} key={area.slug}><span className="directory-index">0{index + 1}</span><span><strong>{area.title}</strong><small>{area.intro}</small></span><span aria-hidden="true">↗</span></a>)}
        </div>
      </section>
      <section className="interior-band" aria-labelledby="other-support"><div className="shell text-split"><p className="eyebrow">Andra stödformer</p><div><h2 id="other-support">Stipendier och riktade anslag</h2><p>Fromma stiftelsen stöder också stipendier via Söderslättsgymnasiet, musikhögskolor och Kulturskolan samt utvecklingsarbete vid lasarettet och Folktandvården i Trelleborg. Mottagare utses i flera fall genom respektive skola eller verksamhet.</p><a className="text-link" href="/vad-vi-gor#stipendier">Se alla stipendier och anslag</a></div></div></section>
    </InteriorPage>
  );
}
