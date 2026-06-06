
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const navbar = document.querySelector('.navbar');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open') ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealEls.forEach(el => observer.observe(el));
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const duration = 1300;
      const step = Math.max(10, Math.floor(duration / target));
      const tick = () => {
        start += Math.ceil(target / 80);
        if (start >= target) {
          el.textContent = target.toLocaleString() + suffix;
          obs.unobserve(el);
          return;
        }
        el.textContent = start.toLocaleString() + suffix;
        setTimeout(tick, step);
      };
      tick();
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('[data-story]').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const slides = [...carousel.querySelectorAll('img')];
  let index = 0;
  const show = (i) => {
    slides.forEach((img, idx) => img.classList.toggle('active', idx === i));
  };
  show(index);

  const next = carousel.querySelector('[data-next]');
  const prev = carousel.querySelector('[data-prev]');
  if (next) next.addEventListener('click', () => { index = (index + 1) % slides.length; show(index); });
  if (prev) prev.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; show(index); });

  setInterval(() => {
    index = (index + 1) % slides.length;
    show(index);
  }, 4200);
}

document.querySelectorAll('details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      document.querySelectorAll('details').forEach(other => {
        if (other !== detail) other.removeAttribute('open');
      });
    }
  });
});

const form = document.querySelector('[data-contact-form]');
if (form) {
  const alertBox = document.querySelector('[data-form-alert]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      if (alertBox) {
        alertBox.textContent = 'Please fill in your name, email, and message.';
        alertBox.className = 'alert error';
        alertBox.style.display = 'block';
      }
      return;
    }

    if (alertBox) {
      alertBox.textContent = 'Thank you! Your message has been prepared for submission.';
      alertBox.className = 'alert success';
      alertBox.style.display = 'block';
    }
    form.reset();
  });
}

const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
    link.classList.add('active');
  }
});
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bar span').forEach(bar => {
    bar.style.width = bar.dataset.bar + '%';
  });
});