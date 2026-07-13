/**
 * main.js
 * Fetches each section partial and injects them into #app.
 */

const sections = [
  'nav.html',
  'hero.html',
  'work.html',
  'about.html',
  'achievements.html',
  'services.html',
  'contact.html',
  'footer.html',
];

async function loadSections() {
  const app = document.getElementById('app');

  for (const path of sections) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
      const html = await res.text();

      const temp = document.createElement('div');
      temp.innerHTML = html;

      while (temp.firstChild) {
        app.appendChild(temp.firstChild);
      }
    } catch (err) {
      console.error(err);
    }
  }

  initReveal();
  initNav();
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function initNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });
}

// Global so onclick="closeNav()" in HTML can reach it
window.closeNav = function () {
  document.getElementById('navLinks')?.classList.remove('open');
  document.getElementById('navToggle')?.classList.remove('active');
};

loadSections();

document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
