// Profile Dropdown Functionality
// Handles dropdown toggle, profile picture loading, and user info display

(function () {
    'use strict';

    // DOM Elements
    const profileIconBtn = document.getElementById('profileIconBtn');
    const profileDropdownContainer = document.getElementById('profileDropdownContainer');
    const profileIconImg = document.getElementById('profileIconImg');
    const dropdownHeaderImg = document.getElementById('dropdownHeaderImg'); // Header Image in Dropdown

    // Sidebar Elements
    const mobileAvatar = document.getElementById('navbar-avatar-img');
    const sidebarBrand = document.getElementById('sidebarBrand');
    const sidebarProfileContainer = document.getElementById('sidebarProfileContainer');

    // Mobile Dropdown Elements (New)
    const mobileProfileDropdown = document.getElementById('mobileProfileDropdown');
    const mobileDropdownName = document.getElementById('mobileDropdownName');
    const mobileDropdownEmail = document.getElementById('mobileDropdownEmail');
    const mobileDropdownLogoutBtn = document.getElementById('mobileDropdownLogoutBtn');

    // User Info Elements (Dropdown)
    const profileDropdownName = document.getElementById('profileDropdownName');
    const profileDropdownEmail = document.getElementById('profileDropdownEmail');

    // Toggle dropdown on profile icon click
    if (profileIconBtn && profileDropdownContainer) {
        profileIconBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            // Check if click is outside MAIN container AND not on the trigger buttons
            const isClickInside = profileDropdownContainer.contains(e.target);
            const isClickOnMainBtn = profileIconBtn.contains(e.target);

            // Check if click is outside MOBILE container AND not on the trigger
            const isClickInsideMobile = mobileProfileDropdown && mobileProfileDropdown.contains(e.target);
            const isClickOnSidebarProfile = sidebarProfileContainer && sidebarProfileContainer.contains(e.target);

            // Handle Desktop Dropdown Close
            if (!isClickInside && !isClickOnMainBtn) {
                if (profileDropdownContainer.classList.contains('visible')) {
                    closeDropdown();
                }
            }

            // Handle Mobile Dropdown Close
            if (!isClickInsideMobile && !isClickOnSidebarProfile && mobileProfileDropdown) {
                if (mobileProfileDropdown.style.display === 'block') {
                    toggleMobileDropdown(false);
                }
            }
        });

        // Prevent dropdown from closing when clicking inside it
        profileDropdownContainer.addEventListener('click', function (e) {
            // Allow logout buttons to bubble up so they can be handled by the global listener
            const isLogoutBtn = e.target.closest('#nav-dropdown-logout, .sign-out-btn, #signOutBtn, #mobile-logout-btn, .mobile-logout-btn, #mobileDropdownLogoutBtn');
            if (!isLogoutBtn) {
                e.stopPropagation();
            }
        });
    }

    // Sidebar Profile Click Handler -> Toggles MOBILE Dropdown now
    if (sidebarProfileContainer) {
        sidebarProfileContainer.addEventListener('click', function (e) {
            e.stopPropagation();
            if (mobileProfileDropdown) {
                const isVisible = mobileProfileDropdown.style.display === 'block';
                toggleMobileDropdown(!isVisible);
            }
        });
    }

    function toggleMobileDropdown(show) {
        if (!mobileProfileDropdown) return;

        if (show) {
            mobileProfileDropdown.style.display = 'block';
            // Animation is handled by CSS keyframe on display: block
        } else {
            mobileProfileDropdown.style.display = 'none';
        }
    }

    function toggleDropdown() {
        const dropdownEl = profileDropdownContainer.querySelector('.profile-dropdown');
        const isVisible = profileDropdownContainer.classList.contains('visible');
        if (!isVisible) {
            profileDropdownContainer.style.display = 'block';
            profileDropdownContainer.style.zIndex = '2000';
            if (dropdownEl) {
                dropdownEl.style.zIndex = '2000';
            }
            setTimeout(() => {
                profileDropdownContainer.classList.add('visible');
            }, 10);
        } else {
            closeDropdown();
        }
    }

    function closeDropdown() {
        const dropdownEl = profileDropdownContainer.querySelector('.profile-dropdown');
        profileDropdownContainer.classList.remove('visible');
        setTimeout(() => {
            profileDropdownContainer.style.display = 'none';
            profileDropdownContainer.style.zIndex = '-100000';
            if (dropdownEl) {
                dropdownEl.style.zIndex = '-100000';
            }
        }, 300);
    }

    // Load profile picture from localStorage
    async function loadProfilePicture() {
        let suffix = '';
        try {
            if (typeof DB !== 'undefined') {
                const { data } = await DB.getUser();
                if (data.user?.id) suffix = '_' + data.user.id;
            } else {
                const u = JSON.parse(localStorage.getItem('be_current_user') || '{}');
                if (u.id) suffix = '_' + u.id;
            }
        } catch (e) { console.warn('User fetch failed', e); }

        const profilePicture = localStorage.getItem('be_profile_picture' + suffix);

        if (profilePicture) {
            if (profileIconImg) profileIconImg.src = profilePicture;
            if (dropdownHeaderImg) dropdownHeaderImg.src = profilePicture; // Update dropdown header
            if (mobileAvatar) mobileAvatar.src = profilePicture; // Update mobile sidebar
        }
    }

    // Load user info (name/email) from DB or localStorage
    async function loadUserInfo() {
        try {
            if (typeof DB !== 'undefined') {
                const { data: { user } } = await DB.getUser();
                if (user) {
                    const fullName = user.user_metadata.full_name || 'User';
                    const email = user.email;

                    // Update Main Dropdown
                    if (profileDropdownName) profileDropdownName.textContent = fullName;
                    if (profileDropdownEmail) profileDropdownEmail.textContent = email;

                    // Update Sidebar Text (if needed by HTML, but we just use the name for the new dropdown)
                    const sidebarUserName = document.getElementById('sidebarUserName');
                    const sidebarUserEmail = document.getElementById('sidebarUserEmail');
                    if (sidebarUserName) sidebarUserName.textContent = fullName;
                    if (sidebarUserEmail) sidebarUserEmail.textContent = email;

                    // Update Mobile Dropdown Info
                    if (mobileDropdownName) mobileDropdownName.textContent = fullName;
                    if (mobileDropdownEmail) mobileDropdownEmail.textContent = email;
                }
            }
        } catch (error) {
            console.warn('Failed to load user info for dropdown', error);
        }
    }

    // Unified Logout Handler
    async function handleLogout(e) {
        if (e) e.preventDefault();

        // Find the button to animate
        let btn = null;
        if (e && e.target) {
            btn = e.target.closest('.sign-out-btn, #signOutBtn, #nav-dropdown-logout, #mobile-logout-btn, .mobile-logout-btn, #mobileDropdownLogoutBtn');
        }

        const performLogout = async (isModal = false) => {
            if (!isModal && btn) {
                // Ensure button is relative
                const computedStyle = window.getComputedStyle(btn);
                if (computedStyle.position === 'static') {
                    btn.style.position = 'relative';
                }

                // Spinner HTML Structure
                const spinnerHtml = `
                <div class="spinner center">
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                    <div class="spinner-blade"></div>
                </div>`;
                btn.insertAdjacentHTML('beforeend', spinnerHtml);
            }

            // Only show spinner/delay if NOT coming from the custom modal (which has its own delay and spinner)
            if (!isModal) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            localStorage.removeItem('be_session');

            if (typeof DB !== 'undefined') {
                try {
                    await DB.signOut();
                } catch (error) {
                    console.warn('DB.signOut failed', error);
                }
            }

            window.location.href = 'login.html';
        };

        if (window.LogoutModal && typeof window.LogoutModal.confirm === 'function') {
            window.LogoutModal.confirm(() => performLogout(true));
        } else if (window.showLogoutConfirmation && typeof window.showLogoutConfirmation === 'function') {
            window.showLogoutConfirmation(performLogout);
        } else {
            if (confirm("Are you sure you want to log out?")) {
                await performLogout();
            }
        }
    }

    // Event Delegation for Sign Out
    document.addEventListener('click', async function (e) {
        const btn = e.target.closest('.sign-out-btn, #signOutBtn, #nav-dropdown-logout, #mobile-logout-btn, .mobile-logout-btn, #mobileDropdownLogoutBtn, #sidebar-logout-btn');
        if (btn) await handleLogout(e);
    });

    // Handle case where sidebar Menu stops propagation (found in navigation.js)
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', async function (e) {
            const btn = e.target.closest('.sign-out-btn, #signOutBtn, #mobile-logout-btn, #sidebar-logout-btn, #nav-dropdown-logout');
            if (btn) await handleLogout(e);
        });
    }

    // Update Dropdown UI based on Auth State
    async function updateAuthUI() {
        if (typeof DB === 'undefined') return;

        const { data: { user } } = await DB.getUser();

        // Main Nav Buttons
        const authBtn = document.getElementById('nav-dropdown-logout') || document.getElementById('signOutBtn') || document.getElementById('nav-dropdown-login');
        const profileIconBtn = document.getElementById('profileIconBtn');
        const signupBtn = document.querySelector('.thebigthree-login\\/signup-btn');

        if (authBtn) {
            if (user) {
                // User is Logged In
                authBtn.id = 'nav-dropdown-logout';
                authBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i><span>Logout</span>';
                authBtn.href = '#';

                if (profileIconBtn) profileIconBtn.style.display = 'flex';
                if (signupBtn) signupBtn.style.display = 'none';

                // Desktop Sidebar logic (if exists)
                if (sidebarBrand) sidebarBrand.style.display = 'none';
                if (sidebarProfileContainer) sidebarProfileContainer.style.display = 'flex';

            } else {
                // User is Logged Out
                authBtn.id = 'nav-dropdown-login';
                authBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i><span>Log In</span>';
                authBtn.href = 'login.html';

                if (profileIconBtn) profileIconBtn.style.display = 'none';
                if (signupBtn) signupBtn.style.display = 'flex';

                // Desktop Sidebar logic (if exists)
                if (sidebarBrand) sidebarBrand.style.display = 'block';
                if (sidebarProfileContainer) sidebarProfileContainer.style.display = 'none';

                // Also ensure mobile dropdown is closed/hidden
                if (mobileProfileDropdown) mobileProfileDropdown.style.display = 'none';
            }
        }

        // Mobile Sidebar Specific (Redesigned Menu in account.html)
        const sidebarLoginContainer = document.getElementById('sidebar-login-container');
        const sidebarFooter = document.getElementById('sidebarFooter');

        if (sidebarLoginContainer && sidebarFooter) {
            if (user) {
                // User Logged In: Hide Login, Show Logout in footer
                sidebarLoginContainer.style.display = 'none';

                // Check if logout button already exists in footer
                let logoutBtn = document.getElementById('sidebar-logout-btn');
                if (!logoutBtn) {
                    logoutBtn = document.createElement('button');
                    logoutBtn.id = 'sidebar-logout-btn';
                    logoutBtn.className = 'footer-btn sign-out-btn';
                    logoutBtn.innerHTML = `
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    `;
                    sidebarFooter.appendChild(logoutBtn);
                } else {
                    logoutBtn.style.display = 'flex';
                }

                // Header state
                if (sidebarBrand) sidebarBrand.style.display = 'none';
                if (sidebarProfileContainer) sidebarProfileContainer.style.display = 'flex';
            } else {
                // User Logged Out: Show Login, Hide Logout
                sidebarLoginContainer.style.display = 'block';

                const logoutBtn = document.getElementById('sidebar-logout-btn');
                if (logoutBtn) logoutBtn.style.display = 'none';

                // Header state
                if (sidebarBrand) sidebarBrand.style.display = 'block';
                if (sidebarProfileContainer) sidebarProfileContainer.style.display = 'none';
            }
        }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function () {
        // Set initial z-index to -100000 when hidden
        if (profileDropdownContainer) {
            profileDropdownContainer.style.zIndex = '-100000';
            const dropdownEl = profileDropdownContainer.querySelector('.profile-dropdown');
            if (dropdownEl) {
                dropdownEl.style.zIndex = '-100000';
            }
        }
        
        loadProfilePicture();

        if (typeof DB !== 'undefined') {
            loadUserInfo();
            updateAuthUI();
        } else {
            document.addEventListener('dbReady', function () {
                loadUserInfo();
                updateAuthUI();
            });
        }

        // Listen for internal auth state changes
        window.addEventListener('authStateChanged', () => {
            loadUserInfo();
            updateAuthUI();
        });

        const signupBtn = document.getElementById('signupNavBtn');
        if (signupBtn) {
            signupBtn.addEventListener('click', () => window.location.href = 'login.html');
        }
    });

    window.addEventListener('profilePictureUpdated', loadProfilePicture);
    window.addEventListener('storage', function (e) {
        if (e.key === 'be_session') updateAuthUI();
    });

    window.ProfileDropdown = {
        loadProfilePicture,
        loadUserInfo,
        updateAuthUI
    };
})();



