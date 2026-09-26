# Granskning av nuvarande webbplats

Granskad 26 september 2026. Underlag: publika sidor på `kockskastiftelsen.se`, dokument som nåddes via dem och visuell kontroll i webbläsare. Detta är ett arbetsunderlag, inte en fullständig teknisk crawl. Nuvarande sajt används som faktakälla och migrationskälla, aldrig som formmässig eller strukturell förlaga.

## Slutsats

Innehållet har betydande substans: lokala bidrag, medicinsk forskning, offentliga konstverk och paret Kocks historia. Den nuvarande ingången kräver däremot att besökaren först förstår stiftelsernas juridiska namn. Ansökningsvillkor, datum, blanketter och resultat ligger utspridda i långa textsidor och PDF:er. Den nya ingången bör svara på **vem kan söka, vad gäller och när**, och samtidigt visa hur pengarna förvaltas och vad de åstadkommer.

## Styrkor att bevara som innehåll

- Konkreta ändamål och målgrupper: privatpersoner, föreningar, äldre och medicinska forskare.
- Historiska primärkällor om Greta och Johan Kock samt lokal industrihistoria.
- Namngivna styrelseledamöter och vetenskapligt råd.
- Ett stort, daterat material om offentlig konst i Trelleborg.
- Faktiska ansökningsblanketter och separat externt ansökningssystem för forskning.
- Nyhetsflöde med aktuella forskningshändelser.

## Viktigaste problem

| Område | Observerat | Följd / åtgärd |
| --- | --- | --- |
| Hitta rätt | Huvudstrukturen utgår från fyra stiftelse- och fondnamn. | Skapa målgruppsingångar och behåll juridiska namn i fördjupning och metadata. |
| Ansökan | Lokalt stöd har datum och PDF-blanketter på flera olika sidor; forskningsansökan går till `kockska.stiftelseapp.se`. | Samla villkor, dokument, process och aktiv ansökningslänk per stödform. Behåll forskningssystemet som extern tjänst tills separat beslut. |
| Utlysningar | Startsidans länk `/forskningsmiljostod` gav 404 vid kontroll. Nyhetsartikeln anger ansökningstid 3 juni–19 juli 2026 och är alltså stängd. | Avpublicera aktiv markering när sluttid passerats, behåll arkiv och korrigera 404/redirect. |
| Färskhet | Foten visar © 2025, medan nyheter är från 2026. | CMS-styrd uppdatering och aktuell sidfot. |
| SEO | Startsidan har generisk titel `Greta och Johan Kocks` och tom meta description; canonical finns. Sajtens XML-sitemap kunde inte nås via granskningen. | Unika titlar/beskrivningar, sitemap, metadata och validerad URL-inventering. |
| Tillgänglighet | Startsidan har hopp till innehåll och semantisk H1. Flera redaktionella bilder har tom alttext; detta kan vara korrekt för dekorativa bilder men kräver bildvis granskning. | Bildpolicy, tangentbordstest, fokus, kontrast och WCAG 2.2 AA-kontroll. |
| Resultat och förtroende | Många konstverk räknas upp, men projektresultat och beslutsprocess är svåra att överblicka. | Strukturera projekt, styrning och källbelagda effektmått. |
| Integritet | Privata ansökningsblanketter ber om personnummer, ekonomi och medicinska intyg. | Ingen känslig ansökningsdata i den publika webbappen; separat säker hantering kräver särskilt beslut. |

## Befintlig funktionalitet

Responsiv navigation, språkval (Weglot indikeras av sidans resurser), nyhetsflöde, PDF-nedladdningar, extern e-bok, externa forskningsansökningar, kontakt via telefon/e-post. Ingen synlig vägledande kvalificering, sökfunktion, filtrerat projektarkiv eller konstkarta i de granskade huvudflödena.

## Verifiering och begränsning

Ingen administrativ åtkomst, trafikdata, Search Console, originalfiler eller full crawl fanns tillgänglig. Siffror, personroller, konstuppgifter och ansökningsregler ska verifieras av stiftelsen före publicering. Flera PDF-länkar omdirigeras till Squarespace CDN och måste exporteras och funktionstestas. Bedömningen av prestanda och WCAG kräver separat mätning.

## Källor

- [Startsida](https://www.kockskastiftelsen.se/)
- [Fromma stiftelsen – lokala stöd](https://www.kockskastiftelsen.se/fromma-stiftelsen)
- [Fromma stiftelsen – medicinsk forskning](https://www.kockskastiftelsen.se/fromma-stiftelsen-medicin)
- [Hemmet för gamla](https://www.kockskastiftelsen.se/hemmet-fr-gamla)
- [Försköningsstiftelsen](https://www.kockskastiftelsen.se/frskningsstiftelsen)
- [Bakgrund](https://www.kockskastiftelsen.se/bakgrund)
- [Styrelse och anställda](https://www.kockskastiftelsen.se/styrelse-och-anstallda)
- [Nyheter](https://www.kockskastiftelsen.se/nyheter)
- [Kontakt](https://www.kockskastiftelsen.se/kontakt)
- [Stängd forskningsmiljöutlysning](https://www.kockskastiftelsen.se/nyheter/utlysning-2026-avseende-forskningsmiljstd-frn-greta-och-johan-kocks-stiftelser)
