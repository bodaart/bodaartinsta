// 9편 — 그런데 왜 다시 음반일까
window.EP={tag:'CD의 근본  #9',dur:29,
 ruler:{years:[[2012,0],[2022,0.5],[2023,1]],keys:[[3.2,0],[8.2,0],[9.0,0.5],[14.2,0.5],[15.0,1],[29,1]]},
 scene(t,tw){
  let art='',txt='';
  if(t<3.2){
    txt+=ink(90,560,'스트리밍 시대에',108,900);
    txt+=ink(90,700,'한국 음반이',108,900);
    txt+=ink(90,840,'한 해에',108,900);
    if(t>=0.9) txt+=stamp(t,0.9,300,1180,ink(84,1230,'1억 장',290,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=2.0) txt+=stamp(t,2.0,860,1330,ink(990,1340,'넘게 팔렸어요 · 2023',48,800,{anchor:'end',ls:-1}));
    return {art,txt,ruler:false};
  }
  if(t<8.2){ const u=t-3.2;
    txt+=year(t,3.2,'2012');
    const base=1150;
    art+=ground(base);
    art+=factory(120,base,500);
    art+=smoke(545,base-500*0.42-500*0.16*1.5-20,Math.floor(tw*12));
    for(let i=0;i<3;i++){const ph=((tw*0.5+i*0.33)%1);const x=640+ph*330; if(u>0.6) art+=lp(x,base-62,56,tw*3+i)}
    if(u>1.4) txt+=seal(t,3.2+1.4,760,760,'8년 만에',54,-7,330);
    txt+=cap(t,3.2+0.9,['문 닫았던 한국의 LP 공장이','다시 생겼어요.'],1290,58);
    return {art,txt,ruler:true};
  }
  if(t<14.2){ const u=t-8.2;
    txt+=year(t,8.2,'2022');
    const base=1140, g=out(pr(stp(u,10),0.6,2.4));
    art+=ground(base);
    art+=bar(190,base-3,250,410*g,TAUPE);
    art+=bar(630,base-3,250,330*g,ROSE);
    txt+=ink(315,base+52,'LP',44,900,{anchor:'middle',ls:1});
    txt+=ink(755,base+52,'CD',44,900,{anchor:'middle',ls:1});
    if(u>2.5){
      txt+=stamp(t,8.2+2.5,315,700,ink(315,712,'4,100만 장',46,800,{anchor:'middle',ls:-1,fill:DEEP}));
      txt+=stamp(t,8.2+2.8,755,780,ink(755,792,'3,300만 장',46,800,{anchor:'middle',ls:-1}));
    }
    txt+=cap(t,8.2+3.2,['미국에서 LP가 CD보다','많이 팔렸어요. 35년 만에.'],1290,60);
    txt+=src('미국 연간 판매량 · RIAA 집계');
    return {art,txt,ruler:true};
  }
  if(t<20.0){ const u=t-14.2;
    txt+=year(t,14.2,'2023');
    const n=Math.round(116000000*out(pr(stp(u,15),0.5,2.8)));
    txt+=ink(990,820,n.toLocaleString('en-US'),118,900,{anchor:'end',ls:-4,mis:[8,6]});
    txt+=ink(990,900,'장',64,800,{anchor:'end'});
    if(u>2.9) txt+=seal(t,14.2+2.9,330,1010,'1억 1,600만 장',50,-5,470);
    art+=cd(150,760,58,tw*2.6);
    txt+=cap(t,14.2+3.2,['한국 음반 판매가 처음으로','한 해 1억 장을 넘었어요.'],1290,58);
    txt+=src('써클차트 톱400 · 2023년 1~11월');
    return {art,txt,ruler:true};
  }
  if(t<26.0){ const u=t-20.0;
    txt+=stamp(t,20.0,90,560,ink(84,590,'소장',280,900,{mis:[10,8]}));
    art+=phone(150,700,190);
    art+=`<path d="M218 840 L218 920 L288 880 Z" fill="${TAUPE}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
    txt+=ink(245,1120,'듣는 건',36,700,{anchor:'middle',fill:GREY});
    if(u>0.8){
      art+=cd(800,900,150,tw*2);
      art+=`<rect x="470" y="745" width="330" height="291" fill="${F4}"/>`+jewel(470,745,330);
      txt+=ink(655,1120,'갖는 건',36,800,{anchor:'middle',fill:DEEP});
    }
    txt+=cap(t,20.0+1.4,['듣는 건 스트리밍으로,','갖는 건 음반으로.','음반은 갖고 싶은 물건이 됐어요.'],1232,54);
    return {art,txt,ruler:false};
  }
  return Object.assign(endcard(t,26.0,'그 음반을','만드는 사람들',tw),{ruler:false});
 }};
