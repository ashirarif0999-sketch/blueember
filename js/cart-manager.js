/**
 * CartManager - Handles all cart operations
 */
class CartManager {
  constructor() {
    this.cart = [];
    this.wishlist = [];
    this.init();
  }

  init() {
    this.loadCart();
    this.loadWishlist();
    this.bindEvents();
    this.updateCartDisplay();
    this.updateWishlistDisplay();
    
    // Ensure cart is synced with localStorage on init (in case cart was cleared by another page)
    const savedCart = localStorage.getItem('Blue EmberCart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length === 0) {
          this.cart = [];
          this.updateCartDisplay();
        }
      } catch (e) {
        // Ignore parse errors
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

  saveCart() {
    try {
      localStorage.setItem('Blue EmberCart', JSON.stringify(this.cart));
    } catch (error) {
      console.warn('Failed to save cart:', error);
    }
  }

  loadWishlist() {
    try {
      const saved = localStorage.getItem('Blue EmberWishlist');
      this.wishlist = saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Failed to load wishlist:', error);
      this.wishlist = [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem('Blue EmberWishlist', JSON.stringify(this.wishlist));
    } catch (error) {
      console.warn('Failed to save wishlist:', error);
    }
  }

  bindEvents() {
    // Listen for cart cleared events from checkout
    document.addEventListener('cartCleared', (e) => {
      console.log('Cart cleared by:', e.detail?.source);
      // Clear in-memory cart
      this.cart = [];
      // Reload from localStorage to ensure consistency
      this.loadCart();
      this.saveCart();
      this.updateCartDisplay();
    });

    // Listen for storage events (sync across tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === 'Blue EmberCart') {
        this.loadCart();
        this.updateCartDisplay();
      }
    });

    // Bind add to cart buttons
    document.addEventListener('click', (e) => {
      // Add to cart
      if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
        e.preventDefault();
        const button = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
        this.addToCart(button);
      }

      // Wishlist toggle - support both .heart-container (SVG/Boxicons) and .wishlist-icon-container (FontAwesome)
      if (e.target.closest('.heart-container, .wishlist-icon-container')) {
        const container = e.target.closest('.heart-container, .wishlist-icon-container');

        // Skip if it's the main wishlist toggle button which also has this class
        if (container.id === 'wishlist-toggle') return;

        e.preventDefault();
        e.stopPropagation();

        const checkbox = container.querySelector('.checkbox');
        const heartIcon = container.querySelector('i'); // Get Boxicons or FontAwesome icon

        let isChecked;
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          isChecked = checkbox.checked;
        } else {
          // If no checkbox, determine state from icon or data attribute
          const isFull = heartIcon && (heartIcon.classList.contains('bxs-heart'));
          isChecked = !isFull;
        }

        this.toggleWishlist(container, isChecked);

        // Toggle icon class
        if (heartIcon) {
          if (isChecked) {
            // Boxicons
            heartIcon.classList.remove('bx-heart');
            heartIcon.classList.add('bxs-heart');

          } else {
            // Boxicons
            heartIcon.classList.remove('bxs-heart');
            heartIcon.classList.add('bx-heart');
            
          }
        }
      }
    });

    // Bind cart popup events
    this.bindCartPopupEvents();
    // Bind wishlist popup events
    this.bindWishlistEvents();
  }

  addToCart(button) {
    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = parseFloat(button.getAttribute('data-product-price'));
    const productImage = button.getAttribute('data-product-image');

    if (!productId || !productName || isNaN(productPrice)) {
      console.error('Invalid product data for add to cart');
      return;
    }

    // Check if item already exists in cart
    const existingItem = this.cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
      });
    }

    this.saveCart();
    this.updateCartDisplay();
    this.showCartNotification(productName);

    // Close modal if it's open
    this.closeProductModal();
  }

  updateCartDisplay() {
    // Update cart count
    const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
    const cartCounters = document.querySelectorAll('.cart-count');

    cartCounters.forEach(counter => {
      if (counter) {
        counter.textContent = totalItems;
      }
    });

    // Update cart popup content
    this.updateCartPopup();
  }

  updateCartPopup() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotal = document.getElementById('cart-total');
    const cartItemCount = document.getElementById('cart-item-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!cartItemsContainer || !cartTotal || !cartItemCount) return;

    if (this.cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-center py-3">Your cart is empty</p>';
      cartTotal.textContent = '$0.00';
      cartItemCount.textContent = '(0)';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    let total = 0;
    let itemCount = 0;

    cartItemsContainer.innerHTML = this.cart.map(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      itemCount += item.quantity;

      return `
        <div class="cart-item" data-product-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn minus" data-product-id="${item.id}"><i class='bx  bx-minus'></i></button>
              <input type="number" class="quantity" data-product-id="${item.id}" value="${item.quantity}" min="1" max="99" style="width: 50px; text-align: center; border: 1px solid #ddd; border-radius: 4px; padding: 2px 4px; overflow:hidden;">
              <button class="quantity-btn plus" data-product-id="${item.id}"><i class='bx  bx-plus'></i></button>
            </div>
          </div>
          <button class="cart-item-remove" data-product-id="${item.id}" style="padding: 55px 14px;font-size: x-large;background: #ff000014;border: none;color: #ff0977;cursor: pointer;border-radius: 12px;">
            <i class='bx  bx-trash-alt'></i>
          </button>
        </div>
      `;
    }).join('');

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartItemCount.textContent = `(${itemCount})`;
    if (checkoutBtn) checkoutBtn.disabled = false;

    // Bind quantity and remove buttons
    this.bindCartItemEvents();
  }

  bindCartItemEvents() {
    // Quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Use currentTarget instead of target to get the button, not the icon
        const button = e.currentTarget;
        const productId = button.getAttribute('data-product-id');
        const isPlus = button.classList.contains('plus');

        this.updateQuantity(productId, isPlus ? 1 : -1);
      });
    });

    // Direct quantity input editing
    document.querySelectorAll('.quantity').forEach(input => {
      input.addEventListener('change', (e) => {
        const input = e.currentTarget;
        const productId = input.getAttribute('data-product-id');
        let newQuantity = parseInt(input.value);

        // Validate quantity
        if (isNaN(newQuantity) || newQuantity < 1) {
          newQuantity = 1;
          input.value = 1;
        } else if (newQuantity > 99) {
          newQuantity = 99;
          input.value = 99;
        }

        this.setQuantity(productId, newQuantity);
      });

      // Handle Enter key press
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          input.blur(); // Trigger change event
        }
      });
    });

    // Remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.closest('.cart-item-remove').getAttribute('data-product-id');
        this.removeFromCart(productId);
      });
    });
  }

  updateQuantity(productId, change) {
    const item = this.cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.saveCart();
      this.updateCartDisplay();
    }
  }

  setQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity = quantity;
    this.saveCart();
    this.updateCartDisplay();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartDisplay();
  }

  bindCartPopupEvents() {
    // Watch for cart popup becoming active
    const cartPopup = document.getElementById('cart-popup');
    if (cartPopup) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (cartPopup.classList.contains('active')) {
              // Cart popup is now active, update the display
              setTimeout(() => this.updateCartDisplay(), 50);
            }
          }
        });
      });
      observer.observe(cartPopup, { attributes: true });
    }

    // Also bind to cart links as fallback
    const cartLinks = document.querySelectorAll('.cart-link, #mobile-cart-link');
    cartLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Let cart.js handle the popup, we'll update via the observer
      });
    });
  }

  showCartNotification(productName) {
    // Simple notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="cart-notification-content">
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Add styles if not present
    if (!document.getElementById('cart-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'cart-notification-styles';
      style.textContent = `
        .cart-notification {
          position: fixed;
          top: 100px;
          right: 20px;
          background: #10b981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          animation: slideInRight 0.3s ease;
        }
        .cart-notification-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  closeProductModal() {
    const modal = document.getElementById('productModal');
    const modalOverlay = document.getElementById('modalOverlay');

    if (modal && modalOverlay) {
      modalOverlay.classList.remove('show');
      modal.classList.remove('show');
      modal.style.display = 'none';
      modalOverlay.style.display = 'none';
    }
  }

  getCart() {
    return this.cart;
  }

  getTotalItems() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartDisplay();
  }

  // Wishlist Methods
  toggleWishlist(container, isChecked) {
    const productId = container.getAttribute('data-product-id');
    const productName = container.getAttribute('data-product-name');
    const productPrice = parseFloat(container.getAttribute('data-product-price'));
    const productImage = container.getAttribute('data-product-image');

    if (isChecked) {
      this.addToWishlist({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
      });
    } else {
      this.removeFromWishlist(productId);
    }
  }

  addToWishlist(product) {
    if (!this.wishlist.find(item => item.id === product.id)) {
      this.wishlist.push(product);
      this.saveWishlist();
      this.updateWishlistDisplay();
      this.showWishlistNotification(product.name, 'added');
      // Dispatch event for profile page wishlist counter sync
      document.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { action: 'added', count: this.wishlist.length } }));
    }
  }

  removeFromWishlist(productId) {
    const item = this.wishlist.find(item => item.id === productId);
    if (item) {
      this.wishlist = this.wishlist.filter(item => item.id !== productId);
      this.saveWishlist();
      this.updateWishlistDisplay();
      this.showWishlistNotification(item.name, 'removed');
      // Dispatch event for profile page wishlist counter sync
      document.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { action: 'removed', count: this.wishlist.length } }));

      // Update any heart icons if they exist on the page
      const containers = document.querySelectorAll(`.heart-container[data-product-id="${productId}"], .wishlist-icon-container[data-product-id="${productId}"]`);

      containers.forEach(container => {
        const cb = container.querySelector('.checkbox');
        if (cb) cb.checked = false;

        const icon = container.querySelector('i');
        if (icon) {
          icon.classList.remove('bxs-heart');
          icon.classList.add('bx-heart');
        }
      });
    }
  }

  updateWishlistDisplay() {
    // Update wishlist counters if they exist
    const wishlistCounters = document.querySelectorAll('.wishlist-count');
    wishlistCounters.forEach(counter => {
      counter.textContent = this.wishlist.length;
    });

    // Update wishlist popup content
    this.updateWishlistPopup();

    // sync heart icons on currently shown products
    this.syncHeartIcons();
  }

  syncHeartIcons() {
    // First, reset all heart icons on the page to regular state
    document.querySelectorAll('.heart-container i, .wishlist-icon-container i').forEach(icon => {
      icon.classList.remove('bxs-heart');
      icon.classList.add('bx-heart');
    });

    // Then, fill the ones that are in the wishlist
    this.wishlist.forEach(item => {
      const containers = document.querySelectorAll(`.heart-container[data-product-id="${item.id}"], .wishlist-icon-container[data-product-id="${item.id}"]`);
      containers.forEach(container => {
        const icon = container.querySelector('i');
        if (icon) {
          icon.classList.remove('bx-heart');
          icon.classList.add('bxs-heart');
        }
      });
    });
  }

  updateWishlistPopup() {
    const wishlistContainer = document.getElementById('wishlist-items-container');
    if (!wishlistContainer) return;

    if (this.wishlist.length === 0) {
      wishlistContainer.innerHTML = `
        <div class="wishlist-empty-state">
          <i class='bx bx-heart-circle'></i>
          <h4>Your wishlist is empty</h4>
          <p>Explore our products and tap the heart icon to save items you love.</p>
        </div>
      `;
      return;
    }

    wishlistContainer.innerHTML = this.wishlist.map(item => `
      <div class="wishlist-item" data-product-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="wishlist-item-img">
        <div class="wishlist-item-details">
          <h4 class="wishlist-item-name">${item.name}</h4>
          <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
          <div class="wishlist-item-actions">
            <button class="wishlist-add-to-cart" data-product-id="${item.id}">
              <i class='bx bx-cart-add'></i> Add to Cart
            </button>
          </div>
        </div>
        <button class="wishlist-item-remove" data-product-id="${item.id}" title="Remove from wishlist">
          <i class='bx bx-trash'></i>
        </button>
      </div>
    `).join('');

    // Bind events for the new wishlist items
    this.bindWishlistItemsEvents();
  }

  bindWishlistItemsEvents() {
    // Add to cart from wishlist
    document.querySelectorAll('.wishlist-add-to-cart').forEach(btn => {
      btn.onclick = (e) => {
        const productId = e.currentTarget.getAttribute('data-product-id');
        const product = this.wishlist.find(item => item.id === productId);
        if (product) {
          const existingCartItem = this.cart.find(item => item.id === productId);
          if (existingCartItem) {
            existingCartItem.quantity += 1;
          } else {
            this.cart.push({ ...product, quantity: 1 });
          }
          this.saveCart();
          this.updateCartDisplay();
          this.showCartNotification(product.name);

          // Add a subtle animation to the button
          e.currentTarget.innerHTML = "<i class='bx bx-check'></i> Added!";
          setTimeout(() => {
            e.currentTarget.innerHTML = "<i class='bx bx-cart-add'></i> Add to Cart";
          }, 2000);
        }
      };
    });

    // Remove from wishlist
    document.querySelectorAll('.wishlist-item-remove').forEach(btn => {
      btn.onclick = (e) => {
        const productId = e.currentTarget.getAttribute('data-product-id');
        this.removeFromWishlist(productId);
      };
    });
  }

  bindWishlistEvents() {
    const wishlistToggle = document.getElementById('wishlist-toggle');
    const wishlistPopup = document.getElementById('wishlist-popup');
    const wishlistClose = document.getElementById('wishlist-close');
    const wishlistOverlay = document.getElementById('wishlist-overlay');

    const openWishlist = (e) => {
      if (e) e.preventDefault();
      if (wishlistPopup) wishlistPopup.classList.add('active');
      if (wishlistOverlay) wishlistOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scroll
      this.updateWishlistDisplay();
    };

    const closeWishlist = () => {
      if (wishlistPopup) wishlistPopup.classList.remove('active');
      if (wishlistOverlay) wishlistOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
    };

    if (wishlistToggle) wishlistToggle.onclick = openWishlist;
    if (wishlistClose) wishlistClose.onclick = closeWishlist;
    if (wishlistOverlay) wishlistOverlay.onclick = closeWishlist;

    // Mobile sidebar wishlist link
    const mobileWishlistLink = document.getElementById('mobile-wishlist-link');
    if (mobileWishlistLink) mobileWishlistLink.onclick = openWishlist;
  }

  showWishlistNotification(productName, action) {
    const notification = document.createElement('div');
    notification.className = `wishlist-notification ${action}`;
    notification.style.cssText = `
      position: fixed;
      bottom: 110px;
      right: 30px;
      padding: 16px 24px;
      background: ${action === 'added' ? '#1a1a1a' : '#444'};
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      zoom: 70%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transform: translateX(120%);
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      border-left: 4px solid ${action === 'added' ? '#ff4b2b' : '#888'};
    `;

    notification.innerHTML = `
      <i class='bx ${action === 'added' ? 'bxs-heart' : 'bx-heart'}' style="color: ${action === 'added' ? '#ff4b2b' : '#fff'}; font-size: 24px;"></i>
      <div style="display: flex; flex-direction: column;">
        <span style="font-weight: 600; font-size: 14px;">Wishlist Updated</span>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);

    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
}

// Make CartManager globally available
window.CartManager = CartManager;


