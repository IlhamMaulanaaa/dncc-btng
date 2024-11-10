// navbar scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.remove('navbar-transparent');
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
    navbar.classList.add('navbar-transparent');
  }
});

// Toggle overlay menu
document
  .querySelector('.navbar-toggler')
  .addEventListener('click', function () {
    document.getElementById('overlayMenu').style.display = 'flex';
  });

// Close overlay when clicking outside the menu
document.getElementById('overlayMenu').addEventListener('click', function (e) {
  if (e.target === this) {
    // Ensure it's only closed when clicking outside the menu
    this.style.display = 'none';
  }
});

const navbarToggler = document.querySelector('.navbar-toggler');
const overlayMenu   = document.getElementById('overlayMenu');
const body          = document.body;
const navLinks      = document.querySelectorAll('.overlay .nav-link');

// Toggle overlay saat tombol navbar di-click
navbarToggler.addEventListener('click', () => {
  overlayMenu.classList.remove('d-none');
  overlayMenu.classList.toggle('show');
  body.classList.toggle('overflow-hidden', overlayMenu.classList.contains('show'));
});

// Tutup overlay saat klik di luar menu
overlayMenu.addEventListener('click', (e) => {
  if (e.target === overlayMenu) {
    overlayMenu.classList.remove('show');
    body.classList.remove('overflow-hidden');
  }
});

// Tutup overlay saat menu item di-click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    overlayMenu.classList.add('d-none');
    body.classList.remove('overflow-hidden');
  });
});

// untuk image slider
let currentIndex = 0;

function moveSlide(direction) {
    const slides      = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    // Update currentIndex based on direction
    currentIndex += direction;

    // Wrap around to the first slide if the end is reached
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Wrap to the last slide
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0; // Wrap to the first slide
    }

    // Calculate offset for two images at once
    const offset            = -currentIndex * 50; // Adjust offset
    slides.style.transform  = `translateX(${offset}%)`;
}

// Tampilkan overlay saat gambar diklik
function showOverlay(element) {
  const overlay         = document.getElementById('imageOverlay');
  const overlayImage    = document.getElementById('overlayImage'); // Perbaiki ID di sini
  overlayImage.src      = element.querySelector('img').src; // Atur src dari gambar overlay
  overlay.style.display = 'flex'; // Tampilkan overlay
}

// Sembunyikan overlay saat diklik
function hideOverlay() {
  const overlay         = document.getElementById('imageOverlay');
  overlay.style.display = 'none'; // Sembunyikan overlay
}

function showCardOverlay(event) {
  const image           = event.currentTarget.querySelector('img');
  const card            = event.currentTarget;
  const title           = card.getAttribute('data-title');
  const descriptionFull = card.getAttribute('data-description-full');
  const titleTechnology = card.getAttribute('data-title-technology');
  const descTechnology  = card.getAttribute('data-description-technology');

  const overlay = document.getElementById('cardOverlay');
  overlay.querySelector('img').src = image.src;
  overlay.querySelector('#title-project').innerText = title;
  overlay.querySelector('#title-tech').innerText = titleTechnology;
  overlay.querySelector('#desc-project').innerText = descriptionFull;
  overlay.querySelector('#desc-tech').innerText = descTechnology;

  overlay.classList.add('show');
  document.body.style.overflow = 'hidden'; // Mencegah scroll
}

function hideCardOverlay() {
  const overlay = document.getElementById('cardOverlay');
  overlay.classList.remove('show');
  document.body.style.overflow = ''; // Mengembalikan scroll
}

// Tambahkan event listener pada setiap card
document.querySelectorAll('.project-section .card').forEach(card => {
  card.addEventListener('click', showCardOverlay);
});

// Array of texts to display in typing animation
const texts = ["I'm Backend Developer", "I Create Secure Systems", "I'm Passionate About Technology"];
let currentIndexType = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenTexts = 2000; // Delay between changing texts

const typingText = document.getElementById("typing-text");

function type() {
  if (charIndex < texts[currentIndexType].length) {
    typingText.textContent += texts[currentIndexType].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenTexts);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = texts[currentIndexType].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    currentIndexType = (currentIndexType + 1) % texts.length;
    setTimeout(type, typingSpeed);
  }
}

// Start the typing animation
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, delayBetweenTexts);
});
