# 🤖 LAI - AI Assistant Website

Beautiful AI chat interface with shared API key support.

## ✅ Perfect For Your Use Case

- ✅ **One API key for 3-4 people**
- ✅ **No memory between sessions**
- ✅ **Nothing saved when chat closes**
- ✅ **Fresh start every time**
- ✅ **Super simple setup**

## 🚀 Quick Setup (2 Steps!)

### Step 1: Get Free API Key
1. Visit: **https://console.groq.com/keys**
2. Sign up and create API key
3. Copy it (starts with `gsk_...`)

### Step 2: Add Your Key
1. Open **`api-config.js`**
2. Line 8: Replace `YOUR_API_KEY_HERE` with your key
3. Save

**Done!** 🎉

## 🌐 How to Use

### Open the Website:
- Double-click **`index-simple.html`**
- Or run server: `python -m http.server 8000`

### Share with Friends:
- **Same computer**: Open in different browsers
- **Same network**: Share `http://YOUR_IP:8000/index-simple.html`
- **Online**: Upload to Netlify/Vercel

## 💬 How It Works

### During Chat:
```
User: Hi, my name is Sarah
AI: Nice to meet you, Sarah!
User: What's my name?
AI: Your name is Sarah!
```
✅ AI remembers conversation **during current session**

### After Closing/Refreshing:
```
[User closes tab and reopens]

User: What's my name?
AI: I don't know your name yet. What is it?
```
✅ Everything forgotten - **fresh start!**

## 🎯 Features

### What It Does:
- ✅ Real AI conversations (Groq/OpenAI)
- ✅ Remembers context during chat
- ✅ Beautiful dark UI
- ✅ Code highlighting
- ✅ Mobile responsive
- ✅ Instant greetings

### What It Doesn't Do:
- ❌ No saving conversations
- ❌ No memory between sessions
- ❌ No user accounts
- ❌ No data storage

## 👥 Multi-User Support

### Everyone Uses Same API Key:
- Person A opens website → Chats
- Person B opens website → Chats
- Person C opens website → Chats
- All use your one API key!

### Each Person Gets:
- ✅ Their own chat window
- ✅ Their own conversation
- ✅ Fresh session when they open
- ✅ No saved history

## 📁 Files

```
ai website/
├── index-simple.html      # Main page - use this!
├── api-config.js          # ADD YOUR API KEY HERE
├── script-simple.js       # Logic
├── style.css              # Styling
└── SIMPLE_SETUP.md        # Detailed guide
```

## 🔒 Privacy & Security

- ✅ No conversations saved
- ✅ No user tracking
- ✅ Fresh session every time
- ✅ Nothing stored on disk
- ✅ Complete privacy

## 💡 Tips

1. **Free Groq API** works great for 3-4 people
2. **Refresh page** for fresh start
3. **Share the link** - everyone can use it
4. **Monitor usage** at console.groq.com

## ⚠️ Important

- **One API key = One account**: All usage goes to your Groq account
- **Rate limits**: ~30 requests/minute (fine for 3-4 people)
- **No persistence**: This is by design - nothing saves!

## 🆚 Two Versions Available

### Simple Version (Recommended for you):
- **File**: `index-simple.html`
- **Setup**: Edit `api-config.js` once
- **Users**: 3-4 people share one key
- **Memory**: Only during current session
- **Best for**: Your use case!

### Advanced Version:
- **File**: `index-advanced.html`
- **Setup**: Each user enters their own key
- **Users**: Unlimited, each with own key
- **Memory**: Key saved in browser
- **Best for**: Public sharing

## 🎉 You're Ready!

1. ✅ Edit `api-config.js` - add your key
2. ✅ Open `index-simple.html`
3. ✅ Start chatting!
4. ✅ Share with 3-4 friends!

**That's it! Super simple!** 🚀

---

Need help? Check `SIMPLE_SETUP.md` for detailed instructions.
