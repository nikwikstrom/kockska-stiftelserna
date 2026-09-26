# Innehålls- och URL-inventering

Inventering 26 september 2026. Status anger redaktionell avsikt; varje innehållspost kräver slutlig faktakontroll och rättighetskontroll. `MIGRATE` betyder bevara originalfil/data i nya miljön, `REWRITE` betyder omarbeta för besökarens uppgift.

| Källa / nuvarande URL | Typ och innehåll | Åtgärd | Föreslagen destination |
| --- | --- | --- | --- |
| `/` | Översikt, fyra stiftelseblock, forskningslänk, e-bok, kontakt | REWRITE | `/` |
| `/fromma-stiftelsen` | Lokalt stöd, ansökningstider, stipendier, PDF:er | REWRITE + MIGRATE | `/sok-stod/privatperson`, `/sok-stod/forening`, `/vad-vi-gor/stipendier` |
| `/fromma-stiftelsen-medicin` | Forskningsvillkor, 2026-utlysning, bedömning, extern länk | REWRITE + MIGRATE | `/sok-stod/medicinsk-forskning` och strukturerad utlysning |
| `/hemmet-fr-gamla` | Bostadsbidrag och äldreomsorg; inga lägenhetsansökningar sedan 2019 | REWRITE | `/sok-stod/aldre` |
| `/frskningsstiftelsen` | Försköning och 1957–2025 års konstverk/projekt | REWRITE + MIGRATE | `/vad-vi-gor/trelleborg`, `/projekt`, senare `/konstkarta` |
| `/bakgrund` | Greta/Johan, arv, företag och tidslinjeämnen | REWRITE + MIGRATE | `/om-kockska/historia` |
| `/styrelse-och-anstallda` | Styrelse, VD, revisorer, vetenskapligt råd | MIGRATE efter verifiering | `/om-kockska/organisation` |
| `/kontakt` | Adress, telefon, e-post och besök efter överenskommelse | KEEP efter verifiering | `/kontakt` |
| `/nyheter` | Minst sex synliga artiklar från februari–september 2026 | MIGRATE | `/aktuellt` och relevanta innehållstyper |
| `/forskningsmiljostod` | Startsidelänk som gav 404 | REMOVE som aktiv länk + redirect | Relevant arkiverad utlysning |

## Dokument och externa tjänster

| Material | Observation | Åtgärd |
| --- | --- | --- |
| Privatpersonsblankett, reviderad 2026 | Tre sidor; personnummer, ekonomi och möjliga medicinska intyg efterfrågas. | MIGRATE som lokal fil först efter rättighets-/versionskontroll; skriv begriplig webbguide. |
| Hemmet för gamla, bostadsbidrag | Tre sidor; innehåller både 2026-prisbasbelopp och en fråga märkt med 2025 års belopp. | REWRITE/REPLACE efter sakgranskning. Publicera inte motstridiga belopp. |
| Föreningsblankett | Länk finns men filen kunde inte hämtas i granskningen. | Verifiera export och innehåll manuellt. |
| `Mer information om ansökan` och integritetspolicy | PDF-länkar omdirigeras till Squarespace CDN. | Exportera till egen lagring, kontrollera senaste version och interna länkar. |
| Forskningsansökan | Extern tjänst på `kockska.stiftelseapp.se`. | Behåll tydligt märkt extern länk; separat dataskydds- och avtalskontroll. |
| E-bok | Extern Heyzine-visning. | KEEP som extern länk tills rättigheter och eget format klarlagts. |
| Bilder på nuvarande sajt | Arkivfoto av paret, forskningsbilder, konstbilder och logotyp finns på nuvarande sajt. | MIGRATE selektivt; hämta original, fotograf/konstnär, licens, alttext och beskärningsrätt. |
| Tillhandahållen varumärkesmanual och logotyper | Original-SVG för marinblått ordmärke, vit variant och porträttlogotyp; manualens färger och typografi. | Använd originalfilerna som identitetskälla. Verifiera webbfontlicens före produktion. |
| Tillhandahållna skannade illustrationer | Akvareller och pennteckningar av Trelleborgs byggnader och industrimiljöer; original i kundens arkiv. | Webboptimerade kopior i prototypen. Registrera verk, illustratör, datering, bildtext och publiceringsrätt i CMS före skarp publicering. |

## Datapunkter att verifiera

- Cirka 1,5 miljoner kronor årligen till lokala behov och drygt 8 miljoner kronor till medicinsk forskning anges på startsidan. Använd inte som tidlösa, odaterade effektmått.
- Projektmedelsutlysningen 2026 anger 8 miljoner kronor totalt, högst 200 000 kr per sökande, öppning 8 september och stängning 18 oktober 2026 kl. 24.00. Fråga om redaktionell tidszonformulering före publicering.
- Forskningsmiljöstödet 2026 om 2 miljoner kronor stängde 19 juli 2026 enligt nyhetsartikeln.
- Lista över styrelse/anställda ska stämmas av mot aktuell mandatperiod.
- 24 daterade försköningsinsatser nämns i textlistan; poster och verkbilder överlappar och behöver dedupliceras, geokodas och rättighetskontrolleras.

## Luckor

Årsredovisningar, stadgar, jävsregler, beslutskriterier för lokala stöd, beslutstider, projektresultat, tydliga dokumentversioner, uppdateringsansvar och bildlicenser är inte tillräckligt tillgängliga i de granskade huvudflödena. Begär originalmaterial från stiftelsen innan detaljerade sidor fylls.
