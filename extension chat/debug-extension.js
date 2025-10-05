// Debug script to test OptiBuy DealBot Extension
// Run this in Chrome DevTools Console to diagnose issues

console.log('🔍 OptiBuy DealBot Extension Debug Tool');

// Test 1: Check extension storage
async function testExtensionStorage() {
  console.log('\n📦 Testing Extension Storage...');
  
  try {
    const settings = await chrome.storage.sync.get(['backendUrl', 'sessionId']);
    console.log('✅ Storage access working');
    console.log('Backend URL:', settings.backendUrl || '❌ Not set');
    console.log('Session ID:', settings.sessionId || '❌ Not set');
    
    if (!settings.backendUrl) {
      console.log('🚨 ISSUE: Backend URL not configured!');
      console.log('Solution: Set backend URL in extension settings');
      return false;
    }
    
    return true;
  } catch (error) {
    console.log('❌ Storage error:', error);
    return false;
  }
}

// Test 2: Check backend API connectivity
async function testBackendAPI() {
  console.log('\n🌐 Testing Backend API...');
  
  try {
    const settings = await chrome.storage.sync.get(['backendUrl']);
    const backendUrl = settings.backendUrl;
    
    if (!backendUrl) {
      console.log('❌ No backend URL configured');
      return false;
    }
    
    console.log('Testing backend URL:', backendUrl);
    
    // Test health endpoint
    const healthResponse = await fetch(`${backendUrl}/api/health`);
    console.log('Health check status:', healthResponse.status);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Backend API is running');
      console.log('Health response:', healthData);
      return true;
    } else {
      console.log('❌ Backend API not responding');
      console.log('Status:', healthResponse.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Backend API error:', error.message);
    console.log('🚨 ISSUE: Cannot connect to backend!');
    console.log('Solutions:');
    console.log('1. Make sure backend server is running');
    console.log('2. Check backend URL in extension settings');
    console.log('3. Verify API keys are configured');
    return false;
  }
}

// Test 3: Test chat message
async function testChatMessage() {
  console.log('\n💬 Testing Chat Message...');
  
  try {
    const settings = await chrome.storage.sync.get(['backendUrl']);
    const backendUrl = settings.backendUrl;
    
    if (!backendUrl) {
      console.log('❌ No backend URL configured');
      return false;
    }
    
    const chatResponse = await fetch(`${backendUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Hello, this is a test message',
        sessionId: 'test-session'
      })
    });
    
    console.log('Chat API status:', chatResponse.status);
    
    if (chatResponse.ok) {
      const chatData = await chatResponse.json();
      console.log('✅ Chat API working');
      console.log('Response:', chatData);
      return true;
    } else {
      console.log('❌ Chat API error');
      const errorText = await chatResponse.text();
      console.log('Error response:', errorText);
      return false;
    }
  } catch (error) {
    console.log('❌ Chat message error:', error.message);
    return false;
  }
}

// Test 4: Check extension background script
async function testBackgroundScript() {
  console.log('\n🔧 Testing Background Script...');
  
  try {
    // Test if background script is responding
    const response = await new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getSettings' }, resolve);
    });
    
    if (response && response.success) {
      console.log('✅ Background script responding');
      console.log('Settings:', response.data);
      return true;
    } else {
      console.log('❌ Background script not responding');
      return false;
    }
  } catch (error) {
    console.log('❌ Background script error:', error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting OptiBuy DealBot Extension Diagnostics...\n');
  
  const results = {
    storage: await testExtensionStorage(),
    background: await testBackgroundScript(),
    backend: await testBackendAPI(),
    chat: false
  };
  
  // Only test chat if backend is working
  if (results.backend) {
    results.chat = await testChatMessage();
  }
  
  console.log('\n📊 DIAGNOSTIC RESULTS:');
  console.log('Extension Storage:', results.storage ? '✅' : '❌');
  console.log('Background Script:', results.background ? '✅' : '❌');
  console.log('Backend API:', results.backend ? '✅' : '❌');
  console.log('Chat API:', results.chat ? '✅' : '❌');
  
  console.log('\n🎯 RECOMMENDATIONS:');
  
  if (!results.storage) {
    console.log('- Configure extension settings (backend URL)');
  }
  
  if (!results.background) {
    console.log('- Reload the extension in chrome://extensions/');
  }
  
  if (!results.backend) {
    console.log('- Start backend server: npm run dev');
    console.log('- Check API keys in .env.local');
    console.log('- Verify backend URL: http://localhost:3001');
  }
  
  if (!results.chat && results.backend) {
    console.log('- Check Gemini API key in backend');
    console.log('- Verify backend chat endpoint');
  }
  
  if (results.storage && results.background && results.backend && results.chat) {
    console.log('🎉 Everything is working! Extension should be functional.');
  }
}

// Auto-run diagnostics
runAllTests();
