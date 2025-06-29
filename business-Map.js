// Initialize business detail map
function initBusinessMap() {
    // Coordinates for the business (The Rustic Spoon)
    const businessLocation = [51.51, -0.1];
    
    // Create map centered on business location
    const map = L.map('business-map').setView(businessLocation, 16);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker for the business
    L.marker(businessLocation, {
        icon: L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        })
    }).addTo(map)
    .bindPopup("<b>The Rustic Spoon</b><br>123 Main Street");
}

// Initialize map when page loads
window.addEventListener('load', initBusinessMap);