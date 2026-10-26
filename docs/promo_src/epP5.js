// 홍보 릴스 — 음반을 만들면 모바일 음반이 함께 (30초 느린판, 트렌디판)
const S=[4.0,8.6,13.2,17.8,22.4,27.0];
const PDEFS=`<defs><linearGradient id="artg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C6CFF"/><stop offset="0.6" stop-color="#FF5FA2"/><stop offset="1" stop-color="#FFB86B"/></linearGradient>`+
 `<linearGradient id="usbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2A36"/><stop offset="1" stop-color="#15151C"/></linearGradient>`+
 `<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8E8EE"/><stop offset="0.5" stop-color="#A3A6B3"/><stop offset="1" stop-color="#D5D7E0"/></linearGradient>`+
 `<linearGradient id="linkg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C8FF3D" stop-opacity="0"/><stop offset="0.5" stop-color="#C8FF3D"/><stop offset="1" stop-color="#C8FF3D" stop-opacity="0"/></linearGradient></defs>`;
function pusb(x,y,w,rot){const h=w*0.42,cx=x+w/2,cy=y+h/2;
  let g=`<g transform="rotate(${rot||0} ${cx} ${cy})"><rect x="${x+8}" y="${y+10}" width="${w}" height="${h}" rx="${h*0.3}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w*0.68}" height="${h}" rx="${h*0.3}" fill="url(#usbg)" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.66}" y="${y+h*0.18}" width="${w*0.34}" height="${h*0.64}" rx="4" fill="url(#metal)"/>`;
  g+=`<rect x="${x+w*0.74}" y="${y+h*0.32}" width="${w*0.09}" height="${h*0.14}" fill="#5B5E6B"/><rect x="${x+w*0.74}" y="${y+h*0.55}" width="${w*0.09}" height="${h*0.14}" fill="#5B5E6B"/>`;
  g+=`<circle cx="${x+w*0.14}" cy="${cy}" r="${h*0.11}" fill="${DEEP}"/><rect x="${x+w*0.28}" y="${cy-h*0.09}" width="${w*0.3}" height="${h*0.18}" rx="${h*0.09}" fill="rgba(255,255,255,0.18)"/></g>`;
  return g;}
function pphone(x,y,w,o={}){const h=w*2.05,r=w*0.13,p=o.p===undefined?1:o.p;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,0.6)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#111118" stroke="rgba(255,255,255,0.55)" stroke-width="2.5"/>`;
  g+=`<rect x="${x+w*0.3}" y="${y+w*0.05}" width="${w*0.4}" height="${w*0.055}" rx="${w*0.03}" fill="#000"/>`;
  const ax=x+w*0.1,ay=y+w*0.2,aw=w*0.8;
  g+=`<rect x="${ax}" y="${ay}" width="${aw}" height="${aw}" rx="${w*0.05}" fill="url(#artg)"/>`;
  g+=`<circle cx="${ax+aw*0.5}" cy="${ay+aw*0.5}" r="${aw*0.26}" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="${w*0.012}"/><circle cx="${ax+aw*0.5}" cy="${ay+aw*0.5}" r="${aw*0.07}" fill="rgba(255,255,255,0.85)"/>`;
  g+=`<rect x="${ax}" y="${ay+aw+w*0.1}" width="${aw*0.7}" height="${w*0.055}" rx="${w*0.027}" fill="rgba(255,255,255,0.85)"/><rect x="${ax}" y="${ay+aw+w*0.2}" width="${aw*0.45}" height="${w*0.04}" rx="${w*0.02}" fill="rgba(255,255,255,0.35)"/>`;
  const wy=ay+aw+w*0.38; for(let i=0;i<16;i++){const a=Math.abs(Math.sin(i*0.9+(o.ph||0))*Math.cos(i*0.37+(o.ph||0)*0.6)),hh=w*0.03+a*w*0.16;
    g+=`<line x1="${ax+i*aw/16+aw/32}" y1="${wy-hh/2}" x2="${ax+i*aw/16+aw/32}" y2="${wy+hh/2}" stroke="${i%5==2?DEEP:'rgba(255,255,255,0.55)'}" stroke-width="${aw/16*0.45}" stroke-linecap="round"/>`;}
  const py=ay+aw+w*0.55; g+=`<rect x="${ax}" y="${py}" width="${aw}" height="${w*0.03}" rx="${w*0.015}" fill="rgba(255,255,255,0.2)"/><rect x="${ax}" y="${py}" width="${aw*p}" height="${w*0.03}" rx="${w*0.015}" fill="${DEEP}"/>`;
  const cy2=py+w*0.17; g+=`<circle cx="${x+w/2}" cy="${cy2}" r="${w*0.1}" fill="${DEEP}"/><path d="M${x+w/2-w*0.03} ${cy2-w*0.045} L${x+w/2+w*0.045} ${cy2} L${x+w/2-w*0.03} ${cy2+w*0.045} Z" fill="#0A0A0A"/>`;
  if(o.badge){g+=`<rect x="${x+w*0.22}" y="${y+h-w*0.2}" width="${w*0.56}" height="${w*0.13}" rx="${w*0.065}" fill="rgba(200,255,61,0.18)" stroke="${DEEP}" stroke-width="1.5"/><text x="${x+w/2}" y="${y+h-w*0.09}" font-size="${w*0.075}" font-weight="800" text-anchor="middle" fill="${DEEP}" letter-spacing="-0.5">보다코드</text>`;}
  return g;}
function plink(x1,x2,y,p){const xe=x1+(x2-x1)*p;
  return `<rect x="${x1}" y="${y-3}" width="${Math.max(0,xe-x1)}" height="6" rx="3" fill="url(#linkg)"/><rect x="${x1}" y="${y-10}" width="${Math.max(0,xe-x1)}" height="20" rx="10" fill="url(#linkg)" opacity="0.5" filter="url(#b8)"/>`;}
function label(x,y,str){return `<text x="${x}" y="${y}" font-size="30" font-weight="700" text-anchor="middle" fill="${GREY}" letter-spacing="-0.5">${esc(str)}</text>`;}
window.EP={cuts:[4.0,13.2,22.4,27.0],beats:[4.0,8.6,13.2,17.8,22.4,27.0],hits:[0.5,13.7],flash:[0.5],
 tag:'음반 CD · USB 음반 제작',dur:30,ruler:{years:[],keys:[[0,0],[20,0]]},
 scene(t,tw){
  let art=PDEFS,txt='';
  if(t<S[0]){
    txt+=ink(90,470,'보다아트에서 음반을 만들면',76,900);
    txt+=stamp(t,0,300,900,ink(80,930,'+1',470,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-30}));
    if(t>=0.5) txt+=seal(t,0.5,780,640,'모바일 음반',60,-9,380);
    if(t>=1.6) txt+=stamp(t,1.6,300,1200,ink(90,1180,'실물음반과',100,900)+ink(90,1310,'디지털음반을 함께',100,900));
    return {art:'',txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'실물 음반',150,900,{mis:[9,7]}));
    const e=out(pr(stp(u,12),0.6,1.5));
    art+=cd(300,930,160,tw*2)+label(300,1140,'음반 CD');
    art+=`<g opacity="${e.toFixed(2)}" transform="translate(${((1-e)*120).toFixed(1)},0)">`+pusb(560,880,300,-6)+label(710,1050,'USB 음반')+`</g>`;
    txt+=cap(t,t0+0.5,['음반 CD나 USB 음반을','보다아트에서 만들면'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'앱음반',150,900,{mis:[9,7],fill:DEEP,misc:SAND})+ink(560,560,'이 함께',110,900));
    const e=out(pr(stp(u,12),0.1,1.1));
    art+=`<g transform="translate(0,${((1-e)*260).toFixed(1)})" opacity="${e.toFixed(2)}">`+pphone(420,690,235,{badge:true,p:cl(u/3,0,1),ph:tw*3})+`</g>`;
    if(u>1.5) art+=sparkle(360,760,24)+sparkle(730,1100,22);
    txt+=cap(t,t0+0.5,['스마트 모바일 음반이','함께 따라와요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'공유',150,900,{mis:[9,7],fill:DEEP,misc:SAND})+ink(380,560,'실물 + 디지털',90,900));
    const p=pr(stp(u,15),0.6,1.6);
    art+=cd(290,930,150,tw*2)+label(290,1140,'실물 음반');
    art+=plink(450,640,930,p);
    if(u>=1.1) txt+=seal(t,t0+1.1,545,930,'보다코드',30,0,180);
    art+=pphone(690,720,210,{badge:false,ph:tw*3})+label(795,1165,'모바일 앱음반');
    txt+=cap(t,t0+0.5,['실물음반과 디지털음반의 공유,','보다코드로 하나가 돼요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'더욱더 새롭게',150,900,{mis:[9,7]}));
    art+=pphone(120,690,215,{badge:true,p:cl(u/3,0,1),ph:tw*3});
    const L=[['받은 기기에서','인터넷·서버 없이 재생'],['스트리밍처럼','사라지지 않아요'],['계약 기간 동안','소장하는 앱 음반']];
    L.forEach((l,k)=>{ if(u>0.7+k*0.9){ const y=790+k*130;
      art+=`<circle cx="${450}" cy="${y-14}" r="20" fill="${DEEP}"/><path d="M441 ${y-14} l6 7 l13 -15" fill="none" stroke="#0A0A0A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
      txt+=ink(490,y,l[0],36,700,{ls:-1})+ink(490,y+46,l[1],36,700,{ls:-1}); } });
    txt+=cap(t,t0+0.5,['인터넷·서버 없이 계속 재생,','스트리밍처럼 사라지지 않아요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'시대의 흐름',150,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    art+=cd(220,900,115,tw*2)+pusb(390,900,180,-8)+ink(640,940,'+',110,900,{anchor:'middle',fill:DEEP});
    art+=pphone(760,700,185,{badge:true,ph:tw*3});
    if(u>1.3) art+=sparkle(160,760,24)+sparkle(980,1120,22);
    txt+=cap(t,t0+0.5,['이젠 실물음반 +','디지털 앱음반.'],1296,58);
    return {art,txt};
  }
  // 끝 화면 (홍보용)
  { const t0=S[5],u=t-t0; let a='',x='';
    x+=`<text x="90" y="560" font-size="36" font-weight="800" fill="${DEEP}" letter-spacing="1">보다아트</text>`;
    x+=stamp(t,t0,90,700,ink(90,690,'당신의 앨범을',104,900)+ink(90,822,'더욱더 새롭게',104,900));
    a+=cd(800,1080,150,tw*2.2);
    if(u>0.6) x+=stamp(t,t0+0.6,330,1000,`<rect x="86" y="952" width="600" height="96" rx="48" fill="${DEEP}"/><text x="386" y="1014" font-size="40" font-weight="800" text-anchor="middle" fill="#0A0A0A" letter-spacing="-0.5">음반 제작 문의는 프로필 링크</text>`);
    if(u>1.2){ x+=stamp(t,t0+1.2,90,1240,ink(90,1250,'실물음반 + 디지털 앱음반',64,900));
      x+=`<text x="90" y="1316" font-size="38" font-weight="600" fill="${GREY}" letter-spacing="-0.5">2007년부터 음반을 만듭니다</text>`;
      x+=`<text x="90" y="1410" font-size="38" font-weight="700" fill="${DEEP}" letter-spacing="-0.5">음반 CD · USB 음반 · 스마트 모바일 음반</text>`; }
    return {art:a,txt:x,ruler:false}; }
 }};
