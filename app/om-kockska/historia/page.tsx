import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: "Greta och Johan Kock | Historien bakom stiftelserna",
  description:
    "Läs om Greta och Johan Kock, Trelleborg och historien bakom stiftelsernas arbete i dag.",
};

const moments = [
  { year: "1866", text: "Johan Kock föds i Trelleborg den 17 april." },
  { year: "1872", text: "Margaretha (Greta) Herrlin föds i Sparreholm den 20 maj." },
  { year: "1891", text: "De gifter sig den 26 juni och bosätter sig vid Östergatan i Trelleborg." },
];

export default function HistoryPage() {
  return (
    <>
      <a href="#main" className="skip-link">Hoppa till innehåll</a>
      <SiteHeader />
      <main id="main" className="history-page">
        <div className="shell history-page-intro">
          <nav className="breadcrumb" aria-label="Brödsmulor"><a href="/">Startsida</a><span aria-hidden="true"> / </span><span aria-current="page">Historien</span></nav>
          <div className="history-page-title">
            <p className="eyebrow">Greta och Johan Kock</p>
            <h1>Historien bakom ett levande arv.</h1>
            <p>För att förstå stiftelsernas uppdrag i dag behöver vi börja med människorna och staden som formade det.</p>
          </div>
        </div>

        <section className="history-people" aria-labelledby="people-title">
          <div className="shell history-people-grid">
            <div className="history-people-copy">
              <p className="eyebrow">01 / Människorna</p>
              <h2 id="people-title">Greta, Johan och Trelleborg.</h2>
              <p>Johan Kock föddes i Trelleborg och Greta Herrlin i Sparreholm. De gifte sig 1891 och bosatte sig i köpmansgården vid Östergatan, där familjen Kock hade haft sitt hem och sin handelsrörelse i generationer.</p>
              <p>Deras liv och det som byggdes upp i Trelleborg blev utgångspunkten för stiftelsernas fortsatta arbete.</p>
              <ol className="history-moments">
                {moments.map((moment) => <li key={moment.year}><strong>{moment.year}</strong><span>{moment.text}</span></li>)}
              </ol>
            </div>
            <div className="history-portrait-pair" aria-label="Historiska porträtt av Johan och Greta Kock">
              <figure>
                <div className="scan-crop scan-crop-johan"><Image src="/images/archive/johan-greta-book-page-11.jpg" alt="Historiskt fotografi av Johan Kock" width={3679} height={6282} sizes="(max-width: 760px) 120vw, 60vw" /></div>
                <figcaption>Johan Kock</figcaption>
              </figure>
              <figure>
                <div className="scan-crop scan-crop-greta"><Image src="/images/archive/johan-greta-book-page-11.jpg" alt="Historiskt fotografi av Greta Kock, född Herrlin" width={3679} height={6282} sizes="(max-width: 760px) 120vw, 60vw" /></div>
                <figcaption>Greta Kock <span>född Herrlin</span></figcaption>
              </figure>
              <p className="history-photo-source">Porträtt ur det tillhandahållna bokutdraget, s. 11.</p>
            </div>
          </div>
        </section>

        <section className="history-greta" aria-labelledby="greta-title">
          <div className="shell history-greta-grid">
            <figure className="history-couple-photo">
              <div className="scan-crop scan-crop-couple"><Image src="/images/archive/greta-book-page-27.jpg" alt="Historiskt fotografi av Greta och Johan Kock som nygifta" width={3679} height={6282} sizes="(max-width: 760px) 150vw, 80vw" /></div>
              <figcaption>Det nygifta paret · ur bokutdraget, s. 27</figcaption>
            </figure>
            <div className="history-greta-copy">
              <p className="eyebrow">02 / Livet tillsammans</p>
              <h2 id="greta-title">Greta Kocks liv.</h2>
              <p>Margaretha (Greta) Herrlin föddes i Sparreholm den 20 maj 1872. Under ungdomsåren bodde hon i Sala, dit familjen flyttade när hennes far blev stationsinspektor.</p>
              <p>Vid 19 års ålder gifte hon sig med Johan Kock. Medan Johan byggde upp sina industrier i Trelleborg skildras Greta i bokutdraget som värdinna i familjens gästfria hem vid Östergatan.</p>
              <p>Bokförfattaren beskriver henne som tillbakadragen och skriver att hon varken var politiskt engagerad eller aktiv i föreningslivet. Under senare år vistades hon tidvis utomlands av hälsoskäl.</p>
              <p className="history-text-source">Bearbetat från det tillhandahållna bokutdraget, ”Greta Kocks levnad”, s. 27.</p>
            </div>
          </div>
        </section>

        <section className="shell interior-section" aria-labelledby="industry-title">
          <div className="text-split"><p className="eyebrow">Handel och industri</p><div><h2 id="industry-title">Johan Kocks företag formade staden.</h2><p>Den 8 juli 1889 tog Johan Kock officiellt över familjeföretaget. Han avyttrade butiksrörelsen för att koncentrera sig på partihandeln med spannmål och fodervaror, timmer och byggmaterial, järnvaror och kol. Resultaten förbättrades. Under praktikåren utomlands hade han sett att en ny industriell epok stod för dörren. Följande företag startades och drevs av Johan Kock.</p><ol className="archive-list"><li><span>1894</span><strong>Trelleborgs Bryggeri AB</strong></li><li><span>1894</span><strong>Trelleborgs Stenkolsbolag AB</strong></li><li><span>1896</span><strong>AB Velox</strong></li><li><span>1898</span><strong>Kocks Snickerifabriker AB</strong></li><li><span>1899</span><strong>Sydsvenska Cementvarubolaget</strong></li><li><span>1905</span><strong>Trelleborgs Gummifabrik AB</strong></li><li><span>1919</span><strong>Trelleborgs Glasindustri AB</strong></li></ol></div></div>
        </section>

        <section className="interior-band" aria-labelledby="legacy-title"><div className="shell text-split"><p className="eyebrow">Från företag till stiftelser</p><div><h2 id="legacy-title">Ett arv med flera uppdrag.</h2><p>Greta avled 1941 och Johan 1945. Deras äktenskap förblev barnlöst. De förordnade att deras kvarlåtenskap skulle gå till tre stiftelser. Två av dem finns fortfarande kvar: stiftelsen för behövande unga, gamla eller sjuka och stiftelsen för Trelleborgs stads försköning. En släktstiftelse är senare avvecklad.</p><p>Stiftelsen Hemmet för gamla bildades i början av 1950-talet. Tillsammans bär verksamheterna arvet vidare genom sociala insatser, forskning och arbete för Trelleborg.</p><a className="text-link" href="/stiftelserna">Se stiftelsernas ändamål</a></div></div></section>

        <section className="history-places" aria-labelledby="places-title">
          <div className="shell history-places-intro">
            <p className="eyebrow">03 / Platserna</p>
            <div><h2 id="places-title">Staden omkring dem.</h2><p>Det tillhandahållna bokutdraget visar miljön där familjens handel och Trelleborgs industriella utveckling möttes.</p></div>
          </div>
          <figure className="shell history-east-entrance">
            <div className="scan-crop scan-crop-east-entrance"><Image src="/images/archive/johan-greta-book-page-11.jpg" alt="Historisk akvarell av östra infarten till Trelleborg på 1890-talet" width={3679} height={6282} sizes="(max-width: 760px) 130vw, 100vw" /></div>
            <figcaption><strong>Östra infarten till Trelleborg på 1890-talet.</strong> Till vänster syns Kockska handelshuset. På den öppna platsen byggde AB Velox, som senare blev grunden för Trelleborg AB, sin fabrik 1897. Akvarell av Erik Mattsson, enligt bokutdragets bildtext (s. 11).</figcaption>
          </figure>
          <div className="shell history-more-art-heading"><p className="eyebrow">Fler bilder ur arkivet</p><p>Bevarade akvareller av stadsmiljöer och industriella byggnader.</p></div>
          <div className="shell historical-artwork">
            <figure className="historical-artwork-large">
              <div className="historical-crop crop-red-building"><Image src="/images/illustrations/trelleborg-akvarell.jpg" alt="Akvarell av en röd äldre byggnad" fill sizes="(max-width: 760px) 100vw, 80vw" /></div>
              <figcaption><span>Stadsmiljö i akvarell</span><small>Ur bildarkivet</small></figcaption>
            </figure>
            <div className="historical-artwork-pair">
              <figure>
                <div className="historical-crop crop-street"><Image src="/images/illustrations/gatumiljo-akvarell.jpg" alt="Akvarell av äldre hus längs en gata" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
                <figcaption><span>En äldre gatumiljö</span><small>Ur bildarkivet</small></figcaption>
              </figure>
              <figure>
                <div className="historical-crop crop-industry"><Image src="/images/illustrations/industrimiljo-akvarell.jpg" alt="Akvarell av en industrimiljö med två skorstenar" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
                <figcaption><span>Industrimiljö</span><small>Ur bildarkivet</small></figcaption>
              </figure>
            </div>
            <div className="historical-artwork-pair">
              <figure><div className="historical-crop crop-source-yellow"><Image src="/images/migrated/f49b97014868.jpg" alt="Historisk akvarell av en gul byggnad i Trelleborg" fill sizes="(max-width: 760px) 100vw, 45vw" /></div><figcaption><span>Byggnad i Trelleborg</span><small>Ur bildarkivet</small></figcaption></figure>
              <figure><div className="historical-crop crop-source-factory"><Image src="/images/migrated/b38ab6a1f2e7.jpg" alt="Historisk akvarell av en fabriksbyggnad med skorsten" fill sizes="(max-width: 760px) 100vw, 45vw" /></div><figcaption><span>Handel och industri</span><small>Ur bildarkivet</small></figcaption></figure>
            </div>
          </div>
        </section>

        <section className="shell interior-section" aria-labelledby="ebook-title"><div className="text-split"><p className="eyebrow">Läs vidare</p><div><h2 id="ebook-title">Ett levande arv – hela boken.</h2><p>Ingrid Walls biografi om Greta och Johan Kock berättar om människorna, livsgärningen och stiftelsernas betydelse för Trelleborg. Läs boken digitalt direkt i webbläsaren.</p><a className="dark-button" href="https://heyzine.com/flip-book/2b2428674c.html#page/1" target="_blank" rel="noopener noreferrer">Öppna e-boken ↗</a></div></div></section>
        <section className="history-today" aria-labelledby="today-title">
          <div className="shell history-today-grid">
            <p className="eyebrow">04 / I dag</p>
            <div><h2 id="today-title">Arvet fortsätter att verka.</h2><p>Historien förklarar var resurserna kommer ifrån. Stiftelsernas uppdrag avgör hur de används i dag.</p><a href="/#vad-vi-gor">Se vad stiftelserna gör <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>
        <p className="shell history-source">Historiska uppgifter och fotografier är hämtade ur de tillhandahållna bokutdragen, s. 11 och 27, samt från stiftelsernas nuvarande bakgrundssida. Övriga illustrationer kommer från tillhandahållet arkivmaterial.</p>
      </main>
      <SiteFooter contact={siteContent.contact} />
    </>
  );
}
