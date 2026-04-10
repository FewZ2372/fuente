const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');

function setMenuState(isOpen) {
  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.classList.toggle('is-open', isOpen);
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    setMenuState(!mobileMenu.classList.contains('is-open'));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
}

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = track ? Array.from(track.children) : [];
  const dots = Array.from(document.querySelectorAll('[data-carousel-dot]'));
  let autoplayTimer = null;
  let currentIndex = 0;

  function updateCarousel(index) {
    if (!track || slides.length === 0) {
      return;
    }

    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function restartAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
    }

    autoplayTimer = window.setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 4500);
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      updateCarousel(dotIndex);
      restartAutoplay();
    });
  });

  updateCarousel(0);
  restartAutoplay();
}

const contactModal = document.getElementById('contactModal');
const contactForm = document.getElementById('contactForm');
const contactFormNote = document.getElementById('contactFormNote');
const openContactButtons = document.querySelectorAll('[data-open-contact-modal]');
const closeContactTargets = document.querySelectorAll('[data-close-contact-modal]');

function setContactModalState(isOpen) {
  if (!contactModal) {
    return;
  }

  contactModal.classList.toggle('is-open', isOpen);
  contactModal.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('rigoni-modal-open', isOpen);
}

openContactButtons.forEach((button) => {
  button.addEventListener('click', () => setContactModalState(true));
});

closeContactTargets.forEach((target) => {
  target.addEventListener('click', () => setContactModalState(false));
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (contactFormNote) {
    contactFormNote.hidden = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenuState(false);

    if (contactModal?.classList.contains('is-open')) {
      setContactModalState(false);
    }
  }
});
