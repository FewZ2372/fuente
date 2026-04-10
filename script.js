const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

function closeMenu() {
  if (!mobileMenu || !hamburger) {
    return;
  }

  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

window.closeMenu = closeMenu;

const slides = document.querySelectorAll('.pv-hero__bg-slide');
let current = 0;

if (slides.length > 1) {
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
}

if ('IntersectionObserver' in window) {
  const cards = document.querySelectorAll('.pv-afeccion-card');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) {
    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    cards.forEach((card) => observer.observe(card));
  }
}

const studyModal = document.getElementById('studyModal');
const studyModalTitle = document.getElementById('studyModalTitle');
const studyModalBody = document.getElementById('studyModalBody');
const studyModalMedia = document.getElementById('studyModalMedia');
const studyModalImage = document.getElementById('studyModalImage');
const studyTriggers = document.querySelectorAll('.pv-study-trigger');
const modalCloseTargets = document.querySelectorAll('[data-close-modal]');

function closeStudyModal() {
  if (!studyModal) {
    return;
  }

  studyModal.classList.remove('is-open');
  studyModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openStudyModal(title, body, image, imageAlt) {
  if (!studyModal || !studyModalTitle || !studyModalBody) {
    return;
  }

  studyModalTitle.textContent = title;
  studyModalBody.textContent = body;

  if (studyModalMedia && studyModalImage) {
    if (image) {
      studyModalImage.src = image;
      studyModalImage.alt = imageAlt || '';
      studyModalMedia.hidden = false;
    } else {
      studyModalImage.removeAttribute('src');
      studyModalImage.alt = '';
      studyModalMedia.hidden = true;
    }
  }

  studyModal.classList.add('is-open');
  studyModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

studyTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    openStudyModal(
      trigger.getAttribute('data-study-title') || '',
      trigger.getAttribute('data-study-body') || '',
      trigger.getAttribute('data-study-image') || '',
      trigger.getAttribute('data-study-image-alt') || '',
    );
  });
});

modalCloseTargets.forEach((target) => {
  target.addEventListener('click', closeStudyModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && studyModal?.classList.contains('is-open')) {
    closeStudyModal();
  }
});
