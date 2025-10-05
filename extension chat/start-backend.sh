#!/bin/bash

# OctiBuy's DealBot Backend Startup Script

echo "🚀 Starting OctiBuy's DealBot Backend Server..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ] || [ ! -d "node_modules/express" ]; then
    echo "📦 Installing dependencies..."
    npm install express cors @google/generative-ai dotenv node-fetch nodemon
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Please create .env.local with your API keys"
    exit 1
fi

echo "✅ Starting backend server..."
echo ""
node backend-api.js
