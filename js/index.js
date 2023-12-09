const API_BASE_URL = "https://lively-necklace-crab.cyclic.app/";


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;

function showSlide2(index) {
  const carousel = document.getElementById('carousel');
  const slideWidth = document.querySelector('.carousel-item').clientWidth;
  const newTransformValue = -index * slideWidth + 'px';
  carousel.style.transform = 'translateX(' + newTransformValue + ')';
  currentIndex = index;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalItems;
  showSlide2(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  showSlide2(currentIndex);
}

// Pada fungsi logout()
function logout() {
  try {
    localStorage.removeItem('loggedInUser');
    fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'success') {
        alert('Logout successful!'); // Tambahkan pemberitahuan logout
        window.location.href = 'login.html';
      } else {
        alert('Logout failed.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Logout failed. Please try again later.');
    });
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during logout.');
  }
}

// Pada fungsi checkLoginStatus logout()
function checkLoginStatus() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const logoutButton = document.querySelector('.logout');
  if (loggedInUser && logoutButton) {
    logoutButton.addEventListener('click', function(event) {
      event.preventDefault();
      logout();
    });
    showLoggedInContent();
  } else {
    showLoggedOutContent();
  }
}

// Pada fungsi showLoggedInContent() dan showLoggedOutContent()
function showLoggedInContent() {
  const logoutButton = document.querySelector('.logout');
  const loginButton = document.querySelector('.login'); // Tambahkan variabel untuk tombol login jika perlu
  if (logoutButton) {
    logoutButton.style.display = 'block';
  }
  if (loginButton) {
    loginButton.style.display = 'none'; // Sembunyikan tombol login jika perlu
  }
}

function showLoggedOutContent() {
  const logoutButton = document.querySelector('.logout');
  const loginButton = document.querySelector('.login'); // Tambahkan variabel untuk tombol login jika perlu
  if (logoutButton) {
    logoutButton.style.display = 'none'; // Sembunyikan tombol logout jika perlu
  }
  if (loginButton) {
    loginButton.style.display = 'block';
  }
}

document.addEventListener("DOMContentLoaded", function() {
  checkLoginStatus();
});