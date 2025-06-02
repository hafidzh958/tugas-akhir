// Carousel functionality
let currentIndex = 0;
let slidesPerView = 3;

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const slideWidth = slides[0].getBoundingClientRect().width;
    slidesPerView = window.innerWidth <= 768 ? 1 : 3;

    const offset = -currentIndex * (slideWidth * slidesPerView);
    track.style.transform = `translateX(${offset}px)`;

    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function setupCarouselControls() {
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const indicatorsContainer = document.querySelector('.indicators');

    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const totalPages = Math.ceil(slides.length / slidesPerView);

    // Reset indicators
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const span = document.createElement('span');
        span.className = 'indicator' + (i === 0 ? ' active' : '');
        span.dataset.index = i;
        span.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        indicatorsContainer.appendChild(span);
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalPages;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalPages) % totalPages;
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        updateCarousel();
    });

    updateCarousel();
}

// Fetch menu.json and populate carousel
document.addEventListener('DOMContentLoaded', () => {
    fetch('menu.json?t=' + new Date().getTime())
        .then(res => res.json())
        .then(menu => {
            const track = document.querySelector('.carousel-track');
            track.innerHTML = '';

            menu.forEach(item => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.innerHTML = `
                    <div class="menu-item">
                        <img src="${item.gambar}" alt="${item.nama}">
                        <div class="menu-info">
                            <h3>${item.nama}</h3>
                            <p class="menu-price">${item.harga}</p>
                            <p class="menu-desc">${item.deskripsi}</p>
                        </div>
                    </div>
                `;
                track.appendChild(slide);
            });

            setupCarouselControls();
        })
        .catch(err => console.error('Gagal memuat menu dari JSON:', err));
});

// Smooth scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Responsive menu
function setupResponsiveMenu() {
    const nav = document.querySelector('nav');

    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                nav {
                    display: none;
                    flex-direction: column;
                    position: absolute;
                    top: 100px;
                    left: 0;
                    right: 0;
                    background-color: #b30000;
                    z-index: 100;
                    padding: 20px 0;
                }
                nav.mobile-nav-active {
                    display: flex;
                }
                nav a {
                    margin: 10px 0;
                    padding: 10px;
                }
                .mobile-menu-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    z-index: 101;
                }
            }
        `;
        document.head.appendChild(style);

        const btn = document.createElement('button');
        btn.className = 'mobile-menu-btn';
        btn.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('header').appendChild(btn);

        btn.addEventListener('click', () => {
            nav.classList.toggle('mobile-nav-active');
            btn.innerHTML = nav.classList.contains('mobile-nav-active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

window.addEventListener('load', setupResponsiveMenu);
window.addEventListener('resize', setupResponsiveMenu);

// Slider untuk testimoni (3 per slide)
let testiIndex = 0;
let testiPerView = 3;

function updateTestimoniSlider() {
  const track = document.querySelector('.testimoni-track');
  const slideWidth = document.querySelector('.testimoni-item').offsetWidth;
  testiPerView = window.innerWidth <= 768 ? 1 : 3;

  const offset = -testiIndex * (slideWidth * testiPerView);
  track.style.transform = `translateX(${offset}px)`;
}

function setupTestimoniControls() {
  const prevBtn = document.querySelector('.testimoni-prev');
  const nextBtn = document.querySelector('.testimoni-next');
  const items = document.querySelectorAll('.testimoni-item');

  let totalPages = Math.ceil(items.length / testiPerView);

  prevBtn.addEventListener('click', () => {
    testiIndex = (testiIndex - 1 + totalPages) % totalPages;
    updateTestimoniSlider();
  });

  nextBtn.addEventListener('click', () => {
    testiIndex = (testiIndex + 1) % totalPages;
    updateTestimoniSlider();
  });

  window.addEventListener('resize', () => {
    testiIndex = 0;
    updateTestimoniSlider();
  });

  updateTestimoniSlider();
}

document.addEventListener('DOMContentLoaded', setupTestimoniControls);
