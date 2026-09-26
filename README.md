# Kockska stiftelserna

Fristående webbprototyp i Next.js, TypeScript och Tailwind CSS. Den innehåller en startsida och en historiesida. Nuvarande sajt används som faktakälla och migrationsunderlag, inte som visuell mall eller tekniskt beroende.

## Kom igång

Installera Node.js och pnpm. Kör sedan:

```sh
pnpm install
pnpm dev
```

Öppna `http://localhost:3000`. Kontrollera ändringar med `pnpm build` och `pnpm typecheck`.

## Status och innehåll

De sju besluts- och migreringsunderlagen finns i [`docs/`](./docs/). Prototypens innehåll ligger i [`content/site.ts`](./content/site.ts), med en utbytbar läsadapter i [`lib/content.ts`](./lib/content.ts). Datumslogik för utlysningar finns i [`lib/calls.ts`](./lib/calls.ts).

Webbplatsen använder Garamond Premier Pro via Adobe Fonts. Det nuvarande typsnittskitet är begränsat till lokal förhandsvisning på `localhost` och `127.0.0.1`. Ett eget Adobe Fonts-kit för produktionsdomänen behövs före lansering. Arkivbilderna kommer från tillhandahållet material och ska rättighetskontrolleras före offentlig publicering.

CMS-anslutning, kompletta stödsidor och produktionsdrift återstår. Prototypen är `noindex` tills den är färdig för lansering. Att koden finns på GitHub innebär inte att webbplatsen är driftsatt.
