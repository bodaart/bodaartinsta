// 70년대생 #2 — 레코드 가게에서 음반 고르던 날 (26초 내레이션판, 트렌디판용, 세대 감성)
// 소재: 용돈 모아 레코드 가게, 가게 앞 스피커의 신곡, 테이프냐 판이냐, 비닐 뜯고 가사지부터, 앞면·뒷면 닳도록 → 환갑 기념·동창회·부모님께. 연도·가격 숫자는 안 씀.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];
function pills(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function ctape(x,y,w,rot,spin,o={}){ // 카세트테이프(어두운 유리풍)
  const h=w*0.63, cx=x+w/2, cy=y+h/2;
  let g=`<g transform="rotate(${rot||0} ${cx} ${cy})">`;
  g+=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="${w*0.04}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w*0.04}" fill="${o.body||'#15151C'}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.06}" y="${y+h*0.08}" width="${w*0.88}" height="${h*0.5}" rx="${w*0.02}" fill="${o.label||'rgba(255,255,255,0.12)'}" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  if(o.side) g+=`<text x="${x+w*0.12}" y="${y+h*0.27}" font-size="${w*0.12}" font-weight="900" fill="${DEEP}">${esc(o.side)}</text>`;
  if(o.title) g+=`<text x="${cx+w*0.06}" y="${y+h*0.24}" font-size="${w*0.065}" font-weight="800" text-anchor="middle" fill="${INK}">${esc(o.title)}</text>`;
  g+=`<rect x="${x+w*0.22}" y="${y+h*0.3}" width="${w*0.56}" height="${h*0.3}" rx="${h*0.15}" fill="#0A0A10" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`;
  [[x+w*0.34,0.6],[x+w*0.66,0.4]].forEach(([rx,am])=>{
    g+=`<circle cx="${rx}" cy="${cy}" r="${h*0.1+h*0.09*am}" fill="#2A2420"/>`;
    g+=`<circle cx="${rx}" cy="${cy}" r="${h*0.09}" fill="#0A0A10" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
    for(let k=0;k<6;k++){const a=(spin||0)+k*Math.PI/3; g+=`<line x1="${rx+h*0.03*Math.cos(a)}" y1="${cy+h*0.03*Math.sin(a)}" x2="${rx+h*0.085*Math.cos(a)}" y2="${cy+h*0.085*Math.sin(a)}" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;}
  });
  g+=`<path d="M${x+w*0.1} ${y+h} L${x+w*0.16} ${y+h*0.82} L${x+w*0.84} ${y+h*0.82} L${x+w*0.9} ${y+h}" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>`;
  return g+`</g>`;
}
function vinyl(cx,cy,r,rot){ // 레코드판(검정 + 홈 + 빛 반사)
  let g=`<ellipse cx="${cx}" cy="${cy+r*0.92}" rx="${r*0.8}" ry="${r*0.12}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#101014" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>`;
  for(let i=0;i<7;i++) g+=`<circle cx="${cx}" cy="${cy}" r="${r*(0.42+i*0.08)}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>`;
  const a=-rot*0.5-0.8, ri=r*0.4, ro=r*0.98;
  g+=`<path d="M${cx+ri*Math.cos(a-0.25)} ${cy+ri*Math.sin(a-0.25)} L${cx+ro*Math.cos(a-0.15)} ${cy+ro*Math.sin(a-0.15)} A${ro} ${ro} 0 0 1 ${cx+ro*Math.cos(a+0.15)} ${cy+ro*Math.sin(a+0.15)} L${cx+ri*Math.cos(a+0.25)} ${cy+ri*Math.sin(a+0.25)} Z" fill="#FFFFFF" opacity="0.18"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.33}" fill="${DEEP}"/><circle cx="${cx}" cy="${cy}" r="${r*0.04}" fill="#0A0A10"/>`;
  g+=`<line x1="${cx+r*0.08*Math.cos(rot)}" y1="${cy+r*0.08*Math.sin(rot)}" x2="${cx+r*0.26*Math.cos(rot)}" y2="${cy+r*0.26*Math.sin(rot)}" stroke="#0A0A0A" stroke-width="5" stroke-linecap="round"/>`;
  return g;
}
function shop(x,y,w,tw,u){ // 레코드 가게 앞: 줄무늬 차양 + 진열창 + 스피커
  const h=w*0.78;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="14" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#17151D" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>`;
  for(let i=0;i<8;i++) g+=`<path d="M${x+i*w/8} ${y} L${x+(i+1)*w/8} ${y} L${x+(i+1)*w/8} ${y+h*0.16} Q ${x+(i+0.5)*w/8} ${y+h*0.24} ${x+i*w/8} ${y+h*0.16} Z" fill="${i%2?DEEP:'rgba(255,255,255,0.85)'}"/>`;
  g+=`<text x="${x+w*0.5}" y="${y+h*0.34}" font-size="${w*0.07}" font-weight="900" text-anchor="middle" fill="${INK}" letter-spacing="4">RECORD</text>`;
  g+=`<rect x="${x+w*0.08}" y="${y+h*0.42}" width="${w*0.56}" height="${h*0.5}" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  // 진열창 속 음반들
  [[0.12,0.48,DEEP],[0.3,0.5,'#7C6CFF'],[0.47,0.47,'#2FD3F0']].forEach(([px,py,c],i)=>{ g+=`<rect x="${x+w*px}" y="${y+h*py+Math.sin(tw*2+i)*3}" width="${w*0.14}" height="${w*0.14}" rx="4" fill="${c}" opacity="0.85"/>`; });
  g+=`<rect x="${x+w*0.1}" y="${y+h*0.72}" width="${w*0.52}" height="${h*0.06}" fill="rgba(255,255,255,0.12)"/>`;
  // 스피커
  const sx=x+w*0.7, sy=y+h*0.44, sw=w*0.22, sh=h*0.48, pu=1+0.06*Math.max(0,Math.sin(tw*9));
  g+=`<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="10" fill="#0E0E14" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>`;
  g+=`<circle cx="${sx+sw/2}" cy="${sy+sh*0.66}" r="${sw*0.34*pu}" fill="#24222C" stroke="rgba(255,255,255,0.6)" stroke-width="2"/><circle cx="${sx+sw/2}" cy="${sy+sh*0.66}" r="${sw*0.12}" fill="${DEEP}"/>`;
  g+=`<circle cx="${sx+sw/2}" cy="${sy+sh*0.22}" r="${sw*0.14}" fill="#24222C" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  return g;
}
function sleeve(x,y,w,peel,o={}){ // 비닐 포장된 음반 + 가사지
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${w}" rx="10" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${w}" rx="10" fill="url(#artg)" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<circle cx="${x+w*0.5}" cy="${y+w*0.5}" r="${w*0.28}" fill="rgba(10,10,16,0.35)"/><circle cx="${x+w*0.5}" cy="${y+w*0.5}" r="${w*0.08}" fill="rgba(255,255,255,0.75)"/>`;
  g+=`<text x="${x+w*0.08}" y="${y+w*0.14}" font-size="${w*0.08}" font-weight="900" fill="#FFFFFF">NEW</text>`;
  // 비닐: 오른쪽 위에서 벗겨짐
  const px=x+w*(1-peel), keep=1-peel;
  if(keep>0.02){ g+=`<path d="M${x-6} ${y-6} L${px+6} ${y-6} L${px+6} ${y+w+6} L${x-6} ${y+w+6} Z" fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>`;
    g+=`<path d="M${x+w*0.1*keep} ${y+w*0.05} L${x+w*0.35*keep} ${y+w*0.05} L${x+w*0.05} ${y+w*0.6}" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="5" stroke-linecap="round"/>`; }
  if(peel>0.05) g+=`<path d="M${px+6} ${y-6} C ${px+60} ${y+w*0.2} ${px+20} ${y+w*0.5} ${px+90} ${y+w*0.7}" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="3"/>`;
  return g;
}
function lyric(x,y,w,open){ // 가사지 펼치기
  const ww=w*(0.35+0.65*open), h=w*1.25;
  let g=`<rect x="${x+8}" y="${y+12}" width="${ww}" height="${h}" rx="6" fill="rgba(0,0,0,0.5)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${ww}" height="${h}" rx="6" fill="#F4EEE4" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  if(open>0.5){ g+=`<line x1="${x+ww/2}" y1="${y+6}" x2="${x+ww/2}" y2="${y+h-6}" stroke="rgba(0,0,0,0.12)" stroke-width="2"/>`;
    for(let c=0;c<2;c++) for(let i=0;i<9;i++){ const lw=(ww/2-50)*(0.55+0.45*((i*37+c*11)%10)/10); g+=`<rect x="${x+24+c*ww/2}" y="${y+40+i*h*0.095}" width="${lw}" height="8" rx="4" fill="rgba(43,35,32,${i%3===0?0.55:0.28})"/>`; } }
  return g;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,7.0],flash:[0.35],
 tag:'70년대생  #2',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'용돈 모아 달려가던',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'레코드',260,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-12}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'70년대생',56,-9,330);
    if(t>=1.0) txt+=stamp(t,1.0,300,1140,ink(90,1180,'가게 가던 날,',100,900)+ink(90,1310,'기억나세요?',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'신곡',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.7));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}" transform="translate(0,${((1-e1)*60).toFixed(1)})">`+shop(190,700,700,tw,u)+`</g>`;
    for(let i=0;i<5;i++){ if(u>0.6+i*0.3) art+=note(720+i*55-(i%2)*30,690-i*35-(u-0.6-i*0.3)*30,52,i%2?DEEP:'rgba(255,255,255,0.85)'); }
    if(u>2.2) art+=pills(120,1140,'이 노래 제목이 뭐예요?',true);
    txt+=cap(t,t0+0.3,['가게 앞 스피커에서 흘러나오던 신곡,','제목 물어보러 들어갔죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'테이프냐',120,900,{mis:[9,7]})+ink(620,560,'판이냐',120,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.4,0.9));
    const pick=Math.floor(u/0.9)%2; // 번갈아 고민
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-100).toFixed(1)},0)">`+ctape(100,820,400,-6,tw*3,{title:'신보'})+`</g>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*100).toFixed(1)},0)">`+vinyl(780,930,190,tw*2)+`</g>`;
    if(u>0.9) art+=`<text x="540" y="960" font-size="90" font-weight="900" text-anchor="middle" fill="${DEEP}">?</text>`;
    if(u>1.0) art+=pills(130,1140,'테이프',pick===0)+pills(400,1140,'판',pick===1);
    if(u>2.6) art+=pills(620,1140,'한참 고민',true);
    txt+=cap(t,t0+0.3,['테이프로 살까, 판으로 살까.','한참을 고민했어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'비닐 뜯고',170,900,{mis:[9,7]}));
    const peel=out(pr(stp(u,12),0.5,1.8)), op=out(pr(stp(u,12),1.9,3.0));
    art+=PDEFS+sleeve(150,760,380,peel);
    if(u>1.8) art+=lyric(580,700,400,op);
    if(u>2.0&&u<2.4) art+=sparkle(560,760,26);
    if(u>3.0) art+=pills(120,1140,'가사지부터 펼치기',true);
    txt+=cap(t,t0+0.3,['집에 오자마자 비닐을 뜯고,','가사지부터 펼쳤죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'A면',180,900,{mis:[9,7]})+ink(450,560,'B면',180,900,{fill:DEEP}));
    const fl=pr(stp(u,12),1.2,2.0), sx=Math.cos(fl*Math.PI), side=fl<0.5?'A':'B';
    art+=PDEFS+`<g transform="translate(540,960) scale(${Math.max(0.04,Math.abs(sx)).toFixed(3)},1) translate(-540,-960)">`+ctape(260,800,560,0,tw*4,{side,title:'닳도록'})+`</g>`;
    if(u>2.4) for(let i=0;i<4;i++) art+=note(180+i*230,760-(i%2)*50,50,i%2?DEEP:'rgba(255,255,255,0.8)');
    if(u>2.8) art+=pills(120,1140,'닳도록 들었어요',true);
    txt+=cap(t,t0+0.3,['앞면 다 듣고 뒤집어서 또 듣고,','닳도록 들었어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'그때 그 설렘',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.6,1.1));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+ctape(90,820,300,-8,tw*4)+`</g>`;
    if(u>1.0) art+=`<text x="470" y="960" font-size="70" font-weight="900" text-anchor="middle" fill="${DEEP}">→</text>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+cd(640,930,120,tw*2)+pusb(760,1030,220,-8)+`</g>`;
    if(u>1.4) art+=pills(120,1140,'환갑 기념',true)+pills(360,1140,'동창회',false)+pills(560,1140,'부모님께',false);
    txt+=cap(t,t0+0.3,['그때 그 설렘 그대로, 이젠 CD·USB 음반으로.','보다아트가 만들어 드려요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'80년대생 편','BGM 고르던 밤',tw),{ruler:false});
 }};
