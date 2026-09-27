"use client";
import { useEffect, useState } from "react";
type Item = { id: string; kind: string; name: string; email: string; phone: string; status: string; created_at: string; state?: string };
type Attachment = { id: string; filename: string; size: number; role: string };
const statuses: Record<string, string> = { received: "Mottagen", reviewing: "Under handläggning", handled: "Handlagd" };
const kinds: Record<string, string> = { privatpersoner: "Privatperson", foreningar: "Förening", aldre: "Äldre / bostadsbidrag" };
async function api(path: string, options?: RequestInit) {
  const response = await fetch(path, { ...options, cache: "no-store", headers: { "X-Kockska-Request": "1", ...options?.headers } });
  const data = await response.json(); if (!response.ok) throw new Error(data.error || "Inkorgen kunde inte hämtas."); return data;
}
export function ApplicationInbox() {
  const [session, setSession] = useState<{ user: { id: string; email: string } | null; allowed: boolean } | null>(null);
  const [items, setItems] = useState<Item[]>([]), [next, setNext] = useState<string | null>(null);
  const [detail, setDetail] = useState<{ application: Item; files: Attachment[] } | null>(null);
  const [error, setError] = useState(""), [busy, setBusy] = useState(false);
  async function list(cursor?: string) {
    setBusy(true); setError("");
    try { const data = await api(`/api/kansli/applications${cursor ? `?before=${encodeURIComponent(cursor)}` : ""}`); setItems(old => cursor ? [...old, ...data.items] : data.items); setNext(data.next); }
    catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  useEffect(() => { api("/api/session").then(data => { setSession(data); if (data.allowed) void list(); }).catch(() => setError("Inloggningen kunde inte kontrolleras. Ladda om sidan.")); }, []);
  async function open(id: string) { setBusy(true); setError(""); try { setDetail(await api(`/api/kansli/applications/${id}`)); } catch (e) { setError((e as Error).message); } finally { setBusy(false); } }
  async function status(value: string) {
    if (!detail) return; setBusy(true); setError("");
    try { await api(`/api/kansli/applications/${detail.application.id}`, { method: "PATCH", body: JSON.stringify({ status: value }), headers: { "Content-Type": "application/json" } }); setDetail({ ...detail, application: { ...detail.application, status: value } }); }
    catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  async function remove() {
    if (!detail || !window.confirm("Radera ansökan och samtliga bilagor permanent? Kontrollera först att stiftelsens beslutade bevarandetid medger radering.")) return;
    setBusy(true); setError("");
    try { await api(`/api/kansli/applications/${detail.application.id}`, { method: "DELETE", headers: { "X-Confirm-Delete": detail.application.id } }); setDetail(null); await list(); }
    catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  return <div className="shell inbox-layout" aria-busy={busy}>{error && <p role="alert" className="form-error">{error}</p>}{!session && !error && <p role="status">Kontrollerar inloggning…</p>}
    {session && !session.user && <div className="prose-content"><h2>Logga in till kansliet</h2><p>Endast behöriga handläggare kan se ansökningar och bilagor.</p><a className="dark-button" href="/signin-with-chatgpt?return_to=%2Fkansli" target="_top">Logga in med ChatGPT →</a></div>}
    {session?.user && !session.allowed && <div className="prose-content"><h2>Kontot saknar behörighet</h2><p>Du är inloggad som {session.user.email}. Webbplatsens administratör behöver lägga till ditt konto innan du kan öppna inkorgen.</p><details><summary>Kontouppgift för behörighetsansvarig</summary><p className="receipt-reference">{session.user.id}</p></details><a href="/signout-with-chatgpt?return_to=%2Fkansli" target="_top">Logga ut</a></div>}
    {session?.allowed && <><div className="inbox-toolbar"><p>Inloggad: {session.user?.email}</p><a className="text-link" href="/signout-with-chatgpt?return_to=%2Fkansli" target="_top">Logga ut</a></div>
      {detail ? <div className="inbox-detail"><button className="text-link" disabled={busy} onClick={() => { setDetail(null); void list(); }}>← Alla ansökningar</button><h2>{detail.application.name}</h2><dl><dt>Stödform</dt><dd>{kinds[detail.application.kind]}</dd><dt>Referens</dt><dd>{detail.application.id}</dd><dt>Mottagen</dt><dd>{new Date(detail.application.created_at).toLocaleString("sv-SE")}</dd><dt>Kontakt</dt><dd>{detail.application.email}<br />{detail.application.phone}</dd></dl><label>Handläggningsstatus<select className="inbox-select" value={detail.application.status} disabled={busy} onChange={e => void status(e.target.value)}>{Object.entries(statuses).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><p>Statusen skickas inte som ett beslut till sökanden. Bedömning och återkoppling görs av kansliet.</p><h3>Blankett och bilagor</h3><ul className="inbox-files">{detail.files.map(file => <li key={file.id}><a href={`/api/kansli/applications/${detail.application.id}/files/${file.id}`}>{file.role === "application" ? "Ansökningsblankett: " : ""}{file.filename} ↓</a><small> · {Math.ceil(file.size / 1024)} kB</small></li>)}</ul><p className="form-note">Filer från sökande har kontrollerats för format och storlek, men inte virusskannats. Använd en uppdaterad PDF-/bildläsare och kansliets skyddade arbetsmiljö.</p><details className="danger-zone"><summary>Gallring</summary><p>Radering tar bort ansökan och filerna permanent. Följ stiftelsens beslutade bevarandetider.</p><button type="button" disabled={busy} onClick={() => void remove()}>Radera ansökan och bilagorna</button></details></div>
      : <><div className="inbox-toolbar"><h2>Inkomna ansökningar</h2><button className="text-link" disabled={busy} onClick={() => void list()}>Uppdatera inkorgen ↻</button></div><p>Kontrollera inkorgen regelbundet. Inga automatiska e-postaviseringar skickas.</p>{!busy && !items.length && !error && <p>Inga ansökningar har kommit in ännu.</p>}{items.map(item => <button className="inbox-row" disabled={busy} key={item.id} onClick={() => void open(item.id)}><strong>{item.name}</strong><span>{kinds[item.kind]} · {item.state === "deleting" ? "Radering behöver slutföras" : statuses[item.status]} · {new Date(item.created_at).toLocaleDateString("sv-SE")}</span></button>)}{next && <button className="dark-button" disabled={busy} onClick={() => void list(next)}>Visa fler ansökningar</button>}</>}
    </>}
  </div>;
}
