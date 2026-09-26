# Migrationsplan bort från Squarespace

**Målet:** en ny produktionssajt utan tekniskt Squarespace-beroende. DNS byts först efter godkänd produktionskontroll. Varje steg har ansvarig, checklista och möjlighet till återgång.

## 1. Frys och exportera källan

Inventera alla publika URL:er med faktisk crawl, sitemap/Search Console och Squarespace export. Exportera sidor, nyheter, originalbilder, PDF:er, filer, SEO-titlar/beskrivningar och eventuella språkversioner. Dokumentera extern e-bok, Weglot och `stiftelseapp.se` separat. Ta backup och kontrollera bild-/text-/konstlicenser.

## 2. Redaktionell bearbetning

Tilldela KEEP/REWRITE/MIGRATE/ARCHIVE/REMOVE per post från [inventeringen](./02-content-inventory.md). Korrekturläs juridiska ändamål och ansökningsvillkor med stiftelsen. Kontrollera motstridigt prisbasbelopp i bostadsbidragsblanketten. Publicera inga persondata från privata ärenden. Skapa tillgängliga dokument eller HTML-alternativ där möjligt.

## 3. CMS-import

Skapa Sanity-miljöer, roller och innehållstyper. Importera kontrollerade poster med stabila ID:n, ursprungs-URL, källa, rättigheter och senast granskad. Kör redaktionell provimport och kontrollera antal, relationer, dokument och bildbeskärningar. Arkivera stängda utlysningar utan aktiv CTA.

## 4. Redirect- och SEO-karta

Varje gammal indexerad URL ska få en relevant ny destination eller medvetet 410-beslut. Använd 301 på samma domän vid lansering. Ingen massredirect till startsidan. Initial karta:

| Gammal URL | Ny destination |
| --- | --- |
| `/fromma-stiftelsen` | `/sok-stod` (med synliga privatperson/förening-vägar) |
| `/fromma-stiftelsen-medicin` | `/sok-stod/medicinsk-forskning` |
| `/hemmet-fr-gamla` | `/sok-stod/aldre` |
| `/frskningsstiftelsen` | `/vad-vi-gor/trelleborg` |
| `/bakgrund` | `/om-kockska/historia` |
| `/styrelse-och-anstallda` | `/om-kockska/organisation` |
| `/nyheter` | `/aktuellt` |
| `/forskningsmiljostod` | Arkiverad miljöstödsutlysning, efter faktakontroll |

Artiklar och PDF:er behöver individuell mapping. Bevara betydelsebärande slugs där det passar. Kontrollera canonical, metadata, språkversioner, strukturerade data och interna länkar.

## 5. Produktionskontroll före DNS

Produktionsbygge på tillfällig domän: fullständiga sidmallar, redaktörsflöde, rättigheter, aktiva/stängda datum, brutna länkar, dokument, 404, mobil/desktop, WCAG, prestanda, sitemap/robots, säkerhetsheaders och analytik. Verifiera extern ansökningstjänst. DNS/SSL-plan och TTL förbereds. Stiftelsen godkänner innehåll och rättigheter.

## 6. Domänbyte och efterkontroll

Peka DNS först efter klartecken, verifiera certifikat och både `www`/apex. Testa ett representativt urval och därefter hela redirect-listan, skicka sitemap till Search Console och övervaka 404, indexering, formulärlänkar och utlysningar. Behåll Squarespace-export/backups för återställning under avtalad period och avsluta tjänsten först när inga beroenden återstår.

## Aktuellt läge

Endast inventering och prototyp är påbörjade. Ingen DNS, skarp CMS-import eller Squarespace-avstängning utförs i detta steg.
