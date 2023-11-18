let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
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