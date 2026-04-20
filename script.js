const globalBg = document.getElementById('global-bg');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 2.5 + 1;
  const left = Math.random() * 100;
  const delay = Math.random() * 30;
  const duration = Math.random() * 18 + 14;
  const drift = (Math.random() - 0.5) * 140;
  const opacity = Math.random() * 0.35 + 0.1;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${left}%; bottom:-10px;
    opacity:${opacity};
    --drift:${drift}px;
    animation-duration:${duration}s;
    animation-delay:-${delay}s;
  `;
  globalBg.appendChild(p);
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const themeToggle = document.getElementById('themeToggle');
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const isDark = theme === 'dark';
  themeToggle.querySelector('.icon-moon').style.display = isDark ? 'block' : 'none';
  themeToggle.querySelector('.icon-sun').style.display  = isDark ? 'none'  : 'block';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}
applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.tl-card, .project-card, .card-badge, .about-text p, .hero-content > *'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${i * 0.05}s`;
  observer.observe(el);
});

const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

(function () {
  const now = new Date();
  const months = (now.getFullYear() - 2026) * 12 + (now.getMonth() - 3) + 1; // April 2026 = 1 mo
  if (months >= 1) {
    const el = document.getElementById('meta-ft-duration');
    if (el) el.textContent = months < 12 ? `${months} mo` : `${Math.floor(months / 12)} yr${months % 12 ? ' ' + (months % 12) + ' mo' : ''}`;
  }
})();

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--accent-2)';
      }
    });
  },
  { rootMargin: '-40% 0px -40% 0px' }
);
sections.forEach(s => sectionObserver.observe(s));




// ── Card tilt ───────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform  = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02,1.02,1.02)`;
    card.style.transition = 'transform 0.05s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
  });
});
