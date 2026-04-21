(function(){
  const track=document.getElementById('tsTrack');
  const pages=track.children;
  const dots=document.getElementById('tsDots');
  const total=pages.length;
  let cur=0, auto;

  Array.from(pages).forEach((_,i)=>{
    const d=document.createElement('button');
    d.className='ts-dot'+(i===0?' active':'');
    d.onclick=()=>go(i); dots.appendChild(d);
  });

  function go(i){
    cur=(i+total)%total;
    track.style.transform=`translateX(-${cur*100}%)`;
    dots.querySelectorAll('.ts-dot').forEach((d,j)=>d.classList.toggle('active',j===cur));
    clearInterval(auto); auto=setInterval(()=>go(cur+1),5500);
  }

  document.getElementById('tsPrev').onclick=()=>go(cur-1);
  document.getElementById('tsNext').onclick=()=>go(cur+1);

  let sx=0;
  track.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
  track.addEventListener('touchend',e=>{const d=sx-e.changedTouches[0].clientX;if(Math.abs(d)>40)go(d>0?cur+1:cur-1);});

  auto=setInterval(()=>go(cur+1),5500);
})();