/* src/core/router.js — Screen and section navigation. */
/* ============ NAVIGATION ============ */
function goTo(scr){
  document.querySelectorAll('.screen').forEach(s=>{s.classList.remove('active');s.style.display='none';});
  const el=document.getElementById('screen-'+scr);
  el.style.display=(scr==='dashboard')?'flex':'block';
  setTimeout(()=>el.classList.add('active'),10);
  document.body.classList.toggle('dash',scr==='dashboard');
}
function showSection(id){if(id!==CUR)applyPer(1);CUR=id;KWT='Alle';MK=0;
  _killCharts();
  document.querySelectorAll('.sb-item,.bn-item').forEach(el=>el.classList.toggle('active',el.dataset.sec===id));
  const m=document.getElementById('dash-main');
  const fns={overview:renderOverview,traffic:renderTraffic,sources:renderSources,seo:renderSEO,tech:renderTech,conv:renderConv,ai:renderAI,diff:renderDiff};
  m.innerHTML=(fns[id]||renderOverview)();
  setTimeout(()=>initCharts(id),60);
}
