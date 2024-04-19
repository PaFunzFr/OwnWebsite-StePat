/* Scroll back to 0 when refreshing */
/*----------------------------------------------------------------*/
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});

window.addEventListener('load', function() {
    var fadeIn = document.querySelectorAll('.fadeIn');
    fadeIn.forEach(function (fadeIn) {
        fadeIn.classList.add('loaded');
    });
});

/* HOVER ICONS
/*----------------------------------------------------------------*/
function changeImage(imgId,newSrc) {
    document.getElementById(imgId).src = newSrc;
    document.getElementById(imgId).src = newSrc;
    document.getElementById(imgId).src = newSrc;
};

/* TOGGLE MENU */
/*----------------------------------------------------------------*/
let isMenuOpen = false;
let menuContainer = document.querySelector('.menuContainer');
let menuButton = document.querySelector('.buttonMenuContainer');

function toggleMenu() {

    if (!isMenuOpen) {
        // Open Menu
        menuContainer.style.left = 0;
        isMenuOpen = true;

    } else {
        // Close Menu
        menuContainer.style.left = '-100%';
        isMenuOpen = false;
    }
}

menuButton.addEventListener('click', toggleMenu);


