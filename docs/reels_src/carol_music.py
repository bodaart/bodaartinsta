# 캐럴 편 음악: 저작권이 끝난 "고요한 밤 거룩한 밤"(1818) 앞 16마디를 오르골 소리로 + 낮은 패드 + LP 잡음
# 사용: python3 carol_music.py <출력.wav> [길이초=26]
import sys, numpy as np, wave
out = sys.argv[1]; DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 26.0
SR = 48000; N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)

def hz(name):
    names = {'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}
    n = names[name[0]]; o = int(name[-1])
    return 440.0 * 2 ** ((n + 12 * (o + 1) - 69) / 12)

def mbox(t0, f, amp=0.30, dec=1.6, pan=0.0):
    i0 = int(t0 * SR); n = int(min(DUR - t0, dec * 3.2) * SR)
    if n <= 0: return
    t = np.arange(n) / SR
    env = np.exp(-t / dec * 2.2) * np.minimum(1, t / 0.003)
    x = (np.sin(2*np.pi*f*t) + 0.32*np.sin(2*np.pi*2*f*t)*np.exp(-t*3)
         + 0.10*np.sin(2*np.pi*3.0*f*t)*np.exp(-t*5) + 0.07*np.sin(2*np.pi*4.17*f*t)*np.exp(-t*9))
    x *= env * amp
    L[i0:i0+n] += x * (1 - pan) ; R[i0:i0+n] += x * (1 + pan)

def pad(t0, t1, freqs, amp=0.035):
    i0 = int(t0 * SR); i1 = min(N, int(t1 * SR)); n = i1 - i0
    t = np.arange(n) / SR
    env = np.minimum(1, t / 0.9) * np.minimum(1, (n / SR - t) / 0.9)
    x = sum(np.sin(2*np.pi*f*t + k) + 0.25*np.sin(2*np.pi*2*f*t) for k, f in enumerate(freqs))
    x *= env * amp
    L[i0:i1] += x; R[i0:i1] += x * 0.9

BEAT = 0.5; T0 = 0.3
mel = [('G5',1.5),('A5',.5),('G5',1),('E5',3), ('G5',1.5),('A5',.5),('G5',1),('E5',3),
       ('D6',2),('D6',1),('B5',3), ('C6',2),('C6',1),('G5',3),
       ('A5',2),('A5',1),('C6',1.5),('B5',.5),('A5',1), ('G5',1.5),('A5',.5),('G5',1),('E5',3),
       ('A5',2),('A5',1),('C6',1.5),('B5',.5),('A5',1), ('G5',1.5),('A5',.5),('G5',1),('E5',3)]
t = T0
for nm, b in mel:
    mbox(t, hz(nm), 0.30, 1.4 + 0.25 * b, pan=-0.08); t += b * BEAT
mel_end = t
# 두 마디마다 화음 (C C G C F C F C), 첫 박 베이스 + 2·3박 화음 오르골
chords = [('C3',['C4','E4','G4']),('C3',['C4','E4','G4']),('G2',['B3','D4','G4']),('C3',['C4','E4','G4']),
          ('F2',['C4','F4','A4']),('C3',['C4','E4','G4']),('F2',['C4','F4','A4']),('C3',['C4','E4','G4'])]
for k, (bass, ch) in enumerate(chords):
    for bar in range(2):
        tb = T0 + (k*2 + bar) * 3 * BEAT
        mbox(tb, hz(bass), 0.16, 1.8, pan=0.1)
        for j, nm in enumerate(ch):
            mbox(tb + BEAT + j*0.04, hz(nm), 0.07, 1.0, pan=0.15)
            mbox(tb + 2*BEAT + j*0.04, hz(nm), 0.06, 1.0, pan=0.15)
    pad(T0 + k*3, T0 + (k+1)*3 + 0.6, [hz(n) / 2 for n in ch])
# 끝: 다장조 화음을 펼쳐서 울리고 마무리
for j, nm in enumerate(['C5','E5','G5','C6','E6']):
    mbox(mel_end + j*0.09, hz(nm), 0.22, 2.4, pan=(-0.2 + j*0.1))
pad(mel_end, DUR, [hz('C3'), hz('G3'), hz('E4')], 0.03)
# 2.58초 필름 카메라 셔터 "찰칵"(지금 → 그 시절로 넘어가는 순간)
def shutter(t0, amp=0.5):
    for dt, a, dec in [(0.0, 1.0, 0.004), (0.045, 0.7, 0.006), (0.11, 0.35, 0.02)]:
        i0 = int((t0 + dt) * SR); n = int(0.06 * SR); tt = np.arange(n) / SR
        x = rng.normal(0, 1, n) * np.exp(-tt / dec) * a * amp
        x = np.convolve(x, [0.5, 0.3, 0.2], mode='same')
        L[i0:i0+n] += x; R[i0:i0+n] += x
shutter(2.58)
# 간단한 잔향(겹친 메아리)
for d, g in [(0.061, 0.32), (0.113, 0.22), (0.171, 0.15), (0.29, 0.09)]:
    k = int(d * SR)
    L[k:] += L[:-k] * g * 0.6; R[k:] += R[:-k] * g * 0.6
# LP 잡음: 낮은 쉬익 소리 + 가끔 톡 튀는 소리
hiss = rng.normal(0, 1, N); hiss = np.convolve(hiss, np.ones(6)/6, mode='same') * 0.006
clicks = np.zeros(N)
for _ in range(int(DUR * 7)):
    i = rng.integers(0, N - 40); clicks[i:i+30] += rng.normal(0, 1, 30) * np.exp(-np.arange(30)/5) * rng.uniform(0.02, 0.09)
L += hiss + clicks; R += hiss * 0.95 + np.roll(clicks, 7)
# 처음·끝 페이드
fi = int(0.25 * SR); fo = int(1.4 * SR)
for ch in (L, R):
    ch[:fi] *= np.linspace(0, 1, fi); ch[-fo:] *= np.linspace(1, 0, fo)
m = max(np.abs(L).max(), np.abs(R).max()); L /= m / 0.89; R /= m / 0.89
st = np.stack([L, R], 1)
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((st * 32767).astype('<i2').tobytes())
print('music', out, 'melody ends', round(mel_end, 2))
