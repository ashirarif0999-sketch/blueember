/**
 * Blue Ember Cookie Manager
 * Handles consent states, persistence, and logic gating.
 */

const CookieManager = {
    // Default consent structure
    defaultConsent: {
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: null,
        version: '1.0'
    },

    COOKIE_NAME: 'be_consent',

    /**
     * Initialize the system
     */
    init: async () => {
        // 1. Try to get local consent (Cookie with LocalStorage fallback)
        let currentConsent = CookieManager.getConsent();

        // 2. If logged in, fetch from DB to see if we have newer/authoritative consent
        if (window.DB) {
            try {
                // Return immediately if DB is not ready, but we'll wait for DOMContentLoaded 
                // which usually ensures db-client.js has run.
                const { data: { user } } = await window.DB.getUser();
                if (user && user.user_metadata && user.user_metadata.cookie_consent) {
                    // Update local storage/cookie with DB data
                    // Pass true to syncToDB to ensure it's "verified", though here we just got it from DB
                    CookieManager.saveConsent(user.user_metadata.cookie_consent, false);
                    currentConsent = user.user_metadata.cookie_consent;
                }
            } catch (error) {
                console.warn("CookieManager: Failed to fetch user data for consent sync", error);
            }
        }

        // 3. Decide whether to show banner based on the FINAL consent state
        if (!currentConsent) {
            CookieManager.showBanner();
        } else {
            console.log("🍪 Consent found, initializing modules...");
            CookieManager.applyConsentSettings();
        }
    },

    /**
     * Get consent from cookies or localStorage fallback
     */
    getConsent: () => {
        // Try Cookie first
        const name = CookieManager.COOKIE_NAME + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                try {
                    return JSON.parse(c.substring(name.length, c.length));
                } catch (e) {
                    console.error("Failed to parse consent cookie", e);
                }
            }
        }

        // Fallback to LocalStorage (useful for file:// protocol and as extra backup)
        try {
            const localData = localStorage.getItem(CookieManager.COOKIE_NAME);
            if (localData) {
                return JSON.parse(localData);
            }
        } catch (e) {
            console.error("Failed to parse consent from localStorage", e);
        }

        return null;
    },

    /**
     * Save consent status
     * @param {Object} preferences 
     * @param {Boolean} syncToDB 
     */
    saveConsent: (preferences, syncToDB = true) => {
        const consentData = {
            ...CookieManager.defaultConsent,
            ...preferences,
            timestamp: new Date().toISOString()
        };

        const jsonConsent = JSON.stringify(consentData);

        // 1. Set Cookie (Expires in 1 year)
        const d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = CookieManager.COOKIE_NAME + "=" + jsonConsent + ";" + expires + ";path=/;SameSite=Lax";

        // 2. Set LocalStorage (Fallback)
        localStorage.setItem(CookieManager.COOKIE_NAME, jsonConsent);

        // Dispatch event for other modules
        window.dispatchEvent(new CustomEvent('be_consent_updated', { detail: consentData }));

        // Apply settings immediately
        CookieManager.applyConsentSettings();

        // Sync to DB if user is logged in
        if (syncToDB && window.DB) {
            CookieManager.syncToDB(consentData);
        }

        CookieManager.hideBanner();
    },

    /**
     * Sync consent to Mock DB
     */
    syncToDB: async (consentData) => {
        try {
            if (window.DB.updateUserMetadata) {
                await window.DB.updateUserMetadata({ cookie_consent: consentData });
            }
        } catch (e) {
            console.warn("DB not ready or sync failed", e);
        }
    },

    /**
     * Check if a specific category is allowed
     */
    isAllowed: (category) => {
        const consent = CookieManager.getConsent();
        if (!consent) return false;
        if (category === 'essential') return true;
        return !!consent[category];
    },

    /**
     * Apply settings (e.g., block/enable scripts)
     */
    applyConsentSettings: () => {
        const consent = CookieManager.getConsent();
        if (!consent) return;

        // Analytics gating
        if (consent.analytics) {
            console.log("🍪 Analytics enabled");
            // Here you would trigger analytics initialization
        }

        // Marketing gating
        if (consent.marketing) {
            console.log("🍪 Marketing enabled");
        }
    },

    /**
     * UI: Show the banner
     */
    showBanner: () => {
        if (document.getElementById('be-cookie-banner')) return;

        const bannerHtml = `
            <div id="be-cookie-banner" class="be-cookie-banner">
                <div class="be-cookie-container">
                    <div class="be-cookie-content">
                        <h3><i class="fas fa-cookie-bite"></i> We value your privacy</h3>
                        <p>We use cookies to enhance your experience, analyze site traffic, and support our marketing efforts. By clicking "Accept All", you consent to our use of cookies.</p>
                    </div>
                    <div class="be-cookie-actions">
                        <button id="be-cookie-accept" class="be-btn primary">Accept All</button>
                        <button id="be-cookie-settings" class="be-btn secondary">Customize</button>
                        <button id="be-cookie-reject" class="be-btn tertiary">Reject All</button>
                    </div>
                </div>
                <div class="be-cookie-footer-link">
                    Read our <a href="cookie-policy.html">Cookie Policy</a>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', bannerHtml);

        // Events
        document.getElementById('be-cookie-accept').onclick = () => {
            CookieManager.saveConsent({ analytics: true, marketing: true });
        };
        document.getElementById('be-cookie-reject').onclick = () => {
            CookieManager.saveConsent({ analytics: false, marketing: false });
        };
        document.getElementById('be-cookie-settings').onclick = () => {
            CookieManager.showSettingsModal();
        };
    },

    hideBanner: () => {
        const banner = document.getElementById('be-cookie-banner');
        if (banner) {
            banner.classList.add('hide');
            setTimeout(() => banner.remove(), 400);
        }
    },

    showSettingsModal: () => {
        // Modal logic (to be implemented with Preference Modal)
        console.log("Showing settings modal...");
        // For now, simpler implementation or just trigger detailed preferences
    }
};

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => {
    CookieManager.init();
});

window.CookieManager = CookieManager;
