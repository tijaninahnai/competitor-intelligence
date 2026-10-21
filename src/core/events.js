/* src/core/events.js — Global event delegation, pagination, export copy, keyboard. */
/* ============ EVENT DELEGATION ============ */
document.addEventListener('click',e=>{
  if(e.target.classList.contains('tabt')){
    e.target.closest('.tabg').querySelectorAll('.tabt').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
  }
  if(e.target.classList.contains('tgb')){
    e.target.closest('.tgg').querySelectorAll('.tgb').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
  }
});


function pag(b,d){const p=b.closest('.pag'),tb=p.parentElement.querySelectorAll('tbody tr'),n=+p.querySelector('select').value,pages=Math.ceil(tb.length/n);let i=d===0?0:Math.min(pages-1,Math.max(0,+(p.dataset.i||0)+d));p.dataset.i=i;tb.forEach((r,j)=>r.style.display=j>=i*n&&j<(i+1)*n?'':'none');p.querySelector('.pn').textContent=(i+1)+' van '+pages}
function exCopy(b){const t=document.getElementById('ex-t');t.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){}if(navigator.clipboard)navigator.clipboard.writeText(t.value).then(()=>{b.textContent='Gekopieerd ✓'},()=>{});b.textContent=ok?'Gekopieerd ✓':'Gemarkeerd — druk op Ctrl/Cmd+C'}

document.addEventListener('click',e=>{if(e.target.closest('a[href="#"]'))e.preventDefault();const d=e.target.closest('[data-d]');if(!d)return;const[t,a,...r]=d.dataset.d.split(':');if(t==='co'){drClose();openReport(+a);return}drill(t,a,r.join(':'))});
document.addEventListener('keydown',e=>{if(e.key==='Escape')drClose()});
