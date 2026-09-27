# Digital inlämning och handläggning

## Leveransen

Privatpersoner, föreningar och äldre/bostadsbidrag kan lämna en undertecknad originalblankett med bilagor via respektive stödguide. Det bevarar samtliga ursprungliga blankettfält och underskriftskrav. Mottagningen ger ett kvitto först efter att blankett och bilagor är beständigt sparade. E-postavisering är inte ansluten; detta står uttryckligen både på kvittot och i inkorgen.

Forskning fortsätter använda stiftelsens befintliga Stiftelseapp. Webbplatsen fattar inga automatiska bidragsbeslut och ersätter inte handläggarnas bedömning.

## Teknik och åtkomst

- Next.js/React fortsätter generera publika sidor. En liten Worker hanterar enbart API och statiska resurser; ingen ramverksmigrering.
- D1 lagrar kontaktuppgifter, stödform, kvittens, filmetadata och handläggningsstatus. R2 lagrar privata bilagor. Inga ansökningsdata ingår i Git, bygget eller publik filkatalog.
- Kansli: `/kansli`. ChatGPT-inloggning hanteras av Sites. API kontrollerar varje anrop mot en lista med tillåtna, Sites-verifierade användar-ID:n. E-post, synliga knappar eller klientlagring ger ingen behörighet.
- Miljöinställningar (endast i Sites): `APPLICATION_ADMIN_IDS` (kommaseparerade stabila ID:n), `APPLICATION_ORIGIN` (exakt publik origin), `APPLICATIONS_ENABLED` (`true` för öppet). Mottagning är stängd utan behörig mottagare och tillgängliga lagringsbindningar. Ingen hemlighet finns i frontend.
- För att ansluta handläggare: personen loggar in på `/kansli`; identitetsuppgiften visas för det egna kontot under ”Kontouppgift för behörighetsansvarig”. Behörighetsansvarig verifierar personen innan ID läggs till i Sites. Publicera sedan den sparade versionen för att tillämpa konfigurationen.
- Publik inlämning är utan konto. Same-origin-kontroll, särskild request-header, servervalidering, storleksgräns och begränsning av antal försök finns. Varje fil kontrolleras mot filsignatur och ändelse. PDF/JPG/PNG, 8 MB per fil, 24 MB totalt, 10 filer.
- Bilagor kan enbart laddas ned efter behörighetskontroll och kontroll av rätt ärende. Svar är `private, no-store`, med `nosniff` och nedladdning som fil. Inga publika eller signerade delningslänkar.
- Läsning, nedladdning, statusändring och radering loggas med användar-ID och ärendereferens; innehåll loggas inte. Gallring raderar ärende och filer. Åtkomstloggen innehåller bara referens, åtgärd, tid och aktör.
- Idempotens: samma referens + samma innehåll ger samma kvitto; ett ändrat innehåll kan inte skriva över en mottagen ansökan. Lagringsfel ger inget skenkvitto. Statusen sätts till mottagen först efter filerna är sparade.

## Drift

Kansliet behöver kontrollera inkorgen regelbundet eftersom automatisk e-post inte är aktiverad. Nedladdade filer ska hanteras i kansliets skyddade arbetsmiljö; automatisk virusskanning ingår inte. Handläggare följer stiftelsens bevarande-/gallringsrutiner. Stiftelsen behöver hålla sin personuppgiftsinformation och biträdesförteckning uppdaterade för Sites/Cloudflare; den tekniska beskrivningen är inte en juridisk granskning av policyn från 2021.

Avbrutna Worker-processer kan lämna ett `uploading`-ärende utan kvitto eller en föräldralös R2-fil. Ett nytt försök med samma referens kan återta låset efter två minuter. Kontrollera och gallra sådana övergivna objekt enligt driftens rutin; de visas aldrig som mottagna ansökningar. En avbruten radering markeras `deleting` och kan slutföras genom samma raderingsanrop.

## Verifiering

`node --test tests/applications.test.mjs` kör verkliga SQLite-frågor mot samtliga genererade migreringar och ett injicerbart privat fillager. Täcker alla tre stödformer, beständig kvittens, återförsök, IDOR, obehöriga konton, origin-kontroll, deklarationer, felaktiga och för stora filer, lagringsavbrott, förlorat databassvar, status, logg, bekräftad radering och frekvensgräns. Testdata är helt syntetiska.

Lokal fullflödeskontroll: `node scripts/preview-applications.mjs`, loopback port 3221. Denna förhandsvisning använder uttryckligen en syntetisk lokal handläggaridentitet; den ingår inte i den publicerade Workern. Ingen autentiseringsgenväg finns i produktionskoden.
