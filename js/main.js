/**
 * CITÉ ÉTOILE DU MONDE
 * MJIC IMMOBILIER SARL — Kinshasa, RDC
 * main.js — Design luxueux
 */

// ── Navbar scroll effect ──────────────────────────────────────────────────
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
      scrollBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
    }
  }, { passive: true });
}

// ── Scroll to top ────────────────────────────────────────────────────────
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Smooth scroll for anchor links ───────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile nav
      const navCollapse = document.getElementById('navbarNav');
      if (navCollapse && navCollapse.classList.contains('show')) {
        document.querySelector('.navbar-toggler')?.click();
      }
    }
  });
});

// ── Animated counters ────────────────────────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    animateCounter(el, target, suffix);
  });
}

// ── Intersection Observer — reveals + counters ────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      initCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const statsBand = document.getElementById('stats-band');
if (statsBand) counterObserver.observe(statsBand);

// Hero stats counters
const heroStats = document.querySelector('.hero-stats-strip');
if (heroStats) counterObserver.observe(heroStats);

// ── Formule card active on click ─────────────────────────────────────────
document.querySelectorAll('.formule-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.formule-card').forEach(c => c.classList.remove('featured'));
    card.classList.add('featured');
  });
});

// ── Contact form ─────────────────────────────────────────────────────────
const contactForm = document.getElementById('quickContactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Envoi en cours...';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalHTML;
      const alert = document.getElementById('formSuccess');
      if (alert) {
        alert.style.display = 'block';
        setTimeout(() => { alert.style.display = 'none'; }, 6000);
      }
      this.reset();
    }, 1500);
  });
}

// ── Active nav link highlighting ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active-page');
    }
  });
});
