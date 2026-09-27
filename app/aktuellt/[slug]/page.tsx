import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/interior-page";
import { SourceContent } from "@/components/source-content";
import articles from "@/content/migration/articles.json";
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = articles.find(a => a.slug === slug);
  return { title: `${item?.title ?? "Aktuellt"} | Kockska stiftelserna` };
}
export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = articles.find(a => a.slug === slug); if (!item) notFound();
  return <InteriorPage parent={{ label: "Aktuellt", href: "/aktuellt" }} eyebrow="Aktuellt" title={item.title} intro=""><article className="shell reading-layout article-layout"><aside><p><time dateTime={item.published}>{new Date(item.published).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Stockholm" })}</time></p><p>Av {item.author}</p><a href="/aktuellt">← Alla nyheter</a><a href="/sok-stod/medicinsk-forskning">Forskningsmedel</a></aside><div><Image className="article-image" src={item.image} alt={item.title} width={1200} height={800} sizes="(max-width: 760px) 100vw, 65vw" />{item.archive && <div className="notice"><strong>Avslutad utlysning</strong><p>Ansökningsperioden var 3 juni–19 juli 2026. Texten nedan bevaras som arkiv. Den tidigare fördjupningssidan om forskningsmiljöstöd är inte längre tillgänglig på originalsajten.</p></div>}<SourceContent html={item.html} /><p className="article-origin">Artikeln återges från stiftelsernas nyhetsarkiv. Datum, citat och sakuppgifter avser publiceringstillfället.</p></div></article></InteriorPage>;
}
