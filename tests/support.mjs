import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
export function environment() {
 const db = new DatabaseSync(':memory:');
 for (const file of readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort()) db.exec(readFileSync(`drizzle/${file}`, 'utf8'));
 const objects = new Map();
 const DB = {
  prepare(query) { return { bind(...values) { return {
   async first() { return db.prepare(query).get(...values) || null; },
   async all() { return { results: db.prepare(query).all(...values) }; },
   async run() { return { meta: { changes: db.prepare(query).run(...values).changes } }; },
   _query:query,_values:values,
  }; } }; },
  async batch(statements) { db.exec('BEGIN'); try { const result = statements.map(s=>({results:db.prepare(s._query).all(...s._values)})); db.exec('COMMIT'); return result; } catch(e) {db.exec('ROLLBACK');throw e;} }
 };
 return { DB, BUCKET: { async put(k,v){objects.set(k,v);}, async get(k){const v=objects.get(k);return v?{body:v}:null;}, async delete(keys){for(const k of Array.isArray(keys)?keys:[keys]) objects.delete(k);} }, ASSETS:{async fetch(){return new Response('asset');}}, APPLICATIONS_ENABLED:'true', APPLICATION_ADMIN_IDS:'test-admin', APPLICATION_ORIGIN:'http://127.0.0.1:3221', db,objects };
}
