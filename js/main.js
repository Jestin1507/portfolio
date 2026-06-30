/* ══════════════════════════════════════════════════════
   JESTIN THOMAS PORTFOLIO — main.js
══════════════════════════════════════════════════════ */

/* ── FORMSPREE ─────────────────────────────────────── */
const FORMSPREE_URL = 'https://formspree.io/f/xqeoqllp';

/* ── CUSTOM CURSOR ─────────────────────────────────── */
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');
let tx = 0, ty = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => {
  tx = e.clientX; ty = e.clientY;
  cursor.style.left = tx + 'px'; cursor.style.top = ty + 'px';
});
function animTrail() {
  cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
  trail.style.left = cx + 'px'; trail.style.top = cy + 'px';
  requestAnimationFrame(animTrail);
}
animTrail();
document.querySelectorAll('a,button,.skill-card,.project-card,.contact-method,.edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

/* ── NAV SCROLL ───────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));

/* ── MOBILE NAV ───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── HERO PARTICLE CANVAS ─────────────────────────── */
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 80; i++) particles.push({ x: Math.random()*1920, y: Math.random()*1080, r: Math.random()*1.5+.3, vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3, alpha: Math.random()*.5+.1 });
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=W; if(p.x>W) p.x=0; if(p.y<0) p.y=H; if(p.y>H) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(110,231,183,${p.alpha})`; ctx.fill();
    });
    for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(110,231,183,${.08*(1-dist/120)})`; ctx.lineWidth=.5; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── BACKGROUND PARTICLES ────────────────────────── */
(function() {
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const dots = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for(let i=0;i<50;i++) dots.push({ x:Math.random()*1920, y:Math.random()*1080, r:Math.random()*.8+.2, vx:(Math.random()-.5)*.15, vy:(Math.random()-.5)*.15, alpha:Math.random()*.2+.05 });
  function draw() {
    ctx.clearRect(0,0,W,H);
    dots.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0) p.x=W; if(p.x>W) p.x=0; if(p.y<0) p.y=H; if(p.y>H) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(129,140,248,${p.alpha})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── SCROLL REVEAL ───────────────────────────────── */
const revealEls = document.querySelectorAll('.section-label,.section-title,.fade-in,.skill-card,.project-card,.research-card,.edu-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
    setTimeout(() => entry.target.classList.add('visible'), delay);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── COUNTER ANIMATION ───────────────────────────── */
function animateCount(el) {
  const target = parseInt(el.dataset.count);
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 20);
}
const statObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.stat-num').forEach(animateCount);
    statObs.unobserve(entry.target);
  });
}, { threshold: .5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObs.observe(heroStats);

/* ── CONTACT FORM — Formspree ────────────────────── */
const form       = document.getElementById('contact-form');
const btnText    = document.getElementById('btn-text');
const btnLoad    = document.getElementById('btn-loading');
const btnIcon    = document.getElementById('btn-icon');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');

if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    btnText.style.display = 'none';
    btnLoad.style.display = 'inline';
    btnIcon.style.display = 'none';
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';
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
      if (res.ok) {
        successMsg.innerHTML = "✅ Message sent! I'll get back to you soon.";
        successMsg.style.display = 'block';
        form.reset();
      } else {
        throw new Error('Formspree error ' + res.status);
      }
    } catch (err) {
      console.error('Form error:', err);
      errorMsg.innerHTML = '❌ Something went wrong. Please email me at jestinthomas1507@gmail.com';
      errorMsg.style.display = 'block';
    } finally {
      btnText.style.display = 'inline';
      btnLoad.style.display = 'none';
      btnIcon.style.display = 'inline';
    }
  });
}

/* ── SMOOTH ANCHOR LINKS ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});

/* ── CARD 3D TILT ────────────────────────────────── */
document.querySelectorAll('.project-card,.research-card,.skill-card,.edu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - .5;
    const y = (e.clientY - rect.top)  / rect.height - .5;
    card.style.transform = `perspective(800px) rotateY(${x*4}deg) rotateX(${-y*3}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
