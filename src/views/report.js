/* src/views/report.js — Company report page and insight helper. */
function openReport(id){
  applyPer(1);const co=COS.find(c=>c.id==id)||COS[0];
  _killCharts();
  const m=document.getElementById('dash-main');
  m.innerHTML=`
  <button class="btn btn-ghost btn-sm" onclick="showSection('diff')" style="margin-bottom:16px">← Terug naar overzicht</button>
  <div class="page-hd">
    <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
      ${scoreRing(co.score,26,4)}
      <div>
        <div class="page-title">${co.name}</div>
        <div class="page-sub">${co.sector} — <a class="uc" href="#">${co.url}</a></div>
      </div>
    </div>
    <button class="btn btn-ghost btn-sm" data-d="ex:co:${co.id}">↓ Exporteer rapport</button>
  </div>
  <div class="pc-grid">
    <div class="pc pos"><div class="pc-lbl">Sterk</div>Sterke visuele uitstraling en hoge domeinautoriteit via ${co.bl.toLocaleString('nl')} backlinks.</div>
    <div class="pc neg"><div class="pc-lbl">Zwak</div>Onvoldoende diepgaande contentpagina's voor long-tail zoekwoorden.</div>
    <div class="pc neg"><div class="pc-lbl">Zwak</div>Zwakke interne linkstructuur leidt tot lage pagina's-per-sessie ratio.</div>
    <div class="pc pos"><div class="pc-lbl">Sterk</div>Hoge mobiele score (${co.rank<=2?'95':'82'}/100) dankzij geoptimaliseerde afbeeldingscompressie.</div>
    <div class="pc neg"><div class="pc-lbl">Kans</div>Sociale kanalen onderbenutten het verkeer — slechts ${co.rank<=2?'11':'5'}% via sociaal.</div>
    <div class="pc pos"><div class="pc-lbl">Sterk</div>Lagere bounce rate dan Edge.be op vergelijkbare pagina-types.</div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Vergelijking: Edge.be vs ${co.name}</div>
    <div class="dg">
      <div class="dc you"><h4>Edge.be — Jou</h4>
        <div class="dbig red">${YOU.bounce}%</div><div style="font-size:11px;color:var(--tx3);margin-bottom:10px">Bounce rate</div>
        <div style="font-family:'DM Mono',monospace;font-size:20px;color:var(--tx);margin-bottom:3px">${NUM(YOU.traffic)}</div><div style="font-size:11px;color:var(--tx3);margin-bottom:10px">Maandelijkse bezoekers</div>
        <div style="font-family:'DM Mono',monospace;font-size:20px;color:var(--tx);margin-bottom:3px">${YOU.smin}m ${YOU.ssec}s</div><div style="font-size:11px;color:var(--tx3)">Gem. sessieduur</div>
      </div>
      <div class="dc"><h4>${co.short} — Concurrent</h4>
        <div class="dbig ${co.bounce<YOU.bounce?'green':'red'}">${co.bounce}%</div><div style="font-size:11px;color:var(--tx3);margin-bottom:10px">Bounce rate</div>
        <div style="font-family:'DM Mono',monospace;font-size:20px;color:var(--tx);margin-bottom:3px">${NUM(co.traffic)}</div><div style="font-size:11px;color:var(--tx3);margin-bottom:10px">Maandelijkse bezoekers</div>
        <div style="font-family:'DM Mono',monospace;font-size:20px;color:var(--tx);margin-bottom:3px">${co.smin}m ${co.ssec}s</div><div style="font-size:11px;color:var(--tx3)">Gem. sessieduur</div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Verkeersbronnen — ${co.name}</div>
    <div class="sg">
      ${[{l:"Direct",v:co.direct},{l:"Organisch",v:co.organic},{l:"Betaald",v:co.paid},{l:"Sociaal",v:co.social}].map(s=>`<div class="sc ck" data-d="ch:${co.id}:${s.l}"><div class="sl">${s.l}</div><div class="sv sm">${NUM(s.v)}</div></div>`).join('')}
    </div>
    <div class="g2">
      <div class="cwrap" style="height:180px"><canvas id="chart-rep-pie"></canvas></div>
      <div class="src-leg" style="justify-content:center">
        ${[{l:"Organisch",c:"#22C55E"},{l:"Direct",c:"#4F8EF0"},{l:"Betaald",c:"#D91F41"},{l:"Sociaal",c:"#E8A520"},{l:"Overig",c:"#64748B"}].map(s=>`<div class="src-item"><span class="co-dot" style="background:${s.c}"></span>${s.l}<span class="src-pct">${shr(co)[['Organisch','Direct','Betaald','Sociaal','Overig'].indexOf(s.l)]}%</span></div>`).join('')}
      </div>
    </div>
  </div>
  ${insights([`${co.name} genereert ${co.traffic>YOU.traffic?'meer':'minder'} verkeer dan Edge.be, maar heeft een ${co.bounce<YOU.bounce?'lagere':'hogere'} bounce rate.`,`De organische zichtbaarheid van ${co.name} (${co.kw} keywords) is ${co.kw>YOU.kw?'sterker':'zwakker'} dan Edge.be.`,'Bekijk de technische pagina voor een volledige prestatiebenchmark van dit bedrijf.'])}`;
  wireReport(co,m);
  setTimeout(()=>{
    _mkChart('chart-rep-pie',{type:'doughnut',data:{labels:['Organisch','Direct','Betaald','Sociaal','Overig'],datasets:[{data:shr(co),backgroundColor:['#22C55E','#4F8EF0','#D91F41','#E8A520','#64748B'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'62%'}});
  },60);
}

/* ============ INSIGHTS HELPER ============ */
function insights(arr){
  return `<div class="ins-wrap"><div class="ins-ttl">Uitgelichte inzichten</div>${arr.map((t,i)=>`<div class="ins"><div class="ins-n">${i+1}</div><div>${t}</div></div>`).join('')}</div>`;
}


function wireReport(c,m){
  const K=['bl','kw','pps','lcp',0,'bounce'];
  const Y=YOU,sh=x=>Math.round(x.social/(x.organic+x.direct+x.paid+x.social)*100),PS=[[c.bl>Y.bl,'Backlinks',NUM(c.bl)+' vs '+NUM(Y.bl)+' bij jou'],[c.kw>Y.kw,'Keywords',c.kw+' vs '+Y.kw+' organische keywords'],[c.pps>Y.pps,'Pagina’s / sessie',c.pps+' vs '+Y.pps+' p/s'],[LCP[c.id]<LCP[Y.id],'Laadsnelheid','LCP '+LCP[c.id]+'s vs '+LCP[Y.id]+'s'],[sh(c)>sh(Y),'Sociaal verkeer',sh(c)+'% vs '+sh(Y)+'% via sociaal'],[c.bounce<Y.bounce,'Bounce rate',c.bounce+'% vs '+Y.bounce+'%']];
  m.querySelectorAll('.pc').forEach((p,i)=>{const[ok,l,tx]=PS[i];p.className='pc ck '+(c.isYou||ok?'pos':'neg');p.innerHTML=`<div class="pc-lbl">${c.isYou?'Referentie':ok?'Sterker dan jij':'Zwakker dan jij'} · ${l}</div>${tx}`;p.dataset.d=K[i]?`m:${c.id}:${K[i]}`:`ch:${c.id}:Sociaal`});
  m.insertAdjacentHTML('beforeend',`<div class="card"><div class="card-title" style="margin-bottom:4px">Dieper graven — ${c.short}</div><div class="card-sub" style="margin-bottom:12px">Klik door naar metrics, pagina’s, zoekwoorden en kanalen</div><div class="sg">${Object.keys(MET).map(k=>`<div class="sc ck" data-d="m:${c.id}:${k}"><div class="sl">${MET[k][0]}</div><div class="sv sm">${MET[k][2](MET[k][1](c))}</div></div>`).join('')}</div><div class="g2"><div>${pgs(c,hs(c.id)).slice(0,5).map(x=>rowl(`pg:${c.id}:${x.p}`,x.p,NUM(x.v))).join('')}</div><div>${KWS(c).slice(0,5).map(k=>rowl(`kw:${k.w}`,k.w,'#'+k.p)).join('')}</div></div></div>`);
}
