# 보다아트 릴스 소리: 로파이 배경 음악 + 화면에 맞춘 효과음 (전부 직접 합성, 저작권 없음)
import numpy as np, sys
from scipy.signal import butter, sosfilt
from scipy.io import wavfile
SR = 48000
rng = np.random.default_rng(11)

def env(n, a, d, sus=0.0):
    t = np.arange(n) / SR
    e = np.exp(-t / d) * (1 - sus) + sus
    at = int(a * SR)
    if at > 0: e[:at] *= np.linspace(0, 1, at)
    return e
def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype='band', fs=SR, output='sos'), x)
def lpf(x, f, order=2):
    return sosfilt(butter(order, f, btype='low', fs=SR, output='sos'), x)
def hpf(x, f, order=2):
    return sosfilt(butter(order, f, btype='high', fs=SR, output='sos'), x)
def add(buf, x, t, g=1.0, pan=0.0):
    i = int(t * SR)
    if i >= buf.shape[0] or i < 0: return
    n = min(len(x), buf.shape[0] - i)
    buf[i:i+n, 0] += x[:n] * g * (1 - max(0, pan))
    buf[i:i+n, 1] += x[:n] * g * (1 + min(0, pan))
def mtof(m): return 440 * 2 ** ((m - 69) / 12)

# ── 악기 ──
def epiano(m, dur, vel=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m)
    mod = np.sin(2*np.pi*f*t) * 1.3 * np.exp(-t/0.35)            # 종소리 같은 첫 울림
    x = np.sin(2*np.pi*f*t + mod) + 0.25*np.sin(2*np.pi*2*f*t) * np.exp(-t/0.5)
    x *= env(n, 0.006, 1.3) * (1 + 0.12*np.sin(2*np.pi*4.6*t))    # 느린 떨림
    rel = int(0.08*SR); x[-rel:] *= np.linspace(1, 0, rel)
    return x * vel
def bass(m, dur):
    n = int(dur * SR); t = np.arange(n) / SR; f = mtof(m)
    x = np.sin(2*np.pi*f*t) + 0.6*np.sin(2*np.pi*2*f*t) + 0.25*np.sin(2*np.pi*3*f*t)
    x *= env(n, 0.01, 0.9, 0.2); rel = int(0.05*SR); x[-rel:] *= np.linspace(1, 0, rel)
    return x
def kick():
    n = int(0.32*SR); t = np.arange(n)/SR
    f = 48 + 70*np.exp(-t/0.035)
    return np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t/0.13)
def rim():
    n = int(0.16*SR); t = np.arange(n)/SR
    return bp(rng.standard_normal(n), 900, 3800) * np.exp(-t/0.045) + 0.5*np.sin(2*np.pi*190*t)*np.exp(-t/0.05)
def hat():
    n = int(0.05*SR); t = np.arange(n)/SR
    return hpf(rng.standard_normal(n), 6500) * np.exp(-t/0.014)

def music(dur):
    buf = np.zeros((int((dur+2)*SR), 2))
    bpm = 78; beat = 60/bpm; bar = beat*4
    # Fmaj7 - Em7 - Dm9 - Cmaj7 (열린 배치)
    chords = [([53,57,60,64],41), ([52,55,59,62],40), ([50,53,57,60,64],38), ([48,52,55,59],36)]
    mel = [[(0,76),(1.5,72),(2.5,69)], [(0.5,71),(2,67)], [(0,69),(1,72),(2.5,65)], [(1,67),(2.5,64)]]
    K, R, H = kick(), rim(), hat()
    nb = int(np.ceil(dur / bar)) + 1
    for b in range(nb):
        t0 = b * bar; notes, root = chords[b % 4]
        for k, m in enumerate(notes):                       # 손으로 누른 듯 살짝 어긋나게
            add(buf, epiano(m, bar*0.98, 0.5 + 0.12*rng.random()), t0 + k*0.018 + rng.random()*0.008, 0.27, pan=(k-1.5)*0.12)
        for k, m in enumerate(notes[1:3]):                   # 셋째 박 뒤에 한 번 더
            add(buf, epiano(m+12, beat*1.4, 0.35), t0 + beat*2.5 + k*0.02, 0.16, pan=0.25)
        add(buf, bass(root, beat*1.6), t0, 0.19)
        add(buf, bass(root, beat*0.9), t0 + beat*2.5, 0.15)
        if b >= 1:                                           # 첫 마디는 건반만
            for bt in (0, 2.5): add(buf, K, t0 + bt*beat, 0.36)
            for bt in (1, 3): add(buf, R, t0 + bt*beat + 0.012, 0.22, pan=-0.15)
            for e in range(8):
                sw = 0.035 if e % 2 else 0.0                  # 스윙
                add(buf, H, t0 + e*beat/2 + sw + rng.random()*0.006, 0.08 + 0.04*(e % 2 == 0), pan=0.3)
        if b >= 2:
            for bt, m in mel[b % 4]:
                add(buf, epiano(m, beat*1.6, 0.45), t0 + bt*beat + rng.random()*0.012, 0.15, pan=-0.3)
    buf = buf[:int(dur*SR)]
    # 테이프 울렁임
    n = buf.shape[0]; idx = np.arange(n) + 28*np.sin(2*np.pi*0.55*np.arange(n)/SR) + 9*np.sin(2*np.pi*3.1*np.arange(n)/SR)
    idx = np.clip(idx, 0, n-1)
    buf = np.stack([np.interp(idx, np.arange(n), buf[:, c]) for c in (0, 1)], axis=1)
    buf = np.stack([lpf(hpf(buf[:, c], 35), 5200) for c in (0, 1)], axis=1)
    return buf

def crackle(dur, amt=1.0):
    n = int(dur*SR); x = np.zeros(n)
    k = int(dur * 9 * amt)
    pos = rng.integers(0, n, k); x[pos] = rng.standard_normal(k) * rng.random(k)**2
    x = bp(x, 1200, 7500) * 2.2 + bp(rng.standard_normal(n), 300, 6000) * 0.012
    return np.stack([x, np.roll(x, 37)], axis=1)

# ── 효과음 ──
def s_stamp():                      # 도장: 낮은 쿵 + 종이 탁
    n = int(0.22*SR); t = np.arange(n)/SR
    th = np.sin(2*np.pi*np.cumsum(70 + 90*np.exp(-t/0.02))/SR) * np.exp(-t/0.06)
    sl = bp(rng.standard_normal(n), 500, 3200) * np.exp(-t/0.018)
    return th*0.9 + sl*0.5
def s_slide():                      # 장면 넘김: 종이 스치는 소리
    n = int(0.34*SR); t = np.arange(n)/SR
    e = np.sin(np.pi*t/0.34)**2
    return bp(rng.standard_normal(n), 1500, 6500) * e * 0.5
def s_tick():
    n = int(0.03*SR); t = np.arange(n)/SR
    return bp(rng.standard_normal(n), 2500, 6000) * np.exp(-t/0.006)
def s_press():                      # 프레스가 내려찍는 소리
    n = int(0.3*SR); t = np.arange(n)/SR
    return np.sin(2*np.pi*np.cumsum(55 + 60*np.exp(-t/0.03))/SR)*np.exp(-t/0.09) + bp(rng.standard_normal(n), 300, 1800)*np.exp(-t/0.03)*0.6

EPS = {
 6: dict(dur=28.0, sc=[3.2,9.0,14.0,19.5,24.0,26.0], st=[0.9,2.0,20.9,26.6], ticks=[], press=[]),
 7: dict(dur=29.0, sc=[3.2,8.0,13.5,18.5,24.5,27.0], st=[0.9,2.0,4.4,10.0,15.3,25.4,27.6], ticks=[], press=[19.56,21.16,22.76,24.36]),
 8: dict(dur=28.5, sc=[3.2,8.0,13.2,18.4,24.0,26.5], st=[0.9,4.9,9.5,21.5,24.6,27.1], ticks=[(3.5,4.8),(19.0,21.4)], press=[]),
 9: dict(dur=29.0, sc=[3.2,8.2,14.2,20.0,26.0], st=[0.9,2.0,4.6,10.7,11.0,17.1,26.6], ticks=[(14.7,17.0)], press=[]),
}
def sfx(ep):
    E = EPS[ep]; buf = np.zeros((int(E['dur']*SR), 2))
    for t in E['st']: add(buf, s_stamp(), t - 0.01, 0.75)
    for t in E['sc']: add(buf, s_slide(), t - 0.17, 0.35, pan=0.2); add(buf, s_stamp(), t, 0.45)
    for a, z in E['ticks']:
        t = a
        while t < z: add(buf, s_tick(), t, 0.22 + 0.1*rng.random(), pan=rng.random()*0.6-0.3); t += 1/12
    for t in E['press']: add(buf, s_press(), t, 0.6, pan=-0.35)
    return buf
def finish(x, dur, peak=0.7):
    n = x.shape[0]; fo = int(1.6*SR); fi = int(0.05*SR)
    x[:fi] *= np.linspace(0, 1, fi)[:, None]; x[-fo:] *= (np.linspace(1, 0, fo)**1.5)[:, None]
    x = np.tanh(x * 1.6) / 1.6
    return x / np.max(np.abs(x)) * peak
def save(fn, x): wavfile.write(fn, SR, (x * 32767).astype(np.int16))

if __name__ == '__main__':
    for ep, E in EPS.items():
        d = E['dur']
        m = music(d) + crackle(d) * 0.05
        f = sfx(ep)
        save(f'a{ep}_mix.wav', finish(m * 1.0 + f * 0.55, d))                 # 음악 + 효과음
        save(f'a{ep}_sfx.wav', finish(f * 1.0 + crackle(d, 0.6) * 0.04, d, 0.6))  # 효과음만
        print(ep, 'ok')
