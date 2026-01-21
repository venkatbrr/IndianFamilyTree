(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class e_{constructor(){this.members=[],this.relationships=[],this.loadFromStorage()}addMember(e){const t={id:this.generateId(),...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return this.members.push(t),this.saveToStorage(),t}updateMember(e,t){const r=this.members.findIndex(i=>i.id===e);return r!==-1?(this.members[r]={...this.members[r],...t,updatedAt:new Date().toISOString()},this.saveToStorage(),this.members[r]):null}deleteMember(e){this.members=this.members.filter(t=>t.id!==e),this.relationships=this.relationships.filter(t=>t.member1Id!==e&&t.member2Id!==e),this.saveToStorage()}getMember(e){return this.members.find(t=>t.id===e)}getAllMembers(){return this.members.map(e=>{const t=this.getSpouse(e.id);return{...e,spouseId:t?t.id:null}})}addSpouse(e,t,r=null){const i={id:this.generateId(),type:"spouse",member1Id:e,member2Id:t,marriageDate:r,createdAt:new Date().toISOString()};return this.relationships.push(i),this.saveToStorage(),i}addParent(e,t){const r=this.getMember(e);r&&(r.parentIds||(r.parentIds=[]),r.parentIds.includes(t)||(r.parentIds.push(t),this.updateMember(e,{parentIds:r.parentIds})))}getSpouse(e){const t=this.relationships.find(r=>r.type==="spouse"&&(r.member1Id===e||r.member2Id===e));if(t){const r=t.member1Id===e?t.member2Id:t.member1Id;return this.getMember(r)}return null}getChildren(e){return this.members.filter(t=>t.parentIds&&t.parentIds.includes(e))}getParents(e){const t=this.getMember(e);return t&&t.parentIds?t.parentIds.map(r=>this.getMember(r)).filter(Boolean):[]}getSiblings(e){const t=this.getMember(e);return!t||!t.parentIds||t.parentIds.length===0?[]:this.members.filter(r=>r.id!==e&&r.parentIds&&r.parentIds.some(i=>t.parentIds.includes(i)))}searchMembers(e){const t=e.toLowerCase();return this.members.filter(r=>r.name.toLowerCase().includes(t)||r.profession&&r.profession.toLowerCase().includes(t)||r.birthPlace&&r.birthPlace.toLowerCase().includes(t)||r.gotra&&r.gotra.toLowerCase().includes(t))}getMembersByGeneration(e){return this.members.map(r=>({...r,generation:this.calculateGeneration(r.id)})).filter(r=>r.generation===e)}calculateGeneration(e,t=new Set){if(t.has(e))return 0;t.add(e);const r=this.getMember(e);if(!r||!r.parentIds||r.parentIds.length===0)return 1;const i=r.parentIds.map(s=>this.calculateGeneration(s,t));return Math.max(...i)+1}getStatistics(){const e=this.members.filter(i=>i.gender==="male").length,t=this.members.filter(i=>i.gender==="female").length,r=new Set(this.members.map(i=>this.calculateGeneration(i.id)));return{totalMembers:this.members.length,males:e,females:t,generations:r.size,alive:this.members.filter(i=>i.isAlive).length,deceased:this.members.filter(i=>!i.isAlive).length}}getRecentMembers(e=5){return[...this.members].sort((t,r)=>new Date(r.createdAt)-new Date(t.createdAt)).slice(0,e)}getUpcomingBirthdays(e=10){const t=new Date,r=t.getFullYear();return this.members.filter(s=>s.birthDate&&s.isAlive).map(s=>{const o=new Date(s.birthDate),c=new Date(r,o.getMonth(),o.getDate());c<t&&c.setFullYear(r+1);const l=Math.ceil((c-t)/(1e3*60*60*24));return{member:s,date:c.toLocaleDateString("en-IN",{month:"short",day:"numeric"}),daysUntil:l}}).sort((s,o)=>s.daysUntil-o.daysUntil).slice(0,e)}exportData(){return{members:this.members,relationships:this.relationships,exportDate:new Date().toISOString(),version:"1.0"}}importData(e){e.members&&Array.isArray(e.members)&&(this.members=e.members),e.relationships&&Array.isArray(e.relationships)&&(this.relationships=e.relationships),this.saveToStorage()}clearAllData(){this.members=[],this.relationships=[],this.saveToStorage()}saveToStorage(){try{localStorage.setItem("familyTreeMembers",JSON.stringify(this.members)),localStorage.setItem("familyTreeRelationships",JSON.stringify(this.relationships))}catch(e){console.error("Error saving to storage:",e)}}loadFromStorage(){try{const e=localStorage.getItem("familyTreeMembers"),t=localStorage.getItem("familyTreeRelationships");e&&(this.members=JSON.parse(e)),t&&(this.relationships=JSON.parse(t))}catch(e){console.error("Error loading from storage:",e)}}generateId(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}`}}function ks(n,e){return n==null||e==null?NaN:n<e?-1:n>e?1:n>=e?0:NaN}function t_(n,e){return n==null||e==null?NaN:e<n?-1:e>n?1:e>=n?0:NaN}function Rc(n){let e,t,r;n.length!==2?(e=ks,t=(c,l)=>ks(n(c),l),r=(c,l)=>n(c)-l):(e=n===ks||n===t_?n:n_,t=n,r=n);function i(c,l,u=0,d=c.length){if(u<d){if(e(l,l)!==0)return d;do{const p=u+d>>>1;t(c[p],l)<0?u=p+1:d=p}while(u<d)}return u}function s(c,l,u=0,d=c.length){if(u<d){if(e(l,l)!==0)return d;do{const p=u+d>>>1;t(c[p],l)<=0?u=p+1:d=p}while(u<d)}return u}function o(c,l,u=0,d=c.length){const p=i(c,l,u,d-1);return p>u&&r(c[p-1],l)>-r(c[p],l)?p-1:p}return{left:i,center:o,right:s}}function n_(){return 0}function r_(n){return n===null?NaN:+n}const i_=Rc(ks),s_=i_.right;Rc(r_).center;const o_=Math.sqrt(50),a_=Math.sqrt(10),c_=Math.sqrt(2);function lf(n,e,t){const r=(e-n)/Math.max(0,t),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),o=s>=o_?10:s>=a_?5:s>=c_?2:1;let c,l,u;return i<0?(u=Math.pow(10,-i)/o,c=Math.round(n*u),l=Math.round(e*u),c/u<n&&++c,l/u>e&&--l,u=-u):(u=Math.pow(10,i)*o,c=Math.round(n/u),l=Math.round(e/u),c*u<n&&++c,l*u>e&&--l),l<c&&.5<=t&&t<2?lf(n,e,t*2):[c,l,u]}function zu(n,e,t){return e=+e,n=+n,t=+t,lf(n,e,t)[2]}function Hu(n,e,t){e=+e,n=+n,t=+t;const r=e<n,i=r?zu(e,n,t):zu(n,e,t);return(r?-1:1)*(i<0?1/-i:i)}function l_(n,e){let t;if(e===void 0)for(const r of n)r!=null&&(t>r||t===void 0&&r>=r)&&(t=r);else{let r=-1;for(let i of n)(i=e(i,++r,n))!=null&&(t>i||t===void 0&&i>=i)&&(t=i)}return t}function u_(n){return n}var h_=3,ju=1e-6;function d_(n){return"translate("+n+",0)"}function f_(n){return e=>+n(e)}function m_(n,e){return e=Math.max(0,n.bandwidth()-e*2)/2,n.round()&&(e=Math.round(e)),t=>+n(t)+e}function p_(){return!this.__axis}function g_(n,e){var t=[],r=null,i=null,s=6,o=6,c=3,l=typeof window<"u"&&window.devicePixelRatio>1?0:.5,u=1,d="y",p=d_;function m(_){var A=r??(e.ticks?e.ticks.apply(e,t):e.domain()),k=i??(e.tickFormat?e.tickFormat.apply(e,t):u_),x=Math.max(s,0)+c,C=e.range(),M=+C[0]+l,F=+C[C.length-1]+l,$=(e.bandwidth?m_:f_)(e.copy(),l),K=_.selection?_.selection():_,L=K.selectAll(".domain").data([null]),T=K.selectAll(".tick").data(A,e).order(),y=T.exit(),v=T.enter().append("g").attr("class","tick"),I=T.select("line"),E=T.select("text");L=L.merge(L.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),T=T.merge(v),I=I.merge(v.append("line").attr("stroke","currentColor").attr(d+"2",u*s)),E=E.merge(v.append("text").attr("fill","currentColor").attr(d,u*x).attr("dy","0.71em")),_!==K&&(L=L.transition(_),T=T.transition(_),I=I.transition(_),E=E.transition(_),y=y.transition(_).attr("opacity",ju).attr("transform",function(b){return isFinite(b=$(b))?p(b+l):this.getAttribute("transform")}),v.attr("opacity",ju).attr("transform",function(b){var w=this.parentNode.__axis;return p((w&&isFinite(w=w(b))?w:$(b))+l)})),y.remove(),L.attr("d",o?"M"+M+","+u*o+"V"+l+"H"+F+"V"+u*o:"M"+M+","+l+"H"+F),T.attr("opacity",1).attr("transform",function(b){return p($(b)+l)}),I.attr(d+"2",u*s),E.attr(d,u*x).text(k),K.filter(p_).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor","middle"),K.each(function(){this.__axis=$})}return m.scale=function(_){return arguments.length?(e=_,m):e},m.ticks=function(){return t=Array.from(arguments),m},m.tickArguments=function(_){return arguments.length?(t=_==null?[]:Array.from(_),m):t.slice()},m.tickValues=function(_){return arguments.length?(r=_==null?null:Array.from(_),m):r&&r.slice()},m.tickFormat=function(_){return arguments.length?(i=_,m):i},m.tickSize=function(_){return arguments.length?(s=o=+_,m):s},m.tickSizeInner=function(_){return arguments.length?(s=+_,m):s},m.tickSizeOuter=function(_){return arguments.length?(o=+_,m):o},m.tickPadding=function(_){return arguments.length?(c=+_,m):c},m.offset=function(_){return arguments.length?(l=+_,m):l},m}function __(n){return g_(h_,n)}var y_={value:()=>{}};function Cc(){for(var n=0,e=arguments.length,t={},r;n<e;++n){if(!(r=arguments[n]+"")||r in t||/[\s.]/.test(r))throw new Error("illegal type: "+r);t[r]=[]}return new xs(t)}function xs(n){this._=n}function v_(n,e){return n.trim().split(/^|\s+/).map(function(t){var r="",i=t.indexOf(".");if(i>=0&&(r=t.slice(i+1),t=t.slice(0,i)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:r}})}xs.prototype=Cc.prototype={constructor:xs,on:function(n,e){var t=this._,r=v_(n+"",t),i,s=-1,o=r.length;if(arguments.length<2){for(;++s<o;)if((i=(n=r[s]).type)&&(i=w_(t[i],n.name)))return i;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++s<o;)if(i=(n=r[s]).type)t[i]=Gu(t[i],n.name,e);else if(e==null)for(i in t)t[i]=Gu(t[i],n.name,null);return this},copy:function(){var n={},e=this._;for(var t in e)n[t]=e[t].slice();return new xs(n)},call:function(n,e){if((i=arguments.length-2)>0)for(var t=new Array(i),r=0,i,s;r<i;++r)t[r]=arguments[r+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],r=0,i=s.length;r<i;++r)s[r].value.apply(e,t)},apply:function(n,e,t){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(e,t)}};function w_(n,e){for(var t=0,r=n.length,i;t<r;++t)if((i=n[t]).name===e)return i.value}function Gu(n,e,t){for(var r=0,i=n.length;r<i;++r)if(n[r].name===e){n[r]=y_,n=n.slice(0,r).concat(n.slice(r+1));break}return t!=null&&n.push({name:e,value:t}),n}var $a="http://www.w3.org/1999/xhtml";const Wu={svg:"http://www.w3.org/2000/svg",xhtml:$a,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Eo(n){var e=n+="",t=e.indexOf(":");return t>=0&&(e=n.slice(0,t))!=="xmlns"&&(n=n.slice(t+1)),Wu.hasOwnProperty(e)?{space:Wu[e],local:n}:n}function T_(n){return function(){var e=this.ownerDocument,t=this.namespaceURI;return t===$a&&e.documentElement.namespaceURI===$a?e.createElement(n):e.createElementNS(t,n)}}function E_(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function uf(n){var e=Eo(n);return(e.local?E_:T_)(e)}function I_(){}function Pc(n){return n==null?I_:function(){return this.querySelector(n)}}function b_(n){typeof n!="function"&&(n=Pc(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=new Array(o),l,u,d=0;d<o;++d)(l=s[d])&&(u=n.call(l,l.__data__,d,s))&&("__data__"in l&&(u.__data__=l.__data__),c[d]=u);return new at(r,this._parents)}function A_(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function S_(){return[]}function hf(n){return n==null?S_:function(){return this.querySelectorAll(n)}}function R_(n){return function(){return A_(n.apply(this,arguments))}}function C_(n){typeof n=="function"?n=R_(n):n=hf(n);for(var e=this._groups,t=e.length,r=[],i=[],s=0;s<t;++s)for(var o=e[s],c=o.length,l,u=0;u<c;++u)(l=o[u])&&(r.push(n.call(l,l.__data__,u,o)),i.push(l));return new at(r,i)}function df(n){return function(){return this.matches(n)}}function ff(n){return function(e){return e.matches(n)}}var P_=Array.prototype.find;function k_(n){return function(){return P_.call(this.children,n)}}function x_(){return this.firstElementChild}function D_(n){return this.select(n==null?x_:k_(typeof n=="function"?n:ff(n)))}var N_=Array.prototype.filter;function M_(){return Array.from(this.children)}function V_(n){return function(){return N_.call(this.children,n)}}function O_(n){return this.selectAll(n==null?M_:V_(typeof n=="function"?n:ff(n)))}function L_(n){typeof n!="function"&&(n=df(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=[],l,u=0;u<o;++u)(l=s[u])&&n.call(l,l.__data__,u,s)&&c.push(l);return new at(r,this._parents)}function mf(n){return new Array(n.length)}function U_(){return new at(this._enter||this._groups.map(mf),this._parents)}function Gs(n,e){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=e}Gs.prototype={constructor:Gs,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,e){return this._parent.insertBefore(n,e)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function F_(n){return function(){return n}}function B_(n,e,t,r,i,s){for(var o=0,c,l=e.length,u=s.length;o<u;++o)(c=e[o])?(c.__data__=s[o],r[o]=c):t[o]=new Gs(n,s[o]);for(;o<l;++o)(c=e[o])&&(i[o]=c)}function $_(n,e,t,r,i,s,o){var c,l,u=new Map,d=e.length,p=s.length,m=new Array(d),_;for(c=0;c<d;++c)(l=e[c])&&(m[c]=_=o.call(l,l.__data__,c,e)+"",u.has(_)?i[c]=l:u.set(_,l));for(c=0;c<p;++c)_=o.call(n,s[c],c,s)+"",(l=u.get(_))?(r[c]=l,l.__data__=s[c],u.delete(_)):t[c]=new Gs(n,s[c]);for(c=0;c<d;++c)(l=e[c])&&u.get(m[c])===l&&(i[c]=l)}function q_(n){return n.__data__}function z_(n,e){if(!arguments.length)return Array.from(this,q_);var t=e?$_:B_,r=this._parents,i=this._groups;typeof n!="function"&&(n=F_(n));for(var s=i.length,o=new Array(s),c=new Array(s),l=new Array(s),u=0;u<s;++u){var d=r[u],p=i[u],m=p.length,_=H_(n.call(d,d&&d.__data__,u,r)),A=_.length,k=c[u]=new Array(A),x=o[u]=new Array(A),C=l[u]=new Array(m);t(d,p,k,x,C,_,e);for(var M=0,F=0,$,K;M<A;++M)if($=k[M]){for(M>=F&&(F=M+1);!(K=x[F])&&++F<A;);$._next=K||null}}return o=new at(o,r),o._enter=c,o._exit=l,o}function H_(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function j_(){return new at(this._exit||this._groups.map(mf),this._parents)}function G_(n,e,t){var r=this.enter(),i=this,s=this.exit();return typeof n=="function"?(r=n(r),r&&(r=r.selection())):r=r.append(n+""),e!=null&&(i=e(i),i&&(i=i.selection())),t==null?s.remove():t(s),r&&i?r.merge(i).order():i}function W_(n){for(var e=n.selection?n.selection():n,t=this._groups,r=e._groups,i=t.length,s=r.length,o=Math.min(i,s),c=new Array(i),l=0;l<o;++l)for(var u=t[l],d=r[l],p=u.length,m=c[l]=new Array(p),_,A=0;A<p;++A)(_=u[A]||d[A])&&(m[A]=_);for(;l<i;++l)c[l]=t[l];return new at(c,this._parents)}function K_(){for(var n=this._groups,e=-1,t=n.length;++e<t;)for(var r=n[e],i=r.length-1,s=r[i],o;--i>=0;)(o=r[i])&&(s&&o.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(o,s),s=o);return this}function Y_(n){n||(n=Q_);function e(p,m){return p&&m?n(p.__data__,m.__data__):!p-!m}for(var t=this._groups,r=t.length,i=new Array(r),s=0;s<r;++s){for(var o=t[s],c=o.length,l=i[s]=new Array(c),u,d=0;d<c;++d)(u=o[d])&&(l[d]=u);l.sort(e)}return new at(i,this._parents).order()}function Q_(n,e){return n<e?-1:n>e?1:n>=e?0:NaN}function X_(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function J_(){return Array.from(this)}function Z_(){for(var n=this._groups,e=0,t=n.length;e<t;++e)for(var r=n[e],i=0,s=r.length;i<s;++i){var o=r[i];if(o)return o}return null}function ey(){let n=0;for(const e of this)++n;return n}function ty(){return!this.node()}function ny(n){for(var e=this._groups,t=0,r=e.length;t<r;++t)for(var i=e[t],s=0,o=i.length,c;s<o;++s)(c=i[s])&&n.call(c,c.__data__,s,i);return this}function ry(n){return function(){this.removeAttribute(n)}}function iy(n){return function(){this.removeAttributeNS(n.space,n.local)}}function sy(n,e){return function(){this.setAttribute(n,e)}}function oy(n,e){return function(){this.setAttributeNS(n.space,n.local,e)}}function ay(n,e){return function(){var t=e.apply(this,arguments);t==null?this.removeAttribute(n):this.setAttribute(n,t)}}function cy(n,e){return function(){var t=e.apply(this,arguments);t==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,t)}}function ly(n,e){var t=Eo(n);if(arguments.length<2){var r=this.node();return t.local?r.getAttributeNS(t.space,t.local):r.getAttribute(t)}return this.each((e==null?t.local?iy:ry:typeof e=="function"?t.local?cy:ay:t.local?oy:sy)(t,e))}function pf(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function uy(n){return function(){this.style.removeProperty(n)}}function hy(n,e,t){return function(){this.style.setProperty(n,e,t)}}function dy(n,e,t){return function(){var r=e.apply(this,arguments);r==null?this.style.removeProperty(n):this.style.setProperty(n,r,t)}}function fy(n,e,t){return arguments.length>1?this.each((e==null?uy:typeof e=="function"?dy:hy)(n,e,t??"")):Sr(this.node(),n)}function Sr(n,e){return n.style.getPropertyValue(e)||pf(n).getComputedStyle(n,null).getPropertyValue(e)}function my(n){return function(){delete this[n]}}function py(n,e){return function(){this[n]=e}}function gy(n,e){return function(){var t=e.apply(this,arguments);t==null?delete this[n]:this[n]=t}}function _y(n,e){return arguments.length>1?this.each((e==null?my:typeof e=="function"?gy:py)(n,e)):this.node()[n]}function gf(n){return n.trim().split(/^|\s+/)}function kc(n){return n.classList||new _f(n)}function _f(n){this._node=n,this._names=gf(n.getAttribute("class")||"")}_f.prototype={add:function(n){var e=this._names.indexOf(n);e<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var e=this._names.indexOf(n);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function yf(n,e){for(var t=kc(n),r=-1,i=e.length;++r<i;)t.add(e[r])}function vf(n,e){for(var t=kc(n),r=-1,i=e.length;++r<i;)t.remove(e[r])}function yy(n){return function(){yf(this,n)}}function vy(n){return function(){vf(this,n)}}function wy(n,e){return function(){(e.apply(this,arguments)?yf:vf)(this,n)}}function Ty(n,e){var t=gf(n+"");if(arguments.length<2){for(var r=kc(this.node()),i=-1,s=t.length;++i<s;)if(!r.contains(t[i]))return!1;return!0}return this.each((typeof e=="function"?wy:e?yy:vy)(t,e))}function Ey(){this.textContent=""}function Iy(n){return function(){this.textContent=n}}function by(n){return function(){var e=n.apply(this,arguments);this.textContent=e??""}}function Ay(n){return arguments.length?this.each(n==null?Ey:(typeof n=="function"?by:Iy)(n)):this.node().textContent}function Sy(){this.innerHTML=""}function Ry(n){return function(){this.innerHTML=n}}function Cy(n){return function(){var e=n.apply(this,arguments);this.innerHTML=e??""}}function Py(n){return arguments.length?this.each(n==null?Sy:(typeof n=="function"?Cy:Ry)(n)):this.node().innerHTML}function ky(){this.nextSibling&&this.parentNode.appendChild(this)}function xy(){return this.each(ky)}function Dy(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Ny(){return this.each(Dy)}function My(n){var e=typeof n=="function"?n:uf(n);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function Vy(){return null}function Oy(n,e){var t=typeof n=="function"?n:uf(n),r=e==null?Vy:typeof e=="function"?e:Pc(e);return this.select(function(){return this.insertBefore(t.apply(this,arguments),r.apply(this,arguments)||null)})}function Ly(){var n=this.parentNode;n&&n.removeChild(this)}function Uy(){return this.each(Ly)}function Fy(){var n=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(n,this.nextSibling):n}function By(){var n=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(n,this.nextSibling):n}function $y(n){return this.select(n?By:Fy)}function qy(n){return arguments.length?this.property("__data__",n):this.node().__data__}function zy(n){return function(e){n.call(this,e,this.__data__)}}function Hy(n){return n.trim().split(/^|\s+/).map(function(e){var t="",r=e.indexOf(".");return r>=0&&(t=e.slice(r+1),e=e.slice(0,r)),{type:e,name:t}})}function jy(n){return function(){var e=this.__on;if(e){for(var t=0,r=-1,i=e.length,s;t<i;++t)s=e[t],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):e[++r]=s;++r?e.length=r:delete this.__on}}}function Gy(n,e,t){return function(){var r=this.__on,i,s=zy(e);if(r){for(var o=0,c=r.length;o<c;++o)if((i=r[o]).type===n.type&&i.name===n.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=t),i.value=e;return}}this.addEventListener(n.type,s,t),i={type:n.type,name:n.name,value:e,listener:s,options:t},r?r.push(i):this.__on=[i]}}function Wy(n,e,t){var r=Hy(n+""),i,s=r.length,o;if(arguments.length<2){var c=this.node().__on;if(c){for(var l=0,u=c.length,d;l<u;++l)for(i=0,d=c[l];i<s;++i)if((o=r[i]).type===d.type&&o.name===d.name)return d.value}return}for(c=e?Gy:jy,i=0;i<s;++i)this.each(c(r[i],e,t));return this}function wf(n,e,t){var r=pf(n),i=r.CustomEvent;typeof i=="function"?i=new i(e,t):(i=r.document.createEvent("Event"),t?(i.initEvent(e,t.bubbles,t.cancelable),i.detail=t.detail):i.initEvent(e,!1,!1)),n.dispatchEvent(i)}function Ky(n,e){return function(){return wf(this,n,e)}}function Yy(n,e){return function(){return wf(this,n,e.apply(this,arguments))}}function Qy(n,e){return this.each((typeof e=="function"?Yy:Ky)(n,e))}function*Xy(){for(var n=this._groups,e=0,t=n.length;e<t;++e)for(var r=n[e],i=0,s=r.length,o;i<s;++i)(o=r[i])&&(yield o)}var Tf=[null];function at(n,e){this._groups=n,this._parents=e}function Gi(){return new at([[document.documentElement]],Tf)}function Jy(){return this}at.prototype=Gi.prototype={constructor:at,select:b_,selectAll:C_,selectChild:D_,selectChildren:O_,filter:L_,data:z_,enter:U_,exit:j_,join:G_,merge:W_,selection:Jy,order:K_,sort:Y_,call:X_,nodes:J_,node:Z_,size:ey,empty:ty,each:ny,attr:ly,style:fy,property:_y,classed:Ty,text:Ay,html:Py,raise:xy,lower:Ny,append:My,insert:Oy,remove:Uy,clone:$y,datum:qy,on:Wy,dispatch:Qy,[Symbol.iterator]:Xy};function Ft(n){return typeof n=="string"?new at([[document.querySelector(n)]],[document.documentElement]):new at([[n]],Tf)}function Zy(n){let e;for(;e=n.sourceEvent;)n=e;return n}function Ln(n,e){if(n=Zy(n),e===void 0&&(e=n.currentTarget),e){var t=e.ownerSVGElement||e;if(t.createSVGPoint){var r=t.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(e.getScreenCTM().inverse()),[r.x,r.y]}if(e.getBoundingClientRect){var i=e.getBoundingClientRect();return[n.clientX-i.left-e.clientLeft,n.clientY-i.top-e.clientTop]}}return[n.pageX,n.pageY]}const qa={capture:!0,passive:!1};function za(n){n.preventDefault(),n.stopImmediatePropagation()}function ev(n){var e=n.document.documentElement,t=Ft(n).on("dragstart.drag",za,qa);"onselectstart"in e?t.on("selectstart.drag",za,qa):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function tv(n,e){var t=n.document.documentElement,r=Ft(n).on("dragstart.drag",null);e&&(r.on("click.drag",za,qa),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in t?r.on("selectstart.drag",null):(t.style.MozUserSelect=t.__noselect,delete t.__noselect)}function xc(n,e,t){n.prototype=e.prototype=t,t.constructor=n}function Ef(n,e){var t=Object.create(n.prototype);for(var r in e)t[r]=e[r];return t}function Wi(){}var Ci=.7,Ws=1/Ci,yr="\\s*([+-]?\\d+)\\s*",Pi="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Rt="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",nv=/^#([0-9a-f]{3,8})$/,rv=new RegExp(`^rgb\\(${yr},${yr},${yr}\\)$`),iv=new RegExp(`^rgb\\(${Rt},${Rt},${Rt}\\)$`),sv=new RegExp(`^rgba\\(${yr},${yr},${yr},${Pi}\\)$`),ov=new RegExp(`^rgba\\(${Rt},${Rt},${Rt},${Pi}\\)$`),av=new RegExp(`^hsl\\(${Pi},${Rt},${Rt}\\)$`),cv=new RegExp(`^hsla\\(${Pi},${Rt},${Rt},${Pi}\\)$`),Ku={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};xc(Wi,Wn,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:Yu,formatHex:Yu,formatHex8:lv,formatHsl:uv,formatRgb:Qu,toString:Qu});function Yu(){return this.rgb().formatHex()}function lv(){return this.rgb().formatHex8()}function uv(){return If(this).formatHsl()}function Qu(){return this.rgb().formatRgb()}function Wn(n){var e,t;return n=(n+"").trim().toLowerCase(),(e=nv.exec(n))?(t=e[1].length,e=parseInt(e[1],16),t===6?Xu(e):t===3?new nt(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):t===8?ys(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):t===4?ys(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=rv.exec(n))?new nt(e[1],e[2],e[3],1):(e=iv.exec(n))?new nt(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=sv.exec(n))?ys(e[1],e[2],e[3],e[4]):(e=ov.exec(n))?ys(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=av.exec(n))?eh(e[1],e[2]/100,e[3]/100,1):(e=cv.exec(n))?eh(e[1],e[2]/100,e[3]/100,e[4]):Ku.hasOwnProperty(n)?Xu(Ku[n]):n==="transparent"?new nt(NaN,NaN,NaN,0):null}function Xu(n){return new nt(n>>16&255,n>>8&255,n&255,1)}function ys(n,e,t,r){return r<=0&&(n=e=t=NaN),new nt(n,e,t,r)}function hv(n){return n instanceof Wi||(n=Wn(n)),n?(n=n.rgb(),new nt(n.r,n.g,n.b,n.opacity)):new nt}function Ha(n,e,t,r){return arguments.length===1?hv(n):new nt(n,e,t,r??1)}function nt(n,e,t,r){this.r=+n,this.g=+e,this.b=+t,this.opacity=+r}xc(nt,Ha,Ef(Wi,{brighter(n){return n=n==null?Ws:Math.pow(Ws,n),new nt(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?Ci:Math.pow(Ci,n),new nt(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new nt(qn(this.r),qn(this.g),qn(this.b),Ks(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Ju,formatHex:Ju,formatHex8:dv,formatRgb:Zu,toString:Zu}));function Ju(){return`#${Fn(this.r)}${Fn(this.g)}${Fn(this.b)}`}function dv(){return`#${Fn(this.r)}${Fn(this.g)}${Fn(this.b)}${Fn((isNaN(this.opacity)?1:this.opacity)*255)}`}function Zu(){const n=Ks(this.opacity);return`${n===1?"rgb(":"rgba("}${qn(this.r)}, ${qn(this.g)}, ${qn(this.b)}${n===1?")":`, ${n})`}`}function Ks(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function qn(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function Fn(n){return n=qn(n),(n<16?"0":"")+n.toString(16)}function eh(n,e,t,r){return r<=0?n=e=t=NaN:t<=0||t>=1?n=e=NaN:e<=0&&(n=NaN),new mt(n,e,t,r)}function If(n){if(n instanceof mt)return new mt(n.h,n.s,n.l,n.opacity);if(n instanceof Wi||(n=Wn(n)),!n)return new mt;if(n instanceof mt)return n;n=n.rgb();var e=n.r/255,t=n.g/255,r=n.b/255,i=Math.min(e,t,r),s=Math.max(e,t,r),o=NaN,c=s-i,l=(s+i)/2;return c?(e===s?o=(t-r)/c+(t<r)*6:t===s?o=(r-e)/c+2:o=(e-t)/c+4,c/=l<.5?s+i:2-s-i,o*=60):c=l>0&&l<1?0:o,new mt(o,c,l,n.opacity)}function fv(n,e,t,r){return arguments.length===1?If(n):new mt(n,e,t,r??1)}function mt(n,e,t,r){this.h=+n,this.s=+e,this.l=+t,this.opacity=+r}xc(mt,fv,Ef(Wi,{brighter(n){return n=n==null?Ws:Math.pow(Ws,n),new mt(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?Ci:Math.pow(Ci,n),new mt(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,e=isNaN(n)||isNaN(this.s)?0:this.s,t=this.l,r=t+(t<.5?t:1-t)*e,i=2*t-r;return new nt(ga(n>=240?n-240:n+120,i,r),ga(n,i,r),ga(n<120?n+240:n-120,i,r),this.opacity)},clamp(){return new mt(th(this.h),vs(this.s),vs(this.l),Ks(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=Ks(this.opacity);return`${n===1?"hsl(":"hsla("}${th(this.h)}, ${vs(this.s)*100}%, ${vs(this.l)*100}%${n===1?")":`, ${n})`}`}}));function th(n){return n=(n||0)%360,n<0?n+360:n}function vs(n){return Math.max(0,Math.min(1,n||0))}function ga(n,e,t){return(n<60?e+(t-e)*n/60:n<180?t:n<240?e+(t-e)*(240-n)/60:e)*255}const Dc=n=>()=>n;function mv(n,e){return function(t){return n+t*e}}function pv(n,e,t){return n=Math.pow(n,t),e=Math.pow(e,t)-n,t=1/t,function(r){return Math.pow(n+r*e,t)}}function gv(n){return(n=+n)==1?bf:function(e,t){return t-e?pv(e,t,n):Dc(isNaN(e)?t:e)}}function bf(n,e){var t=e-n;return t?mv(n,t):Dc(isNaN(n)?e:n)}const Ys=function n(e){var t=gv(e);function r(i,s){var o=t((i=Ha(i)).r,(s=Ha(s)).r),c=t(i.g,s.g),l=t(i.b,s.b),u=bf(i.opacity,s.opacity);return function(d){return i.r=o(d),i.g=c(d),i.b=l(d),i.opacity=u(d),i+""}}return r.gamma=n,r}(1);function _v(n,e){e||(e=[]);var t=n?Math.min(e.length,n.length):0,r=e.slice(),i;return function(s){for(i=0;i<t;++i)r[i]=n[i]*(1-s)+e[i]*s;return r}}function yv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function vv(n,e){var t=e?e.length:0,r=n?Math.min(t,n.length):0,i=new Array(r),s=new Array(t),o;for(o=0;o<r;++o)i[o]=Nc(n[o],e[o]);for(;o<t;++o)s[o]=e[o];return function(c){for(o=0;o<r;++o)s[o]=i[o](c);return s}}function wv(n,e){var t=new Date;return n=+n,e=+e,function(r){return t.setTime(n*(1-r)+e*r),t}}function ft(n,e){return n=+n,e=+e,function(t){return n*(1-t)+e*t}}function Tv(n,e){var t={},r={},i;(n===null||typeof n!="object")&&(n={}),(e===null||typeof e!="object")&&(e={});for(i in e)i in n?t[i]=Nc(n[i],e[i]):r[i]=e[i];return function(s){for(i in t)r[i]=t[i](s);return r}}var ja=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,_a=new RegExp(ja.source,"g");function Ev(n){return function(){return n}}function Iv(n){return function(e){return n(e)+""}}function Af(n,e){var t=ja.lastIndex=_a.lastIndex=0,r,i,s,o=-1,c=[],l=[];for(n=n+"",e=e+"";(r=ja.exec(n))&&(i=_a.exec(e));)(s=i.index)>t&&(s=e.slice(t,s),c[o]?c[o]+=s:c[++o]=s),(r=r[0])===(i=i[0])?c[o]?c[o]+=i:c[++o]=i:(c[++o]=null,l.push({i:o,x:ft(r,i)})),t=_a.lastIndex;return t<e.length&&(s=e.slice(t),c[o]?c[o]+=s:c[++o]=s),c.length<2?l[0]?Iv(l[0].x):Ev(e):(e=l.length,function(u){for(var d=0,p;d<e;++d)c[(p=l[d]).i]=p.x(u);return c.join("")})}function Nc(n,e){var t=typeof e,r;return e==null||t==="boolean"?Dc(e):(t==="number"?ft:t==="string"?(r=Wn(e))?(e=r,Ys):Af:e instanceof Wn?Ys:e instanceof Date?wv:yv(e)?_v:Array.isArray(e)?vv:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Tv:ft)(n,e)}function bv(n,e){return n=+n,e=+e,function(t){return Math.round(n*(1-t)+e*t)}}var nh=180/Math.PI,Ga={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Sf(n,e,t,r,i,s){var o,c,l;return(o=Math.sqrt(n*n+e*e))&&(n/=o,e/=o),(l=n*t+e*r)&&(t-=n*l,r-=e*l),(c=Math.sqrt(t*t+r*r))&&(t/=c,r/=c,l/=c),n*r<e*t&&(n=-n,e=-e,l=-l,o=-o),{translateX:i,translateY:s,rotate:Math.atan2(e,n)*nh,skewX:Math.atan(l)*nh,scaleX:o,scaleY:c}}var ws;function Av(n){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return e.isIdentity?Ga:Sf(e.a,e.b,e.c,e.d,e.e,e.f)}function Sv(n){return n==null||(ws||(ws=document.createElementNS("http://www.w3.org/2000/svg","g")),ws.setAttribute("transform",n),!(n=ws.transform.baseVal.consolidate()))?Ga:(n=n.matrix,Sf(n.a,n.b,n.c,n.d,n.e,n.f))}function Rf(n,e,t,r){function i(u){return u.length?u.pop()+" ":""}function s(u,d,p,m,_,A){if(u!==p||d!==m){var k=_.push("translate(",null,e,null,t);A.push({i:k-4,x:ft(u,p)},{i:k-2,x:ft(d,m)})}else(p||m)&&_.push("translate("+p+e+m+t)}function o(u,d,p,m){u!==d?(u-d>180?d+=360:d-u>180&&(u+=360),m.push({i:p.push(i(p)+"rotate(",null,r)-2,x:ft(u,d)})):d&&p.push(i(p)+"rotate("+d+r)}function c(u,d,p,m){u!==d?m.push({i:p.push(i(p)+"skewX(",null,r)-2,x:ft(u,d)}):d&&p.push(i(p)+"skewX("+d+r)}function l(u,d,p,m,_,A){if(u!==p||d!==m){var k=_.push(i(_)+"scale(",null,",",null,")");A.push({i:k-4,x:ft(u,p)},{i:k-2,x:ft(d,m)})}else(p!==1||m!==1)&&_.push(i(_)+"scale("+p+","+m+")")}return function(u,d){var p=[],m=[];return u=n(u),d=n(d),s(u.translateX,u.translateY,d.translateX,d.translateY,p,m),o(u.rotate,d.rotate,p,m),c(u.skewX,d.skewX,p,m),l(u.scaleX,u.scaleY,d.scaleX,d.scaleY,p,m),u=d=null,function(_){for(var A=-1,k=m.length,x;++A<k;)p[(x=m[A]).i]=x.x(_);return p.join("")}}}var Rv=Rf(Av,"px, ","px)","deg)"),Cv=Rf(Sv,", ",")",")"),Pv=1e-12;function rh(n){return((n=Math.exp(n))+1/n)/2}function kv(n){return((n=Math.exp(n))-1/n)/2}function xv(n){return((n=Math.exp(2*n))-1)/(n+1)}const Dv=function n(e,t,r){function i(s,o){var c=s[0],l=s[1],u=s[2],d=o[0],p=o[1],m=o[2],_=d-c,A=p-l,k=_*_+A*A,x,C;if(k<Pv)C=Math.log(m/u)/e,x=function(T){return[c+T*_,l+T*A,u*Math.exp(e*T*C)]};else{var M=Math.sqrt(k),F=(m*m-u*u+r*k)/(2*u*t*M),$=(m*m-u*u-r*k)/(2*m*t*M),K=Math.log(Math.sqrt(F*F+1)-F),L=Math.log(Math.sqrt($*$+1)-$);C=(L-K)/e,x=function(T){var y=T*C,v=rh(K),I=u/(t*M)*(v*xv(e*y+K)-kv(K));return[c+I*_,l+I*A,u*v/rh(e*y+K)]}}return x.duration=C*1e3*e/Math.SQRT2,x}return i.rho=function(s){var o=Math.max(.001,+s),c=o*o,l=c*c;return n(o,c,l)},i}(Math.SQRT2,2,4);var Rr=0,mi=0,ai=0,Cf=1e3,Qs,pi,Xs=0,Kn=0,Io=0,ki=typeof performance=="object"&&performance.now?performance:Date,Pf=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function Mc(){return Kn||(Pf(Nv),Kn=ki.now()+Io)}function Nv(){Kn=0}function Js(){this._call=this._time=this._next=null}Js.prototype=kf.prototype={constructor:Js,restart:function(n,e,t){if(typeof n!="function")throw new TypeError("callback is not a function");t=(t==null?Mc():+t)+(e==null?0:+e),!this._next&&pi!==this&&(pi?pi._next=this:Qs=this,pi=this),this._call=n,this._time=t,Wa()},stop:function(){this._call&&(this._call=null,this._time=1/0,Wa())}};function kf(n,e,t){var r=new Js;return r.restart(n,e,t),r}function Mv(){Mc(),++Rr;for(var n=Qs,e;n;)(e=Kn-n._time)>=0&&n._call.call(void 0,e),n=n._next;--Rr}function ih(){Kn=(Xs=ki.now())+Io,Rr=mi=0;try{Mv()}finally{Rr=0,Ov(),Kn=0}}function Vv(){var n=ki.now(),e=n-Xs;e>Cf&&(Io-=e,Xs=n)}function Ov(){for(var n,e=Qs,t,r=1/0;e;)e._call?(r>e._time&&(r=e._time),n=e,e=e._next):(t=e._next,e._next=null,e=n?n._next=t:Qs=t);pi=n,Wa(r)}function Wa(n){if(!Rr){mi&&(mi=clearTimeout(mi));var e=n-Kn;e>24?(n<1/0&&(mi=setTimeout(ih,n-ki.now()-Io)),ai&&(ai=clearInterval(ai))):(ai||(Xs=ki.now(),ai=setInterval(Vv,Cf)),Rr=1,Pf(ih))}}function sh(n,e,t){var r=new Js;return e=e==null?0:+e,r.restart(i=>{r.stop(),n(i+e)},e,t),r}var Lv=Cc("start","end","cancel","interrupt"),Uv=[],xf=0,oh=1,Ka=2,Ds=3,ah=4,Ya=5,Ns=6;function bo(n,e,t,r,i,s){var o=n.__transition;if(!o)n.__transition={};else if(t in o)return;Fv(n,t,{name:e,index:r,group:i,on:Lv,tween:Uv,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:xf})}function Vc(n,e){var t=Et(n,e);if(t.state>xf)throw new Error("too late; already scheduled");return t}function Vt(n,e){var t=Et(n,e);if(t.state>Ds)throw new Error("too late; already running");return t}function Et(n,e){var t=n.__transition;if(!t||!(t=t[e]))throw new Error("transition not found");return t}function Fv(n,e,t){var r=n.__transition,i;r[e]=t,t.timer=kf(s,0,t.time);function s(u){t.state=oh,t.timer.restart(o,t.delay,t.time),t.delay<=u&&o(u-t.delay)}function o(u){var d,p,m,_;if(t.state!==oh)return l();for(d in r)if(_=r[d],_.name===t.name){if(_.state===Ds)return sh(o);_.state===ah?(_.state=Ns,_.timer.stop(),_.on.call("interrupt",n,n.__data__,_.index,_.group),delete r[d]):+d<e&&(_.state=Ns,_.timer.stop(),_.on.call("cancel",n,n.__data__,_.index,_.group),delete r[d])}if(sh(function(){t.state===Ds&&(t.state=ah,t.timer.restart(c,t.delay,t.time),c(u))}),t.state=Ka,t.on.call("start",n,n.__data__,t.index,t.group),t.state===Ka){for(t.state=Ds,i=new Array(m=t.tween.length),d=0,p=-1;d<m;++d)(_=t.tween[d].value.call(n,n.__data__,t.index,t.group))&&(i[++p]=_);i.length=p+1}}function c(u){for(var d=u<t.duration?t.ease.call(null,u/t.duration):(t.timer.restart(l),t.state=Ya,1),p=-1,m=i.length;++p<m;)i[p].call(n,d);t.state===Ya&&(t.on.call("end",n,n.__data__,t.index,t.group),l())}function l(){t.state=Ns,t.timer.stop(),delete r[e];for(var u in r)return;delete n.__transition}}function Ms(n,e){var t=n.__transition,r,i,s=!0,o;if(t){e=e==null?null:e+"";for(o in t){if((r=t[o]).name!==e){s=!1;continue}i=r.state>Ka&&r.state<Ya,r.state=Ns,r.timer.stop(),r.on.call(i?"interrupt":"cancel",n,n.__data__,r.index,r.group),delete t[o]}s&&delete n.__transition}}function Bv(n){return this.each(function(){Ms(this,n)})}function $v(n,e){var t,r;return function(){var i=Vt(this,n),s=i.tween;if(s!==t){r=t=s;for(var o=0,c=r.length;o<c;++o)if(r[o].name===e){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function qv(n,e,t){var r,i;if(typeof t!="function")throw new Error;return function(){var s=Vt(this,n),o=s.tween;if(o!==r){i=(r=o).slice();for(var c={name:e,value:t},l=0,u=i.length;l<u;++l)if(i[l].name===e){i[l]=c;break}l===u&&i.push(c)}s.tween=i}}function zv(n,e){var t=this._id;if(n+="",arguments.length<2){for(var r=Et(this.node(),t).tween,i=0,s=r.length,o;i<s;++i)if((o=r[i]).name===n)return o.value;return null}return this.each((e==null?$v:qv)(t,n,e))}function Oc(n,e,t){var r=n._id;return n.each(function(){var i=Vt(this,r);(i.value||(i.value={}))[e]=t.apply(this,arguments)}),function(i){return Et(i,r).value[e]}}function Df(n,e){var t;return(typeof e=="number"?ft:e instanceof Wn?Ys:(t=Wn(e))?(e=t,Ys):Af)(n,e)}function Hv(n){return function(){this.removeAttribute(n)}}function jv(n){return function(){this.removeAttributeNS(n.space,n.local)}}function Gv(n,e,t){var r,i=t+"",s;return function(){var o=this.getAttribute(n);return o===i?null:o===r?s:s=e(r=o,t)}}function Wv(n,e,t){var r,i=t+"",s;return function(){var o=this.getAttributeNS(n.space,n.local);return o===i?null:o===r?s:s=e(r=o,t)}}function Kv(n,e,t){var r,i,s;return function(){var o,c=t(this),l;return c==null?void this.removeAttribute(n):(o=this.getAttribute(n),l=c+"",o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,c)))}}function Yv(n,e,t){var r,i,s;return function(){var o,c=t(this),l;return c==null?void this.removeAttributeNS(n.space,n.local):(o=this.getAttributeNS(n.space,n.local),l=c+"",o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,c)))}}function Qv(n,e){var t=Eo(n),r=t==="transform"?Cv:Df;return this.attrTween(n,typeof e=="function"?(t.local?Yv:Kv)(t,r,Oc(this,"attr."+n,e)):e==null?(t.local?jv:Hv)(t):(t.local?Wv:Gv)(t,r,e))}function Xv(n,e){return function(t){this.setAttribute(n,e.call(this,t))}}function Jv(n,e){return function(t){this.setAttributeNS(n.space,n.local,e.call(this,t))}}function Zv(n,e){var t,r;function i(){var s=e.apply(this,arguments);return s!==r&&(t=(r=s)&&Jv(n,s)),t}return i._value=e,i}function ew(n,e){var t,r;function i(){var s=e.apply(this,arguments);return s!==r&&(t=(r=s)&&Xv(n,s)),t}return i._value=e,i}function tw(n,e){var t="attr."+n;if(arguments.length<2)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;var r=Eo(n);return this.tween(t,(r.local?Zv:ew)(r,e))}function nw(n,e){return function(){Vc(this,n).delay=+e.apply(this,arguments)}}function rw(n,e){return e=+e,function(){Vc(this,n).delay=e}}function iw(n){var e=this._id;return arguments.length?this.each((typeof n=="function"?nw:rw)(e,n)):Et(this.node(),e).delay}function sw(n,e){return function(){Vt(this,n).duration=+e.apply(this,arguments)}}function ow(n,e){return e=+e,function(){Vt(this,n).duration=e}}function aw(n){var e=this._id;return arguments.length?this.each((typeof n=="function"?sw:ow)(e,n)):Et(this.node(),e).duration}function cw(n,e){if(typeof e!="function")throw new Error;return function(){Vt(this,n).ease=e}}function lw(n){var e=this._id;return arguments.length?this.each(cw(e,n)):Et(this.node(),e).ease}function uw(n,e){return function(){var t=e.apply(this,arguments);if(typeof t!="function")throw new Error;Vt(this,n).ease=t}}function hw(n){if(typeof n!="function")throw new Error;return this.each(uw(this._id,n))}function dw(n){typeof n!="function"&&(n=df(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=[],l,u=0;u<o;++u)(l=s[u])&&n.call(l,l.__data__,u,s)&&c.push(l);return new Kt(r,this._parents,this._name,this._id)}function fw(n){if(n._id!==this._id)throw new Error;for(var e=this._groups,t=n._groups,r=e.length,i=t.length,s=Math.min(r,i),o=new Array(r),c=0;c<s;++c)for(var l=e[c],u=t[c],d=l.length,p=o[c]=new Array(d),m,_=0;_<d;++_)(m=l[_]||u[_])&&(p[_]=m);for(;c<r;++c)o[c]=e[c];return new Kt(o,this._parents,this._name,this._id)}function mw(n){return(n+"").trim().split(/^|\s+/).every(function(e){var t=e.indexOf(".");return t>=0&&(e=e.slice(0,t)),!e||e==="start"})}function pw(n,e,t){var r,i,s=mw(e)?Vc:Vt;return function(){var o=s(this,n),c=o.on;c!==r&&(i=(r=c).copy()).on(e,t),o.on=i}}function gw(n,e){var t=this._id;return arguments.length<2?Et(this.node(),t).on.on(n):this.each(pw(t,n,e))}function _w(n){return function(){var e=this.parentNode;for(var t in this.__transition)if(+t!==n)return;e&&e.removeChild(this)}}function yw(){return this.on("end.remove",_w(this._id))}function vw(n){var e=this._name,t=this._id;typeof n!="function"&&(n=Pc(n));for(var r=this._groups,i=r.length,s=new Array(i),o=0;o<i;++o)for(var c=r[o],l=c.length,u=s[o]=new Array(l),d,p,m=0;m<l;++m)(d=c[m])&&(p=n.call(d,d.__data__,m,c))&&("__data__"in d&&(p.__data__=d.__data__),u[m]=p,bo(u[m],e,t,m,u,Et(d,t)));return new Kt(s,this._parents,e,t)}function ww(n){var e=this._name,t=this._id;typeof n!="function"&&(n=hf(n));for(var r=this._groups,i=r.length,s=[],o=[],c=0;c<i;++c)for(var l=r[c],u=l.length,d,p=0;p<u;++p)if(d=l[p]){for(var m=n.call(d,d.__data__,p,l),_,A=Et(d,t),k=0,x=m.length;k<x;++k)(_=m[k])&&bo(_,e,t,k,m,A);s.push(m),o.push(d)}return new Kt(s,o,e,t)}var Tw=Gi.prototype.constructor;function Ew(){return new Tw(this._groups,this._parents)}function Iw(n,e){var t,r,i;return function(){var s=Sr(this,n),o=(this.style.removeProperty(n),Sr(this,n));return s===o?null:s===t&&o===r?i:i=e(t=s,r=o)}}function Nf(n){return function(){this.style.removeProperty(n)}}function bw(n,e,t){var r,i=t+"",s;return function(){var o=Sr(this,n);return o===i?null:o===r?s:s=e(r=o,t)}}function Aw(n,e,t){var r,i,s;return function(){var o=Sr(this,n),c=t(this),l=c+"";return c==null&&(l=c=(this.style.removeProperty(n),Sr(this,n))),o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,c))}}function Sw(n,e){var t,r,i,s="style."+e,o="end."+s,c;return function(){var l=Vt(this,n),u=l.on,d=l.value[s]==null?c||(c=Nf(e)):void 0;(u!==t||i!==d)&&(r=(t=u).copy()).on(o,i=d),l.on=r}}function Rw(n,e,t){var r=(n+="")=="transform"?Rv:Df;return e==null?this.styleTween(n,Iw(n,r)).on("end.style."+n,Nf(n)):typeof e=="function"?this.styleTween(n,Aw(n,r,Oc(this,"style."+n,e))).each(Sw(this._id,n)):this.styleTween(n,bw(n,r,e),t).on("end.style."+n,null)}function Cw(n,e,t){return function(r){this.style.setProperty(n,e.call(this,r),t)}}function Pw(n,e,t){var r,i;function s(){var o=e.apply(this,arguments);return o!==i&&(r=(i=o)&&Cw(n,o,t)),r}return s._value=e,s}function kw(n,e,t){var r="style."+(n+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(e==null)return this.tween(r,null);if(typeof e!="function")throw new Error;return this.tween(r,Pw(n,e,t??""))}function xw(n){return function(){this.textContent=n}}function Dw(n){return function(){var e=n(this);this.textContent=e??""}}function Nw(n){return this.tween("text",typeof n=="function"?Dw(Oc(this,"text",n)):xw(n==null?"":n+""))}function Mw(n){return function(e){this.textContent=n.call(this,e)}}function Vw(n){var e,t;function r(){var i=n.apply(this,arguments);return i!==t&&(e=(t=i)&&Mw(i)),e}return r._value=n,r}function Ow(n){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(n==null)return this.tween(e,null);if(typeof n!="function")throw new Error;return this.tween(e,Vw(n))}function Lw(){for(var n=this._name,e=this._id,t=Mf(),r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],c=o.length,l,u=0;u<c;++u)if(l=o[u]){var d=Et(l,e);bo(l,n,t,u,o,{time:d.time+d.delay+d.duration,delay:0,duration:d.duration,ease:d.ease})}return new Kt(r,this._parents,n,t)}function Uw(){var n,e,t=this,r=t._id,i=t.size();return new Promise(function(s,o){var c={value:o},l={value:function(){--i===0&&s()}};t.each(function(){var u=Vt(this,r),d=u.on;d!==n&&(e=(n=d).copy(),e._.cancel.push(c),e._.interrupt.push(c),e._.end.push(l)),u.on=e}),i===0&&s()})}var Fw=0;function Kt(n,e,t,r){this._groups=n,this._parents=e,this._name=t,this._id=r}function Mf(){return++Fw}var Lt=Gi.prototype;Kt.prototype={constructor:Kt,select:vw,selectAll:ww,selectChild:Lt.selectChild,selectChildren:Lt.selectChildren,filter:dw,merge:fw,selection:Ew,transition:Lw,call:Lt.call,nodes:Lt.nodes,node:Lt.node,size:Lt.size,empty:Lt.empty,each:Lt.each,on:gw,attr:Qv,attrTween:tw,style:Rw,styleTween:kw,text:Nw,textTween:Ow,remove:yw,tween:zv,delay:iw,duration:aw,ease:lw,easeVarying:hw,end:Uw,[Symbol.iterator]:Lt[Symbol.iterator]};function Bw(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var $w={time:null,delay:0,duration:250,ease:Bw};function qw(n,e){for(var t;!(t=n.__transition)||!(t=t[e]);)if(!(n=n.parentNode))throw new Error(`transition ${e} not found`);return t}function zw(n){var e,t;n instanceof Kt?(e=n._id,n=n._name):(e=Mf(),(t=$w).time=Mc(),n=n==null?null:n+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],c=o.length,l,u=0;u<c;++u)(l=o[u])&&bo(l,n,e,u,o,t||qw(l,e));return new Kt(r,this._parents,n,e)}Gi.prototype.interrupt=Bv;Gi.prototype.transition=zw;function Hw(n,e){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(e).domain(n);break}return this}function jw(n){return function(){return n}}function Gw(n){return+n}var ch=[0,1];function gr(n){return n}function Qa(n,e){return(e-=n=+n)?function(t){return(t-n)/e}:jw(isNaN(e)?NaN:.5)}function Ww(n,e){var t;return n>e&&(t=n,n=e,e=t),function(r){return Math.max(n,Math.min(e,r))}}function Kw(n,e,t){var r=n[0],i=n[1],s=e[0],o=e[1];return i<r?(r=Qa(i,r),s=t(o,s)):(r=Qa(r,i),s=t(s,o)),function(c){return s(r(c))}}function Yw(n,e,t){var r=Math.min(n.length,e.length)-1,i=new Array(r),s=new Array(r),o=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),e=e.slice().reverse());++o<r;)i[o]=Qa(n[o],n[o+1]),s[o]=t(e[o],e[o+1]);return function(c){var l=s_(n,c,1,r)-1;return s[l](i[l](c))}}function Qw(n,e){return e.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function Xw(){var n=ch,e=ch,t=Nc,r,i,s,o=gr,c,l,u;function d(){var m=Math.min(n.length,e.length);return o!==gr&&(o=Ww(n[0],n[m-1])),c=m>2?Yw:Kw,l=u=null,p}function p(m){return m==null||isNaN(m=+m)?s:(l||(l=c(n.map(r),e,t)))(r(o(m)))}return p.invert=function(m){return o(i((u||(u=c(e,n.map(r),ft)))(m)))},p.domain=function(m){return arguments.length?(n=Array.from(m,Gw),d()):n.slice()},p.range=function(m){return arguments.length?(e=Array.from(m),d()):e.slice()},p.rangeRound=function(m){return e=Array.from(m),t=bv,d()},p.clamp=function(m){return arguments.length?(o=m?!0:gr,d()):o!==gr},p.interpolate=function(m){return arguments.length?(t=m,d()):t},p.unknown=function(m){return arguments.length?(s=m,p):s},function(m,_){return r=m,i=_,d()}}function Jw(){return Xw()(gr,gr)}function Zw(n,e){n=n.slice();var t=0,r=n.length-1,i=n[t],s=n[r],o;return s<i&&(o=t,t=r,r=o,o=i,i=s,s=o),n[t]=e.floor(i),n[r]=e.ceil(s),n}const ya=new Date,va=new Date;function ke(n,e,t,r){function i(s){return n(s=arguments.length===0?new Date:new Date(+s)),s}return i.floor=s=>(n(s=new Date(+s)),s),i.ceil=s=>(n(s=new Date(s-1)),e(s,1),n(s),s),i.round=s=>{const o=i(s),c=i.ceil(s);return s-o<c-s?o:c},i.offset=(s,o)=>(e(s=new Date(+s),o==null?1:Math.floor(o)),s),i.range=(s,o,c)=>{const l=[];if(s=i.ceil(s),c=c==null?1:Math.floor(c),!(s<o)||!(c>0))return l;let u;do l.push(u=new Date(+s)),e(s,c),n(s);while(u<s&&s<o);return l},i.filter=s=>ke(o=>{if(o>=o)for(;n(o),!s(o);)o.setTime(o-1)},(o,c)=>{if(o>=o)if(c<0)for(;++c<=0;)for(;e(o,-1),!s(o););else for(;--c>=0;)for(;e(o,1),!s(o););}),t&&(i.count=(s,o)=>(ya.setTime(+s),va.setTime(+o),n(ya),n(va),Math.floor(t(ya,va))),i.every=s=>(s=Math.floor(s),!isFinite(s)||!(s>0)?null:s>1?i.filter(r?o=>r(o)%s===0:o=>i.count(0,o)%s===0):i)),i}const Zs=ke(()=>{},(n,e)=>{n.setTime(+n+e)},(n,e)=>e-n);Zs.every=n=>(n=Math.floor(n),!isFinite(n)||!(n>0)?null:n>1?ke(e=>{e.setTime(Math.floor(e/n)*n)},(e,t)=>{e.setTime(+e+t*n)},(e,t)=>(t-e)/n):Zs);Zs.range;const $t=1e3,ut=$t*60,qt=ut*60,Yt=qt*24,Lc=Yt*7,lh=Yt*30,wa=Yt*365,_r=ke(n=>{n.setTime(n-n.getMilliseconds())},(n,e)=>{n.setTime(+n+e*$t)},(n,e)=>(e-n)/$t,n=>n.getUTCSeconds());_r.range;const Uc=ke(n=>{n.setTime(n-n.getMilliseconds()-n.getSeconds()*$t)},(n,e)=>{n.setTime(+n+e*ut)},(n,e)=>(e-n)/ut,n=>n.getMinutes());Uc.range;const eT=ke(n=>{n.setUTCSeconds(0,0)},(n,e)=>{n.setTime(+n+e*ut)},(n,e)=>(e-n)/ut,n=>n.getUTCMinutes());eT.range;const Fc=ke(n=>{n.setTime(n-n.getMilliseconds()-n.getSeconds()*$t-n.getMinutes()*ut)},(n,e)=>{n.setTime(+n+e*qt)},(n,e)=>(e-n)/qt,n=>n.getHours());Fc.range;const tT=ke(n=>{n.setUTCMinutes(0,0,0)},(n,e)=>{n.setTime(+n+e*qt)},(n,e)=>(e-n)/qt,n=>n.getUTCHours());tT.range;const Ki=ke(n=>n.setHours(0,0,0,0),(n,e)=>n.setDate(n.getDate()+e),(n,e)=>(e-n-(e.getTimezoneOffset()-n.getTimezoneOffset())*ut)/Yt,n=>n.getDate()-1);Ki.range;const Bc=ke(n=>{n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCDate(n.getUTCDate()+e)},(n,e)=>(e-n)/Yt,n=>n.getUTCDate()-1);Bc.range;const nT=ke(n=>{n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCDate(n.getUTCDate()+e)},(n,e)=>(e-n)/Yt,n=>Math.floor(n/Yt));nT.range;function nr(n){return ke(e=>{e.setDate(e.getDate()-(e.getDay()+7-n)%7),e.setHours(0,0,0,0)},(e,t)=>{e.setDate(e.getDate()+t*7)},(e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*ut)/Lc)}const Ao=nr(0),eo=nr(1),rT=nr(2),iT=nr(3),Cr=nr(4),sT=nr(5),oT=nr(6);Ao.range;eo.range;rT.range;iT.range;Cr.range;sT.range;oT.range;function rr(n){return ke(e=>{e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-n)%7),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t*7)},(e,t)=>(t-e)/Lc)}const Vf=rr(0),to=rr(1),aT=rr(2),cT=rr(3),Pr=rr(4),lT=rr(5),uT=rr(6);Vf.range;to.range;aT.range;cT.range;Pr.range;lT.range;uT.range;const $c=ke(n=>{n.setDate(1),n.setHours(0,0,0,0)},(n,e)=>{n.setMonth(n.getMonth()+e)},(n,e)=>e.getMonth()-n.getMonth()+(e.getFullYear()-n.getFullYear())*12,n=>n.getMonth());$c.range;const hT=ke(n=>{n.setUTCDate(1),n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCMonth(n.getUTCMonth()+e)},(n,e)=>e.getUTCMonth()-n.getUTCMonth()+(e.getUTCFullYear()-n.getUTCFullYear())*12,n=>n.getUTCMonth());hT.range;const Qt=ke(n=>{n.setMonth(0,1),n.setHours(0,0,0,0)},(n,e)=>{n.setFullYear(n.getFullYear()+e)},(n,e)=>e.getFullYear()-n.getFullYear(),n=>n.getFullYear());Qt.every=n=>!isFinite(n=Math.floor(n))||!(n>0)?null:ke(e=>{e.setFullYear(Math.floor(e.getFullYear()/n)*n),e.setMonth(0,1),e.setHours(0,0,0,0)},(e,t)=>{e.setFullYear(e.getFullYear()+t*n)});Qt.range;const Yn=ke(n=>{n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCFullYear(n.getUTCFullYear()+e)},(n,e)=>e.getUTCFullYear()-n.getUTCFullYear(),n=>n.getUTCFullYear());Yn.every=n=>!isFinite(n=Math.floor(n))||!(n>0)?null:ke(e=>{e.setUTCFullYear(Math.floor(e.getUTCFullYear()/n)*n),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCFullYear(e.getUTCFullYear()+t*n)});Yn.range;function dT(n,e,t,r,i,s){const o=[[_r,1,$t],[_r,5,5*$t],[_r,15,15*$t],[_r,30,30*$t],[s,1,ut],[s,5,5*ut],[s,15,15*ut],[s,30,30*ut],[i,1,qt],[i,3,3*qt],[i,6,6*qt],[i,12,12*qt],[r,1,Yt],[r,2,2*Yt],[t,1,Lc],[e,1,lh],[e,3,3*lh],[n,1,wa]];function c(u,d,p){const m=d<u;m&&([u,d]=[d,u]);const _=p&&typeof p.range=="function"?p:l(u,d,p),A=_?_.range(u,+d+1):[];return m?A.reverse():A}function l(u,d,p){const m=Math.abs(d-u)/p,_=Rc(([,,x])=>x).right(o,m);if(_===o.length)return n.every(Hu(u/wa,d/wa,p));if(_===0)return Zs.every(Math.max(Hu(u,d,p),1));const[A,k]=o[m/o[_-1][2]<o[_][2]/m?_-1:_];return A.every(k)}return[c,l]}const[fT,mT]=dT(Qt,$c,Ao,Ki,Fc,Uc);function Ta(n){if(0<=n.y&&n.y<100){var e=new Date(-1,n.m,n.d,n.H,n.M,n.S,n.L);return e.setFullYear(n.y),e}return new Date(n.y,n.m,n.d,n.H,n.M,n.S,n.L)}function Ea(n){if(0<=n.y&&n.y<100){var e=new Date(Date.UTC(-1,n.m,n.d,n.H,n.M,n.S,n.L));return e.setUTCFullYear(n.y),e}return new Date(Date.UTC(n.y,n.m,n.d,n.H,n.M,n.S,n.L))}function ci(n,e,t){return{y:n,m:e,d:t,H:0,M:0,S:0,L:0}}function pT(n){var e=n.dateTime,t=n.date,r=n.time,i=n.periods,s=n.days,o=n.shortDays,c=n.months,l=n.shortMonths,u=li(i),d=ui(i),p=li(s),m=ui(s),_=li(o),A=ui(o),k=li(c),x=ui(c),C=li(l),M=ui(l),F={a:j,A:Y,b:Z,B:te,c:null,d:ph,e:ph,f:UT,g:KT,G:QT,H:VT,I:OT,j:LT,L:Of,m:FT,M:BT,p:le,q:fe,Q:yh,s:vh,S:$T,u:qT,U:zT,V:HT,w:jT,W:GT,x:null,X:null,y:WT,Y:YT,Z:XT,"%":_h},$={a:We,A:_e,b:Ve,B:Ke,c:null,d:gh,e:gh,f:t0,g:h0,G:f0,H:JT,I:ZT,j:e0,L:Uf,m:n0,M:r0,p:Oe,q:Ye,Q:yh,s:vh,S:i0,u:s0,U:o0,V:a0,w:c0,W:l0,x:null,X:null,y:u0,Y:d0,Z:m0,"%":_h},K={a:I,A:E,b,B:w,c:R,d:fh,e:fh,f:xT,g:dh,G:hh,H:mh,I:mh,j:RT,L:kT,m:ST,M:CT,p:v,q:AT,Q:NT,s:MT,S:PT,u:wT,U:TT,V:ET,w:vT,W:IT,x:H,X:O,y:dh,Y:hh,Z:bT,"%":DT};F.x=L(t,F),F.X=L(r,F),F.c=L(e,F),$.x=L(t,$),$.X=L(r,$),$.c=L(e,$);function L(q,ne){return function(oe){var V=[],xe=-1,he=0,Qe=q.length,Le,dt,Hr;for(oe instanceof Date||(oe=new Date(+oe));++xe<Qe;)q.charCodeAt(xe)===37&&(V.push(q.slice(he,xe)),(dt=uh[Le=q.charAt(++xe)])!=null?Le=q.charAt(++xe):dt=Le==="e"?" ":"0",(Hr=ne[Le])&&(Le=Hr(oe,dt)),V.push(Le),he=xe+1);return V.push(q.slice(he,xe)),V.join("")}}function T(q,ne){return function(oe){var V=ci(1900,void 0,1),xe=y(V,q,oe+="",0),he,Qe;if(xe!=oe.length)return null;if("Q"in V)return new Date(V.Q);if("s"in V)return new Date(V.s*1e3+("L"in V?V.L:0));if(ne&&!("Z"in V)&&(V.Z=0),"p"in V&&(V.H=V.H%12+V.p*12),V.m===void 0&&(V.m="q"in V?V.q:0),"V"in V){if(V.V<1||V.V>53)return null;"w"in V||(V.w=1),"Z"in V?(he=Ea(ci(V.y,0,1)),Qe=he.getUTCDay(),he=Qe>4||Qe===0?to.ceil(he):to(he),he=Bc.offset(he,(V.V-1)*7),V.y=he.getUTCFullYear(),V.m=he.getUTCMonth(),V.d=he.getUTCDate()+(V.w+6)%7):(he=Ta(ci(V.y,0,1)),Qe=he.getDay(),he=Qe>4||Qe===0?eo.ceil(he):eo(he),he=Ki.offset(he,(V.V-1)*7),V.y=he.getFullYear(),V.m=he.getMonth(),V.d=he.getDate()+(V.w+6)%7)}else("W"in V||"U"in V)&&("w"in V||(V.w="u"in V?V.u%7:"W"in V?1:0),Qe="Z"in V?Ea(ci(V.y,0,1)).getUTCDay():Ta(ci(V.y,0,1)).getDay(),V.m=0,V.d="W"in V?(V.w+6)%7+V.W*7-(Qe+5)%7:V.w+V.U*7-(Qe+6)%7);return"Z"in V?(V.H+=V.Z/100|0,V.M+=V.Z%100,Ea(V)):Ta(V)}}function y(q,ne,oe,V){for(var xe=0,he=ne.length,Qe=oe.length,Le,dt;xe<he;){if(V>=Qe)return-1;if(Le=ne.charCodeAt(xe++),Le===37){if(Le=ne.charAt(xe++),dt=K[Le in uh?ne.charAt(xe++):Le],!dt||(V=dt(q,oe,V))<0)return-1}else if(Le!=oe.charCodeAt(V++))return-1}return V}function v(q,ne,oe){var V=u.exec(ne.slice(oe));return V?(q.p=d.get(V[0].toLowerCase()),oe+V[0].length):-1}function I(q,ne,oe){var V=_.exec(ne.slice(oe));return V?(q.w=A.get(V[0].toLowerCase()),oe+V[0].length):-1}function E(q,ne,oe){var V=p.exec(ne.slice(oe));return V?(q.w=m.get(V[0].toLowerCase()),oe+V[0].length):-1}function b(q,ne,oe){var V=C.exec(ne.slice(oe));return V?(q.m=M.get(V[0].toLowerCase()),oe+V[0].length):-1}function w(q,ne,oe){var V=k.exec(ne.slice(oe));return V?(q.m=x.get(V[0].toLowerCase()),oe+V[0].length):-1}function R(q,ne,oe){return y(q,e,ne,oe)}function H(q,ne,oe){return y(q,t,ne,oe)}function O(q,ne,oe){return y(q,r,ne,oe)}function j(q){return o[q.getDay()]}function Y(q){return s[q.getDay()]}function Z(q){return l[q.getMonth()]}function te(q){return c[q.getMonth()]}function le(q){return i[+(q.getHours()>=12)]}function fe(q){return 1+~~(q.getMonth()/3)}function We(q){return o[q.getUTCDay()]}function _e(q){return s[q.getUTCDay()]}function Ve(q){return l[q.getUTCMonth()]}function Ke(q){return c[q.getUTCMonth()]}function Oe(q){return i[+(q.getUTCHours()>=12)]}function Ye(q){return 1+~~(q.getUTCMonth()/3)}return{format:function(q){var ne=L(q+="",F);return ne.toString=function(){return q},ne},parse:function(q){var ne=T(q+="",!1);return ne.toString=function(){return q},ne},utcFormat:function(q){var ne=L(q+="",$);return ne.toString=function(){return q},ne},utcParse:function(q){var ne=T(q+="",!0);return ne.toString=function(){return q},ne}}}var uh={"-":"",_:" ",0:"0"},Me=/^\s*\d+/,gT=/^%/,_T=/[\\^$*+?|[\]().{}]/g;function ce(n,e,t){var r=n<0?"-":"",i=(r?-n:n)+"",s=i.length;return r+(s<t?new Array(t-s+1).join(e)+i:i)}function yT(n){return n.replace(_T,"\\$&")}function li(n){return new RegExp("^(?:"+n.map(yT).join("|")+")","i")}function ui(n){return new Map(n.map((e,t)=>[e.toLowerCase(),t]))}function vT(n,e,t){var r=Me.exec(e.slice(t,t+1));return r?(n.w=+r[0],t+r[0].length):-1}function wT(n,e,t){var r=Me.exec(e.slice(t,t+1));return r?(n.u=+r[0],t+r[0].length):-1}function TT(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.U=+r[0],t+r[0].length):-1}function ET(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.V=+r[0],t+r[0].length):-1}function IT(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.W=+r[0],t+r[0].length):-1}function hh(n,e,t){var r=Me.exec(e.slice(t,t+4));return r?(n.y=+r[0],t+r[0].length):-1}function dh(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.y=+r[0]+(+r[0]>68?1900:2e3),t+r[0].length):-1}function bT(n,e,t){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(t,t+6));return r?(n.Z=r[1]?0:-(r[2]+(r[3]||"00")),t+r[0].length):-1}function AT(n,e,t){var r=Me.exec(e.slice(t,t+1));return r?(n.q=r[0]*3-3,t+r[0].length):-1}function ST(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.m=r[0]-1,t+r[0].length):-1}function fh(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.d=+r[0],t+r[0].length):-1}function RT(n,e,t){var r=Me.exec(e.slice(t,t+3));return r?(n.m=0,n.d=+r[0],t+r[0].length):-1}function mh(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.H=+r[0],t+r[0].length):-1}function CT(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.M=+r[0],t+r[0].length):-1}function PT(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.S=+r[0],t+r[0].length):-1}function kT(n,e,t){var r=Me.exec(e.slice(t,t+3));return r?(n.L=+r[0],t+r[0].length):-1}function xT(n,e,t){var r=Me.exec(e.slice(t,t+6));return r?(n.L=Math.floor(r[0]/1e3),t+r[0].length):-1}function DT(n,e,t){var r=gT.exec(e.slice(t,t+1));return r?t+r[0].length:-1}function NT(n,e,t){var r=Me.exec(e.slice(t));return r?(n.Q=+r[0],t+r[0].length):-1}function MT(n,e,t){var r=Me.exec(e.slice(t));return r?(n.s=+r[0],t+r[0].length):-1}function ph(n,e){return ce(n.getDate(),e,2)}function VT(n,e){return ce(n.getHours(),e,2)}function OT(n,e){return ce(n.getHours()%12||12,e,2)}function LT(n,e){return ce(1+Ki.count(Qt(n),n),e,3)}function Of(n,e){return ce(n.getMilliseconds(),e,3)}function UT(n,e){return Of(n,e)+"000"}function FT(n,e){return ce(n.getMonth()+1,e,2)}function BT(n,e){return ce(n.getMinutes(),e,2)}function $T(n,e){return ce(n.getSeconds(),e,2)}function qT(n){var e=n.getDay();return e===0?7:e}function zT(n,e){return ce(Ao.count(Qt(n)-1,n),e,2)}function Lf(n){var e=n.getDay();return e>=4||e===0?Cr(n):Cr.ceil(n)}function HT(n,e){return n=Lf(n),ce(Cr.count(Qt(n),n)+(Qt(n).getDay()===4),e,2)}function jT(n){return n.getDay()}function GT(n,e){return ce(eo.count(Qt(n)-1,n),e,2)}function WT(n,e){return ce(n.getFullYear()%100,e,2)}function KT(n,e){return n=Lf(n),ce(n.getFullYear()%100,e,2)}function YT(n,e){return ce(n.getFullYear()%1e4,e,4)}function QT(n,e){var t=n.getDay();return n=t>=4||t===0?Cr(n):Cr.ceil(n),ce(n.getFullYear()%1e4,e,4)}function XT(n){var e=n.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+ce(e/60|0,"0",2)+ce(e%60,"0",2)}function gh(n,e){return ce(n.getUTCDate(),e,2)}function JT(n,e){return ce(n.getUTCHours(),e,2)}function ZT(n,e){return ce(n.getUTCHours()%12||12,e,2)}function e0(n,e){return ce(1+Bc.count(Yn(n),n),e,3)}function Uf(n,e){return ce(n.getUTCMilliseconds(),e,3)}function t0(n,e){return Uf(n,e)+"000"}function n0(n,e){return ce(n.getUTCMonth()+1,e,2)}function r0(n,e){return ce(n.getUTCMinutes(),e,2)}function i0(n,e){return ce(n.getUTCSeconds(),e,2)}function s0(n){var e=n.getUTCDay();return e===0?7:e}function o0(n,e){return ce(Vf.count(Yn(n)-1,n),e,2)}function Ff(n){var e=n.getUTCDay();return e>=4||e===0?Pr(n):Pr.ceil(n)}function a0(n,e){return n=Ff(n),ce(Pr.count(Yn(n),n)+(Yn(n).getUTCDay()===4),e,2)}function c0(n){return n.getUTCDay()}function l0(n,e){return ce(to.count(Yn(n)-1,n),e,2)}function u0(n,e){return ce(n.getUTCFullYear()%100,e,2)}function h0(n,e){return n=Ff(n),ce(n.getUTCFullYear()%100,e,2)}function d0(n,e){return ce(n.getUTCFullYear()%1e4,e,4)}function f0(n,e){var t=n.getUTCDay();return n=t>=4||t===0?Pr(n):Pr.ceil(n),ce(n.getUTCFullYear()%1e4,e,4)}function m0(){return"+0000"}function _h(){return"%"}function yh(n){return+n}function vh(n){return Math.floor(+n/1e3)}var hr,qc;p0({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function p0(n){return hr=pT(n),qc=hr.format,hr.parse,hr.utcFormat,hr.utcParse,hr}function g0(n){return new Date(n)}function _0(n){return n instanceof Date?+n:+new Date(+n)}function Bf(n,e,t,r,i,s,o,c,l,u){var d=Jw(),p=d.invert,m=d.domain,_=u(".%L"),A=u(":%S"),k=u("%I:%M"),x=u("%I %p"),C=u("%a %d"),M=u("%b %d"),F=u("%B"),$=u("%Y");function K(L){return(l(L)<L?_:c(L)<L?A:o(L)<L?k:s(L)<L?x:r(L)<L?i(L)<L?C:M:t(L)<L?F:$)(L)}return d.invert=function(L){return new Date(p(L))},d.domain=function(L){return arguments.length?m(Array.from(L,_0)):m().map(g0)},d.ticks=function(L){var T=m();return n(T[0],T[T.length-1],L??10)},d.tickFormat=function(L,T){return T==null?K:u(T)},d.nice=function(L){var T=m();return(!L||typeof L.range!="function")&&(L=e(T[0],T[T.length-1],L??10)),L?m(Zw(T,L)):d},d.copy=function(){return Qw(d,Bf(n,e,t,r,i,s,o,c,l,u))},d}function y0(){return Hw.apply(Bf(fT,mT,Qt,$c,Ao,Ki,Fc,Uc,_r,qc).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}const Ts=n=>()=>n;function v0(n,{sourceEvent:e,target:t,transform:r,dispatch:i}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},target:{value:t,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:i}})}function zt(n,e,t){this.k=n,this.x=e,this.y=t}zt.prototype={constructor:zt,scale:function(n){return n===1?this:new zt(this.k*n,this.x,this.y)},translate:function(n,e){return n===0&e===0?this:new zt(this.k,this.x+this.k*n,this.y+this.k*e)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var vr=new zt(1,0,0);$f.prototype=zt.prototype;function $f(n){for(;!n.__zoom;)if(!(n=n.parentNode))return vr;return n.__zoom}function Ia(n){n.stopImmediatePropagation()}function hi(n){n.preventDefault(),n.stopImmediatePropagation()}function w0(n){return(!n.ctrlKey||n.type==="wheel")&&!n.button}function T0(){var n=this;return n instanceof SVGElement?(n=n.ownerSVGElement||n,n.hasAttribute("viewBox")?(n=n.viewBox.baseVal,[[n.x,n.y],[n.x+n.width,n.y+n.height]]):[[0,0],[n.width.baseVal.value,n.height.baseVal.value]]):[[0,0],[n.clientWidth,n.clientHeight]]}function wh(){return this.__zoom||vr}function E0(n){return-n.deltaY*(n.deltaMode===1?.05:n.deltaMode?1:.002)*(n.ctrlKey?10:1)}function I0(){return navigator.maxTouchPoints||"ontouchstart"in this}function b0(n,e,t){var r=n.invertX(e[0][0])-t[0][0],i=n.invertX(e[1][0])-t[1][0],s=n.invertY(e[0][1])-t[0][1],o=n.invertY(e[1][1])-t[1][1];return n.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),o>s?(s+o)/2:Math.min(0,s)||Math.max(0,o))}function A0(){var n=w0,e=T0,t=b0,r=E0,i=I0,s=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],c=250,l=Dv,u=Cc("start","zoom","end"),d,p,m,_=500,A=150,k=0,x=10;function C(R){R.property("__zoom",wh).on("wheel.zoom",y,{passive:!1}).on("mousedown.zoom",v).on("dblclick.zoom",I).filter(i).on("touchstart.zoom",E).on("touchmove.zoom",b).on("touchend.zoom touchcancel.zoom",w).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}C.transform=function(R,H,O,j){var Y=R.selection?R.selection():R;Y.property("__zoom",wh),R!==Y?K(R,H,O,j):Y.interrupt().each(function(){L(this,arguments).event(j).start().zoom(null,typeof H=="function"?H.apply(this,arguments):H).end()})},C.scaleBy=function(R,H,O,j){C.scaleTo(R,function(){var Y=this.__zoom.k,Z=typeof H=="function"?H.apply(this,arguments):H;return Y*Z},O,j)},C.scaleTo=function(R,H,O,j){C.transform(R,function(){var Y=e.apply(this,arguments),Z=this.__zoom,te=O==null?$(Y):typeof O=="function"?O.apply(this,arguments):O,le=Z.invert(te),fe=typeof H=="function"?H.apply(this,arguments):H;return t(F(M(Z,fe),te,le),Y,o)},O,j)},C.translateBy=function(R,H,O,j){C.transform(R,function(){return t(this.__zoom.translate(typeof H=="function"?H.apply(this,arguments):H,typeof O=="function"?O.apply(this,arguments):O),e.apply(this,arguments),o)},null,j)},C.translateTo=function(R,H,O,j,Y){C.transform(R,function(){var Z=e.apply(this,arguments),te=this.__zoom,le=j==null?$(Z):typeof j=="function"?j.apply(this,arguments):j;return t(vr.translate(le[0],le[1]).scale(te.k).translate(typeof H=="function"?-H.apply(this,arguments):-H,typeof O=="function"?-O.apply(this,arguments):-O),Z,o)},j,Y)};function M(R,H){return H=Math.max(s[0],Math.min(s[1],H)),H===R.k?R:new zt(H,R.x,R.y)}function F(R,H,O){var j=H[0]-O[0]*R.k,Y=H[1]-O[1]*R.k;return j===R.x&&Y===R.y?R:new zt(R.k,j,Y)}function $(R){return[(+R[0][0]+ +R[1][0])/2,(+R[0][1]+ +R[1][1])/2]}function K(R,H,O,j){R.on("start.zoom",function(){L(this,arguments).event(j).start()}).on("interrupt.zoom end.zoom",function(){L(this,arguments).event(j).end()}).tween("zoom",function(){var Y=this,Z=arguments,te=L(Y,Z).event(j),le=e.apply(Y,Z),fe=O==null?$(le):typeof O=="function"?O.apply(Y,Z):O,We=Math.max(le[1][0]-le[0][0],le[1][1]-le[0][1]),_e=Y.__zoom,Ve=typeof H=="function"?H.apply(Y,Z):H,Ke=l(_e.invert(fe).concat(We/_e.k),Ve.invert(fe).concat(We/Ve.k));return function(Oe){if(Oe===1)Oe=Ve;else{var Ye=Ke(Oe),q=We/Ye[2];Oe=new zt(q,fe[0]-Ye[0]*q,fe[1]-Ye[1]*q)}te.zoom(null,Oe)}})}function L(R,H,O){return!O&&R.__zooming||new T(R,H)}function T(R,H){this.that=R,this.args=H,this.active=0,this.sourceEvent=null,this.extent=e.apply(R,H),this.taps=0}T.prototype={event:function(R){return R&&(this.sourceEvent=R),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(R,H){return this.mouse&&R!=="mouse"&&(this.mouse[1]=H.invert(this.mouse[0])),this.touch0&&R!=="touch"&&(this.touch0[1]=H.invert(this.touch0[0])),this.touch1&&R!=="touch"&&(this.touch1[1]=H.invert(this.touch1[0])),this.that.__zoom=H,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(R){var H=Ft(this.that).datum();u.call(R,this.that,new v0(R,{sourceEvent:this.sourceEvent,target:C,transform:this.that.__zoom,dispatch:u}),H)}};function y(R,...H){if(!n.apply(this,arguments))return;var O=L(this,H).event(R),j=this.__zoom,Y=Math.max(s[0],Math.min(s[1],j.k*Math.pow(2,r.apply(this,arguments)))),Z=Ln(R);if(O.wheel)(O.mouse[0][0]!==Z[0]||O.mouse[0][1]!==Z[1])&&(O.mouse[1]=j.invert(O.mouse[0]=Z)),clearTimeout(O.wheel);else{if(j.k===Y)return;O.mouse=[Z,j.invert(Z)],Ms(this),O.start()}hi(R),O.wheel=setTimeout(te,A),O.zoom("mouse",t(F(M(j,Y),O.mouse[0],O.mouse[1]),O.extent,o));function te(){O.wheel=null,O.end()}}function v(R,...H){if(m||!n.apply(this,arguments))return;var O=R.currentTarget,j=L(this,H,!0).event(R),Y=Ft(R.view).on("mousemove.zoom",fe,!0).on("mouseup.zoom",We,!0),Z=Ln(R,O),te=R.clientX,le=R.clientY;ev(R.view),Ia(R),j.mouse=[Z,this.__zoom.invert(Z)],Ms(this),j.start();function fe(_e){if(hi(_e),!j.moved){var Ve=_e.clientX-te,Ke=_e.clientY-le;j.moved=Ve*Ve+Ke*Ke>k}j.event(_e).zoom("mouse",t(F(j.that.__zoom,j.mouse[0]=Ln(_e,O),j.mouse[1]),j.extent,o))}function We(_e){Y.on("mousemove.zoom mouseup.zoom",null),tv(_e.view,j.moved),hi(_e),j.event(_e).end()}}function I(R,...H){if(n.apply(this,arguments)){var O=this.__zoom,j=Ln(R.changedTouches?R.changedTouches[0]:R,this),Y=O.invert(j),Z=O.k*(R.shiftKey?.5:2),te=t(F(M(O,Z),j,Y),e.apply(this,H),o);hi(R),c>0?Ft(this).transition().duration(c).call(K,te,j,R):Ft(this).call(C.transform,te,j,R)}}function E(R,...H){if(n.apply(this,arguments)){var O=R.touches,j=O.length,Y=L(this,H,R.changedTouches.length===j).event(R),Z,te,le,fe;for(Ia(R),te=0;te<j;++te)le=O[te],fe=Ln(le,this),fe=[fe,this.__zoom.invert(fe),le.identifier],Y.touch0?!Y.touch1&&Y.touch0[2]!==fe[2]&&(Y.touch1=fe,Y.taps=0):(Y.touch0=fe,Z=!0,Y.taps=1+!!d);d&&(d=clearTimeout(d)),Z&&(Y.taps<2&&(p=fe[0],d=setTimeout(function(){d=null},_)),Ms(this),Y.start())}}function b(R,...H){if(this.__zooming){var O=L(this,H).event(R),j=R.changedTouches,Y=j.length,Z,te,le,fe;for(hi(R),Z=0;Z<Y;++Z)te=j[Z],le=Ln(te,this),O.touch0&&O.touch0[2]===te.identifier?O.touch0[0]=le:O.touch1&&O.touch1[2]===te.identifier&&(O.touch1[0]=le);if(te=O.that.__zoom,O.touch1){var We=O.touch0[0],_e=O.touch0[1],Ve=O.touch1[0],Ke=O.touch1[1],Oe=(Oe=Ve[0]-We[0])*Oe+(Oe=Ve[1]-We[1])*Oe,Ye=(Ye=Ke[0]-_e[0])*Ye+(Ye=Ke[1]-_e[1])*Ye;te=M(te,Math.sqrt(Oe/Ye)),le=[(We[0]+Ve[0])/2,(We[1]+Ve[1])/2],fe=[(_e[0]+Ke[0])/2,(_e[1]+Ke[1])/2]}else if(O.touch0)le=O.touch0[0],fe=O.touch0[1];else return;O.zoom("touch",t(F(te,le,fe),O.extent,o))}}function w(R,...H){if(this.__zooming){var O=L(this,H).event(R),j=R.changedTouches,Y=j.length,Z,te;for(Ia(R),m&&clearTimeout(m),m=setTimeout(function(){m=null},_),Z=0;Z<Y;++Z)te=j[Z],O.touch0&&O.touch0[2]===te.identifier?delete O.touch0:O.touch1&&O.touch1[2]===te.identifier&&delete O.touch1;if(O.touch1&&!O.touch0&&(O.touch0=O.touch1,delete O.touch1),O.touch0)O.touch0[1]=this.__zoom.invert(O.touch0[0]);else if(O.end(),O.taps===2&&(te=Ln(te,this),Math.hypot(p[0]-te[0],p[1]-te[1])<x)){var le=Ft(this).on("dblclick.zoom");le&&le.apply(this,arguments)}}}return C.wheelDelta=function(R){return arguments.length?(r=typeof R=="function"?R:Ts(+R),C):r},C.filter=function(R){return arguments.length?(n=typeof R=="function"?R:Ts(!!R),C):n},C.touchable=function(R){return arguments.length?(i=typeof R=="function"?R:Ts(!!R),C):i},C.extent=function(R){return arguments.length?(e=typeof R=="function"?R:Ts([[+R[0][0],+R[0][1]],[+R[1][0],+R[1][1]]]),C):e},C.scaleExtent=function(R){return arguments.length?(s[0]=+R[0],s[1]=+R[1],C):[s[0],s[1]]},C.translateExtent=function(R){return arguments.length?(o[0][0]=+R[0][0],o[1][0]=+R[1][0],o[0][1]=+R[0][1],o[1][1]=+R[1][1],C):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},C.constrain=function(R){return arguments.length?(t=R,C):t},C.duration=function(R){return arguments.length?(c=+R,C):c},C.interpolate=function(R){return arguments.length?(l=R,C):l},C.on=function(){var R=u.on.apply(u,arguments);return R===u?C:R},C.clickDistance=function(R){return arguments.length?(k=(R=+R)*R,C):Math.sqrt(k)},C.tapDistance=function(R){return arguments.length?(x=+R,C):x},C}class Th{constructor(e,t){this.svg=Ft(e),this.familyService=t,this.width=0,this.height=0,this.currentScale=1,this.highlightedIds=new Set,this.zoomBehavior=null,this.selectedMemberForAdd=null,this.suggestionsGroup=null,this.nodePositions=new Map,this.init()}init(){this.updateDimensions(),this.mainGroup=this.svg.append("g").attr("class","main-group"),this.zoomBehavior=A0().scaleExtent([.1,4]).filter(t=>!t.button).on("zoom",t=>{this.mainGroup.attr("transform",t.transform),this.currentScale=t.transform.k}),this.svg.call(this.zoomBehavior),this.svg.on("click",t=>{t.target===this.svg.node()&&this.clearSuggestions()});let e;window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{var r;this.updateDimensions();const t=(r=this.familyService)==null?void 0:r.getAllMembers();t&&t.length>0&&this.renderTree(t)},250)})}updateDimensions(){const e=this.svg.node().parentElement;this.width=e.clientWidth,this.height=Math.max(e.clientHeight,500),this.svg.attr("width",this.width).attr("height",this.height)}setZoom(e){this.currentScale=e;const t=$f(this.svg.node()),r=vr.translate(t.x,t.y).scale(e);this.svg.transition().duration(300).call(this.zoomBehavior.transform,r)}resetZoom(){this.currentScale=1,this.centerTree()}renderTree(e){if(this.mainGroup.selectAll("*").remove(),this.selectedMemberForAdd=null,this.nodePositions.clear(),e.length===0){this.showEmptyState();return}const t=this.width<768,r=t?90:100,i=t?65:75,s=50,o=80,c=20,l=this.buildSpouseMap(e),u=e.find(p=>p.relationship==="Self")||e[0];this.calculatePositions(e,u,l,r,i,s,o,c);const d=t?60:100;this.drawLinks(e,d,r,i,l),this.drawNodes(e,d,r,i,t),this.suggestionsGroup=this.mainGroup.append("g").attr("class","suggestions-group"),this.centerTreeOnMember(u)}buildSpouseMap(e){const t=new Map;return(this.familyService.relationships||[]).filter(i=>i.type==="spouse").forEach(i=>{t.set(i.member1Id,i.member2Id),t.set(i.member2Id,i.member1Id)}),e.forEach(i=>{i.spouseId&&!t.has(i.id)&&(t.set(i.id,i.spouseId),t.set(i.spouseId,i.id))}),t}calculatePositions(e,t,r,i,s,o,c,l){const u=C=>e.filter(M=>M.parentIds&&M.parentIds.includes(C)),d=C=>!C.parentIds||C.parentIds.length===0?[]:e.filter(M=>C.parentIds.includes(M.id)),p=new Map,m=[{member:t,level:0}],_=new Set;for(;m.length>0;){const{member:C,level:M}=m.shift();if(_.has(C.id))continue;_.add(C.id),p.set(C.id,M);const F=r.get(C.id);if(F&&!_.has(F)){const $=e.find(K=>K.id===F);$&&m.push({member:$,level:M})}d(C).forEach($=>{_.has($.id)||m.push({member:$,level:M-1})}),u(C.id).forEach($=>{_.has($.id)||m.push({member:$,level:M+1})})}const A=new Map;e.forEach(C=>{const M=p.get(C.id)??0;A.has(M)||A.set(M,[]),A.get(M).push(C)});const k=Array.from(A.keys()).sort((C,M)=>C-M),x=Math.min(...k);[...k].reverse().forEach(C=>{const M=A.get(C),F=(C-x)*(s+c),$=[],K=new Set;M.forEach(y=>{if(K.has(y.id))return;const v=r.get(y.id),I=v?M.find(b=>b.id===v):null,E={members:[y],children:[]};K.add(y.id),E.children.push(...u(y.id)),I&&(E.members.push(I),K.add(I.id),u(I.id).forEach(b=>{E.children.find(w=>w.id===b.id)||E.children.push(b)})),$.push(E)});let L=0;$.forEach(y=>{const v=y.children.map(E=>this.nodePositions.get(E.id)).filter(Boolean);let I;if(v.length>0){const E=Math.min(...v.map(R=>R.x)),b=Math.max(...v.map(R=>R.x)),w=(E+b+i)/2;if(y.members.length===2){const R=i*2+l;I=w-R/2}else I=w-i/2}else I=L;y.members.length===2?(this.nodePositions.set(y.members[0].id,{x:I,y:F}),this.nodePositions.set(y.members[1].id,{x:I+i+l,y:F}),L=Math.max(L,I+i*2+l+o)):(this.nodePositions.set(y.members[0].id,{x:I,y:F}),L=Math.max(L,I+i+o))});const T=M.map(y=>this.nodePositions.get(y.id)).filter(Boolean);if(T.length>0){const y=Math.min(...T.map(E=>E.x)),v=Math.max(...T.map(E=>E.x))+i,I=-(y+v)/2;M.forEach(E=>{const b=this.nodePositions.get(E.id);b&&this.nodePositions.set(E.id,{x:b.x+I,y:b.y})})}}),this.fixSiblingOverlaps(e,r,i,o,l)}fixSiblingOverlaps(e,t,r,i,s){const o=new Map;e.forEach(c=>{if(c.parentIds&&c.parentIds.length>0){const l=[...c.parentIds].sort().join("-");o.has(l)||o.set(l,[]),o.get(l).push(c)}}),o.forEach(c=>{if(c.length<2)return;c.sort((A,k)=>{const x=this.nodePositions.get(A.id),C=this.nodePositions.get(k.id);return((x==null?void 0:x.x)||0)-((C==null?void 0:C.x)||0)});for(let A=1;A<c.length;A++){const k=c[A-1],x=c[A],C=this.nodePositions.get(k.id),M=this.nodePositions.get(x.id);if(!C||!M)continue;const F=t.get(k.id),$=F?this.nodePositions.get(F):null,L=($?Math.max(C.x,$.x)+r:C.x+r)+i;if(M.x<L){const T=L-M.x;this.nodePositions.set(x.id,{x:M.x+T,y:M.y});const y=t.get(x.id);if(y){const v=this.nodePositions.get(y);v&&this.nodePositions.set(y,{x:v.x+T,y:v.y})}}}const l=c.map(A=>this.nodePositions.get(A.id)).filter(Boolean);if(l.length===0)return;const u=Math.min(...l.map(A=>A.x)),d=Math.max(...l.map(A=>A.x))+r,p=(u+d)/2,_=(c[0].parentIds||[]).map(A=>e.find(k=>k.id===A)).filter(Boolean);if(_.length===2&&t.get(_[0].id)===_[1].id){const A=r*2+s,k=p-A/2,x=this.nodePositions.get(_[0].id),C=this.nodePositions.get(_[1].id);x&&C&&(this.nodePositions.set(_[0].id,{x:k,y:x.y}),this.nodePositions.set(_[1].id,{x:k+r+s,y:C.y}))}else if(_.length===1){const A=this.nodePositions.get(_[0].id);A&&this.nodePositions.set(_[0].id,{x:p-r/2,y:A.y})}})}drawLinks(e,t,r,i,s){const o=this.mainGroup.append("g").attr("class","links").attr("transform",`translate(${this.width/2}, ${t})`),c=new Set;e.forEach(l=>{const u=s.get(l.id);if(!u)return;const d=[l.id,u].sort().join("-");if(c.has(d))return;c.add(d);const p=this.nodePositions.get(l.id),m=this.nodePositions.get(u);if(!p||!m||Math.abs(p.y-m.y)>10)return;const _=p.x<m.x?p:m,A=p.x<m.x?m:p,k=_.y+i/2,x=_.x+r,C=A.x;o.append("line").attr("x1",x).attr("y1",k).attr("x2",C).attr("y2",k).attr("stroke","#f43f5e").attr("stroke-width",3)}),e.forEach(l=>{if(!l.parentIds||l.parentIds.length===0)return;const u=this.nodePositions.get(l.id);if(!u)return;const d=l.parentIds.map(x=>({id:x,pos:this.nodePositions.get(x)})).filter(x=>x.pos).sort((x,C)=>x.pos.x-C.pos.x);if(d.length===0)return;let p,m;if(d.length===2&&s.get(d[0].id)===d[1].id){const x=d[0].pos,C=d[1].pos;p=(x.x+r+C.x)/2,m=x.y+i}else p=d[0].pos.x+r/2,m=d[0].pos.y+i;const _=u.x+r/2,A=u.y,k=m+(A-m)/2;o.append("path").attr("d",`M${p},${m} L${p},${k} L${_},${k} L${_},${A}`).attr("fill","none").attr("stroke","#94a3b8").attr("stroke-width",2.5)})}drawNodes(e,t,r,i,s){const o=this.mainGroup.append("g").attr("class","nodes").attr("transform",`translate(${this.width/2}, ${t})`),c=s?10:12;e.forEach(l=>{const u=this.nodePositions.get(l.id);if(!u)return;const d=o.append("g").attr("class",`tree-node ${this.highlightedIds.has(l.id)?"highlighted":""} ${l.isAlive?"":"deceased"}`).attr("transform",`translate(${u.x+r/2}, ${u.y+i/2})`).style("cursor","pointer");this.drawMemberTile(d,l,r,i,c,s,!1)})}centerTree(){const e=this.mainGroup.node().getBBox();if(e.width===0&&e.height===0)return;const t=Math.min(this.width/(e.width+150),this.height/(e.height+150),1),r=e.x+e.width/2,i=e.y+e.height/2,s=vr.translate(this.width/2-r*t,this.height/2-i*t).scale(t);this.currentScale=t,this.svg.transition().duration(750).call(this.zoomBehavior.transform,s)}centerTreeOnMember(e){if(!e){this.centerTree();return}const t=this.nodePositions.get(e.id);if(!t){this.centerTree();return}const r=this.mainGroup.node().getBBox();if(r.width===0&&r.height===0)return;const i=Math.min(this.width/(r.width+150),this.height/(r.height+150),1),s=this.width<768,o=s?60:100,c=s?90:100,l=s?65:75,u=this.width/2+t.x+c/2,d=o+t.y+l/2,p=vr.translate(this.width/2-u*i,this.height/2-d*i).scale(i);this.currentScale=i,this.svg.transition().duration(750).call(this.zoomBehavior.transform,p)}drawMemberTile(e,t,r,i,s,o,c){const l=this,u=t.relationship==="Other";if(e.append("rect").attr("x",-r/2).attr("y",-i/2).attr("width",r).attr("height",i).attr("rx",s).attr("ry",s).attr("fill",c?"rgba(255,255,255,0.95)":t.isAlive===!1?"#9ca3af":t.gender==="male"?"#3b82f6":"#ec4899").attr("stroke",c?u?"#6b7280":t.gender==="male"?"#3b82f6":"#ec4899":"#fff").attr("stroke-width",c?2.5:3).attr("stroke-dasharray",c?"8,4":"none").attr("filter",c?"none":"drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))").on("click",d=>{d.stopPropagation(),c?(window.dispatchEvent(new CustomEvent("addMemberWithRelation",{detail:{relationship:t.relationship,gender:t.gender,referenceMemberId:t._referenceMemberId}})),l.clearSuggestions()):window.dispatchEvent(new CustomEvent("memberSelected",{detail:t}))}),c){const d=u?"➕":t.gender==="male"?"👨":"👩",p=u?"#6b7280":t.gender==="male"?"#3b82f6":"#ec4899";e.append("text").attr("x",0).attr("y",-5).attr("text-anchor","middle").attr("font-size","24px").text(d),e.append("text").attr("x",0).attr("y",22).attr("text-anchor","middle").attr("font-size","12px").attr("font-weight","bold").attr("fill",p).text(t.relationship),e.append("text").attr("x",0).attr("y",38).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#6b7280").text("Click to add")}else{t.photoURL?e.append("foreignObject").attr("x",-r/2+10).attr("y",-i/2+10).attr("width",40).attr("height",40).append("xhtml:img").attr("src",t.photoURL).attr("alt",t.name||"Profile").style("width","100%").style("height","100%").style("object-fit","cover").style("border-radius","8px").style("border","2px solid white"):e.append("text").attr("x",-r/2+30).attr("y",-i/2+35).attr("text-anchor","middle").attr("font-size","24px").text(t.gender==="male"?"👨":"👩"),e.append("text").attr("x",-r/2+60).attr("y",-i/2+22).attr("text-anchor","start").attr("font-size","11px").attr("font-weight","bold").attr("fill","white").text(()=>{let _=t.firstName?`${t.firstName} ${t.lastName||""}`.trim():t.name||"";return _=_.replace(/^(Pandit |Shri |Smt\. |Late |Dr\. |Baby )/g,""),_.length>14?_.substring(0,12)+"...":_}),e.append("text").attr("x",-r/2+60).attr("y",-i/2+38).attr("text-anchor","start").attr("font-size","9px").attr("fill","rgba(255, 255, 255, 0.9)").text(t.relationship||""),e.append("text").attr("y",i/2-10).attr("text-anchor","middle").attr("font-size","9px").attr("fill","rgba(255, 255, 255, 0.8)").text(()=>{if(t.age)return`Age: ${t.age}`;if(t.birthDate){const _=new Date(t.birthDate).getFullYear();return t.isAlive?`b. ${_}`:`${_} - ?`}return""});const d=o?20:24,p=r/2-d/2-5,m=-i/2+5;e.append("circle").attr("cx",p).attr("cy",m+d/2).attr("r",d/2).attr("fill","#10b981").attr("stroke","#fff").attr("stroke-width",2).attr("class","add-member-btn").style("cursor","pointer").attr("filter","drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))").on("click",_=>{_.stopPropagation(),l.showSuggestions(t)}),e.append("text").attr("x",p).attr("y",m+d/2).attr("text-anchor","middle").attr("dominant-baseline","central").attr("font-size",o?"14px":"16px").attr("font-weight","bold").attr("fill","white").style("pointer-events","none").text("+")}}showSuggestions(e){this.clearSuggestions(),this.selectedMemberForAdd=e;const t=this.width<768,r=t?60:100,i=t?85:95,s=t?60:70,o=t?90:100,c=t?65:75;this.mainGroup.selectAll(".tree-node").classed("blurred",!0);const l=this.nodePositions.get(e.id);if(l){const _=`translate(${l.x+o/2}, ${l.y+c/2})`;this.mainGroup.selectAll(".tree-node").filter(function(){return Ft(this).attr("transform")===_}).classed("blurred",!1).classed("selected-for-add",!0)}const u=l?l.x+o/2:0,d=l?l.y+c/2:0,p=this.getSuggestedRelationships(e),m=this.mainGroup.select(".suggestions-group");m.attr("transform",`translate(${this.width/2}, ${r})`),p.forEach(_=>{let A,k;switch(_.position){case"top":A=u,k=d-130;break;case"top-left":A=u-i-40,k=d-130;break;case"top-right":A=u+i+40,k=d-130;break;case"bottom":A=u,k=d+130;break;case"bottom-left":A=u-i-30,k=d+130;break;case"bottom-right":A=u+i+30,k=d+130;break;case"right":A=u+o+50,k=d;break;case"far-right":A=u+o*2+70,k=d;break;default:A=u,k=d+130}const x=_.relationship==="Other"?"#6b7280":_.gender==="male"?"#3b82f6":"#ec4899";m.append("path").attr("d",`M${u},${d} L${A},${k}`).attr("fill","none").attr("stroke",x).attr("stroke-width",2).attr("stroke-dasharray","6,4").attr("opacity",.6);const C={..._,_referenceMemberId:e.id},M=m.append("g").attr("transform",`translate(${A}, ${k})`).style("cursor","pointer").datum(C);this.drawMemberTile(M,C,i,s,10,t,!0)})}getSuggestedRelationships(e){const t=[],r=this.familyService.getAllMembers(),i=e.parentIds&&e.parentIds.length>0,s=i&&r.some(u=>e.parentIds.includes(u.id)&&u.gender==="male"),o=i&&r.some(u=>e.parentIds.includes(u.id)&&u.gender==="female"),l=(this.familyService.relationships||[]).some(u=>u.type==="spouse"&&(u.member1Id===e.id||u.member2Id===e.id));return s||t.push({relationship:"Father",gender:"male",position:"top-left"}),o||t.push({relationship:"Mother",gender:"female",position:s?"top-right":"top"}),t.push({relationship:"Son",gender:"male",position:"bottom-left"}),t.push({relationship:"Daughter",gender:"female",position:"bottom-right"}),l||t.push({relationship:e.gender==="male"?"Wife":"Husband",gender:e.gender==="male"?"female":"male",position:"right"}),t.push({relationship:"Other",gender:"",position:l?"right":"far-right"}),t}clearSuggestions(){this.mainGroup.select(".suggestions-group").selectAll("*").remove(),this.selectedMemberForAdd=null,this.mainGroup.selectAll(".tree-node").classed("blurred",!1).classed("selected-for-add",!1)}handleNodeClick(e){window.dispatchEvent(new CustomEvent("memberSelected",{detail:e}))}highlightMembers(e){this.highlightedIds=new Set(e),this.renderTree(this.familyService.getAllMembers())}filterMembers(e){const t=this.familyService.getAllMembers().filter(r=>e.includes(r.id));this.renderTree(t)}renderTimeline(e){if(this.mainGroup.selectAll("*").remove(),e.length===0){this.showEmptyState();return}const t=e.filter(l=>l.birthDate).sort((l,u)=>new Date(l.birthDate)-new Date(u.birthDate)),r=l_(t,l=>new Date(l.birthDate)),i=new Date,s=y0().domain([r,i]).range([100,this.width-100]),o=__(s).ticks(10).tickFormat(qc("%Y"));this.mainGroup.append("g").attr("class","timeline-axis").attr("transform",`translate(0, ${this.height/2})`).call(o);const c=this.mainGroup.selectAll(".timeline-point").data(t).enter().append("g").attr("class","timeline-point").attr("transform",(l,u)=>`translate(${s(new Date(l.birthDate))}, ${this.height/2+(u%2===0?-80:80)})`);c.append("circle").attr("r",20).attr("fill",l=>l.gender==="male"?"#4A90E2":"#E24A90").style("cursor","pointer").on("click",(l,u)=>this.handleNodeClick(u)),c.append("text").attr("text-anchor","middle").attr("dy",35).attr("font-size","10px").text(l=>l.name),c.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",(l,u)=>u%2===0?80:-80).attr("stroke","#ccc").attr("stroke-dasharray","2,2")}renderGrid(e){if(this.mainGroup.selectAll("*").remove(),e.length===0){this.showEmptyState();return}const t=Math.ceil(Math.sqrt(e.length)),r=150,i=180,s=20,o=this.mainGroup.selectAll(".grid-card").data(e).enter().append("g").attr("class","grid-card").attr("transform",(c,l)=>`translate(${50+l%t*(r+s)}, ${50+Math.floor(l/t)*(i+s)})`);o.append("rect").attr("width",r).attr("height",i).attr("rx",10).attr("fill","#fff").attr("stroke","#ddd").attr("stroke-width",1).style("cursor","pointer").on("click",(c,l)=>this.handleNodeClick(l)),o.append("circle").attr("cx",r/2).attr("cy",40).attr("r",25).attr("fill",c=>c.gender==="male"?"#4A90E2":"#E24A90"),o.append("text").attr("x",r/2).attr("y",40).attr("text-anchor","middle").attr("dy",8).attr("font-size","20px").text(c=>c.gender==="male"?"👨":"👩"),o.append("text").attr("x",r/2).attr("y",85).attr("text-anchor","middle").attr("font-size","12px").attr("font-weight","bold").text(c=>c.name),o.append("text").attr("x",r/2).attr("y",105).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#666").text(c=>c.birthDate?new Date(c.birthDate).getFullYear():""),o.append("text").attr("x",r/2).attr("y",125).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#888").text(c=>c.profession||"")}showEmptyState(){this.mainGroup.append("text").attr("x",this.width/2).attr("y",this.height/2).attr("text-anchor","middle").attr("font-size","18px").attr("fill","#999").text('No family members to display. Click "Add Member" to get started.')}}class Eh{constructor(e){this.familyService=e,this.modal=document.getElementById("memberModal"),this.modalBody=document.getElementById("modalBody"),this.currentMember=null,this.selectedPhoto=null,this.photoPreviewURL=null,console.log("MemberModal initialized, modal element:",this.modal),this.modal?this.bindEvents():console.error("MemberModal: #memberModal element not found in DOM")}bindEvents(){var e,t,r,i,s;(e=document.getElementById("closeModal"))==null||e.addEventListener("click",()=>{this.close()}),(t=document.getElementById("cancelBtn"))==null||t.addEventListener("click",()=>{this.close()}),(r=document.getElementById("saveBtn"))==null||r.addEventListener("click",()=>{this.save()}),(i=document.getElementById("deleteMemberBtn"))==null||i.addEventListener("click",()=>{this.deleteMember()}),(s=this.modal)==null||s.addEventListener("click",o=>{o.target===this.modal&&this.close()}),window.addEventListener("memberSelected",o=>{this.open(o.detail)})}open(e=null){if(console.log("MemberModal.open() called"),!this.modal&&(console.error("Cannot open modal: modal element is null"),this.modal=document.getElementById("memberModal"),this.modalBody=document.getElementById("modalBody"),!this.modal)){alert("Error: Modal element not found");return}this.currentMember=e,this.selectedPhoto=null,this.photoPreviewURL=null,this.photoToDelete=null,this.preSelectedRelationship=null,this.preSelectedGender=null,this.referenceMemberId=null,this.relationshipToReference=null,this._pendingParentUpdate=null,this.renderForm();const t=document.getElementById("deleteMemberBtn");t&&(t.style.display=e?"block":"none"),this.modal.classList.add("active"),document.body.style.overflow="hidden",console.log("Modal should now be visible, classList:",this.modal.classList)}openWithRelationship(e,t,r=null){if(console.log("MemberModal.openWithRelationship() called:",e,t,r),!this.modal&&(this.modal=document.getElementById("memberModal"),this.modalBody=document.getElementById("modalBody"),!this.modal)){alert("Error: Modal element not found");return}if(this.currentMember=null,this.selectedPhoto=null,this.photoPreviewURL=null,this.photoToDelete=null,this.preSelectedRelationship=e==="Other"?null:e,this.preSelectedGender=t||null,r)this.referenceMemberId=r;else{const s=this.familyService.getAllMembers().find(o=>o.isCurrentUser);this.referenceMemberId=(s==null?void 0:s.id)||null}this.relationshipToReference=e,this.renderForm();const i=document.getElementById("deleteMemberBtn");i&&(i.style.display="none"),this.modal.classList.add("active"),document.body.style.overflow="hidden"}close(){this.modal.classList.remove("active"),document.body.style.overflow="",this.currentMember=null}getParentOptions(e=null){return this.familyService.getAllMembers().map(r=>{const i=r.firstName?`${r.firstName} ${r.lastName||""}`.trim():r.name,s=e===r.id?"selected":"";return`<option value="${r.id}" ${s}>${i}</option>`}).join("")}getSelectedAttr(e,t,r){return e==="gender"&&this.preSelectedGender===t||e==="relationship"&&this.preSelectedRelationship===t||r&&this.currentMember&&this.currentMember[e]===t?"selected":""}renderForm(){var i,s,o,c,l,u;const e=this.currentMember!==null;document.getElementById("modalTitle").textContent=e?"Edit Member":"Add New Member";let t="",r="";if(e){if(this.currentMember.firstName)t=this.currentMember.firstName,r=this.currentMember.lastName||"";else if(this.currentMember.name){const d=this.currentMember.name.split(" ");t=d[0]||"",r=d.slice(1).join(" ")||""}}this.modalBody.innerHTML=`
            <form id="memberForm" class="member-form">
                <!-- Photo Upload Section - HIDDEN (Firebase Storage disabled) -->
                <!-- TODO: Uncomment when Firebase Storage is enabled
                <div class="form-group photo-upload-section">
                    <label>Profile Photo</label>
                    <div class="photo-upload-container">
                        <div class="photo-preview" id="photoPreview">
                            ${e&&this.currentMember.photoURL?`<img src="${this.currentMember.photoURL}" alt="Profile photo" class="preview-image">`:'<div class="photo-placeholder">📷<br>No photo</div>'}
                        </div>
                        <div class="photo-upload-controls">
                            <input type="file" id="photoInput" name="photo" accept="image/*" class="file-input">
                            <label for="photoInput" class="btn btn-secondary btn-small">Choose Photo</label>
                            ${e&&this.currentMember.photoURL?'<button type="button" id="removePhotoBtn" class="btn btn-secondary btn-small">Remove Photo</button>':""}
                        </div>
                    </div>
                </div>
                -->

                <!-- Name Fields -->
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">First Name *</label>
                        <input type="text" id="firstName" name="firstName" required
                            value="${t}"
                            placeholder="First name">
                    </div>

                    <div class="form-group">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName"
                            value="${r}"
                            placeholder="Last name">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="gender">Gender *</label>
                        <select id="gender" name="gender" required>
                            <option value="">Select gender</option>
                            <option value="male" ${this.getSelectedAttr("gender","male",e)}>Male</option>
                            <option value="female" ${this.getSelectedAttr("gender","female",e)}>Female</option>
                            <option value="other" ${this.getSelectedAttr("gender","other",e)}>Other</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="relationship">Relationship</label>
                        <select id="relationship" name="relationship">
                            <option value="">Select relationship</option>
                            <option value="Father" ${this.getSelectedAttr("relationship","Father",e)}>Father</option>
                            <option value="Mother" ${this.getSelectedAttr("relationship","Mother",e)}>Mother</option>
                            <option value="Son" ${this.getSelectedAttr("relationship","Son",e)}>Son</option>
                            <option value="Daughter" ${this.getSelectedAttr("relationship","Daughter",e)}>Daughter</option>
                            <option value="Brother" ${this.getSelectedAttr("relationship","Brother",e)}>Brother</option>
                            <option value="Sister" ${this.getSelectedAttr("relationship","Sister",e)}>Sister</option>
                            <option value="Grandfather" ${this.getSelectedAttr("relationship","Grandfather",e)}>Grandfather</option>
                            <option value="Grandmother" ${this.getSelectedAttr("relationship","Grandmother",e)}>Grandmother</option>
                            <option value="Grandson" ${this.getSelectedAttr("relationship","Grandson",e)}>Grandson</option>
                            <option value="Granddaughter" ${this.getSelectedAttr("relationship","Granddaughter",e)}>Granddaughter</option>
                            <option value="Uncle" ${this.getSelectedAttr("relationship","Uncle",e)}>Uncle</option>
                            <option value="Aunt" ${this.getSelectedAttr("relationship","Aunt",e)}>Aunt</option>
                            <option value="Nephew" ${this.getSelectedAttr("relationship","Nephew",e)}>Nephew</option>
                            <option value="Niece" ${this.getSelectedAttr("relationship","Niece",e)}>Niece</option>
                            <option value="Cousin" ${this.getSelectedAttr("relationship","Cousin",e)}>Cousin</option>
                            <option value="Husband" ${this.getSelectedAttr("relationship","Husband",e)}>Husband</option>
                            <option value="Wife" ${this.getSelectedAttr("relationship","Wife",e)}>Wife</option>
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
                        <label for="age">Age</label>
                        <input type="number" id="age" name="age" min="0" max="150"
                            value="${e&&this.currentMember.age?this.currentMember.age:""}"
                            placeholder="Age (auto-calculated from DOB)">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="birthPlace">Place of Birth</label>
                        <input type="text" id="birthPlace" name="birthPlace"
                            value="${e&&this.currentMember.birthPlace?this.currentMember.birthPlace:""}"
                            placeholder="City, State">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="parent1">Parent 1</label>
                        <select id="parent1" name="parent1">
                            <option value="">Select parent</option>
                            ${this.getParentOptions(e?(i=this.currentMember.parentIds)==null?void 0:i[0]:null)}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="parent2">Parent 2</label>
                        <select id="parent2" name="parent2">
                            <option value="">Select parent</option>
                            ${this.getParentOptions(e?(s=this.currentMember.parentIds)==null?void 0:s[1]:null)}
                        </select>
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
        `,(o=document.getElementById("isAlive"))==null||o.addEventListener("change",d=>{const p=document.getElementById("deathDateRow");p.style.display=d.target.checked?"none":"flex"}),(c=document.getElementById("photoInput"))==null||c.addEventListener("change",d=>{this.handlePhotoSelect(d)}),(l=document.getElementById("removePhotoBtn"))==null||l.addEventListener("click",()=>{this.handlePhotoRemove()}),(u=document.getElementById("birthDate"))==null||u.addEventListener("change",d=>{const p=document.getElementById("age");if(d.target.value&&!p.value){const m=new Date(d.target.value),_=new Date,A=_.getFullYear()-m.getFullYear(),k=_.getMonth()-m.getMonth();k<0||k===0&&_.getDate()<m.getDate()?p.value=A-1:p.value=A}})}handlePhotoSelect(e){const t=e.target.files[0];if(t){if(!t.type.startsWith("image/")){alert("Please select an image file"),e.target.value="";return}if(t.size>5*1024*1024){alert("Image size must be less than 5MB"),e.target.value="";return}this.selectedPhoto=t;const r=new FileReader;r.onload=i=>{this.photoPreviewURL=i.target.result;const s=document.getElementById("photoPreview");s.innerHTML=`<img src="${i.target.result}" alt="Preview" class="preview-image">`},r.readAsDataURL(t)}}handlePhotoRemove(){this.selectedPhoto=null,this.photoPreviewURL=null;const e=document.getElementById("photoPreview");e.innerHTML='<div class="photo-placeholder">📷<br>No photo</div>',document.getElementById("photoInput").value="",this.currentMember&&this.currentMember.photoURL&&(this.photoToDelete=this.currentMember.photoURL)}async save(){var c,l,u;const e=document.getElementById("memberForm"),t=new FormData(e),r=(c=t.get("firstName"))==null?void 0:c.trim();(l=t.get("lastName"))==null||l.trim();const i=t.get("gender");if(!r){alert("First Name is required"),(u=document.getElementById("memberForm").querySelector('[name="firstName"]'))==null||u.focus();return}if(!i){alert("Gender is required");return}const s=document.getElementById("saveBtn"),o=s.textContent;s.disabled=!0,s.textContent="Saving...";try{const d=t.get("lastName")||"",p=d?`${r} ${d}`:r,m=[],_=t.get("parent1"),A=t.get("parent2");_&&m.push(_),A&&m.push(A);const k={firstName:r,lastName:d,name:p,gender:i,relationship:t.get("relationship")||null,age:t.get("age")?parseInt(t.get("age")):null,birthDate:t.get("birthDate")||null,birthPlace:t.get("birthPlace")||null,isAlive:document.getElementById("isAlive").checked,deathDate:t.get("deathDate")||null,deathPlace:t.get("deathPlace")||null,gotra:t.get("gotra")||null,kuldevta:t.get("kuldevta")||null,nakshatra:t.get("nakshatra")||null,rashi:t.get("rashi")||null,profession:t.get("profession")||null,education:t.get("education")||null,phone:t.get("phone")||null,email:t.get("email")||null,address:t.get("address")||null,notes:t.get("notes")||null,parentIds:m.length>0?m:null};let x=this.currentMember?this.currentMember.id:null;if(this.selectedPhoto&&(console.log("Photo selected but Storage not enabled. Saving member without photo."),k.photoURL=null),this.referenceMemberId&&this.relationshipToReference&&!this.currentMember){const C=this.familyService.getMember(this.referenceMemberId);C&&await this.establishRelationship(k,C,this.relationshipToReference)}if(this.currentMember)await this.familyService.updateMember(this.currentMember.id,k);else{const C=await this.familyService.addMember(k);if(this._pendingParentUpdate&&C){const M=this.familyService.getMember(this._pendingParentUpdate.childId);if(M){const F=M.parentIds||[];F.includes(C.id)||(F.push(C.id),await this.familyService.updateMember(M.id,{parentIds:F}))}this._pendingParentUpdate=null}this.referenceMemberId&&this.relationshipToReference&&(this.relationshipToReference==="Husband"||this.relationshipToReference==="Wife")&&await this.familyService.addSpouse(this.referenceMemberId,C.id)}this.referenceMemberId=null,this.relationshipToReference=null,this.selectedPhoto=null,this.photoPreviewURL=null,this.photoToDelete=null,window.dispatchEvent(new Event("familyDataChanged")),s.disabled=!1,s.textContent=o,this.close()}catch(d){console.error("Error saving member:",d),alert("Failed to save member: "+d.message),s.disabled=!1,s.textContent=o}}async establishRelationship(e,t,r){switch(r){case"Father":case"Mother":this._pendingParentUpdate={childId:t.id,relationship:r};break;case"Son":case"Daughter":e.parentIds||(e.parentIds=[]),e.parentIds.includes(t.id)||e.parentIds.push(t.id),t.spouseId&&e.parentIds.push(t.spouseId);break;case"Brother":case"Sister":t.parentIds&&t.parentIds.length>0&&(e.parentIds=[...t.parentIds]);break;case"Grandfather":case"Grandmother":break;case"Grandson":case"Granddaughter":const i=this.familyService.getChildren(t.id);i.length>0&&(e.parentIds=[i[0].id]);break}}async deleteMember(){if(!this.currentMember)return;const e=this.currentMember.name||`${this.currentMember.firstName||""} ${this.currentMember.lastName||""}`.trim();if(!confirm(`Are you sure you want to delete ${e}?

This will also remove all relationships with this member and cannot be undone.`))return;const r=document.getElementById("deleteMemberBtn"),i=r.textContent;r.disabled=!0,r.textContent="Deleting...";try{console.log("Deleting member:",this.currentMember.id),await this.familyService.deleteMember(this.currentMember.id),console.log("Member deleted successfully"),r.disabled=!1,r.textContent=i,this.close(),window.dispatchEvent(new Event("familyDataChanged"))}catch(s){console.error("Error deleting member:",s),alert("Failed to delete member: "+s.message),r.disabled=!1,r.textContent=i}}}function S0(n,e){let t;return function(...i){const s=()=>{clearTimeout(t),n(...i)};clearTimeout(t),t=setTimeout(s,e)}}class R0{constructor(e=null){this.familyService=e||new e_,this.treeRenderer=null,this.memberModal=null,this.currentView="tree"}initWithService(){this.treeRenderer=new Th("#familyTree",this.familyService),this.memberModal=new Eh(this.familyService),this.bindEvents(),this.render(),this.updateStatistics()}init(){this.familyService.clearAllData(),this.treeRenderer=new Th("#familyTree",this.familyService),this.memberModal=new Eh(this.familyService),this.loadSampleData(),this.bindEvents(),this.render(),this.updateStatistics()}loadSampleData(){const e=this.familyService.addMember({firstName:"Ramchandra",lastName:"Sharma",name:"Shri Ramchandra Sharma",gender:"male",relationship:"Grandfather",age:74,birthDate:"1950-01-15",birthPlace:"Varanasi, Uttar Pradesh",gotra:"Bharadwaj",profession:"Retired Teacher",isAlive:!0}),t=this.familyService.addMember({firstName:"Lakshmi",lastName:"Devi",name:"Smt. Lakshmi Devi",gender:"female",relationship:"Grandmother",age:69,birthDate:"1955-03-10",birthPlace:"Allahabad, Uttar Pradesh",profession:"Homemaker",isAlive:!0});this.familyService.addSpouse(e.id,t.id,"1975-05-12");const r=this.familyService.addMember({firstName:"Rajesh",lastName:"Sharma",name:"Rajesh Sharma",gender:"male",relationship:"Father",age:46,birthDate:"1978-08-20",birthPlace:"Delhi, India",gotra:"Bharadwaj",profession:"Software Engineer",education:"B.Tech IIT Delhi",isAlive:!0,parentIds:[e.id,t.id]}),i=this.familyService.addMember({firstName:"Priya",lastName:"Sharma",name:"Priya Sharma",gender:"female",relationship:"Mother",age:44,birthDate:"1980-02-14",birthPlace:"Mumbai, Maharashtra",profession:"Doctor",education:"MBBS",isAlive:!0});this.familyService.addSpouse(r.id,i.id,"2005-12-10"),this.familyService.addMember({firstName:"Arjun",lastName:"Sharma",name:"Arjun Sharma",gender:"male",relationship:"Son",age:16,birthDate:"2008-06-15",birthPlace:"Bangalore, Karnataka",gotra:"Bharadwaj",profession:"Student",education:"10th Grade",isAlive:!0,parentIds:[r.id,i.id]})}bindEvents(){var r,i,s,o,c,l,u;const e=document.getElementById("addMemberBtn");console.log("FamilyTreeApp.bindEvents() - addMemberBtn:",e),e?(console.log("✓ Add Member button found, binding click event"),e.addEventListener("click",()=>{console.log("🔵 Add Member button clicked - opening modal"),this.memberModal?this.memberModal.open():console.error("❌ memberModal is not initialized")})):console.error("❌ addMemberBtn not found in DOM");const t=document.getElementById("searchInput");t&&t.addEventListener("input",S0(d=>{this.handleSearch(d.target.value)},300)),(r=document.getElementById("viewMode"))==null||r.addEventListener("change",d=>{this.currentView=d.target.value,this.render()}),(i=document.getElementById("generationFilter"))==null||i.addEventListener("change",d=>{const p=d.target.value==="all"?null:parseInt(d.target.value);this.filterByGeneration(p)}),(s=document.getElementById("zoomInBtn"))==null||s.addEventListener("click",()=>{const d=(this.treeRenderer.currentScale||1)*1.2;this.treeRenderer.setZoom(Math.min(d,4))}),(o=document.getElementById("zoomOutBtn"))==null||o.addEventListener("click",()=>{const d=(this.treeRenderer.currentScale||1)/1.2;this.treeRenderer.setZoom(Math.max(d,.1))}),(c=document.getElementById("resetZoomBtn"))==null||c.addEventListener("click",()=>{this.treeRenderer.resetZoom()}),(l=document.getElementById("exportBtn"))==null||l.addEventListener("click",()=>{this.exportData()}),(u=document.getElementById("printBtn"))==null||u.addEventListener("click",()=>{window.print()}),window.addEventListener("familyDataChanged",()=>{this.render(),this.updateStatistics()}),window.addEventListener("addMemberWithRelation",d=>{const{relationship:p,gender:m,referenceMemberId:_}=d.detail;console.log("🔵 addMemberWithRelation event received:",p,m,_),this.treeRenderer&&this.treeRenderer.clearSuggestions(),this.memberModal&&this.memberModal.openWithRelationship(p,m,_)})}render(){const e=this.familyService.getAllMembers();switch(this.currentView){case"tree":this.treeRenderer.renderTree(e);break;case"timeline":this.treeRenderer.renderTimeline(e);break;case"grid":this.treeRenderer.renderGrid(e);break}}handleSearch(e){if(!e.trim()){this.render();return}const t=this.familyService.searchMembers(e);this.treeRenderer.highlightMembers(t.map(r=>r.id))}filterByGeneration(e){if(e===null){this.render();return}const t=this.familyService.getMembersByGeneration(e);this.treeRenderer.filterMembers(t.map(r=>r.id))}updateStatistics(){const e=this.familyService.getStatistics();document.getElementById("totalMembers").textContent=e.totalMembers,document.getElementById("totalGenerations").textContent=e.generations,document.getElementById("totalMales").textContent=e.males,document.getElementById("totalFemales").textContent=e.females,this.updateUpcomingEvents()}updateUpcomingEvents(){const e=document.getElementById("upcomingEvents"),t=this.familyService.getUpcomingBirthdays(5);if(t.length===0){e.innerHTML='<p class="no-events">No upcoming events</p>';return}e.innerHTML=t.map(r=>`
            <div class="event-item">
                <span class="event-icon">🎂</span>
                <div class="event-details">
                    <div class="event-name">${r.member.name}</div>
                    <div class="event-date">${r.date}</div>
                </div>
            </div>
        `).join("")}exportData(){const e=this.familyService.exportData(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=`family-tree-${Date.now()}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}}const C0=()=>{};var Ih={};/**
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
 */const qf=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},P0=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},zf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,l=i+2<n.length,u=l?n[i+2]:0,d=s>>2,p=(s&3)<<4|c>>4;let m=(c&15)<<2|u>>6,_=u&63;l||(_=64,o||(m=64)),r.push(t[d],t[p],t[m],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(qf(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):P0(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const u=i<n.length?t[n.charAt(i)]:64;++i;const p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||u==null||p==null)throw new k0;const m=s<<2|c>>4;if(r.push(m),u!==64){const _=c<<4&240|u>>2;if(r.push(_),p!==64){const A=u<<6&192|p;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class k0 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const x0=function(n){const e=qf(n);return zf.encodeByteArray(e,!0)},no=function(n){return x0(n).replace(/\./g,"")},Hf=function(n){try{return zf.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function D0(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const N0=()=>D0().__FIREBASE_DEFAULTS__,M0=()=>{if(typeof process>"u"||typeof Ih>"u")return;const n=Ih.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},V0=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Hf(n[1]);return e&&JSON.parse(e)},So=()=>{try{return C0()||N0()||M0()||V0()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},jf=n=>{var e,t;return(t=(e=So())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Gf=n=>{const e=jf(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Wf=()=>{var n;return(n=So())==null?void 0:n.config},Kf=n=>{var e;return(e=So())==null?void 0:e[`_${n}`]};/**
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
 */class O0{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Cn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function zc(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Yf(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[no(JSON.stringify(t)),no(JSON.stringify(o)),""].join(".")}const wi={};function L0(){const n={prod:[],emulator:[]};for(const e of Object.keys(wi))wi[e]?n.emulator.push(e):n.prod.push(e);return n}function U0(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let bh=!1;function Hc(n,e){if(typeof window>"u"||typeof document>"u"||!Cn(window.location.host)||wi[n]===e||wi[n]||bh)return;wi[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=L0().prod.length>0;function o(){const m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function l(m,_){m.setAttribute("width","24"),m.setAttribute("id",_),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function u(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{bh=!0,o()},m}function d(m,_){m.setAttribute("id",_),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){const m=U0(r),_=t("text"),A=document.getElementById(_)||document.createElement("span"),k=t("learnmore"),x=document.getElementById(k)||document.createElement("a"),C=t("preprendIcon"),M=document.getElementById(C)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const F=m.element;c(F),d(x,k);const $=u();l(M,C),F.append(M,A,x,$),document.body.appendChild(F)}s?(A.innerText="Preview backend disconnected.",M.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(M.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,A.innerText="Preview backend running in this workspace."),A.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
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
 */function Ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function F0(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ge())}function B0(){var e;const n=(e=So())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function $0(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function q0(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function z0(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function H0(){const n=Ge();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function j0(){return!B0()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function G0(){try{return typeof indexedDB=="object"}catch{return!1}}function W0(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const K0="FirebaseError";class Ot extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=K0,Object.setPrototypeOf(this,Ot.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yi.prototype.create)}}class Yi{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Y0(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Ot(i,c,r)}}function Y0(n,e){return n.replace(Q0,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const Q0=/\{\$([^}]+)}/g;function X0(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Qn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Ah(s)&&Ah(o)){if(!Qn(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Ah(n){return n!==null&&typeof n=="object"}/**
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
 */function Qi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function J0(n,e){const t=new Z0(n,e);return t.subscribe.bind(t)}class Z0{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");eE(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ba),i.error===void 0&&(i.error=ba),i.complete===void 0&&(i.complete=ba);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function eE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ba(){}/**
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
 */function ye(n){return n&&n._delegate?n._delegate:n}class Tn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Un="[DEFAULT]";/**
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
 */class tE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new O0;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(rE(e))try{this.getOrInitializeService({instanceIdentifier:Un})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Un){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Un){return this.instances.has(e)}getOptions(e=Un){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:nE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Un){return this.component?this.component.multipleInstances?e:Un:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function nE(n){return n===Un?void 0:n}function rE(n){return n.instantiationMode==="EAGER"}/**
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
 */class iE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new tE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var re;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(re||(re={}));const sE={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},oE=re.INFO,aE={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},cE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=aE[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class jc{constructor(e){this.name=e,this._logLevel=oE,this._logHandler=cE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?sE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}const lE=(n,e)=>e.some(t=>n instanceof t);let Sh,Rh;function uE(){return Sh||(Sh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hE(){return Rh||(Rh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Qf=new WeakMap,Xa=new WeakMap,Xf=new WeakMap,Aa=new WeakMap,Gc=new WeakMap;function dE(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(_n(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Qf.set(t,n)}).catch(()=>{}),Gc.set(e,n),e}function fE(n){if(Xa.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Xa.set(n,e)}let Ja={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Xa.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Xf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return _n(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function mE(n){Ja=n(Ja)}function pE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Sa(this),e,...t);return Xf.set(r,e.sort?e.sort():[e]),_n(r)}:hE().includes(n)?function(...e){return n.apply(Sa(this),e),_n(Qf.get(this))}:function(...e){return _n(n.apply(Sa(this),e))}}function gE(n){return typeof n=="function"?pE(n):(n instanceof IDBTransaction&&fE(n),lE(n,uE())?new Proxy(n,Ja):n)}function _n(n){if(n instanceof IDBRequest)return dE(n);if(Aa.has(n))return Aa.get(n);const e=gE(n);return e!==n&&(Aa.set(n,e),Gc.set(e,n)),e}const Sa=n=>Gc.get(n);function _E(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=_n(o);return r&&o.addEventListener("upgradeneeded",l=>{r(_n(o.result),l.oldVersion,l.newVersion,_n(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const yE=["get","getKey","getAll","getAllKeys","count"],vE=["put","add","delete","clear"],Ra=new Map;function Ch(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ra.get(e))return Ra.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=vE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||yE.includes(t)))return;const s=async function(o,...c){const l=this.transaction(o,i?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(c.shift())),(await Promise.all([u[t](...c),i&&l.done]))[0]};return Ra.set(e,s),s}mE(n=>({...n,get:(e,t,r)=>Ch(e,t)||n.get(e,t,r),has:(e,t)=>!!Ch(e,t)||n.has(e,t)}));/**
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
 */class wE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(TE(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function TE(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Za="@firebase/app",Ph="0.14.7";/**
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
 */const Xt=new jc("@firebase/app"),EE="@firebase/app-compat",IE="@firebase/analytics-compat",bE="@firebase/analytics",AE="@firebase/app-check-compat",SE="@firebase/app-check",RE="@firebase/auth",CE="@firebase/auth-compat",PE="@firebase/database",kE="@firebase/data-connect",xE="@firebase/database-compat",DE="@firebase/functions",NE="@firebase/functions-compat",ME="@firebase/installations",VE="@firebase/installations-compat",OE="@firebase/messaging",LE="@firebase/messaging-compat",UE="@firebase/performance",FE="@firebase/performance-compat",BE="@firebase/remote-config",$E="@firebase/remote-config-compat",qE="@firebase/storage",zE="@firebase/storage-compat",HE="@firebase/firestore",jE="@firebase/ai",GE="@firebase/firestore-compat",WE="firebase",KE="12.8.0";/**
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
 */const ec="[DEFAULT]",YE={[Za]:"fire-core",[EE]:"fire-core-compat",[bE]:"fire-analytics",[IE]:"fire-analytics-compat",[SE]:"fire-app-check",[AE]:"fire-app-check-compat",[RE]:"fire-auth",[CE]:"fire-auth-compat",[PE]:"fire-rtdb",[kE]:"fire-data-connect",[xE]:"fire-rtdb-compat",[DE]:"fire-fn",[NE]:"fire-fn-compat",[ME]:"fire-iid",[VE]:"fire-iid-compat",[OE]:"fire-fcm",[LE]:"fire-fcm-compat",[UE]:"fire-perf",[FE]:"fire-perf-compat",[BE]:"fire-rc",[$E]:"fire-rc-compat",[qE]:"fire-gcs",[zE]:"fire-gcs-compat",[HE]:"fire-fst",[GE]:"fire-fst-compat",[jE]:"fire-vertex","fire-js":"fire-js",[WE]:"fire-js-all"};/**
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
 */const ro=new Map,QE=new Map,tc=new Map;function kh(n,e){try{n.container.addComponent(e)}catch(t){Xt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Xn(n){const e=n.name;if(tc.has(e))return Xt.debug(`There were multiple attempts to register component ${e}.`),!1;tc.set(e,n);for(const t of ro.values())kh(t,n);for(const t of QE.values())kh(t,n);return!0}function Ro(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ct(n){return n==null?!1:n.settings!==void 0}/**
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
 */const XE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},yn=new Yi("app","Firebase",XE);/**
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
 */class JE{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw yn.create("app-deleted",{appName:this._name})}}/**
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
 */const ir=KE;function Jf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:ec,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw yn.create("bad-app-name",{appName:String(i)});if(t||(t=Wf()),!t)throw yn.create("no-options");const s=ro.get(i);if(s){if(Qn(t,s.options)&&Qn(r,s.config))return s;throw yn.create("duplicate-app",{appName:i})}const o=new iE(i);for(const l of tc.values())o.addComponent(l);const c=new JE(t,r,o);return ro.set(i,c),c}function Wc(n=ec){const e=ro.get(n);if(!e&&n===ec&&Wf())return Jf();if(!e)throw yn.create("no-app",{appName:n});return e}function Ct(n,e,t){let r=YE[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xt.warn(o.join(" "));return}Xn(new Tn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const ZE="firebase-heartbeat-database",eI=1,xi="firebase-heartbeat-store";let Ca=null;function Zf(){return Ca||(Ca=_E(ZE,eI,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xi)}catch(t){console.warn(t)}}}}).catch(n=>{throw yn.create("idb-open",{originalErrorMessage:n.message})})),Ca}async function tI(n){try{const t=(await Zf()).transaction(xi),r=await t.objectStore(xi).get(em(n));return await t.done,r}catch(e){if(e instanceof Ot)Xt.warn(e.message);else{const t=yn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Xt.warn(t.message)}}}async function xh(n,e){try{const r=(await Zf()).transaction(xi,"readwrite");await r.objectStore(xi).put(e,em(n)),await r.done}catch(t){if(t instanceof Ot)Xt.warn(t.message);else{const r=yn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Xt.warn(r.message)}}}function em(n){return`${n.name}!${n.options.appId}`}/**
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
 */const nI=1024,rI=30;class iI{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new oI(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Dh();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>rI){const o=aI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Xt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Dh(),{heartbeatsToSend:r,unsentEntries:i}=sI(this._heartbeatsCache.heartbeats),s=no(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Xt.warn(t),""}}}function Dh(){return new Date().toISOString().substring(0,10)}function sI(n,e=nI){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Nh(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Nh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class oI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return G0()?W0().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await tI(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return xh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return xh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Nh(n){return no(JSON.stringify({version:2,heartbeats:n})).length}function aI(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function cI(n){Xn(new Tn("platform-logger",e=>new wE(e),"PRIVATE")),Xn(new Tn("heartbeat",e=>new iI(e),"PRIVATE")),Ct(Za,Ph,n),Ct(Za,Ph,"esm2020"),Ct("fire-js","")}cI("");function tm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const lI=tm,nm=new Yi("auth","Firebase",tm());/**
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
 */const io=new jc("@firebase/auth");function uI(n,...e){io.logLevel<=re.WARN&&io.warn(`Auth (${ir}): ${n}`,...e)}function Vs(n,...e){io.logLevel<=re.ERROR&&io.error(`Auth (${ir}): ${n}`,...e)}/**
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
 */function Nt(n,...e){throw Yc(n,...e)}function yt(n,...e){return Yc(n,...e)}function Kc(n,e,t){const r={...lI(),[e]:t};return new Yi("auth","Firebase",r).create(e,{appName:n.name})}function zn(n){return Kc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hI(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Nt(n,"argument-error"),Kc(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Yc(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return nm.create(n,...e)}function Q(n,e,...t){if(!n)throw Yc(e,...t)}function Ht(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Vs(e),new Error(e)}function Jt(n,e){n||Ht(e)}/**
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
 */function nc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function dI(){return Mh()==="http:"||Mh()==="https:"}function Mh(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function fI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(dI()||q0()||"connection"in navigator)?navigator.onLine:!0}function mI(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Xi{constructor(e,t){this.shortDelay=e,this.longDelay=t,Jt(t>e,"Short delay should be less than long delay!"),this.isMobile=F0()||z0()}get(){return fI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Qc(n,e){Jt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class rm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const pI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const gI=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],_I=new Xi(3e4,6e4);function Xc(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Ur(n,e,t,r,i={}){return im(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=Qi({key:n.config.apiKey,...o}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:l,...s};return $0()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&Cn(n.emulatorConfig.host)&&(u.credentials="include"),rm.fetch()(await sm(n,n.config.apiHost,t,c),u)})}async function im(n,e,t){n._canInitEmulator=!1;const r={...pI,...e};try{const i=new vI(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Es(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Es(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Es(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Es(n,"user-disabled",o);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw Kc(n,d,u);Nt(n,d)}}catch(i){if(i instanceof Ot)throw i;Nt(n,"network-request-failed",{message:String(i)})}}async function yI(n,e,t,r,i={}){const s=await Ur(n,e,t,r,i);return"mfaPendingCredential"in s&&Nt(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function sm(n,e,t,r){const i=`${e}${t}?${r}`,s=n,o=s.config.emulator?Qc(n.config,i):`${n.config.apiScheme}://${i}`;return gI.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class vI{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(yt(this.auth,"network-request-failed")),_I.get())})}}function Es(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=yt(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */async function wI(n,e){return Ur(n,"POST","/v1/accounts:delete",e)}async function so(n,e){return Ur(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ti(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function TI(n,e=!1){const t=ye(n),r=await t.getIdToken(e),i=Jc(r);Q(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ti(Pa(i.auth_time)),issuedAtTime:Ti(Pa(i.iat)),expirationTime:Ti(Pa(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Pa(n){return Number(n)*1e3}function Jc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Vs("JWT malformed, contained fewer than 3 sections"),null;try{const i=Hf(t);return i?JSON.parse(i):(Vs("Failed to decode base64 JWT payload"),null)}catch(i){return Vs("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Vh(n){const e=Jc(n);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Di(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ot&&EI(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function EI({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class II{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class rc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ti(this.lastLoginAt),this.creationTime=Ti(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function oo(n){var p;const e=n.auth,t=await n.getIdToken(),r=await Di(n,so(e,{idToken:t}));Q(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(p=i.providerUserInfo)!=null&&p.length?om(i.providerUserInfo):[],o=AI(n.providerData,s),c=n.isAnonymous,l=!(n.email&&i.passwordHash)&&!(o!=null&&o.length),u=c?l:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new rc(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(n,d)}async function bI(n){const e=ye(n);await oo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function AI(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function om(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function SI(n,e){const t=await im(n,{},async()=>{const r=Qi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await sm(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&Cn(n.emulatorConfig.host)&&(l.credentials="include"),rm.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function RI(n,e){return Ur(n,"POST","/v2/accounts:revokeToken",Xc(n,e))}/**
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
 */class wr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const t=Vh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await SI(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new wr;return r&&(Q(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Q(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Q(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new wr,this.toJSON())}_performRefresh(){return Ht("not implemented")}}/**
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
 */function un(n,e){Q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class pt{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new II(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new rc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Di(this,this.stsTokenManager.getToken(this.auth,e));return Q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return TI(this,e)}reload(){return bI(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new pt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await oo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ct(this.auth.app))return Promise.reject(zn(this.auth));const e=await this.getIdToken();return await Di(this,wI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,u=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:_,providerData:A,stsTokenManager:k}=t;Q(p&&k,e,"internal-error");const x=wr.fromJSON(this.name,k);Q(typeof p=="string",e,"internal-error"),un(r,e.name),un(i,e.name),Q(typeof m=="boolean",e,"internal-error"),Q(typeof _=="boolean",e,"internal-error"),un(s,e.name),un(o,e.name),un(c,e.name),un(l,e.name),un(u,e.name),un(d,e.name);const C=new pt({uid:p,auth:e,email:i,emailVerified:m,displayName:r,isAnonymous:_,photoURL:o,phoneNumber:s,tenantId:c,stsTokenManager:x,createdAt:u,lastLoginAt:d});return A&&Array.isArray(A)&&(C.providerData=A.map(M=>({...M}))),l&&(C._redirectEventId=l),C}static async _fromIdTokenResponse(e,t,r=!1){const i=new wr;i.updateFromServerResponse(t);const s=new pt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await oo(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];Q(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?om(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new wr;c.updateFromIdToken(r);const l=new pt({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new rc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,u),l}}/**
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
 */const Oh=new Map;function jt(n){Jt(n instanceof Function,"Expected a class definition");let e=Oh.get(n);return e?(Jt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Oh.set(n,e),e)}/**
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
 */class am{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}am.type="NONE";const Lh=am;/**
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
 */function Os(n,e,t){return`firebase:${n}:${e}:${t}`}class Tr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Os(this.userKey,i.apiKey,s),this.fullPersistenceKey=Os("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await so(this.auth,{idToken:e}).catch(()=>{});return t?pt._fromGetAccountInfoResponse(this.auth,t,e):null}return pt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Tr(jt(Lh),e,r);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||jt(Lh);const o=Os(r,e.config.apiKey,e.name);let c=null;for(const u of t)try{const d=await u._get(o);if(d){let p;if(typeof d=="string"){const m=await so(e,{idToken:d}).catch(()=>{});if(!m)break;p=await pt._fromGetAccountInfoResponse(e,m,d)}else p=pt._fromJSON(e,d);u!==s&&(c=p),s=u;break}}catch{}const l=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Tr(s,e,r):(s=l[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Tr(s,e,r))}}/**
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
 */function Uh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(hm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(cm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(fm(e))return"Blackberry";if(mm(e))return"Webos";if(lm(e))return"Safari";if((e.includes("chrome/")||um(e))&&!e.includes("edge/"))return"Chrome";if(dm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function cm(n=Ge()){return/firefox\//i.test(n)}function lm(n=Ge()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function um(n=Ge()){return/crios\//i.test(n)}function hm(n=Ge()){return/iemobile/i.test(n)}function dm(n=Ge()){return/android/i.test(n)}function fm(n=Ge()){return/blackberry/i.test(n)}function mm(n=Ge()){return/webos/i.test(n)}function Zc(n=Ge()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function CI(n=Ge()){var e;return Zc(n)&&!!((e=window.navigator)!=null&&e.standalone)}function PI(){return H0()&&document.documentMode===10}function pm(n=Ge()){return Zc(n)||dm(n)||mm(n)||fm(n)||/windows phone/i.test(n)||hm(n)}/**
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
 */function gm(n,e=[]){let t;switch(n){case"Browser":t=Uh(Ge());break;case"Worker":t=`${Uh(Ge())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ir}/${r}`}/**
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
 */class kI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const l=e(s);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function xI(n,e={}){return Ur(n,"GET","/v2/passwordPolicy",Xc(n,e))}/**
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
 */const DI=6;class NI{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??DI,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class MI{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fh(this),this.idTokenSubscription=new Fh(this),this.beforeStateQueue=new kI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=nm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=jt(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Tr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await so(this,{idToken:e}),r=await pt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(ct(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,c=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(r=l.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await oo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=mI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ct(this.app))return Promise.reject(zn(this));const t=e?ye(e):null;return t&&Q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ct(this.app)?Promise.reject(zn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ct(this.app)?Promise.reject(zn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(jt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await xI(this),t=new NI(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Yi("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await RI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&jt(e)||this._popupRedirectResolver;Q(t,this,"argument-error"),this.redirectPersistenceManager=await Tr.create(this,[jt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=gm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(ct(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&uI(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Co(n){return ye(n)}class Fh{constructor(e){this.auth=e,this.observer=null,this.addObserver=J0(t=>this.observer=t)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let el={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function VI(n){el=n}function OI(n){return el.loadJS(n)}function LI(){return el.gapiScript}function UI(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function FI(n,e){const t=Ro(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Qn(s,e??{}))return i;Nt(i,"already-initialized")}return t.initialize({options:e})}function BI(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(jt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function $I(n,e,t){const r=Co(n);Q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=_m(e),{host:o,port:c}=qI(e),l=c===null?"":`:${c}`,u={url:`${s}//${o}${l}/`},d=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){Q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Q(Qn(u,r.config.emulator)&&Qn(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Cn(o)?(zc(`${s}//${o}${l}`),Hc("Auth",!0)):zI()}function _m(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function qI(n){const e=_m(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Bh(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Bh(o)}}}function Bh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function zI(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class ym{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ht("not implemented")}_getIdTokenResponse(e){return Ht("not implemented")}_linkToIdToken(e,t){return Ht("not implemented")}_getReauthenticationResolver(e){return Ht("not implemented")}}/**
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
 */async function Er(n,e){return yI(n,"POST","/v1/accounts:signInWithIdp",Xc(n,e))}/**
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
 */const HI="http://localhost";class Jn extends ym{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Jn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Nt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const o=new Jn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Er(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Er(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Er(e,t)}buildRequest(){const e={requestUri:HI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Qi(t)}return e}}/**
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
 */class tl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ji extends tl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class hn extends Ji{constructor(){super("facebook.com")}static credential(e){return Jn._fromParams({providerId:hn.PROVIDER_ID,signInMethod:hn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return hn.credentialFromTaggedObject(e)}static credentialFromError(e){return hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return hn.credential(e.oauthAccessToken)}catch{return null}}}hn.FACEBOOK_SIGN_IN_METHOD="facebook.com";hn.PROVIDER_ID="facebook.com";/**
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
 */class Bt extends Ji{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Jn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Bt.credential(t,r)}catch{return null}}}Bt.GOOGLE_SIGN_IN_METHOD="google.com";Bt.PROVIDER_ID="google.com";/**
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
 */class dn extends Ji{constructor(){super("github.com")}static credential(e){return Jn._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return dn.credentialFromTaggedObject(e)}static credentialFromError(e){return dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return dn.credential(e.oauthAccessToken)}catch{return null}}}dn.GITHUB_SIGN_IN_METHOD="github.com";dn.PROVIDER_ID="github.com";/**
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
 */class fn extends Ji{constructor(){super("twitter.com")}static credential(e,t){return Jn._fromParams({providerId:fn.PROVIDER_ID,signInMethod:fn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return fn.credentialFromTaggedObject(e)}static credentialFromError(e){return fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return fn.credential(t,r)}catch{return null}}}fn.TWITTER_SIGN_IN_METHOD="twitter.com";fn.PROVIDER_ID="twitter.com";/**
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
 */class kr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await pt._fromIdTokenResponse(e,r,i),o=$h(r);return new kr({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=$h(r);return new kr({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function $h(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ao extends Ot{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ao.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new ao(e,t,r,i)}}function vm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ao._fromErrorAndOperation(n,s,e,r):s})}async function jI(n,e,t=!1){const r=await Di(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return kr._forOperation(n,"link",r)}/**
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
 */async function GI(n,e,t=!1){const{auth:r}=n;if(ct(r.app))return Promise.reject(zn(r));const i="reauthenticate";try{const s=await Di(n,vm(r,i,e,n),t);Q(s.idToken,r,"internal-error");const o=Jc(s.idToken);Q(o,r,"internal-error");const{sub:c}=o;return Q(n.uid===c,r,"user-mismatch"),kr._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Nt(r,"user-mismatch"),s}}/**
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
 */async function WI(n,e,t=!1){if(ct(n.app))return Promise.reject(zn(n));const r="signIn",i=await vm(n,r,e),s=await kr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function KI(n,e,t,r){return ye(n).onIdTokenChanged(e,t,r)}function YI(n,e,t){return ye(n).beforeAuthStateChanged(e,t)}function QI(n,e,t,r){return ye(n).onAuthStateChanged(e,t,r)}function XI(n){return ye(n).signOut()}const co="__sak";/**
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
 */class wm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(co,"1"),this.storage.removeItem(co),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const JI=1e3,ZI=10;class Tm extends wm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=pm(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);PI()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,ZI):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},JI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Tm.type="LOCAL";const eb=Tm;/**
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
 */class Em extends wm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Em.type="SESSION";const Im=Em;/**
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
 */function tb(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Po{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Po(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async u=>u(t.origin,s)),l=await tb(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Po.receivers=[];/**
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
 */function nl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class nb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,l)=>{const u=nl("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const m=p;if(m.data.eventId===u)switch(m.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(m.data.response);break;default:clearTimeout(d),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Pt(){return window}function rb(n){Pt().location.href=n}/**
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
 */function bm(){return typeof Pt().WorkerGlobalScope<"u"&&typeof Pt().importScripts=="function"}async function ib(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sb(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function ob(){return bm()?self:null}/**
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
 */const Am="firebaseLocalStorageDb",ab=1,lo="firebaseLocalStorage",Sm="fbase_key";class Zi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ko(n,e){return n.transaction([lo],e?"readwrite":"readonly").objectStore(lo)}function cb(){const n=indexedDB.deleteDatabase(Am);return new Zi(n).toPromise()}function ic(){const n=indexedDB.open(Am,ab);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(lo,{keyPath:Sm})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(lo)?e(r):(r.close(),await cb(),e(await ic()))})})}async function qh(n,e,t){const r=ko(n,!0).put({[Sm]:e,value:t});return new Zi(r).toPromise()}async function lb(n,e){const t=ko(n,!1).get(e),r=await new Zi(t).toPromise();return r===void 0?null:r.value}function zh(n,e){const t=ko(n,!0).delete(e);return new Zi(t).toPromise()}const ub=800,hb=3;class Rm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ic(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>hb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return bm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Po._getInstance(ob()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await ib(),!this.activeServiceWorker)return;this.sender=new nb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ic();return await qh(e,co,"1"),await zh(e,co),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>qh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>lb(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=ko(i,!1).getAll();return new Zi(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ub)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Rm.type="LOCAL";const db=Rm;new Xi(3e4,6e4);/**
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
 */function Cm(n,e){return e?jt(e):(Q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class rl extends ym{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Er(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Er(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Er(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function fb(n){return WI(n.auth,new rl(n),n.bypassAuthState)}function mb(n){const{auth:e,user:t}=n;return Q(t,e,"internal-error"),GI(t,new rl(n),n.bypassAuthState)}async function pb(n){const{auth:e,user:t}=n;return Q(t,e,"internal-error"),jI(t,new rl(n),n.bypassAuthState)}/**
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
 */class Pm{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fb;case"linkViaPopup":case"linkViaRedirect":return pb;case"reauthViaPopup":case"reauthViaRedirect":return mb;default:Nt(this.auth,"internal-error")}}resolve(e){Jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const gb=new Xi(2e3,1e4);async function _b(n,e,t){if(ct(n.app))return Promise.reject(yt(n,"operation-not-supported-in-this-environment"));const r=Co(n);hI(n,e,tl);const i=Cm(r,t);return new Bn(r,"signInViaPopup",e,i).executeNotNull()}class Bn extends Pm{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Bn.currentPopupAction&&Bn.currentPopupAction.cancel(),Bn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){Jt(this.filter.length===1,"Popup operations only handle one event");const e=nl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Bn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gb.get())};e()}}Bn.currentPopupAction=null;/**
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
 */const yb="pendingRedirect",Ls=new Map;class vb extends Pm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ls.get(this.auth._key());if(!e){try{const r=await wb(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ls.set(this.auth._key(),e)}return this.bypassAuthState||Ls.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function wb(n,e){const t=Ib(e),r=Eb(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function Tb(n,e){Ls.set(n._key(),e)}function Eb(n){return jt(n._redirectPersistence)}function Ib(n){return Os(yb,n.config.apiKey,n.name)}async function bb(n,e,t=!1){if(ct(n.app))return Promise.reject(zn(n));const r=Co(n),i=Cm(r,e),o=await new vb(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const Ab=10*60*1e3;class Sb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Rb(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!km(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(yt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ab&&this.cachedEventUids.clear(),this.cachedEventUids.has(Hh(e))}saveEventToCache(e){this.cachedEventUids.add(Hh(e)),this.lastProcessedEventTime=Date.now()}}function Hh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function km({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Rb(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return km(n);default:return!1}}/**
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
 */async function Cb(n,e={}){return Ur(n,"GET","/v1/projects",e)}/**
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
 */const Pb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kb=/^https?/;async function xb(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Cb(n);for(const t of e)try{if(Db(t))return}catch{}Nt(n,"unauthorized-domain")}function Db(n){const e=nc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!kb.test(t))return!1;if(Pb.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const Nb=new Xi(3e4,6e4);function jh(){const n=Pt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Mb(n){return new Promise((e,t)=>{var i,s,o;function r(){jh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{jh(),t(yt(n,"network-request-failed"))},timeout:Nb.get()})}if((s=(i=Pt().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=Pt().gapi)!=null&&o.load)r();else{const c=UI("iframefcb");return Pt()[c]=()=>{gapi.load?r():t(yt(n,"network-request-failed"))},OI(`${LI()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw Us=null,e})}let Us=null;function Vb(n){return Us=Us||Mb(n),Us}/**
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
 */const Ob=new Xi(5e3,15e3),Lb="__/auth/iframe",Ub="emulator/auth/iframe",Fb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Bb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function $b(n){const e=n.config;Q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Qc(e,Ub):`https://${n.config.authDomain}/${Lb}`,r={apiKey:e.apiKey,appName:n.name,v:ir},i=Bb.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Qi(r).slice(1)}`}async function qb(n){const e=await Vb(n),t=Pt().gapi;return Q(t,n,"internal-error"),e.open({where:document.body,url:$b(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fb,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=yt(n,"network-request-failed"),c=Pt().setTimeout(()=>{s(o)},Ob.get());function l(){Pt().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
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
 */const zb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hb=500,jb=600,Gb="_blank",Wb="http://localhost";class Gh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Kb(n,e,t,r=Hb,i=jb){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...zb,width:r.toString(),height:i.toString(),top:s,left:o},u=Ge().toLowerCase();t&&(c=um(u)?Gb:t),cm(u)&&(e=e||Wb,l.scrollbars="yes");const d=Object.entries(l).reduce((m,[_,A])=>`${m}${_}=${A},`,"");if(CI(u)&&c!=="_self")return Yb(e||"",c),new Gh(null);const p=window.open(e||"",c,d);Q(p,n,"popup-blocked");try{p.focus()}catch{}return new Gh(p)}function Yb(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Qb="__/auth/handler",Xb="emulator/auth/handler",Jb=encodeURIComponent("fac");async function Wh(n,e,t,r,i,s){Q(n.config.authDomain,n,"auth-domain-config-required"),Q(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ir,eventId:i};if(e instanceof tl){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",X0(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries({}))o[d]=p}if(e instanceof Ji){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const l=await n._getAppCheckToken(),u=l?`#${Jb}=${encodeURIComponent(l)}`:"";return`${Zb(n)}?${Qi(c).slice(1)}${u}`}function Zb({config:n}){return n.emulator?Qc(n,Xb):`https://${n.authDomain}/${Qb}`}/**
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
 */const ka="webStorageSupport";class eA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Im,this._completeRedirectFn=bb,this._overrideRedirectResult=Tb}async _openPopup(e,t,r,i){var o;Jt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await Wh(e,t,r,nc(),i);return Kb(e,s,nl())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Wh(e,t,r,nc(),i);return rb(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Jt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await qb(e),r=new Sb(e);return t.register("authEvent",i=>(Q(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ka,{type:ka},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[ka];s!==void 0&&t(!!s),Nt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=xb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return pm()||lm()||Zc()}}const tA=eA;var Kh="@firebase/auth",Yh="1.12.0";/**
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
 */class nA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function rA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function iA(n){Xn(new Tn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:gm(n)},u=new MI(r,i,s,l);return BI(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Xn(new Tn("auth-internal",e=>{const t=Co(e.getProvider("auth").getImmediate());return(r=>new nA(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ct(Kh,Yh,rA(n)),Ct(Kh,Yh,"esm2020")}/**
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
 */const sA=5*60,oA=Kf("authIdTokenMaxAge")||sA;let Qh=null;const aA=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>oA)return;const i=t==null?void 0:t.token;Qh!==i&&(Qh=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function cA(n=Wc()){const e=Ro(n,"auth");if(e.isInitialized())return e.getImmediate();const t=FI(n,{popupRedirectResolver:tA,persistence:[db,eb,Im]}),r=Kf("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=aA(s.toString());YI(t,o,()=>o(t.currentUser)),KI(t,c=>o(c))}}const i=jf("auth");return i&&$I(t,`http://${i}`),t}function lA(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}VI({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=yt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",lA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});iA("Browser");var Xh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vn,xm;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,y){function v(){}v.prototype=y.prototype,T.F=y.prototype,T.prototype=new v,T.prototype.constructor=T,T.D=function(I,E,b){for(var w=Array(arguments.length-2),R=2;R<arguments.length;R++)w[R-2]=arguments[R];return y.prototype[E].apply(I,w)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,y,v){v||(v=0);const I=Array(16);if(typeof y=="string")for(var E=0;E<16;++E)I[E]=y.charCodeAt(v++)|y.charCodeAt(v++)<<8|y.charCodeAt(v++)<<16|y.charCodeAt(v++)<<24;else for(E=0;E<16;++E)I[E]=y[v++]|y[v++]<<8|y[v++]<<16|y[v++]<<24;y=T.g[0],v=T.g[1],E=T.g[2];let b=T.g[3],w;w=y+(b^v&(E^b))+I[0]+3614090360&4294967295,y=v+(w<<7&4294967295|w>>>25),w=b+(E^y&(v^E))+I[1]+3905402710&4294967295,b=y+(w<<12&4294967295|w>>>20),w=E+(v^b&(y^v))+I[2]+606105819&4294967295,E=b+(w<<17&4294967295|w>>>15),w=v+(y^E&(b^y))+I[3]+3250441966&4294967295,v=E+(w<<22&4294967295|w>>>10),w=y+(b^v&(E^b))+I[4]+4118548399&4294967295,y=v+(w<<7&4294967295|w>>>25),w=b+(E^y&(v^E))+I[5]+1200080426&4294967295,b=y+(w<<12&4294967295|w>>>20),w=E+(v^b&(y^v))+I[6]+2821735955&4294967295,E=b+(w<<17&4294967295|w>>>15),w=v+(y^E&(b^y))+I[7]+4249261313&4294967295,v=E+(w<<22&4294967295|w>>>10),w=y+(b^v&(E^b))+I[8]+1770035416&4294967295,y=v+(w<<7&4294967295|w>>>25),w=b+(E^y&(v^E))+I[9]+2336552879&4294967295,b=y+(w<<12&4294967295|w>>>20),w=E+(v^b&(y^v))+I[10]+4294925233&4294967295,E=b+(w<<17&4294967295|w>>>15),w=v+(y^E&(b^y))+I[11]+2304563134&4294967295,v=E+(w<<22&4294967295|w>>>10),w=y+(b^v&(E^b))+I[12]+1804603682&4294967295,y=v+(w<<7&4294967295|w>>>25),w=b+(E^y&(v^E))+I[13]+4254626195&4294967295,b=y+(w<<12&4294967295|w>>>20),w=E+(v^b&(y^v))+I[14]+2792965006&4294967295,E=b+(w<<17&4294967295|w>>>15),w=v+(y^E&(b^y))+I[15]+1236535329&4294967295,v=E+(w<<22&4294967295|w>>>10),w=y+(E^b&(v^E))+I[1]+4129170786&4294967295,y=v+(w<<5&4294967295|w>>>27),w=b+(v^E&(y^v))+I[6]+3225465664&4294967295,b=y+(w<<9&4294967295|w>>>23),w=E+(y^v&(b^y))+I[11]+643717713&4294967295,E=b+(w<<14&4294967295|w>>>18),w=v+(b^y&(E^b))+I[0]+3921069994&4294967295,v=E+(w<<20&4294967295|w>>>12),w=y+(E^b&(v^E))+I[5]+3593408605&4294967295,y=v+(w<<5&4294967295|w>>>27),w=b+(v^E&(y^v))+I[10]+38016083&4294967295,b=y+(w<<9&4294967295|w>>>23),w=E+(y^v&(b^y))+I[15]+3634488961&4294967295,E=b+(w<<14&4294967295|w>>>18),w=v+(b^y&(E^b))+I[4]+3889429448&4294967295,v=E+(w<<20&4294967295|w>>>12),w=y+(E^b&(v^E))+I[9]+568446438&4294967295,y=v+(w<<5&4294967295|w>>>27),w=b+(v^E&(y^v))+I[14]+3275163606&4294967295,b=y+(w<<9&4294967295|w>>>23),w=E+(y^v&(b^y))+I[3]+4107603335&4294967295,E=b+(w<<14&4294967295|w>>>18),w=v+(b^y&(E^b))+I[8]+1163531501&4294967295,v=E+(w<<20&4294967295|w>>>12),w=y+(E^b&(v^E))+I[13]+2850285829&4294967295,y=v+(w<<5&4294967295|w>>>27),w=b+(v^E&(y^v))+I[2]+4243563512&4294967295,b=y+(w<<9&4294967295|w>>>23),w=E+(y^v&(b^y))+I[7]+1735328473&4294967295,E=b+(w<<14&4294967295|w>>>18),w=v+(b^y&(E^b))+I[12]+2368359562&4294967295,v=E+(w<<20&4294967295|w>>>12),w=y+(v^E^b)+I[5]+4294588738&4294967295,y=v+(w<<4&4294967295|w>>>28),w=b+(y^v^E)+I[8]+2272392833&4294967295,b=y+(w<<11&4294967295|w>>>21),w=E+(b^y^v)+I[11]+1839030562&4294967295,E=b+(w<<16&4294967295|w>>>16),w=v+(E^b^y)+I[14]+4259657740&4294967295,v=E+(w<<23&4294967295|w>>>9),w=y+(v^E^b)+I[1]+2763975236&4294967295,y=v+(w<<4&4294967295|w>>>28),w=b+(y^v^E)+I[4]+1272893353&4294967295,b=y+(w<<11&4294967295|w>>>21),w=E+(b^y^v)+I[7]+4139469664&4294967295,E=b+(w<<16&4294967295|w>>>16),w=v+(E^b^y)+I[10]+3200236656&4294967295,v=E+(w<<23&4294967295|w>>>9),w=y+(v^E^b)+I[13]+681279174&4294967295,y=v+(w<<4&4294967295|w>>>28),w=b+(y^v^E)+I[0]+3936430074&4294967295,b=y+(w<<11&4294967295|w>>>21),w=E+(b^y^v)+I[3]+3572445317&4294967295,E=b+(w<<16&4294967295|w>>>16),w=v+(E^b^y)+I[6]+76029189&4294967295,v=E+(w<<23&4294967295|w>>>9),w=y+(v^E^b)+I[9]+3654602809&4294967295,y=v+(w<<4&4294967295|w>>>28),w=b+(y^v^E)+I[12]+3873151461&4294967295,b=y+(w<<11&4294967295|w>>>21),w=E+(b^y^v)+I[15]+530742520&4294967295,E=b+(w<<16&4294967295|w>>>16),w=v+(E^b^y)+I[2]+3299628645&4294967295,v=E+(w<<23&4294967295|w>>>9),w=y+(E^(v|~b))+I[0]+4096336452&4294967295,y=v+(w<<6&4294967295|w>>>26),w=b+(v^(y|~E))+I[7]+1126891415&4294967295,b=y+(w<<10&4294967295|w>>>22),w=E+(y^(b|~v))+I[14]+2878612391&4294967295,E=b+(w<<15&4294967295|w>>>17),w=v+(b^(E|~y))+I[5]+4237533241&4294967295,v=E+(w<<21&4294967295|w>>>11),w=y+(E^(v|~b))+I[12]+1700485571&4294967295,y=v+(w<<6&4294967295|w>>>26),w=b+(v^(y|~E))+I[3]+2399980690&4294967295,b=y+(w<<10&4294967295|w>>>22),w=E+(y^(b|~v))+I[10]+4293915773&4294967295,E=b+(w<<15&4294967295|w>>>17),w=v+(b^(E|~y))+I[1]+2240044497&4294967295,v=E+(w<<21&4294967295|w>>>11),w=y+(E^(v|~b))+I[8]+1873313359&4294967295,y=v+(w<<6&4294967295|w>>>26),w=b+(v^(y|~E))+I[15]+4264355552&4294967295,b=y+(w<<10&4294967295|w>>>22),w=E+(y^(b|~v))+I[6]+2734768916&4294967295,E=b+(w<<15&4294967295|w>>>17),w=v+(b^(E|~y))+I[13]+1309151649&4294967295,v=E+(w<<21&4294967295|w>>>11),w=y+(E^(v|~b))+I[4]+4149444226&4294967295,y=v+(w<<6&4294967295|w>>>26),w=b+(v^(y|~E))+I[11]+3174756917&4294967295,b=y+(w<<10&4294967295|w>>>22),w=E+(y^(b|~v))+I[2]+718787259&4294967295,E=b+(w<<15&4294967295|w>>>17),w=v+(b^(E|~y))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+y&4294967295,T.g[1]=T.g[1]+(E+(w<<21&4294967295|w>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+b&4294967295}r.prototype.v=function(T,y){y===void 0&&(y=T.length);const v=y-this.blockSize,I=this.C;let E=this.h,b=0;for(;b<y;){if(E==0)for(;b<=v;)i(this,T,b),b+=this.blockSize;if(typeof T=="string"){for(;b<y;)if(I[E++]=T.charCodeAt(b++),E==this.blockSize){i(this,I),E=0;break}}else for(;b<y;)if(I[E++]=T[b++],E==this.blockSize){i(this,I),E=0;break}}this.h=E,this.o+=y},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var y=1;y<T.length-8;++y)T[y]=0;y=this.o*8;for(var v=T.length-8;v<T.length;++v)T[v]=y&255,y/=256;for(this.v(T),T=Array(16),y=0,v=0;v<4;++v)for(let I=0;I<32;I+=8)T[y++]=this.g[v]>>>I&255;return T};function s(T,y){var v=c;return Object.prototype.hasOwnProperty.call(v,T)?v[T]:v[T]=y(T)}function o(T,y){this.h=y;const v=[];let I=!0;for(let E=T.length-1;E>=0;E--){const b=T[E]|0;I&&b==y||(v[E]=b,I=!1)}this.g=v}var c={};function l(T){return-128<=T&&T<128?s(T,function(y){return new o([y|0],y<0?-1:0)}):new o([T|0],T<0?-1:0)}function u(T){if(isNaN(T)||!isFinite(T))return p;if(T<0)return x(u(-T));const y=[];let v=1;for(let I=0;T>=v;I++)y[I]=T/v|0,v*=4294967296;return new o(y,0)}function d(T,y){if(T.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(T.charAt(0)=="-")return x(d(T.substring(1),y));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const v=u(Math.pow(y,8));let I=p;for(let b=0;b<T.length;b+=8){var E=Math.min(8,T.length-b);const w=parseInt(T.substring(b,b+E),y);E<8?(E=u(Math.pow(y,E)),I=I.j(E).add(u(w))):(I=I.j(v),I=I.add(u(w)))}return I}var p=l(0),m=l(1),_=l(16777216);n=o.prototype,n.m=function(){if(k(this))return-x(this).m();let T=0,y=1;for(let v=0;v<this.g.length;v++){const I=this.i(v);T+=(I>=0?I:4294967296+I)*y,y*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(A(this))return"0";if(k(this))return"-"+x(this).toString(T);const y=u(Math.pow(T,6));var v=this;let I="";for(;;){const E=$(v,y).g;v=C(v,E.j(y));let b=((v.g.length>0?v.g[0]:v.h)>>>0).toString(T);if(v=E,A(v))return b+I;for(;b.length<6;)b="0"+b;I=b+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function A(T){if(T.h!=0)return!1;for(let y=0;y<T.g.length;y++)if(T.g[y]!=0)return!1;return!0}function k(T){return T.h==-1}n.l=function(T){return T=C(this,T),k(T)?-1:A(T)?0:1};function x(T){const y=T.g.length,v=[];for(let I=0;I<y;I++)v[I]=~T.g[I];return new o(v,~T.h).add(m)}n.abs=function(){return k(this)?x(this):this},n.add=function(T){const y=Math.max(this.g.length,T.g.length),v=[];let I=0;for(let E=0;E<=y;E++){let b=I+(this.i(E)&65535)+(T.i(E)&65535),w=(b>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=w>>>16,b&=65535,w&=65535,v[E]=w<<16|b}return new o(v,v[v.length-1]&-2147483648?-1:0)};function C(T,y){return T.add(x(y))}n.j=function(T){if(A(this)||A(T))return p;if(k(this))return k(T)?x(this).j(x(T)):x(x(this).j(T));if(k(T))return x(this.j(x(T)));if(this.l(_)<0&&T.l(_)<0)return u(this.m()*T.m());const y=this.g.length+T.g.length,v=[];for(var I=0;I<2*y;I++)v[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<T.g.length;E++){const b=this.i(I)>>>16,w=this.i(I)&65535,R=T.i(E)>>>16,H=T.i(E)&65535;v[2*I+2*E]+=w*H,M(v,2*I+2*E),v[2*I+2*E+1]+=b*H,M(v,2*I+2*E+1),v[2*I+2*E+1]+=w*R,M(v,2*I+2*E+1),v[2*I+2*E+2]+=b*R,M(v,2*I+2*E+2)}for(T=0;T<y;T++)v[T]=v[2*T+1]<<16|v[2*T];for(T=y;T<2*y;T++)v[T]=0;return new o(v,0)};function M(T,y){for(;(T[y]&65535)!=T[y];)T[y+1]+=T[y]>>>16,T[y]&=65535,y++}function F(T,y){this.g=T,this.h=y}function $(T,y){if(A(y))throw Error("division by zero");if(A(T))return new F(p,p);if(k(T))return y=$(x(T),y),new F(x(y.g),x(y.h));if(k(y))return y=$(T,x(y)),new F(x(y.g),y.h);if(T.g.length>30){if(k(T)||k(y))throw Error("slowDivide_ only works with positive integers.");for(var v=m,I=y;I.l(T)<=0;)v=K(v),I=K(I);var E=L(v,1),b=L(I,1);for(I=L(I,2),v=L(v,2);!A(I);){var w=b.add(I);w.l(T)<=0&&(E=E.add(v),b=w),I=L(I,1),v=L(v,1)}return y=C(T,E.j(y)),new F(E,y)}for(E=p;T.l(y)>=0;){for(v=Math.max(1,Math.floor(T.m()/y.m())),I=Math.ceil(Math.log(v)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),b=u(v),w=b.j(y);k(w)||w.l(T)>0;)v-=I,b=u(v),w=b.j(y);A(b)&&(b=m),E=E.add(b),T=C(T,w)}return new F(E,T)}n.B=function(T){return $(this,T).h},n.and=function(T){const y=Math.max(this.g.length,T.g.length),v=[];for(let I=0;I<y;I++)v[I]=this.i(I)&T.i(I);return new o(v,this.h&T.h)},n.or=function(T){const y=Math.max(this.g.length,T.g.length),v=[];for(let I=0;I<y;I++)v[I]=this.i(I)|T.i(I);return new o(v,this.h|T.h)},n.xor=function(T){const y=Math.max(this.g.length,T.g.length),v=[];for(let I=0;I<y;I++)v[I]=this.i(I)^T.i(I);return new o(v,this.h^T.h)};function K(T){const y=T.g.length+1,v=[];for(let I=0;I<y;I++)v[I]=T.i(I)<<1|T.i(I-1)>>>31;return new o(v,T.h)}function L(T,y){const v=y>>5;y%=32;const I=T.g.length-v,E=[];for(let b=0;b<I;b++)E[b]=y>0?T.i(b+v)>>>y|T.i(b+v+1)<<32-y:T.i(b+v);return new o(E,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,xm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=d,vn=o}).apply(typeof Xh<"u"?Xh:typeof self<"u"?self:typeof window<"u"?window:{});var Is=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dm,gi,Nm,Fs,sc,Mm,Vm,Om;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Is=="object"&&Is];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function i(a,h){if(h)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var S=a[g];if(!(S in f))break e;f=f[S]}a=a[a.length-1],g=f[a],h=h(g),h!=g&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}i("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(a){return a||function(h){var f=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&f.push([g,h[g]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function l(a,h,f){return a.call.apply(a.bind,arguments)}function u(a,h,f){return u=l,u.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function p(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(g,S,P){for(var U=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)U[ee-2]=arguments[ee];return h.prototype[S].apply(g,U)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function _(a){const h=a.length;if(h>0){const f=Array(h);for(let g=0;g<h;g++)f[g]=a[g];return f}return[]}function A(a,h){for(let g=1;g<arguments.length;g++){const S=arguments[g];var f=typeof S;if(f=f!="object"?f:S?Array.isArray(S)?"array":f:"null",f=="array"||f=="object"&&typeof S.length=="number"){f=a.length||0;const P=S.length||0;a.length=f+P;for(let U=0;U<P;U++)a[f+U]=S[U]}else a.push(S)}}class k{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function x(a){o.setTimeout(()=>{throw a},0)}function C(){var a=T;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class M{constructor(){this.h=this.g=null}add(h,f){const g=F.get();g.set(h,f),this.h?this.h.next=g:this.g=g,this.h=g}}var F=new k(()=>new $,a=>a.reset());class ${constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let K,L=!1,T=new M,y=()=>{const a=Promise.resolve(void 0);K=()=>{a.then(v)}};function v(){for(var a;a=C();){try{a.h.call(a.g)}catch(f){x(f)}var h=F;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}L=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var b=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a}();function w(a){return/^[\s\xa0]*$/.test(a)}function R(a,h){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(R,E),R.prototype.init=function(a,h){const f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&R.Z.h.call(this)},R.prototype.h=function(){R.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var H="closure_listenable_"+(Math.random()*1e6|0),O=0;function j(a,h,f,g,S){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!g,this.ha=S,this.key=++O,this.da=this.fa=!1}function Y(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Z(a,h,f){for(const g in a)h.call(f,a[g],g,a)}function te(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function le(a){const h={};for(const f in a)h[f]=a[f];return h}const fe="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function We(a,h){let f,g;for(let S=1;S<arguments.length;S++){g=arguments[S];for(f in g)a[f]=g[f];for(let P=0;P<fe.length;P++)f=fe[P],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function _e(a){this.src=a,this.g={},this.h=0}_e.prototype.add=function(a,h,f,g,S){const P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);const U=Ke(a,h,g,S);return U>-1?(h=a[U],f||(h.fa=!1)):(h=new j(h,this.src,P,!!g,S),h.fa=f,a.push(h)),h};function Ve(a,h){const f=h.type;if(f in a.g){var g=a.g[f],S=Array.prototype.indexOf.call(g,h,void 0),P;(P=S>=0)&&Array.prototype.splice.call(g,S,1),P&&(Y(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Ke(a,h,f,g){for(let S=0;S<a.length;++S){const P=a[S];if(!P.da&&P.listener==h&&P.capture==!!f&&P.ha==g)return S}return-1}var Oe="closure_lm_"+(Math.random()*1e6|0),Ye={};function q(a,h,f,g,S){if(Array.isArray(h)){for(let P=0;P<h.length;P++)q(a,h[P],f,g,S);return null}return f=Hr(f),a&&a[H]?a.J(h,f,c(g)?!!g.capture:!1,S):ne(a,h,f,!1,g,S)}function ne(a,h,f,g,S,P){if(!h)throw Error("Invalid event type");const U=c(S)?!!S.capture:!!S;let ee=Le(a);if(ee||(a[Oe]=ee=new _e(a)),f=ee.add(h,f,g,U,P),f.proxy)return f;if(g=oe(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)b||(S=U),S===void 0&&(S=!1),a.addEventListener(h.toString(),g,S);else if(a.attachEvent)a.attachEvent(he(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function oe(){function a(f){return h.call(a.src,a.listener,f)}const h=Qe;return a}function V(a,h,f,g,S){if(Array.isArray(h))for(var P=0;P<h.length;P++)V(a,h[P],f,g,S);else g=c(g)?!!g.capture:!!g,f=Hr(f),a&&a[H]?(a=a.i,P=String(h).toString(),P in a.g&&(h=a.g[P],f=Ke(h,f,g,S),f>-1&&(Y(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[P],a.h--)))):a&&(a=Le(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Ke(h,f,g,S)),(f=a>-1?h[a]:null)&&xe(f))}function xe(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[H])Ve(h.i,a);else{var f=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(f,g,a.capture):h.detachEvent?h.detachEvent(he(f),g):h.addListener&&h.removeListener&&h.removeListener(g),(f=Le(h))?(Ve(f,a),f.h==0&&(f.src=null,h[Oe]=null)):Y(a)}}}function he(a){return a in Ye?Ye[a]:Ye[a]="on"+a}function Qe(a,h){if(a.da)a=!0;else{h=new R(h,this);const f=a.listener,g=a.ha||a.src;a.fa&&xe(a),a=f.call(g,h)}return a}function Le(a){return a=a[Oe],a instanceof _e?a:null}var dt="__closure_events_fn_"+(Math.random()*1e9>>>0);function Hr(a){return typeof a=="function"?a:(a[dt]||(a[dt]=function(h){return a.handleEvent(h)}),a[dt])}function $e(){I.call(this),this.i=new _e(this),this.M=this,this.G=null}p($e,I),$e.prototype[H]=!0,$e.prototype.removeEventListener=function(a,h,f,g){V(this,a,h,f,g)};function Xe(a,h){var f,g=a.G;if(g)for(f=[];g;g=g.G)f.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new E(h,a);else if(h instanceof E)h.target=h.target||a;else{var S=h;h=new E(g,a),We(h,S)}S=!0;let P,U;if(f)for(U=f.length-1;U>=0;U--)P=h.g=f[U],S=os(P,g,!0,h)&&S;if(P=h.g=a,S=os(P,g,!0,h)&&S,S=os(P,g,!1,h)&&S,f)for(U=0;U<f.length;U++)P=h.g=f[U],S=os(P,g,!1,h)&&S}$e.prototype.N=function(){if($e.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let g=0;g<f.length;g++)Y(f[g]);delete a.g[h],a.h--}}this.G=null},$e.prototype.J=function(a,h,f,g){return this.i.add(String(a),h,!1,f,g)},$e.prototype.K=function(a,h,f,g){return this.i.add(String(a),h,!0,f,g)};function os(a,h,f,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let S=!0;for(let P=0;P<h.length;++P){const U=h[P];if(U&&!U.da&&U.capture==f){const ee=U.listener,Ce=U.ha||U.src;U.fa&&Ve(a.i,U),S=ee.call(Ce,g)!==!1&&S}}return S&&!g.defaultPrevented}function Cg(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=u(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function Yl(a){a.g=Cg(()=>{a.g=null,a.i&&(a.i=!1,Yl(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Pg extends I{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Yl(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function jr(a){I.call(this),this.h=a,this.g={}}p(jr,I);var Ql=[];function Xl(a){Z(a.g,function(h,f){this.g.hasOwnProperty(f)&&xe(h)},a),a.g={}}jr.prototype.N=function(){jr.Z.N.call(this),Xl(this)},jr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Zo=o.JSON.stringify,kg=o.JSON.parse,xg=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Jl(){}function Zl(){}var Gr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ea(){E.call(this,"d")}p(ea,E);function ta(){E.call(this,"c")}p(ta,E);var Dn={},eu=null;function as(){return eu=eu||new $e}Dn.Ia="serverreachability";function tu(a){E.call(this,Dn.Ia,a)}p(tu,E);function Wr(a){const h=as();Xe(h,new tu(h))}Dn.STAT_EVENT="statevent";function nu(a,h){E.call(this,Dn.STAT_EVENT,a),this.stat=h}p(nu,E);function Je(a){const h=as();Xe(h,new nu(h,a))}Dn.Ja="timingevent";function ru(a,h){E.call(this,Dn.Ja,a),this.size=h}p(ru,E);function Kr(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Yr(){this.g=!0}Yr.prototype.ua=function(){this.g=!1};function Dg(a,h,f,g,S,P){a.info(function(){if(a.g)if(P){var U="",ee=P.split("&");for(let de=0;de<ee.length;de++){var Ce=ee[de].split("=");if(Ce.length>1){const De=Ce[0];Ce=Ce[1];const bt=De.split("_");U=bt.length>=2&&bt[1]=="type"?U+(De+"="+Ce+"&"):U+(De+"=redacted&")}}}else U=null;else U=P;return"XMLHTTP REQ ("+g+") [attempt "+S+"]: "+h+`
`+f+`
`+U})}function Ng(a,h,f,g,S,P,U){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+S+"]: "+h+`
`+f+`
`+P+" "+U})}function cr(a,h,f,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Vg(a,f)+(g?" "+g:"")})}function Mg(a,h){a.info(function(){return"TIMEOUT: "+h})}Yr.prototype.info=function(){};function Vg(a,h){if(!a.g)return h;if(!h)return null;try{const P=JSON.parse(h);if(P){for(a=0;a<P.length;a++)if(Array.isArray(P[a])){var f=P[a];if(!(f.length<2)){var g=f[1];if(Array.isArray(g)&&!(g.length<1)){var S=g[0];if(S!="noop"&&S!="stop"&&S!="close")for(let U=1;U<g.length;U++)g[U]=""}}}}return Zo(P)}catch{return h}}var cs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},iu={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},su;function na(){}p(na,Jl),na.prototype.g=function(){return new XMLHttpRequest},su=new na;function Qr(a){return encodeURIComponent(String(a))}function Og(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function rn(a,h,f,g){this.j=a,this.i=h,this.l=f,this.S=g||1,this.V=new jr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ou}function ou(){this.i=null,this.g="",this.h=!1}var au={},ra={};function ia(a,h,f){a.M=1,a.A=us(It(h)),a.u=f,a.R=!0,cu(a,null)}function cu(a,h){a.F=Date.now(),ls(a),a.B=It(a.A);var f=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),Tu(f.i,"t",g),a.C=0,f=a.j.L,a.h=new ou,a.g=Fu(a.j,f?h:null,!a.u),a.P>0&&(a.O=new Pg(u(a.Y,a,a.g),a.P)),h=a.V,f=a.g,g=a.ba;var S="readystatechange";Array.isArray(S)||(S&&(Ql[0]=S.toString()),S=Ql);for(let P=0;P<S.length;P++){const U=q(f,S[P],g||h.handleEvent,!1,h.h||h);if(!U)break;h.g[U.key]=U}h=a.J?le(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Wr(),Dg(a.i,a.v,a.B,a.l,a.S,a.u)}rn.prototype.ba=function(a){a=a.target;const h=this.O;h&&an(a)==3?h.j():this.Y(a)},rn.prototype.Y=function(a){try{if(a==this.g)e:{const ee=an(this.g),Ce=this.g.ya(),de=this.g.ca();if(!(ee<3)&&(ee!=3||this.g&&(this.h.h||this.g.la()||Cu(this.g)))){this.K||ee!=4||Ce==7||(Ce==8||de<=0?Wr(3):Wr(2)),sa(this);var h=this.g.ca();this.X=h;var f=Lg(this);if(this.o=h==200,Ng(this.i,this.v,this.B,this.l,this.S,ee,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,S=this.g;if((g=S.g?S.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!w(g)){var P=g;break t}}P=null}if(a=P)cr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,oa(this,a);else{this.o=!1,this.m=3,Je(12),Nn(this),Xr(this);break e}}if(this.R){a=!0;let De;for(;!this.K&&this.C<f.length;)if(De=Ug(this,f),De==ra){ee==4&&(this.m=4,Je(14),a=!1),cr(this.i,this.l,null,"[Incomplete Response]");break}else if(De==au){this.m=4,Je(15),cr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else cr(this.i,this.l,De,null),oa(this,De);if(lu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ee!=4||f.length!=0||this.h.h||(this.m=1,Je(16),a=!1),this.o=this.o&&a,!a)cr(this.i,this.l,f,"[Invalid Chunked Response]"),Nn(this),Xr(this);else if(f.length>0&&!this.W){this.W=!0;var U=this.j;U.g==this&&U.aa&&!U.P&&(U.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),ma(U),U.P=!0,Je(11))}}else cr(this.i,this.l,f,null),oa(this,f);ee==4&&Nn(this),this.o&&!this.K&&(ee==4?Vu(this.j,this):(this.o=!1,ls(this)))}else Jg(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,Je(12)):(this.m=0,Je(13)),Nn(this),Xr(this)}}}catch{}finally{}};function Lg(a){if(!lu(a))return a.g.la();const h=Cu(a.g);if(h==="")return"";let f="";const g=h.length,S=an(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Nn(a),Xr(a),"";a.h.i=new o.TextDecoder}for(let P=0;P<g;P++)a.h.h=!0,f+=a.h.i.decode(h[P],{stream:!(S&&P==g-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function lu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Ug(a,h){var f=a.C,g=h.indexOf(`
`,f);return g==-1?ra:(f=Number(h.substring(f,g)),isNaN(f)?au:(g+=1,g+f>h.length?ra:(h=h.slice(g,g+f),a.C=g+f,h)))}rn.prototype.cancel=function(){this.K=!0,Nn(this)};function ls(a){a.T=Date.now()+a.H,uu(a,a.H)}function uu(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Kr(u(a.aa,a),h)}function sa(a){a.D&&(o.clearTimeout(a.D),a.D=null)}rn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Mg(this.i,this.B),this.M!=2&&(Wr(),Je(17)),Nn(this),this.m=2,Xr(this)):uu(this,this.T-a)};function Xr(a){a.j.I==0||a.K||Vu(a.j,a)}function Nn(a){sa(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,Xl(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function oa(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||aa(f.h,a))){if(!a.L&&aa(f.h,a)&&f.I==3){try{var g=f.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var S=g;if(S[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)ps(f),fs(f);else break e;fa(f),Je(18)}}else f.xa=S[1],0<f.xa-f.K&&S[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=Kr(u(f.Va,f),6e3));fu(f.h)<=1&&f.ta&&(f.ta=void 0)}else Vn(f,11)}else if((a.L||f.g==a)&&ps(f),!w(h))for(S=f.Ba.g.parse(h),h=0;h<S.length;h++){let de=S[h];const De=de[0];if(!(De<=f.K))if(f.K=De,de=de[1],f.I==2)if(de[0]=="c"){f.M=de[1],f.ba=de[2];const bt=de[3];bt!=null&&(f.ka=bt,f.j.info("VER="+f.ka));const On=de[4];On!=null&&(f.za=On,f.j.info("SVER="+f.za));const cn=de[5];cn!=null&&typeof cn=="number"&&cn>0&&(g=1.5*cn,f.O=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const ln=a.g;if(ln){const _s=ln.g?ln.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_s){var P=g.h;P.g||_s.indexOf("spdy")==-1&&_s.indexOf("quic")==-1&&_s.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(ca(P,P.h),P.h=null))}if(g.G){const pa=ln.g?ln.g.getResponseHeader("X-HTTP-Session-Id"):null;pa&&(g.wa=pa,pe(g.J,g.G,pa))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),g=f;var U=a;if(g.na=Uu(g,g.L?g.ba:null,g.W),U.L){mu(g.h,U);var ee=U,Ce=g.O;Ce&&(ee.H=Ce),ee.D&&(sa(ee),ls(ee)),g.g=U}else Nu(g);f.i.length>0&&ms(f)}else de[0]!="stop"&&de[0]!="close"||Vn(f,7);else f.I==3&&(de[0]=="stop"||de[0]=="close"?de[0]=="stop"?Vn(f,7):da(f):de[0]!="noop"&&f.l&&f.l.qa(de),f.A=0)}}Wr(4)}catch{}}var Fg=class{constructor(a,h){this.g=a,this.map=h}};function hu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function du(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function fu(a){return a.h?1:a.g?a.g.size:0}function aa(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function ca(a,h){a.g?a.g.add(h):a.h=h}function mu(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}hu.prototype.cancel=function(){if(this.i=pu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function pu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return _(a.i)}var gu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Bg(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const g=a[f].indexOf("=");let S,P=null;g>=0?(S=a[f].substring(0,g),P=a[f].substring(g+1)):S=a[f],h(S,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function sn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof sn?(this.l=a.l,Jr(this,a.j),this.o=a.o,this.g=a.g,Zr(this,a.u),this.h=a.h,la(this,Eu(a.i)),this.m=a.m):a&&(h=String(a).match(gu))?(this.l=!1,Jr(this,h[1]||"",!0),this.o=ei(h[2]||""),this.g=ei(h[3]||"",!0),Zr(this,h[4]),this.h=ei(h[5]||"",!0),la(this,h[6]||"",!0),this.m=ei(h[7]||"")):(this.l=!1,this.i=new ni(null,this.l))}sn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(ti(h,_u,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(ti(h,_u,!0),"@"),a.push(Qr(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(ti(f,f.charAt(0)=="/"?zg:qg,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",ti(f,jg)),a.join("")},sn.prototype.resolve=function(a){const h=It(this);let f=!!a.j;f?Jr(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var g=a.h;if(f)Zr(h,a.u);else if(f=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var S=h.h.lastIndexOf("/");S!=-1&&(g=h.h.slice(0,S+1)+g)}if(S=g,S==".."||S==".")g="";else if(S.indexOf("./")!=-1||S.indexOf("/.")!=-1){g=S.lastIndexOf("/",0)==0,S=S.split("/");const P=[];for(let U=0;U<S.length;){const ee=S[U++];ee=="."?g&&U==S.length&&P.push(""):ee==".."?((P.length>1||P.length==1&&P[0]!="")&&P.pop(),g&&U==S.length&&P.push("")):(P.push(ee),g=!0)}g=P.join("/")}else g=S}return f?h.h=g:f=a.i.toString()!=="",f?la(h,Eu(a.i)):f=!!a.m,f&&(h.m=a.m),h};function It(a){return new sn(a)}function Jr(a,h,f){a.j=f?ei(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Zr(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function la(a,h,f){h instanceof ni?(a.i=h,Gg(a.i,a.l)):(f||(h=ti(h,Hg)),a.i=new ni(h,a.l))}function pe(a,h,f){a.i.set(h,f)}function us(a){return pe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function ei(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ti(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,$g),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function $g(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var _u=/[#\/\?@]/g,qg=/[#\?:]/g,zg=/[#\?]/g,Hg=/[#\?@]/g,jg=/#/g;function ni(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Mn(a){a.g||(a.g=new Map,a.h=0,a.i&&Bg(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=ni.prototype,n.add=function(a,h){Mn(this),this.i=null,a=lr(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function yu(a,h){Mn(a),h=lr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function vu(a,h){return Mn(a),h=lr(a,h),a.g.has(h)}n.forEach=function(a,h){Mn(this),this.g.forEach(function(f,g){f.forEach(function(S){a.call(h,S,g,this)},this)},this)};function wu(a,h){Mn(a);let f=[];if(typeof h=="string")vu(a,h)&&(f=f.concat(a.g.get(lr(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}n.set=function(a,h){return Mn(this),this.i=null,a=lr(this,a),vu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=wu(this,a),a.length>0?String(a[0]):h):h};function Tu(a,h,f){yu(a,h),f.length>0&&(a.i=null,a.g.set(lr(a,h),_(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var f=h[g];const S=Qr(f);f=wu(this,f);for(let P=0;P<f.length;P++){let U=S;f[P]!==""&&(U+="="+Qr(f[P])),a.push(U)}}return this.i=a.join("&")};function Eu(a){const h=new ni;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function lr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Gg(a,h){h&&!a.j&&(Mn(a),a.i=null,a.g.forEach(function(f,g){const S=g.toLowerCase();g!=S&&(yu(this,g),Tu(this,S,f))},a)),a.j=h}function Wg(a,h){const f=new Yr;if(o.Image){const g=new Image;g.onload=d(on,f,"TestLoadImage: loaded",!0,h,g),g.onerror=d(on,f,"TestLoadImage: error",!1,h,g),g.onabort=d(on,f,"TestLoadImage: abort",!1,h,g),g.ontimeout=d(on,f,"TestLoadImage: timeout",!1,h,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function Kg(a,h){const f=new Yr,g=new AbortController,S=setTimeout(()=>{g.abort(),on(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(P=>{clearTimeout(S),P.ok?on(f,"TestPingServer: ok",!0,h):on(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(S),on(f,"TestPingServer: error",!1,h)})}function on(a,h,f,g,S){try{S&&(S.onload=null,S.onerror=null,S.onabort=null,S.ontimeout=null),g(f)}catch{}}function Yg(){this.g=new xg}function ua(a){this.i=a.Sb||null,this.h=a.ab||!1}p(ua,Jl),ua.prototype.g=function(){return new hs(this.i,this.h)};function hs(a,h){$e.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(hs,$e),n=hs.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,ii(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ri(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ii(this)),this.g&&(this.readyState=3,ii(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Iu(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Iu(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?ri(this):ii(this),this.readyState==3&&Iu(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,ri(this))},n.Na=function(a){this.g&&(this.response=a,ri(this))},n.ga=function(){this.g&&ri(this)};function ri(a){a.readyState=4,a.l=null,a.j=null,a.B=null,ii(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function ii(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(hs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function bu(a){let h="";return Z(a,function(f,g){h+=g,h+=":",h+=f,h+=`\r
`}),h}function ha(a,h,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=bu(f),typeof a=="string"?f!=null&&Qr(f):pe(a,h,f))}function we(a){$e.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(we,$e);var Qg=/^https?$/i,Xg=["POST","PUT"];n=we.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():su.g(),this.g.onreadystatechange=m(u(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){Au(this,P);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var S in g)f.set(S,g[S]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const P of g.keys())f.set(P,g.get(P));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(P=>P.toLowerCase()=="content-type"),S=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Xg,h,void 0)>=0)||g||S||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,U]of f)this.g.setRequestHeader(P,U);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(P){Au(this,P)}};function Au(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Su(a),ds(a)}function Su(a){a.A||(a.A=!0,Xe(a,"complete"),Xe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Xe(this,"complete"),Xe(this,"abort"),ds(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ds(this,!0)),we.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Ru(this):this.Xa())},n.Xa=function(){Ru(this)};function Ru(a){if(a.h&&typeof s<"u"){if(a.v&&an(a)==4)setTimeout(a.Ca.bind(a),0);else if(Xe(a,"readystatechange"),an(a)==4){a.h=!1;try{const P=a.ca();e:switch(P){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var g;if(g=P===0){let U=String(a.D).match(gu)[1]||null;!U&&o.self&&o.self.location&&(U=o.self.location.protocol.slice(0,-1)),g=!Qg.test(U?U.toLowerCase():"")}f=g}if(f)Xe(a,"complete"),Xe(a,"success");else{a.o=6;try{var S=an(a)>2?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.ca()+"]",Su(a)}}finally{ds(a)}}}}function ds(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||Xe(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function an(a){return a.g?a.g.readyState:0}n.ca=function(){try{return an(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),kg(h)}};function Cu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Jg(a){const h={};a=(a.g&&an(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(w(a[g]))continue;var f=Og(a[g]);const S=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const P=h[S]||[];h[S]=P,P.push(f)}te(h,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function si(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Pu(a){this.za=0,this.i=[],this.j=new Yr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=si("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=si("baseRetryDelayMs",5e3,a),this.Za=si("retryDelaySeedMs",1e4,a),this.Ta=si("forwardChannelMaxRetries",2,a),this.va=si("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new hu(a&&a.concurrentRequestLimit),this.Ba=new Yg,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Pu.prototype,n.ka=8,n.I=1,n.connect=function(a,h,f,g){Je(0),this.W=a,this.H=h||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.J=Uu(this,null,this.W),ms(this)};function da(a){if(ku(a),a.I==3){var h=a.V++,f=It(a.J);if(pe(f,"SID",a.M),pe(f,"RID",h),pe(f,"TYPE","terminate"),oi(a,f),h=new rn(a,a.j,h),h.M=2,h.A=us(It(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=Fu(h.j,null),h.g.ea(h.A)),h.F=Date.now(),ls(h)}Lu(a)}function fs(a){a.g&&(ma(a),a.g.cancel(),a.g=null)}function ku(a){fs(a),a.v&&(o.clearTimeout(a.v),a.v=null),ps(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function ms(a){if(!du(a.h)&&!a.m){a.m=!0;var h=a.Ea;K||y(),L||(K(),L=!0),T.add(h,a),a.D=0}}function Zg(a,h){return fu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Kr(u(a.Ea,a,h),Ou(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const S=new rn(this,this.j,a);let P=this.o;if(this.U&&(P?(P=le(P),We(P,this.U)):P=this.U),this.u!==null||this.R||(S.J=P,P=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Du(this,S,h),f=It(this.J),pe(f,"RID",a),pe(f,"CVER",22),this.G&&pe(f,"X-HTTP-Session-Id",this.G),oi(this,f),P&&(this.R?h="headers="+Qr(bu(P))+"&"+h:this.u&&ha(f,this.u,P)),ca(this.h,S),this.Ra&&pe(f,"TYPE","init"),this.S?(pe(f,"$req",h),pe(f,"SID","null"),S.U=!0,ia(S,f,null)):ia(S,f,h),this.I=2}}else this.I==3&&(a?xu(this,a):this.i.length==0||du(this.h)||xu(this))};function xu(a,h){var f;h?f=h.l:f=a.V++;const g=It(a.J);pe(g,"SID",a.M),pe(g,"RID",f),pe(g,"AID",a.K),oi(a,g),a.u&&a.o&&ha(g,a.u,a.o),f=new rn(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Du(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),ca(a.h,f),ia(f,g,h)}function oi(a,h){a.H&&Z(a.H,function(f,g){pe(h,g,f)}),a.l&&Z({},function(f,g){pe(h,g,f)})}function Du(a,h,f){f=Math.min(a.i.length,f);const g=a.l?u(a.l.Ka,a.l,a):null;e:{var S=a.i;let ee=-1;for(;;){const Ce=["count="+f];ee==-1?f>0?(ee=S[0].g,Ce.push("ofs="+ee)):ee=0:Ce.push("ofs="+ee);let de=!0;for(let De=0;De<f;De++){var P=S[De].g;const bt=S[De].map;if(P-=ee,P<0)ee=Math.max(0,S[De].g-100),de=!1;else try{P="req"+P+"_"||"";try{var U=bt instanceof Map?bt:Object.entries(bt);for(const[On,cn]of U){let ln=cn;c(cn)&&(ln=Zo(cn)),Ce.push(P+On+"="+encodeURIComponent(ln))}}catch(On){throw Ce.push(P+"type="+encodeURIComponent("_badmap")),On}}catch{g&&g(bt)}}if(de){U=Ce.join("&");break e}}U=void 0}return a=a.i.splice(0,f),h.G=a,U}function Nu(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;K||y(),L||(K(),L=!0),T.add(h,a),a.A=0}}function fa(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Kr(u(a.Da,a),Ou(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Mu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Kr(u(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Je(10),fs(this),Mu(this))};function ma(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Mu(a){a.g=new rn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=It(a.na);pe(h,"RID","rpc"),pe(h,"SID",a.M),pe(h,"AID",a.K),pe(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&pe(h,"TO",a.ia),pe(h,"TYPE","xmlhttp"),oi(a,h),a.u&&a.o&&ha(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=us(It(h)),f.u=null,f.R=!0,cu(f,a)}n.Va=function(){this.C!=null&&(this.C=null,fs(this),fa(this),Je(19))};function ps(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Vu(a,h){var f=null;if(a.g==h){ps(a),ma(a),a.g=null;var g=2}else if(aa(a.h,h))f=h.G,mu(a.h,h),g=1;else return;if(a.I!=0){if(h.o)if(g==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var S=a.D;g=as(),Xe(g,new ru(g,f)),ms(a)}else Nu(a);else if(S=h.m,S==3||S==0&&h.X>0||!(g==1&&Zg(a,h)||g==2&&fa(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),S){case 1:Vn(a,5);break;case 4:Vn(a,10);break;case 3:Vn(a,6);break;default:Vn(a,2)}}}function Ou(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function Vn(a,h){if(a.j.info("Error code "+h),h==2){var f=u(a.bb,a),g=a.Ua;const S=!g;g=new sn(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Jr(g,"https"),us(g),S?Wg(g.toString(),f):Kg(g.toString(),f)}else Je(2);a.I=0,a.l&&a.l.pa(h),Lu(a),ku(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Je(2)):(this.j.info("Failed to ping google.com"),Je(1))};function Lu(a){if(a.I=0,a.ja=[],a.l){const h=pu(a.h);(h.length!=0||a.i.length!=0)&&(A(a.ja,h),A(a.ja,a.i),a.h.i.length=0,_(a.i),a.i.length=0),a.l.oa()}}function Uu(a,h,f){var g=f instanceof sn?It(f):new sn(f);if(g.g!="")h&&(g.g=h+"."+g.g),Zr(g,g.u);else{var S=o.location;g=S.protocol,h=h?h+"."+S.hostname:S.hostname,S=+S.port;const P=new sn(null);g&&Jr(P,g),h&&(P.g=h),S&&Zr(P,S),f&&(P.h=f),g=P}return f=a.G,h=a.wa,f&&h&&pe(g,f,h),pe(g,"VER",a.ka),oi(a,g),g}function Fu(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new we(new ua({ab:f})):new we(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bu(){}n=Bu.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function gs(){}gs.prototype.g=function(a,h){return new it(a,h)};function it(a,h){$e.call(this),this.g=new Pu(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!w(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!w(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new ur(this)}p(it,$e),it.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},it.prototype.close=function(){da(this.g)},it.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=Zo(a),a=f);h.i.push(new Fg(h.Ya++,a)),h.I==3&&ms(h)},it.prototype.N=function(){this.g.l=null,delete this.j,da(this.g),delete this.g,it.Z.N.call(this)};function $u(a){ea.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p($u,ea);function qu(){ta.call(this),this.status=1}p(qu,ta);function ur(a){this.g=a}p(ur,Bu),ur.prototype.ra=function(){Xe(this.g,"a")},ur.prototype.qa=function(a){Xe(this.g,new $u(a))},ur.prototype.pa=function(a){Xe(this.g,new qu)},ur.prototype.oa=function(){Xe(this.g,"b")},gs.prototype.createWebChannel=gs.prototype.g,it.prototype.send=it.prototype.o,it.prototype.open=it.prototype.m,it.prototype.close=it.prototype.close,Om=function(){return new gs},Vm=function(){return as()},Mm=Dn,sc={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},cs.NO_ERROR=0,cs.TIMEOUT=8,cs.HTTP_ERROR=6,Fs=cs,iu.COMPLETE="complete",Nm=iu,Zl.EventType=Gr,Gr.OPEN="a",Gr.CLOSE="b",Gr.ERROR="c",Gr.MESSAGE="d",$e.prototype.listen=$e.prototype.J,gi=Zl,we.prototype.listenOnce=we.prototype.K,we.prototype.getLastError=we.prototype.Ha,we.prototype.getLastErrorCode=we.prototype.ya,we.prototype.getStatus=we.prototype.ca,we.prototype.getResponseJson=we.prototype.La,we.prototype.getResponseText=we.prototype.la,we.prototype.send=we.prototype.ea,we.prototype.setWithCredentials=we.prototype.Fa,Dm=we}).apply(typeof Is<"u"?Is:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class ze{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ze.UNAUTHENTICATED=new ze(null),ze.GOOGLE_CREDENTIALS=new ze("google-credentials-uid"),ze.FIRST_PARTY=new ze("first-party-uid"),ze.MOCK_USER=new ze("mock-user");/**
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
 */let Fr="12.8.0";function uA(n){Fr=n}/**
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
 */const Zn=new jc("@firebase/firestore");function dr(){return Zn.logLevel}function z(n,...e){if(Zn.logLevel<=re.DEBUG){const t=e.map(il);Zn.debug(`Firestore (${Fr}): ${n}`,...t)}}function Zt(n,...e){if(Zn.logLevel<=re.ERROR){const t=e.map(il);Zn.error(`Firestore (${Fr}): ${n}`,...t)}}function xr(n,...e){if(Zn.logLevel<=re.WARN){const t=e.map(il);Zn.warn(`Firestore (${Fr}): ${n}`,...t)}}function il(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function W(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Lm(n,r,t)}function Lm(n,e,t){let r=`FIRESTORE (${Fr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Zt(r),new Error(r)}function ue(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Lm(e,i,r)}function J(n,e){return n}/**
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
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends Ot{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Wt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Um{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class hA{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ze.UNAUTHENTICATED))}shutdown(){}}class dA{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class fA{constructor(e){this.t=e,this.currentUser=ze.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ue(this.o===void 0,42304);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new Wt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Wt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(z("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Wt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ue(typeof r.accessToken=="string",31837,{l:r}),new Um(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ue(e===null||typeof e=="string",2055,{h:e}),new ze(e)}}class mA{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=ze.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class pA{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new mA(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(ze.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Jh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class gA{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ct(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ue(this.o===void 0,3512);const r=s=>{s.error!=null&&z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Jh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ue(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Jh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function _A(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class sl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=_A(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function ie(n,e){return n<e?-1:n>e?1:0}function oc(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const i=n.charAt(r),s=e.charAt(r);if(i!==s)return xa(i)===xa(s)?ie(i,s):xa(i)?1:-1}return ie(n.length,e.length)}const yA=55296,vA=57343;function xa(n){const e=n.charCodeAt(0);return e>=yA&&e<=vA}function Dr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
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
 */const Zh="__name__";class At{constructor(e,t,r){t===void 0?t=0:t>e.length&&W(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&W(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return At.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof At?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=At.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return ie(e.length,t.length)}static compareSegments(e,t){const r=At.isNumericId(e),i=At.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?At.extractNumericId(e).compare(At.extractNumericId(t)):oc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return vn.fromString(e.substring(4,e.length-2))}}class me extends At{construct(e,t,r){return new me(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new B(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new me(t)}static emptyPath(){return new me([])}}const wA=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Fe extends At{construct(e,t,r){return new Fe(e,t,r)}static isValidIdentifier(e){return wA.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Fe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Zh}static keyField(){return new Fe([Zh])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new B(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new B(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new B(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new B(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Fe(t)}static emptyPath(){return new Fe([])}}/**
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
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(me.fromString(e))}static fromName(e){return new G(me.fromString(e).popFirst(5))}static empty(){return new G(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return me.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new me(e.slice()))}}/**
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
 */function Fm(n,e,t){if(!t)throw new B(D.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function TA(n,e,t,r){if(e===!0&&r===!0)throw new B(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ed(n){if(!G.isDocumentKey(n))throw new B(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function td(n){if(G.isDocumentKey(n))throw new B(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Bm(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function xo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":W(12329,{type:typeof n})}function rt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new B(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=xo(n);throw new B(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Re(n,e){const t={typeString:n};return e&&(t.value=e),t}function es(n,e){if(!Bm(n))throw new B(D.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(i&&typeof o!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new B(D.INVALID_ARGUMENT,t);return!0}/**
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
 */const nd=-62135596800,rd=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*rd);return new ge(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new B(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new B(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<nd)throw new B(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new B(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/rd}_compareTo(e){return this.seconds===e.seconds?ie(this.nanoseconds,e.nanoseconds):ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(es(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-nd;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:Re("string",ge._jsonSchemaVersion),seconds:Re("number"),nanoseconds:Re("number")};/**
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
 */class X{static fromTimestamp(e){return new X(e)}static min(){return new X(new ge(0,0))}static max(){return new X(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const Ni=-1;function EA(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=X.fromTimestamp(r===1e9?new ge(t+1,0):new ge(t,r));return new En(i,G.empty(),e)}function IA(n){return new En(n.readTime,n.key,Ni)}class En{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new En(X.min(),G.empty(),Ni)}static max(){return new En(X.max(),G.empty(),Ni)}}function bA(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=G.comparator(n.documentKey,e.documentKey),t!==0?t:ie(n.largestBatchId,e.largestBatchId))}/**
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
 */const AA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class SA{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Br(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==AA)throw n;z("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class N{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&W(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new N((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof N?t:N.resolve(t)}catch(t){return N.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):N.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):N.reject(t)}static resolve(e){return new N((t,r)=>{t(e)})}static reject(e){return new N((t,r)=>{r(e)})}static waitFor(e){return new N((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},l=>r(l))}),o=!0,s===i&&t()})}static or(e){let t=N.resolve(!1);for(const r of e)t=t.next(i=>i?N.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new N((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let l=0;l<s;l++){const u=l;t(e[u]).next(d=>{o[u]=d,++c,c===s&&r(o)},d=>i(d))}})}static doWhile(e,t){return new N((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function RA(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function $r(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Do{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Do.ce=-1;/**
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
 */const ol=-1;function No(n){return n==null}function uo(n){return n===0&&1/n==-1/0}function CA(n){return typeof n=="number"&&Number.isInteger(n)&&!uo(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const $m="";function PA(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=id(e)),e=kA(n.get(t),e);return id(e)}function kA(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case $m:t+="";break;default:t+=s}}return t}function id(n){return n+$m+""}/**
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
 */function sd(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function qm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ve{constructor(e,t){this.comparator=e,this.root=t||Ue.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ue.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ue.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new bs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new bs(this.root,e,this.comparator,!1)}getReverseIterator(){return new bs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new bs(this.root,e,this.comparator,!0)}}class bs{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ue{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Ue.RED,this.left=i??Ue.EMPTY,this.right=s??Ue.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Ue(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ue.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Ue.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ue.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ue.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw W(43730,{key:this.key,value:this.value});if(this.right.isRed())throw W(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw W(27949);return e+(this.isRed()?0:1)}}Ue.EMPTY=null,Ue.RED=!0,Ue.BLACK=!1;Ue.EMPTY=new class{constructor(){this.size=0}get key(){throw W(57766)}get value(){throw W(16141)}get color(){throw W(16727)}get left(){throw W(29726)}get right(){throw W(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new Ue(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Pe{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new od(this.data.getIterator())}getIteratorFrom(e){return new od(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Pe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Pe(this.comparator);return t.data=e,t}}class od{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class st{constructor(e){this.fields=e,e.sort(Fe.comparator)}static empty(){return new st([])}unionWith(e){let t=new Pe(Fe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new st(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Dr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class zm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Be{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new zm("Invalid base64 string: "+s):s}}(e);return new Be(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Be(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Be.EMPTY_BYTE_STRING=new Be("");const xA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function In(n){if(ue(!!n,39018),typeof n=="string"){let e=0;const t=xA.exec(n);if(ue(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:be(n.seconds),nanos:be(n.nanos)}}function be(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function bn(n){return typeof n=="string"?Be.fromBase64String(n):Be.fromUint8Array(n)}/**
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
 */const Hm="server_timestamp",jm="__type__",Gm="__previous_value__",Wm="__local_write_time__";function al(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[jm])==null?void 0:r.stringValue)===Hm}function Mo(n){const e=n.mapValue.fields[Gm];return al(e)?Mo(e):e}function Mi(n){const e=In(n.mapValue.fields[Wm].timestampValue);return new ge(e.seconds,e.nanos)}/**
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
 */class DA{constructor(e,t,r,i,s,o,c,l,u,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u,this.isUsingEmulator=d,this.apiKey=p}}const ho="(default)";class Vi{constructor(e,t){this.projectId=e,this.database=t||ho}static empty(){return new Vi("","")}get isDefaultDatabase(){return this.database===ho}isEqual(e){return e instanceof Vi&&e.projectId===this.projectId&&e.database===this.database}}function NA(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new B(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Vi(n.options.projectId,e)}/**
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
 */const Km="__type__",MA="__max__",As={mapValue:{}},Ym="__vector__",fo="value";function An(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?al(n)?4:OA(n)?9007199254740991:VA(n)?10:11:W(28295,{value:n})}function Mt(n,e){if(n===e)return!0;const t=An(n);if(t!==An(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Mi(n).isEqual(Mi(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=In(i.timestampValue),c=In(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return bn(i.bytesValue).isEqual(bn(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return be(i.geoPointValue.latitude)===be(s.geoPointValue.latitude)&&be(i.geoPointValue.longitude)===be(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return be(i.integerValue)===be(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=be(i.doubleValue),c=be(s.doubleValue);return o===c?uo(o)===uo(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return Dr(n.arrayValue.values||[],e.arrayValue.values||[],Mt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(sd(o)!==sd(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Mt(o[l],c[l])))return!1;return!0}(n,e);default:return W(52216,{left:n})}}function Oi(n,e){return(n.values||[]).find(t=>Mt(t,e))!==void 0}function Nr(n,e){if(n===e)return 0;const t=An(n),r=An(e);if(t!==r)return ie(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ie(n.booleanValue,e.booleanValue);case 2:return function(s,o){const c=be(s.integerValue||s.doubleValue),l=be(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return ad(n.timestampValue,e.timestampValue);case 4:return ad(Mi(n),Mi(e));case 5:return oc(n.stringValue,e.stringValue);case 6:return function(s,o){const c=bn(s),l=bn(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const d=ie(c[u],l[u]);if(d!==0)return d}return ie(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const c=ie(be(s.latitude),be(o.latitude));return c!==0?c:ie(be(s.longitude),be(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return cd(n.arrayValue,e.arrayValue);case 10:return function(s,o){var m,_,A,k;const c=s.fields||{},l=o.fields||{},u=(m=c[fo])==null?void 0:m.arrayValue,d=(_=l[fo])==null?void 0:_.arrayValue,p=ie(((A=u==null?void 0:u.values)==null?void 0:A.length)||0,((k=d==null?void 0:d.values)==null?void 0:k.length)||0);return p!==0?p:cd(u,d)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===As.mapValue&&o===As.mapValue)return 0;if(s===As.mapValue)return 1;if(o===As.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),u=o.fields||{},d=Object.keys(u);l.sort(),d.sort();for(let p=0;p<l.length&&p<d.length;++p){const m=oc(l[p],d[p]);if(m!==0)return m;const _=Nr(c[l[p]],u[d[p]]);if(_!==0)return _}return ie(l.length,d.length)}(n.mapValue,e.mapValue);default:throw W(23264,{he:t})}}function ad(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ie(n,e);const t=In(n),r=In(e),i=ie(t.seconds,r.seconds);return i!==0?i:ie(t.nanos,r.nanos)}function cd(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Nr(t[i],r[i]);if(s)return s}return ie(t.length,r.length)}function Mr(n){return ac(n)}function ac(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=In(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return bn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return G.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=ac(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${ac(t.fields[o])}`;return i+"}"}(n.mapValue):W(61005,{value:n})}function Bs(n){switch(An(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Mo(n);return e?16+Bs(e):16;case 5:return 2*n.stringValue.length;case 6:return bn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Bs(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Pn(r.fields,(s,o)=>{i+=s.length+Bs(o)}),i}(n.mapValue);default:throw W(13486,{value:n})}}function ld(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function cc(n){return!!n&&"integerValue"in n}function cl(n){return!!n&&"arrayValue"in n}function ud(n){return!!n&&"nullValue"in n}function hd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function $s(n){return!!n&&"mapValue"in n}function VA(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Km])==null?void 0:r.stringValue)===Ym}function Ei(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Pn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ei(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ei(n.arrayValue.values[t]);return e}return{...n}}function OA(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===MA}/**
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
 */class tt{constructor(e){this.value=e}static empty(){return new tt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!$s(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ei(t)}setAll(e){let t=Fe.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Ei(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());$s(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Mt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];$s(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Pn(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new tt(Ei(this.value))}}function Qm(n){const e=[];return Pn(n.fields,(t,r)=>{const i=new Fe([t]);if($s(r)){const s=Qm(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new st(e)}/**
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
 */class He{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new He(e,0,X.min(),X.min(),X.min(),tt.empty(),0)}static newFoundDocument(e,t,r,i){return new He(e,1,t,X.min(),r,i,0)}static newNoDocument(e,t){return new He(e,2,t,X.min(),X.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new He(e,3,t,X.min(),X.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(X.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=X.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof He&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new He(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class mo{constructor(e,t){this.position=e,this.inclusive=t}}function dd(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),t.key):r=Nr(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function fd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Mt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Li{constructor(e,t="asc"){this.field=e,this.dir=t}}function LA(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Xm{}class Se extends Xm{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new FA(e,t,r):t==="array-contains"?new qA(e,r):t==="in"?new zA(e,r):t==="not-in"?new HA(e,r):t==="array-contains-any"?new jA(e,r):new Se(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new BA(e,r):new $A(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Nr(t,this.value)):t!==null&&An(this.value)===An(t)&&this.matchesComparison(Nr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class wt extends Xm{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new wt(e,t)}matches(e){return Jm(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Jm(n){return n.op==="and"}function Zm(n){return UA(n)&&Jm(n)}function UA(n){for(const e of n.filters)if(e instanceof wt)return!1;return!0}function lc(n){if(n instanceof Se)return n.field.canonicalString()+n.op.toString()+Mr(n.value);if(Zm(n))return n.filters.map(e=>lc(e)).join(",");{const e=n.filters.map(t=>lc(t)).join(",");return`${n.op}(${e})`}}function ep(n,e){return n instanceof Se?function(r,i){return i instanceof Se&&r.op===i.op&&r.field.isEqual(i.field)&&Mt(r.value,i.value)}(n,e):n instanceof wt?function(r,i){return i instanceof wt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&ep(o,i.filters[c]),!0):!1}(n,e):void W(19439)}function tp(n){return n instanceof Se?function(t){return`${t.field.canonicalString()} ${t.op} ${Mr(t.value)}`}(n):n instanceof wt?function(t){return t.op.toString()+" {"+t.getFilters().map(tp).join(" ,")+"}"}(n):"Filter"}class FA extends Se{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class BA extends Se{constructor(e,t){super(e,"in",t),this.keys=np("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class $A extends Se{constructor(e,t){super(e,"not-in",t),this.keys=np("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function np(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>G.fromName(r.referenceValue))}class qA extends Se{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return cl(t)&&Oi(t.arrayValue,this.value)}}class zA extends Se{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Oi(this.value.arrayValue,t)}}class HA extends Se{constructor(e,t){super(e,"not-in",t)}matches(e){if(Oi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Oi(this.value.arrayValue,t)}}class jA extends Se{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!cl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Oi(this.value.arrayValue,r))}}/**
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
 */class GA{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.Te=null}}function md(n,e=null,t=[],r=[],i=null,s=null,o=null){return new GA(n,e,t,r,i,s,o)}function ll(n){const e=J(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>lc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),No(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Mr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Mr(r)).join(",")),e.Te=t}return e.Te}function ul(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!LA(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ep(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!fd(n.startAt,e.startAt)&&fd(n.endAt,e.endAt)}function uc(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class qr{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function WA(n,e,t,r,i,s,o,c){return new qr(n,e,t,r,i,s,o,c)}function Vo(n){return new qr(n)}function pd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function KA(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function rp(n){return n.collectionGroup!==null}function Ii(n){const e=J(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Pe(Fe.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(u=>{u.isInequality()&&(c=c.add(u.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Li(s,r))}),t.has(Fe.keyField().canonicalString())||e.Ie.push(new Li(Fe.keyField(),r))}return e.Ie}function kt(n){const e=J(n);return e.Ee||(e.Ee=YA(e,Ii(n))),e.Ee}function YA(n,e){if(n.limitType==="F")return md(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Li(i.field,s)});const t=n.endAt?new mo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new mo(n.startAt.position,n.startAt.inclusive):null;return md(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function hc(n,e){const t=n.filters.concat([e]);return new qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function QA(n,e){const t=n.explicitOrderBy.concat([e]);return new qr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function dc(n,e,t){return new qr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Oo(n,e){return ul(kt(n),kt(e))&&n.limitType===e.limitType}function ip(n){return`${ll(kt(n))}|lt:${n.limitType}`}function fr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>tp(i)).join(", ")}]`),No(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Mr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Mr(i)).join(",")),`Target(${r})`}(kt(n))}; limitType=${n.limitType})`}function Lo(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):G.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Ii(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,l){const u=dd(o,c,l);return o.inclusive?u<=0:u<0}(r.startAt,Ii(r),i)||r.endAt&&!function(o,c,l){const u=dd(o,c,l);return o.inclusive?u>=0:u>0}(r.endAt,Ii(r),i))}(n,e)}function XA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function sp(n){return(e,t)=>{let r=!1;for(const i of Ii(n)){const s=JA(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function JA(n,e,t){const r=n.field.isKeyField()?G.comparator(e.key,t.key):function(s,o,c){const l=o.data.field(s),u=c.data.field(s);return l!==null&&u!==null?Nr(l,u):W(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return W(19790,{direction:n.dir})}}/**
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
 */class sr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Pn(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return qm(this.inner)}size(){return this.innerSize}}/**
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
 */const ZA=new ve(G.comparator);function en(){return ZA}const op=new ve(G.comparator);function _i(...n){let e=op;for(const t of n)e=e.insert(t.key,t);return e}function ap(n){let e=op;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function $n(){return bi()}function cp(){return bi()}function bi(){return new sr(n=>n.toString(),(n,e)=>n.isEqual(e))}const eS=new ve(G.comparator),tS=new Pe(G.comparator);function se(...n){let e=tS;for(const t of n)e=e.add(t);return e}const nS=new Pe(ie);function rS(){return nS}/**
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
 */function hl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:uo(e)?"-0":e}}function lp(n){return{integerValue:""+n}}function iS(n,e){return CA(e)?lp(e):hl(n,e)}/**
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
 */class Uo{constructor(){this._=void 0}}function sS(n,e,t){return n instanceof Ui?function(i,s){const o={fields:{[jm]:{stringValue:Hm},[Wm]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&al(s)&&(s=Mo(s)),s&&(o.fields[Gm]=s),{mapValue:o}}(t,e):n instanceof Fi?hp(n,e):n instanceof Bi?dp(n,e):function(i,s){const o=up(i,s),c=gd(o)+gd(i.Ae);return cc(o)&&cc(i.Ae)?lp(c):hl(i.serializer,c)}(n,e)}function oS(n,e,t){return n instanceof Fi?hp(n,e):n instanceof Bi?dp(n,e):t}function up(n,e){return n instanceof po?function(r){return cc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Ui extends Uo{}class Fi extends Uo{constructor(e){super(),this.elements=e}}function hp(n,e){const t=fp(e);for(const r of n.elements)t.some(i=>Mt(i,r))||t.push(r);return{arrayValue:{values:t}}}class Bi extends Uo{constructor(e){super(),this.elements=e}}function dp(n,e){let t=fp(e);for(const r of n.elements)t=t.filter(i=>!Mt(i,r));return{arrayValue:{values:t}}}class po extends Uo{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function gd(n){return be(n.integerValue||n.doubleValue)}function fp(n){return cl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class aS{constructor(e,t){this.field=e,this.transform=t}}function cS(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Fi&&i instanceof Fi||r instanceof Bi&&i instanceof Bi?Dr(r.elements,i.elements,Mt):r instanceof po&&i instanceof po?Mt(r.Ae,i.Ae):r instanceof Ui&&i instanceof Ui}(n.transform,e.transform)}class lS{constructor(e,t){this.version=e,this.transformResults=t}}class ht{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ht}static exists(e){return new ht(void 0,e)}static updateTime(e){return new ht(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function qs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Fo{}function mp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new dl(n.key,ht.none()):new ts(n.key,n.data,ht.none());{const t=n.data,r=tt.empty();let i=new Pe(Fe.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new kn(n.key,r,new st(i.toArray()),ht.none())}}function uS(n,e,t){n instanceof ts?function(i,s,o){const c=i.value.clone(),l=yd(i.fieldTransforms,s,o.transformResults);c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof kn?function(i,s,o){if(!qs(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=yd(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(pp(i)),l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Ai(n,e,t,r){return n instanceof ts?function(s,o,c,l){if(!qs(s.precondition,o))return c;const u=s.value.clone(),d=vd(s.fieldTransforms,l,o);return u.setAll(d),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(n,e,t,r):n instanceof kn?function(s,o,c,l){if(!qs(s.precondition,o))return c;const u=vd(s.fieldTransforms,l,o),d=o.data;return d.setAll(pp(s)),d.setAll(u),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(s,o,c){return qs(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function hS(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=up(r.transform,i||null);s!=null&&(t===null&&(t=tt.empty()),t.set(r.field,s))}return t||null}function _d(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Dr(r,i,(s,o)=>cS(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ts extends Fo{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class kn extends Fo{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function pp(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function yd(n,e,t){const r=new Map;ue(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,oS(o,c,t[i]))}return r}function vd(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,sS(s,o,e))}return r}class dl extends Fo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class dS extends Fo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class fS{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&uS(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ai(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ai(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=cp();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const l=mp(o,c);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(X.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),se())}isEqual(e){return this.batchId===e.batchId&&Dr(this.mutations,e.mutations,(t,r)=>_d(t,r))&&Dr(this.baseMutations,e.baseMutations,(t,r)=>_d(t,r))}}class fl{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){ue(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=function(){return eS}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new fl(e,t,r,i)}}/**
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
 */class mS{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class pS{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Ae,ae;function gS(n){switch(n){case D.OK:return W(64938);case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0;default:return W(15467,{code:n})}}function gp(n){if(n===void 0)return Zt("GRPC error has no .code"),D.UNKNOWN;switch(n){case Ae.OK:return D.OK;case Ae.CANCELLED:return D.CANCELLED;case Ae.UNKNOWN:return D.UNKNOWN;case Ae.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case Ae.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case Ae.INTERNAL:return D.INTERNAL;case Ae.UNAVAILABLE:return D.UNAVAILABLE;case Ae.UNAUTHENTICATED:return D.UNAUTHENTICATED;case Ae.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case Ae.NOT_FOUND:return D.NOT_FOUND;case Ae.ALREADY_EXISTS:return D.ALREADY_EXISTS;case Ae.PERMISSION_DENIED:return D.PERMISSION_DENIED;case Ae.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case Ae.ABORTED:return D.ABORTED;case Ae.OUT_OF_RANGE:return D.OUT_OF_RANGE;case Ae.UNIMPLEMENTED:return D.UNIMPLEMENTED;case Ae.DATA_LOSS:return D.DATA_LOSS;default:return W(39323,{code:n})}}(ae=Ae||(Ae={}))[ae.OK=0]="OK",ae[ae.CANCELLED=1]="CANCELLED",ae[ae.UNKNOWN=2]="UNKNOWN",ae[ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ae[ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ae[ae.NOT_FOUND=5]="NOT_FOUND",ae[ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",ae[ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",ae[ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",ae[ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ae[ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ae[ae.ABORTED=10]="ABORTED",ae[ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",ae[ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",ae[ae.INTERNAL=13]="INTERNAL",ae[ae.UNAVAILABLE=14]="UNAVAILABLE",ae[ae.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function _S(){return new TextEncoder}/**
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
 */const yS=new vn([4294967295,4294967295],0);function wd(n){const e=_S().encode(n),t=new xm;return t.update(e),new Uint8Array(t.digest())}function Td(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new vn([t,r],0),new vn([i,s],0)]}class ml{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new yi(`Invalid padding: ${t}`);if(r<0)throw new yi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new yi(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new yi(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=vn.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(vn.fromNumber(r)));return i.compare(yS)===1&&(i=new vn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=wd(e),[r,i]=Td(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);if(!this.we(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new ml(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=wd(e),[r,i]=Td(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);this.be(o)}}be(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class yi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Bo{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,ns.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Bo(X.min(),i,new ve(ie),en(),se())}}class ns{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ns(r,t,se(),se(),se())}}/**
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
 */class zs{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=i}}class _p{constructor(e,t){this.targetId=e,this.Ce=t}}class yp{constructor(e,t,r=Be.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Ed{constructor(){this.ve=0,this.Fe=Id(),this.Me=Be.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=se(),t=se(),r=se();return this.Fe.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:W(38017,{changeType:s})}}),new ns(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=Id()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,ue(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class vS{constructor(e){this.Ge=e,this.ze=new Map,this.je=en(),this.He=Ss(),this.Je=Ss(),this.Ze=new ve(ie)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:W(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,i)=>{this.rt(i)&&t(i)})}st(e){const t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(uc(s))if(r===0){const o=new G(s.path);this.et(t,o,He.newNoDocument(o,X.min()))}else ue(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),l=c?this.ct(c,e,o):1;if(l!==0){this.it(t);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,u)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=bn(r).toUint8Array()}catch(l){if(l instanceof zm)return xr("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new ml(o,i,s)}catch(l){return xr(l instanceof yi?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.et(t,s,null),i++)}),i}Tt(e){const t=new Map;this.ze.forEach((s,o)=>{const c=this.ot(o);if(c){if(s.current&&uc(c.target)){const l=new G(c.target.path);this.It(l).has(o)||this.Et(o,l)||this.et(o,l,He.newNoDocument(l,e))}s.Be&&(t.set(o,s.ke()),s.Ke())}});let r=se();this.Je.forEach((s,o)=>{let c=!0;o.forEachWhile(l=>{const u=this.ot(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.je.forEach((s,o)=>o.setReadTime(e));const i=new Bo(e,t,this.Ze,this.je,r);return this.je=en(),this.He=Ss(),this.Je=Ss(),this.Ze=new ve(ie),i}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.qe(t,1):i.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Ed,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new Pe(ie),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new Pe(ie),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||z("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Ed),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Ss(){return new ve(G.comparator)}function Id(){return new ve(G.comparator)}const wS={asc:"ASCENDING",desc:"DESCENDING"},TS={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ES={and:"AND",or:"OR"};class IS{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function fc(n,e){return n.useProto3Json||No(e)?e:{value:e}}function go(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function vp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function bS(n,e){return go(n,e.toTimestamp())}function xt(n){return ue(!!n,49232),X.fromTimestamp(function(t){const r=In(t);return new ge(r.seconds,r.nanos)}(n))}function pl(n,e){return mc(n,e).canonicalString()}function mc(n,e){const t=function(i){return new me(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function wp(n){const e=me.fromString(n);return ue(Ap(e),10190,{key:e.toString()}),e}function pc(n,e){return pl(n.databaseId,e.path)}function Da(n,e){const t=wp(e);if(t.get(1)!==n.databaseId.projectId)throw new B(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new B(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(Ep(t))}function Tp(n,e){return pl(n.databaseId,e)}function AS(n){const e=wp(n);return e.length===4?me.emptyPath():Ep(e)}function gc(n){return new me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ep(n){return ue(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function bd(n,e,t){return{name:pc(n,e),fields:t.value.mapValue.fields}}function SS(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:W(39313,{state:u})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(u,d){return u.useProto3Json?(ue(d===void 0||typeof d=="string",58123),Be.fromBase64String(d||"")):(ue(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Be.fromUint8Array(d||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(u){const d=u.code===void 0?D.UNKNOWN:gp(u.code);return new B(d,u.message||"")}(o);t=new yp(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Da(n,r.document.name),s=xt(r.document.updateTime),o=r.document.createTime?xt(r.document.createTime):X.min(),c=new tt({mapValue:{fields:r.document.fields}}),l=He.newFoundDocument(i,s,o,c),u=r.targetIds||[],d=r.removedTargetIds||[];t=new zs(u,d,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Da(n,r.document),s=r.readTime?xt(r.readTime):X.min(),o=He.newNoDocument(i,s),c=r.removedTargetIds||[];t=new zs([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Da(n,r.document),s=r.removedTargetIds||[];t=new zs([],s,i,null)}else{if(!("filter"in e))return W(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new pS(i,s),c=r.targetId;t=new _p(c,o)}}return t}function RS(n,e){let t;if(e instanceof ts)t={update:bd(n,e.key,e.value)};else if(e instanceof dl)t={delete:pc(n,e.key)};else if(e instanceof kn)t={update:bd(n,e.key,e.data),updateMask:OS(e.fieldMask)};else{if(!(e instanceof dS))return W(16599,{dt:e.type});t={verify:pc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof Ui)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Fi)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Bi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof po)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw W(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:bS(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:W(27497)}(n,e.precondition)),t}function CS(n,e){return n&&n.length>0?(ue(e!==void 0,14353),n.map(t=>function(i,s){let o=i.updateTime?xt(i.updateTime):xt(s);return o.isEqual(X.min())&&(o=xt(s)),new lS(o,i.transformResults||[])}(t,e))):[]}function PS(n,e){return{documents:[Tp(n,e.path)]}}function kS(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Tp(n,i);const s=function(u){if(u.length!==0)return bp(wt.create(u,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(u){if(u.length!==0)return u.map(d=>function(m){return{field:mr(m.field),direction:NS(m.dir)}}(d))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=fc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{ft:t,parent:i}}function xS(n){let e=AS(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ue(r===1,65062);const d=t.from[0];d.allDescendants?i=d.collectionId:e=e.child(d.collectionId)}let s=[];t.where&&(s=function(p){const m=Ip(p);return m instanceof wt&&Zm(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(A){return new Li(pr(A.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(A.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(p){let m;return m=typeof p=="object"?p.value:p,No(m)?null:m}(t.limit));let l=null;t.startAt&&(l=function(p){const m=!!p.before,_=p.values||[];return new mo(_,m)}(t.startAt));let u=null;return t.endAt&&(u=function(p){const m=!p.before,_=p.values||[];return new mo(_,m)}(t.endAt)),WA(e,i,o,s,c,"F",l,u)}function DS(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ip(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=pr(t.unaryFilter.field);return Se.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=pr(t.unaryFilter.field);return Se.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=pr(t.unaryFilter.field);return Se.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=pr(t.unaryFilter.field);return Se.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return W(61313);default:return W(60726)}}(n):n.fieldFilter!==void 0?function(t){return Se.create(pr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return W(58110);default:return W(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return wt.create(t.compositeFilter.filters.map(r=>Ip(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return W(1026)}}(t.compositeFilter.op))}(n):W(30097,{filter:n})}function NS(n){return wS[n]}function MS(n){return TS[n]}function VS(n){return ES[n]}function mr(n){return{fieldPath:n.canonicalString()}}function pr(n){return Fe.fromServerFormat(n.fieldPath)}function bp(n){return n instanceof Se?function(t){if(t.op==="=="){if(hd(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NAN"}};if(ud(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(hd(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NOT_NAN"}};if(ud(t.value))return{unaryFilter:{field:mr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:mr(t.field),op:MS(t.op),value:t.value}}}(n):n instanceof wt?function(t){const r=t.getFilters().map(i=>bp(i));return r.length===1?r[0]:{compositeFilter:{op:VS(t.op),filters:r}}}(n):W(54877,{filter:n})}function OS(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ap(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Sp(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class gn{constructor(e,t,r,i,s=X.min(),o=X.min(),c=Be.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new gn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new gn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new gn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new gn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class LS{constructor(e){this.yt=e}}function US(n){const e=xS({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?dc(e,e.limit,"L"):e}/**
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
 */class FS{constructor(){this.Sn=new BS}addToCollectionParentIndex(e,t){return this.Sn.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(En.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(En.min())}updateCollectionGroup(e,t,r){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}}class BS{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Pe(me.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Pe(me.comparator)).toArray()}}/**
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
 */const Ad={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Rp=41943040;class et{static withCacheSize(e){return new et(e,et.DEFAULT_COLLECTION_PERCENTILE,et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */et.DEFAULT_COLLECTION_PERCENTILE=10,et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,et.DEFAULT=new et(Rp,et.DEFAULT_COLLECTION_PERCENTILE,et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),et.DISABLED=new et(-1,0,0);/**
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
 */class Vr{constructor(e){this.sr=e}next(){return this.sr+=2,this.sr}static _r(){return new Vr(0)}static ar(){return new Vr(-1)}}/**
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
 */const Sd="LruGarbageCollector",$S=1048576;function Rd([n,e],[t,r]){const i=ie(n,t);return i===0?ie(e,r):i}class qS{constructor(e){this.Pr=e,this.buffer=new Pe(Rd),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Rd(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class zS{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){z(Sd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){$r(t)?z(Sd,"Ignoring IndexedDB error during garbage collection: ",t):await Br(t)}await this.Ar(3e5)})}}class HS{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Do.ce);const r=new qS(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.mr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(z("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(Ad)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(z("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ad):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,i,s,o,c,l,u;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(z("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(s=p,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(u=Date.now(),dr()<=re.DEBUG&&z("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(u-l)+`ms
Total Duration: ${u-d}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function jS(n,e){return new HS(n,e)}/**
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
 */class GS{constructor(){this.changes=new sr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,He.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?N.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class WS{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class KS{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Ai(r.mutation,i,st.empty(),ge.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,t,r=se()){const i=$n();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=_i();return s.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=$n();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,se()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=en();const o=bi(),c=function(){return bi()}();return t.forEach((l,u)=>{const d=r.get(u.key);i.has(u.key)&&(d===void 0||d.mutation instanceof kn)?s=s.insert(u.key,u):d!==void 0?(o.set(u.key,d.mutation.getFieldMask()),Ai(d.mutation,u,d.mutation.getFieldMask(),ge.now())):o.set(u.key,st.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((u,d)=>o.set(u,d)),t.forEach((u,d)=>c.set(u,new WS(d,o.get(u)??null))),c))}recalculateAndSaveOverlays(e,t){const r=bi();let i=new ve((o,c)=>o-c),s=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const u=t.get(l);if(u===null)return;let d=r.get(l)||st.empty();d=c.applyToLocalView(u,d),r.set(l,d);const p=(i.get(c.batchId)||se()).add(l);i=i.insert(c.batchId,p)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,d=l.value,p=cp();d.forEach(m=>{if(!s.has(m)){const _=mp(t.get(m),r.get(m));_!==null&&p.set(m,_),s=s.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,p))}return N.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return KA(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):rp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):N.resolve($n());let c=Ni,l=s;return o.next(u=>N.forEach(u,(d,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),s.get(d)?N.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{l=l.insert(d,m)}))).next(()=>this.populateOverlays(e,u,s)).next(()=>this.computeViews(e,l,u,se())).next(d=>({batchId:c,changes:ap(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(r=>{let i=_i();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=_i();return this.indexManager.getCollectionParents(e,s).next(c=>N.forEach(c,l=>{const u=function(p,m){return new qr(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,r,i).next(d=>{d.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,u)=>{const d=u.getKey();o.get(d)===null&&(o=o.insert(d,He.newInvalidDocument(d)))});let c=_i();return o.forEach((l,u)=>{const d=s.get(l);d!==void 0&&Ai(d.mutation,u,st.empty(),ge.now()),Lo(t,u)&&(c=c.insert(l,u))}),c})}}/**
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
 */class YS{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return N.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:xt(i.createTime)}}(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(i){return{name:i.name,query:US(i.bundledQuery),readTime:xt(i.readTime)}}(t)),N.resolve()}}/**
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
 */class QS{constructor(){this.overlays=new ve(G.comparator),this.Lr=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){const r=$n();return N.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.bt(e,t,s)}),N.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Lr.delete(r)),N.resolve()}getOverlaysForCollection(e,t,r){const i=$n(),s=t.length+1,o=new G(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return N.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ve((u,d)=>u-d);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>r){let d=s.get(u.largestBatchId);d===null&&(d=$n(),s=s.insert(u.largestBatchId,d)),d.set(u.getKey(),u)}}const c=$n(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((u,d)=>c.set(u,d)),!(c.size()>=i)););return N.resolve(c)}bt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new mS(t,r));let s=this.Lr.get(t);s===void 0&&(s=se(),this.Lr.set(t,s)),this.Lr.set(t,s.add(r.key))}}/**
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
 */class XS{constructor(){this.sessionToken=Be.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,N.resolve()}}/**
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
 */class gl{constructor(){this.kr=new Pe(Ne.Kr),this.qr=new Pe(Ne.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Ne(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new Ne(e,t))}Qr(e,t){e.forEach(r=>this.removeReference(r,t))}Gr(e){const t=new G(new me([])),r=new Ne(t,e),i=new Ne(t,e+1),s=[];return this.qr.forEachInRange([r,i],o=>{this.Wr(o),s.push(o.key)}),s}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new G(new me([])),r=new Ne(t,e),i=new Ne(t,e+1);let s=se();return this.qr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Ne(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ne{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return G.comparator(e.key,t.key)||ie(e.Hr,t.Hr)}static Ur(e,t){return ie(e.Hr,t.Hr)||G.comparator(e.key,t.key)}}/**
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
 */class JS{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new Pe(Ne.Kr)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new fS(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.Jr=this.Jr.add(new Ne(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return N.resolve(o)}lookupMutationBatch(e,t){return N.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return N.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?ol:this.Yn-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ne(t,0),i=new Ne(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([r,i],o=>{const c=this.Zr(o.Hr);s.push(c)}),N.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Pe(ie);return t.forEach(i=>{const s=new Ne(i,0),o=new Ne(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,o],c=>{r=r.add(c.Hr)})}),N.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const o=new Ne(new G(s),0);let c=new Pe(ie);return this.Jr.forEachWhile(l=>{const u=l.key.path;return!!r.isPrefixOf(u)&&(u.length===i&&(c=c.add(l.Hr)),!0)},o),N.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ue(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return N.forEach(t.mutations,i=>{const s=new Ne(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Jr=r})}nr(e){}containsKey(e,t){const r=new Ne(t,0),i=this.Jr.firstAfterOrEqual(r);return N.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class ZS{constructor(e){this.ti=e,this.docs=function(){return new ve(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return N.resolve(r?r.document.mutableCopy():He.newInvalidDocument(t))}getEntries(e,t){let r=en();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():He.newInvalidDocument(i))}),N.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=en();const o=t.path,c=new G(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:d}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||bA(IA(d),r)<=0||(i.has(d.key)||Lo(t,d))&&(s=s.insert(d.key,d.mutableCopy()))}return N.resolve(s)}getAllFromCollectionGroup(e,t,r,i){W(9500)}ni(e,t){return N.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new eR(this)}getSize(e){return N.resolve(this.size)}}class eR extends GS{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)}),N.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
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
 */class tR{constructor(e){this.persistence=e,this.ri=new sr(t=>ll(t),ul),this.lastRemoteSnapshotVersion=X.min(),this.highestTargetId=0,this.ii=0,this.si=new gl,this.targetCount=0,this.oi=Vr._r()}forEachTarget(e,t){return this.ri.forEach((r,i)=>t(i)),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),N.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Vr(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.lr(t),N.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ri.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),N.waitFor(s).next(()=>i)}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return N.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),N.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),N.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),N.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return N.resolve(r)}containsKey(e,t){return N.resolve(this.si.containsKey(t))}}/**
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
 */class Cp{constructor(e,t){this._i={},this.overlays={},this.ai=new Do(0),this.ui=!1,this.ui=!0,this.ci=new XS,this.referenceDelegate=e(this),this.li=new tR(this),this.indexManager=new FS,this.remoteDocumentCache=function(i){return new ZS(i)}(r=>this.referenceDelegate.hi(r)),this.serializer=new LS(t),this.Pi=new YS(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new QS,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new JS(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){z("MemoryPersistence","Starting transaction:",e);const i=new nR(this.ai.next());return this.referenceDelegate.Ti(),r(i).next(s=>this.referenceDelegate.Ii(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return N.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}}class nR extends SA{constructor(e){super(),this.currentSequenceNumber=e}}class _l{constructor(e){this.persistence=e,this.Ri=new gl,this.Ai=null}static Vi(e){return new _l(e)}get di(){if(this.Ai)return this.Ai;throw W(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),N.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),N.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(i=>this.di.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.di.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.di,r=>{const i=G.fromPath(r);return this.mi(e,i).next(s=>{s||t.removeEntry(i,X.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return N.or([()=>N.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class _o{constructor(e,t){this.persistence=e,this.fi=new sr(r=>PA(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=jS(this,t)}static Vi(e,t){return new _o(e,t)}Ti(){}Ii(e){return N.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}mr(e,t){return N.forEach(this.fi,(r,i)=>this.wr(e,r,i).next(s=>s?N.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,o=>this.wr(e,o,t).next(c=>{c||(r++,s.removeEntry(o,X.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),N.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),N.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),N.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Bs(e.data.value)),t}wr(e,t,r){return N.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.fi.get(t);return N.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class yl{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=i}static Es(e,t){let r=se(),i=se();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new yl(e,t.fromCache,r,i)}}/**
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
 */class rR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class iR{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return j0()?8:RA(Ge())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.gs(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ps(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new rR;return this.ys(e,t,o).next(c=>{if(s.result=c,this.As)return this.ws(e,t,o,c.size)})}).next(()=>s.result)}ws(e,t,r,i){return r.documentReadCount<this.Vs?(dr()<=re.DEBUG&&z("QueryEngine","SDK will not create cache indexes for query:",fr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),N.resolve()):(dr()<=re.DEBUG&&z("QueryEngine","Query:",fr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(dr()<=re.DEBUG&&z("QueryEngine","The SDK decides to create cache indexes for query:",fr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,kt(t))):N.resolve())}gs(e,t){if(pd(t))return N.resolve(null);let r=kt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=dc(t,null,"F"),r=kt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=se(...s);return this.fs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const u=this.bs(t,c);return this.Ss(t,u,o,l.readTime)?this.gs(e,dc(t,null,"F")):this.Ds(e,u,t,l)}))})))}ps(e,t,r,i){return pd(t)||i.isEqual(X.min())?N.resolve(null):this.fs.getDocuments(e,r).next(s=>{const o=this.bs(t,s);return this.Ss(t,o,r,i)?N.resolve(null):(dr()<=re.DEBUG&&z("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),fr(t)),this.Ds(e,o,t,EA(i,Ni)).next(c=>c))})}bs(e,t){let r=new Pe(sp(e));return t.forEach((i,s)=>{Lo(e,s)&&(r=r.add(s))}),r}Ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,t,r){return dr()<=re.DEBUG&&z("QueryEngine","Using full collection scan to execute query:",fr(t)),this.fs.getDocumentsMatchingQuery(e,t,En.min(),r)}Ds(e,t,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
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
 */const vl="LocalStore",sR=3e8;class oR{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new ve(ie),this.Fs=new sr(s=>ll(s),ul),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new KS(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function aR(n,e,t,r){return new oR(n,e,t,r)}async function Pp(n,e){const t=J(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Os(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let l=se();for(const u of i){o.push(u.batchId);for(const d of u.mutations)l=l.add(d.key)}for(const u of s){c.push(u.batchId);for(const d of u.mutations)l=l.add(d.key)}return t.localDocuments.getDocuments(r,l).next(u=>({Ns:u,removedBatchIds:o,addedBatchIds:c}))})})}function cR(n,e){const t=J(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return function(c,l,u,d){const p=u.batch,m=p.keys();let _=N.resolve();return m.forEach(A=>{_=_.next(()=>d.getEntry(l,A)).next(k=>{const x=u.docVersions.get(A);ue(x!==null,48541),k.version.compareTo(x)<0&&(p.applyToRemoteDocument(k,u),k.isValidDocument()&&(k.setReadTime(u.commitVersion),d.addEntry(k)))})}),_.next(()=>c.mutationQueue.removeMutationBatch(l,p))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=se();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function kp(n){const e=J(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function lR(n,e){const t=J(n),r=e.snapshotVersion;let i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;const c=[];e.targetChanges.forEach((d,p)=>{const m=i.get(p);if(!m)return;c.push(t.li.removeMatchingKeys(s,d.removedDocuments,p).next(()=>t.li.addMatchingKeys(s,d.addedDocuments,p)));let _=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?_=_.withResumeToken(Be.EMPTY_BYTE_STRING,X.min()).withLastLimboFreeSnapshotVersion(X.min()):d.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(d.resumeToken,r)),i=i.insert(p,_),function(k,x,C){return k.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=sR?!0:C.addedDocuments.size+C.modifiedDocuments.size+C.removedDocuments.size>0}(m,_,d)&&c.push(t.li.updateTargetData(s,_))});let l=en(),u=se();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,d))}),c.push(uR(s,o,e.documentUpdates).next(d=>{l=d.Bs,u=d.Ls})),!r.isEqual(X.min())){const d=t.li.getLastRemoteSnapshotVersion(s).next(p=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(d)}return N.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,u)).next(()=>l)}).then(s=>(t.vs=i,s))}function uR(n,e,t){let r=se(),i=se();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=en();return t.forEach((c,l)=>{const u=s.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(X.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):z(vl,"Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)}),{Bs:o,Ls:i}})}function hR(n,e){const t=J(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=ol),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function dR(n,e){const t=J(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.li.getTargetData(r,e).next(s=>s?(i=s,N.resolve(i)):t.li.allocateTargetId(r).next(o=>(i=new gn(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r})}async function _c(n,e,t){const r=J(n),i=r.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!$r(o))throw o;z(vl,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function Cd(n,e,t){const r=J(n);let i=X.min(),s=se();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,u,d){const p=J(l),m=p.Fs.get(d);return m!==void 0?N.resolve(p.vs.get(m)):p.li.getTargetData(u,d)}(r,o,kt(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next(l=>{s=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,t?i:X.min(),t?s:se())).next(c=>(fR(r,XA(e),c),{documents:c,ks:s})))}function fR(n,e,t){let r=n.Ms.get(e)||X.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Ms.set(e,r)}class Pd{constructor(){this.activeTargetIds=rS()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class mR{constructor(){this.vo=new Pd,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Pd,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class pR{Mo(e){}shutdown(){}}/**
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
 */const kd="ConnectivityMonitor";class xd{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){z(kd,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){z(kd,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Rs=null;function yc(){return Rs===null?Rs=function(){return 268435456+Math.round(2147483648*Math.random())}():Rs++,"0x"+Rs.toString(16)}/**
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
 */const Na="RestConnection",gR={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class _R{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===ho?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const o=yc(),c=this.Qo(e,t.toUriEncodedString());z(Na,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(l,i,s);const{host:u}=new URL(c),d=Cn(u);return this.zo(e,c,l,r,d).then(p=>(z(Na,`Received RPC '${e}' ${o}: `,p),p),p=>{throw xr(Na,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p})}jo(e,t,r,i,s,o){return this.Wo(e,t,r,i,s)}Go(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Qo(e,t){const r=gR[e];let i=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
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
 */class yR{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const qe="WebChannelConnection",di=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(i){setTimeout(()=>{throw i},0)}})};class Ir extends _R{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Ir.c_){const e=Vm();di(e,Mm.STAT_EVENT,t=>{t.stat===sc.PROXY?z(qe,"STAT_EVENT: detected buffering proxy"):t.stat===sc.NOPROXY&&z(qe,"STAT_EVENT: detected no buffering proxy")}),Ir.c_=!0}}zo(e,t,r,i,s){const o=yc();return new Promise((c,l)=>{const u=new Dm;u.setWithCredentials(!0),u.listenOnce(Nm.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Fs.NO_ERROR:const p=u.getResponseJson();z(qe,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case Fs.TIMEOUT:z(qe,`RPC '${e}' ${o} timed out`),l(new B(D.DEADLINE_EXCEEDED,"Request time out"));break;case Fs.HTTP_ERROR:const m=u.getStatus();if(z(qe,`RPC '${e}' ${o} failed with status:`,m,"response text:",u.getResponseText()),m>0){let _=u.getResponseJson();Array.isArray(_)&&(_=_[0]);const A=_==null?void 0:_.error;if(A&&A.status&&A.message){const k=function(C){const M=C.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(M)>=0?M:D.UNKNOWN}(A.status);l(new B(k,A.message))}else l(new B(D.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new B(D.UNAVAILABLE,"Connection failed."));break;default:W(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{z(qe,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(i);z(qe,`RPC '${e}' ${o} sending request:`,i),u.send(t,"POST",d,r,15)})}T_(e,t,r){const i=yc(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const u=s.join("");z(qe,`Creating RPC '${e}' stream ${i}: ${u}`,c);const d=o.createWebChannel(u,c);this.I_(d);let p=!1,m=!1;const _=new yR({Ho:A=>{m?z(qe,`Not sending because RPC '${e}' stream ${i} is closed:`,A):(p||(z(qe,`Opening RPC '${e}' stream ${i} transport.`),d.open(),p=!0),z(qe,`RPC '${e}' stream ${i} sending:`,A),d.send(A))},Jo:()=>d.close()});return di(d,gi.EventType.OPEN,()=>{m||(z(qe,`RPC '${e}' stream ${i} transport opened.`),_.i_())}),di(d,gi.EventType.CLOSE,()=>{m||(m=!0,z(qe,`RPC '${e}' stream ${i} transport closed`),_.o_(),this.E_(d))}),di(d,gi.EventType.ERROR,A=>{m||(m=!0,xr(qe,`RPC '${e}' stream ${i} transport errored. Name:`,A.name,"Message:",A.message),_.o_(new B(D.UNAVAILABLE,"The operation could not be completed")))}),di(d,gi.EventType.MESSAGE,A=>{var k;if(!m){const x=A.data[0];ue(!!x,16349);const C=x,M=(C==null?void 0:C.error)||((k=C[0])==null?void 0:k.error);if(M){z(qe,`RPC '${e}' stream ${i} received error:`,M);const F=M.status;let $=function(T){const y=Ae[T];if(y!==void 0)return gp(y)}(F),K=M.message;$===void 0&&($=D.INTERNAL,K="Unknown error status: "+F+" with message "+M.message),m=!0,_.o_(new B($,K)),d.close()}else z(qe,`RPC '${e}' stream ${i} received:`,x),_.__(x)}}),Ir.u_(),setTimeout(()=>{_.s_()},0),_}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Om()}}/**
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
 */function vR(n){return new Ir(n)}function Ma(){return typeof document<"u"?document:null}/**
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
 */function $o(n){return new IS(n,!0)}/**
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
 */Ir.c_=!1;class xp{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&z("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const Dd="PersistentStream";class Dp{constructor(e,t,r,i,s,o,c,l){this.Ci=e,this.b_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new xp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(Zt(t.toString()),Zt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.D_===t&&this.G_(r,i)},r=>{e(()=>{const i=new B(D.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)})})}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(i=>{r(()=>this.z_(i))}),this.stream.onMessage(i=>{r(()=>++this.F_==1?this.H_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return z(Dd,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(z(Dd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class wR extends Dp{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=SS(this.serializer,e),r=function(s){if(!("targetChange"in s))return X.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?X.min():o.readTime?xt(o.readTime):X.min()}(e);return this.listener.J_(t,r)}Z_(e){const t={};t.database=gc(this.serializer),t.addTarget=function(s,o){let c;const l=o.target;if(c=uc(l)?{documents:PS(s,l)}:{query:kS(s,l).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=vp(s,o.resumeToken);const u=fc(s,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(X.min())>0){c.readTime=go(s,o.snapshotVersion.toTimestamp());const u=fc(s,o.expectedCount);u!==null&&(c.expectedCount=u)}return c}(this.serializer,e);const r=DS(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=gc(this.serializer),t.removeTarget=e,this.K_(t)}}class TR extends Dp{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return ue(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ue(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ue(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=CS(e.writeResults,e.commitTime),r=xt(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=gc(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>RS(this.serializer,r))};this.K_(t)}}/**
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
 */class ER{}class IR extends ER{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new B(D.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Wo(e,mc(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new B(D.UNKNOWN,s.toString())})}jo(e,t,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.jo(e,mc(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new B(D.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function bR(n,e,t,r){return new IR(n,e,t,r)}class AR{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Zt(t),this.aa=!1):z("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
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
 */const er="RemoteStore";class SR{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo(o=>{r.enqueueAndForget(async()=>{or(this)&&(z(er,"Restarting streams for network reachability change."),await async function(l){const u=J(l);u.Ea.add(4),await rs(u),u.Va.set("Unknown"),u.Ea.delete(4),await qo(u)}(this))})}),this.Va=new AR(r,i)}}async function qo(n){if(or(n))for(const e of n.Ra)await e(!0)}async function rs(n){for(const e of n.Ra)await e(!1)}function Np(n,e){const t=J(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Il(t)?El(t):zr(t).O_()&&Tl(t,e))}function wl(n,e){const t=J(n),r=zr(t);t.Ia.delete(e),r.O_()&&Mp(t,e),t.Ia.size===0&&(r.O_()?r.L_():or(t)&&t.Va.set("Unknown"))}function Tl(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(X.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}zr(n).Z_(e)}function Mp(n,e){n.da.$e(e),zr(n).X_(e)}function El(n){n.da=new vS({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),zr(n).start(),n.Va.ua()}function Il(n){return or(n)&&!zr(n).x_()&&n.Ia.size>0}function or(n){return J(n).Ea.size===0}function Vp(n){n.da=void 0}async function RR(n){n.Va.set("Online")}async function CR(n){n.Ia.forEach((e,t)=>{Tl(n,e)})}async function PR(n,e){Vp(n),Il(n)?(n.Va.ha(e),El(n)):n.Va.set("Unknown")}async function kR(n,e,t){if(n.Va.set("Online"),e instanceof yp&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.Ia.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.Ia.delete(c),i.da.removeTarget(c))}(n,e)}catch(r){z(er,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await yo(n,r)}else if(e instanceof zs?n.da.Xe(e):e instanceof _p?n.da.st(e):n.da.tt(e),!t.isEqual(X.min()))try{const r=await kp(n.localStore);t.compareTo(r)>=0&&await function(s,o){const c=s.da.Tt(o);return c.targetChanges.forEach((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const d=s.Ia.get(u);d&&s.Ia.set(u,d.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,u)=>{const d=s.Ia.get(l);if(!d)return;s.Ia.set(l,d.withResumeToken(Be.EMPTY_BYTE_STRING,d.snapshotVersion)),Mp(s,l);const p=new gn(d.target,l,u,d.sequenceNumber);Tl(s,p)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){z(er,"Failed to raise snapshot:",r),await yo(n,r)}}async function yo(n,e,t){if(!$r(e))throw e;n.Ea.add(1),await rs(n),n.Va.set("Offline"),t||(t=()=>kp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{z(er,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await qo(n)})}function Op(n,e){return e().catch(t=>yo(n,t,e))}async function zo(n){const e=J(n),t=Sn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ol;for(;xR(e);)try{const i=await hR(e.localStore,r);if(i===null){e.Ta.length===0&&t.L_();break}r=i.batchId,DR(e,i)}catch(i){await yo(e,i)}Lp(e)&&Up(e)}function xR(n){return or(n)&&n.Ta.length<10}function DR(n,e){n.Ta.push(e);const t=Sn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function Lp(n){return or(n)&&!Sn(n).x_()&&n.Ta.length>0}function Up(n){Sn(n).start()}async function NR(n){Sn(n).ra()}async function MR(n){const e=Sn(n);for(const t of n.Ta)e.ea(t.mutations)}async function VR(n,e,t){const r=n.Ta.shift(),i=fl.from(r,e,t);await Op(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await zo(n)}async function OR(n,e){e&&Sn(n).Y_&&await async function(r,i){if(function(o){return gS(o)&&o!==D.ABORTED}(i.code)){const s=r.Ta.shift();Sn(r).B_(),await Op(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await zo(r)}}(n,e),Lp(n)&&Up(n)}async function Nd(n,e){const t=J(n);t.asyncQueue.verifyOperationInProgress(),z(er,"RemoteStore received new credentials");const r=or(t);t.Ea.add(3),await rs(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await qo(t)}async function LR(n,e){const t=J(n);e?(t.Ea.delete(2),await qo(t)):e||(t.Ea.add(2),await rs(t),t.Va.set("Unknown"))}function zr(n){return n.ma||(n.ma=function(t,r,i){const s=J(t);return s.sa(),new wR(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:RR.bind(null,n),Yo:CR.bind(null,n),t_:PR.bind(null,n),J_:kR.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),Il(n)?El(n):n.Va.set("Unknown")):(await n.ma.stop(),Vp(n))})),n.ma}function Sn(n){return n.fa||(n.fa=function(t,r,i){const s=J(t);return s.sa(),new TR(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:NR.bind(null,n),t_:OR.bind(null,n),ta:MR.bind(null,n),na:VR.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await zo(n)):(await n.fa.stop(),n.Ta.length>0&&(z(er,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class bl{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new bl(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Al(n,e){if(Zt("AsyncQueue",`${e}: ${n}`),$r(n))return new B(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class br{static emptySet(e){return new br(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||G.comparator(t.key,r.key):(t,r)=>G.comparator(t.key,r.key),this.keyedMap=_i(),this.sortedSet=new ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof br)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new br;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Md{constructor(){this.ga=new ve(G.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):W(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Or{constructor(e,t,r,i,s,o,c,l,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Or(e,t,br.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Oo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class UR{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(e=>e.Da())}}class FR{constructor(){this.queries=Vd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const i=J(t),s=i.queries;i.queries=Vd(),s.forEach((o,c)=>{for(const l of c.ba)l.onError(r)})})(this,new B(D.ABORTED,"Firestore shutting down"))}}function Vd(){return new sr(n=>ip(n),Oo)}async function Sl(n,e){const t=J(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.Da()&&(r=2):(s=new UR,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=Al(o,`Initialization of query '${fr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&Cl(t)}async function Rl(n,e){const t=J(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.ba.indexOf(e);o>=0&&(s.ba.splice(o,1),s.ba.length===0?i=e.Da()?0:1:!s.Sa()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function BR(n,e){const t=J(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.ba)c.Fa(i)&&(r=!0);o.wa=i}}r&&Cl(t)}function $R(n,e,t){const r=J(n),i=r.queries.get(e);if(i)for(const s of i.ba)s.onError(t);r.queries.delete(e)}function Cl(n){n.Ca.forEach(e=>{e.next()})}var vc,Od;(Od=vc||(vc={})).Ma="default",Od.Cache="cache";class Pl{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Or(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.Ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Or.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==vc.Cache}}/**
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
 */class Fp{constructor(e){this.key=e}}class Bp{constructor(e){this.key=e}}class qR{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=se(),this.mutatedKeys=se(),this.eu=sp(e),this.tu=new br(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new Md,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((d,p)=>{const m=i.get(d),_=Lo(this.query,p)?p:null,A=!!m&&this.mutatedKeys.has(m.key),k=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let x=!1;m&&_?m.data.isEqual(_.data)?A!==k&&(r.track({type:3,doc:_}),x=!0):this.su(m,_)||(r.track({type:2,doc:_}),x=!0,(l&&this.eu(_,l)>0||u&&this.eu(_,u)<0)&&(c=!0)):!m&&_?(r.track({type:0,doc:_}),x=!0):m&&!_&&(r.track({type:1,doc:m}),x=!0,(l||u)&&(c=!0)),x&&(_?(o=o.add(_),s=k?s.add(d):s.delete(d)):(o=o.delete(d),s=s.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),s=s.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Ss:c,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((d,p)=>function(_,A){const k=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W(20277,{Vt:x})}};return k(_)-k(A)}(d.type,p.type)||this.eu(d.doc,p.doc)),this.ou(r),i=i??!1;const c=t&&!i?this._u():[],l=this.Ya.size===0&&this.current&&!i?1:0,u=l!==this.Xa;return this.Xa=l,o.length!==0||u?{snapshot:new Or(this.query,e.tu,s,o,e.mutatedKeys,l===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Md,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=se(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const t=[];return e.forEach(r=>{this.Ya.has(r)||t.push(new Bp(r))}),this.Ya.forEach(r=>{e.has(r)||t.push(new Fp(r))}),t}cu(e){this.Za=e.ks,this.Ya=se();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Or.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const kl="SyncEngine";class zR{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class HR{constructor(e){this.key=e,this.hu=!1}}class jR{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new sr(c=>ip(c),Oo),this.Iu=new Map,this.Eu=new Set,this.Ru=new ve(G.comparator),this.Au=new Map,this.Vu=new gl,this.du={},this.mu=new Map,this.fu=Vr.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function GR(n,e,t=!0){const r=Gp(n);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await $p(r,e,t,!0),i}async function WR(n,e){const t=Gp(n);await $p(t,e,!0,!1)}async function $p(n,e,t,r){const i=await dR(n.localStore,kt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await KR(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Np(n.remoteStore,i),c}async function KR(n,e,t,r,i){n.pu=(p,m,_)=>async function(k,x,C,M){let F=x.view.ru(C);F.Ss&&(F=await Cd(k.localStore,x.query,!1).then(({documents:T})=>x.view.ru(T,F)));const $=M&&M.targetChanges.get(x.targetId),K=M&&M.targetMismatches.get(x.targetId)!=null,L=x.view.applyChanges(F,k.isPrimaryClient,$,K);return Ud(k,x.targetId,L.au),L.snapshot}(n,p,m,_);const s=await Cd(n.localStore,e,!0),o=new qR(e,s.ks),c=o.ru(s.documents),l=ns.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),u=o.applyChanges(c,n.isPrimaryClient,l);Ud(n,t,u.au);const d=new zR(e,t,o);return n.Tu.set(e,d),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),u.snapshot}async function YR(n,e,t){const r=J(n),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter(o=>!Oo(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await _c(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&wl(r.remoteStore,i.targetId),wc(r,i.targetId)}).catch(Br)):(wc(r,i.targetId),await _c(r.localStore,i.targetId,!0))}async function QR(n,e){const t=J(n),r=t.Tu.get(e),i=t.Iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),wl(t.remoteStore,r.targetId))}async function XR(n,e,t){const r=i1(n);try{const i=await function(o,c){const l=J(o),u=ge.now(),d=c.reduce((_,A)=>_.add(A.key),se());let p,m;return l.persistence.runTransaction("Locally write mutations","readwrite",_=>{let A=en(),k=se();return l.xs.getEntries(_,d).next(x=>{A=x,A.forEach((C,M)=>{M.isValidDocument()||(k=k.add(C))})}).next(()=>l.localDocuments.getOverlayedDocuments(_,A)).next(x=>{p=x;const C=[];for(const M of c){const F=hS(M,p.get(M.key).overlayedDocument);F!=null&&C.push(new kn(M.key,F,Qm(F.value.mapValue),ht.exists(!0)))}return l.mutationQueue.addMutationBatch(_,u,C,c)}).next(x=>{m=x;const C=x.applyToLocalDocumentSet(p,k);return l.documentOverlayCache.saveOverlays(_,x.batchId,C)})}).then(()=>({batchId:m.batchId,changes:ap(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let u=o.du[o.currentUser.toKey()];u||(u=new ve(ie)),u=u.insert(c,l),o.du[o.currentUser.toKey()]=u}(r,i.batchId,t),await is(r,i.changes),await zo(r.remoteStore)}catch(i){const s=Al(i,"Failed to persist write");t.reject(s)}}async function qp(n,e){const t=J(n);try{const r=await lR(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Au.get(s);o&&(ue(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.hu=!0:i.modifiedDocuments.size>0?ue(o.hu,14607):i.removedDocuments.size>0&&(ue(o.hu,42227),o.hu=!1))}),await is(t,r,e)}catch(r){await Br(r)}}function Ld(n,e,t){const r=J(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Tu.forEach((s,o)=>{const c=o.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const l=J(o);l.onlineState=c;let u=!1;l.queries.forEach((d,p)=>{for(const m of p.ba)m.va(c)&&(u=!0)}),u&&Cl(l)}(r.eventManager,e),i.length&&r.Pu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function JR(n,e,t){const r=J(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Au.get(e),s=i&&i.key;if(s){let o=new ve(G.comparator);o=o.insert(s,He.newNoDocument(s,X.min()));const c=se().add(s),l=new Bo(X.min(),new Map,new ve(ie),o,c);await qp(r,l),r.Ru=r.Ru.remove(s),r.Au.delete(e),xl(r)}else await _c(r.localStore,e,!1).then(()=>wc(r,e,t)).catch(Br)}async function ZR(n,e){const t=J(n),r=e.batch.batchId;try{const i=await cR(t.localStore,e);Hp(t,r,null),zp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await is(t,i)}catch(i){await Br(i)}}async function e1(n,e,t){const r=J(n);try{const i=await function(o,c){const l=J(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let d;return l.mutationQueue.lookupMutationBatch(u,c).next(p=>(ue(p!==null,37113),d=p.keys(),l.mutationQueue.removeMutationBatch(u,p))).next(()=>l.mutationQueue.performConsistencyCheck(u)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(u,d,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d)).next(()=>l.localDocuments.getDocuments(u,d))})}(r.localStore,e);Hp(r,e,t),zp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await is(r,i)}catch(i){await Br(i)}}function zp(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function Hp(n,e,t){const r=J(n);let i=r.du[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.du[r.currentUser.toKey()]=i}}function wc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(r=>{n.Vu.containsKey(r)||jp(n,r)})}function jp(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(wl(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),xl(n))}function Ud(n,e,t){for(const r of t)r instanceof Fp?(n.Vu.addReference(r.key,e),t1(n,r)):r instanceof Bp?(z(kl,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||jp(n,r.key)):W(19791,{wu:r})}function t1(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(r)||(z(kl,"New document in limbo: "+t),n.Eu.add(r),xl(n))}function xl(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new G(me.fromString(e)),r=n.fu.next();n.Au.set(r,new HR(t)),n.Ru=n.Ru.insert(t,r),Np(n.remoteStore,new gn(kt(Vo(t.path)),r,"TargetPurposeLimboResolution",Do.ce))}}async function is(n,e,t){const r=J(n),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((c,l)=>{o.push(r.pu(l,e,t).then(u=>{var d;if((u||t)&&r.isPrimaryClient){const p=u?!u.fromCache:(d=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(l.targetId,p?"current":"not-current")}if(u){i.push(u);const p=yl.Es(l.targetId,u);s.push(p)}}))}),await Promise.all(o),r.Pu.J_(i),await async function(l,u){const d=J(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>N.forEach(u,m=>N.forEach(m.Ts,_=>d.persistence.referenceDelegate.addReference(p,m.targetId,_)).next(()=>N.forEach(m.Is,_=>d.persistence.referenceDelegate.removeReference(p,m.targetId,_)))))}catch(p){if(!$r(p))throw p;z(vl,"Failed to update sequence numbers: "+p)}for(const p of u){const m=p.targetId;if(!p.fromCache){const _=d.vs.get(m),A=_.snapshotVersion,k=_.withLastLimboFreeSnapshotVersion(A);d.vs=d.vs.insert(m,k)}}}(r.localStore,s))}async function n1(n,e){const t=J(n);if(!t.currentUser.isEqual(e)){z(kl,"User change. New user:",e.toKey());const r=await Pp(t.localStore,e);t.currentUser=e,function(s,o){s.mu.forEach(c=>{c.forEach(l=>{l.reject(new B(D.CANCELLED,o))})}),s.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await is(t,r.Ns)}}function r1(n,e){const t=J(n),r=t.Au.get(e);if(r&&r.hu)return se().add(r.key);{let i=se();const s=t.Iu.get(e);if(!s)return i;for(const o of s){const c=t.Tu.get(o);i=i.unionWith(c.view.nu)}return i}}function Gp(n){const e=J(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=qp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=r1.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=JR.bind(null,e),e.Pu.J_=BR.bind(null,e.eventManager),e.Pu.yu=$R.bind(null,e.eventManager),e}function i1(n){const e=J(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ZR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=e1.bind(null,e),e}class vo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=$o(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return aR(this.persistence,new iR,e.initialUser,this.serializer)}Cu(e){return new Cp(_l.Vi,this.serializer)}Du(e){return new mR}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}vo.provider={build:()=>new vo};class s1 extends vo{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){ue(this.persistence.referenceDelegate instanceof _o,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new zS(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?et.withCacheSize(this.cacheSizeBytes):et.DEFAULT;return new Cp(r=>_o.Vi(r,t),this.serializer)}}class Tc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Ld(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=n1.bind(null,this.syncEngine),await LR(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new FR}()}createDatastore(e){const t=$o(e.databaseInfo.databaseId),r=vR(e.databaseInfo);return bR(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new SR(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Ld(this.syncEngine,t,0),function(){return xd.v()?new xd:new pR}())}createSyncEngine(e,t){return function(i,s,o,c,l,u,d){const p=new jR(i,s,o,c,l,u);return d&&(p.gu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=J(i);z(er,"RemoteStore shutting down."),s.Ea.add(5),await rs(s),s.Aa.shutdown(),s.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Tc.provider={build:()=>new Tc};/**
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
 */class Dl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Zt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Rn="FirestoreClient";class o1{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=i,this.user=ze.UNAUTHENTICATED,this.clientId=sl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{z(Rn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(z(Rn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Al(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Va(n,e){n.asyncQueue.verifyOperationInProgress(),z(Rn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Pp(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Fd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await a1(n);z(Rn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Nd(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Nd(e.remoteStore,i)),n._onlineComponents=e}async function a1(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){z(Rn,"Using user provided OfflineComponentProvider");try{await Va(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===D.FAILED_PRECONDITION||i.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;xr("Error using user provided cache. Falling back to memory cache: "+t),await Va(n,new vo)}}else z(Rn,"Using default OfflineComponentProvider"),await Va(n,new s1(void 0));return n._offlineComponents}async function Wp(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(z(Rn,"Using user provided OnlineComponentProvider"),await Fd(n,n._uninitializedComponentsProvider._online)):(z(Rn,"Using default OnlineComponentProvider"),await Fd(n,new Tc))),n._onlineComponents}function c1(n){return Wp(n).then(e=>e.syncEngine)}async function wo(n){const e=await Wp(n),t=e.eventManager;return t.onListen=GR.bind(null,e.syncEngine),t.onUnlisten=YR.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=WR.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=QR.bind(null,e.syncEngine),t}function l1(n,e,t,r){const i=new Dl(r),s=new Pl(e,i,t);return n.asyncQueue.enqueueAndForget(async()=>Sl(await wo(n),s)),()=>{i.Nu(),n.asyncQueue.enqueueAndForget(async()=>Rl(await wo(n),s))}}function u1(n,e,t={}){const r=new Wt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,u){const d=new Dl({next:m=>{d.Nu(),o.enqueueAndForget(()=>Rl(s,p));const _=m.docs.has(c);!_&&m.fromCache?u.reject(new B(D.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&m.fromCache&&l&&l.source==="server"?u.reject(new B(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new Pl(Vo(c.path),d,{includeMetadataChanges:!0,Ka:!0});return Sl(s,p)}(await wo(n),n.asyncQueue,e,t,r)),r.promise}function h1(n,e,t={}){const r=new Wt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,u){const d=new Dl({next:m=>{d.Nu(),o.enqueueAndForget(()=>Rl(s,p)),m.fromCache&&l.source==="server"?u.reject(new B(D.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(m)},error:m=>u.reject(m)}),p=new Pl(c,d,{includeMetadataChanges:!0,Ka:!0});return Sl(s,p)}(await wo(n),n.asyncQueue,e,t,r)),r.promise}function d1(n,e){const t=new Wt;return n.asyncQueue.enqueueAndForget(async()=>XR(await c1(n),e,t)),t.promise}/**
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
 */function Kp(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const f1="ComponentProvider",Bd=new Map;function m1(n,e,t,r,i){return new DA(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,Kp(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
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
 */const Yp="firestore.googleapis.com",$d=!0;class qd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new B(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Yp,this.ssl=$d}else this.host=e.host,this.ssl=e.ssl??$d;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Rp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<$S)throw new B(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}TA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Kp(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new B(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new B(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new B(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ho{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new qd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new B(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new qd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new hA;switch(r.type){case"firstParty":return new pA(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new B(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Bd.get(t);r&&(z(f1,"Removing Datastore"),Bd.delete(t),r.terminate())}(this),Promise.resolve()}}function p1(n,e,t,r={}){var u;n=rt(n,Ho);const i=Cn(e),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;i&&(zc(`https://${c}`),Hc("Firestore",!0)),s.host!==Yp&&s.host!==c&&xr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...s,host:c,ssl:i,emulatorOptions:r};if(!Qn(l,o)&&(n._setSettings(l),r.mockUserToken)){let d,p;if(typeof r.mockUserToken=="string")d=r.mockUserToken,p=ze.MOCK_USER;else{d=Yf(r.mockUserToken,(u=n._app)==null?void 0:u.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new B(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new ze(m)}n._authCredentials=new dA(new Um(d,p))}}/**
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
 */class xn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new xn(this.firestore,e,this._query)}}class Te{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new wn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Te(this.firestore,e,this._key)}toJSON(){return{type:Te._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(es(t,Te._jsonSchema))return new Te(e,r||null,new G(me.fromString(t.referencePath)))}}Te._jsonSchemaVersion="firestore/documentReference/1.0",Te._jsonSchema={type:Re("string",Te._jsonSchemaVersion),referencePath:Re("string")};class wn extends xn{constructor(e,t,r){super(e,t,Vo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Te(this.firestore,null,new G(e))}withConverter(e){return new wn(this.firestore,e,this._path)}}function Oa(n,e,...t){if(n=ye(n),Fm("collection","path",e),n instanceof Ho){const r=me.fromString(e,...t);return td(r),new wn(n,null,r)}{if(!(n instanceof Te||n instanceof wn))throw new B(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return td(r),new wn(n.firestore,null,r)}}function Si(n,e,...t){if(n=ye(n),arguments.length===1&&(e=sl.newId()),Fm("doc","path",e),n instanceof Ho){const r=me.fromString(e,...t);return ed(r),new Te(n,null,new G(r))}{if(!(n instanceof Te||n instanceof wn))throw new B(D.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return ed(r),new Te(n.firestore,n instanceof wn?n.converter:null,new G(r))}}/**
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
 */const zd="AsyncQueue";class Hd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new xp(this,"async_queue_retry"),this._c=()=>{const r=Ma();r&&z(zd,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Ma();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Ma();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Wt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!$r(e))throw e;z(zd,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,Zt("INTERNAL UNHANDLED ERROR: ",jd(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=bl.createAndSchedule(this,e,t,r,s=>this.hc(s));return this.tc.push(i),i}uc(){this.nc&&W(47125,{Pc:jd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function jd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class tn extends Ho{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Hd,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Hd(e),this._firestoreClient=void 0,await e}}}function g1(n,e){const t=typeof n=="object"?n:Wc(),r=typeof n=="string"?n:ho,i=Ro(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Gf("firestore");s&&p1(i,...s)}return i}function jo(n){if(n._terminated)throw new B(D.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||_1(n),n._firestoreClient}function _1(n){var r,i,s,o;const e=n._freezeSettings(),t=m1(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(i=n._app)==null?void 0:i.options.apiKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new o1(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class lt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new lt(Be.fromBase64String(e))}catch(t){throw new B(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new lt(Be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:lt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(es(e,lt._jsonSchema))return lt.fromBase64String(e.bytes)}}lt._jsonSchemaVersion="firestore/bytes/1.0",lt._jsonSchema={type:Re("string",lt._jsonSchemaVersion),bytes:Re("string")};/**
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
 */class Nl{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new B(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Go{constructor(e){this._methodName=e}}/**
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
 */class Dt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new B(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new B(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ie(this._lat,e._lat)||ie(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Dt._jsonSchemaVersion}}static fromJSON(e){if(es(e,Dt._jsonSchema))return new Dt(e.latitude,e.longitude)}}Dt._jsonSchemaVersion="firestore/geoPoint/1.0",Dt._jsonSchema={type:Re("string",Dt._jsonSchemaVersion),latitude:Re("number"),longitude:Re("number")};/**
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
 */class vt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:vt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(es(e,vt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new vt(e.vectorValues);throw new B(D.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}vt._jsonSchemaVersion="firestore/vectorValue/1.0",vt._jsonSchema={type:Re("string",vt._jsonSchemaVersion),vectorValues:Re("object")};/**
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
 */const y1=/^__.*__$/;class v1{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new kn(e,this.data,this.fieldMask,t,this.fieldTransforms):new ts(e,this.data,t,this.fieldTransforms)}}class Qp{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new kn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Xp(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W(40011,{dataSource:n})}}class Ml{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new Ml({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return To(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Xp(this.dataSource)&&y1.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class w1{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||$o(e)}createContext(e,t,r,i=!1){return new Ml({dataSource:e,methodName:t,targetDoc:r,path:Fe.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Wo(n){const e=n._freezeSettings(),t=$o(n._databaseId);return new w1(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Jp(n,e,t,r,i,s={}){const o=n.createContext(s.merge||s.mergeFields?2:0,e,t,i);Ol("Data must be an object, but it was:",o,r);const c=Zp(r,o);let l,u;if(s.merge)l=new st(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const d=[];for(const p of s.mergeFields){const m=Lr(e,p,t);if(!o.contains(m))throw new B(D.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);ng(d,m)||d.push(m)}l=new st(d),u=o.fieldTransforms.filter(p=>l.covers(p.field))}else l=null,u=o.fieldTransforms;return new v1(new tt(c),l,u)}class Ko extends Go{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ko}}class Vl extends Go{_toFieldTransform(e){return new aS(e.path,new Ui)}isEqual(e){return e instanceof Vl}}function T1(n,e,t,r){const i=n.createContext(1,e,t);Ol("Data must be an object, but it was:",i,r);const s=[],o=tt.empty();Pn(r,(l,u)=>{const d=tg(e,l,t);u=ye(u);const p=i.childContextForFieldPath(d);if(u instanceof Ko)s.push(d);else{const m=ss(u,p);m!=null&&(s.push(d),o.set(d,m))}});const c=new st(s);return new Qp(o,c,i.fieldTransforms)}function E1(n,e,t,r,i,s){const o=n.createContext(1,e,t),c=[Lr(e,r,t)],l=[i];if(s.length%2!=0)throw new B(D.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)c.push(Lr(e,s[m])),l.push(s[m+1]);const u=[],d=tt.empty();for(let m=c.length-1;m>=0;--m)if(!ng(u,c[m])){const _=c[m];let A=l[m];A=ye(A);const k=o.childContextForFieldPath(_);if(A instanceof Ko)u.push(_);else{const x=ss(A,k);x!=null&&(u.push(_),d.set(_,x))}}const p=new st(u);return new Qp(d,p,o.fieldTransforms)}function I1(n,e,t,r=!1){return ss(t,n.createContext(r?4:3,e))}function ss(n,e){if(eg(n=ye(n)))return Ol("Unsupported field value:",e,n),Zp(n,e);if(n instanceof Go)return function(r,i){if(!Xp(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let l=ss(c,i.childContextForArray(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ye(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return iS(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ge.fromDate(r);return{timestampValue:go(i.serializer,s)}}if(r instanceof ge){const s=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:go(i.serializer,s)}}if(r instanceof Dt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof lt)return{bytesValue:vp(i.serializer,r._byteString)};if(r instanceof Te){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:pl(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof vt)return function(o,c){const l=o instanceof vt?o.toArray():o;return{mapValue:{fields:{[Km]:{stringValue:Ym},[fo]:{arrayValue:{values:l.map(d=>{if(typeof d!="number")throw c.createError("VectorValues must only contain numeric values.");return hl(c.serializer,d)})}}}}}}(r,i);if(Sp(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${xo(r)}`)}(n,e)}function Zp(n,e){const t={};return qm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Pn(n,(r,i)=>{const s=ss(i,e.childContextForField(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function eg(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof Dt||n instanceof lt||n instanceof Te||n instanceof Go||n instanceof vt||Sp(n))}function Ol(n,e,t){if(!eg(t)||!Bm(t)){const r=xo(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Lr(n,e,t){if((e=ye(e))instanceof Nl)return e._internalPath;if(typeof e=="string")return tg(n,e);throw To("Field path arguments must be of type string or ",n,!1,void 0,t)}const b1=new RegExp("[~\\*/\\[\\]]");function tg(n,e,t){if(e.search(b1)>=0)throw To(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Nl(...e.split("."))._internalPath}catch{throw To(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function To(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new B(D.INVALID_ARGUMENT,c+n+l)}function ng(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class A1{convertValue(e,t="none"){switch(An(e)){case 0:return null;case 1:return e.booleanValue;case 2:return be(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(bn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw W(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Pn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var r,i,s;const t=(s=(i=(r=e.fields)==null?void 0:r[fo].arrayValue)==null?void 0:i.values)==null?void 0:s.map(o=>be(o.doubleValue));return new vt(t)}convertGeoPoint(e){return new Dt(be(e.latitude),be(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Mo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Mi(e));default:return null}}convertTimestamp(e){const t=In(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=me.fromString(e);ue(Ap(r),9688,{name:e});const i=new Vi(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(t)||Zt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */class Ll extends A1{constructor(e){super(),this.firestore=e}convertBytes(e){return new lt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Te(this.firestore,null,t)}}function Ut(){return new Vl("serverTimestamp")}const Gd="@firebase/firestore",Wd="4.10.0";/**
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
 */function Kd(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}/**
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
 */class rg{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Te(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new S1(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Lr("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class S1 extends rg{data(){return super.data()}}/**
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
 */function ig(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new B(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ul{}class sg extends Ul{}function R1(n,e,...t){let r=[];e instanceof Ul&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof Bl).length,c=s.filter(l=>l instanceof Fl).length;if(o>1||o>0&&c>0)throw new B(D.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Fl extends sg{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Fl(e,t,r)}_apply(e){const t=this._parse(e);return og(e._query,t),new xn(e.firestore,e.converter,hc(e._query,t))}_parse(e){const t=Wo(e.firestore);return function(s,o,c,l,u,d,p){let m;if(u.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new B(D.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){Qd(p,d);const A=[];for(const k of p)A.push(Yd(l,s,k));m={arrayValue:{values:A}}}else m=Yd(l,s,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||Qd(p,d),m=I1(c,o,p,d==="in"||d==="not-in");return Se.create(u,d,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Bl extends Ul{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Bl(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:wt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const l of c)og(o,l),o=hc(o,l)}(e._query,t),new xn(e.firestore,e.converter,hc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class $l extends sg{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new $l(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new B(D.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new B(D.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Li(s,o)}(e._query,this._field,this._direction);return new xn(e.firestore,e.converter,QA(e._query,t))}}function C1(n,e="asc"){const t=e,r=Lr("orderBy",n);return $l._create(r,t)}function Yd(n,e,t){if(typeof(t=ye(t))=="string"){if(t==="")throw new B(D.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!rp(e)&&t.indexOf("/")!==-1)throw new B(D.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(me.fromString(t));if(!G.isDocumentKey(r))throw new B(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ld(n,new G(r))}if(t instanceof Te)return ld(n,t._key);throw new B(D.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${xo(t)}.`)}function Qd(n,e){if(!Array.isArray(n)||n.length===0)throw new B(D.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function og(n,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new B(D.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new B(D.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function ag(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class vi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Hn extends rg{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Hs(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Lr("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new B(D.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Hn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Hn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Hn._jsonSchema={type:Re("string",Hn._jsonSchemaVersion),bundleSource:Re("string","DocumentSnapshot"),bundleName:Re("string"),bundle:Re("string")};class Hs extends Hn{data(e={}){return super.data(e)}}class jn{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new vi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Hs(this._firestore,this._userDataWriter,r.key,r,new vi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new B(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const l=new Hs(i._firestore,i._userDataWriter,c.doc.key,c.doc,new vi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new Hs(i._firestore,i._userDataWriter,c.doc.key,c.doc,new vi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let u=-1,d=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:P1(c.type),doc:l,oldIndex:u,newIndex:d}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new B(D.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=jn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=sl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function P1(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W(61501,{type:n})}}/**
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
 */jn._jsonSchemaVersion="firestore/querySnapshot/1.0",jn._jsonSchema={type:Re("string",jn._jsonSchemaVersion),bundleSource:Re("string","QuerySnapshot"),bundleName:Re("string"),bundle:Re("string")};/**
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
 */function k1(n){n=rt(n,Te);const e=rt(n.firestore,tn),t=jo(e);return u1(t,n._key).then(r=>cg(e,n,r))}function Xd(n){n=rt(n,xn);const e=rt(n.firestore,tn),t=jo(e),r=new Ll(e);return ig(n._query),h1(t,n._query).then(i=>new jn(e,r,n,i))}function Jd(n,e,t){n=rt(n,Te);const r=rt(n.firestore,tn),i=ag(n.converter,e,t),s=Wo(r);return Yo(r,[Jp(s,"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,ht.none())])}function x1(n,e,t,...r){n=rt(n,Te);const i=rt(n.firestore,tn),s=Wo(i);let o;return o=typeof(e=ye(e))=="string"||e instanceof Nl?E1(s,"updateDoc",n._key,e,t,r):T1(s,"updateDoc",n._key,e),Yo(i,[o.toMutation(n._key,ht.exists(!0))])}function Zd(n){return Yo(rt(n.firestore,tn),[new dl(n._key,ht.none())])}function La(n,e){const t=rt(n.firestore,tn),r=Si(n),i=ag(n.converter,e),s=Wo(n.firestore);return Yo(t,[Jp(s,"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,ht.exists(!1))]).then(()=>r)}function ef(n,...e){var u,d,p;n=ye(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Kd(e[r])||(t=e[r++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Kd(e[r])){const m=e[r];e[r]=(u=m.next)==null?void 0:u.bind(m),e[r+1]=(d=m.error)==null?void 0:d.bind(m),e[r+2]=(p=m.complete)==null?void 0:p.bind(m)}let s,o,c;if(n instanceof Te)o=rt(n.firestore,tn),c=Vo(n._key.path),s={next:m=>{e[r]&&e[r](cg(o,n,m))},error:e[r+1],complete:e[r+2]};else{const m=rt(n,xn);o=rt(m.firestore,tn),c=m._query;const _=new Ll(o);s={next:A=>{e[r]&&e[r](new jn(o,_,m,A))},error:e[r+1],complete:e[r+2]},ig(n._query)}const l=jo(o);return l1(l,c,i,s)}function Yo(n,e){const t=jo(n);return d1(t,e)}function cg(n,e,t){const r=t.docs.get(e._key),i=new Ll(n);return new Hn(n,i,e._key,r,new vi(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){uA(ir),Xn(new Tn("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new tn(new fA(r.getProvider("auth-internal")),new gA(o,r.getProvider("app-check-internal")),NA(o,i),o);return s={useFetchStreams:t,...s},c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Ct(Gd,Wd,e),Ct(Gd,Wd,"esm2020")})();var D1="firebase",N1="12.8.0";/**
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
 */Ct(D1,N1,"app");/**
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
 */const lg="firebasestorage.googleapis.com",ug="storageBucket",M1=2*60*1e3,V1=10*60*1e3;/**
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
 */class Ie extends Ot{constructor(e,t,r=0){super(Ua(e),`Firebase Storage: ${t} (${Ua(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ie.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ua(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ee;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ee||(Ee={}));function Ua(n){return"storage/"+n}function ql(){const n="An unknown error occurred, please check the error payload for server response.";return new Ie(Ee.UNKNOWN,n)}function O1(n){return new Ie(Ee.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function L1(n){return new Ie(Ee.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function U1(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ie(Ee.UNAUTHENTICATED,n)}function F1(){return new Ie(Ee.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function B1(n){return new Ie(Ee.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function $1(){return new Ie(Ee.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function q1(){return new Ie(Ee.CANCELED,"User canceled the upload/download.")}function z1(n){return new Ie(Ee.INVALID_URL,"Invalid URL '"+n+"'.")}function H1(n){return new Ie(Ee.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function j1(){return new Ie(Ee.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+ug+"' property when initializing the app?")}function G1(){return new Ie(Ee.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function W1(){return new Ie(Ee.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function K1(n){return new Ie(Ee.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Ec(n){return new Ie(Ee.INVALID_ARGUMENT,n)}function hg(){return new Ie(Ee.APP_DELETED,"The Firebase app was deleted.")}function Y1(n){return new Ie(Ee.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ri(n,e){return new Ie(Ee.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function fi(n){throw new Ie(Ee.INTERNAL_ERROR,"Internal error: "+n)}/**
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
 */class ot{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=ot.makeFromUrl(e,t)}catch{return new ot(e,"")}if(r.path==="")return r;throw H1(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s($){$.path.charAt($.path.length-1)==="/"&&($.path_=$.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function u($){$.path_=decodeURIComponent($.path)}const d="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",_=new RegExp(`^https?://${p}/${d}/b/${i}/o${m}`,"i"),A={bucket:1,path:3},k=t===lg?"(?:storage.googleapis.com|storage.cloud.google.com)":t,x="([^?#]*)",C=new RegExp(`^https?://${k}/${i}/${x}`,"i"),F=[{regex:c,indices:l,postModify:s},{regex:_,indices:A,postModify:u},{regex:C,indices:{bucket:1,path:2},postModify:u}];for(let $=0;$<F.length;$++){const K=F[$],L=K.regex.exec(e);if(L){const T=L[K.indices.bucket];let y=L[K.indices.path];y||(y=""),r=new ot(T,y),K.postModify(r);break}}if(r==null)throw z1(e);return r}}class Q1{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function X1(n,e,t){let r=1,i=null,s=null,o=!1,c=0;function l(){return c===2}let u=!1;function d(...x){u||(u=!0,e.apply(null,x))}function p(x){i=setTimeout(()=>{i=null,n(_,l())},x)}function m(){s&&clearTimeout(s)}function _(x,...C){if(u){m();return}if(x){m(),d.call(null,x,...C);return}if(l()||o){m(),d.call(null,x,...C);return}r<64&&(r*=2);let F;c===1?(c=2,F=0):F=(r+Math.random())*1e3,p(F)}let A=!1;function k(x){A||(A=!0,m(),!u&&(i!==null?(x||(c=2),clearTimeout(i),p(0)):x||(c=1)))}return p(0),s=setTimeout(()=>{o=!0,k(!0)},t),k}function J1(n){n(!1)}/**
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
 */function Z1(n){return n!==void 0}function eC(n){return typeof n=="object"&&!Array.isArray(n)}function zl(n){return typeof n=="string"||n instanceof String}function tf(n){return Hl()&&n instanceof Blob}function Hl(){return typeof Blob<"u"}function nf(n,e,t,r){if(r<e)throw Ec(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Ec(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
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
 */function Qo(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function dg(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var Gn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Gn||(Gn={}));/**
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
 */function tC(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
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
 */class nC{constructor(e,t,r,i,s,o,c,l,u,d,p,m=!0,_=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=l,this.timeout_=u,this.progressCallback_=d,this.connectionFactory_=p,this.retry=m,this.isUsingEmulator=_,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((A,k)=>{this.resolve_=A,this.reject_=k,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Cs(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=c=>{const l=c.loaded,u=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,u)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const c=s.getErrorCode()===Gn.NO_ERROR,l=s.getStatus();if(!c||tC(l,this.additionalRetryCodes_)&&this.retry){const d=s.getErrorCode()===Gn.ABORT;r(!1,new Cs(!1,null,d));return}const u=this.successCodes_.indexOf(l)!==-1;r(!0,new Cs(u,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,c=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(c,c.getResponse());Z1(l)?s(l):s()}catch(l){o(l)}else if(c!==null){const l=ql();l.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,l)):o(l)}else if(i.canceled){const l=this.appDelete_?hg():q1();o(l)}else{const l=$1();o(l)}};this.canceled_?t(!1,new Cs(!1,null,!0)):this.backoffId_=X1(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&J1(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Cs{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function rC(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function iC(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function sC(n,e){e&&(n["X-Firebase-GMPID"]=e)}function oC(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function aC(n,e,t,r,i,s,o=!0,c=!1){const l=dg(n.urlParams),u=n.url+l,d=Object.assign({},n.headers);return sC(d,e),rC(d,t),iC(d,s),oC(d,r),new nC(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o,c)}/**
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
 */function cC(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function lC(...n){const e=cC();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Hl())return new Blob(n);throw new Ie(Ee.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function uC(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function hC(n){if(typeof atob>"u")throw K1("base-64");return atob(n)}/**
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
 */const St={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Fa{constructor(e,t){this.data=e,this.contentType=t||null}}function dC(n,e){switch(n){case St.RAW:return new Fa(fg(e));case St.BASE64:case St.BASE64URL:return new Fa(mg(n,e));case St.DATA_URL:return new Fa(mC(e),pC(e))}throw ql()}function fg(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=n.charCodeAt(++t);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function fC(n){let e;try{e=decodeURIComponent(n)}catch{throw Ri(St.DATA_URL,"Malformed data URL.")}return fg(e)}function mg(n,e){switch(n){case St.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Ri(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case St.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Ri(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=hC(e)}catch(i){throw i.message.includes("polyfill")?i:Ri(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class pg{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Ri(St.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=gC(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function mC(n){const e=new pg(n);return e.base64?mg(St.BASE64,e.rest):fC(e.rest)}function pC(n){return new pg(n).contentType}function gC(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
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
 */class mn{constructor(e,t){let r=0,i="";tf(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(tf(this.data_)){const r=this.data_,i=uC(r,e,t);return i===null?null:new mn(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new mn(r,!0)}}static getBlob(...e){if(Hl()){const t=e.map(r=>r instanceof mn?r.data_:r);return new mn(lC.apply(null,t))}else{const t=e.map(o=>zl(o)?dC(St.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)i[s++]=o[c]}),new mn(i,!0)}}uploadData(){return this.data_}}/**
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
 */function gg(n){let e;try{e=JSON.parse(n)}catch{return null}return eC(e)?e:null}/**
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
 */function _C(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function yC(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function _g(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */function vC(n,e){return e}class Ze{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||vC}}let Ps=null;function wC(n){return!zl(n)||n.length<2?n:_g(n)}function yg(){if(Ps)return Ps;const n=[];n.push(new Ze("bucket")),n.push(new Ze("generation")),n.push(new Ze("metageneration")),n.push(new Ze("name","fullPath",!0));function e(s,o){return wC(o)}const t=new Ze("name");t.xform=e,n.push(t);function r(s,o){return o!==void 0?Number(o):o}const i=new Ze("size");return i.xform=r,n.push(i),n.push(new Ze("timeCreated")),n.push(new Ze("updated")),n.push(new Ze("md5Hash",null,!0)),n.push(new Ze("cacheControl",null,!0)),n.push(new Ze("contentDisposition",null,!0)),n.push(new Ze("contentEncoding",null,!0)),n.push(new Ze("contentLanguage",null,!0)),n.push(new Ze("contentType",null,!0)),n.push(new Ze("metadata","customMetadata",!0)),Ps=n,Ps}function TC(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new ot(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function EC(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];r[o.local]=o.xform(r,e[o.server])}return TC(r,n),r}function vg(n,e,t){const r=gg(e);return r===null?null:EC(n,r,t)}function IC(n,e,t,r){const i=gg(e);if(i===null||!zl(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(u=>{const d=n.bucket,p=n.fullPath,m="/b/"+o(d)+"/o/"+o(p),_=Qo(m,t,r),A=dg({alt:"media",token:u});return _+A})[0]}function bC(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class jl{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function wg(n){if(!n)throw ql()}function AC(n,e){function t(r,i){const s=vg(n,i,e);return wg(s!==null),s}return t}function SC(n,e){function t(r,i){const s=vg(n,i,e);return wg(s!==null),IC(s,i,n.host,n._protocol)}return t}function Tg(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=F1():i=U1():t.getStatus()===402?i=L1(n.bucket):t.getStatus()===403?i=B1(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function Eg(n){const e=Tg(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=O1(n.path)),s.serverResponse=i.serverResponse,s}return t}function RC(n,e,t){const r=e.fullServerUrl(),i=Qo(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,c=new jl(i,s,SC(n,t),o);return c.errorHandler=Eg(e),c}function CC(n,e){const t=e.fullServerUrl(),r=Qo(t,n.host,n._protocol),i="DELETE",s=n.maxOperationRetryTime;function o(l,u){}const c=new jl(r,i,o,s);return c.successCodes=[200,204],c.errorHandler=Eg(e),c}function PC(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function kC(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=PC(null,e)),r}function xC(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let F="";for(let $=0;$<2;$++)F=F+Math.random().toString().slice(2);return F}const l=c();o["Content-Type"]="multipart/related; boundary="+l;const u=kC(e,r,i),d=bC(u,t),p="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+l+`\r
Content-Type: `+u.contentType+`\r
\r
`,m=`\r
--`+l+"--",_=mn.getBlob(p,r,m);if(_===null)throw G1();const A={name:u.fullPath},k=Qo(s,n.host,n._protocol),x="POST",C=n.maxUploadRetryTime,M=new jl(k,x,AC(n,t),C);return M.urlParams=A,M.headers=o,M.body=_.uploadData(),M.errorHandler=Tg(e),M}class DC{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Gn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Gn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Gn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i,s){if(this.sent_)throw fi("cannot .send() more than once");if(Cn(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw fi("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw fi("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw fi("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw fi("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class NC extends DC{initXhr(){this.xhr_.responseType="text"}}function Gl(){return new NC}/**
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
 */class tr{constructor(e,t){this._service=e,t instanceof ot?this._location=t:this._location=ot.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new tr(e,t)}get root(){const e=new ot(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return _g(this._location.path)}get storage(){return this._service}get parent(){const e=_C(this._location.path);if(e===null)return null;const t=new ot(this._location.bucket,e);return new tr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw Y1(e)}}function MC(n,e,t){n._throwIfRoot("uploadBytes");const r=xC(n.storage,n._location,yg(),new mn(e,!0),t);return n.storage.makeRequestWithTokens(r,Gl).then(i=>({metadata:i,ref:n}))}function VC(n){n._throwIfRoot("getDownloadURL");const e=RC(n.storage,n._location,yg());return n.storage.makeRequestWithTokens(e,Gl).then(t=>{if(t===null)throw W1();return t})}function OC(n){n._throwIfRoot("deleteObject");const e=CC(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Gl)}function LC(n,e){const t=yC(n._location.path,e),r=new ot(n._location.bucket,t);return new tr(n.storage,r)}/**
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
 */function UC(n){return/^[A-Za-z]+:\/\//.test(n)}function FC(n,e){return new tr(n,e)}function Ig(n,e){if(n instanceof Wl){const t=n;if(t._bucket==null)throw j1();const r=new tr(t,t._bucket);return e!=null?Ig(r,e):r}else return e!==void 0?LC(n,e):n}function BC(n,e){if(e&&UC(e)){if(n instanceof Wl)return FC(n,e);throw Ec("To use ref(service, url), the first argument must be a Storage instance.")}else return Ig(n,e)}function rf(n,e){const t=e==null?void 0:e[ug];return t==null?null:ot.makeFromBucketSpec(t,n)}function $C(n,e,t,r={}){n.host=`${e}:${t}`;const i=Cn(e);i&&(zc(`https://${n.host}/b`),Hc("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:Yf(s,n.app.options.projectId))}class Wl{constructor(e,t,r,i,s,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=lg,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=M1,this._maxUploadRetryTime=V1,this._requests=new Set,i!=null?this._bucket=ot.makeFromBucketSpec(i,this._host):this._bucket=rf(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ot.makeFromBucketSpec(this._url,e):this._bucket=rf(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){nf("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){nf("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(ct(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new tr(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new Q1(hg());{const o=aC(e,this._appId,r,i,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const sf="@firebase/storage",of="0.14.0";/**
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
 */const bg="storage";function qC(n,e,t){return n=ye(n),MC(n,e,t)}function zC(n){return n=ye(n),VC(n)}function HC(n){return n=ye(n),OC(n)}function af(n,e){return n=ye(n),BC(n,e)}function jC(n=Wc(),e){n=ye(n);const r=Ro(n,bg).getImmediate({identifier:e}),i=Gf("storage");return i&&GC(r,...i),r}function GC(n,e,t,r={}){$C(n,e,t,r)}function WC(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Wl(t,r,i,e,ir)}function KC(){Xn(new Tn(bg,WC,"PUBLIC").setMultipleInstances(!0)),Ct(sf,of,""),Ct(sf,of,"esm2020")}KC();const YC={apiKey:"AIzaSyCuAkWbQRZhmx4ULJT0qoHOZmVl9dUez8U",authDomain:"indian-family-tree-1990.firebaseapp.com",projectId:"indian-family-tree-1990",storageBucket:"indian-family-tree-1990.firebasestorage.app",messagingSenderId:"1061764015655",appId:"1:1061764015655:web:a61a61044ede9e7559d002"},Kl=Jf(YC),Ba=cA(Kl),js=g1(Kl),cf=jC(Kl),Ag=new Bt;Ag.setCustomParameters({prompt:"select_account"});class QC{constructor(){this.currentUser=null,this.authStateListeners=[]}init(){return new Promise(e=>{QI(Ba,async t=>{console.log("Auth state changed in service:",t?t.email:"no user"),t?(this.currentUser={uid:t.uid,email:t.email,displayName:t.displayName,photoURL:t.photoURL},this.createUserDocument(t).catch(r=>{console.warn("Could not create user document:",r)})):this.currentUser=null,this.authStateListeners.forEach(r=>r(this.currentUser)),e(this.currentUser)})})}async signInWithGoogle(){try{return{success:!0,user:(await _b(Ba,Ag)).user}}catch(e){return console.error("Google sign-in error:",e),{success:!1,error:e.message}}}async signOut(){try{return await XI(Ba),{success:!0}}catch(e){return console.error("Sign-out error:",e),{success:!1,error:e.message}}}async createUserDocument(e){const t=Si(js,"users",e.uid);(await k1(t)).exists()?await Jd(t,{lastLoginAt:Ut()},{merge:!0}):await Jd(t,{displayName:e.displayName,email:e.email,photoURL:e.photoURL,createdAt:Ut(),lastLoginAt:Ut()})}getCurrentUser(){return this.currentUser}isAuthenticated(){return this.currentUser!==null}onAuthStateChange(e){return this.authStateListeners.push(e),()=>{this.authStateListeners=this.authStateListeners.filter(t=>t!==e)}}}const Gt=new QC;class XC{constructor(){this.members=[],this.relationships=[],this.currentTreeId=null,this.unsubscribeMembers=null,this.unsubscribeRelationships=null,this.dataChangeListeners=[],this.familyTreesCache=null}getUserTreesRef(){const e=Gt.getCurrentUser();if(!e)throw new Error("User not authenticated");return Oa(js,"users",e.uid,"familyTrees")}getMembersRef(){const e=Gt.getCurrentUser();return!e||!this.currentTreeId?null:Oa(js,"users",e.uid,"familyTrees",this.currentTreeId,"members")}getRelationshipsRef(){const e=Gt.getCurrentUser();return!e||!this.currentTreeId?null:Oa(js,"users",e.uid,"familyTrees",this.currentTreeId,"relationships")}async createFamilyTree(e="My Family Tree"){const t=this.getUserTreesRef(),r=await La(t,{name:e,createdAt:Ut(),updatedAt:Ut()});return this.currentTreeId=r.id,this.familyTreesCache=null,await this.subscribeToTree(),r.id}async getFamilyTrees(){if(this.familyTreesCache)return console.log("Returning family trees from cache."),this.familyTreesCache;try{const e=this.getUserTreesRef(),t=R1(e,C1("createdAt","desc")),i=(await Xd(t)).docs.map(s=>({id:s.id,...s.data()}));return this.familyTreesCache=i,console.log("Fetched and cached family trees."),i}catch(e){console.error("Error getting family trees with server-side sorting. This likely requires a Firestore index. Falling back to client-side sorting. Error: ",e);try{const t=this.getUserTreesRef();return(await Xd(t)).docs.map(s=>({id:s.id,...s.data()})).sort((s,o)=>{var u,d,p,m;const c=((d=(u=s.createdAt)==null?void 0:u.toMillis)==null?void 0:d.call(u))||0;return(((m=(p=o.createdAt)==null?void 0:p.toMillis)==null?void 0:m.call(p))||0)-c})}catch(t){return console.error("Error in fallback fetching of family trees:",t),[]}}}async loadFamilyTree(e){return this.currentTreeId=e,await this.subscribeToTree(),this.currentTreeId}async subscribeToTree(){this.unsubscribe();const e=this.getMembersRef(),t=this.getRelationshipsRef();!e||!t||(this.unsubscribeMembers=ef(e,r=>{this.members=r.docs.map(i=>({id:i.id,...i.data()})),this.notifyDataChange()}),this.unsubscribeRelationships=ef(t,r=>{this.relationships=r.docs.map(i=>({id:i.id,...i.data()})),this.notifyDataChange()}))}unsubscribe(){this.unsubscribeMembers&&(this.unsubscribeMembers(),this.unsubscribeMembers=null),this.unsubscribeRelationships&&(this.unsubscribeRelationships(),this.unsubscribeRelationships=null)}async uploadPhoto(e,t){if(!e)return null;const r=Gt.getCurrentUser();if(!r||!this.currentTreeId)throw new Error("User not authenticated or no tree selected");const i=`${Date.now()}_${e.name}`,s=af(cf,`users/${r.uid}/familyTrees/${this.currentTreeId}/photos/${t}/${i}`);return await qC(s,e),await zC(s)}async deletePhoto(e){if(e)try{const t=af(cf,e);await HC(t)}catch(t){console.error("Error deleting photo:",t)}}async addMember(e){const t=this.getMembersRef();if(!t)throw new Error("No family tree selected");return{id:(await La(t,{...e,createdAt:Ut(),updatedAt:Ut()})).id,...e}}async updateMember(e,t){const r=this.getMembersRef();if(!r)throw new Error("No family tree selected");const i=Si(r,e);return await x1(i,{...t,updatedAt:Ut()}),{id:e,...t}}async deleteMember(e){const t=this.getMembersRef();if(!t)throw new Error("No family tree selected");await Zd(Si(t,e));const r=this.getRelationshipsRef(),i=this.relationships.filter(s=>s.member1Id===e||s.member2Id===e);for(const s of i)await Zd(Si(r,s.id))}getMember(e){return this.members.find(t=>t.id===e)}getAllMembers(){return this.members.map(e=>{const t=this.getSpouse(e.id);return{...e,spouseId:t?t.id:null}})}async addSpouse(e,t,r=null){const i=this.getRelationshipsRef();if(!i)throw new Error("No family tree selected");return{id:(await La(i,{type:"spouse",member1Id:e,member2Id:t,marriageDate:r,createdAt:Ut()})).id,type:"spouse",member1Id:e,member2Id:t,marriageDate:r}}async addParent(e,t){const r=this.getMember(e);if(r){const i=r.parentIds||[];i.includes(t)||(i.push(t),await this.updateMember(e,{parentIds:i}))}}getSpouse(e){const t=this.relationships.find(r=>r.type==="spouse"&&(r.member1Id===e||r.member2Id===e));if(t){const r=t.member1Id===e?t.member2Id:t.member1Id;return this.getMember(r)}return null}getChildren(e){return this.members.filter(t=>t.parentIds&&t.parentIds.includes(e))}getParents(e){const t=this.getMember(e);return t&&t.parentIds?t.parentIds.map(r=>this.getMember(r)).filter(Boolean):[]}getSiblings(e){const t=this.getMember(e);return!t||!t.parentIds||t.parentIds.length===0?[]:this.members.filter(r=>r.id!==e&&r.parentIds&&r.parentIds.some(i=>t.parentIds.includes(i)))}searchMembers(e){const t=e.toLowerCase();return this.members.filter(r=>{const i=r.name&&r.name.toLowerCase().includes(t)||r.firstName&&r.firstName.toLowerCase().includes(t)||r.lastName&&r.lastName.toLowerCase().includes(t),s=r.profession&&r.profession.toLowerCase().includes(t)||r.birthPlace&&r.birthPlace.toLowerCase().includes(t)||r.gotra&&r.gotra.toLowerCase().includes(t)||r.email&&r.email.toLowerCase().includes(t)||r.phone&&r.phone.toLowerCase().includes(t);return i||s})}getMembersByGeneration(e){return this.members.map(r=>({...r,generation:this.calculateGeneration(r.id)})).filter(r=>r.generation===e)}calculateGeneration(e,t=new Set){if(t.has(e))return 0;t.add(e);const r=this.getMember(e);if(!r||!r.parentIds||r.parentIds.length===0)return 1;const i=r.parentIds.map(s=>this.calculateGeneration(s,t));return Math.max(...i)+1}getStatistics(){const e=this.members.filter(i=>i.gender==="male").length,t=this.members.filter(i=>i.gender==="female").length,r=new Set(this.members.map(i=>this.calculateGeneration(i.id)));return{totalMembers:this.members.length,males:e,females:t,generations:r.size,alive:this.members.filter(i=>i.isAlive).length,deceased:this.members.filter(i=>!i.isAlive).length}}getRecentMembers(e=5){return[...this.members].sort((t,r)=>{var o,c,l,u;const i=((c=(o=t.createdAt)==null?void 0:o.toMillis)==null?void 0:c.call(o))||0;return(((u=(l=r.createdAt)==null?void 0:l.toMillis)==null?void 0:u.call(l))||0)-i}).slice(0,e)}getUpcomingBirthdays(e=10){const t=new Date,r=t.getFullYear();return this.members.filter(s=>s.birthDate&&s.isAlive).map(s=>{const o=new Date(s.birthDate),c=new Date(r,o.getMonth(),o.getDate());c<t&&c.setFullYear(r+1);const l=Math.ceil((c-t)/(1e3*60*60*24));return{member:s,date:c.toLocaleDateString("en-IN",{month:"short",day:"numeric"}),daysUntil:l}}).sort((s,o)=>s.daysUntil-o.daysUntil).slice(0,e)}exportData(){return{members:this.members,relationships:this.relationships,exportDate:new Date().toISOString(),version:"2.0"}}clearLocalData(){this.members=[],this.relationships=[],this.currentTreeId=null,this.familyTreesCache=null,this.unsubscribe()}onDataChange(e){return this.dataChangeListeners.push(e),()=>{this.dataChangeListeners=this.dataChangeListeners.filter(t=>t!==e)}}notifyDataChange(){this.dataChangeListeners.forEach(e=>e()),window.dispatchEvent(new CustomEvent("familyDataChanged"))}}const nn=new XC;let $i,qi,Ic,bc,Ac,je,gt,_t,zi,Sc,pn=null;document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM loaded, initializing app..."),JC(),ar(),ZC(),Gt.onAuthStateChange(nP);try{console.log("Initializing auth service..."),await Gt.init(),console.log("Auth initialization process started.")}catch(n){console.error("Auth init error:",n),Sg()}});function JC(){$i=document.getElementById("signInPage"),qi=document.getElementById("dashboardPage"),Ic=document.getElementById("userAvatar"),bc=document.getElementById("userName"),Ac=document.getElementById("userEmail"),je=document.getElementById("userDropdown"),gt=document.getElementById("treesModal"),_t=document.getElementById("createTreeModal"),zi=document.getElementById("loadingOverlay"),Sc=document.getElementById("currentTreeName")}function ZC(){var n,e,t,r,i,s,o,c,l,u;(n=document.getElementById("welcomeSignInBtn"))==null||n.addEventListener("click",eP),(e=document.getElementById("signOutBtn"))==null||e.addEventListener("click",tP),(t=document.getElementById("userMenuBtn"))==null||t.addEventListener("click",oP),(r=document.getElementById("myTreesBtn"))==null||r.addEventListener("click",Rg),(i=document.getElementById("newTreeBtn"))==null||i.addEventListener("click",()=>{je==null||je.classList.add("hidden"),ji()}),(s=document.getElementById("closeTreesModal"))==null||s.addEventListener("click",Hi),(o=document.getElementById("createTreeBtn"))==null||o.addEventListener("click",ji),(c=document.getElementById("closeCreateTreeModal"))==null||c.addEventListener("click",Ar),(l=document.getElementById("cancelCreateTreeBtn"))==null||l.addEventListener("click",Ar),(u=document.getElementById("confirmCreateTreeBtn"))==null||u.addEventListener("click",cP),document.addEventListener("click",d=>{d.target.closest(".user-menu")||je==null||je.classList.add("hidden")}),gt==null||gt.addEventListener("click",d=>{d.target===gt&&Hi()}),_t==null||_t.addEventListener("click",d=>{d.target===_t&&Ar()})}async function eP(){ar();try{const n=await Gt.signInWithGoogle();n.success||(Tt(),alert("Sign in failed: "+n.error))}catch(n){Tt(),console.error("Sign in error:",n),alert("Sign in failed: "+n.message)}}async function tP(){je==null||je.classList.add("hidden"),ar(),nn.clearLocalData(),pn=null,await Gt.signOut()}async function nP(n){if(console.log("handleAuthStateChange called:",n?n.email:"signed out"),Tt(),n){console.log("User is signed in, showing dashboard"),rP(n);try{await iP()}catch(e){console.error("Error in loadUserTrees:",e),ji()}}else console.log("User is signed out, showing sign-in page"),Sg()}function Sg(){console.log("Showing sign-in page"),qi&&qi.classList.add("hidden"),$i&&$i.classList.remove("hidden"),Hi(),Ar(),pn&&(pn=null),Tt()}function rP(n){var e;console.log("Showing dashboard for:",n.displayName),$i&&$i.classList.add("hidden"),qi&&qi.classList.remove("hidden"),Ic&&(Ic.src=n.photoURL||"https://ui-avatars.com/api/?name="+encodeURIComponent(n.displayName||"User")),bc&&(bc.textContent=((e=n.displayName)==null?void 0:e.split(" ")[0])||"User"),Ac&&(Ac.textContent=n.email)}async function iP(){ar();try{console.log("Loading user trees...");const n=new Promise((t,r)=>setTimeout(()=>r(new Error("Timeout loading trees")),1e4)),e=await Promise.race([nn.getFamilyTrees(),n]);console.log("Found trees:",e.length),Tt(),e.length===0?(console.log("No trees found, auto-creating default tree"),await sP()):e.length===1?(console.log("One tree found, loading:",e[0].name),await Xo(e[0].id,e[0].name),Jo()):(console.log("Multiple trees found, showing selection"),Rg())}catch(n){console.error("Error loading trees:",n),Tt(),uP(),ji()}}async function sP(){ar();try{const n=Gt.getCurrentUser(),e=n!=null&&n.displayName?`${n.displayName}'s Family Tree`:"My Family Tree";console.log("Auto-creating tree:",e);const t=await nn.createFamilyTree(e);if(console.log("Tree created:",t),await Xo(t,e),n){const r=(n.displayName||"User").split(" "),i=r[0]||"User",s=r.slice(1).join(" ")||"",o={firstName:i,lastName:s,name:n.displayName||"User",gender:"male",relationship:"Self",photoURL:n.photoURL||null,email:n.email||null,isAlive:!0,isCurrentUser:!0};await nn.addMember(o),console.log("Auto-created user tile for:",n.displayName)}Jo(),Tt()}catch(n){console.error("Error auto-creating tree:",n),Tt(),ji()}}async function Xo(n,e="My Family Tree"){ar(),console.log("Loading tree:",n);try{await nn.loadFamilyTree(n),Sc&&(Sc.textContent=e),pn?(console.log("Refreshing existing app"),pn.render(),pn.updateStatistics()):(console.log("Creating new FamilyTreeApp instance"),pn=new R0(nn),pn.initWithService()),Jo(),Hi(),Ar()}catch(t){console.error("Error loading tree:",t),alert("Failed to load family tree: "+t.message)}Tt()}function oP(){je==null||je.classList.toggle("hidden")}function Rg(){je==null||je.classList.add("hidden"),aP(),gt&&(gt.classList.remove("hidden"),gt.classList.add("active"),document.body.style.overflow="hidden")}function Hi(){gt&&(gt.classList.remove("active"),gt.classList.add("hidden"),document.body.style.overflow="")}async function aP(){const n=document.getElementById("treesList");if(n){n.innerHTML='<div class="trees-loading">Loading...</div>';try{const e=await nn.getFamilyTrees();if(e.length===0){n.innerHTML=`
                <div class="trees-empty">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                    </svg>
                    <p>No family trees yet</p>
                    <p class="text-muted">Create your first family tree to get started</p>
                </div>
            `;return}n.innerHTML=e.map(t=>`
            <div class="tree-item ${t.id===nn.currentTreeId?"active":""}"
                 data-tree-id="${t.id}" data-tree-name="${t.name}">
                <div class="tree-item-info">
                    <span class="tree-item-name">${t.name}</span>
                    <span class="tree-item-meta">Created ${lP(t.createdAt)}</span>
                </div>
                <svg class="tree-item-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
            </div>
        `).join(""),n.querySelectorAll(".tree-item").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.treeId,i=t.dataset.treeName;Xo(r,i)})})}catch(e){console.error("Error populating trees list:",e),n.innerHTML=`
            <div class="trees-empty">
                <p>Error loading trees</p>
                <p class="text-muted">${e.message}</p>
            </div>
        `}}}function ji(){Hi();const n=document.getElementById("treeName");n&&(n.value=""),_t&&(_t.classList.remove("hidden"),_t.classList.add("active"),document.body.style.overflow="hidden")}function Ar(){_t&&(_t.classList.remove("active"),_t.classList.add("hidden"),document.body.style.overflow="")}async function cP(){const n=document.getElementById("treeName"),e=(n==null?void 0:n.value.trim())||"My Family Tree";ar(),Ar();try{console.log("Creating tree:",e);const t=await nn.createFamilyTree(e);console.log("Tree created:",t),await Xo(t,e),Jo(),console.log("Add Member button should now be enabled"),Tt()}catch(t){console.error("Error creating tree:",t),Tt(),alert("Failed to create family tree: "+t.message)}}function ar(){zi&&zi.classList.remove("hidden")}function Tt(){zi&&zi.classList.add("hidden")}function lP(n){return n?(n.toDate?n.toDate():new Date(n)).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}function uP(){const n=document.getElementById("addMemberBtn");n&&(n.disabled=!0,n.style.opacity="0.5",n.style.cursor="not-allowed",n.title="Please create a family tree first")}function Jo(){const n=document.getElementById("addMemberBtn");n&&(n.disabled=!1,n.style.opacity="1",n.style.cursor="pointer",n.title="Add a new family member")}
