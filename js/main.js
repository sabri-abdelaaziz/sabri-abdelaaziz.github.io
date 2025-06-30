// Initialize AOS after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Navbar scroll effect
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Down Container
document.addEventListener('DOMContentLoaded', () => {
    const scrollDownContainer = document.querySelector('.scroll-down-container');
    if (scrollDownContainer) {
        scrollDownContainer.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            if (scrollPosition > windowHeight * 0.3) {
                scrollDownContainer.style.opacity = '0';
                scrollDownContainer.style.pointerEvents = 'none';
            } else {
                scrollDownContainer.style.opacity = '1';
                scrollDownContainer.style.pointerEvents = 'all';
            }
        });
    }
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Use replaceState to avoid cluttering history
            history.replaceState(null, null, targetId);
        }
    });
});

// Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    const toggleVisibility = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        if (scrollPosition > windowHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'all';
        }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // initial check

    scrollIndicator.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
}

// Parallax effect for hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.5));
            }
        }
    });
}

// TextRotate class with immediate start
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let delta = 200 - Math.random() * 100;
        if (this.isDeleting) delta /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

// Initialize TextRotate on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
});

// Load particles.js library and initialize only once
document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
        if (window.particlesJS) {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#6c5ce7' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#6c5ce7',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
            console.log('particles.js initialized');
        }
    };
    document.body.appendChild(script);
});

// Select all filter buttons (assuming only '.filter-btn' is used for filtering)
const filterButtons = document.querySelectorAll('.filter-btn');
// Select all project items (filter on '.project-item' only)
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons and add to the clicked one
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    projectItems.forEach(item => {
      // Get categories for each item as array, trimming whitespace
      const categories = (item.getAttribute('data-category') || '').split(',').map(cat => cat.trim());

      if (filterValue === 'all' || categories.includes(filterValue)) {
        // Show the item with fade-in classes if you have CSS for that
        item.style.display = 'block';
        setTimeout(() => {
          item.classList.remove('hidden');
          item.classList.add('visible');
        }, 10);
      } else {
        // Hide the item with fade-out classes if you have CSS for that
        item.classList.add('hidden');
        item.classList.remove('visible');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300); // Adjust delay to match your CSS transition duration
      }
    });
  });
});

// Initialize project items as visible on page load
projectItems.forEach(item => {
    item.classList.add('visible');
});

// Fade in elements on scroll using IntersectionObserver
const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Active navigation highlighting on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (!navLink) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
});

// 3D Tilt card effect
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;

        card.querySelector('.tilt-card-inner').style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('.tilt-card-inner').style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// Skill progress animation with IntersectionObserver
const skillBars = document.querySelectorAll('.skill-progress-bar');
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5, rootMargin: '0px' });

skillBars.forEach(bar => skillObserver.observe(bar));

// Contact form submit handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        } catch {
            alert('Something went wrong. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Notification system
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Section title animation observer
const sectionTitleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section h2').forEach(title => {
    sectionTitleObserver.observe(title);
});

// Initialize education timeline animations, timeline scroll effect, etc.
// (Keep your existing logic here, you can similarly optimize as needed)

// Typing animation for hero section with start on load
const heroText = document.querySelector('.hero-section h1');
if (heroText) {
    const originalText = heroText.textContent;
    heroText.textContent = '';

    let charIndex = 0;
    function typeText() {
        if (charIndex < originalText.length) {
            heroText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(typeText, 500);
    });
}
