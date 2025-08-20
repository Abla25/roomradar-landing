// RoomRadar Landing Site - Main JavaScript
class RoomRadarApp {
  constructor() {
    this.init();
  }

  async init() {
    await this.loadComponents();
    this.setupNavigation();
    this.setupAnimations();
    this.setupScrollEffects();
    this.setupFAQ();
    this.setupMobileMenu();
    this.setupHeaderEffects();
    this.setupSmoothScroll();
    this.loadTallyEmbeds();
    console.log('🚀 RoomRadar Landing Site initialized');
  }

  // Load navbar and footer components
  async loadComponents() {
    try {
      // Load navbar
      const navbarResponse = await fetch('./partials/navbar.html');
      const navbarHtml = await navbarResponse.text();
      const navbarContainer = document.getElementById('navbar-container');
      if (navbarContainer) {
        navbarContainer.innerHTML = navbarHtml;
      }

      // Load footer
      const footerResponse = await fetch('./partials/footer.html');
      const footerHtml = await footerResponse.text();
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) {
        footerContainer.innerHTML = footerHtml;
      }

      console.log('✅ Components loaded successfully');
    } catch (error) {
      console.error('❌ Error loading components:', error);
    }
  }

  // Setup navigation highlighting and scroll effects
  setupNavigation() {
    // Highlight active page in navigation
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (
        (currentPage === '/' && href === '/') ||
        (currentPage !== '/' && href === currentPage) ||
        (currentPage.includes(href) && href !== '/')
      ) {
        link.classList.add('active');
      }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });
  }

  // Setup scroll-triggered animations
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in, .slide-in-left, .slide-in-right'
    );
    
    animatedElements.forEach(el => {
      observer.observe(el);
    });

    // Add stagger delay to grid items
    const gridItems = document.querySelectorAll('.grid .card, .grid .feature-card');
    gridItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('fade-in');
      observer.observe(item);
    });
  }

  // Setup scroll effects for hero and other elements
  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      
      if (hero) {
        // Parallax effect for hero background
        const heroHeight = hero.offsetHeight;
        if (scrolled < heroHeight) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      }
    });
  }

  // Setup FAQ accordion functionality
  setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      
      if (question && answer) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all other FAQ items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              if (otherAnswer) {
                otherAnswer.classList.remove('active');
              }
            }
          });
          
          // Toggle current item
          if (isActive) {
            item.classList.remove('active');
            answer.classList.remove('active');
          } else {
            item.classList.add('active');
            answer.classList.add('active');
          }
        });
      }
    });
  }

  // Setup mobile menu functionality
  setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
      });

      // Close mobile menu when clicking on links
      const mobileNavLinks = mobileMenu.querySelectorAll('a');
      mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
          mobileMenu.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      });
    }
  }

  // Utility function for smooth scrolling
  smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  // Interactive Header Background Effects
  setupHeaderEffects() {
    const header = document.querySelector('.simple-header');
    if (!header) {
      console.log('❌ Header not found');
      return;
    }
    
    console.log('🎯 Setting up header effects...');
    
    // Set initial values
    header.style.setProperty('--mouse-x', '50%');
    header.style.setProperty('--mouse-y', '50%');
    
    let isMouseInHeader = false;
    let magneticStrength = 0;
    
    header.addEventListener('mouseenter', () => {
      isMouseInHeader = true;
      magneticStrength = 1;
      console.log('🎯 Mouse entered header - magnetic effect active');
    });
    
    header.addEventListener('mousemove', (e) => {
      if (!isMouseInHeader) return;
      
      const rect = header.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Magnetic attraction effect
      const centerX = 50;
      const centerY = 50;
      const distanceX = x - centerX;
      const distanceY = y - centerY;
      
      // Calculate magnetic pull (stronger when closer to center)
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const magneticPull = Math.max(0, 1 - distance / 50);
      
      // Apply magnetic effect
      const magneticX = x + (distanceX * magneticPull * 0.3);
      const magneticY = y + (distanceY * magneticPull * 0.3);
      
      header.style.setProperty('--mouse-x', `${magneticX}%`);
      header.style.setProperty('--mouse-y', `${magneticY}%`);
      
      // Add magnetic animation class
      header.classList.add('magnetic-active');
      
      console.log(`🎯 Magnetic position: ${magneticX.toFixed(1)}%, ${magneticY.toFixed(1)}% (pull: ${magneticPull.toFixed(2)})`);
    });
    
    header.addEventListener('mouseleave', () => {
      isMouseInHeader = false;
      magneticStrength = 0;
      header.style.setProperty('--mouse-x', '50%');
      header.style.setProperty('--mouse-y', '50%');
      header.classList.remove('magnetic-active');
      console.log('🎯 Mouse left header - returning to auto-float');
    });
    
    console.log('✅ Header effects initialized with magnetic attraction');
  }

  // Smooth scroll to sections
  setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Load Tally Embeds
  loadTallyEmbeds() {
    if (typeof Tally !== 'undefined') {
      Tally.loadEmbeds();
      console.log('✅ Tally embeds loaded');
    } else {
      console.log('⏳ Tally script not loaded yet, retrying...');
      setTimeout(() => this.loadTallyEmbeds(), 1000);
    }
  }

  // Form handling utilities
  static handleFormSubmit(form, successCallback) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitButton = form.querySelector('[type="submit"]');
      const originalText = submitButton.textContent;
      
      try {
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (successCallback) {
          successCallback();
        }
        
      } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error submitting the form. Please try again.');
      } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  // Analytics and tracking (placeholder)
  static trackEvent(eventName, properties = {}) {
    console.log(`📊 Event tracked: ${eventName}`, properties);
    
    // Here you would integrate with your analytics service
    // Example: gtag('event', eventName, properties);
    // Example: analytics.track(eventName, properties);
  }

  // CTA click tracking
  static setupCTATracking() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .nav-cta');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const buttonText = button.textContent.trim();
        const buttonHref = button.href || button.getAttribute('onclick') || 'unknown';
        
        RoomRadarApp.trackEvent('CTA_Click', {
          button_text: buttonText,
          button_href: buttonHref,
          page: window.location.pathname
        });
      });
    });
  }
}

// Premium loading animation
class LoadingAnimation {
  static show() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
  }

  static hide() {
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  LoadingAnimation.hide();
  
  // Initialize main app
  const app = new RoomRadarApp();
  
  // Setup CTA tracking
  setTimeout(() => {
    RoomRadarApp.setupCTATracking();
  }, 1000);
});

// Handle page visibility changes for analytics
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    RoomRadarApp.trackEvent('Page_View', {
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  }
});

// Export for use in other scripts
window.RoomRadarApp = RoomRadarApp;
