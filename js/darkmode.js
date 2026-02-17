document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a login/signup page - exclude theme toggle button for these pages
    const isAuthPage = window.location.pathname.includes('login.html') ||
                      window.location.pathname.includes('signup.html') ||
                      document.body.classList.contains('signupbody');

    // 1. Desktop Toggle: Create and inject if not exists (Legacy Support) - EXCLUDE for auth pages
    let desktopBtn = document.getElementById('dark-mode-toggle');
    if (!desktopBtn && !isAuthPage) {
        desktopBtn = document.createElement('button');
        desktopBtn.id = 'dark-mode-toggle';
        desktopBtn.ariaLabel = 'Toggle Dark Mode';

        // Use existing classes plus new generic one
        desktopBtn.className = 'navbar-toggle theme-toggle-btn';

        // Initial icon placeholder
        desktopBtn.innerHTML = '<i class="bx bx-moon-star"></i> ';

        const navbarContainer = document.getElementById('dark-mode-li');
        if (navbarContainer) {
            navbarContainer.appendChild(desktopBtn);
        } else {
            document.body.appendChild(desktopBtn);
        }
    } else if (desktopBtn && isAuthPage) {
        // Remove toggle button if it exists on auth pages
        desktopBtn.remove();
        desktopBtn = null;
    } else if (desktopBtn) {
        // Enforce class if it was manually added but missing class
        desktopBtn.classList.add('theme-toggle-btn');
    }

    // 2. Attach Event Listeners to ALL theme toggles (desktop + mobile) - EXCLUDE for auth pages
    const allToggles = document.querySelectorAll('#dark-mode-toggle, #mobile-theme-toggle, .theme-toggle-btn');
    
    if (!isAuthPage) {
        allToggles.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleDarkModeLogic();
            });
        });
    }

    // 3. Initialize State based on LocalStorage - WORK ON ALL PAGES
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        enableDarkMode();
    } else {
        // Ensure UI is synced for light mode
        updateIcons(false);
    }
});

function toggleDarkModeLogic() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateIcons(true);
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    updateIcons(false);
}

function updateIcons(isDark) {
    const allToggles = document.querySelectorAll('#dark-mode-toggle, #mobile-theme-toggle, .theme-toggle-btn');
    allToggles.forEach(btn => {
        if (isDark) {
            btn.innerHTML = '<i class="bx bx-sun-dim"></i>';
        } else {
            btn.innerHTML = '<i class="bx bx-moon-star"></i>';
        }
    });
}


