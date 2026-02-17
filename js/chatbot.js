const EmberCore = (() => {
    const STORAGE_KEY = 'ember_ai_data_v4';
    const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:' ? 'http://localhost:3000/api/chat' : '/api/chat';

    const DOM = {
        chatBtn: document.getElementById('chat-bubble-btn'),
        chatBtnTwo: document.getElementById('chat-bubble-btn-two'),
        chatWindow: document.getElementById('chat-window'),
        sendBtn: document.getElementById('emberSendBtn'),
        chatInput: document.getElementById('emberInput'),
        chatBody: document.getElementById('emberChatBody'),
        menuToggle: document.getElementById('emberMenuToggle'),
        sidebarToggle: document.getElementById('emberSidebarToggle'),
        dropdown: document.getElementById('emberDropdown'),
        sidebar: document.getElementById('emberSidebar'),
        dropZone: document.getElementById('emberDropZone'),
        fileInput: document.getElementById('emberFileInput'),
        emojiBtn: document.getElementById('emoji-trigger'),
        emojiWindow: document.getElementById('emoji-window-2B')
    };

    let state = {
        isOpen: false,
        darkMode: false,
        currentSessionId: null,
        sessions: [],
        pendingFiles: [],
        emojiOpen: false
    };

    const EMOJI_CATEGORIES = [
        { id: 'people', icon: 'bx-smile', name: 'Smileys & People' },
        { id: 'nature', icon: 'bx-leaf', name: 'Animals & Nature' },
        { id: 'food', icon: 'bx-coffee', name: 'Food & Drink' },
        { id: 'activity', icon: 'bx-basketball', name: 'Activities' },
        { id: 'travel', icon: 'bx-car', name: 'Travel & Places' },
        { id: 'objects', icon: 'bx-light-bulb-alt', name: 'Objects' },
        { id: 'symbols', icon: 'bx-hashtag', name: 'Symbols' },
        { id: 'flags', icon: 'bx-flag', name: 'Flags' }
    ];

    // 🧠 Smart URL Detection
    const isLocal = window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.protocol === 'file:';
    console.log(`Blue Ember v2 Init. Environment: ${isLocal ? 'Local' : 'Production'}`);

    console.log('chatBtn:', DOM.chatBtn);
    console.log('chatBtnTwo:', DOM.chatBtnTwo);
    console.log('chatWindow:', DOM.chatWindow);

    // --- 🎯 LOCAL RESPONSE ENGINE ---
    const localResponses = [
        // Contact & Support (5 patterns)
        { patterns: ['contact', 'reach you', 'get in touch', 'support', 'help desk'], response: "You can contact us through our <a href='contact.html' class='chat-link'>Contact Page</a>. We're here to help!" },
        { patterns: ['email', 'mail address', 'send an email'], response: "Email us at support@blueember.com or visit our <a href='contact.html' class='chat-link'>Contact Page</a>." },
        { patterns: ['phone', 'call', 'telephone'], response: "Call us at +1-800-EMBER or visit the <a href='contact.html' class='chat-link'>Contact Page</a> for more options." },
        { patterns: ['office hours', 'when open', 'business hours'], response: "We're available Monday-Friday, 9 AM - 6 PM EST. Visit our <a href='contact.html' class='chat-link'>Contact Page</a> for details." },
        { patterns: ['location', 'address', 'where are you'], response: "We're located in New York. Full details on our <a href='contact.html' class='chat-link'>Contact Page</a>." },

        // Product Categories (10 patterns)
        { patterns: ['laptop', 'laptops', 'notebook'], response: "Check out our <a href='products.html?category=laptops' class='chat-link'>Laptops Collection</a>!" },
        { patterns: ['phone', 'smartphone', 'mobile'], response: "Browse our <a href='products.html?category=phones' class='chat-link'>Smartphones</a>!" },
        { patterns: ['tablet', 'ipad'], response: "Explore our <a href='products.html?category=tablets' class='chat-link'>Tablets</a>!" },
        { patterns: ['headphone', 'earbuds', 'airpods'], response: "Discover our <a href='products.html?category=audio' class='chat-link'>Audio Products</a>!" },
        { patterns: ['watch', 'smartwatch', 'wearable'], response: "See our <a href='products.html?category=wearables' class='chat-link'>Wearables</a>!" },
        { patterns: ['camera', 'photography'], response: "View our <a href='products.html?category=cameras' class='chat-link'>Cameras</a>!" },
        { patterns: ['gaming', 'console', 'playstation', 'xbox'], response: "Check out <a href='products.html?category=gaming' class='chat-link'>Gaming Gear</a>!" },
        { patterns: ['accessory', 'accessories', 'charger', 'case'], response: "Browse <a href='products.html?category=accessories' class='chat-link'>Accessories</a>!" },
        { patterns: ['desktop', 'pc', 'computer'], response: "Explore our <a href='products.html?category=computers' class='chat-link'>Computers</a>!" },
        { patterns: ['tv', 'television', 'monitor'], response: "See our <a href='products.html?category=displays' class='chat-link'>Displays & TVs</a>!" },

        // Shopping & Orders (10 patterns)
        { patterns: ['cart', 'shopping cart', 'basket'], response: "View your <a href='cart.html' class='chat-link'>Shopping Cart</a> here!" },
        { patterns: ['checkout', 'pay', 'payment'], response: "Ready to checkout? Go to your <a href='cart.html' class='chat-link'>Cart</a>!" },
        { patterns: ['track order', 'order status', 'where is my order'], response: "Track your order on the <a href='account.html' class='chat-link'>Account Page</a>!" },
        { patterns: ['return', 'refund', 'cancel order'], response: "Visit our <a href='returns.html' class='chat-link'>Returns & Refunds</a> page or <a href='contact.html' class='chat-link'>contact support</a>." },
        { patterns: ['shipping', 'delivery', 'how long'], response: "Standard shipping takes 3-5 business days. Express available! Details on <a href='shipping.html' class='chat-link'>Shipping Info</a>." },
        { patterns: ['free shipping'], response: "Free shipping on orders over $50! See <a href='shipping.html' class='chat-link'>details</a>." },
        { patterns: ['discount', 'coupon', 'promo code'], response: "Check our <a href='deals.html' class='chat-link'>Deals Page</a> for current promotions!" },
        { patterns: ['compare', 'comparison'], response: "Use our <a href='compare.html' class='chat-link'>Product Comparison Tool</a>!" },
        { patterns: ['deals', 'sale', 'offers'], response: "See all <a href='deals.html' class='chat-link'>Current Deals</a>!" },
        { patterns: ['warranty', 'guarantee'], response: "All products come with a 1-year warranty. Details in <a href='warranty.html' class='chat-link'>Warranty Info</a>." },

        // Business Info (10 patterns)
        { patterns: ['who are you', 'about', 'company'], response: "We're Blue Ember - your trusted tech marketplace! Learn more on our <a href='about.html' class='chat-link'>About Page</a>." },
        { patterns: ['mission', 'vision', 'values'], response: "We believe in quality tech for everyone. Read our story on the <a href='about.html' class='chat-link'>About Page</a>." },
        { patterns: ['privacy', 'data', 'personal information'], response: "Your privacy matters. See our <a href='privacy.html' class='chat-link'>Privacy Policy</a>." },
        { patterns: ['terms', 'conditions', 'legal'], response: "Review our <a href='terms.html' class='chat-link'>Terms & Conditions</a>." },
        { patterns: ['career', 'job', 'hiring'], response: "We're hiring! Check <a href='careers.html' class='chat-link'>Careers</a> for openings." },
        { patterns: ['partner', 'business inquiry', 'collaborate'], response: "Interested in partnership? <a href='contact.html' class='chat-link'>Contact us</a>!" },
        { patterns: ['social media', 'facebook', 'instagram', 'twitter'], response: "Follow us on Instagram, Twitter, and Facebook! Links in the footer." },
        { patterns: ['newsletter', 'subscribe', 'updates'], response: "Subscribe to our newsletter for exclusive deals! Sign up at the bottom of any page." },
        { patterns: ['blog', 'articles', 'news'], response: "Read tech insights on our <a href='blog.html' class='chat-link'>Blog</a>!" },
        { patterns: ['reviews', 'testimonials', 'ratings'], response: "See what customers say on our <a href='reviews.html' class='chat-link'>Reviews Page</a>!" },

        // General Q&A (15+ patterns)
        { patterns: ['hello', 'hi', 'hey', 'greetings'], response: "Hi there! 👋 How can I help you today?" },
        { patterns: ['thanks', 'thank you', 'appreciate'], response: "You're welcome! Let me know if you need anything else." },
        { patterns: ['goodbye', 'bye', 'see you'], response: "Goodbye! Come back anytime. 😊" },
        { patterns: ['how are you', 'how\'s it going'], response: "I'm doing great! Ready to help you find what you need." },
        { patterns: ['what can you do', 'help me', 'features'], response: "I can help you navigate products, answer questions, or direct you to support. Ask me anything!" },
        { patterns: ['name', 'who are you', 'your name'], response: "I'm Blue Ember, your Blue Ember shopping assistant!" },
        { patterns: ['joke', 'funny', 'make me laugh'], response: "Why did the computer go to the doctor? Because it had a virus! 😄" },
        { patterns: ['best product', 'recommend', 'suggestion'], response: "That depends on your needs! Browse our <a href='product2.html' class='chat-link'>Products</a> or tell me what you're looking for." },
        { patterns: ['price', 'cost', 'how much'], response: "Prices vary by product. Check our <a href='product2.html' class='chat-link'>Products Page</a> for details!" },
        { patterns: ['payment methods', 'how to pay', 'credit card'], response: "We accept Visa, Mastercard, PayPal, and more. Secure checkout guaranteed!" },
        { patterns: ['secure', 'safe', 'security'], response: "Your data is encrypted and secure. We use industry-standard SSL protection." },
        { patterns: ['gift card', 'voucher'], response: "Gift cards available! Perfect for tech lovers. <a href='giftcards.html' class='chat-link'>Get One</a>." },
        { patterns: ['student discount', 'education'], response: "Students get 10% off! Verify with your .edu email at checkout." },
        { patterns: ['bulk order', 'wholesale'], response: "For bulk orders, please <a href='contact.html' class='chat-link'>contact our B2B team</a>." },
        { patterns: ['international', 'ship abroad', 'worldwide'], response: "Yes! We ship to 50+ countries. Check <a href='shipping.html' class='chat-link'>International Shipping</a>." },
        // Quick Chip Responses
        { patterns: ['show me products', 'products', 'browse'], response: "Sure! Check out our <a href='product2.html' class='chat-link'>full product catalog</a> or tell me what you're looking for." },
        { patterns: ['contact support', 'support', 'help'], response: "I'm here to help! Visit our <a href='Contact.html' class='chat-link'>Contact Page</a> or ask me anything." },
        { patterns: ['track my order', 'order status', 'tracking'], response: "Track your order in your <a href='account.html' class='chat-link'>Account Dashboard</a>." }
    ];

    // Pattern Matcher
    function getLocalResponse(message) {
        const lowerMsg = message.toLowerCase();
        for (const entry of localResponses) {
            if (entry.patterns.some(pattern => lowerMsg.includes(pattern))) {
                return entry.response;
            }
        }
        return null; // No match, use API
    }

    function init() {
        loadState();
        // --- ADD THIS LINE --- // Force internal state to match the visual state (Closed) on page load state.isOpen = false; // ---------------------
        state.isOpen = false;
        setupEventListeners();
        setupDragAndDrop();
        makeEmojiWindowDraggable(); // Initialize draggable emoji window

        if (!state.currentSessionId) startNewChat(false);
        else renderChat();

        // Apply visual state
        if (state.darkMode) document.body.classList.add('dark-mode');
        const darkToggle = document.getElementById('darkModeToggle');
        if (darkToggle) darkToggle.checked = state.darkMode;

        // --- FEATURE BADGES INITIALIZATION ---
        checkFeatureBadges();
    }

    function loadState() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) state = { ...state, ...JSON.parse(saved) };
    }

    function saveState() {
        try {
            // Clone state but exclude temporary files and heavy image data
            const stateToSave = {
                ...state,
                pendingFiles: [], // Don't save temporary files
                sessions: state.sessions.map(session => ({
                    ...session,
                    msgs: session.msgs.map(msg => {
                        // Remove base64 images from messages before saving
                        let cleanText = msg.text;
                        if (cleanText && cleanText.includes('data:image')) {
                            // Strip out base64 image data but keep structure
                            cleanText = cleanText.replace(/data:image\/[^;]+;base64,[^"']*/g, 'IMAGE_REMOVED');
                        }
                        return { ...msg, text: cleanText };
                    })
                }))
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            console.error('Failed to save state:', e);
            // If quota exceeded, clear old sessions
            if (e.name === 'QuotaExceededError') {
                console.warn('LocalStorage quota exceeded, clearing old sessions...');
                state.sessions = state.sessions.slice(0, 5); // Keep only 5 most recent
                try {
                    const stateToSave = {
                        ...state,
                        pendingFiles: []
                    };
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
                } catch (e2) {
                    console.error('Still failed after cleanup:', e2);
                }
            }
        }
    }

    function makeEmojiWindowDraggable() {
        if (!DOM.emojiWindow) return;

        const dragHandle = DOM.emojiWindow.querySelector('.emoji-drag-handle');
        const closeBtn = DOM.emojiWindow.querySelector('.emoji-close-btn');

        if (!dragHandle) return;

        let isDragging = false;
        let currentX = 0;
        let currentY = 0;
        let initialX = 0;
        let initialY = 0;

        // Helper function to get current transform position
        function getCurrentTransformPosition() {
            const transform = DOM.emojiWindow.style.transform;
            if (!transform || transform === 'none') {
                return { x: 0, y: 0 };
            }
            const match = transform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
            if (match) {
                return {
                    x: parseFloat(match[1]),
                    y: parseFloat(match[2])
                };
            }
            return { x: 0, y: 0 };
        }

        // Mouse event handlers
        function handleMouseDown(e) {
            e.preventDefault();
            isDragging = true;
            
            // Get current window position from transform
            const currentPos = getCurrentTransformPosition();
            currentX = currentPos.x;
            currentY = currentPos.y;
            
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;
            DOM.emojiWindow.style.cursor = 'grabbing';
        }

        function handleMouseMove(e) {
            if (!isDragging) return;
            e.preventDefault();

            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            DOM.emojiWindow.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }

        function handleMouseUp() {
            if (isDragging) {
                isDragging = false;
                DOM.emojiWindow.style.cursor = 'default';
            }
        }

        // Touch event handlers
        function handleTouchStart(e) {
            if (e.touches.length !== 1) return;
            e.preventDefault();
            isDragging = true;
            initialX = e.touches[0].clientX - currentX;
            initialY = e.touches[0].clientY - currentY;
            DOM.emojiWindow.style.cursor = 'grabbing';
        }

        function handleTouchMove(e) {
            if (!isDragging) return;
            e.preventDefault();

            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;

            DOM.emojiWindow.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }

        function handleTouchEnd() {
            if (isDragging) {
                isDragging = false;
                DOM.emojiWindow.style.cursor = 'default';
            }
        }

        // Add event listeners
        dragHandle.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Touch event listeners for mobile devices - attach to drag handle for better handling
        dragHandle.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleEmojiWindow(false);
            });
        }
    }


    function setupEventListeners() {
        // Re-fetch DOM elements to ensure they are current
        const chatBtn = document.getElementById('chat-bubble-btn');
        const chatBtnTwo = document.getElementById('chat-bubble-btn-two');
        const chatWindow = document.getElementById('chat-window');
        const chatInput = document.getElementById('emberInput');
        const chatBody = document.getElementById('emberChatBody');
        const menuToggle = document.getElementById('emberMenuToggle');
        const sidebarToggle = document.getElementById('emberSidebarToggle');
        const dropdown = document.getElementById('emberDropdown');
        const sidebar = document.getElementById('emberSidebar');
        const dropZone = document.getElementById('emberDropZone');
        const fileInput = document.getElementById('emberFileInput');

        // Re-fetch Emoji elements
        DOM.emojiBtn = document.getElementById('emoji-trigger');
        DOM.emojiWindow = document.getElementById('emoji-window-2B');

        // Shared handler for chat toggle with preventDefault and stopPropagation
        const handleChatToggle = (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWindow();
        };

        // Clone chatBtn to remove old listeners and add new ones
        let clonedChatBtn = null;
        if (chatBtn) {
            clonedChatBtn = chatBtn.cloneNode(true);
            chatBtn.parentNode.replaceChild(clonedChatBtn, chatBtn);
            clonedChatBtn.addEventListener('click', handleChatToggle);
            clonedChatBtn.addEventListener('touchstart', handleChatToggle, { passive: false });
            console.log('Listener added to cloned chatBtn');
        } else {
            console.log('chatBtn not found');
        }

        // Clone chatBtnTwo to remove old listeners and add new ones
        let clonedChatBtnTwo = null;
        if (chatBtnTwo) {
            clonedChatBtnTwo = chatBtnTwo.cloneNode(true);
            chatBtnTwo.parentNode.replaceChild(clonedChatBtnTwo, chatBtnTwo);
            clonedChatBtnTwo.addEventListener('click', handleChatToggle);
            clonedChatBtnTwo.addEventListener('touchstart', handleChatToggle, { passive: false });
            console.log('Listener added to cloned chatBtnTwo');
        } else {
            console.log('chatBtnTwo not found');
        }

        // Menu Toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                if (dropdown) dropdown.classList.toggle('show');
            });
        }

        // Sidebar Toggle
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                if (sidebar) sidebar.classList.toggle('open');
            });
        }

        // --- FORCE BADGE INJECTION (STRICT MODE FIX) ---
        // Ensure the notification menu item has the badge span
        if (sidebar) {
            const menuItems = sidebar.querySelectorAll('.menu-item');
            menuItems.forEach(btn => {
                if (btn.innerText.includes('Notifications') || btn.textContent.includes('Notifications')) {
                    if (!btn.querySelector('.notification-badge')) {
                        const span = document.createElement('span');
                        span.className = 'notification-badge';
                        span.style.display = 'none'; // Hidden by default
                        btn.appendChild(span);
                        console.log('Fixed: Injected notification badge into sidebar');
                    }
                }
            });
        }

        // Chips Logic
        document.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', () => {
                if (chatInput) chatInput.value = chip.innerText;
                sendMessage();
                chip.remove();
            });
        });

        // Send button - CRITICAL FIX
        const sendBtn = document.getElementById('emberSendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                sendMessage();
            });
        }

        // Input keydown
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        // Emoji Logic
        const emojiBtn = document.getElementById('emoji-trigger');
        if (emojiBtn) {
            emojiBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleEmojiWindow();

                // Ensure DOM.emojiWindow is fresh
                if (!DOM.emojiWindow) DOM.emojiWindow = document.getElementById('emoji-window-2B');

                // Check if already rendered (looking for a specific child)
                if (state.emojiOpen && DOM.emojiWindow && !DOM.emojiWindow.querySelector('.emoji-tabs')) {
                    renderEmojiPicker();
                }
            });
            DOM.emojiBtn = emojiBtn;
        }

        // Delegate Emoji Click
        if (DOM.emojiWindow) {
            DOM.emojiWindow.addEventListener('click', (e) => {
                e.stopPropagation();

                // Tab click -> Anchor scroll
                const tab = e.target.closest('.emoji-tab');
                if (tab) {
                    const sectionId = `section-${tab.dataset.category}`;
                    const section = DOM.emojiWindow.querySelector(`#${sectionId}`);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    return;
                }

                // Emoji item click
                const item = e.target.closest('.emoji-item');
                if (item) {
                    const shortname = item.dataset.shortname;
                    if (shortname && window.joypixels) {
                        // Insert IMAGE into contenteditable
                        // joypixels.toImage(shortname) returns an <img> string
                        const imgHtml = joypixels.toImage(shortname);
                        insertEmojiHtml(imgHtml);
                    }
                }
            });
        }

        // Updated click outside logic
        document.addEventListener('click', (e) => {
            if (chatWindow && chatWindow.classList.contains('active') &&
                !chatWindow.contains(e.target) &&
                !clonedChatBtn?.contains(e.target) &&
                !clonedChatBtnTwo?.contains(e.target) &&
                !e.target.classList.contains('chip')) {
                if (state.isOpen) toggleWindow();
            }

            // Close emoji window if clicked outside
            if (state.emojiOpen && !DOM.emojiWindow?.contains(e.target) && !DOM.emojiBtn?.contains(e.target)) {
                toggleEmojiWindow(false);
            }

            // Close dropdown if clicked outside
            if (dropdown && dropdown.classList.contains('show') &&
                !dropdown.contains(e.target) &&
                !menuToggle?.contains(e.target)) {
                dropdown.classList.remove('show');
            }

            // Close sidebar if clicked outside
            if (sidebar && sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                !sidebarToggle?.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }

    function toggleEmojiWindow(forceState = null) {
        // Robustness: ensure we have the window reference
        if (!DOM.emojiWindow) DOM.emojiWindow = document.getElementById('emoji-window-2B');
        if (!DOM.emojiWindow) {
            console.error('Blue Ember: Emoji window not found in DOM!');
            return;
        }

        const body = DOM.emojiWindow.querySelector('.emoji-window-body');
        if (!body) {
            console.error('Blue Ember: Emoji window body (.emoji-window-body) not found!');
            return;
        }

        if (forceState !== null) {
            state.emojiOpen = forceState;
        } else {
            state.emojiOpen = !state.emojiOpen;
        }

        console.log(`Blue Ember: Toggling emoji window to ${state.emojiOpen ? 'OPEN' : 'CLOSED'}`);

        if (state.emojiOpen) {
            DOM.emojiWindow.classList.add('active');
            // Render emojis if not already rendered
            if (!body.querySelector('.emoji-tabs')) {
                renderEmojiPicker();
            }
        } else {
            DOM.emojiWindow.classList.remove('active');
        }

        saveState();
    }


    function setupDragAndDrop() {
        const zone = DOM.dropZone;
        const win = DOM.chatWindow;

        if (!zone || !win) return;

        win.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (state.isOpen) zone.classList.add('active');
        });

        zone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            zone.classList.remove('active');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('active');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]);
            }
        });
    }

    function addPendingFile(file) {
        if (file.type.startsWith('image/')) {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const maxSize = 1000;
                let { width, height } = img;
                if (width > height) {
                    if (width > maxSize) {
                        height = (height * maxSize) / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = (width * maxSize) / height;
                        height = maxSize;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                const base64 = canvas.toDataURL('image/png', 1.0);
                state.pendingFiles.push({ file, base64 });
                updatePreview();
            };
            img.src = URL.createObjectURL(file);
        } else {
            state.pendingFiles.push({ file, base64: null });
            updatePreview();
        }
    }

    function removePendingFile(index) {
        console.log('removePendingFile called with index:', index, 'current pendingFiles length:', state.pendingFiles.length);
        if (index >= 0 && index < state.pendingFiles.length) {
            state.pendingFiles.splice(index, 1);
            console.log('Removed file at index', index, 'new length:', state.pendingFiles.length);
            updatePreview();
        } else {
            console.log('Invalid index for removePendingFile:', index);
        }
    }

    function updatePreview() {
        console.log('updatePreview called, pendingFiles length:', state.pendingFiles.length);
        const previewDiv = document.getElementById('preview-window-2A') || document.getElementById('preview-window-2A-active');
        if (!previewDiv) {
            console.log('Preview div not found');
            return;
        }
        console.log('Current id:', previewDiv.id);

        if (state.pendingFiles.length > 0) {
            previewDiv.id = 'preview-window-2A-active';
            console.log('Setting id to preview-window-2A-active');
            previewDiv.innerHTML = state.pendingFiles.map((item, index) => {
                const { file, base64 } = item;
                const isImage = file.type.startsWith('image/');
                const previewSrc = isImage ? base64 : '';
                return `
                    <div class="file-preview-item">
                        ${isImage ? `<img src="${previewSrc}">` : `<div class="file-icon">📄</div>`}
                        <button onclick="event.stopPropagation(); EmberCore.removePendingFile(${index})" data-index="${index}"><i class='bx bx-x'></i></button>
                    </div>
                `;
            }).join('') + '<p style="font-size: 9px;color:#888;margin: -6px;margin-top: -30px;">Images Uploaded in Chat are Temporary & Deleted after Web reloads.</p>';
        } else {
            previewDiv.id = 'preview-window-2A';
            console.log('Setting id to preview-window-2A');
            previewDiv.innerHTML = '';
        }
        console.log('After update, id:', previewDiv.id, 'display:', getComputedStyle(previewDiv).display);
    }

    function handleFileUpload(input) {
        const files = Array.from(input.files);
        console.log('handleFileUpload: selected files count:', files.length);
        const availableSlots = 3 - state.pendingFiles.length;
        console.log('handleFileUpload: availableSlots:', availableSlots);
        if (availableSlots <= 0) {
            alert('Maximum 3 files allowed per message.');
            return;
        }
        const filesToAdd = files.slice(0, availableSlots);
        console.log('handleFileUpload: filesToAdd count:', filesToAdd.length);
        filesToAdd.forEach(file => addPendingFile(file));
        if (files.length > availableSlots) {
            alert(`Only ${availableSlots} files added. Maximum 3 files per message.`);
        }
    }

    function processFile(file) {
        const availableSlots = 3 - state.pendingFiles.length;
        if (availableSlots <= 0) {
            alert('Maximum 3 files allowed per message.');
            return;
        }
        addPendingFile(file);
    }

    // --- CHAT LOGIC ---
    function toggleWindow() {
        state.isOpen = !state.isOpen;
        if (state.isOpen) {
            DOM.chatWindow.classList.add('active');
            // icon change if needed
        } else {
            DOM.chatWindow.classList.remove('active');
        }
    }

    function startNewChat(render = true) {
        const newId = Date.now().toString();
        state.sessions.unshift({
            id: newId,
            ts: Date.now(),
            msgs: [{ role: 'bot', text: "Hi! I am Chatbase AI, ask me anything about Chatbase!" }]
        });
        state.currentSessionId = newId;
        saveState();
        if (render) {
            if (DOM.dropdown) DOM.dropdown.classList.remove('show');
            renderChat();
            switchView('chat');
        }
    }

    function endChat() {
        addMessage('bot', "Chat ended.");
        state.currentSessionId = null;
        startNewChat();
    }

    function getMessageText() {
        // Clone the input to separate logic from UI
        const clone = DOM.chatInput.cloneNode(true);
        // Replace JoyPixels images with their alt text (unicode/shortname)
        // JoyPixels renders <img class="joypixels" alt="😂" src="...">
        const images = clone.querySelectorAll('img.joypixels');
        images.forEach(img => {
            const alt = img.getAttribute('alt') || '';
            const textNode = document.createTextNode(alt);
            img.replaceWith(textNode);
        });
        // We use innerText to respect line breaks and whitespace
        return clone.innerText.trim();
    }

    function sendMessage() {
        console.log('🔵 sendMessage called');

        // Extract text from contenteditable
        const txt = getMessageText();
        console.log('📝 Text extracted:', txt);
        console.log('📎 Pending files count:', state.pendingFiles.length);
        console.log('📎 Pending files:', state.pendingFiles);

        // 1. Validation
        if (!txt && state.pendingFiles.length === 0) {
            console.log('❌ Validation failed: no text and no files');
            return;
        }
        console.log('✅ Validation passed');

        // 3. Add User Message
        addMessage('user', txt, state.pendingFiles.length > 0 ? [...state.pendingFiles] : null);

        // 4. Clear Inputs
        DOM.chatInput.innerText = ''; // Clear contenteditable
        // DOM.chatInput.style.height = 'auto'; // No longer needed for div
        state.pendingFiles = [];
        updatePreview();
        toggleEmojiWindow(false);
        renderChat();

        // 5. Bot Typing Simulation (Loader)
        const typingId = 'typing_' + Date.now();
        // Using the exact structure from Uiverse
        const typingHtml = `
            <div id="${typingId}" class="msg-group bot">
                <div class="bot-identity">
                      <img src="https://ui-avatars.com/api/?name=E&background=000&color=fff&size=25&rounded=true" style="border-radius:50%"> Chatbase AI Agent
                </div>
                <div class="msg-bubble" style="padding: 10px 15px; display:flex; flex-direction:row; min-width:30px !important;">typing
                    <div class="loader" style="transform: scale(0.2); transform-origin: left center; margin: 0;">
                      <div class="box-load1"></div>
                      <div class="box-load2"></div>
                      <div class="box-load3"></div>
                    </div>
                </div>
            </div>`;

        DOM.chatBody.insertAdjacentHTML('beforeend', typingHtml);
        DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;

        // 6. Fake API Delay (4.3 Seconds)
        setTimeout(() => {
            // Remove Loader
            const loader = document.getElementById(typingId);
            if (loader) loader.remove();

            // Get Response
            const localReply = getLocalResponse(txt);

            // Use the smart streaming addMessage for both
            const replyText = localReply || "I'm sorry, I'm not sure how to help with that yet. Try asking about our products or support!";
            addMessage('bot', replyText);

        }, 4300); // Exact 4.3s delay
    }


    function addMessage(role, text, attachments = null) {
        // If User, save and render instantly
        if (role === 'user') {
            const session = state.sessions.find(s => s.id === state.currentSessionId);
            if (session) {
                session.msgs.push({ role, text, attachments });
                saveState();
            }
            renderChat();
            return;
        }

        // If Bot, initiate streaming animation
        if (role === 'bot') {
            const div = document.createElement('div');
            div.className = `msg-group ${role}`;

            const identity = `
                <div class="bot-identity">
                     <img src="https://ui-avatars.com/api/?name=E&background=000&color=fff&size=25&rounded=true" style="border-radius:50%"> Chatbase AI Agent
                </div>`;

            div.innerHTML = `
                ${identity}
                <div class="msg-bubble"><span class="typing-cursor"></span></div>
            `;
            DOM.chatBody.appendChild(div);
            DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;

            const bubble = div.querySelector('.msg-bubble');
            const cursor = bubble.querySelector('.typing-cursor');

            // Streaming Logic
            let i = 0;
            const speed = 25; // Speed in ms

            function typeStream() {
                if (i < text.length) {
                    const char = text.charAt(i);

                    if (char === '<') {
                        // Detect and skip HTML tags
                        let tag = '';
                        let j = i;
                        while (j < text.length && text.charAt(j) !== '>') {
                            tag += text.charAt(j);
                            j++;
                        }
                        if (j < text.length) {
                            tag += '>';
                            i = j + 1;
                            // Insert the HTML tag before the cursor
                            cursor.insertAdjacentHTML('beforebegin', tag);
                        } else {
                            // Malformed tag, treat as text
                            cursor.insertAdjacentText('beforebegin', char);
                            i++;
                        }
                    } else {
                        // Regular character
                        cursor.insertAdjacentText('beforebegin', char);
                        i++;
                    }

                    DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;
                    setTimeout(typeStream, speed);
                } else {
                    // Streaming complete
                    if (cursor) cursor.remove();

                    // Now save to session state so it persists
                    const session = state.sessions.find(s => s.id === state.currentSessionId);
                    if (session) {
                        session.msgs.push({ role, text });
                        saveState();
                    }
                }
            }

            typeStream();
        }
    }

    function renderChat() {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        DOM.chatBody.innerHTML = '';
        session.msgs.forEach((msg, index) => {
            const div = document.createElement('div');
            div.className = `msg-group ${msg.role}`;
            div.dataset.messageId = index; // Track message index
            div.style.position = 'relative'; // For absolute positioning of menu button

            let identity = '';
            if (msg.role === 'bot') {
                identity = `
                <div class="bot-identity">
                     <img src="https://ui-avatars.com/api/?name=E&background=000&color=fff&size=25&rounded=true" style="border-radius:50%"> Chatbase AI Agent
                </div>`;
            }

            // Process attachments if any
            let attachmentHtml = '';
            if (msg.attachments && msg.attachments.length > 0) {
                const gridClass = msg.attachments.length === 1 ? 'grid-1' :
                    msg.attachments.length === 2 ? 'grid-2' :
                        msg.attachments.length === 3 ? 'grid-3' : 'grid-4';

                const imageItems = msg.attachments.map((item, index) => {
                    if (item.base64) {
                        return `
                            <div class="attachment-item" onclick="event.stopPropagation(); EmberCore.openLightbox('${item.base64}', 'Image ${index + 1}')">
                                <img src="${item.base64}" alt="${item.file ? item.file.name : 'Image'}">
                                <div class="attachment-overlay">
                                    <i class='bx bx-expand-right'></i>
                                </div>
                            </div>
                        `;
                    }
                    return '';
                }).join('');

                attachmentHtml = `
                    <div class="message-attachments">
                        <div class="attachment-grid ${gridClass}">
                            ${imageItems}
                        </div>
                    </div>
                `;
            }

            // Process emoji icons and text
            let displayText = msg.text || '';
            if (window.joypixels && displayText) {
                displayText = joypixels.toImage(displayText);
            }

            // Add three-dot menu button
            const menuBtn = `
                <button class="msg-menu-btn" onclick="event.stopPropagation(); EmberCore.showMessageMenu(event, ${index}, '${msg.role}')">
                    <i class='bx bx-dots-vertical-rounded'></i>
                </button>
            `;

            // Add edited indicator if applicable
            const editedClass = msg.edited ? 'edited' : '';
            const editedBadge = msg.edited ? '<span class="edited-badge">edited</span>' : '';

            div.innerHTML = `
                ${identity}
                <div class="message-wrapper">
                    ${attachmentHtml}
                    ${displayText ? `
                        <div class="msg-bubble ${editedClass}">
                            ${displayText}
                            ${editedBadge}
                        </div>
                    ` : ''}
                    ${menuBtn}
                </div>
            `;
            DOM.chatBody.appendChild(div);
        });
        DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;
    }

    function switchView(name) {
        document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));
        if (DOM.sidebar) DOM.sidebar.classList.remove('open');
        if (DOM.dropdown) DOM.dropdown.classList.remove('show');

        const view = document.getElementById('view_' + name);
        if (view) {
            view.classList.add('active');

            // Feature Badges Logic - Mark as read when visiting What's New
            if (name === 'whatsnew') {
                markFeatureBadgesAsRead();
            }

            // Notification View Logic
            if (name === 'notifications' && window.OrderManager) {
                // 1. Mark all read
                window.OrderManager.markAllAsRead();

                // 2. Render List
                const notifs = window.OrderManager.getAllNotifications();
                let html = '';

                if (notifs.length === 0) {
                    html = `
                        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px; color:#94a3b8; text-align:center;">
                            <i class='bx bx-bell-off' style="font-size:48px; margin-bottom:15px; opacity:0.5;"></i>
                            <h4 style="margin:0 0 5px 0; color:#cbd5e1;">All caught up!</h4>
                            <p style="margin:0; font-size:13px;">No new notifications at the moment.</p>
                        </div>
                    `;
                } else {
                    html = notifs.map(n => `
                        <div class="notification-card ${n.read ? 'read' : 'unread'}">
                            <div class="notification-header">
                                <span style="color:${n.type === 'error' ? '#ef4444' : '#0ea5e9'}">${n.type === 'error' ? 'ALERT' : 'UPDATE'}</span>
                                <span>${new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div class="notification-body">
                                ${n.message}
                            </div>
                            <div class="notification-actions">
                                ${n.orderId ? `<button onclick="window.location.href='profile.html?orderId=${n.orderId}'" class="view-details-btn">View Details</button>` : ''}
                            </div>
                        </div>
                    `).join('');
                }

                view.innerHTML = `
                    <div class="list-view-content">
                        <h3 class="list-header">
                            <i class='bx bx-bell'></i> Notifications
                        </h3>
                        <div style="display:flex; flex-direction:column; gap:5px;">
                            ${html}
                        </div>
                        <button class="menu-item" onclick="EmberCore.switchView('chat')" style="margin-top:20px">
                            <i class='bx  bx-arrow-s-left'></i>  Back to Chat
                        </button>
                    </div>
                `;
            }
        }
    }

    function showRecentChats() {
        const container = document.getElementById('emberHistoryList');
        if (container) {
            container.innerHTML = '';
            document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));
            document.getElementById('view_recent').classList.add('active');
            if (DOM.dropdown) DOM.dropdown.classList.remove('show');

            state.sessions.forEach(s => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <span style="font-weight:600; font-size:14px;">${new Date(s.ts).toLocaleDateString()}</span>
                    <span style="font-size:12px; color:var(--text-sub);">${s.msgs[s.msgs.length - 1]?.text.substring(0, 30)}...</span>
                `;
                div.onclick = (e) => {
                    e.stopPropagation();
                    state.currentSessionId = s.id;
                    saveState();
                    renderChat();
                    switchView('chat');
                };
                container.appendChild(div);
            });
        }
    }

    function toggleDarkMode(isDark) {
        state.darkMode = isDark;
        saveState();
        if (isDark) document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
    }

    function insertEmojiHtml(html) {
        const input = DOM.chatInput;
        input.focus();

        // Use Selection API to insert HTML at cursor
        if (window.getSelection && window.getSelection().rangeCount > 0) {
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);

            // Check if selection is inside our input
            if (input.contains(range.commonAncestorContainer)) {
                range.deleteContents();

                const div = document.createElement('div');
                div.innerHTML = html;
                const frag = document.createDocumentFragment();
                let node, lastNode;
                while ((node = div.firstChild)) {
                    lastNode = frag.appendChild(node);
                }

                range.insertNode(frag);

                // Move cursor after inserted content
                if (lastNode) {
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            } else {
                // Fallback: append to end if focus was elsewhere
                input.insertAdjacentHTML('beforeend', html);
                // Move cursor to end
                const range = document.createRange();
                range.selectNodeContents(input);
                range.collapse(false); // false = end
                selection.removeAllRanges();
                selection.addRange(range);
            }
        } else {
            // Fallback
            input.insertAdjacentHTML('beforeend', html);
        }
    }

    // Cache for emoji data
    let _emojiDataCache = null;

    async function fetchEmojiData() {
        if (_emojiDataCache) return _emojiDataCache;

        try {
            console.log('Fetching emoji strategy from CDN...');
            const response = await fetch('https://cdn.jsdelivr.net/npm/emoji-toolkit@10.0.0/emoji_strategy.json');
            const data = await response.json();

            // Process into our categories
            const processed = {};
            EMOJI_CATEGORIES.forEach(cat => processed[cat.id] = []);

            Object.values(data).forEach(emoji => {
                let catId = emoji.category;
                // Map JoyPixels categories to ours
                if (catId === 'activities') catId = 'activity';
                if (catId === 'places') catId = 'travel';
                if (catId === 'regional') catId = 'flags';
                if (catId === 'modifier') return; // Skip modifiers

                if (processed[catId]) {
                    processed[catId].push(emoji);
                } else if (processed['symbols']) { // Fallback to symbols
                    processed['symbols'].push(emoji);
                }
            });

            _emojiDataCache = processed;
            return processed;
        } catch (err) {
            console.error('Failed to fetch emojis:', err);
            return null;
        }
    }

    async function renderEmojiPicker() {
        if (!DOM.emojiWindow) return;

        const body = DOM.emojiWindow.querySelector('.emoji-window-body');
        if (!body) return;

        // Show loading state
        if (!_emojiDataCache) {
            body.innerHTML = '<div style="color:var(--text-main); padding:20px; text-align:center;">Loading emojis...</div>';
        }

        const data = await fetchEmojiData();
        if (!data) {
            body.innerHTML = '<div style="color:red; padding:20px; text-align:center;">Failed to load emojis.</div>';
            return;
        }

        // Generate HTML
        let html = `
            <div class="emoji-tabs">
                ${EMOJI_CATEGORIES.map((cat, idx) => `
                    <button class="emoji-tab ${idx === 0 ? 'active' : ''}" data-category="${cat.id}" title="${cat.name}">
                        <i class='bx ${cat.icon}'></i>
                    </button>
                `).join('')}
            </div>
            <div class="emoji-search-container">
                <div class="emoji-search-inner">
                    <i class='bx bx-search'></i>
                    <input type="text" placeholder="Search emoji" id="emoji-search-input">
                </div>
            </div>
            <div class="emoji-scroll-viewer" id="emoji-scroll-viewer">
                ${EMOJI_CATEGORIES.map(cat => {
            const emojis = data[cat.id] || [];
            if (emojis.length === 0) return '';

            return `
                    <div class="emoji-category-section" id="section-${cat.id}">
                        <h4 class="emoji-category-title">${cat.name}</h4>
                        <div class="emoji-grid">
                            ${emojis.map(e => `
                                <div class="emoji-item" data-shortname="${e.shortname}" title="${e.name}">
                                    ${window.joypixels ? joypixels.toImage(e.shortname) : e.shortname}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `}).join('')}
            </div>
            
        `;

        body.innerHTML = html;

        // Search logic - Query from the body now
        const searchInput = body.querySelector('#emoji-search-input');
        const viewer = body.querySelector('#emoji-scroll-viewer');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const items = body.querySelectorAll('.emoji-item');
                const sections = body.querySelectorAll('.emoji-category-section');

                items.forEach(item => {
                    const title = item.getAttribute('title').toLowerCase();
                    const shortname = item.dataset.shortname || '';
                    if (title.includes(query) || shortname.includes(query)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Hide empty sections
                sections.forEach(sec => {
                    const hasVisible = Array.from(sec.querySelectorAll('.emoji-item')).some(i => i.style.display !== 'none');
                    sec.style.display = hasVisible ? 'block' : 'none';
                });
            });
        }

        // Scroll sync logic
        if (viewer) {
            viewer.addEventListener('scroll', () => {
                const scrollPos = viewer.scrollTop + 50;
                const sections = body.querySelectorAll('.emoji-category-section');
                const tabs = body.querySelectorAll('.emoji-tab');

                sections.forEach(sec => {
                    if (sec.style.display === 'none') return;
                    if (scrollPos >= sec.offsetTop && scrollPos < (sec.offsetTop + sec.offsetHeight)) {
                        const catId = sec.id.replace('section-', '');
                        tabs.forEach(t => {
                            t.classList.toggle('active', t.dataset.category === catId);
                        });
                    }
                });
            });
        }
    }

    // Context Menu Functions
    let activeMenu = null;

    function showMessageMenu(event, messageId, role) {
        event.stopPropagation();

        // Close any existing menu
        if (activeMenu) {
            activeMenu.remove();
            activeMenu = null;
        }

        // Create menu
        const menu = document.createElement('div');
        menu.className = 'message-context-menu active';

        // User message menu options
        const userMenuItems = `
            <div class="menu-item" data-action="copy">
                <i class='bx bx-copy'></i>
                <span>Copy</span>
            </div>
            <div class="menu-item" data-action="edit">
                <i class='bx bx-edit'></i>
                <span>Re-edit</span>
            </div>
            <div class="menu-item" data-action="rewind">
                <i class="fas fa-undo" style="font-size: inherit;"></i>
                <span>Rewind to here</span>
            </div>
            <div class="menu-item" data-action="delete">
                <i class='bx bx-trash'></i>
                <span>Delete message</span>
            </div>
        `;

        // Bot message menu options
        const botMenuItems = `
            <div class="menu-item" data-action="copy">
                <i class='bx bx-copy'></i>
                <span>Copy</span>
            </div>
            <div class="menu-item" data-action="remove">
                <i class='bx bx-minus-circle'></i>
                <span>Remove message</span>
            </div>
            <div class="menu-item" data-action="newchat">
                <i class='bx  bx-arrow-out-down-left-square'></i> 
                <span>New chat from here</span>
            </div>
            <div class="menu-item" data-action="editmsg">
                <i class='bx bx-edit-alt'></i>
                <span>Edit message</span>
            </div>
            <div class="menu-item" data-action="report">
                <i class='bx bx-flag'></i>
                <span>Report</span>
            </div>
        `;

        menu.innerHTML = role === 'user' ? userMenuItems : botMenuItems;

        // Position menu
        const button = event.currentTarget;
        const buttonRect = button.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = `${buttonRect.bottom + 5}px`;
        menu.style.left = `${buttonRect.left - 150}px`; // Offset to the left

        // Add to body
        document.body.appendChild(menu);
        activeMenu = menu;

        // Add click handlers to menu items
        menu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent bubbling
                const action = item.dataset.action;
                handleMenuAction(action, messageId, role);
                menu.remove();
                activeMenu = null;
            });
        });

        // Stop propagation on menu itself
        menu.addEventListener('click', (e) => {
            // e.stopPropagation(); // Removed blanket stopPropagation
        });

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                if (activeMenu) {
                    activeMenu.remove();
                    activeMenu = null;
                }
                document.removeEventListener('click', closeMenu);
            });
        }, 100);
    }

    function handleMenuAction(action, messageId, role) {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        const message = session.msgs[messageId];
        if (!message) return;

        switch (action) {
            case 'copy':
                copyMessageText(message.text);
                break;
            case 'edit':
                if (role === 'user') {
                    editUserMessage(messageId);
                }
                break;
            case 'rewind':
                rewindChatToMessage(messageId);
                break;
            case 'delete':
                deleteMessage(messageId);
                break;
            case 'remove':
                deleteMessage(messageId);
                break;
            case 'newchat':
                createNewChatFrom(messageId);
                break;
            case 'editmsg':
                // Allow editing bot message (optional feature)
                editBotMessage(messageId);
                break;
            case 'report':
                reportMessage(messageId);
                break;
        }
    }

    function copyMessageText(text) {
        // Strip HTML tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent || tempDiv.innerText;

        navigator.clipboard.writeText(plainText).then(() => {
            console.log('Message copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }

    function editUserMessage(messageId) {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        const message = session.msgs[messageId];
        if (!message || message.role !== 'user') return;

        // Find the message element
        const msgElement = DOM.chatBody.querySelector(`[data-message-id="${messageId}"]`);
        if (!msgElement) return;

        const bubble = msgElement.querySelector('.msg-bubble');
        if (!bubble) return;

        // Add editing class to hide bubble style
        bubble.classList.add('editing');

        // Strip HTML from message text
        const plainText = message.text.replace(/<[^>]*>/g, '');

        // Create inline edit UI
        bubble.innerHTML = `
            <div class="inline-edit-container">
                <textarea class="inline-edit-textarea" rows="4">${plainText}</textarea>
                <div class="inline-edit-actions">
                    <button class="inline-edit-cancel" onclick="event.stopPropagation(); EmberCore.cancelEdit(${messageId})">Cancel</button>
                    <button class="inline-edit-save" onclick="event.stopPropagation(); EmberCore.saveUserEdit(${messageId})">Save</button>
                </div>
            </div>
        `;

        // Focus textarea
        const textarea = bubble.querySelector('.inline-edit-textarea');
        if (textarea) {
            textarea.focus();
            textarea.select();
        }
    }

    function rewindChatToMessage(messageId) {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        // Keep messages up to and including this one
        session.msgs = session.msgs.slice(0, messageId + 1);
        saveState();
        renderChat();
    }

    function deleteMessage(messageId) {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        session.msgs.splice(messageId, 1);
        saveState();
        renderChat();
    }

    function createNewChatFrom(messageId) {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        // Create new session with messages up to this point
        const newId = Date.now().toString();
        const forkedMsgs = session.msgs.slice(0, messageId + 1);

        state.sessions.unshift({
            id: newId,
            ts: Date.now(),
            msgs: forkedMsgs
        });

        state.currentSessionId = newId;
        saveState();
        renderChat();
    }

    function editBotMessage(messageId) {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        const message = session.msgs[messageId];
        if (!message || message.role !== 'bot') return;

        // Find the message element
        const msgElement = DOM.chatBody.querySelector(`[data-message-id="${messageId}"]`);
        if (!msgElement) return;

        const bubble = msgElement.querySelector('.msg-bubble');
        if (!bubble) return;

        // Add editing class to hide bubble style
        bubble.classList.add('editing');

        // Strip HTML from message text
        const plainText = message.text.replace(/<[^>]*>/g, '');

        // Create inline edit UI
        bubble.innerHTML = `
            <div class="inline-edit-container">
                <textarea class="inline-edit-textarea" rows="3">${plainText}</textarea>
                <div class="inline-edit-actions">
                    <button class="inline-edit-cancel" onclick="event.stopPropagation(); EmberCore.cancelEdit(${messageId})">Cancel</button>
                    <button class="inline-edit-save" onclick="event.stopPropagation(); EmberCore.saveEdit(${messageId})">Save</button>
                </div>
            </div>
        `;

        // Focus textarea
        const textarea = bubble.querySelector('.inline-edit-textarea');
        if (textarea) {
            textarea.focus();
            textarea.select();
        }
    }

    function cancelEdit(messageId) {
        renderChat(); // Just re-render to restore original
    }

    function saveEdit(messageId) {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        const message = session.msgs[messageId];
        if (!message) return;

        const msgElement = DOM.chatBody.querySelector(`[data-message-id="${messageId}"]`);
        if (!msgElement) return;

        const textarea = msgElement.querySelector('.inline-edit-textarea');
        if (!textarea) return;

        const newText = textarea.value.trim();
        if (newText) {
            message.text = newText;
            message.edited = true;
            saveState();
            renderChat();
        }
    }

    function saveUserEdit(messageId) {
        const session = state.sessions.find(s => s.id === state.currentSessionId);
        if (!session) return;

        const message = session.msgs[messageId];
        if (!message || message.role !== 'user') return;

        const msgElement = DOM.chatBody.querySelector(`[data-message-id="${messageId}"]`);
        if (!msgElement) return;

        const textarea = msgElement.querySelector('.inline-edit-textarea');
        if (!textarea) return;

        const newText = textarea.value.trim();
        if (newText) {
            // Update message text
            message.text = newText;
            message.edited = true;

            // Rewind chat - delete all messages after this one
            session.msgs = session.msgs.slice(0, messageId + 1);

            saveState();
            renderChat();

            // Auto-trigger bot response
            const typingId = 'typing_' + Date.now();
            const typingHtml = `
                <div id="${typingId}" class="msg-group bot">
                    <div class="bot-identity">
                          <img src="https://ui-avatars.com/api/?name=E&background=000&color=fff&size=25&rounded=true" style="border-radius:50%"> Chatbase AI Agent
                    </div>
                    <div class="msg-bubble" style="padding: 10px 15px; display:flex; flex-direction:row; min-width:30px !important;">typing
                        <div class="loader" style="transform: scale(0.2); transform-origin: left center; margin: 0;">
                          <div class="box-load1"></div>
                          <div class="box-load2"></div>
                          <div class="box-load3"></div>
                        </div>
                    </div>
                </div>`;

            DOM.chatBody.insertAdjacentHTML('beforeend', typingHtml);
            DOM.chatBody.scrollTop = DOM.chatBody.scrollHeight;

            setTimeout(() => {
                const loader = document.getElementById(typingId);
                if (loader) loader.remove();

                const localReply = getLocalResponse(newText);
                const replyText = localReply || "I'm sorry, I'm not sure how to help with that yet. Try asking about our products or support!";
                addMessage('bot', replyText);
            }, 4300);
        }
    }

    function reportMessage(messageId) {
        // Show report modal
        const modal = document.getElementById('report-modal');
        if (modal) {
            modal.classList.add('active');
            modal.dataset.messageId = messageId;
        }
    }

    function closeReportModal() {
        const modal = document.getElementById('report-modal');
        if (modal) {
            modal.classList.remove('active');
            // Clear form
            const radios = modal.querySelectorAll('input[type="radio"]');
            radios.forEach(r => r.checked = false);
            const textarea = modal.querySelector('#report-details-input');
            if (textarea) textarea.value = '';
            delete modal.dataset.messageId;
        }
    }

    function submitReport() {
        const modal = document.getElementById('report-modal');
        if (!modal) return;

        const messageId = modal.dataset.messageId;
        const selectedReason = modal.querySelector('input[name="report-reason"]:checked');
        const details = modal.querySelector('#report-details-input');

        if (!selectedReason) {
            alert('Please select a report reason');
            return;
        }

        const reportData = {
            messageId,
            reason: selectedReason.value,
            details: details?.value || '',
            timestamp: Date.now()
        };

        console.log('Report Recneived:', reportData);
        closeReportModal();
    }

    function openLightbox(imageSrc, caption = '') {
        const modal = document.getElementById('lightbox-modal');
        const img = document.getElementById('lightbox-img');
        const captionText = document.getElementById('lightbox-caption');

        if (modal && img) {
            img.src = imageSrc;
            if (captionText) captionText.textContent = caption;
            modal.classList.add('active');
        }
    }

    function closeLightbox() {
        const modal = document.getElementById('lightbox-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    return {
        init,
        toggleWindow,
        startNewChat,
        endChat,
        sendMessage,
        handleFileUpload,
        switchView,
        toggleDarkMode,
        showRecentChats,
        removePendingFile,
        openLightbox,
        closeLightbox,
        showMessageMenu,
        cancelEdit,
        saveEdit,
        saveUserEdit,
        closeReportModal,
        submitReport,
        checkFeatureBadges,
        markFeatureBadgesAsRead
    };

    // --- FEATURE BADGES LOGIC ---
    function checkFeatureBadges() {
        // Use a versioned key to allow future resets if needed
        const readStatus = localStorage.getItem('ember_feature_badges_read_v2.8') === 'true';
        const badges = document.querySelectorAll('.feature-badge');

        if (readStatus) {
            // Force immediate disappearance if already read
            badges.forEach(badge => {
                badge.style.display = 'none';
                badge.style.opacity = '0';
            });
            return;
        }

        // Show badges if not read - use a slight delay for Boxicons initialization
        setTimeout(() => {
            // Re-check status inside timeout in case it changed (e.g. user navigation)
            if (localStorage.getItem('ember_feature_badges_read_v2.8') === 'true') return;

            badges.forEach(badge => {
                badge.innerHTML = "<i class='bx bxs-sparkles'></i>";
                badge.style.transition = 'opacity 0.3s ease';
                badge.style.display = 'flex';
                // Trigger reflow for transition
                badge.offsetHeight;
                badge.style.opacity = '1';
            });
            console.log('Feature badges initialized (unread).');
        }, 300);
    }

    function markFeatureBadgesAsRead() {
        // Set persistence first to win any race conditions on refresh
        localStorage.setItem('ember_feature_badges_read_v2.8', 'true');

        const badges = document.querySelectorAll('.feature-badge');
        badges.forEach(badge => {
            badge.style.opacity = '0';
            setTimeout(() => {
                badge.style.display = 'none';
            }, 300);
        });
        console.log('Feature badges permanently dismissed.');
    }


})();

document.addEventListener('DOMContentLoaded', EmberCore.init);










