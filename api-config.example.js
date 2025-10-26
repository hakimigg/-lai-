// ============================================
// API CONFIGURATION
// ============================================
// Put your API key here - everyone will use this same key
// Get a free key from: https://console.groq.com/keys

const SHARED_API_CONFIG = {
    // Paste your Groq API key here (starts with gsk_...)
    API_KEY: 'YOUR_API_KEY_HERE',
    
    // Or use OpenAI (starts with sk-...)
    // API_KEY: 'sk-...',
    
    // Provider: 'groq' or 'openai'
    PROVIDER: 'groq'
};

// ============================================
// SETUP INSTRUCTIONS:
// 1. Rename this file to: api-config.js
// 2. Replace YOUR_API_KEY_HERE with your actual API key
// 3. Save the file
// ============================================

// Export for use in main script
window.SHARED_API_CONFIG = SHARED_API_CONFIG;
