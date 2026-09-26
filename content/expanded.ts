// Bearbetat från kockskastiftelsen.se, kontrollerat 27 september 2026.
// Redaktionella fakta och personroller behöver godkännas av stiftelsen inför slutlig lansering.
export const supportAreas = [
  {
    slug: "privatpersoner",
    title: "Stöd för privatpersoner",
    intro: "Fromma stiftelsens understödsfond kan ge stöd till människor med behov i Trelleborgs kommun.",
    foundation: "Fromma stiftelsen",
    facts: [
      { title: "Vem kan söka?", text: "Enskilda trelleborgare. Ändamålet omfattar barns och ungas vård, fostran och utbildning samt vård av behövande äldre och sjuka. Ansökningsblanketten nämner också personer med funktionsnedsättning eller särskilda kostnader kopplade till sjukdom." },
      { title: "När?", text: "Ansökningstider för anslag ur understödsfonden är den 1 april och den 1 oktober varje år. Kontakta kansliet för besked om hur en ansökan ska lämnas in kring dessa datum." },
      { title: "Vad behöver jag förbereda?", text: "Blanketten efterfrågar bland annat uppgifter om hushållets ekonomi, vad stödet ska användas till och relevanta underlag. Skicka aldrig personnummer, skattebesked eller läkarintyg i vanlig e-post." },
    ],
    action: "Be kansliet om aktuell ansökningsblankett och säker inlämningsväg.",
    documentUrl: "/dokument/privatpersoner-ansokan-2026.pdf",
    documentLabel: "Ladda ned ansökningsblankett för privatpersoner (PDF, reviderad 2026)",
  },
  {
    slug: "foreningar",
    title: "Stöd för föreningar",
    intro: "Föreningar och organisationer kan söka stöd för verksamhet som möter stiftelsens ändamål i Trelleborg.",
    foundation: "Fromma stiftelsen",
    facts: [
      { title: "Vem kan söka?", text: "Föreningar och organisationer i Trelleborg. Om en lokal förening saknas kan även en regional förening med anknytning till Trelleborg komma i fråga." },
      { title: "Vad kan få stöd?", text: "Insatser för barn och unga samt vård och stöd för behövande äldre och sjuka, inom ramen för stiftelsens ändamål. Styrelsen fördelar anslagen ur understödsfonden." },
      { title: "När?", text: "Ansökningstiderna anges till den 1 april och den 1 oktober varje år. Be kansliet om aktuell föreningsblankett och besked om vilka bilagor som behövs." },
    ],
    action: "Kontakta kansliet för blankett och villkor som gäller er organisation.",
    documentUrl: "/dokument/foreningar-ansokan-2025.pdf",
    documentLabel: "Ladda ned föreningsblankett (PDF, reviderad 2025)",
  },
  {
    slug: "aldre",
    title: "Stöd för äldre och bostad",
    intro: "Stiftelsen Hemmet för gamla ger i första hand bostadsbidrag till mindre bemedlade äldre i Trelleborg.",
    foundation: "Stiftelsen Greta och Johan Kocks Hem för Gamla",
    facts: [
      { title: "Bostadsbidrag", text: "Bostadsbidrag kan sökas löpande under året. Man behöver inte bo i de fastigheter som tidigare tillhörde stiftelsen för att söka." },
      { title: "Annat stöd", text: "Stiftelsen kan även bidra till vård av behövande äldre och sjuka. För dessa anslag anges den 1 april och den 1 oktober som ansökningstider." },
      { title: "Lägenheter", text: "Stiftelsens fastigheter såldes 2019. Stiftelsen tar därför inte längre emot lägenhetsansökningar; sådana frågor hänvisas till fastigheternas nya ägare." },
      { title: "Inför ansökan", text: "Den befintliga blanketten efterfrågar bland annat hyreskontrakt, ekonomiskt underlag och i vissa fall relevanta intyg. Kontakta kansliet för en aktuell version och säker inlämningsväg." },
    ],
    action: "Be kansliet om blanketten för bostadsbidrag eller annat stöd.",
  },
  {
    slug: "medicinsk-forskning",
    title: "Medicinsk forskning",
    intro: "Fromma stiftelsens forskningsfond stöder kliniskt patientnära forskning om kroniskt invalidiserande sjukdomar.",
    foundation: "Fromma stiftelsens fond för medicinsk forskning",
    facts: [
      { title: "Forskningsinriktning", text: "Särskild tyngdpunkt ligger på rörelseorganens sjukdomar och kognitiva sjukdomar, med fokus på artros respektive demens. Forskningen bedrivs vid Lunds universitets medicinska fakultet eller inom Region Skånes vårdverksamheter." },
      { title: "Vem kan söka?", text: "Enligt 2026 års utlysning krävs minst 50 procents anställning vid medicinska fakulteten vid Lunds universitet, Region Skånes sjukvård eller vårdverksamhet med avtal med Region Skåne. Anställningen ska kunna förenas med klinisk forskning. Disputerade forskare i postdoktoralt skede prioriteras." },
      { title: "2026 års projektmedel", text: "Utlysningen omfattar totalt 8 miljoner kronor, med högst 200 000 kronor per sökande. Den öppnade 8 september och stänger 18 oktober 2026 kl. 24.00. Medlen betalas ut under 2027." },
      { title: "Ansökan och användning", text: "Ansökan lämnas i den externa ansökningstjänsten och kan skrivas på svenska eller engelska. Medel kan användas till material, utrustning och löner; resor kräver stiftelsens godkännande. CV krävs och etikgodkännande ska finnas innan ansökan kan behandlas." },
      { title: "Bedömning", text: "Tre ledamöter i ett vetenskapligt råd granskar ansökningarna var för sig och samråder om prioritering med hänsyn till jäv. Styrelsen fattar beslut, vanligen i november." },
    ],
    action: "Läs den fullständiga utlysningen innan du går vidare till ansökningstjänsten.",
    applicationUrl: "https://kockska.stiftelseapp.se/users/sign_in",
    documentUrl: "/dokument/forskningsmedel-styrdokument-2026.pdf",
    documentLabel: "Ladda ned styrdokument för forskningsmedel (PDF, 2026)",
  },
] as const;

export const foundationAreas = [
  { id: "fromma", title: "Fromma stiftelsen", subtitle: "Understödsfonden", text: "Greta och Johan Kocks stiftelse för behövande unga, gamla eller sjuka delar ut anslag till enskilda och organisationer med anknytning till Trelleborg. Ändamålet gäller bland annat barn och ungas utveckling samt vård av behövande äldre och sjuka.", href: "/sok-stod" },
  { id: "medicin", title: "Fromma stiftelsen", subtitle: "Fonden för medicinsk forskning", text: "Forskningsfonden finansierar kliniskt patientnära forskning inom bland annat artros och kognitiva sjukdomar. Utlysningar riktar sig till kvalificerade forskare inom Lunds universitet och Region Skåne.", href: "/sok-stod/medicinsk-forskning" },
  { id: "hemmet", title: "Hemmet för gamla", subtitle: "Bostadsbidrag och vård", text: "Stiftelsen har sedan försäljningen av fastigheterna 2019 verksamhet som avkastningsstiftelse. Den kan ge bostadsbidrag till äldre i Trelleborg och stöd till vård av behövande äldre och sjuka.", href: "/sok-stod/aldre" },
  { id: "forsk", title: "Försköningsstiftelsen", subtitle: "Konst och miljö i Trelleborg", text: "Avkastningen ska användas för Trelleborgs kommuns försköning. Stiftelsen har genom åren medverkat till konstverk, parker, stadsmiljöer och kulturhistoriska insatser.", href: "/vad-vi-gor#trelleborg" },
] as const;

export const artworks = [
  ["1957", "Äventyret", "Liljeborgsskolans gård"],
  ["1967", "Pojke tyglande två hästar", "Skyttsgården"],
  ["1970", "Månårsfågeln", "Kyrkoplanteringen"],
  ["1977", "Rådhusfontänen", "Rådhusplatsen"],
  ["1981", "Meditation", "Minneslunden, Norra kyrkogården"],
  ["1992", "Vingslag", "Minneslunden, Västra kyrkogården"],
  ["1993", "Att bara vara", "Lejonhjälmsgränd"],
  ["1995", "Böst", "Gågatan"],
  ["2004", "Föränderlig profil", "Lasarettets huvudentré"],
  ["2006", "Mobile", "Rådhustorget"],
  ["2006", "Konstvandring i Trelleborg", "Utgivning av skrift"],
  ["2007", "Nya entréer till stadsparken", "Stadsparken"],
  ["2009", "Ombyggnad av parken vid Hemmet för gamla", "Trelleborg"],
  ["2012", "Meditationsplats", "Norra kyrkogården"],
  ["2015", "Filmen om Axel Ebbe", "Jan Troell och Jan Hemmel"],
  ["2015", "Två konstinstallationer", "Smygehamn"],
  ["2019", "Språkväxten", "Västervångsskolans gård"],
  ["2020", "Sälen Isak", "Stadsparken"],
  ["2022", "Nilofar", "Familjens Hus, Anderslöv"],
  ["2023", "Historiska bilder på elskåp", "Trelleborg"],
  ["2024", "Restaurering av stadsgränsstenar", "Trelleborg"],
  ["2025", "Vid din sida", "Trygghetens Hus"],
  ["2025", "Evigt & Evigheten", "Norra kyrkogården"],
  ["2025", "Stadsmodell Trelleborg 1867", "Rådhustorget"],
] as const;

export const board = [
  ["Klemens Ganslandt", "Ordförande", "Utsedd av Länsstyrelsen i Skåne län"],
  ["Sven Lindqvist", "Vice ordförande", "Utsedd av Trelleborgs kommunfullmäktige"],
  ["Catharina von Blixen-Finecke", "Styrelseledamot", "Utsedd av Trelleborgs kommunfullmäktige"],
  ["Magnus Nedström", "Styrelseledamot", "Utsedd av Johan Kocks släktgren"],
  ["Lovisa Adolfsson", "Styrelseledamot", "Utsedd av Greta Kocks släktgren"],
  ["Helena Biehl", "Suppleant", "Utsedd av Greta Kocks släktgren"],
  ["Catarina Dehlin", "Suppleant", "Utsedd av Johan Kocks släktgren"],
] as const;

export const newsItems = [
  { date: "25 september 2026", category: "Forskning", title: "Internationell konferens i Trelleborg", text: "Forskare från Sverige, Europa och USA samlades under tre dagar för att diskutera artros och Alzheimers sjukdom. Konferensen arrangerades av stiftelserna i samarbete med Lunds universitet." },
  { date: "8 september 2026", category: "Forskning", title: "Internationellt symposium om artros och Alzheimer", text: "Den 23–25 september 2026 arrangerades ett symposium i Trelleborg tillsammans med Lunds universitet och Region Skåne." },
  { date: "8 september 2026", category: "Utlysning", title: "Projektmedel för medicinsk forskning 2026", text: "Åtta miljoner kronor utlystes till kliniskt patientnära forskning om bland annat artros och demens. Sista ansökningsdag är 18 oktober 2026.", href: "/sok-stod/medicinsk-forskning" },
  { date: "4 juni 2026", category: "Avslutad utlysning", title: "Forskningsmiljöstöd för yngre disputerade forskare", text: "En extrasatsning om totalt två miljoner kronor för miljöer inom kognitiva sjukdomar eller artros. Ansökningsperioden var 3 juni–19 juli 2026." },
  { date: "26 februari 2026", category: "Historia", title: "Greta och Johan Kocks livsgärning som e-bok", text: "Ingrid Walls biografi Ett levande arv gjordes tillgänglig digitalt, med berättelsen om paret Kock och Trelleborgs utveckling.", href: "/om-kockska/historia" },
  { date: "10 februari 2026", category: "Forskningspriser", title: "Två miljonpriser till medicinsk forskning", text: "Professor Martin Englund och docent Niklas Mattsson-Carlgren fick vardera ett forskningspris om en miljon kronor för arbete inom artros respektive Alzheimers sjukdom." },
] as const;
