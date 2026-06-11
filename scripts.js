// AgriWay Export — scripts.js

// Dynamic footer year
var yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

// Back to top — hidden at top, visible after 300px scroll
var backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

if (backToTop) {
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

window.addEventListener('scroll', toggleBackToTop, { passive: true });
toggleBackToTop();

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

// ---- Stats counter animation ----
function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
    }
    requestAnimationFrame(step);
}

var statsTriggered = false;
var statsBar = document.querySelector('.heroStats');

function checkStats() {
    if (statsTriggered || !statsBar) return;
    var rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
        statsTriggered = true;
        document.querySelectorAll('.heroStatNum').forEach(function(el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            if (!isNaN(target)) animateCounter(el, target, 1800);
        });
    }
}

window.addEventListener('scroll', checkStats, { passive: true });
setTimeout(checkStats, 600);