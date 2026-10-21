/* src/views/traffic.js — Traffic section with metric switching. */
function renderTraffic(){
  let metric='totaal';
  return `
  <div class="page-hd">
    <div><div class="page-title">Verkeer &amp; Bezoekers</div><div class="page-sub">Vergelijk alle bedrijven op verkeersmetrieken</div></div>
    <div class="pctl">
      <select class="sel" id="traffic-sel" onchange="switchTrafficMetric(this.value)">
        <option value="totaal">Totaal bezoekers</option>
        <option value="bounce">Bounce rate</option>
        <option value="pps">Pagina's per sessie</option>
        <option value="sessie">Sessieduur</option>
        <option value="scroll">Scroll diepte</option>
      </select>
      <div class="tabg">
        ${[['1 week',.25],['1 maand',1],['3 maanden',3]].map(([p,f])=>`<button class="tabt${PF===f?' active':''}" onclick="setPer(${f})">${p}</button>`).join('')}
      </div>
    </div>
  </div>
  <div id="traffic-content">${renderTrafficMetric('totaal')}</div>`;
}

function switchTrafficMetric(v){
  document.getElementById('traffic-content').innerHTML=renderTrafficMetric(v);
  setTimeout(()=>initTrafficChart(v),60);
}

function renderTrafficMetric(m){
  if(m==='totaal'){
    const sorted=[...COS].sort((a,b)=>b.traffic-a.traffic);
    return `
    <div class="card">
      <div class="card-title" style="margin-bottom:16px">Totaal verkeer — alle bedrijven (${PN()})</div>
      <div class="cwrap" style="height:220px"><canvas id="chart-traffic-bar"></canvas></div>
    </div>
    <div class="card">
      <div class="tw"><table class="dt">
        <thead><tr><th>#</th><th>Bedrijf</th><th>Totaal bezoekers</th><th>Terugkerend</th><th>Nieuw</th><th>Verschil met jou</th></tr></thead>
        <tbody>
        ${sorted.map((co,i)=>`<tr class="${co.isYou?'you-row':''} ck" data-d="m:${co.id}:${m}">
          <td>${rbadge(i+1,co.isYou)}</td>
          <td><div style="display:flex;align-items:center;gap:7px">${coDot(co)}<div><div style="font-weight:500;color:${co.isYou?'var(--red2)':'var(--tx)'}">${co.name}</div>${co.isYou?youTag():''}</div></div></td>
          <td><span style="font-family:'DM Mono',monospace;font-size:14px">${NUM(co.traffic)}</span> <span class="t-up" style="font-size:11px">↑${Math.floor(co.score/4)}%</span></td>
          <td style="font-family:'DM Mono',monospace">${NUM(co.returning)}</td>
          <td style="font-family:'DM Mono',monospace">${NUM(co.newV)}</td>
          <td>${co.isYou?'<span style="color:var(--tx3);font-size:12px">referentie</span>':co.traffic>YOU.traffic?`<span class="t-dn">+${NUM(co.traffic-YOU.traffic)}</span>`:`<span class="t-up">${NUM(co.traffic-YOU.traffic)}</span>`}</td>
        </tr>`).join('')}
        </tbody>
      </table></div>
      <div class="pag"><span>Rijen per pagina:</span><select class="sel" style="padding:3px 22px 3px 8px;font-size:11px" onchange="pag(this,0)"><option>7</option><option>5</option><option>3</option></select><span class="pn">1 van 1</span><button class="pgb" onclick="pag(this,-1)">‹</button><button class="pgb" onclick="pag(this,1)">›</button></div>
    </div>
    ${insights(['Edge.be groeit met +20% in totaal verkeer — meer dan enig andere concurrent. Deze groei wordt gedragen door zowel terugkerende als nieuwe bezoekers.','BrightMind Agency leidt met 40.222 bezoekers. Hun organische kanaal is tweemaal zo sterk als Edge.be — een prioriteit voor inhaalmanoeuvre.','DesignX heeft het laagste totaalverkeer maar een uitzonderlijk hoge retentierate (91%). Analyseer hun engagement-strategie.'])}`;
  }
  if(m==='bounce'){
    const sorted=[...COS].sort((a,b)=>a.bounce-b.bounce);
    return `
    <div class="card">
      <div class="card-title" style="margin-bottom:14px">Bounce rate — laag naar hoog (beste naar slechtste)</div>
      <div class="hbl">
        ${sorted.map(co=>`<div class="hbr ck" data-d="m:${co.id}:${m}">
          <div class="hbn ${co.isYou?'you':''}">${coDot(co)}<span>${co.short}</span></div>
          <div class="hbt"><div class="hbf" style="width:${co.bounce}%;background:${co.bounce<30?'var(--green)':co.bounce<55?'var(--gold)':'#F87171'}"></div></div>
          <div class="hbv">${co.bounce}%${co.isYou?'<span class="badge b-dn" style="margin-left:6px">Jij</span>':''}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="dg">
      <div class="dc you"><h4>Jouw website — Edge.be</h4><div class="dbig red">${YOU.bounce}%</div><span class="badge b-dn">Heeft verbetering nodig</span><div style="margin-top:10px;font-size:12px;color:var(--tx3)">Je bounce rate is hoog. Overweeg UX-verbeteringen op je top-3 landingspagina's om engagement te verhogen.</div></div>
      <div class="dc"><h4>Marktleider — BrightMind Agency</h4><div class="dbig green">21.2%</div><span class="badge b-up">Uitstekend</span><div style="margin-top:10px;font-size:12px;color:var(--tx3)">Laagste bounce rate in de markt. Hun inhoud is sterk afgestemd op de zoekintentie van bezoekers.</div></div>
    </div>
    ${insights(['Je bounce rate ligt 40.5 procentpunten boven BrightMind Agency. Dit is de grootste verbeterkans in je dashboard.','RoboNXT Solutions heeft de hoogste bounce rate (69.1%) — dit kan kansen bieden als jij je engagement verbetert.','ConversionDock scoort op de middenweg (44.2%) en heeft de afgelopen maand een dalende trend — iets om in de gaten te houden.'])}`;
  }
  if(m==='pps'){
    const sorted=[...COS].sort((a,b)=>b.pps-a.pps);
    return `
    <div class="card">
      <div class="card-title" style="margin-bottom:14px">Pagina's per sessie — hoog naar laag</div>
      <div class="hbl">
        ${sorted.map(co=>`<div class="hbr ck" data-d="m:${co.id}:${m}">
          <div class="hbn ${co.isYou?'you':''}">${coDot(co)}<span>${co.short}</span></div>
          <div class="hbt"><div class="hbf" style="width:${(co.pps/9)*100}%;background:${co.color}"></div></div>
          <div class="hbv">${co.pps} p/s${co.isYou?'<span class="badge b-dn" style="margin-left:4px">Jij</span>':''}</div>
        </div>`).join('')}
      </div>
    </div>
    ${insights(['Edge.be toont slechts 3.5 pagina\'s per sessie versus BrightMind\'s 8.2. Betere interne linkstructuur en gerelateerde content kunnen dit snel verbeteren.','NexaCore AI (7.5 p/s) en Pixel & Code (5.8 p/s) presteren sterk — beiden gebruiken uitgebreide contentclusters.','ConversionDock (5.1 p/s) stijgt snel ondanks een klein team — hun contentarchitectuur is het analyseren waard.'])}`;
  }
  if(m==='sessie'){
    const sorted=[...COS].sort((a,b)=>(b.smin*60+b.ssec)-(a.smin*60+a.ssec));
    return `
    <div class="card">
      <div class="tw"><table class="dt">
        <thead><tr><th>#</th><th>Bedrijf</th><th>Gem. sessieduur</th><th>0-10 sec</th><th>10s-1min</th><th>1-10 min</th><th>>30 min</th><th>vs Jij</th></tr></thead>
        <tbody>
        ${sorted.map((co,i)=>{
          const secs=co.smin*60+co.ssec;
          const mine=YOU.smin*60+YOU.ssec;
          const diff=secs-mine;
          return `<tr class="${co.isYou?'you-row':''} ck" data-d="m:${co.id}:${m}">
            <td>${rbadge(i+1,co.isYou)}</td>
            <td><div style="display:flex;align-items:center;gap:7px">${coDot(co)}<div><div style="font-weight:500;color:${co.isYou?'var(--red2)':'var(--tx)'}">${co.name}</div>${co.isYou?youTag():''}</div></div></td>
            <td style="font-family:'DM Mono',monospace;font-size:13px">${co.smin}m ${co.ssec}s</td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${Math.floor(co.traffic*.03)}</td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${Math.floor(co.traffic*.12)}</td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${Math.floor(co.traffic*.55)}</td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${Math.floor(co.traffic*.08)}</td>
            <td>${co.isYou?'<span style="color:var(--tx3);font-size:11px">referentie</span>':diff>0?`<span class="t-dn">+${Math.floor(diff/60)}m ${diff%60}s</span>`:`<span class="t-up">${Math.floor(diff/60)}m ${Math.abs(diff%60)}s</span>`}</td>
          </tr>`;
        }).join('')}
        </tbody>
      </table></div>
    </div>
    ${insights(['Jouw sessieduur (5m 32s) is 3m 60s korter dan marktleider BrightMind Agency. Overweeg diepere content en betere navigatiestructuren.','RoboNXT Solutions heeft de kortste sessieduur (3m 32s) maar ook het laagste paginabezoekvolume — een gecombineerd zorgpunt.','NexaCore AI toont sterke groei in lange sessies (>30 min) met een stijging van 7% — analyseer hun contentdiepte voor inspiratie.'])}`;
  }
  if(m==='scroll'){
    return `
    <div class="card">
      <div class="card-hd"><div class="card-title">Scroll-diepte per bedrijf</div><div class="tgg"><button class="tgb active" onclick="tToggle(this,'Scroll-diepte')">Scroll-diepte</button><button class="tgb" onclick="tToggle(this,'Gemiste converties')">Gemiste converties</button></div></div>
      <div class="hbl" style="margin-bottom:20px">
        ${[...COS].sort((a,b)=>b.score-a.score).map((co,i)=>{
          const d=50+Math.floor(co.score/3);
          return `<div class="hbr ck" data-d="m:${co.id}:${m}"><div class="hbn ${co.isYou?'you':''}">${coDot(co)}<span>${co.short}</span></div><div class="hbt"><div class="hbf" style="width:${d}%;background:${co.color}"></div></div><div class="hbv">${d}%</div></div>`;
        }).join('')}
      </div>
      <div style="font-size:13px;font-weight:600;color:var(--tx);margin-bottom:12px">Edge.be — per pagina</div>
      ${[{p:"Homepage",v:70},{p:"Product pagina",v:65},{p:"Contact",v:63},{p:"Over ons",v:71},{p:"Blogpost",v:38}].map(r=>`<div class="sdr ck" data-d="pg:${YOU.id}:${r.p}"><div class="sdl">${r.p}</div><div class="sdt"><div class="sdf" style="width:${r.v}%"></div></div><div class="sdp">${r.v}%</div></div>`).join('')}
    </div>
    ${insights(['Blogposts hebben de laagste scroll-diepte (38%). Voeg interne links en gerelateerde content toe onderaan elk artikel.','De \'Over ons\'-pagina scoort het hoogst (71%) — bezoekers zijn geïnteresseerd in het verhaal achter Edge.be.','BrightMind Agency haalt gemiddeld 82% scroll-diepte — 24 procentpunten meer dan Edge.be op vergelijkbare pagina\'s.'])}`;
  }
  return '';
}
