# 🚀 Simple Setup - Shared API Key

This version is perfect for sharing with 3-4 people using ONE API key.

## ✅ Features

- ✅ **One API key for everyone** - Set it once, everyone uses it
- ✅ **No memory between sessions** - Fresh start every time
- ✅ **No data saved** - Nothing stored when chat closes
- ✅ **Multi-user friendly** - 3-4 people can use simultaneously
- ✅ **Super simple** - Just edit one file

## 🔧 Setup (2 Steps)

### Step 1: Get Free API Key

1. Visit: https://console.groq.com/keys
2. Sign up with email
3. Click "Create API Key"
4. Copy your key (starts with `gsk_...`)

### Step 2: Add API Key

1. Open `api-config.js`
2. Find line 8:
```javascript
API_KEY: 'YOUR_API_KEY_HERE',
```
3. Replace `YOUR_API_KEY_HERE` with your actual key:
```javascript
API_KEY: 'gsk_abc123xyz456...',
```
4. Save the file

**That's it!** 🎉

## 🌐 Run the Website

### Option 1: Double-click
- Open `index-simple.html` in your browser

### Option 2: Local Server
```bash
cd "ai website"
python -m http.server 8000
```
Then open: http://localhost:8000/index-simple.html

## 👥 Sharing with Friends

### Method 1: Same Computer
- Person 1: Opens in Chrome
- Person 2: Opens in Firefox
- Person 3: Opens in Edge
- All use the same API key!

### Method 2: Network Sharing
1. Start local server (see above)
2. Find your IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig`
3. Share: `http://YOUR_IP:8000/index-simple.html`
4. Friends on same WiFi can access it!

### Method 3: Online Hosting
1. Upload folder to Netlify/Vercel/GitHub Pages
2. Share the URL
3. Everyone can use it!

## 💡 How It Works

### Session Memory:
- ✅ Remembers conversation **during current chat**
- ✅ Uses last 10 messages for context
- ❌ Forgets everything when page closes/refreshes

### Example:
```
User: Hi, my name is John
AI: Nice to meet you, John!
User: What's my name?
AI: Your name is John!

[User closes tab]
[User opens new tab]

User: What's my name?
AI: I don't know your name yet. What is it?
```

## 🔒 Privacy

- ✅ No data saved to disk
- ✅ No conversation history stored
- ✅ Everything cleared on page close
- ✅ Fresh session every time

## 📊 Usage Limits

### Free Groq API:
- ~30 requests per minute
- Good for 3-4 people chatting casually
- If you hit limits, wait a minute

### If You Need More:
- Get OpenAI API key (paid but more capacity)
- Or get multiple Groq keys and rotate them

## 🎯 Perfect For:

- ✅ Small team (3-4 people)
- ✅ Family computer
- ✅ Friends sharing
- ✅ Classroom use
- ✅ Quick demos

## ⚠️ Important Notes

1. **One API Key = One Bill**
   - All usage goes to your account
   - Monitor usage at console.groq.com

2. **No User Separation**
   - Everyone uses same key
   - Can't track who said what
   - Perfect for trusted groups

3. **No Persistence**
   - Conversations don't save
   - Refresh = fresh start
   - This is by design!

## 🆚 Comparison

### Simple Version (This One):
- ✅ One API key for all
- ✅ No setup modal
- ✅ No memory between sessions
- ✅ Edit one file to configure

### Advanced Version (index.html):
- ✅ Each person enters their key
- ✅ Setup modal
- ✅ Key saved in browser
- ✅ Multi-user with separate keys

## 📝 Files You Need

```
ai website/
├── index-simple.html      # Main page (use this)
├── api-config.js          # Edit your API key here
├── script-simple.js       # Logic (don't edit)
└── style.css              # Styling (don't edit)
```

## 🎉 Quick Start

```bash
# 1. Edit api-config.js - add your key
# 2. Open index-simple.html in browser
# 3. Start chatting!
```

That's it! Super simple! 🚀

---

**Questions?**
- Check that your API key is correct
- Make sure you have internet connection
- Try refreshing the page
