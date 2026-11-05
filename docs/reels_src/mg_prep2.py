# 포트폴리오 모션그래픽 2편(USB 앨범) 사진 준비: mg_prep.py 와 같은 방식, 사진 고르기만 다름 → mg2/
# 작은 사진(가로 900 미만)은 2배로 미리 키우고 살짝 선명하게 해서 화면에서 뭉개지지 않게 한다.
# 사용: docs/pf_src 에서 python3 ../reels_src/mg_prep2.py <사진폴더> ../reels_src/mg2
import json, os, sys
from PIL import Image, ImageFilter, ImageEnhance
SRC, OUT = sys.argv[1], sys.argv[2]
spec = {}
for f in ['day1.json', 'week1.json', 'week2.json', 'week3.json']:
    for p in json.load(open(f)): spec[p['id']] = p
# 2편 선택(키: 포트폴리오 id, 사진 번호)
sel = {'a1': ('pfusb01v1', 0), 'a2': ('pfusb01v1', 1),          # 이찬원 찬스타임 콘서트 실황 영상 USB
       'b1': ('pfusb07v1', 1), 'b2': ('pfusb07v1', 2),          # UV 매대형 USB 앨범
       'c1': ('pfusb11v1', 1), 'c2': ('pfusb11v1', 2),          # 송대관 슬라이드 카드 USB
       'm1': ('pfusb15v1', 2), 'm2': ('pfusb09v1', 1), 'm3': ('pfusb06v1', 1), 'm4': ('pfusb03v1', 1)}
os.makedirs(OUT, exist_ok=True)
for k, (pid, i) in sel.items():
    ph = spec[pid]['photos'][i]; im = Image.open(os.path.join(SRC, ph['f'])).convert('RGB')
    for (x0, y0, x1, y1) in ph.get('blur') or []:
        box = (int(x0), int(y0), int(x1), int(y1)); im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(28)), box)
    im2 = im.copy()
    if im2.width < 900:
        im2 = im2.resize((im2.width*2, im2.height*2), Image.LANCZOS).filter(ImageFilter.UnsharpMask(2, 60, 2))
    im2.thumbnail((1500, 1500)); im2.save(f'{OUT}/{k}.jpg', quality=92)
    W, H = 1080, 1920; s = max(W/im.width, H/im.height); bg = im.resize((int(im.width*s)+1, int(im.height*s)+1))
    l = (bg.width-W)//2; tp = (bg.height-H)//2
    bg = bg.crop((l, tp, l+W, tp+H)).resize((540, 960)).filter(ImageFilter.GaussianBlur(26))
    mean = sum(bg.convert('L').getdata()) / (540*960)            # 흰 배경 사진(UV·블리스터)은 더 어둡게
    bg = ImageEnhance.Color(ImageEnhance.Brightness(bg).enhance(min(0.42, 48/max(mean, 1)))).enhance(1.1)
    bg.resize((1080, 1920)).save(f'{OUT}/{k}_bg.jpg', quality=85)
    print(k, pid, ph['f'], im.size, '->', im2.size)
