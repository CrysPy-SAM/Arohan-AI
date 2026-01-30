const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Validate API key on startup
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables!');
  console.error('Please add GEMINI_API_KEY to your .env file');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiModel = () => {
  try {
    return genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    });
  } catch (error) {
    console.error('Error initializing Gemini model:', error);
    throw new Error('Failed to initialize AI model');
  }
};

module.exports = { getGeminiModel };