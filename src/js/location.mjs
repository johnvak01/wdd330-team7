const LOCATION_KEY = "user-location";

/**
 * Get user's current GPS location
 * and save full address in localStorage
 */
export async function getCurrentLocation() {

    if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported.");
    }
    const coordinates = await new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                switch (error.code) {
                    case 1:
                        reject("Location permission denied.");
                        break;
                    case 2:
                        reject("Location unavailable.");
                        break;
                    case 3:
                        reject("Location timeout.");
                        break;
                    default:
                        reject("Unknown location error.");
                }
            },

            {
                enableHighAccuracy: true, // uses GPS if available
                timeout: 10000,
                maximumAge: 0 // do not use cached location 
            }
        );
    });

    // Reverse geocode coordinates and  convert coordinates to address
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}`
    );

    const data = await response.json();
    const address = data.address;

    const location = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,

        // Complete address
        fullAddress: data.display_name,

        city:
            address.city || address.town || address.village || "",
        town:
            address.town || address.village || "",
        state:
            address.state || "",
        country:
            address.country || "",
        postalCode:
            address.postcode || "",
        updated:
            new Date().toString()
    };

    // Save complete location
    localStorage.setItem(LOCATION_KEY, JSON.stringify(location));
    return location;
}

/**
 * Display welcome message
 */
export function displayLocation(selector) {
    const element = document.querySelector(selector);

    if (!element) return;
    const savedLocation = localStorage.getItem(LOCATION_KEY);

    if (!savedLocation) {
        element.textContent = "Checking location...";
        return;
    }

    const location = JSON.parse(savedLocation);
    element.textContent = `Welcome, you are connecting from ${location.fullAddress} on ${location.updated}.`;
}