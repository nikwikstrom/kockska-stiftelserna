import type { Audience } from "@/content/site";

export function AudiencePaths({ audiences }: { audiences: readonly Audience[] }) {
  return (
    <section id="sok-stod" className="audience-section section-space" aria-labelledby="audience-title">
      <div className="shell">
        <div className="section-heading-grid">
          <p className="eyebrow">Hitta rätt stöd <span>01 / 03</span></p>
          <div>
            <h2 id="audience-title" className="section-title">Vad söker du stöd för?</h2>
            <p className="section-intro">Börja med den väg som beskriver dig. Du får en överblick över vad som kan vara aktuellt och var du hittar mer information.</p>
          </div>
        </div>
        <div className="audience-list">
          {audiences.map((item) => (
            <details className="audience-item" key={item.id}>
              <summary>
                <span className="audience-number">{item.number}</span>
                <span className="audience-main"><strong>{item.title}</strong><span>{item.intro}</span></span>
                <span className="circle-arrow" aria-hidden="true">↗</span>
              </summary>
              <div className="audience-details">
                <p>{item.details}</p>
                <a className="text-link" href={item.href}>{item.action}<span aria-hidden="true"> ↗</span></a>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
