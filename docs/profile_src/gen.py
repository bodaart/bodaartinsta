# 보다아트 인스타 프로필 개편 이미지: 하이라이트 커버·하이라이트 스토리·고정용 소개 캐러셀
import os, sys, html
from playwright.sync_api import sync_playwright
from PIL import Image

W = '/home/claude/work/prof'
FONT = '/home/claude/bodaartinsta/docs/reels_src/package/dist/public/static'
MG = '/home/claude/bodaartinsta/docs/reels_src/mg'
MG2 = '/home/claude/bodaartinsta/docs/reels_src/mg2'
IMG = f'{W}/img'
OUT = f'{W}/out'
os.makedirs(OUT, exist_ok=True); os.makedirs(f'{W}/html', exist_ok=True)
DARK, ROSE, SAND, IVORY = '#15110F', '#C4877C', '#D9C6B2', '#F7F2EB'

HEAD = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:P;font-weight:400;src:url(file://{FONT}/Pretendard-Regular.otf)}}
@font-face{{font-family:P;font-weight:500;src:url(file://{FONT}/Pretendard-Medium.otf)}}
@font-face{{font-family:P;font-weight:600;src:url(file://{FONT}/Pretendard-SemiBold.otf)}}
@font-face{{font-family:P;font-weight:700;src:url(file://{FONT}/Pretendard-Bold.otf)}}
@font-face{{font-family:P;font-weight:800;src:url(file://{FONT}/Pretendard-ExtraBold.otf)}}
@font-face{{font-family:P;font-weight:900;src:url(file://{FONT}/Pretendard-Black.otf)}}
*{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:P;color:{IVORY};background:{DARK};-webkit-font-smoothing:antialiased;word-break:keep-all}}
.c{{position:relative;overflow:hidden;background:{DARK}}}
.abs{{position:absolute}}
.bgimg{{position:absolute;inset:-80px;background-size:cover;background-position:center;filter:blur(46px) brightness(.38) saturate(1.1)}}
.vig{{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 40%,rgba(0,0,0,.55) 100%)}}
.grain{{position:absolute;inset:0;opacity:.07;background-image:url(file:///home/claude/bodaartinsta/docs/reels_src/grain0.png);background-size:540px}}
.pill{{display:inline-block;padding:14px 30px;border-radius:999px;border:2px solid rgba(217,198,178,.5);color:{SAND};font-weight:600;font-size:30px;letter-spacing:.06em}}
.card{{position:absolute;border-radius:22px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08)}}
.card img{{display:block;width:100%;height:100%;object-fit:cover}}
.rule{{position:absolute;height:4px;background:{ROSE};border-radius:2px}}
.foot{{position:absolute;left:0;right:0;text-align:center;font-weight:600;color:rgba(247,242,235,.55);letter-spacing:.08em}}
</style></head><body>"""

def page(name, w, h, inner):
    p = f'{W}/html/{name}.html'
    open(p, 'w', encoding='utf-8').write(HEAD + f'<div class="c" style="width:{w}px;height:{h}px">{inner}</div></body></html>')
    return name, w, h, p

def esc(s): return html.escape(s).replace('\n', '<br>')

# ── 하이라이트 커버 (1080×1080, 가운데 원으로 잘림) ──
def cover(name, label, size):
    inner = f"""<div class="abs" style="inset:0;background:radial-gradient(circle at 50% 42%,#D39A8F 0%,{ROSE} 45%,#9E6156 100%)"></div>
    <div class="grain"></div>
    <div class="abs" style="left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;flex-direction:column">
      <div style="font-weight:900;font-size:{size}px;letter-spacing:.02em;color:{IVORY};line-height:1;text-align:center">{esc(label)}</div>
      <div style="margin-top:34px;width:90px;height:5px;border-radius:3px;background:rgba(247,242,235,.75)"></div>
      <div style="margin-top:26px;font-weight:700;font-size:34px;letter-spacing:.32em;color:rgba(247,242,235,.8)">BODA ART</div>
    </div>"""
    return page(name, 1080, 1080, inner)

# ── 스토리: 사진 한 장 ──
def story_photo(name, tag, img, iw, ih, title, sub):
    maxw, maxh = 900, 1020
    s = min(maxw/iw, maxh/ih); w, h = int(iw*s), int(ih*s)
    x, y = (1080-w)//2, 300 + (1060-h)//2
    inner = f"""<div class="bgimg" style="background-image:url(file://{img})"></div><div class="vig"></div>
    <div class="abs" style="left:0;right:0;top:170px;text-align:center"><span class="pill">BODA ART · {esc(tag)}</span></div>
    <div class="card" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px"><img src="file://{img}"></div>
    <div class="rule" style="left:90px;top:1418px;width:80px"></div>
    <div class="abs" style="left:90px;right:90px;top:1446px;font-weight:800;font-size:64px;line-height:1.2">{esc(title)}</div>
    <div class="abs" style="left:90px;right:90px;top:1540px;font-weight:600;font-size:38px;color:{SAND};line-height:1.35">{esc(sub)}</div>
    <div class="foot" style="top:1740px;font-size:28px">bodacd.co.kr</div><div class="grain"></div>"""
    return page(name, 1080, 1920, inner)

# ── 스토리: 글 위주 정보 카드 ──
def story_info(name, tag, head, rows, bgimg=None, foot='bodacd.co.kr'):
    bg = f'<div class="bgimg" style="background-image:url(file://{bgimg})"></div><div class="vig"></div>' if bgimg else \
         f'<div class="abs" style="inset:0;background:radial-gradient(ellipse at 30% 20%,rgba(196,135,124,.28),rgba(0,0,0,0) 60%),radial-gradient(ellipse at 80% 90%,rgba(217,198,178,.14),rgba(0,0,0,0) 55%)"></div>'
    items = ''.join(f"""<div style="display:flex;gap:30px;align-items:flex-start;margin-bottom:54px">
        <div style="flex:none;width:64px;height:64px;border-radius:50%;background:{ROSE};color:{IVORY};font-weight:800;font-size:32px;display:flex;align-items:center;justify-content:center">{esc(k)}</div>
        <div><div style="font-weight:800;font-size:46px;line-height:1.25">{esc(t)}</div>{f'<div style="margin-top:12px;font-weight:500;font-size:33px;color:{SAND};line-height:1.45">{esc(d)}</div>' if d else ''}</div></div>""" for k, t, d in rows)
    inner = f"""{bg}
    <div class="abs" style="left:0;right:0;top:170px;text-align:center"><span class="pill">BODA ART · {esc(tag)}</span></div>
    <div class="rule" style="left:90px;top:380px;width:80px"></div>
    <div class="abs" style="left:90px;right:90px;top:410px;font-weight:900;font-size:76px;line-height:1.2">{esc(head)}</div>
    <div class="abs" style="left:90px;right:90px;top:{640 if chr(10) not in head else 730}px">{items}</div>
    <div class="foot" style="top:1740px;font-size:30px">{esc(foot)}</div><div class="grain"></div>"""
    return page(name, 1080, 1920, inner)

# ── 스토리: 후기 카드 ──
def story_review(name, text, who, when):
    inner = f"""<div class="abs" style="inset:0;background:radial-gradient(ellipse at 25% 15%,rgba(196,135,124,.30),rgba(0,0,0,0) 60%),radial-gradient(ellipse at 85% 85%,rgba(217,198,178,.12),rgba(0,0,0,0) 55%)"></div>
    <div class="abs" style="left:0;right:0;top:170px;text-align:center"><span class="pill">BODA ART · 후기</span></div>
    <div class="abs" style="left:90px;top:420px;font-weight:900;font-size:260px;line-height:1;color:{ROSE};opacity:.9">“</div>
    <div class="abs" style="left:90px;top:640px;font-size:56px;letter-spacing:.12em;color:{SAND}">★★★★★</div>
    <div class="abs" style="left:90px;right:90px;top:760px;font-weight:700;font-size:60px;line-height:1.5">{esc(text)}</div>
    <div class="rule" style="left:90px;top:1460px;width:60px;background:{SAND}"></div>
    <div class="abs" style="left:90px;right:90px;top:1490px;font-weight:600;font-size:38px;color:{SAND}">{esc(who)}</div>
    <div class="abs" style="left:90px;right:90px;top:1550px;font-weight:500;font-size:32px;color:rgba(247,242,235,.55)">{esc(when)} · 보다아트 홈페이지 후기</div>
    <div class="foot" style="top:1740px;font-size:28px">bodacd.co.kr/p/review</div><div class="grain"></div>"""
    return page(name, 1080, 1920, inner)

# ── 피드 캐러셀 1080×1350 ──
def feed(name, inner):
    return page(name, 1080, 1350, inner + '<div class="grain"></div>')

def sz(p): return Image.open(p).size

jobs = []
# 커버
for n, lab, s in [('cv1_review', 'REVIEW', 150), ('cv2_cd', 'CD', 260), ('cv3_usb', 'USB', 240), ('cv4_package', 'PACKAGE', 128), ('cv5_bodacode', 'BODA\nCODE', 150), ('cv6_order', 'ORDER', 168)]:
    jobs.append(cover(n, lab, s))

# 후기
jobs += [
  story_review('st1_review1', '첫 제작인데 인쇄도 깔끔히 잘 되어서 왔고 제작과정에서 친절히 응대해주십니다! CD 잘 받았습니다 감사합니다 :)', '〈낙원〉 CD 제작', '2026.10'),
  story_review('st1_review2', '깔끔하게 잘 나왔습니다! 감사합니다 :)', '〈時葉の幸せな時間〉', '2026.10'),
  story_review('st1_review3', '완벽합니다 스티커 재질자체가 좋아 마구 들러 붙지않고 작업에 너무 수월합니다 감사합니다.', '스티커 제작', '2026.11'),
  story_info('st1_review4', '후기', '후기는\n홈페이지에 더 있어요', [('1', '홈페이지 → 고객 후기', 'bodacd.co.kr/p/review'), ('2', '음반·USB·패키지 후기', '받은 제품 이름으로 올라와요')]),
]
# 음반CD
P = lambda k: f'{IMG}/{k}.jpg'
for i, (k, t, s) in enumerate([('cd1', '박지현 · OCEAN', '싸바리 패키지 음반'), ('cd5', '김경호 30주년 기념 앨범', 'THE ROCKER'), ('cd4', '인디 음반', '주얼케이스 · 8페이지 자켓')], 1):
    jobs.append(story_photo(f'st2_cd{i}', '음반CD', P(k), *sz(P(k)), t, s))
jobs.append(story_info('st2_cd4', '음반CD', 'CD 음반,\n이렇게 만들어요', [
    ('1', '200장까지 소량', '디스크 표면 UV 인쇄 + 한 장씩 안정적으로 복제'),
    ('2', '300장부터 프레싱', '공장에서 찍어내는 대량 제작'),
    ('3', '인디 음반 100~200장도', '첫 앨범도 부담 없이'),
    ('4', 'DDP 마스터링부터 케이스까지', '케이스·자켓·인쇄물 한 곳에서')], bgimg=P('cd1')))
# USB
for i, (k, iw_ih, t, s) in enumerate([('a1', None, '이찬원 · 찬스타임', '콘서트 실황 영상 USB 패키지'), ('b1', None, 'UV · 매대형 USB 앨범', '매대에 걸어 파는 블리스터 패키지'), ('c1', None, '송대관 · 카드 USB', '칩만 밀어 꽂는 슬라이드형')], 1):
    p = f'{MG2}/{k}.jpg'; jobs.append(story_photo(f'st3_usb{i}', 'USB앨범', p, *sz(p), t, s))
jobs.append(story_info('st3_usb4', 'USB앨범', 'USB 앨범,\n이렇게 만들어요', [
    ('1', '음원 · 영상 · 화보를 한 장에', '성인가요 USB부터 각종 패키지 USB까지'),
    ('2', '스틱형 · 카드형 USB', '슬라이드형 카드 USB도'),
    ('3', '케이스까지 함께', '블리스터 · 싸바리 상자 · 종이 케이스')], bgimg=f'{MG2}/a1.jpg'))
# 패키지
for i, (k, t, s) in enumerate([('pk1', '이찬원 · 싸바리 패키지', '두꺼운 보드를 인쇄지로 감싼 상자'), ('cd6', '박창근 시집 앨범', '2CD 책식'), ('pk2', '자석 싸바리 USB 상자', '자석으로 닫히는 상자')], 1):
    jobs.append(story_photo(f'st4_pk{i}', '패키지', P(k), *sz(P(k)), t, s))
jobs.append(story_info('st4_pk4', '패키지', '케이스와 인쇄물,\n한 곳에서', [
    ('1', '싸바리 · 책자형 · 자석 상자', '2단 · 3단 케이스, 상하짝 상자'),
    ('2', '박 · 형압', '금박 · 은박 · 먹박 · 홀로그램'),
    ('3', '코팅', '무광 · 유광 · 벨벳'),
    ('4', '디자인까지 함께', '케이스와 인쇄물 디자인부터 제작까지')], bgimg=P('pk1')))
# 보다코드
for i, (k, t, s) in enumerate([('mob1', '김희재 · HEE\'story', '보다코드 모바일 앨범'), ('mob2', '박지현 · VOICE', '친환경 보다코드 앨범'), ('mob3', '키링형 모바일 앨범', '포토카드 · 키링과 함께')], 1):
    jobs.append(story_photo(f'st5_code{i}', '보다코드', P(k), *sz(P(k)), t, s))
jobs.append(story_info('st5_code4', '보다코드', '카드 한 장이\n앨범이 돼요', [
    ('1', '친환경 스마트앨범', '카드 한 장이 앨범이 되는 방식'),
    ('2', '스트리밍처럼 사라지지 않아요', '받은 기기에서 인터넷·서버 없이 계속 재생'),
    ('3', '계약 기간이 지나기 전까지 소장', '실물 음반과 함께 만들 수 있어요')], bgimg=P('mob1')))
# 견적문의
jobs.append(story_info('st6_order1', '견적문의', '이렇게\n진행해요', [
    ('1', '자동 견적', '프로필 링크 → bodacd.co.kr 자동 견적'),
    ('2', '디자인 파일 보내기', 'PSD·EPS 원본 + JPG, 글자는 윤곽선. 칼선 파일은 홈페이지 자료실'),
    ('3', '사양 확인 · 제작', '급한 건은 미리 말씀해 주세요'),
    ('4', '받아보기', '포장해서 보내 드려요')]))
jobs.append(story_info('st6_order2', '견적문의', '문의는\n편하게', [
    ('✉', 'DM 보내기', '인스타 메시지로 바로'),
    ('☎', '02-6738-3038', '전화 문의'),
    ('@', 'bodacd@naver.com', '파일·사양 보내기'),
    ('→', 'bodacd.co.kr', '자동 견적 · 제작 안내')]))

# ── 고정용 소개 캐러셀 ──
def fbg(img): return f'<div class="bgimg" style="background-image:url(file://{img})"></div><div class="vig"></div>'
jobs.append(feed('fd1', f"""{fbg(P('cd1'))}
  <div class="card" style="left:150px;top:150px;width:420px;height:420px;transform:rotate(-4deg)"><img src="file://{P('cd1')}"></div>
  <div class="card" style="left:520px;top:110px;width:420px;height:420px;transform:rotate(3deg)"><img src="file://{P('cd2')}"></div>
  <div class="card" style="left:330px;top:400px;width:420px;height:420px;transform:rotate(-1deg)"><img src="file://{MG2}/a1.jpg"></div>
  <div class="rule" style="left:90px;top:930px;width:80px"></div>
  <div class="abs" style="left:90px;top:960px;font-weight:700;font-size:44px;color:{SAND}">음반 제작은</div>
  <div class="abs" style="left:86px;top:1020px;font-weight:900;font-size:150px;line-height:1;letter-spacing:.02em">보다아트</div>
  <div class="abs" style="left:90px;top:1200px;font-weight:500;font-size:34px;color:rgba(247,242,235,.75)">2007년부터 음반을 만들어 왔어요</div>"""))
grid = [(P('cd2'), '음반 CD', '소량부터 프레싱까지'), (f'{MG2}/b1.jpg', 'USB 앨범', '음원·영상·화보를 한 장에'), (P('pk1'), '싸바리 · 책자형 패키지', '케이스·인쇄물 디자인까지'), (P('mob1'), '보다코드 모바일 음반', '카드 한 장이 앨범으로')]
cells = ''.join(f"""<div class="abs" style="left:{90+(i%2)*465}px;top:{300+(i//2)*500}px;width:435px">
   <div class="card" style="position:relative;width:435px;height:330px"><img src="file://{im}"></div>
   <div style="margin-top:26px;font-weight:800;font-size:38px">{esc(t)}</div><div style="margin-top:8px;font-weight:500;font-size:28px;color:{SAND}">{esc(d)}</div></div>""" for i, (im, t, d) in enumerate(grid))
jobs.append(feed('fd2', f"""<div class="abs" style="inset:0;background:radial-gradient(ellipse at 20% 0%,rgba(196,135,124,.25),rgba(0,0,0,0) 55%)"></div>
  <div class="rule" style="left:90px;top:120px;width:80px"></div>
  <div class="abs" style="left:90px;top:150px;font-weight:900;font-size:78px">이런 걸 만들어요</div>{cells}"""))
def frows(rows, top):
    return f'<div class="abs" style="left:90px;right:90px;top:{top}px">' + ''.join(f"""<div style="display:flex;gap:30px;margin-bottom:52px">
      <div style="flex:none;width:70px;height:70px;border-radius:50%;background:{ROSE};font-weight:800;font-size:34px;display:flex;align-items:center;justify-content:center">{esc(k)}</div>
      <div><div style="font-weight:800;font-size:48px;line-height:1.2">{esc(t)}</div><div style="margin-top:10px;font-weight:500;font-size:32px;color:{SAND};line-height:1.4">{esc(d)}</div></div></div>""" for k, t, d in rows) + '</div>'
jobs.append(feed('fd3', f"""{fbg(P('cd4'))}
  <div class="rule" style="left:90px;top:150px;width:80px"></div>
  <div class="abs" style="left:90px;top:180px;font-weight:900;font-size:78px;line-height:1.2">몇 장부터<br>만들 수 있나요?</div>
  {frows([('1', '200장까지는 소량으로', '디스크 표면 UV 인쇄, 한 장씩 안정적으로 복제'), ('2', '300장부터는 프레싱으로', '공장에서 찍어내는 대량 제작'), ('3', '인디 음반 100~200장도 가능', '첫 앨범도 부담 없이 시작하세요')], 520)}"""))
jobs.append(feed('fd4', f"""<div class="abs" style="inset:0;background:radial-gradient(ellipse at 80% 10%,rgba(196,135,124,.25),rgba(0,0,0,0) 55%)"></div>
  <div class="rule" style="left:90px;top:150px;width:80px"></div>
  <div class="abs" style="left:90px;top:180px;font-weight:900;font-size:78px">이렇게 진행해요</div>
  {frows([('1', '자동 견적', '프로필 링크 → bodacd.co.kr'), ('2', '디자인 파일 보내기', 'PSD·EPS 원본 + JPG, 칼선 파일은 자료실'), ('3', '사양 확인 · 제작', '급한 건은 미리 말씀해 주세요'), ('4', '받아보기', '포장해서 보내 드려요')], 380)}"""))
jobs.append(feed('fd5', f"""{fbg(P('cd2'))}
  <div class="rule" style="left:90px;top:150px;width:80px"></div>
  <div class="abs" style="left:90px;top:180px;font-weight:900;font-size:78px;line-height:1.2">문의는<br>편하게 하세요</div>
  {frows([('✉', 'DM 보내기', '인스타 메시지로 바로'), ('☎', '02-6738-3038', '전화 문의'), ('@', 'bodacd@naver.com', '파일·사양 보내기')], 500)}
  <div class="abs" style="left:90px;top:1130px;padding:22px 40px;border-radius:999px;background:{SAND};color:#1A1612;font-weight:800;font-size:40px">bodacd.co.kr 자동 견적</div>
  <div class="abs" style="left:90px;top:1245px;font-weight:500;font-size:30px;color:rgba(247,242,235,.6)">저장해 두면 필요할 때 바로 찾을 수 있어요</div>"""))

only = sys.argv[1:]
with sync_playwright() as pw:
    b = pw.chromium.launch()
    for name, w, h, p in jobs:
        if only and not any(name.startswith(o) for o in only): continue
        pg = b.new_page(viewport={'width': w, 'height': h})
        pg.goto('file://' + p); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(250)
        pg.screenshot(path=f'{OUT}/{name}.png')
        Image.open(f'{OUT}/{name}.png').convert('RGB').save(f'{OUT}/{name}.jpg', quality=93); os.remove(f'{OUT}/{name}.png')
        pg.close()
    b.close()
print(len(jobs), 'jobs')
