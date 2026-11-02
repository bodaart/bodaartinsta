// 80년대생 #1 — 공CD 굽던 밤 (26초 내레이션판, 트렌디판용, 세대 감성)
// 소재: 공CD(700MB·80분), 굽는 동안 숨 참기(끊기면 한 장 날림), 버스에서 튀던 CDP, 앨범 사서 가사집 넘기기 → 소량 CD 제작으로 연결. 연도·가격 숫자는 안 씀.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];
function pillr(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function blankcd(cx,cy,r,rot){ // 공CD: 은빛, 라벨 없음
  let g=`<ellipse cx="${cx}" cy="${cy+r*0.9}" rx="${r*0.8}" ry="${r*0.12}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#D9D9E2" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#artg)" opacity="0.35"/>`;
  const ga=-rot*0.6-0.9, ri=r*0.3, ro=r*0.97;
  g+=`<path d="M${cx+ri*Math.cos(ga-0.3)} ${cy+ri*Math.sin(ga-0.3)} L${cx+ro*Math.cos(ga-0.18)} ${cy+ro*Math.sin(ga-0.18)} A${ro} ${ro} 0 0 1 ${cx+ro*Math.cos(ga+0.18)} ${cy+ro*Math.sin(ga+0.18)} L${cx+ri*Math.cos(ga+0.3)} ${cy+ri*Math.sin(ga+0.3)} Z" fill="#FFFFFF" opacity="0.45"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.28}" fill="rgba(255,255,255,0.5)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="${r*0.12}" fill="#0A0A10"/>`;
  return g;
}
function monitor(x,y,w,prog,o={}){ // 옛날 모니터 + 굽기 진행 창
  const h=w*0.78;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="16" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#D8D3C8" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.06}" y="${y+h*0.07}" width="${w*0.88}" height="${h*0.72}" rx="8" fill="#0F1C3A"/>`;
  const wx=x+w*0.14, wy=y+h*0.22, ww=w*0.72, wh=h*0.42;
  g+=`<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="4" fill="#ECECEC"/><rect x="${wx}" y="${wy}" width="${ww}" height="${wh*0.18}" rx="4" fill="#1F3C8C"/>`;
  g+=`<text x="${wx+10}" y="${wy+wh*0.13}" font-size="${w*0.035}" font-weight="700" fill="#FFFFFF">${esc(o.title||'CD 굽는 중...')}</text>`;
  g+=`<rect x="${wx+ww*0.08}" y="${wy+wh*0.42}" width="${ww*0.84}" height="${wh*0.2}" fill="#FFFFFF" stroke="#888" stroke-width="1.5"/>`;
  const n=18; for(let i=0;i<n;i++){ if(i/n<prog) g+=`<rect x="${wx+ww*0.08+4+i*(ww*0.84-8)/n}" y="${wy+wh*0.42+4}" width="${(ww*0.84-8)/n-3}" height="${wh*0.2-8}" fill="#1F3C8C"/>`; }
  g+=`<text x="${wx+ww/2}" y="${wy+wh*0.85}" font-size="${w*0.04}" font-weight="700" text-anchor="middle" fill="#222">${Math.round(prog*100)}%</text>`;
  g+=`<rect x="${x+w*0.4}" y="${y+h}" width="${w*0.2}" height="${h*0.08}" fill="#C9C4B8"/><rect x="${x+w*0.3}" y="${y+h*1.08}" width="${w*0.4}" height="${h*0.04}" rx="4" fill="#C9C4B8"/>`;
  return g;
}
function cdp(x,y,w,tw,o={}){ const h=w*0.9, cx=x+w/2, cy=y+h*0.5;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="${w*0.45}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w*0.45}" fill="#2A2A36" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${w*0.36}" fill="#0A0A10" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`;
  g+=cd(cx,cy,w*0.3,tw*4);
  g+=`<rect x="${x+w*0.2}" y="${y+h*0.88}" width="${w*0.6}" height="${h*0.08}" rx="6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  if(o.skip){ g+=`<text x="${cx+w*0.5}" y="${y+h*0.2}" font-size="${w*0.16}" font-weight="900" fill="${DEEP}" transform="rotate(12 ${cx+w*0.5} ${y+h*0.2})">툭!</text>`; }
  return g;
}
function booklet(x,y,w,open){ const h=w*1.0;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w*(1+open)}" height="${h}" rx="6" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#artg)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  if(open>0.05){ g+=`<rect x="${x+w}" y="${y}" width="${w*open}" height="${h}" rx="6" fill="#F4EEE4" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
    for(let i=0;i<7;i++) g+=`<rect x="${x+w+w*0.1}" y="${y+h*0.15+i*h*0.1}" width="${w*open*0.8*(i%3?0.7:0.5)}" height="${h*0.035}" rx="3" fill="rgba(43,35,32,0.35)"/>`; }
  return g;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,7.0],flash:[0.35],
 tag:'80년대생  #1',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'좋아하는 노래만 골라',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'공CD',300,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-14}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'80년대생',56,-9,330);
    if(t>=1.0) txt+=stamp(t,1.0,300,1140,ink(90,1180,'한 장 굽는 데',100,900)+ink(90,1310,'밤을 새우던 날',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'공CD',150,900,{mis:[9,7],fill:DEEP,misc:SAND})+ink(460,560,'한 장',150,900));
    const e1=out(pr(stp(u,12),0.1,0.7));
    art+=PDEFS+`<g opacity="${e1.toFixed(2)}" transform="scale(${(0.6+0.4*e1).toFixed(3)})" transform-origin="540 920">`+blankcd(540,920,200,tw*2)+`</g>`;
    if(u>1.2) art+=pillr(130,1140,'칠백 메가',true)+pillr(400,1140,'팔십 분',false);
    if(u>2.0) art+=pillr(640,1140,'곡 순서가 고민',true);
    txt+=cap(t,t0+0.3,['공CD 한 장에 팔십 분.','곡 순서 정하는 게 제일 오래 걸렸죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'굽는 중',200,900,{mis:[9,7]}));
    const p=cl(u/3.6,0,1);
    art+=PDEFS+monitor(260,680,560,p);
    if(u>0.8&&u<3.4) art+=pillr(640,1140,'건드리면 안 돼',true);
    if(u>3.5) art+=pillr(640,1140,'휴… 성공',true)+sparkle(960,1120,24);
    txt+=cap(t,t0+0.3,['굽다가 끊기면 한 장 날아가요.','숨 참고 기다렸죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'튀던',150,900,{mis:[9,7]})+ink(380,560,'CDP',150,900,{fill:DEEP}));
    const sk=(u>1.0&&u<1.3)||(u>2.4&&u<2.7);
    const jx=sk?Math.sin(tw*60)*14:0, jy=sk?Math.cos(tw*50)*10:0;
    art+=PDEFS+`<g transform="translate(${jx.toFixed(1)},${jy.toFixed(1)})">`+cdp(300,760,440,tw,{skip:sk})+`</g>`;
    if(u>3.0) art+=pillr(120,1140,'가방 꼭 안고',true);
    txt+=cap(t,t0+0.3,['버스에서 툭하면 튀던 CDP.','가방을 꼭 안고 들었어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'가사집',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const op=pr(stp(u,12),0.6,2.0);
    art+=PDEFS+booklet(180,760,330,op);
    if(u>2.2) art+=cd(820,1080,110,tw*2);
    if(u>2.8) art+=pillr(120,1140,'한 줄 한 줄 따라 부르며',true);
    txt+=cap(t,t0+0.3,['좋아하는 가수 앨범은 꼭 사서,','가사집 넘기며 들었죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'그때 그 느낌',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.6,1.1));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+blankcd(230,930,130,tw*2)+`</g>`;
    if(u>0.4) art+=`<text x="470" y="960" font-size="70" font-weight="900" text-anchor="middle" fill="${DEEP}">→</text>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+cd(700,930,130,tw*2)+booklet(820,840,120,0)+`</g>`;
    if(u>1.4) art+=pillr(120,1140,'이백 장까지 소량',true)+pillr(480,1140,'자켓·책자까지',false);
    txt+=cap(t,t0+0.3,['그때 그 느낌 그대로, 이젠 정식 음반으로.','보다아트는 이백 장까지 소량으로 만들어요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'70년대생 편','라디오 녹음하던 밤',tw),{ruler:false});
 }};
