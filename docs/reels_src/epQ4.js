// 70년대생 #1 — 라디오 녹음하던 밤 (26초 내레이션판, 트렌디판용, 세대 감성)
// 소재: 공테이프(60분·90분), 녹음+재생 버튼 동시 누르기, 노래 끝에 들어오던 DJ 멘트, 마이마이·워크맨, 늘어진 테이프를 연필로 감기. 연도·가격 숫자는 안 씀.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];
function pillq(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function cassette(x,y,w,rot,spin,o={}){ // 카세트테이프
  const h=w*0.63, cx=x+w/2, cy=y+h/2;
  let g=`<g transform="rotate(${rot||0} ${cx} ${cy})">`;
  g+=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="${w*0.04}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w*0.04}" fill="${o.body||'#15151C'}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.06}" y="${y+h*0.08}" width="${w*0.88}" height="${h*0.5}" rx="${w*0.02}" fill="${o.label||'rgba(255,255,255,0.12)'}" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  if(o.title) g+=`<text x="${cx}" y="${y+h*0.24}" font-size="${w*0.07}" font-weight="800" text-anchor="middle" fill="${INK}" letter-spacing="-0.5">${esc(o.title)}</text>`;
  // 창 + 릴
  g+=`<rect x="${x+w*0.22}" y="${y+h*0.3}" width="${w*0.56}" height="${h*0.3}" rx="${h*0.15}" fill="#0A0A10" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`;
  const rl=o.left===undefined?0.5:o.left; // 왼쪽 릴에 감긴 양
  [[x+w*0.34,rl],[x+w*0.66,1-rl]].forEach(([rx,am],i)=>{
    g+=`<circle cx="${rx}" cy="${cy}" r="${h*0.1+h*0.09*am}" fill="#2A2420"/>`;
    g+=`<circle cx="${rx}" cy="${cy}" r="${h*0.09}" fill="#0A0A10" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
    for(let k=0;k<6;k++){const a=(spin||0)+k*Math.PI/3; g+=`<line x1="${rx+h*0.03*Math.cos(a)}" y1="${cy+h*0.03*Math.sin(a)}" x2="${rx+h*0.085*Math.cos(a)}" y2="${cy+h*0.085*Math.sin(a)}" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;}
  });
  g+=`<path d="M${x+w*0.1} ${y+h} L${x+w*0.16} ${y+h*0.82} L${x+w*0.84} ${y+h*0.82} L${x+w*0.9} ${y+h}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>`;
  g+=`<circle cx="${x+w*0.3}" cy="${y+h*0.9}" r="${h*0.03}" fill="rgba(255,255,255,0.4)"/><circle cx="${x+w*0.7}" cy="${y+h*0.9}" r="${h*0.03}" fill="rgba(255,255,255,0.4)"/>`;
  g+=`</g>`; return g;
}
function radio(x,y,w,tw,o={}){ // 라디오 카세트
  const h=w*0.58;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="18" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#1B1B24" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<circle cx="${x+w*0.2}" cy="${y+h*0.5}" r="${h*0.3}" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/><circle cx="${x+w*0.2}" cy="${y+h*0.5}" r="${h*0.3}" fill="url(#dots)" opacity="0.6"/>`;
  g+=`<rect x="${x+w*0.42}" y="${y+h*0.14}" width="${w*0.5}" height="${h*0.22}" rx="6" fill="#0A0A10" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>`;
  for(let i=0;i<9;i++) g+=`<line x1="${x+w*0.45+i*w*0.055}" y1="${y+h*0.18}" x2="${x+w*0.45+i*w*0.055}" y2="${y+h*0.3}" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>`;
  g+=`<line x1="${x+w*0.45+((o.dial===undefined?0.5:o.dial)*w*0.44)}" y1="${y+h*0.15}" x2="${x+w*0.45+((o.dial===undefined?0.5:o.dial)*w*0.44)}" y2="${y+h*0.35}" stroke="${DEEP}" stroke-width="4"/>`;
  g+=`<rect x="${x+w*0.44}" y="${y+h*0.44}" width="${w*0.46}" height="${h*0.28}" rx="6" fill="#0A0A10" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`;
  ['REC','PLAY','STOP','FF'].forEach((b,i)=>{ const bx=x+w*0.44+w*0.02+i*w*0.11, on=o.press&&o.press.includes(i); g+=`<rect x="${bx}" y="${y+h*0.78}" width="${w*0.09}" height="${h*0.13}" rx="4" fill="${on?DEEP:'rgba(255,255,255,0.14)'}" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/><text x="${bx+w*0.045}" y="${y+h*0.875}" font-size="${w*0.028}" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}">${b}</text>`; });
  g+=`<line x1="${x+w*0.85}" y1="${y}" x2="${x+w*0.98}" y2="${y-h*0.55}" stroke="rgba(255,255,255,0.6)" stroke-width="4" stroke-linecap="round"/>`;
  return g;
}
function walkman(x,y,w,tw){ const h=w*0.68;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="14" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#2A2A36" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.1}" y="${y+h*0.14}" width="${w*0.8}" height="${h*0.5}" rx="8" fill="#0A0A10" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`;
  g+=cassette(x+w*0.16,y+h*0.19,w*0.68,0,tw*8,{left:0.4,body:'#15151C'});
  g+=`<rect x="${x+w*0.1}" y="${y+h*0.74}" width="${w*0.8}" height="${h*0.14}" rx="7" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  // 헤드폰 선 + 헤드폰
  g+=`<path d="M${x+w*0.92} ${y+h*0.3} C ${x+w*1.25} ${y+h*0.1} ${x+w*1.2} ${y-h*0.6} ${x+w*0.95} ${y-h*0.7}" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="4"/>`;
  g+=`<path d="M${x+w*0.6} ${y-h*0.55} A${w*0.3} ${w*0.3} 0 0 1 ${x+w*1.2} ${y-h*0.55}" fill="none" stroke="${DEEP}" stroke-width="10" stroke-linecap="round"/>`;
  g+=`<rect x="${x+w*0.53}" y="${y-h*0.62}" width="${w*0.14}" height="${h*0.3}" rx="8" fill="${DEEP}"/><rect x="${x+w*1.13}" y="${y-h*0.62}" width="${w*0.14}" height="${h*0.3}" rx="8" fill="${DEEP}"/>`;
  return g;
}
function pencil(x,y,len,rot){ return `<g transform="rotate(${rot} ${x} ${y})"><rect x="${x}" y="${y-12}" width="${len}" height="24" rx="4" fill="#F2C94C" stroke="#2B2320" stroke-width="2"/><path d="M${x+len} ${y-12} L${x+len+30} ${y} L${x+len} ${y+12} Z" fill="#E8D5B5" stroke="#2B2320" stroke-width="2"/><rect x="${x-20}" y="${y-12}" width="20" height="24" rx="4" fill="${ROSE}" stroke="#2B2320" stroke-width="2"/></g>`; }
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,7.0],flash:[0.35],
 tag:'70년대생  #1',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'공테이프 하나 넣고',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'녹음',300,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-14}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'70년대생',56,-9,330);
    if(t>=1.0) txt+=stamp(t,1.0,300,1140,ink(90,1180,'라디오 앞에서',100,900)+ink(90,1310,'밤을 새우던 날',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'공테이프',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.7));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}" transform="translate(0,${((1-e1)*60).toFixed(1)})">`+cassette(230,760,620,-4,tw*5,{left:0.9,title:'공테이프 · 육십 분'})+`</g>`;
    if(u>1.2) art+=pillq(130,1140,'육십 분',true)+pillq(360,1140,'구십 분',false);
    if(u>2.0) art+=pillq(620,1140,'녹음 + 재생 꾹',true);
    txt+=cap(t,t0+0.3,['문방구에서 산 공테이프 하나.','녹음 버튼과 재생 버튼을 같이 꾹.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'DJ 멘트',200,900,{mis:[9,7]}));
    art+=PDEFS+radio(150,820,620,tw,{dial:0.35+0.1*Math.sin(tw*2),press:u<2.6?[0,1]:[2]});
    if(u>0.3&&u<2.6) art+=`<g opacity="0.9">`+wave(400,760,500,70,tw*7)+`</g>`;
    if(u>2.2){ const e=out(pr(stp(u,12),2.2,2.7)); art+=`<g opacity="${e.toFixed(2)}" transform="translate(${((1-e)*40).toFixed(1)},0)"><rect x="560" y="640" width="440" height="110" rx="24" fill="${DEEP}"/><path d="M620 750 L600 790 L670 750 Z" fill="${DEEP}"/><text x="780" y="708" font-size="40" font-weight="900" text-anchor="middle" fill="#0A0A0A">"다음 곡은요~"</text></g>`; }
    if(u>3.0) art+=pillq(620,1140,'아… 또 들어갔네',true);
    txt+=cap(t,t0+0.3,['노래 끝나기 직전에 DJ 멘트.','아, 또 처음부터 다시.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'마이마이',130,900,{mis:[9,7]})+ink(620,560,'워크맨',130,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.7));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}" transform="translate(0,${((1-e1)*60).toFixed(1)})">`+walkman(300,900,420,tw)+`</g>`;
    for(let i=0;i<5;i++){ if(u>0.8+i*0.25) art+=note(150+i*40+(i%2)*640,780-(i%3)*60,56,i%2?DEEP:'rgba(255,255,255,0.8)'); }
    if(u>1.6) art+=pillq(120,1140,'등하굣길이 콘서트',true);
    txt+=cap(t,t0+0.3,['작은 헤드폰 하나면','등하굣길이 콘서트장이었죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'늘어진',150,900,{mis:[9,7]})+ink(520,560,'테이프',150,900,{fill:DEEP}));
    const p=pr(stp(u,12),0.6,3.2);
    art+=PDEFS+cassette(230,860,520,0,tw*3*(1-p)+p*tw*9,{left:0.3+0.5*p});
    // 풀린 테이프 곡선
    const loose=1-p;
    art+=`<path d="M470 1020 C ${420-loose*120} ${1120+loose*80} ${300-loose*60} ${1050+loose*120} ${180+loose*40} ${1150+loose*60}" fill="none" stroke="#2A2420" stroke-width="5" opacity="${(0.2+0.8*loose).toFixed(2)}"/>`;
    art+=pencil(620,1190,170,-25+p*300);
    if(u>3.0) art+=pillq(120,1140,'연필로 감았죠',true);
    txt+=cap(t,t0+0.3,['늘어진 테이프는 연필로 감고,','그렇게 아껴 듣던 노래들.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'그때 그 음반',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.6,1.1));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+cassette(110,800,300,-8,tw*4,{left:0.5})+`</g>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+cd(600,930,120,tw*2)+pusb(740,1030,220,-8)+`</g>`;
    if(u>1.0) art+=`<text x="470" y="960" font-size="70" font-weight="900" text-anchor="middle" fill="${DEEP}">→</text>`;
    if(u>1.4) art+=pillq(120,1140,'환갑 기념',true)+pillq(360,1140,'동창회',false)+pillq(560,1140,'부모님께',false);
    txt+=cap(t,t0+0.3,['그 시절 노래, 지금은 CD·USB 음반으로.','보다아트가 만들어 드려요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'80년대생 편','공CD 굽던 밤',tw),{ruler:false});
 }};
