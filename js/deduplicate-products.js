const fs = require('fs');

// Load the product data
const data = JSON.parse(fs.readFileSync('./js/PRODUCT-DETAILS.JSON', 'utf8'));

console.log(`Original product count: ${data.length}`);

// Create a map to track unique products based on a combination of key attributes
const uniqueProducts = new Map();
const deduplicatedData = [];

// Process each product
data.forEach((product, index) => {
  // Create a unique key based on brand, name, and price
  // This combination should be sufficient to identify duplicates while preserving legitimate variations
  const uniqueKey = `${product.brand}|${product.name}|${product.price}`;
  
  // If we haven't seen this product before, add it to our deduplicated data
  if (!uniqueProducts.has(uniqueKey)) {
    uniqueProducts.set(uniqueKey, true);
    deduplicatedData.push(product);
  } else {
    console.log(`Duplicate found and removed: ${product.name} (${product.brand}) - $${product.price}`);
  }
});

console.log(`Deduplicated product count: ${deduplicatedData.length}`);
console.log(`Removed ${data.length - deduplicatedData.length} duplicate products`);

// Save the deduplicated data
fs.writeFileSync('./js/PRODUCT-DETAILS-DEDUPLICATED.JSON', JSON.stringify(deduplicatedData, null, 2));

console.log('Deduplicated data saved to PRODUCT-DETAILS-DEDUPLICATED.JSON');


