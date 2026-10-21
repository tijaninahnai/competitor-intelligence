/* src/drill/drawer.js — Deep drill-down drawer: views per type, breadcrumb stack. */
/* ============ DEEP DRILL ============ */

function drView(t,a,b){
  const s=hs(t+a+b);
  if(t==='m'){const k=b==='totaal'?'traffic':b,M=MET[k]||MET.traffic,f=M[1],c=CO(a),srt=[...COS].sort((x,y)=>M[3]?f(y)-f(x):f(x)-f(y)),avg=COS.reduce((q,x)=>q+f(x),0)/COS.length,d=f(c)-f(YOU);
    return[c.short+' · '+M[0],hd(M[0]+' — '+c.name,'Metric-analyse')+`<div style="margin-bottom:14px"><button class="btn btn-ghost btn-sm" data-d="co:${c.id}">Volledig rapport →</button></div><div class="sg">${stc('Huidig',M[2](f(c)))}${stc('Marktgemiddelde',M[2](+avg.toFixed(1)))}${stc('Positie',(srt.indexOf(c)+1)+' / '+COS.length)}${stc('Verschil met jou',c.isYou?'referentie':(d>0?'+':'−')+M[2](+Math.abs(d).toFixed(1)))}</div>`
      +sec('Trend — 12 weken',cv(180),c.short+' vs markt')
      +sec('Bijdrage per pagina',pgs(c,s).slice(0,6).map(x=>rowl(`pg:${c.id}:${x.p}`,x.p,NUM(x.v))).join(''),'klik voor pagina-analyse')
      +sec('Ranking op deze metric',srt.map(x=>rowl(`m:${x.id}:${k}`,coDot(x)+' '+x.name+(x.isYou?' · jij':''),M[2](f(x)))).join(''),'klik om te wisselen')
      +sec('Apparaten',dev(s).map(([l,n])=>bar(l,n)).join('')),
      lc([[c.short,trn(f(c),s),c.color],['Markt',trn(avg,s+9),'#8694A8',1]])]}
  if(t==='pg'){const c=CO(a),p=b,e=18+Math.floor(rnd(s)*50),sc=35+Math.floor(rnd(s+1)*45),v=Math.round(c.traffic*(.05+rnd(s+2)*.2)),ts=Math.round(40+rnd(s+3)*160),tot=c.direct+c.organic+c.paid+c.social,o=hs(p)%4;
    return[p,hd(p,c.name)+`<div class="sg">${stc('Bezoeken / mnd',NUM(v))}${stc('Exit rate',e+'%')}${stc('Scroll-diepte',sc+'%')}${stc('Tijd op pagina',Math.floor(ts/60)+'m '+ts%60+'s')}</div>`
      +sec('Verkeer naar deze pagina',Object.entries(CH).map(([l,f],i)=>`<div class="ck" data-d="ch:${c.id}:${l}">${bar(l,Math.min(99,Math.round(c[f]/tot*100*(.8+rnd(s+i)*.4))))}</div>`).join(''),'klik op kanaal')
      +sec('Zoekwoorden die hier landen',KWS(c).slice(o,o+3).map(k=>rowl(`kw:${k.w}`,k.w,'#'+k.p)).join(''),'klik voor keyword')
      +sec('Apparaten',dev(s).map(([l,n])=>bar(l,n)).join(''))
      +sec('Actieplan',actl(c.id),'klik om te openen'),null]}
  if(t==='kw'){const k=KW.find(x=>x.w===a)||{w:a,p:3+hs(a)%35,v:80+hs(a)%2900,cpc:'€'+(1+hs(a)%250/100).toFixed(2),diff:25+hs(a)%60},rk=COS.map(c=>({c,p:kpos(k,c)})).sort((x,y)=>x.p-y.p),rel=KW.filter(x=>x.w!==k.w).sort((x,y)=>Math.abs(x.v-k.v)-Math.abs(y.v-k.v)).slice(0,4),lp=PGL[hs(k.w)%7];
    return[k.w,hd('“'+k.w+'”','Keyword-analyse')+`<div class="sg">${stc('Jouw positie','#'+k.p)}${stc('Zoekvolume',NUM(k.v))}${stc('CPC',k.cpc)}${stc('Moeilijkheid',k.diff+'%')}</div>`
      +sec('Positie-trend — Edge.be',cv(170),'lager = beter')
      +sec('Wie rankt waar',rk.map(x=>rowl(`m:${x.c.id}:kw`,coDot(x.c)+' '+x.c.name,'#'+x.p)).join(''),'klik voor bedrijfsdata')
      +sec('SERP-features',['Featured snippet','People also ask','AI-overzicht','Lokale pack'].map((f,i)=>`<span class="badge ${rnd(s+i)>.5?'b-up':'b-neu'}" style="margin:0 6px 6px 0">${f}</span>`).join(''))
      +sec('Gerelateerde zoekwoorden',rel.map(x=>rowl(`kw:${x.w}`,x.w,NUM(x.v))).join(''))
      +sec('Landingspagina',rowl(`pg:${YOU.id}:${lp}`,lp,'analyse')),
      lc([['Positie',trk(k.p,s),'#D91F41']],1)]}
  if(t==='ch'){const L=CH[b]?b:(Object.keys(CH).find(x=>CH[x]===b)||'Direct'),f=CH[L],c=CO(a),v=c[f],tot=c.direct+c.organic+c.paid+c.social,all=[...COS].sort((x,y)=>y[f]-x[f]),ref=['google.com','linkedin.com','facebook.com','nieuwsbrief','partner.be'].map((n,i)=>[n,Math.round(v*(.34-i*.06))]);
    return[c.short+' · '+L,hd(L+' verkeer — '+c.name,'Kanaal-analyse')+`<div style="margin-bottom:14px"><button class="btn btn-ghost btn-sm" data-d="co:${c.id}">Volledig rapport →</button></div><div class="sg">${stc('Bezoekers',NUM(v))}${stc('Aandeel',Math.round(v/tot*100)+'%')}${stc('Positie',(all.indexOf(c)+1)+' / '+COS.length)}${stc('Verschil met jou',c.isYou?'referentie':(v>YOU[f]?'+':'−')+NUM(Math.abs(v-YOU[f])))}</div>`
      +sec('Trend — 12 weken',cv(170),c.short+' vs jij')
      +sec('Top bronnen',ref.map(([n,x])=>rowl(`pg:${c.id}:${PGL[hs(n)%7]}`,n,NUM(x))).join(''),'klik voor landingspagina')
      +sec('Vergelijking per bedrijf',all.map(x=>rowl(`ch:${x.id}:${L}`,coDot(x)+' '+x.name+(x.isYou?' · jij':''),NUM(x[f]))).join(''),'klik om te wisselen'),
      lc([[c.short,trn(v,s),c.color],['Jij',trn(YOU[f],s+5),'#D91F41',1]])]}
  if(t==='a'){const A=AI[a]||AI[0],M=MET[A[1]];
    return[A[0],hd(A[0],'AI-aanbeveling')
      +sec('Onderliggende data',rowl(`m:${YOU.id}:${A[1]}`,'Edge.be · '+M[0],M[2](M[1](YOU)))+rowl(`m:${COS[0].id}:${A[1]}`,'Marktleider · '+COS[0].short,M[2](M[1](COS[0]))),'klik voor trend')
      +sec('Actieplan',actl(YOU.id))
      +sec('Gerelateerde zoekwoorden',KWS(YOU).slice(0,3).map(k=>rowl(`kw:${k.w}`,k.w,'#'+k.p)).join('')),null]}
  if(t==='ex'){const rows=a==='kw'?[['keyword','positie','volume','cpc','moeilijkheid'],...KW.map(k=>[k.w,k.p,k.v,k.cpc,k.diff])]:a==='co'?[['metric','waarde'],...Object.keys(MET).map(k=>[MET[k][0],MET[k][2](MET[k][1](CO(b)))])]:[['bedrijf','rang','score','bezoekers','bounce%','sessie','keywords','backlinks'],...COS.map(c=>[c.name,c.rank,c.score,c.traffic,c.bounce,c.smin+'m'+c.ssec+'s',c.kw,c.bl])];
    return['Export',hd('Export','CSV-gegevens — kopieer en plak in Excel of Sheets')+`<textarea id="ex-t" readonly style="width:100%;height:260px;background:var(--sf2);color:var(--tx);border:1px solid var(--bdr);border-radius:var(--r);padding:10px;font-family:'DM Mono',monospace;font-size:11px">${rows.map(r=>r.join(';')).join('\n')}</textarea><div style="margin-top:10px"><button class="btn btn-primary btn-sm" onclick="exCopy(this)">Kopieer naar klembord</button></div>`,null]}
  return['—','',null];
}

function drill(t,a,b,keep){
  if(!keep)ST.push([t,a,b]);
  const[lb,h,ch]=drView(t,a,b);ST[ST.length-1][3]=lb;
  document.getElementById('dr').classList.add('on');document.body.style.overflow='hidden';
  document.getElementById('dr-bc').innerHTML=ST.map((x,i)=>i<ST.length-1?`<a onclick="drGo(${i})">${x[3]}</a><span>›</span>`:`<b>${x[3]}</b>`).join('');
  const bd=document.getElementById('dr-b');bd.innerHTML=h;bd.parentElement.scrollTop=0;
  setTimeout(()=>ch&&ch(),40);
}
function drGo(i){ST=ST.slice(0,i+1);const x=ST[i];drill(x[0],x[1],x[2],1)}
function drClose(){ST=[];document.getElementById('dr').classList.remove('on');document.body.style.overflow='';if(_charts['dr-c']){_charts['dr-c'].destroy();delete _charts['dr-c']}}
