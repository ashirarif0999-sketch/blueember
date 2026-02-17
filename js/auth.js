/**
 * Auth UI Manager - External JavaScript
 * Handles user authentication UI state across all pages
 * Works seamlessly with Supabase authentication
 */

(function () {
  'use strict';

  /**
   * Toggle user icon visibility
   * @param {boolean} show - Whether to show or hide the icon
   */
  function toggleUserIcon(show) {
    const icon = document.getElementById('Hide/UnhideUserIcon');
    if (icon) {
      icon.style.display = show ? 'flex' : 'none';
    }
  }

  /**
   * Toggle signup button visibility
   * @param {boolean} show - Whether to show or hide the button
   */
  function toggleSignupBtn(show) {
    const btn = document.getElementById('Hide/UnhideSignupBtn');
    if (btn) {
      btn.style.display = show ? 'flex' : 'none';
    }
  }

  /**
   * Generate a unique, deterministic color from a string using HSL color space
   * Uses golden ratio hue distribution for visually pleasing colors
   * @param {string} str - Input string (user's name)
   * @returns {object} - { h: number, s: number, l: number }
   */
  function stringToHSL(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Golden ratio for even color distribution
    const goldenRatio = 0.618033988749895;

    // Generate hue from 0-360 using golden ratio
    const h = Math.abs((hash * goldenRatio) % 1) * 360;

    // Keep saturation between 55-75% for pleasing colors
    const s = 55 + Math.abs((hash * 0.5) % 20);

    // Keep lightness between 45-60% for good contrast
    const l = 45 + Math.abs((hash * 0.3) % 15);

    return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
  }

  /**
   * Convert HSL to RGB
   * @param {number} h - Hue (0-360)
   * @param {number} s - Saturation (0-100)
   * @param {number} l - Lightness (0-100)
   * @returns {object} - { r: number, g: number, b: number }
   */
  function hslToRGB(h, s, l) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }

  /**
   * Generate a unique gradient background based on the name
   * Returns complementary colors for gradient effect
   * @param {string} name - User's name
   * @returns {string} - CSS gradient string
   */
  function getUniqueGradient(name) {
    const hsl = stringToHSL(name);
    const rgb1 = hslToRGB(hsl.h, hsl.s, hsl.l);

    // Generate complementary color for gradient (shift hue by 30 degrees, adjust lightness)
    const hsl2 = {
      h: (hsl.h + 30) % 360,
      s: hsl.s - 10,
      l: hsl.l + 10
    };
    const rgb2 = hslToRGB(hsl2.h, hsl2.s, hsl2.l);

    // Convert to hex for UI Avatars API
    const hex1 = `#${rgb1.r.toString(16).padStart(2, '0')}${rgb1.g.toString(16).padStart(2, '0')}${rgb1.b.toString(16).padStart(2, '0')}`;
    const hex2 = `#${rgb2.r.toString(16).padStart(2, '0')}${rgb2.g.toString(16).padStart(2, '0')}${rgb2.b.toString(16).padStart(2, '0')}`;

    return `${hex1},${hex2}`;
  }

  /**
   * Generate unique color for text based on background
   * Returns white or black depending on background brightness
   * @param {object} rgb - RGB object { r, g, b }
   * @returns {string} - White or black hex
   */
  function getContrastColor(rgb) {
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? 'ffffff' : '000000';
  }

  /**
   * Extract initials from a name
   * @param {string} name - User's name
   * @returns {string} - Initials (up to 2 chars)
   */
  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /**
   * Generate a gradient avatar using Canvas
   * @param {string} name - User's name
   * @returns {string} - Data URL of the avatar image
   */
  function generateGradientAvatarDataUrl(name) {
    const canvas = document.createElement('canvas');
    const size = 128;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const hsl = stringToHSL(name);
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Theme-aware second color: 20% darker in light mode, 20% lighter in dark mode
    let l2;
    if (isDarkMode) {
      l2 = Math.min(100, hsl.l + 20); // 20% lighter
    } else {
      l2 = Math.max(0, hsl.l - 20); // 20% darker
    }

    const color1 = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const color2 = `hsl(${hsl.h}, ${hsl.s}%, ${l2}%)`;

    // Create 135-degree linear gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    // Draw background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Draw initials
    const initials = getInitials(name);
    const rgb = hslToRGB(hsl.h, hsl.s, hsl.l);
    const textColor = getContrastColor(rgb) === 'ffffff' ? '#FFF' : '#333';

    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.round(size * 0.4)}px 'Rubik', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, size / 2, size / 2);

    return canvas.toDataURL('image/png');
  }

  /**
   * Update profile dropdown with user information
   * @param {object} user - Supabase user object
   */
  function updateProfileDropdown(user) {
    const name = user.user_metadata.full_name || 'User';
    const avatarUrl = generateGradientAvatarDataUrl(name);

    const profileDropdownName = document.getElementById('profileDropdownName');
    const profileDropdownEmail = document.getElementById('profileDropdownEmail');
    const dropdownHeaderImg = document.getElementById('dropdownHeaderImg');
    const profileIconImg = document.getElementById('profileIconImg');

    if (profileDropdownName) {
      profileDropdownName.textContent = name;
    }

    if (profileDropdownEmail && user.email) {
      profileDropdownEmail.textContent = user.email;
    }

    // Update profile images with user avatar or generated avatar
    const storedAvatar = localStorage.getItem('be_avatar_' + user.id);

    if (dropdownHeaderImg) {
      dropdownHeaderImg.src = storedAvatar || avatarUrl;
    }

    if (profileIconImg) {
      profileIconImg.src = storedAvatar || avatarUrl;
    }
  }

  /**
   * Update mobile sidebar with user information
   * @param {object} user - Supabase user object
   */
  function updateMobileSidebar(user) {
    const sidebarHeader = document.querySelector('.sidebar-header');
    const sidebarFooter = document.querySelector('.sidebar-footer');
    const sidebarLoginLink = document.getElementById('sidebar-login-link');

    if (!sidebarHeader || !sidebarFooter) return;

    const name = user.user_metadata.full_name || 'User';
    const avatarUrl = generateGradientAvatarDataUrl(name);

    // Replace the "default-brand" part with User Profile
    const brandContainer = sidebarHeader.querySelector('.header-brand');
    if (brandContainer) {
      brandContainer.innerHTML = `
        <img src="${avatarUrl}" class="sidebar-avatar" alt="Profile" id="mobile-avatar-img">
        <div class="user-info">
          <span class="user-name">Hello, ${name}</span>
          <span class="user-status">Member</span>
        </div>
      `;
    }

    // Hide "Login" Wrapper
    const loginWrapper = document.getElementById('sidebar-login-container');
    if (loginWrapper) loginWrapper.style.display = 'none';

    // Sync Custom Avatar
    const storedAvatar = localStorage.getItem('be_avatar_' + user.id);
    if (storedAvatar) {
      const mAvatar = sidebarHeader.querySelector('#mobile-avatar-img');
      if (mAvatar) mAvatar.src = storedAvatar;
    }
  }

  /**
   * Setup logout handler
   * @param {object} user - Supabase user object
   */
  function setupLogoutHandler(user) {
    const navLogoutBtn = document.getElementById('nav-dropdown-logout');
    if (!navLogoutBtn) return;

    navLogoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const performLogout = async () => {
        await window.DB.signOut();
        window.location.reload();
      };

      // Use custom modal if available
      if (window.showLogoutConfirmation && typeof window.showLogoutConfirmation === 'function') {
        window.showLogoutConfirmation(performLogout);
      } else {
        // Fallback to native confirm
        if (confirm('Are you sure you want to logout?')) {
          await performLogout();
        }
      }
    });
  }

  /**
   * Update navbar with user information and hide login link
   * @param {object} user - Supabase user object
   */
  function updateNavbar(user) {
    const profileIconBtn = document.getElementById('profileIconBtn');
    const profileDropdownContainer = document.getElementById('profileDropdownContainer');
    const loginLink = document.querySelector('a[href="login.html"]');
    const signupBtn = document.getElementById('signupNavBtn');

    if (loginLink && loginLink.parentElement) {
      const li = loginLink.parentElement;

      // Show Profile Icon and Hide Login/ Signup Links
      if (profileIconBtn) profileIconBtn.style.display = 'flex';
      if (profileDropdownContainer) profileDropdownContainer.style.display = 'block';
      if (signupBtn) signupBtn.style.display = 'none';

      // Hide the login link
      li.style.display = 'none';
    }
  }

  /**
   * Load custom avatar if exists
   * @param {object} user - Supabase user object
   */
  function loadCustomAvatar(user) {
    const storedAvatar = localStorage.getItem('be_avatar_' + user.id);
    if (storedAvatar) {
      const avatarImg = document.querySelector('#navbar-avatar-img');
      if (avatarImg) avatarImg.src = storedAvatar;
    }
  }

  /**
   * Initialize Auth UI based on user login status
   */
  async function initAuthUI() {
    if (!window.DB) return;

    try {
      const { data: { user } } = await window.DB.getUser();

      // Toggle user icon based on login status
      toggleUserIcon(!!user);
      toggleSignupBtn(!user);

      if (user) {
        // Update navbar
        updateNavbar(user);

        // Sync all avatars across the page
        syncAllAvatars(user);

        // Load custom avatar
        loadCustomAvatar(user);

        // Setup logout handler
        setupLogoutHandler(user);
      }
    } catch (error) {
      console.error('Error initializing auth UI:', error);
    }
  }

  /**
   * Initialize the auth UI when DOM is ready
   */
  function initialize() {
    // Run immediately or wait for DB
    if (window.DB) {
      initAuthUI();
    } else {
      document.addEventListener('dbReady', initAuthUI);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Listen for theme changes and update avatar accordingly
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class' && window.DB) {
        // Re-check user and update avatar when theme changes
        window.DB.getUser().then(({ data: { user } }) => {
          if (user) {
            syncAllAvatars(user);
          }
        });
      }
    });
  });

  // Observe body class changes for theme switching
  observer.observe(document.body, { attributes: true });

  // Expose functions globally for external access if needed
  window.AuthUI = {
    toggleUserIcon,
    toggleSignupBtn,
    initAuthUI,
    updateProfileDropdown,
    updateMobileSidebar,
    syncAllAvatars,
    generateGradientAvatarDataUrl
  };

  /**
   * Sync all avatars on the page (dropdown, mobile, and dashboard if present)
   * @param {object} user - Supabase user object
   */
  async function syncAllAvatars(user) {
    if (!user) return;

    const storedAvatar = localStorage.getItem('be_avatar_' + user.id) ||
      localStorage.getItem('be_profile_picture_' + user.id) ||
      localStorage.getItem('be_profile_picture'); // Generic fallback

    if (!storedAvatar) {
      // Only update if user has no custom avatar (using gradient)
      updateProfileDropdown(user);
      updateMobileSidebar(user);

      // Handle dashboard profile pic if on profile.html
      const dashboardImg = document.getElementById('dashboardProfilePic');
      const dashboardPlaceholder = document.querySelector('.profile-pic-placeholder');

      if (dashboardImg) {
        const name = user.user_metadata.full_name || user.name || 'User';
        const avatarUrl = generateGradientAvatarDataUrl(name);
        dashboardImg.src = avatarUrl;
        dashboardImg.style.display = 'block';
        if (dashboardPlaceholder) dashboardPlaceholder.style.display = 'none';
      }
    }
  }

})();


// Auth Logic using Mock Database (LocalStorage)

document.addEventListener('dbReady', () => {
  console.log('Auth Module: DB Ready');
  initializeAuth();
});

// Fallback if event already fired
if (window.DB) {
  initializeAuth();
}

function initializeAuth() {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const logoutBtn = document.getElementById('logout-btn');

  // Login Handler
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const btn = loginForm.querySelector('button');

      setLoading(btn, true);

      try {
        const { data, error } = await DB.signInWithPassword({
          email: email,
          password: password
        });

        if (error) throw error;

        // Success
        showToast('Login Successful! Redirecting...', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);

      } catch (error) {
        showToast(error.message, 'error');
      } finally {
        setLoading(btn, false);
      }
    });
  }

  // Signup Handler
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const fullName = document.getElementById('signup-name').value;
      const btn = signupForm.querySelector('button');

      setLoading(btn, true);

      try {
        // Create User (DB.signUp internally calls setSession which now dispatches authStateChanged)
        const { data, error } = await DB.signUp(email, password, fullName);

        if (error) throw error;

        showToast('Account Created! Welcome ' + fullName, 'success');
        setTimeout(() => window.location.href = 'index.html', 1500);

      } catch (error) {
        showToast(error.message, 'error');
      } finally {
        setLoading(btn, false);
      }
    });
  }

  // Logout Handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await DB.signOut();
      window.location.href = 'login.html';
    });
  }
}

// UI Helpers
function setLoading(btn, isLoading) {
  if (isLoading) {
    // Store original content
    btn.dataset.originalText = btn.innerHTML;

    // Create spinner element
    const spinner = document.createElement('div');
    spinner.className = 'spinner center';
    spinner.innerHTML = `
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
        `;

    // Replace button content with spinner
    btn.innerHTML = spinner.outerHTML;
    btn.disabled = true;
  } else {
    // Restore original content
    btn.innerHTML = btn.dataset.originalText;
    btn.disabled = false;
  }
}

function showToast(message, type = 'info') {
  // Check if toast container exists
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.style.cssText = `
        background: ${type === 'error' ? '#ff4d4d' : '#2ecc71'};
        color: white;
        padding: 15px 25px;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease-out;
        font-family: 'Poppins', sans-serif;
    `;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add CSS keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
    
    /* Custom Spinner CSS */
    .spinner {
        font-size: 28px;
        position: relative;
        display: inline-block;
        width: 1em;
        height: 1em;
    }
    
    .spinner.center {
        position: relative;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    
    .spinner .spinner-blade {
        position: absolute;
        left: 0.4629em;
        bottom: 0;
        width: 0.074em;
        height: 0.2777em;
        border-radius: 0.0555em;
        background-color: transparent;
        -webkit-transform-origin: center -0.2222em;
        -ms-transform-origin: center -0.2222em;
        transform-origin: center -0.2222em;
        animation: spinner-fade9234 1s infinite linear;
    }
    
    .spinner .spinner-blade:nth-child(1) {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    
    .spinner .spinner-blade:nth-child(2) {
        -webkit-animation-delay: 0.083s;
        animation-delay: 0.083s;
        -webkit-transform: rotate(30deg);
        -ms-transform: rotate(30deg);
        transform: rotate(30deg);
    }
    
    .spinner .spinner-blade:nth-child(3) {
        -webkit-animation-delay: 0.166s;
        animation-delay: 0.166s;
        -webkit-transform: rotate(60deg);
        -ms-transform: rotate(60deg);
        transform: rotate(60deg);
    }
    
    .spinner .spinner-blade:nth-child(4) {
        -webkit-animation-delay: 0.249s;
        animation-delay: 0.249s;
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    
    .spinner .spinner-blade:nth-child(5) {
        -webkit-animation-delay: 0.332s;
        animation-delay: 0.332s;
        -webkit-transform: rotate(120deg);
        -ms-transform: rotate(120deg);
        transform: rotate(120deg);
    }
    
    .spinner .spinner-blade:nth-child(6) {
        -webkit-animation-delay: 0.415s;
        animation-delay: 0.415s;
        -webkit-transform: rotate(150deg);
        -ms-transform: rotate(150deg);
        transform: rotate(150deg);
    }
    
    .spinner .spinner-blade:nth-child(7) {
        -webkit-animation-delay: 0.498s;
        animation-delay: 0.498s;
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
    }
    
    .spinner .spinner-blade:nth-child(8) {
        -webkit-animation-delay: 0.581s;
        animation-delay: 0.581s;
        -webkit-transform: rotate(210deg);
        -ms-transform: rotate(210deg);
        transform: rotate(210deg);
    }
    
    .spinner .spinner-blade:nth-child(9) {
        -webkit-animation-delay: 0.664s;
        animation-delay: 0.664s;
        -webkit-transform: rotate(240deg);
        -ms-transform: rotate(240deg);
        transform: rotate(240deg);
    }
    
    .spinner .spinner-blade:nth-child(10) {
        -webkit-animation-delay: 0.747s;
        animation-delay: 0.747s;
        -webkit-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
    }
    
    .spinner .spinner-blade:nth-child(11) {
        -webkit-animation-delay: 0.83s;
        animation-delay: 0.83s;
        -webkit-transform: rotate(300deg);
        -ms-transform: rotate(300deg);
        transform: rotate(300deg);
    }
    
    .spinner .spinner-blade:nth-child(12) {
        -webkit-animation-delay: 0.913s;
        animation-delay: 0.913s;
        -webkit-transform: rotate(330deg);
        -ms-transform: rotate(330deg);
        transform: rotate(330deg);
    }
    
    @keyframes spinner-fade9234 {
        0% {
            background-color:rgb(120, 120, 120);
        }
        
        100% {
            background-color: transparent;
        }
    }
`;
document.head.appendChild(style);



