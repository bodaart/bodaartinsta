# 포트폴리오 모션그래픽용 소리: 100 BPM 딥하우스 느낌. 네 박 킥, 옆박 오픈햇, 사이드체인으로 숨 쉬는 패드, 딜레이 걸린 아르페지오.
# 장면 전환엔 상승음+휘익, 제목엔 쿵. 전부 직접 합성, 저작권 없음.
import sys, numpy as np
import sound as S
from sound import SR, add, bp, lpf, hpf, mtof, env, rng
from sound6 import kick2, clap, hat2, riser, impact, shimmer, s_whoosh

BPM = 100; BEAT = 60/BPM; BAR = BEAT*4; ST16 = BEAT/4
CH = [([53,57,60,64],41), ([52,55,59,62],40), ([50,53,57,60,64],38), ([48,52,55,59],36)]

def kickd():                       # 깊고 부드러운 하우스 킥
    n = int(0.5*SR); t = np.arange(n)/SR
    f = 42 + 110*np.exp(-t/0.035)
    x = np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t/0.26)
    click = hpf(rng.standard_normal(n), 3000) * np.exp(-t/0.003) * 0.2
    return np.tanh((x + click) * 1.9) / 1.3
def sub(m, dur):
    n = int(dur*SR); t = np.arange(n)/SR; f = mtof(m)
    x = np.sin(2*np.pi*f*t) * 0.9 + np.sin(2*np.pi*f*2*t) * 0.15
    e = np.ones(n); a = int(0.01*SR); e[:a] = np.linspace(0, 1, a); r = int(0.06*SR); e[-r:] = np.linspace(1, 0, r)
    return x * e
def padw(notes, dur, cut):          # 디튠 톱니 패드, 컷오프 조절
    n = int(dur*SR); t = np.arange(n)/SR; x = np.zeros(n)
    for m in notes:
        for dt in (-0.09, 0.0, 0.09):
            f = mtof(m) * 2**(dt/12); ph = (f*t + rng.random()) % 1.0
            x += (2*ph - 1) * 0.3
    x = lpf(x, cut, 2) * env(n, 0.35, 9.0) / len(notes)
    r = int(0.3*SR); x[-r:] *= np.linspace(1, 0, r)
    return x
def pluck2(m, dur=0.5, vel=1.0):
    n = int(dur*SR); t = np.arange(n)/SR; f = mtof(m)
    x = np.sin(2*np.pi*f*t) * 0.7 + np.sin(2*np.pi*f*2*t) * 0.25 * np.exp(-t/0.08) + np.sin(2*np.pi*f*3*t) * 0.1 * np.exp(-t/0.05)
    return x * np.exp(-t/0.16) * vel
def shaker():
    n = int(0.06*SR); t = np.arange(n)/SR
    return bp(rng.standard_normal(n), 5000, 12000) * np.exp(-t/0.018)

def music(dur, intro=2.4, out=19.2):
    L = int((dur+2)*SR)
    drums = np.zeros((L, 2)); low = np.zeros((L, 2)); keys = np.zeros((L, 2))
    K, C, OH, SH = kickd(), clap(), hat2(True), shaker()
    kicks = []
    nb = int(np.ceil(dur/BAR)) + 1
    for b in range(nb):
        t0 = b*BAR; notes, root = CH[b % 4]
        full = intro <= t0 < out            # 본편 구간에만 드럼
        tail = t0 >= out                     # 엔드카드: 킥만 가볍게, 패드는 활짝
        cut = 900 + 2600*min(1, t0/out)      # 패드가 점점 열린다
        add(keys, padw(notes, BAR*1.03, cut), t0, 0.5 if not tail else 0.62)
        if full or tail:
            for s in range(4):
                tt = t0 + s*BEAT
                add(drums, K, tt, 0.95 if full else 0.6); kicks.append(tt)
        if full:
            for s in range(4):
                tt = t0 + s*BEAT
                add(low, sub(root-12, BEAT*0.45), tt + BEAT*0.5, 0.5)     # 옆박 서브
                add(drums, OH, tt + BEAT*0.5, 0.22, pan=0.3)
                if s in (1, 3): add(drums, C, tt, 0.42, pan=-0.05)
            for s in range(16):
                add(drums, SH, t0 + s*ST16 + (0.006 if s % 2 else 0), 0.09 if s % 4 == 2 else 0.05, pan=-0.3)
        if full or tail or t0 < intro:
            arp = [0, 2, 1, 3, 2, 0, 3, 1]
            for i, a in enumerate(arp):
                tt = t0 + i*BEAT/2
                p = pluck2(notes[a % len(notes)] + 12, 0.5, 0.75 if i % 2 == 0 else 0.5)
                add(keys, p, tt, 0.22, pan=(-0.35 if i % 2 else 0.35))
                add(keys, p, tt + BEAT*0.75, 0.11, pan=(0.35 if i % 2 else -0.35))   # 점딜레이
                add(keys, p, tt + BEAT*1.5, 0.05, pan=(-0.35 if i % 2 else 0.35))
    # 몽타주 마지막 박: 스네어 롤
    for r in range(8):
        add(drums, C, out - BEAT + r*ST16/2, 0.25 + 0.05*r, pan=0.1*(1 if r % 2 else -1))
    n = L; duck = np.ones(n)
    for k in kicks:
        i = int(k*SR); m = min(n - i, int(0.45*SR))
        if m > 0: duck[i:i+m] = np.minimum(duck[i:i+m], 1 - 0.55*np.exp(-np.arange(m)/SR/0.13))
    keys *= duck[:, None]; low *= duck[:, None]
    mix = drums*0.8 + low*0.6 + keys*2.3
    mix = mix[:int(dur*SR)]
    return np.stack([hpf(mix[:, c], 30) for c in (0, 1)], axis=1)

def fx(E, dur):
    buf = np.zeros((int(dur*SR), 2))
    for c in E['cuts']:
        r = riser(1.3); add(buf, r, c - len(r)/SR, 0.3)
        add(buf, s_whoosh(0.4), c-0.2, 0.4, pan=-0.2)
    for h in E['hits']: add(buf, impact(), max(h-0.005, 0), 0.8)
    for i, t in enumerate(E['sh']): add(buf, shimmer(74 + (i % 3)*2), t, 0.16, pan=(0.3 if i % 2 else -0.3))
    for t in E.get('mont', []): add(buf, s_whoosh(0.18), t-0.06, 0.35, pan=0.2); add(buf, S.s_stamp(), t, 0.3)
    return buf

EPS = {'MG1': dict(cuts=[2.4,7.2,12.0,16.8,19.2], hits=[0.08,19.2], sh=[1.2,3.35,8.1,12.95,20.2], mont=[16.8,17.4,18.0,18.6], dur=24.0)}
if __name__ == '__main__':
    for ep in sys.argv[1:]:
        E = EPS[ep]; d = E['dur']
        m = music(d)
        S.save(f'a{ep}_mix.wav', S.finish(m*0.9 + fx(E, d)*0.7, d, 0.85))
        print(ep, 'ok')
