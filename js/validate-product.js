/**
 * Product validation utility to prevent duplicate entries
 * This script can be integrated into data entry or import workflows
 */

const fs = require('fs');

class ProductValidator {
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
    this.products = this.loadProducts();
  }

  // Load existing products from file
  loadProducts() {
    try {
      const data = fs.readFileSync(this.dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading product data:', error.message);
      return [];
    }
  }

  // Create a unique key for a product based on key attributes
  createProductKey(product) {
    return `${product.brand}|${product.name}|${product.price}`;
  }

  // Check if a product already exists in the database
  isDuplicate(product) {
    const productKey = this.createProductKey(product);
    return this.products.some(existingProduct => 
      this.createProductKey(existingProduct) === productKey
    );
  }

  // Validate a new product entry
  validateProduct(newProduct) {
    const errors = [];
    const warnings = [];

    // Check required fields
    if (!newProduct.id) errors.push('Product ID is required');
    if (!newProduct.name) errors.push('Product name is required');
    if (!newProduct.brand) errors.push('Product brand is required');
    if (newProduct.price === undefined) errors.push('Product price is required');

    // Check if product already exists (duplicate detection)
    if (this.isDuplicate(newProduct)) {
      errors.push(`Duplicate product detected: ${newProduct.name} (${newProduct.brand}) - $${newProduct.price}`);
    }

    // Additional validation rules
    if (newProduct.price < 0) errors.push('Product price cannot be negative');
    if (newProduct.name && newProduct.name.length > 200) warnings.push('Product name is unusually long');

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Add a new product after validation
  addProduct(newProduct) {
    const validation = this.validateProduct(newProduct);
    
    if (!validation.isValid) {
      console.log('Validation failed:');
      validation.errors.forEach(error => console.log(`- ${error}`));
      return false;
    }

    // Add product to in-memory array
    this.products.push(newProduct);
    
    // In a real application, you would save to the database here
    console.log(`Product added successfully: ${newProduct.name}`);
    return true;
  }

  // Get current product count
  getProductCount() {
    return this.products.length;
  }

  // Get list of all product keys for debugging
  getAllProductKeys() {
    return this.products.map(product => this.createProductKey(product));
  }
}

// Example usage
if (require.main === module) {
  // Initialize validator with existing product data
  const validator = new ProductValidator('./js/PRODUCT-DETAILS-DEDUPLICATED.JSON');
  
  console.log(`Loaded ${validator.getProductCount()} existing products`);
  
  // Example product to validate
  const newProduct = {
    "id": "999",
    "name": "Test Product",
    "description": "A test product for validation",
    "image": "./assets/test-product.jpg",
    "price": 99.99,
    "brand": "TestBrand",
    "link": "./test-productpage.html",
    "specs": {
      "weight": "1 lb",
      "dimensions": "5 x 5 x 5 inches"
    }
  };
  
  // Validate the product
  const result = validator.validateProduct(newProduct);
  
  if (result.isValid) {
    console.log('Product validation passed');
    if (result.warnings.length > 0) {
      console.log('Warnings:');
      result.warnings.forEach(warning => console.log(`- ${warning}`));
    }
  } else {
    console.log('Product validation failed');
    result.errors.forEach(error => console.log(`- ${error}`));
  }
}

module.exports = ProductValidator;


