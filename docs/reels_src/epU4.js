// 70년대생 #3 — 음악다방 신청곡 (26초 내레이션판, 트렌디판용, 세대 감성)
// 소재: 음악다방 DJ 박스, 쪽지에 적어 건네는 신청곡, 커피 한 잔 시켜 놓고 기다리기, DJ가 읽어 주는 사연 → 환갑 기념·동창회·부모님께.
// 실제 가게·사람 얼굴은 그리지 않고 일반 그림으로만. 연도·가격 숫자는 안 씀.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];
function pillu(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function vinylu(cx,cy,r,rot){
  let g=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#101014" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>`;
  for(let i=0;i<5;i++) g+=`<circle cx="${cx}" cy="${cy}" r="${r*(0.45+i*0.11)}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>`;
  const a=rot; g+=`<path d="M${cx} ${cy} L${cx+r*Math.cos(a-0.2)} ${cy+r*Math.sin(a-0.2)} A${r} ${r} 0 0 1 ${cx+r*Math.cos(a+0.2)} ${cy+r*Math.sin(a+0.2)} Z" fill="#FFFFFF" opacity="0.14"/>`;
  return g+`<circle cx="${cx}" cy="${cy}" r="${r*0.32}" fill="${DEEP}"/><circle cx="${cx}" cy="${cy}" r="${r*0.05}" fill="#0A0A10"/>`;
}
function booth(x,y,w,tw,u){ // DJ 박스: 유리창 + 판이 꽂힌 선반 + 턴테이블 + ON AIR 불
  const h=w*0.78;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="16" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#16141C" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>`;
  // 판 선반(꽂힌 음반 등)
  for(let r=0;r<2;r++) for(let i=0;i<22;i++){ const c=['rgba(255,255,255,0.75)',DEEP,'#7C6CFF','#2FD3F0','rgba(255,255,255,0.35)'][(i*7+r*3)%5];
    g+=`<rect x="${x+w*0.06+i*w*0.04}" y="${y+h*0.08+r*h*0.2}" width="${w*0.028}" height="${h*0.16}" rx="2" fill="${c}" opacity="0.8"/>`; }
  // 유리창(반사)
  g+=`<rect x="${x+w*0.04}" y="${y+h*0.5}" width="${w*0.92}" height="${h*0.44}" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>`;
  g+=`<path d="M${x+w*0.1} ${y+h*0.92} L${x+w*0.3} ${y+h*0.52}" stroke="rgba(255,255,255,0.18)" stroke-width="18"/>`;
  // 턴테이블 두 대
  g+=vinylu(x+w*0.3,y+h*0.73,h*0.15,tw*4)+vinylu(x+w*0.62,y+h*0.73,h*0.15,tw*4+1);
  g+=`<rect x="${x+w*0.78}" y="${y+h*0.6}" width="${w*0.12}" height="${h*0.26}" rx="6" fill="#0E0E14" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>`;
  for(let i=0;i<3;i++) g+=`<rect x="${x+w*0.8+i*w*0.03}" y="${y+h*0.65+((i*31)%3)*h*0.04}" width="${w*0.018}" height="${h*0.05}" rx="2" fill="${DEEP}"/>`;
  // ON AIR
  const on=0.55+0.45*Math.abs(Math.sin(tw*5));
  g+=`<rect x="${x+w*0.7}" y="${y-h*0.1}" width="${w*0.26}" height="${h*0.12}" rx="${h*0.06}" fill="${DEEP}" opacity="${on.toFixed(2)}"/><text x="${x+w*0.83}" y="${y-h*0.02}" font-size="${w*0.045}" font-weight="900" text-anchor="middle" fill="#0A0A0A">ON AIR</text>`;
  return g;
}
function memo(x,y,w,rot,write){ // 신청곡 쪽지
  const h=w*1.05;
  let g=`<g transform="rotate(${rot} ${x+w/2} ${y+h/2})"><rect x="${x+8}" y="${y+12}" width="${w}" height="${h}" rx="6" fill="rgba(0,0,0,0.5)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#F4EEE4" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  g+=`<text x="${x+w*0.1}" y="${y+h*0.17}" font-size="${w*0.11}" font-weight="900" fill="#2B2320">신청곡</text>`;
  const lines=[0.62,0.8,0.5,0.7]; lines.forEach((lw,i)=>{ const p=Math.min(1,Math.max(0,write*4-i)); if(p>0) g+=`<rect x="${x+w*0.1}" y="${y+h*(0.3+i*0.15)}" width="${w*0.8*lw*p}" height="${w*0.035}" rx="${w*0.017}" fill="rgba(43,35,32,${i===0?0.75:0.4})"/>`; });
  if(write>0.95) g+=`<text x="${x+w*0.9}" y="${y+h*0.94}" font-size="${w*0.12}" text-anchor="end" fill="${DEEP}">♥</text>`;
  return g+`</g>`;
}
function cup(x,y,w,tw){ // 커피 잔 + 김
  let g=`<ellipse cx="${x+w*0.5}" cy="${y+w*0.78}" rx="${w*0.62}" ry="${w*0.1}" fill="#F4EEE4" opacity="0.9"/>`;
  g+=`<path d="M${x} ${y+w*0.2} L${x+w} ${y+w*0.2} L${x+w*0.86} ${y+w*0.74} Q ${x+w*0.5} ${y+w*0.84} ${x+w*0.14} ${y+w*0.74} Z" fill="#F4EEE4" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>`;
  g+=`<ellipse cx="${x+w*0.5}" cy="${y+w*0.2}" rx="${w*0.5}" ry="${w*0.07}" fill="#5A3A28"/>`;
  g+=`<path d="M${x+w*0.98} ${y+w*0.32} q ${w*0.22} ${w*0.02} ${w*0.16} ${w*0.2} q -${w*0.04} ${w*0.12} -${w*0.2} ${w*0.1}" fill="none" stroke="#F4EEE4" stroke-width="${w*0.05}"/>`;
  for(let i=0;i<3;i++){ const ph=tw*2+i*1.3, sx=x+w*(0.3+i*0.2); g+=`<path d="M${sx} ${y+w*0.05} q ${w*0.08*Math.sin(ph)} -${w*0.15} 0 -${w*0.3} q -${w*0.08*Math.sin(ph)} -${w*0.15} 0 -${w*0.3}" fill="none" stroke="rgba(255,255,255,${(0.35+0.25*Math.sin(ph)).toFixed(2)})" stroke-width="5" stroke-linecap="round"/>`; }
  return g;
}
function mic(x,y,s,tw){ // 마이크 + 소리 물결
  let g=`<rect x="${x-s*0.18}" y="${y-s*0.5}" width="${s*0.36}" height="${s*0.6}" rx="${s*0.18}" fill="#24222C" stroke="rgba(255,255,255,0.7)" stroke-width="3"/>`;
  for(let i=0;i<4;i++) g+=`<line x1="${x-s*0.12}" y1="${y-s*0.36+i*s*0.1}" x2="${x+s*0.12}" y2="${y-s*0.36+i*s*0.1}" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>`;
  g+=`<path d="M${x-s*0.28} ${y} Q ${x} ${y+s*0.32} ${x+s*0.28} ${y}" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="4"/><line x1="${x}" y1="${y+s*0.16}" x2="${x}" y2="${y+s*0.5}" stroke="rgba(255,255,255,0.7)" stroke-width="4"/>`;
  for(let i=1;i<=3;i++){ const a=0.2+0.5*Math.abs(Math.sin(tw*4-i)); g+=`<path d="M${x+s*(0.35+i*0.16)} ${y-s*0.45} Q ${x+s*(0.5+i*0.16)} ${y-s*0.2} ${x+s*(0.35+i*0.16)} ${y+s*0.05}" fill="none" stroke="${i===1?DEEP:'rgba(255,255,255,0.6)'}" stroke-width="5" opacity="${a.toFixed(2)}" stroke-linecap="round"/>`; }
  return g;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,7.0],flash:[0.35],
 tag:'70년대생  #3',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'음악다방에서',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'신청곡',250,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-12}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'70년대생',56,-9,330);
    if(t>=1.0) txt+=stamp(t,1.0,300,1140,ink(90,1180,'적어 내던 날,',100,900)+ink(90,1310,'기억나세요?',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'DJ 박스',190,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.7));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}" transform="translate(0,${((1-e1)*60).toFixed(1)})">`+booth(280,730,520,tw,u)+`</g>`;
    if(u>2.4) art+=pillu(120,1140,'판이 빼곡',true);
    txt+=cap(t,t0+0.3,['유리창 너머 DJ 박스엔','레코드판이 빼곡했죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'쪽지 한 장',170,900,{mis:[9,7]}));
    const wr=pr(stp(u,12),0.4,2.0), sl=out(pr(stp(u,12),2.4,3.4));
    art+=PDEFS+memo(300+sl*260,720-sl*40,420,-6+sl*14,wr);
    if(u>2.4) art+=`<text x="${210-sl*30}" y="1000" font-size="80" font-weight="900" fill="${DEEP}" opacity="${sl.toFixed(2)}">→</text>`;
    if(u>3.0) art+=pillu(120,1140,'살짝 건네기',true);
    txt+=cap(t,t0+0.3,['쪽지에 신청곡 적어서,','살짝 건넸어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'언제 나오나',170,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}">`+cup(200,860,300,tw)+`</g>`;
    art+=`<g opacity="${out(pr(stp(u,12),0.5,1.0)).toFixed(2)}">`+vinylu(760,920,170,tw*3)+`</g>`;
    for(let i=0;i<3;i++){ if(u>1.4+i*0.5) art+=`<circle cx="${560+i*40}" cy="1020" r="10" fill="${INK}" opacity="${(0.4+0.6*Math.abs(Math.sin(tw*5+i))).toFixed(2)}"/>`; }
    if(u>2.8) art+=pillu(120,1140,'내 노래 기다리기',true);
    txt+=cap(t,t0+0.3,['커피 한 잔 시켜 놓고,','내 노래만 기다렸죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'내 사연',190,900,{mis:[9,7]}));
    const e1=out(pr(stp(u,12),0.1,0.6));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}">`+mic(380,960,300,tw)+`</g>`;
    if(u>1.0) art+=memo(640,760,260,8,1);
    if(u>2.0) for(let i=0;i<3;i++) art+=`<text x="${700+i*70}" y="${730-i*40-((u-2)*20)}" font-size="56" fill="${DEEP}" opacity="${Math.max(0,1-(u-2)*0.3).toFixed(2)}">♥</text>`;
    if(u>2.8) art+=pillu(120,1140,'괜히 설렜어요',true);
    txt+=cap(t,t0+0.3,['DJ가 내 사연을 읽어 주면,','괜히 설렜어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'그때 그 노래',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.6,1.1));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+memo(110,790,260,-8,1)+`</g>`;
    if(u>1.0) art+=`<text x="470" y="960" font-size="70" font-weight="900" text-anchor="middle" fill="${DEEP}">→</text>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+cd(640,930,120,tw*2)+pusb(760,1030,220,-8)+`</g>`;
    if(u>1.4) art+=pillu(120,1140,'환갑 기념',true)+pillu(360,1140,'동창회',false)+pillu(560,1140,'부모님께',false);
    txt+=cap(t,t0+0.3,['그때 그 신청곡, 이젠 CD·USB 음반으로.','보다아트가 만들어 드려요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'포트폴리오 편','음악을 담은 USB 앨범',tw),{ruler:false});
 }};
