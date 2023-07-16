/* esm.sh - esbuild bundle(@lit/reactive-element@1.6.2/css-tag) es2015 production */
var r=window,a=r.ShadowRoot&&(r.ShadyCSS===void 0||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),l=new WeakMap,c=class{constructor(s,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=s,this.t=t}get styleSheet(){let s=this.o,t=this.t;if(a&&s===void 0){let o=t!==void 0&&t.length===1;o&&(s=l.get(t)),s===void 0&&((this.o=s=new CSSStyleSheet).replaceSync(this.cssText),o&&l.set(t,s))}return s}toString(){return this.cssText}},h=e=>new c(typeof e=="string"?e:e+"",void 0,i),d=(e,...s)=>{let t=e.length===1?e[0]:s.reduce((o,S,u)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(S)+e[u+1],e[0]);return new c(t,e,i)},p=(e,s)=>{a?e.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):s.forEach(t=>{let o=document.createElement("style"),S=r.litNonce;S!==void 0&&o.setAttribute("nonce",S),o.textContent=t.cssText,e.appendChild(o)})},y=a?e=>e:e=>e instanceof CSSStyleSheet?(s=>{let t="";for(let o of s.cssRules)t+=o.cssText;return h(t)})(e):e;export{c as CSSResult,p as adoptStyles,d as css,y as getCompatibleStyle,a as supportsAdoptingStyleSheets,h as unsafeCSS};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=css-tag.js.map