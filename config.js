// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://healthvault-api-f1d6.onrender.com/api',
    ENDPOINTS: {
        HEALTH: '/health',
        PATIENTS: '/patients',
        REPORTS: '/reports',
        CONDITIONS: '/conditions',
        ALLERGIES: '/allergies'
    }
};

// Helper function to get full API URL
function getApiUrl(endpoint) {
    return API_CONFIG.BASE_URL + (API_CONFIG.ENDPOINTS[endpoint] || endpoint);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
