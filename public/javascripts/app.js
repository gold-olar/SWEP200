
function classToggle() {
    const navs = document.querySelectorAll('.nav__links')

    navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
}
 
document.querySelector('.Navbar__Link-toggle')
    .addEventListener('click', classToggle);


var toggleButton = document.querySelector(".toggle-button");
var mobileNav = document.querySelector(".mobile-nav");
var toggleBtn = document.querySelector('.Navbar__Link-toggle')
// On click
var nav = document.querySelector('.nav')
toggleBtn.addEventListener("click", function () {
    nav.classList.toggle("open");

});