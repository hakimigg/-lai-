// API Configuration Storage
const CONFIG_STORAGE_KEY = 'lai_api_config';

// Get stored API configuration
function getStoredConfig() {
    try {
        const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
}

// Save API configuration
function saveConfig(config) {
    try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
        return true;
    } catch (e) {
        console.error('Failed to save config:', e);
        return false;
    }
}

// Clear stored configuration
function clearConfig() {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
}

// Check if API key is configured
function hasAPIKey() {
    const config = getStoredConfig();
    return config && (config.groq_key || config.openai_key);
}

// Get API configuration
function getAPIConfig() {
    const stored = getStoredConfig();
    if (stored) {
        return {
            GROQ_API_KEY: stored.groq_key || '',
            OPENAI_API_KEY: stored.openai_key || '',
            PROVIDER: stored.provider || 'groq'
        };
    }
    return {
        GROQ_API_KEY: '',
        OPENAI_API_KEY: '',
        PROVIDER: 'groq'
    };
}

// Export for use in other files
window.APIConfig = {
    get: getAPIConfig,
    save: saveConfig,
    clear: clearConfig,
    hasKey: hasAPIKey,
    getStored: getStoredConfig
};
