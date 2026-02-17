// search-integration.js - Handles search submission from any page
document.addEventListener('DOMContentLoaded', () => {
  // Find all search forms on the page
  const searchForms = document.querySelectorAll('.search-container form, .navbar-container form');
  
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const input = form.querySelector('input[type="search"], input[type="text"]');
      if (input && input.value.trim()) {
        // Navigate to search results page with query parameter
        window.location.href = `search-results.html?q=${encodeURIComponent(input.value.trim())}`;
      }
    });
  });
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
});


