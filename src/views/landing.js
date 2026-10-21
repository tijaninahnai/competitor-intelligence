/* src/views/landing.js — Landing form, tags, advanced filters and the loading sequence. */
/* ============ LANDING ============ */
function rmTag(el){el.parentElement.remove();}
function addTag(){const i=document.getElementById('tag-inp');if(!i.value.trim())return;const t=document.createElement('span');t.className='tag';t.innerHTML=i.value.trim()+'<span class="x" onclick="rmTag(this)">×</span>';document.getElementById('tags').appendChild(t);i.value='';}
let _advBuilt=false;
function toggleAdv(){
  const p=document.getElementById('adv-panel');
  p.style.display=p.style.display==='none'?'block':'none';
  if(!_advBuilt){buildAdv();_advBuilt=true;}
}
function buildAdv(){
  const c=document.getElementById('adv-checks');
  ADV_GROUPS.forEach(g=>{
    c.innerHTML+=`<div class="cg-block"><div class="cg-title">${g.t}</div><div class="cg-grid">${g.i.map(i=>`<label class="ci"><input type="checkbox" checked><span>${i}</span></label>`).join('')}</div></div>`;
  });
}
function saAll(v){document.querySelectorAll('#adv-checks input').forEach(i=>i.checked=v);}

/* ============ LOADING ============ */
let _ldIdx=0;
function startAnalysis(){
  const url=document.getElementById('url-inp').value||'edge.be';
  document.getElementById('ld-head').textContent=`Analyseren van ${url}…`;
  const wrap=document.getElementById('ld-steps');wrap.innerHTML='';
  LD_STEPS.forEach((_,i)=>{
    wrap.innerHTML+=`<div class="ld-step" id="ls${i}"><div class="ld-ico i-pend" id="li${i}">0${i+1}</div><div class="ld-txt" id="lt${i}">${LD_STEPS[i]}</div></div>`;
  });
  goTo('loading');_ldIdx=0;runLdStep();
}
function runLdStep(){
  if(_ldIdx>=LD_STEPS.length){
    document.getElementById('prog-fill').style.width='100%';
    setTimeout(()=>{showSection('overview');goTo('dashboard');},500);
    return;
  }
  const s=document.getElementById('ls'+_ldIdx);
  const ico=document.getElementById('li'+_ldIdx);
  const txt=document.getElementById('lt'+_ldIdx);
  document.querySelectorAll('.ld-step').forEach(el=>{el.classList.remove('s-active');});
  s.classList.add('s-active');
  ico.className='ld-ico i-act';ico.textContent='◌';
  txt.className='ld-txt t-act';
  document.getElementById('prog-fill').style.width=Math.round((_ldIdx+1)/LD_STEPS.length*95)+'%';
  setTimeout(()=>{
    s.classList.remove('s-active');s.classList.add('s-done');
    ico.className='ld-ico i-done';ico.textContent='✓';
    txt.className='ld-txt t-done';
    _ldIdx++;runLdStep();
  },520+Math.random()*320);
}
