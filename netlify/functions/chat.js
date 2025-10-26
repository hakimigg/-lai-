// Netlify Function to proxy API requests
// This keeps your API key secret on the server

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message, conversationHistory } = JSON.parse(event.body);

    // Your API key is stored in Netlify environment variables (hidden)
    const API_KEY = process.env.GROQ_API_KEY;

    const messages = [
      {
        role: "system",
        content: "You are LAI, a friendly and helpful AI assistant. You chat naturally and help with anything - coding, questions, casual conversation, etc. Be warm, engaging, and conversational. Do not use emojis in your responses unless the user specifically asks for them."
      },
      ...conversationHistory.slice(-10),
      {
        role: "user",
        content: message
      }
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: messages,
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        response: data.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
