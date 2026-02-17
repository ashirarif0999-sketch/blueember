#!/usr/bin/env node

// Blue Ember Local Chatbot - Standalone Script
// No server required, runs entirely locally

const readline = require('readline');

// Local Response System - Comprehensive appliance knowledge base
const getLocalResponse = (message) => {
    const msg = message.toLowerCase().trim();

    // Contact related
    if (msg.includes('contact') || msg.includes('support') || msg.includes('help') || msg.includes('customer service')) {
        return "For contact information and support, please visit our Contact page. We're here to help!";
    }

    // Product categories
    if (msg.includes('refrigerator') || msg.includes('fridge')) {
        return "Check out our wide selection of refrigerators from top brands like Haier, Bosch, and Electrolux. Visit our products page to browse and compare models.";
    }

    if (msg.includes('washer') || msg.includes('dryer') || msg.includes('laundry')) {
        return "Explore our washers and dryers collection featuring energy-efficient models from Bosch, Whirlpool, and more. Visit our products page for the best deals.";
    }

    if (msg.includes('air conditioner') || msg.includes('ac') || msg.includes('cooling')) {
        return "Stay cool with our air conditioners from Haier, Electrolux, and LG. Visit our products page to find the perfect cooling solution.";
    }

    if (msg.includes('microwave') || msg.includes('oven')) {
        return "Discover our microwave ovens and cooking appliances from Panasonic, Bosch, and Samsung. Visit our products page for convection and grill options.";
    }

    if (msg.includes('dishwasher')) {
        return "Make cleaning easier with our dishwashers from Bosch, Electrolux, and Whirlpool. Visit our products page to see quiet and efficient models.";
    }

    if (msg.includes('cooktop') || msg.includes('stove') || msg.includes('range')) {
        return "Find the perfect cooktop or range for your kitchen from Bosch, Electrolux, and Whirlpool. Visit our products page for gas and electric options.";
    }

    if (msg.includes('vacuum') || msg.includes('cleaner')) {
        return "Keep your home spotless with our vacuum cleaners from Bosch, Electrolux, and other brands. Visit our products page for robotic and upright models.";
    }

    if (msg.includes('coffee') || msg.includes('espresso')) {
        return "Start your day right with our coffee makers and espresso machines. Visit our products page for premium brewing options.";
    }

    if (msg.includes('blender') || msg.includes('mixer') || msg.includes('kitchen appliance')) {
        return "Enhance your cooking with our blenders, mixers, and small kitchen appliances from Bosch and other brands. Visit our products page.";
    }

    // Brands
    if (msg.includes('bosch')) {
        return "BOSCH offers premium Store with German engineering. Visit our BOSCH page to explore their full range.";
    }

    if (msg.includes('haier')) {
        return "Haier provides reliable and affordable appliances for modern homes. Visit our Haier page to see their latest products.";
    }

    if (msg.includes('lg')) {
        return "LG appliances combine innovation and style. Visit our LG page for smart home solutions.";
    }

    if (msg.includes('samsung')) {
        return "Samsung delivers cutting-edge technology in appliances. Visit our Samsung page for their premium lineup.";
    }

    if (msg.includes('whirlpool')) {
        return "Whirlpool is known for durable and efficient appliances. Visit our Whirlpool page for quality you can trust.";
    }

    if (msg.includes('electrolux')) {
        return "Electrolux offers Scandinavian design and performance. Visit our Electrolux page for elegant appliances.";
    }

    if (msg.includes('panasonic')) {
        return "Panasonic delivers reliable Japanese engineering. Visit our Panasonic page for quality appliances.";
    }

    if (msg.includes('sony')) {
        return "Sony brings entertainment and innovation to appliances. Visit our Sony page for their unique products.";
    }

    if (msg.includes('apple')) {
        return "Apple products combine technology and design. Visit our Apple page for their premium Store.";
    }

    // Common questions
    if (msg.includes('shipping') || msg.includes('delivery')) {
        return "We offer fast and reliable shipping across the US. Standard delivery takes 3-5 business days, with expedited options available. Visit our Contact page for shipping details.";
    }

    if (msg.includes('warranty') || msg.includes('guarantee')) {
        return "All our appliances come with manufacturer warranties. Most products include 1-2 year parts and labor coverage. Check product details or contact us for specific warranty information.";
    }

    if (msg.includes('return') || msg.includes('refund') || msg.includes('exchange')) {
        return "We have a 30-day return policy for most items. Visit our Refund and Exchange page for complete details on returns, exchanges, and refunds.";
    }

    if (msg.includes('installation') || msg.includes('setup')) {
        return "We provide professional installation services for all major appliances. Our certified technicians ensure proper setup and safety. Contact us for installation quotes.";
    }

    if (msg.includes('price') || msg.includes('cost') || msg.includes('expensive')) {
        return "We offer competitive pricing with frequent sales and discounts. Use our comparison tool to find the best deals. Prices may vary by location and availability.";
    }

    if (msg.includes('energy efficient') || msg.includes('energy star')) {
        return "Many of our appliances are ENERGY STAR certified, helping you save on electricity bills. Look for the Energy Star badge on product pages for certified models.";
    }

    if (msg.includes('compare') || msg.includes('comparison')) {
        return "Use our product comparison tool to easily compare features, prices, and specifications. Visit our Compare page to get started.";
    }

    if (msg.includes('brands') || msg.includes('manufacturers')) {
        return "We carry appliances from trusted global brands including Bosch, Haier, LG, Samsung, Whirlpool, Electrolux, Panasonic, and Sony. Visit our Brands page to explore all options.";
    }

    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hello! Welcome to Blue Ember Store. How can I help you find the perfect appliance today?";
    }

    if (msg.includes('thank you') || msg.includes('thanks')) {
        return "You're welcome! If you have any more questions about our appliances or need help with your purchase, feel free to ask.";
    }

    // Store information
    if (msg.includes('location') || msg.includes('store') || msg.includes('address')) {
        return "Our main location is at 196 Burton Ave, Hasbrouck Heights, NJ 07604, USA. We serve customers nationwide with shipping and delivery services.";
    }

    if (msg.includes('hours') || msg.includes('open')) {
        return "We're open Monday to Friday 9 AM - 7 PM, Saturday 9 AM - 5 PM, and Sunday 11 AM - 4 PM EST. Contact us anytime for support.";
    }

    if (msg.includes('about') || msg.includes('company')) {
        return "Blue Ember Store has been providing premium Store since 2005. We partner with top global brands to offer energy-efficient, reliable products with expert support.";
    }

    // Product features
    if (msg.includes('smart') || msg.includes('wifi') || msg.includes('connected')) {
        return "Many of our appliances feature smart connectivity. Look for WiFi-enabled models from LG, Samsung, and Bosch that can be controlled via mobile apps.";
    }

    if (msg.includes('quiet') || msg.includes('noise')) {
        return "We carry quiet operation models from various brands. Check product specifications for decibel ratings. Bosch and LG often have some of the quietest appliances.";
    }

    if (msg.includes('capacity') || msg.includes('size')) {
        return "Appliance capacities vary by type. Refrigerators range from 10-30 cu ft, washers from 3-6 cu ft, and dishwashers from 12-18 place settings. Check individual product specs.";
    }

    // Shopping assistance
    if (msg.includes('recommend') || msg.includes('suggest')) {
        return "I'd be happy to help you find the right appliance! Tell me your budget, space constraints, and must-have features, and I'll recommend some great options.";
    }

    if (msg.includes('best') || msg.includes('top')) {
        return "Our best-selling categories include refrigerators, washers, and air conditioners. Popular brands are Bosch, Haier, and LG. Visit our Featured Products section.";
    }

    if (msg.includes('new') || msg.includes('latest')) {
        return "Check out our latest arrivals from top brands. We regularly update our inventory with the newest models featuring advanced technology and energy efficiency.";
    }

    if (msg.includes('sale') || msg.includes('discount') || msg.includes('deal')) {
        return "We frequently have sales and special offers. Sign up for our newsletter or check our Home page for current promotions and discounts.";
    }

    // Technical questions
    if (msg.includes('repair') || msg.includes('service')) {
        return "We offer repair services for most brands we carry. Contact our service department for diagnostics and repair quotes. Some manufacturers also offer extended warranties.";
    }

    if (msg.includes('maintenance') || msg.includes('cleaning')) {
        return "Regular maintenance extends appliance life. We recommend professional cleaning annually for most appliances. Check manufacturer guidelines for specific care instructions.";
    }

    if (msg.includes('voltage') || msg.includes('power') || msg.includes('electric')) {
        return "Most appliances require 110-120V standard household outlets. Larger appliances like ranges may need 220-240V. Always check product specifications and consult an electrician if unsure.";
    }

    // Environmental
    if (msg.includes('eco') || msg.includes('environment') || msg.includes('green')) {
        return "We prioritize eco-friendly appliances with Energy Star certification and efficient refrigerants. Look for models with high energy ratings to reduce your carbon footprint.";
    }

    if (msg.includes('recycle') || msg.includes('disposal')) {
        return "We offer recycling programs for old appliances. Many manufacturers have take-back programs. Contact us for information on responsible disposal and recycling options.";
    }

    // Payment and financing
    if (msg.includes('payment') || msg.includes('finance') || msg.includes('installment')) {
        return "We accept major credit cards, PayPal, and offer financing options through approved partners. Contact us for details on payment plans and special financing offers.";
    }

    if (msg.includes('tax') || msg.includes('fee')) {
        return "Taxes are calculated at checkout based on your shipping address. We don't charge additional fees for standard shipping within the continental US.";
    }

    // International
    if (msg.includes('international') || msg.includes('shipping') || msg.includes('outside us')) {
        return "We primarily serve customers in the United States. For international inquiries, please contact us directly to discuss shipping options and availability.";
    }

    // Miscellaneous
    if (msg.includes('career') || msg.includes('job') || msg.includes('work')) {
        return "We're always looking for talented individuals to join our team. Visit our Contact page to inquire about career opportunities at Blue Ember Store.";
    }

    if (msg.includes('feedback') || msg.includes('review')) {
        return "We value your feedback! Please visit our Contact page to share your experience or leave a review. Your input helps us improve our service.";
    }

    if (msg.includes('privacy') || msg.includes('policy')) {
        return "Your privacy is important to us. Please review our Privacy Policy for information on how we collect, use, and protect your personal information.";
    }

    if (msg.includes('terms') || msg.includes('conditions')) {
        return "Please review our Terms and Services for complete terms and conditions of use, including warranties, returns, and liability.";
    }

    // More specific questions
    if (msg.includes('how to') || msg.includes('guide') || msg.includes('tutorial')) {
        return "We have detailed guides and tutorials for appliance installation and maintenance. Visit our Contact page or check product manuals for step-by-step instructions.";
    }

    if (msg.includes('troubleshoot') || msg.includes('problem') || msg.includes('issue')) {
        return "Having appliance issues? Check our troubleshooting guides or contact our support team. Many common problems can be resolved with simple fixes.";
    }

    if (msg.includes('manual') || msg.includes('instructions')) {
        return "Product manuals and instructions are available on manufacturer websites or included with your purchase. Contact us if you need help finding specific documentation.";
    }

    if (msg.includes('parts') || msg.includes('accessories')) {
        return "We carry replacement parts and accessories for most appliances we sell. Contact us with your model number for availability and pricing.";
    }

    if (msg.includes('safety') || msg.includes('danger') || msg.includes('risk')) {
        return "Safety is our top priority. All our appliances meet safety standards. Always follow manufacturer guidelines and consult professionals for installation.";
    }

    if (msg.includes('certification') || msg.includes('standards')) {
        return "Our appliances meet UL, CE, and Energy Star certifications where applicable. We ensure all products comply with safety and efficiency standards.";
    }

    if (msg.includes('custom') || msg.includes('special order')) {
        return "We can special order many items not in stock. Contact us with specifications for pricing and availability on custom or special order appliances.";
    }

    if (msg.includes('demo') || msg.includes('showroom')) {
        return "Visit our showroom to see appliances in person and get expert advice. Our team can demonstrate features and help you make informed decisions.";
    }

    if (msg.includes('bulk') || msg.includes('wholesale')) {
        return "For bulk or wholesale inquiries, please contact our sales team. We offer special pricing for large orders and commercial accounts.";
    }

    if (msg.includes('gift') || msg.includes('present')) {
        return "Looking for appliance gifts? We have gift options and can help you choose the perfect item. Free gift wrapping available for special occasions.";
    }

    if (msg.includes('student') || msg.includes('discount')) {
        return "We offer student and military discounts on select items. Contact us or check our website for current promotional codes and special offers.";
    }

    if (msg.includes('senior') || msg.includes('elderly')) {
        return "Seniors receive special discounts and priority service. We also offer extended warranties and installation assistance for our senior customers.";
    }

    if (msg.includes('commercial') || msg.includes('business')) {
        return "For commercial or business appliance needs, we offer specialized products and services. Contact our commercial sales team for quotes and consultations.";
    }

    if (msg.includes('rental') || msg.includes('lease')) {
        return "We offer appliance rental options for short-term needs. Contact us to discuss rental terms, availability, and pricing for your specific requirements.";
    }

    if (msg.includes('trade') || msg.includes('in')) {
        return "We accept trade-ins on old appliances. Bring in your old appliance for evaluation and receive credit toward your new purchase.";
    }

    if (msg.includes('estimate') || msg.includes('quote')) {
        return "We provide free estimates for installation, delivery, and service. Contact us with your appliance details for accurate pricing.";
    }

    if (msg.includes('appointment') || msg.includes('schedule')) {
        return "Schedule service appointments, deliveries, or consultations online or by phone. Our team will confirm your preferred date and time.";
    }

    if (msg.includes('emergency') || msg.includes('urgent')) {
        return "For emergency repairs or urgent appliance needs, call our 24/7 emergency line. We prioritize critical appliance failures.";
    }

    if (msg.includes('warranty claim') || msg.includes('claim')) {
        return "To file a warranty claim, contact us with your purchase information and issue description. We'll guide you through the process with the manufacturer.";
    }

    if (msg.includes('upgrade') || msg.includes('update')) {
        return "Planning an appliance upgrade? We can help assess your current setup and recommend the best new models for your needs and budget.";
    }

    if (msg.includes('energy bill') || msg.includes('saving')) {
        return "Reduce your energy bills with our energy-efficient appliances. Many models pay for themselves through savings within a few years.";
    }

    if (msg.includes('water') || msg.includes('usage')) {
        return "Our water-efficient washers and dishwashers can save thousands of gallons annually. Look for WaterSense certified models for maximum savings.";
    }

    if (msg.includes('smart home') || msg.includes('integration')) {
        return "Integrate your appliances into a smart home system. We carry WiFi-enabled models that work with Alexa, Google Home, and Apple HomeKit.";
    }

    if (msg.includes('voice control') || msg.includes('alexa') || msg.includes('google')) {
        return "Many of our smart appliances support voice control through Alexa, Google Assistant, or Siri. Check product specs for compatibility.";
    }

    if (msg.includes('app') || msg.includes('mobile')) {
        return "Control and monitor your appliances remotely with manufacturer mobile apps. Download the app for your brand to access smart features.";
    }

    if (msg.includes('notification') || msg.includes('alert')) {
        return "Receive notifications about cycle completion, maintenance reminders, and error codes through smart appliance apps and connected services.";
    }

    if (msg.includes('remote') || msg.includes('monitor')) {
        return "Monitor your appliances remotely with smart features. Check energy usage, receive alerts, and control settings from anywhere.";
    }

    if (msg.includes('filter') || msg.includes('replacement')) {
        return "Replace filters regularly for optimal performance. We carry replacement filters for refrigerators, air purifiers, and other appliances.";
    }

    if (msg.includes('cleaning') || msg.includes('maintenance')) {
        return "Regular cleaning and maintenance extends appliance life. We offer professional cleaning services and maintenance plans.";
    }

    if (msg.includes('noise level') || msg.includes('decibel')) {
        return "Quiet operation is important for many households. Look for models rated below 45 dB for whisper-quiet performance.";
    }

    if (msg.includes('capacity') || msg.includes('size')) {
        return "Choose the right capacity for your household. Consider family size, usage patterns, and available space when selecting appliance sizes.";
    }

    if (msg.includes('dimension') || msg.includes('measurement')) {
        return "Check product dimensions before purchase to ensure proper fit. Measure your space and compare with appliance specifications.";
    }

    if (msg.includes('color') || msg.includes('finish')) {
        return "Appliances come in various colors and finishes. Popular options include stainless steel, black, white, and custom panel-ready models.";
    }

    if (msg.includes('handle') || msg.includes('design')) {
        return "Choose handles and designs that match your kitchen style. Options range from traditional to modern contemporary designs.";
    }

    // Default fallback for unmatched queries
    if (msg.length < 5) {
        return "I'd be happy to help! Could you please provide more details about what you're looking for?";
    }

    if (msg.includes('?')) {
        return "That's a great question! Let me help you find the information you need. Could you be more specific about what you're asking?";
    }

    // If no match, return null to use fallback
    return null;
};

// Generate fallback responses for unmatched queries
const generateFallbackResponse = (message) => {
    const msg = message.toLowerCase().trim();

    // Generic fallback responses
    if (msg.includes('?')) {
        return "That's an interesting question! As a local AI assistant, I can help with information about our appliances, products, and services. Could you be more specific?";
    }

    if (msg.length < 10) {
        return "I'd be happy to help! Could you please provide more details about what you're looking for?";
    }

    // 50+ natural, conversational fallback responses that sound like a helpful AI assistant
    const fallbacks = [
        "I'd love to help you find exactly what you're looking for! What kind of appliance are you shopping for today?",
        "That's interesting! I'm here to help you discover the perfect appliance for your needs. What are you in the market for?",
        "Great question! Our store has an amazing selection of appliances. Could you tell me more about what you're looking for?",
        "I'm excited to help you find the right appliance! Whether it's for your kitchen, laundry room, or living space, I've got you covered.",
        "Thanks for reaching out! I can help you navigate our entire appliance collection. What type of appliance interests you most?",
        "Absolutely, I'd be happy to assist! We have everything from energy-efficient refrigerators to smart Store. What's your main need?",
        "Perfect timing! I'm here to make your appliance shopping experience smooth and enjoyable. What are you hoping to accomplish?",
        "I appreciate you asking! Our team has carefully selected the best appliances from top brands. What room in your home needs updating?",
        "That's a great start! I can help you compare options and find the best value. Tell me more about your requirements.",
        "I'm glad you're here! Shopping for appliances can be overwhelming, but I'm here to make it simple. What's your budget range?",
        "Excellent choice to ask! We pride ourselves on having the most comprehensive appliance selection. What features are most important to you?",
        "Thanks for chatting with me! I can help you understand all the technical details and find the perfect match for your lifestyle.",
        "I love helping customers find their ideal appliances! Whether you're looking for reliability, style, or cutting-edge features, we have options.",
        "That's wonderful that you're planning ahead! I can help you choose appliances that will serve you well for years to come.",
        "I'm here to make this easy for you! Our appliances come with excellent warranties and support. What size space are you working with?",
        "Perfect! I can guide you through our entire catalog and help you make an informed decision. What's your top priority?",
        "I appreciate you taking the time to research! We have appliances for every budget and every need. What's your timeline for purchase?",
        "That's smart thinking! I can help you compare specifications and read reviews to find the best appliance for your situation.",
        "I'm thrilled to assist! Our store offers professional installation and ongoing support. What brand preferences do you have?",
        "Great to connect with you! I can help you understand energy ratings, noise levels, and all the important specifications.",
        "Thanks for your interest! We have appliances that can transform your daily routines. What problem are you trying to solve?",
        "I love this part of helping customers! Our selection includes both basic models and luxury features. What's your style preference?",
        "That's an important decision! I can help you weigh the pros and cons of different appliances and find the best fit.",
        "I'm here to support your decision! We offer free consultations and can help you visualize how appliances will look in your space.",
        "Excellent question! Our appliances are designed for real-life use. I can help you choose based on family size and usage patterns.",
        "I appreciate you being thorough! We have detailed specifications and customer reviews to help you decide.",
        "That's a fantastic approach! I can help you understand warranty terms, service plans, and long-term value.",
        "I'm excited to work with you! Our appliances come from manufacturers with excellent reputations for quality and service.",
        "Thanks for being detail-oriented! I can explain capacity ratings, energy efficiency, and smart features to help you choose.",
        "Perfect! I can help you navigate the sometimes confusing world of appliance specifications and find exactly what you need.",
        "I love helping people make confident decisions! Our store offers price matching and flexible financing options.",
        "That's a wise consideration! I can help you understand the total cost of ownership, including energy savings over time.",
        "I'm here to demystify the process! We have appliances for beginners and experts alike. What's your experience level?",
        "Great thinking! I can help you consider future needs and choose appliances that grow with your family.",
        "I appreciate your thoughtfulness! Our selection includes eco-friendly options and energy-efficient models.",
        "That's an important factor! I can help you find appliances with the quietest operation for your living situation.",
        "I'm glad you're planning carefully! We offer virtual consultations where I can show you appliance options remotely.",
        "Excellent priority! I can help you find appliances with the longest warranties and best customer support.",
        "Thanks for considering quality! Our store only carries appliances from manufacturers with proven track records.",
        "I love this conversation! I can help you understand the differences between brands and find your perfect match.",
        "That's a smart approach! I can help you create a shopping list and compare options side by side.",
        "I'm here to make this fun and easy! Our appliances come in various colors and styles to match your decor.",
        "Perfect! I can help you understand installation requirements and ensure you choose appliances that fit your space.",
        "I appreciate your attention to detail! We have appliances with advanced features like app control and voice activation.",
        "That's wonderful that you're investing in quality! I can help you find appliances that offer the best long-term value.",
        "I'm excited to help you discover great options! Our store has appliances for every room in your home.",
        "Thanks for reaching out! I can help you understand the differences between similar models and find the best one for you.",
        "Great question! I can explain how different appliances work and help you choose based on your daily routines.",
        "I love assisting customers like you! Our selection includes both traditional and innovative appliance designs.",
        "That's an important consideration! I can help you find appliances that are easy to clean and maintain.",
        "I'm here to provide clarity! We have detailed product information and can help you understand every feature.",
        "Perfect timing! I can help you take advantage of current promotions and find the best deals available.",
        "I appreciate you doing your homework! Our team can provide personalized recommendations based on your needs.",
        "That's a fantastic foundation! I can help you narrow down options and find appliances within your preferred price range.",
        "I'm thrilled to assist! Our store offers expert advice and can help you avoid common purchasing mistakes.",
        "Thanks for being proactive! I can help you understand delivery options and installation scheduling.",
        "Excellent! I can guide you through our warranty options and extended service plans for peace of mind.",
        "I love helping customers make these decisions! Our appliances are chosen for their reliability and customer satisfaction.",
        "That's a wise approach! I can help you consider how appliances will fit into your existing kitchen or laundry setup.",
        "I'm here to make this enjoyable! We have appliances that combine beautiful design with practical functionality.",
        "Perfect! I can help you understand the technical specifications and choose appliances that meet your performance needs."
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};

// Process a single message and return response
const processMessage = (message) => {
    console.log(`🤖 Processing: "${message}"`);

    // Get local response
    const localResponse = getLocalResponse(message);
    if (localResponse) {
        console.log('✅ Using predefined local response');
        return localResponse;
    }

    // Generate fallback response for unmatched queries
    const fallbackResponse = generateFallbackResponse(message);
    console.log('✅ Using generated fallback response');
    return fallbackResponse;
};

// Main execution logic
const main = () => {
    const args = process.argv.slice(2);

    if (args.length > 0) {
        // Command line mode - process single message
        const message = args.join(' ');
        const response = processMessage(message);
        console.log(`\n💬 ${response}\n`);
        process.exit(0);
    } else {
        // Interactive mode
        console.log('🚀 Blue Ember Local Chatbot');
        console.log('🏠 Fully offline and self-contained - no external dependencies');
        console.log('💬 Ask me anything about appliances! Type "exit" or "quit" to end.\n');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'You: '
        });

        rl.prompt();

        rl.on('line', (input) => {
            const message = input.trim();

            if (message.toLowerCase() === 'exit' || message.toLowerCase() === 'quit') {
                console.log('👋 Goodbye! Thanks for chatting with Blue Ember AI.');
                rl.close();
                return;
            }

            if (message) {
                const response = processMessage(message);
                console.log(`\n🤖 Blue Ember AI: ${response}\n`);
            }

            rl.prompt();
        });

        rl.on('close', () => {
            console.log('\n👋 Chat session ended.');
            process.exit(0);
        });
    }
};

// Run the chatbot
if (require.main === module) {
    main();
}



