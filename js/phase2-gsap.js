(function () {
  const { layer, random, createReactionEl, randomSpawnX, updateCount } = window.Reactions;

  const LIFESPAN = 3;        
  const MIN_SCALE = 0.5;    
  const MAX_SCALE = 1;       

  const active = new Set();  // timelines currently in flight
  let speed = 1;

  function spawn(icon) {
    if (!window.gsap) {
      console.warn('GSAP failed to load (offline?). Phase 2 needs it.');
      return;
    }

    const el = createReactionEl(icon, 'reaction--p2');
    layer.appendChild(el);
    updateCount();

    const size = el.offsetWidth;                  
    const startX = randomSpawnX(size);
    const travel = layer.clientHeight - size - 40; 
    const swayAmp = random(10, 28);               
    const swayCount = Math.round(random(3, 5));   

    
    gsap.set(el, {
      x: startX - swayAmp,
      y: 0,
      scale: MIN_SCALE,
      opacity: 0,
      transformOrigin: '50% 100%',
      force3D: true,
    });

    const tl = gsap.timeline({
      onComplete() {
        active.delete(tl);
        tl.kill();       
        el.remove();    
        updateCount();
      },
    });

    tl

      .to(el, { y: -travel, duration: LIFESPAN, ease: 'none' }, 0)
      .to(el, {
        x: startX + swayAmp,
        duration: LIFESPAN / swayCount,
        ease: 'sine.inOut',
        repeat: swayCount - 1,
        yoyo: true,
      }, 0)

      .to(el, { scale: MAX_SCALE, duration: LIFESPAN, ease: 'power1.out' }, 0)
      .to(el, { opacity: 1, duration: 0.25, ease: 'power1.out' }, 0)
      .to(el, { opacity: 0, duration: LIFESPAN * 0.35, ease: 'power1.in' }, LIFESPAN * 0.65);

    tl.timeScale(speed);   
    active.add(tl);
  }

  function setSpeed(value) {
    speed = value;
    active.forEach((tl) => tl.timeScale(speed));
  }

  window.Phase2 = { spawn, setSpeed };
})();
