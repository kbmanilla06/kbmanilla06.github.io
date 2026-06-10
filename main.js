/**
 * main.js
 * Fetches each section partial from /sections/ and injects them
 * sequentially into #app, keeping the page as a single scrollable document.
 */

const sections = [
  'nav.html',
  'hero.html',
  'work.html',
  'about.html',
  'services.html',
  'achievements.html',
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

      // Create a temporary container to parse the fragment
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // Append each child node (preserves <section>, <nav>, <footer> roots)
      while (temp.firstChild) {
        app.appendChild(temp.firstChild);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Initialise scroll-reveal after all sections are in the DOM
  initReveal();
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

loadSections();

document.addEventListener('mousemove', e => {
  document.documentElement.style.setProperty('--mx', e.clientX + 'px');
  document.documentElement.style.setProperty('--my', e.clientY + 'px');
});
