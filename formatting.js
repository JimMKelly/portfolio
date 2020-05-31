//#######STICKY BAR############
// When the user scrolls the page
var el = document.getElementById("navbar");
var sticky = el.offsetTop;
el.onscroll = stickyNav();

function stickyNav() {
    if (window.pageYOffset >= sticky) {
        el.classList.add("sticky")
    } else {
        el.classList.remove("sticky");
    }
}

//#######SLIDESHOW############
var slideIndex = 1;
var playSlide;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  clearTimeout(playSlide);
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
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

  playSlide = setTimeout(function() {
    slideIndex++;
    showSlides(slideIndex);
  },4000)
}
