const THEME_KEY = 'renz-portfolio-theme';

function applyStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const useDark = stored ? stored === 'dark' : prefersDark;

  document.body.classList.toggle('dark-theme', useDark);
  updateThemeToggleLabel(useDark);
}

function updateThemeToggleLabel(isDark) {
  const label = document.querySelector('.theme-toggle-label');
  const icon = document.querySelector('#themeToggle i');
  if (!label || !icon) return;

  label.textContent = isDark ? 'Light' : 'Dark';
  icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
}

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeToggleLabel(isDark);
  });
}

function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

const projects = [
  {
    title: 'SEDA LOYALTY SYSTEM',
    description:
      'A hotel loyalty web system for SEDA where guests can earn, track, and redeem points through an online portal.',
    techStack: [
      'PHP',
      'HTML',
      'CSS',
      'Bootstrap',
      'JavaScript',
      'jQuery',
      'AJAX',
      'MySQL',
    ],
    image: 'seda.png',
    demoUrl: 'https://loyalty.sedahotels.com/'
  },
  {
    title: 'TRAVELOCO ECOMMERCE',
    description:
      'An ecommerce platform for travel-related products and packages, featuring product listings, cart, and checkout flow.',
    techStack: [
      'PHP',
      'HTML',
      'CSS',
      'Bootstrap',
      'JavaScript',
      'jQuery',
      'AJAX',
      'MySQL',
    ],
    image: 'traveloco.png',
    demoUrl: 'https://traveloco.ph/'
  },
  {
    title: 'ONLINE SHOPPING DIAMOND HOTEL ECOMMERCE',
    description:
      'Online shopping site for Diamond Hotel where customers can browse products, place orders, and manage their accounts.',
    techStack: [
      'PHP',
      'HTML',
      'CSS',
      'Bootstrap',
      'JavaScript',
      'jQuery',
      'AJAX',
      'MySQL',
    ],
    image: 'diamond_hotel.png',
    demoUrl: 'https://onlineshopping.diamondhotel.com/'
  },
  {
    title: 'ONLINE SHOPPING AQUARIA ECOMMERCE',
    description:
      'Online shopping site for Aquaria where customers can browse products, place orders, and manage their accounts.',
    techStack: [
      'PHP',
      'HTML',
      'CSS',
      'Bootstrap',
      'JavaScript',
      'jQuery',
      'AJAX',
      'MySQL',
    ],
    image: 'aquaria.png',
    demoUrl: 'https://onlineshopping.aquaria.landcolifestyleventures.com/'
  },
  {
    title: 'BELLEVUE PREMIER CLUB',
    description:
      'A hotel loyalty web system for Anya Elite where guests can earn, track, and redeem points through an online portal.',
    techStack: [
      'PHP',
      'HTML',
      'CSS',
      'Bootstrap',
      'JavaScript',
      'jQuery',
      'AJAX',
      'MySQL',
    ],
    image: 'bpc.png',
    demoUrl: 'https://premierclub.thebellevue.com/'
  },
  {
    title: 'ANYA ELITE LOYALTY SYSTEM',
    description:
      'A hotel loyalty web system for Anya Elite where guests can earn, track, and redeem points through an online portal.',
    techStack: [
      'PHP',
      'HTML',
      'CSS',
      'Bootstrap',
      'JavaScript',
      'jQuery',
      'AJAX',
      'MySQL',
    ],
    image: 'anya.png',
    demoUrl: 'https://elite.anyaresorts.com/'
  },
];

const ROLE_TITLES = [
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
];

function startRoleTyping() {
  const el = document.getElementById('roleText');
  if (!el) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const current = ROLE_TITLES[roleIndex];

    if (!deleting) {
      charIndex += 1;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      charIndex -= 1;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLE_TITLES.length;
      }
    }

    const delay = deleting ? 60 : 90;
    setTimeout(type, delay);
  };

  type();
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const html = projects
    .map((project) => {
      const tags = project.techStack
        .map((t) => `<span class="project-tag">${t}</span>`)
        .join('');

      const demoLink = project.demoUrl
        ? `<a href="${project.demoUrl}" class="project-link" target="_blank" rel="noreferrer">
              <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              <span>Live Demo</span>
            </a>`
        : '';

      const imageMarkup = project.image
        ? `<img src="./assets/projects/${project.image}" alt="Screenshot of ${project.title}" class="project-image" loading="lazy" />`
        : '';

      return `
        <div class="col-md-6 col-lg-4">
          <article class="project-card h-100">
            <div class="project-thumb">
              ${imageMarkup}
            </div>
            <div class="project-body">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-tags">${tags}</div>
              <div class="project-links">
                ${demoLink}
              </div>
            </div>
          </article>
        </div>
      `;
    })
    .join('');

  grid.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  applyStoredTheme();
  initThemeToggle();
  initYear();
  renderProjects();
  startRoleTyping();
});

