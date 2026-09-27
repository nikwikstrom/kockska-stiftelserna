"""Regression gate for migration coverage, local links, assets and accessible page structure.
Run after pnpm build. This deliberately checks source content, not component markup.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json,re,hashlib
ROOT=Path(__file__).resolve().parents[1]; OUT=ROOT/'out'
class Page(HTMLParser):
 def __init__(self,html):
  super().__init__();self.parts=[];self.links=[];self.ids=[];self.h1=0;self.skip=0;self.feed(html)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t in ['script','style']:self.skip+=1
  if t=='h1':self.h1+=1
  if 'id' in a:self.ids.append(a['id'])
  if t=='a' and 'href' in a:self.links.append(a['href'])
  if t in ['img','source'] and 'src' in a:self.links.append(a['src'])
 def handle_endtag(self,t):
  if t in ['script','style']:self.skip-=1
 def handle_data(self,d):
  if not self.skip:self.parts.append(d)
 @property
 def text(self):return re.sub(r'[^\w]','',''.join(self.parts)).lower()
def path_for(route):
 p=OUT/route.lstrip('/')
 if route=='/':return OUT/'index.html'
 return p if p.is_file() else Path(str(p)+'.html')
def read(route):return Page(path_for(route).read_text())
pages=json.loads((ROOT/'content/migration/pages.json').read_text());manifest=json.loads((ROOT/'content/migration/manifest.json').read_text())
articles=json.loads((ROOT/'content/migration/articles.json').read_text());gallery=json.loads((ROOT/'content/migration/gallery.json').read_text())
assert len(pages)==15 and len(articles)==6 and len(gallery)==20
checks=0
for source in pages:
 destination=read(source['destination'])
 if source['slug'].startswith('nyheter/') or source['slug'] in ['fromma-stiftelsen','fromma-stiftelsen-medicin','hemmet-fr-gamla','frskningsstiftelsen']:
  for block in source['html'][0 if source['slug'].startswith('nyheter/') else 1:]:
   assert Page(block).text in destination.text, f"Missing source block: {source['slug']}"
   checks+=1
for art in gallery:
 dest=read('/vad-vi-gor/konst')
 assert Page(art['title']).text in dest.text and Page(art['credit']).text in dest.text
 assert art['image'] in dest.links
 checks+=1
for doc in manifest['documents']:
 f=ROOT/'public'/doc['local'].lstrip('/')
 assert f.read_bytes().startswith(b'%PDF-') and hashlib.sha256(f.read_bytes()).hexdigest()==doc['sha256']
 assert doc['local'] in read('/dokument').links
 checks+=1
for image in manifest['assets']:assert (ROOT/'public'/image['local'].lstrip('/')).is_file()
for word in ['Klemens Ganslandt','Sven Lindqvist','Catharina von Blixen-Finecke','Magnus Nedström','Lovisa Adolfsson','Helena Biehl','Catarina Dehlin','Kurt Dahlman','Tom Arnshed','Nadja Herrlin','Johan Reventberg','Ingemar Petersson','Elisabet Londos','Carl Johan Tiderius']:
 assert Page(word).text in read('/om-kockska/organisation').text
for word in ['1941','1945','1894','1896','1898','1899','1905','1919','8 juli 1889','fodervaror','Ingrid Wall']:
 assert Page(word).text in read('/om-kockska/historia').text
n=0;link_count=0
for file in OUT.rglob('*.html'):
 if file.name in ['404.html','_not-found.html'] or '_not-found' in file.parts:continue
 page=Page(file.read_text());assert page.h1==1, f"h1 count {file}"
 assert len(page.ids)==len(set(page.ids)),f"duplicate ids {file}"
 n+=1
 for link in page.links:
  parsed=urlsplit(link)
  if parsed.scheme or parsed.netloc:continue
  if link.startswith('#'):target=file
  elif link.startswith('/'):target=path_for(unquote(parsed.path))
  else:raise AssertionError(f'Relative link {file}: {link}')
  assert target.exists(),f"Broken link {file}: {link}"
  if parsed.fragment:assert unquote(parsed.fragment) in Page(target.read_text()).ids,f"Missing anchor {file}: {link}"
  link_count+=1
print(f'PASS: {n} pages, {link_count} local links/assets, {checks} source-content checks; 15 source URLs, 6 full articles, 20 artworks, 6 original PDFs.')
