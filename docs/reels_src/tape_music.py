# 그리운 것들 2편 "엄마가 녹음해 둔 내 어릴 적 목소리 테이프" 음악
# 저작권이 끝난 브람스 자장가(1868) 앞 여덟 마디를 오르골 소리로, 카세트 테이프에서 나오는 것처럼(느린 음 흔들림 + 테이프 쉬익)
# 0~2.6초(지금)는 낮은 화음만, 2.58초 녹음기 재생 버튼 "철컥" 뒤로 자장가 시작
# 사용: python3 tape_music.py <출력.wav> [길이초=26]
import sys, numpy as np, wave
out = sys.argv[1]; DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 26.0
SR = 48000; N = int(SR * DUR)
rng = np.random.default_rng(11)
L = np.zeros(N); R = np.zeros(N)       # 테이프에서 나오는 소리(흔들림 적용)
DL = np.zeros(N); DR = np.zeros(N)     # 바로 들리는 소리(버튼, 방 공기)

def hz(name):
    names = {'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}
    n = names[name[0]]; o = int(name[-1])
    return 440.0 * 2 ** ((n + 12 * (o + 1) - 69) / 12)

def mbox(t0, f, amp=0.30, dec=1.6, pan=0.0, A=L, B=R):
    i0 = int(t0 * SR); n = int(min(DUR - t0, dec * 3.2) * SR)
    if n <= 0: return
    t = np.arange(n) / SR
    env = np.exp(-t / dec * 2.2) * np.minimum(1, t / 0.003)
    x = (np.sin(2*np.pi*f*t) + 0.30*np.sin(2*np.pi*2*f*t)*np.exp(-t*3)
         + 0.10*np.sin(2*np.pi*3.0*f*t)*np.exp(-t*5) + 0.06*np.sin(2*np.pi*4.17*f*t)*np.exp(-t*9))
    x *= env * amp
    A[i0:i0+n] += x * (1 - pan); B[i0:i0+n] += x * (1 + pan)

def pad(t0, t1, freqs, amp=0.035, A=L, B=R, fade=0.9):
    i0 = int(t0 * SR); i1 = min(N, int(t1 * SR)); n = i1 - i0
    t = np.arange(n) / SR
    env = np.minimum(1, t / fade) * np.minimum(1, (n / SR - t) / fade)
    x = sum(np.sin(2*np.pi*f*t + k) + 0.22*np.sin(2*np.pi*2*f*t) for k, f in enumerate(freqs))
    x *= env * amp
    A[i0:i1] += x; B[i0:i1] += x * 0.9

# ---- 0~2.6초: 지금, 조용한 방 (낮은 화음만) ----
pad(0.0, 3.0, [hz('C3'), hz('G3'), hz('D4'), hz('E4')], 0.026, DL, DR, fade=0.7)

# ---- 2.58초: 녹음기 재생 버튼 "철컥" ----
def clunk(t0, amp=0.55):
    for dt, a, dec, lp in [(0.0, 1.0, 0.006, 3), (0.028, 0.55, 0.012, 6), (0.075, 0.25, 0.03, 10)]:
        i0 = int((t0 + dt) * SR); n = int(0.09 * SR); tt = np.arange(n) / SR
        x = rng.normal(0, 1, n) * np.exp(-tt / dec) * a * amp
        x = np.convolve(x, np.ones(lp) / lp, mode='same')
        x += np.sin(2*np.pi*95*tt) * np.exp(-tt / 0.03) * a * amp * 0.6   # 몸통 울림
        DL[i0:i0+n] += x; DR[i0:i0+n] += x * 0.95
clunk(2.58)

# ---- 브람스 자장가 (3/4박자, 한 박 0.793초 → 여덟째 마디 첫 음이 20.2초 몽타주 시작에 닿는다) ----
BEAT = 0.793; T0 = 2.75
mel = [('E5',.5),('E5',.5),
       ('G5',1.5),('E5',.5),('E5',1),   ('G5',2),('E5',.5),('G5',.5),
       ('C6',1),('B5',1.5),('A5',.5),   ('A5',1),('G5',1),('D5',.5),('E5',.5),
       ('F5',1),('D5',1),('D5',.5),('E5',.5), ('F5',2),('D5',.5),('F5',.5),
       ('B5',.5),('A5',.5),('G5',1),('B5',1), ('C6',3)]
t = T0
for nm, b in mel:
    mbox(t, hz(nm), 0.30, 1.3 + 0.3 * b, pan=-0.08); t += b * BEAT
mel_end = t
# 마디마다 화음: 첫 박 베이스 + 2·3박 화음 (C C F G G7 G7 G7 C)
bar1 = T0 + 1 * BEAT
chords = [('C3',['C4','E4','G4']),('C3',['C4','E4','G4']),('F2',['C4','F4','A4']),('G2',['B3','D4','G4']),
          ('G2',['B3','D4','F4']),('G2',['B3','D4','F4']),('G2',['B3','D4','F4']),('C3',['C4','E4','G4'])]
for k, (bass, ch) in enumerate(chords):
    tb = bar1 + k * 3 * BEAT
    mbox(tb, hz(bass), 0.15, 2.0, pan=0.1)
    for j, nm in enumerate(ch):
        mbox(tb + BEAT + j*0.05, hz(nm), 0.06, 1.0, pan=0.15)
        mbox(tb + 2*BEAT + j*0.05, hz(nm), 0.05, 1.0, pan=0.15)
    pad(tb, tb + 3*BEAT + 0.6, [hz(n) / 2 for n in ch], 0.03)
# 끝 화면(23초): 다장조 화음을 천천히 펼쳐 울리고 마무리
for j, nm in enumerate(['C5','E5','G5','C6','E6']):
    mbox(23.05 + j*0.12, hz(nm), 0.2, 2.6, pan=(-0.2 + j*0.1))
pad(mel_end - 0.3, DUR, [hz('C3'), hz('G3'), hz('E4')], 0.028)
print('melody ends', round(mel_end, 2), 'bar 8 at', round(bar1 + 7 * 3 * BEAT, 2))

# ---- 테이프 느낌: 느린 음 흔들림(wow) + 잔떨림(flutter) + 높은 소리 살짝 깎기 ----
tt = np.arange(N) / SR
delay = 0.0012 + 0.00068 * np.sin(2*np.pi*0.62*tt) + 0.000014 * np.sin(2*np.pi*6.3*tt)
src = np.clip(tt - delay, 0, None) * SR
L = np.interp(src, np.arange(N), L); R = np.interp(src, np.arange(N), R)
def lowpass(x, fc):   # 한 극 저역 통과 (scipy 없이)
    from itertools import accumulate
    a = np.exp(-2*np.pi*fc/SR)
    return np.array(list(accumulate(x, lambda p, v: a*p + (1-a)*v)))
L = lowpass(L, 6500); R = lowpass(R, 6500)
# 간단한 잔향
for d, g in [(0.061, 0.30), (0.113, 0.20), (0.171, 0.14), (0.29, 0.08)]:
    k = int(d * SR)
    L[k:] += L[:-k] * g * 0.6; R[k:] += R[:-k] * g * 0.6
# 테이프 쉬익: 재생 버튼 뒤로 올라오고, 앞쪽 방 공기는 아주 낮게
hiss = rng.normal(0, 1, N); hiss = np.convolve(hiss, np.ones(4)/4, mode='same')
henv = 0.0025 + 0.0065 * np.clip((tt - 2.6) / 0.25, 0, 1)
L += hiss * henv; R += np.roll(hiss, 13) * henv
L += DL; R += DR
fi = int(0.3 * SR); fo = int(1.4 * SR)
for ch in (L, R):
    ch[:fi] *= np.linspace(0, 1, fi); ch[-fo:] *= np.linspace(1, 0, fo)
m = max(np.abs(L).max(), np.abs(R).max()); L /= m / 0.89; R /= m / 0.89
st = np.stack([L, R], 1)
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype('<i2').tobytes())
print('music', out)
