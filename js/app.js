/**
 * Main Application Module
 * Initializes all components and handles global error handling
 */

class BlueEmberApp {
  constructor() {
    this.init();
  }

  init() {
    this.initNavigation();
    this.initCart();
    this.initGlobalHandlers();
  }

  initNavigation() {
    // Initialize navigation components
    if (typeof initMobileNav === 'function') {
      initMobileNav();
    }
    if (typeof initCategoryFiltering === 'function') {
      initCategoryFiltering();
    }
    if (typeof initScrollAnimations === 'function') {
      initScrollAnimations();
    }
    if (typeof initNewsletterForm === 'function') {
      initNewsletterForm();
    }
    if (typeof initFixedHeader === 'function') {
      initFixedHeader();
    }
    if (typeof initProductModals === 'function') {
      initProductModals();
    }
  }

  initCart() {
    // Initialize cart if CartManager is available
    if (typeof CartManager === 'function') {
      this.cartManager = new CartManager();
    }
  }

  initGlobalHandlers() {
    // Global error handling
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      // Could send error to analytics service
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Could send error to analytics service
    });

    // Prevent context menu on production (optional)
    // document.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  showError(message) {
    // Simple error display - could be enhanced with a proper modal
    alert(message);
  }
}

// Input validation utilities
const ValidationUtils = {
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    // Remove HTML tags and trim
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML.trim();
  },

  isValidPrice(price) {
    const numPrice = parseFloat(price);
    return !isNaN(numPrice) && numPrice >= 0;
  },

  isValidQuantity(quantity) {
    const numQuantity = parseInt(quantity, 10);
    return !isNaN(numQuantity) && numQuantity >= 1;
  }
};

// Export utilities
window.ValidationUtils = ValidationUtils;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.BlueEmberApp = new BlueEmberApp();
/* Search Bar Logic appended by Assistant */
document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    // Only run if the search bar exists on this page
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            // Prevent submission if input is empty
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
});
});



