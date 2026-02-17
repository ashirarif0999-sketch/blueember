/**
 * Mobile Sidebar Functionality
 * Handles mobile sidebar toggle, animations, and interactions for account.html
 */

class MobileSidebar {
    constructor() {
        this.sidebar = null;
        this.hamburger = null;
        this.closeBtn = null;
        this.isOpen = false;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;

        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.sidebar = document.getElementById('mobileMenu');
        this.hamburger = document.getElementById('hamburger');
        this.closeBtn = document.getElementById('closeBtn');

        if (!this.sidebar || !this.hamburger) {
            console.warn('MobileSidebar: Required elements not found');
            return;
        }

        this.bindEvents();
        this.setupCollapsibleSections();
        this.setupKeyboardNavigation();
        this.updateUserInfo();
    }

    bindEvents() {
        // Hamburger toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }

        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
            });
        }

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.sidebar.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.close();
            }
        });

        // Prevent sidebar content clicks from closing sidebar
        if (this.sidebar) {
            this.sidebar.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
                this.hamburger?.focus();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });

        // Theme toggle in sidebar
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => {
                this.handleMobileThemeToggle();
            });
        }

        // Profile dropdown integration
        this.setupProfileIntegration();
    }

    setupCollapsibleSections() {
        // Collapsible functionality is now handled by the enhanced accordion system in account.html
        // This method is disabled to prevent conflicts with the new isolated implementation
        console.log('MobileSidebar: Collapsible sections handled by BlueEmberAccordion system');
    }

    setupKeyboardNavigation() {
        // Enable keyboard navigation for sidebar items
        const navItems = this.sidebar?.querySelectorAll('.sidebar-nav-item, .sub-link');
        if (navItems) {
            navItems.forEach(item => {
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.click();
                    }
                });
            });
        }
    }

        handleSwipe() {
        const swipeDistance = this.touchStartX - this.touchEndX;
        
        // Swipe left to close
        if (swipeDistance > this.minSwipeDistance) {
            this.close();
        }
    }

    setupProfileIntegration() {
        // Update sidebar user info based on current user
        const updateUserInfo = () => {
            this.updateUserInfo();
        };

        // Listen for profile updates
        window.addEventListener('userProfileUpdated', updateUserInfo);
        
        // Initial update
        setTimeout(updateUserInfo, 100);
    }

    updateUserInfo() {
        const userNameElement = this.sidebar?.querySelector('.user-name');
        const userStatusElement = this.sidebar?.querySelector('.user-status');
        
        if (!userNameElement || !userStatusElement) return;

        try {
            // Get current user from localStorage or window.DB
            let currentUser = null;
            
            if (window.DB && typeof window.DB.getUser === 'function') {
                const result = window.DB.getUser();
                const data = result && result.data;
                currentUser = data && data.user;
            } else {
                const userData = localStorage.getItem('be_current_user');
                currentUser = userData ? JSON.parse(userData) : null;
            }

            if (currentUser) {
                const displayName = currentUser.user_metadata?.full_name ||
                                  currentUser.name ||
                                  currentUser.email?.split('@')[0] ||
                                  'User';

                userNameElement.textContent = displayName;
                userStatusElement.textContent = currentUser.email || '';
            } else {
                userNameElement.textContent = '';
                userStatusElement.textContent = '';
            }
        } catch (error) {
            console.warn('MobileSidebar: Error updating user info:', error);
            userNameElement.textContent = 'Guest User';
            userStatusElement.textContent = 'Not Signed In';
        }
    }

    handleMobileThemeToggle() {
        // Toggle dark mode
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');
        
        if (isDark) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }

        // Update theme toggle icon
        this.updateThemeToggleIcon();
        
        // Dispatch theme change event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { isDark: !isDark } 
        }));
    }

    updateThemeToggleIcon() {
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        if (!mobileThemeToggle) return;

        const icon = mobileThemeToggle.querySelector('i');
        const isDark = document.body.classList.contains('dark-mode');
        
        if (icon) {
            icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }

    toggleCollapsible(section) {
        // This method is disabled - accordion functionality moved to BlueEmberAccordion system
        console.log('MobileSidebar: Accordion toggle handled by BlueEmberAccordion system');
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        if (this.isOpen) return;

        this.isOpen = true;
        this.sidebar?.classList.add('active');

        // Hamburger is now CSS-controlled, no JavaScript needed

        // Add overlay to prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus management
        this.sidebar?.setAttribute('aria-hidden', 'false');

        // Animate hamburger icon
        this.animateHamburger(true);

        // Dispatch open event
        this.dispatchEvent('sidebarOpened');

        console.log('MobileSidebar: Opened');
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.sidebar?.classList.remove('active');

        // Hamburger is now CSS-controlled, no JavaScript needed

        // Restore body scroll
        document.body.style.overflow = '';

        // Unfocus management
        this.sidebar?.setAttribute('aria-hidden', 'true');

        // Animate hamburger icon
        this.animateHamburger(false);

        // Note: Collapsible sections are now managed by BlueEmberAccordion system
        // Don't interfere with accordion state here to prevent conflicts

        // Dispatch close event
        this.dispatchEvent('sidebarClosed');

        console.log('MobileSidebar: Closed');
    }

    animateHamburger(isOpen) {
        if (!this.hamburger) return;
        
        const icon = this.hamburger.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars';
        }
    }

    dispatchEvent(eventName) {
        const event = new CustomEvent(`mobileSidebar${eventName}`, {
            detail: { isOpen: this.isOpen }
        });
        window.dispatchEvent(event);
    }

    // Public API
    isOpenState() {
        return this.isOpen;
    }

    destroy() {
        // Clean up event listeners
        if (this.hamburger) {
            this.hamburger.removeEventListener('click', this.toggle);
        }
        
        if (this.closeBtn) {
            this.closeBtn.removeEventListener('click', this.close);
        }
        
        // Remove global listeners
        document.removeEventListener('click', this.handleOutsideClick);
        document.removeEventListener('keydown', this.handleEscape);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Initialize mobile sidebar when DOM is ready
let mobileSidebarInstance = null;

function initMobileSidebar() {
    if (!mobileSidebarInstance) {
        mobileSidebarInstance = new MobileSidebar();
    }
    return mobileSidebarInstance;
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileSidebar);
} else {
    initMobileSidebar();
}

// Export for manual initialization
window.MobileSidebar = MobileSidebar;
window.initMobileSidebar = initMobileSidebar;



 
// Collapsible functionality moved to enhanced accordion system in account.html
// This prevents conflicts with the new isolated accordion implementation