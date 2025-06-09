 // Hero text sync with carousel
    const heroTexts = document.querySelectorAll('.hero-text');
    const carouselElement = document.querySelector('#heroCarousel');
    carouselElement.addEventListener('slid.bs.carousel', function (event) {
      const index = event.to;
      heroTexts.forEach(el => el.classList.remove('active'));
      const activeText = document.querySelector(`.hero-text[data-index="${index}"]`);
      if (activeText) activeText.classList.add('active');
    });

    // Section scroll animation
  const sections = document.querySelectorAll('.section');

function checkVisibility() {
  const triggerBottom = window.innerHeight * 0.9;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < triggerBottom && rect.bottom > 100) {
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  });
});


window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('load', checkVisibility);

    // Gallery images hover effect
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend &&
        elementTop >= 0
      );
    };
    const animateElement = (element, index) => {
      element.style.opacity = 1;
      if (index % 2 === 0) {
        element.classList.remove('animate-down');
        void element.offsetWidth;
        element.classList.add('animate-up');
      } else {
        element.classList.remove('animate-up');
        void element.offsetWidth;
        element.classList.add('animate-down');
      }
    };
    const resetElement = (element) => {
      element.style.opacity = 0;
      element.classList.remove('animate-up', 'animate-down');
    };
    const handleScrollAnimation = () => {
      scrollElements.forEach((el, index) => {
        if (elementInView(el, 1.25)) {
          animateElement(el, index);
        } else {
          resetElement(el);
        }
      });
    };
    window.addEventListener('scroll', () => {
      handleScrollAnimation();
    });
    // Initial check
    handleScrollAnimation();

    // Theme toggle logic with SVG icons
    const themeToggle = document.getElementById('theme-toggle');
    const htmlTag = document.documentElement;
    const iconSun = document.getElementById('theme-icon-sun');
    const iconMoon = document.getElementById('theme-icon-moon');

    // Helper to set icon
    function setThemeIcon(isDark) {
      if (isDark) {
        iconSun.style.display = "none";
        iconMoon.style.display = "block";
      } else {
        iconSun.style.display = "block";
        iconMoon.style.display = "none";
      }
    }

    // Load saved theme or default to light
    if (localStorage.getItem('theme') === 'dark') {
      htmlTag.setAttribute('data-theme', 'dark');
      setThemeIcon(true);
    } else {
      setThemeIcon(false);
    }

    themeToggle.addEventListener('click', function() {
      if (htmlTag.getAttribute('data-theme') === 'dark') {
        htmlTag.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        setThemeIcon(false);
      } else {
        htmlTag.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setThemeIcon(true);
      }
    });




  // Testimonial section functionality

/*const swiper = new Swiper('.testimonial-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 3500, // Time in ms between slides
    disableOnInteraction: false // Keep autoplay after user interaction
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    }
  }
});  */



const swiper = new Swiper('.testimonial-swiper', {
  slidesPerView: 3,
  centeredSlides: true,
  loop: true,
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false
  },
  resistance: false,
  resistanceRatio: 0,
});



// Contact form validation and submission

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  let form = e.target;
  let valid = true;
  form.querySelectorAll('input, textarea').forEach(function (input) {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      valid = false;
    } else {
      input.classList.remove('is-invalid');
    }
    if (input.type === 'email' && input.value) {
      // Simple email regex
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailPattern.test(input.value)) {
        input.classList.add('is-invalid');
        valid = false;
      }
    }
  });
  let alertBox = document.getElementById('formAlert');
  if (valid) {
    alertBox.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent.</div>';
    form.reset();
  } else {
    alertBox.innerHTML = '';
  }
});