((w, d) => {
    'use strict';

    /**
     * ScrollReveal Manager
     * Handles viewport reveal animations using IntersectionObserver.
     */
    const SELECTORS = 'section, h2, .card, .product-card, .brand-card, .category-card, .form-card, .info-card, .product-item, .product';

    const ScrollReveal = {
        init() {
            this.createObserver();
            this.observeExistingElements();
            this.setupMutationObserver();
        },

        createObserver() {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    } else {
                        // Remove class when scrolling away to allow re-animation from both directions
                        entry.target.classList.remove('active');
                    }
                });
            }, {
                // Trigger when 10% of the element is visible
                threshold: 0.1,
                // Negative rootMargin at top and bottom creates a padding where reveal happens
                rootMargin: '300px 0px 300px 0px'
            });
        },

        observeExistingElements() {
            // Auto-target major semantic elements to reduce manual work
            const targets = d.querySelectorAll(SELECTORS);
            targets.forEach(el => this.prepareAndObserve(el));

            // Also search for existing elements explicitly marked with .reveal
            const manualTargets = d.querySelectorAll('.reveal');
            manualTargets.forEach(el => {
                if (!el.classList.contains('reveal-up') && !el.classList.contains('reveal-down') && !el.classList.contains('reveal-scale')) {
                    el.classList.add('reveal-up');
                }
                this.observer.observe(el);
            });
        },

        prepareAndObserve(el) {
            if (el.dataset.revealSkip) return;

            // Only add reveal classes if not manually handled
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal', 'reveal-up');
            }

            this.observer.observe(el);
        },

        setupMutationObserver() {
            const mutationObserver = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            // Check if node itself matches
                            if (node.matches(SELECTORS) || node.classList.contains('reveal')) {
                                this.prepareAndObserve(node);
                            }
                            // Check children (especially for injected results container)
                            const children = node.querySelectorAll(SELECTORS + ', .reveal');
                            children.forEach(child => this.prepareAndObserve(child));
                        }
                    });
                });
            });

            mutationObserver.observe(d.body, {
                childList: true,
                subtree: true
            });
        }
    };

    const Collapsible = {
        init() {
            this.setupCollapsibles();
            this.setupSidebarCollapsibles();
        },

        setupCollapsibles() {
            const triggers = d.querySelectorAll('[data-collapsible-trigger]');

            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    // Get the target dropdown
                    const targetId = trigger.getAttribute('data-collapsible-target');
                    const dropdown = targetId ? d.querySelector(targetId) : null;

                    // If no explicit target, look for sibling or next element
                    if (!dropdown) {
                        const nextElement = trigger.nextElementSibling;
                        if (nextElement && (nextElement.classList.contains('collapsible-dropdown') ||
                            nextElement.classList.contains('dropdown') ||
                            nextElement.classList.contains('collapsible-content'))) {
                            dropdown = nextElement;
                        }
                    }

                    if (dropdown) {
                        // Toggle the dropdown
                        this.toggleDropdown(dropdown, trigger);
                    }
                });
            });
        },

        // Support for .collapsible-trigger class used in HTML files
        // Using event delegation for better reliability
        setupSidebarCollapsibles() {
            // Use event delegation on document to handle all .collapsible-trigger clicks
            d.addEventListener('click', function (event) {
                // Find if the clicked element or its parent is a .collapsible-trigger
                const trigger = event.target.closest('.collapsible-trigger');

                if (!trigger) return;

                // Stop propagation to prevent conflicts with inline scripts
                event.stopPropagation();

                // Find parent sidebar-collapsible
                const sidebarCollapsible = trigger.closest('.sidebar-collapsible');
                if (sidebarCollapsible) {
                    // Toggle open class on parent
                    sidebarCollapsible.classList.toggle('open');
                }

                // Also find and toggle the dropdown content
                const dropdown = trigger.nextElementSibling;
                if (dropdown && (dropdown.classList.contains('collapsible-dropdown') ||
                    dropdown.classList.contains('collapsible-content'))) {
                    dropdown.classList.toggle('active');
                }
            }, true); // Use capture phase to handle before inline scripts
        },

        toggleDropdown(dropdown, trigger) {
            const isVisible = dropdown.classList.contains('active');

            // Find the parent sidebar-collapsible div
            const sidebarCollapsible = trigger.closest('.sidebar-collapsible');

            // Close all other dropdowns in the same parent (optional)
            const parent = trigger.closest('[data-collapsible-group]') || d.body;
            const siblingTriggers = parent.querySelectorAll('[data-collapsible-trigger]');
            const siblingDropdowns = parent.querySelectorAll('.collapsible-dropdown, .dropdown, .collapsible-content');

            siblingDropdowns.forEach(dd => {
                if (dd !== dropdown) {
                    dd.classList.remove('active');
                    dd.style.maxHeight = '';
                    dd.style.opacity = '';
                }
            });

            siblingTriggers.forEach(t => {
                if (t !== trigger) {
                    t.classList.remove('active');
                }
            });

            if (isVisible) {
                dropdown.classList.remove('active');
                dropdown.style.maxHeight = '';
                dropdown.style.opacity = '';
                trigger.classList.remove('active');
                // Remove open class from parent sidebar-collapsible
                if (sidebarCollapsible) {
                    sidebarCollapsible.classList.remove('open');
                }
            } else {
                dropdown.classList.add('active');
                dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                dropdown.style.opacity = '1';
                trigger.classList.add('active');
                // Add open class to parent sidebar-collapsible
                if (sidebarCollapsible) {
                    sidebarCollapsible.classList.add('open');
                }
            }
        }
    };

    // Initialize when DOM is ready
    if (d.readyState === 'loading') {
        d.addEventListener('DOMContentLoaded', () => {
            ScrollReveal.init();
            Collapsible.init();
        });
    } else {
        ScrollReveal.init();
        Collapsible.init();
    }

})(window, document);




/*lenis*/
((w) => {
    'use strict';

    // Check if Lenis library is loaded
    if (typeof Lenis === 'undefined') return;

    // Initialize Lenis with >480px breakpoint logic
    const initLenis = () => {
        if (w.innerWidth > 480) {
            if (!w.lenis) {
                w.lenis = new Lenis({
                    autoRaf: true,
                    smoothWheel: true,
                    // optimized settings
                    lerp: 0.1,
                    wheelMultiplier: 1.2,
                    touchMultiplier: 2,
                });

                // Optional: expose for debugging
                // w.lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
                //     console.log({ scroll, limit, velocity, direction, progress })
                // })
            }
        } else {
            if (w.lenis) {
                w.lenis.destroy();
                w.lenis = null;
            }
        }
    };

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLenis);
    } else {
        initLenis();
    }

    // Debounced resize listener
    let resizeTimer;
    w.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initLenis, 200);
    });

})(window);


/* ==========================================================================
   HERO IMAGE SEQUENCE ANIMATION
   ========================================================================== */
/**
 * Frame Naming Convention: ezgif-frame-XXX.png (where XXX is 001 to 075)
 * Path: /hero-section/
 * Recommended max frames: 300 for smooth experience and low memory.
 * This module manages a canvas-based sequence that responds to scroll progress.
 */
(() => {
    const heroSection = document.getElementById('hero-images-0');
    if (!heroSection || !window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    console.log("%c[HeroSequence] GSAP Engine Active", "color: #88ce02; font-weight: bold;");

    const CONFIG = {
        path: './hero-section/',
        prefix: 'ezgif-frame-',
        start: 1,
        end: 120,
        digits: 3,
        ext: 'webp',
        debug: false
    };

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    const frames = [];
    const sequence = { frame: 0 };
    let dpr = window.devicePixelRatio || 1;

    // Load images into an array for GSAP to animate
    const preloadImages = () => {
        const promises = [];
        for (let i = CONFIG.start; i <= CONFIG.end; i++) {
            const padded = String(i).padStart(CONFIG.digits, '0');
            const url = `${CONFIG.path}${CONFIG.prefix}${padded}.${CONFIG.ext}`;

            const p = new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    frames[i - CONFIG.start] = img;
                    resolve();
                };
                img.onerror = resolve; // Continue even if one fails
                img.src = url;
            });
            promises.push(p);
        }
        return Promise.all(promises);
    };

    const render = () => {
        const frame = frames[sequence.frame];
        if (!frame) return;

        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        // Clear canvas for transparency/contain logic
        ctx.clearRect(0, 0, w, h);

        // 'Cover' logic: stretch to fill container area
        const imgW = frame.width;
        const imgH = frame.height;
        const ratio = Math.max(w / imgW, h / imgH);

        const dx = (w - imgW * ratio) / 2;
        const dy = (h - imgH * ratio) / 2;

        ctx.drawImage(frame, dx, dy, imgW * ratio, imgH * ratio);
    };

    const handleResize = () => {
        const width = heroSection.offsetWidth;
        const height = heroSection.offsetHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        render();
    };

    const init = async () => {
        // Only run on screens wider than 480px as per project specification
        if (window.innerWidth <= 480) {
            console.log("[HeroSequence] Skipping initialization for mobile (<= 480px)");
            return;
        }

        console.log("[HeroSequence] Initializing Canvas...");

        // Remove existing content securely
        const existingCanvas = heroSection.querySelector('canvas');
        if (!existingCanvas) {
            heroSection.appendChild(canvas);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        // High-priority first frame
        const firstImg = new Image();
        const firstPadded = String(CONFIG.start).padStart(CONFIG.digits, '0');
        const firstUrl = `${CONFIG.path}${CONFIG.prefix}${firstPadded}.${CONFIG.ext}`;

        firstImg.onload = () => {
            console.log("[HeroSequence] First frame loaded: " + firstUrl);
            frames[0] = firstImg;
            render();
            // Once the canvas has content, we can hide the background fallback
            heroSection.classList.add('canvas-active');
        };
        firstImg.onerror = () => {
            console.error("[HeroSequence] Failed to load first frame: " + firstUrl);
        };
        firstImg.src = firstUrl;

        // Background preload
        await preloadImages();
        console.log("[HeroSequence] Preload complete. Total frames cached: " + frames.filter(f => f).length);

        // Use matchMedia for clean mobile/desktop switching
        const mm = gsap.matchMedia();

        mm.add("(min-width: 481px)", () => {
            const sequenceTween = gsap.to(sequence, {
                frame: CONFIG.end - CONFIG.start,
                duration: 2.5,
                snap: "frame",
                ease: "power2.out",
                paused: true,
                onUpdate: render
            });

            ScrollTrigger.create({
                trigger: heroSection,
                start: "top top",
                end: "+=20",
                pin: true,
                onEnter: () => sequenceTween.play(),
                onLeaveBack: () => sequenceTween.reverse(),
                onRefresh: (self) => {
                    if (self.progress === 0) render();
                },
                invalidateOnRefresh: true
            });
        });

        // Cleanup if needed (matchMedia does this automatically for ScrollTriggers defined inside the add hook)
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();


