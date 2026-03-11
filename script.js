/* ============================================
   VERVE AI — Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Scroll Reveal (Intersection Observer) ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ---------- Navbar scroll effect ----------
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });


  // ---------- Mobile hamburger menu ----------
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });


  // ---------- Animated counter ----------
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1500;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(target * eased);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ---------- Waitlist form ----------
  const waitlistForm = document.getElementById('waitlistForm');
  const waitlistEmail = document.getElementById('waitlistEmail');

  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = waitlistEmail.value.trim();
    if (email) {
      // Show success state
      const btn = waitlistForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✓ You\'re In!';
      btn.style.background = '#10b981';
      waitlistEmail.value = '';
      waitlistEmail.placeholder = 'Thanks! Check your inbox.';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        waitlistEmail.placeholder = 'Enter your email address...';
      }, 3000);
    }
  });


  // ---------- Parallax on hero orb ----------
  const heroOrb = document.querySelector('.hero-orb');
  if (heroOrb && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroOrb.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

});
