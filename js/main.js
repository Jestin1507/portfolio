const FORMSPREE_URL = 'https://formspree.io/f/xqeoqllp';

/* NAV */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ACTIVE NAV */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

/* STAR CANVAS */
(function() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const stars = [];
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  for (let i = 0; i < 55; i++) stars.push({
    x: Math.random() * 1920, y: Math.random() * 1080,
    r: Math.random() * 1.1 + .2,
    vx: (Math.random() - .5) * .15, vy: (Math.random() - .5) * .15,
    alpha: Math.random() * .25 + .06
  });
  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.x += s.vx; s.y += s.vy;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(29,78,216,${s.alpha})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* SCROLL REVEAL */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = e.target.dataset.delay ? parseInt(e.target.dataset.delay) : 0;
    setTimeout(() => e.target.classList.add('visible'), delay);
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* STAT COUNTER */
function countUp(el) {
  const target = parseInt(el.dataset.count);
  let n = 0; const step = target / 50;
  const t = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(t); }
    el.textContent = Math.floor(n);
  }, 25);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    statsObs.unobserve(e.target);
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObs.observe(statsEl);

/* SMOOTH ANCHORS */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' }); }
  });
});

/* CONTACT FORM */
const form    = document.getElementById('contact-form');
const btnText = document.getElementById('btn-text');
const btnLoad = document.getElementById('btn-loading');
const okMsg   = document.getElementById('form-success');
const errMsg  = document.getElementById('form-error');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    btnText.style.display = 'none'; btnLoad.style.display = 'inline';
    okMsg.style.display = 'none'; errMsg.style.display = 'none';
    const data = {
      name:    document.getElementById('from_name').value,
      email:   document.getElementById('reply_to').value,
      company: document.getElementById('company').value || 'Not provided',
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { okMsg.style.display = 'block'; form.reset(); }
      else throw new Error();
    } catch { errMsg.style.display = 'block'; }
    finally { btnText.style.display = 'inline'; btnLoad.style.display = 'none'; }
  });
}
