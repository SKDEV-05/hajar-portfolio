import sys, json, hashlib
from pathlib import Path
sys.path.insert(0, str(Path('.tools/python').resolve()))
import pymupdf as fitz
from PIL import Image, ImageDraw

doc=fitz.open(r'D:\HAJAR SALMI PORTFOLIO.pdf')
out=Path('tmp/pdfs'); out.mkdir(parents=True,exist_ok=True)
mapping={5:'halwana',6:'halwana',7:'halwana',8:'tikida',9:'tikida',10:'milkyway',11:'milkyway',12:'milkyway',13:'jumper',15:'graphora',16:'graphora',18:'sombres-recits',19:'studio-vision',21:'cartoon-character',22:'cartoon-character',23:'winter-cabin',24:'winter-animation',25:'winter-animation',27:'intruder',28:'intruder',29:'safi-pottery',30:'safi-pottery',32:'posters',33:'portraits'}
manifest=[]; seen={}; texts=[]
for n,page in enumerate(doc,1):
    texts.append(f'## Page {n}\n\n'+page.get_text())
    pix=page.get_pixmap(matrix=fitz.Matrix(1.3,1.3),alpha=False)
    im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
    im.save(out/f'page-{n:02}.png')
    if n in mapping:
        folder=Path('public/images/projects')/mapping[n];folder.mkdir(parents=True,exist_ok=True)
        im.save(folder/f'page-{n}.webp',quality=88)
        manifest.append(dict(page=n,type='composite page render',file=str(folder/f'page-{n}.webp'),width=im.width,height=im.height))
    for j,item in enumerate(page.get_images(full=True)):
        xref=item[0]; data=doc.extract_image(xref); digest=hashlib.sha256(data['image']).hexdigest()
        target=out/'originals';target.mkdir(exist_ok=True)
        name=target/f'{xref}.{data["ext"]}'
        if digest not in seen: name.write_bytes(data['image']);seen[digest]=str(name)
        rects=[list(r) for r in page.get_image_rects(xref)]
        manifest.append(dict(page=n,xref=xref,type='embedded original',file=seen[digest],width=data['width'],height=data['height'],placements=rects,duplicate=str(name)!=seen[digest]))
        if n in mapping and data['width']>250 and data['height']>180:
            asset=Image.open(seen[digest]); asset.thumbnail((1800,1800))
            dest=Path('public/images/projects')/mapping[n]/f'image-{xref}.webp'
            asset.save(dest,quality=88)
            manifest.append(dict(page=n,type='optimized artwork',file=str(dest),width=asset.width,height=asset.height,xref=xref))
Path('docs/pdf-text.md').write_text('\n\n'.join(texts),encoding='utf-8')
Path('docs/asset-manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
for start in range(0,34,8):
    sheet=Image.new('RGB',(1600,1000),'#cccccc');draw=ImageDraw.Draw(sheet)
    for k,n in enumerate(range(start+1,min(start+9,35))):
        im=Image.open(out/f'page-{n:02}.png');im.thumbnail((390,455))
        x=(k%4)*400;y=(k//4)*500
        sheet.paste(im,(x,y+25));draw.text((x+10,y+5),str(n),fill='black')
    sheet.save(out/f'contact-{start+1}.jpg')
print('Extracted',len(manifest),'records and rendered all',len(doc),'pages')
