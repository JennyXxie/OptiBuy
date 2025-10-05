module.exports = [
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/options.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "flattenOptions",
    ()=>flattenOptions
]);
const defaultOpts = {
    _useHtmlParser2: false
};
function flattenOptions(options, baseOptions) {
    if (!options) {
        return baseOptions !== null && baseOptions !== void 0 ? baseOptions : defaultOpts;
    }
    const opts = {
        _useHtmlParser2: !!options.xmlMode,
        ...baseOptions,
        ...options
    };
    if (options.xml) {
        opts._useHtmlParser2 = true;
        opts.xmlMode = true;
        if (options.xml !== true) {
            Object.assign(opts, options.xml);
        }
    } else if (options.xmlMode) {
        opts._useHtmlParser2 = true;
    }
    return opts;
} //# sourceMappingURL=options.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/static.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contains",
    ()=>contains,
    "extract",
    ()=>extract,
    "html",
    ()=>html,
    "merge",
    ()=>merge,
    "parseHTML",
    ()=>parseHTML,
    "root",
    ()=>root,
    "text",
    ()=>text,
    "xml",
    ()=>xml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/options.js [app-route] (ecmascript)");
;
;
/**
 * Helper function to render a DOM.
 *
 * @param that - Cheerio instance to render.
 * @param dom - The DOM to render. Defaults to `that`'s root.
 * @param options - Options for rendering.
 * @returns The rendered document.
 */ function render(that, dom, options) {
    if (!that) return '';
    return that(dom !== null && dom !== void 0 ? dom : that._root.children, null, undefined, options).toString();
}
/**
 * Checks if a passed object is an options object.
 *
 * @param dom - Object to check if it is an options object.
 * @param options - Options object.
 * @returns Whether the object is an options object.
 */ function isOptions(dom, options) {
    return !options && typeof dom === 'object' && dom != null && !('length' in dom) && !('type' in dom);
}
function html(dom, options) {
    /*
     * Be flexible about parameters, sometimes we call html(),
     * with options as only parameter
     * check dom argument for dom element specific properties
     * assume there is no 'length' or 'type' properties in the options object
     */ const toRender = isOptions(dom) ? (options = dom, undefined) : dom;
    /*
     * Sometimes `$.html()` is used without preloading html,
     * so fallback non-existing options to the default ones.
     */ const opts = {
        ...this === null || this === void 0 ? void 0 : this._options,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenOptions"])(options)
    };
    return render(this, toRender, opts);
}
function xml(dom) {
    const options = {
        ...this._options,
        xmlMode: true
    };
    return render(this, dom, options);
}
function text(elements) {
    const elems = elements !== null && elements !== void 0 ? elements : this ? this.root() : [];
    let ret = '';
    for(let i = 0; i < elems.length; i++){
        ret += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["textContent"])(elems[i]);
    }
    return ret;
}
function parseHTML(data, context, keepScripts = typeof context === 'boolean' ? context : false) {
    if (!data || typeof data !== 'string') {
        return null;
    }
    if (typeof context === 'boolean') {
        keepScripts = context;
    }
    const parsed = this.load(data, this._options, false);
    if (!keepScripts) {
        parsed('script').remove();
    }
    /*
     * The `children` array is used by Cheerio internally to group elements that
     * share the same parents. When nodes created through `parseHTML` are
     * inserted into previously-existing DOM structures, they will be removed
     * from the `children` array. The results of `parseHTML` should remain
     * constant across these operations, so a shallow copy should be returned.
     */ return [
        ...parsed.root()[0].children
    ];
}
function root() {
    return this(this._root);
}
function contains(container, contained) {
    // According to the jQuery API, an element does not "contain" itself
    if (contained === container) {
        return false;
    }
    /*
     * Step up the descendants, stopping when the root element is reached
     * (signaled by `.parent` returning a reference to the same object)
     */ let next = contained;
    while(next && next !== next.parent){
        next = next.parent;
        if (next === container) {
            return true;
        }
    }
    return false;
}
function extract(map) {
    return this.root().extract(map);
}
function merge(arr1, arr2) {
    if (!isArrayLike(arr1) || !isArrayLike(arr2)) {
        return;
    }
    let newLength = arr1.length;
    const len = +arr2.length;
    for(let i = 0; i < len; i++){
        arr1[newLength++] = arr2[i];
    }
    arr1.length = newLength;
    return arr1;
}
/**
 * Checks if an object is array-like.
 *
 * @category Static
 * @param item - Item to check.
 * @returns Indicates if the item is array-like.
 */ function isArrayLike(item) {
    if (Array.isArray(item)) {
        return true;
    }
    if (typeof item !== 'object' || item === null || !('length' in item) || typeof item.length !== 'number' || item.length < 0) {
        return false;
    }
    for(let i = 0; i < item.length; i++){
        if (!(i in item)) {
            return false;
        }
    }
    return true;
} //# sourceMappingURL=static.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Checks if an object is a Cheerio instance.
 *
 * @category Utils
 * @param maybeCheerio - The object to check.
 * @returns Whether the object is a Cheerio instance.
 */ __turbopack_context__.s([
    "camelCase",
    ()=>camelCase,
    "cssCase",
    ()=>cssCase,
    "domEach",
    ()=>domEach,
    "isCheerio",
    ()=>isCheerio,
    "isHtml",
    ()=>isHtml
]);
function isCheerio(maybeCheerio) {
    return maybeCheerio.cheerio != null;
}
function camelCase(str) {
    return str.replace(/[._-](\w|$)/g, (_, x)=>x.toUpperCase());
}
function cssCase(str) {
    return str.replace(/[A-Z]/g, '-$&').toLowerCase();
}
function domEach(array, fn) {
    const len = array.length;
    for(let i = 0; i < len; i++)fn(array[i], i);
    return array;
}
var CharacterCode;
(function(CharacterCode) {
    CharacterCode[CharacterCode["LowerA"] = 97] = "LowerA";
    CharacterCode[CharacterCode["LowerZ"] = 122] = "LowerZ";
    CharacterCode[CharacterCode["UpperA"] = 65] = "UpperA";
    CharacterCode[CharacterCode["UpperZ"] = 90] = "UpperZ";
    CharacterCode[CharacterCode["Exclamation"] = 33] = "Exclamation";
})(CharacterCode || (CharacterCode = {}));
function isHtml(str) {
    const tagStart = str.indexOf('<');
    if (tagStart === -1 || tagStart > str.length - 3) return false;
    const tagChar = str.charCodeAt(tagStart + 1);
    return (tagChar >= CharacterCode.LowerA && tagChar <= CharacterCode.LowerZ || tagChar >= CharacterCode.UpperA && tagChar <= CharacterCode.UpperZ || tagChar === CharacterCode.Exclamation) && str.includes('>', tagStart + 2);
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/attributes.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Methods for getting and modifying attributes.
 *
 * @module cheerio/attributes
 */ __turbopack_context__.s([
    "addClass",
    ()=>addClass,
    "attr",
    ()=>attr,
    "data",
    ()=>data,
    "hasClass",
    ()=>hasClass,
    "prop",
    ()=>prop,
    "removeAttr",
    ()=>removeAttr,
    "removeClass",
    ()=>removeClass,
    "toggleClass",
    ()=>toggleClass,
    "val",
    ()=>val
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/static.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/stringify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$htmlparser2$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/htmlparser2/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript) <export * as ElementType>");
var _a;
;
;
;
;
;
const hasOwn = // @ts-expect-error `hasOwn` is a standard object method
(_a = Object.hasOwn) !== null && _a !== void 0 ? _a : (object, prop)=>Object.prototype.hasOwnProperty.call(object, prop);
const rspace = /\s+/;
const dataAttrPrefix = 'data-';
// Attributes that are booleans
const rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
// Matches strings that look like JSON objects or arrays
const rbrace = /^{[^]*}$|^\[[^]*]$/;
function getAttr(elem, name, xmlMode) {
    var _a;
    if (!elem || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem)) return undefined;
    (_a = elem.attribs) !== null && _a !== void 0 ? _a : elem.attribs = {};
    // Return the entire attribs object if no attribute specified
    if (!name) {
        return elem.attribs;
    }
    if (hasOwn(elem.attribs, name)) {
        // Get the (decoded) attribute
        return !xmlMode && rboolean.test(name) ? name : elem.attribs[name];
    }
    // Mimic the DOM and return text content as value for `option's`
    if (elem.name === 'option' && name === 'value') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])(elem.children);
    }
    // Mimic DOM with default value for radios/checkboxes
    if (elem.name === 'input' && (elem.attribs['type'] === 'radio' || elem.attribs['type'] === 'checkbox') && name === 'value') {
        return 'on';
    }
    return undefined;
}
/**
 * Sets the value of an attribute. The attribute will be deleted if the value is
 * `null`.
 *
 * @private
 * @param el - The element to set the attribute on.
 * @param name - The attribute's name.
 * @param value - The attribute's value.
 */ function setAttr(el, name, value) {
    if (value === null) {
        removeAttribute(el, name);
    } else {
        el.attribs[name] = `${value}`;
    }
}
function attr(name, value) {
    // Set the value (with attr map support)
    if (typeof name === 'object' || value !== undefined) {
        if (typeof value === 'function') {
            if (typeof name !== 'string') {
                {
                    throw new Error('Bad combination of arguments.');
                }
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) setAttr(el, name, value.call(el, i, el.attribs[name]));
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) return;
            if (typeof name === 'object') {
                for (const objName of Object.keys(name)){
                    const objValue = name[objName];
                    setAttr(el, objName, objValue);
                }
            } else {
                setAttr(el, name, value);
            }
        });
    }
    return arguments.length > 1 ? this : getAttr(this[0], name, this.options.xmlMode);
}
/**
 * Gets a node's prop.
 *
 * @private
 * @category Attributes
 * @param el - Element to get the prop of.
 * @param name - Name of the prop.
 * @param xmlMode - Disable handling of special HTML attributes.
 * @returns The prop's value.
 */ function getProp(el, name, xmlMode) {
    return name in el ? el[name] : !xmlMode && rboolean.test(name) ? getAttr(el, name, false) !== undefined : getAttr(el, name, xmlMode);
}
/**
 * Sets the value of a prop.
 *
 * @private
 * @param el - The element to set the prop on.
 * @param name - The prop's name.
 * @param value - The prop's value.
 * @param xmlMode - Disable handling of special HTML attributes.
 */ function setProp(el, name, value, xmlMode) {
    if (name in el) {
        // @ts-expect-error Overriding value
        el[name] = value;
    } else {
        setAttr(el, name, !xmlMode && rboolean.test(name) ? value ? '' : null : `${value}`);
    }
}
function prop(name, value) {
    var _a;
    if (typeof name === 'string' && value === undefined) {
        const el = this[0];
        if (!el) return undefined;
        switch(name){
            case 'style':
                {
                    const property = this.css();
                    const keys = Object.keys(property);
                    for(let i = 0; i < keys.length; i++){
                        property[i] = keys[i];
                    }
                    property.length = keys.length;
                    return property;
                }
            case 'tagName':
            case 'nodeName':
                {
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) return undefined;
                    return el.name.toUpperCase();
                }
            case 'href':
            case 'src':
                {
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) return undefined;
                    const prop = (_a = el.attribs) === null || _a === void 0 ? void 0 : _a[name];
                    if (typeof URL !== 'undefined' && (name === 'href' && (el.tagName === 'a' || el.tagName === 'link') || name === 'src' && (el.tagName === 'img' || el.tagName === 'iframe' || el.tagName === 'audio' || el.tagName === 'video' || el.tagName === 'source')) && prop !== undefined && this.options.baseURI) {
                        return new URL(prop, this.options.baseURI).href;
                    }
                    return prop;
                }
            case 'innerText':
                {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["innerText"])(el);
                }
            case 'textContent':
                {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["textContent"])(el);
                }
            case 'outerHTML':
                {
                    if (el.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__["ElementType"].Root) return this.html();
                    return this.clone().wrap('<container />').parent().html();
                }
            case 'innerHTML':
                {
                    return this.html();
                }
            default:
                {
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) return undefined;
                    return getProp(el, name, this.options.xmlMode);
                }
        }
    }
    if (typeof name === 'object' || value !== undefined) {
        if (typeof value === 'function') {
            if (typeof name === 'object') {
                throw new TypeError('Bad combination of arguments.');
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) {
                    setProp(el, name, value.call(el, i, getProp(el, name, this.options.xmlMode)), this.options.xmlMode);
                }
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) return;
            if (typeof name === 'object') {
                for (const key of Object.keys(name)){
                    const val = name[key];
                    setProp(el, key, val, this.options.xmlMode);
                }
            } else {
                setProp(el, name, value, this.options.xmlMode);
            }
        });
    }
    return undefined;
}
/**
 * Sets the value of a data attribute.
 *
 * @private
 * @param elem - The element to set the data attribute on.
 * @param name - The data attribute's name.
 * @param value - The data attribute's value.
 */ function setData(elem, name, value) {
    var _a;
    (_a = elem.data) !== null && _a !== void 0 ? _a : elem.data = {};
    if (typeof name === 'object') Object.assign(elem.data, name);
    else if (typeof name === 'string' && value !== undefined) {
        elem.data[name] = value;
    }
}
/**
 * Read _all_ HTML5 `data-*` attributes from the equivalent HTML5 `data-*`
 * attribute, and cache the value in the node's internal data store.
 *
 * @private
 * @category Attributes
 * @param el - Element to get the data attribute of.
 * @returns A map with all of the data attributes.
 */ function readAllData(el) {
    for (const domName of Object.keys(el.attribs)){
        if (!domName.startsWith(dataAttrPrefix)) {
            continue;
        }
        const jsName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["camelCase"])(domName.slice(dataAttrPrefix.length));
        if (!hasOwn(el.data, jsName)) {
            el.data[jsName] = parseDataValue(el.attribs[domName]);
        }
    }
    return el.data;
}
/**
 * Read the specified attribute from the equivalent HTML5 `data-*` attribute,
 * and (if present) cache the value in the node's internal data store.
 *
 * @private
 * @category Attributes
 * @param el - Element to get the data attribute of.
 * @param name - Name of the data attribute.
 * @returns The data attribute's value.
 */ function readData(el, name) {
    const domName = dataAttrPrefix + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cssCase"])(name);
    const data = el.data;
    if (hasOwn(data, name)) {
        return data[name];
    }
    if (hasOwn(el.attribs, domName)) {
        return data[name] = parseDataValue(el.attribs[domName]);
    }
    return undefined;
}
/**
 * Coerce string data-* attributes to their corresponding JavaScript primitives.
 *
 * @private
 * @category Attributes
 * @param value - The value to parse.
 * @returns The parsed value.
 */ function parseDataValue(value) {
    if (value === 'null') return null;
    if (value === 'true') return true;
    if (value === 'false') return false;
    const num = Number(value);
    if (value === String(num)) return num;
    if (rbrace.test(value)) {
        try {
            return JSON.parse(value);
        } catch  {
        /* Ignore */ }
    }
    return value;
}
function data(name, value) {
    var _a;
    const elem = this[0];
    if (!elem || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem)) return;
    const dataEl = elem;
    (_a = dataEl.data) !== null && _a !== void 0 ? _a : dataEl.data = {};
    // Return the entire data object if no data specified
    if (name == null) {
        return readAllData(dataEl);
    }
    // Set the value (with attr map support)
    if (typeof name === 'object' || value !== undefined) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) {
                if (typeof name === 'object') setData(el, name);
                else setData(el, name, value);
            }
        });
        return this;
    }
    return readData(dataEl, name);
}
function val(value) {
    const querying = arguments.length === 0;
    const element = this[0];
    if (!element || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(element)) return querying ? undefined : this;
    switch(element.name){
        case 'textarea':
            {
                return this.text(value);
            }
        case 'select':
            {
                const option = this.find('option:selected');
                if (!querying) {
                    if (this.attr('multiple') == null && typeof value === 'object') {
                        return this;
                    }
                    this.find('option').removeAttr('selected');
                    const values = typeof value === 'object' ? value : [
                        value
                    ];
                    for (const val of values){
                        this.find(`option[value="${val}"]`).attr('selected', '');
                    }
                    return this;
                }
                return this.attr('multiple') ? option.toArray().map((el)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])(el.children)) : option.attr('value');
            }
        case 'input':
        case 'option':
            {
                return querying ? this.attr('value') : this.attr('value', value);
            }
    }
    return undefined;
}
/**
 * Remove an attribute.
 *
 * @private
 * @param elem - Node to remove attribute from.
 * @param name - Name of the attribute to remove.
 */ function removeAttribute(elem, name) {
    if (!elem.attribs || !hasOwn(elem.attribs, name)) return;
    delete elem.attribs[name];
}
/**
 * Splits a space-separated list of names to individual names.
 *
 * @category Attributes
 * @param names - Names to split.
 * @returns - Split names.
 */ function splitNames(names) {
    return names ? names.trim().split(rspace) : [];
}
function removeAttr(name) {
    const attrNames = splitNames(name);
    for (const attrName of attrNames){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (elem)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem)) removeAttribute(elem, attrName);
        });
    }
    return this;
}
function hasClass(className) {
    return this.toArray().some((elem)=>{
        const clazz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem) && elem.attribs['class'];
        let idx = -1;
        if (clazz && className.length > 0) {
            while((idx = clazz.indexOf(className, idx + 1)) > -1){
                const end = idx + className.length;
                if ((idx === 0 || rspace.test(clazz[idx - 1])) && (end === clazz.length || rspace.test(clazz[end]))) {
                    return true;
                }
            }
        }
        return false;
    });
}
function addClass(value) {
    // Support functions
    if (typeof value === 'function') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) {
                const className = el.attribs['class'] || '';
                addClass.call([
                    el
                ], value.call(el, i, className));
            }
        });
    }
    // Return if no value or not a string or function
    if (!value || typeof value !== 'string') return this;
    const classNames = value.split(rspace);
    const numElements = this.length;
    for(let i = 0; i < numElements; i++){
        const el = this[i];
        // If selected element isn't a tag, move on
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) continue;
        // If we don't already have classes — always set xmlMode to false here, as it doesn't matter for classes
        const className = getAttr(el, 'class', false);
        if (className) {
            let setClass = ` ${className} `;
            // Check if class already exists
            for (const cn of classNames){
                const appendClass = `${cn} `;
                if (!setClass.includes(` ${appendClass}`)) setClass += appendClass;
            }
            setAttr(el, 'class', setClass.trim());
        } else {
            setAttr(el, 'class', classNames.join(' ').trim());
        }
    }
    return this;
}
function removeClass(name) {
    // Handle if value is a function
    if (typeof name === 'function') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) {
                removeClass.call([
                    el
                ], name.call(el, i, el.attribs['class'] || ''));
            }
        });
    }
    const classes = splitNames(name);
    const numClasses = classes.length;
    const removeAll = arguments.length === 0;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) return;
        if (removeAll) {
            // Short circuit the remove all case as this is the nice one
            el.attribs['class'] = '';
        } else {
            const elClasses = splitNames(el.attribs['class']);
            let changed = false;
            for(let j = 0; j < numClasses; j++){
                const index = elClasses.indexOf(classes[j]);
                if (index !== -1) {
                    elClasses.splice(index, 1);
                    changed = true;
                    /*
                     * We have to do another pass to ensure that there are not duplicate
                     * classes listed
                     */ j--;
                }
            }
            if (changed) {
                el.attribs['class'] = elClasses.join(' ');
            }
        }
    });
}
function toggleClass(value, stateVal) {
    // Support functions
    if (typeof value === 'function') {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) {
                toggleClass.call([
                    el
                ], value.call(el, i, el.attribs['class'] || '', stateVal), stateVal);
            }
        });
    }
    // Return if no value or not a string or function
    if (!value || typeof value !== 'string') return this;
    const classNames = value.split(rspace);
    const numClasses = classNames.length;
    const state = typeof stateVal === 'boolean' ? stateVal ? 1 : -1 : 0;
    const numElements = this.length;
    for(let i = 0; i < numElements; i++){
        const el = this[i];
        // If selected element isn't a tag, move on
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) continue;
        const elementClasses = splitNames(el.attribs['class']);
        // Check if class already exists
        for(let j = 0; j < numClasses; j++){
            // Check if the class name is currently defined
            const index = elementClasses.indexOf(classNames[j]);
            // Add if stateValue === true or we are toggling and there is no value
            if (state >= 0 && index === -1) {
                elementClasses.push(classNames[j]);
            } else if (state <= 0 && index !== -1) {
                // Otherwise remove but only if the item exists
                elementClasses.splice(index, 1);
            }
        }
        el.attribs['class'] = elementClasses.join(' ');
    }
    return this;
} //# sourceMappingURL=attributes.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/traversing.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Methods for traversing the DOM structure.
 *
 * @module cheerio/traversing
 */ __turbopack_context__.s([
    "_findBySelector",
    ()=>_findBySelector,
    "add",
    ()=>add,
    "addBack",
    ()=>addBack,
    "children",
    ()=>children,
    "closest",
    ()=>closest,
    "contents",
    ()=>contents,
    "each",
    ()=>each,
    "end",
    ()=>end,
    "eq",
    ()=>eq,
    "filter",
    ()=>filter,
    "filterArray",
    ()=>filterArray,
    "find",
    ()=>find,
    "first",
    ()=>first,
    "get",
    ()=>get,
    "has",
    ()=>has,
    "index",
    ()=>index,
    "is",
    ()=>is,
    "last",
    ()=>last,
    "map",
    ()=>map,
    "next",
    ()=>next,
    "nextAll",
    ()=>nextAll,
    "nextUntil",
    ()=>nextUntil,
    "not",
    ()=>not,
    "parent",
    ()=>parent,
    "parents",
    ()=>parents,
    "parentsUntil",
    ()=>parentsUntil,
    "prev",
    ()=>prev,
    "prevAll",
    ()=>prevAll,
    "prevUntil",
    ()=>prevUntil,
    "siblings",
    ()=>siblings,
    "slice",
    ()=>slice,
    "toArray",
    ()=>toArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2d$select$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio-select/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/static.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$traversal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/traversal.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/helpers.js [app-route] (ecmascript)");
;
;
;
;
;
const reSiblingSelector = /^\s*[+~]/;
function find(selectorOrHaystack) {
    if (!selectorOrHaystack) {
        return this._make([]);
    }
    if (typeof selectorOrHaystack !== 'string') {
        const haystack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(selectorOrHaystack) ? selectorOrHaystack.toArray() : [
            selectorOrHaystack
        ];
        const context = this.toArray();
        return this._make(haystack.filter((elem)=>context.some((node)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["contains"])(node, elem))));
    }
    return this._findBySelector(selectorOrHaystack, Number.POSITIVE_INFINITY);
}
function _findBySelector(selector, limit) {
    var _a;
    const context = this.toArray();
    const elems = reSiblingSelector.test(selector) ? context : this.children().toArray();
    const options = {
        context,
        root: (_a = this._root) === null || _a === void 0 ? void 0 : _a[0],
        // Pass options that are recognized by `cheerio-select`
        xmlMode: this.options.xmlMode,
        lowerCaseTags: this.options.lowerCaseTags,
        lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
        pseudos: this.options.pseudos,
        quirksMode: this.options.quirksMode
    };
    return this._make(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2d$select$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["select"](selector, elems, options, limit));
}
/**
 * Creates a matcher, using a particular mapping function. Matchers provide a
 * function that finds elements using a generating function, supporting
 * filtering.
 *
 * @private
 * @param matchMap - Mapping function.
 * @returns - Function for wrapping generating functions.
 */ function _getMatcher(matchMap) {
    return function(fn, ...postFns) {
        return function(selector) {
            var _a;
            let matched = matchMap(fn, this);
            if (selector) {
                matched = filterArray(matched, selector, this.options.xmlMode, (_a = this._root) === null || _a === void 0 ? void 0 : _a[0]);
            }
            return this._make(// Post processing is only necessary if there is more than one element.
            this.length > 1 && matched.length > 1 ? postFns.reduce((elems, fn)=>fn(elems), matched) : matched);
        };
    };
}
/** Matcher that adds multiple elements for each entry in the input. */ const _matcher = _getMatcher((fn, elems)=>{
    let ret = [];
    for(let i = 0; i < elems.length; i++){
        const value = fn(elems[i]);
        if (value.length > 0) ret = ret.concat(value);
    }
    return ret;
});
/** Matcher that adds at most one element for each entry in the input. */ const _singleMatcher = _getMatcher((fn, elems)=>{
    const ret = [];
    for(let i = 0; i < elems.length; i++){
        const value = fn(elems[i]);
        if (value !== null) {
            ret.push(value);
        }
    }
    return ret;
});
/**
 * Matcher that supports traversing until a condition is met.
 *
 * @param nextElem - Function that returns the next element.
 * @param postFns - Post processing functions.
 * @returns A function usable for `*Until` methods.
 */ function _matchUntil(nextElem, ...postFns) {
    // We use a variable here that is used from within the matcher.
    let matches = null;
    const innerMatcher = _getMatcher((nextElem, elems)=>{
        const matched = [];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(elems, (elem)=>{
            for(let next; next = nextElem(elem); elem = next){
                // FIXME: `matched` might contain duplicates here and the index is too large.
                if (matches === null || matches === void 0 ? void 0 : matches(next, matched.length)) break;
                matched.push(next);
            }
        });
        return matched;
    })(nextElem, ...postFns);
    return function(selector, filterSelector) {
        // Override `matches` variable with the new target.
        matches = typeof selector === 'string' ? (elem)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2d$select$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["is"](elem, selector, this.options) : selector ? getFilterFn(selector) : null;
        const ret = innerMatcher.call(this, filterSelector);
        // Set `matches` to `null`, so we don't waste memory.
        matches = null;
        return ret;
    };
}
function _removeDuplicates(elems) {
    return elems.length > 1 ? Array.from(new Set(elems)) : elems;
}
const parent = _singleMatcher(({ parent })=>parent && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDocument"])(parent) ? parent : null, _removeDuplicates);
const parents = _matcher((elem)=>{
    const matched = [];
    while(elem.parent && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDocument"])(elem.parent)){
        matched.push(elem.parent);
        elem = elem.parent;
    }
    return matched;
}, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueSort"], (elems)=>elems.reverse());
const parentsUntil = _matchUntil(({ parent })=>parent && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDocument"])(parent) ? parent : null, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueSort"], (elems)=>elems.reverse());
function closest(selector) {
    var _a;
    const set = [];
    if (!selector) {
        return this._make(set);
    }
    const selectOpts = {
        xmlMode: this.options.xmlMode,
        root: (_a = this._root) === null || _a === void 0 ? void 0 : _a[0]
    };
    const selectFn = typeof selector === 'string' ? (elem)=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2d$select$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["is"](elem, selector, selectOpts) : getFilterFn(selector);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (elem)=>{
        if (elem && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDocument"])(elem) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem)) {
            elem = elem.parent;
        }
        while(elem && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem)){
            if (selectFn(elem, 0)) {
                // Do not add duplicate elements to the set
                if (!set.includes(elem)) {
                    set.push(elem);
                }
                break;
            }
            elem = elem.parent;
        }
    });
    return this._make(set);
}
const next = _singleMatcher((elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$traversal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nextElementSibling"])(elem));
const nextAll = _matcher((elem)=>{
    const matched = [];
    while(elem.next){
        elem = elem.next;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem)) matched.push(elem);
    }
    return matched;
}, _removeDuplicates);
const nextUntil = _matchUntil((el)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$traversal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nextElementSibling"])(el), _removeDuplicates);
const prev = _singleMatcher((elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$traversal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prevElementSibling"])(elem));
const prevAll = _matcher((elem)=>{
    const matched = [];
    while(elem.prev){
        elem = elem.prev;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem)) matched.push(elem);
    }
    return matched;
}, _removeDuplicates);
const prevUntil = _matchUntil((el)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$traversal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prevElementSibling"])(el), _removeDuplicates);
const siblings = _matcher((elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$traversal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSiblings"])(elem).filter((el)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el) && el !== elem), __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueSort"]);
const children = _matcher((elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$traversal$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChildren"])(elem).filter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"]), _removeDuplicates);
function contents() {
    const elems = this.toArray().reduce((newElems, elem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(elem) ? newElems.concat(elem.children) : newElems, []);
    return this._make(elems);
}
function each(fn) {
    let i = 0;
    const len = this.length;
    while(i < len && fn.call(this[i], i, this[i]) !== false)++i;
    return this;
}
function map(fn) {
    let elems = [];
    for(let i = 0; i < this.length; i++){
        const el = this[i];
        const val = fn.call(el, i, el);
        if (val != null) {
            elems = elems.concat(val);
        }
    }
    return this._make(elems);
}
/**
 * Creates a function to test if a filter is matched.
 *
 * @param match - A filter.
 * @returns A function that determines if a filter has been matched.
 */ function getFilterFn(match) {
    if (typeof match === 'function') {
        return (el, i)=>match.call(el, i, el);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(match)) {
        return (el)=>Array.prototype.includes.call(match, el);
    }
    return function(el) {
        return match === el;
    };
}
function filter(match) {
    var _a;
    return this._make(filterArray(this.toArray(), match, this.options.xmlMode, (_a = this._root) === null || _a === void 0 ? void 0 : _a[0]));
}
function filterArray(nodes, match, xmlMode, root) {
    return typeof match === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2d$select$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["filter"](match, nodes, {
        xmlMode,
        root
    }) : nodes.filter(getFilterFn(match));
}
function is(selector) {
    const nodes = this.toArray();
    return typeof selector === 'string' ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2d$select$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["some"](nodes.filter(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"]), selector, this.options) : selector ? nodes.some(getFilterFn(selector)) : false;
}
function not(match) {
    let nodes = this.toArray();
    if (typeof match === 'string') {
        const matches = new Set(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2d$select$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["filter"](match, nodes, this.options));
        nodes = nodes.filter((el)=>!matches.has(el));
    } else {
        const filterFn = getFilterFn(match);
        nodes = nodes.filter((el, i)=>!filterFn(el, i));
    }
    return this._make(nodes);
}
function has(selectorOrHaystack) {
    return this.filter(typeof selectorOrHaystack === 'string' ? `:has(${selectorOrHaystack})` : (_, el)=>this._make(el).find(selectorOrHaystack).length > 0);
}
function first() {
    return this.length > 1 ? this._make(this[0]) : this;
}
function last() {
    return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function eq(i) {
    var _a;
    i = +i;
    // Use the first identity optimization if possible
    if (i === 0 && this.length <= 1) return this;
    if (i < 0) i = this.length + i;
    return this._make((_a = this[i]) !== null && _a !== void 0 ? _a : []);
}
function get(i) {
    if (i == null) {
        return this.toArray();
    }
    return this[i < 0 ? this.length + i : i];
}
function toArray() {
    return Array.prototype.slice.call(this);
}
function index(selectorOrNeedle) {
    let $haystack;
    let needle;
    if (selectorOrNeedle == null) {
        $haystack = this.parent().children();
        needle = this[0];
    } else if (typeof selectorOrNeedle === 'string') {
        $haystack = this._make(selectorOrNeedle);
        needle = this[0];
    } else {
        // eslint-disable-next-line @typescript-eslint/no-this-alias, unicorn/no-this-assignment
        $haystack = this;
        needle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(selectorOrNeedle) ? selectorOrNeedle[0] : selectorOrNeedle;
    }
    return Array.prototype.indexOf.call($haystack, needle);
}
function slice(start, end) {
    return this._make(Array.prototype.slice.call(this, start, end));
}
function end() {
    var _a;
    return (_a = this.prevObject) !== null && _a !== void 0 ? _a : this._make([]);
}
function add(other, context) {
    const selection = this._make(other, context);
    const contents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$helpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueSort"])([
        ...this.get(),
        ...selection.get()
    ]);
    return this._make(contents);
}
function addBack(selector) {
    return this.prevObject ? this.add(selector ? this.prevObject.filter(selector) : this.prevObject) : this;
} //# sourceMappingURL=traversing.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/parse.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getParse",
    ()=>getParse,
    "update",
    ()=>update
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$manipulation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/manipulation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
;
;
function getParse(parser) {
    /**
     * Parse a HTML string or a node.
     *
     * @param content - The HTML string or node.
     * @param options - The parser options.
     * @param isDocument - If `content` is a document.
     * @param context - The context node in the DOM tree.
     * @returns The parsed document node.
     */ return function parse(content, options, isDocument, context) {
        if (typeof Buffer !== 'undefined' && Buffer.isBuffer(content)) {
            content = content.toString();
        }
        if (typeof content === 'string') {
            return parser(content, options, isDocument, context);
        }
        const doc = content;
        if (!Array.isArray(doc) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDocument"])(doc)) {
            // If `doc` is already a root, just return it
            return doc;
        }
        // Add conent to new root element
        const root = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Document"]([]);
        // Update the DOM using the root
        update(doc, root);
        return root;
    };
}
function update(newChilds, parent) {
    // Normalize
    const arr = Array.isArray(newChilds) ? newChilds : [
        newChilds
    ];
    // Update parent
    if (parent) {
        parent.children = arr;
    } else {
        parent = null;
    }
    // Update neighbors
    for(let i = 0; i < arr.length; i++){
        const node = arr[i];
        // Cleanly remove existing nodes from their previous structures.
        if (node.parent && node.parent.children !== arr) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$manipulation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["removeElement"])(node);
        }
        if (parent) {
            node.prev = arr[i - 1] || null;
            node.next = arr[i + 1] || null;
        } else {
            node.prev = node.next = null;
        }
        node.parent = parent;
    }
    return parent;
} //# sourceMappingURL=parse.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/manipulation.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Methods for modifying the DOM structure.
 *
 * @module cheerio/manipulation
 */ __turbopack_context__.s([
    "_makeDomArray",
    ()=>_makeDomArray,
    "after",
    ()=>after,
    "append",
    ()=>append,
    "appendTo",
    ()=>appendTo,
    "before",
    ()=>before,
    "clone",
    ()=>clone,
    "empty",
    ()=>empty,
    "html",
    ()=>html,
    "insertAfter",
    ()=>insertAfter,
    "insertBefore",
    ()=>insertBefore,
    "prepend",
    ()=>prepend,
    "prependTo",
    ()=>prependTo,
    "remove",
    ()=>remove,
    "replaceWith",
    ()=>replaceWith,
    "text",
    ()=>text,
    "toString",
    ()=>toString,
    "unwrap",
    ()=>unwrap,
    "wrap",
    ()=>wrap,
    "wrapAll",
    ()=>wrapAll,
    "wrapInner",
    ()=>wrapInner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/parse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/static.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$manipulation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domutils/lib/esm/manipulation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$htmlparser2$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/htmlparser2/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript) <export * as ElementType>");
;
;
;
;
;
;
function _makeDomArray(elem, clone) {
    if (elem == null) {
        return [];
    }
    if (typeof elem === 'string') {
        return this._parse(elem, this.options, false, null).children.slice(0);
    }
    if ('length' in elem) {
        if (elem.length === 1) {
            return this._makeDomArray(elem[0], clone);
        }
        const result = [];
        for(let i = 0; i < elem.length; i++){
            const el = elem[i];
            if (typeof el === 'object') {
                if (el == null) {
                    continue;
                }
                if (!('length' in el)) {
                    result.push(clone ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cloneNode"])(el, true) : el);
                    continue;
                }
            }
            result.push(...this._makeDomArray(el, clone));
        }
        return result;
    }
    return [
        clone ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cloneNode"])(elem, true) : elem
    ];
}
function _insert(concatenator) {
    return function(...elems) {
        const lastIdx = this.length - 1;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(el)) return;
            const domSrc = typeof elems[0] === 'function' ? elems[0].call(el, i, this._render(el.children)) : elems;
            const dom = this._makeDomArray(domSrc, i < lastIdx);
            concatenator(dom, el.children, el);
        });
    };
}
/**
 * Modify an array in-place, removing some number of elements and adding new
 * elements directly following them.
 *
 * @private
 * @category Manipulation
 * @param array - Target array to splice.
 * @param spliceIdx - Index at which to begin changing the array.
 * @param spliceCount - Number of elements to remove from the array.
 * @param newElems - Elements to insert into the array.
 * @param parent - The parent of the node.
 * @returns The spliced array.
 */ function uniqueSplice(array, spliceIdx, spliceCount, newElems, parent) {
    var _a, _b;
    const spliceArgs = [
        spliceIdx,
        spliceCount,
        ...newElems
    ];
    const prev = spliceIdx === 0 ? null : array[spliceIdx - 1];
    const next = spliceIdx + spliceCount >= array.length ? null : array[spliceIdx + spliceCount];
    /*
     * Before splicing in new elements, ensure they do not already appear in the
     * current array.
     */ for(let idx = 0; idx < newElems.length; ++idx){
        const node = newElems[idx];
        const oldParent = node.parent;
        if (oldParent) {
            const oldSiblings = oldParent.children;
            const prevIdx = oldSiblings.indexOf(node);
            if (prevIdx !== -1) {
                oldParent.children.splice(prevIdx, 1);
                if (parent === oldParent && spliceIdx > prevIdx) {
                    spliceArgs[0]--;
                }
            }
        }
        node.parent = parent;
        if (node.prev) {
            node.prev.next = (_a = node.next) !== null && _a !== void 0 ? _a : null;
        }
        if (node.next) {
            node.next.prev = (_b = node.prev) !== null && _b !== void 0 ? _b : null;
        }
        node.prev = idx === 0 ? prev : newElems[idx - 1];
        node.next = idx === newElems.length - 1 ? next : newElems[idx + 1];
    }
    if (prev) {
        prev.next = newElems[0];
    }
    if (next) {
        next.prev = newElems[newElems.length - 1];
    }
    return array.splice(...spliceArgs);
}
function appendTo(target) {
    const appendTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(target) ? target : this._make(target);
    appendTarget.append(this);
    return this;
}
function prependTo(target) {
    const prependTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(target) ? target : this._make(target);
    prependTarget.prepend(this);
    return this;
}
const append = _insert((dom, children, parent)=>{
    uniqueSplice(children, children.length, 0, dom, parent);
});
const prepend = _insert((dom, children, parent)=>{
    uniqueSplice(children, 0, 0, dom, parent);
});
function _wrap(insert) {
    return function(wrapper) {
        const lastIdx = this.length - 1;
        const lastParent = this.parents().last();
        for(let i = 0; i < this.length; i++){
            const el = this[i];
            const wrap = typeof wrapper === 'function' ? wrapper.call(el, i, el) : typeof wrapper === 'string' && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHtml"])(wrapper) ? lastParent.find(wrapper).clone() : wrapper;
            const [wrapperDom] = this._makeDomArray(wrap, i < lastIdx);
            if (!wrapperDom || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(wrapperDom)) continue;
            let elInsertLocation = wrapperDom;
            /*
             * Find the deepest child. Only consider the first tag child of each node
             * (ignore text); stop if no children are found.
             */ let j = 0;
            while(j < elInsertLocation.children.length){
                const child = elInsertLocation.children[j];
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(child)) {
                    elInsertLocation = child;
                    j = 0;
                } else {
                    j++;
                }
            }
            insert(el, elInsertLocation, [
                wrapperDom
            ]);
        }
        return this;
    };
}
const wrap = _wrap((el, elInsertLocation, wrapperDom)=>{
    const { parent } = el;
    if (!parent) return;
    const siblings = parent.children;
    const index = siblings.indexOf(el);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["update"])([
        el
    ], elInsertLocation);
    /*
     * The previous operation removed the current element from the `siblings`
     * array, so the `dom` array can be inserted without removing any
     * additional elements.
     */ uniqueSplice(siblings, index, 0, wrapperDom, parent);
});
const wrapInner = _wrap((el, elInsertLocation, wrapperDom)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(el)) return;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["update"])(el.children, elInsertLocation);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["update"])(wrapperDom, el);
});
function unwrap(selector) {
    this.parent(selector).not('body').each((_, el)=>{
        this._make(el).replaceWith(el.children);
    });
    return this;
}
function wrapAll(wrapper) {
    const el = this[0];
    if (el) {
        const wrap = this._make(typeof wrapper === 'function' ? wrapper.call(el, 0, el) : wrapper).insertBefore(el);
        // If html is given as wrapper, wrap may contain text elements
        let elInsertLocation;
        for(let i = 0; i < wrap.length; i++){
            if (wrap[i].type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__["ElementType"].Tag) {
                elInsertLocation = wrap[i];
            }
        }
        let j = 0;
        /*
         * Find the deepest child. Only consider the first tag child of each node
         * (ignore text); stop if no children are found.
         */ while(elInsertLocation && j < elInsertLocation.children.length){
            const child = elInsertLocation.children[j];
            if (child.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__["ElementType"].Tag) {
                elInsertLocation = child;
                j = 0;
            } else {
                j++;
            }
        }
        if (elInsertLocation) this._make(elInsertLocation).append(this);
    }
    return this;
}
function after(...elems) {
    const lastIdx = this.length - 1;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(el) || !el.parent) {
            return;
        }
        const siblings = el.parent.children;
        const index = siblings.indexOf(el);
        // If not found, move on
        /* istanbul ignore next */ if (index === -1) return;
        const domSrc = typeof elems[0] === 'function' ? elems[0].call(el, i, this._render(el.children)) : elems;
        const dom = this._makeDomArray(domSrc, i < lastIdx);
        // Add element after `this` element
        uniqueSplice(siblings, index + 1, 0, dom, el.parent);
    });
}
function insertAfter(target) {
    if (typeof target === 'string') {
        target = this._make(target);
    }
    this.remove();
    const clones = [];
    for (const el of this._makeDomArray(target)){
        const clonedSelf = this.clone().toArray();
        const { parent } = el;
        if (!parent) {
            continue;
        }
        const siblings = parent.children;
        const index = siblings.indexOf(el);
        // If not found, move on
        /* istanbul ignore next */ if (index === -1) continue;
        // Add cloned `this` element(s) after target element
        uniqueSplice(siblings, index + 1, 0, clonedSelf, parent);
        clones.push(...clonedSelf);
    }
    return this._make(clones);
}
function before(...elems) {
    const lastIdx = this.length - 1;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(el) || !el.parent) {
            return;
        }
        const siblings = el.parent.children;
        const index = siblings.indexOf(el);
        // If not found, move on
        /* istanbul ignore next */ if (index === -1) return;
        const domSrc = typeof elems[0] === 'function' ? elems[0].call(el, i, this._render(el.children)) : elems;
        const dom = this._makeDomArray(domSrc, i < lastIdx);
        // Add element before `el` element
        uniqueSplice(siblings, index, 0, dom, el.parent);
    });
}
function insertBefore(target) {
    const targetArr = this._make(target);
    this.remove();
    const clones = [];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(targetArr, (el)=>{
        const clonedSelf = this.clone().toArray();
        const { parent } = el;
        if (!parent) {
            return;
        }
        const siblings = parent.children;
        const index = siblings.indexOf(el);
        // If not found, move on
        /* istanbul ignore next */ if (index === -1) return;
        // Add cloned `this` element(s) after target element
        uniqueSplice(siblings, index, 0, clonedSelf, parent);
        clones.push(...clonedSelf);
    });
    return this._make(clones);
}
function remove(selector) {
    // Filter if we have selector
    const elems = selector ? this.filter(selector) : this;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(elems, (el)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domutils$2f$lib$2f$esm$2f$manipulation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["removeElement"])(el);
        el.prev = el.next = el.parent = null;
    });
    return this;
}
function replaceWith(content) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
        const { parent } = el;
        if (!parent) {
            return;
        }
        const siblings = parent.children;
        const cont = typeof content === 'function' ? content.call(el, i, el) : content;
        const dom = this._makeDomArray(cont);
        /*
         * In the case that `dom` contains nodes that already exist in other
         * structures, ensure those nodes are properly removed.
         */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["update"])(dom, null);
        const index = siblings.indexOf(el);
        // Completely remove old element
        uniqueSplice(siblings, index, 1, dom, parent);
        if (!dom.includes(el)) {
            el.parent = el.prev = el.next = null;
        }
    });
}
function empty() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(el)) return;
        for (const child of el.children){
            child.next = child.prev = child.parent = null;
        }
        el.children.length = 0;
    });
}
function html(str) {
    if (str === undefined) {
        const el = this[0];
        if (!el || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(el)) return null;
        return this._render(el.children);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(el)) return;
        for (const child of el.children){
            child.next = child.prev = child.parent = null;
        }
        const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(str) ? str.toArray() : this._parse(`${str}`, this.options, false, el).children;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["update"])(content, el);
    });
}
function toString() {
    return this._render(this);
}
function text(str) {
    // If `str` is undefined, act as a "getter"
    if (str === undefined) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])(this);
    }
    if (typeof str === 'function') {
        // Function support
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>this._make(el).text(str.call(el, i, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])([
                el
            ]))));
    }
    // Append text node to each selected elements
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasChildren"])(el)) return;
        for (const child of el.children){
            child.next = child.prev = child.parent = null;
        }
        const textNode = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Text"](`${str}`);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["update"])(textNode, el);
    });
}
function clone() {
    const clone = Array.prototype.map.call(this.get(), (el)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cloneNode"])(el, true));
    // Add a root node around the cloned nodes
    const root = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Document"](clone);
    for (const node of clone){
        node.parent = root;
    }
    return this._make(clone);
} //# sourceMappingURL=manipulation.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/css.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "css",
    ()=>css
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
;
;
function css(prop, val) {
    if (prop != null && val != null || typeof prop === 'object' && !Array.isArray(prop)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["domEach"])(this, (el, i)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) {
                // `prop` can't be an array here anymore.
                setCss(el, prop, val, i);
            }
        });
    }
    if (this.length === 0) {
        return undefined;
    }
    return getCss(this[0], prop);
}
/**
 * Set styles of all elements.
 *
 * @private
 * @param el - Element to set style of.
 * @param prop - Name of property.
 * @param value - Value to set property to.
 * @param idx - Optional index within the selection.
 */ function setCss(el, prop, value, idx) {
    if (typeof prop === 'string') {
        const styles = getCss(el);
        const val = typeof value === 'function' ? value.call(el, idx, styles[prop]) : value;
        if (val === '') {
            delete styles[prop];
        } else if (val != null) {
            styles[prop] = val;
        }
        el.attribs['style'] = stringify(styles);
    } else if (typeof prop === 'object') {
        const keys = Object.keys(prop);
        for(let i = 0; i < keys.length; i++){
            const k = keys[i];
            setCss(el, k, prop[k], i);
        }
    }
}
function getCss(el, prop) {
    if (!el || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(el)) return;
    const styles = parse(el.attribs['style']);
    if (typeof prop === 'string') {
        return styles[prop];
    }
    if (Array.isArray(prop)) {
        const newStyles = {};
        for (const item of prop){
            if (styles[item] != null) {
                newStyles[item] = styles[item];
            }
        }
        return newStyles;
    }
    return styles;
}
/**
 * Stringify `obj` to styles.
 *
 * @private
 * @category CSS
 * @param obj - Object to stringify.
 * @returns The serialized styles.
 */ function stringify(obj) {
    return Object.keys(obj).reduce((str, prop)=>`${str}${str ? ' ' : ''}${prop}: ${obj[prop]};`, '');
}
/**
 * Parse `styles`.
 *
 * @private
 * @category CSS
 * @param styles - Styles to be parsed.
 * @returns The parsed styles.
 */ function parse(styles) {
    styles = (styles || '').trim();
    if (!styles) return {};
    const obj = {};
    let key;
    for (const str of styles.split(';')){
        const n = str.indexOf(':');
        // If there is no :, or if it is the first/last character, add to the previous item's value
        if (n < 1 || n === str.length - 1) {
            const trimmed = str.trimEnd();
            if (trimmed.length > 0 && key !== undefined) {
                obj[key] += `;${trimmed}`;
            }
        } else {
            key = str.slice(0, n).trim();
            obj[key] = str.slice(n + 1).trim();
        }
    }
    return obj;
} //# sourceMappingURL=css.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/forms.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serialize",
    ()=>serialize,
    "serializeArray",
    ()=>serializeArray
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
;
/*
 * https://github.com/jquery/jquery/blob/2.1.3/src/manipulation/var/rcheckableType.js
 * https://github.com/jquery/jquery/blob/2.1.3/src/serialize.js
 */ const submittableSelector = 'input,select,textarea,keygen';
const r20 = /%20/g;
const rCRLF = /\r?\n/g;
function serialize() {
    // Convert form elements into name/value objects
    const arr = this.serializeArray();
    // Serialize each element into a key/value string
    const retArr = arr.map((data)=>`${encodeURIComponent(data.name)}=${encodeURIComponent(data.value)}`);
    // Return the resulting serialization
    return retArr.join('&').replace(r20, '+');
}
function serializeArray() {
    // Resolve all form elements from either forms or collections of form elements
    return this.map((_, elem)=>{
        const $elem = this._make(elem);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTag"])(elem) && elem.name === 'form') {
            return $elem.find(submittableSelector).toArray();
        }
        return $elem.filter(submittableSelector).toArray();
    }).filter(// Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled' + // And cannot be clicked (`[type=submit]`) or are used in `x-www-form-urlencoded` (`[type=file]`)
    ':not(:submit, :button, :image, :reset, :file)' + // And are either checked/don't have a checkable state
    ':matches([checked], :not(:checkbox, :radio))').map((_, elem)=>{
        var _a;
        const $elem = this._make(elem);
        const name = $elem.attr('name'); // We have filtered for elements with a name before.
        // If there is no value set (e.g. `undefined`, `null`), then default value to empty
        const value = (_a = $elem.val()) !== null && _a !== void 0 ? _a : '';
        // If we have an array of values (e.g. `<select multiple>`), return an array of key/value pairs
        if (Array.isArray(value)) {
            return value.map((val)=>/*
             * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
             * These can occur inside of `<textarea>'s`
             */ ({
                    name,
                    value: val.replace(rCRLF, '\r\n')
                }));
        }
        // Otherwise (e.g. `<input type="text">`, return only one key/value pair
        return {
            name,
            value: value.replace(rCRLF, '\r\n')
        };
    }).toArray();
} //# sourceMappingURL=forms.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/extract.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extract",
    ()=>extract
]);
function getExtractDescr(descr) {
    var _a;
    if (typeof descr === 'string') {
        return {
            selector: descr,
            value: 'textContent'
        };
    }
    return {
        selector: descr.selector,
        value: (_a = descr.value) !== null && _a !== void 0 ? _a : 'textContent'
    };
}
function extract(map) {
    const ret = {};
    for(const key in map){
        const descr = map[key];
        const isArray = Array.isArray(descr);
        const { selector, value } = getExtractDescr(isArray ? descr[0] : descr);
        const fn = typeof value === 'function' ? value : typeof value === 'string' ? (el)=>this._make(el).prop(value) : (el)=>this._make(el).extract(value);
        if (isArray) {
            ret[key] = this._findBySelector(selector, Number.POSITIVE_INFINITY).map((_, el)=>fn(el, key, ret)).get();
        } else {
            const $ = this._findBySelector(selector, 1);
            ret[key] = $.length > 0 ? fn($[0], key, ret) : undefined;
        }
    }
    return ret;
} //# sourceMappingURL=extract.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/cheerio.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cheerio",
    ()=>Cheerio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$attributes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/attributes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$traversing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/traversing.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$manipulation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/manipulation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$css$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/css.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$forms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/forms.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$extract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/api/extract.js [app-route] (ecmascript)");
;
;
;
;
;
;
class Cheerio {
    /**
     * Instance of cheerio. Methods are specified in the modules. Usage of this
     * constructor is not recommended. Please use `$.load` instead.
     *
     * @private
     * @param elements - The new selection.
     * @param root - Sets the root node.
     * @param options - Options for the instance.
     */ constructor(elements, root, options){
        this.length = 0;
        this.options = options;
        this._root = root;
        if (elements) {
            for(let idx = 0; idx < elements.length; idx++){
                this[idx] = elements[idx];
            }
            this.length = elements.length;
        }
    }
}
/** Set a signature of the object. */ Cheerio.prototype.cheerio = '[cheerio object]';
/*
 * Make cheerio an array-like object
 */ Cheerio.prototype.splice = Array.prototype.splice;
// Support for (const element of $(...)) iteration:
Cheerio.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// Plug in the API
Object.assign(Cheerio.prototype, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$attributes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$traversing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$manipulation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$css$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$forms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$api$2f$extract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__); //# sourceMappingURL=cheerio.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/load.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLoad",
    ()=>getLoad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/options.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/static.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$cheerio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/cheerio.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$htmlparser2$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/htmlparser2/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domelementtype/lib/esm/index.js [app-route] (ecmascript) <export * as ElementType>");
;
;
;
;
;
function getLoad(parse, render) {
    /**
     * Create a querying function, bound to a document created from the provided
     * markup.
     *
     * Note that similar to web browser contexts, this operation may introduce
     * `<html>`, `<head>`, and `<body>` elements; set `isDocument` to `false` to
     * switch to fragment mode and disable this.
     *
     * @param content - Markup to be loaded.
     * @param options - Options for the created instance.
     * @param isDocument - Allows parser to be switched to fragment mode.
     * @returns The loaded document.
     * @see {@link https://cheerio.js.org/docs/basics/loading#load} for additional usage information.
     */ return function load(content, options, isDocument = true) {
        if (content == null) {
            throw new Error('cheerio.load() expects a string');
        }
        const internalOpts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenOptions"])(options);
        const initialRoot = parse(content, internalOpts, isDocument, null);
        /**
         * Create an extended class here, so that extensions only live on one
         * instance.
         */ class LoadedCheerio extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$cheerio$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Cheerio"] {
            _make(selector, context) {
                const cheerio = initialize(selector, context);
                cheerio.prevObject = this;
                return cheerio;
            }
            _parse(content, options, isDocument, context) {
                return parse(content, options, isDocument, context);
            }
            _render(dom) {
                return render(dom, this.options);
            }
        }
        function initialize(selector, context, root = initialRoot, opts) {
            // $($)
            if (selector && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(selector)) return selector;
            const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenOptions"])(opts, internalOpts);
            const r = typeof root === 'string' ? [
                parse(root, options, false, null)
            ] : 'length' in root ? root : [
                root
            ];
            const rootInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(r) ? r : new LoadedCheerio(r, null, options);
            // Add a cyclic reference, so that calling methods on `_root` never fails.
            rootInstance._root = rootInstance;
            // $(), $(null), $(undefined), $(false)
            if (!selector) {
                return new LoadedCheerio(undefined, rootInstance, options);
            }
            const elements = typeof selector === 'string' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHtml"])(selector) ? parse(selector, options, false, null).children : isNode(selector) ? [
                selector
            ] : Array.isArray(selector) ? selector : undefined;
            const instance = new LoadedCheerio(elements, rootInstance, options);
            if (elements) {
                return instance;
            }
            if (typeof selector !== 'string') {
                throw new TypeError('Unexpected type of selector');
            }
            // We know that our selector is a string now.
            let search = selector;
            const searchContext = context ? typeof context === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isHtml"])(context) ? new LoadedCheerio([
                parse(context, options, false, null)
            ], rootInstance, options) : (search = `${context} ${search}`, rootInstance) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCheerio"])(context) ? context : new LoadedCheerio(Array.isArray(context) ? context : [
                context
            ], rootInstance, options) : rootInstance;
            // If we still don't have a context, return
            if (!searchContext) return instance;
            /*
             * #id, .class, tag
             */ return searchContext.find(search);
        }
        // Add in static methods & properties
        Object.assign(initialize, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, {
            load,
            // `_root` and `_options` are used in static methods.
            _root: initialRoot,
            _options: internalOpts,
            // Add `fn` for plugins
            fn: LoadedCheerio.prototype,
            // Add the prototype here to maintain `instanceof` behavior.
            prototype: LoadedCheerio.prototype
        });
        return initialize;
    };
}
function isNode(obj) {
    return(// @ts-expect-error: TS doesn't know about the `name` property.
    !!obj.name || // @ts-expect-error: TS doesn't know about the `type` property.
    obj.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__["ElementType"].Root || // @ts-expect-error: TS doesn't know about the `type` property.
    obj.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__["ElementType"].Text || // @ts-expect-error: TS doesn't know about the `type` property.
    obj.type === __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domelementtype$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ElementType$3e$__["ElementType"].Comment);
} //# sourceMappingURL=load.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/parsers/parse5-adapter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseWithParse5",
    ()=>parseWithParse5,
    "renderWithParse5",
    ()=>renderWithParse5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/domhandler/lib/esm/node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/parse5/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2f$dist$2f$serializer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/parse5/dist/serializer/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2d$htmlparser2$2d$tree$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/parse5-htmlparser2-tree-adapter/dist/index.js [app-route] (ecmascript)");
;
;
;
function parseWithParse5(content, options, isDocument, context) {
    var _a;
    (_a = options.treeAdapter) !== null && _a !== void 0 ? _a : options.treeAdapter = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2d$htmlparser2$2d$tree$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adapter"];
    if (options.scriptingEnabled !== false) {
        options.scriptingEnabled = true;
    }
    return isDocument ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parse"])(content, options) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseFragment"])(context, content, options);
}
const renderOpts = {
    treeAdapter: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2d$htmlparser2$2d$tree$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adapter"]
};
function renderWithParse5(dom) {
    /*
     * `dom-serializer` passes over the special "root" node and renders the
     * node's children in its place. To mimic this behavior with `parse5`, an
     * equivalent operation must be applied to the input array.
     */ const nodes = 'length' in dom ? dom : [
        dom
    ];
    for(let index = 0; index < nodes.length; index += 1){
        const node = nodes[index];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$domhandler$2f$lib$2f$esm$2f$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isDocument"])(node)) {
            Array.prototype.splice.call(nodes, index, 1, ...node.children);
        }
    }
    let result = '';
    for(let index = 0; index < nodes.length; index += 1){
        const node = nodes[index];
        result += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2f$dist$2f$serializer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeOuter"])(node, renderOpts);
    }
    return result;
} //# sourceMappingURL=parse5-adapter.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/load-parse.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "load",
    ()=>load
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$load$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/load.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/parse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parsers$2f$parse5$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/parsers/parse5-adapter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/dom-serializer/lib/esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$htmlparser2$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/htmlparser2/dist/esm/index.js [app-route] (ecmascript) <locals>");
;
;
;
;
;
const parse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getParse"])((content, options, isDocument, context)=>options._useHtmlParser2 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$htmlparser2$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["parseDocument"])(content, options) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parsers$2f$parse5$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseWithParse5"])(content, options, isDocument, context));
const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$load$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLoad"])(parse, (dom, options)=>options._useHtmlParser2 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$dom$2d$serializer$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(dom, options) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$parsers$2f$parse5$2d$adapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["renderWithParse5"])(dom)); //# sourceMappingURL=load-parse.js.map
}),
"[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * @file Batteries-included version of Cheerio. This module includes several
 *   convenience methods for loading documents from various sources.
 */ __turbopack_context__.s([
    "decodeStream",
    ()=>decodeStream,
    "fromURL",
    ()=>fromURL,
    "loadBuffer",
    ()=>loadBuffer,
    "stringStream",
    ()=>stringStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$load$2d$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/load-parse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$static$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/static.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2d$htmlparser2$2d$tree$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/parse5-htmlparser2-tree-adapter/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$htmlparser2$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/htmlparser2/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2d$parser$2d$stream$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/parse5-parser-stream/dist/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$encoding$2d$sniffer$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/encoding-sniffer/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/undici/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$whatwg$2d$mimetype$2f$lib$2f$mime$2d$type$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/whatwg-mimetype/lib/mime-type.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:stream [external] (node:stream, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/website/OptiBuy/node_modules/cheerio/dist/esm/options.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
function loadBuffer(buffer, options = {}) {
    const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenOptions"])(options);
    const str = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$encoding$2d$sniffer$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["decodeBuffer"])(buffer, {
        defaultEncoding: (opts === null || opts === void 0 ? void 0 : opts.xmlMode) ? 'utf8' : 'windows-1252',
        ...options.encoding
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$load$2d$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["load"])(str, opts);
}
function _stringStream(options, cb) {
    var _a;
    if (options === null || options === void 0 ? void 0 : options._useHtmlParser2) {
        const parser = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$htmlparser2$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createDocumentStream"]((err, document)=>cb(err, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$load$2d$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["load"])(document, options)), options);
        return new __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__["Writable"]({
            decodeStrings: false,
            write (chunk, _encoding, callback) {
                if (typeof chunk !== 'string') {
                    throw new TypeError('Expected a string');
                }
                parser.write(chunk);
                callback();
            },
            final (callback) {
                parser.end();
                callback();
            }
        });
    }
    options !== null && options !== void 0 ? options : options = {};
    (_a = options.treeAdapter) !== null && _a !== void 0 ? _a : options.treeAdapter = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2d$htmlparser2$2d$tree$2d$adapter$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["adapter"];
    if (options.scriptingEnabled !== false) {
        options.scriptingEnabled = true;
    }
    const stream = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$parse5$2d$parser$2d$stream$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ParserStream"](options);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__["finished"])(stream, (err)=>cb(err, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$load$2d$parse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["load"])(stream.document, options)));
    return stream;
}
function stringStream(options, cb) {
    return _stringStream((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenOptions"])(options), cb);
}
function decodeStream(options, cb) {
    var _a;
    const { encoding = {}, ...cheerioOptions } = options;
    const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$cheerio$2f$dist$2f$esm$2f$options$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenOptions"])(cheerioOptions);
    // Set the default encoding to UTF-8 for XML mode
    (_a = encoding.defaultEncoding) !== null && _a !== void 0 ? _a : encoding.defaultEncoding = (opts === null || opts === void 0 ? void 0 : opts.xmlMode) ? 'utf8' : 'windows-1252';
    const decodeStream = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$encoding$2d$sniffer$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DecodeStream"](encoding);
    const loadStream = _stringStream(opts, cb);
    decodeStream.pipe(loadStream);
    return decodeStream;
}
const defaultRequestOptions = {
    method: 'GET',
    // Set an Accept header
    headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
};
async function fromURL(url, options = {}) {
    const { requestOptions = defaultRequestOptions, encoding = {}, ...cheerioOptions } = options;
    let undiciStream;
    // Add headers if none were supplied.
    const urlObject = typeof url === 'string' ? new URL(url) : url;
    const streamOptions = {
        headers: defaultRequestOptions.headers,
        path: urlObject.pathname + urlObject.search,
        ...requestOptions
    };
    const promise = new Promise((resolve, reject)=>{
        undiciStream = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"](urlObject.origin).compose(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["interceptors"].redirect({
            maxRedirections: 5
        })).stream(streamOptions, (res)=>{
            var _a, _b;
            if (res.statusCode < 200 || res.statusCode >= 300) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["errors"].ResponseError('Response Error', res.statusCode, {
                    headers: res.headers
                });
            }
            const contentTypeHeader = (_a = res.headers['content-type']) !== null && _a !== void 0 ? _a : 'text/html';
            const mimeType = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$website$2f$OptiBuy$2f$node_modules$2f$whatwg$2d$mimetype$2f$lib$2f$mime$2d$type$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](Array.isArray(contentTypeHeader) ? contentTypeHeader[0] : contentTypeHeader);
            if (!mimeType.isHTML() && !mimeType.isXML()) {
                throw new RangeError(`The content-type "${mimeType.essence}" is neither HTML nor XML.`);
            }
            // Forward the charset from the header to the decodeStream.
            encoding.transportLayerEncodingLabel = mimeType.parameters.get('charset');
            /*
             * If we allow redirects, we will have entries in the history.
             * The last entry will be the final URL.
             */ const history = (_b = res.context) === null || _b === void 0 ? void 0 : _b.history;
            // Set the `baseURI` to the final URL.
            const baseURI = history ? history[history.length - 1] : urlObject;
            const opts = {
                encoding,
                // Set XML mode based on the MIME type.
                xmlMode: mimeType.isXML(),
                baseURI,
                ...cheerioOptions
            };
            return decodeStream(opts, (err, $)=>err ? reject(err) : resolve($));
        });
    });
    // Let's make sure the request is completed before returning the promise.
    await undiciStream;
    return promise;
} //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=3bb0e_cheerio_dist_esm_87826729._.js.map