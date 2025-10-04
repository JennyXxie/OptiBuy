import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function HatPriceApp() {
  const [apiKey, setApiKey] = useState('');
  const [hatQuery, setHatQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPriceHistory = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API key');
      return;
    }
    if (!hatQuery.trim()) {
      setError('Please describe the hat you want to know about');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('http://localhost:3001/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          query: `Please provide information about the price history of: ${hatQuery}. Include historical price ranges, price trends over time, and factors that affect pricing if known.`
        })
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error.message || 'Failed to get response from Gemini');
      } else if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setError('Unexpected response format from Gemini');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Price History Finder
          </h1>
          <p className="text-gray-600 mb-6">
            Ask Google Gemini about the price history of anything
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Gemini API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get your API key from{' '}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Google AI Studio
                </a>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe the Hat
              </label>
              <input
                type="text"
                value={hatQuery}
                onChange={(e) => setHatQuery(e.target.value)}
                placeholder="e.g., baseball cap, fedora, Panama hat"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                onKeyPress={(e) => e.key === 'Enter' && fetchPriceHistory()}
              />
            </div>

            <button
              onClick={fetchPriceHistory}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Getting Price History...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Get Price History
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {response && (
            <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Price History Information:
              </h2>
              <div className="text-gray-700 whitespace-pre-wrap">
                {response}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}