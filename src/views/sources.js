/* src/views/sources.js — Traffic sources section. */
function renderSources(){
  return `
  <div class="page-hd">
    <div><div class="page-title">Verkeersbronnen &amp; Kanalen</div><div class="page-sub">Kanaalverdeling en directe verkeersvergelijking</div></div>
    <div class="pctl">
      <select class="sel" onchange="setSrc(this.value)">${[['all','Alle kanalen'],['direct','Direct verkeer'],['organic','Organisch'],['paid','Betaald'],['social','Sociaal']].map(([v,l])=>`<option value="${v}"${SRC===v?' selected':''}>${l}</option>`).join('')}</select>
      <div class="tabg">${[['Week',.25],['Maand',1],['Kwartaal',3],['Jaar',12]].map(([p,f])=>`<button class="tabt${PF===f?' active':''}" onclick="setPer(${f})">${p}</button>`).join('')}</div>
    </div>
  </div>
  <div class="sg">
    <div class="sc ck" data-d="m:${YOU.id}:traffic"><div class="sl">Totaal bezoekers</div><div class="sv">${NUM(YOU.traffic)}</div><span class="badge b-up">↑20%</span></div>
    <div class="sc ck" data-d="ch:${YOU.id}:Direct"><div class="sl">Direct verkeer</div><div class="sv">${NUM(YOU.direct)}</div><span class="badge b-up">↑1.2%</span></div>
    <div class="sc ck" data-d="ch:${YOU.id}:Organisch"><div class="sl">Organisch verkeer</div><div class="sv">${NUM(YOU.organic)}</div><span class="badge b-up">↑2.6%</span></div>
    <div class="sc ck" data-d="ch:${YOU.id}:Betaald"><div class="sl">Betaald verkeer</div><div class="sv">${NUM(YOU.paid)}</div><span class="badge b-warn">↑22%</span></div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">${SRC==='all'?'Alle kanalen':Object.keys(CH).find(l=>CH[l]===SRC)} — vergelijking alle bedrijven</div>
    <div class="cwrap" style="height:210px"><canvas id="chart-src-bar"></canvas></div>
    <div style="margin-top:16px">
      <div class="tw"><table class="dt">
        <thead><tr><th>#</th><th>Bedrijf</th><th>Direct</th><th>Organisch</th><th>Betaald</th><th>Sociaal</th><th>Totaal</th></tr></thead>
        <tbody>
          ${[...COS].sort((a,b)=>SRC==='all'?a.rank-b.rank:b[SRC]-a[SRC]).map(co=>`<tr class="${co.isYou?'you-row':''} ck" data-d="ch:${co.id}:${SRC==='all'?'Direct':Object.keys(CH).find(l=>CH[l]===SRC)}">
            <td>${rbadge(co.rank,co.isYou)}</td>
            <td><div style="display:flex;align-items:center;gap:7px">${coDot(co)}<div style="font-weight:500;color:${co.isYou?'var(--red2)':'var(--tx)'}">${co.name}${co.isYou?'<br>'+youTag():''}</div></div></td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${NUM(co.direct)}</td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${NUM(co.organic)}</td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${NUM(co.paid)}</td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${NUM(co.social)}</td>
            <td style="font-family:'DM Mono',monospace;font-size:12px;font-weight:500">${NUM(co.traffic)}</td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Gebruikersactiviteit — Edge.be</div>
    ${[{l:"Klikken per sessie",v:4.2,p:42},{l:"Scroll diepte (gem.)",v:65,p:65},{l:"Video bekeken",v:48,p:48},{l:"Formulieren ingevuld",v:12,p:12},{l:"Deling op social",v:8,p:8}].map(a=>`<div class="abr"><div class="abl">${a.l}</div><div class="abt"><div class="abf" style="width:${a.p}%"></div></div><div class="abp">${a.v}%</div></div>`).join('')}
  </div>
  ${insights(['Edge.be heeft het sterkste direct verkeer (32.722), wat duidt op sterke merkherkenning en trouwe terugkerende bezoekers.','Je organisch verkeer (9.000) is slechts 43% van BrightMind Agency (20.500). Dit is de grootste groeikans voor duurzame traffic.','Betaald verkeer maakt 34% van Edge.be\'s traffic uit — hoog vergeleken met BrightMind (46%). Diversificeer naar organisch voor kostenefficiëntie.'])}`;
}
