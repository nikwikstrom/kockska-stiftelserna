# Teknisk arkitektur och CMS

## Beslut

Fristående Next.js App Router med TypeScript, React och Tailwind CSS. Server Components som standard; klientkod endast för mobilnavigation och framtida interaktiva verktyg. Applikationen kan driftsättas på Vercel eller jämförbar Next-miljö. Ingen runtime-resurs, CDN, CSS, JS eller datahämtning från Squarespace.

## Struktur

```text
app/                 rutter, metadata, fel- och laddningstillstånd
components/          återanvändbara sid- och gränssnittskomponenter
content/             tidsbegränsade, källmärkta prototypdata
lib/                 datum/status, innehållsadapter och metadatahjälp
public/              lokalt lagrade godkända prototypassets
docs/                beslut, inventering och migration
```

Innehåll hämtas via en typad adapter. Första prototypen använder lokala data; samma gränssnitt får senare Sanity-koppling. Inga fakta eller utlysningsdatum göms inne i JSX. Miljövariabler för CMS är valfria i prototypen och dokumenteras innan skarp integration.

## CMS-val: Sanity

Sanity föreslås som fristående redaktionell tjänst: hanterar strukturerat innehåll och media utan att binda den publika Next-appen till ett visst webbhotell. Kräver senare konto, åtkomsträttigheter och avtal. Redaktörsroller, granskningsflöde, versionshistorik, publiceringsregler och backup ska sättas innan produktion. Staging och produktion ska skiljas åt.

| Dokumenttyp | Kärnfält |
| --- | --- |
| Page | titel, slug, ingress, moduler, SEO, ägare, senast granskad |
| News | rubrik, datum, sammanfattning, brödtext, bild, relaterat |
| Call | målgrupp, ändamål, start/slut, tidszon, belopp, villkor, dokument, ansöknings-URL, relaterad stiftelse |
| Project / Grant | mottagare där publicerbar, år, område, belopp där lämpligt, resultat, källa, bilder |
| Research award | forskare, pris, år, forskningsområde, resultat/källa |
| Public artwork | konstnär, verk, år, plats, koordinater, bilder, rättigheter |
| Media asset | originalfil, webbrenditioner, verk/motiv, upphov, år, rättighet, beskärningsvillkor, bildtext, alttext, källa och granskningsdatum |
| Person | namn, roll, mandat/period, foto, kontaktfält med publiceringsval |
| Timeline entry | år/datum, händelse, källa, bild |
| Document | fil, version, giltig från, målgrupp, ansvarig, tillgänglighetsstatus |
| FAQ | fråga, svar, målgrupp, relaterat stöd, senaste granskning |
| Site settings | navigation, kontakt, organisationsuppgifter, källmärkta effektmått |

Publicerade data valideras vid läsning. Stängda utlysningar filtreras från den aktiva modulen genom datum i `Europe/Stockholm`; lagrad status används inte som ensam sanningskälla. Revalidering/webhooks från CMS när redaktör publicerar.

Prototypen har avsiktligt `noindex` och blockerande `robots.txt`. Det måste tas bort först när produktionssajten och redirects är godkända.

## Sök, säkerhet och drift

Sök byggs från index av publicerat material när arkivet har kritisk massa. Inga privata ansökningar lagras i CMS eller den publika appen. Extern forskningsansökan fortsätter separat. Undvik tredjepartsspårning före integritetsbeslut. Bildoptimering, cache, säkerhetsheaders, 404, robots och sitemap ingår i produktionssteg. Lighthouse och WCAG kontrolleras på färdiga sidmallar, inte bara startsidan.
