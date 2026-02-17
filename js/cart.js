document.addEventListener('DOMContentLoaded', () => {
    // Cart popup elements
    const cartPopup = document.getElementById('cart-popup');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const continueBtn = document.getElementById('continue-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Cart trigger elements
    const cartLinks = document.querySelectorAll('.cart-link, #mobile-cart-link');

    // Function to show cart
    function showCart() {
        if (cartPopup && cartOverlay) {
            cartPopup.classList.add('active');
            cartOverlay.classList.add('active');
            // Optional: Update cart content here if needed
        }
    }

    // Function to hide cart
    function hideCart() {
        if (cartPopup && cartOverlay) {
            cartPopup.classList.remove('active');
            cartOverlay.classList.remove('active');
        }
    }

    // Open cart on cart icon/link click
    cartLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showCart();
        });
    });

    // Close cart events
    if (cartClose) {
        cartClose.addEventListener('click', hideCart);
    }
    if (continueBtn) {
        continueBtn.addEventListener('click', hideCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', hideCart);
    }

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    // Optional: Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartPopup.style.display === 'block') {
            hideCart();
        }
    });
});



