# v7 소리: 느긋한 시네마틱 팝 (74 BPM). 따뜻한 일렉피아노 화음 + 깊은 서브 베이스 + 하프타임 드럼(1박 킥, 3박 스네어+잔향)
# + 종소리 멜로디 + 숨 쉬는 패드. 장면 넘김엔 낮은 쿵과 상승음. 전부 직접 합성, 저작권 없음.
import sys, numpy as np
import sound as S
from sound import SR, add, bp, lpf, hpf, mtof, env, rng
from sound6 import kick2, riser, impact, shimmer, s_whoosh

BPM = 74; BEAT = 60/BPM; BAR = BEAT*4; E8 = BEAT/2

def snare():
    n = int(0.6*SR); t = np.arange(n)/SR
    body = np.sin(2*np.pi*(180 + 60*np.exp(-t/0.02))*t) * np.exp(-t/0.06) * 0.6
    nz = bp(rng.standard_normal(n), 1200, 9000) * np.exp(-t/0.11)
    verb = bp(rng.standard_normal(n), 600, 6000) * np.exp(-t/0.33) * 0.35
    return np.tanh((body + nz + verb) * 1.6) / 1.2
def shaker():
    n = int(0.08*SR); t = np.arange(n)/SR
    return hpf(rng.standard_normal(n), 6000) * np.exp(-t/0.02)
def sub(m, dur):
    n = int(dur*SR); t = np.arange(n)/SR; f = mtof(m)
    x = np.sin(2*np.pi*f*t) + 0.25*np.sin(2*np.pi*2*f*t)
    x *= env(n, 0.02, dur*0.9)
    r = int(0.08*SR); x[-r:] *= np.linspace(1, 0, r)
    return x
def warmpad(notes, dur):
    n = int(dur*SR); t = np.arange(n)/SR; x = np.zeros(n)
    for m in notes:
        for dt in (-0.08, 0.08):
            f = mtof(m) * 2**(dt/12)
            x += np.sin(2*np.pi*f*t + rng.random()*6.28) * 0.5 + np.sin(2*np.pi*f*2*t) * 0.12
    swell = 0.55 + 0.45*np.sin(np.pi*np.clip(t/dur, 0, 1))
    x = lpf(x, 1400, 2) * swell / len(notes)
    a = int(0.4*SR); x[:a] *= np.linspace(0, 1, a); x[-a:] *= np.linspace(1, 0, a)
    return x
def bell(m, dur=1.2, vel=1.0):
    n = int(dur*SR); t = np.arange(n)/SR; f = mtof(m)
    x = np.sin(2*np.pi*f*t) * np.exp(-t/0.5) + np.sin(2*np.pi*f*2.76*t) * np.exp(-t/0.12) * 0.35 + np.sin(2*np.pi*f*4*t) * np.exp(-t/0.25) * 0.15
    a = int(0.003*SR); x[:a] *= np.linspace(0, 1, a)
    return x * vel * 0.6

# 화음: Am – F – C – G 느낌 (따뜻하고 희망적)
CH = [([57,60,64,67],45), ([53,57,60,65],41), ([48,52,55,60],48), ([55,59,62,67],43)]
MEL = [[76,79,81,None,79,76,None,None],[77,None,76,74,None,72,None,None],[72,76,79,None,84,None,79,None],[79,None,78,None,76,74,None,None]]
def music7(dur):
    L = int((dur+3)*SR)
    drums = np.zeros((L, 2)); low = np.zeros((L, 2)); keys = np.zeros((L, 2))
    K, SN, SH = kick2(), snare(), shaker()
    kicks = []
    nb = int(np.ceil(dur/BAR)) + 1
    for b in range(nb):
        t0 = b*BAR; notes, root = CH[b % 4]
        for s in (0, 2.5) if b % 2 == 0 else (0, 2.5, 3.5):
            tt = t0 + s*BEAT; add(drums, K, tt, 0.75); kicks.append(tt)
        add(drums, SN, t0 + 2*BEAT, 0.5, pan=0.05)
        for s in range(8):
            add(drums, SH, t0 + s*E8 + (0.01 if s % 2 else 0), 0.09 if s % 2 == 0 else 0.05, pan=0.3)
        add(low, sub(root-12, BAR*0.95), t0, 0.5)
        add(keys, warmpad(notes, BAR*1.05), t0, 0.26)
        for k, m in enumerate(notes):                      # 일렉피아노 화음, 1박·3박 뒤 살짝
            add(keys, S.epiano(m, BEAT*1.9, 0.5), t0 + k*0.012, 0.16, pan=(k-1.5)*0.15)
            add(keys, S.epiano(m, BEAT*1.9, 0.38), t0 + 2.5*BEAT + k*0.012, 0.13, pan=(k-1.5)*0.15)
        for i, m in enumerate(MEL[b % 4]):                 # 종소리 멜로디 (8분)
            if m is None: continue
            add(keys, bell(m, 1.3, 0.9 if i % 2 == 0 else 0.7), t0 + i*E8, 0.17, pan=(0.35 if i % 2 else -0.35))
    n = L; duck = np.ones(n)
    for k in kicks:
        i = int(k*SR); m = min(n - i, int(0.3*SR))
        if m > 0: duck[i:i+m] = np.minimum(duck[i:i+m], 1 - 0.25*np.exp(-np.arange(m)/SR/0.1))
    keys *= duck[:, None]
    mix = drums*0.75 + low*0.6 + keys*2.2
    mix = mix[:int(dur*SR)]
    r = int(1.2*SR); mix[-r:] *= np.linspace(1, 0, r)[:, None]
    return np.stack([hpf(mix[:, c], 30) for c in (0, 1)], axis=1)

EPS = {
 'P5': dict(cuts=[4.0,13.2,22.4,27.0], beats=[8.6,17.8], hits=[0.02,0.5,13.7], st=[1.6,4.0,5.5,8.6,13.2,14.3,17.8,18.5,19.4,20.3,22.4,27.0,27.6,28.2], dur=30.0),
}
def fx7(E, dur):
    buf = np.zeros((int(dur*SR), 2)); last = E['cuts'][-1]
    for c in E['cuts']:
        r = riser(1.6 if c != last else 0.6); add(buf, r, c - len(r)/SR, 0.28)
        add(buf, s_whoosh(0.5), c-0.28, 0.32, pan=-0.2)
        add(buf, impact(), c, 0.45 if c != last else 0.65)
    for c in E['beats']: add(buf, s_whoosh(0.35), c-0.15, 0.25, pan=0.2); add(buf, S.s_stamp(), c, 0.35)
    for h in E['hits']: add(buf, impact(), max(h-0.005, 0), 0.7)
    for i, t in enumerate(E['st']):
        add(buf, S.s_stamp(), t-0.01, 0.42); add(buf, shimmer(72 + (i % 3)*2), t+0.02, 0.15, pan=(0.3 if i % 2 else -0.3))
    return buf
if __name__ == '__main__':
    for ep in sys.argv[1:]:
        E = EPS[ep]; d = E['dur']
        m = music7(d)
        S.save(f'a{ep}7_mix.wav', S.finish(m*0.9 + fx7(E, d)*0.7 + S.crackle(d)*0.02, d, 0.85))
        print(ep, 'ok')
