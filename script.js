const els=document.querySelectorAll("section,article,.doctor,.contact");const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:"translateY(24px)"},{opacity:1,transform:"translateY(0)"}],{duration:700,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"})}}),{threshold:.08});els.forEach(e=>io.observe(e));window.addEventListener("scroll",()=>{document.querySelector(".orbit").style.transform=`rotateX(65deg) rotate(${scrollY*.08}deg)`});document.querySelectorAll(".cards article").forEach(c=>c.addEventListener("pointermove",e=>{let r=c.getBoundingClientRect();c.style.transform=`perspective(700px) rotateX(${-(e.clientY-r.top-r.height/2)/25}deg) rotateY(${(e.clientX-r.left-r.width/2)/25}deg) translateY(-6px)`}));document.querySelectorAll(".cards article").forEach(c=>c.addEventListener("pointerleave",()=>c.style.transform=""));
const dentalStory=document.querySelector('.dental-story');
const storySteps=[...document.querySelectorAll('.story-step')];
if(dentalStory && storySteps.length){
  const setStage=(n)=>{
    dentalStory.dataset.stage=n;
    storySteps.forEach((s,i)=>s.classList.toggle('active',i===n));
  };
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const r=entry.target.getBoundingClientRect();
      const center=r.top+r.height/2;
      const distance=Math.abs(center-window.innerHeight/2);
      entry.target.dataset.distance=distance;
    });
    let best=-1,bestD=Infinity;
    storySteps.forEach((s,i)=>{
      const r=s.getBoundingClientRect();
      if(r.top<window.innerHeight*.7 && r.bottom>window.innerHeight*.2){
        const d=Math.abs((r.top+r.height/2)-window.innerHeight/2);
        if(d<bestD){bestD=d;best=i;}
      }
    });
    if(best>=0)setStage(best);
  },{threshold:[0,.15,.4,.7,1]});
  storySteps.forEach(s=>obs.observe(s));
  window.addEventListener('scroll',()=>{
    let best=0,bestD=Infinity;
    storySteps.forEach((s,i)=>{
      const r=s.getBoundingClientRect();
      const d=Math.abs((r.top+r.height/2)-window.innerHeight/2);
      if(d<bestD){bestD=d;best=i;}
    });
    setStage(best);
  },{passive:true});
}

/* Premium dental care scroll controller */
(function(){
 const section=document.querySelector('.dental-story');
 const steps=[...document.querySelectorAll('.care-step')];
 if(!section||!steps.length)return;
 const activate=()=>{
   let best=0,dist=Infinity;
   steps.forEach((s,i)=>{
     const r=s.getBoundingClientRect();
     const d=Math.abs((r.top+r.height/2)-innerHeight*.5);
     if(d<dist){dist=d;best=i;}
   });
   steps.forEach((s,i)=>s.classList.toggle('active',i===best));
 };
 addEventListener('scroll',activate,{passive:true});
 addEventListener('resize',activate);
 activate();
})();
