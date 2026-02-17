/**
 * Universal Navbar Functionality
 * Handles all navbar dropdowns, collapsible sections, and navigation interactions
 * across all pages in a consistent manner
 */

class UniversalNavbar {
    constructor() {
        this.activeDropdown = null;
        this.activeCollapsible = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupMainNavDropdowns();
        this.setupCollapsibleSections();
        this.setupMobileMenu();
        this.setupClickOutsideHandlers();
        this.isInitialized = true;
        
        console.log('UniversalNavbar: Initialized');
    }

    /**
     * Setup main navigation dropdowns (Categories, Brands)
     */
    setupMainNavDropdowns() {
        const dropdownItems = document.querySelectorAll('.mobile-dropdown-item');
        
        dropdownItems.forEach(item => {
            const toggleBtn = item.querySelector('.split-button.single-toggle-action');
            const dropdown = item.querySelector('.mobile-dropdown');

            if (toggleBtn && dropdown) {
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleMainDropdown(item);
                });

                // Add accessibility attributes
                toggleBtn.setAttribute('aria-haspopup', 'true');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Toggle main navigation dropdown
     */
    toggleMainDropdown(item) {
        const toggleBtn = item.querySelector('.split-button.single-toggle-action');
        const dropdown = item.querySelector('.mobile-dropdown');
        const isCurrentlyActive = item.classList.contains('active');

        // Close all other dropdowns
        this.closeAllMainDropdowns();

        // Toggle current dropdown
        if (!isCurrentlyActive) {
            item.classList.add('active');
            if (toggleBtn) {
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
            this.activeDropdown = item;
            
            // Handle desktop vs mobile behavior
            if (window.innerWidth > 992) {
                // Desktop: Show dropdown with proper positioning
                this.showDesktopDropdown(dropdown);
            } else {
                // Mobile: Use max-height animation
                this.showMobileDropdown(dropdown);
            }
        }
    }

    /**
     * Show desktop dropdown with proper styling
     */
    showDesktopDropdown(dropdown) {
        if (!dropdown) return;
        
        // Reset any inline styles first
        dropdown.style.maxHeight = '';
        dropdown.style.opacity = '';
        dropdown.style.visibility = '';
        dropdown.style.transform = '';
        
        // Apply desktop specific styles
        dropdown.style.display = 'block';
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.transform = 'translateX(-50%) translateY(0)';
    }

    /**
     * Show mobile dropdown with animation
     */
    showMobileDropdown(dropdown) {
        if (!dropdown) return;
        
        dropdown.style.maxHeight = '0';
        dropdown.style.transition = 'max-height 0.3s ease-in-out';
        
        // Force reflow
        dropdown.offsetHeight;
        
        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
    }

    /**
     * Close all main navigation dropdowns
     */
    closeAllMainDropdowns() {
        const dropdownItems = document.querySelectorAll('.mobile-dropdown-item.active');
        
        dropdownItems.forEach(item => {
            const toggleBtn = item.querySelector('.split-button.single-toggle-action');
            const dropdown = item.querySelector('.mobile-dropdown');
            
            item.classList.remove('active');
            
            if (toggleBtn) {
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
            
            if (dropdown) {
                if (window.innerWidth > 992) {
                    // Desktop: Hide dropdown
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    dropdown.style.transform = 'translateX(-50%) translateY(10px)';
                    
                    setTimeout(() => {
                        dropdown.style.display = 'none';
                    }, 300);
                } else {
                    // Mobile: Collapse with animation
                    dropdown.style.maxHeight = '0';
                }
            }
        });
        
        this.activeDropdown = null;
    }

    /**
     * Setup collapsible sections (mobile sidebar)
     */
    setupCollapsibleSections() {
        const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
        
        collapsibleTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCollapsible(trigger.parentElement);
            });
        });
    }

    /**
     * Toggle collapsible section
     */
    toggleCollapsible(section) {
        if (!section) return;
        
        const trigger = section.querySelector('.collapsible-trigger');
        const content = section.querySelector('.collapsible-content');
        const isCurrentlyOpen = section.classList.contains('open');

        // Close all other collapsible sections (accordion behavior)
        this.closeAllCollapsibles();

        // Toggle current section
        if (!isCurrentlyOpen) {
            section.classList.add('open');
            this.activeCollapsible = section;
            
            if (content) {
                // Set initial state
                content.style.maxHeight = '0';
                
                content.style.transition = 'max-height 0.3s ease-in-out';
                
                // Force reflow
                content.offsetHeight;
                
                // Animate to full height
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            // Rotate chevron icon
            const chevron = trigger?.querySelector('.chevron');
            if (chevron) {
                chevron.style.transform = 'rotate(180deg)';
            }
        }
    }

    /**
     * Close all collapsible sections
     */
    closeAllCollapsibles() {
        const collapsibleSections = document.querySelectorAll('.sidebar-collapsible.open');
        
        collapsibleSections.forEach(section => {
            const trigger = section.querySelector('.collapsible-trigger');
            const content = section.querySelector('.collapsible-content');
            const chevron = trigger?.querySelector('.chevron');
            
            section.classList.remove('open');
            
            if (content) {
                content.style.maxHeight = '0';
            }
            
            if (chevron) {
                chevron.style.transform = 'rotate(0deg)';
            }
        });
        
        this.activeCollapsible = null;
    }

    /**
     * Setup mobile menu functionality
     */
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeBtn = document.getElementById('closeBtn');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
        }

        if (closeBtn && mobileMenu) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMobileMenu();
            });
        }
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (!mobileMenu) return;

        const isOpen = mobileMenu.classList.contains('active');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');

        if (mobileMenu) {
            mobileMenu.classList.add('active');
        }

        // Hamburger is now CSS-controlled, no JavaScript needed

        // Close any open dropdowns when opening mobile menu
        this.closeAllMainDropdowns();
        this.closeAllCollapsibles();
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.getElementById('hamburger');

        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }

        // Hamburger is now CSS-controlled, no JavaScript needed

        // Close all dropdowns and collapsibles when closing mobile menu
        this.closeAllMainDropdowns();
        this.closeAllCollapsibles();
    }

    /**
     * Setup click outside handlers
     */
    setupClickOutsideHandlers() {
        document.addEventListener('click', (e) => {
            // Handle main dropdowns
            if (this.activeDropdown) {
                if (!this.activeDropdown.contains(e.target)) {
                    this.closeAllMainDropdowns();
                }
            }

            // Handle mobile menu
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.getElementById('hamburger');
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                if (!mobileMenu.contains(e.target) && !hamburger?.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllMainDropdowns();
                this.closeAllCollapsibles();
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            // Close mobile menu on desktop
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
            
            // Reset dropdown styles on resize
            setTimeout(() => {
                this.resetDropdownStyles();
            }, 100);
        });
    }

    /**
     * Reset dropdown styles after resize
     */
    resetDropdownStyles() {
        const dropdowns = document.querySelectorAll('.mobile-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.style.maxHeight = '';
            dropdown.style.opacity = '';
            dropdown.style.visibility = '';
            dropdown.style.transform = '';
            dropdown.style.display = '';
            dropdown.style.transition = '';
        });
    }

    /**
     * Public API methods
     */
    closeAll() {
        this.closeAllMainDropdowns();
        this.closeAllCollapsibles();
        this.closeMobileMenu();
    }

    isAnyOpen() {
        return !!(this.activeDropdown || this.activeCollapsible || 
                 document.getElementById('mobileMenu')?.classList.contains('active'));
    }
}

// Initialize universal navbar when DOM is ready
let universalNavbarInstance = null;

function initUniversalNavbar() {
    if (!universalNavbarInstance) {
        universalNavbarInstance = new UniversalNavbar();
    }
    return universalNavbarInstance;
}

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUniversalNavbar);
} else {
    initUniversalNavbar();
}

// Export for manual initialization
window.UniversalNavbar = UniversalNavbar;
window.initUniversalNavbar = initUniversalNavbar;