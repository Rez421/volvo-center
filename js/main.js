document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const bookingForm = document.getElementById('bookingForm');
  const success = document.getElementById('success');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('active');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (bookingForm && success) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      success.hidden = false;
      bookingForm.reset();
    });
  }

  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  const slides = track ? Array.from(track.querySelectorAll('.carousel-slide')) : [];
  let index = 0;
  let autoTimer;

  const update = () => {
    if (!track || !slides.length) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    if (dotsWrap) {
      dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  };

  const renderDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot${i === index ? ' active' : ''}`;
      dot.type = 'button';
      dot.setAttribute('aria-label', `Слайд ${i + 1}`);
      dot.addEventListener('click', () => {
        index = i;
        update();
        restartAuto();
      });
      dotsWrap.appendChild(dot);
    });
  };

  const next = () => {
    if (!slides.length) return;
    index = (index + 1) % slides.length;
    update();
  };

  const prev = () => {
    if (!slides.length) return;
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  const restartAuto = () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 4000);
  };

  prevBtn?.addEventListener('click', () => {
    prev();
    restartAuto();
  });

  nextBtn?.addEventListener('click', () => {
    next();
    restartAuto();
  });

  if (slides.length) {
    renderDots();
    update();
    restartAuto();
  }
});