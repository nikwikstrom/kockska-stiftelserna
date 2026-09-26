export type Audience = {
  id: string;
  number: string;
  title: string;
  intro: string;
  details: string;
  action: string;
  href: string;
};

export type Call = {
  id: string;
  title: string;
  audience: string;
  amount: string;
  opensAt: string;
  closesAt: string;
  deadlineLabel: string;
  applicationUrl: string;
  sourceUrl: string;
};

// Editorial prototype data. Each published fact is linked to the current site's source.
// Replace this adapter with Sanity documents after client verification.
export const siteContent = {
  hero: {
    eyebrow: "Greta och Johan Kocks stiftelser",
    title: "Ett arv som fortfarande gör skillnad.",
    intro:
      "Vi stödjer människor och föreningar i Trelleborg, medicinsk forskning i Skåne och initiativ som utvecklar staden.",
  },
  audiences: [
    {
      id: "privatperson",
      number: "01",
      title: "Jag söker som privatperson",
      intro: "Stöd för barn och unga, äldre och personer som behöver hjälp.",
      details:
        "Fromma stiftelsen och Hemmet för gamla har olika ändamål. För lokalt stöd anges den 1 april och 1 oktober som ansökningstider på nuvarande webbplats. Bostadsbidrag kan sökas löpande under året.",
      action: "Se villkor och ansökan",
      href: "/sok-stod/privatpersoner",
    },
    {
      id: "forening",
      number: "02",
      title: "Vi är en förening",
      intro: "Stöd för insatser med anknytning till Trelleborg.",
      details:
        "Föreningar och organisationer i Trelleborg kan söka stöd inom stiftelsens ändamål. Om en lokal förening saknas kan en regional förening med anknytning till Trelleborg vara aktuell.",
      action: "Se villkor och ansökan",
      href: "/sok-stod/foreningar",
    },
    {
      id: "forskare",
      number: "03",
      title: "Jag är forskare",
      intro: "Finansiering för kliniskt patientnära medicinsk forskning.",
      details:
        "Den aktuella projektmedelsutlysningen riktar sig till forskare med relevant anställning vid Lunds universitet eller Region Skånes vårdverksamheter. Läs alltid den fullständiga utlysningstexten före ansökan.",
      action: "Se forskningsmedel och villkor",
      href: "/sok-stod/medicinsk-forskning",
    },
  ] satisfies Audience[],
  calls: [
    {
      id: "medicinsk-forskning-2026",
      title: "Projektmedel för medicinsk forskning 2026",
      audience: "Forskare · Lunds universitet och Region Skåne",
      amount: "Totalt 8 miljoner kr · högst 200 000 kr per sökande",
      opensAt: "2026-09-08T00:00:00+02:00",
      closesAt: "2026-10-19T00:00:00+02:00",
      deadlineLabel: "18 oktober 2026 kl. 24.00",
      applicationUrl: "https://kockska.stiftelseapp.se/users/sign_in",
      sourceUrl: "https://www.kockskastiftelsen.se/fromma-stiftelsen-medicin",
    },
  ] satisfies Call[],
  workAreas: [
    {
      number: "01",
      title: "Stöd i Trelleborg",
      body: "Bidrag till människor och organisationer utifrån behov och stiftelsernas ändamål.",
    },
    {
      number: "02",
      title: "Medicinsk forskning",
      body: "Anslag till patientnära forskning med tyngdpunkt på artros och kognitiva sjukdomar.",
    },
    {
      number: "03",
      title: "En stad att leva i",
      body: "Konst, platser och andra insatser som fortsätter att vara en del av Trelleborg.",
    },
  ],
  history: {
    eyebrow: "Historien",
    title: "Människorna bakom arvet.",
    body:
      "Greta och Johan Kock levde i Trelleborg när staden växte genom handel och industri. Deras arv fick sedan ett nytt uppdrag: att hjälpa människor, bidra till kunskap och utveckla staden.",
    image: "/images/archive/greta-book-page-27.jpg",
    imageAlt: "Historiskt fotografi av Greta och Johan Kock som nygifta",
    sourceUrl: "Tillhandahållet bokutdrag, sidan 27",
  },
  news: {
    date: "25 september 2026",
    category: "Forskning",
    title: "Trelleborg samlade forskare kring artros och Alzheimers sjukdom",
    body:
      "Den 23–25 september hölls en internationell konferens i Trelleborg med forskare och föreläsare från Sverige, Europa och USA.",
    sourceUrl: "https://www.kockskastiftelsen.se/nyheter",
  },
  contact: {
    email: "info@kockskastiftelsen.se",
    phone: "0410-133 20",
    phoneHref: "+4641013320",
    address: ["Lejonhjälmsgränd 14 A", "231 43 Trelleborg"],
  },
} as const;
