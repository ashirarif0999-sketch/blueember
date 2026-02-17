// products.js - Local database with exactly 301 products
const products = [
  {
    "id": "130",
    "name": "Apple iPhone 15 Pro Max 256GB",
    "description": "A17 Pro chip with 48MP camera system and titanium design",
    "image": "./assets/apple-iphone-01.jpg",
    "price": 1199.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  
  {
    "id": "131",
    "name": "Apple iPhone 15 128GB",
    "description": "A16 Bionic chip with Dynamic Island and 48MP main camera",
    "image": "./assets/apple-iphone-02.jpg",
    "price": 799.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "132",
    "name": "Apple iPad Pro 11- inch (M4) 256GB",
    "description": "M4 chip with Liquid Retina display and Apple Pencil Pro compatibility",
    "image": "./assets/apple-ipad-01.jpg",
    "price": 999.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "133",
    "name": "Apple iPad Air (M2) 256GB",
    "description": "M2 chip with 10.9-inch Liquid Retina display and USB-C connectivity",
    "image": "./assets/apple-ipad-02.jpg",
    "price": 749.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "134",
    "name": "Apple MacBook Air 15-inch (M3) 512GB",
    "description": "M3 chip with 18-hour battery life and 1080p FaceTime HD camera",
    "image": "./assets/apple-macbook-01.jpg",
    "price": 1499.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "135",
    "name": "Apple MacBook Pro 14-inch (M4) 1TB",
    "description": "M4 Pro chip with up to 24 hours of battery life and three Thunderbolt 5 ports",
    "image": "./assets/apple-macbook-02.jpg",
    "price": 2499.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "136",
    "name": "Apple MacBook Pro 16-inch (M4 Max) 2TB",
    "description": "M4 Max chip with 128GB unified memory and advanced neural engine",
    "image": "./assets/apple-macbook-03.jpg",
    "price": 3999.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "137",
    "name": "Apple Mac mini (M4) 16GB/256GB",
    "description": "M4 chip with 10-core CPU and 10-core GPU, built for Apple Intelligence",
    "image": "./assets/apple-macbook-04.jpg",
    "price": 699.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "138",
    "name": "Apple Watch Series 9 GPS 45mm",
    "description": "S9 SiP chip with Always-On Retina display and health monitoring features",
    "image": "./assets/apple-watch-01.jpg",
    "price": 429.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "139",
    "name": "Apple Watch Ultra 2 GPS + Cellular 49mm",
    "description": "Precision dual-frequency GPS with 36-hour battery life and ocean depth rating",
    "image": "./assets/apple-watch-02.jpg",
    "price": 799.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "140",
    "name": "Apple AirPods Pro (2nd Generation)",
    "description": "Active Noise Cancellation with Transparency mode and personalized Spatial Audio",
    "image": "./assets/apple-airpods-01.jpg",
    "price": 249.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "141",
    "name": "Apple AirPods (3rd Generation)",
    "description": "Spatial Audio with dynamic head tracking and sweat and water resistant design",
    "image": "./assets/apple-airpods-02.jpg",
    "price": 169.0,
    "brand": "Apple",
    "link": "./Apple-productpage.html"
  },
  {
    "id": "241",
    "name": "Bosch 800 Series 24\\",
    "description": "Premium dishwasher with CrystalDry technology, InfoLight, and ultra-quiet 38 dBA operation for perfect drying results.",
    "image": "./assets/bosch-dishwasher-01.jpg",
    "price": 1099.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "242",
    "name": "Bosch 300 Series 24\\",
    "description": "300 Series dishwasher with RackMatic adjustable upper rack, 3rd rack, and quiet 44 dBA operation for versatile loading options.",
    "image": "./assets/bosch-dishwasher-02.jpg",
    "price": 799.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "243",
    "name": "Bosch Benchmark 24\\",
    "description": "Benchmark series with MyWay 3rd rack, Speed60 wash cycle, and advanced filtration system for professional-grade cleaning.",
    "image": "./assets/bosch-dishwasher-03.jpg",
    "price": 1299.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "244",
    "name": "Bosch Ascenta 24\\",
    "description": "Ascenta series with 6 wash programs, sanitize option, and extra quiet 46 dBA operation for budget-conscious homeowners.",
    "image": "./assets/bosch-dishwasher-04.jpg",
    "price": 599.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "106",
    "name": "BOSCH B36CL80SNS 36\\",
    "description": "20.5 cu. ft. capacity with Home Connect smart features and dual freezer drawers",
    "image": "./assets/bosch-refrigerator-01.jpg",
    "price": 3899.0,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "107",
    "name": "BOSCH B36CL80ENS 36\\",
    "description": "20.5 cu. ft. capacity with black stainless steel finish and VitaFresh Pro system",
    "image": "./assets/bosch-refrigerator-02.jpg",
    "price": 4199.0,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "108",
    "name": "BOSCH B33CL80SNS 33\\",
    "description": "17.8 cu. ft. capacity with MultiAirFlow technology and QuickIce Pro system",
    "image": "./assets/bosch-refrigerator-03.jpg",
    "price": 3499.0,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "109",
    "name": "BOSCH B11CB50SNS 36\\",
    "description": "22.4 cu. ft. capacity with dual compressors and FreshSafe Zone drawer",
    "image": "./assets/bosch-refrigerator-04.jpg",
    "price": 3299.0,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "249",
    "name": "Bosch 800 Series 30\\",
    "description": "30-inch gas range with 5 burners including PowerBurner, FlexInduction cooktop, and convection oven for ultimate cooking flexibility.",
    "image": "./assets/bosch-range-01.jpg",
    "price": 2199.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "250",
    "name": "Bosch 500 Series 30\\",
    "description": "30-inch electric range with True Convection cooking, SpeedClean oven, and 5 heating elements for precise temperature control.",
    "image": "./assets/bosch-range-02.jpg",
    "price": 1899.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "251",
    "name": "Bosch 36\\",
    "description": "36-inch induction cooktop with FlexInduction zone, PowerMove Plus feature, and AutoChef sensors for precise cooking control.",
    "image": "./assets/bosch-cooktop-01.jpg",
    "price": 2599.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "252",
    "name": "Bosch 30\\",
    "description": "30-inch gas cooktop with 5 burners including PowerBurner, cast iron grates, and seamless stainless steel design.",
    "image": "./assets/bosch-cooktop-02.jpg",
    "price": 1499.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "253",
    "name": "Bosch 800 Series 30\\",
    "description": "30-inch electric wall oven with True Convection heating, SpeedClean technology, and Home Connect smart features.",
    "image": "./assets/bosch-oven-01.jpg",
    "price": 2299.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "254",
    "name": "Bosch 30\\",
    "description": "30-inch combination microwave and convection oven with SensorCook technology, 5 cooking modes, and stainless steel finish.",
    "image": "./assets/bosch-microwave-01.jpg",
    "price": 1599.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "255",
    "name": "Bosch 800 Series 30\\",
    "description": "30-inch double wall oven with FlexInduction cooktop, True Convection in both ovens, and premium stainless steel construction.",
    "image": "./assets/bosch-oven-02.jpg",
    "price": 4999.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "256",
    "name": "Bosch 30\\",
    "description": "30-inch speed oven combining microwave, convection, and steam cooking for fast, versatile meal preparation with precision.",
    "image": "./assets/bosch-microwave-02.jpg",
    "price": 2499.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "257",
    "name": "Bosch 300 Series 2.2 cu. ft. Front Load Washer with VarioDrum",
    "description": "2.2 cu. ft. front load washer with VarioDrum technology, 16 wash programs, and ultra-quiet operation with ActiveWater Plus.",
    "image": "./assets/bosch-washer-01.jpg",
    "price": 999.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "258",
    "name": "Bosch 300 Series 4.0 cu. ft. Electric Dryer with AutoDry",
    "description": "4.0 cu. ft. electric dryer with AutoDry sensor technology, 15 drying programs, and anti-vibration design for quiet operation.",
    "image": "./assets/bosch-dryer-01.jpg",
    "price": 899.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "259",
    "name": "Bosch 800 Series 2.2 cu. ft. Front Load Washer with i-DOS AutoDosing",
    "description": "Premium front load washer with i-DOS automatic detergent dispensing, SpeedPerfect technology, and Home Connect smart features.",
    "image": "./assets/bosch-washer-02.jpg",
    "price": 1499.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "260",
    "name": "Bosch 800 Series 4.0 cu. ft. Heat Pump Dryer with AutoDry Sensor",
    "description": "Energy-efficient heat pump dryer with AutoDry sensor technology, EcoSilence Drive motor, and anti-wrinkle care for gentle drying.",
    "image": "./assets/bosch-dryer-02.jpg",
    "price": 1399.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "261",
    "name": "Bosch 36\\",
    "description": "36-inch wall-mounted range hood with 600 CFM power, 4-speed settings, LED lighting, and dishwasher-safe stainless steel filters.",
    "image": "./assets/bosch-range-hood-01.jpg",
    "price": 899.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "262",
    "name": "Bosch 30\\",
    "description": "30-inch under cabinet range hood with 400 CFM ventilation power, 3-speed settings, and sleek stainless steel design.",
    "image": "./assets/bosch-range-hood-02.jpg",
    "price": 599.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "263",
    "name": "Bosch 36\\",
    "description": "36-inch downdraft ventilation system that rises from countertop when needed, with 600 CFM power and quiet operation for island cooktops.",
    "image": "./assets/bosch-range-hood-03.jpg",
    "price": 1299.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "264",
    "name": "Bosch 42\\",
    "description": "42-inch island-mounted range hood with 900 CFM powerful ventilation, dual LED lighting, and premium stainless steel construction.",
    "image": "./assets/bosch-range-hood-04.jpg",
    "price": 1799.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "265",
    "name": "Bosch Tassimo My Way 2 Coffee Maker with 10 Brew Sizes",
    "description": "Premium coffee maker with 10 brew sizes, OneTouch technology, and integrated milk frother for barista-quality coffee at home.",
    "image": "./assets/bosch-coffee-maker.jpg",
    "price": 199.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "266",
    "name": "Bosch Universal Plus 6-Speed Stand Mixer with 6.5-Quart Bowl",
    "description": "6.5-quart stand mixer with 6 speeds, powerful 800-watt motor, and multiple attachments for baking and food preparation.",
    "image": "./assets/bosch-mixer.jpg",
    "price": 399.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "267",
    "name": "Bosch BCH6ATH25 2-in-1 Cordless Stick Vacuum Cleaner",
    "description": "Cordless stick vacuum with 2-in-1 functionality, 60-minute runtime, HEPA filtration system, and wall-mountable charging station.",
    "image": "./assets/bosch-vacuum.jpg",
    "price": 299.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "268",
    "name": "Bosch MSM67160 1000W Hand Blender with Variable Speed Control",
    "description": "1000W hand blender with variable speed control, stainless steel blades, and multiple attachments for blending, chopping, and whisking.",
    "image": "./assets/bosch-blender.jpg",
    "price": 129.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "269",
    "name": "Bosch TKA6A044 2-Slice Toaster with 6 Browning Settings",
    "description": "2-slice toaster with 6 browning settings, defrost function, cancel button, and removable crumb tray for easy cleaning.",
    "image": "./assets/bosch-toaster.jpg",
    "price": 79.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "270",
    "name": "Bosch 800 Series Built-in Coffee System with Milk Frother",
    "description": "Premium built-in coffee system with automatic milk frother, 10 coffee specialties, bean-to-cup functionality, and touchscreen interface.",
    "image": "./assets/bosch-coffee-system.jpg",
    "price": 3499.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "271",
    "name": "Bosch 500 Series Compact Built-in Coffee System",
    "description": "Space-saving built-in coffee system with 5 coffee specialties, automatic cleaning program, and integrated grinder for fresh coffee beans.",
    "image": "./assets/bosch-coffee-system-02.jpg",
    "price": 1999.99,
    "brand": "Bosch",
    "link": "./BOSCH-productpage.html"
  },
  {
    "id": "118",
    "name": "Electrolux EI23BC82SS 36\\",
    "description": "22.3 cu. ft. capacity with IQ-Touch controls and self-closing doors",
    "image": "./assets/electrolux-refrigerator-01.jpg",
    "price": 2799.0,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "119",
    "name": "Electrolux EI27BS81SS 36\\",
    "description": "27.3 cu. ft. capacity with water dispenser and dual cooling system",
    "image": "./assets/electrolux-refrigerator-02.jpg",
    "price": 2499.0,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "120",
    "name": "Electrolux ELR-ISBS 581 BV SBS (VCM) 581L",
    "description": "Electronic Digital Control, Metal Cooling, Auto Anion Technology (AAT).",
    "image": "./assets/electrolux-refrigerator-03.jpg",
    "price": 1299.0,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "121",
    "name": "Electrolux EI23BC84SS 42\\",
    "description": "42-inch counter depth French door refrigerator with IQ-Touch controls, self-closing doors, and advanced cooling technology.",
    "image": "./assets/electrolux-refrigerator-04.jpg",
    "price": 3199.0,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "276",
    "name": "Electrolux 4.5 cu. ft. Compact Refrigerator with Freezer",
    "description": "4.5 cu. ft. compact refrigerator perfect for dorms, offices, or small spaces with reversible door and adjustable thermostat.",
    "image": "./assets/electrolux-refrigerator-05.jpg",
    "price": 299.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "277",
    "name": "Electrolux 4.5 cu. ft. Front Load Washer with LuxCare Wash System",
    "description": "4.5 cu. ft. capacity with LuxCare Wash System, Perfect Steam technology, and 15-minute fast wash cycle for energy-efficient cleaning.",
    "image": "./assets/electrolux-washer-01.jpg",
    "price": 999.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "278",
    "name": "Electrolux 5.0 cu. ft. Top Load Washer with Quick Wash Cycle",
    "description": "5.0 cu. ft. top load washer with Quick Wash cycle, Perfect Steam option, and automatic detergent dispenser for convenient laundry care.",
    "image": "./assets/electrolux-washer-02.jpg",
    "price": 849.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "279",
    "name": "Electrolux 7.4 cu. ft. Electric Dryer with Perfect Steam",
    "description": "7.4 cu. ft. electric dryer with Perfect Steam technology to reduce wrinkles and odors, plus SensorDry system for precise drying results.",
    "image": "./assets/electrolux-dryer-01.jpg",
    "price": 899.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "280",
    "name": "Electrolux 7.0 cu. ft. Gas Dryer with LuxCare Dry System",
    "description": "7.0 cu. ft. gas dryer with LuxCare Dry System, multiple drying cycles, and reverse tumbling action to prevent tangling and improve drying efficiency.",
    "image": "./assets/electrolux-dryer-02.jpg",
    "price": 949.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "281",
    "name": "Electrolux 4.3 cu. ft. Washer Dryer Combo with Steam",
    "description": "4.3 cu. ft. all-in-one washer dryer combo with steam cleaning technology, perfect for apartments and homes without venting requirements.",
    "image": "./assets/electrolux-washer-dryer.jpg",
    "price": 1199.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "282",
    "name": "Electrolux 24\\",
    "description": "24-inch built-in dishwasher with LuxCare Wash System, 3rd rack for utensils, and ultra-quiet 44 dBA operation for perfect cleaning performance.",
    "image": "./assets/electrolux-dishwasher-01.jpg",
    "price": 799.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "283",
    "name": "Electrolux 24\\",
    "description": "Freestanding dishwasher with capacity for up to 15 place settings, multiple wash cycles, and delay start option for flexible scheduling.",
    "image": "./assets/electrolux-dishwasher-02.jpg",
    "price": 699.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "284",
    "name": "Electrolux 18\\",
    "description": "18-inch compact dishwasher perfect for small kitchens, apartments, or RVs with 6 place settings capacity and energy-efficient operation.",
    "image": "./assets/electrolux-dishwasher-03.jpg",
    "price": 499.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "285",
    "name": "Electrolux 24\\",
    "description": "Smart dishwasher with Wi-Fi connectivity, remote monitoring, cycle notifications, and adaptive wash technology for optimal performance.",
    "image": "./assets/electrolux-dishwasher-04.jpg",
    "price": 899.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "286",
    "name": "Electrolux 24\\",
    "description": "Panel-ready dishwasher designed to accept custom cabinet panels for seamless integration with kitchen cabinetry and a built-in look.",
    "image": "./assets/electrolux-dishwasher-05.jpg",
    "price": 1099.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "287",
    "name": "Electrolux 30\\",
    "description": "30-inch freestanding electric range with True Convection oven, 5 heating elements, and self-cleaning technology for versatile cooking.",
    "image": "./assets/electrolux-range-01.jpg",
    "price": 1299.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "288",
    "name": "Electrolux 30\\",
    "description": "30-inch gas range with 5 burners including power burner, convection oven, and continuous cast iron grates for professional cooking results.",
    "image": "./assets/electrolux-range-02.jpg",
    "price": 1199.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "289",
    "name": "Electrolux 36\\",
    "description": "36-inch induction cooktop with PowerBoost technology, precise temperature control, and automatic pan detection for fast, efficient cooking.",
    "image": "./assets/electrolux-cooktop-01.jpg",
    "price": 1599.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "290",
    "name": "Electrolux 30\\",
    "description": "30-inch single electric wall oven with True Convection heating, Perfect Turkey button, and easy clean enamel interior for precise baking.",
    "image": "./assets/electrolux-oven-01.jpg",
    "price": 1499.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "291",
    "name": "Electrolux 1.9 cu. ft. Over-the-Range Microwave with Sensor Cooking",
    "description": "1.9 cu. ft. over-the-range microwave with sensor cooking technology, 4-speed ventilation system, and LED lighting for kitchen efficiency.",
    "image": "./assets/electrolux-microwave-01.jpg",
    "price": 399.99,
    "brand": "Electrolux",
    "link": "./Electrolux-productpage.html"
  },
  {
    "id": "21",
    "name": "Haier 520L Black Glass 4-Door Lumiere Refrigerator",
    "description": "Premium 4-door refrigerator with black glass finish and advanced cooling technology.",
    "image": "./assets/haier-refrigerator-01.jpg",
    "price": 1100.0,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "22",
    "name": "Haier 340L French Door Refrigerator with Inverter Technology",
    "description": "Energy-efficient French door refrigerator with inverter compressor and spacious storage.",
    "image": "./assets/haier-refrigerator-02.jpg",
    "price": 950.0,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "23",
    "name": "Haier 253L Top Mount Freezer with Multi Air Flow",
    "description": "Compact top mount freezer refrigerator with Multi Air Flow cooling system for even temperature distribution.",
    "image": "./assets/haier-refrigerator-03.jpg",
    "price": 650.0,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "24",
    "name": "Haier 610L Side by Side Refrigerator with Water Dispenser",
    "description": "Large capacity side by side refrigerator with built-in water dispenser and ice maker.",
    "image": "./assets/haier-refrigerator-04.jpg",
    "price": 1450.0,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "215",
    "name": "Haier 7 Kg 5 Star Fully-Automatic Top Load Washing Machine HWM70-148NE",
    "description": "7kg capacity with pulsator wash technology, 10 wash programs, and child lock safety features for thorough cleaning.",
    "image": "assets/haier-washing-machine-01.jpg",
    "price": 499.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "216",
    "name": "Haier 8kg Fully-Automatic Front Load Washing Machine HWM80-BP14636N",
    "description": "8kg capacity front load washer with 1400 RPM spin speed, steam wash function, and smart inverter motor for quiet operation.",
    "image": "assets/haier-washing-machine-02.jpg",
    "price": 649.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "217",
    "name": "Haier 6.5 Kg Semi-Automatic Top Load Washing Machine HWM65-178NE",
    "description": "6.5kg semi-automatic washer with twin tub design, lint filter, and energy-efficient motor for budget-conscious buyers.",
    "image": "assets/haier-washing-machine-03.jpg",
    "price": 349.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "218",
    "name": "Haier 10kg 5 Star Fully-Automatic Top Load Washing Machine HWM100-178NE",
    "description": "10kg capacity heavy duty washer with inverter motor, multiple wash programs, and powerful cleaning performance for large families.",
    "image": "assets/haier-washing-machine-04.jpg",
    "price": 799.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "219",
    "name": "Haier 1.5 Ton 5 Star Inverter Split AC HSU19Y-NFA",
    "description": "1.5 Ton 5-star rated inverter split AC with anti-bacterial filter, self-diagnosis function, and energy-saving technology.",
    "image": "assets/haier-ac-split-01.jpg",
    "price": 629.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "220",
    "name": "Haier 2 Ton 3 Star Inverter Split AC HSU24Y-NFA",
    "description": "2 Ton inverter split AC with turbo cooling technology, sleep mode, and copper condenser coil for durability and performance.",
    "image": "assets/haier-ac-split-02.jpg",
    "price": 899.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "221",
    "name": "Haier 1.5 Ton 3 Star Window AC HWI18Y-NMA",
    "description": "1.5 Ton window AC with 3-star energy rating, turbo cool function, and easy installation for residential cooling needs.",
    "image": "assets/haier-ac-window.jpg",
    "price": 449.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "222",
    "name": "Haier 12,000 BTU Portable Air Conditioner with Dehumidifier",
    "description": "12,000 BTU portable AC with dehumidifier function, 3-in-1 cooling modes, and easy mobility with castor wheels for flexible cooling.",
    "image": "assets/haier-ac-portable.jpg",
    "price": 399.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "223",
    "name": "Haier 20L Solo Microwave Oven HMW-20MSS",
    "description": "20L capacity solo microwave with 5 power levels, mechanical controls, and child safety lock for basic cooking needs.",
    "image": "assets/haier-microwave-01.jpg",
    "price": 89.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "224",
    "name": "Haier 23L Grill Microwave Oven HMW-G23MSS",
    "description": "23L grill microwave with 700W cooking power, grill function, and multiple preset programs for versatile cooking options.",
    "image": "assets/haier-microwave-02.jpg",
    "price": 119.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "225",
    "name": "Haier 28L Convection Microwave Oven HMW-C28MSS",
    "description": "28L convection microwave with baking, grilling, and heating functions, touch controls, and auto cook menus for gourmet cooking.",
    "image": "assets/haier-microwave-03.jpg",
    "price": 179.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "226",
    "name": "Haier 15L 5 Star Storage Water Heater HWS-E15",
    "description": "15L capacity storage water heater with 5-star energy rating, glass-lined tank, and adjustable thermostat for efficient heating.",
    "image": "assets/haier-water-heater-01.jpg",
    "price": 149.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "227",
    "name": "Haier 25L 5 Star Storage Water Heater HWS-E25",
    "description": "25L capacity storage water heater with 5-star energy rating, anti-corrosion coating, and multi-function safety valve for family use.",
    "image": "assets/haier-water-heater-02.jpg",
    "price": 199.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "228",
    "name": "Haier 3L Instant Water Heater HIE-3L",
    "description": "3L instant water heater with compact design, auto cut-off protection, and energy-efficient heating for kitchen or hand wash use.",
    "image": "assets/haier-water-heater-03.jpg",
    "price": 259.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "229",
    "name": "Haier 360° Air Purifier with HEPA Filter HAP-360",
    "description": "360° air purifier with 3-stage filtration system, HEPA filter, and coverage area of 400 sq. ft. for clean indoor air quality.",
    "image": "assets/haier-air-purifier-01.jpg",
    "price": 199.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "230",
    "name": "Haier Smart Air Purifier with Wi-Fi Connectivity HAP-S500",
    "description": "Smart air purifier with Wi-Fi connectivity, PM2.5 display, auto mode, and coverage area of 600 sq. ft. for large rooms.",
    "image": "assets/haier-air-purifier-02.jpg",
    "price": 299.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "231",
    "name": "Haier 1.8L Automatic Rice Cooker HRC-18",
    "description": "1.8L capacity rice cooker with non-stick inner pot, keep warm function, and automatic shut-off for perfect rice every time.",
    "image": "assets/haier-rice-cooker.jpg",
    "price": 49.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "232",
    "name": "Haier 2000W Single Burner Induction Cooktop HIC-2000",
    "description": "2000W single burner induction cooktop with 8 power levels, timer function, and auto pan detection for efficient cooking.",
    "image": "assets/haier-induction-cooktop.jpg",
    "price": 79.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "234",
    "name": "Haier 800W Dry Vacuum Cleaner with HEPA Filter HVC-800",
    "description": "800W dry vacuum cleaner with HEPA filtration system, 4L dust capacity, and multiple attachments for thorough home cleaning.",
    "image": "assets/haier-vacuum-cleaner.jpg",
    "price": 129.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "235",
    "name": "Haier 1200W Wet & Dry Vacuum Cleaner HWD-1200",
    "description": "1200W wet and dry vacuum cleaner with 15L capacity, powerful suction, and auto shut-off feature for versatile cleaning needs.",
    "image": "assets/haier-wet-dry-vacuum.jpg",
    "price": 199.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "236",
    "name": "Haier 32-inch HD Ready Smart LED TV LET32C5500",
    "description": "32-inch HD Ready smart TV with built-in apps, voice control support, and multiple connectivity options for entertainment.",
    "image": "assets/haier-tv-32.jpg",
    "price": 249.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "237",
    "name": "Haier 43-inch 4K UHD Smart LED TV LET43C6500",
    "description": "43-inch 4K UHD smart TV with HDR10 support, Android TV platform, and gaming features with low input lag for premium viewing experience.",
    "image": "assets/haier-tv-43.jpg",
    "price": 399.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "238",
    "name": "Haier 2.1 Channel Sound Bar with Wireless Subwoofer HSB-21",
    "description": "2.1 channel sound bar with wireless subwoofer, Bluetooth connectivity, and multiple sound modes for enhanced audio experience with TVs.",
    "image": "assets/haier-soundbar.jpg",
    "price": 149.99,
    "brand": "Haier",
    "link": "./Haier-productpage.html"
  },
  {
    "id": "33",
    "name": "LG InstaView Door-in-Door Refrigerator with Craft Ice, 28 cu. ft.",
    "description": "28 cu. ft. capacity with InstaView Door-in-Door, Craft Ice maker, and SmartThinQ technology.",
    "image": "assets/lg-refrigerator-01.jpg",
    "price": 3299.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "34",
    "name": "LG 24 cu. ft. French Door Refrigerator with Ice Maker",
    "description": "24 cu. ft. French door refrigerator with PrintProof finish, Ice Maker, and Linear Cooling technology.",
    "image": "assets/lg-refrigerator-02.jpg",
    "price": 1899.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "35",
    "name": "LG 27 cu. ft. Side-by-Side Refrigerator with Water & Ice Dispenser",
    "description": "27 cu. ft. capacity with water and ice dispenser, Smart Cooling system, and energy efficient design.",
    "image": "assets/lg-refrigerator-03.jpg",
    "price": 2199.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "36",
    "name": "LG 20 cu. ft. Top Freezer Refrigerator with Smart Cooling",
    "description": "20 cu. ft. top freezer refrigerator with Smart Cooling, humidity-controlled crispers, and reversible door.",
    "image": "assets/lg-refrigerator-04.jpg",
    "price": 999.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "158",
    "name": "LG 10 cu. ft. Compact Refrigerator with Freezer",
    "description": "10 cu. ft. compact refrigerator perfect for dorms, offices, or small spaces with adjustable thermostat.",
    "image": "assets/lg-refrigerator-05.jpg",
    "price": 449.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "159",
    "name": "LG 22 cu. ft. Counter-Depth French Door Refrigerator",
    "description": "22 cu. ft. counter-depth design with InstaView window, Craft Ice maker, and Wi-Fi connectivity.",
    "image": "assets/lg-refrigerator-06.jpg",
    "price": 2799.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "160",
    "name": "LG 21 cu. ft. Bottom Freezer Refrigerator",
    "description": "21 cu. ft. bottom freezer refrigerator with Smart Inverter Compressor and Multi-Air Flow system.",
    "image": "assets/lg-refrigerator-07.jpg",
    "price": 1299.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "161",
    "name": "LG SIGNATURE 30 cu. ft. Smart InstaView Refrigerator",
    "description": "30 cu. ft. premium refrigerator with Smart InstaView™ door, dual ice makers, and AI technology.",
    "image": "assets/lg-refrigerator-08.jpg",
    "price": 5499.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "162",
    "name": "LG 5.2 cu. ft. Front Load Washer with TurboWash 360",
    "description": "5.2 cu. ft. capacity with TurboWash 360 technology, AI DD motor, and steam cleaning feature.",
    "image": "assets/lg-washer-01.jpg",
    "price": 1099.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "163",
    "name": "LG 5.0 cu. ft. Top Load Washer with TurboWash",
    "description": "5.0 cu. ft. top load washer with TurboWash technology, 6Motion technology, and SmartThinQ app.",
    "image": "assets/lg-washer-02.jpg",
    "price": 849.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "164",
    "name": "LG 2.3 cu. ft. Compact Front Load Washer",
    "description": "2.3 cu. ft. compact washer perfect for small spaces, apartments, or laundry rooms with limited space.",
    "image": "assets/lg-washer-03.jpg",
    "price": 649.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "165",
    "name": "LG 7.4 cu. ft. Electric Dryer with Sensor Dry",
    "description": "7.4 cu. ft. capacity electric dryer with Sensor Dry technology, SteamFresh cycle, and Wi-Fi connectivity.",
    "image": "assets/lg-dryer-01.jpg",
    "price": 899.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "166",
    "name": "LG 7.3 cu. ft. Gas Dryer with TrueSteam",
    "description": "7.3 cu. ft. gas dryer with TrueSteam technology to reduce wrinkles and odors, and SmartThinQ compatibility.",
    "image": "assets/lg-dryer-02.jpg",
    "price": 1099.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "167",
    "name": "LG 4.3 cu. ft. Front Load Washer Dryer Combo",
    "description": "4.3 cu. ft. all-in-one washer dryer combo perfect for apartments with no venting required.",
    "image": "assets/lg-washer-dryer-combo.jpg",
    "price": 1299.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "168",
    "name": "LG 5.0 cu. ft. Washer and 7.4 cu. ft. Dryer WashTower",
    "description": "Integrated washer and dryer tower with AI-powered features, steam technology, and space-saving design.",
    "image": "assets/lg-washtower.jpg",
    "price": 1899.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "169",
    "name": "LG 1.0 cu. ft. Portable Mini Washer",
    "description": "1.0 cu. ft. portable mini washer perfect for small loads, travel, or dorm rooms with compact design.",
    "image": "assets/lg-mini-washer.jpg",
    "price": 249.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "170",
    "name": "LG 1.5 Ton Dual Inverter Split AC with AI Plus Convertible",
    "description": "1.5 Ton 5-star rated split AC with Dual Inverter technology, AI Plus Convertible cooling, and quiet operation.",
    "image": "assets/lg-ac-split-01.jpg",
    "price": 799.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "171",
    "name": "LG 2 Ton 5 Star Dual Inverter Split AC",
    "description": "2 Ton capacity with Dual Inverter technology, Ocean Black Fin protection, and Wi-Fi connectivity.",
    "image": "assets/lg-ac-split-02.jpg",
    "price": 1199.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "172",
    "name": "LG 1.5 Ton Window AC with 4-in-1 Convertible Cooling",
    "description": "1.5 Ton 3-star rated window AC with 4-in-1 convertible cooling modes and Auto Clean function.",
    "image": "assets/lg-ac-window.jpg",
    "price": 599.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "173",
    "name": "LG 10,000 BTU Portable Air Conditioner with Dehumidifier",
    "description": "10,000 BTU portable AC with dehumidifier function, Wi-Fi connectivity, and easy mobility with wheels.",
    "image": "assets/lg-ac-portable.jpg",
    "price": 449.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "174",
    "name": "LG 2.5 Ton Cassette Air Conditioner for Commercial Use",
    "description": "2.5 Ton commercial cassette AC with multi-directional airflow, energy efficient operation, and quiet performance.",
    "image": "assets/lg-ac-cassette.jpg",
    "price": 1899.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "175",
    "name": "LG 3.5 Ton Multi Split Inverter AC System",
    "description": "3.5 Ton multi-split system with inverter technology, 3 indoor units included, perfect for multiple rooms.",
    "image": "assets/lg-ac-inverter-v.jpg",
    "price": 2499.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "176",
    "name": "LG 1.8 Ton Dual Cool Inverter AC with Himalaya Cooling",
    "description": "1.8 Ton dual cool inverter AC with Himalaya Cooling technology for extreme temperature performance.",
    "image": "assets/lg-ac-dual-cool.jpg",
    "price": 949.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "177",
    "name": "LG 1.2 Ton AI ThinQ Smart Air Conditioner",
    "description": "1.2 Ton AI-powered smart AC with ThinQ technology, voice control, and energy monitoring features.",
    "image": "assets/lg-ac-ai.jpg",
    "price": 849.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "178",
    "name": "LG OLED evo C3 55-inch 4K Smart TV",
    "description": "55-inch OLED TV with α9 AI Processor, Dolby Vision IQ, and gaming features with 120Hz refresh rate.",
    "image": "assets/lg-tv-oled.jpg",
    "price": 1299.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "179",
    "name": "LG QNED90 65-inch 4K Smart TV",
    "description": "65-inch QNED TV with Quantum Dot NanoCell technology, Full Array Dimming Pro, and webOS smart platform.",
    "image": "assets/lg-tv-qnhd.jpg",
    "price": 1599.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "180",
    "name": "LG UHD 70 Series 50-inch Smart TV",
    "description": "50-inch UHD TV with webOS, AI Sound Pro, Filmmaker Mode, and gaming features with low input lag.",
    "image": "assets/lg-tv-ur90.jpg",
    "price": 449.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "181",
    "name": "LG S95QR 9.1.5 Channel Sound Bar with Dolby Atmos",
    "description": "Premium 9.1.5 channel sound bar with Dolby Atmos, wireless surround speakers, and Meridian Audio technology.",
    "image": "assets/lg-soundbar.jpg",
    "price": 1299.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "182",
    "name": "LG CineBeam HU715Q 4K UHD Laser Projector",
    "description": "4K UHD laser projector with 2,000 lumens brightness, smart features, and compact design for home theater.",
    "image": "assets/lg-projector.jpg",
    "price": 1999.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "183",
    "name": "LG StanbyME 27-inch Portable TV with Touch Screen",
    "description": "27-inch portable touch screen TV with battery operation, smart connectivity, and versatile mounting options.",
    "image": "assets/lg-stanbyme.jpg",
    "price": 699.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "184",
    "name": "LG OLED evo G3 77-inch 4K Smart TV",
    "description": "77-inch premium OLED TV with Brightness Booster Max, α9 AI Processor Gen6, and gallery design.",
    "image": "assets/lg-tv-g3.jpg",
    "price": 3499.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "185",
    "name": "LG QNED99 Mini LED 86-inch 8K Smart TV",
    "description": "86-inch 8K QNED Mini LED TV with advanced backlighting, AI upscaling, and premium gaming features.",
    "image": "assets/lg-tv-mini-led.jpg",
    "price": 4999.99,
    "brand": "LG",
    "link": "./LG-productpage.html"
  },
  {
    "id": "45",
    "name": "Panasonic 537L Prime+ 4-Door Refrigerator NR-YW590YMMS",
    "description": "Premium 4-door refrigerator with Prime Freeze and nanoe™ X technology for superior food preservation.",
    "image": "./assets/panasonic-refrigerator-01.jpg",
    "price": 1960.0,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "46",
    "name": "Panasonic 401L Double Door Refrigerator NR-BK468BGMN",
    "description": "Energy-efficient double door refrigerator with Fresh Safe Vegetable Case and mirror glass finish.",
    "image": "./assets/panasonic-refrigerator-02.jpg",
    "price": 864.0,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "47",
    "name": "Panasonic 650L 6-Door Refrigerator NR-BW530HVSS",
    "description": "Large capacity 6-door refrigerator with advanced cooling zones and energy-saving inverter technology.",
    "image": "./assets/panasonic-refrigerator-03.jpg",
    "price": 2150.0,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "48",
    "name": "Panasonic 253L Top Mount Freezer Refrigerator",
    "description": "Compact top mount freezer with Multi Air Flow cooling system for consistent temperature throughout.",
    "image": "./assets/panasonic-refrigerator-04.jpg",
    "price": 580.0,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "190",
    "name": "Panasonic 7 Kg 5 Star Fully-Automatic Top Load Washing Machine NA-F70LF4CRB",
    "description": "7kg capacity with Active Foam Wash technology, 12 wash programs, and antibacterial features for thorough cleaning.",
    "image": "assets/panasonic-washing-machine-01.jpg",
    "price": 549.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "191",
    "name": "Panasonic 8kg Front Load Washing Machine with Inverter Motor",
    "description": "8kg capacity front load washer with inverter motor, steam cleaning function, and energy-efficient operation.",
    "image": "assets/panasonic-washing-machine-02.jpg",
    "price": 699.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "192",
    "name": "Panasonic 6.5kg Compact Fully-Automatic Top Load Washing Machine",
    "description": "6.5kg capacity compact washer with Japanese technology, stainless steel drum, and multiple wash programs for small spaces.",
    "image": "assets/panasonic-washing-machine-03.jpg",
    "price": 449.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "193",
    "name": "Panasonic 10kg Heavy Duty Washing Machine with Eco Mode",
    "description": "10kg capacity heavy duty washer with eco mode, quick wash option, and child lock safety features for large families.",
    "image": "assets/panasonic-washing-machine-04.jpg",
    "price": 899.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "194",
    "name": "Panasonic 1.5 Ton 5 Star Inverter Split AC CS/CU-NU18YKY5W",
    "description": "1.5 Ton 5-star rated inverter split AC with PM 2.5 filter, nanoe-G air purification, and smart cooling technology.",
    "image": "assets/panasonic-ac-split-01.jpg",
    "price": 699.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "195",
    "name": "Panasonic 2 Ton 3 Star Inverter Split AC CS/CU-TU24UKY5W",
    "description": "2 Ton inverter split AC with twin cool inverter technology, powerful cooling performance, and energy-efficient operation.",
    "image": "assets/panasonic-ac-split-02.jpg",
    "price": 999.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "196",
    "name": "Panasonic 1.2 Ton 3 Star Window AC CW-LU1221A4W",
    "description": "1.2 Ton window AC with powerful cooling performance, auto restart function, and easy installation for residential use.",
    "image": "assets/panasonic-ac-window.jpg",
    "price": 499.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "197",
    "name": "Panasonic 1 Ton Portable Air Conditioner with Dehumidifier",
    "description": "1 Ton portable AC with dehumidifier function, 4-in-1 cooling modes, and easy mobility for temporary cooling needs.",
    "image": "assets/panasonic-ac-portable.jpg",
    "price": 399.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "198",
    "name": "Panasonic 43-inch 4K UHD Smart LED TV TH-43JX650DX",
    "description": "43-inch 4K UHD smart TV with built-in apps, voice control support, and multiple connectivity options for home entertainment.",
    "image": "assets/panasonic-tv-43.jpg",
    "price": 349.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "199",
    "name": "Panasonic 55-inch 4K UHD Smart LED TV with Google TV",
    "description": "55-inch 4K UHD smart TV with Google TV platform, HDR10+ support, and voice remote for seamless entertainment experience.",
    "image": "assets/panasonic-tv-55.jpg",
    "price": 599.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "200",
    "name": "Panasonic 65-inch 4K UHD Smart LED TV with AI Sound Pro",
    "description": "65-inch premium 4K UHD smart TV with AI Sound Pro technology, Dolby Vision IQ, and gaming features with low input lag.",
    "image": "assets/panasonic-tv-65.jpg",
    "price": 899.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "201",
    "name": "Panasonic 2.1 Channel Sound Bar with Wireless Subwoofer SC-HTB80",
    "description": "2.1 channel sound bar with wireless subwoofer, Bluetooth connectivity, and multiple sound modes for enhanced audio experience.",
    "image": "assets/panasonic-soundbar.jpg",
    "price": 249.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "202",
    "name": "Panasonic LUMIX S5 II Full-Frame Mirrorless Camera with 24-105mm Lens",
    "description": "Full-frame mirrorless camera with outstanding video specs, phase detection autofocus, and hybrid shooting capabilities.",
    "image": "assets/panasonic-camera-s5ii.jpg",
    "price": 2199.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "203",
    "name": "Panasonic LUMIX GH7 Micro Four Thirds Camera Body Only",
    "description": "Professional Micro Four Thirds camera with 6K video recording, advanced autofocus system, and durable magnesium alloy body.",
    "image": "assets/panasonic-camera-gh7.jpg",
    "price": 1799.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "204",
    "name": "Panasonic LUMIX ZS200 20.1MP Digital Camera with 15X Zoom",
    "description": "Compact digital camera with 20.1MP sensor, 15X optical zoom, 4K video recording, and pocket-friendly design for travel photography.",
    "image": "assets/panasonic-camera-compact.jpg",
    "price": 699.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "205",
    "name": "Panasonic LUMIX G100 Vlogging Camera with 12-32mm Lens",
    "description": "Vlogging-focused camera with OZO Audio technology, 4K video recording, and flip-out screen optimized for content creators.",
    "image": "assets/panasonic-camera-g100.jpg",
    "price": 649.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "206",
    "name": "Panasonic 27L Countertop Microwave Oven with Sensor Cooking",
    "description": "27L capacity microwave oven with sensor cooking technology, inverter technology, and multiple preset programs for easy meal preparation.",
    "image": "assets/panasonic-microwave.jpg",
    "price": 149.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "207",
    "name": "Panasonic 5-Cup Rice Cooker with Fuzzy Logic Technology SR-FF101",
    "description": "5-cup capacity rice cooker with fuzzy logic technology, multiple cooking functions, and non-stick inner pot for perfect rice every time.",
    "image": "assets/panasonic-rice-cooker.jpg",
    "price": 89.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "208",
    "name": "Panasonic 4.7L Digital Air Fryer with 8 Preset Programs",
    "description": "4.7L capacity air fryer with digital touch controls, 8 preset cooking programs, and rapid air circulation for healthy cooking.",
    "image": "assets/panasonic-air-fryer.jpg",
    "price": 119.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "209",
    "name": "Panasonic 1200W High-Speed Blender with Nutri Crush Technology",
    "description": "1200W high-speed blender with Nutri Crush technology, variable speed control, and stainless steel blades for smoothies and food preparation.",
    "image": "assets/panasonic-blender.jpg",
    "price": 129.99,
    "brand": "Panasonic",
    "link": "./Panasonic-productpage.html"
  },
  {
    "id": "146",
    "name": "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    "description": "Industry-leading noise cancellation with 30-hour battery life and premium sound",
    "image": "./assets/sony-headphones-01.jpg",
    "price": 399.99,
    "brand": "Sony",
    "link": "./Sony-productpage.html"
  },
  {
    "id": "147",
    "name": "Sony WF-1000XM5 Wireless Noise Canceling Earbuds",
    "description": "Advanced noise cancellation with Integrated Processor V2 and LDAC support",
    "image": "./assets/sony-headphones-02.jpg",
    "price": 299.99,
    "brand": "Sony",
    "link": "./Sony-productpage.html"
  },
  {
    "id": "148",
    "name": "Sony WH-CH720N Wireless Noise Canceling Headphones",
    "description": "Lightweight design with Dual Noise Sensor technology and 35-hour battery life",
    "image": "./assets/sony-headphones-03.jpg",
    "price": 149.99,
    "brand": "Sony",
    "link": "./Sony-productpage.html"
  },
  {
    "id": "149",
    "name": "Sony WF-C510 Wireless Bluetooth Earbuds",
    "description": "All-day comfort with IPX4 water resistance and 20-hour battery life with case",
    "image": "./assets/sony-headphones-04.jpg",
    "price": 99.99,
    "brand": "Sony",
    "link": "./Sony-productpage.html"
  },
  {
    "id": "150",
    "name": "Sony Alpha 1 II Full-Frame Mirrorless Camera",
    "description": "Second-generation flagship with 50.1MP sensor and 120fps continuous shooting",
    "image": "./assets/sony-camera-01.jpg",
    "price": 6499.0,
    "brand": "Sony",
    "link": "./Sony-productpage.html"
  },
  {
    "id": "151",
    "name": "Sony Alpha 7C II Full-Frame Mirrorless Camera",
    "description": "Compact full-frame camera with 33.0MP sensor and AI-based subject recognition",
    "image": "./assets/sony-camera-02.jpg",
    "price": 1999.0,
    "brand": "Sony",
    "link": "./Sony-productpage.html"
  },
  {
    "id": "152",
    "name": "Sony Alpha ZV-E10 APS-C Mirrorless Camera",
    "description": "Vlogging-focused camera with 24.2MP APS-C sensor and real-time tracking",
    "image": "./assets/sony-camera-03.jpg",
    "price": 799.99,
    "brand": "Sony",
    "link": "./Sony-productpage.html"
  },
  {
    "id": "153",
    "name": "Sony PlayStation 5 Digital Edition",
    "description": "Next-gen gaming with ultra-high speed SSD and Tempest 3D AudioTech",
    "image": "./assets/sony-gaming-01.jpg",
    "price": 685.99,
    "brand": "Sony",
    "link": "./Sony-productpage.html"
  },
  {
    "id": "302",
    "name": "Whirlpool 25 cu. ft. French Door Refrigerator with Water & Ice Dispenser",
    "description": "25 cu. ft. capacity with external water and ice dispenser, adaptive defrost system, and fingerprint-resistant stainless steel finish.",
    "image": "assets/whirlpool-refrigerator-01.jpg",
    "price": 1799.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "303",
    "name": "Whirlpool 24.5 cu. ft. Side-by-Side Refrigerator with Ice Maker",
    "description": "24.5 cu. ft. side-by-side refrigerator with built-in ice maker, adjustable glass shelves, and spill-proof shelves for easy cleaning.",
    "image": "assets/whirlpool-refrigerator-02.jpg",
    "price": 1499.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "304",
    "name": "Whirlpool 18.2 cu. ft. Top Freezer Refrigerator",
    "description": "18.2 cu. ft. top freezer refrigerator with adjustable temperature controls, humidity-controlled crispers, and energy-efficient operation.",
    "image": "assets/whirlpool-refrigerator-03.jpg",
    "price": 899.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "305",
    "name": "Whirlpool 21.0 cu. ft. Bottom Freezer Refrigerator",
    "description": "21.0 cu. ft. bottom freezer refrigerator with adjustable slide-under shelves, gallon door storage, and electronic temperature controls.",
    "image": "assets/whirlpool-refrigerator-04.jpg",
    "price": 1299.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "306",
    "name": "Whirlpool 22.3 cu. ft. Counter-Depth French Door Refrigerator",
    "description": "Premium counter-depth refrigerator with fingerprint-resistant finish, external ice and water dispenser, and integrated design for modern kitchens.",
    "image": "assets/whirlpool-refrigerator-05.jpg",
    "price": 2199.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "307",
    "name": "Whirlpool 4.5 cu. ft. Front Load Washer with Load & Go XL",
    "description": "4.5 cu. ft. capacity with Load & Go XL dispenser that holds enough detergent for 20+ loads, plus steam clean option and energy-efficient operation.",
    "image": "assets/whirlpool-washer-01.jpg",
    "price": 999.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "308",
    "name": "Whirlpool 5.3 cu. ft. Top Load Washer with Deep Fill Option",
    "description": "5.3 cu. ft. top load washer with Deep Fill option for extra water, automatic fabric softener dispenser, and 12 wash cycles for versatile cleaning.",
    "image": "assets/whirlpool-washer-02.jpg",
    "price": 849.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "309",
    "name": "Whirlpool 2.3 cu. ft. Compact Front Load Washer",
    "description": "2.3 cu. ft. compact washer perfect for small spaces, apartments, or laundry rooms with limited space, featuring 12 wash cycles and quiet operation.",
    "image": "assets/whirlpool-washer-03.jpg",
    "price": 649.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "310",
    "name": "Whirlpool 5.5 cu. ft. Front Load Washer with Steam Clean",
    "description": "Extra-large capacity washer with steam clean technology, 12 wash cycles, and energy-efficient operation with low water usage for large families.",
    "image": "assets/whirlpool-washer-04.jpg",
    "price": 1099.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "311",
    "name": "Whirlpool 4.8 cu. ft. Smart Front Load Washer with Wi-Fi",
    "description": "Smart washer with Wi-Fi connectivity, remote monitoring via app, automatic detergent sensing, and adaptive wash technology for precise cleaning.",
    "image": "assets/whirlpool-washer-05.jpg",
    "price": 1199.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "312",
    "name": "Whirlpool 7.4 cu. ft. Electric Dryer with Steam Refresh",
    "description": "7.4 cu. ft. electric dryer with Steam Refresh cycle to reduce wrinkles and odors, 12 drying cycles, and auto dry sensing technology.",
    "image": "assets/whirlpool-dryer-01.jpg",
    "price": 899.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "313",
    "name": "Whirlpool 7.0 cu. ft. Gas Dryer with Quick Dry Cycle",
    "description": "7.0 cu. ft. gas dryer with Quick Dry cycle for faster drying times, adjustable temperature settings, and energy-efficient operation with automatic shutoff.",
    "image": "assets/whirlpool-dryer-02.jpg",
    "price": 949.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "314",
    "name": "Whirlpool 4.3 cu. ft. Compact Electric Dryer",
    "description": "4.3 cu. ft. compact electric dryer perfect for small spaces, featuring 4 drying cycles, adjustable temperature control, and easy installation.",
    "image": "assets/whirlpool-dryer-03.jpg",
    "price": 599.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "315",
    "name": "Whirlpool 7.0 cu. ft. Stackable Electric Dryer",
    "description": "Stackable electric dryer designed to pair with Whirlpool stackable washer, featuring 12 drying cycles, end-of-cycle signal, and large capacity for family needs.",
    "image": "assets/whirlpool-dryer-04.jpg",
    "price": 849.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "316",
    "name": "Whirlpool 7.4 cu. ft. Smart Electric Dryer with Wi-Fi",
    "description": "Smart electric dryer with Wi-Fi connectivity, remote cycle monitoring, automatic fabric sensing, and energy usage tracking for efficient drying.",
    "image": "assets/whirlpool-dryer-05.jpg",
    "price": 1099.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "317",
    "name": "Whirlpool 24\\",
    "description": "24-inch built-in dishwasher with Fan Dry option for better drying performance, 1-hour wash cycle, and quiet 52 dBA operation with adjustable racks.",
    "image": "assets/whirlpool-dishwasher-01.jpg",
    "price": 599.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "318",
    "name": "Whirlpool 24\\",
    "description": "Stainless steel dishwasher with soil sensor that automatically adjusts cycle time and water usage based on load dirtiness, plus sanitize option for germ elimination.",
    "image": "assets/whirlpool-dishwasher-02.jpg",
    "price": 699.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "319",
    "name": "Whirlpool 18\\",
    "description": "18-inch portable countertop dishwasher perfect for apartments, RVs, or small kitchens, featuring 6 wash cycles and compact design with wheels for easy mobility.",
    "image": "assets/whirlpool-dishwasher-03.jpg",
    "price": 399.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "320",
    "name": "Whirlpool 24\\",
    "description": "Smart dishwasher with Wi-Fi connectivity, remote start/stop, cycle notifications, and adaptive wash technology that senses load size and soil level.",
    "image": "assets/whirlpool-dishwasher-04.jpg",
    "price": 799.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "321",
    "name": "Whirlpool 24\\",
    "description": "Ultra-quiet dishwasher operating at just 41 dBA with ProWash cycle that automatically adjusts to soil level, plus third-level rack for additional loading capacity.",
    "image": "assets/whirlpool-dishwasher-05.jpg",
    "price": 899.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "322",
    "name": "Whirlpool 30\\",
    "description": "30-inch freestanding electric range with 5 heating elements including warming zone, convection oven, and ceramic glass cooktop for versatile cooking options.",
    "image": "assets/whirlpool-range-01.jpg",
    "price": 899.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "323",
    "name": "Whirlpool 30\\",
    "description": "30-inch gas range with 5 burners including power burner, convection oven with true convection technology, and continuous cast iron grates for professional cooking results.",
    "image": "assets/whirlpool-range-02.jpg",
    "price": 999.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "324",
    "name": "Whirlpool 30\\",
    "description": "30-inch built-in electric cooktop with 4 heating elements, hot surface indicator lights, and smooth ceramic glass surface for easy cleaning and modern kitchen design.",
    "image": "assets/whirlpool-cooktop-01.jpg",
    "price": 499.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "325",
    "name": "Whirlpool 30\\",
    "description": "30-inch single electric wall oven with true convection heating, broil element, and easy clean enamel interior for precise baking and roasting results.",
    "image": "assets/whirlpool-oven-01.jpg",
    "price": 1199.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "326",
    "name": "Whirlpool 1.9 cu. ft. Over-the-Range Microwave with Sensor Cooking",
    "description": "1.9 cu. ft. over-the-range microwave with sensor cooking technology, 4-speed ventilation system, and LED cooktop lighting for kitchen efficiency and convenience.",
    "image": "assets/whirlpool-microwave-01.jpg",
    "price": 349.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "327",
    "name": "Whirlpool 1.5 Ton 5 Star Inverter Split AC with 6th Sense Technology",
    "description": "1.5 Ton 5-star rated inverter split AC with 6th Sense technology that adapts to room conditions, turbo cooling mode, and energy-efficient operation for home comfort.",
    "image": "assets/whirlpool-ac-split-01.jpg",
    "price": 749.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "328",
    "name": "Whirlpool 1.2 Ton 3 Star Window AC with Auto Restart",
    "description": "1.2 Ton window AC with 3-star energy rating, auto restart function, 4-way air deflection, and easy installation for residential cooling needs in moderate climates.",
    "image": "assets/whirlpool-ac-window-01.jpg",
    "price": 449.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "329",
    "name": "Whirlpool 10,000 BTU Portable Air Conditioner with Dehumidifier",
    "description": "10,000 BTU portable air conditioner with dehumidifier function, 24-hour timer, and easy mobility with castor wheels for flexible cooling in rooms up to 300 sq. ft.",
    "image": "assets/whirlpool-ac-portable-01.jpg",
    "price": 399.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "330",
    "name": "Whirlpool 1.1 cu. ft. Countertop Microwave with 10 Power Levels",
    "description": "1.1 cu. ft. countertop microwave with 10 power levels, 6 quick-set cooking options, and child safety lock for family-friendly operation and easy meal preparation.",
    "image": "assets/whirlpool-microwave-02.jpg",
    "price": 129.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "331",
    "name": "Whirlpool 600W Professional Series Blender with Variable Speed",
    "description": "600W professional blender with variable speed control, pulse function, and BPA-free Tritan jar for smoothies, soups, and food preparation with easy-to-clean design.",
    "image": "assets/whirlpool-blender.jpg",
    "price": 89.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "332",
    "name": "Whirlpool 12-Cup Programmable Coffee Maker with Auto Pause",
    "description": "12-cup programmable coffee maker with auto pause feature, customizable brew strength, 24-hour timer, and automatic shutoff for convenient morning coffee preparation.",
    "image": "assets/whirlpool-coffee-maker.jpg",
    "price": 79.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "333",
    "name": "Whirlpool 2-Slice Toaster with Extra-Wide Slots and Defrost Function",
    "description": "2-slice toaster with extra-wide slots for bagels and thick bread, defrost function, 7 shade settings, and removable crumb tray for easy cleaning and versatile use.",
    "image": "assets/whirlpool-toaster.jpg",
    "price": 49.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "334",
    "name": "Whirlpool 42-inch Tower Fan with Remote Control and 3 Speeds",
    "description": "42-inch tower fan with oscillation function, 3 speed settings, remote control operation, and quiet performance for comfortable room cooling during warm weather.",
    "image": "assets/whirlpool-fan.jpg",
    "price": 129.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "335",
    "name": "Whirlpool Air Purifier with True HEPA Filter and Air Quality Monitor",
    "description": "True HEPA air purifier with air quality monitor, 3-stage filtration system, and coverage area of 300 sq. ft. for removing allergens, dust, and odors from indoor air.",
    "image": "assets/whirlpool-air-purifier.jpg",
    "price": 199.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "336",
    "name": "Whirlpool PetPro Upright Vacuum Cleaner with HEPA Filtration",
    "description": "PetPro upright vacuum with HEPA filtration system, tangle-free brush roll, and specialized pet tools for removing pet hair and dander from carpets and upholstery effectively.",
    "image": "assets/whirlpool-vacuum-01.jpg",
    "price": 179.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "337",
    "name": "Whirlpool Freedom Cordless Stick Vacuum with 40-Minute Runtime",
    "description": "Cordless stick vacuum with 40-minute runtime, LED headlights, wall-mountable charging dock, and convertible design for handheld use on stairs and furniture cleaning.",
    "image": "assets/whirlpool-vacuum-02.jpg",
    "price": 249.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "338",
    "name": "Whirlpool RoboClean Robot Vacuum with Mapping Technology",
    "description": "RoboClean robot vacuum with smart mapping technology, automatic recharging, scheduled cleaning, and app control for hands-free home cleaning on various floor surfaces.",
    "image": "assets/whirlpool-vacuum-03.jpg",
    "price": 299.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "339",
    "name": "Whirlpool QuietClean Canister Vacuum with HEPA Filter",
    "description": "QuietClean canister vacuum with HEPA filtration, retractable cord, adjustable suction control, and multiple attachments for thorough cleaning of hard floors and carpets.",
    "image": "assets/whirlpool-vacuum-04.jpg",
    "price": 229.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "340",
    "name": "Whirlpool 40,000 Gall Whole House Water Filter System",
    "description": "Whole house water filtration system that removes sediment, chlorine, and other contaminants for cleaner water throughout your home with 40,000-gallon capacity.",
    "image": "assets/whirlpool-water-filter.jpg",
    "price": 349.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "341",
    "name": "Whirlpool 48,000 Grain Water Softener System",
    "description": "48,000 grain capacity water softener system that removes hardness minerals, reduces scale buildup, and provides softer water for bathing and cleaning with automatic regeneration.",
    "image": "assets/whirlpool-water-softener.jpg",
    "price": 799.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "342",
    "name": "Whirlpool 33 lb. Portable Ice Maker with Self-Cleaning Function",
    "description": "Portable ice maker that produces up to 33 pounds of ice per day, with self-cleaning function, 3 ice cube sizes, and compact design perfect for parties and outdoor events.",
    "image": "assets/whirlpool-ice-maker.jpg",
    "price": 249.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "343",
    "name": "Whirlpool 7 cu. ft. Chest Freezer with Defrost Drain",
    "description": "7 cu. ft. chest freezer with defrost drain, adjustable temperature control, and energy-efficient operation perfect for extra frozen food storage in garages or basements.",
    "image": "assets/whirlpool-freezer.jpg",
    "price": 399.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "344",
    "name": "Whirlpool 50-Pint Dehumidifier with Continuous Drainage",
    "description": "50-pint dehumidifier with continuous drainage option, auto restart after power outages, and adjustable humidity control for basements and damp areas up to 3,000 sq. ft.",
    "image": "assets/whirlpool-dehumidifier.jpg",
    "price": 229.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "345",
    "name": "Whirlpool 8,000 BTU Window Air Conditioner with Remote Control",
    "description": "8,000 BTU window air conditioner with remote control, 3 cooling speeds, 3 fan speeds, and 24-hour timer for efficient cooling of rooms up to 350 sq. ft.",
    "image": "assets/whirlpool-air-conditioner.jpg",
    "price": 279.99,
    "brand": "Whirlpool",
    "link": "./Whirlpool-productpage.html"
  },
  {
    "id": "200",
    "name": "Samsung Smart TV",
    "description": "Crystal UHD 4K display with voice assistant",
    "image": "assets/download (1).jfif",
    "price": 499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "2",
    "name": "LG 5 Black Steel Electric",
    "description": "All-in-One Washer Dryer Combo electricity efficient",
    "image": "assets/a009147a-43bd-403b-a775-48a8f79672be.edcbfd908d3d7e41e9a2dd308515d15c.webp",
    "price": 1999.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "3",
    "name": "Panasonic 1.3 Countertop",
    "description": "Microwave Multi Oven, Genius Sensor technology",
    "image": "assets/1-3-Cu-Ft-MWO_4d975190-b1eb-4dc4-8dac-c39521d71586.43973790c8af8e33c7281ca990a57a8d.avif",
    "price": 249.95,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "4",
    "name": "LG Smart Refrigerator",
    "description": "Energy efficient with digital cooling system",
    "image": "assets/download (2).jfif",
    "price": 1099.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "5",
    "name": "Enboya Robot Vacuum Cleaner",
    "description": "Wi-Fi/App/Voice Control, Smart Vacuum",
    "image": "assets/Enboya-D60-Robot-Vacuum-Cleaner-Self-Emptying-Base-85-Days-Dust-Powerful-9000Pa-Suction-Wi-Fi-App-Voice-Control-Smart-Robotic-Vacuum-Ideal-Hard-Floor_275feb17-afc2-4b1.avif",
    "price": 159.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "6",
    "name": "Mini Split Air Conditioner",
    "description": "115V Split ac unit with Remote AC Cool Up to 650",
    "image": "assets/9000BTU-Mini-Split-Air-Conditioner-Heat-Pump-19-SEER2-115V-Split-ac-unit-Remote-AC-Cool-650-Sq-Ft-Variable-Frequency-Cooling-Heating-R32-Refrigerant_c1da34ba-646d-4f70.avif",
    "price": 359.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "7",
    "name": "Cappuccino Latte Machines with Automatic Milk",
    "description": "Energy efficient",
    "image": "assets/AIRMSEN-Espresso-Machine-Color-Touchscreen-20-Bar-Cappuccino-Latte-Machines-Automatic-Milk-Frother-Dual-Boiler-Stainless-Steel-Espresso-Maker-Home-13_a342ee2a-d879-486.avif",
    "price": 139.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "8",
    "name": "Portable Countertop Dishwasher",
    "description": "5-Liter Built-in Water Tank",
    "image": "assets/Simzlife-Portable-Mini-Dishwasher-Countertop-with-5-Liter-Built-in-Water-Tank-and-Air-Dry-Function-5-Washing-Programs-4-Place-Setting_8e7fbb03-2aee-4817-a6d8-4920d4c24.avif",
    "price": 245.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "400",
    "name": "RT6300C Top Mount Freezer with Optimal Fresh+, 411L",
    "description": "411L top mount freezer refrigerator with Optimal Fresh+ technology.",
    "image": "assets/samsung-refrigerator-01.jpg",
    "price": 1099.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "401",
    "name": "RS50N3913BC/EU with Home Bar and All-around Cooling, 501L",
    "description": "Home Bar access and All-around Cooling technology.",
    "image": "assets/samsung-refrigerator-02.jpg",
    "price": 1079.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "402",
    "name": "635L SBS No-Frost Refrigerator with Water Dispenser",
    "description": "Side-by-Side No-Frost Refrigerator with Water Dispenser.",
    "image": "./assets/samsung-refrigerator-03.jpg",
    "price": 1799.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "403",
    "name": "655L SBS No-Frost Refrigerator with All-around Cooling",
    "description": "Side-by-Side No-Frost Refrigerator with All-around Cooling.",
    "image": "./assets/samsung-refrigerator-04.jpg",
    "price": 1687.6,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "404",
    "name": "AR9500T Wall-mount AC with Fast Cooling",
    "description": "Wall-mount air conditioner with Fast Cooling technology.",
    "image": "./assets/samsung-AC-01.jpg",
    "price": 869.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "405",
    "name": "18,000 BTU - Wall-mount AC with DIT, Wind-Free™ , T3 Climate Class",
    "description": "Wall-mount AC with Digital Inverter Technology, Wind-Free™ Cooling, and T3 Climate Class.",
    "image": "./assets/samsung-AC-02.jpg",
    "price": 819.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "406",
    "name": "24,000 BTU - Wall-mount AC with DIT , T3 Climate Class",
    "description": "2-ton inverter AC with Digital Inverter Technology for efficient cooling in high-temperature climates up to 45m².",
    "image": "./assets/samsung-AC-03.jpg",
    "price": 1238.28,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "407",
    "name": "12,000 BTU - Wall-mount AC with DIT , T3 Climate Class",
    "description": "12,000 BTU wall-mount AC with Digital Inverter Technology and T3 Climate Class for high-temperature environments.",
    "image": "./assets/samsung-AC-04.jpg",
    "price": 742.97,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "408",
    "name": "WA80CK4240BWRT with DIT, 8 Kg",
    "description": "8 kg top-load washing machine with Digital Inverter Technology and Eco Bubble™.",
    "image": "./assets/samsung-laundry-04.jpg",
    "price": 389.17,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "409",
    "name": "WW70T4020EE/NQ with Eco Bubble and Hygiene Steam, 7 Kg",
    "description": "7 Kg washing machine with Eco Bubble and Hygiene Steam.",
    "image": "./assets/samsung-laundry-01.jpg",
    "price": 689.9,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "410",
    "name": "WD70TA046BX/FA with Eco Bubble™ and AirWash, 7+5 Kg",
    "description": "7+5 Kg washer-dryer with Eco Bubble™ and AirWash technology.",
    "image": "./assets/samsung-laundry-02.jpg",
    "price": 1171.06,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "411",
    "name": "WA17CK6745BDRT with Ecobubble™, 17 Kg",
    "description": "17 Kg washing machine with Ecobubble™ technology.",
    "image": "./assets/samsung-laundry-03.jpg",
    "price": 742.97,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "21",
    "name": "Haier 520L Black Glass 4-Door Lumiere Refrigerator",
    "description": "Premium 4-door refrigerator with black glass finish and advanced cooling technology.",
    "image": "assets/haier-refrigerator-01.jpg",
    "price": 1100.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "22",
    "name": "Haier 340L French Door Refrigerator with Inverter Technology",
    "description": "Energy-efficient French door refrigerator with inverter compressor and spacious storage.",
    "image": "assets/haier-refrigerator-02.jpg",
    "price": 950.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "23",
    "name": "Haier 253L Top Mount Freezer with Multi Air Flow",
    "description": "Compact top mount freezer refrigerator with Multi Air Flow cooling system for even temperature distribution.",
    "image": "assets/haier-refrigerator-03.jpg",
    "price": 650.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "24",
    "name": "Haier 610L Side by Side Refrigerator with Water Dispenser",
    "description": "Large capacity side by side refrigerator with built-in water dispenser and ice maker.",
    "image": "assets/haier-refrigerator-04.jpg",
    "price": 1450.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "25",
    "name": "Haier 2 Ton 3 Star Heavy Duty Hexa Inverter Split AC",
    "description": "Heavy-duty inverter air conditioner with Hexa cooling technology for efficient performance in extreme temperatures.",
    "image": "assets/haier-ac-01.jpg",
    "price": 525.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "26",
    "name": "Haier 1.5 Ton 3 Star Rose Gold Inverter Split AC",
    "description": "Elegant rose gold finish inverter AC with energy-saving technology and quiet operation.",
    "image": "assets/haier-ac-02.jpg",
    "price": 435.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "27",
    "name": "Haier 1 Ton 5 Star Inverter Split AC with Self Cleaning",
    "description": "High-efficiency 5-star rated inverter AC with self-cleaning function and smart connectivity.",
    "image": "assets/haier-ac-03.jpg",
    "price": 485.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "28",
    "name": "Haier 1.8 Ton Window AC with Turbo Cooling",
    "description": "Powerful window air conditioner with turbo cooling mode for quick temperature reduction.",
    "image": "assets/haier-ac-04.jpg",
    "price": 450.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "29",
    "name": "Haier 10 Kg Fully Automatic Front Load Washing Machine",
    "description": "High-capacity front load washing machine with multiple wash programs and energy-efficient operation.",
    "image": "assets/haier-laundry-01.jpg",
    "price": 520.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "30",
    "name": "Haier 7 Kg 929 Series Front Load Washing Machine",
    "description": "7 kg front load washing machine with advanced washing technologies and compact design.",
    "image": "assets/haier-laundry-02.jpg",
    "price": 450.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "31",
    "name": "Haier 10kg WiFi Connected Washing Machine with 1400 rpm",
    "description": "Smart washing machine with WiFi connectivity, high spin speed, and A-rated energy efficiency.",
    "image": "assets/haier-laundry-03.jpg",
    "price": 495.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "32",
    "name": "Haier 8.5 Kg Semi Automatic Twin Tub Washing Machine",
    "description": "Affordable semi-automatic washing machine with twin tub design for washing and spin drying.",
    "image": "assets/haier-laundry-04.jpg",
    "price": 325.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "33",
    "name": "LG 23 cu. ft. InstaView Door-in-Door Refrigerator",
    "description": "Smart refrigerator with InstaView feature and energy-efficient cooling technology.",
    "image": "assets/lg-refrigerator-01.jpg",
    "price": 3695.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "34",
    "name": "LG 25.5 Cu. Ft. Bottom-Freezer Refrigerator with Ice Maker",
    "description": "Spacious bottom-freezer refrigerator with built-in ice maker and smart diagnosis features.",
    "image": "assets/lg-refrigerator-02.jpg",
    "price": 1795.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "35",
    "name": "LG Side by Side Refrigerator with Inverter Linear Compressor",
    "description": "Mega capacity side-by-side refrigerator with Inverter Linear Compressor and Smart Diagnosis technology.",
    "image": "assets/lg-refrigerator-03.jpg",
    "price": 3349.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "36",
    "name": "LG 16 cu. ft. French Door Refrigerator with Smart Cooling",
    "description": "Compact French door refrigerator with Smart Cooling system and multi-air flow technology.",
    "image": "assets/lg-refrigerator-04.jpg",
    "price": 1395.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "37",
    "name": "LG 1.5 HP DualCool Inverter Air Conditioner",
    "description": "Energy-saving dual inverter AC with fast cooling and quiet operation technology.",
    "image": "assets/lg-ac-01.jpg",
    "price": 750.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "38",
    "name": "LG 1 Ton Smart Inverter Air Conditioner",
    "description": "Smart inverter AC with energy-saving mode and fast cooling technology for small to medium rooms.",
    "image": "assets/lg-ac-02.jpg",
    "price": 650.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "39",
    "name": "LG 18,000 BTU Inverter Air Conditioner",
    "description": "High-capacity inverter AC with R410 refrigerant and energy-efficient cooling for large spaces.",
    "image": "assets/lg-ac-03.jpg",
    "price": 850.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "40",
    "name": "LG Multi-split System Air Conditioner",
    "description": "Central air conditioning system that can be connected to multiple indoor units for whole-home cooling.",
    "image": "assets/lg-ac-04.jpg",
    "price": 1499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "41",
    "name": "LG 12kg Front Loading Washing Machine with AI DD",
    "description": "High-capacity front load washer with Artificial Intelligence Direct Drive technology and ThinQ connectivity.",
    "image": "assets/lg-laundry-01.jpg",
    "price": 950.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "42",
    "name": "LG 9kg Front Load Washing Machine with ThinQ (Wi-Fi)",
    "description": "Smart washing machine with Wi-Fi connectivity, AI DD technology, and platinum silver finish.",
    "image": "assets/lg-laundry-02.jpg",
    "price": 430.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "43",
    "name": "LG 8kg/5kg Combo Washer & Dryer with Inverter",
    "description": "Space-saving combo unit with washing and drying capabilities, featuring inverter motor and AI DD technology.",
    "image": "assets/lg-laundry-03.jpg",
    "price": 700.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "44",
    "name": "LG 7kg Top Load Washing Machine with TurboWash",
    "description": "Efficient top-loading washer with TurboWash technology for faster cleaning cycles and energy savings.",
    "image": "assets/lg-laundry-04.jpg",
    "price": 459.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "45",
    "name": "Panasonic 537L Prime+ 4-Door Refrigerator NR-YW590YMMS",
    "description": "Premium 4-door refrigerator with Prime Freeze and nanoe™ X technology for superior food preservation.",
    "image": "assets/panasonic-refrigerator-01.jpg",
    "price": 1960.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "46",
    "name": "Panasonic 401L Double Door Refrigerator NR-BK468BGMN",
    "description": "Energy-efficient double door refrigerator with Fresh Safe Vegetable Case and mirror glass finish.",
    "image": "assets/panasonic-refrigerator-02.jpg",
    "price": 864.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "47",
    "name": "Panasonic 650L 6-Door Refrigerator NR-BW530HVSS",
    "description": "Large capacity 6-door refrigerator with advanced cooling zones and energy-saving inverter technology.",
    "image": "assets/panasonic-refrigerator-03.jpg",
    "price": 2150.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "48",
    "name": "Panasonic 253L Top Mount Freezer Refrigerator",
    "description": "Compact top mount freezer with Multi Air Flow cooling system for consistent temperature throughout.",
    "image": "assets/panasonic-refrigerator-04.jpg",
    "price": 580.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "49",
    "name": "Panasonic 1 Ton 3 Star Wi-Fi Inverter Split AC CS-SU12AKY3W",
    "description": "Smart inverter air conditioner with Wi-Fi connectivity and copper condenser for efficient cooling.",
    "image": "assets/panasonic-ac-01.jpg",
    "price": 375.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "50",
    "name": "Panasonic 2 Ton 3 Star Inverter Split AC CS-SU24AKY3W",
    "description": "High-capacity inverter AC designed for large rooms with powerful cooling performance and energy efficiency.",
    "image": "assets/panasonic-ac-02.jpg",
    "price": 624.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "51",
    "name": "Panasonic 1.5 Ton 5 Star Wi-Fi Inverter Smart Split AC",
    "description": "Premium smart AC with 5-star energy rating, Wi-Fi connectivity, and advanced air purification features.",
    "image": "assets/panasonic-ac-03.jpg",
    "price": 485.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "52",
    "name": "Panasonic 2.2 Ton 4 Star Wi-Fi Inverter Smart Split AC",
    "description": "Heavy-duty inverter air conditioner with Wi-Fi smart features and designed for extreme temperature environments.",
    "image": "assets/panasonic-ac-04.jpg",
    "price": 720.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "53",
    "name": "Panasonic 8.5 Kg Top Load Inverter Washing Machine NA-FD85X1HRM",
    "description": "Fully automatic top load washer with Water Bazooka technology powered by TD Inverter for superior cleaning.",
    "image": "assets/panasonic-laundry-01.jpg",
    "price": 338.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "54",
    "name": "Panasonic 12.5 Kg Top Load Inverter Washing Machine NA-FD10X1HRM",
    "description": "High-capacity top load washing machine with advanced stain removal technology and energy-efficient inverter motor.",
    "image": "assets/panasonic-laundry-02.jpg",
    "price": 425.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "55",
    "name": "Panasonic 7 Kg Front Load Inverter Washing Machine",
    "description": "Compact front load washing machine with EcoNavi technology for intelligent water and energy usage.",
    "image": "assets/panasonic-laundry-03.jpg",
    "price": 495.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "56",
    "name": "Panasonic 9 Kg Fully Automatic Front Load Washing Machine",
    "description": "Premium front load washer with multiple wash programs, steam cleaning, and smart connectivity features.",
    "image": "assets/panasonic-laundry-04.jpg",
    "price": 580.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "94",
    "name": "Whirlpool WRF535SMHZ 36\\",
    "description": "25.2 cu. ft. capacity with FreshFlow™ Produce Preserver and humidity-controlled crispers",
    "image": "assets/whirlpool-refrigerator-01.jpg",
    "price": 2199.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "95",
    "name": "Whirlpool WRX735SDHZ 36\\",
    "description": "25 cu. ft. capacity with dual evaporators and fingerprint-resistant stainless steel finish",
    "image": "assets/whirlpool-refrigerator-02.jpg",
    "price": 2499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "96",
    "name": "Whirlpool WRS325SDHZ 33\\",
    "description": "25 cu. ft. capacity with external water and ice dispenser, adaptive defrost",
    "image": "assets/whirlpool-refrigerator-03.jpg",
    "price": 1899.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "97",
    "name": "Whirlpool WRT518SZDM 18.2 cu. ft. Top Freezer Refrigerator",
    "description": "Energy Star certified with adjustable spill-proof glass shelves and humidity-controlled crisper",
    "image": "assets/whirlpool-refrigerator-04.jpg",
    "price": 999.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "98",
    "name": "Whirlpool WAC12452PT 12,000 BTU Window Air Conditioner",
    "description": "Energy efficient cooling with 3 fan speeds and electronic controls for rooms up to 550 sq. ft.",
    "image": "assets/whirlpool-ac-01.jpg",
    "price": 429.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "99",
    "name": "Whirlpool WAC15572PT 15,000 BTU Window Air Conditioner",
    "description": "High-capacity cooling with 4-way air direction control for rooms up to 700 sq. ft.",
    "image": "assets/whirlpool-ac-02.jpg",
    "price": 499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "100",
    "name": "Whirlpool WAC24662PT 24,000 BTU Window Air Conditioner",
    "description": "Heavy-duty cooling with dehumidification mode for large spaces up to 1,200 sq. ft.",
    "image": "assets/whirlpool-ac-03.jpg",
    "price": 699.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "101",
    "name": "Whirlpool WAC10342PT 10,000 BTU Window Air Conditioner",
    "description": "Compact cooling solution with digital controls and energy saver mode for rooms up to 450 sq. ft.",
    "image": "assets/whirlpool-ac-04.jpg",
    "price": 349.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "102",
    "name": "Whirlpool WTW8127LW 5.3 cu. ft. Top Load Washer",
    "description": "Extra-large capacity with built-in water faucet and deep water wash option",
    "image": "assets/whirlpool-laundry-01.jpg",
    "price": 1099.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "103",
    "name": "Whirlpool WED8127LW 7.4 cu. ft. Electric Dryer",
    "description": "Large capacity dryer with steam refresh cycle and 10 drying options",
    "image": "assets/whirlpool-laundry-02.jpg",
    "price": 999.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "104",
    "name": "Whirlpool WFC8090GX 4.5 cu. ft. Front Load Washer",
    "description": "ENERGY STAR certified with Load & Go dispenser and color last cycle",
    "image": "assets/whirlpool-laundry-03.jpg",
    "price": 1299.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "105",
    "name": "Whirlpool WED9090GW 8.0 cu. ft. Gas Dryer",
    "description": "Extra-large capacity with steam sanitize cycle and wrinkle shield option",
    "image": "assets/whirlpool-laundry-04.jpg",
    "price": 1199.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "106",
    "name": "BOSCH B36CL80SNS 36\\",
    "description": "20.5 cu. ft. capacity with Home Connect smart features and dual freezer drawers",
    "image": "assets/bosch-refrigerator-01.jpg",
    "price": 3899.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "107",
    "name": "BOSCH B36CL80ENS 36\\",
    "description": "20.5 cu. ft. capacity with black stainless steel finish and VitaFresh Pro system",
    "image": "assets/bosch-refrigerator-02.jpg",
    "price": 4199.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "108",
    "name": "BOSCH B33CL80SNS 33\\",
    "description": "17.8 cu. ft. capacity with MultiAirFlow technology and QuickIce Pro system",
    "image": "assets/bosch-refrigerator-03.jpg",
    "price": 3499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "109",
    "name": "BOSCH B11CB50SNS 36\\",
    "description": "22.4 cu. ft. capacity with dual compressors and FreshSafe Zone drawer",
    "image": "assets/bosch-refrigerator-04.jpg",
    "price": 3299.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "110",
    "name": "BOSCH BAC120A 12,000 BTU Window Air Conditioner",
    "description": "Energy-efficient cooling with 3 fan speeds and sleep mode for rooms up to 550 sq. ft.",
    "image": "assets/bosch-ac-01.jpg",
    "price": 389.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "111",
    "name": "BOSCH BAC80A 8,000 BTU Window Air Conditioner",
    "description": "Compact cooling solution with electronic controls and energy saver mode for rooms up to 350 sq. ft.",
    "image": "assets/bosch-ac-02.jpg",
    "price": 279.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "112",
    "name": "BOSCH BAC150A 15,000 BTU Window Air Conditioner",
    "description": "High-capacity cooling with remote control and 24-hour timer for rooms up to 700 sq. ft.",
    "image": "assets/bosch-ac-03.jpg",
    "price": 449.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "113",
    "name": "BOSCH BAC100A 10,000 BTU Window Air Conditioner",
    "description": "Versatile cooling with 3 cooling speeds and dehumidification mode for rooms up to 450 sq. ft.",
    "image": "assets/bosch-ac-04.jpg",
    "price": 329.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "114",
    "name": "BOSCH WAT28400UC 300 Series Front Load Washer",
    "description": "2.2 cu. ft. capacity with EcoSilence motor and 15 wash programs",
    "image": "assets/bosch-laundry-01.jpg",
    "price": 1299.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "115",
    "name": "BOSCH WTG86401UC 300 Series Electric Dryer",
    "description": "4.0 cu. ft. capacity with AutoDry sensor and 15 drying programs",
    "image": "assets/bosch-laundry-02.jpg",
    "price": 1199.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "116",
    "name": "BOSCH WAT28600UC 500 Series Front Load Washer",
    "description": "2.2 cu. ft. capacity with i-Dos automatic detergent system and sanitize cycle",
    "image": "assets/bosch-laundry-03.jpg",
    "price": 1599.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "117",
    "name": "BOSCH WTG86601UC 500 Series Gas Dryer",
    "description": "4.0 cu. ft. capacity with wool drying program and anti-vibration design",
    "image": "assets/bosch-laundry-04.jpg",
    "price": 1399.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "118",
    "name": "Electrolux EI23BC82SS 36\\",
    "description": "22.3 cu. ft. capacity with IQ-Touch controls and self-closing doors",
    "image": "assets/electrolux-refrigerator-01.jpg",
    "price": 2799.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "119",
    "name": "Electrolux EI27BS81SS 36\\",
    "description": "27.3 cu. ft. capacity with water dispenser and dual cooling system",
    "image": "assets/electrolux-refrigerator-02.jpg",
    "price": 2499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "120",
    "name": "Electrolux ELR-ISBS 581 BV SBS (VCM) 581L",
    "description": "Electronic Digital Control, Metal Cooling, Auto Anion Technology (AAT).",
    "image": "assets/electrolux-refrigerator-03.jpg",
    "price": 1299.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "121",
    "name": "Electrolux EI23BC84SS 42\\",
    "description": "Glass Door, Electronic Digital Control, Metal Cooling, Auto Anion Technology (AAT)",
    "image": "assets/electrolux-refrigerator-04.jpg",
    "price": 3199.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "122",
    "name": "Electrolux EAC12HR33I 12,000 BTU Portable Air Conditioner",
    "description": "3-in-1 functionality with cooling, dehumidifying, and fan modes for rooms up to 550 sq. ft.",
    "image": "assets/electrolux-ac-01.jpg",
    "price": 429.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "123",
    "name": "Electrolux ELSAC 12K Active Air - T3 (White)",
    "description": "PureGuard+ filtration system, DCMax function improves energy efficiency, LowVolt Boost function can start your cooling unit at 140 Volts.",
    "image": "assets/electrolux-ac-02.jpg",
    "price": 399.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "124",
    "name": "Electrolux ELSAC 12K Lux Air - T3",
    "description": "PureGuard+ filtration system, DCMax function improves energy efficiency, LowVolt Boost function can start your cooling unit at 140 Volts.",
    "image": "assets/electrolux-ac-03.jpg",
    "price": 549.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "125",
    "name": "Electrolux EAC10000 10,000 BTU Window Air Conditioner",
    "description": "Compact design with 3 cooling speeds and energy saver mode for rooms up to 450 sq. ft.",
    "image": "assets/electrolux-ac-04.jpg",
    "price": 349.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "126",
    "name": "Electrolux ELFW7637BT 4.5 cu. ft. Front Load Washer",
    "description": "LuxCare Plus Wash system with SmartBoost and Perfect Steam technology",
    "image": "assets/electrolux-laundry-01.jpg",
    "price": 1198.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "127",
    "name": "Electrolux EFMG627TIW 7.0 cu. ft. Electric Dryer",
    "description": "Perfect Steam dryer with LuxCare Dry system and 14 drying cycles",
    "image": "assets/electrolux-laundry-02.jpg",
    "price": 999.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "128",
    "name": "Electrolux EFLS627TIW 4.4 cu. ft. Front Load Washer",
    "description": "ENERGY STAR certified with 15-minute fast wash and sanitize with allergen removal",
    "image": "assets/electrolux-laundry-03.jpg",
    "price": 1099.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "129",
    "name": "Electrolux EFME627TIW 7.4 cu. ft. Gas Dryer",
    "description": "IntelliQuick Cycle, IntelliDose System, UltraMix Technology",
    "image": "assets/electrolux-laundry-04.jpg",
    "price": 1049.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "130",
    "name": "Apple iPhone 15 Pro Max 256GB",
    "description": "A17 Pro chip with 48MP camera system and titanium design",
    "image": "assets/apple-iphone-01.jpg",
    "price": 1199.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "131",
    "name": "Apple iPhone 15 128GB",
    "description": "A16 Bionic chip with Dynamic Island and 48MP main camera",
    "image": "assets/apple-iphone-02.jpg",
    "price": 799.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "132",
    "name": "Apple iPad Pro 11- inch (M4) 256GB",
    "description": "M4 chip with Liquid Retina display and Apple Pencil Pro compatibility",
    "image": "assets/apple-ipad-01.jpg",
    "price": 999.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "133",
    "name": "Apple iPad Air (M2) 256GB",
    "description": "M2 chip with 10.9-inch Liquid Retina display and USB-C connectivity",
    "image": "assets/apple-ipad-02.jpg",
    "price": 749.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "134",
    "name": "Apple MacBook Air 15-inch (M3) 512GB",
    "description": "M3 chip with 18-hour battery life and 1080p FaceTime HD camera",
    "image": "assets/apple-macbook-01.jpg",
    "price": 1499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "135",
    "name": "Apple MacBook Pro 14-inch (M4) 1TB",
    "description": "M4 Pro chip with up to 24 hours of battery life and three Thunderbolt 5 ports",
    "image": "assets/apple-macbook-02.jpg",
    "price": 2499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "136",
    "name": "Apple MacBook Pro 16-inch (M4 Max) 2TB",
    "description": "M4 Max chip with 128GB unified memory and advanced neural engine",
    "image": "assets/apple-macbook-03.jpg",
    "price": 3999.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "137",
    "name": "Apple Mac mini (M4) 16GB/256GB",
    "description": "M4 chip with 10-core CPU and 10-core GPU, built for Apple Intelligence",
    "image": "assets/apple-macbook-04.jpg",
    "price": 699.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "138",
    "name": "Apple Watch Series 9 GPS 45mm",
    "description": "S9 SiP chip with Always-On Retina display and health monitoring features",
    "image": "assets/apple-watch-01.jpg",
    "price": 429.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "139",
    "name": "Apple Watch Ultra 2 GPS + Cellular 49mm",
    "description": "Precision dual-frequency GPS with 36-hour battery life and ocean depth rating",
    "image": "assets/apple-watch-02.jpg",
    "price": 799.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "140",
    "name": "Apple AirPods Pro (2nd Generation)",
    "description": "Active Noise Cancellation with Transparency mode and personalized Spatial Audio",
    "image": "assets/apple-airpods-01.jpg",
    "price": 249.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "141",
    "name": "Apple AirPods (3rd Generation)",
    "description": "Spatial Audio with dynamic head tracking and sweat and water resistant design",
    "image": "assets/apple-airpods-02.jpg",
    "price": 169.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "146",
    "name": "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    "description": "Industry-leading noise cancellation with 30-hour battery life and premium sound",
    "image": "assets/sony-headphones-01.jpg",
    "price": 399.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "147",
    "name": "Sony WF-1000XM5 Wireless Noise Canceling Earbuds",
    "description": "Advanced noise cancellation with Integrated Processor V2 and LDAC support",
    "image": "assets/sony-headphones-02.jpg",
    "price": 299.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "148",
    "name": "Sony WH-CH720N Wireless Noise Canceling Headphones",
    "description": "Lightweight design with Dual Noise Sensor technology and 35-hour battery life",
    "image": "assets/sony-headphones-03.jpg",
    "price": 149.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "149",
    "name": "Sony WF-C510 Wireless Bluetooth Earbuds",
    "description": "All-day comfort with IPX4 water resistance and 20-hour battery life with case",
    "image": "assets/sony-headphones-04.jpg",
    "price": 99.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "150",
    "name": "Sony Alpha 1 II Full-Frame Mirrorless Camera",
    "description": "Second-generation flagship with 50.1MP sensor and 120fps continuous shooting",
    "image": "assets/sony-camera-01.jpg",
    "price": 6499.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "151",
    "name": "Sony Alpha 7C II Full-Frame Mirrorless Camera",
    "description": "Compact full-frame camera with 33.0MP sensor and AI-based subject recognition",
    "image": "assets/sony-camera-02.jpg",
    "price": 1999.0,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "152",
    "name": "Sony Alpha ZV-E10 APS-C Mirrorless Camera",
    "description": "Vlogging-focused camera with 24.2MP APS-C sensor and real-time tracking",
    "image": "assets/sony-camera-03.jpg",
    "price": 799.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "153",
    "name": "Sony PlayStation 5 Digital Edition",
    "description": "Next-gen gaming with ultra-high speed SSD and Tempest 3D AudioTech",
    "image": "assets/sony-gaming-01.jpg",
    "price": 685.99,
    "brand": "Product2.Html",
    "link": "./product2.html"
  },
  {
    "id": "9",
    "name": "RT6300C Top Mount Freezer with Optimal Fresh+, 411L",
    "description": "411L top mount freezer refrigerator with Optimal Fresh+ technology.",
    "image": "./assets/samsung-refrigerator-01.jpg",
    "price": 1099.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "10",
    "name": "RS50N3913BC/EU with Home Bar and All-around Cooling, 501L",
    "description": "Home Bar access and All-around Cooling technology.",
    "image": "./assets/samsung-refrigerator-02.jpg",
    "price": 1099.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "11",
    "name": "635L SBS No-Frost Refrigerator with Water Dispenser",
    "description": "Side-by-Side No-Frost Refrigerator with Water Dispenser.",
    "image": "./assets/samsung-refrigerator-03.jpg",
    "price": 1799.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "12",
    "name": "655L SBS No-Frost Refrigerator with All-around Cooling",
    "description": "Side-by-Side No-Frost Refrigerator with All-around Cooling.",
    "image": "./assets/samsung-refrigerator-04.jpg",
    "price": 1687.6,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "13",
    "name": "AR9500T Wall-mount AC with Fast Cooling",
    "description": "Wall-mount air conditioner with Fast Cooling technology.",
    "image": "./assets/samsung-AC-01.jpg",
    "price": 869.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "14",
    "name": "18,000 BTU - Wall-mount AC with DIT, Wind-Free™ , T3 Climate Class",
    "description": "Wall-mount AC with Digital Inverter Technology, Wind-Free™ Cooling, and T3 Climate Class.",
    "image": "./assets/samsung-AC-02.jpg",
    "price": 819.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "15",
    "name": "24,000 BTU - Wall-mount AC with DIT , T3 Climate Class",
    "description": "2-ton inverter AC with Digital Inverter Technology for efficient cooling in high-temperature climates up to 45m².",
    "image": "./assets/samsung-AC-03.jpg",
    "price": 1238.28,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "16",
    "name": "24,000 BTU - Wall-mount AC with DIT , T3 Climate Class",
    "description": "12,000 BTU wall-mount AC with Digital Inverter Technology and T3 Climate Class for high-temperature environments.",
    "image": "./assets/samsung-AC-04.jpg",
    "price": 601.45,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "17",
    "name": "WA80CK4240BWRT with DIT, 8 Kg",
    "description": "8 kg top-load washing machine with Digital Inverter Technology and Eco Bubble™.",
    "image": "./assets/samsung-washing-machine-01.jpg",
    "price": 389.17,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "18",
    "name": "WW70T4020EE/NQ with Eco Bubble and Hygiene Steam, 7 Kg",
    "description": "7 Kg washing machine with Eco Bubble and Hygiene Steam.",
    "image": "./assets/samsung-laundry-01.jpg",
    "price": 689.9,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "19",
    "name": "WD70TA046BX/FA with Eco Bubble™ and AirWash, 7+5 Kg",
    "description": "7+5 Kg washer-dryer with Eco Bubble™ and AirWash technology.",
    "image": "./assets/samsung-laundry-02.jpg",
    "price": 1171.06,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "20",
    "name": "WA17CK6745BDRT with Ecobubble™, 17 Kg",
    "description": "17 Kg washing machine with Ecobubble™ technology.",
    "image": "./assets/samsung-laundry-03.jpg",
    "price": 742.97,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "67",
    "name": "RF28T5001SR 28 cu. ft. French Door Refrigerator with All-Around Cooling",
    "description": "28.2 cu. ft. capacity with adjustable tempered glass shelves, internal ice maker, and Sabbath mode.",
    "image": "./assets/samsung-refrigerator-05.jpg",
    "price": 1400.0,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "68",
    "name": "WW9800T 9kg AI Washing Machine with QuickDrive™ and Eco Bubble™",
    "description": "9kg capacity with AI Control, QuickDrive™ technology reducing wash time by up to 50%, and energy usage by 20%.",
    "image": "./assets/samsung-washing-machine-02.jpg",
    "price": 999.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "69",
    "name": "DV90T8440 9kg Heat Pump Smart Dryer with AI Personalised Dry",
    "description": "9kg heat pump dryer with 9-star energy rating, AI Personalised Dry, and 35-mins Quick Dry cycle.",
    "image": "./assets/samsung-dryer-01.jpg",
    "price": 1299.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "70",
    "name": "DW80R9950UG 24 Inch Built-in Smart Dishwasher with AquaBlast™",
    "description": "15 place settings with AquaBlast™ jets, Zone Booster™, and ultra-quiet 39 dBA operation.",
    "image": "./assets/samsung-dishwasher-01.jpg",
    "price": 1199.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "71",
    "name": "ME83M 23L Stainless Steel Microwave Oven with 800W Power",
    "description": "23L capacity with 800W power, push-button controls, and stainless steel finish.",
    "image": "./assets/samsung-microwave-01.jpg",
    "price": 149.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "72",
    "name": "NX58M6630SS 30\\",
    "description": "5.8 cu. ft. true convection oven with blue LED illuminated knobs and powerful 5-burner cooktop.",
    "image": "./assets/samsung-range-01.jpg",
    "price": 799.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "73",
    "name": "RQ32S7741SR 653L Bespoke AI Refrigerator with Glass Door",
    "description": "653L capacity with Bespoke AI technology that personalizes settings based on your preferences and habits.",
    "image": "./assets/samsung-refrigerator-06.jpg",
    "price": 3499.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "74",
    "name": "RF24BB6600QL 24 cu. ft. Family Hub™ Refrigerator with Wi-Fi",
    "description": "24 cu. ft. capacity with Family Hub™ touchscreen, Wi-Fi connectivity, and internal camera system.",
    "image": "./assets/samsung-refrigerator-07.jpg",
    "price": 2799.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "75",
    "name": "WW90T604DLN 9kg EcoBubble™ Washing Machine with Hygiene Steam",
    "description": "9kg capacity with EcoBubble™ technology, Hygiene Steam function, and energy-saving performance.",
    "image": "./assets/samsung-washing-machine-03.jpg",
    "price": 749.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "76",
    "name": "AR18CVFAMWK 1.5 Ton Wind-Free™ Air Conditioner with AI & Digital Inverter",
    "description": "1.5 ton capacity with Wind-Free™ cooling, AI Auto Cooling, and R32 refrigerant for energy efficiency.",
    "image": "./assets/samsung-ac-05.jpg",
    "price": 999.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "77",
    "name": "DV80T5200AE 8kg Ventless Condenser Dryer with Sensor Dry",
    "description": "8kg capacity ventless condenser dryer with Sensor Dry technology and multiple drying cycles.",
    "image": "./assets/samsung-dryer-02.jpg",
    "price": 699.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "78",
    "name": "DW80R5060US 24 Inch Built-in Dishwasher with StormWash™",
    "description": "15 place settings with StormWash™ technology for tough food residue and quiet 42 dBA operation.",
    "image": "./assets/samsung-dishwasher-02.jpg",
    "price": 899.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "79",
    "name": "MS23F301TQK 23L Solo Microwave with Ceramic Enamel Interior",
    "description": "23L capacity with ceramic enamel interior for easy cleaning and 6 power levels for versatile cooking.",
    "image": "./assets/samsung-microwave-02.jpg",
    "price": 129.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "80",
    "name": "NZ80K8610AK 30\\",
    "description": "Flex Duo™ oven with removable divider allows you to cook two different dishes at different temperatures simultaneously.",
    "image": "./assets/samsung-range-02.jpg",
    "price": 1599.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "81",
    "name": "RR20D2825HV 183L Single Door Refrigerator with Digital Inverter",
    "description": "183L capacity with 5-star energy rating, Digital Inverter technology, and base stand drawer for extra storage.",
    "image": "./assets/samsung-refrigerator-08.jpg",
    "price": 349.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "82",
    "name": "WA80T5262BW 8kg Top Load Washing Machine with Wobble Technology",
    "description": "8kg capacity top load washer with Wobble technology for powerful cleaning and water-saving features.",
    "image": "./assets/samsung-washing-machine-04.jpg",
    "price": 499.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "83",
    "name": "AR09TYFYAWK 9,000 BTU Wall Mount AC with Triple Protector Plus",
    "description": "9,000 BTU capacity with Triple Protector Plus technology for durability in harsh conditions and T3 Climate Class.",
    "image": "./assets/samsung-ac-06.jpg",
    "price": 599.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "84",
    "name": "RS64R5304B4 647L Side-by-Side Refrigerator with Water & Ice Dispenser",
    "description": "647L capacity side-by-side refrigerator with water and ice dispenser, All-around Cooling, and Metal Cooling technology.",
    "image": "./assets/samsung-refrigerator-09.jpg",
    "price": 1899.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "85",
    "name": "WW70T4040CE 7kg Front Load Washing Machine with Eco Bubble",
    "description": "7kg capacity with Eco Bubble technology for deep cleaning at lower temperatures and energy efficiency.",
    "image": "./assets/samsung-washing-machine-05.jpg",
    "price": 549.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "86",
    "name": "AR12TYHYAWK 12,000 BTU Wall Mount AC with Wind-Free™ Comfort",
    "description": "12,000 BTU capacity with Wind-Free™ Comfort mode for energy-efficient cooling without direct airflow.",
    "image": "./assets/samsung-ac-07.jpg",
    "price": 749.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "87",
    "name": "DV70T5200AE 7kg Ventless Condenser Dryer with Smart Dry",
    "description": "7kg capacity with Smart Dry technology that automatically adjusts drying time based on moisture levels.",
    "image": "./assets/samsung-dryer-03.jpg",
    "price": 599.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "88",
    "name": "ME731K 20L Solo Microwave with 700W Power",
    "description": "20L capacity with 700W power, 6 power levels, and child safety lock for family use.",
    "image": "./assets/samsung-microwave-03.jpg",
    "price": 99.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "89",
    "name": "RB38A7020SA 375L Bottom Mount Freezer Refrigerator with Digital Inverter",
    "description": "375L capacity with Digital Inverter technology, Power Freeze function, and adjustable shelves for flexible storage.",
    "image": "./assets/samsung-refrigerator-10.jpg",
    "price": 799.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "90",
    "name": "WW10T684DLN 10kg AI Washing Machine with BubbleStorm",
    "description": "10kg capacity with AI Control, BubbleStorm technology for deep cleaning, and Super Speed wash cycle.",
    "image": "./assets/samsung-washing-machine-01.jpg",
    "price": 899.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "91",
    "name": "AR24CVFAMWK 2 Ton Wind-Free™ Air Conditioner with AI Auto Cooling",
    "description": "2 ton capacity with Wind-Free™ technology, AI Auto Cooling, and energy efficiency with Digital Inverter technology.",
    "image": "./assets/samsung-ac-08.jpg",
    "price": 1299.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  {
    "id": "92",
    "name": "DW60R30010W 60cm Compact Dishwasher with 6 Place Settings",
    "description": "6 place settings compact dishwasher perfect for small spaces, with 6 wash programs and quiet operation.",
    "image": "./assets/samsung-dishwasher-03.jpg",
    "price": 499.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  },
  
  {
    "id": "93",
    "name": "NZ64K7511BK 60cm Gas Cooktop with 5 Burners and Wi-Fi Connectivity",
    "description": "5-burner gas cooktop with powerful burners, Wi-Fi connectivity for remote monitoring, and premium stainless steel design.",
    "image": "./assets/samsung-range-03.jpg",
    "price": 1199.99,
    "brand": "Samsung",
    "link": "./samsung-productpage.html"
  }
]


