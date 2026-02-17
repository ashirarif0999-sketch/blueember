/**
 * Checkout Module
 * Handles checkout-specific functionality including form validation, step management, and order processing
 */

class CheckoutManager {
  constructor() {
    this.cart = [];
    this.shippingMethod = 'standard';
    this.paymentMethod = 'credit-card';
    this.currentStep = 1;
    this.init();
  }

  init() {
    this.cacheDOM();
    this.loadCart();
    this.bindEvents();
    this.updateCartDisplay();
    this.showStep(1);
  }

  cacheDOM() {
    this.elements = {
      // Cart elements
      cartCounter: document.getElementById('cart-count'),
      mobileCartCount: document.getElementById('mobile-cart-count'),

      // Order summary elements
      orderItemsContainer: document.getElementById('order-items-container'),
      orderSubtotal: document.getElementById('order-subtotal'),
      orderShipping: document.getElementById('order-shipping'),
      orderTax: document.getElementById('order-tax'),
      orderTotal: document.getElementById('order-total'),

      // Form elements
      proceedToPayment: document.getElementById('proceed-to-payment'),
      placeOrder: document.getElementById('place-order'),

      // Confirmation elements
      confirmationItemsContainer: document.getElementById('confirmation-items-container'),
      confirmationSubtotal: document.getElementById('confirmation-subtotal'),
      confirmationShipping: document.getElementById('confirmation-shipping'),
      confirmationTax: document.getElementById('confirmation-tax'),
      confirmationTotal: document.getElementById('confirmation-total'),
      continueShopping: document.getElementById('continue-shopping'),
      viewOrderDetails: document.getElementById('view-order-details'),

      // Mobile menu elements
      hamburger: document.getElementById('hamburger'),
      mobileMenu: document.getElementById('mobileMenu'),
      closeBtn: document.getElementById('closeBtn')
    };
  }

  bindEvents() {
    // Proceed to Payment
    if (this.elements.proceedToPayment) {
      this.elements.proceedToPayment.addEventListener('click', () => {
        this.handleProceedToPayment();
      });
    }

    // Payment method selection
    document.querySelectorAll('.payment-card').forEach(method => {
      method.addEventListener('click', () => {
        this.handlePaymentMethodSelection(method);
      });
    });

    // Place Order
    if (this.elements.placeOrder) {
      this.elements.placeOrder.addEventListener('click', () => {
        this.handlePlaceOrder();
      });
    }

    // Back to Shipping (Premium Checkout)
    const backBtn = document.querySelector('.back-to-shipping');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.showStep(1);
      });
    }

    // Continue Shopping
    if (this.elements.continueShopping) {
      this.elements.continueShopping.addEventListener('click', () => {
        // Clear cart synchronously before navigation
        this.clearCartCompletely();
        window.location.href = 'product2.html';
      });
    }

    // View Order Details
    if (this.elements.viewOrderDetails) {
      this.elements.viewOrderDetails.addEventListener('click', () => {
        showNotification('Order details would be displayed here.', 'info');
      });
    }

    // Mobile menu functionality
    this.bindMobileMenuEvents();

    // Load Saved Addresses (Custom Addition)
    this.loadSavedAddresses();
  }

  async loadSavedAddresses() {
    console.log('🔍 [Checkout] loadSavedAddresses called');
    // Use same scoping logic as account-settings.js
    let SCOPED_SUFFIX = '';
    let userData = null;

    try {
      if (window.DB) {
        console.log('✅ [Checkout] window.DB exists, fetching user...');
        const { data: { user } } = await window.DB.getUser();
        console.log('👤 [Checkout] User data:', user);
        if (user?.id) {
          SCOPED_SUFFIX = '_' + user.id;
          userData = user;
          console.log('✅ [Checkout] User ID found:', user.id, 'Suffix:', SCOPED_SUFFIX);
        } else {
          console.warn('⚠️ [Checkout] No user.id found in DB.getUser()');
        }
      } else {
        console.log('⚠️ [Checkout] window.DB not available, using be_current_user');
        const u = JSON.parse(localStorage.getItem('be_current_user') || '{}');
        console.log('👤 [Checkout] Current user from localStorage:', u);
        if (u.id) {
          SCOPED_SUFFIX = '_' + u.id;
          userData = u;
          console.log('✅ [Checkout] User ID found:', u.id, 'Suffix:', SCOPED_SUFFIX);
        } else {
          console.warn('⚠️ [Checkout] No user.id in be_current_user');
        }
      }
    } catch (e) {
      console.error('❌ [Checkout] Failed to init user scope for addresses:', e);
    }

    console.log('📞 [Checkout] Calling autoFillContactInfo with suffix:', SCOPED_SUFFIX);
    // Auto-fill contact information from user data
    this.autoFillContactInfo(SCOPED_SUFFIX, userData);

    console.log('📍 [Checkout] Calling loadAddressesWithScope with suffix:', SCOPED_SUFFIX);
    // Load and display addresses
    this.loadAddressesWithScope(SCOPED_SUFFIX);
  }

  autoFillContactInfo(suffix, userData) {
    // Load account data from localStorage
    const accountData = JSON.parse(localStorage.getItem('be_account_data' + suffix) || '{}');
    const phoneNumber = localStorage.getItem('be_phone_number' + suffix) || '';

    // Auto-fill Full Name
    const fullNameField = document.getElementById('fullName');
    if (fullNameField && accountData.firstName && accountData.lastName) {
      fullNameField.value = `${accountData.firstName} ${accountData.lastName}`;
    }

    // Auto-fill Email
    const emailField = document.getElementById('email');
    if (emailField && userData?.email) {
      emailField.value = userData.email;
    }

    // Auto-fill Phone Number
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneNumber) {
      phoneField.value = phoneNumber;
    }
  }

  loadAddressesWithScope(suffix) {
    console.log('🏠 [Checkout] loadAddressesWithScope called with suffix:', suffix);
    const storageKey = 'be_addresses' + suffix;
    console.log('🔑 [Checkout] Looking for addresses in localStorage key:', storageKey);

    const addresses = JSON.parse(localStorage.getItem(storageKey) || '[]');
    console.log('📦 [Checkout] Addresses found:', addresses.length, addresses);

    const sidebar = document.querySelector('.checkout-sidebar');
    if (!sidebar) {
      console.error('❌ [Checkout] Sidebar (.checkout-sidebar) not found!');
      return;
    }
    console.log('✅ [Checkout] Sidebar element found');

    // Remove existing display if present
    const existing = document.querySelector('.saved-addresses-display');
    if (existing) {
      console.log('🗑️ [Checkout] Removing existing address display');
      existing.remove();
    }

    if (addresses.length === 0) {
      console.log('📭 [Checkout] No addresses found - showing "create address" message');
      // Show "No addresses" message with redirect button
      const noAddressDiv = document.createElement('div');
      noAddressDiv.className = 'saved-addresses-display checkout-section glass-card';
      noAddressDiv.style.cssText = 'margin-top: 24px; text-align: center; padding: 2rem 1.5rem;';
      noAddressDiv.innerHTML = `
        <div style="color:#64748b; margin-bottom: 1.5rem;">
          <i class="fas fa-map-marker-alt" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem;"></i>
          <p style="font-size: 1rem; margin-bottom: 0.5rem;">There are no saved addresses</p>
          <p style="font-size: 0.9rem;">Want to create one?</p>
        </div>
        <a href="account.html?tab=addresses" class="btn btn-primary" style="padding: 10px 20px; border-radius: 8px; text-decoration: none;">
          <i class="fas fa-plus"></i> Create Address
        </a>
      `;

      // Insert after the existing glass-card (Order Summary)
      const existingCard = sidebar.querySelector('.glass-card');
      if (existingCard) {
        existingCard.insertAdjacentElement('afterend', noAddressDiv);
      } else {
        sidebar.appendChild(noAddressDiv);
      }
    } else {
      console.log('✅ [Checkout] Addresses exist - displaying', addresses.length, 'address(es)');
      // Display saved addresses
      const addressesDiv = document.createElement('div');
      addressesDiv.className = 'saved-addresses-display checkout-section glass-card';
      addressesDiv.style.marginTop = '24px';
      addressesDiv.innerHTML = `
        <h5 style="margin-bottom:15px; color:#1e293b; font-weight: 700;">Your Saved Addresses</h5>
        <div class="addresses-list" style="display:flex; flex-direction:column; gap:12px;">
          ${addresses.map((addr, idx) => `
            <div class="address-card" style="border:1px solid #e2e8f0; border-radius:12px; padding:15px; background:#f8fafc; transition: all 0.2s;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                <span style="font-weight:600; color:#1e293b; font-size: 15px;">${addr.label || 'Saved Address'}</span>
                <button class="btn btn-sm use-addr-btn" data-idx="${idx}" 
                  style="font-size:13px; padding: 6px 16px; background: #007bff; color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.2s;">
                  Select
                </button>
              </div>
              <div style="color:#64748b; font-size:13px; line-height: 1.6;">
                ${addr.street || ''}<br>
                ${addr.city || ''}${addr.state ? ', ' + addr.state : ''}${addr.zip ? ' ' + addr.zip : ''}<br>
                ${addr.country || ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;

      // Insert after the existing glass-card (Order Summary)
      const existingCard = sidebar.querySelector('.glass-card');
      if (existingCard) {
        existingCard.insertAdjacentElement('afterend', addressesDiv);
      } else {
        sidebar.appendChild(addressesDiv);
      }

      // Add CSS for hover effects
      const style = document.createElement('style');
      style.textContent = `
        .address-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
          border-color: #007bff !important;
        }
        .use-addr-btn:hover {
          background: #0069d9 !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
        }
      `;
      document.head.appendChild(style);

      // Add event listeners to "Select" buttons
      addressesDiv.querySelectorAll('.use-addr-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-idx');
          const addr = addresses[idx];

          // Fill the shipping address fields
          if (document.getElementById('address')) document.getElementById('address').value = addr.street;
          if (document.getElementById('city')) document.getElementById('city').value = addr.city;
          if (document.getElementById('state')) document.getElementById('state').value = addr.state;
          if (document.getElementById('zip')) document.getElementById('zip').value = addr.zip;

          // Show success notification
          showNotification('Address selected successfully!', 'success');

          // Highlight selected address temporarily
          const allCards = addressesDiv.querySelectorAll('.address-card');
          allCards.forEach(card => {
            card.style.border = '1px solid #e2e8f0';
          });
          e.target.closest('.address-card').style.border = '2px solid #007bff';
        });
      });

      // Pre-fill with first address by default
      if (addresses.length > 0) {
        const firstAddr = addresses[0];
        if (document.getElementById('address')) document.getElementById('address').value = firstAddr.street;
        if (document.getElementById('city')) document.getElementById('city').value = firstAddr.city;
        if (document.getElementById('state')) document.getElementById('state').value = firstAddr.state;
        if (document.getElementById('zip')) document.getElementById('zip').value = firstAddr.zip;

        // Highlight first address as selected
        setTimeout(() => {
          const firstCard = addressesDiv.querySelector('.address-card');
          if (firstCard) firstCard.style.border = '2px solid #007bff';
        }, 100);
      }
    }
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('Blue EmberCart');
      this.cart = saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Failed to load cart:', error);
      this.cart = [];
    }
  }

  updateCartDisplay() {
    const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);

    if (this.elements.cartCounter) {
      this.elements.cartCounter.textContent = totalItems;
    }
    if (this.elements.mobileCartCount) {
      this.elements.mobileCartCount.textContent = totalItems;
    }

    this.renderOrderSummary();
  }

  renderOrderSummary() {
    if (this.cart.length === 0) {
      if (this.elements.orderItemsContainer) {
        this.elements.orderItemsContainer.innerHTML = `
          <div class="text-center py-3">
            <p>Your cart is empty</p>
          </div>
        `;
      }
      this.updateTotalsDisplay(0, 0, 0, 0);
      return;
    }

    let orderHTML = '';
    let subtotal = 0;

    this.cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      orderHTML += `
        <div class="order-item-mini">
          <div class="order-img-wrapper">
             <img src="${this.getProductImage(item)}" alt="${item.name}">
          </div>
          <div class="order-info">
            <h5>${item.name}</h5>
            <div class="order-meta">$${item.price.toFixed(2)} x ${item.quantity}</div>
          </div>
          <div style="margin-left:auto; font-weight:600; font-size:0.9rem;">
            $${itemTotal.toFixed(2)}
          </div>
        </div>
      `;
    });

    if (this.elements.orderItemsContainer) {
      this.elements.orderItemsContainer.innerHTML = orderHTML;
    }

    const totals = this.calculateOrderTotals();
    this.updateTotalsDisplay(totals.subtotal, totals.shippingCost, totals.tax, totals.total);
  }

  calculateOrderTotals() {
    let subtotal = 0;

    this.cart.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const shippingCost = this.shippingMethod === 'standard' ? 5.99 : 12.99;
    const taxRate = 0.07;
    const tax = parseFloat((subtotal * taxRate).toFixed(2));
    const total = parseFloat((subtotal + shippingCost + tax).toFixed(2));

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      shippingCost: parseFloat(shippingCost.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    };
  }

  updateTotalsDisplay(subtotal, shippingCost, tax, total) {
    if (this.elements.orderSubtotal) {
      this.elements.orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }
    if (this.elements.orderShipping) {
      this.elements.orderShipping.textContent = `$${shippingCost.toFixed(2)}`;
    }
    if (this.elements.orderTax) {
      this.elements.orderTax.textContent = `$${tax.toFixed(2)}`;
    }
    if (this.elements.orderTotal) {
      this.elements.orderTotal.textContent = `$${total.toFixed(2)}`;
    }
  }

  getProductImage(item) {
    return item.image || 'https://via.placeholder.com/60x60?text=Product';
  }

  showStep(stepNumber) {
    // Hide all steps with null checking
    const shippingForm = document.getElementById('shipping-form');
    const paymentForm = document.getElementById('payment-form');
    const confirmationPage = document.getElementById('confirmation-page');

    if (shippingForm) shippingForm.style.display = 'none';
    if (paymentForm) paymentForm.style.display = 'none';
    if (confirmationPage) confirmationPage.style.display = 'none';

    // Update step indicators
    // Using .step-item to match premium-checkout.css
    const steps = document.querySelectorAll('.step-item');
    steps.forEach((step, index) => {
      // Logic: 
      // Current step = active
      // Previous steps = completed (optional, for styling)

      step.classList.remove('active', 'completed');

      if (index + 1 < stepNumber) {
        step.classList.add('completed');
      } else if (index + 1 === stepNumber) {
        step.classList.add('active');
      }

      // Removed inline style manipulation to let CSS handle colors
    });

    // Show the selected step
    if (stepNumber === 1) {
      if (shippingForm) shippingForm.style.display = 'block';
      // Fade in effect could be added here
    } else if (stepNumber === 2) {
      if (paymentForm) paymentForm.style.display = 'block';
    } else if (stepNumber === 3) {
      if (confirmationPage) confirmationPage.style.display = 'block';
      this.generateOrderConfirmation();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleProceedToPayment() {
    console.log('📌 [Checkout] handleProceedToPayment initiated');

    // Helper to validate and animate
    const validateField = (id) => {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        if (el) {
          el.classList.add('error');
          // Remove error class after animation completes
          setTimeout(() => el.classList.remove('error'), 500);
          el.focus();
        }
        return false;
      }
      return true;
    };

    // Validate shipping fields in order
    // Order matters for focus
    const fields = ['email', 'fullName', 'phone', 'address', 'city', 'state', 'zip'];
    let isValid = true;

    // Check all fields to highlight empty ones, but focus on the first error
    for (const field of fields) {
      if (!validateField(field)) {
        isValid = false;
        // potential break here if we want to stop at first error, 
        // but highlighting all is better UX usually. 
        // focus logic is simple: last one checked gets focus if we don't break.
        // let's break to focus the first missing field.
        break;
      }
    }

    if (!isValid) {
      showNotification('Please fill in all required fields.', 'error');
      console.warn('⚠️ [Checkout] Validation failed for shipping fields');
      return;
    }

    console.log('✅ [Checkout] Validation passed. Moving to payment step.');

    // Get shipping method (if we had radio buttons for it, currently implied standard)
    // this.shippingMethod = ... 

    // Update order summary with shipping method (if dynamic)
    this.renderOrderSummary();

    // Show payment step
    this.showStep(2);
  }

  handlePaymentMethodSelection(methodElement) {
    document.querySelectorAll('.payment-card').forEach(m => {
      m.classList.remove('selected');
    });
    methodElement.classList.add('selected');

    // Get method from onclick or data attribute. 
    // In new HTML we use onclick="selectPayment('type', this)" but for JS class we need data attribute or inference.
    // Let's assume we add data-method to the HTML or parse it.
    // The previous code used data-method. Let's ensure HTML has it.

    // Assuming HTML has data-method="credit-card" etc. 
    // If not, we need to add it to HTML.
    this.paymentMethod = methodElement.getAttribute('data-method') || 'credit-card';

    // Show appropriate inputs (Premium Checkout Layout)
    const creditCardInputs = document.getElementById('credit-card-inputs');
    const paypalInputs = document.getElementById('paypal-inputs');

    if (creditCardInputs && paypalInputs) {
      if (this.paymentMethod === 'credit-card') {
        creditCardInputs.style.display = 'block';
        paypalInputs.style.display = 'none';
      } else if (this.paymentMethod === 'paypal') {
        creditCardInputs.style.display = 'none';
        paypalInputs.style.display = 'block';
      } else {
        creditCardInputs.style.display = 'none';
        paypalInputs.style.display = 'none';
      }
    }
  }

  handlePlaceOrder() {
    console.log('📌 [Checkout] handlePlaceOrder initiated. Method:', this.paymentMethod);

    // Validate payment form based on selected method
    if (this.paymentMethod === 'credit-card') {
      const cardNumber = document.getElementById('card-number').value;
      const expiry = document.getElementById('expiry').value;
      const cvv = document.getElementById('cvv').value;

      if (!cardNumber || !expiry || !cvv) {
        showNotification('Please fill in all credit card information.', 'error');
        // Simple shake animation on empty fields
        if (!cardNumber) document.getElementById('card-number').classList.add('error');
        if (!expiry) document.getElementById('expiry').classList.add('error');
        if (!cvv) document.getElementById('cvv').classList.add('error');
        setTimeout(() => document.querySelectorAll('.form-input.error').forEach(el => el.classList.remove('error')), 500);
        return;
      }
    } else if (this.paymentMethod === 'paypal') {
      // Nothing to validate locally for PayPal mock
      // In real app, this would check if PayPal token exists
    }

    // Capture Order Data BEFORE clearing cart
    const orderData = this.createOrderFromCart();
    this.saveOrder(orderData);

    // Initialize Order Tracking & Notifications
    if (window.OrderManager) {
      // Pass full orderData to maintain shipping/payment info
      window.OrderManager.createOrder(orderData.items, orderData.total, orderData);
    }

    // ... rest of logic
    this.lastOrder = orderData;

    // Process the order
    this.showStep(3);

    // Clear the cart after successful order - Sync with CartManager
    this.cart = [];
    localStorage.setItem('Blue EmberCart', JSON.stringify(this.cart));
    
    // Also clear CartManager's cart if it exists
    if (window.CartManager) {
      window.CartManager.cart = [];
      window.CartManager.saveCart();
      window.CartManager.updateCartDisplay();
      // Dispatch event for other components to update
      document.dispatchEvent(new CustomEvent('cartCleared', { detail: { source: 'checkout' } }));
    }
    
    this.updateCartDisplay();
  }

  clearCartCompletely() {
    // Clear cart from all sources synchronously
    this.cart = [];
    localStorage.setItem('Blue EmberCart', '[]');
    
    // Also clear CartManager's cart if it exists
    if (window.CartManager) {
      window.CartManager.cart = [];
      localStorage.setItem('Blue EmberCart', '[]');
      window.CartManager.updateCartDisplay();
    }
    
    // Dispatch event for any other components
    document.dispatchEvent(new CustomEvent('cartCleared', { detail: { source: 'checkout-navigation' } }));
    
    console.log('Cart completely cleared before navigation');
  }

  createOrderFromCart() {
    const orderId = 'EV-' + Math.floor(1000 + Math.random() * 9000);
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const totals = this.calculateOrderTotals();

    // Get Shipping Info
    const street = document.getElementById('address') ? document.getElementById('address').value : '';
    const city = document.getElementById('city') ? document.getElementById('city').value : '';
    const state = document.getElementById('state') ? document.getElementById('state').value : '';
    const zip = document.getElementById('zip') ? document.getElementById('zip').value : '';

    // Get Payment Info string
    let paymentInfo = 'Pay on Delivery';
    if (this.paymentMethod === 'credit-card') {
      const cardNum = document.getElementById('card-number').value;
      paymentInfo = `Visa ending in ${cardNum.slice(-4)}`;
    } else if (this.paymentMethod === 'paypal') {
      paymentInfo = 'PayPal';
    }

    return {
      id: orderId,
      date: date,
      status: 'Processing',
      total: totals.total,
      items: this.cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      shipping: { street, city, state, zip },
      payment: paymentInfo
    };
  }

  async saveOrder(order) {
    if (window.DB) {
      const { data: { user } } = await window.DB.getUser();
      if (user) {
        // Use DB client to save with user_id
        window.DB.createOrder(order);
        return;
      }
    }

    // Fallback for guest / no-DB (Global LocalStorage)
    const existingOrders = JSON.parse(localStorage.getItem('be_orders') || '[]');
    existingOrders.unshift(order);
    localStorage.setItem('be_orders', JSON.stringify(existingOrders));
  }

  generateOrderConfirmation() {
    if (this.cart.length === 0) {
      if (this.elements.confirmationItemsContainer) {
        this.elements.confirmationItemsContainer.innerHTML = `
          <div class="text-center py-3">
            <p>No items in order</p>
          </div>
        `;
      }
      return;
    }

    let confirmationHTML = '';
    this.cart.forEach(item => {
      confirmationHTML += `
        <div class="order-item">
          <img src="${this.getProductImage(item)}" class="order-item-img" alt="${item.name}">
          <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            <div class="order-item-quantity">Qty: ${item.quantity}</div>
          </div>
        </div>
      `;
    });

    if (this.elements.confirmationItemsContainer) {
      this.elements.confirmationItemsContainer.innerHTML = confirmationHTML;
    }

    // Update confirmation page totals
    const totals = this.calculateOrderTotals();

    if (this.elements.confirmationSubtotal) {
      this.elements.confirmationSubtotal.textContent = `$${totals.subtotal.toFixed(2)}`;
    }
    if (this.elements.confirmationShipping) {
      this.elements.confirmationShipping.textContent = `$${totals.shippingCost.toFixed(2)}`;
    }
    if (this.elements.confirmationTax) {
      this.elements.confirmationTax.textContent = `$${totals.tax.toFixed(2)}`;
    }
    if (this.elements.confirmationTotal) {
      this.elements.confirmationTotal.textContent = `$${totals.total.toFixed(2)}`;
    }

    // Set order number
    if (this.lastOrder) {
      document.getElementById('order-number').textContent = this.lastOrder.id;
      document.getElementById('order-date').textContent = this.lastOrder.date;
    } else {
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      document.getElementById('order-number').textContent = orderNumber;

      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      document.getElementById('order-date').textContent = dateStr;
    }

    // Set estimated delivery
    const shippingDays = this.shippingMethod === 'standard' ? '5-7' : '2-3';
    document.getElementById('order-estimate').textContent = `${shippingDays} business days`;
  }

  bindMobileMenuEvents() {
    if (!this.elements.hamburger || !this.elements.mobileMenu || !this.elements.closeBtn) return;

    this.elements.hamburger.addEventListener('click', () => {
      this.elements.mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    this.elements.closeBtn.addEventListener('click', () => {
      this.elements.mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });

    this.elements.mobileMenu.addEventListener('click', (e) => {
      if (e.target === this.elements.mobileMenu) {
        this.elements.mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = toggle.nextElementSibling;
        const toggleIcon = toggle.querySelector('.toggle-icon');

        if (dropdown.style.display === 'block') {
          dropdown.style.display = 'none';
          if (toggleIcon) toggleIcon.textContent = '+';
        } else {
          dropdown.style.display = 'block';
          if (toggleIcon) toggleIcon.textContent = '-';
        }
      });
    });
  }
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" id="notificationCloseBtn">&times;</button>
    </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Add event listener for close button
  notification.querySelector('.notification-close').addEventListener('click', function () {
    this.parentElement.parentElement.remove();
  });

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);

  // Add CSS if not already present
  if (!document.getElementById('notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease;
      }
      .notification-success {
        background: linear-gradient(135deg, #d4edda, #c3e6cb);
        border-left: 4px solid #28a745;
      }
      .notification-error {
        background: linear-gradient(135deg, #f8d7da, #f5c6cb);
        border-left: 4px solid #dc3545;
      }
      .notification-info {
        background: linear-gradient(135deg, #d1ecf1, #bee5eb);
        border-left: 4px solid #17a2b8;
      }
      .notification-content {
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .notification-message {
        flex: 1;
        font-size: 14px;
        color: #333;
      }
      .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        margin-left: 10px;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .notification-close:hover {
        color: #333;
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(styles);
  }
}

// Initialize checkout when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const checkoutManager = new CheckoutManager();
  /* Search Bar Logic appended by Assistant */
  document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    // Only run if the search bar exists on this page
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', function (e) {
        // Prevent submission if input is empty
        if (!searchInput.value.trim()) {
          e.preventDefault();
          searchInput.focus();
        }
      });
    }
  });
});


