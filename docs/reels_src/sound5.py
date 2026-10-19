# v3 소리: 같은 곡을 빠르게(100 BPM) + 전환 휙 소리 + 도장 타격음
import sys, numpy as np
import sound as S
from sound import SR, add, bp, lpf, hpf, epiano, bass, kick, rim, hat, rng

def music2(dur, bpm=100):
    buf = np.zeros((int((dur+2)*SR), 2))
    beat = 60/bpm; bar = beat*4
    chords = [([53,57,60,64],41), ([52,55,59,62],40), ([50,53,57,60,64],38), ([48,52,55,59],36)]
    mel = [[(0,76),(1.5,72),(2.5,69)], [(0.5,71),(2,67)], [(0,69),(1,72),(2.5,65)], [(1,67),(2.5,64)]]
    K, R, H = kick(), rim(), hat()
    nb = int(np.ceil(dur / bar)) + 1
    for b in range(nb):
        t0 = b*bar; notes, root = chords[b % 4]
        for k, m in enumerate(notes):
            add(buf, epiano(m, bar*0.98, 0.5 + 0.12*rng.random()), t0 + k*0.012 + rng.random()*0.006, 0.25, pan=(k-1.5)*0.12)
        for bt in (1.5, 3.0):                                   # 건반 엇박 찌르기
            for k, m in enumerate(notes[1:3]): add(buf, epiano(m+12, beat*0.6, 0.35), t0 + bt*beat + k*0.01, 0.13, pan=0.25)
        add(buf, bass(root, beat*0.9), t0, 0.22); add(buf, bass(root, beat*0.5), t0 + beat*1.5, 0.17)
        add(buf, bass(root+7, beat*0.5), t0 + beat*2.5, 0.15); add(buf, bass(root, beat*0.5), t0 + beat*3.5, 0.13)
        for bt in (0, 1.5, 2.5): add(buf, K, t0 + bt*beat, 0.42)
        for bt in (1, 3): add(buf, R, t0 + bt*beat + 0.008, 0.27, pan=-0.15)
        for e in range(16): add(buf, H, t0 + e*beat/4 + rng.random()*0.004, 0.05 + 0.05*(e % 4 == 2), pan=0.3)
        if b >= 1:
            for bt, m in mel[b % 4]: add(buf, epiano(m, beat*1.2, 0.45), t0 + bt*beat + rng.random()*0.008, 0.14, pan=-0.3)
    buf = buf[:int(dur*SR)]
    n = buf.shape[0]; idx = np.clip(np.arange(n) + 14*np.sin(2*np.pi*0.55*np.arange(n)/SR), 0, n-1)
    buf = np.stack([np.interp(idx, np.arange(n), buf[:, c]) for c in (0, 1)], axis=1)
    return np.stack([lpf(hpf(buf[:, c], 35), 6500) for c in (0, 1)], axis=1)

def music3(dur, bpm=90):
    buf = np.zeros((int((dur+2)*SR), 2))
    beat = 60/bpm; bar = beat*4
    chords = [([53,57,60,64],41), ([52,55,59,62],40), ([50,53,57,60,64],38), ([48,52,55,59],36)]
    mel = [[(0,76),(1.5,72),(2.5,69)], [(0.5,71),(2,67)], [(0,69),(1,72),(2.5,65)], [(1,67),(2.5,64)]]
    K, R, H = kick(), rim(), hat()
    nb = int(np.ceil(dur / bar)) + 1
    for b in range(nb):
        t0 = b*bar; notes, root = chords[b % 4]
        for k, m in enumerate(notes):
            add(buf, epiano(m, bar*0.98, 0.5 + 0.12*rng.random()), t0 + k*0.015 + rng.random()*0.007, 0.26, pan=(k-1.5)*0.12)
        for k, m in enumerate(notes[1:3]): add(buf, epiano(m+12, beat*1.0, 0.35), t0 + beat*2.5 + k*0.015, 0.14, pan=0.25)
        add(buf, bass(root, beat*1.4), t0, 0.21); add(buf, bass(root, beat*0.6), t0 + beat*2.5, 0.16); add(buf, bass(root+7, beat*0.4), t0 + beat*3.5, 0.12)
        for bt in (0, 1.75, 2.5): add(buf, K, t0 + bt*beat, 0.4 if bt != 1.75 else 0.22)
        for bt in (1, 3): add(buf, R, t0 + bt*beat + 0.01, 0.25, pan=-0.15)
        for e in range(8):
            sw = 0.028 if e % 2 else 0.0
            add(buf, H, t0 + e*beat/2 + sw + rng.random()*0.005, 0.07 + 0.04*(e % 2 == 0), pan=0.3)
        if b % 2 == 1: add(buf, H, t0 + 3.75*beat, 0.06, pan=0.3)
        if b >= 1:
            for bt, m in mel[b % 4]: add(buf, epiano(m, beat*1.4, 0.45), t0 + bt*beat + rng.random()*0.01, 0.14, pan=-0.3)
    buf = buf[:int(dur*SR)]
    n = buf.shape[0]; idx = np.clip(np.arange(n) + 20*np.sin(2*np.pi*0.55*np.arange(n)/SR), 0, n-1)
    buf = np.stack([np.interp(idx, np.arange(n), buf[:, c]) for c in (0, 1)], axis=1)
    return np.stack([lpf(hpf(buf[:, c], 35), 6000) for c in (0, 1)], axis=1)

def s_whoosh(d=0.3):                  # 색 띠가 훑고 지나가는 소리
    n = int(d*SR); t = np.arange(n)/SR; x = rng.standard_normal(n)
    out = np.zeros(n); seg = 512
    for i in range(0, n, seg):
        p = i/n; f = 700 + 5200*p
        out[i:i+seg] = bp(x[i:i+seg], f*0.6, min(f*1.6, 20000))
    return out * np.sin(np.pi*t/d)**1.5 * 0.9
def s_hit():                          # 크게 찍히는 도장: 쿵 + 탁 + 짧은 잔향
    n = int(0.45*SR); t = np.arange(n)/SR
    th = np.sin(2*np.pi*np.cumsum(46 + 120*np.exp(-t/0.025))/SR) * np.exp(-t/0.11)
    sl = bp(rng.standard_normal(n), 700, 4200) * np.exp(-t/0.02)
    tail = bp(rng.standard_normal(n), 200, 1200) * np.exp(-t/0.09) * 0.25
    return th*1.0 + sl*0.6 + tail

EPS = {
 'D4': dict(cuts=[2.2,8.8,15.4,17.0], beats=[5.5,12.1], hits=[0.35,7.4,12.7], st=[1.0,9.48,9.76,10.04,10.32,17.6], ticks=[(2.2,2.6),(5.8,7.2)], press=[]),
 'B4': dict(cuts=[2.2,8.8,15.4,17.0], beats=[5.5,12.1], hits=[0.35], st=[1.0,12.7,13.1,17.6], ticks=[(2.2,2.6),(9.1,10.3)], press=[]),
 'A4': dict(cuts=[2.2,9.2,17.0], beats=[5.8,13.0], hits=[0.35,9.7,10.1,13.8], st=[1.0,17.6], ticks=[(2.2,2.6),(9.2,9.6),(13.0,13.4)], press=[]),
 '84': dict(cuts=[2.2,8.8,15.6,17.0], beats=[5.6,12.0], hits=[0.35,3.4,6.8,13.8,15.9], st=[17.6], ticks=[(2.2,3.3),(5.6,6.0),(8.8,9.2),(12.0,13.7)], press=[]),
 '94': dict(cuts=[2.2,9.4,17.0], beats=[5.6,13.0], hits=[0.35,3.2,7.2,11.1], st=[1.0,7.4,17.6], ticks=[(2.2,2.6),(5.6,6.0),(9.6,11.0)], press=[]),
 'E4': dict(cuts=[2.2,16.0,17.0], beats=[4.5,6.8,9.1,11.4,13.7], hits=[0.35,9.45,10.45,15.0], st=[4.65,6.95,9.25,11.55,13.85,17.6], ticks=[], press=[]),
}
def sfx(E, dur):
    buf = np.zeros((int(dur*SR), 2))
    for c in E['cuts']: add(buf, s_whoosh(0.4), c-0.22, 0.45, pan=-0.2); add(buf, S.s_stamp(), c, 0.3)
    for c in E['beats']: add(buf, s_whoosh(0.2), c-0.08, 0.3, pan=0.2); add(buf, S.s_stamp(), c, 0.45)
    for h in E['hits']: add(buf, s_hit(), h-0.005, 0.85)
    for t in E['st']: add(buf, S.s_stamp(), t-0.01, 0.6)
    for a, z in E['ticks']:
        t = a
        while t < z: add(buf, S.s_tick(), t, 0.22 + 0.1*rng.random(), pan=rng.random()*0.6-0.3); t += 1/15
    for t in E['press']: add(buf, S.s_press(), t, 0.6, pan=-0.35)
    return buf
for ep in sys.argv[1:]:
    E = EPS[ep]; d = 20.0
    S.save(f'a{ep}_mix.wav', S.finish(music3(d) + S.crackle(d)*0.04 + sfx(E, d)*0.6, d))
    print(ep, 'ok')
