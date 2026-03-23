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
  navbar.style.background = window.scrollY > 20
    ? 'rgba(10,10,15,0.95)'
    : 'rgba(10,10,15,0.8)';
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
