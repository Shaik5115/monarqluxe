document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = current;
  });

  /* ── Mobile hamburger ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Set active nav link based on current page ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  /* ── Scroll reveal (fade-in) ── */
  const fadeEls = document.querySelectorAll('.fade-in');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeEls.forEach(el => revealObserver.observe(el));

  /* ── Counter animation for stats ── */
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent.replace(/[+,]/g, ''), 10);
        if (isNaN(target)) return;
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + (el.textContent.includes('+') ? '+' : '');
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  /* ── Page transition effect ── */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    const isSameDomain = !href.includes('://') || href.startsWith(window.location.origin);
    if (!isSameDomain) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = href;
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(20px)';
      document.body.style.transition = 'all 0.4s ease';
      setTimeout(() => {
        window.location.href = target;
      }, 400);
    });
  });

  /* ── Magnetic hover effect on buttons ── */
  document.querySelectorAll('.btn, .service-card, .industry-card, .job-card').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ── Click popup effect ── */
  document.querySelectorAll('.service-card, .industry-card, .job-card, .why-us-card, .value-item').forEach(el => {
    el.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(212, 175, 55, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s ease-out';
      ripple.style.pointerEvents = 'none';

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* ── Inject ripple keyframes ── */
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  /* ── Form handling ── */
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      const original = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }
});
