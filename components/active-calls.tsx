"use client";

import { useEffect, useState } from "react";
import type { Call } from "@/content/site";
import { getActiveCalls, getCallStatus } from "@/lib/calls";

export function ActiveCalls({ allCalls }: { allCalls: readonly Call[] }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const calls = now ? getActiveCalls(allCalls, now) : allCalls;

  return (
    <section id="aktuella-utlysningar" className="calls-section section-space" aria-labelledby="calls-title">
      <div className="shell">
        <div className="section-heading-grid">
          <p className="eyebrow">För dig som söker <span>02 / 03</span></p>
          <div><h2 id="calls-title" className="section-title">Aktuella utlysningar</h2></div>
        </div>
        {calls.length > 0 ? (
          <div className="calls-list">
            {calls.map((call) => {
              const status = now ? getCallStatus(call, now) : null;
              return (
                <article className="call-row" key={call.id}>
                  <div className="call-status"><span className="status-dot" aria-hidden="true" />{status === null ? "Ansökningsperiod" : status === "stanger-snart" ? "Stänger snart" : "Öppen nu"}</div>
                  <div className="call-content">
                    <p className="overline">Medicinsk forskning / 2026</p>
                    <h3>{call.title}</h3>
                    <p className="call-audience">{call.audience}</p>
                    <p className="call-amount">{call.amount}</p>
                  </div>
                  <div className="call-end">
                    <span>Sista ansökningsdag</span>
                    <strong>{call.deadlineLabel}</strong>
                    <a className="dark-button" href={call.applicationUrl} target="_blank" rel="noopener noreferrer">Till ansökan <span className="sr-only">(öppnas i extern tjänst)</span><span aria-hidden="true"> ↗</span></a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : <p className="no-calls">Det finns ingen öppen utlysning just nu. Kontakta kansliet om du har frågor om kommande ansökningsperioder.</p>}
        <p className="source-note">Källa: stiftelsens befintliga utlysningstext, kontrollerad 26 september 2026. Läs fullständiga villkor i ansökningstjänsten.</p>
      </div>
    </section>
  );
}
