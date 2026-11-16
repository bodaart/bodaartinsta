// 80년대생 #3 — 앨범 포토북 넘기던 날 (26초 내레이션판, 트렌디판용, 세대 감성)
// 소재: 발매일 기다리다 음반 매장으로, 비닐 뜯자마자 포토북부터, 방 벽에 붙인 브로마이드, 친구랑 돌려 보던 앨범 → 포토북 음반(우리 밴드·결혼 기념·아이에게).
// 실제 가수·매장·앨범 표지는 그리지 않고 일반 그림으로만. 연도·가격 숫자는 안 씀.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];
function pillv(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function calv(x,y,w,u){ // 달력: 동그라미 친 발매일
  const h=w*0.9, cw=w/7;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="14" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#F4EEE4" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h*0.16}" rx="14" fill="${DEEP}"/><rect x="${x}" y="${y+h*0.1}" width="${w}" height="${h*0.06}" fill="${DEEP}"/>`;
  for(let i=0;i<2;i++) g+=`<rect x="${x+w*(0.25+i*0.5)-8}" y="${y-18}" width="16" height="40" rx="8" fill="#2B2320"/>`;
  for(let r=0;r<5;r++) for(let c=0;c<7;c++){ const k=r*7+c; const crossed=k<16&&u*12>k;
    g+=`<rect x="${x+c*cw+cw*0.2}" y="${y+h*0.22+r*h*0.15}" width="${cw*0.6}" height="${h*0.1}" rx="4" fill="rgba(43,35,32,0.12)"/>`;
    if(crossed) g+=`<path d="M${x+c*cw+cw*0.25} ${y+h*0.23+r*h*0.15} L${x+c*cw+cw*0.75} ${y+h*0.31+r*h*0.15}" stroke="rgba(43,35,32,0.6)" stroke-width="4" stroke-linecap="round"/>`;
  }
  const tc=16, tx=x+(tc%7)*cw+cw*0.5, ty=y+h*0.27+Math.floor(tc/7)*h*0.15, p=Math.min(1,Math.max(0,(u-1.4)/0.6));
  if(p>0) g+=`<path d="M${tx+cw*0.5} ${ty} A${cw*0.5} ${h*0.08} 0 1 1 ${tx+cw*0.5-0.01} ${ty+0.01}" fill="none" stroke="${DEEP}" stroke-width="7" stroke-dasharray="${(p*240).toFixed(0)} 400" stroke-linecap="round"/>`;
  return g;
}
function bag(x,y,w,rot){ // 음반 매장 봉투
  const h=w*1.1;
  let g=`<g transform="rotate(${rot} ${x+w/2} ${y+h/2})"><rect x="${x+8}" y="${y+12}" width="${w}" height="${h}" rx="8" fill="rgba(0,0,0,0.5)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#1C1A24" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<path d="M${x+w*0.3} ${y} C ${x+w*0.3} ${y-w*0.3} ${x+w*0.7} ${y-w*0.3} ${x+w*0.7} ${y}" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="6"/>`;
  g+=`<text x="${x+w/2}" y="${y+h*0.45}" font-size="${w*0.15}" font-weight="900" text-anchor="middle" fill="${DEEP}">MUSIC</text>`;
  g+=`<circle cx="${x+w/2}" cy="${y+h*0.7}" r="${w*0.14}" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="3"/><circle cx="${x+w/2}" cy="${y+h*0.7}" r="${w*0.03}" fill="rgba(255,255,255,0.7)"/>`;
  return g+`</g>`;
}
function photobook(cx,cy,w,flip,tw){ // 펼친 포토북: 오른쪽 장이 넘어감 (사진 칸은 빛 그라데이션)
  const h=w*0.68, hw=w/2;
  let g=`<ellipse cx="${cx}" cy="${cy+h*0.58}" rx="${w*0.5}" ry="${h*0.08}" fill="rgba(0,0,0,0.5)" filter="url(#b8)"/>`;
  const page=(px,shade)=>`<rect x="${px}" y="${cy-h/2}" width="${hw}" height="${h}" rx="6" fill="#F4EEE4" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`+
     `<rect x="${px+hw*0.1}" y="${cy-h/2+h*0.08}" width="${hw*0.8}" height="${h*0.62}" rx="4" fill="url(#artg)" opacity="${shade}"/>`+
     `<rect x="${px+hw*0.1}" y="${cy-h/2+h*0.76}" width="${hw*0.55}" height="${h*0.04}" rx="2" fill="rgba(43,35,32,0.4)"/><rect x="${px+hw*0.1}" y="${cy-h/2+h*0.84}" width="${hw*0.35}" height="${h*0.04}" rx="2" fill="rgba(43,35,32,0.25)"/>`;
  g+=page(cx-hw,0.9)+page(cx,0.75);
  g+=`<line x1="${cx}" y1="${cy-h/2}" x2="${cx}" y2="${cy+h/2}" stroke="rgba(0,0,0,0.25)" stroke-width="4"/>`;
  // 넘어가는 장
  const f=flip%1, sx=Math.cos(f*Math.PI);
  if(f>0.02&&f<0.98){ const px=sx>=0?cx:cx+hw*sx; const ww=Math.abs(hw*sx);
    g+=`<rect x="${px}" y="${cy-h/2-6}" width="${ww}" height="${h+12}" rx="6" fill="${sx>=0?'#FFFFFF':'#EDE5D8'}" stroke="rgba(255,255,255,0.8)" stroke-width="2" opacity="0.96"/>`; }
  return g;
}
function poster(x,y,w,unroll){ // 브로마이드: 위에서 아래로 펼쳐지며 테이프로 붙음
  const h=w*1.35*unroll;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="6" fill="rgba(0,0,0,0.5)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${Math.max(8,h)}" rx="6" fill="url(#artg)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  if(unroll>0.5){ g+=`<text x="${x+w/2}" y="${y+h*0.86}" font-size="${w*0.13}" font-weight="900" text-anchor="middle" fill="#FFFFFF" opacity="${((unroll-0.5)*2).toFixed(2)}">NEW ALBUM</text>`;
    g+=`<circle cx="${x+w/2}" cy="${y+h*0.42}" r="${w*0.22}" fill="rgba(255,255,255,0.18)"/>`; }
  g+=`<rect x="${x-6}" y="${y+Math.max(8,h)-14}" width="${w+12}" height="28" rx="14" fill="#2B2320" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>`;
  [[x-14,y-12,-20],[x+w-34,y-12,20]].forEach(([tx,ty,r])=>{ g+=`<rect x="${tx}" y="${ty}" width="48" height="26" rx="3" fill="rgba(244,238,228,0.7)" transform="rotate(${r} ${tx+24} ${ty+13})"/>`; });
  return g;
}
function albumv(x,y,w,rot,worn){ // 손때 묻은 앨범
  let g=`<g transform="rotate(${rot} ${x+w/2} ${y+w/2})"><rect x="${x+8}" y="${y+12}" width="${w}" height="${w}" rx="8" fill="rgba(0,0,0,0.5)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${w}" rx="8" fill="url(#artg)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.1}" y="${y+w*0.72}" width="${w*0.5}" height="${w*0.08}" rx="3" fill="rgba(255,255,255,0.75)"/>`;
  if(worn>0){ for(let i=0;i<5;i++){ const a=(i*73)%100/100; g+=`<path d="M${x+w*a} ${y} l ${w*0.04} ${w*0.05}" stroke="rgba(255,255,255,${(0.6*worn).toFixed(2)})" stroke-width="3"/>`; }
    g+=`<path d="M${x+w} ${y+w*0.2} q -${w*0.05} ${w*0.1} 0 ${w*0.2}" stroke="rgba(255,255,255,${(0.6*worn).toFixed(2)})" stroke-width="3" fill="none"/>`; }
  return g+`</g>`;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,7.0],flash:[0.35],
 tag:'80년대생  #3',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'새 앨범 사면',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'포토북',250,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-12}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'80년대생',56,-9,330);
    if(t>=1.0) txt+=stamp(t,1.0,300,1140,ink(90,1180,'부터 넘기던 날,',100,900)+ink(90,1310,'기억나세요?',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'발매일',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),2.2,2.8));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}">`+calv(140,740,520,u)+`</g>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*140).toFixed(1)},0)">`+bag(700,820,240,6)+`</g>`;
    if(u>2.8) art+=pillv(120,1140,'매장으로 달려가기',true);
    txt+=cap(t,t0+0.3,['발매일만 손꼽아 기다리다,','음반 매장으로 달려갔죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'한 장씩',190,900,{mis:[9,7]}));
    const e1=out(pr(stp(u,12),0.1,0.6));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}">`+photobook(540,940,680,u>0.9?(u-0.9)*0.9:0,tw)+`</g>`;
    if(u>1.4&&u<1.8) art+=sparkle(820,700,26);
    if(u>3.0) art+=pillv(120,1140,'포토북부터',true);
    txt+=cap(t,t0+0.3,['비닐 뜯자마자','포토북부터 한 장씩 넘겼어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'브로마이드',170,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const un=out(pr(stp(u,12),0.4,1.6));
    art+=PDEFS+`<rect x="140" y="700" width="800" height="420" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>`;
    art+=poster(390,700,300,Math.max(0.03,un));
    if(u>1.8) art+=sparkle(740,760,22)+sparkle(330,980,18);
    if(u>2.8) art+=pillv(120,1140,'방 벽에 붙여 두기',true);
    txt+=cap(t,t0+0.3,['브로마이드는','방 벽에 붙여 두고요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'돌려 보기',190,900,{mis:[9,7]}));
    const pass=pr(stp(u,12),0.4,2.4), px=180+pass*500, py=860-Math.sin(pass*Math.PI)*120;
    art+=PDEFS;
    [[150,'A'],[770,'B']].forEach(([cx,l])=>{ art+=`<circle cx="${cx+80}" cy="1000" r="70" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><text x="${cx+80}" y="1020" font-size="56" font-weight="900" text-anchor="middle" fill="${INK}">${l}</text>`; });
    art+=albumv(px,py,220,-8+pass*16,Math.min(1,u/3));
    if(u>3.0) art+=pillv(120,1140,'너덜너덜해질 때까지',true);
    txt+=cap(t,t0+0.3,['친구랑 돌려 보느라','앨범이 너덜너덜해졌죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'그 설렘 그대로',150,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.6,1.1));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+albumv(110,820,260,-8,1)+`</g>`;
    if(u>1.0) art+=`<text x="470" y="960" font-size="70" font-weight="900" text-anchor="middle" fill="${DEEP}">→</text>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+photobook(760,920,400,0,tw)+cd(820,1050,80,tw*2)+`</g>`;
    if(u>1.4) art+=pillv(120,1140,'우리 밴드',true)+pillv(360,1140,'결혼 기념',false)+pillv(620,1140,'아이에게',false);
    txt+=cap(t,t0+0.3,['그 설렘 그대로, 이젠 포토북 음반으로.','보다아트가 만들어 드려요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'포트폴리오 편','싸바리 패키지',tw),{ruler:false});
 }};
