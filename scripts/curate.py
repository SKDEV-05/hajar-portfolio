import sys,json
from pathlib import Path
sys.path.insert(0,str(Path('.tools/python').resolve()))
import pymupdf as fitz
from PIL import Image
doc=fitz.open(r'D:\HAJAR SALMI PORTFOLIO.pdf')
manifest=json.loads(Path('docs/asset-manifest.json').read_text())
# Restore PDF soft masks: original image streams alone do not carry transparency.
for entry in manifest:
    if entry['type']!='optimized artwork':continue
    page=doc[entry['page']-1]
    item=next(x for x in page.get_images(full=True) if x[0]==entry['xref'])
    if item[1]:
        pix=fitz.Pixmap(fitz.Pixmap(doc,item[0]),fitz.Pixmap(doc,item[1]))
        im=Image.frombytes('RGBA',(pix.width,pix.height),pix.samples);im.thumbnail((1800,1800));im.save(entry['file'],quality=90)
heroes={'halwana':(7,(.07,.13,.98,.93)),'tikida':(8,(.015,.055,.653,.39)),'milkyway':(12,(.055,.17,.98,.96)),'jumper':(13,(.61,.02,.99,.63)),'graphora':(16,(.05,.20,.97,.94)),'sombres-recits':(18,(.38,.17,.586,.69)),'studio-vision':(19,(.12,.1,.46,.92)),'cartoon-character':(22,(.49,.12,.96,.95)),'winter-cabin':(23,(.02,.62,.48,.94)),'winter-animation':(25,(0,0,.5,.49)),'intruder':(27,(.51,.06,.98,.50)),'safi-pottery':(30,(0,.5,.5,1)),'posters':(32,(.355,.08,.65,.94)),'portraits':(33,(.045,.19,.96,.89))}
for slug,(n,r) in heroes.items():
    p=doc[n-1]; w,h=p.rect.width,p.rect.height
    pix=p.get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(r[0]*w,r[1]*h,r[2]*w,r[3]*h),alpha=False)
    im=Image.frombytes('RGB',(pix.width,pix.height),pix.samples);im.thumbnail((1920,1400))
    dest=Path('public/images/projects')/slug/'hero.webp';im.save(dest,quality=91)
    manifest.append(dict(page=n,type='precise composite crop',file=str(dest),width=im.width,height=im.height,crop=r))
portrait=Image.open('tmp/pdfs/originals/834.png');portrait.thumbnail((700,1000));portrait.save('public/images/hajar-salmi.webp',quality=90)
manifest.append(dict(page=3,type='portrait',file='public/images/hajar-salmi.webp',width=portrait.width,height=portrait.height))
Path('docs/asset-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
rows=['# Asset manifest','', 'Original streams retained under `tmp/pdfs/originals`; image xrefs, placements, dimensions, duplicates and crop coordinates are recorded in `asset-manifest.json`. Composite crops preserve source colors and proportions. WebP uses quality 88–91; no AI imagery replaces the artwork. Soft masks are restored for transparent assets.','', '| Page | Type | Output | Resolution |','|---|---|---|---|']
rows += [f"| {e['page']} | {e['type']} | `{e['file']}` | {e['width']} × {e['height']} |" for e in manifest]
Path('docs/asset-manifest.md').write_text('\n'.join(rows),encoding='utf-8')
Path('src/data').mkdir(parents=True,exist_ok=True)
assets={ '/'+e['file'].replace('\\','/').removeprefix('public/'):dict(width=e['width'],height=e['height']) for e in manifest if e['file'].startswith('public') }
Path('src/data/assets.json').write_text(json.dumps(assets),encoding='utf-8')
print('Curated heroes, restored transparency, portrait and asset dimensions')
