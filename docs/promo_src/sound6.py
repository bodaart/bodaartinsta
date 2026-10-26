# v5 소리: 같은 화음 진행을 신나는 비트로 (90 BPM 하프타임, 808 베이스, 16분 하이햇 롤, 클랩)
# + 장면 넘김 전 상승음, 큰 타격엔 쿵 떨어지는 소리, 도장엔 반짝이는 소리. 전부 직접 합성, 저작권 없음.
import sys, numpy as np
import sound as S
from sound import SR, add, bp, lpf, hpf, mtof, env, rng

BPM = 90; BEAT = 60/BPM; BAR = BEAT*4; ST16 = BEAT/4

def kick2():
    n = int(0.42*SR); t = np.arange(n)/SR
    f = 44 + 130*np.exp(-t/0.03)
    x = np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t/0.2)
    click = hpf(rng.standard_normal(n), 2000) * np.exp(-t/0.004) * 0.35
    return np.tanh((x + click) * 2.2) / 1.4
def clap():
    n = int(0.35*SR); t = np.arange(n)/SR; x = np.zeros(n)
    for k, d in enumerate([0, 0.011, 0.022]):
        i = int(d*SR); m = n - i; tt = np.arange(m)/SR
        x[i:] += bp(rng.standard_normal(m), 900, 5200) * np.exp(-tt/(0.012 if k < 2 else 0.11))
    body = np.sin(2*np.pi*190*t) * np.exp(-t/0.04) * 0.4
    return x*0.9 + body
def hat2(open_=False):
    n = int((0.22 if open_ else 0.045)*SR); t = np.arange(n)/SR
    return hpf(rng.standard_normal(n), 7000) * np.exp(-t/(0.07 if open_ else 0.012))
def b808(m, dur, glide=0):
    n = int(dur*SR); t = np.arange(n)/SR
    f = mtof(m) * (1 + glide*np.clip(t/0.12, 0, 1))
    x = np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t/0.6)
    x = np.tanh(x*2.4)/1.2                       # 배음을 세워 폰 스피커에서도 들리게
    a = int(0.004*SR); x[:a] *= np.linspace(0, 1, a)
    r = int(0.04*SR); x[-r:] *= np.linspace(1, 0, r)
    return x
def pad(notes, dur):
    n = int(dur*SR); t = np.arange(n)/SR; x = np.zeros(n)
    for m in notes:
        for dt in (-0.12, 0.0, 0.12):
            f = mtof(m) * 2**(dt/12)
            ph = (f*t + rng.random()) % 1.0
            x += (2*ph - 1) * 0.33
    x = lpf(x, 1700, 2) * env(n, 0.25, 9.0) / len(notes)
    r = int(0.2*SR); x[-r:] *= np.linspace(1, 0, r)
    return x
def pluck(m, dur=0.4, vel=1.0):
    n = int(dur*SR); t = np.arange(n)/SR; f = mtof(m)
    ph = (f*t) % 1.0
    x = (2*ph - 1) * 0.6 + np.sin(2*np.pi*f*t) * 0.6
    x = lpf(x, 3800, 2) * np.exp(-t/0.11)
    return x * vel
def riser(d=1.4):
    n = int(d*SR); t = np.arange(n)/SR; p = t/d
    nz = rng.standard_normal(n); out = np.zeros(n); seg = 1024
    for i in range(0, n, seg):
        q = i/n; out[i:i+seg] = bp(nz[i:i+seg], 400 + 3000*q, min(1200 + 9000*q, 20000))
    tone = np.sin(2*np.pi*np.cumsum(220 + 900*p**2)/SR) * 0.25
    return (out*0.8 + tone) * p**2.2
def impact():
    n = int(1.1*SR); t = np.arange(n)/SR
    sub = np.sin(2*np.pi*np.cumsum(30 + 70*np.exp(-t/0.12))/SR) * np.exp(-t/0.45)
    nz = lpf(rng.standard_normal(n), 2500) * np.exp(-t/0.05) * 0.7
    tail = bp(rng.standard_normal(n), 300, 3000) * np.exp(-t/0.35) * 0.18
    return np.tanh((sub*1.4 + nz + tail) * 1.6) / 1.2
def shimmer(root=72):
    n = int(0.6*SR); x = np.zeros(n)
    for k, m in enumerate([root, root+4, root+7, root+12]):
        i = int(k*0.035*SR); m_ = n - i; tt = np.arange(m_)/SR
        x[i:] += np.sin(2*np.pi*mtof(m+12)*tt) * np.exp(-tt/0.16) * 0.5
    return x
def s_whoosh(d=0.3):
    n = int(d*SR); t = np.arange(n)/SR; x = rng.standard_normal(n)
    out = np.zeros(n); seg = 512
    for i in range(0, n, seg):
        p = i/n; f = 700 + 5200*p
        out[i:i+seg] = bp(x[i:i+seg], f*0.6, min(f*1.6, 20000))
    return out * np.sin(np.pi*t/d)**1.5 * 0.9

GD, GL, GK = 0.8, 0.55, 2.6
STEMS = None
CH = [([53,57,60,64],41), ([52,55,59,62],40), ([50,53,57,60,64],38), ([48,52,55,59],36)]
ARP = [0, 2, 1, 3, 2, 1, 3, 2]
def music5(dur, drop=(16.55, 17.0)):
    L = int((dur+2)*SR)
    drums = np.zeros((L, 2)); low = np.zeros((L, 2)); keys = np.zeros((L, 2))
    K, C, H, OH = kick2(), clap(), hat2(), hat2(True)
    kicks = []
    nb = int(np.ceil(dur/BAR)) + 1
    for b in range(nb):
        t0 = b*BAR; notes, root = CH[b % 4]
        for s in (0, 6, 10) if b % 2 == 0 else (0, 7, 10, 14):
            tt = t0 + s*ST16
            if drop[0] <= tt < drop[1]: continue
            add(drums, K, tt, 0.9); kicks.append(tt)
            add(low, b808(root-12, ST16*(4 if s == 0 else 3), glide=(1.0 if (s == 14) else 0)), tt, 0.55)
        for s in (4, 12):
            tt = t0 + s*ST16
            if not (drop[0] <= tt < drop[1]): add(drums, C, tt, 0.55, pan=0.05)
        for s in range(16):
            tt = t0 + s*ST16
            if drop[0] <= tt < drop[1]: continue
            if b % 2 == 1 and s >= 12:      # 마지막 박에 32분 롤
                for r in range(2): add(drums, H, tt + r*ST16/2, 0.12 + 0.04*r, pan=0.35)
            elif s == 14: add(drums, OH, tt, 0.16, pan=0.35)
            else: add(drums, H, tt + (0.012 if s % 2 else 0), 0.16 if s % 4 == 0 else 0.1, pan=0.35)
        add(keys, pad(notes, BAR*1.02), t0, 0.32, pan=0.0)
        for i, a in enumerate(ARP):
            tt = t0 + i*BEAT/2
            add(keys, pluck(notes[a % len(notes)] + 12, 0.38, 0.8 if i % 2 == 0 else 0.6), tt, 0.2, pan=(-0.4 if i % 2 else 0.4))
        for s in (3, 11):
            for k, m in enumerate(notes[1:3]): add(keys, S.epiano(m+12, BEAT*0.5, 0.4), t0 + s*ST16 + k*0.01, 0.1, pan=-0.2)
    # 킥에 맞춰 건반·패드가 숨 쉬듯 줄었다 커짐
    n = L; tt = np.arange(n)/SR; duck = np.ones(n)
    for k in kicks:
        i = int(k*SR); m = min(n - i, int(0.35*SR))
        if m > 0: duck[i:i+m] = np.minimum(duck[i:i+m], 1 - 0.4*np.exp(-np.arange(m)/SR/0.11))
    keys *= duck[:, None]
    global STEMS; STEMS=(drums,low,keys)
    mix = drums*GD + low*GL + keys*GK
    mix = mix[:int(dur*SR)]
    return np.stack([hpf(mix[:, c], 30) for c in (0, 1)], axis=1)

EPS = {
 'F4': dict(cuts=[2.2,8.4,14.6,17.0], beats=[5.3,11.5], hits=[0.02,0.35,7.1], st=[1.0,3.0,11.8,12.05,12.3,12.55,15.6,17.6], ticks=[(5.6,7.1),(8.4,8.9),(14.6,15.0)]),
 'P4': dict(cuts=[2.2,8.4,14.6,17.0], beats=[5.3,11.5], hits=[0.02,0.35,8.9], st=[1.0,2.2,3.0,5.3,8.4,8.9,11.5,11.9,12.4,12.9,14.6,17.0,17.3,17.6], ticks=[]),
 'H4': dict(cuts=[2.2,8.4,14.6,17.0], beats=[5.3,11.5], hits=[0.02,0.35,11.5], st=[1.0,3.2,4.3,6.6,10.2,11.8,12.35,12.9,13.45,15.8,17.6], ticks=[]),
 'G4': dict(cuts=[2.2,8.4,14.6,17.0], beats=[5.3,11.5], hits=[0.02,0.35], st=[1.0,1.4,3.3,6.2,7.0,11.8,12.1,12.4,12.7,13.0,17.6], ticks=[(8.4,8.9)]),
}
def fx(E, dur):
    buf = np.zeros((int(dur*SR), 2))
    for c in E['cuts']:
        r = riser(1.2 if c != 17.0 else 0.45); add(buf, r, c - len(r)/SR, 0.35)
        add(buf, s_whoosh(0.4), c-0.22, 0.4, pan=-0.2)
    add(buf, impact(), 17.0, 0.7)
    for c in E['beats']: add(buf, s_whoosh(0.25), c-0.1, 0.3, pan=0.2); add(buf, S.s_stamp(), c, 0.4)
    for h in E['hits']: add(buf, impact(), max(h-0.005, 0), 0.75)
    for i, t in enumerate(E['st']):
        add(buf, S.s_stamp(), t-0.01, 0.5); add(buf, shimmer(72 + (i % 3)*2), t+0.02, 0.18, pan=(0.3 if i % 2 else -0.3))
    for a, z in E['ticks']:
        t = a
        while t < z: add(buf, S.s_tick(), t, 0.22 + 0.1*rng.random(), pan=rng.random()*0.6-0.3); t += 1/15
    return buf
if __name__ == '__main__':
    for ep in sys.argv[1:]:
        E = EPS[ep]; d = 20.0
        m = music5(d)
        S.save(f'a{ep}5_mix.wav', S.finish(m*0.9 + fx(E, d)*0.7 + S.crackle(d)*0.03, d, 0.85))
        print(ep, 'ok')
