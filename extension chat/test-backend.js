// Quick test script to diagnose backend issues

console.log('🔍 Testing OctiBuy Backend Configuration...\n');

// Test 1: Check .env.local file
try {
  require('dotenv').config({ path: '.env.local' });
  console.log('✅ Test 1: .env.local file loaded');
} catch (error) {
  console.log('❌ Test 1: Failed to load .env.local');
  console.log('Error:', error.message);
}

// Test 2: Check API keys
console.log('\n🔑 API Keys Status:');
console.log('Gemini API Key:', process.env.GEMINI_API_KEY ? '✅ Found (' + process.env.GEMINI_API_KEY.substring(0, 10) + '...)' : '❌ Missing');
console.log('SerpAPI Key:', process.env.SERPAPI_KEY ? '✅ Found (' + process.env.SERPAPI_KEY.substring(0, 10) + '...)' : '❌ Missing');

// Test 3: Test Gemini API
async function testGeminiAPI() {
  console.log('\n🤖 Testing Gemini API connection...');
  
  if (!process.env.GEMINI_API_KEY) {
    console.log('❌ Cannot test - Gemini API key missing');
    return;
  }

  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    console.log('📡 Sending test request to Gemini...');
    const result = await model.generateContent('Say "Hello from OctiBuy!" in one sentence.');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API Response:', text);
    console.log('✅ Gemini API is working correctly!');
  } catch (error) {
    console.log('❌ Gemini API Error:', error.message);
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('💡 Your Gemini API key appears to be invalid');
      console.log('💡 Get a new key from: https://makersuite.google.com/app/apikey');
    }
  }
}

// Test 4: Check required packages
console.log('\n📦 Checking required packages...');
const requiredPackages = ['express', 'cors', '@google/generative-ai', 'dotenv', 'node-fetch'];
let missingPackages = [];

requiredPackages.forEach(pkg => {
  try {
    require.resolve(pkg);
    console.log(`✅ ${pkg}`);
  } catch (e) {
    console.log(`❌ ${pkg} - MISSING`);
    missingPackages.push(pkg);
  }
});

if (missingPackages.length > 0) {
  console.log('\n⚠️  Missing packages detected!');
  console.log('Run this command to install:');
  console.log(`npm install ${missingPackages.join(' ')}`);
}

// Run Gemini test
testGeminiAPI().then(() => {
  console.log('\n✅ Diagnostic complete!');
  console.log('\nIf all tests passed, your backend should work.');
  console.log('Start it with: node backend-api.js');
}).catch(err => {
  console.log('\n❌ Diagnostic failed:', err.message);
});
