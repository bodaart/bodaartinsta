import io, os, urllib.request
from PIL import Image
os.makedirs('src', exist_ok=True)
man = open('src/manifest.tsv', 'a')
for u in open('list.txt').read().split():
    name = os.path.basename(u).rsplit('.', 1)[0] + '.jpg'
    p = os.path.join('src', name)
    if os.path.exists(p):
        continue
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        raw = urllib.request.urlopen(req, timeout=60).read()
        im = Image.open(io.BytesIO(raw))
        w, h = im.size
        if im.mode in ('RGBA', 'LA', 'P'):
            im = im.convert('RGBA')
            bg = Image.new('RGB', im.size, (255, 255, 255))
            bg.paste(im, mask=im.split()[-1])
            im = bg
        else:
            im = im.convert('RGB')
        im.thumbnail((1600, 1600))
        im.save(p, 'JPEG', quality=88)
        man.write(f'{name}\t{w}\t{h}\t{len(raw)}\t{u}\n')
        print('ok', name, w, h, len(raw))
    except Exception as e:
        print('fail', u, e)
