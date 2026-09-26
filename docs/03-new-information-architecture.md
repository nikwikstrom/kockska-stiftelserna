# Ny informationsarkitektur

Princip: besökarens ärende först, juridisk struktur som förklaring där den behövs. Startsidan leder till rätt stödväg och visar ARV → ANSVAR → VERKAN genom källbelagt innehåll.

## Huvudnavigation

1. **Sök stöd** — privatperson, förening/organisation, äldre, medicinsk forskning, aktuella utlysningar, så går det till, frågor och svar.
2. **Vad vi gör** — socialt stöd, medicinsk forskning, Trelleborg och stadsmiljö, stipendier och priser.
3. **Projekt & resultat** — projektarkiv, forskningsprojekt, beviljade stöd som kan publiceras, konstkarta, forskningspriser.
4. **Om Kockska** — Greta och Johan, historia, stiftelsernas juridiska struktur, organisation, styrning/transparens, dokument.
5. **Aktuellt** — nyheter och utlysningar.
6. **Kontakt**.

Mobilnavigation visar samma hierarki. `Sök stöd` får framträdande men återhållsam behandling. Ingen tom navigationslänk får publiceras.

## Föreslagna URL:er och mallar

| Mönster | Mall | Primär uppgift |
| --- | --- | --- |
| `/` | Startsida | Hitta stödväg och förstå uppdraget. |
| `/sok-stod` | Vägvisare | Välj målgrupp och se öppna möjligheter. |
| `/sok-stod/{privatperson,forening,aldre,medicinsk-forskning}` | Stödområde | Villkor, tider, dokument, process, kontakt. |
| `/utlysningar` och `/utlysningar/[slug]` | Lista/detalj | Se öppna/stängda utlysningar med datumberäknad status. |
| `/projekt` och `/projekt/[slug]` | Lista/detalj | Se finansierade resultat; skydda personliga stödärenden. |
| `/konstkarta` och `/konstkarta/[slug]` | Karta + tillgänglig lista/detalj | Utforska offentliga verk, plats och bakgrund. |
| `/om-kockska/historia`, `/om-kockska/organisation`, `/om-kockska/styrning`, `/om-kockska/dokument` | Redaktionella mallar | Förstå arv, ansvar och styrning. |
| `/aktuellt` och `/aktuellt/[slug]` | Nyheter | Aktuell information med datum och ansvarig utgivare. |
| `/kontakt` | Kontakt | Nå rätt kansli utan att dela känsliga uppgifter i ett osäkert formulär. |

## Sidmallarnas gemensamma logik

Stödområde: kort svar på vem/vad/när → villkor → så går det till → aktuella utlysningar → dokument → kontakt → juridisk stiftelse. Utlysning: status, absolut stängningstid, belopp, behörighet, underlag, bedömning, beslut och extern ansökningslänk. Projekt: vad stödet möjliggjorde, källa, år, område och publicerbar mottagare. Personstöd visas aggregerat.

## Navigation och sök

Brödsmulor på djupa sidor. Sekundär sökfunktion för sidor, utlysningar, FAQ, projekt och dokument när arkivet är tillräckligt fyllt. Filter och karta byggs först när kvalitetssäkrade poster finns. Footer länkar till styrning, integritet, dokument och kontakt.
