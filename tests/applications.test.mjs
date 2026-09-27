import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.mjs';
import { environment } from './support.mjs';
const origin='http://127.0.0.1:3221';
const adminHeaders={'oai-authenticated-user-id':'test-admin','oai-authenticated-user-email':'admin@example.test'};
function form(id=crypto.randomUUID(), kind='foreningar') {
 const f=new FormData(); for(const[k,v]of Object.entries({submissionId:id,kind,name:'TEST — ingen verklig ansökan',email:'test@example.test',phone:'000000000',signed:'yes',attachmentsComplete:'yes',privacy:'yes',website:''})) f.set(k,v);
 f.set('application',new File(['%PDF-1.4\nTEST\n%%EOF'], 'blankett.pdf', {type:'application/pdf'}));
 f.set('attachments',new File(['%PDF-1.4\nBILAGA\n%%EOF'], 'bilaga.pdf', {type:'application/pdf'})); return f;
}
function request(path, options={}) { return new Request(origin+path,options); }
function send(env,f,headers={}) {return worker.fetch(request('/api/applications',{method:'POST',body:f,headers:{origin,'x-kockska-request':'1',...headers}}),env);}
function inbox(env,path='',options={}){return worker.fetch(request('/api/kansli/applications'+path,{...options,headers:{...adminHeaders,origin,'x-kockska-request':'1',...options.headers}}),env);}
test('each grant stores all files, returns a durable receipt and retries exactly once', async()=>{
 const env=environment();for(const kind of ['privatpersoner','foreningar','aldre']){
 const id=crypto.randomUUID();const r=await send(env,form(id,kind));assert.equal(r.status,201);const receipt=await r.json();assert.equal(receipt.id,id);assert.equal(receipt.fileCount,2);
 assert.equal((await send(env,form(id,kind))).status,200);
 }
 assert.equal(env.db.prepare('SELECT COUNT(*) n FROM applications').get().n,3);assert.equal(env.objects.size,6);
 const list=await (await inbox(env)).json();assert.equal(list.items.length,3);
 const detail=await (await inbox(env,'/'+list.items[0].id)).json();assert.equal(detail.files.length,2);assert.ok(!('fingerprint' in detail.application));
 const file=await inbox(env,`/${list.items[0].id}/files/${detail.files[0].id}`);assert.equal(file.status,200);assert.match(file.headers.get('content-disposition'),/attachment/);assert.match(file.headers.get('cache-control'),/no-store/);
});
test('anonymous and non-allowlisted users cannot read, change, delete or download applications',async()=>{
 const env=environment(),id=crypto.randomUUID();await send(env,form(id));const f=env.db.prepare('SELECT id FROM application_files LIMIT 1').get().id;
 for(const path of ['',`/${id}`,`/${id}/files/${f}`]) for(const method of ['GET','PATCH','DELETE']){
 const r=await worker.fetch(request('/api/kansli/applications'+path,{method}),env);assert.equal(r.status,401);
 const other=await worker.fetch(request('/api/kansli/applications'+path,{method,headers:{...adminHeaders,'oai-authenticated-user-id':'stranger'}}),env);assert.equal(other.status,403);
 }
 assert.equal(env.objects.size,2);
});
test('cross-origin, missing declarations, fake PDF, oversize file and disabled intake are rejected',async()=>{
 const env=environment();assert.equal((await send(env,form(),{origin:'https://evil.example'})).status,403);
 let f=form();f.delete('signed');assert.equal((await send(env,f)).status,400);
 f=form();f.set('application',new File(['<script>alert(1)</script>'],'fake.pdf'));assert.equal((await send(env,f)).status,400);
 f=form();f.set('attachments',new File([new Uint8Array(8*1024*1024+1)],'large.pdf'));assert.equal((await send(env,f)).status,413);
 env.APPLICATIONS_ENABLED='false';assert.equal((await send(env,form())).status,503);assert.equal(env.objects.size,0);
});
test('upload failure has no successful receipt and leaves no partial files; a retry succeeds',async()=>{
 const env=environment(),id=crypto.randomUUID(),put=env.BUCKET.put;let n=0;
 env.BUCKET.put=async(...args)=>{if(++n===2)throw Error('injected storage outage');return put(...args);};
 assert.equal((await send(env,form(id))).status,503);assert.equal(env.objects.size,0);assert.equal(env.db.prepare('SELECT COUNT(*) n FROM applications').get().n,0);
 env.BUCKET.put=put;assert.equal((await send(env,form(id))).status,201);
});
test('database commit response loss preserves files and gives the same receipt',async()=>{
 const env=environment(),id=crypto.randomUUID(),batch=env.DB.batch;env.DB.batch=async qs=>{const r=await batch(qs);if(qs.some(q=>q._query.includes('INSERT INTO application_files')))throw Error('lost acknowledgement');return r;};
 assert.equal((await send(env,form(id))).status,200);assert.equal(env.objects.size,2);assert.equal((await send(env,form(id))).status,200);
});
test('IDOR, conflicting retry, status audit and confirmed deletion',async()=>{
 const env=environment(),id=crypto.randomUUID(),otherId=crypto.randomUUID();await send(env,form(id));await send(env,form(otherId));
 const foreign=env.db.prepare('SELECT id FROM application_files WHERE application_id=? LIMIT 1').get(otherId).id;
 assert.equal((await inbox(env,`/${id}/files/${foreign}`)).status,404);
 const changed=form(id);changed.set('name','Another applicant');assert.equal((await send(env,changed)).status,409);
 assert.equal((await inbox(env,'/'+id,{method:'PATCH',body:JSON.stringify({status:'reviewing'})})).status,200);
 assert.equal(env.db.prepare('SELECT status FROM applications WHERE id=?').get(id).status,'reviewing');
 assert.equal((await inbox(env,'/'+id,{method:'DELETE'})).status,400);
 assert.equal((await inbox(env,'/'+id,{method:'DELETE',headers:{'x-confirm-delete':id}})).status,200);
 assert.equal(env.db.prepare('SELECT COUNT(*) n FROM applications').get().n,1);assert.equal(env.objects.size,2);assert.ok(env.db.prepare("SELECT id FROM application_audit WHERE action='delete'").get());
});
test('server-side rate limit stops repeated anonymous submissions',async()=>{
 const env=environment();for(let i=0;i<12;i++)assert.equal((await send(env,form())).status,201);
 assert.equal((await send(env,form())).status,429);
});
