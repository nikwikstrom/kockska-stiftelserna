"use client";

import { useState } from "react";
import { DigitalApplication } from "./digital-application";

const guides = {
  privatpersoner: {
    document: "/dokument/privatpersoner-ansokan-2026.pdf",
    eligibility: "Du bor i Trelleborgs kommun och söker för barns eller ungas vård, fostran eller utbildning, eller för behov hos äldre, sjuka eller personer med funktionsnedsättning. Stiftelsen bedömer varje ansökan individuellt.",
    deadline: "Ansökningstider: 1 april och 1 oktober.",
    checklist: ["Fyll i sökande och eventuell medsökande, hushållets inkomster, tillgångar och skulder.", "Beskriv ändamålet, sökt belopp och tidigare eller annat sökt stöd.", "Bifoga senaste beslut om slutlig skatt och underlag som styrker hushållets ekonomi.", "Bifoga relevanta intyg om du åberopar särskilda omständigheter.", "Läs integritetspolicyn och låt sökande och eventuell medsökande underteckna."],
  },
  foreningar: {
    document: "/dokument/foreningar-ansokan-2025.pdf",
    eligibility: "Föreningar och organisationer i Trelleborg kan söka. Om en lokal förening saknas kan en regional organisation med Trelleborgsanknytning komma i fråga. Verksamheten ska rikta sig till barn och unga eller behövande äldre, sjuka eller personer med funktionsnedsättning. Elitsatsningar och utpräglad tävlingsidrott får inte bidrag.",
    deadline: "Anvisningen anger 1 april för särskilda ändamål och 1 april eller 1 oktober för nya projekt eller ny verksamhet. Kontakta kansliet om vilken omgång er ansökan tillhör.",
    checklist: ["Fyll i organisationsuppgifter, ändamål, verksamhet, sökt belopp och motiv.", "Bifoga aktuella stadgar.", "Bifoga senaste årsberättelse, resultat- och balansräkning, revisionsberättelse och aktuell styrelsesammansättning.", "Bifoga årets budget och ekonomisk kalkyl för det ni söker stöd till.", "Redovisa tidigare och annat sökt stöd, läs integritetspolicyn och underteckna blanketten."],
  },
  aldre: {
    document: "/dokument/bostadsbidrag-ansokan-2026.pdf",
    eligibility: "Bostadsbidrag riktar sig till mindre bemedlade äldre i Trelleborg. Du behöver inte bo i stiftelsens tidigare fastigheter. Blanketten omfattar också andra bidrag till behövande äldre och sjuka.",
    deadline: "Bostadsbidrag kan sökas hela året. För annat stöd gäller 1 april och 1 oktober.",
    checklist: ["Välj bostadsbidrag eller annat bidrag i blanketten och fyll i sökande och eventuell medsökande.", "Fyll i hushållets inkomster, boendekostnader, tillgångar och andra bidrag.", "Bifoga hyreskontrakt och senaste beslut om slutlig skatt.", "Bifoga relevanta intyg och beskriv särskilda behov om sådana åberopas.", "Kontrollera årsbeloppen med kansliet, läs integritetspolicyn och underteckna."],
  },
} as const;

export function ApplicationGuide({ kind }: { kind: keyof typeof guides }) {
  const guide = guides[kind];
  const [checked, setChecked] = useState<number[]>([]);
  return <section id="ansokan" className="application-guide" aria-labelledby="application-title">
    <div className="section-heading-grid"><p className="eyebrow">Din ansökan</p><div><h2 id="application-title">Från blankett till inlämning.</h2><p>Använd stiftelsens blankett. Förbered underlaget, kontrollera underskrifterna och välj inlämningssätt nedan.</p></div></div>
    <ol className="application-steps">
      <li><span className="step-number" aria-hidden="true">01</span><div><h3>Kontrollera villkoren</h3><p>{guide.eligibility}</p><p><strong>{guide.deadline}</strong></p>{kind === "aldre" && <p className="notice">Originalblanketten innehåller både 2025 och 2026 års beloppsuppgifter. Be kansliet bekräfta vilka belopp som gäller innan du lämnar in. Blanketten återges oförändrad.</p>}</div></li>
      <li><span className="step-number" aria-hidden="true">02</span><div><h3>Hämta och fyll i blanketten</h3><div className="inline-links"><a className="dark-button" href={guide.document} target="_blank" rel="noopener noreferrer">Öppna ansökningsblankett (PDF) ↗</a><a className="text-link" href={guide.document} download>Ladda ned</a></div><p>Skriv ut blanketten om din PDF-läsare inte stöder ifyllnad. Pappersblankett kan också beställas på <a href="tel:+4641013320">0410-133 20</a>.</p><p><a href="/dokument/ansokningsanvisningar.pdf">Läs understödsfondens anvisning (PDF)</a> · <a href="/integritet">Läs integritetspolicyn</a></p></div></li>
      <li><span className="step-number" aria-hidden="true">03</span><div><h3>Kontrollera bilagor och underskrifter</h3><p>Kryssa av det du har förberett. Checklistan skickas inte och sparas inte när sidan stängs.</p><fieldset className="application-checklist"><legend className="sr-only">Checklista före inlämning</legend>{guide.checklist.map((text, i) => <label key={text}><input type="checkbox" checked={checked.includes(i)} onChange={(e) => setChecked(e.target.checked ? [...checked, i] : checked.filter(n => n !== i))} /><span>{text}</span></label>)}</fieldset><p className="checklist-status" role="status">{checked.length} av {guide.checklist.length} punkter kontrollerade.{checked.length === guide.checklist.length && " Underlaget är genomgånget. Nästa steg är att lämna in din undertecknade ansökan."}</p></div></li>
      <li><span className="step-number" aria-hidden="true">04</span><div><DigitalApplication kind={kind} /><details className="postal-alternative"><summary>Alternativ: skicka ansökan med post</summary><h3>Post till kansliet</h3><p>Skicka den undertecknade blanketten med bilagor till stiftelsernas kansli:</p><address>Greta och Johan Kocks stiftelser<br />Lejonhjälmsgränd 14 A<br />231 43 Trelleborg</address><p>Du har inte lämnat in en ansökan genom att använda checklistan eller ladda ned blanketten. Kontakta kansliet om du behöver bekräftelse på att postförsändelsen kommit fram.</p><a className="text-link" href="/kontakt">Kontakta kansliet →</a></details></div></li>
    </ol>
  </section>;
}

export function ResearchApplication() {
  return <section id="ansokan" className="application-guide" aria-labelledby="application-title"><p className="eyebrow">Digital ansökan</p><h2 id="application-title">Sök forskningsmedel i Stiftelseapp.</h2><p><a className="text-link" href="/sok-stod/forskningsmiljostod">Forskningsmiljöstöd 2026 – avslutad utlysning →</a></p><p>Projektutlysningen 2026: 8 september–18 oktober 2026 kl. 24.00. Högst 200 000 kronor per sökande, utbetalning 2027.</p><ol><li>Förbered projektbeskrivning, CV och etikgodkännande från Etikprövningsmyndigheten.</li><li>Logga in i Stiftelseapp. Ansökan kan skrivas på svenska eller engelska. Följ informationsrutorna i formuläret.</li><li>Ange i systemets kryssruta om generativ AI har använts för att formulera text. Redovisa tidigare tilldelade medel när du söker på nytt.</li><li>Slutför inlämningen i Stiftelseapp. Ansökan räknas inte som inskickad förrän du fått systemets bekräftelse via e-post.</li></ol><div className="inline-links"><a className="dark-button" href="https://kockska.stiftelseapp.se/users/sign_in">Till Stiftelseapp – logga in eller skapa konto ↗</a><a className="text-link" href="/dokument/forskningsmedel-styrdokument-2026.pdf">Styrdokument (PDF)</a></div><p>Stiftelseapp är stiftelsens externa ansökningstjänst. Om bekräftelsen uteblir, kontrollera skräppost och kontakta kansliet. <a href="/integritet">Integritetspolicy</a>.</p></section>;
}
