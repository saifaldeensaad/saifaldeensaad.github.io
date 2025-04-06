document.addEventListener('DOMContentLoaded', function() {
  // Current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      this.setAttribute('aria-expanded', this.classList.contains('active'));
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Enhanced smooth scrolling with offset calculation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Skip if it's a non-section link (like social media)
      if (this.getAttribute('href') === '#' || 
          this.classList.contains('publication-link') || 
          this.classList.contains('accessibility-link')) {
        return;
      }

      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
        
        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

  // Sticky navigation with scroll direction detection
  const navbar = document.querySelector('.navbar');
  let lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  function updateNavbar() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollPosition > 50) {
      navbar.classList.add('sticky');
      
      // Add shadow when scrolled down
      if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      }
    } else {
      navbar.classList.remove('sticky');
      navbar.style.boxShadow = 'none';
    }
    
    lastScrollPosition = currentScrollPosition;
  }

  // Throttle scroll events
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      window.requestAnimationFrame(updateNavbar);
    }, 66); // ~15fps
  }, false);

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document.querySelectorAll('section, .card').forEach(el => {
    observer.observe(el);
  });

  // Accessibility: Skip to content
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('show-focus-outlines');
    }
  });
});
