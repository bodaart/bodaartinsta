// v5 원색판: 장면마다 노랑·파랑·빨강 배경, 굵은 검정 선과 검정 그림자, 흰색 포인트 (팝아트 인쇄 느낌)
const PY='#FFE100', PR='#FF3B30', PB='#0A6CFF', PK='#111111', PW='#FFFFFF', PG='#00C46A';
const THEME={
 Y:{BG:PY, INK:PK, DEEP:PB, ROSE:PR, SAND:PK, BEIGE:PW, IVORY:PW, F4:PY, TAUPE:PB, GREY:PK},
 B:{BG:PB, INK:PK, DEEP:PY, ROSE:PR, SAND:PK, BEIGE:PW, IVORY:PW, F4:PB, TAUPE:PY, GREY:PK},
 R:{BG:PR, INK:PK, DEEP:PW, ROSE:PY, SAND:PK, BEIGE:PW, IVORY:PW, F4:PR, TAUPE:PY, GREY:PK},
 W:{BG:PW, INK:PK, DEEP:PR, ROSE:PB, SAND:PK, BEIGE:PY, IVORY:PW, F4:PW, TAUPE:PB, GREY:PK},
};
let CUR='Y';
window.IRISC=PK; window.IRISR=PY; window.LEAK1=PW; window.LEAK2=PW; window.BGSTROKE=PK; window.BGOP=0.13;
window.CONF=[PR,PY,PB,PW,PK,PG];
function setTheme(k){ const th=THEME[k]; CUR=k;
  INK=th.INK; DEEP=th.DEEP; ROSE=th.ROSE; SAND=th.SAND; BEIGE=th.BEIGE; IVORY=th.IVORY; F4=th.F4; TAUPE=th.TAUPE; GREY=th.GREY;
  const st=document.getElementById('stage'); if(st) st.style.background=th.BG;
}
// 홀로그램을 원색 무지개로
HOLO.splice(0,HOLO.length,'#FF4FA3','#FFE100','#00C46A','#2AB3FF','#9B5CFF','#FF4FA3');
// 장면 순서별 배경: 첫 화면 노랑 → 파랑 → 빨강 → 노랑 → 파랑 → 빨강 → 끝 화면 흰색
const _render5=window.render;
window.render=function(t){
  const E=window.EP, order=E.themes||['Y','B','R','Y','B','R','W'];
  let si=0; for(const b of (E.beats||[])) if(t>=b) si++;
  setTheme(order[Math.min(si,order.length-1)]);
  _render5(t);
  const g=document.getElementById('grain'); g.style.opacity='0.28';
};
