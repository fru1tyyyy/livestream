/**
 * Wires the control bar to the two engines.
 */
(function () {
  const { randomIcon } = window.Reactions;

  const sendBtn = document.getElementById('send-btn');
  const burstBtn = document.getElementById('burst-btn');
  const speedInput = document.getElementById('speed');
  const speedValue = document.getElementById('speed-value');
  const speedControl = document.getElementById('speed-control');
  const speedHint = document.getElementById('speed-hint');
  const modeInputs = document.querySelectorAll('input[name="mode"]');

  // Allow ?mode=gsap in the URL so each phase can be opened directly for profiling.
  const params = new URLSearchParams(location.search);
  let mode = params.get('mode') === 'gsap' ? 'gsap' : 'css';
  modeInputs.forEach((input) => { input.checked = input.value === mode; });

  function engine() {
    return mode === 'gsap' ? window.Phase2 : window.Phase1;
  }

  function spawnOne() {
    engine().spawn(randomIcon());
  }

  function syncSpeedUI() {
    const isGsap = mode === 'gsap';
    speedInput.disabled = !isGsap;
    speedControl.classList.toggle('is-disabled', !isGsap);
    speedHint.textContent = isGsap
      ? 'Changes all reactions mid-flight'
      : 'Not possible with static CSS keyframes — switch to GSAP';
  }

  modeInputs.forEach((input) => {
    input.addEventListener('change', () => {
      mode = input.value;
      syncSpeedUI();
      // Reactions already in flight finish with the engine that created them.
    });
  });

  sendBtn.addEventListener('click', spawnOne);

  // Burst: 60 reactions spread over ~0.9s -> a repeatable "50+ concurrent" load
  // so both phases can be profiled under the exact same conditions.
  burstBtn.addEventListener('click', () => {
    const TOTAL = 60;
    const INTERVAL_MS = 15;
    let sent = 0;
    const timer = setInterval(() => {
      spawnOne();
      if (++sent >= TOTAL) clearInterval(timer);
    }, INTERVAL_MS);
  });

  speedInput.addEventListener('input', () => {
    const value = parseFloat(speedInput.value);
    speedValue.textContent = `${value.toFixed(1)}×`;
    window.Phase2.setSpeed(value);
  });

  // Keyboard shortcut for rapid spamming: press (or hold) "R".
  window.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') spawnOne();
  });

  syncSpeedUI();
})();
