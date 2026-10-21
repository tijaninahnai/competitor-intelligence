/* src/views/ai.js — AI recommendations section. */
function renderAI(){
  return `
  <div class="page-hd">
    <div><div class="page-title">AI-Voorspellingen</div><div class="page-sub">Toekomstgerichte inzichten op basis van huidige trends</div></div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:16px">Verwachte rankingpositie — komende 12 weken</div>
    <div class="cwrap" style="height:clamp(180px,40vw,240px)"><canvas id="chart-ai-forecast"></canvas></div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">AI-aanbevelingen voor Edge.be</div>
    ${[
      {ico:"🚀",t:"Groeikans: organisch zoekverkeer",d:"Op basis van trending keywords in je sector kan je organisch verkeer +34% groeien. Voeg contentpagina's toe rondom 'AI marketing automatisering' en 'digitale strategie België'. Verwachte impact binnen 8 weken.",col:"var(--blue)"},
      {ico:"⚠️",t:"Risico: stijgende bounce rate",d:"Je bounce rate vertoont een maandelijkse stijgende trend van +2.3%. Als dit doorgaat, zit je over 6 weken 12% boven het marktgemiddelde. Prioriteer UX-verbeteringen op je top-3 landingspagina's.",col:"#F87171"},
      {ico:"💡",t:"Kans: tech stack modernisering",d:"BrightMind Agency's Next.js-infrastructuur levert 40% lagere TTFB en 22% langere sessieduur op. Een soortgelijke upgrade voor Edge.be is haalbaar in 4-6 weken en levert directe rankingverbetering.",col:"var(--gold)"},
      {ico:"📈",t:"Voorspelling: positieverandering",d:"Op basis van je huidige groeicurve (+20% verkeer, sterke retentie) heeft Edge.be een kans van 74% om positie #3 te bereiken binnen 12 weken — mits je bounce rate daalt.",col:"var(--green)"},
    ].map((a,i)=>`<div class="ck" data-d="a:${i}" style="display:flex;gap:12px;padding:13px 16px;background:var(--sf2);border:1px solid var(--bdr);border-radius:var(--rl);margin-bottom:10px">
      <div style="font-size:20px;flex-shrink:0">${a.ico}</div>
      <div>
        <div style="font-weight:600;font-size:12.5px;color:${a.col};margin-bottom:4px">${a.t}</div>
        <div style="font-size:12px;color:var(--tx2);line-height:1.55">${a.d}</div>
      </div>
    </div>`).join('')}
  </div>
  ${insights(['74% kans op positie #3 in 12 weken als de bounce rate daalt naar onder 50%.','Organisch verkeer kan +34% groeien met de juiste contentstrategie — duurzamer dan betaald verkeer.','Tech-modernisering heeft de hoogste ROI-verwachting van alle beschikbare verbeteracties.'])}`;
}
