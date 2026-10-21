/* src/views/conversion.js — Conversion section and scroll-depth toggle. */
function renderConv(){
  const sorted=[...COS].sort((a,b)=>a.bounce-b.bounce);
  return `
  <div class="page-hd">
    <div><div class="page-title">Conversie &amp; Betrokkenheid</div><div class="page-sub">Bounce rate, exit-analyse en conversiefunnels</div></div>
  </div>
  <div class="sg">
    ${[{l:"Gem. conversieratio",v:"3.2%",b:"b-dn"},{l:"CTA click-through",v:"8.4%",b:"b-up"},{l:"Formulier voltooiing",v:"42%",b:"b-warn"},{l:"Effectieve bounce (paid)",v:"64.0%",b:"b-dn"}].map((s,i)=>`<div class="sc ck" data-d="m:${YOU.id}:${['score','pps','scroll','bounce'][i]}"><div class="sl">${s.l}</div><div class="sv sm">${s.v}</div><span class="badge ${s.b}">vs markt avg</span></div>`).join('')}
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Bounce rate ranking — alle bedrijven</div>
    <div class="hbl">
      ${sorted.map(co=>`<div class="hbr ck" data-d="m:${co.id}:bounce">
        <div class="hbn ${co.isYou?'you':''}">${coDot(co)}<span>${co.short}</span>${co.isYou?'<span class="badge b-dn" style="margin-left:4px">Jij</span>':co.rank===1?'<span class="badge b-up" style="margin-left:4px">Best</span>':''}</div>
        <div class="hbt"><div class="hbf" style="width:${co.bounce}%;background:${co.bounce<30?'var(--green)':co.bounce<55?'var(--gold)':'#F87171'}"></div></div>
        <div class="hbv">${co.bounce}%</div>
      </div>`).join('')}
    </div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:12px">Exit hotspots — Edge.be</div>
    <div class="g2">
      <div>
        ${[{p:"/product-pagina",r:"68.7%",v:"1.245"},{p:"/blog-#7344",r:"54.3%",v:"1.890"},{p:"/winkelwagen",r:"49.8%",v:"2.340"},{p:"/product/details",r:"48.7%",v:"3.690"},{p:"/account/registreren",r:"35.2%",v:"5.670"},{p:"/contact",r:"31.4%",v:"2.115"},{p:"/prijzen",r:"29.9%",v:"4.020"},{p:"/cases",r:"27.2%",v:"1.560"}].map(r=>`<div class="ck" data-d="pg:${YOU.id}:${r.p}" style="display:grid;grid-template-columns:1fr 70px 60px;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid var(--bdr)">
          <div style="font-size:12px;color:var(--tx2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.p}</div>
          <div style="font-family:'DM Mono',monospace;font-size:12px;font-weight:500;color:var(--tx)">${r.r}</div>
          <div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--tx3)">${r.v}</div>
        </div>`).join('')}
      </div>
      <div class="cwrap" style="height:200px"><canvas id="chart-exit-pie"></canvas></div>
    </div>
  </div>
  ${insights(['Je bounce rate (61.7%) ligt 22.9 procentpunten boven BrightMind Agency. Dit is de prioriteit #1 voor conversieoptimalisatie.','De productpagina heeft de hoogste exit rate (68.7%). Voeg urgentie-elementen, reviews en duidelijke CTA\'s toe om bezoekers te converteren.','Je betaalde advertenties bouncing 64% — overweeg relevantere landingspagina\'s specifiek per advertentiegroep.'])}`;
}


function tToggle(btn,label){
  btn.closest('.tgg').querySelectorAll('.tgb').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const card=btn.closest('.card'),miss=label==='Gemiste converties';card.querySelector('.card-title').textContent=label+' per bedrijf';card.querySelectorAll('.hbl .hbr[data-d]').forEach(r=>{const c=CO(r.dataset.d.split(':')[1]),d=MET.scroll[1](c),v=miss?Math.round((100-d)*.6+c.bounce/10):d;r.querySelector('.hbf').style.width=v+'%';r.querySelector('.hbv').textContent=v+'%'});
}
