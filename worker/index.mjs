const TYPES = new Set(['privatpersoner', 'foreningar', 'aldre']);
const MAX_FILE = 8 * 1024 * 1024, MAX_TOTAL = 24 * 1024 * 1024, MAX_BODY = MAX_TOTAL + 128 * 1024;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PRIVATE = { 'cache-control': 'private, no-store', 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' };
const json = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { ...PRIVATE, 'content-type': 'application/json; charset=utf-8' } });
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
const fail = (status, message) => { throw new HttpError(status, message); };
const sql = (env, query, ...values) => env.DB.prepare(query).bind(...values);
const now = () => new Date().toISOString();
const hash = async value => [...new Uint8Array(await crypto.subtle.digest('SHA-256', typeof value === 'string' ? new TextEncoder().encode(value) : value))].map(b => b.toString(16).padStart(2, '0')).join('');
function identity(request) {
  const id = request.headers.get('oai-authenticated-user-id');
  const email = request.headers.get('oai-authenticated-user-email');
  return id && email ? { id, email } : null;
}
function admin(request, env) {
  const user = identity(request);
  if (!user) fail(401, 'Logga in för att öppna kansliets inkorg.');
  if (!(env.APPLICATION_ADMIN_IDS || '').split(',').map(s => s.trim()).filter(Boolean).includes(user.id)) fail(403, 'Ditt konto har inte behörighet till ansökningarna.');
  return user;
}
function ready(env) { return env.APPLICATIONS_ENABLED === 'true' && Boolean(env.APPLICATION_ADMIN_IDS?.trim()) && Boolean(env.DB && env.BUCKET); }
function checkOrigin(request, env) {
  const origin = env.APPLICATION_ORIGIN || new URL(request.url).origin;
  if (request.headers.get('origin') !== origin || request.headers.get('x-kockska-request') !== '1') fail(403, 'Öppna formuläret på webbplatsen och försök igen.');
}
async function audit(env, id, actor, action) {
  await sql(env, 'INSERT INTO application_audit (id, application_id, actor, action, created_at) VALUES (?, ?, ?, ?, ?)', crypto.randomUUID(), id, actor, action, now()).run();
}
async function boundedForm(request) {
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) fail(415, 'Använd webbplatsens formulär.');
  if (Number(request.headers.get('content-length')) > MAX_BODY) fail(413, 'Filerna får tillsammans vara högst 24 MB.');
  const reader = request.body?.getReader();
  if (!reader) fail(400, 'Ansökan saknas.');
  const chunks = []; let length = 0;
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY) { await reader.cancel(); fail(413, 'Filerna får tillsammans vara högst 24 MB.'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { return await new Response(bytes, { headers: { 'content-type': request.headers.get('content-type') } }).formData(); }
  catch { fail(400, 'Filöverföringen kunde inte läsas. Välj filerna på nytt.'); }
}
async function limit(env, request) {
  const stamp = Date.now(), hour = Math.floor(stamp / 3600000), day = Math.floor(stamp / 86400000);
  // IP values are never stored. Daily salt prevents correlation across days.
  const ip = await hash(`${day}:${request.headers.get('cf-connecting-ip') || 'unknown'}`);
  const keys = [`ip:${hour}:${ip}`, `day:${day}`];
  const results = await env.DB.batch(keys.map(key => sql(env, 'INSERT INTO application_rate_limits (key, count, expires) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = count + 1 RETURNING count', key, stamp + 86400000)));
  await sql(env, 'DELETE FROM application_rate_limits WHERE expires < ?', stamp).run();
  if (results[0].results[0].count > 12 || results[1].results[0].count > 300) fail(429, 'För många försök just nu. Vänta en stund eller kontakta kansliet. Behåll dina filer.');
}
function field(form, name, max, required = true) {
  if (form.getAll(name).length > 1) fail(400, 'Ett formulärfält har skickats flera gånger.');
  const value = form.get(name);
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) fail(400, `Kontrollera fältet ${name}.`);
  return value.trim();
}
async function upload(form, role, required) {
  const entries = form.getAll(role).filter(f => typeof f !== 'string' && f.size > 0);
  if (required && entries.length !== 1) fail(400, 'Bifoga en undertecknad ansökningsblankett som PDF.');
  const result = [];
  for (const file of entries) {
    if (file.size > MAX_FILE) fail(413, 'En fil är större än 8 MB.');
    const bytes = await file.arrayBuffer(); const b = new Uint8Array(bytes);
    const pdf = new TextDecoder().decode(b.slice(0, 5)) === '%PDF-';
    const jpg = b[0] === 255 && b[1] === 216 && b[2] === 255;
    const png = b.slice(0, 8).every((v, i) => v === [137,80,78,71,13,10,26,10][i]) && b.length > 8;
    const mime = pdf ? 'application/pdf' : jpg ? 'image/jpeg' : png ? 'image/png' : '';
    const extension = pdf ? /\.pdf$/i : jpg ? /\.jpe?g$/i : /\.png$/i;
    if (!mime || !extension.test(file.name) || (required && !pdf)) fail(400, 'Blanketten ska vara PDF. Bilagor ska vara PDF, JPG eller PNG med rätt filändelse.');
    result.push({ bytes, mime, size: file.size, filename: file.name.replace(/[\x00-\x1f\x7f/\\]/g, '_').slice(0, 180), role, sha256: await hash(bytes), id: crypto.randomUUID() });
  }
  return result;
}
async function submit(request, env) {
  checkOrigin(request, env);
  if (!ready(env)) fail(503, 'Digital mottagning är inte öppen just nu. Använd postadressen i ansökningsguiden eller kontakta kansliet.');
  await limit(env, request);
  const form = await boundedForm(request);
  if (form.get('website')) fail(400, 'Formuläret kunde inte skickas.');
  const id = field(form, 'submissionId', 36); if (!UUID.test(id)) fail(400, 'Ladda om formuläret innan du skickar.');
  const kind = field(form, 'kind', 20); if (!TYPES.has(kind)) fail(400, 'Välj en giltig stödform.');
  const name = field(form, 'name', 180), email = field(form, 'email', 254), phone = field(form, 'phone', 40);
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) fail(400, 'Ange en giltig e-postadress.');
  for (const key of ['signed', 'attachmentsComplete', 'privacy']) if (form.get(key) !== 'yes') fail(400, 'Bekräfta underskrift, bilagor och integritetsinformation.');
  const files = [...await upload(form, 'application', true), ...await upload(form, 'attachments', false)];
  if (files.length > 10 || files.reduce((s, f) => s + f.size, 0) > MAX_TOTAL) fail(413, 'Högst 10 filer och sammanlagt 24 MB kan skickas.');
  const fingerprint = await hash(JSON.stringify({ kind, name, email, phone, files: files.map(({ filename, role, sha256 }) => ({ filename, role, sha256 })) }));
  const previous = await sql(env, 'SELECT * FROM applications WHERE id = ?', id).first();
  if (previous && previous.fingerprint !== fingerprint) fail(409, 'Det här inlämningsförsöket gäller andra uppgifter. Starta en ny ansökan eller återställ de tidigare uppgifterna.');
  if (previous?.state === 'ready') return json({ id, receivedAt: previous.created_at, fileCount: files.length }, 200);
  if (previous?.state === 'deleting') fail(409, 'Denna ansökan håller på att raderas. Kontakta kansliet.');
  const lease = crypto.randomUUID(), createdAt = previous?.created_at || now();
  const reservation = await sql(env, `INSERT INTO applications (id,fingerprint,kind,name,email,phone,state,status,created_at,lease,updated_at,privacy_version)
    VALUES (?,?,?,?,?,?,'uploading','received',?,?,?,'digital-2026-09-27')
    ON CONFLICT(id) DO UPDATE SET lease=excluded.lease, updated_at=excluded.updated_at
    WHERE applications.state='uploading' AND applications.updated_at < ? RETURNING id`,
    id, fingerprint, kind, name, email, phone, createdAt, lease, now(), new Date(Date.now() - 120000).toISOString()).first();
  if (!reservation) fail(409, 'Din ansökan överförs redan. Vänta ett par minuter och försök sedan igen med samma uppgifter.');
  // Each lease has its own keys: retries cannot overwrite another in-flight upload.
  const keys = files.map(f => `applications/${id}/${lease}/${f.id}`);
  try {
    for (let i = 0; i < files.length; i++) await env.BUCKET.put(keys[i], files[i].bytes, { httpMetadata: { contentType: files[i].mime } });
    const owned = await sql(env, 'SELECT id FROM applications WHERE id = ? AND lease = ? AND state = ?', id, lease, 'uploading').first();
    if (!owned) fail(409, 'Ett nyare inlämningsförsök pågår.');
    await env.DB.batch([
      ...files.map((f, i) => sql(env, 'INSERT INTO application_files (id,application_id,filename,mime,size,sha256,role,object_key) SELECT ?,?,?,?,?,?,?,? WHERE EXISTS (SELECT 1 FROM applications WHERE id=? AND lease=? AND state=?)', f.id, id, f.filename, f.mime, f.size, f.sha256, f.role, keys[i], id, lease, 'uploading')),
      sql(env, "UPDATE applications SET state='ready',updated_at=? WHERE id=? AND lease=? AND state='uploading'", now(), id, lease),
    ]);
    const confirmed = await sql(env, 'SELECT state,lease FROM applications WHERE id=?', id).first();
    if (confirmed?.state !== 'ready' || confirmed.lease !== lease) fail(409, 'Ett nyare inlämningsförsök pågår.');
    return json({ id, receivedAt: createdAt, fileCount: files.length }, 201);
  } catch (error) {
    // A lost response after a committed DB batch must not delete accepted files.
    let confirmed;
    try { confirmed = await sql(env, 'SELECT state,lease FROM applications WHERE id=?', id).first(); } catch { throw error; }
    if (confirmed?.state === 'ready' && confirmed.lease === lease) return json({ id, receivedAt: createdAt, fileCount: files.length });
    await env.BUCKET.delete(keys);
    await sql(env, "DELETE FROM applications WHERE id=? AND lease=? AND state='uploading'", id, lease).run();
    throw error;
  }
}
async function inbox(request, env, path) {
  const user = admin(request, env);
  if (!env.DB || !env.BUCKET) fail(503, 'Inkorgen är tillfälligt otillgänglig.');
  const url = new URL(request.url);
  if (path === '/api/kansli/applications' && request.method === 'GET') {
    const cursor = url.searchParams.get('before') || '9999';
    const rows = await sql(env, "SELECT id,kind,name,email,phone,status,created_at,state FROM applications WHERE state IN ('ready','deleting') AND (created_at || ':' || id) < ? ORDER BY created_at DESC,id DESC LIMIT 51", cursor).all();
    await audit(env, '*', user.id, 'list');
    const items = rows.results.slice(0, 50), last = items.at(-1);
    return json({ items, next: rows.results.length > 50 ? `${last.created_at}:${last.id}` : null });
  }
  const match = path.match(/^\/api\/kansli\/applications\/([a-f0-9-]+)(?:\/files\/([a-f0-9-]+))?$/);
  if (!match || !UUID.test(match[1])) fail(404, 'Ansökan finns inte.');
  const id = match[1], application = await sql(env, "SELECT * FROM applications WHERE id=? AND state IN ('ready','deleting')", id).first();
  if (!application) fail(404, 'Ansökan finns inte.');
  if (match[2] && request.method === 'GET') {
    if (application.state !== 'ready') fail(409, 'Ansökan raderas.');
    const file = await sql(env, 'SELECT * FROM application_files WHERE application_id=? AND id=?', id, match[2]).first();
    if (!file) fail(404, 'Bilagan finns inte.');
    const object = await env.BUCKET.get(file.object_key); if (!object) fail(503, 'Bilagan kunde inte hämtas. Försök igen.');
    await audit(env, id, user.id, `download:${file.id}`);
    return new Response(object.body, { headers: { ...PRIVATE, 'content-type': 'application/octet-stream', 'content-disposition': `attachment; filename="bilaga"; filename*=UTF-8''${encodeURIComponent(file.filename).replace(/'/g, '%27')}`, 'content-security-policy': "sandbox; default-src 'none'" } });
  }
  if (request.method === 'GET' && !match[2]) {
    const files = await sql(env, 'SELECT id,filename,mime,size,role FROM application_files WHERE application_id=? ORDER BY role,filename', id).all();
    await audit(env, id, user.id, 'read');
    const { fingerprint, lease, ...safe } = application; void fingerprint; void lease;
    return json({ application: safe, files: files.results });
  }
  if (match[2]) fail(405, 'Metoden stöds inte.');
  checkOrigin(request, env);
  if (request.method === 'PATCH') {
    if (application.state !== 'ready') fail(409, 'Ansökan raderas.');
    if (Number(request.headers.get('content-length')) > 1024) fail(413, 'För stort anrop.');
    const body = await request.text(); if (body.length > 1024) fail(413, 'För stort anrop.');
    let status; try { status = JSON.parse(body).status; } catch { fail(400, 'Ogiltig status.'); }
    if (!['received', 'reviewing', 'handled'].includes(status)) fail(400, 'Ogiltig status.');
    await env.DB.batch([
      sql(env, 'UPDATE applications SET status=?,updated_at=? WHERE id=?', status, now(), id),
      sql(env, 'INSERT INTO application_audit (id,application_id,actor,action,created_at) VALUES (?,?,?,?,?)', crypto.randomUUID(), id, user.id, `status:${status}`, now()),
    ]);
    return json({ ok: true });
  }
  if (request.method === 'DELETE') {
    if (request.headers.get('x-confirm-delete') !== id) fail(400, 'Bekräfta vilken ansökan som ska raderas.');
    const files = await sql(env, 'SELECT object_key FROM application_files WHERE application_id=?', id).all();
    await sql(env, "UPDATE applications SET state='deleting' WHERE id=?", id).run();
    if (files.results.length) await env.BUCKET.delete(files.results.map(f => f.object_key));
    await env.DB.batch([
      sql(env, 'DELETE FROM application_files WHERE application_id=?', id),
      sql(env, 'DELETE FROM applications WHERE id=?', id),
      sql(env, 'INSERT INTO application_audit (id,application_id,actor,action,created_at) VALUES (?,?,?,?,?)', crypto.randomUUID(), id, user.id, 'delete', now()),
    ]);
    return json({ ok: true });
  }
  fail(405, 'Metoden stöds inte.');
}
export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    try {
      if (path === '/api/application-status' && request.method === 'GET') return json({ enabled: ready(env) });
      if (path === '/api/session' && request.method === 'GET') {
        const user = identity(request); let allowed = false;
        try { admin(request, env); allowed = true; } catch { /* Public identity endpoint returns only this visitor's identity. */ }
        return json({ user, allowed });
      }
      if (path === '/api/applications' && request.method === 'POST') return await submit(request, env);
      if (path.startsWith('/api/kansli/')) return await inbox(request, env, path);
      if (path.startsWith('/api/')) return json({ error: 'Sidan finns inte.' }, 404);
      // Next.js still generates all public pages. No private data is part of the export.
      return await env.ASSETS.fetch(request);
    } catch (error) {
      if (!(error instanceof HttpError)) console.error('Application service unavailable', { path, type: error?.name || 'Error' });
      return json({ error: error instanceof HttpError ? error.message : 'Överföringen kunde inte bekräftas. Dina uppgifter finns kvar i formuläret. Försök igen med samma uppgifter; en mottagen ansökan registreras inte dubbelt.' }, error instanceof HttpError ? error.status : 503);
    }
  },
};
