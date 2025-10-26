// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const inputContainer = document.querySelector('.input-container');
const welcomeScreen = document.getElementById('welcomeScreen');

// Conversation history - ONLY for current session
let conversationHistory = [];
let isFirstMessage = true;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    messageInput.focus();
    
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });
    
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    sendButton.addEventListener('click', sendMessage);
});

// Send message
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    if (isFirstMessage) {
        welcomeScreen.classList.add('hidden');
        isFirstMessage = false;
    }
    
    addMessage(message, 'user');
    
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    messageInput.disabled = true;
    sendButton.disabled = true;
    
    const typingId = showTypingIndicator();
    
    try {
        const response = await getAIResponse(message);
        removeTypingIndicator(typingId);
        await addMessageWithTyping(response, 'ai');
    } catch (error) {
        removeTypingIndicator(typingId);
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        console.error('Error:', error);
    }
    
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.focus();
}

// Get AI response via serverless function
async function getAIResponse(userMessage) {
    const quickResponse = getQuickResponse(userMessage);
    if (quickResponse) {
        return quickResponse;
    }
    
    try {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage,
                conversationHistory: conversationHistory
            })
        });
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Quick responses for common greetings
function getQuickResponse(message) {
    const msg = message.toLowerCase().trim();
    
    const greetings = ['hi', 'hello', 'hey', 'hii', 'hiii', 'yo', 'sup', 'hola'];
    if (greetings.includes(msg)) {
        const responses = [
            "Hi there! How can I help you today?",
            "Hey! What can I do for you?",
            "Hello! What's on your mind?",
            "Hi! How can I assist you today?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (['how are you', 'how are you?', 'how r u', 'how r u?'].includes(msg)) {
        const responses = [
            "I'm doing great, thanks for asking! How about you?",
            "I'm awesome! Ready to help you with anything! How are you doing?",
            "Feeling fantastic! What can I help you with today?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return null;
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
    
    conversationHistory.push({
        role: type === 'user' ? 'user' : 'assistant',
        content: content
    });
}

// Add message with typing animation
async function addMessageWithTyping(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const icon = document.createElement('div');
    icon.className = 'message-icon';
    icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = '';
    
    messageDiv.appendChild(icon);
    messageDiv.appendChild(messageContent);
    chatContainer.appendChild(messageDiv);
    
    let currentText = '';
    const words = content.split(' ');
    
    for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        messageContent.innerHTML = formatMessage(currentText);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 30));
    }
    
    conversationHistory.push({
        role: 'assistant',
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

// Format message
function formatMessage(content) {
    content = content.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });
    
    content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
    content = content.replace(/\n/g, '<br>');
    
    return content;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
