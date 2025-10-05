// Background script for OptiBuy DealBot Chrome Extension

// Initialize extension
chrome.runtime.onInstalled.addListener((details) => {
  console.log('OptiBuy DealBot extension installed:', details);
  
  // Set default settings
  chrome.storage.sync.set({
    backendUrl: 'http://localhost:3001',
    sessionId: null,
    chatHistory: []
  });
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  switch (request.action) {
    case 'sendChatMessage':
      handleChatMessage(request.message, request.sessionId)
        .then(response => sendResponse({ success: true, data: response }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // Keep message channel open for async response
      
    case 'getSettings':
      chrome.storage.sync.get(['backendUrl', 'sessionId'])
        .then(settings => sendResponse({ success: true, data: settings }));
      return true;
      
    case 'saveSettings':
      chrome.storage.sync.set({
        backendUrl: request.backendUrl,
        sessionId: request.sessionId || generateSessionId()
      }).then(() => sendResponse({ success: true }));
      return true;
      
    case 'clearChatHistory':
      chrome.storage.local.set({ chatHistory: [] })
        .then(() => sendResponse({ success: true }));
      return true;
      
    case 'openPopupWithQuery':
      handleOpenPopupWithQuery(request.query)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;
      
    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// Handle chat message processing
async function handleChatMessage(message, sessionId) {
  try {
    console.log('Processing chat message:', message);
    
    // Get backend URL from storage
    const settings = await chrome.storage.sync.get(['backendUrl']);
    
    if (!settings.backendUrl || settings.backendUrl === '') {
      throw new Error('Backend URL not configured. Please set it in settings.');
    }
    
    // Call backend API
    const response = await fetch(`${settings.backendUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        sessionId: sessionId
      })
    });
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Backend API error');
    }
    
    // Save to chat history
    const chatHistory = await chrome.storage.local.get('chatHistory');
    const history = chatHistory.chatHistory || [];
    
    const newMessages = [
      { role: 'user', content: message, timestamp: new Date().toISOString() },
      { role: 'assistant', content: data.data.response, timestamp: data.data.timestamp, products: data.data.products }
    ];
    
    history.push(...newMessages);
    
    // Keep only last 50 messages to prevent storage bloat
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }
    
    await chrome.storage.local.set({ chatHistory: history });
    
    // Update session ID if provided
    if (data.data.sessionId) {
      await chrome.storage.sync.set({ sessionId: data.data.sessionId });
    }
    
    return data.data;
  } catch (error) {
    console.error('Error processing chat message:', error);
    throw error;
  }
}

// Generate session ID helper
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Handle opening popup with specific query
async function handleOpenPopupWithQuery(query) {
  try {
    // Store the query for the popup to use
    await chrome.storage.local.set({ 
      popupQuery: query,
      popupQueryTimestamp: new Date().toISOString()
    });
    
    // Open the popup
    await chrome.action.openPopup();
  } catch (error) {
    console.error('Error opening popup with query:', error);
    throw error;
  }
}
