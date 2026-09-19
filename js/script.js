'use strict';

const projects = [
  { title:'HAU Dorm Finder', description:'A low-fidelity prototype for helping students find housing near Holy Angel University.', tags:['HCI','UX','Wireframe'], url:'projects.html#dorm-finder', image:'images/wireframe.png' },
  { title:'MonsterMatch', description:'A playful dating-profile card built to practice forms, tables, styling, and CSS transitions.', tags:['Web Design','CSS','Animation'], url:'projects.html#monstermatch', image:'images/monstermatch.png' },
  { title:'Curbside Thai', description:'A responsive food-truck site rebuilt with CSS and Flexbox without restructuring the HTML.', tags:['Responsive','CSS','Flexbox'], url:'projects.html#curbside-thai', image:'images/curbside-thai.png' },
  { title:'Iris Music Player', description:'A browser-based music experience combining media controls, lyrics, and JavaScript.', tags:['Web Design','JavaScript','Media'], url:'projects.html#iris-music-player', image:'images/iris-music-player.png' }
];

const assistantKnowledge = {
  name:'Rovy Dalusung',
  role:'BSIT student in the Network Administration track at Holy Angel University',
  skills:['HTML5','CSS3','JavaScript','Java','Python','Linux / RHEL','Cisco fundamentals','Git & GitHub','Responsive design','Wireframing & UX'],
  projects:projects.map(({title,description,tags}) => ({title,description,tags})),
  certification:'CompTIA Tech+',
  nextGoal:'Cisco CCNA',
  github:'https://github.com/yv-or',
  email:'yvor.ph@gmail.com'
};

function filterProjects(list, searchTerm, selectedTag) {
  if (!Array.isArray(list) || typeof searchTerm !== 'string' || typeof selectedTag !== 'string') return [];
  const query = searchTerm.trim().toLowerCase();
  const tag = selectedTag.trim().toLowerCase();
  if (!query && !tag) return list;
  return list.filter((project) => {
    if (!project || typeof project.title !== 'string' || !Array.isArray(project.tags)) return false;
    const searchable = `${project.title} ${project.description || ''} ${project.tags.join(' ')}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesTag = !tag || project.tags.some((item) => String(item).toLowerCase() === tag);
    return matchesQuery && matchesTag;
  });
}

function renderProjects(list) {
  const container = document.querySelector('#interactive-project-list');
  const count = document.querySelector('#project-count');
  if (!container || !count) return;
  if (!Array.isArray(list) || list.length === 0) {
    count.textContent = `Showing 0 of ${projects.length} projects`;
    container.innerHTML = '<p class="interactive-empty">No projects matched. Try a different keyword or filter.</p>';
    return;
  }
  let cards = '';
  for (const project of list) {
    if (!project || typeof project.title !== 'string') continue;
    const tags = Array.isArray(project.tags) ? project.tags.map((tag) => `<span class="tag">${String(tag)}</span>`).join('') : '';
    const image = project.image ? `<img src="${project.image}" alt="${project.title} preview" loading="lazy">` : '';
    cards += `
      <article class="interactive-project-card surface">
        ${image}
        <div class="tag-row">${tags}</div>
        <h3>${project.title}</h3>
        <p>${project.description || 'Project details are available on the full project page.'}</p>
        <a class="text-link" href="${project.url}">Open project →</a>
      </article>`;
  }
  count.textContent = `Showing ${list.length} of ${projects.length} projects`;
  container.innerHTML = cards || '<p class="interactive-empty">Project data could not be displayed right now.</p>';
}

function setupProjectGallery() {
  const input = document.querySelector('#project-search');
  const buttons = [...document.querySelectorAll('.filter-btn')];
  if (!input) return;
  const update = () => {
    const active = document.querySelector('.filter-btn.active');
    const list = filterProjects(projects, input.value, active ? active.dataset.tag || '' : '');
    renderProjects(list);
  };
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    update();
  }));
  input.addEventListener('input', update);
  renderProjects(projects);
}

function setupNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  items.forEach((item) => observer.observe(item));
}

function setupMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.magnetic').forEach((button) => {
    button.addEventListener('mousemove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .12;
      const y = (event.clientY - rect.top - rect.height / 2) * .18;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('mouseleave', () => { button.style.transform = ''; });
  });
}

function setupRotator() {
  const el = document.querySelector('#hero-rotator');
  if (!el) return;
  const words = ['interfaces','networks','systems','experiments'];
  let i = 0;
  window.setInterval(() => { i = (i + 1) % words.length; el.textContent = words[i]; }, 2200);
}

function setupTheme() {
  const stored = localStorage.getItem('portfolio-theme') || 'system';
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const apply = (mode) => {
    const effective = mode === 'system' ? (prefersLight ? 'light' : 'dark') : mode;
    document.documentElement.dataset.theme = effective;
    document.documentElement.dataset.themePreference = mode;
    localStorage.setItem('portfolio-theme', mode);
    document.querySelectorAll('[data-theme-choice]').forEach((select) => { select.value = mode; });
  };
  apply(stored);
  document.querySelectorAll('[data-theme-choice]').forEach((select) => select.addEventListener('change', (event) => apply(event.target.value)));
}

function setupSettings() {
  const modal = document.querySelector('#settings-modal');
  const open = document.querySelector('[data-open-settings]');
  const close = document.querySelector('[data-close-settings]');
  if (!modal || !open) return;
  const setOpen = (state) => {
    modal.classList.toggle('open', state);
    modal.setAttribute('aria-hidden', String(!state));
  };
  open.addEventListener('click', () => setOpen(true));
  if (close) close.addEventListener('click', () => setOpen(false));
  modal.addEventListener('click', (event) => { if (event.target === modal) setOpen(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });

  const motion = document.querySelector('#reduced-motion');
  const assistant = document.querySelector('#assistant-enabled');
  if (motion) {
    const enabled = localStorage.getItem('portfolio-reduced-motion') === 'true';
    motion.checked = enabled;
    if (enabled) document.documentElement.classList.add('force-reduced-motion');
    motion.addEventListener('change', () => {
      localStorage.setItem('portfolio-reduced-motion', String(motion.checked));
      document.documentElement.classList.toggle('force-reduced-motion', motion.checked);
    });
  }
  if (assistant) {
    const enabled = localStorage.getItem('portfolio-assistant') !== 'false';
    assistant.checked = enabled;
    assistant.addEventListener('change', () => {
      const on = assistant.checked;
      localStorage.setItem('portfolio-assistant', String(on));
      const toggle = document.querySelector('.assistant-toggle');
      if (toggle) toggle.hidden = !on;
    });
    const toggle = document.querySelector('.assistant-toggle');
    if (toggle) toggle.hidden = !enabled;
  }
}

function answerAssistant(question) {
  const q = question.trim().toLowerCase();
  if (!q) return 'Ask me about Rovy, projects, skills, certifications, or contact details.';
  if (q.includes('who') || q.includes('about') || q.includes('rovy') || q.includes('yvor')) return `${assistantKnowledge.name} is a ${assistantKnowledge.role}. The portfolio focuses on the overlap between networking, systems, and front-end interfaces.`;
  if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('tech')) return `The current stack includes ${assistantKnowledge.skills.join(', ')}.`;
  if (q.includes('project') || q.includes('work')) return `The featured projects are ${assistantKnowledge.projects.map((p) => p.title).join(', ')}.`;
  if (q.includes('dorm')) return 'HAU Dorm Finder is a low-fidelity HCI prototype for helping students explore housing near Holy Angel University.';
  if (q.includes('monster')) return 'MonsterMatch is a playful dating-profile card project focused on forms, CSS styling, tables, and transitions.';
  if (q.includes('thai') || q.includes('curbside')) return 'Curbside Thai is the responsive CSS/Flexbox project in the portfolio.';
  if (q.includes('iris') || q.includes('music')) return 'Iris Music Player is a browser-based music experience combining media controls, lyrics, and JavaScript.';
  if (q.includes('cert') || q.includes('qualification')) return `The listed certification is ${assistantKnowledge.certification}. The next planned certification is ${assistantKnowledge.nextGoal}.`;
  if (q.includes('email') || q.includes('contact') || q.includes('reach')) return `You can email ${assistantKnowledge.email} or view the contact page. GitHub: ${assistantKnowledge.github}`;
  if (q.includes('github')) return assistantKnowledge.github;
  return 'I only know what is published in this portfolio. Try asking about projects, skills, certifications, or how to contact Rovy.';
}

function setupAssistant() {
  const panel = document.querySelector('#assistant-panel');
  const toggle = document.querySelector('.assistant-toggle');
  const close = document.querySelector('[data-close-assistant]');
  const form = document.querySelector('#assistant-form');
  const input = document.querySelector('#assistant-input');
  const messages = document.querySelector('#assistant-messages');
  const enabledSetting = document.querySelector('#assistant-enabled');
  if (!panel || !toggle || !form || !input || !messages) return;
  const preference = localStorage.getItem('portfolio-assistant');
  if (preference === 'false') toggle.hidden = true;
  const addMessage = (text, type) => {
    const div = document.createElement('div');
    div.className = `chat-msg ${type}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  };
  const openPanel = () => panel.classList.add('open');
  const closePanel = () => panel.classList.remove('open');
  toggle.addEventListener('click', () => panel.classList.toggle('open'));
  if (close) close.addEventListener('click', closePanel);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addMessage(value, 'user');
    addMessage(answerAssistant(value), 'bot');
    input.value = '';
  });
  document.querySelectorAll('.assistant-prompt').forEach((button) => button.addEventListener('click', () => {
    input.value = button.dataset.prompt || '';
    openPanel();
    form.requestSubmit();
  }));
  if (enabledSetting) enabledSetting.addEventListener('change', () => {
    toggle.hidden = !enabledSetting.checked;
    if (!enabledSetting.checked) closePanel();
  });
}

function setupCopyEmail() {
  const button = document.querySelector('[data-copy-email]');
  if (!button) return;
  button.addEventListener('click', async () => {
    const email = 'yvor.ph@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      const old = button.textContent;
      button.textContent = 'Copied ✓';
      setTimeout(() => { button.textContent = old; }, 1400);
    } catch (error) {
      window.location.href = `mailto:${email}`;
    }
  });
}

function setupCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive:true });
}

setupTheme();
setupNavigation();
setupReveal();
setupMagneticButtons();
setupRotator();
setupSettings();
setupAssistant();
setupCopyEmail();
setupCursorGlow();
setupProjectGallery();
