# 릴스에 내레이션 입히기: 각 줄을 장면 시작에 맞춰 놓고, 목소리가 나올 때 음악을 자동으로 줄인 뒤 다시 인코딩
# 사용: python3 vomix.py <출력.mp4> <원본.mp4> <음성파일 접두사> <시작초 쉼표구분>
import sys, os, subprocess, json
out, src, pre = sys.argv[1], sys.argv[2], sys.argv[3]
spec = [x.split('@') for x in sys.argv[4].split(',')]   # 파일번호@시작초
idx = [int(a) for a, b in spec]; starts = [float(b) for a, b in spec]
W = os.path.join(os.path.dirname(out), 'vomix_tmp'); os.makedirs(W, exist_ok=True)
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]).decode().strip())
vdur = dur(src)
TRIM = 'silenceremove=start_periods=1:start_threshold=-45dB:stop_periods=-1:stop_threshold=-45dB:stop_duration=0.4,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse'
n = len(starts); ends = []
for i, st in enumerate(starts):
    f = f'{pre}{idx[i]}.wav'; t = f'{W}/trim{i}.wav'
    if i > 0 and st < ends[-1] + 0.2: st = ends[-1] + 0.2; starts[i] = st   # 앞 줄과 겹치지 않게 뒤로 민다
    subprocess.run(['ffmpeg','-v','error','-y','-i',f,'-af',TRIM,t], check=True)
    d = dur(t)
    slot = (starts[i+1] - st - 0.15) if i+1 < n else max(2.0, vdur + 1.5 - st)
    tempo = min(1.25, max(1.0, d/slot))
    ends.append(st + d/tempo)
    total = max(vdur, ends[-1]) + 0.5
    subprocess.run(['ffmpeg','-v','error','-y','-i',t,'-af',f'atempo={tempo:.3f},loudnorm=I=-16:TP=-1.5:LRA=7,aresample=48000,adelay={int(st*1000)}|{int(st*1000)}','-ac','2','-ar','48000',f'{W}/seg{i}.wav'], check=True)
    print(f'line {i}: start {st:.2f} spoken {d:.2f}s tempo {tempo:.2f} end {ends[-1]:.2f}')
total = max(vdur, max(ends) + 0.3)
total = round(total * 2 + 0.499) / 2  # 0.5초 단위로 올림
ins = sum([['-i', f'{W}/seg{i}.wav'] for i in range(n)], [])
subprocess.run(['ffmpeg','-v','error','-y',*ins,'-filter_complex',f'amix=inputs={n}:normalize=0:duration=longest,apad=whole_dur={total}','-ar','48000',f'{W}/voice.wav'], check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-i',f'{W}/voice.wav','-filter_complex',
  f'[0:a]apad=whole_dur={total},aresample=48000[m];[m][1:a]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=500:makeup=1[md];[md][1:a]amix=inputs=2:normalize=0:duration=longest,loudnorm=I=-14:TP=-1.5:LRA=11[out]',
  '-map','[out]','-ar','48000',f'{W}/mix.wav'], check=True)
pad = max(0.0, total - vdur)
vf = f'[0:v]tpad=stop_mode=clone:stop_duration={pad:.3f}[v]' if pad > 0.01 else '[0:v]copy[v]'
subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-i',f'{W}/mix.wav','-filter_complex',vf,'-map','[v]','-map','1:a','-c:v','libx264','-crf','19','-preset','slow','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-ar','44100','-t',f'{total}','-movflags','+faststart',out], check=True)
print('done', out, 'length', total)
