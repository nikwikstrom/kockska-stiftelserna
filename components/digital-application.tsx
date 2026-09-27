"use client";
import { useEffect, useRef, useState } from "react";
type Receipt = { id: string; receivedAt: string; fileCount: number };
export function DigitalApplication({ kind }: { kind: "privatpersoner" | "foreningar" | "aldre" }) {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const submissionId = useRef(""); const receiptRef = useRef<HTMLDivElement>(null);
  useEffect(() => { fetch("/api/application-status", { cache: "no-store" }).then(r => r.ok ? r.json() : Promise.reject()).then(d => setEnabled(d.enabled === true)).catch(() => setEnabled(false)); }, []);
  useEffect(() => { if (receipt) receiptRef.current?.focus(); }, [receipt]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy) return;
    setError("");
    const form = new FormData(event.currentTarget);
    const uploaded = [...form.getAll("application"), ...form.getAll("attachments")].filter((f): f is File => f instanceof File && f.size > 0);
    if (uploaded.length > 10 || uploaded.some(f => f.size > 8 * 1024 * 1024) || uploaded.reduce((n, f) => n + f.size, 0) > 24 * 1024 * 1024) { setError("Välj högst 10 filer. Varje fil får vara högst 8 MB och alla tillsammans högst 24 MB."); return; }
    if (!submissionId.current) submissionId.current = crypto.randomUUID();
    form.set("submissionId", submissionId.current); form.set("kind", kind);
    setBusy(true);
    try {
      const response = await fetch("/api/applications", { method: "POST", body: form, headers: { "X-Kockska-Request": "1" } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Ansökan kunde inte skickas.");
      setFiles(uploaded.map(f => f.name)); setReceipt(data);
    } catch (e) { setError(e instanceof Error ? e.message : "Anslutningen bröts. Försök igen med samma uppgifter. En mottagen ansökan registreras inte dubbelt."); }
    finally { setBusy(false); }
  }
  function saveReceipt() {
    if (!receipt) return;
    const body = `Kockska stiftelserna — mottagningskvitto\n\nReferens: ${receipt.id}\nMottagen: ${new Date(receipt.receivedAt).toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" })}\nStödform: ${kind}\nFiler: ${receipt.fileCount}\n${files.join("\n")}\n\nAnsökan är lagrad i webbplatsens skyddade inkorg. Kvittot är inte ett beslut om bidrag. Ingen e-postbekräftelse skickas automatiskt. Spara referensen.\nKontakt: info@kockskastiftelsen.se, 0410-133 20\n`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `kockska-kvitto-${receipt.id}.txt`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  if (receipt) return <div className="submission-receipt" tabIndex={-1} ref={receiptRef}><p className="eyebrow">Mottagningskvitto</p><h3>Din ansökan är inlämnad.</h3><p>Blanketten och {receipt.fileCount - 1} bilagor är lagrade i webbplatsens skyddade inkorg.</p><dl><dt>Din referens</dt><dd className="receipt-reference">{receipt.id}</dd><dt>Mottagen</dt><dd>{new Date(receipt.receivedAt).toLocaleString("sv-SE", { timeZone: "Europe/Stockholm" })}</dd></dl><p>Spara kvittot. Ingen bekräftelse skickas automatiskt via e-post. Kvittot bekräftar mottagning och är inte ett beslut om bidrag.</p><button className="dark-button" type="button" onClick={saveReceipt}>Spara mottagningskvitto ↓</button><p>Vid frågor: ange referensen när du <a href="/kontakt">kontaktar kansliet</a>.</p></div>;
  if (enabled === null) return <p role="status">Kontrollerar digital mottagning…</p>;
  if (!enabled) return <div className="notice"><h3>Digital mottagning öppnar efter anslutning av kansliet.</h3><p>Du kan förbereda blanketten och bilagorna nu. Använd postadressen nedan för att lämna in under tiden.</p><a className="text-link" href="/kontakt">Kontakta kansliet →</a></div>;
  return <form className="digital-form" onSubmit={submit} aria-busy={busy}>
    <h3>Lämna in digitalt</h3><p>Ladda upp den ifyllda, undertecknade blanketten och bilagorna. Du får ett mottagningskvitto direkt här när överföringen är klar. Du behöver inget konto.</p>
    <fieldset disabled={busy}><legend>Kontakt för ansökan</legend><label>{kind === "foreningar" ? "Föreningens namn och kontaktperson" : "Sökandens namn"}<input name="name" autoComplete="name" required maxLength={180} /></label><div className="form-columns"><label>E-post<input name="email" type="email" autoComplete="email" required maxLength={254} /></label><label>Telefon<input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label></div></fieldset>
    <fieldset disabled={busy}><legend>Blankett och bilagor</legend><p id="file-limits">PDF, JPG eller PNG. Högst 8 MB per fil, 10 filer och 24 MB sammanlagt. Personnummer och ekonomiska uppgifter anges i blanketten.</p><label>Undertecknad ansökningsblankett (PDF)<input name="application" type="file" accept="application/pdf,.pdf" required aria-describedby="file-limits" /></label><label>Bilagor (välj flera filer samtidigt)<input name="attachments" type="file" accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png" multiple aria-describedby="file-limits" /></label></fieldset>
    <fieldset disabled={busy} className="form-declarations"><legend>Kontroll före inlämning</legend><label><input type="checkbox" name="signed" value="yes" required /><span>Blanketten är fullständigt ifylld och undertecknad av de personer som ska skriva under.</span></label><label><input type="checkbox" name="attachmentsComplete" value="yes" required /><span>Jag har bifogat de underlag som gäller min ansökan enligt checklistan ovan.</span></label><label><input type="checkbox" name="privacy" value="yes" required /><span>Jag har läst <a href="/integritet#digital-inlamning" target="_blank" rel="noopener noreferrer">informationen om digital inlämning och integritet ↗</a>.</span></label></fieldset>
    <div className="form-trap" aria-hidden="true"><label>Webbplats<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="dark-button" type="submit" disabled={busy}>{busy ? "Skickar blankett och bilagor…" : "Lämna in ansökan →"}</button><p className="form-note">Stäng inte sidan under överföringen. Ansökan är mottagen först när du ser ditt kvitto. Uppgifterna sparas inte i webbläsaren när sidan stängs.</p>
  </form>;
}
