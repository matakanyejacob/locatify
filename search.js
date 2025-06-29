// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchButton = document.getElementById('search-button');

    // Sample business data
    const businesses = [
        { name: "The Rustic Spoon", category: "Italian Restaurant", distance: "0.5 mi" },
        { name: "Green Leaf Spa", category: "Day Spa", distance: "1.2 mi" },
        { name: "Downtown Coffee Co", category: "Coffee Shop", distance: "0.3 mi" }
    ];

    if (searchInput && searchSuggestions) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 0) {
                const filtered = businesses.filter(business => 
                    business.name.toLowerCase().includes(query) || 
                    business.category.toLowerCase().includes(query)
                );
                showSuggestions(filtered);
            } else {
                searchSuggestions.style.display = 'none';
            }
        });

        // Close suggestions when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (e.target !== searchInput) {
                searchSuggestions.style.display = 'none';
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            // Implement search functionality here
            alert('Search functionality would be implemented here');
        });
    }

    function showSuggestions(results) {
        if (results.length > 0) {
            searchSuggestions.innerHTML = results.map(business => `
                <div class="search-suggestion">
                    ${business.name} <span class="category">${business.category}</span>
                    <span class="distance">${business.distance}</span>
                </div>
            `).join('');
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.innerHTML = '<div class="search-suggestion">No results found</div>';
            searchSuggestions.style.display = 'block';
        }
    }
});