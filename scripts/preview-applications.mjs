// Local integration preview. Only synthetic identities; binds loopback exclusively.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import worker from '../worker/index.mjs';
import { environment } from '../tests/support.mjs';
const env=environment(), root=resolve('out');
const mimes={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.pdf':'application/pdf'};
env.ASSETS.fetch=async request=>{
 const path=decodeURIComponent(new URL(request.url).pathname);const base=resolve(root,'.'+path);
 if(!base.startsWith(root+'/')&&base!==root)return new Response('Forbidden',{status:403});
 for(const p of [base,base+'.html',base+'/index.html']){try{if(!(await stat(p)).isFile())continue;return new Response(await readFile(p),{headers:{'content-type':mimes[extname(p)]||'application/octet-stream'}});}catch{}}
 return new Response(await readFile(root+'/404.html'),{status:404,headers:{'content-type':'text/html'}});
};
createServer(async(req,res)=>{
 try {
 const url='http://127.0.0.1:3221'+req.url;
 if(req.url.startsWith('/signin-with-chatgpt')){res.writeHead(302,{'set-cookie':'local_test_admin=1; Path=/; HttpOnly; SameSite=Lax',location:'/kansli'});res.end();return;}
 if(req.url.startsWith('/signout-with-chatgpt')){res.writeHead(302,{'set-cookie':'local_test_admin=; Path=/; Max-Age=0',location:'/kansli'});res.end();return;}
 const headers=new Headers(req.headers);
 for(const k of [...headers.keys()])if(k.startsWith('oai-authenticated-user-'))headers.delete(k);
 if((req.headers.cookie||'').split(';').map(x=>x.trim()).includes('local_test_admin=1')){headers.set('oai-authenticated-user-id','test-admin');headers.set('oai-authenticated-user-email','admin@example.test');}
 const request=new Request(url,{method:req.method,headers,...(req.method!=='GET'&&req.method!=='HEAD'?{body:req,duplex:'half'}:{})});
 const response=await worker.fetch(request,env);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500);res.end('Preview error');}
}).listen(3221,'127.0.0.1',()=>console.log('Synthetic application preview on http://127.0.0.1:3221'));
