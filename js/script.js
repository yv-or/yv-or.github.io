// Built by Rovy Dalusung with AI assistance; reviewed and personalized by yvor.
// Find the mobile-menu button and the navigation it controls.
const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('nav');

// Only run this part when the current page has a navigation menu.
if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }));
}

// Sections marked .reveal animate in once they enter the visitor's screen.
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  // IntersectionObserver notices when an element becomes visible while scrolling.
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  reveals.forEach((element) => observer.observe(element));
} else {
  // Older browsers still show the content, just without the entrance animation.
  reveals.forEach((element) => element.classList.add('visible'));
}
