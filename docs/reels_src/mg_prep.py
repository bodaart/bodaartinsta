# 포트폴리오 모션그래픽용 사진 준비: 홈페이지 실제 사진을 골라 보다코드 자리 흐림 처리 → mg/{키}.jpg, 흐린 어두운 배경 → mg/{키}_bg.jpg
# 사용: docs/pf_src 에서 python3 ../reels_src/mg_prep.py <사진폴더> <출력폴더>
import json, os, sys
from PIL import Image, ImageFilter, ImageEnhance
SRC, OUT = sys.argv[1], sys.argv[2]
spec = {}
for f in ['week1.json', 'week2.json', 'week3.json']:
    for p in json.load(open(f)): spec[p['id']] = p
# 1편 선택(키: 포트폴리오 id, 사진 번호)
sel = {'a1': ('pfalbum05v1', 0), 'a2': ('pfalbum08v1', 0), 'b1': ('pfalbum14v1', 0), 'b2': ('pfusb14v1', 0),
       'c1': ('pfalbum07v1', 0), 'c2': ('pfalbum15v1', 0),
       'm1': ('pfalbum12v1', 0), 'm2': ('pfalbum16v1', 0), 'm3': ('pfalbum11v1', 0), 'm4': ('pfusb02v1', 0)}
os.makedirs(OUT, exist_ok=True)
for k, (pid, i) in sel.items():
    ph = spec[pid]['photos'][i]; im = Image.open(os.path.join(SRC, ph['f'])).convert('RGB')
    for (x0, y0, x1, y1) in ph.get('blur') or []:
        box = (int(x0), int(y0), int(x1), int(y1)); im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(28)), box)
    im2 = im.copy(); im2.thumbnail((1500, 1500)); im2.save(f'{OUT}/{k}.jpg', quality=92)
    W, H = 1080, 1920; s = max(W/im.width, H/im.height); bg = im.resize((int(im.width*s)+1, int(im.height*s)+1))
    l = (bg.width-W)//2; tp = (bg.height-H)//2
    bg = bg.crop((l, tp, l+W, tp+H)).resize((540, 960)).filter(ImageFilter.GaussianBlur(26))
    bg = ImageEnhance.Color(ImageEnhance.Brightness(bg).enhance(0.42)).enhance(1.1)
    bg.resize((1080, 1920)).save(f'{OUT}/{k}_bg.jpg', quality=85)
    print(k, pid, ph['f'])
