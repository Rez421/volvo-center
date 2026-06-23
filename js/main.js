const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const form = document.getElementById('bookingForm');
const success = document.getElementById('success');
const track = document.getElementById('carouselTrack');
const slides = track ? Array.from(track.querySelectorAll('.carousel-slide')) : [];
const dotsWrap = document.getElementById('carouselDots');
const prev = document.querySelector('.carousel-btn--prev');
const next = document.querySelector('.carousel-btn--next');
let index = 0;

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === index ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Показать слайд ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
}

function goTo(i) {
  index = (i + slides.length) % slides.length;
  if (track) track.style.transform = `translateX(-${index * 100}%)`;
  slides.forEach((slide, idx) => slide.classList.toggle('active', idx === index));
  renderDots();
}

prev?.addEventListener('click', () => goTo(index - 1));
next?.addEventListener('click', () => goTo(index + 1));

if (slides.length) {
  renderDots();
  goTo(0);
  setInterval(() => goTo(index + 1), 5000);
}

burger?.addEventListener('click', () => {
  const open = nav.classList.toggle('active');
  burger.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  });
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  form.hidden = true;
  success.hidden = false;
});