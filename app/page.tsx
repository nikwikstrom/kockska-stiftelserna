import Image from "next/image";
import { ActiveCalls } from "@/components/active-calls";
import { AudiencePaths } from "@/components/audience-paths";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getHomepageContent } from "@/lib/content";

export default async function HomePage() {
  const { hero, audiences, calls, workAreas, history, news, contact } = await getHomepageContent();

  return (
    <>
      <a href="#main" className="skip-link">Hoppa till innehåll</a>
      <SiteHeader />
      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow"><span className="accent-line" aria-hidden="true" />{hero.eyebrow}</p>
              <h1 id="hero-title">Ett arv som fortfarande <em>gör skillnad.</em></h1>
              <p className="hero-intro">{hero.intro}</p>
              <div className="hero-actions">
              <a className="light-button" href="/sok-stod">Sök stöd <span aria-hidden="true">↗</span></a>
                <a className="hero-secondary" href="#vad-vi-gor">Upptäck vårt arbete <span aria-hidden="true">↓</span></a>
              </div>
            </div>
            <aside className="hero-principle" aria-label="Arv, ansvar och verkan">
              <p>Det som för oss vidare</p>
              <ol>
                <li><span>01</span><strong>Arv</strong><small>En historia med rötter i Trelleborg.</small></li>
                <li><span>02</span><strong>Ansvar</strong><small>Resurser som förvaltas med omsorg.</small></li>
                <li><span>03</span><strong>Verkan</strong><small>Stöd som möter behov i dag.</small></li>
              </ol>
            </aside>
          </div>
          <div className="shell hero-bottom"><span>Arv <i aria-hidden="true">→</i> Ansvar <i aria-hidden="true">→</i> Verkan</span><span>För Trelleborg. För forskning. För framtiden.</span></div>
        </section>

        <AudiencePaths audiences={audiences} />
        <ActiveCalls allCalls={calls} />

        <section id="vad-vi-gor" className="work-section section-space" aria-labelledby="work-title">
          <div className="shell">
            <div className="section-heading-grid">
              <p className="eyebrow">Vår verksamhet <span>03 / 03</span></p>
              <div><h2 id="work-title" className="section-title">Det arvet möjliggör.</h2><p className="section-intro">Olika ändamål, samma långsiktiga uppdrag: att låta resurserna komma till nytta.</p></div>
            </div>
            <div className="work-grid">
              {workAreas.map((area) => <article className="work-item" key={area.number}><span className="work-number">{area.number}</span><h3>{area.title}</h3><p>{area.body}</p></article>)}
            </div>
          </div>
        </section>

        <section id="om-kockska" className="history-section" aria-labelledby="history-title">
          <div className="shell history-grid">
            <div className="history-copy">
              <p className="eyebrow">{history.eyebrow} <span>Greta & Johan Kock</span></p>
              <h2 id="history-title">{history.title}</h2>
              <p>{history.body}</p>
              <a className="history-link" href="/om-kockska/historia">Läs om Greta, Johan och Trelleborg <span aria-hidden="true">↗</span></a>
            </div>
            <figure className="history-figure">
              <div className="scan-crop scan-crop-couple"><Image src={history.image} alt={history.imageAlt} width={3679} height={6282} sizes="(max-width: 760px) 455px, 585px" /></div>
              <figcaption>Det nygifta paret · ur bokutdraget, s. 27</figcaption>
            </figure>
          </div>
        </section>

        <section className="governance-section section-space" aria-labelledby="governance-title">
            <div className="shell governance-grid"><p className="eyebrow">Ansvar & insyn</p><div><h2 id="governance-title">Förtroende bygger på att visa hur beslut fattas.</h2><p>Stiftelsernas styrelse beslutar om stöd. Forskningsansökningar granskas av ett vetenskapligt råd innan styrelsen fattar beslut.</p><a className="text-link" href="/om-kockska/organisation">Möt styrelsen och det vetenskapliga rådet</a></div><div className="governance-mark" aria-hidden="true">A<span>→</span>V</div></div>
        </section>

        <section id="aktuellt" className="news-section section-space" aria-labelledby="news-title">
          <div className="shell"><div className="section-heading-grid"><p className="eyebrow">Aktuellt</p><div><h2 id="news-title" className="section-title">Det som händer nu.</h2></div></div><article className="news-feature"><div className="news-date"><strong>25</strong><span>September<br />2026</span></div><div><p className="overline">{news.category}</p><h3>{news.title}</h3><p>{news.body}</p><a className="text-link" href="/aktuellt">Se alla nyheter</a><span className="news-caption">Källa: stiftelsens nyhetsarkiv</span></div></article></div>
        </section>
      </main>
      <SiteFooter contact={contact} />
    </>
  );
}
