# 🚀 LAI Website - Complete Setup Guide

## ✅ What You Have

A beautiful, modern AI chat website with:
- 🎨 Dark theme design (matching your screenshot)
- 💬 Real-time chat interface
- 🤖 AI-powered responses (Groq or OpenAI)
- ⚡ Instant greetings
- 📱 Mobile responsive
- 🎯 Typing indicators

## 📋 Quick Setup (3 Steps)

### Step 1: Get Free API Key

**Groq (Recommended - Free & Fast):**
1. Go to: https://console.groq.com/keys
2. Sign up with email
3. Click "Create API Key"
4. Copy the key (starts with `gsk_...`)

### Step 2: Add API Key

1. Open `script.js`
2. Find line 2-6:
```javascript
const API_CONFIG = {
    GROQ_API_KEY: 'YOUR_KEY_HERE', // Paste your key here
    OPENAI_API_KEY: '',
    PROVIDER: 'groq'
};
```
3. Replace `YOUR_KEY_HERE` with your actual key
4. Save the file

### Step 3: Run the Website

**Windows:**
- Double-click `START_SERVER.bat`
- Open browser to: http://localhost:8000

**Manual:**
```bash
cd "ai website"
python -m http.server 8000
```

## 🎯 Usage

1. Type your message in the chat box
2. Press **Enter** to send
3. Use **Shift + Enter** for new lines
4. Chat naturally!

### Quick Commands
- Type `hi` → Instant greeting
- Type `how are you` → Instant response
- Ask anything → AI responds

## 📁 Files Included

```
ai website/
├── index.html          # Main chat interface
├── style.css           # Dark theme styling
├── script.js           # AI logic (ADD YOUR KEY HERE!)
├── README.md           # Detailed documentation
├── START_HERE.html     # Visual setup guide
├── START_SERVER.bat    # Quick server launcher
└── SETUP_GUIDE.md      # This file
```

## 🎨 Design Features

✅ **Matches Your Screenshot:**
- Dark background (#0f1419)
- Clean header with "LAI" logo
- Rounded message bubbles
- Blue accent color (#1d9bf0)
- Typing indicators
- Smooth animations

✅ **Responsive:**
- Works on desktop
- Works on mobile
- Works on tablets

✅ **Modern UI:**
- Smooth animations
- Hover effects
- Auto-scroll
- Code highlighting

## 🔧 Customization

### Change Colors
Edit `style.css`:
```css
/* Line 9: Background color */
background: #0f1419;

/* Line 125: Button color */
background: #1d9bf0;
```

### Change AI Name
1. Edit `index.html` - Change "LAI" text
2. Edit `script.js` - Update system prompt

### Add More Features
- Edit `script.js` to add custom commands
- Modify `style.css` for different themes
- Update `index.html` for layout changes

## 💡 Tips

1. **Use Groq** - It's free and fast!
2. **Keep API Key Private** - Don't share your key
3. **Test Locally First** - Use the local server
4. **Mobile Works** - Try it on your phone!

## 🚨 Troubleshooting

### "Please configure your API key"
→ You forgot to add your key in `script.js`

### CORS Errors
→ Use the local server (START_SERVER.bat)

### API Errors
→ Check your API key is valid and has credits

### Server Won't Start
→ Make sure Python is installed
→ Try: `python --version`

## 🌐 Deploy Online (Optional)

Want to host it online? Use:

1. **Netlify** (Free)
   - Drag and drop the folder
   - Get a free URL

2. **Vercel** (Free)
   - Connect GitHub
   - Auto-deploy

3. **GitHub Pages** (Free)
   - Push to GitHub
   - Enable Pages

**Note:** Remember to keep your API key secure!

## 📞 Support

- Check README.md for more details
- Visit Groq docs: https://console.groq.com/docs
- Visit OpenAI docs: https://platform.openai.com/docs

---

## 🎉 You're Ready!

1. ✅ Add your API key to `script.js`
2. ✅ Run `START_SERVER.bat`
3. ✅ Open http://localhost:8000
4. ✅ Start chatting!

**Enjoy your AI assistant! 🤖💬**
