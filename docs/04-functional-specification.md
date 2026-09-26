# Funktionsspecifikation

## Nu: startsidesprototyp

- Responsiv header, semantisk navigation och mobilmeny med tangentbordsstöd.
- Tre tydliga målgruppsingångar: privatperson, förening/organisation, forskare.
- Modul för aktiva utlysningar. Status beräknas av start/sluttid; stängda poster visas inte som aktiva.
- Källmarkerad eller daterad statistik. Där verifierat mått saknas används redaktionell text, aldrig påhittad siffra.
- Innehåll separerat från komponenter så att CMS kan ersätta lokal adapter.
- Tydliga tillstånd för saknad/utgången utlysning och länkar utan döda destinationer.

## Nästa produktsteg

| Funktion | Beteende / acceptanskriterium |
| --- | --- |
| `Kan jag söka?` | Guidar genom målgrupp, geografi/anknytning och ändamål. Ger vägledning med förbehåll; ingen bindande behörighetsbedömning eller insamling av personnummer/hälsodata. |
| Utlysningar | Redaktionella start/slutdatum i svensk tidszon; `kommande`, `öppen`, `stänger snart`, `stängd`; arkiv kvar; tydlig extern ansökningsdestination. |
| Ansökningsprocess | Steg, underlag, beslut och redovisning per stödform. Dokument har filnamn, format, version och ansvarig. |
| Projektarkiv | Filtrering på år/område; sök; tomt tillstånd; individuella privata bidrag redovisas endast aggregerat. |
| Konstkarta | Karta och fullgod listvy med samma data; geokoordinater och rättigheter verifierade. |
| FAQ | Grupperad per målgrupp; uppdateras av redaktör; schema.org endast för faktiskt synlig fråga/svar-text. |
| Sajtsök | Indexerar publicerade sidor, FAQ, utlysningar, nyheter, projekt och dokument; respekterar arkivstatus. |
| Kontakt | E-post, telefon, besöksadress; ingen öppen uppladdning av känsliga bilagor via webbplatsen. |

## Kvalitetskrav

WCAG 2.2 AA som mål; tydliga fokusmarkeringar, 200 % textförstoring, korrekt semantik, mobil från 320 px, reducerad rörelse, tillgänglig listvy för kartan. Unik metadata, kanoniska adresser, sitemap, 404 och redirects. Serverrendering/statisk generering där lämpligt, minimal klientkod. Lokal förhandsvisning och bygg ska fungera utan Squarespace.

## Publiceringsgränser

Prototypen är en design- och innehållsdemonstration. Full ansökningshantering, publicering av personuppgifter, skarp CMS-redigering, färdiga arkiv och domänbyte kräver egna leveranssteg och källmaterial.
