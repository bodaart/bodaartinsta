import re, json, sys
CFG = {
 'D': dict(src='epD20.js', cuts=[2.4,6.6,10.8,15.0,17.0], beats=None, hits=[0.35,8.6,11.5], flash=[0.35]),
 'B': dict(src='epB20.js', cuts=[2.4,6.6,10.8,15.0,17.0], beats=None, hits=[0.35], flash=[0.35]),
 'A': dict(src='epA20.js', cuts=[2.2,9.2,17.0], beats=[2.2,5.8,9.2,13.0,17.0], hits=[0.35,9.7,10.1,13.8], flash=[0.35]),
 '8': dict(src='ep820.js', cuts=[2.2,8.8,15.6,17.0], beats=[2.2,5.6,8.8,12.0,15.6,17.0], hits=[0.35,3.4,6.8,13.8,15.9], flash=[0.35,15.9]),
 '9': dict(src='ep920.js', cuts=[2.2,9.4,17.0], beats=[2.2,5.6,9.4,13.0,17.0], hits=[0.35,3.2,7.2,11.1], flash=[0.35]),
 'E': dict(src='epE20.js', cuts=[2.2,16.0,17.0], beats=[2.2,4.5,6.8,9.1,11.4,13.7,16.0,17.0], hits=[0.35,9.45,10.45,15.0], flash=[0.35]),
}
for k in sys.argv[1:]:
    c = CFG[k]; s = open(c['src']).read()
    s = s.replace('t>=0.5) txt+=stamp(t,0.5,', 't>=0.35) txt+=stamp(t,0.35,').replace('t>=1.3) txt+=stamp(t,1.3,', 't>=1.0) txt+=stamp(t,1.0,')
    s = re.sub(r'cap\(t,([A-Za-z0-9_\[\]\.]+)\+([0-9.]+),', lambda m: f"cap(t,{m.group(1)}+{round(max(0.2, float(m.group(2))*0.6),2)},", s)
    extra = f"cuts:{json.dumps(c['cuts'])},beats:{json.dumps(c['beats'] or c['cuts'])},hits:{json.dumps(c['hits'])},flash:{json.dumps(c['flash'])},"
    s = s.replace('window.EP={', 'window.EP={' + extra, 1)
    s = s.replace('(20초판)', '(20초판 v3: 빠른 전환·타격감)')
    open(f'ep{k}3.js', 'w').write(s)
    html = open(f'ep{k}.html').read().replace('common.js', 'common2.js').replace(f'ep{k}.js', f'ep{k}3.js')
    open(f'ep{k}3.html', 'w').write(html)
    print(k, 'ok', s.count('cap(t,'))
