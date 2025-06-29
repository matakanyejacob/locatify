/**
 * LOCATIFY MAIN.JS
 * Handles core functionality for both index.html and business.html
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components based on current page
    if (document.getElementById('main-map')) {
        initMainMap();
        initSearch();
        initBusinessCards();
    }
    
    if (document.getElementById('business-map')) {
        initBusinessMap();
        initReviewForm();
    }
    
    initMobileMenu();
});

// ======================
// MAP FUNCTIONALITY
// ======================

/**
 * Initialize main map on homepage
 */
function initMainMap() {
    const map = L.map('main-map').setView([51.505, -0.09], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    // Sample business data (replace with real data)
    const businesses = [
        {
            id: 1,
            name: "The Rustic Spoon",
            position: [51.51, -0.1],
            type: "restaurant",
            address: "123 Main St",
            rating: 4.5,
            price: "$$",
            category: "Italian",
            distance: "1.2 mi"
        },
        {
            id: 2,
            name: "Green Leaf Spa",
            position: [51.505, -0.09],
            type: "spa",
            address: "456 Oak Ave",
            rating: 4.0,
            price: "$$$",
            category: "Spa",
            distance: "0.8 mi"
        }
    ];

    // Add markers to map
    businesses.forEach(business => {
        const marker = L.marker(business.position, { icon: customIcon })
            .addTo(map)
            .bindPopup(`
                <b>${business.name}</b><br>
                ${business.address}<br>
                <div class="popup-rating">
                    ${generateStarRating(business.rating)} 
                    (${business.rating.toFixed(1)})
                </div>
                <a href="business.html?id=${business.id}">View Details</a>
            `);
    });

    // Try geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            map.setView([pos.coords.latitude, pos.coords.longitude], 15);
        }, null, { enableHighAccuracy: true });
    }
}

/**
 * Initialize business detail map
 */
function initBusinessMap() {
    // Get business ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id') || 1;
    
    // In a real app, you would fetch business data based on ID
    const business = {
        id: 1,
        name: "The Rustic Spoon",
        position: [51.51, -0.1],
        address: "123 Main Street, Downtown"
    };
    
    const map = L.map('business-map').setView(business.position, 16);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker(business.position, {
        icon: L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        })
    }).addTo(map)
    .bindPopup(`<b>${business.name}</b><br>${business.address}`);
}

// ======================
// SEARCH FUNCTIONALITY
// ======================

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const searchButton = document.getElementById('search-button');
    
    if (!searchInput) return;

    // Sample data (replace with real API call)
    const businesses = [
        { name: "The Rustic Spoon", category: "Italian Restaurant", distance: "0.5 mi" },
        { name: "Green Leaf Spa", category: "Day Spa", distance: "1.2 mi" },
        { name: "Downtown Coffee Co", category: "Coffee Shop", distance: "0.3 mi" }
    ];

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

    searchButton.addEventListener('click', function() {
        performSearch(searchInput.value);
    });

    function showSuggestions(results) {
        searchSuggestions.innerHTML = results.length > 0 
            ? results.map(business => `
                <div class="search-suggestion" data-id="${business.id || ''}">
                    ${business.name} 
                    <span class="category">${business.category}</span>
                    <span class="distance">${business.distance}</span>
                </div>
            `).join('')
            : '<div class="search-suggestion">No results found</div>';
        
        searchSuggestions.style.display = 'block';
        
        // Add click handlers
        document.querySelectorAll('.search-suggestion').forEach(suggestion => {
            suggestion.addEventListener('click', function() {
                searchInput.value = this.textContent.trim().split(' ')[0];
                searchSuggestions.style.display = 'none';
                performSearch(this.textContent);
            });
        });
    }

    function performSearch(query) {
        // In a real app, this would call your backend
        console.log("Searching for:", query);
        alert(`Would search for: ${query}`);
    }
}

// ======================
// BUSINESS CARDS
// ======================

function initBusinessCards() {
    document.querySelectorAll('.business-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on bookmark
            if (!e.target.closest('.bookmark')) {
                window.location.href = 'business.html?id=' + 
                    this.getAttribute('data-id') || '1';
            }
        });
    });

    // Bookmark functionality
    document.querySelectorAll('.bookmark').forEach(bookmark => {
        bookmark.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('fas');
            this.classList.toggle('far');
            // Save to localStorage
            console.log("Bookmark toggled");
        });
    });
}

// ======================
// REVIEW FUNCTIONALITY
// ======================

function initReviewForm() {
    const reviewForm = document.getElementById('review-form');
    if (!reviewForm) return;
    
    // Star rating
    const stars = reviewForm.querySelectorAll('.star-rating i');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('fas', i <= index);
                s.classList.toggle('far', i > index);
            });
            reviewForm.querySelector('input[name="rating"]').value = index + 1;
        });
    });
    
    // Form submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Review submitted! (In a real app, this would send to your server)');
    });
}

// ======================
// MOBILE MENU
// ======================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('fa-bars');
        this.classList.toggle('fa-times');
    });
}

// ======================
// HELPER FUNCTIONS
// ======================

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}