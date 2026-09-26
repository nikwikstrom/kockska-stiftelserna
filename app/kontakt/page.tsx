import type { Metadata } from "next";
import { InteriorPage } from "@/components/interior-page";

export const metadata: Metadata = {
  title: "Kontakt | Kockska stiftelserna",
  description: "Telefon, e-post och besöksadress till Kockska stiftelserna i Trelleborg.",
};

export default function ContactPage() {
  return (
    <InteriorPage eyebrow="Kontakt" title="Vi hjälper dig vidare." intro="Hör av dig om ansökningar, stiftelsernas verksamhet eller hur du hittar rätt information." source="Kontaktuppgifter enligt stiftelsernas nuvarande webbplats, kontrollerad 27 september 2026.">
      <section className="shell interior-section"><div className="text-split"><p className="eyebrow">Kansliet</p><div className="contact-large"><a href="tel:+4641013320">0410-133 20</a><a href="mailto:info@kockskastiftelsen.se">info@kockskastiftelsen.se</a><address>Lejonhjälmsgränd 14 A<br />231 43 Trelleborg</address><p>Besök efter överenskommelse. Kontaktperson enligt nuvarande webbplats: Kurt Dahlman.</p></div></div></section>
      <section className="interior-band"><div className="shell text-split"><p className="eyebrow">Ansökningar</p><div><h2>Fråga innan du skickar känsliga uppgifter.</h2><p>Om din ansökan innehåller personnummer, ekonomiska handlingar eller medicinska intyg: kontakta kansliet för aktuell blankett och anvisning om säker inlämning. Skicka inte sådana uppgifter i ett vanligt e-postmeddelande.</p><a className="text-link" href="/sok-stod">Se stödformerna</a></div></div></section>
    </InteriorPage>
  );
}
