/* esm.sh - esbuild bundle(lit-html@2.7.5) es2015 production */
var L,M=window,y=M.trustedTypes,j=y?y.createPolicy("lit-html",{createHTML:r=>r}):void 0,S="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,V="?"+_,Y=`<${V}>`,g=document,N=()=>g.createComment(""),C=r=>r===null||typeof r!="object"&&typeof r!="function",Z=Array.isArray,q=r=>Z(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",R=`[ 	
\f\r]`,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,k=/>/g,v=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,O=/"/g,G=/^(?:script|style|textarea|title)$/i,J=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),et=J(1),it=J(2),b=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),z=new WeakMap,p=g.createTreeWalker(g,129,null,!1);function K(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return j!==void 0?j.createHTML(t):t}var Q=(r,t)=>{let e=r.length-1,i=[],s,o=t===2?"<svg>":"",n=x;for(let $=0;$<e;$++){let l=r[$],h,a,d=-1,A=0;for(;A<l.length&&(n.lastIndex=A,a=n.exec(l),a!==null);)A=n.lastIndex,n===x?a[1]==="!--"?n=D:a[1]!==void 0?n=k:a[2]!==void 0?(G.test(a[2])&&(s=RegExp("</"+a[2],"g")),n=v):a[3]!==void 0&&(n=v):n===v?a[0]===">"?(n=s!=null?s:x,d=-1):a[1]===void 0?d=-2:(d=n.lastIndex-a[2].length,h=a[1],n=a[3]===void 0?v:a[3]==='"'?O:W):n===O||n===W?n=v:n===D||n===k?n=x:(n=v,s=void 0);let c=n===v&&r[$+1].startsWith("/>")?" ":"";o+=n===x?l+Y:d>=0?(i.push(h),l.slice(0,d)+S+l.slice(d)+_+c):l+_+(d===-2?(i.push(void 0),$):c)}return[K(r,o+(r[e]||"<?>")+(t===2?"</svg>":"")),i]},w=class r{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0,$=t.length-1,l=this.parts,[h,a]=Q(t,e);if(this.el=r.createElement(h,i),p.currentNode=this.el.content,e===2){let d=this.el.content,A=d.firstChild;A.remove(),d.append(...A.childNodes)}for(;(s=p.nextNode())!==null&&l.length<$;){if(s.nodeType===1){if(s.hasAttributes()){let d=[];for(let A of s.getAttributeNames())if(A.endsWith(S)||A.startsWith(_)){let c=a[n++];if(d.push(A),c!==void 0){let X=s.getAttribute(c.toLowerCase()+S).split(_),T=/([.?@])?(.*)/.exec(c);l.push({type:1,index:o,name:T[2],strings:X,ctor:T[1]==="."?E:T[1]==="?"?B:T[1]==="@"?P:m})}else l.push({type:6,index:o})}for(let A of d)s.removeAttribute(A)}if(G.test(s.tagName)){let d=s.textContent.split(_),A=d.length-1;if(A>0){s.textContent=y?y.emptyScript:"";for(let c=0;c<A;c++)s.append(d[c],N()),p.nextNode(),l.push({type:2,index:++o});s.append(d[A],N())}}}else if(s.nodeType===8)if(s.data===V)l.push({type:2,index:o});else{let d=-1;for(;(d=s.data.indexOf(_,d+1))!==-1;)l.push({type:7,index:o}),d+=_.length-1}o++}}static createElement(t,e){let i=g.createElement("template");return i.innerHTML=t,i}};function f(r,t,e=r,i){var s,o,n,$;if(t===b)return t;let l=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl,h=C(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==h&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),h===void 0?l=void 0:(l=new h(r),l._$AT(r,e,i)),i!==void 0?((n=($=e)._$Co)!==null&&n!==void 0?n:$._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=f(r,l._$AS(r,t.values),l,i)),t}var I=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;let{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:g).importNode(i,!0);p.currentNode=o;let n=p.nextNode(),$=0,l=0,h=s[0];for(;h!==void 0;){if($===h.index){let a;h.type===2?a=new H(n,n.nextSibling,this,t):h.type===1?a=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(a=new U(n,this,t)),this._$AV.push(a),h=s[++l]}$!==(h==null?void 0:h.index)&&(n=p.nextNode(),$++)}return p.currentNode=g,o}v(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},H=class r{constructor(t,e,i,s){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=f(this,t,e),C(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):q(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(g.createTextNode(t)),this._$AH=t}g(t){var e;let{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=w.createElement(K(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{let n=new I(o,this),$=n.u(this.options);n.v(i),this.$($),this._$AH=n}}_$AC(t){let e=z.get(t.strings);return e===void 0&&z.set(t.strings,e=new w(t)),e}T(t){Z(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let o of t)s===e.length?e.push(i=new r(this.k(N()),this.k(N()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},m=class{constructor(t,e,i,s,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){let o=this.strings,n=!1;if(o===void 0)t=f(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{let $=t,l,h;for(t=o[0],l=0;l<o.length-1;l++)h=f(this,$[i+l],e,l),h===b&&(h=this._$AH[l]),n||(n=!C(h)||h!==this._$AH[l]),h===u?t=u:t!==u&&(t+=(h!=null?h:"")+o[l+1]),this._$AH[l]=h}n&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}},E=class extends m{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},tt=y?y.emptyScript:"",B=class extends m{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,tt):this.element.removeAttribute(this.name)}},P=class extends m{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=f(this,t,e,0))!==null&&i!==void 0?i:u)===b)return;let s=this._$AH,o=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}},U=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){f(this,t)}},st={O:S,P:_,A:V,C:1,M:Q,L:I,D:q,R:f,I:H,V:m,H:B,N:P,U:E,F:U},F=M.litHtmlPolyfillSupport;F==null||F(w,H),((L=M.litHtmlVersions)!==null&&L!==void 0?L:M.litHtmlVersions=[]).push("2.7.5");var nt=(r,t,e)=>{var i,s;let o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t,n=o._$litPart$;if(n===void 0){let $=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=n=new H(t.insertBefore(N(),$),$,void 0,e!=null?e:{})}return n._$AI(r),n};export{st as _$LH,et as html,b as noChange,u as nothing,nt as render,it as svg};
/*! Bundled license information:

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=lit-html.mjs.map