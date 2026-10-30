// 케이스의 역사 #3 — 영상이 나오는 음반 (26초 내레이션판, 트렌디판용)
// 사실 근거: bodacd.co.kr/p/ssabari/ 영상음반 패키지 — "음반에서 영상을 볼 수 있습니다. 스피커와 조작 버튼, 배터리 내장, 충전까지". 크기·재생 시간·가격 숫자는 홈페이지에 없어 쓰지 않음.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];
function vbox(x,y,w,h,open,tw,o={}){ // 싸바리 상자 + 뚜껑 안쪽 화면. open 0~1
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="10" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="rgba(124,108,255,0.26)" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#dots)" opacity="0.5"/>`;
  // 바닥: CD 자리
  g+=cd(x+w*0.5,y+h*0.55,h*0.33,tw*2);
  // 뚜껑(안쪽에 화면) — 열리면서 위로 올라감
  const lh=h*0.85, lift=open;
  g+=`<g transform="translate(0,${(-lh*lift).toFixed(1)})" opacity="${(0.25+0.75*open).toFixed(2)}">`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${lh}" rx="8" fill="#15151C" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  const sx=x+w*0.08, sy=y+lh*0.1, sw=w*0.84, sh=lh*0.62;
  g+=`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="6" fill="${open>0.9?'url(#artg)':'#0A0A10'}" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  if(open>0.9){ g+=`<circle cx="${sx+sw/2}" cy="${sy+sh/2}" r="${sh*0.22}" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/><path d="M${sx+sw/2-sh*0.07} ${sy+sh/2-sh*0.1} L${sx+sw/2+sh*0.11} ${sy+sh/2} L${sx+sw/2-sh*0.07} ${sy+sh/2+sh*0.1} Z" fill="#FFFFFF"/>`;
    if(o.bars){ for(let i=0;i<14;i++){const a=Math.abs(Math.sin(i*0.9+tw*6)*Math.cos(i*0.37+tw*3)); g+=`<rect x="${sx+sw*0.1+i*sw*0.058}" y="${sy+sh*0.86-a*sh*0.12}" width="${sw*0.035}" height="${a*sh*0.12+2}" rx="2" fill="${DEEP}"/>`;} } }
  // 뚜껑 아래쪽: 스피커 구멍 + 버튼
  if(o.spk){ for(let r=0;r<2;r++) for(let c=0;c<7;c++) g+=`<circle cx="${sx+sw*0.1+c*sw*0.06}" cy="${sy+sh+lh*0.09+r*lh*0.07}" r="${w*0.012}" fill="${o.spkOn?DEEP:'rgba(255,255,255,0.45)'}"/>`; }
  if(o.btn){ ['◀','▶','■'].forEach((b,i)=>{ const bx=sx+sw*0.62+i*sw*0.13, by=sy+sh+lh*0.12; g+=`<circle cx="${bx}" cy="${by}" r="${w*0.038}" fill="${o.btnOn===i?DEEP:'rgba(255,255,255,0.12)'}" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/><text x="${bx}" y="${by+w*0.014}" font-size="${w*0.04}" font-weight="800" text-anchor="middle" fill="${o.btnOn===i?'#0A0A0A':INK}">${b}</text>`; }); }
  g+=`</g>`;
  return g;
}
function batt(x,y,w,p){ const h=w*0.46;
  let g=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.7)" stroke-width="3"/><rect x="${x+w}" y="${y+h*0.3}" width="${w*0.06}" height="${h*0.4}" rx="3" fill="rgba(255,255,255,0.7)"/>`;
  g+=`<rect x="${x+w*0.06}" y="${y+h*0.15}" width="${(w*0.88*p).toFixed(1)}" height="${h*0.7}" rx="5" fill="${DEEP}"/>`;
  g+=`<path d="M${x+w*0.52} ${y+h*0.1} L${x+w*0.4} ${y+h*0.55} L${x+w*0.5} ${y+h*0.55} L${x+w*0.44} ${y+h*0.95} L${x+w*0.62} ${y+h*0.42} L${x+w*0.52} ${y+h*0.42} Z" fill="#0A0A0A" opacity="0.7"/>`;
  return g;
}
function pillo(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,2.6],flash:[0.35],
 tag:'케이스의 역사  #3',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'케이스를 열면',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'영상',300,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-14}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'플레이어 없이',56,-9,400);
    if(t>=1.0) txt+=stamp(t,1.0,300,1200,ink(90,1180,'음반 케이스가',100,900)+ink(90,1310,'곧 플레이어예요',100,900));
    return {art,txt};
  }
  const bx=260,by=880,bw=560,bh=250;
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'열면',150,900,{mis:[9,7]})+ink(400,560,'화면',150,900,{fill:DEEP}));
    const o=out(pr(stp(u,12),0.4,1.6));
    art+=PDEFS+vbox(bx,by,bw,bh,o,tw,{bars:true});
    if(u>1.8) art+=sparkle(190,760,24)+sparkle(930,1120,22);
    txt+=cap(t,t0+0.3,['뚜껑 안쪽에 작은 화면.','음반에서 영상을 볼 수 있어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'스피커',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    art+=PDEFS+vbox(bx,by,bw,bh,1,tw,{bars:true,spk:true,spkOn:u>0.6});
    if(u>0.6){ for(let i=0;i<3;i++){ const r=40+i*40, op=cl(1-((u-0.6)*1.2+i*0.3)%1,0,1); art+=`<path d="M${bx-30} ${by-200-r*0.5} A${r} ${r} 0 0 0 ${bx-30} ${by-200+r*0.5}" fill="none" stroke="${DEEP}" stroke-width="5" stroke-linecap="round" opacity="${op.toFixed(2)}"/>`; } }
    if(u>1.2) art+=pillo(640,1150,'소리도 케이스에서',true);
    txt+=cap(t,t0+0.3,['스피커가 들어 있어서','따로 연결할 게 없어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'버튼',200,900,{mis:[9,7]}));
    const k=Math.floor(Math.max(0,u-0.5)/0.9)%3;
    art+=PDEFS+vbox(bx,by,bw,bh,1,tw,{bars:true,spk:true,btn:true,btnOn:u>0.5?k:-1});
    if(u>0.5) art+=pillo(640,1150,['이전','재생','멈춤'][k],true);
    txt+=cap(t,t0+0.3,['조작 버튼으로 바로 보고,','멈추고, 넘겨요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'배터리',150,900,{mis:[9,7]})+ink(520,560,'내장',150,900,{fill:DEEP}));
    const p=pr(stp(u,12),0.4,2.6);
    art+=PDEFS+vbox(bx,by,bw,bh,1,tw,{bars:true,spk:true,btn:true});
    art+=batt(110,1160,150,0.2+0.8*p);
    if(u>0.4) art+=`<path d="M${270} ${1190} C ${330} ${1190} ${330} ${1130} ${400} ${1130}" fill="none" stroke="${DEEP}" stroke-width="5" stroke-dasharray="10 10" stroke-dashoffset="${(-u*60).toFixed(0)}"/>`;
    if(u>2.6) art+=pillo(640,1150,'충전해서 써요',true);
    txt+=cap(t,t0+0.3,['배터리가 들어 있어','충전해서 다시 쓸 수 있어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'음반이자',120,900,{mis:[9,7]})+ink(540,560,'플레이어',120,900,{fill:DEEP}));
    const e=out(pr(stp(u,12),0.1,0.7));
    art+=PDEFS+`<g opacity="${e.toFixed(2)}" transform="translate(0,${((1-e)*60).toFixed(1)})">`+vbox(bx,by,bw,bh,1,tw,{bars:true,spk:true,btn:true})+`</g>`;
    if(u>0.8) art+=pillo(150,1150,'싸바리 상자',false)+pillo(420,1150,'+ 영상',true);
    if(u>1.4) art+=sparkle(190,760,24)+sparkle(930,1000,22);
    txt+=cap(t,t0+0.3,['단단한 싸바리 상자에 영상까지.','보다아트가 만드는 영상 음반이에요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'사라진 매체들','LD',tw),{ruler:false});
 }};
