// 한 장의 여행 #2 — 마스터링 (20초판 v4, 숫자 먼저 훅)
const S=[2.2,5.3,8.4,11.5,14.6,17.0];
function sampled(x0,cy,w,amp,p){
  const f=q=>cy-amp*Math.sin(q*Math.PI*3)*(0.6+0.4*Math.sin(q*Math.PI*1.3));
  let d='';const n=80;
  for(let i=0;i<=n;i++){const x=x0+w*i/n;d+=(i?' L':'M')+x.toFixed(1)+' '+f(i/n).toFixed(1);}
  let g=`<line x1="${x0}" y1="${cy}" x2="${x0+w}" y2="${cy}" stroke="${INK}" stroke-width="3"/>`;
  g+=`<path d="${d}" fill="none" stroke="${TAUPE}" stroke-width="7" stroke-linecap="round"/>`;
  const m=30,k=Math.floor(m*p);
  for(let i=0;i<k;i++){const q=(i+0.5)/m,x=x0+w*q,y=f(q);
    g+=`<line x1="${x}" y1="${cy}" x2="${x}" y2="${y}" stroke="${INK}" stroke-width="6"/><circle cx="${x}" cy="${y}" r="9" fill="${DEEP}"/>`;}
  return g;
}
window.EP={cuts:[2.2,8.4,14.6,17.0],beats:[2.2,5.3,8.4,11.5,14.6,17.0],hits:[0.35,7.1],flash:[0.35],
 tag:'한 장의 여행  #2',dur:20,ruler:{years:[],keys:[[0,0],[20,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'CD 한 장에 담기는 곡',84,900);
    txt+=stamp(t,0,300,900,ink(80,930,'99',470,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-20})+ink(640,930,'곡',190,900,{mis:[8,6],fill:DEEP,misc:SAND}));
    if(t>=0.35) txt+=seal(t,0.35,850,640,'최대',64,-9,210);
    if(t>=1.0){ txt+=stamp(t,1.0,300,1180,ink(90,1180,'그 번호는',100,900)+ink(90,1310,'누가 붙일까?',100,900)); }
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=word(t,t0,'마스터');
    art+=wave(110,930,330,190,tw*5);
    for(let k=0;k<3;k++) art+=`<path d="M${470+k*24} 905 l22 25 l-22 25" fill="none" stroke="${DEEP}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
    const e=out(pr(stp(u,12),0.3,0.9));
    if(u>0.3){ art+=cd(780,930,60+e*120,tw*2,{plain:true,fill:SAND}); txt+=ink(780,1150,'원본',34,800,{anchor:'middle',fill:DEEP}); }
    txt+=ink(275,1150,'음원 파일',34,800,{anchor:'middle'});
    txt+=cap(t,t0+0.24,['공장에 보내기 전에','규격에 맞춘 원본을 만들어요.','곡 순서도 여기서 정해요.'],1232,56);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    const q=pr(stp(u,15),0.3,1.8), n=Math.max(1,Math.round(1+98*q*q));
    const nn=String(n).padStart(2,'0');
    txt+=stamp(t,u>=1.8?t0+1.8:t0,260,500,ink(84,610,nn,300,900,{mis:[9,7],fill:DEEP,misc:SAND,ls:-12}));
    txt+=ink(470,600,'번 트랙',110,900);
    art+=cd(540,950,180,tw*2);
    for(let j=0;j<n;j++){const a=-Math.PI/2+2*Math.PI*j/99, r1=200, r2=j%10===0?240:226;
      art+=`<line x1="${540+r1*Math.cos(a)}" y1="${950+r1*Math.sin(a)}" x2="${540+r2*Math.cos(a)}" y2="${950+r2*Math.sin(a)}" stroke="${j===n-1?DEEP:INK}" stroke-width="${j===n-1?7:4}" stroke-linecap="round"/>`;}
    txt+=cap(t,t0+0.3,['곡이 시작되는 자리마다','번호를 붙여요. 최대 99번.'],1296,58);
    txt+=src('CD 표준 규격(레드북) 기준');
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=ink(90,400,'1초에',64,800,{fill:DEEP});
    txt+=stamp(t,t0,90,600,ink(84,600,roll(t,t0,'44,100',0.5),210,900,{mis:[9,7],ls:-8}));
    txt+=ink(800,600,'번',120,900);
    art+=sampled(130,940,820,170,pr(stp(u,12),0.3,1.9));
    txt+=ink(990,1180,'44.1kHz · 16bit',40,800,{anchor:'end',fill:DEEP,ls:0});
    txt+=cap(t,t0+0.3,['소리를 아주 잘게 나눠','숫자로 기록해요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=word(t,t0,'ISRC');
    const B=[['KR','나라',150],['○○○','등록자',210],['26','연도',150],['00001','번호',300]];
    let x=90;
    B.forEach((b,k)=>{ const on=u>0.3+k*0.25;
      if(on){ art+=box(x,820,b[2],140,k===3?ROSE:BEIGE);
        txt+=stamp(t,t0+0.3+k*0.25,x+b[2]/2,890,ink(x+b[2]/2,915,b[0],64,900,{anchor:'middle',ls:0}));
        txt+=ink(x+b[2]/2,1030,b[1],36,800,{anchor:'middle',fill:DEEP}); }
      x+=b[2]+30; });
    txt+=cap(t,t0+0.4,['곡마다 고유 번호(ISRC)도','함께 넣을 수 있어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,610,ink(84,610,roll(t,t0,'74'),300,900,{mis:[9,7],ls:-12})+ink(440,600,'분',150,900));
    if(u>=1.0) txt+=stamp(t,t0+1.0,800,560,ink(640,580,'→ 80분',90,900,{fill:DEEP,ls:-2}));
    const fr=u>=1.0?1:74/80, R=210, C=2*Math.PI*R;
    art+=cd(540,960,165,tw*2);
    art+=`<circle cx="540" cy="960" r="${R}" fill="none" stroke="${SAND}" stroke-width="16"/>`;
    art+=`<circle cx="540" cy="960" r="${R}" fill="none" stroke="${DEEP}" stroke-width="16" stroke-dasharray="${C*fr*pr(stp(u,12),0,0.6)} ${C}" transform="rotate(-90 540 960)"/>`;
    txt+=cap(t,t0+0.2,['처음 규격은 74분.','지금은 80분 가까이 담아요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'두 번째 관문,','유리 원판',tw),{ruler:false});
 }};
