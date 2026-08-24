/* =========================================================
   Elevate Consulting, LLC — Interactions
   - Mobile navigation toggle
   - Active nav link state on scroll
   - Smooth scrolling (progressive enhancement on top of CSS)
   - Scroll reveal animations
   - Contact form success state (frontend only, no backend)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu whenever a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Smooth scrolling for on-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const setActiveNav = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback for older browsers: just show everything
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Header shadow / condensed state on scroll ---------- */
  const header = document.querySelector('header');
  const handleHeaderState = () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 12);
    }
  };
  window.addEventListener('scroll', handleHeaderState, { passive: true });
  handleHeaderState();

  /* ---------- Contact form: frontend-only success state ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form && formSuccess) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic front-end validation using native constraints
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Pull first name for a small personal touch in the success message
      const firstNameField = document.getElementById('fname');
      const firstName = firstNameField && firstNameField.value.trim()
        ? firstNameField.value.trim()
        : '';

      const successHeading = formSuccess.querySelector('strong');
      if (successHeading) {
        successHeading.textContent = firstName
          ? `Thanks, ${firstName} — message received.`
          : 'Thanks — message received.';
      }

      form.classList.add('submitted');
      formSuccess.classList.add('show');
      formSuccess.setAttribute('tabindex', '-1');
      formSuccess.focus({ preventScroll: true });
    });
  }

});
