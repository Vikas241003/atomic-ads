document.addEventListener('DOMContentLoaded', () => {

  /* Sticky header shadow on scroll */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* Mobile hamburger menu */
  const hamburger = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');

  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Dark mode toggle */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('atomicads-theme');
  if (savedTheme === 'dark') root.setAttribute('data-theme', 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      if (isDark) {
        root.removeAttribute('data-theme');
        localStorage.setItem('atomicads-theme', 'light');
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('atomicads-theme', 'dark');
      }
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Back to top button */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Scroll reveal for sections */
  const revealTargets = document.querySelectorAll(
    '.brand-card, .service-card, .why-card, .result-card, .about-text, .about-stats, .stat-card, .process-step, .timeline-item, .faq-item, .contact-info-card'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* Counter animation for stats */
  const counters = document.querySelectorAll('.stat-number');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

});
