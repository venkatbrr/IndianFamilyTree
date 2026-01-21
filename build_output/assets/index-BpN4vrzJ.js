(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();class u_{constructor(){this.members=[],this.relationships=[],this.loadFromStorage()}addMember(e){const t={id:this.generateId(),...e,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};return this.members.push(t),this.saveToStorage(),t}updateMember(e,t){const r=this.members.findIndex(i=>i.id===e);return r!==-1?(this.members[r]={...this.members[r],...t,updatedAt:new Date().toISOString()},this.saveToStorage(),this.members[r]):null}deleteMember(e){this.members=this.members.filter(t=>t.id!==e),this.relationships=this.relationships.filter(t=>t.member1Id!==e&&t.member2Id!==e),this.saveToStorage()}getMember(e){return this.members.find(t=>t.id===e)}getAllMembers(){return this.members.map(e=>{const t=this.getSpouse(e.id);return{...e,spouseId:t?t.id:null}})}addSpouse(e,t,r=null){const i={id:this.generateId(),type:"spouse",member1Id:e,member2Id:t,marriageDate:r,createdAt:new Date().toISOString()};return this.relationships.push(i),this.saveToStorage(),i}addParent(e,t){const r=this.getMember(e);r&&(r.parentIds||(r.parentIds=[]),r.parentIds.includes(t)||(r.parentIds.push(t),this.updateMember(e,{parentIds:r.parentIds})))}getSpouse(e){const t=this.relationships.find(r=>r.type==="spouse"&&(r.member1Id===e||r.member2Id===e));if(t){const r=t.member1Id===e?t.member2Id:t.member1Id;return this.getMember(r)}return null}getChildren(e){return this.members.filter(t=>t.parentIds&&t.parentIds.includes(e))}getParents(e){const t=this.getMember(e);return t&&t.parentIds?t.parentIds.map(r=>this.getMember(r)).filter(Boolean):[]}getSiblings(e){const t=this.getMember(e);return!t||!t.parentIds||t.parentIds.length===0?[]:this.members.filter(r=>r.id!==e&&r.parentIds&&r.parentIds.some(i=>t.parentIds.includes(i)))}searchMembers(e){const t=e.toLowerCase();return this.members.filter(r=>r.name.toLowerCase().includes(t)||r.profession&&r.profession.toLowerCase().includes(t)||r.birthPlace&&r.birthPlace.toLowerCase().includes(t)||r.gotra&&r.gotra.toLowerCase().includes(t))}getMembersByGeneration(e){return this.members.map(r=>({...r,generation:this.calculateGeneration(r.id)})).filter(r=>r.generation===e)}calculateGeneration(e,t=new Set){if(t.has(e))return 0;t.add(e);const r=this.getMember(e);if(!r||!r.parentIds||r.parentIds.length===0)return 1;const i=r.parentIds.map(s=>this.calculateGeneration(s,t));return Math.max(...i)+1}getStatistics(){const e=this.members.filter(i=>i.gender==="male").length,t=this.members.filter(i=>i.gender==="female").length,r=new Set(this.members.map(i=>this.calculateGeneration(i.id)));return{totalMembers:this.members.length,males:e,females:t,generations:r.size,alive:this.members.filter(i=>i.isAlive).length,deceased:this.members.filter(i=>!i.isAlive).length}}getRecentMembers(e=5){return[...this.members].sort((t,r)=>new Date(r.createdAt)-new Date(t.createdAt)).slice(0,e)}getUpcomingBirthdays(e=10){const t=new Date,r=t.getFullYear();return this.members.filter(s=>s.birthDate&&s.isAlive).map(s=>{const o=new Date(s.birthDate),c=new Date(r,o.getMonth(),o.getDate());c<t&&c.setFullYear(r+1);const l=Math.ceil((c-t)/(1e3*60*60*24));return{member:s,date:c.toLocaleDateString("en-IN",{month:"short",day:"numeric"}),daysUntil:l}}).sort((s,o)=>s.daysUntil-o.daysUntil).slice(0,e)}exportData(){return{members:this.members,relationships:this.relationships,exportDate:new Date().toISOString(),version:"1.0"}}importData(e){e.members&&Array.isArray(e.members)&&(this.members=e.members),e.relationships&&Array.isArray(e.relationships)&&(this.relationships=e.relationships),this.saveToStorage()}clearAllData(){this.members=[],this.relationships=[],this.saveToStorage()}saveToStorage(){try{localStorage.setItem("familyTreeMembers",JSON.stringify(this.members)),localStorage.setItem("familyTreeRelationships",JSON.stringify(this.relationships))}catch(e){console.error("Error saving to storage:",e)}}loadFromStorage(){try{const e=localStorage.getItem("familyTreeMembers"),t=localStorage.getItem("familyTreeRelationships");e&&(this.members=JSON.parse(e)),t&&(this.relationships=JSON.parse(t))}catch(e){console.error("Error loading from storage:",e)}}generateId(){return`${Date.now()}-${Math.random().toString(36).substr(2,9)}`}}function Ns(n,e){return n==null||e==null?NaN:n<e?-1:n>e?1:n>=e?0:NaN}function h_(n,e){return n==null||e==null?NaN:e<n?-1:e>n?1:e>=n?0:NaN}function Vc(n){let e,t,r;n.length!==2?(e=Ns,t=(c,l)=>Ns(n(c),l),r=(c,l)=>n(c)-l):(e=n===Ns||n===h_?n:d_,t=n,r=n);function i(c,l,u=0,d=c.length){if(u<d){if(e(l,l)!==0)return d;do{const m=u+d>>>1;t(c[m],l)<0?u=m+1:d=m}while(u<d)}return u}function s(c,l,u=0,d=c.length){if(u<d){if(e(l,l)!==0)return d;do{const m=u+d>>>1;t(c[m],l)<=0?u=m+1:d=m}while(u<d)}return u}function o(c,l,u=0,d=c.length){const m=i(c,l,u,d-1);return m>u&&r(c[m-1],l)>-r(c[m],l)?m-1:m}return{left:i,center:o,right:s}}function d_(){return 0}function f_(n){return n===null?NaN:+n}const m_=Vc(Ns),p_=m_.right;Vc(f_).center;const g_=Math.sqrt(50),__=Math.sqrt(10),y_=Math.sqrt(2);function yf(n,e,t){const r=(e-n)/Math.max(0,t),i=Math.floor(Math.log10(r)),s=r/Math.pow(10,i),o=s>=g_?10:s>=__?5:s>=y_?2:1;let c,l,u;return i<0?(u=Math.pow(10,-i)/o,c=Math.round(n*u),l=Math.round(e*u),c/u<n&&++c,l/u>e&&--l,u=-u):(u=Math.pow(10,i)*o,c=Math.round(n/u),l=Math.round(e/u),c*u<n&&++c,l*u>e&&--l),l<c&&.5<=t&&t<2?yf(n,e,t*2):[c,l,u]}function Xu(n,e,t){return e=+e,n=+n,t=+t,yf(n,e,t)[2]}function Ju(n,e,t){e=+e,n=+n,t=+t;const r=e<n,i=r?Xu(e,n,t):Xu(n,e,t);return(r?-1:1)*(i<0?1/-i:i)}function v_(n,e){let t;if(e===void 0)for(const r of n)r!=null&&(t>r||t===void 0&&r>=r)&&(t=r);else{let r=-1;for(let i of n)(i=e(i,++r,n))!=null&&(t>i||t===void 0&&i>=i)&&(t=i)}return t}function w_(n){return n}var T_=3,Zu=1e-6;function E_(n){return"translate("+n+",0)"}function I_(n){return e=>+n(e)}function b_(n,e){return e=Math.max(0,n.bandwidth()-e*2)/2,n.round()&&(e=Math.round(e)),t=>+n(t)+e}function A_(){return!this.__axis}function S_(n,e){var t=[],r=null,i=null,s=6,o=6,c=3,l=typeof window<"u"&&window.devicePixelRatio>1?0:.5,u=1,d="y",m=E_;function p(_){var S=r??(e.ticks?e.ticks.apply(e,t):e.domain()),P=i??(e.tickFormat?e.tickFormat.apply(e,t):w_),k=Math.max(s,0)+c,N=e.range(),L=+N[0]+l,B=+N[N.length-1]+l,H=(e.bandwidth?b_:I_)(e.copy(),l),J=_.selection?_.selection():_,U=J.selectAll(".domain").data([null]),T=J.selectAll(".tick").data(S,e).order(),y=T.exit(),w=T.enter().append("g").attr("class","tick"),I=T.select("line"),E=T.select("text");U=U.merge(U.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),T=T.merge(w),I=I.merge(w.append("line").attr("stroke","currentColor").attr(d+"2",u*s)),E=E.merge(w.append("text").attr("fill","currentColor").attr(d,u*k).attr("dy","0.71em")),_!==J&&(U=U.transition(_),T=T.transition(_),I=I.transition(_),E=E.transition(_),y=y.transition(_).attr("opacity",Zu).attr("transform",function(b){return isFinite(b=H(b))?m(b+l):this.getAttribute("transform")}),w.attr("opacity",Zu).attr("transform",function(b){var v=this.parentNode.__axis;return m((v&&isFinite(v=v(b))?v:H(b))+l)})),y.remove(),U.attr("d",o?"M"+L+","+u*o+"V"+l+"H"+B+"V"+u*o:"M"+L+","+l+"H"+B),T.attr("opacity",1).attr("transform",function(b){return m(H(b)+l)}),I.attr(d+"2",u*s),E.attr(d,u*k).text(P),J.filter(A_).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor","middle"),J.each(function(){this.__axis=H})}return p.scale=function(_){return arguments.length?(e=_,p):e},p.ticks=function(){return t=Array.from(arguments),p},p.tickArguments=function(_){return arguments.length?(t=_==null?[]:Array.from(_),p):t.slice()},p.tickValues=function(_){return arguments.length?(r=_==null?null:Array.from(_),p):r&&r.slice()},p.tickFormat=function(_){return arguments.length?(i=_,p):i},p.tickSize=function(_){return arguments.length?(s=o=+_,p):s},p.tickSizeInner=function(_){return arguments.length?(s=+_,p):s},p.tickSizeOuter=function(_){return arguments.length?(o=+_,p):o},p.tickPadding=function(_){return arguments.length?(c=+_,p):c},p.offset=function(_){return arguments.length?(l=+_,p):l},p}function R_(n){return S_(T_,n)}var C_={value:()=>{}};function Lc(){for(var n=0,e=arguments.length,t={},r;n<e;++n){if(!(r=arguments[n]+"")||r in t||/[\s.]/.test(r))throw new Error("illegal type: "+r);t[r]=[]}return new Ms(t)}function Ms(n){this._=n}function P_(n,e){return n.trim().split(/^|\s+/).map(function(t){var r="",i=t.indexOf(".");if(i>=0&&(r=t.slice(i+1),t=t.slice(0,i)),t&&!e.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:r}})}Ms.prototype=Lc.prototype={constructor:Ms,on:function(n,e){var t=this._,r=P_(n+"",t),i,s=-1,o=r.length;if(arguments.length<2){for(;++s<o;)if((i=(n=r[s]).type)&&(i=k_(t[i],n.name)))return i;return}if(e!=null&&typeof e!="function")throw new Error("invalid callback: "+e);for(;++s<o;)if(i=(n=r[s]).type)t[i]=eh(t[i],n.name,e);else if(e==null)for(i in t)t[i]=eh(t[i],n.name,null);return this},copy:function(){var n={},e=this._;for(var t in e)n[t]=e[t].slice();return new Ms(n)},call:function(n,e){if((i=arguments.length-2)>0)for(var t=new Array(i),r=0,i,s;r<i;++r)t[r]=arguments[r+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(s=this._[n],r=0,i=s.length;r<i;++r)s[r].value.apply(e,t)},apply:function(n,e,t){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(e,t)}};function k_(n,e){for(var t=0,r=n.length,i;t<r;++t)if((i=n[t]).name===e)return i.value}function eh(n,e,t){for(var r=0,i=n.length;r<i;++r)if(n[r].name===e){n[r]=C_,n=n.slice(0,r).concat(n.slice(r+1));break}return t!=null&&n.push({name:e,value:t}),n}var Wa="http://www.w3.org/1999/xhtml";const th={svg:"http://www.w3.org/2000/svg",xhtml:Wa,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function So(n){var e=n+="",t=e.indexOf(":");return t>=0&&(e=n.slice(0,t))!=="xmlns"&&(n=n.slice(t+1)),th.hasOwnProperty(e)?{space:th[e],local:n}:n}function D_(n){return function(){var e=this.ownerDocument,t=this.namespaceURI;return t===Wa&&e.documentElement.namespaceURI===Wa?e.createElement(n):e.createElementNS(t,n)}}function x_(n){return function(){return this.ownerDocument.createElementNS(n.space,n.local)}}function vf(n){var e=So(n);return(e.local?x_:D_)(e)}function N_(){}function Oc(n){return n==null?N_:function(){return this.querySelector(n)}}function M_(n){typeof n!="function"&&(n=Oc(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=new Array(o),l,u,d=0;d<o;++d)(l=s[d])&&(u=n.call(l,l.__data__,d,s))&&("__data__"in l&&(u.__data__=l.__data__),c[d]=u);return new at(r,this._parents)}function V_(n){return n==null?[]:Array.isArray(n)?n:Array.from(n)}function L_(){return[]}function wf(n){return n==null?L_:function(){return this.querySelectorAll(n)}}function O_(n){return function(){return V_(n.apply(this,arguments))}}function U_(n){typeof n=="function"?n=O_(n):n=wf(n);for(var e=this._groups,t=e.length,r=[],i=[],s=0;s<t;++s)for(var o=e[s],c=o.length,l,u=0;u<c;++u)(l=o[u])&&(r.push(n.call(l,l.__data__,u,o)),i.push(l));return new at(r,i)}function Tf(n){return function(){return this.matches(n)}}function Ef(n){return function(e){return e.matches(n)}}var F_=Array.prototype.find;function B_(n){return function(){return F_.call(this.children,n)}}function $_(){return this.firstElementChild}function z_(n){return this.select(n==null?$_:B_(typeof n=="function"?n:Ef(n)))}var q_=Array.prototype.filter;function H_(){return Array.from(this.children)}function j_(n){return function(){return q_.call(this.children,n)}}function G_(n){return this.selectAll(n==null?H_:j_(typeof n=="function"?n:Ef(n)))}function W_(n){typeof n!="function"&&(n=Tf(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=[],l,u=0;u<o;++u)(l=s[u])&&n.call(l,l.__data__,u,s)&&c.push(l);return new at(r,this._parents)}function If(n){return new Array(n.length)}function K_(){return new at(this._enter||this._groups.map(If),this._parents)}function Qs(n,e){this.ownerDocument=n.ownerDocument,this.namespaceURI=n.namespaceURI,this._next=null,this._parent=n,this.__data__=e}Qs.prototype={constructor:Qs,appendChild:function(n){return this._parent.insertBefore(n,this._next)},insertBefore:function(n,e){return this._parent.insertBefore(n,e)},querySelector:function(n){return this._parent.querySelector(n)},querySelectorAll:function(n){return this._parent.querySelectorAll(n)}};function Y_(n){return function(){return n}}function Q_(n,e,t,r,i,s){for(var o=0,c,l=e.length,u=s.length;o<u;++o)(c=e[o])?(c.__data__=s[o],r[o]=c):t[o]=new Qs(n,s[o]);for(;o<l;++o)(c=e[o])&&(i[o]=c)}function X_(n,e,t,r,i,s,o){var c,l,u=new Map,d=e.length,m=s.length,p=new Array(d),_;for(c=0;c<d;++c)(l=e[c])&&(p[c]=_=o.call(l,l.__data__,c,e)+"",u.has(_)?i[c]=l:u.set(_,l));for(c=0;c<m;++c)_=o.call(n,s[c],c,s)+"",(l=u.get(_))?(r[c]=l,l.__data__=s[c],u.delete(_)):t[c]=new Qs(n,s[c]);for(c=0;c<d;++c)(l=e[c])&&u.get(p[c])===l&&(i[c]=l)}function J_(n){return n.__data__}function Z_(n,e){if(!arguments.length)return Array.from(this,J_);var t=e?X_:Q_,r=this._parents,i=this._groups;typeof n!="function"&&(n=Y_(n));for(var s=i.length,o=new Array(s),c=new Array(s),l=new Array(s),u=0;u<s;++u){var d=r[u],m=i[u],p=m.length,_=ey(n.call(d,d&&d.__data__,u,r)),S=_.length,P=c[u]=new Array(S),k=o[u]=new Array(S),N=l[u]=new Array(p);t(d,m,P,k,N,_,e);for(var L=0,B=0,H,J;L<S;++L)if(H=P[L]){for(L>=B&&(B=L+1);!(J=k[B])&&++B<S;);H._next=J||null}}return o=new at(o,r),o._enter=c,o._exit=l,o}function ey(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function ty(){return new at(this._exit||this._groups.map(If),this._parents)}function ny(n,e,t){var r=this.enter(),i=this,s=this.exit();return typeof n=="function"?(r=n(r),r&&(r=r.selection())):r=r.append(n+""),e!=null&&(i=e(i),i&&(i=i.selection())),t==null?s.remove():t(s),r&&i?r.merge(i).order():i}function ry(n){for(var e=n.selection?n.selection():n,t=this._groups,r=e._groups,i=t.length,s=r.length,o=Math.min(i,s),c=new Array(i),l=0;l<o;++l)for(var u=t[l],d=r[l],m=u.length,p=c[l]=new Array(m),_,S=0;S<m;++S)(_=u[S]||d[S])&&(p[S]=_);for(;l<i;++l)c[l]=t[l];return new at(c,this._parents)}function iy(){for(var n=this._groups,e=-1,t=n.length;++e<t;)for(var r=n[e],i=r.length-1,s=r[i],o;--i>=0;)(o=r[i])&&(s&&o.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(o,s),s=o);return this}function sy(n){n||(n=oy);function e(m,p){return m&&p?n(m.__data__,p.__data__):!m-!p}for(var t=this._groups,r=t.length,i=new Array(r),s=0;s<r;++s){for(var o=t[s],c=o.length,l=i[s]=new Array(c),u,d=0;d<c;++d)(u=o[d])&&(l[d]=u);l.sort(e)}return new at(i,this._parents).order()}function oy(n,e){return n<e?-1:n>e?1:n>=e?0:NaN}function ay(){var n=arguments[0];return arguments[0]=this,n.apply(null,arguments),this}function cy(){return Array.from(this)}function ly(){for(var n=this._groups,e=0,t=n.length;e<t;++e)for(var r=n[e],i=0,s=r.length;i<s;++i){var o=r[i];if(o)return o}return null}function uy(){let n=0;for(const e of this)++n;return n}function hy(){return!this.node()}function dy(n){for(var e=this._groups,t=0,r=e.length;t<r;++t)for(var i=e[t],s=0,o=i.length,c;s<o;++s)(c=i[s])&&n.call(c,c.__data__,s,i);return this}function fy(n){return function(){this.removeAttribute(n)}}function my(n){return function(){this.removeAttributeNS(n.space,n.local)}}function py(n,e){return function(){this.setAttribute(n,e)}}function gy(n,e){return function(){this.setAttributeNS(n.space,n.local,e)}}function _y(n,e){return function(){var t=e.apply(this,arguments);t==null?this.removeAttribute(n):this.setAttribute(n,t)}}function yy(n,e){return function(){var t=e.apply(this,arguments);t==null?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,t)}}function vy(n,e){var t=So(n);if(arguments.length<2){var r=this.node();return t.local?r.getAttributeNS(t.space,t.local):r.getAttribute(t)}return this.each((e==null?t.local?my:fy:typeof e=="function"?t.local?yy:_y:t.local?gy:py)(t,e))}function bf(n){return n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView}function wy(n){return function(){this.style.removeProperty(n)}}function Ty(n,e,t){return function(){this.style.setProperty(n,e,t)}}function Ey(n,e,t){return function(){var r=e.apply(this,arguments);r==null?this.style.removeProperty(n):this.style.setProperty(n,r,t)}}function Iy(n,e,t){return arguments.length>1?this.each((e==null?wy:typeof e=="function"?Ey:Ty)(n,e,t??"")):Sr(this.node(),n)}function Sr(n,e){return n.style.getPropertyValue(e)||bf(n).getComputedStyle(n,null).getPropertyValue(e)}function by(n){return function(){delete this[n]}}function Ay(n,e){return function(){this[n]=e}}function Sy(n,e){return function(){var t=e.apply(this,arguments);t==null?delete this[n]:this[n]=t}}function Ry(n,e){return arguments.length>1?this.each((e==null?by:typeof e=="function"?Sy:Ay)(n,e)):this.node()[n]}function Af(n){return n.trim().split(/^|\s+/)}function Uc(n){return n.classList||new Sf(n)}function Sf(n){this._node=n,this._names=Af(n.getAttribute("class")||"")}Sf.prototype={add:function(n){var e=this._names.indexOf(n);e<0&&(this._names.push(n),this._node.setAttribute("class",this._names.join(" ")))},remove:function(n){var e=this._names.indexOf(n);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(n){return this._names.indexOf(n)>=0}};function Rf(n,e){for(var t=Uc(n),r=-1,i=e.length;++r<i;)t.add(e[r])}function Cf(n,e){for(var t=Uc(n),r=-1,i=e.length;++r<i;)t.remove(e[r])}function Cy(n){return function(){Rf(this,n)}}function Py(n){return function(){Cf(this,n)}}function ky(n,e){return function(){(e.apply(this,arguments)?Rf:Cf)(this,n)}}function Dy(n,e){var t=Af(n+"");if(arguments.length<2){for(var r=Uc(this.node()),i=-1,s=t.length;++i<s;)if(!r.contains(t[i]))return!1;return!0}return this.each((typeof e=="function"?ky:e?Cy:Py)(t,e))}function xy(){this.textContent=""}function Ny(n){return function(){this.textContent=n}}function My(n){return function(){var e=n.apply(this,arguments);this.textContent=e??""}}function Vy(n){return arguments.length?this.each(n==null?xy:(typeof n=="function"?My:Ny)(n)):this.node().textContent}function Ly(){this.innerHTML=""}function Oy(n){return function(){this.innerHTML=n}}function Uy(n){return function(){var e=n.apply(this,arguments);this.innerHTML=e??""}}function Fy(n){return arguments.length?this.each(n==null?Ly:(typeof n=="function"?Uy:Oy)(n)):this.node().innerHTML}function By(){this.nextSibling&&this.parentNode.appendChild(this)}function $y(){return this.each(By)}function zy(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function qy(){return this.each(zy)}function Hy(n){var e=typeof n=="function"?n:vf(n);return this.select(function(){return this.appendChild(e.apply(this,arguments))})}function jy(){return null}function Gy(n,e){var t=typeof n=="function"?n:vf(n),r=e==null?jy:typeof e=="function"?e:Oc(e);return this.select(function(){return this.insertBefore(t.apply(this,arguments),r.apply(this,arguments)||null)})}function Wy(){var n=this.parentNode;n&&n.removeChild(this)}function Ky(){return this.each(Wy)}function Yy(){var n=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(n,this.nextSibling):n}function Qy(){var n=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(n,this.nextSibling):n}function Xy(n){return this.select(n?Qy:Yy)}function Jy(n){return arguments.length?this.property("__data__",n):this.node().__data__}function Zy(n){return function(e){n.call(this,e,this.__data__)}}function ev(n){return n.trim().split(/^|\s+/).map(function(e){var t="",r=e.indexOf(".");return r>=0&&(t=e.slice(r+1),e=e.slice(0,r)),{type:e,name:t}})}function tv(n){return function(){var e=this.__on;if(e){for(var t=0,r=-1,i=e.length,s;t<i;++t)s=e[t],(!n.type||s.type===n.type)&&s.name===n.name?this.removeEventListener(s.type,s.listener,s.options):e[++r]=s;++r?e.length=r:delete this.__on}}}function nv(n,e,t){return function(){var r=this.__on,i,s=Zy(e);if(r){for(var o=0,c=r.length;o<c;++o)if((i=r[o]).type===n.type&&i.name===n.name){this.removeEventListener(i.type,i.listener,i.options),this.addEventListener(i.type,i.listener=s,i.options=t),i.value=e;return}}this.addEventListener(n.type,s,t),i={type:n.type,name:n.name,value:e,listener:s,options:t},r?r.push(i):this.__on=[i]}}function rv(n,e,t){var r=ev(n+""),i,s=r.length,o;if(arguments.length<2){var c=this.node().__on;if(c){for(var l=0,u=c.length,d;l<u;++l)for(i=0,d=c[l];i<s;++i)if((o=r[i]).type===d.type&&o.name===d.name)return d.value}return}for(c=e?nv:tv,i=0;i<s;++i)this.each(c(r[i],e,t));return this}function Pf(n,e,t){var r=bf(n),i=r.CustomEvent;typeof i=="function"?i=new i(e,t):(i=r.document.createEvent("Event"),t?(i.initEvent(e,t.bubbles,t.cancelable),i.detail=t.detail):i.initEvent(e,!1,!1)),n.dispatchEvent(i)}function iv(n,e){return function(){return Pf(this,n,e)}}function sv(n,e){return function(){return Pf(this,n,e.apply(this,arguments))}}function ov(n,e){return this.each((typeof e=="function"?sv:iv)(n,e))}function*av(){for(var n=this._groups,e=0,t=n.length;e<t;++e)for(var r=n[e],i=0,s=r.length,o;i<s;++i)(o=r[i])&&(yield o)}var kf=[null];function at(n,e){this._groups=n,this._parents=e}function Yi(){return new at([[document.documentElement]],kf)}function cv(){return this}at.prototype=Yi.prototype={constructor:at,select:M_,selectAll:U_,selectChild:z_,selectChildren:G_,filter:W_,data:Z_,enter:K_,exit:ty,join:ny,merge:ry,selection:cv,order:iy,sort:sy,call:ay,nodes:cy,node:ly,size:uy,empty:hy,each:dy,attr:vy,style:Iy,property:Ry,classed:Dy,text:Vy,html:Fy,raise:$y,lower:qy,append:Hy,insert:Gy,remove:Ky,clone:Xy,datum:Jy,on:rv,dispatch:ov,[Symbol.iterator]:av};function St(n){return typeof n=="string"?new at([[document.querySelector(n)]],[document.documentElement]):new at([[n]],kf)}function lv(n){let e;for(;e=n.sourceEvent;)n=e;return n}function On(n,e){if(n=lv(n),e===void 0&&(e=n.currentTarget),e){var t=e.ownerSVGElement||e;if(t.createSVGPoint){var r=t.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(e.getScreenCTM().inverse()),[r.x,r.y]}if(e.getBoundingClientRect){var i=e.getBoundingClientRect();return[n.clientX-i.left-e.clientLeft,n.clientY-i.top-e.clientTop]}}return[n.pageX,n.pageY]}const Ka={capture:!0,passive:!1};function Ya(n){n.preventDefault(),n.stopImmediatePropagation()}function uv(n){var e=n.document.documentElement,t=St(n).on("dragstart.drag",Ya,Ka);"onselectstart"in e?t.on("selectstart.drag",Ya,Ka):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function hv(n,e){var t=n.document.documentElement,r=St(n).on("dragstart.drag",null);e&&(r.on("click.drag",Ya,Ka),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in t?r.on("selectstart.drag",null):(t.style.MozUserSelect=t.__noselect,delete t.__noselect)}function Fc(n,e,t){n.prototype=e.prototype=t,t.constructor=n}function Df(n,e){var t=Object.create(n.prototype);for(var r in e)t[r]=e[r];return t}function Qi(){}var Pi=.7,Xs=1/Pi,vr="\\s*([+-]?\\d+)\\s*",ki="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Ct="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",dv=/^#([0-9a-f]{3,8})$/,fv=new RegExp(`^rgb\\(${vr},${vr},${vr}\\)$`),mv=new RegExp(`^rgb\\(${Ct},${Ct},${Ct}\\)$`),pv=new RegExp(`^rgba\\(${vr},${vr},${vr},${ki}\\)$`),gv=new RegExp(`^rgba\\(${Ct},${Ct},${Ct},${ki}\\)$`),_v=new RegExp(`^hsl\\(${ki},${Ct},${Ct}\\)$`),yv=new RegExp(`^hsla\\(${ki},${Ct},${Ct},${ki}\\)$`),nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Fc(Qi,Kn,{copy(n){return Object.assign(new this.constructor,this,n)},displayable(){return this.rgb().displayable()},hex:rh,formatHex:rh,formatHex8:vv,formatHsl:wv,formatRgb:ih,toString:ih});function rh(){return this.rgb().formatHex()}function vv(){return this.rgb().formatHex8()}function wv(){return xf(this).formatHsl()}function ih(){return this.rgb().formatRgb()}function Kn(n){var e,t;return n=(n+"").trim().toLowerCase(),(e=dv.exec(n))?(t=e[1].length,e=parseInt(e[1],16),t===6?sh(e):t===3?new nt(e>>8&15|e>>4&240,e>>4&15|e&240,(e&15)<<4|e&15,1):t===8?Ts(e>>24&255,e>>16&255,e>>8&255,(e&255)/255):t===4?Ts(e>>12&15|e>>8&240,e>>8&15|e>>4&240,e>>4&15|e&240,((e&15)<<4|e&15)/255):null):(e=fv.exec(n))?new nt(e[1],e[2],e[3],1):(e=mv.exec(n))?new nt(e[1]*255/100,e[2]*255/100,e[3]*255/100,1):(e=pv.exec(n))?Ts(e[1],e[2],e[3],e[4]):(e=gv.exec(n))?Ts(e[1]*255/100,e[2]*255/100,e[3]*255/100,e[4]):(e=_v.exec(n))?ch(e[1],e[2]/100,e[3]/100,1):(e=yv.exec(n))?ch(e[1],e[2]/100,e[3]/100,e[4]):nh.hasOwnProperty(n)?sh(nh[n]):n==="transparent"?new nt(NaN,NaN,NaN,0):null}function sh(n){return new nt(n>>16&255,n>>8&255,n&255,1)}function Ts(n,e,t,r){return r<=0&&(n=e=t=NaN),new nt(n,e,t,r)}function Tv(n){return n instanceof Qi||(n=Kn(n)),n?(n=n.rgb(),new nt(n.r,n.g,n.b,n.opacity)):new nt}function Qa(n,e,t,r){return arguments.length===1?Tv(n):new nt(n,e,t,r??1)}function nt(n,e,t,r){this.r=+n,this.g=+e,this.b=+t,this.opacity=+r}Fc(nt,Qa,Df(Qi,{brighter(n){return n=n==null?Xs:Math.pow(Xs,n),new nt(this.r*n,this.g*n,this.b*n,this.opacity)},darker(n){return n=n==null?Pi:Math.pow(Pi,n),new nt(this.r*n,this.g*n,this.b*n,this.opacity)},rgb(){return this},clamp(){return new nt(qn(this.r),qn(this.g),qn(this.b),Js(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:oh,formatHex:oh,formatHex8:Ev,formatRgb:ah,toString:ah}));function oh(){return`#${Bn(this.r)}${Bn(this.g)}${Bn(this.b)}`}function Ev(){return`#${Bn(this.r)}${Bn(this.g)}${Bn(this.b)}${Bn((isNaN(this.opacity)?1:this.opacity)*255)}`}function ah(){const n=Js(this.opacity);return`${n===1?"rgb(":"rgba("}${qn(this.r)}, ${qn(this.g)}, ${qn(this.b)}${n===1?")":`, ${n})`}`}function Js(n){return isNaN(n)?1:Math.max(0,Math.min(1,n))}function qn(n){return Math.max(0,Math.min(255,Math.round(n)||0))}function Bn(n){return n=qn(n),(n<16?"0":"")+n.toString(16)}function ch(n,e,t,r){return r<=0?n=e=t=NaN:t<=0||t>=1?n=e=NaN:e<=0&&(n=NaN),new mt(n,e,t,r)}function xf(n){if(n instanceof mt)return new mt(n.h,n.s,n.l,n.opacity);if(n instanceof Qi||(n=Kn(n)),!n)return new mt;if(n instanceof mt)return n;n=n.rgb();var e=n.r/255,t=n.g/255,r=n.b/255,i=Math.min(e,t,r),s=Math.max(e,t,r),o=NaN,c=s-i,l=(s+i)/2;return c?(e===s?o=(t-r)/c+(t<r)*6:t===s?o=(r-e)/c+2:o=(e-t)/c+4,c/=l<.5?s+i:2-s-i,o*=60):c=l>0&&l<1?0:o,new mt(o,c,l,n.opacity)}function Iv(n,e,t,r){return arguments.length===1?xf(n):new mt(n,e,t,r??1)}function mt(n,e,t,r){this.h=+n,this.s=+e,this.l=+t,this.opacity=+r}Fc(mt,Iv,Df(Qi,{brighter(n){return n=n==null?Xs:Math.pow(Xs,n),new mt(this.h,this.s,this.l*n,this.opacity)},darker(n){return n=n==null?Pi:Math.pow(Pi,n),new mt(this.h,this.s,this.l*n,this.opacity)},rgb(){var n=this.h%360+(this.h<0)*360,e=isNaN(n)||isNaN(this.s)?0:this.s,t=this.l,r=t+(t<.5?t:1-t)*e,i=2*t-r;return new nt(wa(n>=240?n-240:n+120,i,r),wa(n,i,r),wa(n<120?n+240:n-120,i,r),this.opacity)},clamp(){return new mt(lh(this.h),Es(this.s),Es(this.l),Js(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const n=Js(this.opacity);return`${n===1?"hsl(":"hsla("}${lh(this.h)}, ${Es(this.s)*100}%, ${Es(this.l)*100}%${n===1?")":`, ${n})`}`}}));function lh(n){return n=(n||0)%360,n<0?n+360:n}function Es(n){return Math.max(0,Math.min(1,n||0))}function wa(n,e,t){return(n<60?e+(t-e)*n/60:n<180?t:n<240?e+(t-e)*(240-n)/60:e)*255}const Bc=n=>()=>n;function bv(n,e){return function(t){return n+t*e}}function Av(n,e,t){return n=Math.pow(n,t),e=Math.pow(e,t)-n,t=1/t,function(r){return Math.pow(n+r*e,t)}}function Sv(n){return(n=+n)==1?Nf:function(e,t){return t-e?Av(e,t,n):Bc(isNaN(e)?t:e)}}function Nf(n,e){var t=e-n;return t?bv(n,t):Bc(isNaN(n)?e:n)}const Zs=function n(e){var t=Sv(e);function r(i,s){var o=t((i=Qa(i)).r,(s=Qa(s)).r),c=t(i.g,s.g),l=t(i.b,s.b),u=Nf(i.opacity,s.opacity);return function(d){return i.r=o(d),i.g=c(d),i.b=l(d),i.opacity=u(d),i+""}}return r.gamma=n,r}(1);function Rv(n,e){e||(e=[]);var t=n?Math.min(e.length,n.length):0,r=e.slice(),i;return function(s){for(i=0;i<t;++i)r[i]=n[i]*(1-s)+e[i]*s;return r}}function Cv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Pv(n,e){var t=e?e.length:0,r=n?Math.min(t,n.length):0,i=new Array(r),s=new Array(t),o;for(o=0;o<r;++o)i[o]=$c(n[o],e[o]);for(;o<t;++o)s[o]=e[o];return function(c){for(o=0;o<r;++o)s[o]=i[o](c);return s}}function kv(n,e){var t=new Date;return n=+n,e=+e,function(r){return t.setTime(n*(1-r)+e*r),t}}function ft(n,e){return n=+n,e=+e,function(t){return n*(1-t)+e*t}}function Dv(n,e){var t={},r={},i;(n===null||typeof n!="object")&&(n={}),(e===null||typeof e!="object")&&(e={});for(i in e)i in n?t[i]=$c(n[i],e[i]):r[i]=e[i];return function(s){for(i in t)r[i]=t[i](s);return r}}var Xa=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Ta=new RegExp(Xa.source,"g");function xv(n){return function(){return n}}function Nv(n){return function(e){return n(e)+""}}function Mf(n,e){var t=Xa.lastIndex=Ta.lastIndex=0,r,i,s,o=-1,c=[],l=[];for(n=n+"",e=e+"";(r=Xa.exec(n))&&(i=Ta.exec(e));)(s=i.index)>t&&(s=e.slice(t,s),c[o]?c[o]+=s:c[++o]=s),(r=r[0])===(i=i[0])?c[o]?c[o]+=i:c[++o]=i:(c[++o]=null,l.push({i:o,x:ft(r,i)})),t=Ta.lastIndex;return t<e.length&&(s=e.slice(t),c[o]?c[o]+=s:c[++o]=s),c.length<2?l[0]?Nv(l[0].x):xv(e):(e=l.length,function(u){for(var d=0,m;d<e;++d)c[(m=l[d]).i]=m.x(u);return c.join("")})}function $c(n,e){var t=typeof e,r;return e==null||t==="boolean"?Bc(e):(t==="number"?ft:t==="string"?(r=Kn(e))?(e=r,Zs):Mf:e instanceof Kn?Zs:e instanceof Date?kv:Cv(e)?Rv:Array.isArray(e)?Pv:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?Dv:ft)(n,e)}function Mv(n,e){return n=+n,e=+e,function(t){return Math.round(n*(1-t)+e*t)}}var uh=180/Math.PI,Ja={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Vf(n,e,t,r,i,s){var o,c,l;return(o=Math.sqrt(n*n+e*e))&&(n/=o,e/=o),(l=n*t+e*r)&&(t-=n*l,r-=e*l),(c=Math.sqrt(t*t+r*r))&&(t/=c,r/=c,l/=c),n*r<e*t&&(n=-n,e=-e,l=-l,o=-o),{translateX:i,translateY:s,rotate:Math.atan2(e,n)*uh,skewX:Math.atan(l)*uh,scaleX:o,scaleY:c}}var Is;function Vv(n){const e=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(n+"");return e.isIdentity?Ja:Vf(e.a,e.b,e.c,e.d,e.e,e.f)}function Lv(n){return n==null||(Is||(Is=document.createElementNS("http://www.w3.org/2000/svg","g")),Is.setAttribute("transform",n),!(n=Is.transform.baseVal.consolidate()))?Ja:(n=n.matrix,Vf(n.a,n.b,n.c,n.d,n.e,n.f))}function Lf(n,e,t,r){function i(u){return u.length?u.pop()+" ":""}function s(u,d,m,p,_,S){if(u!==m||d!==p){var P=_.push("translate(",null,e,null,t);S.push({i:P-4,x:ft(u,m)},{i:P-2,x:ft(d,p)})}else(m||p)&&_.push("translate("+m+e+p+t)}function o(u,d,m,p){u!==d?(u-d>180?d+=360:d-u>180&&(u+=360),p.push({i:m.push(i(m)+"rotate(",null,r)-2,x:ft(u,d)})):d&&m.push(i(m)+"rotate("+d+r)}function c(u,d,m,p){u!==d?p.push({i:m.push(i(m)+"skewX(",null,r)-2,x:ft(u,d)}):d&&m.push(i(m)+"skewX("+d+r)}function l(u,d,m,p,_,S){if(u!==m||d!==p){var P=_.push(i(_)+"scale(",null,",",null,")");S.push({i:P-4,x:ft(u,m)},{i:P-2,x:ft(d,p)})}else(m!==1||p!==1)&&_.push(i(_)+"scale("+m+","+p+")")}return function(u,d){var m=[],p=[];return u=n(u),d=n(d),s(u.translateX,u.translateY,d.translateX,d.translateY,m,p),o(u.rotate,d.rotate,m,p),c(u.skewX,d.skewX,m,p),l(u.scaleX,u.scaleY,d.scaleX,d.scaleY,m,p),u=d=null,function(_){for(var S=-1,P=p.length,k;++S<P;)m[(k=p[S]).i]=k.x(_);return m.join("")}}}var Ov=Lf(Vv,"px, ","px)","deg)"),Uv=Lf(Lv,", ",")",")"),Fv=1e-12;function hh(n){return((n=Math.exp(n))+1/n)/2}function Bv(n){return((n=Math.exp(n))-1/n)/2}function $v(n){return((n=Math.exp(2*n))-1)/(n+1)}const zv=function n(e,t,r){function i(s,o){var c=s[0],l=s[1],u=s[2],d=o[0],m=o[1],p=o[2],_=d-c,S=m-l,P=_*_+S*S,k,N;if(P<Fv)N=Math.log(p/u)/e,k=function(T){return[c+T*_,l+T*S,u*Math.exp(e*T*N)]};else{var L=Math.sqrt(P),B=(p*p-u*u+r*P)/(2*u*t*L),H=(p*p-u*u-r*P)/(2*p*t*L),J=Math.log(Math.sqrt(B*B+1)-B),U=Math.log(Math.sqrt(H*H+1)-H);N=(U-J)/e,k=function(T){var y=T*N,w=hh(J),I=u/(t*L)*(w*$v(e*y+J)-Bv(J));return[c+I*_,l+I*S,u*w/hh(e*y+J)]}}return k.duration=N*1e3*e/Math.SQRT2,k}return i.rho=function(s){var o=Math.max(.001,+s),c=o*o,l=c*c;return n(o,c,l)},i}(Math.SQRT2,2,4);var Rr=0,mi=0,ai=0,Of=1e3,eo,pi,to=0,Yn=0,Ro=0,Di=typeof performance=="object"&&performance.now?performance:Date,Uf=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function zc(){return Yn||(Uf(qv),Yn=Di.now()+Ro)}function qv(){Yn=0}function no(){this._call=this._time=this._next=null}no.prototype=Ff.prototype={constructor:no,restart:function(n,e,t){if(typeof n!="function")throw new TypeError("callback is not a function");t=(t==null?zc():+t)+(e==null?0:+e),!this._next&&pi!==this&&(pi?pi._next=this:eo=this,pi=this),this._call=n,this._time=t,Za()},stop:function(){this._call&&(this._call=null,this._time=1/0,Za())}};function Ff(n,e,t){var r=new no;return r.restart(n,e,t),r}function Hv(){zc(),++Rr;for(var n=eo,e;n;)(e=Yn-n._time)>=0&&n._call.call(void 0,e),n=n._next;--Rr}function dh(){Yn=(to=Di.now())+Ro,Rr=mi=0;try{Hv()}finally{Rr=0,Gv(),Yn=0}}function jv(){var n=Di.now(),e=n-to;e>Of&&(Ro-=e,to=n)}function Gv(){for(var n,e=eo,t,r=1/0;e;)e._call?(r>e._time&&(r=e._time),n=e,e=e._next):(t=e._next,e._next=null,e=n?n._next=t:eo=t);pi=n,Za(r)}function Za(n){if(!Rr){mi&&(mi=clearTimeout(mi));var e=n-Yn;e>24?(n<1/0&&(mi=setTimeout(dh,n-Di.now()-Ro)),ai&&(ai=clearInterval(ai))):(ai||(to=Di.now(),ai=setInterval(jv,Of)),Rr=1,Uf(dh))}}function fh(n,e,t){var r=new no;return e=e==null?0:+e,r.restart(i=>{r.stop(),n(i+e)},e,t),r}var Wv=Lc("start","end","cancel","interrupt"),Kv=[],Bf=0,mh=1,ec=2,Vs=3,ph=4,tc=5,Ls=6;function Co(n,e,t,r,i,s){var o=n.__transition;if(!o)n.__transition={};else if(t in o)return;Yv(n,t,{name:e,index:r,group:i,on:Wv,tween:Kv,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:Bf})}function qc(n,e){var t=Et(n,e);if(t.state>Bf)throw new Error("too late; already scheduled");return t}function Lt(n,e){var t=Et(n,e);if(t.state>Vs)throw new Error("too late; already running");return t}function Et(n,e){var t=n.__transition;if(!t||!(t=t[e]))throw new Error("transition not found");return t}function Yv(n,e,t){var r=n.__transition,i;r[e]=t,t.timer=Ff(s,0,t.time);function s(u){t.state=mh,t.timer.restart(o,t.delay,t.time),t.delay<=u&&o(u-t.delay)}function o(u){var d,m,p,_;if(t.state!==mh)return l();for(d in r)if(_=r[d],_.name===t.name){if(_.state===Vs)return fh(o);_.state===ph?(_.state=Ls,_.timer.stop(),_.on.call("interrupt",n,n.__data__,_.index,_.group),delete r[d]):+d<e&&(_.state=Ls,_.timer.stop(),_.on.call("cancel",n,n.__data__,_.index,_.group),delete r[d])}if(fh(function(){t.state===Vs&&(t.state=ph,t.timer.restart(c,t.delay,t.time),c(u))}),t.state=ec,t.on.call("start",n,n.__data__,t.index,t.group),t.state===ec){for(t.state=Vs,i=new Array(p=t.tween.length),d=0,m=-1;d<p;++d)(_=t.tween[d].value.call(n,n.__data__,t.index,t.group))&&(i[++m]=_);i.length=m+1}}function c(u){for(var d=u<t.duration?t.ease.call(null,u/t.duration):(t.timer.restart(l),t.state=tc,1),m=-1,p=i.length;++m<p;)i[m].call(n,d);t.state===tc&&(t.on.call("end",n,n.__data__,t.index,t.group),l())}function l(){t.state=Ls,t.timer.stop(),delete r[e];for(var u in r)return;delete n.__transition}}function Os(n,e){var t=n.__transition,r,i,s=!0,o;if(t){e=e==null?null:e+"";for(o in t){if((r=t[o]).name!==e){s=!1;continue}i=r.state>ec&&r.state<tc,r.state=Ls,r.timer.stop(),r.on.call(i?"interrupt":"cancel",n,n.__data__,r.index,r.group),delete t[o]}s&&delete n.__transition}}function Qv(n){return this.each(function(){Os(this,n)})}function Xv(n,e){var t,r;return function(){var i=Lt(this,n),s=i.tween;if(s!==t){r=t=s;for(var o=0,c=r.length;o<c;++o)if(r[o].name===e){r=r.slice(),r.splice(o,1);break}}i.tween=r}}function Jv(n,e,t){var r,i;if(typeof t!="function")throw new Error;return function(){var s=Lt(this,n),o=s.tween;if(o!==r){i=(r=o).slice();for(var c={name:e,value:t},l=0,u=i.length;l<u;++l)if(i[l].name===e){i[l]=c;break}l===u&&i.push(c)}s.tween=i}}function Zv(n,e){var t=this._id;if(n+="",arguments.length<2){for(var r=Et(this.node(),t).tween,i=0,s=r.length,o;i<s;++i)if((o=r[i]).name===n)return o.value;return null}return this.each((e==null?Xv:Jv)(t,n,e))}function Hc(n,e,t){var r=n._id;return n.each(function(){var i=Lt(this,r);(i.value||(i.value={}))[e]=t.apply(this,arguments)}),function(i){return Et(i,r).value[e]}}function $f(n,e){var t;return(typeof e=="number"?ft:e instanceof Kn?Zs:(t=Kn(e))?(e=t,Zs):Mf)(n,e)}function ew(n){return function(){this.removeAttribute(n)}}function tw(n){return function(){this.removeAttributeNS(n.space,n.local)}}function nw(n,e,t){var r,i=t+"",s;return function(){var o=this.getAttribute(n);return o===i?null:o===r?s:s=e(r=o,t)}}function rw(n,e,t){var r,i=t+"",s;return function(){var o=this.getAttributeNS(n.space,n.local);return o===i?null:o===r?s:s=e(r=o,t)}}function iw(n,e,t){var r,i,s;return function(){var o,c=t(this),l;return c==null?void this.removeAttribute(n):(o=this.getAttribute(n),l=c+"",o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,c)))}}function sw(n,e,t){var r,i,s;return function(){var o,c=t(this),l;return c==null?void this.removeAttributeNS(n.space,n.local):(o=this.getAttributeNS(n.space,n.local),l=c+"",o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,c)))}}function ow(n,e){var t=So(n),r=t==="transform"?Uv:$f;return this.attrTween(n,typeof e=="function"?(t.local?sw:iw)(t,r,Hc(this,"attr."+n,e)):e==null?(t.local?tw:ew)(t):(t.local?rw:nw)(t,r,e))}function aw(n,e){return function(t){this.setAttribute(n,e.call(this,t))}}function cw(n,e){return function(t){this.setAttributeNS(n.space,n.local,e.call(this,t))}}function lw(n,e){var t,r;function i(){var s=e.apply(this,arguments);return s!==r&&(t=(r=s)&&cw(n,s)),t}return i._value=e,i}function uw(n,e){var t,r;function i(){var s=e.apply(this,arguments);return s!==r&&(t=(r=s)&&aw(n,s)),t}return i._value=e,i}function hw(n,e){var t="attr."+n;if(arguments.length<2)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;var r=So(n);return this.tween(t,(r.local?lw:uw)(r,e))}function dw(n,e){return function(){qc(this,n).delay=+e.apply(this,arguments)}}function fw(n,e){return e=+e,function(){qc(this,n).delay=e}}function mw(n){var e=this._id;return arguments.length?this.each((typeof n=="function"?dw:fw)(e,n)):Et(this.node(),e).delay}function pw(n,e){return function(){Lt(this,n).duration=+e.apply(this,arguments)}}function gw(n,e){return e=+e,function(){Lt(this,n).duration=e}}function _w(n){var e=this._id;return arguments.length?this.each((typeof n=="function"?pw:gw)(e,n)):Et(this.node(),e).duration}function yw(n,e){if(typeof e!="function")throw new Error;return function(){Lt(this,n).ease=e}}function vw(n){var e=this._id;return arguments.length?this.each(yw(e,n)):Et(this.node(),e).ease}function ww(n,e){return function(){var t=e.apply(this,arguments);if(typeof t!="function")throw new Error;Lt(this,n).ease=t}}function Tw(n){if(typeof n!="function")throw new Error;return this.each(ww(this._id,n))}function Ew(n){typeof n!="function"&&(n=Tf(n));for(var e=this._groups,t=e.length,r=new Array(t),i=0;i<t;++i)for(var s=e[i],o=s.length,c=r[i]=[],l,u=0;u<o;++u)(l=s[u])&&n.call(l,l.__data__,u,s)&&c.push(l);return new Kt(r,this._parents,this._name,this._id)}function Iw(n){if(n._id!==this._id)throw new Error;for(var e=this._groups,t=n._groups,r=e.length,i=t.length,s=Math.min(r,i),o=new Array(r),c=0;c<s;++c)for(var l=e[c],u=t[c],d=l.length,m=o[c]=new Array(d),p,_=0;_<d;++_)(p=l[_]||u[_])&&(m[_]=p);for(;c<r;++c)o[c]=e[c];return new Kt(o,this._parents,this._name,this._id)}function bw(n){return(n+"").trim().split(/^|\s+/).every(function(e){var t=e.indexOf(".");return t>=0&&(e=e.slice(0,t)),!e||e==="start"})}function Aw(n,e,t){var r,i,s=bw(e)?qc:Lt;return function(){var o=s(this,n),c=o.on;c!==r&&(i=(r=c).copy()).on(e,t),o.on=i}}function Sw(n,e){var t=this._id;return arguments.length<2?Et(this.node(),t).on.on(n):this.each(Aw(t,n,e))}function Rw(n){return function(){var e=this.parentNode;for(var t in this.__transition)if(+t!==n)return;e&&e.removeChild(this)}}function Cw(){return this.on("end.remove",Rw(this._id))}function Pw(n){var e=this._name,t=this._id;typeof n!="function"&&(n=Oc(n));for(var r=this._groups,i=r.length,s=new Array(i),o=0;o<i;++o)for(var c=r[o],l=c.length,u=s[o]=new Array(l),d,m,p=0;p<l;++p)(d=c[p])&&(m=n.call(d,d.__data__,p,c))&&("__data__"in d&&(m.__data__=d.__data__),u[p]=m,Co(u[p],e,t,p,u,Et(d,t)));return new Kt(s,this._parents,e,t)}function kw(n){var e=this._name,t=this._id;typeof n!="function"&&(n=wf(n));for(var r=this._groups,i=r.length,s=[],o=[],c=0;c<i;++c)for(var l=r[c],u=l.length,d,m=0;m<u;++m)if(d=l[m]){for(var p=n.call(d,d.__data__,m,l),_,S=Et(d,t),P=0,k=p.length;P<k;++P)(_=p[P])&&Co(_,e,t,P,p,S);s.push(p),o.push(d)}return new Kt(s,o,e,t)}var Dw=Yi.prototype.constructor;function xw(){return new Dw(this._groups,this._parents)}function Nw(n,e){var t,r,i;return function(){var s=Sr(this,n),o=(this.style.removeProperty(n),Sr(this,n));return s===o?null:s===t&&o===r?i:i=e(t=s,r=o)}}function zf(n){return function(){this.style.removeProperty(n)}}function Mw(n,e,t){var r,i=t+"",s;return function(){var o=Sr(this,n);return o===i?null:o===r?s:s=e(r=o,t)}}function Vw(n,e,t){var r,i,s;return function(){var o=Sr(this,n),c=t(this),l=c+"";return c==null&&(l=c=(this.style.removeProperty(n),Sr(this,n))),o===l?null:o===r&&l===i?s:(i=l,s=e(r=o,c))}}function Lw(n,e){var t,r,i,s="style."+e,o="end."+s,c;return function(){var l=Lt(this,n),u=l.on,d=l.value[s]==null?c||(c=zf(e)):void 0;(u!==t||i!==d)&&(r=(t=u).copy()).on(o,i=d),l.on=r}}function Ow(n,e,t){var r=(n+="")=="transform"?Ov:$f;return e==null?this.styleTween(n,Nw(n,r)).on("end.style."+n,zf(n)):typeof e=="function"?this.styleTween(n,Vw(n,r,Hc(this,"style."+n,e))).each(Lw(this._id,n)):this.styleTween(n,Mw(n,r,e),t).on("end.style."+n,null)}function Uw(n,e,t){return function(r){this.style.setProperty(n,e.call(this,r),t)}}function Fw(n,e,t){var r,i;function s(){var o=e.apply(this,arguments);return o!==i&&(r=(i=o)&&Uw(n,o,t)),r}return s._value=e,s}function Bw(n,e,t){var r="style."+(n+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(e==null)return this.tween(r,null);if(typeof e!="function")throw new Error;return this.tween(r,Fw(n,e,t??""))}function $w(n){return function(){this.textContent=n}}function zw(n){return function(){var e=n(this);this.textContent=e??""}}function qw(n){return this.tween("text",typeof n=="function"?zw(Hc(this,"text",n)):$w(n==null?"":n+""))}function Hw(n){return function(e){this.textContent=n.call(this,e)}}function jw(n){var e,t;function r(){var i=n.apply(this,arguments);return i!==t&&(e=(t=i)&&Hw(i)),e}return r._value=n,r}function Gw(n){var e="text";if(arguments.length<1)return(e=this.tween(e))&&e._value;if(n==null)return this.tween(e,null);if(typeof n!="function")throw new Error;return this.tween(e,jw(n))}function Ww(){for(var n=this._name,e=this._id,t=qf(),r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],c=o.length,l,u=0;u<c;++u)if(l=o[u]){var d=Et(l,e);Co(l,n,t,u,o,{time:d.time+d.delay+d.duration,delay:0,duration:d.duration,ease:d.ease})}return new Kt(r,this._parents,n,t)}function Kw(){var n,e,t=this,r=t._id,i=t.size();return new Promise(function(s,o){var c={value:o},l={value:function(){--i===0&&s()}};t.each(function(){var u=Lt(this,r),d=u.on;d!==n&&(e=(n=d).copy(),e._.cancel.push(c),e._.interrupt.push(c),e._.end.push(l)),u.on=e}),i===0&&s()})}var Yw=0;function Kt(n,e,t,r){this._groups=n,this._parents=e,this._name=t,this._id=r}function qf(){return++Yw}var Ut=Yi.prototype;Kt.prototype={constructor:Kt,select:Pw,selectAll:kw,selectChild:Ut.selectChild,selectChildren:Ut.selectChildren,filter:Ew,merge:Iw,selection:xw,transition:Ww,call:Ut.call,nodes:Ut.nodes,node:Ut.node,size:Ut.size,empty:Ut.empty,each:Ut.each,on:Sw,attr:ow,attrTween:hw,style:Ow,styleTween:Bw,text:qw,textTween:Gw,remove:Cw,tween:Zv,delay:mw,duration:_w,ease:vw,easeVarying:Tw,end:Kw,[Symbol.iterator]:Ut[Symbol.iterator]};function Qw(n){return((n*=2)<=1?n*n*n:(n-=2)*n*n+2)/2}var Xw={time:null,delay:0,duration:250,ease:Qw};function Jw(n,e){for(var t;!(t=n.__transition)||!(t=t[e]);)if(!(n=n.parentNode))throw new Error(`transition ${e} not found`);return t}function Zw(n){var e,t;n instanceof Kt?(e=n._id,n=n._name):(e=qf(),(t=Xw).time=zc(),n=n==null?null:n+"");for(var r=this._groups,i=r.length,s=0;s<i;++s)for(var o=r[s],c=o.length,l,u=0;u<c;++u)(l=o[u])&&Co(l,n,e,u,o,t||Jw(l,e));return new Kt(r,this._parents,n,e)}Yi.prototype.interrupt=Qv;Yi.prototype.transition=Zw;const nc=Math.PI,rc=2*nc,Un=1e-6,eT=rc-Un;function Hf(n){this._+=n[0];for(let e=1,t=n.length;e<t;++e)this._+=arguments[e]+n[e]}function tT(n){let e=Math.floor(n);if(!(e>=0))throw new Error(`invalid digits: ${n}`);if(e>15)return Hf;const t=10**e;return function(r){this._+=r[0];for(let i=1,s=r.length;i<s;++i)this._+=Math.round(arguments[i]*t)/t+r[i]}}class nT{constructor(e){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=e==null?Hf:tT(e)}moveTo(e,t){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(e,t){this._append`L${this._x1=+e},${this._y1=+t}`}quadraticCurveTo(e,t,r,i){this._append`Q${+e},${+t},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(e,t,r,i,s,o){this._append`C${+e},${+t},${+r},${+i},${this._x1=+s},${this._y1=+o}`}arcTo(e,t,r,i,s){if(e=+e,t=+t,r=+r,i=+i,s=+s,s<0)throw new Error(`negative radius: ${s}`);let o=this._x1,c=this._y1,l=r-e,u=i-t,d=o-e,m=c-t,p=d*d+m*m;if(this._x1===null)this._append`M${this._x1=e},${this._y1=t}`;else if(p>Un)if(!(Math.abs(m*l-u*d)>Un)||!s)this._append`L${this._x1=e},${this._y1=t}`;else{let _=r-o,S=i-c,P=l*l+u*u,k=_*_+S*S,N=Math.sqrt(P),L=Math.sqrt(p),B=s*Math.tan((nc-Math.acos((P+p-k)/(2*N*L)))/2),H=B/L,J=B/N;Math.abs(H-1)>Un&&this._append`L${e+H*d},${t+H*m}`,this._append`A${s},${s},0,0,${+(m*_>d*S)},${this._x1=e+J*l},${this._y1=t+J*u}`}}arc(e,t,r,i,s,o){if(e=+e,t=+t,r=+r,o=!!o,r<0)throw new Error(`negative radius: ${r}`);let c=r*Math.cos(i),l=r*Math.sin(i),u=e+c,d=t+l,m=1^o,p=o?i-s:s-i;this._x1===null?this._append`M${u},${d}`:(Math.abs(this._x1-u)>Un||Math.abs(this._y1-d)>Un)&&this._append`L${u},${d}`,r&&(p<0&&(p=p%rc+rc),p>eT?this._append`A${r},${r},0,1,${m},${e-c},${t-l}A${r},${r},0,1,${m},${this._x1=u},${this._y1=d}`:p>Un&&this._append`A${r},${r},0,${+(p>=nc)},${m},${this._x1=e+r*Math.cos(s)},${this._y1=t+r*Math.sin(s)}`)}rect(e,t,r,i){this._append`M${this._x0=this._x1=+e},${this._y0=this._y1=+t}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}}function rT(n){var e=0,t=n.children,r=t&&t.length;if(!r)e=1;else for(;--r>=0;)e+=t[r].value;n.value=e}function iT(){return this.eachAfter(rT)}function sT(n,e){let t=-1;for(const r of this)n.call(e,r,++t,this);return this}function oT(n,e){for(var t=this,r=[t],i,s,o=-1;t=r.pop();)if(n.call(e,t,++o,this),i=t.children)for(s=i.length-1;s>=0;--s)r.push(i[s]);return this}function aT(n,e){for(var t=this,r=[t],i=[],s,o,c,l=-1;t=r.pop();)if(i.push(t),s=t.children)for(o=0,c=s.length;o<c;++o)r.push(s[o]);for(;t=i.pop();)n.call(e,t,++l,this);return this}function cT(n,e){let t=-1;for(const r of this)if(n.call(e,r,++t,this))return r}function lT(n){return this.eachAfter(function(e){for(var t=+n(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)t+=r[i].value;e.value=t})}function uT(n){return this.eachBefore(function(e){e.children&&e.children.sort(n)})}function hT(n){for(var e=this,t=dT(e,n),r=[e];e!==t;)e=e.parent,r.push(e);for(var i=r.length;n!==t;)r.splice(i,0,n),n=n.parent;return r}function dT(n,e){if(n===e)return n;var t=n.ancestors(),r=e.ancestors(),i=null;for(n=t.pop(),e=r.pop();n===e;)i=n,n=t.pop(),e=r.pop();return i}function fT(){for(var n=this,e=[n];n=n.parent;)e.push(n);return e}function mT(){return Array.from(this)}function pT(){var n=[];return this.eachBefore(function(e){e.children||n.push(e)}),n}function gT(){var n=this,e=[];return n.each(function(t){t!==n&&e.push({source:t.parent,target:t})}),e}function*_T(){var n=this,e,t=[n],r,i,s;do for(e=t.reverse(),t=[];n=e.pop();)if(yield n,r=n.children)for(i=0,s=r.length;i<s;++i)t.push(r[i]);while(t.length)}function wi(n,e){n instanceof Map?(n=[void 0,n],e===void 0&&(e=wT)):e===void 0&&(e=vT);for(var t=new xi(n),r,i=[t],s,o,c,l;r=i.pop();)if((o=e(r.data))&&(l=(o=Array.from(o)).length))for(r.children=o,c=l-1;c>=0;--c)i.push(s=o[c]=new xi(o[c])),s.parent=r,s.depth=r.depth+1;return t.eachBefore(ET)}function yT(){return wi(this).eachBefore(TT)}function vT(n){return n.children}function wT(n){return Array.isArray(n)?n[1]:null}function TT(n){n.data.value!==void 0&&(n.value=n.data.value),n.data=n.data.data}function ET(n){var e=0;do n.height=e;while((n=n.parent)&&n.height<++e)}function xi(n){this.data=n,this.depth=this.height=0,this.parent=null}xi.prototype=wi.prototype={constructor:xi,count:iT,each:sT,eachAfter:aT,eachBefore:oT,find:cT,sum:lT,sort:uT,path:hT,ancestors:fT,descendants:mT,leaves:pT,links:gT,copy:yT,[Symbol.iterator]:_T};function IT(n,e){return n.parent===e.parent?1:2}function Ea(n){var e=n.children;return e?e[0]:n.t}function Ia(n){var e=n.children;return e?e[e.length-1]:n.t}function bT(n,e,t){var r=t/(e.i-n.i);e.c-=r,e.s+=t,n.c+=r,e.z+=t,e.m+=t}function AT(n){for(var e=0,t=0,r=n.children,i=r.length,s;--i>=0;)s=r[i],s.z+=e,s.m+=e,e+=s.s+(t+=s.c)}function ST(n,e,t){return n.a.parent===e.parent?n.a:t}function Us(n,e){this._=n,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=e}Us.prototype=Object.create(xi.prototype);function RT(n){for(var e=new Us(n,0),t,r=[e],i,s,o,c;t=r.pop();)if(s=t._.children)for(t.children=new Array(c=s.length),o=c-1;o>=0;--o)r.push(i=t.children[o]=new Us(s[o],o)),i.parent=t;return(e.parent=new Us(null,0)).children=[e],e}function CT(){var n=IT,e=1,t=1,r=null;function i(u){var d=RT(u);if(d.eachAfter(s),d.parent.m=-d.z,d.eachBefore(o),r)u.eachBefore(l);else{var m=u,p=u,_=u;u.eachBefore(function(L){L.x<m.x&&(m=L),L.x>p.x&&(p=L),L.depth>_.depth&&(_=L)});var S=m===p?1:n(m,p)/2,P=S-m.x,k=e/(p.x+S+P),N=t/(_.depth||1);u.eachBefore(function(L){L.x=(L.x+P)*k,L.y=L.depth*N})}return u}function s(u){var d=u.children,m=u.parent.children,p=u.i?m[u.i-1]:null;if(d){AT(u);var _=(d[0].z+d[d.length-1].z)/2;p?(u.z=p.z+n(u._,p._),u.m=u.z-_):u.z=_}else p&&(u.z=p.z+n(u._,p._));u.parent.A=c(u,p,u.parent.A||m[0])}function o(u){u._.x=u.z+u.parent.m,u.m+=u.parent.m}function c(u,d,m){if(d){for(var p=u,_=u,S=d,P=p.parent.children[0],k=p.m,N=_.m,L=S.m,B=P.m,H;S=Ia(S),p=Ea(p),S&&p;)P=Ea(P),_=Ia(_),_.a=u,H=S.z+L-p.z-k+n(S._,p._),H>0&&(bT(ST(S,u,m),u,H),k+=H,N+=H),L+=S.m,k+=p.m,B+=P.m,N+=_.m;S&&!Ia(_)&&(_.t=S,_.m+=L-N),p&&!Ea(P)&&(P.t=p,P.m+=k-B,m=u)}return m}function l(u){u.x*=e,u.y=u.depth*t}return i.separation=function(u){return arguments.length?(n=u,i):n},i.size=function(u){return arguments.length?(r=!1,e=+u[0],t=+u[1],i):r?null:[e,t]},i.nodeSize=function(u){return arguments.length?(r=!0,e=+u[0],t=+u[1],i):r?[e,t]:null},i}function PT(n,e){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(e).domain(n);break}return this}function kT(n){return function(){return n}}function DT(n){return+n}var gh=[0,1];function _r(n){return n}function ic(n,e){return(e-=n=+n)?function(t){return(t-n)/e}:kT(isNaN(e)?NaN:.5)}function xT(n,e){var t;return n>e&&(t=n,n=e,e=t),function(r){return Math.max(n,Math.min(e,r))}}function NT(n,e,t){var r=n[0],i=n[1],s=e[0],o=e[1];return i<r?(r=ic(i,r),s=t(o,s)):(r=ic(r,i),s=t(s,o)),function(c){return s(r(c))}}function MT(n,e,t){var r=Math.min(n.length,e.length)-1,i=new Array(r),s=new Array(r),o=-1;for(n[r]<n[0]&&(n=n.slice().reverse(),e=e.slice().reverse());++o<r;)i[o]=ic(n[o],n[o+1]),s[o]=t(e[o],e[o+1]);return function(c){var l=p_(n,c,1,r)-1;return s[l](i[l](c))}}function VT(n,e){return e.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function LT(){var n=gh,e=gh,t=$c,r,i,s,o=_r,c,l,u;function d(){var p=Math.min(n.length,e.length);return o!==_r&&(o=xT(n[0],n[p-1])),c=p>2?MT:NT,l=u=null,m}function m(p){return p==null||isNaN(p=+p)?s:(l||(l=c(n.map(r),e,t)))(r(o(p)))}return m.invert=function(p){return o(i((u||(u=c(e,n.map(r),ft)))(p)))},m.domain=function(p){return arguments.length?(n=Array.from(p,DT),d()):n.slice()},m.range=function(p){return arguments.length?(e=Array.from(p),d()):e.slice()},m.rangeRound=function(p){return e=Array.from(p),t=Mv,d()},m.clamp=function(p){return arguments.length?(o=p?!0:_r,d()):o!==_r},m.interpolate=function(p){return arguments.length?(t=p,d()):t},m.unknown=function(p){return arguments.length?(s=p,m):s},function(p,_){return r=p,i=_,d()}}function OT(){return LT()(_r,_r)}function UT(n,e){n=n.slice();var t=0,r=n.length-1,i=n[t],s=n[r],o;return s<i&&(o=t,t=r,r=o,o=i,i=s,s=o),n[t]=e.floor(i),n[r]=e.ceil(s),n}const ba=new Date,Aa=new Date;function ke(n,e,t,r){function i(s){return n(s=arguments.length===0?new Date:new Date(+s)),s}return i.floor=s=>(n(s=new Date(+s)),s),i.ceil=s=>(n(s=new Date(s-1)),e(s,1),n(s),s),i.round=s=>{const o=i(s),c=i.ceil(s);return s-o<c-s?o:c},i.offset=(s,o)=>(e(s=new Date(+s),o==null?1:Math.floor(o)),s),i.range=(s,o,c)=>{const l=[];if(s=i.ceil(s),c=c==null?1:Math.floor(c),!(s<o)||!(c>0))return l;let u;do l.push(u=new Date(+s)),e(s,c),n(s);while(u<s&&s<o);return l},i.filter=s=>ke(o=>{if(o>=o)for(;n(o),!s(o);)o.setTime(o-1)},(o,c)=>{if(o>=o)if(c<0)for(;++c<=0;)for(;e(o,-1),!s(o););else for(;--c>=0;)for(;e(o,1),!s(o););}),t&&(i.count=(s,o)=>(ba.setTime(+s),Aa.setTime(+o),n(ba),n(Aa),Math.floor(t(ba,Aa))),i.every=s=>(s=Math.floor(s),!isFinite(s)||!(s>0)?null:s>1?i.filter(r?o=>r(o)%s===0:o=>i.count(0,o)%s===0):i)),i}const ro=ke(()=>{},(n,e)=>{n.setTime(+n+e)},(n,e)=>e-n);ro.every=n=>(n=Math.floor(n),!isFinite(n)||!(n>0)?null:n>1?ke(e=>{e.setTime(Math.floor(e/n)*n)},(e,t)=>{e.setTime(+e+t*n)},(e,t)=>(t-e)/n):ro);ro.range;const $t=1e3,ut=$t*60,zt=ut*60,Yt=zt*24,jc=Yt*7,_h=Yt*30,Sa=Yt*365,yr=ke(n=>{n.setTime(n-n.getMilliseconds())},(n,e)=>{n.setTime(+n+e*$t)},(n,e)=>(e-n)/$t,n=>n.getUTCSeconds());yr.range;const Gc=ke(n=>{n.setTime(n-n.getMilliseconds()-n.getSeconds()*$t)},(n,e)=>{n.setTime(+n+e*ut)},(n,e)=>(e-n)/ut,n=>n.getMinutes());Gc.range;const FT=ke(n=>{n.setUTCSeconds(0,0)},(n,e)=>{n.setTime(+n+e*ut)},(n,e)=>(e-n)/ut,n=>n.getUTCMinutes());FT.range;const Wc=ke(n=>{n.setTime(n-n.getMilliseconds()-n.getSeconds()*$t-n.getMinutes()*ut)},(n,e)=>{n.setTime(+n+e*zt)},(n,e)=>(e-n)/zt,n=>n.getHours());Wc.range;const BT=ke(n=>{n.setUTCMinutes(0,0,0)},(n,e)=>{n.setTime(+n+e*zt)},(n,e)=>(e-n)/zt,n=>n.getUTCHours());BT.range;const Xi=ke(n=>n.setHours(0,0,0,0),(n,e)=>n.setDate(n.getDate()+e),(n,e)=>(e-n-(e.getTimezoneOffset()-n.getTimezoneOffset())*ut)/Yt,n=>n.getDate()-1);Xi.range;const Kc=ke(n=>{n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCDate(n.getUTCDate()+e)},(n,e)=>(e-n)/Yt,n=>n.getUTCDate()-1);Kc.range;const $T=ke(n=>{n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCDate(n.getUTCDate()+e)},(n,e)=>(e-n)/Yt,n=>Math.floor(n/Yt));$T.range;function rr(n){return ke(e=>{e.setDate(e.getDate()-(e.getDay()+7-n)%7),e.setHours(0,0,0,0)},(e,t)=>{e.setDate(e.getDate()+t*7)},(e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*ut)/jc)}const Po=rr(0),io=rr(1),zT=rr(2),qT=rr(3),Cr=rr(4),HT=rr(5),jT=rr(6);Po.range;io.range;zT.range;qT.range;Cr.range;HT.range;jT.range;function ir(n){return ke(e=>{e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-n)%7),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t*7)},(e,t)=>(t-e)/jc)}const jf=ir(0),so=ir(1),GT=ir(2),WT=ir(3),Pr=ir(4),KT=ir(5),YT=ir(6);jf.range;so.range;GT.range;WT.range;Pr.range;KT.range;YT.range;const Yc=ke(n=>{n.setDate(1),n.setHours(0,0,0,0)},(n,e)=>{n.setMonth(n.getMonth()+e)},(n,e)=>e.getMonth()-n.getMonth()+(e.getFullYear()-n.getFullYear())*12,n=>n.getMonth());Yc.range;const QT=ke(n=>{n.setUTCDate(1),n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCMonth(n.getUTCMonth()+e)},(n,e)=>e.getUTCMonth()-n.getUTCMonth()+(e.getUTCFullYear()-n.getUTCFullYear())*12,n=>n.getUTCMonth());QT.range;const Qt=ke(n=>{n.setMonth(0,1),n.setHours(0,0,0,0)},(n,e)=>{n.setFullYear(n.getFullYear()+e)},(n,e)=>e.getFullYear()-n.getFullYear(),n=>n.getFullYear());Qt.every=n=>!isFinite(n=Math.floor(n))||!(n>0)?null:ke(e=>{e.setFullYear(Math.floor(e.getFullYear()/n)*n),e.setMonth(0,1),e.setHours(0,0,0,0)},(e,t)=>{e.setFullYear(e.getFullYear()+t*n)});Qt.range;const Qn=ke(n=>{n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0)},(n,e)=>{n.setUTCFullYear(n.getUTCFullYear()+e)},(n,e)=>e.getUTCFullYear()-n.getUTCFullYear(),n=>n.getUTCFullYear());Qn.every=n=>!isFinite(n=Math.floor(n))||!(n>0)?null:ke(e=>{e.setUTCFullYear(Math.floor(e.getUTCFullYear()/n)*n),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCFullYear(e.getUTCFullYear()+t*n)});Qn.range;function XT(n,e,t,r,i,s){const o=[[yr,1,$t],[yr,5,5*$t],[yr,15,15*$t],[yr,30,30*$t],[s,1,ut],[s,5,5*ut],[s,15,15*ut],[s,30,30*ut],[i,1,zt],[i,3,3*zt],[i,6,6*zt],[i,12,12*zt],[r,1,Yt],[r,2,2*Yt],[t,1,jc],[e,1,_h],[e,3,3*_h],[n,1,Sa]];function c(u,d,m){const p=d<u;p&&([u,d]=[d,u]);const _=m&&typeof m.range=="function"?m:l(u,d,m),S=_?_.range(u,+d+1):[];return p?S.reverse():S}function l(u,d,m){const p=Math.abs(d-u)/m,_=Vc(([,,k])=>k).right(o,p);if(_===o.length)return n.every(Ju(u/Sa,d/Sa,m));if(_===0)return ro.every(Math.max(Ju(u,d,m),1));const[S,P]=o[p/o[_-1][2]<o[_][2]/p?_-1:_];return S.every(P)}return[c,l]}const[JT,ZT]=XT(Qt,Yc,Po,Xi,Wc,Gc);function Ra(n){if(0<=n.y&&n.y<100){var e=new Date(-1,n.m,n.d,n.H,n.M,n.S,n.L);return e.setFullYear(n.y),e}return new Date(n.y,n.m,n.d,n.H,n.M,n.S,n.L)}function Ca(n){if(0<=n.y&&n.y<100){var e=new Date(Date.UTC(-1,n.m,n.d,n.H,n.M,n.S,n.L));return e.setUTCFullYear(n.y),e}return new Date(Date.UTC(n.y,n.m,n.d,n.H,n.M,n.S,n.L))}function ci(n,e,t){return{y:n,m:e,d:t,H:0,M:0,S:0,L:0}}function e0(n){var e=n.dateTime,t=n.date,r=n.time,i=n.periods,s=n.days,o=n.shortDays,c=n.months,l=n.shortMonths,u=li(i),d=ui(i),m=li(s),p=ui(s),_=li(o),S=ui(o),P=li(c),k=ui(c),N=li(l),L=ui(l),B={a:j,A:K,b:Z,B:te,c:null,d:Ih,e:Ih,f:I0,g:N0,G:V0,H:w0,I:T0,j:E0,L:Gf,m:b0,M:A0,p:le,q:fe,Q:Sh,s:Rh,S:S0,u:R0,U:C0,V:P0,w:k0,W:D0,x:null,X:null,y:x0,Y:M0,Z:L0,"%":Ah},H={a:We,A:_e,b:Ve,B:Ke,c:null,d:bh,e:bh,f:B0,g:Q0,G:J0,H:O0,I:U0,j:F0,L:Kf,m:$0,M:z0,p:Le,q:Ye,Q:Sh,s:Rh,S:q0,u:H0,U:j0,V:G0,w:W0,W:K0,x:null,X:null,y:Y0,Y:X0,Z:Z0,"%":Ah},J={a:I,A:E,b,B:v,c:R,d:Th,e:Th,f:g0,g:wh,G:vh,H:Eh,I:Eh,j:d0,L:p0,m:h0,M:f0,p:w,q:u0,Q:y0,s:v0,S:m0,u:s0,U:o0,V:a0,w:i0,W:c0,x:q,X:V,y:wh,Y:vh,Z:l0,"%":_0};B.x=U(t,B),B.X=U(r,B),B.c=U(e,B),H.x=U(t,H),H.X=U(r,H),H.c=U(e,H);function U($,ne){return function(oe){var M=[],De=-1,he=0,Qe=$.length,Oe,dt,Hr;for(oe instanceof Date||(oe=new Date(+oe));++De<Qe;)$.charCodeAt(De)===37&&(M.push($.slice(he,De)),(dt=yh[Oe=$.charAt(++De)])!=null?Oe=$.charAt(++De):dt=Oe==="e"?" ":"0",(Hr=ne[Oe])&&(Oe=Hr(oe,dt)),M.push(Oe),he=De+1);return M.push($.slice(he,De)),M.join("")}}function T($,ne){return function(oe){var M=ci(1900,void 0,1),De=y(M,$,oe+="",0),he,Qe;if(De!=oe.length)return null;if("Q"in M)return new Date(M.Q);if("s"in M)return new Date(M.s*1e3+("L"in M?M.L:0));if(ne&&!("Z"in M)&&(M.Z=0),"p"in M&&(M.H=M.H%12+M.p*12),M.m===void 0&&(M.m="q"in M?M.q:0),"V"in M){if(M.V<1||M.V>53)return null;"w"in M||(M.w=1),"Z"in M?(he=Ca(ci(M.y,0,1)),Qe=he.getUTCDay(),he=Qe>4||Qe===0?so.ceil(he):so(he),he=Kc.offset(he,(M.V-1)*7),M.y=he.getUTCFullYear(),M.m=he.getUTCMonth(),M.d=he.getUTCDate()+(M.w+6)%7):(he=Ra(ci(M.y,0,1)),Qe=he.getDay(),he=Qe>4||Qe===0?io.ceil(he):io(he),he=Xi.offset(he,(M.V-1)*7),M.y=he.getFullYear(),M.m=he.getMonth(),M.d=he.getDate()+(M.w+6)%7)}else("W"in M||"U"in M)&&("w"in M||(M.w="u"in M?M.u%7:"W"in M?1:0),Qe="Z"in M?Ca(ci(M.y,0,1)).getUTCDay():Ra(ci(M.y,0,1)).getDay(),M.m=0,M.d="W"in M?(M.w+6)%7+M.W*7-(Qe+5)%7:M.w+M.U*7-(Qe+6)%7);return"Z"in M?(M.H+=M.Z/100|0,M.M+=M.Z%100,Ca(M)):Ra(M)}}function y($,ne,oe,M){for(var De=0,he=ne.length,Qe=oe.length,Oe,dt;De<he;){if(M>=Qe)return-1;if(Oe=ne.charCodeAt(De++),Oe===37){if(Oe=ne.charAt(De++),dt=J[Oe in yh?ne.charAt(De++):Oe],!dt||(M=dt($,oe,M))<0)return-1}else if(Oe!=oe.charCodeAt(M++))return-1}return M}function w($,ne,oe){var M=u.exec(ne.slice(oe));return M?($.p=d.get(M[0].toLowerCase()),oe+M[0].length):-1}function I($,ne,oe){var M=_.exec(ne.slice(oe));return M?($.w=S.get(M[0].toLowerCase()),oe+M[0].length):-1}function E($,ne,oe){var M=m.exec(ne.slice(oe));return M?($.w=p.get(M[0].toLowerCase()),oe+M[0].length):-1}function b($,ne,oe){var M=N.exec(ne.slice(oe));return M?($.m=L.get(M[0].toLowerCase()),oe+M[0].length):-1}function v($,ne,oe){var M=P.exec(ne.slice(oe));return M?($.m=k.get(M[0].toLowerCase()),oe+M[0].length):-1}function R($,ne,oe){return y($,e,ne,oe)}function q($,ne,oe){return y($,t,ne,oe)}function V($,ne,oe){return y($,r,ne,oe)}function j($){return o[$.getDay()]}function K($){return s[$.getDay()]}function Z($){return l[$.getMonth()]}function te($){return c[$.getMonth()]}function le($){return i[+($.getHours()>=12)]}function fe($){return 1+~~($.getMonth()/3)}function We($){return o[$.getUTCDay()]}function _e($){return s[$.getUTCDay()]}function Ve($){return l[$.getUTCMonth()]}function Ke($){return c[$.getUTCMonth()]}function Le($){return i[+($.getUTCHours()>=12)]}function Ye($){return 1+~~($.getUTCMonth()/3)}return{format:function($){var ne=U($+="",B);return ne.toString=function(){return $},ne},parse:function($){var ne=T($+="",!1);return ne.toString=function(){return $},ne},utcFormat:function($){var ne=U($+="",H);return ne.toString=function(){return $},ne},utcParse:function($){var ne=T($+="",!0);return ne.toString=function(){return $},ne}}}var yh={"-":"",_:" ",0:"0"},Me=/^\s*\d+/,t0=/^%/,n0=/[\\^$*+?|[\]().{}]/g;function ce(n,e,t){var r=n<0?"-":"",i=(r?-n:n)+"",s=i.length;return r+(s<t?new Array(t-s+1).join(e)+i:i)}function r0(n){return n.replace(n0,"\\$&")}function li(n){return new RegExp("^(?:"+n.map(r0).join("|")+")","i")}function ui(n){return new Map(n.map((e,t)=>[e.toLowerCase(),t]))}function i0(n,e,t){var r=Me.exec(e.slice(t,t+1));return r?(n.w=+r[0],t+r[0].length):-1}function s0(n,e,t){var r=Me.exec(e.slice(t,t+1));return r?(n.u=+r[0],t+r[0].length):-1}function o0(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.U=+r[0],t+r[0].length):-1}function a0(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.V=+r[0],t+r[0].length):-1}function c0(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.W=+r[0],t+r[0].length):-1}function vh(n,e,t){var r=Me.exec(e.slice(t,t+4));return r?(n.y=+r[0],t+r[0].length):-1}function wh(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.y=+r[0]+(+r[0]>68?1900:2e3),t+r[0].length):-1}function l0(n,e,t){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(t,t+6));return r?(n.Z=r[1]?0:-(r[2]+(r[3]||"00")),t+r[0].length):-1}function u0(n,e,t){var r=Me.exec(e.slice(t,t+1));return r?(n.q=r[0]*3-3,t+r[0].length):-1}function h0(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.m=r[0]-1,t+r[0].length):-1}function Th(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.d=+r[0],t+r[0].length):-1}function d0(n,e,t){var r=Me.exec(e.slice(t,t+3));return r?(n.m=0,n.d=+r[0],t+r[0].length):-1}function Eh(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.H=+r[0],t+r[0].length):-1}function f0(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.M=+r[0],t+r[0].length):-1}function m0(n,e,t){var r=Me.exec(e.slice(t,t+2));return r?(n.S=+r[0],t+r[0].length):-1}function p0(n,e,t){var r=Me.exec(e.slice(t,t+3));return r?(n.L=+r[0],t+r[0].length):-1}function g0(n,e,t){var r=Me.exec(e.slice(t,t+6));return r?(n.L=Math.floor(r[0]/1e3),t+r[0].length):-1}function _0(n,e,t){var r=t0.exec(e.slice(t,t+1));return r?t+r[0].length:-1}function y0(n,e,t){var r=Me.exec(e.slice(t));return r?(n.Q=+r[0],t+r[0].length):-1}function v0(n,e,t){var r=Me.exec(e.slice(t));return r?(n.s=+r[0],t+r[0].length):-1}function Ih(n,e){return ce(n.getDate(),e,2)}function w0(n,e){return ce(n.getHours(),e,2)}function T0(n,e){return ce(n.getHours()%12||12,e,2)}function E0(n,e){return ce(1+Xi.count(Qt(n),n),e,3)}function Gf(n,e){return ce(n.getMilliseconds(),e,3)}function I0(n,e){return Gf(n,e)+"000"}function b0(n,e){return ce(n.getMonth()+1,e,2)}function A0(n,e){return ce(n.getMinutes(),e,2)}function S0(n,e){return ce(n.getSeconds(),e,2)}function R0(n){var e=n.getDay();return e===0?7:e}function C0(n,e){return ce(Po.count(Qt(n)-1,n),e,2)}function Wf(n){var e=n.getDay();return e>=4||e===0?Cr(n):Cr.ceil(n)}function P0(n,e){return n=Wf(n),ce(Cr.count(Qt(n),n)+(Qt(n).getDay()===4),e,2)}function k0(n){return n.getDay()}function D0(n,e){return ce(io.count(Qt(n)-1,n),e,2)}function x0(n,e){return ce(n.getFullYear()%100,e,2)}function N0(n,e){return n=Wf(n),ce(n.getFullYear()%100,e,2)}function M0(n,e){return ce(n.getFullYear()%1e4,e,4)}function V0(n,e){var t=n.getDay();return n=t>=4||t===0?Cr(n):Cr.ceil(n),ce(n.getFullYear()%1e4,e,4)}function L0(n){var e=n.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+ce(e/60|0,"0",2)+ce(e%60,"0",2)}function bh(n,e){return ce(n.getUTCDate(),e,2)}function O0(n,e){return ce(n.getUTCHours(),e,2)}function U0(n,e){return ce(n.getUTCHours()%12||12,e,2)}function F0(n,e){return ce(1+Kc.count(Qn(n),n),e,3)}function Kf(n,e){return ce(n.getUTCMilliseconds(),e,3)}function B0(n,e){return Kf(n,e)+"000"}function $0(n,e){return ce(n.getUTCMonth()+1,e,2)}function z0(n,e){return ce(n.getUTCMinutes(),e,2)}function q0(n,e){return ce(n.getUTCSeconds(),e,2)}function H0(n){var e=n.getUTCDay();return e===0?7:e}function j0(n,e){return ce(jf.count(Qn(n)-1,n),e,2)}function Yf(n){var e=n.getUTCDay();return e>=4||e===0?Pr(n):Pr.ceil(n)}function G0(n,e){return n=Yf(n),ce(Pr.count(Qn(n),n)+(Qn(n).getUTCDay()===4),e,2)}function W0(n){return n.getUTCDay()}function K0(n,e){return ce(so.count(Qn(n)-1,n),e,2)}function Y0(n,e){return ce(n.getUTCFullYear()%100,e,2)}function Q0(n,e){return n=Yf(n),ce(n.getUTCFullYear()%100,e,2)}function X0(n,e){return ce(n.getUTCFullYear()%1e4,e,4)}function J0(n,e){var t=n.getUTCDay();return n=t>=4||t===0?Pr(n):Pr.ceil(n),ce(n.getUTCFullYear()%1e4,e,4)}function Z0(){return"+0000"}function Ah(){return"%"}function Sh(n){return+n}function Rh(n){return Math.floor(+n/1e3)}var dr,Qc;eE({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function eE(n){return dr=e0(n),Qc=dr.format,dr.parse,dr.utcFormat,dr.utcParse,dr}function tE(n){return new Date(n)}function nE(n){return n instanceof Date?+n:+new Date(+n)}function Qf(n,e,t,r,i,s,o,c,l,u){var d=OT(),m=d.invert,p=d.domain,_=u(".%L"),S=u(":%S"),P=u("%I:%M"),k=u("%I %p"),N=u("%a %d"),L=u("%b %d"),B=u("%B"),H=u("%Y");function J(U){return(l(U)<U?_:c(U)<U?S:o(U)<U?P:s(U)<U?k:r(U)<U?i(U)<U?N:L:t(U)<U?B:H)(U)}return d.invert=function(U){return new Date(m(U))},d.domain=function(U){return arguments.length?p(Array.from(U,nE)):p().map(tE)},d.ticks=function(U){var T=p();return n(T[0],T[T.length-1],U??10)},d.tickFormat=function(U,T){return T==null?J:u(T)},d.nice=function(U){var T=p();return(!U||typeof U.range!="function")&&(U=e(T[0],T[T.length-1],U??10)),U?p(UT(T,U)):d},d.copy=function(){return VT(d,Qf(n,e,t,r,i,s,o,c,l,u))},d}function rE(){return PT.apply(Qf(JT,ZT,Qt,Yc,Po,Xi,Wc,Gc,yr,Qc).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}function Ch(n){return function(){return n}}function iE(n){let e=3;return n.digits=function(t){if(!arguments.length)return e;if(t==null)e=null;else{const r=Math.floor(t);if(!(r>=0))throw new RangeError(`invalid digits: ${t}`);e=r}return n},()=>new nT(e)}var sE=Array.prototype.slice;function oE(n){return n[0]}function aE(n){return n[1]}class cE{constructor(e,t){this._context=e,this._x=t}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(e,t){switch(e=+e,t=+t,this._point){case 0:{this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+e)/2,this._y0,this._x0,t,e,t):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+t)/2,e,this._y0,e,t);break}}this._x0=e,this._y0=t}}function lE(n){return new cE(n,!1)}function uE(n){return n.source}function hE(n){return n.target}function dE(n){let e=uE,t=hE,r=oE,i=aE,s=null,o=null,c=iE(l);function l(){let u;const d=sE.call(arguments),m=e.apply(this,d),p=t.apply(this,d);if(s==null&&(o=n(u=c())),o.lineStart(),d[0]=m,o.point(+r.apply(this,d),+i.apply(this,d)),d[0]=p,o.point(+r.apply(this,d),+i.apply(this,d)),o.lineEnd(),u)return o=null,u+""||null}return l.source=function(u){return arguments.length?(e=u,l):e},l.target=function(u){return arguments.length?(t=u,l):t},l.x=function(u){return arguments.length?(r=typeof u=="function"?u:Ch(+u),l):r},l.y=function(u){return arguments.length?(i=typeof u=="function"?u:Ch(+u),l):i},l.context=function(u){return arguments.length?(u==null?s=o=null:o=n(s=u),l):s},l}function fE(){return dE(lE)}const bs=n=>()=>n;function mE(n,{sourceEvent:e,target:t,transform:r,dispatch:i}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},target:{value:t,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:i}})}function qt(n,e,t){this.k=n,this.x=e,this.y=t}qt.prototype={constructor:qt,scale:function(n){return n===1?this:new qt(this.k*n,this.x,this.y)},translate:function(n,e){return n===0&e===0?this:new qt(this.k,this.x+this.k*n,this.y+this.k*e)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Ni=new qt(1,0,0);Xf.prototype=qt.prototype;function Xf(n){for(;!n.__zoom;)if(!(n=n.parentNode))return Ni;return n.__zoom}function Pa(n){n.stopImmediatePropagation()}function hi(n){n.preventDefault(),n.stopImmediatePropagation()}function pE(n){return(!n.ctrlKey||n.type==="wheel")&&!n.button}function gE(){var n=this;return n instanceof SVGElement?(n=n.ownerSVGElement||n,n.hasAttribute("viewBox")?(n=n.viewBox.baseVal,[[n.x,n.y],[n.x+n.width,n.y+n.height]]):[[0,0],[n.width.baseVal.value,n.height.baseVal.value]]):[[0,0],[n.clientWidth,n.clientHeight]]}function Ph(){return this.__zoom||Ni}function _E(n){return-n.deltaY*(n.deltaMode===1?.05:n.deltaMode?1:.002)*(n.ctrlKey?10:1)}function yE(){return navigator.maxTouchPoints||"ontouchstart"in this}function vE(n,e,t){var r=n.invertX(e[0][0])-t[0][0],i=n.invertX(e[1][0])-t[1][0],s=n.invertY(e[0][1])-t[0][1],o=n.invertY(e[1][1])-t[1][1];return n.translate(i>r?(r+i)/2:Math.min(0,r)||Math.max(0,i),o>s?(s+o)/2:Math.min(0,s)||Math.max(0,o))}function wE(){var n=pE,e=gE,t=vE,r=_E,i=yE,s=[0,1/0],o=[[-1/0,-1/0],[1/0,1/0]],c=250,l=zv,u=Lc("start","zoom","end"),d,m,p,_=500,S=150,P=0,k=10;function N(R){R.property("__zoom",Ph).on("wheel.zoom",y,{passive:!1}).on("mousedown.zoom",w).on("dblclick.zoom",I).filter(i).on("touchstart.zoom",E).on("touchmove.zoom",b).on("touchend.zoom touchcancel.zoom",v).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}N.transform=function(R,q,V,j){var K=R.selection?R.selection():R;K.property("__zoom",Ph),R!==K?J(R,q,V,j):K.interrupt().each(function(){U(this,arguments).event(j).start().zoom(null,typeof q=="function"?q.apply(this,arguments):q).end()})},N.scaleBy=function(R,q,V,j){N.scaleTo(R,function(){var K=this.__zoom.k,Z=typeof q=="function"?q.apply(this,arguments):q;return K*Z},V,j)},N.scaleTo=function(R,q,V,j){N.transform(R,function(){var K=e.apply(this,arguments),Z=this.__zoom,te=V==null?H(K):typeof V=="function"?V.apply(this,arguments):V,le=Z.invert(te),fe=typeof q=="function"?q.apply(this,arguments):q;return t(B(L(Z,fe),te,le),K,o)},V,j)},N.translateBy=function(R,q,V,j){N.transform(R,function(){return t(this.__zoom.translate(typeof q=="function"?q.apply(this,arguments):q,typeof V=="function"?V.apply(this,arguments):V),e.apply(this,arguments),o)},null,j)},N.translateTo=function(R,q,V,j,K){N.transform(R,function(){var Z=e.apply(this,arguments),te=this.__zoom,le=j==null?H(Z):typeof j=="function"?j.apply(this,arguments):j;return t(Ni.translate(le[0],le[1]).scale(te.k).translate(typeof q=="function"?-q.apply(this,arguments):-q,typeof V=="function"?-V.apply(this,arguments):-V),Z,o)},j,K)};function L(R,q){return q=Math.max(s[0],Math.min(s[1],q)),q===R.k?R:new qt(q,R.x,R.y)}function B(R,q,V){var j=q[0]-V[0]*R.k,K=q[1]-V[1]*R.k;return j===R.x&&K===R.y?R:new qt(R.k,j,K)}function H(R){return[(+R[0][0]+ +R[1][0])/2,(+R[0][1]+ +R[1][1])/2]}function J(R,q,V,j){R.on("start.zoom",function(){U(this,arguments).event(j).start()}).on("interrupt.zoom end.zoom",function(){U(this,arguments).event(j).end()}).tween("zoom",function(){var K=this,Z=arguments,te=U(K,Z).event(j),le=e.apply(K,Z),fe=V==null?H(le):typeof V=="function"?V.apply(K,Z):V,We=Math.max(le[1][0]-le[0][0],le[1][1]-le[0][1]),_e=K.__zoom,Ve=typeof q=="function"?q.apply(K,Z):q,Ke=l(_e.invert(fe).concat(We/_e.k),Ve.invert(fe).concat(We/Ve.k));return function(Le){if(Le===1)Le=Ve;else{var Ye=Ke(Le),$=We/Ye[2];Le=new qt($,fe[0]-Ye[0]*$,fe[1]-Ye[1]*$)}te.zoom(null,Le)}})}function U(R,q,V){return!V&&R.__zooming||new T(R,q)}function T(R,q){this.that=R,this.args=q,this.active=0,this.sourceEvent=null,this.extent=e.apply(R,q),this.taps=0}T.prototype={event:function(R){return R&&(this.sourceEvent=R),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(R,q){return this.mouse&&R!=="mouse"&&(this.mouse[1]=q.invert(this.mouse[0])),this.touch0&&R!=="touch"&&(this.touch0[1]=q.invert(this.touch0[0])),this.touch1&&R!=="touch"&&(this.touch1[1]=q.invert(this.touch1[0])),this.that.__zoom=q,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(R){var q=St(this.that).datum();u.call(R,this.that,new mE(R,{sourceEvent:this.sourceEvent,target:N,transform:this.that.__zoom,dispatch:u}),q)}};function y(R,...q){if(!n.apply(this,arguments))return;var V=U(this,q).event(R),j=this.__zoom,K=Math.max(s[0],Math.min(s[1],j.k*Math.pow(2,r.apply(this,arguments)))),Z=On(R);if(V.wheel)(V.mouse[0][0]!==Z[0]||V.mouse[0][1]!==Z[1])&&(V.mouse[1]=j.invert(V.mouse[0]=Z)),clearTimeout(V.wheel);else{if(j.k===K)return;V.mouse=[Z,j.invert(Z)],Os(this),V.start()}hi(R),V.wheel=setTimeout(te,S),V.zoom("mouse",t(B(L(j,K),V.mouse[0],V.mouse[1]),V.extent,o));function te(){V.wheel=null,V.end()}}function w(R,...q){if(p||!n.apply(this,arguments))return;var V=R.currentTarget,j=U(this,q,!0).event(R),K=St(R.view).on("mousemove.zoom",fe,!0).on("mouseup.zoom",We,!0),Z=On(R,V),te=R.clientX,le=R.clientY;uv(R.view),Pa(R),j.mouse=[Z,this.__zoom.invert(Z)],Os(this),j.start();function fe(_e){if(hi(_e),!j.moved){var Ve=_e.clientX-te,Ke=_e.clientY-le;j.moved=Ve*Ve+Ke*Ke>P}j.event(_e).zoom("mouse",t(B(j.that.__zoom,j.mouse[0]=On(_e,V),j.mouse[1]),j.extent,o))}function We(_e){K.on("mousemove.zoom mouseup.zoom",null),hv(_e.view,j.moved),hi(_e),j.event(_e).end()}}function I(R,...q){if(n.apply(this,arguments)){var V=this.__zoom,j=On(R.changedTouches?R.changedTouches[0]:R,this),K=V.invert(j),Z=V.k*(R.shiftKey?.5:2),te=t(B(L(V,Z),j,K),e.apply(this,q),o);hi(R),c>0?St(this).transition().duration(c).call(J,te,j,R):St(this).call(N.transform,te,j,R)}}function E(R,...q){if(n.apply(this,arguments)){var V=R.touches,j=V.length,K=U(this,q,R.changedTouches.length===j).event(R),Z,te,le,fe;for(Pa(R),te=0;te<j;++te)le=V[te],fe=On(le,this),fe=[fe,this.__zoom.invert(fe),le.identifier],K.touch0?!K.touch1&&K.touch0[2]!==fe[2]&&(K.touch1=fe,K.taps=0):(K.touch0=fe,Z=!0,K.taps=1+!!d);d&&(d=clearTimeout(d)),Z&&(K.taps<2&&(m=fe[0],d=setTimeout(function(){d=null},_)),Os(this),K.start())}}function b(R,...q){if(this.__zooming){var V=U(this,q).event(R),j=R.changedTouches,K=j.length,Z,te,le,fe;for(hi(R),Z=0;Z<K;++Z)te=j[Z],le=On(te,this),V.touch0&&V.touch0[2]===te.identifier?V.touch0[0]=le:V.touch1&&V.touch1[2]===te.identifier&&(V.touch1[0]=le);if(te=V.that.__zoom,V.touch1){var We=V.touch0[0],_e=V.touch0[1],Ve=V.touch1[0],Ke=V.touch1[1],Le=(Le=Ve[0]-We[0])*Le+(Le=Ve[1]-We[1])*Le,Ye=(Ye=Ke[0]-_e[0])*Ye+(Ye=Ke[1]-_e[1])*Ye;te=L(te,Math.sqrt(Le/Ye)),le=[(We[0]+Ve[0])/2,(We[1]+Ve[1])/2],fe=[(_e[0]+Ke[0])/2,(_e[1]+Ke[1])/2]}else if(V.touch0)le=V.touch0[0],fe=V.touch0[1];else return;V.zoom("touch",t(B(te,le,fe),V.extent,o))}}function v(R,...q){if(this.__zooming){var V=U(this,q).event(R),j=R.changedTouches,K=j.length,Z,te;for(Pa(R),p&&clearTimeout(p),p=setTimeout(function(){p=null},_),Z=0;Z<K;++Z)te=j[Z],V.touch0&&V.touch0[2]===te.identifier?delete V.touch0:V.touch1&&V.touch1[2]===te.identifier&&delete V.touch1;if(V.touch1&&!V.touch0&&(V.touch0=V.touch1,delete V.touch1),V.touch0)V.touch0[1]=this.__zoom.invert(V.touch0[0]);else if(V.end(),V.taps===2&&(te=On(te,this),Math.hypot(m[0]-te[0],m[1]-te[1])<k)){var le=St(this).on("dblclick.zoom");le&&le.apply(this,arguments)}}}return N.wheelDelta=function(R){return arguments.length?(r=typeof R=="function"?R:bs(+R),N):r},N.filter=function(R){return arguments.length?(n=typeof R=="function"?R:bs(!!R),N):n},N.touchable=function(R){return arguments.length?(i=typeof R=="function"?R:bs(!!R),N):i},N.extent=function(R){return arguments.length?(e=typeof R=="function"?R:bs([[+R[0][0],+R[0][1]],[+R[1][0],+R[1][1]]]),N):e},N.scaleExtent=function(R){return arguments.length?(s[0]=+R[0],s[1]=+R[1],N):[s[0],s[1]]},N.translateExtent=function(R){return arguments.length?(o[0][0]=+R[0][0],o[1][0]=+R[1][0],o[0][1]=+R[0][1],o[1][1]=+R[1][1],N):[[o[0][0],o[0][1]],[o[1][0],o[1][1]]]},N.constrain=function(R){return arguments.length?(t=R,N):t},N.duration=function(R){return arguments.length?(c=+R,N):c},N.interpolate=function(R){return arguments.length?(l=R,N):l},N.on=function(){var R=u.on.apply(u,arguments);return R===u?N:R},N.clickDistance=function(R){return arguments.length?(P=(R=+R)*R,N):Math.sqrt(P)},N.tapDistance=function(R){return arguments.length?(k=+R,N):k},N}class kh{constructor(e,t){this.svg=St(e),this.familyService=t,this.width=0,this.height=0,this.currentScale=1,this.highlightedIds=new Set,this.zoomBehavior=null,this.init()}init(){this.updateDimensions(),this.mainGroup=this.svg.append("g").attr("class","main-group"),this.zoomBehavior=wE().scaleExtent([.1,4]).filter(t=>!t.button).on("zoom",t=>{this.mainGroup.attr("transform",t.transform),this.currentScale=t.transform.k}),this.svg.call(this.zoomBehavior);let e;window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{var r;this.updateDimensions();const t=(r=this.familyService)==null?void 0:r.getAllMembers();t&&t.length>0&&this.renderTree(t)},250)})}updateDimensions(){const e=this.svg.node().parentElement;this.width=e.clientWidth,this.height=Math.max(e.clientHeight,500),this.svg.attr("width",this.width).attr("height",this.height)}setZoom(e){this.currentScale=e;const t=Xf(this.svg.node()),r=Ni.translate(t.x,t.y).scale(e);this.svg.transition().duration(300).call(this.zoomBehavior.transform,r)}resetZoom(){this.currentScale=1,this.centerTree()}renderTree(e){if(this.mainGroup.selectAll("*").remove(),e.length===0){this.showEmptyState();return}const t=this.buildHierarchy(e),r=t.descendants().length,i=this.width<768,s=r===1?200:Math.max(i?this.width-40:this.width-100,r*(i?120:80)),o=r===1?100:Math.max(i?this.height-40:this.height-100,t.height*(i?180:150)),l=CT().size([s,o]).separation((u,d)=>u.parent===d.parent?i?1.5:1.2:i?2.5:2)(t);this.drawLinks(l.links()),this.drawNodes(l.descendants()),this.centerTree()}centerTree(){const e=this.mainGroup.node().getBBox();if(e.width===0&&e.height===0)return;const t=e.width,r=e.height,i=e.x+t/2,s=e.y+r/2,o=Math.min(this.width/(t+100),this.height/(r+100),1),c=this.width/2-i*o,l=this.height/2-s*o,u=Ni.translate(c,l).scale(o);this.currentScale=o,this.svg.transition().duration(750).call(this.zoomBehavior.transform,u)}buildHierarchy(e){const t=e.filter(o=>!o.parentIds||o.parentIds.length===0);if(t.length===0)return wi({name:"Family",children:[]});const r=new Set,i=o=>{if(r.has(o))return null;const c=e.find(m=>m.id===o);if(!c)return null;r.add(o);const u=e.filter(m=>m.parentIds&&m.parentIds.includes(o)&&!r.has(m.id)).map(m=>i(m.id)).filter(m=>m!==null),d=e.find(m=>m.spouseId===o||c.spouseId===m.id);if(d&&!r.has(d.id)){r.add(d.id);const m=e.filter(p=>p.parentIds&&p.parentIds.includes(d.id)&&!r.has(p.id)).map(p=>i(p.id)).filter(p=>p!==null);u.push(...m)}return{...c,children:u.length>0?u:void 0}},s=t.map(o=>i(o.id)).filter(o=>o!==null);return s.length>1?wi({name:"Sharma Family",isVirtualRoot:!0,children:s}):wi(s[0]||{name:"Family",children:[]})}drawLinks(e){const t=this.width<768,r=t?60:100,i=this.mainGroup.append("g").attr("class","links").attr("transform",`translate(${this.width/2}, ${r})`),s=e.filter(o=>!o.source.data.isVirtualRoot);s.length!==0&&i.selectAll("path").data(s).enter().append("path").attr("class","tree-link").attr("d",fE().x(o=>o.x).y(o=>o.y)).attr("fill","none").attr("stroke","#94a3b8").attr("stroke-width",t?2:2.5).attr("opacity",.7)}drawNodes(e){const t=this.width<768,r=t?60:100,i=this.mainGroup.append("g").attr("class","nodes").attr("transform",`translate(${this.width/2}, ${r})`),s=e.filter(d=>!d.data.isVirtualRoot),o=i.selectAll("g").data(s).enter().append("g").attr("class",d=>`tree-node ${this.highlightedIds.has(d.data.id)?"highlighted":""} ${d.data.isAlive?"":"deceased"}`).attr("transform",d=>`translate(${d.x}, ${d.y})`).style("cursor","pointer").on("click",(d,m)=>this.handleNodeClick(m.data)),c=t?130:140,l=t?90:100,u=t?10:12;o.append("rect").attr("x",-c/2).attr("y",-l/2).attr("width",c).attr("height",l).attr("rx",u).attr("ry",u).attr("fill",d=>d.data.isAlive?d.data.gender==="male"?"#3b82f6":"#ec4899":"#9ca3af").attr("stroke",d=>d.data.isAlive?"#fff":"#6b7280").attr("stroke-width",3).attr("filter","drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))"),o.each(function(d){const m=St(this);d.data.photoURL?m.append("foreignObject").attr("x",-c/2+10).attr("y",-l/2+10).attr("width",40).attr("height",40).append("xhtml:img").attr("src",d.data.photoURL).attr("alt",d.data.name||"Profile").style("width","100%").style("height","100%").style("object-fit","cover").style("border-radius","8px").style("border","2px solid white"):m.append("text").attr("x",-c/2+30).attr("y",-l/2+35).attr("text-anchor","middle").attr("font-size","24px").text(d.data.gender==="male"?"👨":"👩")}),o.append("text").attr("x",-c/2+60).attr("y",-l/2+22).attr("text-anchor","start").attr("font-size","11px").attr("font-weight","bold").attr("fill","white").text(d=>{let m="";return d.data.firstName?m=`${d.data.firstName} ${d.data.lastName||""}`.trim():d.data.name&&(m=d.data.name),m=m.replace(/^(Pandit |Shri |Smt\. |Late |Dr\. |Baby )/g,""),m.length>14?m.substring(0,12)+"...":m}),o.append("text").attr("x",-c/2+60).attr("y",-l/2+38).attr("text-anchor","start").attr("font-size","9px").attr("fill","rgba(255, 255, 255, 0.9)").text(d=>d.data.relationship||""),o.append("text").attr("y",l/2-10).attr("text-anchor","middle").attr("font-size","9px").attr("fill","rgba(255, 255, 255, 0.8)").text(d=>{if(d.data.age)return`Age: ${d.data.age}`;if(d.data.birthDate){const m=new Date(d.data.birthDate).getFullYear();return d.data.isAlive?`b. ${m}`:`${m} - ${d.data.deathDate?new Date(d.data.deathDate).getFullYear():"?"}`}return""}),o.each(function(d){if(d.data.isCurrentUser){const m=St(this),p=t?22:26,_=c/2-p/2-5,S=-l/2+5;m.append("circle").attr("cx",_).attr("cy",S+p/2).attr("r",p/2).attr("fill","#10b981").attr("stroke","#fff").attr("stroke-width",2).attr("class","add-member-btn").style("cursor","pointer").attr("filter","drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))").on("click",P=>{P.stopPropagation(),window.dispatchEvent(new CustomEvent("openAddMemberModal"))}),m.append("text").attr("x",_).attr("y",S+p/2).attr("text-anchor","middle").attr("dominant-baseline","central").attr("font-size",t?"16px":"18px").attr("font-weight","bold").attr("fill","white").style("cursor","pointer").style("pointer-events","none").text("+")}})}handleNodeClick(e){const t=new CustomEvent("memberSelected",{detail:e});window.dispatchEvent(t)}highlightMembers(e){this.highlightedIds=new Set(e),this.renderTree(this.familyService.getAllMembers())}filterMembers(e){const t=this.familyService.getAllMembers().filter(r=>e.includes(r.id));this.renderTree(t)}renderTimeline(e){if(this.mainGroup.selectAll("*").remove(),e.length===0){this.showEmptyState();return}const t=e.filter(l=>l.birthDate).sort((l,u)=>new Date(l.birthDate)-new Date(u.birthDate)),r=v_(t,l=>new Date(l.birthDate)),i=new Date,s=rE().domain([r,i]).range([100,this.width-100]),o=R_(s).ticks(10).tickFormat(Qc("%Y"));this.mainGroup.append("g").attr("class","timeline-axis").attr("transform",`translate(0, ${this.height/2})`).call(o);const c=this.mainGroup.selectAll(".timeline-point").data(t).enter().append("g").attr("class","timeline-point").attr("transform",(l,u)=>{const d=s(new Date(l.birthDate)),m=this.height/2+(u%2===0?-80:80);return`translate(${d}, ${m})`});c.append("circle").attr("r",20).attr("fill",l=>l.gender==="male"?"#4A90E2":"#E24A90").style("cursor","pointer").on("click",(l,u)=>this.handleNodeClick(u)),c.append("text").attr("text-anchor","middle").attr("dy",35).attr("font-size","10px").text(l=>l.name),c.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",(l,u)=>u%2===0?80:-80).attr("stroke","#ccc").attr("stroke-dasharray","2,2")}renderGrid(e){if(this.mainGroup.selectAll("*").remove(),e.length===0){this.showEmptyState();return}const t=Math.ceil(Math.sqrt(e.length)),r=150,i=180,s=20,o=this.mainGroup.selectAll(".grid-card").data(e).enter().append("g").attr("class","grid-card").attr("transform",(c,l)=>{const u=l%t,d=Math.floor(l/t),m=50+u*(r+s),p=50+d*(i+s);return`translate(${m}, ${p})`});o.append("rect").attr("width",r).attr("height",i).attr("rx",10).attr("fill","#fff").attr("stroke","#ddd").attr("stroke-width",1).style("cursor","pointer").on("click",(c,l)=>this.handleNodeClick(l)),o.append("circle").attr("cx",r/2).attr("cy",40).attr("r",25).attr("fill",c=>c.gender==="male"?"#4A90E2":"#E24A90"),o.append("text").attr("x",r/2).attr("y",40).attr("text-anchor","middle").attr("dy",8).attr("font-size","20px").text(c=>c.gender==="male"?"👨":"👩"),o.append("text").attr("x",r/2).attr("y",85).attr("text-anchor","middle").attr("font-size","12px").attr("font-weight","bold").text(c=>c.name),o.append("text").attr("x",r/2).attr("y",105).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#666").text(c=>c.birthDate?new Date(c.birthDate).getFullYear():""),o.append("text").attr("x",r/2).attr("y",125).attr("text-anchor","middle").attr("font-size","10px").attr("fill","#888").text(c=>c.profession||"")}showEmptyState(){this.mainGroup.append("text").attr("x",this.width/2).attr("y",this.height/2).attr("text-anchor","middle").attr("font-size","18px").attr("fill","#999").text('No family members to display. Click "Add Member" to get started.')}}class Dh{constructor(e){this.familyService=e,this.modal=document.getElementById("memberModal"),this.modalBody=document.getElementById("modalBody"),this.currentMember=null,this.selectedPhoto=null,this.photoPreviewURL=null,console.log("MemberModal initialized, modal element:",this.modal),this.modal?this.bindEvents():console.error("MemberModal: #memberModal element not found in DOM")}bindEvents(){var e,t,r,i,s;(e=document.getElementById("closeModal"))==null||e.addEventListener("click",()=>{this.close()}),(t=document.getElementById("cancelBtn"))==null||t.addEventListener("click",()=>{this.close()}),(r=document.getElementById("saveBtn"))==null||r.addEventListener("click",()=>{this.save()}),(i=document.getElementById("deleteMemberBtn"))==null||i.addEventListener("click",()=>{this.deleteMember()}),(s=this.modal)==null||s.addEventListener("click",o=>{o.target===this.modal&&this.close()}),window.addEventListener("memberSelected",o=>{this.open(o.detail)})}open(e=null){if(console.log("MemberModal.open() called"),!this.modal&&(console.error("Cannot open modal: modal element is null"),this.modal=document.getElementById("memberModal"),this.modalBody=document.getElementById("modalBody"),!this.modal)){alert("Error: Modal element not found");return}this.currentMember=e,this.selectedPhoto=null,this.photoPreviewURL=null,this.photoToDelete=null,this.preSelectedRelationship=null,this.preSelectedGender=null,this.referenceMemberId=null,this.relationshipToReference=null,this._pendingParentUpdate=null,this.renderForm();const t=document.getElementById("deleteMemberBtn");t&&(t.style.display=e?"block":"none"),this.modal.classList.add("active"),document.body.style.overflow="hidden",console.log("Modal should now be visible, classList:",this.modal.classList)}openWithRelationship(e,t,r=null){if(console.log("MemberModal.openWithRelationship() called:",e,t,r),!this.modal&&(this.modal=document.getElementById("memberModal"),this.modalBody=document.getElementById("modalBody"),!this.modal)){alert("Error: Modal element not found");return}if(this.currentMember=null,this.selectedPhoto=null,this.photoPreviewURL=null,this.photoToDelete=null,this.preSelectedRelationship=e==="Other"?null:e,this.preSelectedGender=t||null,r)this.referenceMemberId=r;else{const s=this.familyService.getAllMembers().find(o=>o.isCurrentUser);this.referenceMemberId=(s==null?void 0:s.id)||null}this.relationshipToReference=e,this.renderForm();const i=document.getElementById("deleteMemberBtn");i&&(i.style.display="none"),this.modal.classList.add("active"),document.body.style.overflow="hidden"}close(){this.modal.classList.remove("active"),document.body.style.overflow="",this.currentMember=null}getParentOptions(e=null){return this.familyService.getAllMembers().map(r=>{const i=r.firstName?`${r.firstName} ${r.lastName||""}`.trim():r.name,s=e===r.id?"selected":"";return`<option value="${r.id}" ${s}>${i}</option>`}).join("")}getSelectedAttr(e,t,r){return e==="gender"&&this.preSelectedGender===t||e==="relationship"&&this.preSelectedRelationship===t||r&&this.currentMember&&this.currentMember[e]===t?"selected":""}renderForm(){var i,s,o,c,l,u;const e=this.currentMember!==null;document.getElementById("modalTitle").textContent=e?"Edit Member":"Add New Member";let t="",r="";if(e){if(this.currentMember.firstName)t=this.currentMember.firstName,r=this.currentMember.lastName||"";else if(this.currentMember.name){const d=this.currentMember.name.split(" ");t=d[0]||"",r=d.slice(1).join(" ")||""}}this.modalBody.innerHTML=`
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
        `,(o=document.getElementById("isAlive"))==null||o.addEventListener("change",d=>{const m=document.getElementById("deathDateRow");m.style.display=d.target.checked?"none":"flex"}),(c=document.getElementById("photoInput"))==null||c.addEventListener("change",d=>{this.handlePhotoSelect(d)}),(l=document.getElementById("removePhotoBtn"))==null||l.addEventListener("click",()=>{this.handlePhotoRemove()}),(u=document.getElementById("birthDate"))==null||u.addEventListener("change",d=>{const m=document.getElementById("age");if(d.target.value&&!m.value){const p=new Date(d.target.value),_=new Date,S=_.getFullYear()-p.getFullYear(),P=_.getMonth()-p.getMonth();P<0||P===0&&_.getDate()<p.getDate()?m.value=S-1:m.value=S}})}handlePhotoSelect(e){const t=e.target.files[0];if(t){if(!t.type.startsWith("image/")){alert("Please select an image file"),e.target.value="";return}if(t.size>5*1024*1024){alert("Image size must be less than 5MB"),e.target.value="";return}this.selectedPhoto=t;const r=new FileReader;r.onload=i=>{this.photoPreviewURL=i.target.result;const s=document.getElementById("photoPreview");s.innerHTML=`<img src="${i.target.result}" alt="Preview" class="preview-image">`},r.readAsDataURL(t)}}handlePhotoRemove(){this.selectedPhoto=null,this.photoPreviewURL=null;const e=document.getElementById("photoPreview");e.innerHTML='<div class="photo-placeholder">📷<br>No photo</div>',document.getElementById("photoInput").value="",this.currentMember&&this.currentMember.photoURL&&(this.photoToDelete=this.currentMember.photoURL)}async save(){const e=document.getElementById("memberForm"),t=new FormData(e),r=t.get("firstName"),i=t.get("gender");if(!r||!i){alert("Please fill in all required fields (First Name and Gender)");return}const s=document.getElementById("saveBtn"),o=s.textContent;s.disabled=!0,s.textContent="Saving...";try{const c=t.get("lastName")||"",l=c?`${r} ${c}`:r,u=[],d=t.get("parent1"),m=t.get("parent2");d&&u.push(d),m&&u.push(m);const p={firstName:r,lastName:c,name:l,gender:i,relationship:t.get("relationship")||null,age:t.get("age")?parseInt(t.get("age")):null,birthDate:t.get("birthDate")||null,birthPlace:t.get("birthPlace")||null,isAlive:document.getElementById("isAlive").checked,deathDate:t.get("deathDate")||null,deathPlace:t.get("deathPlace")||null,gotra:t.get("gotra")||null,kuldevta:t.get("kuldevta")||null,nakshatra:t.get("nakshatra")||null,rashi:t.get("rashi")||null,profession:t.get("profession")||null,education:t.get("education")||null,phone:t.get("phone")||null,email:t.get("email")||null,address:t.get("address")||null,notes:t.get("notes")||null,parentIds:u.length>0?u:null};let _=this.currentMember?this.currentMember.id:null;if(this.selectedPhoto&&(console.log("Photo selected but Storage not enabled. Saving member without photo."),p.photoURL=null),this.referenceMemberId&&this.relationshipToReference&&!this.currentMember){const S=this.familyService.getMember(this.referenceMemberId);S&&await this.establishRelationship(p,S,this.relationshipToReference)}if(this.currentMember)await this.familyService.updateMember(this.currentMember.id,p);else{const S=await this.familyService.addMember(p);if(this._pendingParentUpdate&&S){const P=this.familyService.getMember(this._pendingParentUpdate.childId);if(P){const k=P.parentIds||[];k.includes(S.id)||(k.push(S.id),await this.familyService.updateMember(P.id,{parentIds:k}))}this._pendingParentUpdate=null}this.referenceMemberId&&this.relationshipToReference&&(this.relationshipToReference==="Husband"||this.relationshipToReference==="Wife")&&await this.familyService.addSpouse(this.referenceMemberId,S.id)}this.referenceMemberId=null,this.relationshipToReference=null,this.selectedPhoto=null,this.photoPreviewURL=null,this.photoToDelete=null,window.dispatchEvent(new Event("familyDataChanged")),s.disabled=!1,s.textContent=o,this.close()}catch(c){console.error("Error saving member:",c),alert("Failed to save member: "+c.message),s.disabled=!1,s.textContent=o}}async establishRelationship(e,t,r){switch(r){case"Father":case"Mother":this._pendingParentUpdate={childId:t.id,relationship:r};break;case"Son":case"Daughter":e.parentIds||(e.parentIds=[]),e.parentIds.includes(t.id)||e.parentIds.push(t.id),t.spouseId&&e.parentIds.push(t.spouseId);break;case"Brother":case"Sister":t.parentIds&&t.parentIds.length>0&&(e.parentIds=[...t.parentIds]);break;case"Grandfather":case"Grandmother":break;case"Grandson":case"Granddaughter":const i=this.familyService.getChildren(t.id);i.length>0&&(e.parentIds=[i[0].id]);break}}async deleteMember(){if(!this.currentMember)return;const e=this.currentMember.name||`${this.currentMember.firstName||""} ${this.currentMember.lastName||""}`.trim();if(!confirm(`Are you sure you want to delete ${e}?

This will also remove all relationships with this member and cannot be undone.`))return;const r=document.getElementById("deleteMemberBtn"),i=r.textContent;r.disabled=!0,r.textContent="Deleting...";try{console.log("Deleting member:",this.currentMember.id),await this.familyService.deleteMember(this.currentMember.id),console.log("Member deleted successfully"),r.disabled=!1,r.textContent=i,this.close(),window.dispatchEvent(new Event("familyDataChanged"))}catch(s){console.error("Error deleting member:",s),alert("Failed to delete member: "+s.message),r.disabled=!1,r.textContent=i}}}function TE(n,e){let t;return function(...i){const s=()=>{clearTimeout(t),n(...i)};clearTimeout(t),t=setTimeout(s,e)}}class EE{constructor(e=null){this.familyService=e||new u_,this.treeRenderer=null,this.memberModal=null,this.currentView="tree"}initWithService(){this.treeRenderer=new kh("#familyTree",this.familyService),this.memberModal=new Dh(this.familyService),this.bindEvents(),this.render(),this.updateStatistics()}init(){this.familyService.clearAllData(),this.treeRenderer=new kh("#familyTree",this.familyService),this.memberModal=new Dh(this.familyService),this.loadSampleData(),this.bindEvents(),this.render(),this.updateStatistics()}loadSampleData(){const e=this.familyService.addMember({firstName:"Ramchandra",lastName:"Sharma",name:"Shri Ramchandra Sharma",gender:"male",relationship:"Grandfather",age:74,birthDate:"1950-01-15",birthPlace:"Varanasi, Uttar Pradesh",gotra:"Bharadwaj",profession:"Retired Teacher",isAlive:!0}),t=this.familyService.addMember({firstName:"Lakshmi",lastName:"Devi",name:"Smt. Lakshmi Devi",gender:"female",relationship:"Grandmother",age:69,birthDate:"1955-03-10",birthPlace:"Allahabad, Uttar Pradesh",profession:"Homemaker",isAlive:!0});this.familyService.addSpouse(e.id,t.id,"1975-05-12");const r=this.familyService.addMember({firstName:"Rajesh",lastName:"Sharma",name:"Rajesh Sharma",gender:"male",relationship:"Father",age:46,birthDate:"1978-08-20",birthPlace:"Delhi, India",gotra:"Bharadwaj",profession:"Software Engineer",education:"B.Tech IIT Delhi",isAlive:!0,parentIds:[e.id,t.id]}),i=this.familyService.addMember({firstName:"Priya",lastName:"Sharma",name:"Priya Sharma",gender:"female",relationship:"Mother",age:44,birthDate:"1980-02-14",birthPlace:"Mumbai, Maharashtra",profession:"Doctor",education:"MBBS",isAlive:!0});this.familyService.addSpouse(r.id,i.id,"2005-12-10"),this.familyService.addMember({firstName:"Arjun",lastName:"Sharma",name:"Arjun Sharma",gender:"male",relationship:"Son",age:16,birthDate:"2008-06-15",birthPlace:"Bangalore, Karnataka",gotra:"Bharadwaj",profession:"Student",education:"10th Grade",isAlive:!0,parentIds:[r.id,i.id]})}bindEvents(){var r,i,s,o,c,l,u;const e=document.getElementById("addMemberBtn");console.log("FamilyTreeApp.bindEvents() - addMemberBtn:",e),e?(console.log("✓ Add Member button found, binding click event"),e.addEventListener("click",()=>{console.log("🔵 Add Member button clicked - opening modal"),this.memberModal?this.memberModal.open():console.error("❌ memberModal is not initialized")})):console.error("❌ addMemberBtn not found in DOM");const t=document.getElementById("searchInput");t&&t.addEventListener("input",TE(d=>{this.handleSearch(d.target.value)},300)),(r=document.getElementById("viewMode"))==null||r.addEventListener("change",d=>{this.currentView=d.target.value,this.render()}),(i=document.getElementById("generationFilter"))==null||i.addEventListener("change",d=>{const m=d.target.value==="all"?null:parseInt(d.target.value);this.filterByGeneration(m)}),(s=document.getElementById("zoomInBtn"))==null||s.addEventListener("click",()=>{const d=(this.treeRenderer.currentScale||1)*1.2;this.treeRenderer.setZoom(Math.min(d,4))}),(o=document.getElementById("zoomOutBtn"))==null||o.addEventListener("click",()=>{const d=(this.treeRenderer.currentScale||1)/1.2;this.treeRenderer.setZoom(Math.max(d,.1))}),(c=document.getElementById("resetZoomBtn"))==null||c.addEventListener("click",()=>{this.treeRenderer.resetZoom()}),(l=document.getElementById("exportBtn"))==null||l.addEventListener("click",()=>{this.exportData()}),(u=document.getElementById("printBtn"))==null||u.addEventListener("click",()=>{window.print()}),window.addEventListener("familyDataChanged",()=>{this.render(),this.updateStatistics()}),window.addEventListener("openAddMemberModal",()=>{console.log("🔵 openAddMemberModal event received - showing relationship selector"),this.showRelationshipSelector()}),this.setupRelationshipSelector()}showRelationshipSelector(){const e=document.getElementById("addRelationshipModal");e&&(e.classList.remove("hidden"),e.classList.add("active"),document.body.style.overflow="hidden")}hideRelationshipSelector(){const e=document.getElementById("addRelationshipModal");e&&(e.classList.remove("active"),e.classList.add("hidden"),document.body.style.overflow="")}setupRelationshipSelector(){var t;const e=document.getElementById("addRelationshipModal");e&&((t=document.getElementById("closeRelationshipModal"))==null||t.addEventListener("click",()=>{this.hideRelationshipSelector()}),e.addEventListener("click",r=>{r.target===e&&this.hideRelationshipSelector()}),e.querySelectorAll(".relationship-btn").forEach(r=>{r.addEventListener("click",()=>{const i=r.dataset.relationship,s=r.dataset.gender;this.hideRelationshipSelector(),this.memberModal&&this.memberModal.openWithRelationship(i,s)})}))}render(){const e=this.familyService.getAllMembers();switch(this.currentView){case"tree":this.treeRenderer.renderTree(e);break;case"timeline":this.treeRenderer.renderTimeline(e);break;case"grid":this.treeRenderer.renderGrid(e);break}}handleSearch(e){if(!e.trim()){this.render();return}const t=this.familyService.searchMembers(e);this.treeRenderer.highlightMembers(t.map(r=>r.id))}filterByGeneration(e){if(e===null){this.render();return}const t=this.familyService.getMembersByGeneration(e);this.treeRenderer.filterMembers(t.map(r=>r.id))}updateStatistics(){const e=this.familyService.getStatistics();document.getElementById("totalMembers").textContent=e.totalMembers,document.getElementById("totalGenerations").textContent=e.generations,document.getElementById("totalMales").textContent=e.males,document.getElementById("totalFemales").textContent=e.females,this.updateRecentMembers(),this.updateUpcomingEvents()}updateRecentMembers(){const e=document.getElementById("recentMembers"),t=this.familyService.getRecentMembers(5);e.innerHTML=t.map(r=>`
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
        `).join("")}exportData(){const e=this.familyService.exportData(),t=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),r=URL.createObjectURL(t),i=document.createElement("a");i.href=r,i.download=`family-tree-${Date.now()}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)}}const IE=()=>{};var xh={};/**
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
 */const Jf=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},bE=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Zf={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,c=o?n[i+1]:0,l=i+2<n.length,u=l?n[i+2]:0,d=s>>2,m=(s&3)<<4|c>>4;let p=(c&15)<<2|u>>6,_=u&63;l||(_=64,o||(p=64)),r.push(t[d],t[m],t[p],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Jf(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):bE(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;const u=i<n.length?t[n.charAt(i)]:64;++i;const m=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||u==null||m==null)throw new AE;const p=s<<2|c>>4;if(r.push(p),u!==64){const _=c<<4&240|u>>2;if(r.push(_),m!==64){const S=u<<6&192|m;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class AE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const SE=function(n){const e=Jf(n);return Zf.encodeByteArray(e,!0)},oo=function(n){return SE(n).replace(/\./g,"")},em=function(n){try{return Zf.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function RE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const CE=()=>RE().__FIREBASE_DEFAULTS__,PE=()=>{if(typeof process>"u"||typeof xh>"u")return;const n=xh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},kE=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&em(n[1]);return e&&JSON.parse(e)},ko=()=>{try{return IE()||CE()||PE()||kE()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},tm=n=>{var e,t;return(t=(e=ko())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},nm=n=>{const e=tm(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},rm=()=>{var n;return(n=ko())==null?void 0:n.config},im=n=>{var e;return(e=ko())==null?void 0:e[`_${n}`]};/**
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
 */class DE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Cn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Xc(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function sm(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[oo(JSON.stringify(t)),oo(JSON.stringify(o)),""].join(".")}const Ti={};function xE(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ti))Ti[e]?n.emulator.push(e):n.prod.push(e);return n}function NE(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Nh=!1;function Jc(n,e){if(typeof window>"u"||typeof document>"u"||!Cn(window.location.host)||Ti[n]===e||Ti[n]||Nh)return;Ti[n]=e;function t(p){return`__firebase__banner__${p}`}const r="__firebase__banner",s=xE().prod.length>0;function o(){const p=document.getElementById(r);p&&p.remove()}function c(p){p.style.display="flex",p.style.background="#7faaf0",p.style.position="fixed",p.style.bottom="5px",p.style.left="5px",p.style.padding=".5em",p.style.borderRadius="5px",p.style.alignItems="center"}function l(p,_){p.setAttribute("width","24"),p.setAttribute("id",_),p.setAttribute("height","24"),p.setAttribute("viewBox","0 0 24 24"),p.setAttribute("fill","none"),p.style.marginLeft="-6px"}function u(){const p=document.createElement("span");return p.style.cursor="pointer",p.style.marginLeft="16px",p.style.fontSize="24px",p.innerHTML=" &times;",p.onclick=()=>{Nh=!0,o()},p}function d(p,_){p.setAttribute("id",_),p.innerText="Learn more",p.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",p.setAttribute("target","__blank"),p.style.paddingLeft="5px",p.style.textDecoration="underline"}function m(){const p=NE(r),_=t("text"),S=document.getElementById(_)||document.createElement("span"),P=t("learnmore"),k=document.getElementById(P)||document.createElement("a"),N=t("preprendIcon"),L=document.getElementById(N)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(p.created){const B=p.element;c(B),d(k,P);const H=u();l(L,N),B.append(L,S,k,H),document.body.appendChild(B)}s?(S.innerText="Preview backend disconnected.",L.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(L.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,S.innerText="Preview backend running in this workspace."),S.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
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
 */function Ge(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ME(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ge())}function VE(){var e;const n=(e=ko())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function LE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function OE(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function UE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function FE(){const n=Ge();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function BE(){return!VE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function $E(){try{return typeof indexedDB=="object"}catch{return!1}}function zE(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const qE="FirebaseError";class Ot extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=qE,Object.setPrototypeOf(this,Ot.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ji.prototype.create)}}class Ji{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?HE(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Ot(i,c,r)}}function HE(n,e){return n.replace(jE,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const jE=/\{\$([^}]+)}/g;function GE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Xn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Mh(s)&&Mh(o)){if(!Xn(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Mh(n){return n!==null&&typeof n=="object"}/**
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
 */function Zi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function WE(n,e){const t=new KE(n,e);return t.subscribe.bind(t)}class KE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");YE(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ka),i.error===void 0&&(i.error=ka),i.complete===void 0&&(i.complete=ka);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function YE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ka(){}/**
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
 */const Fn="[DEFAULT]";/**
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
 */class QE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new DE;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(JE(e))try{this.getOrInitializeService({instanceIdentifier:Fn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Fn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Fn){return this.instances.has(e)}getOptions(e=Fn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:XE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Fn){return this.component?this.component.multipleInstances?e:Fn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function XE(n){return n===Fn?void 0:n}function JE(n){return n.instantiationMode==="EAGER"}/**
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
 */class ZE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new QE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var re;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(re||(re={}));const eI={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},tI=re.INFO,nI={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},rI=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=nI[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Zc{constructor(e){this.name=e,this._logLevel=tI,this._logHandler=rI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?eI[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}const iI=(n,e)=>e.some(t=>n instanceof t);let Vh,Lh;function sI(){return Vh||(Vh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function oI(){return Lh||(Lh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const om=new WeakMap,sc=new WeakMap,am=new WeakMap,Da=new WeakMap,el=new WeakMap;function aI(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(_n(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&om.set(t,n)}).catch(()=>{}),el.set(e,n),e}function cI(n){if(sc.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});sc.set(n,e)}let oc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return sc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||am.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return _n(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function lI(n){oc=n(oc)}function uI(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(xa(this),e,...t);return am.set(r,e.sort?e.sort():[e]),_n(r)}:oI().includes(n)?function(...e){return n.apply(xa(this),e),_n(om.get(this))}:function(...e){return _n(n.apply(xa(this),e))}}function hI(n){return typeof n=="function"?uI(n):(n instanceof IDBTransaction&&cI(n),iI(n,sI())?new Proxy(n,oc):n)}function _n(n){if(n instanceof IDBRequest)return aI(n);if(Da.has(n))return Da.get(n);const e=hI(n);return e!==n&&(Da.set(n,e),el.set(e,n)),e}const xa=n=>el.get(n);function dI(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),c=_n(o);return r&&o.addEventListener("upgradeneeded",l=>{r(_n(o.result),l.oldVersion,l.newVersion,_n(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),c}const fI=["get","getKey","getAll","getAllKeys","count"],mI=["put","add","delete","clear"],Na=new Map;function Oh(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Na.get(e))return Na.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=mI.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||fI.includes(t)))return;const s=async function(o,...c){const l=this.transaction(o,i?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(c.shift())),(await Promise.all([u[t](...c),i&&l.done]))[0]};return Na.set(e,s),s}lI(n=>({...n,get:(e,t,r)=>Oh(e,t)||n.get(e,t,r),has:(e,t)=>!!Oh(e,t)||n.has(e,t)}));/**
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
 */class pI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(gI(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function gI(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ac="@firebase/app",Uh="0.14.7";/**
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
 */const Xt=new Zc("@firebase/app"),_I="@firebase/app-compat",yI="@firebase/analytics-compat",vI="@firebase/analytics",wI="@firebase/app-check-compat",TI="@firebase/app-check",EI="@firebase/auth",II="@firebase/auth-compat",bI="@firebase/database",AI="@firebase/data-connect",SI="@firebase/database-compat",RI="@firebase/functions",CI="@firebase/functions-compat",PI="@firebase/installations",kI="@firebase/installations-compat",DI="@firebase/messaging",xI="@firebase/messaging-compat",NI="@firebase/performance",MI="@firebase/performance-compat",VI="@firebase/remote-config",LI="@firebase/remote-config-compat",OI="@firebase/storage",UI="@firebase/storage-compat",FI="@firebase/firestore",BI="@firebase/ai",$I="@firebase/firestore-compat",zI="firebase",qI="12.8.0";/**
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
 */const cc="[DEFAULT]",HI={[ac]:"fire-core",[_I]:"fire-core-compat",[vI]:"fire-analytics",[yI]:"fire-analytics-compat",[TI]:"fire-app-check",[wI]:"fire-app-check-compat",[EI]:"fire-auth",[II]:"fire-auth-compat",[bI]:"fire-rtdb",[AI]:"fire-data-connect",[SI]:"fire-rtdb-compat",[RI]:"fire-fn",[CI]:"fire-fn-compat",[PI]:"fire-iid",[kI]:"fire-iid-compat",[DI]:"fire-fcm",[xI]:"fire-fcm-compat",[NI]:"fire-perf",[MI]:"fire-perf-compat",[VI]:"fire-rc",[LI]:"fire-rc-compat",[OI]:"fire-gcs",[UI]:"fire-gcs-compat",[FI]:"fire-fst",[$I]:"fire-fst-compat",[BI]:"fire-vertex","fire-js":"fire-js",[zI]:"fire-js-all"};/**
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
 */const ao=new Map,jI=new Map,lc=new Map;function Fh(n,e){try{n.container.addComponent(e)}catch(t){Xt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Jn(n){const e=n.name;if(lc.has(e))return Xt.debug(`There were multiple attempts to register component ${e}.`),!1;lc.set(e,n);for(const t of ao.values())Fh(t,n);for(const t of jI.values())Fh(t,n);return!0}function Do(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ct(n){return n==null?!1:n.settings!==void 0}/**
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
 */const GI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},yn=new Ji("app","Firebase",GI);/**
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
 */class WI{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw yn.create("app-deleted",{appName:this._name})}}/**
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
 */const sr=qI;function cm(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:cc,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw yn.create("bad-app-name",{appName:String(i)});if(t||(t=rm()),!t)throw yn.create("no-options");const s=ao.get(i);if(s){if(Xn(t,s.options)&&Xn(r,s.config))return s;throw yn.create("duplicate-app",{appName:i})}const o=new ZE(i);for(const l of lc.values())o.addComponent(l);const c=new WI(t,r,o);return ao.set(i,c),c}function tl(n=cc){const e=ao.get(n);if(!e&&n===cc&&rm())return cm();if(!e)throw yn.create("no-app",{appName:n});return e}function Pt(n,e,t){let r=HI[n]??n;t&&(r+=`-${t}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Xt.warn(o.join(" "));return}Jn(new Tn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const KI="firebase-heartbeat-database",YI=1,Mi="firebase-heartbeat-store";let Ma=null;function lm(){return Ma||(Ma=dI(KI,YI,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Mi)}catch(t){console.warn(t)}}}}).catch(n=>{throw yn.create("idb-open",{originalErrorMessage:n.message})})),Ma}async function QI(n){try{const t=(await lm()).transaction(Mi),r=await t.objectStore(Mi).get(um(n));return await t.done,r}catch(e){if(e instanceof Ot)Xt.warn(e.message);else{const t=yn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Xt.warn(t.message)}}}async function Bh(n,e){try{const r=(await lm()).transaction(Mi,"readwrite");await r.objectStore(Mi).put(e,um(n)),await r.done}catch(t){if(t instanceof Ot)Xt.warn(t.message);else{const r=yn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Xt.warn(r.message)}}}function um(n){return`${n.name}!${n.options.appId}`}/**
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
 */const XI=1024,JI=30;class ZI{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new tb(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=$h();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>JI){const o=nb(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Xt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=$h(),{heartbeatsToSend:r,unsentEntries:i}=eb(this._heartbeatsCache.heartbeats),s=oo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Xt.warn(t),""}}}function $h(){return new Date().toISOString().substring(0,10)}function eb(n,e=XI){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),zh(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),zh(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class tb{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return $E()?zE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await QI(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Bh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function zh(n){return oo(JSON.stringify({version:2,heartbeats:n})).length}function nb(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function rb(n){Jn(new Tn("platform-logger",e=>new pI(e),"PRIVATE")),Jn(new Tn("heartbeat",e=>new ZI(e),"PRIVATE")),Pt(ac,Uh,n),Pt(ac,Uh,"esm2020"),Pt("fire-js","")}rb("");function hm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ib=hm,dm=new Ji("auth","Firebase",hm());/**
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
 */const co=new Zc("@firebase/auth");function sb(n,...e){co.logLevel<=re.WARN&&co.warn(`Auth (${sr}): ${n}`,...e)}function Fs(n,...e){co.logLevel<=re.ERROR&&co.error(`Auth (${sr}): ${n}`,...e)}/**
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
 */function Mt(n,...e){throw rl(n,...e)}function yt(n,...e){return rl(n,...e)}function nl(n,e,t){const r={...ib(),[e]:t};return new Ji("auth","Firebase",r).create(e,{appName:n.name})}function Hn(n){return nl(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ob(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Mt(n,"argument-error"),nl(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function rl(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return dm.create(n,...e)}function Y(n,e,...t){if(!n)throw rl(e,...t)}function Ht(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Fs(e),new Error(e)}function Jt(n,e){n||Ht(e)}/**
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
 */function uc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function ab(){return qh()==="http:"||qh()==="https:"}function qh(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function cb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(ab()||OE()||"connection"in navigator)?navigator.onLine:!0}function lb(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class es{constructor(e,t){this.shortDelay=e,this.longDelay=t,Jt(t>e,"Short delay should be less than long delay!"),this.isMobile=ME()||UE()}get(){return cb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function il(n,e){Jt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class fm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ht("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ht("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ht("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const ub={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const hb=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],db=new es(3e4,6e4);function sl(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Ur(n,e,t,r,i={}){return mm(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const c=Zi({key:n.config.apiKey,...o}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:l,...s};return LE()||(u.referrerPolicy="no-referrer"),n.emulatorConfig&&Cn(n.emulatorConfig.host)&&(u.credentials="include"),fm.fetch()(await pm(n,n.config.apiHost,t,c),u)})}async function mm(n,e,t){n._canInitEmulator=!1;const r={...ub,...e};try{const i=new mb(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw As(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const c=s.ok?o.errorMessage:o.error.message,[l,u]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw As(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw As(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw As(n,"user-disabled",o);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw nl(n,d,u);Mt(n,d)}}catch(i){if(i instanceof Ot)throw i;Mt(n,"network-request-failed",{message:String(i)})}}async function fb(n,e,t,r,i={}){const s=await Ur(n,e,t,r,i);return"mfaPendingCredential"in s&&Mt(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function pm(n,e,t,r){const i=`${e}${t}?${r}`,s=n,o=s.config.emulator?il(n.config,i):`${n.config.apiScheme}://${i}`;return hb.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class mb{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(yt(this.auth,"network-request-failed")),db.get())})}}function As(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=yt(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */async function pb(n,e){return Ur(n,"POST","/v1/accounts:delete",e)}async function lo(n,e){return Ur(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ei(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function gb(n,e=!1){const t=ye(n),r=await t.getIdToken(e),i=ol(r);Y(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ei(Va(i.auth_time)),issuedAtTime:Ei(Va(i.iat)),expirationTime:Ei(Va(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Va(n){return Number(n)*1e3}function ol(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Fs("JWT malformed, contained fewer than 3 sections"),null;try{const i=em(t);return i?JSON.parse(i):(Fs("Failed to decode base64 JWT payload"),null)}catch(i){return Fs("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Hh(n){const e=ol(n);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Vi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ot&&_b(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function _b({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class yb{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class hc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ei(this.lastLoginAt),this.creationTime=Ei(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function uo(n){var m;const e=n.auth,t=await n.getIdToken(),r=await Vi(n,lo(e,{idToken:t}));Y(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(m=i.providerUserInfo)!=null&&m.length?gm(i.providerUserInfo):[],o=wb(n.providerData,s),c=n.isAnonymous,l=!(n.email&&i.passwordHash)&&!(o!=null&&o.length),u=c?l:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new hc(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(n,d)}async function vb(n){const e=ye(n);await uo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function wb(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function gm(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Tb(n,e){const t=await mm(n,{},async()=>{const r=Zi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await pm(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&Cn(n.emulatorConfig.host)&&(l.credentials="include"),fm.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Eb(n,e){return Ur(n,"POST","/v2/accounts:revokeToken",sl(n,e))}/**
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
 */class wr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const t=Hh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await Tb(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new wr;return r&&(Y(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Y(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Y(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new wr,this.toJSON())}_performRefresh(){return Ht("not implemented")}}/**
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
 */function un(n,e){Y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class pt{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new yb(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new hc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Vi(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return gb(this,e)}reload(){return vb(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new pt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await uo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ct(this.auth.app))return Promise.reject(Hn(this.auth));const e=await this.getIdToken();return await Vi(this,pb(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,u=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:m,emailVerified:p,isAnonymous:_,providerData:S,stsTokenManager:P}=t;Y(m&&P,e,"internal-error");const k=wr.fromJSON(this.name,P);Y(typeof m=="string",e,"internal-error"),un(r,e.name),un(i,e.name),Y(typeof p=="boolean",e,"internal-error"),Y(typeof _=="boolean",e,"internal-error"),un(s,e.name),un(o,e.name),un(c,e.name),un(l,e.name),un(u,e.name),un(d,e.name);const N=new pt({uid:m,auth:e,email:i,emailVerified:p,displayName:r,isAnonymous:_,photoURL:o,phoneNumber:s,tenantId:c,stsTokenManager:k,createdAt:u,lastLoginAt:d});return S&&Array.isArray(S)&&(N.providerData=S.map(L=>({...L}))),l&&(N._redirectEventId=l),N}static async _fromIdTokenResponse(e,t,r=!1){const i=new wr;i.updateFromServerResponse(t);const s=new pt({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await uo(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];Y(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?gm(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new wr;c.updateFromIdToken(r);const l=new pt({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new hc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,u),l}}/**
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
 */const jh=new Map;function jt(n){Jt(n instanceof Function,"Expected a class definition");let e=jh.get(n);return e?(Jt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,jh.set(n,e),e)}/**
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
 */class _m{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}_m.type="NONE";const Gh=_m;/**
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
 */function Bs(n,e,t){return`firebase:${n}:${e}:${t}`}class Tr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Bs(this.userKey,i.apiKey,s),this.fullPersistenceKey=Bs("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await lo(this.auth,{idToken:e}).catch(()=>{});return t?pt._fromGetAccountInfoResponse(this.auth,t,e):null}return pt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Tr(jt(Gh),e,r);const i=(await Promise.all(t.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||jt(Gh);const o=Bs(r,e.config.apiKey,e.name);let c=null;for(const u of t)try{const d=await u._get(o);if(d){let m;if(typeof d=="string"){const p=await lo(e,{idToken:d}).catch(()=>{});if(!p)break;m=await pt._fromGetAccountInfoResponse(e,p,d)}else m=pt._fromJSON(e,d);u!==s&&(c=m),s=u;break}}catch{}const l=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Tr(s,e,r):(s=l[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Tr(s,e,r))}}/**
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
 */function Wh(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Tm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ym(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Im(e))return"Blackberry";if(bm(e))return"Webos";if(vm(e))return"Safari";if((e.includes("chrome/")||wm(e))&&!e.includes("edge/"))return"Chrome";if(Em(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ym(n=Ge()){return/firefox\//i.test(n)}function vm(n=Ge()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function wm(n=Ge()){return/crios\//i.test(n)}function Tm(n=Ge()){return/iemobile/i.test(n)}function Em(n=Ge()){return/android/i.test(n)}function Im(n=Ge()){return/blackberry/i.test(n)}function bm(n=Ge()){return/webos/i.test(n)}function al(n=Ge()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Ib(n=Ge()){var e;return al(n)&&!!((e=window.navigator)!=null&&e.standalone)}function bb(){return FE()&&document.documentMode===10}function Am(n=Ge()){return al(n)||Em(n)||bm(n)||Im(n)||/windows phone/i.test(n)||Tm(n)}/**
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
 */function Sm(n,e=[]){let t;switch(n){case"Browser":t=Wh(Ge());break;case"Worker":t=`${Wh(Ge())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${sr}/${r}`}/**
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
 */class Ab{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,c)=>{try{const l=e(s);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Sb(n,e={}){return Ur(n,"GET","/v2/passwordPolicy",sl(n,e))}/**
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
 */const Rb=6;class Cb{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Rb,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class Pb{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kh(this),this.idTokenSubscription=new Kh(this),this.beforeStateQueue=new Ab(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=dm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=jt(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Tr.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await lo(this,{idToken:e}),r=await pt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(ct(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,c=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(r=l.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await uo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=lb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ct(this.app))return Promise.reject(Hn(this));const t=e?ye(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ct(this.app)?Promise.reject(Hn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ct(this.app)?Promise.reject(Hn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(jt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Sb(this),t=new Cb(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ji("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Eb(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&jt(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await Tr.create(this,[jt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Sm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(ct(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&sb(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function xo(n){return ye(n)}class Kh{constructor(e){this.auth=e,this.observer=null,this.addObserver=WE(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let cl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function kb(n){cl=n}function Db(n){return cl.loadJS(n)}function xb(){return cl.gapiScript}function Nb(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Mb(n,e){const t=Do(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Xn(s,e??{}))return i;Mt(i,"already-initialized")}return t.initialize({options:e})}function Vb(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(jt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Lb(n,e,t){const r=xo(n);Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Rm(e),{host:o,port:c}=Ob(e),l=c===null?"":`:${c}`,u={url:`${s}//${o}${l}/`},d=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){Y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Y(Xn(u,r.config.emulator)&&Xn(d,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=d,r.settings.appVerificationDisabledForTesting=!0,Cn(o)?(Xc(`${s}//${o}${l}`),Jc("Auth",!0)):Ub()}function Rm(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Ob(n){const e=Rm(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Yh(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Yh(o)}}}function Yh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ub(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Cm{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ht("not implemented")}_getIdTokenResponse(e){return Ht("not implemented")}_linkToIdToken(e,t){return Ht("not implemented")}_getReauthenticationResolver(e){return Ht("not implemented")}}/**
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
 */async function Er(n,e){return fb(n,"POST","/v1/accounts:signInWithIdp",sl(n,e))}/**
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
 */const Fb="http://localhost";class Zn extends Cm{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Zn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Mt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const o=new Zn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Er(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Er(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Er(e,t)}buildRequest(){const e={requestUri:Fb,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Zi(t)}return e}}/**
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
 */class ll{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ts extends ll{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class hn extends ts{constructor(){super("facebook.com")}static credential(e){return Zn._fromParams({providerId:hn.PROVIDER_ID,signInMethod:hn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return hn.credentialFromTaggedObject(e)}static credentialFromError(e){return hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return hn.credential(e.oauthAccessToken)}catch{return null}}}hn.FACEBOOK_SIGN_IN_METHOD="facebook.com";hn.PROVIDER_ID="facebook.com";/**
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
 */class Bt extends ts{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Zn._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Bt.credential(t,r)}catch{return null}}}Bt.GOOGLE_SIGN_IN_METHOD="google.com";Bt.PROVIDER_ID="google.com";/**
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
 */class dn extends ts{constructor(){super("github.com")}static credential(e){return Zn._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return dn.credentialFromTaggedObject(e)}static credentialFromError(e){return dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return dn.credential(e.oauthAccessToken)}catch{return null}}}dn.GITHUB_SIGN_IN_METHOD="github.com";dn.PROVIDER_ID="github.com";/**
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
 */class fn extends ts{constructor(){super("twitter.com")}static credential(e,t){return Zn._fromParams({providerId:fn.PROVIDER_ID,signInMethod:fn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return fn.credentialFromTaggedObject(e)}static credentialFromError(e){return fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return fn.credential(t,r)}catch{return null}}}fn.TWITTER_SIGN_IN_METHOD="twitter.com";fn.PROVIDER_ID="twitter.com";/**
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
 */class kr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await pt._fromIdTokenResponse(e,r,i),o=Qh(r);return new kr({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Qh(r);return new kr({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Qh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ho extends Ot{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ho.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new ho(e,t,r,i)}}function Pm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ho._fromErrorAndOperation(n,s,e,r):s})}async function Bb(n,e,t=!1){const r=await Vi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return kr._forOperation(n,"link",r)}/**
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
 */async function $b(n,e,t=!1){const{auth:r}=n;if(ct(r.app))return Promise.reject(Hn(r));const i="reauthenticate";try{const s=await Vi(n,Pm(r,i,e,n),t);Y(s.idToken,r,"internal-error");const o=ol(s.idToken);Y(o,r,"internal-error");const{sub:c}=o;return Y(n.uid===c,r,"user-mismatch"),kr._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Mt(r,"user-mismatch"),s}}/**
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
 */async function zb(n,e,t=!1){if(ct(n.app))return Promise.reject(Hn(n));const r="signIn",i=await Pm(n,r,e),s=await kr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function qb(n,e,t,r){return ye(n).onIdTokenChanged(e,t,r)}function Hb(n,e,t){return ye(n).beforeAuthStateChanged(e,t)}function jb(n,e,t,r){return ye(n).onAuthStateChanged(e,t,r)}function Gb(n){return ye(n).signOut()}const fo="__sak";/**
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
 */class km{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(fo,"1"),this.storage.removeItem(fo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Wb=1e3,Kb=10;class Dm extends km{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Am(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);bb()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Kb):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Wb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Dm.type="LOCAL";const Yb=Dm;/**
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
 */class xm extends km{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}xm.type="SESSION";const Nm=xm;/**
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
 */function Qb(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class No{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new No(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(o).map(async u=>u(t.origin,s)),l=await Qb(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}No.receivers=[];/**
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
 */function ul(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Xb{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,l)=>{const u=ul("",20);i.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(m){const p=m;if(p.data.eventId===u)switch(p.data.status){case"ack":clearTimeout(d),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(p.data.response);break;default:clearTimeout(d),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function kt(){return window}function Jb(n){kt().location.href=n}/**
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
 */function Mm(){return typeof kt().WorkerGlobalScope<"u"&&typeof kt().importScripts=="function"}async function Zb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function eA(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function tA(){return Mm()?self:null}/**
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
 */const Vm="firebaseLocalStorageDb",nA=1,mo="firebaseLocalStorage",Lm="fbase_key";class ns{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Mo(n,e){return n.transaction([mo],e?"readwrite":"readonly").objectStore(mo)}function rA(){const n=indexedDB.deleteDatabase(Vm);return new ns(n).toPromise()}function dc(){const n=indexedDB.open(Vm,nA);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(mo,{keyPath:Lm})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(mo)?e(r):(r.close(),await rA(),e(await dc()))})})}async function Xh(n,e,t){const r=Mo(n,!0).put({[Lm]:e,value:t});return new ns(r).toPromise()}async function iA(n,e){const t=Mo(n,!1).get(e),r=await new ns(t).toPromise();return r===void 0?null:r.value}function Jh(n,e){const t=Mo(n,!0).delete(e);return new ns(t).toPromise()}const sA=800,oA=3;class Om{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await dc(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>oA)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Mm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=No._getInstance(tA()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Zb(),!this.activeServiceWorker)return;this.sender=new Xb(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||eA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await dc();return await Xh(e,fo,"1"),await Jh(e,fo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Xh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>iA(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Jh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Mo(i,!1).getAll();return new ns(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),sA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Om.type="LOCAL";const aA=Om;new es(3e4,6e4);/**
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
 */function Um(n,e){return e?jt(e):(Y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class hl extends Cm{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Er(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Er(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Er(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function cA(n){return zb(n.auth,new hl(n),n.bypassAuthState)}function lA(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),$b(t,new hl(n),n.bypassAuthState)}async function uA(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),Bb(t,new hl(n),n.bypassAuthState)}/**
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
 */class Fm{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cA;case"linkViaPopup":case"linkViaRedirect":return uA;case"reauthViaPopup":case"reauthViaRedirect":return lA;default:Mt(this.auth,"internal-error")}}resolve(e){Jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const hA=new es(2e3,1e4);async function dA(n,e,t){if(ct(n.app))return Promise.reject(yt(n,"operation-not-supported-in-this-environment"));const r=xo(n);ob(n,e,ll);const i=Um(r,t);return new $n(r,"signInViaPopup",e,i).executeNotNull()}class $n extends Fm{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,$n.currentPopupAction&&$n.currentPopupAction.cancel(),$n.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){Jt(this.filter.length===1,"Popup operations only handle one event");const e=ul();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$n.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,hA.get())};e()}}$n.currentPopupAction=null;/**
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
 */const fA="pendingRedirect",$s=new Map;class mA extends Fm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=$s.get(this.auth._key());if(!e){try{const r=await pA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}$s.set(this.auth._key(),e)}return this.bypassAuthState||$s.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pA(n,e){const t=yA(e),r=_A(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function gA(n,e){$s.set(n._key(),e)}function _A(n){return jt(n._redirectPersistence)}function yA(n){return Bs(fA,n.config.apiKey,n.name)}async function vA(n,e,t=!1){if(ct(n.app))return Promise.reject(Hn(n));const r=xo(n),i=Um(r,e),o=await new mA(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const wA=10*60*1e3;class TA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!EA(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Bm(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(yt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=wA&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zh(e))}saveEventToCache(e){this.cachedEventUids.add(Zh(e)),this.lastProcessedEventTime=Date.now()}}function Zh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Bm({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function EA(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Bm(n);default:return!1}}/**
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
 */async function IA(n,e={}){return Ur(n,"GET","/v1/projects",e)}/**
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
 */const bA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,AA=/^https?/;async function SA(n){if(n.config.emulator)return;const{authorizedDomains:e}=await IA(n);for(const t of e)try{if(RA(t))return}catch{}Mt(n,"unauthorized-domain")}function RA(n){const e=uc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!AA.test(t))return!1;if(bA.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const CA=new es(3e4,6e4);function ed(){const n=kt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function PA(n){return new Promise((e,t)=>{var i,s,o;function r(){ed(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ed(),t(yt(n,"network-request-failed"))},timeout:CA.get()})}if((s=(i=kt().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=kt().gapi)!=null&&o.load)r();else{const c=Nb("iframefcb");return kt()[c]=()=>{gapi.load?r():t(yt(n,"network-request-failed"))},Db(`${xb()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw zs=null,e})}let zs=null;function kA(n){return zs=zs||PA(n),zs}/**
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
 */const DA=new es(5e3,15e3),xA="__/auth/iframe",NA="emulator/auth/iframe",MA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},VA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function LA(n){const e=n.config;Y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?il(e,NA):`https://${n.config.authDomain}/${xA}`,r={apiKey:e.apiKey,appName:n.name,v:sr},i=VA.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Zi(r).slice(1)}`}async function OA(n){const e=await kA(n),t=kt().gapi;return Y(t,n,"internal-error"),e.open({where:document.body,url:LA(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:MA,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=yt(n,"network-request-failed"),c=kt().setTimeout(()=>{s(o)},DA.get());function l(){kt().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
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
 */const UA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},FA=500,BA=600,$A="_blank",zA="http://localhost";class td{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function qA(n,e,t,r=FA,i=BA){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...UA,width:r.toString(),height:i.toString(),top:s,left:o},u=Ge().toLowerCase();t&&(c=wm(u)?$A:t),ym(u)&&(e=e||zA,l.scrollbars="yes");const d=Object.entries(l).reduce((p,[_,S])=>`${p}${_}=${S},`,"");if(Ib(u)&&c!=="_self")return HA(e||"",c),new td(null);const m=window.open(e||"",c,d);Y(m,n,"popup-blocked");try{m.focus()}catch{}return new td(m)}function HA(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const jA="__/auth/handler",GA="emulator/auth/handler",WA=encodeURIComponent("fac");async function nd(n,e,t,r,i,s){Y(n.config.authDomain,n,"auth-domain-config-required"),Y(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:sr,eventId:i};if(e instanceof ll){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",GE(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,m]of Object.entries({}))o[d]=m}if(e instanceof ts){const d=e.getScopes().filter(m=>m!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const d of Object.keys(c))c[d]===void 0&&delete c[d];const l=await n._getAppCheckToken(),u=l?`#${WA}=${encodeURIComponent(l)}`:"";return`${KA(n)}?${Zi(c).slice(1)}${u}`}function KA({config:n}){return n.emulator?il(n,GA):`https://${n.authDomain}/${jA}`}/**
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
 */const La="webStorageSupport";class YA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Nm,this._completeRedirectFn=vA,this._overrideRedirectResult=gA}async _openPopup(e,t,r,i){var o;Jt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await nd(e,t,r,uc(),i);return qA(e,s,ul())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await nd(e,t,r,uc(),i);return Jb(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Jt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await OA(e),r=new TA(e);return t.register("authEvent",i=>(Y(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(La,{type:La},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[La];s!==void 0&&t(!!s),Mt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=SA(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Am()||vm()||al()}}const QA=YA;var rd="@firebase/auth",id="1.12.0";/**
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
 */class XA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function JA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ZA(n){Jn(new Tn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;Y(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Sm(n)},u=new Pb(r,i,s,l);return Vb(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Jn(new Tn("auth-internal",e=>{const t=xo(e.getProvider("auth").getImmediate());return(r=>new XA(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Pt(rd,id,JA(n)),Pt(rd,id,"esm2020")}/**
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
 */const eS=5*60,tS=im("authIdTokenMaxAge")||eS;let sd=null;const nS=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>tS)return;const i=t==null?void 0:t.token;sd!==i&&(sd=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function rS(n=tl()){const e=Do(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Mb(n,{popupRedirectResolver:QA,persistence:[aA,Yb,Nm]}),r=im("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=nS(s.toString());Hb(t,o,()=>o(t.currentUser)),qb(t,c=>o(c))}}const i=tm("auth");return i&&Lb(t,`http://${i}`),t}function iS(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}kb({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=yt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",iS().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ZA("Browser");var od=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vn,$m;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,y){function w(){}w.prototype=y.prototype,T.F=y.prototype,T.prototype=new w,T.prototype.constructor=T,T.D=function(I,E,b){for(var v=Array(arguments.length-2),R=2;R<arguments.length;R++)v[R-2]=arguments[R];return y.prototype[E].apply(I,v)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(T,y,w){w||(w=0);const I=Array(16);if(typeof y=="string")for(var E=0;E<16;++E)I[E]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(E=0;E<16;++E)I[E]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=T.g[0],w=T.g[1],E=T.g[2];let b=T.g[3],v;v=y+(b^w&(E^b))+I[0]+3614090360&4294967295,y=w+(v<<7&4294967295|v>>>25),v=b+(E^y&(w^E))+I[1]+3905402710&4294967295,b=y+(v<<12&4294967295|v>>>20),v=E+(w^b&(y^w))+I[2]+606105819&4294967295,E=b+(v<<17&4294967295|v>>>15),v=w+(y^E&(b^y))+I[3]+3250441966&4294967295,w=E+(v<<22&4294967295|v>>>10),v=y+(b^w&(E^b))+I[4]+4118548399&4294967295,y=w+(v<<7&4294967295|v>>>25),v=b+(E^y&(w^E))+I[5]+1200080426&4294967295,b=y+(v<<12&4294967295|v>>>20),v=E+(w^b&(y^w))+I[6]+2821735955&4294967295,E=b+(v<<17&4294967295|v>>>15),v=w+(y^E&(b^y))+I[7]+4249261313&4294967295,w=E+(v<<22&4294967295|v>>>10),v=y+(b^w&(E^b))+I[8]+1770035416&4294967295,y=w+(v<<7&4294967295|v>>>25),v=b+(E^y&(w^E))+I[9]+2336552879&4294967295,b=y+(v<<12&4294967295|v>>>20),v=E+(w^b&(y^w))+I[10]+4294925233&4294967295,E=b+(v<<17&4294967295|v>>>15),v=w+(y^E&(b^y))+I[11]+2304563134&4294967295,w=E+(v<<22&4294967295|v>>>10),v=y+(b^w&(E^b))+I[12]+1804603682&4294967295,y=w+(v<<7&4294967295|v>>>25),v=b+(E^y&(w^E))+I[13]+4254626195&4294967295,b=y+(v<<12&4294967295|v>>>20),v=E+(w^b&(y^w))+I[14]+2792965006&4294967295,E=b+(v<<17&4294967295|v>>>15),v=w+(y^E&(b^y))+I[15]+1236535329&4294967295,w=E+(v<<22&4294967295|v>>>10),v=y+(E^b&(w^E))+I[1]+4129170786&4294967295,y=w+(v<<5&4294967295|v>>>27),v=b+(w^E&(y^w))+I[6]+3225465664&4294967295,b=y+(v<<9&4294967295|v>>>23),v=E+(y^w&(b^y))+I[11]+643717713&4294967295,E=b+(v<<14&4294967295|v>>>18),v=w+(b^y&(E^b))+I[0]+3921069994&4294967295,w=E+(v<<20&4294967295|v>>>12),v=y+(E^b&(w^E))+I[5]+3593408605&4294967295,y=w+(v<<5&4294967295|v>>>27),v=b+(w^E&(y^w))+I[10]+38016083&4294967295,b=y+(v<<9&4294967295|v>>>23),v=E+(y^w&(b^y))+I[15]+3634488961&4294967295,E=b+(v<<14&4294967295|v>>>18),v=w+(b^y&(E^b))+I[4]+3889429448&4294967295,w=E+(v<<20&4294967295|v>>>12),v=y+(E^b&(w^E))+I[9]+568446438&4294967295,y=w+(v<<5&4294967295|v>>>27),v=b+(w^E&(y^w))+I[14]+3275163606&4294967295,b=y+(v<<9&4294967295|v>>>23),v=E+(y^w&(b^y))+I[3]+4107603335&4294967295,E=b+(v<<14&4294967295|v>>>18),v=w+(b^y&(E^b))+I[8]+1163531501&4294967295,w=E+(v<<20&4294967295|v>>>12),v=y+(E^b&(w^E))+I[13]+2850285829&4294967295,y=w+(v<<5&4294967295|v>>>27),v=b+(w^E&(y^w))+I[2]+4243563512&4294967295,b=y+(v<<9&4294967295|v>>>23),v=E+(y^w&(b^y))+I[7]+1735328473&4294967295,E=b+(v<<14&4294967295|v>>>18),v=w+(b^y&(E^b))+I[12]+2368359562&4294967295,w=E+(v<<20&4294967295|v>>>12),v=y+(w^E^b)+I[5]+4294588738&4294967295,y=w+(v<<4&4294967295|v>>>28),v=b+(y^w^E)+I[8]+2272392833&4294967295,b=y+(v<<11&4294967295|v>>>21),v=E+(b^y^w)+I[11]+1839030562&4294967295,E=b+(v<<16&4294967295|v>>>16),v=w+(E^b^y)+I[14]+4259657740&4294967295,w=E+(v<<23&4294967295|v>>>9),v=y+(w^E^b)+I[1]+2763975236&4294967295,y=w+(v<<4&4294967295|v>>>28),v=b+(y^w^E)+I[4]+1272893353&4294967295,b=y+(v<<11&4294967295|v>>>21),v=E+(b^y^w)+I[7]+4139469664&4294967295,E=b+(v<<16&4294967295|v>>>16),v=w+(E^b^y)+I[10]+3200236656&4294967295,w=E+(v<<23&4294967295|v>>>9),v=y+(w^E^b)+I[13]+681279174&4294967295,y=w+(v<<4&4294967295|v>>>28),v=b+(y^w^E)+I[0]+3936430074&4294967295,b=y+(v<<11&4294967295|v>>>21),v=E+(b^y^w)+I[3]+3572445317&4294967295,E=b+(v<<16&4294967295|v>>>16),v=w+(E^b^y)+I[6]+76029189&4294967295,w=E+(v<<23&4294967295|v>>>9),v=y+(w^E^b)+I[9]+3654602809&4294967295,y=w+(v<<4&4294967295|v>>>28),v=b+(y^w^E)+I[12]+3873151461&4294967295,b=y+(v<<11&4294967295|v>>>21),v=E+(b^y^w)+I[15]+530742520&4294967295,E=b+(v<<16&4294967295|v>>>16),v=w+(E^b^y)+I[2]+3299628645&4294967295,w=E+(v<<23&4294967295|v>>>9),v=y+(E^(w|~b))+I[0]+4096336452&4294967295,y=w+(v<<6&4294967295|v>>>26),v=b+(w^(y|~E))+I[7]+1126891415&4294967295,b=y+(v<<10&4294967295|v>>>22),v=E+(y^(b|~w))+I[14]+2878612391&4294967295,E=b+(v<<15&4294967295|v>>>17),v=w+(b^(E|~y))+I[5]+4237533241&4294967295,w=E+(v<<21&4294967295|v>>>11),v=y+(E^(w|~b))+I[12]+1700485571&4294967295,y=w+(v<<6&4294967295|v>>>26),v=b+(w^(y|~E))+I[3]+2399980690&4294967295,b=y+(v<<10&4294967295|v>>>22),v=E+(y^(b|~w))+I[10]+4293915773&4294967295,E=b+(v<<15&4294967295|v>>>17),v=w+(b^(E|~y))+I[1]+2240044497&4294967295,w=E+(v<<21&4294967295|v>>>11),v=y+(E^(w|~b))+I[8]+1873313359&4294967295,y=w+(v<<6&4294967295|v>>>26),v=b+(w^(y|~E))+I[15]+4264355552&4294967295,b=y+(v<<10&4294967295|v>>>22),v=E+(y^(b|~w))+I[6]+2734768916&4294967295,E=b+(v<<15&4294967295|v>>>17),v=w+(b^(E|~y))+I[13]+1309151649&4294967295,w=E+(v<<21&4294967295|v>>>11),v=y+(E^(w|~b))+I[4]+4149444226&4294967295,y=w+(v<<6&4294967295|v>>>26),v=b+(w^(y|~E))+I[11]+3174756917&4294967295,b=y+(v<<10&4294967295|v>>>22),v=E+(y^(b|~w))+I[2]+718787259&4294967295,E=b+(v<<15&4294967295|v>>>17),v=w+(b^(E|~y))+I[9]+3951481745&4294967295,T.g[0]=T.g[0]+y&4294967295,T.g[1]=T.g[1]+(E+(v<<21&4294967295|v>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+b&4294967295}r.prototype.v=function(T,y){y===void 0&&(y=T.length);const w=y-this.blockSize,I=this.C;let E=this.h,b=0;for(;b<y;){if(E==0)for(;b<=w;)i(this,T,b),b+=this.blockSize;if(typeof T=="string"){for(;b<y;)if(I[E++]=T.charCodeAt(b++),E==this.blockSize){i(this,I),E=0;break}}else for(;b<y;)if(I[E++]=T[b++],E==this.blockSize){i(this,I),E=0;break}}this.h=E,this.o+=y},r.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var y=1;y<T.length-8;++y)T[y]=0;y=this.o*8;for(var w=T.length-8;w<T.length;++w)T[w]=y&255,y/=256;for(this.v(T),T=Array(16),y=0,w=0;w<4;++w)for(let I=0;I<32;I+=8)T[y++]=this.g[w]>>>I&255;return T};function s(T,y){var w=c;return Object.prototype.hasOwnProperty.call(w,T)?w[T]:w[T]=y(T)}function o(T,y){this.h=y;const w=[];let I=!0;for(let E=T.length-1;E>=0;E--){const b=T[E]|0;I&&b==y||(w[E]=b,I=!1)}this.g=w}var c={};function l(T){return-128<=T&&T<128?s(T,function(y){return new o([y|0],y<0?-1:0)}):new o([T|0],T<0?-1:0)}function u(T){if(isNaN(T)||!isFinite(T))return m;if(T<0)return k(u(-T));const y=[];let w=1;for(let I=0;T>=w;I++)y[I]=T/w|0,w*=4294967296;return new o(y,0)}function d(T,y){if(T.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(T.charAt(0)=="-")return k(d(T.substring(1),y));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const w=u(Math.pow(y,8));let I=m;for(let b=0;b<T.length;b+=8){var E=Math.min(8,T.length-b);const v=parseInt(T.substring(b,b+E),y);E<8?(E=u(Math.pow(y,E)),I=I.j(E).add(u(v))):(I=I.j(w),I=I.add(u(v)))}return I}var m=l(0),p=l(1),_=l(16777216);n=o.prototype,n.m=function(){if(P(this))return-k(this).m();let T=0,y=1;for(let w=0;w<this.g.length;w++){const I=this.i(w);T+=(I>=0?I:4294967296+I)*y,y*=4294967296}return T},n.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(S(this))return"0";if(P(this))return"-"+k(this).toString(T);const y=u(Math.pow(T,6));var w=this;let I="";for(;;){const E=H(w,y).g;w=N(w,E.j(y));let b=((w.g.length>0?w.g[0]:w.h)>>>0).toString(T);if(w=E,S(w))return b+I;for(;b.length<6;)b="0"+b;I=b+I}},n.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function S(T){if(T.h!=0)return!1;for(let y=0;y<T.g.length;y++)if(T.g[y]!=0)return!1;return!0}function P(T){return T.h==-1}n.l=function(T){return T=N(this,T),P(T)?-1:S(T)?0:1};function k(T){const y=T.g.length,w=[];for(let I=0;I<y;I++)w[I]=~T.g[I];return new o(w,~T.h).add(p)}n.abs=function(){return P(this)?k(this):this},n.add=function(T){const y=Math.max(this.g.length,T.g.length),w=[];let I=0;for(let E=0;E<=y;E++){let b=I+(this.i(E)&65535)+(T.i(E)&65535),v=(b>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);I=v>>>16,b&=65535,v&=65535,w[E]=v<<16|b}return new o(w,w[w.length-1]&-2147483648?-1:0)};function N(T,y){return T.add(k(y))}n.j=function(T){if(S(this)||S(T))return m;if(P(this))return P(T)?k(this).j(k(T)):k(k(this).j(T));if(P(T))return k(this.j(k(T)));if(this.l(_)<0&&T.l(_)<0)return u(this.m()*T.m());const y=this.g.length+T.g.length,w=[];for(var I=0;I<2*y;I++)w[I]=0;for(I=0;I<this.g.length;I++)for(let E=0;E<T.g.length;E++){const b=this.i(I)>>>16,v=this.i(I)&65535,R=T.i(E)>>>16,q=T.i(E)&65535;w[2*I+2*E]+=v*q,L(w,2*I+2*E),w[2*I+2*E+1]+=b*q,L(w,2*I+2*E+1),w[2*I+2*E+1]+=v*R,L(w,2*I+2*E+1),w[2*I+2*E+2]+=b*R,L(w,2*I+2*E+2)}for(T=0;T<y;T++)w[T]=w[2*T+1]<<16|w[2*T];for(T=y;T<2*y;T++)w[T]=0;return new o(w,0)};function L(T,y){for(;(T[y]&65535)!=T[y];)T[y+1]+=T[y]>>>16,T[y]&=65535,y++}function B(T,y){this.g=T,this.h=y}function H(T,y){if(S(y))throw Error("division by zero");if(S(T))return new B(m,m);if(P(T))return y=H(k(T),y),new B(k(y.g),k(y.h));if(P(y))return y=H(T,k(y)),new B(k(y.g),y.h);if(T.g.length>30){if(P(T)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var w=p,I=y;I.l(T)<=0;)w=J(w),I=J(I);var E=U(w,1),b=U(I,1);for(I=U(I,2),w=U(w,2);!S(I);){var v=b.add(I);v.l(T)<=0&&(E=E.add(w),b=v),I=U(I,1),w=U(w,1)}return y=N(T,E.j(y)),new B(E,y)}for(E=m;T.l(y)>=0;){for(w=Math.max(1,Math.floor(T.m()/y.m())),I=Math.ceil(Math.log(w)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),b=u(w),v=b.j(y);P(v)||v.l(T)>0;)w-=I,b=u(w),v=b.j(y);S(b)&&(b=p),E=E.add(b),T=N(T,v)}return new B(E,T)}n.B=function(T){return H(this,T).h},n.and=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let I=0;I<y;I++)w[I]=this.i(I)&T.i(I);return new o(w,this.h&T.h)},n.or=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let I=0;I<y;I++)w[I]=this.i(I)|T.i(I);return new o(w,this.h|T.h)},n.xor=function(T){const y=Math.max(this.g.length,T.g.length),w=[];for(let I=0;I<y;I++)w[I]=this.i(I)^T.i(I);return new o(w,this.h^T.h)};function J(T){const y=T.g.length+1,w=[];for(let I=0;I<y;I++)w[I]=T.i(I)<<1|T.i(I-1)>>>31;return new o(w,T.h)}function U(T,y){const w=y>>5;y%=32;const I=T.g.length-w,E=[];for(let b=0;b<I;b++)E[b]=y>0?T.i(b+w)>>>y|T.i(b+w+1)<<32-y:T.i(b+w);return new o(E,T.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,$m=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=d,vn=o}).apply(typeof od<"u"?od:typeof self<"u"?self:typeof window<"u"?window:{});var Ss=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zm,gi,qm,qs,fc,Hm,jm,Gm;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ss=="object"&&Ss];for(var h=0;h<a.length;++h){var f=a[h];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=t(this);function i(a,h){if(h)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var A=a[g];if(!(A in f))break e;f=f[A]}a=a[a.length-1],g=f[a],h=h(g),h!=g&&h!=null&&e(f,a,{configurable:!0,writable:!0,value:h})}}i("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(a){return a||function(h){var f=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&f.push([g,h[g]]);return f}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},o=this||self;function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function l(a,h,f){return a.call.apply(a.bind,arguments)}function u(a,h,f){return u=l,u.apply(null,arguments)}function d(a,h){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function m(a,h){function f(){}f.prototype=h.prototype,a.Z=h.prototype,a.prototype=new f,a.prototype.constructor=a,a.Ob=function(g,A,C){for(var O=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)O[ee-2]=arguments[ee];return h.prototype[A].apply(g,O)}}var p=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function _(a){const h=a.length;if(h>0){const f=Array(h);for(let g=0;g<h;g++)f[g]=a[g];return f}return[]}function S(a,h){for(let g=1;g<arguments.length;g++){const A=arguments[g];var f=typeof A;if(f=f!="object"?f:A?Array.isArray(A)?"array":f:"null",f=="array"||f=="object"&&typeof A.length=="number"){f=a.length||0;const C=A.length||0;a.length=f+C;for(let O=0;O<C;O++)a[f+O]=A[O]}else a.push(A)}}class P{constructor(h,f){this.i=h,this.j=f,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function k(a){o.setTimeout(()=>{throw a},0)}function N(){var a=T;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class L{constructor(){this.h=this.g=null}add(h,f){const g=B.get();g.set(h,f),this.h?this.h.next=g:this.g=g,this.h=g}}var B=new P(()=>new H,a=>a.reset());class H{constructor(){this.next=this.g=this.h=null}set(h,f){this.h=h,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let J,U=!1,T=new L,y=()=>{const a=Promise.resolve(void 0);J=()=>{a.then(w)}};function w(){for(var a;a=N();){try{a.h.call(a.g)}catch(f){k(f)}var h=B;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}U=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var b=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};o.addEventListener("test",f,h),o.removeEventListener("test",f,h)}catch{}return a}();function v(a){return/^[\s\xa0]*$/.test(a)}function R(a,h){E.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}m(R,E),R.prototype.init=function(a,h){const f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(f=="mouseover"?h=a.fromElement:f=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&R.Z.h.call(this)},R.prototype.h=function(){R.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var q="closure_listenable_"+(Math.random()*1e6|0),V=0;function j(a,h,f,g,A){this.listener=a,this.proxy=null,this.src=h,this.type=f,this.capture=!!g,this.ha=A,this.key=++V,this.da=this.fa=!1}function K(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Z(a,h,f){for(const g in a)h.call(f,a[g],g,a)}function te(a,h){for(const f in a)h.call(void 0,a[f],f,a)}function le(a){const h={};for(const f in a)h[f]=a[f];return h}const fe="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function We(a,h){let f,g;for(let A=1;A<arguments.length;A++){g=arguments[A];for(f in g)a[f]=g[f];for(let C=0;C<fe.length;C++)f=fe[C],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function _e(a){this.src=a,this.g={},this.h=0}_e.prototype.add=function(a,h,f,g,A){const C=a.toString();a=this.g[C],a||(a=this.g[C]=[],this.h++);const O=Ke(a,h,g,A);return O>-1?(h=a[O],f||(h.fa=!1)):(h=new j(h,this.src,C,!!g,A),h.fa=f,a.push(h)),h};function Ve(a,h){const f=h.type;if(f in a.g){var g=a.g[f],A=Array.prototype.indexOf.call(g,h,void 0),C;(C=A>=0)&&Array.prototype.splice.call(g,A,1),C&&(K(h),a.g[f].length==0&&(delete a.g[f],a.h--))}}function Ke(a,h,f,g){for(let A=0;A<a.length;++A){const C=a[A];if(!C.da&&C.listener==h&&C.capture==!!f&&C.ha==g)return A}return-1}var Le="closure_lm_"+(Math.random()*1e6|0),Ye={};function $(a,h,f,g,A){if(Array.isArray(h)){for(let C=0;C<h.length;C++)$(a,h[C],f,g,A);return null}return f=Hr(f),a&&a[q]?a.J(h,f,c(g)?!!g.capture:!1,A):ne(a,h,f,!1,g,A)}function ne(a,h,f,g,A,C){if(!h)throw Error("Invalid event type");const O=c(A)?!!A.capture:!!A;let ee=Oe(a);if(ee||(a[Le]=ee=new _e(a)),f=ee.add(h,f,g,O,C),f.proxy)return f;if(g=oe(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)b||(A=O),A===void 0&&(A=!1),a.addEventListener(h.toString(),g,A);else if(a.attachEvent)a.attachEvent(he(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function oe(){function a(f){return h.call(a.src,a.listener,f)}const h=Qe;return a}function M(a,h,f,g,A){if(Array.isArray(h))for(var C=0;C<h.length;C++)M(a,h[C],f,g,A);else g=c(g)?!!g.capture:!!g,f=Hr(f),a&&a[q]?(a=a.i,C=String(h).toString(),C in a.g&&(h=a.g[C],f=Ke(h,f,g,A),f>-1&&(K(h[f]),Array.prototype.splice.call(h,f,1),h.length==0&&(delete a.g[C],a.h--)))):a&&(a=Oe(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Ke(h,f,g,A)),(f=a>-1?h[a]:null)&&De(f))}function De(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[q])Ve(h.i,a);else{var f=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(f,g,a.capture):h.detachEvent?h.detachEvent(he(f),g):h.addListener&&h.removeListener&&h.removeListener(g),(f=Oe(h))?(Ve(f,a),f.h==0&&(f.src=null,h[Le]=null)):K(a)}}}function he(a){return a in Ye?Ye[a]:Ye[a]="on"+a}function Qe(a,h){if(a.da)a=!0;else{h=new R(h,this);const f=a.listener,g=a.ha||a.src;a.fa&&De(a),a=f.call(g,h)}return a}function Oe(a){return a=a[Le],a instanceof _e?a:null}var dt="__closure_events_fn_"+(Math.random()*1e9>>>0);function Hr(a){return typeof a=="function"?a:(a[dt]||(a[dt]=function(h){return a.handleEvent(h)}),a[dt])}function $e(){I.call(this),this.i=new _e(this),this.M=this,this.G=null}m($e,I),$e.prototype[q]=!0,$e.prototype.removeEventListener=function(a,h,f,g){M(this,a,h,f,g)};function Xe(a,h){var f,g=a.G;if(g)for(f=[];g;g=g.G)f.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new E(h,a);else if(h instanceof E)h.target=h.target||a;else{var A=h;h=new E(g,a),We(h,A)}A=!0;let C,O;if(f)for(O=f.length-1;O>=0;O--)C=h.g=f[O],A=ls(C,g,!0,h)&&A;if(C=h.g=a,A=ls(C,g,!0,h)&&A,A=ls(C,g,!1,h)&&A,f)for(O=0;O<f.length;O++)C=h.g=f[O],A=ls(C,g,!1,h)&&A}$e.prototype.N=function(){if($e.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const f=a.g[h];for(let g=0;g<f.length;g++)K(f[g]);delete a.g[h],a.h--}}this.G=null},$e.prototype.J=function(a,h,f,g){return this.i.add(String(a),h,!1,f,g)},$e.prototype.K=function(a,h,f,g){return this.i.add(String(a),h,!0,f,g)};function ls(a,h,f,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let A=!0;for(let C=0;C<h.length;++C){const O=h[C];if(O&&!O.da&&O.capture==f){const ee=O.listener,Ce=O.ha||O.src;O.fa&&Ve(a.i,O),A=ee.call(Ce,g)!==!1&&A}}return A&&!g.defaultPrevented}function Ug(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=u(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function ru(a){a.g=Ug(()=>{a.g=null,a.i&&(a.i=!1,ru(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Fg extends I{constructor(h,f){super(),this.m=h,this.l=f,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:ru(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function jr(a){I.call(this),this.h=a,this.g={}}m(jr,I);var iu=[];function su(a){Z(a.g,function(h,f){this.g.hasOwnProperty(f)&&De(h)},a),a.g={}}jr.prototype.N=function(){jr.Z.N.call(this),su(this)},jr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ra=o.JSON.stringify,Bg=o.JSON.parse,$g=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function ou(){}function au(){}var Gr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ia(){E.call(this,"d")}m(ia,E);function sa(){E.call(this,"c")}m(sa,E);var xn={},cu=null;function us(){return cu=cu||new $e}xn.Ia="serverreachability";function lu(a){E.call(this,xn.Ia,a)}m(lu,E);function Wr(a){const h=us();Xe(h,new lu(h))}xn.STAT_EVENT="statevent";function uu(a,h){E.call(this,xn.STAT_EVENT,a),this.stat=h}m(uu,E);function Je(a){const h=us();Xe(h,new uu(h,a))}xn.Ja="timingevent";function hu(a,h){E.call(this,xn.Ja,a),this.size=h}m(hu,E);function Kr(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function Yr(){this.g=!0}Yr.prototype.ua=function(){this.g=!1};function zg(a,h,f,g,A,C){a.info(function(){if(a.g)if(C){var O="",ee=C.split("&");for(let de=0;de<ee.length;de++){var Ce=ee[de].split("=");if(Ce.length>1){const xe=Ce[0];Ce=Ce[1];const bt=xe.split("_");O=bt.length>=2&&bt[1]=="type"?O+(xe+"="+Ce+"&"):O+(xe+"=redacted&")}}}else O=null;else O=C;return"XMLHTTP REQ ("+g+") [attempt "+A+"]: "+h+`
`+f+`
`+O})}function qg(a,h,f,g,A,C,O){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+A+"]: "+h+`
`+f+`
`+C+" "+O})}function lr(a,h,f,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+jg(a,f)+(g?" "+g:"")})}function Hg(a,h){a.info(function(){return"TIMEOUT: "+h})}Yr.prototype.info=function(){};function jg(a,h){if(!a.g)return h;if(!h)return null;try{const C=JSON.parse(h);if(C){for(a=0;a<C.length;a++)if(Array.isArray(C[a])){var f=C[a];if(!(f.length<2)){var g=f[1];if(Array.isArray(g)&&!(g.length<1)){var A=g[0];if(A!="noop"&&A!="stop"&&A!="close")for(let O=1;O<g.length;O++)g[O]=""}}}}return ra(C)}catch{return h}}var hs={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},du={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},fu;function oa(){}m(oa,ou),oa.prototype.g=function(){return new XMLHttpRequest},fu=new oa;function Qr(a){return encodeURIComponent(String(a))}function Gg(a){var h=1;a=a.split(":");const f=[];for(;h>0&&a.length;)f.push(a.shift()),h--;return a.length&&f.push(a.join(":")),f}function rn(a,h,f,g){this.j=a,this.i=h,this.l=f,this.S=g||1,this.V=new jr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new mu}function mu(){this.i=null,this.g="",this.h=!1}var pu={},aa={};function ca(a,h,f){a.M=1,a.A=fs(It(h)),a.u=f,a.R=!0,gu(a,null)}function gu(a,h){a.F=Date.now(),ds(a),a.B=It(a.A);var f=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),Pu(f.i,"t",g),a.C=0,f=a.j.L,a.h=new mu,a.g=Wu(a.j,f?h:null,!a.u),a.P>0&&(a.O=new Fg(u(a.Y,a,a.g),a.P)),h=a.V,f=a.g,g=a.ba;var A="readystatechange";Array.isArray(A)||(A&&(iu[0]=A.toString()),A=iu);for(let C=0;C<A.length;C++){const O=$(f,A[C],g||h.handleEvent,!1,h.h||h);if(!O)break;h.g[O.key]=O}h=a.J?le(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Wr(),zg(a.i,a.v,a.B,a.l,a.S,a.u)}rn.prototype.ba=function(a){a=a.target;const h=this.O;h&&an(a)==3?h.j():this.Y(a)},rn.prototype.Y=function(a){try{if(a==this.g)e:{const ee=an(this.g),Ce=this.g.ya(),de=this.g.ca();if(!(ee<3)&&(ee!=3||this.g&&(this.h.h||this.g.la()||Lu(this.g)))){this.K||ee!=4||Ce==7||(Ce==8||de<=0?Wr(3):Wr(2)),la(this);var h=this.g.ca();this.X=h;var f=Wg(this);if(this.o=h==200,qg(this.i,this.v,this.B,this.l,this.S,ee,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,A=this.g;if((g=A.g?A.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(g)){var C=g;break t}}C=null}if(a=C)lr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ua(this,a);else{this.o=!1,this.m=3,Je(12),Nn(this),Xr(this);break e}}if(this.R){a=!0;let xe;for(;!this.K&&this.C<f.length;)if(xe=Kg(this,f),xe==aa){ee==4&&(this.m=4,Je(14),a=!1),lr(this.i,this.l,null,"[Incomplete Response]");break}else if(xe==pu){this.m=4,Je(15),lr(this.i,this.l,f,"[Invalid Chunk]"),a=!1;break}else lr(this.i,this.l,xe,null),ua(this,xe);if(_u(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ee!=4||f.length!=0||this.h.h||(this.m=1,Je(16),a=!1),this.o=this.o&&a,!a)lr(this.i,this.l,f,"[Invalid Chunked Response]"),Nn(this),Xr(this);else if(f.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+f.length),ya(O),O.P=!0,Je(11))}}else lr(this.i,this.l,f,null),ua(this,f);ee==4&&Nn(this),this.o&&!this.K&&(ee==4?qu(this.j,this):(this.o=!1,ds(this)))}else c_(this.g),h==400&&f.indexOf("Unknown SID")>0?(this.m=3,Je(12)):(this.m=0,Je(13)),Nn(this),Xr(this)}}}catch{}finally{}};function Wg(a){if(!_u(a))return a.g.la();const h=Lu(a.g);if(h==="")return"";let f="";const g=h.length,A=an(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Nn(a),Xr(a),"";a.h.i=new o.TextDecoder}for(let C=0;C<g;C++)a.h.h=!0,f+=a.h.i.decode(h[C],{stream:!(A&&C==g-1)});return h.length=0,a.h.g+=f,a.C=0,a.h.g}function _u(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Kg(a,h){var f=a.C,g=h.indexOf(`
`,f);return g==-1?aa:(f=Number(h.substring(f,g)),isNaN(f)?pu:(g+=1,g+f>h.length?aa:(h=h.slice(g,g+f),a.C=g+f,h)))}rn.prototype.cancel=function(){this.K=!0,Nn(this)};function ds(a){a.T=Date.now()+a.H,yu(a,a.H)}function yu(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Kr(u(a.aa,a),h)}function la(a){a.D&&(o.clearTimeout(a.D),a.D=null)}rn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Hg(this.i,this.B),this.M!=2&&(Wr(),Je(17)),Nn(this),this.m=2,Xr(this)):yu(this,this.T-a)};function Xr(a){a.j.I==0||a.K||qu(a.j,a)}function Nn(a){la(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,su(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function ua(a,h){try{var f=a.j;if(f.I!=0&&(f.g==a||ha(f.h,a))){if(!a.L&&ha(f.h,a)&&f.I==3){try{var g=f.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var A=g;if(A[0]==0){e:if(!f.v){if(f.g)if(f.g.F+3e3<a.F)ys(f),gs(f);else break e;_a(f),Je(18)}}else f.xa=A[1],0<f.xa-f.K&&A[2]<37500&&f.F&&f.A==0&&!f.C&&(f.C=Kr(u(f.Va,f),6e3));Tu(f.h)<=1&&f.ta&&(f.ta=void 0)}else Vn(f,11)}else if((a.L||f.g==a)&&ys(f),!v(h))for(A=f.Ba.g.parse(h),h=0;h<A.length;h++){let de=A[h];const xe=de[0];if(!(xe<=f.K))if(f.K=xe,de=de[1],f.I==2)if(de[0]=="c"){f.M=de[1],f.ba=de[2];const bt=de[3];bt!=null&&(f.ka=bt,f.j.info("VER="+f.ka));const Ln=de[4];Ln!=null&&(f.za=Ln,f.j.info("SVER="+f.za));const cn=de[5];cn!=null&&typeof cn=="number"&&cn>0&&(g=1.5*cn,f.O=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const ln=a.g;if(ln){const ws=ln.g?ln.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ws){var C=g.h;C.g||ws.indexOf("spdy")==-1&&ws.indexOf("quic")==-1&&ws.indexOf("h2")==-1||(C.j=C.l,C.g=new Set,C.h&&(da(C,C.h),C.h=null))}if(g.G){const va=ln.g?ln.g.getResponseHeader("X-HTTP-Session-Id"):null;va&&(g.wa=va,pe(g.J,g.G,va))}}f.I=3,f.l&&f.l.ra(),f.aa&&(f.T=Date.now()-a.F,f.j.info("Handshake RTT: "+f.T+"ms")),g=f;var O=a;if(g.na=Gu(g,g.L?g.ba:null,g.W),O.L){Eu(g.h,O);var ee=O,Ce=g.O;Ce&&(ee.H=Ce),ee.D&&(la(ee),ds(ee)),g.g=O}else $u(g);f.i.length>0&&_s(f)}else de[0]!="stop"&&de[0]!="close"||Vn(f,7);else f.I==3&&(de[0]=="stop"||de[0]=="close"?de[0]=="stop"?Vn(f,7):ga(f):de[0]!="noop"&&f.l&&f.l.qa(de),f.A=0)}}Wr(4)}catch{}}var Yg=class{constructor(a,h){this.g=a,this.map=h}};function vu(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function wu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Tu(a){return a.h?1:a.g?a.g.size:0}function ha(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function da(a,h){a.g?a.g.add(h):a.h=h}function Eu(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}vu.prototype.cancel=function(){if(this.i=Iu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Iu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const f of a.g.values())h=h.concat(f.G);return h}return _(a.i)}var bu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Qg(a,h){if(a){a=a.split("&");for(let f=0;f<a.length;f++){const g=a[f].indexOf("=");let A,C=null;g>=0?(A=a[f].substring(0,g),C=a[f].substring(g+1)):A=a[f],h(A,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function sn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof sn?(this.l=a.l,Jr(this,a.j),this.o=a.o,this.g=a.g,Zr(this,a.u),this.h=a.h,fa(this,ku(a.i)),this.m=a.m):a&&(h=String(a).match(bu))?(this.l=!1,Jr(this,h[1]||"",!0),this.o=ei(h[2]||""),this.g=ei(h[3]||"",!0),Zr(this,h[4]),this.h=ei(h[5]||"",!0),fa(this,h[6]||"",!0),this.m=ei(h[7]||"")):(this.l=!1,this.i=new ni(null,this.l))}sn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(ti(h,Au,!0),":");var f=this.g;return(f||h=="file")&&(a.push("//"),(h=this.o)&&a.push(ti(h,Au,!0),"@"),a.push(Qr(f).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.u,f!=null&&a.push(":",String(f))),(f=this.h)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(ti(f,f.charAt(0)=="/"?Zg:Jg,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",ti(f,t_)),a.join("")},sn.prototype.resolve=function(a){const h=It(this);let f=!!a.j;f?Jr(h,a.j):f=!!a.o,f?h.o=a.o:f=!!a.g,f?h.g=a.g:f=a.u!=null;var g=a.h;if(f)Zr(h,a.u);else if(f=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var A=h.h.lastIndexOf("/");A!=-1&&(g=h.h.slice(0,A+1)+g)}if(A=g,A==".."||A==".")g="";else if(A.indexOf("./")!=-1||A.indexOf("/.")!=-1){g=A.lastIndexOf("/",0)==0,A=A.split("/");const C=[];for(let O=0;O<A.length;){const ee=A[O++];ee=="."?g&&O==A.length&&C.push(""):ee==".."?((C.length>1||C.length==1&&C[0]!="")&&C.pop(),g&&O==A.length&&C.push("")):(C.push(ee),g=!0)}g=C.join("/")}else g=A}return f?h.h=g:f=a.i.toString()!=="",f?fa(h,ku(a.i)):f=!!a.m,f&&(h.m=a.m),h};function It(a){return new sn(a)}function Jr(a,h,f){a.j=f?ei(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Zr(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function fa(a,h,f){h instanceof ni?(a.i=h,n_(a.i,a.l)):(f||(h=ti(h,e_)),a.i=new ni(h,a.l))}function pe(a,h,f){a.i.set(h,f)}function fs(a){return pe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function ei(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ti(a,h,f){return typeof a=="string"?(a=encodeURI(a).replace(h,Xg),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Xg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Au=/[#\/\?@]/g,Jg=/[#\?:]/g,Zg=/[#\?]/g,e_=/[#\?@]/g,t_=/#/g;function ni(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Mn(a){a.g||(a.g=new Map,a.h=0,a.i&&Qg(a.i,function(h,f){a.add(decodeURIComponent(h.replace(/\+/g," ")),f)}))}n=ni.prototype,n.add=function(a,h){Mn(this),this.i=null,a=ur(this,a);let f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(h),this.h+=1,this};function Su(a,h){Mn(a),h=ur(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Ru(a,h){return Mn(a),h=ur(a,h),a.g.has(h)}n.forEach=function(a,h){Mn(this),this.g.forEach(function(f,g){f.forEach(function(A){a.call(h,A,g,this)},this)},this)};function Cu(a,h){Mn(a);let f=[];if(typeof h=="string")Ru(a,h)&&(f=f.concat(a.g.get(ur(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)f=f.concat(a[h]);return f}n.set=function(a,h){return Mn(this),this.i=null,a=ur(this,a),Ru(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=Cu(this,a),a.length>0?String(a[0]):h):h};function Pu(a,h,f){Su(a,h),f.length>0&&(a.i=null,a.g.set(ur(a,h),_(f)),a.h+=f.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var f=h[g];const A=Qr(f);f=Cu(this,f);for(let C=0;C<f.length;C++){let O=A;f[C]!==""&&(O+="="+Qr(f[C])),a.push(O)}}return this.i=a.join("&")};function ku(a){const h=new ni;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function ur(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function n_(a,h){h&&!a.j&&(Mn(a),a.i=null,a.g.forEach(function(f,g){const A=g.toLowerCase();g!=A&&(Su(this,g),Pu(this,A,f))},a)),a.j=h}function r_(a,h){const f=new Yr;if(o.Image){const g=new Image;g.onload=d(on,f,"TestLoadImage: loaded",!0,h,g),g.onerror=d(on,f,"TestLoadImage: error",!1,h,g),g.onabort=d(on,f,"TestLoadImage: abort",!1,h,g),g.ontimeout=d(on,f,"TestLoadImage: timeout",!1,h,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function i_(a,h){const f=new Yr,g=new AbortController,A=setTimeout(()=>{g.abort(),on(f,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(C=>{clearTimeout(A),C.ok?on(f,"TestPingServer: ok",!0,h):on(f,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(A),on(f,"TestPingServer: error",!1,h)})}function on(a,h,f,g,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),g(f)}catch{}}function s_(){this.g=new $g}function ma(a){this.i=a.Sb||null,this.h=a.ab||!1}m(ma,ou),ma.prototype.g=function(){return new ms(this.i,this.h)};function ms(a,h){$e.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}m(ms,$e),n=ms.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,ii(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ri(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ii(this)),this.g&&(this.readyState=3,ii(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Du(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Du(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?ri(this):ii(this),this.readyState==3&&Du(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,ri(this))},n.Na=function(a){this.g&&(this.response=a,ri(this))},n.ga=function(){this.g&&ri(this)};function ri(a){a.readyState=4,a.l=null,a.j=null,a.B=null,ii(a)}n.setRequestHeader=function(a,h){this.A.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var f=h.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=h.next();return a.join(`\r
`)};function ii(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ms.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function xu(a){let h="";return Z(a,function(f,g){h+=g,h+=":",h+=f,h+=`\r
`}),h}function pa(a,h,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=xu(f),typeof a=="string"?f!=null&&Qr(f):pe(a,h,f))}function we(a){$e.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}m(we,$e);var o_=/^https?$/i,a_=["POST","PUT"];n=we.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,h,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():fu.g(),this.g.onreadystatechange=p(u(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(C){Nu(this,C);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var A in g)f.set(A,g[A]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const C of g.keys())f.set(C,g.get(C));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(C=>C.toLowerCase()=="content-type"),A=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(a_,h,void 0)>=0)||g||A||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[C,O]of f)this.g.setRequestHeader(C,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(C){Nu(this,C)}};function Nu(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Mu(a),ps(a)}function Mu(a){a.A||(a.A=!0,Xe(a,"complete"),Xe(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Xe(this,"complete"),Xe(this,"abort"),ps(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ps(this,!0)),we.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Vu(this):this.Xa())},n.Xa=function(){Vu(this)};function Vu(a){if(a.h&&typeof s<"u"){if(a.v&&an(a)==4)setTimeout(a.Ca.bind(a),0);else if(Xe(a,"readystatechange"),an(a)==4){a.h=!1;try{const C=a.ca();e:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var f;if(!(f=h)){var g;if(g=C===0){let O=String(a.D).match(bu)[1]||null;!O&&o.self&&o.self.location&&(O=o.self.location.protocol.slice(0,-1)),g=!o_.test(O?O.toLowerCase():"")}f=g}if(f)Xe(a,"complete"),Xe(a,"success");else{a.o=6;try{var A=an(a)>2?a.g.statusText:""}catch{A=""}a.l=A+" ["+a.ca()+"]",Mu(a)}}finally{ps(a)}}}}function ps(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const f=a.g;a.g=null,h||Xe(a,"ready");try{f.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function an(a){return a.g?a.g.readyState:0}n.ca=function(){try{return an(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Bg(h)}};function Lu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function c_(a){const h={};a=(a.g&&an(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(v(a[g]))continue;var f=Gg(a[g]);const A=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const C=h[A]||[];h[A]=C,C.push(f)}te(h,function(g){return g.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function si(a,h,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||h}function Ou(a){this.za=0,this.i=[],this.j=new Yr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=si("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=si("baseRetryDelayMs",5e3,a),this.Za=si("retryDelaySeedMs",1e4,a),this.Ta=si("forwardChannelMaxRetries",2,a),this.va=si("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new vu(a&&a.concurrentRequestLimit),this.Ba=new s_,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Ou.prototype,n.ka=8,n.I=1,n.connect=function(a,h,f,g){Je(0),this.W=a,this.H=h||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.J=Gu(this,null,this.W),_s(this)};function ga(a){if(Uu(a),a.I==3){var h=a.V++,f=It(a.J);if(pe(f,"SID",a.M),pe(f,"RID",h),pe(f,"TYPE","terminate"),oi(a,f),h=new rn(a,a.j,h),h.M=2,h.A=fs(It(f)),f=!1,o.navigator&&o.navigator.sendBeacon)try{f=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!f&&o.Image&&(new Image().src=h.A,f=!0),f||(h.g=Wu(h.j,null),h.g.ea(h.A)),h.F=Date.now(),ds(h)}ju(a)}function gs(a){a.g&&(ya(a),a.g.cancel(),a.g=null)}function Uu(a){gs(a),a.v&&(o.clearTimeout(a.v),a.v=null),ys(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function _s(a){if(!wu(a.h)&&!a.m){a.m=!0;var h=a.Ea;J||y(),U||(J(),U=!0),T.add(h,a),a.D=0}}function l_(a,h){return Tu(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Kr(u(a.Ea,a,h),Hu(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const A=new rn(this,this.j,a);let C=this.o;if(this.U&&(C?(C=le(C),We(C,this.U)):C=this.U),this.u!==null||this.R||(A.J=C,C=null),this.S)e:{for(var h=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=f;break e}if(h===4096||f===this.i.length-1){h=f+1;break e}}h=1e3}else h=1e3;h=Bu(this,A,h),f=It(this.J),pe(f,"RID",a),pe(f,"CVER",22),this.G&&pe(f,"X-HTTP-Session-Id",this.G),oi(this,f),C&&(this.R?h="headers="+Qr(xu(C))+"&"+h:this.u&&pa(f,this.u,C)),da(this.h,A),this.Ra&&pe(f,"TYPE","init"),this.S?(pe(f,"$req",h),pe(f,"SID","null"),A.U=!0,ca(A,f,null)):ca(A,f,h),this.I=2}}else this.I==3&&(a?Fu(this,a):this.i.length==0||wu(this.h)||Fu(this))};function Fu(a,h){var f;h?f=h.l:f=a.V++;const g=It(a.J);pe(g,"SID",a.M),pe(g,"RID",f),pe(g,"AID",a.K),oi(a,g),a.u&&a.o&&pa(g,a.u,a.o),f=new rn(a,a.j,f,a.D+1),a.u===null&&(f.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Bu(a,f,1e3),f.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),da(a.h,f),ca(f,g,h)}function oi(a,h){a.H&&Z(a.H,function(f,g){pe(h,g,f)}),a.l&&Z({},function(f,g){pe(h,g,f)})}function Bu(a,h,f){f=Math.min(a.i.length,f);const g=a.l?u(a.l.Ka,a.l,a):null;e:{var A=a.i;let ee=-1;for(;;){const Ce=["count="+f];ee==-1?f>0?(ee=A[0].g,Ce.push("ofs="+ee)):ee=0:Ce.push("ofs="+ee);let de=!0;for(let xe=0;xe<f;xe++){var C=A[xe].g;const bt=A[xe].map;if(C-=ee,C<0)ee=Math.max(0,A[xe].g-100),de=!1;else try{C="req"+C+"_"||"";try{var O=bt instanceof Map?bt:Object.entries(bt);for(const[Ln,cn]of O){let ln=cn;c(cn)&&(ln=ra(cn)),Ce.push(C+Ln+"="+encodeURIComponent(ln))}}catch(Ln){throw Ce.push(C+"type="+encodeURIComponent("_badmap")),Ln}}catch{g&&g(bt)}}if(de){O=Ce.join("&");break e}}O=void 0}return a=a.i.splice(0,f),h.G=a,O}function $u(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;J||y(),U||(J(),U=!0),T.add(h,a),a.A=0}}function _a(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Kr(u(a.Da,a),Hu(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,zu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Kr(u(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Je(10),gs(this),zu(this))};function ya(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function zu(a){a.g=new rn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=It(a.na);pe(h,"RID","rpc"),pe(h,"SID",a.M),pe(h,"AID",a.K),pe(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&pe(h,"TO",a.ia),pe(h,"TYPE","xmlhttp"),oi(a,h),a.u&&a.o&&pa(h,a.u,a.o),a.O&&(a.g.H=a.O);var f=a.g;a=a.ba,f.M=1,f.A=fs(It(h)),f.u=null,f.R=!0,gu(f,a)}n.Va=function(){this.C!=null&&(this.C=null,gs(this),_a(this),Je(19))};function ys(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function qu(a,h){var f=null;if(a.g==h){ys(a),ya(a),a.g=null;var g=2}else if(ha(a.h,h))f=h.G,Eu(a.h,h),g=1;else return;if(a.I!=0){if(h.o)if(g==1){f=h.u?h.u.length:0,h=Date.now()-h.F;var A=a.D;g=us(),Xe(g,new hu(g,f)),_s(a)}else $u(a);else if(A=h.m,A==3||A==0&&h.X>0||!(g==1&&l_(a,h)||g==2&&_a(a)))switch(f&&f.length>0&&(h=a.h,h.i=h.i.concat(f)),A){case 1:Vn(a,5);break;case 4:Vn(a,10);break;case 3:Vn(a,6);break;default:Vn(a,2)}}}function Hu(a,h){let f=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(f*=2),f*h}function Vn(a,h){if(a.j.info("Error code "+h),h==2){var f=u(a.bb,a),g=a.Ua;const A=!g;g=new sn(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||Jr(g,"https"),fs(g),A?r_(g.toString(),f):i_(g.toString(),f)}else Je(2);a.I=0,a.l&&a.l.pa(h),ju(a),Uu(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Je(2)):(this.j.info("Failed to ping google.com"),Je(1))};function ju(a){if(a.I=0,a.ja=[],a.l){const h=Iu(a.h);(h.length!=0||a.i.length!=0)&&(S(a.ja,h),S(a.ja,a.i),a.h.i.length=0,_(a.i),a.i.length=0),a.l.oa()}}function Gu(a,h,f){var g=f instanceof sn?It(f):new sn(f);if(g.g!="")h&&(g.g=h+"."+g.g),Zr(g,g.u);else{var A=o.location;g=A.protocol,h=h?h+"."+A.hostname:A.hostname,A=+A.port;const C=new sn(null);g&&Jr(C,g),h&&(C.g=h),A&&Zr(C,A),f&&(C.h=f),g=C}return f=a.G,h=a.wa,f&&h&&pe(g,f,h),pe(g,"VER",a.ka),oi(a,g),g}function Wu(a,h,f){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new we(new ma({ab:f})):new we(a.ma),h.Fa(a.L),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ku(){}n=Ku.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function vs(){}vs.prototype.g=function(a,h){return new it(a,h)};function it(a,h){$e.call(this),this.g=new Ou(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!v(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!v(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new hr(this)}m(it,$e),it.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},it.prototype.close=function(){ga(this.g)},it.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.v&&(f={},f.__data__=ra(a),a=f);h.i.push(new Yg(h.Ya++,a)),h.I==3&&_s(h)},it.prototype.N=function(){this.g.l=null,delete this.j,ga(this.g),delete this.g,it.Z.N.call(this)};function Yu(a){ia.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const f in h){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}m(Yu,ia);function Qu(){sa.call(this),this.status=1}m(Qu,sa);function hr(a){this.g=a}m(hr,Ku),hr.prototype.ra=function(){Xe(this.g,"a")},hr.prototype.qa=function(a){Xe(this.g,new Yu(a))},hr.prototype.pa=function(a){Xe(this.g,new Qu)},hr.prototype.oa=function(){Xe(this.g,"b")},vs.prototype.createWebChannel=vs.prototype.g,it.prototype.send=it.prototype.o,it.prototype.open=it.prototype.m,it.prototype.close=it.prototype.close,Gm=function(){return new vs},jm=function(){return us()},Hm=xn,fc={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},hs.NO_ERROR=0,hs.TIMEOUT=8,hs.HTTP_ERROR=6,qs=hs,du.COMPLETE="complete",qm=du,au.EventType=Gr,Gr.OPEN="a",Gr.CLOSE="b",Gr.ERROR="c",Gr.MESSAGE="d",$e.prototype.listen=$e.prototype.J,gi=au,we.prototype.listenOnce=we.prototype.K,we.prototype.getLastError=we.prototype.Ha,we.prototype.getLastErrorCode=we.prototype.ya,we.prototype.getStatus=we.prototype.ca,we.prototype.getResponseJson=we.prototype.La,we.prototype.getResponseText=we.prototype.la,we.prototype.send=we.prototype.ea,we.prototype.setWithCredentials=we.prototype.Fa,zm=we}).apply(typeof Ss<"u"?Ss:typeof self<"u"?self:typeof window<"u"?window:{});/**
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
 */class qe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}qe.UNAUTHENTICATED=new qe(null),qe.GOOGLE_CREDENTIALS=new qe("google-credentials-uid"),qe.FIRST_PARTY=new qe("first-party-uid"),qe.MOCK_USER=new qe("mock-user");/**
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
 */let Fr="12.8.0";function sS(n){Fr=n}/**
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
 */const er=new Zc("@firebase/firestore");function fr(){return er.logLevel}function z(n,...e){if(er.logLevel<=re.DEBUG){const t=e.map(dl);er.debug(`Firestore (${Fr}): ${n}`,...t)}}function Zt(n,...e){if(er.logLevel<=re.ERROR){const t=e.map(dl);er.error(`Firestore (${Fr}): ${n}`,...t)}}function Dr(n,...e){if(er.logLevel<=re.WARN){const t=e.map(dl);er.warn(`Firestore (${Fr}): ${n}`,...t)}}function dl(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function W(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Wm(n,r,t)}function Wm(n,e,t){let r=`FIRESTORE (${Fr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Zt(r),new Error(r)}function ue(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Wm(e,i,r)}function X(n,e){return n}/**
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
 */const D={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends Ot{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Km{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class oS{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(qe.UNAUTHENTICATED))}shutdown(){}}class aS{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class cS{constructor(e){this.t=e,this.currentUser=qe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ue(this.o===void 0,42304);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new Wt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Wt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(z("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Wt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ue(typeof r.accessToken=="string",31837,{l:r}),new Km(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ue(e===null||typeof e=="string",2055,{h:e}),new qe(e)}}class lS{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=qe.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class uS{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new lS(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(qe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ad{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class hS{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ct(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){ue(this.o===void 0,3512);const r=s=>{s.error!=null&&z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ad(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ue(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ad(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function dS(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class fl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=dS(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function ie(n,e){return n<e?-1:n>e?1:0}function mc(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const i=n.charAt(r),s=e.charAt(r);if(i!==s)return Oa(i)===Oa(s)?ie(i,s):Oa(i)?1:-1}return ie(n.length,e.length)}const fS=55296,mS=57343;function Oa(n){const e=n.charCodeAt(0);return e>=fS&&e<=mS}function xr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
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
 */const cd="__name__";class At{constructor(e,t,r){t===void 0?t=0:t>e.length&&W(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&W(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return At.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof At?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=At.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return ie(e.length,t.length)}static compareSegments(e,t){const r=At.isNumericId(e),i=At.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?At.extractNumericId(e).compare(At.extractNumericId(t)):mc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return vn.fromString(e.substring(4,e.length-2))}}class me extends At{construct(e,t,r){return new me(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new F(D.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new me(t)}static emptyPath(){return new me([])}}const pS=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Fe extends At{construct(e,t,r){return new Fe(e,t,r)}static isValidIdentifier(e){return pS.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Fe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===cd}static keyField(){return new Fe([cd])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new F(D.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new F(D.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new F(D.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new F(D.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Fe(t)}static emptyPath(){return new Fe([])}}/**
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
 */function Ym(n,e,t){if(!t)throw new F(D.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function gS(n,e,t,r){if(e===!0&&r===!0)throw new F(D.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ld(n){if(!G.isDocumentKey(n))throw new F(D.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ud(n){if(G.isDocumentKey(n))throw new F(D.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Qm(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Vo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":W(12329,{type:typeof n})}function rt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new F(D.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Vo(n);throw new F(D.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Re(n,e){const t={typeString:n};return e&&(t.value=e),t}function rs(n,e){if(!Qm(n))throw new F(D.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(i&&typeof o!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new F(D.INVALID_ARGUMENT,t);return!0}/**
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
 */const hd=-62135596800,dd=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*dd);return new ge(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(D.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<hd)throw new F(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(D.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/dd}_compareTo(e){return this.seconds===e.seconds?ie(this.nanoseconds,e.nanoseconds):ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(rs(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-hd;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:Re("string",ge._jsonSchemaVersion),seconds:Re("number"),nanoseconds:Re("number")};/**
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
 */const Li=-1;function _S(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=Q.fromTimestamp(r===1e9?new ge(t+1,0):new ge(t,r));return new En(i,G.empty(),e)}function yS(n){return new En(n.readTime,n.key,Li)}class En{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new En(Q.min(),G.empty(),Li)}static max(){return new En(Q.max(),G.empty(),Li)}}function vS(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=G.comparator(n.documentKey,e.documentKey),t!==0?t:ie(n.largestBatchId,e.largestBatchId))}/**
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
 */const wS="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class TS{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Br(n){if(n.code!==D.FAILED_PRECONDITION||n.message!==wS)throw n;z("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class x{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&W(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new x((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof x?t:x.resolve(t)}catch(t){return x.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):x.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):x.reject(t)}static resolve(e){return new x((t,r)=>{t(e)})}static reject(e){return new x((t,r)=>{r(e)})}static waitFor(e){return new x((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},l=>r(l))}),o=!0,s===i&&t()})}static or(e){let t=x.resolve(!1);for(const r of e)t=t.next(i=>i?x.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new x((r,i)=>{const s=e.length,o=new Array(s);let c=0;for(let l=0;l<s;l++){const u=l;t(e[u]).next(d=>{o[u]=d,++c,c===s&&r(o)},d=>i(d))}})}static doWhile(e,t){return new x((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function ES(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function $r(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Lo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Lo.ce=-1;/**
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
 */const ml=-1;function Oo(n){return n==null}function po(n){return n===0&&1/n==-1/0}function IS(n){return typeof n=="number"&&Number.isInteger(n)&&!po(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Xm="";function bS(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=fd(e)),e=AS(n.get(t),e);return fd(e)}function AS(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case Xm:t+="";break;default:t+=s}}return t}function fd(n){return n+Xm+""}/**
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
 */function md(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Pn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Jm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class ve{constructor(e,t){this.comparator=e,this.root=t||Ue.EMPTY}insert(e,t){return new ve(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ue.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ue.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Rs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Rs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Rs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Rs(this.root,e,this.comparator,!0)}}class Rs{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ue{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Ue.RED,this.left=i??Ue.EMPTY,this.right=s??Ue.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Ue(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ue.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Ue.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ue.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ue.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw W(43730,{key:this.key,value:this.value});if(this.right.isRed())throw W(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw W(27949);return e+(this.isRed()?0:1)}}Ue.EMPTY=null,Ue.RED=!0,Ue.BLACK=!1;Ue.EMPTY=new class{constructor(){this.size=0}get key(){throw W(57766)}get value(){throw W(16141)}get color(){throw W(16727)}get left(){throw W(29726)}get right(){throw W(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new Ue(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Pe{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new pd(this.data.getIterator())}getIteratorFrom(e){return new pd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Pe)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Pe(this.comparator);return t.data=e,t}}class pd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class st{constructor(e){this.fields=e,e.sort(Fe.comparator)}static empty(){return new st([])}unionWith(e){let t=new Pe(Fe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new st(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return xr(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Zm extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Be{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Zm("Invalid base64 string: "+s):s}}(e);return new Be(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Be(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Be.EMPTY_BYTE_STRING=new Be("");const SS=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function In(n){if(ue(!!n,39018),typeof n=="string"){let e=0;const t=SS.exec(n);if(ue(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:be(n.seconds),nanos:be(n.nanos)}}function be(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function bn(n){return typeof n=="string"?Be.fromBase64String(n):Be.fromUint8Array(n)}/**
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
 */const ep="server_timestamp",tp="__type__",np="__previous_value__",rp="__local_write_time__";function pl(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[tp])==null?void 0:r.stringValue)===ep}function Uo(n){const e=n.mapValue.fields[np];return pl(e)?Uo(e):e}function Oi(n){const e=In(n.mapValue.fields[rp].timestampValue);return new ge(e.seconds,e.nanos)}/**
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
 */class RS{constructor(e,t,r,i,s,o,c,l,u,d,m){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=u,this.isUsingEmulator=d,this.apiKey=m}}const go="(default)";class Ui{constructor(e,t){this.projectId=e,this.database=t||go}static empty(){return new Ui("","")}get isDefaultDatabase(){return this.database===go}isEqual(e){return e instanceof Ui&&e.projectId===this.projectId&&e.database===this.database}}function CS(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new F(D.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ui(n.options.projectId,e)}/**
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
 */const ip="__type__",PS="__max__",Cs={mapValue:{}},sp="__vector__",_o="value";function An(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?pl(n)?4:DS(n)?9007199254740991:kS(n)?10:11:W(28295,{value:n})}function Vt(n,e){if(n===e)return!0;const t=An(n);if(t!==An(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Oi(n).isEqual(Oi(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=In(i.timestampValue),c=In(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return bn(i.bytesValue).isEqual(bn(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return be(i.geoPointValue.latitude)===be(s.geoPointValue.latitude)&&be(i.geoPointValue.longitude)===be(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return be(i.integerValue)===be(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=be(i.doubleValue),c=be(s.doubleValue);return o===c?po(o)===po(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return xr(n.arrayValue.values||[],e.arrayValue.values||[],Vt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(md(o)!==md(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Vt(o[l],c[l])))return!1;return!0}(n,e);default:return W(52216,{left:n})}}function Fi(n,e){return(n.values||[]).find(t=>Vt(t,e))!==void 0}function Nr(n,e){if(n===e)return 0;const t=An(n),r=An(e);if(t!==r)return ie(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ie(n.booleanValue,e.booleanValue);case 2:return function(s,o){const c=be(s.integerValue||s.doubleValue),l=be(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return gd(n.timestampValue,e.timestampValue);case 4:return gd(Oi(n),Oi(e));case 5:return mc(n.stringValue,e.stringValue);case 6:return function(s,o){const c=bn(s),l=bn(o);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const c=s.split("/"),l=o.split("/");for(let u=0;u<c.length&&u<l.length;u++){const d=ie(c[u],l[u]);if(d!==0)return d}return ie(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const c=ie(be(s.latitude),be(o.latitude));return c!==0?c:ie(be(s.longitude),be(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return _d(n.arrayValue,e.arrayValue);case 10:return function(s,o){var p,_,S,P;const c=s.fields||{},l=o.fields||{},u=(p=c[_o])==null?void 0:p.arrayValue,d=(_=l[_o])==null?void 0:_.arrayValue,m=ie(((S=u==null?void 0:u.values)==null?void 0:S.length)||0,((P=d==null?void 0:d.values)==null?void 0:P.length)||0);return m!==0?m:_d(u,d)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===Cs.mapValue&&o===Cs.mapValue)return 0;if(s===Cs.mapValue)return 1;if(o===Cs.mapValue)return-1;const c=s.fields||{},l=Object.keys(c),u=o.fields||{},d=Object.keys(u);l.sort(),d.sort();for(let m=0;m<l.length&&m<d.length;++m){const p=mc(l[m],d[m]);if(p!==0)return p;const _=Nr(c[l[m]],u[d[m]]);if(_!==0)return _}return ie(l.length,d.length)}(n.mapValue,e.mapValue);default:throw W(23264,{he:t})}}function gd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ie(n,e);const t=In(n),r=In(e),i=ie(t.seconds,r.seconds);return i!==0?i:ie(t.nanos,r.nanos)}function _d(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Nr(t[i],r[i]);if(s)return s}return ie(t.length,r.length)}function Mr(n){return pc(n)}function pc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=In(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return bn(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return G.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=pc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${pc(t.fields[o])}`;return i+"}"}(n.mapValue):W(61005,{value:n})}function Hs(n){switch(An(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Uo(n);return e?16+Hs(e):16;case 5:return 2*n.stringValue.length;case 6:return bn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Hs(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Pn(r.fields,(s,o)=>{i+=s.length+Hs(o)}),i}(n.mapValue);default:throw W(13486,{value:n})}}function yd(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function gc(n){return!!n&&"integerValue"in n}function gl(n){return!!n&&"arrayValue"in n}function vd(n){return!!n&&"nullValue"in n}function wd(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function js(n){return!!n&&"mapValue"in n}function kS(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[ip])==null?void 0:r.stringValue)===sp}function Ii(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Pn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Ii(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ii(n.arrayValue.values[t]);return e}return{...n}}function DS(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===PS}/**
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
 */class tt{constructor(e){this.value=e}static empty(){return new tt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!js(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ii(t)}setAll(e){let t=Fe.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=Ii(o):i.push(c.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());js(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Vt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];js(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Pn(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new tt(Ii(this.value))}}function op(n){const e=[];return Pn(n.fields,(t,r)=>{const i=new Fe([t]);if(js(r)){const s=op(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new st(e)}/**
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
 */class He{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new He(e,0,Q.min(),Q.min(),Q.min(),tt.empty(),0)}static newFoundDocument(e,t,r,i){return new He(e,1,t,Q.min(),r,i,0)}static newNoDocument(e,t){return new He(e,2,t,Q.min(),Q.min(),tt.empty(),0)}static newUnknownDocument(e,t){return new He(e,3,t,Q.min(),Q.min(),tt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(Q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=tt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=tt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof He&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new He(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class yo{constructor(e,t){this.position=e,this.inclusive=t}}function Td(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(o.referenceValue),t.key):r=Nr(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ed(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Vt(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Bi{constructor(e,t="asc"){this.field=e,this.dir=t}}function xS(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class ap{}class Se extends ap{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new MS(e,t,r):t==="array-contains"?new OS(e,r):t==="in"?new US(e,r):t==="not-in"?new FS(e,r):t==="array-contains-any"?new BS(e,r):new Se(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new VS(e,r):new LS(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Nr(t,this.value)):t!==null&&An(this.value)===An(t)&&this.matchesComparison(Nr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class wt extends ap{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new wt(e,t)}matches(e){return cp(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function cp(n){return n.op==="and"}function lp(n){return NS(n)&&cp(n)}function NS(n){for(const e of n.filters)if(e instanceof wt)return!1;return!0}function _c(n){if(n instanceof Se)return n.field.canonicalString()+n.op.toString()+Mr(n.value);if(lp(n))return n.filters.map(e=>_c(e)).join(",");{const e=n.filters.map(t=>_c(t)).join(",");return`${n.op}(${e})`}}function up(n,e){return n instanceof Se?function(r,i){return i instanceof Se&&r.op===i.op&&r.field.isEqual(i.field)&&Vt(r.value,i.value)}(n,e):n instanceof wt?function(r,i){return i instanceof wt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&up(o,i.filters[c]),!0):!1}(n,e):void W(19439)}function hp(n){return n instanceof Se?function(t){return`${t.field.canonicalString()} ${t.op} ${Mr(t.value)}`}(n):n instanceof wt?function(t){return t.op.toString()+" {"+t.getFilters().map(hp).join(" ,")+"}"}(n):"Filter"}class MS extends Se{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class VS extends Se{constructor(e,t){super(e,"in",t),this.keys=dp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class LS extends Se{constructor(e,t){super(e,"not-in",t),this.keys=dp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function dp(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>G.fromName(r.referenceValue))}class OS extends Se{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return gl(t)&&Fi(t.arrayValue,this.value)}}class US extends Se{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Fi(this.value.arrayValue,t)}}class FS extends Se{constructor(e,t){super(e,"not-in",t)}matches(e){if(Fi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Fi(this.value.arrayValue,t)}}class BS extends Se{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!gl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Fi(this.value.arrayValue,r))}}/**
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
 */class $S{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.Te=null}}function Id(n,e=null,t=[],r=[],i=null,s=null,o=null){return new $S(n,e,t,r,i,s,o)}function _l(n){const e=X(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>_c(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Oo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Mr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Mr(r)).join(",")),e.Te=t}return e.Te}function yl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!xS(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!up(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ed(n.startAt,e.startAt)&&Ed(n.endAt,e.endAt)}function yc(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class zr{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function zS(n,e,t,r,i,s,o,c){return new zr(n,e,t,r,i,s,o,c)}function Fo(n){return new zr(n)}function bd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function qS(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function fp(n){return n.collectionGroup!==null}function bi(n){const e=X(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Pe(Fe.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(u=>{u.isInequality()&&(c=c.add(u.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new Bi(s,r))}),t.has(Fe.keyField().canonicalString())||e.Ie.push(new Bi(Fe.keyField(),r))}return e.Ie}function Dt(n){const e=X(n);return e.Ee||(e.Ee=HS(e,bi(n))),e.Ee}function HS(n,e){if(n.limitType==="F")return Id(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Bi(i.field,s)});const t=n.endAt?new yo(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new yo(n.startAt.position,n.startAt.inclusive):null;return Id(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function vc(n,e){const t=n.filters.concat([e]);return new zr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function jS(n,e){const t=n.explicitOrderBy.concat([e]);return new zr(n.path,n.collectionGroup,t,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function wc(n,e,t){return new zr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Bo(n,e){return yl(Dt(n),Dt(e))&&n.limitType===e.limitType}function mp(n){return`${_l(Dt(n))}|lt:${n.limitType}`}function mr(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>hp(i)).join(", ")}]`),Oo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Mr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Mr(i)).join(",")),`Target(${r})`}(Dt(n))}; limitType=${n.limitType})`}function $o(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):G.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of bi(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,l){const u=Td(o,c,l);return o.inclusive?u<=0:u<0}(r.startAt,bi(r),i)||r.endAt&&!function(o,c,l){const u=Td(o,c,l);return o.inclusive?u>=0:u>0}(r.endAt,bi(r),i))}(n,e)}function GS(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function pp(n){return(e,t)=>{let r=!1;for(const i of bi(n)){const s=WS(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function WS(n,e,t){const r=n.field.isKeyField()?G.comparator(e.key,t.key):function(s,o,c){const l=o.data.field(s),u=c.data.field(s);return l!==null&&u!==null?Nr(l,u):W(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return W(19790,{direction:n.dir})}}/**
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
 */class or{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Pn(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return Jm(this.inner)}size(){return this.innerSize}}/**
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
 */const KS=new ve(G.comparator);function en(){return KS}const gp=new ve(G.comparator);function _i(...n){let e=gp;for(const t of n)e=e.insert(t.key,t);return e}function _p(n){let e=gp;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function zn(){return Ai()}function yp(){return Ai()}function Ai(){return new or(n=>n.toString(),(n,e)=>n.isEqual(e))}const YS=new ve(G.comparator),QS=new Pe(G.comparator);function se(...n){let e=QS;for(const t of n)e=e.add(t);return e}const XS=new Pe(ie);function JS(){return XS}/**
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
 */function vl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:po(e)?"-0":e}}function vp(n){return{integerValue:""+n}}function ZS(n,e){return IS(e)?vp(e):vl(n,e)}/**
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
 */class zo{constructor(){this._=void 0}}function eR(n,e,t){return n instanceof $i?function(i,s){const o={fields:{[tp]:{stringValue:ep},[rp]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&pl(s)&&(s=Uo(s)),s&&(o.fields[np]=s),{mapValue:o}}(t,e):n instanceof zi?Tp(n,e):n instanceof qi?Ep(n,e):function(i,s){const o=wp(i,s),c=Ad(o)+Ad(i.Ae);return gc(o)&&gc(i.Ae)?vp(c):vl(i.serializer,c)}(n,e)}function tR(n,e,t){return n instanceof zi?Tp(n,e):n instanceof qi?Ep(n,e):t}function wp(n,e){return n instanceof vo?function(r){return gc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class $i extends zo{}class zi extends zo{constructor(e){super(),this.elements=e}}function Tp(n,e){const t=Ip(e);for(const r of n.elements)t.some(i=>Vt(i,r))||t.push(r);return{arrayValue:{values:t}}}class qi extends zo{constructor(e){super(),this.elements=e}}function Ep(n,e){let t=Ip(e);for(const r of n.elements)t=t.filter(i=>!Vt(i,r));return{arrayValue:{values:t}}}class vo extends zo{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Ad(n){return be(n.integerValue||n.doubleValue)}function Ip(n){return gl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class nR{constructor(e,t){this.field=e,this.transform=t}}function rR(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof zi&&i instanceof zi||r instanceof qi&&i instanceof qi?xr(r.elements,i.elements,Vt):r instanceof vo&&i instanceof vo?Vt(r.Ae,i.Ae):r instanceof $i&&i instanceof $i}(n.transform,e.transform)}class iR{constructor(e,t){this.version=e,this.transformResults=t}}class ht{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ht}static exists(e){return new ht(void 0,e)}static updateTime(e){return new ht(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Gs(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class qo{}function bp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new wl(n.key,ht.none()):new is(n.key,n.data,ht.none());{const t=n.data,r=tt.empty();let i=new Pe(Fe.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new kn(n.key,r,new st(i.toArray()),ht.none())}}function sR(n,e,t){n instanceof is?function(i,s,o){const c=i.value.clone(),l=Rd(i.fieldTransforms,s,o.transformResults);c.setAll(l),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof kn?function(i,s,o){if(!Gs(i.precondition,s))return void s.convertToUnknownDocument(o.version);const c=Rd(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(Ap(i)),l.setAll(c),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Si(n,e,t,r){return n instanceof is?function(s,o,c,l){if(!Gs(s.precondition,o))return c;const u=s.value.clone(),d=Cd(s.fieldTransforms,l,o);return u.setAll(d),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null}(n,e,t,r):n instanceof kn?function(s,o,c,l){if(!Gs(s.precondition,o))return c;const u=Cd(s.fieldTransforms,l,o),d=o.data;return d.setAll(Ap(s)),d.setAll(u),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(s,o,c){return Gs(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function oR(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=wp(r.transform,i||null);s!=null&&(t===null&&(t=tt.empty()),t.set(r.field,s))}return t||null}function Sd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&xr(r,i,(s,o)=>rR(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class is extends qo{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class kn extends qo{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function Ap(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Rd(n,e,t){const r=new Map;ue(n.length===t.length,32656,{Ve:t.length,de:n.length});for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,tR(o,c,t[i]))}return r}function Cd(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,eR(s,o,e))}return r}class wl extends qo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class aR extends qo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class cR{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&sR(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Si(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Si(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=yp();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;const l=bp(o,c);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(Q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),se())}isEqual(e){return this.batchId===e.batchId&&xr(this.mutations,e.mutations,(t,r)=>Sd(t,r))&&xr(this.baseMutations,e.baseMutations,(t,r)=>Sd(t,r))}}class Tl{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){ue(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=function(){return YS}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Tl(e,t,r,i)}}/**
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
 */class lR{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class uR{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Ae,ae;function hR(n){switch(n){case D.OK:return W(64938);case D.CANCELLED:case D.UNKNOWN:case D.DEADLINE_EXCEEDED:case D.RESOURCE_EXHAUSTED:case D.INTERNAL:case D.UNAVAILABLE:case D.UNAUTHENTICATED:return!1;case D.INVALID_ARGUMENT:case D.NOT_FOUND:case D.ALREADY_EXISTS:case D.PERMISSION_DENIED:case D.FAILED_PRECONDITION:case D.ABORTED:case D.OUT_OF_RANGE:case D.UNIMPLEMENTED:case D.DATA_LOSS:return!0;default:return W(15467,{code:n})}}function Sp(n){if(n===void 0)return Zt("GRPC error has no .code"),D.UNKNOWN;switch(n){case Ae.OK:return D.OK;case Ae.CANCELLED:return D.CANCELLED;case Ae.UNKNOWN:return D.UNKNOWN;case Ae.DEADLINE_EXCEEDED:return D.DEADLINE_EXCEEDED;case Ae.RESOURCE_EXHAUSTED:return D.RESOURCE_EXHAUSTED;case Ae.INTERNAL:return D.INTERNAL;case Ae.UNAVAILABLE:return D.UNAVAILABLE;case Ae.UNAUTHENTICATED:return D.UNAUTHENTICATED;case Ae.INVALID_ARGUMENT:return D.INVALID_ARGUMENT;case Ae.NOT_FOUND:return D.NOT_FOUND;case Ae.ALREADY_EXISTS:return D.ALREADY_EXISTS;case Ae.PERMISSION_DENIED:return D.PERMISSION_DENIED;case Ae.FAILED_PRECONDITION:return D.FAILED_PRECONDITION;case Ae.ABORTED:return D.ABORTED;case Ae.OUT_OF_RANGE:return D.OUT_OF_RANGE;case Ae.UNIMPLEMENTED:return D.UNIMPLEMENTED;case Ae.DATA_LOSS:return D.DATA_LOSS;default:return W(39323,{code:n})}}(ae=Ae||(Ae={}))[ae.OK=0]="OK",ae[ae.CANCELLED=1]="CANCELLED",ae[ae.UNKNOWN=2]="UNKNOWN",ae[ae.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ae[ae.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ae[ae.NOT_FOUND=5]="NOT_FOUND",ae[ae.ALREADY_EXISTS=6]="ALREADY_EXISTS",ae[ae.PERMISSION_DENIED=7]="PERMISSION_DENIED",ae[ae.UNAUTHENTICATED=16]="UNAUTHENTICATED",ae[ae.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ae[ae.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ae[ae.ABORTED=10]="ABORTED",ae[ae.OUT_OF_RANGE=11]="OUT_OF_RANGE",ae[ae.UNIMPLEMENTED=12]="UNIMPLEMENTED",ae[ae.INTERNAL=13]="INTERNAL",ae[ae.UNAVAILABLE=14]="UNAVAILABLE",ae[ae.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function dR(){return new TextEncoder}/**
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
 */const fR=new vn([4294967295,4294967295],0);function Pd(n){const e=dR().encode(n),t=new $m;return t.update(e),new Uint8Array(t.digest())}function kd(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new vn([t,r],0),new vn([i,s],0)]}class El{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new yi(`Invalid padding: ${t}`);if(r<0)throw new yi(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new yi(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new yi(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=vn.fromNumber(this.ge)}ye(e,t,r){let i=e.add(t.multiply(vn.fromNumber(r)));return i.compare(fR)===1&&(i=new vn([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=Pd(e),[r,i]=kd(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);if(!this.we(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new El(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.ge===0)return;const t=Pd(e),[r,i]=kd(t);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);this.be(o)}}be(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class yi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ho{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,ss.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ho(Q.min(),i,new ve(ie),en(),se())}}class ss{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ss(r,t,se(),se(),se())}}/**
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
 */class Ws{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.De=i}}class Rp{constructor(e,t){this.targetId=e,this.Ce=t}}class Cp{constructor(e,t,r=Be.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Dd{constructor(){this.ve=0,this.Fe=xd(),this.Me=Be.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=se(),t=se(),r=se();return this.Fe.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:W(38017,{changeType:s})}}),new ss(this.Me,this.xe,e,t,r)}Ke(){this.Oe=!1,this.Fe=xd()}qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,ue(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class mR{constructor(e){this.Ge=e,this.ze=new Map,this.je=en(),this.He=Ps(),this.Je=Ps(),this.Ze=new ve(ie)}Xe(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.Ye(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.Ke(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:W(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,i)=>{this.rt(i)&&t(i)})}st(e){const t=e.targetId,r=e.Ce.count,i=this.ot(t);if(i){const s=i.target;if(yc(s))if(r===0){const o=new G(s.path);this.et(t,o,He.newNoDocument(o,Q.min()))}else ue(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),l=c?this.ct(c,e,o):1;if(l!==0){this.it(t);const u=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(t,u)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,c;try{o=bn(r).toUint8Array()}catch(l){if(l instanceof Zm)return Dr("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new El(o,i,s)}catch(l){return Dr(l instanceof yi?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.et(t,s,null),i++)}),i}Tt(e){const t=new Map;this.ze.forEach((s,o)=>{const c=this.ot(o);if(c){if(s.current&&yc(c.target)){const l=new G(c.target.path);this.It(l).has(o)||this.Et(o,l)||this.et(o,l,He.newNoDocument(l,e))}s.Be&&(t.set(o,s.ke()),s.Ke())}});let r=se();this.Je.forEach((s,o)=>{let c=!0;o.forEachWhile(l=>{const u=this.ot(l);return!u||u.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.je.forEach((s,o)=>o.setReadTime(e));const i=new Ho(e,t,this.Ze,this.je,r);return this.je=en(),this.He=Ps(),this.Je=Ps(),this.Ze=new ve(ie),i}Ye(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).qe(t.key,r),this.je=this.je.insert(t.key,t),this.He=this.He.insert(t.key,this.It(t.key).add(e)),this.Je=this.Je.insert(t.key,this.Rt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const i=this.nt(e);this.Et(e,t)?i.qe(t,1):i.Ue(t),this.Je=this.Je.insert(t,this.Rt(t).delete(e)),this.Je=this.Je.insert(t,this.Rt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.nt(e).$e()}nt(e){let t=this.ze.get(e);return t||(t=new Dd,this.ze.set(e,t)),t}Rt(e){let t=this.Je.get(e);return t||(t=new Pe(ie),this.Je=this.Je.insert(e,t)),t}It(e){let t=this.He.get(e);return t||(t=new Pe(ie),this.He=this.He.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||z("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Dd),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Ps(){return new ve(G.comparator)}function xd(){return new ve(G.comparator)}const pR={asc:"ASCENDING",desc:"DESCENDING"},gR={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},_R={and:"AND",or:"OR"};class yR{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Tc(n,e){return n.useProto3Json||Oo(e)?e:{value:e}}function wo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Pp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function vR(n,e){return wo(n,e.toTimestamp())}function xt(n){return ue(!!n,49232),Q.fromTimestamp(function(t){const r=In(t);return new ge(r.seconds,r.nanos)}(n))}function Il(n,e){return Ec(n,e).canonicalString()}function Ec(n,e){const t=function(i){return new me(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function kp(n){const e=me.fromString(n);return ue(Vp(e),10190,{key:e.toString()}),e}function Ic(n,e){return Il(n.databaseId,e.path)}function Ua(n,e){const t=kp(e);if(t.get(1)!==n.databaseId.projectId)throw new F(D.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new F(D.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(xp(t))}function Dp(n,e){return Il(n.databaseId,e)}function wR(n){const e=kp(n);return e.length===4?me.emptyPath():xp(e)}function bc(n){return new me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function xp(n){return ue(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Nd(n,e,t){return{name:Ic(n,e),fields:t.value.mapValue.fields}}function TR(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:W(39313,{state:u})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(u,d){return u.useProto3Json?(ue(d===void 0||typeof d=="string",58123),Be.fromBase64String(d||"")):(ue(d===void 0||d instanceof Buffer||d instanceof Uint8Array,16193),Be.fromUint8Array(d||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(u){const d=u.code===void 0?D.UNKNOWN:Sp(u.code);return new F(d,u.message||"")}(o);t=new Cp(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Ua(n,r.document.name),s=xt(r.document.updateTime),o=r.document.createTime?xt(r.document.createTime):Q.min(),c=new tt({mapValue:{fields:r.document.fields}}),l=He.newFoundDocument(i,s,o,c),u=r.targetIds||[],d=r.removedTargetIds||[];t=new Ws(u,d,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Ua(n,r.document),s=r.readTime?xt(r.readTime):Q.min(),o=He.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Ws([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Ua(n,r.document),s=r.removedTargetIds||[];t=new Ws([],s,i,null)}else{if(!("filter"in e))return W(11601,{Vt:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new uR(i,s),c=r.targetId;t=new Rp(c,o)}}return t}function ER(n,e){let t;if(e instanceof is)t={update:Nd(n,e.key,e.value)};else if(e instanceof wl)t={delete:Ic(n,e.key)};else if(e instanceof kn)t={update:Nd(n,e.key,e.data),updateMask:DR(e.fieldMask)};else{if(!(e instanceof aR))return W(16599,{dt:e.type});t={verify:Ic(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const c=o.transform;if(c instanceof $i)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof zi)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof qi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof vo)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw W(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:vR(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:W(27497)}(n,e.precondition)),t}function IR(n,e){return n&&n.length>0?(ue(e!==void 0,14353),n.map(t=>function(i,s){let o=i.updateTime?xt(i.updateTime):xt(s);return o.isEqual(Q.min())&&(o=xt(s)),new iR(o,i.transformResults||[])}(t,e))):[]}function bR(n,e){return{documents:[Dp(n,e.path)]}}function AR(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Dp(n,i);const s=function(u){if(u.length!==0)return Mp(wt.create(u,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(u){if(u.length!==0)return u.map(d=>function(p){return{field:pr(p.field),direction:CR(p.dir)}}(d))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=Tc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(e.endAt)),{ft:t,parent:i}}function SR(n){let e=wR(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ue(r===1,65062);const d=t.from[0];d.allDescendants?i=d.collectionId:e=e.child(d.collectionId)}let s=[];t.where&&(s=function(m){const p=Np(m);return p instanceof wt&&lp(p)?p.getFilters():[p]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(p=>function(S){return new Bi(gr(S.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(p))}(t.orderBy));let c=null;t.limit&&(c=function(m){let p;return p=typeof m=="object"?m.value:m,Oo(p)?null:p}(t.limit));let l=null;t.startAt&&(l=function(m){const p=!!m.before,_=m.values||[];return new yo(_,p)}(t.startAt));let u=null;return t.endAt&&(u=function(m){const p=!m.before,_=m.values||[];return new yo(_,p)}(t.endAt)),zS(e,i,o,s,c,"F",l,u)}function RR(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Np(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=gr(t.unaryFilter.field);return Se.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=gr(t.unaryFilter.field);return Se.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=gr(t.unaryFilter.field);return Se.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=gr(t.unaryFilter.field);return Se.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return W(61313);default:return W(60726)}}(n):n.fieldFilter!==void 0?function(t){return Se.create(gr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return W(58110);default:return W(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return wt.create(t.compositeFilter.filters.map(r=>Np(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return W(1026)}}(t.compositeFilter.op))}(n):W(30097,{filter:n})}function CR(n){return pR[n]}function PR(n){return gR[n]}function kR(n){return _R[n]}function pr(n){return{fieldPath:n.canonicalString()}}function gr(n){return Fe.fromServerFormat(n.fieldPath)}function Mp(n){return n instanceof Se?function(t){if(t.op==="=="){if(wd(t.value))return{unaryFilter:{field:pr(t.field),op:"IS_NAN"}};if(vd(t.value))return{unaryFilter:{field:pr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wd(t.value))return{unaryFilter:{field:pr(t.field),op:"IS_NOT_NAN"}};if(vd(t.value))return{unaryFilter:{field:pr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:pr(t.field),op:PR(t.op),value:t.value}}}(n):n instanceof wt?function(t){const r=t.getFilters().map(i=>Mp(i));return r.length===1?r[0]:{compositeFilter:{op:kR(t.op),filters:r}}}(n):W(54877,{filter:n})}function DR(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Vp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Lp(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
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
 */class gn{constructor(e,t,r,i,s=Q.min(),o=Q.min(),c=Be.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new gn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new gn(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new gn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new gn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class xR{constructor(e){this.yt=e}}function NR(n){const e=SR({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?wc(e,e.limit,"L"):e}/**
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
 */class MR{constructor(){this.Sn=new VR}addToCollectionParentIndex(e,t){return this.Sn.add(t),x.resolve()}getCollectionParents(e,t){return x.resolve(this.Sn.getEntries(t))}addFieldIndex(e,t){return x.resolve()}deleteFieldIndex(e,t){return x.resolve()}deleteAllFieldIndexes(e){return x.resolve()}createTargetIndexes(e,t){return x.resolve()}getDocumentsMatchingTarget(e,t){return x.resolve(null)}getIndexType(e,t){return x.resolve(0)}getFieldIndexes(e,t){return x.resolve([])}getNextCollectionGroupToUpdate(e){return x.resolve(null)}getMinOffset(e,t){return x.resolve(En.min())}getMinOffsetFromCollectionGroup(e,t){return x.resolve(En.min())}updateCollectionGroup(e,t,r){return x.resolve()}updateIndexEntries(e,t){return x.resolve()}}class VR{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Pe(me.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Pe(me.comparator)).toArray()}}/**
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
 */const Md={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Op=41943040;class et{static withCacheSize(e){return new et(e,et.DEFAULT_COLLECTION_PERCENTILE,et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
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
 */et.DEFAULT_COLLECTION_PERCENTILE=10,et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,et.DEFAULT=new et(Op,et.DEFAULT_COLLECTION_PERCENTILE,et.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),et.DISABLED=new et(-1,0,0);/**
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
 */const Vd="LruGarbageCollector",LR=1048576;function Ld([n,e],[t,r]){const i=ie(n,t);return i===0?ie(e,r):i}class OR{constructor(e){this.Pr=e,this.buffer=new Pe(Ld),this.Tr=0}Ir(){return++this.Tr}Er(e){const t=[e,this.Ir()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Ld(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class UR{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(e){z(Vd,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){$r(t)?z(Vd,"Ignoring IndexedDB error during garbage collection: ",t):await Br(t)}await this.Ar(3e5)})}}class FR{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.dr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return x.resolve(Lo.ce);const r=new OR(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.mr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(z("LruGarbageCollector","Garbage collection skipped; disabled"),x.resolve(Md)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(z("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Md):this.gr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}gr(e,t){let r,i,s,o,c,l,u;const d=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(z("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(s=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(u=Date.now(),fr()<=re.DEBUG&&z("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-d}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(l-c)+`ms
	Removed ${m} documents in `+(u-l)+`ms
Total Duration: ${u-d}ms`),x.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}}function BR(n,e){return new FR(n,e)}/**
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
 */class $R{constructor(){this.changes=new or(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,He.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?x.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class zR{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class qR{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Si(r.mutation,i,st.empty(),ge.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,se()).next(()=>r))}getLocalViewOfDocuments(e,t,r=se()){const i=zn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=_i();return s.forEach((c,l)=>{o=o.insert(c,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=zn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,se()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=en();const o=Ai(),c=function(){return Ai()}();return t.forEach((l,u)=>{const d=r.get(u.key);i.has(u.key)&&(d===void 0||d.mutation instanceof kn)?s=s.insert(u.key,u):d!==void 0?(o.set(u.key,d.mutation.getFieldMask()),Si(d.mutation,u,d.mutation.getFieldMask(),ge.now())):o.set(u.key,st.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((u,d)=>o.set(u,d)),t.forEach((u,d)=>c.set(u,new zR(d,o.get(u)??null))),c))}recalculateAndSaveOverlays(e,t){const r=Ai();let i=new ve((o,c)=>o-c),s=se();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const c of o)c.keys().forEach(l=>{const u=t.get(l);if(u===null)return;let d=r.get(l)||st.empty();d=c.applyToLocalView(u,d),r.set(l,d);const m=(i.get(c.batchId)||se()).add(l);i=i.insert(c.batchId,m)})}).next(()=>{const o=[],c=i.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),u=l.key,d=l.value,m=yp();d.forEach(p=>{if(!s.has(p)){const _=bp(t.get(p),r.get(p));_!==null&&m.set(p,_),s=s.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,u,m))}return x.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return qS(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):fp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):x.resolve(zn());let c=Li,l=s;return o.next(u=>x.forEach(u,(d,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(d)?x.resolve():this.remoteDocumentCache.getEntry(e,d).next(p=>{l=l.insert(d,p)}))).next(()=>this.populateOverlays(e,u,s)).next(()=>this.computeViews(e,l,u,se())).next(d=>({batchId:c,changes:_p(d)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(r=>{let i=_i();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=_i();return this.indexManager.getCollectionParents(e,s).next(c=>x.forEach(c,l=>{const u=function(m,p){return new zr(p,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,u,r,i).next(d=>{d.forEach((m,p)=>{o=o.insert(m,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,u)=>{const d=u.getKey();o.get(d)===null&&(o=o.insert(d,He.newInvalidDocument(d)))});let c=_i();return o.forEach((l,u)=>{const d=s.get(l);d!==void 0&&Si(d.mutation,u,st.empty(),ge.now()),$o(t,u)&&(c=c.insert(l,u))}),c})}}/**
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
 */class HR{constructor(e){this.serializer=e,this.Nr=new Map,this.Br=new Map}getBundleMetadata(e,t){return x.resolve(this.Nr.get(t))}saveBundleMetadata(e,t){return this.Nr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:xt(i.createTime)}}(t)),x.resolve()}getNamedQuery(e,t){return x.resolve(this.Br.get(t))}saveNamedQuery(e,t){return this.Br.set(t.name,function(i){return{name:i.name,query:NR(i.bundledQuery),readTime:xt(i.readTime)}}(t)),x.resolve()}}/**
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
 */class jR{constructor(){this.overlays=new ve(G.comparator),this.Lr=new Map}getOverlay(e,t){return x.resolve(this.overlays.get(t))}getOverlays(e,t){const r=zn();return x.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.bt(e,t,s)}),x.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Lr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Lr.delete(r)),x.resolve()}getOverlaysForCollection(e,t,r){const i=zn(),s=t.length+1,o=new G(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,u=l.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return x.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ve((u,d)=>u-d);const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>r){let d=s.get(u.largestBatchId);d===null&&(d=zn(),s=s.insert(u.largestBatchId,d)),d.set(u.getKey(),u)}}const c=zn(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((u,d)=>c.set(u,d)),!(c.size()>=i)););return x.resolve(c)}bt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Lr.get(i.largestBatchId).delete(r.key);this.Lr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new lR(t,r));let s=this.Lr.get(t);s===void 0&&(s=se(),this.Lr.set(t,s)),this.Lr.set(t,s.add(r.key))}}/**
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
 */class GR{constructor(){this.sessionToken=Be.EMPTY_BYTE_STRING}getSessionToken(e){return x.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,x.resolve()}}/**
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
 */class bl{constructor(){this.kr=new Pe(Ne.Kr),this.qr=new Pe(Ne.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(e,t){const r=new Ne(e,t);this.kr=this.kr.add(r),this.qr=this.qr.add(r)}$r(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new Ne(e,t))}Qr(e,t){e.forEach(r=>this.removeReference(r,t))}Gr(e){const t=new G(new me([])),r=new Ne(t,e),i=new Ne(t,e+1),s=[];return this.qr.forEachInRange([r,i],o=>{this.Wr(o),s.push(o.key)}),s}zr(){this.kr.forEach(e=>this.Wr(e))}Wr(e){this.kr=this.kr.delete(e),this.qr=this.qr.delete(e)}jr(e){const t=new G(new me([])),r=new Ne(t,e),i=new Ne(t,e+1);let s=se();return this.qr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new Ne(e,0),r=this.kr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Ne{constructor(e,t){this.key=e,this.Hr=t}static Kr(e,t){return G.comparator(e.key,t.key)||ie(e.Hr,t.Hr)}static Ur(e,t){return ie(e.Hr,t.Hr)||G.comparator(e.key,t.key)}}/**
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
 */class WR{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Yn=1,this.Jr=new Pe(Ne.Kr)}checkEmpty(e){return x.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new cR(s,t,r,i);this.mutationQueue.push(o);for(const c of i)this.Jr=this.Jr.add(new Ne(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return x.resolve(o)}lookupMutationBatch(e,t){return x.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return x.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return x.resolve(this.mutationQueue.length===0?ml:this.Yn-1)}getAllMutationBatches(e){return x.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Ne(t,0),i=new Ne(t,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([r,i],o=>{const c=this.Zr(o.Hr);s.push(c)}),x.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Pe(ie);return t.forEach(i=>{const s=new Ne(i,0),o=new Ne(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,o],c=>{r=r.add(c.Hr)})}),x.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const o=new Ne(new G(s),0);let c=new Pe(ie);return this.Jr.forEachWhile(l=>{const u=l.key.path;return!!r.isPrefixOf(u)&&(u.length===i&&(c=c.add(l.Hr)),!0)},o),x.resolve(this.Yr(c))}Yr(e){const t=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){ue(this.ei(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return x.forEach(t.mutations,i=>{const s=new Ne(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Jr=r})}nr(e){}containsKey(e,t){const r=new Ne(t,0),i=this.Jr.firstAfterOrEqual(r);return x.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,x.resolve()}ei(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class KR{constructor(e){this.ti=e,this.docs=function(){return new ve(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.ti(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return x.resolve(r?r.document.mutableCopy():He.newInvalidDocument(t))}getEntries(e,t){let r=en();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():He.newInvalidDocument(i))}),x.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=en();const o=t.path,c=new G(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:u,value:{document:d}}=l.getNext();if(!o.isPrefixOf(u.path))break;u.path.length>o.length+1||vS(yS(d),r)<=0||(i.has(d.key)||$o(t,d))&&(s=s.insert(d.key,d.mutableCopy()))}return x.resolve(s)}getAllFromCollectionGroup(e,t,r,i){W(9500)}ni(e,t){return x.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new YR(this)}getSize(e){return x.resolve(this.size)}}class YR extends $R{constructor(e){super(),this.Mr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Mr.addEntry(e,i)):this.Mr.removeEntry(r)}),x.waitFor(t)}getFromCache(e,t){return this.Mr.getEntry(e,t)}getAllFromCache(e,t){return this.Mr.getEntries(e,t)}}/**
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
 */class QR{constructor(e){this.persistence=e,this.ri=new or(t=>_l(t),yl),this.lastRemoteSnapshotVersion=Q.min(),this.highestTargetId=0,this.ii=0,this.si=new bl,this.targetCount=0,this.oi=Vr._r()}forEachTarget(e,t){return this.ri.forEach((r,i)=>t(i)),x.resolve()}getLastRemoteSnapshotVersion(e){return x.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return x.resolve(this.ii)}allocateTargetId(e){return this.highestTargetId=this.oi.next(),x.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.ii&&(this.ii=t),x.resolve()}lr(e){this.ri.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.oi=new Vr(t),this.highestTargetId=t),e.sequenceNumber>this.ii&&(this.ii=e.sequenceNumber)}addTargetData(e,t){return this.lr(t),this.targetCount+=1,x.resolve()}updateTargetData(e,t){return this.lr(t),x.resolve()}removeTargetData(e,t){return this.ri.delete(t.target),this.si.Gr(t.targetId),this.targetCount-=1,x.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ri.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ri.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),x.waitFor(s).next(()=>i)}getTargetCount(e){return x.resolve(this.targetCount)}getTargetData(e,t){const r=this.ri.get(t)||null;return x.resolve(r)}addMatchingKeys(e,t,r){return this.si.$r(t,r),x.resolve()}removeMatchingKeys(e,t,r){this.si.Qr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),x.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.si.Gr(t),x.resolve()}getMatchingKeysForTargetId(e,t){const r=this.si.jr(t);return x.resolve(r)}containsKey(e,t){return x.resolve(this.si.containsKey(t))}}/**
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
 */class Up{constructor(e,t){this._i={},this.overlays={},this.ai=new Lo(0),this.ui=!1,this.ui=!0,this.ci=new GR,this.referenceDelegate=e(this),this.li=new QR(this),this.indexManager=new MR,this.remoteDocumentCache=function(i){return new KR(i)}(r=>this.referenceDelegate.hi(r)),this.serializer=new xR(t),this.Pi=new HR(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new jR,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this._i[e.toKey()];return r||(r=new WR(t,this.referenceDelegate),this._i[e.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(e,t,r){z("MemoryPersistence","Starting transaction:",e);const i=new XR(this.ai.next());return this.referenceDelegate.Ti(),r(i).next(s=>this.referenceDelegate.Ii(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return x.or(Object.values(this._i).map(r=>()=>r.containsKey(e,t)))}}class XR extends TS{constructor(e){super(),this.currentSequenceNumber=e}}class Al{constructor(e){this.persistence=e,this.Ri=new bl,this.Ai=null}static Vi(e){return new Al(e)}get di(){if(this.Ai)return this.Ai;throw W(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.di.delete(r.toString()),x.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.di.add(r.toString()),x.resolve()}markPotentiallyOrphaned(e,t){return this.di.add(t.toString()),x.resolve()}removeTarget(e,t){this.Ri.Gr(t.targetId).forEach(i=>this.di.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.di.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ti(){this.Ai=new Set}Ii(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return x.forEach(this.di,r=>{const i=G.fromPath(r);return this.mi(e,i).next(s=>{s||t.removeEntry(i,Q.min())})}).next(()=>(this.Ai=null,t.apply(e)))}updateLimboDocument(e,t){return this.mi(e,t).next(r=>{r?this.di.delete(t.toString()):this.di.add(t.toString())})}hi(e){return 0}mi(e,t){return x.or([()=>x.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class To{constructor(e,t){this.persistence=e,this.fi=new or(r=>bS(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=BR(this,t)}static Vi(e,t){return new To(e,t)}Ti(){}Ii(e){return x.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}dr(e){const t=this.pr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}pr(e){let t=0;return this.mr(e,r=>{t++}).next(()=>t)}mr(e,t){return x.forEach(this.fi,(r,i)=>this.wr(e,r,i).next(s=>s?x.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ni(e,o=>this.wr(e,o,t).next(c=>{c||(r++,s.removeEntry(o,Q.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.fi.set(t,e.currentSequenceNumber),x.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),x.resolve()}removeReference(e,t,r){return this.fi.set(r,e.currentSequenceNumber),x.resolve()}updateLimboDocument(e,t){return this.fi.set(t,e.currentSequenceNumber),x.resolve()}hi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Hs(e.data.value)),t}wr(e,t,r){return x.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.fi.get(t);return x.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Sl{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Ts=r,this.Is=i}static Es(e,t){let r=se(),i=se();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Sl(e,t.fromCache,r,i)}}/**
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
 */class JR{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class ZR{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=function(){return BE()?8:ES(Ge())>0?6:4}()}initialize(e,t){this.fs=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.gs(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ps(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new JR;return this.ys(e,t,o).next(c=>{if(s.result=c,this.As)return this.ws(e,t,o,c.size)})}).next(()=>s.result)}ws(e,t,r,i){return r.documentReadCount<this.Vs?(fr()<=re.DEBUG&&z("QueryEngine","SDK will not create cache indexes for query:",mr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),x.resolve()):(fr()<=re.DEBUG&&z("QueryEngine","Query:",mr(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.ds*i?(fr()<=re.DEBUG&&z("QueryEngine","The SDK decides to create cache indexes for query:",mr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Dt(t))):x.resolve())}gs(e,t){if(bd(t))return x.resolve(null);let r=Dt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=wc(t,null,"F"),r=Dt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=se(...s);return this.fs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{const u=this.bs(t,c);return this.Ss(t,u,o,l.readTime)?this.gs(e,wc(t,null,"F")):this.Ds(e,u,t,l)}))})))}ps(e,t,r,i){return bd(t)||i.isEqual(Q.min())?x.resolve(null):this.fs.getDocuments(e,r).next(s=>{const o=this.bs(t,s);return this.Ss(t,o,r,i)?x.resolve(null):(fr()<=re.DEBUG&&z("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),mr(t)),this.Ds(e,o,t,_S(i,Li)).next(c=>c))})}bs(e,t){let r=new Pe(pp(e));return t.forEach((i,s)=>{$o(e,s)&&(r=r.add(s))}),r}Ss(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ys(e,t,r){return fr()<=re.DEBUG&&z("QueryEngine","Using full collection scan to execute query:",mr(t)),this.fs.getDocumentsMatchingQuery(e,t,En.min(),r)}Ds(e,t,r,i){return this.fs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
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
 */const Rl="LocalStore",e1=3e8;class t1{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.vs=new ve(ie),this.Fs=new or(s=>_l(s),yl),this.Ms=new Map,this.xs=e.getRemoteDocumentCache(),this.li=e.getTargetCache(),this.Pi=e.getBundleCache(),this.Os(r)}Os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new qR(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.vs))}}function n1(n,e,t,r){return new t1(n,e,t,r)}async function Fp(n,e){const t=X(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Os(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],c=[];let l=se();for(const u of i){o.push(u.batchId);for(const d of u.mutations)l=l.add(d.key)}for(const u of s){c.push(u.batchId);for(const d of u.mutations)l=l.add(d.key)}return t.localDocuments.getDocuments(r,l).next(u=>({Ns:u,removedBatchIds:o,addedBatchIds:c}))})})}function r1(n,e){const t=X(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.xs.newChangeBuffer({trackRemovals:!0});return function(c,l,u,d){const m=u.batch,p=m.keys();let _=x.resolve();return p.forEach(S=>{_=_.next(()=>d.getEntry(l,S)).next(P=>{const k=u.docVersions.get(S);ue(k!==null,48541),P.version.compareTo(k)<0&&(m.applyToRemoteDocument(P,u),P.isValidDocument()&&(P.setReadTime(u.commitVersion),d.addEntry(P)))})}),_.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=se();for(let u=0;u<c.mutationResults.length;++u)c.mutationResults[u].transformResults.length>0&&(l=l.add(c.batch.mutations[u].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Bp(n){const e=X(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.li.getLastRemoteSnapshotVersion(t))}function i1(n,e){const t=X(n),r=e.snapshotVersion;let i=t.vs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.xs.newChangeBuffer({trackRemovals:!0});i=t.vs;const c=[];e.targetChanges.forEach((d,m)=>{const p=i.get(m);if(!p)return;c.push(t.li.removeMatchingKeys(s,d.removedDocuments,m).next(()=>t.li.addMatchingKeys(s,d.addedDocuments,m)));let _=p.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?_=_.withResumeToken(Be.EMPTY_BYTE_STRING,Q.min()).withLastLimboFreeSnapshotVersion(Q.min()):d.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(d.resumeToken,r)),i=i.insert(m,_),function(P,k,N){return P.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=e1?!0:N.addedDocuments.size+N.modifiedDocuments.size+N.removedDocuments.size>0}(p,_,d)&&c.push(t.li.updateTargetData(s,_))});let l=en(),u=se();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,d))}),c.push(s1(s,o,e.documentUpdates).next(d=>{l=d.Bs,u=d.Ls})),!r.isEqual(Q.min())){const d=t.li.getLastRemoteSnapshotVersion(s).next(m=>t.li.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(d)}return x.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,u)).next(()=>l)}).then(s=>(t.vs=i,s))}function s1(n,e,t){let r=se(),i=se();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=en();return t.forEach((c,l)=>{const u=s.get(c);l.isFoundDocument()!==u.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(Q.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!u.isValidDocument()||l.version.compareTo(u.version)>0||l.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):z(Rl,"Ignoring outdated watch update for ",c,". Current version:",u.version," Watch version:",l.version)}),{Bs:o,Ls:i}})}function o1(n,e){const t=X(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=ml),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function a1(n,e){const t=X(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.li.getTargetData(r,e).next(s=>s?(i=s,x.resolve(i)):t.li.allocateTargetId(r).next(o=>(i=new gn(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.li.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.vs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.vs=t.vs.insert(r.targetId,r),t.Fs.set(e,r.targetId)),r})}async function Ac(n,e,t){const r=X(n),i=r.vs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!$r(o))throw o;z(Rl,`Failed to update sequence numbers for target ${e}: ${o}`)}r.vs=r.vs.remove(e),r.Fs.delete(i.target)}function Od(n,e,t){const r=X(n);let i=Q.min(),s=se();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,u,d){const m=X(l),p=m.Fs.get(d);return p!==void 0?x.resolve(m.vs.get(p)):m.li.getTargetData(u,d)}(r,o,Dt(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(o,c.targetId).next(l=>{s=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,t?i:Q.min(),t?s:se())).next(c=>(c1(r,GS(e),c),{documents:c,ks:s})))}function c1(n,e,t){let r=n.Ms.get(e)||Q.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.Ms.set(e,r)}class Ud{constructor(){this.activeTargetIds=JS()}Qs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class l1{constructor(){this.vo=new Ud,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.vo.Qs(e),this.Fo[e]||"not-current"}updateQueryState(e,t,r){this.Fo[e]=t}removeLocalQueryTarget(e){this.vo.Gs(e)}isLocalQueryTarget(e){return this.vo.activeTargetIds.has(e)}clearQueryState(e){delete this.Fo[e]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(e){return this.vo.activeTargetIds.has(e)}start(){return this.vo=new Ud,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class u1{Mo(e){}shutdown(){}}/**
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
 */const Fd="ConnectivityMonitor";class Bd{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(e){this.Lo.push(e)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){z(Fd,"Network connectivity changed: AVAILABLE");for(const e of this.Lo)e(0)}Bo(){z(Fd,"Network connectivity changed: UNAVAILABLE");for(const e of this.Lo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ks=null;function Sc(){return ks===null?ks=function(){return 268435456+Math.round(2147483648*Math.random())}():ks++,"0x"+ks.toString(16)}/**
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
 */const Fa="RestConnection",h1={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class d1{get Ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.$o=this.databaseId.database===go?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const o=Sc(),c=this.Qo(e,t.toUriEncodedString());z(Fa,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(l,i,s);const{host:u}=new URL(c),d=Cn(u);return this.zo(e,c,l,r,d).then(m=>(z(Fa,`Received RPC '${e}' ${o}: `,m),m),m=>{throw Dr(Fa,`RPC '${e}' ${o} failed with error: `,m,"url: ",c,"request:",r),m})}jo(e,t,r,i,s,o){return this.Wo(e,t,r,i,s)}Go(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Qo(e,t){const r=h1[e];let i=`${this.qo}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
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
 */class f1{constructor(e){this.Ho=e.Ho,this.Jo=e.Jo}Zo(e){this.Xo=e}Yo(e){this.e_=e}t_(e){this.n_=e}onMessage(e){this.r_=e}close(){this.Jo()}send(e){this.Ho(e)}i_(){this.Xo()}s_(){this.e_()}o_(e){this.n_(e)}__(e){this.r_(e)}}/**
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
 */const ze="WebChannelConnection",di=(n,e,t)=>{n.listen(e,r=>{try{t(r)}catch(i){setTimeout(()=>{throw i},0)}})};class Ir extends d1{constructor(e){super(e),this.a_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static u_(){if(!Ir.c_){const e=jm();di(e,Hm.STAT_EVENT,t=>{t.stat===fc.PROXY?z(ze,"STAT_EVENT: detected buffering proxy"):t.stat===fc.NOPROXY&&z(ze,"STAT_EVENT: detected no buffering proxy")}),Ir.c_=!0}}zo(e,t,r,i,s){const o=Sc();return new Promise((c,l)=>{const u=new zm;u.setWithCredentials(!0),u.listenOnce(qm.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case qs.NO_ERROR:const m=u.getResponseJson();z(ze,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(m)),c(m);break;case qs.TIMEOUT:z(ze,`RPC '${e}' ${o} timed out`),l(new F(D.DEADLINE_EXCEEDED,"Request time out"));break;case qs.HTTP_ERROR:const p=u.getStatus();if(z(ze,`RPC '${e}' ${o} failed with status:`,p,"response text:",u.getResponseText()),p>0){let _=u.getResponseJson();Array.isArray(_)&&(_=_[0]);const S=_==null?void 0:_.error;if(S&&S.status&&S.message){const P=function(N){const L=N.toLowerCase().replace(/_/g,"-");return Object.values(D).indexOf(L)>=0?L:D.UNKNOWN}(S.status);l(new F(P,S.message))}else l(new F(D.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new F(D.UNAVAILABLE,"Connection failed."));break;default:W(9055,{l_:e,streamId:o,h_:u.getLastErrorCode(),P_:u.getLastError()})}}finally{z(ze,`RPC '${e}' ${o} completed.`)}});const d=JSON.stringify(i);z(ze,`RPC '${e}' ${o} sending request:`,i),u.send(t,"POST",d,r,15)})}T_(e,t,r){const i=Sc(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Go(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const u=s.join("");z(ze,`Creating RPC '${e}' stream ${i}: ${u}`,c);const d=o.createWebChannel(u,c);this.I_(d);let m=!1,p=!1;const _=new f1({Ho:S=>{p?z(ze,`Not sending because RPC '${e}' stream ${i} is closed:`,S):(m||(z(ze,`Opening RPC '${e}' stream ${i} transport.`),d.open(),m=!0),z(ze,`RPC '${e}' stream ${i} sending:`,S),d.send(S))},Jo:()=>d.close()});return di(d,gi.EventType.OPEN,()=>{p||(z(ze,`RPC '${e}' stream ${i} transport opened.`),_.i_())}),di(d,gi.EventType.CLOSE,()=>{p||(p=!0,z(ze,`RPC '${e}' stream ${i} transport closed`),_.o_(),this.E_(d))}),di(d,gi.EventType.ERROR,S=>{p||(p=!0,Dr(ze,`RPC '${e}' stream ${i} transport errored. Name:`,S.name,"Message:",S.message),_.o_(new F(D.UNAVAILABLE,"The operation could not be completed")))}),di(d,gi.EventType.MESSAGE,S=>{var P;if(!p){const k=S.data[0];ue(!!k,16349);const N=k,L=(N==null?void 0:N.error)||((P=N[0])==null?void 0:P.error);if(L){z(ze,`RPC '${e}' stream ${i} received error:`,L);const B=L.status;let H=function(T){const y=Ae[T];if(y!==void 0)return Sp(y)}(B),J=L.message;H===void 0&&(H=D.INTERNAL,J="Unknown error status: "+B+" with message "+L.message),p=!0,_.o_(new F(H,J)),d.close()}else z(ze,`RPC '${e}' stream ${i} received:`,k),_.__(k)}}),Ir.u_(),setTimeout(()=>{_.s_()},0),_}terminate(){this.a_.forEach(e=>e.close()),this.a_=[]}I_(e){this.a_.push(e)}E_(e){this.a_=this.a_.filter(t=>t===e)}Go(e,t,r){super.Go(e,t,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Gm()}}/**
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
 */function m1(n){return new Ir(n)}function Ba(){return typeof document<"u"?document:null}/**
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
 */function jo(n){return new yR(n,!0)}/**
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
 */Ir.c_=!1;class $p{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Ci=e,this.timerId=t,this.R_=r,this.A_=i,this.V_=s,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(e){this.cancel();const t=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),i=Math.max(0,t-r);i>0&&z("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.d_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,i,()=>(this.f_=Date.now(),e())),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
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
 */const $d="PersistentStream";class zp{constructor(e,t,r,i,s,o,c,l){this.Ci=e,this.b_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new $p(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.b_,6e4,()=>this.k_()))}K_(e){this.q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===D.RESOURCE_EXHAUSTED?(Zt(t.toString()),Zt("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===D.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.t_(t)}W_(){}auth(){this.state=1;const e=this.Q_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.D_===t&&this.G_(r,i)},r=>{e(()=>{const i=new F(D.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(i)})})}G_(e,t){const r=this.Q_(this.D_);this.stream=this.j_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.Yo(()=>{r(()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.S_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.Yo()))}),this.stream.t_(i=>{r(()=>this.z_(i))}),this.stream.onMessage(i=>{r(()=>++this.F_==1?this.H_(i):this.onNext(i))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return z($d,`close with error: ${e}`),this.stream=null,this.close(4,e)}Q_(e){return t=>{this.Ci.enqueueAndForget(()=>this.D_===e?t():(z($d,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class p1 extends zp{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}j_(e,t){return this.connection.T_("Listen",e,t)}H_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=TR(this.serializer,e),r=function(s){if(!("targetChange"in s))return Q.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?Q.min():o.readTime?xt(o.readTime):Q.min()}(e);return this.listener.J_(t,r)}Z_(e){const t={};t.database=bc(this.serializer),t.addTarget=function(s,o){let c;const l=o.target;if(c=yc(l)?{documents:bR(s,l)}:{query:AR(s,l).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=Pp(s,o.resumeToken);const u=Tc(s,o.expectedCount);u!==null&&(c.expectedCount=u)}else if(o.snapshotVersion.compareTo(Q.min())>0){c.readTime=wo(s,o.snapshotVersion.toTimestamp());const u=Tc(s,o.expectedCount);u!==null&&(c.expectedCount=u)}return c}(this.serializer,e);const r=RR(this.serializer,e);r&&(t.labels=r),this.K_(t)}X_(e){const t={};t.database=bc(this.serializer),t.removeTarget=e,this.K_(t)}}class g1 extends zp{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}H_(e){return ue(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,ue(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){ue(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=IR(e.writeResults,e.commitTime),r=xt(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=bc(this.serializer),this.K_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>ER(this.serializer,r))};this.K_(t)}}/**
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
 */class _1{}class y1 extends _1{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ia=!1}sa(){if(this.ia)throw new F(D.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Wo(e,Ec(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new F(D.UNKNOWN,s.toString())})}jo(e,t,r,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.jo(e,Ec(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===D.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new F(D.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}function v1(n,e,t,r){return new y1(n,e,t,r)}class w1{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
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
 */const tr="RemoteStore";class T1{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.Ra=[],this.Aa=s,this.Aa.Mo(o=>{r.enqueueAndForget(async()=>{ar(this)&&(z(tr,"Restarting streams for network reachability change."),await async function(l){const u=X(l);u.Ea.add(4),await os(u),u.Va.set("Unknown"),u.Ea.delete(4),await Go(u)}(this))})}),this.Va=new w1(r,i)}}async function Go(n){if(ar(n))for(const e of n.Ra)await e(!0)}async function os(n){for(const e of n.Ra)await e(!1)}function qp(n,e){const t=X(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Dl(t)?kl(t):qr(t).O_()&&Pl(t,e))}function Cl(n,e){const t=X(n),r=qr(t);t.Ia.delete(e),r.O_()&&Hp(t,e),t.Ia.size===0&&(r.O_()?r.L_():ar(t)&&t.Va.set("Unknown"))}function Pl(n,e){if(n.da.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Q.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}qr(n).Z_(e)}function Hp(n,e){n.da.$e(e),qr(n).X_(e)}function kl(n){n.da=new mR({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),qr(n).start(),n.Va.ua()}function Dl(n){return ar(n)&&!qr(n).x_()&&n.Ia.size>0}function ar(n){return X(n).Ea.size===0}function jp(n){n.da=void 0}async function E1(n){n.Va.set("Online")}async function I1(n){n.Ia.forEach((e,t)=>{Pl(n,e)})}async function b1(n,e){jp(n),Dl(n)?(n.Va.ha(e),kl(n)):n.Va.set("Unknown")}async function A1(n,e,t){if(n.Va.set("Online"),e instanceof Cp&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const c of s.targetIds)i.Ia.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.Ia.delete(c),i.da.removeTarget(c))}(n,e)}catch(r){z(tr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Eo(n,r)}else if(e instanceof Ws?n.da.Xe(e):e instanceof Rp?n.da.st(e):n.da.tt(e),!t.isEqual(Q.min()))try{const r=await Bp(n.localStore);t.compareTo(r)>=0&&await function(s,o){const c=s.da.Tt(o);return c.targetChanges.forEach((l,u)=>{if(l.resumeToken.approximateByteSize()>0){const d=s.Ia.get(u);d&&s.Ia.set(u,d.withResumeToken(l.resumeToken,o))}}),c.targetMismatches.forEach((l,u)=>{const d=s.Ia.get(l);if(!d)return;s.Ia.set(l,d.withResumeToken(Be.EMPTY_BYTE_STRING,d.snapshotVersion)),Hp(s,l);const m=new gn(d.target,l,u,d.sequenceNumber);Pl(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){z(tr,"Failed to raise snapshot:",r),await Eo(n,r)}}async function Eo(n,e,t){if(!$r(e))throw e;n.Ea.add(1),await os(n),n.Va.set("Offline"),t||(t=()=>Bp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{z(tr,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await Go(n)})}function Gp(n,e){return e().catch(t=>Eo(n,t,e))}async function Wo(n){const e=X(n),t=Sn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ml;for(;S1(e);)try{const i=await o1(e.localStore,r);if(i===null){e.Ta.length===0&&t.L_();break}r=i.batchId,R1(e,i)}catch(i){await Eo(e,i)}Wp(e)&&Kp(e)}function S1(n){return ar(n)&&n.Ta.length<10}function R1(n,e){n.Ta.push(e);const t=Sn(n);t.O_()&&t.Y_&&t.ea(e.mutations)}function Wp(n){return ar(n)&&!Sn(n).x_()&&n.Ta.length>0}function Kp(n){Sn(n).start()}async function C1(n){Sn(n).ra()}async function P1(n){const e=Sn(n);for(const t of n.Ta)e.ea(t.mutations)}async function k1(n,e,t){const r=n.Ta.shift(),i=Tl.from(r,e,t);await Gp(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Wo(n)}async function D1(n,e){e&&Sn(n).Y_&&await async function(r,i){if(function(o){return hR(o)&&o!==D.ABORTED}(i.code)){const s=r.Ta.shift();Sn(r).B_(),await Gp(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Wo(r)}}(n,e),Wp(n)&&Kp(n)}async function zd(n,e){const t=X(n);t.asyncQueue.verifyOperationInProgress(),z(tr,"RemoteStore received new credentials");const r=ar(t);t.Ea.add(3),await os(t),r&&t.Va.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await Go(t)}async function x1(n,e){const t=X(n);e?(t.Ea.delete(2),await Go(t)):e||(t.Ea.add(2),await os(t),t.Va.set("Unknown"))}function qr(n){return n.ma||(n.ma=function(t,r,i){const s=X(t);return s.sa(),new p1(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:E1.bind(null,n),Yo:I1.bind(null,n),t_:b1.bind(null,n),J_:A1.bind(null,n)}),n.Ra.push(async e=>{e?(n.ma.B_(),Dl(n)?kl(n):n.Va.set("Unknown")):(await n.ma.stop(),jp(n))})),n.ma}function Sn(n){return n.fa||(n.fa=function(t,r,i){const s=X(t);return s.sa(),new g1(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:C1.bind(null,n),t_:D1.bind(null,n),ta:P1.bind(null,n),na:k1.bind(null,n)}),n.Ra.push(async e=>{e?(n.fa.B_(),await Wo(n)):(await n.fa.stop(),n.Ta.length>0&&(z(tr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
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
 */class xl{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Wt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,c=new xl(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(D.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Nl(n,e){if(Zt("AsyncQueue",`${e}: ${n}`),$r(n))return new F(D.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class qd{constructor(){this.ga=new ve(G.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):W(63341,{Vt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class Lr{constructor(e,t,r,i,s,o,c,l,u){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=u}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new Lr(e,t,br.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Bo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class N1{constructor(){this.wa=void 0,this.ba=[]}Sa(){return this.ba.some(e=>e.Da())}}class M1{constructor(){this.queries=Hd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const i=X(t),s=i.queries;i.queries=Hd(),s.forEach((o,c)=>{for(const l of c.ba)l.onError(r)})})(this,new F(D.ABORTED,"Firestore shutting down"))}}function Hd(){return new or(n=>mp(n),Bo)}async function Ml(n,e){const t=X(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.Da()&&(r=2):(s=new N1,r=e.Da()?0:1);try{switch(r){case 0:s.wa=await t.onListen(i,!0);break;case 1:s.wa=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const c=Nl(o,`Initialization of query '${mr(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.ba.push(e),e.va(t.onlineState),s.wa&&e.Fa(s.wa)&&Ll(t)}async function Vl(n,e){const t=X(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.ba.indexOf(e);o>=0&&(s.ba.splice(o,1),s.ba.length===0?i=e.Da()?0:1:!s.Sa()&&e.Da()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function V1(n,e){const t=X(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const c of o.ba)c.Fa(i)&&(r=!0);o.wa=i}}r&&Ll(t)}function L1(n,e,t){const r=X(n),i=r.queries.get(e);if(i)for(const s of i.ba)s.onError(t);r.queries.delete(e)}function Ll(n){n.Ca.forEach(e=>{e.next()})}var Rc,jd;(jd=Rc||(Rc={})).Ma="default",jd.Cache="cache";class Ol{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Lr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.Ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Lr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Rc.Cache}}/**
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
 */class Yp{constructor(e){this.key=e}}class Qp{constructor(e){this.key=e}}class O1{constructor(e,t){this.query=e,this.Za=t,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=se(),this.mutatedKeys=se(),this.eu=pp(e),this.tu=new br(this.eu)}get nu(){return this.Za}ru(e,t){const r=t?t.iu:new qd,i=t?t.tu:this.tu;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,u=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((d,m)=>{const p=i.get(d),_=$o(this.query,m)?m:null,S=!!p&&this.mutatedKeys.has(p.key),P=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let k=!1;p&&_?p.data.isEqual(_.data)?S!==P&&(r.track({type:3,doc:_}),k=!0):this.su(p,_)||(r.track({type:2,doc:_}),k=!0,(l&&this.eu(_,l)>0||u&&this.eu(_,u)<0)&&(c=!0)):!p&&_?(r.track({type:0,doc:_}),k=!0):p&&!_&&(r.track({type:1,doc:p}),k=!0,(l||u)&&(c=!0)),k&&(_?(o=o.add(_),s=P?s.add(d):s.delete(d)):(o=o.delete(d),s=s.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),s=s.delete(d.key),r.track({type:1,doc:d})}return{tu:o,iu:r,Ss:c,mutatedKeys:s}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort((d,m)=>function(_,S){const P=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W(20277,{Vt:k})}};return P(_)-P(S)}(d.type,m.type)||this.eu(d.doc,m.doc)),this.ou(r),i=i??!1;const c=t&&!i?this._u():[],l=this.Ya.size===0&&this.current&&!i?1:0,u=l!==this.Xa;return this.Xa=l,o.length!==0||u?{snapshot:new Lr(this.query,e.tu,s,o,e.mutatedKeys,l===0,u,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new qd,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{au:[]}}uu(e){return!this.Za.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Za=this.Za.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Za=this.Za.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Ya;this.Ya=se(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))});const t=[];return e.forEach(r=>{this.Ya.has(r)||t.push(new Qp(r))}),this.Ya.forEach(r=>{e.has(r)||t.push(new Yp(r))}),t}cu(e){this.Za=e.ks,this.Ya=se();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Lr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Ul="SyncEngine";class U1{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class F1{constructor(e){this.key=e,this.hu=!1}}class B1{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new or(c=>mp(c),Bo),this.Iu=new Map,this.Eu=new Set,this.Ru=new ve(G.comparator),this.Au=new Map,this.Vu=new bl,this.du={},this.mu=new Map,this.fu=Vr.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function $1(n,e,t=!0){const r=ng(n);let i;const s=r.Tu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.lu()):i=await Xp(r,e,t,!0),i}async function z1(n,e){const t=ng(n);await Xp(t,e,!0,!1)}async function Xp(n,e,t,r){const i=await a1(n.localStore,Dt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let c;return r&&(c=await q1(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&qp(n.remoteStore,i),c}async function q1(n,e,t,r,i){n.pu=(m,p,_)=>async function(P,k,N,L){let B=k.view.ru(N);B.Ss&&(B=await Od(P.localStore,k.query,!1).then(({documents:T})=>k.view.ru(T,B)));const H=L&&L.targetChanges.get(k.targetId),J=L&&L.targetMismatches.get(k.targetId)!=null,U=k.view.applyChanges(B,P.isPrimaryClient,H,J);return Wd(P,k.targetId,U.au),U.snapshot}(n,m,p,_);const s=await Od(n.localStore,e,!0),o=new O1(e,s.ks),c=o.ru(s.documents),l=ss.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),u=o.applyChanges(c,n.isPrimaryClient,l);Wd(n,t,u.au);const d=new U1(e,t,o);return n.Tu.set(e,d),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),u.snapshot}async function H1(n,e,t){const r=X(n),i=r.Tu.get(e),s=r.Iu.get(i.targetId);if(s.length>1)return r.Iu.set(i.targetId,s.filter(o=>!Bo(o,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ac(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Cl(r.remoteStore,i.targetId),Cc(r,i.targetId)}).catch(Br)):(Cc(r,i.targetId),await Ac(r.localStore,i.targetId,!0))}async function j1(n,e){const t=X(n),r=t.Tu.get(e),i=t.Iu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Cl(t.remoteStore,r.targetId))}async function G1(n,e,t){const r=Z1(n);try{const i=await function(o,c){const l=X(o),u=ge.now(),d=c.reduce((_,S)=>_.add(S.key),se());let m,p;return l.persistence.runTransaction("Locally write mutations","readwrite",_=>{let S=en(),P=se();return l.xs.getEntries(_,d).next(k=>{S=k,S.forEach((N,L)=>{L.isValidDocument()||(P=P.add(N))})}).next(()=>l.localDocuments.getOverlayedDocuments(_,S)).next(k=>{m=k;const N=[];for(const L of c){const B=oR(L,m.get(L.key).overlayedDocument);B!=null&&N.push(new kn(L.key,B,op(B.value.mapValue),ht.exists(!0)))}return l.mutationQueue.addMutationBatch(_,u,N,c)}).next(k=>{p=k;const N=k.applyToLocalDocumentSet(m,P);return l.documentOverlayCache.saveOverlays(_,k.batchId,N)})}).then(()=>({batchId:p.batchId,changes:_p(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,l){let u=o.du[o.currentUser.toKey()];u||(u=new ve(ie)),u=u.insert(c,l),o.du[o.currentUser.toKey()]=u}(r,i.batchId,t),await as(r,i.changes),await Wo(r.remoteStore)}catch(i){const s=Nl(i,"Failed to persist write");t.reject(s)}}async function Jp(n,e){const t=X(n);try{const r=await i1(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Au.get(s);o&&(ue(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.hu=!0:i.modifiedDocuments.size>0?ue(o.hu,14607):i.removedDocuments.size>0&&(ue(o.hu,42227),o.hu=!1))}),await as(t,r,e)}catch(r){await Br(r)}}function Gd(n,e,t){const r=X(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Tu.forEach((s,o)=>{const c=o.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){const l=X(o);l.onlineState=c;let u=!1;l.queries.forEach((d,m)=>{for(const p of m.ba)p.va(c)&&(u=!0)}),u&&Ll(l)}(r.eventManager,e),i.length&&r.Pu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function W1(n,e,t){const r=X(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Au.get(e),s=i&&i.key;if(s){let o=new ve(G.comparator);o=o.insert(s,He.newNoDocument(s,Q.min()));const c=se().add(s),l=new Ho(Q.min(),new Map,new ve(ie),o,c);await Jp(r,l),r.Ru=r.Ru.remove(s),r.Au.delete(e),Fl(r)}else await Ac(r.localStore,e,!1).then(()=>Cc(r,e,t)).catch(Br)}async function K1(n,e){const t=X(n),r=e.batch.batchId;try{const i=await r1(t.localStore,e);eg(t,r,null),Zp(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await as(t,i)}catch(i){await Br(i)}}async function Y1(n,e,t){const r=X(n);try{const i=await function(o,c){const l=X(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",u=>{let d;return l.mutationQueue.lookupMutationBatch(u,c).next(m=>(ue(m!==null,37113),d=m.keys(),l.mutationQueue.removeMutationBatch(u,m))).next(()=>l.mutationQueue.performConsistencyCheck(u)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(u,d,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,d)).next(()=>l.localDocuments.getDocuments(u,d))})}(r.localStore,e);eg(r,e,t),Zp(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await as(r,i)}catch(i){await Br(i)}}function Zp(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function eg(n,e,t){const r=X(n);let i=r.du[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.du[r.currentUser.toKey()]=i}}function Cc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Vu.Gr(e).forEach(r=>{n.Vu.containsKey(r)||tg(n,r)})}function tg(n,e){n.Eu.delete(e.path.canonicalString());const t=n.Ru.get(e);t!==null&&(Cl(n.remoteStore,t),n.Ru=n.Ru.remove(e),n.Au.delete(t),Fl(n))}function Wd(n,e,t){for(const r of t)r instanceof Yp?(n.Vu.addReference(r.key,e),Q1(n,r)):r instanceof Qp?(z(Ul,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,e),n.Vu.containsKey(r.key)||tg(n,r.key)):W(19791,{wu:r})}function Q1(n,e){const t=e.key,r=t.path.canonicalString();n.Ru.get(t)||n.Eu.has(r)||(z(Ul,"New document in limbo: "+t),n.Eu.add(r),Fl(n))}function Fl(n){for(;n.Eu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new G(me.fromString(e)),r=n.fu.next();n.Au.set(r,new F1(t)),n.Ru=n.Ru.insert(t,r),qp(n.remoteStore,new gn(Dt(Fo(t.path)),r,"TargetPurposeLimboResolution",Lo.ce))}}async function as(n,e,t){const r=X(n),i=[],s=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach((c,l)=>{o.push(r.pu(l,e,t).then(u=>{var d;if((u||t)&&r.isPrimaryClient){const m=u?!u.fromCache:(d=t==null?void 0:t.targetChanges.get(l.targetId))==null?void 0:d.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(u){i.push(u);const m=Sl.Es(l.targetId,u);s.push(m)}}))}),await Promise.all(o),r.Pu.J_(i),await async function(l,u){const d=X(l);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>x.forEach(u,p=>x.forEach(p.Ts,_=>d.persistence.referenceDelegate.addReference(m,p.targetId,_)).next(()=>x.forEach(p.Is,_=>d.persistence.referenceDelegate.removeReference(m,p.targetId,_)))))}catch(m){if(!$r(m))throw m;z(Rl,"Failed to update sequence numbers: "+m)}for(const m of u){const p=m.targetId;if(!m.fromCache){const _=d.vs.get(p),S=_.snapshotVersion,P=_.withLastLimboFreeSnapshotVersion(S);d.vs=d.vs.insert(p,P)}}}(r.localStore,s))}async function X1(n,e){const t=X(n);if(!t.currentUser.isEqual(e)){z(Ul,"User change. New user:",e.toKey());const r=await Fp(t.localStore,e);t.currentUser=e,function(s,o){s.mu.forEach(c=>{c.forEach(l=>{l.reject(new F(D.CANCELLED,o))})}),s.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await as(t,r.Ns)}}function J1(n,e){const t=X(n),r=t.Au.get(e);if(r&&r.hu)return se().add(r.key);{let i=se();const s=t.Iu.get(e);if(!s)return i;for(const o of s){const c=t.Tu.get(o);i=i.unionWith(c.view.nu)}return i}}function ng(n){const e=X(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Jp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=J1.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=W1.bind(null,e),e.Pu.J_=V1.bind(null,e.eventManager),e.Pu.yu=L1.bind(null,e.eventManager),e}function Z1(n){const e=X(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=K1.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Y1.bind(null,e),e}class Io{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=jo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return n1(this.persistence,new ZR,e.initialUser,this.serializer)}Cu(e){return new Up(Al.Vi,this.serializer)}Du(e){return new l1}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Io.provider={build:()=>new Io};class eC extends Io{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){ue(this.persistence.referenceDelegate instanceof To,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new UR(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?et.withCacheSize(this.cacheSizeBytes):et.DEFAULT;return new Up(r=>To.Vi(r,t),this.serializer)}}class Pc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Gd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=X1.bind(null,this.syncEngine),await x1(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new M1}()}createDatastore(e){const t=jo(e.databaseInfo.databaseId),r=m1(e.databaseInfo);return v1(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new T1(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Gd(this.syncEngine,t,0),function(){return Bd.v()?new Bd:new u1}())}createSyncEngine(e,t){return function(i,s,o,c,l,u,d){const m=new B1(i,s,o,c,l,u);return d&&(m.gu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=X(i);z(tr,"RemoteStore shutting down."),s.Ea.add(5),await os(s),s.Aa.shutdown(),s.Va.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Pc.provider={build:()=>new Pc};/**
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
 */class Bl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Zt("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Rn="FirestoreClient";class tC{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this._databaseInfo=i,this.user=qe.UNAUTHENTICATED,this.clientId=fl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{z(Rn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(z(Rn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Wt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Nl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function $a(n,e){n.asyncQueue.verifyOperationInProgress(),z(Rn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Fp(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Kd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await nC(n);z(Rn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>zd(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>zd(e.remoteStore,i)),n._onlineComponents=e}async function nC(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){z(Rn,"Using user provided OfflineComponentProvider");try{await $a(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===D.FAILED_PRECONDITION||i.code===D.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Dr("Error using user provided cache. Falling back to memory cache: "+t),await $a(n,new Io)}}else z(Rn,"Using default OfflineComponentProvider"),await $a(n,new eC(void 0));return n._offlineComponents}async function rg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(z(Rn,"Using user provided OnlineComponentProvider"),await Kd(n,n._uninitializedComponentsProvider._online)):(z(Rn,"Using default OnlineComponentProvider"),await Kd(n,new Pc))),n._onlineComponents}function rC(n){return rg(n).then(e=>e.syncEngine)}async function bo(n){const e=await rg(n),t=e.eventManager;return t.onListen=$1.bind(null,e.syncEngine),t.onUnlisten=H1.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=z1.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=j1.bind(null,e.syncEngine),t}function iC(n,e,t,r){const i=new Bl(r),s=new Ol(e,i,t);return n.asyncQueue.enqueueAndForget(async()=>Ml(await bo(n),s)),()=>{i.Nu(),n.asyncQueue.enqueueAndForget(async()=>Vl(await bo(n),s))}}function sC(n,e,t={}){const r=new Wt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,u){const d=new Bl({next:p=>{d.Nu(),o.enqueueAndForget(()=>Vl(s,m));const _=p.docs.has(c);!_&&p.fromCache?u.reject(new F(D.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&p.fromCache&&l&&l.source==="server"?u.reject(new F(D.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(p)},error:p=>u.reject(p)}),m=new Ol(Fo(c.path),d,{includeMetadataChanges:!0,Ka:!0});return Ml(s,m)}(await bo(n),n.asyncQueue,e,t,r)),r.promise}function oC(n,e,t={}){const r=new Wt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,l,u){const d=new Bl({next:p=>{d.Nu(),o.enqueueAndForget(()=>Vl(s,m)),p.fromCache&&l.source==="server"?u.reject(new F(D.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):u.resolve(p)},error:p=>u.reject(p)}),m=new Ol(c,d,{includeMetadataChanges:!0,Ka:!0});return Ml(s,m)}(await bo(n),n.asyncQueue,e,t,r)),r.promise}function aC(n,e){const t=new Wt;return n.asyncQueue.enqueueAndForget(async()=>G1(await rC(n),e,t)),t.promise}/**
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
 */function ig(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const cC="ComponentProvider",Yd=new Map;function lC(n,e,t,r,i){return new RS(n,e,t,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,ig(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
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
 */const sg="firestore.googleapis.com",Qd=!0;class Xd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new F(D.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=sg,this.ssl=Qd}else this.host=e.host,this.ssl=e.ssl??Qd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Op;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<LR)throw new F(D.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}gS("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ig(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new F(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new F(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new F(D.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ko{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Xd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(D.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(D.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Xd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new oS;switch(r.type){case"firstParty":return new uS(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new F(D.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Yd.get(t);r&&(z(cC,"Removing Datastore"),Yd.delete(t),r.terminate())}(this),Promise.resolve()}}function uC(n,e,t,r={}){var u;n=rt(n,Ko);const i=Cn(e),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},c=`${e}:${t}`;i&&(Xc(`https://${c}`),Jc("Firestore",!0)),s.host!==sg&&s.host!==c&&Dr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const l={...s,host:c,ssl:i,emulatorOptions:r};if(!Xn(l,o)&&(n._setSettings(l),r.mockUserToken)){let d,m;if(typeof r.mockUserToken=="string")d=r.mockUserToken,m=qe.MOCK_USER;else{d=sm(r.mockUserToken,(u=n._app)==null?void 0:u.options.projectId);const p=r.mockUserToken.sub||r.mockUserToken.user_id;if(!p)throw new F(D.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new qe(p)}n._authCredentials=new aS(new Km(d,m))}}/**
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
 */class Dn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Dn(this.firestore,e,this._query)}}class Te{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new wn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Te(this.firestore,e,this._key)}toJSON(){return{type:Te._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(rs(t,Te._jsonSchema))return new Te(e,r||null,new G(me.fromString(t.referencePath)))}}Te._jsonSchemaVersion="firestore/documentReference/1.0",Te._jsonSchema={type:Re("string",Te._jsonSchemaVersion),referencePath:Re("string")};class wn extends Dn{constructor(e,t,r){super(e,t,Fo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Te(this.firestore,null,new G(e))}withConverter(e){return new wn(this.firestore,e,this._path)}}function za(n,e,...t){if(n=ye(n),Ym("collection","path",e),n instanceof Ko){const r=me.fromString(e,...t);return ud(r),new wn(n,null,r)}{if(!(n instanceof Te||n instanceof wn))throw new F(D.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return ud(r),new wn(n.firestore,null,r)}}function Ri(n,e,...t){if(n=ye(n),arguments.length===1&&(e=fl.newId()),Ym("doc","path",e),n instanceof Ko){const r=me.fromString(e,...t);return ld(r),new Te(n,null,new G(r))}{if(!(n instanceof Te||n instanceof wn))throw new F(D.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return ld(r),new Te(n.firestore,n instanceof wn?n.converter:null,new G(r))}}/**
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
 */const Jd="AsyncQueue";class Zd{constructor(e=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new $p(this,"async_queue_retry"),this._c=()=>{const r=Ba();r&&z(Jd,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Ba();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Ba();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new Wt;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Yu.push(e),this.lc()))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(e){if(!$r(e))throw e;z(Jd,"Operation failed with retryable error: "+e)}this.Yu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,Zt("INTERNAL UNHANDLED ERROR: ",ef(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const i=xl.createAndSchedule(this,e,t,r,s=>this.hc(s));return this.tc.push(i),i}uc(){this.nc&&W(47125,{Pc:ef(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}Rc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function ef(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class tn extends Ko{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Zd,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Zd(e),this._firestoreClient=void 0,await e}}}function hC(n,e){const t=typeof n=="object"?n:tl(),r=typeof n=="string"?n:go,i=Do(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=nm("firestore");s&&uC(i,...s)}return i}function Yo(n){if(n._terminated)throw new F(D.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||dC(n),n._firestoreClient}function dC(n){var r,i,s,o;const e=n._freezeSettings(),t=lC(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(i=n._app)==null?void 0:i.options.apiKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new tC(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(n._componentsProvider))}/**
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
 */class lt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new lt(Be.fromBase64String(e))}catch(t){throw new F(D.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new lt(Be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:lt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(rs(e,lt._jsonSchema))return lt.fromBase64String(e.bytes)}}lt._jsonSchemaVersion="firestore/bytes/1.0",lt._jsonSchema={type:Re("string",lt._jsonSchemaVersion),bytes:Re("string")};/**
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
 */class $l{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(D.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Qo{constructor(e){this._methodName=e}}/**
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
 */class Nt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(D.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(D.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ie(this._lat,e._lat)||ie(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Nt._jsonSchemaVersion}}static fromJSON(e){if(rs(e,Nt._jsonSchema))return new Nt(e.latitude,e.longitude)}}Nt._jsonSchemaVersion="firestore/geoPoint/1.0",Nt._jsonSchema={type:Re("string",Nt._jsonSchemaVersion),latitude:Re("number"),longitude:Re("number")};/**
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
 */class vt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:vt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(rs(e,vt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new vt(e.vectorValues);throw new F(D.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}vt._jsonSchemaVersion="firestore/vectorValue/1.0",vt._jsonSchema={type:Re("string",vt._jsonSchemaVersion),vectorValues:Re("object")};/**
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
 */const fC=/^__.*__$/;class mC{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new kn(e,this.data,this.fieldMask,t,this.fieldTransforms):new is(e,this.data,t,this.fieldTransforms)}}class og{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new kn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ag(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W(40011,{dataSource:n})}}class zl{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new zl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){var i;const t=(i=this.path)==null?void 0:i.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Ao(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(ag(this.dataSource)&&fC.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class pC{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||jo(e)}createContext(e,t,r,i=!1){return new zl({dataSource:e,methodName:t,targetDoc:r,path:Fe.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Xo(n){const e=n._freezeSettings(),t=jo(n._databaseId);return new pC(n._databaseId,!!e.ignoreUndefinedProperties,t)}function cg(n,e,t,r,i,s={}){const o=n.createContext(s.merge||s.mergeFields?2:0,e,t,i);Hl("Data must be an object, but it was:",o,r);const c=lg(r,o);let l,u;if(s.merge)l=new st(o.fieldMask),u=o.fieldTransforms;else if(s.mergeFields){const d=[];for(const m of s.mergeFields){const p=Or(e,m,t);if(!o.contains(p))throw new F(D.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);dg(d,p)||d.push(p)}l=new st(d),u=o.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,u=o.fieldTransforms;return new mC(new tt(c),l,u)}class Jo extends Qo{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Jo}}class ql extends Qo{_toFieldTransform(e){return new nR(e.path,new $i)}isEqual(e){return e instanceof ql}}function gC(n,e,t,r){const i=n.createContext(1,e,t);Hl("Data must be an object, but it was:",i,r);const s=[],o=tt.empty();Pn(r,(l,u)=>{const d=hg(e,l,t);u=ye(u);const m=i.childContextForFieldPath(d);if(u instanceof Jo)s.push(d);else{const p=cs(u,m);p!=null&&(s.push(d),o.set(d,p))}});const c=new st(s);return new og(o,c,i.fieldTransforms)}function _C(n,e,t,r,i,s){const o=n.createContext(1,e,t),c=[Or(e,r,t)],l=[i];if(s.length%2!=0)throw new F(D.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<s.length;p+=2)c.push(Or(e,s[p])),l.push(s[p+1]);const u=[],d=tt.empty();for(let p=c.length-1;p>=0;--p)if(!dg(u,c[p])){const _=c[p];let S=l[p];S=ye(S);const P=o.childContextForFieldPath(_);if(S instanceof Jo)u.push(_);else{const k=cs(S,P);k!=null&&(u.push(_),d.set(_,k))}}const m=new st(u);return new og(d,m,o.fieldTransforms)}function yC(n,e,t,r=!1){return cs(t,n.createContext(r?4:3,e))}function cs(n,e){if(ug(n=ye(n)))return Hl("Unsupported field value:",e,n),lg(n,e);if(n instanceof Qo)return function(r,i){if(!ag(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const c of r){let l=cs(c,i.childContextForArray(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ye(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ZS(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=ge.fromDate(r);return{timestampValue:wo(i.serializer,s)}}if(r instanceof ge){const s=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:wo(i.serializer,s)}}if(r instanceof Nt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof lt)return{bytesValue:Pp(i.serializer,r._byteString)};if(r instanceof Te){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.createError(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Il(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof vt)return function(o,c){const l=o instanceof vt?o.toArray():o;return{mapValue:{fields:{[ip]:{stringValue:sp},[_o]:{arrayValue:{values:l.map(d=>{if(typeof d!="number")throw c.createError("VectorValues must only contain numeric values.");return vl(c.serializer,d)})}}}}}}(r,i);if(Lp(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Vo(r)}`)}(n,e)}function lg(n,e){const t={};return Jm(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Pn(n,(r,i)=>{const s=cs(i,e.childContextForField(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function ug(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof Nt||n instanceof lt||n instanceof Te||n instanceof Qo||n instanceof vt||Lp(n))}function Hl(n,e,t){if(!ug(t)||!Qm(t)){const r=Vo(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Or(n,e,t){if((e=ye(e))instanceof $l)return e._internalPath;if(typeof e=="string")return hg(n,e);throw Ao("Field path arguments must be of type string or ",n,!1,void 0,t)}const vC=new RegExp("[~\\*/\\[\\]]");function hg(n,e,t){if(e.search(vC)>=0)throw Ao(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new $l(...e.split("."))._internalPath}catch{throw Ao(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ao(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new F(D.INVALID_ARGUMENT,c+n+l)}function dg(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class wC{convertValue(e,t="none"){switch(An(e)){case 0:return null;case 1:return e.booleanValue;case 2:return be(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(bn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw W(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Pn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var r,i,s;const t=(s=(i=(r=e.fields)==null?void 0:r[_o].arrayValue)==null?void 0:i.values)==null?void 0:s.map(o=>be(o.doubleValue));return new vt(t)}convertGeoPoint(e){return new Nt(be(e.latitude),be(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Uo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Oi(e));default:return null}}convertTimestamp(e){const t=In(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=me.fromString(e);ue(Vp(r),9688,{name:e});const i=new Ui(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(t)||Zt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */class jl extends wC{constructor(e){super(),this.firestore=e}convertBytes(e){return new lt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Te(this.firestore,null,t)}}function Ft(){return new ql("serverTimestamp")}const tf="@firebase/firestore",nf="4.10.0";/**
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
 */function rf(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}/**
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
 */class fg{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Te(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new TC(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(Or("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class TC extends fg{data(){return super.data()}}/**
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
 */function mg(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new F(D.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Gl{}class pg extends Gl{}function EC(n,e,...t){let r=[];e instanceof Gl&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof Kl).length,c=s.filter(l=>l instanceof Wl).length;if(o>1||o>0&&c>0)throw new F(D.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Wl extends pg{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Wl(e,t,r)}_apply(e){const t=this._parse(e);return gg(e._query,t),new Dn(e.firestore,e.converter,vc(e._query,t))}_parse(e){const t=Xo(e.firestore);return function(s,o,c,l,u,d,m){let p;if(u.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new F(D.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){of(m,d);const S=[];for(const P of m)S.push(sf(l,s,P));p={arrayValue:{values:S}}}else p=sf(l,s,m)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||of(m,d),p=yC(c,o,m,d==="in"||d==="not-in");return Se.create(u,d,p)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class Kl extends Gl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Kl(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:wt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const c=s.getFlattenedFilters();for(const l of c)gg(o,l),o=vc(o,l)}(e._query,t),new Dn(e.firestore,e.converter,vc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Yl extends pg{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Yl(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new F(D.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new F(D.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Bi(s,o)}(e._query,this._field,this._direction);return new Dn(e.firestore,e.converter,jS(e._query,t))}}function IC(n,e="asc"){const t=e,r=Or("orderBy",n);return Yl._create(r,t)}function sf(n,e,t){if(typeof(t=ye(t))=="string"){if(t==="")throw new F(D.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!fp(e)&&t.indexOf("/")!==-1)throw new F(D.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(me.fromString(t));if(!G.isDocumentKey(r))throw new F(D.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return yd(n,new G(r))}if(t instanceof Te)return yd(n,t._key);throw new F(D.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Vo(t)}.`)}function of(n,e){if(!Array.isArray(n)||n.length===0)throw new F(D.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function gg(n,e){const t=function(i,s){for(const o of i)for(const c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new F(D.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new F(D.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function _g(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class vi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class jn extends fg{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ks(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Or("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(D.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=jn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}jn._jsonSchemaVersion="firestore/documentSnapshot/1.0",jn._jsonSchema={type:Re("string",jn._jsonSchemaVersion),bundleSource:Re("string","DocumentSnapshot"),bundleName:Re("string"),bundle:Re("string")};class Ks extends jn{data(e={}){return super.data(e)}}class Gn{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new vi(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ks(this._firestore,this._userDataWriter,r.key,r,new vi(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new F(D.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{const l=new Ks(i._firestore,i._userDataWriter,c.doc.key,c.doc,new vi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{const l=new Ks(i._firestore,i._userDataWriter,c.doc.key,c.doc,new vi(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let u=-1,d=-1;return c.type!==0&&(u=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),d=o.indexOf(c.doc.key)),{type:bC(c.type),doc:l,oldIndex:u,newIndex:d}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(D.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Gn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=fl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function bC(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W(61501,{type:n})}}/**
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
 */Gn._jsonSchemaVersion="firestore/querySnapshot/1.0",Gn._jsonSchema={type:Re("string",Gn._jsonSchemaVersion),bundleSource:Re("string","QuerySnapshot"),bundleName:Re("string"),bundle:Re("string")};/**
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
 */function AC(n){n=rt(n,Te);const e=rt(n.firestore,tn),t=Yo(e);return sC(t,n._key).then(r=>yg(e,n,r))}function af(n){n=rt(n,Dn);const e=rt(n.firestore,tn),t=Yo(e),r=new jl(e);return mg(n._query),oC(t,n._query).then(i=>new Gn(e,r,n,i))}function cf(n,e,t){n=rt(n,Te);const r=rt(n.firestore,tn),i=_g(n.converter,e,t),s=Xo(r);return Zo(r,[cg(s,"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,ht.none())])}function SC(n,e,t,...r){n=rt(n,Te);const i=rt(n.firestore,tn),s=Xo(i);let o;return o=typeof(e=ye(e))=="string"||e instanceof $l?_C(s,"updateDoc",n._key,e,t,r):gC(s,"updateDoc",n._key,e),Zo(i,[o.toMutation(n._key,ht.exists(!0))])}function lf(n){return Zo(rt(n.firestore,tn),[new wl(n._key,ht.none())])}function qa(n,e){const t=rt(n.firestore,tn),r=Ri(n),i=_g(n.converter,e),s=Xo(n.firestore);return Zo(t,[cg(s,"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,ht.exists(!1))]).then(()=>r)}function uf(n,...e){var u,d,m;n=ye(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||rf(e[r])||(t=e[r++]);const i={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(rf(e[r])){const p=e[r];e[r]=(u=p.next)==null?void 0:u.bind(p),e[r+1]=(d=p.error)==null?void 0:d.bind(p),e[r+2]=(m=p.complete)==null?void 0:m.bind(p)}let s,o,c;if(n instanceof Te)o=rt(n.firestore,tn),c=Fo(n._key.path),s={next:p=>{e[r]&&e[r](yg(o,n,p))},error:e[r+1],complete:e[r+2]};else{const p=rt(n,Dn);o=rt(p.firestore,tn),c=p._query;const _=new jl(o);s={next:S=>{e[r]&&e[r](new Gn(o,_,p,S))},error:e[r+1],complete:e[r+2]},mg(n._query)}const l=Yo(o);return iC(l,c,i,s)}function Zo(n,e){const t=Yo(n);return aC(t,e)}function yg(n,e,t){const r=t.docs.get(e._key),i=new jl(n);return new jn(n,i,e._key,r,new vi(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){sS(sr),Jn(new Tn("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),c=new tn(new cS(r.getProvider("auth-internal")),new hS(o,r.getProvider("app-check-internal")),CS(o,i),o);return s={useFetchStreams:t,...s},c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Pt(tf,nf,e),Pt(tf,nf,"esm2020")})();var RC="firebase",CC="12.8.0";/**
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
 */Pt(RC,CC,"app");/**
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
 */const vg="firebasestorage.googleapis.com",wg="storageBucket",PC=2*60*1e3,kC=10*60*1e3;/**
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
 */class Ie extends Ot{constructor(e,t,r=0){super(Ha(e),`Firebase Storage: ${t} (${Ha(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Ie.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ha(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Ee;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Ee||(Ee={}));function Ha(n){return"storage/"+n}function Ql(){const n="An unknown error occurred, please check the error payload for server response.";return new Ie(Ee.UNKNOWN,n)}function DC(n){return new Ie(Ee.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function xC(n){return new Ie(Ee.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function NC(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Ie(Ee.UNAUTHENTICATED,n)}function MC(){return new Ie(Ee.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function VC(n){return new Ie(Ee.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function LC(){return new Ie(Ee.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function OC(){return new Ie(Ee.CANCELED,"User canceled the upload/download.")}function UC(n){return new Ie(Ee.INVALID_URL,"Invalid URL '"+n+"'.")}function FC(n){return new Ie(Ee.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function BC(){return new Ie(Ee.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+wg+"' property when initializing the app?")}function $C(){return new Ie(Ee.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function zC(){return new Ie(Ee.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function qC(n){return new Ie(Ee.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function kc(n){return new Ie(Ee.INVALID_ARGUMENT,n)}function Tg(){return new Ie(Ee.APP_DELETED,"The Firebase app was deleted.")}function HC(n){return new Ie(Ee.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Ci(n,e){return new Ie(Ee.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function fi(n){throw new Ie(Ee.INTERNAL_ERROR,"Internal error: "+n)}/**
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
 */class ot{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=ot.makeFromUrl(e,t)}catch{return new ot(e,"")}if(r.path==="")return r;throw FC(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(H){H.path.charAt(H.path.length-1)==="/"&&(H.path_=H.path_.slice(0,-1))}const o="(/(.*))?$",c=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function u(H){H.path_=decodeURIComponent(H.path)}const d="v[A-Za-z0-9_]+",m=t.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",_=new RegExp(`^https?://${m}/${d}/b/${i}/o${p}`,"i"),S={bucket:1,path:3},P=t===vg?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",N=new RegExp(`^https?://${P}/${i}/${k}`,"i"),B=[{regex:c,indices:l,postModify:s},{regex:_,indices:S,postModify:u},{regex:N,indices:{bucket:1,path:2},postModify:u}];for(let H=0;H<B.length;H++){const J=B[H],U=J.regex.exec(e);if(U){const T=U[J.indices.bucket];let y=U[J.indices.path];y||(y=""),r=new ot(T,y),J.postModify(r);break}}if(r==null)throw UC(e);return r}}class jC{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function GC(n,e,t){let r=1,i=null,s=null,o=!1,c=0;function l(){return c===2}let u=!1;function d(...k){u||(u=!0,e.apply(null,k))}function m(k){i=setTimeout(()=>{i=null,n(_,l())},k)}function p(){s&&clearTimeout(s)}function _(k,...N){if(u){p();return}if(k){p(),d.call(null,k,...N);return}if(l()||o){p(),d.call(null,k,...N);return}r<64&&(r*=2);let B;c===1?(c=2,B=0):B=(r+Math.random())*1e3,m(B)}let S=!1;function P(k){S||(S=!0,p(),!u&&(i!==null?(k||(c=2),clearTimeout(i),m(0)):k||(c=1)))}return m(0),s=setTimeout(()=>{o=!0,P(!0)},t),P}function WC(n){n(!1)}/**
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
 */function KC(n){return n!==void 0}function YC(n){return typeof n=="object"&&!Array.isArray(n)}function Xl(n){return typeof n=="string"||n instanceof String}function hf(n){return Jl()&&n instanceof Blob}function Jl(){return typeof Blob<"u"}function df(n,e,t,r){if(r<e)throw kc(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw kc(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
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
 */function ea(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function Eg(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var Wn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Wn||(Wn={}));/**
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
 */function QC(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
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
 */class XC{constructor(e,t,r,i,s,o,c,l,u,d,m,p=!0,_=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=c,this.errorCallback_=l,this.timeout_=u,this.progressCallback_=d,this.connectionFactory_=m,this.retry=p,this.isUsingEmulator=_,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((S,P)=>{this.resolve_=S,this.reject_=P,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Ds(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=c=>{const l=c.loaded,u=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,u)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const c=s.getErrorCode()===Wn.NO_ERROR,l=s.getStatus();if(!c||QC(l,this.additionalRetryCodes_)&&this.retry){const d=s.getErrorCode()===Wn.ABORT;r(!1,new Ds(!1,null,d));return}const u=this.successCodes_.indexOf(l)!==-1;r(!0,new Ds(u,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,c=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(c,c.getResponse());KC(l)?s(l):s()}catch(l){o(l)}else if(c!==null){const l=Ql();l.serverResponse=c.getErrorText(),this.errorCallback_?o(this.errorCallback_(c,l)):o(l)}else if(i.canceled){const l=this.appDelete_?Tg():OC();o(l)}else{const l=LC();o(l)}};this.canceled_?t(!1,new Ds(!1,null,!0)):this.backoffId_=GC(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&WC(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Ds{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function JC(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function ZC(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function eP(n,e){e&&(n["X-Firebase-GMPID"]=e)}function tP(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function nP(n,e,t,r,i,s,o=!0,c=!1){const l=Eg(n.urlParams),u=n.url+l,d=Object.assign({},n.headers);return eP(d,e),JC(d,t),ZC(d,s),tP(d,r),new XC(u,n.method,d,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o,c)}/**
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
 */function rP(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function iP(...n){const e=rP();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Jl())return new Blob(n);throw new Ie(Ee.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function sP(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function oP(n){if(typeof atob>"u")throw qC("base-64");return atob(n)}/**
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
 */const Rt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ja{constructor(e,t){this.data=e,this.contentType=t||null}}function aP(n,e){switch(n){case Rt.RAW:return new ja(Ig(e));case Rt.BASE64:case Rt.BASE64URL:return new ja(bg(n,e));case Rt.DATA_URL:return new ja(lP(e),uP(e))}throw Ql()}function Ig(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=n.charCodeAt(++t);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function cP(n){let e;try{e=decodeURIComponent(n)}catch{throw Ci(Rt.DATA_URL,"Malformed data URL.")}return Ig(e)}function bg(n,e){switch(n){case Rt.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Ci(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Rt.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Ci(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=oP(e)}catch(i){throw i.message.includes("polyfill")?i:Ci(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class Ag{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Ci(Rt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=hP(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function lP(n){const e=new Ag(n);return e.base64?bg(Rt.BASE64,e.rest):cP(e.rest)}function uP(n){return new Ag(n).contentType}function hP(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
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
 */class mn{constructor(e,t){let r=0,i="";hf(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(hf(this.data_)){const r=this.data_,i=sP(r,e,t);return i===null?null:new mn(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new mn(r,!0)}}static getBlob(...e){if(Jl()){const t=e.map(r=>r instanceof mn?r.data_:r);return new mn(iP.apply(null,t))}else{const t=e.map(o=>Xl(o)?aP(Rt.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(o=>{for(let c=0;c<o.length;c++)i[s++]=o[c]}),new mn(i,!0)}}uploadData(){return this.data_}}/**
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
 */function Sg(n){let e;try{e=JSON.parse(n)}catch{return null}return YC(e)?e:null}/**
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
 */function dP(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function fP(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Rg(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */function mP(n,e){return e}class Ze{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||mP}}let xs=null;function pP(n){return!Xl(n)||n.length<2?n:Rg(n)}function Cg(){if(xs)return xs;const n=[];n.push(new Ze("bucket")),n.push(new Ze("generation")),n.push(new Ze("metageneration")),n.push(new Ze("name","fullPath",!0));function e(s,o){return pP(o)}const t=new Ze("name");t.xform=e,n.push(t);function r(s,o){return o!==void 0?Number(o):o}const i=new Ze("size");return i.xform=r,n.push(i),n.push(new Ze("timeCreated")),n.push(new Ze("updated")),n.push(new Ze("md5Hash",null,!0)),n.push(new Ze("cacheControl",null,!0)),n.push(new Ze("contentDisposition",null,!0)),n.push(new Ze("contentEncoding",null,!0)),n.push(new Ze("contentLanguage",null,!0)),n.push(new Ze("contentType",null,!0)),n.push(new Ze("metadata","customMetadata",!0)),xs=n,xs}function gP(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new ot(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function _P(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];r[o.local]=o.xform(r,e[o.server])}return gP(r,n),r}function Pg(n,e,t){const r=Sg(e);return r===null?null:_P(n,r,t)}function yP(n,e,t,r){const i=Sg(e);if(i===null||!Xl(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(u=>{const d=n.bucket,m=n.fullPath,p="/b/"+o(d)+"/o/"+o(m),_=ea(p,t,r),S=Eg({alt:"media",token:u});return _+S})[0]}function vP(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class Zl{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function kg(n){if(!n)throw Ql()}function wP(n,e){function t(r,i){const s=Pg(n,i,e);return kg(s!==null),s}return t}function TP(n,e){function t(r,i){const s=Pg(n,i,e);return kg(s!==null),yP(s,i,n.host,n._protocol)}return t}function Dg(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=MC():i=NC():t.getStatus()===402?i=xC(n.bucket):t.getStatus()===403?i=VC(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function xg(n){const e=Dg(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=DC(n.path)),s.serverResponse=i.serverResponse,s}return t}function EP(n,e,t){const r=e.fullServerUrl(),i=ea(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,c=new Zl(i,s,TP(n,t),o);return c.errorHandler=xg(e),c}function IP(n,e){const t=e.fullServerUrl(),r=ea(t,n.host,n._protocol),i="DELETE",s=n.maxOperationRetryTime;function o(l,u){}const c=new Zl(r,i,o,s);return c.successCodes=[200,204],c.errorHandler=xg(e),c}function bP(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function AP(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=bP(null,e)),r}function SP(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function c(){let B="";for(let H=0;H<2;H++)B=B+Math.random().toString().slice(2);return B}const l=c();o["Content-Type"]="multipart/related; boundary="+l;const u=AP(e,r,i),d=vP(u,t),m="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+d+`\r
--`+l+`\r
Content-Type: `+u.contentType+`\r
\r
`,p=`\r
--`+l+"--",_=mn.getBlob(m,r,p);if(_===null)throw $C();const S={name:u.fullPath},P=ea(s,n.host,n._protocol),k="POST",N=n.maxUploadRetryTime,L=new Zl(P,k,wP(n,t),N);return L.urlParams=S,L.headers=o,L.body=_.uploadData(),L.errorHandler=Dg(e),L}class RP{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Wn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Wn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Wn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i,s){if(this.sent_)throw fi("cannot .send() more than once");if(Cn(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw fi("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw fi("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw fi("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw fi("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class CP extends RP{initXhr(){this.xhr_.responseType="text"}}function eu(){return new CP}/**
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
 */class nr{constructor(e,t){this._service=e,t instanceof ot?this._location=t:this._location=ot.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new nr(e,t)}get root(){const e=new ot(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Rg(this._location.path)}get storage(){return this._service}get parent(){const e=dP(this._location.path);if(e===null)return null;const t=new ot(this._location.bucket,e);return new nr(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw HC(e)}}function PP(n,e,t){n._throwIfRoot("uploadBytes");const r=SP(n.storage,n._location,Cg(),new mn(e,!0),t);return n.storage.makeRequestWithTokens(r,eu).then(i=>({metadata:i,ref:n}))}function kP(n){n._throwIfRoot("getDownloadURL");const e=EP(n.storage,n._location,Cg());return n.storage.makeRequestWithTokens(e,eu).then(t=>{if(t===null)throw zC();return t})}function DP(n){n._throwIfRoot("deleteObject");const e=IP(n.storage,n._location);return n.storage.makeRequestWithTokens(e,eu)}function xP(n,e){const t=fP(n._location.path,e),r=new ot(n._location.bucket,t);return new nr(n.storage,r)}/**
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
 */function NP(n){return/^[A-Za-z]+:\/\//.test(n)}function MP(n,e){return new nr(n,e)}function Ng(n,e){if(n instanceof tu){const t=n;if(t._bucket==null)throw BC();const r=new nr(t,t._bucket);return e!=null?Ng(r,e):r}else return e!==void 0?xP(n,e):n}function VP(n,e){if(e&&NP(e)){if(n instanceof tu)return MP(n,e);throw kc("To use ref(service, url), the first argument must be a Storage instance.")}else return Ng(n,e)}function ff(n,e){const t=e==null?void 0:e[wg];return t==null?null:ot.makeFromBucketSpec(t,n)}function LP(n,e,t,r={}){n.host=`${e}:${t}`;const i=Cn(e);i&&(Xc(`https://${n.host}/b`),Jc("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:sm(s,n.app.options.projectId))}class tu{constructor(e,t,r,i,s,o=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=vg,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=PC,this._maxUploadRetryTime=kC,this._requests=new Set,i!=null?this._bucket=ot.makeFromBucketSpec(i,this._host):this._bucket=ff(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ot.makeFromBucketSpec(this._url,e):this._bucket=ff(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){df("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){df("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(ct(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new nr(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new jC(Tg());{const o=nP(e,this._appId,r,i,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const mf="@firebase/storage",pf="0.14.0";/**
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
 */const Mg="storage";function OP(n,e,t){return n=ye(n),PP(n,e,t)}function UP(n){return n=ye(n),kP(n)}function FP(n){return n=ye(n),DP(n)}function gf(n,e){return n=ye(n),VP(n,e)}function BP(n=tl(),e){n=ye(n);const r=Do(n,Mg).getImmediate({identifier:e}),i=nm("storage");return i&&$P(r,...i),r}function $P(n,e,t,r={}){LP(n,e,t,r)}function zP(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new tu(t,r,i,e,sr)}function qP(){Jn(new Tn(Mg,zP,"PUBLIC").setMultipleInstances(!0)),Pt(mf,pf,""),Pt(mf,pf,"esm2020")}qP();const HP={apiKey:"AIzaSyCuAkWbQRZhmx4ULJT0qoHOZmVl9dUez8U",authDomain:"indian-family-tree-1990.firebaseapp.com",projectId:"indian-family-tree-1990",storageBucket:"indian-family-tree-1990.firebasestorage.app",messagingSenderId:"1061764015655",appId:"1:1061764015655:web:a61a61044ede9e7559d002"},nu=cm(HP),Ga=rS(nu),Ys=hC(nu),_f=BP(nu),Vg=new Bt;Vg.setCustomParameters({prompt:"select_account"});class jP{constructor(){this.currentUser=null,this.authStateListeners=[]}init(){return new Promise(e=>{jb(Ga,async t=>{console.log("Auth state changed in service:",t?t.email:"no user"),t?(this.currentUser={uid:t.uid,email:t.email,displayName:t.displayName,photoURL:t.photoURL},this.createUserDocument(t).catch(r=>{console.warn("Could not create user document:",r)})):this.currentUser=null,this.authStateListeners.forEach(r=>r(this.currentUser)),e(this.currentUser)})})}async signInWithGoogle(){try{return{success:!0,user:(await dA(Ga,Vg)).user}}catch(e){return console.error("Google sign-in error:",e),{success:!1,error:e.message}}}async signOut(){try{return await Gb(Ga),{success:!0}}catch(e){return console.error("Sign-out error:",e),{success:!1,error:e.message}}}async createUserDocument(e){const t=Ri(Ys,"users",e.uid);(await AC(t)).exists()?await cf(t,{lastLoginAt:Ft()},{merge:!0}):await cf(t,{displayName:e.displayName,email:e.email,photoURL:e.photoURL,createdAt:Ft(),lastLoginAt:Ft()})}getCurrentUser(){return this.currentUser}isAuthenticated(){return this.currentUser!==null}onAuthStateChange(e){return this.authStateListeners.push(e),()=>{this.authStateListeners=this.authStateListeners.filter(t=>t!==e)}}}const Gt=new jP;class GP{constructor(){this.members=[],this.relationships=[],this.currentTreeId=null,this.unsubscribeMembers=null,this.unsubscribeRelationships=null,this.dataChangeListeners=[],this.familyTreesCache=null}getUserTreesRef(){const e=Gt.getCurrentUser();if(!e)throw new Error("User not authenticated");return za(Ys,"users",e.uid,"familyTrees")}getMembersRef(){const e=Gt.getCurrentUser();return!e||!this.currentTreeId?null:za(Ys,"users",e.uid,"familyTrees",this.currentTreeId,"members")}getRelationshipsRef(){const e=Gt.getCurrentUser();return!e||!this.currentTreeId?null:za(Ys,"users",e.uid,"familyTrees",this.currentTreeId,"relationships")}async createFamilyTree(e="My Family Tree"){const t=this.getUserTreesRef(),r=await qa(t,{name:e,createdAt:Ft(),updatedAt:Ft()});return this.currentTreeId=r.id,this.familyTreesCache=null,await this.subscribeToTree(),r.id}async getFamilyTrees(){if(this.familyTreesCache)return console.log("Returning family trees from cache."),this.familyTreesCache;try{const e=this.getUserTreesRef(),t=EC(e,IC("createdAt","desc")),i=(await af(t)).docs.map(s=>({id:s.id,...s.data()}));return this.familyTreesCache=i,console.log("Fetched and cached family trees."),i}catch(e){console.error("Error getting family trees with server-side sorting. This likely requires a Firestore index. Falling back to client-side sorting. Error: ",e);try{const t=this.getUserTreesRef();return(await af(t)).docs.map(s=>({id:s.id,...s.data()})).sort((s,o)=>{var u,d,m,p;const c=((d=(u=s.createdAt)==null?void 0:u.toMillis)==null?void 0:d.call(u))||0;return(((p=(m=o.createdAt)==null?void 0:m.toMillis)==null?void 0:p.call(m))||0)-c})}catch(t){return console.error("Error in fallback fetching of family trees:",t),[]}}}async loadFamilyTree(e){return this.currentTreeId=e,await this.subscribeToTree(),this.currentTreeId}async subscribeToTree(){this.unsubscribe();const e=this.getMembersRef(),t=this.getRelationshipsRef();!e||!t||(this.unsubscribeMembers=uf(e,r=>{this.members=r.docs.map(i=>({id:i.id,...i.data()})),this.notifyDataChange()}),this.unsubscribeRelationships=uf(t,r=>{this.relationships=r.docs.map(i=>({id:i.id,...i.data()})),this.notifyDataChange()}))}unsubscribe(){this.unsubscribeMembers&&(this.unsubscribeMembers(),this.unsubscribeMembers=null),this.unsubscribeRelationships&&(this.unsubscribeRelationships(),this.unsubscribeRelationships=null)}async uploadPhoto(e,t){if(!e)return null;const r=Gt.getCurrentUser();if(!r||!this.currentTreeId)throw new Error("User not authenticated or no tree selected");const i=`${Date.now()}_${e.name}`,s=gf(_f,`users/${r.uid}/familyTrees/${this.currentTreeId}/photos/${t}/${i}`);return await OP(s,e),await UP(s)}async deletePhoto(e){if(e)try{const t=gf(_f,e);await FP(t)}catch(t){console.error("Error deleting photo:",t)}}async addMember(e){const t=this.getMembersRef();if(!t)throw new Error("No family tree selected");return{id:(await qa(t,{...e,createdAt:Ft(),updatedAt:Ft()})).id,...e}}async updateMember(e,t){const r=this.getMembersRef();if(!r)throw new Error("No family tree selected");const i=Ri(r,e);return await SC(i,{...t,updatedAt:Ft()}),{id:e,...t}}async deleteMember(e){const t=this.getMembersRef();if(!t)throw new Error("No family tree selected");await lf(Ri(t,e));const r=this.getRelationshipsRef(),i=this.relationships.filter(s=>s.member1Id===e||s.member2Id===e);for(const s of i)await lf(Ri(r,s.id))}getMember(e){return this.members.find(t=>t.id===e)}getAllMembers(){return this.members.map(e=>{const t=this.getSpouse(e.id);return{...e,spouseId:t?t.id:null}})}async addSpouse(e,t,r=null){const i=this.getRelationshipsRef();if(!i)throw new Error("No family tree selected");return{id:(await qa(i,{type:"spouse",member1Id:e,member2Id:t,marriageDate:r,createdAt:Ft()})).id,type:"spouse",member1Id:e,member2Id:t,marriageDate:r}}async addParent(e,t){const r=this.getMember(e);if(r){const i=r.parentIds||[];i.includes(t)||(i.push(t),await this.updateMember(e,{parentIds:i}))}}getSpouse(e){const t=this.relationships.find(r=>r.type==="spouse"&&(r.member1Id===e||r.member2Id===e));if(t){const r=t.member1Id===e?t.member2Id:t.member1Id;return this.getMember(r)}return null}getChildren(e){return this.members.filter(t=>t.parentIds&&t.parentIds.includes(e))}getParents(e){const t=this.getMember(e);return t&&t.parentIds?t.parentIds.map(r=>this.getMember(r)).filter(Boolean):[]}getSiblings(e){const t=this.getMember(e);return!t||!t.parentIds||t.parentIds.length===0?[]:this.members.filter(r=>r.id!==e&&r.parentIds&&r.parentIds.some(i=>t.parentIds.includes(i)))}searchMembers(e){const t=e.toLowerCase();return this.members.filter(r=>{const i=r.name&&r.name.toLowerCase().includes(t)||r.firstName&&r.firstName.toLowerCase().includes(t)||r.lastName&&r.lastName.toLowerCase().includes(t),s=r.profession&&r.profession.toLowerCase().includes(t)||r.birthPlace&&r.birthPlace.toLowerCase().includes(t)||r.gotra&&r.gotra.toLowerCase().includes(t)||r.email&&r.email.toLowerCase().includes(t)||r.phone&&r.phone.toLowerCase().includes(t);return i||s})}getMembersByGeneration(e){return this.members.map(r=>({...r,generation:this.calculateGeneration(r.id)})).filter(r=>r.generation===e)}calculateGeneration(e,t=new Set){if(t.has(e))return 0;t.add(e);const r=this.getMember(e);if(!r||!r.parentIds||r.parentIds.length===0)return 1;const i=r.parentIds.map(s=>this.calculateGeneration(s,t));return Math.max(...i)+1}getStatistics(){const e=this.members.filter(i=>i.gender==="male").length,t=this.members.filter(i=>i.gender==="female").length,r=new Set(this.members.map(i=>this.calculateGeneration(i.id)));return{totalMembers:this.members.length,males:e,females:t,generations:r.size,alive:this.members.filter(i=>i.isAlive).length,deceased:this.members.filter(i=>!i.isAlive).length}}getRecentMembers(e=5){return[...this.members].sort((t,r)=>{var o,c,l,u;const i=((c=(o=t.createdAt)==null?void 0:o.toMillis)==null?void 0:c.call(o))||0;return(((u=(l=r.createdAt)==null?void 0:l.toMillis)==null?void 0:u.call(l))||0)-i}).slice(0,e)}getUpcomingBirthdays(e=10){const t=new Date,r=t.getFullYear();return this.members.filter(s=>s.birthDate&&s.isAlive).map(s=>{const o=new Date(s.birthDate),c=new Date(r,o.getMonth(),o.getDate());c<t&&c.setFullYear(r+1);const l=Math.ceil((c-t)/(1e3*60*60*24));return{member:s,date:c.toLocaleDateString("en-IN",{month:"short",day:"numeric"}),daysUntil:l}}).sort((s,o)=>s.daysUntil-o.daysUntil).slice(0,e)}exportData(){return{members:this.members,relationships:this.relationships,exportDate:new Date().toISOString(),version:"2.0"}}clearLocalData(){this.members=[],this.relationships=[],this.currentTreeId=null,this.familyTreesCache=null,this.unsubscribe()}onDataChange(e){return this.dataChangeListeners.push(e),()=>{this.dataChangeListeners=this.dataChangeListeners.filter(t=>t!==e)}}notifyDataChange(){this.dataChangeListeners.forEach(e=>e()),window.dispatchEvent(new CustomEvent("familyDataChanged"))}}const nn=new GP;let Hi,ji,Dc,xc,Nc,je,gt,_t,Gi,Mc,pn=null;document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM loaded, initializing app..."),WP(),cr(),KP(),Gt.onAuthStateChange(XP);try{console.log("Initializing auth service..."),await Gt.init(),console.log("Auth initialization process started.")}catch(n){console.error("Auth init error:",n),Lg()}});function WP(){Hi=document.getElementById("signInPage"),ji=document.getElementById("dashboardPage"),Dc=document.getElementById("userAvatar"),xc=document.getElementById("userName"),Nc=document.getElementById("userEmail"),je=document.getElementById("userDropdown"),gt=document.getElementById("treesModal"),_t=document.getElementById("createTreeModal"),Gi=document.getElementById("loadingOverlay"),Mc=document.getElementById("currentTreeName")}function KP(){var n,e,t,r,i,s,o,c,l,u;(n=document.getElementById("welcomeSignInBtn"))==null||n.addEventListener("click",YP),(e=document.getElementById("signOutBtn"))==null||e.addEventListener("click",QP),(t=document.getElementById("userMenuBtn"))==null||t.addEventListener("click",tk),(r=document.getElementById("myTreesBtn"))==null||r.addEventListener("click",Og),(i=document.getElementById("newTreeBtn"))==null||i.addEventListener("click",()=>{je==null||je.classList.add("hidden"),Ki()}),(s=document.getElementById("closeTreesModal"))==null||s.addEventListener("click",Wi),(o=document.getElementById("createTreeBtn"))==null||o.addEventListener("click",Ki),(c=document.getElementById("closeCreateTreeModal"))==null||c.addEventListener("click",Ar),(l=document.getElementById("cancelCreateTreeBtn"))==null||l.addEventListener("click",Ar),(u=document.getElementById("confirmCreateTreeBtn"))==null||u.addEventListener("click",rk),document.addEventListener("click",d=>{d.target.closest(".user-menu")||je==null||je.classList.add("hidden")}),gt==null||gt.addEventListener("click",d=>{d.target===gt&&Wi()}),_t==null||_t.addEventListener("click",d=>{d.target===_t&&Ar()})}async function YP(){cr();try{const n=await Gt.signInWithGoogle();n.success||(Tt(),alert("Sign in failed: "+n.error))}catch(n){Tt(),console.error("Sign in error:",n),alert("Sign in failed: "+n.message)}}async function QP(){je==null||je.classList.add("hidden"),cr(),nn.clearLocalData(),pn=null,await Gt.signOut()}async function XP(n){if(console.log("handleAuthStateChange called:",n?n.email:"signed out"),Tt(),n){console.log("User is signed in, showing dashboard"),JP(n);try{await ZP()}catch(e){console.error("Error in loadUserTrees:",e),Ki()}}else console.log("User is signed out, showing sign-in page"),Lg()}function Lg(){console.log("Showing sign-in page"),ji&&ji.classList.add("hidden"),Hi&&Hi.classList.remove("hidden"),Wi(),Ar(),pn&&(pn=null),Tt()}function JP(n){var e;console.log("Showing dashboard for:",n.displayName),Hi&&Hi.classList.add("hidden"),ji&&ji.classList.remove("hidden"),Dc&&(Dc.src=n.photoURL||"https://ui-avatars.com/api/?name="+encodeURIComponent(n.displayName||"User")),xc&&(xc.textContent=((e=n.displayName)==null?void 0:e.split(" ")[0])||"User"),Nc&&(Nc.textContent=n.email)}async function ZP(){cr();try{console.log("Loading user trees...");const n=new Promise((t,r)=>setTimeout(()=>r(new Error("Timeout loading trees")),1e4)),e=await Promise.race([nn.getFamilyTrees(),n]);console.log("Found trees:",e.length),Tt(),e.length===0?(console.log("No trees found, auto-creating default tree"),await ek()):e.length===1?(console.log("One tree found, loading:",e[0].name),await ta(e[0].id,e[0].name),na()):(console.log("Multiple trees found, showing selection"),Og())}catch(n){console.error("Error loading trees:",n),Tt(),sk(),Ki()}}async function ek(){cr();try{const n=Gt.getCurrentUser(),e=n!=null&&n.displayName?`${n.displayName}'s Family Tree`:"My Family Tree";console.log("Auto-creating tree:",e);const t=await nn.createFamilyTree(e);if(console.log("Tree created:",t),await ta(t,e),n){const r=(n.displayName||"User").split(" "),i=r[0]||"User",s=r.slice(1).join(" ")||"",o={firstName:i,lastName:s,name:n.displayName||"User",gender:"male",relationship:"Self",photoURL:n.photoURL||null,email:n.email||null,isAlive:!0,isCurrentUser:!0};await nn.addMember(o),console.log("Auto-created user tile for:",n.displayName)}na(),Tt()}catch(n){console.error("Error auto-creating tree:",n),Tt(),Ki()}}async function ta(n,e="My Family Tree"){cr(),console.log("Loading tree:",n);try{await nn.loadFamilyTree(n),Mc&&(Mc.textContent=e),pn?(console.log("Refreshing existing app"),pn.render(),pn.updateStatistics()):(console.log("Creating new FamilyTreeApp instance"),pn=new EE(nn),pn.initWithService()),na(),Wi(),Ar()}catch(t){console.error("Error loading tree:",t),alert("Failed to load family tree: "+t.message)}Tt()}function tk(){je==null||je.classList.toggle("hidden")}function Og(){je==null||je.classList.add("hidden"),nk(),gt&&(gt.classList.remove("hidden"),gt.classList.add("active"),document.body.style.overflow="hidden")}function Wi(){gt&&(gt.classList.remove("active"),gt.classList.add("hidden"),document.body.style.overflow="")}async function nk(){const n=document.getElementById("treesList");if(n){n.innerHTML='<div class="trees-loading">Loading...</div>';try{const e=await nn.getFamilyTrees();if(e.length===0){n.innerHTML=`
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
                    <span class="tree-item-meta">Created ${ik(t.createdAt)}</span>
                </div>
                <svg class="tree-item-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
            </div>
        `).join(""),n.querySelectorAll(".tree-item").forEach(t=>{t.addEventListener("click",()=>{const r=t.dataset.treeId,i=t.dataset.treeName;ta(r,i)})})}catch(e){console.error("Error populating trees list:",e),n.innerHTML=`
            <div class="trees-empty">
                <p>Error loading trees</p>
                <p class="text-muted">${e.message}</p>
            </div>
        `}}}function Ki(){Wi();const n=document.getElementById("treeName");n&&(n.value=""),_t&&(_t.classList.remove("hidden"),_t.classList.add("active"),document.body.style.overflow="hidden")}function Ar(){_t&&(_t.classList.remove("active"),_t.classList.add("hidden"),document.body.style.overflow="")}async function rk(){const n=document.getElementById("treeName"),e=(n==null?void 0:n.value.trim())||"My Family Tree";cr(),Ar();try{console.log("Creating tree:",e);const t=await nn.createFamilyTree(e);console.log("Tree created:",t),await ta(t,e),na(),console.log("Add Member button should now be enabled"),Tt()}catch(t){console.error("Error creating tree:",t),Tt(),alert("Failed to create family tree: "+t.message)}}function cr(){Gi&&Gi.classList.remove("hidden")}function Tt(){Gi&&Gi.classList.add("hidden")}function ik(n){return n?(n.toDate?n.toDate():new Date(n)).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"Unknown"}function sk(){const n=document.getElementById("addMemberBtn");n&&(n.disabled=!0,n.style.opacity="0.5",n.style.cursor="not-allowed",n.title="Please create a family tree first")}function na(){const n=document.getElementById("addMemberBtn");n&&(n.disabled=!1,n.style.opacity="1",n.style.cursor="pointer",n.title="Add a new family member")}
