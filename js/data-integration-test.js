/**
 * Data Integration Test Module
 * Tests the real data integration for orders, reviews, and wishlists
 */

class DataIntegrationTest {
    constructor() {
        this.testUser = {
            id: 'test_user_123',
            email: 'test@example.com',
            user_metadata: { full_name: 'Test User' }
        };
    }

    // Initialize test data
    async initializeTestData() {
        console.log('🚀 Initializing test data...');
        
        // Set test user session
        localStorage.setItem('be_session', JSON.stringify(this.testUser));
        localStorage.setItem('be_current_user', JSON.stringify(this.testUser));

        // Create sample orders if none exist
        await this.createSampleOrders();
        
        // Create sample wishlist items
        await this.createSampleWishlist();
        
        // Create sample reviews
        await this.createSampleReviews();
        
        console.log('✅ Test data initialized successfully');
    }

    // Create sample orders with realistic timestamps
    async createSampleOrders() {
        const orders = [
            {
                id: 'EV-1001',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
                status: 'Processing',
                total: 749.00,
                items: [
                    { name: 'Haier FrostShield 400L', price: 749.00, quantity: 1, image: './assets/haier-refrigerator-01.jpg' }
                ],
                shipping: { street: '123 Test St', city: 'Test City', state: 'TC', zip: '12345' },
                payment: 'Visa ending in 4242'
            },
            {
                id: 'EV-1002',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
                status: 'Shipped',
                total: 399.00,
                items: [
                    { name: 'Panasonic 7 Kg Front Load Washing Machine', price: 399.00, quantity: 1, image: './assets/panasonic-washer-01.jpg' }
                ],
                shipping: { street: '123 Test St', city: 'Test City', state: 'TC', zip: '12345' },
                payment: 'PayPal'
            },
            {
                id: 'EV-1003',
                date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
                status: 'Delivered',
                total: 1199.00,
                items: [
                    { name: 'Blue Ember ClimatePro 1.5T', price: 599.00, quantity: 1, image: './assets/Blue Ember-ac-01.jpg' },
                    { name: 'Blue Ember MicroChef 30L', price: 229.00, quantity: 1, image: './assets/Blue Ember-microwave-01.jpg' }
                ],
                shipping: { street: '123 Test St', city: 'Test City', state: 'TC', zip: '12345' },
                payment: 'Mastercard ending in 8888'
            },
            {
                id: 'EV-1004',
                date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
                status: 'Delivered',
                total: 899.00,
                items: [
                    { name: 'Samsung 65" QLED TV', price: 899.00, quantity: 1, image: './assets/samsung-tv-01.jpg' }
                ],
                shipping: { street: '123 Test St', city: 'Test City', state: 'TC', zip: '12345' },
                payment: 'Visa ending in 4242'
            }
        ];

        // Save orders using the DB client
        if (window.DB) {
            orders.forEach(order => {
                window.DB.createOrder(order);
            });
        } else {
            // Fallback to localStorage
            const existingOrders = JSON.parse(localStorage.getItem('be_orders') || '[]');
            existingOrders.push(...orders);
            localStorage.setItem('be_orders', JSON.stringify(existingOrders));
        }
    }

    // Create sample wishlist items
    async createSampleWishlist() {
        const wishlistItems = [
            {
                product_id: 'prod_001',
                product_name: 'LG 8kg Front Load Washing Machine',
                product_image: './assets/lg-washer-01.jpg',
                product_price: 599.99
            },
            {
                product_id: 'prod_002',
                product_name: 'Sony 55" OLED TV',
                product_image: './assets/sony-tv-01.jpg',
                product_price: 1299.99
            },
            {
                product_id: 'prod_003',
                product_name: 'Bosch Dishwasher Series 8',
                product_image: './assets/bosch-dishwasher-01.jpg',
                product_price: 899.99
            },
            {
                product_id: 'prod_004',
                product_name: 'Dyson V15 Vacuum Cleaner',
                product_image: './assets/dyson-vacuum-01.jpg',
                product_price: 749.99
            },
            {
                product_id: 'prod_005',
                product_name: 'KitchenAid Stand Mixer',
                product_image: './assets/kitchenaid-mixer-01.jpg',
                product_price: 379.99
            }
        ];

        // Add wishlist items using the DB client
        if (window.DB) {
            wishlistItems.forEach(item => {
                window.DB.addToWishlist(item);
            });
        } else {
            // Fallback to localStorage
            const existingWishlist = JSON.parse(localStorage.getItem('be_wishlists') || '[]');
            wishlistItems.forEach(item => {
                existingWishlist.push({
                    id: 'wish_' + Date.now() + Math.random(),
                    user_id: this.testUser.id,
                    ...item,
                    added_at: new Date().toISOString()
                });
            });
            localStorage.setItem('be_wishlists', JSON.stringify(existingWishlist));
        }
    }

    // Create sample reviews
    async createSampleReviews() {
        const reviews = [
            {
                product_id: 'prod_003',
                product_name: 'Bosch Dishwasher Series 8',
                rating: 5,
                comment: 'Excellent dishwasher! Very quiet and efficient. Highly recommend.'
            },
            {
                product_id: 'prod_004',
                product_name: 'Dyson V15 Vacuum Cleaner',
                rating: 4,
                comment: 'Great suction power and battery life. A bit expensive but worth it.'
            },
            {
                product_id: 'prod_005',
                product_name: 'KitchenAid Stand Mixer',
                rating: 5,
                comment: 'Perfect for baking! Love the different attachments that come with it.'
            }
        ];

        // Add reviews using the DB client
        if (window.DB) {
            reviews.forEach(review => {
                window.DB.createReview(review);
            });
        } else {
            // Fallback to localStorage
            const existingReviews = JSON.parse(localStorage.getItem('be_reviews') || '[]');
            reviews.forEach(review => {
                existingReviews.push({
                    id: 'rev_' + Date.now() + Math.random(),
                    user_id: this.testUser.id,
                    ...review,
                    created_at: new Date().toISOString()
                });
            });
            localStorage.setItem('be_reviews', JSON.stringify(existingReviews));
        }
    }

    // Test dashboard statistics
    testDashboardStats() {
        console.log('📊 Testing Dashboard Statistics...');
        
        if (window.DB) {
            const stats = window.DB.getDashboardStats();
            console.log('Dashboard Stats:', stats);
            
            // Validate stats
            const validations = [
                { field: 'totalOrders', check: stats.totalOrders >= 0 },
                { field: 'totalReviews', check: stats.totalReviews >= 0 },
                { field: 'totalWishlist', check: stats.totalWishlist >= 0 },
                { field: 'totalSpent', check: stats.totalSpent >= 0 }
            ];
            
            validations.forEach(validation => {
                if (validation.check) {
                    console.log(`✅ ${validation.field}: ${stats[validation.field]}`);
                } else {
                    console.log(`❌ ${validation.field}: Invalid value`);
                }
            });
            
            return stats;
        } else {
            console.log('❌ DB client not available');
            return null;
        }
    }

    // Test order status calculation
    testOrderStatusCalculation() {
        console.log('🔍 Testing Order Status Calculation...');
        
        const testOrders = [
            { id: 'new', created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }, // 1 day ago
            { id: 'processing', created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }, // 2 days ago
            { id: 'shipped', created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() }, // 5 days ago
            { id: 'delivered', created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() } // 10 days ago
        ];
        
        if (typeof calculateOrderStatus === 'function') {
            testOrders.forEach(order => {
                const status = calculateOrderStatus(order);
                console.log(`Order ${order.id}: ${status}`);
            });
        } else {
            console.log('❌ calculateOrderStatus function not available');
        }
    }

    // Test wishlist functionality
    testWishlistFunctionality() {
        console.log('💝 Testing Wishlist Functionality...');
        
        if (window.DB) {
            const wishlist = window.DB.getMyWishlist();
            console.log('Wishlist items:', wishlist);
            
            if (wishlist.length > 0) {
                console.log('✅ Wishlist loaded successfully');
                
                // Test adding a new item
                const newItem = {
                    product_id: 'test_prod',
                    product_name: 'Test Product',
                    product_image: './assets/test.jpg',
                    product_price: 99.99
                };
                
                const addedItem = window.DB.addToWishlist(newItem);
                console.log('Added item:', addedItem);
                
                // Test removing the item
                window.DB.removeFromWishlist('test_prod');
                console.log('✅ Wishlist add/remove test completed');
            } else {
                console.log('❌ No wishlist items found');
            }
        } else {
            console.log('❌ DB client not available');
        }
    }

    // Test review functionality
    testReviewFunctionality() {
        console.log('⭐ Testing Review Functionality...');
        
        if (window.DB) {
            const reviews = window.DB.getMyReviews();
            console.log('User reviews:', reviews);
            
            if (reviews.length > 0) {
                console.log('✅ Reviews loaded successfully');
                
                // Test creating a new review
                const newReview = {
                    product_id: 'test_product',
                    product_name: 'Test Product',
                    rating: 4,
                    comment: 'This is a test review.'
                };
                
                const createdReview = window.DB.createReview(newReview);
                console.log('Created review:', createdReview);
                
                // Test getting product reviews
                const productReviews = window.DB.getProductReviews('test_product');
                console.log('Product reviews:', productReviews);
                console.log('✅ Review creation and retrieval test completed');
            } else {
                console.log('❌ No reviews found');
            }
        } else {
            console.log('❌ DB client not available');
        }
    }

    // Run all tests
    async runAllTests() {
        console.log('🧪 Starting Data Integration Tests...\n');
        
        await this.initializeTestData();
        
        this.testDashboardStats();
        console.log('');
        
        this.testOrderStatusCalculation();
        console.log('');
        
        this.testWishlistFunctionality();
        console.log('');
        
        this.testReviewFunctionality();
        console.log('');
        
        console.log('✅ All tests completed!');
    }

    // Clear test data
    clearTestData() {
        console.log('🧹 Clearing test data...');
        
        localStorage.removeItem('be_orders');
        localStorage.removeItem('be_wishlists');
        localStorage.removeItem('be_reviews');
        localStorage.removeItem('be_session');
        localStorage.removeItem('be_current_user');
        
        console.log('✅ Test data cleared');
    }
}

// Export for global use
window.DataIntegrationTest = DataIntegrationTest;

// Auto-run tests if in test mode
if (window.location.search.includes('test=data')) {
    document.addEventListener('DOMContentLoaded', async () => {
        // Wait for DB to initialize
        setTimeout(async () => {
            const tester = new DataIntegrationTest();
            await tester.runAllTests();
        }, 1000);
    });
}


