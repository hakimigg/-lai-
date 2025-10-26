// ============================================
// API CONFIGURATION
// ============================================
// Put your API key here - everyone will use this same key
// Get a free key from: https://console.groq.com/keys

const SHARED_API_CONFIG = {
    // Paste your Groq API key here (starts with gsk_...)
    API_KEY: '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',
    
    // Or use OpenAI (starts with sk-...)
    // API_KEY: 'sk-...',
    
    // Provider: 'groq' or 'openai'
    PROVIDER: 'groq'
};

// ============================================
// That's it! Just change YOUR_API_KEY_HERE above
// ============================================

// Export for use in main script
window.SHARED_API_CONFIG = SHARED_API_CONFIG;
