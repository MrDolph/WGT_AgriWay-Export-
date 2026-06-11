// AgriWay Export — scripts.js

// ---- Navbar scroll effect ----
var navbar = document.getElementById('navbar');
var heroHeight = window.innerHeight * 0.85; // turn solid before leaving hero

function updateNavbar() {
    if (window.scrollY > heroHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('resize', function() {
    heroHeight = window.innerHeight * 0.85;
}, { passive: true });
updateNavbar();

// ---- Active nav link on scroll ----
var sections = document.querySelectorAll('section[id], div[id]');
var navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function(section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { passive: true });

// ---- Hamburger menu ----
var hamburger = document.getElementById('hamburger');
var navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
    document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinksEl.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ---- Scroll reveal ----
function checkReveal() {
    var windowH = window.innerHeight;
    document.querySelectorAll('.reveal-up, .reveal-right').forEach(function(el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < windowH - 80) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('resize', checkReveal);
setTimeout(checkReveal, 100);

// ---- Counter animation for stats ----
function animateCounter(el, target, suffix) {
    var start = 0;
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = (suffix === '$' ? '$' : '') + current.toLocaleString() + (suffix && suffix !== '$' ? suffix : '');
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Trigger counter when stats come into view
var statsTriggered = false;
var statsSection = document.querySelector('.hero-stats');

function checkStats() {
    if (statsTriggered || !statsSection) return;
    var rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
        statsTriggered = true;
        var nums = document.querySelectorAll('.hero-stat-num');
        var data = [
            { target: 2400, suffix: '+' },
            { target: 48, suffix: '' },
            { target: 12, suffix: 'M+', prefix: '$' },
            { target: 99.8, suffix: '%', decimal: true }
        ];
        nums.forEach(function(num, i) {
            if (data[i]) {
                if (data[i].decimal) {
                    num.textContent = '99.8%';
                } else if (data[i].prefix) {
                    animateCounter(num, data[i].target, data[i].suffix);
                    setTimeout(function() {
                        nums[i].textContent = '$' + nums[i].textContent;
                    }, 50);
                } else {
                    animateCounter(num, data[i].target, data[i].suffix);
                }
            }
        });
    }
}

window.addEventListener('scroll', checkStats, { passive: true });
setTimeout(checkStats, 500);

// ---- Footer year ----
var yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Newsletter form feedback ----
document.querySelectorAll('.newsletter-form, .footer-input-wrap').forEach(function(form) {
    var btn = form.querySelector('button, [type="submit"]');
    var input = form.querySelector('input[type="email"], input');
    if (!btn || !input) return;
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!input.value || !input.value.includes('@')) {
            input.style.borderBottom = '2px solid #e94560';
            setTimeout(function() { input.style.borderBottom = ''; }, 2000);
            return;
        }
        var original = btn.innerHTML;
        btn.innerHTML = '✓';
        btn.style.background = '#042C2C';
        input.value = '';
        setTimeout(function() {
            btn.innerHTML = original;
            btn.style.background = '';
        }, 3000);
    });
});