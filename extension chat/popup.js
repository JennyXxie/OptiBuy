// Popup script for OptiBuy DealBot Chrome Extension

class DealBotPopup {
  constructor() {
    this.messages = [];
    this.currentSessionId = null;
    this.currentProducts = [];
    this.isLoading = false;
    
    this.initializeElements();
    this.bindEvents();
    this.loadSettings();
    this.loadChatHistory();
    this.checkForPopupQuery();
  }
  
  initializeElements() {
    // Main elements
    this.messagesContainer = document.getElementById('messagesContainer');
    this.messageInput = document.getElementById('messageInput');
    this.sendButton = document.getElementById('sendButton');
    this.loadingIndicator = document.getElementById('loadingIndicator');
    this.statusIndicator = document.getElementById('statusIndicator');
    
    // Panels
    this.productsPanel = document.getElementById('productsPanel');
    this.settingsPanel = document.getElementById('settingsPanel');
    this.productsList = document.getElementById('productsList');
    this.productsBtn = document.getElementById('productsBtn');
    
    // Quick actions
    this.quickActionBtns = document.querySelectorAll('.quick-action-btn');
    
    // Footer buttons
    this.settingsBtn = document.getElementById('settingsBtn');
    this.clearBtn = document.getElementById('clearBtn');
    this.closeProducts = document.getElementById('closeProducts');
    this.closeSettings = document.getElementById('closeSettings');
    
    // Settings
    this.backendUrlInput = document.getElementById('backendUrl');
    this.sessionIdInput = document.getElementById('sessionId');
    this.saveSettingsBtn = document.getElementById('saveSettings');
  }
  
  bindEvents() {
    // Send message
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Input validation
    this.messageInput.addEventListener('input', () => {
      this.sendButton.disabled = !this.messageInput.value.trim() || this.isLoading;
    });
    
    // Quick actions
    this.quickActionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.messageInput.value = btn.dataset.query;
        this.sendMessage();
      });
    });
    
    // Panel controls
    this.productsBtn.addEventListener('click', () => this.showProductsPanel());
    this.closeProducts.addEventListener('click', () => this.hideProductsPanel());
    this.settingsBtn.addEventListener('click', () => this.showSettingsPanel());
    this.closeSettings.addEventListener('click', () => this.hideSettingsPanel());
    this.clearBtn.addEventListener('click', () => this.clearChat());
    
    // Settings
    this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
  }
  
  async loadSettings() {
    try {
      const response = await this.sendMessageToBackground('getSettings');
      if (response.success) {
        this.backendUrlInput.value = response.data.backendUrl || 'http://localhost:3001';
        this.sessionIdInput.value = response.data.sessionId || '';
        
        // Check if backend URL is configured
        const hasBackendUrl = response.data.backendUrl && response.data.backendUrl !== '';
        this.updateStatus(hasBackendUrl ? 'online' : 'offline');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }
  
  async loadChatHistory() {
    try {
      const result = await chrome.storage.local.get('chatHistory');
      const history = result.chatHistory || [];
      
      if (history.length > 0) {
        // Clear welcome message
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
          welcomeMessage.remove();
        }
        
        // Load messages
        history.forEach(msg => {
          this.addMessageToUI(msg.role, msg.content, msg.products);
        });
        
        // Get session ID from storage
        const sessionResult = await chrome.storage.sync.get('currentSessionId');
        this.currentSessionId = sessionResult.currentSessionId;
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  }
  
  async sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message || this.isLoading) return;
    
    // Add user message to UI
    this.addMessageToUI('user', message);
    
    // Clear input
    this.messageInput.value = '';
    this.sendButton.disabled = true;
    
    // Show loading
    this.setLoading(true);
    
    try {
      const response = await this.sendMessageToBackground('sendChatMessage', {
        message: message,
        sessionId: this.currentSessionId
      });
      
      if (response.success) {
        // Add assistant response to UI
        this.addMessageToUI('assistant', response.data.response, response.data.products);
        
        // Update session ID
        this.currentSessionId = response.data.sessionId;
        chrome.storage.sync.set({ currentSessionId: this.currentSessionId });
        
        // Show products if available
        if (response.data.products && response.data.products.length > 0) {
          this.currentProducts = response.data.products;
          this.showProductsButton();
          this.displayProducts(response.data.products);
        }
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.addMessageToUI('assistant', "I'm sorry, I'm having trouble processing your request right now. Please try again later.");
    } finally {
      this.setLoading(false);
    }
  }
  
  addMessageToUI(role, content, products = null) {
    const messageId = Date.now().toString();
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    messageDiv.id = messageId;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    if (role === 'user') {
      avatar.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      `;
    } else {
      avatar.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      `;
    }
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = this.formatMessage(content);
    
    const timestamp = document.createElement('div');
    timestamp.className = 'message-timestamp';
    timestamp.textContent = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    messageContent.appendChild(timestamp);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    this.messagesContainer.appendChild(messageDiv);
    this.scrollToBottom();
    
    // Store message
    this.messages.push({
      id: messageId,
      role: role,
      content: content,
      products: products,
      timestamp: new Date().toISOString()
    });
  }
  
  formatMessage(content) {
    // Convert markdown-like formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br>');
  }
  
  displayProducts(products) {
    this.productsList.innerHTML = '';
    
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-item';
      
      productDiv.innerHTML = `
        <img src="${product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+'}" 
             alt="${product.name}" class="product-image" 
             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNEMUQ1REIiLz4KPC9zdmc+'">
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${product.price}</div>
          <div class="product-platform">${product.platform}</div>
          <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="product-link">View Product</a>
        </div>
      `;
      
      this.productsList.appendChild(productDiv);
    });
  }
  
  showProductsPanel() {
    this.productsPanel.style.display = 'flex';
  }
  
  hideProductsPanel() {
    this.productsPanel.style.display = 'none';
  }
  
  showSettingsPanel() {
    this.settingsPanel.style.display = 'flex';
  }
  
  hideSettingsPanel() {
    this.settingsPanel.style.display = 'none';
  }
  
  showProductsButton() {
    this.productsBtn.style.display = 'flex';
  }
  
  async saveSettings() {
    const backendUrl = this.backendUrlInput.value.trim();
    const sessionId = this.sessionIdInput.value.trim() || null;
    
    try {
      const response = await this.sendMessageToBackground('saveSettings', {
        backendUrl: backendUrl,
        sessionId: sessionId
      });
      
      if (response.success) {
        this.updateStatus(backendUrl ? 'online' : 'offline');
        this.hideSettingsPanel();
        
        // Show success message
        this.showNotification('Settings saved successfully!');
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      this.showNotification('Error saving settings: ' + error.message);
    }
  }
  
  async clearChat() {
    try {
      const response = await this.sendMessageToBackground('clearChatHistory');
      if (response.success) {
        // Clear UI
        this.messagesContainer.innerHTML = `
          <div class="message assistant-message" id="welcomeMessage">
            <div class="message-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div class="message-content">
              <p>Hi! I'm DealBot, your AI shopping assistant. I can help you find the best deals, compare prices across platforms, and give you personalized shopping recommendations. What are you looking for today?</p>
            </div>
          </div>
        `;
        
        // Reset state
        this.messages = [];
        this.currentSessionId = null;
        this.currentProducts = [];
        this.productsBtn.style.display = 'none';
        this.hideProductsPanel();
        
        // Clear storage
        chrome.storage.local.remove('chatHistory');
        chrome.storage.sync.remove('currentSessionId');
        
        this.showNotification('Chat cleared successfully!');
      }
    } catch (error) {
      console.error('Error clearing chat:', error);
      this.showNotification('Error clearing chat: ' + error.message);
    }
  }
  
  setLoading(loading) {
    this.isLoading = loading;
    this.sendButton.disabled = loading || !this.messageInput.value.trim();
    
    if (loading) {
      this.loadingIndicator.style.display = 'flex';
    } else {
      this.loadingIndicator.style.display = 'none';
    }
  }
  
  updateStatus(status) {
    const statusDot = this.statusIndicator.querySelector('.status-dot');
    const statusText = this.statusIndicator.querySelector('.status-text');
    
    if (status === 'online') {
      statusDot.style.background = '#10b981';
      statusText.textContent = 'Online';
    } else {
      statusDot.style.background = '#ef4444';
      statusText.textContent = 'Offline';
    }
  }
  
  showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #10b981;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
  
  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
  
  async checkForPopupQuery() {
    try {
      const result = await chrome.storage.local.get(['popupQuery', 'popupQueryTimestamp']);
      
      if (result.popupQuery) {
        // Clear the query from storage
        chrome.storage.local.remove(['popupQuery', 'popupQueryTimestamp']);
        
        // Set the query in the input and send it
        this.messageInput.value = result.popupQuery;
        setTimeout(() => {
          this.sendMessage();
        }, 100);
      }
    } catch (error) {
      console.error('Error checking for popup query:', error);
    }
  }
  
  sendMessageToBackground(action, data = {}) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action, ...data }, resolve);
    });
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DealBotPopup();
});
