// 케이스의 역사 #2 — 싸바리(표지바리) (20초판, 트렌디판용)
// 사실 근거: bodacd.co.kr/p/ssabari/ (두꺼운 보드를 인쇄지로 감쌈, 2단·3단 케이스, 상·하짝 상자, 자석 상자, 박 4가지, 형압, 코팅 3가지, 영상음반 패키지)
const S=[2.2,5.3,8.4,11.5,14.6,17.0];
function board(x,y,w,h,d,face){        // 두꺼운 보드: 앞면 + 두께
  let g=`<rect x="${x+12}" y="${y+14}" width="${w}" height="${h}" rx="6" fill="${SAND}"/>`;
  g+=`<path d="M${x+w} ${y} l${d} ${d} v${h} l${-d} ${-d} Z" fill="rgba(255,255,255,0.20)"/>`;
  g+=`<path d="M${x} ${y+h} l${d} ${d} h${w} l${-d} ${-d} Z" fill="rgba(255,255,255,0.12)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${face||'rgba(160,160,175,0.30)'}" stroke="${INK}" stroke-width="5"/>`;
  return g;
}
function sheet(x,y,w,h,m){              // 귀퉁이를 따낸 인쇄지 (보드보다 m만큼 큼)
  const p=`M${x} ${y-m} H${x+w} V${y} H${x+w+m} V${y+h} H${x+w} V${y+h+m} H${x} V${y+h} H${x-m} V${y} H${x} Z`;
  return `<path d="${p}" fill="rgba(124,108,255,0.30)"/><path d="${p}" fill="url(#dots)" opacity="0.7"/><path d="${p}" fill="none" stroke="${INK}" stroke-width="4"/>`+
         `<rect x="${x+w*0.12}" y="${y+h*0.62}" width="${w*0.5}" height="${h*0.1}" rx="6" fill="${DEEP}"/>`;
}
function book(x,y,s,n,ti,rot,cdOn){    // 펼친 싸바리 케이스: 보드 n장, ti번째 면에 받침
  const h=s*0.9, gap=14; let g='';
  for(let i=0;i<n;i++){const px=x+i*(s+gap);
    g+=`<rect x="${px+10}" y="${y+12}" width="${s}" height="${h}" rx="8" fill="${SAND}"/>`;
    g+=`<rect x="${px}" y="${y}" width="${s}" height="${h}" rx="8" fill="${i===ti?BEIGE:'rgba(124,108,255,0.22)'}" stroke="${INK}" stroke-width="5"/>`;
    if(i!==ti) g+=`<rect x="${px+s*0.1}" y="${y+h*0.1}" width="${s*0.8}" height="${h*0.8}" fill="url(#dots)" opacity="0.6"/>`;
    if(i<n-1) g+=`<rect x="${px+s}" y="${y+4}" width="${gap}" height="${h-8}" fill="rgba(255,255,255,0.28)"/>`;
    if(i===ti){const cx=px+s/2,cy=y+h/2,r=s*0.38;
      g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${IVORY}" stroke="${INK}" stroke-width="4"/>`;
      for(let k=0;k<8;k++){const a=k*Math.PI/4; g+=`<circle cx="${cx+Math.cos(a)*r*0.2}" cy="${cy+Math.sin(a)*r*0.2}" r="${r*0.07}" fill="none" stroke="${INK}" stroke-width="3"/>`;}
      if(cdOn) g+=cd(cx,cy,r*0.94,rot);
    }
  }
  return g;
}
function foilFill(k){ return ['url(#fgold)','url(#fsilv)','#0B0B10','url(#fholo)'][k]; }
const FOILDEFS=`<defs><linearGradient id="fgold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF1A8"/><stop offset="0.5" stop-color="#E2B33C"/><stop offset="1" stop-color="#9C6B12"/></linearGradient>`+
 `<linearGradient id="fsilv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.5" stop-color="#C9CCD6"/><stop offset="1" stop-color="#7D808C"/></linearGradient>`+
 `<linearGradient id="fholo" x1="0" y1="0" x2="1" y2="0.4"><stop offset="0" stop-color="#FF5FA2"/><stop offset="0.33" stop-color="#C8FF3D"/><stop offset="0.66" stop-color="#2FD3F0"/><stop offset="1" stop-color="#7C6CFF"/></linearGradient></defs>`;
window.EP={cuts:[2.2,8.4,14.6,17.0],beats:[2.2,5.3,8.4,11.5,14.6,17.0],hits:[0.35,11.5],flash:[0.35],
 tag:'케이스의 역사  #2',dur:20,ruler:{years:[],keys:[[0,0],[20,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'보드를 종이로 감싼',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'싸바리',300,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-14}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'표지바리',56,-9,300);
    if(t>=1.0) txt+=stamp(t,1.0,300,1200,ink(90,1180,'단단하고 묵직한',100,900)+ink(90,1310,'음반 상자',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'보드 + 인쇄지',150,900,{mis:[9,7]}));
    const bx=300,by=770,bw=480,bh=320;
    const e1=out(pr(stp(u,12),0.5,1.0)), e2=out(pr(stp(u,12),1.6,2.1));
    if(e2<1) art+=board(bx,by,bw,bh,24);
    if(u>0.5){ const m=60*(1-e2), dy=-(1-e1)*420;
      art+=`<g transform="translate(0,${dy.toFixed(1)})" opacity="${e1.toFixed(2)}">${e2<1?sheet(bx,by,bw,bh,m):''}</g>`; }
    if(e2>=1){ art+=board(bx,by,bw,bh,24,'rgba(124,108,255,0.30)')+`<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="4" fill="url(#dots)" opacity="0.7"/>`+
      `<rect x="${bx+bw*0.12}" y="${by+bh*0.62}" width="${bw*0.5}" height="${bh*0.1}" rx="6" fill="${DEEP}"/>`;
      art+=sparkle(250,760,24)+sparkle(850,1100,22); }
    txt+=cap(t,t0+0.3,['두꺼운 보드를','인쇄한 종이로 감싸 만들어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    const n=u<1.3?2:3, tn=n===2?t0:t0+1.3, s=n===2?390:290, h=s*0.9;
    txt+=stamp(t,tn,200,560,ink(86,560,n+'단',230,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const W=n*s+(n-1)*14, x=540-W/2, y=917-h/2, ti=n===2?1:1;
    const e=out(pr(stp(u-(tn-t0),12),0.1,0.6));
    art+=book(x,y,s,n,ti,tw*2,e>0.2);
    txt+=cap(t,t0+0.3,['책처럼 펼치는 2단,','가운데에 CD를 담는 3단.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    const snap=u>=1.5;
    txt+=stamp(t,snap?t0+1.5:t0,90,560,ink(86,560,snap?'자석':'상자',230,900,{mis:[9,7],fill:snap?DEEP:INK}));
    const e1=out(pr(stp(u,12),0.3,0.9)), e2=pr(stp(u,15),1.5,1.75);
    const lift=150*e1*(1-e2*e2), tilt=-7*e1*(1-e2);
    // 안에 든 것 (뚜껑이 열리면 보임)
    art+=`<g transform="rotate(-8 640 905)"><rect x="595" y="830" width="96" height="140" rx="8" fill="${IVORY}" stroke="${INK}" stroke-width="4"/><rect x="607" y="842" width="72" height="88" rx="4" fill="url(#dots)"/></g>`;
    art+=cd(455,915,82,tw*2);
    // 몸통
    art+=board(285,900,510,210,22,'rgba(124,108,255,0.26)')+`<rect x="285" y="900" width="510" height="210" fill="url(#dots)" opacity="0.55"/>`;
    // 뚜껑
    art+=`<g transform="translate(0,${(-lift).toFixed(1)}) rotate(${tilt.toFixed(2)} 540 855)">`+board(270,810,540,92,18,'rgba(160,160,175,0.34)')+
      `<rect x="420" y="836" width="240" height="40" rx="8" fill="${DEEP}"/></g>`;
    if(snap){ art+=`<circle cx="330" cy="902" r="12" fill="${DEEP}"/><circle cx="750" cy="902" r="12" fill="${DEEP}"/>`;
      if(u>1.75) art+=sparkle(240,860,24)+sparkle(860,1080,22); }
    txt+=cap(t,t0+0.3,['뚜껑과 몸통이 나뉜 상자,','자석으로 여닫는 상자도 있어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,330,560,ink(84,600,'박',230,900,{mis:[9,7]})+ink(330,600,'4가지',150,900,{fill:DEEP}));
    const k=Math.max(0,Math.min(3,Math.floor((u-0.3)/0.55)));
    art+=FOILDEFS+board(150,725,440,400,24,'rgba(124,108,255,0.24)');
    if(u>0.3){
      art+=`<rect x="210" y="800" width="320" height="76" rx="10" fill="${foilFill(k)}"${k===2?` stroke="rgba(255,255,255,0.5)" stroke-width="2"`:''}/>`;
      art+=`<circle cx="370" cy="1010" r="58" fill="${foilFill(k)}"${k===2?` stroke="rgba(255,255,255,0.5)" stroke-width="2"`:''}/>`;
      const p=pr(u-0.3-k*0.55,0.05,0.45);
      if(p>0&&p<1) art+=`<clipPath id="fsh"><rect x="210" y="800" width="320" height="76" rx="10"/><circle cx="370" cy="1010" r="58"/></clipPath><g clip-path="url(#fsh)"><rect x="${120+p*520}" y="700" width="60" height="420" fill="#FFFFFF" opacity="0.75" transform="skewX(-20)"/></g>`;
    }
    const L=['금박','은박','먹박','홀로그램'];
    L.forEach((l,i)=>{ const y=760+i*96, on=u>0.3&&i===k, w=l.length*40+60;
      art+=`<rect x="660" y="${y}" width="${w}" height="70" rx="35" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`;
      txt+=`<text x="${660+w/2}" y="${y+48}" font-size="38" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':(u>0.3+i*0.55?INK:GREY)}" letter-spacing="-0.5">${l}</text>`; });
    txt+=cap(t,t0+0.3,['제목과 로고에','금박·은박·먹박·홀로그램.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    const coat=u>=1.2;
    txt+=stamp(t,coat?t0+1.2:t0,90,560,ink(86,560,coat?'코팅':'형압',230,900,{mis:[9,7],fill:coat?DEEP:INK}));
    art+=board(150,745,420,380,24,'rgba(124,108,255,0.24)');
    const e=out(pr(stp(u,12),0.2,0.7));
    // 형압: 눌러 올린 동그라미 + 글자 줄 (빛 받는 쪽 밝게, 반대쪽 그림자)
    const cx=360,cy=900,r=86;
    art+=`<circle cx="${cx+5*e}" cy="${cy+6*e}" r="${r}" fill="rgba(0,0,0,${(0.55*e).toFixed(2)})"/>`;
    art+=`<circle cx="${cx-3*e}" cy="${cy-3*e}" r="${r}" fill="rgba(124,108,255,0.35)"/>`;
    art+=`<path d="M${cx-r*0.85} ${cy-r*0.4} A${r} ${r} 0 0 1 ${cx+r*0.4} ${cy-r*0.85}" fill="none" stroke="rgba(255,255,255,${(0.8*e).toFixed(2)})" stroke-width="6" stroke-linecap="round"/>`;
    for(let j=0;j<2;j++) art+=`<rect x="${240-2*e}" y="${1030+j*40-2*e}" width="${240-j*80}" height="16" rx="8" fill="rgba(255,255,255,${(0.25+0.4*e).toFixed(2)})"/>`;
    if(coat){ const p=pr(stp(u,12),1.2,1.9);
      art+=`<clipPath id="csh"><rect x="150" y="745" width="420" height="380"/></clipPath><g clip-path="url(#csh)"><rect x="${40+p*560}" y="640" width="80" height="600" fill="${IVORY}" opacity="0.85" transform="skewX(-20)"/></g>`;
      ['무광','유광','벨벳'].forEach((l,i)=>{ if(u>1.35+i*0.2){ const y=790+i*100;
        art+=`<rect x="660" y="${y}" width="180" height="70" rx="35" fill="rgba(255,255,255,0.08)" stroke="${DEEP}" stroke-width="2"/>`;
        txt+=`<text x="750" y="${y+48}" font-size="38" font-weight="800" text-anchor="middle" fill="${INK}" letter-spacing="-0.5">${l}</text>`; } });
      if(u>1.9) art+=sparkle(140,760,24)+sparkle(600,1110,22); }
    txt+=cap(t,t0+0.25,['눌러서 요철을 만드는 형압,','무광·유광·벨벳 코팅까지.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'영상이 나오는','음반',tw),{ruler:false});
 }};
