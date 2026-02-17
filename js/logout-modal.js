// Logout Modal Handler
// Manages the custom logout confirmation modal

(function() {
    'use strict';

    let logoutCallback = null;
    let currentModal = null;
    let modalInitialized = false;

    // Debug logging function
    function debugLog(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = '[LogoutModal Debug]';
        if (type === 'error') {
            console.error(`${prefix} [${timestamp}] ${message}`);
        } else if (type === 'warning') {
            console.warn(`${prefix} [${timestamp}] ${message}`);
        } else {
            console.log(`${prefix} [${timestamp}] ${message}`);
        }
    }

    // Enhanced element detection with retry mechanism and multiple methods
    function findModalElements(maxRetries = 3, retryDelay = 100) {
        debugLog('Searching for modal elements...');
        
        let attempts = 0;
        
        function attemptFind() {
            attempts++;
            debugLog(`Element search attempt ${attempts}/${maxRetries}`);
            
            // Method 1: Direct getElementById (fastest)
            const modal = document.getElementById('logoutModal');
            const overlay = document.getElementById('logoutModalOverlay');
            const cancelBtn = document.getElementById('logoutCancelBtn');
            const confirmBtn = document.getElementById('logoutConfirmBtn');

            // Method 2: QuerySelector (fallback)
            const modalQuery = document.querySelector('#logoutModal');
            const overlayQuery = document.querySelector('#logoutModalOverlay');
            const cancelBtnQuery = document.querySelector('#logoutCancelBtn');
            const confirmBtnQuery = document.querySelector('#logoutConfirmBtn');

            // Method 3: getElementsByClassName (additional fallback)
            const modalClass = document.getElementsByClassName('modal');
            const overlayClass = document.getElementsByClassName('logout-modal-overlay');
            const cancelBtnClass = document.getElementsByClassName('logout-cancel-btn');
            const confirmBtnClass = document.getElementsByClassName('logout-confirm-btn');

            // Log detailed results for debugging
            debugLog(`Modal element: getElementById=${modal !== null}, querySelector=${modalQuery !== null}, className=${modalClass.length > 0}`);
            debugLog(`Overlay element: getElementById=${overlay !== null}, querySelector=${overlayQuery !== null}, className=${overlayClass.length > 0}`);
            debugLog(`Cancel button: getElementById=${cancelBtn !== null}, querySelector=${cancelBtnQuery !== null}, className=${cancelBtnClass.length > 0}`);
            debugLog(`Confirm button: getElementById=${confirmBtn !== null}, querySelector=${confirmBtnQuery !== null}, className=${confirmBtnClass.length > 0}`);

            // Use the first available method with fallbacks
            const result = {
                modal: modal || modalQuery || (modalClass.length > 0 ? modalClass[0] : null),
                overlay: overlay || overlayQuery || (overlayClass.length > 0 ? overlayClass[0] : null),
                cancelBtn: cancelBtn || cancelBtnQuery || (cancelBtnClass.length > 0 ? cancelBtnClass[0] : null),
                confirmBtn: confirmBtn || confirmBtnQuery || (confirmBtnClass.length > 0 ? confirmBtnClass[0] : null)
            };

            // Check if all elements are found
            const allFound = result.modal && result.overlay && result.cancelBtn && result.confirmBtn;
            
            if (allFound) {
                debugLog('All modal elements found successfully!', 'success');
                return result;
            } else if (attempts < maxRetries) {
                debugLog(`Not all elements found, retrying in ${retryDelay}ms...`, 'warning');
                setTimeout(attemptFind, retryDelay);
                return null;
            } else {
                debugLog(`Failed to find all elements after ${attempts} attempts`, 'error');
                return result; // Return whatever we found, even if incomplete
            }
        }
        
        return attemptFind();
    }

    // Initialize the modal when DOM is ready
    function initLogoutModal() {
        if (modalInitialized) {
            debugLog('Modal already initialized, skipping...');
            return;
        }

        debugLog('Starting logout modal initialization...');
        debugLog(`DOM ready state: ${document.readyState}`);

        // Use enhanced element finder with retry mechanism
        const elements = findModalElements(5, 200); // 5 attempts, 200ms delay
        
        // Handle case where elements are still being searched
        if (!elements) {
            debugLog('Element search in progress, will retry automatically', 'info');
            return; // The retry mechanism will call this function again
        }
        
        const { modal, overlay, cancelBtn, confirmBtn } = elements;

        // Check if modal elements exist, if not, create fallback or use native confirm
        if (!modal || !overlay || !cancelBtn || !confirmBtn) {
            const missingElements = [];
            if (!modal) missingElements.push('modal');
            if (!overlay) missingElements.push('overlay');
            if (!cancelBtn) missingElements.push('cancelBtn');
            if (!confirmBtn) missingElements.push('confirmBtn');
            
            debugLog(`Missing modal elements: ${missingElements.join(', ')}`, 'error');
            
            // Enhanced fallback strategy
            if (missingElements.length === 4) {
                debugLog('No modal elements found at all. Modal HTML may not be loaded yet.', 'warning');
                debugLog('Will retry initialization after DOM modification', 'info');
                
                // Set up a MutationObserver to retry when DOM changes
                const observer = new MutationObserver((mutations) => {
                    const newElements = findModalElements(1, 0);
                    if (newElements && newElements.modal) {
                        debugLog('Modal elements detected via MutationObserver, retrying initialization', 'success');
                        observer.disconnect();
                        modalInitialized = false; // Reset to allow re-initialization
                        initLogoutModal(); // Retry initialization
                    }
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                
                // Also retry after a longer delay as backup
                setTimeout(() => {
                    observer.disconnect();
                    debugLog('MutationObserver timeout, attempting final initialization', 'info');
                    modalInitialized = false;
                    initLogoutModal();
                }, 5000);
                
                return;
            } else {
                debugLog('Some modal elements missing, using native confirm fallback', 'warning');
            }
        }

        debugLog('All modal elements found successfully!', 'success');
        modalInitialized = true;

        // Store initialization state to prevent repeated attempts
        window.logoutModalInitialized = true;

        // Cancel button click handler
        if (cancelBtn) {
            cancelBtn.addEventListener('click', hideLogoutModal);
            debugLog('Cancel button event listener attached');
        }

        // Confirm button click handler
        if (confirmBtn) {
            confirmBtn.addEventListener('click', handleLogoutConfirm);
            debugLog('Confirm button event listener attached');
        }

        // Close modal when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', hideLogoutModal);
            debugLog('Overlay click event listener attached');
        }

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && currentModal === 'logout') {
                hideLogoutModal();
            }
        });
        debugLog('Escape key event listener attached');

        // Prevent modal close when clicking inside modal content
        if (modal) {
            const modalContent = modal.querySelector('.logout-modal-content');
            if (modalContent) {
                modalContent.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
                debugLog('Modal content click event listener attached');
            } else {
                debugLog('Modal content element not found', 'warning');
            }
        }

        debugLog('Logout modal initialization completed successfully!', 'success');
    }

    // Show the logout modal
    function showLogoutModal(callback) {
        debugLog('showLogoutModal called');
        logoutCallback = callback;
        currentModal = 'logout';
        
        // Try to get fresh elements in case they weren't available during initialization
        const elements = findModalElements(3, 100);
        const modal = elements ? elements.modal : document.getElementById('logoutModal');
        const confirmBtn = elements ? elements.confirmBtn : document.getElementById('logoutConfirmBtn');
        const cancelBtn = elements ? elements.cancelBtn : document.getElementById('logoutCancelBtn');
        
        // Enhanced fallback logic
        if (!modal || !confirmBtn || !cancelBtn) {
            debugLog('Modal elements not available, checking initialization state', 'warning');
            
            // If we haven't initialized yet, try once more
            if (!window.logoutModalInitialized) {
                debugLog('Attempting to initialize modal before showing', 'info');
                modalInitialized = false;
                initLogoutModal();
                
                // Wait a moment and try again
                setTimeout(() => {
                    showLogoutModal(callback);
                }, 500);
                return;
            }
            
            debugLog('Using native confirm fallback for logout', 'warning');
            // Fallback to native confirm if modal not available or not initialized
            if (confirm("Are you sure you want to log out?")) {
                if (typeof callback === 'function') {
                    debugLog('Executing logout callback from native confirm');
                    callback();
                }
            }
            return;
        }

        debugLog('Displaying custom logout modal');

        // Reset button state
        if (confirmBtn) {
            confirmBtn.classList.remove('loading');
            confirmBtn.disabled = false;
            debugLog('Confirm button state reset');
        } else {
            debugLog('Confirm button not found', 'warning');
        }

        // Show modal with animation
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        debugLog('Modal display set to block');
        
        // Add animation classes
        const overlay = modal.querySelector('.logout-modal-overlay');
        const content = modal.querySelector('.logout-modal-content');
        
        if (overlay) {
            overlay.classList.add('show');
            debugLog('Overlay show class added');
        } else {
            debugLog('Overlay element not found for animation', 'warning');
        }
        if (content) {
            content.classList.add('show');
            debugLog('Content show class added');
        } else {
            debugLog('Content element not found for animation', 'warning');
        }

        // Focus the cancel button for accessibility
        if (cancelBtn) {
            setTimeout(() => {
                cancelBtn.focus();
                debugLog('Cancel button focused for accessibility');
            }, 100);
        } else {
            debugLog('Cancel button not found for focusing', 'warning');
        }

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        debugLog('Body scroll prevented');
        debugLog('Custom logout modal displayed successfully', 'success');
    }

    // Hide the logout modal
    function hideLogoutModal() {
        debugLog('hideLogoutModal called');
        const modal = document.getElementById('logoutModal');
        if (!modal) {
            debugLog('Modal not found in hideLogoutModal', 'warning');
            return;
        }

        const overlay = modal.querySelector('.logout-modal-overlay');
        const content = modal.querySelector('.logout-modal-content');
        
        // Add animation classes for closing
        if (overlay) {
            overlay.classList.remove('show');
            overlay.classList.add('hide');
            debugLog('Overlay hide animation started');
        }
        if (content) {
            content.classList.remove('show');
            content.classList.add('hide');
            debugLog('Content hide animation started');
        }

        // Hide modal after animation
        setTimeout(() => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            debugLog('Modal hidden after animation');
            
            if (overlay) {
                overlay.classList.remove('hide');
            }
            if (content) {
                content.classList.remove('hide');
            }

            // Reset state
            currentModal = null;
            logoutCallback = null;
            debugLog('Modal state reset');

            // Restore body scroll
            document.body.style.overflow = '';
            debugLog('Body scroll restored');
        }, 300);
        debugLog('Logout modal hide process initiated');
    }

    // Handle logout confirmation
    async function handleLogoutConfirm() {
        debugLog('handleLogoutConfirm called');
        const confirmBtn = document.getElementById('logoutConfirmBtn');
        
        // Show loading state
        if (confirmBtn) {
            confirmBtn.classList.add('loading');
            confirmBtn.disabled = true;
            debugLog('Confirm button loading state activated');
        } else {
            debugLog('Confirm button not found in handleLogoutConfirm', 'warning');
        }

        debugLog('Starting 2.8 second delay...');
        // Add 2.8 second delay as requested
        await new Promise(resolve => setTimeout(resolve, 2800));
        debugLog('2.8 second delay completed');

        // Execute the logout callback
        if (typeof logoutCallback === 'function') {
            try {
                debugLog('Executing logout callback');
                await logoutCallback();
                debugLog('Logout callback executed successfully');
            } catch (error) {
                debugLog('Logout error occurred: ' + error.message, 'error');
                console.error('Logout error:', error);
                // Reset button state on error
                if (confirmBtn) {
                    confirmBtn.classList.remove('loading');
                    confirmBtn.disabled = false;
                    debugLog('Confirm button state reset after error');
                }
                return;
            }
        } else {
            debugLog('No logout callback provided', 'warning');
        }

        // Hide modal after successful logout
        hideLogoutModal();
        debugLog('Logout process completed successfully');
    }

    // Public API - replace native confirm for logout
    function confirmLogout(callback) {
        showLogoutModal(callback);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLogoutModal);
        debugLog('DOM not ready, waiting for DOMContentLoaded event');
    } else {
        debugLog('DOM already ready, initializing immediately');
        initLogoutModal();
    }

    // Expose API globally
    window.LogoutModal = {
        confirm: confirmLogout,
        show: showLogoutModal,
        hide: hideLogoutModal
    };
    debugLog('window.LogoutModal API exposed');

    // Auto-replace native confirm for logout-related scenarios
    // This will be called by the existing logout handlers
    window.showLogoutConfirmation = confirmLogout;
    debugLog('window.showLogoutConfirmation function exposed');

    debugLog('Logout modal script loaded successfully', 'info');

})();


