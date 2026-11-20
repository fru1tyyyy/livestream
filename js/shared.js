(function () {
  const ICONS = ['heart', 'like', 'fire', 'star'];

  const layer = document.getElementById('reaction-layer');
  const spawnArea = document.getElementById('spawn-area');
  const domCountEl = document.getElementById('dom-count');
  const peakCountEl = document.getElementById('peak-count');

  let peak = 0;

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomIcon() {
    return ICONS[Math.floor(Math.random() * ICONS.length)];
  }

  function createReactionEl(icon, phaseClass) {
    const el = document.createElement('div');
    el.className = `reaction reaction--${icon} ${phaseClass}`;
    el.innerHTML = `<svg viewBox="0 0 24 24" focusable="false"><use href="#icon-${icon}"></use></svg>`;
    return el;
  }

  function randomSpawnX(elementWidth) {
    const layerRect = layer.getBoundingClientRect();
    const areaRect = spawnArea.getBoundingClientRect();
    const minX = areaRect.left - layerRect.left;
    const maxX = Math.max(minX, areaRect.right - layerRect.left - elementWidth);
    return random(minX, maxX);
  }

  function updateCount() {
    const n = layer.childElementCount;
    if (n > peak) peak = n;
    domCountEl.textContent = n;
    peakCountEl.textContent = peak;
  }

  window.Reactions = {
    layer,
    random,
    randomIcon,
    createReactionEl,
    randomSpawnX,
    updateCount,
  };
})();
