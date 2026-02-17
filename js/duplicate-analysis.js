/**
 * Advanced duplicate analysis tool for quarterly reviews
 * This script provides detailed analysis of duplicate patterns and data quality metrics
 */

const fs = require('fs');

class DuplicateAnalyzer {
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
    this.products = this.loadProducts();
  }

  // Load products from file
  loadProducts() {
    try {
      const data = fs.readFileSync(this.dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading product data:', error.message);
      return [];
    }
  }

  // Create a unique key for a product
  createProductKey(product) {
    return `${product.brand}|${product.name}|${product.price}`;
  }

  // Find all duplicates in the dataset
  findAllDuplicates() {
    const productMap = new Map();
    const duplicates = [];

    this.products.forEach((product, index) => {
      const key = this.createProductKey(product);
      if (productMap.has(key)) {
        // This is a duplicate
        const firstOccurrence = productMap.get(key);
        duplicates.push({
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          index: index,
          firstOccurrenceIndex: firstOccurrence.index,
          firstOccurrenceId: firstOccurrence.id
        });
      } else {
        // First occurrence of this product
        productMap.set(key, { id: product.id, index: index });
      }
    });

    return duplicates;
  }

  // Group duplicates by brand for analysis
  getDuplicatesByBrand(duplicates) {
    const brandGroups = {};
    
    duplicates.forEach(duplicate => {
      if (!brandGroups[duplicate.brand]) {
        brandGroups[duplicate.brand] = [];
      }
      brandGroups[duplicate.brand].push(duplicate);
    });
    
    return brandGroups;
  }

  // Calculate data quality metrics
  calculateMetrics() {
    const totalProducts = this.products.length;
    const duplicates = this.findAllDuplicates();
    const duplicateCount = duplicates.length;
    
    // Calculate duplicate rate
    const duplicateRate = totalProducts > 0 ? (duplicateCount / totalProducts) * 100 : 0;
    
    // Group duplicates by brand
    const duplicatesByBrand = this.getDuplicatesByBrand(duplicates);
    
    // Find most problematic brands
    const brandProblemCounts = Object.keys(duplicatesByBrand).map(brand => ({
      brand: brand,
      count: duplicatesByBrand[brand].length
    })).sort((a, b) => b.count - a.count);
    
    return {
      totalProducts,
      duplicateCount,
      duplicateRate: duplicateRate.toFixed(2),
      duplicatesByBrand: duplicatesByBrand,
      topProblemBrands: brandProblemCounts.slice(0, 5)
    };
  }

  // Generate a detailed analysis report
  generateReport() {
    const metrics = this.calculateMetrics();
    const duplicates = this.findAllDuplicates();
    
    console.log('=== PRODUCT DATA QUALITY ANALYSIS REPORT ===\n');
    
    console.log('SUMMARY METRICS:');
    console.log(`  Total Products: ${metrics.totalProducts}`);
    console.log(`  Duplicate Entries: ${metrics.duplicateCount}`);
    console.log(`  Duplicate Rate: ${metrics.duplicateRate}%\n`);
    
    console.log('TOP 5 PROBLEMATIC BRANDS:');
    metrics.topProblemBrands.forEach((brand, index) => {
      console.log(`  ${index + 1}. ${brand.brand}: ${brand.count} duplicates`);
    });
    
    console.log('\nDETAILED DUPLICATE ANALYSIS:');
    if (duplicates.length > 0) {
      console.log('  First 10 duplicates found:');
      duplicates.slice(0, 10).forEach((dup, index) => {
        console.log(`    ${index + 1}. ${dup.name} (${dup.brand}) - $${dup.price}`);
        console.log(`       ID: ${dup.id} (duplicate of ID: ${dup.firstOccurrenceId})`);
      });
      
      if (duplicates.length > 10) {
        console.log(`    ... and ${duplicates.length - 10} more duplicates`);
      }
    } else {
      console.log('  No duplicates found!');
    }
    
    console.log('\nRECOMMENDATIONS:');
    if (metrics.duplicateRate > 5) {
      console.log('  1. High duplicate rate detected. Review data entry procedures.');
      console.log('  2. Consider implementing stricter validation rules.');
      console.log('  3. Provide additional training to data entry personnel.');
    } else if (metrics.duplicateRate > 1) {
      console.log('  1. Moderate duplicate rate. Monitor trends closely.');
      console.log('  2. Review occasional edge cases that may be slipping through.');
    } else {
      console.log('  1. Excellent data quality. Continue current practices.');
      console.log('  2. Consider sharing best practices with other teams.');
    }
    
    // Suggest brands that need attention
    if (metrics.topProblemBrands.length > 0) {
      console.log('\nBRAND-SPECIFIC RECOMMENDATIONS:');
      metrics.topProblemBrands.slice(0, 3).forEach(brand => {
        console.log(`  - Review data entry procedures for ${brand.brand} products`);
      });
    }
    
    return metrics;
  }

  // Export detailed duplicate information to a file
  exportDuplicatesToFile(outputFilePath) {
    const duplicates = this.findAllDuplicates();
    
    // Format for export
    const exportData = duplicates.map(dup => ({
      duplicate_id: dup.id,
      duplicate_name: dup.name,
      brand: dup.brand,
      price: dup.price,
      original_id: dup.firstOccurrenceId,
      issue: 'Exact duplicate based on brand|name|price combination'
    }));
    
    fs.writeFileSync(outputFilePath, JSON.stringify(exportData, null, 2));
    console.log(`Detailed duplicate information exported to ${outputFilePath}`);
    
    return exportData.length;
  }
}

// Run analysis when script is executed directly
if (require.main === module) {
  const analyzer = new DuplicateAnalyzer('./js/PRODUCT-DETAILS-DEDUPLICATED.JSON');
  
  // Generate and display report
  const metrics = analyzer.generateReport();
  
  // Export detailed duplicates to file
  const duplicateCount = analyzer.exportDuplicatesToFile('./js/duplicate-details.json');
  console.log(`\nExported ${duplicateCount} duplicates to detailed report file.`);
  
  // Save summary metrics
  fs.writeFileSync('./js/analysis-metrics.json', JSON.stringify(metrics, null, 2));
  console.log('Analysis metrics saved to analysis-metrics.json');
}

module.exports = DuplicateAnalyzer;


