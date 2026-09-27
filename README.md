# Kockska stiftelserna

Fristående Next.js/TypeScript-webbplats med Garamond, lokala bilder och dokument. Statisk export utan Squarespace-beroende.

## Kör lokalt

```sh
pnpm install
pnpm dev --port 3217
pnpm build
python3 scripts/verify-content.py
```

`out/` innehåller publicerbar webbplats. `.openai/hosting.json` pekar på det befintliga Sites-projektet. Sites-workflow används för publicering och proveniens. Ingen ansökningsinformation får läggas i den publika koden.

## Innehåll och ansökningar

- `content/migration/`: fullständiga artiklar, migrerad verksamhetstext, konstarkiv och spårbar URL-/dokumentförteckning.
- `public/dokument/`: sex oförändrade original-PDF:er.
- `components/application-guide.tsx`: tre ansökningsguider med lokala checklistor, blanketter och postal inlämning. Checklistor är inte digital inlämning.
- Forskning lämnas i stiftelsens externa Stiftelseapp.
- Ingen backend för nya ansökningar och inget aktivt CMS är anslutet. Redaktionell arkitektur finns i `/docs`.
- `docs/08-content-reconciliation.md`: täckning, verifiering, källkonflikter och kvarstående beslut.

Originalets saknade sida `/forskningsmiljostod` svarar 404. Den tillgängliga nyhetsartikeln finns i sin helhet, men den saknade fördjupningstexten behöver återfås från stiftelsen för full historisk täckning.

## Digital inlämning

Tre lokala stödformer har nu digital inlämning av undertecknad blankett och bilagor, privat lagring och kansliets inkorg på `/kansli`. Se [drift och behörigheter](docs/09-digital-applications.md). Next.js exporten kompletteras med en Worker. Kör `pnpm build`, `pnpm test:applications` och `python3 scripts/verify-content.py`. Ingen automatisk e-postavisering skickas.
