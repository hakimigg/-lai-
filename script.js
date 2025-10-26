// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const apiSetupModal = document.getElementById('apiSetupModal');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');

// Conversation history (cleared on page reload - fresh session every time)
let conversationHistory = [];

// Get API configuration from localStorage
let API_CONFIG = window.APIConfig.get();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if API key exists
    if (!window.APIConfig.hasKey()) {
        // Show setup modal
        apiSetupModal.classList.add('active');
        messageInput.disabled = true;
        sendButton.disabled = true;
    } else {
        // API key exists, ready to chat
        messageInput.focus();
    }
    
    // Setup API key save button
    saveApiKeyBtn.addEventListener('click', saveAPIKey);
    
    // Allow Enter key in API input
    apiKeyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveAPIKey();
        }
    });
    
    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });
    
    // Send on Enter (but not Shift+Enter)
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send button click
    sendButton.addEventListener('click', sendMessage);
});

// Save API Key
function saveAPIKey() {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
        alert('Please enter an API key');
        return;
    }
    
    // Validate API key format
    if (!apiKey.startsWith('gsk_') && !apiKey.startsWith('sk-')) {
        alert('Invalid API key format. Groq keys start with "gsk_" and OpenAI keys start with "sk-"');
        return;
    }
    
    // Determine provider based on key format
    const provider = apiKey.startsWith('gsk_') ? 'groq' : 'openai';
    
    // Save to localStorage
    const config = {
        groq_key: provider === 'groq' ? apiKey : '',
        openai_key: provider === 'openai' ? apiKey : '',
        provider: provider
    };
    
    window.APIConfig.save(config);
    
    // Update API_CONFIG
    API_CONFIG = window.APIConfig.get();
    
    // Close modal
    apiSetupModal.classList.remove('active');
    
    // Enable chat
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.focus();
    
    // Show success message
    addMessage(`✅ API key saved! You're all set. Start chatting!`, 'ai');
}

// Send message
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Disable input while processing
    messageInput.disabled = true;
    sendButton.disabled = true;
    
    // Show typing indicator
    const typingId = showTypingIndicator();
    
    // Get AI response
    try {
        const response = await getAIResponse(message);
        removeTypingIndicator(typingId);
        addMessage(response, 'ai');
    } catch (error) {
        removeTypingIndicator(typingId);
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        console.error('Error:', error);
    }
    
    // Re-enable input
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.focus();
}

// Add message to chat
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const icon = document.createElement('div');
    icon.className = 'message-icon';
    icon.innerHTML = type === 'ai' 
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = formatMessage(content);
    
    messageDiv.appendChild(icon);
    messageDiv.appendChild(messageContent);
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Add to conversation history
    conversationHistory.push({
        role: type === 'user' ? 'user' : 'assistant',
        content: content
    });
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message';
    typingDiv.id = 'typing-indicator';
    
    const icon = document.createElement('div');
    icon.className = 'message-icon';
    icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
    
    typingDiv.appendChild(icon);
    typingDiv.appendChild(messageContent);
    
    chatContainer.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    return 'typing-indicator';
}

// Remove typing indicator
function removeTypingIndicator(id) {
    const typingDiv = document.getElementById(id);
    if (typingDiv) {
        typingDiv.remove();
    }
}

// Format message (handle code blocks, links, etc.)
function formatMessage(content) {
    // Convert markdown code blocks
    content = content.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // Convert inline code
    content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Convert line breaks
    content = content.replace(/\n/g, '<br>');
    
    return content;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Get AI response
async function getAIResponse(userMessage) {
    // Check for quick responses
    const quickResponse = getQuickResponse(userMessage);
    if (quickResponse) {
        return quickResponse;
    }
    
    // Refresh API config (in case it was updated)
    API_CONFIG = window.APIConfig.get();
    
    // Check if API key is configured
    if (!API_CONFIG.GROQ_API_KEY && !API_CONFIG.OPENAI_API_KEY) {
        return "⚠️ No API key found. Please refresh the page to set up your API key.";
    }
    
    // Call AI API
    if (API_CONFIG.PROVIDER === 'groq' && API_CONFIG.GROQ_API_KEY) {
        return await callGroqAPI(userMessage);
    } else if (API_CONFIG.PROVIDER === 'openai' && API_CONFIG.OPENAI_API_KEY) {
        return await callOpenAIAPI(userMessage);
    }
    
    return "API configuration error. Please refresh the page.";
}

// Quick responses for common greetings
function getQuickResponse(message) {
    const msg = message.toLowerCase().trim();
    
    const greetings = ['hi', 'hello', 'hey', 'hii', 'hiii', 'yo', 'sup', 'hola'];
    if (greetings.includes(msg)) {
        const responses = [
            "Hi there! 👋 How can I help you today?",
            "Hey! 😊 What can I do for you?",
            "Hello! 👋 What's on your mind?",
            "Hi! 😊 How can I assist you today?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (['how are you', 'how are you?', 'how r u', 'how r u?'].includes(msg)) {
        const responses = [
            "I'm doing great, thanks for asking! 😊 How about you?",
            "I'm awesome! Ready to help you with anything! How are you doing?",
            "Feeling fantastic! 🌟 What can I help you with today?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return null;
}

// Call Groq API
async function callGroqAPI(userMessage) {
    const messages = [
        {
            role: "system",
            content: "You are LAI, a friendly and helpful AI assistant. You chat naturally and help with anything - coding, questions, casual conversation, etc. Be warm, engaging, and conversational."
        },
        ...conversationHistory.slice(-10),
        {
            role: "user",
            content: userMessage
        }
    ];
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_CONFIG.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: messages,
            max_tokens: 2000,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Call OpenAI API
async function callOpenAIAPI(userMessage) {
    const messages = [
        {
            role: "system",
            content: "You are LAI, a friendly and helpful AI assistant. You chat naturally and help with anything - coding, questions, casual conversation, etc. Be warm, engaging, and conversational."
        },
        ...conversationHistory.slice(-10),
        {
            role: "user",
            content: userMessage
        }
    ];
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 2000,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}
