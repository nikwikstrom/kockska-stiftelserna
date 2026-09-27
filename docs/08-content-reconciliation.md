# Fullständig innehållsavstämning

Kontrolldatum: 27 september 2026. Källan är den offentliga originalsajten och dess sitemap. Maskinläsbar proveniens, ursprungliga URL:er, destinationskarta, dokumentens SHA-256 och bildkällor finns i `content/migration/manifest.json` och `routes.json`.

## Täckning

| Original | Destination och innehåll |
| --- | --- |
| `/home` | Startsida + stiftelseöversikt: fyra ändamål, cirka 1,5 Mkr lokalt och drygt 8 Mkr forskning. E-bok på historiesidan; forskningsmiljöstöd i nyhetsarkivet. |
| `/fromma-stiftelsen` | `/stiftelserna/fromma`: hela verksamhetstexten, alla stipendier och separata anslag till lasarett respektive Folktandvård. Ansökningsguider för privatpersoner och föreningar. |
| `/fromma-stiftelsen-medicin` | `/stiftelserna/medicinsk-forskning`: hela informationen om behörighet, användning, CV, etikgodkännande, AI-redovisning, e-postbekräftelse, rapportering, granskning, symposium och 2021 års webbseminarium. |
| `/hemmet-fr-gamla` | `/stiftelserna/hemmet-for-gamla` och äldre-guiden: hela verksamhetstexten, försäljningsdatum, köpare, stödformer och blankett. |
| `/frskningsstiftelsen` | `/stiftelserna/forskoning` och `/vad-vi-gor/konst`: hela ändamålstexten, 24 insatser, 20 konstbilder med ursprungliga upphovsuppgifter, övriga kultur- och parkinsatser. |
| `/bakgrund` | `/om-kockska/historia`: makarnas liv, dödsår, stiftelsernas tillkomst, omläggningen av handeln, de sju företagen med årtal och originalets två akvareller. Tidigare tillförda bokutdrag och bilder behålls. |
| `/styrelse-och-anstallda` | `/om-kockska/organisation`: alla 14 personer, roller/utnämnare och rådets ordförandes kontaktuppgifter. |
| `/kontakt` | `/kontakt`: telefon, e-post, adress, besök enligt överenskommelse och Kurt Dahlman. |
| `/nyheter` + sex artiklar | `/aktuellt` + sex egna artikelsidor: hela artikeltexter, citat, datum, författare och bilder. Avslutad utlysning markeras. |

Samtliga 15 sidor i originalsajtens sidförteckning har en destination. Alla sex länkade PDF-dokument är lokalt bevarade, oförändrade. 49 bildresurser är hämtade; de 20 konstbilderna, sex artikelbilderna och historiskt relevanta akvarellerna visas. Äldre dekorativa hero-/kategoribilder är bevarade som migrationsmaterial men ersätter inte den godkända nya gestaltningen.

## Faktiska ansökningsvägar

- Forskning: Stiftelseapp. Inloggningssidan visar skapa konto, glömt lösenord och ny bekräftelselänk. Ingen testansökan har skickats och ingen handläggarvy har verifierats.
- Privatpersoner/föreningar: originalblanketter med postal inlämningsadress, bilagechecklistor, underskrifter och integritetspolicy.
- Äldre/bostadsbidrag: publicerad originalblankett, checklista och kansliets postadress. Bostadsblanketten anger ingen egen inlämningsadress; kansliadressen kommer från kontaktsidan och de övriga blanketterna. Digital inlämning för denna stödform är inte belagd i källan.
- Checklistorna är en förberedelse, samlar inga personuppgifter och skickar ingen ansökan. De ger aldrig ett falskt mottagningskvitto.
- Digital mottagning är implementerad för privatpersoner, föreningar och äldre: undertecknade originalblanketter, privata bilagor, mottagningskvitto och skyddad handläggarinkorg. Öppnas först när en verifierad mottagare är kopplad via serverns behörighetslista. Se `09-digital-applications.md`.

## Avvikelser som inte får döljas

1. `/forskningsmiljostod` länkas från originalet men svarar 404. Fullständig tillgänglig nyhetsartikel är bevarad (2 Mkr totalt; 200–400 tkr per bidrag; 3 juni–19 juli 2026), men innehållet från den saknade fördjupningssidan kan inte verifieras. Dess länk är märkt otillgänglig i arkivet. Den 27 september tillkom `/sok-stod/forskningsmiljostod`, en separat arkivsida som sammanställer samtliga verifierade uppgifter från utlysningen. Den gör inte anspråk på att återge den förlorade fördjupningstexten. Sökning i webbindex och bland projekttillgångarnas filnamn gav ingen ytterligare version; webbarkivets förfrågan fick timeout. Närmare kostnadsslag, bilagor och behörighetskrav behöver fortfarande styrkas av stiftelsen.
2. Föreningarnas informations-PDF anger 1 april för särskilda ändamål och 1 april/1 oktober för nya projekt eller ny verksamhet; webbsidan anger generellt båda datumen. Guiden visar skillnaden och hänvisar till kansliet för rätt omgång.
3. Bostadsblanketten innehåller prisbasbelopp från både 2025 och 2026. Originalet bevaras och en tydlig not finns vid nedladdningen. Inga egna ekonomiska trösklar används för att bedöma behörighet.
4. Böst anges som 1995/1996 och Äventyret som 1957/1958 i originalets förteckning/bildtexter. Båda uppgifterna bevaras med förklaring.
5. Originalets medicinska sida talar om symposiet både som kommande och genomfört. Texten bevaras; aktuell not anger att evenemanget är avslutat.
6. Policyn är originalets fullständiga PDF från 17 mars 2021. Det är inte en ny policy granskad för ett nytt digitalt ansökningssystem.

## Navigering och hierarki

Sök stöd → fyra målgrupper + dokument. Stiftelserna → fyra egna verksamhetssidor. Vad vi gör → verksamhet/stipendier + konst. Om Kockska → historia + organisation. Aktuellt och Kontakt ligger kvar på första nivån. Dokument och integritet finns även i sidfoten.

Undersidor har lägre rubrikstorlek, avgränsad läsbredd, sidinnehåll och direkta ansökningsvägar. Nyheterna har fullständiga artikelsidor. Garamond och godkänd färg-/bildriktning är bevarade.

## Verifiering

`pnpm build` och `python3 scripts/verify-content.py`. Den senare jämför migrerade originaltextblock med byggd HTML, kontrollerar samtliga PDF-hashar, konstbilder/upphovspersoner, namn, historiska nyckelfakta, interna länkar/ankare och en huvudrubrik per sida. Kontrollen passerade för 25 sidor och 1 451 interna länkar/bildreferenser. Manuell webbläsargranskning: 390 px mobil och 1 365 px desktop; mobilmeny till ansökningssida, alla tre checklistors fullständiga tillstånd, avmarkering och återställning efter omladdning, konstarkiv och artikelmall. Ingen horisontell överrinning i de kontrollerade vyerna. Stiftelseapps inloggning och konto-/återställningsvägar kontrollerades utan att skicka ansökan.

URL-kartan är ett migrationsunderlag. Den ursprungliga domänens serverompekning och permanenta 301-omdirigeringar är inte genomförda; originaldomänen är oförändrad.
