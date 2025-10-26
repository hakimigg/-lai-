# LAI - AI Assistant Website

Beautiful, modern AI chat interface with dark theme design.

## 🎨 Features

- ✨ Clean, modern dark UI design
- 💬 Real-time chat interface
- 🤖 Powered by Groq or OpenAI APIs
- ⚡ Instant responses for greetings
- 📱 Fully responsive design
- 🎯 Typing indicators
- 💾 Conversation history
- 🎨 Code syntax highlighting

## 🚀 Quick Start

### 1. Get API Key

**Option A: Groq (Recommended - Free & Fast)**
1. Visit https://console.groq.com/keys
2. Sign up and create an API key
3. Copy your key (starts with `gsk_...`)

**Option B: OpenAI**
1. Visit https://platform.openai.com/api-keys
2. Create an API key
3. Copy your key (starts with `sk-...`)

### 2. Configure API Key

Open `script.js` and add your API key:

```javascript
const API_CONFIG = {
    GROQ_API_KEY: 'gsk_your_key_here', // Add your Groq key
    OPENAI_API_KEY: '', // Or OpenAI key
    PROVIDER: 'groq' // 'groq' or 'openai'
};
```

### 3. Run the Website

**Option A: Simple HTTP Server (Python)**
```bash
cd "ai website"
python -m http.server 8000
```
Then open: http://localhost:8000

**Option B: Live Server (VS Code)**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

**Option C: Direct File**
Just double-click `index.html` (API calls may be blocked by CORS)

## 📁 Project Structure

```
ai website/
├── index.html      # Main HTML structure
├── style.css       # Dark theme styling
├── script.js       # AI logic and API calls
└── README.md       # This file
```

## 🎯 Usage

1. Type your message in the input box
2. Press **Enter** to send (or click the send button)
3. Use **Shift + Enter** for new lines
4. Chat naturally - the AI responds to everything!

## 💡 Features

### Quick Responses
- Type "hi", "hello", "hey" → Instant greeting
- Type "how are you" → Instant friendly response

### AI Conversations
- Ask questions about anything
- Get help with coding
- Discuss topics
- Generate code
- And much more!

### Code Formatting
The AI's code responses are automatically formatted with syntax highlighting.

## 🎨 Customization

### Change Colors
Edit `style.css`:
```css
/* Main background */
body {
    background: #0f1419; /* Change this */
}

/* Primary color (buttons, etc) */
.send-button {
    background: #1d9bf0; /* Change this */
}
```

### Change AI Name
Edit `index.html` and `script.js` to change "LAI" to your preferred name.

## 🔧 Troubleshooting

### "Please configure your API key"
- Make sure you added your API key in `script.js`
- Check that the key is correct (no extra spaces)

### CORS Errors
- Use a local server (Python HTTP server or Live Server)
- Don't open the file directly in browser

### API Errors
- Verify your API key is valid
- Check you have credits/quota remaining
- Ensure internet connection is working

## 🌟 Tips

1. **Free API**: Use Groq for free, fast responses
2. **Better Responses**: OpenAI GPT-4 gives better quality (but costs money)
3. **Mobile**: Works great on phones and tablets
4. **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

## 📝 License

Free to use and modify!

## 🤝 Support

For issues or questions, check:
- Groq Docs: https://console.groq.com/docs
- OpenAI Docs: https://platform.openai.com/docs

---

Made with ❤️ by Hakim
