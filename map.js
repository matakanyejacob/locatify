// Initialize main map with OpenStreetMap
function initMap() {
    // Create map centered on default location (London)
    const map = L.map('main-map').setView([51.505, -0.09], 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });

    // Sample business data
    const businesses = [
        {
            name: "The Rustic Spoon",
            position: [51.51, -0.1],
            type: "restaurant",
            address: "123 Main St",
            rating: 4.5
        },
        {
            name: "Green Leaf Spa",
            position: [51.505, -0.09],
            type: "spa",
            address: "456 Oak Ave",
            rating: 4.0
        }
    ];

    // Add markers to map
    businesses.forEach(business => {
        const marker = L.marker(business.position, { icon: customIcon })
            .addTo(map)
            .bindPopup(`
                <b>${business.name}</b><br>
                ${business.address}<br>
                Rating: ${business.rating}/5<br>
                <a href="business.html">View Details</a>
            `);
    });

    // Try geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            map.setView([pos.coords.latitude, pos.coords.longitude], 15);
        });
    }
}

// Initialize map when page loads
window.addEventListener('load', initMap);