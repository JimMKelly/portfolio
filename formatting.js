// When the user scrolls the page, execute myFunction
//window.onscroll = function() {stickyNav()};

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