// 케이스의 역사 #2 — 디지팩 (20초판 v4, 숫자 먼저 훅)
const S=[2.2,5.3,8.4,11.5,14.6,17.0];
function digi(x,y,s,n,o={}){        // 펼친 디지팩: n면, o.tray번째 면에 받침
  const h=s*0.88, ti=o.tray===undefined?1:o.tray;
  let g=`<rect x="${x+8}" y="${y+7}" width="${s*n}" height="${h}" rx="5" fill="${SAND}"/>`;
  for(let i=0;i<n;i++){const px=x+i*s;
    g+=`<rect x="${px}" y="${y}" width="${s}" height="${h}" fill="${i===0?BEIGE:IVORY}"/>`;
    if(i===0) g+=`<rect x="${px+s*0.1}" y="${y+h*0.1}" width="${s*0.8}" height="${h*0.8}" fill="url(#dots)"/>`;
    if(i>0) g+=`<line x1="${px}" y1="${y}" x2="${px}" y2="${y+h}" stroke="${INK}" stroke-width="3" stroke-dasharray="10 8"/>`;
    if(i===ti){const cx=px+s/2,cy=y+h/2,r=s*0.38;
      g+=`<circle cx="${cx+5}" cy="${cy+4}" r="${r}" fill="${o.paper?TAUPE:SAND}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.paper?BEIGE:F4}" stroke="${INK}" stroke-width="5"/>`;
      if(o.paper) for(let k=0;k<14;k++){const a=rnd(k)*6.28,rr=r*(0.45+rnd(k+9)*0.45); g+=`<line x1="${cx+rr*Math.cos(a)}" y1="${cy+rr*Math.sin(a)}" x2="${cx+rr*Math.cos(a)+10}" y2="${cy+rr*Math.sin(a)+4}" stroke="${TAUPE}" stroke-width="3" stroke-linecap="round"/>`;}
      for(let k=0;k<8;k++){const a=k*Math.PI/4; g+=`<circle cx="${cx+Math.cos(a)*r*0.2}" cy="${cy+Math.sin(a)*r*0.2}" r="${r*0.07}" fill="none" stroke="${INK}" stroke-width="3"/>`;}
      if(o.cd) g+=cd(cx+(o.cdx||0),cy+(o.cdy||0),r*0.94,o.rot||0);
    }
  }
  g+=`<rect x="${x}" y="${y}" width="${s*n}" height="${h}" rx="5" fill="none" stroke="${INK}" stroke-width="6"/>`;
  return g;
}
function shut(x,y,s,rot){             // 닫힌 디지팩 (앞표지)
  const h=s*0.88, cx=x+s/2, cy=y+h/2;
  return `<g transform="rotate(${rot||0} ${cx} ${cy})"><rect x="${x+8}" y="${y+7}" width="${s}" height="${h}" rx="5" fill="${SAND}"/><rect x="${x}" y="${y}" width="${s}" height="${h}" fill="${BEIGE}"/><rect x="${x+s*0.1}" y="${y+h*0.1}" width="${s*0.8}" height="${h*0.8}" fill="url(#dots)"/><rect x="${x}" y="${y}" width="${s}" height="${h}" rx="5" fill="none" stroke="${INK}" stroke-width="6"/><line x1="${x+s*0.05}" y1="${y}" x2="${x+s*0.05}" y2="${y+h}" stroke="${INK}" stroke-width="3"/></g>`;
}
window.EP={cuts:[2.2,8.4,14.6,17.0],beats:[2.2,5.3,8.4,11.5,14.6,17.0],hits:[0.35],flash:[0.35],
 tag:'케이스의 역사  #2',dur:20,ruler:{years:[],keys:[[0,0],[20,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'부러질 경첩이',96,900);
    txt+=stamp(t,0,250,900,ink(80,930,'0',470,900,{mis:[12,9],fill:DEEP,misc:SAND})+ink(380,930,'개',190,900,{mis:[8,6],fill:DEEP,misc:SAND}));
    if(t>=0.35) txt+=seal(t,0.35,790,760,'종이',84,-9,260);
    if(t>=1.0) txt+=stamp(t,1.0,300,1200,ink(84,1260,'디지팩',190,900,{mis:[10,8]}));
    if(t>=1.4) txt+=ink(990,1360,'digipak',56,800,{anchor:'end',ls:0,fill:DEEP});
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'종이 + 받침',150,900,{mis:[9,7]}));
    const e=out(pr(stp(u,12),0.4,1.1));
    art+=digi(150,760,390,2,{cd:u>0.4,cdy:-(1-e)*360,rot:tw*2});
    txt+=cap(t,t0+0.3,['두꺼운 종이를 접은 겉면에','CD 받침(트레이)을 붙였어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    const n=u<0.9?2:u<1.7?3:4, tn=n===2?t0:n===3?t0+0.9:t0+1.7, s=Math.min(390,880/n);
    txt+=stamp(t,tn,200,560,ink(86,560,n+'단',230,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    art+=digi(540-n*s/2,980-s*0.44,s,n,{cd:true,rot:tw*2});
    txt+=cap(t,t0+0.3,['펼치는 면을 늘려서','2단, 3단, 4단으로도 만들어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(84,560,roll(t,t0,'2000'),230,900,{mis:[9,7],ls:-10})+ink(668,560,'년대',120,900));
    const e=out(pr(stp(u,12),0.3,1.0));
    art+=shut(170+(1-e)*60,800,330,-8)+shut(380,760+(1-e)*40,330,4)+shut(590-(1-e)*60,820,330,10);
    if(u>1.0) art+=sparkle(170,760,24)+sparkle(940,800,22);
    txt+=cap(t,t0+0.3,['2000년대 초부터','음반사들이 많이 쓰기 시작했어요.'],1296,58);
    txt+=src('출처: 위키백과 Digipak');
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    const coat=u>=1.5;
    txt+=stamp(t,coat?t0+1.5:t0,90,560,ink(86,560,coat?'코팅':'긁힘',230,900,{mis:[9,7],fill:coat?DEEP:INK}));
    art+=shut(330,740,420,0);
    const L=[[400,800,560,900],[620,780,700,880],[460,960,640,1010],[580,1000,720,1080]];
    L.forEach((l,k)=>{ if(u>0.3+k*0.3 && !coat) art+=`<line x1="${l[0]}" y1="${l[1]}" x2="${l[2]}" y2="${l[3]}" stroke="${DEEP}" stroke-width="6" stroke-linecap="round"/>`; });
    if(coat){ const p=pr(stp(u,12),1.5,2.3);
      art+=`<clipPath id="sh"><rect x="330" y="740" width="420" height="370"/></clipPath><g clip-path="url(#sh)"><rect x="${200+p*600}" y="640" width="70" height="600" fill="${IVORY}" opacity="0.8" transform="skewX(-20)"/></g>`;
      art+=sparkle(300,760,24)+sparkle(790,1080,26); }
    txt+=cap(t,t0+0.3,['종이라 긁히기 쉬워서','겉면에 코팅을 입혀요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'받침도 종이',150,900,{mis:[9,7]}));
    art+=digi(150,780,390,2,{paper:true});
    if(u>0.6) txt+=ink(735,1180,'종이 · 사탕수수',36,800,{anchor:'middle',fill:DEEP});
    txt+=cap(t,t0+0.2,['요즘은 받침까지','종이로 만들기도 해요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'두꺼운 종이 상자,','싸바리',tw),{ruler:false});
 }};
