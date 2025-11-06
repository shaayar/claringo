// ===== HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const dropdowns = document.querySelectorAll('.dropdown');

  // Toggle mobile menu
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when clicking on a link (except dropdown buttons)
  navLinks.querySelectorAll('a:not(.dropbtn)').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Handle dropdown clicks on mobile
  dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    
    dropbtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks && hamburger) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
      }
    }
  });
});

// ===== CAROUSEL =====
// 1. Image Array (Data Source)
const imageSources = [
  { src: "./images/slide-1.png", alt: "Image 1" },
  { src: "./images/slide-2.png", alt: "Image 2" },
  { src: "./images/slide-3.png", alt: "Image 3" },
  { src: "./images/slide-4.png", alt: "Image 4" },
  { src: "./images/slide-5.png", alt: "Image 5" },
];

// 2. DOM Elements
const carouselContainer = document.querySelector('.carousel-container');
const indicatorsContainer = document.querySelector('.indicators');

function createCarouselElements() {
  let slidesHTML = '';
  let dotsHTML = '';

  imageSources.forEach((image, index) => {
    const isActive = index === 0 ? 'active' : '';

    slidesHTML += `
      <div class="slide ${isActive}">
        <img src="${image.src}" alt="${image.alt}">
      </div>
    `;

    dotsHTML += `
      <span class="dot ${isActive}" onclick="currentSlide(${index + 1})"></span>
    `;
  });

  carouselContainer.innerHTML = slidesHTML;
  indicatorsContainer.innerHTML = dotsHTML;
}

createCarouselElements();

let slideIndex = 1;
let autoPlayInterval;

// Function for next/previous controls
function changeSlide(n) {
  clearInterval(autoPlayInterval); // Stop auto-play when user manually changes slide
  showSlides(slideIndex += n);
  startAutoPlay(); // Restart auto-play
}

// Function for indicator dots
function currentSlide(n) {
  clearInterval(autoPlayInterval);
  showSlides(slideIndex = n);
  startAutoPlay();
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }

  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
}

// Auto-play functionality
function autoPlay() {
  slideIndex++;
  showSlides(slideIndex);
}

function startAutoPlay() {
  autoPlayInterval = setInterval(autoPlay, 4000); // Change slide every 4 seconds
}

// Start auto-play when page loads
startAutoPlay();

// Pause auto-play when user hovers over carousel (optional but user-friendly)
if (carouselContainer) {
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
    startAutoPlay();
  });
}

// ===== PRODUCTS =====
const products = [
  { image: "./images/product-1.png", name: "Micro Pulverizer" },
  { image: "./images/product-2.png", name: "Heavy Pulverizer with Cyclone" },
  { image: "./images/product-3.png", name: "Masala Pulverizer" },
  { image: "./images/product-4.png", name: "Masala Grading Machine" },
  { image: "./images/product-5.png", name: "Onion Cutting Machine" },
  { image: "./images/product-6.png", name: "Gravy Machine" },
  { image: "./images/product-7.png", name: "Flour Mixing Machine" },
  { image: "./images/product-8.png", name: "Multi Grain Seeds Cleaning Plant" },
  { image: "./images/product-9.png", name: "Multipurpose Combo Machine" },
  { image: "./images/product-10.png", name: "Packing Machine" },
];

const productsContainer = document.querySelector('.products-container');

if (productsContainer) {
  products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <a href="#">View Detail</a>
      </div>
    `;
    productsContainer.appendChild(productElement);
  });
}