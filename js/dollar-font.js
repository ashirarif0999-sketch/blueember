/**
 * Dollar Sign Font Styler
 * Applies 'Space Grotesk' font family to all dollar signs ($) on the page
 * without modifying HTML or CSS files directly.
 */

function applyDollarFont() {
  // Function to traverse all text nodes
  function walkTextNodes(node, callback) {
    if (node.nodeType === Node.TEXT_NODE) {
      callback(node);
    } else {
      for (let child of node.childNodes) {
        walkTextNodes(child, callback);
      }
    }
  }

  // Function to replace $ with styled span
  function replaceDollarSigns(textNode) {
    const text = textNode.textContent;
    if (text.includes('$')) {
      const parent = textNode.parentNode;
      const parts = text.split('$');

      // Clear the text node
      textNode.textContent = '';

      // Rebuild with spans
      parts.forEach((part, index) => {
        if (part) {
          parent.insertBefore(document.createTextNode(part), textNode);
        }
        if (index < parts.length - 1) {
          const dollarSpan = document.createElement('span');
          dollarSpan.style.fontFamily = "'Space Grotesk', sans-serif";
          dollarSpan.textContent = '$';
          parent.insertBefore(dollarSpan, textNode);
        }
      });

      // Remove the original text node if it's now empty
      if (!textNode.textContent) {
        parent.removeChild(textNode);
      }
    }
  }

  // Apply to entire document body
  walkTextNodes(document.body, replaceDollarSigns);
}

// Run when DOM is fully loaded
/* Search Bar Logic appended by Assistant */
document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    // Only run if the search bar exists on this page
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            // Prevent submission if input is empty
            if (!searchInput.value.trim()) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', applyDollarFont);


