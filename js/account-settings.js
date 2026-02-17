/**
 * Account Settings JavaScript
 * Handles tab navigation, form submissions, and localStorage persistence
 */

// Global state
window.hasUnsavedChanges = false;
window.pendingNavigation = null;
let SCOPED_SUFFIX = '';

function getScopedKey(key) {
    return key + SCOPED_SUFFIX;
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize User Scope
    try {
        if (window.DB) {
            const { data } = await window.DB.getUser();
            if (data.user?.id) SCOPED_SUFFIX = '_' + data.user.id;
        } else {
            const u = JSON.parse(localStorage.getItem('be_current_user') || '{}');
            if (u.id) SCOPED_SUFFIX = '_' + u.id;
        }
    } catch (e) {
        console.warn('Failed to init user scope:', e);
    }

    initializeTabs();
    initializeAccountTab();
    initializePrivacyTab();
    initializeAddressesTab();
    initializeCardsTab();
    initializeSettingsTab();
    initializeNotificationsTab();
    initializeMobileSidebar();
    initializeModals();
    initializeCharacterCounter();
    initializeUnsavedChangesTracking();
    initializeInlineValidation();
    initializeRegionSearch();
    loadSavedData();
});

// ========================================
// TAB NAVIGATION
// ========================================

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            switchToTab(targetTab);
        });
    });

    // Check URL parameters for tab redirection
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
        switchToTab(tabParam);
    }

    function switchToTab(targetTab) {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to target button and corresponding pane
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
            const targetPane = document.getElementById(`${targetTab}-tab`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        }
    }
}

// ========================================
// ACCOUNT TAB
// ========================================

function initializeAccountTab() {
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePicPreview = document.getElementById('profilePicPreview');
    const removeProfilePic = document.getElementById('removeProfilePic');
    const saveAccountBtn = document.getElementById('saveAccountBtn');

    // Profile picture upload with 1s delay
    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadBtn = document.querySelector('label[for="profilePicInput"]');
            showButtonSpinner(uploadBtn);

            setTimeout(() => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const imageData = event.target.result;
                    profilePicPreview.src = imageData;

                    // Also update navbar profile pic
                    const navProfileImg = document.getElementById('profileIconImg');
                    if (navProfileImg) {
                        navProfileImg.src = imageData;
                    }

                    // Save to localStorage
                    localStorage.setItem(getScopedKey('be_profile_picture'), imageData);
                    hideButtonSpinner(uploadBtn);
                    showNotification('Profile picture uploaded!', 'success');
                };
                reader.readAsDataURL(file);
            }, 1000);
        }
    });

    // Remove profile picture with 1s delay
    removeProfilePic.addEventListener('click', () => {
        showButtonSpinner(removeProfilePic);
        setTimeout(() => {
            profilePicPreview.src = '';
            const navProfileImg = document.getElementById('profileIconImg');
            if (navProfileImg) {
                navProfileImg.src = '';
            }
            localStorage.removeItem(getScopedKey('be_profile_picture'));
            hideButtonSpinner(removeProfilePic);
            showNotification('Profile picture removed!', 'success');
        }, 1000);
    });

    // Save account information with 1s delay
    saveAccountBtn.addEventListener('click', () => {
        showButtonSpinner(saveAccountBtn);
        setTimeout(() => {
            const accountData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                gender: document.getElementById('gender').value,
                birthday: document.getElementById('birthday').value,
                about: document.getElementById('about').value,
                region: document.getElementById('region').value,
                language: document.getElementById('language').value,
                currency: document.getElementById('currency').value
            };

            localStorage.setItem(getScopedKey('be_account_data'), JSON.stringify(accountData));
            hideButtonSpinner(saveAccountBtn);
            showNotification('Account information saved successfully!', 'success');
        }, 1000);
    });
}

// ========================================
// ADDRESSES TAB
// ========================================

let addresses = [];

function initializeAddressesTab() {
    const addAddressBtn = document.getElementById('addAddressBtn');
    const addressForm = document.getElementById('addressForm');
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    const cancelAddressBtn = document.getElementById('cancelAddressBtn');

    // Load addresses from localStorage
    const savedAddresses = localStorage.getItem(getScopedKey('be_addresses'));
    if (savedAddresses) {
        addresses = JSON.parse(savedAddresses);
        renderAddresses();
    }

    addAddressBtn.addEventListener('click', () => {
        showAddressForm();
    });

    saveAddressBtn.addEventListener('click', () => {
        showButtonSpinner(saveAddressBtn);
        setTimeout(() => {
            saveAddress();
        }, 1000);
    });

    cancelAddressBtn.addEventListener('click', () => {
        hideAddressForm();
    });
}

function showAddressForm(address = null) {
    const form = document.getElementById('addressForm');
    const title = document.getElementById('addressFormTitle');

    if (address) {
        title.textContent = 'Edit Address';
        document.getElementById('addressId').value = address.id;
        document.getElementById('addressLabel').value = address.label;
        document.getElementById('addressStreet').value = address.street;
        document.getElementById('addressCity').value = address.city;
        document.getElementById('addressState').value = address.state;
        document.getElementById('addressZip').value = address.zip;
        document.getElementById('addressCountry').value = address.country;
        document.getElementById('addressType').value = address.type || '';
        document.getElementById('addressIcon').value = address.icon || '';
    } else {
        title.textContent = 'Add New Address';
        document.getElementById('addressId').value = '';
        document.querySelector('#addressForm form').reset();
    }

    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth' });
}

function hideAddressForm() {
    document.getElementById('addressForm').style.display = 'none';
    document.querySelector('#addressForm form').reset();
}

function saveAddress() {
    const id = document.getElementById('addressId').value;
    const addressData = {
        id: id || Date.now().toString(),
        label: document.getElementById('addressLabel').value,
        street: document.getElementById('addressStreet').value,
        city: document.getElementById('addressCity').value,
        state: document.getElementById('addressState').value,
        zip: document.getElementById('addressZip').value,
        country: document.getElementById('addressCountry').value,
        type: document.getElementById('addressType').value,
        icon: document.getElementById('addressIcon').value,
        lastUsed: Date.now()
    };

    // Validate
    if (!addressData.label || !addressData.street || !addressData.city) {
        const saveAddressBtn = document.getElementById('saveAddressBtn');
        hideButtonSpinner(saveAddressBtn);
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    if (id) {
        // Edit existing
        const index = addresses.findIndex(a => a.id === id);
        addresses[index] = addressData;
    } else {
        // Add new
        addresses.push(addressData);
    }

    localStorage.setItem(getScopedKey('be_addresses'), JSON.stringify(addresses));
    renderAddresses();
    hideAddressForm();
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    hideButtonSpinner(saveAddressBtn);
    showNotification('Address saved successfully!', 'success');
}

function renderAddresses() {
    const container = document.getElementById('addressesList');

    if (addresses.length === 0) {
        container.innerHTML = '<p class="empty-state">You don\'t currently have any delivery addresses.</p>';
        return;
    }

    container.innerHTML = addresses.map(address => `
        <div class="address-card">
            <div class="address-header">
                <span class="address-label">${address.label}</span>
                <div class="address-actions">
                    <button class="action-btn" onclick="editAddress('${address.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete" onclick="deleteAddress('${address.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <div class="address-details">
                ${address.street}<br>
                ${address.city}, ${address.state} ${address.zip}<br>
                ${address.country}
            </div>
        </div>
    `).join('');
}

function editAddress(id) {
    const address = addresses.find(a => a.id === id);
    if (address) {
        showAddressForm(address);
    }
}

function deleteAddress(id) {
    if (confirm('Are you sure you want to delete this address?')) {
        addresses = addresses.filter(a => a.id !== id);
        localStorage.setItem(getScopedKey('be_addresses'), JSON.stringify(addresses));
        renderAddresses();
        showNotification('Address deleted successfully!', 'success');
    }
}

// ========================================
// CREDIT CARDS TAB
// ========================================

let cards = [];

function initializeCardsTab() {
    const addCardBtn = document.getElementById('addCardBtn');
    const cardForm = document.getElementById('cardForm');
    const saveCardBtn = document.getElementById('saveCardBtn');
    const cancelCardBtn = document.getElementById('cancelCardBtn');
    const cardNumberInput = document.getElementById('cardNumber');
    const cardExpiryInput = document.getElementById('cardExpiry');

    // Load cards from localStorage
    const savedCards = localStorage.getItem(getScopedKey('be_cards'));
    if (savedCards) {
        cards = JSON.parse(savedCards);
        renderCards();
    }

    // Format card number with spaces
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });

    // Format expiry date
    cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\//g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });

    addCardBtn.addEventListener('click', () => {
        showCardForm();
    });

    saveCardBtn.addEventListener('click', () => {
        showButtonSpinner(saveCardBtn);
        setTimeout(() => {
            saveCard();
        }, 1000);
    });

    cancelCardBtn.addEventListener('click', () => {
        hideCardForm();
    });
}

function showCardForm(card = null) {
    const form = document.getElementById('cardForm');
    const title = document.getElementById('cardFormTitle');

    if (card) {
        title.textContent = 'Edit Card';
        document.getElementById('cardId').value = card.id;
        document.getElementById('cardNumber').value = card.number;
        document.getElementById('cardName').value = card.name;
        document.getElementById('cardExpiry').value = card.expiry;
        // Don't populate CVV for security
    } else {
        title.textContent = 'Add New Card';
        document.getElementById('cardId').value = '';
        document.querySelector('#cardForm form').reset();
    }

    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth' });
}

function hideCardForm() {
    document.getElementById('cardForm').style.display = 'none';
    document.querySelector('#cardForm form').reset();
}

function saveCard() {
    const id = document.getElementById('cardId').value;
    const cardData = {
        id: id || Date.now().toString(),
        number: document.getElementById('cardNumber').value,
        name: document.getElementById('cardName').value,
        expiry: document.getElementById('cardExpiry').value,
        // Don't store CVV
    };

    // Validate
    if (!cardData.number || !cardData.name || !cardData.expiry) {
        const saveCardBtn = document.getElementById('saveCardBtn');
        hideButtonSpinner(saveCardBtn);
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Mask card number for storage (keep last 4 digits)
    const lastFour = cardData.number.replace(/\s/g, '').slice(-4);
    cardData.maskedNumber = '**** **** **** ' + lastFour;

    if (id) {
        const index = cards.findIndex(c => c.id === id);
        cards[index] = cardData;
    } else {
        cards.push(cardData);
    }

    localStorage.setItem(getScopedKey('be_cards'), JSON.stringify(cards));
    renderCards();
    hideCardForm();
    const saveCardBtn = document.getElementById('saveCardBtn');
    hideButtonSpinner(saveCardBtn);
    showNotification('Card saved successfully!', 'success');
}

function renderCards() {
    const container = document.getElementById('cardsList');

    if (cards.length === 0) {
        container.innerHTML = '<p class="empty-state">You don\'t have any saved payment methods.</p>';
        return;
    }

    container.innerHTML = cards.map(card => `
        <div class="card-item">
            <div class="card-header">
                <div>
                    <div class="card-type">
                        <i class="fas fa-credit-card"></i> Credit Card
                    </div>
                    <div class="card-number">${card.maskedNumber}</div>
                    <div class="card-details">${card.name} • Expires ${card.expiry}</div>
                </div>
                <div class="card-actions">
                    <button class="action-btn delete" onclick="deleteCard('${card.id}')">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteCard(id) {
    if (confirm('Are you sure you want to remove this card?')) {
        cards = cards.filter(c => c.id !== id);
        localStorage.setItem(getScopedKey('be_cards'), JSON.stringify(cards));
        renderCards();
        showNotification('Card removed successfully!', 'success');
    }
}

// ========================================
// ACCOUNT SETTINGS TAB
// ========================================

function initializeSettingsTab() {
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const changeEmailBtn = document.getElementById('changeEmailBtn');
    const closeAccountBtn = document.getElementById('closeAccountBtn');

    changePasswordBtn.addEventListener('click', () => {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Please fill in all password fields', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 8) {
            showNotification('Password must be at least 8 characters', 'error');
            return;
        }

        showButtonSpinner(changePasswordBtn);
        // In real app, this would call an API
        setTimeout(() => {
            hideButtonSpinner(changePasswordBtn);
            showNotification('Password changed successfully!', 'success');
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        }, 1000);
    });

    changeEmailBtn.addEventListener('click', () => {
        const newEmail = document.getElementById('newEmail').value;
        const confirmEmail = document.getElementById('confirmEmail').value;

        if (!newEmail || !confirmEmail) {
            showNotification('Please fill in all email fields', 'error');
            return;
        }

        if (newEmail !== confirmEmail) {
            showNotification('Email addresses do not match', 'error');
            return;
        }

        if (!isValidEmail(newEmail)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        showButtonSpinner(changeEmailBtn);
        // In real app, this would call an API
        setTimeout(() => {
            document.getElementById('currentEmail').value = newEmail;
            hideButtonSpinner(changeEmailBtn);
            showNotification('Email changed successfully! Please check your inbox to verify.', 'success');
            document.getElementById('newEmail').value = '';
            document.getElementById('confirmEmail').value = '';
        }, 1000);
    });

    closeAccountBtn.addEventListener('click', () => {
        if (confirm('Are you absolutely sure you want to close your account? This action cannot be undone immediately.')) {
            showNotification('Account closure initiated. You will receive a confirmation email.', 'warning');
        }
    });
}

// ========================================
// NOTIFICATIONS TAB
// ========================================

function initializeNotificationsTab() {
    const saveNotificationsBtn = document.getElementById('saveNotificationsBtn');

    saveNotificationsBtn.addEventListener('click', () => {
        const notificationSettings = {
            messages: document.getElementById('notifyMessages').checked,
            follows: document.getElementById('notifyFollows').checked,
            newItems: document.getElementById('notifyNewItems').checked,
            feedback: document.getElementById('notifyFeedback').checked,
            coupons: document.getElementById('notifyCoupons').checked,
            forums: document.getElementById('notifyForums').checked,
            advocacy: document.getElementById('notifyAdvocacy').checked
        };

        localStorage.setItem(getScopedKey('be_notification_settings'), JSON.stringify(notificationSettings));
        showNotification('Notification preferences saved!', 'success');
    });
}

// ========================================
// DATA LOADING
// ========================================

function loadSavedData() {
    // Load profile picture
    const savedProfilePic = localStorage.getItem(getScopedKey('be_profile_picture'));
    if (savedProfilePic) {
        document.getElementById('profilePicPreview').src = savedProfilePic;
    }

    // Load account data
    const savedAccountData = localStorage.getItem(getScopedKey('be_account_data'));
    if (savedAccountData) {
        const data = JSON.parse(savedAccountData);
        document.getElementById('firstName').value = data.firstName || '';
        document.getElementById('lastName').value = data.lastName || '';
        document.getElementById('gender').value = data.gender || '';
        document.getElementById('birthday').value = data.birthday || '';
        document.getElementById('about').value = data.about || '';
        document.getElementById('region').value = data.region || 'PK';
        document.getElementById('language').value = data.language || 'en-GB';
        document.getElementById('currency').value = data.currency || 'USD';
    }

    // Load notification settings
    const savedNotifications = localStorage.getItem(getScopedKey('be_notification_settings'));
    if (savedNotifications) {
        const settings = JSON.parse(savedNotifications);
        document.getElementById('notifyMessages').checked = settings.messages !== false;
        document.getElementById('notifyFollows').checked = settings.follows || false;
        document.getElementById('notifyNewItems').checked = settings.newItems || false;
        document.getElementById('notifyFeedback').checked = settings.feedback || false;
        document.getElementById('notifyCoupons').checked = settings.coupons !== false;
        document.getElementById('notifyForums').checked = settings.forums || false;
        document.getElementById('notifyAdvocacy').checked = settings.advocacy || false;
    }

    // Load phone number
    const savedPhoneNumber = localStorage.getItem(getScopedKey('be_phone_number'));
    if (savedPhoneNumber && document.getElementById('phoneNumber')) {
        document.getElementById('phoneNumber').value = savedPhoneNumber;
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(90deg, #10b981, #059669)' :
            type === 'error' ? 'linear-gradient(90deg, #ef4444, #dc2626)' :
                '#0099ff'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-family: 'Rubik', sans-serif;
        font-weight: 500;
        max-width: 350px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add CSS for notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ========================================
// MOBILE SIDEBAR
// ========================================

function initializeMobileSidebar() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('closeBtn');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    // Open sidebar
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }

    // Close sidebar
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // Close sidebar when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    // Handle mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            const mainToggle = document.getElementById('dark-mode-toggle');
            if (mainToggle) {
                mainToggle.click();
            }
        });
    }

    // Handle collapsible categories
    const collapsibleTriggers = document.querySelectorAll('.collapsible-trigger');
    collapsibleTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.closest('.sidebar-collapsible');
            const content = parent.querySelector('.collapsible-content');
            const chevron = trigger.querySelector('.chevron');

            if (content.style.display === 'block') {
                content.style.display = 'none';
                chevron.style.transform = 'rotate(0deg)';
            } else {
                content.style.display = 'block';
                chevron.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// ========================================
// PRIVACY TAB
// ========================================

function initializePrivacyTab() {
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const exportDataBtn = document.getElementById('exportDataBtn');
    const saveFindabilityBtn = document.getElementById('saveFindabilityBtn');
    const savePrivacyBtn = document.getElementById('savePrivacyBtn');
    const requestDeletionBtn = document.getElementById('requestDeletionBtn');

    // Clear history
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your recently viewed listings?')) {
                localStorage.removeItem('be_recently_viewed');
                showNotification('Recently viewed listings cleared!', 'success');
            }
        });
    }

    // Export data with spinner
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            showButtonSpinner(exportDataBtn);
            setTimeout(() => {
                exportAccountData();
                hideButtonSpinner(exportDataBtn);
            }, 1000);
        });
    }

    // Save findability settings
    if (saveFindabilityBtn) {
        saveFindabilityBtn.addEventListener('click', () => {
            showButtonSpinner(saveFindabilityBtn);
            setTimeout(() => {
                const findByEmail = document.getElementById('findByEmail').checked;
                localStorage.setItem(getScopedKey('be_findability'), JSON.stringify({ findByEmail }));
                hideButtonSpinner(saveFindabilityBtn);
                showNotification('Findability settings saved!', 'success');
            }, 1000);
        });
    }

    // Save privacy settings
    if (savePrivacyBtn) {
        savePrivacyBtn.addEventListener('click', () => {
            showButtonSpinner(savePrivacyBtn);
            setTimeout(() => {
                const privacySettings = {
                    analytics: document.getElementById('analyticsConsent').checked,
                    personalization: document.getElementById('personalizationConsent').checked,
                    advertising: document.getElementById('adConsent').checked
                };
                localStorage.setItem(getScopedKey('be_privacy_settings'), JSON.stringify(privacySettings));
                hideButtonSpinner(savePrivacyBtn);
                showNotification('Privacy settings updated!', 'success');
            }, 1000);
        });
    }

    // Request deletion - shows custom modal
    if (requestDeletionBtn) {
        requestDeletionBtn.addEventListener('click', () => {
            showDeleteAccountModal();
        });
    }

    // Redirect from Add Phone Number btn (in Notifications tab)
    const redirectPhoneBtn = document.getElementById('redirectPhoneBtn');
    if (redirectPhoneBtn) {
        redirectPhoneBtn.addEventListener('click', () => {
            const privacyTabBtn = document.querySelector('[data-tab="privacy"]');
            if (privacyTabBtn) {
                privacyTabBtn.click();
                setTimeout(() => {
                    const phoneSection = document.getElementById('phoneSection');
                    if (phoneSection) {
                        phoneSection.scrollIntoView({ behavior: 'smooth' });
                        // Highlight effect
                        const isDark = document.body.classList.contains('dark-mode');
                        phoneSection.style.transition = 'background-color 0.5s';
                        phoneSection.style.backgroundColor = isDark ? 'rgba(0, 153, 255, 0.2)' : 'rgba(0, 153, 255, 0.1)';
                        setTimeout(() => {
                            phoneSection.style.backgroundColor = '';
                        }, 1500);
                    }
                    const phoneInput = document.getElementById('phoneNumber');
                    if (phoneInput) phoneInput.focus();
                }, 100);
            }
        });
    }

    // Save Phone Number
    const savePhoneBtn = document.getElementById('savePhoneBtn');
    if (savePhoneBtn) {
        savePhoneBtn.addEventListener('click', () => {
            const phoneInput = document.getElementById('phoneNumber');
            if (!phoneInput.value) {
                showNotification('Please enter a phone number', 'error');
                return;
            }

            showButtonSpinner(savePhoneBtn);
            setTimeout(() => {
                localStorage.setItem(getScopedKey('be_phone_number'), phoneInput.value);
                hideButtonSpinner(savePhoneBtn);
                showNotification('Phone number saved successfully!', 'success');
            }, 1000);
        });
    }
}

function exportAccountData() {
    // Gather all data
    const accountData = JSON.parse(localStorage.getItem(getScopedKey('be_account_data')) || '{}');
    const addresses = JSON.parse(localStorage.getItem(getScopedKey('be_addresses')) || '[]');
    const cards = JSON.parse(localStorage.getItem(getScopedKey('be_cards')) || '[]');
    const notifications = JSON.parse(localStorage.getItem(getScopedKey('be_notification_settings')) || '{}');
    const privacy = JSON.parse(localStorage.getItem(getScopedKey('be_privacy_settings')) || '{}');

    // Create activity log
    const activityLog = [
        { timestamp: new Date().toISOString(), action: 'Data export requested' },
        { timestamp: new Date().toISOString(), action: 'Profile data collected' },
        { timestamp: new Date().toISOString(), action: 'Export completed' }
    ];

    const exportData = {
        account: accountData,
        addresses: addresses,
        paymentMethods: cards.map(c => ({ ...c, number: undefined })), // Remove full card numbers
        notifications: notifications,
        privacy: privacy,
        activityLog: activityLog,
        exportDate: new Date().toISOString()
    };

    // Create JSON file
    const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);

    // Create CSV file
    const csvContent = convertToCSV(exportData);
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);

    // Download JSON
    const jsonLink = document.createElement('a');
    jsonLink.href = jsonUrl;
    jsonLink.download = `Blue Ember_account_data_${Date.now()}.json`;
    jsonLink.click();

    // Download CSV
    setTimeout(() => {
        const csvLink = document.createElement('a');
        csvLink.href = csvUrl;
        csvLink.download = `Blue Ember_account_data_${Date.now()}.csv`;
        csvLink.click();
        showNotification('Account data exported successfully!', 'success');
    }, 500);
}

function convertToCSV(data) {
    let csv = 'Category,Key,Value\n';

    // Account data
    for (const [key, value] of Object.entries(data.account || {})) {
        csv += `Account,${key},"${value}"\n`;
    }

    // Activity log
    data.activityLog.forEach((log, idx) => {
        csv += `Activity Log ${idx + 1},Timestamp,"${log.timestamp}"\n`;
        csv += `Activity Log ${idx + 1},Action,"${log.action}"\n`;
    });

    return csv;
}

// ========================================
// CUSTOM MODALS
// ========================================

function initializeModals() {
    const deleteModal = document.getElementById('deleteAccountModal');
    const unsavedModal = document.getElementById('unsavedChangesModal');

    // Delete account modal
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            hideModal(deleteModal);
        });
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            const password = document.getElementById('deletePasswordInput').value;
            if (!password) {
                showNotification('Please enter your password', 'error');
                return;
            }

            showButtonSpinner(confirmDeleteBtn);
            setTimeout(() => {
                // In real app, this would call API
                hideButtonSpinner(confirmDeleteBtn);
                hideModal(deleteModal);
                showNotification('Account deletion request submitted. You will receive a confirmation email.', 'warning');
            }, 1000);
        });
    }

    // Unsaved changes modal
    const stayOnPageBtn = document.getElementById('stayOnPageBtn');
    const leavePageBtn = document.getElementById('leavePageBtn');

    if (stayOnPageBtn) {
        stayOnPageBtn.addEventListener('click', () => {
            hideModal(unsavedModal);
        });
    }

    if (leavePageBtn) {
        leavePageBtn.addEventListener('click', () => {
            // Clear unsaved changes flag and navigate
            window.hasUnsavedChanges = false;
            hideModal(unsavedModal);
            // Navigate to the pending URL if any
            if (window.pendingNavigation) {
                window.location.href = window.pendingNavigation;
            }
        });
    }
}

function showDeleteAccountModal() {
    const modal = document.getElementById('deleteAccountModal');
    if (modal) {
        modal.style.display = 'flex';
        document.getElementById('deletePasswordInput').value = '';
    }
}

function showModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.style.display = 'none';
    }
}

// ========================================
// CHARACTER COUNTER
// ========================================

function initializeCharacterCounter() {
    const aboutTextarea = document.getElementById('about');
    const counterSpan = document.getElementById('aboutCounter');

    if (aboutTextarea && counterSpan) {
        aboutTextarea.addEventListener('input', () => {
            const length = aboutTextarea.value.length;
            counterSpan.textContent = length;

            const counterDiv = counterSpan.closest('.character-counter');
            if (length > 450) {
                counterDiv.classList.add('danger');
                counterDiv.classList.remove('warning');
            } else if (length > 400) {
                counterDiv.classList.add('warning');
                counterDiv.classList.remove('danger');
            } else {
                counterDiv.classList.remove('warning', 'danger');
            }
        });
    }
}

// ========================================
// SPINNER HELPER FUNCTIONS
// ========================================

function showButtonSpinner(button) {
    if (!button) return;

    button.classList.add('loading');
    const spinner = button.querySelector('.spinner');
    const btnText = button.querySelector('.btn-text');

    if (spinner) spinner.style.display = 'block';
    if (btnText) btnText.style.opacity = '0';

    button.disabled = true;
}

function hideButtonSpinner(button) {
    if (!button) return;

    button.classList.remove('loading');
    const spinner = button.querySelector('.spinner');
    const btnText = button.querySelector('.btn-text');

    if (spinner) spinner.style.display = 'none';
    if (btnText) btnText.style.opacity = '1';

    button.disabled = false;
}

// ========================================
// UNSAVED CHANGES TRACKING
// ========================================

function initializeUnsavedChangesTracking() {
    const forms = document.querySelectorAll('form, .account-card');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                window.hasUnsavedChanges = true;
            });
        });
    });

    // Warn before leaving page
    window.addEventListener('beforeunload', (e) => {
        if (window.hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    // Reset flag when saving
    document.addEventListener('dataSaved', () => {
        window.hasUnsavedChanges = false;
    });

    // Reset flag on all save buttons
    const saveBtns = document.querySelectorAll('[id*="save"], [id*="Save"]');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.hasUnsavedChanges = false;
        });
    });
}

// ========================================
// INLINE VALIDATION
// ========================================

function initializeInlineValidation() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !isValidEmail(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
            } else {
                clearFieldError(input);
            }
        });
    });

    // Password validation
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.id === 'newPassword') {
            input.addEventListener('input', () => {
                showPasswordStrength(input);
            });
        }
    });

    // Required fields
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (!input.value) {
                showFieldError(input, 'This field is required');
            } else {
                clearFieldError(input);
            }
        });
    });
}

function showFieldError(input, message) {
    clearFieldError(input);
    const error = document.createElement('span');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = 'color: #ef4444; font-size: 12px; margin-top: 4px; display: block;';
    input.parentElement.appendChild(error);
    input.style.borderColor = '#ef4444';
}

function clearFieldError(input) {
    const error = input.parentElement.querySelector('.field-error');
    if (error) error.remove();
    input.style.borderColor = '';
}

function showPasswordStrength(input) {
    const password = input.value;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    clearFieldError(input);
    const meter = document.createElement('div');
    meter.className = 'password-strength-meter';
    meter.style.cssText = 'margin-top: 8px; height: 4px; background: #e5e7eb; border-radius: 2px; overflow: hidden;';

    const fill = document.createElement('div');
    fill.style.height = '100%';
    fill.style.transition = 'all 0.3s ease';
    fill.style.width = (strength / 5 * 100) + '%';

    if (strength <= 2) {
        fill.style.background = '#ef4444';
    } else if (strength <= 3) {
        fill.style.background = '#f59e0b';
    } else {
        fill.style.background = '#10b981';
    }

    meter.appendChild(fill);
    input.parentElement.appendChild(meter);
}

// ========================================
// DEFAULT ADDRESS & SORTING
// ========================================

// Update renderAddresses to include default badge & sorting
const originalRenderAddresses = renderAddresses;
renderAddresses = function () {
    // Sort: default first, then recently used
    const sortedAddresses = [...addresses].sort((a, b) => {
        if (a.isDefault) return -1;
        if (b.isDefault) return 1;
        if (a.lastUsed && b.lastUsed) return b.lastUsed - a.lastUsed;
        return 0;
    });

    const container = document.getElementById('addressesList');

    if (sortedAddresses.length === 0) {
        container.innerHTML = '<p class="empty-state">You don\'t currently have any delivery addresses.</p>';
        return;
    }

    container.innerHTML = sortedAddresses.map(address => `
        <div class="address-card">
            <div class="address-header">
                <span class="address-label">
                    ${address.icon ? `<i class="bx ${address.icon}"></i>` : ''}
                    ${address.label}
                    ${address.isDefault ? '<span class="default-badge">DEFAULT</span>' : ''}
                    ${address.type ? `<span class="address-type-badge">${address.type}</span>` : ''}
                </span>
                <div class="address-actions">
                    <button class="action-btn" onclick="setDefaultAddress('${address.id}')" title="Set as default">
                        <i class="${address.isDefault ? 'bx bxs-star' : 'bx bx-star'}"></i>
                    </button>
                    <button class="action-btn" onclick="editAddress('${address.id}')">
                        <i class="bx bx-edit"></i> Edit
                    </button>
                    <button class="action-btn delete" onclick="deleteAddress('${address.id}')">
                        <i class="bx bx-trash"></i> Delete
                    </button>
                </div>
            </div>
            <div class="address-details">
                ${address.street}<br>
                ${address.city}, ${address.state} ${address.zip}<br>
                ${address.country}
            </div>
        </div>
    `).join('');
};

function setDefaultAddress(id) {
    addresses = addresses.map(a => ({
        ...a,
        isDefault: a.id === id
    }));
    localStorage.setItem(getScopedKey('be_addresses'), JSON.stringify(addresses));
    renderAddresses();
    showNotification('Default address updated!', 'success');
}

// ========================================
// REGION SEARCH
// ========================================

function initializeRegionSearch() {
    const regionSelect = document.getElementById('region');
    if (!regionSelect) return;

    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search country...';
    searchInput.style.cssText = 'width: 100%; padding: 10px; margin-bottom: 8px; border: 1px solid #d1d5db; border-radius: 8px;';

    regionSelect.parentElement.insertBefore(searchInput, regionSelect);

    // Store original options
    const originalOptions = Array.from(regionSelect.options);

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        regionSelect.innerHTML = '';

        const filtered = originalOptions.filter(option =>
            option.text.toLowerCase().includes(searchTerm)
        );

        filtered.forEach(option => regionSelect.add(option.cloneNode(true)));
    });
}

// ========================================
// UNDO FEATURE
// ========================================

let undoStack = [];

function deleteAddress(id) {
    const address = addresses.find(a => a.id === id);
    if (!address) return;

    // Store for undo
    undoStack.push({
        type: 'address',
        action: 'delete',
        data: address,
        timestamp: Date.now()
    });

    addresses = addresses.filter(a => a.id !== id);
    localStorage.setItem(getScopedKey('be_addresses'), JSON.stringify(addresses));
    renderAddresses();

    // Show notification with undo option
    showNotificationWithUndo('Address deleted', () => {
        // Undo logic
        addresses.push(address);
        localStorage.setItem(getScopedKey('be_addresses'), JSON.stringify(addresses));
        renderAddresses();
        showNotification('Address restored!', 'success');
    });
}

function showNotificationWithUndo(message, undoCallback) {
    const notification = document.createElement('div');
    notification.className = 'notification notification-undo';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(90deg, #64748b, #475569);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 16px;
        animation: slideInRight 0.3s ease;
    `;

    notification.innerHTML = `
        <span>${message}</span>
        <button class="undo-btn" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 500;">UNDO</button>
    `;

    document.body.appendChild(notification);

    const undoBtn = notification.querySelector('.undo-btn');
    undoBtn.addEventListener('click', () => {
        undoCallback();
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// here 



