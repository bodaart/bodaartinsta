import sys, os
from playwright.sync_api import sync_playwright
D = os.path.dirname(os.path.abspath(__file__))
ep, mode = sys.argv[1], sys.argv[2]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1080, 'height': 1920})
    errs=[]
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('file://' + D + f'/ep{ep}.html')
    pg.wait_for_function('window.ready===true', timeout=15000)
    for w in (500,600,700,800,900):
        pg.evaluate(f'document.fonts.load("{w} 40px P","가1")')
    pg.evaluate('''Promise.all([0,1,2].map(i=>new Promise(r=>{const im=new Image();im.onload=r;im.onerror=r;im.src=`grain${i}.png`})))''')
    pg.wait_for_timeout(400)
    if mode == 'still':
        os.makedirs(f'{D}/still{ep}', exist_ok=True)
        for t in sys.argv[3:]:
            pg.evaluate(f'window.render({t})')
            pg.screenshot(path=f'{D}/still{ep}/t{float(t):05.2f}.png')
    else:
        a, z = int(sys.argv[3]), int(sys.argv[4])
        os.makedirs(f'{D}/fr{ep}', exist_ok=True)
        for f in range(a, z):
            pg.evaluate(f'window.render({f}/30)')
            pg.screenshot(path=f'{D}/fr{ep}/{f:05d}.jpg', type='jpeg', quality=96)
    if errs: print('ERR', errs[:3])
    b.close()
