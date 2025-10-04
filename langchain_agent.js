// LangChain AI Shopping Assistant
// File: langchain-agent.js
// Install: npm install langchain @langchain/openai @langchain/community

const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { RunnableSequence } = require('@langchain/core/runnables');
const { StructuredOutputParser } = require('langchain/output_parsers');
const { z } = require('zod');

// Configure OpenAI (set OPENAI_API_KEY in environment)
const model = new ChatOpenAI({
  modelName: 'gpt-4',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// ============================================
// SHOPPING ASSISTANT AGENT
// ============================================

/**
 * AI-powered shopping assistant that analyzes price data and provides
 * personalized recommendations using LangChain
 */
class ShoppingAssistant {
  constructor() {
    this.model = model;
  }

  /**
   * Analyze price data and generate comprehensive shopping advice
   */
  async analyzeAndAdvise(priceData, userContext = {}) {
    const {
      product_name,
      current_price,
      currency,
      stats,
      recommendation,
      price_history
    } = priceData;

    const {
      budget = null,
      urgency = 'normal', // 'urgent', 'normal', 'flexible'
      preferences = null
    } = userContext;

    // Create structured output parser
    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        summary: z.string().describe('Brief summary of price analysis'),
        recommendation: z.enum(['buy_now', 'wait', 'set_alert', 'consider_alternatives'])
          .describe('Action recommendation'),
        reasoning: z.string().describe('Detailed reasoning for the recommendation'),
        price_prediction: z.string().describe('Prediction of future price movement'),
        best_time_to_buy: z.string().describe('When is the best time to purchase'),
        savings_potential: z.number().describe('Estimated savings if waiting (in currency units)'),
        confidence_score: z.number().min(0).max(100).describe('Confidence in recommendation (0-100)'),
        alternative_suggestions: z.array(z.string()).describe('Alternative strategies or products to consider'),
      })
    );

    const formatInstructions = parser.getFormatInstructions();

    // Create prompt template
    const prompt = PromptTemplate.fromTemplate(`
You are an expert shopping advisor analyzing e-commerce price data. Provide comprehensive, data-driven advice.

PRODUCT INFORMATION:
- Name: {product_name}
- Current Price: {current_price} {currency}
- Historical Low: {min_price} {currency}
- Historical High: {max_price} {currency}
- Median Price: {median_price} {currency}
- Current Percentile: {percentile}th (lower is better)
- Price Trend: {trend}
- Days of History: {history_days}

USER CONTEXT:
- Budget: {budget}
- Purchase Urgency: {urgency}
- Preferences: {preferences}

SYSTEM RECOMMENDATION: {system_rec}
RATIONALE: {system_rationale}

Analyze this data and provide personalized shopping advice. Consider:
1. Historical price patterns and trends
2. Current market position (percentile ranking)
3. User's budget constraints and urgency
4. Seasonal factors and typical e-commerce cycles
5. Probability of further price drops

{format_instructions}
`);

    // Build the chain
    const chain = RunnableSequence.from([
      prompt,
      this.model,
      parser
    ]);

    // Prepare data for prompt
    const priceHistoryDays = price_history?.filter(p => p.price !== null).length || 0;
    const trend = stats.trend_slope_per_day > 0.1 ? 'Rising' :
                  stats.trend_slope_per_day < -0.1 ? 'Falling' : 'Stable';

    const result = await chain.invoke({
      product_name,
      current_price: current_price.toFixed(2),
      currency,
      min_price: stats.min?.toFixed(2) || 'N/A',
      max_price: stats.max?.toFixed(2) || 'N/A',
      median_price: stats.median?.toFixed(2) || 'N/A',
      percentile: stats.current_percentile_rank?.toFixed(0) || 'N/A',
      trend,
      history_days: priceHistoryDays,
      budget: budget || 'No limit specified',
      urgency,
      preferences: preferences || 'None specified',
      system_rec: recommendation.action,
      system_rationale: recommendation.rationale,
      format_instructions: formatInstructions,
    });

    return result;
  }

  /**
   * Compare multiple products and recommend the best option
   */
  async compareProducts(productsData, userQuery) {
    const prompt = PromptTemplate.fromTemplate(`
You are a shopping comparison expert. Compare these products and recommend the best option.

USER QUERY: {query}

PRODUCTS TO COMPARE:
{products_info}

Provide a detailed comparison considering:
1. Current prices and value for money
2. Price trends and deal quality
3. Historical pricing patterns
4. Best overall value

Recommend which product to buy and explain why in 2-3 paragraphs.
`);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());

    const productsInfo = productsData.map((p, i) => `
Product ${i + 1}: ${p.product_name}
- Current Price: $${p.current_price}
- Historical Low: $${p.stats.min}
- Percentile: ${p.stats.current_percentile_rank}th
- Recommendation: ${p.recommendation.action}
    `).join('\n');

    const result = await chain.invoke({
      query: userQuery,
      products_info: productsInfo
    });

    return result;
  }

  /**
   * Generate a natural language summary of price history
   */
  async summarizePriceHistory(priceData) {
    const prompt = PromptTemplate.fromTemplate(`
Summarize this product's price history in a conversational, easy-to-understand way.

Product: {product_name}
Current Price: ${priceData.current_price} {currency}
Price Range: ${priceData.stats.min} - ${priceData.stats.max} {currency}
Median: ${priceData.stats.median} {currency}
Trend: {trend}

Create a 2-3 sentence summary that helps a shopper understand the pricing pattern.
Be conversational and actionable.
`);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());

    const trend = priceData.stats.trend_slope_per_day > 0.1 ? 'increasing' :
                  priceData.stats.trend_slope_per_day < -0.1 ? 'decreasing' : 'stable';

    const result = await chain.invoke({
      product_name: priceData.product_name,
      currency: priceData.currency,
      trend
    });

    return result;
  }

  /**
   * Answer natural language questions about price data
   */
  async answerQuestion(priceData, question) {
    const prompt = PromptTemplate.fromTemplate(`
You are a helpful shopping assistant. Answer this question about the product using the price data provided.

PRODUCT DATA:
Name: {product_name}
Current Price: {current_price} {currency}
Historical Low: {min_price} {currency}
Historical High: {max_price} {currency}
Median: {median_price} {currency}
Current Percentile: {percentile}th
Price History Available: {history_available}

QUESTION: {question}

Provide a helpful, accurate answer based on the data. If the data doesn't contain enough information to answer, say so.
`);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());

    const result = await chain.invoke({
      product_name: priceData.product_name,
      current_price: priceData.current_price.toFixed(2),
      currency: priceData.currency,
      min_price: priceData.stats.min?.toFixed(2) || 'N/A',
      max_price: priceData.stats.max?.toFixed(2) || 'N/A',
      median_price: priceData.stats.median?.toFixed(2) || 'N/A',
      percentile: priceData.stats.current_percentile_rank?.toFixed(0) || 'N/A',
      history_available: priceData.price_history?.length > 0 ? 'Yes' : 'No',
      question
    });

    return result;
  }

  /**
   * Generate personalized price alerts with smart thresholds
   */
  async generatePriceAlert(priceData, userPreferences = {}) {
    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        alert_threshold: z.number().describe('Recommended price to set alert at'),
        alert_reasoning: z.string().describe('Why this threshold makes sense'),
        probability_of_reaching: z.number().min(0).max(100)
          .describe('Likelihood of reaching this price in next 30 days (%)'),
        alternative_thresholds: z.array(z.object({
          price: z.number(),
          description: z.string()
        })).describe('Other alert options (aggressive, moderate, conservative)')
      })
    );

    const formatInstructions = parser.getFormatInstructions();

    const prompt = PromptTemplate.fromTemplate(`
Based on historical price data, recommend smart price alert thresholds.

PRODUCT: {product_name}
CURRENT PRICE: {current_price} {currency}
HISTORICAL LOW: {min_price} {currency}
MEDIAN: {median_price} {currency}
25TH PERCENTILE: {p25} {currency}
TREND: {trend}

USER PREFERENCES:
- Deal Seeking: {deal_preference} (aggressive/moderate/conservative)
- Timeframe: {timeframe}

Recommend a realistic price alert threshold that balances deal quality with achievability.

{format_instructions}
`);

    const chain = RunnableSequence.from([
      prompt,
      this.model,
      parser
    ]);

    const trend = priceData.stats.trend_slope_per_day > 0.1 ? 'Rising' :
                  priceData.stats.trend_slope_per_day < -0.1 ? 'Falling' : 'Stable';

    const result = await chain.invoke({
      product_name: priceData.product_name,
      current_price: priceData.current_price.toFixed(2),
      currency: priceData.currency,
      min_price: priceData.stats.min?.toFixed(2),
      median_price: priceData.stats.median?.toFixed(2),
      p25: priceData.stats.percentile_25?.toFixed(2),
      trend,
      deal_preference: userPreferences.dealSeeking || 'moderate',
      timeframe: userPreferences.timeframe || '30 days',
      format_instructions: formatInstructions
    });

    return result;
  }
}

// ============================================
// CONVERSATIONAL SHOPPING AGENT
// ============================================

/**
 * Conversational agent that can discuss products, compare options,
 * and provide shopping advice through natural dialogue
 */
class ConversationalShoppingAgent {
  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4',
      temperature: 0.8,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.conversationHistory = [];
  }

  /**
   * Chat with the agent about shopping decisions
   */
  async chat(userMessage, priceData = null) {
    // Add context if price data is available
    let contextMessage = '';
    if (priceData) {
      contextMessage = `
CURRENT PRODUCT CONTEXT:
- Product: ${priceData.product_name}
- Current Price: $${priceData.current_price}
- Deal Quality: ${priceData.stats.current_percentile_rank}th percentile
- Recommendation: ${priceData.recommendation.action}
`;
    }

    const prompt = PromptTemplate.fromTemplate(`
You are a friendly, knowledgeable shopping assistant. Help the user make informed purchasing decisions.

{context}

CONVERSATION HISTORY:
{history}

USER: {message}

ASSISTANT: Provide helpful, conversational advice. Be friendly but data-driven. If you don't have enough information, ask clarifying questions.
`);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());

    const history = this.conversationHistory
      .map(h => `${h.role}: ${h.content}`)
      .join('\n');

    const result = await chain.invoke({
      context: contextMessage,
      history: history || 'None',
      message: userMessage
    });

    // Update conversation history
    this.conversationHistory.push(
      { role: 'USER', content: userMessage },
      { role: 'ASSISTANT', content: result }
    );

    // Keep only last 10 exchanges
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    return result;
  }

  /**
   * Reset conversation
   */
  resetConversation() {
    this.conversationHistory = [];
  }
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  ShoppingAssistant,
  ConversationalShoppingAgent
};

// ============================================
// EXAMPLE USAGE
// ============================================

/*
// Initialize the assistant
const assistant = new ShoppingAssistant();

// Get AI-powered analysis
const priceData = {
  product_name: "Sony WH-1000XM4 Headphones",
  current_price: 278.00,
  currency: "USD",
  stats: {
    min: 248.00,
    max: 349.99,
    median: 298.00,
    current_percentile_rank: 35.2,
    trend_slope_per_day: -0.15
  },
  recommendation: {
    action: "BUY_NOW",
    rationale: "Price is below 25th percentile"
  },
  price_history: [...]
};

// Get comprehensive analysis
const advice = await assistant.analyzeAndAdvise(priceData, {
  budget: 300,
  urgency: 'normal'
});

console.log(advice);
// {
//   summary: "The Sony WH-1000XM4 is currently priced well below its historical average...",
//   recommendation: "buy_now",
//   reasoning: "At $278, this is 35th percentile pricing...",
//   price_prediction: "Likely to remain stable or increase slightly...",
//   ...
// }

// Chat with the agent
const chatAgent = new ConversationalShoppingAgent();
const response = await chatAgent.chat(
  "Should I buy these headphones now or wait for Black Friday?",
  priceData
);
console.log(response);

// Generate smart price alerts
const alert = await assistant.generatePriceAlert(priceData, {
  dealSeeking: 'aggressive',
  timeframe: '30 days'
});
console.log(alert);

// Compare multiple products
const comparison = await assistant.compareProducts([priceData1, priceData2], 
  "Which noise-canceling headphones are the best deal?"
);
console.log(comparison);
*/