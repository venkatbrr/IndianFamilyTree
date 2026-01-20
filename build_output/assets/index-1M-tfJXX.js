(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class pg{constructor(){this.members=[],this.relationships=[],this.loadFromStorage()}addMember(e){const t={id:this.generateId(),...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return this.members.push(t),this.saveToStorage(),t}updateMember(e,t){const r=this.members.findIndex(i=>i.id===e);return r!==-1?(this.members[r]={...this.members[r],...t,updatedAt:new Date().toISOString()},this.saveToStorage(),this.members[r]):null}deleteMember(e){this.members=this.members.filter(t=>t.id!==e),this.relationships=this.relationships.filter(t=>t.member1Id!==e&&t.member2Id!==e),this.saveToStorage()}getMember(e){return this.members.find(t=>t.id===e)}getAllMembers(){return this.members.map(e=>{const t=this.getSpouse(e.id);return{...e,spouseId:t?t.id:null}})}addSpouse(e,t,r=null){const i={id:this.generateId(),type:"spouse",member1Id:e,member2Id:t,marriageDate:r,createdAt:new Date().toISOString()};return this.relationships.push(i),this.saveToStorage(),i}addParent(e,t){const r=this.getMember(e);r&&(r.parentIds||(r.parentIds=[]),r.parentIds.includes(t)||(r.parentIds.push(t),this.updateMember(e,{parentIds:r.parentIds})))}getSpouse(e){const t=this.relationships.find(r=>r.type==="spouse"&&(r.member1Id===e||r.member2Id===e));if(t){const r=t.member1Id===e?t.member2Id:t.member1Id;return this.getMember(r)}return null}getChildren(e){return this.members.filter(t=>t.parentIds&&t.parentIds.includes(e))}getParents(e){const t=this.getMember(e);return t&&t.parentIds?t.parentIds.map(r=>this.getMember(r)).filter(Boolean):[]}getSiblings(e){const t=this.getMember(e);return!t||!t.parentIds||t.parentIds.length===0?[]:this.members.filter(r=>r.id!==e&&r.parentIds&&r.parentIds.some(i=>t.parentIds.includes(i)))}searchMembers(e){const t=e.toLowerCase();return this.members.filter(r=>r.name.toLowerCase().includes(t)||r.profession&&r.profession.toLowerCase().includes(t)||r.birthPlace&&r.birthPlace.toLowerCase().includes(t)||r.gotra&&r.gotra.toLowerCase().includes(t))}getMembersByGeneration(e){return this.members.map(r=>({...r,generation:this.calculateGeneration(r.id)})).filter(r=>r.generation===e)}calculateGeneration(e,t=new Set){if(t.has(e))return 0;t.add(e);const r=this.getMember(e);if(!r||!r.parentIds||r.parentIds.length===0)return 1;const i=r.parentIds.map(s=>this.calculateGeneration(s,t));return Math.max(...i)+1}getStatistics(){const e=this.members.filter(i=>i.gender==="male").length,t=this.members.filter(i=>i.gender==="female").length,r=new Set(this.members.map(i=>this.calculateGeneration(i.id)));return{totalMembers:this.members.length,males:e,females:t,generations:r.size,alive:this.members.filter(i=>i.isAlive).length,deceased:this.members.filter(i=>!i.isAlive).length}}getRecentMembers(e=5){return[...this.members].sort((t,r)=>new Date(r.createdAt)-new Date(t.createdAt)).slice(0,e)}getUpcomingBirthdays(e=10){const t=new Date,r=t.getFullYear();return this.members.filter(s=>s.birthDate&&s.isAlive).map(s=>{const o=new Date(s.birthDate),c=new Date(r,o.getMonth(),o.getDate());c<t&&c.setFullYear(r+1);const u=Math.ceil((c-t)/(1e3*60*60*24));return{member:s,date:c.toLocaleDateString("en-IN",{month:"short",day:"numeric"}),daysUntil:u}}).sort((s,o)=>s.daysUntil-o.daysUntil).slice(0,e)}exportData(){return{members:this.members,relationships:this.relationships,exportDate:new Date().toISOString(),version:"1.0"}}importData(e){e.members&&Array.isArray(e.members)&&(this.members=e.members),e.relationships&&Array.isArray(e.relationships)&&(this.relationships=e.relationships),this.saveToStorage()}clearAllData(){this.members=[],this.relationships=[],this.saveToStorage()}saveToStorage(){try{localStorage.setItem("familyTreeMembers",JSON.stringify(this.members)),localStorage.setItem("familyTreeRelationships",JSON.stringify(this.relationships))}catch(e){console.error("Error saving to storage:",e)}}loadFromStorage(){try{const e=localStorage.getItem("familyTreeMembers"),t=localStorage.getItem("familyTreeRelationships");e&&(this.members=JSON.parse(e)),t&&(this.relationships=JSON.parse(t))}catch(e){console.error("Error loading from storage:",e)}}generateId(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}`}}function ys(n,e){return n==null||e==null?NaN:n<e?-1:n>e?1:n>=e?0:NaN}function gg(n,e){return n==null||e==null?NaN:e<n?-1:e>n?1:e>=n?0:NaN}function pc(n){let e,t,r;n.length!==2?(e=ys,t=(c,u)=>ys(n(c),u),r=(c,u)=>n(c)-u):(e=n===ys||n===gg?n:_g,t=n,r=n);function i(c,u,l=0,f=c.length){if(l<f){if(e(u,u)!==0)return f;do{const p=l+f>>>1;t(c[p],u)<0?l=p+1:f=p}while(l<f)}return l}function s(c,u,l=0,f=c.length){if(l<f){if(e(u,u)!==0)return f;do{const p=l+f>>>1;t(c[p],u)<=0?l=p+1:f=p}while(l<f)}return l}function o(c,u,l=0,f=c.length){const p=i(c,u,l,f-1);return p>l&&r(c[p-1],u)>-r(c[p],u)?p-1:p}return{left:i,center:o,right:s}}function _g(){return 0}function yg(n){return n===null?NaN:+n}const vg=pc(ys),wg=vg.right;pc(yg).center;const Tg=Math.sqrt(50),Eg=Math.sqrt(10),Ig=Math.sqrt(2);function Uf(n,e,t){const r=(e-n)/Math.max(0,t),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),o=s>=Tg?10:s>=Eg?5:s>=Ig?2:1;let c,u,l;return i<0?(l=Math.pow(10,-i)/o,c=Math.round(n*l),u=Math.round(e*l),c/l<n&&++c,u/l>e&&--u,l=-l):(l=Math.pow(10,i)*o,c=Math.round(n/l),u=Math.round(e/l),c*l<n&&++c,u*l>e&&--u),u<c&&.5<=t&&t<2?Uf(n,e,t*2):[c,u,l]}function Al(n,e,t){return e=+e,n=+n,t=+t,Uf(n,e,t)[2]}function bl(n,e,t){e=+e,n=+n,t=+t;const r=e<n,i=r?Al(e,n,t):Al(n,e,t);return(r?-1:1)*(i<0?1/-i:i)}function Ag(n,e){let t;if(e===void 0)for(const r of n)r!=null&&(t>r||t===void 0&&r>=r)&&(t=r);else{let r=-1;for(let i of n)(i=e(i,++r,n))!=null&&(t>i||t===void 0&&i>=i)&&(t=i)}return t}function bg(n){return n}var Sg=3,Sl=1e-6;function Rg(n){return"translate("+n+",0)"}function Cg(n){return e=>+n(e)}function Pg(n,e){return e=Math.max(0,n.bandwidth()-e*2)/2,n.round()&&(e=Math.round(e)),t=>+n(t)+e}function kg(){return!this.__axis}function Dg(n,e){var t=[],r=null,i=null,s=6,o=6,c=3,u=typeof window<"u"&&window.devicePixelRatio>1?0:.5,l=1,f="y",p=Rg;function m(y){var C=r??(e.ticks?e.ticks.apply(e,t):e.domain()),D=i??(e.tickFormat?e.tickFormat.apply(e,t):bg),x=Math.max(s,0)+c,M=e.range(),F=+M[0]+u,q=+M[M.length-1]+u,W=(e.bandwidth?Pg:Cg)(e.copy(),u),te=y.selection?y.selection():y,O=te.selectAll(".domain").data([null]),T=te.selectAll(".tick").data(C,e).order(),_=T.exit(),w=T.enter().append("g").attr("class","tick"),I=T.select("line"),E=T.select("text");O=O.merge(O.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),T=T.merge(w),I=I.merge(w.append("line").attr("stroke","currentColor").attr(f+"2",l*s)),E=E.merge(w.append("text").attr("fill","currentColor").attr(f,l*x).attr("dy","0.71em")),y!==te&&(O=O.transition(y),T=T.transition(y),I=I.transition(y),E=E.transition(y),_=_.transition(y).attr("opacity",Sl).attr("transform",function(A){return isFinite(A=W(A))?p(A+u):this.getAttribute("transform")}),w.attr("opacity",Sl).attr("transform",function(A){var v=this.parentNode.__axis;return p((v&&isFinite(v=v(A))?v:W(A))+u)})),_.remove(),O.attr("d",o?"M"+F+","+l*o+"V"+u+"H"+q+"V"+l*o:"M"+F+","+u+"H"+q),T.attr("opacity",1).attr("transform",function(A){return p(W(A)+u)}),I.attr(f+"2",l*s),E.attr(f,l*x).text(D),te.filter(kg).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor","middle"),te.each(function(){this.__axis=W})}return m.scale=function(y){return arguments.length?(e=y,m):e},m.ticks=function(){return t=Array.from(arguments),m},m.tickArguments=function(y){return arguments.length?(t=y==null?[]:Array.from(y),m):t.slice()},m.tickValues=function(y){return arguments.length?(r=y==null?null:Array.from(y),m):r&&r.slice()},m.tickFormat=function(y){return arguments.length?(i=y,m):i},m.tickSize=function(y){return arguments.length?(s=o=+y,m):s},m.tickSizeInner=function(y){return arguments.length?(s=+y,m):s},m.tickSizeOuter=function(y){return arguments.length?(o=+y,m):o},m.tickPadding=function(y){return arguments.length?(c=+y,m):c},m.offset=function(y){return arguments.length?(u=+y,m):u},m}function xg(n){return Dg(Sg,n)}var Mg={value:()=>{}};function gc(){for(var n=0,e=arguments.length,t={},r;n<e;++n){if(!(r=arguments[n]+"")||r in t||/[\s.]/.test(r))throw new Error("illegal type: "+r);t[r]=[]}return new vs(t)}function vs(n){this._=n}function Ng(n,e){return n.trim().split(/^|\s+/).map(function(t){var r="",i=t.indexOf(".");if(i>=0&&(r=t.slice(i+1),t=t.slice(0,i)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:r}})}vs.prototype=gc.prototype={constructor:vs,on:function(n,e){var t=this._,r=Ng(n+"",t),i,s=-1,o=r.length;if(arguments.length<2){for(;++s<o;)if((i=(n=r[s]).type)&&(i=Vg(t[i],n.name)))return i;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++s<o;)if(i=(n=r[s]).type)t[i]=Rl(t[i],n.name,e);else if(e==null)for(i in t)t[i]=Rl(t[i],n.name,null);return this},copy:function(){var n={},e=this._;for(var t in e)n[t]=e[t].slice();return new vs(n)},call:function(n,e){if((i=arguments.length-2)>0)for(var t=new Array(i),r=0,i,s;r<i;++r)t[r]=arguments[r+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],r=0,i=s.length;r<i;++r)s[r].value.apply(e,t)},apply:function(n,e,t){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(e,t)}};function Vg(n,e){for(var t=0,r=n.length,i;t<r;++t)if((i=n[t]).name===e)return i.value}function Rl(n,e,t){for(var r=0,i=n.length;r<i;++r)if(n[r].name===e){n[r]=Mg,n=n.slice(0,r).concat(n.slice(r+1));break}return t!=null&&n.push({name:e,value:t}),n}var Pa="http://www.w3.org/1999/xhtml";const Cl={svg:"http://www.w3.org/2000/svg",xhtml:Pa,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function mo(n){var e=n+="",t=e.indexOf(":");return t>=0&&(e=n.slice(0,t))!=="xmlns"&&(n=n.slice(t+1)),Cl.hasOwnProperty(e)?{space:Cl[e],local:n}:n}function Lg(n){return function(){var e=this.ownerDocument,t=this.namespaceURI;return t===Pa&&e.documentElement.namespaceURI===Pa?e.createElement(n):e.createElementNS(t,n)}}function Og(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function Bf(n){var e=mo(n);return(e.local?Og:Lg)(e)}function Fg(){}function _c(n){return n==null?Fg:function(){return this.querySelector(n)}}function Ug(n){typeof n!="function"&&(n=_c(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=new Array(o),u,l,f=0;f<o;++f)(u=s[f])&&(l=n.call(u,u.__data__,f,s))&&("__data__"in u&&(l.__data__=u.__data__),c[f]=l);return new rt(r,this._parents)}function Bg(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function $g(){return[]}function $f(n){return n==null?$g:function(){return this.querySelectorAll(n)}}function zg(n){return function(){return Bg(n.apply(this,arguments))}}function qg(n){typeof n=="function"?n=zg(n):n=$f(n);for(var e=this._groups,t=e.length,r=[],i=[],s=0;s<t;++s)for(var o=e[s],c=o.length,u,l=0;l<c;++l)(u=o[l])&&(r.push(n.call(u,u.__data__,l,o)),i.push(u));return new rt(r,i)}function zf(n){return function(){return this.matches(n)}}function qf(n){return function(e){return e.matches(n)}}var Hg=Array.prototype.find;function jg(n){return function(){return Hg.call(this.children,n)}}function Wg(){return this.firstElementChild}function Gg(n){return this.select(n==null?Wg:jg(typeof n=="function"?n:qf(n)))}var Kg=Array.prototype.filter;function Yg(){return Array.from(this.children)}function Qg(n){return function(){return Kg.call(this.children,n)}}function Xg(n){return this.selectAll(n==null?Yg:Qg(typeof n=="function"?n:qf(n)))}function Jg(n){typeof n!="function"&&(n=zf(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=[],u,l=0;l<o;++l)(u=s[l])&&n.call(u,u.__data__,l,s)&&c.push(u);return new rt(r,this._parents)}function Hf(n){return new Array(n.length)}function Zg(){return new rt(this._enter||this._groups.map(Hf),this._parents)}function Ls(n,e){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=e}Ls.prototype={constructor:Ls,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,e){return this._parent.insertBefore(n,e)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function e_(n){return function(){return n}}function t_(n,e,t,r,i,s){for(var o=0,c,u=e.length,l=s.length;o<l;++o)(c=e[o])?(c.__data__=s[o],r[o]=c):t[o]=new Ls(n,s[o]);for(;o<u;++o)(c=e[o])&&(i[o]=c)}function n_(n,e,t,r,i,s,o){var c,u,l=new Map,f=e.length,p=s.length,m=new Array(f),y;for(c=0;c<f;++c)(u=e[c])&&(m[c]=y=o.call(u,u.__data__,c,e)+"",l.has(y)?i[c]=u:l.set(y,u));for(c=0;c<p;++c)y=o.call(n,s[c],c,s)+"",(u=l.get(y))?(r[c]=u,u.__data__=s[c],l.delete(y)):t[c]=new Ls(n,s[c]);for(c=0;c<f;++c)(u=e[c])&&l.get(m[c])===u&&(i[c]=u)}function r_(n){return n.__data__}function i_(n,e){if(!arguments.length)return Array.from(this,r_);var t=e?n_:t_,r=this._parents,i=this._groups;typeof n!="function"&&(n=e_(n));for(var s=i.length,o=new Array(s),c=new Array(s),u=new Array(s),l=0;l<s;++l){var f=r[l],p=i[l],m=p.length,y=s_(n.call(f,f&&f.__data__,l,r)),C=y.length,D=c[l]=new Array(C),x=o[l]=new Array(C),M=u[l]=new Array(m);t(f,p,D,x,M,y,e);for(var F=0,q=0,W,te;F<C;++F)if(W=D[F]){for(F>=q&&(q=F+1);!(te=x[q])&&++q<C;);W._next=te||null}}return o=new rt(o,r),o._enter=c,o._exit=u,o}function s_(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function o_(){return new rt(this._exit||this._groups.map(Hf),this._parents)}function a_(n,e,t){var r=this.enter(),i=this,s=this.exit();return typeof n=="function"?(r=n(r),r&&(r=r.selection())):r=r.append(n+""),e!=null&&(i=e(i),i&&(i=i.selection())),t==null?s.remove():t(s),r&&i?r.merge(i).order():i}function c_(n){for(var e=n.selection?n.selection():n,t=this._groups,r=e._groups,i=t.length,s=r.length,o=Math.min(i,s),c=new Array(i),u=0;u<o;++u)for(var l=t[u],f=r[u],p=l.length,m=c[u]=new Array(p),y,C=0;C<p;++C)(y=l[C]||f[C])&&(m[C]=y);for(;u<i;++u)c[u]=t[u];return new rt(c,this._parents)}function u_(){for(var n=this._groups,e=-1,t=n.length;++e<t;)for(var r=n[e],i=r.length-1,s=r[i],o;--i>=0;)(o=r[i])&&(s&&o.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(o,s),s=o);return this}function l_(n){n||(n=h_);function e(p,m){return p&&m?n(p.__data__,m.__data__):!p-!m}for(var t=this._groups,r=t.length,i=new Array(r),s=0;s<r;++s){for(var o=t[s],c=o.length,u=i[s]=new Array(c),l,f=0;f<c;++f)(l=o[f])&&(u[f]=l);u.sort(e)}return new rt(i,this._parents).order()}function h_(n,e){return n<e?-1:n>e?1:n>=e?0:NaN}function f_(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function d_(){return Array.from(this)}function m_(){for(var n=this._groups,e=0,t=n.length;e<t;++e)for(var r=n[e],i=0,s=r.length;i<s;++i){var o=r[i];if(o)return o}return null}function p_(){let n=0;for(const e of this)++n;return n}function g_(){return!this.node()}function __(n){for(var e=this._groups,t=0,r=e.length;t<r;++t)for(var i=e[t],s=0,o=i.length,c;s<o;++s)(c=i[s])&&n.call(c,c.__data__,s,i);return this}function y_(n){return function(){this.removeAttribute(n)}}function v_(n){return function(){this.removeAttributeNS(n.space,n.local)}}function w_(n,e){return function(){this.setAttribute(n,e)}}function T_(n,e){return function(){this.setAttributeNS(n.space,n.local,e)}}function E_(n,e){return function(){var t=e.apply(this,arguments);t==null?this.removeAttribute(n):this.setAttribute(n,t)}}function I_(n,e){return function(){var t=e.apply(this,arguments);t==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,t)}}function A_(n,e){var t=mo(n);if(arguments.length<2){var r=this.node();return t.local?r.getAttributeNS(t.space,t.local):r.getAttribute(t)}return this.each((e==null?t.local?v_:y_:typeof e=="function"?t.local?I_:E_:t.local?T_:w_)(t,e))}function jf(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function b_(n){return function(){this.style.removeProperty(n)}}function S_(n,e,t){return function(){this.style.setProperty(n,e,t)}}function R_(n,e,t){return function(){var r=e.apply(this,arguments);r==null?this.style.removeProperty(n):this.style.setProperty(n,r,t)}}function C_(n,e,t){return arguments.length>1?this.each((e==null?b_:typeof e=="function"?R_:S_)(n,e,t??"")):gr(this.node(),n)}function gr(n,e){return n.style.getPropertyValue(e)||jf(n).getComputedStyle(n,null).getPropertyValue(e)}function P_(n){return function(){delete this[n]}}function k_(n,e){return function(){this[n]=e}}function D_(n,e){return function(){var t=e.apply(this,arguments);t==null?delete this[n]:this[n]=t}}function x_(n,e){return arguments.length>1?this.each((e==null?P_:typeof e=="function"?D_:k_)(n,e)):this.node()[n]}function Wf(n){return n.trim().split(/^|\s+/)}function yc(n){return n.classList||new Gf(n)}function Gf(n){this._node=n,this._names=Wf(n.getAttribute("class")||"")}Gf.prototype={add:function(n){var e=this._names.indexOf(n);e<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var e=this._names.indexOf(n);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function Kf(n,e){for(var t=yc(n),r=-1,i=e.length;++r<i;)t.add(e[r])}function Yf(n,e){for(var t=yc(n),r=-1,i=e.length;++r<i;)t.remove(e[r])}function M_(n){return function(){Kf(this,n)}}function N_(n){return function(){Yf(this,n)}}function V_(n,e){return function(){(e.apply(this,arguments)?Kf:Yf)(this,n)}}function L_(n,e){var t=Wf(n+"");if(arguments.length<2){for(var r=yc(this.node()),i=-1,s=t.length;++i<s;)if(!r.contains(t[i]))return!1;return!0}return this.each((typeof e=="function"?V_:e?M_:N_)(t,e))}function O_(){this.textContent=""}function F_(n){return function(){this.textContent=n}}function U_(n){return function(){var e=n.apply(this,arguments);this.textContent=e??""}}function B_(n){return arguments.length?this.each(n==null?O_:(typeof n=="function"?U_:F_)(n)):this.node().textContent}function $_(){this.innerHTML=""}function z_(n){return function(){this.innerHTML=n}}function q_(n){return function(){var e=n.apply(this,arguments);this.innerHTML=e??""}}function H_(n){return arguments.length?this.each(n==null?$_:(typeof n=="function"?q_:z_)(n)):this.node().innerHTML}function j_(){this.nextSibling&&this.parentNode.appendChild(this)}function W_(){return this.each(j_)}function G_(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function K_(){return this.each(G_)}function Y_(n){var e=typeof n=="function"?n:Bf(n);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function Q_(){return null}function X_(n,e){var t=typeof n=="function"?n:Bf(n),r=e==null?Q_:typeof e=="function"?e:_c(e);return this.select(function(){return this.insertBefore(t.apply(this,arguments),r.apply(this,arguments)||null)})}function J_(){var n=this.parentNode;n&&n.removeChild(this)}function Z_(){return this.each(J_)}function ey(){var n=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(n,this.nextSibling):n}function ty(){var n=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(n,this.nextSibling):n}function ny(n){return this.select(n?ty:ey)}function ry(n){return arguments.length?this.property("__data__",n):this.node().__data__}function iy(n){return function(e){n.call(this,e,this.__data__)}}function sy(n){return n.trim().split(/^|\s+/).map(function(e){var t="",r=e.indexOf(".");return r>=0&&(t=e.slice(r+1),e=e.slice(0,r)),{type:e,name:t}})}function oy(n){return function(){var e=this.__on;if(e){for(var t=0,r=-1,i=e.length,s;t<i;++t)s=e[t],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):e[++r]=s;++r?e.length=r:delete this.__on}}}function ay(n,e,t){return function(){var r=this.__on,i,s=iy(e);if(r){for(var o=0,c=r.length;o<c;++o)if((i=r[o]).type===n.type&&i.name===n.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=t),i.value=e;return}}this.addEventListener(n.type,s,t),i={type:n.type,name:n.name,value:e,listener:s,options:t},r?r.push(i):this.__on=[i]}}function cy(n,e,t){var r=sy(n+""),i,s=r.length,o;if(arguments.length<2){var c=this.node().__on;if(c){for(var u=0,l=c.length,f;u<l;++u)for(i=0,f=c[u];i<s;++i)if((o=r[i]).type===f.type&&o.name===f.name)return f.value}return}for(c=e?ay:oy,i=0;i<s;++i)this.each(c(r[i],e,t));return this}function Qf(n,e,t){var r=jf(n),i=r.CustomEvent;typeof i=="function"?i=new i(e,t):(i=r.document.createEvent("Event"),t?(i.initEvent(e,t.bubbles,t.cancelable),i.detail=t.detail):i.initEvent(e,!1,!1)),n.dispatchEvent(i)}function uy(n,e){return function(){return Qf(this,n,e)}}function ly(n,e){return function(){return Qf(this,n,e.apply(this,arguments))}}function hy(n,e){return this.each((typeof e=="function"?ly:uy)(n,e))}function*fy(){for(var n=this._groups,e=0,t=n.length;e<t;++e)for(var r=n[e],i=0,s=r.length,o;i<s;++i)(o=r[i])&&(yield o)}var Xf=[null];function rt(n,e){this._groups=n,this._parents=e}function Ni(){return new rt([[document.documentElement]],Xf)}function dy(){return this}rt.prototype=Ni.prototype={constructor:rt,select:Ug,selectAll:qg,selectChild:Gg,selectChildren:Xg,filter:Jg,data:i_,enter:Zg,exit:o_,join:a_,merge:c_,selection:dy,order:u_,sort:l_,call:f_,nodes:d_,node:m_,size:p_,empty:g_,each:__,attr:A_,style:C_,property:x_,classed:L_,text:B_,html:H_,raise:W_,lower:K_,append:Y_,insert:X_,remove:Z_,clone:ny,datum:ry,on:cy,dispatch:hy,[Symbol.iterator]:fy};function en(n){return typeof n=="string"?new rt([[document.querySelector(n)]],[document.documentElement]):new rt([[n]],Xf)}function my(n){let e;for(;e=n.sourceEvent;)n=e;return n}function bn(n,e){if(n=my(n),e===void 0&&(e=n.currentTarget),e){var t=e.ownerSVGElement||e;if(t.createSVGPoint){var r=t.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(e.getScreenCTM().inverse()),[r.x,r.y]}if(e.getBoundingClientRect){var i=e.getBoundingClientRect();return[n.clientX-i.left-e.clientLeft,n.clientY-i.top-e.clientTop]}}return[n.pageX,n.pageY]}const ka={capture:!0,passive:!1};function Da(n){n.preventDefault(),n.stopImmediatePropagation()}function py(n){var e=n.document.documentElement,t=en(n).on("dragstart.drag",Da,ka);"onselectstart"in e?t.on("selectstart.drag",Da,ka):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function gy(n,e){var t=n.document.documentElement,r=en(n).on("dragstart.drag",null);e&&(r.on("click.drag",Da,ka),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in t?r.on("selectstart.drag",null):(t.style.MozUserSelect=t.__noselect,delete t.__noselect)}function vc(n,e,t){n.prototype=e.prototype=t,t.constructor=n}function Jf(n,e){var t=Object.create(n.prototype);for(var r in e)t[r]=e[r];return t}function Vi(){}var wi=.7,Os=1/wi,lr="\\s*([+-]?\\d+)\\s*",Ti="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Tt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",_y=/^#([0-9a-f]{3,8})$/,yy=new RegExp(`^rgb\\(${lr},${lr},${lr}\\)$`),vy=new RegExp(`^rgb\\(${Tt},${Tt},${Tt}\\)$`),wy=new RegExp(`^rgba\\(${lr},${lr},${lr},${Ti}\\)$`),Ty=new RegExp(`^rgba\\(${Tt},${Tt},${Tt},${Ti}\\)$`),Ey=new RegExp(`^hsl\\(${Ti},${Tt},${Tt}\\)$`),Iy=new RegExp(`^hsla\\(${Ti},${Tt},${Tt},${Ti}\\)$`),Pl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};vc(Vi,$n,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:kl,formatHex:kl,formatHex8:Ay,formatHsl:by,formatRgb:Dl,toString:Dl});function kl(){return this.rgb().formatHex()}function Ay(){return this.rgb().formatHex8()}function by(){return Zf(this).formatHsl()}function Dl(){return this.rgb().formatRgb()}function $n(n){var e,t;return n=(n+"").trim().toLowerCase(),(e=_y.exec(n))?(t=e[1].length,e=parseInt(e[1],16),t===6?xl(e):t===3?new Ze(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):t===8?cs(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):t===4?cs(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=yy.exec(n))?new Ze(e[1],e[2],e[3],1):(e=vy.exec(n))?new Ze(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=wy.exec(n))?cs(e[1],e[2],e[3],e[4]):(e=Ty.exec(n))?cs(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=Ey.exec(n))?Vl(e[1],e[2]/100,e[3]/100,1):(e=Iy.exec(n))?Vl(e[1],e[2]/100,e[3]/100,e[4]):Pl.hasOwnProperty(n)?xl(Pl[n]):n==="transparent"?new Ze(NaN,NaN,NaN,0):null}function xl(n){return new Ze(n>>16&255,n>>8&255,n&255,1)}function cs(n,e,t,r){return r<=0&&(n=e=t=NaN),new Ze(n,e,t,r)}function Sy(n){return n instanceof Vi||(n=$n(n)),n?(n=n.rgb(),new Ze(n.r,n.g,n.b,n.opacity)):new Ze}function xa(n,e,t,r){return arguments.length===1?Sy(n):new Ze(n,e,t,r??1)}function Ze(n,e,t,r){this.r=+n,this.g=+e,this.b=+t,this.opacity=+r}vc(Ze,xa,Jf(Vi,{brighter(n){return n=n==null?Os:Math.pow(Os,n),new Ze(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?wi:Math.pow(wi,n),new Ze(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new Ze(xn(this.r),xn(this.g),xn(this.b),Fs(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Ml,formatHex:Ml,formatHex8:Ry,formatRgb:Nl,toString:Nl}));function Ml(){return`#${Pn(this.r)}${Pn(this.g)}${Pn(this.b)}`}function Ry(){return`#${Pn(this.r)}${Pn(this.g)}${Pn(this.b)}${Pn((isNaN(this.opacity)?1:this.opacity)*255)}`}function Nl(){const n=Fs(this.opacity);return`${n===1?"rgb(":"rgba("}${xn(this.r)}, ${xn(this.g)}, ${xn(this.b)}${n===1?")":`, ${n})`}`}function Fs(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function xn(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function Pn(n){return n=xn(n),(n<16?"0":"")+n.toString(16)}function Vl(n,e,t,r){return r<=0?n=e=t=NaN:t<=0||t>=1?n=e=NaN:e<=0&&(n=NaN),new ut(n,e,t,r)}function Zf(n){if(n instanceof ut)return new ut(n.h,n.s,n.l,n.opacity);if(n instanceof Vi||(n=$n(n)),!n)return new ut;if(n instanceof ut)return n;n=n.rgb();var e=n.r/255,t=n.g/255,r=n.b/255,i=Math.min(e,t,r),s=Math.max(e,t,r),o=NaN,c=s-i,u=(s+i)/2;return c?(e===s?o=(t-r)/c+(t<r)*6:t===s?o=(r-e)/c+2:o=(e-t)/c+4,c/=u<.5?s+i:2-s-i,o*=60):c=u>0&&u<1?0:o,new ut(o,c,u,n.opacity)}function Cy(n,e,t,r){return arguments.length===1?Zf(n):new ut(n,e,t,r??1)}function ut(n,e,t,r){this.h=+n,this.s=+e,this.l=+t,this.opacity=+r}vc(ut,Cy,Jf(Vi,{brighter(n){return n=n==null?Os:Math.pow(Os,n),new ut(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?wi:Math.pow(wi,n),new ut(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,e=isNaN(n)||isNaN(this.s)?0:this.s,t=this.l,r=t+(t<.5?t:1-t)*e,i=2*t-r;return new Ze(ia(n>=240?n-240:n+120,i,r),ia(n,i,r),ia(n<120?n+240:n-120,i,r),this.opacity)},clamp(){return new ut(Ll(this.h),us(this.s),us(this.l),Fs(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=Fs(this.opacity);return`${n===1?"hsl(":"hsla("}${Ll(this.h)}, ${us(this.s)*100}%, ${us(this.l)*100}%${n===1?")":`, ${n})`}`}}));function Ll(n){return n=(n||0)%360,n<0?n+360:n}function us(n){return Math.max(0,Math.min(1,n||0))}function ia(n,e,t){return(n<60?e+(t-e)*n/60:n<180?t:n<240?e+(t-e)*(240-n)/60:e)*255}const wc=n=>()=>n;function Py(n,e){return function(t){return n+t*e}}function ky(n,e,t){return n=Math.pow(n,t),e=Math.pow(e,t)-n,t=1/t,function(r){return Math.pow(n+r*e,t)}}function Dy(n){return(n=+n)==1?ed:function(e,t){return t-e?ky(e,t,n):wc(isNaN(e)?t:e)}}function ed(n,e){var t=e-n;return t?Py(n,t):wc(isNaN(n)?e:n)}const Us=function n(e){var t=Dy(e);function r(i,s){var o=t((i=xa(i)).r,(s=xa(s)).r),c=t(i.g,s.g),u=t(i.b,s.b),l=ed(i.opacity,s.opacity);return function(f){return i.r=o(f),i.g=c(f),i.b=u(f),i.opacity=l(f),i+""}}return r.gamma=n,r}(1);function xy(n,e){e||(e=[]);var t=n?Math.min(e.length,n.length):0,r=e.slice(),i;return function(s){for(i=0;i<t;++i)r[i]=n[i]*(1-s)+e[i]*s;return r}}function My(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ny(n,e){var t=e?e.length:0,r=n?Math.min(t,n.length):0,i=new Array(r),s=new Array(t),o;for(o=0;o<r;++o)i[o]=Tc(n[o],e[o]);for(;o<t;++o)s[o]=e[o];return function(c){for(o=0;o<r;++o)s[o]=i[o](c);return s}}function Vy(n,e){var t=new Date;return n=+n,e=+e,function(r){return t.setTime(n*(1-r)+e*r),t}}function ct(n,e){return n=+n,e=+e,function(t){return n*(1-t)+e*t}}function Ly(n,e){var t={},r={},i;(n===null||typeof n!="object")&&(n={}),(e===null||typeof e!="object")&&(e={});for(i in e)i in n?t[i]=Tc(n[i],e[i]):r[i]=e[i];return function(s){for(i in t)r[i]=t[i](s);return r}}var Ma=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,sa=new RegExp(Ma.source,"g");function Oy(n){return function(){return n}}function Fy(n){return function(e){return n(e)+""}}function td(n,e){var t=Ma.lastIndex=sa.lastIndex=0,r,i,s,o=-1,c=[],u=[];for(n=n+"",e=e+"";(r=Ma.exec(n))&&(i=sa.exec(e));)(s=i.index)>t&&(s=e.slice(t,s),c[o]?c[o]+=s:c[++o]=s),(r=r[0])===(i=i[0])?c[o]?c[o]+=i:c[++o]=i:(c[++o]=null,u.push({i:o,x:ct(r,i)})),t=sa.lastIndex;return t<e.length&&(s=e.slice(t),c[o]?c[o]+=s:c[++o]=s),c.length<2?u[0]?Fy(u[0].x):Oy(e):(e=u.length,function(l){for(var f=0,p;f<e;++f)c[(p=u[f]).i]=p.x(l);return c.join("")})}function Tc(n,e){var t=typeof e,r;return e==null||t==="boolean"?wc(e):(t==="number"?ct:t==="string"?(r=$n(e))?(e=r,Us):td:e instanceof $n?Us:e instanceof Date?Vy:My(e)?xy:Array.isArray(e)?Ny:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Ly:ct)(n,e)}function Uy(n,e){return n=+n,e=+e,function(t){return Math.round(n*(1-t)+e*t)}}var Ol=180/Math.PI,Na={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function nd(n,e,t,r,i,s){var o,c,u;return(o=Math.sqrt(n*n+e*e))&&(n/=o,e/=o),(u=n*t+e*r)&&(t-=n*u,r-=e*u),(c=Math.sqrt(t*t+r*r))&&(t/=c,r/=c,u/=c),n*r<e*t&&(n=-n,e=-e,u=-u,o=-o),{translateX:i,translateY:s,rotate:Math.atan2(e,n)*Ol,skewX:Math.atan(u)*Ol,scaleX:o,scaleY:c}}var ls;function By(n){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return e.isIdentity?Na:nd(e.a,e.b,e.c,e.d,e.e,e.f)}function $y(n){return n==null||(ls||(ls=document.createElementNS("http://www.w3.org/2000/svg","g")),ls.setAttribute("transform",n),!(n=ls.transform.baseVal.consolidate()))?Na:(n=n.matrix,nd(n.a,n.b,n.c,n.d,n.e,n.f))}function rd(n,e,t,r){function i(l){return l.length?l.pop()+" ":""}function s(l,f,p,m,y,C){if(l!==p||f!==m){var D=y.push("translate(",null,e,null,t);C.push({i:D-4,x:ct(l,p)},{i:D-2,x:ct(f,m)})}else(p||m)&&y.push("translate("+p+e+m+t)}function o(l,f,p,m){l!==f?(l-f>180?f+=360:f-l>180&&(l+=360),m.push({i:p.push(i(p)+"rotate(",null,r)-2,x:ct(l,f)})):f&&p.push(i(p)+"rotate("+f+r)}function c(l,f,p,m){l!==f?m.push({i:p.push(i(p)+"skewX(",null,r)-2,x:ct(l,f)}):f&&p.push(i(p)+"skewX("+f+r)}function u(l,f,p,m,y,C){if(l!==p||f!==m){var D=y.push(i(y)+"scale(",null,",",null,")");C.push({i:D-4,x:ct(l,p)},{i:D-2,x:ct(f,m)})}else(p!==1||m!==1)&&y.push(i(y)+"scale("+p+","+m+")")}return function(l,f){var p=[],m=[];return l=n(l),f=n(f),s(l.translateX,l.translateY,f.translateX,f.translateY,p,m),o(l.rotate,f.rotate,p,m),c(l.skewX,f.skewX,p,m),u(l.scaleX,l.scaleY,f.scaleX,f.scaleY,p,m),l=f=null,function(y){for(var C=-1,D=m.length,x;++C<D;)p[(x=m[C]).i]=x.x(y);return p.join("")}}}var zy=rd(By,"px, ","px)","deg)"),qy=rd($y,", ",")",")"),Hy=1e-12;function Fl(n){return((n=Math.exp(n))+1/n)/2}function jy(n){return((n=Math.exp(n))-1/n)/2}function Wy(n){return((n=Math.exp(2*n))-1)/(n+1)}const Gy=function n(e,t,r){function i(s,o){var c=s[0],u=s[1],l=s[2],f=o[0],p=o[1],m=o[2],y=f-c,C=p-u,D=y*y+C*C,x,M;if(D<Hy)M=Math.log(m/l)/e,x=function(T){return[c+T*y,u+T*C,l*Math.exp(e*T*M)]};else{var F=Math.sqrt(D),q=(m*m-l*l+r*D)/(2*l*t*F),W=(m*m-l*l-r*D)/(2*m*t*F),te=Math.log(Math.sqrt(q*q+1)-q),O=Math.log(Math.sqrt(W*W+1)-W);M=(O-te)/e,x=function(T){var _=T*M,w=Fl(te),I=l/(t*F)*(w*Wy(e*_+te)-jy(te));return[c+I*y,u+I*C,l*w/Fl(e*_+te)]}}return x.duration=M*1e3*e/Math.SQRT2,x}return i.rho=function(s){var o=Math.max(.001,+s),c=o*o,u=c*c;return n(o,c,u)},i}(Math.SQRT2,2,4);var _r=0,oi=0,ei=0,id=1e3,Bs,ai,$s=0,zn=0,po=0,Ei=typeof performance=="object"&&performance.now?performance:Date,sd=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function Ec(){return zn||(sd(Ky),zn=Ei.now()+po)}function Ky(){zn=0}function zs(){this._call=this._time=this._next=null}zs.prototype=od.prototype={constructor:zs,restart:function(n,e,t){if(typeof n!="function")throw new TypeError("callback is not a function");t=(t==null?Ec():+t)+(e==null?0:+e),!this._next&&ai!==this&&(ai?ai._next=this:Bs=this,ai=this),this._call=n,this._time=t,Va()},stop:function(){this._call&&(this._call=null,this._time=1/0,Va())}};function od(n,e,t){var r=new zs;return r.restart(n,e,t),r}function Yy(){Ec(),++_r;for(var n=Bs,e;n;)(e=zn-n._time)>=0&&n._call.call(void 0,e),n=n._next;--_r}function Ul(){zn=($s=Ei.now())+po,_r=oi=0;try{Yy()}finally{_r=0,Xy(),zn=0}}function Qy(){var n=Ei.now(),e=n-$s;e>id&&(po-=e,$s=n)}function Xy(){for(var n,e=Bs,t,r=1/0;e;)e._call?(r>e._time&&(r=e._time),n=e,e=e._next):(t=e._next,e._next=null,e=n?n._next=t:Bs=t);ai=n,Va(r)}function Va(n){if(!_r){oi&&(oi=clearTimeout(oi));var e=n-zn;e>24?(n<1/0&&(oi=setTimeout(Ul,n-Ei.now()-po)),ei&&(ei=clearInterval(ei))):(ei||($s=Ei.now(),ei=setInterval(Qy,id)),_r=1,sd(Ul))}}function Bl(n,e,t){var r=new zs;return e=e==null?0:+e,r.restart(i=>{r.stop(),n(i+e)},e,t),r}var Jy=gc("start","end","cancel","interrupt"),Zy=[],ad=0,$l=1,La=2,ws=3,zl=4,Oa=5,Ts=6;function go(n,e,t,r,i,s){var o=n.__transition;if(!o)n.__transition={};else if(t in o)return;ev(n,t,{name:e,index:r,group:i,on:Jy,tween:Zy,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:ad})}function Ic(n,e){var t=_t(n,e);if(t.state>ad)throw new Error("too late; already scheduled");return t}function Ct(n,e){var t=_t(n,e);if(t.state>ws)throw new Error("too late; already running");return t}function _t(n,e){var t=n.__transition;if(!t||!(t=t[e]))throw new Error("transition not found");return t}function ev(n,e,t){var r=n.__transition,i;r[e]=t,t.timer=od(s,0,t.time);function s(l){t.state=$l,t.timer.restart(o,t.delay,t.time),t.delay<=l&&o(l-t.delay)}function o(l){var f,p,m,y;if(t.state!==$l)return u();for(f in r)if(y=r[f],y.name===t.name){if(y.state===ws)return Bl(o);y.state===zl?(y.state=Ts,y.timer.stop(),y.on.call("interrupt",n,n.__data__,y.index,y.group),delete r[f]):+f<e&&(y.state=Ts,y.timer.stop(),y.on.call("cancel",n,n.__data__,y.index,y.group),delete r[f])}if(Bl(function(){t.state===ws&&(t.state=zl,t.timer.restart(c,t.delay,t.time),c(l))}),t.state=La,t.on.call("start",n,n.__data__,t.index,t.group),t.state===La){for(t.state=ws,i=new Array(m=t.tween.length),f=0,p=-1;f<m;++f)(y=t.tween[f].value.call(n,n.__data__,t.index,t.group))&&(i[++p]=y);i.length=p+1}}function c(l){for(var f=l<t.duration?t.ease.call(null,l/t.duration):(t.timer.restart(u),t.state=Oa,1),p=-1,m=i.length;++p<m;)i[p].call(n,f);t.state===Oa&&(t.on.call("end",n,n.__data__,t.index,t.group),u())}function u(){t.state=Ts,t.timer.stop(),delete r[e];for(var l in r)return;delete n.__transition}}function Es(n,e){var t=n.__transition,r,i,s=!0,o;if(t){e=e==null?null:e+"";for(o in t){if((r=t[o]).name!==e){s=!1;continue}i=r.state>La&&r.state<Oa,r.state=Ts,r.timer.stop(),r.on.call(i?"interrupt":"cancel",n,n.__data__,r.index,r.group),delete t[o]}s&&delete n.__transition}}function tv(n){return this.each(function(){Es(this,n)})}function nv(n,e){var t,r;return function(){var i=Ct(this,n),s=i.tween;if(s!==t){r=t=s;for(var o=0,c=r.length;o<c;++o)if(r[o].name===e){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function rv(n,e,t){var r,i;if(typeof t!="function")throw new Error;return function(){var s=Ct(this,n),o=s.tween;if(o!==r){i=(r=o).slice();for(var c={name:e,value:t},u=0,l=i.length;u<l;++u)if(i[u].name===e){i[u]=c;break}u===l&&i.push(c)}s.tween=i}}function iv(n,e){var t=this._id;if(n+="",arguments.length<2){for(var r=_t(this.node(),t).tween,i=0,s=r.length,o;i<s;++i)if((o=r[i]).name===n)return o.value;return null}return this.each((e==null?nv:rv)(t,n,e))}function Ac(n,e,t){var r=n._id;return n.each(function(){var i=Ct(this,r);(i.value||(i.value={}))[e]=t.apply(this,arguments)}),function(i){return _t(i,r).value[e]}}function cd(n,e){var t;return(typeof e=="number"?ct:e instanceof $n?Us:(t=$n(e))?(e=t,Us):td)(n,e)}function sv(n){return function(){this.removeAttribute(n)}}function ov(n){return function(){this.removeAttributeNS(n.space,n.local)}}function av(n,e,t){var r,i=t+"",s;return function(){var o=this.getAttribute(n);return o===i?null:o===r?s:s=e(r=o,t)}}function cv(n,e,t){var r,i=t+"",s;return function(){var o=this.getAttributeNS(n.space,n.local);return o===i?null:o===r?s:s=e(r=o,t)}}function uv(n,e,t){var r,i,s;return function(){var o,c=t(this),u;return c==null?void this.removeAttribute(n):(o=this.getAttribute(n),u=c+"",o===u?null:o===r&&u===i?s:(i=u,s=e(r=o,c)))}}function lv(n,e,t){var r,i,s;return function(){var o,c=t(this),u;return c==null?void this.removeAttributeNS(n.space,n.local):(o=this.getAttributeNS(n.space,n.local),u=c+"",o===u?null:o===r&&u===i?s:(i=u,s=e(r=o,c)))}}function hv(n,e){var t=mo(n),r=t==="transform"?qy:cd;return this.attrTween(n,typeof e=="function"?(t.local?lv:uv)(t,r,Ac(this,"attr."+n,e)):e==null?(t.local?ov:sv)(t):(t.local?cv:av)(t,r,e))}function fv(n,e){return function(t){this.setAttribute(n,e.call(this,t))}}function dv(n,e){return function(t){this.setAttributeNS(n.space,n.local,e.call(this,t))}}function mv(n,e){var t,r;function i(){var s=e.apply(this,arguments);return s!==r&&(t=(r=s)&&dv(n,s)),t}return i._value=e,i}function pv(n,e){var t,r;function i(){var s=e.apply(this,arguments);return s!==r&&(t=(r=s)&&fv(n,s)),t}return i._value=e,i}function gv(n,e){var t="attr."+n;if(arguments.length<2)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;var r=mo(n);return this.tween(t,(r.local?mv:pv)(r,e))}function _v(n,e){return function(){Ic(this,n).delay=+e.apply(this,arguments)}}function yv(n,e){return e=+e,function(){Ic(this,n).delay=e}}function vv(n){var e=this._id;return arguments.length?this.each((typeof n=="function"?_v:yv)(e,n)):_t(this.node(),e).delay}function wv(n,e){return function(){Ct(this,n).duration=+e.apply(this,arguments)}}function Tv(n,e){return e=+e,function(){Ct(this,n).duration=e}}function Ev(n){var e=this._id;return arguments.length?this.each((typeof n=="function"?wv:Tv)(e,n)):_t(this.node(),e).duration}function Iv(n,e){if(typeof e!="function")throw new Error;return function(){Ct(this,n).ease=e}}function Av(n){var e=this._id;return arguments.length?this.each(Iv(e,n)):_t(this.node(),e).ease}function bv(n,e){return function(){var t=e.apply(this,arguments);if(typeof t!="function")throw new Error;Ct(this,n).ease=t}}function Sv(n){if(typeof n!="function")throw new Error;return this.each(bv(this._id,n))}function Rv(n){typeof n!="function"&&(n=zf(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=[],u,l=0;l<o;++l)(u=s[l])&&n.call(u,u.__data__,l,s)&&c.push(u);return new Ft(r,this._parents,this._name,this._id)}function Cv(n){if(n._id!==this._id)throw new Error;for(var e=this._groups,t=n._groups,r=e.length,i=t.length,s=Math.min(r,i),o=new Array(r),c=0;c<s;++c)for(var u=e[c],l=t[c],f=u.length,p=o[c]=new Array(f),m,y=0;y<f;++y)(m=u[y]||l[y])&&(p[y]=m);for(;c<r;++c)o[c]=e[c];return new Ft(o,this._parents,this._name,this._id)}function Pv(n){return(n+"").trim().split(/^|\s+/).every(function(e){var t=e.indexOf(".");return t>=0&&(e=e.slice(0,t)),!e||e==="start"})}function kv(n,e,t){var r,i,s=Pv(e)?Ic:Ct;return function(){var o=s(this,n),c=o.on;c!==r&&(i=(r=c).copy()).on(e,t),o.on=i}}function Dv(n,e){var t=this._id;return arguments.length<2?_t(this.node(),t).on.on(n):this.each(kv(t,n,e))}function xv(n){return function(){var e=this.parentNode;for(var t in this.__transition)if(+t!==n)return;e&&e.removeChild(this)}}function Mv(){return this.on("end.remove",xv(this._id))}function Nv(n){var e=this._name,t=this._id;typeof n!="function"&&(n=_c(n));for(var r=this._groups,i=r.length,s=new Array(i),o=0;o<i;++o)for(var c=r[o],u=c.length,l=s[o]=new Array(u),f,p,m=0;m<u;++m)(f=c[m])&&(p=n.call(f,f.__data__,m,c))&&("__data__"in f&&(p.__data__=f.__data__),l[m]=p,go(l[m],e,t,m,l,_t(f,t)));return new Ft(s,this._parents,e,t)}function Vv(n){var e=this._name,t=this._id;typeof n!="function"&&(n=$f(n));for(var r=this._groups,i=r.length,s=[],o=[],c=0;c<i;++c)for(var u=r[c],l=u.length,f,p=0;p<l;++p)if(f=u[p]){for(var m=n.call(f,f.__data__,p,u),y,C=_t(f,t),D=0,x=m.length;D<x;++D)(y=m[D])&&go(y,e,t,D,m,C);s.push(m),o.push(f)}return new Ft(s,o,e,t)}var Lv=Ni.prototype.constructor;function Ov(){return new Lv(this._groups,this._parents)}function Fv(n,e){var t,r,i;return function(){var s=gr(this,n),o=(this.style.removeProperty(n),gr(this,n));return s===o?null:s===t&&o===r?i:i=e(t=s,r=o)}}function ud(n){return function(){this.style.removeProperty(n)}}function Uv(n,e,t){var r,i=t+"",s;return function(){var o=gr(this,n);return o===i?null:o===r?s:s=e(r=o,t)}}function Bv(n,e,t){var r,i,s;return function(){var o=gr(this,n),c=t(this),u=c+"";return c==null&&(u=c=(this.style.removeProperty(n),gr(this,n))),o===u?null:o===r&&u===i?s:(i=u,s=e(r=o,c))}}function $v(n,e){var t,r,i,s="style."+e,o="end."+s,c;return function(){var u=Ct(this,n),l=u.on,f=u.value[s]==null?c||(c=ud(e)):void 0;(l!==t||i!==f)&&(r=(t=l).copy()).on(o,i=f),u.on=r}}function zv(n,e,t){var r=(n+="")=="transform"?zy:cd;return e==null?this.styleTween(n,Fv(n,r)).on("end.style."+n,ud(n)):typeof e=="function"?this.styleTween(n,Bv(n,r,Ac(this,"style."+n,e))).each($v(this._id,n)):this.styleTween(n,Uv(n,r,e),t).on("end.style."+n,null)}function qv(n,e,t){return function(r){this.style.setProperty(n,e.call(this,r),t)}}function Hv(n,e,t){var r,i;function s(){var o=e.apply(this,arguments);return o!==i&&(r=(i=o)&&qv(n,o,t)),r}return s._value=e,s}function jv(n,e,t){var r="style."+(n+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(e==null)return this.tween(r,null);if(typeof e!="function")throw new Error;return this.tween(r,Hv(n,e,t??""))}function Wv(n){return function(){this.textContent=n}}function Gv(n){return function(){var e=n(this);this.textContent=e??""}}function Kv(n){return this.tween("text",typeof n=="function"?Gv(Ac(this,"text",n)):Wv(n==null?"":n+""))}function Yv(n){return function(e){this.textContent=n.call(this,e)}}function Qv(n){var e,t;function r(){var i=n.apply(this,arguments);return i!==t&&(e=(t=i)&&Yv(i)),e}return r._value=n,r}function Xv(n){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(n==null)return this.tween(e,null);if(typeof n!="function")throw new Error;return this.tween(e,Qv(n))}function Jv(){for(var n=this._name,e=this._id,t=ld(),r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],c=o.length,u,l=0;l<c;++l)if(u=o[l]){var f=_t(u,e);go(u,n,t,l,o,{time:f.time+f.delay+f.duration,delay:0,duration:f.duration,ease:f.ease})}return new Ft(r,this._parents,n,t)}function Zv(){var n,e,t=this,r=t._id,i=t.size();return new Promise(function(s,o){var c={value:o},u={value:function(){--i===0&&s()}};t.each(function(){var l=Ct(this,r),f=l.on;f!==n&&(e=(n=f).copy(),e._.cancel.push(c),e._.interrupt.push(c),e._.end.push(u)),l.on=e}),i===0&&s()})}var ew=0;function Ft(n,e,t,r){this._groups=n,this._parents=e,this._name=t,this._id=r}function ld(){return++ew}var Pt=Ni.prototype;Ft.prototype={constructor:Ft,select:Nv,selectAll:Vv,selectChild:Pt.selectChild,selectChildren:Pt.selectChildren,filter:Rv,merge:Cv,selection:Ov,transition:Jv,call:Pt.call,nodes:Pt.nodes,node:Pt.node,size:Pt.size,empty:Pt.empty,each:Pt.each,on:Dv,attr:hv,attrTween:gv,style:zv,styleTween:jv,text:Kv,textTween:Xv,remove:Mv,tween:iv,delay:vv,duration:Ev,ease:Av,easeVarying:Sv,end:Zv,[Symbol.iterator]:Pt[Symbol.iterator]};function tw(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var nw={time:null,delay:0,duration:250,ease:tw};function rw(n,e){for(var t;!(t=n.__transition)||!(t=t[e]);)if(!(n=n.parentNode))throw new Error(`transition ${e} not found`);return t}function iw(n){var e,t;n instanceof Ft?(e=n._id,n=n._name):(e=ld(),(t=nw).time=Ec(),n=n==null?null:n+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],c=o.length,u,l=0;l<c;++l)(u=o[l])&&go(u,n,e,l,o,t||rw(u,e));return new Ft(r,this._parents,n,e)}Ni.prototype.interrupt=tv;Ni.prototype.transition=iw;const Fa=Math.PI,Ua=2*Fa,Sn=1e-6,sw=Ua-Sn;function hd(n){this._+=n[0];for(let e=1,t=n.length;e<t;++e)this._+=arguments[e]+n[e]}function ow(n){let e=Math.floor(n);if(!(e>=0))throw new Error(`invalid digits: ${n}`);if(e>15)return hd;const t=10**e;return function(r){this._+=r[0];for(let i=1,s=r.length;i<s;++i)this._+=Math.round(arguments[i]*t)/t+r[i]}}class aw{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?hd:ow(e)}moveTo(e,t){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,t){this._append`L${this._x1=+e},${this._y1=+t}`}quadraticCurveTo(e,t,r,i){this._append`Q${+e},${+t},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(e,t,r,i,s,o){this._append`C${+e},${+t},${+r},${+i},${this._x1=+s},${this._y1=+o}`}arcTo(e,t,r,i,s){if(e=+e,t=+t,r=+r,i=+i,s=+s,s<0)throw new Error(`negative radius: ${s}`);let o=this._x1,c=this._y1,u=r-e,l=i-t,f=o-e,p=c-t,m=f*f+p*p;if(this._x1===null)this._append`M${this._x1=e},${this._y1=t}`;else if(m>Sn)if(!(Math.abs(p*u-l*f)>Sn)||!s)this._append`L${this._x1=e},${this._y1=t}`;else{let y=r-o,C=i-c,D=u*u+l*l,x=y*y+C*C,M=Math.sqrt(D),F=Math.sqrt(m),q=s*Math.tan((Fa-Math.acos((D+m-x)/(2*M*F)))/2),W=q/F,te=q/M;Math.abs(W-1)>Sn&&this._append`L${e+W*f},${t+W*p}`,this._append`A${s},${s},0,0,${+(p*y>f*C)},${this._x1=e+te*u},${this._y1=t+te*l}`}}arc(e,t,r,i,s,o){if(e=+e,t=+t,r=+r,o=!!o,r<0)throw new Error(`negative radius: ${r}`);let c=r*Math.cos(i),u=r*Math.sin(i),l=e+c,f=t+u,p=1^o,m=o?i-s:s-i;this._x1===null?this._append`M${l},${f}`:(Math.abs(this._x1-l)>Sn||Math.abs(this._y1-f)>Sn)&&this._append`L${l},${f}`,r&&(m<0&&(m=m%Ua+Ua),m>sw?this._append`A${r},${r},0,1,${p},${e-c},${t-u}A${r},${r},0,1,${p},${this._x1=l},${this._y1=f}`:m>Sn&&this._append`A${r},${r},0,${+(m>=Fa)},${p},${this._x1=e+r*Math.cos(s)},${this._y1=t+r*Math.sin(s)}`)}rect(e,t,r,i){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}}function cw(n){var e=0,t=n.children,r=t&&t.length;if(!r)e=1;else for(;--r>=0;)e+=t[r].value;n.value=e}function uw(){return this.eachAfter(cw)}function lw(n,e){let t=-1;for(const r of this)n.call(e,r,++t,this);return this}function hw(n,e){for(var t=this,r=[t],i,s,o=-1;t=r.pop();)if(n.call(e,t,++o,this),i=t.children)for(s=i.length-1;s>=0;--s)r.push(i[s]);return this}function fw(n,e){for(var t=this,r=[t],i=[],s,o,c,u=-1;t=r.pop();)if(i.push(t),s=t.children)for(o=0,c=s.length;o<c;++o)r.push(s[o]);for(;t=i.pop();)n.call(e,t,++u,this);return this}function dw(n,e){let t=-1;for(const r of this)if(n.call(e,r,++t,this))return r}function mw(n){return this.eachAfter(function(e){for(var t=+n(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)t+=r[i].value;e.value=t})}function pw(n){return this.eachBefore(function(e){e.children&&e.children.sort(n)})}function gw(n){for(var e=this,t=_w(e,n),r=[e];e!==t;)e=e.parent,r.push(e);for(var i=r.length;n!==t;)r.splice(i,0,n),n=n.parent;return r}function _w(n,e){if(n===e)return n;var t=n.ancestors(),r=e.ancestors(),i=null;for(n=t.pop(),e=r.pop();n===e;)i=n,n=t.pop(),e=r.pop();return i}function yw(){for(var n=this,e=[n];n=n.parent;)e.push(n);return e}function vw(){return Array.from(this)}function ww(){var n=[];return this.eachBefore(function(e){e.children||n.push(e)}),n}function Tw(){var n=this,e=[];return n.each(function(t){t!==n&&e.push({source:t.parent,target:t})}),e}function*Ew(){var n=this,e,t=[n],r,i,s;do for(e=t.reverse(),t=[];n=e.pop();)if(yield n,r=n.children)for(i=0,s=r.length;i<s;++i)t.push(r[i]);while(t.length)}function fi(n,e){n instanceof Map?(n=[void 0,n],e===void 0&&(e=bw)):e===void 0&&(e=Aw);for(var t=new Ii(n),r,i=[t],s,o,c,u;r=i.pop();)if((o=e(r.data))&&(u=(o=Array.from(o)).length))for(r.children=o,c=u-1;c>=0;--c)i.push(s=o[c]=new Ii(o[c])),s.parent=r,s.depth=r.depth+1;return t.eachBefore(Rw)}function Iw(){return fi(this).eachBefore(Sw)}function Aw(n){return n.children}function bw(n){return Array.isArray(n)?n[1]:null}function Sw(n){n.data.value!==void 0&&(n.value=n.data.value),n.data=n.data.data}function Rw(n){var e=0;do n.height=e;while((n=n.parent)&&n.height<++e)}function Ii(n){this.data=n,this.depth=this.height=0,this.parent=null}Ii.prototype=fi.prototype={constructor:Ii,count:uw,each:lw,eachAfter:fw,eachBefore:hw,find:dw,sum:mw,sort:pw,path:gw,ancestors:yw,descendants:vw,leaves:ww,links:Tw,copy:Iw,[Symbol.iterator]:Ew};function Cw(n,e){return n.parent===e.parent?1:2}function oa(n){var e=n.children;return e?e[0]:n.t}function aa(n){var e=n.children;return e?e[e.length-1]:n.t}function Pw(n,e,t){var r=t/(e.i-n.i);e.c-=r,e.s+=t,n.c+=r,e.z+=t,e.m+=t}function kw(n){for(var e=0,t=0,r=n.children,i=r.length,s;--i>=0;)s=r[i],s.z+=e,s.m+=e,e+=s.s+(t+=s.c)}function Dw(n,e,t){return n.a.parent===e.parent?n.a:t}function Is(n,e){this._=n,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=e}Is.prototype=Object.create(Ii.prototype);function xw(n){for(var e=new Is(n,0),t,r=[e],i,s,o,c;t=r.pop();)if(s=t._.children)for(t.children=new Array(c=s.length),o=c-1;o>=0;--o)r.push(i=t.children[o]=new Is(s[o],o)),i.parent=t;return(e.parent=new Is(null,0)).children=[e],e}function Mw(){var n=Cw,e=1,t=1,r=null;function i(l){var f=xw(l);if(f.eachAfter(s),f.parent.m=-f.z,f.eachBefore(o),r)l.eachBefore(u);else{var p=l,m=l,y=l;l.eachBefore(function(F){F.x<p.x&&(p=F),F.x>m.x&&(m=F),F.depth>y.depth&&(y=F)});var C=p===m?1:n(p,m)/2,D=C-p.x,x=e/(m.x+C+D),M=t/(y.depth||1);l.eachBefore(function(F){F.x=(F.x+D)*x,F.y=F.depth*M})}return l}function s(l){var f=l.children,p=l.parent.children,m=l.i?p[l.i-1]:null;if(f){kw(l);var y=(f[0].z+f[f.length-1].z)/2;m?(l.z=m.z+n(l._,m._),l.m=l.z-y):l.z=y}else m&&(l.z=m.z+n(l._,m._));l.parent.A=c(l,m,l.parent.A||p[0])}function o(l){l._.x=l.z+l.parent.m,l.m+=l.parent.m}function c(l,f,p){if(f){for(var m=l,y=l,C=f,D=m.parent.children[0],x=m.m,M=y.m,F=C.m,q=D.m,W;C=aa(C),m=oa(m),C&&m;)D=oa(D),y=aa(y),y.a=l,W=C.z+F-m.z-x+n(C._,m._),W>0&&(Pw(Dw(C,l,p),l,W),x+=W,M+=W),F+=C.m,x+=m.m,q+=D.m,M+=y.m;C&&!aa(y)&&(y.t=C,y.m+=F-M),m&&!oa(D)&&(D.t=m,D.m+=x-q,p=l)}return p}function u(l){l.x*=e,l.y=l.depth*t}return i.separation=function(l){return arguments.length?(n=l,i):n},i.size=function(l){return arguments.length?(r=!1,e=+l[0],t=+l[1],i):r?null:[e,t]},i.nodeSize=function(l){return arguments.length?(r=!0,e=+l[0],t=+l[1],i):r?[e,t]:null},i}function Nw(n,e){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(e).domain(n);break}return this}function Vw(n){return function(){return n}}function Lw(n){return+n}var ql=[0,1];function cr(n){return n}function Ba(n,e){return(e-=n=+n)?function(t){return(t-n)/e}:Vw(isNaN(e)?NaN:.5)}function Ow(n,e){var t;return n>e&&(t=n,n=e,e=t),function(r){return Math.max(n,Math.min(e,r))}}function Fw(n,e,t){var r=n[0],i=n[1],s=e[0],o=e[1];return i<r?(r=Ba(i,r),s=t(o,s)):(r=Ba(r,i),s=t(s,o)),function(c){return s(r(c))}}function Uw(n,e,t){var r=Math.min(n.length,e.length)-1,i=new Array(r),s=new Array(r),o=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),e=e.slice().reverse());++o<r;)i[o]=Ba(n[o],n[o+1]),s[o]=t(e[o],e[o+1]);return function(c){var u=wg(n,c,1,r)-1;return s[u](i[u](c))}}function Bw(n,e){return e.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function $w(){var n=ql,e=ql,t=Tc,r,i,s,o=cr,c,u,l;function f(){var m=Math.min(n.length,e.length);return o!==cr&&(o=Ow(n[0],n[m-1])),c=m>2?Uw:Fw,u=l=null,p}function p(m){return m==null||isNaN(m=+m)?s:(u||(u=c(n.map(r),e,t)))(r(o(m)))}return p.invert=function(m){return o(i((l||(l=c(e,n.map(r),ct)))(m)))},p.domain=function(m){return arguments.length?(n=Array.from(m,Lw),f()):n.slice()},p.range=function(m){return arguments.length?(e=Array.from(m),f()):e.slice()},p.rangeRound=function(m){return e=Array.from(m),t=Uy,f()},p.clamp=function(m){return arguments.length?(o=m?!0:cr,f()):o!==cr},p.interpolate=function(m){return arguments.length?(t=m,f()):t},p.unknown=function(m){return arguments.length?(s=m,p):s},function(m,y){return r=m,i=y,f()}}function zw(){return $w()(cr,cr)}function qw(n,e){n=n.slice();var t=0,r=n.length-1,i=n[t],s=n[r],o;return s<i&&(o=t,t=r,r=o,o=i,i=s,s=o),n[t]=e.floor(i),n[r]=e.ceil(s),n}const ca=new Date,ua=new Date;function Re(n,e,t,r){function i(s){return n(s=arguments.length===0?new Date:new Date(+s)),s}return i.floor=s=>(n(s=new Date(+s)),s),i.ceil=s=>(n(s=new Date(s-1)),e(s,1),n(s),s),i.round=s=>{const o=i(s),c=i.ceil(s);return s-o<c-s?o:c},i.offset=(s,o)=>(e(s=new Date(+s),o==null?1:Math.floor(o)),s),i.range=(s,o,c)=>{const u=[];if(s=i.ceil(s),c=c==null?1:Math.floor(c),!(s<o)||!(c>0))return u;let l;do u.push(l=new Date(+s)),e(s,c),n(s);while(l<s&&s<o);return u},i.filter=s=>Re(o=>{if(o>=o)for(;n(o),!s(o);)o.setTime(o-1)},(o,c)=>{if(o>=o)if(c<0)for(;++c<=0;)for(;e(o,-1),!s(o););else for(;--c>=0;)for(;e(o,1),!s(o););}),t&&(i.count=(s,o)=>(ca.setTime(+s),ua.setTime(+o),n(ca),n(ua),Math.floor(t(ca,ua))),i.every=s=>(s=Math.floor(s),!isFinite(s)||!(s>0)?null:s>1?i.filter(r?o=>r(o)%s===0:o=>i.count(0,o)%s===0):i)),i}const qs=Re(()=>{},(n,e)=>{n.setTime(+n+e)},(n,e)=>e-n);qs.every=n=>(n=Math.floor(n),!isFinite(n)||!(n>0)?null:n>1?Re(e=>{e.setTime(Math.floor(e/n)*n)},(e,t)=>{e.setTime(+e+t*n)},(e,t)=>(t-e)/n):qs);qs.range;const xt=1e3,st=xt*60,Mt=st*60,Ut=Mt*24,bc=Ut*7,Hl=Ut*30,la=Ut*365,ur=Re(n=>{n.setTime(n-n.getMilliseconds())},(n,e)=>{n.setTime(+n+e*xt)},(n,e)=>(e-n)/xt,n=>n.getUTCSeconds());ur.range;const Sc=Re(n=>{n.setTime(n-n.getMilliseconds()-n.getSeconds()*xt)},(n,e)=>{n.setTime(+n+e*st)},(n,e)=>(e-n)/st,n=>n.getMinutes());Sc.range;const Hw=Re(n=>{n.setUTCSeconds(0,0)},(n,e)=>{n.setTime(+n+e*st)},(n,e)=>(e-n)/st,n=>n.getUTCMinutes());Hw.range;const Rc=Re(n=>{n.setTime(n-n.getMilliseconds()-n.getSeconds()*xt-n.getMinutes()*st)},(n,e)=>{n.setTime(+n+e*Mt)},(n,e)=>(e-n)/Mt,n=>n.getHours());Rc.range;const jw=Re(n=>{n.setUTCMinutes(0,0,0)},(n,e)=>{n.setTime(+n+e*Mt)},(n,e)=>(e-n)/Mt,n=>n.getUTCHours());jw.range;const Li=Re(n=>n.setHours(0,0,0,0),(n,e)=>n.setDate(n.getDate()+e),(n,e)=>(e-n-(e.getTimezoneOffset()-n.getTimezoneOffset())*st)/Ut,n=>n.getDate()-1);Li.range;const Cc=Re(n=>{n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCDate(n.getUTCDate()+e)},(n,e)=>(e-n)/Ut,n=>n.getUTCDate()-1);Cc.range;const Ww=Re(n=>{n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCDate(n.getUTCDate()+e)},(n,e)=>(e-n)/Ut,n=>Math.floor(n/Ut));Ww.range;function Qn(n){return Re(e=>{e.setDate(e.getDate()-(e.getDay()+7-n)%7),e.setHours(0,0,0,0)},(e,t)=>{e.setDate(e.getDate()+t*7)},(e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*st)/bc)}const _o=Qn(0),Hs=Qn(1),Gw=Qn(2),Kw=Qn(3),yr=Qn(4),Yw=Qn(5),Qw=Qn(6);_o.range;Hs.range;Gw.range;Kw.range;yr.range;Yw.range;Qw.range;function Xn(n){return Re(e=>{e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-n)%7),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t*7)},(e,t)=>(t-e)/bc)}const fd=Xn(0),js=Xn(1),Xw=Xn(2),Jw=Xn(3),vr=Xn(4),Zw=Xn(5),e0=Xn(6);fd.range;js.range;Xw.range;Jw.range;vr.range;Zw.range;e0.range;const Pc=Re(n=>{n.setDate(1),n.setHours(0,0,0,0)},(n,e)=>{n.setMonth(n.getMonth()+e)},(n,e)=>e.getMonth()-n.getMonth()+(e.getFullYear()-n.getFullYear())*12,n=>n.getMonth());Pc.range;const t0=Re(n=>{n.setUTCDate(1),n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCMonth(n.getUTCMonth()+e)},(n,e)=>e.getUTCMonth()-n.getUTCMonth()+(e.getUTCFullYear()-n.getUTCFullYear())*12,n=>n.getUTCMonth());t0.range;const Bt=Re(n=>{n.setMonth(0,1),n.setHours(0,0,0,0)},(n,e)=>{n.setFullYear(n.getFullYear()+e)},(n,e)=>e.getFullYear()-n.getFullYear(),n=>n.getFullYear());Bt.every=n=>!isFinite(n=Math.floor(n))||!(n>0)?null:Re(e=>{e.setFullYear(Math.floor(e.getFullYear()/n)*n),e.setMonth(0,1),e.setHours(0,0,0,0)},(e,t)=>{e.setFullYear(e.getFullYear()+t*n)});Bt.range;const qn=Re(n=>{n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCFullYear(n.getUTCFullYear()+e)},(n,e)=>e.getUTCFullYear()-n.getUTCFullYear(),n=>n.getUTCFullYear());qn.every=n=>!isFinite(n=Math.floor(n))||!(n>0)?null:Re(e=>{e.setUTCFullYear(Math.floor(e.getUTCFullYear()/n)*n),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCFullYear(e.getUTCFullYear()+t*n)});qn.range;function n0(n,e,t,r,i,s){const o=[[ur,1,xt],[ur,5,5*xt],[ur,15,15*xt],[ur,30,30*xt],[s,1,st],[s,5,5*st],[s,15,15*st],[s,30,30*st],[i,1,Mt],[i,3,3*Mt],[i,6,6*Mt],[i,12,12*Mt],[r,1,Ut],[r,2,2*Ut],[t,1,bc],[e,1,Hl],[e,3,3*Hl],[n,1,la]];function c(l,f,p){const m=f<l;m&&([l,f]=[f,l]);const y=p&&typeof p.range=="function"?p:u(l,f,p),C=y?y.range(l,+f+1):[];return m?C.reverse():C}function u(l,f,p){const m=Math.abs(f-l)/p,y=pc(([,,x])=>x).right(o,m);if(y===o.length)return n.every(bl(l/la,f/la,p));if(y===0)return qs.every(Math.max(bl(l,f,p),1));const[C,D]=o[m/o[y-1][2]<o[y][2]/m?y-1:y];return C.every(D)}return[c,u]}const[r0,i0]=n0(Bt,Pc,_o,Li,Rc,Sc);function ha(n){if(0<=n.y&&n.y<100){var e=new Date(-1,n.m,n.d,n.H,n.M,n.S,n.L);return e.setFullYear(n.y),e}return new Date(n.y,n.m,n.d,n.H,n.M,n.S,n.L)}function fa(n){if(0<=n.y&&n.y<100){var e=new Date(Date.UTC(-1,n.m,n.d,n.H,n.M,n.S,n.L));return e.setUTCFullYear(n.y),e}return new Date(Date.UTC(n.y,n.m,n.d,n.H,n.M,n.S,n.L))}function ti(n,e,t){return{y:n,m:e,d:t,H:0,M:0,S:0,L:0}}function s0(n){var e=n.dateTime,t=n.date,r=n.time,i=n.periods,s=n.days,o=n.shortDays,c=n.months,u=n.shortMonths,l=ni(i),f=ri(i),p=ni(s),m=ri(s),y=ni(o),C=ri(o),D=ni(c),x=ri(c),M=ni(u),F=ri(u),q={a:H,A:K,b:J,B:ee,c:null,d:Ql,e:Ql,f:C0,g:F0,G:B0,H:b0,I:S0,j:R0,L:dd,m:P0,M:k0,p:ue,q:de,Q:Zl,s:eh,S:D0,u:x0,U:M0,V:N0,w:V0,W:L0,x:null,X:null,y:O0,Y:U0,Z:$0,"%":Jl},W={a:je,A:_e,b:Me,B:We,c:null,d:Xl,e:Xl,f:j0,g:tT,G:rT,H:z0,I:q0,j:H0,L:pd,m:W0,M:G0,p:Ne,q:Ge,Q:Zl,s:eh,S:K0,u:Y0,U:Q0,V:X0,w:J0,W:Z0,x:null,X:null,y:eT,Y:nT,Z:iT,"%":Jl},te={a:I,A:E,b:A,B:v,c:S,d:Kl,e:Kl,f:T0,g:Gl,G:Wl,H:Yl,I:Yl,j:_0,L:w0,m:g0,M:y0,p:w,q:p0,Q:I0,s:A0,S:v0,u:l0,U:h0,V:f0,w:u0,W:d0,x:z,X:V,y:Gl,Y:Wl,Z:m0,"%":E0};q.x=O(t,q),q.X=O(r,q),q.c=O(e,q),W.x=O(t,W),W.X=O(r,W),W.c=O(e,W);function O(B,ne){return function(oe){var N=[],Ce=-1,he=0,Ke=B.length,Ve,at,Or;for(oe instanceof Date||(oe=new Date(+oe));++Ce<Ke;)B.charCodeAt(Ce)===37&&(N.push(B.slice(he,Ce)),(at=jl[Ve=B.charAt(++Ce)])!=null?Ve=B.charAt(++Ce):at=Ve==="e"?" ":"0",(Or=ne[Ve])&&(Ve=Or(oe,at)),N.push(Ve),he=Ce+1);return N.push(B.slice(he,Ce)),N.join("")}}function T(B,ne){return function(oe){var N=ti(1900,void 0,1),Ce=_(N,B,oe+="",0),he,Ke;if(Ce!=oe.length)return null;if("Q"in N)return new Date(N.Q);if("s"in N)return new Date(N.s*1e3+("L"in N?N.L:0));if(ne&&!("Z"in N)&&(N.Z=0),"p"in N&&(N.H=N.H%12+N.p*12),N.m===void 0&&(N.m="q"in N?N.q:0),"V"in N){if(N.V<1||N.V>53)return null;"w"in N||(N.w=1),"Z"in N?(he=fa(ti(N.y,0,1)),Ke=he.getUTCDay(),he=Ke>4||Ke===0?js.ceil(he):js(he),he=Cc.offset(he,(N.V-1)*7),N.y=he.getUTCFullYear(),N.m=he.getUTCMonth(),N.d=he.getUTCDate()+(N.w+6)%7):(he=ha(ti(N.y,0,1)),Ke=he.getDay(),he=Ke>4||Ke===0?Hs.ceil(he):Hs(he),he=Li.offset(he,(N.V-1)*7),N.y=he.getFullYear(),N.m=he.getMonth(),N.d=he.getDate()+(N.w+6)%7)}else("W"in N||"U"in N)&&("w"in N||(N.w="u"in N?N.u%7:"W"in N?1:0),Ke="Z"in N?fa(ti(N.y,0,1)).getUTCDay():ha(ti(N.y,0,1)).getDay(),N.m=0,N.d="W"in N?(N.w+6)%7+N.W*7-(Ke+5)%7:N.w+N.U*7-(Ke+6)%7);return"Z"in N?(N.H+=N.Z/100|0,N.M+=N.Z%100,fa(N)):ha(N)}}function _(B,ne,oe,N){for(var Ce=0,he=ne.length,Ke=oe.length,Ve,at;Ce<he;){if(N>=Ke)return-1;if(Ve=ne.charCodeAt(Ce++),Ve===37){if(Ve=ne.charAt(Ce++),at=te[Ve in jl?ne.charAt(Ce++):Ve],!at||(N=at(B,oe,N))<0)return-1}else if(Ve!=oe.charCodeAt(N++))return-1}return N}function w(B,ne,oe){var N=l.exec(ne.slice(oe));return N?(B.p=f.get(N[0].toLowerCase()),oe+N[0].length):-1}function I(B,ne,oe){var N=y.exec(ne.slice(oe));return N?(B.w=C.get(N[0].toLowerCase()),oe+N[0].length):-1}function E(B,ne,oe){var N=p.exec(ne.slice(oe));return N?(B.w=m.get(N[0].toLowerCase()),oe+N[0].length):-1}function A(B,ne,oe){var N=M.exec(ne.slice(oe));return N?(B.m=F.get(N[0].toLowerCase()),oe+N[0].length):-1}function v(B,ne,oe){var N=D.exec(ne.slice(oe));return N?(B.m=x.get(N[0].toLowerCase()),oe+N[0].length):-1}function S(B,ne,oe){return _(B,e,ne,oe)}function z(B,ne,oe){return _(B,t,ne,oe)}function V(B,ne,oe){return _(B,r,ne,oe)}function H(B){return o[B.getDay()]}function K(B){return s[B.getDay()]}function J(B){return u[B.getMonth()]}function ee(B){return c[B.getMonth()]}function ue(B){return i[+(B.getHours()>=12)]}function de(B){return 1+~~(B.getMonth()/3)}function je(B){return o[B.getUTCDay()]}function _e(B){return s[B.getUTCDay()]}function Me(B){return u[B.getUTCMonth()]}function We(B){return c[B.getUTCMonth()]}function Ne(B){return i[+(B.getUTCHours()>=12)]}function Ge(B){return 1+~~(B.getUTCMonth()/3)}return{format:function(B){var ne=O(B+="",q);return ne.toString=function(){return B},ne},parse:function(B){var ne=T(B+="",!1);return ne.toString=function(){return B},ne},utcFormat:function(B){var ne=O(B+="",W);return ne.toString=function(){return B},ne},utcParse:function(B){var ne=T(B+="",!0);return ne.toString=function(){return B},ne}}}var jl={"-":"",_:" ",0:"0"},xe=/^\s*\d+/,o0=/^%/,a0=/[\\^$*+?|[\]().{}]/g;function ce(n,e,t){var r=n<0?"-":"",i=(r?-n:n)+"",s=i.length;return r+(s<t?new Array(t-s+1).join(e)+i:i)}function c0(n){return n.replace(a0,"\\$&")}function ni(n){return new RegExp("^(?:"+n.map(c0).join("|")+")","i")}function ri(n){return new Map(n.map((e,t)=>[e.toLowerCase(),t]))}function u0(n,e,t){var r=xe.exec(e.slice(t,t+1));return r?(n.w=+r[0],t+r[0].length):-1}function l0(n,e,t){var r=xe.exec(e.slice(t,t+1));return r?(n.u=+r[0],t+r[0].length):-1}function h0(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.U=+r[0],t+r[0].length):-1}function f0(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.V=+r[0],t+r[0].length):-1}function d0(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.W=+r[0],t+r[0].length):-1}function Wl(n,e,t){var r=xe.exec(e.slice(t,t+4));return r?(n.y=+r[0],t+r[0].length):-1}function Gl(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.y=+r[0]+(+r[0]>68?1900:2e3),t+r[0].length):-1}function m0(n,e,t){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(t,t+6));return r?(n.Z=r[1]?0:-(r[2]+(r[3]||"00")),t+r[0].length):-1}function p0(n,e,t){var r=xe.exec(e.slice(t,t+1));return r?(n.q=r[0]*3-3,t+r[0].length):-1}function g0(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.m=r[0]-1,t+r[0].length):-1}function Kl(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.d=+r[0],t+r[0].length):-1}function _0(n,e,t){var r=xe.exec(e.slice(t,t+3));return r?(n.m=0,n.d=+r[0],t+r[0].length):-1}function Yl(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.H=+r[0],t+r[0].length):-1}function y0(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.M=+r[0],t+r[0].length):-1}function v0(n,e,t){var r=xe.exec(e.slice(t,t+2));return r?(n.S=+r[0],t+r[0].length):-1}function w0(n,e,t){var r=xe.exec(e.slice(t,t+3));return r?(n.L=+r[0],t+r[0].length):-1}function T0(n,e,t){var r=xe.exec(e.slice(t,t+6));return r?(n.L=Math.floor(r[0]/1e3),t+r[0].length):-1}function E0(n,e,t){var r=o0.exec(e.slice(t,t+1));return r?t+r[0].length:-1}function I0(n,e,t){var r=xe.exec(e.slice(t));return r?(n.Q=+r[0],t+r[0].length):-1}function A0(n,e,t){var r=xe.exec(e.slice(t));return r?(n.s=+r[0],t+r[0].length):-1}function Ql(n,e){return ce(n.getDate(),e,2)}function b0(n,e){return ce(n.getHours(),e,2)}function S0(n,e){return ce(n.getHours()%12||12,e,2)}function R0(n,e){return ce(1+Li.count(Bt(n),n),e,3)}function dd(n,e){return ce(n.getMilliseconds(),e,3)}function C0(n,e){return dd(n,e)+"000"}function P0(n,e){return ce(n.getMonth()+1,e,2)}function k0(n,e){return ce(n.getMinutes(),e,2)}function D0(n,e){return ce(n.getSeconds(),e,2)}function x0(n){var e=n.getDay();return e===0?7:e}function M0(n,e){return ce(_o.count(Bt(n)-1,n),e,2)}function md(n){var e=n.getDay();return e>=4||e===0?yr(n):yr.ceil(n)}function N0(n,e){return n=md(n),ce(yr.count(Bt(n),n)+(Bt(n).getDay()===4),e,2)}function V0(n){return n.getDay()}function L0(n,e){return ce(Hs.count(Bt(n)-1,n),e,2)}function O0(n,e){return ce(n.getFullYear()%100,e,2)}function F0(n,e){return n=md(n),ce(n.getFullYear()%100,e,2)}function U0(n,e){return ce(n.getFullYear()%1e4,e,4)}function B0(n,e){var t=n.getDay();return n=t>=4||t===0?yr(n):yr.ceil(n),ce(n.getFullYear()%1e4,e,4)}function $0(n){var e=n.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+ce(e/60|0,"0",2)+ce(e%60,"0",2)}function Xl(n,e){return ce(n.getUTCDate(),e,2)}function z0(n,e){return ce(n.getUTCHours(),e,2)}function q0(n,e){return ce(n.getUTCHours()%12||12,e,2)}function H0(n,e){return ce(1+Cc.count(qn(n),n),e,3)}function pd(n,e){return ce(n.getUTCMilliseconds(),e,3)}function j0(n,e){return pd(n,e)+"000"}function W0(n,e){return ce(n.getUTCMonth()+1,e,2)}function G0(n,e){return ce(n.getUTCMinutes(),e,2)}function K0(n,e){return ce(n.getUTCSeconds(),e,2)}function Y0(n){var e=n.getUTCDay();return e===0?7:e}function Q0(n,e){return ce(fd.count(qn(n)-1,n),e,2)}function gd(n){var e=n.getUTCDay();return e>=4||e===0?vr(n):vr.ceil(n)}function X0(n,e){return n=gd(n),ce(vr.count(qn(n),n)+(qn(n).getUTCDay()===4),e,2)}function J0(n){return n.getUTCDay()}function Z0(n,e){return ce(js.count(qn(n)-1,n),e,2)}function eT(n,e){return ce(n.getUTCFullYear()%100,e,2)}function tT(n,e){return n=gd(n),ce(n.getUTCFullYear()%100,e,2)}function nT(n,e){return ce(n.getUTCFullYear()%1e4,e,4)}function rT(n,e){var t=n.getUTCDay();return n=t>=4||t===0?vr(n):vr.ceil(n),ce(n.getUTCFullYear()%1e4,e,4)}function iT(){return"+0000"}function Jl(){return"%"}function Zl(n){return+n}function eh(n){return Math.floor(+n/1e3)}var rr,kc;sT({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function sT(n){return rr=s0(n),kc=rr.format,rr.parse,rr.utcFormat,rr.utcParse,rr}function oT(n){return new Date(n)}function aT(n){return n instanceof Date?+n:+new Date(+n)}function _d(n,e,t,r,i,s,o,c,u,l){var f=zw(),p=f.invert,m=f.domain,y=l(".%L"),C=l(":%S"),D=l("%I:%M"),x=l("%I %p"),M=l("%a %d"),F=l("%b %d"),q=l("%B"),W=l("%Y");function te(O){return(u(O)<O?y:c(O)<O?C:o(O)<O?D:s(O)<O?x:r(O)<O?i(O)<O?M:F:t(O)<O?q:W)(O)}return f.invert=function(O){return new Date(p(O))},f.domain=function(O){return arguments.length?m(Array.from(O,aT)):m().map(oT)},f.ticks=function(O){var T=m();return n(T[0],T[T.length-1],O??10)},f.tickFormat=function(O,T){return T==null?te:l(T)},f.nice=function(O){var T=m();return(!O||typeof O.range!="function")&&(O=e(T[0],T[T.length-1],O??10)),O?m(qw(T,O)):f},f.copy=function(){return Bw(f,_d(n,e,t,r,i,s,o,c,u,l))},f}function cT(){return Nw.apply(_d(r0,i0,Bt,Pc,_o,Li,Rc,Sc,ur,kc).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}function th(n){return function(){return n}}function uT(n){let e=3;return n.digits=function(t){if(!arguments.length)return e;if(t==null)e=null;else{const r=Math.floor(t);if(!(r>=0))throw new RangeError(`invalid digits: ${t}`);e=r}return n},()=>new aw(e)}var lT=Array.prototype.slice;function hT(n){return n[0]}function fT(n){return n[1]}class dT{constructor(e,t){this._context=e,this._x=t}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(e,t){switch(e=+e,t=+t,this._point){case 0:{this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+e)/2,this._y0,this._x0,t,e,t):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+t)/2,e,this._y0,e,t);break}}this._x0=e,this._y0=t}}function mT(n){return new dT(n,!1)}function pT(n){return n.source}function gT(n){return n.target}function _T(n){let e=pT,t=gT,r=hT,i=fT,s=null,o=null,c=uT(u);function u(){let l;const f=lT.call(arguments),p=e.apply(this,f),m=t.apply(this,f);if(s==null&&(o=n(l=c())),o.lineStart(),f[0]=p,o.point(+r.apply(this,f),+i.apply(this,f)),f[0]=m,o.point(+r.apply(this,f),+i.apply(this,f)),o.lineEnd(),l)return o=null,l+""||null}return u.source=function(l){return arguments.length?(e=l,u):e},u.target=function(l){return arguments.length?(t=l,u):t},u.x=function(l){return arguments.length?(r=typeof l=="function"?l:th(+l),u):r},u.y=function(l){return arguments.length?(i=typeof l=="function"?l:th(+l),u):i},u.context=function(l){return arguments.length?(l==null?s=o=null:o=n(s=l),u):s},u}function yT(){return _T(mT)}const hs=n=>()=>n;function vT(n,{sourceEvent:e,target:t,transform:r,dispatch:i}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},target:{value:t,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:i}})}function Nt(n,e,t){this.k=n,this.x=e,this.y=t}Nt.prototype={constructor:Nt,scale:function(n){return n===1?this:new Nt(this.k*n,this.x,this.y)},translate:function(n,e){return n===0&e===0?this:new Nt(this.k,this.x+this.k*n,this.y+this.k*e)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Dc=new Nt(1,0,0);Nt.prototype;function da(n){n.stopImmediatePropagation()}function ii(n){n.preventDefault(),n.stopImmediatePropagation()}function wT(n){return(!n.ctrlKey||n.type==="wheel")&&!n.button}function TT(){var n=this;return n instanceof SVGElement?(n=n.ownerSVGElement||n,n.hasAttribute("viewBox")?(n=n.viewBox.baseVal,[[n.x,n.y],[n.x+n.width,n.y+n.height]]):[[0,0],[n.width.baseVal.value,n.height.baseVal.value]]):[[0,0],[n.clientWidth,n.clientHeight]]}function nh(){return this.__zoom||Dc}function ET(n){return-n.deltaY*(n.deltaMode===1?.05:n.deltaMode?1:.002)*(n.ctrlKey?10:1)}function IT(){return navigator.maxTouchPoints||"ontouchstart"in this}function AT(n,e,t){var r=n.invertX(e[0][0])-t[0][0],i=n.invertX(e[1][0])-t[1][0],s=n.invertY(e[0][1])-t[0][1],o=n.invertY(e[1][1])-t[1][1];return n.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),o>s?(s+o)/2:Math.min(0,s)||Math.max(0,o))}function rh(){var n=wT,e=TT,t=AT,r=ET,i=IT,s=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],c=250,u=Gy,l=gc("start","zoom","end"),f,p,m,y=500,C=150,D=0,x=10;function M(S){S.property("__zoom",nh).on("wheel.zoom",_,{passive:!1}).on("mousedown.zoom",w).on("dblclick.zoom",I).filter(i).on("touchstart.zoom",E).on("touchmove.zoom",A).on("touchend.zoom touchcancel.zoom",v).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}M.transform=function(S,z,V,H){var K=S.selection?S.selection():S;K.property("__zoom",nh),S!==K?te(S,z,V,H):K.interrupt().each(function(){O(this,arguments).event(H).start().zoom(null,typeof z=="function"?z.apply(this,arguments):z).end()})},M.scaleBy=function(S,z,V,H){M.scaleTo(S,function(){var K=this.__zoom.k,J=typeof z=="function"?z.apply(this,arguments):z;return K*J},V,H)},M.scaleTo=function(S,z,V,H){M.transform(S,function(){var K=e.apply(this,arguments),J=this.__zoom,ee=V==null?W(K):typeof V=="function"?V.apply(this,arguments):V,ue=J.invert(ee),de=typeof z=="function"?z.apply(this,arguments):z;return t(q(F(J,de),ee,ue),K,o)},V,H)},M.translateBy=function(S,z,V,H){M.transform(S,function(){return t(this.__zoom.translate(typeof z=="function"?z.apply(this,arguments):z,typeof V=="function"?V.apply(this,arguments):V),e.apply(this,arguments),o)},null,H)},M.translateTo=function(S,z,V,H,K){M.transform(S,function(){var J=e.apply(this,arguments),ee=this.__zoom,ue=H==null?W(J):typeof H=="function"?H.apply(this,arguments):H;return t(Dc.translate(ue[0],ue[1]).scale(ee.k).translate(typeof z=="function"?-z.apply(this,arguments):-z,typeof V=="function"?-V.apply(this,arguments):-V),J,o)},H,K)};function F(S,z){return z=Math.max(s[0],Math.min(s[1],z)),z===S.k?S:new Nt(z,S.x,S.y)}function q(S,z,V){var H=z[0]-V[0]*S.k,K=z[1]-V[1]*S.k;return H===S.x&&K===S.y?S:new Nt(S.k,H,K)}function W(S){return[(+S[0][0]+ +S[1][0])/2,(+S[0][1]+ +S[1][1])/2]}function te(S,z,V,H){S.on("start.zoom",function(){O(this,arguments).event(H).start()}).on("interrupt.zoom end.zoom",function(){O(this,arguments).event(H).end()}).tween("zoom",function(){var K=this,J=arguments,ee=O(K,J).event(H),ue=e.apply(K,J),de=V==null?W(ue):typeof V=="function"?V.apply(K,J):V,je=Math.max(ue[1][0]-ue[0][0],ue[1][1]-ue[0][1]),_e=K.__zoom,Me=typeof z=="function"?z.apply(K,J):z,We=u(_e.invert(de).concat(je/_e.k),Me.invert(de).concat(je/Me.k));return function(Ne){if(Ne===1)Ne=Me;else{var Ge=We(Ne),B=je/Ge[2];Ne=new Nt(B,de[0]-Ge[0]*B,de[1]-Ge[1]*B)}ee.zoom(null,Ne)}})}function O(S,z,V){return!V&&S.__zooming||new T(S,z)}function T(S,z){this.that=S,this.args=z,this.active=0,this.sourceEvent=null,this.extent=e.apply(S,z),this.taps=0}T.prototype={event:function(S){return S&&(this.sourceEvent=S),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(S,z){return this.mouse&&S!=="mouse"&&(this.mouse[1]=z.invert(this.mouse[0])),this.touch0&&S!=="touch"&&(this.touch0[1]=z.invert(this.touch0[0])),this.touch1&&S!=="touch"&&(this.touch1[1]=z.invert(this.touch1[0])),this.that.__zoom=z,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(S){var z=en(this.that).datum();l.call(S,this.that,new vT(S,{sourceEvent:this.sourceEvent,target:M,transform:this.that.__zoom,dispatch:l}),z)}};function _(S,...z){if(!n.apply(this,arguments))return;var V=O(this,z).event(S),H=this.__zoom,K=Math.max(s[0],Math.min(s[1],H.k*Math.pow(2,r.apply(this,arguments)))),J=bn(S);if(V.wheel)(V.mouse[0][0]!==J[0]||V.mouse[0][1]!==J[1])&&(V.mouse[1]=H.invert(V.mouse[0]=J)),clearTimeout(V.wheel);else{if(H.k===K)return;V.mouse=[J,H.invert(J)],Es(this),V.start()}ii(S),V.wheel=setTimeout(ee,C),V.zoom("mouse",t(q(F(H,K),V.mouse[0],V.mouse[1]),V.extent,o));function ee(){V.wheel=null,V.end()}}function w(S,...z){if(m||!n.apply(this,arguments))return;var V=S.currentTarget,H=O(this,z,!0).event(S),K=en(S.view).on("mousemove.zoom",de,!0).on("mouseup.zoom",je,!0),J=bn(S,V),ee=S.clientX,ue=S.clientY;py(S.view),da(S),H.mouse=[J,this.__zoom.invert(J)],Es(this),H.start();function de(_e){if(ii(_e),!H.moved){var Me=_e.clientX-ee,We=_e.clientY-ue;H.moved=Me*Me+We*We>D}H.event(_e).zoom("mouse",t(q(H.that.__zoom,H.mouse[0]=bn(_e,V),H.mouse[1]),H.extent,o))}function je(_e){K.on("mousemove.zoom mouseup.zoom",null),gy(_e.view,H.moved),ii(_e),H.event(_e).end()}}function I(S,...z){if(n.apply(this,arguments)){var V=this.__zoom,H=bn(S.changedTouches?S.changedTouches[0]:S,this),K=V.invert(H),J=V.k*(S.shiftKey?.5:2),ee=t(q(F(V,J),H,K),e.apply(this,z),o);ii(S),c>0?en(this).transition().duration(c).call(te,ee,H,S):en(this).call(M.transform,ee,H,S)}}function E(S,...z){if(n.apply(this,arguments)){var V=S.touches,H=V.length,K=O(this,z,S.changedTouches.length===H).event(S),J,ee,ue,de;for(da(S),ee=0;ee<H;++ee)ue=V[ee],de=bn(ue,this),de=[de,this.__zoom.invert(de),ue.identifier],K.touch0?!K.touch1&&K.touch0[2]!==de[2]&&(K.touch1=de,K.taps=0):(K.touch0=de,J=!0,K.taps=1+!!f);f&&(f=clearTimeout(f)),J&&(K.taps<2&&(p=de[0],f=setTimeout(function(){f=null},y)),Es(this),K.start())}}function A(S,...z){if(this.__zooming){var V=O(this,z).event(S),H=S.changedTouches,K=H.length,J,ee,ue,de;for(ii(S),J=0;J<K;++J)ee=H[J],ue=bn(ee,this),V.touch0&&V.touch0[2]===ee.identifier?V.touch0[0]=ue:V.touch1&&V.touch1[2]===ee.identifier&&(V.touch1[0]=ue);if(ee=V.that.__zoom,V.touch1){var je=V.touch0[0],_e=V.touch0[1],Me=V.touch1[0],We=V.touch1[1],Ne=(Ne=Me[0]-je[0])*Ne+(Ne=Me[1]-je[1])*Ne,Ge=(Ge=We[0]-_e[0])*Ge+(Ge=We[1]-_e[1])*Ge;ee=F(ee,Math.sqrt(Ne/Ge)),ue=[(je[0]+Me[0])/2,(je[1]+Me[1])/2],de=[(_e[0]+We[0])/2,(_e[1]+We[1])/2]}else if(V.touch0)ue=V.touch0[0],de=V.touch0[1];else return;V.zoom("touch",t(q(ee,ue,de),V.extent,o))}}function v(S,...z){if(this.__zooming){var V=O(this,z).event(S),H=S.changedTouches,K=H.length,J,ee;for(da(S),m&&clearTimeout(m),m=setTimeout(function(){m=null},y),J=0;J<K;++J)ee=H[J],V.touch0&&V.touch0[2]===ee.identifier?delete V.touch0:V.touch1&&V.touch1[2]===ee.identifier&&delete V.touch1;if(V.touch1&&!V.touch0&&(V.touch0=V.touch1,delete V.touch1),V.touch0)V.touch0[1]=this.__zoom.invert(V.touch0[0]);else if(V.end(),V.taps===2&&(ee=bn(ee,this),Math.hypot(p[0]-ee[0],p[1]-ee[1])<x)){var ue=en(this).on("dblclick.zoom");ue&&ue.apply(this,arguments)}}}return M.wheelDelta=function(S){return arguments.length?(r=typeof S=="function"?S:hs(+S),M):r},M.filter=function(S){return arguments.length?(n=typeof S=="function"?S:hs(!!S),M):n},M.touchable=function(S){return arguments.length?(i=typeof S=="function"?S:hs(!!S),M):i},M.extent=function(S){return arguments.length?(e=typeof S=="function"?S:hs([[+S[0][0],+S[0][1]],[+S[1][0],+S[1][1]]]),M):e},M.scaleExtent=function(S){return arguments.length?(s[0]=+S[0],s[1]=+S[1],M):[s[0],s[1]]},M.translateExtent=function(S){return arguments.length?(o[0][0]=+S[0][0],o[1][0]=+S[1][0],o[0][1]=+S[0][1],o[1][1]=+S[1][1],M):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},M.constrain=function(S){return arguments.length?(t=S,M):t},M.duration=function(S){return arguments.length?(c=+S,M):c},M.interpolate=function(S){return arguments.length?(u=S,M):u},M.on=function(){var S=l.on.apply(l,arguments);return S===l?M:S},M.clickDistance=function(S){return arguments.length?(D=(S=+S)*S,M):Math.sqrt(D)},M.tapDistance=function(S){return arguments.length?(x=+S,M):x},M}class ih{constructor(e,t){this.svg=en(e),this.familyService=t,this.width=0,this.height=0,this.zoom=1,this.highlightedIds=new Set,this.init()}init(){this.updateDimensions(),this.mainGroup=this.svg.append("g").attr("class","main-group");const e=rh().scaleExtent([.1,4]).on("zoom",t=>{this.mainGroup.attr("transform",t.transform)});this.svg.call(e),window.addEventListener("resize",()=>{this.updateDimensions()})}updateDimensions(){const e=this.svg.node().parentElement;this.width=e.clientWidth,this.height=e.clientHeight,this.svg.attr("width",this.width).attr("height",this.height)}setZoom(e){this.zoom=e;const t=Dc.scale(e);this.svg.transition().duration(300).call(rh().transform,t)}renderTree(e){if(this.mainGroup.selectAll("*").remove(),e.length===0){this.showEmptyState();return}const t=this.buildHierarchy(e),r=t.descendants().length,i=Math.max(this.width-100,r*80),s=Math.max(this.height-100,t.height*150),c=Mw().size([i,s]).separation((u,l)=>u.parent===l.parent?1.2:2)(t);this.drawLinks(c.links()),this.drawNodes(c.descendants())}buildHierarchy(e){const t=e.filter(o=>!o.parentIds||o.parentIds.length===0);if(t.length===0)return fi({name:"Family",children:[]});const r=new Set,i=o=>{if(r.has(o))return null;const c=e.find(p=>p.id===o);if(!c)return null;r.add(o);const l=e.filter(p=>p.parentIds&&p.parentIds.includes(o)&&!r.has(p.id)).map(p=>i(p.id)).filter(p=>p!==null),f=e.find(p=>p.spouseId===o||c.spouseId===p.id);if(f&&!r.has(f.id)){r.add(f.id);const p=e.filter(m=>m.parentIds&&m.parentIds.includes(f.id)&&!r.has(m.id)).map(m=>i(m.id)).filter(m=>m!==null);l.push(...p)}return{...c,children:l.length>0?l:void 0}},s=t.map(o=>i(o.id)).filter(o=>o!==null);return s.length>1?fi({name:"Sharma Family",isVirtualRoot:!0,children:s}):fi(s[0]||{name:"Family",children:[]})}drawLinks(e){const t=this.mainGroup.append("g").attr("class","links").attr("transform",`translate(${this.width/2}, 100)`),r=e.filter(i=>!i.source.data.isVirtualRoot);t.selectAll("path").data(r).enter().append("path").attr("class","tree-link").attr("d",yT().x(i=>i.x).y(i=>i.y)).attr("fill","none").attr("stroke","#ccc").attr("stroke-width",1.5)}drawNodes(e){const t=this.mainGroup.append("g").attr("class","nodes").attr("transform",`translate(${this.width/2}, 100)`),r=e.filter(s=>!s.data.isVirtualRoot),i=t.selectAll("g").data(r).enter().append("g").attr("class",s=>`tree-node ${this.highlightedIds.has(s.data.id)?"highlighted":""} ${s.data.isAlive?"":"deceased"}`).attr("transform",s=>`translate(${s.x}, ${s.y})`).style("cursor","pointer").on("click",(s,o)=>this.handleNodeClick(o.data));i.append("circle").attr("r",25).attr("fill",s=>s.data.isAlive?s.data.gender==="male"?"#4A90E2":"#E24A90":"#888").attr("stroke",s=>s.data.isAlive?"#fff":"#555").attr("stroke-width",2),i.append("text").attr("text-anchor","middle").attr("dy",5).attr("font-size","18px").text(s=>s.data.gender==="male"?"👨":"👩"),i.append("text").attr("text-anchor","middle").attr("dy",42).attr("font-size","9px").attr("font-weight","bold").text(s=>{const c=(s.data.name||"").replace(/^(Pandit |Shri |Smt\. |Late |Dr\. |Baby )/g,"");return c.length>18?c.substring(0,16)+"...":c}),i.append("text").attr("text-anchor","middle").attr("dy",54).attr("font-size","8px").attr("fill","#666").text(s=>{if(s.data.birthDate){const o=new Date(s.data.birthDate).getFullYear();return s.data.isAlive?`b. ${o}`:`${o} - ${s.data.deathDate?new Date(s.data.deathDate).getFullYear():"?"}`}return""})}handleNodeClick(e){const t=new CustomEvent("memberSelected",{detail:e});window.dispatchEvent(t)}highlightMembers(e){this.highlightedIds=new Set(e),this.renderTree(this.familyService.getAllMembers())}filterMembers(e){const t=this.familyService.getAllMembers().filter(r=>e.includes(r.id));this.renderTree(t)}renderTimeline(e){if(this.mainGroup.selectAll("*").remove(),e.length===0){this.showEmptyState();return}const t=e.filter(u=>u.birthDate).sort((u,l)=>new Date(u.birthDate)-new Date(l.birthDate)),r=Ag(t,u=>new Date(u.birthDate)),i=new Date,s=cT().domain([r,i]).range([100,this.width-100]),o=xg(s).ticks(10).tickFormat(kc("%Y"));this.mainGroup.append("g").attr("class","timeline-axis").attr("transform",`translate(0, ${this.height/2})`).call(o);const c=this.mainGroup.selectAll(".timeline-point").data(t).enter().append("g").attr("class","timeline-point").attr("transform",(u,l)=>{const f=s(new Date(u.birthDate)),p=this.height/2+(l%2===0?-80:80);return`translate(${f}, ${p})`});c.append("circle").attr("r",20).attr("fill",u=>u.gender==="male"?"#4A90E2":"#E24A90").style("cursor","pointer").on("click",(u,l)=>this.handleNodeClick(l)),c.append("text").attr("text-anchor","middle").attr("dy",35).attr("font-size","10px").text(u=>u.name),c.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",(u,l)=>l%2===0?80:-80).attr("stroke","#ccc").attr("stroke-dasharray","2,2")}renderGrid(e){if(this.mainGroup.selectAll("*").remove(),e.length===0){this.showEmptyState();return}const t=Math.ceil(Math.sqrt(e.length)),r=150,i=180,s=20,o=this.mainGroup.selectAll(".grid-card").data(e).enter().append("g").attr("class","grid-card").attr("transform",(c,u)=>{const l=u%t,f=Math.floor(u/t),p=50+l*(r+s),m=50+f*(i+s);return`translate(${p}, ${m})`});o.append("rect").attr("width",r).attr("height",i).attr("rx",10).attr("fill","#fff").attr("stroke","#ddd").attr("stroke-width",1).style("cursor","pointer").on("click",(c,u)=>this.handleNodeClick(u)),o.append("circle").attr("cx",r/2).attr("cy",40).attr("r",25).attr("fill",c=>c.gender==="male"?"#4A90E2":"#E24A90"),o.append("text").attr("x",r/2).attr("y",40).attr("text-anchor","middle").attr("dy",8).attr("font-size","20px").text(c=>c.gender==="male"?"👨":"👩"),o.append("text").attr("x",r/2).attr("y",85).attr("text-anchor","middle").attr("font-size","12px").attr("font-weight","bold").text(c=>c.name),o.append("text").attr("x",r/2).attr("y",105).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#666").text(c=>c.birthDate?new Date(c.birthDate).getFullYear():""),o.append("text").attr("x",r/2).attr("y",125).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#888").text(c=>c.profession||"")}showEmptyState(){this.mainGroup.append("text").attr("x",this.width/2).attr("y",this.height/2).attr("text-anchor","middle").attr("font-size","18px").attr("fill","#999").text('No family members to display. Click "Add Member" to get started.')}}class sh{constructor(e){this.familyService=e,this.modal=document.getElementById("memberModal"),this.modalBody=document.getElementById("modalBody"),this.currentMember=null,this.bindEvents()}bindEvents(){var e,t,r,i;(e=document.getElementById("closeModal"))==null||e.addEventListener("click",()=>{this.close()}),(t=document.getElementById("cancelBtn"))==null||t.addEventListener("click",()=>{this.close()}),(r=document.getElementById("saveBtn"))==null||r.addEventListener("click",()=>{this.save()}),(i=this.modal)==null||i.addEventListener("click",s=>{s.target===this.modal&&this.close()}),window.addEventListener("memberSelected",s=>{this.open(s.detail)})}open(e=null){this.currentMember=e,this.renderForm(),this.modal.classList.add("active"),document.body.style.overflow="hidden"}close(){this.modal.classList.remove("active"),document.body.style.overflow="",this.currentMember=null}renderForm(){var t;const e=this.currentMember!==null;document.getElementById("modalTitle").textContent=e?"Edit Member":"Add New Member",this.modalBody.innerHTML=`
            <form id="memberForm" class="member-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Full Name *</label>
                        <input type="text" id="name" name="name" required
                            value="${e?this.currentMember.name:""}"
                            placeholder="Enter full name">
                    </div>

                    <div class="form-group">
                        <label for="gender">Gender *</label>
                        <select id="gender" name="gender" required>
                            <option value="">Select gender</option>
                            <option value="male" ${e&&this.currentMember.gender==="male"?"selected":""}>Male</option>
                            <option value="female" ${e&&this.currentMember.gender==="female"?"selected":""}>Female</option>
                            <option value="other" ${e&&this.currentMember.gender==="other"?"selected":""}>Other</option>
                        </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="birthDate">Date of Birth</label>
                        <input type="date" id="birthDate" name="birthDate"
                            value="${e&&this.currentMember.birthDate?this.currentMember.birthDate:""}">
                    </div>

                    <div class="form-group">
                        <label for="birthPlace">Place of Birth</label>
                        <input type="text" id="birthPlace" name="birthPlace"
                            value="${e&&this.currentMember.birthPlace?this.currentMember.birthPlace:""}"
                            placeholder="City, State">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="isAlive" name="isAlive"
                                ${e&&!this.currentMember.isAlive?"":"checked"}>
                            Currently Alive
                        </label>
                    </div>
                </div>

                <div class="form-row" id="deathDateRow" style="display: ${e&&!this.currentMember.isAlive?"flex":"none"};">
                    <div class="form-group">
                        <label for="deathDate">Date of Death</label>
                        <input type="date" id="deathDate" name="deathDate"
                            value="${e&&this.currentMember.deathDate?this.currentMember.deathDate:""}">
                    </div>

                    <div class="form-group">
                        <label for="deathPlace">Place of Death</label>
                        <input type="text" id="deathPlace" name="deathPlace"
                            value="${e&&this.currentMember.deathPlace?this.currentMember.deathPlace:""}"
                            placeholder="City, State">
                    </div>
                </div>

                <div class="form-section-title">Indian Cultural Information</div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="gotra">Gotra</label>
                        <input type="text" id="gotra" name="gotra"
                            value="${e&&this.currentMember.gotra?this.currentMember.gotra:""}"
                            placeholder="e.g., Bharadwaj, Kashyap">
                    </div>

                    <div class="form-group">
                        <label for="kuldevta">Kuldevta/Kuldevi</label>
                        <input type="text" id="kuldevta" name="kuldevta"
                            value="${e&&this.currentMember.kuldevta?this.currentMember.kuldevta:""}"
                            placeholder="Family deity">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="nakshatra">Nakshatra</label>
                        <input type="text" id="nakshatra" name="nakshatra"
                            value="${e&&this.currentMember.nakshatra?this.currentMember.nakshatra:""}"
                            placeholder="Birth star">
                    </div>

                    <div class="form-group">
                        <label for="rashi">Rashi (Zodiac Sign)</label>
                        <input type="text" id="rashi" name="rashi"
                            value="${e&&this.currentMember.rashi?this.currentMember.rashi:""}"
                            placeholder="e.g., Mesha, Vrishabha">
                    </div>
                </div>

                <div class="form-section-title">Personal Information</div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="profession">Profession</label>
                        <input type="text" id="profession" name="profession"
                            value="${e&&this.currentMember.profession?this.currentMember.profession:""}"
                            placeholder="Occupation">
                    </div>

                    <div class="form-group">
                        <label for="education">Education</label>
                        <input type="text" id="education" name="education"
                            value="${e&&this.currentMember.education?this.currentMember.education:""}"
                            placeholder="Highest qualification">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone"
                            value="${e&&this.currentMember.phone?this.currentMember.phone:""}"
                            placeholder="+91 XXXXX XXXXX">
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email"
                            value="${e&&this.currentMember.email?this.currentMember.email:""}"
                            placeholder="email@example.com">
                    </div>
                </div>

                <div class="form-group">
                    <label for="address">Current Address</label>
                    <textarea id="address" name="address" rows="3"
                        placeholder="Full address">${e&&this.currentMember.address?this.currentMember.address:""}</textarea>
                </div>

                <div class="form-group">
                    <label for="notes">Additional Notes</label>
                    <textarea id="notes" name="notes" rows="3"
                        placeholder="Any additional information">${e&&this.currentMember.notes?this.currentMember.notes:""}</textarea>
                </div>
            </form>
        `,(t=document.getElementById("isAlive"))==null||t.addEventListener("change",r=>{const i=document.getElementById("deathDateRow");i.style.display=r.target.checked?"none":"flex"})}save(){const e=document.getElementById("memberForm"),t=new FormData(e);if(!t.get("name")||!t.get("gender")){alert("Please fill in all required fields");return}const r={name:t.get("name"),gender:t.get("gender"),birthDate:t.get("birthDate")||null,birthPlace:t.get("birthPlace")||null,isAlive:document.getElementById("isAlive").checked,deathDate:t.get("deathDate")||null,deathPlace:t.get("deathPlace")||null,gotra:t.get("gotra")||null,kuldevta:t.get("kuldevta")||null,nakshatra:t.get("nakshatra")||null,rashi:t.get("rashi")||null,profession:t.get("profession")||null,education:t.get("education")||null,phone:t.get("phone")||null,email:t.get("email")||null,address:t.get("address")||null,notes:t.get("notes")||null};this.currentMember?this.familyService.updateMember(this.currentMember.id,r):this.familyService.addMember(r),window.dispatchEvent(new Event("familyDataChanged")),this.close()}}function bT(n,e){let t;return function(...i){const s=()=>{clearTimeout(t),n(...i)};clearTimeout(t),t=setTimeout(s,e)}}class ST{constructor(e=null){this.familyService=e||new pg,this.treeRenderer=null,this.memberModal=null,this.currentZoom=1,this.currentView="tree"}initWithService(){this.treeRenderer=new ih("#familyTree",this.familyService),this.memberModal=new sh(this.familyService),this.bindEvents(),this.render(),this.updateStatistics()}init(){this.familyService.clearAllData(),this.treeRenderer=new ih("#familyTree",this.familyService),this.memberModal=new sh(this.familyService),this.loadSampleData(),this.bindEvents(),this.render(),this.updateStatistics()}loadSampleData(){const e=this.familyService.addMember({name:"Shri Ramchandra Sharma",gender:"male",birthDate:"1950-01-15",birthPlace:"Varanasi, Uttar Pradesh",gotra:"Bharadwaj",profession:"Retired Teacher",isAlive:!0}),t=this.familyService.addMember({name:"Smt. Lakshmi Devi",gender:"female",birthDate:"1955-03-10",birthPlace:"Allahabad, Uttar Pradesh",profession:"Homemaker",isAlive:!0});this.familyService.addSpouse(e.id,t.id,"1975-05-12");const r=this.familyService.addMember({name:"Rajesh Sharma",gender:"male",birthDate:"1978-08-20",birthPlace:"Delhi, India",gotra:"Bharadwaj",profession:"Software Engineer",education:"B.Tech IIT Delhi",isAlive:!0,parentIds:[e.id,t.id]}),i=this.familyService.addMember({name:"Priya Sharma",gender:"female",birthDate:"1980-02-14",birthPlace:"Mumbai, Maharashtra",profession:"Doctor",education:"MBBS",isAlive:!0});this.familyService.addSpouse(r.id,i.id,"2005-12-10"),this.familyService.addMember({name:"Arjun Sharma",gender:"male",birthDate:"2008-06-15",birthPlace:"Bangalore, Karnataka",gotra:"Bharadwaj",profession:"Student",education:"10th Grade",isAlive:!0,parentIds:[r.id,i.id]})}bindEvents(){var t,r,i,s,o,c,u,l;(t=document.getElementById("addMemberBtn"))==null||t.addEventListener("click",()=>{this.memberModal.open()});const e=document.getElementById("searchInput");e&&e.addEventListener("input",bT(f=>{this.handleSearch(f.target.value)},300)),(r=document.getElementById("viewMode"))==null||r.addEventListener("change",f=>{this.currentView=f.target.value,this.render()}),(i=document.getElementById("generationFilter"))==null||i.addEventListener("change",f=>{const p=f.target.value==="all"?null:parseInt(f.target.value);this.filterByGeneration(p)}),(s=document.getElementById("zoomInBtn"))==null||s.addEventListener("click",()=>{this.currentZoom*=1.2,this.treeRenderer.setZoom(this.currentZoom)}),(o=document.getElementById("zoomOutBtn"))==null||o.addEventListener("click",()=>{this.currentZoom/=1.2,this.treeRenderer.setZoom(this.currentZoom)}),(c=document.getElementById("resetZoomBtn"))==null||c.addEventListener("click",()=>{this.currentZoom=1,this.treeRenderer.setZoom(this.currentZoom)}),(u=document.getElementById("exportBtn"))==null||u.addEventListener("click",()=>{this.exportData()}),(l=document.getElementById("printBtn"))==null||l.addEventListener("click",()=>{window.print()}),window.addEventListener("familyDataChanged",()=>{this.render(),this.updateStatistics()})}render(){const e=this.familyService.getAllMembers();switch(this.currentView){case"tree":this.treeRenderer.renderTree(e);break;case"timeline":this.treeRenderer.renderTimeline(e);break;case"grid":this.treeRenderer.renderGrid(e);break}}handleSearch(e){if(!e.trim()){this.render();return}const t=this.familyService.searchMembers(e);this.treeRenderer.highlightMembers(t.map(r=>r.id))}filterByGeneration(e){if(e===null){this.render();return}const t=this.familyService.getMembersByGeneration(e);this.treeRenderer.filterMembers(t.map(r=>r.id))}updateStatistics(){const e=this.familyService.getStatistics();document.getElementById("totalMembers").textContent=e.totalMembers,document.getElementById("totalGenerations").textContent=e.generations,document.getElementById("totalMales").textContent=e.males,document.getElementById("totalFemales").textContent=e.females,this.updateRecentMembers(),this.updateUpcomingEvents()}updateRecentMembers(){const e=document.getElementById("recentMembers"),t=this.familyService.getRecentMembers(5);e.innerHTML=t.map(r=>`
            <div class="recent-item">
                <span class="member-icon">${r.gender==="male"?"👨":"👩"}</span>
                <span class="member-name">${r.name}</span>
            </div>
        `).join("")}updateUpcomingEvents(){const e=document.getElementById("upcomingEvents"),t=this.familyService.getUpcomingBirthdays(5);if(t.length===0){e.innerHTML='<p class="no-events">No upcoming events</p>';return}e.innerHTML=t.map(r=>`
            <div class="event-item">
                <span class="event-icon">🎂</span>
                <div class="event-details">
                    <div class="event-name">${r.member.name}</div>
                    <div class="event-date">${r.date}</div>
                </div>
            </div>
        `).join("")}exportData(){const e=this.familyService.exportData(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=`family-tree-${Date.now()}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}}const RT=()=>{};var oh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},CT=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},vd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,u=i+2<n.length,l=u?n[i+2]:0,f=s>>2,p=(s&3)<<4|c>>4;let m=(c&15)<<2|l>>6,y=l&63;u||(y=64,o||(m=64)),r.push(t[f],t[p],t[m],t[y])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(yd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):CT(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||l==null||p==null)throw new PT;const m=s<<2|c>>4;if(r.push(m),l!==64){const y=c<<4&240|l>>2;if(r.push(y),p!==64){const C=l<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class PT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const kT=function(n){const e=yd(n);return vd.encodeByteArray(e,!0)},Ws=function(n){return kT(n).replace(/\./g,"")},wd=function(n){try{return vd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xT=()=>DT().__FIREBASE_DEFAULTS__,MT=()=>{if(typeof process>"u"||typeof oh>"u")return;const n=oh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},NT=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&wd(n[1]);return e&&JSON.parse(e)},yo=()=>{try{return RT()||xT()||MT()||NT()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Td=n=>{var e,t;return(t=(e=yo())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},VT=n=>{const e=Td(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ed=()=>{var n;return(n=yo())==null?void 0:n.config},Id=n=>{var e;return(e=yo())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ad(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OT(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ws(JSON.stringify(t)),Ws(JSON.stringify(o)),""].join(".")}const di={};function FT(){const n={prod:[],emulator:[]};for(const e of Object.keys(di))di[e]?n.emulator.push(e):n.prod.push(e);return n}function UT(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let ah=!1;function bd(n,e){if(typeof window>"u"||typeof document>"u"||!Pr(window.location.host)||di[n]===e||di[n]||ah)return;di[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=FT().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,y){m.setAttribute("width","24"),m.setAttribute("id",y),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function l(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{ah=!0,o()},m}function f(m,y){m.setAttribute("id",y),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=UT(r),y=t("text"),C=document.getElementById(y)||document.createElement("span"),D=t("learnmore"),x=document.getElementById(D)||document.createElement("a"),M=t("preprendIcon"),F=document.getElementById(M)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const q=m.element;c(q),f(x,D);const W=l();u(F,M),q.append(F,C,x,W),document.body.appendChild(q)}s?(C.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",y)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function BT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(He())}function $T(){var e;const n=(e=yo())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function zT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function qT(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function HT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function jT(){const n=He();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function WT(){return!$T()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function GT(){try{return typeof indexedDB=="object"}catch{return!1}}function KT(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YT="FirebaseError";class Wt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=YT,Object.setPrototypeOf(this,Wt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Oi.prototype.create)}}class Oi{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?QT(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Wt(i,c,r)}}function QT(n,e){return n.replace(XT,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const XT=/\{\$([^}]+)}/g;function JT(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Hn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(ch(s)&&ch(o)){if(!Hn(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function ch(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ZT(n,e){const t=new eE(n,e);return t.subscribe.bind(t)}class eE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");tE(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ma),i.error===void 0&&(i.error=ma),i.complete===void 0&&(i.complete=ma);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function tE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ma(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(n){return n&&n._delegate?n._delegate:n}class jn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new LT;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(iE(e))try{this.getOrInitializeService({instanceIdentifier:Rn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Rn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Rn){return this.instances.has(e)}getOptions(e=Rn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:rE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Rn){return this.component?this.component.multipleInstances?e:Rn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function rE(n){return n===Rn?void 0:n}function iE(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new nE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(re||(re={}));const oE={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},aE=re.INFO,cE={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},uE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=cE[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xc{constructor(e){this.name=e,this._logLevel=aE,this._logHandler=uE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?oE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}const lE=(n,e)=>e.some(t=>n instanceof t);let uh,lh;function hE(){return uh||(uh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fE(){return lh||(lh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Sd=new WeakMap,$a=new WeakMap,Rd=new WeakMap,pa=new WeakMap,Mc=new WeakMap;function dE(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(on(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Sd.set(t,n)}).catch(()=>{}),Mc.set(e,n),e}function mE(n){if($a.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});$a.set(n,e)}let za={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return $a.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Rd.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return on(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function pE(n){za=n(za)}function gE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ga(this),e,...t);return Rd.set(r,e.sort?e.sort():[e]),on(r)}:fE().includes(n)?function(...e){return n.apply(ga(this),e),on(Sd.get(this))}:function(...e){return on(n.apply(ga(this),e))}}function _E(n){return typeof n=="function"?gE(n):(n instanceof IDBTransaction&&mE(n),lE(n,hE())?new Proxy(n,za):n)}function on(n){if(n instanceof IDBRequest)return dE(n);if(pa.has(n))return pa.get(n);const e=_E(n);return e!==n&&(pa.set(n,e),Mc.set(e,n)),e}const ga=n=>Mc.get(n);function yE(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=on(o);return r&&o.addEventListener("upgradeneeded",u=>{r(on(o.result),u.oldVersion,u.newVersion,on(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const vE=["get","getKey","getAll","getAllKeys","count"],wE=["put","add","delete","clear"],_a=new Map;function hh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(_a.get(e))return _a.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=wE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||vE.includes(t)))return;const s=async function(o,...c){const u=this.transaction(o,i?"readwrite":"readonly");let l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),i&&u.done]))[0]};return _a.set(e,s),s}pE(n=>({...n,get:(e,t,r)=>hh(e,t)||n.get(e,t,r),has:(e,t)=>!!hh(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(EE(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function EE(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const qa="@firebase/app",fh="0.14.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $t=new xc("@firebase/app"),IE="@firebase/app-compat",AE="@firebase/analytics-compat",bE="@firebase/analytics",SE="@firebase/app-check-compat",RE="@firebase/app-check",CE="@firebase/auth",PE="@firebase/auth-compat",kE="@firebase/database",DE="@firebase/data-connect",xE="@firebase/database-compat",ME="@firebase/functions",NE="@firebase/functions-compat",VE="@firebase/installations",LE="@firebase/installations-compat",OE="@firebase/messaging",FE="@firebase/messaging-compat",UE="@firebase/performance",BE="@firebase/performance-compat",$E="@firebase/remote-config",zE="@firebase/remote-config-compat",qE="@firebase/storage",HE="@firebase/storage-compat",jE="@firebase/firestore",WE="@firebase/ai",GE="@firebase/firestore-compat",KE="firebase",YE="12.8.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha="[DEFAULT]",QE={[qa]:"fire-core",[IE]:"fire-core-compat",[bE]:"fire-analytics",[AE]:"fire-analytics-compat",[RE]:"fire-app-check",[SE]:"fire-app-check-compat",[CE]:"fire-auth",[PE]:"fire-auth-compat",[kE]:"fire-rtdb",[DE]:"fire-data-connect",[xE]:"fire-rtdb-compat",[ME]:"fire-fn",[NE]:"fire-fn-compat",[VE]:"fire-iid",[LE]:"fire-iid-compat",[OE]:"fire-fcm",[FE]:"fire-fcm-compat",[UE]:"fire-perf",[BE]:"fire-perf-compat",[$E]:"fire-rc",[zE]:"fire-rc-compat",[qE]:"fire-gcs",[HE]:"fire-gcs-compat",[jE]:"fire-fst",[GE]:"fire-fst-compat",[WE]:"fire-vertex","fire-js":"fire-js",[KE]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs=new Map,XE=new Map,ja=new Map;function dh(n,e){try{n.container.addComponent(e)}catch(t){$t.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function wr(n){const e=n.name;if(ja.has(e))return $t.debug(`There were multiple attempts to register component ${e}.`),!1;ja.set(e,n);for(const t of Gs.values())dh(t,n);for(const t of XE.values())dh(t,n);return!0}function Nc(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function lt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},an=new Oi("app","Firebase",JE);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new jn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw an.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr=YE;function Cd(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Ha,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw an.create("bad-app-name",{appName:String(i)});if(t||(t=Ed()),!t)throw an.create("no-options");const s=Gs.get(i);if(s){if(Hn(t,s.options)&&Hn(r,s.config))return s;throw an.create("duplicate-app",{appName:i})}const o=new sE(i);for(const u of ja.values())o.addComponent(u);const c=new ZE(t,r,o);return Gs.set(i,c),c}function Pd(n=Ha){const e=Gs.get(n);if(!e&&n===Ha&&Ed())return Cd();if(!e)throw an.create("no-app",{appName:n});return e}function cn(n,e,t){let r=QE[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),$t.warn(o.join(" "));return}wr(new jn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eI="firebase-heartbeat-database",tI=1,Ai="firebase-heartbeat-store";let ya=null;function kd(){return ya||(ya=yE(eI,tI,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ai)}catch(t){console.warn(t)}}}}).catch(n=>{throw an.create("idb-open",{originalErrorMessage:n.message})})),ya}async function nI(n){try{const t=(await kd()).transaction(Ai),r=await t.objectStore(Ai).get(Dd(n));return await t.done,r}catch(e){if(e instanceof Wt)$t.warn(e.message);else{const t=an.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});$t.warn(t.message)}}}async function mh(n,e){try{const r=(await kd()).transaction(Ai,"readwrite");await r.objectStore(Ai).put(e,Dd(n)),await r.done}catch(t){if(t instanceof Wt)$t.warn(t.message);else{const r=an.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});$t.warn(r.message)}}}function Dd(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rI=1024,iI=30;class sI{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new aI(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ph();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>iI){const o=cI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$t.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ph(),{heartbeatsToSend:r,unsentEntries:i}=oI(this._heartbeatsCache.heartbeats),s=Ws(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return $t.warn(t),""}}}function ph(){return new Date().toISOString().substring(0,10)}function oI(n,e=rI){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),gh(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),gh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class aI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return GT()?KT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await nI(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return mh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return mh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function gh(n){return Ws(JSON.stringify({version:2,heartbeats:n})).length}function cI(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uI(n){wr(new jn("platform-logger",e=>new TE(e),"PRIVATE")),wr(new jn("heartbeat",e=>new sI(e),"PRIVATE")),cn(qa,fh,n),cn(qa,fh,"esm2020"),cn("fire-js","")}uI("");function xd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const lI=xd,Md=new Oi("auth","Firebase",xd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=new xc("@firebase/auth");function hI(n,...e){Ks.logLevel<=re.WARN&&Ks.warn(`Auth (${kr}): ${n}`,...e)}function As(n,...e){Ks.logLevel<=re.ERROR&&Ks.error(`Auth (${kr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(n,...e){throw Lc(n,...e)}function mt(n,...e){return Lc(n,...e)}function Vc(n,e,t){const r={...lI(),[e]:t};return new Oi("auth","Firebase",r).create(e,{appName:n.name})}function Mn(n){return Vc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function fI(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&St(n,"argument-error"),Vc(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Lc(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Md.create(n,...e)}function Y(n,e,...t){if(!n)throw Lc(e,...t)}function Vt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw As(e),new Error(e)}function zt(n,e){n||Vt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wa(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function dI(){return _h()==="http:"||_h()==="https:"}function _h(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(dI()||qT()||"connection"in navigator)?navigator.onLine:!0}function pI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(e,t){this.shortDelay=e,this.longDelay=t,zt(t>e,"Short delay should be less than long delay!"),this.isMobile=BT()||HT()}get(){return mI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oc(n,e){zt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Vt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Vt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Vt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],yI=new Ui(3e4,6e4);function Fc(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Dr(n,e,t,r,i={}){return Vd(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=Fi({key:n.config.apiKey,...o}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:u,...s};return zT()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&Pr(n.emulatorConfig.host)&&(l.credentials="include"),Nd.fetch()(await Ld(n,n.config.apiHost,t,c),l)})}async function Vd(n,e,t){n._canInitEmulator=!1;const r={...gI,...e};try{const i=new wI(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw fs(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw fs(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw fs(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw fs(n,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Vc(n,f,l);St(n,f)}}catch(i){if(i instanceof Wt)throw i;St(n,"network-request-failed",{message:String(i)})}}async function vI(n,e,t,r,i={}){const s=await Dr(n,e,t,r,i);return"mfaPendingCredential"in s&&St(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Ld(n,e,t,r){const i=`${e}${t}?${r}`,s=n,o=s.config.emulator?Oc(n.config,i):`${n.config.apiScheme}://${i}`;return _I.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class wI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(mt(this.auth,"network-request-failed")),yI.get())})}}function fs(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=mt(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TI(n,e){return Dr(n,"POST","/v1/accounts:delete",e)}async function Ys(n,e){return Dr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function EI(n,e=!1){const t=De(n),r=await t.getIdToken(e),i=Uc(r);Y(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:mi(va(i.auth_time)),issuedAtTime:mi(va(i.iat)),expirationTime:mi(va(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function va(n){return Number(n)*1e3}function Uc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return As("JWT malformed, contained fewer than 3 sections"),null;try{const i=wd(t);return i?JSON.parse(i):(As("Failed to decode base64 JWT payload"),null)}catch(i){return As("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function yh(n){const e=Uc(n);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Wt&&II(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function II({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=mi(this.lastLoginAt),this.creationTime=mi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qs(n){var p;const e=n.auth,t=await n.getIdToken(),r=await bi(n,Ys(e,{idToken:t}));Y(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(p=i.providerUserInfo)!=null&&p.length?Od(i.providerUserInfo):[],o=SI(n.providerData,s),c=n.isAnonymous,u=!(n.email&&i.passwordHash)&&!(o!=null&&o.length),l=c?u:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Ga(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(n,f)}async function bI(n){const e=De(n);await Qs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function SI(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Od(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RI(n,e){const t=await Vd(n,{},async()=>{const r=Fi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await Ld(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:r};return n.emulatorConfig&&Pr(n.emulatorConfig.host)&&(u.credentials="include"),Nd.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function CI(n,e){return Dr(n,"POST","/v2/accounts:revokeToken",Fc(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):yh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const t=yh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await RI(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new hr;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Y(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Y(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new hr,this.toJSON())}_performRefresh(){return Vt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zt(n,e){Y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ht{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new AI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ga(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await bi(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return EI(this,e)}reload(){return bI(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ht({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Qs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(lt(this.auth.app))return Promise.reject(Mn(this.auth));const e=await this.getIdToken();return await bi(this,TI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:y,providerData:C,stsTokenManager:D}=t;Y(p&&D,e,"internal-error");const x=hr.fromJSON(this.name,D);Y(typeof p=="string",e,"internal-error"),Zt(r,e.name),Zt(i,e.name),Y(typeof m=="boolean",e,"internal-error"),Y(typeof y=="boolean",e,"internal-error"),Zt(s,e.name),Zt(o,e.name),Zt(c,e.name),Zt(u,e.name),Zt(l,e.name),Zt(f,e.name);const M=new ht({uid:p,auth:e,email:i,emailVerified:m,displayName:r,isAnonymous:y,photoURL:o,phoneNumber:s,tenantId:c,stsTokenManager:x,createdAt:l,lastLoginAt:f});return C&&Array.isArray(C)&&(M.providerData=C.map(F=>({...F}))),u&&(M._redirectEventId=u),M}static async _fromIdTokenResponse(e,t,r=!1){const i=new hr;i.updateFromServerResponse(t);const s=new ht({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Qs(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];Y(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Od(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new hr;c.updateFromIdToken(r);const u=new ht({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Ga(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh=new Map;function Lt(n){zt(n instanceof Function,"Expected a class definition");let e=vh.get(n);return e?(zt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,vh.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Fd.type="NONE";const wh=Fd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bs(n,e,t){return`firebase:${n}:${e}:${t}`}class fr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=bs(this.userKey,i.apiKey,s),this.fullPersistenceKey=bs("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ys(this.auth,{idToken:e}).catch(()=>{});return t?ht._fromGetAccountInfoResponse(this.auth,t,e):null}return ht._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new fr(Lt(wh),e,r);const i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||Lt(wh);const o=bs(r,e.config.apiKey,e.name);let c=null;for(const l of t)try{const f=await l._get(o);if(f){let p;if(typeof f=="string"){const m=await Ys(e,{idToken:f}).catch(()=>{});if(!m)break;p=await ht._fromGetAccountInfoResponse(e,m,f)}else p=ht._fromJSON(e,f);l!==s&&(c=p),s=l;break}}catch{}const u=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new fr(s,e,r):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new fr(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Th(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(zd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ud(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Hd(e))return"Blackberry";if(jd(e))return"Webos";if(Bd(e))return"Safari";if((e.includes("chrome/")||$d(e))&&!e.includes("edge/"))return"Chrome";if(qd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ud(n=He()){return/firefox\//i.test(n)}function Bd(n=He()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $d(n=He()){return/crios\//i.test(n)}function zd(n=He()){return/iemobile/i.test(n)}function qd(n=He()){return/android/i.test(n)}function Hd(n=He()){return/blackberry/i.test(n)}function jd(n=He()){return/webos/i.test(n)}function Bc(n=He()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function PI(n=He()){var e;return Bc(n)&&!!((e=window.navigator)!=null&&e.standalone)}function kI(){return jT()&&document.documentMode===10}function Wd(n=He()){return Bc(n)||qd(n)||jd(n)||Hd(n)||/windows phone/i.test(n)||zd(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gd(n,e=[]){let t;switch(n){case"Browser":t=Th(He());break;case"Worker":t=`${Th(He())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${kr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const u=e(s);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xI(n,e={}){return Dr(n,"GET","/v2/passwordPolicy",Fc(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MI=6;class NI{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??MI,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Eh(this),this.idTokenSubscription=new Eh(this),this.beforeStateQueue=new DI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Md,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Lt(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await fr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ys(this,{idToken:e}),r=await ht._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(lt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,c=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Qs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=pI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(lt(this.app))return Promise.reject(Mn(this));const t=e?De(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return lt(this.app)?Promise.reject(Mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return lt(this.app)?Promise.reject(Mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await xI(this),t=new NI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Oi("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await CI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Lt(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await fr.create(this,[Lt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Gd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(lt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&hI(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function vo(n){return De(n)}class Eh{constructor(e){this.auth=e,this.observer=null,this.addObserver=ZT(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $c={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function LI(n){$c=n}function OI(n){return $c.loadJS(n)}function FI(){return $c.gapiScript}function UI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BI(n,e){const t=Nc(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Hn(s,e??{}))return i;St(i,"already-initialized")}return t.initialize({options:e})}function $I(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Lt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function zI(n,e,t){const r=vo(n);Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Kd(e),{host:o,port:c}=qI(e),u=c===null?"":`:${c}`,l={url:`${s}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){Y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Y(Hn(l,r.config.emulator)&&Hn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Pr(o)?(Ad(`${s}//${o}${u}`),bd("Auth",!0)):HI()}function Kd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function qI(n){const e=Kd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Ih(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Ih(o)}}}function Ih(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function HI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Vt("not implemented")}_getIdTokenResponse(e){return Vt("not implemented")}_linkToIdToken(e,t){return Vt("not implemented")}_getReauthenticationResolver(e){return Vt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dr(n,e){return vI(n,"POST","/v1/accounts:signInWithIdp",Fc(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI="http://localhost";class Wn extends Yd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Wn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):St("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const o=new Wn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return dr(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,dr(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,dr(e,t)}buildRequest(){const e={requestUri:jI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Fi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi extends zc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends Bi{constructor(){super("facebook.com")}static credential(e){return Wn._fromParams({providerId:tn.PROVIDER_ID,signInMethod:tn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tn.credentialFromTaggedObject(e)}static credentialFromError(e){return tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tn.credential(e.oauthAccessToken)}catch{return null}}}tn.FACEBOOK_SIGN_IN_METHOD="facebook.com";tn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends Bi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Wn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Dt.credential(t,r)}catch{return null}}}Dt.GOOGLE_SIGN_IN_METHOD="google.com";Dt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends Bi{constructor(){super("github.com")}static credential(e){return Wn._fromParams({providerId:nn.PROVIDER_ID,signInMethod:nn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nn.credentialFromTaggedObject(e)}static credentialFromError(e){return nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nn.credential(e.oauthAccessToken)}catch{return null}}}nn.GITHUB_SIGN_IN_METHOD="github.com";nn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends Bi{constructor(){super("twitter.com")}static credential(e,t){return Wn._fromParams({providerId:rn.PROVIDER_ID,signInMethod:rn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return rn.credentialFromTaggedObject(e)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return rn.credential(t,r)}catch{return null}}}rn.TWITTER_SIGN_IN_METHOD="twitter.com";rn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await ht._fromIdTokenResponse(e,r,i),o=Ah(r);return new Tr({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Ah(r);return new Tr({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Ah(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs extends Wt{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Xs.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Xs(e,t,r,i)}}function Qd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Xs._fromErrorAndOperation(n,s,e,r):s})}async function WI(n,e,t=!1){const r=await bi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Tr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function GI(n,e,t=!1){const{auth:r}=n;if(lt(r.app))return Promise.reject(Mn(r));const i="reauthenticate";try{const s=await bi(n,Qd(r,i,e,n),t);Y(s.idToken,r,"internal-error");const o=Uc(s.idToken);Y(o,r,"internal-error");const{sub:c}=o;return Y(n.uid===c,r,"user-mismatch"),Tr._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&St(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KI(n,e,t=!1){if(lt(n.app))return Promise.reject(Mn(n));const r="signIn",i=await Qd(n,r,e),s=await Tr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function YI(n,e,t,r){return De(n).onIdTokenChanged(e,t,r)}function QI(n,e,t){return De(n).beforeAuthStateChanged(e,t)}function XI(n,e,t,r){return De(n).onAuthStateChanged(e,t,r)}function JI(n){return De(n).signOut()}const Js="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Js,"1"),this.storage.removeItem(Js),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI=1e3,eA=10;class Jd extends Xd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Wd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);kI()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,eA):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ZI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jd.type="LOCAL";const tA=Jd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd extends Xd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Zd.type="SESSION";const em=Zd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nA(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new wo(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async l=>l(t.origin,s)),u=await nA(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}wo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{const l=qc("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const m=p;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(m.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(){return window}function iA(n){Et().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(){return typeof Et().WorkerGlobalScope<"u"&&typeof Et().importScripts=="function"}async function sA(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function oA(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function aA(){return tm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm="firebaseLocalStorageDb",cA=1,Zs="firebaseLocalStorage",rm="fbase_key";class $i{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function To(n,e){return n.transaction([Zs],e?"readwrite":"readonly").objectStore(Zs)}function uA(){const n=indexedDB.deleteDatabase(nm);return new $i(n).toPromise()}function Ka(){const n=indexedDB.open(nm,cA);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Zs,{keyPath:rm})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Zs)?e(r):(r.close(),await uA(),e(await Ka()))})})}async function bh(n,e,t){const r=To(n,!0).put({[rm]:e,value:t});return new $i(r).toPromise()}async function lA(n,e){const t=To(n,!1).get(e),r=await new $i(t).toPromise();return r===void 0?null:r.value}function Sh(n,e){const t=To(n,!0).delete(e);return new $i(t).toPromise()}const hA=800,fA=3;class im{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ka(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>fA)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=wo._getInstance(aA()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await sA(),!this.activeServiceWorker)return;this.sender=new rA(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||oA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ka();return await bh(e,Js,"1"),await Sh(e,Js),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>bh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>lA(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Sh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=To(i,!1).getAll();return new $i(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),hA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}im.type="LOCAL";const dA=im;new Ui(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sm(n,e){return e?Lt(e):(Y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc extends Yd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return dr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return dr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return dr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function mA(n){return KI(n.auth,new Hc(n),n.bypassAuthState)}function pA(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),GI(t,new Hc(n),n.bypassAuthState)}async function gA(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),WI(t,new Hc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return mA;case"linkViaPopup":case"linkViaRedirect":return gA;case"reauthViaPopup":case"reauthViaRedirect":return pA;default:St(this.auth,"internal-error")}}resolve(e){zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){zt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _A=new Ui(2e3,1e4);async function yA(n,e,t){if(lt(n.app))return Promise.reject(mt(n,"operation-not-supported-in-this-environment"));const r=vo(n);fI(n,e,zc);const i=sm(r,t);return new kn(r,"signInViaPopup",e,i).executeNotNull()}class kn extends om{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,kn.currentPopupAction&&kn.currentPopupAction.cancel(),kn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){zt(this.filter.length===1,"Popup operations only handle one event");const e=qc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(mt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(mt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,kn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(mt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,_A.get())};e()}}kn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vA="pendingRedirect",Ss=new Map;class wA extends om{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ss.get(this.auth._key());if(!e){try{const r=await TA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ss.set(this.auth._key(),e)}return this.bypassAuthState||Ss.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function TA(n,e){const t=AA(e),r=IA(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function EA(n,e){Ss.set(n._key(),e)}function IA(n){return Lt(n._redirectPersistence)}function AA(n){return bs(vA,n.config.apiKey,n.name)}async function bA(n,e,t=!1){if(lt(n.app))return Promise.reject(Mn(n));const r=vo(n),i=sm(r,e),o=await new wA(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SA=10*60*1e3;class RA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!CA(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!am(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(mt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=SA&&this.cachedEventUids.clear(),this.cachedEventUids.has(Rh(e))}saveEventToCache(e){this.cachedEventUids.add(Rh(e)),this.lastProcessedEventTime=Date.now()}}function Rh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function am({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function CA(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return am(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PA(n,e={}){return Dr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,DA=/^https?/;async function xA(n){if(n.config.emulator)return;const{authorizedDomains:e}=await PA(n);for(const t of e)try{if(MA(t))return}catch{}St(n,"unauthorized-domain")}function MA(n){const e=Wa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!DA.test(t))return!1;if(kA.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NA=new Ui(3e4,6e4);function Ch(){const n=Et().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function VA(n){return new Promise((e,t)=>{var i,s,o;function r(){Ch(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ch(),t(mt(n,"network-request-failed"))},timeout:NA.get()})}if((s=(i=Et().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=Et().gapi)!=null&&o.load)r();else{const c=UI("iframefcb");return Et()[c]=()=>{gapi.load?r():t(mt(n,"network-request-failed"))},OI(`${FI()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw Rs=null,e})}let Rs=null;function LA(n){return Rs=Rs||VA(n),Rs}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OA=new Ui(5e3,15e3),FA="__/auth/iframe",UA="emulator/auth/iframe",BA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$A=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zA(n){const e=n.config;Y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Oc(e,UA):`https://${n.config.authDomain}/${FA}`,r={apiKey:e.apiKey,appName:n.name,v:kr},i=$A.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Fi(r).slice(1)}`}async function qA(n){const e=await LA(n),t=Et().gapi;return Y(t,n,"internal-error"),e.open({where:document.body,url:zA(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:BA,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=mt(n,"network-request-failed"),c=Et().setTimeout(()=>{s(o)},OA.get());function u(){Et().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},jA=500,WA=600,GA="_blank",KA="http://localhost";class Ph{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function YA(n,e,t,r=jA,i=WA){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u={...HA,width:r.toString(),height:i.toString(),top:s,left:o},l=He().toLowerCase();t&&(c=$d(l)?GA:t),Ud(l)&&(e=e||KA,u.scrollbars="yes");const f=Object.entries(u).reduce((m,[y,C])=>`${m}${y}=${C},`,"");if(PI(l)&&c!=="_self")return QA(e||"",c),new Ph(null);const p=window.open(e||"",c,f);Y(p,n,"popup-blocked");try{p.focus()}catch{}return new Ph(p)}function QA(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XA="__/auth/handler",JA="emulator/auth/handler",ZA=encodeURIComponent("fac");async function kh(n,e,t,r,i,s){Y(n.config.authDomain,n,"auth-domain-config-required"),Y(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:kr,eventId:i};if(e instanceof zc){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",JT(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof Bi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),l=u?`#${ZA}=${encodeURIComponent(u)}`:"";return`${eb(n)}?${Fi(c).slice(1)}${l}`}function eb({config:n}){return n.emulator?Oc(n,JA):`https://${n.authDomain}/${XA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa="webStorageSupport";class tb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=em,this._completeRedirectFn=bA,this._overrideRedirectResult=EA}async _openPopup(e,t,r,i){var o;zt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await kh(e,t,r,Wa(),i);return YA(e,s,qc())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await kh(e,t,r,Wa(),i);return iA(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(zt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await qA(e),r=new RA(e);return t.register("authEvent",i=>(Y(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(wa,{type:wa},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[wa];s!==void 0&&t(!!s),St(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=xA(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Wd()||Bd()||Bc()}}const nb=tb;var Dh="@firebase/auth",xh="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ib(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function sb(n){wr(new jn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Gd(n)},l=new VI(r,i,s,u);return $I(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),wr(new jn("auth-internal",e=>{const t=vo(e.getProvider("auth").getImmediate());return(r=>new rb(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),cn(Dh,xh,ib(n)),cn(Dh,xh,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ob=5*60,ab=Id("authIdTokenMaxAge")||ob;let Mh=null;const cb=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>ab)return;const i=t==null?void 0:t.token;Mh!==i&&(Mh=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ub(n=Pd()){const e=Nc(n,"auth");if(e.isInitialized())return e.getImmediate();const t=BI(n,{popupRedirectResolver:nb,persistence:[dA,tA,em]}),r=Id("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=cb(s.toString());QI(t,o,()=>o(t.currentUser)),YI(t,c=>o(c))}}const i=Td("auth");return i&&zI(t,`http://${i}`),t}function lb(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}LI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=mt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",lb().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});sb("Browser");var Nh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var un,cm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,_){function w(){}w.prototype=_.prototype,T.F=_.prototype,T.prototype=new w,T.prototype.constructor=T,T.D=function(I,E,A){for(var v=Array(arguments.length-2),S=2;S<arguments.length;S++)v[S-2]=arguments[S];return _.prototype[E].apply(I,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,_,w){w||(w=0);const I=Array(16);if(typeof _=="string")for(var E=0;E<16;++E)I[E]=_.charCodeAt(w++)|_.charCodeAt(w++)<<8|_.charCodeAt(w++)<<16|_.charCodeAt(w++)<<24;else for(E=0;E<16;++E)I[E]=_[w++]|_[w++]<<8|_[w++]<<16|_[w++]<<24;_=T.g[0],w=T.g[1],E=T.g[2];let A=T.g[3],v;v=_+(A^w&(E^A))+I[0]+3614090360&4294967295,_=w+(v<<7&4294967295|v>>>25),v=A+(E^_&(w^E))+I[1]+3905402710&4294967295,A=_+(v<<12&4294967295|v>>>20),v=E+(w^A&(_^w))+I[2]+606105819&4294967295,E=A+(v<<17&4294967295|v>>>15),v=w+(_^E&(A^_))+I[3]+3250441966&4294967295,w=E+(v<<22&4294967295|v>>>10),v=_+(A^w&(E^A))+I[4]+4118548399&4294967295,_=w+(v<<7&4294967295|v>>>25),v=A+(E^_&(w^E))+I[5]+1200080426&4294967295,A=_+(v<<12&4294967295|v>>>20),v=E+(w^A&(_^w))+I[6]+2821735955&4294967295,E=A+(v<<17&4294967295|v>>>15),v=w+(_^E&(A^_))+I[7]+4249261313&4294967295,w=E+(v<<22&4294967295|v>>>10),v=_+(A^w&(E^A))+I[8]+1770035416&4294967295,_=w+(v<<7&4294967295|v>>>25),v=A+(E^_&(w^E))+I[9]+2336552879&4294967295,A=_+(v<<12&4294967295|v>>>20),v=E+(w^A&(_^w))+I[10]+4294925233&4294967295,E=A+(v<<17&4294967295|v>>>15),v=w+(_^E&(A^_))+I[11]+2304563134&4294967295,w=E+(v<<22&4294967295|v>>>10),v=_+(A^w&(E^A))+I[12]+1804603682&4294967295,_=w+(v<<7&4294967295|v>>>25),v=A+(E^_&(w^E))+I[13]+4254626195&4294967295,A=_+(v<<12&4294967295|v>>>20),v=E+(w^A&(_^w))+I[14]+2792965006&4294967295,E=A+(v<<17&4294967295|v>>>15),v=w+(_^E&(A^_))+I[15]+1236535329&4294967295,w=E+(v<<22&4294967295|v>>>10),v=_+(E^A&(w^E))+I[1]+4129170786&4294967295,_=w+(v<<5&4294967295|v>>>27),v=A+(w^E&(_^w))+I[6]+3225465664&4294967295,A=_+(v<<9&4294967295|v>>>23),v=E+(_^w&(A^_))+I[11]+643717713&4294967295,E=A+(v<<14&4294967295|v>>>18),v=w+(A^_&(E^A))+I[0]+3921069994&4294967295,w=E+(v<<20&4294967295|v>>>12),v=_+(E^A&(w^E))+I[5]+3593408605&4294967295,_=w+(v<<5&4294967295|v>>>27),v=A+(w^E&(_^w))+I[10]+38016083&4294967295,A=_+(v<<9&4294967295|v>>>23),v=E+(_^w&(A^_))+I[15]+3634488961&4294967295,E=A+(v<<14&4294967295|v>>>18),v=w+(A^_&(E^A))+I[4]+3889429448&4294967295,w=E+(v<<20&4294967295|v>>>12),v=_+(E^A&(w^E))+I[9]+568446438&4294967295,_=w+(v<<5&4294967295|v>>>27),v=A+(w^E&(_^w))+I[14]+3275163606&4294967295,A=_+(v<<9&4294967295|v>>>23),v=E+(_^w&(A^_))+I[3]+4107603335&4294967295,E=A+(v<<14&4294967295|v>>>18),v=w+(A^_&(E^A))+I[8]+1163531501&4294967295,w=E+(v<<20&4294967295|v>>>12),v=_+(E^A&(w^E))+I[13]+2850285829&4294967295,_=w+(v<<5&4294967295|v>>>27),v=A+(w^E&(_^w))+I[2]+4243563512&4294967295,A=_+(v<<9&4294967295|v>>>23),v=E+(_^w&(A^_))+I[7]+1735328473&4294967295,E=A+(v<<14&4294967295|v>>>18),v=w+(A^_&(E^A))+I[12]+2368359562&4294967295,w=E+(v<<20&4294967295|v>>>12),v=_+(w^E^A)+I[5]+4294588738&4294967295,_=w+(v<<4&4294967295|v>>>28),v=A+(_^w^E)+I[8]+2272392833&4294967295,A=_+(v<<11&4294967295|v>>>21),v=E+(A^_^w)+I[11]+1839030562&4294967295,E=A+(v<<16&4294967295|v>>>16),v=w+(E^A^_)+I[14]+4259657740&4294967295,w=E+(v<<23&4294967295|v>>>9),v=_+(w^E^A)+I[1]+2763975236&4294967295,_=w+(v<<4&4294967295|v>>>28),v=A+(_^w^E)+I[4]+1272893353&4294967295,A=_+(v<<11&4294967295|v>>>21),v=E+(A^_^w)+I[7]+4139469664&4294967295,E=A+(v<<16&4294967295|v>>>16),v=w+(E^A^_)+I[10]+3200236656&4294967295,w=E+(v<<23&4294967295|v>>>9),v=_+(w^E^A)+I[13]+681279174&4294967295,_=w+(v<<4&4294967295|v>>>28),v=A+(_^w^E)+I[0]+3936430074&4294967295,A=_+(v<<11&4294967295|v>>>21),v=E+(A^_^w)+I[3]+3572445317&4294967295,E=A+(v<<16&4294967295|v>>>16),v=w+(E^A^_)+I[6]+76029189&4294967295,w=E+(v<<23&4294967295|v>>>9),v=_+(w^E^A)+I[9]+3654602809&4294967295,_=w+(v<<4&4294967295|v>>>28),v=A+(_^w^E)+I[12]+3873151461&4294967295,A=_+(v<<11&4294967295|v>>>21),v=E+(A^_^w)+I[15]+530742520&4294967295,E=A+(v<<16&4294967295|v>>>16),v=w+(E^A^_)+I[2]+3299628645&4294967295,w=E+(v<<23&4294967295|v>>>9),v=_+(E^(w|~A))+I[0]+4096336452&4294967295,_=w+(v<<6&4294967295|v>>>26),v=A+(w^(_|~E))+I[7]+1126891415&4294967295,A=_+(v<<10&4294967295|v>>>22),v=E+(_^(A|~w))+I[14]+2878612391&4294967295,E=A+(v<<15&4294967295|v>>>17),v=w+(A^(E|~_))+I[5]+4237533241&4294967295,w=E+(v<<21&4294967295|v>>>11),v=_+(E^(w|~A))+I[12]+1700485571&4294967295,_=w+(v<<6&4294967295|v>>>26),v=A+(w^(_|~E))+I[3]+2399980690&4294967295,A=_+(v<<10&4294967295|v>>>22),v=E+(_^(A|~w))+I[10]+4293915773&4294967295,E=A+(v<<15&4294967295|v>>>17),v=w+(A^(E|~_))+I[1]+2240044497&4294967295,w=E+(v<<21&4294967295|v>>>11),v=_+(E^(w|~A))+I[8]+1873313359&4294967295,_=w+(v<<6&4294967295|v>>>26),v=A+(w^(_|~E))+I[15]+4264355552&4294967295,A=_+(v<<10&4294967295|v>>>22),v=E+(_^(A|~w))+I[6]+2734768916&4294967295,E=A+(v<<15&4294967295|v>>>17),v=w+(A^(E|~_))+I[13]+1309151649&4294967295,w=E+(v<<21&4294967295|v>>>11),v=_+(E^(w|~A))+I[4]+4149444226&4294967295,_=w+(v<<6&4294967295|v>>>26),v=A+(w^(_|~E))+I[11]+3174756917&4294967295,A=_+(v<<10&4294967295|v>>>22),v=E+(_^(A|~w))+I[2]+718787259&4294967295,E=A+(v<<15&4294967295|v>>>17),v=w+(A^(E|~_))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(E+(v<<21&4294967295|v>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+A&4294967295}r.prototype.v=function(T,_){_===void 0&&(_=T.length);const w=_-this.blockSize,I=this.C;let E=this.h,A=0;for(;A<_;){if(E==0)for(;A<=w;)i(this,T,A),A+=this.blockSize;if(typeof T=="string"){for(;A<_;)if(I[E++]=T.charCodeAt(A++),E==this.blockSize){i(this,I),E=0;break}}else for(;A<_;)if(I[E++]=T[A++],E==this.blockSize){i(this,I),E=0;break}}this.h=E,this.o+=_},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;_=this.o*8;for(var w=T.length-8;w<T.length;++w)T[w]=_&255,_/=256;for(this.v(T),T=Array(16),_=0,w=0;w<4;++w)for(let I=0;I<32;I+=8)T[_++]=this.g[w]>>>I&255;return T};function s(T,_){var w=c;return Object.prototype.hasOwnProperty.call(w,T)?w[T]:w[T]=_(T)}function o(T,_){this.h=_;const w=[];let I=!0;for(let E=T.length-1;E>=0;E--){const A=T[E]|0;I&&A==_||(w[E]=A,I=!1)}this.g=w}var c={};function u(T){return-128<=T&&T<128?s(T,function(_){return new o([_|0],_<0?-1:0)}):new o([T|0],T<0?-1:0)}function l(T){if(isNaN(T)||!isFinite(T))return p;if(T<0)return x(l(-T));const _=[];let w=1;for(let I=0;T>=w;I++)_[I]=T/w|0,w*=4294967296;return new o(_,0)}function f(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return x(f(T.substring(1),_));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=l(Math.pow(_,8));let I=p;for(let A=0;A<T.length;A+=8){var E=Math.min(8,T.length-A);const v=parseInt(T.substring(A,A+E),_);E<8?(E=l(Math.pow(_,E)),I=I.j(E).add(l(v))):(I=I.j(w),I=I.add(l(v)))}return I}var p=u(0),m=u(1),y=u(16777216);n=o.prototype,n.m=function(){if(D(this))return-x(this).m();let T=0,_=1;for(let w=0;w<this.g.length;w++){const I=this.i(w);T+=(I>=0?I:4294967296+I)*_,_*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(D(this))return"-"+x(this).toString(T);const _=l(Math.pow(T,6));var w=this;let I="";for(;;){const E=W(w,_).g;w=M(w,E.j(_));let A=((w.g.length>0?w.g[0]:w.h)>>>0).toString(T);if(w=E,C(w))return A+I;for(;A.length<6;)A="0"+A;I=A+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(let _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function D(T){return T.h==-1}n.l=function(T){return T=M(this,T),D(T)?-1:C(T)?0:1};function x(T){const _=T.g.length,w=[];for(let I=0;I<_;I++)w[I]=~T.g[I];return new o(w,~T.h).add(m)}n.abs=function(){return D(this)?x(this):this},n.add=function(T){const _=Math.max(this.g.length,T.g.length),w=[];let I=0;for(let E=0;E<=_;E++){let A=I+(this.i(E)&65535)+(T.i(E)&65535),v=(A>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=v>>>16,A&=65535,v&=65535,w[E]=v<<16|A}return new o(w,w[w.length-1]&-2147483648?-1:0)};function M(T,_){return T.add(x(_))}n.j=function(T){if(C(this)||C(T))return p;if(D(this))return D(T)?x(this).j(x(T)):x(x(this).j(T));if(D(T))return x(this.j(x(T)));if(this.l(y)<0&&T.l(y)<0)return l(this.m()*T.m());const _=this.g.length+T.g.length,w=[];for(var I=0;I<2*_;I++)w[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<T.g.length;E++){const A=this.i(I)>>>16,v=this.i(I)&65535,S=T.i(E)>>>16,z=T.i(E)&65535;w[2*I+2*E]+=v*z,F(w,2*I+2*E),w[2*I+2*E+1]+=A*z,F(w,2*I+2*E+1),w[2*I+2*E+1]+=v*S,F(w,2*I+2*E+1),w[2*I+2*E+2]+=A*S,F(w,2*I+2*E+2)}for(T=0;T<_;T++)w[T]=w[2*T+1]<<16|w[2*T];for(T=_;T<2*_;T++)w[T]=0;return new o(w,0)};function F(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function q(T,_){this.g=T,this.h=_}function W(T,_){if(C(_))throw Error("division by zero");if(C(T))return new q(p,p);if(D(T))return _=W(x(T),_),new q(x(_.g),x(_.h));if(D(_))return _=W(T,x(_)),new q(x(_.g),_.h);if(T.g.length>30){if(D(T)||D(_))throw Error("slowDivide_ only works with positive integers.");for(var w=m,I=_;I.l(T)<=0;)w=te(w),I=te(I);var E=O(w,1),A=O(I,1);for(I=O(I,2),w=O(w,2);!C(I);){var v=A.add(I);v.l(T)<=0&&(E=E.add(w),A=v),I=O(I,1),w=O(w,1)}return _=M(T,E.j(_)),new q(E,_)}for(E=p;T.l(_)>=0;){for(w=Math.max(1,Math.floor(T.m()/_.m())),I=Math.ceil(Math.log(w)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),A=l(w),v=A.j(_);D(v)||v.l(T)>0;)w-=I,A=l(w),v=A.j(_);C(A)&&(A=m),E=E.add(A),T=M(T,v)}return new q(E,T)}n.B=function(T){return W(this,T).h},n.and=function(T){const _=Math.max(this.g.length,T.g.length),w=[];for(let I=0;I<_;I++)w[I]=this.i(I)&T.i(I);return new o(w,this.h&T.h)},n.or=function(T){const _=Math.max(this.g.length,T.g.length),w=[];for(let I=0;I<_;I++)w[I]=this.i(I)|T.i(I);return new o(w,this.h|T.h)},n.xor=function(T){const _=Math.max(this.g.length,T.g.length),w=[];for(let I=0;I<_;I++)w[I]=this.i(I)^T.i(I);return new o(w,this.h^T.h)};function te(T){const _=T.g.length+1,w=[];for(let I=0;I<_;I++)w[I]=T.i(I)<<1|T.i(I-1)>>>31;return new o(w,T.h)}function O(T,_){const w=_>>5;_%=32;const I=T.g.length-w,E=[];for(let A=0;A<I;A++)E[A]=_>0?T.i(A+w)>>>_|T.i(A+w+1)<<32-_:T.i(A+w);return new o(E,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,cm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=f,un=o}).apply(typeof Nh<"u"?Nh:typeof self<"u"?self:typeof window<"u"?window:{});var ds=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var um,ci,lm,Cs,Ya,hm,fm,dm;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ds=="object"&&ds];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(a,h){if(h)e:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var b=a[g];if(!(b in d))break e;d=d[b]}a=a[a.length-1],g=d[a],h=h(g),h!=g&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}i("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(a){return a||function(h){var d=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&d.push([g,h[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,d){return a.call.apply(a.bind,arguments)}function l(a,h,d){return l=u,l.apply(null,arguments)}function f(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function p(a,h){function d(){}d.prototype=h.prototype,a.Z=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(g,b,R){for(var L=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)L[Z-2]=arguments[Z];return h.prototype[b].apply(g,L)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function y(a){const h=a.length;if(h>0){const d=Array(h);for(let g=0;g<h;g++)d[g]=a[g];return d}return[]}function C(a,h){for(let g=1;g<arguments.length;g++){const b=arguments[g];var d=typeof b;if(d=d!="object"?d:b?Array.isArray(b)?"array":d:"null",d=="array"||d=="object"&&typeof b.length=="number"){d=a.length||0;const R=b.length||0;a.length=d+R;for(let L=0;L<R;L++)a[d+L]=b[L]}else a.push(b)}}class D{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function x(a){o.setTimeout(()=>{throw a},0)}function M(){var a=T;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class F{constructor(){this.h=this.g=null}add(h,d){const g=q.get();g.set(h,d),this.h?this.h.next=g:this.g=g,this.h=g}}var q=new D(()=>new W,a=>a.reset());class W{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let te,O=!1,T=new F,_=()=>{const a=Promise.resolve(void 0);te=()=>{a.then(w)}};function w(){for(var a;a=M();){try{a.h.call(a.g)}catch(d){x(d)}var h=q;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}O=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,h),o.removeEventListener("test",d,h)}catch{}return a}();function v(a){return/^[\s\xa0]*$/.test(a)}function S(a,h){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(S,E),S.prototype.init=function(a,h){const d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&S.Z.h.call(this)},S.prototype.h=function(){S.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var z="closure_listenable_"+(Math.random()*1e6|0),V=0;function H(a,h,d,g,b){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!g,this.ha=b,this.key=++V,this.da=this.fa=!1}function K(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function J(a,h,d){for(const g in a)h.call(d,a[g],g,a)}function ee(a,h){for(const d in a)h.call(void 0,a[d],d,a)}function ue(a){const h={};for(const d in a)h[d]=a[d];return h}const de="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function je(a,h){let d,g;for(let b=1;b<arguments.length;b++){g=arguments[b];for(d in g)a[d]=g[d];for(let R=0;R<de.length;R++)d=de[R],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function _e(a){this.src=a,this.g={},this.h=0}_e.prototype.add=function(a,h,d,g,b){const R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);const L=We(a,h,g,b);return L>-1?(h=a[L],d||(h.fa=!1)):(h=new H(h,this.src,R,!!g,b),h.fa=d,a.push(h)),h};function Me(a,h){const d=h.type;if(d in a.g){var g=a.g[d],b=Array.prototype.indexOf.call(g,h,void 0),R;(R=b>=0)&&Array.prototype.splice.call(g,b,1),R&&(K(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function We(a,h,d,g){for(let b=0;b<a.length;++b){const R=a[b];if(!R.da&&R.listener==h&&R.capture==!!d&&R.ha==g)return b}return-1}var Ne="closure_lm_"+(Math.random()*1e6|0),Ge={};function B(a,h,d,g,b){if(Array.isArray(h)){for(let R=0;R<h.length;R++)B(a,h[R],d,g,b);return null}return d=Or(d),a&&a[z]?a.J(h,d,c(g)?!!g.capture:!1,b):ne(a,h,d,!1,g,b)}function ne(a,h,d,g,b,R){if(!h)throw Error("Invalid event type");const L=c(b)?!!b.capture:!!b;let Z=Ve(a);if(Z||(a[Ne]=Z=new _e(a)),d=Z.add(h,d,g,L,R),d.proxy)return d;if(g=oe(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)A||(b=L),b===void 0&&(b=!1),a.addEventListener(h.toString(),g,b);else if(a.attachEvent)a.attachEvent(he(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function oe(){function a(d){return h.call(a.src,a.listener,d)}const h=Ke;return a}function N(a,h,d,g,b){if(Array.isArray(h))for(var R=0;R<h.length;R++)N(a,h[R],d,g,b);else g=c(g)?!!g.capture:!!g,d=Or(d),a&&a[z]?(a=a.i,R=String(h).toString(),R in a.g&&(h=a.g[R],d=We(h,d,g,b),d>-1&&(K(h[d]),Array.prototype.splice.call(h,d,1),h.length==0&&(delete a.g[R],a.h--)))):a&&(a=Ve(a))&&(h=a.g[h.toString()],a=-1,h&&(a=We(h,d,g,b)),(d=a>-1?h[a]:null)&&Ce(d))}function Ce(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[z])Me(h.i,a);else{var d=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(d,g,a.capture):h.detachEvent?h.detachEvent(he(d),g):h.addListener&&h.removeListener&&h.removeListener(g),(d=Ve(h))?(Me(d,a),d.h==0&&(d.src=null,h[Ne]=null)):K(a)}}}function he(a){return a in Ge?Ge[a]:Ge[a]="on"+a}function Ke(a,h){if(a.da)a=!0;else{h=new S(h,this);const d=a.listener,g=a.ha||a.src;a.fa&&Ce(a),a=d.call(g,h)}return a}function Ve(a){return a=a[Ne],a instanceof _e?a:null}var at="__closure_events_fn_"+(Math.random()*1e9>>>0);function Or(a){return typeof a=="function"?a:(a[at]||(a[at]=function(h){return a.handleEvent(h)}),a[at])}function Ue(){I.call(this),this.i=new _e(this),this.M=this,this.G=null}p(Ue,I),Ue.prototype[z]=!0,Ue.prototype.removeEventListener=function(a,h,d,g){N(this,a,h,d,g)};function Ye(a,h){var d,g=a.G;if(g)for(d=[];g;g=g.G)d.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new E(h,a);else if(h instanceof E)h.target=h.target||a;else{var b=h;h=new E(g,a),je(h,b)}b=!0;let R,L;if(d)for(L=d.length-1;L>=0;L--)R=h.g=d[L],b=Qi(R,g,!0,h)&&b;if(R=h.g=a,b=Qi(R,g,!0,h)&&b,b=Qi(R,g,!1,h)&&b,d)for(L=0;L<d.length;L++)R=h.g=d[L],b=Qi(R,g,!1,h)&&b}Ue.prototype.N=function(){if(Ue.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const d=a.g[h];for(let g=0;g<d.length;g++)K(d[g]);delete a.g[h],a.h--}}this.G=null},Ue.prototype.J=function(a,h,d,g){return this.i.add(String(a),h,!1,d,g)},Ue.prototype.K=function(a,h,d,g){return this.i.add(String(a),h,!0,d,g)};function Qi(a,h,d,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let b=!0;for(let R=0;R<h.length;++R){const L=h[R];if(L&&!L.da&&L.capture==d){const Z=L.listener,be=L.ha||L.src;L.fa&&Me(a.i,L),b=Z.call(be,g)!==!1&&b}}return b&&!g.defaultPrevented}function qp(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=l(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function ku(a){a.g=qp(()=>{a.g=null,a.i&&(a.i=!1,ku(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Hp extends I{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:ku(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Fr(a){I.call(this),this.h=a,this.g={}}p(Fr,I);var Du=[];function xu(a){J(a.g,function(h,d){this.g.hasOwnProperty(d)&&Ce(h)},a),a.g={}}Fr.prototype.N=function(){Fr.Z.N.call(this),xu(this)},Fr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var $o=o.JSON.stringify,jp=o.JSON.parse,Wp=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Mu(){}function Nu(){}var Ur={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function zo(){E.call(this,"d")}p(zo,E);function qo(){E.call(this,"c")}p(qo,E);var wn={},Vu=null;function Xi(){return Vu=Vu||new Ue}wn.Ia="serverreachability";function Lu(a){E.call(this,wn.Ia,a)}p(Lu,E);function Br(a){const h=Xi();Ye(h,new Lu(h))}wn.STAT_EVENT="statevent";function Ou(a,h){E.call(this,wn.STAT_EVENT,a),this.stat=h}p(Ou,E);function Qe(a){const h=Xi();Ye(h,new Ou(h,a))}wn.Ja="timingevent";function Fu(a,h){E.call(this,wn.Ja,a),this.size=h}p(Fu,E);function $r(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function zr(){this.g=!0}zr.prototype.ua=function(){this.g=!1};function Gp(a,h,d,g,b,R){a.info(function(){if(a.g)if(R){var L="",Z=R.split("&");for(let fe=0;fe<Z.length;fe++){var be=Z[fe].split("=");if(be.length>1){const Pe=be[0];be=be[1];const vt=Pe.split("_");L=vt.length>=2&&vt[1]=="type"?L+(Pe+"="+be+"&"):L+(Pe+"=redacted&")}}}else L=null;else L=R;return"XMLHTTP REQ ("+g+") [attempt "+b+"]: "+h+`
`+d+`
`+L})}function Kp(a,h,d,g,b,R,L){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+b+"]: "+h+`
`+d+`
`+R+" "+L})}function er(a,h,d,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Qp(a,d)+(g?" "+g:"")})}function Yp(a,h){a.info(function(){return"TIMEOUT: "+h})}zr.prototype.info=function(){};function Qp(a,h){if(!a.g)return h;if(!h)return null;try{const R=JSON.parse(h);if(R){for(a=0;a<R.length;a++)if(Array.isArray(R[a])){var d=R[a];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var b=g[0];if(b!="noop"&&b!="stop"&&b!="close")for(let L=1;L<g.length;L++)g[L]=""}}}}return $o(R)}catch{return h}}var Ji={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Uu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Bu;function Ho(){}p(Ho,Mu),Ho.prototype.g=function(){return new XMLHttpRequest},Bu=new Ho;function qr(a){return encodeURIComponent(String(a))}function Xp(a){var h=1;a=a.split(":");const d=[];for(;h>0&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function Gt(a,h,d,g){this.j=a,this.i=h,this.l=d,this.S=g||1,this.V=new Fr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new $u}function $u(){this.i=null,this.g="",this.h=!1}var zu={},jo={};function Wo(a,h,d){a.M=1,a.A=es(yt(h)),a.u=d,a.R=!0,qu(a,null)}function qu(a,h){a.F=Date.now(),Zi(a),a.B=yt(a.A);var d=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),nl(d.i,"t",g),a.C=0,d=a.j.L,a.h=new $u,a.g=wl(a.j,d?h:null,!a.u),a.P>0&&(a.O=new Hp(l(a.Y,a,a.g),a.P)),h=a.V,d=a.g,g=a.ba;var b="readystatechange";Array.isArray(b)||(b&&(Du[0]=b.toString()),b=Du);for(let R=0;R<b.length;R++){const L=B(d,b[R],g||h.handleEvent,!1,h.h||h);if(!L)break;h.g[L.key]=L}h=a.J?ue(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Br(),Gp(a.i,a.v,a.B,a.l,a.S,a.u)}Gt.prototype.ba=function(a){a=a.target;const h=this.O;h&&Qt(a)==3?h.j():this.Y(a)},Gt.prototype.Y=function(a){try{if(a==this.g)e:{const Z=Qt(this.g),be=this.g.ya(),fe=this.g.ca();if(!(Z<3)&&(Z!=3||this.g&&(this.h.h||this.g.la()||ul(this.g)))){this.K||Z!=4||be==7||(be==8||fe<=0?Br(3):Br(2)),Go(this);var h=this.g.ca();this.X=h;var d=Jp(this);if(this.o=h==200,Kp(this.i,this.v,this.B,this.l,this.S,Z,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,b=this.g;if((g=b.g?b.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(g)){var R=g;break t}}R=null}if(a=R)er(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ko(this,a);else{this.o=!1,this.m=3,Qe(12),Tn(this),Hr(this);break e}}if(this.R){a=!0;let Pe;for(;!this.K&&this.C<d.length;)if(Pe=Zp(this,d),Pe==jo){Z==4&&(this.m=4,Qe(14),a=!1),er(this.i,this.l,null,"[Incomplete Response]");break}else if(Pe==zu){this.m=4,Qe(15),er(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else er(this.i,this.l,Pe,null),Ko(this,Pe);if(Hu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Z!=4||d.length!=0||this.h.h||(this.m=1,Qe(16),a=!1),this.o=this.o&&a,!a)er(this.i,this.l,d,"[Invalid Chunked Response]"),Tn(this),Hr(this);else if(d.length>0&&!this.W){this.W=!0;var L=this.j;L.g==this&&L.aa&&!L.P&&(L.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),na(L),L.P=!0,Qe(11))}}else er(this.i,this.l,d,null),Ko(this,d);Z==4&&Tn(this),this.o&&!this.K&&(Z==4?gl(this.j,this):(this.o=!1,Zi(this)))}else dg(this.g),h==400&&d.indexOf("Unknown SID")>0?(this.m=3,Qe(12)):(this.m=0,Qe(13)),Tn(this),Hr(this)}}}catch{}finally{}};function Jp(a){if(!Hu(a))return a.g.la();const h=ul(a.g);if(h==="")return"";let d="";const g=h.length,b=Qt(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Tn(a),Hr(a),"";a.h.i=new o.TextDecoder}for(let R=0;R<g;R++)a.h.h=!0,d+=a.h.i.decode(h[R],{stream:!(b&&R==g-1)});return h.length=0,a.h.g+=d,a.C=0,a.h.g}function Hu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Zp(a,h){var d=a.C,g=h.indexOf(`
`,d);return g==-1?jo:(d=Number(h.substring(d,g)),isNaN(d)?zu:(g+=1,g+d>h.length?jo:(h=h.slice(g,g+d),a.C=g+d,h)))}Gt.prototype.cancel=function(){this.K=!0,Tn(this)};function Zi(a){a.T=Date.now()+a.H,ju(a,a.H)}function ju(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=$r(l(a.aa,a),h)}function Go(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Gt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Yp(this.i,this.B),this.M!=2&&(Br(),Qe(17)),Tn(this),this.m=2,Hr(this)):ju(this,this.T-a)};function Hr(a){a.j.I==0||a.K||gl(a.j,a)}function Tn(a){Go(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,xu(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function Ko(a,h){try{var d=a.j;if(d.I!=0&&(d.g==a||Yo(d.h,a))){if(!a.L&&Yo(d.h,a)&&d.I==3){try{var g=d.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var b=g;if(b[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)ss(d),rs(d);else break e;ta(d),Qe(18)}}else d.xa=b[1],0<d.xa-d.K&&b[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=$r(l(d.Va,d),6e3));Ku(d.h)<=1&&d.ta&&(d.ta=void 0)}else In(d,11)}else if((a.L||d.g==a)&&ss(d),!v(h))for(b=d.Ba.g.parse(h),h=0;h<b.length;h++){let fe=b[h];const Pe=fe[0];if(!(Pe<=d.K))if(d.K=Pe,fe=fe[1],d.I==2)if(fe[0]=="c"){d.M=fe[1],d.ba=fe[2];const vt=fe[3];vt!=null&&(d.ka=vt,d.j.info("VER="+d.ka));const An=fe[4];An!=null&&(d.za=An,d.j.info("SVER="+d.za));const Xt=fe[5];Xt!=null&&typeof Xt=="number"&&Xt>0&&(g=1.5*Xt,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Jt=a.g;if(Jt){const as=Jt.g?Jt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(as){var R=g.h;R.g||as.indexOf("spdy")==-1&&as.indexOf("quic")==-1&&as.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Qo(R,R.h),R.h=null))}if(g.G){const ra=Jt.g?Jt.g.getResponseHeader("X-HTTP-Session-Id"):null;ra&&(g.wa=ra,pe(g.J,g.G,ra))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var L=a;if(g.na=vl(g,g.L?g.ba:null,g.W),L.L){Yu(g.h,L);var Z=L,be=g.O;be&&(Z.H=be),Z.D&&(Go(Z),Zi(Z)),g.g=L}else ml(g);d.i.length>0&&is(d)}else fe[0]!="stop"&&fe[0]!="close"||In(d,7);else d.I==3&&(fe[0]=="stop"||fe[0]=="close"?fe[0]=="stop"?In(d,7):ea(d):fe[0]!="noop"&&d.l&&d.l.qa(fe),d.A=0)}}Br(4)}catch{}}var eg=class{constructor(a,h){this.g=a,this.map=h}};function Wu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Gu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Ku(a){return a.h?1:a.g?a.g.size:0}function Yo(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Qo(a,h){a.g?a.g.add(h):a.h=h}function Yu(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Wu.prototype.cancel=function(){if(this.i=Qu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Qu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const d of a.g.values())h=h.concat(d.G);return h}return y(a.i)}var Xu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tg(a,h){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const g=a[d].indexOf("=");let b,R=null;g>=0?(b=a[d].substring(0,g),R=a[d].substring(g+1)):b=a[d],h(b,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Kt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof Kt?(this.l=a.l,jr(this,a.j),this.o=a.o,this.g=a.g,Wr(this,a.u),this.h=a.h,Xo(this,rl(a.i)),this.m=a.m):a&&(h=String(a).match(Xu))?(this.l=!1,jr(this,h[1]||"",!0),this.o=Gr(h[2]||""),this.g=Gr(h[3]||"",!0),Wr(this,h[4]),this.h=Gr(h[5]||"",!0),Xo(this,h[6]||"",!0),this.m=Gr(h[7]||"")):(this.l=!1,this.i=new Yr(null,this.l))}Kt.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Kr(h,Ju,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Kr(h,Ju,!0),"@"),a.push(qr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Kr(d,d.charAt(0)=="/"?ig:rg,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Kr(d,og)),a.join("")},Kt.prototype.resolve=function(a){const h=yt(this);let d=!!a.j;d?jr(h,a.j):d=!!a.o,d?h.o=a.o:d=!!a.g,d?h.g=a.g:d=a.u!=null;var g=a.h;if(d)Wr(h,a.u);else if(d=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var b=h.h.lastIndexOf("/");b!=-1&&(g=h.h.slice(0,b+1)+g)}if(b=g,b==".."||b==".")g="";else if(b.indexOf("./")!=-1||b.indexOf("/.")!=-1){g=b.lastIndexOf("/",0)==0,b=b.split("/");const R=[];for(let L=0;L<b.length;){const Z=b[L++];Z=="."?g&&L==b.length&&R.push(""):Z==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),g&&L==b.length&&R.push("")):(R.push(Z),g=!0)}g=R.join("/")}else g=b}return d?h.h=g:d=a.i.toString()!=="",d?Xo(h,rl(a.i)):d=!!a.m,d&&(h.m=a.m),h};function yt(a){return new Kt(a)}function jr(a,h,d){a.j=d?Gr(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Wr(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Xo(a,h,d){h instanceof Yr?(a.i=h,ag(a.i,a.l)):(d||(h=Kr(h,sg)),a.i=new Yr(h,a.l))}function pe(a,h,d){a.i.set(h,d)}function es(a){return pe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Gr(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Kr(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,ng),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function ng(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Ju=/[#\/\?@]/g,rg=/[#\?:]/g,ig=/[#\?]/g,sg=/[#\?@]/g,og=/#/g;function Yr(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function En(a){a.g||(a.g=new Map,a.h=0,a.i&&tg(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}n=Yr.prototype,n.add=function(a,h){En(this),this.i=null,a=tr(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function Zu(a,h){En(a),h=tr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function el(a,h){return En(a),h=tr(a,h),a.g.has(h)}n.forEach=function(a,h){En(this),this.g.forEach(function(d,g){d.forEach(function(b){a.call(h,b,g,this)},this)},this)};function tl(a,h){En(a);let d=[];if(typeof h=="string")el(a,h)&&(d=d.concat(a.g.get(tr(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)d=d.concat(a[h]);return d}n.set=function(a,h){return En(this),this.i=null,a=tr(this,a),el(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=tl(this,a),a.length>0?String(a[0]):h):h};function nl(a,h,d){Zu(a,h),d.length>0&&(a.i=null,a.g.set(tr(a,h),y(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var d=h[g];const b=qr(d);d=tl(this,d);for(let R=0;R<d.length;R++){let L=b;d[R]!==""&&(L+="="+qr(d[R])),a.push(L)}}return this.i=a.join("&")};function rl(a){const h=new Yr;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function tr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function ag(a,h){h&&!a.j&&(En(a),a.i=null,a.g.forEach(function(d,g){const b=g.toLowerCase();g!=b&&(Zu(this,g),nl(this,b,d))},a)),a.j=h}function cg(a,h){const d=new zr;if(o.Image){const g=new Image;g.onload=f(Yt,d,"TestLoadImage: loaded",!0,h,g),g.onerror=f(Yt,d,"TestLoadImage: error",!1,h,g),g.onabort=f(Yt,d,"TestLoadImage: abort",!1,h,g),g.ontimeout=f(Yt,d,"TestLoadImage: timeout",!1,h,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function ug(a,h){const d=new zr,g=new AbortController,b=setTimeout(()=>{g.abort(),Yt(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(R=>{clearTimeout(b),R.ok?Yt(d,"TestPingServer: ok",!0,h):Yt(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(b),Yt(d,"TestPingServer: error",!1,h)})}function Yt(a,h,d,g,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),g(d)}catch{}}function lg(){this.g=new Wp}function Jo(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Jo,Mu),Jo.prototype.g=function(){return new ts(this.i,this.h)};function ts(a,h){Ue.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(ts,Ue),n=ts.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Xr(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Qr(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Xr(this)),this.g&&(this.readyState=3,Xr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;il(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function il(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Qr(this):Xr(this),this.readyState==3&&il(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,Qr(this))},n.Na=function(a){this.g&&(this.response=a,Qr(this))},n.ga=function(){this.g&&Qr(this)};function Qr(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Xr(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function Xr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ts.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function sl(a){let h="";return J(a,function(d,g){h+=g,h+=":",h+=d,h+=`\r
`}),h}function Zo(a,h,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=sl(d),typeof a=="string"?d!=null&&qr(d):pe(a,h,d))}function ve(a){Ue.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ve,Ue);var hg=/^https?$/i,fg=["POST","PUT"];n=ve.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Bu.g(),this.g.onreadystatechange=m(l(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(R){ol(this,R);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var b in g)d.set(b,g[b]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const R of g.keys())d.set(R,g.get(R));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),b=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(fg,h,void 0)>=0)||g||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,L]of d)this.g.setRequestHeader(R,L);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(R){ol(this,R)}};function ol(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,al(a),ns(a)}function al(a){a.A||(a.A=!0,Ye(a,"complete"),Ye(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Ye(this,"complete"),Ye(this,"abort"),ns(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ns(this,!0)),ve.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?cl(this):this.Xa())},n.Xa=function(){cl(this)};function cl(a){if(a.h&&typeof s<"u"){if(a.v&&Qt(a)==4)setTimeout(a.Ca.bind(a),0);else if(Ye(a,"readystatechange"),Qt(a)==4){a.h=!1;try{const R=a.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var g;if(g=R===0){let L=String(a.D).match(Xu)[1]||null;!L&&o.self&&o.self.location&&(L=o.self.location.protocol.slice(0,-1)),g=!hg.test(L?L.toLowerCase():"")}d=g}if(d)Ye(a,"complete"),Ye(a,"success");else{a.o=6;try{var b=Qt(a)>2?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.ca()+"]",al(a)}}finally{ns(a)}}}}function ns(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,h||Ye(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Qt(a){return a.g?a.g.readyState:0}n.ca=function(){try{return Qt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),jp(h)}};function ul(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function dg(a){const h={};a=(a.g&&Qt(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(v(a[g]))continue;var d=Xp(a[g]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=h[b]||[];h[b]=R,R.push(d)}ee(h,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Jr(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function ll(a){this.za=0,this.i=[],this.j=new zr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Jr("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Jr("baseRetryDelayMs",5e3,a),this.Za=Jr("retryDelaySeedMs",1e4,a),this.Ta=Jr("forwardChannelMaxRetries",2,a),this.va=Jr("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new Wu(a&&a.concurrentRequestLimit),this.Ba=new lg,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=ll.prototype,n.ka=8,n.I=1,n.connect=function(a,h,d,g){Qe(0),this.W=a,this.H=h||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=vl(this,null,this.W),is(this)};function ea(a){if(hl(a),a.I==3){var h=a.V++,d=yt(a.J);if(pe(d,"SID",a.M),pe(d,"RID",h),pe(d,"TYPE","terminate"),Zr(a,d),h=new Gt(a,a.j,h),h.M=2,h.A=es(yt(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=h.A,d=!0),d||(h.g=wl(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Zi(h)}yl(a)}function rs(a){a.g&&(na(a),a.g.cancel(),a.g=null)}function hl(a){rs(a),a.v&&(o.clearTimeout(a.v),a.v=null),ss(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function is(a){if(!Gu(a.h)&&!a.m){a.m=!0;var h=a.Ea;te||_(),O||(te(),O=!0),T.add(h,a),a.D=0}}function mg(a,h){return Ku(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=$r(l(a.Ea,a,h),_l(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const b=new Gt(this,this.j,a);let R=this.o;if(this.U&&(R?(R=ue(R),je(R,this.U)):R=this.U),this.u!==null||this.R||(b.J=R,R=null),this.S)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=dl(this,b,h),d=yt(this.J),pe(d,"RID",a),pe(d,"CVER",22),this.G&&pe(d,"X-HTTP-Session-Id",this.G),Zr(this,d),R&&(this.R?h="headers="+qr(sl(R))+"&"+h:this.u&&Zo(d,this.u,R)),Qo(this.h,b),this.Ra&&pe(d,"TYPE","init"),this.S?(pe(d,"$req",h),pe(d,"SID","null"),b.U=!0,Wo(b,d,null)):Wo(b,d,h),this.I=2}}else this.I==3&&(a?fl(this,a):this.i.length==0||Gu(this.h)||fl(this))};function fl(a,h){var d;h?d=h.l:d=a.V++;const g=yt(a.J);pe(g,"SID",a.M),pe(g,"RID",d),pe(g,"AID",a.K),Zr(a,g),a.u&&a.o&&Zo(g,a.u,a.o),d=new Gt(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),h&&(a.i=h.G.concat(a.i)),h=dl(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Qo(a.h,d),Wo(d,g,h)}function Zr(a,h){a.H&&J(a.H,function(d,g){pe(h,g,d)}),a.l&&J({},function(d,g){pe(h,g,d)})}function dl(a,h,d){d=Math.min(a.i.length,d);const g=a.l?l(a.l.Ka,a.l,a):null;e:{var b=a.i;let Z=-1;for(;;){const be=["count="+d];Z==-1?d>0?(Z=b[0].g,be.push("ofs="+Z)):Z=0:be.push("ofs="+Z);let fe=!0;for(let Pe=0;Pe<d;Pe++){var R=b[Pe].g;const vt=b[Pe].map;if(R-=Z,R<0)Z=Math.max(0,b[Pe].g-100),fe=!1;else try{R="req"+R+"_"||"";try{var L=vt instanceof Map?vt:Object.entries(vt);for(const[An,Xt]of L){let Jt=Xt;c(Xt)&&(Jt=$o(Xt)),be.push(R+An+"="+encodeURIComponent(Jt))}}catch(An){throw be.push(R+"type="+encodeURIComponent("_badmap")),An}}catch{g&&g(vt)}}if(fe){L=be.join("&");break e}}L=void 0}return a=a.i.splice(0,d),h.G=a,L}function ml(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;te||_(),O||(te(),O=!0),T.add(h,a),a.A=0}}function ta(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=$r(l(a.Da,a),_l(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,pl(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=$r(l(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Qe(10),rs(this),pl(this))};function na(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function pl(a){a.g=new Gt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=yt(a.na);pe(h,"RID","rpc"),pe(h,"SID",a.M),pe(h,"AID",a.K),pe(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&pe(h,"TO",a.ia),pe(h,"TYPE","xmlhttp"),Zr(a,h),a.u&&a.o&&Zo(h,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=es(yt(h)),d.u=null,d.R=!0,qu(d,a)}n.Va=function(){this.C!=null&&(this.C=null,rs(this),ta(this),Qe(19))};function ss(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function gl(a,h){var d=null;if(a.g==h){ss(a),na(a),a.g=null;var g=2}else if(Yo(a.h,h))d=h.G,Yu(a.h,h),g=1;else return;if(a.I!=0){if(h.o)if(g==1){d=h.u?h.u.length:0,h=Date.now()-h.F;var b=a.D;g=Xi(),Ye(g,new Fu(g,d)),is(a)}else ml(a);else if(b=h.m,b==3||b==0&&h.X>0||!(g==1&&mg(a,h)||g==2&&ta(a)))switch(d&&d.length>0&&(h=a.h,h.i=h.i.concat(d)),b){case 1:In(a,5);break;case 4:In(a,10);break;case 3:In(a,6);break;default:In(a,2)}}}function _l(a,h){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*h}function In(a,h){if(a.j.info("Error code "+h),h==2){var d=l(a.bb,a),g=a.Ua;const b=!g;g=new Kt(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||jr(g,"https"),es(g),b?cg(g.toString(),d):ug(g.toString(),d)}else Qe(2);a.I=0,a.l&&a.l.pa(h),yl(a),hl(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Qe(2)):(this.j.info("Failed to ping google.com"),Qe(1))};function yl(a){if(a.I=0,a.ja=[],a.l){const h=Qu(a.h);(h.length!=0||a.i.length!=0)&&(C(a.ja,h),C(a.ja,a.i),a.h.i.length=0,y(a.i),a.i.length=0),a.l.oa()}}function vl(a,h,d){var g=d instanceof Kt?yt(d):new Kt(d);if(g.g!="")h&&(g.g=h+"."+g.g),Wr(g,g.u);else{var b=o.location;g=b.protocol,h=h?h+"."+b.hostname:b.hostname,b=+b.port;const R=new Kt(null);g&&jr(R,g),h&&(R.g=h),b&&Wr(R,b),d&&(R.h=d),g=R}return d=a.G,h=a.wa,d&&h&&pe(g,d,h),pe(g,"VER",a.ka),Zr(a,g),g}function wl(a,h,d){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new ve(new Jo({ab:d})):new ve(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Tl(){}n=Tl.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function os(){}os.prototype.g=function(a,h){return new tt(a,h)};function tt(a,h){Ue.call(this),this.g=new ll(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!v(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!v(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new nr(this)}p(tt,Ue),tt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},tt.prototype.close=function(){ea(this.g)},tt.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=$o(a),a=d);h.i.push(new eg(h.Ya++,a)),h.I==3&&is(h)},tt.prototype.N=function(){this.g.l=null,delete this.j,ea(this.g),delete this.g,tt.Z.N.call(this)};function El(a){zo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(El,zo);function Il(){qo.call(this),this.status=1}p(Il,qo);function nr(a){this.g=a}p(nr,Tl),nr.prototype.ra=function(){Ye(this.g,"a")},nr.prototype.qa=function(a){Ye(this.g,new El(a))},nr.prototype.pa=function(a){Ye(this.g,new Il)},nr.prototype.oa=function(){Ye(this.g,"b")},os.prototype.createWebChannel=os.prototype.g,tt.prototype.send=tt.prototype.o,tt.prototype.open=tt.prototype.m,tt.prototype.close=tt.prototype.close,dm=function(){return new os},fm=function(){return Xi()},hm=wn,Ya={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ji.NO_ERROR=0,Ji.TIMEOUT=8,Ji.HTTP_ERROR=6,Cs=Ji,Uu.COMPLETE="complete",lm=Uu,Nu.EventType=Ur,Ur.OPEN="a",Ur.CLOSE="b",Ur.ERROR="c",Ur.MESSAGE="d",Ue.prototype.listen=Ue.prototype.J,ci=Nu,ve.prototype.listenOnce=ve.prototype.K,ve.prototype.getLastError=ve.prototype.Ha,ve.prototype.getLastErrorCode=ve.prototype.ya,ve.prototype.getStatus=ve.prototype.ca,ve.prototype.getResponseJson=ve.prototype.La,ve.prototype.getResponseText=ve.prototype.la,ve.prototype.send=ve.prototype.ea,ve.prototype.setWithCredentials=ve.prototype.Fa,um=ve}).apply(typeof ds<"u"?ds:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}$e.UNAUTHENTICATED=new $e(null),$e.GOOGLE_CREDENTIALS=new $e("google-credentials-uid"),$e.FIRST_PARTY=new $e("first-party-uid"),$e.MOCK_USER=new $e("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xr="12.8.0";function hb(n){xr=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn=new xc("@firebase/firestore");function ir(){return Gn.logLevel}function $(n,...e){if(Gn.logLevel<=re.DEBUG){const t=e.map(jc);Gn.debug(`Firestore (${xr}): ${n}`,...t)}}function qt(n,...e){if(Gn.logLevel<=re.ERROR){const t=e.map(jc);Gn.error(`Firestore (${xr}): ${n}`,...t)}}function Er(n,...e){if(Gn.logLevel<=re.WARN){const t=e.map(jc);Gn.warn(`Firestore (${xr}): ${n}`,...t)}}function jc(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,mm(n,r,t)}function mm(n,e,t){let r=`FIRESTORE (${xr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw qt(r),new Error(r)}function le(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||mm(e,i,r)}function X(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Wt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class fb{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t($e.UNAUTHENTICATED))}shutdown(){}}class db{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class mb{constructor(e){this.t=e,this.currentUser=$e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){le(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let s=new Ot;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Ot,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Ot)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(le(typeof r.accessToken=="string",31837,{l:r}),new pm(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return le(e===null||typeof e=="string",2055,{h:e}),new $e(e)}}class pb{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=$e.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class gb{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new pb(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t($e.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Vh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class _b{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,lt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){le(this.o===void 0,3512);const r=s=>{s.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,$("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Vh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(le(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Vh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yb(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=yb(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function ie(n,e){return n<e?-1:n>e?1:0}function Qa(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const i=n.charAt(r),s=e.charAt(r);if(i!==s)return Ta(i)===Ta(s)?ie(i,s):Ta(i)?1:-1}return ie(n.length,e.length)}const vb=55296,wb=57343;function Ta(n){const e=n.charCodeAt(0);return e>=vb&&e<=wb}function Ir(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh="__name__";class wt{constructor(e,t,r){t===void 0?t=0:t>e.length&&G(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&G(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return wt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof wt?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=wt.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return ie(e.length,t.length)}static compareSegments(e,t){const r=wt.isNumericId(e),i=wt.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?wt.extractNumericId(e).compare(wt.extractNumericId(t)):Qa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return un.fromString(e.substring(4,e.length-2))}}class me extends wt{construct(e,t,r){return new me(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(P.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new me(t)}static emptyPath(){return new me([])}}const Tb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Oe extends wt{construct(e,t,r){return new Oe(e,t,r)}static isValidIdentifier(e){return Tb.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Oe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Lh}static keyField(){return new Oe([Lh])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new U(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new U(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new U(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Oe(t)}static emptyPath(){return new Oe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.path=e}static fromPath(e){return new j(me.fromString(e))}static fromName(e){return new j(me.fromString(e).popFirst(5))}static empty(){return new j(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return me.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new j(new me(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gm(n,e,t){if(!t)throw new U(P.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Eb(n,e,t,r){if(e===!0&&r===!0)throw new U(P.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Oh(n){if(!j.isDocumentKey(n))throw new U(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Fh(n){if(j.isDocumentKey(n))throw new U(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function _m(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Eo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":G(12329,{type:typeof n})}function et(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Eo(n);throw new U(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(n,e){const t={typeString:n};return e&&(t.value=e),t}function zi(n,e){if(!_m(n))throw new U(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(i&&typeof o!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new U(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh=-62135596800,Bh=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Bh);return new ge(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Uh)throw new U(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Bh}_compareTo(e){return this.seconds===e.seconds?ie(this.nanoseconds,e.nanoseconds):ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(zi(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Uh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:Ae("string",ge._jsonSchemaVersion),seconds:Ae("number"),nanoseconds:Ae("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{static fromTimestamp(e){return new Q(e)}static min(){return new Q(new ge(0,0))}static max(){return new Q(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si=-1;function Ib(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=Q.fromTimestamp(r===1e9?new ge(t+1,0):new ge(t,r));return new hn(i,j.empty(),e)}function Ab(n){return new hn(n.readTime,n.key,Si)}class hn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new hn(Q.min(),j.empty(),Si)}static max(){return new hn(Q.max(),j.empty(),Si)}}function bb(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=j.comparator(n.documentKey,e.documentKey),t!==0?t:ie(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sb="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Rb{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mr(n){if(n.code!==P.FAILED_PRECONDITION||n.message!==Sb)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&G(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new k((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof k?t:k.resolve(t)}catch(t){return k.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):k.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):k.reject(t)}static resolve(e){return new k((t,r)=>{t(e)})}static reject(e){return new k((t,r)=>{r(e)})}static waitFor(e){return new k((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},u=>r(u))}),o=!0,s===i&&t()})}static or(e){let t=k.resolve(!1);for(const r of e)t=t.next(i=>i?k.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new k((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let u=0;u<s;u++){const l=u;t(e[l]).next(f=>{o[l]=f,++c,c===s&&r(o)},f=>i(f))}})}static doWhile(e,t){return new k((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function Cb(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Nr(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Io.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc=-1;function Ao(n){return n==null}function eo(n){return n===0&&1/n==-1/0}function Pb(n){return typeof n=="number"&&Number.isInteger(n)&&!eo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ym="";function kb(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=$h(e)),e=Db(n.get(t),e);return $h(e)}function Db(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case ym:t+="";break;default:t+=s}}return t}function $h(n){return n+ym+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function _n(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function vm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e,t){this.comparator=e,this.root=t||Le.EMPTY}insert(e,t){return new ye(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Le.BLACK,null,null))}remove(e){return new ye(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Le.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ms(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ms(this.root,e,this.comparator,!1)}getReverseIterator(){return new ms(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ms(this.root,e,this.comparator,!0)}}class ms{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Le{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Le.RED,this.left=i??Le.EMPTY,this.right=s??Le.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Le(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Le.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Le.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Le.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Le.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw G(43730,{key:this.key,value:this.value});if(this.right.isRed())throw G(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw G(27949);return e+(this.isRed()?0:1)}}Le.EMPTY=null,Le.RED=!0,Le.BLACK=!1;Le.EMPTY=new class{constructor(){this.size=0}get key(){throw G(57766)}get value(){throw G(16141)}get color(){throw G(16727)}get left(){throw G(29726)}get right(){throw G(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new Le(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e){this.comparator=e,this.data=new ye(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new qh(this.data.getIterator())}getIteratorFrom(e){return new qh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Se)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Se(this.comparator);return t.data=e,t}}class qh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.fields=e,e.sort(Oe.comparator)}static empty(){return new nt([])}unionWith(e){let t=new Se(Oe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new nt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ir(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new wm("Invalid base64 string: "+s):s}}(e);return new Fe(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Fe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Fe.EMPTY_BYTE_STRING=new Fe("");const xb=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function fn(n){if(le(!!n,39018),typeof n=="string"){let e=0;const t=xb.exec(n);if(le(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Te(n.seconds),nanos:Te(n.nanos)}}function Te(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function dn(n){return typeof n=="string"?Fe.fromBase64String(n):Fe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tm="server_timestamp",Em="__type__",Im="__previous_value__",Am="__local_write_time__";function Kc(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Em])==null?void 0:r.stringValue)===Tm}function bo(n){const e=n.mapValue.fields[Im];return Kc(e)?bo(e):e}function Ri(n){const e=fn(n.mapValue.fields[Am].timestampValue);return new ge(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mb{constructor(e,t,r,i,s,o,c,u,l,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=f,this.apiKey=p}}const to="(default)";class Ci{constructor(e,t){this.projectId=e,this.database=t||to}static empty(){return new Ci("","")}get isDefaultDatabase(){return this.database===to}isEqual(e){return e instanceof Ci&&e.projectId===this.projectId&&e.database===this.database}}function Nb(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new U(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ci(n.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bm="__type__",Vb="__max__",ps={mapValue:{}},Sm="__vector__",no="value";function mn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Kc(n)?4:Ob(n)?9007199254740991:Lb(n)?10:11:G(28295,{value:n})}function Rt(n,e){if(n===e)return!0;const t=mn(n);if(t!==mn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Ri(n).isEqual(Ri(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=fn(i.timestampValue),c=fn(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return dn(i.bytesValue).isEqual(dn(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Te(i.geoPointValue.latitude)===Te(s.geoPointValue.latitude)&&Te(i.geoPointValue.longitude)===Te(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Te(i.integerValue)===Te(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Te(i.doubleValue),c=Te(s.doubleValue);return o===c?eo(o)===eo(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return Ir(n.arrayValue.values||[],e.arrayValue.values||[],Rt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(zh(o)!==zh(c))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Rt(o[u],c[u])))return!1;return!0}(n,e);default:return G(52216,{left:n})}}function Pi(n,e){return(n.values||[]).find(t=>Rt(t,e))!==void 0}function Ar(n,e){if(n===e)return 0;const t=mn(n),r=mn(e);if(t!==r)return ie(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ie(n.booleanValue,e.booleanValue);case 2:return function(s,o){const c=Te(s.integerValue||s.doubleValue),u=Te(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return Hh(n.timestampValue,e.timestampValue);case 4:return Hh(Ri(n),Ri(e));case 5:return Qa(n.stringValue,e.stringValue);case 6:return function(s,o){const c=dn(s),u=dn(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){const f=ie(c[l],u[l]);if(f!==0)return f}return ie(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const c=ie(Te(s.latitude),Te(o.latitude));return c!==0?c:ie(Te(s.longitude),Te(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return jh(n.arrayValue,e.arrayValue);case 10:return function(s,o){var m,y,C,D;const c=s.fields||{},u=o.fields||{},l=(m=c[no])==null?void 0:m.arrayValue,f=(y=u[no])==null?void 0:y.arrayValue,p=ie(((C=l==null?void 0:l.values)==null?void 0:C.length)||0,((D=f==null?void 0:f.values)==null?void 0:D.length)||0);return p!==0?p:jh(l,f)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===ps.mapValue&&o===ps.mapValue)return 0;if(s===ps.mapValue)return 1;if(o===ps.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),l=o.fields||{},f=Object.keys(l);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const m=Qa(u[p],f[p]);if(m!==0)return m;const y=Ar(c[u[p]],l[f[p]]);if(y!==0)return y}return ie(u.length,f.length)}(n.mapValue,e.mapValue);default:throw G(23264,{he:t})}}function Hh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ie(n,e);const t=fn(n),r=fn(e),i=ie(t.seconds,r.seconds);return i!==0?i:ie(t.nanos,r.nanos)}function jh(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Ar(t[i],r[i]);if(s)return s}return ie(t.length,r.length)}function br(n){return Xa(n)}function Xa(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=fn(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return dn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return j.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Xa(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Xa(t.fields[o])}`;return i+"}"}(n.mapValue):G(61005,{value:n})}function Ps(n){switch(mn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=bo(n);return e?16+Ps(e):16;case 5:return 2*n.stringValue.length;case 6:return dn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Ps(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return _n(r.fields,(s,o)=>{i+=s.length+Ps(o)}),i}(n.mapValue);default:throw G(13486,{value:n})}}function Wh(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Ja(n){return!!n&&"integerValue"in n}function Yc(n){return!!n&&"arrayValue"in n}function Gh(n){return!!n&&"nullValue"in n}function Kh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ks(n){return!!n&&"mapValue"in n}function Lb(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[bm])==null?void 0:r.stringValue)===Sm}function pi(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return _n(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=pi(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=pi(n.arrayValue.values[t]);return e}return{...n}}function Ob(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Vb}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.value=e}static empty(){return new Je({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ks(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=pi(t)}setAll(e){let t=Oe.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=pi(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());ks(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Rt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ks(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){_n(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Je(pi(this.value))}}function Rm(n){const e=[];return _n(n.fields,(t,r)=>{const i=new Oe([t]);if(ks(r)){const s=Rm(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new nt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new ze(e,0,Q.min(),Q.min(),Q.min(),Je.empty(),0)}static newFoundDocument(e,t,r,i){return new ze(e,1,t,Q.min(),r,i,0)}static newNoDocument(e,t){return new ze(e,2,t,Q.min(),Q.min(),Je.empty(),0)}static newUnknownDocument(e,t){return new ze(e,3,t,Q.min(),Q.min(),Je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ze&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ze(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,t){this.position=e,this.inclusive=t}}function Yh(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=j.comparator(j.fromName(o.referenceValue),t.key):r=Ar(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Qh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Rt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e,t="asc"){this.field=e,this.dir=t}}function Fb(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{}class Ie extends Cm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Bb(e,t,r):t==="array-contains"?new qb(e,r):t==="in"?new Hb(e,r):t==="not-in"?new jb(e,r):t==="array-contains-any"?new Wb(e,r):new Ie(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new $b(e,r):new zb(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Ar(t,this.value)):t!==null&&mn(this.value)===mn(t)&&this.matchesComparison(Ar(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return G(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class gt extends Cm{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new gt(e,t)}matches(e){return Pm(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Pm(n){return n.op==="and"}function km(n){return Ub(n)&&Pm(n)}function Ub(n){for(const e of n.filters)if(e instanceof gt)return!1;return!0}function Za(n){if(n instanceof Ie)return n.field.canonicalString()+n.op.toString()+br(n.value);if(km(n))return n.filters.map(e=>Za(e)).join(",");{const e=n.filters.map(t=>Za(t)).join(",");return`${n.op}(${e})`}}function Dm(n,e){return n instanceof Ie?function(r,i){return i instanceof Ie&&r.op===i.op&&r.field.isEqual(i.field)&&Rt(r.value,i.value)}(n,e):n instanceof gt?function(r,i){return i instanceof gt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&Dm(o,i.filters[c]),!0):!1}(n,e):void G(19439)}function xm(n){return n instanceof Ie?function(t){return`${t.field.canonicalString()} ${t.op} ${br(t.value)}`}(n):n instanceof gt?function(t){return t.op.toString()+" {"+t.getFilters().map(xm).join(" ,")+"}"}(n):"Filter"}class Bb extends Ie{constructor(e,t,r){super(e,t,r),this.key=j.fromName(r.referenceValue)}matches(e){const t=j.comparator(e.key,this.key);return this.matchesComparison(t)}}class $b extends Ie{constructor(e,t){super(e,"in",t),this.keys=Mm("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class zb extends Ie{constructor(e,t){super(e,"not-in",t),this.keys=Mm("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Mm(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>j.fromName(r.referenceValue))}class qb extends Ie{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Yc(t)&&Pi(t.arrayValue,this.value)}}class Hb extends Ie{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Pi(this.value.arrayValue,t)}}class jb extends Ie{constructor(e,t){super(e,"not-in",t)}matches(e){if(Pi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Pi(this.value.arrayValue,t)}}class Wb extends Ie{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Yc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Pi(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.Te=null}}function Xh(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Gb(n,e,t,r,i,s,o)}function Qc(n){const e=X(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Za(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Ao(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>br(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>br(r)).join(",")),e.Te=t}return e.Te}function Xc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Fb(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Dm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Qh(n.startAt,e.startAt)&&Qh(n.endAt,e.endAt)}function ec(n){return j.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function Kb(n,e,t,r,i,s,o,c){return new Vr(n,e,t,r,i,s,o,c)}function So(n){return new Vr(n)}function Jh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Yb(n){return j.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Nm(n){return n.collectionGroup!==null}function gi(n){const e=X(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Se(Oe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(l=>{l.isInequality()&&(c=c.add(l.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new ki(s,r))}),t.has(Oe.keyField().canonicalString())||e.Ie.push(new ki(Oe.keyField(),r))}return e.Ie}function It(n){const e=X(n);return e.Ee||(e.Ee=Qb(e,gi(n))),e.Ee}function Qb(n,e){if(n.limitType==="F")return Xh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new ki(i.field,s)});const t=n.endAt?new ro(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ro(n.startAt.position,n.startAt.inclusive):null;return Xh(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function tc(n,e){const t=n.filters.concat([e]);return new Vr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Xb(n,e){const t=n.explicitOrderBy.concat([e]);return new Vr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function nc(n,e,t){return new Vr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ro(n,e){return Xc(It(n),It(e))&&n.limitType===e.limitType}function Vm(n){return`${Qc(It(n))}|lt:${n.limitType}`}function sr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>xm(i)).join(", ")}]`),Ao(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>br(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>br(i)).join(",")),`Target(${r})`}(It(n))}; limitType=${n.limitType})`}function Co(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):j.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of gi(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,u){const l=Yh(o,c,u);return o.inclusive?l<=0:l<0}(r.startAt,gi(r),i)||r.endAt&&!function(o,c,u){const l=Yh(o,c,u);return o.inclusive?l>=0:l>0}(r.endAt,gi(r),i))}(n,e)}function Jb(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Lm(n){return(e,t)=>{let r=!1;for(const i of gi(n)){const s=Zb(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function Zb(n,e,t){const r=n.field.isKeyField()?j.comparator(e.key,t.key):function(s,o,c){const u=o.data.field(s),l=c.data.field(s);return u!==null&&l!==null?Ar(u,l):G(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return G(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){_n(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return vm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e1=new ye(j.comparator);function Ht(){return e1}const Om=new ye(j.comparator);function ui(...n){let e=Om;for(const t of n)e=e.insert(t.key,t);return e}function Fm(n){let e=Om;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Dn(){return _i()}function Um(){return _i()}function _i(){return new Jn(n=>n.toString(),(n,e)=>n.isEqual(e))}const t1=new ye(j.comparator),n1=new Se(j.comparator);function se(...n){let e=n1;for(const t of n)e=e.add(t);return e}const r1=new Se(ie);function i1(){return r1}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:eo(e)?"-0":e}}function Bm(n){return{integerValue:""+n}}function s1(n,e){return Pb(e)?Bm(e):Jc(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(){this._=void 0}}function o1(n,e,t){return n instanceof Di?function(i,s){const o={fields:{[Em]:{stringValue:Tm},[Am]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Kc(s)&&(s=bo(s)),s&&(o.fields[Im]=s),{mapValue:o}}(t,e):n instanceof xi?zm(n,e):n instanceof Mi?qm(n,e):function(i,s){const o=$m(i,s),c=Zh(o)+Zh(i.Ae);return Ja(o)&&Ja(i.Ae)?Bm(c):Jc(i.serializer,c)}(n,e)}function a1(n,e,t){return n instanceof xi?zm(n,e):n instanceof Mi?qm(n,e):t}function $m(n,e){return n instanceof io?function(r){return Ja(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Di extends Po{}class xi extends Po{constructor(e){super(),this.elements=e}}function zm(n,e){const t=Hm(e);for(const r of n.elements)t.some(i=>Rt(i,r))||t.push(r);return{arrayValue:{values:t}}}class Mi extends Po{constructor(e){super(),this.elements=e}}function qm(n,e){let t=Hm(e);for(const r of n.elements)t=t.filter(i=>!Rt(i,r));return{arrayValue:{values:t}}}class io extends Po{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Zh(n){return Te(n.integerValue||n.doubleValue)}function Hm(n){return Yc(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c1{constructor(e,t){this.field=e,this.transform=t}}function u1(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof xi&&i instanceof xi||r instanceof Mi&&i instanceof Mi?Ir(r.elements,i.elements,Rt):r instanceof io&&i instanceof io?Rt(r.Ae,i.Ae):r instanceof Di&&i instanceof Di}(n.transform,e.transform)}class l1{constructor(e,t){this.version=e,this.transformResults=t}}class ot{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ot}static exists(e){return new ot(void 0,e)}static updateTime(e){return new ot(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ds(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class ko{}function jm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Zc(n.key,ot.none()):new qi(n.key,n.data,ot.none());{const t=n.data,r=Je.empty();let i=new Se(Oe.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new yn(n.key,r,new nt(i.toArray()),ot.none())}}function h1(n,e,t){n instanceof qi?function(i,s,o){const c=i.value.clone(),u=tf(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof yn?function(i,s,o){if(!Ds(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=tf(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(Wm(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function yi(n,e,t,r){return n instanceof qi?function(s,o,c,u){if(!Ds(s.precondition,o))return c;const l=s.value.clone(),f=nf(s.fieldTransforms,u,o);return l.setAll(f),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof yn?function(s,o,c,u){if(!Ds(s.precondition,o))return c;const l=nf(s.fieldTransforms,u,o),f=o.data;return f.setAll(Wm(s)),f.setAll(l),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(s,o,c){return Ds(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function f1(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=$m(r.transform,i||null);s!=null&&(t===null&&(t=Je.empty()),t.set(r.field,s))}return t||null}function ef(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Ir(r,i,(s,o)=>u1(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class qi extends ko{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class yn extends ko{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Wm(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function tf(n,e,t){const r=new Map;le(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,a1(o,c,t[i]))}return r}function nf(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,o1(s,o,e))}return r}class Zc extends ko{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class d1 extends ko{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m1{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&h1(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=yi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=yi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Um();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const u=jm(o,c);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),se())}isEqual(e){return this.batchId===e.batchId&&Ir(this.mutations,e.mutations,(t,r)=>ef(t,r))&&Ir(this.baseMutations,e.baseMutations,(t,r)=>ef(t,r))}}class eu{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){le(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=function(){return t1}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new eu(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p1{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g1{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ee,ae;function _1(n){switch(n){case P.OK:return G(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return G(15467,{code:n})}}function Gm(n){if(n===void 0)return qt("GRPC error has no .code"),P.UNKNOWN;switch(n){case Ee.OK:return P.OK;case Ee.CANCELLED:return P.CANCELLED;case Ee.UNKNOWN:return P.UNKNOWN;case Ee.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Ee.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Ee.INTERNAL:return P.INTERNAL;case Ee.UNAVAILABLE:return P.UNAVAILABLE;case Ee.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Ee.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Ee.NOT_FOUND:return P.NOT_FOUND;case Ee.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Ee.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Ee.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Ee.ABORTED:return P.ABORTED;case Ee.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Ee.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Ee.DATA_LOSS:return P.DATA_LOSS;default:return G(39323,{code:n})}}(ae=Ee||(Ee={}))[ae.OK=0]="OK",ae[ae.CANCELLED=1]="CANCELLED",ae[ae.UNKNOWN=2]="UNKNOWN",ae[ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ae[ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ae[ae.NOT_FOUND=5]="NOT_FOUND",ae[ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",ae[ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",ae[ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",ae[ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ae[ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ae[ae.ABORTED=10]="ABORTED",ae[ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",ae[ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",ae[ae.INTERNAL=13]="INTERNAL",ae[ae.UNAVAILABLE=14]="UNAVAILABLE",ae[ae.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y1(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v1=new un([4294967295,4294967295],0);function rf(n){const e=y1().encode(n),t=new cm;return t.update(e),new Uint8Array(t.digest())}function sf(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new un([t,r],0),new un([i,s],0)]}class tu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new li(`Invalid padding: ${t}`);if(r<0)throw new li(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new li(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new li(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=un.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(un.fromNumber(r)));return i.compare(v1)===1&&(i=new un([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=rf(e),[r,i]=sf(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);if(!this.we(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new tu(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=rf(e),[r,i]=sf(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);this.be(o)}}be(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class li extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Hi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Do(Q.min(),i,new ye(ie),Ht(),se())}}class Hi{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Hi(r,t,se(),se(),se())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=i}}class Km{constructor(e,t){this.targetId=e,this.Ce=t}}class Ym{constructor(e,t,r=Fe.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class of{constructor(){this.ve=0,this.Fe=af(),this.Me=Fe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=se(),t=se(),r=se();return this.Fe.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:G(38017,{changeType:s})}}),new Hi(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=af()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,le(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class w1{constructor(e){this.Ge=e,this.ze=new Map,this.je=Ht(),this.He=gs(),this.Je=gs(),this.Ze=new ye(ie)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:G(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,i)=>{this.rt(i)&&t(i)})}st(e){const t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(ec(s))if(r===0){const o=new j(s.path);this.et(t,o,ze.newNoDocument(o,Q.min()))}else le(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),u=c?this.ct(c,e,o):1;if(u!==0){this.it(t);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,l)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=dn(r).toUint8Array()}catch(u){if(u instanceof wm)return Er("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new tu(o,i,s)}catch(u){return Er(u instanceof li?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.et(t,s,null),i++)}),i}Tt(e){const t=new Map;this.ze.forEach((s,o)=>{const c=this.ot(o);if(c){if(s.current&&ec(c.target)){const u=new j(c.target.path);this.It(u).has(o)||this.Et(o,u)||this.et(o,u,ze.newNoDocument(u,e))}s.Be&&(t.set(o,s.ke()),s.Ke())}});let r=se();this.Je.forEach((s,o)=>{let c=!0;o.forEachWhile(u=>{const l=this.ot(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.je.forEach((s,o)=>o.setReadTime(e));const i=new Do(e,t,this.Ze,this.je,r);return this.je=Ht(),this.He=gs(),this.Je=gs(),this.Ze=new ye(ie),i}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.qe(t,1):i.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new of,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new Se(ie),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new Se(ie),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new of),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function gs(){return new ye(j.comparator)}function af(){return new ye(j.comparator)}const T1={asc:"ASCENDING",desc:"DESCENDING"},E1={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},I1={and:"AND",or:"OR"};class A1{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function rc(n,e){return n.useProto3Json||Ao(e)?e:{value:e}}function so(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Qm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function b1(n,e){return so(n,e.toTimestamp())}function At(n){return le(!!n,49232),Q.fromTimestamp(function(t){const r=fn(t);return new ge(r.seconds,r.nanos)}(n))}function nu(n,e){return ic(n,e).canonicalString()}function ic(n,e){const t=function(i){return new me(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Xm(n){const e=me.fromString(n);return le(np(e),10190,{key:e.toString()}),e}function sc(n,e){return nu(n.databaseId,e.path)}function Ea(n,e){const t=Xm(e);if(t.get(1)!==n.databaseId.projectId)throw new U(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new j(Zm(t))}function Jm(n,e){return nu(n.databaseId,e)}function S1(n){const e=Xm(n);return e.length===4?me.emptyPath():Zm(e)}function oc(n){return new me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Zm(n){return le(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function cf(n,e,t){return{name:sc(n,e),fields:t.value.mapValue.fields}}function R1(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:G(39313,{state:l})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(l,f){return l.useProto3Json?(le(f===void 0||typeof f=="string",58123),Fe.fromBase64String(f||"")):(le(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Fe.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(l){const f=l.code===void 0?P.UNKNOWN:Gm(l.code);return new U(f,l.message||"")}(o);t=new Ym(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Ea(n,r.document.name),s=At(r.document.updateTime),o=r.document.createTime?At(r.document.createTime):Q.min(),c=new Je({mapValue:{fields:r.document.fields}}),u=ze.newFoundDocument(i,s,o,c),l=r.targetIds||[],f=r.removedTargetIds||[];t=new xs(l,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Ea(n,r.document),s=r.readTime?At(r.readTime):Q.min(),o=ze.newNoDocument(i,s),c=r.removedTargetIds||[];t=new xs([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Ea(n,r.document),s=r.removedTargetIds||[];t=new xs([],s,i,null)}else{if(!("filter"in e))return G(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new g1(i,s),c=r.targetId;t=new Km(c,o)}}return t}function C1(n,e){let t;if(e instanceof qi)t={update:cf(n,e.key,e.value)};else if(e instanceof Zc)t={delete:sc(n,e.key)};else if(e instanceof yn)t={update:cf(n,e.key,e.data),updateMask:O1(e.fieldMask)};else{if(!(e instanceof d1))return G(16599,{dt:e.type});t={verify:sc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof Di)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof xi)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Mi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof io)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw G(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:b1(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:G(27497)}(n,e.precondition)),t}function P1(n,e){return n&&n.length>0?(le(e!==void 0,14353),n.map(t=>function(i,s){let o=i.updateTime?At(i.updateTime):At(s);return o.isEqual(Q.min())&&(o=At(s)),new l1(o,i.transformResults||[])}(t,e))):[]}function k1(n,e){return{documents:[Jm(n,e.path)]}}function D1(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Jm(n,i);const s=function(l){if(l.length!==0)return tp(gt.create(l,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(l){if(l.length!==0)return l.map(f=>function(m){return{field:or(m.field),direction:N1(m.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=rc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),{ft:t,parent:i}}function x1(n){let e=S1(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){le(r===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(p){const m=ep(p);return m instanceof gt&&km(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(C){return new ki(ar(C.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(p){let m;return m=typeof p=="object"?p.value:p,Ao(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(p){const m=!!p.before,y=p.values||[];return new ro(y,m)}(t.startAt));let l=null;return t.endAt&&(l=function(p){const m=!p.before,y=p.values||[];return new ro(y,m)}(t.endAt)),Kb(e,i,o,s,c,"F",u,l)}function M1(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return G(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ep(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=ar(t.unaryFilter.field);return Ie.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ar(t.unaryFilter.field);return Ie.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ar(t.unaryFilter.field);return Ie.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ar(t.unaryFilter.field);return Ie.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return G(61313);default:return G(60726)}}(n):n.fieldFilter!==void 0?function(t){return Ie.create(ar(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return G(58110);default:return G(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return gt.create(t.compositeFilter.filters.map(r=>ep(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return G(1026)}}(t.compositeFilter.op))}(n):G(30097,{filter:n})}function N1(n){return T1[n]}function V1(n){return E1[n]}function L1(n){return I1[n]}function or(n){return{fieldPath:n.canonicalString()}}function ar(n){return Oe.fromServerFormat(n.fieldPath)}function tp(n){return n instanceof Ie?function(t){if(t.op==="=="){if(Kh(t.value))return{unaryFilter:{field:or(t.field),op:"IS_NAN"}};if(Gh(t.value))return{unaryFilter:{field:or(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Kh(t.value))return{unaryFilter:{field:or(t.field),op:"IS_NOT_NAN"}};if(Gh(t.value))return{unaryFilter:{field:or(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:or(t.field),op:V1(t.op),value:t.value}}}(n):n instanceof gt?function(t){const r=t.getFilters().map(i=>tp(i));return r.length===1?r[0]:{compositeFilter:{op:L1(t.op),filters:r}}}(n):G(54877,{filter:n})}function O1(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function np(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function rp(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t,r,i,s=Q.min(),o=Q.min(),c=Fe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new sn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new sn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F1{constructor(e){this.yt=e}}function U1(n){const e=x1({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?nc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B1{constructor(){this.Sn=new $1}addToCollectionParentIndex(e,t){return this.Sn.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(hn.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(hn.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}}class $1{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Se(me.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Se(me.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ip=41943040;class Xe{static withCacheSize(e){return new Xe(e,Xe.DEFAULT_COLLECTION_PERCENTILE,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Xe.DEFAULT_COLLECTION_PERCENTILE=10,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Xe.DEFAULT=new Xe(ip,Xe.DEFAULT_COLLECTION_PERCENTILE,Xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Xe.DISABLED=new Xe(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Sr(0)}static ar(){return new Sr(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf="LruGarbageCollector",z1=1048576;function hf([n,e],[t,r]){const i=ie(n,t);return i===0?ie(e,r):i}class q1{constructor(e){this.Pr=e,this.buffer=new Se(hf),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();hf(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class H1{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){$(lf,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Nr(t)?$(lf,"Ignoring IndexedDB error during garbage collection: ",t):await Mr(t)}await this.Ar(3e5)})}}class j1{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return k.resolve(Io.ce);const r=new q1(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.mr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(uf)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),uf):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,i,s,o,c,u,l;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(l=Date.now(),ir()<=re.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-f}ms`),k.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function W1(n,e){return new j1(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G1{constructor(){this.changes=new Jn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ze.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K1{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y1{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&yi(r.mutation,i,nt.empty(),ge.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,t,r=se()){const i=Dn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=ui();return s.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Dn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,se()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=Ht();const o=_i(),c=function(){return _i()}();return t.forEach((u,l)=>{const f=r.get(l.key);i.has(l.key)&&(f===void 0||f.mutation instanceof yn)?s=s.insert(l.key,l):f!==void 0?(o.set(l.key,f.mutation.getFieldMask()),yi(f.mutation,l,f.mutation.getFieldMask(),ge.now())):o.set(l.key,nt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((l,f)=>o.set(l,f)),t.forEach((l,f)=>c.set(l,new K1(f,o.get(l)??null))),c))}recalculateAndSaveOverlays(e,t){const r=_i();let i=new ye((o,c)=>o-c),s=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(u=>{const l=t.get(u);if(l===null)return;let f=r.get(u)||nt.empty();f=c.applyToLocalView(l,f),r.set(u,f);const p=(i.get(c.batchId)||se()).add(u);i=i.insert(c.batchId,p)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),l=u.key,f=u.value,p=Um();f.forEach(m=>{if(!s.has(m)){const y=jm(t.get(m),r.get(m));y!==null&&p.set(m,y),s=s.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return k.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return Yb(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Nm(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):k.resolve(Dn());let c=Si,u=s;return o.next(l=>k.forEach(l,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),s.get(f)?k.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{u=u.insert(f,m)}))).next(()=>this.populateOverlays(e,l,s)).next(()=>this.computeViews(e,u,l,se())).next(f=>({batchId:c,changes:Fm(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new j(t)).next(r=>{let i=ui();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=ui();return this.indexManager.getCollectionParents(e,s).next(c=>k.forEach(c,u=>{const l=function(p,m){return new Vr(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next(f=>{f.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((u,l)=>{const f=l.getKey();o.get(f)===null&&(o=o.insert(f,ze.newInvalidDocument(f)))});let c=ui();return o.forEach((u,l)=>{const f=s.get(u);f!==void 0&&yi(f.mutation,l,nt.empty(),ge.now()),Co(t,l)&&(c=c.insert(u,l))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q1{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return k.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:At(i.createTime)}}(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(i){return{name:i.name,query:U1(i.bundledQuery),readTime:At(i.readTime)}}(t)),k.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X1{constructor(){this.overlays=new ye(j.comparator),this.Lr=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Dn();return k.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.bt(e,t,s)}),k.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Lr.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){const i=Dn(),s=t.length+1,o=new j(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return k.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ye((l,f)=>l-f);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let f=s.get(l.largestBatchId);f===null&&(f=Dn(),s=s.insert(l.largestBatchId,f)),f.set(l.getKey(),l)}}const c=Dn(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((l,f)=>c.set(l,f)),!(c.size()>=i)););return k.resolve(c)}bt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new p1(t,r));let s=this.Lr.get(t);s===void 0&&(s=se(),this.Lr.set(t,s)),this.Lr.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J1{constructor(){this.sessionToken=Fe.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(){this.kr=new Se(ke.Kr),this.qr=new Se(ke.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new ke(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new ke(e,t))}Qr(e,t){e.forEach(r=>this.removeReference(r,t))}Gr(e){const t=new j(new me([])),r=new ke(t,e),i=new ke(t,e+1),s=[];return this.qr.forEachInRange([r,i],o=>{this.Wr(o),s.push(o.key)}),s}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new j(new me([])),r=new ke(t,e),i=new ke(t,e+1);let s=se();return this.qr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new ke(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ke{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return j.comparator(e.key,t.key)||ie(e.Hr,t.Hr)}static Ur(e,t){return ie(e.Hr,t.Hr)||j.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z1{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new Se(ke.Kr)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new m1(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.Jr=this.Jr.add(new ke(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(o)}lookupMutationBatch(e,t){return k.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return k.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?Gc:this.Yn-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ke(t,0),i=new ke(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([r,i],o=>{const c=this.Zr(o.Hr);s.push(c)}),k.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Se(ie);return t.forEach(i=>{const s=new ke(i,0),o=new ke(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,o],c=>{r=r.add(c.Hr)})}),k.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;j.isDocumentKey(s)||(s=s.child(""));const o=new ke(new j(s),0);let c=new Se(ie);return this.Jr.forEachWhile(u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(c=c.add(u.Hr)),!0)},o),k.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){le(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return k.forEach(t.mutations,i=>{const s=new ke(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Jr=r})}nr(e){}containsKey(e,t){const r=new ke(t,0),i=this.Jr.firstAfterOrEqual(r);return k.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS{constructor(e){this.ti=e,this.docs=function(){return new ye(j.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():ze.newInvalidDocument(t))}getEntries(e,t){let r=Ht();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ze.newInvalidDocument(i))}),k.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Ht();const o=t.path,c=new j(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:l,value:{document:f}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||bb(Ab(f),r)<=0||(i.has(f.key)||Co(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return k.resolve(s)}getAllFromCollectionGroup(e,t,r,i){G(9500)}ni(e,t){return k.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new tS(this)}getSize(e){return k.resolve(this.size)}}class tS extends G1{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)}),k.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e){this.persistence=e,this.ri=new Jn(t=>Qc(t),Xc),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.ii=0,this.si=new ru,this.targetCount=0,this.oi=Sr._r()}forEachTarget(e,t){return this.ri.forEach((r,i)=>t(i)),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),k.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Sr(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.lr(t),k.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ri.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),k.waitFor(s).next(()=>i)}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),k.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),k.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),k.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this.si.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e,t){this._i={},this.overlays={},this.ai=new Io(0),this.ui=!1,this.ui=!0,this.ci=new J1,this.referenceDelegate=e(this),this.li=new nS(this),this.indexManager=new B1,this.remoteDocumentCache=function(i){return new eS(i)}(r=>this.referenceDelegate.hi(r)),this.serializer=new F1(t),this.Pi=new Q1(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new X1,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new Z1(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const i=new rS(this.ai.next());return this.referenceDelegate.Ti(),r(i).next(s=>this.referenceDelegate.Ii(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return k.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}}class rS extends Rb{constructor(e){super(),this.currentSequenceNumber=e}}class iu{constructor(e){this.persistence=e,this.Ri=new ru,this.Ai=null}static Vi(e){return new iu(e)}get di(){if(this.Ai)return this.Ai;throw G(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),k.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(i=>this.di.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.di.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.di,r=>{const i=j.fromPath(r);return this.mi(e,i).next(s=>{s||t.removeEntry(i,Q.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return k.or([()=>k.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class oo{constructor(e,t){this.persistence=e,this.fi=new Jn(r=>kb(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=W1(this,t)}static Vi(e,t){return new oo(e,t)}Ti(){}Ii(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}mr(e,t){return k.forEach(this.fi,(r,i)=>this.wr(e,r,i).next(s=>s?k.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,o=>this.wr(e,o,t).next(c=>{c||(r++,s.removeEntry(o,Q.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),k.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),k.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ps(e.data.value)),t}wr(e,t,r){return k.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.fi.get(t);return k.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=i}static Es(e,t){let r=se(),i=se();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new su(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iS{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sS{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return WT()?8:Cb(He())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.gs(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ps(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new iS;return this.ys(e,t,o).next(c=>{if(s.result=c,this.As)return this.ws(e,t,o,c.size)})}).next(()=>s.result)}ws(e,t,r,i){return r.documentReadCount<this.Vs?(ir()<=re.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",sr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),k.resolve()):(ir()<=re.DEBUG&&$("QueryEngine","Query:",sr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(ir()<=re.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",sr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,It(t))):k.resolve())}gs(e,t){if(Jh(t))return k.resolve(null);let r=It(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=nc(t,null,"F"),r=It(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=se(...s);return this.fs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const l=this.bs(t,c);return this.Ss(t,l,o,u.readTime)?this.gs(e,nc(t,null,"F")):this.Ds(e,l,t,u)}))})))}ps(e,t,r,i){return Jh(t)||i.isEqual(Q.min())?k.resolve(null):this.fs.getDocuments(e,r).next(s=>{const o=this.bs(t,s);return this.Ss(t,o,r,i)?k.resolve(null):(ir()<=re.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),sr(t)),this.Ds(e,o,t,Ib(i,Si)).next(c=>c))})}bs(e,t){let r=new Se(Lm(e));return t.forEach((i,s)=>{Co(e,s)&&(r=r.add(s))}),r}Ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,t,r){return ir()<=re.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",sr(t)),this.fs.getDocumentsMatchingQuery(e,t,hn.min(),r)}Ds(e,t,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou="LocalStore",oS=3e8;class aS{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new ye(ie),this.Fs=new Jn(s=>Qc(s),Xc),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Y1(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function cS(n,e,t,r){return new aS(n,e,t,r)}async function op(n,e){const t=X(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Os(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let u=se();for(const l of i){o.push(l.batchId);for(const f of l.mutations)u=u.add(f.key)}for(const l of s){c.push(l.batchId);for(const f of l.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(l=>({Ns:l,removedBatchIds:o,addedBatchIds:c}))})})}function uS(n,e){const t=X(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return function(c,u,l,f){const p=l.batch,m=p.keys();let y=k.resolve();return m.forEach(C=>{y=y.next(()=>f.getEntry(u,C)).next(D=>{const x=l.docVersions.get(C);le(x!==null,48541),D.version.compareTo(x)<0&&(p.applyToRemoteDocument(D,l),D.isValidDocument()&&(D.setReadTime(l.commitVersion),f.addEntry(D)))})}),y.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=se();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function ap(n){const e=X(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function lS(n,e){const t=X(n),r=e.snapshotVersion;let i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;const c=[];e.targetChanges.forEach((f,p)=>{const m=i.get(p);if(!m)return;c.push(t.li.removeMatchingKeys(s,f.removedDocuments,p).next(()=>t.li.addMatchingKeys(s,f.addedDocuments,p)));let y=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?y=y.withResumeToken(Fe.EMPTY_BYTE_STRING,Q.min()).withLastLimboFreeSnapshotVersion(Q.min()):f.resumeToken.approximateByteSize()>0&&(y=y.withResumeToken(f.resumeToken,r)),i=i.insert(p,y),function(D,x,M){return D.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=oS?!0:M.addedDocuments.size+M.modifiedDocuments.size+M.removedDocuments.size>0}(m,y,f)&&c.push(t.li.updateTargetData(s,y))});let u=Ht(),l=se();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(hS(s,o,e.documentUpdates).next(f=>{u=f.Bs,l=f.Ls})),!r.isEqual(Q.min())){const f=t.li.getLastRemoteSnapshotVersion(s).next(p=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(f)}return k.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,l)).next(()=>u)}).then(s=>(t.vs=i,s))}function hS(n,e,t){let r=se(),i=se();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=Ht();return t.forEach((c,u)=>{const l=s.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(Q.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):$(ou,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)}),{Bs:o,Ls:i}})}function fS(n,e){const t=X(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Gc),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function dS(n,e){const t=X(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.li.getTargetData(r,e).next(s=>s?(i=s,k.resolve(i)):t.li.allocateTargetId(r).next(o=>(i=new sn(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r})}async function ac(n,e,t){const r=X(n),i=r.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Nr(o))throw o;$(ou,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function ff(n,e,t){const r=X(n);let i=Q.min(),s=se();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,l,f){const p=X(u),m=p.Fs.get(f);return m!==void 0?k.resolve(p.vs.get(m)):p.li.getTargetData(l,f)}(r,o,It(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,t?i:Q.min(),t?s:se())).next(c=>(mS(r,Jb(e),c),{documents:c,ks:s})))}function mS(n,e,t){let r=n.Ms.get(e)||Q.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Ms.set(e,r)}class df{constructor(){this.activeTargetIds=i1()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class pS{constructor(){this.vo=new df,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new df,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gS{Mo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf="ConnectivityMonitor";class pf{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){$(mf,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){$(mf,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _s=null;function cc(){return _s===null?_s=function(){return 268435456+Math.round(2147483648*Math.random())}():_s++,"0x"+_s.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia="RestConnection",_S={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class yS{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===to?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const o=cc(),c=this.Qo(e,t.toUriEncodedString());$(Ia,`Sending RPC '${e}' ${o}:`,c,r);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(u,i,s);const{host:l}=new URL(c),f=Pr(l);return this.zo(e,c,u,r,f).then(p=>($(Ia,`Received RPC '${e}' ${o}: `,p),p),p=>{throw Er(Ia,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p})}jo(e,t,r,i,s,o){return this.Wo(e,t,r,i,s)}Go(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+xr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Qo(e,t){const r=_S[e];let i=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vS{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be="WebChannelConnection",si=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(i){setTimeout(()=>{throw i},0)}})};class mr extends yS{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!mr.c_){const e=fm();si(e,hm.STAT_EVENT,t=>{t.stat===Ya.PROXY?$(Be,"STAT_EVENT: detected buffering proxy"):t.stat===Ya.NOPROXY&&$(Be,"STAT_EVENT: detected no buffering proxy")}),mr.c_=!0}}zo(e,t,r,i,s){const o=cc();return new Promise((c,u)=>{const l=new um;l.setWithCredentials(!0),l.listenOnce(lm.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Cs.NO_ERROR:const p=l.getResponseJson();$(Be,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case Cs.TIMEOUT:$(Be,`RPC '${e}' ${o} timed out`),u(new U(P.DEADLINE_EXCEEDED,"Request time out"));break;case Cs.HTTP_ERROR:const m=l.getStatus();if($(Be,`RPC '${e}' ${o} failed with status:`,m,"response text:",l.getResponseText()),m>0){let y=l.getResponseJson();Array.isArray(y)&&(y=y[0]);const C=y==null?void 0:y.error;if(C&&C.status&&C.message){const D=function(M){const F=M.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(F)>=0?F:P.UNKNOWN}(C.status);u(new U(D,C.message))}else u(new U(P.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new U(P.UNAVAILABLE,"Connection failed."));break;default:G(9055,{l_:e,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{$(Be,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);$(Be,`RPC '${e}' ${o} sending request:`,i),l.send(t,"POST",f,r,15)})}T_(e,t,r){const i=cc(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(c.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const l=s.join("");$(Be,`Creating RPC '${e}' stream ${i}: ${l}`,c);const f=o.createWebChannel(l,c);this.I_(f);let p=!1,m=!1;const y=new vS({Ho:C=>{m?$(Be,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(p||($(Be,`Opening RPC '${e}' stream ${i} transport.`),f.open(),p=!0),$(Be,`RPC '${e}' stream ${i} sending:`,C),f.send(C))},Jo:()=>f.close()});return si(f,ci.EventType.OPEN,()=>{m||($(Be,`RPC '${e}' stream ${i} transport opened.`),y.i_())}),si(f,ci.EventType.CLOSE,()=>{m||(m=!0,$(Be,`RPC '${e}' stream ${i} transport closed`),y.o_(),this.E_(f))}),si(f,ci.EventType.ERROR,C=>{m||(m=!0,Er(Be,`RPC '${e}' stream ${i} transport errored. Name:`,C.name,"Message:",C.message),y.o_(new U(P.UNAVAILABLE,"The operation could not be completed")))}),si(f,ci.EventType.MESSAGE,C=>{var D;if(!m){const x=C.data[0];le(!!x,16349);const M=x,F=(M==null?void 0:M.error)||((D=M[0])==null?void 0:D.error);if(F){$(Be,`RPC '${e}' stream ${i} received error:`,F);const q=F.status;let W=function(T){const _=Ee[T];if(_!==void 0)return Gm(_)}(q),te=F.message;W===void 0&&(W=P.INTERNAL,te="Unknown error status: "+q+" with message "+F.message),m=!0,y.o_(new U(W,te)),f.close()}else $(Be,`RPC '${e}' stream ${i} received:`,x),y.__(x)}}),mr.u_(),setTimeout(()=>{y.s_()},0),y}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return dm()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wS(n){return new mr(n)}function Aa(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(n){return new A1(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mr.c_=!1;class cp{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&$("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gf="PersistentStream";class up{constructor(e,t,r,i,s,o,c,u){this.Ci=e,this.b_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new cp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(qt(t.toString()),qt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.D_===t&&this.G_(r,i)},r=>{e(()=>{const i=new U(P.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)})})}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(i=>{r(()=>this.z_(i))}),this.stream.onMessage(i=>{r(()=>++this.F_==1?this.H_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return $(gf,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():($(gf,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class TS extends up{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=R1(this.serializer,e),r=function(s){if(!("targetChange"in s))return Q.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Q.min():o.readTime?At(o.readTime):Q.min()}(e);return this.listener.J_(t,r)}Z_(e){const t={};t.database=oc(this.serializer),t.addTarget=function(s,o){let c;const u=o.target;if(c=ec(u)?{documents:k1(s,u)}:{query:D1(s,u).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Qm(s,o.resumeToken);const l=rc(s,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo(Q.min())>0){c.readTime=so(s,o.snapshotVersion.toTimestamp());const l=rc(s,o.expectedCount);l!==null&&(c.expectedCount=l)}return c}(this.serializer,e);const r=M1(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=oc(this.serializer),t.removeTarget=e,this.K_(t)}}class ES extends up{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return le(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,le(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){le(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=P1(e.writeResults,e.commitTime),r=At(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=oc(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>C1(this.serializer,r))};this.K_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IS{}class AS extends IS{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new U(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Wo(e,ic(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(P.UNKNOWN,s.toString())})}jo(e,t,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.jo(e,ic(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new U(P.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function bS(n,e,t,r){return new AS(n,e,t,r)}class SS{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(qt(t),this.aa=!1):$("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn="RemoteStore";class RS{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo(o=>{r.enqueueAndForget(async()=>{Zn(this)&&($(Kn,"Restarting streams for network reachability change."),await async function(u){const l=X(u);l.Ea.add(4),await ji(l),l.Va.set("Unknown"),l.Ea.delete(4),await Mo(l)}(this))})}),this.Va=new SS(r,i)}}async function Mo(n){if(Zn(n))for(const e of n.Ra)await e(!0)}async function ji(n){for(const e of n.Ra)await e(!1)}function lp(n,e){const t=X(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),lu(t)?uu(t):Lr(t).O_()&&cu(t,e))}function au(n,e){const t=X(n),r=Lr(t);t.Ia.delete(e),r.O_()&&hp(t,e),t.Ia.size===0&&(r.O_()?r.L_():Zn(t)&&t.Va.set("Unknown"))}function cu(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Q.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Lr(n).Z_(e)}function hp(n,e){n.da.$e(e),Lr(n).X_(e)}function uu(n){n.da=new w1({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Lr(n).start(),n.Va.ua()}function lu(n){return Zn(n)&&!Lr(n).x_()&&n.Ia.size>0}function Zn(n){return X(n).Ea.size===0}function fp(n){n.da=void 0}async function CS(n){n.Va.set("Online")}async function PS(n){n.Ia.forEach((e,t)=>{cu(n,e)})}async function kS(n,e){fp(n),lu(n)?(n.Va.ha(e),uu(n)):n.Va.set("Unknown")}async function DS(n,e,t){if(n.Va.set("Online"),e instanceof Ym&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.Ia.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.Ia.delete(c),i.da.removeTarget(c))}(n,e)}catch(r){$(Kn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await ao(n,r)}else if(e instanceof xs?n.da.Xe(e):e instanceof Km?n.da.st(e):n.da.tt(e),!t.isEqual(Q.min()))try{const r=await ap(n.localStore);t.compareTo(r)>=0&&await function(s,o){const c=s.da.Tt(o);return c.targetChanges.forEach((u,l)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.Ia.get(l);f&&s.Ia.set(l,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,l)=>{const f=s.Ia.get(u);if(!f)return;s.Ia.set(u,f.withResumeToken(Fe.EMPTY_BYTE_STRING,f.snapshotVersion)),hp(s,u);const p=new sn(f.target,u,l,f.sequenceNumber);cu(s,p)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){$(Kn,"Failed to raise snapshot:",r),await ao(n,r)}}async function ao(n,e,t){if(!Nr(e))throw e;n.Ea.add(1),await ji(n),n.Va.set("Offline"),t||(t=()=>ap(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{$(Kn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Mo(n)})}function dp(n,e){return e().catch(t=>ao(n,t,e))}async function No(n){const e=X(n),t=pn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Gc;for(;xS(e);)try{const i=await fS(e.localStore,r);if(i===null){e.Ta.length===0&&t.L_();break}r=i.batchId,MS(e,i)}catch(i){await ao(e,i)}mp(e)&&pp(e)}function xS(n){return Zn(n)&&n.Ta.length<10}function MS(n,e){n.Ta.push(e);const t=pn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function mp(n){return Zn(n)&&!pn(n).x_()&&n.Ta.length>0}function pp(n){pn(n).start()}async function NS(n){pn(n).ra()}async function VS(n){const e=pn(n);for(const t of n.Ta)e.ea(t.mutations)}async function LS(n,e,t){const r=n.Ta.shift(),i=eu.from(r,e,t);await dp(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await No(n)}async function OS(n,e){e&&pn(n).Y_&&await async function(r,i){if(function(o){return _1(o)&&o!==P.ABORTED}(i.code)){const s=r.Ta.shift();pn(r).B_(),await dp(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await No(r)}}(n,e),mp(n)&&pp(n)}async function _f(n,e){const t=X(n);t.asyncQueue.verifyOperationInProgress(),$(Kn,"RemoteStore received new credentials");const r=Zn(t);t.Ea.add(3),await ji(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Mo(t)}async function FS(n,e){const t=X(n);e?(t.Ea.delete(2),await Mo(t)):e||(t.Ea.add(2),await ji(t),t.Va.set("Unknown"))}function Lr(n){return n.ma||(n.ma=function(t,r,i){const s=X(t);return s.sa(),new TS(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:CS.bind(null,n),Yo:PS.bind(null,n),t_:kS.bind(null,n),J_:DS.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),lu(n)?uu(n):n.Va.set("Unknown")):(await n.ma.stop(),fp(n))})),n.ma}function pn(n){return n.fa||(n.fa=function(t,r,i){const s=X(t);return s.sa(),new ES(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:NS.bind(null,n),t_:OS.bind(null,n),ta:VS.bind(null,n),na:LS.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await No(n)):(await n.fa.stop(),n.Ta.length>0&&($(Kn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Ot,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new hu(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function fu(n,e){if(qt("AsyncQueue",`${e}: ${n}`),Nr(n))return new U(P.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{static emptySet(e){return new pr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||j.comparator(t.key,r.key):(t,r)=>j.comparator(t.key,r.key),this.keyedMap=ui(),this.sortedSet=new ye(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof pr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new pr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yf{constructor(){this.ga=new ye(j.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):G(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Rr{constructor(e,t,r,i,s,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Rr(e,t,pr.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ro(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class US{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(e=>e.Da())}}class BS{constructor(){this.queries=vf(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const i=X(t),s=i.queries;i.queries=vf(),s.forEach((o,c)=>{for(const u of c.ba)u.onError(r)})})(this,new U(P.ABORTED,"Firestore shutting down"))}}function vf(){return new Jn(n=>Vm(n),Ro)}async function du(n,e){const t=X(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.Da()&&(r=2):(s=new US,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=fu(o,`Initialization of query '${sr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&pu(t)}async function mu(n,e){const t=X(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.ba.indexOf(e);o>=0&&(s.ba.splice(o,1),s.ba.length===0?i=e.Da()?0:1:!s.Sa()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function $S(n,e){const t=X(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.ba)c.Fa(i)&&(r=!0);o.wa=i}}r&&pu(t)}function zS(n,e,t){const r=X(n),i=r.queries.get(e);if(i)for(const s of i.ba)s.onError(t);r.queries.delete(e)}function pu(n){n.Ca.forEach(e=>{e.next()})}var uc,wf;(wf=uc||(uc={})).Ma="default",wf.Cache="cache";class gu{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Rr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.Ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Rr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==uc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(e){this.key=e}}class _p{constructor(e){this.key=e}}class qS{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=se(),this.mutatedKeys=se(),this.eu=Lm(e),this.tu=new pr(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new yf,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{const m=i.get(f),y=Co(this.query,p)?p:null,C=!!m&&this.mutatedKeys.has(m.key),D=!!y&&(y.hasLocalMutations||this.mutatedKeys.has(y.key)&&y.hasCommittedMutations);let x=!1;m&&y?m.data.isEqual(y.data)?C!==D&&(r.track({type:3,doc:y}),x=!0):this.su(m,y)||(r.track({type:2,doc:y}),x=!0,(u&&this.eu(y,u)>0||l&&this.eu(y,l)<0)&&(c=!0)):!m&&y?(r.track({type:0,doc:y}),x=!0):m&&!y&&(r.track({type:1,doc:m}),x=!0,(u||l)&&(c=!0)),x&&(y?(o=o.add(y),s=D?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{tu:o,iu:r,Ss:c,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((f,p)=>function(y,C){const D=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return G(20277,{Vt:x})}};return D(y)-D(C)}(f.type,p.type)||this.eu(f.doc,p.doc)),this.ou(r),i=i??!1;const c=t&&!i?this._u():[],u=this.Ya.size===0&&this.current&&!i?1:0,l=u!==this.Xa;return this.Xa=u,o.length!==0||l?{snapshot:new Rr(this.query,e.tu,s,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new yf,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=se(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const t=[];return e.forEach(r=>{this.Ya.has(r)||t.push(new _p(r))}),this.Ya.forEach(r=>{e.has(r)||t.push(new gp(r))}),t}cu(e){this.Za=e.ks,this.Ya=se();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Rr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const _u="SyncEngine";class HS{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class jS{constructor(e){this.key=e,this.hu=!1}}class WS{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new Jn(c=>Vm(c),Ro),this.Iu=new Map,this.Eu=new Set,this.Ru=new ye(j.comparator),this.Au=new Map,this.Vu=new ru,this.du={},this.mu=new Map,this.fu=Sr.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function GS(n,e,t=!0){const r=Ip(n);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await yp(r,e,t,!0),i}async function KS(n,e){const t=Ip(n);await yp(t,e,!0,!1)}async function yp(n,e,t,r){const i=await dS(n.localStore,It(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await YS(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&lp(n.remoteStore,i),c}async function YS(n,e,t,r,i){n.pu=(p,m,y)=>async function(D,x,M,F){let q=x.view.ru(M);q.Ss&&(q=await ff(D.localStore,x.query,!1).then(({documents:T})=>x.view.ru(T,q)));const W=F&&F.targetChanges.get(x.targetId),te=F&&F.targetMismatches.get(x.targetId)!=null,O=x.view.applyChanges(q,D.isPrimaryClient,W,te);return Ef(D,x.targetId,O.au),O.snapshot}(n,p,m,y);const s=await ff(n.localStore,e,!0),o=new qS(e,s.ks),c=o.ru(s.documents),u=Hi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(c,n.isPrimaryClient,u);Ef(n,t,l.au);const f=new HS(e,t,o);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),l.snapshot}async function QS(n,e,t){const r=X(n),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter(o=>!Ro(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await ac(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&au(r.remoteStore,i.targetId),lc(r,i.targetId)}).catch(Mr)):(lc(r,i.targetId),await ac(r.localStore,i.targetId,!0))}async function XS(n,e){const t=X(n),r=t.Tu.get(e),i=t.Iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),au(t.remoteStore,r.targetId))}async function JS(n,e,t){const r=sR(n);try{const i=await function(o,c){const u=X(o),l=ge.now(),f=c.reduce((y,C)=>y.add(C.key),se());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",y=>{let C=Ht(),D=se();return u.xs.getEntries(y,f).next(x=>{C=x,C.forEach((M,F)=>{F.isValidDocument()||(D=D.add(M))})}).next(()=>u.localDocuments.getOverlayedDocuments(y,C)).next(x=>{p=x;const M=[];for(const F of c){const q=f1(F,p.get(F.key).overlayedDocument);q!=null&&M.push(new yn(F.key,q,Rm(q.value.mapValue),ot.exists(!0)))}return u.mutationQueue.addMutationBatch(y,l,M,c)}).next(x=>{m=x;const M=x.applyToLocalDocumentSet(p,D);return u.documentOverlayCache.saveOverlays(y,x.batchId,M)})}).then(()=>({batchId:m.batchId,changes:Fm(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,u){let l=o.du[o.currentUser.toKey()];l||(l=new ye(ie)),l=l.insert(c,u),o.du[o.currentUser.toKey()]=l}(r,i.batchId,t),await Wi(r,i.changes),await No(r.remoteStore)}catch(i){const s=fu(i,"Failed to persist write");t.reject(s)}}async function vp(n,e){const t=X(n);try{const r=await lS(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Au.get(s);o&&(le(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.hu=!0:i.modifiedDocuments.size>0?le(o.hu,14607):i.removedDocuments.size>0&&(le(o.hu,42227),o.hu=!1))}),await Wi(t,r,e)}catch(r){await Mr(r)}}function Tf(n,e,t){const r=X(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Tu.forEach((s,o)=>{const c=o.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const u=X(o);u.onlineState=c;let l=!1;u.queries.forEach((f,p)=>{for(const m of p.ba)m.va(c)&&(l=!0)}),l&&pu(u)}(r.eventManager,e),i.length&&r.Pu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function ZS(n,e,t){const r=X(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Au.get(e),s=i&&i.key;if(s){let o=new ye(j.comparator);o=o.insert(s,ze.newNoDocument(s,Q.min()));const c=se().add(s),u=new Do(Q.min(),new Map,new ye(ie),o,c);await vp(r,u),r.Ru=r.Ru.remove(s),r.Au.delete(e),yu(r)}else await ac(r.localStore,e,!1).then(()=>lc(r,e,t)).catch(Mr)}async function eR(n,e){const t=X(n),r=e.batch.batchId;try{const i=await uS(t.localStore,e);Tp(t,r,null),wp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Wi(t,i)}catch(i){await Mr(i)}}async function tR(n,e,t){const r=X(n);try{const i=await function(o,c){const u=X(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let f;return u.mutationQueue.lookupMutationBatch(l,c).next(p=>(le(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(l,p))).next(()=>u.mutationQueue.performConsistencyCheck(l)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(l,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,f)).next(()=>u.localDocuments.getDocuments(l,f))})}(r.localStore,e);Tp(r,e,t),wp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Wi(r,i)}catch(i){await Mr(i)}}function wp(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Tp(n,e,t){const r=X(n);let i=r.du[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.du[r.currentUser.toKey()]=i}}function lc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(r=>{n.Vu.containsKey(r)||Ep(n,r)})}function Ep(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(au(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),yu(n))}function Ef(n,e,t){for(const r of t)r instanceof gp?(n.Vu.addReference(r.key,e),nR(n,r)):r instanceof _p?($(_u,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||Ep(n,r.key)):G(19791,{wu:r})}function nR(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(r)||($(_u,"New document in limbo: "+t),n.Eu.add(r),yu(n))}function yu(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new j(me.fromString(e)),r=n.fu.next();n.Au.set(r,new jS(t)),n.Ru=n.Ru.insert(t,r),lp(n.remoteStore,new sn(It(So(t.path)),r,"TargetPurposeLimboResolution",Io.ce))}}async function Wi(n,e,t){const r=X(n),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((c,u)=>{o.push(r.pu(u,e,t).then(l=>{var f;if((l||t)&&r.isPrimaryClient){const p=l?!l.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(l){i.push(l);const p=su.Es(u.targetId,l);s.push(p)}}))}),await Promise.all(o),r.Pu.J_(i),await async function(u,l){const f=X(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>k.forEach(l,m=>k.forEach(m.Ts,y=>f.persistence.referenceDelegate.addReference(p,m.targetId,y)).next(()=>k.forEach(m.Is,y=>f.persistence.referenceDelegate.removeReference(p,m.targetId,y)))))}catch(p){if(!Nr(p))throw p;$(ou,"Failed to update sequence numbers: "+p)}for(const p of l){const m=p.targetId;if(!p.fromCache){const y=f.vs.get(m),C=y.snapshotVersion,D=y.withLastLimboFreeSnapshotVersion(C);f.vs=f.vs.insert(m,D)}}}(r.localStore,s))}async function rR(n,e){const t=X(n);if(!t.currentUser.isEqual(e)){$(_u,"User change. New user:",e.toKey());const r=await op(t.localStore,e);t.currentUser=e,function(s,o){s.mu.forEach(c=>{c.forEach(u=>{u.reject(new U(P.CANCELLED,o))})}),s.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Wi(t,r.Ns)}}function iR(n,e){const t=X(n),r=t.Au.get(e);if(r&&r.hu)return se().add(r.key);{let i=se();const s=t.Iu.get(e);if(!s)return i;for(const o of s){const c=t.Tu.get(o);i=i.unionWith(c.view.nu)}return i}}function Ip(n){const e=X(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=vp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=iR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ZS.bind(null,e),e.Pu.J_=$S.bind(null,e.eventManager),e.Pu.yu=zS.bind(null,e.eventManager),e}function sR(n){const e=X(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=eR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=tR.bind(null,e),e}class co{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=xo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return cS(this.persistence,new sS,e.initialUser,this.serializer)}Cu(e){return new sp(iu.Vi,this.serializer)}Du(e){return new pS}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}co.provider={build:()=>new co};class oR extends co{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){le(this.persistence.referenceDelegate instanceof oo,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new H1(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Xe.withCacheSize(this.cacheSizeBytes):Xe.DEFAULT;return new sp(r=>oo.Vi(r,t),this.serializer)}}class hc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Tf(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=rR.bind(null,this.syncEngine),await FS(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new BS}()}createDatastore(e){const t=xo(e.databaseInfo.databaseId),r=wS(e.databaseInfo);return bS(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new RS(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Tf(this.syncEngine,t,0),function(){return pf.v()?new pf:new gS}())}createSyncEngine(e,t){return function(i,s,o,c,u,l,f){const p=new WS(i,s,o,c,u,l);return f&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=X(i);$(Kn,"RemoteStore shutting down."),s.Ea.add(5),await ji(s),s.Aa.shutdown(),s.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}hc.provider={build:()=>new hc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):qt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn="FirestoreClient";class aR{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=i,this.user=$e.UNAUTHENTICATED,this.clientId=Wc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{$(gn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>($(gn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ot;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=fu(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ba(n,e){n.asyncQueue.verifyOperationInProgress(),$(gn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await op(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function If(n,e){n.asyncQueue.verifyOperationInProgress();const t=await cR(n);$(gn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>_f(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>_f(e.remoteStore,i)),n._onlineComponents=e}async function cR(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$(gn,"Using user provided OfflineComponentProvider");try{await ba(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Er("Error using user provided cache. Falling back to memory cache: "+t),await ba(n,new co)}}else $(gn,"Using default OfflineComponentProvider"),await ba(n,new oR(void 0));return n._offlineComponents}async function Ap(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($(gn,"Using user provided OnlineComponentProvider"),await If(n,n._uninitializedComponentsProvider._online)):($(gn,"Using default OnlineComponentProvider"),await If(n,new hc))),n._onlineComponents}function uR(n){return Ap(n).then(e=>e.syncEngine)}async function uo(n){const e=await Ap(n),t=e.eventManager;return t.onListen=GS.bind(null,e.syncEngine),t.onUnlisten=QS.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=KS.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=XS.bind(null,e.syncEngine),t}function lR(n,e,t,r){const i=new vu(r),s=new gu(e,i,t);return n.asyncQueue.enqueueAndForget(async()=>du(await uo(n),s)),()=>{i.Nu(),n.asyncQueue.enqueueAndForget(async()=>mu(await uo(n),s))}}function hR(n,e,t={}){const r=new Ot;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,l){const f=new vu({next:m=>{f.Nu(),o.enqueueAndForget(()=>mu(s,p));const y=m.docs.has(c);!y&&m.fromCache?l.reject(new U(P.UNAVAILABLE,"Failed to get document because the client is offline.")):y&&m.fromCache&&u&&u.source==="server"?l.reject(new U(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),p=new gu(So(c.path),f,{includeMetadataChanges:!0,Ka:!0});return du(s,p)}(await uo(n),n.asyncQueue,e,t,r)),r.promise}function fR(n,e,t={}){const r=new Ot;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,l){const f=new vu({next:m=>{f.Nu(),o.enqueueAndForget(()=>mu(s,p)),m.fromCache&&u.source==="server"?l.reject(new U(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(m)},error:m=>l.reject(m)}),p=new gu(c,f,{includeMetadataChanges:!0,Ka:!0});return du(s,p)}(await uo(n),n.asyncQueue,e,t,r)),r.promise}function dR(n,e){const t=new Ot;return n.asyncQueue.enqueueAndForget(async()=>JS(await uR(n),e,t)),t.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bp(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR="ComponentProvider",Af=new Map;function pR(n,e,t,r,i){return new Mb(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,bp(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sp="firestore.googleapis.com",bf=!0;class Sf{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new U(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Sp,this.ssl=bf}else this.host=e.host,this.ssl=e.ssl??bf;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ip;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<z1)throw new U(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Eb("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=bp(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new U(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new U(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new U(P.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Vo{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Sf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Sf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new fb;switch(r.type){case"firstParty":return new gb(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Af.get(t);r&&($(mR,"Removing Datastore"),Af.delete(t),r.terminate())}(this),Promise.resolve()}}function gR(n,e,t,r={}){var l;n=et(n,Vo);const i=Pr(e),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;i&&(Ad(`https://${c}`),bd("Firestore",!0)),s.host!==Sp&&s.host!==c&&Er("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:c,ssl:i,emulatorOptions:r};if(!Hn(u,o)&&(n._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=$e.MOCK_USER;else{f=OT(r.mockUserToken,(l=n._app)==null?void 0:l.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new U(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new $e(m)}n._authCredentials=new db(new pm(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new vn(this.firestore,e,this._query)}}class we{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ln(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new we(this.firestore,e,this._key)}toJSON(){return{type:we._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(zi(t,we._jsonSchema))return new we(e,r||null,new j(me.fromString(t.referencePath)))}}we._jsonSchemaVersion="firestore/documentReference/1.0",we._jsonSchema={type:Ae("string",we._jsonSchemaVersion),referencePath:Ae("string")};class ln extends vn{constructor(e,t,r){super(e,t,So(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new we(this.firestore,null,new j(e))}withConverter(e){return new ln(this.firestore,e,this._path)}}function Sa(n,e,...t){if(n=De(n),gm("collection","path",e),n instanceof Vo){const r=me.fromString(e,...t);return Fh(r),new ln(n,null,r)}{if(!(n instanceof we||n instanceof ln))throw new U(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return Fh(r),new ln(n.firestore,null,r)}}function vi(n,e,...t){if(n=De(n),arguments.length===1&&(e=Wc.newId()),gm("doc","path",e),n instanceof Vo){const r=me.fromString(e,...t);return Oh(r),new we(n,null,new j(r))}{if(!(n instanceof we||n instanceof ln))throw new U(P.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return Oh(r),new we(n.firestore,n instanceof ln?n.converter:null,new j(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="AsyncQueue";class Cf{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new cp(this,"async_queue_retry"),this._c=()=>{const r=Aa();r&&$(Rf,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Aa();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Aa();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Ot;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!Nr(e))throw e;$(Rf,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,qt("INTERNAL UNHANDLED ERROR: ",Pf(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=hu.createAndSchedule(this,e,t,r,s=>this.hc(s));return this.tc.push(i),i}uc(){this.nc&&G(47125,{Pc:Pf(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Pf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class jt extends Vo{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Cf,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Cf(e),this._firestoreClient=void 0,await e}}}function _R(n,e){const t=typeof n=="object"?n:Pd(),r=typeof n=="string"?n:to,i=Nc(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=VT("firestore");s&&gR(i,...s)}return i}function Lo(n){if(n._terminated)throw new U(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||yR(n),n._firestoreClient}function yR(n){var r,i,s,o;const e=n._freezeSettings(),t=pR(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(i=n._app)==null?void 0:i.options.apiKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new aR(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this._byteString=e}static fromBase64String(e){try{return new it(Fe.fromBase64String(e))}catch(t){throw new U(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new it(Fe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:it._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(zi(e,it._jsonSchema))return it.fromBase64String(e.bytes)}}it._jsonSchemaVersion="firestore/bytes/1.0",it._jsonSchema={type:Ae("string",it._jsonSchemaVersion),bytes:Ae("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Oe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ie(this._lat,e._lat)||ie(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:bt._jsonSchemaVersion}}static fromJSON(e){if(zi(e,bt._jsonSchema))return new bt(e.latitude,e.longitude)}}bt._jsonSchemaVersion="firestore/geoPoint/1.0",bt._jsonSchema={type:Ae("string",bt._jsonSchemaVersion),latitude:Ae("number"),longitude:Ae("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:pt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(zi(e,pt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new pt(e.vectorValues);throw new U(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}pt._jsonSchemaVersion="firestore/vectorValue/1.0",pt._jsonSchema={type:Ae("string",pt._jsonSchemaVersion),vectorValues:Ae("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vR=/^__.*__$/;class wR{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new yn(e,this.data,this.fieldMask,t,this.fieldTransforms):new qi(e,this.data,t,this.fieldTransforms)}}class Rp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new yn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Cp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw G(40011,{dataSource:n})}}class Tu{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Tu({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return lo(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Cp(this.dataSource)&&vR.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class TR{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||xo(e)}createContext(e,t,r,i=!1){return new Tu({dataSource:e,methodName:t,targetDoc:r,path:Oe.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Fo(n){const e=n._freezeSettings(),t=xo(n._databaseId);return new TR(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Pp(n,e,t,r,i,s={}){const o=n.createContext(s.merge||s.mergeFields?2:0,e,t,i);Iu("Data must be an object, but it was:",o,r);const c=kp(r,o);let u,l;if(s.merge)u=new nt(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const m=Cr(e,p,t);if(!o.contains(m))throw new U(P.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Mp(f,m)||f.push(m)}u=new nt(f),l=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,l=o.fieldTransforms;return new wR(new Je(c),u,l)}class Uo extends Oo{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Uo}}class Eu extends Oo{_toFieldTransform(e){return new c1(e.path,new Di)}isEqual(e){return e instanceof Eu}}function ER(n,e,t,r){const i=n.createContext(1,e,t);Iu("Data must be an object, but it was:",i,r);const s=[],o=Je.empty();_n(r,(u,l)=>{const f=xp(e,u,t);l=De(l);const p=i.childContextForFieldPath(f);if(l instanceof Uo)s.push(f);else{const m=Gi(l,p);m!=null&&(s.push(f),o.set(f,m))}});const c=new nt(s);return new Rp(o,c,i.fieldTransforms)}function IR(n,e,t,r,i,s){const o=n.createContext(1,e,t),c=[Cr(e,r,t)],u=[i];if(s.length%2!=0)throw new U(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)c.push(Cr(e,s[m])),u.push(s[m+1]);const l=[],f=Je.empty();for(let m=c.length-1;m>=0;--m)if(!Mp(l,c[m])){const y=c[m];let C=u[m];C=De(C);const D=o.childContextForFieldPath(y);if(C instanceof Uo)l.push(y);else{const x=Gi(C,D);x!=null&&(l.push(y),f.set(y,x))}}const p=new nt(l);return new Rp(f,p,o.fieldTransforms)}function AR(n,e,t,r=!1){return Gi(t,n.createContext(r?4:3,e))}function Gi(n,e){if(Dp(n=De(n)))return Iu("Unsupported field value:",e,n),kp(n,e);if(n instanceof Oo)return function(r,i){if(!Cp(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let u=Gi(c,i.childContextForArray(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=De(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return s1(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ge.fromDate(r);return{timestampValue:so(i.serializer,s)}}if(r instanceof ge){const s=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:so(i.serializer,s)}}if(r instanceof bt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof it)return{bytesValue:Qm(i.serializer,r._byteString)};if(r instanceof we){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:nu(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof pt)return function(o,c){const u=o instanceof pt?o.toArray():o;return{mapValue:{fields:{[bm]:{stringValue:Sm},[no]:{arrayValue:{values:u.map(f=>{if(typeof f!="number")throw c.createError("VectorValues must only contain numeric values.");return Jc(c.serializer,f)})}}}}}}(r,i);if(rp(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Eo(r)}`)}(n,e)}function kp(n,e){const t={};return vm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):_n(n,(r,i)=>{const s=Gi(i,e.childContextForField(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Dp(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof bt||n instanceof it||n instanceof we||n instanceof Oo||n instanceof pt||rp(n))}function Iu(n,e,t){if(!Dp(t)||!_m(t)){const r=Eo(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Cr(n,e,t){if((e=De(e))instanceof wu)return e._internalPath;if(typeof e=="string")return xp(n,e);throw lo("Field path arguments must be of type string or ",n,!1,void 0,t)}const bR=new RegExp("[~\\*/\\[\\]]");function xp(n,e,t){if(e.search(bR)>=0)throw lo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new wu(...e.split("."))._internalPath}catch{throw lo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function lo(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new U(P.INVALID_ARGUMENT,c+n+u)}function Mp(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SR{convertValue(e,t="none"){switch(mn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Te(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(dn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw G(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return _n(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var r,i,s;const t=(s=(i=(r=e.fields)==null?void 0:r[no].arrayValue)==null?void 0:i.values)==null?void 0:s.map(o=>Te(o.doubleValue));return new pt(t)}convertGeoPoint(e){return new bt(Te(e.latitude),Te(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=bo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Ri(e));default:return null}}convertTimestamp(e){const t=fn(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=me.fromString(e);le(np(r),9688,{name:e});const i=new Ci(r.get(1),r.get(3)),s=new j(r.popFirst(5));return i.isEqual(t)||qt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au extends SR{constructor(e){super(),this.firestore=e}convertBytes(e){return new it(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new we(this.firestore,null,t)}}function kt(){return new Eu("serverTimestamp")}const kf="@firebase/firestore",Df="4.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new we(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new RR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Cr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class RR extends Np{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vp(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bu{}class Lp extends bu{}function CR(n,e,...t){let r=[];e instanceof bu&&r.push(e),r=r.concat(t),function(s){const o=s.filter(u=>u instanceof Ru).length,c=s.filter(u=>u instanceof Su).length;if(o>1||o>0&&c>0)throw new U(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Su extends Lp{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Su(e,t,r)}_apply(e){const t=this._parse(e);return Op(e._query,t),new vn(e.firestore,e.converter,tc(e._query,t))}_parse(e){const t=Fo(e.firestore);return function(s,o,c,u,l,f,p){let m;if(l.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new U(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Nf(p,f);const C=[];for(const D of p)C.push(Mf(u,s,D));m={arrayValue:{values:C}}}else m=Mf(u,s,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Nf(p,f),m=AR(c,o,p,f==="in"||f==="not-in");return Ie.create(l,f,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Ru extends bu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ru(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:gt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const u of c)Op(o,u),o=tc(o,u)}(e._query,t),new vn(e.firestore,e.converter,tc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Cu extends Lp{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Cu(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new U(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new U(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new ki(s,o)}(e._query,this._field,this._direction);return new vn(e.firestore,e.converter,Xb(e._query,t))}}function PR(n,e="asc"){const t=e,r=Cr("orderBy",n);return Cu._create(r,t)}function Mf(n,e,t){if(typeof(t=De(t))=="string"){if(t==="")throw new U(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Nm(e)&&t.indexOf("/")!==-1)throw new U(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(me.fromString(t));if(!j.isDocumentKey(r))throw new U(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Wh(n,new j(r))}if(t instanceof we)return Wh(n,t._key);throw new U(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Eo(t)}.`)}function Nf(n,e){if(!Array.isArray(n)||n.length===0)throw new U(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Op(n,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Fp(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class hi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Nn extends Np{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ms(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Cr("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Nn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Nn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Nn._jsonSchema={type:Ae("string",Nn._jsonSchemaVersion),bundleSource:Ae("string","DocumentSnapshot"),bundleName:Ae("string"),bundle:Ae("string")};class Ms extends Nn{data(e={}){return super.data(e)}}class Vn{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new hi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ms(this._firestore,this._userDataWriter,r.key,r,new hi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const u=new Ms(i._firestore,i._userDataWriter,c.doc.key,c.doc,new hi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const u=new Ms(i._firestore,i._userDataWriter,c.doc.key,c.doc,new hi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let l=-1,f=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:kR(c.type),doc:u,oldIndex:l,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Vn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Wc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function kR(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return G(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Vn._jsonSchemaVersion="firestore/querySnapshot/1.0",Vn._jsonSchema={type:Ae("string",Vn._jsonSchemaVersion),bundleSource:Ae("string","QuerySnapshot"),bundleName:Ae("string"),bundle:Ae("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DR(n){n=et(n,we);const e=et(n.firestore,jt),t=Lo(e);return hR(t,n._key).then(r=>Up(e,n,r))}function xR(n){n=et(n,vn);const e=et(n.firestore,jt),t=Lo(e),r=new Au(e);return Vp(n._query),fR(t,n._query).then(i=>new Vn(e,r,n,i))}function Vf(n,e,t){n=et(n,we);const r=et(n.firestore,jt),i=Fp(n.converter,e,t),s=Fo(r);return Bo(r,[Pp(s,"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,ot.none())])}function MR(n,e,t,...r){n=et(n,we);const i=et(n.firestore,jt),s=Fo(i);let o;return o=typeof(e=De(e))=="string"||e instanceof wu?IR(s,"updateDoc",n._key,e,t,r):ER(s,"updateDoc",n._key,e),Bo(i,[o.toMutation(n._key,ot.exists(!0))])}function Lf(n){return Bo(et(n.firestore,jt),[new Zc(n._key,ot.none())])}function Ra(n,e){const t=et(n.firestore,jt),r=vi(n),i=Fp(n.converter,e),s=Fo(n.firestore);return Bo(t,[Pp(s,"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,ot.exists(!1))]).then(()=>r)}function Of(n,...e){var l,f,p;n=De(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||xf(e[r])||(t=e[r++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(xf(e[r])){const m=e[r];e[r]=(l=m.next)==null?void 0:l.bind(m),e[r+1]=(f=m.error)==null?void 0:f.bind(m),e[r+2]=(p=m.complete)==null?void 0:p.bind(m)}let s,o,c;if(n instanceof we)o=et(n.firestore,jt),c=So(n._key.path),s={next:m=>{e[r]&&e[r](Up(o,n,m))},error:e[r+1],complete:e[r+2]};else{const m=et(n,vn);o=et(m.firestore,jt),c=m._query;const y=new Au(o);s={next:C=>{e[r]&&e[r](new Vn(o,y,m,C))},error:e[r+1],complete:e[r+2]},Vp(n._query)}const u=Lo(o);return lR(u,c,i,s)}function Bo(n,e){const t=Lo(n);return dR(t,e)}function Up(n,e,t){const r=t.docs.get(e._key),i=new Au(n);return new Nn(n,i,e._key,r,new hi(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){hb(kr),wr(new jn("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new jt(new mb(r.getProvider("auth-internal")),new _b(o,r.getProvider("app-check-internal")),Nb(o,i),o);return s={useFetchStreams:t,...s},c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),cn(kf,Df,e),cn(kf,Df,"esm2020")})();var NR="firebase",VR="12.8.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */cn(NR,VR,"app");const LR={apiKey:"AIzaSyCuAkWbQRZhmx4ULJT0qoHOZmVl9dUez8U",authDomain:"indian-family-tree-1990.firebaseapp.com",projectId:"indian-family-tree-1990",storageBucket:"indian-family-tree-1990.firebasestorage.app",messagingSenderId:"1061764015655",appId:"1:1061764015655:web:a61a61044ede9e7559d002"},Bp=Cd(LR),Ca=ub(Bp),Ns=_R(Bp),$p=new Dt;$p.setCustomParameters({prompt:"select_account"});class OR{constructor(){this.currentUser=null,this.authStateListeners=[]}init(){return new Promise(e=>{XI(Ca,async t=>{t?(this.currentUser={uid:t.uid,email:t.email,displayName:t.displayName,photoURL:t.photoURL},await this.createUserDocument(t)):this.currentUser=null,this.authStateListeners.forEach(r=>r(this.currentUser)),e(this.currentUser)})})}async signInWithGoogle(){try{return{success:!0,user:(await yA(Ca,$p)).user}}catch(e){return console.error("Google sign-in error:",e),{success:!1,error:e.message}}}async signOut(){try{return await JI(Ca),{success:!0}}catch(e){return console.error("Sign-out error:",e),{success:!1,error:e.message}}}async createUserDocument(e){const t=vi(Ns,"users",e.uid);(await DR(t)).exists()?await Vf(t,{lastLoginAt:kt()},{merge:!0}):await Vf(t,{displayName:e.displayName,email:e.email,photoURL:e.photoURL,createdAt:kt(),lastLoginAt:kt()})}getCurrentUser(){return this.currentUser}isAuthenticated(){return this.currentUser!==null}onAuthStateChange(e){return this.authStateListeners.push(e),()=>{this.authStateListeners=this.authStateListeners.filter(t=>t!==e)}}}const Ln=new OR;class FR{constructor(){this.members=[],this.relationships=[],this.currentTreeId=null,this.unsubscribeMembers=null,this.unsubscribeRelationships=null,this.dataChangeListeners=[]}getUserTreesRef(){const e=Ln.getCurrentUser();if(!e)throw new Error("User not authenticated");return Sa(Ns,"users",e.uid,"familyTrees")}getMembersRef(){const e=Ln.getCurrentUser();return!e||!this.currentTreeId?null:Sa(Ns,"users",e.uid,"familyTrees",this.currentTreeId,"members")}getRelationshipsRef(){const e=Ln.getCurrentUser();return!e||!this.currentTreeId?null:Sa(Ns,"users",e.uid,"familyTrees",this.currentTreeId,"relationships")}async createFamilyTree(e="My Family Tree"){const t=this.getUserTreesRef(),r=await Ra(t,{name:e,createdAt:kt(),updatedAt:kt()});return this.currentTreeId=r.id,await this.subscribeToTree(),r.id}async getFamilyTrees(){const e=this.getUserTreesRef();return(await xR(CR(e,PR("createdAt","desc")))).docs.map(r=>({id:r.id,...r.data()}))}async loadFamilyTree(e){return this.currentTreeId=e,await this.subscribeToTree(),this.currentTreeId}async subscribeToTree(){this.unsubscribe();const e=this.getMembersRef(),t=this.getRelationshipsRef();!e||!t||(this.unsubscribeMembers=Of(e,r=>{this.members=r.docs.map(i=>({id:i.id,...i.data()})),this.notifyDataChange()}),this.unsubscribeRelationships=Of(t,r=>{this.relationships=r.docs.map(i=>({id:i.id,...i.data()})),this.notifyDataChange()}))}unsubscribe(){this.unsubscribeMembers&&(this.unsubscribeMembers(),this.unsubscribeMembers=null),this.unsubscribeRelationships&&(this.unsubscribeRelationships(),this.unsubscribeRelationships=null)}async addMember(e){const t=this.getMembersRef();if(!t)throw new Error("No family tree selected");return{id:(await Ra(t,{...e,createdAt:kt(),updatedAt:kt()})).id,...e}}async updateMember(e,t){const r=this.getMembersRef();if(!r)throw new Error("No family tree selected");const i=vi(r,e);return await MR(i,{...t,updatedAt:kt()}),{id:e,...t}}async deleteMember(e){const t=this.getMembersRef();if(!t)throw new Error("No family tree selected");await Lf(vi(t,e));const r=this.getRelationshipsRef(),i=this.relationships.filter(s=>s.member1Id===e||s.member2Id===e);for(const s of i)await Lf(vi(r,s.id))}getMember(e){return this.members.find(t=>t.id===e)}getAllMembers(){return this.members.map(e=>{const t=this.getSpouse(e.id);return{...e,spouseId:t?t.id:null}})}async addSpouse(e,t,r=null){const i=this.getRelationshipsRef();if(!i)throw new Error("No family tree selected");return{id:(await Ra(i,{type:"spouse",member1Id:e,member2Id:t,marriageDate:r,createdAt:kt()})).id,type:"spouse",member1Id:e,member2Id:t,marriageDate:r}}async addParent(e,t){const r=this.getMember(e);if(r){const i=r.parentIds||[];i.includes(t)||(i.push(t),await this.updateMember(e,{parentIds:i}))}}getSpouse(e){const t=this.relationships.find(r=>r.type==="spouse"&&(r.member1Id===e||r.member2Id===e));if(t){const r=t.member1Id===e?t.member2Id:t.member1Id;return this.getMember(r)}return null}getChildren(e){return this.members.filter(t=>t.parentIds&&t.parentIds.includes(e))}getParents(e){const t=this.getMember(e);return t&&t.parentIds?t.parentIds.map(r=>this.getMember(r)).filter(Boolean):[]}getSiblings(e){const t=this.getMember(e);return!t||!t.parentIds||t.parentIds.length===0?[]:this.members.filter(r=>r.id!==e&&r.parentIds&&r.parentIds.some(i=>t.parentIds.includes(i)))}searchMembers(e){const t=e.toLowerCase();return this.members.filter(r=>r.name.toLowerCase().includes(t)||r.profession&&r.profession.toLowerCase().includes(t)||r.birthPlace&&r.birthPlace.toLowerCase().includes(t)||r.gotra&&r.gotra.toLowerCase().includes(t))}getMembersByGeneration(e){return this.members.map(r=>({...r,generation:this.calculateGeneration(r.id)})).filter(r=>r.generation===e)}calculateGeneration(e,t=new Set){if(t.has(e))return 0;t.add(e);const r=this.getMember(e);if(!r||!r.parentIds||r.parentIds.length===0)return 1;const i=r.parentIds.map(s=>this.calculateGeneration(s,t));return Math.max(...i)+1}getStatistics(){const e=this.members.filter(i=>i.gender==="male").length,t=this.members.filter(i=>i.gender==="female").length,r=new Set(this.members.map(i=>this.calculateGeneration(i.id)));return{totalMembers:this.members.length,males:e,females:t,generations:r.size,alive:this.members.filter(i=>i.isAlive).length,deceased:this.members.filter(i=>!i.isAlive).length}}getRecentMembers(e=5){return[...this.members].sort((t,r)=>{var o,c,u,l;const i=((c=(o=t.createdAt)==null?void 0:o.toMillis)==null?void 0:c.call(o))||0;return(((l=(u=r.createdAt)==null?void 0:u.toMillis)==null?void 0:l.call(u))||0)-i}).slice(0,e)}getUpcomingBirthdays(e=10){const t=new Date,r=t.getFullYear();return this.members.filter(s=>s.birthDate&&s.isAlive).map(s=>{const o=new Date(s.birthDate),c=new Date(r,o.getMonth(),o.getDate());c<t&&c.setFullYear(r+1);const u=Math.ceil((c-t)/(1e3*60*60*24));return{member:s,date:c.toLocaleDateString("en-IN",{month:"short",day:"numeric"}),daysUntil:u}}).sort((s,o)=>s.daysUntil-o.daysUntil).slice(0,e)}exportData(){return{members:this.members,relationships:this.relationships,exportDate:new Date().toISOString(),version:"2.0"}}clearLocalData(){this.members=[],this.relationships=[],this.currentTreeId=null,this.unsubscribe()}onDataChange(e){return this.dataChangeListeners.push(e),()=>{this.dataChangeListeners=this.dataChangeListeners.filter(t=>t!==e)}}notifyDataChange(){this.dataChangeListeners.forEach(e=>e()),window.dispatchEvent(new CustomEvent("familyDataChanged"))}}const Yn=new FR;let On,Fn,Un,fc,dc,mc,qe,ft,dt,Bn,Cn=null;document.addEventListener("DOMContentLoaded",async()=>{UR(),BR(),Ki(),await Ln.init(),Yi(),Ln.onAuthStateChange(zR)});function UR(){On=document.getElementById("welcomeScreen"),Fn=document.getElementById("authSection"),Un=document.getElementById("userSection"),fc=document.getElementById("userAvatar"),dc=document.getElementById("userName"),mc=document.getElementById("userEmail"),qe=document.getElementById("userDropdown"),ft=document.getElementById("treesModal"),dt=document.getElementById("createTreeModal"),Bn=document.getElementById("loadingOverlay")}function BR(){var n,e,t,r,i,s,o,c,u,l,f;(n=document.getElementById("googleSignInBtn"))==null||n.addEventListener("click",Ff),(e=document.getElementById("welcomeSignInBtn"))==null||e.addEventListener("click",Ff),(t=document.getElementById("signOutBtn"))==null||t.addEventListener("click",$R),(r=document.getElementById("userMenuBtn"))==null||r.addEventListener("click",WR),(i=document.getElementById("myTreesBtn"))==null||i.addEventListener("click",zp),(s=document.getElementById("newTreeBtn"))==null||s.addEventListener("click",()=>{qe==null||qe.classList.add("hidden"),fo()}),(o=document.getElementById("closeTreesModal"))==null||o.addEventListener("click",ho),(c=document.getElementById("createTreeBtn"))==null||c.addEventListener("click",fo),(u=document.getElementById("closeCreateTreeModal"))==null||u.addEventListener("click",Vs),(l=document.getElementById("cancelCreateTreeBtn"))==null||l.addEventListener("click",Vs),(f=document.getElementById("confirmCreateTreeBtn"))==null||f.addEventListener("click",KR),document.addEventListener("click",p=>{p.target.closest(".user-menu")||qe==null||qe.classList.add("hidden")}),ft==null||ft.addEventListener("click",p=>{p.target===ft&&ho()}),dt==null||dt.addEventListener("click",p=>{p.target===dt&&Vs()})}async function Ff(){Ki();const n=await Ln.signInWithGoogle();Yi(),n.success||alert("Sign in failed: "+n.error)}async function $R(){qe==null||qe.classList.add("hidden"),Ki(),Yn.clearLocalData(),await Ln.signOut(),Yi()}async function zR(n){n?(qR(n),await jR()):HR()}function qR(n){var e;On==null||On.classList.add("hidden"),Fn==null||Fn.classList.add("hidden"),Un==null||Un.classList.remove("hidden"),fc&&(fc.src=n.photoURL||"https://via.placeholder.com/32"),dc&&(dc.textContent=((e=n.displayName)==null?void 0:e.split(" ")[0])||"User"),mc&&(mc.textContent=n.email)}function HR(){On==null||On.classList.remove("hidden"),Fn==null||Fn.classList.remove("hidden"),Un==null||Un.classList.add("hidden"),Cn&&(Cn=null)}async function jR(){try{const n=await Yn.getFamilyTrees();n.length===0?fo():n.length===1?await Pu(n[0].id):zp()}catch(n){console.error("Error loading trees:",n),fo()}}async function Pu(n){Ki();try{await Yn.loadFamilyTree(n),Cn?(Cn.render(),Cn.updateStatistics()):(Cn=new ST(Yn),Cn.initWithService()),ho()}catch(e){console.error("Error loading tree:",e),alert("Failed to load family tree")}Yi()}function WR(){qe==null||qe.classList.toggle("hidden")}function zp(){qe==null||qe.classList.add("hidden"),GR(),ft==null||ft.classList.remove("hidden")}function ho(){ft==null||ft.classList.add("hidden")}async function GR(){const n=document.getElementById("treesList");if(n)try{const e=await Yn.getFamilyTrees();if(e.length===0){n.innerHTML=`
                <div class="trees-empty">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                    </svg>
                    <p>No family trees yet</p>
                </div>
            `;return}n.innerHTML=e.map(t=>`
            <div class="tree-item ${t.id===Yn.currentTreeId?"active":""}"
                 data-tree-id="${t.id}">
                <div class="tree-item-info">
                    <span class="tree-item-name">${t.name}</span>
                    <span class="tree-item-meta">Created ${YR(t.createdAt)}</span>
                </div>
                <svg class="tree-item-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
            </div>
        `).join(""),n.querySelectorAll(".tree-item").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.treeId;Pu(r)})})}catch(e){console.error("Error populating trees list:",e)}}function fo(){ho(),document.getElementById("treeName").value="",dt==null||dt.classList.remove("hidden")}function Vs(){dt==null||dt.classList.add("hidden")}async function KR(){const n=document.getElementById("treeName"),e=(n==null?void 0:n.value.trim())||"My Family Tree";Ki(),Vs();try{const t=await Yn.createFamilyTree(e);await Pu(t)}catch(t){console.error("Error creating tree:",t),alert("Failed to create family tree"),Yi()}}function Ki(){Bn==null||Bn.classList.remove("hidden")}function Yi(){Bn==null||Bn.classList.add("hidden")}function YR(n){return n?(n.toDate?n.toDate():new Date(n)).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}
