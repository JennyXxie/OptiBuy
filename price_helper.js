// E-commerce Price Helper Agent (Single File, Node.js) - CORRECTED VERSION
// Requires: axios, cheerio, puppeteer, simple-statistics
// Install with: npm install axios cheerio puppeteer simple-statistics

const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const ss = require('simple-statistics');

// Config
const FX_API = 'https://api.exchangerate.host/latest'; // Free FX API
const WAYBACK_API = 'https://web.archive.org/cdx/search/cdx';
const KEEPA_API_KEY = process.env.KEEPA_API_KEY; // Set in env if available

// Main Function
async function priceHelper({ product_url, region = 'US', currency_preference, timezone = 'America/New_York' }) {
  try {
    // 1. Fetch page HTML
    const html = await fetchHtml(product_url);

    // 2. Extract price candidates
    const priceCandidates = extractPrices(html);

    // 3. Pick best price, currency
    let { price: current_price, currency } = selectBestPrice(priceCandidates, html);

    // 4. Normalize currency
    let fx_rate = 1, fx_rate_source = FX_API, fx_rate_timestamp = new Date().toISOString();
    if (currency_preference && currency && currency_preference !== currency) {
      const fxData = await getFxRate(currency, currency_preference);
      fx_rate = fxData.rate;
      fx_rate_timestamp = fxData.timestamp;
      current_price = +(current_price * fx_rate).toFixed(2);
      currency = currency_preference;
    }

    // 5. Get price history (Keepa, retailer, Wayback fallback)
    let price_history = await getPriceHistory(product_url, html, currency, fx_rate);
    
    // 6. Clean, de-duplicate, align price history
    price_history = cleanPriceHistory(price_history);

    // 7. Compute stats
    const stats = computeStats(price_history, current_price);

    // 8. Recommendation
    const recommendation = makeRecommendation(stats, current_price);

    // 9. Output
    return {
      product_url,
      region,
      currency,
      fx_rate_source,
      fx_rate_timestamp,
      product_name: extractProductName(html),
      current_price,
      price_history,
      stats,
      recommendation
    };
  } catch (error) {
    throw new Error(`Price helper failed: ${error.message}`);
  }
}

// --- HTML Fetching ---
async function fetchHtml(url) {
  try {
    let res = await axios.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    let html = res.data;
    // Headless render if suspiciously low content
    if (html.length < 6000 || html.includes('<noscript')) {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      html = await page.content();
      await browser.close();
    }
    return html;
  } catch (e) {
    throw new Error(`Failed to fetch product page: ${e.message}`);
  }
}

// --- Price Extraction ---
function extractPrices(html) {
  const $ = cheerio.load(html);
  let candidates = [];

  // 1. Schema.org JSON-LD
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).text());
      let offer = json.offers || (Array.isArray(json) && json[0]?.offers);
      if (offer) {
        const price = Array.isArray(offer) ? offer[0]?.price : offer.price;
        const currency = Array.isArray(offer) ? offer[0]?.priceCurrency : offer.priceCurrency;
        candidates.push({
          price: normalizePrice(price),
          currency: currency,
          context: 'schema.org',
        });
      }
    } catch {}
  });

  // 2. Open Graph / Meta
  const ogPrice = $('meta[property="product:price:amount"]').attr('content');
  const ogCurrency = $('meta[property="product:price:currency"]').attr('content');
  if (ogPrice) {
    candidates.push({
      price: normalizePrice(ogPrice),
      currency: ogCurrency,
      context: 'opengraph',
    });
  }

  // 3. Common selectors
  [
    '[itemprop="price"]',
    '[data-test*="price"]',
    '[data-qa*="price"]',
    'meta[itemprop="price"]',
    '.price',
    '.product-price',
    '#price',
    '[data-price]',
  ].forEach(sel => {
    $(sel).each((_, el) => {
      let txt = $(el).text() || $(el).attr('content') || $(el).attr('data-price');
      if (txt) {
        candidates.push({
          price: normalizePrice(txt),
          currency: guessCurrency(txt),
          context: sel,
        });
      }
    });
  });

  // 4. Filter: exclude struck-through unless labeled as current
  candidates = candidates.filter(c =>
    c.price && !String(c.price).includes('was')
  );
  return candidates;
}

// --- Select Best Price ---
function selectBestPrice(candidates, html) {
  // Prefer schema.org, then opengraph, then first valid
  if (candidates.length === 0) throw new Error('No price candidates found!');
  
  // Try schema.org first
  for (let c of candidates) {
    if (c.context === 'schema.org' && c.price) return c;
  }
  
  // Try opengraph next
  for (let c of candidates) {
    if (c.context === 'opengraph' && c.price) return c;
  }
  
  // Return first valid price
  return candidates.find(c => c.price) || candidates[0];
}

// --- Normalize Price String ---
function normalizePrice(value) {
  if (!value) return null;
  let v = String(value).replace(/[^0-9.,]/g, ''); // Remove currency symbols
  if (!v) return null;
  
  // Handle decimal comma vs dot
  if ((v.match(/,/g) || []).length === 1 && v.indexOf('.') === -1) {
    v = v.replace(',', '.');
  } else if ((v.match(/,/g) || []).length > 1) {
    v = v.replace(/\./g, '').replace(/,/g, '.');
  }
  v = v.replace(/,/g, ''); // Remove thousands sep
  let price = parseFloat(v);
  return isNaN(price) ? null : price;
}

// --- Guess Currency from Symbol ---
function guessCurrency(txt) {
  if (!txt) return undefined;
  if (txt.includes('$')) return 'USD';
  if (txt.includes('€')) return 'EUR';
  if (txt.includes('£')) return 'GBP';
  if (txt.includes('¥')) return 'JPY';
  return undefined;
}

// --- FX Rate ---
async function getFxRate(from, to) {
  try {
    const res = await axios.get(`${FX_API}?base=${from}&symbols=${to}`, { timeout: 5000 });
    if (!res.data.rates || !res.data.rates[to]) {
      throw new Error(`No FX rate found for ${from} to ${to}`);
    }
    return {
      rate: res.data.rates[to],
      timestamp: res.data.date,
    };
  } catch (e) {
    console.error('FX API error:', e.message);
    throw new Error(`Failed to get exchange rate: ${e.message}`);
  }
}

// --- Price History ---
async function getPriceHistory(product_url, html, currency, fx_rate) {
  // If Amazon and KEEPA_API_KEY
  if (product_url.includes('amazon.') && KEEPA_API_KEY) {
    return await getKeepaHistory(product_url, currency, fx_rate);
  }
  // Else Wayback fallback: Get ≤1 snapshot per 7 days, last 180 days
  const timestamps = await getWaybackSnapshots(product_url, 180);
  let series = [];
  for (let ts of timestamps) {
    const snapUrl = `https://web.archive.org/web/${ts}/${product_url}`;
    try {
      const snapHtml = await fetchHtml(snapUrl);
      const candidates = extractPrices(snapHtml);
      if (candidates.length > 0) {
        const { price } = selectBestPrice(candidates, snapHtml);
        if (price) series.push({ date: tsToDate(ts), price, source: 'wayback' });
      }
    } catch (e) { 
      console.log(`Failed to fetch snapshot ${ts}: ${e.message}`);
    }
  }
  return series;
}

// --- Keepa History (Stub) ---
async function getKeepaHistory(url, currency, fx_rate) {
  console.warn('Keepa integration not implemented yet. Add your implementation here.');
  console.warn('Falling back to Wayback Machine...');
  // Return empty to trigger fallback behavior
  return [];
}

// --- Get Wayback Snapshots (CORRECTED) ---
async function getWaybackSnapshots(url, days) {
  const end = Math.floor(Date.now() / 1000);
  const start = end - days * 86400;
  
  // Format dates as YYYYMMDD (required by Wayback API)
  const fromDate = new Date(start * 1000).toISOString().slice(0,10).replace(/-/g, '');
  const toDate = new Date(end * 1000).toISOString().slice(0,10).replace(/-/g, '');
  
  // Use plain text output (default), NOT json
  const params = `?url=${encodeURIComponent(url)}&from=${fromDate}&to=${toDate}&filter=statuscode:200&limit=100`;
  
  try {
    const res = await axios.get(WAYBACK_API + params, { timeout: 10000 });
    const lines = res.data.trim().split('\n');
    
    // Each line is space-separated: urlkey timestamp original mimetype statuscode digest length
    const seen = new Set();
    let result = [];
    
    for (let line of lines) {
      const parts = line.split(' ');
      if (parts.length < 2) continue; // Skip invalid lines
      
      const ts = parts[1]; // timestamp is 2nd field
      if (!ts || ts.length < 8) continue;
      
      const weekNum = Math.floor(parseInt(ts.slice(0,8)) / 7); // Group by week
      
      if (!seen.has(weekNum)) {
        result.push(ts);
        seen.add(weekNum);
      }
    }
    
    return result;
  } catch (e) {
    console.error('Wayback API error:', e.message);
    return []; // Return empty array instead of crashing
  }
}

function tsToDate(ts) {
  // Wayback timestamp to YYYY-MM-DD
  if (!ts || ts.length < 8) return null;
  return `${ts.slice(0,4)}-${ts.slice(4,6)}-${ts.slice(6,8)}`;
}

// --- Clean & Align Series (CORRECTED) ---
function cleanPriceHistory(series) {
  // Deduplicate consecutive prices, remove outliers >4σ unless repeated
  if (!series.length) return [];
  
  let cleaned = [];
  let prev = null;
  let prices = series.map(p => p.price).filter(p => p != null);
  
  if (prices.length === 0) return [];
  
  let median = ss.median(prices);
  let std = prices.length > 1 ? ss.standardDeviation(prices) : 0;
  
  for (let p of series) {
    if (!p.price) continue;
    if (p.price !== prev) {
      // Outlier test (only if we have variation)
      if (std > 0 && Math.abs(p.price - median) > 4*std &&
          prices.filter(v => v === p.price).length < 2) continue;
      cleaned.push(p);
      prev = p.price;
    }
  }
  
  // Resample to daily, forward fill ≤7 days, else null
  let daily = [];
  if (cleaned.length) {
    let dates = cleaned.map(p => p.date);
    let start = new Date(dates[0]);
    let end = new Date(dates[dates.length-1]);
    let priceMap = Object.fromEntries(cleaned.map(p => [p.date, p.price]));
    let lastPrice = null, gap = 0;
    
    // Create new date each iteration to avoid mutation bug
    for (let d = new Date(start); d <= end; d = new Date(d.getTime() + 86400000)) {
      let dateStr = d.toISOString().slice(0,10);
      if (priceMap[dateStr]) {
        daily.push({ date: dateStr, price: priceMap[dateStr], source: 'wayback' });
        lastPrice = priceMap[dateStr];
        gap = 0;
      } else if (lastPrice && gap < 7) {
        daily.push({ date: dateStr, price: lastPrice, source: 'forward_fill' });
        gap++;
      } else {
        daily.push({ date: dateStr, price: null, source: 'missing' });
        gap = 0;
        lastPrice = null;
      }
    }
  }
  return daily;
}

// --- Stats ---
function computeStats(history, current) {
  let prices = history.filter(p => p.price != null).map(p => p.price);
  if (!prices.length) return {};
  
  let min = ss.min(prices);
  let max = ss.max(prices);
  let median = ss.median(prices);
  let pct25 = ss.quantile(prices, 0.25);
  let pct75 = ss.quantile(prices, 0.75);
  let current_pct_rank = ss.quantileRank(prices, current);
  
  // Linear regression for trend
  let validPoints = history
    .map((p, i) => ({ x: i, y: p.price }))
    .filter(pt => pt.y != null);
  
  let slope = 0;
  if (validPoints.length > 1) {
    let regression = ss.linearRegression(validPoints.map(pt => [pt.x, pt.y]));
    let ols = ss.linearRegressionLine(regression);
    slope = ols(1) - ols(0); // per day
  }
  
  return {
    min, 
    max, 
    median, 
    percentile_25: pct25, 
    percentile_75: pct75,
    trend_slope_per_day: +slope.toFixed(4),
    current_vs_median_delta: +(current - median).toFixed(2),
    current_percentile_rank: +(current_pct_rank * 100).toFixed(1)
  };
}

// --- Recommendation ---
function makeRecommendation(stats, current) {
  if (!stats || stats.median === undefined) {
    return { action: 'UNKNOWN', rationale: 'Insufficient price history.' };
  }
  
  const percentile = stats.current_percentile_rank;
  
  if (current <= stats.percentile_25) {
    return { 
      action: 'BUY_NOW', 
      rationale: `Current price is at the ${percentile}th percentile, which is a low for the past 6 months.` 
    };
  }
  
  if (current > stats.percentile_25 && current <= stats.median * 1.2) {
    return { 
      action: 'FAIR_PRICE', 
      rationale: `Current price is fair (${percentile}th percentile), not a historical low.` 
    };
  }
  
  if (current >= stats.percentile_75 || stats.trend_slope_per_day > 0.1) {
    return { 
      action: 'WAIT_FOR_DROP', 
      rationale: `Current price is high (${percentile}th percentile); consider waiting for a better deal.` 
    };
  }
  
  return { 
    action: 'FAIR_PRICE', 
    rationale: `Current price is typical for this period.` 
  };
}

// --- Extract Product Name ---
function extractProductName(html) {
  const $ = cheerio.load(html);
  let name = $('meta[property="og:title"]').attr('content')
    || $('title').text()
    || $('h1').first().text();
  return name ? name.trim() : '';
}

// --- Export for use ---
module.exports = { priceHelper };

// --- Example Usage ---
// Uncomment to test:
/*
(async () => {
  try {
    let result = await priceHelper({
      product_url: 'https://www.amazon.com/dp/B08N5WRWNW',
      region: 'US',
      currency_preference: 'USD'
    });
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
*/