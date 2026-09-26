# Kockska stiftelserna

Fristående webbprototyp i Next.js, TypeScript och Tailwind CSS. Den innehåller en startsida och en historiesida. Nuvarande sajt används som faktakälla och migrationsunderlag, inte som visuell mall eller tekniskt beroende.

## Delbar förhandsvisning

[Öppna webbplatsen](https://kockska-stiftelserna.nikwikstrom.chatgpt.site/). Förhandsvisningen är öppen för alla med länken och är märkt `noindex` medan innehåll och funktioner färdigställs.

## Kom igång

Installera Node.js och pnpm. Kör sedan:

```sh
pnpm install
pnpm dev
```

Öppna `http://localhost:3000`. Kontrollera ändringar med `pnpm build` och `pnpm typecheck`.

## Status och innehåll

De sju besluts- och migreringsunderlagen finns i [`docs/`](./docs/). Prototypens innehåll ligger i [`content/site.ts`](./content/site.ts), med en utbytbar läsadapter i [`lib/content.ts`](./lib/content.ts). Datumslogik för utlysningar finns i [`lib/calls.ts`](./lib/calls.ts).

Webbplatsen använder Garamond Premier Pro via Adobe Fonts lokalt och EB Garamond som reserv på den delbara adressen. Det nuvarande Adobe-kitet är begränsat till `localhost` och `127.0.0.1`; ett kit för produktionsdomänen behövs inför slutlig lansering. Arkivbilderna kommer från tillhandahållet material. Publiceringsrätt ska dokumenteras inför slutlig lansering.

CMS-anslutning och kompletta stödsidor återstår. Den delbara förhandsvisningen uppdateras genom en ny publicering; innehållet i den statiska versionen följer inte ändringar i utlysningarnas datum automatiskt.
