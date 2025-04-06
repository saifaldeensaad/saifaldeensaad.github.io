document.addEventListener('DOMContentLoaded', function() {
  // Enhanced smooth scrolling with offset calculation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      history.pushState(null, null, targetId);
    });
  });

  // Optimized sticky navigation with requestAnimationFrame
  let lastScrollPosition = 0;
  const navbar = document.querySelector('.navbar');
  
  function updateNavbar() {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > 50) {
      navbar.classList.add('sticky');
      // Add shadow when scrolled down
      if (currentScrollPosition > lastScrollPosition) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      }
    } else {
      navbar.classList.remove('sticky');
      navbar.style.boxShadow = 'none';
    }
    
    lastScrollPosition = currentScrollPosition;
  }

  // Throttle scroll events
  window.addEventListener('scroll', function() {
    window.requestAnimationFrame(updateNavbar);
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
      this.setAttribute('aria-expanded', this.classList.contains('active'));
    });

    // Close mobile menu on click outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile menu on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
