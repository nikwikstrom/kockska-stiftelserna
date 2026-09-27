import type { Metadata } from "next";
import Image from "next/image";
import { InteriorPage } from "@/components/interior-page";
import articles from "@/content/migration/articles.json";
export const metadata: Metadata = { title: "Aktuellt | Kockska stiftelserna", description: "Nyheter, forskningspriser, utlysningar och historia från Kockska stiftelserna." };
export default function NewsPage() {
  return <InteriorPage eyebrow="Aktuellt" title="Nyheter och berättelser." intro="Följ stiftelsernas verksamhet, forskningen och berättelsen om ett arv som lever vidare."><section className="shell interior-section"><div className="news-archive complete-news">{articles.map(item => <article key={item.slug}><a href={`/aktuellt/${item.slug}`} aria-label={item.title}><Image src={item.image} alt="" width={640} height={420} sizes="(max-width: 760px) 100vw, 25vw" /></a><div><p className="overline"><time dateTime={item.published}>{new Date(item.published).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Stockholm" })}</time>{item.archive && " · Avslutad utlysning"}</p><h2><a href={`/aktuellt/${item.slug}`}>{item.title}</a></h2><a className="text-link" href={`/aktuellt/${item.slug}`}>Läs hela artikeln →</a></div></article>)}</div></section></InteriorPage>;
}
