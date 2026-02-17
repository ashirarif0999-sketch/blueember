// 📦 Mock Database Client (LocalStorage)
// Simulates a real database for offline/demo functionality

const DB = {
    // Keys
    USERS_KEY: 'be_users',
    SESSION_KEY: 'be_session',
    ORDERS_KEY: 'be_orders',
    WISHLISTS_KEY: 'be_wishlists',
    REVIEWS_KEY: 'be_reviews',

    // --- Auth Methods ---

    // Sign Up: Create a new user
    signUp: async (email, password, fullName) => {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 800));

        const users = DB.getUsers();
        if (users.find(u => u.email === email)) {
            return { error: { message: 'User already exists' } };
        }

        const newUser = {
            id: 'user_' + Date.now(),
            email,
            password, // In a real app, this should be hashed!
            user_metadata: { full_name: fullName },
            created_at: new Date().toISOString()
        };

        users.push(newUser);
        DB.saveUsers(users);

        // Auto Login
        DB.setSession(newUser);
        return { data: { user: newUser }, error: null };
    },

    // Sign In: Find user by credentials
    signInWithPassword: async ({ email, password }) => {
        await new Promise(r => setTimeout(r, 800));

        const users = DB.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { error: { message: 'Invalid email or password' } };
        }

        DB.setSession(user);
        return { data: { user }, error: null };
    },

    // Sign Out: Clear session
    signOut: async () => {
        localStorage.removeItem(DB.SESSION_KEY);
        window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user: null } }));
        return { error: null };
    },

    // Get Current Session
    getSession: async () => {
        const userStr = localStorage.getItem(DB.SESSION_KEY);
        if (!userStr) return { data: { session: null } };
        return { data: { session: { user: JSON.parse(userStr) } } };
    },

    // Get User Data (Mocking supabase.auth.getUser())
    getUser: async () => {
        const userStr = localStorage.getItem(DB.SESSION_KEY);
        if (!userStr) return { data: { user: null } };
        return { data: { user: JSON.parse(userStr) } };
    },

    // --- Data Helpers ---

    getUsers: () => {
        return JSON.parse(localStorage.getItem(DB.USERS_KEY) || '[]');
    },

    saveUsers: (users) => {
        localStorage.setItem(DB.USERS_KEY, JSON.stringify(users));
    },

    setSession: (user) => {
        localStorage.setItem(DB.SESSION_KEY, JSON.stringify(user));
        window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
    },

    // --- Order Methods ---

    // Get orders for current user
    getMyOrders: () => {
        const user = JSON.parse(localStorage.getItem(DB.SESSION_KEY));
        if (!user) return [];
        const allOrders = JSON.parse(localStorage.getItem(DB.ORDERS_KEY) || '[]');
        return allOrders.filter(o => o.user_id === user.id);
    },

    // Create a new order
    createOrder: (orderData) => {
        const user = JSON.parse(localStorage.getItem(DB.SESSION_KEY));
        if (!user) return null;

        const allOrders = JSON.parse(localStorage.getItem(DB.ORDERS_KEY) || '[]');
        const newOrder = {
            id: orderData.id || ('ord_' + Date.now()),
            user_id: user.id,
            ...orderData,
            status: 'Processing',
            created_at: orderData.created_at || new Date().toISOString()
        };
        allOrders.unshift(newOrder); // Add to top
        localStorage.setItem(DB.ORDERS_KEY, JSON.stringify(allOrders));
        return newOrder;
    },

    // --- Wishlist Methods ---

    // Get wishlist for current user
    getMyWishlist: () => {
        const user = JSON.parse(localStorage.getItem(DB.SESSION_KEY));
        if (!user) return [];
        const allWishlists = JSON.parse(localStorage.getItem(DB.WISHLISTS_KEY) || '[]');
        return allWishlists.filter(w => w.user_id === user.id);
    },

    // Add item to wishlist
    addToWishlist: (productData) => {
        const user = JSON.parse(localStorage.getItem(DB.SESSION_KEY));
        if (!user) return null;

        const allWishlists = JSON.parse(localStorage.getItem(DB.WISHLISTS_KEY) || '[]');

        // Check if item already exists in wishlist
        const existingItem = allWishlists.find(w => w.user_id === user.id && w.product_id === productData.product_id);
        if (existingItem) {
            return existingItem; // Item already in wishlist
        }

        const newWishlistItem = {
            id: 'wish_' + Date.now(),
            user_id: user.id,
            product_id: productData.product_id,
            product_name: productData.product_name,
            product_image: productData.product_image,
            product_price: productData.product_price,
            added_at: new Date().toISOString()
        };

        allWishlists.unshift(newWishlistItem);
        localStorage.setItem(DB.WISHLISTS_KEY, JSON.stringify(allWishlists));
        return newWishlistItem;
    },

    // Remove item from wishlist
    removeFromWishlist: (productId) => {
        const user = JSON.parse(localStorage.getItem(DB.SESSION_KEY));
        if (!user) return false;

        const allWishlists = JSON.parse(localStorage.getItem(DB.WISHLISTS_KEY) || '[]');
        const filteredWishlists = allWishlists.filter(w => !(w.user_id === user.id && w.product_id === productId));
        localStorage.setItem(DB.WISHLISTS_KEY, JSON.stringify(filteredWishlists));
        return true;
    },

    // --- Review Methods ---

    // Get reviews for current user
    getMyReviews: () => {
        const user = JSON.parse(localStorage.getItem(DB.SESSION_KEY));
        if (!user) return [];
        const allReviews = JSON.parse(localStorage.getItem(DB.REVIEWS_KEY) || '[]');
        return allReviews.filter(r => r.user_id === user.id);
    },

    // Get all reviews for a product
    getProductReviews: (productId) => {
        const allReviews = JSON.parse(localStorage.getItem(DB.REVIEWS_KEY) || '[]');
        return allReviews.filter(r => r.product_id === productId);
    },

    // Create a new review
    createReview: (reviewData) => {
        const user = JSON.parse(localStorage.getItem(DB.SESSION_KEY));
        if (!user) return null;

        const allReviews = JSON.parse(localStorage.getItem(DB.REVIEWS_KEY) || '[]');

        const newReview = {
            id: 'rev_' + Date.now(),
            user_id: user.id,
            product_id: reviewData.product_id,
            product_name: reviewData.product_name,
            rating: reviewData.rating,
            comment: reviewData.comment,
            created_at: new Date().toISOString()
        };

        allReviews.unshift(newReview);
        localStorage.setItem(DB.REVIEWS_KEY, JSON.stringify(allReviews));
        return newReview;
    },

    // --- Dashboard Statistics Methods ---

    // Get dashboard statistics
    getDashboardStats: () => {
        const user = JSON.parse(localStorage.getItem(DB.SESSION_KEY));
        if (!user) {
            return {
                totalOrders: 0,
                totalReviews: 0,
                totalWishlist: 0,
                totalSpent: 0,
                recentOrders: []
            };
        }

        const orders = DB.getMyOrders();
        const reviews = DB.getMyReviews();
        const wishlist = DB.getMyWishlist();

        const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const recentOrders = orders.slice(0, 5); // Get 5 most recent orders

        return {
            totalOrders: orders.length,
            totalReviews: reviews.length,
            totalWishlist: wishlist.length,
            totalSpent: totalSpent,
            recentOrders: recentOrders
        };
    },

    // --- Metadata & Consent ---

    // Update User Metadata (e.g., cookie consent)
    updateUserMetadata: async (metadata) => {
        const userStr = localStorage.getItem(DB.SESSION_KEY);
        if (!userStr) return { error: { message: 'No active session' } };

        let user = JSON.parse(userStr);
        user.user_metadata = { ...user.user_metadata, ...metadata };

        // Update in session
        localStorage.setItem(DB.SESSION_KEY, JSON.stringify(user));

        // Update in permanent users list
        const users = DB.getUsers();
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            DB.saveUsers(users);
        }

        return { data: { user }, error: null };
    }
};

// Expose globally as 'supabase' to mimic the previous API structure (partially)
// or just as 'DB' for cleaner usage. We'll use 'DB' in our new scripts.
window.DB = DB;

// Log initialization
console.log('✅ Mock Database (LocalStorage) Initialized');
window.dispatchEvent(new CustomEvent('dbReady'));



