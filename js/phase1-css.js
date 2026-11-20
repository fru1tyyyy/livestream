(function () {
  const { layer, random, createReactionEl, randomSpawnX, updateCount } = window.Reactions;

  const START_SIZE = 28; 

  function spawn(icon) {
    const el = createReactionEl(icon, 'reaction--p1');

    el.style.setProperty('--x', `${randomSpawnX(START_SIZE)}px`);
    el.style.setProperty('--sway', `${random(10, 28).toFixed(1)}px`);
    el.style.setProperty('--sway-period', `${random(0.6, 1.1).toFixed(2)}s`);

    el.addEventListener('animationend', (e) => {
      if (e.animationName === 'p1-rise') {
        el.remove();       
        updateCount();
      }
    });

    layer.appendChild(el);
    updateCount();
  }

  window.Phase1 = { spawn };
})();
