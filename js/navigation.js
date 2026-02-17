/**
 * Navigation Module
 * Handles mobile navigation, category filtering, and scroll animations
 */

// Mobile Navigation
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeBtn');

  if (!hamburger || !mobileMenu || !closeBtn) return;

  const toggleMenu = (open) => {
    try {
      mobileMenu.setAttribute('aria-hidden', !open);
      mobileMenu.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : 'auto';

      if (open) {
        // Add click outside listener when menu is open
        setTimeout(() => {
          document.addEventListener('click', handleClickOutside);
        }, 10); // Small delay to prevent immediate closing
      } else {
        // Remove click outside listener when menu is closed
        document.removeEventListener('click', handleClickOutside);
      }
    } catch (error) {
      console.error('Error toggling mobile menu:', error);
    }
  };

  const handleClickOutside = (e) => {
    if (!mobileMenu.contains(e.target)) {
      toggleMenu(false);
    }
  };

  hamburger.addEventListener('click', () => toggleMenu(true));
  closeBtn.addEventListener('click', () => toggleMenu(false));

  // Prevent clicks inside the menu from closing it
  mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Handle dropdown toggles
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        const dropdown = toggle.nextElementSibling;
        const icon = toggle.querySelector('.toggle-icon');
        const isExpanded = dropdown.classList.contains('active');
        if (isExpanded) {
          dropdown.classList.remove('active');
          if (icon) icon.textContent = '+';
        } else {
          dropdown.classList.add('active');
          if (icon) icon.textContent = '-';
        }
      } catch (error) {
        console.error('Error toggling dropdown:', error);
      }
    });
  });

  // Close menu when clicking links
  mobileMenu.querySelectorAll('a:not(.mobile-dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });
}

// Category Filtering
function initCategoryFiltering() {
  const chips = document.querySelectorAll('.chip');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      try {
        // Remove active class from all chips
        chips.forEach(c => c.classList.remove('active'));
        // Add active class to clicked chip
        chip.classList.add('active');

        const selectedCategory = chip.textContent.toLowerCase().trim();
        filterProducts(selectedCategory);
      } catch (error) {
        console.error('Error filtering categories:', error);
      }
    });
  });
}

function filterProducts(category) {
  try {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
      const productCategory = card.dataset.category ? card.dataset.category.toLowerCase().trim() : 'all';

      if (category === 'all' || productCategory.includes(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  } catch (error) {
    console.error('Error filtering products:', error);
  }
}

// Scroll Animations
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const animate = () => {
    try {
      const trigger = window.innerHeight * 0.75;
      elements.forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    } catch (error) {
      console.error('Error in scroll animation:', error);
    }
  };

  window.addEventListener('scroll', animate);
  window.addEventListener('load', animate);
}

// Newsletter Form with validation and sanitization
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    try {
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput?.value?.trim();

      // Validate email
      if (!email) {
        showFormError('Please enter a valid email address');
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormError('Please enter a valid email address');
        return;
      }

      // Sanitize input (remove any HTML/script tags)
      const sanitizedEmail = sanitizeInput(email);

      console.log('Subscribed:', sanitizedEmail);
      showFormSuccess('Thank you for subscribing!');

      form.reset();
    } catch (error) {
      console.error('Error processing newsletter subscription:', error);
      showFormError('Sorry, there was an error. Please try again.');
    }
  });
}

// Input sanitization function
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';

  // Remove HTML tags
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Form feedback functions
function showFormError(message) {
  showNotification(message, 'error');
}

function showFormSuccess(message) {
  showNotification(message, 'success');
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" id="navNotificationCloseBtn">&times;</button>
    </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Add event listener for close button
  notification.querySelector('.notification-close').addEventListener('click', function () {
    this.parentElement.parentElement.remove();
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);

  // Add CSS if not already present
  if (!document.getElementById('notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease;
      }
      .notification-success {
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        border-left: 4px solid #28a745;
      }
      .notification-error {
        background: linear-gradient(135deg, #f8d7da, #f5c6cb);
        border-left: 4px solid #dc3545;
      }
      .notification-info {
        background: linear-gradient(135deg, #d1ecf1, #bee5eb);
        border-left: 4px solid #17a2b8;
      }
      .notification-content {
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .notification-message {
        flex: 1;
        font-size: 14px;
        color: #333;
      }
      .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        margin-left: 10px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .notification-close:hover {
        color: #333;
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }
}

// Sticky Header
function initFixedHeader() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // Could implement sticky header logic here
}

// Product Modals with focus management
function initProductModals() {
  const modal = document.getElementById('productModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.querySelector('.modal-content');
  const modalTriggers = document.querySelectorAll('.modal-trigger');

  if (!modal || !modalOverlay || !modalTriggers.length) return;

  let lastFocusedElement = null;

  const closeModal = () => {
    try {
      modalOverlay.classList.remove('show');
      modal.classList.remove('show');
      modalOverlay.classList.add('hide');
      modal.classList.add('hide');

      setTimeout(() => {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        modalOverlay.classList.remove('hide');
        modal.classList.remove('hide');

        // Restore focus
        if (lastFocusedElement) {
          lastFocusedElement.focus();
        }
      }, 300);
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => e.target === modalOverlay && closeModal());

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();

      try {
        // Store the element that triggered the modal
        lastFocusedElement = trigger;

        const template = document.getElementById(trigger.dataset.target);
        if (!template) return;

        // Copy content from template to modal
        ['modal-header', 'modal-body', 'modal-actions'].forEach(section => {
          const target = modalContent.querySelector(`.${section}`);
          const source = template.querySelector(`.${section}`);
          if (target && source) target.innerHTML = source.innerHTML;
        });

        // Show modal with animations
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
        setTimeout(() => {
          modalOverlay.classList.add('show');
          modal.classList.add('show');

          // Focus management - focus first focusable element in modal
          const firstFocusable = modalContent.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }, 10);
      } catch (error) {
        console.error('Error opening modal:', error);
      }
    });
  });
}

// Mobile Pill Navbar Logic
function initMobilePillNav() {
  const navbar = document.getElementById('mobilePillNavbar');
  const searchOverlay = document.getElementById('mobilePillSearchBar');
  const searchInput = document.getElementById('mobilePillSearchInput');

  if (!navbar) return;

  const navItems = navbar.querySelectorAll('.nav-item');

  if (!navItems.length) return;

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // 1. Remove active class from all items
      navItems.forEach(nav => nav.classList.remove('active'));

      // 2. Add active to clicked
      item.classList.add('active');

      // 3. Logic
      const target = item.getAttribute('data-target');

      // Handle Search
      if (target === 'search') {
        if (searchOverlay) {
          searchOverlay.classList.add('active');
          if (searchInput) setTimeout(() => searchInput.focus(), 100);
        }
      } else {
        // Hide search if exists
        if (searchOverlay) {
          searchOverlay.classList.remove('active');
          if (searchInput) searchInput.blur();
        }

        // Navigation Logic
        if (target === 'home') {
          if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
            window.location.href = 'index.html';
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else if (target === 'shop') {
          window.location.href = 'index.html#products';
        } else if (target === 'user') {
          window.location.href = 'profile.html';
        }
      }
    });
  });

  // Search redirection
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }
}

// Export functions for global use
window.initMobileNav = initMobileNav;
window.initCategoryFiltering = initCategoryFiltering;
window.initScrollAnimations = initScrollAnimations;
window.initNewsletterForm = initNewsletterForm;
window.initFixedHeader = initFixedHeader;
window.initProductModals = initProductModals;
window.initMobilePillNav = initMobilePillNav;




document.addEventListener('DOMContentLoaded', function () {
  const splitButtons = document.querySelectorAll('.split-button');

  splitButtons.forEach(button => {
    const leftPart = button.querySelector('.split-button-left');
    const rightPart = button.querySelector('.split-button-right');
    const link = button.querySelector('.split-button-link');
    const dropdown = button.parentElement.querySelector('.mobile-dropdown');

    // Right part (toggle icon) click handler
    if (rightPart) {
      rightPart.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(button, dropdown);
      });
    }

    // Left part click handler - navigate to link
    if (leftPart) {
      leftPart.addEventListener('click', function (e) {
        if (e.target !== link && e.target !== leftPart) {
          return;
        }
        // Allow the link to work normally
      });
    }

    // Prevent dropdown toggle when clicking on nested links
    dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });

  function toggleDropdown(button, dropdown) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true' ||
      button.parentElement.classList.contains('active');

    // Update button state
    button.setAttribute('aria-expanded', !isExpanded);
    button.parentElement.classList.toggle('active', !isExpanded);

    // Toggle dropdown
    if (!isExpanded) {
      dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
    } else {
      dropdown.style.maxHeight = '0';
    }
  }

  // Initialize new Navbar
  initMobilePillNav();

  // Initialize mobile navigation
  initMobileNav();

  /* Search Bar Logic fixed */
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  // Only run if the search bar exists on this page
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function (e) {
      // Prevent submission if input is empty
      if (!searchInput.value.trim()) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
});



