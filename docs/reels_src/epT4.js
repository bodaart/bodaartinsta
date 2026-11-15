// 80년대생 #2 — 싸이월드 BGM 고르던 밤 (26초 내레이션판, 트렌디판용, 세대 감성)
// 소재: 미니홈피 배경음악, 도토리로 한 곡 사기(그날 기분), 파도타기로 친구 홈피의 노래, 목에 건 MP3, 그 노래가 곧 나 → 나를 담은 음반.
// 실제 서비스 화면·캐릭터는 그리지 않고 일반적인 창·버튼으로만 그림. 연도·가격 숫자는 안 씀.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];
function pillt(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function eq(x,y,w,h,tw,n){ n=n||7; let g=''; for(let i=0;i<n;i++){ const v=0.3+0.7*Math.abs(Math.sin(tw*6+i*1.7)); g+=`<rect x="${x+i*w/n}" y="${y+h*(1-v)}" width="${w/n-6}" height="${h*v}" rx="3" fill="${i%2?DEEP:'rgba(255,255,255,0.75)'}"/>`; } return g; }
function homepy(x,y,w,tw,o={}){ // 옛날 개인 홈페이지 창(일반 그림)
  const h=w*0.68;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="14" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${o.bg||'#1B1A24'}" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h*0.11}" rx="14" fill="rgba(255,255,255,0.12)"/>`;
  [0,1,2].forEach(i=>{ g+=`<circle cx="${x+22+i*24}" cy="${y+h*0.055}" r="7" fill="${['#FF5F57','#FEBC2E','#28C840'][i]}"/>`; });
  // BGM 막대
  g+=`<rect x="${x+w*0.3}" y="${y+h*0.025}" width="${w*0.64}" height="${h*0.065}" rx="${h*0.03}" fill="#0A0A10" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  g+=`<text x="${x+w*0.33}" y="${y+h*0.073}" font-size="${w*0.035}" font-weight="800" fill="${DEEP}">♪ BGM</text>`;
  g+=`<text x="${x+w*0.46}" y="${y+h*0.073}" font-size="${w*0.032}" font-weight="700" fill="${INK}">${esc(o.song||'오늘의 노래')}</text>`;
  // 왼쪽 프로필 칸 + 오른쪽 방
  g+=`<rect x="${x+w*0.04}" y="${y+h*0.16}" width="${w*0.28}" height="${h*0.78}" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>`;
  g+=`<circle cx="${x+w*0.18}" cy="${y+h*0.34}" r="${w*0.07}" fill="${o.face||'#7C6CFF'}"/>`;
  for(let i=0;i<4;i++) g+=`<rect x="${x+w*0.07}" y="${y+h*(0.52+i*0.09)}" width="${w*(0.2-i*0.03)}" height="8" rx="4" fill="rgba(255,255,255,0.3)"/>`;
  g+=`<rect x="${x+w*0.35}" y="${y+h*0.16}" width="${w*0.61}" height="${h*0.78}" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>`;
  g+=eq(x+w*0.42,y+h*0.42,w*0.46,h*0.36,tw,8);
  return g;
}
function acorn(cx,cy,s,rot){ return `<g transform="rotate(${rot||0} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy+s*0.18}" rx="${s*0.36}" ry="${s*0.44}" fill="#C08A5A" stroke="rgba(255,255,255,0.7)" stroke-width="2"/><path d="M${cx-s*0.46} ${cy-s*0.06} Q ${cx} ${cy-s*0.62} ${cx+s*0.46} ${cy-s*0.06} Z" fill="#6B4A2E" stroke="rgba(255,255,255,0.7)" stroke-width="2"/><line x1="${cx}" y1="${cy-s*0.36}" x2="${cx+s*0.06}" y2="${cy-s*0.56}" stroke="#6B4A2E" stroke-width="5" stroke-linecap="round"/></g>`; }
function mp3(x,y,w,tw,o={}){ // 목에 거는 작은 MP3
  const h=w*1.6;
  let g=`<path d="M${x+w*0.5} ${y} C ${x+w*0.5-260} ${y-260} ${x+w*0.5+260} ${y-260} ${x+w*0.5} ${y}" fill="none" stroke="${DEEP}" stroke-width="6"/>`;
  g+=`<rect x="${x+8}" y="${y+12}" width="${w}" height="${h}" rx="${w*0.2}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w*0.2}" fill="url(#metal)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.12}" y="${y+w*0.16}" width="${w*0.76}" height="${w*0.62}" rx="6" fill="#0F1C3A"/>`;
  g+=`<text x="${x+w*0.5}" y="${y+w*0.44}" font-size="${w*0.16}" font-weight="900" text-anchor="middle" fill="${DEEP}">♪ ${o.n||'01'}</text>`;
  g+=`<rect x="${x+w*0.2}" y="${y+w*0.58}" width="${w*0.6*((tw*0.15)%1)}" height="6" fill="#FFFFFF" opacity="0.8"/>`;
  g+=`<circle cx="${x+w*0.5}" cy="${y+h*0.72}" r="${w*0.26}" fill="rgba(255,255,255,0.25)" stroke="rgba(0,0,0,0.25)" stroke-width="2"/><circle cx="${x+w*0.5}" cy="${y+h*0.72}" r="${w*0.1}" fill="rgba(255,255,255,0.6)"/>`;
  // 이어폰 줄
  g+=`<path d="M${x+w*0.5} ${y+h} C ${x+w*0.5} ${y+h+80} ${x-60} ${y+h+40} ${x-90} ${y+h+120}" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="3"/>`;
  g+=`<path d="M${x+w*0.5} ${y+h} C ${x+w*0.5} ${y+h+80} ${x+w+60} ${y+h+40} ${x+w+90} ${y+h+120}" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="3"/>`;
  g+=`<circle cx="${x-90}" cy="${y+h+126}" r="14" fill="#FFFFFF"/><circle cx="${x+w+90}" cy="${y+h+126}" r="14" fill="#FFFFFF"/>`;
  return g;
}
function plist(x,y,w,u,tw){ // 내 노래 목록
  const songs=['비 오는 날','새벽 감성','졸업식 날','첫눈 오던 밤'];
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${w*0.78}" rx="18" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${w*0.78}" rx="18" fill="#17151D" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>`;
  g+=`<text x="${x+32}" y="${y+62}" font-size="36" font-weight="900" fill="${INK}">내 노래</text>`;
  songs.forEach((s,i)=>{ const e=out(pr(stp(u,12),0.3+i*0.35,0.7+i*0.35)); if(e<=0) return;
    const yy=y+110+i*96; g+=`<g opacity="${e.toFixed(2)}" transform="translate(${((1-e)*40).toFixed(1)},0)">`;
    g+=`<rect x="${x+24}" y="${yy}" width="${w-48}" height="78" rx="14" fill="${i===1?'rgba(200,255,61,0.16)':'rgba(255,255,255,0.06)'}"/>`;
    g+=`<text x="${x+50}" y="${yy+50}" font-size="32" font-weight="800" fill="${i===1?DEEP:INK}">♪  ${esc(s)}</text>`;
    g+=`<path d="M${x+w-70} ${yy+30} C ${x+w-70} ${yy+18} ${x+w-50} ${yy+18} ${x+w-50} ${yy+30} C ${x+w-50} ${yy+18} ${x+w-30} ${yy+18} ${x+w-30} ${yy+30} C ${x+w-30} ${yy+44} ${x+w-50} ${yy+54} ${x+w-50} ${yy+58} C ${x+w-50} ${yy+54} ${x+w-70} ${yy+44} ${x+w-70} ${yy+30} Z" fill="${DEEP}"/></g>`; });
  return g;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,7.0],flash:[0.35],
 tag:'80년대생  #2',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'미니홈피 배경음악',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'BGM',300,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-10}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'80년대생',56,-9,330);
    if(t>=1.0) txt+=stamp(t,1.0,300,1140,ink(90,1180,'고르느라',100,900)+ink(90,1310,'밤새던 날',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'도토리',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    art+=PDEFS;
    for(let i=0;i<6;i++){ const st=0.3+i*0.22, p=pr(u,st,st+0.7); if(p<=0) continue; const yy=700+out(p)*260+(i%2)*40; art+=acorn(200+i*130,yy,90,Math.sin(tw*3+i)*12); }
    if(u>1.6){ const e=out(pr(stp(u,12),1.6,2.1)); art+=`<g opacity="${e.toFixed(2)}"><rect x="210" y="1060" width="660" height="70" rx="35" fill="#0A0A10" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><text x="250" y="1106" font-size="34" font-weight="800" fill="${DEEP}">♪ BGM</text><text x="380" y="1106" font-size="32" font-weight="700" fill="${INK}">오늘 내 기분</text>`+eq(700,1072,140,46,tw,5)+`</g>`; }
    if(u>2.6) art+=pillt(120,1140,'한 곡 = 오늘의 기분',true);
    txt+=cap(t,t0+0.3,['도토리 모아서 노래 한 곡 사면,','그게 그날 내 기분이었죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'파도타기',200,900,{mis:[9,7]}));
    const sl=pr(stp(u,12),0.6,3.4)*2; // 창이 옆으로 넘어감
    art+=PDEFS;
    const songs=['비 오는 날','첫사랑','졸업식 날'], faces=['#7C6CFF','#FF5FA2','#2FD3F0'];
    for(let i=0;i<3;i++){ const x=150+(i-sl)*820; if(x<-800||x>1080) continue; art+=homepy(x,740,780,tw,{song:songs[i],face:faces[i]}); }
    const cx=760+Math.sin(tw*2)*30, cy=1060; art+=`<path d="M${cx} ${cy} l0 46 l12 -12 l10 22 l9 -4 l-10 -21 l17 0 Z" fill="#FFFFFF" stroke="#0A0A0A" stroke-width="2"/>`;
    if(u>3.0) art+=pillt(120,1140,'그 친구 노래',true);
    txt+=cap(t,t0+0.3,['파도타기로 친구 홈피에 들어가면,','그 친구 노래가 흘러나왔고요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'첫',180,900,{mis:[9,7]})+ink(300,560,'MP3',180,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.7)), sw=Math.sin(tw*2.2)*4;
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}" transform="rotate(${sw.toFixed(2)} 540 760) translate(0,${((1-e1)*-80).toFixed(1)})">`+mp3(470,820,140,tw,{n:u<2?'01':'02'})+`</g>`;
    for(let i=0;i<4;i++){ if(u>1.0+i*0.3) art+=note(170+i*70+(i%2)*560,820-(i%3)*60,52,i%2?DEEP:'rgba(255,255,255,0.8)'); }
    if(u>2.6) art+=pillt(120,1140,'좋아하는 노래만',true);
    txt+=cap(t,t0+0.3,['목에 건 MP3엔','좋아하는 노래만 골라 담았죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'그 노래가 나',170,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    art+=PDEFS+plist(220,700,640,u,tw);
    if(u>2.6) art+=pillt(120,1140,'지금 들어도 그 밤',true);
    txt+=cap(t,t0+0.3,['그 노래들이 곧 나였어요.','지금 들어도 그 밤이 떠올라요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'이젠 내 음반',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.6,1.1));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+homepy(70,820,380,tw,{song:'내 노래'})+`</g>`;
    if(u>0.8) art+=`<text x="520" y="960" font-size="70" font-weight="900" text-anchor="middle" fill="${DEEP}">→</text>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+cd(700,930,120,tw*2)+pusb(800,1030,220,-8)+`</g>`;
    if(u>1.4) art+=pillt(120,1140,'우리 밴드',true)+pillt(360,1140,'결혼 기념',false)+pillt(600,1140,'아이에게',false);
    txt+=cap(t,t0+0.3,['그때 그 노래처럼, 이젠 나를 담은 음반으로.','보다아트가 만들어 드려요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'포트폴리오 편','우리가 만든 음반들',tw),{ruler:false});
 }};
