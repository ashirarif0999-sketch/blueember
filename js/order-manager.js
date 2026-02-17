/**
 * OrderManager - Handles real-time order status simulation and notifications
 */

const OrderManager = (() => {
    const STORAGE_KEY = 'blue_ember_orders';

    // Status Enum
    const STATUS = {
        PROCESSING: 'Processing',
        PACKED: 'Packed',
        SHIPPED: 'Shipped',
        DELIVERED: 'Delivered',
        CANCELLED: 'Cancelled'
    };

    /**
     * Initialize OrderManager
     */
    notifyUI();
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
            notifyUI();
        }
    });

    /**
     * Create a new order
     * @param {Array} items - Cart items
     * @param {Number} total - Total amount
     * @param {Object} metadata - Optional shipping/payment info
     * @returns {Object} The created order
     */
    function createOrder(items, total, metadata = {}) {
        const orders = getOrders();
        // Use ID from metadata if available, otherwise generate
        const id = metadata.id || ('#' + Math.random().toString(36).substr(2, 6).toUpperCase());
        const now = Date.now();

        // Initial Notification Message
        const initialMessage = `Your order ${id} is currently under process.`;

        const newOrder = {
            id: id,
            items: items,
            total: total,
            timestamp: now,
            status: STATUS.PROCESSING,
            lastUpdated: now,
            isCancelled: false,
            shipping: metadata.shipping || {},
            payment: metadata.payment || 'N/A',
            notifications: [{
                id: Date.now().toString(),
                message: initialMessage,
                type: 'info',
                read: false,
                timestamp: now
            }]
        };

        orders.unshift(newOrder); // Add to beginning
        saveOrders(orders);

        // Trigger Toast
        if (typeof showToast === 'function') {
            showToast(`Order ${id} Placed Successfully!`, 'success');
        } else if (typeof showNotification === 'function') {
            // Fallback to checkout's showNotification if available
            showNotification(`Order ${id} Placed Successfully!`, 'success');
        }

        notifyUI();
        return newOrder;
    }

    /**
     * Get all orders
     * @returns {Array} List of orders
     */
    function getOrders() {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Get a specific order by ID
     * @param {String} id 
     */
    function getOrder(id) {
        return getOrders().find(o => o.id === id);
    }

    /**
     * Save orders to localStorage
     * @param {Array} orders 
     */
    function saveOrders(orders) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }

    /**
     * Cancel an order (only if within 24 hours)
     * @param {String} id 
     */
    function cancelOrder(id) {
        const orders = getOrders();
        const orderIndex = orders.findIndex(o => o.id === id);

        if (orderIndex === -1) return false;

        const order = orders[orderIndex];
        const now = Date.now();
        const hoursDiff = (now - order.timestamp) / (1000 * 60 * 60);

        if (hoursDiff <= 24 && order.status === STATUS.PROCESSING && !order.isCancelled) {
            order.status = STATUS.CANCELLED;
            order.isCancelled = true;
            order.lastUpdated = now;

            // Add cancellation notification
            order.notifications.push({
                id: Date.now().toString(),
                message: `Order ${id} has been cancelled.`,
                type: 'error',
                read: false,
                timestamp: now
            });

            saveOrders(orders);
            notifyUI();

            if (typeof showToast === 'function') showToast(`Order ${id} Cancelled`, 'success');
            return true;
        }
        return false;
    }

    /**
     * Main Simulation Logic
     * Checks time elapsed and updates status accordingly
     */
    function updateOrderStatuses() {
        const orders = getOrders();
        let changed = false;
        const now = Date.now();

        orders.forEach(order => {
            if (order.isCancelled || order.status === STATUS.DELIVERED) return;

            const hoursElapsed = (now - order.timestamp) / (1000 * 60 * 60);
            let newStatus = order.status;
            let message = '';

            // Status Logic & Strict Notification Messages
            if (hoursElapsed >= 72 && order.status !== STATUS.DELIVERED) {
                newStatus = STATUS.DELIVERED;
                message = `Your order ${order.id} is delivered successfully.`;
            } else if (hoursElapsed >= 48 && hoursElapsed < 72 && order.status !== STATUS.SHIPPED) {
                newStatus = STATUS.SHIPPED;
                message = `Your order ${order.id} has arrived in your country.`;
            } else if (hoursElapsed >= 24 && hoursElapsed < 48 && order.status !== STATUS.PACKED) {
                newStatus = STATUS.PACKED;
                message = `Your order ${order.id} is packed and ready to ship.`;
            }

            // If status changed, update and notify
            if (newStatus !== order.status) {
                order.status = newStatus;
                order.lastUpdated = now;

                // Add Notification
                order.notifications.push({
                    id: Date.now().toString(),
                    message: message,
                    type: 'success', // Could vary based on status if needed
                    read: false,
                    timestamp: now
                });

                changed = true;

                // Trigger visual feedback (System Toast)
                if (typeof showToast === 'function') {
                    showToast(message, 'info'); // 'info' keeps it neutral blue/clean
                }
            }
        });

        if (changed) {
            saveOrders(orders);
            notifyUI();
        }
    }

    /**
     * Collect all unread notifications from all orders
     */
    function getAllNotifications() {
        const orders = getOrders();
        let allNotifs = [];

        orders.forEach(order => {
            if (order.notifications) {
                // Attach orderId to notification for deep linking
                const orderNotifs = order.notifications.map(n => ({ ...n, orderId: order.id }));
                allNotifs = allNotifs.concat(orderNotifs);
            }
        });

        // Sort by newest first
        return allNotifs.sort((a, b) => b.timestamp - a.timestamp);
    }

    /**
     * Calculate unread count
     */
    function getUnreadCount() {
        const notifs = getAllNotifications();
        return notifs.filter(n => !n.read).length;
    }

    /**
     * Mark all notifications as read
     */
    function markAllAsRead() {
        const orders = getOrders();
        let changed = false;

        orders.forEach(order => {
            if (order.notifications) {
                order.notifications.forEach(n => {
                    if (!n.read) {
                        n.read = true;
                        changed = true;
                    }
                });
            }
        });

        if (changed) {
            saveOrders(orders);
            notifyUI();
        }
    }

    /**
     * Initialize OrderManager
     */
    function init() {
        // Check for Toast System
        if (typeof window.showToast !== 'function' && window.ToastManager) {
            window.showToast = window.ToastManager.show;
        }

        // Run update check immediately and then every 60 seconds
        updateOrderStatuses();
        setInterval(updateOrderStatuses, 60000);

        // Cross-tab synchronization
        window.addEventListener('storage', (e) => {
            if (e.key === STORAGE_KEY) {
                notifyUI();
            }
        });

        notifyUI(); // Initial UI update

        // Expose Fast Forward for debugging (Strictly for dev/testing)
        window.debugFastForward = (hours) => {
            const orders = getOrders();
            orders.forEach(o => {
                o.timestamp -= (hours * 60 * 60 * 1000);
            });
            saveOrders(orders);
            updateOrderStatuses();
            console.log(`Fast forwarded ${hours} hours`);
        };
    }

    /**
     * Update UI elements (Red Dots, Badges)
     */
    function notifyUI() {
        const count = getUnreadCount();
        const hasUnread = count > 0;

        // Elements to toggle red dot on
        const targetIds = ['emberSidebarToggle', 'chat-bubble-btn', 'chat-bubble-btn-two'];

        targetIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (hasUnread) {
                    el.classList.add('notification-dot');
                    // Ensure the badge content attribute is set for CSS content
                    el.setAttribute('data-count', count);
                } else {
                    el.classList.remove('notification-dot');
                    el.removeAttribute('data-count');
                }
            }
        });

        // Update Notification Badge Text inside sidebar (and anywhere else)
        const badgeSpans = document.querySelectorAll('.notification-badge');
        badgeSpans.forEach(span => {
            if (count > 0) {
                span.textContent = count;
                span.style.display = 'inline-block';
                span.style.background = '#ef4444';
                span.style.color = 'white';
                span.style.padding = '2px 8px';
                span.style.borderRadius = '12px';
                span.style.fontSize = '11px';
                span.style.marginLeft = '10px';
            } else {
                span.textContent = '';
                span.style.display = 'none';
            }
        });
    }

    // Public API
    return {
        init,
        createOrder,
        getOrders,
        getOrder,
        cancelOrder,
        updateOrderStatuses,
        getAllNotifications,
        getUnreadCount,
        markAllAsRead,
        STATUS
    };
})();

// Expose to window for checkout.js and other scripts
window.OrderManager = OrderManager;

// Initialize on page load
document.addEventListener('DOMContentLoaded', OrderManager.init);
