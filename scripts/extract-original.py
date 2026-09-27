from html.parser import HTMLParser
from html import escape
from pathlib import Path
import json,re,sys
class N:
 def __init__(self,tag='root',attrs=None,parent=None):self.tag=tag;self.a=dict(attrs or []);self.children=[];self.parent=parent
 def has(self,c):return c in self.a.get('class','').split()
 def walk(self):
  yield self
  for n in self.children:
   if isinstance(n,N):yield from n.walk()
 def text(self):return '' if self.tag in ['script','style'] else ''.join(n.text() if isinstance(n,N) else n for n in self.children)
class P(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.root=N();self.cur=self.root
 def handle_starttag(self,t,a):
  n=N(t,a,self.cur);self.cur.children.append(n)
  if t not in ['img','br','hr','input','meta','link','source','wbr','area','base','embed']:self.cur=n
 def handle_startendtag(self,t,a):self.handle_starttag(t,a);self.handle_endtag(t)
 def handle_endtag(self,t):
  n=self.cur
  while n.parent:
   if n.tag==t:self.cur=n.parent;return
   n=n.parent
 def handle_data(self,s):self.cur.children.append(s)
def clean(n):
 if isinstance(n,str):return escape(n.replace('\u200d',''))
 if n.tag in ['script','style','iframe']:return ''
 inner=''.join(clean(c) for c in n.children)
 if n.tag not in ['p','h1','h2','h3','h4','h5','h6','ul','ol','li','a','strong','em','b','i','br','blockquote']:return inner
 if not n.text().strip() and n.tag!='br':return ''
 attrs=''
 if n.tag=='a':
  href=n.a.get('href','')
  if not href.startswith(('/','https://','http://','mailto:','tel:','#')):return inner
  attrs=' href="'+escape(href,quote=True)+'"'
 return '<'+n.tag+attrs+'>'+inner+('</'+n.tag+'>' if n.tag!='br' else '')
root=Path(sys.argv[1]);pages=[]
for f in sorted(root.glob('*.html')):
 p=P();p.feed(f.read_text());nodes=list(p.root.walk());main=next((n for n in nodes if n.tag=='main'),p.root)
 content=[n for n in main.walk() if n.has('sqs-html-content')]
 title=next((n.text().strip() for n in main.walk() if n.tag=='h1'), f.stem)
 images=[]
 for n in main.walk():
  if n.tag!='img':continue
  src=n.a.get('data-src',n.a.get('src',''))
  if not src or src in [x['url'] for x in images]:continue
  par=n.parent
  while par and not (par.tag=='figure' or par.has('list-item') or par.has('sqs-block-image')):par=par.parent
  caption=par.text().strip() if par else ''
  images.append({'url':src,'alt':n.a.get('alt',''),'caption':' '.join(caption.split()),'width':n.a.get('width'), 'height':n.a.get('height')})
 links=[]
 for n in nodes:
  if n.tag=='a' and n.a.get('href') and n.a['href'] not in [x['url'] for x in links]:links.append({'url':n.a['href'],'label':' '.join(n.text().split())})
 lists=[{'title':next((x.text().strip() for x in n.walk() if x.tag in ['h1','h2','h3','h4']),''),'text':' '.join(n.text().split()),'html':clean(n)} for n in main.walk() if n.has('list-item')]
 meta={n.a.get('property',n.a.get('name','')):n.a.get('content') for n in nodes if n.tag=='meta'}
 page={'slug':f.stem.replace('__','/'),'title':title,'html':[clean(n) for n in content], 'text':[' '.join(n.text().split()) for n in content], 'images':images,'links':links,'lists':lists,'meta':meta,'fulltext':' '.join(main.text().split())}
 pages.append(page)
(root/'pages.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2))
for p in pages:
 print('\nPAGE',p['slug'],'TITLE',p['title'])
 for i,t in enumerate(p['text']):print('BLOCK',i,t)
 for i,img in enumerate(p['images']):print('IMAGE',i,img['url'],img['caption'][:160])
 print('LINKS',[(x['label'],x['url']) for x in p['links'] if x['url'].startswith('/s/') or x['url'].startswith('https:')])
