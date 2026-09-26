import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";
import { board } from "@/content/expanded";

export const metadata: Metadata = {
  title: "Styrelse och organisation | Kockska stiftelserna",
  description: "Styrelse, kansli, revisorer och vetenskapligt råd hos Kockska stiftelserna.",
};

export default function OrganisationPage() {
  return (
    <InteriorPage eyebrow="Om Kockska" title="Människorna bakom uppdraget." intro="Styrelsen ansvarar för stiftelsernas beslut. För forskningsansökningar finns ett vetenskapligt råd som bereder underlagen." source="Personrollerna återges enligt den nuvarande webbplatsen, kontrollerad 27 september 2026. Stiftelsen behöver bekräfta att uppgifterna gäller den aktuella mandatperioden.">
      <section className="shell interior-section"><div className="text-split"><p className="eyebrow">Styrelsen</p><div><h2>Beslut och förvaltning.</h2><div className="people-list">{board.map(([name, role, appointedBy]) => <div key={name}><h3>{name}</h3><p>{role}</p><small>{appointedBy}</small></div>)}</div><div className="people-list"><div><h3>Kurt Dahlman</h3><p>Verkställande direktör</p><small>Utsedd av stiftelsernas styrelse</small></div></div></div></div></section>
      <section className="interior-band"><div className="shell text-split"><p className="eyebrow">Vetenskapligt råd</p><div><h2>Oberoende granskning.</h2><p>Tre ledamöter granskar forskningsansökningar var för sig. De samråder därefter om prioritering med hänsyn till eventuella jäv. Styrelsen fattar beslut om tilldelning.</p><div className="people-list"><div><h3>Ingemar Petersson</h3><p>Professor emeritus, ordförande</p></div><div><h3>Elisabet Londos</h3><p>Professor</p></div><div><h3>Carl Johan Tiderius</h3><p>Professor</p></div></div></div></div></section>
      <section className="shell interior-section"><div className="text-split"><p className="eyebrow">Granskning</p><div><h2>Revisorer.</h2><div className="people-list"><div><h3>Tom Arnshed</h3><p>Utsedd av Trelleborgs kommunfullmäktige</p></div><div><h3>Nadja Herrlin</h3><p>Släktrevisor</p></div><div><h3>Johan Reventberg</h3><p>Släktrevisor</p></div></div></div></div></section>
    </InteriorPage>
  );
}
