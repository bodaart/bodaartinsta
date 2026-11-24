# 덧씌우기 화면을 투명 PNG 로 찍는다. 사용: python3 shotov.py still t1 t2 … | frames a z
import sys, os
from playwright.sync_api import sync_playwright
D = os.path.dirname(os.path.abspath(__file__))
mode = sys.argv[1]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + D + '/tape.html')
    pg.wait_for_function('window.ready===true', timeout=20000)
    pg.wait_for_timeout(300)
    el = pg.locator('#c')
    if mode == 'still':
        os.makedirs(f'{D}/still', exist_ok=True)
        for t in sys.argv[2:]:
            pg.evaluate(f'window.render({t})')
            el.screenshot(path=f'{D}/still/t{float(t):05.2f}.png', omit_background=True)
    else:
        a, z = int(sys.argv[2]), int(sys.argv[3])
        os.makedirs(f'{D}/fr', exist_ok=True)
        for f in range(a, z):
            pg.evaluate(f'window.render({f}/30)')
            el.screenshot(path=f'{D}/fr/{f:05d}.png', omit_background=True)
    if errs: print('ERR', errs[:3])
    b.close()
