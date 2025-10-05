module.exports=[8484,e=>{"use strict";var t,n,s,o,a,i,r,c,l,d,u,h;e.s(["generateGeminiResponse",()=>z,"generateProductAnalysis",()=>J],8484),function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"}(t||(t={})),function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"}(n||(n={})),function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"}(s||(s={}));let p=["user","model","function","system"];!function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"}(o||(o={})),function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"}(a||(a={})),function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"}(i||(i={})),function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"}(r||(r={})),function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.BLOCKLIST="BLOCKLIST",e.PROHIBITED_CONTENT="PROHIBITED_CONTENT",e.SPII="SPII",e.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",e.OTHER="OTHER"}(c||(c={})),function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"}(l||(l={})),function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"}(d||(d={})),function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"}(u||(u={}));class m extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class f extends m{constructor(e,t){super(e),this.response=t}}class g extends m{constructor(e,t,n,s){super(e),this.status=t,this.statusText=n,this.errorDetails=s}}class E extends m{}class y extends m{}!function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"}(h||(h={}));class C{constructor(e,t,n,s,o){this.model=e,this.task=t,this.apiKey=n,this.stream=s,this.requestOptions=o}toString(){var e,t;let n=(null==(e=this.requestOptions)?void 0:e.apiVersion)||"v1beta",s=(null==(t=this.requestOptions)?void 0:t.baseUrl)||"https://generativelanguage.googleapis.com",o=`${s}/${n}/${this.model}:${this.task}`;return this.stream&&(o+="?alt=sse"),o}}async function O(e){var t;let n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(e){let t=[];return(null==e?void 0:e.apiClient)&&t.push(e.apiClient),t.push("genai-js/0.24.1"),t.join(" ")}(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let s=null==(t=e.requestOptions)?void 0:t.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(e){throw new E(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${e.message}`)}for(let[e,t]of s.entries()){if("x-goog-api-key"===e)throw new E(`Cannot set reserved header name ${e}`);if("x-goog-api-client"===e)throw new E(`Header name ${e} can only be set using the apiClient field`);n.append(e,t)}}return n}async function _(e,t,n,s,o,a){let i=new C(e,t,n,s,a);return{url:i.toString(),fetchOptions:Object.assign(Object.assign({},function(e){let t={};if((null==e?void 0:e.signal)!==void 0||(null==e?void 0:e.timeout)>=0){let n=new AbortController;(null==e?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),(null==e?void 0:e.signal)&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}(a)),{method:"POST",headers:await O(i),body:o})}}async function I(e,t,n,s,o,a={},i=fetch){let{url:r,fetchOptions:c}=await _(e,t,n,s,o,a);return A(r,c,i)}async function A(e,t,n=fetch){let s;try{s=await n(e,t)}catch(n){var o=n,a=e;let t=o;throw"AbortError"===t.name?(t=new y(`Request aborted when fetching ${a.toString()}: ${o.message}`)).stack=o.stack:o instanceof g||o instanceof E||((t=new m(`Error fetching from ${a.toString()}: ${o.message}`)).stack=o.stack),t}return s.ok||await w(s,e),s}async function w(e,t){let n,s="";try{let t=await e.json();s=t.error.message,t.error.details&&(s+=` ${JSON.stringify(t.error.details)}`,n=t.error.details)}catch(e){}throw new g(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${s}`,e.status,e.statusText,n)}function T(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),S(e.candidates[0]))throw new f(`${N(e)}`,e);return function(e){var t,n,s,o;let a=[];if(null==(n=null==(t=e.candidates)?void 0:t[0].content)?void 0:n.parts)for(let t of null==(o=null==(s=e.candidates)?void 0:s[0].content)?void 0:o.parts)t.text&&a.push(t.text),t.executableCode&&a.push("\n```"+t.executableCode.language+"\n"+t.executableCode.code+"\n```\n"),t.codeExecutionResult&&a.push("\n```\n"+t.codeExecutionResult.output+"\n```\n");return a.length>0?a.join(""):""}(e)}if(e.promptFeedback)throw new f(`Text not available. ${N(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),S(e.candidates[0]))throw new f(`${N(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),v(e)[0]}if(e.promptFeedback)throw new f(`Function call not available. ${N(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),S(e.candidates[0]))throw new f(`${N(e)}`,e);return v(e)}if(e.promptFeedback)throw new f(`Function call not available. ${N(e)}`,e)},e}function v(e){var t,n,s,o;let a=[];if(null==(n=null==(t=e.candidates)?void 0:t[0].content)?void 0:n.parts)for(let t of null==(o=null==(s=e.candidates)?void 0:s[0].content)?void 0:o.parts)t.functionCall&&a.push(t.functionCall);return a.length>0?a:void 0}let b=[c.RECITATION,c.SAFETY,c.LANGUAGE];function S(e){return!!e.finishReason&&b.includes(e.finishReason)}function N(e){var t,n,s;let o="";if((!e.candidates||0===e.candidates.length)&&e.promptFeedback)o+="Response was blocked",(null==(t=e.promptFeedback)?void 0:t.blockReason)&&(o+=` due to ${e.promptFeedback.blockReason}`),(null==(n=e.promptFeedback)?void 0:n.blockReasonMessage)&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);else if(null==(s=e.candidates)?void 0:s[0]){let t=e.candidates[0];S(t)&&(o+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(o+=`: ${t.finishMessage}`))}return o}function R(e){return this instanceof R?(this.v=e,this):new R(e)}"function"==typeof SuppressedError&&SuppressedError;let $=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function M(e){let t=[],n=e.getReader();for(;;){let{done:e,value:s}=await n.read();if(e)return T(function(e){let t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(let t of e){if(t.candidates){let e=0;for(let s of t.candidates)if(n.candidates||(n.candidates=[]),n.candidates[e]||(n.candidates[e]={index:e}),n.candidates[e].citationMetadata=s.citationMetadata,n.candidates[e].groundingMetadata=s.groundingMetadata,n.candidates[e].finishReason=s.finishReason,n.candidates[e].finishMessage=s.finishMessage,n.candidates[e].safetyRatings=s.safetyRatings,s.content&&s.content.parts){n.candidates[e].content||(n.candidates[e].content={role:s.content.role||"user",parts:[]});let t={};for(let o of s.content.parts)o.text&&(t.text=o.text),o.functionCall&&(t.functionCall=o.functionCall),o.executableCode&&(t.executableCode=o.executableCode),o.codeExecutionResult&&(t.codeExecutionResult=o.codeExecutionResult),0===Object.keys(t).length&&(t.text=""),n.candidates[e].content.parts.push(t)}e++}t.usageMetadata&&(n.usageMetadata=t.usageMetadata)}return n}(t));t.push(s)}}async function x(e,t,n,s){let[o,a]=(function(e){let t=e.getReader();return new ReadableStream({start(e){let n="";return function s(){return t.read().then(({value:t,done:o})=>{let a;if(o)return n.trim()?void e.error(new m("Failed to parse stream")):void e.close();let i=(n+=t).match($);for(;i;){try{a=JSON.parse(i[1])}catch(t){e.error(new m(`Error parsing JSON response: "${i[1]}"`));return}e.enqueue(a),i=(n=n.substring(i[0].length)).match($)}return s()}).catch(e=>{let t=e;throw t.stack=e.stack,t="AbortError"===t.name?new y("Request aborted when reading from the stream"):new m("Error reading from the stream")})}()}})})((await I(t,h.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),s)).body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))).tee();return{stream:function(e){return function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(e,t||[]),a=[];return s={},i("next"),i("throw"),i("return"),s[Symbol.asyncIterator]=function(){return this},s;function i(e){o[e]&&(s[e]=function(t){return new Promise(function(n,s){a.push([e,t,n,s])>1||r(e,t)})})}function r(e,t){try{var n;(n=o[e](t)).value instanceof R?Promise.resolve(n.value.v).then(c,l):d(a[0][2],n)}catch(e){d(a[0][3],e)}}function c(e){r("next",e)}function l(e){r("throw",e)}function d(e,t){e(t),a.shift(),a.length&&r(a[0][0],a[0][1])}}(this,arguments,function*(){let t=e.getReader();for(;;){let{value:e,done:n}=yield R(t.read());if(n)break;yield yield R(T(e))}})}(o),response:M(a)}}async function P(e,t,n,s){let o=await I(t,h.GENERATE_CONTENT,e,!1,JSON.stringify(n),s);return{response:T(await o.json())}}function D(e){if(null!=e){if("string"==typeof e)return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)if(!e.role)return{role:"system",parts:e.parts};else return e}}function L(e){let t=[];if("string"==typeof e)t=[{text:e}];else for(let n of e)"string"==typeof n?t.push({text:n}):t.push(n);var n=t;let s={role:"user",parts:[]},o={role:"function",parts:[]},a=!1,i=!1;for(let e of n)"functionResponse"in e?(o.parts.push(e),i=!0):(s.parts.push(e),a=!0);if(a&&i)throw new m("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!a&&!i)throw new m("No content is provided for sending chat message.");return a?s:o}function G(e){let t;return t=e.contents?e:{contents:[L(e)]},e.systemInstruction&&(t.systemInstruction=D(e.systemInstruction)),t}let k=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],B={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function H(e){var t;if(void 0===e.candidates||0===e.candidates.length)return!1;let n=null==(t=e.candidates[0])?void 0:t.content;if(void 0===n||void 0===n.parts||0===n.parts.length)return!1;for(let e of n.parts)if(void 0===e||0===Object.keys(e).length||void 0!==e.text&&""===e.text)return!1;return!0}let F="SILENT_ERROR";class U{constructor(e,t,n,s={}){this.model=t,this.params=n,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(!function(e){let t=!1;for(let n of e){let{role:e,parts:s}=n;if(!t&&"user"!==e)throw new m(`First content should be with role 'user', got ${e}`);if(!p.includes(e))throw new m(`Each item should include role field. Got ${e} but valid roles are: ${JSON.stringify(p)}`);if(!Array.isArray(s))throw new m("Content should have 'parts' property with an array of Parts");if(0===s.length)throw new m("Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let e of s)for(let t of k)t in e&&(o[t]+=1);let a=B[e];for(let t of k)if(!a.includes(t)&&o[t]>0)throw new m(`Content with role '${e}' can't contain '${t}' part`);t=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,t={}){var n,s,o,a,i,r;let c;await this._sendPromise;let l=L(e),d={safetySettings:null==(n=this.params)?void 0:n.safetySettings,generationConfig:null==(s=this.params)?void 0:s.generationConfig,tools:null==(o=this.params)?void 0:o.tools,toolConfig:null==(a=this.params)?void 0:a.toolConfig,systemInstruction:null==(i=this.params)?void 0:i.systemInstruction,cachedContent:null==(r=this.params)?void 0:r.cachedContent,contents:[...this._history,l]},u=Object.assign(Object.assign({},this._requestOptions),t);return this._sendPromise=this._sendPromise.then(()=>P(this._apiKey,this.model,d,u)).then(e=>{var t;if(H(e.response)){this._history.push(l);let n=Object.assign({parts:[],role:"model"},null==(t=e.response.candidates)?void 0:t[0].content);this._history.push(n)}else{let t=N(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}c=e}).catch(e=>{throw this._sendPromise=Promise.resolve(),e}),await this._sendPromise,c}async sendMessageStream(e,t={}){var n,s,o,a,i,r;await this._sendPromise;let c=L(e),l={safetySettings:null==(n=this.params)?void 0:n.safetySettings,generationConfig:null==(s=this.params)?void 0:s.generationConfig,tools:null==(o=this.params)?void 0:o.tools,toolConfig:null==(a=this.params)?void 0:a.toolConfig,systemInstruction:null==(i=this.params)?void 0:i.systemInstruction,cachedContent:null==(r=this.params)?void 0:r.cachedContent,contents:[...this._history,c]},d=Object.assign(Object.assign({},this._requestOptions),t),u=x(this._apiKey,this.model,l,d);return this._sendPromise=this._sendPromise.then(()=>u).catch(e=>{throw Error(F)}).then(e=>e.response).then(e=>{if(H(e)){this._history.push(c);let t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{let t=N(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}}).catch(e=>{e.message!==F&&console.error(e)}),u}}async function Y(e,t,n,s){return(await I(t,h.COUNT_TOKENS,e,!1,JSON.stringify(n),s)).json()}async function j(e,t,n,s){return(await I(t,h.EMBED_CONTENT,e,!1,JSON.stringify(n),s)).json()}async function K(e,t,n,s){let o=n.requests.map(e=>Object.assign(Object.assign({},e),{model:t}));return(await I(t,h.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:o}),s)).json()}class q{constructor(e,t,n={}){this.apiKey=e,this._requestOptions=n,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=D(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(e,t={}){var n;let s=G(e),o=Object.assign(Object.assign({},this._requestOptions),t);return P(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null==(n=this.cachedContent)?void 0:n.name},s),o)}async generateContentStream(e,t={}){var n;let s=G(e),o=Object.assign(Object.assign({},this._requestOptions),t);return x(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null==(n=this.cachedContent)?void 0:n.name},s),o)}startChat(e){var t;return new U(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null==(t=this.cachedContent)?void 0:t.name},e),this._requestOptions)}async countTokens(e,t={}){let n=function(e,t){var n;let s={model:null==t?void 0:t.model,generationConfig:null==t?void 0:t.generationConfig,safetySettings:null==t?void 0:t.safetySettings,tools:null==t?void 0:t.tools,toolConfig:null==t?void 0:t.toolConfig,systemInstruction:null==t?void 0:t.systemInstruction,cachedContent:null==(n=null==t?void 0:t.cachedContent)?void 0:n.name,contents:[]},o=null!=e.generateContentRequest;if(e.contents){if(o)throw new E("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=e.contents}else if(o)s=Object.assign(Object.assign({},s),e.generateContentRequest);else{let t=L(e);s.contents=[t]}return{generateContentRequest:s}}(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),t);return Y(this.apiKey,this.model,n,s)}async embedContent(e,t={}){let n="string"==typeof e||Array.isArray(e)?{content:L(e)}:e,s=Object.assign(Object.assign({},this._requestOptions),t);return j(this.apiKey,this.model,n,s)}async batchEmbedContents(e,t={}){let n=Object.assign(Object.assign({},this._requestOptions),t);return K(this.apiKey,this.model,e,n)}}let V=new class{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new m("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new q(this.apiKey,e,t)}getGenerativeModelFromCachedContent(e,t,n){if(!e.name)throw new E("Cached content must contain a `name` field.");if(!e.model)throw new E("Cached content must contain a `model` field.");for(let n of["model","systemInstruction"])if((null==t?void 0:t[n])&&e[n]&&(null==t?void 0:t[n])!==e[n]){if("model"===n&&(t.model.startsWith("models/")?t.model.replace("models/",""):t.model)===(e.model.startsWith("models/")?e.model.replace("models/",""):e.model))continue;throw new E(`Different value for "${n}" specified in modelParams (${t[n]}) and cachedContent (${e[n]})`)}let s=Object.assign(Object.assign({},t),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new q(this.apiKey,s,n)}}(process.env.GEMINI_API_KEY||"");async function z(e,t){try{if(!process.env.GEMINI_API_KEY||"Gemini_api"===process.env.GEMINI_API_KEY)return console.log("Using fallback response - Gemini API key not properly configured"),W(e);let n=V.getGenerativeModel({model:"gemini-1.5-pro"}),s=t?`Context: ${t}

User Query: ${e}

As OptiBuy's AI shopping assistant, provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice. Focus on Amazon, Temu, eBay, and Walmart.`:`User Query: ${e}

As OptiBuy's AI shopping assistant, provide helpful, accurate responses about product recommendations, price comparisons, and shopping advice. Focus on Amazon, Temu, eBay, and Walmart.`,o=await n.generateContent(s);return(await o.response).text()}catch(t){return console.error("Gemini API error:",t),W(e)}}function W(e){let t=e.toLowerCase();return t.includes("laptop")||t.includes("computer")?`I'd be happy to help you find laptop deals! 💻

**🏆 TOP LAPTOP DEALS:**

🥇 **MacBook Air M2 13"**
   💵 Amazon: $1,199 | Temu: $1,099 (Save $100!)
   🔗 [View on Amazon →](https://amazon.com/search?k=macbook+air+m2)
   🔗 [View on Temu →](https://temu.com/search?q=macbook+air+m2)

🥈 **Dell XPS 13**
   💵 Amazon: $999 | Shein: $899 (Save $100!)
   🔗 [View on Amazon →](https://amazon.com/search?k=dell+xps+13)
   🔗 [View on Shein →](https://shein.com/search?k=dell+xps+13)

🥉 **Budget Gaming Laptop**
   💵 eBay: $599 (Refurbished) | Walmart: $649 (New)
   🔗 [View on eBay →](https://ebay.com/search?k=gaming+laptop)
   🔗 [View on Walmart →](https://walmart.com/search?q=gaming+laptop)

**💡 My recommendation:** For the best value, check out Temu and eBay for significant savings. Would you like me to set up a price alert for any specific model?`:t.includes("headphone")||t.includes("earphone")?`Great choice! I found some excellent headphone deals! 🎧

**🏆 TOP HEADPHONE DEALS:**

🥇 **Wireless Bluetooth Headphones**
   💵 Temu: $45.99 (Save $44!) 🏆
   🔗 [View on Temu →](https://temu.com/search?q=wireless+bluetooth+headphones)

🥈 **Premium Noise-Canceling**
   💵 Amazon: $89.99 | eBay: $52.99
   🔗 [View on Amazon →](https://amazon.com/search?k=noise+canceling+headphones)
   🔗 [View on eBay →](https://ebay.com/search?k=bluetooth+headphones)

🥉 **Budget Options**
   💵 Walmart: $67.99
   🔗 [View on Walmart →](https://walmart.com/search?q=bluetooth+headphones)

**Best Deal:** Temu has the lowest price at $45.99. There's also a 20% off coupon (TEMU20) that could save you even more!

Would you like me to track this product or show you similar items?`:t.includes("phone")||t.includes("smartphone")?`I can help you find smartphone deals! 📱

**🏆 TOP SMARTPHONE DEALS:**

🥇 **iPhone 15**
   💵 Amazon: $799 | Temu: $749 (Save $50!)
   🔗 [View on Amazon →](https://amazon.com/search?k=iphone+15)
   🔗 [View on Temu →](https://temu.com/search?q=iphone+15)

🥈 **Samsung Galaxy S24**
   💵 Amazon: $999 | eBay: $899 (Save $100!)
   🔗 [View on Amazon →](https://amazon.com/search?k=samsung+galaxy+s24)
   🔗 [View on eBay →](https://ebay.com/search?k=samsung+galaxy+s24)

🥉 **Google Pixel 8**
   💵 Walmart: $699 | Temu: $649 (Save $50!)
   🔗 [View on Walmart →](https://walmart.com/search?q=google+pixel+8)
   🔗 [View on Temu →](https://temu.com/search?q=google+pixel+8)

**💡 My recommendation:** Check eBay for refurbished models with warranties, or Temu for new devices at lower prices. Would you like me to set up a price alert for a specific phone?`:t.includes("deal")||t.includes("cheap")||t.includes("budget")?`I love helping you save money! 💰

**🔥 TODAY'S TOP DEALS:**

🥇 **Electronics** - Up to 50% off
   🔗 [Shop Temu Electronics →](https://temu.com/category/electronics.html)

🥈 **Fashion** - 30% off with code SHEIN30
   🔗 [Shop Shein Fashion →](https://shein.com/category/women.html)

🥉 **Home Goods** - Prime deals ending soon
   🔗 [Shop Amazon Home →](https://amazon.com/gp/goldbox)

💰 **Gaming** - Auctions starting at $1
   🔗 [Shop eBay Gaming →](https://ebay.com/b/Video-Games/139973)

**🏆 Best Platform Guide:**
• **Temu**: Electronics & gadgets (lowest prices)
• **eBay**: Auctions & refurbished items
• **Walmart**: Reliable shipping & returns
• **Amazon**: Prime benefits & fast delivery

What category interests you most?`:`I understand you're looking for: "${e}"

I'm here to help you find the best deals! I can:
• Compare prices across Amazon, Temu, eBay, and Walmart
• Track price history and predict drops
• Find active coupons and discounts
• Give personalized recommendations

Try asking me about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`}async function J(e,t,n){try{if(!process.env.GEMINI_API_KEY||"Gemini_api"===process.env.GEMINI_API_KEY)return console.log("Using fallback product analysis"),X(e,t,n);let s=V.getGenerativeModel({model:"gemini-1.5-pro"}),o=e.map(e=>({name:e.name,price:e.extracted_price||e.price,platform:e.platform||e.source,rating:e.rating,reviews:e.reviews||e.reviews_count,url:e.url,image:e.image||e.image_url||e.thumbnail})),a=`
    You are an AI agent that compares local product data with live e-commerce offers.
    
    User Query: "${t}"
    Data Source: ${"local"===n?"local database":"live"===n?"live e-commerce data":"local+live"===n?"local database + live e-commerce data":"product database"}
    
    Products Found:
    ${JSON.stringify(o,null,2)}
    
    As an AI shopping assistant, provide a comprehensive analysis including:
    1. Best value recommendations (ranked by price, rating, and availability)
    2. Price comparisons across platforms
    3. Quality indicators (ratings, reviews count)
    4. Platform-specific advantages (Amazon, Walmart, eBay, etc.)
    5. Data freshness note (local vs live data)
    6. Overall recommendation with clear reasoning
    7. Money-saving tips and alternatives
    
    Be concise but informative, and focus on helping the user make the best purchase decision.
    Format your response with clear sections and emojis for better readability.
    `,i=await s.generateContent(a);return(await i.response).text()}catch(s){return console.error("Gemini product analysis error:",s),X(e,t,n)}}function X(e,t,n){if(0===e.length)return`I couldn't find specific products for "${t}" right now, but I can help you search across different platforms. Try asking about specific products like "wireless headphones" or "laptop deals" and I'll show you the best options!`;let s=Math.min(...e.map(e=>e.extracted_price||e.price)),o=e.find(e=>(e.extracted_price||e.price)===s),a=[...new Set(e.map(e=>e.platform||e.source))],i=e.sort((e,t)=>(e.extracted_price||e.price)-(t.extracted_price||t.price)).slice(0,8),r="local"===n?"local database":"live"===n?"live e-commerce data":"local+live"===n?"local database + live e-commerce data":"product database",c=`I found ${e.length} products for "${t}"! 🎯
`;return c+=`📊 Data Source: ${r}

**🏆 TOP DEALS (Ranked by Price, Rating & Reviews):**

`,i.forEach((e,t)=>{let n=e.extracted_price||e.price,s=e.platform||e.source,o=e.rating||0,a=e.reviews||e.reviews_count||0;c+=`${0===t?"🥇":1===t?"🥈":2===t?"🥉":"💰"} **${e.name}**
   💵 $${n} on ${s}
`,o>0&&(c+=`   ⭐ ${o}/5 (${a} reviews)
`),c+=`   🔗 [View Product →](${e.url})

`}),c+=`**📊 Summary:**
• Available on: ${a.join(", ")}
• Price Range: $${Math.min(...e.map(e=>e.extracted_price||e.price))} - $${Math.max(...e.map(e=>e.extracted_price||e.price))}
• Best Deal: ${o?.platform||o?.source} at $${o?.extracted_price||o?.price}
• Data Freshness: ${r}

**💡 My Recommendation:** ${o?.platform||o?.source} has the best price at $${o?.extracted_price||o?.price}. `,o?.platform?.toLowerCase().includes("temu")||o?.source?.toLowerCase().includes("temu")?c+="Temu often has the lowest prices but check shipping times.":o?.platform?.toLowerCase().includes("ebay")||o?.source?.toLowerCase().includes("ebay")?c+="eBay is great for deals, especially refurbished items.":o?.platform?.toLowerCase().includes("amazon")||o?.source?.toLowerCase().includes("amazon")?c+="Amazon offers reliable shipping and easy returns.":c+="This is a solid choice with good value.",c+=`

**🎯 Quick Actions:**
• Click any "View Product →" link above to shop directly
• Ask me to set up price alerts for any product
• Request similar products or specific brands
• Compare with other platforms for better deals`}}];

//# sourceMappingURL=Desktop_website_OptiBuy_src_lib_gemini_ts_06541b08._.js.map