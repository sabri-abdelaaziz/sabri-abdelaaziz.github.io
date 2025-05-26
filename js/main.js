// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Down Functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollDownContainer = document.querySelector('.scroll-down-container');
    if (scrollDownContainer) {
        // Handle click event
        scrollDownContainer.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Show/hide scroll indicator based on scroll position
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

// Smooth Scroll with improved handling
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

            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Enhanced scroll indicator visibility
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    // Show/hide scroll indicator based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > windowHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'all';
        }
    });

    // Add click handler for scroll indicator
    scrollIndicator.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = aboutSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Add scroll-based parallax effect for hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroSection.querySelector('.hero-content').style.opacity = 
                1 - (scrolled / (window.innerHeight * 0.5));
        }
    });
}

// Text Rotation Animation
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
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

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => {
            this.tick();
        }, delta);
    }
}

// Initialize Text Rotation
window.onload = function() {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};

// Particles Background
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6c5ce7'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
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
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                }, 0);
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize project items as visible
projectItems.forEach(item => {
    item.classList.add('visible');
});

// Add particles.js library
document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function() {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('particles.js loaded');
        });
    };
    document.body.appendChild(script);
});

// Project filtering
const categoryButtons = document.querySelectorAll('.category-button');
const projectCards = document.querySelectorAll('.project-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category').split(',');
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('visible');
                    card.classList.remove('hidden');
                }, 10);
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500);
            }
        });
    });
});

// Add visible class to elements in viewport on load
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    if (isElementInViewport(element)) {
        element.classList.add('visible');
    }
});

// Initialize education timeline
const educationPoints = document.querySelectorAll('.education-point');
educationPoints.forEach((point, index) => {
    point.style.opacity = '0';
    point.style.transform = window.innerWidth > 992 ? 
        'translateX(-50%) translateY(20px)' : 'translateY(20px)';
    point.style.transition = 'all 0.6s ease';
});

// Trigger initial animation after a short delay
setTimeout(() => {
    animateEducationPoints();
}, 500);

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
});

initializeTimeline();

// Add hover effects for timeline items
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('mouseenter', () => {
        const techBadges = content.querySelectorAll('.badge');
        techBadges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.transform = 'translateY(-5px)';
            }, index * 100);
        });
    });
    
    content.addEventListener('mouseleave', () => {
        const techBadges = content.querySelectorAll('.badge');
        techBadges.forEach(badge => {
            badge.style.transform = 'translateY(0)';
        });
    });
});

// Add smooth scroll for timeline
const experienceSection = document.getElementById('experience');
if (experienceSection) {
    experienceSection.addEventListener('wheel', (e) => {
        if (window.innerWidth > 768) {
            e.preventDefault();
            const scrollAmount = e.deltaY;
            experienceSection.scrollTop += scrollAmount;
        }
    });
}

// Skill progress animation
const skillBars = document.querySelectorAll('.skill-progress-bar');
const skillObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

skillBars.forEach(bar => skillObserver.observe(bar));

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Here you would add your actual form submission logic
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
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

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fadeInUp');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Section title animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section h2').forEach(title => {
    observer.observe(title);
});

// 3D Tilt Effect for Cards
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

// Certificate Cards Animation
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.cert-icon').style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.cert-icon').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Enhanced Timeline Animation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add visible class with delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Animate the timeline dot
                        const dot = entry.target.querySelector('.timeline-dot');
                        dot.style.transform = 'translate(-50%, -50%) scale(1.2)';
                        setTimeout(() => {
                            dot.style.transform = 'translate(-50%, -50%) scale(1)';
                        }, 200);
                        
                        // Animate the content
                        const content = entry.target.querySelector('.timeline-content');
                        content.style.opacity = '1';
                        content.style.transform = window.innerWidth > 768 
                            ? `translateX(${entry.target.classList.contains('odd') ? '30px' : '-30px'})` 
                            : 'translateX(0)';
                            
                        // Animate the date
                        const date = entry.target.querySelector('.timeline-date');
                        date.style.opacity = '1';
                        date.style.transform = 'translateY(-50%)';
                        
                    }, index * 300);
                    
                    timelineObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '-50px'
        }
    );

    timelineItems.forEach((item, index) => {
        // Add odd/even classes
        item.classList.add(index % 2 === 0 ? 'odd' : 'even');
        
        // Set initial states
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        const content = item.querySelector('.timeline-content');
        content.style.opacity = '0';
        content.style.transform = window.innerWidth > 768 
            ? `translateX(${index % 2 === 0 ? '30px' : '-30px'})` 
            : 'translateX(0)';
            
        const date = item.querySelector('.timeline-date');
        date.style.opacity = '0';
        
        // Start observing
        timelineObserver.observe(item);
    });
}

// Add scroll-based parallax effect for timeline
window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const timelineRect = timeline.getBoundingClientRect();
        const timelineItems = timeline.querySelectorAll('.timeline-item');
        
        if (timelineRect.top < window.innerHeight && timelineRect.bottom > 0) {
            const scrollProgress = (window.innerHeight - timelineRect.top) / (window.innerHeight + timelineRect.height);
            
            timelineItems.forEach((item, index) => {
                const speed = index % 2 === 0 ? 0.2 : -0.2;
                const yOffset = (scrollProgress * 50 * speed);
                if (window.innerWidth > 768) {
                    item.style.transform = `translateY(${yOffset}px)`;
                }
            });
        }
    }
});

// Typing animation for hero section
const heroText = document.querySelector('.hero-section h1');
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

// Start typing animation when the page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Initialize elements with opacity 0
document.querySelectorAll('.card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
});

// Typing animation for hero section
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init TypeWriter
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
});

// Fade in elements on scroll
const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target); // Stop observing once visible
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

document.querySelectorAll('.fade-in').forEach(element => {
    fadeObserver.observe(element);
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Education Timeline Animation
function animateEducationPoints() {
    const educationPoints = document.querySelectorAll('.education-point');
    
    educationPoints.forEach((point, index) => {
        const rect = point.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
        
        if (isVisible) {
            setTimeout(() => {
                point.style.opacity = '1';
                point.style.transform = window.innerWidth > 992 ? 
                    'translateX(-50%)' : 'translateY(0)';
            }, index * 300);
        }
    });
}

// Add scroll event listener for education timeline
window.addEventListener('scroll', animateEducationPoints);
window.addEventListener('resize', animateEducationPoints);

// Add scroll event listener for animations
window.addEventListener('scroll', () => {
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    fadeElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}); 