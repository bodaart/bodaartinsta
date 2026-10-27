// 보다뮤직 이야기 #2 — 보다뮤직이 뭐냐면 (20초판, 트렌디판용)
// 사실 근거: bodamusic.kr(보다아트가 만든 스마트 앨범 앱, 보다코드 기반, 모든 장르, 실물 음반과 함께 또는 앱 음반만 따로(100% 모바일 음반),
//           친환경 스마트앨범, 샘플 음반 《보이는 마음》 무료 듣기). 가격·이용료·개월 수는 쓰지 않음. 영구·평생 소장 금지. QR·NFC 금지.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];   // 장면 4.4초(내레이션용 26초판)
function pill3(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function leaf(cx,cy,s,rot){
  return `<g transform="rotate(${rot||0} ${cx} ${cy})"><path d="M${cx} ${cy+s*0.5} C${cx-s*0.7} ${cy} ${cx-s*0.3} ${cy-s*0.7} ${cx+s*0.1} ${cy-s*0.55} C${cx+s*0.7} ${cy-s*0.3} ${cx+s*0.4} ${cy+s*0.4} ${cx} ${cy+s*0.5} Z" fill="${DEEP}" opacity="0.9"/>`+
         `<path d="M${cx} ${cy+s*0.45} Q${cx+s*0.05} ${cy-s*0.1} ${cx+s*0.1} ${cy-s*0.5}" fill="none" stroke="#0A0A0A" stroke-width="3" opacity="0.6"/></g>`;
}
function genre(x,y,str,on){ const w=str.length*32+54;
  return `<rect x="${x}" y="${y}" width="${w}" height="68" rx="34" fill="${on?'rgba(200,255,61,0.9)':'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.3)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+46}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,11.4],flash:[0.35],
 tag:'보다뮤직 이야기  #2',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'보다아트가 만든',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'보다뮤직',260,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-12}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'앱',56,-9,140);
    if(t>=1.0) txt+=stamp(t,1.0,300,1200,ink(90,1180,'폰에 담는',100,900)+ink(90,1310,'스마트 앨범',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'앱 음반',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.7,1.2));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(0,${((1-e1)*80).toFixed(1)})">`+pphone(430,700,220,{ph:tw*6,badge:true,p:0.5})+`</g>`;
    if(u>0.7){ art+=`<g opacity="${e2.toFixed(2)}">`+pill3(130,820,'앨범 아트',false)+pill3(130,900,'곡 목록',false)+pill3(130,980,'소개·사진',false)+`</g>`; }
    if(u>1.3) art+=`<g opacity="${out(pr(stp(u,12),1.3,1.8)).toFixed(2)}">`+pill3(720,860,'보다코드로',true)+pill3(720,940,'받아요',true)+`</g>`;
    txt+=cap(t,t0+0.3,['음반 한 장이 통째로 앱에 들어와요.','표지, 곡, 소개, 사진까지.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'어떤 장르든',200,900,{mis:[9,7]}));
    const L=[['트로트',150,760],['발라드',460,760],['아이돌',720,760],['CCM',150,860],['국악',400,860],['재즈',600,860],['OST',790,860],['인디',150,960],['클래식',400,960],['힙합',680,960]];
    L.forEach((g,i)=>{ const on=u>0.3+i*0.14; if(u>0.15+i*0.14) art+=`<g opacity="${out(pr(stp(u,12),0.15+i*0.14,0.45+i*0.14)).toFixed(2)}">`+genre(g[1],g[2],g[0],on&&(i%3===0))+`</g>`; });
    for(let i=0;i<5;i++){ if(u>0.8+i*0.25) art+=note(200+i*160,1100+(i%2)*20,60,i%2?DEEP:'rgba(255,255,255,0.8)'); }
    txt+=cap(t,t0+0.3,['트로트부터 아이돌, CCM까지.','어떤 음반이든 앱 음반이 돼요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'같이',150,900,{mis:[9,7]})+ink(360,560,'또는',110,900,{fill:GREY})+ink(620,560,'따로',150,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),1.2,1.7));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+cd(195,900,95,tw*2)+`<text x="300" y="925" font-size="60" font-weight="900" fill="${DEEP}">+</text>`+pphone(350,760,150,{ph:tw*6,p:0.5})+`</g>`;
    art+=`<line x1="580" y1="740" x2="580" y2="1100" stroke="rgba(255,255,255,0.25)" stroke-width="2" stroke-dasharray="8 10"/>`;
    if(u>1.2) art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+pphone(700,740,160,{ph:tw*6,badge:true,p:0.7})+`</g>`+(u>1.7?pill3(650,1090,'앱 음반만',true):'');
    txt+=cap(t,t0+0.3,['실물 음반과 같이 내도 되고,','앱 음반만 따로 내도 돼요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'플라스틱',150,900,{mis:[9,7]})+ink(640,560,'없이',150,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.6));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(0,${((1-e1)*80).toFixed(1)})">`+pphone(430,700,220,{ph:tw*6,badge:true,p:0.6})+`</g>`;
    [[230,800,70,-20],[180,960,55,15],[820,790,70,25],[870,980,55,-15]].forEach((l,i)=>{ if(u>0.5+i*0.2) art+=`<g opacity="${out(pr(stp(u,12),0.5+i*0.2,0.9+i*0.2)).toFixed(2)}">`+leaf(l[0],l[1],l[2],l[3])+`</g>`; });
    if(u>1.5) art+=pill3(680,1090,'친환경 스마트 앨범',true);
    txt+=cap(t,t0+0.3,['케이스도 포장도 없는','친환경 스마트 앨범이에요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'무료 샘플',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.8,1.3));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+pphone(250,700,220,{ph:tw*6,p:0.3})+`</g>`;
    if(u>0.8){ art+=`<g opacity="${e2.toFixed(2)}">`+pill3(560,790,'보이는 마음',true)+pill3(560,870,'아티스트 보다',false)+pill3(560,950,'앱에서 무료',false)+`</g>`; }
    if(u>1.4) art+=sparkle(520,760,24)+sparkle(960,1120,22);
    txt+=cap(t,t0+0.3,['샘플 음반 《보이는 마음》은','앱에서 무료로 들어볼 수 있어요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'영상이 나오는','음반',tw),{ruler:false});
 }};
