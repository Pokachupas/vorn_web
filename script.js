const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const cartCount = document.querySelector('.cart-count');
const toast = document.getElementById('toast');
const addCartButtons = document.querySelectorAll('.add-cart');
const hearts = document.querySelectorAll('.heart');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.getElementById('newsletter-message');

let cart = 0;
let toastTimer;

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

addCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    cart += 1;
    cartCount.textContent = cart;

    showToast(
      `${button.dataset.product} añadido al carrito`
    );
  });
});

hearts.forEach(heart => {
  heart.addEventListener('click', () => {
    const active = heart.classList.toggle('is-favorite');

    heart.textContent = active ? '♥' : '♡';

    heart.style.color = active
      ? '#d1b16f'
      : '#ffffff';
  });
});

newsletterForm?.addEventListener('submit', event => {
  event.preventDefault();

  const email = document
    .getElementById('newsletter-email')
    .value
    .trim();

  if (!email) return;

  newsletterMessage.textContent =
    'Gracias. Te avisaremos de nuevos lanzamientos.';

  newsletterForm.reset();
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll('.reveal')
  .forEach(el => observer.observe(el));

const sections = [
  ...document.querySelectorAll(
    'main section[id], header[id]'
  )
];

const navLinks = [
  ...document.querySelectorAll('.main-nav a')
];

window.addEventListener('scroll', () => {
  const y = window.scrollY + 140;

  let current = 'inicio';

  sections.forEach(section => {
    if (section.offsetTop <= y) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    const target = link
      .getAttribute('href')
      ?.replace('#', '');

    link.classList.toggle(
      'active',
      target === current
    );
  });
});