#!/bin/bash

echo "🚀 Setting up OptiBuy DealBot Backend API..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "📝 Creating .env.local from example..."
    cp env-example.txt .env.local
    echo "✅ Created .env.local file"
    echo ""
    echo "🔑 Please edit .env.local and add your API keys:"
    echo "   GEMINI_API_KEY=your_actual_gemini_api_key"
    echo "   SERPAPI_KEY=your_actual_serpapi_key"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Check if API keys are configured
if grep -q "your_gemini_api_key_here" .env.local; then
    echo "❌ Please update your API keys in .env.local file!"
    echo "Edit .env.local and replace 'your_gemini_api_key_here' with your actual Gemini API key"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
if [ ! -f "package.json" ]; then
    mv backend-package.json package.json
fi

npm install

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "🚀 To start the backend server:"
echo "   npm run dev"
echo ""
echo "🧪 To test the API:"
echo "   curl http://localhost:3001/api/health"
echo ""
echo "🔧 Extension settings:"
echo "   Backend URL: http://localhost:3001"
