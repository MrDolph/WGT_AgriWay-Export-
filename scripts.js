// AgriWay Export — scripts.js

var hamburger = document.getElementById('hamburger');
var mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.addEventListener('click', function (e) {
    if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

function closeMenu() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Smooth back to top
var backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Scroll reveal
var revealEls = document.querySelectorAll(
    '.sectionTwoContent, .sectionThreeContent .image, ' +
    '.fancyNumContent1, .fancyNumContent2, .fancyNumContent3, ' +
    '.imgContent1, .imgContent2, .partOne, .partTwo, .partThree'
);

revealEls.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
});

function checkReveal() {
    var vh = window.innerHeight;
    revealEls.forEach(function (el) {
        if (el.dataset.seen) return;
        if (el.getBoundingClientRect().top < vh - 80) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.dataset.seen = '1';
        }
    });
}

window.addEventListener('scroll', checkReveal, { passive: true });
setTimeout(checkReveal, 120);