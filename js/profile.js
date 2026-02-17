// Global State
let orders = [];
let currentUser = {};

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize mobile navigation if available
    if (typeof initMobileNav === 'function') {
        initMobileNav();
    }
    await loadUserProfile(); // Wait for user profile to load ID
    await loadOrders();
    initializeProfileTabs();
    initializeProfileModal();
    checkLoginStatus();
    // Initialize wishlist listener for dynamic wishlist count updates
    initializeWishlistListener();
});

async function loadUserProfile() {
    // Get User for Multi-User Support
    if (window.DB) {
        const { data } = await window.DB.getUser();
        currentUser = data.user || {};
    } else {
        currentUser = JSON.parse(localStorage.getItem('be_current_user') || '{}');
    }

    // Determine Suffix for Keys
    const uidSuffix = currentUser.id ? `_${currentUser.id}` : '';

    // Standard user data from localStorage (Scoped)
    const savedAccountData = localStorage.getItem(`be_account_data${uidSuffix}`);
    const savedProfilePic = localStorage.getItem(`be_profile_picture${uidSuffix}`);

    // Update Header
    const welcomeMsg = document.getElementById('welcomeMsg');
    if (savedAccountData) {
        const data = JSON.parse(savedAccountData);
        if (data.firstName) {
            welcomeMsg.textContent = `Welcome back, ${data.firstName}!`;
        }
    } else if (currentUser.user_metadata && currentUser.user_metadata.full_name) {
        welcomeMsg.textContent = `Welcome back, ${currentUser.user_metadata.full_name}!`;
    } else if (currentUser.name) {
        welcomeMsg.textContent = `Welcome back, ${currentUser.name}!`;
    }

    // Update Profile Pic
    const profileImg = document.getElementById('dashboardProfilePic');
    const placeholder = document.querySelector('.profile-pic-placeholder');

    if (savedProfilePic) {
        profileImg.src = savedProfilePic;
        profileImg.style.display = 'block';
        placeholder.style.display = 'none';

        // Also update navbar icon
        const navImg = document.getElementById('profileIconImg');
        if (navImg) navImg.src = savedProfilePic;
    } else if (window.AuthUI) {
        // Use generated gradient if no image is set
        const accountData = savedAccountData ? JSON.parse(savedAccountData) : null;
        const name = (accountData && accountData.firstName) ?
            `${accountData.firstName} ${accountData.lastName || ''}` :
            (currentUser.user_metadata?.full_name || currentUser.name || 'User');

        const avatarUrl = window.AuthUI.generateGradientAvatarDataUrl(name);
        profileImg.src = avatarUrl;
        profileImg.style.display = 'block';
        placeholder.style.display = 'none';

        // Also update navbar icon
        const navImg = document.getElementById('profileIconImg');
        if (navImg) navImg.src = avatarUrl;
    }
}

// ========================================
// ORDER MANAGEMENT
// ========================================

async function loadOrders() {
    // 1. Get orders from OrderManager (Local Storage v2)
    if (window.OrderManager) {
        orders = window.OrderManager.getOrders();
    } else {
        // Fallback or Legacy
        const storedOrders = localStorage.getItem('ember_orders_v2') || localStorage.getItem('be_orders');
        orders = storedOrders ? JSON.parse(storedOrders) : [];
    }

    // Remove mock data generation - use only real data
    if (orders.length === 0) {
        console.log('No orders found for user');
    }

    // Render components with real data
    await renderDashboardStats();
    renderRecentOrders();
    renderAllOrders();

    // Log the actual order count for debugging
    console.log(`Total orders loaded: ${orders.length}`);

    // Deep Linking Check
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    if (orderId) {
        // Remove hash if present in ID from URL
        const cleanId = orderId.replace('#', '');

        // Find order (loose match for has/no-hash)
        const targetOrder = orders.find(o => o.id === orderId || o.id === '#' + cleanId || o.id === cleanId);

        if (targetOrder) {
            // Scroll to orders section
            const ordersTabBtn = document.querySelector('[data-tab="orders"]');
            if (ordersTabBtn) ordersTabBtn.click();

            // Open Details
            viewOrderDetails(targetOrder.id);

            // Smooth scroll
            setTimeout(() => {
                document.getElementById('orderDetailsView').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
}

async function renderDashboardStats() {
    // Always use OrderManager to get the actual total orders count
    let totalOrders = 0;
    if (window.OrderManager) {
        const allOrders = window.OrderManager.getOrders();
        totalOrders = allOrders.length;
    } else {
        // Fallback to loaded orders if OrderManager not available
        totalOrders = orders.length;
    }

    // Get other statistics from database or use defaults
    const stats = window.DB ? window.DB.getDashboardStats() : {
        totalReviews: 0,
        totalWishlist: 0,
        totalSpent: 0
    };

    // Override totalOrders with actual count from OrderManager
    stats.totalOrders = totalOrders;

    // Update dashboard statistics with real data
    const totalOrdersElement = document.getElementById('statTotalOrders');
    const totalReviewsElement = document.getElementById('statReviews');
    const totalWishlistElement = document.getElementById('statWishlist');
    const totalSpentElement = document.getElementById('statTotalSpent');

    if (totalOrdersElement) totalOrdersElement.textContent = stats.totalOrders;
    if (totalReviewsElement) totalReviewsElement.textContent = stats.totalReviews;
    if (totalWishlistElement) totalWishlistElement.textContent = stats.totalWishlist;
    if (totalSpentElement) totalSpentElement.textContent = `$${stats.totalSpent.toFixed(2)}`;

    console.log('Dashboard stats loaded:', stats);
}

// Update wishlist count dynamically when wishlist changes
function updateWishlistCount() {
    const totalWishlistElement = document.getElementById('statWishlist');
    if (!totalWishlistElement) return;
    
    let wishlistCount = 0;
    
    // First try CartManager's wishlist system
    if (window.CartManager && window.CartManager.wishlist) {
        wishlistCount = window.CartManager.wishlist.length;
        console.log('Wishlist count from CartManager:', wishlistCount);
    } else {
        // Fallback to localStorage 'Blue EmberWishlist'
        try {
            const savedWishlist = localStorage.getItem('Blue EmberWishlist');
            if (savedWishlist) {
                const wishlist = JSON.parse(savedWishlist);
                wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;
            }
        } catch (error) {
            console.warn('Failed to load wishlist from localStorage:', error);
        }
    }
    
    totalWishlistElement.textContent = wishlistCount;
    console.log('Wishlist count updated:', wishlistCount);
}

// Listen for wishlist changes from CartManager
function initializeWishlistListener() {
    // Update wishlist count when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(updateWishlistCount, 100);
        });
    } else {
        setTimeout(updateWishlistCount, 100);
    }
    
    // Listen for custom wishlist update events
    document.addEventListener('wishlistUpdated', () => {
        updateWishlistCount();
    });
    
    // Also listen for storage events (in case wishlist changes in another tab)
    window.addEventListener('storage', (e) => {
        if (e.key === 'Blue EmberWishlist') {
            updateWishlistCount();
        }
    });
}

// Initialize wishlist listener when profile page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeWishlistListener();
});

function renderRecentOrders() {
    const tbody = document.getElementById('recentOrdersBody');
    if (!tbody) return;

    // Show top 3
    const recent = orders.slice(0, 3);

    if (recent.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #64748b;">No recent orders found.</td></tr>';
        return;
    }

    tbody.innerHTML = recent.map(order => {
        const currentStatus = calculateOrderStatus(order);
        const formattedDate = formatOrderDate(order.created_at || order.date);

        return `
        <tr>
            <td><span style="font-weight: 600; color: #0099ff;">#${order.id}</span></td>
            <td>${formattedDate}</td>
            <td>${getStatusBadge(currentStatus)}</td>
            <td style="font-weight: 500;">$${(order.total || 0).toFixed(2)}</td>
            <td><button class="btn btn-outline" style="padding: 6px 12px; font-size: 13px;" onclick="viewOrderDetails('${order.id}')">View</button></td>
        </tr>
        `;
    }).join('');
}

function renderAllOrders(filter = 'all') {
    const tbody = document.getElementById('allOrdersBody');
    if (!tbody) return;

    let filteredOrders = orders;
    if (filter === 'active') {
        filteredOrders = orders.filter(o => {
            const status = calculateOrderStatus(o);
            return ['Processing', 'Shipped'].includes(status);
        });
    } else if (filter === 'completed') {
        filteredOrders = orders.filter(o => calculateOrderStatus(o) === 'Delivered');
    } else if (filter === 'cancelled') {
        filteredOrders = orders.filter(o => calculateOrderStatus(o) === 'Cancelled');
    }

    if (filteredOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px; color: #64748b;">No orders found.</td></tr>';
        return;
    }

    tbody.innerHTML = filteredOrders.map(order => {
        const currentStatus = calculateOrderStatus(order);
        const formattedDate = formatOrderDate(order.created_at || order.date);
        const itemCount = order.items ? order.items.length : 0;

        return `
        <tr>
            <td><span style="font-weight: 600; color: #0099ff;">#${order.id}</span></td>
            <td>${formattedDate}</td>
            <td style="color: #64748b; font-size: 13px;">${itemCount} item(s)</td>
            <td>${getStatusBadge(currentStatus)}</td>
            <td style="font-weight: 500;">$${(order.total || 0).toFixed(2)}</td>
            <td><button class="btn btn-primary" style="padding: 6px 15px; font-size: 13px;" onclick="viewOrderDetails('${order.id}')">View Details</button></td>
        </tr>
        `;
    }).join('');
}

// ========================================
// HELPER FUNCTIONS
// ========================================

// Format date string to readable format
function formatOrderDate(dateString) {
    if (!dateString) return "n/a";

    // Handle both ISO strings and already formatted dates
    if (dateString.includes('T')) {
        // ISO string
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // Already formatted date string
    return dateString;
}

// Calculate accurate order status
function calculateOrderStatus(order) {
    // OrderManager stores status explicitly
    if (order.status) return order.status;
    return 'Processing';
}

// Generate realistic order timeline with timestamps
function generateOrderTimeline(order) {
    const createdAt = new Date(order.created_at || order.date);
    const status = calculateOrderStatus(order);

    const timeline = [
        {
            step: 'Order Placed',
            timestamp: createdAt,
            completed: true
        },
        {
            step: 'Processing',
            timestamp: new Date(createdAt.getTime() + 24 * 60 * 60 * 1000), // +1 day
            completed: true
        },
        {
            step: 'Shipped',
            timestamp: new Date(createdAt.getTime() + 3 * 24 * 60 * 60 * 1000), // +3 days
            completed: ['Shipped', 'Delivered'].includes(status)
        },
        {
            step: 'Delivered',
            timestamp: new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 days
            completed: status === 'Delivered'
        }
    ];

    return timeline;
}

function getStatusBadge(status) {
    let className = 'status-processing'; // default
    if (status === 'Delivered') className = 'status-delivered';
    if (status === 'Cancelled') className = 'status-cancelled';
    if (status === 'Shipped') className = 'status-shipped';

    return `<span class="status-badge ${className}">${status}</span>`;
}

// ========================================
// ORDER DETAILS & TABS
// ========================================

function initializeProfileTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Filter listener
    const filterSelect = document.getElementById('orderFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            renderAllOrders(e.target.value);
        });
    }
}

function switchTab(tabId) {
    // Hide details view if open
    document.getElementById('orderDetailsView').style.display = 'none';

    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) btn.classList.add('active');
    });

    // Update content
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    const targetPane = document.getElementById(`${tabId}-tab`);
    if (targetPane) targetPane.classList.add('active');
}

function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    // Switch to orders tab context visually
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.getElementById('orderDetailsView').style.display = 'block';

    // Calculate current status and format date
    const currentStatus = calculateOrderStatus(order);
    const formattedDate = formatOrderDate(order.created_at || order.date);

    // Populate Data with real data
    const orderIdElement = document.getElementById('detailOrderId');
    const orderDateElement = document.getElementById('detailOrderDate');
    const orderStatusElement = document.getElementById('detailOrderStatus');
    const orderTotalElement = document.getElementById('detailOrderTotal');
    const shippingAddrElement = document.getElementById('detailShippingAddr');
    const paymentElement = document.getElementById('detailPayment');
    const subtotalElement = document.getElementById('detailSubtotal');
    const finalTotalElement = document.getElementById('detailFinalTotal');

    if (orderIdElement) orderIdElement.textContent = `Order #${order.id} `;
    if (orderDateElement) orderDateElement.textContent = formattedDate;
    if (orderStatusElement) {
        orderStatusElement.textContent = currentStatus;
        orderStatusElement.className = `status-badge ${currentStatus === 'Delivered' ? 'status-delivered' :
            currentStatus === 'Cancelled' ? 'status-cancelled' :
                currentStatus === 'Shipped' ? 'status-shipped' : 'status-processing'
            }`;
    }
    if (orderTotalElement) orderTotalElement.textContent = `$${(order.total || 0).toFixed(2)} `;
    if (shippingAddrElement && order.shipping) {
        shippingAddrElement.textContent = `${order.shipping.street}, ${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip} `;
    }
    if (paymentElement) paymentElement.textContent = order.payment || `${time}`;

    // Calculations
    const subtotal = order.total || 0;
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)} `;
    if (finalTotalElement) finalTotalElement.textContent = `$${subtotal.toFixed(2)} `;

    // Render Timeline with real timestamps
    const timelineContainer = document.querySelector('.order-timeline');
    if (timelineContainer) {
        renderTimeline(timelineContainer, order);
    }

    // Cancel Order Button (Only for Processing orders < 24h)
    const buttonContainer = document.getElementById('orderActionsContainer') || createActionContainer(document.getElementById('detailOrderStatus').parentNode);

    // Check eligibility
    const isProcessing = order.status === 'Processing';

    if (isProcessing && !order.isCancelled) {
        buttonContainer.innerHTML = `
            <button onclick="handleCancelOrder('${order.id}')" class="btn btn-danger" style="background: #ef4444; color: white; border: none; padding: 10px 20px; border-radius: 8px; margin-top: 20px; cursor: pointer;">
                Cancel Order
            </button>
            <p style="font-size: 12px; color: #666; margin-top: 5px;">*Orders can only be cancelled within 24 hours.</p>
        `;
    } else if (order.isCancelled) {
        buttonContainer.innerHTML = `<p style="color: #dc2626; font-weight: bold; margin-top: 15px;">Order Cancelled</p>`;
    } else {
        buttonContainer.innerHTML = '';
    }

    // Render Items
    const itemsContainer = document.getElementById('detailItemsList');
    if (itemsContainer && order.items) {
        itemsContainer.innerHTML = order.items.map(item => `
        <div style="display: flex; gap: 15px; border: 1px solid #7d7d7d; padding: 15px; border-radius: 12px; margin-bottom: 10px;">
            <div style="width: 60px; height: 60px; background: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                ${item.image ? `<img src="${item.image}" style="width:100%; height:100%; object-fit:contain;">` : '<i class="bx bx-package" style="font-size: 24px; color: #94a3b8;"></i>'}
            </div>
            <div style="flex: 1;">
                <h4 style="margin: 0 0 5px 0; font-size: 15px;">${item.name}</h4>
                <p style="margin: 0; color: #64748b; font-size: 13px;">Qty: ${item.quantity}</p>
            </div>
            <div style="font-weight: 600;">$${(item.price || 0).toFixed(2)}</div>
        </div>
        `).join('');
    }
}

function createActionContainer(parent) {
    const div = document.createElement('div');
    div.id = 'orderActionsContainer';
    // Append after the status badge or somewhere appropriate
    parent.appendChild(div);
    return div;
}

// Global handler for cancellation
window.handleCancelOrder = function (orderId) {
    if (confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
        if (window.OrderManager) {
            const success = window.OrderManager.cancelOrder(orderId);
            if (success) {
                // Refresh view
                loadOrders();
                // Stay on details view but update it
                setTimeout(() => viewOrderDetails(orderId), 100);
            } else {
                alert('Could not cancel order. It may be too late or already processed.');
            }
        }
    }
};

function closeOrderDetails() {
    document.getElementById('orderDetailsView').style.display = 'none';
    // Go back to orders tab
    switchTab('orders');
}

// Generate visual order timeline
function renderTimeline(container, order) {
    const steps = [
        { status: 'Processing', icon: 'bx-loader-circle', label: 'Processing' },
        { status: 'Packed', icon: 'bx-package', label: 'Packed' },
        { status: 'Shipped', icon: 'bx-truck', label: 'Shipped' },
        { status: 'Delivered', icon: 'bx-check-circle', label: 'Delivered' }
    ];

    const currentStatusIndex = steps.findIndex(s => s.status === order.status);
    const isCancelled = order.status === 'Cancelled';

    // Calculate progress bar width
    // If cancelled, show 0 or full red? Let's show 0 green.
    let progressPercent = 0;
    if (!isCancelled && currentStatusIndex >= 0) {
        progressPercent = (currentStatusIndex / (steps.length - 1)) * 100;
    }

    let html = `
    <div style="margin: 30px 0; position: relative; padding: 0 10px;">
        <!-- Progress Bar Background -->
        <div style="position: absolute; top: 15px; left: 30px; right: 30px; height: 4px; background: #e2e8f0; z-index: 0; border-radius: 2px;"></div>
        
        <!-- Active Progress Bar -->
        <div style="position: absolute; top: 15px; left: 30px; width: calc(${Math.max(0, progressPercent)}% - ${(60 * progressPercent / 100)}px); max-width: calc(100% - 60px); height: 4px; background: ${isCancelled ? '#ef4444' : '#0099ff'}; z-index: 0; border-radius: 2px; transition: width 1s ease;"></div>

        <div style="display: flex; justify-content: space-between; position: relative; z-index: 1;">
    `;

    steps.forEach((step, index) => {
        // Logic: Step is active if we passed it or are on it.
        const isActive = index <= currentStatusIndex && !isCancelled;
        const isCurrent = index === currentStatusIndex && !isCancelled;

        let color = isActive ? '#0099ff' : '#cbd5e1';
        let bgColor = isActive ? (isCurrent ? '#0099ff' : 'white') : 'white';
        let iconColor = isActive ? (isCurrent ? 'white' : '#0099ff') : '#94a3b8';
        let borderColor = isActive ? '#0099ff' : '#e2e8f0';
        let textColor = isActive ? '#1e293b' : '#94a3b8';

        // Override for Cancelled
        if (isCancelled) {
            // For cancelled, maybe show first step as red?
            if (index === 0) {
                borderColor = '#ef4444';
                iconColor = '#ef4444';
                textColor = '#ef4444';
            }
        }

        html += `
            <div style="display: flex; flex-direction: column; align-items: center; width: 60px;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: ${bgColor}; border: 2px solid ${borderColor}; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; transition: all 0.3s; box-shadow: ${isCurrent ? '0 0 0 4px rgba(0, 153, 255, 0.2)' : 'none'};">
                    <i class='bx ${step.icon}' style="color: ${iconColor}; font-size: 16px;"></i>
                </div>
                <span style="font-size: 11px; font-weight: 600; color: ${textColor};">${step.label}</span>
            </div>
        `;
    });

    html += `</div></div>`;

    // Add Latest Update Text
    const time = new Date(order.lastUpdated || order.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    let statusMsg = `Latest Update: ${order.status}`;
    if (isCancelled) statusMsg = `Order Cancelled`;
    else if (order.status === 'Processing') statusMsg = 'Order placed and under processing';
    else if (order.status === 'Packed') statusMsg = 'Order packed and ready for dispatch';
    else if (order.status === 'Shipped') statusMsg = 'Order is on the way';
    else if (order.status === 'Delivered') statusMsg = 'Order successfully delivered';

    html += `
        <div style="text-align: center;margin-top: 20px;font-size: 13px;color: #505c6e;padding: 12px;border-radius: 14px;border: 1px solid #7d7d7d;display:flex;align-items:center;gap:8px;width: fit-content;place-self: center;">
            <i class='bx bx-box-alt' style="color:#64748b"></i> 
            <span><strong>${statusMsg}</strong> <span style="color:#94a3b8">• ${time}</span></span>
        </div>
    `;

    container.innerHTML = html;
}

function checkLoginStatus() {
    // Basic check - for demo purposes, create a mock user if none exists
    let user = localStorage.getItem('be_current_user');
    if (!user) {
        // Create a demo user for testing
        const demoUser = {
            id: 'demo_user_123',
            email: 'demo@example.com',
            user_metadata: { full_name: 'Demo User' }
        };
        localStorage.setItem('be_current_user', JSON.stringify(demoUser));
        localStorage.setItem('be_session', JSON.stringify(demoUser));
        user = JSON.stringify(demoUser);
    }

    // Update currentUser
    currentUser = JSON.parse(user);
}

// ========================================
// PROFILE IMAGE MODAL
// ========================================

let imageScale = 1;
let translateX = 0;
let translateY = 0;
let initialDistance = 0;
let lastScale = 1;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let initialTranslateX = 0;
let initialTranslateY = 0;

function initializeProfileModal() {
    const profilePicContainer = document.querySelector('.profile-pic-container');
    const modalOverlay = document.getElementById('profileModalOverlay');
    const modal = document.getElementById('profileImageModal');
    const modalImage = document.getElementById('profileModalImage');
    const closeBtn = document.getElementById('profileModalCloseBtn');

    if (!profilePicContainer || !modalOverlay || !modal || !modalImage) return;

    // Open modal on click
    profilePicContainer.addEventListener('click', () => {
        const profileImg = document.getElementById('dashboardProfilePic');
        if (profileImg && profileImg.src && profileImg.style.display !== 'none') {
            modalImage.src = profileImg.src;
            imageScale = 1;
            translateX = 0;
            translateY = 0;
            updateImageTransform();
            modalImage.style.transformOrigin = 'center center';
            openProfileModal();
        }
    });

    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeProfileModal);

    // Close modal on modal window click (but not on image)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProfileModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeProfileModal();
        }
    });

    // Close modal on close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProfileModal);
    }

    // Zoom functionality
    // Mouse wheel zoom
    modalImage.addEventListener('wheel', (e) => {
        e.preventDefault();
        const rect = modalImage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        modalImage.style.transformOrigin = `${x}% ${y}%`;

        const delta = e.deltaY > 0 ? -0.10 : 0.10;
        imageScale = Math.max(imageScale + delta, 0.1);
        clampTranslate();
        updateImageTransform();
    });

    // Touch and mouse interactions
    let touches = [];
    modalImage.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            touches = Array.from(e.touches);
            initialDistance = getDistance(touches[0], touches[1]);
            lastScale = imageScale;
            isDragging = false; // Stop dragging if pinch starts
        } else if (e.touches.length === 1 && imageScale > 1) {
            e.preventDefault();
            isDragging = true;
            dragStartX = e.touches[0].clientX;
            dragStartY = e.touches[0].clientY;
            initialTranslateX = translateX;
            initialTranslateY = translateY;
        }
    });

    modalImage.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentTouches = Array.from(e.touches);
            const currentDistance = getDistance(currentTouches[0], currentTouches[1]);
            const scaleChange = currentDistance / initialDistance;
            const adjustedScaleChange = 1 + (scaleChange - 1) * 0.6;
            imageScale = Math.max(lastScale * adjustedScaleChange, 0.1);

            // Set transform origin to center of touches
            const centerX = (currentTouches[0].clientX + currentTouches[1].clientX) / 2;
            const centerY = (currentTouches[0].clientY + currentTouches[1].clientY) / 2;
            const rect = modalImage.getBoundingClientRect();
            const x = ((centerX - rect.left) / rect.width) * 100;
            const y = ((centerY - rect.top) / rect.height) * 100;
            modalImage.style.transformOrigin = `${x}% ${y}%`;

            clampTranslate();
            updateImageTransform();
        } else if (isDragging && e.touches.length === 1 && imageScale > 1) {
            e.preventDefault();
            const deltaX = (e.touches[0].clientX - dragStartX) * 0.6;
            const deltaY = (e.touches[0].clientY - dragStartY) * 0.6;
            translateX = initialTranslateX + deltaX;
            translateY = initialTranslateY + deltaY;
            clampTranslate();
            updateImageTransform();
        }
    });

    modalImage.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) {
            touches = [];
        }
        isDragging = false;
    });

    // Mouse drag
    modalImage.addEventListener('mousedown', (e) => {
        if (imageScale > 1) {
            e.preventDefault();
            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            initialTranslateX = translateX;
            initialTranslateY = translateY;
            modalImage.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && imageScale > 1) {
            e.preventDefault();
            const deltaX = (e.clientX - dragStartX) * 0.6;
            const deltaY = (e.clientY - dragStartY) * 0.6;
            translateX = initialTranslateX + deltaX;
            translateY = initialTranslateY + deltaY;
            clampTranslate();
            updateImageTransform();
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        modalImage.style.cursor = '';
    });
}

function updateImageTransform() {
    const modalImage = document.getElementById('profileModalImage');
    modalImage.style.transform = `scale(${imageScale}) translate(${translateX}px, ${translateY}px)`;
}

function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function clampTranslate() {
    if (imageScale <= 1) {
        translateX = 0;
        translateY = 0;
        return;
    }
    const modal = document.getElementById('profileImageModal');
    const rect = modal.getBoundingClientRect();
    const maxX = (imageScale - 1) * rect.width / 2;
    const maxY = (imageScale - 1) * rect.height / 2;
    translateX = Math.max(-maxX, Math.min(maxX, translateX));
    translateY = Math.max(-maxY, Math.min(maxY, translateY));
}

function openProfileModal() {
    const modalOverlay = document.getElementById('profileModalOverlay');
    const modal = document.getElementById('profileImageModal');
    const closeBtn = document.getElementById('profileModalCloseBtn');

    modalOverlay.classList.add('show');
    modal.classList.add('show');
    modalOverlay.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (closeBtn) closeBtn.style.display = 'flex';
}

function closeProfileModal() {
    const modalOverlay = document.getElementById('profileModalOverlay');
    const modal = document.getElementById('profileImageModal');
    const closeBtn = document.getElementById('profileModalCloseBtn');

    modalOverlay.classList.remove('show');
    modal.classList.remove('show');
    modalOverlay.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (closeBtn) closeBtn.style.display = 'none';
}



