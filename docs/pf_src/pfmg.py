# 보다아트 샘플 캐러셀 — 모션그래픽 화면풍 6장 (1080x1350 JPEG)
# 11.15 승민: "옆으로 넘길 수 있는 게시물로, 한 가지 내용을 4장 이상" → "음반의 설명도 사진에 함께 넣어서 모션그래픽 형식으로 1페이지씩,
#   모든 음반에는 모바일 앱 음반이 연동된다는 것을 보여주면"
# 구성: 1 표지(3D 카드 + 큰 제목) → 2 어떤 음반(사진 + 소개) → 3 이렇게 만들었어요(사진 + 사양) → 4 그 시절(사진 + 의미·그 시절 한 줄)
#       → 5 모바일 앱 음반이 함께(음반 → 폰, 보다코드) → 6 음반 제작은 보다아트(문의)
# 사용: python3 pfmg.py <원본사진폴더> <출력폴더> week4.json:week4_queue.json week5.json:week5_queue.json ... [--only id,id]
import json, os, sys, tempfile, html, re
from PIL import Image, ImageFilter
from playwright.sync_api import sync_playwright

FONT = os.environ.get('PFFONT', '')
HERE = os.path.dirname(os.path.abspath(__file__))
GRAIN = os.path.join(HERE, '..', 'reels_src', 'grain0.png')
W, H = 1080, 1350
BG, ROSE, SAND, DEEP, IVORY, LIME = '#0C0B10', '#C4877C', '#D9C6B2', '#9A5A51', '#F7F2EB', '#E9C9A8'
esc = html.escape

CSS = f"""
@font-face{{font-family:P;font-weight:500;src:url(file://{FONT}/Pretendard-Medium.otf)}}
@font-face{{font-family:P;font-weight:600;src:url(file://{FONT}/Pretendard-SemiBold.otf)}}
@font-face{{font-family:P;font-weight:700;src:url(file://{FONT}/Pretendard-Bold.otf)}}
@font-face{{font-family:P;font-weight:800;src:url(file://{FONT}/Pretendard-ExtraBold.otf)}}
@font-face{{font-family:P;font-weight:900;src:url(file://{FONT}/Pretendard-Black.otf)}}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}px;height:{H}px;overflow:hidden;background:{BG};font-family:P;color:{IVORY};-webkit-font-smoothing:antialiased;word-break:keep-all}}
.bd{{position:absolute;inset:-60px;background-size:cover;background-position:center;filter:blur(46px) saturate(1.1);opacity:.42;transform:scale(1.1)}}
.shade{{position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,11,16,.55) 0%,rgba(12,11,16,.2) 35%,rgba(12,11,16,.78) 70%,rgba(12,11,16,.96) 100%)}}
.vig{{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 55%,rgba(0,0,0,.55) 100%)}}
.grain{{position:absolute;inset:0;background:url(file://{GRAIN});background-size:540px 960px;mix-blend-mode:overlay;opacity:.32}}
.glow{{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5}}
.prog{{position:absolute;left:60px;right:60px;top:42px;display:flex;gap:10px}}
.prog i{{flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,.22)}}
.prog i.on{{background:{IVORY}}}
.tag{{position:absolute;left:60px;top:78px;padding:12px 24px;border-radius:40px;background:rgba(255,255,255,.10);border:1.5px solid rgba(255,255,255,.28);font-size:24px;font-weight:700;letter-spacing:1px;backdrop-filter:blur(8px)}}
.tag b{{color:{SAND};font-weight:800}}
.brand{{position:absolute;right:60px;top:90px;font-size:24px;font-weight:900;letter-spacing:6px;color:{IVORY}}}
.card{{position:absolute;border-radius:22px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.6),0 0 0 2px rgba(255,255,255,.35)}}
.card img{{position:absolute;display:block}}
.card .sweep{{position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,0) 30%,rgba(255,255,255,.22) 42%,rgba(255,255,255,0) 52%)}}
.card .edge{{position:absolute;inset:0;border-radius:22px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}}
.num{{font-size:30px;font-weight:900;letter-spacing:4px;color:{ROSE}}}
.h{{font-size:72px;font-weight:900;line-height:1.12;letter-spacing:-2px}}
.h .s{{color:{SAND}}}
.p{{font-size:38px;font-weight:600;line-height:1.5;letter-spacing:-.5px;color:rgba(247,242,235,.92)}}
.chip{{display:flex;align-items:baseline;gap:22px;padding:18px 26px;border-radius:18px;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.18);margin-top:14px}}
.chip .k{{flex:none;font-size:28px;font-weight:800;color:{ROSE};min-width:120px}}
.chip .v{{font-size:34px;font-weight:700;line-height:1.35;letter-spacing:-.5px}}
.foot{{position:absolute;left:60px;right:60px;bottom:52px;display:flex;justify-content:space-between;align-items:center;font-size:24px;font-weight:700;color:rgba(247,242,235,.6);letter-spacing:.5px}}
.pill{{display:inline-block;padding:14px 30px;border-radius:44px;font-size:30px;font-weight:800;letter-spacing:-.5px}}
.lime{{background:{SAND};color:#1A1416}}
.ghost{{border:2px solid rgba(255,255,255,.4);color:{IVORY}}}
.big{{position:absolute;font-weight:900;color:transparent;-webkit-text-stroke:2px rgba(247,242,235,.13);letter-spacing:-8px;line-height:1;white-space:nowrap}}
.streak{{position:absolute;height:3px;border-radius:2px;background:linear-gradient(90deg,rgba(217,198,178,0),rgba(217,198,178,.85),rgba(217,198,178,0))}}
.quote{{font-size:150px;font-weight:900;line-height:.6;color:{ROSE};height:70px}}
"""

def prep(src, blur, tmp, name):
    im = Image.open(src).convert('RGB')
    for (x0, y0, x1, y1) in blur or []:
        box = (int(x0), int(y0), int(x1), int(y1))
        im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(28)), box)
    if im.width < 1000:  # 홈페이지 사진은 가로 600px 안팎 → 2배로 키우고 선명하게
        im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS).filter(ImageFilter.UnsharpMask(2, 80, 2))
    p = os.path.join(tmp, name)
    im.save(p, quality=93)
    return p, im.size

def img_cover(p, size, bw, bh, fx=.5, fy=.5):
    iw, ih = size
    sc = max(bw / iw, bh / ih)
    w, h = iw * sc, ih * sc
    x = min(0, max(bw - w, bw / 2 - fx * w)); y = min(0, max(bh - h, bh / 2 - fy * h))
    return f'<img src="file://{p}" style="left:{x:.1f}px;top:{y:.1f}px;width:{w:.1f}px;height:{h:.1f}px">'

def card(p, size, x, y, w, maxh, rot='', fit_h=None):
    iw, ih = size
    h = min(maxh, w * ih / iw) if fit_h is None else fit_h
    return (f'<div class="card" style="left:{x}px;top:{y}px;width:{w}px;height:{h:.0f}px;{rot}">'
            f'{img_cover(p, size, w, h)}<div class="sweep"></div><div class="edge"></div></div>'), h

def frame(k, n, no, label, bdimg, inner, foot_r, glow=(ROSE, SAND), big=None):
    deco = ''
    if big: deco += f'<div class="big" style="right:-30px;bottom:110px;font-size:380px">{esc(big)}</div>'
    deco += f'<div class="streak" style="left:{(k*137)%400+40}px;top:{(k*211)%300+150}px;width:420px;transform:rotate(-24deg);opacity:.55"></div>'
    deco += f'<div class="streak" style="left:{(k*97)%300+560}px;top:{(k*173)%250+700}px;width:300px;transform:rotate(-24deg);opacity:.35"></div>'
    prog = ''.join(f'<i class="{"on" if i <= k else ""}"></i>' for i in range(1, n + 1))
    return (f'<div class="bd" style="background-image:url(file://{bdimg})"></div><div class="shade"></div>'
            f'<div class="glow" style="left:-160px;top:820px;width:520px;height:520px;background:{glow[0]}"></div>'
            f'<div class="glow" style="right:-180px;top:120px;width:460px;height:460px;background:{glow[1]};opacity:.28"></div>'
            f'{deco}{inner}<div class="vig"></div><div class="grain"></div>'
            f'<div class="prog">{prog}</div><div class="tag">BODA ART SAMPLE · <b>{esc(label)} No.{no:02d}</b></div><div class="brand">BODA ART</div>'
            f'<div class="foot"><span>{esc(foot_r)}</span><span>{k} / {n}</span></div>')

def parse(cap):
    b = cap.split('\n\n')
    if '옆으로 넘겨' in b[0]:  # 11.15 새 틀: 첫 덩어리가 "제목\n보다아트가 만든 음반을 하나씩 소개해요. 옆으로 넘겨 보세요"
        b = [''] + [b[0].split('\n')[0]] + b[1:]
    head = re.sub(r'^\[[^\]]+\]\s*', '', b[1])
    intro = b[2].split('\n')
    specs = [l[2:].split(': ', 1) for l in b[3].split('\n') if l.startswith('· ')]
    mean_then = b[4].split('\n')
    mean = ' '.join(s for s in re.split(r'(?<=요\.)\s+', mean_then[0]) if '릴스' not in s)
    then = mean_then[1] if len(mean_then) > 1 else ''
    iscd = '200장까지' in b[5]
    return head, intro, specs, mean, then, iscd

def slides(spec, cap, ph):
    head, intro, specs, mean, then, iscd = parse(cap)
    no, label = spec['no'], spec['label']
    t1, t2 = spec['title'][0], (spec['title'][1] if len(spec['title']) > 1 else '')
    short = ' '.join(spec['title'])
    P = lambda i: ph[i % len(ph)]
    n = 6; out = []
    # 1 표지
    c, h = card(*P(0), 110, 190, 860, 600, 'transform:perspective(1600px) rotateY(-9deg) rotateX(4deg) rotate(-1.5deg)')
    inner = c + (f'<div style="position:absolute;left:72px;top:{190+h+70:.0f}px;right:60px">'
                 f'<div class="num">{esc(label)} · No.{no:02d}</div>'
                 f'<div class="h" style="font-size:96px;margin-top:18px">{esc(t1)}<br><span class="s">{esc(t2)}</span></div></div>'
                 f'<div style="position:absolute;left:72px;bottom:120px"><span class="pill ghost">옆으로 넘겨 보세요 →</span></div>')
    out.append(frame(1, n, no, label, P(0)[0], inner, short, big=f'{no:02d}'))
    # 2 어떤 음반?
    c, h = card(*P(1), 70, 170, 940, 620, 'transform:rotate(1deg)')
    inner = c + (f'<div style="position:absolute;left:72px;right:72px;top:{170+h+60:.0f}px">'
                 f'<div class="num">01 · 어떤 음반?</div><div class="h" style="font-size:60px;margin-top:16px">{esc(head)}</div>'
                 f'<div class="p" style="margin-top:22px">{"<br>".join(esc(x) for x in intro)}</div></div>')
    out.append(frame(2, n, no, label, P(1)[0], inner, short, big='01'))
    # 3 이렇게 만들었어요
    c, h = card(*P(2), 70, 170, 940, 520 if len(specs) > 3 else 580, 'transform:rotate(-1deg)')
    rows = ''.join(f'<div class="chip"><span class="k">{esc(k)}</span><span class="v">{esc(v)}</span></div>' if v else
                   f'<div class="chip"><span class="v">{esc(k)}</span></div>' for k, *vv in specs for v in [vv[0] if vv else ''])
    inner = c + (f'<div style="position:absolute;left:60px;right:60px;top:{170+h+44:.0f}px">'
                 f'<div class="num" style="margin-left:12px">02 · 이렇게 만들었어요</div>{rows}</div>')
    out.append(frame(3, n, no, label, P(2)[0], inner, short, big='02'))
    # 4 그 시절
    c, h = card(*P(3), 70, 170, 940, 560, 'transform:perspective(1600px) rotateY(7deg) rotate(.8deg)')
    inner = c + (f'<div style="position:absolute;left:72px;right:72px;top:{170+h+56:.0f}px">'
                 f'<div class="num">03 · 그 시절</div><div class="quote" style="margin-top:34px">“</div>'
                 f'<div class="h" style="font-size:54px;line-height:1.3">{esc(then)}</div>'
                 f'<div class="p" style="margin-top:24px;font-size:34px;color:rgba(247,242,235,.75)">{esc(mean)}</div></div>')
    out.append(frame(4, n, no, label, P(3)[0], inner, short, big='03'))
    # 5 모바일 앱 음반이 함께
    cp, csz = P(0)
    album, _ = card(cp, csz, 90, 300, 400, 400, 'transform:perspective(1400px) rotateY(14deg) rotate(-3deg)', fit_h=400)
    phone = (f'<div style="position:absolute;left:640px;top:200px;width:330px;height:670px;border-radius:52px;background:#141218;'
             f'box-shadow:0 40px 90px rgba(0,0,0,.65),0 0 0 3px rgba(255,255,255,.55),0 0 60px rgba(196,135,124,.35);transform:rotate(4deg);overflow:hidden">'
             f'<div style="position:absolute;left:115px;top:16px;width:100px;height:26px;border-radius:14px;background:#000"></div>'
             f'<div style="position:absolute;left:24px;top:66px;font-size:20px;font-weight:800;letter-spacing:3px;color:{SAND}">BODA MUSIC</div>'
             f'<div style="position:absolute;left:24px;top:104px;width:282px;height:282px;border-radius:16px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.5)">{img_cover(cp, csz, 282, 282)}</div>'
             f'<div style="position:absolute;left:24px;right:24px;top:408px;font-size:24px;font-weight:800;line-height:1.3">{esc(short)}</div>'
             f'<div style="position:absolute;left:24px;right:24px;top:486px;height:6px;border-radius:3px;background:rgba(255,255,255,.2)"><div style="width:42%;height:6px;border-radius:3px;background:{ROSE}"></div></div>'
             f'<div style="position:absolute;left:0;right:0;top:530px;display:flex;justify-content:center;gap:40px;align-items:center">'
             f'<div style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-right:20px solid {IVORY}"></div>'
             f'<div style="width:78px;height:78px;border-radius:50%;background:{IVORY};position:relative"><div style="position:absolute;left:31px;top:22px;width:0;height:0;border-top:17px solid transparent;border-bottom:17px solid transparent;border-left:26px solid #141218"></div></div>'
             f'<div style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:20px solid {IVORY}"></div></div>'
             f'<div style="position:absolute;left:0;right:0;bottom:22px;text-align:center;font-size:17px;font-weight:700;color:rgba(247,242,235,.5)">화면은 예시예요</div></div>')
    link = (f'<div style="position:absolute;left:470px;top:520px;width:190px;height:4px;background:linear-gradient(90deg,rgba(217,198,178,0),{SAND},rgba(217,198,178,0));box-shadow:0 0 18px {SAND}"></div>'
            f'<div style="position:absolute;left:520px;top:470px;padding:8px 18px;border-radius:24px;background:{SAND};color:#1A1416;font-size:22px;font-weight:900">보다코드</div>')
    inner = album + link + phone + (f'<div style="position:absolute;left:72px;right:72px;top:930px">'
             f'<div class="num">04 · 모바일 앱 음반</div>'
             f'<div class="h" style="font-size:62px;margin-top:16px">이런 음반을 만들면<br><span class="s">앱 음반이 함께 와요</span></div>'
             f'<div class="p" style="margin-top:20px;font-size:32px">음반 안의 보다코드로 폰에 받아, 인터넷 없이 재생.<br>계약 기간 동안 내 폰에 소장해요.</div></div>')
    out.append(frame(5, n, no, label, cp, inner, '보다뮤직 앱 음반', glow=(SAND, ROSE)))
    # 6 음반 제작은 보다아트
    c, h = card(*P(1), 300, 210, 480, 360, 'transform:perspective(1400px) rotateY(-10deg) rotate(-2deg)')
    c2, _ = card(*P(2), 600, 300, 400, 300, 'transform:perspective(1400px) rotateY(10deg) rotate(3deg)')
    c3, _ = card(*P(0), 110, 330, 360, 280, 'transform:perspective(1400px) rotateY(12deg) rotate(-5deg)')
    # 11.15 승민 "너무 광고성으로만 가지말고 우리것을 알리는 정도로" → 수량 알약·문의 문구 없이 소개로 맺음
    inner = c3 + c + c2 + (f'<div style="position:absolute;left:72px;right:72px;top:770px">'
             f'<div class="num">2007년부터 음반을 만들어 왔어요</div>'
             f'<div class="h" style="font-size:84px;margin-top:18px">음반을 만드는<br><span class="s">보다아트</span></div>'
             f'<div class="p" style="margin-top:34px;font-size:34px">CD · USB 음반, 그리고 모바일 앱 음반까지<br><span style="color:{SAND}">bodacd.co.kr</span></div></div>')
    out.append(frame(6, n, no, label, P(0)[0], inner, 'bodacd.co.kr'))
    return out

def render(spec, cap, outdir, srcdir):
    tmp = tempfile.mkdtemp()
    ph = [prep(os.path.join(srcdir, x['f']), x.get('blur'), tmp, f'p{i}.jpg') for i, x in enumerate(spec['photos'])]
    bodies = slides(spec, cap, ph)
    base = spec['id'].replace('v1', 'mg')
    outs = []
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        page = b.new_page(viewport={'width': W, 'height': H})
        for i, body in enumerate(bodies):
            hp = os.path.join(tmp, f's{i}.html')
            open(hp, 'w').write(f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>')
            page.goto('file://' + hp)
            for wt in (600, 700, 800, 900):
                page.evaluate(f'document.fonts.load("{wt} 40px P","가A1")')
            page.evaluate('document.fonts.ready')
            page.wait_for_timeout(300)
            png = os.path.join(tmp, f's{i}.png'); page.screenshot(path=png)
            out = os.path.join(outdir, f'{base}_{i+1}.jpg')
            Image.open(png).convert('RGB').save(out, 'JPEG', quality=90, optimize=True)
            outs.append(out)
        b.close()
    return outs

if __name__ == '__main__':
    srcdir, outdir = sys.argv[1], sys.argv[2]
    only = None; pairs = []
    for a in sys.argv[3:]:
        if a.startswith('--only='): only = a[7:].split(',')
        else: pairs.append(a.split(':'))
    os.makedirs(outdir, exist_ok=True)
    for sj, qj in pairs:
        specs = json.load(open(sj)); caps = {q['id']: q['caption'] for q in json.load(open(qj))}
        for s in specs:
            if only and s['id'] not in only: continue
            print(s['id'], render(s, caps[s['id']], outdir, srcdir))
