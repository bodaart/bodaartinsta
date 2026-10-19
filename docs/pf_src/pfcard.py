# 보다아트 샘플 카드 만들기 (인스타 캐러셀 1080x1350, JPEG)
# 사용: python3 pfcard.py spec.json 출력폴더 [원본사진폴더]
import json, os, sys, tempfile, html
from PIL import Image, ImageFilter
from playwright.sync_api import sync_playwright

FONT = '/tmp/claude-0/-home-claude-bodaartinsta/042daeec-5a90-5867-af5e-b6d21b954c86/scratchpad/reels/package/dist/public/static'
W, H = 1080, 1350
INK, ROSE, DEEP, SAND, BEIGE, IVORY, TAUPE, GREY, F4 = '#2B2320', '#C4877C', '#9A5A51', '#D9C6B2', '#EADFD1', '#F7F2EB', '#B39A85', '#7B6D64', '#F4EEE4'

CSS = f"""
@font-face{{font-family:P;font-weight:500;src:url(file://{FONT}/Pretendard-Medium.otf)}}
@font-face{{font-family:P;font-weight:600;src:url(file://{FONT}/Pretendard-SemiBold.otf)}}
@font-face{{font-family:P;font-weight:700;src:url(file://{FONT}/Pretendard-Bold.otf)}}
@font-face{{font-family:P;font-weight:800;src:url(file://{FONT}/Pretendard-ExtraBold.otf)}}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}px;height:{H}px;overflow:hidden;background:{IVORY};font-family:P;color:{INK};-webkit-font-smoothing:antialiased}}
.hero{{position:absolute;left:0;top:0;width:{W}px;height:860px;overflow:hidden;background:{F4}}}
.hero img{{position:absolute}}
.lab{{position:absolute;left:72px;top:922px;font-size:30px;font-weight:700;color:{DEEP};letter-spacing:1px;display:flex;align-items:center;gap:16px}}
.lab .no{{font-weight:600;color:{TAUPE};letter-spacing:2px}}
.bar{{display:inline-block;width:46px;height:6px;background:{ROSE};border-radius:3px}}
.ttl{{position:absolute;left:72px;right:72px;top:980px;font-size:64px;line-height:1.22;font-weight:800;letter-spacing:-1.5px;word-break:keep-all}}
.foot{{position:absolute;left:72px;right:72px;bottom:64px;display:flex;justify-content:space-between;align-items:flex-end;font-size:26px;color:{GREY};font-weight:600}}
.foot .bd{{font-weight:800;color:{INK};letter-spacing:5px;font-size:26px}}
.inner{{position:absolute;left:60px;right:60px;top:60px;bottom:150px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:28px}}
.inner img{{display:block;box-shadow:0 10px 30px rgba(43,35,32,.10)}}
"""

def prep(src, blur, tmp):
    im = Image.open(src).convert('RGB')
    for (x0, y0, x1, y1) in blur or []:
        box = (int(x0), int(y0), int(x1), int(y1))
        reg = im.crop(box).filter(ImageFilter.GaussianBlur(28))
        im.paste(reg, box)
    p = os.path.join(tmp, os.path.basename(src))
    im.save(p, quality=95)
    return p, im.size

def cover_html(spec, photo, size):
    iw, ih = size
    bw, bh = W, 860
    sc_cover = max(bw / iw, bh / ih)
    if sc_cover <= 2.0:
        sc = sc_cover
        fx, fy = spec.get('focus', [0.5, 0.5])
        w, h = iw * sc, ih * sc
        x = min(0, max(bw - w, bw / 2 - fx * w))
        y = min(0, max(bh - h, bh / 2 - fy * h))
        img = f'<img src="file://{photo}" style="left:{x:.1f}px;top:{y:.1f}px;width:{w:.1f}px;height:{h:.1f}px">'
    else:
        sc = min((bw - 120) / iw, (bh - 120) / ih)
        w, h = iw * sc, ih * sc
        img = f'<img src="file://{photo}" style="left:{(bw-w)/2:.1f}px;top:{(bh-h)/2:.1f}px;width:{w:.1f}px;height:{h:.1f}px;box-shadow:0 10px 30px rgba(43,35,32,.12)">'
    ttl = '<br>'.join(html.escape(t) for t in spec['title'])
    return f"""<div class="hero">{img}</div>
<div class="lab"><span class="bar"></span>보다아트 샘플 · {html.escape(spec['label'])}<span class="no">No.{spec['no']:02d}</span></div>
<div class="ttl">{ttl}</div>
<div class="foot"><span class="bd">BODA ART</span><span>옆으로 넘겨 보세요 →</span></div>"""

def inner_html(spec, photos, k, n):
    imgs = ''
    areaw, areah = W - 120, H - 60 - 150
    gap = 28
    tot_h = sum(h * areaw / w for (_, (w, h)) in photos) + gap * (len(photos) - 1)
    sc = min(1.0, areah / tot_h)
    for p, (w, h) in photos:
        dw = areaw * sc
        dh = h * dw / w
        imgs += f'<img src="file://{p}" style="width:{dw:.1f}px;height:{dh:.1f}px">'
    return f"""<div class="inner">{imgs}</div>
<div class="foot"><span>보다아트 샘플 · {html.escape(spec['label'])}</span><span>{k} / {n}</span></div>"""

def plan(photos):
    # 넓은 사진(가로/세로 1.45 이상)은 두 장씩 위아래로, 나머지는 한 장씩
    pages, buf = [], []
    for p in photos:
        w, h = p[1]
        if w / h >= 1.45:
            buf.append(p)
            if len(buf) == 2:
                pages.append(buf); buf = []
        else:
            if buf:
                pages.append(buf); buf = []
            pages.append([p])
    if buf:
        # 넓은 사진 한 장만 덩그러니 남으면, 앞에 이미 두 쪽 이상 있을 때는 뺀다
        if len(pages) < 2:
            pages.append(buf)
    return pages

def render(spec, outdir, srcdir):
    os.makedirs(outdir, exist_ok=True)
    tmp = tempfile.mkdtemp()
    ph = [prep(os.path.join(srcdir, x['f']), x.get('blur'), tmp) for x in spec['photos']]
    cov = ph[spec.get('cover', 0)]
    rest = [p for i, p in enumerate(ph) if i != spec.get('cover', 0) or spec.get('repeat_cover')]
    pages = plan(rest)[: spec.get('max_inner', 5)]
    n = 1 + len(pages)
    bodies = [cover_html(spec, *cov)] + [inner_html(spec, pg, i + 2, n) for i, pg in enumerate(pages)]
    outs = []
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        page = b.new_page(viewport={'width': W, 'height': H})
        for i, body in enumerate(bodies):
            hp = os.path.join(tmp, f's{i}.html')
            open(hp, 'w').write(f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>')
            page.goto('file://' + hp)
            page.evaluate('document.fonts.ready')
            for wt in (600, 700, 800):
                page.evaluate(f'document.fonts.load("{wt} 40px P","가A1")')
            page.wait_for_timeout(250)
            png = os.path.join(tmp, f's{i}.png')
            page.screenshot(path=png)
            out = os.path.join(outdir, f"{spec['id']}_{i+1}.jpg")
            Image.open(png).convert('RGB').save(out, 'JPEG', quality=90, optimize=True, progressive=False)
            outs.append(out)
        b.close()
    return outs

if __name__ == '__main__':
    specs = json.load(open(sys.argv[1]))
    outdir = sys.argv[2]
    srcdir = sys.argv[3] if len(sys.argv) > 3 else '.'
    only = sys.argv[4].split(',') if len(sys.argv) > 4 else None
    for s in specs:
        if only and s['id'] not in only:
            continue
        print(s['id'], render(s, outdir, srcdir))
