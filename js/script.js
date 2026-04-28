/* ============================================
   Swarnamali Associates – JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ── Navbar scroll behaviour ─────────────── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back-to-top button visibility
    const btn = document.getElementById('back-to-top');
    if (btn) {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    // Active nav link
    highlightActiveSection();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ── Mobile nav toggle ───────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Active section highlight ────────────── */
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');
    let current    = '';

    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });

    links.forEach(function (link) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + current
      );
    });
  }

  /* ── Back to top ─────────────────────────── */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Scroll-in animation (Intersection Observer) ── */
  const revealEls = document.querySelectorAll(
    '.service-card, .why-card, .team-card, .about-point, .contact-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* ── Counter animation ───────────────────── */
  function animateCounter(el) {
    const target    = parseInt(el.dataset.target, 10);
    const increment = Math.ceil(target / 90); // ~90 ticks at 20 ms ≈ 1.8 s
    let   current   = 0;

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + (el.dataset.suffix || '');
    }, 20);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) { cObserver.observe(c); });
  }

  /* ── Contact form ────────────────────────── */
  const form  = document.getElementById('contact-form');
  const toast = document.getElementById('toast');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('.form-submit');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      // Simulate async submit
      setTimeout(function () {
        form.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        showToast('✓ Message sent! We\'ll be in touch soon.');
      }, 1200);
    });
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 4000);
  }

  /* ── Current year in footer ──────────────── */
  const yearEl = document.getElementById('current-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

})();
