// 보다아트 포트폴리오 모션그래픽 #2 USB 앨범 편 — mg1.js 를 복사해 사진(IM)·글자·배치만 바꿈. 사진은 mg2/
// 100 BPM: 박 0.6초, 마디 2.4초. 장면은 마디 단위로 바뀐다.
const SAND='#D9C6B2', IVORY='#F7F2EB', ROSE='#C4877C', DEEP='#9A5A51', FPS=30;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const pr=(t,a,b)=>cl((t-a)/(b-a),0,1);
const oe=p=>p>=1?1:1-Math.pow(2,-10*p);               // out expo
const oc=p=>1-Math.pow(1-p,3);                          // out cubic
const io=p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;        // in-out cubic
const ob=p=>{const c=1.5;return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2)}; // out back
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const BAR=2.4, B=0.6;
const S={A:2.4,B:7.2,C:12.0,M:16.8,E:19.2,END:24.0};
const IM={a1:[1200,540],a2:[1200,540],b1:[1500,845],b2:[1500,845],c1:[1200,540],c2:[1200,540],m1:[1500,845],m2:[1200,676],m3:[1200,676],m4:[1200,676]};
const DIR='mg2';
function st(o){return Object.entries(o).map(([k,v])=>`${k}:${v}`).join(';')}
function bg(k,sc,dx,dy,op){return `<img class="bg" src="${DIR}/${k}_bg.jpg" style="transform:translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px) scale(${sc.toFixed(3)});opacity:${op.toFixed(2)}">`}
// 3D 카드. x,y 좌상단, w 너비(높이는 비율), ry/rx 회전(도), s 크기, op 불투명, gl 빛 반사 위치(0~1, 없으면 안 그림)
function card(k,x,y,w,ry,rx,s,op,gl){const [iw,ih]=IM[k], h=Math.round(w*ih/iw);
  const g=gl===undefined?'':`<div class="gl" style="transform:translateX(${((gl-0.5)*2*w*1.6).toFixed(0)}px)"></div>`;
  return `<div class="card" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${s.toFixed(3)});opacity:${op.toFixed(2)}"><img src="${DIR}/${k}.jpg">${g}</div>`}
// 키네틱 타이포: 아래서 가림막 속으로 올라오고, 자간이 조여진다
function kt(x,y,str,size,wt,color,t,t0,o={}){ if(t<t0) return ''; const p=oe(pr(t,t0,t0+(o.d||0.6)));
  const ls=(o.ls!==undefined?o.ls:-0.03)*size + (1-p)*size*0.12, dy=(1-p)*115, op=cl(p*3,0,1);
  const exitP=o.exit!==undefined&&t>o.exit?oc(pr(t,o.exit,o.exit+0.3)):0; const ey=-exitP*110, eop=1-exitP;
  return `<div class="mask" style="left:${x}px;top:${y}px;height:${Math.round(size*1.28)}px;line-height:${Math.round(size*1.28)}px;font-size:${size}px;font-weight:${wt};color:${color};opacity:${eop.toFixed(2)};width:${1080-x}px;${o.anchor==='middle'?'width:1080px;left:0;text-align:center;':''}${o.anchor==='end'?`width:${x}px;left:0;text-align:right;`:''}"><div style="transform:translateY(${(dy+ey).toFixed(1)}%);letter-spacing:${ls.toFixed(1)}px;opacity:${op.toFixed(2)}">${esc(str)}</div></div>`}
// 글자 하나씩 튀어오르는 큰 제목
function kchars(x,y,str,size,wt,color,t,t0,o={}){ if(t<t0) return ''; let g='', cx=x; const gap=o.gap||0.055;
  const exitP=o.exit!==undefined&&t>o.exit?oc(pr(t,o.exit,o.exit+0.3)):0;
  const chars=[...str]; const widths=chars.map(ch=>ch===' '?size*0.3:(/[A-Za-z0-9]/.test(ch)?lw(ch,size,wt):size*(o.cw||0.98)));
  const total=widths.reduce((a,b)=>a+b,0); if(o.anchor==='middle') cx=540-total/2;
  chars.forEach((ch,i)=>{ const p=oe(pr(t,t0+i*gap,t0+i*gap+0.55)); const dy=(1-p)*size*0.9 - exitP*size*0.8, rot=(1-p)*8*(i%2?1:-1), op=cl(p*2.5,0,1)*(1-exitP);
    g+=`<div style="left:${cx.toFixed(1)}px;top:${(size*0.25).toFixed(0)}px;font-size:${size}px;font-weight:${wt};color:${color};line-height:1;transform:translateY(${dy.toFixed(1)}px) rotate(${rot.toFixed(2)}deg);opacity:${op.toFixed(2)};letter-spacing:0">${esc(ch)}</div>`; cx+=widths[i]; });
  return `<div class="cmask" style="left:0;top:${y-size*0.25}px;width:1080px;height:${size*1.5}px">`+g+`</div>`}
// 영문·숫자는 실제 글자 폭으로(USB 같은 글자가 한글 폭으로 벌어지지 않게)
const _cv=document.createElement('canvas').getContext('2d');
function lw(ch,size,wt){ _cv.font=`${wt} ${size}px P`; return _cv.measureText(ch).width+size*0.02; }
function sweep(t,t0,d){ if(t<t0||t>t0+d) return ''; const p=io(pr(t,t0,t0+d)); return `<div class="sweep" style="transform:translateX(${(-500+p*2000).toFixed(0)}px) rotate(-20deg)"></div>`}
function flash(t,t0,a){ if(t<t0) return ''; const o=a*Math.max(0,1-(t-t0)/0.18); return o<=0?'':`<div class="flash" style="opacity:${o.toFixed(2)}"></div>`}
function pill(x,y,str,t,t0,fill,color){ if(t<t0) return ''; const p=ob(pr(t,t0,t0+0.5)); return `<div class="pill" style="left:${x}px;top:${y}px;background:${fill};color:${color};transform:scale(${p.toFixed(3)});transform-origin:left center;opacity:${cl(p*2,0,1).toFixed(2)}">${esc(str)}</div>`}
function rule(x,y,w,t,t0){ if(t<t0) return ''; const p=oe(pr(t,t0,t0+0.6)); return `<div class="rule" style="left:${x}px;top:${y}px;width:${(w*p).toFixed(0)}px"></div>`}
// 세로 띠로 쪼개져 올라오며 나타나는 사진
function strips(k,x,y,w,h,n,t,t0){ let g=''; for(let i=0;i<n;i++){ const p=oe(pr(t,t0+i*0.07,t0+i*0.07+0.75)); const sw=w/n;
  g+=`<div class="strip" style="left:${(x+i*sw).toFixed(1)}px;top:${y}px;width:${(sw+1).toFixed(1)}px;height:${h}px"><div style="background-image:url(${DIR}/${k}.jpg);width:${w}px;height:${h}px;left:${(-i*sw).toFixed(1)}px;transform:translateY(${((1-p)*h).toFixed(1)}px)"></div></div>`; }
  return `<div style="left:0;top:0;width:1080px;height:1920px;box-shadow:none"><div style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;box-shadow:0 60px 120px rgba(0,0,0,.6);border-radius:12px"></div>${g}</div>`}
function zoom(inner,s,ox,oy){return `<div style="left:0;top:0;width:1080px;height:1920px;transform:scale(${s.toFixed(4)});transform-origin:${ox}px ${oy}px">${inner}</div>`}

function scene(t){ let h='';
  if(t<S.A){ const u=t; // 훅
    h+=`<div class="glow" style="left:${(-300+u*40).toFixed(0)}px;top:${(200+u*30).toFixed(0)}px"></div><div class="glow" style="left:${(200-u*30).toFixed(0)}px;top:${(900).toFixed(0)}px;opacity:.6"></div>`;
    h+=kt(0,300,'보다아트 포트폴리오  ·  둘',36,600,SAND,t,0.15,{anchor:'middle',ls:0.12,exit:2.05});
    h+=rule(470,372,140,t,0.3);
    h+=kchars(0,700,'음악을 담은',120,800,IVORY,t,0.08,{anchor:'middle',exit:2.05});
    h+=kchars(0,860,'USB 앨범',210,900,SAND,t,0.5,{anchor:'middle',cw:1.0,exit:2.05});
    h+=sweep(t,1.2,0.7);
    h+=kt(0,1180,'실제 제작 사례로 보는 보다아트',40,600,'rgba(247,242,235,.75)',t,1.3,{anchor:'middle',ls:0,exit:2.05});
    h+=flash(t,0.08,0.5);
    return h;
  }
  if(t<S.B){ const u=t-S.A; // A: 이찬원 찬스타임 콘서트 실황 영상 USB
    const e=oe(pr(u,0,0.9)), kb=1+u*0.012;
    h+=bg('a1',1.12*kb,-u*5,0,1);
    let a1x=90+(1-e)*1100, a1ry=-6+(1-e)*42, a1s=0.9+0.1*e, a1y=600;
    let a1op=1, a2='';
    if(u>=BAR){ const f=oe(pr(u,BAR,BAR+0.9)); a1x-=f*40; a1y-=f*230; a1s*=1-0.1*f; a1op=1-0.3*f; a1ry-=f*6;
      a2=card('a2',170+(1-f)*700,840+(1-f)*500,800,8-(1-f)*40,0,0.92+0.08*f,1,0.3+0.7*cl((u-BAR-0.3)/1.2,0,1)); }
    const glp=cl((u-0.4)/1.4,0,1);
    h+=`<div class="p3">${card('a1',a1x,a1y,900,a1ry,0,a1s*(1+u*0.008),a1op,glp)}${a2}</div>`;
    h+=sweep(t,S.A+0.75,0.6);
    h+=rule(90,1470,80,t,S.A+0.85);
    h+=kt(90,1500,'이찬원 · 찬스타임',72,800,IVORY,t,S.A+0.95);
    h+=kt(90,1600,'콘서트 실황 영상 USB 패키지',42,600,SAND,t,S.A+1.1,{ls:0});
    h+=pill(90,1690,'포토북까지 한 상자에',t,S.A+BAR+0.6,'rgba(217,198,178,.16)',SAND);
    h+=flash(t,S.A,0.35);
    return h;
  }
  if(t<S.C){ const u=t-S.B; // B: UV 매대형 USB 앨범
    h+=bg('b1',1.1+u*0.01,u*4,-u*3,1);
    const bw=960,bh=541, bx=60, by=470+ (u>=BAR? -oe(pr(u,BAR,BAR+0.9))*90:0);
    let inner=strips('b1',bx,by,bw,bh,5,t,S.B+0.05);
    let b2='';
    if(u>=BAR){ const f=oe(pr(u,BAR,BAR+0.9)); b2=`<div class="p3">${card('b2',430,900,560,-10+(1-f)*30,(1-f)*80,0.85+0.15*f,f,cl((u-BAR-0.2)/1.0,0,1))}</div>`; }
    h+=zoom(inner,1+0.02*(1-oe(pr(u,0,1))),540,740)+b2;
    h+=sweep(t,S.B+0.9,0.6);
    h+=rule(90,1470,80,t,S.B+0.9);
    h+=kt(90,1500,'UV · 매대형 USB 앨범',72,800,IVORY,t,S.B+1.0);
    h+=kt(90,1600,'매대에 걸어 파는 블리스터 패키지',42,600,SAND,t,S.B+1.15,{ls:0});
    h+=pill(90,1690,'열면 자켓과 USB가 따로',t,S.B+BAR+0.7,'rgba(217,198,178,.16)',SAND);
    h+=flash(t,S.B,0.45);
    return h;
  }
  if(t<S.M){ const u=t-S.C; // C: 송대관 슬라이드 카드 USB
    h+=bg('c1',1.12,-u*4,u*2,1);
    const e=oe(pr(u,0,0.9));
    let c1x=90-(1-e)*1000, c1y=620, c1ry=-8+(1-e)*(-40), c1s=0.9+0.1*e, c1op=1, c2='';
    if(u>=BAR){ const f=oe(pr(u,BAR,BAR+1.0)); c1y-=f*250; c1s*=1-0.1*f; c1op=1-0.35*f;
      c2=card('c2',140,830+(1-f)*900,800,(1-f)*-20,(1-f)*25,0.9+0.1*f,1,cl((u-BAR-0.4)/1.2,0,1)); }
    h+=`<div class="p3">${card('c1',c1x,c1y,900,c1ry,0,c1s*(1+u*0.008),c1op,cl((u-0.5)/1.3,0,1))}${c2}</div>`;
    h+=sweep(t,S.C+0.8,0.6);
    h+=rule(90,1470,80,t,S.C+0.85);
    h+=kt(90,1500,'송대관 · 카드 USB',72,800,IVORY,t,S.C+0.95,{exit:S.C+BAR+0.2});
    h+=kt(90,1600,'슬라이드형 카드 USB',42,600,SAND,t,S.C+1.1,{ls:0,exit:S.C+BAR+0.2});
    h+=kt(90,1500,'칩만 쏙 빼서 꽂는다',64,800,IVORY,t,S.C+BAR+0.9);
    h+=kt(90,1600,'어떤 차에서도 편하게 들을 수 있게',42,600,SAND,t,S.C+BAR+1.05,{ls:0});
    h+=flash(t,S.C,0.45);
    return zoom(h,1+0.18*(1-oe(pr(u,0,0.55))),540,960);
  }
  if(t<S.E){ const u=t-S.M; // 몽타주: 박마다 한 장
    const i=Math.min(3,Math.floor(u/B)), k=['m1','m2','m3','m4'][i], v=u-i*B, lab=['카드 USB 블리스터 케이스','자석 싸바리 USB 상자','포천시립합창단 · 카드 USB 케이스','서랍형 카드 USB 케이스'][i];
    const [iw,ih]=IM[k]; const w=k==='m1'?960:900, hh=Math.round(w*ih/iw);
    h+=bg(k,1.15,0,0,1);
    const s=1.22-0.22*oe(pr(v,0,0.5));
    h+=zoom(`<div class="p3">${card(k,540-w/2,900-hh/2,w,(i%2?1:-1)*(5-3*oe(pr(v,0,0.6))),0,1,1,cl(v/0.6,0,1))}</div>`,s,540,900);
    h+=kt(0,1560,lab,48,700,IVORY,t,S.M+i*B+0.05,{anchor:'middle',ls:0,d:0.35});
    h+=`<div style="left:${(540-4*26+8)}px;top:1660px;width:220px;height:10px">${[0,1,2,3].map(j=>`<div style="left:${j*52}px;top:0;width:36px;height:6px;border-radius:3px;background:${j<=i?SAND:'rgba(255,255,255,.25)'}"></div>`).join('')}</div>`;
    h+=flash(t,S.M+i*B,0.55);
    return h;
  }
  { const u=t-S.E; // 엔드카드
    h+=`<div class="glow" style="left:${(-200+u*20).toFixed(0)}px;top:${(500).toFixed(0)}px"></div><div class="glow" style="left:${(300).toFixed(0)}px;top:${(1100-u*20).toFixed(0)}px;opacity:.5"></div>`;
    h+=kchars(0,640,'USB 앨범도',110,700,IVORY,t,S.E+0.1,{anchor:'middle'});
    h+=kchars(0,790,'보다아트',210,900,SAND,t,S.E+0.5,{anchor:'middle',cw:1.0});
    h+=sweep(t,S.E+1.0,0.7);
    h+=rule(470,1080,140,t,S.E+1.2);
    h+=kt(0,1120,'스틱형·카드형 USB, 케이스까지',48,600,IVORY,t,S.E+1.35,{anchor:'middle',ls:0});
    h+=kt(0,1200,'음원·영상을 담고, 디자인부터 제작까지',36,500,'rgba(247,242,235,.7)',t,S.E+1.5,{anchor:'middle',ls:0});
    h+=pill(386,1330,'bodacd.co.kr',t,S.E+2.0,SAND,'#1A1612');
    h+=kt(0,1430,'프로필 링크로 문의',34,500,'rgba(247,242,235,.6)',t,S.E+2.2,{anchor:'middle',ls:0});
    h+=flash(t,S.E,0.5);
    return h;
  }
}
window.render=function(t){ const f=Math.floor(t*FPS);
  const stage=document.getElementById('stage');
  stage.innerHTML=scene(t)+`<div class="vig"></div><div id="grain" style="background-image:url(grain${f%3}.png)"></div>`;
};
window.EP={dur:S.END};
(async()=>{ const keys=Object.keys(IM); await Promise.all([...keys.map(k=>`${DIR}/${k}.jpg`),...keys.map(k=>`${DIR}/${k}_bg.jpg`)].map(s=>new Promise(r=>{const im=new Image();im.onload=r;im.onerror=r;im.src=s;}))); window.ready=true; })();
