(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const Jg="modulepreload",Qg=function(i){return"/monad/"+i},Bf={},Zg=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){let l=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");r=l(e.map(c=>{if(c=Qg(c),c in Bf)return;Bf[c]=!0;const u=c.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":Jg,u||(f.as="script"),f.crossOrigin="",f.href=c,o&&f.setAttribute("nonce",o),document.head.appendChild(f),u)return new Promise((d,g)=>{f.addEventListener("load",d),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})},$g={energy:0,intensity:0,bass:0,mid:0,treble:0,pulse:0,beat:0,musicDetected:!1};function jg(i){let t,e,n,r,s,a=!1,o,l,c,u=0,h=0,f=0,d=0,g=-1e3,y=1.2;function m(I){y=Math.min(2,Math.max(.7,Number(I)||1))}function p(){t||(t=new AudioContext({latencyHint:"interactive"}),e=t.createAnalyser(),e.fftSize=2048,e.smoothingTimeConstant=.5,c=new Uint8Array(e.frequencyBinCount))}function b(){u=0,h=0,f=0,d=0,g=-1e3}async function M(){await v(),p(),await t.resume?.(),n=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}}),r=t.createMediaStreamSource(n),r.connect(e),l="microphone"}async function v(){n?.getTracks().forEach(I=>I.stop()),n=void 0,r?.disconnect(),r=void 0,i?.pause(),a&&(s.disconnect(),a=!1),l=void 0,b()}async function S(I){if(!i)throw new Error("Audio player is unavailable.");if(I.type&&!I.type.startsWith("audio/"))throw new Error("Choose an audio file.");await v(),o&&URL.revokeObjectURL(o),o=URL.createObjectURL(I),i.src=o,i.load()}async function A(){if(!i?.src)throw new Error("Choose an audio file first.");l==="microphone"&&await v(),p(),s||(s=t.createMediaElementSource(i)),a||(s.connect(e),s.connect(t.destination),a=!0),i.ended&&(i.currentTime=0),await t.resume?.(),await i.play(),l="file"}function T(){i?.pause(),b()}async function x(){await v(),o&&URL.revokeObjectURL(o),t&&await t.close()}function E(I,N){if(!c)return 0;let U=0,L=0;for(let P=I;P<N;P+=1)U+=c[P]??0,L+=1;return L?U/L/255:0}function R(){if(!e||!c||!l||l==="file"&&i.paused)return $g;e.getByteFrequencyData(c);const I=E(2,10)*.7+E(10,22)*.3,N=E(12,86),U=E(86,c.length),L=Math.min(1,I*.42+N*.38+U*.28),P=Math.min(1,I*y),O=Math.min(1,N*y),G=Math.min(1,U*y),Z=Math.min(1,L*y),V=Math.min(1,Z*1.4),Y=performance.now(),Q=Math.max(0,I-h),at=Math.max(0,L-u),ot=I>.08&&(Q>.018/y||at>.028/y)&&I-f>.008/y&&Y-g>180,Ot=Math.min(1,Q*5*y),Ft=ot?1:Math.max(0,d-.1);return ot&&(g=Y),u=u*.9+L*.1,h=h*.88+I*.12,f=I,d=Ft,{energy:Z,intensity:V,bass:P,mid:O,treble:G,pulse:Ot,beat:Ft,musicDetected:L>.06||I>.09}}return{start:M,stop:v,loadFile:S,playFile:A,pauseFile:T,dispose:x,sample:R,setSensitivity:m}}const Lu="186",t0=0,kf=1,e0=2,_o=1,n0=2,Js=3,Ur=0,yn=1,si=2,Ti=0,na=1,Gf=2,Hf=3,zf=4,i0=5,fs=100,r0=101,s0=102,a0=103,o0=104,l0=200,c0=201,u0=202,f0=203,cp=204,up=205,h0=206,d0=207,p0=208,m0=209,g0=210,y0=211,x0=212,_0=213,v0=214,yc=0,xc=1,_c=2,la=3,vc=4,bc=5,wc=6,Ac=7,fp=0,b0=1,w0=2,ci=0,hp=1,dp=2,pp=3,Uu=4,mp=5,gp=6,yp=7,xp=300,Dr=301,As=302,xl=303,_l=304,Jo=306,Sc=1e3,Si=1001,Ec=1002,je=1003,A0=1004,Oa=1005,rn=1006,vl=1007,wr=1008,En=1009,_p=1010,vp=1011,ca=1012,Du=1013,hi=1014,Kn=1015,di=1016,Fu=1017,Ou=1018,ua=1020,bp=35902,wp=35899,Ap=1021,Sp=1022,Yn=1023,Ni=1026,Ar=1027,Bu=1028,ku=1029,Fr=1030,Gu=1031,Hu=1033,vo=33776,bo=33777,wo=33778,Ao=33779,Mc=35840,Tc=35841,Cc=35842,Rc=35843,Pc=36196,Ic=37492,Nc=37496,Lc=37488,Uc=37489,Io=37490,Dc=37491,Fc=37808,Oc=37809,Bc=37810,kc=37811,Gc=37812,Hc=37813,zc=37814,Vc=37815,Wc=37816,Xc=37817,qc=37818,Kc=37819,Yc=37820,Jc=37821,Qc=36492,Zc=36494,$c=36495,jc=36283,tu=36284,No=36285,eu=36286,S0=3200,nu=0,E0=1,nr="",Sn="srgb",Lo="srgb-linear",Uo="linear",pe="srgb",bl=7680,M0=519,T0=512,C0=513,R0=514,zu=515,P0=516,I0=517,Vu=518,N0=519,L0=35044,wl=35048,Vf="300 es",li=2e3,fa=2001;function U0(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Do(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function D0(){const i=Do("canvas");return i.style.display="block",i}const Wf={};function Xf(...i){const t="THREE."+i.shift();console.log(t,...i)}function Ep(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function kt(...i){i=Ep(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function ce(...i){i=Ep(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ys(...i){const t=i.join(" ");t in Wf||(Wf[t]=!0,kt(...i))}function F0(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const O0={[yc]:xc,[_c]:wc,[vc]:Ac,[la]:bc,[xc]:yc,[wc]:_c,[Ac]:vc,[bc]:la};class Hr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Al=Math.PI/180,iu=180/Math.PI;function wa(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function ie(i,t,e){return Math.max(t,Math.min(e,i))}function B0(i,t){return(i%t+t)%t}function Sl(i,t,e){return(1-e)*i+e*t}function Os(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function pn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Af=class Af{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Af.prototype.isVector2=!0;let Zt=Af;class Ls{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3],f=s[a+0],d=s[a+1],g=s[a+2],y=s[a+3];if(h!==y||l!==f||c!==d||u!==g){let m=l*f+c*d+u*g+h*y;m<0&&(f=-f,d=-d,g=-g,y=-y,m=-m);let p=1-o;if(m<.9995){const b=Math.acos(m),M=Math.sin(b);p=Math.sin(p*b)/M,o=Math.sin(o*b)/M,l=l*p+f*o,c=c*p+d*o,u=u*p+g*o,h=h*p+y*o}else{l=l*p+f*o,c=c*p+d*o,u=u*p+g*o,h=h*p+y*o;const b=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=b,c*=b,u*=b,h*=b}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],f=s[a+1],d=s[a+2],g=s[a+3];return t[e]=o*g+u*h+l*d-c*f,t[e+1]=l*g+u*f+c*h-o*d,t[e+2]=c*g+u*d+o*f-l*h,t[e+3]=u*g-o*h-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),f=l(n/2),d=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:kt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(a-r)*d}else if(n>o&&n>h){const d=2*Math.sqrt(1+n-o-h);this._w=(u-l)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+c)/d}else if(o>h){const d=2*Math.sqrt(1+o-n-h);this._w=(s-c)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-o);this._w=(a-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ie(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,r=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+n*e,this._y=this._y*l+r*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+r*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Sf=class Sf{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),u=2*(o*e-s*r),h=2*(s*n-a*e);return this.x=e+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this.z=ie(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this.z=ie(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return El.copy(this).projectOnVector(t),this.sub(El)}reflect(t){return this.sub(El.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ie(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Sf.prototype.isVector3=!0;let z=Sf;const El=new z,qf=new Ls,Ef=class Ef{constructor(t,e,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],y=r[0],m=r[3],p=r[6],b=r[1],M=r[4],v=r[7],S=r[2],A=r[5],T=r[8];return s[0]=a*y+o*b+l*S,s[3]=a*m+o*M+l*A,s[6]=a*p+o*v+l*T,s[1]=c*y+u*b+h*S,s[4]=c*m+u*M+h*A,s[7]=c*p+u*v+h*T,s[2]=f*y+d*b+g*S,s[5]=f*m+d*M+g*A,s[8]=f*p+d*v+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=u*a-o*c,f=o*l-u*s,d=c*s-a*l,g=e*h+n*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return t[0]=h*y,t[1]=(r*c-u*n)*y,t[2]=(o*n-r*a)*y,t[3]=f*y,t[4]=(u*e-r*l)*y,t[5]=(r*s-o*e)*y,t[6]=d*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*s)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return ys("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ml.makeScale(t,e)),this}rotate(t){return ys("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ml.makeRotation(-t)),this}translate(t,e){return ys("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ml.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ef.prototype.isMatrix3=!0;let Gt=Ef;const Ml=new Gt,Kf=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yf=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function k0(){const i={enabled:!0,workingColorSpace:Lo,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===pe&&(r.r=Ci(r.r),r.g=Ci(r.g),r.b=Ci(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pe&&(r.r=xs(r.r),r.g=xs(r.g),r.b=xs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===nr?Uo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ys("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ys("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Lo]:{primaries:t,whitePoint:n,transfer:Uo,toXYZ:Kf,fromXYZ:Yf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:t,whitePoint:n,transfer:pe,toXYZ:Kf,fromXYZ:Yf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),i}const ne=k0();function Ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function xs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Yr;class G0{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Yr===void 0&&(Yr=Do("canvas")),Yr.width=t.width,Yr.height=t.height;const r=Yr.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=Yr}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Do("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ci(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ci(e[n]/255)*255):e[n]=Ci(e[n]);return{data:e,width:t.width,height:t.height}}else return kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let H0=0;class Wu{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=wa(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Tl(r[a].image)):s.push(Tl(r[a]))}else s=Tl(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Tl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?G0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(kt("Texture: Unable to serialize Texture."),{})}let z0=0;const Cl=new z;class dn extends Hr{constructor(t=dn.DEFAULT_IMAGE,e=dn.DEFAULT_MAPPING,n=Si,r=Si,s=rn,a=wr,o=Yn,l=En,c=dn.DEFAULT_ANISOTROPY,u=nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=wa(),this.name="",this.source=new Wu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Cl).x}get height(){return this.source.getSize(Cl).y}get depth(){return this.source.getSize(Cl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){kt(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sc:t.x=t.x-Math.floor(t.x);break;case Si:t.x=t.x<0?0:1;break;case Ec:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sc:t.y=t.y-Math.floor(t.y);break;case Si:t.y=t.y<0?0:1;break;case Ec:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=xp;dn.DEFAULT_ANISOTROPY=1;const Mf=class Mf{constructor(t=0,e=0,n=0,r=1){this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,v=(d+1)/2,S=(p+1)/2,A=(u+f)/4,T=(h+y)/4,x=(g+m)/4;return M>v&&M>S?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=A/n,s=T/n):v>S?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=A/r,s=x/r):S<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(S),n=T/s,r=x/s),this.set(n,r,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-y)/b,this.z=(f-u)/b,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ie(this.x,t.x,e.x),this.y=ie(this.y,t.y,e.y),this.z=ie(this.z,t.z,e.z),this.w=ie(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ie(this.x,t,e),this.y=ie(this.y,t,e),this.z=ie(this.z,t,e),this.w=ie(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ie(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Mf.prototype.isVector4=!0;let Pe=Mf;class V0 extends Hr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:rn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Pe(0,0,t,e),this.scissorTest=!1,this.viewport=new Pe(0,0,t,e),this.textures=[];const r={width:t,height:e,depth:n.depth},s=new dn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:rn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new Wu(r)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends V0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Mp extends dn{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=je,this.minFilter=je,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class W0 extends dn{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=je,this.minFilter=je,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Yo=class Yo{constructor(t,e,n,r,s,a,o,l,c,u,h,f,d,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,u,h,f,d,g,y,m)}set(t,e,n,r,s,a,o,l,c,u,h,f,d,g,y,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Yo().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,r=1/Jr.setFromMatrixColumn(t,0).length(),s=1/Jr.setFromMatrixColumn(t,1).length(),a=1/Jr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=a*u,d=a*h,g=o*u,y=o*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=d+g*c,e[5]=f-y*c,e[9]=-o*l,e[2]=y-f*c,e[6]=g+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*u,d=l*h,g=c*u,y=c*h;e[0]=f+y*o,e[4]=g*o-d,e[8]=a*c,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=d*o-g,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*u,d=l*h,g=c*u,y=c*h;e[0]=f-y*o,e[4]=-a*h,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*u,e[9]=y-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*u,d=a*h,g=o*u,y=o*h;e[0]=l*u,e[4]=g*c-d,e[8]=f*c+y,e[1]=l*h,e[5]=y*c+f,e[9]=d*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,g=o*l,y=o*c;e[0]=l*u,e[4]=y-f*h,e[8]=g*h+d,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=d*h+g,e[10]=f-y*h}else if(t.order==="XZY"){const f=a*l,d=a*c,g=o*l,y=o*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+y,e[5]=a*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=o*u,e[10]=y*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(X0,t,q0)}lookAt(t,e,n){const r=this.elements;return vn.subVectors(t,e),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),zi.crossVectors(n,vn),zi.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),zi.crossVectors(n,vn)),zi.normalize(),Ba.crossVectors(vn,zi),r[0]=zi.x,r[4]=Ba.x,r[8]=vn.x,r[1]=zi.y,r[5]=Ba.y,r[9]=vn.y,r[2]=zi.z,r[6]=Ba.z,r[10]=vn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],y=n[6],m=n[10],p=n[14],b=n[3],M=n[7],v=n[11],S=n[15],A=r[0],T=r[4],x=r[8],E=r[12],R=r[1],I=r[5],N=r[9],U=r[13],L=r[2],P=r[6],O=r[10],G=r[14],Z=r[3],V=r[7],Y=r[11],Q=r[15];return s[0]=a*A+o*R+l*L+c*Z,s[4]=a*T+o*I+l*P+c*V,s[8]=a*x+o*N+l*O+c*Y,s[12]=a*E+o*U+l*G+c*Q,s[1]=u*A+h*R+f*L+d*Z,s[5]=u*T+h*I+f*P+d*V,s[9]=u*x+h*N+f*O+d*Y,s[13]=u*E+h*U+f*G+d*Q,s[2]=g*A+y*R+m*L+p*Z,s[6]=g*T+y*I+m*P+p*V,s[10]=g*x+y*N+m*O+p*Y,s[14]=g*E+y*U+m*G+p*Q,s[3]=b*A+M*R+v*L+S*Z,s[7]=b*T+M*I+v*P+S*V,s[11]=b*x+M*N+v*O+S*Y,s[15]=b*E+M*U+v*G+S*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],y=t[7],m=t[11],p=t[15],b=l*d-c*f,M=o*d-c*h,v=o*f-l*h,S=a*d-c*u,A=a*f-l*u,T=a*h-o*u;return e*(y*b-m*M+p*v)-n*(g*b-m*S+p*A)+r*(g*M-y*S+p*T)-s*(g*v-y*A+m*T)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-n*(s*u-o*l)+r*(s*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],y=t[13],m=t[14],p=t[15],b=e*o-n*a,M=e*l-r*a,v=e*c-s*a,S=n*l-r*o,A=n*c-s*o,T=r*c-s*l,x=u*y-h*g,E=u*m-f*g,R=u*p-d*g,I=h*m-f*y,N=h*p-d*y,U=f*p-d*m,L=b*U-M*N+v*I+S*R-A*E+T*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return t[0]=(o*U-l*N+c*I)*P,t[1]=(r*N-n*U-s*I)*P,t[2]=(y*T-m*A+p*S)*P,t[3]=(f*A-h*T-d*S)*P,t[4]=(l*R-a*U-c*E)*P,t[5]=(e*U-r*R+s*E)*P,t[6]=(m*v-g*T-p*M)*P,t[7]=(u*T-f*v+d*M)*P,t[8]=(a*N-o*R+c*x)*P,t[9]=(n*R-e*N-s*x)*P,t[10]=(g*A-y*v+p*b)*P,t[11]=(h*v-u*A-d*b)*P,t[12]=(o*E-a*I-l*x)*P,t[13]=(e*I-n*E+r*x)*P,t[14]=(y*M-g*S-m*b)*P,t[15]=(u*S-h*M+f*b)*P,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,h=o+o,f=s*c,d=s*u,g=s*h,y=a*u,m=a*h,p=o*h,b=l*c,M=l*u,v=l*h,S=n.x,A=n.y,T=n.z;return r[0]=(1-(y+p))*S,r[1]=(d+v)*S,r[2]=(g-M)*S,r[3]=0,r[4]=(d-v)*A,r[5]=(1-(f+p))*A,r[6]=(m+b)*A,r[7]=0,r[8]=(g+M)*T,r[9]=(m-b)*T,r[10]=(1-(f+y))*T,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let a=Jr.set(r[0],r[1],r[2]).length();const o=Jr.set(r[4],r[5],r[6]).length(),l=Jr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),On.copy(this);const c=1/a,u=1/o,h=1/l;return On.elements[0]*=c,On.elements[1]*=c,On.elements[2]*=c,On.elements[4]*=u,On.elements[5]*=u,On.elements[6]*=u,On.elements[8]*=h,On.elements[9]*=h,On.elements[10]*=h,e.setFromRotationMatrix(On),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,r,s,a,o=li,l=!1){const c=this.elements,u=2*s/(e-t),h=2*s/(n-r),f=(e+t)/(e-t),d=(n+r)/(n-r);let g,y;if(l)g=s/(a-s),y=a*s/(a-s);else if(o===li)g=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===fa)g=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=li,l=!1){const c=this.elements,u=2/(e-t),h=2/(n-r),f=-(e+t)/(e-t),d=-(n+r)/(n-r);let g,y;if(l)g=1/(a-s),y=a/(a-s);else if(o===li)g=-2/(a-s),y=-(a+s)/(a-s);else if(o===fa)g=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Yo.prototype.isMatrix4=!0;let Se=Yo;const Jr=new z,On=new Se,X0=new z(0,0,0),q0=new z(1,1,1),zi=new z,Ba=new z,vn=new z,Jf=new Se,Qf=new Ls;class sr{constructor(t=0,e=0,n=0,r=sr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ie(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ie(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ie(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ie(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Jf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Jf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qf.setFromEuler(this),this.setFromQuaternion(Qf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sr.DEFAULT_ORDER="XYZ";class Tp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let K0=0;const Zf=new z,Qr=new Ls,pi=new Se,ka=new z,Bs=new z,Y0=new z,J0=new Ls,$f=new z(1,0,0),jf=new z(0,1,0),th=new z(0,0,1),eh={type:"added"},Q0={type:"removed"},Zr={type:"childadded",child:null},Rl={type:"childremoved",child:null};class Ze extends Hr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=wa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ze.DEFAULT_UP.clone();const t=new z,e=new sr,n=new Ls,r=new z(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Se},normalMatrix:{value:new Gt}}),this.matrix=new Se,this.matrixWorld=new Se,this.matrixAutoUpdate=Ze.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qr.setFromAxisAngle(t,e),this.quaternion.multiply(Qr),this}rotateOnWorldAxis(t,e){return Qr.setFromAxisAngle(t,e),this.quaternion.premultiply(Qr),this}rotateX(t){return this.rotateOnAxis($f,t)}rotateY(t){return this.rotateOnAxis(jf,t)}rotateZ(t){return this.rotateOnAxis(th,t)}translateOnAxis(t,e){return Zf.copy(t).applyQuaternion(this.quaternion),this.position.add(Zf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis($f,t)}translateY(t){return this.translateOnAxis(jf,t)}translateZ(t){return this.translateOnAxis(th,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ka.copy(t):ka.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Bs,ka,this.up):pi.lookAt(ka,Bs,this.up),this.quaternion.setFromRotationMatrix(pi),r&&(pi.extractRotation(r.matrixWorld),Qr.setFromRotationMatrix(pi),this.quaternion.premultiply(Qr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ce("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(eh),Zr.child=t,this.dispatchEvent(Zr),Zr.child=null):ce("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Q0),Rl.child=t,this.dispatchEvent(Rl),Rl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(eh),Zr.child=t,this.dispatchEvent(Zr),Zr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,t,Y0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,J0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,r=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*r,s[13]+=n-s[1]*e-s[5]*n-s[9]*r,s[14]+=r-s[2]*e-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ze.DEFAULT_UP=new z(0,1,0);Ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Qs extends Ze{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Z0={type:"move"};class Pl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const y of t.hand.values()){const m=e.getJointPose(y,n),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Z0)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Qs;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Cp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Ga={h:0,s:0,l:0};function Il(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=ne.workingColorSpace){if(t=B0(t,1),e=ie(e,0,1),n=ie(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Il(a,s,t+1/3),this.g=Il(a,s,t),this.b=Il(a,s,t-1/3)}return ne.colorSpaceToWorking(this,r),this}setStyle(t,e=Sn){function n(s){s!==void 0&&parseFloat(s)<1&&kt("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:kt("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Sn){const n=Cp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}copyLinearToSRGB(t){return this.r=xs(t.r),this.g=xs(t.g),this.b=xs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Sn){return ne.workingToColorSpace(nn.copy(this),t),Math.round(ie(nn.r*255,0,255))*65536+Math.round(ie(nn.g*255,0,255))*256+Math.round(ie(nn.b*255,0,255))}getHexString(t=Sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.workingToColorSpace(nn.copy(this),e);const n=nn.r,r=nn.g,s=nn.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ne.workingColorSpace){return ne.workingToColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=Sn){ne.workingToColorSpace(nn.copy(this),t);const e=nn.r,n=nn.g,r=nn.b;return t!==Sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Vi),this.setHSL(Vi.h+t,Vi.s+e,Vi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vi),t.getHSL(Ga);const n=Sl(Vi.h,Ga.h,e),r=Sl(Vi.s,Ga.s,e),s=Sl(Vi.l,Ga.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new Yt;Yt.NAMES=Cp;class Xu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Yt(t),this.density=e}clone(){return new Xu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class $0 extends Ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sr,this.environmentIntensity=1,this.environmentRotation=new sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Bn=new z,mi=new z,Nl=new z,gi=new z,$r=new z,jr=new z,nh=new z,Ll=new z,Ul=new z,Dl=new z,Fl=new Pe,Ol=new Pe,Bl=new Pe;class Xn{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Bn.subVectors(t,e),r.cross(Bn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Bn.subVectors(r,e),mi.subVectors(n,e),Nl.subVectors(t,e);const a=Bn.dot(Bn),o=Bn.dot(mi),l=Bn.dot(Nl),c=mi.dot(mi),u=mi.dot(Nl),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-o*u)*f,g=(a*u-o*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,gi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,gi.x),l.addScaledVector(a,gi.y),l.addScaledVector(o,gi.z),l)}static getInterpolatedAttribute(t,e,n,r,s,a){return Fl.setScalar(0),Ol.setScalar(0),Bl.setScalar(0),Fl.fromBufferAttribute(t,e),Ol.fromBufferAttribute(t,n),Bl.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(Fl,s.x),a.addScaledVector(Ol,s.y),a.addScaledVector(Bl,s.z),a}static isFrontFacing(t,e,n,r){return Bn.subVectors(n,e),mi.subVectors(t,e),Bn.cross(mi).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Bn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Bn.cross(mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Xn.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;$r.subVectors(r,n),jr.subVectors(s,n),Ll.subVectors(t,n);const l=$r.dot(Ll),c=jr.dot(Ll);if(l<=0&&c<=0)return e.copy(n);Ul.subVectors(t,r);const u=$r.dot(Ul),h=jr.dot(Ul);if(u>=0&&h<=u)return e.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector($r,a);Dl.subVectors(t,s);const d=$r.dot(Dl),g=jr.dot(Dl);if(g>=0&&d<=g)return e.copy(s);const y=d*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(jr,o);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return nh.subVectors(s,r),o=(h-u)/(h-u+(d-g)),e.copy(r).addScaledVector(nh,o);const p=1/(m+y+f);return a=y*p,o=f*p,e.copy(n).addScaledVector($r,a).addScaledVector(jr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class zr{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,kn):kn.fromBufferAttribute(s,a),kn.applyMatrix4(t.matrixWorld),this.expandByPoint(kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ha.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ha.copy(n.boundingBox)),Ha.applyMatrix4(t.matrixWorld),this.union(Ha)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,kn),kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ks),za.subVectors(this.max,ks),ts.subVectors(t.a,ks),es.subVectors(t.b,ks),ns.subVectors(t.c,ks),Wi.subVectors(es,ts),Xi.subVectors(ns,es),cr.subVectors(ts,ns);let e=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-cr.z,cr.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,cr.z,0,-cr.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-cr.y,cr.x,0];return!kl(e,ts,es,ns,za)||(e=[1,0,0,0,1,0,0,0,1],!kl(e,ts,es,ns,za))?!1:(Va.crossVectors(Wi,Xi),e=[Va.x,Va.y,Va.z],kl(e,ts,es,ns,za))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const yi=[new z,new z,new z,new z,new z,new z,new z,new z],kn=new z,Ha=new zr,ts=new z,es=new z,ns=new z,Wi=new z,Xi=new z,cr=new z,ks=new z,za=new z,Va=new z,ur=new z;function kl(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ur.fromArray(i,s);const o=r.x*Math.abs(ur.x)+r.y*Math.abs(ur.y)+r.z*Math.abs(ur.z),l=t.dot(ur),c=e.dot(ur),u=n.dot(ur);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const ke=new z,Wa=new Zt;let j0=0;class ui extends Hr{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:j0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=L0,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Wa.fromBufferAttribute(this,e),Wa.applyMatrix3(t),this.setXY(e,Wa.x,Wa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix3(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Os(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Os(e,this.array)),e}setX(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Os(e,this.array)),e}setY(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Os(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Os(e,this.array)),e}setW(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),r=pn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),r=pn(r,this.array),s=pn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Rp extends ui{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Pp extends ui{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class $e extends ui{constructor(t,e,n){super(new Float32Array(t),e,n)}}const ty=new zr,Gs=new z,Gl=new z;class Aa{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ty.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gs.subVectors(t,this.center);const e=Gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Gs,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gs.copy(t.center).add(Gl)),this.expandByPoint(Gs.copy(t.center).sub(Gl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let ey=0;const Cn=new Se,Hl=new Ze,is=new z,bn=new zr,Hs=new zr,qe=new z;class Dn extends Hr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ey++}),this.uuid=wa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(U0(t)?Pp:Rp)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Gt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Cn.makeRotationFromQuaternion(t),this.applyMatrix4(Cn),this}rotateX(t){return Cn.makeRotationX(t),this.applyMatrix4(Cn),this}rotateY(t){return Cn.makeRotationY(t),this.applyMatrix4(Cn),this}rotateZ(t){return Cn.makeRotationZ(t),this.applyMatrix4(Cn),this}translate(t,e,n){return Cn.makeTranslation(t,e,n),this.applyMatrix4(Cn),this}scale(t,e,n){return Cn.makeScale(t,e,n),this.applyMatrix4(Cn),this}lookAt(t){return Hl.lookAt(t),Hl.updateMatrix(),this.applyMatrix4(Hl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $e(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];bn.setFromBufferAttribute(s),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Aa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(bn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];Hs.setFromBufferAttribute(o),this.morphTargetsRelative?(qe.addVectors(bn.min,Hs.min),bn.expandByPoint(qe),qe.addVectors(bn.max,Hs.max),bn.expandByPoint(qe)):(bn.expandByPoint(Hs.min),bn.expandByPoint(Hs.max))}bn.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)qe.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(qe));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)qe.fromBufferAttribute(o,c),l&&(is.fromBufferAttribute(t,c),qe.add(is)),r=Math.max(r,n.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ui(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new z,l[x]=new z;const c=new z,u=new z,h=new z,f=new Zt,d=new Zt,g=new Zt,y=new z,m=new z;function p(x,E,R){c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,R),f.fromBufferAttribute(s,x),d.fromBufferAttribute(s,E),g.fromBufferAttribute(s,R),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(I),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(I),o[x].add(y),o[E].add(y),o[R].add(y),l[x].add(m),l[E].add(m),l[R].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let x=0,E=b.length;x<E;++x){const R=b[x],I=R.start,N=R.count;for(let U=I,L=I+N;U<L;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const M=new z,v=new z,S=new z,A=new z;function T(x){S.fromBufferAttribute(r,x),A.copy(S);const E=o[x];M.copy(E),M.sub(S.multiplyScalar(S.dot(E))).normalize(),v.crossVectors(A,E);const I=v.dot(l[x])<0?-1:1;a.setXYZW(x,M.x,M.y,M.z,I)}for(let x=0,E=b.length;x<E;++x){const R=b[x],I=R.start,N=R.count;for(let U=I,L=I+N;U<L;U+=3)T(t.getX(U+0)),T(t.getX(U+1)),T(t.getX(U+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new ui(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new z,s=new z,a=new z,o=new z,l=new z,c=new z,u=new z,h=new z;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new ui(f,u,h)}if(this.index===null)return kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Dn,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zl=new z,ny=new z,iy=new Gt;class tr{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=zl.subVectors(n,e).cross(ny.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const r=t.delta(zl),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(r,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||iy.getNormalMatrix(t),r=this.coplanarPoint(zl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let ry=0;class Sa extends Hr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ry++}),this.uuid=wa(),this.name="",this.type="Material",this.blending=na,this.side=Ur,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cp,this.blendDst=up,this.blendEquation=fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Yt(0,0,0),this.blendAlpha=0,this.depthFunc=la,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=M0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bl,this.stencilZFail=bl,this.stencilZPass=bl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){kt(`Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Yt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new tr().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Zt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Zt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const xi=new z,Vl=new z,Xa=new z,qa=new z;class sy{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xi.copy(this.origin).addScaledVector(this.direction,e),xi.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Vl.copy(t).add(e).multiplyScalar(.5),Xa.copy(e).sub(t).normalize(),qa.copy(this.origin).sub(Vl);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Xa),o=qa.dot(this.direction),l=-qa.dot(Xa),c=qa.lengthSq(),u=Math.abs(1-a*a);let h,f,d,g;if(u>0)if(h=a*l-o,f=a*o-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const y=1/u;h*=y,f*=y,d=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Vl).addScaledVector(Xa,f),d}intersectSphere(t,e){if(t.radius<0)return null;xi.subVectors(t.center,this.origin);const n=xi.dot(this.direction),r=xi.dot(xi)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,r=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,r=(t.min.x-f.x)*c),u>=0?(s=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,xi)!==null}intersectTriangle(t,e,n,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,h=t.x-a.x,f=t.y-a.y,d=t.z-a.z,g=e.x-a.x,y=e.y-a.y,m=e.z-a.z,p=n.x-a.x,b=n.y-a.y,M=n.z-a.z,v=Math.abs(l),S=Math.abs(c),A=Math.abs(u);let T,x,E,R,I,N,U,L,P,O,G,Z;if(v>=S&&v>=A?(E=l,N=h,P=g,Z=p,l>=0?(T=c,x=u,R=f,I=d,U=y,L=m,O=b,G=M):(T=u,x=c,R=d,I=f,U=m,L=y,O=M,G=b)):S>=A?(E=c,N=f,P=y,Z=b,c>=0?(T=u,x=l,R=d,I=h,U=m,L=g,O=M,G=p):(T=l,x=u,R=h,I=d,U=g,L=m,O=p,G=M)):(E=u,N=d,P=m,Z=M,u>=0?(T=l,x=c,R=h,I=f,U=g,L=y,O=p,G=b):(T=c,x=l,R=f,I=h,U=y,L=g,O=b,G=p)),E===0)return null;const V=T/E,Y=x/E,Q=1/E,at=R-V*N,ot=I-Y*N,Ot=U-V*P,Ft=L-Y*P,Wt=O-V*Z,J=G-Y*Z,tt=Wt*Ft-J*Ot,mt=at*J-ot*Wt,Nt=Ot*ot-Ft*at;if(r){if(tt<0||mt<0||Nt<0)return null}else if((tt<0||mt<0||Nt<0)&&(tt>0||mt>0||Nt>0))return null;const _t=tt+mt+Nt;if(_t===0)return null;const Lt=Q*(tt*N+mt*P+Nt*Z);return(_t>0?Lt<0:Lt>0)?null:this.at(Lt/_t,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ha extends Sa{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sr,this.combine=fp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ih=new Se,fr=new sy,Ka=new Aa,rh=new z,Ya=new z,Ja=new z,Qa=new z,Wl=new z,Za=new z,sh=new z,$a=new z;class Ln extends Ze{constructor(t=new Dn,e=new ha){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Za.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Wl.fromBufferAttribute(h,t),a?Za.addScaledVector(Wl,u):Za.addScaledVector(Wl.sub(e),u))}e.add(Za)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ka.copy(n.boundingSphere),Ka.applyMatrix4(s),fr.copy(t.ray).recast(t.near),!(Ka.containsPoint(fr.origin)===!1&&(fr.intersectSphere(Ka,rh)===null||fr.origin.distanceToSquared(rh)>(t.far-t.near)**2))&&(ih.copy(s).invert(),fr.copy(t.ray).applyMatrix4(ih),!(n.boundingBox!==null&&fr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fr)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,S=M;v<S;v+=3){const A=o.getX(v),T=o.getX(v+1),x=o.getX(v+2);r=ja(this,p,t,n,c,u,h,A,T,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){const b=o.getX(m),M=o.getX(m+1),v=o.getX(m+2);r=ja(this,a,t,n,c,u,h,b,M,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,S=M;v<S;v+=3){const A=v,T=v+1,x=v+2;r=ja(this,p,t,n,c,u,h,A,T,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){const b=m,M=m+1,v=m+2;r=ja(this,a,t,n,c,u,h,b,M,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function ay(i,t,e,n,r,s,a,o){let l;if(t.side===yn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===Ur,o),l===null)return null;$a.copy(o),$a.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo($a);return c<e.near||c>e.far?null:{distance:c,point:$a.clone(),object:i}}function ja(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,Ya),i.getVertexPosition(l,Ja),i.getVertexPosition(c,Qa);const u=ay(i,t,e,n,Ya,Ja,Qa,sh);if(u){const h=new z;Xn.getBarycoord(sh,Ya,Ja,Qa,h),r&&(u.uv=Xn.getInterpolatedAttribute(r,o,l,c,h,new Zt)),s&&(u.uv1=Xn.getInterpolatedAttribute(s,o,l,c,h,new Zt)),a&&(u.normal=Xn.getInterpolatedAttribute(a,o,l,c,h,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new z,materialIndex:0};Xn.getNormal(Ya,Ja,Qa,f.normal),u.face=f,u.barycoord=h}return u}class Ip extends dn{constructor(t=null,e=1,n=1,r,s,a,o,l,c=je,u=je,h,f){super(null,a,o,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ru extends ui{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const rs=new Se,ah=new Se,to=[],oh=new zr,oy=new Se,zs=new Ln,Vs=new Aa;class ir extends Ln{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ru(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,oy)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new zr),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,rs),oh.copy(t.boundingBox).applyMatrix4(rs),this.boundingBox.union(oh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Aa),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,rs),Vs.copy(t.boundingSphere).applyMatrix4(rs),this.boundingSphere.union(Vs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(zs.geometry=this.geometry,zs.material=this.material,zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vs.copy(this.boundingSphere),Vs.applyMatrix4(n),t.ray.intersectsSphere(Vs)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,rs),ah.multiplyMatrices(n,rs),zs.matrixWorld=ah,zs.raycast(t,to);for(let a=0,o=to.length;a<o;a++){const l=to[a];l.instanceId=s,l.object=this,e.push(l)}to.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new ru(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ip(new Float32Array(r*this.count),r,this.count,Bu,Kn));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*t;return s[l]=o,s.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const hr=new Aa,ly=new Zt(.5,.5),eo=new z;class qu{constructor(t=new tr,e=new tr,n=new tr,r=new tr,s=new tr,a=new tr){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=li,n=!1){const r=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],f=s[6],d=s[7],g=s[8],y=s[9],m=s[10],p=s[11],b=s[12],M=s[13],v=s[14],S=s[15];if(r[0].setComponents(c-a,d-u,p-g,S-b).normalize(),r[1].setComponents(c+a,d+u,p+g,S+b).normalize(),r[2].setComponents(c+o,d+h,p+y,S+M).normalize(),r[3].setComponents(c-o,d-h,p-y,S-M).normalize(),n)r[4].setComponents(l,f,m,v).normalize(),r[5].setComponents(c-l,d-f,p-m,S-v).normalize();else if(r[4].setComponents(c-l,d-f,p-m,S-v).normalize(),e===li)r[5].setComponents(c+l,d+f,p+m,S+v).normalize();else if(e===fa)r[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hr)}intersectsSprite(t){hr.center.set(0,0,0);const e=ly.distanceTo(t.center);return hr.radius=.7071067811865476+e,hr.applyMatrix4(t.matrixWorld),this.intersectsSphere(hr)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(eo.x=r.normal.x>0?t.max.x:t.min.x,eo.y=r.normal.y>0?t.max.y:t.min.y,eo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(eo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Np extends dn{constructor(t=[],e=Dr,n,r,s,a,o,l,c,u){super(t,e,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class da extends dn{constructor(t,e,n=hi,r,s,a,o=je,l=je,c,u=Ni,h=1){if(u!==Ni&&u!==Ar)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Wu(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class cy extends da{constructor(t,e=hi,n=Dr,r,s,a=je,o=je,l,c=Ni){const u={width:t,height:t,depth:1},h=[u,u,u,u,u,u];super(t,t,e,n,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Lp extends dn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Vr extends Dn{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,r,a,2),g("x","z","y",1,-1,t,n,-e,r,a,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(u,3)),this.setAttribute("uv",new $e(h,2));function g(y,m,p,b,M,v,S,A,T,x,E){const R=v/T,I=S/x,N=v/2,U=S/2,L=A/2,P=T+1,O=x+1;let G=0,Z=0;const V=new z;for(let Y=0;Y<O;Y++){const Q=Y*I-U;for(let at=0;at<P;at++){const ot=at*R-N;V[y]=ot*b,V[m]=Q*M,V[p]=L,c.push(V.x,V.y,V.z),V[y]=0,V[m]=0,V[p]=A>0?1:-1,u.push(V.x,V.y,V.z),h.push(at/T),h.push(1-Y/x),G+=1}}for(let Y=0;Y<x;Y++)for(let Q=0;Q<T;Q++){const at=f+Q+P*Y,ot=f+Q+P*(Y+1),Ot=f+(Q+1)+P*(Y+1),Ft=f+(Q+1)+P*Y;l.push(at,ot,Ft),l.push(ot,Ot,Ft),Z+=6}o.addGroup(d,Z,E),d+=Z,f+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Li extends Dn{constructor(t=1,e=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const y=[],m=n/2;let p=0;b(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new $e(h,3)),this.setAttribute("normal",new $e(f,3)),this.setAttribute("uv",new $e(d,2));function b(){const v=new z,S=new z;let A=0;const T=(e-t)/n;for(let x=0;x<=s;x++){const E=[],R=x/s,I=R*(e-t)+t;for(let N=0;N<=r;N++){const U=N/r,L=U*l+o,P=Math.sin(L),O=Math.cos(L);S.x=I*P,S.y=-R*n+m,S.z=I*O,h.push(S.x,S.y,S.z),v.set(P,T,O).normalize(),f.push(v.x,v.y,v.z),d.push(U,1-R),E.push(g++)}y.push(E)}for(let x=0;x<r;x++)for(let E=0;E<s;E++){const R=y[E][x],I=y[E+1][x],N=y[E+1][x+1],U=y[E][x+1];(t>0||E!==0)&&(u.push(R,I,U),A+=3),(e>0||E!==s-1)&&(u.push(I,N,U),A+=3)}c.addGroup(p,A,0),p+=A}function M(v){const S=g,A=new Zt,T=new z;let x=0;const E=v===!0?t:e,R=v===!0?1:-1;for(let N=1;N<=r;N++)h.push(0,m*R,0),f.push(0,R,0),d.push(.5,.5),g++;const I=g;for(let N=0;N<=r;N++){const L=N/r*l+o,P=Math.cos(L),O=Math.sin(L);T.x=E*O,T.y=m*R,T.z=E*P,h.push(T.x,T.y,T.z),f.push(0,R,0),A.x=P*.5+.5,A.y=O*.5*R+.5,d.push(A.x,A.y),g++}for(let N=0;N<r;N++){const U=S+N,L=I+N;v===!0?u.push(L,L+1,U):u.push(L+1,L,U),x+=3}c.addGroup(p,x,v===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ku extends Li{constructor(t=1,e=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ku(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qo extends Dn{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};const s=[],a=[];o(r),c(n),u(),this.setAttribute("position",new $e(s,3)),this.setAttribute("normal",new $e(s.slice(),3)),this.setAttribute("uv",new $e(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const M=new z,v=new z,S=new z;for(let A=0;A<e.length;A+=3)d(e[A+0],M),d(e[A+1],v),d(e[A+2],S),l(M,v,S,b)}function l(b,M,v,S){const A=S+1,T=[];for(let x=0;x<=A;x++){T[x]=[];const E=b.clone().lerp(v,x/A),R=M.clone().lerp(v,x/A),I=A-x;for(let N=0;N<=I;N++)N===0&&x===A?T[x][N]=E:T[x][N]=E.clone().lerp(R,N/I)}for(let x=0;x<A;x++)for(let E=0;E<2*(A-x)-1;E++){const R=Math.floor(E/2);E%2===0?(f(T[x][R+1]),f(T[x+1][R]),f(T[x][R])):(f(T[x][R+1]),f(T[x+1][R+1]),f(T[x+1][R]))}}function c(b){const M=new z;for(let v=0;v<s.length;v+=3)M.x=s[v+0],M.y=s[v+1],M.z=s[v+2],M.normalize().multiplyScalar(b),s[v+0]=M.x,s[v+1]=M.y,s[v+2]=M.z}function u(){const b=new z;for(let M=0;M<s.length;M+=3){b.x=s[M+0],b.y=s[M+1],b.z=s[M+2];const v=m(b)/2/Math.PI+.5,S=p(b)/Math.PI+.5;a.push(v,1-S)}g(),h()}function h(){for(let b=0;b<a.length;b+=6){const M=a[b+0],v=a[b+2],S=a[b+4],A=Math.max(M,v,S),T=Math.min(M,v,S);A>.9&&T<.1&&(M<.2&&(a[b+0]+=1),v<.2&&(a[b+2]+=1),S<.2&&(a[b+4]+=1))}}function f(b){s.push(b.x,b.y,b.z)}function d(b,M){const v=b*3;M.x=t[v+0],M.y=t[v+1],M.z=t[v+2]}function g(){const b=new z,M=new z,v=new z,S=new z,A=new Zt,T=new Zt,x=new Zt;for(let E=0,R=0;E<s.length;E+=9,R+=6){b.set(s[E+0],s[E+1],s[E+2]),M.set(s[E+3],s[E+4],s[E+5]),v.set(s[E+6],s[E+7],s[E+8]),A.set(a[R+0],a[R+1]),T.set(a[R+2],a[R+3]),x.set(a[R+4],a[R+5]),S.copy(b).add(M).add(v).divideScalar(3);const I=m(S);y(A,R+0,b,I),y(T,R+2,M,I),y(x,R+4,v,I)}}function y(b,M,v,S){S<0&&b.x===1&&(a[M]=b.x-1),v.x===0&&v.z===0&&(a[M]=S/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qo(t.vertices,t.indices,t.radius,t.detail)}}class Yu extends Qo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Yu(t.radius,t.detail)}}class Ea extends Dn{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=t/o,f=e/l,d=[],g=[],y=[],m=[];for(let p=0;p<u;p++){const b=p*f-a;for(let M=0;M<c;M++){const v=M*h-s;g.push(v,-b,0),y.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const M=b+c*p,v=b+c*(p+1),S=b+1+c*(p+1),A=b+1+c*p;d.push(M,v,A),d.push(v,S,A)}this.setIndex(d),this.setAttribute("position",new $e(g,3)),this.setAttribute("normal",new $e(y,3)),this.setAttribute("uv",new $e(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ju extends Qo{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],r=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,r,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ju(t.radius,t.detail)}}class Ma extends Dn{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);const l=[],c=[],u=[],h=[],f=new z,d=new z,g=new z;for(let y=0;y<=n;y++){const m=a+y/n*o;for(let p=0;p<=r;p++){const b=p/r*s;d.x=(t+e*Math.cos(m))*Math.cos(b),d.y=(t+e*Math.cos(m))*Math.sin(b),d.z=e*Math.sin(m),c.push(d.x,d.y,d.z),f.x=t*Math.cos(b),f.y=t*Math.sin(b),g.subVectors(d,f).normalize(),u.push(g.x,g.y,g.z),h.push(p/r),h.push(y/n)}}for(let y=1;y<=n;y++)for(let m=1;m<=r;m++){const p=(r+1)*y+m-1,b=(r+1)*(y-1)+m-1,M=(r+1)*(y-1)+m,v=(r+1)*y+m;l.push(p,b,v),l.push(b,M,v)}this.setIndex(l),this.setAttribute("position",new $e(c,3)),this.setAttribute("normal",new $e(u,3)),this.setAttribute("uv",new $e(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ma(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function Ss(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];if(lh(r))r.isRenderTargetTexture?(kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone();else if(Array.isArray(r))if(lh(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();t[e][n]=s}else t[e][n]=r.slice();else t[e][n]=r}}return t}function on(i){const t={};for(let e=0;e<i.length;e++){const n=Ss(i[e]);for(const r in n)t[r]=n[r]}return t}function lh(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function uy(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Up(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const fy={clone:Ss,merge:on};var hy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends Sa{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hy,this.fragmentShader=dy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ss(t.uniforms),this.uniformsGroups=uy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const r=t.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=e[r.value]||null;break;case"c":this.uniforms[n].value=new Yt().setHex(r.value);break;case"v2":this.uniforms[n].value=new Zt().fromArray(r.value);break;case"v3":this.uniforms[n].value=new z().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Pe().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Gt().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Se().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class py extends Zn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class su extends Sa{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nu,this.normalScale=new Zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class my extends Sa{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=S0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gy extends Sa{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Qu extends Ze{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Yt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const Xl=new Se,ch=new z,uh=new z;class Dp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=En,this.map=null,this.mapPass=null,this.matrix=new Se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qu,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new Pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;ch.setFromMatrixPosition(t.matrixWorld),e.position.copy(ch),uh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(uh),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,r){Xl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Xl,t.coordinateSystem,t.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;t.coordinateSystem===fa||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(Xl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const no=new z,io=new Ls,ei=new z;class Fp extends Ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Se,this.projectionMatrix=new Se,this.projectionMatrixInverse=new Se,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(no,io,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,ei.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(no,io,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(no,io,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qi=new z,fh=new Zt,hh=new Zt;class In extends Fp{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=iu*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Al*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return iu*2*Math.atan(Math.tan(Al*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qi.x,qi.y).multiplyScalar(-t/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-t/qi.z)}getViewSize(t,e){return this.getViewBounds(t,fh,hh),e.subVectors(hh,fh)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Al*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class yy extends Dp{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0}}class dh extends Qu{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new yy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Zo extends Fp{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class xy extends Dp{constructor(){super(new Zo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _y extends Qu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ze.DEFAULT_UP),this.updateMatrix(),this.target=new Ze,this.shadow=new xy}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class vy extends Qu{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const ss=-90,as=1;class by extends Ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new In(ss,as,t,e);r.layers=this.layers,this.add(r);const s=new In(ss,as,t,e);s.layers=this.layers,this.add(s);const a=new In(ss,as,t,e);a.layers=this.layers,this.add(a);const o=new In(ss,as,t,e);o.layers=this.layers,this.add(o);const l=new In(ss,as,t,e);l.layers=this.layers,this.add(l);const c=new In(ss,as,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===li)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===fa)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(n,1,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class wy extends In{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Tf=class Tf{constructor(t,e,n,r){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,r){const s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=r,this}};Tf.prototype.isMatrix2=!0;let ph=Tf;function mh(i,t,e,n){const r=Ay(n);switch(e){case Ap:return i*t;case Bu:return i*t/r.components*r.byteLength;case ku:return i*t/r.components*r.byteLength;case Fr:return i*t*2/r.components*r.byteLength;case Gu:return i*t*2/r.components*r.byteLength;case Sp:return i*t*3/r.components*r.byteLength;case Yn:return i*t*4/r.components*r.byteLength;case Hu:return i*t*4/r.components*r.byteLength;case vo:case bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wo:case Ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Tc:case Rc:return Math.max(i,16)*Math.max(t,8)/4;case Mc:case Cc:return Math.max(i,8)*Math.max(t,8)/2;case Pc:case Ic:case Lc:case Uc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Nc:case Io:case Dc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Bc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case kc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Gc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Hc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case zc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Vc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Wc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Xc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case qc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Kc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Yc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Jc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Qc:case Zc:case $c:return Math.ceil(i/4)*Math.ceil(t/4)*16;case jc:case tu:return Math.ceil(i/4)*Math.ceil(t/4)*8;case No:case eu:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ay(i){switch(i){case En:case _p:return{byteLength:1,components:1};case ca:case vp:case di:return{byteLength:2,components:1};case Fu:case Ou:return{byteLength:2,components:4};case hi:case Du:case Kn:return{byteLength:4,components:1};case bp:case wp:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lu}}));typeof window<"u"&&(window.__THREE__?kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lu);function Op(){let i=null,t=!1,e=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),e(s,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Sy(i){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,h=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],y=h[d];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,h[f]=y)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const y=h[d];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var Ey=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,My=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ty=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ry=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Py=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Iy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ny=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ly=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Uy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Fy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Oy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,By=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ky=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Hy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Xy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,qy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ky=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Yy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Zy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$y=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ex="gl_FragColor = linearToOutputTexel( gl_FragColor );",nx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ix=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,rx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ax=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ox=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,lx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ux=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,dx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,px=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,yx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,xx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_x=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ax=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ex=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Mx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Tx=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Cx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Px=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ix=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ux=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ox=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Yx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$x=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,t_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,e_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,n_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,i_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,s_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,a_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,o_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,l_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,c_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,u_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,f_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,h_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,d_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,p_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,m_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,g_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,y_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,x_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,__=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,v_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,b_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,w_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,A_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,S_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const E_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,M_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,R_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,N_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,L_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,U_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,D_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,B_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,k_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,G_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,z_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,W_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,q_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,K_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Q_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ev=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:Ey,alphahash_pars_fragment:My,alphamap_fragment:Ty,alphamap_pars_fragment:Cy,alphatest_fragment:Ry,alphatest_pars_fragment:Py,aomap_fragment:Iy,aomap_pars_fragment:Ny,batching_pars_vertex:Ly,batching_vertex:Uy,begin_vertex:Dy,beginnormal_vertex:Fy,bsdfs:Oy,iridescence_fragment:By,bumpmap_pars_fragment:ky,clipping_planes_fragment:Gy,clipping_planes_pars_fragment:Hy,clipping_planes_pars_vertex:zy,clipping_planes_vertex:Vy,color_fragment:Wy,color_pars_fragment:Xy,color_pars_vertex:qy,color_vertex:Ky,common:Yy,cube_uv_reflection_fragment:Jy,defaultnormal_vertex:Qy,displacementmap_pars_vertex:Zy,displacementmap_vertex:$y,emissivemap_fragment:jy,emissivemap_pars_fragment:tx,colorspace_fragment:ex,colorspace_pars_fragment:nx,envmap_fragment:ix,envmap_common_pars_fragment:rx,envmap_pars_fragment:sx,envmap_pars_vertex:ax,envmap_physical_pars_fragment:yx,envmap_vertex:ox,fog_vertex:lx,fog_pars_vertex:cx,fog_fragment:ux,fog_pars_fragment:fx,gradientmap_pars_fragment:hx,lightmap_pars_fragment:dx,lights_lambert_fragment:px,lights_lambert_pars_fragment:mx,lights_pars_begin:gx,lights_toon_fragment:xx,lights_toon_pars_fragment:_x,lights_phong_fragment:vx,lights_phong_pars_fragment:bx,lights_physical_fragment:wx,lights_physical_pars_fragment:Ax,lights_fragment_begin:Sx,lights_fragment_maps:Ex,lights_fragment_end:Mx,lightprobes_pars_fragment:Tx,logdepthbuf_fragment:Cx,logdepthbuf_pars_fragment:Rx,logdepthbuf_pars_vertex:Px,logdepthbuf_vertex:Ix,map_fragment:Nx,map_pars_fragment:Lx,map_particle_fragment:Ux,map_particle_pars_fragment:Dx,metalnessmap_fragment:Fx,metalnessmap_pars_fragment:Ox,morphinstance_vertex:Bx,morphcolor_vertex:kx,morphnormal_vertex:Gx,morphtarget_pars_vertex:Hx,morphtarget_vertex:zx,normal_fragment_begin:Vx,normal_fragment_maps:Wx,normal_pars_fragment:Xx,normal_pars_vertex:qx,normal_vertex:Kx,normalmap_pars_fragment:Yx,clearcoat_normal_fragment_begin:Jx,clearcoat_normal_fragment_maps:Qx,clearcoat_pars_fragment:Zx,iridescence_pars_fragment:$x,opaque_fragment:jx,packing:t_,premultiplied_alpha_fragment:e_,project_vertex:n_,dithering_fragment:i_,dithering_pars_fragment:r_,roughnessmap_fragment:s_,roughnessmap_pars_fragment:a_,shadowmap_pars_fragment:o_,shadowmap_pars_vertex:l_,shadowmap_vertex:c_,shadowmask_pars_fragment:u_,skinbase_vertex:f_,skinning_pars_vertex:h_,skinning_vertex:d_,skinnormal_vertex:p_,specularmap_fragment:m_,specularmap_pars_fragment:g_,tonemapping_fragment:y_,tonemapping_pars_fragment:x_,transmission_fragment:__,transmission_pars_fragment:v_,uv_pars_fragment:b_,uv_pars_vertex:w_,uv_vertex:A_,worldpos_vertex:S_,background_vert:E_,background_frag:M_,backgroundCube_vert:T_,backgroundCube_frag:C_,cube_vert:R_,cube_frag:P_,depth_vert:I_,depth_frag:N_,distance_vert:L_,distance_frag:U_,equirect_vert:D_,equirect_frag:F_,linedashed_vert:O_,linedashed_frag:B_,meshbasic_vert:k_,meshbasic_frag:G_,meshlambert_vert:H_,meshlambert_frag:z_,meshmatcap_vert:V_,meshmatcap_frag:W_,meshnormal_vert:X_,meshnormal_frag:q_,meshphong_vert:K_,meshphong_frag:Y_,meshphysical_vert:J_,meshphysical_frag:Q_,meshtoon_vert:Z_,meshtoon_frag:$_,points_vert:j_,points_frag:tv,shadow_vert:ev,shadow_frag:nv,sprite_vert:iv,sprite_frag:rv},pt={common:{diffuse:{value:new Yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Yt(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},ri={basic:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)},envMapIntensity:{value:1}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:on([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)},specular:{value:new Yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:on([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:on([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Yt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:on([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:on([pt.points,pt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:on([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:on([pt.common,pt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:on([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:on([pt.sprite,pt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distance:{uniforms:on([pt.common,pt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distance_vert,fragmentShader:Kt.distance_frag},shadow:{uniforms:on([pt.lights,pt.fog,{color:{value:new Yt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};ri.physical={uniforms:on([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Yt(0)},specularColor:{value:new Yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const ro={r:0,b:0,g:0},sv=new Se,Bp=new Gt;Bp.set(-1,0,0,0,1,0,0,0,1);function av(i,t,e,n,r,s){const a=new Yt(0);let o=r===!0?0:1,l,c,u=null,h=0,f=null;function d(b){let M=b.isScene===!0?b.background:null;if(M&&M.isTexture){const v=b.backgroundBlurriness>0;M=t.get(M,v)}return M}function g(b){let M=!1;const v=d(b);v===null?m(a,o):v&&v.isColor&&(m(v,1),M=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?e.buffers.color.setClear(0,0,0,1,s):S==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(b,M){const v=d(M);v&&(v.isCubeTexture||v.mapping===Jo)?(c===void 0&&(c=new Ln(new Vr(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:Ss(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(S,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(sv.makeRotationFromEuler(M.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Bp),c.material.toneMapped=ne.getTransfer(v.colorSpace)!==pe,(u!==v||h!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,h=v.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ln(new Ea(2,2),new Zn({name:"BackgroundMaterial",uniforms:Ss(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:Ur,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ne.getTransfer(v.colorSpace)!==pe,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||h!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,h=v.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,M){b.getRGB(ro,Up(i)),e.buffers.color.setClear(ro.r,ro.g,ro.b,M,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,M=1){a.set(b),o=M,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:y,dispose:p}}function ov(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(I,N,U,L,P){let O=!1;const G=h(I,L,U,N);s!==G&&(s=G,c(s.object)),O=d(I,L,U,P),O&&g(I,L,U,P),P!==null&&t.update(P,i.ELEMENT_ARRAY_BUFFER),(O||a)&&(a=!1,v(I,N,U,L),P!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(P).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function u(I){return i.deleteVertexArray(I)}function h(I,N,U,L){const P=L.wireframe===!0;let O=n[N.id];O===void 0&&(O={},n[N.id]=O);const G=I.isInstancedMesh===!0?I.id:0;let Z=O[G];Z===void 0&&(Z={},O[G]=Z);let V=Z[U.id];V===void 0&&(V={},Z[U.id]=V);let Y=V[P];return Y===void 0&&(Y=f(l()),V[P]=Y),Y}function f(I){const N=[],U=[],L=[];for(let P=0;P<e;P++)N[P]=0,U[P]=0,L[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:U,attributeDivisors:L,object:I,attributes:{},index:null}}function d(I,N,U,L){const P=s.attributes,O=N.attributes;let G=0;const Z=U.getAttributes();for(const V in Z)if(Z[V].location>=0){const Q=P[V];let at=O[V];if(at===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(at=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(at=I.instanceColor)),Q===void 0||Q.attribute!==at||at&&Q.data!==at.data)return!0;G++}return s.attributesNum!==G||s.index!==L}function g(I,N,U,L){const P={},O=N.attributes;let G=0;const Z=U.getAttributes();for(const V in Z)if(Z[V].location>=0){let Q=O[V];Q===void 0&&(V==="instanceMatrix"&&I.instanceMatrix&&(Q=I.instanceMatrix),V==="instanceColor"&&I.instanceColor&&(Q=I.instanceColor));const at={};at.attribute=Q,Q&&Q.data&&(at.data=Q.data),P[V]=at,G++}s.attributes=P,s.attributesNum=G,s.index=L}function y(){const I=s.newAttributes;for(let N=0,U=I.length;N<U;N++)I[N]=0}function m(I){p(I,0)}function p(I,N){const U=s.newAttributes,L=s.enabledAttributes,P=s.attributeDivisors;U[I]=1,L[I]===0&&(i.enableVertexAttribArray(I),L[I]=1),P[I]!==N&&(i.vertexAttribDivisor(I,N),P[I]=N)}function b(){const I=s.newAttributes,N=s.enabledAttributes;for(let U=0,L=N.length;U<L;U++)N[U]!==I[U]&&(i.disableVertexAttribArray(U),N[U]=0)}function M(I,N,U,L,P,O,G){G===!0?i.vertexAttribIPointer(I,N,U,P,O):i.vertexAttribPointer(I,N,U,L,P,O)}function v(I,N,U,L){y();const P=L.attributes,O=U.getAttributes(),G=N.defaultAttributeValues;for(const Z in O){const V=O[Z];if(V.location>=0){let Y=P[Z];if(Y===void 0&&(Z==="instanceMatrix"&&I.instanceMatrix&&(Y=I.instanceMatrix),Z==="instanceColor"&&I.instanceColor&&(Y=I.instanceColor)),Y!==void 0){const Q=Y.normalized,at=Y.itemSize,ot=t.get(Y);if(ot===void 0)continue;const Ot=ot.buffer,Ft=ot.type,Wt=ot.bytesPerElement,J=Ft===i.INT||Ft===i.UNSIGNED_INT||Y.gpuType===Du;if(Y.isInterleavedBufferAttribute){const tt=Y.data,mt=tt.stride,Nt=Y.offset;if(tt.isInstancedInterleavedBuffer){for(let _t=0;_t<V.locationSize;_t++)p(V.location+_t,tt.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let _t=0;_t<V.locationSize;_t++)m(V.location+_t);i.bindBuffer(i.ARRAY_BUFFER,Ot);for(let _t=0;_t<V.locationSize;_t++)M(V.location+_t,at/V.locationSize,Ft,Q,mt*Wt,(Nt+at/V.locationSize*_t)*Wt,J)}else{if(Y.isInstancedBufferAttribute){for(let tt=0;tt<V.locationSize;tt++)p(V.location+tt,Y.meshPerAttribute);I.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let tt=0;tt<V.locationSize;tt++)m(V.location+tt);i.bindBuffer(i.ARRAY_BUFFER,Ot);for(let tt=0;tt<V.locationSize;tt++)M(V.location+tt,at/V.locationSize,Ft,Q,at*Wt,at/V.locationSize*tt*Wt,J)}}else if(G!==void 0){const Q=G[Z];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(V.location,Q);break;case 3:i.vertexAttrib3fv(V.location,Q);break;case 4:i.vertexAttrib4fv(V.location,Q);break;default:i.vertexAttrib1fv(V.location,Q)}}}}b()}function S(){E();for(const I in n){const N=n[I];for(const U in N){const L=N[U];for(const P in L){const O=L[P];for(const G in O)u(O[G].object),delete O[G];delete L[P]}}delete n[I]}}function A(I){if(n[I.id]===void 0)return;const N=n[I.id];for(const U in N){const L=N[U];for(const P in L){const O=L[P];for(const G in O)u(O[G].object),delete O[G];delete L[P]}}delete n[I.id]}function T(I){for(const N in n){const U=n[N];for(const L in U){const P=U[L];if(P[I.id]===void 0)continue;const O=P[I.id];for(const G in O)u(O[G].object),delete O[G];delete P[I.id]}}}function x(I){for(const N in n){const U=n[N],L=I.isInstancedMesh===!0?I.id:0,P=U[L];if(P!==void 0){for(const O in P){const G=P[O];for(const Z in G)u(G[Z].object),delete G[Z];delete P[O]}delete U[L],Object.keys(U).length===0&&delete n[N]}}}function E(){R(),a=!0,s!==r&&(s=r,c(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:R,dispose:S,releaseStatesOfGeometry:A,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:m,disableUnusedAttributes:b}}function lv(i,t,e){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),e.update(c,n,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let f=0;for(let d=0;d<u;d++)f+=c[d];e.update(f,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function cv(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==Yn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const x=T===di&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==En&&T!==Kn&&!x&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(kt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:v,maxSamples:S,samples:A}}function uv(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new tr,o=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,M=b*4;let v=p.clippingState||null;l.value=v,v=u(g,f,M,d);for(let S=0;S!==M;++S)v[S]=e[S];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,g){const y=h!==null?h.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const p=d+y*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=d;M!==y;++M,v+=4)a.copy(h[M]).applyMatrix4(b,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}const ds=4,fv=6,hv=20,dv=256,Ws=new Zo,gh=new Yt;let ql=null,Kl=0,Yl=0,Jl=!1;const pv=new z,dr=new z;class yh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,r=100,s={}){const{size:a=256,position:o=pv}=s;ql=this._renderer.getRenderTarget(),Kl=this._renderer.getActiveCubeFace(),Yl=this._renderer.getActiveMipmapLevel(),Jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,r,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(ql,Kl,Yl),this._renderer.xr.enabled=Jl,t.scissorTest=!1,os(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Dr||t.mapping===As?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ql=this._renderer.getRenderTarget(),Kl=this._renderer.getActiveCubeFace(),Yl=this._renderer.getActiveMipmapLevel(),Jl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:di,format:Yn,colorSpace:Lo,depthBuffer:!1},r=xh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(t,e,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=mv(s)),this._blurMaterial=yv(s,t,e),this._ggxMaterial=gv(s,t,e)}return r}_compileMaterial(t){const e=new Ln(new Dn,t);this._renderer.compile(e,Ws)}_sceneToCubeUV(t,e,n,r,s){const l=new In(90,1,e,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(gh),h.toneMapping=ci,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ln(new Vr,new ha({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let p=!1;const b=t.background;b?b.isColor&&(m.color.copy(b),t.background=null,p=!0):(m.color.copy(gh),p=!0);for(let M=0;M<6;M++){const v=M%3;v===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[M],s.y,s.z)):v===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[M]));const S=this._cubeSize;os(r,v*S,M>2?S:0,S,S),h.setRenderTarget(r),p&&h.render(y,l),h.render(t,l)}h.toneMapping=d,h.autoClear=f,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Dr||t.mapping===As;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=vh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_h());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;os(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ws)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),f=c*1.25,d=h*f,{_lodMax:g}=this,y=this._sizeLods[n],m=3*y*(n>g-ds?n-g+ds:0),p=4*(this._cubeSize-y);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-e,os(s,m,p,3*y,2*y),r.setRenderTarget(s),r.render(o,Ws),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,os(t,m,p,3*y,2*y),r.setRenderTarget(t),r.render(o,Ws)}_blur(t,e,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,n,a),this._blurPass(s,t,n,n,a)}_blurPass(t,e,n,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],h=3*u*(r>this._lodMax-ds?r-this._lodMax+ds:0),f=4*(this._cubeSize-u);os(e,h,f,3*u,2*u),a.setRenderTarget(e),a.render(l,Ws)}}function mv(i){const t=[],e=[];let n=i;const r=i-ds+1+fv;for(let s=0;s<r;s++){const a=Math.pow(2,n);t.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,f=6,d=3,g=new Float32Array(d*f*h),y=new Float32Array(d*f*h);for(let p=0;p<h;p++){const b=p%3*2/3-1,M=p>2?0:-1,v=[b,M,0,b+2/3,M,0,b+2/3,M+1,0,b,M,0,b+2/3,M+1,0,b,M+1,0];g.set(v,d*f*p);for(let S=0;S<f;S++){const A=u[S*2]*2-1,T=u[S*2+1]*2-1;p===0?dr.set(1,T,A):p===1?dr.set(-A,1,-T):p===2?dr.set(-A,T,1):p===3?dr.set(-1,T,-A):p===4?dr.set(-A,-1,T):dr.set(A,T,-1),dr.toArray(y,(p*f+S)*d)}}const m=new Dn;m.setAttribute("position",new ui(g,d)),m.setAttribute("outputDirection",new ui(y,d)),e.push(new Ln(m,null)),n>ds&&n--}return{lodMeshes:e,sizeLods:t}}function xh(i,t,e){const n=new Jn(i,t,e);return n.texture.mapping=Jo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function os(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function gv(i,t,e){return new Zn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:$o(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function yv(i,t,e){return new Zn({name:"SphericalGaussianBlur",defines:{SAMPLES:hv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:$o(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function _h(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function vh(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$o(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function $o(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class kp extends Jn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Np(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Vr(5,5,5),s=new Zn({name:"CubemapFromEquirect",uniforms:Ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:yn,blending:Ti});s.uniforms.tEquirect.value=e;const a=new Ln(r,s),o=e.minFilter;return e.minFilter===wr&&(e.minFilter=rn),new by(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}function xv(i){let t=new WeakMap,e=new WeakMap,n=null;function r(f,d=!1){return f==null?null:d?a(f):s(f)}function s(f){if(f&&f.isTexture){const d=f.mapping;if(d===xl||d===_l)if(t.has(f)){const g=t.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const y=new kp(g.height);return y.fromEquirectangularTexture(i,f),t.set(f,y),f.addEventListener("dispose",c),o(y.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,g=d===xl||d===_l,y=d===Dr||d===As;if(g||y){let m=e.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new yh(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const b=f.image;return g&&b&&b.height>0||y&&b&&l(b)?(n===null&&(n=new yh(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,d){return d===xl?f.mapping=Dr:d===_l&&(f.mapping=As),f}function l(f){let d=0;const g=6;for(let y=0;y<g;y++)f[y]!==void 0&&d++;return d===g}function c(f){const d=f.target;d.removeEventListener("dispose",c);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:h}}function _v(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const r=i.getExtension(n);return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&ys("WebGLRenderer: "+n+" extension not supported."),r}}}function vv(i,t,e,n){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,g=h.attributes.position;let y=0;if(g===void 0)return;if(d!==null){const b=d.array;y=d.version;for(let M=0,v=b.length;M<v;M+=3){const S=b[M+0],A=b[M+1],T=b[M+2];f.push(S,A,A,T,T,S)}}else{const b=g.array;y=g.version;for(let M=0,v=b.length/3-1;M<v;M+=3){const S=M+0,A=M+1,T=M+2;f.push(S,A,A,T,T,S)}}const m=new(g.count>=65535?Pp:Rp)(f,1);m.version=y;const p=s.get(h);p&&t.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function bv(i,t,e){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,f){i.drawElements(n,f,s,h*a),e.update(f,n,1)}function c(h,f,d){d!==0&&(i.drawElementsInstanced(n,f,s,h*a,d),e.update(f,n,d))}function u(h,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,h,0,d);let y=0;for(let m=0;m<d;m++)y+=f[m];e.update(y,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function wv(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:ce("WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Av(i,t,e){const n=new WeakMap,r=new Pe;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let E=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;d===!0&&(M=1),g===!0&&(M=2),y===!0&&(M=3);let v=o.attributes.position.count*M,S=1;v>t.maxTextureSize&&(S=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const A=new Float32Array(v*S*4*h),T=new Mp(A,v,S,h);T.type=Kn,T.needsUpdate=!0;const x=M*4;for(let R=0;R<h;R++){const I=m[R],N=p[R],U=b[R],L=v*S*4*R;for(let P=0;P<I.count;P++){const O=P*x;d===!0&&(r.fromBufferAttribute(I,P),A[L+O+0]=r.x,A[L+O+1]=r.y,A[L+O+2]=r.z,A[L+O+3]=0),g===!0&&(r.fromBufferAttribute(N,P),A[L+O+4]=r.x,A[L+O+5]=r.y,A[L+O+6]=r.z,A[L+O+7]=0),y===!0&&(r.fromBufferAttribute(U,P),A[L+O+8]=r.x,A[L+O+9]=r.y,A[L+O+10]=r.z,A[L+O+11]=U.itemSize===4?r.w:1)}}f={count:h,texture:T,size:new Zt(v,S)},n.set(o,f),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];const g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Sv(i,t,e,n,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,f=t.get(c,h);if(s.get(f)!==u&&(t.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return f}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const Ev={[hp]:"LINEAR_TONE_MAPPING",[dp]:"REINHARD_TONE_MAPPING",[pp]:"CINEON_TONE_MAPPING",[Uu]:"ACES_FILMIC_TONE_MAPPING",[gp]:"AGX_TONE_MAPPING",[yp]:"NEUTRAL_TONE_MAPPING",[mp]:"CUSTOM_TONE_MAPPING"};function Mv(i,t,e,n,r,s){const a=new Jn(t,e,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Dn;c.setAttribute("position",new $e([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new $e([0,2,0,0,2,0],2));const u=new py({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Ln(c,u),f=new Zo(-1,1,1,-1,0,1);let d=null,g=null,y=!1,m,p=null,b=[],M=!1;this.setSize=function(v,S){a.setSize(v,S),o!==null&&o.setSize(v,S),l!==null&&l.setSize(v,S);for(let A=0;A<b.length;A++){const T=b[A];T.setSize&&T.setSize(v,S)}},this.setEffects=function(v){b=v,M=b.length>0&&b[0].isRenderPass===!0;const S=a.width,A=a.height;b.length>0&&o===null&&(o=new Jn(S,A,{type:di,depthBuffer:!1,stencilBuffer:!1}),l=new Jn(S,A,{type:di,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<b.length;T++){const x=b[T];x.setSize&&x.setSize(S,A)}},this.begin=function(v,S){if(y||v.toneMapping===ci&&b.length===0)return!1;if(p=S,S!==null){const A=S.width,T=S.height;(a.width!==A||a.height!==T)&&this.setSize(A,T)}return M===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=ci,!0},this.hasRenderPass=function(){return M},this.end=function(v,S){v.toneMapping=m,y=!0;let A=a,T=o;for(let x=0;x<b.length;x++){const E=b[x];E.enabled!==!1&&(E.render(v,T,A,S),E.needsSwap!==!1&&(A=T,T=T===o?l:o))}if(d!==v.outputColorSpace||g!==v.toneMapping){d=v.outputColorSpace,g=v.toneMapping,u.defines={},ne.getTransfer(d)===pe&&(u.defines.SRGB_TRANSFER="");const x=Ev[g];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=A.texture,v.setRenderTarget(p),v.render(h,f),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const Gp=new dn,au=new da(1,1),Hp=new Mp,zp=new W0,Vp=new Np,bh=[],wh=[],Ah=new Float32Array(16),Sh=new Float32Array(9),Eh=new Float32Array(4);function Us(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=bh[r];if(s===void 0&&(s=new Float32Array(r),bh[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function We(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function jo(i,t){let e=wh[t];e===void 0&&(e=new Int32Array(t),wh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Tv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Cv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;i.uniform2fv(this.addr,t),Xe(e,t)}}function Rv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(We(e,t))return;i.uniform3fv(this.addr,t),Xe(e,t)}}function Pv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;i.uniform4fv(this.addr,t),Xe(e,t)}}function Iv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Eh.set(n),i.uniformMatrix2fv(this.addr,!1,Eh),Xe(e,n)}}function Nv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Sh.set(n),i.uniformMatrix3fv(this.addr,!1,Sh),Xe(e,n)}}function Lv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(We(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(We(e,n))return;Ah.set(n),i.uniformMatrix4fv(this.addr,!1,Ah),Xe(e,n)}}function Uv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Dv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;i.uniform2iv(this.addr,t),Xe(e,t)}}function Fv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;i.uniform3iv(this.addr,t),Xe(e,t)}}function Ov(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;i.uniform4iv(this.addr,t),Xe(e,t)}}function Bv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function kv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(We(e,t))return;i.uniform2uiv(this.addr,t),Xe(e,t)}}function Gv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(We(e,t))return;i.uniform3uiv(this.addr,t),Xe(e,t)}}function Hv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(We(e,t))return;i.uniform4uiv(this.addr,t),Xe(e,t)}}function zv(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(au.compareFunction=e.isReversedDepthBuffer()?Vu:zu,s=au):s=Gp,e.setTexture2D(t||s,r)}function Vv(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||zp,r)}function Wv(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Vp,r)}function Xv(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Hp,r)}function qv(i){switch(i){case 5126:return Tv;case 35664:return Cv;case 35665:return Rv;case 35666:return Pv;case 35674:return Iv;case 35675:return Nv;case 35676:return Lv;case 5124:case 35670:return Uv;case 35667:case 35671:return Dv;case 35668:case 35672:return Fv;case 35669:case 35673:return Ov;case 5125:return Bv;case 36294:return kv;case 36295:return Gv;case 36296:return Hv;case 35678:case 36198:case 36298:case 36306:case 35682:return zv;case 35679:case 36299:case 36307:return Vv;case 35680:case 36300:case 36308:case 36293:return Wv;case 36289:case 36303:case 36311:case 36292:return Xv}}function Kv(i,t){i.uniform1fv(this.addr,t)}function Yv(i,t){const e=Us(t,this.size,2);i.uniform2fv(this.addr,e)}function Jv(i,t){const e=Us(t,this.size,3);i.uniform3fv(this.addr,e)}function Qv(i,t){const e=Us(t,this.size,4);i.uniform4fv(this.addr,e)}function Zv(i,t){const e=Us(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function $v(i,t){const e=Us(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function jv(i,t){const e=Us(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function tb(i,t){i.uniform1iv(this.addr,t)}function eb(i,t){i.uniform2iv(this.addr,t)}function nb(i,t){i.uniform3iv(this.addr,t)}function ib(i,t){i.uniform4iv(this.addr,t)}function rb(i,t){i.uniform1uiv(this.addr,t)}function sb(i,t){i.uniform2uiv(this.addr,t)}function ab(i,t){i.uniform3uiv(this.addr,t)}function ob(i,t){i.uniform4uiv(this.addr,t)}function lb(i,t,e){const n=this.cache,r=t.length,s=jo(e,r);We(n,s)||(i.uniform1iv(this.addr,s),Xe(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=au:a=Gp;for(let o=0;o!==r;++o)e.setTexture2D(t[o]||a,s[o])}function cb(i,t,e){const n=this.cache,r=t.length,s=jo(e,r);We(n,s)||(i.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||zp,s[a])}function ub(i,t,e){const n=this.cache,r=t.length,s=jo(e,r);We(n,s)||(i.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Vp,s[a])}function fb(i,t,e){const n=this.cache,r=t.length,s=jo(e,r);We(n,s)||(i.uniform1iv(this.addr,s),Xe(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||Hp,s[a])}function hb(i){switch(i){case 5126:return Kv;case 35664:return Yv;case 35665:return Jv;case 35666:return Qv;case 35674:return Zv;case 35675:return $v;case 35676:return jv;case 5124:case 35670:return tb;case 35667:case 35671:return eb;case 35668:case 35672:return nb;case 35669:case 35673:return ib;case 5125:return rb;case 36294:return sb;case 36295:return ab;case 36296:return ob;case 35678:case 36198:case 36298:case 36306:case 35682:return lb;case 35679:case 36299:case 36307:return cb;case 35680:case 36300:case 36308:case 36293:return ub;case 36289:case 36303:case 36311:case 36292:return fb}}class db{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=qv(e.type)}}class pb{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hb(e.type)}}class mb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const Ql=/(\w+)(\])?(\[|\.)?/g;function Mh(i,t){i.seq.push(t),i.map[t.id]=t}function gb(i,t,e){const n=i.name,r=n.length;for(Ql.lastIndex=0;;){const s=Ql.exec(n),a=Ql.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Mh(e,c===void 0?new db(o,i,t):new pb(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new mb(o),Mh(e,h)),e=h}}}class So{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);gb(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function Th(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const yb=37297;let xb=0;function _b(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ch=new Gt;function vb(i){ne._getMatrix(Ch,ne.workingColorSpace,i);const t=`mat3( ${Ch.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(i)){case Uo:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return kt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Rh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+_b(i.getShaderSource(t),o)}else return s}function bb(i,t){const e=vb(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const wb={[hp]:"Linear",[dp]:"Reinhard",[pp]:"Cineon",[Uu]:"ACESFilmic",[gp]:"AgX",[yp]:"Neutral",[mp]:"Custom"};function Ab(i,t){const e=wb[t];return e===void 0?(kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const so=new z;function Sb(){ne.getLuminanceCoefficients(so);const i=so.x.toFixed(4),t=so.y.toFixed(4),e=so.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Eb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zs).join(`
`)}function Mb(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Tb(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Zs(i){return i!==""}function Ph(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ih(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Cb=/^[ \t]*#include +<([\w\d./]+)>/gm;function ou(i){return i.replace(Cb,Pb)}const Rb=new Map;function Pb(i,t){let e=Kt[t];if(e===void 0){const n=Rb.get(t);if(n!==void 0)e=Kt[n],kt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return ou(e)}const Ib=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nh(i){return i.replace(Ib,Nb)}function Nb(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Lh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Lb={[_o]:"SHADOWMAP_TYPE_PCF",[Js]:"SHADOWMAP_TYPE_VSM"};function Ub(i){return Lb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Db={[Dr]:"ENVMAP_TYPE_CUBE",[As]:"ENVMAP_TYPE_CUBE",[Jo]:"ENVMAP_TYPE_CUBE_UV"};function Fb(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Db[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Ob={[As]:"ENVMAP_MODE_REFRACTION"};function Bb(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ob[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const kb={[fp]:"ENVMAP_BLENDING_MULTIPLY",[b0]:"ENVMAP_BLENDING_MIX",[w0]:"ENVMAP_BLENDING_ADD"};function Gb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":kb[i.combine]||"ENVMAP_BLENDING_NONE"}function Hb(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function zb(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Ub(e),c=Fb(e),u=Bb(e),h=Gb(e),f=Hb(e),d=Eb(e),g=Mb(s),y=r.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Zs).join(`
`),p.length>0&&(p+=`
`)):(m=[Lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zs).join(`
`),p=[Lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ci?"#define TONE_MAPPING":"",e.toneMapping!==ci?Kt.tonemapping_pars_fragment:"",e.toneMapping!==ci?Ab("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,bb("linearToOutputTexel",e.outputColorSpace),Sb(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zs).join(`
`)),a=ou(a),a=Ph(a,e),a=Ih(a,e),o=ou(o),o=Ph(o,e),o=Ih(o,e),a=Nh(a),o=Nh(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Vf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=b+m+a,v=b+p+o,S=Th(r,r.VERTEX_SHADER,M),A=Th(r,r.FRAGMENT_SHADER,v);r.attachShader(y,S),r.attachShader(y,A),e.index0AttributeName!==void 0?r.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function T(I){if(i.debug.checkShaderErrors){const N=r.getProgramInfoLog(y)||"",U=r.getShaderInfoLog(S)||"",L=r.getShaderInfoLog(A)||"",P=N.trim(),O=U.trim(),G=L.trim();let Z=!0,V=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,S,A);else{const Y=Rh(r,S,"vertex"),Q=Rh(r,A,"fragment");ce("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+P+`
`+Y+`
`+Q)}else P!==""?kt("WebGLProgram: Program Info Log:",P):(O===""||G==="")&&(V=!1);V&&(I.diagnostics={runnable:Z,programLog:P,vertexShader:{log:O,prefix:m},fragmentShader:{log:G,prefix:p}})}r.deleteShader(S),r.deleteShader(A),x=new So(r,y),E=Tb(r,y)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(y,yb)),R},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xb++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=S,this.fragmentShader=A,this}let Vb=0;class Wb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const r=this._getShaderCacheForMaterial(t);return r.has(e)===!1&&(r.add(e),e.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Xb(t),e.set(t,n)),n}}class Xb{constructor(t){this.id=Vb++,this.code=t,this.usedTimes=0}}function qb(i){return i===Fr||i===Io||i===No}function Kb(i,t,e,n,r,s){const a=new Tp,o=new Wb,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function y(x,E,R,I,N,U){const L=I.fog,P=N.geometry,O=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Z=t.get(x.envMap||O,G),V=Z&&Z.mapping===Jo?Z.image.height:null,Y=d[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&kt("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const Q=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,at=Q!==void 0?Q.length:0;let ot=0;P.morphAttributes.position!==void 0&&(ot=1),P.morphAttributes.normal!==void 0&&(ot=2),P.morphAttributes.color!==void 0&&(ot=3);let Ot,Ft,Wt,J;if(Y){const ve=ri[Y];Ot=ve.vertexShader,Ft=ve.fragmentShader}else{Ot=x.vertexShader,Ft=x.fragmentShader;const ve=o.getVertexShaderStage(x),he=o.getFragmentShaderStage(x);o.update(x,ve,he),Wt=ve.id,J=he.id}const tt=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),Nt=N.isInstancedMesh===!0,_t=N.isBatchedMesh===!0,Lt=!!x.map,fe=!!x.matcap,Bt=!!Z,$t=!!x.aoMap,Qt=!!x.lightMap,Ht=!!x.bumpMap&&x.wireframe===!1,se=!!x.normalMap,me=!!x.displacementMap,Oe=!!x.emissiveMap,te=!!x.metalnessMap,Te=!!x.roughnessMap,B=x.anisotropy>0,He=x.clearcoat>0,ae=x.dispersion>0,C=x.retroreflectivity>0,_=x.iridescence>0,H=x.sheen>0,q=x.transmission>0,$=B&&!!x.anisotropyMap,st=He&&!!x.clearcoatMap,lt=He&&!!x.clearcoatNormalMap,j=He&&!!x.clearcoatRoughnessMap,nt=_&&!!x.iridescenceMap,ct=_&&!!x.iridescenceThicknessMap,Rt=H&&!!x.sheenColorMap,dt=H&&!!x.sheenRoughnessMap,ut=!!x.specularMap,Pt=!!x.specularColorMap,Ut=!!x.specularIntensityMap,zt=q&&!!x.transmissionMap,k=q&&!!x.thicknessMap,ft=!!x.gradientMap,et=!!x.alphaMap,ht=x.alphaTest>0,vt=!!x.alphaHash,rt=!!x.extensions;let It=ci;x.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(It=i.toneMapping);const Tt={shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:Ot,fragmentShader:Ft,defines:x.defines,customVertexShaderID:Wt,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:_t,batchingColor:_t&&N._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&N.instanceColor!==null,instancingMorph:Nt&&N.morphTexture!==null,outputColorSpace:tt===null?i.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:ne.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Lt,matcap:fe,envMap:Bt,envMapMode:Bt&&Z.mapping,envMapCubeUVHeight:V,aoMap:$t,lightMap:Qt,bumpMap:Ht,normalMap:se,displacementMap:me,emissiveMap:Oe,normalMapObjectSpace:se&&x.normalMapType===E0,normalMapTangentSpace:se&&x.normalMapType===nu,packedNormalMap:se&&x.normalMapType===nu&&qb(x.normalMap.format),metalnessMap:te,roughnessMap:Te,anisotropy:B,anisotropyMap:$,clearcoat:He,clearcoatMap:st,clearcoatNormalMap:lt,clearcoatRoughnessMap:j,dispersion:ae,retroreflection:C,iridescence:_,iridescenceMap:nt,iridescenceThicknessMap:ct,sheen:H,sheenColorMap:Rt,sheenRoughnessMap:dt,specularMap:ut,specularColorMap:Pt,specularIntensityMap:Ut,transmission:q,transmissionMap:zt,thicknessMap:k,gradientMap:ft,opaque:x.transparent===!1&&x.blending===na&&x.alphaToCoverage===!1,alphaMap:et,alphaTest:ht,alphaHash:vt,combine:x.combine,mapUv:Lt&&g(x.map.channel),aoMapUv:$t&&g(x.aoMap.channel),lightMapUv:Qt&&g(x.lightMap.channel),bumpMapUv:Ht&&g(x.bumpMap.channel),normalMapUv:se&&g(x.normalMap.channel),displacementMapUv:me&&g(x.displacementMap.channel),emissiveMapUv:Oe&&g(x.emissiveMap.channel),metalnessMapUv:te&&g(x.metalnessMap.channel),roughnessMapUv:Te&&g(x.roughnessMap.channel),anisotropyMapUv:$&&g(x.anisotropyMap.channel),clearcoatMapUv:st&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:lt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:dt&&g(x.sheenRoughnessMap.channel),specularMapUv:ut&&g(x.specularMap.channel),specularColorMapUv:Pt&&g(x.specularColorMap.channel),specularIntensityMapUv:Ut&&g(x.specularIntensityMap.channel),transmissionMapUv:zt&&g(x.transmissionMap.channel),thicknessMapUv:k&&g(x.thicknessMap.channel),alphaMapUv:et&&g(x.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(se||B),vertexNormals:!!P.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!P.attributes.uv&&(Lt||et),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||P.attributes.normal===void 0&&se===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:mt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:ot,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:Lt&&x.map.isVideoTexture===!0&&ne.getTransfer(x.map.colorSpace)===pe,decodeVideoTextureEmissive:Oe&&x.emissiveMap.isVideoTexture===!0&&ne.getTransfer(x.emissiveMap.colorSpace)===pe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===si,flipSided:x.side===yn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:rt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&x.extensions.multiDraw===!0||_t)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function m(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)E.push(R),E.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(p(E,x),b(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function p(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function b(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function M(x){const E=d[x.type];let R;if(E){const I=ri[E];R=fy.clone(I.uniforms)}else R=x.uniforms;return R}function v(x,E){let R=u.get(E);return R!==void 0?++R.usedTimes:(R=new zb(i,E,x,r),c.push(R),u.set(E,R)),R}function S(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function A(x){o.remove(x)}function T(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:M,acquireProgram:v,releaseProgram:S,releaseShaderCache:A,programs:c,dispose:T}}function Yb(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function Jb(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Uh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Dh(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,g,y,m,p){let b=i[t];return b===void 0?(b={id:f.id,object:f,geometry:d,material:g,materialVariant:a(f),groupOrder:y,renderOrder:f.renderOrder,z:m,group:p},i[t]=b):(b.id=f.id,b.object=f,b.geometry=d,b.material=g,b.materialVariant=a(f),b.groupOrder=y,b.renderOrder=f.renderOrder,b.z=m,b.group=p),t++,b}function l(f,d,g,y,m,p,b){b.reversedDepth===!0&&(m=-m);const M=o(f,d,g,y,m,p);g.transmission>0?n.push(M):g.transparent===!0?r.push(M):e.push(M)}function c(f,d,g,y,m,p){const b=o(f,d,g,y,m,p);g.transmission>0?n.unshift(b):g.transparent===!0?r.unshift(b):e.unshift(b)}function u(f,d){e.length>1&&e.sort(f||Jb),n.length>1&&n.sort(d||Uh),r.length>1&&r.sort(d||Uh)}function h(){for(let f=t,d=i.length;f<d;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function Qb(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new Dh,i.set(n,[a])):r>=s.length?(a=new Dh,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Zb(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new z,color:new Yt};break;case"SpotLight":e={position:new z,direction:new z,color:new Yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Yt,groundColor:new Yt};break;case"RectAreaLight":e={color:new Yt,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function $b(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let jb=0;function tw(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function ew(i){const t=new Zb,e=$b(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);const r=new z,s=new Se,a=new Se;function o(c){let u=0,h=0,f=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let d=0,g=0,y=0,m=0,p=0,b=0,M=0,v=0,S=0,A=0,T=0,x=0,E=0,R=0;c.sort(tw);for(let N=0,U=c.length;N<U;N++){const L=c[N],P=L.color,O=L.intensity,G=L.distance;let Z=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Fr?Z=L.shadow.map.texture:Z=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=P.r*O,h+=P.g*O,f+=P.b*O;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],O);R++}else if(L.isSunLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Y=L.shadow,Q=e.get(L);Q.shadowIntensity=Y.intensity,Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize.copy(Y.mapSize).multiply(Y.getFrameExtents()),n.sunShadow[g]=Q,n.sunShadowMap[g]=Z;const at=Y.getViewportCount();for(let ot=0;ot<at;ot++)n.sunShadowMatrix[y+ot]=Y.getMatrix(ot),n.sunShadowCascade[y+ot]=Y._cascadeData[ot];y+=at,g++}n.sun[d]=V,d++}else if(L.isDirectionalLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Y=L.shadow,Q=e.get(L);Q.shadowIntensity=Y.intensity,Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,n.directionalShadow[m]=Q,n.directionalShadowMap[m]=Z,n.directionalShadowMatrix[m]=L.shadow.matrix,S++}n.directional[m]=V,m++}else if(L.isSpotLight){const V=t.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(P).multiplyScalar(O),V.distance=G,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[b]=V;const Y=L.shadow;if(L.map&&(n.spotLightMap[x]=L.map,x++,Y.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[b]=Y.matrix,L.castShadow){const Q=e.get(L);Q.shadowIntensity=Y.intensity,Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,n.spotShadow[b]=Q,n.spotShadowMap[b]=Z,T++}b++}else if(L.isRectAreaLight){const V=t.get(L);V.color.copy(P).multiplyScalar(O),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[M]=V,M++}else if(L.isPointLight){const V=t.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){const Y=L.shadow,Q=e.get(L);Q.shadowIntensity=Y.intensity,Q.shadowBias=Y.bias,Q.shadowNormalBias=Y.normalBias,Q.shadowRadius=Y.radius,Q.shadowMapSize=Y.mapSize,Q.shadowCameraNear=Y.camera.near,Q.shadowCameraFar=Y.camera.far,n.pointShadow[p]=Q,n.pointShadowMap[p]=Z,n.pointShadowMatrix[p]=L.shadow.matrix,A++}n.point[p]=V,p++}else if(L.isHemisphereLight){const V=t.get(L);V.skyColor.copy(L.color).multiplyScalar(O),V.groundColor.copy(L.groundColor).multiplyScalar(O),n.hemi[v]=V,v++}}M>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const I=n.hash;(I.sunLength!==d||I.directionalLength!==m||I.pointLength!==p||I.spotLength!==b||I.rectAreaLength!==M||I.hemiLength!==v||I.numSunShadows!==g||I.numDirectionalShadows!==S||I.numPointShadows!==A||I.numSpotShadows!==T||I.numSpotMaps!==x||I.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=m,n.spot.length=b,n.rectArea.length=M,n.point.length=p,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.directionalShadowMatrix.length=S,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=T,n.spotShadowMap.length=T,n.spotLightMatrix.length=T+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,I.sunLength=d,I.directionalLength=m,I.pointLength=p,I.spotLength=b,I.rectAreaLength=M,I.hemiLength=v,I.numSunShadows=g,I.numDirectionalShadows=S,I.numPointShadows=A,I.numSpotShadows=T,I.numSpotMaps=x,I.numLightProbes=R,n.version=jb++)}function l(c,u){let h=0,f=0,d=0,g=0,y=0,m=0;const p=u.matrixWorldInverse;for(let b=0,M=c.length;b<M;b++){const v=c[b];if(v.isSunLight){const S=n.sun[h];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),h++}else if(v.isDirectionalLight){const S=n.directional[f];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),f++}else if(v.isSpotLight){const S=n.spot[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(p),g++}else if(v.isRectAreaLight){const S=n.rectArea[y];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),a.identity(),s.copy(v.matrixWorld),s.premultiply(p),a.extractRotation(s),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){const S=n.hemi[m];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function Fh(i){const t=new ew(i),e=[],n=[],r=[];function s(f){h.camera=f,e.length=0,n.length=0,r.length=0}function a(f){e.push(f)}function o(f){n.push(f)}function l(f){r.push(f)}function c(){t.setup(e)}function u(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function nw(i){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Fh(i),t.set(r,[o])):s>=a.length?(o=new Fh(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const iw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,sw=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],aw=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],Oh=new Se,Xs=new z,Zl=new z;function ow(i,t,e){let n=new qu;const r=new Zt,s=new Zt,a=new Pe,o=new my,l=new gy,c={},u=e.maxTextureSize,h={[Ur]:yn,[yn]:Ur,[si]:si},f=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:iw,fragmentShader:rw}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Dn;g.setAttribute("position",new ui(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ln(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_o;let p=this.type;this.render=function(A,T,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===n0&&(kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=_o);const E=i.getRenderTarget(),R=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Ti),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const U=p!==this.type;U&&T.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(P=>P.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,P=A.length;L<P;L++){const O=A[L],G=O.shadow;if(G===void 0){kt("WebGLShadowMap:",O,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const Z=G.getFrameExtents();r.multiply(Z),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,G.mapSize.y=s.y));const V=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=V,G.map===null||U===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Js){if(O.isPointLight){kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Jn(r.x,r.y,{format:Fr,type:di,minFilter:rn,magFilter:rn,generateMipmaps:!1}),G.map.texture.name=O.name+".shadowMap",G.map.depthTexture=new da(r.x,r.y,Kn),G.map.depthTexture.name=O.name+".shadowMapDepth",G.map.depthTexture.format=Ni,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=je,G.map.depthTexture.magFilter=je}else O.isPointLight?(G.map=new kp(r.x),G.map.depthTexture=new cy(r.x,hi)):(G.map=new Jn(r.x,r.y),G.map.depthTexture=new da(r.x,r.y,hi)),G.map.depthTexture.name=O.name+".shadowMap",G.map.depthTexture.format=Ni,this.type===_o?(G.map.depthTexture.compareFunction=V?Vu:zu,G.map.depthTexture.minFilter=rn,G.map.depthTexture.magFilter=rn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=je,G.map.depthTexture.magFilter=je);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==r.x||G.map.height!==r.y)&&G.map.setSize(r.x,r.y);const Y=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();O.isPointLight!==!0&&G.updateMatrices(O,x);for(let Q=0;Q<Y;Q++){const at=G.getCamera(Q);if(O.isPointLight){const ot=G.camera,Ot=G.matrix,Ft=O.distance||ot.far;Ft!==ot.far&&(ot.far=Ft,ot.updateProjectionMatrix()),Xs.setFromMatrixPosition(O.matrixWorld),ot.position.copy(Xs),Zl.copy(ot.position),Zl.add(sw[Q]),ot.up.copy(aw[Q]),ot.lookAt(Zl),ot.updateMatrixWorld(),Ot.makeTranslation(-Xs.x,-Xs.y,-Xs.z),Oh.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Oh,ot.coordinateSystem,ot.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,Q),i.clear();else{Q===0&&(i.setRenderTarget(G.map),i.clear());const ot=G.getViewport(Q);a.set(s.x*ot.x,s.y*ot.y,s.x*ot.z,s.y*ot.w),N.viewport(a)}n=G.getFrustum(Q),v(T,x,at,O,this.type)}G.isPointLightShadow!==!0&&this.type===Js&&b(G,x),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,R,I)};function b(A,T){const x=t.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null?A.mapPass=new Jn(r.x,r.y,{format:Fr,type:di}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(T,null,x,f,y,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(T,null,x,d,y,null)}function M(A,T,x,E){let R=null;const I=x.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)R=I;else if(R=x.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const N=R.uuid,U=T.uuid;let L=c[N];L===void 0&&(L={},c[N]=L);let P=L[U];P===void 0&&(P=R.clone(),L[U]=P,T.addEventListener("dispose",S)),R=P}if(R.visible=T.visible,R.wireframe=T.wireframe,E===Js?R.side=T.shadowSide!==null?T.shadowSide:T.side:R.side=T.shadowSide!==null?T.shadowSide:h[T.side],R.alphaMap=T.alphaMap,R.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,R.map=T.map,R.clipShadows=T.clipShadows,R.clippingPlanes=T.clippingPlanes,R.clipIntersection=T.clipIntersection,R.displacementMap=T.displacementMap,R.displacementScale=T.displacementScale,R.displacementBias=T.displacementBias,R.wireframeLinewidth=T.wireframeLinewidth,R.linewidth=T.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const N=i.properties.get(R);N.light=x}return R}function v(A,T,x,E,R){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&R===Js)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,A.matrixWorld);const U=t.update(A),L=A.material;if(Array.isArray(L)){const P=U.groups;for(let O=0,G=P.length;O<G;O++){const Z=P[O],V=L[Z.materialIndex];if(V&&V.visible){const Y=M(A,V,E,R);A.onBeforeShadow(i,A,T,x,U,Y,Z),i.renderBufferDirect(x,null,U,Y,A,Z),A.onAfterShadow(i,A,T,x,U,Y,Z)}}}else if(L.visible){const P=M(A,L,E,R);A.onBeforeShadow(i,A,T,x,U,P,null),i.renderBufferDirect(x,null,U,P,A,null),A.onAfterShadow(i,A,T,x,U,P,null)}}const N=A.children;for(let U=0,L=N.length;U<L;U++)v(N[U],T,x,E,R)}function S(A){A.target.removeEventListener("dispose",S);for(const x in c){const E=c[x],R=A.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function lw(i,t){function e(){let k=!1;const ft=new Pe;let et=null;const ht=new Pe(0,0,0,0);return{setMask:function(vt){et!==vt&&!k&&(i.colorMask(vt,vt,vt,vt),et=vt)},setLocked:function(vt){k=vt},setClear:function(vt,rt,It,Tt,ve){ve===!0&&(vt*=Tt,rt*=Tt,It*=Tt),ft.set(vt,rt,It,Tt),ht.equals(ft)===!1&&(i.clearColor(vt,rt,It,Tt),ht.copy(ft))},reset:function(){k=!1,et=null,ht.set(-1,0,0,0)}}}function n(){let k=!1,ft=!1,et=null,ht=null,vt=null;return{setReversed:function(rt){if(ft!==rt){const It=t.get("EXT_clip_control");rt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),ft=rt;const Tt=vt;vt=null,this.setClear(Tt)}},getReversed:function(){return ft},setTest:function(rt){rt?tt(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(rt){et!==rt&&!k&&(i.depthMask(rt),et=rt)},setFunc:function(rt){if(ft&&(rt=O0[rt]),ht!==rt){switch(rt){case yc:i.depthFunc(i.NEVER);break;case xc:i.depthFunc(i.ALWAYS);break;case _c:i.depthFunc(i.LESS);break;case la:i.depthFunc(i.LEQUAL);break;case vc:i.depthFunc(i.EQUAL);break;case bc:i.depthFunc(i.GEQUAL);break;case wc:i.depthFunc(i.GREATER);break;case Ac:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ht=rt}},setLocked:function(rt){k=rt},setClear:function(rt){vt!==rt&&(vt=rt,ft&&(rt=1-rt),i.clearDepth(rt))},reset:function(){k=!1,et=null,ht=null,vt=null,ft=!1}}}function r(){let k=!1,ft=null,et=null,ht=null,vt=null,rt=null,It=null,Tt=null,ve=null;return{setTest:function(he){k||(he?tt(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(he){ft!==he&&!k&&(i.stencilMask(he),ft=he)},setFunc:function(he,Fn,jn){(et!==he||ht!==Fn||vt!==jn)&&(i.stencilFunc(he,Fn,jn),et=he,ht=Fn,vt=jn)},setOp:function(he,Fn,jn){(rt!==he||It!==Fn||Tt!==jn)&&(i.stencilOp(he,Fn,jn),rt=he,It=Fn,Tt=jn)},setLocked:function(he){k=he},setClear:function(he){ve!==he&&(i.clearStencil(he),ve=he)},reset:function(){k=!1,ft=null,et=null,ht=null,vt=null,rt=null,It=null,Tt=null,ve=null}}}const s=new e,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},f={},d=new WeakMap,g=[],y=null,m=!1,p=null,b=null,M=null,v=null,S=null,A=null,T=null,x=new Yt(0,0,0),E=0,R=!1,I=null,N=null,U=null,L=null,P=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Z=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=Z>=1):V.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=Z>=2);let Y=null,Q={};const at=i.getParameter(i.SCISSOR_BOX),ot=i.getParameter(i.VIEWPORT),Ot=new Pe().fromArray(at),Ft=new Pe().fromArray(ot);function Wt(k,ft,et,ht){const vt=new Uint8Array(4),rt=i.createTexture();i.bindTexture(k,rt),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let It=0;It<et;It++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,ht,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ft+It,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return rt}const J={};J[i.TEXTURE_2D]=Wt(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Wt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Wt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Wt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(i.DEPTH_TEST),a.setFunc(la),Ht(!1),se(kf),tt(i.CULL_FACE),$t(Ti);function tt(k){u[k]!==!0&&(i.enable(k),u[k]=!0)}function mt(k){u[k]!==!1&&(i.disable(k),u[k]=!1)}function Nt(k,ft){return f[k]!==ft?(i.bindFramebuffer(k,ft),f[k]=ft,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ft),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function _t(k,ft){let et=g,ht=!1;if(k){et=d.get(ft),et===void 0&&(et=[],d.set(ft,et));const vt=k.textures;if(et.length!==vt.length||et[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,It=vt.length;rt<It;rt++)et[rt]=i.COLOR_ATTACHMENT0+rt;et.length=vt.length,ht=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,ht=!0);ht&&i.drawBuffers(et)}function Lt(k){return y!==k?(i.useProgram(k),y=k,!0):!1}const fe={[fs]:i.FUNC_ADD,[r0]:i.FUNC_SUBTRACT,[s0]:i.FUNC_REVERSE_SUBTRACT};fe[a0]=i.MIN,fe[o0]=i.MAX;const Bt={[l0]:i.ZERO,[c0]:i.ONE,[u0]:i.SRC_COLOR,[cp]:i.SRC_ALPHA,[g0]:i.SRC_ALPHA_SATURATE,[p0]:i.DST_COLOR,[h0]:i.DST_ALPHA,[f0]:i.ONE_MINUS_SRC_COLOR,[up]:i.ONE_MINUS_SRC_ALPHA,[m0]:i.ONE_MINUS_DST_COLOR,[d0]:i.ONE_MINUS_DST_ALPHA,[y0]:i.CONSTANT_COLOR,[x0]:i.ONE_MINUS_CONSTANT_COLOR,[_0]:i.CONSTANT_ALPHA,[v0]:i.ONE_MINUS_CONSTANT_ALPHA};function $t(k,ft,et,ht,vt,rt,It,Tt,ve,he){if(k===Ti){m===!0&&(mt(i.BLEND),m=!1);return}if(m===!1&&(tt(i.BLEND),m=!0),k!==i0){if(k!==p||he!==R){if((b!==fs||S!==fs)&&(i.blendEquation(i.FUNC_ADD),b=fs,S=fs),he)switch(k){case na:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gf:i.blendFunc(i.ONE,i.ONE);break;case Hf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zf:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ce("WebGLState: Invalid blending: ",k);break}else switch(k){case na:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gf:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Hf:ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zf:ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ce("WebGLState: Invalid blending: ",k);break}M=null,v=null,A=null,T=null,x.set(0,0,0),E=0,p=k,R=he}return}vt=vt||ft,rt=rt||et,It=It||ht,(ft!==b||vt!==S)&&(i.blendEquationSeparate(fe[ft],fe[vt]),b=ft,S=vt),(et!==M||ht!==v||rt!==A||It!==T)&&(i.blendFuncSeparate(Bt[et],Bt[ht],Bt[rt],Bt[It]),M=et,v=ht,A=rt,T=It),(Tt.equals(x)===!1||ve!==E)&&(i.blendColor(Tt.r,Tt.g,Tt.b,ve),x.copy(Tt),E=ve),p=k,R=!1}function Qt(k,ft){k.side===si?mt(i.CULL_FACE):tt(i.CULL_FACE);let et=k.side===yn;ft&&(et=!et),Ht(et),k.blending===na&&k.transparent===!1?$t(Ti):$t(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const ht=k.stencilWrite;o.setTest(ht),ht&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Oe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?tt(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(k){I!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),I=k)}function se(k){k!==t0?(tt(i.CULL_FACE),k!==N&&(k===kf?i.cullFace(i.BACK):k===e0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),N=k}function me(k){k!==U&&(G&&i.lineWidth(k),U=k)}function Oe(k,ft,et){k?(tt(i.POLYGON_OFFSET_FILL),(L!==ft||P!==et)&&(L=ft,P=et,a.getReversed()&&(ft=-ft),i.polygonOffset(ft,et))):mt(i.POLYGON_OFFSET_FILL)}function te(k){k?tt(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function Te(k){k===void 0&&(k=i.TEXTURE0+O-1),Y!==k&&(i.activeTexture(k),Y=k)}function B(k,ft,et){et===void 0&&(Y===null?et=i.TEXTURE0+O-1:et=Y);let ht=Q[et];ht===void 0&&(ht={type:void 0,texture:void 0},Q[et]=ht),(ht.type!==k||ht.texture!==ft)&&(Y!==et&&(i.activeTexture(et),Y=et),i.bindTexture(k,ft||J[k]),ht.type=k,ht.texture=ft)}function He(){const k=Q[Y];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ae(){try{i.compressedTexImage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function _(){try{i.texSubImage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function H(){try{i.texSubImage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function st(){try{i.texStorage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function lt(){try{i.texStorage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function j(){try{i.texImage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function nt(){try{i.texImage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function ct(k){return h[k]!==void 0?h[k]:i.getParameter(k)}function Rt(k,ft){h[k]!==ft&&(i.pixelStorei(k,ft),h[k]=ft)}function dt(k){Ot.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Ot.copy(k))}function ut(k){Ft.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Ft.copy(k))}function Pt(k,ft){let et=c.get(ft);et===void 0&&(et=new WeakMap,c.set(ft,et));let ht=et.get(k);ht===void 0&&(ht=i.getUniformBlockIndex(ft,k.name),et.set(k,ht))}function Ut(k,ft){const ht=c.get(ft).get(k);l.get(ft)!==ht&&(i.uniformBlockBinding(ft,ht,k.__bindingPointIndex),l.set(ft,ht))}function zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},h={},Y=null,Q={},f={},d=new WeakMap,g=[],y=null,m=!1,p=null,b=null,M=null,v=null,S=null,A=null,T=null,x=new Yt(0,0,0),E=0,R=!1,I=null,N=null,U=null,L=null,P=null,Ot.set(0,0,i.canvas.width,i.canvas.height),Ft.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:tt,disable:mt,bindFramebuffer:Nt,drawBuffers:_t,useProgram:Lt,setBlending:$t,setMaterial:Qt,setFlipSided:Ht,setCullFace:se,setLineWidth:me,setPolygonOffset:Oe,setScissorTest:te,activeTexture:Te,bindTexture:B,unbindTexture:He,compressedTexImage2D:ae,compressedTexImage3D:C,texImage2D:j,texImage3D:nt,pixelStorei:Rt,getParameter:ct,updateUBOMapping:Pt,uniformBlockBinding:Ut,texStorage2D:st,texStorage3D:lt,texSubImage2D:_,texSubImage3D:H,compressedTexSubImage2D:q,compressedTexSubImage3D:$,scissor:dt,viewport:ut,reset:zt}}function cw(i,t,e,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Zt,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,_){return g?new OffscreenCanvas(C,_):Do("canvas")}function m(C,_,H){let q=1;const $=ae(C);if(($.width>H||$.height>H)&&(q=H/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const st=Math.floor(q*$.width),lt=Math.floor(q*$.height);f===void 0&&(f=y(st,lt));const j=_?y(st,lt):f;return j.width=st,j.height=lt,j.getContext("2d").drawImage(C,0,0,st,lt),kt("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+st+"x"+lt+")."),j}else return"data"in C&&kt("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function p(C){return C.generateMipmaps}function b(C){i.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(C,_,H,q,$,st=!1){if(C!==null){if(i[C]!==void 0)return i[C];kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let lt;q&&(lt=t.get("EXT_texture_norm16"),lt||kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=_;if(_===i.RED&&(H===i.FLOAT&&(j=i.R32F),H===i.HALF_FLOAT&&(j=i.R16F),H===i.UNSIGNED_BYTE&&(j=i.R8),H===i.UNSIGNED_SHORT&&lt&&(j=lt.R16_EXT),H===i.SHORT&&lt&&(j=lt.R16_SNORM_EXT)),_===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.R8UI),H===i.UNSIGNED_SHORT&&(j=i.R16UI),H===i.UNSIGNED_INT&&(j=i.R32UI),H===i.BYTE&&(j=i.R8I),H===i.SHORT&&(j=i.R16I),H===i.INT&&(j=i.R32I)),_===i.RG&&(H===i.FLOAT&&(j=i.RG32F),H===i.HALF_FLOAT&&(j=i.RG16F),H===i.UNSIGNED_BYTE&&(j=i.RG8),H===i.UNSIGNED_SHORT&&lt&&(j=lt.RG16_EXT),H===i.SHORT&&lt&&(j=lt.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RG8UI),H===i.UNSIGNED_SHORT&&(j=i.RG16UI),H===i.UNSIGNED_INT&&(j=i.RG32UI),H===i.BYTE&&(j=i.RG8I),H===i.SHORT&&(j=i.RG16I),H===i.INT&&(j=i.RG32I)),_===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RGB8UI),H===i.UNSIGNED_SHORT&&(j=i.RGB16UI),H===i.UNSIGNED_INT&&(j=i.RGB32UI),H===i.BYTE&&(j=i.RGB8I),H===i.SHORT&&(j=i.RGB16I),H===i.INT&&(j=i.RGB32I)),_===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),H===i.UNSIGNED_INT&&(j=i.RGBA32UI),H===i.BYTE&&(j=i.RGBA8I),H===i.SHORT&&(j=i.RGBA16I),H===i.INT&&(j=i.RGBA32I)),_===i.RGB&&(H===i.UNSIGNED_SHORT&&lt&&(j=lt.RGB16_EXT),H===i.SHORT&&lt&&(j=lt.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),_===i.RGBA){const nt=st?Uo:ne.getTransfer($);H===i.FLOAT&&(j=i.RGBA32F),H===i.HALF_FLOAT&&(j=i.RGBA16F),H===i.UNSIGNED_BYTE&&(j=nt===pe?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&lt&&(j=lt.RGBA16_EXT),H===i.SHORT&&lt&&(j=lt.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function S(C,_){let H;return C?_===null||_===hi||_===ua?H=i.DEPTH24_STENCIL8:_===Kn?H=i.DEPTH32F_STENCIL8:_===ca&&(H=i.DEPTH24_STENCIL8,kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===hi||_===ua?H=i.DEPTH_COMPONENT24:_===Kn?H=i.DEPTH_COMPONENT32F:_===ca&&(H=i.DEPTH_COMPONENT16),H}function A(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==je&&C.minFilter!==rn?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function T(C){const _=C.target;_.removeEventListener("dispose",T),E(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function x(C){const _=C.target;_.removeEventListener("dispose",x),I(_)}function E(C){const _=n.get(C);if(_.__webglInit===void 0)return;const H=C.source,q=d.get(H);if(q){const $=q[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&R(C),Object.keys(q).length===0&&d.delete(H)}n.remove(C)}function R(C){const _=n.get(C);i.deleteTexture(_.__webglTexture);const H=C.source,q=d.get(H);delete q[_.__cacheKey],a.memory.textures--}function I(C){const _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let $=0;$<_.__webglFramebuffer[q].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[q][$]);else i.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)i.deleteFramebuffer(_.__webglFramebuffer[q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const H=C.textures;for(let q=0,$=H.length;q<$;q++){const st=n.get(H[q]);st.__webglTexture&&(i.deleteTexture(st.__webglTexture),a.memory.textures--),n.remove(H[q])}n.remove(C)}let N=0;function U(){N=0}function L(){return N}function P(C){N=C}function O(){const C=N;return C>=r.maxTextures&&kt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,C}function G(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function Z(C,_){const H=n.get(C);if(C.isVideoTexture&&B(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&H.__version!==C.version){const q=C.image;if(q===null)kt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)kt("WebGLRenderer: Texture marked for update but image is incomplete");else{mt(H,C,_);return}}else C.isExternalTexture&&(H.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+_)}function V(C,_){const H=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){mt(H,C,_);return}else C.isExternalTexture&&(H.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+_)}function Y(C,_){const H=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){mt(H,C,_);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+_)}function Q(C,_){const H=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&H.__version!==C.version){Nt(H,C,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+_)}const at={[Sc]:i.REPEAT,[Si]:i.CLAMP_TO_EDGE,[Ec]:i.MIRRORED_REPEAT},ot={[je]:i.NEAREST,[A0]:i.NEAREST_MIPMAP_NEAREST,[Oa]:i.NEAREST_MIPMAP_LINEAR,[rn]:i.LINEAR,[vl]:i.LINEAR_MIPMAP_NEAREST,[wr]:i.LINEAR_MIPMAP_LINEAR},Ot={[T0]:i.NEVER,[N0]:i.ALWAYS,[C0]:i.LESS,[zu]:i.LEQUAL,[R0]:i.EQUAL,[Vu]:i.GEQUAL,[P0]:i.GREATER,[I0]:i.NOTEQUAL};function Ft(C,_){if(_.type===Kn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===rn||_.magFilter===vl||_.magFilter===Oa||_.magFilter===wr||_.minFilter===rn||_.minFilter===vl||_.minFilter===Oa||_.minFilter===wr)&&kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,at[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,at[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,at[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ot[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ot[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ot[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===je||_.minFilter!==Oa&&_.minFilter!==wr||_.type===Kn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Wt(C,_){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",T));const q=_.source;let $=d.get(q);$===void 0&&($={},d.set(q,$));const st=G(_);if(st!==C.__cacheKey){$[st]===void 0&&($[st]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),$[st].usedTimes++;const lt=$[C.__cacheKey];lt!==void 0&&($[C.__cacheKey].usedTimes--,lt.usedTimes===0&&R(_)),C.__cacheKey=st,C.__webglTexture=$[st].texture}return H}function J(C,_,H){return Math.floor(Math.floor(C/H)/_)}function tt(C,_,H,q){const st=C.updateRanges;if(st.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,H,q,_.data);else{st.sort((Rt,dt)=>Rt.start-dt.start);let lt=0;for(let Rt=1;Rt<st.length;Rt++){const dt=st[lt],ut=st[Rt],Pt=dt.start+dt.count,Ut=J(ut.start,_.width,4),zt=J(dt.start,_.width,4);ut.start<=Pt+1&&Ut===zt&&J(ut.start+ut.count-1,_.width,4)===Ut?dt.count=Math.max(dt.count,ut.start+ut.count-dt.start):(++lt,st[lt]=ut)}st.length=lt+1;const j=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),ct=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Rt=0,dt=st.length;Rt<dt;Rt++){const ut=st[Rt],Pt=Math.floor(ut.start/4),Ut=Math.ceil(ut.count/4),zt=Pt%_.width,k=Math.floor(Pt/_.width),ft=Ut,et=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,zt),e.pixelStorei(i.UNPACK_SKIP_ROWS,k),e.texSubImage2D(i.TEXTURE_2D,0,zt,k,ft,et,H,q,_.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,j),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,ct)}}function mt(C,_,H){let q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=i.TEXTURE_3D);const $=Wt(C,_),st=_.source;e.bindTexture(q,C.__webglTexture,i.TEXTURE0+H);const lt=n.get(st);if(st.version!==lt.__version||$===!0){if(e.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const et=ne.getPrimaries(ne.workingColorSpace),ht=_.colorSpace===nr?null:ne.getPrimaries(_.colorSpace),vt=_.colorSpace===nr||et===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let nt=m(_.image,!1,r.maxTextureSize);nt=He(_,nt);const ct=s.convert(_.format,_.colorSpace),Rt=s.convert(_.type);let dt=v(_.internalFormat,ct,Rt,_.normalized,_.colorSpace,_.isVideoTexture);Ft(q,_);let ut;const Pt=_.mipmaps,Ut=_.isVideoTexture!==!0,zt=lt.__version===void 0||$===!0,k=st.dataReady,ft=A(_,nt);if(_.isDepthTexture)dt=S(_.format===Ar,_.type),zt&&(Ut?e.texStorage2D(i.TEXTURE_2D,1,dt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,dt,nt.width,nt.height,0,ct,Rt,null));else if(_.isDataTexture)if(Pt.length>0){Ut&&zt&&e.texStorage2D(i.TEXTURE_2D,ft,dt,Pt[0].width,Pt[0].height);for(let et=0,ht=Pt.length;et<ht;et++)ut=Pt[et],Ut?k&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ut.width,ut.height,ct,Rt,ut.data):e.texImage2D(i.TEXTURE_2D,et,dt,ut.width,ut.height,0,ct,Rt,ut.data);_.generateMipmaps=!1}else Ut?(zt&&e.texStorage2D(i.TEXTURE_2D,ft,dt,nt.width,nt.height),k&&tt(_,nt,ct,Rt)):e.texImage2D(i.TEXTURE_2D,0,dt,nt.width,nt.height,0,ct,Rt,nt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ut&&zt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,dt,Pt[0].width,Pt[0].height,nt.depth);for(let et=0,ht=Pt.length;et<ht;et++)if(ut=Pt[et],_.format!==Yn)if(ct!==null)if(Ut){if(k)if(_.layerUpdates.size>0){const vt=mh(ut.width,ut.height,_.format,_.type);for(const rt of _.layerUpdates){const It=ut.data.subarray(rt*vt/ut.data.BYTES_PER_ELEMENT,(rt+1)*vt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,rt,ut.width,ut.height,1,ct,It)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ut.width,ut.height,nt.depth,ct,ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,dt,ut.width,ut.height,nt.depth,0,ut.data,0,0);else kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?k&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,ut.width,ut.height,nt.depth,ct,Rt,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,dt,ut.width,ut.height,nt.depth,0,ct,Rt,ut.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ut&&zt&&e.texStorage2D(i.TEXTURE_2D,ft,dt,Pt[0].width,Pt[0].height);for(let et=0,ht=Pt.length;et<ht;et++)ut=Pt[et],_.format!==Yn?ct!==null?Ut?k&&e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,ut.width,ut.height,ct,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,et,dt,ut.width,ut.height,0,ut.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?k&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ut.width,ut.height,ct,Rt,ut.data):e.texImage2D(i.TEXTURE_2D,et,dt,ut.width,ut.height,0,ct,Rt,ut.data)}else if(_.isDataArrayTexture)if(Ut){if(zt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,dt,nt.width,nt.height,nt.depth),k)if(_.layerUpdates.size>0){const et=mh(nt.width,nt.height,_.format,_.type);for(const ht of _.layerUpdates){const vt=nt.data.subarray(ht*et/nt.data.BYTES_PER_ELEMENT,(ht+1)*et/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ht,nt.width,nt.height,1,ct,Rt,vt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ct,Rt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,dt,nt.width,nt.height,nt.depth,0,ct,Rt,nt.data);else if(_.isData3DTexture)Ut?(zt&&e.texStorage3D(i.TEXTURE_3D,ft,dt,nt.width,nt.height,nt.depth),k&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ct,Rt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,dt,nt.width,nt.height,nt.depth,0,ct,Rt,nt.data);else if(_.isFramebufferTexture){if(zt)if(Ut)e.texStorage2D(i.TEXTURE_2D,ft,dt,nt.width,nt.height);else{let et=nt.width,ht=nt.height;for(let vt=0;vt<ft;vt++)e.texImage2D(i.TEXTURE_2D,vt,dt,et,ht,0,ct,Rt,null),et>>=1,ht>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const et=i.canvas;if(et.hasAttribute("layoutsubtree")||et.setAttribute("layoutsubtree","true"),nt.parentNode!==et){et.appendChild(nt),h.add(_),et.onpaint=ht=>{const vt=ht.changedElements;for(const rt of h)vt.includes(rt.image)&&(rt.needsUpdate=!0)},et.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{const vt=i.RGBA,rt=i.RGBA,It=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,rt,It,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pt.length>0){if(Ut&&zt){const et=ae(Pt[0]);e.texStorage2D(i.TEXTURE_2D,ft,dt,et.width,et.height)}for(let et=0,ht=Pt.length;et<ht;et++)ut=Pt[et],Ut?k&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,ct,Rt,ut):e.texImage2D(i.TEXTURE_2D,et,dt,ct,Rt,ut);_.generateMipmaps=!1}else if(Ut){if(zt){const et=ae(nt);e.texStorage2D(i.TEXTURE_2D,ft,dt,et.width,et.height)}k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct,Rt,nt)}else e.texImage2D(i.TEXTURE_2D,0,dt,ct,Rt,nt);p(_)&&b(q),lt.__version=st.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Nt(C,_,H){if(_.image.length!==6)return;const q=Wt(C,_),$=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+H);const st=n.get($);if($.version!==st.__version||q===!0){e.activeTexture(i.TEXTURE0+H);const lt=ne.getPrimaries(ne.workingColorSpace),j=_.colorSpace===nr?null:ne.getPrimaries(_.colorSpace),nt=_.colorSpace===nr||lt===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);const ct=_.isCompressedTexture||_.image[0].isCompressedTexture,Rt=_.image[0]&&_.image[0].isDataTexture,dt=[];for(let rt=0;rt<6;rt++)!ct&&!Rt?dt[rt]=m(_.image[rt],!0,r.maxCubemapSize):dt[rt]=Rt?_.image[rt].image:_.image[rt],dt[rt]=He(_,dt[rt]);const ut=dt[0],Pt=s.convert(_.format,_.colorSpace),Ut=s.convert(_.type),zt=v(_.internalFormat,Pt,Ut,_.normalized,_.colorSpace),k=_.isVideoTexture!==!0,ft=st.__version===void 0||q===!0,et=$.dataReady;let ht=A(_,ut);Ft(i.TEXTURE_CUBE_MAP,_);let vt;if(ct){k&&ft&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,zt,ut.width,ut.height);for(let rt=0;rt<6;rt++){vt=dt[rt].mipmaps;for(let It=0;It<vt.length;It++){const Tt=vt[It];_.format!==Yn?Pt!==null?k?et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,0,0,Tt.width,Tt.height,Pt,Tt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,zt,Tt.width,Tt.height,0,Tt.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,0,0,Tt.width,Tt.height,Pt,Ut,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,zt,Tt.width,Tt.height,0,Pt,Ut,Tt.data)}}}else{if(vt=_.mipmaps,k&&ft){vt.length>0&&ht++;const rt=ae(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ht,zt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Rt){k?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,dt[rt].width,dt[rt].height,Pt,Ut,dt[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,zt,dt[rt].width,dt[rt].height,0,Pt,Ut,dt[rt].data);for(let It=0;It<vt.length;It++){const ve=vt[It].image[rt].image;k?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,0,0,ve.width,ve.height,Pt,Ut,ve.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,zt,ve.width,ve.height,0,Pt,Ut,ve.data)}}else{k?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Pt,Ut,dt[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,zt,Pt,Ut,dt[rt]);for(let It=0;It<vt.length;It++){const Tt=vt[It];k?et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,0,0,Pt,Ut,Tt.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,zt,Pt,Ut,Tt.image[rt])}}}p(_)&&b(i.TEXTURE_CUBE_MAP),st.__version=$.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function _t(C,_,H,q,$,st){const lt=s.convert(H.format,H.colorSpace),j=s.convert(H.type),nt=v(H.internalFormat,lt,j,H.normalized,H.colorSpace),ct=n.get(_),Rt=n.get(H);if(Rt.__renderTarget=_,!ct.__hasExternalTextures){const dt=Math.max(1,_.width>>st),ut=Math.max(1,_.height>>st);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,st,nt,dt,ut,_.depth,0,lt,j,null):e.texImage2D($,st,nt,dt,ut,0,lt,j,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),Te(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,$,Rt.__webglTexture,0,te(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,$,Rt.__webglTexture,st),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(C,_,H){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){const q=_.depthTexture,$=q&&q.isDepthTexture?q.type:null,st=S(_.stencilBuffer,$),lt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Te(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te(_),st,_.width,_.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,te(_),st,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,st,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,C)}else{const q=_.textures;for(let $=0;$<q.length;$++){const st=q[$],lt=s.convert(st.format,st.colorSpace),j=s.convert(st.type),nt=v(st.internalFormat,lt,j,st.normalized,st.colorSpace);Te(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te(_),nt,_.width,_.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,te(_),nt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,nt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function fe(C,_,H){const q=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=n.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Ft(i.TEXTURE_CUBE_MAP,_.depthTexture);const ct=s.convert(_.depthTexture.format),Rt=s.convert(_.depthTexture.type);let dt;_.depthTexture.format===Ni?dt=i.DEPTH_COMPONENT24:_.depthTexture.format===Ar&&(dt=i.DEPTH24_STENCIL8);for(let ut=0;ut<6;ut++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,dt,_.width,_.height,0,ct,Rt,null)}}else Z(_.depthTexture,0);const st=$.__webglTexture,lt=te(_),j=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,nt=_.depthTexture.format===Ar?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ni)Te(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,j,st,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,j,st,0);else if(_.depthTexture.format===Ar)Te(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,j,st,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,j,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Bt(C){const _=n.get(C),H=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){const q=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",$)};q.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=q}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(H)for(let q=0;q<6;q++)fe(_.__webglFramebuffer[q],C,q);else{const q=C.texture.mipmaps;q&&q.length>0?fe(_.__webglFramebuffer[0],C,0):fe(_.__webglFramebuffer,C,0)}else if(H){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=i.createRenderbuffer(),Lt(_.__webglDepthbuffer[q],C,!1);else{const $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,st)}}else{const q=C.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Lt(_.__webglDepthbuffer,C,!1);else{const $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,st)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function $t(C,_,H){const q=n.get(C);_!==void 0&&_t(q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Bt(C)}function Qt(C){const _=C.texture,H=n.get(C),q=n.get(_);C.addEventListener("dispose",x);const $=C.textures,st=C.isWebGLCubeRenderTarget===!0,lt=$.length>1;if(lt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=_.version,a.memory.textures++),st){H.__webglFramebuffer=[];for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer[j]=[];for(let nt=0;nt<_.mipmaps.length;nt++)H.__webglFramebuffer[j][nt]=i.createFramebuffer()}else H.__webglFramebuffer[j]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer=[];for(let j=0;j<_.mipmaps.length;j++)H.__webglFramebuffer[j]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(lt)for(let j=0,nt=$.length;j<nt;j++){const ct=n.get($[j]);ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Te(C)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let j=0;j<$.length;j++){const nt=$[j];H.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[j]);const ct=s.convert(nt.format,nt.colorSpace),Rt=s.convert(nt.type),dt=v(nt.internalFormat,ct,Rt,nt.normalized,nt.colorSpace,C.isXRRenderTarget===!0),ut=te(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,dt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,H.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),Lt(H.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(st){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ft(i.TEXTURE_CUBE_MAP,_);for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0)for(let nt=0;nt<_.mipmaps.length;nt++)_t(H.__webglFramebuffer[j][nt],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,nt);else _t(H.__webglFramebuffer[j],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);p(_)&&b(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let j=0,nt=$.length;j<nt;j++){const ct=$[j],Rt=n.get(ct);let dt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(dt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,Rt.__webglTexture),Ft(dt,ct),_t(H.__webglFramebuffer,C,ct,i.COLOR_ATTACHMENT0+j,dt,0),p(ct)&&b(dt)}e.unbindTexture()}else{let j=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(j=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,q.__webglTexture),Ft(j,_),_.mipmaps&&_.mipmaps.length>0)for(let nt=0;nt<_.mipmaps.length;nt++)_t(H.__webglFramebuffer[nt],C,_,i.COLOR_ATTACHMENT0,j,nt);else _t(H.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,j,0);p(_)&&b(j),e.unbindTexture()}C.depthBuffer&&Bt(C)}function Ht(C){const _=C.textures;for(let H=0,q=_.length;H<q;H++){const $=_[H];if(p($)){const st=M(C),lt=n.get($).__webglTexture;e.bindTexture(st,lt),b(st),e.unbindTexture()}}}const se=[],me=[];function Oe(C){if(C.samples>0){if(Te(C)===!1){const _=C.textures,H=C.width,q=C.height;let $=i.COLOR_BUFFER_BIT;const st=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(C),j=_.length>1;if(j)for(let ct=0;ct<_.length;ct++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const nt=C.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ct=0;ct<_.length;ct++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ct]);const Rt=n.get(_[ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Rt,0)}i.blitFramebuffer(0,0,H,q,0,0,H,q,$,i.NEAREST),l===!0&&(se.length=0,me.length=0,se.push(i.COLOR_ATTACHMENT0+ct),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(se.push(st),me.push(st),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,me)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,se))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let ct=0;ct<_.length;ct++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ct]);const Rt=n.get(_[ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,Rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){const _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function te(C){return Math.min(r.maxSamples,C.samples)}function Te(C){const _=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function B(C){const _=a.render.frame;u.get(C)!==_&&(u.set(C,_),C.update())}function He(C,_){const H=C.colorSpace,q=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==Lo&&H!==nr&&(ne.getTransfer(H)===pe?(q!==Yn||$!==En)&&kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ce("WebGLTextures: Unsupported texture color space:",H)),_}function ae(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.getTextureUnits=L,this.setTextureUnits=P,this.setTexture2D=Z,this.setTexture2DArray=V,this.setTexture3D=Y,this.setTextureCube=Q,this.rebindTextures=$t,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Bt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Te,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function uw(i,t){function e(n,r=nr){let s;const a=ne.getTransfer(r);if(n===En)return i.UNSIGNED_BYTE;if(n===Fu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ou)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bp)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===wp)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===_p)return i.BYTE;if(n===vp)return i.SHORT;if(n===ca)return i.UNSIGNED_SHORT;if(n===Du)return i.INT;if(n===hi)return i.UNSIGNED_INT;if(n===Kn)return i.FLOAT;if(n===di)return i.HALF_FLOAT;if(n===Ap)return i.ALPHA;if(n===Sp)return i.RGB;if(n===Yn)return i.RGBA;if(n===Ni)return i.DEPTH_COMPONENT;if(n===Ar)return i.DEPTH_STENCIL;if(n===Bu)return i.RED;if(n===ku)return i.RED_INTEGER;if(n===Fr)return i.RG;if(n===Gu)return i.RG_INTEGER;if(n===Hu)return i.RGBA_INTEGER;if(n===vo||n===bo||n===wo||n===Ao)if(a===pe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===vo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===bo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ao)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===vo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===bo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ao)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mc||n===Tc||n===Cc||n===Rc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Mc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Tc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Cc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Rc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pc||n===Ic||n===Nc||n===Lc||n===Uc||n===Io||n===Dc)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Pc||n===Ic)return a===pe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Nc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Lc)return s.COMPRESSED_R11_EAC;if(n===Uc)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Io)return s.COMPRESSED_RG11_EAC;if(n===Dc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Fc||n===Oc||n===Bc||n===kc||n===Gc||n===Hc||n===zc||n===Vc||n===Wc||n===Xc||n===qc||n===Kc||n===Yc||n===Jc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Fc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Bc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===kc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Gc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Hc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===zc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Kc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Yc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jc)return a===pe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qc||n===Zc||n===$c)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Qc)return a===pe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$c)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jc||n===tu||n===No||n===eu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===jc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===tu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===No)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===eu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ua?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const fw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,hw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Lp(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Zn({vertexShader:fw,fragmentShader:hw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ln(new Ea(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pw extends Hr{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const y=typeof XRWebGLBinding<"u",m=new dw,p={},b=e.getContextAttributes();let M=null,v=null;const S=[],A=[],T=new Zt;let x=null,E=null;const R=new In;R.viewport=new Pe;const I=new In;I.viewport=new Pe;const N=[R,I],U=new wy;let L=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let tt=S[J];return tt===void 0&&(tt=new Pl,S[J]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(J){let tt=S[J];return tt===void 0&&(tt=new Pl,S[J]=tt),tt.getGripSpace()},this.getHand=function(J){let tt=S[J];return tt===void 0&&(tt=new Pl,S[J]=tt),tt.getHandSpace()};function O(J){const tt=A.indexOf(J.inputSource);if(tt===-1)return;const mt=S[tt];mt!==void 0&&(mt.update(J.inputSource,J.frame,c||a),mt.dispatchEvent({type:J.type,data:J.inputSource}))}function G(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",Z);for(let J=0;J<S.length;J++){const tt=A[J];tt!==null&&(A[J]=null,S[J].disconnect(tt))}L=null,P=null,m.reset();for(const J in p)delete p[J];if(t.setRenderTarget(M),d=null,f=null,h=null,r=null,v=null,Wt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(T.width,T.height,!1),E!==null){const J=E.camera;J.fov=E.fov,J.zoom=E.zoom,J.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(r,e)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(M=t.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",G),r.addEventListener("inputsourceschange",Z),b.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(T),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,Nt=null,_t=null;b.depth&&(_t=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=b.stencil?Ar:Ni,Nt=b.stencil?ua:hi);const Lt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(Lt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new Jn(f.textureWidth,f.textureHeight,{format:Yn,type:En,depthTexture:new da(f.textureWidth,f.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const mt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,mt),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Jn(d.framebufferWidth,d.framebufferHeight,{format:Yn,type:En,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Wt.setContext(r),Wt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Z(J){for(let tt=0;tt<J.removed.length;tt++){const mt=J.removed[tt],Nt=A.indexOf(mt);Nt>=0&&(A[Nt]=null,S[Nt].disconnect(mt))}for(let tt=0;tt<J.added.length;tt++){const mt=J.added[tt];let Nt=A.indexOf(mt);if(Nt===-1){for(let Lt=0;Lt<S.length;Lt++)if(Lt>=A.length){A.push(mt),Nt=Lt;break}else if(A[Lt]===null){A[Lt]=mt,Nt=Lt;break}if(Nt===-1)break}const _t=S[Nt];_t&&_t.connect(mt)}}const V=new z,Y=new z;function Q(J,tt,mt){V.setFromMatrixPosition(tt.matrixWorld),Y.setFromMatrixPosition(mt.matrixWorld);const Nt=V.distanceTo(Y),_t=tt.projectionMatrix.elements,Lt=mt.projectionMatrix.elements,fe=_t[14]/(_t[10]-1),Bt=_t[14]/(_t[10]+1),$t=(_t[9]+1)/_t[5],Qt=(_t[9]-1)/_t[5],Ht=(_t[8]-1)/_t[0],se=(Lt[8]+1)/Lt[0],me=fe*Ht,Oe=fe*se,te=Nt/(-Ht+se),Te=te*-Ht;if(tt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Te),J.translateZ(te),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),_t[10]===-1)J.projectionMatrix.copy(tt.projectionMatrix),J.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const B=fe+te,He=Bt+te,ae=me-Te,C=Oe+(Nt-Te),_=$t*Bt/He*B,H=Qt*Bt/He*B;J.projectionMatrix.makePerspective(ae,C,_,H,B,He),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function at(J,tt){tt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(tt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let tt=J.near,mt=J.far;m.texture!==null&&(m.depthNear>0&&(tt=m.depthNear),m.depthFar>0&&(mt=m.depthFar)),U.near=I.near=R.near=tt,U.far=I.far=R.far=mt,(L!==U.near||P!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),L=U.near,P=U.far),U.layers.mask=J.layers.mask|6,R.layers.mask=U.layers.mask&-5,I.layers.mask=U.layers.mask&-3;const Nt=J.parent,_t=U.cameras;at(U,Nt);for(let Lt=0;Lt<_t.length;Lt++)at(_t[Lt],Nt);_t.length===2?Q(U,R,I):U.projectionMatrix.copy(R.projectionMatrix),E===null&&J.isPerspectiveCamera&&(E={camera:J,fov:J.fov,zoom:J.zoom}),ot(J,U,Nt)};function ot(J,tt,mt){mt===null?J.matrix.copy(tt.matrixWorld):(J.matrix.copy(mt.matrixWorld),J.matrix.invert(),J.matrix.multiply(tt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(tt.projectionMatrix),J.projectionMatrixInverse.copy(tt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=iu*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(J){l=J,f!==null&&(f.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(J){return p[J]};let Ot=null;function Ft(J,tt){if(u=tt.getViewerPose(c||a),g=tt,u!==null){const mt=u.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Nt=!1;mt.length!==U.cameras.length&&(U.cameras.length=0,Nt=!0);for(let Bt=0;Bt<mt.length;Bt++){const $t=mt[Bt];let Qt=null;if(d!==null)Qt=d.getViewport($t);else{const se=h.getViewSubImage(f,$t);Qt=se.viewport,Bt===0&&(t.setRenderTargetTextures(v,se.colorTexture,se.depthStencilTexture),t.setRenderTarget(v))}let Ht=N[Bt];Ht===void 0&&(Ht=new In,Ht.layers.enable(Bt),Ht.viewport=new Pe,N[Bt]=Ht),Ht.matrix.fromArray($t.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray($t.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Bt===0&&(U.matrix.copy(Ht.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Nt===!0&&U.cameras.push(Ht)}const _t=r.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){h=n.getBinding();const Bt=h.getDepthInformation(mt[0]);Bt&&Bt.isValid&&Bt.texture&&m.init(Bt,r.renderState)}if(_t&&_t.includes("camera-access")&&y){t.state.unbindTexture(),h=n.getBinding();for(let Bt=0;Bt<mt.length;Bt++){const $t=mt[Bt].camera;if($t){let Qt=p[$t];Qt||(Qt=new Lp,p[$t]=Qt);const Ht=h.getCameraImage($t);Qt.sourceTexture=Ht}}}}for(let mt=0;mt<S.length;mt++){const Nt=A[mt],_t=S[mt];Nt!==null&&_t!==void 0&&_t.update(Nt,tt,c||a)}Ot&&Ot(J,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const Wt=new Op;Wt.setAnimationLoop(Ft),this.setAnimationLoop=function(J){Ot=J},this.dispose=function(){}}}const mw=new Se,Wp=new Gt;Wp.set(-1,0,0,0,1,0,0,0,1);function gw(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Up(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,M,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),y(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===yn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===yn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),M=b.envMap,v=b.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(mw.makeRotationFromEuler(v)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Wp),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===yn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function yw(i,t,e,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,S){const A=S.program;n.uniformBlockBinding(v,A)}function c(v,S){let A=r[v.id];A===void 0&&(m(v),A=u(v),r[v.id]=A,v.addEventListener("dispose",b));const T=S.program;n.updateUBOMapping(v,T);const x=t.render.frame;s[v.id]!==x&&(f(v),s[v.id]=x)}function u(v){const S=h();v.__bindingPointIndex=S;const A=i.createBuffer(),T=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,T,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,A),A}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const S=r[v.id],A=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let x=0,E=A.length;x<E;x++){const R=A[x];if(Array.isArray(R))for(let I=0,N=R.length;I<N;I++)d(R[I],x,I,T);else d(R,x,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,S,A,T){if(y(v,S,A,T)===!0){const x=v.__offset,E=v.value;if(Array.isArray(E)){let R=0;for(let I=0;I<E.length;I++){const N=E[I],U=p(N);g(N,v.__data,R),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(R+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function g(v,S,A){typeof v=="number"||typeof v=="boolean"?S[0]=v:v.isMatrix3?(S[0]=v.elements[0],S[1]=v.elements[1],S[2]=v.elements[2],S[3]=0,S[4]=v.elements[3],S[5]=v.elements[4],S[6]=v.elements[5],S[7]=0,S[8]=v.elements[6],S[9]=v.elements[7],S[10]=v.elements[8],S[11]=0):ArrayBuffer.isView(v)?S.set(new v.constructor(v.buffer,v.byteOffset,S.length)):v.toArray(S,A)}function y(v,S,A,T){const x=v.value,E=S+"_"+A;if(T[E]===void 0)return typeof x=="number"||typeof x=="boolean"?T[E]=x:ArrayBuffer.isView(x)?T[E]=x.slice():T[E]=x.clone(),!0;{const R=T[E];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return T[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(v){const S=v.uniforms;let A=0;const T=16;for(let E=0,R=S.length;E<R;E++){const I=Array.isArray(S[E])?S[E]:[S[E]];for(let N=0,U=I.length;N<U;N++){const L=I[N],P=Array.isArray(L.value)?L.value:[L.value];for(let O=0,G=P.length;O<G;O++){const Z=P[O],V=p(Z),Y=A%T,Q=Y%V.boundary,at=Y+Q;A+=Q,at!==0&&T-at<V.storage&&(A+=T-at),L.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=A,A+=V.storage}}}const x=A%T;return x>0&&(A+=T-x),v.__size=A,v.__cache={},this}function p(v){const S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=48,S.storage=48):v.isMatrix4?(S.boundary=64,S.storage=64):v.isTexture?kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):kt("WebGLRenderer: Unsupported uniform value type.",v),S}function b(v){const S=v.target;S.removeEventListener("dispose",b);const A=a.indexOf(S.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function M(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:M}}const xw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ni=null;function _w(){return ni===null&&(ni=new Ip(xw,16,16,Fr,di),ni.name="DFG_LUT",ni.minFilter=rn,ni.magFilter=rn,ni.wrapS=Si,ni.wrapT=Si,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}class vw{constructor(t={}){const{canvas:e=D0(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=En}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=d,m=new Set([Hu,Gu,ku]),p=new Set([En,hi,ca,ua,Fu,Ou]),b=new Uint32Array(4),M=new Int32Array(4),v=new z;let S=null,A=null;const T=[],x=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let I=!1,N=null,U=null,L=null,P=null;this._outputColorSpace=Sn;let O=0,G=0,Z=null,V=-1,Y=null;const Q=new Pe,at=new Pe;let ot=null;const Ot=new Yt(0);let Ft=0,Wt=e.width,J=e.height,tt=1,mt=null,Nt=null;const _t=new Pe(0,0,Wt,J),Lt=new Pe(0,0,Wt,J);let fe=!1;const Bt=new qu;let $t=!1,Qt=!1;const Ht=new Se,se=new z,me=new Pe,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let te=!1;function Te(){return Z===null?tt:1}let B=n;function He(w,D){return e.getContext(w,D)}let ae,C,_,H,q,$,st,lt,j,nt,ct,Rt,dt,ut,Pt,Ut,zt,k,ft,et,ht,vt,rt;try{const w={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Lu}`),e.addEventListener("webglcontextlost",ve,!1),e.addEventListener("webglcontextrestored",he,!1),e.addEventListener("webglcontextcreationerror",Fn,!1),B===null){const D="webgl2";if(B=He(D,w),B===null)throw He(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(w){throw e.removeEventListener("webglcontextlost",ve,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",Fn,!1),ce("WebGLRenderer: "+w.message),w}function It(){ae=new _v(B),ae.init(),ht=new uw(B,ae),C=new cv(B,ae,t,ht),_=new lw(B,ae),C.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),U=B.createFramebuffer(),L=B.createFramebuffer(),P=B.createFramebuffer(),H=new wv(B),q=new Yb,$=new cw(B,ae,_,q,C,ht,H),st=new xv(R),lt=new Sy(B),vt=new ov(B,lt),j=new vv(B,lt,H,vt),nt=new Sv(B,j,lt,vt,H),k=new Av(B,C,$),Pt=new uv(q),ct=new Kb(R,st,ae,C,vt,Pt),Rt=new gw(R,q),dt=new Qb,ut=new nw(ae),zt=new av(R,st,_,nt,g,l),Ut=new ow(R,nt,C),rt=new yw(B,H,C,_),ft=new lv(B,ae,H),et=new bv(B,ae,H),H.programs=ct.programs,R.capabilities=C,R.extensions=ae,R.properties=q,R.renderLists=dt,R.shadowMap=Ut,R.state=_,R.info=H}y!==En&&(E=new Mv(y,e.width,e.height,o,r,s));const Tt=new pw(R,B);this.xr=Tt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const w=ae.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=ae.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(w){w!==void 0&&(tt=w,this.setSize(Wt,J,!1))},this.getSize=function(w){return w.set(Wt,J)},this.setSize=function(w,D,K=!0){if(Tt.isPresenting){kt("WebGLRenderer: Can't change size while VR device is presenting.");return}Wt=w,J=D,e.width=Math.floor(w*tt),e.height=Math.floor(D*tt),K===!0&&(e.style.width=w+"px",e.style.height=D+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,w,D)},this.getDrawingBufferSize=function(w){return w.set(Wt*tt,J*tt).floor()},this.setDrawingBufferSize=function(w,D,K){Wt=w,J=D,tt=K,e.width=Math.floor(w*K),e.height=Math.floor(D*K),this.setViewport(0,0,w,D)},this.setEffects=function(w){if(y===En){ce("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let D=0;D<w.length;D++)if(w[D].isOutputPass===!0){kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(Q)},this.getViewport=function(w){return w.copy(_t)},this.setViewport=function(w,D,K,W){w.isVector4?_t.set(w.x,w.y,w.z,w.w):_t.set(w,D,K,W),_.viewport(Q.copy(_t).multiplyScalar(tt).round())},this.getScissor=function(w){return w.copy(Lt)},this.setScissor=function(w,D,K,W){w.isVector4?Lt.set(w.x,w.y,w.z,w.w):Lt.set(w,D,K,W),_.scissor(at.copy(Lt).multiplyScalar(tt).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(w){_.setScissorTest(fe=w)},this.setOpaqueSort=function(w){mt=w},this.setTransparentSort=function(w){Nt=w},this.getClearColor=function(w){return w.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor(...arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha(...arguments)},this.clear=function(w=!0,D=!0,K=!0){let W=0;if(w){let X=!1;if(Z!==null){const yt=Z.texture.format;X=m.has(yt)}if(X){const yt=Z.texture.type,At=p.has(yt),gt=zt.getClearColor(),Et=zt.getClearAlpha(),Ct=gt.r,Xt=gt.g,jt=gt.b;At?(b[0]=Ct,b[1]=Xt,b[2]=jt,b[3]=Et,B.clearBufferuiv(B.COLOR,0,b)):(M[0]=Ct,M[1]=Xt,M[2]=jt,M[3]=Et,B.clearBufferiv(B.COLOR,0,M))}else W|=B.COLOR_BUFFER_BIT}D&&(W|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(W|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&B.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),N=w},this.dispose=function(){e.removeEventListener("webglcontextlost",ve,!1),e.removeEventListener("webglcontextrestored",he,!1),e.removeEventListener("webglcontextcreationerror",Fn,!1),zt.dispose(),dt.dispose(),ut.dispose(),q.dispose(),st.dispose(),nt.dispose(),vt.dispose(),rt.dispose(),ct.dispose(),Tt.dispose(),Tt.removeEventListener("sessionstart",Rf),Tt.removeEventListener("sessionend",Pf),lr.stop()};function ve(w){w.preventDefault(),Xf("WebGLRenderer: Context Lost."),I=!0}function he(){Xf("WebGLRenderer: Context Restored."),I=!1;const w=H.autoReset,D=Ut.enabled,K=Ut.autoUpdate,W=Ut.needsUpdate,X=Ut.type;It(),H.autoReset=w,Ut.enabled=D,Ut.autoUpdate=K,Ut.needsUpdate=W,Ut.type=X}function Fn(w){ce("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function jn(w){const D=w.target;D.removeEventListener("dispose",jn),zg(D)}function zg(w){Vg(w),q.remove(w)}function Vg(w){const D=q.get(w).programs;D!==void 0&&(D.forEach(function(K){ct.releaseProgram(K)}),w.isShaderMaterial&&ct.releaseShaderCache(w))}this.renderBufferDirect=function(w,D,K,W,X,yt){D===null&&(D=Oe);const At=X.isMesh&&X.matrixWorld.determinantAffine()<0,gt=qg(w,D,K,W,X);_.setMaterial(W,At);let Et=K.index,Ct=1;if(W.wireframe===!0){if(Et=j.getWireframeAttribute(K),Et===void 0)return;Ct=2}const Xt=K.drawRange,jt=K.attributes.position;let Mt=Xt.start*Ct,de=(Xt.start+Xt.count)*Ct;yt!==null&&(Mt=Math.max(Mt,yt.start*Ct),de=Math.min(de,(yt.start+yt.count)*Ct)),Et!==null?(Mt=Math.max(Mt,0),de=Math.min(de,Et.count)):jt!=null&&(Mt=Math.max(Mt,0),de=Math.min(de,jt.count));const Be=de-Mt;if(Be<0||Be===1/0)return;vt.setup(X,W,gt,K,Et);let Ae,xe=ft;if(Et!==null&&(Ae=lt.get(Et),xe=et,xe.setIndex(Ae)),X.isMesh)W.wireframe===!0?(_.setLineWidth(W.wireframeLinewidth*Te()),xe.setMode(B.LINES)):xe.setMode(B.TRIANGLES);else if(X.isLine){let tn=W.linewidth;tn===void 0&&(tn=1),_.setLineWidth(tn*Te()),X.isLineSegments?xe.setMode(B.LINES):X.isLineLoop?xe.setMode(B.LINE_LOOP):xe.setMode(B.LINE_STRIP)}else X.isPoints?xe.setMode(B.POINTS):X.isSprite&&xe.setMode(B.TRIANGLES);if(X.isBatchedMesh)if(ae.get("WEBGL_multi_draw"))xe.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const tn=X._multiDrawStarts,wt=X._multiDrawCounts,sn=X._multiDrawCount,oe=Et?lt.get(Et).bytesPerElement:1,Tn=q.get(W).currentProgram.getUniforms();for(let ti=0;ti<sn;ti++)Tn.setValue(B,"_gl_DrawID",ti),xe.render(tn[ti]/oe,wt[ti])}else if(X.isInstancedMesh)xe.renderInstances(Mt,Be,X.count);else if(K.isInstancedBufferGeometry){const tn=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,wt=Math.min(K.instanceCount,tn);xe.renderInstances(Mt,Be,wt)}else xe.render(Mt,Be)};function Cf(w,D,K,W){N!==null&&w.isNodeMaterial&&N.setObject(W,w),$t===!0&&Pt.setState(w,K,!1),w.transparent===!0&&w.side===si&&w.forceSinglePass===!1?(w.side=yn,w.needsUpdate=!0,Fa(w,D,W),w.side=Ur,w.needsUpdate=!0,Fa(w,D,W),w.side=si):Fa(w,D,W)}this.compile=function(w,D,K=null){K===null&&(K=w),N!==null&&N.renderStart(w,D,K),A=ut.get(K),A.init(D),x.push(A),K.traverseVisible(function(X){X.isLight&&X.layers.test(D.layers)&&(A.pushLight(X),X.castShadow&&A.pushShadow(X))}),w!==K&&w.traverseVisible(function(X){X.isLight&&X.layers.test(D.layers)&&(A.pushLight(X),X.castShadow&&A.pushShadow(X))}),A.setupLights(),N!==null&&N.updateLights(A.state.lightsArray),Qt=this.localClippingEnabled,$t=Pt.init(this.clippingPlanes,Qt),$t===!0&&Pt.setGlobalState(this.clippingPlanes,D),N!==null&&Ut.render(A.state.shadowsArray,K,D);const W=new Set;return w.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const yt=X.material;if(yt)if(Array.isArray(yt))for(let At=0;At<yt.length;At++){const gt=yt[At];Cf(gt,K,D,X),W.add(gt)}else Cf(yt,K,D,X),W.add(yt)}),A=x.pop(),N!==null&&N.renderEnd(),W},this.compileAsync=function(w,D,K=null){const W=this.compile(w,D,K);return new Promise(X=>{function yt(){if(W.forEach(function(At){const Et=q.get(At).currentProgram;(Et===void 0||Et.isReady())&&W.delete(At)}),W.size===0){X(w);return}setTimeout(yt,10)}ae.get("KHR_parallel_shader_compile")!==null?yt():setTimeout(yt,10)})};let gl=null;function Wg(w){gl&&gl(w)}function Rf(){lr.stop()}function Pf(){lr.start()}const lr=new Op;lr.setAnimationLoop(Wg),typeof self<"u"&&lr.setContext(self),this.setAnimationLoop=function(w){gl=w,Tt.setAnimationLoop(w),w===null?lr.stop():lr.start()},Tt.addEventListener("sessionstart",Rf),Tt.addEventListener("sessionend",Pf),this.render=function(w,D){if(D!==void 0&&D.isCamera!==!0){ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;N!==null&&N.renderStart(w,D);const K=Tt.enabled===!0&&Tt.isPresenting===!0,W=E!==null&&(Z===null||K)&&E.begin(R,Z);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Tt.enabled===!0&&Tt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Tt.cameraAutoUpdate===!0&&Tt.updateCamera(D),D=Tt.getCamera()),w.isScene===!0&&w.onBeforeRender(R,w,D,Z),A=ut.get(w,x.length),A.init(D),A.state.textureUnits=$.getTextureUnits(),x.push(A),Ht.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Bt.setFromProjectionMatrix(Ht,li,D.reversedDepth),Qt=this.localClippingEnabled,$t=Pt.init(this.clippingPlanes,Qt),S=dt.get(w,T.length),S.init(),T.push(S),Tt.enabled===!0&&Tt.isPresenting===!0){const At=R.xr.getDepthSensingMesh();At!==null&&yl(At,D,-1/0,R.sortObjects)}yl(w,D,0,R.sortObjects),S.finish(),N!==null&&N.updateLights(A.state.lightsArray),R.sortObjects===!0&&S.sort(mt,Nt),te=Tt.enabled===!1||Tt.isPresenting===!1||Tt.hasDepthSensing()===!1,te&&zt.addToRenderList(S,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$t===!0&&Pt.beginShadows();const X=A.state.shadowsArray;if(Ut.render(X,w,D),$t===!0&&Pt.endShadows(),(W&&E.hasRenderPass())===!1){const At=S.opaque,gt=S.transmissive;if(A.setupLights(),D.isArrayCamera){const Et=D.cameras;if(gt.length>0)for(let Ct=0,Xt=Et.length;Ct<Xt;Ct++){const jt=Et[Ct];Nf(At,gt,w,jt)}te&&zt.render(w);for(let Ct=0,Xt=Et.length;Ct<Xt;Ct++){const jt=Et[Ct];If(S,w,jt,jt.viewport)}}else gt.length>0&&Nf(At,gt,w,D),te&&zt.render(w),If(S,w,D)}Z!==null&&G===0&&($.updateMultisampleRenderTarget(Z),$.updateRenderTargetMipmap(Z)),W&&E.end(R),w.isScene===!0&&w.onAfterRender(R,w,D),vt.resetDefaultState(),V=-1,Y=null,x.pop(),x.length>0?(A=x[x.length-1],$.setTextureUnits(A.state.textureUnits),$t===!0&&Pt.setGlobalState(R.clippingPlanes,A.state.camera)):A=null,T.pop(),T.length>0?S=T[T.length-1]:S=null,N!==null&&N.renderEnd()};function yl(w,D,K,W){if(w.visible===!1)return;if(w.layers.test(D.layers)){if(w.isGroup)K=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(D);else if(w.isLightProbeGrid)A.pushLightProbeGrid(w);else if(w.isLight)A.pushLight(w),w.castShadow&&A.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Bt)){W&&me.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ht);const At=nt.update(w),gt=w.material;gt.visible&&S.push(w,At,gt,K,me.z,null,D)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Bt))){const At=nt.update(w),gt=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),me.copy(w.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),me.copy(At.boundingSphere.center)),me.applyMatrix4(w.matrixWorld).applyMatrix4(Ht)),Array.isArray(gt)){const Et=At.groups;for(let Ct=0,Xt=Et.length;Ct<Xt;Ct++){const jt=Et[Ct],Mt=gt[jt.materialIndex];Mt&&Mt.visible&&S.push(w,At,Mt,K,me.z,jt,D)}}else gt.visible&&S.push(w,At,gt,K,me.z,null,D)}}const yt=w.children;for(let At=0,gt=yt.length;At<gt;At++)yl(yt[At],D,K,W)}function If(w,D,K,W){const{opaque:X,transmissive:yt,transparent:At}=w;A.setupLightsView(K),$t===!0&&Pt.setGlobalState(R.clippingPlanes,K),W&&_.viewport(Q.copy(W)),X.length>0&&Da(X,D,K),yt.length>0&&Da(yt,D,K),At.length>0&&Da(At,D,K),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Nf(w,D,K,W){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[W.id]===void 0){const Mt=ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[W.id]=new Jn(1,1,{generateMipmaps:!0,type:Mt?di:En,minFilter:wr,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ne.workingColorSpace})}const yt=A.state.transmissionRenderTarget[W.id],At=W.viewport||Q;yt.setSize(At.z*R.transmissionResolutionScale,At.w*R.transmissionResolutionScale);const gt=R.getRenderTarget(),Et=R.getActiveCubeFace(),Ct=R.getActiveMipmapLevel();R.setRenderTarget(yt),R.getClearColor(Ot),Ft=R.getClearAlpha(),Ft<1&&R.setClearColor(16777215,.5),R.clear(),te&&zt.render(K);const Xt=R.toneMapping;R.toneMapping=ci;const jt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),A.setupLightsView(W),$t===!0&&Pt.setGlobalState(R.clippingPlanes,W),Da(w,K,W),$.updateMultisampleRenderTarget(yt),$.updateRenderTargetMipmap(yt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let de=0,Be=D.length;de<Be;de++){const Ae=D[de],{object:xe,geometry:tn,material:wt,group:sn}=Ae;if(wt.side===si&&xe.layers.test(W.layers)){const oe=wt.side;wt.side=yn,wt.needsUpdate=!0,Lf(xe,K,W,tn,wt,sn),wt.side=oe,wt.needsUpdate=!0,Mt=!0}}Mt===!0&&($.updateMultisampleRenderTarget(yt),$.updateRenderTargetMipmap(yt))}R.setRenderTarget(gt,Et,Ct),R.setClearColor(Ot,Ft),jt!==void 0&&(W.viewport=jt),R.toneMapping=Xt}function Da(w,D,K){const W=D.isScene===!0?D.overrideMaterial:null;for(let X=0,yt=w.length;X<yt;X++){const At=w[X],{object:gt,geometry:Et,group:Ct}=At;let Xt=At.material;Xt.allowOverride===!0&&W!==null&&(Xt=W),gt.layers.test(K.layers)&&Lf(gt,D,K,Et,Xt,Ct)}}function Lf(w,D,K,W,X,yt){N!==null&&X.isNodeMaterial&&N.setObject(w,X),w.onBeforeRender(R,D,K,W,X,yt),w.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),X.onBeforeRender(R,D,K,W,w,yt),X.transparent===!0&&X.side===si&&X.forceSinglePass===!1?(X.side=yn,X.needsUpdate=!0,R.renderBufferDirect(K,D,W,X,w,yt),X.side=Ur,X.needsUpdate=!0,R.renderBufferDirect(K,D,W,X,w,yt),X.side=si):R.renderBufferDirect(K,D,W,X,w,yt),w.onAfterRender(R,D,K,W,X,yt)}function Fa(w,D,K){D.isScene!==!0&&(D=Oe);const W=q.get(w),X=A.state.lights,yt=A.state.shadowsArray,At=X.state.version,gt=ct.getParameters(w,X.state,yt,D,K,A.state.lightProbeGridArray),Et=ct.getProgramCacheKey(gt);let Ct=W.programs;W.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?D.environment:null,W.fog=D.fog;const Xt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;W.envMap=st.get(w.envMap||W.environment,Xt),W.envMapRotation=W.environment!==null&&w.envMap===null?D.environmentRotation:w.envMapRotation,Ct===void 0&&(w.addEventListener("dispose",jn),Ct=new Map,W.programs=Ct);let jt=Ct.get(Et);if(jt!==void 0){if(W.currentProgram===jt&&W.lightsStateVersion===At)return Df(w,gt),jt}else gt.uniforms=ct.getUniforms(w),N!==null&&w.isNodeMaterial&&N.build(w,K,gt),w.onBeforeCompile(gt,R),jt=ct.acquireProgram(gt,Et),Ct.set(Et,jt),W.uniforms=gt.uniforms;const Mt=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Mt.clippingPlanes=Pt.uniform),Df(w,gt),W.needsLights=Yg(w),W.lightsStateVersion=At,W.needsLights&&(Mt.ambientLightColor.value=X.state.ambient,Mt.lightProbe.value=X.state.probe,Mt.sunLights.value=X.state.sun,Mt.sunLightShadows.value=X.state.sunShadow,Mt.directionalLights.value=X.state.directional,Mt.directionalLightShadows.value=X.state.directionalShadow,Mt.spotLights.value=X.state.spot,Mt.spotLightShadows.value=X.state.spotShadow,Mt.rectAreaLights.value=X.state.rectArea,Mt.ltc_1.value=X.state.rectAreaLTC1,Mt.ltc_2.value=X.state.rectAreaLTC2,Mt.pointLights.value=X.state.point,Mt.pointLightShadows.value=X.state.pointShadow,Mt.hemisphereLights.value=X.state.hemi,Mt.sunShadowMatrix.value=X.state.sunShadowMatrix,Mt.sunShadowCascade.value=X.state.sunShadowCascade,Mt.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Mt.spotLightMatrix.value=X.state.spotLightMatrix,Mt.spotLightMap.value=X.state.spotLightMap,Mt.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=A.state.lightProbeGridArray.length>0,W.currentProgram=jt,W.uniformsList=null,jt}function Uf(w){if(w.uniformsList===null){const D=w.currentProgram.getUniforms();w.uniformsList=So.seqWithValue(D.seq,w.uniforms)}return w.uniformsList}function Df(w,D){const K=q.get(w);K.outputColorSpace=D.outputColorSpace,K.batching=D.batching,K.batchingColor=D.batchingColor,K.instancing=D.instancing,K.instancingColor=D.instancingColor,K.instancingMorph=D.instancingMorph,K.skinning=D.skinning,K.morphTargets=D.morphTargets,K.morphNormals=D.morphNormals,K.morphColors=D.morphColors,K.morphTargetsCount=D.morphTargetsCount,K.numClippingPlanes=D.numClippingPlanes,K.numIntersection=D.numClipIntersection,K.vertexAlphas=D.vertexAlphas,K.vertexTangents=D.vertexTangents,K.toneMapping=D.toneMapping}function Xg(w,D){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;v.setFromMatrixPosition(D.matrixWorld);for(let K=0,W=w.length;K<W;K++){const X=w[K];if(X.texture!==null&&X.boundingBox.containsPoint(v))return X}return null}function qg(w,D,K,W,X){D.isScene!==!0&&(D=Oe),$.resetTextureUnits();const yt=D.fog,At=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?D.environment:null,gt=Z===null?R.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:ne.workingColorSpace,Et=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ct=st.get(W.envMap||At,Et),Xt=W.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,jt=!!K.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Mt=!!K.morphAttributes.position,de=!!K.morphAttributes.normal,Be=!!K.morphAttributes.color;let Ae=ci;W.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ae=R.toneMapping);const xe=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,tn=xe!==void 0?xe.length:0,wt=q.get(W),sn=A.state.lights;if($t===!0&&(Qt===!0||w!==Y)){const be=w===Y&&W.id===V;Pt.setState(W,w,be)}let oe=!1;W.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==sn.state.version||wt.outputColorSpace!==gt||X.isBatchedMesh&&wt.batching===!1||!X.isBatchedMesh&&wt.batching===!0||X.isBatchedMesh&&wt.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&wt.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&wt.instancing===!1||!X.isInstancedMesh&&wt.instancing===!0||X.isSkinnedMesh&&wt.skinning===!1||!X.isSkinnedMesh&&wt.skinning===!0||X.isInstancedMesh&&wt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&wt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&wt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&wt.instancingMorph===!1&&X.morphTexture!==null||wt.envMap!==Ct||W.fog===!0&&wt.fog!==yt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==Pt.numPlanes||wt.numIntersection!==Pt.numIntersection)||wt.vertexAlphas!==Xt||wt.vertexTangents!==jt||wt.morphTargets!==Mt||wt.morphNormals!==de||wt.morphColors!==Be||wt.toneMapping!==Ae||wt.morphTargetsCount!==tn||!!wt.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(oe=!0):(oe=!0,wt.__version=W.version);let Tn=wt.currentProgram;oe===!0&&(Tn=Fa(W,D,X),N&&W.isNodeMaterial&&N.onUpdateProgram(W,Tn,wt));let ti=!1,ki=!1,qr=!1;const ge=Tn.getUniforms(),Le=wt.uniforms;if(_.useProgram(Tn.program)&&(ti=!0,ki=!0,qr=!0),W.id!==V&&(V=W.id,ki=!0),wt.needsLights){const be=Xg(A.state.lightProbeGridArray,X);wt.lightProbeGrid!==be&&(wt.lightProbeGrid=be,ki=!0)}if(ti||Y!==w){_.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ge.setValue(B,"projectionMatrix",w.projectionMatrix),ge.setValue(B,"viewMatrix",w.matrixWorldInverse);const Hi=ge.map.cameraPosition;Hi!==void 0&&Hi.setValue(B,se.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&ge.setValue(B,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ge.setValue(B,"isOrthographic",w.isOrthographicCamera===!0),Y!==w&&(Y=w,ki=!0,qr=!0)}if(wt.needsLights&&(sn.state.sunShadowMap.length>0&&ge.setValue(B,"sunShadowMap",sn.state.sunShadowMap,$),sn.state.directionalShadowMap.length>0&&ge.setValue(B,"directionalShadowMap",sn.state.directionalShadowMap,$),sn.state.spotShadowMap.length>0&&ge.setValue(B,"spotShadowMap",sn.state.spotShadowMap,$),sn.state.pointShadowMap.length>0&&ge.setValue(B,"pointShadowMap",sn.state.pointShadowMap,$)),X.isSkinnedMesh){ge.setOptional(B,X,"bindMatrix"),ge.setOptional(B,X,"bindMatrixInverse");const be=X.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),ge.setValue(B,"boneTexture",be.boneTexture,$))}X.isBatchedMesh&&(ge.setOptional(B,X,"batchingTexture"),ge.setValue(B,"batchingTexture",X._matricesTexture,$),ge.setOptional(B,X,"batchingIdTexture"),ge.setValue(B,"batchingIdTexture",X._indirectTexture,$),ge.setOptional(B,X,"batchingColorTexture"),X._colorsTexture!==null&&ge.setValue(B,"batchingColorTexture",X._colorsTexture,$));const Gi=K.morphAttributes;if((Gi.position!==void 0||Gi.normal!==void 0||Gi.color!==void 0)&&k.update(X,K,Tn),(ki||wt.receiveShadow!==X.receiveShadow)&&(wt.receiveShadow=X.receiveShadow,ge.setValue(B,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&D.environment!==null&&(Le.envMapIntensity.value=D.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=_w()),ki){if(ge.setValue(B,"toneMappingExposure",R.toneMappingExposure),wt.needsLights&&Kg(Le,qr),yt&&W.fog===!0&&Rt.refreshFogUniforms(Le,yt),Rt.refreshMaterialUniforms(Le,W,tt,J,A.state.transmissionRenderTarget[w.id]),wt.needsLights&&wt.lightProbeGrid){const be=wt.lightProbeGrid;Le.probesSH.value=be.texture,Le.probesMin.value.copy(be.boundingBox.min),Le.probesMax.value.copy(be.boundingBox.max),Le.probesResolution.value.copy(be.resolution)}So.upload(B,Uf(wt),Le,$)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(So.upload(B,Uf(wt),Le,$),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ge.setValue(B,"center",X.center),ge.setValue(B,"modelViewMatrix",X.modelViewMatrix),ge.setValue(B,"normalMatrix",X.normalMatrix),ge.setValue(B,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const be=W.uniformsGroups;for(let Hi=0,Kr=be.length;Hi<Kr;Hi++){const Of=be[Hi];rt.update(Of,Tn),rt.bind(Of,Tn)}}return Tn}function Kg(w,D){w.ambientLightColor.needsUpdate=D,w.lightProbe.needsUpdate=D,w.sunLights.needsUpdate=D,w.sunLightShadows.needsUpdate=D,w.directionalLights.needsUpdate=D,w.directionalLightShadows.needsUpdate=D,w.pointLights.needsUpdate=D,w.pointLightShadows.needsUpdate=D,w.spotLights.needsUpdate=D,w.spotLightShadows.needsUpdate=D,w.rectAreaLights.needsUpdate=D,w.hemisphereLights.needsUpdate=D}function Yg(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(w,D,K){const W=q.get(w);W.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),q.get(w.texture).__webglTexture=D,q.get(w.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:K,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,D){const K=q.get(w);K.__webglFramebuffer=D,K.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(w,D=0,K=0){Z=w,O=D,G=K;let W=null,X=!1,yt=!1;if(w){const gt=q.get(w);if(gt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(B.FRAMEBUFFER,gt.__webglFramebuffer),Q.copy(w.viewport),at.copy(w.scissor),ot=w.scissorTest,_.viewport(Q),_.scissor(at),_.setScissorTest(ot),V=-1;return}else if(gt.__webglFramebuffer===void 0)$.setupRenderTarget(w);else if(gt.__hasExternalTextures)$.rebindTextures(w,q.get(w.texture).__webglTexture,q.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Xt=w.depthTexture;if(gt.__boundDepthTexture!==Xt){if(Xt!==null&&q.has(Xt)&&(w.width!==Xt.image.width||w.height!==Xt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(w)}}const Et=w.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(yt=!0);const Ct=q.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ct[D])?W=Ct[D][K]:W=Ct[D],X=!0):w.samples>0&&$.useMultisampledRTT(w)===!1?W=q.get(w).__webglMultisampledFramebuffer:Array.isArray(Ct)?W=Ct[K]:W=Ct,Q.copy(w.viewport),at.copy(w.scissor),ot=w.scissorTest}else Q.copy(_t).multiplyScalar(tt).floor(),at.copy(Lt).multiplyScalar(tt).floor(),ot=fe;if(K!==0&&(W=U),_.bindFramebuffer(B.FRAMEBUFFER,W)&&_.drawBuffers(w,W),_.viewport(Q),_.scissor(at),_.setScissorTest(ot),X){const gt=q.get(w.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+D,gt.__webglTexture,K)}else if(yt){const gt=D;for(let Et=0;Et<w.textures.length;Et++){const Ct=q.get(w.textures[Et]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Et,Ct.__webglTexture,K,gt)}}else if(w!==null&&K!==0){const gt=q.get(w.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,gt.__webglTexture,K)}V=-1};function Ff(w){const D=q.get(w);return(D.__readFormat!==w.format||D.__readType!==w.type)&&(D.__readFormat=w.format,D.__readType=w.type,D.__formatReadable=C.textureFormatReadable(w.format),D.__typeReadable=C.textureTypeReadable(w.type)),D}this.readRenderTargetPixels=function(w,D,K,W,X,yt,At,gt=0){if(!(w&&w.isWebGLRenderTarget)){ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&At!==void 0&&(Et=Et[At]),Et){_.bindFramebuffer(B.FRAMEBUFFER,Et);try{const Ct=w.textures[gt],Xt=Ct.format,jt=Ct.type;w.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+gt);const Mt=Ff(Ct);if(Mt.__formatReadable===!1){ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Mt.__typeReadable===!1){ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=w.width-W&&K>=0&&K<=w.height-X&&B.readPixels(D,K,W,X,ht.convert(Xt),ht.convert(jt),yt)}finally{const Ct=Z!==null?q.get(Z).__webglFramebuffer:null;_.bindFramebuffer(B.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(w,D,K,W,X,yt,At,gt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&At!==void 0&&(Et=Et[At]),Et)if(D>=0&&D<=w.width-W&&K>=0&&K<=w.height-X){_.bindFramebuffer(B.FRAMEBUFFER,Et);const Ct=w.textures[gt],Xt=Ct.format,jt=Ct.type;w.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+gt);const Mt=Ff(Ct);if(Mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const de=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,de),B.bufferData(B.PIXEL_PACK_BUFFER,yt.byteLength,B.STREAM_READ),B.readPixels(D,K,W,X,ht.convert(Xt),ht.convert(jt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);const Be=Z!==null?q.get(Z).__webglFramebuffer:null;_.bindFramebuffer(B.FRAMEBUFFER,Be);const Ae=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await F0(B,Ae,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,de),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,yt),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(de),B.deleteSync(Ae),yt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,D=null,K=0){const W=Math.pow(2,-K),X=Math.floor(w.image.width*W),yt=Math.floor(w.image.height*W),At=D!==null?D.x:0,gt=D!==null?D.y:0;$.setTexture2D(w,0),B.copyTexSubImage2D(B.TEXTURE_2D,K,0,0,At,gt,X,yt),_.unbindTexture()},this.copyTextureToTexture=function(w,D,K=null,W=null,X=0,yt=0){let At,gt,Et,Ct,Xt,jt,Mt,de,Be;const Ae=w.isCompressedTexture?w.mipmaps[yt]:w.image;if(K!==null)At=K.max.x-K.min.x,gt=K.max.y-K.min.y,Et=K.isBox3?K.max.z-K.min.z:1,Ct=K.min.x,Xt=K.min.y,jt=K.isBox3?K.min.z:0;else{const Le=Math.pow(2,-X);At=Math.floor(Ae.width*Le),gt=Math.floor(Ae.height*Le),w.isDataArrayTexture?Et=Ae.depth:w.isData3DTexture?Et=Math.floor(Ae.depth*Le):Et=1,Ct=0,Xt=0,jt=0}W!==null?(Mt=W.x,de=W.y,Be=W.z):(Mt=0,de=0,Be=0);const xe=ht.convert(D.format),tn=ht.convert(D.type);let wt;D.isData3DTexture?($.setTexture3D(D,0),wt=B.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?($.setTexture2DArray(D,0),wt=B.TEXTURE_2D_ARRAY):($.setTexture2D(D,0),wt=B.TEXTURE_2D),_.activeTexture(B.TEXTURE0),_.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,D.flipY),_.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),_.pixelStorei(B.UNPACK_ALIGNMENT,D.unpackAlignment);const sn=_.getParameter(B.UNPACK_ROW_LENGTH),oe=_.getParameter(B.UNPACK_IMAGE_HEIGHT),Tn=_.getParameter(B.UNPACK_SKIP_PIXELS),ti=_.getParameter(B.UNPACK_SKIP_ROWS),ki=_.getParameter(B.UNPACK_SKIP_IMAGES);_.pixelStorei(B.UNPACK_ROW_LENGTH,Ae.width),_.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ae.height),_.pixelStorei(B.UNPACK_SKIP_PIXELS,Ct),_.pixelStorei(B.UNPACK_SKIP_ROWS,Xt),_.pixelStorei(B.UNPACK_SKIP_IMAGES,jt);const qr=w.isDataArrayTexture||w.isData3DTexture,ge=D.isDataArrayTexture||D.isData3DTexture;if(w.isDepthTexture){const Le=q.get(w),Gi=q.get(D),be=q.get(Le.__renderTarget),Hi=q.get(Gi.__renderTarget);_.bindFramebuffer(B.READ_FRAMEBUFFER,be.__webglFramebuffer),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,Hi.__webglFramebuffer);for(let Kr=0;Kr<Et;Kr++)qr&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(w).__webglTexture,X,jt+Kr),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(D).__webglTexture,yt,Be+Kr)),B.blitFramebuffer(Ct,Xt,At,gt,Mt,de,At,gt,B.DEPTH_BUFFER_BIT,B.NEAREST);_.bindFramebuffer(B.READ_FRAMEBUFFER,null),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(X!==0||w.isRenderTargetTexture||q.has(w)){const Le=q.get(w),Gi=q.get(D);_.bindFramebuffer(B.READ_FRAMEBUFFER,L),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,P);for(let be=0;be<Et;be++)qr?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Le.__webglTexture,X,jt+be):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Le.__webglTexture,X),ge?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Gi.__webglTexture,yt,Be+be):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Gi.__webglTexture,yt),X!==0?B.blitFramebuffer(Ct,Xt,At,gt,Mt,de,At,gt,B.COLOR_BUFFER_BIT,B.NEAREST):ge?B.copyTexSubImage3D(wt,yt,Mt,de,Be+be,Ct,Xt,At,gt):B.copyTexSubImage2D(wt,yt,Mt,de,Ct,Xt,At,gt);_.bindFramebuffer(B.READ_FRAMEBUFFER,null),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else ge?w.isDataTexture||w.isData3DTexture?B.texSubImage3D(wt,yt,Mt,de,Be,At,gt,Et,xe,tn,Ae.data):D.isCompressedArrayTexture?B.compressedTexSubImage3D(wt,yt,Mt,de,Be,At,gt,Et,xe,Ae.data):B.texSubImage3D(wt,yt,Mt,de,Be,At,gt,Et,xe,tn,Ae):w.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,yt,Mt,de,At,gt,xe,tn,Ae.data):w.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,yt,Mt,de,Ae.width,Ae.height,xe,Ae.data):B.texSubImage2D(B.TEXTURE_2D,yt,Mt,de,At,gt,xe,tn,Ae);_.pixelStorei(B.UNPACK_ROW_LENGTH,sn),_.pixelStorei(B.UNPACK_IMAGE_HEIGHT,oe),_.pixelStorei(B.UNPACK_SKIP_PIXELS,Tn),_.pixelStorei(B.UNPACK_SKIP_ROWS,ti),_.pixelStorei(B.UNPACK_SKIP_IMAGES,ki),yt===0&&D.generateMipmaps&&B.generateMipmap(wt),_.unbindTexture()},this.initRenderTarget=function(w){q.get(w).__webglFramebuffer===void 0&&$.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?$.setTextureCube(w,0):w.isData3DTexture?$.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?$.setTexture2DArray(w,0):$.setTexture2D(w,0),_.unbindTexture()},this.resetState=function(){O=0,G=0,Z=null,_.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}function ze(i,t,e){return new Li(i,t,e,6,1,!1)}function Ki(i,t=!1){return new su({color:i,metalness:.32,roughness:.36,flatShading:!0,vertexColors:t,side:si})}const Xp=new Ma(.265,.024,3,6);Xp.rotateX(-Math.PI/2);const lu=new Ma(.255,.04,4,8);lu.rotateX(-Math.PI/2);const qp=new Ma(.21,.065,4,6);qp.rotateX(-Math.PI/2);const Nn=[{id:"nano-hex",name:"Nano Hex Genesis",wave:"radial",shaderMode:0,plateGeometry:ze(.448,.465,.16),insetGeometry:ze(.395,.395,.012),plateColor:3159094,insetColor:1843234,insetOffset:.086,detailGeometry:null,detailOffset:0,lift:1,tilt:1,compression:1,warp:1,reflection:1,socket:1},{id:"armor-scales",name:"Armor Scales",wave:"faceted",shaderMode:1,plateGeometry:ze(.425,.468,.22),insetGeometry:ze(.355,.355,.012),plateColor:3159608,insetColor:1448476,insetOffset:.116,detailGeometry:new Vr(.055,.018,.62),detailMaterial:Ki(5857637),detailOffset:.134,lift:.88,tilt:1.28,compression:.75,warp:1.08,reflection:.82,socket:.72},{id:"obsidian-bloom",name:"Obsidian Bloom",wave:"spiral",shaderMode:2,plateGeometry:ze(.365,.468,.31),insetGeometry:ze(.27,.27,.012),plateColor:2698542,insetColor:1382682,insetOffset:.161,detailGeometry:ze(.075,.075,.02),detailMaterial:Ki(5331293),detailOffset:.18,lift:1.38,tilt:.72,compression:1.1,warp:.8,reflection:1.12,socket:.82},{id:"circuit-matrix",name:"Circuit Matrix",wave:"diamond",shaderMode:3,plateGeometry:ze(.459,.466,.1),insetGeometry:ze(.315,.315,.012),plateColor:2435628,insetColor:1053718,insetOffset:.056,detailGeometry:Xp,detailMaterial:Ki(9607838),detailOffset:.072,lift:.58,tilt:.42,compression:.58,warp:1.25,reflection:1.3,socket:1.18},{id:"electric-nexus",name:"Electric Nexus",wave:"radial",shaderMode:4,plateGeometry:ze(.45,.466,.13),insetGeometry:ze(.37,.37,.012),plateColor:2106663,insetColor:1120025,insetOffset:.071,detailGeometry:null,detailOffset:0,lift:.3,tilt:.3,compression:.25,warp:.28,reflection:.38,socket:.32,electric:!0},{id:"gilded-reactor",name:"Gilded Reactor",wave:"rings",shaderMode:5,plateGeometry:ze(.42,.468,.22),insetGeometry:ze(.32,.32,.014),plateColor:6047280,insetColor:1452837,insetOffset:.117,detailGeometry:lu,detailMaterial:Ki(14003555),detailOffset:.134,lift:1.1,tilt:.8,compression:.7,warp:.9,reflection:1.25,socket:1.1,glowColor:14003555},{id:"emerald-flux",name:"Emerald Flux",wave:"tide",shaderMode:6,plateGeometry:ze(.385,.47,.27),insetGeometry:ze(.23,.23,.012),plateColor:1591354,insetColor:1059365,insetOffset:.141,detailGeometry:new Ku(.17,.24,6),detailMaterial:Ki(7786413),detailOffset:.23,lift:1.3,tilt:.65,compression:.9,warp:1.1,reflection:1.15,socket:1.05,glowColor:6672293},{id:"halo-relay",name:"Halo Relay",wave:"cross",shaderMode:7,plateGeometry:ze(.45,.468,.095),insetGeometry:ze(.345,.345,.012),plateColor:2636612,insetColor:1056295,insetOffset:.054,detailGeometry:lu,detailMaterial:Ki(8112087),detailOffset:.072,lift:.55,tilt:.4,compression:.55,warp:1.35,reflection:1.35,socket:1.2,glowColor:8112087},{id:"prism-shards",name:"Prism Shards",wave:"shard",shaderMode:8,plateGeometry:new Li(.26,.465,.32,3),insetGeometry:new Li(.15,.15,.012,3),plateColor:4862288,insetColor:2168615,insetOffset:.166,detailGeometry:new Ju(.095),detailMaterial:Ki(12159932),detailOffset:.205,lift:1.45,tilt:1.18,compression:1.1,warp:1.3,reflection:1.18,socket:.95,glowColor:12159932},{id:"copper-pulse",name:"Copper Pulse",wave:"chevron",shaderMode:9,plateGeometry:ze(.41,.465,.185),insetGeometry:ze(.315,.315,.012),plateColor:5323573,insetColor:1583659,insetOffset:.099,detailGeometry:qp,detailMaterial:Ki(13075304),detailOffset:.115,lift:.92,tilt:.92,compression:.88,warp:1.12,reflection:1.25,socket:1.08,glowColor:13075304}],Bh=24,an=new Ze,ls=new Yt;function bw(i){const t=i.filter(f=>f.row%3===0&&f.col%3===0),e=[],n=t.map(()=>[]);for(let f=0;f<t.length;f+=1)for(let d=f+1;d<t.length;d+=1){const g=Math.hypot(t[f].x-t[d].x,t[f].z-t[d].z);if(g<1.9||g>2.85)continue;const y={a:f,b:d,length:g,x:(t[f].x+t[d].x)*.5,z:(t[f].z+t[d].z)*.5,seed:(f*37+d*71)%101/101};n[f].push(e.length),n[d].push(e.length),e.push(y)}const r=new ha({color:16777215,toneMapped:!1}),s=new ir(new Vr(1,.012,.022),r,e.length);s.frustumCulled=!1,e.forEach((f,d)=>{const g=t[f.a],y=t[f.b];an.position.set(f.x,.18,f.z),an.rotation.set(0,-Math.atan2(y.z-g.z,y.x-g.x),0),an.scale.set(f.length,1,1),an.updateMatrix(),s.setMatrixAt(d,an.matrix)}),s.instanceMatrix.needsUpdate=!0;const a=new ir(new Li(.105,.105,.03,6,1,!1),r,t.length);a.frustumCulled=!1,t.forEach((f,d)=>{an.position.set(f.x,.2,f.z),an.rotation.set(0,0,0),an.scale.setScalar(1),an.updateMatrix(),a.setMatrixAt(d,an.matrix)}),a.instanceMatrix.needsUpdate=!0;const o=new ir(new Yu(.065,0),r,Bh);o.frustumCulled=!1,o.count=0;const l=new Qs;l.add(s,a,o),l.visible=!1;function c(f){const d=new Float32Array(t.length).fill(1/0),g=new Uint8Array(t.length);let y=0,m=1/0;t.forEach((p,b)=>{const M=Math.hypot(p.x-f.x,p.z-f.z);M<m&&(m=M,y=b)}),d[y]=0;for(let p=0;p<t.length;p+=1){let b=-1,M=1/0;for(let v=0;v<t.length;v+=1)!g[v]&&d[v]<M&&(M=d[v],b=v);if(b<0)break;g[b]=1;for(const v of n[b]){const S=e[v],A=S.a===b?S.b:S.a,T=M+S.length*(.85+S.seed*.3);T<d[A]&&(d[A]=T)}}return d}function u(f,d,g,y){const m=(f-d)/y;return Math.exp(-m*m)*g*Math.max(0,1-f/3)}function h(f,d,g){for(const m of f)m.electricDistances||(m.electricDistances=c(m));let y=0;e.forEach((m,p)=>{let b=0,M=0,v=!0;for(const A of f){const T=(d-A.started)/1e3,x=A.electricDistances,E=x[m.a]<=x[m.b],R=Math.min(x[m.a],x[m.b])/7.4+m.seed*.12,I=u(T,R,A.strength,.22);I>b&&(b=I,M=Math.min(1,Math.max(0,(T-R)*4)),v=E)}const S=Math.min(1,.065+g*.035+b*.88);if(ls.setRGB(S*.9,S*.93,S*.95),s.setColorAt(p,ls),b>.32&&m.seed>.35&&y<Bh){const A=t[v?m.a:m.b],T=t[v?m.b:m.a];an.position.set(A.x+(T.x-A.x)*M,.24,A.z+(T.z-A.z)*M),an.rotation.set(0,0,0),an.scale.setScalar(.5+b*1.25),an.updateMatrix(),o.setMatrixAt(y,an.matrix),ls.setRGB(b,b,b),o.setColorAt(y,ls),y+=1}}),t.forEach((m,p)=>{let b=0;for(const v of f){const S=(d-v.started)/1e3;b=Math.max(b,u(S,v.electricDistances[p]/7.4,v.strength,.26))}const M=Math.min(1,.11+b*.85);ls.setRGB(M*.9,M*.93,M*.95),a.setColorAt(p,ls)}),s.instanceColor.needsUpdate=!0,a.instanceColor.needsUpdate=!0,o.count=y,y&&(o.instanceMatrix.needsUpdate=!0,o.instanceColor.needsUpdate=!0)}return h([],performance.now(),0),{group:l,update:h}}const Yi=1073,Ve=new Ze,Gn=new Yt,ww=new Yt(11581370),kh=new Yt(5791845),Gh=new Yt(11581370);function Aw(i){const t=new vw({canvas:i,antialias:!0,powerPreference:"high-performance"});t.setClearColor(330255,1),t.outputColorSpace=Sn,t.toneMapping=Uu,t.toneMappingExposure=1.42;const e=new $0;e.fog=new Xu(330255,.017);const n=new Zo(-11,11,11,-11,.1,100);n.position.set(0,24,0),n.up.set(0,0,-1),n.lookAt(0,0,0);const r=new Li(.478,.478,.035,6,1,!1);let s=Nn[0];const a=new su({color:s.plateColor,metalness:.23,roughness:.36,flatShading:!0,emissive:395531,emissiveIntensity:.12}),o=new ir(s.plateGeometry,a,Yi);o.instanceMatrix.setUsage(wl),o.instanceColor=new ru(new Float32Array(Yi*3),3),o.frustumCulled=!1,e.add(o);const l=new su({color:s.insetColor,metalness:.18,roughness:.42,emissive:197894,emissiveIntensity:.1}),c=new ir(s.insetGeometry,l,Yi);c.instanceMatrix.setUsage(wl),c.frustumCulled=!1,e.add(c);const u=new ir(Nn[1].detailGeometry,Nn[1].detailMaterial,Yi);u.instanceMatrix.setUsage(wl),u.frustumCulled=!1,u.visible=!1,e.add(u);const h=new ir(r,new ha({color:16777215,toneMapped:!1}),Yi);h.frustumCulled=!1,e.add(h);const f=new ir(new Li(.47,.47,.006,6,1,!1),new ha({color:0,transparent:!0,opacity:.55,depthWrite:!1}),Yi);f.frustumCulled=!1,e.add(f);const d=Sw(Yi),g=new Float32Array(Yi);d.forEach((N,U)=>{Ve.position.set(N.x,-.17,N.z),Ve.rotation.set(0,0,0),Ve.scale.setScalar(1),Ve.updateMatrix(),h.setMatrixAt(U,Ve.matrix),Gn.copy(N.accent?ww:kh).multiplyScalar(.065),h.setColorAt(U,Gn),Ve.position.y=-.12,Ve.updateMatrix(),f.setMatrixAt(U,Ve.matrix)}),h.instanceMatrix.needsUpdate=!0,h.instanceColor.needsUpdate=!0,f.instanceMatrix.needsUpdate=!0;const y=Ew();e.add(y);const m=bw(d);e.add(m.group);function p(N){const U=Nn.find(L=>L.id===N);return U?(s=U,Gh.setHex(U.glowColor??11581370),o.geometry=U.plateGeometry,a.color.setHex(U.plateColor),c.geometry=U.insetGeometry,l.color.setHex(U.insetColor),u.visible=!!U.detailGeometry,U.detailGeometry&&(u.geometry=U.detailGeometry,u.material=U.detailMaterial),m.group.visible=!!U.electric,y.material.uniforms.uMode.value=U.shaderMode,y.material.uniforms.uTint.value.setHex(U.glowColor??16777215),U):s}const b=new dh(13357521,11,42,1.2);b.position.set(0,11,3),e.add(b);const M=new dh(8752272,9,35,1.2);M.position.set(-5.4,10,-4),e.add(M);const v=new _y(15200498,3.2);v.position.set(5,9,7),e.add(v),e.add(new vy(12700624,2.25));let S=0,A=0,T=-1e3;const x=[];function E(N=0,U=0,L=1){x.push({x:N,z:U,started:performance.now(),strength:L}),x.length>4&&x.shift()}function R(){const N=i.getBoundingClientRect(),U=Math.min(window.devicePixelRatio||1,N.width<720?1.25:1.5),L=Math.max(1,Math.floor(N.width*U)),P=Math.max(1,Math.floor(N.height*U));if(i.width!==L||i.height!==P){t.setPixelRatio(U),t.setSize(N.width,N.height,!1);const O=N.width/Math.max(1,N.height),G=Math.min(N.width<720?9.6:8.7,14.2/O),Z=G*O;n.left=-Z,n.right=Z,n.top=G,n.bottom=-G,n.updateProjectionMatrix()}}function I(N){const U=performance.now();if(U-S<(i.clientWidth<720?33:20))return;const L=Math.min(.05,(U-S)/1e3||.016);S=U,R();const P=U/1e3,O=Math.max(0,N.beat||0),G=Math.max(0,N.bass||0),Z=Math.max(0,N.pulse||0),V=Math.max(0,N.energy||0);for(O>.72&&A<=.72&&U-T>160&&(E(0,0,Math.min(1.45,.78+G)),T=U),A=O;x.length&&U-x[0].started>3e3;)x.shift();for(let Q=0;Q<d.length;Q+=1){const at=d[Q];let ot=0,Ot=0,Ft=0,Wt=0;for(const Qt of x){const Ht=(U-Qt.started)/1e3,se=at.x-Qt.x,me=at.z-Qt.z,Oe=Math.hypot(se,me);let te=Oe-Ht*6.7;s.wave==="faceted"?te+=Math.sin(Math.atan2(me,se)*6)*.36:s.wave==="spiral"?te+=Math.atan2(me,se)*.42:s.wave==="diamond"?te=(Math.abs(se)+Math.abs(me))*.84-Ht*6.7:s.wave==="fracture"?te+=Math.sin(at.x*1.4+at.z*.8)*.32:s.wave==="rings"?te+=Math.sin(Oe*2.8)*.24:s.wave==="tide"?te=Math.abs(me)-Ht*6.7:s.wave==="cross"?te=Math.min(Math.abs(se),Math.abs(me))*1.7-Ht*6.7:s.wave==="shard"?te+=Math.sin(Math.atan2(me,se)*9)*.48:s.wave==="chevron"&&(te=Math.abs(se+me)*.82-Ht*6.7);const Te=Math.max(0,1-Ht/3),B=Math.exp(-te*te/.52)*Qt.strength*Te,He=te+.85,ae=Math.exp(-He*He/1.6)*Qt.strength*Te;ot+=B,Ot+=ae,Oe>.01&&(Ft+=se/Oe*(B*.068-ae*.022)*s.warp,Wt+=me/Oe*(B*.068-ae*.022)*s.warp)}ot=Math.min(1.35,ot),Ot=Math.min(1,Ot);const J=.55+.45*Math.sin(at.radius*1.35-P*5.2),tt=Math.min(1,G*.8+Z*.7)*J,mt=.018+tt*.2+(ot*(.56+G*.18)+Ot*.055)*s.lift;g[Q]+=(mt-g[Q])*Math.min(1,L*8);const Nt=g[Q],_t=Math.min(.085,ot*.058*s.tilt);Ve.position.set(at.x+Ft,Nt,at.z+Wt),Ve.rotation.set(_t*Math.sin(at.angle),0,_t*Math.cos(at.angle));const Lt=Math.max(.925,1-ot*.045*s.compression+Ot*.008);Ve.scale.set(Lt,1,Lt),Ve.updateMatrix(),o.setMatrixAt(Q,Ve.matrix),Ve.position.y=Nt+s.insetOffset,Ve.updateMatrix(),c.setMatrixAt(Q,Ve.matrix),u.visible&&(Ve.position.y=Nt+s.detailOffset,Ve.updateMatrix(),u.setMatrixAt(Q,Ve.matrix));const fe=.7+tt*.5+ot*.6*s.reflection+Ot*.14;Gn.setRGB(fe,fe,fe),o.setColorAt(Q,Gn);const Bt=.64+tt*.32+ot*.36*s.reflection+Ot*.07;if(Gn.setRGB(Bt,Bt,Bt),c.setColorAt(Q,Gn),u.visible){const Qt=.7+tt*.28+ot*.42*s.reflection;Gn.setRGB(Qt,Qt,Qt),u.setColorAt(Q,Gn)}const $t=.5+.5*Math.sin(P*.3+at.x*.18+at.z*.26);Gn.copy(kh).lerp(Gh,$t),Gn.multiplyScalar((.055+tt*.34+ot*(.48+G*.18)+Ot*.09)*s.socket),h.setColorAt(Q,Gn)}o.instanceMatrix.needsUpdate=!0,o.instanceColor.needsUpdate=!0,c.instanceMatrix.needsUpdate=!0,c.instanceColor.needsUpdate=!0,u.visible&&(u.instanceMatrix.needsUpdate=!0,u.instanceColor.needsUpdate=!0),h.instanceColor.needsUpdate=!0,y.material.uniforms.uTime.value=P,y.material.uniforms.uBass.value=G,y.material.uniforms.uBeat.value=O,y.material.uniforms.uEnergy.value=V,m.group.visible&&m.update(x,U,G);const Y=x[x.length-1];y.material.uniforms.uImpactStrength.value=Y?Y.strength*Math.max(0,1-(U-Y.started)/3e3):0,y.material.uniforms.uImpactRadius.value=Y?(U-Y.started)/1e3*6.7:0,Y&&y.material.uniforms.uImpactOrigin.value.set(Y.x,-Y.z),b.intensity=11+G*8,M.intensity=9+N.treble*6,n.position.x=0,n.position.y=24,n.position.z=0,n.lookAt(0,0,0),t.render(e,n)}return window.addEventListener("resize",R),i.addEventListener("pointerdown",N=>{const U=i.getBoundingClientRect(),L=((N.clientX-U.left)/U.width*2-1)*n.right,P=((N.clientY-U.top)/U.height*2-1)*n.top;E(L,P)}),{resize:R,render:I,triggerImpact:E,setVariant:p}}function Sw(i){const t=[];for(let a=-14;a<=14;a+=1)for(let o=-18;o<=18;o+=1){const l=(o+Math.abs(a)%2*.5)*.825,c=a*.715,u=Math.hypot(l,c);t.push({x:l,z:c,row:a,col:o,radius:u,angle:Math.atan2(c,l),accent:Math.sin(l*.8+c*.45)>.83})}return t.sort((a,o)=>a.radius-o.radius).slice(0,i)}function Ew(){const i=new Zn({depthWrite:!0,uniforms:{uTime:{value:0},uBass:{value:0},uBeat:{value:0},uEnergy:{value:0},uImpactOrigin:{value:new Zt(0,0)},uImpactRadius:{value:0},uImpactStrength:{value:0},uMode:{value:0},uTint:{value:new Yt(16777215)}},vertexShader:`
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;

      varying vec2 vUv;
      uniform float uTime;
      uniform float uBass;
      uniform float uBeat;
      uniform float uEnergy;
      uniform vec2 uImpactOrigin;
      uniform float uImpactRadius;
      uniform float uImpactStrength;
      uniform float uMode;
      uniform vec3 uTint;

      void main() {
        vec2 p = (vUv - 0.5) * vec2(32.0, 26.0);
        vec2 delta = p - uImpactOrigin;
        float distanceFromImpact = length(delta);
        float textureDetail = 0.5 + 0.5 * sin(p.x * 0.22 + uTime * 0.3);
        if (uMode > 8.5) {
          distanceFromImpact = abs(delta.x + delta.y) * 0.82;
          textureDetail = abs(sin(p.x * 1.2 + p.y * 1.2));
        } else if (uMode > 7.5) {
          distanceFromImpact += sin(atan(delta.y, delta.x) * 9.0) * 0.48;
          textureDetail = abs(sin(p.x * 1.7 - p.y * 0.7));
        } else if (uMode > 6.5) {
          distanceFromImpact = min(abs(delta.x), abs(delta.y)) * 1.7;
          textureDetail = max(abs(sin(p.x * 1.6)), abs(sin(p.y * 1.6)));
        } else if (uMode > 5.5) {
          distanceFromImpact = abs(delta.y);
          textureDetail = 0.5 + 0.5 * sin(p.y * 1.1);
        } else if (uMode > 4.5) {
          distanceFromImpact += sin(distanceFromImpact * 2.8) * 0.24;
          textureDetail = 0.5 + 0.5 * sin(length(p) * 1.5);
        } else if (uMode > 3.5) {
          textureDetail = max(abs(sin(p.x * 1.5)), abs(sin(p.y * 1.5)));
        } else if (uMode > 2.5) {
          distanceFromImpact = (abs(delta.x) + abs(delta.y)) * 0.84;
          textureDetail = max(abs(sin(p.x * 2.4)), abs(sin(p.y * 2.4)));
        } else if (uMode > 1.5) {
          distanceFromImpact += atan(delta.y, delta.x) * 0.42;
          textureDetail = 0.5 + 0.5 * sin(length(p) * 1.3);
        } else if (uMode > 0.5) {
          distanceFromImpact += sin(atan(delta.y, delta.x) * 6.0) * 0.36;
          textureDetail = abs(sin(p.x * 1.4 + p.y * 0.7));
        }
        float band = distanceFromImpact - uImpactRadius;
        float ripple = exp(-band * band / 0.85) * uImpactStrength;
        if (uMode > 3.5) ripple *= 0.25;
        float power = 0.3 + uEnergy * 0.28 + uBass * 0.42 + uBeat * 0.16;
        vec3 graphite = vec3(0.008, 0.009, 0.011);
        vec3 silver = mix(vec3(0.055), vec3(0.15), textureDetail) * uTint;
        float floorGlow = (uBass * 0.24 + uEnergy * 0.12) * textureDetail;
        gl_FragColor = vec4(graphite + silver * (floorGlow + ripple * power), 1.0);
      }
    `}),t=new Ln(new Ea(32,26,1,1),i);return t.rotation.x=-Math.PI/2,t.position.y=-.23,t}function Mw(i,t=Math.random){const e=i.map(l=>l.id);let n=[],r=1/0;function s(l){r=l+12e3+Math.max(0,Math.min(1,t()))*8e3}function a(l,c){n=[c],s(l)}function o(l,c,u){if(l<r||c<=.72&&l<r+6e3)return null;const h=e.filter(g=>g!==u&&!n.includes(g)),f=h.length?h:e.filter(g=>g!==u);if(!f.length)return null;const d=f[Math.min(f.length-1,Math.floor(Math.max(0,t())*f.length))];return n=[...n,d].slice(-3),s(l),d}return{start:a,maybeNext:o}}const Tw={},Es={name:"Monad Testnet",nativeCurrency:"MON",paymentToken:"Testnet MON",chainId:"0x279f",visualMemoryContract:"0xD0793d7B3897A992ccc8f7188F5F2eE3AA21a590",rpcUrl:Tw?.VITE_ALCHEMY_MONAD_RPC_URL||"https://testnet-rpc.monad.xyz",explorerUrl:"https://testnet.monadexplorer.com"};function Cw(i){return{packName:"Personal Nano Identity Pack",price:(.05*Math.min(3,Math.max(1,Math.ceil(i.trim().length/120)))).toFixed(2),currency:Es.paymentToken,promptHashPreview:Rw(i)}}function Rw(i){let t=2166136261;for(let e=0;e<i.length;e+=1)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return`0x${(t>>>0).toString(16).padStart(8,"0")}`}const Pw="6.17.0";function Iw(i,t,e){const n=t.split("|").map(s=>s.trim());for(let s=0;s<n.length;s++)switch(t){case"any":return;case"bigint":case"boolean":case"number":case"string":if(typeof i===t)return}const r=new Error(`invalid value for type ${t}`);throw r.code="INVALID_ARGUMENT",r.argument=`value.${e}`,r.value=i,r}async function ln(i){const t=Object.keys(i);return(await Promise.all(t.map(n=>Promise.resolve(i[n])))).reduce((n,r,s)=>(n[t[s]]=r,n),{})}function Dt(i,t,e){for(let n in t){let r=t[n];const s=e?e[n]:null;s&&Iw(r,s,n),Object.defineProperty(i,n,{enumerable:!0,value:r,writable:!1})}}function ps(i,t){if(i==null)return"null";if(t==null&&(t=new Set),typeof i=="object"){if(t.has(i))return"[Circular]";t.add(i)}if(Array.isArray(i))return"[ "+i.map(e=>ps(e,t)).join(", ")+" ]";if(i instanceof Uint8Array){const e="0123456789abcdef";let n="0x";for(let r=0;r<i.length;r++)n+=e[i[r]>>4],n+=e[i[r]&15];return n}if(typeof i=="object"&&typeof i.toJSON=="function")return ps(i.toJSON(),t);switch(typeof i){case"boolean":case"number":case"symbol":return i.toString();case"bigint":return BigInt(i).toString();case"string":return JSON.stringify(i);case"object":{const e=Object.keys(i);return e.sort(),"{ "+e.map(n=>`${ps(n,t)}: ${ps(i[n],t)}`).join(", ")+" }"}}return"[ COULD NOT SERIALIZE ]"}function Je(i,t){return i&&i.code===t}function Zu(i){return Je(i,"CALL_EXCEPTION")}function Ee(i,t,e){let n=i;{const s=[];if(e){if("message"in e||"code"in e||"name"in e)throw new Error(`value will overwrite populated values: ${ps(e)}`);for(const a in e){if(a==="shortMessage")continue;const o=e[a];s.push(a+"="+ps(o))}}s.push(`code=${t}`),s.push(`version=${Pw}`),s.length&&(i+=" ("+s.join(", ")+")")}let r;switch(t){case"INVALID_ARGUMENT":r=new TypeError(i);break;case"NUMERIC_FAULT":case"BUFFER_OVERRUN":r=new RangeError(i);break;default:r=new Error(i)}return Dt(r,{code:t}),e&&Object.assign(r,e),r.shortMessage==null&&Dt(r,{shortMessage:n}),r}function it(i,t,e,n){if(!i)throw Ee(t,e,n)}function F(i,t,e,n){it(i,t,"INVALID_ARGUMENT",{argument:e,value:n})}function Kp(i,t,e){e==null&&(e=""),e&&(e=": "+e),it(i>=t,"missing argument"+e,"MISSING_ARGUMENT",{count:i,expectedCount:t}),it(i<=t,"too many arguments"+e,"UNEXPECTED_ARGUMENT",{count:i,expectedCount:t})}["NFD","NFC","NFKD","NFKC"].reduce((i,t)=>{try{if("test".normalize(t)!=="test")throw new Error("bad");if(t==="NFD"&&"é".normalize("NFD")!=="é")throw new Error("broken");i.push(t)}catch{}return i},[]);function Ta(i,t,e){if(e==null&&(e=""),i!==t){let n=e,r="new";e&&(n+=".",r+=" "+e),it(!1,`private constructor; use ${n}from* methods`,"UNSUPPORTED_OPERATION",{operation:r})}}function Yp(i,t,e){if(i instanceof Uint8Array)return e?new Uint8Array(i):i;if(typeof i=="string"&&i.length%2===0&&i.match(/^0x[0-9a-f]*$/i)){const n=new Uint8Array((i.length-2)/2);let r=2;for(let s=0;s<n.length;s++)n[s]=parseInt(i.substring(r,r+2),16),r+=2;return n}F(!1,"invalid BytesLike value",t||"value",i)}function Jt(i,t){return Yp(i,t,!1)}function cn(i,t){return Yp(i,t,!0)}function _e(i,t){return!(typeof i!="string"||!i.match(/^0x[0-9A-Fa-f]*$/)||typeof t=="number"&&i.length!==2+2*t||t===!0&&i.length%2!==0)}function $u(i){return _e(i,!0)||i instanceof Uint8Array}const Hh="0123456789abcdef";function xt(i){const t=Jt(i);let e="0x";for(let n=0;n<t.length;n++){const r=t[n];e+=Hh[(r&240)>>4]+Hh[r&15]}return e}function Me(i){return"0x"+i.map(t=>xt(t).substring(2)).join("")}function _s(i){return _e(i,!0)?(i.length-2)/2:Jt(i).length}function Ie(i,t,e){const n=Jt(i);return e!=null&&e>n.length&&it(!1,"cannot slice beyond data bounds","BUFFER_OVERRUN",{buffer:n,length:n.length,offset:e}),xt(n.slice(t??0,e??n.length))}function Jp(i,t,e){const n=Jt(i);it(t>=n.length,"padding exceeds data length","BUFFER_OVERRUN",{buffer:new Uint8Array(n),length:t,offset:t+1});const r=new Uint8Array(t);return r.fill(0),e?r.set(n,t-n.length):r.set(n,0),xt(r)}function Ui(i,t){return Jp(i,t,!0)}function Nw(i,t){return Jp(i,t,!1)}const Ca=BigInt(0),qn=BigInt(1),ms=9007199254740991;function Fo(i,t){const e=tl(i,"value"),n=BigInt(Vt(t,"width"));if(it(e>>n===Ca,"overflow","NUMERIC_FAULT",{operation:"fromTwos",fault:"overflow",value:i}),e>>n-qn){const r=(qn<<n)-qn;return-((~e&r)+qn)}return e}function Qp(i,t){let e=bt(i,"value");const n=BigInt(Vt(t,"width")),r=qn<<n-qn;if(e<Ca){e=-e,it(e<=r,"too low","NUMERIC_FAULT",{operation:"toTwos",fault:"overflow",value:i});const s=(qn<<n)-qn;return(~e&s)+qn}else it(e<r,"too high","NUMERIC_FAULT",{operation:"toTwos",fault:"overflow",value:i});return e}function Sr(i,t){const e=tl(i,"value"),n=BigInt(Vt(t,"bits"));return e&(qn<<n)-qn}function bt(i,t){switch(typeof i){case"bigint":return i;case"number":return F(Number.isInteger(i),"underflow",t||"value",i),F(i>=-ms&&i<=ms,"overflow",t||"value",i),BigInt(i);case"string":try{if(i==="")throw new Error("empty string");return i[0]==="-"&&i[1]!=="-"?-BigInt(i.substring(1)):BigInt(i)}catch(e){F(!1,`invalid BigNumberish string: ${e.message}`,t||"value",i)}}F(!1,"invalid BigNumberish value",t||"value",i)}function tl(i,t){const e=bt(i,t);return it(e>=Ca,"unsigned value cannot be negative","NUMERIC_FAULT",{fault:"overflow",operation:"getUint",value:i}),e}const zh="0123456789abcdef";function el(i){if(i instanceof Uint8Array){let t="0x0";for(const e of i)t+=zh[e>>4],t+=zh[e&15];return BigInt(t)}return bt(i)}function Vt(i,t){switch(typeof i){case"bigint":return F(i>=-ms&&i<=ms,"overflow",t||"value",i),Number(i);case"number":return F(Number.isInteger(i),"underflow",t||"value",i),F(i>=-ms&&i<=ms,"overflow",t||"value",i),i;case"string":try{if(i==="")throw new Error("empty string");return Vt(BigInt(i),t)}catch(e){F(!1,`invalid numeric string: ${e.message}`,t||"value",i)}}F(!1,"invalid numeric value",t||"value",i)}function Lw(i){return Vt(el(i))}function ar(i,t){const e=tl(i,"value");let n=e.toString(16);if(t==null)n.length%2&&(n="0"+n);else{const r=Vt(t,"width");if(r===0&&e===Ca)return"0x";for(it(r*2>=n.length,`value exceeds width (${r} bytes)`,"NUMERIC_FAULT",{operation:"toBeHex",fault:"overflow",value:i});n.length<r*2;)n="0"+n}return"0x"+n}function Ge(i,t){const e=tl(i,"value");if(e===Ca)return new Uint8Array(0);let n=e.toString(16);n.length%2&&(n="0"+n);const r=new Uint8Array(n.length/2);for(let s=0;s<r.length;s++){const a=s*2;r[s]=parseInt(n.substring(a,a+2),16)}return r}function Wn(i){let t=xt($u(i)?i:Ge(i)).substring(2);for(;t.startsWith("0");)t=t.substring(1);return t===""&&(t="0"),"0x"+t}const Vh="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";BigInt(0);const Wh=BigInt(58);function Uw(i){const t=Jt(i);let e=el(t),n="";for(;e;)n=Vh[Number(e%Wh)]+n,e/=Wh;for(let r=0;r<t.length&&!t[r];r++)n=Vh[0]+n;return n}function Dw(i){i=atob(i);const t=new Uint8Array(i.length);for(let e=0;e<i.length;e++)t[e]=i.charCodeAt(e);return Jt(t)}function Fw(i){const t=Jt(i);let e="";for(let n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return btoa(e)}class Zp{filter;emitter;#t;constructor(t,e,n){this.#t=e,Dt(this,{emitter:t,filter:n})}async removeListener(){this.#t!=null&&await this.emitter.off(this.filter,this.#t)}}function Ow(i,t,e,n,r){F(!1,`invalid codepoint at offset ${t}; ${i}`,"bytes",e)}function $p(i,t,e,n,r){if(i==="BAD_PREFIX"||i==="UNEXPECTED_CONTINUE"){let s=0;for(let a=t+1;a<e.length&&e[a]>>6===2;a++)s++;return s}return i==="OVERRUN"?e.length-t-1:0}function Bw(i,t,e,n,r){return i==="OVERLONG"?(F(typeof r=="number","invalid bad code point for replacement","badCodepoint",r),n.push(r),0):(n.push(65533),$p(i,t,e))}const kw=Object.freeze({error:Ow,ignore:$p,replace:Bw});function Gw(i,t){t==null&&(t=kw.error);const e=Jt(i,"bytes"),n=[];let r=0;for(;r<e.length;){const s=e[r++];if(s>>7===0){n.push(s);continue}let a=null,o=null;if((s&224)===192)a=1,o=127;else if((s&240)===224)a=2,o=2047;else if((s&248)===240)a=3,o=65535;else{(s&192)===128?r+=t("UNEXPECTED_CONTINUE",r-1,e,n):r+=t("BAD_PREFIX",r-1,e,n);continue}if(r-1+a>=e.length){r+=t("OVERRUN",r-1,e,n);continue}let l=s&(1<<8-a-1)-1;for(let c=0;c<a;c++){let u=e[r];if((u&192)!=128){r+=t("MISSING_CONTINUE",r,e,n),l=null;break}l=l<<6|u&63,r++}if(l!==null){if(l>1114111){r+=t("OUT_OF_RANGE",r-1-a,e,n,l);continue}if(l>=55296&&l<=57343){r+=t("UTF16_SURROGATE",r-1-a,e,n,l);continue}if(l<=o){r+=t("OVERLONG",r-1-a,e,n,l);continue}n.push(l)}}return n}function Qn(i,t){F(typeof i=="string","invalid string value","str",i);let e=[];for(let n=0;n<i.length;n++){const r=i.charCodeAt(n);if(r<128)e.push(r);else if(r<2048)e.push(r>>6|192),e.push(r&63|128);else if((r&64512)==55296){n++;const s=i.charCodeAt(n);F(n<i.length&&(s&64512)===56320,"invalid surrogate pair","str",i);const a=65536+((r&1023)<<10)+(s&1023);e.push(a>>18|240),e.push(a>>12&63|128),e.push(a>>6&63|128),e.push(a&63|128)}else e.push(r>>12|224),e.push(r>>6&63|128),e.push(r&63|128)}return new Uint8Array(e)}function Hw(i){return i.map(t=>t<=65535?String.fromCharCode(t):(t-=65536,String.fromCharCode((t>>10&1023)+55296,(t&1023)+56320))).join("")}function Oo(i,t){return Hw(Gw(i,t))}function jp(i){async function t(e,n){it(n==null||!n.cancelled,"request cancelled before sending","CANCELLED");const r=e.url.split(":")[0].toLowerCase();it(r==="http"||r==="https",`unsupported protocol ${r}`,"UNSUPPORTED_OPERATION",{info:{protocol:r},operation:"request"}),it(r==="https"||!e.credentials||e.allowInsecureAuthentication,"insecure authorized connections unsupported","UNSUPPORTED_OPERATION",{operation:"request"});let s=null;const a=new AbortController,o=setTimeout(()=>{s=Ee("request timeout","TIMEOUT"),a.abort()},e.timeout);n&&n.addListener(()=>{s=Ee("request cancelled","CANCELLED"),a.abort()});const l=Object.assign({},i,{method:e.method,headers:new Headers(Array.from(e)),body:e.body||void 0,signal:a.signal});let c;try{c=await fetch(e.url,l)}catch(d){throw clearTimeout(o),s||d}clearTimeout(o);const u={};c.headers.forEach((d,g)=>{u[g.toLowerCase()]=d});const h=await c.arrayBuffer(),f=h==null?null:new Uint8Array(h);return{statusCode:c.status,statusMessage:c.statusText,headers:u,body:f}}return t}const zw=12,Vw=250;let Xh=jp();const Ww=new RegExp("^data:([^;:]*)?(;base64)?,(.*)$","i"),Xw=new RegExp("^ipfs://(ipfs/)?(.*)$","i");let $l=!1;async function tm(i,t){try{const e=i.match(Ww);if(!e)throw new Error("invalid data");return new rr(200,"OK",{"content-type":e[1]||"text/plain"},e[2]?Dw(e[3]):Kw(e[3]))}catch{return new rr(599,"BAD REQUEST (invalid data: URI)",{},null,new Di(i))}}function em(i){async function t(e,n){try{const r=e.match(Xw);if(!r)throw new Error("invalid link");return new Di(`${i}${r[2]}`)}catch{return new rr(599,"BAD REQUEST (invalid IPFS URI)",{},null,new Di(e))}}return t}const ao={data:tm,ipfs:em("https://gateway.ipfs.io/ipfs/")},nm=new WeakMap;class qw{#t;#e;constructor(t){this.#t=[],this.#e=!1,nm.set(t,()=>{if(!this.#e){this.#e=!0;for(const e of this.#t)setTimeout(()=>{e()},0);this.#t=[]}})}addListener(t){it(!this.#e,"singal already cancelled","UNSUPPORTED_OPERATION",{operation:"fetchCancelSignal.addCancelListener"}),this.#t.push(t)}get cancelled(){return this.#e}checkSignal(){it(!this.cancelled,"cancelled","CANCELLED",{})}}function oo(i){if(i==null)throw new Error("missing signal; should not happen");return i.checkSignal(),i}class Di{#t;#e;#n;#i;#r;#a;#s;#o;#h;#c;#m;#p;#d;#u;#f;get url(){return this.#a}set url(t){this.#a=String(t)}get body(){return this.#s==null?null:new Uint8Array(this.#s)}set body(t){if(t==null)this.#s=void 0,this.#o=void 0;else if(typeof t=="string")this.#s=Qn(t),this.#o="text/plain";else if(t instanceof Uint8Array)this.#s=t,this.#o="application/octet-stream";else if(typeof t=="object")this.#s=Qn(JSON.stringify(t)),this.#o="application/json";else throw new Error("invalid body")}hasBody(){return this.#s!=null}get method(){return this.#i?this.#i:this.hasBody()?"POST":"GET"}set method(t){t==null&&(t=""),this.#i=String(t).toUpperCase()}get headers(){const t=Object.assign({},this.#n);return this.#h&&(t.authorization=`Basic ${Fw(Qn(this.#h))}`),this.allowGzip&&(t["accept-encoding"]="gzip"),t["content-type"]==null&&this.#o&&(t["content-type"]=this.#o),this.body&&(t["content-length"]=String(this.body.length)),t}getHeader(t){return this.headers[t.toLowerCase()]}setHeader(t,e){this.#n[String(t).toLowerCase()]=String(e)}clearHeaders(){this.#n={}}[Symbol.iterator](){const t=this.headers,e=Object.keys(t);let n=0;return{next:()=>{if(n<e.length){const r=e[n++];return{value:[r,t[r]],done:!1}}return{value:void 0,done:!0}}}}get credentials(){return this.#h||null}setCredentials(t,e){F(!t.match(/:/),"invalid basic authentication username","username","[REDACTED]"),this.#h=`${t}:${e}`}get allowGzip(){return this.#e}set allowGzip(t){this.#e=!!t}get allowInsecureAuthentication(){return!!this.#t}set allowInsecureAuthentication(t){this.#t=!!t}get timeout(){return this.#r}set timeout(t){F(t>=0,"timeout must be non-zero","timeout",t),this.#r=t}get preflightFunc(){return this.#c||null}set preflightFunc(t){this.#c=t}get processFunc(){return this.#m||null}set processFunc(t){this.#m=t}get retryFunc(){return this.#p||null}set retryFunc(t){this.#p=t}get getUrlFunc(){return this.#f||Xh}set getUrlFunc(t){this.#f=t}constructor(t){this.#a=String(t),this.#t=!1,this.#e=!0,this.#n={},this.#i="",this.#r=3e5,this.#u={slotInterval:Vw,maxAttempts:zw},this.#f=null}toString(){return`<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${this.#s?xt(this.#s):"null"}>`}setThrottleParams(t){t.slotInterval!=null&&(this.#u.slotInterval=t.slotInterval),t.maxAttempts!=null&&(this.#u.maxAttempts=t.maxAttempts)}async#l(t,e,n,r,s){if(t>=this.#u.maxAttempts)return s.makeServerError("exceeded maximum retry limit");it(qh()<=e,"timeout","TIMEOUT",{operation:"request.send",reason:"timeout",request:r}),n>0&&await Yw(n);let a=this.clone();const o=(a.url.split(":")[0]||"").toLowerCase();if(o in ao){const u=await ao[o](a.url,oo(r.#d));if(u instanceof rr){let h=u;if(this.processFunc){oo(r.#d);try{h=await this.processFunc(a,h)}catch(f){(f.throttle==null||typeof f.stall!="number")&&h.makeServerError("error in post-processing function",f).assertOk()}}return h}a=u}this.preflightFunc&&(a=await this.preflightFunc(a));const l=await this.getUrlFunc(a,oo(r.#d));let c=new rr(l.statusCode,l.statusMessage,l.headers,l.body,r);if([301,302,307,308].indexOf(c.statusCode)>=0){try{const u=c.headers.location||"";return a.redirect(u).#l(t+1,e,0,r,c)}catch{}return c}else if(c.statusCode===429&&(this.retryFunc==null||await this.retryFunc(a,c,t))){const u=c.headers["retry-after"];let h=this.#u.slotInterval*Math.trunc(Math.random()*Math.pow(2,t));return typeof u=="string"&&u.match(/^[1-9][0-9]*$/)&&(h=parseInt(u)),a.clone().#l(t+1,e,h,r,c)}if(this.processFunc){oo(r.#d);try{c=await this.processFunc(a,c)}catch(u){(u.throttle==null||typeof u.stall!="number")&&c.makeServerError("error in post-processing function",u).assertOk();let h=this.#u.slotInterval*Math.trunc(Math.random()*Math.pow(2,t));return u.stall>=0&&(h=u.stall),a.clone().#l(t+1,e,h,r,c)}}return c}send(){return it(this.#d==null,"request already sent","UNSUPPORTED_OPERATION",{operation:"fetchRequest.send"}),this.#d=new qw(this),this.#l(0,qh()+this.timeout,0,this,new rr(0,"",{},null,this))}cancel(){it(this.#d!=null,"request has not been sent","UNSUPPORTED_OPERATION",{operation:"fetchRequest.cancel"});const t=nm.get(this);if(!t)throw new Error("missing signal; should not happen");t()}redirect(t){const e=this.url.split(":")[0].toLowerCase(),n=t.split(":")[0].toLowerCase();it((e!=="https"||n!=="http")&&t.match(/^https?:/),"unsupported redirect","UNSUPPORTED_OPERATION",{operation:`redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(t)})`});const r=new Di(t);return r.method=this.method,r.allowGzip=this.allowGzip,r.timeout=this.timeout,r.#n=Object.assign({},this.#n),this.#s&&(r.#s=new Uint8Array(this.#s)),r.#o=this.#o,r}clone(){const t=new Di(this.url);return t.#i=this.#i,this.#s&&(t.#s=this.#s),t.#o=this.#o,t.#n=Object.assign({},this.#n),t.#h=this.#h,this.allowGzip&&(t.allowGzip=!0),t.timeout=this.timeout,this.allowInsecureAuthentication&&(t.allowInsecureAuthentication=!0),t.#c=this.#c,t.#m=this.#m,t.#p=this.#p,t.#u=Object.assign({},this.#u),t.#f=this.#f,t}static lockConfig(){$l=!0}static getGateway(t){return ao[t.toLowerCase()]||null}static registerGateway(t,e){if(t=t.toLowerCase(),t==="http"||t==="https")throw new Error(`cannot intercept ${t}; use registerGetUrl`);if($l)throw new Error("gateways locked");ao[t]=e}static registerGetUrl(t){if($l)throw new Error("gateways locked");Xh=t}static createGetUrlFunc(t){return jp(t)}static createDataGateway(){return tm}static createIpfsGatewayFunc(t){return em(t)}}class rr{#t;#e;#n;#i;#r;#a;toString(){return`<FetchResponse status=${this.statusCode} body=${this.#i?xt(this.#i):"null"}>`}get statusCode(){return this.#t}get statusMessage(){return this.#e}get headers(){return Object.assign({},this.#n)}get body(){return this.#i==null?null:new Uint8Array(this.#i)}get bodyText(){try{return this.#i==null?"":Oo(this.#i)}catch{it(!1,"response body is not valid UTF-8 data","UNSUPPORTED_OPERATION",{operation:"bodyText",info:{response:this}})}}get bodyJson(){try{return JSON.parse(this.bodyText)}catch{it(!1,"response body is not valid JSON","UNSUPPORTED_OPERATION",{operation:"bodyJson",info:{response:this}})}}[Symbol.iterator](){const t=this.headers,e=Object.keys(t);let n=0;return{next:()=>{if(n<e.length){const r=e[n++];return{value:[r,t[r]],done:!1}}return{value:void 0,done:!0}}}}constructor(t,e,n,r,s){this.#t=t,this.#e=e,this.#n=Object.keys(n).reduce((a,o)=>(a[o.toLowerCase()]=String(n[o]),a),{}),this.#i=r==null?null:new Uint8Array(r),this.#r=s||null,this.#a={message:""}}makeServerError(t,e){let n;t?n=`CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${t})`:(t=`${this.statusCode} ${this.statusMessage}`,n=`CLIENT ESCALATED SERVER ERROR (${t})`);const r=new rr(599,n,this.headers,this.body,this.#r||void 0);return r.#a={message:t,error:e},r}throwThrottleError(t,e){e==null?e=-1:F(Number.isInteger(e)&&e>=0,"invalid stall timeout","stall",e);const n=new Error(t||"throttling requests");throw Dt(n,{stall:e,throttle:!0}),n}getHeader(t){return this.headers[t.toLowerCase()]}hasBody(){return this.#i!=null}get request(){return this.#r}ok(){return this.#a.message===""&&this.statusCode>=200&&this.statusCode<300}assertOk(){if(this.ok())return;let{message:t,error:e}=this.#a;t===""&&(t=`server response ${this.statusCode} ${this.statusMessage}`);let n=null;this.request&&(n=this.request.url);let r=null;try{this.#i&&(r=Oo(this.#i))}catch{}it(!1,t,"SERVER_ERROR",{request:this.request||"unknown request",response:this,error:e,info:{requestUrl:n,responseBody:r,responseStatus:`${this.statusCode} ${this.statusMessage}`}})}}function qh(){return new Date().getTime()}function Kw(i){return Qn(i.replace(/%([0-9a-f][0-9a-f])/gi,(t,e)=>String.fromCharCode(parseInt(e,16))))}function Yw(i){return new Promise(t=>setTimeout(t,i))}const Jw=BigInt(-1),Hn=BigInt(0),gs=BigInt(1),Qw=BigInt(5),cs={};let vs="0000";for(;vs.length<80;)vs+=vs;function pr(i){let t=vs;for(;t.length<i;)t+=t;return BigInt("1"+t.substring(0,i))}function qs(i,t,e){const n=BigInt(t.width);if(t.signed){const r=gs<<n-gs;it(e==null||i>=-r&&i<r,"overflow","NUMERIC_FAULT",{operation:e,fault:"overflow",value:i}),i>Hn?i=Fo(Sr(i,n),n):i=-Fo(Sr(-i,n),n)}else{const r=gs<<n;it(e==null||i>=0&&i<r,"overflow","NUMERIC_FAULT",{operation:e,fault:"overflow",value:i}),i=(i%r+r)%r&r-gs}return i}function jl(i){typeof i=="number"&&(i=`fixed128x${i}`);let t=!0,e=128,n=18;if(typeof i=="string"){if(i!=="fixed")if(i==="ufixed")t=!1;else{const s=i.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);F(s,"invalid fixed format","format",i),t=s[1]!=="u",e=parseInt(s[2]),n=parseInt(s[3])}}else if(i){const s=i,a=(o,l,c)=>s[o]==null?c:(F(typeof s[o]===l,"invalid fixed format ("+o+" not "+l+")","format."+o,s[o]),s[o]);t=a("signed","boolean",t),e=a("width","number",e),n=a("decimals","number",n)}F(e%8===0,"invalid FixedNumber width (not byte aligned)","format.width",e),F(n<=80,"invalid FixedNumber decimals (too large)","format.decimals",n);const r=(t?"":"u")+"fixed"+String(e)+"x"+String(n);return{signed:t,width:e,decimals:n,name:r}}function Zw(i,t){let e="";i<Hn&&(e="-",i*=Jw);let n=i.toString();if(t===0)return e+n;for(;n.length<=t;)n=vs+n;const r=n.length-t;for(n=n.substring(0,r)+"."+n.substring(r);n[0]==="0"&&n[1]!==".";)n=n.substring(1);for(;n[n.length-1]==="0"&&n[n.length-2]!==".";)n=n.substring(0,n.length-1);return e+n}class er{format;#t;#e;#n;_value;constructor(t,e,n){Ta(t,cs,"FixedNumber"),this.#e=e,this.#t=n;const r=Zw(e,n.decimals);Dt(this,{format:n.name,_value:r}),this.#n=pr(n.decimals)}get signed(){return this.#t.signed}get width(){return this.#t.width}get decimals(){return this.#t.decimals}get value(){return this.#e}#i(t){F(this.format===t.format,"incompatible format; use fixedNumber.toFormat","other",t)}#r(t,e){return t=qs(t,this.#t,e),new er(cs,t,this.#t)}#a(t,e){return this.#i(t),this.#r(this.#e+t.#e,e)}addUnsafe(t){return this.#a(t)}add(t){return this.#a(t,"add")}#s(t,e){return this.#i(t),this.#r(this.#e-t.#e,e)}subUnsafe(t){return this.#s(t)}sub(t){return this.#s(t,"sub")}#o(t,e){return this.#i(t),this.#r(this.#e*t.#e/this.#n,e)}mulUnsafe(t){return this.#o(t)}mul(t){return this.#o(t,"mul")}mulSignal(t){this.#i(t);const e=this.#e*t.#e;return it(e%this.#n===Hn,"precision lost during signalling mul","NUMERIC_FAULT",{operation:"mulSignal",fault:"underflow",value:this}),this.#r(e/this.#n,"mulSignal")}#h(t,e){return it(t.#e!==Hn,"division by zero","NUMERIC_FAULT",{operation:"div",fault:"divide-by-zero",value:this}),this.#i(t),this.#r(this.#e*this.#n/t.#e,e)}divUnsafe(t){return this.#h(t)}div(t){return this.#h(t,"div")}divSignal(t){it(t.#e!==Hn,"division by zero","NUMERIC_FAULT",{operation:"div",fault:"divide-by-zero",value:this}),this.#i(t);const e=this.#e*this.#n;return it(e%t.#e===Hn,"precision lost during signalling div","NUMERIC_FAULT",{operation:"divSignal",fault:"underflow",value:this}),this.#r(e/t.#e,"divSignal")}cmp(t){let e=this.value,n=t.value;const r=this.decimals-t.decimals;return r>0?n*=pr(r):r<0&&(e*=pr(-r)),e<n?-1:e>n?1:0}eq(t){return this.cmp(t)===0}lt(t){return this.cmp(t)<0}lte(t){return this.cmp(t)<=0}gt(t){return this.cmp(t)>0}gte(t){return this.cmp(t)>=0}floor(){let t=this.#e;return this.#e<Hn&&(t-=this.#n-gs),t=this.#e/this.#n*this.#n,this.#r(t,"floor")}ceiling(){let t=this.#e;return this.#e>Hn&&(t+=this.#n-gs),t=this.#e/this.#n*this.#n,this.#r(t,"ceiling")}round(t){if(t==null&&(t=0),t>=this.decimals)return this;const e=this.decimals-t,n=Qw*pr(e-1);let r=this.value+n;const s=pr(e);return r=r/s*s,qs(r,this.#t,"round"),new er(cs,r,this.#t)}isZero(){return this.#e===Hn}isNegative(){return this.#e<Hn}toString(){return this._value}toUnsafeFloat(){return parseFloat(this.toString())}toFormat(t){return er.fromString(this.toString(),t)}static fromValue(t,e,n){const r=e==null?0:Vt(e),s=jl(n);let a=bt(t,"value");const o=r-s.decimals;if(o>0){const l=pr(o);it(a%l===Hn,"value loses precision for format","NUMERIC_FAULT",{operation:"fromValue",fault:"underflow",value:t}),a/=l}else o<0&&(a*=pr(-o));return qs(a,s,"fromValue"),new er(cs,a,s)}static fromString(t,e){const n=t.match(/^(-?)([0-9]*)\.?([0-9]*)$/);F(n&&n[2].length+n[3].length>0,"invalid FixedNumber string value","value",t);const r=jl(e);let s=n[2]||"0",a=n[3]||"";for(;a.length<r.decimals;)a+=vs;it(a.substring(r.decimals).match(/^0*$/),"too many decimals for format","NUMERIC_FAULT",{operation:"fromString",fault:"underflow",value:t}),a=a.substring(0,r.decimals);const o=BigInt(n[1]+s+a);return qs(o,r,"fromString"),new er(cs,o,r)}static fromBytes(t,e){let n=el(Jt(t,"value"));const r=jl(e);return r.signed&&(n=Fo(n,r.width)),qs(n,r,"fromBytes"),new er(cs,n,r)}}function $w(i){let t=i.toString(16);for(;t.length<2;)t="0"+t;return"0x"+t}function Kh(i,t,e){let n=0;for(let r=0;r<e;r++)n=n*256+i[t+r];return n}function Yh(i,t,e,n){const r=[];for(;e<t+1+n;){const s=im(i,e);r.push(s.result),e+=s.consumed,it(e<=t+1+n,"child data too short","BUFFER_OVERRUN",{buffer:i,length:n,offset:t})}return{consumed:1+n,result:r}}function im(i,t){it(i.length!==0,"data too short","BUFFER_OVERRUN",{buffer:i,length:0,offset:1});const e=n=>{it(n<=i.length,"data short segment too short","BUFFER_OVERRUN",{buffer:i,length:i.length,offset:n})};if(i[t]>=248){const n=i[t]-247;e(t+1+n);const r=Kh(i,t+1,n);return e(t+1+n+r),Yh(i,t,t+1+n,n+r)}else if(i[t]>=192){const n=i[t]-192;return e(t+1+n),Yh(i,t,t+1,n)}else if(i[t]>=184){const n=i[t]-183;e(t+1+n);const r=Kh(i,t+1,n);e(t+1+n+r);const s=xt(i.slice(t+1+n,t+1+n+r));return{consumed:1+n+r,result:s}}else if(i[t]>=128){const n=i[t]-128;e(t+1+n);const r=xt(i.slice(t+1,t+1+n));return{consumed:1+n,result:r}}return{consumed:1,result:$w(i[t])}}function Ra(i){const t=Jt(i,"data"),e=im(t,0);return F(e.consumed===t.length,"unexpected junk after rlp payload","data",i),e.result}function Jh(i){const t=[];for(;i;)t.unshift(i&255),i>>=8;return t}function rm(i){if(Array.isArray(i)){let n=[];if(i.forEach(function(s){n=n.concat(rm(s))}),n.length<=55)return n.unshift(192+n.length),n;const r=Jh(n.length);return r.unshift(247+r.length),r.concat(n)}const t=Array.prototype.slice.call(Jt(i,"object"));if(t.length===1&&t[0]<=127)return t;if(t.length<=55)return t.unshift(128+t.length),t;const e=Jh(t.length);return e.unshift(183+e.length),e.concat(t)}const Qh="0123456789abcdef";function Ri(i){let t="0x";for(const e of rm(i))t+=Qh[e>>4],t+=Qh[e&15];return t}function jw(i,t){let e=18;return e=Vt(t,"unit"),er.fromValue(i,e,{decimals:e,width:512}).toString()}function sm(i){return jw(i,18)}const un=32,cu=new Uint8Array(un),tA=["then"],lo={},am=new WeakMap;function xr(i){return am.get(i)}function Zh(i,t){am.set(i,t)}function Ks(i,t){const e=new Error(`deferred error during ABI decoding triggered accessing ${i}`);throw e.error=t,e}function uu(i,t,e){return i.indexOf(null)>=0?t.map((n,r)=>n instanceof Ei?uu(xr(n),n,e):n):i.reduce((n,r,s)=>{let a=t.getValue(r);return r in n||(e&&a instanceof Ei&&(a=uu(xr(a),a,e)),n[r]=a),n},{})}class Ei extends Array{#t;constructor(...t){const e=t[0];let n=t[1],r=(t[2]||[]).slice(),s=!0;e!==lo&&(n=t,r=[],s=!1),super(n.length),n.forEach((l,c)=>{this[c]=l});const a=r.reduce((l,c)=>(typeof c=="string"&&l.set(c,(l.get(c)||0)+1),l),new Map);if(Zh(this,Object.freeze(n.map((l,c)=>{const u=r[c];return u!=null&&a.get(u)===1?u:null}))),this.#t=[],this.#t==null&&this.#t,!s)return;Object.freeze(this);const o=new Proxy(this,{get:(l,c,u)=>{if(typeof c=="string"){if(c.match(/^[0-9]+$/)){const f=Vt(c,"%index");if(f<0||f>=this.length)throw new RangeError("out of result range");const d=l[f];return d instanceof Error&&Ks(`index ${f}`,d),d}if(tA.indexOf(c)>=0)return Reflect.get(l,c,u);const h=l[c];if(h instanceof Function)return function(...f){return h.apply(this===u?l:this,f)};if(!(c in l))return l.getValue.apply(this===u?l:this,[c])}return Reflect.get(l,c,u)}});return Zh(o,xr(this)),o}toArray(t){const e=[];return this.forEach((n,r)=>{n instanceof Error&&Ks(`index ${r}`,n),t&&n instanceof Ei&&(n=n.toArray(t)),e.push(n)}),e}toObject(t){const e=xr(this);return e.reduce((n,r,s)=>(it(r!=null,`value at index ${s} unnamed`,"UNSUPPORTED_OPERATION",{operation:"toObject()"}),uu(e,this,t)),{})}slice(t,e){t==null&&(t=0),t<0&&(t+=this.length,t<0&&(t=0)),e==null&&(e=this.length),e<0&&(e+=this.length,e<0&&(e=0)),e>this.length&&(e=this.length);const n=xr(this),r=[],s=[];for(let a=t;a<e;a++)r.push(this[a]),s.push(n[a]);return new Ei(lo,r,s)}filter(t,e){const n=xr(this),r=[],s=[];for(let a=0;a<this.length;a++){const o=this[a];o instanceof Error&&Ks(`index ${a}`,o),t.call(e,o,a,this)&&(r.push(o),s.push(n[a]))}return new Ei(lo,r,s)}map(t,e){const n=[];for(let r=0;r<this.length;r++){const s=this[r];s instanceof Error&&Ks(`index ${r}`,s),n.push(t.call(e,s,r,this))}return n}getValue(t){const e=xr(this).indexOf(t);if(e===-1)return;const n=this[e];return n instanceof Error&&Ks(`property ${JSON.stringify(t)}`,n.error),n}static fromItems(t,e){return new Ei(lo,t,e)}}function $h(i){let t=Ge(i);return it(t.length<=un,"value out-of-bounds","BUFFER_OVERRUN",{buffer:t,length:un,offset:t.length}),t.length!==un&&(t=cn(Me([cu.slice(t.length%un),t]))),t}class Bi{name;type;localName;dynamic;constructor(t,e,n,r){Dt(this,{name:t,type:e,localName:n,dynamic:r},{name:"string",type:"string",localName:"string",dynamic:"boolean"})}_throwError(t,e){F(!1,t,this.localName,e)}}class fu{#t;#e;constructor(){this.#t=[],this.#e=0}get data(){return Me(this.#t)}get length(){return this.#e}#n(t){return this.#t.push(t),this.#e+=t.length,t.length}appendWriter(t){return this.#n(cn(t.data))}writeBytes(t){let e=cn(t);const n=e.length%un;return n&&(e=cn(Me([e,cu.slice(n)]))),this.#n(e)}writeValue(t){return this.#n($h(t))}writeUpdatableValue(){const t=this.#t.length;return this.#t.push(cu),this.#e+=un,e=>{this.#t[t]=$h(e)}}}class ju{allowLoose;#t;#e;#n;#i;#r;constructor(t,e,n){Dt(this,{allowLoose:!!e}),this.#t=cn(t),this.#n=0,this.#i=null,this.#r=n??1024,this.#e=0}get data(){return xt(this.#t)}get dataLength(){return this.#t.length}get consumed(){return this.#e}get bytes(){return new Uint8Array(this.#t)}#a(t){if(this.#i)return this.#i.#a(t);this.#n+=t,it(this.#r<1||this.#n<=this.#r*this.dataLength,`compressed ABI data exceeds inflation ratio of ${this.#r} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`,"BUFFER_OVERRUN",{buffer:cn(this.#t),offset:this.#e,length:t,info:{bytesRead:this.#n,dataLength:this.dataLength}})}#s(t,e,n){let r=Math.ceil(e/un)*un;return this.#e+r>this.#t.length&&(this.allowLoose&&n&&this.#e+e<=this.#t.length?r=e:it(!1,"data out-of-bounds","BUFFER_OVERRUN",{buffer:cn(this.#t),length:this.#t.length,offset:this.#e+r})),this.#t.slice(this.#e,this.#e+r)}subReader(t){const e=new ju(this.#t.slice(this.#e+t),this.allowLoose,this.#r);return e.#i=this,e}readBytes(t,e){let n=this.#s(0,t,!!e);return this.#a(t),this.#e+=n.length,n.slice(0,t)}readValue(){return el(this.readBytes(un))}readIndex(){return Lw(this.readBytes(un))}}function Bo(i){if(!Number.isSafeInteger(i)||i<0)throw new Error(`Wrong positive integer: ${i}`)}function tf(i,...t){if(!(i instanceof Uint8Array))throw new Error("Expected Uint8Array");if(t.length>0&&!t.includes(i.length))throw new Error(`Expected Uint8Array of length ${t}, not of length=${i.length}`)}function eA(i){if(typeof i!="function"||typeof i.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");Bo(i.outputLen),Bo(i.blockLen)}function Ms(i,t=!0){if(i.destroyed)throw new Error("Hash instance has been destroyed");if(t&&i.finished)throw new Error("Hash#digest() has already been called")}function om(i,t){tf(i);const e=t.outputLen;if(i.length<e)throw new Error(`digestInto() expects output buffer of length at least ${e}`)}const tc=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0;const lm=i=>i instanceof Uint8Array,nA=i=>new Uint32Array(i.buffer,i.byteOffset,Math.floor(i.byteLength/4)),ec=i=>new DataView(i.buffer,i.byteOffset,i.byteLength),ii=(i,t)=>i<<32-t|i>>>t,iA=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;if(!iA)throw new Error("Non little-endian hardware is not supported");function rA(i){if(typeof i!="string")throw new Error(`utf8ToBytes expected string, got ${typeof i}`);return new Uint8Array(new TextEncoder().encode(i))}function nl(i){if(typeof i=="string"&&(i=rA(i)),!lm(i))throw new Error(`expected Uint8Array, got ${typeof i}`);return i}function sA(...i){const t=new Uint8Array(i.reduce((n,r)=>n+r.length,0));let e=0;return i.forEach(n=>{if(!lm(n))throw new Error("Uint8Array expected");t.set(n,e),e+=n.length}),t}class ef{clone(){return this._cloneInto()}}function nf(i){const t=n=>i().update(nl(n)).digest(),e=i();return t.outputLen=e.outputLen,t.blockLen=e.blockLen,t.create=()=>i(),t}function aA(i=32){if(tc&&typeof tc.getRandomValues=="function")return tc.getRandomValues(new Uint8Array(i));throw new Error("crypto.getRandomValues must be defined")}class cm extends ef{constructor(t,e){super(),this.finished=!1,this.destroyed=!1,eA(t);const n=nl(e);if(this.iHash=t.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const r=this.blockLen,s=new Uint8Array(r);s.set(n.length>r?t.create().update(n).digest():n);for(let a=0;a<s.length;a++)s[a]^=54;this.iHash.update(s),this.oHash=t.create();for(let a=0;a<s.length;a++)s[a]^=106;this.oHash.update(s),s.fill(0)}update(t){return Ms(this),this.iHash.update(t),this}digestInto(t){Ms(this),tf(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:n,finished:r,destroyed:s,blockLen:a,outputLen:o}=this;return t=t,t.finished=r,t.destroyed=s,t.blockLen=a,t.outputLen=o,t.oHash=e._cloneInto(t.oHash),t.iHash=n._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const um=(i,t,e)=>new cm(i,t).update(e).digest();um.create=(i,t)=>new cm(i,t);function oA(i,t,e,n){if(typeof i.setBigUint64=="function")return i.setBigUint64(t,e,n);const r=BigInt(32),s=BigInt(4294967295),a=Number(e>>r&s),o=Number(e&s),l=n?4:0,c=n?0:4;i.setUint32(t+l,a,n),i.setUint32(t+c,o,n)}class fm extends ef{constructor(t,e,n,r){super(),this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=r,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=ec(this.buffer)}update(t){Ms(this);const{view:e,buffer:n,blockLen:r}=this;t=nl(t);const s=t.length;for(let a=0;a<s;){const o=Math.min(r-this.pos,s-a);if(o===r){const l=ec(t);for(;r<=s-a;a+=r)this.process(l,a);continue}n.set(t.subarray(a,a+o),this.pos),this.pos+=o,a+=o,this.pos===r&&(this.process(e,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){Ms(this),om(t,this),this.finished=!0;const{buffer:e,view:n,blockLen:r,isLE:s}=this;let{pos:a}=this;e[a++]=128,this.buffer.subarray(a).fill(0),this.padOffset>r-a&&(this.process(n,0),a=0);for(let h=a;h<r;h++)e[h]=0;oA(n,r-8,BigInt(this.length*8),s),this.process(n,0);const o=ec(t),l=this.outputLen;if(l%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const c=l/4,u=this.get();if(c>u.length)throw new Error("_sha2: outputLen bigger than state");for(let h=0;h<c;h++)o.setUint32(4*h,u[h],s)}digest(){const{buffer:t,outputLen:e}=this;this.digestInto(t);const n=t.slice(0,e);return this.destroy(),n}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:e,buffer:n,length:r,finished:s,destroyed:a,pos:o}=this;return t.length=r,t.pos=o,t.finished=s,t.destroyed=a,r%e&&t.buffer.set(n),t}}const lA=(i,t,e)=>i&t^~i&e,cA=(i,t,e)=>i&t^i&e^t&e,uA=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Ji=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Qi=new Uint32Array(64);class fA extends fm{constructor(){super(64,32,8,!1),this.A=Ji[0]|0,this.B=Ji[1]|0,this.C=Ji[2]|0,this.D=Ji[3]|0,this.E=Ji[4]|0,this.F=Ji[5]|0,this.G=Ji[6]|0,this.H=Ji[7]|0}get(){const{A:t,B:e,C:n,D:r,E:s,F:a,G:o,H:l}=this;return[t,e,n,r,s,a,o,l]}set(t,e,n,r,s,a,o,l){this.A=t|0,this.B=e|0,this.C=n|0,this.D=r|0,this.E=s|0,this.F=a|0,this.G=o|0,this.H=l|0}process(t,e){for(let h=0;h<16;h++,e+=4)Qi[h]=t.getUint32(e,!1);for(let h=16;h<64;h++){const f=Qi[h-15],d=Qi[h-2],g=ii(f,7)^ii(f,18)^f>>>3,y=ii(d,17)^ii(d,19)^d>>>10;Qi[h]=y+Qi[h-7]+g+Qi[h-16]|0}let{A:n,B:r,C:s,D:a,E:o,F:l,G:c,H:u}=this;for(let h=0;h<64;h++){const f=ii(o,6)^ii(o,11)^ii(o,25),d=u+f+lA(o,l,c)+uA[h]+Qi[h]|0,y=(ii(n,2)^ii(n,13)^ii(n,22))+cA(n,r,s)|0;u=c,c=l,l=o,o=a+d|0,a=s,s=r,r=n,n=d+y|0}n=n+this.A|0,r=r+this.B|0,s=s+this.C|0,a=a+this.D|0,o=o+this.E|0,l=l+this.F|0,c=c+this.G|0,u=u+this.H|0,this.set(n,r,s,a,o,l,c,u)}roundClean(){Qi.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const hm=nf(()=>new fA),co=BigInt(2**32-1),hu=BigInt(32);function dm(i,t=!1){return t?{h:Number(i&co),l:Number(i>>hu&co)}:{h:Number(i>>hu&co)|0,l:Number(i&co)|0}}function pm(i,t=!1){let e=new Uint32Array(i.length),n=new Uint32Array(i.length);for(let r=0;r<i.length;r++){const{h:s,l:a}=dm(i[r],t);[e[r],n[r]]=[s,a]}return[e,n]}const hA=(i,t)=>BigInt(i>>>0)<<hu|BigInt(t>>>0),dA=(i,t,e)=>i>>>e,pA=(i,t,e)=>i<<32-e|t>>>e,mA=(i,t,e)=>i>>>e|t<<32-e,gA=(i,t,e)=>i<<32-e|t>>>e,yA=(i,t,e)=>i<<64-e|t>>>e-32,xA=(i,t,e)=>i>>>e-32|t<<64-e,_A=(i,t)=>t,vA=(i,t)=>i,mm=(i,t,e)=>i<<e|t>>>32-e,gm=(i,t,e)=>t<<e|i>>>32-e,ym=(i,t,e)=>t<<e-32|i>>>64-e,xm=(i,t,e)=>i<<e-32|t>>>64-e;function bA(i,t,e,n){const r=(t>>>0)+(n>>>0);return{h:i+e+(r/2**32|0)|0,l:r|0}}const wA=(i,t,e)=>(i>>>0)+(t>>>0)+(e>>>0),AA=(i,t,e,n)=>t+e+n+(i/2**32|0)|0,SA=(i,t,e,n)=>(i>>>0)+(t>>>0)+(e>>>0)+(n>>>0),EA=(i,t,e,n,r)=>t+e+n+r+(i/2**32|0)|0,MA=(i,t,e,n,r)=>(i>>>0)+(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0),TA=(i,t,e,n,r,s)=>t+e+n+r+s+(i/2**32|0)|0,qt={fromBig:dm,split:pm,toBig:hA,shrSH:dA,shrSL:pA,rotrSH:mA,rotrSL:gA,rotrBH:yA,rotrBL:xA,rotr32H:_A,rotr32L:vA,rotlSH:mm,rotlSL:gm,rotlBH:ym,rotlBL:xm,add:bA,add3L:wA,add3H:AA,add4L:SA,add4H:EA,add5H:TA,add5L:MA},[CA,RA]=qt.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(i=>BigInt(i))),Zi=new Uint32Array(80),$i=new Uint32Array(80);class PA extends fm{constructor(){super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209}get(){const{Ah:t,Al:e,Bh:n,Bl:r,Ch:s,Cl:a,Dh:o,Dl:l,Eh:c,El:u,Fh:h,Fl:f,Gh:d,Gl:g,Hh:y,Hl:m}=this;return[t,e,n,r,s,a,o,l,c,u,h,f,d,g,y,m]}set(t,e,n,r,s,a,o,l,c,u,h,f,d,g,y,m){this.Ah=t|0,this.Al=e|0,this.Bh=n|0,this.Bl=r|0,this.Ch=s|0,this.Cl=a|0,this.Dh=o|0,this.Dl=l|0,this.Eh=c|0,this.El=u|0,this.Fh=h|0,this.Fl=f|0,this.Gh=d|0,this.Gl=g|0,this.Hh=y|0,this.Hl=m|0}process(t,e){for(let M=0;M<16;M++,e+=4)Zi[M]=t.getUint32(e),$i[M]=t.getUint32(e+=4);for(let M=16;M<80;M++){const v=Zi[M-15]|0,S=$i[M-15]|0,A=qt.rotrSH(v,S,1)^qt.rotrSH(v,S,8)^qt.shrSH(v,S,7),T=qt.rotrSL(v,S,1)^qt.rotrSL(v,S,8)^qt.shrSL(v,S,7),x=Zi[M-2]|0,E=$i[M-2]|0,R=qt.rotrSH(x,E,19)^qt.rotrBH(x,E,61)^qt.shrSH(x,E,6),I=qt.rotrSL(x,E,19)^qt.rotrBL(x,E,61)^qt.shrSL(x,E,6),N=qt.add4L(T,I,$i[M-7],$i[M-16]),U=qt.add4H(N,A,R,Zi[M-7],Zi[M-16]);Zi[M]=U|0,$i[M]=N|0}let{Ah:n,Al:r,Bh:s,Bl:a,Ch:o,Cl:l,Dh:c,Dl:u,Eh:h,El:f,Fh:d,Fl:g,Gh:y,Gl:m,Hh:p,Hl:b}=this;for(let M=0;M<80;M++){const v=qt.rotrSH(h,f,14)^qt.rotrSH(h,f,18)^qt.rotrBH(h,f,41),S=qt.rotrSL(h,f,14)^qt.rotrSL(h,f,18)^qt.rotrBL(h,f,41),A=h&d^~h&y,T=f&g^~f&m,x=qt.add5L(b,S,T,RA[M],$i[M]),E=qt.add5H(x,p,v,A,CA[M],Zi[M]),R=x|0,I=qt.rotrSH(n,r,28)^qt.rotrBH(n,r,34)^qt.rotrBH(n,r,39),N=qt.rotrSL(n,r,28)^qt.rotrBL(n,r,34)^qt.rotrBL(n,r,39),U=n&s^n&o^s&o,L=r&a^r&l^a&l;p=y|0,b=m|0,y=d|0,m=g|0,d=h|0,g=f|0,{h,l:f}=qt.add(c|0,u|0,E|0,R|0),c=o|0,u=l|0,o=s|0,l=a|0,s=n|0,a=r|0;const P=qt.add3L(R,N,L);n=qt.add3H(P,E,I,U),r=P|0}({h:n,l:r}=qt.add(this.Ah|0,this.Al|0,n|0,r|0)),{h:s,l:a}=qt.add(this.Bh|0,this.Bl|0,s|0,a|0),{h:o,l}=qt.add(this.Ch|0,this.Cl|0,o|0,l|0),{h:c,l:u}=qt.add(this.Dh|0,this.Dl|0,c|0,u|0),{h,l:f}=qt.add(this.Eh|0,this.El|0,h|0,f|0),{h:d,l:g}=qt.add(this.Fh|0,this.Fl|0,d|0,g|0),{h:y,l:m}=qt.add(this.Gh|0,this.Gl|0,y|0,m|0),{h:p,l:b}=qt.add(this.Hh|0,this.Hl|0,p|0,b|0),this.set(n,r,s,a,o,l,c,u,h,f,d,g,y,m,p,b)}roundClean(){Zi.fill(0),$i.fill(0)}destroy(){this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}const IA=nf(()=>new PA);function NA(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}const jh=NA();jh.crypto||jh.msCrypto;function LA(i){switch(i){case"sha256":return hm.create();case"sha512":return IA.create()}F(!1,"invalid hashing algorithm name","algorithm",i)}const[_m,vm,bm]=[[],[],[]],UA=BigInt(0),Ys=BigInt(1),DA=BigInt(2),FA=BigInt(7),OA=BigInt(256),BA=BigInt(113);for(let i=0,t=Ys,e=1,n=0;i<24;i++){[e,n]=[n,(2*e+3*n)%5],_m.push(2*(5*n+e)),vm.push((i+1)*(i+2)/2%64);let r=UA;for(let s=0;s<7;s++)t=(t<<Ys^(t>>FA)*BA)%OA,t&DA&&(r^=Ys<<(Ys<<BigInt(s))-Ys);bm.push(r)}const[kA,GA]=pm(bm,!0),td=(i,t,e)=>e>32?ym(i,t,e):mm(i,t,e),ed=(i,t,e)=>e>32?xm(i,t,e):gm(i,t,e);function HA(i,t=24){const e=new Uint32Array(10);for(let n=24-t;n<24;n++){for(let a=0;a<10;a++)e[a]=i[a]^i[a+10]^i[a+20]^i[a+30]^i[a+40];for(let a=0;a<10;a+=2){const o=(a+8)%10,l=(a+2)%10,c=e[l],u=e[l+1],h=td(c,u,1)^e[o],f=ed(c,u,1)^e[o+1];for(let d=0;d<50;d+=10)i[a+d]^=h,i[a+d+1]^=f}let r=i[2],s=i[3];for(let a=0;a<24;a++){const o=vm[a],l=td(r,s,o),c=ed(r,s,o),u=_m[a];r=i[u],s=i[u+1],i[u]=l,i[u+1]=c}for(let a=0;a<50;a+=10){for(let o=0;o<10;o++)e[o]=i[a+o];for(let o=0;o<10;o++)i[a+o]^=~e[(o+2)%10]&e[(o+4)%10]}i[0]^=kA[n],i[1]^=GA[n]}e.fill(0)}class rf extends ef{constructor(t,e,n,r=!1,s=24){if(super(),this.blockLen=t,this.suffix=e,this.outputLen=n,this.enableXOF=r,this.rounds=s,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,Bo(n),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=nA(this.state)}keccak(){HA(this.state32,this.rounds),this.posOut=0,this.pos=0}update(t){Ms(this);const{blockLen:e,state:n}=this;t=nl(t);const r=t.length;for(let s=0;s<r;){const a=Math.min(e-this.pos,r-s);for(let o=0;o<a;o++)n[this.pos++]^=t[s++];this.pos===e&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:t,suffix:e,pos:n,blockLen:r}=this;t[n]^=e,(e&128)!==0&&n===r-1&&this.keccak(),t[r-1]^=128,this.keccak()}writeInto(t){Ms(this,!1),tf(t),this.finish();const e=this.state,{blockLen:n}=this;for(let r=0,s=t.length;r<s;){this.posOut>=n&&this.keccak();const a=Math.min(n-this.posOut,s-r);t.set(e.subarray(this.posOut,this.posOut+a),r),this.posOut+=a,r+=a}return t}xofInto(t){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(t)}xof(t){return Bo(t),this.xofInto(new Uint8Array(t))}digestInto(t){if(om(t,this),this.finished)throw new Error("digest() was already called");return this.writeInto(t),this.destroy(),t}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(t){const{blockLen:e,suffix:n,outputLen:r,rounds:s,enableXOF:a}=this;return t||(t=new rf(e,n,r,a,s)),t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=s,t.suffix=n,t.outputLen=r,t.enableXOF=a,t.destroyed=this.destroyed,t}}const zA=(i,t,e)=>nf(()=>new rf(t,i,e)),VA=zA(1,136,256/8);let wm=!1;const Am=function(i){return VA(i)};let Sm=Am;function Fe(i){const t=Jt(i,"data");return xt(Sm(t))}Fe._=Am;Fe.lock=function(){wm=!0};Fe.register=function(i){if(wm)throw new TypeError("keccak256 is locked");Sm=i};Object.freeze(Fe);const Em=function(i){return LA("sha256").update(i).digest()};let Mm=Em,Tm=!1;function Ds(i){const t=Jt(i,"data");return xt(Mm(t))}Ds._=Em;Ds.lock=function(){Tm=!0};Ds.register=function(i){if(Tm)throw new Error("sha256 is locked");Mm=i};Object.freeze(Ds);Object.freeze(Ds);BigInt(0);const WA=BigInt(1),XA=BigInt(2),il=i=>i instanceof Uint8Array,qA=Array.from({length:256},(i,t)=>t.toString(16).padStart(2,"0"));function Ts(i){if(!il(i))throw new Error("Uint8Array expected");let t="";for(let e=0;e<i.length;e++)t+=qA[i[e]];return t}function sf(i){if(typeof i!="string")throw new Error("hex string expected, got "+typeof i);return BigInt(i===""?"0":`0x${i}`)}function pa(i){if(typeof i!="string")throw new Error("hex string expected, got "+typeof i);const t=i.length;if(t%2)throw new Error("padded hex string expected, got unpadded hex of length "+t);const e=new Uint8Array(t/2);for(let n=0;n<e.length;n++){const r=n*2,s=i.slice(r,r+2),a=Number.parseInt(s,16);if(Number.isNaN(a)||a<0)throw new Error("Invalid byte sequence");e[n]=a}return e}function Pr(i){return sf(Ts(i))}function af(i){if(!il(i))throw new Error("Uint8Array expected");return sf(Ts(Uint8Array.from(i).reverse()))}function Cs(i,t){return pa(i.toString(16).padStart(t*2,"0"))}function of(i,t){return Cs(i,t).reverse()}function zn(i,t,e){let n;if(typeof t=="string")try{n=pa(t)}catch(s){throw new Error(`${i} must be valid hex string, got "${t}". Cause: ${s}`)}else if(il(t))n=Uint8Array.from(t);else throw new Error(`${i} must be hex string or Uint8Array`);const r=n.length;if(typeof e=="number"&&r!==e)throw new Error(`${i} expected ${e} bytes, got ${r}`);return n}function ma(...i){const t=new Uint8Array(i.reduce((n,r)=>n+r.length,0));let e=0;return i.forEach(n=>{if(!il(n))throw new Error("Uint8Array expected");t.set(n,e),e+=n.length}),t}const lf=i=>(XA<<BigInt(i-1))-WA,nc=i=>new Uint8Array(i),nd=i=>Uint8Array.from(i);function Cm(i,t,e){if(typeof i!="number"||i<2)throw new Error("hashLen must be a number");if(typeof t!="number"||t<2)throw new Error("qByteLen must be a number");if(typeof e!="function")throw new Error("hmacFn must be a function");let n=nc(i),r=nc(i),s=0;const a=()=>{n.fill(1),r.fill(0),s=0},o=(...h)=>e(r,n,...h),l=(h=nc())=>{r=o(nd([0]),h),n=o(),h.length!==0&&(r=o(nd([1]),h),n=o())},c=()=>{if(s++>=1e3)throw new Error("drbg: tried 1000 values");let h=0;const f=[];for(;h<t;){n=o();const d=n.slice();f.push(d),h+=n.length}return ma(...f)};return(h,f)=>{a(),l(h);let d;for(;!(d=f(c()));)l();return a(),d}}const KA={bigint:i=>typeof i=="bigint",function:i=>typeof i=="function",boolean:i=>typeof i=="boolean",string:i=>typeof i=="string",stringOrUint8Array:i=>typeof i=="string"||i instanceof Uint8Array,isSafeInteger:i=>Number.isSafeInteger(i),array:i=>Array.isArray(i),field:(i,t)=>t.Fp.isValid(i),hash:i=>typeof i=="function"&&Number.isSafeInteger(i.outputLen)};function Pa(i,t,e={}){const n=(r,s,a)=>{const o=KA[s];if(typeof o!="function")throw new Error(`Invalid validator "${s}", expected function`);const l=i[r];if(!(a&&l===void 0)&&!o(l,i))throw new Error(`Invalid param ${String(r)}=${l} (${typeof l}), expected ${s}`)};for(const[r,s]of Object.entries(t))n(r,s,!1);for(const[r,s]of Object.entries(e))n(r,s,!0);return i}const YA=Object.freeze(Object.defineProperty({__proto__:null,bitMask:lf,bytesToHex:Ts,bytesToNumberBE:Pr,bytesToNumberLE:af,concatBytes:ma,createHmacDrbg:Cm,ensureBytes:zn,hexToBytes:pa,hexToNumber:sf,numberToBytesBE:Cs,numberToBytesLE:of,validateObject:Pa},Symbol.toStringTag,{value:"Module"}));const Qe=BigInt(0),De=BigInt(1),_r=BigInt(2),JA=BigInt(3),du=BigInt(4),id=BigInt(5),rd=BigInt(8);BigInt(9);BigInt(16);function mn(i,t){const e=i%t;return e>=Qe?e:t+e}function QA(i,t,e){if(e<=Qe||t<Qe)throw new Error("Expected power/modulo > 0");if(e===De)return Qe;let n=De;for(;t>Qe;)t&De&&(n=n*i%e),i=i*i%e,t>>=De;return n}function Rn(i,t,e){let n=i;for(;t-- >Qe;)n*=n,n%=e;return n}function pu(i,t){if(i===Qe||t<=Qe)throw new Error(`invert: expected positive integers, got n=${i} mod=${t}`);let e=mn(i,t),n=t,r=Qe,s=De;for(;e!==Qe;){const o=n/e,l=n%e,c=r-s*o;n=e,e=l,r=s,s=c}if(n!==De)throw new Error("invert: does not exist");return mn(r,t)}function ZA(i){const t=(i-De)/_r;let e,n,r;for(e=i-De,n=0;e%_r===Qe;e/=_r,n++);for(r=_r;r<i&&QA(r,t,i)!==i-De;r++);if(n===1){const a=(i+De)/du;return function(l,c){const u=l.pow(c,a);if(!l.eql(l.sqr(u),c))throw new Error("Cannot find square root");return u}}const s=(e+De)/_r;return function(o,l){if(o.pow(l,t)===o.neg(o.ONE))throw new Error("Cannot find square root");let c=n,u=o.pow(o.mul(o.ONE,r),e),h=o.pow(l,s),f=o.pow(l,e);for(;!o.eql(f,o.ONE);){if(o.eql(f,o.ZERO))return o.ZERO;let d=1;for(let y=o.sqr(f);d<c&&!o.eql(y,o.ONE);d++)y=o.sqr(y);const g=o.pow(u,De<<BigInt(c-d-1));u=o.sqr(g),h=o.mul(h,g),f=o.mul(f,u),c=d}return h}}function $A(i){if(i%du===JA){const t=(i+De)/du;return function(n,r){const s=n.pow(r,t);if(!n.eql(n.sqr(s),r))throw new Error("Cannot find square root");return s}}if(i%rd===id){const t=(i-id)/rd;return function(n,r){const s=n.mul(r,_r),a=n.pow(s,t),o=n.mul(r,a),l=n.mul(n.mul(o,_r),a),c=n.mul(o,n.sub(l,n.ONE));if(!n.eql(n.sqr(c),r))throw new Error("Cannot find square root");return c}}return ZA(i)}const jA=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function tS(i){const t={ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"},e=jA.reduce((n,r)=>(n[r]="function",n),t);return Pa(i,e)}function eS(i,t,e){if(e<Qe)throw new Error("Expected power > 0");if(e===Qe)return i.ONE;if(e===De)return t;let n=i.ONE,r=t;for(;e>Qe;)e&De&&(n=i.mul(n,r)),r=i.sqr(r),e>>=De;return n}function nS(i,t){const e=new Array(t.length),n=t.reduce((s,a,o)=>i.is0(a)?s:(e[o]=s,i.mul(s,a)),i.ONE),r=i.inv(n);return t.reduceRight((s,a,o)=>i.is0(a)?s:(e[o]=i.mul(s,e[o]),i.mul(s,a)),r),e}function Rm(i,t){const e=t!==void 0?t:i.toString(2).length,n=Math.ceil(e/8);return{nBitLength:e,nByteLength:n}}function iS(i,t,e=!1,n={}){if(i<=Qe)throw new Error(`Expected Field ORDER > 0, got ${i}`);const{nBitLength:r,nByteLength:s}=Rm(i,t);if(s>2048)throw new Error("Field lengths over 2048 bytes are not supported");const a=$A(i),o=Object.freeze({ORDER:i,BITS:r,BYTES:s,MASK:lf(r),ZERO:Qe,ONE:De,create:l=>mn(l,i),isValid:l=>{if(typeof l!="bigint")throw new Error(`Invalid field element: expected bigint, got ${typeof l}`);return Qe<=l&&l<i},is0:l=>l===Qe,isOdd:l=>(l&De)===De,neg:l=>mn(-l,i),eql:(l,c)=>l===c,sqr:l=>mn(l*l,i),add:(l,c)=>mn(l+c,i),sub:(l,c)=>mn(l-c,i),mul:(l,c)=>mn(l*c,i),pow:(l,c)=>eS(o,l,c),div:(l,c)=>mn(l*pu(c,i),i),sqrN:l=>l*l,addN:(l,c)=>l+c,subN:(l,c)=>l-c,mulN:(l,c)=>l*c,inv:l=>pu(l,i),sqrt:n.sqrt||(l=>a(o,l)),invertBatch:l=>nS(o,l),cmov:(l,c,u)=>u?c:l,toBytes:l=>e?of(l,s):Cs(l,s),fromBytes:l=>{if(l.length!==s)throw new Error(`Fp.fromBytes: expected ${s}, got ${l.length}`);return e?af(l):Pr(l)}});return Object.freeze(o)}function Pm(i){if(typeof i!="bigint")throw new Error("field order must be bigint");const t=i.toString(2).length;return Math.ceil(t/8)}function Im(i){const t=Pm(i);return t+Math.ceil(t/2)}function rS(i,t,e=!1){const n=i.length,r=Pm(t),s=Im(t);if(n<16||n<s||n>1024)throw new Error(`expected ${s}-1024 bytes of input, got ${n}`);const a=e?Pr(i):af(i),o=mn(a,t-De)+De;return e?of(o,r):Cs(o,r)}const sS=BigInt(0),ic=BigInt(1);function aS(i,t){const e=(r,s)=>{const a=s.negate();return r?a:s},n=r=>{const s=Math.ceil(t/r)+1,a=2**(r-1);return{windows:s,windowSize:a}};return{constTimeNegate:e,unsafeLadder(r,s){let a=i.ZERO,o=r;for(;s>sS;)s&ic&&(a=a.add(o)),o=o.double(),s>>=ic;return a},precomputeWindow(r,s){const{windows:a,windowSize:o}=n(s),l=[];let c=r,u=c;for(let h=0;h<a;h++){u=c,l.push(u);for(let f=1;f<o;f++)u=u.add(c),l.push(u);c=u.double()}return l},wNAF(r,s,a){const{windows:o,windowSize:l}=n(r);let c=i.ZERO,u=i.BASE;const h=BigInt(2**r-1),f=2**r,d=BigInt(r);for(let g=0;g<o;g++){const y=g*l;let m=Number(a&h);a>>=d,m>l&&(m-=f,a+=ic);const p=y,b=y+Math.abs(m)-1,M=g%2!==0,v=m<0;m===0?u=u.add(e(M,s[p])):c=c.add(e(v,s[b]))}return{p:c,f:u}},wNAFCached(r,s,a,o){const l=r._WINDOW_SIZE||1;let c=s.get(r);return c||(c=this.precomputeWindow(r,l),l!==1&&s.set(r,o(c))),this.wNAF(l,c,a)}}}function Nm(i){return tS(i.Fp),Pa(i,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...Rm(i.n,i.nBitLength),...i,p:i.Fp.ORDER})}function oS(i){const t=Nm(i);Pa(t,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:e,Fp:n,a:r}=t;if(e){if(!n.eql(r,n.ZERO))throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");if(typeof e!="object"||typeof e.beta!="bigint"||typeof e.splitScalar!="function")throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")}return Object.freeze({...t})}const{bytesToNumberBE:lS,hexToBytes:cS}=YA,Er={Err:class extends Error{constructor(t=""){super(t)}},_parseInt(i){const{Err:t}=Er;if(i.length<2||i[0]!==2)throw new t("Invalid signature integer tag");const e=i[1],n=i.subarray(2,e+2);if(!e||n.length!==e)throw new t("Invalid signature integer: wrong length");if(n[0]&128)throw new t("Invalid signature integer: negative");if(n[0]===0&&!(n[1]&128))throw new t("Invalid signature integer: unnecessary leading zero");return{d:lS(n),l:i.subarray(e+2)}},toSig(i){const{Err:t}=Er,e=typeof i=="string"?cS(i):i;if(!(e instanceof Uint8Array))throw new Error("ui8a expected");let n=e.length;if(n<2||e[0]!=48)throw new t("Invalid signature tag");if(e[1]!==n-2)throw new t("Invalid signature: incorrect length");const{d:r,l:s}=Er._parseInt(e.subarray(2)),{d:a,l:o}=Er._parseInt(s);if(o.length)throw new t("Invalid signature: left bytes after parsing");return{r,s:a}},hexFromSig(i){const t=c=>Number.parseInt(c[0],16)&8?"00"+c:c,e=c=>{const u=c.toString(16);return u.length&1?`0${u}`:u},n=t(e(i.s)),r=t(e(i.r)),s=n.length/2,a=r.length/2,o=e(s),l=e(a);return`30${e(a+s+4)}02${l}${r}02${o}${n}`}},bi=BigInt(0),Pn=BigInt(1);BigInt(2);const sd=BigInt(3);BigInt(4);function uS(i){const t=oS(i),{Fp:e}=t,n=t.toBytes||((g,y,m)=>{const p=y.toAffine();return ma(Uint8Array.from([4]),e.toBytes(p.x),e.toBytes(p.y))}),r=t.fromBytes||(g=>{const y=g.subarray(1),m=e.fromBytes(y.subarray(0,e.BYTES)),p=e.fromBytes(y.subarray(e.BYTES,2*e.BYTES));return{x:m,y:p}});function s(g){const{a:y,b:m}=t,p=e.sqr(g),b=e.mul(p,g);return e.add(e.add(b,e.mul(g,y)),m)}if(!e.eql(e.sqr(t.Gy),s(t.Gx)))throw new Error("bad generator point: equation left != right");function a(g){return typeof g=="bigint"&&bi<g&&g<t.n}function o(g){if(!a(g))throw new Error("Expected valid bigint: 0 < bigint < curve.n")}function l(g){const{allowedPrivateKeyLengths:y,nByteLength:m,wrapPrivateKey:p,n:b}=t;if(y&&typeof g!="bigint"){if(g instanceof Uint8Array&&(g=Ts(g)),typeof g!="string"||!y.includes(g.length))throw new Error("Invalid key");g=g.padStart(m*2,"0")}let M;try{M=typeof g=="bigint"?g:Pr(zn("private key",g,m))}catch{throw new Error(`private key must be ${m} bytes, hex or bigint, not ${typeof g}`)}return p&&(M=mn(M,b)),o(M),M}const c=new Map;function u(g){if(!(g instanceof h))throw new Error("ProjectivePoint expected")}class h{constructor(y,m,p){if(this.px=y,this.py=m,this.pz=p,y==null||!e.isValid(y))throw new Error("x required");if(m==null||!e.isValid(m))throw new Error("y required");if(p==null||!e.isValid(p))throw new Error("z required")}static fromAffine(y){const{x:m,y:p}=y||{};if(!y||!e.isValid(m)||!e.isValid(p))throw new Error("invalid affine point");if(y instanceof h)throw new Error("projective point not allowed");const b=M=>e.eql(M,e.ZERO);return b(m)&&b(p)?h.ZERO:new h(m,p,e.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(y){const m=e.invertBatch(y.map(p=>p.pz));return y.map((p,b)=>p.toAffine(m[b])).map(h.fromAffine)}static fromHex(y){const m=h.fromAffine(r(zn("pointHex",y)));return m.assertValidity(),m}static fromPrivateKey(y){return h.BASE.multiply(l(y))}_setWindowSize(y){this._WINDOW_SIZE=y,c.delete(this)}assertValidity(){if(this.is0()){if(t.allowInfinityPoint&&!e.is0(this.py))return;throw new Error("bad point: ZERO")}const{x:y,y:m}=this.toAffine();if(!e.isValid(y)||!e.isValid(m))throw new Error("bad point: x or y not FE");const p=e.sqr(m),b=s(y);if(!e.eql(p,b))throw new Error("bad point: equation left != right");if(!this.isTorsionFree())throw new Error("bad point: not in prime-order subgroup")}hasEvenY(){const{y}=this.toAffine();if(e.isOdd)return!e.isOdd(y);throw new Error("Field doesn't support isOdd")}equals(y){u(y);const{px:m,py:p,pz:b}=this,{px:M,py:v,pz:S}=y,A=e.eql(e.mul(m,S),e.mul(M,b)),T=e.eql(e.mul(p,S),e.mul(v,b));return A&&T}negate(){return new h(this.px,e.neg(this.py),this.pz)}double(){const{a:y,b:m}=t,p=e.mul(m,sd),{px:b,py:M,pz:v}=this;let S=e.ZERO,A=e.ZERO,T=e.ZERO,x=e.mul(b,b),E=e.mul(M,M),R=e.mul(v,v),I=e.mul(b,M);return I=e.add(I,I),T=e.mul(b,v),T=e.add(T,T),S=e.mul(y,T),A=e.mul(p,R),A=e.add(S,A),S=e.sub(E,A),A=e.add(E,A),A=e.mul(S,A),S=e.mul(I,S),T=e.mul(p,T),R=e.mul(y,R),I=e.sub(x,R),I=e.mul(y,I),I=e.add(I,T),T=e.add(x,x),x=e.add(T,x),x=e.add(x,R),x=e.mul(x,I),A=e.add(A,x),R=e.mul(M,v),R=e.add(R,R),x=e.mul(R,I),S=e.sub(S,x),T=e.mul(R,E),T=e.add(T,T),T=e.add(T,T),new h(S,A,T)}add(y){u(y);const{px:m,py:p,pz:b}=this,{px:M,py:v,pz:S}=y;let A=e.ZERO,T=e.ZERO,x=e.ZERO;const E=t.a,R=e.mul(t.b,sd);let I=e.mul(m,M),N=e.mul(p,v),U=e.mul(b,S),L=e.add(m,p),P=e.add(M,v);L=e.mul(L,P),P=e.add(I,N),L=e.sub(L,P),P=e.add(m,b);let O=e.add(M,S);return P=e.mul(P,O),O=e.add(I,U),P=e.sub(P,O),O=e.add(p,b),A=e.add(v,S),O=e.mul(O,A),A=e.add(N,U),O=e.sub(O,A),x=e.mul(E,P),A=e.mul(R,U),x=e.add(A,x),A=e.sub(N,x),x=e.add(N,x),T=e.mul(A,x),N=e.add(I,I),N=e.add(N,I),U=e.mul(E,U),P=e.mul(R,P),N=e.add(N,U),U=e.sub(I,U),U=e.mul(E,U),P=e.add(P,U),I=e.mul(N,P),T=e.add(T,I),I=e.mul(O,P),A=e.mul(L,A),A=e.sub(A,I),I=e.mul(L,N),x=e.mul(O,x),x=e.add(x,I),new h(A,T,x)}subtract(y){return this.add(y.negate())}is0(){return this.equals(h.ZERO)}wNAF(y){return d.wNAFCached(this,c,y,m=>{const p=e.invertBatch(m.map(b=>b.pz));return m.map((b,M)=>b.toAffine(p[M])).map(h.fromAffine)})}multiplyUnsafe(y){const m=h.ZERO;if(y===bi)return m;if(o(y),y===Pn)return this;const{endo:p}=t;if(!p)return d.unsafeLadder(this,y);let{k1neg:b,k1:M,k2neg:v,k2:S}=p.splitScalar(y),A=m,T=m,x=this;for(;M>bi||S>bi;)M&Pn&&(A=A.add(x)),S&Pn&&(T=T.add(x)),x=x.double(),M>>=Pn,S>>=Pn;return b&&(A=A.negate()),v&&(T=T.negate()),T=new h(e.mul(T.px,p.beta),T.py,T.pz),A.add(T)}multiply(y){o(y);let m=y,p,b;const{endo:M}=t;if(M){const{k1neg:v,k1:S,k2neg:A,k2:T}=M.splitScalar(m);let{p:x,f:E}=this.wNAF(S),{p:R,f:I}=this.wNAF(T);x=d.constTimeNegate(v,x),R=d.constTimeNegate(A,R),R=new h(e.mul(R.px,M.beta),R.py,R.pz),p=x.add(R),b=E.add(I)}else{const{p:v,f:S}=this.wNAF(m);p=v,b=S}return h.normalizeZ([p,b])[0]}multiplyAndAddUnsafe(y,m,p){const b=h.BASE,M=(S,A)=>A===bi||A===Pn||!S.equals(b)?S.multiplyUnsafe(A):S.multiply(A),v=M(this,m).add(M(y,p));return v.is0()?void 0:v}toAffine(y){const{px:m,py:p,pz:b}=this,M=this.is0();y==null&&(y=M?e.ONE:e.inv(b));const v=e.mul(m,y),S=e.mul(p,y),A=e.mul(b,y);if(M)return{x:e.ZERO,y:e.ZERO};if(!e.eql(A,e.ONE))throw new Error("invZ was invalid");return{x:v,y:S}}isTorsionFree(){const{h:y,isTorsionFree:m}=t;if(y===Pn)return!0;if(m)return m(h,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:y,clearCofactor:m}=t;return y===Pn?this:m?m(h,this):this.multiplyUnsafe(t.h)}toRawBytes(y=!0){return this.assertValidity(),n(h,this,y)}toHex(y=!0){return Ts(this.toRawBytes(y))}}h.BASE=new h(t.Gx,t.Gy,e.ONE),h.ZERO=new h(e.ZERO,e.ONE,e.ZERO);const f=t.nBitLength,d=aS(h,t.endo?Math.ceil(f/2):f);return{CURVE:t,ProjectivePoint:h,normPrivateKeyToScalar:l,weierstrassEquation:s,isWithinCurveOrder:a}}function fS(i){const t=Nm(i);return Pa(t,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...t})}function hS(i){const t=fS(i),{Fp:e,n}=t,r=e.BYTES+1,s=2*e.BYTES+1;function a(P){return bi<P&&P<e.ORDER}function o(P){return mn(P,n)}function l(P){return pu(P,n)}const{ProjectivePoint:c,normPrivateKeyToScalar:u,weierstrassEquation:h,isWithinCurveOrder:f}=uS({...t,toBytes(P,O,G){const Z=O.toAffine(),V=e.toBytes(Z.x),Y=ma;return G?Y(Uint8Array.from([O.hasEvenY()?2:3]),V):Y(Uint8Array.from([4]),V,e.toBytes(Z.y))},fromBytes(P){const O=P.length,G=P[0],Z=P.subarray(1);if(O===r&&(G===2||G===3)){const V=Pr(Z);if(!a(V))throw new Error("Point is not on curve");const Y=h(V);let Q=e.sqrt(Y);const at=(Q&Pn)===Pn;return(G&1)===1!==at&&(Q=e.neg(Q)),{x:V,y:Q}}else if(O===s&&G===4){const V=e.fromBytes(Z.subarray(0,e.BYTES)),Y=e.fromBytes(Z.subarray(e.BYTES,2*e.BYTES));return{x:V,y:Y}}else throw new Error(`Point of length ${O} was invalid. Expected ${r} compressed bytes or ${s} uncompressed bytes`)}}),d=P=>Ts(Cs(P,t.nByteLength));function g(P){const O=n>>Pn;return P>O}function y(P){return g(P)?o(-P):P}const m=(P,O,G)=>Pr(P.slice(O,G));class p{constructor(O,G,Z){this.r=O,this.s=G,this.recovery=Z,this.assertValidity()}static fromCompact(O){const G=t.nByteLength;return O=zn("compactSignature",O,G*2),new p(m(O,0,G),m(O,G,2*G))}static fromDER(O){const{r:G,s:Z}=Er.toSig(zn("DER",O));return new p(G,Z)}assertValidity(){if(!f(this.r))throw new Error("r must be 0 < r < CURVE.n");if(!f(this.s))throw new Error("s must be 0 < s < CURVE.n")}addRecoveryBit(O){return new p(this.r,this.s,O)}recoverPublicKey(O){const{r:G,s:Z,recovery:V}=this,Y=T(zn("msgHash",O));if(V==null||![0,1,2,3].includes(V))throw new Error("recovery id invalid");const Q=V===2||V===3?G+t.n:G;if(Q>=e.ORDER)throw new Error("recovery id 2 or 3 invalid");const at=(V&1)===0?"02":"03",ot=c.fromHex(at+d(Q)),Ot=l(Q),Ft=o(-Y*Ot),Wt=o(Z*Ot),J=c.BASE.multiplyAndAddUnsafe(ot,Ft,Wt);if(!J)throw new Error("point at infinify");return J.assertValidity(),J}hasHighS(){return g(this.s)}normalizeS(){return this.hasHighS()?new p(this.r,o(-this.s),this.recovery):this}toDERRawBytes(){return pa(this.toDERHex())}toDERHex(){return Er.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return pa(this.toCompactHex())}toCompactHex(){return d(this.r)+d(this.s)}}const b={isValidPrivateKey(P){try{return u(P),!0}catch{return!1}},normPrivateKeyToScalar:u,randomPrivateKey:()=>{const P=Im(t.n);return rS(t.randomBytes(P),t.n)},precompute(P=8,O=c.BASE){return O._setWindowSize(P),O.multiply(BigInt(3)),O}};function M(P,O=!0){return c.fromPrivateKey(P).toRawBytes(O)}function v(P){const O=P instanceof Uint8Array,G=typeof P=="string",Z=(O||G)&&P.length;return O?Z===r||Z===s:G?Z===2*r||Z===2*s:P instanceof c}function S(P,O,G=!0){if(v(P))throw new Error("first arg must be private key");if(!v(O))throw new Error("second arg must be public key");return c.fromHex(O).multiply(u(P)).toRawBytes(G)}const A=t.bits2int||function(P){const O=Pr(P),G=P.length*8-t.nBitLength;return G>0?O>>BigInt(G):O},T=t.bits2int_modN||function(P){return o(A(P))},x=lf(t.nBitLength);function E(P){if(typeof P!="bigint")throw new Error("bigint expected");if(!(bi<=P&&P<x))throw new Error(`bigint expected < 2^${t.nBitLength}`);return Cs(P,t.nByteLength)}function R(P,O,G=I){if(["recovered","canonical"].some(mt=>mt in G))throw new Error("sign() legacy options not supported");const{hash:Z,randomBytes:V}=t;let{lowS:Y,prehash:Q,extraEntropy:at}=G;Y==null&&(Y=!0),P=zn("msgHash",P),Q&&(P=zn("prehashed msgHash",Z(P)));const ot=T(P),Ot=u(O),Ft=[E(Ot),E(ot)];if(at!=null){const mt=at===!0?V(e.BYTES):at;Ft.push(zn("extraEntropy",mt))}const Wt=ma(...Ft),J=ot;function tt(mt){const Nt=A(mt);if(!f(Nt))return;const _t=l(Nt),Lt=c.BASE.multiply(Nt).toAffine(),fe=o(Lt.x);if(fe===bi)return;const Bt=o(_t*o(J+fe*Ot));if(Bt===bi)return;let $t=(Lt.x===fe?0:2)|Number(Lt.y&Pn),Qt=Bt;return Y&&g(Bt)&&(Qt=y(Bt),$t^=1),new p(fe,Qt,$t)}return{seed:Wt,k2sig:tt}}const I={lowS:t.lowS,prehash:!1},N={lowS:t.lowS,prehash:!1};function U(P,O,G=I){const{seed:Z,k2sig:V}=R(P,O,G),Y=t;return Cm(Y.hash.outputLen,Y.nByteLength,Y.hmac)(Z,V)}c.BASE._setWindowSize(8);function L(P,O,G,Z=N){const V=P;if(O=zn("msgHash",O),G=zn("publicKey",G),"strict"in Z)throw new Error("options.strict was renamed to lowS");const{lowS:Y,prehash:Q}=Z;let at,ot;try{if(typeof V=="string"||V instanceof Uint8Array)try{at=p.fromDER(V)}catch(Lt){if(!(Lt instanceof Er.Err))throw Lt;at=p.fromCompact(V)}else if(typeof V=="object"&&typeof V.r=="bigint"&&typeof V.s=="bigint"){const{r:Lt,s:fe}=V;at=new p(Lt,fe)}else throw new Error("PARSE");ot=c.fromHex(G)}catch(Lt){if(Lt.message==="PARSE")throw new Error("signature must be Signature instance, Uint8Array or hex string");return!1}if(Y&&at.hasHighS())return!1;Q&&(O=t.hash(O));const{r:Ot,s:Ft}=at,Wt=T(O),J=l(Ft),tt=o(Wt*J),mt=o(Ot*J),Nt=c.BASE.multiplyAndAddUnsafe(ot,tt,mt)?.toAffine();return Nt?o(Nt.x)===Ot:!1}return{CURVE:t,getPublicKey:M,getSharedSecret:S,sign:U,verify:L,ProjectivePoint:c,Signature:p,utils:b}}function dS(i){return{hash:i,hmac:(t,...e)=>um(i,t,sA(...e)),randomBytes:aA}}function pS(i,t){const e=n=>hS({...i,...dS(n)});return Object.freeze({...e(t),create:e})}const Lm=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),ad=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),mS=BigInt(1),mu=BigInt(2),od=(i,t)=>(i+t/mu)/t;function gS(i){const t=Lm,e=BigInt(3),n=BigInt(6),r=BigInt(11),s=BigInt(22),a=BigInt(23),o=BigInt(44),l=BigInt(88),c=i*i*i%t,u=c*c*i%t,h=Rn(u,e,t)*u%t,f=Rn(h,e,t)*u%t,d=Rn(f,mu,t)*c%t,g=Rn(d,r,t)*d%t,y=Rn(g,s,t)*g%t,m=Rn(y,o,t)*y%t,p=Rn(m,l,t)*m%t,b=Rn(p,o,t)*y%t,M=Rn(b,e,t)*u%t,v=Rn(M,a,t)*g%t,S=Rn(v,n,t)*c%t,A=Rn(S,mu,t);if(!gu.eql(gu.sqr(A),i))throw new Error("Cannot find square root");return A}const gu=iS(Lm,void 0,void 0,{sqrt:gS}),ji=pS({a:BigInt(0),b:BigInt(7),Fp:gu,n:ad,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:i=>{const t=ad,e=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),n=-mS*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),r=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),s=e,a=BigInt("0x100000000000000000000000000000000"),o=od(s*i,t),l=od(-n*i,t);let c=mn(i-o*e-l*r,t),u=mn(-o*n-l*s,t);const h=c>a,f=u>a;if(h&&(c=t-c),f&&(u=t-u),c>a||u>a)throw new Error("splitScalar: Endomorphism failed, k="+i);return{k1neg:h,k1:c,k2neg:f,k2:u}}}},hm);BigInt(0);ji.ProjectivePoint;const ko="0x0000000000000000000000000000000000000000",ld="0x0000000000000000000000000000000000000000000000000000000000000000",cd=BigInt(0),ud=BigInt(1),yu=BigInt(2),fd=BigInt(27),hd=BigInt(28),uo=BigInt(35),Um=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),yS=Um/yu,xS=Symbol.for("nodejs.util.inspect.custom"),mr={};function rc(i){return Ui(Ge(i),32)}class Ce{#t;#e;#n;#i;get r(){return this.#t}set r(t){F(_s(t)===32,"invalid r","value",t),this.#t=xt(t)}get s(){return F(parseInt(this.#e.substring(0,3))<8,"non-canonical s; use ._s","s",this.#e),this.#e}set s(t){F(_s(t)===32,"invalid s","value",t),this.#e=xt(t)}get _s(){return this.#e}isValid(){return BigInt(this.#e)<=yS}get v(){return this.#n}set v(t){const e=Vt(t,"value");F(e===27||e===28,"invalid v","v",t),this.#n=e}get networkV(){return this.#i}get legacyChainId(){const t=this.networkV;return t==null?null:Ce.getChainId(t)}get yParity(){return this.v===27?0:1}get yParityAndS(){const t=Jt(this.s);return this.yParity&&(t[0]|=128),xt(t)}get compactSerialized(){return Me([this.r,this.yParityAndS])}get serialized(){return Me([this.r,this.s,this.yParity?"0x1c":"0x1b"])}constructor(t,e,n,r){Ta(t,mr,"Signature"),this.#t=e,this.#e=n,this.#n=r,this.#i=null}getCanonical(){if(this.isValid())return this;const t=Um-BigInt(this._s),e=55-this.v,n=new Ce(mr,this.r,rc(t),e);return this.networkV&&(n.#i=this.networkV),n}clone(){const t=new Ce(mr,this.r,this._s,this.v);return this.networkV&&(t.#i=this.networkV),t}toJSON(){const t=this.networkV;return{_type:"signature",networkV:t!=null?t.toString():null,r:this.r,s:this._s,v:this.v}}[xS](){return this.toString()}toString(){return this.isValid()?`Signature { r: ${this.r}, s: ${this._s}, v: ${this.v} }`:`Signature { r: ${this.r}, s: ${this._s}, v: ${this.v}, valid: false }`}static getChainId(t){const e=bt(t,"v");return e==fd||e==hd?cd:(F(e>=uo,"invalid EIP-155 v","v",t),(e-uo)/yu)}static getChainIdV(t,e){return bt(t)*yu+BigInt(35+e-27)}static getNormalizedV(t){const e=bt(t);return e===cd||e===fd?27:e===ud||e===hd?28:(F(e>=uo,"invalid v","v",t),e&ud?27:28)}static from(t){function e(c,u){F(c,u,"signature",t)}if(t==null)return new Ce(mr,ld,ld,27);if(typeof t=="string"){const c=Jt(t,"signature");if(c.length===64){const u=xt(c.slice(0,32)),h=c.slice(32,64),f=h[0]&128?28:27;return h[0]&=127,new Ce(mr,u,xt(h),f)}if(c.length===65){const u=xt(c.slice(0,32)),h=xt(c.slice(32,64)),f=Ce.getNormalizedV(c[64]);return new Ce(mr,u,h,f)}e(!1,"invalid raw signature length")}if(t instanceof Ce)return t.clone();const n=t.r;e(n!=null,"missing r");const r=rc(n),s=(function(c,u){if(c!=null)return rc(c);if(u!=null){e(_e(u,32),"invalid yParityAndS");const h=Jt(u);return h[0]&=127,xt(h)}e(!1,"missing s")})(t.s,t.yParityAndS),{networkV:a,v:o}=(function(c,u,h){if(c!=null){const f=bt(c);return{networkV:f>=uo?f:void 0,v:Ce.getNormalizedV(f)}}if(u!=null)return e(_e(u,32),"invalid yParityAndS"),{v:Jt(u)[0]&128?28:27};if(h!=null){switch(Vt(h,"sig.yParity")){case 0:return{v:27};case 1:return{v:28}}e(!1,"invalid yParity")}e(!1,"missing v")})(t.v,t.yParityAndS,t.yParity),l=new Ce(mr,r,s,o);return a&&(l.#i=a),e(t.yParity==null||Vt(t.yParity,"sig.yParity")===l.yParity,"yParity mismatch"),e(t.yParityAndS==null||t.yParityAndS===l.yParityAndS,"yParityAndS mismatch"),l}}class wi{#t;constructor(t){F(_s(t)===32,"invalid private key","privateKey","[REDACTED]"),this.#t=xt(t)}get privateKey(){return this.#t}get publicKey(){return wi.computePublicKey(this.#t)}get compressedPublicKey(){return wi.computePublicKey(this.#t,!0)}sign(t){F(_s(t)===32,"invalid digest length","digest",t);const e=ji.sign(cn(t),cn(this.#t),{lowS:!0});return Ce.from({r:ar(e.r,32),s:ar(e.s,32),v:e.recovery?28:27})}computeSharedSecret(t){const e=wi.computePublicKey(t);return xt(ji.getSharedSecret(cn(this.#t),Jt(e),!1))}static computePublicKey(t,e){let n=Jt(t,"key");if(n.length===32){const s=ji.getPublicKey(n,!!e);return xt(s)}if(n.length===64){const s=new Uint8Array(65);s[0]=4,s.set(n,1),n=s}const r=ji.ProjectivePoint.fromHex(n);return xt(r.toRawBytes(e))}static recoverPublicKey(t,e){F(_s(t)===32,"invalid digest length","digest",t);const n=Ce.from(e);let r=ji.Signature.fromCompact(cn(Me([n.r,n.s])));r=r.addRecoveryBit(n.yParity);const s=r.recoverPublicKey(cn(t));return F(s!=null,"invalid signature for digest","signature",e),"0x"+s.toHex(!1)}static addPoints(t,e,n){const r=ji.ProjectivePoint.fromHex(wi.computePublicKey(t).substring(2)),s=ji.ProjectivePoint.fromHex(wi.computePublicKey(e).substring(2));return"0x"+r.add(s).toHex(!!n)}}const _S=BigInt(0),vS=BigInt(36);function dd(i){i=i.toLowerCase();const t=i.substring(2).split(""),e=new Uint8Array(40);for(let r=0;r<40;r++)e[r]=t[r].charCodeAt(0);const n=Jt(Fe(e));for(let r=0;r<40;r+=2)n[r>>1]>>4>=8&&(t[r]=t[r].toUpperCase()),(n[r>>1]&15)>=8&&(t[r+1]=t[r+1].toUpperCase());return"0x"+t.join("")}const cf={};for(let i=0;i<10;i++)cf[String(i)]=String(i);for(let i=0;i<26;i++)cf[String.fromCharCode(65+i)]=String(10+i);const pd=15;function bS(i){i=i.toUpperCase(),i=i.substring(4)+i.substring(0,2)+"00";let t=i.split("").map(n=>cf[n]).join("");for(;t.length>=pd;){let n=t.substring(0,pd);t=parseInt(n,10)%97+t.substring(n.length)}let e=String(98-parseInt(t,10)%97);for(;e.length<2;)e="0"+e;return e}const wS=(function(){const i={};for(let t=0;t<36;t++){const e="0123456789abcdefghijklmnopqrstuvwxyz"[t];i[e]=BigInt(t)}return i})();function AS(i){i=i.toLowerCase();let t=_S;for(let e=0;e<i.length;e++)t=t*vS+wS[i[e]];return t}function ue(i){if(F(typeof i=="string","invalid address","address",i),i.match(/^(0x)?[0-9a-fA-F]{40}$/)){i.startsWith("0x")||(i="0x"+i);const t=dd(i);return F(!i.match(/([A-F].*[a-f])|([a-f].*[A-F])/)||t===i,"bad address checksum","address",i),t}if(i.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)){F(i.substring(2,4)===bS(i),"bad icap checksum","address",i);let t=AS(i.substring(4)).toString(16);for(;t.length<40;)t="0"+t;return dd("0x"+t)}F(!1,"invalid address","address",i)}function SS(i){const t=ue(i.from);let n=bt(i.nonce,"tx.nonce").toString(16);return n==="0"?n="0x":n.length%2?n="0x0"+n:n="0x"+n,ue(Ie(Fe(Ri([t,n])),12))}function Dm(i){return i&&typeof i.getAddress=="function"}async function sc(i,t){const e=await t;return(e==null||e==="0x0000000000000000000000000000000000000000")&&(it(typeof i!="string","unconfigured name","UNCONFIGURED_NAME",{value:i}),F(!1,"invalid AddressLike value; did not resolve to a value address","target",i)),ue(e)}function fn(i,t){if(typeof i=="string")return i.match(/^0x[0-9a-f]{40}$/i)?ue(i):(it(t!=null,"ENS resolution requires a provider","UNSUPPORTED_OPERATION",{operation:"resolveName"}),sc(i,t.resolveName(i)));if(Dm(i))return sc(i,i.getAddress());if(i&&typeof i.then=="function")return sc(i,i);F(!1,"unsupported addressable value","target",i)}const _i={};function St(i,t){let e=!1;return t<0&&(e=!0,t*=-1),new Ne(_i,`${e?"":"u"}int${t}`,i,{signed:e,width:t})}function le(i,t){return new Ne(_i,`bytes${t||""}`,i,{size:t})}const md=Symbol.for("_ethers_typed");class Ne{type;value;#t;_typedSymbol;constructor(t,e,n,r){r==null&&(r=null),Ta(_i,t,"Typed"),Dt(this,{_typedSymbol:md,type:e,value:n}),this.#t=r,this.format()}format(){if(this.type==="array")throw new Error("");if(this.type==="dynamicArray")throw new Error("");return this.type==="tuple"?`tuple(${this.value.map(t=>t.format()).join(",")})`:this.type}defaultValue(){return 0}minValue(){return 0}maxValue(){return 0}isBigInt(){return!!this.type.match(/^u?int[0-9]+$/)}isData(){return this.type.startsWith("bytes")}isString(){return this.type==="string"}get tupleName(){if(this.type!=="tuple")throw TypeError("not a tuple");return this.#t}get arrayLength(){if(this.type!=="array")throw TypeError("not an array");return this.#t===!0?-1:this.#t===!1?this.value.length:null}static from(t,e){return new Ne(_i,t,e)}static uint8(t){return St(t,8)}static uint16(t){return St(t,16)}static uint24(t){return St(t,24)}static uint32(t){return St(t,32)}static uint40(t){return St(t,40)}static uint48(t){return St(t,48)}static uint56(t){return St(t,56)}static uint64(t){return St(t,64)}static uint72(t){return St(t,72)}static uint80(t){return St(t,80)}static uint88(t){return St(t,88)}static uint96(t){return St(t,96)}static uint104(t){return St(t,104)}static uint112(t){return St(t,112)}static uint120(t){return St(t,120)}static uint128(t){return St(t,128)}static uint136(t){return St(t,136)}static uint144(t){return St(t,144)}static uint152(t){return St(t,152)}static uint160(t){return St(t,160)}static uint168(t){return St(t,168)}static uint176(t){return St(t,176)}static uint184(t){return St(t,184)}static uint192(t){return St(t,192)}static uint200(t){return St(t,200)}static uint208(t){return St(t,208)}static uint216(t){return St(t,216)}static uint224(t){return St(t,224)}static uint232(t){return St(t,232)}static uint240(t){return St(t,240)}static uint248(t){return St(t,248)}static uint256(t){return St(t,256)}static uint(t){return St(t,256)}static int8(t){return St(t,-8)}static int16(t){return St(t,-16)}static int24(t){return St(t,-24)}static int32(t){return St(t,-32)}static int40(t){return St(t,-40)}static int48(t){return St(t,-48)}static int56(t){return St(t,-56)}static int64(t){return St(t,-64)}static int72(t){return St(t,-72)}static int80(t){return St(t,-80)}static int88(t){return St(t,-88)}static int96(t){return St(t,-96)}static int104(t){return St(t,-104)}static int112(t){return St(t,-112)}static int120(t){return St(t,-120)}static int128(t){return St(t,-128)}static int136(t){return St(t,-136)}static int144(t){return St(t,-144)}static int152(t){return St(t,-152)}static int160(t){return St(t,-160)}static int168(t){return St(t,-168)}static int176(t){return St(t,-176)}static int184(t){return St(t,-184)}static int192(t){return St(t,-192)}static int200(t){return St(t,-200)}static int208(t){return St(t,-208)}static int216(t){return St(t,-216)}static int224(t){return St(t,-224)}static int232(t){return St(t,-232)}static int240(t){return St(t,-240)}static int248(t){return St(t,-248)}static int256(t){return St(t,-256)}static int(t){return St(t,-256)}static bytes1(t){return le(t,1)}static bytes2(t){return le(t,2)}static bytes3(t){return le(t,3)}static bytes4(t){return le(t,4)}static bytes5(t){return le(t,5)}static bytes6(t){return le(t,6)}static bytes7(t){return le(t,7)}static bytes8(t){return le(t,8)}static bytes9(t){return le(t,9)}static bytes10(t){return le(t,10)}static bytes11(t){return le(t,11)}static bytes12(t){return le(t,12)}static bytes13(t){return le(t,13)}static bytes14(t){return le(t,14)}static bytes15(t){return le(t,15)}static bytes16(t){return le(t,16)}static bytes17(t){return le(t,17)}static bytes18(t){return le(t,18)}static bytes19(t){return le(t,19)}static bytes20(t){return le(t,20)}static bytes21(t){return le(t,21)}static bytes22(t){return le(t,22)}static bytes23(t){return le(t,23)}static bytes24(t){return le(t,24)}static bytes25(t){return le(t,25)}static bytes26(t){return le(t,26)}static bytes27(t){return le(t,27)}static bytes28(t){return le(t,28)}static bytes29(t){return le(t,29)}static bytes30(t){return le(t,30)}static bytes31(t){return le(t,31)}static bytes32(t){return le(t,32)}static address(t){return new Ne(_i,"address",t)}static bool(t){return new Ne(_i,"bool",!!t)}static bytes(t){return new Ne(_i,"bytes",t)}static string(t){return new Ne(_i,"string",t)}static array(t,e){throw new Error("not implemented yet")}static tuple(t,e){throw new Error("not implemented yet")}static overrides(t){return new Ne(_i,"overrides",Object.assign({},t))}static isTyped(t){return t&&typeof t=="object"&&"_typedSymbol"in t&&t._typedSymbol===md}static dereference(t,e){if(Ne.isTyped(t)){if(t.type!==e)throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);return t.value}return t}}class ES extends Bi{constructor(t){super("address","address",t,!1)}defaultValue(){return"0x0000000000000000000000000000000000000000"}encode(t,e){let n=Ne.dereference(e,"string");try{n=ue(n)}catch(r){return this._throwError(r.message,e)}return t.writeValue(n)}decode(t){return ue(ar(t.readValue(),20))}}class MS extends Bi{coder;constructor(t){super(t.name,t.type,"_",t.dynamic),this.coder=t}defaultValue(){return this.coder.defaultValue()}encode(t,e){return this.coder.encode(t,e)}decode(t){return this.coder.decode(t)}}function Fm(i,t,e){let n=[];if(Array.isArray(e))n=e;else if(e&&typeof e=="object"){let l={};n=t.map(c=>{const u=c.localName;return it(u,"cannot encode object for signature with missing names","INVALID_ARGUMENT",{argument:"values",info:{coder:c},value:e}),it(!l[u],"cannot encode object for signature with duplicate names","INVALID_ARGUMENT",{argument:"values",info:{coder:c},value:e}),l[u]=!0,e[u]})}else F(!1,"invalid tuple value","tuple",e);F(t.length===n.length,"types/value length mismatch","tuple",e);let r=new fu,s=new fu,a=[];t.forEach((l,c)=>{let u=n[c];if(l.dynamic){let h=s.length;l.encode(s,u);let f=r.writeUpdatableValue();a.push(d=>{f(d+h)})}else l.encode(r,u)}),a.forEach(l=>{l(r.length)});let o=i.appendWriter(r);return o+=i.appendWriter(s),o}function Om(i,t){let e=[],n=[],r=i.subReader(0);return t.forEach(s=>{let a=null;if(s.dynamic){let o=i.readIndex(),l=r.subReader(o);try{a=s.decode(l)}catch(c){if(Je(c,"BUFFER_OVERRUN"))throw c;a=c,a.baseType=s.name,a.name=s.localName,a.type=s.type}}else try{a=s.decode(i)}catch(o){if(Je(o,"BUFFER_OVERRUN"))throw o;a=o,a.baseType=s.name,a.name=s.localName,a.type=s.type}if(a==null)throw new Error("investigate");e.push(a),n.push(s.localName||null)}),Ei.fromItems(e,n)}class TS extends Bi{coder;length;constructor(t,e,n){const r=t.type+"["+(e>=0?e:"")+"]",s=e===-1||t.dynamic;super("array",r,n,s),Dt(this,{coder:t,length:e})}defaultValue(){const t=this.coder.defaultValue(),e=[];for(let n=0;n<this.length;n++)e.push(t);return e}encode(t,e){const n=Ne.dereference(e,"array");Array.isArray(n)||this._throwError("expected array value",n);let r=this.length;r===-1&&(r=n.length,t.writeValue(n.length)),Kp(n.length,r,"coder array"+(this.localName?" "+this.localName:""));let s=[];for(let a=0;a<n.length;a++)s.push(this.coder);return Fm(t,s,n)}decode(t){let e=this.length;e===-1&&(e=t.readIndex(),it(e*un<=t.dataLength,"insufficient data length","BUFFER_OVERRUN",{buffer:t.bytes,offset:e*un,length:t.dataLength}));let n=[];for(let r=0;r<e;r++)n.push(new MS(this.coder));return Om(t,n)}}class CS extends Bi{constructor(t){super("bool","bool",t,!1)}defaultValue(){return!1}encode(t,e){const n=Ne.dereference(e,"bool");return t.writeValue(n?1:0)}decode(t){return!!t.readValue()}}class Bm extends Bi{constructor(t,e){super(t,t,e,!0)}defaultValue(){return"0x"}encode(t,e){e=cn(e);let n=t.writeValue(e.length);return n+=t.writeBytes(e),n}decode(t){return t.readBytes(t.readIndex(),!0)}}class RS extends Bm{constructor(t){super("bytes",t)}decode(t){return xt(super.decode(t))}}class PS extends Bi{size;constructor(t,e){let n="bytes"+String(t);super(n,n,e,!1),Dt(this,{size:t},{size:"number"})}defaultValue(){return"0x0000000000000000000000000000000000000000000000000000000000000000".substring(0,2+this.size*2)}encode(t,e){let n=cn(Ne.dereference(e,this.type));return n.length!==this.size&&this._throwError("incorrect data length",e),t.writeBytes(n)}decode(t){return xt(t.readBytes(this.size))}}const IS=new Uint8Array([]);class NS extends Bi{constructor(t){super("null","",t,!1)}defaultValue(){return null}encode(t,e){return e!=null&&this._throwError("not null",e),t.writeBytes(IS)}decode(t){return t.readBytes(0),null}}const LS=BigInt(0),US=BigInt(1),DS=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");class FS extends Bi{size;signed;constructor(t,e,n){const r=(e?"int":"uint")+t*8;super(r,r,n,!1),Dt(this,{size:t,signed:e},{size:"number",signed:"boolean"})}defaultValue(){return 0}encode(t,e){let n=bt(Ne.dereference(e,this.type)),r=Sr(DS,un*8);if(this.signed){let s=Sr(r,this.size*8-1);(n>s||n<-(s+US))&&this._throwError("value out-of-bounds",e),n=Qp(n,8*un)}else(n<LS||n>Sr(r,this.size*8))&&this._throwError("value out-of-bounds",e);return t.writeValue(n)}decode(t){let e=Sr(t.readValue(),this.size*8);return this.signed&&(e=Fo(e,this.size*8)),e}}class OS extends Bm{constructor(t){super("string",t)}defaultValue(){return""}encode(t,e){return super.encode(t,Qn(Ne.dereference(e,"string")))}decode(t){return Oo(super.decode(t))}}class fo extends Bi{coders;constructor(t,e){let n=!1;const r=[];t.forEach(a=>{a.dynamic&&(n=!0),r.push(a.type)});const s="tuple("+r.join(",")+")";super("tuple",s,e,n),Dt(this,{coders:Object.freeze(t.slice())})}defaultValue(){const t=[];this.coders.forEach(n=>{t.push(n.defaultValue())});const e=this.coders.reduce((n,r)=>{const s=r.localName;return s&&(n[s]||(n[s]=0),n[s]++),n},{});return this.coders.forEach((n,r)=>{let s=n.localName;!s||e[s]!==1||(s==="length"&&(s="_length"),t[s]==null&&(t[s]=t[r]))}),Object.freeze(t)}encode(t,e){const n=Ne.dereference(e,"tuple");return Fm(t,this.coders,n)}decode(t){return Om(t,this.coders)}}function ac(i,t){return{address:ue(i),storageKeys:t.map((e,n)=>(F(_e(e,32),"invalid slot",`storageKeys[${n}]`,e),e.toLowerCase()))}}function Wr(i){if(Array.isArray(i))return i.map((e,n)=>Array.isArray(e)?(F(e.length===2,"invalid slot set",`value[${n}]`,e),ac(e[0],e[1])):(F(e!=null&&typeof e=="object","invalid address-slot set","value",i),ac(e.address,e.storageKeys)));F(i!=null&&typeof i=="object","invalid access list","value",i);const t=Object.keys(i).map(e=>{const n=i[e].reduce((r,s)=>(r[s]=!0,r),{});return ac(e,Object.keys(n).sort())});return t.sort((e,n)=>e.address.localeCompare(n.address)),t}function km(i){return{address:ue(i.address),nonce:bt(i.nonce!=null?i.nonce:0),chainId:bt(i.chainId!=null?i.chainId:0),signature:Ce.from(i.signature)}}function BS(i){let t;return typeof i=="string"?t=wi.computePublicKey(i,!1):t=i.publicKey,ue(Fe("0x"+t.substring(4)).substring(26))}function kS(i,t){return BS(wi.recoverPublicKey(i,t))}const Ke=BigInt(0),GS=BigInt(2),HS=BigInt(27),zS=BigInt(28),VS=BigInt(35),WS=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),XS=Symbol.for("nodejs.util.inspect.custom"),oc=4096*32,Eo=128;function qS(i){return{blobToKzgCommitment:n=>{if("computeBlobProof"in i){if("blobToKzgCommitment"in i&&typeof i.blobToKzgCommitment=="function")return Jt(i.blobToKzgCommitment(xt(n)))}else if("blobToKzgCommitment"in i&&typeof i.blobToKzgCommitment=="function")return Jt(i.blobToKzgCommitment(n));if("blobToKZGCommitment"in i&&typeof i.blobToKZGCommitment=="function")return Jt(i.blobToKZGCommitment(xt(n)));F(!1,"unsupported KZG library","kzg",i)},computeBlobKzgProof:(n,r)=>{if("computeBlobProof"in i&&typeof i.computeBlobProof=="function")return Jt(i.computeBlobProof(xt(n),xt(r)));if("computeBlobKzgProof"in i&&typeof i.computeBlobKzgProof=="function")return i.computeBlobKzgProof(n,r);if("computeBlobKZGProof"in i&&typeof i.computeBlobKZGProof=="function")return Jt(i.computeBlobKZGProof(xt(n),xt(r)));F(!1,"unsupported KZG library","kzg",i)}}}function gd(i,t){let e=i.toString(16);for(;e.length<2;)e="0"+e;return e+=Ds(t).substring(4),"0x"+e}function Fs(i){return i==="0x"?null:ue(i)}function rl(i,t){try{return Wr(i)}catch(e){F(!1,e.message,t,i)}}function KS(i,t){try{if(!Array.isArray(i))throw new Error("authorizationList: invalid array");const e=[];for(let n=0;n<i.length;n++){const r=i[n];if(!Array.isArray(r))throw new Error(`authorization[${n}]: invalid array`);if(r.length!==6)throw new Error(`authorization[${n}]: wrong length`);if(!r[1])throw new Error(`authorization[${n}]: null address`);e.push({address:Fs(r[1]),nonce:ye(r[2],"nonce"),chainId:ye(r[0],"chainId"),signature:Ce.from({yParity:Xr(r[3],"yParity"),r:Ui(r[4],32),s:Ui(r[5],32)})})}return e}catch(e){F(!1,e.message,t,i)}}function Xr(i,t){return i==="0x"?0:Vt(i,t)}function ye(i,t){if(i==="0x")return Ke;const e=bt(i,t);return F(e<=WS,"value exceeds uint size",t,e),e}function re(i,t){const e=bt(i,"value"),n=Ge(e);return F(n.length<=32,"value too large",`tx.${t}`,e),n}function sl(i){return Wr(i).map(t=>[t.address,t.storageKeys])}function YS(i){return i.map(t=>[re(t.chainId,"chainId"),t.address,re(t.nonce,"nonce"),re(t.signature.yParity,"yParity"),Ge(t.signature.r),Ge(t.signature._s)])}function JS(i,t){F(Array.isArray(i),`invalid ${t}`,"value",i);for(let e=0;e<i.length;e++)F(_e(i[e],32),"invalid ${ param } hash",`value[${e}]`,i[e]);return i}function QS(i){const t=Ra(i);F(Array.isArray(t)&&(t.length===9||t.length===6),"invalid field count for legacy transaction","data",i);const e={type:0,nonce:Xr(t[0],"nonce"),gasPrice:ye(t[1],"gasPrice"),gasLimit:ye(t[2],"gasLimit"),to:Fs(t[3]),value:ye(t[4],"value"),data:xt(t[5]),chainId:Ke};if(t.length===6)return e;const n=ye(t[6],"v"),r=ye(t[7],"r"),s=ye(t[8],"s");if(r===Ke&&s===Ke)e.chainId=n;else{let a=(n-VS)/GS;a<Ke&&(a=Ke),e.chainId=a,F(a!==Ke||n===HS||n===zS,"non-canonical legacy v","v",t[6]),e.signature=Ce.from({r:Ui(t[7],32),s:Ui(t[8],32),v:n})}return e}function ZS(i,t){const e=[re(i.nonce,"nonce"),re(i.gasPrice||0,"gasPrice"),re(i.gasLimit,"gasLimit"),i.to||"0x",re(i.value,"value"),i.data];let n=Ke;if(i.chainId!=Ke)n=bt(i.chainId,"tx.chainId"),F(!t||t.networkV==null||t.legacyChainId===n,"tx.chainId/sig.v mismatch","sig",t);else if(i.signature){const s=i.signature.legacyChainId;s!=null&&(n=s)}if(!t)return n!==Ke&&(e.push(Ge(n)),e.push("0x"),e.push("0x")),Ri(e);let r=BigInt(27+t.yParity);return n!==Ke?r=Ce.getChainIdV(n,t.v):BigInt(t.v)!==r&&F(!1,"tx.chainId/sig.v mismatch","sig",t),e.push(Ge(r)),e.push(Ge(t.r)),e.push(Ge(t._s)),Ri(e)}function al(i,t){let e;try{if(e=Xr(t[0],"yParity"),e!==0&&e!==1)throw new Error("bad yParity")}catch{F(!1,"invalid yParity","yParity",t[0])}const n=Ui(t[1],32),r=Ui(t[2],32),s=Ce.from({r:n,s:r,yParity:e});i.signature=s}function $S(i){const t=Ra(Jt(i).slice(1));F(Array.isArray(t)&&(t.length===9||t.length===12),"invalid field count for transaction type: 2","data",xt(i));const e={type:2,chainId:ye(t[0],"chainId"),nonce:Xr(t[1],"nonce"),maxPriorityFeePerGas:ye(t[2],"maxPriorityFeePerGas"),maxFeePerGas:ye(t[3],"maxFeePerGas"),gasPrice:null,gasLimit:ye(t[4],"gasLimit"),to:Fs(t[5]),value:ye(t[6],"value"),data:xt(t[7]),accessList:rl(t[8],"accessList")};return t.length===9||al(e,t.slice(9)),e}function jS(i,t){const e=[re(i.chainId,"chainId"),re(i.nonce,"nonce"),re(i.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),re(i.maxFeePerGas||0,"maxFeePerGas"),re(i.gasLimit,"gasLimit"),i.to||"0x",re(i.value,"value"),i.data,sl(i.accessList||[])];return t&&(e.push(re(t.yParity,"yParity")),e.push(Ge(t.r)),e.push(Ge(t.s))),Me(["0x02",Ri(e)])}function tE(i){const t=Ra(Jt(i).slice(1));F(Array.isArray(t)&&(t.length===8||t.length===11),"invalid field count for transaction type: 1","data",xt(i));const e={type:1,chainId:ye(t[0],"chainId"),nonce:Xr(t[1],"nonce"),gasPrice:ye(t[2],"gasPrice"),gasLimit:ye(t[3],"gasLimit"),to:Fs(t[4]),value:ye(t[5],"value"),data:xt(t[6]),accessList:rl(t[7],"accessList")};return t.length===8||al(e,t.slice(8)),e}function eE(i,t){const e=[re(i.chainId,"chainId"),re(i.nonce,"nonce"),re(i.gasPrice||0,"gasPrice"),re(i.gasLimit,"gasLimit"),i.to||"0x",re(i.value,"value"),i.data,sl(i.accessList||[])];return t&&(e.push(re(t.yParity,"recoveryParam")),e.push(Ge(t.r)),e.push(Ge(t.s))),Me(["0x01",Ri(e)])}function nE(i){let t=Ra(Jt(i).slice(1)),e="3",n=null,r=null;if(t.length===4&&Array.isArray(t[0])){e="3 (network format)";const a=t[1],o=t[2],l=t[3];F(Array.isArray(a),"invalid network format: blobs not an array","fields[1]",a),F(Array.isArray(o),"invalid network format: commitments not an array","fields[2]",o),F(Array.isArray(l),"invalid network format: proofs not an array","fields[3]",l),F(a.length===o.length,"invalid network format: blobs/commitments length mismatch","fields",t),F(a.length===l.length,"invalid network format: blobs/proofs length mismatch","fields",t),r=[];for(let c=0;c<t[1].length;c++)r.push({data:a[c],commitment:o[c],proof:l[c]});t=t[0]}else if(t.length===5&&Array.isArray(t[0])){e="3 (EIP-7594 network format)",n=Vt(t[1]);const a=t[2],o=t[3],l=t[4];F(n===1,`unsupported EIP-7594 network format version: ${n}`,"fields[1]",n),F(Array.isArray(a),"invalid EIP-7594 network format: blobs not an array","fields[2]",a),F(Array.isArray(o),"invalid EIP-7594 network format: commitments not an array","fields[3]",o),F(Array.isArray(l),"invalid EIP-7594 network format: proofs not an array","fields[4]",l),F(a.length===o.length,"invalid network format: blobs/commitments length mismatch","fields",t),F(a.length*Eo===l.length,"invalid network format: blobs/proofs length mismatch","fields",t),r=[];for(let c=0;c<a.length;c++){const u=[];for(let h=0;h<Eo;h++)u.push(l[c*Eo+h]);r.push({data:a[c],commitment:o[c],proof:Me(u)})}t=t[0]}F(Array.isArray(t)&&(t.length===11||t.length===14),`invalid field count for transaction type: ${e}`,"data",xt(i));const s={type:3,chainId:ye(t[0],"chainId"),nonce:Xr(t[1],"nonce"),maxPriorityFeePerGas:ye(t[2],"maxPriorityFeePerGas"),maxFeePerGas:ye(t[3],"maxFeePerGas"),gasPrice:null,gasLimit:ye(t[4],"gasLimit"),to:Fs(t[5]),value:ye(t[6],"value"),data:xt(t[7]),accessList:rl(t[8],"accessList"),maxFeePerBlobGas:ye(t[9],"maxFeePerBlobGas"),blobVersionedHashes:t[10],blobWrapperVersion:n};r&&(s.blobs=r),F(s.to!=null,`invalid address for transaction type: ${e}`,"data",i),F(Array.isArray(s.blobVersionedHashes),"invalid blobVersionedHashes: must be an array","data",i);for(let a=0;a<s.blobVersionedHashes.length;a++)F(_e(s.blobVersionedHashes[a],32),`invalid blobVersionedHash at index ${a}: must be length 32`,"data",i);return t.length===11||al(s,t.slice(11)),s}function iE(i,t,e){const n=[re(i.chainId,"chainId"),re(i.nonce,"nonce"),re(i.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),re(i.maxFeePerGas||0,"maxFeePerGas"),re(i.gasLimit,"gasLimit"),i.to||ko,re(i.value,"value"),i.data,sl(i.accessList||[]),re(i.maxFeePerBlobGas||0,"maxFeePerBlobGas"),JS(i.blobVersionedHashes||[],"blobVersionedHashes")];if(t&&(n.push(re(t.yParity,"yParity")),n.push(Ge(t.r)),n.push(Ge(t.s)),e)){if(i.blobWrapperVersion!=null){const r=Ge(i.blobWrapperVersion),s=[];for(const{proof:a}of e){const o=Jt(a),l=o.length/Eo;for(let c=0;c<o.length;c+=l)s.push(o.subarray(c,c+l))}return Me(["0x03",Ri([n,r,e.map(a=>a.data),e.map(a=>a.commitment),s])])}return Me(["0x03",Ri([n,e.map(r=>r.data),e.map(r=>r.commitment),e.map(r=>r.proof)])])}return Me(["0x03",Ri(n)])}function rE(i){const t=Ra(Jt(i).slice(1));F(Array.isArray(t)&&(t.length===10||t.length===13),"invalid field count for transaction type: 4","data",xt(i));const e={type:4,chainId:ye(t[0],"chainId"),nonce:Xr(t[1],"nonce"),maxPriorityFeePerGas:ye(t[2],"maxPriorityFeePerGas"),maxFeePerGas:ye(t[3],"maxFeePerGas"),gasPrice:null,gasLimit:ye(t[4],"gasLimit"),to:Fs(t[5]),value:ye(t[6],"value"),data:xt(t[7]),accessList:rl(t[8],"accessList"),authorizationList:KS(t[9],"authorizationList")};return t.length===10||al(e,t.slice(10)),e}function sE(i,t){const e=[re(i.chainId,"chainId"),re(i.nonce,"nonce"),re(i.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),re(i.maxFeePerGas||0,"maxFeePerGas"),re(i.gasLimit,"gasLimit"),i.to||"0x",re(i.value,"value"),i.data,sl(i.accessList||[]),YS(i.authorizationList||[])];return t&&(e.push(re(t.yParity,"yParity")),e.push(Ge(t.r)),e.push(Ge(t.s))),Me(["0x04",Ri(e)])}class Vn{#t;#e;#n;#i;#r;#a;#s;#o;#h;#c;#m;#p;#d;#u;#f;#l;#y;#x;get type(){return this.#t}set type(t){switch(t){case null:this.#t=null;break;case 0:case"legacy":this.#t=0;break;case 1:case"berlin":case"eip-2930":this.#t=1;break;case 2:case"london":case"eip-1559":this.#t=2;break;case 3:case"cancun":case"eip-4844":this.#t=3;break;case 4:case"pectra":case"eip-7702":this.#t=4;break;default:F(!1,"unsupported transaction type","type",t)}}get typeName(){switch(this.type){case 0:return"legacy";case 1:return"eip-2930";case 2:return"eip-1559";case 3:return"eip-4844";case 4:return"eip-7702"}return null}get to(){const t=this.#e;return t==null&&this.type===3?ko:t}set to(t){this.#e=t==null?null:ue(t)}get nonce(){return this.#i}set nonce(t){this.#i=Vt(t,"value")}get gasLimit(){return this.#r}set gasLimit(t){this.#r=bt(t)}get gasPrice(){const t=this.#a;return t==null&&(this.type===0||this.type===1)?Ke:t}set gasPrice(t){this.#a=t==null?null:bt(t,"gasPrice")}get maxPriorityFeePerGas(){const t=this.#s;return t??(this.type===2||this.type===3?Ke:null)}set maxPriorityFeePerGas(t){this.#s=t==null?null:bt(t,"maxPriorityFeePerGas")}get maxFeePerGas(){const t=this.#o;return t??(this.type===2||this.type===3?Ke:null)}set maxFeePerGas(t){this.#o=t==null?null:bt(t,"maxFeePerGas")}get data(){return this.#n}set data(t){this.#n=xt(t)}get value(){return this.#h}set value(t){this.#h=bt(t,"value")}get chainId(){return this.#c}set chainId(t){this.#c=bt(t)}get signature(){return this.#m||null}set signature(t){this.#m=t==null?null:Ce.from(t)}isValid(){const t=this.signature;if(t&&!t.isValid())return!1;const e=this.authorizationList;if(e){for(const n of e)if(!n.signature.isValid())return!1}return!0}get accessList(){const t=this.#p||null;return t??(this.type===1||this.type===2||this.type===3?[]:null)}set accessList(t){this.#p=t==null?null:Wr(t)}get authorizationList(){const t=this.#y||null;return t==null&&this.type===4?[]:t}set authorizationList(t){this.#y=t==null?null:t.map(e=>km(e))}get maxFeePerBlobGas(){const t=this.#d;return t==null&&this.type===3?Ke:t}set maxFeePerBlobGas(t){this.#d=t==null?null:bt(t,"maxFeePerBlobGas")}get blobVersionedHashes(){let t=this.#u;return t==null&&this.type===3?[]:t}set blobVersionedHashes(t){if(t!=null){F(Array.isArray(t),"blobVersionedHashes must be an Array","value",t),t=t.slice();for(let e=0;e<t.length;e++)F(_e(t[e],32),"invalid blobVersionedHash",`value[${e}]`,t[e])}this.#u=t}get blobs(){return this.#l==null?null:this.#l.map(t=>Object.assign({},t))}set blobs(t){if(t==null){this.#l=null;return}const e=[],n=[];for(let r=0;r<t.length;r++){const s=t[r];if($u(s)){it(this.#f,"adding a raw blob requires a KZG library","UNSUPPORTED_OPERATION",{operation:"set blobs()"});let a=Jt(s);if(F(a.length<=oc,"blob is too large",`blobs[${r}]`,s),a.length!==oc){const c=new Uint8Array(oc);c.set(a),a=c}const o=this.#f.blobToKzgCommitment(a),l=xt(this.#f.computeBlobKzgProof(a,o));e.push({data:xt(a),commitment:xt(o),proof:l}),n.push(gd(1,o))}else{const a=xt(s.data),o=xt(s.commitment),l=xt(s.proof);e.push({data:a,commitment:o,proof:l}),n.push(gd(1,o))}}this.#l=e,this.#u=n}get kzg(){return this.#f}set kzg(t){t==null?this.#f=null:this.#f=qS(t)}get blobWrapperVersion(){return this.#x}set blobWrapperVersion(t){this.#x=t}constructor(){this.#t=null,this.#e=null,this.#i=0,this.#r=Ke,this.#a=null,this.#s=null,this.#o=null,this.#n="0x",this.#h=Ke,this.#c=Ke,this.#m=null,this.#p=null,this.#d=null,this.#u=null,this.#f=null,this.#l=null,this.#y=null,this.#x=null}get hash(){return this.signature==null?null:Fe(this.#g(!0,!1))}get unsignedHash(){return Fe(this.unsignedSerialized)}get from(){return this.signature==null?null:kS(this.unsignedHash,this.signature.getCanonical())}get fromPublicKey(){return this.signature==null?null:wi.recoverPublicKey(this.unsignedHash,this.signature.getCanonical())}isSigned(){return this.signature!=null}#g(t,e){it(!t||this.signature!=null,"cannot serialize unsigned transaction; maybe you meant .unsignedSerialized","UNSUPPORTED_OPERATION",{operation:".serialized"});const n=t?this.signature:null;switch(this.inferType()){case 0:return ZS(this,n);case 1:return eE(this,n);case 2:return jS(this,n);case 3:return iE(this,n,e?this.blobs:null);case 4:return sE(this,n)}it(!1,"unsupported transaction type","UNSUPPORTED_OPERATION",{operation:".serialized"})}get serialized(){return this.#g(!0,!0)}get unsignedSerialized(){return this.#g(!1,!1)}inferType(){const t=this.inferTypes();return t.indexOf(2)>=0?2:t.pop()}inferTypes(){const t=this.gasPrice!=null,e=this.maxFeePerGas!=null||this.maxPriorityFeePerGas!=null,n=this.accessList!=null,r=this.#d!=null||this.#u;this.maxFeePerGas!=null&&this.maxPriorityFeePerGas!=null&&it(this.maxFeePerGas>=this.maxPriorityFeePerGas,"priorityFee cannot be more than maxFee","BAD_DATA",{value:this}),it(!e||this.type!==0&&this.type!==1,"transaction type cannot have maxFeePerGas or maxPriorityFeePerGas","BAD_DATA",{value:this}),it(this.type!==0||!n,"legacy transaction cannot have accessList","BAD_DATA",{value:this});const s=[];return this.type!=null?s.push(this.type):this.authorizationList&&this.authorizationList.length?s.push(4):e?s.push(2):t?(s.push(1),n||s.push(0)):n?(s.push(1),s.push(2)):(r&&this.to||(s.push(0),s.push(1),s.push(2)),s.push(3)),s.sort(),s}isLegacy(){return this.type===0}isBerlin(){return this.type===1}isLondon(){return this.type===2}isCancun(){return this.type===3}clone(){return Vn.from(this)}toJSON(){const t=e=>e==null?null:e.toString();return{type:this.type,to:this.to,data:this.data,nonce:this.nonce,gasLimit:t(this.gasLimit),gasPrice:t(this.gasPrice),maxPriorityFeePerGas:t(this.maxPriorityFeePerGas),maxFeePerGas:t(this.maxFeePerGas),value:t(this.value),chainId:t(this.chainId),sig:this.signature?this.signature.toJSON():null,accessList:this.accessList}}[XS](){return this.toString()}toString(){const t=[],e=r=>{let s=this[r];typeof s=="string"&&(s=JSON.stringify(s)),t.push(`${r}: ${s}`)};this.type&&e("type"),e("to"),e("data"),e("nonce"),e("gasLimit"),e("value"),this.chainId!=null&&e("chainId"),this.signature&&(e("from"),t.push(`signature: ${this.signature.toString()}`));const n=this.authorizationList;if(n){const r=[];for(const s of n){const a=[];a.push(`address: ${JSON.stringify(s.address)}`),s.nonce!=null&&a.push(`nonce: ${s.nonce}`),s.chainId!=null&&a.push(`chainId: ${s.chainId}`),s.signature&&a.push(`signature: ${s.signature.toString()}`),r.push(`Authorization { ${a.join(", ")} }`)}t.push(`authorizations: [ ${r.join(", ")} ]`)}return`Transaction { ${t.join(", ")} }`}static from(t){if(t==null)return new Vn;if(typeof t=="string"){const n=Jt(t);if(n[0]>=127)return Vn.from(QS(n));switch(n[0]){case 1:return Vn.from(tE(n));case 2:return Vn.from($S(n));case 3:return Vn.from(nE(n));case 4:return Vn.from(rE(n))}it(!1,"unsupported transaction type","UNSUPPORTED_OPERATION",{operation:"from"})}const e=new Vn;return t.type!=null&&(e.type=t.type),t.to!=null&&(e.to=t.to),t.nonce!=null&&(e.nonce=t.nonce),t.gasLimit!=null&&(e.gasLimit=t.gasLimit),t.gasPrice!=null&&(e.gasPrice=t.gasPrice),t.maxPriorityFeePerGas!=null&&(e.maxPriorityFeePerGas=t.maxPriorityFeePerGas),t.maxFeePerGas!=null&&(e.maxFeePerGas=t.maxFeePerGas),t.maxFeePerBlobGas!=null&&(e.maxFeePerBlobGas=t.maxFeePerBlobGas),t.data!=null&&(e.data=t.data),t.value!=null&&(e.value=t.value),t.chainId!=null&&(e.chainId=t.chainId),t.signature!=null&&(e.signature=Ce.from(t.signature)),t.accessList!=null&&(e.accessList=t.accessList),t.authorizationList!=null&&(e.authorizationList=t.authorizationList),t.blobVersionedHashes!=null&&(e.blobVersionedHashes=t.blobVersionedHashes),t.kzg!=null&&(e.kzg=t.kzg),t.blobWrapperVersion!=null&&(e.blobWrapperVersion=t.blobWrapperVersion),t.blobs!=null&&(e.blobs=t.blobs),t.hash!=null&&(F(e.isSigned(),"unsigned transaction cannot define '.hash'","tx",t),F(e.hash===t.hash,"hash mismatch","tx",t)),t.from!=null&&(F(e.isSigned(),"unsigned transaction cannot define '.from'","tx",t),F(e.from.toLowerCase()===(t.from||"").toLowerCase(),"from mismatch","tx",t)),e}}function Or(i){return Fe(Qn(i))}var aE="AEkVMQnvDV0B0wKWAQYBQgDpATQAoQDcAIUApwBsAOMAcACTAEUAigBRAHkAPgA/ACwANwAoAGIAHgAvACsAJQAXAC8AHAAhACIALwAVACsAEQAiAAsAGwARABgAFwA7ACoAKwAsADQAFgAtABIAHAAhAA4AHQAdABUAFgAZAA0ADgAXABAAGQAUABIEtAYQASIUOjfDBdMAsQCuPwFnAKUBA10jAK5/Ly8vLwE/pwUJ6/0HPwbkMQVXBVgAPSs5APa2EQbIwQuUCkEDyJ4zAsUKLwKOoQKG2D+Ob4kCxcsCg/IBH98JAPKtAUECLY0KP48A4wDiChUAF9S5yAwLPZ0EG3cA/QI5GL0P6wkGKekFBIFnDRsHLQCrAGmR76WcfwBbBpMjBukAGwA7DJMAWxVbqft7uycM2yDPCLspA7EUOwD3LWujAKF9GAAXBCXXFgEdALkZzQT6CSBMNwmXCYgeG1ZZTOODQgATAAwAFQAOa1QAIQAOAEfuFdg98zlYypXmLgoQHV9NWD3sABMADAAVAA5rIFxAlwDD6wAbADkMxQAbFVup+3EB224cHQVbBeIC0J8CxLAKTBykZRRzGm1M9QC7DWcC4QALLTSJF8mRAoF7ARMbAL0NZwLhAAstAUhQJZFMCgMt+wUyCddpF60B10MASSsSdwIxFiEC6ye5N2sAOeEB9SUAxw7LtQEbY4EAsQUABQCK00kFG8MfBxcAqCfRAaErLQObAGcBChk+7Td0BBgXAKoBxwIhANMrEnM681CwBZA6dyc1SAX6JwVZBVivuAVpO11CEjpYQZd7k2ZfofgLEwPFByXxdyMEo0sCU1MCdRurJwGPo6U1WwNFFwSDYQkA0QarPy8jBykCOV0AawFhH3EAgx0ZAJUBSbcAJ2kXAa/FAzctIUNTAW9ZBmUCZQDxSRcDKQEFAElBAKsAXQBzACu1Bgfz7xmNfwAJIQApALMbRwHRAdsHCzGXeIHoAAoAEQA0AD0AODN3edPAEF8QXAFNCUxsOhULAqwPpgvlERUM0SrL09gANKkH6wNTB+sDUwNTB+sH6wNTB+sDUwNTA1MDUxwK8BrTwBBfD0gEbQWOBYsE1giDJkkRgQcoCNJUDXQeHEcDRQD8IyVJHDuTMwslQkwMTQMH/DZCbKd9OANHMatU9ZCiA8syTzlsAR5xEqAAKg9zHDW1Tn56R3GgCktPrrV/SWJOZwK+Oqg/+AohCZNvu3dOBj0QFyehEPMMLwGxATcN6UvUBO0GNwTFH3kZFQ/JlZgIoS3ZDOkm3y6dgFYj8Sp/BelL8DzZC0lRZA9VC2EJ3zpfgUoDHQEJIocK2Q01CGkQ7wrFZw3hEUEHNQPRSZYAoQb9Cw0dMRWxJgxiqAsFOXMG9xryC4smqxMlevgFzxodBkkBJRr7AMsu44WsWi1cGE9bBf8LISPDFKRQHA0hQLN4RBoXBxElpQKNQ2xKg1EyHo8h8jw5DWIuD1F4B/E8ARlLC308mkanRQoRzj6JPUQiRUwoBDF7LCsnhwnLD4EMtXxuAVUJHQmtDG0TLRETN8EINQcVKZcgJxEIHUaRYJYE85sD7xPNAwcFOwk9Bw8DsRwpEyoVJQUJgSDTAu820S6vAotWfAETBccPIR/bEExH3A7lCJcCYQN/JecAKRUdABMilwg/XwBbj9RTAS7HCMNqaCNwA2MU410RbweNDlMHoxwvFbsc3XDEXgeGBCifqwlXAXEJlQFbBN8IBTVXjJwgPWdPi1QYlyBdQTtd+AItDGEVm0S5h3QChw9nEhcBMQFvBzUM/QJzEekRZxCRCOeGADWxM/Q6IQRLIX8gDQojA0tsygsjJvUM9GUBnxJeAwg0OXfqZ6dgsiAX+QcVMsFBXCHtC45PyQyYGr0YPlQqGeAHuwPvGu8n5kFTBfsDnw86STPqBLkLZQiHCTsARQ6fEwfTGGYKbYzMAS2HAbOVA1ONfwJriwYzBwcAYweDBXXhABkCowifAAEAywNTADUCqQeZABUAgT0BOQMjKwEd4QKLA48ILccBkSsB7yUEF78MEQDzM25GAsOtAoBmZp4F2VQCigJFMQFJIQQBSkNNA6tt3QDXAEcGD9tDARGnRscW3z8B22snAMMA9wABMQcBPQHJAe9pALMBWwstCZ6vsQFJ5SUAfwARZwHTAoUA2QAxAHvtAU8ASQVV9QXPAktFAQ0tFCdTXQG3AxsBLwEJAHUGx4mhxQMbBGkHzwIQFxXdAu8qB7EDItsTyULBAr3aUQAyEgo0CrUKtB9f81wvAi1uPUwACh+kPsM/SgVNO087VDtPO1Q7TztUO087VDtPO1QDk7veu94KaF9BYecMog3QRMQ6RRPXYE1gLhPELbMUvRXKJVIZORq4JwEl4FUFDwAtz2YsCCg0cRe4ADspZIM9Y4IeLApHHONTjVT0LRcArUueM6sNqBsRRDwFQ3XpYiYWCgoeAmR9AmI+V0mrVzccAqHzAmiUAmYFAp+AOBcHAmY3AmYiBGoEewN/DwN+jjkCOXMTOX46Hx8CbBkCMjI4BgJtwwJtquuGL2NBJwFjANoA3QBGAQeUDIkA+ge+AAmxAncrAnaeOwJ5Rz8CeLYZWNdFqkbTAnw7AnrEAn0FAnzsBVUFHEf8SHlfIAAnEUlUSlcRE0rIAtD9AtDISyMDiEsDh+JEwZEuAvKdXP8DA6pLykwpIctNSE2rAos7AorUvRcDGT9jAbMCjjMCjlg8k30CjtUCjlh0UbBTMQZS0FSBApP3ApMIAOUAGFUaVatVzAIsFymRgjLdeGJFNzUCl5sC765YHaQAVSEClosClniYAKVZqFoFfUkANwKWsQKWSlxAXM0CmccCmWBcxl0DFQKclzm+OpkCnBICn5cCnrSGABkLLSYLAp3tAp6OALE5YTBh6wKezwKgagGlAp6bGwKeSqFjxGQjIScCJ6sCJnoCoPcCoEgCotkCocACpisCpcoCp/sAeQKn7mh4aK3/RWoYas0CrN8CrKoCrWMCrP4CVxkCVdgCsd3TAx9KbJMCsrkJArLkE2zcbV9tRFsDJckCtlg3O26MAylBArhaArlDEQK5JnNwMnDdAr0VArvWcJIDMg0CvoRx/gMzbQK+FnMec0sCw8cCwwBzfnRHMUF03AM8owM8lgM9uwLFeALGQwLGDIUCyGVNAshAAslLAskqAmSZAt3OeHVdeKp5IUvMAxifZv4CYfAZ75Ugewdejl63DQLPZwLPaCtHT87vD5sAwqkCz28BJeYDTg5+RwEC3CMC24YC0ksDUlgDU1sA/QNViICFO8cS6VxBghiCz4LKg4kC2sMC2dqEDIRFpzgDhqEAKwNkCoZtVfUAUQLfYQLetG9zAuIr7RAB8ywjAfSXAfLOgwLr7wLpbHUC6vUC6uAA9UMBtQLuhQLrmJamlv8C7jsDhdyYdXDccZ0C8v8AZQOOEpmPAvcPA5FqA5KDAveUAvnVAvhimhiap7czmxoDnX8C/vYBFwA1nxifrwMFiQOmZgOm1QDNwQMGZqGEogEFAwxFAQsBGwdpBl21YwEAtwRnuw2HHq8JABNxNQAfAy8SSQOFewFfIx0AjOsAHQDmnwObjQizBhufwQCnBRG76R09PhZ4BWg3PkArQiFCtF9xEV+8AJbFBTIAkEwZm7k7JmAyEbrPDi8YxhiJyfYFVwVYBVcFWAVjBVgFVwVYBVcFWAVXBVgFVwVYRhUI14VnAgICCmRe6SsEyQOxBi+7uwC7BKe7AOdAKRayBUY+aT5wQj9Ctl91N1/oAFgRM6sAjP7Ma8v8pudGej0mIwQrFic2NX5t32rB8RnCLGkBa9duMBcFXwVqycHJuAjPSVsAAAAKfF59i74AMz+BAAMW0QblrSMFAIzDCwMBDQDlZR09JB9KQrFCvEE4I18nYDYnOCMJwT0KRD9DPng+gT5wPnECiUK8SUI7X8tOT2pNCixrVC9qC24fX+AzOhsJZ5sKYiMrPB0mQqtCvCvMAcv8X8kOHy4JCAkifp3fajotShfJq8msCWXBy8wKYEFfD+UQoxEAk40dRUIlG6ltOc44CjM/Qz5wQj8cBwodTEdsWywtWuG8Egp97R0rQj8cXQhKCQ4zVENCNwQ7Q5wsCoEbLUI/G/UIUyIjGDAxAAWPYfBeCnFkyWALYC0jbkNgGTkCGx5gswYCaxBlTmBNEQFk52AVYJVgfWCzYEtgkWgWFwa1DtxVqbxaC0MWqwG7K83BAh8VABwDHgF5AmwvMJVSgAGKCrhHGgDkI3SOCsoNpk3qAZsCh5xPBUBfAPf3BwA0FlcMC6UMJB+6r0eAgQw0ABUTnyuCCHoC0gtLZREbANhOBnUECh5aADEAtritAJQnCxZvqyQ4nxkBWwGGCfwD2e0PBqoGSga5AB3LValaCbthE4kLLT8OuwG7ASICR1ooKCggHh8hLBImBiEMjQBUAm5XkEmVAW4fD3FHAdN1D85RIBmpsE3qBxEFTF8A9/cHAHoGJGwKKwulODAtx69WDQsAX7wLAGNAlQh6AOpN7yIbvwAxALa4rQCUJy07Ds4CkBh7ULtYyHRyjsOlmw/ZFUkb7AEpEFwSBh/lAccJOhCTBQ8rDDYLABEAs+AiAQIApADhAJiCCrJrOS8AFABbG8YubHYqDcEQAjskHNPhHB4LG30CewTBCqrxbAAnLQ6mLs6hHAe7CQAQOg+7GkcczaF3HgE9Kl8cLs4RGQB9q9ocAuugCAHCAULz5B9lAb4Jtwz6CDwKPgAFwAs9AksNuwi8DTwKvAk8DrsFmAEbawouzqEqD4sa4QHDAREWOwCgCzsLuxC7BBiqe9wAO2sMPAACpgm8BRvQ9QUBvgH6bsoGewG7D00RErwBAQDqAQAAdBVbBhbLFPxvF7sYOxjbL7ZtvgNIqLsAB7sALrsC6w5WAAq7BAAeuwJVICp/FTwVuwG+J+QAsloBvSjgo7vIAAFbAAG7AAJbAALjAAg7AA67AgAbu6VbDr/EAPQAaPuoOwMBu5UnSwDn3Rm7CBp7CKEFCv9wAN+7p7sau6OLeXIG+6mbgwASuwYbCwG8AACGAG27BgALu6c7ARo7ugihnMoBuwvtB8CpOwDhewG/AADlABW7AAb7AAm7AGmLABq7GLuOaRX7AA5rAC5LHgAGuwAXuwghAA1KAcIAt68mAcAAALQADpsAHBsBv/7hCqEABcYLFRXbAAebAEK7AQIAabsAC3sAHbsACLsJoQAFygBunxnVAJEIIQAFygABOwAH2wAdmwghAAaaAAl7ABsrAG0bAOa7gAAIWwAUuwkhAAbKAOOLAAk7C6EOxPtfAAc7AG6cQEgARwADOwAJrQM3AAcbABl7Abv/Aab7AAobAAo7AAn7p+sGuwAJGwADCwAQOwAIPAAUOwARawAPiwAN6wANuwAZCwYWGwAVOwBumxm7ALobLgATOwMAaSsKAOFLAAI7AARSABd7BRsABtAAGLsAC/sAX7sAa/sA5IsBuwAXdgG8AAFyC6EABUoAbXYAB/sA5XsAHGseAXsoUgA5RQD+Bw0McgAoKnABpAUIXgG8XiMMCQdvS2xfKokfPBRiLTYDoQq0AdgAFgLRA24BdnJHUhQhA08CFT4BLAYDc0a8e1J6QAApADEB+wBTCtsAe5AsASsAduUNETJGAUoAVwUAAVABB4rMAHg7BCClAFoA1hUAlWg3H4sAzWuxAM/UFgjCdXMbGFYdCdEBiJCrIlNTTUgSPMKJ+QB/HDdAKSvgEZdPAHIBKSwwKUIZDwMwVQT3xe4AS2XcAGoCcQI/EXo6x3guNdUGBQAQGx0KCAwqBB8dKU5TTgi5ugAKEs0AJgABGgCGAIkAjjUA7gC0AOAAnTwAuwCrAKYAoQDyAJ8A0wCcAOsBDAEHAMAAeQBaAMsAzQEHANcA6wCIAKIBNQDjANgA1QMBByoz1NTU1LbA3M3QzkMyFwFNAVcvRwFVAWQBYwFWAUdLQ0VoDQFOFQcIAzI2DAcAIg0kJiksODo6PT09Pj8OQB5RUVFRU1NSUylUVVdWVhxdYWFgYmEjZmhwb3JycnJycnR0dHR0dHR0dHR0dnZ3dnVbAEDsAEUAlgB0AC4AYvIAigBTAFMAMwJz6QCH//LyAGAAj+wAmwBLAF4AYPn5qgCBAIEAZQBSAK0AHgCyAH8CPAI/APgA4wD6APoA5AD7AOUA5QDkAOIAKQJ3AU0BPAE6AVABOgE6AToBNQE0ATQBNAEYAVQPACsIAABNFwoWAxUWDgCKAJIAogBLAGQYAi0AcABpAJEDEgMkKgMeQT5HKQCLAksAwwJTAqAAugKSApICkgKSApICkgKHApICkgKSApICkgKSApECkQKUApwCkwKSApICkAKQApACkAKOApECcQHQApMCmwKSApICkRZ5CwD6BQOnAl0CNhcBUBA1At4RCisTAUo3E02RAXekPAFlWQD/Az1HAQAAkykeGI9qAClgAGkALgCJA5TMi/CuhFoFuisOwhEBndV0KgsEIzFsATNabAGyAN5+gH9+gH6BgoJ+g4aEfoWIhoCHgoiCiX6Kfot+jIqNfo5+j4KQfpF+kn6TfpSDlYiWgpd+2gLabOEC2GwAgmwkbKAAg2xsBEkERgRIBEsESQRPBEwERwRNBE8ETgRKBEwETwCWZmwAowOIbAC0ZgEFbADJUWxsAM9sAgxsAPZabAD2ARkA9gD0APQA9QD0A31ebNSEI2XAAPYA9AD0APUA9BxsbACJWmwA9gCJARkA9gCJAL4A6AAIAPYAiQN9XmzUhCNlwBxsAPdabAEZAPYA9gD0APQA9QD0APcA9AD0APUA9AN9XmzUhCNlwBxsbACJWmwBGQD2AIkA9gCJAu0A9gCJAL4CNwD3AIkDfV5s1IQjZcAcbAJDATZsAkoBOWwCS8FsbAJXbGwDnwLtA58DnwOgA6ADoAOg1IQjZcAGA31ebBxsbACJWmwBGQOfAIkDnwCJAu0DnwCJAL4CNwOfAInUhCNlwAYDfV5sHGwEPmwAiQQ/AIkGjTFtIDFs1m4DKGwDrAJsbABVWv4VMgJsbACJAmwAVAEAul5sAmxebGwAiV5sAmxebD3YAEls1gJsbEbCxxP/x5BApA0KYFA89AsjTx97EHmJQPyocItC2JnNFRCEnFU6SFTDoI0PxeRNRoNRWkpzVnWW8pTagkNmgf+jGupqZ3eu50LAFnc+OzfJwdub1AdpOy76VnijWNR/CMEevikQkFyQuLuPajxWi9chqOoMJ7qpCN4sx3LJG4Myu8kD68wC6+iAwt+pU1JEeY13rpCVkXSZfinVKn4xZpxsI3Lp8bJLrJ9ujkrIalMRBAcv/GSKEtowzcEn5XmJw2BagB8V2UWJoJHZ14SXhM7p0XeGFOuw6mlvyq99WYp5XxrO6ru9nn4RHcOkJ7hx5UqWtman7yVMLzYXQefQRUdIY70RYQE8+aAzCNSGQkXiHfnHYRMi+xczKDdZLk3AV1gzxkkSHLjBwuq8shIJ+/RAbqjqQbugFhe0rqklu432EERkM5k9y1DXzds46oLqKAx6OhPT2WiqEfhaITn7OF9Y694AmKmUvbpWp0xJqDaf3jeNJXnK6NpnGcFOmbclbARC+5+5U52ufw5b0Hh+2LrrNimvZe4eYmApRsZnJE310SqB+1xB6rSJfnV1f2D0awB18Oc0sXAFqIlgHgWiaZGdvP5CJUSsCTCQUC335+iSkwPlLJJ5lwjTSn9Lw22NbK1Tu8w+bUpHtDRDPho7Gun8aw2Jzu9i+N0Ot/kPMbLAb/rUQ82kfpk85qLDkfxLl39QPDngo72GYh/Xigbpcm1pA23D2ywt3D8GgMOao040wDqkHxOEx0OhC+ZmHiIdjK7yRbfJD2ouZbAedhD3p7s8WDmCJfNforgDYPGAXSI08fTjPZ5B37lc5VXGzc1vJmibDwBNVzXuaUzg7N5H4BxqjhJ+kz9HLUJys7bpBDYAPvbut13AwJCWd059tS8YTYgC8HwrkewBfa1LSSpmMr9uR2EekTiAMH+Mx4AGzgbquccwBDlLmRhgXL/YiLPCEb6d2k5qJ6o800qddABkpqt7NG+sc2uvHZwZs57W1AHTFM1KkMShasADAh2FvzbzJOzVDMS3ZlT2BSFKdnkZFB6JyqJbhm6XANis9TrtzJdlPVp+rl8v3nIke6Jou7m2TKu53Vounupgkz2LzrQPhhatLIG7rfF/gUKWp15X3LKt+ZvuCDSqPUigF9yJntimC1HJR7Yj/dUrLAXWrT+1tnwPJJLGKAlQ5VeNDWRKCTt2vz3rJuo4+gIt75/Mkfl/gSZblZ9r/SEeeosZXneli/xNh1WVCvkRt2RnyyjtMkMqhzXh1PVOCbILqv0r7rGYm0CHIyKdhHL90cl9E1I6eEtQTCt6RXj8M0HHrHCHLVRpNM6WIbT5BCMGVnL0o5895qSRbCJz+5I8PGMhAN/Xrj4BgIdlKqlHtBHqTJwmK169toZ2IWxNzrAbIG7zh85Q/LG2A4yBcaBel52zdunokB0lv3A7kXnTI7M6ZnfZ7nwuj5lkGhqSpW+w5CI/FmRlplBEbnZy1ZxS3DL8rf1YWhO5XivWZBSRh1gFsjjyj3qRG1cm/6ors7WsEif6WRxns1MKDZa6KrbfMQ/swIb+2nb0tqxHeii6FcgVeAjE/Xwac1owx04dJKG8R5YQgHNnEfHf0qb8WOnU0eQSjazq+IK7cSuCqYzPEUB/x+QgGZqM3dBoYvNvZVOHDkbgdilWdagqO5bkybXfLpyMPuGq8mvAAEZGbR6RwXGlW9ErOWTfnjfx6dXFJqBj0OBSGFz4lWQasNOmVJeN4SFWSLfOGB/7ehV5YuoNNROHZEG9ElVuMnqbDMMuDleOt/cN/gsWxGw128mwU8/HxkOKqdTZnI7dHka67WCTf/FmBrxpNCaKJ1GxBTCSS7MNfhNj8S4Gtotg6Z3AM9cAeVROnppUMaiV5jjudLnNqoVrKO1/FijLlAc74kxydxKX1RQuMqHR63eecYr5o6MJ+B78VsLlCrpelWh6GOrCOBIoQmIcdpJL1pwE2zzZqBkecGTdK8KMOB6r1eNRURyrz6M899TZaoS/vNOxHf+5gORU+OyYIcIW6diP25GHF6u8TNjuL/GJzCnLLXd01KrsjRa51v4+O/VIAWXESJxfxWjv628J+cWUQpoD+Yytzs3jSMRJ23/XT+vUdtUMLDQq1vnIoeg/GjWh88MT6k9dRqDaQ+vodilFgvjuNw5pJpId9mfwyYeLCGb3BmHXdfQfhfPRQaupe/f8TG4Bk3eDKlYBaEK3kZYNN2Sdxz47m/vYBxvIOKtnqplB1pebzuXmAr/MuzQCknKe653dzaWQQ7MUhWYWvzIZwLe1v0rXxImLaz+AkAu+sYikhouNF3EW6w4crZ6MuUiDbIAx8XhAfegcvW6x9BPb3/sCxGWu9YyatqExB+TSm69qIkI9IwhjrcnzME+jWBx4mNQm5WwLzUjSyY4FZ0aMF5YFlXUD4hL4XfOeYv5rDe2s2D/Cn+28fZ9UCnOQvXFMnQqfc0G+ZqOWWD9l/liqUPaNQzZjxCHpUAD8Rcc90MniQ02ugHWsUupFUvhC9usY7zNPt5F2jO7qgzhafsQSd50jgLrC6Qx6bpHbXR3WNAu1BzGmwbz+ebGmwTjdy006Y6zipP7n/OJlvSmbq+SY+nefAVKK6EBMPbce5n3IdRI8+vbxCpN53rw3TvgNds1SuMiuLGxt89L71mxPDeanGhyHvOjmO56tnVpoHalQnL6TqNuqKsHjHCIKB4pCgj4WyYPvRvYvqi5EMr7lN3MotPR/KH7JUD1lZbU0QzfbrEBJnuQiVAyAC9vwXWp2TRU1/0aapyAH2cbglEHVAdl+1rb1u147uV0td1eNoQZsqHrIMIYVPXtLk2TIU3cJE08PjoYNDpfF/IcJnYQHl6nsplczX3Rgah4NbJJHl//5scUufqsSd//kbIS406ZWoMP//+jhGUswX/5nVNz/jAj9KmXPtAmMiK+khhbn1w/mELzZMT/WxcW//y/jsHaOM/61oAW/CjYhJtY622/TtMYuP7bilBvbiT3vB9n8IcFPnwM78H0KfhYDRdY5PhWJ4jWRQzB+HT5NVZV56LG82hcQms+jOTT/c9Y9sx5rPi1/wB7f/+c5UfUCKk3iwwCuywUc2MGnAwsXf1E5hoI55x1Q/Qby+sWH8NRjavZ8VaDsdi1NUVhH86BJHX1yaFt1w1OYeL5LVmdN+5Q+KuTvXEPDzUCg6xp0HhsUhTWSe7MZMM/6rsTUb0/nbUE3YQlGGt48kT1/6cnf6yHnvHtQx9EosOXN077yyEq/jE3YTiG/5SEJmXFeocJJ1EAd6vKeK6VEdJLOZ1km/EwOnZWCQpzCLKPHxrfh4yJhGq//2dos2E/3+MOcdW5EsgIdmTQUQetzRy5fQHhDBl37XbWzsqO/cASEDjyst1/8NEROqVAxWnddQV+umJ8IrKVgKvGaTc0GsQ4s8h0Osql5QKwlddPDjJhKInyWqYUKmmlIts+FIcXZ6yM6cljbsjUG2ksSOkuIw4sYHffRNgBOLApvD6XrR6Rt0rV2Uf8IpnIUVnb9Twt91QjAaD/dStSWDxg7aYY+VXIgnuowYdOkjywa2hlgrnI6PjaU3e3UjQ5Yk5mdIJGyHnv3/P+1EkMav1yFyF+FeJE/RXnWBw+Nh0aOo6TGlKX7d+dkP9+brvr79SdtXJtcD/aXBGiMNfG6/NQniQHYQlK78FEHDqOh+bDI0o+2Ub0h53EL/vlzjrBczVEZz2bOtvIL+DIzDkk9nCWt7tlqsq3l9JMtJk3r5HG2iJ9b/X11TG6wwMAjHLQ2oasaMEsydh88QPvI+hmqIHhvalpKoKOueJR0eZ9J8G2alNOIOy98jwvbc87Ewk9d+5G/tUijTmlbjFlDKXV05HalKxaRTrucc73On7yzAPS6f2v4ogiaWyWeV73dv/MsQT5HjRrsYV9dLAcI3T+zC2qEVINyNpEhoKV+xVSuWtT4AhBfpnZ7unIM+HX3msI0HiI+P+z2PFgkjGi5PqEbG/wNIWeRUjPtDEgbbubN+I4JaDLrW9borRBDob7ZFx+JdKeFVUKVeWqb/c88Ol7DhM0suLtuEd8tkDSMTD3DFx8UphPINHMHi51hAPttXL4Ektt/lKEUG/R4qZKohHjVpAcPIMiHyWr6xR8/EWnNJvBFET76yCdk5er7ADB/1bgoImhpSiZ/omZjPKPCEeZsOwvPmXL+1vlJNeGO3TzySmGA1X6e58gLrazDM71jywM1XL8zKHN6G3kB31Y8vLtP982N975SZXk2JwDvmv7AY/aDsFFk1v+nE7/hbvuOWhBH4kuemeYozPk2K22Vx/YGiDTLU7YilpOt29u3RZMBh4UJjlTP5ItxTzWv6ebL9b+GSU1Vsm2S8LMfVfJczaBSqE8J1A4YUjpsALL7++bwCPXFhaufdpDFtBlHb9makeYbqdg9ltvK/HwF/rNE6KrtWUkEcxmTB7Iyu5TiVaIgW/YxzQhpArliIMkOoK5L7ShVtF+DYqV01mk7fwop04hQRwg4KFmr5z9nYf05VVqkSe7gfnx5bxxlQ0qEV0jiwzf064qG11iEqjHcUgDWWsDs/LEGlzX31T5KVL+7D4EoKim7HBagiqRo5JI3WfDBgpKIruWz9j/J6Hp5Q/EJbMWB8NeSMuFarNw3AEYPBJtYQO/4oD/ZgPTSQ06di0EeumX5EbrdThO+fvYEVSxLtZ3AJkee0Xn0sDwNtiiZhJjJRDuG1YRKB1vOulfd9JjHeyu+UHTmrtra/pm+8Rixh4WKiLaLOCxIbZNoWRZSyyUGLPjAaAo+SQBpfO2uruWrzFxLlpvrXJNMCWtlJDKGAnlWK5xpU2tcxXbeD+sbdfwYXt/qTwDk6UqXR/aUt099DhSNl4Nk8mXwpw+b0nvjKOG6Mg1PRXjrMUMANvNgEArv8nMJs3vj1aHi8MHz/UfJWWzkcrSpZTNBhduXlGR7i+ip/THDp5R9KRNcDKECgtwgXg4EFN5HHfikP/XvsoCkHTg+NbsD8Gl6eknk4Arwn/BWGJ0hgW0/gUKrzuGZhub7igRP3abetpIm+24xEOlWl3YKpm2qTBFvX8ddDRvm1LcwnCJuEfZx12qPY9TrntMIQsv316zvpyWnyStX8VU4j6tQk+CWlLBUCJR6MdH9Cp7g2qdn2WM9qFbREmejH09dlWEPm8hPF0L7RxwRRdiCs0DP8ewk6ApoELkKU9hckSdbnXm8UHJmaNXjxv/q0fTTpu8rnl9lN0vQCpDRbCtcz12rGRFEA7Cfg7FhZn5QFkNmv1ZURKEsiZce1nS9K7HrwpC7yJV4Xt3eAVbLJfoXHrtwG60Z8gwaSnmxoL3s2ZlRqggZN/MHo1oUS4L+GwObFI596Ld4Mvi8l+cQmF1gJpkpnDio7TuO35npaMHiWzFqPSX3qNgkIPGuX0qGYnPIVsM901Yu8oZnOZOY1TbtIdFUNKNq2dP8SJ4F/VCEzIjF0/Rh+7UrZj80tC6rognVH3mqa8eCs/lcQU1Pjj98kBmAKDbZUTwosv02UunRR3n0X6c+f73mtwB7/WbQ16gO431EtwZbNG1SM4TZPBnsQSESlsfG2JLQXx5xWf4bmQ/xcVCPISAX5897JxHKLD/Xkgu57+ABR2+MMtEbX64+MNlBHpKC7sjlWVEShf5qA+dGc59LFVlZrX/Enq9z/v+wnZ1HErmxmjJjxOA+hAjVUWgtq6ygAi/8ewJDjUMFw3zhQFtbyTLDPFd21Ji5S5QPZo9nMSxdg1+DGFSN0wlWt7XeYPbHqLfliV0J1kOhQNp0VbUPy0MS2Ms66OxtSWvaULaWHnfAA+sieVVgtjDwN3nKonWapkSKRN8BKKJQpCfqo8RQI5udhfu5s5+7vwsppmAJDgz2GNA7d43VdbV2l/SrvEu4RYslmNJmfSOVbssxAhSYy6WxpIQdDB0FVBpZ6IM8yr81QN+XLZ3n/wed/R+s6LslkxKbzzst/GkRbe6rFmtvJCwr1T44ETM+IMgOnjUO0eG6a1n2w7lwM1oFBvzMUWRkNFOvKcx3oSb5XdenZ5dXsute6nkRypBiSdAtA2fxAd8UdLOZW/MB7fZoEuFheQXijdaF8kuaRZoSeWdKOkKsGYEGaXfaDKTu0WMTcLniQs7KRCz9iK3SP+Y2xIjkfVGqFLSQ6vh+A1u6FdfwXsv1VPMfi2cxmdM+/xTgMXEyo2ZGcQ2YmPsghnYdv2+z48JpGZA4tUK1p1q2VdVxyfypXEXcrxKKtmt8UdW7sHWmKMqDuBBM3J/JUQx8eUYN4pJ5oRqvdiPHU1o/WPjiKvnlCqOdyxlxF54L9PrtLD1NejZ9aZDivVr6ZfMFK1/psVygoPIAnphcJWWb9+5IKMKmgRQULsTPZi6Bw4wP32zVEoKcHpP73CkFAqS98nSaGoWDjDJiaACJn4p5o1jq9R4Q4VcibhXF//LHP0bdf63kRVZdRbbhGe7sDQcyWS5tpkfeYHnff25WK+4FpzLlAcbaKmHdIBqOw3fImx1uqQIADH0TyHzFlqTG6nMoY81svP0T6BIyELMS8tMe+E1p6TFP6sVpZa6VNaTumufD5aj9goRa9SAmdJT4HhI2r0egj8UrgFb8L59wGLnYlzkLAiUd3m/WWIIEU61kPoEjd3gIVy/fiBcgqQqHnoXpL0SqLGdGGgn7DQeVMSYWHfjno1FngIKP9cjYaTlcRP6bZunjHP13/lbVm4awti894pTf/ZNNqr4OR+tDVie/m+rC8QpVnRbsCMPukOH87B2jM4AG6pHuXl1x9SiKdhYJVOhfo/+SCaGjUW2CoogL1FFhFGN9o+acoVLl0SXs/3vrSccmZeAF3NewFuOg/P12QYKQF+SH+KYcNnsAhIAELPBUgre/KRUJEA+KPD0MHRjv+3J/j2Z23MuJmkfy7leWcMsti8wXLSHgXFJTaksx1Woi6oljwxFVIJG12SBSZLNJDbXMYPekmiXT4FclKI35BFgqnYpKfcsr+f8HUXQoHJ9UYZ4J5YMiHHyAxg6eidhodgqJ2Htf/xYEx+G0zXchuzlt8hcAl+AT8NCQ4orFc4DerabF1enA7NTLnvtZh3FUwqIOvY7Q4DYmoDHwXTSw5UNNh6r7j0B/ezMYJMDcw4+6gCTZX4YQ+7Xs8de72vsR3cmfpxIX64/6KR1p3VX4F6vfHEzxzarh8aDH4G1DFoBBM6npXFpK+Rh+WrcFclAeAxi0PoaR9CpOxxGLSdvxKVSw8oOOanG/soKImRopN38AdcUhhM2GT/PgQeSQrG12njuJJD5Z7vWfAZmFybYLdSA91kB4aoBhoj1Z//KNIVVujqaLLRwCkbyn4vh0739C9V9iSjybeOIeSOvNs7LW1a7EUtNoKAnOGML4U8KBXpfrw73WjAszJG4Qscq+Xr3kZWR4Omm0xT6qE9y6FNSpstV4onMZSqCEJ+3VX9qjvdx5QVrM0WXxmPZxejdfnihcFAjzv5PjlTl6ickDbHe6+Lch52pjOPqk+m3RZ+bh2JSMGtFBuODbMchrpRVlt16NTQ05Ps0IDtWlUmWfP2vX8M4YDynIuOZ4Ck91+591B98Gw9fw+yQogTR8CSg0zaJu+rlBo/mr3A+1NziF+kdubz+whc857AZt6DwIBIF5+5yiaaf3ByQp1Fm3sOkZDAzwsYSQTM/Kv6idkugF63FDobDdUY3huruU+sCaBuRR+HmOowvmZoBjZHNh77SXFtmY/oOUE7ifN7nBHAo83S/xvcS6H4Ci2u/9Id62Wv6Ui+zMNLAzhfkTkVcW2BwrnYvpur0ZDlzs+ZLsmGTWvd1892t78gx1YjEJusGcxphjLkV0UfAKlekfSBVWHE2ahk4AbbRmHyL7GYdtKfdlINwrcdJuf3Cee1nfUojDQn/YmItESOFhtLzrkEv4k2XpMU9oaJQ3VUC+1INh6BE68pkHameGJm4Gvdb24Q0fXWxd9Tp3A9mzFSe4qXDGGDIV4AAGV1jIDfveknH1TwWpUT6HiQxKP3AAHJNkJeRlj/mXBmS4S1j8FK6YmpK7jyyAiRbsMCCLoJcx01fvgpMvKQRxu9IOwymconQjD56g7ksOrcOeoTbius4JnGesAS1DtgdaophYsw1wGIsMS3P7K6doE3K5czznqPQLSRRF/Ylzb5NtSKsL33SgskFNCF4khn5LWaDxI23ZRi2hzqN8uW8UzZEBYy68+VtGLSymQrXGUlr2nO2BbBIT5Vh1RmGAyDXaW0FPrpx3wv2UYdFk9tSl+906bMxCuXQaKDQP/U19UEcVGK4gmksL8lAorxQSAOwpeYX9xrZsh6yoGaL/X5O3tgQC8OM+/GvxnW9XvAtu/JxAigydfSmZfqZfg1XOcHNOpLlN8j64OZ36l5qawDBJ62YaTvxeNmm5gowCdBosgcpHOgNgwA+sknN8XmsR2IYChcafl9bGNMZ/nB5guWuvEziv6QI2bP2DtyKWG/qUjZMaxy+wASkkVGtuwGtywkTYG6MYrZBo18vYcww48G/+f+eITA/qMwbLlJC0S3+/ai2pPvkOhRRVmGTuSupaxhIk0xoXLtixCxSAn4Z3OnUS3wBqVscLI4P3GP7i/6gxYsswsVmkvDXFLhO/OKcur8flegCSKiqmVpIRvCzgbjEA0mXPn+RExXY/2OE1f/BYuWpRQY8gCDpMOYBx9Gn4tL3hihSIR1ixh2PIIT7cr2gUJbfs76EKYG52Jk0UZF/PQkBxGuFCEWXnG6ue/hTIqjTRq1sotVrKrwIGHDrITyuanUzbIYdgdEeV88K1VD82TYB2B61Ft+tB1KqHPmT9+hWoaV+iF3SuvtJqvnoLaA8wxrD56AUMULEgzO9SvBcBAfqz/dzMYzwMt/YLszDbmGe1bcHHfFMcvGql9bf/tp+Hrj4q18aNnftGjmXTfws39emn7/5IBxog9MrmftAA5Oq4awenm8HimWO72dwVlHcHmutVMdrMHw+p2vzpzT+B0iIZ+IEpplwWhClcXlxhxAsF3CHRnnaUEqq3ByQ+cqhe5SvR4SFxh/LZoQwtj8QZQGT1BzY2EMpYnUcZWQEPlwFZw+7UryK9qV8KgruYsvyMoK16KI2sN4SOblrVwhyiL8+IBZ8cpUhsJQSU7TFHAi+L2F0sn0y+FtDODlnuif2Mba8QddPZYYxjTsIgkMe3M6+7kXxUfZvbCUlyq71J1eNczGk6Vqw6rSx2K3vM+DjLxDRGzWepTO2qTT/W8S7u0QXcyFUahcB4vq8xCYTpy8iswtnyz7Kx6lgTEQJ9RqkgEIN6DOUqB0uRdeYuDa7AP7Zy9z+ZlTsmVR5vtV71m3dmdtNeWghbr5PnPJtjXAzcvZjxyV96VEx/B1TA0IEQSI50ywGuIbmAYdQg/l/rxhQLX+6uOLyFsaUt6mtjpAJkLfehnB6MlOHnNOrWLvCBqVBS07jcM+4RzLEed3f3/0Xwp92U+nataNHyEgnnuYR6PXEjRLETz0xrt3UglfK7Bn4aNlXG7cZco4lMziLv5+Mh2JCww3mz69Z9ZMRR/xv5EKJ38IFxKd9dw5CgPIXja/gzAshMbF14/qBIgNkdUQeP8YE7SrICGtiTnAKTyA9cXa3OauDHxZOdTP7yuYBzD1UcHstIO16FxF1bRUAlSkszI83YufTchU8OPnnozDl9bS0y6CnnjGwgj9M61cXcZsljjhLeT/Vq+30ScN2PcT/dOoxUDqDS38+OpCCzLDdnwHQc3ECQVIkaxmdPaZTSdfp2jjGzSdNLM5yPQsgJDl+ZnhclDQi8ltUnkqWJ323IvTZPN8rn0+EshL1cx9PiaLTzUsryn9Zp2Nt/detUAh4N/2I3dlMQqjHFxSihv0uykzflq5clMy2ZBaxoEb0/QMp03IQQus3vnZd/NOmSsmgqXqKFP3ozyDgY7RQS+npabe/hNG+5sa5FtvL8v0uYuag2NewYkcol3TOTadpuncCnDgOGpmLnTQ1PEPUN2cNsrW8LYfIv+hzfb7vod+ipXHzmbgj5Fzc6RcT/5PD7VQ8nTJBNj1urkVUx9uJvTWmqY08OC80rGDLaWXv243VB16gjt4Xtwp5H2UDR0LiKW24Ed/sOO8jl1yEU/XAb3h7ScKnCFy/V3sICrkY1D0K9fSokHIL0s5/7DLShLAPXRbV7fbv4qj6OwHC9d5PlEOX3LRpQ3P7hcSAKlIKPDM83ypz56U5+rJeo0cyUtC7wltL8wqEiNSgZsDWzACc7RFoZqhlD0+sihIBQlkQTXmvUyIOZhkQX2zqME5VRC7ms1sa3CY+odMn3mMBiTvCMKnnCxg5ZPLq4GUDB4jF8Br2K4x4sxfWjGXQatJ25I1JyrIv2Z4bP1jKw5C+B2/s0v4dGUOsaS6IPIQV3ETQ+F2fSl2BPBXHzyYN8VmwWIrKeMX9pyGWuAOVXwkxJsRBaBVzLhZDP8ONGncknL5DpTxHN32GgFWMwsc0GmL0oRDmRT8u2lvjAKUIi0MmXhIHSlFeh3Qh5pP6ap4YUd6b569ZIaHgya2AyD12cPxY0In/PBjzDctTaKJCU+xc6m9RkNLDEE8guvxtJP8sl8N9bLqw0F/qejaBlcHYqw31zYpsutQp07hsP1vhGdl4hJ1wA7OCsAHnKj9879uSHILEmuZ6vI1lT4tvnWCVKZhhYrWHW9oPKPKpbOC6FTjf/OtUvwmiXr2ykvyLzHGQeyS7BenZpL3N/CaF5T7Gkml7JXN5cj0PKaDpZVImD61FuMgFHPqSHvt4Ej4KBdAfdcoO3AjQPLwwtKsgGM+ty4lNZMBEItJSRLunG5ckrM/BeoXWoPZVvEoIzLgFQYPupMwZCXis4W2SCJ2zsefZqCj+aTfSq1FYdUj2UeJALvVTf7vuuikOE1Hit3UIAGUi/sqgMum9vw218y1FlY/9XnOji9nqhGAcMYICc7BiqLZj5N+cKEuSAuiyWbMg81ZD1lHovy/we2eaCcCv4MzEW3O0mVA/t2xdA0cxTVbXmFhn+tARDpvDz5ftLr15OAAmvo2QiAky+feVO4bGibv2nlBmBzqx0lEDfEm4UnEs11pbnwZlJ/0Y73/wBPYfTNZiJKR73TzdCW1BffiJq9bLjQmaKnU0+gN8sfe25IKSUCooQwxePDrFn3a/zUgWxvPoTYVXfobY/GV2qqTkeVDV9D8657fhY0/wiaJ5NfLxhXbE/naxs34N0hd6vxNfdm1TCnozm/NKSCThchoYgMF7Z2tzXFovRfsNVkf86JjrM60r7UIuV3bsmfrMOqzjXjN6HPBG25zCJ3QLueySbj9oFvX/HxWBqh31PBPxduCVAxMqC9HK+YL3oBZqBruoh6LKvdMqoz0PYXUBrwbiioyE8Tj5ImjJmiOOWLbAZvIZ/l9rIPljx3T5glJ2ewlfuIT5GlodQsAf/IEtmYkML5SRQGxxwW+rlZkD8belJNu09Itwx9xDULTnemVDeojdbgcd2gKGM9aO00Jivtbs7ZyOSE8IPh98GfvatD8Ud5uHcZfAfMiPSlIxd4UqeSDzuNfbKDuFepkyC/s3j9fawmhY1b9NqDi0ZS5eP35l7rL2eK5QlWLlyCmxx8AFaFiTuD2pMUxZV5mBSJuJduOaq2ZrWpu28DE8jl/hisBz7bGWH6qLF0ayWNq1Sejtcs8KQrQqJk5P9QHDYHOIolgNsMDmEaWcTelghbfFCDqWrq6YLwDWy+m68ec5nShgq2fduUBpQUuKKKgnttaUX9PRfMmxqJyU7e0RLr1bev+ge1KK0bZyhHKKDE8gQX9Vf7rNHWOxBtZcxwwGusyMpH77qWZxXsQmbgIGhtiO+gSSRCyu/ek+OFsz1HMiQH0IHV7PjJi3dszYfFp8ue9h4+AfKte4MTiehPvxNcm/T1t9vsFZx8rHN5ie77r2jzZOq/Em4Q+H9sNcZakf9HnzCc1fJixppxP8FQABmVnqa6GbJhwaka7WH7Wdoz1WxOjSNV8N9sgW5S3Ppgkut+TTCkjA+AodUOk1KIR+8G8S3WrSZG4nyqfJ6FEjXl6a/LEoRMHZUqfPRWvwqrtXYy9IUsmUGzkqi76ib4NANCe5DnyOxnFRZ9d8FdBVBjra3iNuZhJuWW5Omi/hBigqDsg0mu2AhfJDXdwyMIJ33HHHPfS2JtjegRejX11m41TbNL+Qp7mR0g9CPKTj9PIjuSycGN/YPozXI4zarXuAeLv5CHKtKcJKRbd6R2oLNiEt0T8+QIVJH7zt9ncKMgd49vV2P1AyScZ9Qzbu3m3LBnuu6dw7aE0b6r4kzVkI/GUS88mA53L/rLtntkFlZXGtIoqNP2mD3eVv08AVVPT3wJn81zpbJV9SuqZ6Pd1ge0Zz2RFHeCdV5CLPftH9V5o9+VzFu4R0QeumqDwUhXn3IyYotdJnxr1l3BqWnQVAeDBEOtPyJQx1q5+mODiClXtYeBLTWtsJ42AMBcf/IFIhpfhYO08hsg0Ik+DpQFNOKReK3o3cudkxWX0soPtI5eSFOA6yNylS+IQjrQtYQ/5s4UcixJfokumBUjpH9ofSjUTwPCapGFndfqqG5IHeMMvfg+88SXm7bNyjk6pGKzL+WxDAdqKtQ72WWVbOk3I+ueGuammmB2pvFZvqIcU/lvW3n9+r2lycnQLE4OX9R1jIgW4cDjJ3v8dAa66mVcfC7ptCr5io6mCaA9qI9T9FFWqo1ZAaMxgxAu8aXqmaOYryMND2sTUfoHvxcYK7hEiJhCLYFDx3PBhE97c2a0ub1/ePJcyJOqr7UaTAPTJ+xvZtjb/40sloY1ltRnTkWILmIP2b7S3AdXCR+YiArMUHwdncpjpyDGfzqGOUoAuaamWzAMacQtb34/M32FEgR5lUEf8fRzFrZUhzQj0fR7/6gdzdnVVvcSneLmtqJ930VCCDORY8CVdQWdo/S3PNkX3pQsPVKWIYGAMrFZoq8bQ/OJBDSXP7KSBdL3QN0Zqd393p6VFc7DnlnFiN00SY5Nux7yadeIM0Upl2rVsu8/VAI";const yd=new Map([[8217,"apostrophe"],[8260,"fraction slash"],[12539,"middle dot"]]),xd=4;function oE(i){let t=0;function e(){return i[t++]<<8|i[t++]}let n=e(),r=1,s=[0,1];for(let S=1;S<n;S++)s.push(r+=e());let a=e(),o=t;t+=a;let l=0,c=0;function u(){return l==0&&(c=c<<8|i[t++],l=8),c>>--l&1}const h=31,f=2**h,d=f>>>1,g=d>>1,y=f-1;let m=0;for(let S=0;S<h;S++)m=m<<1|u();let p=[],b=0,M=f;for(;;){let S=Math.floor(((m-b+1)*r-1)/M),A=0,T=n;for(;T-A>1;){let R=A+T>>>1;S<s[R]?T=R:A=R}if(A==0)break;p.push(A);let x=b+Math.floor(M*s[A]/r),E=b+Math.floor(M*s[A+1]/r)-1;for(;((x^E)&d)==0;)m=m<<1&y|u(),x=x<<1&y,E=E<<1&y|1;for(;x&~E&g;)m=m&d|m<<1&y>>>1|u(),x=x<<1^d,E=(E^d)<<1|d|1;b=x,M=1+E-x}let v=n-4;return p.map(S=>{switch(S-v){case 3:return v+65792+(i[o++]<<16|i[o++]<<8|i[o++]);case 2:return v+256+(i[o++]<<8|i[o++]);case 1:return v+i[o++];default:return S-1}})}function lE(i){let t=0;return()=>i[t++]}function Gm(i){return lE(oE(cE(i)))}function cE(i){let t=[];[..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((r,s)=>t[r.charCodeAt(0)]=s);let e=i.length,n=new Uint8Array(6*e>>3);for(let r=0,s=0,a=0,o=0;r<e;r++)o=o<<6|t[i.charCodeAt(r)],a+=6,a>=8&&(n[s++]=o>>(a-=8));return n}function uE(i){return i&1?~i>>1:i>>1}function fE(i,t){let e=Array(i);for(let n=0,r=0;n<i;n++)e[n]=r+=uE(t());return e}function ga(i,t=0){let e=[];for(;;){let n=i(),r=i();if(!r)break;t+=n;for(let s=0;s<r;s++)e.push(t+s);t+=r+1}return e}function Hm(i){return ya(()=>{let t=ga(i);if(t.length)return t})}function zm(i){let t=[];for(;;){let e=i();if(e==0)break;t.push(hE(e,i))}for(;;){let e=i()-1;if(e<0)break;t.push(dE(e,i))}return t.flat()}function ya(i){let t=[];for(;;){let e=i(t.length);if(!e)break;t.push(e)}return t}function Vm(i,t,e){let n=Array(i).fill().map(()=>[]);for(let r=0;r<t;r++)fE(i,e).forEach((s,a)=>n[a].push(s));return n}function hE(i,t){let e=1+t(),n=t(),r=ya(t);return Vm(r.length,1+i,t).flatMap((a,o)=>{let[l,...c]=a;return Array(r[o]).fill().map((u,h)=>{let f=h*n;return[l+h*e,c.map(d=>d+f)]})})}function dE(i,t){let e=1+t();return Vm(e,1+i,t).map(r=>[r[0],r.slice(1)])}function pE(i){let t=[],e=ga(i);return r(n([]),[]),t;function n(s){let a=i(),o=ya(()=>{let l=ga(i).map(c=>e[c]);if(l.length)return n(l)});return{S:a,B:o,Q:s}}function r({S:s,B:a},o,l){if(!(s&4&&l===o[o.length-1])){s&2&&(l=o[o.length-1]),s&1&&t.push(o);for(let c of a)for(let u of c.Q)r(c,[...o,u],l)}}}function mE(i){return i.toString(16).toUpperCase().padStart(2,"0")}function Wm(i){return`{${mE(i)}}`}function gE(i){let t=[];for(let e=0,n=i.length;e<n;){let r=i.codePointAt(e);e+=r<65536?1:2,t.push(r)}return t}function Rs(i){let e=i.length;if(e<4096)return String.fromCodePoint(...i);let n=[];for(let r=0;r<e;)n.push(String.fromCodePoint(...i.slice(r,r+=4096)));return n.join("")}function yE(i,t){let e=i.length,n=e-t.length;for(let r=0;n==0&&r<e;r++)n=i[r]-t[r];return n}var xE="AEUDWAHSCGYATwDVADIAdgAiADQAFAAtABQAIQAPACcADQASAAsAGQAJABIACQARAAUACwAFAAwABQAQAAMABwAEAAoABQAJAAIACgABAAQAFAALAAIACwABAAIAAQAHAAMAAwAEAAsADAAMAAwACwANAA0AAwAKAAkABAAdAAYAZwDTAecDNACxCmIB8xhZAqfoC190UGcThgBurwf7PT09Pb09AjgJum8OjDllxHYUKXAPxzq6tABAxgK8ysUvWAgMPT09PT09PSs6LT2HcgWXWwFLoSMEEEl5RFVMKvO0XQ8ExDdJMnIgPi89uj00MsvBXxEPAGPCDwBnQKoEbwRwBHEEcgRzBHQEdQR2BHcEeAR6BHsEfAR+BIAEgfndBQoBYgULAWIFDAFiBNcE2ATZBRAFEQUvBdALFAsVDPcNBw13DYcOMA4xDjMB4BllHI0B2grbAMDpHLkQ7QHVAPRNQQFnGRUEg0yEB2uaJEMAJpIBpob5AERSMAKNoAXqaQLRBMCzEiC+AZ4EWRJJFbEu7QDQLARtEbgECxDwAb/RyAk1AV4nD2cEQQKTAzsAGpobPgAahAGPCrysdy0OAKwAfFIcBAQFUmoA/PtZADkBIadVj2UMUgx5Il4ANQC9vLIBDAHUGVsQ8wCzfQIbGVcCHBZHAZ8CBAgXOhG7AqMZ4M7+1M0UAPDNAWsC+mcJDe8AAQA99zkEXLICyQozAo6lAobcP5JvjQLFzwKD9gU/OD8FEQCtEQL6bW+nAKUEvzjDHsuRyUvOFHcacUz5AqIFRSE2kzsBEQCuaQL5DQTlcgO6twSpTiUgCwIFCAUXBHQEqQV6swAVxUlmTmsCwjqsP/wKJQmXb793UgZBEBsnpRD3DDMBtQE7De1L2ATxBjsEyR99GRkPzZWcCKUt3QztJuMuoYBaI/UqgwXtS/Q83QtNUWgPWQtlCeM6Y4FOAyEBDSKLCt0NOQhtEPMKyWsN5RFFBzkD1UmaAKUHAQsRHTUVtSYQYqwLCTl3Bvsa9guPJq8TKXr8BdMaIQZNASka/wDPLueFsFoxXBxPXwYDCyUjxxSoUCANJUC3eEgaGwcVJakCkUNwSodRNh6TIfY8PQ1mLhNRfAf1PAUZTwuBPJ5Gq0UOEdI+jT1IIklMLAQ1fywvJ4sJzw+FDLl8cgFZCSEJsQxxEzERFzfFCDkHGS2XJCcVCCFGlWCaBPefA/MT0QMLBT8JQQcTA7UcLRMuFSkFDYEk1wLzNtUuswKPVoABFwXLDyUf3xBQR+AO6QibAmUDgyXrAC0VIQAXIpsIQ2MAX4/YUwUuywjHamwjdANnFOdhEXMHkQ5XB6ccMxW/HOFwyF4Lhggoo68JWwF1CZkBXwTjCAk1W4ygIEFnU4tYGJsgYUE/XfwCMQxlFZ9EvYd4AosPaxIbATUBcwc5DQECdxHtEWsQlQjrhgQ1tTP4OiUETyGDIBEKJwNPbM4LJyb5DPhpAaMSYgMMND137merYLYkF/0HGTLFQWAh8QuST80MnBrBGEJULhnkB78D8xrzJ+pBVwX/A6MDEzpNM+4EvQtpCIsJPwBJDqMXB9cYagpxjNABMYsBt5kDV5GDAm+PBjcHCwBnC4cFeeUAHQKnCKMABQDPA1cAOQKtB50AGQCFQQE9AycvASHlAo8DkwgxywGVLwHzKQQbwwwVAPc3bkoCw7ECgGpmogXdWAKOAkk1AU0lBAVOR1EDr3HhANsASwYT30cBFatKyxrjQwHfbysAxwD7AAU1BwVBAc0B820AtwFfCzEJorO1AU3pKQCDABVrAdcCiQDdADUAf/EBUwBNBVn5BdMCT0kBETEYK1dhAbsDHwEzAQ0AeQbLjaXJBx8EbQfTAhAbFeEC7y4HtQEDIt8TzULFAr3eVaFgAmSBAmJCW02vWzcgAqH3AmiYAmYJAp+EOBsLAmY7AmYmBG4EfwN/EwN+kjkGOXcXOYI6IyMCbB0CMjY4CgJtxwJtru+KM2dFKwFnAN4A4QBKBQeYDI0A/gvCAA21AncvAnaiPwJ5S0MCeLodXNtFrkbXAnw/AnrIAn0JAnzwBVkFIEgASH1jJAKBbQKAAAKABQJ/rklYSlsVF0rMAtEBAtDMSycDiE8Dh+ZExZEyAvKhXQMDA65LzkwtJQPPTUxNrwKLPwKK2MEbBx1DZwW3Ao43Ao5cQJeBAo7ZAo5ceFG0UzUKUtRUhQKT+wKTDADpABxVHlWvVdAGLBsplYYy4XhmRTs5ApefAu+yWCGoAFklApaPApZ8nACpWaxaCYFNADsClrUClk5cRFzRApnLAplkXMpdBxkCnJs5wjqdApwWAp+bAp64igAdDzEqDwKd8QKekgC1PWE0Ye8CntMCoG4BqQKenx8Cnk6lY8hkJyUrAievAiZ+AqD7AqBMAqLdAqHEAqYvAqXOAqf/AH0Cp/JofGixAANJahxq0QKs4wKsrgKtZwKtAgJXHQJV3AKx4dcDH05slwKyvQ0CsugXbOBtY21IXwMlzQK2XDs/bpADKUUCuF4CuUcVArkqd3A2cOECvRkCu9pwlgMyEQK+iHICAzNxAr4acyJzTwLDywLDBHOCdEs1RXTgAzynAzyaAz2/AsV8AsZHAsYQiQLIaVECyEQCyU8CyS4CZJ0C3dJ4eWF4rnklS9ADGKNnAgJh9BnzlSR7C16SXrsRAs9rAs9sL0tT0vMTnwDGrQLPcwEp6gNOEn5LBQLcJwLbigLSTwNSXANTXwEBA1WMgIk/AMsW7WBFghyC04LOg40C2scC2d6EEIRJpzwDhqUALwNkDoZxWfkAVQLfZQLeuHN3AuIv7RQB8zAnAfSbAfLShwLr8wLpcHkC6vkC6uQA+UcBuQLuiQLrnJaqlwMC7j8DheCYeXDgcaEC8wMAaQOOFpmTAvcTA5FuA5KHAveYAvnZAvhmmhyaq7s3mx4DnYMC/voBGwA5nxyfswMFjQOmagOm2QDRxQMGaqGIogUJAwxJAtQAPwMA4UEXUwER8wNrB5dnBQCTLSu3r73bAYmZFH8RBDkB+ykFIQ6dCZ8Akv0TtRQrxQL3LScApQC3BbmOkRc/xqdtQS4UJo0uAUMBgPwBtSYAdQMOBG0ALAIWDKEAAAoCPQJqA90DfgSRASBFBSF8CgAFAEQAEwA2EgJ3AQAF1QNr7wrFAgD3Cp8nv7G35QGRIUFCAekUfxE0wIkABAAbAFoCRQKEiwAGOlM6lI1tALg6jzrQAI04wTrcAKUA6ADLATqBOjs5/Dn5O3aJOls7nok6bzkYAVYBMwFsBS81XTWeNa01ZjV1NbY1xTWCNZE10jXhNZ41rTXuNf01sjXBNgI2ETXGNdU2FjYnNd417TYuNj02LjUtITY6Nj02PDbJNwgEkDxXNjg23TcgNw82yiA3iTcwCgSwPGc2JDcZN2w6jTchQtRDB0LgQwscDw8JmyhtKFFVBgDpfwDpsAD+mxQ91wLpNSMArQC9BbeOkRdLxptzBL8MDAMMAQgDAAkKCwsLCQoGBAVVBI/DvwDz9b29kaUCb0QtsRTNLt4eGBcSHAMZFhYZEhYEARAEBUEcQRxBHEEcQRxBHEEaQRxBHEFCSTxBPElISUhBNkM2QTYbNklISVmBVIgELgEaJZkC7aMAoQCjBcGOmxdNxrsBvwGJAaQcEZ0ePCklMAAhMvAIMAL54gC7Bm8EescjzQMpARQpKgDUHqSvAj5Gqwr7YrMUACT9AN3rpF27H7fsd/twPt4l+UW1yQYKBt2Cgy7qJpGiLcdE2P1cQSImUbqJ6ICH27H4knQMIRMrFkHu3sx6tC35Y+eLIh4e4CMKJ4DfyV+8mfta499RCAJ0xfeZR8PsoYOApva9pjGn4PhvyZS7/h5JLuhaucfjuU+Z584wwqNO4hWYmaBCcjgQPale1bjoHzMUbut/zTgxHxBnAyrdKpF4IRMASLBtD/jviyLeCgj8twWjAd3HchN/uqaeRYeHJgl7JEY9/cTrvtfybx/r3Y/NtxJ9dp+MTVmiS9bwBH73s8Di56/Ma+mTPMHq4T1yEG1fWcqr0u+hrGnJEvU1JJAm/maQSrKrazIyvSkDFkj8UUlfBq8baniTGPng6YZRL661rDNw4w/1g2figG0IhXnL7wosd/sVNo5dYSmMBTP5c7rYLjRdCwg8quwljOMPf63D8ICAL0r71XRiyFHdgwHbwfgnPOf4Lzjf2v+j+IiDHG2isp5yUnzSDyDRb4i/Vs0qHSHq8PiEQ/JnBP7PxnjN0j6gT4AVAeRx/1o9VnEUlUwvFrzJqHk9jxAw4sYxCnrxaeBdCFFKbnE7z+x54F5W7ZZsU6kx8Qocul6FoAHHy01FGL/nne61mn4+uYXfQ1Uccn+HMLKE+cZzT8BB1E3FRskOgJrRsq25rauLm8+uamXpkS/bTy6y1wDbCrW4eD532kTWrtNUmVVZOIn/C+/JR9KVR5iG9TY8iaT67ubm/whL1xbKZoqtY+a6fNxMJrg211bGYJDUkYMNWA0BMB++9zOm6Eik4roqs9CCEFW0lyAK0PbvlzvoxrZuY/OEhNW/l/63U15Od/RSvmDvXpGLiVmeGi5PDSH2bYz5o2g6wFDQ2FbZgYgTF8rPlvA1ifjZD3NLtFdXdpSIJvgKR7GpjJWG7GZGawPomIH8B5tUmtHH9LpM+/KQKunEPa1GiQkCXv4Cnm9DLORo2joicHdPDZ64obQrPZ5bgqckkj0G6/NEiPYBY4bCkL7W8G5YzsUb6GakFjykSPkT7JGeLeB6uJOGMm+x7N381BCDfbJFx0dtLgV9Q477BfL1fvitX5anV/oYfxeYl+eF5x5bB8+Ep/L2nsmd56aKF4aAD4GbJWsdKyBW22xEmAD3XdbtsMyAFoR5mOla0gEd9U/YVB7zvHGpHbQonay9Sv0bQ8iZ8piaXVrKc5AG1AmqqgaEvzHSP2Wux7aZTWh6quVDVU01JtMIVRdCFwlSbbqqhoFlyzsotQzRexFvZ/MqUSFu3OhRIuNBbufvBpdVgb8XdGJ48/lJPCZ7dsOujTTbKPSEvGXkOnG2Xdi8/nM3EMRqITd5QeU7iOjKqC7URJY6TnLsHij22xAHKnVRD5MDtBYnoGFqZGMDmXCW6Oj+BAWw14hESY/xLF6bLku06AHkiXTHPCFZ0f9YSqqo27eAhhS67OrA2Het4M9JM3jm/yRX6bYxnfmzYl5qQdHxN08FsNuWDrWd4vMUY2QD3hr8vS73SCTkFoXZR3xNzOQt8d/6HfjBmXqvrE6EGkLzK6YK2U2/ksU/iUH+LvVIsJI+ri2AL/klo+ShdDyfs5A83i2prkMs51IKR7ZcqjZJi5X3+bd8GlyWvtddxKEoEqSgEO7A8jIgf2nH0h8FjM7oB6yte3X5mpL0i/E4Rx0CotKnILJj/vJqo4VkPQ93jRtRVfaitQPqldl5xRYPq8387Z0DcnZvOeION0Ht1+P27kFLGQIcLBX4FG3sffccNHh5cPfzp9INoRtqVtdViJfg8RjnXiIz/MNqEN6zvzX3hMzyWC7oSoXIT14ubc0abPX8Rp9GVa5NI/8iv+6ela1oTncbdimRKnrbRffDR/X4nH+bgqAuHWl7hOaeXPWVzIeRl7ga+JzD4Sx3mlj/q6Ra/E2HhDf21eEzTLNGfCZsY+/yxZzQzIAuijG65ii4O/waAJCrEJaWd/DRAKMQ5678Dw5AT7RCKzdadIwd8LsD+DgPBASmWsUlf8R0k1w/2k4lO2Wpb4zMI6EJVJs0xk/wn8/fRUPqrDKhbjHR41SqgFMx5RGMPuduFwlu5lK89tW11sTqiX/5EfGs5nO+y9FKvgXKPOEmgE05EKNL6Sjb3xS40H3BVPhm0ESOZgAjZoymc8be0inDVo4JdJVf+NKd3tN/CaB7GShhH27qf95NoFZVX/6ZkR2lX+CgWrQ2INgkh+bbMz68+uJ3Clsh8HSMPEQtAt+BBE6fXDab7KIlsKxU1lIXW/KWVstpdPanJ0pdXpQinDyUQjtY7ZVcfiecRxRDMAUhHFU2cEaciQ+htiPMPx1kdvtWG9T44w3r037ljHBFJdYR0r55qvMRixtAEFJAqA4T1ES87FAx7UozXasytg8MftZYt0rjYgLe6EJ5aWvy2qscBSBQ7yehoJIA3wIIZ9ukfkyBb6qnue5ko8W50rpV4kXqWjI5nbGRXrNW0tBZHXlY48nSgcUXBHWT4GcgLZJoLlKJnV96kCYpq9eWHh7xJzkCAyrQuQ5AJ0qq/uZ3toJglNterev+Qm0KXxPg/+YbFRJdfhbp1wOnVOEYdVHTya6CtO0afhEaBhx3oHwCb5Kq6RwHDzFMl2vfjL8GwzcCoTj7wZe+UFnYDV2yKpPU9dba29gYBdNqJg/KXozO+CJTlKmlKhnqTf5doeS35DZFV+cYJQVjd+oVY/Gtc/6XPzUxb1gMqf6cEjNNoRC8AObrp+fx0cVtGu4ffC2TgXRC8zPl8moUHCB5HZ25d87mlsiiK0aNwBtcEQjRNBT/QrXbw/8aVXdKMHn9EqYEKEyxSGTpYQOaes1G1Qq8pDgqkZtlO2HRyCXpmeM7TSrRPkAh004BfisVpF6zP44n2Jvxz/gOVocNCyy9V6lkod28QM4pbaMvVJigD/w3BrsjSJrXlqc4ulBYOCceiBN4b/gHajYyupbhEt63a619Ay4wsL6a6w6B+A7TnoyE7BliWHJfzVxxIKM/W3M/J8Bx99Op863Q8eNuIMGRx++VbYfjm+VGYBA3Ap/KEu/wxBNBpJJncwHPG45V8Gh98ZIrGCc20MwijGowZbcS7d1nEgcOW5cddZpHL2XPAIRbColiheZzXTvBxZOY3iMSDSKDrICyJ/iQs1vdplVdH/JrLJsQ2jtTnfCrITIghq3KFX3qAgLWAIp8IffNSdTYptnbGfc8s+qcr3zyzyHp1aJg+jxTF4kD1ry5Wauv5V3xnOGwTFecNzXSLHBW20/pCQjk4uorD0plIhMSTc79+/r4RKPClRYTBYex1Ob5crtfvRQBBv6re/6FhtCqtduag67glqRA77/3ulblh9YRtMdDxkCyJDeNnAuCLPQFmdRRWJtH20Z8DstfJf+5oj5SSB64d0iF5/Ya4KfTWxfivj9Ap2/zbYaTo/1gO3tM6RYsCZharMBFr7Fm61mLSrQnEI4OF1gbVS4k/JE9UotOrnLJZuswoWodCSV8zbybkJSVIP7n8UaE9xCR39rJZmf27HOAPVOGc9pdkQUcRrI0qyVF9Z3j1RHDbxIfwbWzmPVjwIdPJvtmBYwEQIUsIW1S939hcVikK00ozPRI02cqhzVUNzpOxVdrwRPvlh1aIOf0xFEqD3YkGnCnFah/cFN3J2gB7N+bZSGawwkKFu1tpQMrp1W+27YNkyT0TpcFpTqgOqqLabrgcCUPxh97mREOGy4xItzQ9xSl6rq+8BZsHcrQFReS+QeMxJ3P6CnL9EP/eOLDjumLhvrcQrpPiknsofbzBv9gTP0lU+TIVwE6E7CcKfT36q+ZiEOHJ9ayf0dyUJLezAb2M8aNHwd0+OJmsVgTzRWA";const xa=44032,Go=4352,Ho=4449,zo=4519,Xm=19,qm=21,Ps=28,Vo=qm*Ps,_E=Xm*Vo,vE=xa+_E,bE=Go+Xm,wE=Ho+qm,AE=zo+Ps;function $s(i){return i>>24&255}function Km(i){return i&16777215}let xu,_d,_u,Mo;function SE(){let i=Gm(xE);xu=new Map(Hm(i).flatMap((t,e)=>t.map(n=>[n,e+1<<24]))),_d=new Set(ga(i)),_u=new Map,Mo=new Map;for(let[t,e]of zm(i)){if(!_d.has(t)&&e.length==2){let[n,r]=e,s=Mo.get(n);s||(s=new Map,Mo.set(n,s)),s.set(r,t)}_u.set(t,e.reverse())}}function Ym(i){return i>=xa&&i<vE}function EE(i,t){if(i>=Go&&i<bE&&t>=Ho&&t<wE)return xa+(i-Go)*Vo+(t-Ho)*Ps;if(Ym(i)&&t>zo&&t<AE&&(i-xa)%Ps==0)return i+(t-zo);{let e=Mo.get(i);return e&&(e=e.get(t),e)?e:-1}}function Jm(i){xu||SE();let t=[],e=[],n=!1;function r(s){let a=xu.get(s);a&&(n=!0,s|=a),t.push(s)}for(let s of i)for(;;){if(s<128)t.push(s);else if(Ym(s)){let a=s-xa,o=a/Vo|0,l=a%Vo/Ps|0,c=a%Ps;r(Go+o),r(Ho+l),c>0&&r(zo+c)}else{let a=_u.get(s);a?e.push(...a):r(s)}if(!e.length)break;s=e.pop()}if(n&&t.length>1){let s=$s(t[0]);for(let a=1;a<t.length;a++){let o=$s(t[a]);if(o==0||s<=o){s=o;continue}let l=a-1;for(;;){let c=t[l+1];if(t[l+1]=t[l],t[l]=c,!l||(s=$s(t[--l]),s<=o))break}s=$s(t[a])}}return t}function ME(i){let t=[],e=[],n=-1,r=0;for(let s of i){let a=$s(s),o=Km(s);if(n==-1)a==0?n=o:t.push(o);else if(r>0&&r>=a)a==0?(t.push(n,...e),e.length=0,n=o):e.push(o),r=a;else{let l=EE(n,o);l>=0?n=l:r==0&&a==0?(t.push(n),n=o):(e.push(o),r=a)}}return n>=0&&t.push(n,...e),t}function Qm(i){return Jm(i).map(Km)}function TE(i){return ME(Jm(i))}const vd=45,Zm=".",$m=65039,jm=1,Wo=i=>Array.from(i);function _a(i,t){return i.P.has(t)||i.Q.has(t)}class CE extends Array{get is_emoji(){return!0}}let vu,tg,Mr,bu,eg,bs,lc,hs,yr,bd,wu;function uf(){if(vu)return;let i=Gm(aE);const t=()=>ga(i),e=()=>new Set(t()),n=(u,h)=>h.forEach(f=>u.add(f));vu=new Map(zm(i)),tg=e(),Mr=t(),bu=new Set(t().map(u=>Mr[u])),Mr=new Set(Mr),eg=e(),e();let r=Hm(i),s=i();const a=()=>{let u=new Set;return t().forEach(h=>n(u,r[h])),n(u,t()),u};bs=ya(u=>{let h=ya(i).map(f=>f+96);if(h.length){let f=u>=s;h[0]-=32,h=Rs(h),f&&(h=`Restricted[${h}]`);let d=a(),g=a(),y=!i();return{N:h,P:d,Q:g,M:y,R:f}}}),lc=e(),hs=new Map;let o=t().concat(Wo(lc)).sort((u,h)=>u-h);o.forEach((u,h)=>{let f=i(),d=o[h]=f?o[h-f]:{V:[],M:new Map};d.V.push(u),lc.has(u)||hs.set(u,d)});for(let{V:u,M:h}of new Set(hs.values())){let f=[];for(let g of u){let y=bs.filter(p=>_a(p,g)),m=f.find(({G:p})=>y.some(b=>p.has(b)));m||(m={G:new Set,V:[]},f.push(m)),m.V.push(g),n(m.G,y)}let d=f.flatMap(g=>Wo(g.G));for(let{G:g,V:y}of f){let m=new Set(d.filter(p=>!g.has(p)));for(let p of y)h.set(p,m)}}yr=new Set;let l=new Set;const c=u=>yr.has(u)?l.add(u):yr.add(u);for(let u of bs){for(let h of u.P)c(h);for(let h of u.Q)c(h)}for(let u of yr)!hs.has(u)&&!l.has(u)&&hs.set(u,jm);n(yr,Qm(yr)),bd=pE(i).map(u=>CE.from(u)).sort(yE),wu=new Map;for(let u of bd){let h=[wu];for(let f of u){let d=h.map(g=>{let y=g.get(f);return y||(y=new Map,g.set(f,y)),y});f===$m?h.push(...d):h=d}for(let f of h)f.V=u}}function ff(i){return(ng(i)?"":`${hf(ol([i]))} `)+Wm(i)}function hf(i){return`"${i}"‎`}function RE(i){if(i.length>=4&&i[2]==vd&&i[3]==vd)throw new Error(`invalid label extension: "${Rs(i.slice(0,4))}"`)}function PE(i){for(let e=i.lastIndexOf(95);e>0;)if(i[--e]!==95)throw new Error("underscore allowed only at start")}function IE(i){let t=i[0],e=yd.get(t);if(e)throw ia(`leading ${e}`);let n=i.length,r=-1;for(let s=1;s<n;s++){t=i[s];let a=yd.get(t);if(a){if(r==s)throw ia(`${e} + ${a}`);r=s+1,e=a}}if(r==n)throw ia(`trailing ${e}`)}function ol(i,t=1/0,e=Wm){let n=[];NE(i[0])&&n.push("◌"),i.length>t&&(t>>=1,i=[...i.slice(0,t),8230,...i.slice(-t)]);let r=0,s=i.length;for(let a=0;a<s;a++){let o=i[a];ng(o)&&(n.push(Rs(i.slice(r,a))),n.push(e(o)),r=a+1)}return n.push(Rs(i.slice(r,s))),n.join("")}function NE(i,t){return uf(),Mr.has(i)}function ng(i){return uf(),eg.has(i)}function LE(i){return OE(UE(i,TE,GE))}function UE(i,t,e){if(!i)return[];uf();let n=0;return i.split(Zm).map(r=>{let s=gE(r),a={input:s,offset:n};n+=s.length+1;try{let o=a.tokens=kE(s,t,e),l=o.length,c;if(!l)throw new Error("empty label");let u=a.output=o.flat();if(PE(u),!(a.emoji=l>1||o[0].is_emoji)&&u.every(f=>f<128))RE(u),c="ASCII";else{let f=o.flatMap(d=>d.is_emoji?[]:d);if(!f.length)c="Emoji";else{if(Mr.has(u[0]))throw ia("leading combining mark");for(let y=1;y<l;y++){let m=o[y];if(!m.is_emoji&&Mr.has(m[0]))throw ia(`emoji + combining mark: "${Rs(o[y-1])} + ${ol([m[0]])}"`)}IE(u);let d=Wo(new Set(f)),[g]=FE(d);BE(g,f),DE(g,d),c=g.N}}a.type=c}catch(o){a.error=o}return a})}function DE(i,t){let e,n=[];for(let r of t){let s=hs.get(r);if(s===jm)return;if(s){let a=s.M.get(r);if(e=e?e.filter(o=>a.has(o)):Wo(a),!e.length)return}else n.push(r)}if(e){for(let r of e)if(n.every(s=>_a(r,s)))throw new Error(`whole-script confusable: ${i.N}/${r.N}`)}}function FE(i){let t=bs;for(let e of i){let n=t.filter(r=>_a(r,e));if(!n.length)throw bs.some(r=>_a(r,e))?rg(t[0],e):ig(e);if(t=n,n.length==1)break}return t}function OE(i){return i.map(({input:t,error:e,output:n})=>{if(e){let r=e.message;throw new Error(i.length==1?r:`Invalid label ${hf(ol(t,63))}: ${r}`)}return Rs(n)}).join(Zm)}function ig(i){return new Error(`disallowed character: ${ff(i)}`)}function rg(i,t){let e=ff(t),n=bs.find(r=>r.P.has(t));return n&&(e=`${n.N} ${e}`),new Error(`illegal mixture: ${i.N} + ${e}`)}function ia(i){return new Error(`illegal placement: ${i}`)}function BE(i,t){for(let e of t)if(!_a(i,e))throw rg(i,e);if(i.M){let e=Qm(t);for(let n=1,r=e.length;n<r;n++)if(bu.has(e[n])){let s=n+1;for(let a;s<r&&bu.has(a=e[s]);s++)for(let o=n;o<s;o++)if(e[o]==a)throw new Error(`duplicate non-spacing marks: ${ff(a)}`);if(s-n>xd)throw new Error(`excessive non-spacing marks: ${hf(ol(e.slice(n-1,s)))} (${s-n}/${xd})`);n=s}}}function kE(i,t,e){let n=[],r=[];for(i=i.slice().reverse();i.length;){let s=HE(i);if(s)r.length&&(n.push(t(r)),r=[]),n.push(e(s));else{let a=i.pop();if(yr.has(a))r.push(a);else{let o=vu.get(a);if(o)r.push(...o);else if(!tg.has(a))throw ig(a)}}}return r.length&&n.push(t(r)),n}function GE(i){return i.filter(t=>t!=$m)}function HE(i,t){let e=wu,n,r=i.length;for(;r&&(e=e.get(i[--r]),!!e);){let{V:s}=e;s&&(n=s,i.length=r)}return n}const sg=new Uint8Array(32);sg.fill(0);function wd(i){return F(i.length!==0,"invalid ENS name; empty component","comp",i),i}function df(i){const t=Qn(ag(i)),e=[];if(i.length===0)return e;let n=0;for(let r=0;r<t.length;r++)t[r]===46&&(e.push(wd(t.slice(n,r))),n=r+1);return F(n<t.length,"invalid ENS name; empty component","name",i),e.push(wd(t.slice(n))),e}function ag(i){try{if(i.length===0)throw new Error("empty label");return LE(i)}catch(t){F(!1,`invalid ENS name (${t.message})`,"name",i)}}function Ad(i){try{return df(i).length!==0}catch{}return!1}function Sd(i){F(typeof i=="string","invalid ENS name; not a string","name",i),F(i.length,"invalid ENS name (empty label)","name",i);let t=sg;const e=df(i);for(;e.length;)t=Fe(Me([t,Fe(e.pop())]));return xt(t)}function Ed(i,t){const e=t;return F(e<=255,"DNS encoded label cannot exceed 255","length",e),xt(Me(df(i).map(n=>{F(n.length<=e,`label ${JSON.stringify(i)} exceeds ${e} bytes`,"name",i);const r=new Uint8Array(n.length+1);return r.set(n,1),r[0]=r.length-1,r})))+"00"}const og=new Uint8Array(32);og.fill(0);const zE=BigInt(-1),lg=BigInt(0),cg=BigInt(1),VE=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");function WE(i){const t=Jt(i),e=t.length%32;return e?Me([t,og.slice(e)]):xt(t)}const XE=ar(cg,32),qE=ar(lg,32),Md={name:"string",version:"string",chainId:"uint256",verifyingContract:"address",salt:"bytes32"},cc=["name","version","chainId","verifyingContract","salt"];function Td(i){return function(t){return F(typeof t=="string",`invalid domain value for ${JSON.stringify(i)}`,`domain.${i}`,t),t}}const KE={name:Td("name"),version:Td("version"),chainId:function(i){const t=bt(i,"domain.chainId");return F(t>=0,"invalid chain ID","domain.chainId",i),Number.isSafeInteger(t)?Number(t):Wn(t)},verifyingContract:function(i){try{return ue(i).toLowerCase()}catch{}F(!1,'invalid domain value "verifyingContract"',"domain.verifyingContract",i)},salt:function(i){const t=Jt(i,"domain.salt");return F(t.length===32,'invalid domain value "salt"',"domain.salt",i),xt(t)}};function uc(i){{const t=i.match(/^(u?)int(\d+)$/);if(t){const e=t[1]==="",n=parseInt(t[2]);F(n%8===0&&n!==0&&n<=256&&t[2]===String(n),"invalid numeric width","type",i);const r=Sr(VE,e?n-1:n),s=e?(r+cg)*zE:lg;return function(a){const o=bt(a,"value");return F(o>=s&&o<=r,`value out-of-bounds for ${i}`,"value",o),ar(e?Qp(o,256):o,32)}}}{const t=i.match(/^bytes(\d+)$/);if(t){const e=parseInt(t[1]);return F(e!==0&&e<=32&&t[1]===String(e),"invalid bytes width","type",i),function(n){const r=Jt(n);return F(r.length===e,`invalid length for ${i}`,"value",n),WE(n)}}}switch(i){case"address":return function(t){return Ui(ue(t),32)};case"bool":return function(t){return t?XE:qE};case"bytes":return function(t){return Fe(t)};case"string":return function(t){return Or(t)}}return null}function Cd(i,t){return`${i}(${t.map(({name:e,type:n})=>n+" "+e).join(",")})`}function ho(i){const t=i.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);return t?{base:t[1],index:t[2]+t[4],array:{base:t[1],prefix:t[1]+t[2],count:t[5]?parseInt(t[5]):-1}}:{base:i}}class wn{primaryType;#t;get types(){return JSON.parse(this.#t)}#e;#n;constructor(t){this.#e=new Map,this.#n=new Map;const e=new Map,n=new Map,r=new Map,s={};Object.keys(t).forEach(l=>{s[l]=t[l].map(({name:c,type:u})=>{let{base:h,index:f}=ho(u);return h==="int"&&!t.int&&(h="int256"),h==="uint"&&!t.uint&&(h="uint256"),{name:c,type:h+(f||"")}}),e.set(l,new Set),n.set(l,[]),r.set(l,new Set)}),this.#t=JSON.stringify(s);for(const l in s){const c=new Set;for(const u of s[l]){F(!c.has(u.name),`duplicate variable name ${JSON.stringify(u.name)} in ${JSON.stringify(l)}`,"types",t),c.add(u.name);const h=ho(u.type).base;F(h!==l,`circular type reference to ${JSON.stringify(h)}`,"types",t),!uc(h)&&(F(n.has(h),`unknown type ${JSON.stringify(h)}`,"types",t),n.get(h).push(l),e.get(l).add(h))}}const a=Array.from(n.keys()).filter(l=>n.get(l).length===0);F(a.length!==0,"missing primary type","types",t),F(a.length===1,`ambiguous primary types or unused types: ${a.map(l=>JSON.stringify(l)).join(", ")}`,"types",t),Dt(this,{primaryType:a[0]});function o(l,c){F(!c.has(l),`circular type reference to ${JSON.stringify(l)}`,"types",t),c.add(l);for(const u of e.get(l))if(n.has(u)){o(u,c);for(const h of c)r.get(h).add(u)}c.delete(l)}o(this.primaryType,new Set);for(const[l,c]of r){const u=Array.from(c);u.sort(),this.#e.set(l,Cd(l,s[l])+u.map(h=>Cd(h,s[h])).join(""))}}getEncoder(t){let e=this.#n.get(t);return e||(e=this.#i(t),this.#n.set(t,e)),e}#i(t){{const r=uc(t);if(r)return r}const e=ho(t).array;if(e){const r=e.prefix,s=this.getEncoder(r);return a=>{F(e.count===-1||e.count===a.length,`array length mismatch; expected length ${e.count}`,"value",a);let o=a.map(s);return this.#e.has(r)&&(o=o.map(Fe)),Fe(Me(o))}}const n=this.types[t];if(n){const r=Or(this.#e.get(t));return s=>{const a=n.map(({name:o,type:l})=>{const c=this.getEncoder(l)(s[o]);return this.#e.has(l)?Fe(c):c});return a.unshift(r),Me(a)}}F(!1,`unknown type: ${t}`,"type",t)}encodeType(t){const e=this.#e.get(t);return F(e,`unknown type: ${JSON.stringify(t)}`,"name",t),e}encodeData(t,e){return this.getEncoder(t)(e)}hashStruct(t,e){return Fe(this.encodeData(t,e))}encode(t){return this.encodeData(this.primaryType,t)}hash(t){return this.hashStruct(this.primaryType,t)}_visit(t,e,n){if(uc(t))return n(t,e);const r=ho(t).array;if(r)return F(r.count===-1||r.count===e.length,`array length mismatch; expected length ${r.count}`,"value",e),e.map(a=>this._visit(r.prefix,a,n));const s=this.types[t];if(s)return s.reduce((a,{name:o,type:l})=>(a[o]=this._visit(l,e[o],n),a),{});F(!1,`unknown type: ${t}`,"type",t)}visit(t,e){return this._visit(this.primaryType,t,e)}static from(t){return new wn(t)}static getPrimaryType(t){return wn.from(t).primaryType}static hashStruct(t,e,n){return wn.from(e).hashStruct(t,n)}static hashDomain(t){const e=[];for(const n in t){if(t[n]==null)continue;const r=Md[n];F(r,`invalid typed-data domain key: ${JSON.stringify(n)}`,"domain",t),e.push({name:n,type:r})}return e.sort((n,r)=>cc.indexOf(n.name)-cc.indexOf(r.name)),wn.hashStruct("EIP712Domain",{EIP712Domain:e},t)}static encode(t,e,n){return Me(["0x1901",wn.hashDomain(t),wn.from(e).hash(n)])}static hash(t,e,n){return Fe(wn.encode(t,e,n))}static async resolveNames(t,e,n,r){t=Object.assign({},t);for(const o in t)t[o]==null&&delete t[o];const s={};t.verifyingContract&&!_e(t.verifyingContract,20)&&(s[t.verifyingContract]="0x");const a=wn.from(e);a.visit(n,(o,l)=>(o==="address"&&!_e(l,20)&&(s[l]="0x"),l));for(const o in s)s[o]=await r(o);return t.verifyingContract&&s[t.verifyingContract]&&(t.verifyingContract=s[t.verifyingContract]),n=a.visit(n,(o,l)=>o==="address"&&s[l]?s[l]:l),{domain:t,value:n}}static getPayload(t,e,n){wn.hashDomain(t);const r={},s=[];cc.forEach(l=>{const c=t[l];c!=null&&(r[l]=KE[l](c),s.push({name:l,type:Md[l]}))});const a=wn.from(e);e=a.types;const o=Object.assign({},e);return F(o.EIP712Domain==null,"types must not contain EIP712Domain type","types.EIP712Domain",e),o.EIP712Domain=s,a.encode(n),{types:o,domain:r,primaryType:a.primaryType,message:a.visit(n,(l,c)=>{if(l.match(/^bytes(\d*)/))return xt(Jt(c));if(l.match(/^u?int/))return bt(c).toString();switch(l){case"address":return c.toLowerCase();case"bool":return!!c;case"string":return F(typeof c=="string","invalid string","value",c),c}F(!1,"unsupported type","type",l)})}}}function hn(i){const t=new Set;return i.forEach(e=>t.add(e)),Object.freeze(t)}const YE="external public payable override",JE=hn(YE.split(" ")),ug="constant external internal payable private public pure view override",QE=hn(ug.split(" ")),fg="constructor error event fallback function receive struct",hg=hn(fg.split(" ")),dg="calldata memory storage payable indexed",ZE=hn(dg.split(" ")),$E="tuple returns",jE=[fg,dg,$E,ug].join(" "),tM=hn(jE.split(" ")),eM={"(":"OPEN_PAREN",")":"CLOSE_PAREN","[":"OPEN_BRACKET","]":"CLOSE_BRACKET",",":"COMMA","@":"AT"},nM=new RegExp("^(\\s*)"),iM=new RegExp("^([0-9]+)"),rM=new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"),pg=new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"),mg=new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");class Un{#t;#e;get offset(){return this.#t}get length(){return this.#e.length-this.#t}constructor(t){this.#t=0,this.#e=t.slice()}clone(){return new Un(this.#e)}reset(){this.#t=0}#n(t=0,e=0){return new Un(this.#e.slice(t,e).map(n=>Object.freeze(Object.assign({},n,{match:n.match-t,linkBack:n.linkBack-t,linkNext:n.linkNext-t}))))}popKeyword(t){const e=this.peek();if(e.type!=="KEYWORD"||!t.has(e.text))throw new Error(`expected keyword ${e.text}`);return this.pop().text}popType(t){if(this.peek().type!==t){const e=this.peek();throw new Error(`expected ${t}; got ${e.type} ${JSON.stringify(e.text)}`)}return this.pop().text}popParen(){const t=this.peek();if(t.type!=="OPEN_PAREN")throw new Error("bad start");const e=this.#n(this.#t+1,t.match+1);return this.#t=t.match+1,e}popParams(){const t=this.peek();if(t.type!=="OPEN_PAREN")throw new Error("bad start");const e=[];for(;this.#t<t.match-1;){const n=this.peek().linkNext;e.push(this.#n(this.#t+1,n)),this.#t=n}return this.#t=t.match+1,e}peek(){if(this.#t>=this.#e.length)throw new Error("out-of-bounds");return this.#e[this.#t]}peekKeyword(t){const e=this.peekType("KEYWORD");return e!=null&&t.has(e)?e:null}peekType(t){if(this.length===0)return null;const e=this.peek();return e.type===t?e.text:null}pop(){const t=this.peek();return this.#t++,t}toString(){const t=[];for(let e=this.#t;e<this.#e.length;e++){const n=this.#e[e];t.push(`${n.type}:${n.text}`)}return`<TokenString ${t.join(" ")}>`}}function or(i){const t=[],e=a=>{const o=s<i.length?JSON.stringify(i[s]):"$EOI";throw new Error(`invalid token ${o} at ${s}: ${a}`)};let n=[],r=[],s=0;for(;s<i.length;){let a=i.substring(s),o=a.match(nM);o&&(s+=o[1].length,a=i.substring(s));const l={depth:n.length,linkBack:-1,linkNext:-1,match:-1,type:"",text:"",offset:s,value:-1};t.push(l);let c=eM[a[0]]||"";if(c){if(l.type=c,l.text=a[0],s++,c==="OPEN_PAREN")n.push(t.length-1),r.push(t.length-1);else if(c=="CLOSE_PAREN")n.length===0&&e("no matching open bracket"),l.match=n.pop(),t[l.match].match=t.length-1,l.depth--,l.linkBack=r.pop(),t[l.linkBack].linkNext=t.length-1;else if(c==="COMMA")l.linkBack=r.pop(),t[l.linkBack].linkNext=t.length-1,r.push(t.length-1);else if(c==="OPEN_BRACKET")l.type="BRACKET";else if(c==="CLOSE_BRACKET"){let u=t.pop().text;if(t.length>0&&t[t.length-1].type==="NUMBER"){const h=t.pop().text;u=h+u,t[t.length-1].value=Vt(h)}if(t.length===0||t[t.length-1].type!=="BRACKET")throw new Error("missing opening bracket");t[t.length-1].text+=u}continue}if(o=a.match(rM),o){if(l.text=o[1],s+=l.text.length,tM.has(l.text)){l.type="KEYWORD";continue}if(l.text.match(mg)){l.type="TYPE";continue}l.type="ID";continue}if(o=a.match(iM),o){l.text=o[1],l.type="NUMBER",s+=l.text.length;continue}throw new Error(`unexpected token ${JSON.stringify(a[0])} at position ${s}`)}return new Un(t.map(a=>Object.freeze(a)))}function Rd(i,t){let e=[];for(const n in t.keys())i.has(n)&&e.push(n);if(e.length>1)throw new Error(`conflicting types: ${e.join(", ")}`)}function ll(i,t){if(t.peekKeyword(hg)){const e=t.pop().text;if(e!==i)throw new Error(`expected ${i}, got ${e}`)}return t.popType("ID")}function Fi(i,t){const e=new Set;for(;;){const n=i.peekType("KEYWORD");if(n==null||t&&!t.has(n))break;if(i.pop(),e.has(n))throw new Error(`duplicate keywords: ${JSON.stringify(n)}`);e.add(n)}return Object.freeze(e)}function gg(i){let t=Fi(i,QE);return Rd(t,hn("constant payable nonpayable".split(" "))),Rd(t,hn("pure view payable nonpayable".split(" "))),t.has("view")?"view":t.has("pure")?"pure":t.has("payable")?"payable":t.has("nonpayable")?"nonpayable":t.has("constant")?"view":"nonpayable"}function Pi(i,t){return i.popParams().map(e=>we.from(e,t))}function yg(i){if(i.peekType("AT")){if(i.pop(),i.peekType("NUMBER"))return bt(i.pop().text);throw new Error("invalid gas")}return null}function Br(i){if(i.length)throw new Error(`unexpected tokens at offset ${i.offset}: ${i.toString()}`)}const sM=new RegExp(/^(.*)\[([0-9]*)\]$/);function Pd(i){const t=i.match(mg);if(F(t,"invalid type","type",i),i==="uint")return"uint256";if(i==="int")return"int256";if(t[2]){const e=parseInt(t[2]);F(e!==0&&e<=32,"invalid bytes length","type",i)}else if(t[3]){const e=parseInt(t[3]);F(e!==0&&e<=256&&e%8===0,"invalid numeric width","type",i)}return i}const Re={},_n=Symbol.for("_ethers_internal"),Id="_ParamTypeInternal",Nd="_ErrorInternal",Ld="_EventInternal",Ud="_ConstructorInternal",Dd="_FallbackInternal",Fd="_FunctionInternal",Od="_StructInternal";class we{name;type;baseType;indexed;components;arrayLength;arrayChildren;constructor(t,e,n,r,s,a,o,l){if(Ta(t,Re,"ParamType"),Object.defineProperty(this,_n,{value:Id}),a&&(a=Object.freeze(a.slice())),r==="array"){if(o==null||l==null)throw new Error("")}else if(o!=null||l!=null)throw new Error("");if(r==="tuple"){if(a==null)throw new Error("")}else if(a!=null)throw new Error("");Dt(this,{name:e,type:n,baseType:r,indexed:s,components:a,arrayLength:o,arrayChildren:l})}format(t){if(t==null&&(t="sighash"),t==="json"){const n=this.name||"";if(this.isArray()){const s=JSON.parse(this.arrayChildren.format("json"));return s.name=n,s.type+=`[${this.arrayLength<0?"":String(this.arrayLength)}]`,JSON.stringify(s)}const r={type:this.baseType==="tuple"?"tuple":this.type,name:n};return typeof this.indexed=="boolean"&&(r.indexed=this.indexed),this.isTuple()&&(r.components=this.components.map(s=>JSON.parse(s.format(t)))),JSON.stringify(r)}let e="";return this.isArray()?(e+=this.arrayChildren.format(t),e+=`[${this.arrayLength<0?"":String(this.arrayLength)}]`):this.isTuple()?e+="("+this.components.map(n=>n.format(t)).join(t==="full"?", ":",")+")":e+=this.type,t!=="sighash"&&(this.indexed===!0&&(e+=" indexed"),t==="full"&&this.name&&(e+=" "+this.name)),e}isArray(){return this.baseType==="array"}isTuple(){return this.baseType==="tuple"}isIndexable(){return this.indexed!=null}walk(t,e){if(this.isArray()){if(!Array.isArray(t))throw new Error("invalid array value");if(this.arrayLength!==-1&&t.length!==this.arrayLength)throw new Error("array is wrong length");const n=this;return t.map(r=>n.arrayChildren.walk(r,e))}if(this.isTuple()){if(!Array.isArray(t))throw new Error("invalid tuple value");if(t.length!==this.components.length)throw new Error("array is wrong length");const n=this;return t.map((r,s)=>n.components[s].walk(r,e))}return e(this.type,t)}#t(t,e,n,r){if(this.isArray()){if(!Array.isArray(e))throw new Error("invalid array value");if(this.arrayLength!==-1&&e.length!==this.arrayLength)throw new Error("array is wrong length");const a=this.arrayChildren,o=e.slice();o.forEach((l,c)=>{a.#t(t,l,n,u=>{o[c]=u})}),r(o);return}if(this.isTuple()){const a=this.components;let o;if(Array.isArray(e))o=e.slice();else{if(e==null||typeof e!="object")throw new Error("invalid tuple value");o=a.map(l=>{if(!l.name)throw new Error("cannot use object value with unnamed components");if(!(l.name in e))throw new Error(`missing value for component ${l.name}`);return e[l.name]})}if(o.length!==this.components.length)throw new Error("array is wrong length");o.forEach((l,c)=>{a[c].#t(t,l,n,u=>{o[c]=u})}),r(o);return}const s=n(this.type,e);s.then?t.push((async function(){r(await s)})()):r(s)}async walkAsync(t,e){const n=[],r=[t];return this.#t(n,t,e,s=>{r[0]=s}),n.length&&await Promise.all(n),r[0]}static from(t,e){if(we.isParamType(t))return t;if(typeof t=="string")try{return we.from(or(t),e)}catch{F(!1,"invalid param type","obj",t)}else if(t instanceof Un){let o="",l="",c=null;Fi(t,hn(["tuple"])).has("tuple")||t.peekType("OPEN_PAREN")?(l="tuple",c=t.popParams().map(y=>we.from(y)),o=`tuple(${c.map(y=>y.format()).join(",")})`):(o=Pd(t.popType("TYPE")),l=o);let u=null,h=null;for(;t.length&&t.peekType("BRACKET");){const y=t.pop();u=new we(Re,"",o,l,null,c,h,u),h=y.value,o+=y.text,l="array",c=null}let f=null;if(Fi(t,ZE).has("indexed")){if(!e)throw new Error("");f=!0}const g=t.peekType("ID")?t.pop().text:"";if(t.length)throw new Error("leftover tokens");return new we(Re,g,o,l,f,c,h,u)}const n=t.name;F(!n||typeof n=="string"&&n.match(pg),"invalid name","obj.name",n);let r=t.indexed;r!=null&&(F(e,"parameter cannot be indexed","obj.indexed",t.indexed),r=!!r);let s=t.type,a=s.match(sM);if(a){const o=parseInt(a[2]||"-1"),l=we.from({type:a[1],components:t.components});return new we(Re,n||"",s,"array",r,null,o,l)}if(s==="tuple"||s.startsWith("tuple(")||s.startsWith("(")){const o=t.components!=null?t.components.map(c=>we.from(c)):null;return new we(Re,n||"",s,"tuple",r,o,null,null)}return s=Pd(t.type),new we(Re,n||"",s,s,r,null,null,null)}static isParamType(t){return t&&t[_n]===Id}}class kr{type;inputs;constructor(t,e,n){Ta(t,Re,"Fragment"),n=Object.freeze(n.slice()),Dt(this,{type:e,inputs:n})}static from(t){if(typeof t=="string"){try{kr.from(JSON.parse(t))}catch{}return kr.from(or(t))}if(t instanceof Un)switch(t.peekKeyword(hg)){case"constructor":return Mi.from(t);case"error":return gn.from(t);case"event":return ai.from(t);case"fallback":case"receive":return vi.from(t);case"function":return oi.from(t);case"struct":return Ir.from(t)}else if(typeof t=="object"){switch(t.type){case"constructor":return Mi.from(t);case"error":return gn.from(t);case"event":return ai.from(t);case"fallback":case"receive":return vi.from(t);case"function":return oi.from(t);case"struct":return Ir.from(t)}it(!1,`unsupported type: ${t.type}`,"UNSUPPORTED_OPERATION",{operation:"Fragment.from"})}F(!1,"unsupported frgament object","obj",t)}static isConstructor(t){return Mi.isFragment(t)}static isError(t){return gn.isFragment(t)}static isEvent(t){return ai.isFragment(t)}static isFunction(t){return oi.isFragment(t)}static isStruct(t){return Ir.isFragment(t)}}class cl extends kr{name;constructor(t,e,n,r){super(t,e,r),F(typeof n=="string"&&n.match(pg),"invalid identifier","name",n),r=Object.freeze(r.slice()),Dt(this,{name:n})}}function va(i,t){return"("+t.map(e=>e.format(i)).join(i==="full"?", ":",")+")"}class gn extends cl{constructor(t,e,n){super(t,"error",e,n),Object.defineProperty(this,_n,{value:Nd})}get selector(){return Or(this.format("sighash")).substring(0,10)}format(t){if(t==null&&(t="sighash"),t==="json")return JSON.stringify({type:"error",name:this.name,inputs:this.inputs.map(n=>JSON.parse(n.format(t)))});const e=[];return t!=="sighash"&&e.push("error"),e.push(this.name+va(t,this.inputs)),e.join(" ")}static from(t){if(gn.isFragment(t))return t;if(typeof t=="string")return gn.from(or(t));if(t instanceof Un){const e=ll("error",t),n=Pi(t);return Br(t),new gn(Re,e,n)}return new gn(Re,t.name,t.inputs?t.inputs.map(we.from):[])}static isFragment(t){return t&&t[_n]===Nd}}class ai extends cl{anonymous;constructor(t,e,n,r){super(t,"event",e,n),Object.defineProperty(this,_n,{value:Ld}),Dt(this,{anonymous:r})}get topicHash(){return Or(this.format("sighash"))}format(t){if(t==null&&(t="sighash"),t==="json")return JSON.stringify({type:"event",anonymous:this.anonymous,name:this.name,inputs:this.inputs.map(n=>JSON.parse(n.format(t)))});const e=[];return t!=="sighash"&&e.push("event"),e.push(this.name+va(t,this.inputs)),t!=="sighash"&&this.anonymous&&e.push("anonymous"),e.join(" ")}static getTopicHash(t,e){return e=(e||[]).map(r=>we.from(r)),new ai(Re,t,e,!1).topicHash}static from(t){if(ai.isFragment(t))return t;if(typeof t=="string")try{return ai.from(or(t))}catch{F(!1,"invalid event fragment","obj",t)}else if(t instanceof Un){const e=ll("event",t),n=Pi(t,!0),r=!!Fi(t,hn(["anonymous"])).has("anonymous");return Br(t),new ai(Re,e,n,r)}return new ai(Re,t.name,t.inputs?t.inputs.map(e=>we.from(e,!0)):[],!!t.anonymous)}static isFragment(t){return t&&t[_n]===Ld}}class Mi extends kr{payable;gas;constructor(t,e,n,r,s){super(t,e,n),Object.defineProperty(this,_n,{value:Ud}),Dt(this,{payable:r,gas:s})}format(t){if(it(t!=null&&t!=="sighash","cannot format a constructor for sighash","UNSUPPORTED_OPERATION",{operation:"format(sighash)"}),t==="json")return JSON.stringify({type:"constructor",stateMutability:this.payable?"payable":"undefined",payable:this.payable,gas:this.gas!=null?this.gas:void 0,inputs:this.inputs.map(n=>JSON.parse(n.format(t)))});const e=[`constructor${va(t,this.inputs)}`];return this.payable&&e.push("payable"),this.gas!=null&&e.push(`@${this.gas.toString()}`),e.join(" ")}static from(t){if(Mi.isFragment(t))return t;if(typeof t=="string")try{return Mi.from(or(t))}catch{F(!1,"invalid constuctor fragment","obj",t)}else if(t instanceof Un){Fi(t,hn(["constructor"]));const e=Pi(t),n=!!Fi(t,JE).has("payable"),r=yg(t);return Br(t),new Mi(Re,"constructor",e,n,r)}return new Mi(Re,"constructor",t.inputs?t.inputs.map(we.from):[],!!t.payable,t.gas!=null?t.gas:null)}static isFragment(t){return t&&t[_n]===Ud}}class vi extends kr{payable;constructor(t,e,n){super(t,"fallback",e),Object.defineProperty(this,_n,{value:Dd}),Dt(this,{payable:n})}format(t){const e=this.inputs.length===0?"receive":"fallback";if(t==="json"){const n=this.payable?"payable":"nonpayable";return JSON.stringify({type:e,stateMutability:n})}return`${e}()${this.payable?" payable":""}`}static from(t){if(vi.isFragment(t))return t;if(typeof t=="string")try{return vi.from(or(t))}catch{F(!1,"invalid fallback fragment","obj",t)}else if(t instanceof Un){const e=t.toString(),n=t.peekKeyword(hn(["fallback","receive"]));if(F(n,"type must be fallback or receive","obj",e),t.popKeyword(hn(["fallback","receive"]))==="receive"){const o=Pi(t);return F(o.length===0,"receive cannot have arguments","obj.inputs",o),Fi(t,hn(["payable"])),Br(t),new vi(Re,[],!0)}let s=Pi(t);s.length?F(s.length===1&&s[0].type==="bytes","invalid fallback inputs","obj.inputs",s.map(o=>o.format("minimal")).join(", ")):s=[we.from("bytes")];const a=gg(t);if(F(a==="nonpayable"||a==="payable","fallback cannot be constants","obj.stateMutability",a),Fi(t,hn(["returns"])).has("returns")){const o=Pi(t);F(o.length===1&&o[0].type==="bytes","invalid fallback outputs","obj.outputs",o.map(l=>l.format("minimal")).join(", "))}return Br(t),new vi(Re,s,a==="payable")}if(t.type==="receive")return new vi(Re,[],!0);if(t.type==="fallback"){const e=[we.from("bytes")],n=t.stateMutability==="payable";return new vi(Re,e,n)}F(!1,"invalid fallback description","obj",t)}static isFragment(t){return t&&t[_n]===Dd}}class oi extends cl{constant;outputs;stateMutability;payable;gas;constructor(t,e,n,r,s,a){super(t,"function",e,r),Object.defineProperty(this,_n,{value:Fd}),s=Object.freeze(s.slice()),Dt(this,{constant:n==="view"||n==="pure",gas:a,outputs:s,payable:n==="payable",stateMutability:n})}get selector(){return Or(this.format("sighash")).substring(0,10)}format(t){if(t==null&&(t="sighash"),t==="json")return JSON.stringify({type:"function",name:this.name,constant:this.constant,stateMutability:this.stateMutability!=="nonpayable"?this.stateMutability:void 0,payable:this.payable,gas:this.gas!=null?this.gas:void 0,inputs:this.inputs.map(n=>JSON.parse(n.format(t))),outputs:this.outputs.map(n=>JSON.parse(n.format(t)))});const e=[];return t!=="sighash"&&e.push("function"),e.push(this.name+va(t,this.inputs)),t!=="sighash"&&(this.stateMutability!=="nonpayable"&&e.push(this.stateMutability),this.outputs&&this.outputs.length&&(e.push("returns"),e.push(va(t,this.outputs))),this.gas!=null&&e.push(`@${this.gas.toString()}`)),e.join(" ")}static getSelector(t,e){return e=(e||[]).map(r=>we.from(r)),new oi(Re,t,"view",e,[],null).selector}static from(t){if(oi.isFragment(t))return t;if(typeof t=="string")try{return oi.from(or(t))}catch{F(!1,"invalid function fragment","obj",t)}else if(t instanceof Un){const n=ll("function",t),r=Pi(t),s=gg(t);let a=[];Fi(t,hn(["returns"])).has("returns")&&(a=Pi(t));const o=yg(t);return Br(t),new oi(Re,n,s,r,a,o)}let e=t.stateMutability;return e==null&&(e="payable",typeof t.constant=="boolean"?(e="view",t.constant||(e="payable",typeof t.payable=="boolean"&&!t.payable&&(e="nonpayable"))):typeof t.payable=="boolean"&&!t.payable&&(e="nonpayable")),new oi(Re,t.name,e,t.inputs?t.inputs.map(we.from):[],t.outputs?t.outputs.map(we.from):[],t.gas!=null?t.gas:null)}static isFragment(t){return t&&t[_n]===Fd}}class Ir extends cl{constructor(t,e,n){super(t,"struct",e,n),Object.defineProperty(this,_n,{value:Od})}format(){throw new Error("@TODO")}static from(t){if(typeof t=="string")try{return Ir.from(or(t))}catch{F(!1,"invalid struct fragment","obj",t)}else if(t instanceof Un){const e=ll("struct",t),n=Pi(t);return Br(t),new Ir(Re,e,n)}return new Ir(Re,t.name,t.inputs?t.inputs.map(we.from):[])}static isFragment(t){return t&&t[_n]===Od}}const $n=new Map;$n.set(0,"GENERIC_PANIC");$n.set(1,"ASSERT_FALSE");$n.set(17,"OVERFLOW");$n.set(18,"DIVIDE_BY_ZERO");$n.set(33,"ENUM_RANGE_ERROR");$n.set(34,"BAD_STORAGE_DATA");$n.set(49,"STACK_UNDERFLOW");$n.set(50,"ARRAY_RANGE_ERROR");$n.set(65,"OUT_OF_MEMORY");$n.set(81,"UNINITIALIZED_FUNCTION_CALL");const aM=new RegExp(/^bytes([0-9]*)$/),oM=new RegExp(/^(u?int)([0-9]*)$/);let fc=null,Bd=1024;function lM(i,t,e,n){let r="missing revert data",s=null;const a=null;let o=null;if(e){r="execution reverted";const c=Jt(e);if(e=xt(e),c.length===0)r+=" (no data present; likely require(false) occurred",s="require(false)";else if(c.length%32!==4)r+=" (could not decode reason; invalid data length)";else if(xt(c.slice(0,4))==="0x08c379a0")try{s=n.decode(["string"],c.slice(4))[0],o={signature:"Error(string)",name:"Error",args:[s]},r+=`: ${JSON.stringify(s)}`}catch{r+=" (could not decode reason; invalid string data)"}else if(xt(c.slice(0,4))==="0x4e487b71")try{const u=Number(n.decode(["uint256"],c.slice(4))[0]);o={signature:"Panic(uint256)",name:"Panic",args:[u]},s=`Panic due to ${$n.get(u)||"UNKNOWN"}(${u})`,r+=`: ${s}`}catch{r+=" (could not decode panic code)"}else r+=" (unknown custom error)"}const l={to:t.to?ue(t.to):null,data:t.data||"0x"};return t.from&&(l.from=ue(t.from)),Ee(r,"CALL_EXCEPTION",{action:i,data:e,reason:s,transaction:l,invocation:a,revert:o})}class Is{#t(t){if(t.isArray())return new TS(this.#t(t.arrayChildren),t.arrayLength,t.name);if(t.isTuple())return new fo(t.components.map(n=>this.#t(n)),t.name);switch(t.baseType){case"address":return new ES(t.name);case"bool":return new CS(t.name);case"string":return new OS(t.name);case"bytes":return new RS(t.name);case"":return new NS(t.name)}let e=t.type.match(oM);if(e){let n=parseInt(e[2]||"256");return F(n!==0&&n<=256&&n%8===0,"invalid "+e[1]+" bit length","param",t),new FS(n/8,e[1]==="int",t.name)}if(e=t.type.match(aM),e){let n=parseInt(e[1]);return F(n!==0&&n<=32,"invalid bytes length","param",t),new PS(n,t.name)}F(!1,"invalid type","type",t.type)}getDefaultValue(t){const e=t.map(r=>this.#t(we.from(r)));return new fo(e,"_").defaultValue()}encode(t,e){Kp(e.length,t.length,"types/values length mismatch");const n=t.map(a=>this.#t(we.from(a))),r=new fo(n,"_"),s=new fu;return r.encode(s,e),s.data}decode(t,e,n){const r=t.map(a=>this.#t(we.from(a)));return new fo(r,"_").decode(new ju(e,n,Bd))}static _setDefaultMaxInflation(t){F(typeof t=="number"&&Number.isInteger(t),"invalid defaultMaxInflation factor","value",t),Bd=t}static defaultAbiCoder(){return fc==null&&(fc=new Is),fc}static getBuiltinCallException(t,e,n){return lM(t,e,n,Is.defaultAbiCoder())}}class cM{fragment;name;signature;topic;args;constructor(t,e,n){const r=t.name,s=t.format();Dt(this,{fragment:t,name:r,signature:s,topic:e,args:n})}}class uM{fragment;name;args;signature;selector;value;constructor(t,e,n,r){const s=t.name,a=t.format();Dt(this,{fragment:t,name:s,args:n,signature:a,selector:e,value:r})}}class fM{fragment;name;args;signature;selector;constructor(t,e,n){const r=t.name,s=t.format();Dt(this,{fragment:t,name:r,args:n,signature:s,selector:e})}}class kd{hash;_isIndexed;static isIndexed(t){return!!(t&&t._isIndexed)}constructor(t){Dt(this,{hash:t,_isIndexed:!0})}}const Gd={0:"generic panic",1:"assert(false)",17:"arithmetic overflow",18:"division or modulo by zero",33:"enum overflow",34:"invalid encoded storage byte array accessed",49:"out-of-bounds array access; popping on an empty array",50:"out-of-bounds access of an array or bytesN",65:"out of memory",81:"uninitialized function"},Hd={"0x08c379a0":{signature:"Error(string)",name:"Error",inputs:["string"],reason:i=>`reverted with reason string ${JSON.stringify(i)}`},"0x4e487b71":{signature:"Panic(uint256)",name:"Panic",inputs:["uint256"],reason:i=>{let t="unknown panic code";return i>=0&&i<=255&&Gd[i.toString()]&&(t=Gd[i.toString()]),`reverted with panic code 0x${i.toString(16)} (${t})`}}};class vr{fragments;deploy;fallback;receive;#t;#e;#n;#i;constructor(t){let e=[];typeof t=="string"?e=JSON.parse(t):e=t,this.#n=new Map,this.#t=new Map,this.#e=new Map;const n=[];for(const a of e)try{n.push(kr.from(a))}catch(o){console.log(`[Warning] Invalid Fragment ${JSON.stringify(a)}:`,o.message)}Dt(this,{fragments:Object.freeze(n)});let r=null,s=!1;this.#i=this.getAbiCoder(),this.fragments.forEach((a,o)=>{let l;switch(a.type){case"constructor":if(this.deploy){console.log("duplicate definition - constructor");return}Dt(this,{deploy:a});return;case"fallback":a.inputs.length===0?s=!0:(F(!r||a.payable!==r.payable,"conflicting fallback fragments",`fragments[${o}]`,a),r=a,s=r.payable);return;case"function":l=this.#n;break;case"event":l=this.#e;break;case"error":l=this.#t;break;default:return}const c=a.format();l.has(c)||l.set(c,a)}),this.deploy||Dt(this,{deploy:Mi.from("constructor()")}),Dt(this,{fallback:r,receive:s})}format(t){const e=t?"minimal":"full";return this.fragments.map(r=>r.format(e))}formatJson(){const t=this.fragments.map(e=>e.format("json"));return JSON.stringify(t.map(e=>JSON.parse(e)))}getAbiCoder(){return Is.defaultAbiCoder()}#r(t,e,n){if(_e(t)){const s=t.toLowerCase();for(const a of this.#n.values())if(s===a.selector)return a;return null}if(t.indexOf("(")===-1){const s=[];for(const[a,o]of this.#n)a.split("(")[0]===t&&s.push(o);if(e){const a=e.length>0?e[e.length-1]:null;let o=e.length,l=!0;Ne.isTyped(a)&&a.type==="overrides"&&(l=!1,o--);for(let c=s.length-1;c>=0;c--){const u=s[c].inputs.length;u!==o&&(!l||u!==o-1)&&s.splice(c,1)}for(let c=s.length-1;c>=0;c--){const u=s[c].inputs;for(let h=0;h<e.length;h++)if(Ne.isTyped(e[h])){if(h>=u.length){if(e[h].type==="overrides")continue;s.splice(c,1);break}if(e[h].type!==u[h].baseType){s.splice(c,1);break}}}}if(s.length===1&&e&&e.length!==s[0].inputs.length){const a=e[e.length-1];(a==null||Array.isArray(a)||typeof a!="object")&&s.splice(0,1)}if(s.length===0)return null;if(s.length>1&&n){const a=s.map(o=>JSON.stringify(o.format())).join(", ");F(!1,`ambiguous function description (i.e. matches ${a})`,"key",t)}return s[0]}const r=this.#n.get(oi.from(t).format());return r||null}getFunctionName(t){const e=this.#r(t,null,!1);return F(e,"no matching function","key",t),e.name}hasFunction(t){return!!this.#r(t,null,!1)}getFunction(t,e){return this.#r(t,e||null,!0)}forEachFunction(t){const e=Array.from(this.#n.keys());e.sort((n,r)=>n.localeCompare(r));for(let n=0;n<e.length;n++){const r=e[n];t(this.#n.get(r),n)}}#a(t,e,n){if(_e(t)){const s=t.toLowerCase();for(const a of this.#e.values())if(s===a.topicHash)return a;return null}if(t.indexOf("(")===-1){const s=[];for(const[a,o]of this.#e)a.split("(")[0]===t&&s.push(o);if(e){for(let a=s.length-1;a>=0;a--)s[a].inputs.length<e.length&&s.splice(a,1);for(let a=s.length-1;a>=0;a--){const o=s[a].inputs;for(let l=0;l<e.length;l++)if(Ne.isTyped(e[l])&&e[l].type!==o[l].baseType){s.splice(a,1);break}}}if(s.length===0)return null;if(s.length>1&&n){const a=s.map(o=>JSON.stringify(o.format())).join(", ");F(!1,`ambiguous event description (i.e. matches ${a})`,"key",t)}return s[0]}const r=this.#e.get(ai.from(t).format());return r||null}getEventName(t){const e=this.#a(t,null,!1);return F(e,"no matching event","key",t),e.name}hasEvent(t){return!!this.#a(t,null,!1)}getEvent(t,e){return this.#a(t,e||null,!0)}forEachEvent(t){const e=Array.from(this.#e.keys());e.sort((n,r)=>n.localeCompare(r));for(let n=0;n<e.length;n++){const r=e[n];t(this.#e.get(r),n)}}getError(t,e){if(_e(t)){const r=t.toLowerCase();if(Hd[r])return gn.from(Hd[r].signature);for(const s of this.#t.values())if(r===s.selector)return s;return null}if(t.indexOf("(")===-1){const r=[];for(const[s,a]of this.#t)s.split("(")[0]===t&&r.push(a);if(r.length===0)return t==="Error"?gn.from("error Error(string)"):t==="Panic"?gn.from("error Panic(uint256)"):null;if(r.length>1){const s=r.map(a=>JSON.stringify(a.format())).join(", ");F(!1,`ambiguous error description (i.e. ${s})`,"name",t)}return r[0]}if(t=gn.from(t).format(),t==="Error(string)")return gn.from("error Error(string)");if(t==="Panic(uint256)")return gn.from("error Panic(uint256)");const n=this.#t.get(t);return n||null}forEachError(t){const e=Array.from(this.#t.keys());e.sort((n,r)=>n.localeCompare(r));for(let n=0;n<e.length;n++){const r=e[n];t(this.#t.get(r),n)}}_decodeParams(t,e){return this.#i.decode(t,e)}_encodeParams(t,e){return this.#i.encode(t,e)}encodeDeploy(t){return this._encodeParams(this.deploy.inputs,t||[])}decodeErrorResult(t,e){if(typeof t=="string"){const n=this.getError(t);F(n,"unknown error","fragment",t),t=n}return F(Ie(e,0,4)===t.selector,`data signature does not match error ${t.name}.`,"data",e),this._decodeParams(t.inputs,Ie(e,4))}encodeErrorResult(t,e){if(typeof t=="string"){const n=this.getError(t);F(n,"unknown error","fragment",t),t=n}return Me([t.selector,this._encodeParams(t.inputs,e||[])])}decodeFunctionData(t,e){if(typeof t=="string"){const n=this.getFunction(t);F(n,"unknown function","fragment",t),t=n}return F(Ie(e,0,4)===t.selector,`data signature does not match function ${t.name}.`,"data",e),this._decodeParams(t.inputs,Ie(e,4))}encodeFunctionData(t,e){if(typeof t=="string"){const n=this.getFunction(t);F(n,"unknown function","fragment",t),t=n}return Me([t.selector,this._encodeParams(t.inputs,e||[])])}decodeFunctionResult(t,e){if(typeof t=="string"){const s=this.getFunction(t);F(s,"unknown function","fragment",t),t=s}let n="invalid length for result data";const r=cn(e);if(r.length%32===0)try{return this.#i.decode(t.outputs,r)}catch{n="could not decode result data"}it(!1,n,"BAD_DATA",{value:xt(r),info:{method:t.name,signature:t.format()}})}makeError(t,e){const n=Jt(t,"data"),r=Is.getBuiltinCallException("call",e,n);if(r.message.startsWith("execution reverted (unknown custom error)")){const o=xt(n.slice(0,4)),l=this.getError(o);if(l)try{const c=this.#i.decode(l.inputs,n.slice(4));r.revert={name:l.name,signature:l.format(),args:c},r.reason=r.revert.signature,r.message=`execution reverted: ${r.reason}`}catch{r.message="execution reverted (coult not decode custom error)"}}const a=this.parseTransaction(e);return a&&(r.invocation={method:a.name,signature:a.signature,args:a.args}),r}encodeFunctionResult(t,e){if(typeof t=="string"){const n=this.getFunction(t);F(n,"unknown function","fragment",t),t=n}return xt(this.#i.encode(t.outputs,e||[]))}encodeFilterTopics(t,e){if(typeof t=="string"){const s=this.getEvent(t);F(s,"unknown event","eventFragment",t),t=s}it(e.length<=t.inputs.length,`too many arguments for ${t.format()}`,"UNEXPECTED_ARGUMENT",{count:e.length,expectedCount:t.inputs.length});const n=[];t.anonymous||n.push(t.topicHash);const r=(s,a)=>s.type==="string"?Or(a):s.type==="bytes"?Fe(xt(a)):(s.type==="bool"&&typeof a=="boolean"?a=a?"0x01":"0x00":s.type.match(/^u?int/)?a=ar(a):s.type.match(/^bytes/)?a=Nw(a,32):s.type==="address"&&this.#i.encode(["address"],[a]),Ui(xt(a),32));for(e.forEach((s,a)=>{const o=t.inputs[a];if(!o.indexed){F(s==null,"cannot filter non-indexed parameters; must be null","contract."+o.name,s);return}s==null?n.push(null):o.baseType==="array"||o.baseType==="tuple"?F(!1,"filtering with tuples or arrays not supported","contract."+o.name,s):Array.isArray(s)?n.push(s.map(l=>r(o,l))):n.push(r(o,s))});n.length&&n[n.length-1]===null;)n.pop();return n}encodeEventLog(t,e){if(typeof t=="string"){const a=this.getEvent(t);F(a,"unknown event","eventFragment",t),t=a}const n=[],r=[],s=[];return t.anonymous||n.push(t.topicHash),F(e.length===t.inputs.length,"event arguments/values mismatch","values",e),t.inputs.forEach((a,o)=>{const l=e[o];if(a.indexed)if(a.type==="string")n.push(Or(l));else if(a.type==="bytes")n.push(Fe(l));else{if(a.baseType==="tuple"||a.baseType==="array")throw new Error("not implemented");n.push(this.#i.encode([a.type],[l]))}else r.push(a),s.push(l)}),{data:this.#i.encode(r,s),topics:n}}decodeEventLog(t,e,n){if(typeof t=="string"){const d=this.getEvent(t);F(d,"unknown event","eventFragment",t),t=d}if(n!=null&&!t.anonymous){const d=t.topicHash;F(_e(n[0],32)&&n[0].toLowerCase()===d,"fragment/topic mismatch","topics[0]",n[0]),n=n.slice(1)}const r=[],s=[],a=[];t.inputs.forEach((d,g)=>{d.indexed?d.type==="string"||d.type==="bytes"||d.baseType==="tuple"||d.baseType==="array"?(r.push(we.from({type:"bytes32",name:d.name})),a.push(!0)):(r.push(d),a.push(!1)):(s.push(d),a.push(!1))});const o=n!=null?this.#i.decode(r,Me(n)):null,l=this.#i.decode(s,e,!0),c=[],u=[];let h=0,f=0;return t.inputs.forEach((d,g)=>{let y=null;if(d.indexed)if(o==null)y=new kd(null);else if(a[g])y=new kd(o[f++]);else try{y=o[f++]}catch(m){y=m}else try{y=l[h++]}catch(m){y=m}c.push(y),u.push(d.name||null)}),Ei.fromItems(c,u)}parseTransaction(t){const e=Jt(t.data,"tx.data"),n=bt(t.value!=null?t.value:0,"tx.value"),r=this.getFunction(xt(e.slice(0,4)));if(!r)return null;const s=this.#i.decode(r.inputs,e.slice(4));return new uM(r,r.selector,s,n)}parseCallResult(t){throw new Error("@TODO")}parseLog(t){const e=this.getEvent(t.topics[0]);return!e||e.anonymous?null:new cM(e,e.topicHash,this.decodeEventLog(e,t.data,t.topics))}parseError(t){const e=xt(t),n=this.getError(Ie(e,0,4));if(!n)return null;const r=this.#i.decode(n.inputs,Ie(e,4));return new fM(n,n.selector,r)}static from(t){return t instanceof vr?t:typeof t=="string"?new vr(JSON.parse(t)):typeof t.formatJson=="function"?new vr(t.formatJson()):typeof t.format=="function"?new vr(t.format("json")):new vr(t)}}const xg=BigInt(0);function ws(i){return i??null}function Ue(i){return i==null?null:i.toString()}class zd{gasPrice;maxFeePerGas;maxPriorityFeePerGas;constructor(t,e,n){Dt(this,{gasPrice:ws(t),maxFeePerGas:ws(e),maxPriorityFeePerGas:ws(n)})}toJSON(){const{gasPrice:t,maxFeePerGas:e,maxPriorityFeePerGas:n}=this;return{_type:"FeeData",gasPrice:Ue(t),maxFeePerGas:Ue(e),maxPriorityFeePerGas:Ue(n)}}}function Xo(i){const t={};i.to&&(t.to=i.to),i.from&&(t.from=i.from),i.data&&(t.data=xt(i.data));const e="chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);for(const r of e)!(r in i)||i[r]==null||(t[r]=bt(i[r],`request.${r}`));const n="type,nonce".split(/,/);for(const r of n)!(r in i)||i[r]==null||(t[r]=Vt(i[r],`request.${r}`));return i.accessList&&(t.accessList=Wr(i.accessList)),i.authorizationList&&(t.authorizationList=i.authorizationList.slice()),"blockTag"in i&&(t.blockTag=i.blockTag),"enableCcipRead"in i&&(t.enableCcipRead=!!i.enableCcipRead),"customData"in i&&(t.customData=i.customData),"blobVersionedHashes"in i&&i.blobVersionedHashes&&(t.blobVersionedHashes=i.blobVersionedHashes.slice()),"kzg"in i&&(t.kzg=i.kzg),"blobWrapperVersion"in i&&(t.blobWrapperVersion=i.blobWrapperVersion),"blobs"in i&&i.blobs&&(t.blobs=i.blobs.map(r=>$u(r)?xt(r):Object.assign({},r))),t}class hM{provider;number;hash;timestamp;parentHash;parentBeaconBlockRoot;nonce;difficulty;gasLimit;gasUsed;stateRoot;receiptsRoot;transactionsRoot;blobGasUsed;excessBlobGas;miner;prevRandao;extraData;baseFeePerGas;#t;constructor(t,e){this.#t=t.transactions.map(n=>typeof n!="string"?new Na(n,e):n),Dt(this,{provider:e,hash:ws(t.hash),number:t.number,timestamp:t.timestamp,parentHash:t.parentHash,parentBeaconBlockRoot:t.parentBeaconBlockRoot,nonce:t.nonce,difficulty:t.difficulty,gasLimit:t.gasLimit,gasUsed:t.gasUsed,blobGasUsed:t.blobGasUsed,excessBlobGas:t.excessBlobGas,miner:t.miner,prevRandao:ws(t.prevRandao),extraData:t.extraData,baseFeePerGas:ws(t.baseFeePerGas),stateRoot:t.stateRoot,receiptsRoot:t.receiptsRoot,transactionsRoot:t.transactionsRoot})}get transactions(){return this.#t.map(t=>typeof t=="string"?t:t.hash)}get prefetchedTransactions(){const t=this.#t.slice();return t.length===0?[]:(it(typeof t[0]=="object","transactions were not prefetched with block request","UNSUPPORTED_OPERATION",{operation:"transactionResponses()"}),t)}toJSON(){const{baseFeePerGas:t,difficulty:e,extraData:n,gasLimit:r,gasUsed:s,hash:a,miner:o,prevRandao:l,nonce:c,number:u,parentHash:h,parentBeaconBlockRoot:f,stateRoot:d,receiptsRoot:g,transactionsRoot:y,timestamp:m,transactions:p}=this;return{_type:"Block",baseFeePerGas:Ue(t),difficulty:Ue(e),extraData:n,gasLimit:Ue(r),gasUsed:Ue(s),blobGasUsed:Ue(this.blobGasUsed),excessBlobGas:Ue(this.excessBlobGas),hash:a,miner:o,prevRandao:l,nonce:c,number:u,parentHash:h,timestamp:m,parentBeaconBlockRoot:f,stateRoot:d,receiptsRoot:g,transactionsRoot:y,transactions:p}}[Symbol.iterator](){let t=0;const e=this.transactions;return{next:()=>t<this.length?{value:e[t++],done:!1}:{value:void 0,done:!0}}}get length(){return this.#t.length}get date(){return this.timestamp==null?null:new Date(this.timestamp*1e3)}async getTransaction(t){let e;if(typeof t=="number")e=this.#t[t];else{const n=t.toLowerCase();for(const r of this.#t)if(typeof r=="string"){if(r!==n)continue;e=r;break}else{if(r.hash!==n)continue;e=r;break}}if(e==null)throw new Error("no such tx");return typeof e=="string"?await this.provider.getTransaction(e):e}getPrefetchedTransaction(t){const e=this.prefetchedTransactions;if(typeof t=="number")return e[t];t=t.toLowerCase();for(const n of e)if(n.hash===t)return n;F(!1,"no matching transaction","indexOrHash",t)}isMined(){return!!this.hash}isLondon(){return!!this.baseFeePerGas}orphanedEvent(){if(!this.isMined())throw new Error("");return dM(this)}}class Ia{provider;transactionHash;blockHash;blockNumber;removed;address;data;topics;index;transactionIndex;constructor(t,e){this.provider=e;const n=Object.freeze(t.topics.slice());Dt(this,{transactionHash:t.transactionHash,blockHash:t.blockHash,blockNumber:t.blockNumber,removed:t.removed,address:t.address,data:t.data,topics:n,index:t.index,transactionIndex:t.transactionIndex})}toJSON(){const{address:t,blockHash:e,blockNumber:n,data:r,index:s,removed:a,topics:o,transactionHash:l,transactionIndex:c}=this;return{_type:"log",address:t,blockHash:e,blockNumber:n,data:r,index:s,removed:a,topics:o,transactionHash:l,transactionIndex:c}}async getBlock(){const t=await this.provider.getBlock(this.blockHash);return it(!!t,"failed to find transaction","UNKNOWN_ERROR",{}),t}async getTransaction(){const t=await this.provider.getTransaction(this.transactionHash);return it(!!t,"failed to find transaction","UNKNOWN_ERROR",{}),t}async getTransactionReceipt(){const t=await this.provider.getTransactionReceipt(this.transactionHash);return it(!!t,"failed to find transaction receipt","UNKNOWN_ERROR",{}),t}removedEvent(){return pM(this)}}class _g{provider;to;from;contractAddress;hash;index;blockHash;blockNumber;logsBloom;gasUsed;blobGasUsed;cumulativeGasUsed;gasPrice;blobGasPrice;type;status;root;#t;constructor(t,e){this.#t=Object.freeze(t.logs.map(r=>new Ia(r,e)));let n=xg;t.effectiveGasPrice!=null?n=t.effectiveGasPrice:t.gasPrice!=null&&(n=t.gasPrice),Dt(this,{provider:e,to:t.to,from:t.from,contractAddress:t.contractAddress,hash:t.hash,index:t.index,blockHash:t.blockHash,blockNumber:t.blockNumber,logsBloom:t.logsBloom,gasUsed:t.gasUsed,cumulativeGasUsed:t.cumulativeGasUsed,blobGasUsed:t.blobGasUsed,gasPrice:n,blobGasPrice:t.blobGasPrice,type:t.type,status:t.status,root:t.root})}get logs(){return this.#t}toJSON(){const{to:t,from:e,contractAddress:n,hash:r,index:s,blockHash:a,blockNumber:o,logsBloom:l,logs:c,status:u,root:h}=this;return{_type:"TransactionReceipt",blockHash:a,blockNumber:o,contractAddress:n,cumulativeGasUsed:Ue(this.cumulativeGasUsed),from:e,gasPrice:Ue(this.gasPrice),blobGasUsed:Ue(this.blobGasUsed),blobGasPrice:Ue(this.blobGasPrice),gasUsed:Ue(this.gasUsed),hash:r,index:s,logs:c,logsBloom:l,root:h,status:u,to:t}}get length(){return this.logs.length}[Symbol.iterator](){let t=0;return{next:()=>t<this.length?{value:this.logs[t++],done:!1}:{value:void 0,done:!0}}}get fee(){return this.gasUsed*this.gasPrice}async getBlock(){const t=await this.provider.getBlock(this.blockHash);if(t==null)throw new Error("TODO");return t}async getTransaction(){const t=await this.provider.getTransaction(this.hash);if(t==null)throw new Error("TODO");return t}async getResult(){return await this.provider.getTransactionResult(this.hash)}async confirmations(){return await this.provider.getBlockNumber()-this.blockNumber+1}removedEvent(){return bg(this)}reorderedEvent(t){return it(!t||t.isMined(),"unmined 'other' transction cannot be orphaned","UNSUPPORTED_OPERATION",{operation:"reorderedEvent(other)"}),vg(this,t)}}class Na{provider;blockNumber;blockHash;index;hash;type;to;from;nonce;gasLimit;gasPrice;maxPriorityFeePerGas;maxFeePerGas;maxFeePerBlobGas;data;value;chainId;signature;accessList;blobVersionedHashes;authorizationList;#t;constructor(t,e){this.provider=e,this.blockNumber=t.blockNumber!=null?t.blockNumber:null,this.blockHash=t.blockHash!=null?t.blockHash:null,this.hash=t.hash,this.index=t.index,this.type=t.type,this.from=t.from,this.to=t.to||null,this.gasLimit=t.gasLimit,this.nonce=t.nonce,this.data=t.data,this.value=t.value,this.gasPrice=t.gasPrice,this.maxPriorityFeePerGas=t.maxPriorityFeePerGas!=null?t.maxPriorityFeePerGas:null,this.maxFeePerGas=t.maxFeePerGas!=null?t.maxFeePerGas:null,this.maxFeePerBlobGas=t.maxFeePerBlobGas!=null?t.maxFeePerBlobGas:null,this.chainId=t.chainId,this.signature=t.signature,this.accessList=t.accessList!=null?t.accessList:null,this.blobVersionedHashes=t.blobVersionedHashes!=null?t.blobVersionedHashes:null,this.authorizationList=t.authorizationList!=null?t.authorizationList:null,this.#t=-1}toJSON(){const{blockNumber:t,blockHash:e,index:n,hash:r,type:s,to:a,from:o,nonce:l,data:c,signature:u,accessList:h,blobVersionedHashes:f}=this;return{_type:"TransactionResponse",accessList:h,blockNumber:t,blockHash:e,blobVersionedHashes:f,chainId:Ue(this.chainId),data:c,from:o,gasLimit:Ue(this.gasLimit),gasPrice:Ue(this.gasPrice),hash:r,maxFeePerGas:Ue(this.maxFeePerGas),maxPriorityFeePerGas:Ue(this.maxPriorityFeePerGas),maxFeePerBlobGas:Ue(this.maxFeePerBlobGas),nonce:l,signature:u,to:a,index:n,type:s,value:Ue(this.value)}}async getBlock(){let t=this.blockNumber;if(t==null){const n=await this.getTransaction();n&&(t=n.blockNumber)}if(t==null)return null;const e=this.provider.getBlock(t);if(e==null)throw new Error("TODO");return e}async getTransaction(){return this.provider.getTransaction(this.hash)}async confirmations(){if(this.blockNumber==null){const{tx:e,blockNumber:n}=await ln({tx:this.getTransaction(),blockNumber:this.provider.getBlockNumber()});return e==null||e.blockNumber==null?0:n-e.blockNumber+1}return await this.provider.getBlockNumber()-this.blockNumber+1}async wait(t,e){const n=t??1,r=e??0;let s=this.#t,a=-1,o=s===-1;const l=async()=>{if(o)return null;const{blockNumber:f,nonce:d}=await ln({blockNumber:this.provider.getBlockNumber(),nonce:this.provider.getTransactionCount(this.from)});if(d<this.nonce){s=f;return}if(o)return null;const g=await this.getTransaction();if(!(g&&g.blockNumber!=null))for(a===-1&&(a=s-3,a<this.#t&&(a=this.#t));a<=f;){if(o)return null;const y=await this.provider.getBlock(a,!0);if(y==null)return;for(const m of y)if(m===this.hash)return;for(let m=0;m<y.length;m++){const p=await y.getTransaction(m);if(p.from===this.from&&p.nonce===this.nonce){if(o)return null;const b=await this.provider.getTransactionReceipt(p.hash);if(b==null||f-b.blockNumber+1<n)return;let M="replaced";p.data===this.data&&p.to===this.to&&p.value===this.value?M="repriced":p.data==="0x"&&p.from===p.to&&p.value===xg&&(M="cancelled"),it(!1,"transaction was replaced","TRANSACTION_REPLACED",{cancelled:M==="replaced"||M==="cancelled",reason:M,replacement:p.replaceableTransaction(s),hash:p.hash,receipt:b})}}a++}},c=f=>{if(f==null||f.status!==0)return f;it(!1,"transaction execution reverted","CALL_EXCEPTION",{action:"sendTransaction",data:null,reason:null,invocation:null,revert:null,transaction:{to:f.to,from:f.from,data:""},receipt:f})},u=await this.provider.getTransactionReceipt(this.hash);if(n===0)return c(u);if(u){if(n===1||await u.confirmations()>=n)return c(u)}else if(await l(),n===0)return null;return await new Promise((f,d)=>{const g=[],y=()=>{g.forEach(p=>p())};if(g.push(()=>{o=!0}),r>0){const p=setTimeout(()=>{y(),d(Ee("wait for transaction timeout","TIMEOUT"))},r);g.push(()=>{clearTimeout(p)})}const m=async p=>{if(await p.confirmations()>=n){y();try{f(c(p))}catch(b){d(b)}}};if(g.push(()=>{this.provider.off(this.hash,m)}),this.provider.on(this.hash,m),s>=0){const p=async()=>{try{await l()}catch(b){if(Je(b,"TRANSACTION_REPLACED")){y(),d(b);return}}o||this.provider.once("block",p)};g.push(()=>{this.provider.off("block",p)}),this.provider.once("block",p)}})}isMined(){return this.blockHash!=null}isLegacy(){return this.type===0}isBerlin(){return this.type===1}isLondon(){return this.type===2}isCancun(){return this.type===3}removedEvent(){return it(this.isMined(),"unmined transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),bg(this)}reorderedEvent(t){return it(this.isMined(),"unmined transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),it(!t||t.isMined(),"unmined 'other' transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),vg(this,t)}replaceableTransaction(t){F(Number.isInteger(t)&&t>=0,"invalid startBlock","startBlock",t);const e=new Na(this,this.provider);return e.#t=t,e}}function dM(i){return{orphan:"drop-block",hash:i.hash,number:i.number}}function vg(i,t){return{orphan:"reorder-transaction",tx:i,other:t}}function bg(i){return{orphan:"drop-transaction",tx:i}}function pM(i){return{orphan:"drop-log",log:{transactionHash:i.transactionHash,blockHash:i.blockHash,blockNumber:i.blockNumber,address:i.address,data:i.data,topics:Object.freeze(i.topics.slice()),index:i.index}}}class pf extends Ia{interface;fragment;args;constructor(t,e,n){super(t,t.provider);const r=e.decodeEventLog(n,t.data,t.topics);Dt(this,{args:r,fragment:n,interface:e})}get eventName(){return this.fragment.name}get eventSignature(){return this.fragment.format()}}class wg extends Ia{error;constructor(t,e){super(t,t.provider),Dt(this,{error:e})}}class mM extends _g{#t;constructor(t,e,n){super(n,e),this.#t=t}get logs(){return super.logs.map(t=>{const e=t.topics.length?this.#t.getEvent(t.topics[0]):null;if(e)try{return new pf(t,this.#t,e)}catch(n){return new wg(t,n)}return t})}}class mf extends Na{#t;constructor(t,e,n){super(n,e),this.#t=t}async wait(t,e){const n=await super.wait(t,e);return n==null?null:new mM(this.#t,this.provider,n)}}class Ag extends Zp{log;constructor(t,e,n,r){super(t,e,n),Dt(this,{log:r})}async getBlock(){return await this.log.getBlock()}async getTransaction(){return await this.log.getTransaction()}async getTransactionReceipt(){return await this.log.getTransactionReceipt()}}class gM extends Ag{constructor(t,e,n,r,s){super(t,e,n,new pf(s,t.interface,r));const a=t.interface.decodeEventLog(r,this.log.data,this.log.topics);Dt(this,{args:a,fragment:r})}get eventName(){return this.fragment.name}get eventSignature(){return this.fragment.format()}}const Vd=BigInt(0);function Sg(i){return i&&typeof i.call=="function"}function Eg(i){return i&&typeof i.estimateGas=="function"}function ul(i){return i&&typeof i.resolveName=="function"}function Mg(i){return i&&typeof i.sendTransaction=="function"}function Tg(i){if(i!=null){if(ul(i))return i;if(i.provider)return i.provider}}class yM{#t;fragment;constructor(t,e,n){if(Dt(this,{fragment:e}),e.inputs.length<n.length)throw new Error("too many arguments");const r=Gr(t.runner,"resolveName"),s=ul(r)?r:null;this.#t=(async function(){const a=await Promise.all(e.inputs.map((o,l)=>n[l]==null?null:o.walkAsync(n[l],(u,h)=>u==="address"?Array.isArray(h)?Promise.all(h.map(f=>fn(f,s))):fn(h,s):h)));return t.interface.encodeFilterTopics(e,a)})()}getTopicFilter(){return this.#t}}function Gr(i,t){return i==null?null:typeof i[t]=="function"?i:i.provider&&typeof i.provider[t]=="function"?i.provider:null}function Tr(i){return i==null?null:i.provider||null}async function Cg(i,t){const e=Ne.dereference(i,"overrides");F(typeof e=="object","invalid overrides parameter","overrides",i);const n=Xo(e);return F(n.to==null||(t||[]).indexOf("to")>=0,"cannot override to","overrides.to",n.to),F(n.data==null||(t||[]).indexOf("data")>=0,"cannot override data","overrides.data",n.data),n.from&&(n.from=n.from),n}async function xM(i,t,e){const n=Gr(i,"resolveName"),r=ul(n)?n:null;return await Promise.all(t.map((s,a)=>s.walkAsync(e[a],(o,l)=>(l=Ne.dereference(l,o),o==="address"?fn(l,r):l))))}function _M(i){const t=async function(a){const o=await Cg(a,["data"]);o.to=await i.getAddress(),o.from&&(o.from=await fn(o.from,Tg(i.runner)));const l=i.interface,c=bt(o.value||Vd,"overrides.value")===Vd,u=(o.data||"0x")==="0x";l.fallback&&!l.fallback.payable&&l.receive&&!u&&!c&&F(!1,"cannot send data to receive or send value to non-payable fallback","overrides",a),F(l.fallback||u,"cannot send data to receive-only contract","overrides.data",o.data);const h=l.receive||l.fallback&&l.fallback.payable;return F(h||c,"cannot send value to non-payable fallback","overrides.value",o.value),F(l.fallback||u,"cannot send data to receive-only contract","overrides.data",o.data),o},e=async function(a){const o=Gr(i.runner,"call");it(Sg(o),"contract runner does not support calling","UNSUPPORTED_OPERATION",{operation:"call"});const l=await t(a);try{return await o.call(l)}catch(c){throw Zu(c)&&c.data?i.interface.makeError(c.data,l):c}},n=async function(a){const o=i.runner;it(Mg(o),"contract runner does not support sending transactions","UNSUPPORTED_OPERATION",{operation:"sendTransaction"});const l=await o.sendTransaction(await t(a)),c=Tr(i.runner);return new mf(i.interface,c,l)},r=async function(a){const o=Gr(i.runner,"estimateGas");return it(Eg(o),"contract runner does not support gas estimation","UNSUPPORTED_OPERATION",{operation:"estimateGas"}),await o.estimateGas(await t(a))},s=async a=>await n(a);return Dt(s,{_contract:i,estimateGas:r,populateTransaction:t,send:n,staticCall:e}),s}function vM(i,t){const e=function(...c){const u=i.interface.getFunction(t,c);return it(u,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:t,args:c}}),u},n=async function(...c){const u=e(...c);let h={};if(u.inputs.length+1===c.length&&(h=await Cg(c.pop()),h.from&&(h.from=await fn(h.from,Tg(i.runner)))),u.inputs.length!==c.length)throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");const f=await xM(i.runner,u.inputs,c);return Object.assign({},h,await ln({to:i.getAddress(),data:i.interface.encodeFunctionData(u,f)}))},r=async function(...c){const u=await o(...c);return u.length===1?u[0]:u},s=async function(...c){const u=i.runner;it(Mg(u),"contract runner does not support sending transactions","UNSUPPORTED_OPERATION",{operation:"sendTransaction"});const h=await u.sendTransaction(await n(...c)),f=Tr(i.runner);return new mf(i.interface,f,h)},a=async function(...c){const u=Gr(i.runner,"estimateGas");return it(Eg(u),"contract runner does not support gas estimation","UNSUPPORTED_OPERATION",{operation:"estimateGas"}),await u.estimateGas(await n(...c))},o=async function(...c){const u=Gr(i.runner,"call");it(Sg(u),"contract runner does not support calling","UNSUPPORTED_OPERATION",{operation:"call"});const h=await n(...c);let f="0x";try{f=await u.call(h)}catch(g){throw Zu(g)&&g.data?i.interface.makeError(g.data,h):g}const d=e(...c);return i.interface.decodeFunctionResult(d,f)},l=async(...c)=>e(...c).constant?await r(...c):await s(...c);return Dt(l,{name:i.interface.getFunctionName(t),_contract:i,_key:t,getFragment:e,estimateGas:a,populateTransaction:n,send:s,staticCall:r,staticCallResult:o}),Object.defineProperty(l,"fragment",{configurable:!1,enumerable:!0,get:()=>{const c=i.interface.getFunction(t);return it(c,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:t}}),c}}),l}function bM(i,t){const e=function(...r){const s=i.interface.getEvent(t,r);return it(s,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:t,args:r}}),s},n=function(...r){return new yM(i,e(...r),r)};return Dt(n,{name:i.interface.getEventName(t),_contract:i,_key:t,getFragment:e}),Object.defineProperty(n,"fragment",{configurable:!1,enumerable:!0,get:()=>{const r=i.interface.getEvent(t);return it(r,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:t}}),r}}),n}const qo=Symbol.for("_ethersInternal_contract"),Rg=new WeakMap;function wM(i,t){Rg.set(i[qo],t)}function An(i){return Rg.get(i[qo])}function AM(i){return i&&typeof i=="object"&&"getTopicFilter"in i&&typeof i.getTopicFilter=="function"&&i.fragment}async function gf(i,t){let e,n=null;if(Array.isArray(t)){const s=function(a){if(_e(a,32))return a;const o=i.interface.getEvent(a);return F(o,"unknown fragment","name",a),o.topicHash};e=t.map(a=>a==null?null:Array.isArray(a)?a.map(s):s(a))}else t==="*"?e=[null]:typeof t=="string"?_e(t,32)?e=[t]:(n=i.interface.getEvent(t),F(n,"unknown fragment","event",t),e=[n.topicHash]):AM(t)?e=await t.getTopicFilter():"fragment"in t?(n=t.fragment,e=[n.topicHash]):F(!1,"unknown event name","event",t);e=e.map(s=>{if(s==null)return null;if(Array.isArray(s)){const a=Array.from(new Set(s.map(o=>o.toLowerCase())).values());return a.length===1?a[0]:(a.sort(),a)}return s.toLowerCase()});const r=e.map(s=>s==null?"null":Array.isArray(s)?s.join("|"):s).join("&");return{fragment:n,tag:r,topics:e}}async function js(i,t){const{subs:e}=An(i);return e.get((await gf(i,t)).tag)||null}async function Wd(i,t,e){const n=Tr(i.runner);it(n,"contract runner does not support subscribing","UNSUPPORTED_OPERATION",{operation:t});const{fragment:r,tag:s,topics:a}=await gf(i,e),{addr:o,subs:l}=An(i);let c=l.get(s);if(!c){const h={address:o||i,topics:a},f=m=>{let p=r;if(p==null)try{p=i.interface.getEvent(m.topics[0])}catch{}if(p){const b=p,M=r?i.interface.decodeEventLog(r,m.data,m.topics):[];Su(i,e,M,v=>new gM(i,v,e,b,m))}else Su(i,e,[],b=>new Ag(i,b,e,m))};let d=[];c={tag:s,listeners:[],start:()=>{d.length||d.push(n.on(h,f))},stop:async()=>{if(d.length==0)return;let m=d;d=[],await Promise.all(m),n.off(h,f)}},l.set(s,c)}return c}let Au=Promise.resolve();async function SM(i,t,e,n){await Au;const r=await js(i,t);if(!r)return!1;const s=r.listeners.length;return r.listeners=r.listeners.filter(({listener:a,once:o})=>{const l=Array.from(e);n&&l.push(n(o?null:a));try{a.call(i,...l)}catch{}return!o}),r.listeners.length===0&&(r.stop(),An(i).subs.delete(r.tag)),s>0}async function Su(i,t,e,n){try{await Au}catch{}const r=SM(i,t,e,n);return Au=r,await r}const po=["then"];class ra{target;interface;runner;filters;[qo];fallback;constructor(t,e,n,r){F(typeof t=="string"||Dm(t),"invalid value for Contract target","target",t),n==null&&(n=null);const s=vr.from(e);Dt(this,{target:t,runner:n,interface:s}),Object.defineProperty(this,qo,{value:{}});let a,o=null,l=null;if(r){const h=Tr(n);l=new mf(this.interface,h,r)}let c=new Map;if(typeof t=="string")if(_e(t))o=t,a=Promise.resolve(t);else{const h=Gr(n,"resolveName");if(!ul(h))throw Ee("contract runner does not support name resolution","UNSUPPORTED_OPERATION",{operation:"resolveName"});a=h.resolveName(t).then(f=>{if(f==null)throw Ee("an ENS name used for a contract target must be correctly configured","UNCONFIGURED_NAME",{value:t});return An(this).addr=f,f})}else a=t.getAddress().then(h=>{if(h==null)throw new Error("TODO");return An(this).addr=h,h});wM(this,{addrPromise:a,addr:o,deployTx:l,subs:c});const u=new Proxy({},{get:(h,f,d)=>{if(typeof f=="symbol"||po.indexOf(f)>=0)return Reflect.get(h,f,d);try{return this.getEvent(f)}catch(g){if(!Je(g,"INVALID_ARGUMENT")||g.argument!=="key")throw g}},has:(h,f)=>po.indexOf(f)>=0?Reflect.has(h,f):Reflect.has(h,f)||this.interface.hasEvent(String(f))});return Dt(this,{filters:u}),Dt(this,{fallback:s.receive||s.fallback?_M(this):null}),new Proxy(this,{get:(h,f,d)=>{if(typeof f=="symbol"||f in h||po.indexOf(f)>=0)return Reflect.get(h,f,d);try{return h.getFunction(f)}catch(g){if(!Je(g,"INVALID_ARGUMENT")||g.argument!=="key")throw g}},has:(h,f)=>typeof f=="symbol"||f in h||po.indexOf(f)>=0?Reflect.has(h,f):h.interface.hasFunction(f)})}connect(t){return new ra(this.target,this.interface,t)}attach(t){return new ra(t,this.interface,this.runner)}async getAddress(){return await An(this).addrPromise}async getDeployedCode(){const t=Tr(this.runner);it(t,"runner does not support .provider","UNSUPPORTED_OPERATION",{operation:"getDeployedCode"});const e=await t.getCode(await this.getAddress());return e==="0x"?null:e}async waitForDeployment(){const t=this.deploymentTransaction();if(t)return await t.wait(),this;if(await this.getDeployedCode()!=null)return this;const n=Tr(this.runner);return it(n!=null,"contract runner does not support .provider","UNSUPPORTED_OPERATION",{operation:"waitForDeployment"}),new Promise((r,s)=>{const a=async()=>{try{if(await this.getDeployedCode()!=null)return r(this);n.once("block",a)}catch(o){s(o)}};a()})}deploymentTransaction(){return An(this).deployTx}getFunction(t){return typeof t!="string"&&(t=t.format()),vM(this,t)}getEvent(t){return typeof t!="string"&&(t=t.format()),bM(this,t)}async queryTransaction(t){throw new Error("@TODO")}async queryFilter(t,e,n){e==null&&(e=0),n==null&&(n="latest");const{addr:r,addrPromise:s}=An(this),a=r||await s,{fragment:o,topics:l}=await gf(this,t),c={address:a,topics:l,fromBlock:e,toBlock:n},u=Tr(this.runner);return it(u,"contract runner does not have a provider","UNSUPPORTED_OPERATION",{operation:"queryFilter"}),(await u.getLogs(c)).map(h=>{let f=o;if(f==null)try{f=this.interface.getEvent(h.topics[0])}catch{}if(f)try{return new pf(h,this.interface,f)}catch(d){return new wg(h,d)}return new Ia(h,u)})}async on(t,e){const n=await Wd(this,"on",t);return n.listeners.push({listener:e,once:!1}),n.start(),this}async once(t,e){const n=await Wd(this,"once",t);return n.listeners.push({listener:e,once:!0}),n.start(),this}async emit(t,...e){return await Su(this,t,e,null)}async listenerCount(t){if(t){const r=await js(this,t);return r?r.listeners.length:0}const{subs:e}=An(this);let n=0;for(const{listeners:r}of e.values())n+=r.length;return n}async listeners(t){if(t){const r=await js(this,t);return r?r.listeners.map(({listener:s})=>s):[]}const{subs:e}=An(this);let n=[];for(const{listeners:r}of e.values())n=n.concat(r.map(({listener:s})=>s));return n}async off(t,e){const n=await js(this,t);if(!n)return this;if(e){const r=n.listeners.map(({listener:s})=>s).indexOf(e);r>=0&&n.listeners.splice(r,1)}return(e==null||n.listeners.length===0)&&(n.stop(),An(this).subs.delete(n.tag)),this}async removeAllListeners(t){if(t){const e=await js(this,t);if(!e)return this;e.stop(),An(this).subs.delete(e.tag)}else{const{subs:e}=An(this);for(const{tag:n,stop:r}of e.values())r(),e.delete(n)}return this}async addListener(t,e){return await this.on(t,e)}async removeListener(t,e){return await this.off(t,e)}static buildClass(t){class e extends ra{constructor(r,s=null){super(r,t,s)}}return e}static from(t,e,n){return n==null&&(n=null),new this(t,e,n)}}function EM(){return ra}class sa extends EM(){}const ta=BigInt(60);function hc(i){return i.match(/^ipfs:\/\/ipfs\//i)?i=i.substring(12):i.match(/^ipfs:\/\//i)?i=i.substring(7):F(!1,"unsupported IPFS format","link",i),`https://gateway.ipfs.io/ipfs/${i}`}class MM{name;constructor(t){Dt(this,{name:t})}connect(t){return this}supportsCoinType(t){return!1}async encodeAddress(t,e){throw new Error("unsupported coin")}async decodeAddress(t,e){throw new Error("unsupported coin")}}const Pg=new RegExp("^(ipfs)://(.*)$","i"),Xd=[new RegExp("^(https)://(.*)$","i"),new RegExp("^(data):(.*)$","i"),Pg,new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$","i")];function qd(i){return i===ta||i>=2147483648&&i<=4294967295}class Ai{provider;address;name;#t;#e;constructor(t,e,n,r){Dt(this,{provider:t,address:e,name:n}),this.#t=r!=null?Promise.resolve(r):null,this.#e=new sa(e,["function supportsInterface(bytes4) view returns (bool)","function resolve(bytes, bytes) view returns (bytes)","function addr(bytes32) view returns (address)","function addr(bytes32, uint) view returns (bytes)","function text(bytes32, string) view returns (string)","function contenthash(bytes32) view returns (bytes)","function name(bytes32) view returns (string)"],t)}async supportsWildcard(){return this.#t==null&&(this.#t=(async()=>{try{return await this.#e.supportsInterface("0x9061b923")}catch(t){if(Je(t,"CALL_EXCEPTION"))return!1;throw this.#t=null,t}})()),await this.#t}async#n(t,e){e=(e||[]).slice();const n=this.#e.interface;e.unshift(Sd(this.name));let r=null;await this.supportsWildcard()&&(r=n.getFunction(t),it(r,"missing fragment","UNKNOWN_ERROR",{info:{funcName:t}}),e=[Ed(this.name,255),n.encodeFunctionData(r,e)],t="resolve(bytes,bytes)"),e.push({enableCcipRead:!0});try{const s=await this.#e[t](...e);return r?n.decodeFunctionResult(r,s)[0]:s}catch(s){if(!Je(s,"CALL_EXCEPTION"))throw s}return null}async getAddress(t){const e=t==null?ta:bt(t);if(e===ta)try{const s=await this.#n("addr(bytes32)");return s==null||s===ko?null:s}catch(s){if(Je(s,"CALL_EXCEPTION"))return null;throw s}if(qd(e)){const s=await this.#n("addr(bytes32,uint)",[e]);return _e(s,20)?ue(s):null}if(e>=0&&e<2147483648){let s=e+BigInt(2147483648);const a=await this.#n("addr(bytes32,uint)",[s]);if(_e(a,20))return ue(a)}let n=null;for(const s of this.provider.plugins)if(s instanceof MM&&e<=2147483648&&s.supportsCoinType(Number(e))){n=s;break}if(n==null)return null;const r=await this.#n("addr(bytes32,uint)",[e]);if(r==null||r==="0x")return null;if(e<2147483648){const s=await n.decodeAddress(Number(e),r);if(s!=null)return s}it(!1,"invalid coin data","UNSUPPORTED_OPERATION",{operation:`getAddress(${e})`,info:{coinType:e,data:r}})}async getText(t){const e=await this.#n("text(bytes32,string)",[t]);return e==null||e==="0x"?null:e}async getContentHash(){const t=await this.#n("contenthash(bytes32)");if(t==null||t==="0x")return null;const e=t.match(/^0x(e3010170|e5010172)(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);if(e){const r=e[1]==="e3010170"?"ipfs":"ipns",s=parseInt(e[4],16);if(e[5].length===s*2)return`${r}://${Uw("0x"+e[2])}`}const n=t.match(/^0xe40101fa011b20([0-9a-f]*)$/);if(n&&n[1].length===64)return`bzz://${n[1]}`;it(!1,"invalid or unsupported content hash data","UNSUPPORTED_OPERATION",{operation:"getContentHash()",info:{data:t}})}async getName(){return await this.#n("name(bytes32)")}async getAvatar(){return(await this._getAvatar()).url}async _getAvatar(){const t=[{type:"name",value:this.name}];try{const e=await this.getText("avatar");if(e==null)return t.push({type:"!avatar",value:""}),{url:null,linkage:t};t.push({type:"avatar",value:e});for(let n=0;n<Xd.length;n++){const r=e.match(Xd[n]);if(r==null)continue;const s=r[1].toLowerCase();switch(s){case"https":case"data":return t.push({type:"url",value:e}),{linkage:t,url:e};case"ipfs":{const a=hc(e);return t.push({type:"ipfs",value:e}),t.push({type:"url",value:a}),{linkage:t,url:a}}case"erc721":case"erc1155":{const a=s==="erc721"?"tokenURI(uint256)":"uri(uint256)";t.push({type:s,value:e});const o=await this.getAddress();if(o==null)return t.push({type:"!owner",value:""}),{url:null,linkage:t};const l=(r[2]||"").split("/");if(l.length!==2)return t.push({type:`!${s}caip`,value:r[2]||""}),{url:null,linkage:t};const c=l[1],u=new sa(l[0],["function tokenURI(uint) view returns (string)","function ownerOf(uint) view returns (address)","function uri(uint) view returns (string)","function balanceOf(address, uint256) view returns (uint)"],this.provider);if(s==="erc721"){const y=await u.ownerOf(c);if(o!==y)return t.push({type:"!owner",value:y}),{url:null,linkage:t};t.push({type:"owner",value:y})}else if(s==="erc1155"){const y=await u.balanceOf(o,c);if(!y)return t.push({type:"!balance",value:"0"}),{url:null,linkage:t};t.push({type:"balance",value:y.toString()})}let h=await u[a](c);if(h==null||h==="0x")return t.push({type:"!metadata-url",value:""}),{url:null,linkage:t};t.push({type:"metadata-url-base",value:h}),s==="erc1155"&&(h=h.replace("{id}",ar(c,32).substring(2)),t.push({type:"metadata-url-expanded",value:h})),h.match(/^ipfs:/i)&&(h=hc(h)),t.push({type:"metadata-url",value:h});let f={};const d=await new Di(h).send();d.assertOk();try{f=d.bodyJson}catch{try{t.push({type:"!metadata",value:d.bodyText})}catch{const p=d.body;return p&&t.push({type:"!metadata",value:xt(p)}),{url:null,linkage:t}}return{url:null,linkage:t}}if(!f)return t.push({type:"!metadata",value:""}),{url:null,linkage:t};t.push({type:"metadata",value:JSON.stringify(f)});let g=f.image;if(typeof g!="string")return t.push({type:"!imageUrl",value:""}),{url:null,linkage:t};if(!g.match(/^(https:\/\/|data:)/i)){if(g.match(Pg)==null)return t.push({type:"!imageUrl-ipfs",value:g}),{url:null,linkage:t};t.push({type:"imageUrl-ipfs",value:g}),g=hc(g)}return t.push({type:"url",value:g}),{linkage:t,url:g}}}}}catch{}return{linkage:t,url:null}}static async getEnsAddress(t){const e=await t.getNetwork(),n=e.getPlugin("org.ethers.plugins.network.Ens");return it(n,"network does not support ENS","UNSUPPORTED_OPERATION",{operation:"getEnsAddress",info:{network:e}}),n.address}static async getUniversalResolverAddress(t){const n=(await t.getNetwork()).getPlugin("org.ethers.plugins.network.Ens");return n&&n.universalResolver?n.universalResolver:null}static async#i(t,e){const n=await Ai.getEnsAddress(t);try{const s=await new sa(n,["function resolver(bytes32) view returns (address)"],t).resolver(Sd(e),{enableCcipRead:!0});return s===ko?null:s}catch(r){throw r}return null}static async lookupAddress(t,e,n){const r=n==null?ta:bt(n);qd(r)&&(e=ue(e));const s=await Kd(t);if(s)try{const o=(await s.reverse(e,r,{enableCcipRead:!0})).primary;return Ad(o)?o:null}catch(a){if(Je(a,"CALL_EXCEPTION")&&a.reason==="ResolverNotFound(bytes)")return null;throw a}it(r===ta,"lookupAddress coinType requires ENS Universal Resolver","UNSUPPORTED_OPERATION",{operation:"lookupAddress"});try{const a=await Ai.fromName(t,`${e.toLowerCase().substring(2)}.addr.reverse`);if(!a)return null;const o=await a.getName();return o==null||!Ad(o)||await t.resolveName(o)!==e?null:o}catch(a){if(Je(a,"BAD_DATA")&&a.value==="0x"||Je(a,"CALL_EXCEPTION"))return null;throw a}}static async fromName(t,e){const n=await Kd(t);if(n){let s;try{s=Ed(ag(e),255)}catch{return null}const a=await n.requireResolver(s);return new Ai(t,a.resolver,e,a.extended)}let r=e;for(;;){if(r===""||r==="."||e!=="eth"&&r==="eth")return null;const s=await Ai.#i(t,r);if(s!=null){const a=new Ai(t,s,e);return r!==e&&!await a.supportsWildcard()?null:a}r=r.split(".").slice(1).join(".")}}}async function Kd(i){const t=await Ai.getUniversalResolverAddress(i);return t?new sa(t,["function requireResolver(bytes) view returns ((bytes name, uint256 offset, bytes32 node, address resolver, bool extended))","function findResolver(bytes) view returns (address resolver, bytes32 node, uint offset)","function resolve(bytes name, bytes data) view returns (bytes result, address resolver)","function reverse(bytes name, uint coinType) view returns (string primary, address resolver, address reverseResolver)","error ResolverNotFound(bytes name)","error ResolverNotContract(bytes name, address resolver)","error ReverseAddressMismatch(string primary, bytes primaryAddress)","error HttpError(uint16 statusCode, string statusMessage)"],i):null}const Yd=BigInt(0);function ee(i,t){return(function(e){return e==null?t:i(e)})}function ba(i,t){return(e=>{if(t&&e==null)return null;if(!Array.isArray(e))throw new Error("not an array");return e.map(n=>i(n))})}function La(i,t){return(e=>{const n={};for(const r in i){let s=r;if(t&&r in t&&!(s in e)){for(const a of t[r])if(a in e){s=a;break}}try{const a=i[r](e[s]);a!==void 0&&(n[r]=a)}catch(a){const o=a instanceof Error?a.message:"not-an-error";it(!1,`invalid value for value.${r} (${o})`,"BAD_DATA",{value:e})}}return n})}function TM(i){switch(i){case!0:case"true":return!0;case!1:case"false":return!1}F(!1,`invalid boolean; ${JSON.stringify(i)}`,"value",i)}function Ns(i){return F(_e(i,!0),"invalid data","value",i),i}function Ye(i){return F(_e(i,32),"invalid hash","value",i),i}const CM=La({address:ue,blockHash:Ye,blockNumber:Vt,data:Ns,index:Vt,removed:ee(TM,!1),topics:ba(Ye),transactionHash:Ye,transactionIndex:Vt},{index:["logIndex"]});function RM(i){return CM(i)}const PM=La({hash:ee(Ye),parentHash:Ye,parentBeaconBlockRoot:ee(Ye,null),number:Vt,timestamp:Vt,nonce:ee(Ns),difficulty:bt,gasLimit:bt,gasUsed:bt,stateRoot:ee(Ye,null),receiptsRoot:ee(Ye,null),transactionsRoot:ee(Ye,null),blobGasUsed:ee(bt,null),excessBlobGas:ee(bt,null),miner:ee(ue),prevRandao:ee(Ye,null),extraData:Ns,baseFeePerGas:ee(bt)},{prevRandao:["mixHash"]});function IM(i){const t=PM(i);return t.transactions=i.transactions.map(e=>typeof e=="string"?e:Ig(e)),t}const NM=La({transactionIndex:Vt,blockNumber:Vt,transactionHash:Ye,address:ue,topics:ba(Ye),data:Ns,index:Vt,blockHash:Ye},{index:["logIndex"]});function LM(i){return NM(i)}const UM=La({to:ee(ue,null),from:ee(ue,null),contractAddress:ee(ue,null),index:Vt,root:ee(xt),gasUsed:bt,blobGasUsed:ee(bt,null),logsBloom:ee(Ns),blockHash:Ye,hash:Ye,logs:ba(LM),blockNumber:Vt,cumulativeGasUsed:bt,effectiveGasPrice:ee(bt),blobGasPrice:ee(bt,null),status:ee(Vt),type:ee(Vt,0)},{effectiveGasPrice:["gasPrice"],hash:["transactionHash"],index:["transactionIndex"]});function DM(i){return UM(i)}function Ig(i){i.to&&bt(i.to)===Yd&&(i.to="0x0000000000000000000000000000000000000000");const t=La({hash:Ye,index:ee(Vt,void 0),type:e=>e==="0x"||e==null?0:Vt(e),accessList:ee(Wr,null),blobVersionedHashes:ee(ba(Ye,!0),null),authorizationList:ee(ba(e=>{let n;if(e.signature)n=e.signature;else{let r=e.yParity;r==="0x1b"?r=0:r==="0x1c"&&(r=1),n=Object.assign({},e,{yParity:r})}return{address:ue(e.address),chainId:bt(e.chainId),nonce:bt(e.nonce),signature:Ce.from(n)}},!1),null),blockHash:ee(Ye,null),blockNumber:ee(Vt,null),transactionIndex:ee(Vt,null),from:ue,gasPrice:ee(bt),maxPriorityFeePerGas:ee(bt),maxFeePerGas:ee(bt),maxFeePerBlobGas:ee(bt,null),gasLimit:bt,to:ee(ue,null),value:bt,nonce:Vt,data:Ns,creates:ee(ue,null),chainId:ee(bt,null)},{data:["input"],gasLimit:["gas"],index:["transactionIndex"]})(i);if(t.to==null&&t.creates==null&&(t.creates=SS(t)),(i.type===1||i.type===2)&&i.accessList==null&&(t.accessList=[]),i.signature?t.signature=Ce.from(i.signature):t.signature=Ce.from(i),t.chainId==null){const e=t.signature.legacyChainId;e!=null&&(t.chainId=e)}return t.blockHash&&bt(t.blockHash)===Yd&&(t.blockHash=null),t}const FM="0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",OM=Symbol.for("nodejs.util.inspect.custom");class Ua{name;constructor(t){Dt(this,{name:t})}[OM](){return this.toString()}toString(){return`${this.name} { }`}clone(){return new Ua(this.name)}}class fl extends Ua{effectiveBlock;txBase;txCreate;txDataZero;txDataNonzero;txAccessListStorageKey;txAccessListAddress;constructor(t,e){t==null&&(t=0),super(`org.ethers.network.plugins.GasCost#${t||0}`);const n={effectiveBlock:t};function r(s,a){let o=(e||{})[s];o==null&&(o=a),F(typeof o=="number",`invalud value for ${s}`,"costs",e),n[s]=o}r("txBase",21e3),r("txCreate",32e3),r("txDataZero",4),r("txDataNonzero",16),r("txAccessListStorageKey",1900),r("txAccessListAddress",2400),Dt(this,n)}toString(){return`${this.name} { txBase: ${this.txBase}, txCreate: ${this.txCreate}, txDataZero: ${this.txDataZero}, txAccessListStorageKey: ${this.txAccessListStorageKey}, txAccessListAddress: ${this.txAccessListAddress} }`}clone(){return new fl(this.effectiveBlock,this)}}class hl extends Ua{address;targetNetwork;universalResolver;constructor(t,e,n){super("org.ethers.plugins.network.Ens"),Dt(this,{address:t||FM,targetNetwork:e??1,universalResolver:n})}toString(){return`${this.name} { address: ${this.address}, targetNetwork: ${this.targetNetwork}, universalResolver: ${this.universalResolver} }`}clone(){return new hl(this.address,this.targetNetwork,this.universalResolver)}}class BM extends Ua{#t;#e;get url(){return this.#t}get processFunc(){return this.#e}constructor(t,e){super("org.ethers.plugins.network.FetchUrlFeeDataPlugin"),this.#t=t,this.#e=e}toString(){return`${this.name} { url: ${this.url} }`}clone(){return this}}const kM=Symbol.for("nodejs.util.inspect.custom"),dc=new Map;class Mn{#t;#e;#n;constructor(t,e){this.#t=t,this.#e=bt(e),this.#n=new Map}[kM](){return this.toString()}toString(){const t=[];for(const e of this.#n.values())t.push(e.toString());return`Network { name: ${this.name}, chainId: ${this.chainId}, plugins: [ ${t.join(", ")} ] }`}toJSON(){return{name:this.name,chainId:String(this.chainId)}}get name(){return this.#t}set name(t){this.#t=t}get chainId(){return this.#e}set chainId(t){this.#e=bt(t,"chainId")}matches(t){if(t==null)return!1;if(typeof t=="string"){try{return this.chainId===bt(t)}catch{}return this.name===t}if(typeof t=="number"||typeof t=="bigint"){try{return this.chainId===bt(t)}catch{}return!1}if(typeof t=="object"){if(t.chainId!=null){try{return this.chainId===bt(t.chainId)}catch{}return!1}return t.name!=null?this.name===t.name:!1}return!1}get plugins(){return Array.from(this.#n.values())}attachPlugin(t){if(this.#n.get(t.name))throw new Error(`cannot replace existing plugin: ${t.name} `);return this.#n.set(t.name,t.clone()),this}getPlugin(t){return this.#n.get(t)||null}getPlugins(t){return this.plugins.filter(e=>e.name.split("#")[0]===t)}clone(){const t=new Mn(this.name,this.chainId);return this.plugins.forEach(e=>{t.attachPlugin(e.clone())}),t}computeIntrinsicGas(t){const e=this.getPlugin("org.ethers.plugins.network.GasCost")||new fl;let n=e.txBase;if(t.to==null&&(n+=e.txCreate),t.data)for(let r=2;r<t.data.length;r+=2)t.data.substring(r,r+2)==="00"?n+=e.txDataZero:n+=e.txDataNonzero;if(t.accessList){const r=Wr(t.accessList);for(const s in r)n+=e.txAccessListAddress+e.txAccessListStorageKey*r[s].storageKeys.length}return n}static from(t){if(GM(),t==null)return Mn.from("mainnet");if(typeof t=="number"&&(t=BigInt(t)),typeof t=="string"||typeof t=="bigint"){const e=dc.get(t);if(e)return e();if(typeof t=="bigint")return new Mn("unknown",t);F(!1,"unknown network","network",t)}if(typeof t.clone=="function")return t.clone();if(typeof t=="object"){F(typeof t.name=="string"&&typeof t.chainId=="number","invalid network object name or chainId","network",t);const e=new Mn(t.name,t.chainId),n=t;return(n.ensAddress||n.ensNetwork!=null||n.ensUniversalResolver)&&e.attachPlugin(new hl(n.ensAddress,n.ensNetwork,n.ensUniversalResolver)),e}F(!1,"invalid network","network",t)}static register(t,e){typeof t=="number"&&(t=BigInt(t));const n=dc.get(t);n&&F(!1,`conflicting network for ${JSON.stringify(n.name)}`,"nameOrChainId",t),dc.set(t,e)}}function Jd(i,t){const e=String(i);if(!e.match(/^[0-9.]+$/))throw new Error(`invalid gwei value: ${i}`);const n=e.split(".");if(n.length===1&&n.push(""),n.length!==2)throw new Error(`invalid gwei value: ${i}`);for(;n[1].length<t;)n[1]+="0";if(n[1].length>9){let r=BigInt(n[1].substring(0,9));n[1].substring(9).match(/^0+$/)||r++,n[1]=r.toString()}return BigInt(n[0]+n[1])}function Qd(i){return new BM(i,async(t,e,n)=>{n.setHeader("User-Agent","ethers");let r;try{const[s,a]=await Promise.all([n.send(),t()]);r=s;const o=r.bodyJson.standard;return{gasPrice:a.gasPrice,maxFeePerGas:Jd(o.maxFee,9),maxPriorityFeePerGas:Jd(o.maxPriorityFee,9)}}catch(s){it(!1,`error encountered with polygon gas station (${JSON.stringify(n.url)})`,"SERVER_ERROR",{request:n,response:r,error:s})}})}let Zd=!1;function GM(){if(Zd)return;Zd=!0;function i(e,n,r){const s=function(){const a=new Mn(e,n);return r.ensNetwork!=null&&a.attachPlugin(new hl(null,r.ensNetwork,r.ensUniversalResolver)),a.attachPlugin(new fl),(r.plugins||[]).forEach(o=>{a.attachPlugin(o)}),a};Mn.register(e,s),Mn.register(n,s),r.altNames&&r.altNames.forEach(a=>{Mn.register(a,s)})}const t="0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe";i("mainnet",1,{ensUniversalResolver:t,ensNetwork:1,altNames:["homestead"]}),i("ropsten",3,{ensNetwork:3}),i("rinkeby",4,{ensNetwork:4}),i("goerli",5,{ensNetwork:5}),i("kovan",42,{ensNetwork:42}),i("sepolia",11155111,{ensUniversalResolver:t,ensNetwork:11155111}),i("holesky",17e3,{ensNetwork:17e3}),i("classic",61,{}),i("classicKotti",6,{}),i("arbitrum",42161,{ensNetwork:1}),i("arbitrum-goerli",421613,{}),i("arbitrum-sepolia",421614,{}),i("base",8453,{ensNetwork:1}),i("base-goerli",84531,{}),i("base-sepolia",84532,{}),i("bnb",56,{ensNetwork:1}),i("bnbt",97,{}),i("filecoin",314,{}),i("filecoin-calibration",314159,{}),i("linea",59144,{ensNetwork:1}),i("linea-goerli",59140,{}),i("linea-sepolia",59141,{}),i("matic",137,{ensNetwork:1,plugins:[Qd("https://gasstation.polygon.technology/v2")]}),i("matic-amoy",80002,{}),i("matic-mumbai",80001,{altNames:["maticMumbai","maticmum"],plugins:[Qd("https://gasstation-testnet.polygon.technology/v2")]}),i("optimism",10,{ensNetwork:1,plugins:[]}),i("optimism-goerli",420,{}),i("optimism-sepolia",11155420,{}),i("xdai",100,{ensNetwork:1})}function Eu(i){return JSON.parse(JSON.stringify(i))}class HM{#t;#e;#n;#i;constructor(t){this.#t=t,this.#e=null,this.#n=4e3,this.#i=-2}get pollingInterval(){return this.#n}set pollingInterval(t){this.#n=t}async#r(){try{const t=await this.#t.getBlockNumber();if(this.#i===-2){this.#i=t;return}if(t!==this.#i){for(let e=this.#i+1;e<=t;e++){if(this.#e==null)return;await this.#t.emit("block",e)}this.#i=t}}catch{}this.#e!=null&&(this.#e=this.#t._setTimeout(this.#r.bind(this),this.#n))}start(){this.#e||(this.#e=this.#t._setTimeout(this.#r.bind(this),this.#n),this.#r())}stop(){this.#e&&(this.#t._clearTimeout(this.#e),this.#e=null)}pause(t){this.stop(),t&&(this.#i=-2)}resume(){this.start()}}class yf{#t;#e;#n;constructor(t){this.#t=t,this.#n=!1,this.#e=e=>{this._poll(e,this.#t)}}async _poll(t,e){throw new Error("sub-classes must override this")}start(){this.#n||(this.#n=!0,this.#e(-2),this.#t.on("block",this.#e))}stop(){this.#n&&(this.#n=!1,this.#t.off("block",this.#e))}pause(t){this.stop()}resume(){this.start()}}class zM extends yf{#t;#e;constructor(t,e){super(t),this.#t=e,this.#e=-2}pause(t){t&&(this.#e=-2),super.pause(t)}async _poll(t,e){const n=await e.getBlock(this.#t);n!=null&&(this.#e===-2?this.#e=n.number:n.number>this.#e&&(e.emit(this.#t,n.number),this.#e=n.number))}}class VM extends yf{#t;constructor(t,e){super(t),this.#t=Eu(e)}async _poll(t,e){throw new Error("@TODO")}}class WM extends yf{#t;constructor(t,e){super(t),this.#t=e}async _poll(t,e){const n=await e.getTransactionReceipt(this.#t);n&&e.emit(this.#t,n)}}class xf{#t;#e;#n;#i;#r;constructor(t,e){this.#t=t,this.#e=Eu(e),this.#n=this.#a.bind(this),this.#i=!1,this.#r=-2}async#a(t){if(this.#r===-2)return;const e=Eu(this.#e);e.fromBlock=this.#r+1,e.toBlock=t;const n=await this.#t.getLogs(e);if(n.length===0){this.#r<t-60&&(this.#r=t-60);return}for(const r of n)this.#t.emit(this.#e,r),this.#r=r.blockNumber}start(){this.#i||(this.#i=!0,this.#r===-2&&this.#t.getBlockNumber().then(t=>{this.#r=t}),this.#t.on("block",this.#n))}stop(){this.#i&&(this.#i=!1,this.#t.off("block",this.#n))}pause(t){this.stop(),t&&(this.#r=-2)}resume(){this.start()}}const XM=BigInt(2),qM=10;function pc(i){return new Promise(t=>{setTimeout(t,i)})}function mo(i){return i&&typeof i.then=="function"}function To(i,t){return i+":"+JSON.stringify(t,(e,n)=>{if(n==null)return"null";if(typeof n=="bigint")return`bigint:${n.toString()}`;if(typeof n=="string")return n.toLowerCase();if(typeof n=="object"&&!Array.isArray(n)){const r=Object.keys(n);return r.sort(),r.reduce((s,a)=>(s[a]=n[a],s),{})}return n})}class Ng{name;constructor(t){Dt(this,{name:t})}start(){}stop(){}pause(t){}resume(){}}function KM(i){return JSON.parse(JSON.stringify(i))}function Mu(i){return i=Array.from(new Set(i).values()),i.sort(),i}async function mc(i,t){if(i==null)throw new Error("invalid event");if(Array.isArray(i)&&(i={topics:i}),typeof i=="string")switch(i){case"block":case"debug":case"error":case"finalized":case"network":case"pending":case"safe":return{type:i,tag:i}}if(_e(i,32)){const e=i.toLowerCase();return{type:"transaction",tag:To("tx",{hash:e}),hash:e}}if(i.orphan){const e=i;return{type:"orphan",tag:To("orphan",e),filter:KM(e)}}if(i.address||i.topics){const e=i,n={topics:(e.topics||[]).map(r=>r==null?null:Array.isArray(r)?Mu(r.map(s=>s.toLowerCase())):r.toLowerCase())};if(e.address){const r=[],s=[],a=o=>{_e(o)?r.push(o):s.push((async()=>{r.push(await fn(o,t))})())};Array.isArray(e.address)?e.address.forEach(a):a(e.address),s.length&&await Promise.all(s),n.address=Mu(r.map(o=>o.toLowerCase()))}return{filter:n,tag:To("event",n),type:"event"}}F(!1,"unknown ProviderEvent","event",i)}function go(){return new Date().getTime()}const YM={cacheTimeout:250,pollingInterval:4e3};class JM{#t;#e;#n;#i;#r;#a;#s;#o;#h;#c;#m;#p;#d;#u;constructor(t,e){if(this.#u=Object.assign({},YM,e||{}),t==="any")this.#a=!0,this.#r=null;else if(t){const n=Mn.from(t);this.#a=!1,this.#r=Promise.resolve(n),setTimeout(()=>{this.emit("network",n,null)},0)}else this.#a=!1,this.#r=null;this.#o=-1,this.#s=new Map,this.#t=new Map,this.#e=new Map,this.#n=null,this.#i=!1,this.#h=1,this.#c=new Map,this.#m=!1,this.#p=0,this.#d=[]}get _requestRate(){const t=this.#p;return t==0?null:t}set _requestRate(t){(t==null||t<0)&&(t=0),this.#p=Vt(t)}get pollingInterval(){return this.#u.pollingInterval}get provider(){return this}get plugins(){return Array.from(this.#e.values())}attachPlugin(t){if(this.#e.get(t.name))throw new Error(`cannot replace existing plugin: ${t.name} `);return this.#e.set(t.name,t.connect(this)),this}getPlugin(t){return this.#e.get(t)||null}get disableCcipRead(){return this.#m}set disableCcipRead(t){this.#m=!!t}#f(){let t=this.#p;if(t===0)return 0;const e=this.#d,n=go();e.push(n);const r=n-1e3;for(;e.length&&e[0]<r;)e.shift();return e.length<t?0:e[0]+1e3-n}async#l(t){const e=this.#u.cacheTimeout;if(e<0){const s=this.#f();return s&&await pc(s),await this._perform(t)}const n=To(t.method,t);let r=this.#s.get(n);if(!r){const s=this.#f();s&&await pc(s),r=this._perform(t),this.#s.set(n,r),setTimeout(()=>{this.#s.get(n)===r&&this.#s.delete(n)},e)}return await r}async ccipReadFetch(t,e,n){if(this.disableCcipRead||n.length===0||t.to==null)return null;const r=t.to.toLowerCase(),s=e.toLowerCase(),a=[];for(let o=0;o<n.length;o++){const l=n[o],c=l.replace("{sender}",r).replace("{data}",s),u=new Di(c);l.indexOf("{data}")===-1&&(u.body={data:s,sender:r}),this.emit("debug",{action:"sendCcipReadFetchRequest",request:u,index:o,urls:n});let h="unknown error",f;try{f=await u.send()}catch(d){a.push(d.message),this.emit("debug",{action:"receiveCcipReadFetchError",request:u,result:{error:d}});continue}try{const d=f.bodyJson;if(d.data)return this.emit("debug",{action:"receiveCcipReadFetchResult",request:u,result:d}),d.data;d.message&&(h=d.message),this.emit("debug",{action:"receiveCcipReadFetchError",request:u,result:d})}catch{}it(f.statusCode<400||f.statusCode>=500,`response not found during CCIP fetch: ${h}`,"OFFCHAIN_FAULT",{reason:"404_MISSING_RESOURCE",transaction:t,info:{url:l,errorMessage:h}}),a.push(h)}it(!1,`error encountered during CCIP fetch: ${a.map(o=>JSON.stringify(o)).join(", ")}`,"OFFCHAIN_FAULT",{reason:"500_SERVER_ERROR",transaction:t,info:{urls:n,errorMessages:a}})}_wrapBlock(t,e){return new hM(IM(t),this)}_wrapLog(t,e){return new Ia(RM(t),this)}_wrapTransactionReceipt(t,e){return new _g(DM(t),this)}_wrapTransactionResponse(t,e){return new Na(Ig(t),this)}_detectNetwork(){it(!1,"sub-classes must implement this","UNSUPPORTED_OPERATION",{operation:"_detectNetwork"})}async _perform(t){it(!1,`unsupported method: ${t.method}`,"UNSUPPORTED_OPERATION",{operation:t.method,info:t})}async getBlockNumber(){const t=Vt(await this.#l({method:"getBlockNumber"}),"%response");return this.#o>=0&&(this.#o=t),t}_getAddress(t){return fn(t,this)}_getBlockTag(t){if(t==null)return"latest";switch(t){case"earliest":return"0x0";case"finalized":case"latest":case"pending":case"safe":return t}if(_e(t))return _e(t,32)?t:Wn(t);if(typeof t=="bigint"&&(t=Vt(t,"blockTag")),typeof t=="number")return t>=0?Wn(t):this.#o>=0?Wn(this.#o+t):this.getBlockNumber().then(e=>Wn(e+t));F(!1,"invalid blockTag","blockTag",t)}_getFilter(t){const e=(t.topics||[]).map(l=>l==null?null:Array.isArray(l)?Mu(l.map(c=>c.toLowerCase())):l.toLowerCase()),n="blockHash"in t?t.blockHash:void 0,r=(l,c,u)=>{let h;switch(l.length){case 0:break;case 1:h=l[0];break;default:l.sort(),h=l}if(n&&(c!=null||u!=null))throw new Error("invalid filter");const f={};return h&&(f.address=h),e.length&&(f.topics=e),c&&(f.fromBlock=c),u&&(f.toBlock=u),n&&(f.blockHash=n),f};let s=[];if(t.address)if(Array.isArray(t.address))for(const l of t.address)s.push(this._getAddress(l));else s.push(this._getAddress(t.address));let a;"fromBlock"in t&&(a=this._getBlockTag(t.fromBlock));let o;return"toBlock"in t&&(o=this._getBlockTag(t.toBlock)),s.filter(l=>typeof l!="string").length||a!=null&&typeof a!="string"||o!=null&&typeof o!="string"?Promise.all([Promise.all(s),a,o]).then(l=>r(l[0],l[1],l[2])):r(s,a,o)}_getTransactionRequest(t){const e=Xo(t),n=[];if(["to","from"].forEach(r=>{if(e[r]==null)return;const s=fn(e[r],this);mo(s)?n.push((async function(){e[r]=await s})()):e[r]=s}),e.blockTag!=null){const r=this._getBlockTag(e.blockTag);mo(r)?n.push((async function(){e.blockTag=await r})()):e.blockTag=r}return n.length?(async function(){return await Promise.all(n),e})():e}async getNetwork(){if(this.#r==null){const r=(async()=>{try{const s=await this._detectNetwork();return this.emit("network",s,null),s}catch(s){throw this.#r===r&&(this.#r=null),s}})();return this.#r=r,(await r).clone()}const t=this.#r,[e,n]=await Promise.all([t,this._detectNetwork()]);return e.chainId!==n.chainId&&(this.#a?(this.emit("network",n,e),this.#r===t&&(this.#r=Promise.resolve(n))):it(!1,`network changed: ${e.chainId} => ${n.chainId} `,"NETWORK_ERROR",{event:"changed"})),e.clone()}async getFeeData(){const t=await this.getNetwork(),e=async()=>{const{_block:r,gasPrice:s,priorityFee:a}=await ln({_block:this.#b("latest",!1),gasPrice:(async()=>{try{const u=await this.#l({method:"getGasPrice"});return bt(u,"%response")}catch{}return null})(),priorityFee:(async()=>{try{const u=await this.#l({method:"getPriorityFee"});return bt(u,"%response")}catch{}return null})()});let o=null,l=null;const c=this._wrapBlock(r,t);return c&&c.baseFeePerGas&&(l=a??BigInt("1000000000"),o=c.baseFeePerGas*XM+l),new zd(s,o,l)},n=t.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");if(n){const r=new Di(n.url),s=await n.processFunc(e,this,r);return new zd(s.gasPrice,s.maxFeePerGas,s.maxPriorityFeePerGas)}return await e()}async estimateGas(t){let e=this._getTransactionRequest(t);return mo(e)&&(e=await e),bt(await this.#l({method:"estimateGas",transaction:e}),"%response")}async#y(t,e,n){it(n<qM,"CCIP read exceeded maximum redirections","OFFCHAIN_FAULT",{reason:"TOO_MANY_REDIRECTS",transaction:Object.assign({},t,{blockTag:e,enableCcipRead:!0})});const r=Xo(t);try{const s=this.#f();return s&&await pc(s),xt(await this._perform({method:"call",transaction:r,blockTag:e}))}catch(s){if(!this.disableCcipRead&&Zu(s)&&s.data&&n>=0&&e==="latest"&&r.to!=null&&Ie(s.data,0,4)==="0x556f1830"){const a=s.data,o=await fn(r.to,this);let l;try{l=tT(Ie(s.data,4))}catch(h){it(!1,h.message,"OFFCHAIN_FAULT",{reason:"BAD_DATA",transaction:r,info:{data:a}})}it(l.sender.toLowerCase()===o.toLowerCase(),"CCIP Read sender mismatch","CALL_EXCEPTION",{action:"call",data:a,reason:"OffchainLookup",transaction:r,invocation:null,revert:{signature:"OffchainLookup(address,string[],bytes,bytes4,bytes)",name:"OffchainLookup",args:l.errorArgs}});const c=await this.ccipReadFetch(r,l.calldata,l.urls);it(c!=null,"CCIP Read failed to fetch data","OFFCHAIN_FAULT",{reason:"FETCH_FAILED",transaction:r,info:{data:s.data,errorArgs:l.errorArgs}});const u={to:o,data:Me([l.selector,jM([c,l.extraData])])};this.emit("debug",{action:"sendCcipReadCall",transaction:u});try{const h=await this.#y(u,e,n+1);return this.emit("debug",{action:"receiveCcipReadCallResult",transaction:Object.assign({},u),result:h}),h}catch(h){throw this.emit("debug",{action:"receiveCcipReadCallError",transaction:Object.assign({},u),error:h}),h}}throw s}}async#x(t){const{value:e}=await ln({network:this.getNetwork(),value:t});return e}async call(t){const{tx:e,blockTag:n}=await ln({tx:this._getTransactionRequest(t),blockTag:this._getBlockTag(t.blockTag)});return await this.#x(this.#y(e,n,t.enableCcipRead?0:-1))}async#g(t,e,n){let r=this._getAddress(e),s=this._getBlockTag(n);return(typeof r!="string"||typeof s!="string")&&([r,s]=await Promise.all([r,s])),await this.#x(this.#l(Object.assign(t,{address:r,blockTag:s})))}async getBalance(t,e){return bt(await this.#g({method:"getBalance"},t,e),"%response")}async getTransactionCount(t,e){return Vt(await this.#g({method:"getTransactionCount"},t,e),"%response")}async getCode(t,e){return xt(await this.#g({method:"getCode"},t,e))}async getStorage(t,e,n){const r=bt(e,"position");return xt(await this.#g({method:"getStorage",position:r},t,n))}async broadcastTransaction(t){const{blockNumber:e,hash:n,network:r}=await ln({blockNumber:this.getBlockNumber(),hash:this._perform({method:"broadcastTransaction",signedTransaction:t}),network:this.getNetwork()}),s=Vn.from(t);if(s.hash!==n)throw new Error("@TODO: the returned hash did not match");return this._wrapTransactionResponse(s,r).replaceableTransaction(e)}async#b(t,e){if(_e(t,32))return await this.#l({method:"getBlock",blockHash:t,includeTransactions:e});let n=this._getBlockTag(t);return typeof n!="string"&&(n=await n),await this.#l({method:"getBlock",blockTag:n,includeTransactions:e})}async getBlock(t,e){const{network:n,params:r}=await ln({network:this.getNetwork(),params:this.#b(t,!!e)});return r==null?null:this._wrapBlock(r,n)}async getTransaction(t){const{network:e,params:n}=await ln({network:this.getNetwork(),params:this.#l({method:"getTransaction",hash:t})});return n==null?null:this._wrapTransactionResponse(n,e)}async getTransactionReceipt(t){const{network:e,params:n}=await ln({network:this.getNetwork(),params:this.#l({method:"getTransactionReceipt",hash:t})});if(n==null)return null;if(n.gasPrice==null&&n.effectiveGasPrice==null){const r=await this.#l({method:"getTransaction",hash:t});if(r==null)throw new Error("report this; could not find tx or effectiveGasPrice");n.effectiveGasPrice=r.gasPrice}return this._wrapTransactionReceipt(n,e)}async getTransactionResult(t){const{result:e}=await ln({network:this.getNetwork(),result:this.#l({method:"getTransactionResult",hash:t})});return e==null?null:xt(e)}async getLogs(t){let e=this._getFilter(t);mo(e)&&(e=await e);const{network:n,params:r}=await ln({network:this.getNetwork(),params:this.#l({method:"getLogs",filter:e})});return r.map(s=>this._wrapLog(s,n))}_getProvider(t){it(!1,"provider cannot connect to target network","UNSUPPORTED_OPERATION",{operation:"_getProvider()"})}async getResolver(t){return await Ai.fromName(this,t)}async getAvatar(t){const e=await this.getResolver(t);return e?await e.getAvatar():null}async resolveName(t,e){const n=await this.getResolver(t);return n?await n.getAddress(e):null}async lookupAddress(t,e){return await Ai.lookupAddress(this,t,e)}async waitForTransaction(t,e,n){const r=e??1;return r===0?this.getTransactionReceipt(t):new Promise(async(s,a)=>{let o=null;const l=(async c=>{try{const u=await this.getTransactionReceipt(t);if(u!=null&&c-u.blockNumber+1>=r){s(u),o&&(clearTimeout(o),o=null);return}}catch(u){console.log("EEE",u)}this.once("block",l)});n!=null&&(o=setTimeout(()=>{o!=null&&(o=null,this.off("block",l),a(Ee("timeout","TIMEOUT",{reason:"timeout"})))},n)),l(await this.getBlockNumber())})}async waitForBlock(t){it(!1,"not implemented yet","NOT_IMPLEMENTED",{operation:"waitForBlock"})}_clearTimeout(t){const e=this.#c.get(t);e&&(e.timer&&clearTimeout(e.timer),this.#c.delete(t))}_setTimeout(t,e){e==null&&(e=0);const n=this.#h++,r=()=>{this.#c.delete(n),t()};if(this.paused)this.#c.set(n,{timer:null,func:r,time:e});else{const s=setTimeout(r,e);this.#c.set(n,{timer:s,func:r,time:go()})}return n}_forEachSubscriber(t){for(const e of this.#t.values())t(e.subscriber)}_getSubscriber(t){switch(t.type){case"debug":case"error":case"network":return new Ng(t.type);case"block":{const e=new HM(this);return e.pollingInterval=this.pollingInterval,e}case"safe":case"finalized":return new zM(this,t.type);case"event":return new xf(this,t.filter);case"transaction":return new WM(this,t.hash);case"orphan":return new VM(this,t.filter)}throw new Error(`unsupported event: ${t.type}`)}_recoverSubscriber(t,e){for(const n of this.#t.values())if(n.subscriber===t){n.started&&n.subscriber.stop(),n.subscriber=e,n.started&&e.start(),this.#n!=null&&e.pause(this.#n);break}}async#_(t,e){let n=await mc(t,this);return n.type==="event"&&e&&e.length>0&&e[0].removed===!0&&(n=await mc({orphan:"drop-log",log:e[0]},this)),this.#t.get(n.tag)||null}async#v(t){const e=await mc(t,this),n=e.tag;let r=this.#t.get(n);return r||(r={subscriber:this._getSubscriber(e),tag:n,addressableMap:new WeakMap,nameMap:new Map,started:!1,listeners:[]},this.#t.set(n,r)),r}async on(t,e){const n=await this.#v(t);return n.listeners.push({listener:e,once:!1}),n.started||(n.subscriber.start(),n.started=!0,this.#n!=null&&n.subscriber.pause(this.#n)),this}async once(t,e){const n=await this.#v(t);return n.listeners.push({listener:e,once:!0}),n.started||(n.subscriber.start(),n.started=!0,this.#n!=null&&n.subscriber.pause(this.#n)),this}async emit(t,...e){const n=await this.#_(t,e);if(!n||n.listeners.length===0)return!1;const r=n.listeners.length;return n.listeners=n.listeners.filter(({listener:s,once:a})=>{const o=new Zp(this,a?null:s,t);try{s.call(this,...e,o)}catch{}return!a}),n.listeners.length===0&&(n.started&&n.subscriber.stop(),this.#t.delete(n.tag)),r>0}async listenerCount(t){if(t){const n=await this.#_(t);return n?n.listeners.length:0}let e=0;for(const{listeners:n}of this.#t.values())e+=n.length;return e}async listeners(t){if(t){const n=await this.#_(t);return n?n.listeners.map(({listener:r})=>r):[]}let e=[];for(const{listeners:n}of this.#t.values())e=e.concat(n.map(({listener:r})=>r));return e}async off(t,e){const n=await this.#_(t);if(!n)return this;if(e){const r=n.listeners.map(({listener:s})=>s).indexOf(e);r>=0&&n.listeners.splice(r,1)}return(!e||n.listeners.length===0)&&(n.started&&n.subscriber.stop(),this.#t.delete(n.tag)),this}async removeAllListeners(t){if(t){const{tag:e,started:n,subscriber:r}=await this.#v(t);n&&r.stop(),this.#t.delete(e)}else for(const[e,{started:n,subscriber:r}]of this.#t)n&&r.stop(),this.#t.delete(e);return this}async addListener(t,e){return await this.on(t,e)}async removeListener(t,e){return this.off(t,e)}get destroyed(){return this.#i}destroy(){this.removeAllListeners();for(const t of this.#c.keys())this._clearTimeout(t);this.#i=!0}get paused(){return this.#n!=null}set paused(t){!!t!==this.paused&&(this.paused?this.resume():this.pause(!1))}pause(t){if(this.#o=-1,this.#n!=null){if(this.#n==!!t)return;it(!1,"cannot change pause type; resume first","UNSUPPORTED_OPERATION",{operation:"pause"})}this._forEachSubscriber(e=>e.pause(t)),this.#n=!!t;for(const e of this.#c.values())e.timer&&clearTimeout(e.timer),e.time=go()-e.time}resume(){if(this.#n!=null){this._forEachSubscriber(t=>t.resume()),this.#n=null;for(const t of this.#c.values()){let e=t.time;e<0&&(e=0),t.time=go(),setTimeout(t.func,e)}}}}function QM(i,t){try{const e=Tu(i,t);if(e)return Oo(e)}catch{}return null}function Tu(i,t){if(i==="0x")return null;try{const e=Vt(Ie(i,t,t+32)),n=Vt(Ie(i,e,e+32));return Ie(i,e+32,e+32+n)}catch{}return null}function $d(i){const t=Ge(i);if(t.length>32)throw new Error("internal; should not happen");const e=new Uint8Array(32);return e.set(t,32-t.length),e}function ZM(i){if(i.length%32===0)return i;const t=new Uint8Array(Math.ceil(i.length/32)*32);return t.set(i),t}const $M=new Uint8Array([]);function jM(i){const t=[];let e=0;for(let n=0;n<i.length;n++)t.push($M),e+=32;for(let n=0;n<i.length;n++){const r=Jt(i[n]);t[n]=$d(e),t.push($d(r.length)),t.push(ZM(r)),e+=32+Math.ceil(r.length/32)*32}return Me(t)}const jd="0x0000000000000000000000000000000000000000000000000000000000000000";function tT(i){const t={sender:"",urls:[],calldata:"",selector:"",extraData:"",errorArgs:[]};it(_s(i)>=160,"insufficient OffchainLookup data","OFFCHAIN_FAULT",{reason:"insufficient OffchainLookup data"});const e=Ie(i,0,32);it(Ie(e,0,12)===Ie(jd,0,12),"corrupt OffchainLookup sender","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup sender"}),t.sender=Ie(e,12);try{const n=[],r=Vt(Ie(i,32,64)),s=Vt(Ie(i,r,r+32)),a=Ie(i,r+32);for(let o=0;o<s;o++){const l=QM(a,o*32);if(l==null)throw new Error("abort");n.push(l)}t.urls=n}catch{it(!1,"corrupt OffchainLookup urls","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup urls"})}try{const n=Tu(i,64);if(n==null)throw new Error("abort");t.calldata=n}catch{it(!1,"corrupt OffchainLookup calldata","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup calldata"})}it(Ie(i,100,128)===Ie(jd,0,28),"corrupt OffchainLookup callbaackSelector","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup callbaackSelector"}),t.selector=Ie(i,96,100);try{const n=Tu(i,128);if(n==null)throw new Error("abort");t.extraData=n}catch{it(!1,"corrupt OffchainLookup extraData","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup extraData"})}return t.errorArgs="sender,urls,calldata,selector,extraData".split(/,/).map(n=>t[n]),t}function gr(i,t){if(i.provider)return i.provider;it(!1,"missing provider","UNSUPPORTED_OPERATION",{operation:t})}async function tp(i,t){let e=Xo(t);if(e.to!=null&&(e.to=fn(e.to,i)),e.from!=null){const n=e.from;e.from=Promise.all([i.getAddress(),fn(n,i)]).then(([r,s])=>(F(r.toLowerCase()===s.toLowerCase(),"transaction from mismatch","tx.from",s),r))}else e.from=i.getAddress();return await ln(e)}class eT{provider;constructor(t){Dt(this,{provider:t||null})}async getNonce(t){return gr(this,"getTransactionCount").getTransactionCount(await this.getAddress(),t)}async populateCall(t){return await tp(this,t)}async populateTransaction(t){const e=gr(this,"populateTransaction"),n=await tp(this,t);n.nonce==null&&(n.nonce=await this.getNonce("pending")),n.gasLimit==null&&(n.gasLimit=await this.estimateGas(n));const r=await this.provider.getNetwork();if(n.chainId!=null){const a=bt(n.chainId);F(a===r.chainId,"transaction chainId mismatch","tx.chainId",t.chainId)}else n.chainId=r.chainId;const s=n.maxFeePerGas!=null||n.maxPriorityFeePerGas!=null;if(n.gasPrice!=null&&(n.type===2||s)?F(!1,"eip-1559 transaction do not support gasPrice","tx",t):(n.type===0||n.type===1)&&s&&F(!1,"pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas","tx",t),(n.type===2||n.type==null)&&n.maxFeePerGas!=null&&n.maxPriorityFeePerGas!=null)n.type=2;else if(n.type===0||n.type===1){const a=await e.getFeeData();it(a.gasPrice!=null,"network does not support gasPrice","UNSUPPORTED_OPERATION",{operation:"getGasPrice"}),n.gasPrice==null&&(n.gasPrice=a.gasPrice)}else{const a=await e.getFeeData();if(n.type==null)if(a.maxFeePerGas!=null&&a.maxPriorityFeePerGas!=null)if(n.authorizationList&&n.authorizationList.length?n.type=4:n.type=2,n.gasPrice!=null){const o=n.gasPrice;delete n.gasPrice,n.maxFeePerGas=o,n.maxPriorityFeePerGas=o}else n.maxFeePerGas==null&&(n.maxFeePerGas=a.maxFeePerGas),n.maxPriorityFeePerGas==null&&(n.maxPriorityFeePerGas=a.maxPriorityFeePerGas);else a.gasPrice!=null?(it(!s,"network does not support EIP-1559","UNSUPPORTED_OPERATION",{operation:"populateTransaction"}),n.gasPrice==null&&(n.gasPrice=a.gasPrice),n.type=0):it(!1,"failed to get consistent fee data","UNSUPPORTED_OPERATION",{operation:"signer.getFeeData"});else(n.type===2||n.type===3||n.type===4)&&(n.maxFeePerGas==null&&(n.maxFeePerGas=a.maxFeePerGas),n.maxPriorityFeePerGas==null&&(n.maxPriorityFeePerGas=a.maxPriorityFeePerGas))}return await ln(n)}async populateAuthorization(t){const e=Object.assign({},t);return e.chainId==null&&(e.chainId=(await gr(this,"getNetwork").getNetwork()).chainId),e.nonce==null&&(e.nonce=await this.getNonce()),e}async estimateGas(t){return gr(this,"estimateGas").estimateGas(await this.populateCall(t))}async call(t){return gr(this,"call").call(await this.populateCall(t))}async resolveName(t){return await gr(this,"resolveName").resolveName(t)}async sendTransaction(t){const e=gr(this,"sendTransaction"),n=await this.populateTransaction(t);delete n.from;const r=Vn.from(n);return await e.broadcastTransaction(await this.signTransaction(r))}authorize(t){it(!1,"authorization not implemented for this signer","UNSUPPORTED_OPERATION",{operation:"authorize"})}}function nT(i){return JSON.parse(JSON.stringify(i))}class Lg{#t;#e;#n;#i;#r;#a;constructor(t){this.#t=t,this.#e=null,this.#n=this.#s.bind(this),this.#i=!1,this.#r=null,this.#a=!1}_subscribe(t){throw new Error("subclasses must override this")}_emitResults(t,e){throw new Error("subclasses must override this")}_recover(t){throw new Error("subclasses must override this")}async#s(t){try{this.#e==null&&(this.#e=this._subscribe(this.#t));let e=null;try{e=await this.#e}catch(s){if(!Je(s,"UNSUPPORTED_OPERATION")||s.operation!=="eth_newFilter")throw s}if(e==null){this.#e=null,this.#t._recoverSubscriber(this,this._recover(this.#t));return}const n=await this.#t.getNetwork();if(this.#r||(this.#r=n),this.#r.chainId!==n.chainId)throw new Error("chaid changed");if(this.#a)return;const r=await this.#t.send("eth_getFilterChanges",[e]);await this._emitResults(this.#t,r)}catch(e){console.log("@TODO",e)}this.#t.once("block",this.#n)}#o(){const t=this.#e;t&&(this.#e=null,t.then(e=>{this.#t.destroyed||this.#t.send("eth_uninstallFilter",[e])}))}start(){this.#i||(this.#i=!0,this.#s(-2))}stop(){this.#i&&(this.#i=!1,this.#a=!0,this.#o(),this.#t.off("block",this.#n))}pause(t){t&&this.#o(),this.#t.off("block",this.#n)}resume(){this.start()}}class iT extends Lg{#t;constructor(t,e){super(t),this.#t=nT(e)}_recover(t){return new xf(t,this.#t)}async _subscribe(t){return await t.send("eth_newFilter",[this.#t])}async _emitResults(t,e){for(const n of e)t.emit(this.#t,t._wrapLog(n,t._network))}}class rT extends Lg{async _subscribe(t){return await t.send("eth_newPendingTransactionFilter",[])}async _emitResults(t,e){for(const n of e)t.emit("pending",n)}}const sT="bigint,boolean,function,number,string,symbol".split(/,/g);function Co(i){if(i==null||sT.indexOf(typeof i)>=0||typeof i.getAddress=="function")return i;if(Array.isArray(i))return i.map(Co);if(typeof i=="object")return Object.keys(i).reduce((t,e)=>(t[e]=i[e],t),{});throw new Error(`should not happen: ${i} (${typeof i})`)}function aT(i){return new Promise(t=>{setTimeout(t,i)})}function us(i){return i&&i.toLowerCase()}function ep(i){return i&&typeof i.pollingInterval=="number"}const Ug={polling:!1,staticNetwork:null,batchStallTime:10,batchMaxSize:1<<20,batchMaxCount:100,cacheTimeout:250,pollingInterval:4e3};class gc extends eT{address;constructor(t,e){super(t),e=ue(e),Dt(this,{address:e})}connect(t){it(!1,"cannot reconnect JsonRpcSigner","UNSUPPORTED_OPERATION",{operation:"signer.connect"})}async getAddress(){return this.address}async populateTransaction(t){return await this.populateCall(t)}async sendUncheckedTransaction(t){const e=Co(t),n=[];if(e.from){const s=e.from;n.push((async()=>{const a=await fn(s,this.provider);F(a!=null&&a.toLowerCase()===this.address.toLowerCase(),"from address mismatch","transaction",t),e.from=a})())}else e.from=this.address;if(e.gasLimit==null&&n.push((async()=>{e.gasLimit=await this.provider.estimateGas({...e,from:this.address})})()),e.to!=null){const s=e.to;n.push((async()=>{e.to=await fn(s,this.provider)})())}n.length&&await Promise.all(n);const r=this.provider.getRpcTransaction(e);return this.provider.send("eth_sendTransaction",[r])}async sendTransaction(t){const e=await this.provider.getBlockNumber(),n=await this.sendUncheckedTransaction(t);return await new Promise((r,s)=>{const a=[1e3,100];let o=0;const l=async()=>{try{const c=await this.provider.getTransaction(n);if(c!=null){r(c.replaceableTransaction(e));return}}catch(c){if(Je(c,"CANCELLED")||Je(c,"BAD_DATA")||Je(c,"NETWORK_ERROR")||Je(c,"UNSUPPORTED_OPERATION")){c.info==null&&(c.info={}),c.info.sendTransactionHash=n,s(c);return}if(Je(c,"INVALID_ARGUMENT")&&(o++,c.info==null&&(c.info={}),c.info.sendTransactionHash=n,o>10)){s(c);return}this.provider.emit("error",Ee("failed to fetch transation after sending (will try again)","UNKNOWN_ERROR",{error:c}))}this.provider._setTimeout(()=>{l()},a.pop()||4e3)};l()})}async signTransaction(t){const e=Co(t);if(e.from){const r=await fn(e.from,this.provider);F(r!=null&&r.toLowerCase()===this.address.toLowerCase(),"from address mismatch","transaction",t),e.from=r}else e.from=this.address;const n=this.provider.getRpcTransaction(e);return await this.provider.send("eth_signTransaction",[n])}async signMessage(t){const e=typeof t=="string"?Qn(t):t;return await this.provider.send("personal_sign",[xt(e),this.address.toLowerCase()])}async signTypedData(t,e,n){const r=Co(n),s=await wn.resolveNames(t,e,r,async a=>{const o=await fn(a);return F(o!=null,"TypedData does not support null address","value",a),o});return await this.provider.send("eth_signTypedData_v4",[this.address.toLowerCase(),JSON.stringify(wn.getPayload(s.domain,e,s.value))])}async unlock(t){return this.provider.send("personal_unlockAccount",[this.address.toLowerCase(),t,null])}async _legacySignMessage(t){const e=typeof t=="string"?Qn(t):t;return await this.provider.send("eth_sign",[this.address.toLowerCase(),xt(e)])}}class oT extends JM{#t;#e;#n;#i;#r;#a;#s;#o(){if(this.#i)return;const t=this._getOption("batchMaxCount")===1?0:this._getOption("batchStallTime");this.#i=setTimeout(()=>{this.#i=null;const e=this.#n;for(this.#n=[];e.length;){const n=[e.shift()];for(;e.length&&n.length!==this.#t.batchMaxCount;)if(n.push(e.shift()),JSON.stringify(n.map(s=>s.payload)).length>this.#t.batchMaxSize){e.unshift(n.pop());break}(async()=>{const r=n.length===1?n[0].payload:n.map(s=>s.payload);this.emit("debug",{action:"sendRpcPayload",payload:r});try{const s=await this._send(r);this.emit("debug",{action:"receiveRpcResult",result:s});for(const{resolve:a,reject:o,payload:l}of n){if(this.destroyed){o(Ee("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:l.method}));continue}const c=s.filter(u=>u.id===l.id)[0];if(c==null){const u=Ee("missing response for request","BAD_DATA",{value:s,info:{payload:l}});this.emit("error",u),o(u);continue}if("error"in c){o(this.getRpcError(l,c));continue}a(c.result)}}catch(s){this.emit("debug",{action:"receiveRpcError",error:s});for(const{reject:a}of n)a(s)}})()}},t)}constructor(t,e){super(t,e),this.#e=1,this.#t=Object.assign({},Ug,e||{}),this.#n=[],this.#i=null,this.#a=null,this.#s=null;{let r=null;const s=new Promise(a=>{r=a});this.#r={promise:s,resolve:r}}const n=this._getOption("staticNetwork");typeof n=="boolean"?(F(!n||t!=="any","staticNetwork cannot be used on special network 'any'","options",e),n&&t!=null&&(this.#a=Mn.from(t))):n&&(F(t==null||n.matches(t),"staticNetwork MUST match network object","options",e),this.#a=n)}_getOption(t){return this.#t[t]}get _network(){return it(this.#a,"network is not available yet","NETWORK_ERROR"),this.#a}async _perform(t){if(t.method==="call"||t.method==="estimateGas"){let n=t.transaction;if(n&&n.type!=null&&bt(n.type)&&n.maxFeePerGas==null&&n.maxPriorityFeePerGas==null){const r=await this.getFeeData();r.maxFeePerGas==null&&r.maxPriorityFeePerGas==null&&(t=Object.assign({},t,{transaction:Object.assign({},n,{type:void 0})}))}}const e=this.getRpcRequest(t);return e!=null?await this.send(e.method,e.args):super._perform(t)}async _detectNetwork(){const t=this._getOption("staticNetwork");if(t)if(t===!0){if(this.#a)return this.#a}else return t;return this.#s?await this.#s:this.ready?(this.#s=(async()=>{try{const e=Mn.from(bt(await this.send("eth_chainId",[])));return this.#s=null,e}catch(e){throw this.#s=null,e}})(),await this.#s):(this.#s=(async()=>{const e={id:this.#e++,method:"eth_chainId",params:[],jsonrpc:"2.0"};this.emit("debug",{action:"sendRpcPayload",payload:e});let n;try{n=(await this._send(e))[0],this.#s=null}catch(r){throw this.#s=null,this.emit("debug",{action:"receiveRpcError",error:r}),r}if(this.emit("debug",{action:"receiveRpcResult",result:n}),"result"in n)return Mn.from(bt(n.result));throw this.getRpcError(e,n)})(),await this.#s)}_start(){this.#r==null||this.#r.resolve==null||(this.#r.resolve(),this.#r=null,(async()=>{for(;this.#a==null&&!this.destroyed;)try{this.#a=await this._detectNetwork()}catch(t){if(this.destroyed)break;console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"),this.emit("error",Ee("failed to bootstrap network detection","NETWORK_ERROR",{event:"initial-network-discovery",info:{error:t}})),await aT(1e3)}this.#o()})())}async _waitUntilReady(){if(this.#r!=null)return await this.#r.promise}_getSubscriber(t){return t.type==="pending"?new rT(this):t.type==="event"?this._getOption("polling")?new xf(this,t.filter):new iT(this,t.filter):t.type==="orphan"&&t.filter.orphan==="drop-log"?new Ng("orphan"):super._getSubscriber(t)}get ready(){return this.#r==null}getRpcTransaction(t){const e={};return["chainId","gasLimit","gasPrice","type","maxFeePerGas","maxPriorityFeePerGas","nonce","value"].forEach(n=>{if(t[n]==null)return;let r=n;n==="gasLimit"&&(r="gas"),e[r]=Wn(bt(t[n],`tx.${n}`))}),["from","to","data"].forEach(n=>{t[n]!=null&&(e[n]=xt(t[n]))}),t.accessList&&(e.accessList=Wr(t.accessList)),t.blobVersionedHashes&&(e.blobVersionedHashes=t.blobVersionedHashes.map(n=>n.toLowerCase())),t.authorizationList&&(e.authorizationList=t.authorizationList.map(n=>{const r=km(n);return{address:r.address,nonce:Wn(r.nonce),chainId:Wn(r.chainId),yParity:Wn(r.signature.yParity),r:Wn(r.signature.r),s:Wn(r.signature.s)}})),e}getRpcRequest(t){switch(t.method){case"chainId":return{method:"eth_chainId",args:[]};case"getBlockNumber":return{method:"eth_blockNumber",args:[]};case"getGasPrice":return{method:"eth_gasPrice",args:[]};case"getPriorityFee":return{method:"eth_maxPriorityFeePerGas",args:[]};case"getBalance":return{method:"eth_getBalance",args:[us(t.address),t.blockTag]};case"getTransactionCount":return{method:"eth_getTransactionCount",args:[us(t.address),t.blockTag]};case"getCode":return{method:"eth_getCode",args:[us(t.address),t.blockTag]};case"getStorage":return{method:"eth_getStorageAt",args:[us(t.address),"0x"+t.position.toString(16),t.blockTag]};case"broadcastTransaction":return{method:"eth_sendRawTransaction",args:[t.signedTransaction]};case"getBlock":if("blockTag"in t)return{method:"eth_getBlockByNumber",args:[t.blockTag,!!t.includeTransactions]};if("blockHash"in t)return{method:"eth_getBlockByHash",args:[t.blockHash,!!t.includeTransactions]};break;case"getTransaction":return{method:"eth_getTransactionByHash",args:[t.hash]};case"getTransactionReceipt":return{method:"eth_getTransactionReceipt",args:[t.hash]};case"call":return{method:"eth_call",args:[this.getRpcTransaction(t.transaction),t.blockTag]};case"estimateGas":return{method:"eth_estimateGas",args:[this.getRpcTransaction(t.transaction)]};case"getLogs":return t.filter&&t.filter.address!=null&&(Array.isArray(t.filter.address)?t.filter.address=t.filter.address.map(us):t.filter.address=us(t.filter.address)),{method:"eth_getLogs",args:[t.filter]}}return null}getRpcError(t,e){const{method:n}=t,{error:r}=e;if(n==="eth_estimateGas"&&r.message){const o=r.message;if(!o.match(/revert/i)&&o.match(/insufficient funds/i))return Ee("insufficient funds","INSUFFICIENT_FUNDS",{transaction:t.params[0],info:{payload:t,error:r}});if(o.match(/nonce/i)&&o.match(/too low/i))return Ee("nonce has already been used","NONCE_EXPIRED",{transaction:t.params[0],info:{payload:t,error:r}})}if(n==="eth_call"||n==="eth_estimateGas"){const o=Cu(r),l=Is.getBuiltinCallException(n==="eth_call"?"call":"estimateGas",t.params[0],o?o.data:null);return l.info={error:r,payload:t},l}const s=JSON.stringify(cT(r));if(typeof r.message=="string"&&r.message.match(/user denied|ethers-user-denied/i))return Ee("user rejected action","ACTION_REJECTED",{action:{eth_sign:"signMessage",personal_sign:"signMessage",eth_signTypedData_v4:"signTypedData",eth_signTransaction:"signTransaction",eth_sendTransaction:"sendTransaction",eth_requestAccounts:"requestAccess",wallet_requestAccounts:"requestAccess"}[n]||"unknown",reason:"rejected",info:{payload:t,error:r}});if(n==="eth_sendRawTransaction"||n==="eth_sendTransaction"){const o=t.params[0];if(s.match(/insufficient funds|base fee exceeds gas limit/i))return Ee("insufficient funds for intrinsic transaction cost","INSUFFICIENT_FUNDS",{transaction:o,info:{error:r}});if(s.match(/nonce/i)&&s.match(/too low/i))return Ee("nonce has already been used","NONCE_EXPIRED",{transaction:o,info:{error:r}});if(s.match(/replacement transaction/i)&&s.match(/underpriced/i))return Ee("replacement fee too low","REPLACEMENT_UNDERPRICED",{transaction:o,info:{error:r}});if(s.match(/only replay-protected/i))return Ee("legacy pre-eip-155 transactions not supported","UNSUPPORTED_OPERATION",{operation:n,info:{transaction:o,info:{error:r}}})}let a=!!s.match(/the method .* does not exist/i);return a||r&&r.details&&r.details.startsWith("Unauthorized method:")&&(a=!0),a?Ee("unsupported operation","UNSUPPORTED_OPERATION",{operation:t.method,info:{error:r,payload:t}}):Ee("could not coalesce error","UNKNOWN_ERROR",{error:r,payload:t})}send(t,e){if(this.destroyed)return Promise.reject(Ee("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:t}));const n=this.#e++,r=new Promise((s,a)=>{this.#n.push({resolve:s,reject:a,payload:{method:t,params:e,id:n,jsonrpc:"2.0"}})});return this.#o(),r}async getSigner(t){t==null&&(t=0);const e=this.send("eth_accounts",[]);if(typeof t=="number"){const r=await e;if(t>=r.length)throw new Error("no such account");return new gc(this,r[t])}const{accounts:n}=await ln({network:this.getNetwork(),accounts:e});t=ue(t);for(const r of n)if(ue(r)===t)return new gc(this,t);throw new Error("invalid account")}async listAccounts(){return(await this.send("eth_accounts",[])).map(e=>new gc(this,e))}destroy(){this.#i&&(clearTimeout(this.#i),this.#i=null);for(const{payload:t,reject:e}of this.#n)e(Ee("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:t.method}));this.#n=[],super.destroy()}}class lT extends oT{#t;constructor(t,e){super(t,e);let n=this._getOption("pollingInterval");n==null&&(n=Ug.pollingInterval),this.#t=n}_getSubscriber(t){const e=super._getSubscriber(t);return ep(e)&&(e.pollingInterval=this.#t),e}get pollingInterval(){return this.#t}set pollingInterval(t){if(!Number.isInteger(t)||t<0)throw new Error("invalid interval");this.#t=t,this._forEachSubscriber(e=>{ep(e)&&(e.pollingInterval=this.#t)})}}function Cu(i){if(i==null)return null;if(typeof i.message=="string"&&i.message.match(/revert/i)&&_e(i.data))return{message:i.message,data:i.data};if(typeof i=="object"){for(const t in i){const e=Cu(i[t]);if(e)return e}return null}if(typeof i=="string")try{return Cu(JSON.parse(i))}catch{}return null}function Ru(i,t){if(i!=null){if(typeof i.message=="string"&&t.push(i.message),typeof i=="object")for(const e in i)Ru(i[e],t);if(typeof i=="string")try{return Ru(JSON.parse(i),t)}catch{}}}function cT(i){const t=[];return Ru(i,t),t}class br extends lT{#t;#e;constructor(t,e,n){const r=Object.assign({},n??{},{batchMaxCount:1});F(t&&t.request,"invalid EIP-1193 provider","ethereum",t),super(e,r),this.#e=null,n&&n.providerInfo&&(this.#e=n.providerInfo),this.#t=async(s,a)=>{const o={method:s,params:a};this.emit("debug",{action:"sendEip1193Request",payload:o});try{const l=await t.request(o);return this.emit("debug",{action:"receiveEip1193Result",result:l}),l}catch(l){const c=new Error(l.message);throw c.code=l.code,c.data=l.data,c.payload=o,this.emit("debug",{action:"receiveEip1193Error",error:c}),c}}}get providerInfo(){return this.#e}async send(t,e){return await this._start(),await super.send(t,e)}async _send(t){F(!Array.isArray(t),"EIP-1193 does not support batch request","payload",t);try{const e=await this.#t(t.method,t.params||[]);return[{id:t.id,result:e}]}catch(e){return[{id:t.id,error:{code:e.code,data:e.data,message:e.message}}]}}getRpcError(t,e){switch(e=JSON.parse(JSON.stringify(e)),e.error.code||-1){case 4001:e.error.message=`ethers-user-denied: ${e.error.message}`;break;case 4200:e.error.message=`ethers-unsupported: ${e.error.message}`;break}return super.getRpcError(t,e)}async hasSigner(t){t==null&&(t=0);const e=await this.send("eth_accounts",[]);return typeof t=="number"?e.length>t:(t=t.toLowerCase(),e.filter(n=>n.toLowerCase()===t).length!==0)}async getSigner(t){if(t==null&&(t=0),!await this.hasSigner(t))try{await this.#t("eth_requestAccounts",[])}catch(e){const n=e.payload;throw this.getRpcError(n,{id:n.id,error:e})}return await super.getSigner(t)}static async discover(t){if(t==null&&(t={}),t.provider)return new br(t.provider);const e=t.window?t.window:typeof window<"u"?window:null;if(e==null)return null;const n=t.anyProvider;if(n&&e.ethereum)return new br(e.ethereum);if(!("addEventListener"in e&&"dispatchEvent"in e&&"removeEventListener"in e))return null;const r=t.timeout?t.timeout:300;return r===0?null:await new Promise((s,a)=>{let o=[];const l=h=>{o.push(h.detail),n&&c()},c=()=>{if(clearTimeout(u),o.length)if(t&&t.filter){const h=t.filter(o.map(f=>Object.assign({},f.info)));if(h==null)s(null);else if(h instanceof br)s(h);else{let f=null;if(h.uuid&&(f=o.filter(g=>h.uuid===g.info.uuid)[0]),f){const{provider:d,info:g}=f;s(new br(d,void 0,{providerInfo:g}))}else a(Ee("filter returned unknown info","UNSUPPORTED_OPERATION",{value:h}))}}else{const{provider:h,info:f}=o[0];s(new br(h,void 0,{providerInfo:f}))}else s(null);e.removeEventListener("eip6963:announceProvider",l)},u=setTimeout(()=>{c()},r);e.addEventListener("eip6963:announceProvider",l),e.dispatchEvent(new Event("eip6963:requestProvider"))})}}const uT=JSON.parse('[{"inputs":[{"internalType":"uint256","name":"initialMintPrice","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[],"name":"EmptyVisualCode","type":"error"},{"inputs":[{"internalType":"uint256","name":"expected","type":"uint256"},{"internalType":"uint256","name":"received","type":"uint256"}],"name":"IncorrectMintPayment","type":"error"},{"inputs":[],"name":"InvalidContentHash","type":"error"},{"inputs":[],"name":"NotTokenController","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"inputs":[],"name":"TasteProfileTooLarge","type":"error"},{"inputs":[],"name":"VisualCodeTooLarge","type":"error"},{"inputs":[],"name":"WithdrawalFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"rendererVersion","type":"uint32"}],"name":"MemoryMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"rendererVersion","type":"uint32"}],"name":"MemoryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"previousPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"MintPriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_TASTE_PROFILE_BYTES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_VISUAL_CODE_BYTES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getMemory","outputs":[{"components":[{"internalType":"string","name":"visualCode","type":"string"},{"internalType":"string","name":"tasteProfile","type":"string"},{"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"internalType":"uint32","name":"rendererVersion","type":"uint32"},{"internalType":"uint64","name":"mintedAt","type":"uint64"},{"internalType":"uint64","name":"updatedAt","type":"uint64"}],"internalType":"struct PapagedonVisualMemory.VisualMemory","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"metadataUri","type":"string"},{"internalType":"string","name":"visualCode","type":"string"},{"internalType":"string","name":"tasteProfile","type":"string"},{"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"internalType":"uint32","name":"rendererVersion","type":"uint32"}],"name":"mintMemory","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"metadataUri","type":"string"},{"internalType":"string","name":"visualCode","type":"string"},{"internalType":"string","name":"tasteProfile","type":"string"},{"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"internalType":"uint32","name":"rendererVersion","type":"uint32"}],"name":"updateMemory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"recipient","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'),fT={abi:uT},Pu="0x279f",hT={chainId:Pu,chainName:"Monad Testnet",nativeCurrency:{name:"Monad",symbol:"MON",decimals:18},rpcUrls:[Es.rpcUrl],blockExplorerUrls:[Es.explorerUrl]};async function dT(i){if(await i.request({method:"eth_chainId"})!==Pu)try{await i.request({method:"wallet_switchEthereumChain",params:[{chainId:Pu}]})}catch(e){if(e.code!==4902)throw e;await i.request({method:"wallet_addEthereumChain",params:[hT]})}}async function FT(){const i=window.ethereum;if(!i)throw new Error("No browser wallet detected. Install or open an EVM wallet first.");await i.request({method:"eth_requestAccounts"}),await dT(i);const t=new br(i),e=await t.getSigner(),n=await e.getAddress(),r=await t.getBalance(n);return{provider:t,signer:e,address:n,balance:sm(r)}}function pT({pack:i,sensitivity:t,autoMode:e,styleBrief:n}){const r=JSON.stringify({schema:"papagedon.visual.v1",rendererVersion:1,pack:{id:i.id,name:i.name,wave:i.wave,shaderMode:i.shaderMode,lift:i.lift,tilt:i.tilt,compression:i.compression,warp:i.warp,reflection:i.reflection,socket:i.socket,glowColor:i.glowColor??null},audioMapping:{bass:"surface-lift-and-impact",mids:"material-motion",treble:"edge-light-and-detail",sensitivity:t},playbackMode:e?"adaptive-auto":"manual"}),s=JSON.stringify({schema:"papagedon.taste.v1",styleBrief:n.trim(),preferredPack:i.id,preferredSensitivity:t,preferredMode:e?"auto":"manual"}),a=Fe(Qn(`${r}\0${s}`)),o={name:`Papagedon Visual Memory: ${i.name}`,description:"A user-owned visual recipe and taste memory interpreted by Papagedon AEI.",external_url:"https://www.papagedon.com/monad",attributes:[{trait_type:"Renderer schema",value:"papagedon.visual.v1"},{trait_type:"Visual pack",value:i.name},{trait_type:"Wave system",value:i.wave},{trait_type:"Mode",value:e?"Adaptive Auto":"Manual"},{trait_type:"Renderer version",value:1}]};return{metadataUri:`data:application/json;base64,${gT(Qn(JSON.stringify(o)))}`,visualCode:r,tasteProfile:s,contentHash:a,rendererVersion:1}}async function mT(i,t,e){const n=new sa(t,fT.abi,i),r=await n.mintPrice(),s=await n.mintMemory(e.metadataUri,e.visualCode,e.tasteProfile,e.contentHash,e.rendererVersion,{value:r}),a=await s.wait();let o=null;for(const l of a.logs)try{const c=n.interface.parseLog(l);c?.name==="MemoryMinted"&&(o=c.args.tokenId)}catch{}if(o===null)throw new Error("Mint succeeded but the token ID was not found.");return{tokenId:o,transactionHash:s.hash,mintPrice:sm(r)}}function gT(i){let t="";for(const e of i)t+=String.fromCharCode(e);return btoa(t)}const yT={},xT=yT?.VITE_ENVIO_GRAPHQL_URL,_T=`
  query LatestVisualMemory($owner: String!) {
    VisualMemory(
      where: { owner: { _eq: $owner } }
      order_by: { updatedAt: desc }
      limit: 1
    ) {
      id
      owner
      contentHash
      rendererVersion
      mintedAt
      updatedAt
    }
  }
`;async function vT(i,t=xT){if(!t)return{configured:!1,memory:null};const e=await fetch(t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({query:_T,variables:{owner:i.toLowerCase()}})}),n=await e.json();if(!e.ok||n.errors)throw new Error(n.errors?.[0]?.message||"Envio memory lookup failed.");return{configured:!0,memory:n.data?.VisualMemory?.[0]||null}}const bT={},wT=bT?.VITE_NANSEN_PROFILE_URL||"/api/integrations/nansen-profile";async function AT(i,t=wT){const e=await fetch(`${t}?address=${encodeURIComponent(i)}`,{headers:{accept:"application/json"}});if(!e.ok){const n=await e.json().catch(()=>({}));throw new Error(n.message||`Nansen profile request failed (${e.status}).`)}return e.json()}const ST=document.querySelector("#app"),ET=Nn.map(i=>`<option value="${i.id}">${i.name}</option>`).join("");ST.innerHTML=`
  <section class="shell">
    <canvas id="visualizer" aria-label="Papageddon live nanotech visualizer"></canvas>
    <img class="brand-mark" src="/monad/assets/papagedon-mark.png" alt="Papagedon" />
    <aside class="panel">
      <span class="panel-trigger" aria-hidden="true"></span>
      <div class="panel-content">
      <header class="panel-header">
        <div><span class="live-dot"></span> Live visual</div>
        <span>Monad testnet</span>
      </header>

      <div class="track-player">
        <div class="track-heading"><span>Audio Track</span><b id="trackState">none</b></div>
        <input id="trackFile" type="file" accept="audio/*" hidden>
        <div class="track-actions">
          <button id="selectTrackButton" type="button">Choose Track</button>
          <button id="playTrackButton" type="button" disabled>Play</button>
        </div>
        <p id="trackName">No track selected</p>
        <div class="track-timeline">
          <span id="trackTime">0:00</span>
          <input id="trackSeek" type="range" min="0" max="1000" value="0" aria-label="Seek in track" disabled>
          <span id="trackDuration">0:00</span>
        </div>
        <audio id="trackAudio" preload="metadata"></audio>
      </div>

      <button id="listenButton" class="primary" type="button">Start Microphone</button>

      <div class="mode-switch" role="group" aria-label="Visualizer mode">
        <button id="autoModeButton" type="button" aria-pressed="true">Auto</button>
        <button id="manualModeButton" type="button" aria-pressed="false">Manual</button>
      </div>

      <div class="status-grid">
        <span>Input</span><b id="listenState">idle</b>
        <span>Music lock</span><b id="musicLock">waiting</b>
        <span>Impact</span><b id="impactState">ready</b>
        <span>Render pack</span><b id="packState">Nano Hex Genesis</b>
        <span>Network</span><b>${Es.name}</b>
      </div>

      <div class="pack-switch">
        <label for="packSelect">Visual Pack</label>
        <select id="packSelect">${ET}</select>
      </div>

      <div class="meters">
        <label>Bass <i id="bassMeter"></i></label>
        <label>Mid <i id="midMeter"></i></label>
        <label>Treble <i id="trebleMeter"></i></label>
        <label>Energy <i id="energyMeter"></i></label>
      </div>

      <div class="sensitivity-control">
        <label for="sensitivity">Sensitivity <output id="sensitivityValue" for="sensitivity">1.2x</output></label>
        <input id="sensitivity" type="range" min="0.7" max="2" step="0.1" value="1.2">
      </div>

      <div class="composer">
        <label for="packPrompt">Custom Pack Style</label>
        <textarea id="packPrompt">Generate a high-definition nanotech hex pack with black chrome plates, layered graphite reflections, and subtle light moving beneath the surface.</textarea>
        <button id="quoteButton" type="button">Preview Testnet Quote</button>
        <p id="quoteOutput" role="status">Payment and minting are not connected yet.</p>
      </div>

      <section class="chain-actions" aria-label="Monad deployment">
        <div class="chain-heading"><span>Visual Memory NFT</span><b>Testnet only</b></div>
        <div id="dynamicWalletRoot" class="dynamic-wallet-root">
          <button id="connectWalletButton" type="button">Connect with Dynamic</button>
        </div>
        <button id="deployContractButton" type="button" disabled>Deployed</button>
        <button id="mintMemoryButton" class="mint-action" type="button" disabled>Mint Visual Memory · 0.2 MON</button>
        <p id="chainOutput" role="status">Contract: ${Es.visualMemoryContract}</p>
        <div class="integration-status" aria-label="Sponsor integrations">
          <span>Dynamic</span><b id="dynamicStatus">checking</b>
          <span>Alchemy</span><b id="alchemyStatus">RPC ready</b>
          <span>Envio</span><b id="envioStatus">waiting</b>
          <span>Nansen AI</span><b id="nansenStatus">waiting</b>
        </div>
      </section>
      </div>
    </aside>
  </section>
`;const MT=document.querySelector("#visualizer"),_f=Aw(MT),xn=document.querySelector("#trackAudio"),fi=jg(xn),aa=document.querySelector("#listenButton"),Nr=document.querySelector("#listenState"),TT=document.querySelector("#musicLock"),np=document.querySelector("#impactState"),CT=document.querySelector("#packState"),Oi=document.querySelector("#packSelect"),Ro=document.querySelector("#trackFile"),RT=document.querySelector("#selectTrackButton"),Lr=document.querySelector("#playTrackButton"),Ii=document.querySelector("#trackState"),Iu=document.querySelector("#trackName"),Cr=document.querySelector("#trackSeek"),Dg=document.querySelector("#trackTime"),Fg=document.querySelector("#trackDuration"),PT=document.querySelector("#quoteButton"),IT=document.querySelector("#quoteOutput"),Ko=document.querySelector("#packPrompt"),Po=document.querySelector("#sensitivity"),NT=document.querySelector("#sensitivityValue"),Og=document.querySelector("#autoModeButton"),Bg=document.querySelector("#manualModeButton"),LT=document.querySelector("#deployContractButton"),ea=document.querySelector("#mintMemoryButton"),Rr=document.querySelector("#chainOutput"),vf=document.querySelector("#dynamicStatus"),UT=document.querySelector("#alchemyStatus"),ip=document.querySelector("#envioStatus"),rp=document.querySelector("#nansenStatus"),sp=document.querySelector("#dynamicWalletRoot"),bf=Mw(Nn);let Nu=null;const yo={bass:document.querySelector("#bassMeter"),mid:document.querySelector("#midMeter"),treble:document.querySelector("#trebleMeter"),energy:document.querySelector("#energyMeter")};let oa=!1,ap=-1e3,op=0,wf=!0;bf.start(performance.now(),Oi.value);Po.addEventListener("input",()=>{fi.setSensitivity(Po.value),NT.value=`${Number(Po.value).toFixed(1)}x`});function dl(i){wf=i,Og.setAttribute("aria-pressed",String(i)),Bg.setAttribute("aria-pressed",String(!i)),i&&bf.start(performance.now(),Oi.value)}function pl(i){Oi.value=i;const t=_f.setVariant(i);CT.textContent=t.name}Og.addEventListener("click",()=>dl(!0));Bg.addEventListener("click",()=>dl(!1));Oi.addEventListener("change",()=>{dl(!1),pl(Oi.value)});window.addEventListener("keydown",i=>{if(!["ArrowLeft","ArrowRight"].includes(i.key)||i.altKey||i.ctrlKey||i.metaKey||i.target instanceof Element&&i.target.closest("input, textarea, select, [contenteditable]"))return;i.preventDefault();const t=Nn.findIndex(r=>r.id===Oi.value),e=i.key==="ArrowRight"?1:-1,n=Nn[(t+e+Nn.length)%Nn.length];dl(!1),pl(n.id)});function lp(i){if(!Number.isFinite(i))return"0:00";const t=Math.floor(i);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function ml(){const i=xn.duration;Dg.textContent=lp(xn.currentTime),Fg.textContent=lp(i),Cr.disabled=!Number.isFinite(i)||i<=0,Cr.matches(":active")||(Cr.value=Cr.disabled?0:Math.round(xn.currentTime/i*1e3))}function xo(i,t){i.style.setProperty("--value",`${Math.round(t*100)}%`)}function kg(){const i=fi.sample();if(wf){const e=bf.maybeNext(performance.now(),i.beat,Oi.value);e&&pl(e)}_f.render(i),xo(yo.bass,i.bass),xo(yo.mid,i.mid),xo(yo.treble,i.treble),xo(yo.energy,i.energy),TT.textContent=i.musicDetected?"active":"waiting",i.beat>.72&&op<=.72&&(ap=performance.now()),op=i.beat;const t=performance.now()-ap<210;np.textContent=t?"hit":"ready",np.classList.toggle("active",t),requestAnimationFrame(kg)}aa.addEventListener("click",async()=>{if(oa){await fi.stop(),oa=!1,aa.textContent="Start Microphone",Nr.textContent="idle",Ii.textContent=xn.src?"ready":"none";return}fi.pauseFile(),Lr.textContent="Play";try{await fi.start(),oa=!0,aa.textContent="Stop Microphone",Nr.textContent="microphone",Ii.textContent=xn.src?"paused":"none"}catch{Nr.textContent="mic unavailable",Ii.textContent=xn.src?"ready":"none"}});RT.addEventListener("click",()=>Ro.click());Ro.addEventListener("change",async()=>{const i=Ro.files?.[0];if(i){try{await fi.loadFile(i),oa=!1,aa.textContent="Start Microphone",Nr.textContent="idle",Ii.textContent="ready",Iu.textContent=i.name,Lr.disabled=!1,Lr.textContent="Play",Cr.value=0,Dg.textContent="0:00",Fg.textContent="0:00"}catch(t){Ii.textContent="error",Iu.textContent=t.message}Ro.value=""}});Lr.addEventListener("click",async()=>{if(!xn.paused){fi.pauseFile(),Lr.textContent="Play",Ii.textContent="paused",Nr.textContent="idle";return}try{await fi.playFile(),oa=!1,aa.textContent="Start Microphone",Lr.textContent="Pause",Ii.textContent="playing",Nr.textContent="track"}catch(i){Ii.textContent="error",Iu.textContent=i.message}});Cr.addEventListener("input",()=>{Number.isFinite(xn.duration)&&(xn.currentTime=xn.duration*Number(Cr.value)/1e3,ml())});xn.addEventListener("timeupdate",ml);xn.addEventListener("loadedmetadata",ml);xn.addEventListener("ended",()=>{fi.pauseFile(),Lr.textContent="Play",Ii.textContent="ready",Nr.textContent="idle",ml()});window.addEventListener("pagehide",()=>{fi.dispose()});PT.addEventListener("click",()=>{const i=Cw(Ko.value);IT.textContent=`Preview: ${i.price} testnet MON for "${i.packName}". No payment is being requested.`});async function Gg(i){Nu=i;const t=`${i.address.slice(0,6)}...${i.address.slice(-4)}`;ea.disabled=!1,vf.textContent=i.authentication==="dynamic"?"authenticated":"fallback",UT.textContent=`${Number(i.balance).toFixed(3)} MON`,Rr.textContent=`${t} connected. Restoring onchain Visual DNA...`;const[e,n]=await Promise.allSettled([vT(i.address),AT(i.address)]);if(e.status==="fulfilled"){const{configured:r,memory:s}=e.value;ip.textContent=r?s?`memory #${s.id}`:"new identity":"add endpoint"}else ip.textContent="unavailable";if(n.status==="fulfilled"){const r=n.value.visualDNA;rp.textContent=`${n.value.labels.length} signals`,r?.preferredPack&&Nn.some(s=>s.id===r.preferredPack)&&(Oi.value=r.preferredPack,pl(r.preferredPack)),r?.styleBrief&&(Ko.value=r.styleBrief)}else rp.textContent="add API key";Rr.textContent=`${t} ready. Envio memory and Nansen Visual DNA sync completed.`}function Hg(i){vf.textContent="error",Rr.textContent=i.shortMessage||i.message}vf.textContent="needs env ID";document.querySelector("#connectWalletButton").addEventListener("click",async()=>{sp.innerHTML='<span class="wallet-loading">Loading secure wallet...</span>';const{mountDynamicWallet:i}=await Zg(async()=>{const{mountDynamicWallet:t}=await import("./wallet-bridge-BX5M9b9x.js").then(e=>e.ed);return{mountDynamicWallet:t}},[]);i(sp,{onSession:Gg,onError:Hg,autoOpen:!0})});window.addEventListener("papagedon:wallet-session",async i=>{try{await Gg(i.detail)}catch(t){Hg(t)}});LT.addEventListener("click",async()=>{});ea.addEventListener("click",async()=>{if(!Nu)return;const i=Ko.value.trim();if(!i){Rr.textContent="Describe your visual taste before minting.",Ko.focus();return}const t=Nn.find(n=>n.id===Oi.value),e=pT({pack:t,sensitivity:Number(Po.value),autoMode:wf,styleBrief:i});ea.disabled=!0,Rr.textContent="Confirm the 0.2 testnet MON mint in your wallet...";try{const n=await mT(Nu.signer,Es.visualMemoryContract,e);ea.textContent=`Minted Memory #${n.tokenId}`,Rr.textContent=`Visual Memory #${n.tokenId} minted. Transaction: ${n.transactionHash}`}catch(n){ea.disabled=!1,Rr.textContent=n.shortMessage||n.message}});_f.resize();kg();export{Zg as _,FT as c};
