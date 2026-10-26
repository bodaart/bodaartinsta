import os, sys
from playwright.sync_api import sync_playwright
D = os.path.dirname(os.path.abspath(__file__))
keys = sys.argv[1:] or ['1','2','3','4','sq']
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1080, 'height': 1350})
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + D + '/promo.html')
    pg.wait_for_function('window.ready===true', timeout=15000)
    for w in (500, 600, 700, 800, 900):
        pg.evaluate(f'document.fonts.load("{w} 40px P","가1")')
    pg.wait_for_timeout(500)
    for k in keys:
        H = 1080 if k == 'sq' else 1350
        pg.set_viewport_size({'width': 1080, 'height': H})
        pg.evaluate(f'window.show("{k}")')
        pg.wait_for_timeout(150)
        name = 'bodapromo_sq' if k == 'sq' else f'bodapromo_feed{k}'
        pg.screenshot(path=f'{D}/{name}.png', clip={'x': 0, 'y': 0, 'width': 1080, 'height': H})
        print(name, 'ok')
    if errs: print('ERR', errs[:3])
    b.close()
