(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();const S0="modulepreload",E0=function(i){return"/monad/"+i},of={},T0=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=a?.nonce||a?.getAttribute("nonce");r=c(e.map(l=>{if(l=E0(l),l in of)return;of[l]=!0;const u=l.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":S0,u||(f.as="script"),f.crossOrigin="",f.href=l,o&&f.setAttribute("nonce",o),document.head.appendChild(f),u)return new Promise((d,g)=>{f.addEventListener("load",d),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})},C0={energy:0,intensity:0,bass:0,mid:0,treble:0,pulse:0,beat:0,musicDetected:!1};function R0(i){let t,e,n,r,s,a=!1,o,c,l,u=0,h=0,f=0,d=0,g=-1e3,y=1.2;function m(N){y=Math.min(2,Math.max(.7,Number(N)||1))}function p(){t||(t=new AudioContext({latencyHint:"interactive"}),e=t.createAnalyser(),e.fftSize=2048,e.smoothingTimeConstant=.5,l=new Uint8Array(e.frequencyBinCount))}function b(){u=0,h=0,f=0,d=0,g=-1e3}async function S(){await v(),p(),await t.resume?.(),n=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1}}),r=t.createMediaStreamSource(n),r.connect(e),c="microphone"}async function v(){n?.getTracks().forEach(N=>N.stop()),n=void 0,r?.disconnect(),r=void 0,i?.pause(),a&&(s.disconnect(),a=!1),c=void 0,b()}async function M(N){if(!i)throw new Error("Audio player is unavailable.");if(N.type&&!N.type.startsWith("audio/"))throw new Error("Choose an audio file.");await v(),o&&URL.revokeObjectURL(o),o=URL.createObjectURL(N),i.src=o,i.load()}async function w(){if(!i?.src)throw new Error("Choose an audio file first.");c==="microphone"&&await v(),p(),s||(s=t.createMediaElementSource(i)),a||(s.connect(e),s.connect(t.destination),a=!0),i.ended&&(i.currentTime=0),await t.resume?.(),await i.play(),c="file"}function T(){i?.pause(),b()}async function x(){await v(),o&&URL.revokeObjectURL(o),t&&await t.close()}function E(N,U){if(!l)return 0;let L=0,P=0;for(let I=N;I<U;I+=1)L+=l[I]??0,P+=1;return P?L/P/255:0}function R(){if(!e||!l||!c||c==="file"&&i.paused)return C0;e.getByteFrequencyData(l);const N=E(2,10)*.7+E(10,22)*.3,U=E(12,86),L=E(86,l.length),P=Math.min(1,N*.42+U*.38+L*.28),I=Math.min(1,N*y),D=Math.min(1,U*y),G=Math.min(1,L*y),Y=Math.min(1,P*y),V=Math.min(1,Y*1.4),Q=performance.now(),Z=Math.max(0,N-h),at=Math.max(0,P-u),ot=N>.08&&(Z>.018/y||at>.028/y)&&N-f>.008/y&&Q-g>180,Ot=Math.min(1,Z*5*y),Nt=ot?1:Math.max(0,d-.1);return ot&&(g=Q),u=u*.9+P*.1,h=h*.88+N*.12,f=N,d=Nt,{energy:Y,intensity:V,bass:I,mid:D,treble:G,pulse:Ot,beat:Nt,musicDetected:P>.06||N>.09}}return{start:S,stop:v,loadFile:M,playFile:w,pauseFile:T,dispose:x,sample:R,setSensitivity:m}}const th="186",P0=0,cf=1,I0=2,No=1,N0=2,ca=3,zr=0,Mn=1,An=2,Ui=0,pa=1,Wo=2,lf=3,uf=4,L0=5,vs=100,U0=101,D0=102,F0=103,O0=104,B0=200,k0=201,G0=202,H0=203,Up=204,Dp=205,z0=206,V0=207,W0=208,X0=209,q0=210,K0=211,Y0=212,J0=213,Q0=214,Bl=0,kl=1,Gl=2,ba=3,Hl=4,zl=5,Vl=6,Wl=7,Fp=0,Z0=1,$0=2,gi=0,Op=1,Bp=2,kp=3,eh=4,Gp=5,Hp=6,zp=7,Vp=300,Vr=301,Ns=302,kc=303,Gc=304,dc=306,Xl=1e3,Ii=1001,ql=1002,rn=1003,j0=1004,qa=1005,cn=1006,Hc=1007,Rr=1008,Ln=1009,Wp=1010,Xp=1011,wa=1012,nh=1013,xi=1014,ti=1015,_i=1016,ih=1017,rh=1018,Aa=1020,qp=35902,Kp=35899,Yp=1021,Jp=1022,ei=1023,ki=1026,Pr=1027,sh=1028,ah=1029,Wr=1030,oh=1031,ch=1033,Lo=33776,Uo=33777,Do=33778,Fo=33779,Kl=35840,Yl=35841,Jl=35842,Ql=35843,Zl=36196,$l=37492,jl=37496,tu=37488,eu=37489,Xo=37490,nu=37491,iu=37808,ru=37809,su=37810,au=37811,ou=37812,cu=37813,lu=37814,uu=37815,hu=37816,fu=37817,du=37818,pu=37819,mu=37820,gu=37821,yu=36492,xu=36494,_u=36495,vu=36283,bu=36284,qo=36285,wu=36286,ty=3200,Au=0,ey=1,lr="",In="srgb",Ko="srgb-linear",Yo="linear",ge="srgb",zc=7680,ny=519,iy=512,ry=513,sy=514,lh=515,ay=516,oy=517,uh=518,cy=519,ly=35044,Or=35048,hf="300 es",pi=2e3,Ma=2001;function uy(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Jo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hy(){const i=Jo("canvas");return i.style.display="block",i}const ff={};function df(...i){const t="THREE."+i.shift();console.log(t,...i)}function Qp(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Bt(...i){i=Qp(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function ce(...i){i=Qp(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Es(...i){const t=i.join(" ");t in ff||(ff[t]=!0,Bt(...i))}function fy(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}const dy={[Bl]:kl,[Gl]:Vl,[Hl]:Wl,[ba]:zl,[kl]:Bl,[Vl]:Gl,[Wl]:Hl,[zl]:ba};class Jr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const r=n[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vc=Math.PI/180,Mu=180/Math.PI;function Ua(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]+"-"+an[t&255]+an[t>>8&255]+"-"+an[t>>16&15|64]+an[t>>24&255]+"-"+an[e&63|128]+an[e>>8&255]+"-"+an[e>>16&255]+an[e>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function ee(i,t,e){return Math.max(t,Math.min(e,i))}function py(i,t){return(i%t+t)%t}function Wc(i,t,e){return(1-e)*i+e*t}function Ys(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Xh=class Xh{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Xh.prototype.isVector2=!0;let qt=Xh;class Vs{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],h=n[r+3],f=s[a+0],d=s[a+1],g=s[a+2],y=s[a+3];if(h!==y||c!==f||l!==d||u!==g){let m=c*f+l*d+u*g+h*y;m<0&&(f=-f,d=-d,g=-g,y=-y,m=-m);let p=1-o;if(m<.9995){const b=Math.acos(m),S=Math.sin(b);p=Math.sin(p*b)/S,o=Math.sin(o*b)/S,c=c*p+f*o,l=l*p+d*o,u=u*p+g*o,h=h*p+y*o}else{c=c*p+f*o,l=l*p+d*o,u=u*p+g*o,h=h*p+y*o;const b=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=b,l*=b,u*=b,h*=b}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],h=s[a],f=s[a+1],d=s[a+2],g=s[a+3];return t[e]=o*g+u*h+c*d-l*f,t[e+1]=c*g+u*f+l*h-o*d,t[e+2]=l*g+u*d+o*f-c*h,t[e+3]=u*g-o*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),h=o(s/2),f=c(n/2),d=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:Bt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(a-r)*d}else if(n>o&&n>h){const d=2*Math.sqrt(1+n-o-h);this._w=(u-c)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+l)/d}else if(o>h){const d=2*Math.sqrt(1+o-n-h);this._w=(s-l)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-o);this._w=(a-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,r=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+n*e,this._y=this._y*c+r*e,this._z=this._z*c+s*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+r*e,this._z=this._z*c+s*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const qh=class qh{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(pf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(pf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*r-o*n),u=2*(o*e-s*r),h=2*(s*n-a*e);return this.x=e+c*l+a*h-o*u,this.y=n+c*u+o*l-s*h,this.z=r+c*h+s*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Xc.copy(this).projectOnVector(t),this.sub(Xc)}reflect(t){return this.sub(Xc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};qh.prototype.isVector3=!0;let H=qh;const Xc=new H,pf=new Vs,Kh=class Kh{constructor(t,e,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,c,l)}set(t,e,n,r,s,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],y=r[0],m=r[3],p=r[6],b=r[1],S=r[4],v=r[7],M=r[2],w=r[5],T=r[8];return s[0]=a*y+o*b+c*M,s[3]=a*m+o*S+c*w,s[6]=a*p+o*v+c*T,s[1]=l*y+u*b+h*M,s[4]=l*m+u*S+h*w,s[7]=l*p+u*v+h*T,s[2]=f*y+d*b+g*M,s[5]=f*m+d*S+g*w,s[8]=f*p+d*v+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,f=o*c-u*s,d=l*s-a*c,g=e*h+n*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return t[0]=h*y,t[1]=(r*l-u*n)*y,t[2]=(o*n-r*a)*y,t[3]=f*y,t[4]=(u*e-r*c)*y,t[5]=(r*s-o*e)*y,t[6]=d*y,t[7]=(n*c-l*e)*y,t[8]=(a*e-n*s)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-r*l,r*c,-r*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Es("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qc.makeScale(t,e)),this}rotate(t){return Es("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qc.makeRotation(-t)),this}translate(t,e){return Es("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Kh.prototype.isMatrix3=!0;let Vt=Kh;const qc=new Vt,mf=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gf=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function my(){const i={enabled:!0,workingColorSpace:Ko,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ge&&(r.r=Di(r.r),r.g=Di(r.g),r.b=Di(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ge&&(r.r=Ts(r.r),r.g=Ts(r.g),r.b=Ts(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===lr?Yo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Es("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Es("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ko]:{primaries:t,whitePoint:n,transfer:Yo,toXYZ:mf,fromXYZ:gf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:t,whitePoint:n,transfer:ge,toXYZ:mf,fromXYZ:gf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),i}const ne=my();function Di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ts(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let is;class gy{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{is===void 0&&(is=Jo("canvas")),is.width=t.width,is.height=t.height;const r=is.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),n=is}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Jo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Di(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Di(e[n]/255)*255):e[n]=Di(e[n]);return{data:e,width:t.width,height:t.height}}else return Bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let yy=0;class hh{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:yy++}),this.uuid=Ua(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Kc(r[a].image)):s.push(Kc(r[a]))}else s=Kc(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Kc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?gy.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Bt("Texture: Unable to serialize Texture."),{})}let xy=0;const Yc=new H;class xn extends Jr{constructor(t=xn.DEFAULT_IMAGE,e=xn.DEFAULT_MAPPING,n=Ii,r=Ii,s=cn,a=Rr,o=ei,c=Ln,l=xn.DEFAULT_ANISOTROPY,u=lr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xy++}),this.uuid=Ua(),this.name="",this.source=new hh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Yc).x}get height(){return this.source.getSize(Yc).y}get depth(){return this.source.getSize(Yc).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Bt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){Bt(`Texture.setValues(): property '${e}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xl:t.x=t.x-Math.floor(t.x);break;case Ii:t.x=t.x<0?0:1;break;case ql:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xl:t.y=t.y-Math.floor(t.y);break;case Ii:t.y=t.y<0?0:1;break;case ql:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=Vp;xn.DEFAULT_ANISOTROPY=1;const Yh=class Yh{constructor(t=0,e=0,n=0,r=1){this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,v=(d+1)/2,M=(p+1)/2,w=(u+f)/4,T=(h+y)/4,x=(g+m)/4;return S>v&&S>M?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=w/n,s=T/n):v>M?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=w/r,s=x/r):M<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(M),n=T/s,r=x/s),this.set(n,r,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-y)/b,this.z=(f-u)/b,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Yh.prototype.isVector4=!0;let Le=Yh;class _y extends Jr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e),this.textures=[];const r={width:t,height:e,depth:n.depth},s=new xn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:cn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const r=Object.assign({},t.textures[e].image);this.textures[e].source=new hh(r)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends _y{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Zp extends xn{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vy extends xn{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=rn,this.minFilter=rn,this.wrapR=Ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const fc=class fc{constructor(t,e,n,r,s,a,o,c,l,u,h,f,d,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,c,l,u,h,f,d,g,y,m)}set(t,e,n,r,s,a,o,c,l,u,h,f,d,g,y,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fc().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,r=1/rs.setFromMatrixColumn(t,0).length(),s=1/rs.setFromMatrixColumn(t,1).length(),a=1/rs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=a*u,d=a*h,g=o*u,y=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=d+g*l,e[5]=f-y*l,e[9]=-o*c,e[2]=y-f*l,e[6]=g+d*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*u,d=c*h,g=l*u,y=l*h;e[0]=f+y*o,e[4]=g*o-d,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=d*o-g,e[6]=y+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*u,d=c*h,g=l*u,y=l*h;e[0]=f-y*o,e[4]=-a*h,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*u,e[9]=y-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*u,d=a*h,g=o*u,y=o*h;e[0]=c*u,e[4]=g*l-d,e[8]=f*l+y,e[1]=c*h,e[5]=y*l+f,e[9]=d*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,d=a*l,g=o*c,y=o*l;e[0]=c*u,e[4]=y-f*h,e[8]=g*h+d,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=d*h+g,e[10]=f-y*h}else if(t.order==="XZY"){const f=a*c,d=a*l,g=o*c,y=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+y,e[5]=a*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=o*u,e[10]=y*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(by,t,wy)}lookAt(t,e,n){const r=this.elements;return Tn.subVectors(t,e),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),Ji.crossVectors(n,Tn),Ji.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),Ji.crossVectors(n,Tn)),Ji.normalize(),Ka.crossVectors(Tn,Ji),r[0]=Ji.x,r[4]=Ka.x,r[8]=Tn.x,r[1]=Ji.y,r[5]=Ka.y,r[9]=Tn.y,r[2]=Ji.z,r[6]=Ka.z,r[10]=Tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],y=n[6],m=n[10],p=n[14],b=n[3],S=n[7],v=n[11],M=n[15],w=r[0],T=r[4],x=r[8],E=r[12],R=r[1],N=r[5],U=r[9],L=r[13],P=r[2],I=r[6],D=r[10],G=r[14],Y=r[3],V=r[7],Q=r[11],Z=r[15];return s[0]=a*w+o*R+c*P+l*Y,s[4]=a*T+o*N+c*I+l*V,s[8]=a*x+o*U+c*D+l*Q,s[12]=a*E+o*L+c*G+l*Z,s[1]=u*w+h*R+f*P+d*Y,s[5]=u*T+h*N+f*I+d*V,s[9]=u*x+h*U+f*D+d*Q,s[13]=u*E+h*L+f*G+d*Z,s[2]=g*w+y*R+m*P+p*Y,s[6]=g*T+y*N+m*I+p*V,s[10]=g*x+y*U+m*D+p*Q,s[14]=g*E+y*L+m*G+p*Z,s[3]=b*w+S*R+v*P+M*Y,s[7]=b*T+S*N+v*I+M*V,s[11]=b*x+S*U+v*D+M*Q,s[15]=b*E+S*L+v*G+M*Z,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],y=t[7],m=t[11],p=t[15],b=c*d-l*f,S=o*d-l*h,v=o*f-c*h,M=a*d-l*u,w=a*f-c*u,T=a*h-o*u;return e*(y*b-m*S+p*v)-n*(g*b-m*M+p*w)+r*(g*S-y*M+p*T)-s*(g*v-y*w+m*T)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return e*(a*u-o*l)-n*(s*u-o*c)+r*(s*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],y=t[13],m=t[14],p=t[15],b=e*o-n*a,S=e*c-r*a,v=e*l-s*a,M=n*c-r*o,w=n*l-s*o,T=r*l-s*c,x=u*y-h*g,E=u*m-f*g,R=u*p-d*g,N=h*m-f*y,U=h*p-d*y,L=f*p-d*m,P=b*L-S*U+v*N+M*R-w*E+T*x;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/P;return t[0]=(o*L-c*U+l*N)*I,t[1]=(r*U-n*L-s*N)*I,t[2]=(y*T-m*w+p*M)*I,t[3]=(f*w-h*T-d*M)*I,t[4]=(c*R-a*L-l*E)*I,t[5]=(e*L-r*R+s*E)*I,t[6]=(m*v-g*T-p*S)*I,t[7]=(u*T-f*v+d*S)*I,t[8]=(a*U-o*R+l*x)*I,t[9]=(n*R-e*U-s*x)*I,t[10]=(g*w-y*v+p*b)*I,t[11]=(h*v-u*w-d*b)*I,t[12]=(o*E-a*N-c*x)*I,t[13]=(e*N-n*E+r*x)*I,t[14]=(y*S-g*M-m*b)*I,t[15]=(u*M-h*S+f*b)*I,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,u=a+a,h=o+o,f=s*l,d=s*u,g=s*h,y=a*u,m=a*h,p=o*h,b=c*l,S=c*u,v=c*h,M=n.x,w=n.y,T=n.z;return r[0]=(1-(y+p))*M,r[1]=(d+v)*M,r[2]=(g-S)*M,r[3]=0,r[4]=(d-v)*w,r[5]=(1-(f+p))*w,r[6]=(m+b)*w,r[7]=0,r[8]=(g+S)*T,r[9]=(m-b)*T,r[10]=(1-(f+y))*T,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let a=rs.set(r[0],r[1],r[2]).length();const o=rs.set(r[4],r[5],r[6]).length(),c=rs.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Wn.copy(this);const l=1/a,u=1/o,h=1/c;return Wn.elements[0]*=l,Wn.elements[1]*=l,Wn.elements[2]*=l,Wn.elements[4]*=u,Wn.elements[5]*=u,Wn.elements[6]*=u,Wn.elements[8]*=h,Wn.elements[9]*=h,Wn.elements[10]*=h,e.setFromRotationMatrix(Wn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,r,s,a,o=pi,c=!1){const l=this.elements,u=2*s/(e-t),h=2*s/(n-r),f=(e+t)/(e-t),d=(n+r)/(n-r);let g,y;if(c)g=s/(a-s),y=a*s/(a-s);else if(o===pi)g=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Ma)g=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=pi,c=!1){const l=this.elements,u=2/(e-t),h=2/(n-r),f=-(e+t)/(e-t),d=-(n+r)/(n-r);let g,y;if(c)g=1/(a-s),y=a/(a-s);else if(o===pi)g=-2/(a-s),y=-(a+s)/(a-s);else if(o===Ma)g=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};fc.prototype.isMatrix4=!0;let we=fc;const rs=new H,Wn=new we,by=new H(0,0,0),wy=new H(1,1,1),Ji=new H,Ka=new H,Tn=new H,yf=new we,xf=new Vs;class hr{constructor(t=0,e=0,n=0,r=hr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return yf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(yf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return xf.setFromEuler(this),this.setFromQuaternion(xf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hr.DEFAULT_ORDER="XYZ";class $p{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ay=0;const _f=new H,ss=new Vs,bi=new we,Ya=new H,Js=new H,My=new H,Sy=new Vs,vf=new H(1,0,0),bf=new H(0,1,0),wf=new H(0,0,1),Af={type:"added"},Ey={type:"removed"},as={type:"childadded",child:null},Jc={type:"childremoved",child:null};class He extends Jr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ay++}),this.uuid=Ua(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=He.DEFAULT_UP.clone();const t=new H,e=new hr,n=new Vs,r=new H(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new we},normalMatrix:{value:new Vt}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=He.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $p,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.multiply(ss),this}rotateOnWorldAxis(t,e){return ss.setFromAxisAngle(t,e),this.quaternion.premultiply(ss),this}rotateX(t){return this.rotateOnAxis(vf,t)}rotateY(t){return this.rotateOnAxis(bf,t)}rotateZ(t){return this.rotateOnAxis(wf,t)}translateOnAxis(t,e){return _f.copy(t).applyQuaternion(this.quaternion),this.position.add(_f.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(vf,t)}translateY(t){return this.translateOnAxis(bf,t)}translateZ(t){return this.translateOnAxis(wf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ya.copy(t):Ya.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(Js,Ya,this.up):bi.lookAt(Ya,Js,this.up),this.quaternion.setFromRotationMatrix(bi),r&&(bi.extractRotation(r.matrixWorld),ss.setFromRotationMatrix(bi),this.quaternion.premultiply(ss.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(ce("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Af),as.child=t,this.dispatchEvent(as),as.child=null):ce("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ey),Jc.child=t,this.dispatchEvent(Jc),Jc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Af),as.child=t,this.dispatchEvent(as),as.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,t,My),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,Sy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,r=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*r,s[13]+=n-s[1]*e-s[5]*n-s[9]*r,s[14]+=r-s[2]*e-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}He.DEFAULT_UP=new H(0,1,0);He.DEFAULT_MATRIX_AUTO_UPDATE=!0;He.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class pn extends He{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ty={type:"move"};class Qc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const y of t.hand.values()){const m=e.getJointPose(y,n),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ty)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new pn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const jp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qi={h:0,s:0,l:0},Ja={h:0,s:0,l:0};function Zc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=In){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.colorSpaceToWorking(this,e),this}setRGB(t,e,n,r=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.colorSpaceToWorking(this,r),this}setHSL(t,e,n,r=ne.workingColorSpace){if(t=py(t,1),e=ee(e,0,1),n=ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Zc(a,s,t+1/3),this.g=Zc(a,s,t),this.b=Zc(a,s,t-1/3)}return ne.colorSpaceToWorking(this,r),this}setStyle(t,e=In){function n(s){s!==void 0&&parseFloat(s)<1&&Bt("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Bt("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);Bt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=In){const n=jp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Bt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}copyLinearToSRGB(t){return this.r=Ts(t.r),this.g=Ts(t.g),this.b=Ts(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=In){return ne.workingToColorSpace(on.copy(this),t),Math.round(ee(on.r*255,0,255))*65536+Math.round(ee(on.g*255,0,255))*256+Math.round(ee(on.b*255,0,255))}getHexString(t=In){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.workingToColorSpace(on.copy(this),e);const n=on.r,r=on.g,s=on.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-n)/h+2;break;case s:c=(n-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ne.workingColorSpace){return ne.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=In){ne.workingToColorSpace(on.copy(this),t);const e=on.r,n=on.g,r=on.b;return t!==In?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Qi),this.setHSL(Qi.h+t,Qi.s+e,Qi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qi),t.getHSL(Ja);const n=Wc(Qi.h,Ja.h,e),r=Wc(Qi.s,Ja.s,e),s=Wc(Qi.l,Ja.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new kt;kt.NAMES=jp;class fh{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new kt(t),this.density=e}clone(){return new fh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class tm extends He{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hr,this.environmentIntensity=1,this.environmentRotation=new hr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Xn=new H,wi=new H,$c=new H,Ai=new H,os=new H,cs=new H,Mf=new H,jc=new H,tl=new H,el=new H,nl=new Le,il=new Le,rl=new Le;class $n{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Xn.subVectors(t,e),r.cross(Xn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Xn.subVectors(r,e),wi.subVectors(n,e),$c.subVectors(t,e);const a=Xn.dot(Xn),o=Xn.dot(wi),c=Xn.dot($c),l=wi.dot(wi),u=wi.dot($c),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-o*u)*f,g=(a*u-o*c)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(t,e,n,r,s,a,o,c){return this.getBarycoord(t,e,n,r,Ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ai.x),c.addScaledVector(a,Ai.y),c.addScaledVector(o,Ai.z),c)}static getInterpolatedAttribute(t,e,n,r,s,a){return nl.setScalar(0),il.setScalar(0),rl.setScalar(0),nl.fromBufferAttribute(t,e),il.fromBufferAttribute(t,n),rl.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(nl,s.x),a.addScaledVector(il,s.y),a.addScaledVector(rl,s.z),a}static isFrontFacing(t,e,n,r){return Xn.subVectors(n,e),wi.subVectors(t,e),Xn.cross(wi).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Xn.cross(wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return $n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return $n.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return $n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;os.subVectors(r,n),cs.subVectors(s,n),jc.subVectors(t,n);const c=os.dot(jc),l=cs.dot(jc);if(c<=0&&l<=0)return e.copy(n);tl.subVectors(t,r);const u=os.dot(tl),h=cs.dot(tl);if(u>=0&&h<=u)return e.copy(r);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(os,a);el.subVectors(t,s);const d=os.dot(el),g=cs.dot(el);if(g>=0&&d<=g)return e.copy(s);const y=d*l-c*g;if(y<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(cs,o);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Mf.subVectors(s,r),o=(h-u)/(h-u+(d-g)),e.copy(r).addScaledVector(Mf,o);const p=1/(m+y+f);return a=y*p,o=f*p,e.copy(n).addScaledVector(os,a).addScaledVector(cs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Qr{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,qn):qn.fromBufferAttribute(s,a),qn.applyMatrix4(t.matrixWorld),this.expandByPoint(qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qa.copy(n.boundingBox)),Qa.applyMatrix4(t.matrixWorld),this.union(Qa)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qn),qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qs),Za.subVectors(this.max,Qs),ls.subVectors(t.a,Qs),us.subVectors(t.b,Qs),hs.subVectors(t.c,Qs),Zi.subVectors(us,ls),$i.subVectors(hs,us),gr.subVectors(ls,hs);let e=[0,-Zi.z,Zi.y,0,-$i.z,$i.y,0,-gr.z,gr.y,Zi.z,0,-Zi.x,$i.z,0,-$i.x,gr.z,0,-gr.x,-Zi.y,Zi.x,0,-$i.y,$i.x,0,-gr.y,gr.x,0];return!sl(e,ls,us,hs,Za)||(e=[1,0,0,0,1,0,0,0,1],!sl(e,ls,us,hs,Za))?!1:($a.crossVectors(Zi,$i),e=[$a.x,$a.y,$a.z],sl(e,ls,us,hs,Za))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Mi=[new H,new H,new H,new H,new H,new H,new H,new H],qn=new H,Qa=new Qr,ls=new H,us=new H,hs=new H,Zi=new H,$i=new H,gr=new H,Qs=new H,Za=new H,$a=new H,yr=new H;function sl(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){yr.fromArray(i,s);const o=r.x*Math.abs(yr.x)+r.y*Math.abs(yr.y)+r.z*Math.abs(yr.z),c=t.dot(yr),l=e.dot(yr),u=n.dot(yr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const We=new H,ja=new qt;let Cy=0;class _n extends Jr{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Cy++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ly,this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ja.fromBufferAttribute(this,e),ja.applyMatrix3(t),this.setXY(e,ja.x,ja.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix3(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ys(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=vn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ys(e,this.array)),e}setX(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ys(e,this.array)),e}setY(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ys(e,this.array)),e}setZ(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ys(e,this.array)),e}setW(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array),r=vn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array),r=vn(r,this.array),s=vn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class em extends _n{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class nm extends _n{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Te extends _n{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Ry=new Qr,Zs=new H,al=new H;class Zr{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ry.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zs.subVectors(t,this.center);const e=Zs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Zs,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(al.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zs.copy(t.center).add(al)),this.expandByPoint(Zs.copy(t.center).sub(al))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Py=0;const Bn=new we,ol=new He,fs=new H,Cn=new Qr,$s=new Qr,$e=new H;class Ke extends Jr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Py++}),this.uuid=Ua(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(uy(t)?nm:em)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Vt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Bn.makeRotationFromQuaternion(t),this.applyMatrix4(Bn),this}rotateX(t){return Bn.makeRotationX(t),this.applyMatrix4(Bn),this}rotateY(t){return Bn.makeRotationY(t),this.applyMatrix4(Bn),this}rotateZ(t){return Bn.makeRotationZ(t),this.applyMatrix4(Bn),this}translate(t,e,n){return Bn.makeTranslation(t,e,n),this.applyMatrix4(Bn),this}scale(t,e,n){return Bn.makeScale(t,e,n),this.applyMatrix4(Bn),this}lookAt(t){return ol.lookAt(t),ol.updateMatrix(),this.applyMatrix4(ol.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Te(n,3))}else{const n=Math.min(t.length,e.count);for(let r=0;r<n;r++){const s=t[r];e.setXYZ(r,s.x,s.y,s.z||0)}t.length>e.count&&Bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){const n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];$s.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(Cn.min,$s.min),Cn.expandByPoint($e),$e.addVectors(Cn.max,$s.max),Cn.expandByPoint($e)):(Cn.expandByPoint($s.min),Cn.expandByPoint($s.max))}Cn.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)$e.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared($e));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)$e.fromBufferAttribute(o,l),c&&(fs.fromBufferAttribute(t,l),$e.add(fs)),r=Math.max(r,n.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new _n(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new H,c[x]=new H;const l=new H,u=new H,h=new H,f=new qt,d=new qt,g=new qt,y=new H,m=new H;function p(x,E,R){l.fromBufferAttribute(n,x),u.fromBufferAttribute(n,E),h.fromBufferAttribute(n,R),f.fromBufferAttribute(s,x),d.fromBufferAttribute(s,E),g.fromBufferAttribute(s,R),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const N=1/(d.x*g.y-g.x*d.y);isFinite(N)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(N),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(N),o[x].add(y),o[E].add(y),o[R].add(y),c[x].add(m),c[E].add(m),c[R].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let x=0,E=b.length;x<E;++x){const R=b[x],N=R.start,U=R.count;for(let L=N,P=N+U;L<P;L+=3)p(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const S=new H,v=new H,M=new H,w=new H;function T(x){M.fromBufferAttribute(r,x),w.copy(M);const E=o[x];S.copy(E),S.sub(M.multiplyScalar(M.dot(E))).normalize(),v.crossVectors(w,E);const N=v.dot(c[x])<0?-1:1;a.setXYZW(x,S.x,S.y,S.z,N)}for(let x=0,E=b.length;x<E;++x){const R=b[x],N=R.start,U=R.count;for(let L=N,P=N+U;L<P;L+=3)T(t.getX(L+0)),T(t.getX(L+1)),T(t.getX(L+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new _n(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const r=new H,s=new H,a=new H,o=new H,c=new H,l=new H,u=new H,h=new H;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)r.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let y=0,m=c.length;y<m;y++){o.isInterleavedBufferAttribute?d=c[y]*o.data.stride+o.offset:d=c[y]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new _n(f,u,h)}if(this.index===null)return Bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ke,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=t(c,n);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=t(f,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(e))}const s=t.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cl=new H,Iy=new H,Ny=new Vt;class or{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=cl.subVectors(n,e).cross(Iy.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const r=t.delta(cl),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(r,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ny.getNormalMatrix(t),r=this.coplanarPoint(cl).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Ly=0;class $r extends Jr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ly++}),this.uuid=Ua(),this.name="",this.type="Material",this.blending=pa,this.side=zr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Up,this.blendDst=Dp,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=ba,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ny,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zc,this.stencilZFail=zc,this.stencilZPass=zc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Bt(`Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){Bt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new or().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new qt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new qt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Si=new H,ll=new H,to=new H,eo=new H;class dh{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Si.copy(this.origin).addScaledVector(this.direction,e),Si.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){ll.copy(t).add(e).multiplyScalar(.5),to.copy(e).sub(t).normalize(),eo.copy(this.origin).sub(ll);const s=t.distanceTo(e)*.5,a=-this.direction.dot(to),o=eo.dot(this.direction),c=-eo.dot(to),l=eo.lengthSq(),u=Math.abs(1-a*a);let h,f,d,g;if(u>0)if(h=a*c-o,f=a*o-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const y=1/u;h*=y,f*=y,d=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ll).addScaledVector(to,f),d}intersectSphere(t,e){if(t.radius<0)return null;Si.subVectors(t.center,this.origin);const n=Si.dot(this.direction),r=Si.dot(Si)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,r=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,r=(t.min.x-f.x)*l),u>=0?(s=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Si)!==null}intersectTriangle(t,e,n,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,h=t.x-a.x,f=t.y-a.y,d=t.z-a.z,g=e.x-a.x,y=e.y-a.y,m=e.z-a.z,p=n.x-a.x,b=n.y-a.y,S=n.z-a.z,v=Math.abs(c),M=Math.abs(l),w=Math.abs(u);let T,x,E,R,N,U,L,P,I,D,G,Y;if(v>=M&&v>=w?(E=c,U=h,I=g,Y=p,c>=0?(T=l,x=u,R=f,N=d,L=y,P=m,D=b,G=S):(T=u,x=l,R=d,N=f,L=m,P=y,D=S,G=b)):M>=w?(E=l,U=f,I=y,Y=b,l>=0?(T=u,x=c,R=d,N=h,L=m,P=g,D=S,G=p):(T=c,x=u,R=h,N=d,L=g,P=m,D=p,G=S)):(E=u,U=d,I=m,Y=S,u>=0?(T=c,x=l,R=h,N=f,L=g,P=y,D=p,G=b):(T=l,x=c,R=f,N=h,L=y,P=g,D=b,G=p)),E===0)return null;const V=T/E,Q=x/E,Z=1/E,at=R-V*U,ot=N-Q*U,Ot=L-V*I,Nt=P-Q*I,Kt=D-V*Y,J=G-Q*Y,et=Kt*Nt-J*Ot,ct=at*J-ot*Kt,Lt=Ot*ot-Nt*at;if(r){if(et<0||ct<0||Lt<0)return null}else if((et<0||ct<0||Lt<0)&&(et>0||ct>0||Lt>0))return null;const yt=et+ct+Lt;if(yt===0)return null;const Ut=Z*(et*U+ct*I+Lt*Y);return(yt>0?Ut<0:Ut>0)?null:this.at(Ut/yt,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fn extends $r{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.combine=Fp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Sf=new we,xr=new dh,no=new Zr,Ef=new H,io=new H,ro=new H,so=new H,ul=new H,ao=new H,Tf=new H,oo=new H;class Ue extends He{constructor(t=new Ke,e=new Fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){ao.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],h=s[c];u!==0&&(ul.fromBufferAttribute(h,t),a?ao.addScaledVector(ul,u):ao.addScaledVector(ul.sub(e),u))}e.add(ao)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(s),xr.copy(t.ray).recast(t.near),!(no.containsPoint(xr.origin)===!1&&(xr.intersectSphere(no,Ef)===null||xr.origin.distanceToSquared(Ef)>(t.far-t.near)**2))&&(Sf.copy(s).invert(),xr.copy(t.ray).applyMatrix4(Sf),!(n.boundingBox!==null&&xr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xr)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,M=S;v<M;v+=3){const w=o.getX(v),T=o.getX(v+1),x=o.getX(v+2);r=co(this,p,t,n,l,u,h,w,T,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){const b=o.getX(m),S=o.getX(m+1),v=o.getX(m+2);r=co(this,a,t,n,l,u,h,b,S,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=a[m.materialIndex],b=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,M=S;v<M;v+=3){const w=v,T=v+1,x=v+2;r=co(this,p,t,n,l,u,h,w,T,x),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),y=Math.min(c.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){const b=m,S=m+1,v=m+2;r=co(this,a,t,n,l,u,h,b,S,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Uy(i,t,e,n,r,s,a,o){let c;if(t.side===Mn?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,t.side===zr,o),c===null)return null;oo.copy(o),oo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(oo);return l<e.near||l>e.far?null:{distance:l,point:oo.clone(),object:i}}function co(i,t,e,n,r,s,a,o,c,l){i.getVertexPosition(o,io),i.getVertexPosition(c,ro),i.getVertexPosition(l,so);const u=Uy(i,t,e,n,io,ro,so,Tf);if(u){const h=new H;$n.getBarycoord(Tf,io,ro,so,h),r&&(u.uv=$n.getInterpolatedAttribute(r,o,c,l,h,new qt)),s&&(u.uv1=$n.getInterpolatedAttribute(s,o,c,l,h,new qt)),a&&(u.normal=$n.getInterpolatedAttribute(a,o,c,l,h,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new H,materialIndex:0};$n.getNormal(io,ro,so,f.normal),u.face=f,u.barycoord=h}return u}class im extends xn{constructor(t=null,e=1,n=1,r,s,a,o,c,l=rn,u=rn,h,f){super(null,a,o,c,l,u,r,s,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Su extends _n{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ds=new we,Cf=new we,lo=[],Rf=new Qr,Dy=new we,js=new Ue,ta=new Zr;class Hn extends Ue{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Su(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Dy)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Qr),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ds),Rf.copy(t.boundingBox).applyMatrix4(ds),this.boundingBox.union(Rf)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ds),ta.copy(t.boundingSphere).applyMatrix4(ds),this.boundingSphere.union(ta)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(js.geometry=this.geometry,js.material=this.material,js.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ta.copy(this.boundingSphere),ta.applyMatrix4(n),t.ray.intersectsSphere(ta)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ds),Cf.multiplyMatrices(n,ds),js.matrixWorld=Cf,js.raycast(t,lo);for(let a=0,o=lo.length;a<o;a++){const c=lo[a];c.instanceId=s,c.object=this,e.push(c)}lo.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Su(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new im(new Float32Array(r*this.count),r,this.count,sh,ti));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=r*t;return s[c]=o,s.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _r=new Zr,Fy=new qt(.5,.5),uo=new H;class ph{constructor(t=new or,e=new or,n=new or,r=new or,s=new or,a=new or){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=pi,n=!1){const r=this.planes,s=t.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],h=s[5],f=s[6],d=s[7],g=s[8],y=s[9],m=s[10],p=s[11],b=s[12],S=s[13],v=s[14],M=s[15];if(r[0].setComponents(l-a,d-u,p-g,M-b).normalize(),r[1].setComponents(l+a,d+u,p+g,M+b).normalize(),r[2].setComponents(l+o,d+h,p+y,M+S).normalize(),r[3].setComponents(l-o,d-h,p-y,M-S).normalize(),n)r[4].setComponents(c,f,m,v).normalize(),r[5].setComponents(l-c,d-f,p-m,M-v).normalize();else if(r[4].setComponents(l-c,d-f,p-m,M-v).normalize(),e===pi)r[5].setComponents(l+c,d+f,p+m,M+v).normalize();else if(e===Ma)r[5].setComponents(c,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_r.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_r.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_r)}intersectsSprite(t){_r.center.set(0,0,0);const e=Fy.distanceTo(t.center);return _r.radius=.7071067811865476+e,_r.applyMatrix4(t.matrixWorld),this.intersectsSphere(_r)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(uo.x=r.normal.x>0?t.max.x:t.min.x,uo.y=r.normal.y>0?t.max.y:t.min.y,uo.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(uo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rm extends $r{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Qo=new H,Zo=new H,Pf=new we,ea=new dh,ho=new Zr,hl=new H,If=new H;class Oy extends He{constructor(t=new Ke,e=new rm){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)Qo.fromBufferAttribute(e,r-1),Zo.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=Qo.distanceTo(Zo);t.setAttribute("lineDistance",new Te(n,1))}else Bt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(r),ho.radius+=s,t.ray.intersectsSphere(ho)===!1)return;Pf.copy(r).invert(),ea.copy(t.ray).applyMatrix4(Pf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=d,m=g-1;y<m;y+=l){const p=u.getX(y),b=u.getX(y+1),S=fo(this,t,ea,c,p,b,y);S&&e.push(S)}if(this.isLineLoop){const y=u.getX(g-1),m=u.getX(d),p=fo(this,t,ea,c,y,m,g-1);p&&e.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let y=d,m=g-1;y<m;y+=l){const p=fo(this,t,ea,c,y,y+1,y);p&&e.push(p)}if(this.isLineLoop){const y=fo(this,t,ea,c,g-1,d,g-1);y&&e.push(y)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function fo(i,t,e,n,r,s,a){const o=i.geometry.attributes.position;if(Qo.fromBufferAttribute(o,r),Zo.fromBufferAttribute(o,s),e.distanceSqToSegment(Qo,Zo,hl,If)>n)return;hl.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(hl);if(!(l<t.near||l>t.far))return{distance:l,point:If.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class mh extends $r{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Nf=new we,Eu=new dh,po=new Zr,mo=new H;class sm extends He{constructor(t=new Ke,e=new mh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(r),po.radius+=s,t.ray.intersectsSphere(po)===!1)return;Nf.copy(r).invert(),Eu.copy(t.ray).applyMatrix4(Nf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let g=f,y=d;g<y;g++){const m=l.getX(g);mo.fromBufferAttribute(h,m),Lf(mo,m,c,r,t,e,this)}}else{const f=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let g=f,y=d;g<y;g++)mo.fromBufferAttribute(h,g),Lf(mo,g,c,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Lf(i,t,e,n,r,s,a){const o=Eu.distanceSqToPoint(i);if(o<e){const c=new H;Eu.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class am extends xn{constructor(t=[],e=Vr,n,r,s,a,o,c,l,u){super(t,e,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Sa extends xn{constructor(t,e,n=xi,r,s,a,o=rn,c=rn,l,u=ki,h=1){if(u!==ki&&u!==Pr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new hh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class By extends Sa{constructor(t,e=xi,n=Vr,r,s,a=rn,o=rn,c,l=ki){const u={width:t,height:t,depth:1},h=[u,u,u,u,u,u];super(t,t,e,n,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class om extends xn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class dr extends Ke{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,r,a,2),g("x","z","y",1,-1,t,n,-e,r,a,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Te(l,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(h,2));function g(y,m,p,b,S,v,M,w,T,x,E){const R=v/T,N=M/x,U=v/2,L=M/2,P=w/2,I=T+1,D=x+1;let G=0,Y=0;const V=new H;for(let Q=0;Q<D;Q++){const Z=Q*N-L;for(let at=0;at<I;at++){const ot=at*R-U;V[y]=ot*b,V[m]=Z*S,V[p]=P,l.push(V.x,V.y,V.z),V[y]=0,V[m]=0,V[p]=w>0?1:-1,u.push(V.x,V.y,V.z),h.push(at/T),h.push(1-Q/x),G+=1}}for(let Q=0;Q<x;Q++)for(let Z=0;Z<T;Z++){const at=f+Z+I*Q,ot=f+Z+I*(Q+1),Ot=f+(Z+1)+I*(Q+1),Nt=f+(Z+1)+I*Q;c.push(at,ot,Nt),c.push(ot,Ot,Nt),Y+=6}o.addGroup(d,Y,E),d+=Y,f+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class vi extends Ke{constructor(t=1,e=1,n=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const y=[],m=n/2;let p=0;b(),a===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new Te(h,3)),this.setAttribute("normal",new Te(f,3)),this.setAttribute("uv",new Te(d,2));function b(){const v=new H,M=new H;let w=0;const T=(e-t)/n;for(let x=0;x<=s;x++){const E=[],R=x/s,N=R*(e-t)+t;for(let U=0;U<=r;U++){const L=U/r,P=L*c+o,I=Math.sin(P),D=Math.cos(P);M.x=N*I,M.y=-R*n+m,M.z=N*D,h.push(M.x,M.y,M.z),v.set(I,T,D).normalize(),f.push(v.x,v.y,v.z),d.push(L,1-R),E.push(g++)}y.push(E)}for(let x=0;x<r;x++)for(let E=0;E<s;E++){const R=y[E][x],N=y[E+1][x],U=y[E+1][x+1],L=y[E][x+1];(t>0||E!==0)&&(u.push(R,N,L),w+=3),(e>0||E!==s-1)&&(u.push(N,U,L),w+=3)}l.addGroup(p,w,0),p+=w}function S(v){const M=g,w=new qt,T=new H;let x=0;const E=v===!0?t:e,R=v===!0?1:-1;for(let U=1;U<=r;U++)h.push(0,m*R,0),f.push(0,R,0),d.push(.5,.5),g++;const N=g;for(let U=0;U<=r;U++){const P=U/r*c+o,I=Math.cos(P),D=Math.sin(P);T.x=E*D,T.y=m*R,T.z=E*I,h.push(T.x,T.y,T.z),f.push(0,R,0),w.x=I*.5+.5,w.y=D*.5*R+.5,d.push(w.x,w.y),g++}for(let U=0;U<r;U++){const L=M+U,P=N+U;v===!0?u.push(P,P+1,L):u.push(P+1,P,L),x+=3}l.addGroup(p,x,v===!0?1:2),p+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gh extends vi{constructor(t=1,e=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new gh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Da extends Ke{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};const s=[],a=[];o(r),l(n),u(),this.setAttribute("position",new Te(s,3)),this.setAttribute("normal",new Te(s.slice(),3)),this.setAttribute("uv",new Te(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const S=new H,v=new H,M=new H;for(let w=0;w<e.length;w+=3)d(e[w+0],S),d(e[w+1],v),d(e[w+2],M),c(S,v,M,b)}function c(b,S,v,M){const w=M+1,T=[];for(let x=0;x<=w;x++){T[x]=[];const E=b.clone().lerp(v,x/w),R=S.clone().lerp(v,x/w),N=w-x;for(let U=0;U<=N;U++)U===0&&x===w?T[x][U]=E:T[x][U]=E.clone().lerp(R,U/N)}for(let x=0;x<w;x++)for(let E=0;E<2*(w-x)-1;E++){const R=Math.floor(E/2);E%2===0?(f(T[x][R+1]),f(T[x+1][R]),f(T[x][R])):(f(T[x][R+1]),f(T[x+1][R+1]),f(T[x+1][R]))}}function l(b){const S=new H;for(let v=0;v<s.length;v+=3)S.x=s[v+0],S.y=s[v+1],S.z=s[v+2],S.normalize().multiplyScalar(b),s[v+0]=S.x,s[v+1]=S.y,s[v+2]=S.z}function u(){const b=new H;for(let S=0;S<s.length;S+=3){b.x=s[S+0],b.y=s[S+1],b.z=s[S+2];const v=m(b)/2/Math.PI+.5,M=p(b)/Math.PI+.5;a.push(v,1-M)}g(),h()}function h(){for(let b=0;b<a.length;b+=6){const S=a[b+0],v=a[b+2],M=a[b+4],w=Math.max(S,v,M),T=Math.min(S,v,M);w>.9&&T<.1&&(S<.2&&(a[b+0]+=1),v<.2&&(a[b+2]+=1),M<.2&&(a[b+4]+=1))}}function f(b){s.push(b.x,b.y,b.z)}function d(b,S){const v=b*3;S.x=t[v+0],S.y=t[v+1],S.z=t[v+2]}function g(){const b=new H,S=new H,v=new H,M=new H,w=new qt,T=new qt,x=new qt;for(let E=0,R=0;E<s.length;E+=9,R+=6){b.set(s[E+0],s[E+1],s[E+2]),S.set(s[E+3],s[E+4],s[E+5]),v.set(s[E+6],s[E+7],s[E+8]),w.set(a[R+0],a[R+1]),T.set(a[R+2],a[R+3]),x.set(a[R+4],a[R+5]),M.copy(b).add(S).add(v).divideScalar(3);const N=m(M);y(w,R+0,b,N),y(T,R+2,S,N),y(x,R+4,v,N)}}function y(b,S,v,M){M<0&&b.x===1&&(a[S]=b.x-1),v.x===0&&v.z===0&&(a[S]=M/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Da(t.vertices,t.indices,t.radius,t.detail)}}class pc extends Da{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new pc(t.radius,t.detail)}}class mc extends Da{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new mc(t.radius,t.detail)}}class Ws extends Ke{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,h=t/o,f=e/c,d=[],g=[],y=[],m=[];for(let p=0;p<u;p++){const b=p*f-a;for(let S=0;S<l;S++){const v=S*h-s;g.push(v,-b,0),y.push(0,0,1),m.push(S/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<o;b++){const S=b+l*p,v=b+l*(p+1),M=b+1+l*(p+1),w=b+1+l*p;d.push(S,v,w),d.push(v,M,w)}this.setIndex(d),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(y,3)),this.setAttribute("uv",new Te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ws(t.width,t.height,t.widthSegments,t.heightSegments)}}class yh extends Ke{constructor(t=.5,e=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let h=t;const f=(e-t)/r,d=new H,g=new qt;for(let y=0;y<=r;y++){for(let m=0;m<=n;m++){const p=s+m/n*a;d.x=h*Math.cos(p),d.y=h*Math.sin(p),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}h+=f}for(let y=0;y<r;y++){const m=y*(n+1);for(let p=0;p<n;p++){const b=p+m,S=b,v=b+n+1,M=b+n+2,w=b+1;o.push(S,v,w),o.push(v,M,w)}}this.setIndex(o),this.setAttribute("position",new Te(c,3)),this.setAttribute("normal",new Te(l,3)),this.setAttribute("uv",new Te(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yh(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class gc extends Ke{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new H,f=new H,d=[],g=[],y=[],m=[];for(let p=0;p<=n;p++){const b=[],S=p/n,v=a+S*o,M=t*Math.cos(v),w=Math.sqrt(t*t-M*M);let T=0;p===0&&a===0?T=.5/e:p===n&&c===Math.PI&&(T=-.5/e);for(let x=0;x<=e;x++){const E=x/e,R=r+E*s;h.x=-w*Math.cos(R),h.y=M,h.z=w*Math.sin(R),g.push(h.x,h.y,h.z),f.copy(h).normalize(),y.push(f.x,f.y,f.z),m.push(E+T,1-S),b.push(l++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){const S=u[p][b+1],v=u[p][b],M=u[p+1][b],w=u[p+1][b+1];(p!==0||a>0)&&d.push(S,v,w),(p!==n-1||c<Math.PI)&&d.push(v,M,w)}this.setIndex(d),this.setAttribute("position",new Te(g,3)),this.setAttribute("normal",new Te(y,3)),this.setAttribute("uv",new Te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class xh extends Da{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],r=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,r,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new xh(t.radius,t.detail)}}class Wi extends Ke{constructor(t=1,e=.4,n=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);const c=[],l=[],u=[],h=[],f=new H,d=new H,g=new H;for(let y=0;y<=n;y++){const m=a+y/n*o;for(let p=0;p<=r;p++){const b=p/r*s;d.x=(t+e*Math.cos(m))*Math.cos(b),d.y=(t+e*Math.cos(m))*Math.sin(b),d.z=e*Math.sin(m),l.push(d.x,d.y,d.z),f.x=t*Math.cos(b),f.y=t*Math.sin(b),g.subVectors(d,f).normalize(),u.push(g.x,g.y,g.z),h.push(p/r),h.push(y/n)}}for(let y=1;y<=n;y++)for(let m=1;m<=r;m++){const p=(r+1)*y+m-1,b=(r+1)*(y-1)+m-1,S=(r+1)*(y-1)+m,v=(r+1)*y+m;c.push(p,b,v),c.push(b,S,v)}this.setIndex(c),this.setAttribute("position",new Te(l,3)),this.setAttribute("normal",new Te(u,3)),this.setAttribute("uv",new Te(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function Ls(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];if(Uf(r))r.isRenderTargetTexture?(Bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone();else if(Array.isArray(r))if(Uf(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();t[e][n]=s}else t[e][n]=r.slice();else t[e][n]=r}}return t}function hn(i){const t={};for(let e=0;e<i.length;e++){const n=Ls(i[e]);for(const r in n)t[r]=n[r]}return t}function Uf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function ky(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cm(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const Gy={clone:Ls,merge:hn};var Hy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ri extends $r{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hy,this.fragmentShader=zy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ls(t.uniforms),this.uniformsGroups=ky(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const r=t.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=e[r.value]||null;break;case"c":this.uniforms[n].value=new kt().setHex(r.value);break;case"v2":this.uniforms[n].value=new qt().fromArray(r.value);break;case"v3":this.uniforms[n].value=new H().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Le().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Vt().fromArray(r.value);break;case"m4":this.uniforms[n].value=new we().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Vy extends ri{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Us extends $r{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Au,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class lm extends Us{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new qt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new kt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new kt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new kt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Wy extends $r{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ty,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Xy extends $r{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class _h extends He{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const fl=new we,Df=new H,Ff=new H;class um{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ph,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Df.setFromMatrixPosition(t.matrixWorld),e.position.copy(Df),Ff.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ff),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,r){fl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(fl,t.coordinateSystem,t.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;t.coordinateSystem===Ma||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(fl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const go=new H,yo=new Vs,ci=new H;class hm extends He{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(go,yo,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(go,yo,ci.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(go,yo,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(go,yo,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ji=new H,Of=new qt,Bf=new qt;class Nn extends hm{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Mu*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Vc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Mu*2*Math.atan(Math.tan(Vc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ji.x,ji.y).multiplyScalar(-t/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-t/ji.z)}getViewSize(t,e){return this.getViewBounds(t,Of,Bf),e.subVectors(Bf,Of)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Vc*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,e-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class qy extends um{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0}}class $o extends _h{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new qy}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class yc extends hm{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ky extends um{constructor(){super(new yc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yy extends _h{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(He.DEFAULT_UP),this.updateMatrix(),this.target=new He,this.shadow=new Ky}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class fm extends _h{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const ps=-90,ms=1;class Jy extends He{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nn(ps,ms,t,e);r.layers=this.layers,this.add(r);const s=new Nn(ps,ms,t,e);s.layers=this.layers,this.add(s);const a=new Nn(ps,ms,t,e);a.layers=this.layers,this.add(a);const o=new Nn(ps,ms,t,e);o.layers=this.layers,this.add(o);const c=new Nn(ps,ms,t,e);c.layers=this.layers,this.add(c);const l=new Nn(ps,ms,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,c]=e;for(const l of e)this.remove(l);if(t===pi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ma)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,s),t.setRenderTarget(n,1,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,r),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Qy extends Nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Jh=class Jh{constructor(t,e,n,r){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,r){const s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=r,this}};Jh.prototype.isMatrix2=!0;let kf=Jh;function Gf(i,t,e,n){const r=Zy(n);switch(e){case Yp:return i*t;case sh:return i*t/r.components*r.byteLength;case ah:return i*t/r.components*r.byteLength;case Wr:return i*t*2/r.components*r.byteLength;case oh:return i*t*2/r.components*r.byteLength;case Jp:return i*t*3/r.components*r.byteLength;case ei:return i*t*4/r.components*r.byteLength;case ch:return i*t*4/r.components*r.byteLength;case Lo:case Uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Do:case Fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Yl:case Ql:return Math.max(i,16)*Math.max(t,8)/4;case Kl:case Jl:return Math.max(i,8)*Math.max(t,8)/2;case Zl:case $l:case tu:case eu:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case jl:case Xo:case nu:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case iu:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ru:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case su:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case au:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ou:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case cu:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case lu:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case uu:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case hu:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case fu:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case du:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case pu:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case mu:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case gu:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case yu:case xu:case _u:return Math.ceil(i/4)*Math.ceil(t/4)*16;case vu:case bu:return Math.ceil(i/4)*Math.ceil(t/4)*8;case qo:case wu:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zy(i){switch(i){case Ln:case Wp:return{byteLength:1,components:1};case wa:case Xp:case _i:return{byteLength:2,components:1};case ih:case rh:return{byteLength:2,components:4};case xi:case nh:case ti:return{byteLength:4,components:1};case qp:case Kp:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:th}}));typeof window<"u"&&(window.__THREE__?Bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=th);function dm(){let i=null,t=!1,e=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),e(s,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function $y(i){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,o),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],y=h[d];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,h[f]=y)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const y=h[d];i.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var jy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tx=`#ifdef USE_ALPHAHASH
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
#endif`,ex=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ix=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sx=`#ifdef USE_AOMAP
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
#endif`,ax=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ox=`#ifdef USE_BATCHING
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
#endif`,cx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ux=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fx=`#ifdef USE_IRIDESCENCE
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
#endif`,dx=`#ifdef USE_BUMPMAP
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
#endif`,px=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,_x=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,vx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,bx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wx=`#define PI 3.141592653589793
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
} // validated`,Ax=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mx=`vec3 transformedNormal = objectNormal;
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
#endif`,Sx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ex=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Px=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ix=`#ifdef USE_ENVMAP
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
#endif`,Nx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Lx=`#ifdef USE_ENVMAP
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
#endif`,Ux=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dx=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ox=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gx=`#ifdef USE_GRADIENTMAP
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
}`,Hx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wx=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Xx=`#ifdef USE_ENVMAP
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
#endif`,qx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qx=`PhysicalMaterial material;
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
#endif`,Zx=`uniform sampler2D dfgLUT;
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
}`,$x=`
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
#endif`,jx=`#if defined( RE_IndirectDiffuse )
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
#endif`,t_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,e_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,n_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,i_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,o_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,c_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,l_=`#if defined( USE_POINTS_UV )
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
#endif`,u_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,h_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,f_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,d_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,p_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,m_=`#ifdef USE_MORPHTARGETS
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
#endif`,g_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,x_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,__=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,v_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,w_=`#ifdef USE_NORMALMAP
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
#endif`,A_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,M_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,S_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,E_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,T_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,C_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,R_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,P_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,I_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,N_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,L_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,U_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,D_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,O_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B_=`float getShadowMask() {
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
}`,k_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,G_=`#ifdef USE_SKINNING
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
#endif`,H_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,z_=`#ifdef USE_SKINNING
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
#endif`,V_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,W_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,X_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,q_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,K_=`#ifdef USE_TRANSMISSION
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
#endif`,Y_=`#ifdef USE_TRANSMISSION
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
#endif`,J_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Q_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const j_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tv=`uniform sampler2D t2D;
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
}`,ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sv=`#include <common>
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
}`,av=`#if DEPTH_PACKING == 3200
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
}`,ov=`#define DISTANCE
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
}`,cv=`#define DISTANCE
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
}`,lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hv=`uniform float scale;
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
}`,fv=`uniform vec3 diffuse;
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
}`,dv=`#include <common>
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
}`,pv=`uniform vec3 diffuse;
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
}`,mv=`#define LAMBERT
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
}`,gv=`#define LAMBERT
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
}`,yv=`#define MATCAP
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
}`,xv=`#define MATCAP
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
}`,_v=`#define NORMAL
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
}`,vv=`#define NORMAL
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
}`,bv=`#define PHONG
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
}`,wv=`#define PHONG
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
}`,Av=`#define STANDARD
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
}`,Mv=`#define STANDARD
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
}`,Sv=`#define TOON
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
}`,Ev=`#define TOON
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
}`,Tv=`uniform float size;
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
}`,Cv=`uniform vec3 diffuse;
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
}`,Rv=`#include <common>
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
}`,Pv=`uniform vec3 color;
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
}`,Iv=`uniform float rotation;
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
}`,Nv=`uniform vec3 diffuse;
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
}`,Qt={alphahash_fragment:jy,alphahash_pars_fragment:tx,alphamap_fragment:ex,alphamap_pars_fragment:nx,alphatest_fragment:ix,alphatest_pars_fragment:rx,aomap_fragment:sx,aomap_pars_fragment:ax,batching_pars_vertex:ox,batching_vertex:cx,begin_vertex:lx,beginnormal_vertex:ux,bsdfs:hx,iridescence_fragment:fx,bumpmap_pars_fragment:dx,clipping_planes_fragment:px,clipping_planes_pars_fragment:mx,clipping_planes_pars_vertex:gx,clipping_planes_vertex:yx,color_fragment:xx,color_pars_fragment:_x,color_pars_vertex:vx,color_vertex:bx,common:wx,cube_uv_reflection_fragment:Ax,defaultnormal_vertex:Mx,displacementmap_pars_vertex:Sx,displacementmap_vertex:Ex,emissivemap_fragment:Tx,emissivemap_pars_fragment:Cx,colorspace_fragment:Rx,colorspace_pars_fragment:Px,envmap_fragment:Ix,envmap_common_pars_fragment:Nx,envmap_pars_fragment:Lx,envmap_pars_vertex:Ux,envmap_physical_pars_fragment:Xx,envmap_vertex:Dx,fog_vertex:Fx,fog_pars_vertex:Ox,fog_fragment:Bx,fog_pars_fragment:kx,gradientmap_pars_fragment:Gx,lightmap_pars_fragment:Hx,lights_lambert_fragment:zx,lights_lambert_pars_fragment:Vx,lights_pars_begin:Wx,lights_toon_fragment:qx,lights_toon_pars_fragment:Kx,lights_phong_fragment:Yx,lights_phong_pars_fragment:Jx,lights_physical_fragment:Qx,lights_physical_pars_fragment:Zx,lights_fragment_begin:$x,lights_fragment_maps:jx,lights_fragment_end:t_,lightprobes_pars_fragment:e_,logdepthbuf_fragment:n_,logdepthbuf_pars_fragment:i_,logdepthbuf_pars_vertex:r_,logdepthbuf_vertex:s_,map_fragment:a_,map_pars_fragment:o_,map_particle_fragment:c_,map_particle_pars_fragment:l_,metalnessmap_fragment:u_,metalnessmap_pars_fragment:h_,morphinstance_vertex:f_,morphcolor_vertex:d_,morphnormal_vertex:p_,morphtarget_pars_vertex:m_,morphtarget_vertex:g_,normal_fragment_begin:y_,normal_fragment_maps:x_,normal_pars_fragment:__,normal_pars_vertex:v_,normal_vertex:b_,normalmap_pars_fragment:w_,clearcoat_normal_fragment_begin:A_,clearcoat_normal_fragment_maps:M_,clearcoat_pars_fragment:S_,iridescence_pars_fragment:E_,opaque_fragment:T_,packing:C_,premultiplied_alpha_fragment:R_,project_vertex:P_,dithering_fragment:I_,dithering_pars_fragment:N_,roughnessmap_fragment:L_,roughnessmap_pars_fragment:U_,shadowmap_pars_fragment:D_,shadowmap_pars_vertex:F_,shadowmap_vertex:O_,shadowmask_pars_fragment:B_,skinbase_vertex:k_,skinning_pars_vertex:G_,skinning_vertex:H_,skinnormal_vertex:z_,specularmap_fragment:V_,specularmap_pars_fragment:W_,tonemapping_fragment:X_,tonemapping_pars_fragment:q_,transmission_fragment:K_,transmission_pars_fragment:Y_,uv_pars_fragment:J_,uv_pars_vertex:Q_,uv_vertex:Z_,worldpos_vertex:$_,background_vert:j_,background_frag:tv,backgroundCube_vert:ev,backgroundCube_frag:nv,cube_vert:iv,cube_frag:rv,depth_vert:sv,depth_frag:av,distance_vert:ov,distance_frag:cv,equirect_vert:lv,equirect_frag:uv,linedashed_vert:hv,linedashed_frag:fv,meshbasic_vert:dv,meshbasic_frag:pv,meshlambert_vert:mv,meshlambert_frag:gv,meshmatcap_vert:yv,meshmatcap_frag:xv,meshnormal_vert:_v,meshnormal_frag:vv,meshphong_vert:bv,meshphong_frag:wv,meshphysical_vert:Av,meshphysical_frag:Mv,meshtoon_vert:Sv,meshtoon_frag:Ev,points_vert:Tv,points_frag:Cv,shadow_vert:Rv,shadow_frag:Pv,sprite_vert:Iv,sprite_frag:Nv},mt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},hi={basic:{uniforms:hn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:hn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new kt(0)},envMapIntensity:{value:1}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:hn([mt.common,mt.specularmap,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,mt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:hn([mt.common,mt.envmap,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.roughnessmap,mt.metalnessmap,mt.fog,mt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:hn([mt.common,mt.aomap,mt.lightmap,mt.emissivemap,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.gradientmap,mt.fog,mt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:hn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,mt.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:hn([mt.points,mt.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:hn([mt.common,mt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:hn([mt.common,mt.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:hn([mt.common,mt.bumpmap,mt.normalmap,mt.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:hn([mt.sprite,mt.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distance:{uniforms:hn([mt.common,mt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distance_vert,fragmentShader:Qt.distance_frag},shadow:{uniforms:hn([mt.lights,mt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};hi.physical={uniforms:hn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const xo={r:0,b:0,g:0},Lv=new we,pm=new Vt;pm.set(-1,0,0,0,1,0,0,0,1);function Uv(i,t,e,n,r,s){const a=new kt(0);let o=r===!0?0:1,c,l,u=null,h=0,f=null;function d(b){let S=b.isScene===!0?b.background:null;if(S&&S.isTexture){const v=b.backgroundBlurriness>0;S=t.get(S,v)}return S}function g(b){let S=!1;const v=d(b);v===null?m(a,o):v&&v.isColor&&(m(v,1),S=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?e.buffers.color.setClear(0,0,0,1,s):M==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,s),(i.autoClear||S)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(b,S){const v=d(S);v&&(v.isCubeTexture||v.mapping===dc)?(l===void 0&&(l=new Ue(new dr(1,1,1),new ri({name:"BackgroundCubeMaterial",uniforms:Ls(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(M,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Lv.makeRotationFromEuler(S.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(pm),l.material.toneMapped=ne.getTransfer(v.colorSpace)!==ge,(u!==v||h!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,h=v.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Ue(new Ws(2,2),new ri({name:"BackgroundMaterial",uniforms:Ls(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:zr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=ne.getTransfer(v.colorSpace)!==ge,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||h!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,h=v.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,S){b.getRGB(xo,cm(i)),e.buffers.color.setClear(xo.r,xo.g,xo.b,S,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:y,dispose:p}}function Dv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(N,U,L,P,I){let D=!1;const G=h(N,P,L,U);s!==G&&(s=G,l(s.object)),D=d(N,P,L,I),D&&g(N,P,L,I),I!==null&&t.update(I,i.ELEMENT_ARRAY_BUFFER),(D||a)&&(a=!1,v(N,U,L,P),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function c(){return i.createVertexArray()}function l(N){return i.bindVertexArray(N)}function u(N){return i.deleteVertexArray(N)}function h(N,U,L,P){const I=P.wireframe===!0;let D=n[U.id];D===void 0&&(D={},n[U.id]=D);const G=N.isInstancedMesh===!0?N.id:0;let Y=D[G];Y===void 0&&(Y={},D[G]=Y);let V=Y[L.id];V===void 0&&(V={},Y[L.id]=V);let Q=V[I];return Q===void 0&&(Q=f(c()),V[I]=Q),Q}function f(N){const U=[],L=[],P=[];for(let I=0;I<e;I++)U[I]=0,L[I]=0,P[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:L,attributeDivisors:P,object:N,attributes:{},index:null}}function d(N,U,L,P){const I=s.attributes,D=U.attributes;let G=0;const Y=L.getAttributes();for(const V in Y)if(Y[V].location>=0){const Z=I[V];let at=D[V];if(at===void 0&&(V==="instanceMatrix"&&N.instanceMatrix&&(at=N.instanceMatrix),V==="instanceColor"&&N.instanceColor&&(at=N.instanceColor)),Z===void 0||Z.attribute!==at||at&&Z.data!==at.data)return!0;G++}return s.attributesNum!==G||s.index!==P}function g(N,U,L,P){const I={},D=U.attributes;let G=0;const Y=L.getAttributes();for(const V in Y)if(Y[V].location>=0){let Z=D[V];Z===void 0&&(V==="instanceMatrix"&&N.instanceMatrix&&(Z=N.instanceMatrix),V==="instanceColor"&&N.instanceColor&&(Z=N.instanceColor));const at={};at.attribute=Z,Z&&Z.data&&(at.data=Z.data),I[V]=at,G++}s.attributes=I,s.attributesNum=G,s.index=P}function y(){const N=s.newAttributes;for(let U=0,L=N.length;U<L;U++)N[U]=0}function m(N){p(N,0)}function p(N,U){const L=s.newAttributes,P=s.enabledAttributes,I=s.attributeDivisors;L[N]=1,P[N]===0&&(i.enableVertexAttribArray(N),P[N]=1),I[N]!==U&&(i.vertexAttribDivisor(N,U),I[N]=U)}function b(){const N=s.newAttributes,U=s.enabledAttributes;for(let L=0,P=U.length;L<P;L++)U[L]!==N[L]&&(i.disableVertexAttribArray(L),U[L]=0)}function S(N,U,L,P,I,D,G){G===!0?i.vertexAttribIPointer(N,U,L,I,D):i.vertexAttribPointer(N,U,L,P,I,D)}function v(N,U,L,P){y();const I=P.attributes,D=L.getAttributes(),G=U.defaultAttributeValues;for(const Y in D){const V=D[Y];if(V.location>=0){let Q=I[Y];if(Q===void 0&&(Y==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),Y==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor)),Q!==void 0){const Z=Q.normalized,at=Q.itemSize,ot=t.get(Q);if(ot===void 0)continue;const Ot=ot.buffer,Nt=ot.type,Kt=ot.bytesPerElement,J=Nt===i.INT||Nt===i.UNSIGNED_INT||Q.gpuType===nh;if(Q.isInterleavedBufferAttribute){const et=Q.data,ct=et.stride,Lt=Q.offset;if(et.isInstancedInterleavedBuffer){for(let yt=0;yt<V.locationSize;yt++)p(V.location+yt,et.meshPerAttribute);N.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let yt=0;yt<V.locationSize;yt++)m(V.location+yt);i.bindBuffer(i.ARRAY_BUFFER,Ot);for(let yt=0;yt<V.locationSize;yt++)S(V.location+yt,at/V.locationSize,Nt,Z,ct*Kt,(Lt+at/V.locationSize*yt)*Kt,J)}else{if(Q.isInstancedBufferAttribute){for(let et=0;et<V.locationSize;et++)p(V.location+et,Q.meshPerAttribute);N.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let et=0;et<V.locationSize;et++)m(V.location+et);i.bindBuffer(i.ARRAY_BUFFER,Ot);for(let et=0;et<V.locationSize;et++)S(V.location+et,at/V.locationSize,Nt,Z,at*Kt,at/V.locationSize*et*Kt,J)}}else if(G!==void 0){const Z=G[Y];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(V.location,Z);break;case 3:i.vertexAttrib3fv(V.location,Z);break;case 4:i.vertexAttrib4fv(V.location,Z);break;default:i.vertexAttrib1fv(V.location,Z)}}}}b()}function M(){E();for(const N in n){const U=n[N];for(const L in U){const P=U[L];for(const I in P){const D=P[I];for(const G in D)u(D[G].object),delete D[G];delete P[I]}}delete n[N]}}function w(N){if(n[N.id]===void 0)return;const U=n[N.id];for(const L in U){const P=U[L];for(const I in P){const D=P[I];for(const G in D)u(D[G].object),delete D[G];delete P[I]}}delete n[N.id]}function T(N){for(const U in n){const L=n[U];for(const P in L){const I=L[P];if(I[N.id]===void 0)continue;const D=I[N.id];for(const G in D)u(D[G].object),delete D[G];delete I[N.id]}}}function x(N){for(const U in n){const L=n[U],P=N.isInstancedMesh===!0?N.id:0,I=L[P];if(I!==void 0){for(const D in I){const G=I[D];for(const Y in G)u(G[Y].object),delete G[Y];delete I[D]}delete L[P],Object.keys(L).length===0&&delete n[U]}}}function E(){R(),a=!0,s!==r&&(s=r,l(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:E,resetDefaultState:R,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:y,enableAttribute:m,disableUnusedAttributes:b}}function Fv(i,t,e){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),e.update(l,n,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let f=0;for(let d=0;d<u;d++)f+=l[d];e.update(f,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Ov(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(T){return!(T!==ei&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const x=T===_i&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Ln&&T!==ti&&!x&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Bt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&f===!1&&Bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),M=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,maxSamples:M,samples:w}}function Bv(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new or,o=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||r;return r=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,p=i.get(h);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const b=s?0:n,S=b*4;let v=p.clippingState||null;c.value=v,v=u(g,f,S,d);for(let M=0;M!==S;++M)v[M]=e[M];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,g){const y=h!==null?h.length:0;let m=null;if(y!==0){if(m=c.value,g!==!0||m===null){const p=d+y*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=d;S!==y;++S,v+=4)a.copy(h[S]).applyMatrix4(b,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}const ws=4,kv=6,Gv=20,Hv=256,na=new yc,Hf=new kt;let dl=null,pl=0,ml=0,gl=!1;const zv=new H,vr=new H;class zf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,r=100,s={}){const{size:a=256,position:o=zv}=s;dl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,r,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(dl,pl,ml),this._renderer.xr.enabled=gl,t.scissorTest=!1,gs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vr||t.mapping===Ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),dl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:_i,format:ei,colorSpace:Ko,depthBuffer:!1},r=Vf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vf(t,e,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Vv(s)),this._blurMaterial=Xv(s,t,e),this._ggxMaterial=Wv(s,t,e)}return r}_compileMaterial(t){const e=new Ue(new Ke,t);this._renderer.compile(e,na)}_sceneToCubeUV(t,e,n,r,s){const c=new Nn(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(Hf),h.toneMapping=gi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ue(new dr,new Fn({name:"PMREM.Background",side:Mn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let p=!1;const b=t.background;b?b.isColor&&(m.color.copy(b),t.background=null,p=!0):(m.color.copy(Hf),p=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[S],s.y,s.z)):v===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[S]));const M=this._cubeSize;gs(r,v*M,S>2?M:0,M,M),h.setRenderTarget(r),p&&h.render(y,c),h.render(t,c)}h.toneMapping=d,h.autoClear=f,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Vr||t.mapping===Ns;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;gs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,na)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=n}_applyGGXFilter(t,e,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),f=l*1.25,d=h*f,{_lodMax:g}=this,y=this._sizeLods[n],m=3*y*(n>g-ws?n-g+ws:0),p=4*(this._cubeSize-y);c.envMap.value=t.texture,c.roughness.value=d,c.mipInt.value=g-e,gs(s,m,p,3*y,2*y),r.setRenderTarget(s),r.render(o,na),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-n,gs(t,m,p,3*y,2*y),r.setRenderTarget(t),r.render(o,na)}_blur(t,e,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(t,s,e,n,a),this._blurPass(s,t,n,n,a)}_blurPass(t,e,n,r,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],h=3*u*(r>this._lodMax-ws?r-this._lodMax+ws:0),f=4*(this._cubeSize-u);gs(e,h,f,3*u,2*u),a.setRenderTarget(e),a.render(c,na)}}function Vv(i){const t=[],e=[];let n=i;const r=i-ws+1+kv;for(let s=0;s<r;s++){const a=Math.pow(2,n);t.push(a);const o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],h=6,f=6,d=3,g=new Float32Array(d*f*h),y=new Float32Array(d*f*h);for(let p=0;p<h;p++){const b=p%3*2/3-1,S=p>2?0:-1,v=[b,S,0,b+2/3,S,0,b+2/3,S+1,0,b,S,0,b+2/3,S+1,0,b,S+1,0];g.set(v,d*f*p);for(let M=0;M<f;M++){const w=u[M*2]*2-1,T=u[M*2+1]*2-1;p===0?vr.set(1,T,w):p===1?vr.set(-w,1,-T):p===2?vr.set(-w,T,1):p===3?vr.set(-1,T,-w):p===4?vr.set(-w,-1,T):vr.set(w,T,-1),vr.toArray(y,(p*f+M)*d)}}const m=new Ke;m.setAttribute("position",new _n(g,d)),m.setAttribute("outputDirection",new _n(y,d)),e.push(new Ue(m,null)),n>ws&&n--}return{lodMeshes:e,sizeLods:t}}function Vf(i,t,e){const n=new ni(i,t,e);return n.texture.mapping=dc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function gs(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Wv(i,t,e){return new ri({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Hv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function Xv(i,t,e){return new ri({name:"SphericalGaussianBlur",defines:{SAMPLES:Gv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:xc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function Wf(){return new ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function Xf(){return new ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function xc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class mm extends ni{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new am(r),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new dr(5,5,5),s=new ri({name:"CubemapFromEquirect",uniforms:Ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:Ui});s.uniforms.tEquirect.value=e;const a=new Ue(r,s),o=e.minFilter;return e.minFilter===Rr&&(e.minFilter=cn),new Jy(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,r=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}function qv(i){let t=new WeakMap,e=new WeakMap,n=null;function r(f,d=!1){return f==null?null:d?a(f):s(f)}function s(f){if(f&&f.isTexture){const d=f.mapping;if(d===kc||d===Gc)if(t.has(f)){const g=t.get(f).texture;return o(g,f.mapping)}else{const g=f.image;if(g&&g.height>0){const y=new mm(g.height);return y.fromEquirectangularTexture(i,f),t.set(f,y),f.addEventListener("dispose",l),o(y.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const d=f.mapping,g=d===kc||d===Gc,y=d===Vr||d===Ns;if(g||y){let m=e.get(f);const p=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new zf(i)),m=g?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),m.texture;if(m!==void 0)return m.texture;{const b=f.image;return g&&b&&b.height>0||y&&b&&c(b)?(n===null&&(n=new zf(i)),m=g?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,e.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,d){return d===kc?f.mapping=Vr:d===Gc&&(f.mapping=Ns),f}function c(f){let d=0;const g=6;for(let y=0;y<g;y++)f[y]!==void 0&&d++;return d===g}function l(f){const d=f.target;d.removeEventListener("dispose",l);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(f){const d=f.target;d.removeEventListener("dispose",u);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:h}}function Kv(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const r=i.getExtension(n);return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&Es("WebGLRenderer: "+n+" extension not supported."),r}}}function Yv(i,t,e,n){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(h){const f=[],d=h.index,g=h.attributes.position;let y=0;if(g===void 0)return;if(d!==null){const b=d.array;y=d.version;for(let S=0,v=b.length;S<v;S+=3){const M=b[S+0],w=b[S+1],T=b[S+2];f.push(M,w,w,T,T,M)}}else{const b=g.array;y=g.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const M=S+0,w=S+1,T=S+2;f.push(M,w,w,T,T,M)}}const m=new(g.count>=65535?nm:em)(f,1);m.version=y;const p=s.get(h);p&&t.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Jv(i,t,e){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,f){i.drawElements(n,f,s,h*a),e.update(f,n,1)}function l(h,f,d){d!==0&&(i.drawElementsInstanced(n,f,s,h*a,d),e.update(f,n,d))}function u(h,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,h,0,d);let y=0;for(let m=0;m<d;m++)y+=f[m];e.update(y,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Qv(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:ce("WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Zv(i,t,e){const n=new WeakMap,r=new Le;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let E=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",E)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let S=0;d===!0&&(S=1),g===!0&&(S=2),y===!0&&(S=3);let v=o.attributes.position.count*S,M=1;v>t.maxTextureSize&&(M=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const w=new Float32Array(v*M*4*h),T=new Zp(w,v,M,h);T.type=ti,T.needsUpdate=!0;const x=S*4;for(let R=0;R<h;R++){const N=m[R],U=p[R],L=b[R],P=v*M*4*R;for(let I=0;I<N.count;I++){const D=I*x;d===!0&&(r.fromBufferAttribute(N,I),w[P+D+0]=r.x,w[P+D+1]=r.y,w[P+D+2]=r.z,w[P+D+3]=0),g===!0&&(r.fromBufferAttribute(U,I),w[P+D+4]=r.x,w[P+D+5]=r.y,w[P+D+6]=r.z,w[P+D+7]=0),y===!0&&(r.fromBufferAttribute(L,I),w[P+D+8]=r.x,w[P+D+9]=r.y,w[P+D+10]=r.z,w[P+D+11]=L.itemSize===4?r.w:1)}}f={count:h,texture:T,size:new qt(v,M)},n.set(o,f),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let y=0;y<l.length;y++)d+=l[y];const g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function $v(i,t,e,n,r){let s=new WeakMap;function a(l){const u=r.render.frame,h=l.geometry,f=t.get(l,h);if(s.get(f)!==u&&(t.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==u&&(d.update(),s.set(d,u))}return f}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const jv={[Op]:"LINEAR_TONE_MAPPING",[Bp]:"REINHARD_TONE_MAPPING",[kp]:"CINEON_TONE_MAPPING",[eh]:"ACES_FILMIC_TONE_MAPPING",[Hp]:"AGX_TONE_MAPPING",[zp]:"NEUTRAL_TONE_MAPPING",[Gp]:"CUSTOM_TONE_MAPPING"};function tb(i,t,e,n,r,s){const a=new ni(t,e,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Ke;l.setAttribute("position",new Te([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Te([0,2,0,0,2,0],2));const u=new Vy({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Ue(l,u),f=new yc(-1,1,1,-1,0,1);let d=null,g=null,y=!1,m,p=null,b=[],S=!1;this.setSize=function(v,M){a.setSize(v,M),o!==null&&o.setSize(v,M),c!==null&&c.setSize(v,M);for(let w=0;w<b.length;w++){const T=b[w];T.setSize&&T.setSize(v,M)}},this.setEffects=function(v){b=v,S=b.length>0&&b[0].isRenderPass===!0;const M=a.width,w=a.height;b.length>0&&o===null&&(o=new ni(M,w,{type:_i,depthBuffer:!1,stencilBuffer:!1}),c=new ni(M,w,{type:_i,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<b.length;T++){const x=b[T];x.setSize&&x.setSize(M,w)}},this.begin=function(v,M){if(y||v.toneMapping===gi&&b.length===0)return!1;if(p=M,M!==null){const w=M.width,T=M.height;(a.width!==w||a.height!==T)&&this.setSize(w,T)}return S===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=gi,!0},this.hasRenderPass=function(){return S},this.end=function(v,M){v.toneMapping=m,y=!0;let w=a,T=o;for(let x=0;x<b.length;x++){const E=b[x];E.enabled!==!1&&(E.render(v,T,w,M),E.needsSwap!==!1&&(w=T,T=T===o?c:o))}if(d!==v.outputColorSpace||g!==v.toneMapping){d=v.outputColorSpace,g=v.toneMapping,u.defines={},ne.getTransfer(d)===ge&&(u.defines.SRGB_TRANSFER="");const x=jv[g];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(p),v.render(h,f),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const gm=new xn,Tu=new Sa(1,1),ym=new Zp,xm=new vy,_m=new am,qf=[],Kf=[],Yf=new Float32Array(16),Jf=new Float32Array(9),Qf=new Float32Array(4);function Xs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=qf[r];if(s===void 0&&(s=new Float32Array(r),qf[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function Qe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ze(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function _c(i,t){let e=Kf[t];e===void 0&&(e=new Int32Array(t),Kf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function eb(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function nb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2fv(this.addr,t),Ze(e,t)}}function ib(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Qe(e,t))return;i.uniform3fv(this.addr,t),Ze(e,t)}}function rb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4fv(this.addr,t),Ze(e,t)}}function sb(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ze(e,t)}else{if(Qe(e,n))return;Qf.set(n),i.uniformMatrix2fv(this.addr,!1,Qf),Ze(e,n)}}function ab(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ze(e,t)}else{if(Qe(e,n))return;Jf.set(n),i.uniformMatrix3fv(this.addr,!1,Jf),Ze(e,n)}}function ob(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Qe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ze(e,t)}else{if(Qe(e,n))return;Yf.set(n),i.uniformMatrix4fv(this.addr,!1,Yf),Ze(e,n)}}function cb(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function lb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2iv(this.addr,t),Ze(e,t)}}function ub(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;i.uniform3iv(this.addr,t),Ze(e,t)}}function hb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4iv(this.addr,t),Ze(e,t)}}function fb(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function db(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Qe(e,t))return;i.uniform2uiv(this.addr,t),Ze(e,t)}}function pb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Qe(e,t))return;i.uniform3uiv(this.addr,t),Ze(e,t)}}function mb(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Qe(e,t))return;i.uniform4uiv(this.addr,t),Ze(e,t)}}function gb(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Tu.compareFunction=e.isReversedDepthBuffer()?uh:lh,s=Tu):s=gm,e.setTexture2D(t||s,r)}function yb(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||xm,r)}function xb(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||_m,r)}function _b(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||ym,r)}function vb(i){switch(i){case 5126:return eb;case 35664:return nb;case 35665:return ib;case 35666:return rb;case 35674:return sb;case 35675:return ab;case 35676:return ob;case 5124:case 35670:return cb;case 35667:case 35671:return lb;case 35668:case 35672:return ub;case 35669:case 35673:return hb;case 5125:return fb;case 36294:return db;case 36295:return pb;case 36296:return mb;case 35678:case 36198:case 36298:case 36306:case 35682:return gb;case 35679:case 36299:case 36307:return yb;case 35680:case 36300:case 36308:case 36293:return xb;case 36289:case 36303:case 36311:case 36292:return _b}}function bb(i,t){i.uniform1fv(this.addr,t)}function wb(i,t){const e=Xs(t,this.size,2);i.uniform2fv(this.addr,e)}function Ab(i,t){const e=Xs(t,this.size,3);i.uniform3fv(this.addr,e)}function Mb(i,t){const e=Xs(t,this.size,4);i.uniform4fv(this.addr,e)}function Sb(i,t){const e=Xs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Eb(i,t){const e=Xs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Tb(i,t){const e=Xs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Cb(i,t){i.uniform1iv(this.addr,t)}function Rb(i,t){i.uniform2iv(this.addr,t)}function Pb(i,t){i.uniform3iv(this.addr,t)}function Ib(i,t){i.uniform4iv(this.addr,t)}function Nb(i,t){i.uniform1uiv(this.addr,t)}function Lb(i,t){i.uniform2uiv(this.addr,t)}function Ub(i,t){i.uniform3uiv(this.addr,t)}function Db(i,t){i.uniform4uiv(this.addr,t)}function Fb(i,t,e){const n=this.cache,r=t.length,s=_c(e,r);Qe(n,s)||(i.uniform1iv(this.addr,s),Ze(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Tu:a=gm;for(let o=0;o!==r;++o)e.setTexture2D(t[o]||a,s[o])}function Ob(i,t,e){const n=this.cache,r=t.length,s=_c(e,r);Qe(n,s)||(i.uniform1iv(this.addr,s),Ze(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||xm,s[a])}function Bb(i,t,e){const n=this.cache,r=t.length,s=_c(e,r);Qe(n,s)||(i.uniform1iv(this.addr,s),Ze(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||_m,s[a])}function kb(i,t,e){const n=this.cache,r=t.length,s=_c(e,r);Qe(n,s)||(i.uniform1iv(this.addr,s),Ze(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||ym,s[a])}function Gb(i){switch(i){case 5126:return bb;case 35664:return wb;case 35665:return Ab;case 35666:return Mb;case 35674:return Sb;case 35675:return Eb;case 35676:return Tb;case 5124:case 35670:return Cb;case 35667:case 35671:return Rb;case 35668:case 35672:return Pb;case 35669:case 35673:return Ib;case 5125:return Nb;case 36294:return Lb;case 36295:return Ub;case 36296:return Db;case 35678:case 36198:case 36298:case 36306:case 35682:return Fb;case 35679:case 36299:case 36307:return Ob;case 35680:case 36300:case 36308:case 36293:return Bb;case 36289:case 36303:case 36311:case 36292:return kb}}class Hb{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vb(e.type)}}class zb{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gb(e.type)}}class Vb{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const yl=/(\w+)(\])?(\[|\.)?/g;function Zf(i,t){i.seq.push(t),i.map[t.id]=t}function Wb(i,t,e){const n=i.name,r=n.length;for(yl.lastIndex=0;;){const s=yl.exec(n),a=yl.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Zf(e,l===void 0?new Hb(o,i,t):new zb(o,i,t));break}else{let h=e.map[o];h===void 0&&(h=new Vb(o),Zf(e,h)),e=h}}}class Oo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Wb(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function $f(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Xb=37297;let qb=0;function Kb(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const jf=new Vt;function Yb(i){ne._getMatrix(jf,ne.workingColorSpace,i);const t=`mat3( ${jf.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(i)){case Yo:return[t,"LinearTransferOETF"];case ge:return[t,"sRGBTransferOETF"];default:return Bt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function td(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=(i.getShaderInfoLog(t)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+Kb(i.getShaderSource(t),o)}else return s}function Jb(i,t){const e=Yb(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Qb={[Op]:"Linear",[Bp]:"Reinhard",[kp]:"Cineon",[eh]:"ACESFilmic",[Hp]:"AgX",[zp]:"Neutral",[Gp]:"Custom"};function Zb(i,t){const e=Qb[t];return e===void 0?(Bt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _o=new H;function $b(){ne.getLuminanceCoefficients(_o);const i=_o.x.toFixed(4),t=_o.y.toFixed(4),e=_o.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(la).join(`
`)}function tw(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ew(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function la(i){return i!==""}function ed(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const nw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cu(i){return i.replace(nw,rw)}const iw=new Map;function rw(i,t){let e=Qt[t];if(e===void 0){const n=iw.get(t);if(n!==void 0)e=Qt[n],Bt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Cu(e)}const sw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function id(i){return i.replace(sw,aw)}function aw(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function rd(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const ow={[No]:"SHADOWMAP_TYPE_PCF",[ca]:"SHADOWMAP_TYPE_VSM"};function cw(i){return ow[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const lw={[Vr]:"ENVMAP_TYPE_CUBE",[Ns]:"ENVMAP_TYPE_CUBE",[dc]:"ENVMAP_TYPE_CUBE_UV"};function uw(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":lw[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const hw={[Ns]:"ENVMAP_MODE_REFRACTION"};function fw(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":hw[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const dw={[Fp]:"ENVMAP_BLENDING_MULTIPLY",[Z0]:"ENVMAP_BLENDING_MIX",[$0]:"ENVMAP_BLENDING_ADD"};function pw(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":dw[i.combine]||"ENVMAP_BLENDING_NONE"}function mw(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function gw(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=cw(e),l=uw(e),u=fw(e),h=pw(e),f=mw(e),d=jb(e),g=tw(s),y=r.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(la).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(la).join(`
`),p.length>0&&(p+=`
`)):(m=[rd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(la).join(`
`),p=[rd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gi?"#define TONE_MAPPING":"",e.toneMapping!==gi?Qt.tonemapping_pars_fragment:"",e.toneMapping!==gi?Zb("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,Jb("linearToOutputTexel",e.outputColorSpace),$b(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(la).join(`
`)),a=Cu(a),a=ed(a,e),a=nd(a,e),o=Cu(o),o=ed(o,e),o=nd(o,e),a=id(a),o=id(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===hf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===hf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+a,v=b+p+o,M=$f(r,r.VERTEX_SHADER,S),w=$f(r,r.FRAGMENT_SHADER,v);r.attachShader(y,M),r.attachShader(y,w),e.index0AttributeName!==void 0?r.bindAttribLocation(y,0,e.index0AttributeName):e.hasPositionAttribute===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function T(N){if(i.debug.checkShaderErrors){const U=r.getProgramInfoLog(y)||"",L=r.getShaderInfoLog(M)||"",P=r.getShaderInfoLog(w)||"",I=U.trim(),D=L.trim(),G=P.trim();let Y=!0,V=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,M,w);else{const Q=td(r,M,"vertex"),Z=td(r,w,"fragment");ce("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+I+`
`+Q+`
`+Z)}else I!==""?Bt("WebGLProgram: Program Info Log:",I):(D===""||G==="")&&(V=!1);V&&(N.diagnostics={runnable:Y,programLog:I,vertexShader:{log:D,prefix:m},fragmentShader:{log:G,prefix:p}})}r.deleteShader(M),r.deleteShader(w),x=new Oo(r,y),E=ew(r,y)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(y,Xb)),R},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=qb++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=M,this.fragmentShader=w,this}let yw=0;class xw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const r=this._getShaderCacheForMaterial(t);return r.has(e)===!1&&(r.add(e),e.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new _w(t),e.set(t,n)),n}}class _w{constructor(t){this.id=yw++,this.code=t,this.usedTimes=0}}function vw(i){return i===Wr||i===Xo||i===qo}function bw(i,t,e,n,r,s){const a=new $p,o=new xw,c=new Set,l=[],u=new Map,h=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,E,R,N,U,L){const P=N.fog,I=U.geometry,D=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?N.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Y=t.get(x.envMap||D,G),V=Y&&Y.mapping===dc?Y.image.height:null,Q=d[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Bt("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const Z=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,at=Z!==void 0?Z.length:0;let ot=0;I.morphAttributes.position!==void 0&&(ot=1),I.morphAttributes.normal!==void 0&&(ot=2),I.morphAttributes.color!==void 0&&(ot=3);let Ot,Nt,Kt,J;if(Q){const Ae=hi[Q];Ot=Ae.vertexShader,Nt=Ae.fragmentShader}else{Ot=x.vertexShader,Nt=x.fragmentShader;const Ae=o.getVertexShaderStage(x),fe=o.getFragmentShaderStage(x);o.update(x,Ae,fe),Kt=Ae.id,J=fe.id}const et=i.getRenderTarget(),ct=i.state.buffers.depth.getReversed(),Lt=U.isInstancedMesh===!0,yt=U.isBatchedMesh===!0,Ut=!!x.map,pe=!!x.matcap,Gt=!!Y,$t=!!x.aoMap,le=!!x.lightMap,Ht=!!x.bumpMap&&x.wireframe===!1,ue=!!x.normalMap,_e=!!x.displacementMap,Ce=!!x.emissiveMap,me=!!x.metalnessMap,re=!!x.roughnessMap,B=x.anisotropy>0,ze=x.clearcoat>0,ae=x.dispersion>0,C=x.retroreflectivity>0,_=x.iridescence>0,z=x.sheen>0,q=x.transmission>0,$=B&&!!x.anisotropyMap,st=ze&&!!x.clearcoatMap,lt=ze&&!!x.clearcoatNormalMap,j=ze&&!!x.clearcoatRoughnessMap,nt=_&&!!x.iridescenceMap,ut=_&&!!x.iridescenceThicknessMap,Rt=z&&!!x.sheenColorMap,pt=z&&!!x.sheenRoughnessMap,ht=!!x.specularMap,Pt=!!x.specularColorMap,Dt=!!x.specularIntensityMap,Wt=q&&!!x.transmissionMap,k=q&&!!x.thicknessMap,ft=!!x.gradientMap,tt=!!x.alphaMap,dt=x.alphaTest>0,vt=!!x.alphaHash,rt=!!x.extensions;let It=gi;x.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(It=i.toneMapping);const Tt={shaderID:Q,shaderType:x.type,shaderName:x.name,vertexShader:Ot,fragmentShader:Nt,defines:x.defines,customVertexShaderID:Kt,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:yt,batchingColor:yt&&U._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&U.instanceColor!==null,instancingMorph:Lt&&U.morphTexture!==null,outputColorSpace:et===null?i.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:ne.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ut,matcap:pe,envMap:Gt,envMapMode:Gt&&Y.mapping,envMapCubeUVHeight:V,aoMap:$t,lightMap:le,bumpMap:Ht,normalMap:ue,displacementMap:_e,emissiveMap:Ce,normalMapObjectSpace:ue&&x.normalMapType===ey,normalMapTangentSpace:ue&&x.normalMapType===Au,packedNormalMap:ue&&x.normalMapType===Au&&vw(x.normalMap.format),metalnessMap:me,roughnessMap:re,anisotropy:B,anisotropyMap:$,clearcoat:ze,clearcoatMap:st,clearcoatNormalMap:lt,clearcoatRoughnessMap:j,dispersion:ae,retroreflection:C,iridescence:_,iridescenceMap:nt,iridescenceThicknessMap:ut,sheen:z,sheenColorMap:Rt,sheenRoughnessMap:pt,specularMap:ht,specularColorMap:Pt,specularIntensityMap:Dt,transmission:q,transmissionMap:Wt,thicknessMap:k,gradientMap:ft,opaque:x.transparent===!1&&x.blending===pa&&x.alphaToCoverage===!1,alphaMap:tt,alphaTest:dt,alphaHash:vt,combine:x.combine,mapUv:Ut&&g(x.map.channel),aoMapUv:$t&&g(x.aoMap.channel),lightMapUv:le&&g(x.lightMap.channel),bumpMapUv:Ht&&g(x.bumpMap.channel),normalMapUv:ue&&g(x.normalMap.channel),displacementMapUv:_e&&g(x.displacementMap.channel),emissiveMapUv:Ce&&g(x.emissiveMap.channel),metalnessMapUv:me&&g(x.metalnessMap.channel),roughnessMapUv:re&&g(x.roughnessMap.channel),anisotropyMapUv:$&&g(x.anisotropyMap.channel),clearcoatMapUv:st&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:lt&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:nt&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:pt&&g(x.sheenRoughnessMap.channel),specularMapUv:ht&&g(x.specularMap.channel),specularColorMapUv:Pt&&g(x.specularColorMap.channel),specularIntensityMapUv:Dt&&g(x.specularIntensityMap.channel),transmissionMapUv:Wt&&g(x.transmissionMap.channel),thicknessMapUv:k&&g(x.thicknessMap.channel),alphaMapUv:tt&&g(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ue||B),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!I.attributes.uv&&(Ut||tt),fog:!!P,useFog:x.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&ue===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ct,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:ot,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:L.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:Ut&&x.map.isVideoTexture===!0&&ne.getTransfer(x.map.colorSpace)===ge,decodeVideoTextureEmissive:Ce&&x.emissiveMap.isVideoTexture===!0&&ne.getTransfer(x.emissiveMap.colorSpace)===ge,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===An,flipSided:x.side===Mn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:rt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&x.extensions.multiDraw===!0||yt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Tt.vertexUv1s=c.has(1),Tt.vertexUv2s=c.has(2),Tt.vertexUv3s=c.has(3),c.clear(),Tt}function m(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)E.push(R),E.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(p(E,x),b(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function p(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numSunLights),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numSunLightShadows),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function b(x,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function S(x){const E=d[x.type];let R;if(E){const N=hi[E];R=Gy.clone(N.uniforms)}else R=x.uniforms;return R}function v(x,E){let R=u.get(E);return R!==void 0?++R.usedTimes:(R=new gw(i,E,x,r),l.push(R),u.set(E,R)),R}function M(x){if(--x.usedTimes===0){const E=l.indexOf(x);l[E]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function T(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:S,acquireProgram:v,releaseProgram:M,releaseShaderCache:w,programs:l,dispose:T}}function ww(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function Aw(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function sd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ad(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,g,y,m,p){let b=i[t];return b===void 0?(b={id:f.id,object:f,geometry:d,material:g,materialVariant:a(f),groupOrder:y,renderOrder:f.renderOrder,z:m,group:p},i[t]=b):(b.id=f.id,b.object=f,b.geometry=d,b.material=g,b.materialVariant=a(f),b.groupOrder=y,b.renderOrder=f.renderOrder,b.z=m,b.group=p),t++,b}function c(f,d,g,y,m,p,b){b.reversedDepth===!0&&(m=-m);const S=o(f,d,g,y,m,p);g.transmission>0?n.push(S):g.transparent===!0?r.push(S):e.push(S)}function l(f,d,g,y,m,p){const b=o(f,d,g,y,m,p);g.transmission>0?n.unshift(b):g.transparent===!0?r.unshift(b):e.unshift(b)}function u(f,d){e.length>1&&e.sort(f||Aw),n.length>1&&n.sort(d||sd),r.length>1&&r.sort(d||sd)}function h(){for(let f=t,d=i.length;f<d;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:h,sort:u}}function Mw(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new ad,i.set(n,[a])):r>=s.length?(a=new ad,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Sw(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new H,color:new kt};break;case"SpotLight":e={position:new H,direction:new H,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function Ew(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Tw=0;function Cw(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Rw(i){const t=new Sw,e=Ew(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new H);const r=new H,s=new we,a=new we;function o(l){let u=0,h=0,f=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let d=0,g=0,y=0,m=0,p=0,b=0,S=0,v=0,M=0,w=0,T=0,x=0,E=0,R=0;l.sort(Cw);for(let U=0,L=l.length;U<L;U++){const P=l[U],I=P.color,D=P.intensity,G=P.distance;let Y=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Wr?Y=P.shadow.map.texture:Y=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=I.r*D,h+=I.g*D,f+=I.b*D;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],D);R++}else if(P.isSunLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,Z=e.get(P);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[g]=Z,n.sunShadowMap[g]=Y;const at=Q.getViewportCount();for(let ot=0;ot<at;ot++)n.sunShadowMatrix[y+ot]=Q.getMatrix(ot),n.sunShadowCascade[y+ot]=Q._cascadeData[ot];y+=at,g++}n.sun[d]=V,d++}else if(P.isDirectionalLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Q=P.shadow,Z=e.get(P);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,n.directionalShadow[m]=Z,n.directionalShadowMap[m]=Y,n.directionalShadowMatrix[m]=P.shadow.matrix,M++}n.directional[m]=V,m++}else if(P.isSpotLight){const V=t.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(I).multiplyScalar(D),V.distance=G,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[b]=V;const Q=P.shadow;if(P.map&&(n.spotLightMap[x]=P.map,x++,Q.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[b]=Q.matrix,P.castShadow){const Z=e.get(P);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,n.spotShadow[b]=Z,n.spotShadowMap[b]=Y,T++}b++}else if(P.isRectAreaLight){const V=t.get(P);V.color.copy(I).multiplyScalar(D),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[S]=V,S++}else if(P.isPointLight){const V=t.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const Q=P.shadow,Z=e.get(P);Z.shadowIntensity=Q.intensity,Z.shadowBias=Q.bias,Z.shadowNormalBias=Q.normalBias,Z.shadowRadius=Q.radius,Z.shadowMapSize=Q.mapSize,Z.shadowCameraNear=Q.camera.near,Z.shadowCameraFar=Q.camera.far,n.pointShadow[p]=Z,n.pointShadowMap[p]=Y,n.pointShadowMatrix[p]=P.shadow.matrix,w++}n.point[p]=V,p++}else if(P.isHemisphereLight){const V=t.get(P);V.skyColor.copy(P.color).multiplyScalar(D),V.groundColor.copy(P.groundColor).multiplyScalar(D),n.hemi[v]=V,v++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=mt.LTC_FLOAT_1,n.rectAreaLTC2=mt.LTC_FLOAT_2):(n.rectAreaLTC1=mt.LTC_HALF_1,n.rectAreaLTC2=mt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const N=n.hash;(N.sunLength!==d||N.directionalLength!==m||N.pointLength!==p||N.spotLength!==b||N.rectAreaLength!==S||N.hemiLength!==v||N.numSunShadows!==g||N.numDirectionalShadows!==M||N.numPointShadows!==w||N.numSpotShadows!==T||N.numSpotMaps!==x||N.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=m,n.spot.length=b,n.rectArea.length=S,n.point.length=p,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.directionalShadowMatrix.length=M,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=T,n.spotShadowMap.length=T,n.spotLightMatrix.length=T+x-E,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,N.sunLength=d,N.directionalLength=m,N.pointLength=p,N.spotLength=b,N.rectAreaLength=S,N.hemiLength=v,N.numSunShadows=g,N.numDirectionalShadows=M,N.numPointShadows=w,N.numSpotShadows=T,N.numSpotMaps=x,N.numLightProbes=R,n.version=Tw++)}function c(l,u){let h=0,f=0,d=0,g=0,y=0,m=0;const p=u.matrixWorldInverse;for(let b=0,S=l.length;b<S;b++){const v=l[b];if(v.isSunLight){const M=n.sun[h];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(p),h++}else if(v.isDirectionalLight){const M=n.directional[f];M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),f++}else if(v.isSpotLight){const M=n.spot[g];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),g++}else if(v.isRectAreaLight){const M=n.rectArea[y];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),a.identity(),s.copy(v.matrixWorld),s.premultiply(p),a.extractRotation(s),M.halfWidth.set(v.width*.5,0,0),M.halfHeight.set(0,v.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(v.matrixWorld),M.position.applyMatrix4(p),d++}else if(v.isHemisphereLight){const M=n.hemi[m];M.direction.setFromMatrixPosition(v.matrixWorld),M.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function od(i){const t=new Rw(i),e=[],n=[],r=[];function s(f){h.camera=f,e.length=0,n.length=0,r.length=0}function a(f){e.push(f)}function o(f){n.push(f)}function c(f){r.push(f)}function l(){t.setup(e)}function u(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Pw(i){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new od(i),t.set(r,[o])):s>=a.length?(o=new od(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Iw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nw=`uniform sampler2D shadow_pass;
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
}`,Lw=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Uw=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],cd=new we,ia=new H,xl=new H;function Dw(i,t,e){let n=new ph;const r=new qt,s=new qt,a=new Le,o=new Wy,c=new Xy,l={},u=e.maxTextureSize,h={[zr]:Mn,[Mn]:zr,[An]:An},f=new ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:Iw,fragmentShader:Nw}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ke;g.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ue(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=No;let p=this.type;this.render=function(w,T,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===N0&&(Bt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=No);const E=i.getRenderTarget(),R=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Ui),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const L=p!==this.type;L&&T.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(I=>I.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,I=w.length;P<I;P++){const D=w[P],G=D.shadow;if(G===void 0){Bt("WebGLShadowMap:",D,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const Y=G.getFrameExtents();r.multiply(Y),s.copy(G.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Y.x),r.x=s.x*Y.x,G.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Y.y),r.y=s.y*Y.y,G.mapSize.y=s.y));const V=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=V,G.map===null||L===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===ca){if(D.isPointLight){Bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new ni(r.x,r.y,{format:Wr,type:_i,minFilter:cn,magFilter:cn,generateMipmaps:!1}),G.map.texture.name=D.name+".shadowMap",G.map.depthTexture=new Sa(r.x,r.y,ti),G.map.depthTexture.name=D.name+".shadowMapDepth",G.map.depthTexture.format=ki,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=rn,G.map.depthTexture.magFilter=rn}else D.isPointLight?(G.map=new mm(r.x),G.map.depthTexture=new By(r.x,xi)):(G.map=new ni(r.x,r.y),G.map.depthTexture=new Sa(r.x,r.y,xi)),G.map.depthTexture.name=D.name+".shadowMap",G.map.depthTexture.format=ki,this.type===No?(G.map.depthTexture.compareFunction=V?uh:lh,G.map.depthTexture.minFilter=cn,G.map.depthTexture.magFilter=cn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=rn,G.map.depthTexture.magFilter=rn);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==r.x||G.map.height!==r.y)&&G.map.setSize(r.x,r.y);const Q=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();D.isPointLight!==!0&&G.updateMatrices(D,x);for(let Z=0;Z<Q;Z++){const at=G.getCamera(Z);if(D.isPointLight){const ot=G.camera,Ot=G.matrix,Nt=D.distance||ot.far;Nt!==ot.far&&(ot.far=Nt,ot.updateProjectionMatrix()),ia.setFromMatrixPosition(D.matrixWorld),ot.position.copy(ia),xl.copy(ot.position),xl.add(Lw[Z]),ot.up.copy(Uw[Z]),ot.lookAt(xl),ot.updateMatrixWorld(),Ot.makeTranslation(-ia.x,-ia.y,-ia.z),cd.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),G._frustum.setFromProjectionMatrix(cd,ot.coordinateSystem,ot.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,Z),i.clear();else{Z===0&&(i.setRenderTarget(G.map),i.clear());const ot=G.getViewport(Z);a.set(s.x*ot.x,s.y*ot.y,s.x*ot.z,s.y*ot.w),U.viewport(a)}n=G.getFrustum(Z),v(T,x,at,D,this.type)}G.isPointLightShadow!==!0&&this.type===ca&&b(G,x),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,R,N)};function b(w,T){const x=t.update(y);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null?w.mapPass=new ni(r.x,r.y,{format:Wr,type:_i}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(T,null,x,f,y,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(T,null,x,d,y,null)}function S(w,T,x,E){let R=null;const N=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)R=N;else if(R=x.isPointLight===!0?c:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const U=R.uuid,L=T.uuid;let P=l[U];P===void 0&&(P={},l[U]=P);let I=P[L];I===void 0&&(I=R.clone(),P[L]=I,T.addEventListener("dispose",M)),R=I}if(R.visible=T.visible,R.wireframe=T.wireframe,E===ca?R.side=T.shadowSide!==null?T.shadowSide:T.side:R.side=T.shadowSide!==null?T.shadowSide:h[T.side],R.alphaMap=T.alphaMap,R.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,R.map=T.map,R.clipShadows=T.clipShadows,R.clippingPlanes=T.clippingPlanes,R.clipIntersection=T.clipIntersection,R.displacementMap=T.displacementMap,R.displacementScale=T.displacementScale,R.displacementBias=T.displacementBias,R.wireframeLinewidth=T.wireframeLinewidth,R.linewidth=T.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const U=i.properties.get(R);U.light=x}return R}function v(w,T,x,E,R){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===ca)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);const L=t.update(w),P=w.material;if(Array.isArray(P)){const I=L.groups;for(let D=0,G=I.length;D<G;D++){const Y=I[D],V=P[Y.materialIndex];if(V&&V.visible){const Q=S(w,V,E,R);w.onBeforeShadow(i,w,T,x,L,Q,Y),i.renderBufferDirect(x,null,L,Q,w,Y),w.onAfterShadow(i,w,T,x,L,Q,Y)}}}else if(P.visible){const I=S(w,P,E,R);w.onBeforeShadow(i,w,T,x,L,I,null),i.renderBufferDirect(x,null,L,I,w,null),w.onAfterShadow(i,w,T,x,L,I,null)}}const U=w.children;for(let L=0,P=U.length;L<P;L++)v(U[L],T,x,E,R)}function M(w){w.target.removeEventListener("dispose",M);for(const x in l){const E=l[x],R=w.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function Fw(i,t){function e(){let k=!1;const ft=new Le;let tt=null;const dt=new Le(0,0,0,0);return{setMask:function(vt){tt!==vt&&!k&&(i.colorMask(vt,vt,vt,vt),tt=vt)},setLocked:function(vt){k=vt},setClear:function(vt,rt,It,Tt,Ae){Ae===!0&&(vt*=Tt,rt*=Tt,It*=Tt),ft.set(vt,rt,It,Tt),dt.equals(ft)===!1&&(i.clearColor(vt,rt,It,Tt),dt.copy(ft))},reset:function(){k=!1,tt=null,dt.set(-1,0,0,0)}}}function n(){let k=!1,ft=!1,tt=null,dt=null,vt=null;return{setReversed:function(rt){if(ft!==rt){const It=t.get("EXT_clip_control");rt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),ft=rt;const Tt=vt;vt=null,this.setClear(Tt)}},getReversed:function(){return ft},setTest:function(rt){rt?et(i.DEPTH_TEST):ct(i.DEPTH_TEST)},setMask:function(rt){tt!==rt&&!k&&(i.depthMask(rt),tt=rt)},setFunc:function(rt){if(ft&&(rt=dy[rt]),dt!==rt){switch(rt){case Bl:i.depthFunc(i.NEVER);break;case kl:i.depthFunc(i.ALWAYS);break;case Gl:i.depthFunc(i.LESS);break;case ba:i.depthFunc(i.LEQUAL);break;case Hl:i.depthFunc(i.EQUAL);break;case zl:i.depthFunc(i.GEQUAL);break;case Vl:i.depthFunc(i.GREATER);break;case Wl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}dt=rt}},setLocked:function(rt){k=rt},setClear:function(rt){vt!==rt&&(vt=rt,ft&&(rt=1-rt),i.clearDepth(rt))},reset:function(){k=!1,tt=null,dt=null,vt=null,ft=!1}}}function r(){let k=!1,ft=null,tt=null,dt=null,vt=null,rt=null,It=null,Tt=null,Ae=null;return{setTest:function(fe){k||(fe?et(i.STENCIL_TEST):ct(i.STENCIL_TEST))},setMask:function(fe){ft!==fe&&!k&&(i.stencilMask(fe),ft=fe)},setFunc:function(fe,Vn,ai){(tt!==fe||dt!==Vn||vt!==ai)&&(i.stencilFunc(fe,Vn,ai),tt=fe,dt=Vn,vt=ai)},setOp:function(fe,Vn,ai){(rt!==fe||It!==Vn||Tt!==ai)&&(i.stencilOp(fe,Vn,ai),rt=fe,It=Vn,Tt=ai)},setLocked:function(fe){k=fe},setClear:function(fe){Ae!==fe&&(i.clearStencil(fe),Ae=fe)},reset:function(){k=!1,ft=null,tt=null,dt=null,vt=null,rt=null,It=null,Tt=null,Ae=null}}}const s=new e,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},h={},f={},d=new WeakMap,g=[],y=null,m=!1,p=null,b=null,S=null,v=null,M=null,w=null,T=null,x=new kt(0,0,0),E=0,R=!1,N=null,U=null,L=null,P=null,I=null;const D=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Y=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(V)[1]),G=Y>=1):V.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),G=Y>=2);let Q=null,Z={};const at=i.getParameter(i.SCISSOR_BOX),ot=i.getParameter(i.VIEWPORT),Ot=new Le().fromArray(at),Nt=new Le().fromArray(ot);function Kt(k,ft,tt,dt){const vt=new Uint8Array(4),rt=i.createTexture();i.bindTexture(k,rt),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let It=0;It<tt;It++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,dt,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ft+It,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return rt}const J={};J[i.TEXTURE_2D]=Kt(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Kt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Kt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Kt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(ba),Ht(!1),ue(cf),et(i.CULL_FACE),$t(Ui);function et(k){u[k]!==!0&&(i.enable(k),u[k]=!0)}function ct(k){u[k]!==!1&&(i.disable(k),u[k]=!1)}function Lt(k,ft){return f[k]!==ft?(i.bindFramebuffer(k,ft),f[k]=ft,k===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ft),k===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function yt(k,ft){let tt=g,dt=!1;if(k){tt=d.get(ft),tt===void 0&&(tt=[],d.set(ft,tt));const vt=k.textures;if(tt.length!==vt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,It=vt.length;rt<It;rt++)tt[rt]=i.COLOR_ATTACHMENT0+rt;tt.length=vt.length,dt=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,dt=!0);dt&&i.drawBuffers(tt)}function Ut(k){return y!==k?(i.useProgram(k),y=k,!0):!1}const pe={[vs]:i.FUNC_ADD,[U0]:i.FUNC_SUBTRACT,[D0]:i.FUNC_REVERSE_SUBTRACT};pe[F0]=i.MIN,pe[O0]=i.MAX;const Gt={[B0]:i.ZERO,[k0]:i.ONE,[G0]:i.SRC_COLOR,[Up]:i.SRC_ALPHA,[q0]:i.SRC_ALPHA_SATURATE,[W0]:i.DST_COLOR,[z0]:i.DST_ALPHA,[H0]:i.ONE_MINUS_SRC_COLOR,[Dp]:i.ONE_MINUS_SRC_ALPHA,[X0]:i.ONE_MINUS_DST_COLOR,[V0]:i.ONE_MINUS_DST_ALPHA,[K0]:i.CONSTANT_COLOR,[Y0]:i.ONE_MINUS_CONSTANT_COLOR,[J0]:i.CONSTANT_ALPHA,[Q0]:i.ONE_MINUS_CONSTANT_ALPHA};function $t(k,ft,tt,dt,vt,rt,It,Tt,Ae,fe){if(k===Ui){m===!0&&(ct(i.BLEND),m=!1);return}if(m===!1&&(et(i.BLEND),m=!0),k!==L0){if(k!==p||fe!==R){if((b!==vs||M!==vs)&&(i.blendEquation(i.FUNC_ADD),b=vs,M=vs),fe)switch(k){case pa:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wo:i.blendFunc(i.ONE,i.ONE);break;case lf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case uf:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ce("WebGLState: Invalid blending: ",k);break}else switch(k){case pa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case lf:ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uf:ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ce("WebGLState: Invalid blending: ",k);break}S=null,v=null,w=null,T=null,x.set(0,0,0),E=0,p=k,R=fe}return}vt=vt||ft,rt=rt||tt,It=It||dt,(ft!==b||vt!==M)&&(i.blendEquationSeparate(pe[ft],pe[vt]),b=ft,M=vt),(tt!==S||dt!==v||rt!==w||It!==T)&&(i.blendFuncSeparate(Gt[tt],Gt[dt],Gt[rt],Gt[It]),S=tt,v=dt,w=rt,T=It),(Tt.equals(x)===!1||Ae!==E)&&(i.blendColor(Tt.r,Tt.g,Tt.b,Ae),x.copy(Tt),E=Ae),p=k,R=!1}function le(k,ft){k.side===An?ct(i.CULL_FACE):et(i.CULL_FACE);let tt=k.side===Mn;ft&&(tt=!tt),Ht(tt),k.blending===pa&&k.transparent===!1?$t(Ui):$t(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),s.setMask(k.colorWrite);const dt=k.stencilWrite;o.setTest(dt),dt&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ce(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(k){N!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),N=k)}function ue(k){k!==P0?(et(i.CULL_FACE),k!==U&&(k===cf?i.cullFace(i.BACK):k===I0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ct(i.CULL_FACE),U=k}function _e(k){k!==L&&(G&&i.lineWidth(k),L=k)}function Ce(k,ft,tt){k?(et(i.POLYGON_OFFSET_FILL),(P!==ft||I!==tt)&&(P=ft,I=tt,a.getReversed()&&(ft=-ft),i.polygonOffset(ft,tt))):ct(i.POLYGON_OFFSET_FILL)}function me(k){k?et(i.SCISSOR_TEST):ct(i.SCISSOR_TEST)}function re(k){k===void 0&&(k=i.TEXTURE0+D-1),Q!==k&&(i.activeTexture(k),Q=k)}function B(k,ft,tt){tt===void 0&&(Q===null?tt=i.TEXTURE0+D-1:tt=Q);let dt=Z[tt];dt===void 0&&(dt={type:void 0,texture:void 0},Z[tt]=dt),(dt.type!==k||dt.texture!==ft)&&(Q!==tt&&(i.activeTexture(tt),Q=tt),i.bindTexture(k,ft||J[k]),dt.type=k,dt.texture=ft)}function ze(){const k=Z[Q];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ae(){try{i.compressedTexImage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function _(){try{i.texSubImage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function z(){try{i.texSubImage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function st(){try{i.texStorage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function lt(){try{i.texStorage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function j(){try{i.texImage2D(...arguments)}catch(k){ce("WebGLState:",k)}}function nt(){try{i.texImage3D(...arguments)}catch(k){ce("WebGLState:",k)}}function ut(k){return h[k]!==void 0?h[k]:i.getParameter(k)}function Rt(k,ft){h[k]!==ft&&(i.pixelStorei(k,ft),h[k]=ft)}function pt(k){Ot.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Ot.copy(k))}function ht(k){Nt.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),Nt.copy(k))}function Pt(k,ft){let tt=l.get(ft);tt===void 0&&(tt=new WeakMap,l.set(ft,tt));let dt=tt.get(k);dt===void 0&&(dt=i.getUniformBlockIndex(ft,k.name),tt.set(k,dt))}function Dt(k,ft){const dt=l.get(ft).get(k);c.get(ft)!==dt&&(i.uniformBlockBinding(ft,dt,k.__bindingPointIndex),c.set(ft,dt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},h={},Q=null,Z={},f={},d=new WeakMap,g=[],y=null,m=!1,p=null,b=null,S=null,v=null,M=null,w=null,T=null,x=new kt(0,0,0),E=0,R=!1,N=null,U=null,L=null,P=null,I=null,Ot.set(0,0,i.canvas.width,i.canvas.height),Nt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:et,disable:ct,bindFramebuffer:Lt,drawBuffers:yt,useProgram:Ut,setBlending:$t,setMaterial:le,setFlipSided:Ht,setCullFace:ue,setLineWidth:_e,setPolygonOffset:Ce,setScissorTest:me,activeTexture:re,bindTexture:B,unbindTexture:ze,compressedTexImage2D:ae,compressedTexImage3D:C,texImage2D:j,texImage3D:nt,pixelStorei:Rt,getParameter:ut,updateUBOMapping:Pt,uniformBlockBinding:Dt,texStorage2D:st,texStorage3D:lt,texSubImage2D:_,texSubImage3D:z,compressedTexSubImage2D:q,compressedTexSubImage3D:$,scissor:pt,viewport:ht,reset:Wt}}function Ow(i,t,e,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new qt,u=new WeakMap,h=new Set;let f;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,_){return g?new OffscreenCanvas(C,_):Jo("canvas")}function m(C,_,z){let q=1;const $=ae(C);if(($.width>z||$.height>z)&&(q=z/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const st=Math.floor(q*$.width),lt=Math.floor(q*$.height);f===void 0&&(f=y(st,lt));const j=_?y(st,lt):f;return j.width=st,j.height=lt,j.getContext("2d").drawImage(C,0,0,st,lt),Bt("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+st+"x"+lt+")."),j}else return"data"in C&&Bt("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function p(C){return C.generateMipmaps}function b(C){i.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(C,_,z,q,$,st=!1){if(C!==null){if(i[C]!==void 0)return i[C];Bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let lt;q&&(lt=t.get("EXT_texture_norm16"),lt||Bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=_;if(_===i.RED&&(z===i.FLOAT&&(j=i.R32F),z===i.HALF_FLOAT&&(j=i.R16F),z===i.UNSIGNED_BYTE&&(j=i.R8),z===i.UNSIGNED_SHORT&&lt&&(j=lt.R16_EXT),z===i.SHORT&&lt&&(j=lt.R16_SNORM_EXT)),_===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.R8UI),z===i.UNSIGNED_SHORT&&(j=i.R16UI),z===i.UNSIGNED_INT&&(j=i.R32UI),z===i.BYTE&&(j=i.R8I),z===i.SHORT&&(j=i.R16I),z===i.INT&&(j=i.R32I)),_===i.RG&&(z===i.FLOAT&&(j=i.RG32F),z===i.HALF_FLOAT&&(j=i.RG16F),z===i.UNSIGNED_BYTE&&(j=i.RG8),z===i.UNSIGNED_SHORT&&lt&&(j=lt.RG16_EXT),z===i.SHORT&&lt&&(j=lt.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RG8UI),z===i.UNSIGNED_SHORT&&(j=i.RG16UI),z===i.UNSIGNED_INT&&(j=i.RG32UI),z===i.BYTE&&(j=i.RG8I),z===i.SHORT&&(j=i.RG16I),z===i.INT&&(j=i.RG32I)),_===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGB8UI),z===i.UNSIGNED_SHORT&&(j=i.RGB16UI),z===i.UNSIGNED_INT&&(j=i.RGB32UI),z===i.BYTE&&(j=i.RGB8I),z===i.SHORT&&(j=i.RGB16I),z===i.INT&&(j=i.RGB32I)),_===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),z===i.UNSIGNED_INT&&(j=i.RGBA32UI),z===i.BYTE&&(j=i.RGBA8I),z===i.SHORT&&(j=i.RGBA16I),z===i.INT&&(j=i.RGBA32I)),_===i.RGB&&(z===i.UNSIGNED_SHORT&&lt&&(j=lt.RGB16_EXT),z===i.SHORT&&lt&&(j=lt.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),_===i.RGBA){const nt=st?Yo:ne.getTransfer($);z===i.FLOAT&&(j=i.RGBA32F),z===i.HALF_FLOAT&&(j=i.RGBA16F),z===i.UNSIGNED_BYTE&&(j=nt===ge?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&lt&&(j=lt.RGBA16_EXT),z===i.SHORT&&lt&&(j=lt.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function M(C,_){let z;return C?_===null||_===xi||_===Aa?z=i.DEPTH24_STENCIL8:_===ti?z=i.DEPTH32F_STENCIL8:_===wa&&(z=i.DEPTH24_STENCIL8,Bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===xi||_===Aa?z=i.DEPTH_COMPONENT24:_===ti?z=i.DEPTH_COMPONENT32F:_===wa&&(z=i.DEPTH_COMPONENT16),z}function w(C,_){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==rn&&C.minFilter!==cn?Math.log2(Math.max(_.width,_.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?_.mipmaps.length:1}function T(C){const _=C.target;_.removeEventListener("dispose",T),E(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function x(C){const _=C.target;_.removeEventListener("dispose",x),N(_)}function E(C){const _=n.get(C);if(_.__webglInit===void 0)return;const z=C.source,q=d.get(z);if(q){const $=q[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&R(C),Object.keys(q).length===0&&d.delete(z)}n.remove(C)}function R(C){const _=n.get(C);i.deleteTexture(_.__webglTexture);const z=C.source,q=d.get(z);delete q[_.__cacheKey],a.memory.textures--}function N(C){const _=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let $=0;$<_.__webglFramebuffer[q].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[q][$]);else i.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)i.deleteFramebuffer(_.__webglFramebuffer[q]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const z=C.textures;for(let q=0,$=z.length;q<$;q++){const st=n.get(z[q]);st.__webglTexture&&(i.deleteTexture(st.__webglTexture),a.memory.textures--),n.remove(z[q])}n.remove(C)}let U=0;function L(){U=0}function P(){return U}function I(C){U=C}function D(){const C=U;return C>=r.maxTextures&&Bt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+r.maxTextures),U+=1,C}function G(C){const _=[];return _.push(C.wrapS),_.push(C.wrapT),_.push(C.wrapR||0),_.push(C.magFilter),_.push(C.minFilter),_.push(C.anisotropy),_.push(C.internalFormat),_.push(C.format),_.push(C.type),_.push(C.generateMipmaps),_.push(C.premultiplyAlpha),_.push(C.flipY),_.push(C.unpackAlignment),_.push(C.colorSpace),_.join()}function Y(C,_){const z=n.get(C);if(C.isVideoTexture&&B(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){const q=C.image;if(q===null)Bt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Bt("WebGLRenderer: Texture marked for update but image is incomplete");else{ct(z,C,_);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+_)}function V(C,_){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){ct(z,C,_);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+_)}function Q(C,_){const z=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){ct(z,C,_);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+_)}function Z(C,_){const z=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){Lt(z,C,_);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+_)}const at={[Xl]:i.REPEAT,[Ii]:i.CLAMP_TO_EDGE,[ql]:i.MIRRORED_REPEAT},ot={[rn]:i.NEAREST,[j0]:i.NEAREST_MIPMAP_NEAREST,[qa]:i.NEAREST_MIPMAP_LINEAR,[cn]:i.LINEAR,[Hc]:i.LINEAR_MIPMAP_NEAREST,[Rr]:i.LINEAR_MIPMAP_LINEAR},Ot={[iy]:i.NEVER,[cy]:i.ALWAYS,[ry]:i.LESS,[lh]:i.LEQUAL,[sy]:i.EQUAL,[uh]:i.GEQUAL,[ay]:i.GREATER,[oy]:i.NOTEQUAL};function Nt(C,_){if(_.type===ti&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===cn||_.magFilter===Hc||_.magFilter===qa||_.magFilter===Rr||_.minFilter===cn||_.minFilter===Hc||_.minFilter===qa||_.minFilter===Rr)&&Bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,at[_.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,at[_.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,at[_.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ot[_.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ot[_.minFilter]),_.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Ot[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===rn||_.minFilter!==qa&&_.minFilter!==Rr||_.type===ti&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Kt(C,_){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,_.addEventListener("dispose",T));const q=_.source;let $=d.get(q);$===void 0&&($={},d.set(q,$));const st=G(_);if(st!==C.__cacheKey){$[st]===void 0&&($[st]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),$[st].usedTimes++;const lt=$[C.__cacheKey];lt!==void 0&&($[C.__cacheKey].usedTimes--,lt.usedTimes===0&&R(_)),C.__cacheKey=st,C.__webglTexture=$[st].texture}return z}function J(C,_,z){return Math.floor(Math.floor(C/z)/_)}function et(C,_,z,q){const st=C.updateRanges;if(st.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,z,q,_.data);else{st.sort((Rt,pt)=>Rt.start-pt.start);let lt=0;for(let Rt=1;Rt<st.length;Rt++){const pt=st[lt],ht=st[Rt],Pt=pt.start+pt.count,Dt=J(ht.start,_.width,4),Wt=J(pt.start,_.width,4);ht.start<=Pt+1&&Dt===Wt&&J(ht.start+ht.count-1,_.width,4)===Dt?pt.count=Math.max(pt.count,ht.start+ht.count-pt.start):(++lt,st[lt]=ht)}st.length=lt+1;const j=e.getParameter(i.UNPACK_ROW_LENGTH),nt=e.getParameter(i.UNPACK_SKIP_PIXELS),ut=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Rt=0,pt=st.length;Rt<pt;Rt++){const ht=st[Rt],Pt=Math.floor(ht.start/4),Dt=Math.ceil(ht.count/4),Wt=Pt%_.width,k=Math.floor(Pt/_.width),ft=Dt,tt=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),e.pixelStorei(i.UNPACK_SKIP_ROWS,k),e.texSubImage2D(i.TEXTURE_2D,0,Wt,k,ft,tt,z,q,_.data)}C.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,j),e.pixelStorei(i.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(i.UNPACK_SKIP_ROWS,ut)}}function ct(C,_,z){let q=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=i.TEXTURE_3D);const $=Kt(C,_),st=_.source;e.bindTexture(q,C.__webglTexture,i.TEXTURE0+z);const lt=n.get(st);if(st.version!==lt.__version||$===!0){if(e.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const tt=ne.getPrimaries(ne.workingColorSpace),dt=_.colorSpace===lr?null:ne.getPrimaries(_.colorSpace),vt=_.colorSpace===lr||tt===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt)}e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let nt=m(_.image,!1,r.maxTextureSize);nt=ze(_,nt);const ut=s.convert(_.format,_.colorSpace),Rt=s.convert(_.type);let pt=v(_.internalFormat,ut,Rt,_.normalized,_.colorSpace,_.isVideoTexture);Nt(q,_);let ht;const Pt=_.mipmaps,Dt=_.isVideoTexture!==!0,Wt=lt.__version===void 0||$===!0,k=st.dataReady,ft=w(_,nt);if(_.isDepthTexture)pt=M(_.format===Pr,_.type),Wt&&(Dt?e.texStorage2D(i.TEXTURE_2D,1,pt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,pt,nt.width,nt.height,0,ut,Rt,null));else if(_.isDataTexture)if(Pt.length>0){Dt&&Wt&&e.texStorage2D(i.TEXTURE_2D,ft,pt,Pt[0].width,Pt[0].height);for(let tt=0,dt=Pt.length;tt<dt;tt++)ht=Pt[tt],Dt?k&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ht.width,ht.height,ut,Rt,ht.data):e.texImage2D(i.TEXTURE_2D,tt,pt,ht.width,ht.height,0,ut,Rt,ht.data);_.generateMipmaps=!1}else Dt?(Wt&&e.texStorage2D(i.TEXTURE_2D,ft,pt,nt.width,nt.height),k&&et(_,nt,ut,Rt)):e.texImage2D(i.TEXTURE_2D,0,pt,nt.width,nt.height,0,ut,Rt,nt.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Dt&&Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,pt,Pt[0].width,Pt[0].height,nt.depth);for(let tt=0,dt=Pt.length;tt<dt;tt++)if(ht=Pt[tt],_.format!==ei)if(ut!==null)if(Dt){if(k)if(_.layerUpdates.size>0){const vt=Gf(ht.width,ht.height,_.format,_.type);for(const rt of _.layerUpdates){const It=ht.data.subarray(rt*vt/ht.data.BYTES_PER_ELEMENT,(rt+1)*vt/ht.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,rt,ht.width,ht.height,1,ut,It)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,ht.width,ht.height,nt.depth,ut,ht.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,pt,ht.width,ht.height,nt.depth,0,ht.data,0,0);else Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?k&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,ht.width,ht.height,nt.depth,ut,Rt,ht.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,pt,ht.width,ht.height,nt.depth,0,ut,Rt,ht.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Dt&&Wt&&e.texStorage2D(i.TEXTURE_2D,ft,pt,Pt[0].width,Pt[0].height);for(let tt=0,dt=Pt.length;tt<dt;tt++)ht=Pt[tt],_.format!==ei?ut!==null?Dt?k&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,ht.width,ht.height,ut,ht.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,pt,ht.width,ht.height,0,ht.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?k&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ht.width,ht.height,ut,Rt,ht.data):e.texImage2D(i.TEXTURE_2D,tt,pt,ht.width,ht.height,0,ut,Rt,ht.data)}else if(_.isDataArrayTexture)if(Dt){if(Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,pt,nt.width,nt.height,nt.depth),k)if(_.layerUpdates.size>0){const tt=Gf(nt.width,nt.height,_.format,_.type);for(const dt of _.layerUpdates){const vt=nt.data.subarray(dt*tt/nt.data.BYTES_PER_ELEMENT,(dt+1)*tt/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,dt,nt.width,nt.height,1,ut,Rt,vt)}_.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,ut,Rt,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,pt,nt.width,nt.height,nt.depth,0,ut,Rt,nt.data);else if(_.isData3DTexture)Dt?(Wt&&e.texStorage3D(i.TEXTURE_3D,ft,pt,nt.width,nt.height,nt.depth),k&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,ut,Rt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,pt,nt.width,nt.height,nt.depth,0,ut,Rt,nt.data);else if(_.isFramebufferTexture){if(Wt)if(Dt)e.texStorage2D(i.TEXTURE_2D,ft,pt,nt.width,nt.height);else{let tt=nt.width,dt=nt.height;for(let vt=0;vt<ft;vt++)e.texImage2D(i.TEXTURE_2D,vt,pt,tt,dt,0,ut,Rt,null),tt>>=1,dt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){const tt=i.canvas;if(tt.hasAttribute("layoutsubtree")||tt.setAttribute("layoutsubtree","true"),nt.parentNode!==tt){tt.appendChild(nt),h.add(_),tt.onpaint=dt=>{const vt=dt.changedElements;for(const rt of h)vt.includes(rt.image)&&(rt.needsUpdate=!0)},tt.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,nt);else{const vt=i.RGBA,rt=i.RGBA,It=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,vt,rt,It,nt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pt.length>0){if(Dt&&Wt){const tt=ae(Pt[0]);e.texStorage2D(i.TEXTURE_2D,ft,pt,tt.width,tt.height)}for(let tt=0,dt=Pt.length;tt<dt;tt++)ht=Pt[tt],Dt?k&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,ut,Rt,ht):e.texImage2D(i.TEXTURE_2D,tt,pt,ut,Rt,ht);_.generateMipmaps=!1}else if(Dt){if(Wt){const tt=ae(nt);e.texStorage2D(i.TEXTURE_2D,ft,pt,tt.width,tt.height)}k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Rt,nt)}else e.texImage2D(i.TEXTURE_2D,0,pt,ut,Rt,nt);p(_)&&b(q),lt.__version=st.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function Lt(C,_,z){if(_.image.length!==6)return;const q=Kt(C,_),$=_.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+z);const st=n.get($);if($.version!==st.__version||q===!0){e.activeTexture(i.TEXTURE0+z);const lt=ne.getPrimaries(ne.workingColorSpace),j=_.colorSpace===lr?null:ne.getPrimaries(_.colorSpace),nt=_.colorSpace===lr||lt===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);const ut=_.isCompressedTexture||_.image[0].isCompressedTexture,Rt=_.image[0]&&_.image[0].isDataTexture,pt=[];for(let rt=0;rt<6;rt++)!ut&&!Rt?pt[rt]=m(_.image[rt],!0,r.maxCubemapSize):pt[rt]=Rt?_.image[rt].image:_.image[rt],pt[rt]=ze(_,pt[rt]);const ht=pt[0],Pt=s.convert(_.format,_.colorSpace),Dt=s.convert(_.type),Wt=v(_.internalFormat,Pt,Dt,_.normalized,_.colorSpace),k=_.isVideoTexture!==!0,ft=st.__version===void 0||q===!0,tt=$.dataReady;let dt=w(_,ht);Nt(i.TEXTURE_CUBE_MAP,_);let vt;if(ut){k&&ft&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Wt,ht.width,ht.height);for(let rt=0;rt<6;rt++){vt=pt[rt].mipmaps;for(let It=0;It<vt.length;It++){const Tt=vt[It];_.format!==ei?Pt!==null?k?tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,0,0,Tt.width,Tt.height,Pt,Tt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,Wt,Tt.width,Tt.height,0,Tt.data):Bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,0,0,Tt.width,Tt.height,Pt,Dt,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,Wt,Tt.width,Tt.height,0,Pt,Dt,Tt.data)}}}else{if(vt=_.mipmaps,k&&ft){vt.length>0&&dt++;const rt=ae(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Wt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Rt){k?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,pt[rt].width,pt[rt].height,Pt,Dt,pt[rt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Wt,pt[rt].width,pt[rt].height,0,Pt,Dt,pt[rt].data);for(let It=0;It<vt.length;It++){const Ae=vt[It].image[rt].image;k?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,0,0,Ae.width,Ae.height,Pt,Dt,Ae.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,Wt,Ae.width,Ae.height,0,Pt,Dt,Ae.data)}}else{k?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Pt,Dt,pt[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Wt,Pt,Dt,pt[rt]);for(let It=0;It<vt.length;It++){const Tt=vt[It];k?tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,0,0,Pt,Dt,Tt.image[rt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,Wt,Pt,Dt,Tt.image[rt])}}}p(_)&&b(i.TEXTURE_CUBE_MAP),st.__version=$.version,_.onUpdate&&_.onUpdate(_)}C.__version=_.version}function yt(C,_,z,q,$,st){const lt=s.convert(z.format,z.colorSpace),j=s.convert(z.type),nt=v(z.internalFormat,lt,j,z.normalized,z.colorSpace),ut=n.get(_),Rt=n.get(z);if(Rt.__renderTarget=_,!ut.__hasExternalTextures){const pt=Math.max(1,_.width>>st),ht=Math.max(1,_.height>>st);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,st,nt,pt,ht,_.depth,0,lt,j,null):e.texImage2D($,st,nt,pt,ht,0,lt,j,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),re(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,$,Rt.__webglTexture,0,me(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,$,Rt.__webglTexture,st),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(C,_,z){if(i.bindRenderbuffer(i.RENDERBUFFER,C),_.depthBuffer){const q=_.depthTexture,$=q&&q.isDepthTexture?q.type:null,st=M(_.stencilBuffer,$),lt=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;re(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me(_),st,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,me(_),st,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,st,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,C)}else{const q=_.textures;for(let $=0;$<q.length;$++){const st=q[$],lt=s.convert(st.format,st.colorSpace),j=s.convert(st.type),nt=v(st.internalFormat,lt,j,st.normalized,st.colorSpace);re(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me(_),nt,_.width,_.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,me(_),nt,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,nt,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pe(C,_,z){const q=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=n.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Nt(i.TEXTURE_CUBE_MAP,_.depthTexture);const ut=s.convert(_.depthTexture.format),Rt=s.convert(_.depthTexture.type);let pt;_.depthTexture.format===ki?pt=i.DEPTH_COMPONENT24:_.depthTexture.format===Pr&&(pt=i.DEPTH24_STENCIL8);for(let ht=0;ht<6;ht++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0,pt,_.width,_.height,0,ut,Rt,null)}}else Y(_.depthTexture,0);const st=$.__webglTexture,lt=me(_),j=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,nt=_.depthTexture.format===Pr?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===ki)re(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,j,st,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,j,st,0);else if(_.depthTexture.format===Pr)re(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,j,st,0,lt):i.framebufferTexture2D(i.FRAMEBUFFER,nt,j,st,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Gt(C){const _=n.get(C),z=C.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==C.depthTexture){const q=C.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",$)};q.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=q}if(C.depthTexture&&!_.__autoAllocateDepthBuffer)if(z)for(let q=0;q<6;q++)pe(_.__webglFramebuffer[q],C,q);else{const q=C.texture.mipmaps;q&&q.length>0?pe(_.__webglFramebuffer[0],C,0):pe(_.__webglFramebuffer,C,0)}else if(z){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=i.createRenderbuffer(),Ut(_.__webglDepthbuffer[q],C,!1);else{const $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,st)}}else{const q=C.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Ut(_.__webglDepthbuffer,C,!1);else{const $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,st)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function $t(C,_,z){const q=n.get(C);_!==void 0&&yt(q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Gt(C)}function le(C){const _=C.texture,z=n.get(C),q=n.get(_);C.addEventListener("dispose",x);const $=C.textures,st=C.isWebGLCubeRenderTarget===!0,lt=$.length>1;if(lt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=_.version,a.memory.textures++),st){z.__webglFramebuffer=[];for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer[j]=[];for(let nt=0;nt<_.mipmaps.length;nt++)z.__webglFramebuffer[j][nt]=i.createFramebuffer()}else z.__webglFramebuffer[j]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){z.__webglFramebuffer=[];for(let j=0;j<_.mipmaps.length;j++)z.__webglFramebuffer[j]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(lt)for(let j=0,nt=$.length;j<nt;j++){const ut=n.get($[j]);ut.__webglTexture===void 0&&(ut.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&re(C)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let j=0;j<$.length;j++){const nt=$[j];z.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[j]);const ut=s.convert(nt.format,nt.colorSpace),Rt=s.convert(nt.type),pt=v(nt.internalFormat,ut,Rt,nt.normalized,nt.colorSpace,C.isXRRenderTarget===!0),ht=me(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,pt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,z.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(z.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(st){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Nt(i.TEXTURE_CUBE_MAP,_);for(let j=0;j<6;j++)if(_.mipmaps&&_.mipmaps.length>0)for(let nt=0;nt<_.mipmaps.length;nt++)yt(z.__webglFramebuffer[j][nt],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,nt);else yt(z.__webglFramebuffer[j],C,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);p(_)&&b(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(lt){for(let j=0,nt=$.length;j<nt;j++){const ut=$[j],Rt=n.get(ut);let pt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(pt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,Rt.__webglTexture),Nt(pt,ut),yt(z.__webglFramebuffer,C,ut,i.COLOR_ATTACHMENT0+j,pt,0),p(ut)&&b(pt)}e.unbindTexture()}else{let j=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(j=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(j,q.__webglTexture),Nt(j,_),_.mipmaps&&_.mipmaps.length>0)for(let nt=0;nt<_.mipmaps.length;nt++)yt(z.__webglFramebuffer[nt],C,_,i.COLOR_ATTACHMENT0,j,nt);else yt(z.__webglFramebuffer,C,_,i.COLOR_ATTACHMENT0,j,0);p(_)&&b(j),e.unbindTexture()}C.depthBuffer&&Gt(C)}function Ht(C){const _=C.textures;for(let z=0,q=_.length;z<q;z++){const $=_[z];if(p($)){const st=S(C),lt=n.get($).__webglTexture;e.bindTexture(st,lt),b(st),e.unbindTexture()}}}const ue=[],_e=[];function Ce(C){if(C.samples>0){if(re(C)===!1){const _=C.textures,z=C.width,q=C.height;let $=i.COLOR_BUFFER_BIT;const st=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(C),j=_.length>1;if(j)for(let ut=0;ut<_.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer);const nt=C.texture.mipmaps;nt&&nt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let ut=0;ut<_.length;ut++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ut]);const Rt=n.get(_[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Rt,0)}i.blitFramebuffer(0,0,z,q,0,0,z,q,$,i.NEAREST),c===!0&&(ue.length=0,_e.length=0,ue.push(i.COLOR_ATTACHMENT0+ut),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(ue.push(st),_e.push(st),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,_e)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let ut=0;ut<_.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,lt.__webglColorRenderbuffer[ut]);const Rt=n.get(_[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,Rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){const _=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function me(C){return Math.min(r.maxSamples,C.samples)}function re(C){const _=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function B(C){const _=a.render.frame;u.get(C)!==_&&(u.set(C,_),C.update())}function ze(C,_){const z=C.colorSpace,q=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Ko&&z!==lr&&(ne.getTransfer(z)===ge?(q!==ei||$!==Ln)&&Bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ce("WebGLTextures: Unsupported texture color space:",z)),_}function ae(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=L,this.getTextureUnits=P,this.setTextureUnits=I,this.setTexture2D=Y,this.setTexture2DArray=V,this.setTexture3D=Q,this.setTextureCube=Z,this.rebindTextures=$t,this.setupRenderTarget=le,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=re,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Bw(i,t){function e(n,r=lr){let s;const a=ne.getTransfer(r);if(n===Ln)return i.UNSIGNED_BYTE;if(n===ih)return i.UNSIGNED_SHORT_4_4_4_4;if(n===rh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qp)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Kp)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Wp)return i.BYTE;if(n===Xp)return i.SHORT;if(n===wa)return i.UNSIGNED_SHORT;if(n===nh)return i.INT;if(n===xi)return i.UNSIGNED_INT;if(n===ti)return i.FLOAT;if(n===_i)return i.HALF_FLOAT;if(n===Yp)return i.ALPHA;if(n===Jp)return i.RGB;if(n===ei)return i.RGBA;if(n===ki)return i.DEPTH_COMPONENT;if(n===Pr)return i.DEPTH_STENCIL;if(n===sh)return i.RED;if(n===ah)return i.RED_INTEGER;if(n===Wr)return i.RG;if(n===oh)return i.RG_INTEGER;if(n===ch)return i.RGBA_INTEGER;if(n===Lo||n===Uo||n===Do||n===Fo)if(a===ge)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Lo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Uo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Do)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Lo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Uo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Do)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Fo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Kl||n===Yl||n===Jl||n===Ql)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Kl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Yl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Jl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ql)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Zl||n===$l||n===jl||n===tu||n===eu||n===Xo||n===nu)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Zl||n===$l)return a===ge?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===jl)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===tu)return s.COMPRESSED_R11_EAC;if(n===eu)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Xo)return s.COMPRESSED_RG11_EAC;if(n===nu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===iu||n===ru||n===su||n===au||n===ou||n===cu||n===lu||n===uu||n===hu||n===fu||n===du||n===pu||n===mu||n===gu)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===iu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ru)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===su)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===au)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ou)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===cu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===uu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===du)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===pu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===mu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===gu)return a===ge?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yu||n===xu||n===_u)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===yu)return a===ge?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_u)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vu||n===bu||n===qo||n===wu)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===vu)return s.COMPRESSED_RED_RGTC1_EXT;if(n===bu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Aa?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const kw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gw=`
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

}`;class Hw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new om(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ri({vertexShader:kw,fragmentShader:Gw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ue(new Ws(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zw extends Jr{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const y=typeof XRWebGLBinding<"u",m=new Hw,p={},b=e.getContextAttributes();let S=null,v=null;const M=[],w=[],T=new qt;let x=null,E=null;const R=new Nn;R.viewport=new Le;const N=new Nn;N.viewport=new Le;const U=[R,N],L=new Qy;let P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let et=M[J];return et===void 0&&(et=new Qc,M[J]=et),et.getTargetRaySpace()},this.getControllerGrip=function(J){let et=M[J];return et===void 0&&(et=new Qc,M[J]=et),et.getGripSpace()},this.getHand=function(J){let et=M[J];return et===void 0&&(et=new Qc,M[J]=et),et.getHandSpace()};function D(J){const et=w.indexOf(J.inputSource);if(et===-1)return;const ct=M[et];ct!==void 0&&(ct.update(J.inputSource,J.frame,l||a),ct.dispatchEvent({type:J.type,data:J.inputSource}))}function G(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",Y);for(let J=0;J<M.length;J++){const et=w[J];et!==null&&(w[J]=null,M[J].disconnect(et))}P=null,I=null,m.reset();for(const J in p)delete p[J];if(t.setRenderTarget(S),d=null,f=null,h=null,r=null,v=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(T.width,T.height,!1),E!==null){const J=E.camera;J.fov=E.fov,J.zoom=E.zoom,J.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&Bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(r,e)),h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(S=t.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",G),r.addEventListener("inputsourceschange",Y),b.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(T),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,Lt=null,yt=null;b.depth&&(yt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=b.stencil?Pr:ki,Lt=b.stencil?Aa:xi);const Ut={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(Ut),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new ni(f.textureWidth,f.textureHeight,{format:ei,type:Ln,depthTexture:new Sa(f.textureWidth,f.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const ct={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,ct),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new ni(d.framebufferWidth,d.framebufferHeight,{format:ei,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Kt.setContext(r),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Y(J){for(let et=0;et<J.removed.length;et++){const ct=J.removed[et],Lt=w.indexOf(ct);Lt>=0&&(w[Lt]=null,M[Lt].disconnect(ct))}for(let et=0;et<J.added.length;et++){const ct=J.added[et];let Lt=w.indexOf(ct);if(Lt===-1){for(let Ut=0;Ut<M.length;Ut++)if(Ut>=w.length){w.push(ct),Lt=Ut;break}else if(w[Ut]===null){w[Ut]=ct,Lt=Ut;break}if(Lt===-1)break}const yt=M[Lt];yt&&yt.connect(ct)}}const V=new H,Q=new H;function Z(J,et,ct){V.setFromMatrixPosition(et.matrixWorld),Q.setFromMatrixPosition(ct.matrixWorld);const Lt=V.distanceTo(Q),yt=et.projectionMatrix.elements,Ut=ct.projectionMatrix.elements,pe=yt[14]/(yt[10]-1),Gt=yt[14]/(yt[10]+1),$t=(yt[9]+1)/yt[5],le=(yt[9]-1)/yt[5],Ht=(yt[8]-1)/yt[0],ue=(Ut[8]+1)/Ut[0],_e=pe*Ht,Ce=pe*ue,me=Lt/(-Ht+ue),re=me*-Ht;if(et.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(re),J.translateZ(me),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),yt[10]===-1)J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const B=pe+me,ze=Gt+me,ae=_e-re,C=Ce+(Lt-re),_=$t*Gt/ze*B,z=le*Gt/ze*B;J.projectionMatrix.makePerspective(ae,C,_,z,B,ze),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function at(J,et){et===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(et.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let et=J.near,ct=J.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(ct=m.depthFar)),L.near=N.near=R.near=et,L.far=N.far=R.far=ct,(P!==L.near||I!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),P=L.near,I=L.far),L.layers.mask=J.layers.mask|6,R.layers.mask=L.layers.mask&-5,N.layers.mask=L.layers.mask&-3;const Lt=J.parent,yt=L.cameras;at(L,Lt);for(let Ut=0;Ut<yt.length;Ut++)at(yt[Ut],Lt);yt.length===2?Z(L,R,N):L.projectionMatrix.copy(R.projectionMatrix),E===null&&J.isPerspectiveCamera&&(E={camera:J,fov:J.fov,zoom:J.zoom}),ot(J,L,Lt)};function ot(J,et,ct){ct===null?J.matrix.copy(et.matrixWorld):(J.matrix.copy(ct.matrixWorld),J.matrix.invert(),J.matrix.multiply(et.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Mu*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(J){c=J,f!==null&&(f.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(J){return p[J]};let Ot=null;function Nt(J,et){if(u=et.getViewerPose(l||a),g=et,u!==null){const ct=u.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Lt=!1;ct.length!==L.cameras.length&&(L.cameras.length=0,Lt=!0);for(let Gt=0;Gt<ct.length;Gt++){const $t=ct[Gt];let le=null;if(d!==null)le=d.getViewport($t);else{const ue=h.getViewSubImage(f,$t);le=ue.viewport,Gt===0&&(t.setRenderTargetTextures(v,ue.colorTexture,ue.depthStencilTexture),t.setRenderTarget(v))}let Ht=U[Gt];Ht===void 0&&(Ht=new Nn,Ht.layers.enable(Gt),Ht.viewport=new Le,U[Gt]=Ht),Ht.matrix.fromArray($t.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray($t.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(le.x,le.y,le.width,le.height),Gt===0&&(L.matrix.copy(Ht.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Lt===!0&&L.cameras.push(Ht)}const yt=r.enabledFeatures;if(yt&&yt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){h=n.getBinding();const Gt=h.getDepthInformation(ct[0]);Gt&&Gt.isValid&&Gt.texture&&m.init(Gt,r.renderState)}if(yt&&yt.includes("camera-access")&&y){t.state.unbindTexture(),h=n.getBinding();for(let Gt=0;Gt<ct.length;Gt++){const $t=ct[Gt].camera;if($t){let le=p[$t];le||(le=new om,p[$t]=le);const Ht=h.getCameraImage($t);le.sourceTexture=Ht}}}}for(let ct=0;ct<M.length;ct++){const Lt=w[ct],yt=M[ct];Lt!==null&&yt!==void 0&&yt.update(Lt,et,l||a)}Ot&&Ot(J,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Kt=new dm;Kt.setAnimationLoop(Nt),this.setAnimationLoop=function(J){Ot=J},this.dispose=function(){}}}const Vw=new we,vm=new Vt;vm.set(-1,0,0,0,1,0,0,0,1);function Ww(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,cm(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,S,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),y(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,b,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Mn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Mn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(Vw.makeRotationFromEuler(v)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(vm),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Mn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Xw(i,t,e,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const w=M.program;n.uniformBlockBinding(v,w)}function l(v,M){let w=r[v.id];w===void 0&&(m(v),w=u(v),r[v.id]=w,v.addEventListener("dispose",b));const T=M.program;n.updateUBOMapping(v,T);const x=t.render.frame;s[v.id]!==x&&(f(v),s[v.id]=x)}function u(v){const M=h();v.__bindingPointIndex=M;const w=i.createBuffer(),T=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,T,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,w),w}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const M=r[v.id],w=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let x=0,E=w.length;x<E;x++){const R=w[x];if(Array.isArray(R))for(let N=0,U=R.length;N<U;N++)d(R[N],x,N,T);else d(R,x,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,M,w,T){if(y(v,M,w,T)===!0){const x=v.__offset,E=v.value;if(Array.isArray(E)){let R=0;for(let N=0;N<E.length;N++){const U=E[N],L=p(U);g(U,v.__data,R),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(R+=L.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function g(v,M,w){typeof v=="number"||typeof v=="boolean"?M[0]=v:v.isMatrix3?(M[0]=v.elements[0],M[1]=v.elements[1],M[2]=v.elements[2],M[3]=0,M[4]=v.elements[3],M[5]=v.elements[4],M[6]=v.elements[5],M[7]=0,M[8]=v.elements[6],M[9]=v.elements[7],M[10]=v.elements[8],M[11]=0):ArrayBuffer.isView(v)?M.set(new v.constructor(v.buffer,v.byteOffset,M.length)):v.toArray(M,w)}function y(v,M,w,T){const x=v.value,E=M+"_"+w;if(T[E]===void 0)return typeof x=="number"||typeof x=="boolean"?T[E]=x:ArrayBuffer.isView(x)?T[E]=x.slice():T[E]=x.clone(),!0;{const R=T[E];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return T[E]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(v){const M=v.uniforms;let w=0;const T=16;for(let E=0,R=M.length;E<R;E++){const N=Array.isArray(M[E])?M[E]:[M[E]];for(let U=0,L=N.length;U<L;U++){const P=N[U],I=Array.isArray(P.value)?P.value:[P.value];for(let D=0,G=I.length;D<G;D++){const Y=I[D],V=p(Y),Q=w%T,Z=Q%V.boundary,at=Q+Z;w+=Z,at!==0&&T-at<V.storage&&(w+=T-at),P.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=w,w+=V.storage}}}const x=w%T;return x>0&&(w+=T-x),v.__size=w,v.__cache={},this}function p(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?Bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(M.boundary=16,M.storage=v.byteLength):Bt("WebGLRenderer: Unsupported uniform value type.",v),M}function b(v){const M=v.target;M.removeEventListener("dispose",b);const w=a.indexOf(M.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function S(){for(const v in r)i.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:c,update:l,dispose:S}}const qw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let li=null;function Kw(){return li===null&&(li=new im(qw,16,16,Wr,_i),li.name="DFG_LUT",li.minFilter=cn,li.magFilter=cn,li.wrapS=Ii,li.wrapT=Ii,li.generateMipmaps=!1,li.needsUpdate=!0),li}class Yw{constructor(t={}){const{canvas:e=hy(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Ln}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=d,m=new Set([ch,oh,ah]),p=new Set([Ln,xi,wa,Aa,ih,rh]),b=new Uint32Array(4),S=new Int32Array(4),v=new H;let M=null,w=null;const T=[],x=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let N=!1,U=null,L=null,P=null,I=null;this._outputColorSpace=In;let D=0,G=0,Y=null,V=-1,Q=null;const Z=new Le,at=new Le;let ot=null;const Ot=new kt(0);let Nt=0,Kt=e.width,J=e.height,et=1,ct=null,Lt=null;const yt=new Le(0,0,Kt,J),Ut=new Le(0,0,Kt,J);let pe=!1;const Gt=new ph;let $t=!1,le=!1;const Ht=new we,ue=new H,_e=new Le,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let me=!1;function re(){return Y===null?et:1}let B=n;function ze(A,F){return e.getContext(A,F)}let ae,C,_,z,q,$,st,lt,j,nt,ut,Rt,pt,ht,Pt,Dt,Wt,k,ft,tt,dt,vt,rt;try{const A={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${th}`),e.addEventListener("webglcontextlost",Ae,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",Vn,!1),B===null){const F="webgl2";if(B=ze(F,A),B===null)throw ze(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(A){throw e.removeEventListener("webglcontextlost",Ae,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",Vn,!1),ce("WebGLRenderer: "+A.message),A}function It(){ae=new Kv(B),ae.init(),dt=new Bw(B,ae),C=new Ov(B,ae,t,dt),_=new Fw(B,ae),C.reversedDepthBuffer&&f&&_.buffers.depth.setReversed(!0),L=B.createFramebuffer(),P=B.createFramebuffer(),I=B.createFramebuffer(),z=new Qv(B),q=new ww,$=new Ow(B,ae,_,q,C,dt,z),st=new qv(R),lt=new $y(B),vt=new Dv(B,lt),j=new Yv(B,lt,z,vt),nt=new $v(B,j,lt,vt,z),k=new Zv(B,C,$),Pt=new Bv(q),ut=new bw(R,st,ae,C,vt,Pt),Rt=new Ww(R,q),pt=new Mw,ht=new Pw(ae),Wt=new Uv(R,st,_,nt,g,c),Dt=new Dw(R,nt,C),rt=new Xw(B,z,C,_),ft=new Fv(B,ae,z),tt=new Jv(B,ae,z),z.programs=ut.programs,R.capabilities=C,R.extensions=ae,R.properties=q,R.renderLists=pt,R.shadowMap=Dt,R.state=_,R.info=z}y!==Ln&&(E=new tb(y,e.width,e.height,o,r,s));const Tt=new zw(R,B);this.xr=Tt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const A=ae.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ae.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(A){A!==void 0&&(et=A,this.setSize(Kt,J,!1))},this.getSize=function(A){return A.set(Kt,J)},this.setSize=function(A,F,K=!0){if(Tt.isPresenting){Bt("WebGLRenderer: Can't change size while VR device is presenting.");return}Kt=A,J=F,e.width=Math.floor(A*et),e.height=Math.floor(F*et),K===!0&&(e.style.width=A+"px",e.style.height=F+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(Kt*et,J*et).floor()},this.setDrawingBufferSize=function(A,F,K){Kt=A,J=F,et=K,e.width=Math.floor(A*K),e.height=Math.floor(F*K),this.setViewport(0,0,A,F)},this.setEffects=function(A){if(y===Ln){ce("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let F=0;F<A.length;F++)if(A[F].isOutputPass===!0){Bt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(Z)},this.getViewport=function(A){return A.copy(yt)},this.setViewport=function(A,F,K,W){A.isVector4?yt.set(A.x,A.y,A.z,A.w):yt.set(A,F,K,W),_.viewport(Z.copy(yt).multiplyScalar(et).round())},this.getScissor=function(A){return A.copy(Ut)},this.setScissor=function(A,F,K,W){A.isVector4?Ut.set(A.x,A.y,A.z,A.w):Ut.set(A,F,K,W),_.scissor(at.copy(Ut).multiplyScalar(et).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(A){_.setScissorTest(pe=A)},this.setOpaqueSort=function(A){ct=A},this.setTransparentSort=function(A){Lt=A},this.getClearColor=function(A){return A.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor(...arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha(...arguments)},this.clear=function(A=!0,F=!0,K=!0){let W=0;if(A){let X=!1;if(Y!==null){const xt=Y.texture.format;X=m.has(xt)}if(X){const xt=Y.texture.type,At=p.has(xt),gt=Wt.getClearColor(),St=Wt.getClearAlpha(),Ct=gt.r,Yt=gt.g,jt=gt.b;At?(b[0]=Ct,b[1]=Yt,b[2]=jt,b[3]=St,B.clearBufferuiv(B.COLOR,0,b)):(S[0]=Ct,S[1]=Yt,S[2]=jt,S[3]=St,B.clearBufferiv(B.COLOR,0,S))}else W|=B.COLOR_BUFFER_BIT}F&&(W|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(W|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&B.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),U=A},this.dispose=function(){e.removeEventListener("webglcontextlost",Ae,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",Vn,!1),Wt.dispose(),pt.dispose(),ht.dispose(),q.dispose(),st.dispose(),nt.dispose(),vt.dispose(),rt.dispose(),ut.dispose(),Tt.dispose(),Tt.removeEventListener("sessionstart",Zh),Tt.removeEventListener("sessionend",$h),mr.stop()};function Ae(A){A.preventDefault(),df("WebGLRenderer: Context Lost."),N=!0}function fe(){df("WebGLRenderer: Context Restored."),N=!1;const A=z.autoReset,F=Dt.enabled,K=Dt.autoUpdate,W=Dt.needsUpdate,X=Dt.type;It(),z.autoReset=A,Dt.enabled=F,Dt.autoUpdate=K,Dt.needsUpdate=W,Dt.type=X}function Vn(A){ce("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ai(A){const F=A.target;F.removeEventListener("dispose",ai),x0(F)}function x0(A){_0(A),q.remove(A)}function _0(A){const F=q.get(A).programs;F!==void 0&&(F.forEach(function(K){ut.releaseProgram(K)}),A.isShaderMaterial&&ut.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,K,W,X,xt){F===null&&(F=Ce);const At=X.isMesh&&X.matrixWorld.determinantAffine()<0,gt=w0(A,F,K,W,X);_.setMaterial(W,At);let St=K.index,Ct=1;if(W.wireframe===!0){if(St=j.getWireframeAttribute(K),St===void 0)return;Ct=2}const Yt=K.drawRange,jt=K.attributes.position;let Et=Yt.start*Ct,de=(Yt.start+Yt.count)*Ct;xt!==null&&(Et=Math.max(Et,xt.start*Ct),de=Math.min(de,(xt.start+xt.count)*Ct)),St!==null?(Et=Math.max(Et,0),de=Math.min(de,St.count)):jt!=null&&(Et=Math.max(Et,0),de=Math.min(de,jt.count));const Ve=de-Et;if(Ve<0||Ve===1/0)return;vt.setup(X,W,gt,K,St);let Ee,ve=ft;if(St!==null&&(Ee=lt.get(St),ve=tt,ve.setIndex(Ee)),X.isMesh)W.wireframe===!0?(_.setLineWidth(W.wireframeLinewidth*re()),ve.setMode(B.LINES)):ve.setMode(B.TRIANGLES);else if(X.isLine){let sn=W.linewidth;sn===void 0&&(sn=1),_.setLineWidth(sn*re()),X.isLineSegments?ve.setMode(B.LINES):X.isLineLoop?ve.setMode(B.LINE_LOOP):ve.setMode(B.LINE_STRIP)}else X.isPoints?ve.setMode(B.POINTS):X.isSprite&&ve.setMode(B.TRIANGLES);if(X.isBatchedMesh)if(ae.get("WEBGL_multi_draw"))ve.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const sn=X._multiDrawStarts,wt=X._multiDrawCounts,ln=X._multiDrawCount,se=St?lt.get(St).bytesPerElement:1,On=q.get(W).currentProgram.getUniforms();for(let oi=0;oi<ln;oi++)On.setValue(B,"_gl_DrawID",oi),ve.render(sn[oi]/se,wt[oi])}else if(X.isInstancedMesh)ve.renderInstances(Et,Ve,X.count);else if(K.isInstancedBufferGeometry){const sn=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,wt=Math.min(K.instanceCount,sn);ve.renderInstances(Et,Ve,wt)}else ve.render(Et,Ve)};function Qh(A,F,K,W){U!==null&&A.isNodeMaterial&&U.setObject(W,A),$t===!0&&Pt.setState(A,K,!1),A.transparent===!0&&A.side===An&&A.forceSinglePass===!1?(A.side=Mn,A.needsUpdate=!0,Xa(A,F,W),A.side=zr,A.needsUpdate=!0,Xa(A,F,W),A.side=An):Xa(A,F,W)}this.compile=function(A,F,K=null){K===null&&(K=A),U!==null&&U.renderStart(A,F,K),w=ht.get(K),w.init(F),x.push(w),K.traverseVisible(function(X){X.isLight&&X.layers.test(F.layers)&&(w.pushLight(X),X.castShadow&&w.pushShadow(X))}),A!==K&&A.traverseVisible(function(X){X.isLight&&X.layers.test(F.layers)&&(w.pushLight(X),X.castShadow&&w.pushShadow(X))}),w.setupLights(),U!==null&&U.updateLights(w.state.lightsArray),le=this.localClippingEnabled,$t=Pt.init(this.clippingPlanes,le),$t===!0&&Pt.setGlobalState(this.clippingPlanes,F),U!==null&&Dt.render(w.state.shadowsArray,K,F);const W=new Set;return A.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const xt=X.material;if(xt)if(Array.isArray(xt))for(let At=0;At<xt.length;At++){const gt=xt[At];Qh(gt,K,F,X),W.add(gt)}else Qh(xt,K,F,X),W.add(xt)}),w=x.pop(),U!==null&&U.renderEnd(),W},this.compileAsync=function(A,F,K=null){const W=this.compile(A,F,K);return new Promise(X=>{function xt(){if(W.forEach(function(At){const St=q.get(At).currentProgram;(St===void 0||St.isReady())&&W.delete(At)}),W.size===0){X(A);return}setTimeout(xt,10)}ae.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let Oc=null;function v0(A){Oc&&Oc(A)}function Zh(){mr.stop()}function $h(){mr.start()}const mr=new dm;mr.setAnimationLoop(v0),typeof self<"u"&&mr.setContext(self),this.setAnimationLoop=function(A){Oc=A,Tt.setAnimationLoop(A),A===null?mr.stop():mr.start()},Tt.addEventListener("sessionstart",Zh),Tt.addEventListener("sessionend",$h),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;U!==null&&U.renderStart(A,F);const K=Tt.enabled===!0&&Tt.isPresenting===!0,W=E!==null&&(Y===null||K)&&E.begin(R,Y);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Tt.enabled===!0&&Tt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Tt.cameraAutoUpdate===!0&&Tt.updateCamera(F),F=Tt.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,F,Y),w=ht.get(A,x.length),w.init(F),w.state.textureUnits=$.getTextureUnits(),x.push(w),Ht.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Gt.setFromProjectionMatrix(Ht,pi,F.reversedDepth),le=this.localClippingEnabled,$t=Pt.init(this.clippingPlanes,le),M=pt.get(A,T.length),M.init(),T.push(M),Tt.enabled===!0&&Tt.isPresenting===!0){const At=R.xr.getDepthSensingMesh();At!==null&&Bc(At,F,-1/0,R.sortObjects)}Bc(A,F,0,R.sortObjects),M.finish(),U!==null&&U.updateLights(w.state.lightsArray),R.sortObjects===!0&&M.sort(ct,Lt),me=Tt.enabled===!1||Tt.isPresenting===!1||Tt.hasDepthSensing()===!1,me&&Wt.addToRenderList(M,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$t===!0&&Pt.beginShadows();const X=w.state.shadowsArray;if(Dt.render(X,A,F),$t===!0&&Pt.endShadows(),(W&&E.hasRenderPass())===!1){const At=M.opaque,gt=M.transmissive;if(w.setupLights(),F.isArrayCamera){const St=F.cameras;if(gt.length>0)for(let Ct=0,Yt=St.length;Ct<Yt;Ct++){const jt=St[Ct];tf(At,gt,A,jt)}me&&Wt.render(A);for(let Ct=0,Yt=St.length;Ct<Yt;Ct++){const jt=St[Ct];jh(M,A,jt,jt.viewport)}}else gt.length>0&&tf(At,gt,A,F),me&&Wt.render(A),jh(M,A,F)}Y!==null&&G===0&&($.updateMultisampleRenderTarget(Y),$.updateRenderTargetMipmap(Y)),W&&E.end(R),A.isScene===!0&&A.onAfterRender(R,A,F),vt.resetDefaultState(),V=-1,Q=null,x.pop(),x.length>0?(w=x[x.length-1],$.setTextureUnits(w.state.textureUnits),$t===!0&&Pt.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,T.pop(),T.length>0?M=T[T.length-1]:M=null,U!==null&&U.renderEnd()};function Bc(A,F,K,W){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(Gt)){W&&_e.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ht);const At=nt.update(A),gt=A.material;gt.visible&&M.push(A,At,gt,K,_e.z,null,F)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(Gt))){const At=nt.update(A),gt=A.material;if(W&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),_e.copy(A.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),_e.copy(At.boundingSphere.center)),_e.applyMatrix4(A.matrixWorld).applyMatrix4(Ht)),Array.isArray(gt)){const St=At.groups;for(let Ct=0,Yt=St.length;Ct<Yt;Ct++){const jt=St[Ct],Et=gt[jt.materialIndex];Et&&Et.visible&&M.push(A,At,Et,K,_e.z,jt,F)}}else gt.visible&&M.push(A,At,gt,K,_e.z,null,F)}}const xt=A.children;for(let At=0,gt=xt.length;At<gt;At++)Bc(xt[At],F,K,W)}function jh(A,F,K,W){const{opaque:X,transmissive:xt,transparent:At}=A;w.setupLightsView(K),$t===!0&&Pt.setGlobalState(R.clippingPlanes,K),W&&_.viewport(Z.copy(W)),X.length>0&&Wa(X,F,K),xt.length>0&&Wa(xt,F,K),At.length>0&&Wa(At,F,K),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function tf(A,F,K,W){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[W.id]===void 0){const Et=ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[W.id]=new ni(1,1,{generateMipmaps:!0,type:Et?_i:Ln,minFilter:Rr,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ne.workingColorSpace})}const xt=w.state.transmissionRenderTarget[W.id],At=W.viewport||Z;xt.setSize(At.z*R.transmissionResolutionScale,At.w*R.transmissionResolutionScale);const gt=R.getRenderTarget(),St=R.getActiveCubeFace(),Ct=R.getActiveMipmapLevel();R.setRenderTarget(xt),R.getClearColor(Ot),Nt=R.getClearAlpha(),Nt<1&&R.setClearColor(16777215,.5),R.clear(),me&&Wt.render(K);const Yt=R.toneMapping;R.toneMapping=gi;const jt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),w.setupLightsView(W),$t===!0&&Pt.setGlobalState(R.clippingPlanes,W),Wa(A,K,W),$.updateMultisampleRenderTarget(xt),$.updateRenderTargetMipmap(xt),ae.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let de=0,Ve=F.length;de<Ve;de++){const Ee=F[de],{object:ve,geometry:sn,material:wt,group:ln}=Ee;if(wt.side===An&&ve.layers.test(W.layers)){const se=wt.side;wt.side=Mn,wt.needsUpdate=!0,ef(ve,K,W,sn,wt,ln),wt.side=se,wt.needsUpdate=!0,Et=!0}}Et===!0&&($.updateMultisampleRenderTarget(xt),$.updateRenderTargetMipmap(xt))}R.setRenderTarget(gt,St,Ct),R.setClearColor(Ot,Nt),jt!==void 0&&(W.viewport=jt),R.toneMapping=Yt}function Wa(A,F,K){const W=F.isScene===!0?F.overrideMaterial:null;for(let X=0,xt=A.length;X<xt;X++){const At=A[X],{object:gt,geometry:St,group:Ct}=At;let Yt=At.material;Yt.allowOverride===!0&&W!==null&&(Yt=W),gt.layers.test(K.layers)&&ef(gt,F,K,St,Yt,Ct)}}function ef(A,F,K,W,X,xt){U!==null&&X.isNodeMaterial&&U.setObject(A,X),A.onBeforeRender(R,F,K,W,X,xt),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),X.onBeforeRender(R,F,K,W,A,xt),X.transparent===!0&&X.side===An&&X.forceSinglePass===!1?(X.side=Mn,X.needsUpdate=!0,R.renderBufferDirect(K,F,W,X,A,xt),X.side=zr,X.needsUpdate=!0,R.renderBufferDirect(K,F,W,X,A,xt),X.side=An):R.renderBufferDirect(K,F,W,X,A,xt),A.onAfterRender(R,F,K,W,X,xt)}function Xa(A,F,K){F.isScene!==!0&&(F=Ce);const W=q.get(A),X=w.state.lights,xt=w.state.shadowsArray,At=X.state.version,gt=ut.getParameters(A,X.state,xt,F,K,w.state.lightProbeGridArray),St=ut.getProgramCacheKey(gt);let Ct=W.programs;W.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?F.environment:null,W.fog=F.fog;const Yt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;W.envMap=st.get(A.envMap||W.environment,Yt),W.envMapRotation=W.environment!==null&&A.envMap===null?F.environmentRotation:A.envMapRotation,Ct===void 0&&(A.addEventListener("dispose",ai),Ct=new Map,W.programs=Ct);let jt=Ct.get(St);if(jt!==void 0){if(W.currentProgram===jt&&W.lightsStateVersion===At)return rf(A,gt),jt}else gt.uniforms=ut.getUniforms(A),U!==null&&A.isNodeMaterial&&U.build(A,K,gt),A.onBeforeCompile(gt,R),jt=ut.acquireProgram(gt,St),Ct.set(St,jt),W.uniforms=gt.uniforms;const Et=W.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Et.clippingPlanes=Pt.uniform),rf(A,gt),W.needsLights=M0(A),W.lightsStateVersion=At,W.needsLights&&(Et.ambientLightColor.value=X.state.ambient,Et.lightProbe.value=X.state.probe,Et.sunLights.value=X.state.sun,Et.sunLightShadows.value=X.state.sunShadow,Et.directionalLights.value=X.state.directional,Et.directionalLightShadows.value=X.state.directionalShadow,Et.spotLights.value=X.state.spot,Et.spotLightShadows.value=X.state.spotShadow,Et.rectAreaLights.value=X.state.rectArea,Et.ltc_1.value=X.state.rectAreaLTC1,Et.ltc_2.value=X.state.rectAreaLTC2,Et.pointLights.value=X.state.point,Et.pointLightShadows.value=X.state.pointShadow,Et.hemisphereLights.value=X.state.hemi,Et.sunShadowMatrix.value=X.state.sunShadowMatrix,Et.sunShadowCascade.value=X.state.sunShadowCascade,Et.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Et.spotLightMatrix.value=X.state.spotLightMatrix,Et.spotLightMap.value=X.state.spotLightMap,Et.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=w.state.lightProbeGridArray.length>0,W.currentProgram=jt,W.uniformsList=null,jt}function nf(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=Oo.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function rf(A,F){const K=q.get(A);K.outputColorSpace=F.outputColorSpace,K.batching=F.batching,K.batchingColor=F.batchingColor,K.instancing=F.instancing,K.instancingColor=F.instancingColor,K.instancingMorph=F.instancingMorph,K.skinning=F.skinning,K.morphTargets=F.morphTargets,K.morphNormals=F.morphNormals,K.morphColors=F.morphColors,K.morphTargetsCount=F.morphTargetsCount,K.numClippingPlanes=F.numClippingPlanes,K.numIntersection=F.numClipIntersection,K.vertexAlphas=F.vertexAlphas,K.vertexTangents=F.vertexTangents,K.toneMapping=F.toneMapping}function b0(A,F){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;v.setFromMatrixPosition(F.matrixWorld);for(let K=0,W=A.length;K<W;K++){const X=A[K];if(X.texture!==null&&X.boundingBox.containsPoint(v))return X}return null}function w0(A,F,K,W,X){F.isScene!==!0&&(F=Ce),$.resetTextureUnits();const xt=F.fog,At=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?F.environment:null,gt=Y===null?R.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ne.workingColorSpace,St=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Ct=st.get(W.envMap||At,St),Yt=W.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,jt=!!K.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Et=!!K.morphAttributes.position,de=!!K.morphAttributes.normal,Ve=!!K.morphAttributes.color;let Ee=gi;W.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ee=R.toneMapping);const ve=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,sn=ve!==void 0?ve.length:0,wt=q.get(W),ln=w.state.lights;if($t===!0&&(le===!0||A!==Q)){const Me=A===Q&&W.id===V;Pt.setState(W,A,Me)}let se=!1;W.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==ln.state.version||wt.outputColorSpace!==gt||X.isBatchedMesh&&wt.batching===!1||!X.isBatchedMesh&&wt.batching===!0||X.isBatchedMesh&&wt.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&wt.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&wt.instancing===!1||!X.isInstancedMesh&&wt.instancing===!0||X.isSkinnedMesh&&wt.skinning===!1||!X.isSkinnedMesh&&wt.skinning===!0||X.isInstancedMesh&&wt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&wt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&wt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&wt.instancingMorph===!1&&X.morphTexture!==null||wt.envMap!==Ct||W.fog===!0&&wt.fog!==xt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==Pt.numPlanes||wt.numIntersection!==Pt.numIntersection)||wt.vertexAlphas!==Yt||wt.vertexTangents!==jt||wt.morphTargets!==Et||wt.morphNormals!==de||wt.morphColors!==Ve||wt.toneMapping!==Ee||wt.morphTargetsCount!==sn||!!wt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(se=!0):(se=!0,wt.__version=W.version);let On=wt.currentProgram;se===!0&&(On=Xa(W,F,X),U&&W.isNodeMaterial&&U.onUpdateProgram(W,On,wt));let oi=!1,qi=!1,es=!1;const ye=On.getUniforms(),Oe=wt.uniforms;if(_.useProgram(On.program)&&(oi=!0,qi=!0,es=!0),W.id!==V&&(V=W.id,qi=!0),wt.needsLights){const Me=b0(w.state.lightProbeGridArray,X);wt.lightProbeGrid!==Me&&(wt.lightProbeGrid=Me,qi=!0)}if(oi||Q!==A){_.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ye.setValue(B,"projectionMatrix",A.projectionMatrix),ye.setValue(B,"viewMatrix",A.matrixWorldInverse);const Yi=ye.map.cameraPosition;Yi!==void 0&&Yi.setValue(B,ue.setFromMatrixPosition(A.matrixWorld)),C.logarithmicDepthBuffer&&ye.setValue(B,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ye.setValue(B,"isOrthographic",A.isOrthographicCamera===!0),Q!==A&&(Q=A,qi=!0,es=!0)}if(wt.needsLights&&(ln.state.sunShadowMap.length>0&&ye.setValue(B,"sunShadowMap",ln.state.sunShadowMap,$),ln.state.directionalShadowMap.length>0&&ye.setValue(B,"directionalShadowMap",ln.state.directionalShadowMap,$),ln.state.spotShadowMap.length>0&&ye.setValue(B,"spotShadowMap",ln.state.spotShadowMap,$),ln.state.pointShadowMap.length>0&&ye.setValue(B,"pointShadowMap",ln.state.pointShadowMap,$)),X.isSkinnedMesh){ye.setOptional(B,X,"bindMatrix"),ye.setOptional(B,X,"bindMatrixInverse");const Me=X.skeleton;Me&&(Me.boneTexture===null&&Me.computeBoneTexture(),ye.setValue(B,"boneTexture",Me.boneTexture,$))}X.isBatchedMesh&&(ye.setOptional(B,X,"batchingTexture"),ye.setValue(B,"batchingTexture",X._matricesTexture,$),ye.setOptional(B,X,"batchingIdTexture"),ye.setValue(B,"batchingIdTexture",X._indirectTexture,$),ye.setOptional(B,X,"batchingColorTexture"),X._colorsTexture!==null&&ye.setValue(B,"batchingColorTexture",X._colorsTexture,$));const Ki=K.morphAttributes;if((Ki.position!==void 0||Ki.normal!==void 0||Ki.color!==void 0)&&k.update(X,K,On),(qi||wt.receiveShadow!==X.receiveShadow)&&(wt.receiveShadow=X.receiveShadow,ye.setValue(B,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&F.environment!==null&&(Oe.envMapIntensity.value=F.environmentIntensity),Oe.dfgLUT!==void 0&&(Oe.dfgLUT.value=Kw()),qi){if(ye.setValue(B,"toneMappingExposure",R.toneMappingExposure),wt.needsLights&&A0(Oe,es),xt&&W.fog===!0&&Rt.refreshFogUniforms(Oe,xt),Rt.refreshMaterialUniforms(Oe,W,et,J,w.state.transmissionRenderTarget[A.id]),wt.needsLights&&wt.lightProbeGrid){const Me=wt.lightProbeGrid;Oe.probesSH.value=Me.texture,Oe.probesMin.value.copy(Me.boundingBox.min),Oe.probesMax.value.copy(Me.boundingBox.max),Oe.probesResolution.value.copy(Me.resolution)}Oo.upload(B,nf(wt),Oe,$)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Oo.upload(B,nf(wt),Oe,$),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ye.setValue(B,"center",X.center),ye.setValue(B,"modelViewMatrix",X.modelViewMatrix),ye.setValue(B,"normalMatrix",X.normalMatrix),ye.setValue(B,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){const Me=W.uniformsGroups;for(let Yi=0,ns=Me.length;Yi<ns;Yi++){const af=Me[Yi];rt.update(af,On),rt.bind(af,On)}}return On}function A0(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.sunLights.needsUpdate=F,A.sunLightShadows.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function M0(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(A,F,K){const W=q.get(A);W.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),q.get(A.texture).__webglTexture=F,q.get(A.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:K,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,F){const K=q.get(A);K.__webglFramebuffer=F,K.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,K=0){Y=A,D=F,G=K;let W=null,X=!1,xt=!1;if(A){const gt=q.get(A);if(gt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(B.FRAMEBUFFER,gt.__webglFramebuffer),Z.copy(A.viewport),at.copy(A.scissor),ot=A.scissorTest,_.viewport(Z),_.scissor(at),_.setScissorTest(ot),V=-1;return}else if(gt.__webglFramebuffer===void 0)$.setupRenderTarget(A);else if(gt.__hasExternalTextures)$.rebindTextures(A,q.get(A.texture).__webglTexture,q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Yt=A.depthTexture;if(gt.__boundDepthTexture!==Yt){if(Yt!==null&&q.has(Yt)&&(A.width!==Yt.image.width||A.height!==Yt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(A)}}const St=A.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(xt=!0);const Ct=q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ct[F])?W=Ct[F][K]:W=Ct[F],X=!0):A.samples>0&&$.useMultisampledRTT(A)===!1?W=q.get(A).__webglMultisampledFramebuffer:Array.isArray(Ct)?W=Ct[K]:W=Ct,Z.copy(A.viewport),at.copy(A.scissor),ot=A.scissorTest}else Z.copy(yt).multiplyScalar(et).floor(),at.copy(Ut).multiplyScalar(et).floor(),ot=pe;if(K!==0&&(W=L),_.bindFramebuffer(B.FRAMEBUFFER,W)&&_.drawBuffers(A,W),_.viewport(Z),_.scissor(at),_.setScissorTest(ot),X){const gt=q.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,gt.__webglTexture,K)}else if(xt){const gt=F;for(let St=0;St<A.textures.length;St++){const Ct=q.get(A.textures[St]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+St,Ct.__webglTexture,K,gt)}}else if(A!==null&&K!==0){const gt=q.get(A.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,gt.__webglTexture,K)}V=-1};function sf(A){const F=q.get(A);return(F.__readFormat!==A.format||F.__readType!==A.type)&&(F.__readFormat=A.format,F.__readType=A.type,F.__formatReadable=C.textureFormatReadable(A.format),F.__typeReadable=C.textureTypeReadable(A.type)),F}this.readRenderTargetPixels=function(A,F,K,W,X,xt,At,gt=0){if(!(A&&A.isWebGLRenderTarget)){ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&At!==void 0&&(St=St[At]),St){_.bindFramebuffer(B.FRAMEBUFFER,St);try{const Ct=A.textures[gt],Yt=Ct.format,jt=Ct.type;A.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+gt);const Et=sf(Ct);if(Et.__formatReadable===!1){ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Et.__typeReadable===!1){ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-W&&K>=0&&K<=A.height-X&&B.readPixels(F,K,W,X,dt.convert(Yt),dt.convert(jt),xt)}finally{const Ct=Y!==null?q.get(Y).__webglFramebuffer:null;_.bindFramebuffer(B.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(A,F,K,W,X,xt,At,gt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&At!==void 0&&(St=St[At]),St)if(F>=0&&F<=A.width-W&&K>=0&&K<=A.height-X){_.bindFramebuffer(B.FRAMEBUFFER,St);const Ct=A.textures[gt],Yt=Ct.format,jt=Ct.type;A.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+gt);const Et=sf(Ct);if(Et.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Et.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const de=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,de),B.bufferData(B.PIXEL_PACK_BUFFER,xt.byteLength,B.STREAM_READ),B.readPixels(F,K,W,X,dt.convert(Yt),dt.convert(jt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);const Ve=Y!==null?q.get(Y).__webglFramebuffer:null;_.bindFramebuffer(B.FRAMEBUFFER,Ve);const Ee=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await fy(B,Ee,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,de),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,xt),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(de),B.deleteSync(Ee),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,F=null,K=0){const W=Math.pow(2,-K),X=Math.floor(A.image.width*W),xt=Math.floor(A.image.height*W),At=F!==null?F.x:0,gt=F!==null?F.y:0;$.setTexture2D(A,0),B.copyTexSubImage2D(B.TEXTURE_2D,K,0,0,At,gt,X,xt),_.unbindTexture()},this.copyTextureToTexture=function(A,F,K=null,W=null,X=0,xt=0){let At,gt,St,Ct,Yt,jt,Et,de,Ve;const Ee=A.isCompressedTexture?A.mipmaps[xt]:A.image;if(K!==null)At=K.max.x-K.min.x,gt=K.max.y-K.min.y,St=K.isBox3?K.max.z-K.min.z:1,Ct=K.min.x,Yt=K.min.y,jt=K.isBox3?K.min.z:0;else{const Oe=Math.pow(2,-X);At=Math.floor(Ee.width*Oe),gt=Math.floor(Ee.height*Oe),A.isDataArrayTexture?St=Ee.depth:A.isData3DTexture?St=Math.floor(Ee.depth*Oe):St=1,Ct=0,Yt=0,jt=0}W!==null?(Et=W.x,de=W.y,Ve=W.z):(Et=0,de=0,Ve=0);const ve=dt.convert(F.format),sn=dt.convert(F.type);let wt;F.isData3DTexture?($.setTexture3D(F,0),wt=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?($.setTexture2DArray(F,0),wt=B.TEXTURE_2D_ARRAY):($.setTexture2D(F,0),wt=B.TEXTURE_2D),_.activeTexture(B.TEXTURE0),_.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);const ln=_.getParameter(B.UNPACK_ROW_LENGTH),se=_.getParameter(B.UNPACK_IMAGE_HEIGHT),On=_.getParameter(B.UNPACK_SKIP_PIXELS),oi=_.getParameter(B.UNPACK_SKIP_ROWS),qi=_.getParameter(B.UNPACK_SKIP_IMAGES);_.pixelStorei(B.UNPACK_ROW_LENGTH,Ee.width),_.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ee.height),_.pixelStorei(B.UNPACK_SKIP_PIXELS,Ct),_.pixelStorei(B.UNPACK_SKIP_ROWS,Yt),_.pixelStorei(B.UNPACK_SKIP_IMAGES,jt);const es=A.isDataArrayTexture||A.isData3DTexture,ye=F.isDataArrayTexture||F.isData3DTexture;if(A.isDepthTexture){const Oe=q.get(A),Ki=q.get(F),Me=q.get(Oe.__renderTarget),Yi=q.get(Ki.__renderTarget);_.bindFramebuffer(B.READ_FRAMEBUFFER,Me.__webglFramebuffer),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,Yi.__webglFramebuffer);for(let ns=0;ns<St;ns++)es&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(A).__webglTexture,X,jt+ns),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(F).__webglTexture,xt,Ve+ns)),B.blitFramebuffer(Ct,Yt,At,gt,Et,de,At,gt,B.DEPTH_BUFFER_BIT,B.NEAREST);_.bindFramebuffer(B.READ_FRAMEBUFFER,null),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(X!==0||A.isRenderTargetTexture||q.has(A)){const Oe=q.get(A),Ki=q.get(F);_.bindFramebuffer(B.READ_FRAMEBUFFER,P),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,I);for(let Me=0;Me<St;Me++)es?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Oe.__webglTexture,X,jt+Me):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Oe.__webglTexture,X),ye?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ki.__webglTexture,xt,Ve+Me):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ki.__webglTexture,xt),X!==0?B.blitFramebuffer(Ct,Yt,At,gt,Et,de,At,gt,B.COLOR_BUFFER_BIT,B.NEAREST):ye?B.copyTexSubImage3D(wt,xt,Et,de,Ve+Me,Ct,Yt,At,gt):B.copyTexSubImage2D(wt,xt,Et,de,Ct,Yt,At,gt);_.bindFramebuffer(B.READ_FRAMEBUFFER,null),_.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else ye?A.isDataTexture||A.isData3DTexture?B.texSubImage3D(wt,xt,Et,de,Ve,At,gt,St,ve,sn,Ee.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(wt,xt,Et,de,Ve,At,gt,St,ve,Ee.data):B.texSubImage3D(wt,xt,Et,de,Ve,At,gt,St,ve,sn,Ee):A.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,xt,Et,de,At,gt,ve,sn,Ee.data):A.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,xt,Et,de,Ee.width,Ee.height,ve,Ee.data):B.texSubImage2D(B.TEXTURE_2D,xt,Et,de,At,gt,ve,sn,Ee);_.pixelStorei(B.UNPACK_ROW_LENGTH,ln),_.pixelStorei(B.UNPACK_IMAGE_HEIGHT,se),_.pixelStorei(B.UNPACK_SKIP_PIXELS,On),_.pixelStorei(B.UNPACK_SKIP_ROWS,oi),_.pixelStorei(B.UNPACK_SKIP_IMAGES,qi),xt===0&&F.generateMipmaps&&B.generateMipmap(wt),_.unbindTexture()},this.initRenderTarget=function(A){q.get(A).__webglFramebuffer===void 0&&$.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?$.setTextureCube(A,0):A.isData3DTexture?$.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?$.setTexture2DArray(A,0):$.setTexture2D(A,0),_.unbindTexture()},this.resetState=function(){D=0,G=0,Y=null,_.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}function Ye(i,t,e){return new vi(i,t,e,6,1,!1)}function tr(i,t=!1){return new Us({color:i,metalness:.32,roughness:.36,flatShading:!0,vertexColors:t,side:An})}const bm=new Wi(.265,.024,3,6);bm.rotateX(-Math.PI/2);const Ru=new Wi(.255,.04,4,8);Ru.rotateX(-Math.PI/2);const wm=new Wi(.21,.065,4,6);wm.rotateX(-Math.PI/2);const Jw=[{id:"nano-hex",name:"Nano Hex Genesis",wave:"radial",shaderMode:0,plateGeometry:Ye(.448,.465,.16),insetGeometry:Ye(.395,.395,.012),plateColor:3159094,insetColor:1843234,insetOffset:.086,detailGeometry:null,detailOffset:0,lift:1,tilt:1,compression:1,warp:1,reflection:1,socket:1},{id:"armor-scales",name:"Armor Scales",wave:"faceted",shaderMode:1,plateGeometry:Ye(.425,.468,.22),insetGeometry:Ye(.355,.355,.012),plateColor:3159608,insetColor:1448476,insetOffset:.116,detailGeometry:new dr(.055,.018,.62),detailMaterial:tr(5857637),detailOffset:.134,lift:.88,tilt:1.28,compression:.75,warp:1.08,reflection:.82,socket:.72},{id:"obsidian-bloom",name:"Obsidian Bloom",wave:"spiral",shaderMode:2,plateGeometry:Ye(.365,.468,.31),insetGeometry:Ye(.27,.27,.012),plateColor:2698542,insetColor:1382682,insetOffset:.161,detailGeometry:Ye(.075,.075,.02),detailMaterial:tr(5331293),detailOffset:.18,lift:1.38,tilt:.72,compression:1.1,warp:.8,reflection:1.12,socket:.82},{id:"circuit-matrix",name:"Circuit Matrix",wave:"diamond",shaderMode:3,plateGeometry:Ye(.459,.466,.1),insetGeometry:Ye(.315,.315,.012),plateColor:2435628,insetColor:1053718,insetOffset:.056,detailGeometry:bm,detailMaterial:tr(9607838),detailOffset:.072,lift:.58,tilt:.42,compression:.58,warp:1.25,reflection:1.3,socket:1.18},{id:"electric-nexus",name:"Electric Nexus",wave:"radial",shaderMode:4,plateGeometry:Ye(.45,.466,.13),insetGeometry:Ye(.37,.37,.012),plateColor:2106663,insetColor:1120025,insetOffset:.071,detailGeometry:null,detailOffset:0,lift:.3,tilt:.3,compression:.25,warp:.28,reflection:.38,socket:.32,electric:!0},{id:"gilded-reactor",name:"Gilded Reactor",wave:"rings",shaderMode:5,plateGeometry:Ye(.42,.468,.22),insetGeometry:Ye(.32,.32,.014),plateColor:6047280,insetColor:1452837,insetOffset:.117,detailGeometry:Ru,detailMaterial:tr(14003555),detailOffset:.134,lift:1.1,tilt:.8,compression:.7,warp:.9,reflection:1.25,socket:1.1,glowColor:14003555},{id:"emerald-flux",name:"Emerald Flux",wave:"tide",shaderMode:6,plateGeometry:Ye(.385,.47,.27),insetGeometry:Ye(.23,.23,.012),plateColor:1591354,insetColor:1059365,insetOffset:.141,detailGeometry:new gh(.17,.24,6),detailMaterial:tr(7786413),detailOffset:.23,lift:1.3,tilt:.65,compression:.9,warp:1.1,reflection:1.15,socket:1.05,glowColor:6672293},{id:"halo-relay",name:"Halo Relay",wave:"cross",shaderMode:7,plateGeometry:Ye(.45,.468,.095),insetGeometry:Ye(.345,.345,.012),plateColor:2636612,insetColor:1056295,insetOffset:.054,detailGeometry:Ru,detailMaterial:tr(8112087),detailOffset:.072,lift:.55,tilt:.4,compression:.55,warp:1.35,reflection:1.35,socket:1.2,glowColor:8112087},{id:"prism-shards",name:"Prism Shards",wave:"shard",shaderMode:8,plateGeometry:new vi(.26,.465,.32,3),insetGeometry:new vi(.15,.15,.012,3),plateColor:4862288,insetColor:2168615,insetOffset:.166,detailGeometry:new xh(.095),detailMaterial:tr(12159932),detailOffset:.205,lift:1.45,tilt:1.18,compression:1.1,warp:1.3,reflection:1.18,socket:.95,glowColor:12159932},{id:"copper-pulse",name:"Copper Pulse",wave:"chevron",shaderMode:9,plateGeometry:Ye(.41,.465,.185),insetGeometry:Ye(.315,.315,.012),plateColor:5323573,insetColor:1583659,insetOffset:.099,detailGeometry:wm,detailMaterial:tr(13075304),detailOffset:.115,lift:.92,tilt:.92,compression:.88,warp:1.12,reflection:1.25,socket:1.08,glowColor:13075304}],Qw=[{id:"resonant-sphere",name:"Resonant Sphere",sceneMode:"sphere",wave:"deform",glowColor:14269048},{id:"orbit-forge",name:"Orbit Forge",sceneMode:"orbits",wave:"orbit",glowColor:8771275},{id:"aurora-ribbons",name:"Aurora Ribbons",sceneMode:"ribbons",wave:"ribbon",glowColor:9359277},{id:"spectrum-spires",name:"Spectrum Spires",sceneMode:"spires",wave:"columns",glowColor:16758904},{id:"stellar-drift",name:"Stellar Drift",sceneMode:"galaxy",wave:"spiral",glowColor:13018860},{id:"crystal-bloom",name:"Crystal Bloom",sceneMode:"crystals",wave:"radial",glowColor:15771069},{id:"double-helix",name:"Double Helix",sceneMode:"helix",wave:"helix",glowColor:10149343},{id:"liquid-mirror",name:"Liquid Mirror",sceneMode:"liquid",wave:"ripple",glowColor:12178925},{id:"pulsar-core",name:"Pulsar Core",sceneMode:"pulsar",wave:"burst",glowColor:16765311},{id:"wave-tunnel",name:"Wave Tunnel",sceneMode:"tunnel",wave:"depth",glowColor:10279869}].map((i,t)=>({...i,shaderMode:10+t,lift:1,tilt:1,compression:1,warp:1,reflection:1,socket:1})),Un=[...Jw,...Qw],ld=24,un=new He,ys=new kt;function Zw(i){const t=i.filter(f=>f.row%3===0&&f.col%3===0),e=[],n=t.map(()=>[]);for(let f=0;f<t.length;f+=1)for(let d=f+1;d<t.length;d+=1){const g=Math.hypot(t[f].x-t[d].x,t[f].z-t[d].z);if(g<1.9||g>2.85)continue;const y={a:f,b:d,length:g,x:(t[f].x+t[d].x)*.5,z:(t[f].z+t[d].z)*.5,seed:(f*37+d*71)%101/101};n[f].push(e.length),n[d].push(e.length),e.push(y)}const r=new Fn({color:16777215,toneMapped:!1}),s=new Hn(new dr(1,.012,.022),r,e.length);s.frustumCulled=!1,e.forEach((f,d)=>{const g=t[f.a],y=t[f.b];un.position.set(f.x,.18,f.z),un.rotation.set(0,-Math.atan2(y.z-g.z,y.x-g.x),0),un.scale.set(f.length,1,1),un.updateMatrix(),s.setMatrixAt(d,un.matrix)}),s.instanceMatrix.needsUpdate=!0;const a=new Hn(new vi(.105,.105,.03,6,1,!1),r,t.length);a.frustumCulled=!1,t.forEach((f,d)=>{un.position.set(f.x,.2,f.z),un.rotation.set(0,0,0),un.scale.setScalar(1),un.updateMatrix(),a.setMatrixAt(d,un.matrix)}),a.instanceMatrix.needsUpdate=!0;const o=new Hn(new mc(.065,0),r,ld);o.frustumCulled=!1,o.count=0;const c=new pn;c.add(s,a,o),c.visible=!1;function l(f){const d=new Float32Array(t.length).fill(1/0),g=new Uint8Array(t.length);let y=0,m=1/0;t.forEach((p,b)=>{const S=Math.hypot(p.x-f.x,p.z-f.z);S<m&&(m=S,y=b)}),d[y]=0;for(let p=0;p<t.length;p+=1){let b=-1,S=1/0;for(let v=0;v<t.length;v+=1)!g[v]&&d[v]<S&&(S=d[v],b=v);if(b<0)break;g[b]=1;for(const v of n[b]){const M=e[v],w=M.a===b?M.b:M.a,T=S+M.length*(.85+M.seed*.3);T<d[w]&&(d[w]=T)}}return d}function u(f,d,g,y){const m=(f-d)/y;return Math.exp(-m*m)*g*Math.max(0,1-f/3)}function h(f,d,g){for(const m of f)m.electricDistances||(m.electricDistances=l(m));let y=0;e.forEach((m,p)=>{let b=0,S=0,v=!0;for(const w of f){const T=(d-w.started)/1e3,x=w.electricDistances,E=x[m.a]<=x[m.b],R=Math.min(x[m.a],x[m.b])/7.4+m.seed*.12,N=u(T,R,w.strength,.22);N>b&&(b=N,S=Math.min(1,Math.max(0,(T-R)*4)),v=E)}const M=Math.min(1,.065+g*.035+b*.88);if(ys.setRGB(M*.9,M*.93,M*.95),s.setColorAt(p,ys),b>.32&&m.seed>.35&&y<ld){const w=t[v?m.a:m.b],T=t[v?m.b:m.a];un.position.set(w.x+(T.x-w.x)*S,.24,w.z+(T.z-w.z)*S),un.rotation.set(0,0,0),un.scale.setScalar(.5+b*1.25),un.updateMatrix(),o.setMatrixAt(y,un.matrix),ys.setRGB(b,b,b),o.setColorAt(y,ys),y+=1}}),t.forEach((m,p)=>{let b=0;for(const v of f){const M=(d-v.started)/1e3;b=Math.max(b,u(M,v.electricDistances[p]/7.4,v.strength,.26))}const S=Math.min(1,.11+b*.85);ys.setRGB(S*.9,S*.93,S*.95),a.setColorAt(p,ys)}),s.instanceColor.needsUpdate=!0,a.instanceColor.needsUpdate=!0,o.count=y,y&&(o.instanceMatrix.needsUpdate=!0,o.instanceColor.needsUpdate=!0)}return h([],performance.now(),0),{group:c,update:h}}const Xe=new He,mi=new kt,vc=Math.PI*2;function zt(i){return Math.max(0,Math.min(1,Number(i)||0))}function jo(i,t=.35,e=.3){return new Us({color:i,metalness:t,roughness:e,emissive:i,emissiveIntensity:.08,side:An})}function $w(){const t=new Float32Array(1320);for(let n=0;n<440;n+=1){const r=n*17.271;t[n*3]=Math.sin(r*1.3)*9,t[n*3+1]=Math.sin(r*2.7)*6,t[n*3+2]=-7-n%8*.5}const e=new Ke;return e.setAttribute("position",new _n(t,3)),new sm(e,new mh({color:11190969,size:.018,transparent:!0,opacity:.45,depthWrite:!1}))}function jw(){const i=new pn,t=new gc(2.2,72,48),e=new Float32Array(t.attributes.position.array),n=new Ue(t,new lm({color:13941891,metalness:.55,roughness:.22,clearcoat:.9,clearcoatRoughness:.14,flatShading:!1,emissive:6111006,emissiveIntensity:.12})),r=new Ue(new Wi(3.08,.018,8,160),new Fn({color:9819576,transparent:!0,opacity:.62}));return r.rotation.x=1.05,i.add(n,r),{group:i,camera:[0,0,11.5],update(s,a,o){const c=zt(s.bass),l=zt(s.mid),u=zt(s.treble),h=zt(s.beat),f=t.attributes.position;for(let d=0;d<f.count;d+=1){const g=e[d*3],y=e[d*3+1],m=e[d*3+2],p=g/2.2,b=y/2.2,S=m/2.2,v=Math.sin(p*5.4+a*2.4)*Math.cos(b*4.2-a*1.3),M=Math.sin(b*11+S*7-a*3.8),w=Math.sin((p+b+S)*21+a*6.2),T=v*(.018+c*.44+h*.13)+M*(.009+l*.18)+w*(.004+u*.09),x=1+Math.max(-.2,Math.min(.28,T));f.setXYZ(d,g*x,y*x,m*x)}f.needsUpdate=!0,t.computeVertexNormals(),n.rotation.y+=o*(.12+l*.32),n.rotation.x=Math.sin(a*.22)*.15,n.material.emissiveIntensity=.12+c*.34+h*.2,r.rotation.z+=o*(.12+u*.7),r.material.opacity=.38+h*.4}}}function tA(){const i=new pn,t=[8443073,14729852,9551842,16033149].map((n,r)=>{const s=new Ue(new Wi(2.15+r*.48,.065-r*.009,10,128),jo(n,.42,.24));return s.rotation.set(.3+r*.45,r*.58,r*.24),i.add(s),s}),e=new Ue(new pc(.88,3),jo(15259045,.62,.18));return i.add(e),{group:i,camera:[0,0,12.8],update(n,r,s){const a=[n.bass,n.mid,n.treble,n.energy];t.forEach((o,c)=>{o.rotation.x+=s*(.07+c*.025+zt(a[c])*.28)*(c%2?-1:1),o.rotation.y+=s*(.12+zt(a[c])*.35),o.scale.setScalar(1+zt(a[c])*.08+zt(n.beat)*.04),o.material.emissiveIntensity=.1+zt(a[c])*.42}),e.rotation.y=r*.19,e.rotation.x=r*.1,e.scale.setScalar(1+zt(n.bass)*.24)}}}function eA(){const i=new pn,t=[],e=[7850922,8833239,14993799,11770840,6399392,14722469];for(let n=0;n<e.length;n+=1){const s=new Float32Array(576),a=[];for(let l=0;l<95;l+=1){const u=l*2;a.push(u,u+1,u+2,u+1,u+3,u+2)}const o=new Ke;o.setAttribute("position",new _n(s,3)),o.setIndex(a);const c=new Ue(o,new Fn({color:e[n],side:An,transparent:!0,opacity:.7,depthWrite:!1,blending:Wo,toneMapped:!1}));i.add(c),t.push({geometry:o,mesh:c,index:n,count:96})}return{group:i,camera:[0,0,11],update(n,r){const s=zt(n.bass),a=zt(n.mid),o=zt(n.treble);t.forEach(({geometry:c,mesh:l,index:u,count:h})=>{const f=c.attributes.position;for(let d=0;d<h;d+=1){const g=d/(h-1),y=(g-.5)*11.2,m=Math.sin(g*Math.PI),p=(u-2.5)*.54+Math.sin(g*(8+u*.8)+r*(.7+u*.13))*m*(.3+a*1.15)+Math.sin(g*24-r*2.8+u)*m*o*.19,b=(u-2.5)*.36+Math.sin(g*9-r+u)*s*.52,S=(.16+s*.28+zt(n.beat)*.1)*m;f.setXYZ(d*2,y,p-S,b),f.setXYZ(d*2+1,y,p+S,b)}f.needsUpdate=!0,c.computeVertexNormals(),l.material.opacity=.58+zt(n.energy)*.28})}}}function nA(){const i=new pn,t=108,e=new vi(.075,.13,1,6),n=jo(16777215,.55,.26),r=new Hn(e,n,t);r.instanceMatrix.setUsage(Or),r.frustumCulled=!1;const s=new Ue(new yh(2.2,4.9,96),new Fn({color:3363919,side:An,transparent:!0,opacity:.34}));return s.rotation.x=-Math.PI/2,s.position.y=-1.62,i.add(s,r),{group:i,camera:[0,6.6,14.5],mobileFraming:1.08,update(a,o){const c=[zt(a.bass),zt(a.mid),zt(a.treble)];for(let l=0;l<t;l+=1){const u=Math.floor(l/36),h=l%36/36*vc,f=1.45+u*1.35,d=c[u],g=(Math.sin(h*(4+u*2)-o*2.6)+1)*.5,y=.28+d*(1.6+g*2.4)+g*.32+zt(a.beat)*(u===0?.85:.25);Xe.position.set(Math.cos(h)*f,-1.6+y*.5,Math.sin(h)*f),Xe.rotation.set(0,-h,0),Xe.scale.set(1,y,1),Xe.updateMatrix(),r.setMatrixAt(l,Xe.matrix),mi.setHex([14792565,7849902,10467809][u]).multiplyScalar(.42+d*.62+g*.16),r.setColorAt(l,mi)}r.instanceMatrix.needsUpdate=!0,r.instanceColor.needsUpdate=!0,i.rotation.y=Math.sin(o*.12)*.1}}}function iA(){const i=new pn,t=3e3,e=new Float32Array(t*3),n=new Float32Array(t*3);for(let a=0;a<t;a+=1){const o=a%4,c=(Math.floor(a/4)+.5)/(t/4),l=.18+Math.sqrt(c)*4.9,u=Math.sin(a*67.17)*.22*c,h=o*vc/4+l*.78+u;e[a*3]=Math.cos(h)*l+Math.sin(a*1.31)*.16,e[a*3+1]=Math.sin(h)*l+Math.cos(a*1.77)*.16,e[a*3+2]=Math.sin(a*2.97)*.65*c,mi.setHex([12952799,9423054,15124365,15247280][o]),n[a*3]=mi.r,n[a*3+1]=mi.g,n[a*3+2]=mi.b}const r=new Ke;r.setAttribute("position",new _n(e,3)),r.setAttribute("color",new _n(n,3));const s=new sm(r,new mh({size:.055,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.82,depthWrite:!1,blending:Wo}));return i.add(s),{group:i,camera:[0,0,13.5],update(a,o,c){s.rotation.z+=c*(.04+zt(a.mid)*.32),s.rotation.x=Math.sin(o*.24)*(.16+zt(a.treble)*.2),s.scale.setScalar(1+zt(a.bass)*.16+zt(a.beat)*.06),s.material.size=.045+zt(a.treble)*.085,s.material.opacity=.64+zt(a.energy)*.32}}}function rA(){const i=new pn,t=164,e=new Hn(new mc(.36,0),jo(16777215,.36,.19),t);return e.instanceMatrix.setUsage(Or),e.frustumCulled=!1,i.add(e),{group:i,camera:[0,0,12],mobileFraming:1.18,update(n,r,s){const a=zt(n.bass),o=zt(n.mid),c=zt(n.treble);for(let l=0;l<t;l+=1){const u=Math.floor(l/41),h=l%41/41*vc+u*.31,f=.9+u*.9+(u%2?.08:0),d=1+a*.28+zt(n.beat)*.12;Xe.position.set(Math.cos(h)*f*d,Math.sin(h)*f*d,Math.sin(h*4+r*.8)*(.25+o*.9)+u*.13),Xe.rotation.set(r*.13+u,h,r*.2+h);const g=.45+(u===0?a:u===3?c:o)*.9+(Math.sin(r*1.8+h*6)+1)*.12;Xe.scale.set(g*.72,g*(1.3+u*.14),g*.72),Xe.updateMatrix(),e.setMatrixAt(l,Xe.matrix),mi.setHex([15773116,13021422,9358022,15913104][u]),e.setColorAt(l,mi)}e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0,i.rotation.z+=s*.06}}}function sA(){const i=new pn,t=240,e=new Hn(new gc(.09,8,6),new Fn({color:16777215}),t);e.instanceMatrix.setUsage(Or),e.frustumCulled=!1;const n=[0,1].map(r=>{const s=new Ke;s.setAttribute("position",new _n(new Float32Array(360),3));const a=new Oy(s,new rm({color:r?15387531:9163732,transparent:!0,opacity:.55}));return i.add(a),s});return i.add(e),{group:i,camera:[0,0,13],update(r,s){const a=zt(r.bass),o=zt(r.mid);for(let c=0;c<2;c+=1){const l=n[c].attributes.position;for(let u=0;u<120;u+=1){const h=u/119,f=h*Math.PI*7+s*(.35+o*.25)+c*Math.PI,d=1.3+a*.48+Math.sin(h*25-s*2)*zt(r.treble)*.16,g=Math.cos(f)*d,y=(h-.5)*7.4,m=Math.sin(f)*d;l.setXYZ(u,g,y,m),Xe.position.set(g,y,m),Xe.rotation.set(0,0,0),Xe.scale.setScalar(.7+(c?o:a)*1.3+zt(r.beat)*.25),Xe.updateMatrix();const p=c*120+u;e.setMatrixAt(p,Xe.matrix),mi.setHex(c?15387531:9163732),e.setColorAt(p,mi)}l.needsUpdate=!0}e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0}}}function aA(){const i=new pn,t=new Ws(10.5,10.5,72,72);t.rotateX(-Math.PI/2);const e=new Float32Array(t.attributes.position.array),n=new Ue(t,new lm({color:10205893,metalness:.72,roughness:.18,clearcoat:1,clearcoatRoughness:.1,side:An,emissive:1855831,emissiveIntensity:.2})),r=new Ue(t,new Fn({color:12970465,wireframe:!0,transparent:!0,opacity:.13,depthWrite:!1}));return r.scale.setScalar(1.003),i.add(n,r),{group:i,camera:[0,5.6,10.2],update(s,a){const o=t.attributes.position,c=zt(s.bass),l=zt(s.mid),u=zt(s.treble);for(let h=0;h<o.count;h+=1){const f=e[h*3],d=e[h*3+2],g=Math.hypot(f,d),y=Math.sin(g*2.2-a*2.1)*(.12+c*.45),m=Math.sin(f*2.6+a*1.6)*Math.cos(d*2.2-a)*(.06+l*.22),p=Math.sin((f+d)*6-a*4)*u*.05;o.setY(h,y+m+p)}o.needsUpdate=!0,t.computeVertexNormals(),n.material.emissiveIntensity=.12+zt(s.beat)*.42,r.material.opacity=.11+zt(s.energy)*.16}}}function oA(){const i=new pn,t=new Ue(new pc(1.2,2),new Us({color:16765847,metalness:.15,roughness:.25,emissive:11887396,emissiveIntensity:1.1,flatShading:!0})),e=new Hn(new dr(.055,1,.055),new Fn({color:16171649,transparent:!0,opacity:.72}),64);e.instanceMatrix.setUsage(Or),e.frustumCulled=!1;const n=[1.9,2.7,3.6].map((r,s)=>{const a=new Ue(new Wi(r,.018+s*.004,8,128),new Fn({color:s===1?9423299:15318659,transparent:!0,opacity:.5}));return i.add(a),a});return i.add(t,e),{group:i,camera:[0,0,11.8],update(r,s){const a=zt(r.bass),o=zt(r.beat),c=zt(r.treble);t.scale.setScalar(1+a*.25+o*.19),t.rotation.set(s*.12,s*.23,0),t.material.emissiveIntensity=.72+a*1.25+o*.8,n.forEach((l,u)=>{l.scale.setScalar(1+o*(.05+u*.045)),l.rotation.x=Math.sin(s*.2+u)*.2,l.rotation.z=s*(u%2?-.055:.07)});for(let l=0;l<64;l+=1){const u=l/64*vc,h=.55+Math.sin(u*9-s*2.2)*.24+c*1.15+o*.65;Xe.position.set(Math.cos(u)*(2.25+h*.42),Math.sin(u)*(2.25+h*.42),0),Xe.rotation.set(0,0,u-Math.PI/2),Xe.scale.set(1,h,1),Xe.updateMatrix(),e.setMatrixAt(l,Xe.matrix)}e.instanceMatrix.needsUpdate=!0}}}function cA(){const i=new pn,t=Array.from({length:24},(e,n)=>{const r=new Ue(new Wi(2.5,.025+n%4*.006,8,96),new Fn({color:[9557430,14269822,9157586,12165589][n%4],transparent:!0,opacity:.35+n%4*.07}));return i.add(r),r});return{group:i,camera:[0,0,10.5],lookAt:[0,0,-5],update(e,n){const r=zt(e.bass),s=zt(e.beat),a=zt(e.treble);t.forEach((o,c)=>{const l=(n*(.85+r*1.7)+c*1.35)%32;o.position.z=-26+l,o.position.x=Math.sin(c*.32+n*.3)*.14,o.position.y=Math.cos(c*.38+n*.26)*.14,o.rotation.z=n*.08+c*.11,o.scale.setScalar(1+s*.08+a*.08),o.material.opacity=Math.min(.84,.2+l/32*.5+s*.15)})}}}const lA={sphere:jw,orbits:tA,ribbons:eA,spires:nA,galaxy:iA,crystals:rA,helix:sA,liquid:aA,pulsar:oA,tunnel:cA};function uA(i){const t=new tm;t.background=new kt(462863),t.add($w()),t.add(new fm(12900304,1.4));const e=new $o(15190164,62,28);e.position.set(-3,5,7),t.add(e);const n=new $o(8506296,44,30);n.position.set(4,-2,-2),t.add(n);const r=new Nn(42,1,.1,100),s=new Map;let a=null,o=1;function c(h,f){o=h/Math.max(1,f),r.aspect=o,r.updateProjectionMatrix()}function l(h,f){if(a&&(a.group.visible=!1),!h){a=null;return}if(!s.has(h)){const d=lA[h]();t.add(d.group),s.set(h,d)}a=s.get(h),a.group.visible=!0,e.color.setHex(f??15190164),n.color.setHex(h==="sphere"?9361852:9550033)}function u(h,f,d){if(!a)return;const g=o<.9?a.mobileFraming??1.15:1;r.position.set(...a.camera.map(y=>y*g)),r.lookAt(...a.lookAt??[0,0,0]),a.update(h,f,d),e.intensity=45+zt(h.bass)*35,n.intensity=32+zt(h.treble)*28,i.render(t,r)}return{resize:c,setMode:l,render:u}}const er=1073,Je=new He,Kn=new kt,hA=new kt(11581370),ud=new kt(5791845),hd=new kt(11581370);function fA(i){const t=new Yw({canvas:i,antialias:!0,powerPreference:"high-performance"});t.setClearColor(330255,1),t.outputColorSpace=In,t.toneMapping=eh,t.toneMappingExposure=1.42;const e=uA(t),n=new tm;n.fog=new fh(330255,.017);const r=new yc(-11,11,11,-11,.1,100);r.position.set(0,24,0),r.up.set(0,0,-1),r.lookAt(0,0,0);const s=new vi(.478,.478,.035,6,1,!1);let a=Un[0];const o=new Us({color:a.plateColor,metalness:.23,roughness:.36,flatShading:!0,emissive:395531,emissiveIntensity:.12}),c=new Hn(a.plateGeometry,o,er);c.instanceMatrix.setUsage(Or),c.instanceColor=new Su(new Float32Array(er*3),3),c.frustumCulled=!1,n.add(c);const l=new Us({color:a.insetColor,metalness:.18,roughness:.42,emissive:197894,emissiveIntensity:.1}),u=new Hn(a.insetGeometry,l,er);u.instanceMatrix.setUsage(Or),u.frustumCulled=!1,n.add(u);const h=new Hn(Un[1].detailGeometry,Un[1].detailMaterial,er);h.instanceMatrix.setUsage(Or),h.frustumCulled=!1,h.visible=!1,n.add(h);const f=new Hn(s,new Fn({color:16777215,toneMapped:!1}),er);f.frustumCulled=!1,n.add(f);const d=new Hn(new vi(.47,.47,.006,6,1,!1),new Fn({color:0,transparent:!0,opacity:.55,depthWrite:!1}),er);d.frustumCulled=!1,n.add(d);const g=dA(er),y=new Float32Array(er);g.forEach((L,P)=>{Je.position.set(L.x,-.17,L.z),Je.rotation.set(0,0,0),Je.scale.setScalar(1),Je.updateMatrix(),f.setMatrixAt(P,Je.matrix),Kn.copy(L.accent?hA:ud).multiplyScalar(.065),f.setColorAt(P,Kn),Je.position.y=-.12,Je.updateMatrix(),d.setMatrixAt(P,Je.matrix)}),f.instanceMatrix.needsUpdate=!0,f.instanceColor.needsUpdate=!0,d.instanceMatrix.needsUpdate=!0;const m=pA();n.add(m);const p=Zw(g);n.add(p.group);function b(L){const P=Un.find(I=>I.id===L);return P?(a=P,P.sceneMode?(e.setMode(P.sceneMode,P.glowColor),e.resize(i.clientWidth,i.clientHeight),P):(e.setMode(null),hd.setHex(P.glowColor??11581370),c.geometry=P.plateGeometry,o.color.setHex(P.plateColor),u.geometry=P.insetGeometry,l.color.setHex(P.insetColor),h.visible=!!P.detailGeometry,P.detailGeometry&&(h.geometry=P.detailGeometry,h.material=P.detailMaterial),p.group.visible=!!P.electric,m.material.uniforms.uMode.value=P.shaderMode,m.material.uniforms.uTint.value.setHex(P.glowColor??16777215),P)):a}const S=new $o(13357521,11,42,1.2);S.position.set(0,11,3),n.add(S);const v=new $o(8752272,9,35,1.2);v.position.set(-5.4,10,-4),n.add(v);const M=new Yy(15200498,3.2);M.position.set(5,9,7),n.add(M),n.add(new fm(12700624,2.25));let w=0,T=0,x=-1e3;const E=[];function R(L=0,P=0,I=1){E.push({x:L,z:P,started:performance.now(),strength:I}),E.length>4&&E.shift()}function N(){const L=i.getBoundingClientRect();e.resize(L.width,L.height);const P=Math.min(window.devicePixelRatio||1,L.width<720?1.25:1.5),I=Math.max(1,Math.floor(L.width*P)),D=Math.max(1,Math.floor(L.height*P));if(i.width!==I||i.height!==D){t.setPixelRatio(P),t.setSize(L.width,L.height,!1);const G=L.width/Math.max(1,L.height),Y=Math.min(L.width<720?9.6:8.7,14.2/G),V=Y*G;r.left=-V,r.right=V,r.top=Y,r.bottom=-Y,r.updateProjectionMatrix()}}function U(L){const P=performance.now();if(P-w<(i.clientWidth<720?33:20))return;const I=Math.min(.05,(P-w)/1e3||.016);w=P,N();const D=P/1e3;if(a.sceneMode){e.render(L,D,I);return}const G=Math.max(0,L.beat||0),Y=Math.max(0,L.bass||0),V=Math.max(0,L.pulse||0),Q=Math.max(0,L.energy||0);for(G>.72&&T<=.72&&P-x>160&&(R(0,0,Math.min(1.45,.78+Y)),x=P),T=G;E.length&&P-E[0].started>3e3;)E.shift();for(let at=0;at<g.length;at+=1){const ot=g[at];let Ot=0,Nt=0,Kt=0,J=0;for(const Ht of E){const ue=(P-Ht.started)/1e3,_e=ot.x-Ht.x,Ce=ot.z-Ht.z,me=Math.hypot(_e,Ce);let re=me-ue*6.7;a.wave==="faceted"?re+=Math.sin(Math.atan2(Ce,_e)*6)*.36:a.wave==="spiral"?re+=Math.atan2(Ce,_e)*.42:a.wave==="diamond"?re=(Math.abs(_e)+Math.abs(Ce))*.84-ue*6.7:a.wave==="fracture"?re+=Math.sin(ot.x*1.4+ot.z*.8)*.32:a.wave==="rings"?re+=Math.sin(me*2.8)*.24:a.wave==="tide"?re=Math.abs(Ce)-ue*6.7:a.wave==="cross"?re=Math.min(Math.abs(_e),Math.abs(Ce))*1.7-ue*6.7:a.wave==="shard"?re+=Math.sin(Math.atan2(Ce,_e)*9)*.48:a.wave==="chevron"&&(re=Math.abs(_e+Ce)*.82-ue*6.7);const B=Math.max(0,1-ue/3),ze=Math.exp(-re*re/.52)*Ht.strength*B,ae=re+.85,C=Math.exp(-ae*ae/1.6)*Ht.strength*B;Ot+=ze,Nt+=C,me>.01&&(Kt+=_e/me*(ze*.068-C*.022)*a.warp,J+=Ce/me*(ze*.068-C*.022)*a.warp)}Ot=Math.min(1.35,Ot),Nt=Math.min(1,Nt);const et=.55+.45*Math.sin(ot.radius*1.35-D*5.2),ct=Math.min(1,Y*.8+V*.7)*et,Lt=.018+ct*.2+(Ot*(.56+Y*.18)+Nt*.055)*a.lift;y[at]+=(Lt-y[at])*Math.min(1,I*8);const yt=y[at],Ut=Math.min(.085,Ot*.058*a.tilt);Je.position.set(ot.x+Kt,yt,ot.z+J),Je.rotation.set(Ut*Math.sin(ot.angle),0,Ut*Math.cos(ot.angle));const pe=Math.max(.925,1-Ot*.045*a.compression+Nt*.008);Je.scale.set(pe,1,pe),Je.updateMatrix(),c.setMatrixAt(at,Je.matrix),Je.position.y=yt+a.insetOffset,Je.updateMatrix(),u.setMatrixAt(at,Je.matrix),h.visible&&(Je.position.y=yt+a.detailOffset,Je.updateMatrix(),h.setMatrixAt(at,Je.matrix));const Gt=.7+ct*.5+Ot*.6*a.reflection+Nt*.14;Kn.setRGB(Gt,Gt,Gt),c.setColorAt(at,Kn);const $t=.64+ct*.32+Ot*.36*a.reflection+Nt*.07;if(Kn.setRGB($t,$t,$t),u.setColorAt(at,Kn),h.visible){const Ht=.7+ct*.28+Ot*.42*a.reflection;Kn.setRGB(Ht,Ht,Ht),h.setColorAt(at,Kn)}const le=.5+.5*Math.sin(D*.3+ot.x*.18+ot.z*.26);Kn.copy(ud).lerp(hd,le),Kn.multiplyScalar((.055+ct*.34+Ot*(.48+Y*.18)+Nt*.09)*a.socket),f.setColorAt(at,Kn)}c.instanceMatrix.needsUpdate=!0,c.instanceColor.needsUpdate=!0,u.instanceMatrix.needsUpdate=!0,u.instanceColor.needsUpdate=!0,h.visible&&(h.instanceMatrix.needsUpdate=!0,h.instanceColor.needsUpdate=!0),f.instanceColor.needsUpdate=!0,m.material.uniforms.uTime.value=D,m.material.uniforms.uBass.value=Y,m.material.uniforms.uBeat.value=G,m.material.uniforms.uEnergy.value=Q,p.group.visible&&p.update(E,P,Y);const Z=E[E.length-1];m.material.uniforms.uImpactStrength.value=Z?Z.strength*Math.max(0,1-(P-Z.started)/3e3):0,m.material.uniforms.uImpactRadius.value=Z?(P-Z.started)/1e3*6.7:0,Z&&m.material.uniforms.uImpactOrigin.value.set(Z.x,-Z.z),S.intensity=11+Y*8,v.intensity=9+L.treble*6,r.position.x=0,r.position.y=24,r.position.z=0,r.lookAt(0,0,0),t.render(n,r)}return window.addEventListener("resize",N),i.addEventListener("pointerdown",L=>{const P=i.getBoundingClientRect(),I=((L.clientX-P.left)/P.width*2-1)*r.right,D=((L.clientY-P.top)/P.height*2-1)*r.top;R(I,D)}),{resize:N,render:U,triggerImpact:R,setVariant:b}}function dA(i){const t=[];for(let a=-14;a<=14;a+=1)for(let o=-18;o<=18;o+=1){const c=(o+Math.abs(a)%2*.5)*.825,l=a*.715,u=Math.hypot(c,l);t.push({x:c,z:l,row:a,col:o,radius:u,angle:Math.atan2(l,c),accent:Math.sin(c*.8+l*.45)>.83})}return t.sort((a,o)=>a.radius-o.radius).slice(0,i)}function pA(){const i=new ri({depthWrite:!0,uniforms:{uTime:{value:0},uBass:{value:0},uBeat:{value:0},uEnergy:{value:0},uImpactOrigin:{value:new qt(0,0)},uImpactRadius:{value:0},uImpactStrength:{value:0},uMode:{value:0},uTint:{value:new kt(16777215)}},vertexShader:`
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
    `}),t=new Ue(new Ws(32,26,1,1),i);return t.rotation.x=-Math.PI/2,t.position.y=-.23,t}function mA(i,t=Math.random){const e=i.map(c=>c.id);let n=[],r=1/0;function s(c){r=c+12e3+Math.max(0,Math.min(1,t()))*8e3}function a(c,l){n=[l],s(c)}function o(c,l,u){if(c<r||l<=.72&&c<r+6e3)return null;const h=e.filter(g=>g!==u&&!n.includes(g)),f=h.length?h:e.filter(g=>g!==u);if(!f.length)return null;const d=f[Math.min(f.length-1,Math.floor(Math.max(0,t())*f.length))];return n=[...n,d].slice(-3),s(c),d}return{start:a,maybeNext:o}}const gA={},Ds={name:"Monad Testnet",nativeCurrency:"MON",paymentToken:"Testnet MON",chainId:"0x279f",visualMemoryContract:"0xD0793d7B3897A992ccc8f7188F5F2eE3AA21a590",rpcUrl:gA?.VITE_ALCHEMY_MONAD_RPC_URL||"https://testnet-rpc.monad.xyz",explorerUrl:"https://testnet.monadexplorer.com"};function yA(i){return{packName:"Personal Nano Identity Pack",price:(.05*Math.min(3,Math.max(1,Math.ceil(i.trim().length/120)))).toFixed(2),currency:Ds.paymentToken,promptHashPreview:xA(i)}}function xA(i){let t=2166136261;for(let e=0;e<i.length;e+=1)t^=i.charCodeAt(e),t=Math.imul(t,16777619);return`0x${(t>>>0).toString(16).padStart(8,"0")}`}const _A="6.17.0";function vA(i,t,e){const n=t.split("|").map(s=>s.trim());for(let s=0;s<n.length;s++)switch(t){case"any":return;case"bigint":case"boolean":case"number":case"string":if(typeof i===t)return}const r=new Error(`invalid value for type ${t}`);throw r.code="INVALID_ARGUMENT",r.argument=`value.${e}`,r.value=i,r}async function fn(i){const t=Object.keys(i);return(await Promise.all(t.map(n=>Promise.resolve(i[n])))).reduce((n,r,s)=>(n[t[s]]=r,n),{})}function Ft(i,t,e){for(let n in t){let r=t[n];const s=e?e[n]:null;s&&vA(r,s,n),Object.defineProperty(i,n,{enumerable:!0,value:r,writable:!1})}}function As(i,t){if(i==null)return"null";if(t==null&&(t=new Set),typeof i=="object"){if(t.has(i))return"[Circular]";t.add(i)}if(Array.isArray(i))return"[ "+i.map(e=>As(e,t)).join(", ")+" ]";if(i instanceof Uint8Array){const e="0123456789abcdef";let n="0x";for(let r=0;r<i.length;r++)n+=e[i[r]>>4],n+=e[i[r]&15];return n}if(typeof i=="object"&&typeof i.toJSON=="function")return As(i.toJSON(),t);switch(typeof i){case"boolean":case"number":case"symbol":return i.toString();case"bigint":return BigInt(i).toString();case"string":return JSON.stringify(i);case"object":{const e=Object.keys(i);return e.sort(),"{ "+e.map(n=>`${As(n,t)}: ${As(i[n],t)}`).join(", ")+" }"}}return"[ COULD NOT SERIALIZE ]"}function en(i,t){return i&&i.code===t}function vh(i){return en(i,"CALL_EXCEPTION")}function Re(i,t,e){let n=i;{const s=[];if(e){if("message"in e||"code"in e||"name"in e)throw new Error(`value will overwrite populated values: ${As(e)}`);for(const a in e){if(a==="shortMessage")continue;const o=e[a];s.push(a+"="+As(o))}}s.push(`code=${t}`),s.push(`version=${_A}`),s.length&&(i+=" ("+s.join(", ")+")")}let r;switch(t){case"INVALID_ARGUMENT":r=new TypeError(i);break;case"NUMERIC_FAULT":case"BUFFER_OVERRUN":r=new RangeError(i);break;default:r=new Error(i)}return Ft(r,{code:t}),e&&Object.assign(r,e),r.shortMessage==null&&Ft(r,{shortMessage:n}),r}function it(i,t,e,n){if(!i)throw Re(t,e,n)}function O(i,t,e,n){it(i,t,"INVALID_ARGUMENT",{argument:e,value:n})}function Am(i,t,e){e==null&&(e=""),e&&(e=": "+e),it(i>=t,"missing argument"+e,"MISSING_ARGUMENT",{count:i,expectedCount:t}),it(i<=t,"too many arguments"+e,"UNEXPECTED_ARGUMENT",{count:i,expectedCount:t})}["NFD","NFC","NFKD","NFKC"].reduce((i,t)=>{try{if("test".normalize(t)!=="test")throw new Error("bad");if(t==="NFD"&&"é".normalize("NFD")!=="é")throw new Error("broken");i.push(t)}catch{}return i},[]);function Fa(i,t,e){if(e==null&&(e=""),i!==t){let n=e,r="new";e&&(n+=".",r+=" "+e),it(!1,`private constructor; use ${n}from* methods`,"UNSUPPORTED_OPERATION",{operation:r})}}function Mm(i,t,e){if(i instanceof Uint8Array)return e?new Uint8Array(i):i;if(typeof i=="string"&&i.length%2===0&&i.match(/^0x[0-9a-f]*$/i)){const n=new Uint8Array((i.length-2)/2);let r=2;for(let s=0;s<n.length;s++)n[s]=parseInt(i.substring(r,r+2),16),r+=2;return n}O(!1,"invalid BytesLike value",t||"value",i)}function Zt(i,t){return Mm(i,t,!1)}function dn(i,t){return Mm(i,t,!0)}function be(i,t){return!(typeof i!="string"||!i.match(/^0x[0-9A-Fa-f]*$/)||typeof t=="number"&&i.length!==2+2*t||t===!0&&i.length%2!==0)}function bh(i){return be(i,!0)||i instanceof Uint8Array}const fd="0123456789abcdef";function _t(i){const t=Zt(i);let e="0x";for(let n=0;n<t.length;n++){const r=t[n];e+=fd[(r&240)>>4]+fd[r&15]}return e}function Pe(i){return"0x"+i.map(t=>_t(t).substring(2)).join("")}function Cs(i){return be(i,!0)?(i.length-2)/2:Zt(i).length}function De(i,t,e){const n=Zt(i);return e!=null&&e>n.length&&it(!1,"cannot slice beyond data bounds","BUFFER_OVERRUN",{buffer:n,length:n.length,offset:e}),_t(n.slice(t??0,e??n.length))}function Sm(i,t,e){const n=Zt(i);it(t>=n.length,"padding exceeds data length","BUFFER_OVERRUN",{buffer:new Uint8Array(n),length:t,offset:t+1});const r=new Uint8Array(t);return r.fill(0),e?r.set(n,t-n.length):r.set(n,0),_t(r)}function Gi(i,t){return Sm(i,t,!0)}function bA(i,t){return Sm(i,t,!1)}const Oa=BigInt(0),jn=BigInt(1),Ms=9007199254740991;function tc(i,t){const e=bc(i,"value"),n=BigInt(Xt(t,"width"));if(it(e>>n===Oa,"overflow","NUMERIC_FAULT",{operation:"fromTwos",fault:"overflow",value:i}),e>>n-jn){const r=(jn<<n)-jn;return-((~e&r)+jn)}return e}function Em(i,t){let e=bt(i,"value");const n=BigInt(Xt(t,"width")),r=jn<<n-jn;if(e<Oa){e=-e,it(e<=r,"too low","NUMERIC_FAULT",{operation:"toTwos",fault:"overflow",value:i});const s=(jn<<n)-jn;return(~e&s)+jn}else it(e<r,"too high","NUMERIC_FAULT",{operation:"toTwos",fault:"overflow",value:i});return e}function Ir(i,t){const e=bc(i,"value"),n=BigInt(Xt(t,"bits"));return e&(jn<<n)-jn}function bt(i,t){switch(typeof i){case"bigint":return i;case"number":return O(Number.isInteger(i),"underflow",t||"value",i),O(i>=-Ms&&i<=Ms,"overflow",t||"value",i),BigInt(i);case"string":try{if(i==="")throw new Error("empty string");return i[0]==="-"&&i[1]!=="-"?-BigInt(i.substring(1)):BigInt(i)}catch(e){O(!1,`invalid BigNumberish string: ${e.message}`,t||"value",i)}}O(!1,"invalid BigNumberish value",t||"value",i)}function bc(i,t){const e=bt(i,t);return it(e>=Oa,"unsigned value cannot be negative","NUMERIC_FAULT",{fault:"overflow",operation:"getUint",value:i}),e}const dd="0123456789abcdef";function wc(i){if(i instanceof Uint8Array){let t="0x0";for(const e of i)t+=dd[e>>4],t+=dd[e&15];return BigInt(t)}return bt(i)}function Xt(i,t){switch(typeof i){case"bigint":return O(i>=-Ms&&i<=Ms,"overflow",t||"value",i),Number(i);case"number":return O(Number.isInteger(i),"underflow",t||"value",i),O(i>=-Ms&&i<=Ms,"overflow",t||"value",i),i;case"string":try{if(i==="")throw new Error("empty string");return Xt(BigInt(i),t)}catch(e){O(!1,`invalid numeric string: ${e.message}`,t||"value",i)}}O(!1,"invalid numeric value",t||"value",i)}function wA(i){return Xt(wc(i))}function fr(i,t){const e=bc(i,"value");let n=e.toString(16);if(t==null)n.length%2&&(n="0"+n);else{const r=Xt(t,"width");if(r===0&&e===Oa)return"0x";for(it(r*2>=n.length,`value exceeds width (${r} bytes)`,"NUMERIC_FAULT",{operation:"toBeHex",fault:"overflow",value:i});n.length<r*2;)n="0"+n}return"0x"+n}function qe(i,t){const e=bc(i,"value");if(e===Oa)return new Uint8Array(0);let n=e.toString(16);n.length%2&&(n="0"+n);const r=new Uint8Array(n.length/2);for(let s=0;s<r.length;s++){const a=s*2;r[s]=parseInt(n.substring(a,a+2),16)}return r}function Zn(i){let t=_t(bh(i)?i:qe(i)).substring(2);for(;t.startsWith("0");)t=t.substring(1);return t===""&&(t="0"),"0x"+t}const pd="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";BigInt(0);const md=BigInt(58);function AA(i){const t=Zt(i);let e=wc(t),n="";for(;e;)n=pd[Number(e%md)]+n,e/=md;for(let r=0;r<t.length&&!t[r];r++)n=pd[0]+n;return n}function MA(i){i=atob(i);const t=new Uint8Array(i.length);for(let e=0;e<i.length;e++)t[e]=i.charCodeAt(e);return Zt(t)}function SA(i){const t=Zt(i);let e="";for(let n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return btoa(e)}class Tm{filter;emitter;#t;constructor(t,e,n){this.#t=e,Ft(this,{emitter:t,filter:n})}async removeListener(){this.#t!=null&&await this.emitter.off(this.filter,this.#t)}}function EA(i,t,e,n,r){O(!1,`invalid codepoint at offset ${t}; ${i}`,"bytes",e)}function Cm(i,t,e,n,r){if(i==="BAD_PREFIX"||i==="UNEXPECTED_CONTINUE"){let s=0;for(let a=t+1;a<e.length&&e[a]>>6===2;a++)s++;return s}return i==="OVERRUN"?e.length-t-1:0}function TA(i,t,e,n,r){return i==="OVERLONG"?(O(typeof r=="number","invalid bad code point for replacement","badCodepoint",r),n.push(r),0):(n.push(65533),Cm(i,t,e))}const CA=Object.freeze({error:EA,ignore:Cm,replace:TA});function RA(i,t){t==null&&(t=CA.error);const e=Zt(i,"bytes"),n=[];let r=0;for(;r<e.length;){const s=e[r++];if(s>>7===0){n.push(s);continue}let a=null,o=null;if((s&224)===192)a=1,o=127;else if((s&240)===224)a=2,o=2047;else if((s&248)===240)a=3,o=65535;else{(s&192)===128?r+=t("UNEXPECTED_CONTINUE",r-1,e,n):r+=t("BAD_PREFIX",r-1,e,n);continue}if(r-1+a>=e.length){r+=t("OVERRUN",r-1,e,n);continue}let c=s&(1<<8-a-1)-1;for(let l=0;l<a;l++){let u=e[r];if((u&192)!=128){r+=t("MISSING_CONTINUE",r,e,n),c=null;break}c=c<<6|u&63,r++}if(c!==null){if(c>1114111){r+=t("OUT_OF_RANGE",r-1-a,e,n,c);continue}if(c>=55296&&c<=57343){r+=t("UTF16_SURROGATE",r-1-a,e,n,c);continue}if(c<=o){r+=t("OVERLONG",r-1-a,e,n,c);continue}n.push(c)}}return n}function ii(i,t){O(typeof i=="string","invalid string value","str",i);let e=[];for(let n=0;n<i.length;n++){const r=i.charCodeAt(n);if(r<128)e.push(r);else if(r<2048)e.push(r>>6|192),e.push(r&63|128);else if((r&64512)==55296){n++;const s=i.charCodeAt(n);O(n<i.length&&(s&64512)===56320,"invalid surrogate pair","str",i);const a=65536+((r&1023)<<10)+(s&1023);e.push(a>>18|240),e.push(a>>12&63|128),e.push(a>>6&63|128),e.push(a&63|128)}else e.push(r>>12|224),e.push(r>>6&63|128),e.push(r&63|128)}return new Uint8Array(e)}function PA(i){return i.map(t=>t<=65535?String.fromCharCode(t):(t-=65536,String.fromCharCode((t>>10&1023)+55296,(t&1023)+56320))).join("")}function ec(i,t){return PA(RA(i,t))}function Rm(i){async function t(e,n){it(n==null||!n.cancelled,"request cancelled before sending","CANCELLED");const r=e.url.split(":")[0].toLowerCase();it(r==="http"||r==="https",`unsupported protocol ${r}`,"UNSUPPORTED_OPERATION",{info:{protocol:r},operation:"request"}),it(r==="https"||!e.credentials||e.allowInsecureAuthentication,"insecure authorized connections unsupported","UNSUPPORTED_OPERATION",{operation:"request"});let s=null;const a=new AbortController,o=setTimeout(()=>{s=Re("request timeout","TIMEOUT"),a.abort()},e.timeout);n&&n.addListener(()=>{s=Re("request cancelled","CANCELLED"),a.abort()});const c=Object.assign({},i,{method:e.method,headers:new Headers(Array.from(e)),body:e.body||void 0,signal:a.signal});let l;try{l=await fetch(e.url,c)}catch(d){throw clearTimeout(o),s||d}clearTimeout(o);const u={};l.headers.forEach((d,g)=>{u[g.toLowerCase()]=d});const h=await l.arrayBuffer(),f=h==null?null:new Uint8Array(h);return{statusCode:l.status,statusMessage:l.statusText,headers:u,body:f}}return t}const IA=12,NA=250;let gd=Rm();const LA=new RegExp("^data:([^;:]*)?(;base64)?,(.*)$","i"),UA=new RegExp("^ipfs://(ipfs/)?(.*)$","i");let _l=!1;async function Pm(i,t){try{const e=i.match(LA);if(!e)throw new Error("invalid data");return new ur(200,"OK",{"content-type":e[1]||"text/plain"},e[2]?MA(e[3]):FA(e[3]))}catch{return new ur(599,"BAD REQUEST (invalid data: URI)",{},null,new Hi(i))}}function Im(i){async function t(e,n){try{const r=e.match(UA);if(!r)throw new Error("invalid link");return new Hi(`${i}${r[2]}`)}catch{return new ur(599,"BAD REQUEST (invalid IPFS URI)",{},null,new Hi(e))}}return t}const vo={data:Pm,ipfs:Im("https://gateway.ipfs.io/ipfs/")},Nm=new WeakMap;class DA{#t;#e;constructor(t){this.#t=[],this.#e=!1,Nm.set(t,()=>{if(!this.#e){this.#e=!0;for(const e of this.#t)setTimeout(()=>{e()},0);this.#t=[]}})}addListener(t){it(!this.#e,"singal already cancelled","UNSUPPORTED_OPERATION",{operation:"fetchCancelSignal.addCancelListener"}),this.#t.push(t)}get cancelled(){return this.#e}checkSignal(){it(!this.cancelled,"cancelled","CANCELLED",{})}}function bo(i){if(i==null)throw new Error("missing signal; should not happen");return i.checkSignal(),i}class Hi{#t;#e;#n;#i;#r;#a;#s;#o;#f;#l;#m;#p;#d;#u;#h;get url(){return this.#a}set url(t){this.#a=String(t)}get body(){return this.#s==null?null:new Uint8Array(this.#s)}set body(t){if(t==null)this.#s=void 0,this.#o=void 0;else if(typeof t=="string")this.#s=ii(t),this.#o="text/plain";else if(t instanceof Uint8Array)this.#s=t,this.#o="application/octet-stream";else if(typeof t=="object")this.#s=ii(JSON.stringify(t)),this.#o="application/json";else throw new Error("invalid body")}hasBody(){return this.#s!=null}get method(){return this.#i?this.#i:this.hasBody()?"POST":"GET"}set method(t){t==null&&(t=""),this.#i=String(t).toUpperCase()}get headers(){const t=Object.assign({},this.#n);return this.#f&&(t.authorization=`Basic ${SA(ii(this.#f))}`),this.allowGzip&&(t["accept-encoding"]="gzip"),t["content-type"]==null&&this.#o&&(t["content-type"]=this.#o),this.body&&(t["content-length"]=String(this.body.length)),t}getHeader(t){return this.headers[t.toLowerCase()]}setHeader(t,e){this.#n[String(t).toLowerCase()]=String(e)}clearHeaders(){this.#n={}}[Symbol.iterator](){const t=this.headers,e=Object.keys(t);let n=0;return{next:()=>{if(n<e.length){const r=e[n++];return{value:[r,t[r]],done:!1}}return{value:void 0,done:!0}}}}get credentials(){return this.#f||null}setCredentials(t,e){O(!t.match(/:/),"invalid basic authentication username","username","[REDACTED]"),this.#f=`${t}:${e}`}get allowGzip(){return this.#e}set allowGzip(t){this.#e=!!t}get allowInsecureAuthentication(){return!!this.#t}set allowInsecureAuthentication(t){this.#t=!!t}get timeout(){return this.#r}set timeout(t){O(t>=0,"timeout must be non-zero","timeout",t),this.#r=t}get preflightFunc(){return this.#l||null}set preflightFunc(t){this.#l=t}get processFunc(){return this.#m||null}set processFunc(t){this.#m=t}get retryFunc(){return this.#p||null}set retryFunc(t){this.#p=t}get getUrlFunc(){return this.#h||gd}set getUrlFunc(t){this.#h=t}constructor(t){this.#a=String(t),this.#t=!1,this.#e=!0,this.#n={},this.#i="",this.#r=3e5,this.#u={slotInterval:NA,maxAttempts:IA},this.#h=null}toString(){return`<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${this.#s?_t(this.#s):"null"}>`}setThrottleParams(t){t.slotInterval!=null&&(this.#u.slotInterval=t.slotInterval),t.maxAttempts!=null&&(this.#u.maxAttempts=t.maxAttempts)}async#c(t,e,n,r,s){if(t>=this.#u.maxAttempts)return s.makeServerError("exceeded maximum retry limit");it(yd()<=e,"timeout","TIMEOUT",{operation:"request.send",reason:"timeout",request:r}),n>0&&await OA(n);let a=this.clone();const o=(a.url.split(":")[0]||"").toLowerCase();if(o in vo){const u=await vo[o](a.url,bo(r.#d));if(u instanceof ur){let h=u;if(this.processFunc){bo(r.#d);try{h=await this.processFunc(a,h)}catch(f){(f.throttle==null||typeof f.stall!="number")&&h.makeServerError("error in post-processing function",f).assertOk()}}return h}a=u}this.preflightFunc&&(a=await this.preflightFunc(a));const c=await this.getUrlFunc(a,bo(r.#d));let l=new ur(c.statusCode,c.statusMessage,c.headers,c.body,r);if([301,302,307,308].indexOf(l.statusCode)>=0){try{const u=l.headers.location||"";return a.redirect(u).#c(t+1,e,0,r,l)}catch{}return l}else if(l.statusCode===429&&(this.retryFunc==null||await this.retryFunc(a,l,t))){const u=l.headers["retry-after"];let h=this.#u.slotInterval*Math.trunc(Math.random()*Math.pow(2,t));return typeof u=="string"&&u.match(/^[1-9][0-9]*$/)&&(h=parseInt(u)),a.clone().#c(t+1,e,h,r,l)}if(this.processFunc){bo(r.#d);try{l=await this.processFunc(a,l)}catch(u){(u.throttle==null||typeof u.stall!="number")&&l.makeServerError("error in post-processing function",u).assertOk();let h=this.#u.slotInterval*Math.trunc(Math.random()*Math.pow(2,t));return u.stall>=0&&(h=u.stall),a.clone().#c(t+1,e,h,r,l)}}return l}send(){return it(this.#d==null,"request already sent","UNSUPPORTED_OPERATION",{operation:"fetchRequest.send"}),this.#d=new DA(this),this.#c(0,yd()+this.timeout,0,this,new ur(0,"",{},null,this))}cancel(){it(this.#d!=null,"request has not been sent","UNSUPPORTED_OPERATION",{operation:"fetchRequest.cancel"});const t=Nm.get(this);if(!t)throw new Error("missing signal; should not happen");t()}redirect(t){const e=this.url.split(":")[0].toLowerCase(),n=t.split(":")[0].toLowerCase();it((e!=="https"||n!=="http")&&t.match(/^https?:/),"unsupported redirect","UNSUPPORTED_OPERATION",{operation:`redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(t)})`});const r=new Hi(t);return r.method=this.method,r.allowGzip=this.allowGzip,r.timeout=this.timeout,r.#n=Object.assign({},this.#n),this.#s&&(r.#s=new Uint8Array(this.#s)),r.#o=this.#o,r}clone(){const t=new Hi(this.url);return t.#i=this.#i,this.#s&&(t.#s=this.#s),t.#o=this.#o,t.#n=Object.assign({},this.#n),t.#f=this.#f,this.allowGzip&&(t.allowGzip=!0),t.timeout=this.timeout,this.allowInsecureAuthentication&&(t.allowInsecureAuthentication=!0),t.#l=this.#l,t.#m=this.#m,t.#p=this.#p,t.#u=Object.assign({},this.#u),t.#h=this.#h,t}static lockConfig(){_l=!0}static getGateway(t){return vo[t.toLowerCase()]||null}static registerGateway(t,e){if(t=t.toLowerCase(),t==="http"||t==="https")throw new Error(`cannot intercept ${t}; use registerGetUrl`);if(_l)throw new Error("gateways locked");vo[t]=e}static registerGetUrl(t){if(_l)throw new Error("gateways locked");gd=t}static createGetUrlFunc(t){return Rm(t)}static createDataGateway(){return Pm}static createIpfsGatewayFunc(t){return Im(t)}}class ur{#t;#e;#n;#i;#r;#a;toString(){return`<FetchResponse status=${this.statusCode} body=${this.#i?_t(this.#i):"null"}>`}get statusCode(){return this.#t}get statusMessage(){return this.#e}get headers(){return Object.assign({},this.#n)}get body(){return this.#i==null?null:new Uint8Array(this.#i)}get bodyText(){try{return this.#i==null?"":ec(this.#i)}catch{it(!1,"response body is not valid UTF-8 data","UNSUPPORTED_OPERATION",{operation:"bodyText",info:{response:this}})}}get bodyJson(){try{return JSON.parse(this.bodyText)}catch{it(!1,"response body is not valid JSON","UNSUPPORTED_OPERATION",{operation:"bodyJson",info:{response:this}})}}[Symbol.iterator](){const t=this.headers,e=Object.keys(t);let n=0;return{next:()=>{if(n<e.length){const r=e[n++];return{value:[r,t[r]],done:!1}}return{value:void 0,done:!0}}}}constructor(t,e,n,r,s){this.#t=t,this.#e=e,this.#n=Object.keys(n).reduce((a,o)=>(a[o.toLowerCase()]=String(n[o]),a),{}),this.#i=r==null?null:new Uint8Array(r),this.#r=s||null,this.#a={message:""}}makeServerError(t,e){let n;t?n=`CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${t})`:(t=`${this.statusCode} ${this.statusMessage}`,n=`CLIENT ESCALATED SERVER ERROR (${t})`);const r=new ur(599,n,this.headers,this.body,this.#r||void 0);return r.#a={message:t,error:e},r}throwThrottleError(t,e){e==null?e=-1:O(Number.isInteger(e)&&e>=0,"invalid stall timeout","stall",e);const n=new Error(t||"throttling requests");throw Ft(n,{stall:e,throttle:!0}),n}getHeader(t){return this.headers[t.toLowerCase()]}hasBody(){return this.#i!=null}get request(){return this.#r}ok(){return this.#a.message===""&&this.statusCode>=200&&this.statusCode<300}assertOk(){if(this.ok())return;let{message:t,error:e}=this.#a;t===""&&(t=`server response ${this.statusCode} ${this.statusMessage}`);let n=null;this.request&&(n=this.request.url);let r=null;try{this.#i&&(r=ec(this.#i))}catch{}it(!1,t,"SERVER_ERROR",{request:this.request||"unknown request",response:this,error:e,info:{requestUrl:n,responseBody:r,responseStatus:`${this.statusCode} ${this.statusMessage}`}})}}function yd(){return new Date().getTime()}function FA(i){return ii(i.replace(/%([0-9a-f][0-9a-f])/gi,(t,e)=>String.fromCharCode(parseInt(e,16))))}function OA(i){return new Promise(t=>setTimeout(t,i))}const BA=BigInt(-1),Yn=BigInt(0),Ss=BigInt(1),kA=BigInt(5),xs={};let Rs="0000";for(;Rs.length<80;)Rs+=Rs;function br(i){let t=Rs;for(;t.length<i;)t+=t;return BigInt("1"+t.substring(0,i))}function ra(i,t,e){const n=BigInt(t.width);if(t.signed){const r=Ss<<n-Ss;it(e==null||i>=-r&&i<r,"overflow","NUMERIC_FAULT",{operation:e,fault:"overflow",value:i}),i>Yn?i=tc(Ir(i,n),n):i=-tc(Ir(-i,n),n)}else{const r=Ss<<n;it(e==null||i>=0&&i<r,"overflow","NUMERIC_FAULT",{operation:e,fault:"overflow",value:i}),i=(i%r+r)%r&r-Ss}return i}function vl(i){typeof i=="number"&&(i=`fixed128x${i}`);let t=!0,e=128,n=18;if(typeof i=="string"){if(i!=="fixed")if(i==="ufixed")t=!1;else{const s=i.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);O(s,"invalid fixed format","format",i),t=s[1]!=="u",e=parseInt(s[2]),n=parseInt(s[3])}}else if(i){const s=i,a=(o,c,l)=>s[o]==null?l:(O(typeof s[o]===c,"invalid fixed format ("+o+" not "+c+")","format."+o,s[o]),s[o]);t=a("signed","boolean",t),e=a("width","number",e),n=a("decimals","number",n)}O(e%8===0,"invalid FixedNumber width (not byte aligned)","format.width",e),O(n<=80,"invalid FixedNumber decimals (too large)","format.decimals",n);const r=(t?"":"u")+"fixed"+String(e)+"x"+String(n);return{signed:t,width:e,decimals:n,name:r}}function GA(i,t){let e="";i<Yn&&(e="-",i*=BA);let n=i.toString();if(t===0)return e+n;for(;n.length<=t;)n=Rs+n;const r=n.length-t;for(n=n.substring(0,r)+"."+n.substring(r);n[0]==="0"&&n[1]!==".";)n=n.substring(1);for(;n[n.length-1]==="0"&&n[n.length-2]!==".";)n=n.substring(0,n.length-1);return e+n}class cr{format;#t;#e;#n;_value;constructor(t,e,n){Fa(t,xs,"FixedNumber"),this.#e=e,this.#t=n;const r=GA(e,n.decimals);Ft(this,{format:n.name,_value:r}),this.#n=br(n.decimals)}get signed(){return this.#t.signed}get width(){return this.#t.width}get decimals(){return this.#t.decimals}get value(){return this.#e}#i(t){O(this.format===t.format,"incompatible format; use fixedNumber.toFormat","other",t)}#r(t,e){return t=ra(t,this.#t,e),new cr(xs,t,this.#t)}#a(t,e){return this.#i(t),this.#r(this.#e+t.#e,e)}addUnsafe(t){return this.#a(t)}add(t){return this.#a(t,"add")}#s(t,e){return this.#i(t),this.#r(this.#e-t.#e,e)}subUnsafe(t){return this.#s(t)}sub(t){return this.#s(t,"sub")}#o(t,e){return this.#i(t),this.#r(this.#e*t.#e/this.#n,e)}mulUnsafe(t){return this.#o(t)}mul(t){return this.#o(t,"mul")}mulSignal(t){this.#i(t);const e=this.#e*t.#e;return it(e%this.#n===Yn,"precision lost during signalling mul","NUMERIC_FAULT",{operation:"mulSignal",fault:"underflow",value:this}),this.#r(e/this.#n,"mulSignal")}#f(t,e){return it(t.#e!==Yn,"division by zero","NUMERIC_FAULT",{operation:"div",fault:"divide-by-zero",value:this}),this.#i(t),this.#r(this.#e*this.#n/t.#e,e)}divUnsafe(t){return this.#f(t)}div(t){return this.#f(t,"div")}divSignal(t){it(t.#e!==Yn,"division by zero","NUMERIC_FAULT",{operation:"div",fault:"divide-by-zero",value:this}),this.#i(t);const e=this.#e*this.#n;return it(e%t.#e===Yn,"precision lost during signalling div","NUMERIC_FAULT",{operation:"divSignal",fault:"underflow",value:this}),this.#r(e/t.#e,"divSignal")}cmp(t){let e=this.value,n=t.value;const r=this.decimals-t.decimals;return r>0?n*=br(r):r<0&&(e*=br(-r)),e<n?-1:e>n?1:0}eq(t){return this.cmp(t)===0}lt(t){return this.cmp(t)<0}lte(t){return this.cmp(t)<=0}gt(t){return this.cmp(t)>0}gte(t){return this.cmp(t)>=0}floor(){let t=this.#e;return this.#e<Yn&&(t-=this.#n-Ss),t=this.#e/this.#n*this.#n,this.#r(t,"floor")}ceiling(){let t=this.#e;return this.#e>Yn&&(t+=this.#n-Ss),t=this.#e/this.#n*this.#n,this.#r(t,"ceiling")}round(t){if(t==null&&(t=0),t>=this.decimals)return this;const e=this.decimals-t,n=kA*br(e-1);let r=this.value+n;const s=br(e);return r=r/s*s,ra(r,this.#t,"round"),new cr(xs,r,this.#t)}isZero(){return this.#e===Yn}isNegative(){return this.#e<Yn}toString(){return this._value}toUnsafeFloat(){return parseFloat(this.toString())}toFormat(t){return cr.fromString(this.toString(),t)}static fromValue(t,e,n){const r=e==null?0:Xt(e),s=vl(n);let a=bt(t,"value");const o=r-s.decimals;if(o>0){const c=br(o);it(a%c===Yn,"value loses precision for format","NUMERIC_FAULT",{operation:"fromValue",fault:"underflow",value:t}),a/=c}else o<0&&(a*=br(-o));return ra(a,s,"fromValue"),new cr(xs,a,s)}static fromString(t,e){const n=t.match(/^(-?)([0-9]*)\.?([0-9]*)$/);O(n&&n[2].length+n[3].length>0,"invalid FixedNumber string value","value",t);const r=vl(e);let s=n[2]||"0",a=n[3]||"";for(;a.length<r.decimals;)a+=Rs;it(a.substring(r.decimals).match(/^0*$/),"too many decimals for format","NUMERIC_FAULT",{operation:"fromString",fault:"underflow",value:t}),a=a.substring(0,r.decimals);const o=BigInt(n[1]+s+a);return ra(o,r,"fromString"),new cr(xs,o,r)}static fromBytes(t,e){let n=wc(Zt(t,"value"));const r=vl(e);return r.signed&&(n=tc(n,r.width)),ra(n,r,"fromBytes"),new cr(xs,n,r)}}function HA(i){let t=i.toString(16);for(;t.length<2;)t="0"+t;return"0x"+t}function xd(i,t,e){let n=0;for(let r=0;r<e;r++)n=n*256+i[t+r];return n}function _d(i,t,e,n){const r=[];for(;e<t+1+n;){const s=Lm(i,e);r.push(s.result),e+=s.consumed,it(e<=t+1+n,"child data too short","BUFFER_OVERRUN",{buffer:i,length:n,offset:t})}return{consumed:1+n,result:r}}function Lm(i,t){it(i.length!==0,"data too short","BUFFER_OVERRUN",{buffer:i,length:0,offset:1});const e=n=>{it(n<=i.length,"data short segment too short","BUFFER_OVERRUN",{buffer:i,length:i.length,offset:n})};if(i[t]>=248){const n=i[t]-247;e(t+1+n);const r=xd(i,t+1,n);return e(t+1+n+r),_d(i,t,t+1+n,n+r)}else if(i[t]>=192){const n=i[t]-192;return e(t+1+n),_d(i,t,t+1,n)}else if(i[t]>=184){const n=i[t]-183;e(t+1+n);const r=xd(i,t+1,n);e(t+1+n+r);const s=_t(i.slice(t+1+n,t+1+n+r));return{consumed:1+n+r,result:s}}else if(i[t]>=128){const n=i[t]-128;e(t+1+n);const r=_t(i.slice(t+1,t+1+n));return{consumed:1+n,result:r}}return{consumed:1,result:HA(i[t])}}function Ba(i){const t=Zt(i,"data"),e=Lm(t,0);return O(e.consumed===t.length,"unexpected junk after rlp payload","data",i),e.result}function vd(i){const t=[];for(;i;)t.unshift(i&255),i>>=8;return t}function Um(i){if(Array.isArray(i)){let n=[];if(i.forEach(function(s){n=n.concat(Um(s))}),n.length<=55)return n.unshift(192+n.length),n;const r=vd(n.length);return r.unshift(247+r.length),r.concat(n)}const t=Array.prototype.slice.call(Zt(i,"object"));if(t.length===1&&t[0]<=127)return t;if(t.length<=55)return t.unshift(128+t.length),t;const e=vd(t.length);return e.unshift(183+e.length),e.concat(t)}const bd="0123456789abcdef";function Fi(i){let t="0x";for(const e of Um(i))t+=bd[e>>4],t+=bd[e&15];return t}function zA(i,t){let e=18;return e=Xt(t,"unit"),cr.fromValue(i,e,{decimals:e,width:512}).toString()}function Dm(i){return zA(i,18)}const mn=32,Pu=new Uint8Array(mn),VA=["then"],wo={},Fm=new WeakMap;function Sr(i){return Fm.get(i)}function wd(i,t){Fm.set(i,t)}function sa(i,t){const e=new Error(`deferred error during ABI decoding triggered accessing ${i}`);throw e.error=t,e}function Iu(i,t,e){return i.indexOf(null)>=0?t.map((n,r)=>n instanceof Ni?Iu(Sr(n),n,e):n):i.reduce((n,r,s)=>{let a=t.getValue(r);return r in n||(e&&a instanceof Ni&&(a=Iu(Sr(a),a,e)),n[r]=a),n},{})}class Ni extends Array{#t;constructor(...t){const e=t[0];let n=t[1],r=(t[2]||[]).slice(),s=!0;e!==wo&&(n=t,r=[],s=!1),super(n.length),n.forEach((c,l)=>{this[l]=c});const a=r.reduce((c,l)=>(typeof l=="string"&&c.set(l,(c.get(l)||0)+1),c),new Map);if(wd(this,Object.freeze(n.map((c,l)=>{const u=r[l];return u!=null&&a.get(u)===1?u:null}))),this.#t=[],this.#t==null&&this.#t,!s)return;Object.freeze(this);const o=new Proxy(this,{get:(c,l,u)=>{if(typeof l=="string"){if(l.match(/^[0-9]+$/)){const f=Xt(l,"%index");if(f<0||f>=this.length)throw new RangeError("out of result range");const d=c[f];return d instanceof Error&&sa(`index ${f}`,d),d}if(VA.indexOf(l)>=0)return Reflect.get(c,l,u);const h=c[l];if(h instanceof Function)return function(...f){return h.apply(this===u?c:this,f)};if(!(l in c))return c.getValue.apply(this===u?c:this,[l])}return Reflect.get(c,l,u)}});return wd(o,Sr(this)),o}toArray(t){const e=[];return this.forEach((n,r)=>{n instanceof Error&&sa(`index ${r}`,n),t&&n instanceof Ni&&(n=n.toArray(t)),e.push(n)}),e}toObject(t){const e=Sr(this);return e.reduce((n,r,s)=>(it(r!=null,`value at index ${s} unnamed`,"UNSUPPORTED_OPERATION",{operation:"toObject()"}),Iu(e,this,t)),{})}slice(t,e){t==null&&(t=0),t<0&&(t+=this.length,t<0&&(t=0)),e==null&&(e=this.length),e<0&&(e+=this.length,e<0&&(e=0)),e>this.length&&(e=this.length);const n=Sr(this),r=[],s=[];for(let a=t;a<e;a++)r.push(this[a]),s.push(n[a]);return new Ni(wo,r,s)}filter(t,e){const n=Sr(this),r=[],s=[];for(let a=0;a<this.length;a++){const o=this[a];o instanceof Error&&sa(`index ${a}`,o),t.call(e,o,a,this)&&(r.push(o),s.push(n[a]))}return new Ni(wo,r,s)}map(t,e){const n=[];for(let r=0;r<this.length;r++){const s=this[r];s instanceof Error&&sa(`index ${r}`,s),n.push(t.call(e,s,r,this))}return n}getValue(t){const e=Sr(this).indexOf(t);if(e===-1)return;const n=this[e];return n instanceof Error&&sa(`property ${JSON.stringify(t)}`,n.error),n}static fromItems(t,e){return new Ni(wo,t,e)}}function Ad(i){let t=qe(i);return it(t.length<=mn,"value out-of-bounds","BUFFER_OVERRUN",{buffer:t,length:mn,offset:t.length}),t.length!==mn&&(t=dn(Pe([Pu.slice(t.length%mn),t]))),t}class Xi{name;type;localName;dynamic;constructor(t,e,n,r){Ft(this,{name:t,type:e,localName:n,dynamic:r},{name:"string",type:"string",localName:"string",dynamic:"boolean"})}_throwError(t,e){O(!1,t,this.localName,e)}}class Nu{#t;#e;constructor(){this.#t=[],this.#e=0}get data(){return Pe(this.#t)}get length(){return this.#e}#n(t){return this.#t.push(t),this.#e+=t.length,t.length}appendWriter(t){return this.#n(dn(t.data))}writeBytes(t){let e=dn(t);const n=e.length%mn;return n&&(e=dn(Pe([e,Pu.slice(n)]))),this.#n(e)}writeValue(t){return this.#n(Ad(t))}writeUpdatableValue(){const t=this.#t.length;return this.#t.push(Pu),this.#e+=mn,e=>{this.#t[t]=Ad(e)}}}class wh{allowLoose;#t;#e;#n;#i;#r;constructor(t,e,n){Ft(this,{allowLoose:!!e}),this.#t=dn(t),this.#n=0,this.#i=null,this.#r=n??1024,this.#e=0}get data(){return _t(this.#t)}get dataLength(){return this.#t.length}get consumed(){return this.#e}get bytes(){return new Uint8Array(this.#t)}#a(t){if(this.#i)return this.#i.#a(t);this.#n+=t,it(this.#r<1||this.#n<=this.#r*this.dataLength,`compressed ABI data exceeds inflation ratio of ${this.#r} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`,"BUFFER_OVERRUN",{buffer:dn(this.#t),offset:this.#e,length:t,info:{bytesRead:this.#n,dataLength:this.dataLength}})}#s(t,e,n){let r=Math.ceil(e/mn)*mn;return this.#e+r>this.#t.length&&(this.allowLoose&&n&&this.#e+e<=this.#t.length?r=e:it(!1,"data out-of-bounds","BUFFER_OVERRUN",{buffer:dn(this.#t),length:this.#t.length,offset:this.#e+r})),this.#t.slice(this.#e,this.#e+r)}subReader(t){const e=new wh(this.#t.slice(this.#e+t),this.allowLoose,this.#r);return e.#i=this,e}readBytes(t,e){let n=this.#s(0,t,!!e);return this.#a(t),this.#e+=n.length,n.slice(0,t)}readValue(){return wc(this.readBytes(mn))}readIndex(){return wA(this.readBytes(mn))}}function nc(i){if(!Number.isSafeInteger(i)||i<0)throw new Error(`Wrong positive integer: ${i}`)}function Ah(i,...t){if(!(i instanceof Uint8Array))throw new Error("Expected Uint8Array");if(t.length>0&&!t.includes(i.length))throw new Error(`Expected Uint8Array of length ${t}, not of length=${i.length}`)}function WA(i){if(typeof i!="function"||typeof i.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");nc(i.outputLen),nc(i.blockLen)}function Fs(i,t=!0){if(i.destroyed)throw new Error("Hash instance has been destroyed");if(t&&i.finished)throw new Error("Hash#digest() has already been called")}function Om(i,t){Ah(i);const e=t.outputLen;if(i.length<e)throw new Error(`digestInto() expects output buffer of length at least ${e}`)}const bl=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0;const Bm=i=>i instanceof Uint8Array,XA=i=>new Uint32Array(i.buffer,i.byteOffset,Math.floor(i.byteLength/4)),wl=i=>new DataView(i.buffer,i.byteOffset,i.byteLength),ui=(i,t)=>i<<32-t|i>>>t,qA=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;if(!qA)throw new Error("Non little-endian hardware is not supported");function KA(i){if(typeof i!="string")throw new Error(`utf8ToBytes expected string, got ${typeof i}`);return new Uint8Array(new TextEncoder().encode(i))}function Ac(i){if(typeof i=="string"&&(i=KA(i)),!Bm(i))throw new Error(`expected Uint8Array, got ${typeof i}`);return i}function YA(...i){const t=new Uint8Array(i.reduce((n,r)=>n+r.length,0));let e=0;return i.forEach(n=>{if(!Bm(n))throw new Error("Uint8Array expected");t.set(n,e),e+=n.length}),t}class Mh{clone(){return this._cloneInto()}}function Sh(i){const t=n=>i().update(Ac(n)).digest(),e=i();return t.outputLen=e.outputLen,t.blockLen=e.blockLen,t.create=()=>i(),t}function JA(i=32){if(bl&&typeof bl.getRandomValues=="function")return bl.getRandomValues(new Uint8Array(i));throw new Error("crypto.getRandomValues must be defined")}class km extends Mh{constructor(t,e){super(),this.finished=!1,this.destroyed=!1,WA(t);const n=Ac(e);if(this.iHash=t.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const r=this.blockLen,s=new Uint8Array(r);s.set(n.length>r?t.create().update(n).digest():n);for(let a=0;a<s.length;a++)s[a]^=54;this.iHash.update(s),this.oHash=t.create();for(let a=0;a<s.length;a++)s[a]^=106;this.oHash.update(s),s.fill(0)}update(t){return Fs(this),this.iHash.update(t),this}digestInto(t){Fs(this),Ah(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:n,finished:r,destroyed:s,blockLen:a,outputLen:o}=this;return t=t,t.finished=r,t.destroyed=s,t.blockLen=a,t.outputLen=o,t.oHash=e._cloneInto(t.oHash),t.iHash=n._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const Gm=(i,t,e)=>new km(i,t).update(e).digest();Gm.create=(i,t)=>new km(i,t);function QA(i,t,e,n){if(typeof i.setBigUint64=="function")return i.setBigUint64(t,e,n);const r=BigInt(32),s=BigInt(4294967295),a=Number(e>>r&s),o=Number(e&s),c=n?4:0,l=n?0:4;i.setUint32(t+c,a,n),i.setUint32(t+l,o,n)}class Hm extends Mh{constructor(t,e,n,r){super(),this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=r,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(t),this.view=wl(this.buffer)}update(t){Fs(this);const{view:e,buffer:n,blockLen:r}=this;t=Ac(t);const s=t.length;for(let a=0;a<s;){const o=Math.min(r-this.pos,s-a);if(o===r){const c=wl(t);for(;r<=s-a;a+=r)this.process(c,a);continue}n.set(t.subarray(a,a+o),this.pos),this.pos+=o,a+=o,this.pos===r&&(this.process(e,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){Fs(this),Om(t,this),this.finished=!0;const{buffer:e,view:n,blockLen:r,isLE:s}=this;let{pos:a}=this;e[a++]=128,this.buffer.subarray(a).fill(0),this.padOffset>r-a&&(this.process(n,0),a=0);for(let h=a;h<r;h++)e[h]=0;QA(n,r-8,BigInt(this.length*8),s),this.process(n,0);const o=wl(t),c=this.outputLen;if(c%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const l=c/4,u=this.get();if(l>u.length)throw new Error("_sha2: outputLen bigger than state");for(let h=0;h<l;h++)o.setUint32(4*h,u[h],s)}digest(){const{buffer:t,outputLen:e}=this;this.digestInto(t);const n=t.slice(0,e);return this.destroy(),n}_cloneInto(t){t||(t=new this.constructor),t.set(...this.get());const{blockLen:e,buffer:n,length:r,finished:s,destroyed:a,pos:o}=this;return t.length=r,t.pos=o,t.finished=s,t.destroyed=a,r%e&&t.buffer.set(n),t}}const ZA=(i,t,e)=>i&t^~i&e,$A=(i,t,e)=>i&t^i&e^t&e,jA=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),nr=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),ir=new Uint32Array(64);class tM extends Hm{constructor(){super(64,32,8,!1),this.A=nr[0]|0,this.B=nr[1]|0,this.C=nr[2]|0,this.D=nr[3]|0,this.E=nr[4]|0,this.F=nr[5]|0,this.G=nr[6]|0,this.H=nr[7]|0}get(){const{A:t,B:e,C:n,D:r,E:s,F:a,G:o,H:c}=this;return[t,e,n,r,s,a,o,c]}set(t,e,n,r,s,a,o,c){this.A=t|0,this.B=e|0,this.C=n|0,this.D=r|0,this.E=s|0,this.F=a|0,this.G=o|0,this.H=c|0}process(t,e){for(let h=0;h<16;h++,e+=4)ir[h]=t.getUint32(e,!1);for(let h=16;h<64;h++){const f=ir[h-15],d=ir[h-2],g=ui(f,7)^ui(f,18)^f>>>3,y=ui(d,17)^ui(d,19)^d>>>10;ir[h]=y+ir[h-7]+g+ir[h-16]|0}let{A:n,B:r,C:s,D:a,E:o,F:c,G:l,H:u}=this;for(let h=0;h<64;h++){const f=ui(o,6)^ui(o,11)^ui(o,25),d=u+f+ZA(o,c,l)+jA[h]+ir[h]|0,y=(ui(n,2)^ui(n,13)^ui(n,22))+$A(n,r,s)|0;u=l,l=c,c=o,o=a+d|0,a=s,s=r,r=n,n=d+y|0}n=n+this.A|0,r=r+this.B|0,s=s+this.C|0,a=a+this.D|0,o=o+this.E|0,c=c+this.F|0,l=l+this.G|0,u=u+this.H|0,this.set(n,r,s,a,o,c,l,u)}roundClean(){ir.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const zm=Sh(()=>new tM),Ao=BigInt(2**32-1),Lu=BigInt(32);function Vm(i,t=!1){return t?{h:Number(i&Ao),l:Number(i>>Lu&Ao)}:{h:Number(i>>Lu&Ao)|0,l:Number(i&Ao)|0}}function Wm(i,t=!1){let e=new Uint32Array(i.length),n=new Uint32Array(i.length);for(let r=0;r<i.length;r++){const{h:s,l:a}=Vm(i[r],t);[e[r],n[r]]=[s,a]}return[e,n]}const eM=(i,t)=>BigInt(i>>>0)<<Lu|BigInt(t>>>0),nM=(i,t,e)=>i>>>e,iM=(i,t,e)=>i<<32-e|t>>>e,rM=(i,t,e)=>i>>>e|t<<32-e,sM=(i,t,e)=>i<<32-e|t>>>e,aM=(i,t,e)=>i<<64-e|t>>>e-32,oM=(i,t,e)=>i>>>e-32|t<<64-e,cM=(i,t)=>t,lM=(i,t)=>i,Xm=(i,t,e)=>i<<e|t>>>32-e,qm=(i,t,e)=>t<<e|i>>>32-e,Km=(i,t,e)=>t<<e-32|i>>>64-e,Ym=(i,t,e)=>i<<e-32|t>>>64-e;function uM(i,t,e,n){const r=(t>>>0)+(n>>>0);return{h:i+e+(r/2**32|0)|0,l:r|0}}const hM=(i,t,e)=>(i>>>0)+(t>>>0)+(e>>>0),fM=(i,t,e,n)=>t+e+n+(i/2**32|0)|0,dM=(i,t,e,n)=>(i>>>0)+(t>>>0)+(e>>>0)+(n>>>0),pM=(i,t,e,n,r)=>t+e+n+r+(i/2**32|0)|0,mM=(i,t,e,n,r)=>(i>>>0)+(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0),gM=(i,t,e,n,r,s)=>t+e+n+r+s+(i/2**32|0)|0,Jt={fromBig:Vm,split:Wm,toBig:eM,shrSH:nM,shrSL:iM,rotrSH:rM,rotrSL:sM,rotrBH:aM,rotrBL:oM,rotr32H:cM,rotr32L:lM,rotlSH:Xm,rotlSL:qm,rotlBH:Km,rotlBL:Ym,add:uM,add3L:hM,add3H:fM,add4L:dM,add4H:pM,add5H:gM,add5L:mM},[yM,xM]=Jt.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(i=>BigInt(i))),rr=new Uint32Array(80),sr=new Uint32Array(80);class _M extends Hm{constructor(){super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209}get(){const{Ah:t,Al:e,Bh:n,Bl:r,Ch:s,Cl:a,Dh:o,Dl:c,Eh:l,El:u,Fh:h,Fl:f,Gh:d,Gl:g,Hh:y,Hl:m}=this;return[t,e,n,r,s,a,o,c,l,u,h,f,d,g,y,m]}set(t,e,n,r,s,a,o,c,l,u,h,f,d,g,y,m){this.Ah=t|0,this.Al=e|0,this.Bh=n|0,this.Bl=r|0,this.Ch=s|0,this.Cl=a|0,this.Dh=o|0,this.Dl=c|0,this.Eh=l|0,this.El=u|0,this.Fh=h|0,this.Fl=f|0,this.Gh=d|0,this.Gl=g|0,this.Hh=y|0,this.Hl=m|0}process(t,e){for(let S=0;S<16;S++,e+=4)rr[S]=t.getUint32(e),sr[S]=t.getUint32(e+=4);for(let S=16;S<80;S++){const v=rr[S-15]|0,M=sr[S-15]|0,w=Jt.rotrSH(v,M,1)^Jt.rotrSH(v,M,8)^Jt.shrSH(v,M,7),T=Jt.rotrSL(v,M,1)^Jt.rotrSL(v,M,8)^Jt.shrSL(v,M,7),x=rr[S-2]|0,E=sr[S-2]|0,R=Jt.rotrSH(x,E,19)^Jt.rotrBH(x,E,61)^Jt.shrSH(x,E,6),N=Jt.rotrSL(x,E,19)^Jt.rotrBL(x,E,61)^Jt.shrSL(x,E,6),U=Jt.add4L(T,N,sr[S-7],sr[S-16]),L=Jt.add4H(U,w,R,rr[S-7],rr[S-16]);rr[S]=L|0,sr[S]=U|0}let{Ah:n,Al:r,Bh:s,Bl:a,Ch:o,Cl:c,Dh:l,Dl:u,Eh:h,El:f,Fh:d,Fl:g,Gh:y,Gl:m,Hh:p,Hl:b}=this;for(let S=0;S<80;S++){const v=Jt.rotrSH(h,f,14)^Jt.rotrSH(h,f,18)^Jt.rotrBH(h,f,41),M=Jt.rotrSL(h,f,14)^Jt.rotrSL(h,f,18)^Jt.rotrBL(h,f,41),w=h&d^~h&y,T=f&g^~f&m,x=Jt.add5L(b,M,T,xM[S],sr[S]),E=Jt.add5H(x,p,v,w,yM[S],rr[S]),R=x|0,N=Jt.rotrSH(n,r,28)^Jt.rotrBH(n,r,34)^Jt.rotrBH(n,r,39),U=Jt.rotrSL(n,r,28)^Jt.rotrBL(n,r,34)^Jt.rotrBL(n,r,39),L=n&s^n&o^s&o,P=r&a^r&c^a&c;p=y|0,b=m|0,y=d|0,m=g|0,d=h|0,g=f|0,{h,l:f}=Jt.add(l|0,u|0,E|0,R|0),l=o|0,u=c|0,o=s|0,c=a|0,s=n|0,a=r|0;const I=Jt.add3L(R,U,P);n=Jt.add3H(I,E,N,L),r=I|0}({h:n,l:r}=Jt.add(this.Ah|0,this.Al|0,n|0,r|0)),{h:s,l:a}=Jt.add(this.Bh|0,this.Bl|0,s|0,a|0),{h:o,l:c}=Jt.add(this.Ch|0,this.Cl|0,o|0,c|0),{h:l,l:u}=Jt.add(this.Dh|0,this.Dl|0,l|0,u|0),{h,l:f}=Jt.add(this.Eh|0,this.El|0,h|0,f|0),{h:d,l:g}=Jt.add(this.Fh|0,this.Fl|0,d|0,g|0),{h:y,l:m}=Jt.add(this.Gh|0,this.Gl|0,y|0,m|0),{h:p,l:b}=Jt.add(this.Hh|0,this.Hl|0,p|0,b|0),this.set(n,r,s,a,o,c,l,u,h,f,d,g,y,m,p,b)}roundClean(){rr.fill(0),sr.fill(0)}destroy(){this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}const vM=Sh(()=>new _M);function bM(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}const Md=bM();Md.crypto||Md.msCrypto;function wM(i){switch(i){case"sha256":return zm.create();case"sha512":return vM.create()}O(!1,"invalid hashing algorithm name","algorithm",i)}const[Jm,Qm,Zm]=[[],[],[]],AM=BigInt(0),aa=BigInt(1),MM=BigInt(2),SM=BigInt(7),EM=BigInt(256),TM=BigInt(113);for(let i=0,t=aa,e=1,n=0;i<24;i++){[e,n]=[n,(2*e+3*n)%5],Jm.push(2*(5*n+e)),Qm.push((i+1)*(i+2)/2%64);let r=AM;for(let s=0;s<7;s++)t=(t<<aa^(t>>SM)*TM)%EM,t&MM&&(r^=aa<<(aa<<BigInt(s))-aa);Zm.push(r)}const[CM,RM]=Wm(Zm,!0),Sd=(i,t,e)=>e>32?Km(i,t,e):Xm(i,t,e),Ed=(i,t,e)=>e>32?Ym(i,t,e):qm(i,t,e);function PM(i,t=24){const e=new Uint32Array(10);for(let n=24-t;n<24;n++){for(let a=0;a<10;a++)e[a]=i[a]^i[a+10]^i[a+20]^i[a+30]^i[a+40];for(let a=0;a<10;a+=2){const o=(a+8)%10,c=(a+2)%10,l=e[c],u=e[c+1],h=Sd(l,u,1)^e[o],f=Ed(l,u,1)^e[o+1];for(let d=0;d<50;d+=10)i[a+d]^=h,i[a+d+1]^=f}let r=i[2],s=i[3];for(let a=0;a<24;a++){const o=Qm[a],c=Sd(r,s,o),l=Ed(r,s,o),u=Jm[a];r=i[u],s=i[u+1],i[u]=c,i[u+1]=l}for(let a=0;a<50;a+=10){for(let o=0;o<10;o++)e[o]=i[a+o];for(let o=0;o<10;o++)i[a+o]^=~e[(o+2)%10]&e[(o+4)%10]}i[0]^=CM[n],i[1]^=RM[n]}e.fill(0)}class Eh extends Mh{constructor(t,e,n,r=!1,s=24){if(super(),this.blockLen=t,this.suffix=e,this.outputLen=n,this.enableXOF=r,this.rounds=s,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,nc(n),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=XA(this.state)}keccak(){PM(this.state32,this.rounds),this.posOut=0,this.pos=0}update(t){Fs(this);const{blockLen:e,state:n}=this;t=Ac(t);const r=t.length;for(let s=0;s<r;){const a=Math.min(e-this.pos,r-s);for(let o=0;o<a;o++)n[this.pos++]^=t[s++];this.pos===e&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:t,suffix:e,pos:n,blockLen:r}=this;t[n]^=e,(e&128)!==0&&n===r-1&&this.keccak(),t[r-1]^=128,this.keccak()}writeInto(t){Fs(this,!1),Ah(t),this.finish();const e=this.state,{blockLen:n}=this;for(let r=0,s=t.length;r<s;){this.posOut>=n&&this.keccak();const a=Math.min(n-this.posOut,s-r);t.set(e.subarray(this.posOut,this.posOut+a),r),this.posOut+=a,r+=a}return t}xofInto(t){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(t)}xof(t){return nc(t),this.xofInto(new Uint8Array(t))}digestInto(t){if(Om(t,this),this.finished)throw new Error("digest() was already called");return this.writeInto(t),this.destroy(),t}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(t){const{blockLen:e,suffix:n,outputLen:r,rounds:s,enableXOF:a}=this;return t||(t=new Eh(e,n,r,a,s)),t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=s,t.suffix=n,t.outputLen=r,t.enableXOF=a,t.destroyed=this.destroyed,t}}const IM=(i,t,e)=>Sh(()=>new Eh(t,i,e)),NM=IM(1,136,256/8);let $m=!1;const jm=function(i){return NM(i)};let tg=jm;function Ge(i){const t=Zt(i,"data");return _t(tg(t))}Ge._=jm;Ge.lock=function(){$m=!0};Ge.register=function(i){if($m)throw new TypeError("keccak256 is locked");tg=i};Object.freeze(Ge);const eg=function(i){return wM("sha256").update(i).digest()};let ng=eg,ig=!1;function qs(i){const t=Zt(i,"data");return _t(ng(t))}qs._=eg;qs.lock=function(){ig=!0};qs.register=function(i){if(ig)throw new Error("sha256 is locked");ng=i};Object.freeze(qs);Object.freeze(qs);BigInt(0);const LM=BigInt(1),UM=BigInt(2),Mc=i=>i instanceof Uint8Array,DM=Array.from({length:256},(i,t)=>t.toString(16).padStart(2,"0"));function Os(i){if(!Mc(i))throw new Error("Uint8Array expected");let t="";for(let e=0;e<i.length;e++)t+=DM[i[e]];return t}function Th(i){if(typeof i!="string")throw new Error("hex string expected, got "+typeof i);return BigInt(i===""?"0":`0x${i}`)}function Ea(i){if(typeof i!="string")throw new Error("hex string expected, got "+typeof i);const t=i.length;if(t%2)throw new Error("padded hex string expected, got unpadded hex of length "+t);const e=new Uint8Array(t/2);for(let n=0;n<e.length;n++){const r=n*2,s=i.slice(r,r+2),a=Number.parseInt(s,16);if(Number.isNaN(a)||a<0)throw new Error("Invalid byte sequence");e[n]=a}return e}function Br(i){return Th(Os(i))}function Ch(i){if(!Mc(i))throw new Error("Uint8Array expected");return Th(Os(Uint8Array.from(i).reverse()))}function Bs(i,t){return Ea(i.toString(16).padStart(t*2,"0"))}function Rh(i,t){return Bs(i,t).reverse()}function Jn(i,t,e){let n;if(typeof t=="string")try{n=Ea(t)}catch(s){throw new Error(`${i} must be valid hex string, got "${t}". Cause: ${s}`)}else if(Mc(t))n=Uint8Array.from(t);else throw new Error(`${i} must be hex string or Uint8Array`);const r=n.length;if(typeof e=="number"&&r!==e)throw new Error(`${i} expected ${e} bytes, got ${r}`);return n}function Ta(...i){const t=new Uint8Array(i.reduce((n,r)=>n+r.length,0));let e=0;return i.forEach(n=>{if(!Mc(n))throw new Error("Uint8Array expected");t.set(n,e),e+=n.length}),t}const Ph=i=>(UM<<BigInt(i-1))-LM,Al=i=>new Uint8Array(i),Td=i=>Uint8Array.from(i);function rg(i,t,e){if(typeof i!="number"||i<2)throw new Error("hashLen must be a number");if(typeof t!="number"||t<2)throw new Error("qByteLen must be a number");if(typeof e!="function")throw new Error("hmacFn must be a function");let n=Al(i),r=Al(i),s=0;const a=()=>{n.fill(1),r.fill(0),s=0},o=(...h)=>e(r,n,...h),c=(h=Al())=>{r=o(Td([0]),h),n=o(),h.length!==0&&(r=o(Td([1]),h),n=o())},l=()=>{if(s++>=1e3)throw new Error("drbg: tried 1000 values");let h=0;const f=[];for(;h<t;){n=o();const d=n.slice();f.push(d),h+=n.length}return Ta(...f)};return(h,f)=>{a(),c(h);let d;for(;!(d=f(l()));)c();return a(),d}}const FM={bigint:i=>typeof i=="bigint",function:i=>typeof i=="function",boolean:i=>typeof i=="boolean",string:i=>typeof i=="string",stringOrUint8Array:i=>typeof i=="string"||i instanceof Uint8Array,isSafeInteger:i=>Number.isSafeInteger(i),array:i=>Array.isArray(i),field:(i,t)=>t.Fp.isValid(i),hash:i=>typeof i=="function"&&Number.isSafeInteger(i.outputLen)};function ka(i,t,e={}){const n=(r,s,a)=>{const o=FM[s];if(typeof o!="function")throw new Error(`Invalid validator "${s}", expected function`);const c=i[r];if(!(a&&c===void 0)&&!o(c,i))throw new Error(`Invalid param ${String(r)}=${c} (${typeof c}), expected ${s}`)};for(const[r,s]of Object.entries(t))n(r,s,!1);for(const[r,s]of Object.entries(e))n(r,s,!0);return i}const OM=Object.freeze(Object.defineProperty({__proto__:null,bitMask:Ph,bytesToHex:Os,bytesToNumberBE:Br,bytesToNumberLE:Ch,concatBytes:Ta,createHmacDrbg:rg,ensureBytes:Jn,hexToBytes:Ea,hexToNumber:Th,numberToBytesBE:Bs,numberToBytesLE:Rh,validateObject:ka},Symbol.toStringTag,{value:"Module"}));const nn=BigInt(0),ke=BigInt(1),Er=BigInt(2),BM=BigInt(3),Uu=BigInt(4),Cd=BigInt(5),Rd=BigInt(8);BigInt(9);BigInt(16);function bn(i,t){const e=i%t;return e>=nn?e:t+e}function kM(i,t,e){if(e<=nn||t<nn)throw new Error("Expected power/modulo > 0");if(e===ke)return nn;let n=ke;for(;t>nn;)t&ke&&(n=n*i%e),i=i*i%e,t>>=ke;return n}function kn(i,t,e){let n=i;for(;t-- >nn;)n*=n,n%=e;return n}function Du(i,t){if(i===nn||t<=nn)throw new Error(`invert: expected positive integers, got n=${i} mod=${t}`);let e=bn(i,t),n=t,r=nn,s=ke;for(;e!==nn;){const o=n/e,c=n%e,l=r-s*o;n=e,e=c,r=s,s=l}if(n!==ke)throw new Error("invert: does not exist");return bn(r,t)}function GM(i){const t=(i-ke)/Er;let e,n,r;for(e=i-ke,n=0;e%Er===nn;e/=Er,n++);for(r=Er;r<i&&kM(r,t,i)!==i-ke;r++);if(n===1){const a=(i+ke)/Uu;return function(c,l){const u=c.pow(l,a);if(!c.eql(c.sqr(u),l))throw new Error("Cannot find square root");return u}}const s=(e+ke)/Er;return function(o,c){if(o.pow(c,t)===o.neg(o.ONE))throw new Error("Cannot find square root");let l=n,u=o.pow(o.mul(o.ONE,r),e),h=o.pow(c,s),f=o.pow(c,e);for(;!o.eql(f,o.ONE);){if(o.eql(f,o.ZERO))return o.ZERO;let d=1;for(let y=o.sqr(f);d<l&&!o.eql(y,o.ONE);d++)y=o.sqr(y);const g=o.pow(u,ke<<BigInt(l-d-1));u=o.sqr(g),h=o.mul(h,g),f=o.mul(f,u),l=d}return h}}function HM(i){if(i%Uu===BM){const t=(i+ke)/Uu;return function(n,r){const s=n.pow(r,t);if(!n.eql(n.sqr(s),r))throw new Error("Cannot find square root");return s}}if(i%Rd===Cd){const t=(i-Cd)/Rd;return function(n,r){const s=n.mul(r,Er),a=n.pow(s,t),o=n.mul(r,a),c=n.mul(n.mul(o,Er),a),l=n.mul(o,n.sub(c,n.ONE));if(!n.eql(n.sqr(l),r))throw new Error("Cannot find square root");return l}}return GM(i)}const zM=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function VM(i){const t={ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"},e=zM.reduce((n,r)=>(n[r]="function",n),t);return ka(i,e)}function WM(i,t,e){if(e<nn)throw new Error("Expected power > 0");if(e===nn)return i.ONE;if(e===ke)return t;let n=i.ONE,r=t;for(;e>nn;)e&ke&&(n=i.mul(n,r)),r=i.sqr(r),e>>=ke;return n}function XM(i,t){const e=new Array(t.length),n=t.reduce((s,a,o)=>i.is0(a)?s:(e[o]=s,i.mul(s,a)),i.ONE),r=i.inv(n);return t.reduceRight((s,a,o)=>i.is0(a)?s:(e[o]=i.mul(s,e[o]),i.mul(s,a)),r),e}function sg(i,t){const e=t!==void 0?t:i.toString(2).length,n=Math.ceil(e/8);return{nBitLength:e,nByteLength:n}}function qM(i,t,e=!1,n={}){if(i<=nn)throw new Error(`Expected Field ORDER > 0, got ${i}`);const{nBitLength:r,nByteLength:s}=sg(i,t);if(s>2048)throw new Error("Field lengths over 2048 bytes are not supported");const a=HM(i),o=Object.freeze({ORDER:i,BITS:r,BYTES:s,MASK:Ph(r),ZERO:nn,ONE:ke,create:c=>bn(c,i),isValid:c=>{if(typeof c!="bigint")throw new Error(`Invalid field element: expected bigint, got ${typeof c}`);return nn<=c&&c<i},is0:c=>c===nn,isOdd:c=>(c&ke)===ke,neg:c=>bn(-c,i),eql:(c,l)=>c===l,sqr:c=>bn(c*c,i),add:(c,l)=>bn(c+l,i),sub:(c,l)=>bn(c-l,i),mul:(c,l)=>bn(c*l,i),pow:(c,l)=>WM(o,c,l),div:(c,l)=>bn(c*Du(l,i),i),sqrN:c=>c*c,addN:(c,l)=>c+l,subN:(c,l)=>c-l,mulN:(c,l)=>c*l,inv:c=>Du(c,i),sqrt:n.sqrt||(c=>a(o,c)),invertBatch:c=>XM(o,c),cmov:(c,l,u)=>u?l:c,toBytes:c=>e?Rh(c,s):Bs(c,s),fromBytes:c=>{if(c.length!==s)throw new Error(`Fp.fromBytes: expected ${s}, got ${c.length}`);return e?Ch(c):Br(c)}});return Object.freeze(o)}function ag(i){if(typeof i!="bigint")throw new Error("field order must be bigint");const t=i.toString(2).length;return Math.ceil(t/8)}function og(i){const t=ag(i);return t+Math.ceil(t/2)}function KM(i,t,e=!1){const n=i.length,r=ag(t),s=og(t);if(n<16||n<s||n>1024)throw new Error(`expected ${s}-1024 bytes of input, got ${n}`);const a=e?Br(i):Ch(i),o=bn(a,t-ke)+ke;return e?Rh(o,r):Bs(o,r)}const YM=BigInt(0),Ml=BigInt(1);function JM(i,t){const e=(r,s)=>{const a=s.negate();return r?a:s},n=r=>{const s=Math.ceil(t/r)+1,a=2**(r-1);return{windows:s,windowSize:a}};return{constTimeNegate:e,unsafeLadder(r,s){let a=i.ZERO,o=r;for(;s>YM;)s&Ml&&(a=a.add(o)),o=o.double(),s>>=Ml;return a},precomputeWindow(r,s){const{windows:a,windowSize:o}=n(s),c=[];let l=r,u=l;for(let h=0;h<a;h++){u=l,c.push(u);for(let f=1;f<o;f++)u=u.add(l),c.push(u);l=u.double()}return c},wNAF(r,s,a){const{windows:o,windowSize:c}=n(r);let l=i.ZERO,u=i.BASE;const h=BigInt(2**r-1),f=2**r,d=BigInt(r);for(let g=0;g<o;g++){const y=g*c;let m=Number(a&h);a>>=d,m>c&&(m-=f,a+=Ml);const p=y,b=y+Math.abs(m)-1,S=g%2!==0,v=m<0;m===0?u=u.add(e(S,s[p])):l=l.add(e(v,s[b]))}return{p:l,f:u}},wNAFCached(r,s,a,o){const c=r._WINDOW_SIZE||1;let l=s.get(r);return l||(l=this.precomputeWindow(r,c),c!==1&&s.set(r,o(l))),this.wNAF(c,l,a)}}}function cg(i){return VM(i.Fp),ka(i,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...sg(i.n,i.nBitLength),...i,p:i.Fp.ORDER})}function QM(i){const t=cg(i);ka(t,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:e,Fp:n,a:r}=t;if(e){if(!n.eql(r,n.ZERO))throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");if(typeof e!="object"||typeof e.beta!="bigint"||typeof e.splitScalar!="function")throw new Error("Expected endomorphism with beta: bigint and splitScalar: function")}return Object.freeze({...t})}const{bytesToNumberBE:ZM,hexToBytes:$M}=OM,Nr={Err:class extends Error{constructor(t=""){super(t)}},_parseInt(i){const{Err:t}=Nr;if(i.length<2||i[0]!==2)throw new t("Invalid signature integer tag");const e=i[1],n=i.subarray(2,e+2);if(!e||n.length!==e)throw new t("Invalid signature integer: wrong length");if(n[0]&128)throw new t("Invalid signature integer: negative");if(n[0]===0&&!(n[1]&128))throw new t("Invalid signature integer: unnecessary leading zero");return{d:ZM(n),l:i.subarray(e+2)}},toSig(i){const{Err:t}=Nr,e=typeof i=="string"?$M(i):i;if(!(e instanceof Uint8Array))throw new Error("ui8a expected");let n=e.length;if(n<2||e[0]!=48)throw new t("Invalid signature tag");if(e[1]!==n-2)throw new t("Invalid signature: incorrect length");const{d:r,l:s}=Nr._parseInt(e.subarray(2)),{d:a,l:o}=Nr._parseInt(s);if(o.length)throw new t("Invalid signature: left bytes after parsing");return{r,s:a}},hexFromSig(i){const t=l=>Number.parseInt(l[0],16)&8?"00"+l:l,e=l=>{const u=l.toString(16);return u.length&1?`0${u}`:u},n=t(e(i.s)),r=t(e(i.r)),s=n.length/2,a=r.length/2,o=e(s),c=e(a);return`30${e(a+s+4)}02${c}${r}02${o}${n}`}},Ci=BigInt(0),Gn=BigInt(1);BigInt(2);const Pd=BigInt(3);BigInt(4);function jM(i){const t=QM(i),{Fp:e}=t,n=t.toBytes||((g,y,m)=>{const p=y.toAffine();return Ta(Uint8Array.from([4]),e.toBytes(p.x),e.toBytes(p.y))}),r=t.fromBytes||(g=>{const y=g.subarray(1),m=e.fromBytes(y.subarray(0,e.BYTES)),p=e.fromBytes(y.subarray(e.BYTES,2*e.BYTES));return{x:m,y:p}});function s(g){const{a:y,b:m}=t,p=e.sqr(g),b=e.mul(p,g);return e.add(e.add(b,e.mul(g,y)),m)}if(!e.eql(e.sqr(t.Gy),s(t.Gx)))throw new Error("bad generator point: equation left != right");function a(g){return typeof g=="bigint"&&Ci<g&&g<t.n}function o(g){if(!a(g))throw new Error("Expected valid bigint: 0 < bigint < curve.n")}function c(g){const{allowedPrivateKeyLengths:y,nByteLength:m,wrapPrivateKey:p,n:b}=t;if(y&&typeof g!="bigint"){if(g instanceof Uint8Array&&(g=Os(g)),typeof g!="string"||!y.includes(g.length))throw new Error("Invalid key");g=g.padStart(m*2,"0")}let S;try{S=typeof g=="bigint"?g:Br(Jn("private key",g,m))}catch{throw new Error(`private key must be ${m} bytes, hex or bigint, not ${typeof g}`)}return p&&(S=bn(S,b)),o(S),S}const l=new Map;function u(g){if(!(g instanceof h))throw new Error("ProjectivePoint expected")}class h{constructor(y,m,p){if(this.px=y,this.py=m,this.pz=p,y==null||!e.isValid(y))throw new Error("x required");if(m==null||!e.isValid(m))throw new Error("y required");if(p==null||!e.isValid(p))throw new Error("z required")}static fromAffine(y){const{x:m,y:p}=y||{};if(!y||!e.isValid(m)||!e.isValid(p))throw new Error("invalid affine point");if(y instanceof h)throw new Error("projective point not allowed");const b=S=>e.eql(S,e.ZERO);return b(m)&&b(p)?h.ZERO:new h(m,p,e.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(y){const m=e.invertBatch(y.map(p=>p.pz));return y.map((p,b)=>p.toAffine(m[b])).map(h.fromAffine)}static fromHex(y){const m=h.fromAffine(r(Jn("pointHex",y)));return m.assertValidity(),m}static fromPrivateKey(y){return h.BASE.multiply(c(y))}_setWindowSize(y){this._WINDOW_SIZE=y,l.delete(this)}assertValidity(){if(this.is0()){if(t.allowInfinityPoint&&!e.is0(this.py))return;throw new Error("bad point: ZERO")}const{x:y,y:m}=this.toAffine();if(!e.isValid(y)||!e.isValid(m))throw new Error("bad point: x or y not FE");const p=e.sqr(m),b=s(y);if(!e.eql(p,b))throw new Error("bad point: equation left != right");if(!this.isTorsionFree())throw new Error("bad point: not in prime-order subgroup")}hasEvenY(){const{y}=this.toAffine();if(e.isOdd)return!e.isOdd(y);throw new Error("Field doesn't support isOdd")}equals(y){u(y);const{px:m,py:p,pz:b}=this,{px:S,py:v,pz:M}=y,w=e.eql(e.mul(m,M),e.mul(S,b)),T=e.eql(e.mul(p,M),e.mul(v,b));return w&&T}negate(){return new h(this.px,e.neg(this.py),this.pz)}double(){const{a:y,b:m}=t,p=e.mul(m,Pd),{px:b,py:S,pz:v}=this;let M=e.ZERO,w=e.ZERO,T=e.ZERO,x=e.mul(b,b),E=e.mul(S,S),R=e.mul(v,v),N=e.mul(b,S);return N=e.add(N,N),T=e.mul(b,v),T=e.add(T,T),M=e.mul(y,T),w=e.mul(p,R),w=e.add(M,w),M=e.sub(E,w),w=e.add(E,w),w=e.mul(M,w),M=e.mul(N,M),T=e.mul(p,T),R=e.mul(y,R),N=e.sub(x,R),N=e.mul(y,N),N=e.add(N,T),T=e.add(x,x),x=e.add(T,x),x=e.add(x,R),x=e.mul(x,N),w=e.add(w,x),R=e.mul(S,v),R=e.add(R,R),x=e.mul(R,N),M=e.sub(M,x),T=e.mul(R,E),T=e.add(T,T),T=e.add(T,T),new h(M,w,T)}add(y){u(y);const{px:m,py:p,pz:b}=this,{px:S,py:v,pz:M}=y;let w=e.ZERO,T=e.ZERO,x=e.ZERO;const E=t.a,R=e.mul(t.b,Pd);let N=e.mul(m,S),U=e.mul(p,v),L=e.mul(b,M),P=e.add(m,p),I=e.add(S,v);P=e.mul(P,I),I=e.add(N,U),P=e.sub(P,I),I=e.add(m,b);let D=e.add(S,M);return I=e.mul(I,D),D=e.add(N,L),I=e.sub(I,D),D=e.add(p,b),w=e.add(v,M),D=e.mul(D,w),w=e.add(U,L),D=e.sub(D,w),x=e.mul(E,I),w=e.mul(R,L),x=e.add(w,x),w=e.sub(U,x),x=e.add(U,x),T=e.mul(w,x),U=e.add(N,N),U=e.add(U,N),L=e.mul(E,L),I=e.mul(R,I),U=e.add(U,L),L=e.sub(N,L),L=e.mul(E,L),I=e.add(I,L),N=e.mul(U,I),T=e.add(T,N),N=e.mul(D,I),w=e.mul(P,w),w=e.sub(w,N),N=e.mul(P,U),x=e.mul(D,x),x=e.add(x,N),new h(w,T,x)}subtract(y){return this.add(y.negate())}is0(){return this.equals(h.ZERO)}wNAF(y){return d.wNAFCached(this,l,y,m=>{const p=e.invertBatch(m.map(b=>b.pz));return m.map((b,S)=>b.toAffine(p[S])).map(h.fromAffine)})}multiplyUnsafe(y){const m=h.ZERO;if(y===Ci)return m;if(o(y),y===Gn)return this;const{endo:p}=t;if(!p)return d.unsafeLadder(this,y);let{k1neg:b,k1:S,k2neg:v,k2:M}=p.splitScalar(y),w=m,T=m,x=this;for(;S>Ci||M>Ci;)S&Gn&&(w=w.add(x)),M&Gn&&(T=T.add(x)),x=x.double(),S>>=Gn,M>>=Gn;return b&&(w=w.negate()),v&&(T=T.negate()),T=new h(e.mul(T.px,p.beta),T.py,T.pz),w.add(T)}multiply(y){o(y);let m=y,p,b;const{endo:S}=t;if(S){const{k1neg:v,k1:M,k2neg:w,k2:T}=S.splitScalar(m);let{p:x,f:E}=this.wNAF(M),{p:R,f:N}=this.wNAF(T);x=d.constTimeNegate(v,x),R=d.constTimeNegate(w,R),R=new h(e.mul(R.px,S.beta),R.py,R.pz),p=x.add(R),b=E.add(N)}else{const{p:v,f:M}=this.wNAF(m);p=v,b=M}return h.normalizeZ([p,b])[0]}multiplyAndAddUnsafe(y,m,p){const b=h.BASE,S=(M,w)=>w===Ci||w===Gn||!M.equals(b)?M.multiplyUnsafe(w):M.multiply(w),v=S(this,m).add(S(y,p));return v.is0()?void 0:v}toAffine(y){const{px:m,py:p,pz:b}=this,S=this.is0();y==null&&(y=S?e.ONE:e.inv(b));const v=e.mul(m,y),M=e.mul(p,y),w=e.mul(b,y);if(S)return{x:e.ZERO,y:e.ZERO};if(!e.eql(w,e.ONE))throw new Error("invZ was invalid");return{x:v,y:M}}isTorsionFree(){const{h:y,isTorsionFree:m}=t;if(y===Gn)return!0;if(m)return m(h,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:y,clearCofactor:m}=t;return y===Gn?this:m?m(h,this):this.multiplyUnsafe(t.h)}toRawBytes(y=!0){return this.assertValidity(),n(h,this,y)}toHex(y=!0){return Os(this.toRawBytes(y))}}h.BASE=new h(t.Gx,t.Gy,e.ONE),h.ZERO=new h(e.ZERO,e.ONE,e.ZERO);const f=t.nBitLength,d=JM(h,t.endo?Math.ceil(f/2):f);return{CURVE:t,ProjectivePoint:h,normPrivateKeyToScalar:c,weierstrassEquation:s,isWithinCurveOrder:a}}function tS(i){const t=cg(i);return ka(t,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...t})}function eS(i){const t=tS(i),{Fp:e,n}=t,r=e.BYTES+1,s=2*e.BYTES+1;function a(I){return Ci<I&&I<e.ORDER}function o(I){return bn(I,n)}function c(I){return Du(I,n)}const{ProjectivePoint:l,normPrivateKeyToScalar:u,weierstrassEquation:h,isWithinCurveOrder:f}=jM({...t,toBytes(I,D,G){const Y=D.toAffine(),V=e.toBytes(Y.x),Q=Ta;return G?Q(Uint8Array.from([D.hasEvenY()?2:3]),V):Q(Uint8Array.from([4]),V,e.toBytes(Y.y))},fromBytes(I){const D=I.length,G=I[0],Y=I.subarray(1);if(D===r&&(G===2||G===3)){const V=Br(Y);if(!a(V))throw new Error("Point is not on curve");const Q=h(V);let Z=e.sqrt(Q);const at=(Z&Gn)===Gn;return(G&1)===1!==at&&(Z=e.neg(Z)),{x:V,y:Z}}else if(D===s&&G===4){const V=e.fromBytes(Y.subarray(0,e.BYTES)),Q=e.fromBytes(Y.subarray(e.BYTES,2*e.BYTES));return{x:V,y:Q}}else throw new Error(`Point of length ${D} was invalid. Expected ${r} compressed bytes or ${s} uncompressed bytes`)}}),d=I=>Os(Bs(I,t.nByteLength));function g(I){const D=n>>Gn;return I>D}function y(I){return g(I)?o(-I):I}const m=(I,D,G)=>Br(I.slice(D,G));class p{constructor(D,G,Y){this.r=D,this.s=G,this.recovery=Y,this.assertValidity()}static fromCompact(D){const G=t.nByteLength;return D=Jn("compactSignature",D,G*2),new p(m(D,0,G),m(D,G,2*G))}static fromDER(D){const{r:G,s:Y}=Nr.toSig(Jn("DER",D));return new p(G,Y)}assertValidity(){if(!f(this.r))throw new Error("r must be 0 < r < CURVE.n");if(!f(this.s))throw new Error("s must be 0 < s < CURVE.n")}addRecoveryBit(D){return new p(this.r,this.s,D)}recoverPublicKey(D){const{r:G,s:Y,recovery:V}=this,Q=T(Jn("msgHash",D));if(V==null||![0,1,2,3].includes(V))throw new Error("recovery id invalid");const Z=V===2||V===3?G+t.n:G;if(Z>=e.ORDER)throw new Error("recovery id 2 or 3 invalid");const at=(V&1)===0?"02":"03",ot=l.fromHex(at+d(Z)),Ot=c(Z),Nt=o(-Q*Ot),Kt=o(Y*Ot),J=l.BASE.multiplyAndAddUnsafe(ot,Nt,Kt);if(!J)throw new Error("point at infinify");return J.assertValidity(),J}hasHighS(){return g(this.s)}normalizeS(){return this.hasHighS()?new p(this.r,o(-this.s),this.recovery):this}toDERRawBytes(){return Ea(this.toDERHex())}toDERHex(){return Nr.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return Ea(this.toCompactHex())}toCompactHex(){return d(this.r)+d(this.s)}}const b={isValidPrivateKey(I){try{return u(I),!0}catch{return!1}},normPrivateKeyToScalar:u,randomPrivateKey:()=>{const I=og(t.n);return KM(t.randomBytes(I),t.n)},precompute(I=8,D=l.BASE){return D._setWindowSize(I),D.multiply(BigInt(3)),D}};function S(I,D=!0){return l.fromPrivateKey(I).toRawBytes(D)}function v(I){const D=I instanceof Uint8Array,G=typeof I=="string",Y=(D||G)&&I.length;return D?Y===r||Y===s:G?Y===2*r||Y===2*s:I instanceof l}function M(I,D,G=!0){if(v(I))throw new Error("first arg must be private key");if(!v(D))throw new Error("second arg must be public key");return l.fromHex(D).multiply(u(I)).toRawBytes(G)}const w=t.bits2int||function(I){const D=Br(I),G=I.length*8-t.nBitLength;return G>0?D>>BigInt(G):D},T=t.bits2int_modN||function(I){return o(w(I))},x=Ph(t.nBitLength);function E(I){if(typeof I!="bigint")throw new Error("bigint expected");if(!(Ci<=I&&I<x))throw new Error(`bigint expected < 2^${t.nBitLength}`);return Bs(I,t.nByteLength)}function R(I,D,G=N){if(["recovered","canonical"].some(ct=>ct in G))throw new Error("sign() legacy options not supported");const{hash:Y,randomBytes:V}=t;let{lowS:Q,prehash:Z,extraEntropy:at}=G;Q==null&&(Q=!0),I=Jn("msgHash",I),Z&&(I=Jn("prehashed msgHash",Y(I)));const ot=T(I),Ot=u(D),Nt=[E(Ot),E(ot)];if(at!=null){const ct=at===!0?V(e.BYTES):at;Nt.push(Jn("extraEntropy",ct))}const Kt=Ta(...Nt),J=ot;function et(ct){const Lt=w(ct);if(!f(Lt))return;const yt=c(Lt),Ut=l.BASE.multiply(Lt).toAffine(),pe=o(Ut.x);if(pe===Ci)return;const Gt=o(yt*o(J+pe*Ot));if(Gt===Ci)return;let $t=(Ut.x===pe?0:2)|Number(Ut.y&Gn),le=Gt;return Q&&g(Gt)&&(le=y(Gt),$t^=1),new p(pe,le,$t)}return{seed:Kt,k2sig:et}}const N={lowS:t.lowS,prehash:!1},U={lowS:t.lowS,prehash:!1};function L(I,D,G=N){const{seed:Y,k2sig:V}=R(I,D,G),Q=t;return rg(Q.hash.outputLen,Q.nByteLength,Q.hmac)(Y,V)}l.BASE._setWindowSize(8);function P(I,D,G,Y=U){const V=I;if(D=Jn("msgHash",D),G=Jn("publicKey",G),"strict"in Y)throw new Error("options.strict was renamed to lowS");const{lowS:Q,prehash:Z}=Y;let at,ot;try{if(typeof V=="string"||V instanceof Uint8Array)try{at=p.fromDER(V)}catch(Ut){if(!(Ut instanceof Nr.Err))throw Ut;at=p.fromCompact(V)}else if(typeof V=="object"&&typeof V.r=="bigint"&&typeof V.s=="bigint"){const{r:Ut,s:pe}=V;at=new p(Ut,pe)}else throw new Error("PARSE");ot=l.fromHex(G)}catch(Ut){if(Ut.message==="PARSE")throw new Error("signature must be Signature instance, Uint8Array or hex string");return!1}if(Q&&at.hasHighS())return!1;Z&&(D=t.hash(D));const{r:Ot,s:Nt}=at,Kt=T(D),J=c(Nt),et=o(Kt*J),ct=o(Ot*J),Lt=l.BASE.multiplyAndAddUnsafe(ot,et,ct)?.toAffine();return Lt?o(Lt.x)===Ot:!1}return{CURVE:t,getPublicKey:S,getSharedSecret:M,sign:L,verify:P,ProjectivePoint:l,Signature:p,utils:b}}function nS(i){return{hash:i,hmac:(t,...e)=>Gm(i,t,YA(...e)),randomBytes:JA}}function iS(i,t){const e=n=>eS({...i,...nS(n)});return Object.freeze({...e(t),create:e})}const lg=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),Id=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),rS=BigInt(1),Fu=BigInt(2),Nd=(i,t)=>(i+t/Fu)/t;function sS(i){const t=lg,e=BigInt(3),n=BigInt(6),r=BigInt(11),s=BigInt(22),a=BigInt(23),o=BigInt(44),c=BigInt(88),l=i*i*i%t,u=l*l*i%t,h=kn(u,e,t)*u%t,f=kn(h,e,t)*u%t,d=kn(f,Fu,t)*l%t,g=kn(d,r,t)*d%t,y=kn(g,s,t)*g%t,m=kn(y,o,t)*y%t,p=kn(m,c,t)*m%t,b=kn(p,o,t)*y%t,S=kn(b,e,t)*u%t,v=kn(S,a,t)*g%t,M=kn(v,n,t)*l%t,w=kn(M,Fu,t);if(!Ou.eql(Ou.sqr(w),i))throw new Error("Cannot find square root");return w}const Ou=qM(lg,void 0,void 0,{sqrt:sS}),ar=iS({a:BigInt(0),b:BigInt(7),Fp:Ou,n:Id,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:i=>{const t=Id,e=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),n=-rS*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),r=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),s=e,a=BigInt("0x100000000000000000000000000000000"),o=Nd(s*i,t),c=Nd(-n*i,t);let l=bn(i-o*e-c*r,t),u=bn(-o*n-c*s,t);const h=l>a,f=u>a;if(h&&(l=t-l),f&&(u=t-u),l>a||u>a)throw new Error("splitScalar: Endomorphism failed, k="+i);return{k1neg:h,k1:l,k2neg:f,k2:u}}}},zm);BigInt(0);ar.ProjectivePoint;const ic="0x0000000000000000000000000000000000000000",Ld="0x0000000000000000000000000000000000000000000000000000000000000000",Ud=BigInt(0),Dd=BigInt(1),Bu=BigInt(2),Fd=BigInt(27),Od=BigInt(28),Mo=BigInt(35),ug=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),aS=ug/Bu,oS=Symbol.for("nodejs.util.inspect.custom"),wr={};function Sl(i){return Gi(qe(i),32)}class Ie{#t;#e;#n;#i;get r(){return this.#t}set r(t){O(Cs(t)===32,"invalid r","value",t),this.#t=_t(t)}get s(){return O(parseInt(this.#e.substring(0,3))<8,"non-canonical s; use ._s","s",this.#e),this.#e}set s(t){O(Cs(t)===32,"invalid s","value",t),this.#e=_t(t)}get _s(){return this.#e}isValid(){return BigInt(this.#e)<=aS}get v(){return this.#n}set v(t){const e=Xt(t,"value");O(e===27||e===28,"invalid v","v",t),this.#n=e}get networkV(){return this.#i}get legacyChainId(){const t=this.networkV;return t==null?null:Ie.getChainId(t)}get yParity(){return this.v===27?0:1}get yParityAndS(){const t=Zt(this.s);return this.yParity&&(t[0]|=128),_t(t)}get compactSerialized(){return Pe([this.r,this.yParityAndS])}get serialized(){return Pe([this.r,this.s,this.yParity?"0x1c":"0x1b"])}constructor(t,e,n,r){Fa(t,wr,"Signature"),this.#t=e,this.#e=n,this.#n=r,this.#i=null}getCanonical(){if(this.isValid())return this;const t=ug-BigInt(this._s),e=55-this.v,n=new Ie(wr,this.r,Sl(t),e);return this.networkV&&(n.#i=this.networkV),n}clone(){const t=new Ie(wr,this.r,this._s,this.v);return this.networkV&&(t.#i=this.networkV),t}toJSON(){const t=this.networkV;return{_type:"signature",networkV:t!=null?t.toString():null,r:this.r,s:this._s,v:this.v}}[oS](){return this.toString()}toString(){return this.isValid()?`Signature { r: ${this.r}, s: ${this._s}, v: ${this.v} }`:`Signature { r: ${this.r}, s: ${this._s}, v: ${this.v}, valid: false }`}static getChainId(t){const e=bt(t,"v");return e==Fd||e==Od?Ud:(O(e>=Mo,"invalid EIP-155 v","v",t),(e-Mo)/Bu)}static getChainIdV(t,e){return bt(t)*Bu+BigInt(35+e-27)}static getNormalizedV(t){const e=bt(t);return e===Ud||e===Fd?27:e===Dd||e===Od?28:(O(e>=Mo,"invalid v","v",t),e&Dd?27:28)}static from(t){function e(l,u){O(l,u,"signature",t)}if(t==null)return new Ie(wr,Ld,Ld,27);if(typeof t=="string"){const l=Zt(t,"signature");if(l.length===64){const u=_t(l.slice(0,32)),h=l.slice(32,64),f=h[0]&128?28:27;return h[0]&=127,new Ie(wr,u,_t(h),f)}if(l.length===65){const u=_t(l.slice(0,32)),h=_t(l.slice(32,64)),f=Ie.getNormalizedV(l[64]);return new Ie(wr,u,h,f)}e(!1,"invalid raw signature length")}if(t instanceof Ie)return t.clone();const n=t.r;e(n!=null,"missing r");const r=Sl(n),s=(function(l,u){if(l!=null)return Sl(l);if(u!=null){e(be(u,32),"invalid yParityAndS");const h=Zt(u);return h[0]&=127,_t(h)}e(!1,"missing s")})(t.s,t.yParityAndS),{networkV:a,v:o}=(function(l,u,h){if(l!=null){const f=bt(l);return{networkV:f>=Mo?f:void 0,v:Ie.getNormalizedV(f)}}if(u!=null)return e(be(u,32),"invalid yParityAndS"),{v:Zt(u)[0]&128?28:27};if(h!=null){switch(Xt(h,"sig.yParity")){case 0:return{v:27};case 1:return{v:28}}e(!1,"invalid yParity")}e(!1,"missing v")})(t.v,t.yParityAndS,t.yParity),c=new Ie(wr,r,s,o);return a&&(c.#i=a),e(t.yParity==null||Xt(t.yParity,"sig.yParity")===c.yParity,"yParity mismatch"),e(t.yParityAndS==null||t.yParityAndS===c.yParityAndS,"yParityAndS mismatch"),c}}class Ri{#t;constructor(t){O(Cs(t)===32,"invalid private key","privateKey","[REDACTED]"),this.#t=_t(t)}get privateKey(){return this.#t}get publicKey(){return Ri.computePublicKey(this.#t)}get compressedPublicKey(){return Ri.computePublicKey(this.#t,!0)}sign(t){O(Cs(t)===32,"invalid digest length","digest",t);const e=ar.sign(dn(t),dn(this.#t),{lowS:!0});return Ie.from({r:fr(e.r,32),s:fr(e.s,32),v:e.recovery?28:27})}computeSharedSecret(t){const e=Ri.computePublicKey(t);return _t(ar.getSharedSecret(dn(this.#t),Zt(e),!1))}static computePublicKey(t,e){let n=Zt(t,"key");if(n.length===32){const s=ar.getPublicKey(n,!!e);return _t(s)}if(n.length===64){const s=new Uint8Array(65);s[0]=4,s.set(n,1),n=s}const r=ar.ProjectivePoint.fromHex(n);return _t(r.toRawBytes(e))}static recoverPublicKey(t,e){O(Cs(t)===32,"invalid digest length","digest",t);const n=Ie.from(e);let r=ar.Signature.fromCompact(dn(Pe([n.r,n.s])));r=r.addRecoveryBit(n.yParity);const s=r.recoverPublicKey(dn(t));return O(s!=null,"invalid signature for digest","signature",e),"0x"+s.toHex(!1)}static addPoints(t,e,n){const r=ar.ProjectivePoint.fromHex(Ri.computePublicKey(t).substring(2)),s=ar.ProjectivePoint.fromHex(Ri.computePublicKey(e).substring(2));return"0x"+r.add(s).toHex(!!n)}}const cS=BigInt(0),lS=BigInt(36);function Bd(i){i=i.toLowerCase();const t=i.substring(2).split(""),e=new Uint8Array(40);for(let r=0;r<40;r++)e[r]=t[r].charCodeAt(0);const n=Zt(Ge(e));for(let r=0;r<40;r+=2)n[r>>1]>>4>=8&&(t[r]=t[r].toUpperCase()),(n[r>>1]&15)>=8&&(t[r+1]=t[r+1].toUpperCase());return"0x"+t.join("")}const Ih={};for(let i=0;i<10;i++)Ih[String(i)]=String(i);for(let i=0;i<26;i++)Ih[String.fromCharCode(65+i)]=String(10+i);const kd=15;function uS(i){i=i.toUpperCase(),i=i.substring(4)+i.substring(0,2)+"00";let t=i.split("").map(n=>Ih[n]).join("");for(;t.length>=kd;){let n=t.substring(0,kd);t=parseInt(n,10)%97+t.substring(n.length)}let e=String(98-parseInt(t,10)%97);for(;e.length<2;)e="0"+e;return e}const hS=(function(){const i={};for(let t=0;t<36;t++){const e="0123456789abcdefghijklmnopqrstuvwxyz"[t];i[e]=BigInt(t)}return i})();function fS(i){i=i.toLowerCase();let t=cS;for(let e=0;e<i.length;e++)t=t*lS+hS[i[e]];return t}function he(i){if(O(typeof i=="string","invalid address","address",i),i.match(/^(0x)?[0-9a-fA-F]{40}$/)){i.startsWith("0x")||(i="0x"+i);const t=Bd(i);return O(!i.match(/([A-F].*[a-f])|([a-f].*[A-F])/)||t===i,"bad address checksum","address",i),t}if(i.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)){O(i.substring(2,4)===uS(i),"bad icap checksum","address",i);let t=fS(i.substring(4)).toString(16);for(;t.length<40;)t="0"+t;return Bd("0x"+t)}O(!1,"invalid address","address",i)}function dS(i){const t=he(i.from);let n=bt(i.nonce,"tx.nonce").toString(16);return n==="0"?n="0x":n.length%2?n="0x0"+n:n="0x"+n,he(De(Ge(Fi([t,n])),12))}function hg(i){return i&&typeof i.getAddress=="function"}async function El(i,t){const e=await t;return(e==null||e==="0x0000000000000000000000000000000000000000")&&(it(typeof i!="string","unconfigured name","UNCONFIGURED_NAME",{value:i}),O(!1,"invalid AddressLike value; did not resolve to a value address","target",i)),he(e)}function gn(i,t){if(typeof i=="string")return i.match(/^0x[0-9a-f]{40}$/i)?he(i):(it(t!=null,"ENS resolution requires a provider","UNSUPPORTED_OPERATION",{operation:"resolveName"}),El(i,t.resolveName(i)));if(hg(i))return El(i,i.getAddress());if(i&&typeof i.then=="function")return El(i,i);O(!1,"unsupported addressable value","target",i)}const Ei={};function Mt(i,t){let e=!1;return t<0&&(e=!0,t*=-1),new Fe(Ei,`${e?"":"u"}int${t}`,i,{signed:e,width:t})}function oe(i,t){return new Fe(Ei,`bytes${t||""}`,i,{size:t})}const Gd=Symbol.for("_ethers_typed");class Fe{type;value;#t;_typedSymbol;constructor(t,e,n,r){r==null&&(r=null),Fa(Ei,t,"Typed"),Ft(this,{_typedSymbol:Gd,type:e,value:n}),this.#t=r,this.format()}format(){if(this.type==="array")throw new Error("");if(this.type==="dynamicArray")throw new Error("");return this.type==="tuple"?`tuple(${this.value.map(t=>t.format()).join(",")})`:this.type}defaultValue(){return 0}minValue(){return 0}maxValue(){return 0}isBigInt(){return!!this.type.match(/^u?int[0-9]+$/)}isData(){return this.type.startsWith("bytes")}isString(){return this.type==="string"}get tupleName(){if(this.type!=="tuple")throw TypeError("not a tuple");return this.#t}get arrayLength(){if(this.type!=="array")throw TypeError("not an array");return this.#t===!0?-1:this.#t===!1?this.value.length:null}static from(t,e){return new Fe(Ei,t,e)}static uint8(t){return Mt(t,8)}static uint16(t){return Mt(t,16)}static uint24(t){return Mt(t,24)}static uint32(t){return Mt(t,32)}static uint40(t){return Mt(t,40)}static uint48(t){return Mt(t,48)}static uint56(t){return Mt(t,56)}static uint64(t){return Mt(t,64)}static uint72(t){return Mt(t,72)}static uint80(t){return Mt(t,80)}static uint88(t){return Mt(t,88)}static uint96(t){return Mt(t,96)}static uint104(t){return Mt(t,104)}static uint112(t){return Mt(t,112)}static uint120(t){return Mt(t,120)}static uint128(t){return Mt(t,128)}static uint136(t){return Mt(t,136)}static uint144(t){return Mt(t,144)}static uint152(t){return Mt(t,152)}static uint160(t){return Mt(t,160)}static uint168(t){return Mt(t,168)}static uint176(t){return Mt(t,176)}static uint184(t){return Mt(t,184)}static uint192(t){return Mt(t,192)}static uint200(t){return Mt(t,200)}static uint208(t){return Mt(t,208)}static uint216(t){return Mt(t,216)}static uint224(t){return Mt(t,224)}static uint232(t){return Mt(t,232)}static uint240(t){return Mt(t,240)}static uint248(t){return Mt(t,248)}static uint256(t){return Mt(t,256)}static uint(t){return Mt(t,256)}static int8(t){return Mt(t,-8)}static int16(t){return Mt(t,-16)}static int24(t){return Mt(t,-24)}static int32(t){return Mt(t,-32)}static int40(t){return Mt(t,-40)}static int48(t){return Mt(t,-48)}static int56(t){return Mt(t,-56)}static int64(t){return Mt(t,-64)}static int72(t){return Mt(t,-72)}static int80(t){return Mt(t,-80)}static int88(t){return Mt(t,-88)}static int96(t){return Mt(t,-96)}static int104(t){return Mt(t,-104)}static int112(t){return Mt(t,-112)}static int120(t){return Mt(t,-120)}static int128(t){return Mt(t,-128)}static int136(t){return Mt(t,-136)}static int144(t){return Mt(t,-144)}static int152(t){return Mt(t,-152)}static int160(t){return Mt(t,-160)}static int168(t){return Mt(t,-168)}static int176(t){return Mt(t,-176)}static int184(t){return Mt(t,-184)}static int192(t){return Mt(t,-192)}static int200(t){return Mt(t,-200)}static int208(t){return Mt(t,-208)}static int216(t){return Mt(t,-216)}static int224(t){return Mt(t,-224)}static int232(t){return Mt(t,-232)}static int240(t){return Mt(t,-240)}static int248(t){return Mt(t,-248)}static int256(t){return Mt(t,-256)}static int(t){return Mt(t,-256)}static bytes1(t){return oe(t,1)}static bytes2(t){return oe(t,2)}static bytes3(t){return oe(t,3)}static bytes4(t){return oe(t,4)}static bytes5(t){return oe(t,5)}static bytes6(t){return oe(t,6)}static bytes7(t){return oe(t,7)}static bytes8(t){return oe(t,8)}static bytes9(t){return oe(t,9)}static bytes10(t){return oe(t,10)}static bytes11(t){return oe(t,11)}static bytes12(t){return oe(t,12)}static bytes13(t){return oe(t,13)}static bytes14(t){return oe(t,14)}static bytes15(t){return oe(t,15)}static bytes16(t){return oe(t,16)}static bytes17(t){return oe(t,17)}static bytes18(t){return oe(t,18)}static bytes19(t){return oe(t,19)}static bytes20(t){return oe(t,20)}static bytes21(t){return oe(t,21)}static bytes22(t){return oe(t,22)}static bytes23(t){return oe(t,23)}static bytes24(t){return oe(t,24)}static bytes25(t){return oe(t,25)}static bytes26(t){return oe(t,26)}static bytes27(t){return oe(t,27)}static bytes28(t){return oe(t,28)}static bytes29(t){return oe(t,29)}static bytes30(t){return oe(t,30)}static bytes31(t){return oe(t,31)}static bytes32(t){return oe(t,32)}static address(t){return new Fe(Ei,"address",t)}static bool(t){return new Fe(Ei,"bool",!!t)}static bytes(t){return new Fe(Ei,"bytes",t)}static string(t){return new Fe(Ei,"string",t)}static array(t,e){throw new Error("not implemented yet")}static tuple(t,e){throw new Error("not implemented yet")}static overrides(t){return new Fe(Ei,"overrides",Object.assign({},t))}static isTyped(t){return t&&typeof t=="object"&&"_typedSymbol"in t&&t._typedSymbol===Gd}static dereference(t,e){if(Fe.isTyped(t)){if(t.type!==e)throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);return t.value}return t}}class pS extends Xi{constructor(t){super("address","address",t,!1)}defaultValue(){return"0x0000000000000000000000000000000000000000"}encode(t,e){let n=Fe.dereference(e,"string");try{n=he(n)}catch(r){return this._throwError(r.message,e)}return t.writeValue(n)}decode(t){return he(fr(t.readValue(),20))}}class mS extends Xi{coder;constructor(t){super(t.name,t.type,"_",t.dynamic),this.coder=t}defaultValue(){return this.coder.defaultValue()}encode(t,e){return this.coder.encode(t,e)}decode(t){return this.coder.decode(t)}}function fg(i,t,e){let n=[];if(Array.isArray(e))n=e;else if(e&&typeof e=="object"){let c={};n=t.map(l=>{const u=l.localName;return it(u,"cannot encode object for signature with missing names","INVALID_ARGUMENT",{argument:"values",info:{coder:l},value:e}),it(!c[u],"cannot encode object for signature with duplicate names","INVALID_ARGUMENT",{argument:"values",info:{coder:l},value:e}),c[u]=!0,e[u]})}else O(!1,"invalid tuple value","tuple",e);O(t.length===n.length,"types/value length mismatch","tuple",e);let r=new Nu,s=new Nu,a=[];t.forEach((c,l)=>{let u=n[l];if(c.dynamic){let h=s.length;c.encode(s,u);let f=r.writeUpdatableValue();a.push(d=>{f(d+h)})}else c.encode(r,u)}),a.forEach(c=>{c(r.length)});let o=i.appendWriter(r);return o+=i.appendWriter(s),o}function dg(i,t){let e=[],n=[],r=i.subReader(0);return t.forEach(s=>{let a=null;if(s.dynamic){let o=i.readIndex(),c=r.subReader(o);try{a=s.decode(c)}catch(l){if(en(l,"BUFFER_OVERRUN"))throw l;a=l,a.baseType=s.name,a.name=s.localName,a.type=s.type}}else try{a=s.decode(i)}catch(o){if(en(o,"BUFFER_OVERRUN"))throw o;a=o,a.baseType=s.name,a.name=s.localName,a.type=s.type}if(a==null)throw new Error("investigate");e.push(a),n.push(s.localName||null)}),Ni.fromItems(e,n)}class gS extends Xi{coder;length;constructor(t,e,n){const r=t.type+"["+(e>=0?e:"")+"]",s=e===-1||t.dynamic;super("array",r,n,s),Ft(this,{coder:t,length:e})}defaultValue(){const t=this.coder.defaultValue(),e=[];for(let n=0;n<this.length;n++)e.push(t);return e}encode(t,e){const n=Fe.dereference(e,"array");Array.isArray(n)||this._throwError("expected array value",n);let r=this.length;r===-1&&(r=n.length,t.writeValue(n.length)),Am(n.length,r,"coder array"+(this.localName?" "+this.localName:""));let s=[];for(let a=0;a<n.length;a++)s.push(this.coder);return fg(t,s,n)}decode(t){let e=this.length;e===-1&&(e=t.readIndex(),it(e*mn<=t.dataLength,"insufficient data length","BUFFER_OVERRUN",{buffer:t.bytes,offset:e*mn,length:t.dataLength}));let n=[];for(let r=0;r<e;r++)n.push(new mS(this.coder));return dg(t,n)}}class yS extends Xi{constructor(t){super("bool","bool",t,!1)}defaultValue(){return!1}encode(t,e){const n=Fe.dereference(e,"bool");return t.writeValue(n?1:0)}decode(t){return!!t.readValue()}}class pg extends Xi{constructor(t,e){super(t,t,e,!0)}defaultValue(){return"0x"}encode(t,e){e=dn(e);let n=t.writeValue(e.length);return n+=t.writeBytes(e),n}decode(t){return t.readBytes(t.readIndex(),!0)}}class xS extends pg{constructor(t){super("bytes",t)}decode(t){return _t(super.decode(t))}}class _S extends Xi{size;constructor(t,e){let n="bytes"+String(t);super(n,n,e,!1),Ft(this,{size:t},{size:"number"})}defaultValue(){return"0x0000000000000000000000000000000000000000000000000000000000000000".substring(0,2+this.size*2)}encode(t,e){let n=dn(Fe.dereference(e,this.type));return n.length!==this.size&&this._throwError("incorrect data length",e),t.writeBytes(n)}decode(t){return _t(t.readBytes(this.size))}}const vS=new Uint8Array([]);class bS extends Xi{constructor(t){super("null","",t,!1)}defaultValue(){return null}encode(t,e){return e!=null&&this._throwError("not null",e),t.writeBytes(vS)}decode(t){return t.readBytes(0),null}}const wS=BigInt(0),AS=BigInt(1),MS=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");class SS extends Xi{size;signed;constructor(t,e,n){const r=(e?"int":"uint")+t*8;super(r,r,n,!1),Ft(this,{size:t,signed:e},{size:"number",signed:"boolean"})}defaultValue(){return 0}encode(t,e){let n=bt(Fe.dereference(e,this.type)),r=Ir(MS,mn*8);if(this.signed){let s=Ir(r,this.size*8-1);(n>s||n<-(s+AS))&&this._throwError("value out-of-bounds",e),n=Em(n,8*mn)}else(n<wS||n>Ir(r,this.size*8))&&this._throwError("value out-of-bounds",e);return t.writeValue(n)}decode(t){let e=Ir(t.readValue(),this.size*8);return this.signed&&(e=tc(e,this.size*8)),e}}class ES extends pg{constructor(t){super("string",t)}defaultValue(){return""}encode(t,e){return super.encode(t,ii(Fe.dereference(e,"string")))}decode(t){return ec(super.decode(t))}}class So extends Xi{coders;constructor(t,e){let n=!1;const r=[];t.forEach(a=>{a.dynamic&&(n=!0),r.push(a.type)});const s="tuple("+r.join(",")+")";super("tuple",s,e,n),Ft(this,{coders:Object.freeze(t.slice())})}defaultValue(){const t=[];this.coders.forEach(n=>{t.push(n.defaultValue())});const e=this.coders.reduce((n,r)=>{const s=r.localName;return s&&(n[s]||(n[s]=0),n[s]++),n},{});return this.coders.forEach((n,r)=>{let s=n.localName;!s||e[s]!==1||(s==="length"&&(s="_length"),t[s]==null&&(t[s]=t[r]))}),Object.freeze(t)}encode(t,e){const n=Fe.dereference(e,"tuple");return fg(t,this.coders,n)}decode(t){return dg(t,this.coders)}}function Tl(i,t){return{address:he(i),storageKeys:t.map((e,n)=>(O(be(e,32),"invalid slot",`storageKeys[${n}]`,e),e.toLowerCase()))}}function jr(i){if(Array.isArray(i))return i.map((e,n)=>Array.isArray(e)?(O(e.length===2,"invalid slot set",`value[${n}]`,e),Tl(e[0],e[1])):(O(e!=null&&typeof e=="object","invalid address-slot set","value",i),Tl(e.address,e.storageKeys)));O(i!=null&&typeof i=="object","invalid access list","value",i);const t=Object.keys(i).map(e=>{const n=i[e].reduce((r,s)=>(r[s]=!0,r),{});return Tl(e,Object.keys(n).sort())});return t.sort((e,n)=>e.address.localeCompare(n.address)),t}function mg(i){return{address:he(i.address),nonce:bt(i.nonce!=null?i.nonce:0),chainId:bt(i.chainId!=null?i.chainId:0),signature:Ie.from(i.signature)}}function TS(i){let t;return typeof i=="string"?t=Ri.computePublicKey(i,!1):t=i.publicKey,he(Ge("0x"+t.substring(4)).substring(26))}function CS(i,t){return TS(Ri.recoverPublicKey(i,t))}const je=BigInt(0),RS=BigInt(2),PS=BigInt(27),IS=BigInt(28),NS=BigInt(35),LS=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),US=Symbol.for("nodejs.util.inspect.custom"),Cl=4096*32,Bo=128;function DS(i){return{blobToKzgCommitment:n=>{if("computeBlobProof"in i){if("blobToKzgCommitment"in i&&typeof i.blobToKzgCommitment=="function")return Zt(i.blobToKzgCommitment(_t(n)))}else if("blobToKzgCommitment"in i&&typeof i.blobToKzgCommitment=="function")return Zt(i.blobToKzgCommitment(n));if("blobToKZGCommitment"in i&&typeof i.blobToKZGCommitment=="function")return Zt(i.blobToKZGCommitment(_t(n)));O(!1,"unsupported KZG library","kzg",i)},computeBlobKzgProof:(n,r)=>{if("computeBlobProof"in i&&typeof i.computeBlobProof=="function")return Zt(i.computeBlobProof(_t(n),_t(r)));if("computeBlobKzgProof"in i&&typeof i.computeBlobKzgProof=="function")return i.computeBlobKzgProof(n,r);if("computeBlobKZGProof"in i&&typeof i.computeBlobKZGProof=="function")return Zt(i.computeBlobKZGProof(_t(n),_t(r)));O(!1,"unsupported KZG library","kzg",i)}}}function Hd(i,t){let e=i.toString(16);for(;e.length<2;)e="0"+e;return e+=qs(t).substring(4),"0x"+e}function Ks(i){return i==="0x"?null:he(i)}function Sc(i,t){try{return jr(i)}catch(e){O(!1,e.message,t,i)}}function FS(i,t){try{if(!Array.isArray(i))throw new Error("authorizationList: invalid array");const e=[];for(let n=0;n<i.length;n++){const r=i[n];if(!Array.isArray(r))throw new Error(`authorization[${n}]: invalid array`);if(r.length!==6)throw new Error(`authorization[${n}]: wrong length`);if(!r[1])throw new Error(`authorization[${n}]: null address`);e.push({address:Ks(r[1]),nonce:xe(r[2],"nonce"),chainId:xe(r[0],"chainId"),signature:Ie.from({yParity:ts(r[3],"yParity"),r:Gi(r[4],32),s:Gi(r[5],32)})})}return e}catch(e){O(!1,e.message,t,i)}}function ts(i,t){return i==="0x"?0:Xt(i,t)}function xe(i,t){if(i==="0x")return je;const e=bt(i,t);return O(e<=LS,"value exceeds uint size",t,e),e}function ie(i,t){const e=bt(i,"value"),n=qe(e);return O(n.length<=32,"value too large",`tx.${t}`,e),n}function Ec(i){return jr(i).map(t=>[t.address,t.storageKeys])}function OS(i){return i.map(t=>[ie(t.chainId,"chainId"),t.address,ie(t.nonce,"nonce"),ie(t.signature.yParity,"yParity"),qe(t.signature.r),qe(t.signature._s)])}function BS(i,t){O(Array.isArray(i),`invalid ${t}`,"value",i);for(let e=0;e<i.length;e++)O(be(i[e],32),"invalid ${ param } hash",`value[${e}]`,i[e]);return i}function kS(i){const t=Ba(i);O(Array.isArray(t)&&(t.length===9||t.length===6),"invalid field count for legacy transaction","data",i);const e={type:0,nonce:ts(t[0],"nonce"),gasPrice:xe(t[1],"gasPrice"),gasLimit:xe(t[2],"gasLimit"),to:Ks(t[3]),value:xe(t[4],"value"),data:_t(t[5]),chainId:je};if(t.length===6)return e;const n=xe(t[6],"v"),r=xe(t[7],"r"),s=xe(t[8],"s");if(r===je&&s===je)e.chainId=n;else{let a=(n-NS)/RS;a<je&&(a=je),e.chainId=a,O(a!==je||n===PS||n===IS,"non-canonical legacy v","v",t[6]),e.signature=Ie.from({r:Gi(t[7],32),s:Gi(t[8],32),v:n})}return e}function GS(i,t){const e=[ie(i.nonce,"nonce"),ie(i.gasPrice||0,"gasPrice"),ie(i.gasLimit,"gasLimit"),i.to||"0x",ie(i.value,"value"),i.data];let n=je;if(i.chainId!=je)n=bt(i.chainId,"tx.chainId"),O(!t||t.networkV==null||t.legacyChainId===n,"tx.chainId/sig.v mismatch","sig",t);else if(i.signature){const s=i.signature.legacyChainId;s!=null&&(n=s)}if(!t)return n!==je&&(e.push(qe(n)),e.push("0x"),e.push("0x")),Fi(e);let r=BigInt(27+t.yParity);return n!==je?r=Ie.getChainIdV(n,t.v):BigInt(t.v)!==r&&O(!1,"tx.chainId/sig.v mismatch","sig",t),e.push(qe(r)),e.push(qe(t.r)),e.push(qe(t._s)),Fi(e)}function Tc(i,t){let e;try{if(e=ts(t[0],"yParity"),e!==0&&e!==1)throw new Error("bad yParity")}catch{O(!1,"invalid yParity","yParity",t[0])}const n=Gi(t[1],32),r=Gi(t[2],32),s=Ie.from({r:n,s:r,yParity:e});i.signature=s}function HS(i){const t=Ba(Zt(i).slice(1));O(Array.isArray(t)&&(t.length===9||t.length===12),"invalid field count for transaction type: 2","data",_t(i));const e={type:2,chainId:xe(t[0],"chainId"),nonce:ts(t[1],"nonce"),maxPriorityFeePerGas:xe(t[2],"maxPriorityFeePerGas"),maxFeePerGas:xe(t[3],"maxFeePerGas"),gasPrice:null,gasLimit:xe(t[4],"gasLimit"),to:Ks(t[5]),value:xe(t[6],"value"),data:_t(t[7]),accessList:Sc(t[8],"accessList")};return t.length===9||Tc(e,t.slice(9)),e}function zS(i,t){const e=[ie(i.chainId,"chainId"),ie(i.nonce,"nonce"),ie(i.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),ie(i.maxFeePerGas||0,"maxFeePerGas"),ie(i.gasLimit,"gasLimit"),i.to||"0x",ie(i.value,"value"),i.data,Ec(i.accessList||[])];return t&&(e.push(ie(t.yParity,"yParity")),e.push(qe(t.r)),e.push(qe(t.s))),Pe(["0x02",Fi(e)])}function VS(i){const t=Ba(Zt(i).slice(1));O(Array.isArray(t)&&(t.length===8||t.length===11),"invalid field count for transaction type: 1","data",_t(i));const e={type:1,chainId:xe(t[0],"chainId"),nonce:ts(t[1],"nonce"),gasPrice:xe(t[2],"gasPrice"),gasLimit:xe(t[3],"gasLimit"),to:Ks(t[4]),value:xe(t[5],"value"),data:_t(t[6]),accessList:Sc(t[7],"accessList")};return t.length===8||Tc(e,t.slice(8)),e}function WS(i,t){const e=[ie(i.chainId,"chainId"),ie(i.nonce,"nonce"),ie(i.gasPrice||0,"gasPrice"),ie(i.gasLimit,"gasLimit"),i.to||"0x",ie(i.value,"value"),i.data,Ec(i.accessList||[])];return t&&(e.push(ie(t.yParity,"recoveryParam")),e.push(qe(t.r)),e.push(qe(t.s))),Pe(["0x01",Fi(e)])}function XS(i){let t=Ba(Zt(i).slice(1)),e="3",n=null,r=null;if(t.length===4&&Array.isArray(t[0])){e="3 (network format)";const a=t[1],o=t[2],c=t[3];O(Array.isArray(a),"invalid network format: blobs not an array","fields[1]",a),O(Array.isArray(o),"invalid network format: commitments not an array","fields[2]",o),O(Array.isArray(c),"invalid network format: proofs not an array","fields[3]",c),O(a.length===o.length,"invalid network format: blobs/commitments length mismatch","fields",t),O(a.length===c.length,"invalid network format: blobs/proofs length mismatch","fields",t),r=[];for(let l=0;l<t[1].length;l++)r.push({data:a[l],commitment:o[l],proof:c[l]});t=t[0]}else if(t.length===5&&Array.isArray(t[0])){e="3 (EIP-7594 network format)",n=Xt(t[1]);const a=t[2],o=t[3],c=t[4];O(n===1,`unsupported EIP-7594 network format version: ${n}`,"fields[1]",n),O(Array.isArray(a),"invalid EIP-7594 network format: blobs not an array","fields[2]",a),O(Array.isArray(o),"invalid EIP-7594 network format: commitments not an array","fields[3]",o),O(Array.isArray(c),"invalid EIP-7594 network format: proofs not an array","fields[4]",c),O(a.length===o.length,"invalid network format: blobs/commitments length mismatch","fields",t),O(a.length*Bo===c.length,"invalid network format: blobs/proofs length mismatch","fields",t),r=[];for(let l=0;l<a.length;l++){const u=[];for(let h=0;h<Bo;h++)u.push(c[l*Bo+h]);r.push({data:a[l],commitment:o[l],proof:Pe(u)})}t=t[0]}O(Array.isArray(t)&&(t.length===11||t.length===14),`invalid field count for transaction type: ${e}`,"data",_t(i));const s={type:3,chainId:xe(t[0],"chainId"),nonce:ts(t[1],"nonce"),maxPriorityFeePerGas:xe(t[2],"maxPriorityFeePerGas"),maxFeePerGas:xe(t[3],"maxFeePerGas"),gasPrice:null,gasLimit:xe(t[4],"gasLimit"),to:Ks(t[5]),value:xe(t[6],"value"),data:_t(t[7]),accessList:Sc(t[8],"accessList"),maxFeePerBlobGas:xe(t[9],"maxFeePerBlobGas"),blobVersionedHashes:t[10],blobWrapperVersion:n};r&&(s.blobs=r),O(s.to!=null,`invalid address for transaction type: ${e}`,"data",i),O(Array.isArray(s.blobVersionedHashes),"invalid blobVersionedHashes: must be an array","data",i);for(let a=0;a<s.blobVersionedHashes.length;a++)O(be(s.blobVersionedHashes[a],32),`invalid blobVersionedHash at index ${a}: must be length 32`,"data",i);return t.length===11||Tc(s,t.slice(11)),s}function qS(i,t,e){const n=[ie(i.chainId,"chainId"),ie(i.nonce,"nonce"),ie(i.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),ie(i.maxFeePerGas||0,"maxFeePerGas"),ie(i.gasLimit,"gasLimit"),i.to||ic,ie(i.value,"value"),i.data,Ec(i.accessList||[]),ie(i.maxFeePerBlobGas||0,"maxFeePerBlobGas"),BS(i.blobVersionedHashes||[],"blobVersionedHashes")];if(t&&(n.push(ie(t.yParity,"yParity")),n.push(qe(t.r)),n.push(qe(t.s)),e)){if(i.blobWrapperVersion!=null){const r=qe(i.blobWrapperVersion),s=[];for(const{proof:a}of e){const o=Zt(a),c=o.length/Bo;for(let l=0;l<o.length;l+=c)s.push(o.subarray(l,l+c))}return Pe(["0x03",Fi([n,r,e.map(a=>a.data),e.map(a=>a.commitment),s])])}return Pe(["0x03",Fi([n,e.map(r=>r.data),e.map(r=>r.commitment),e.map(r=>r.proof)])])}return Pe(["0x03",Fi(n)])}function KS(i){const t=Ba(Zt(i).slice(1));O(Array.isArray(t)&&(t.length===10||t.length===13),"invalid field count for transaction type: 4","data",_t(i));const e={type:4,chainId:xe(t[0],"chainId"),nonce:ts(t[1],"nonce"),maxPriorityFeePerGas:xe(t[2],"maxPriorityFeePerGas"),maxFeePerGas:xe(t[3],"maxFeePerGas"),gasPrice:null,gasLimit:xe(t[4],"gasLimit"),to:Ks(t[5]),value:xe(t[6],"value"),data:_t(t[7]),accessList:Sc(t[8],"accessList"),authorizationList:FS(t[9],"authorizationList")};return t.length===10||Tc(e,t.slice(10)),e}function YS(i,t){const e=[ie(i.chainId,"chainId"),ie(i.nonce,"nonce"),ie(i.maxPriorityFeePerGas||0,"maxPriorityFeePerGas"),ie(i.maxFeePerGas||0,"maxFeePerGas"),ie(i.gasLimit,"gasLimit"),i.to||"0x",ie(i.value,"value"),i.data,Ec(i.accessList||[]),OS(i.authorizationList||[])];return t&&(e.push(ie(t.yParity,"yParity")),e.push(qe(t.r)),e.push(qe(t.s))),Pe(["0x04",Fi(e)])}class Qn{#t;#e;#n;#i;#r;#a;#s;#o;#f;#l;#m;#p;#d;#u;#h;#c;#y;#x;get type(){return this.#t}set type(t){switch(t){case null:this.#t=null;break;case 0:case"legacy":this.#t=0;break;case 1:case"berlin":case"eip-2930":this.#t=1;break;case 2:case"london":case"eip-1559":this.#t=2;break;case 3:case"cancun":case"eip-4844":this.#t=3;break;case 4:case"pectra":case"eip-7702":this.#t=4;break;default:O(!1,"unsupported transaction type","type",t)}}get typeName(){switch(this.type){case 0:return"legacy";case 1:return"eip-2930";case 2:return"eip-1559";case 3:return"eip-4844";case 4:return"eip-7702"}return null}get to(){const t=this.#e;return t==null&&this.type===3?ic:t}set to(t){this.#e=t==null?null:he(t)}get nonce(){return this.#i}set nonce(t){this.#i=Xt(t,"value")}get gasLimit(){return this.#r}set gasLimit(t){this.#r=bt(t)}get gasPrice(){const t=this.#a;return t==null&&(this.type===0||this.type===1)?je:t}set gasPrice(t){this.#a=t==null?null:bt(t,"gasPrice")}get maxPriorityFeePerGas(){const t=this.#s;return t??(this.type===2||this.type===3?je:null)}set maxPriorityFeePerGas(t){this.#s=t==null?null:bt(t,"maxPriorityFeePerGas")}get maxFeePerGas(){const t=this.#o;return t??(this.type===2||this.type===3?je:null)}set maxFeePerGas(t){this.#o=t==null?null:bt(t,"maxFeePerGas")}get data(){return this.#n}set data(t){this.#n=_t(t)}get value(){return this.#f}set value(t){this.#f=bt(t,"value")}get chainId(){return this.#l}set chainId(t){this.#l=bt(t)}get signature(){return this.#m||null}set signature(t){this.#m=t==null?null:Ie.from(t)}isValid(){const t=this.signature;if(t&&!t.isValid())return!1;const e=this.authorizationList;if(e){for(const n of e)if(!n.signature.isValid())return!1}return!0}get accessList(){const t=this.#p||null;return t??(this.type===1||this.type===2||this.type===3?[]:null)}set accessList(t){this.#p=t==null?null:jr(t)}get authorizationList(){const t=this.#y||null;return t==null&&this.type===4?[]:t}set authorizationList(t){this.#y=t==null?null:t.map(e=>mg(e))}get maxFeePerBlobGas(){const t=this.#d;return t==null&&this.type===3?je:t}set maxFeePerBlobGas(t){this.#d=t==null?null:bt(t,"maxFeePerBlobGas")}get blobVersionedHashes(){let t=this.#u;return t==null&&this.type===3?[]:t}set blobVersionedHashes(t){if(t!=null){O(Array.isArray(t),"blobVersionedHashes must be an Array","value",t),t=t.slice();for(let e=0;e<t.length;e++)O(be(t[e],32),"invalid blobVersionedHash",`value[${e}]`,t[e])}this.#u=t}get blobs(){return this.#c==null?null:this.#c.map(t=>Object.assign({},t))}set blobs(t){if(t==null){this.#c=null;return}const e=[],n=[];for(let r=0;r<t.length;r++){const s=t[r];if(bh(s)){it(this.#h,"adding a raw blob requires a KZG library","UNSUPPORTED_OPERATION",{operation:"set blobs()"});let a=Zt(s);if(O(a.length<=Cl,"blob is too large",`blobs[${r}]`,s),a.length!==Cl){const l=new Uint8Array(Cl);l.set(a),a=l}const o=this.#h.blobToKzgCommitment(a),c=_t(this.#h.computeBlobKzgProof(a,o));e.push({data:_t(a),commitment:_t(o),proof:c}),n.push(Hd(1,o))}else{const a=_t(s.data),o=_t(s.commitment),c=_t(s.proof);e.push({data:a,commitment:o,proof:c}),n.push(Hd(1,o))}}this.#c=e,this.#u=n}get kzg(){return this.#h}set kzg(t){t==null?this.#h=null:this.#h=DS(t)}get blobWrapperVersion(){return this.#x}set blobWrapperVersion(t){this.#x=t}constructor(){this.#t=null,this.#e=null,this.#i=0,this.#r=je,this.#a=null,this.#s=null,this.#o=null,this.#n="0x",this.#f=je,this.#l=je,this.#m=null,this.#p=null,this.#d=null,this.#u=null,this.#h=null,this.#c=null,this.#y=null,this.#x=null}get hash(){return this.signature==null?null:Ge(this.#g(!0,!1))}get unsignedHash(){return Ge(this.unsignedSerialized)}get from(){return this.signature==null?null:CS(this.unsignedHash,this.signature.getCanonical())}get fromPublicKey(){return this.signature==null?null:Ri.recoverPublicKey(this.unsignedHash,this.signature.getCanonical())}isSigned(){return this.signature!=null}#g(t,e){it(!t||this.signature!=null,"cannot serialize unsigned transaction; maybe you meant .unsignedSerialized","UNSUPPORTED_OPERATION",{operation:".serialized"});const n=t?this.signature:null;switch(this.inferType()){case 0:return GS(this,n);case 1:return WS(this,n);case 2:return zS(this,n);case 3:return qS(this,n,e?this.blobs:null);case 4:return YS(this,n)}it(!1,"unsupported transaction type","UNSUPPORTED_OPERATION",{operation:".serialized"})}get serialized(){return this.#g(!0,!0)}get unsignedSerialized(){return this.#g(!1,!1)}inferType(){const t=this.inferTypes();return t.indexOf(2)>=0?2:t.pop()}inferTypes(){const t=this.gasPrice!=null,e=this.maxFeePerGas!=null||this.maxPriorityFeePerGas!=null,n=this.accessList!=null,r=this.#d!=null||this.#u;this.maxFeePerGas!=null&&this.maxPriorityFeePerGas!=null&&it(this.maxFeePerGas>=this.maxPriorityFeePerGas,"priorityFee cannot be more than maxFee","BAD_DATA",{value:this}),it(!e||this.type!==0&&this.type!==1,"transaction type cannot have maxFeePerGas or maxPriorityFeePerGas","BAD_DATA",{value:this}),it(this.type!==0||!n,"legacy transaction cannot have accessList","BAD_DATA",{value:this});const s=[];return this.type!=null?s.push(this.type):this.authorizationList&&this.authorizationList.length?s.push(4):e?s.push(2):t?(s.push(1),n||s.push(0)):n?(s.push(1),s.push(2)):(r&&this.to||(s.push(0),s.push(1),s.push(2)),s.push(3)),s.sort(),s}isLegacy(){return this.type===0}isBerlin(){return this.type===1}isLondon(){return this.type===2}isCancun(){return this.type===3}clone(){return Qn.from(this)}toJSON(){const t=e=>e==null?null:e.toString();return{type:this.type,to:this.to,data:this.data,nonce:this.nonce,gasLimit:t(this.gasLimit),gasPrice:t(this.gasPrice),maxPriorityFeePerGas:t(this.maxPriorityFeePerGas),maxFeePerGas:t(this.maxFeePerGas),value:t(this.value),chainId:t(this.chainId),sig:this.signature?this.signature.toJSON():null,accessList:this.accessList}}[US](){return this.toString()}toString(){const t=[],e=r=>{let s=this[r];typeof s=="string"&&(s=JSON.stringify(s)),t.push(`${r}: ${s}`)};this.type&&e("type"),e("to"),e("data"),e("nonce"),e("gasLimit"),e("value"),this.chainId!=null&&e("chainId"),this.signature&&(e("from"),t.push(`signature: ${this.signature.toString()}`));const n=this.authorizationList;if(n){const r=[];for(const s of n){const a=[];a.push(`address: ${JSON.stringify(s.address)}`),s.nonce!=null&&a.push(`nonce: ${s.nonce}`),s.chainId!=null&&a.push(`chainId: ${s.chainId}`),s.signature&&a.push(`signature: ${s.signature.toString()}`),r.push(`Authorization { ${a.join(", ")} }`)}t.push(`authorizations: [ ${r.join(", ")} ]`)}return`Transaction { ${t.join(", ")} }`}static from(t){if(t==null)return new Qn;if(typeof t=="string"){const n=Zt(t);if(n[0]>=127)return Qn.from(kS(n));switch(n[0]){case 1:return Qn.from(VS(n));case 2:return Qn.from(HS(n));case 3:return Qn.from(XS(n));case 4:return Qn.from(KS(n))}it(!1,"unsupported transaction type","UNSUPPORTED_OPERATION",{operation:"from"})}const e=new Qn;return t.type!=null&&(e.type=t.type),t.to!=null&&(e.to=t.to),t.nonce!=null&&(e.nonce=t.nonce),t.gasLimit!=null&&(e.gasLimit=t.gasLimit),t.gasPrice!=null&&(e.gasPrice=t.gasPrice),t.maxPriorityFeePerGas!=null&&(e.maxPriorityFeePerGas=t.maxPriorityFeePerGas),t.maxFeePerGas!=null&&(e.maxFeePerGas=t.maxFeePerGas),t.maxFeePerBlobGas!=null&&(e.maxFeePerBlobGas=t.maxFeePerBlobGas),t.data!=null&&(e.data=t.data),t.value!=null&&(e.value=t.value),t.chainId!=null&&(e.chainId=t.chainId),t.signature!=null&&(e.signature=Ie.from(t.signature)),t.accessList!=null&&(e.accessList=t.accessList),t.authorizationList!=null&&(e.authorizationList=t.authorizationList),t.blobVersionedHashes!=null&&(e.blobVersionedHashes=t.blobVersionedHashes),t.kzg!=null&&(e.kzg=t.kzg),t.blobWrapperVersion!=null&&(e.blobWrapperVersion=t.blobWrapperVersion),t.blobs!=null&&(e.blobs=t.blobs),t.hash!=null&&(O(e.isSigned(),"unsigned transaction cannot define '.hash'","tx",t),O(e.hash===t.hash,"hash mismatch","tx",t)),t.from!=null&&(O(e.isSigned(),"unsigned transaction cannot define '.from'","tx",t),O(e.from.toLowerCase()===(t.from||"").toLowerCase(),"from mismatch","tx",t)),e}}function Xr(i){return Ge(ii(i))}var JS="AEkVMQnvDV0B0wKWAQYBQgDpATQAoQDcAIUApwBsAOMAcACTAEUAigBRAHkAPgA/ACwANwAoAGIAHgAvACsAJQAXAC8AHAAhACIALwAVACsAEQAiAAsAGwARABgAFwA7ACoAKwAsADQAFgAtABIAHAAhAA4AHQAdABUAFgAZAA0ADgAXABAAGQAUABIEtAYQASIUOjfDBdMAsQCuPwFnAKUBA10jAK5/Ly8vLwE/pwUJ6/0HPwbkMQVXBVgAPSs5APa2EQbIwQuUCkEDyJ4zAsUKLwKOoQKG2D+Ob4kCxcsCg/IBH98JAPKtAUECLY0KP48A4wDiChUAF9S5yAwLPZ0EG3cA/QI5GL0P6wkGKekFBIFnDRsHLQCrAGmR76WcfwBbBpMjBukAGwA7DJMAWxVbqft7uycM2yDPCLspA7EUOwD3LWujAKF9GAAXBCXXFgEdALkZzQT6CSBMNwmXCYgeG1ZZTOODQgATAAwAFQAOa1QAIQAOAEfuFdg98zlYypXmLgoQHV9NWD3sABMADAAVAA5rIFxAlwDD6wAbADkMxQAbFVup+3EB224cHQVbBeIC0J8CxLAKTBykZRRzGm1M9QC7DWcC4QALLTSJF8mRAoF7ARMbAL0NZwLhAAstAUhQJZFMCgMt+wUyCddpF60B10MASSsSdwIxFiEC6ye5N2sAOeEB9SUAxw7LtQEbY4EAsQUABQCK00kFG8MfBxcAqCfRAaErLQObAGcBChk+7Td0BBgXAKoBxwIhANMrEnM681CwBZA6dyc1SAX6JwVZBVivuAVpO11CEjpYQZd7k2ZfofgLEwPFByXxdyMEo0sCU1MCdRurJwGPo6U1WwNFFwSDYQkA0QarPy8jBykCOV0AawFhH3EAgx0ZAJUBSbcAJ2kXAa/FAzctIUNTAW9ZBmUCZQDxSRcDKQEFAElBAKsAXQBzACu1Bgfz7xmNfwAJIQApALMbRwHRAdsHCzGXeIHoAAoAEQA0AD0AODN3edPAEF8QXAFNCUxsOhULAqwPpgvlERUM0SrL09gANKkH6wNTB+sDUwNTB+sH6wNTB+sDUwNTA1MDUxwK8BrTwBBfD0gEbQWOBYsE1giDJkkRgQcoCNJUDXQeHEcDRQD8IyVJHDuTMwslQkwMTQMH/DZCbKd9OANHMatU9ZCiA8syTzlsAR5xEqAAKg9zHDW1Tn56R3GgCktPrrV/SWJOZwK+Oqg/+AohCZNvu3dOBj0QFyehEPMMLwGxATcN6UvUBO0GNwTFH3kZFQ/JlZgIoS3ZDOkm3y6dgFYj8Sp/BelL8DzZC0lRZA9VC2EJ3zpfgUoDHQEJIocK2Q01CGkQ7wrFZw3hEUEHNQPRSZYAoQb9Cw0dMRWxJgxiqAsFOXMG9xryC4smqxMlevgFzxodBkkBJRr7AMsu44WsWi1cGE9bBf8LISPDFKRQHA0hQLN4RBoXBxElpQKNQ2xKg1EyHo8h8jw5DWIuD1F4B/E8ARlLC308mkanRQoRzj6JPUQiRUwoBDF7LCsnhwnLD4EMtXxuAVUJHQmtDG0TLRETN8EINQcVKZcgJxEIHUaRYJYE85sD7xPNAwcFOwk9Bw8DsRwpEyoVJQUJgSDTAu820S6vAotWfAETBccPIR/bEExH3A7lCJcCYQN/JecAKRUdABMilwg/XwBbj9RTAS7HCMNqaCNwA2MU410RbweNDlMHoxwvFbsc3XDEXgeGBCifqwlXAXEJlQFbBN8IBTVXjJwgPWdPi1QYlyBdQTtd+AItDGEVm0S5h3QChw9nEhcBMQFvBzUM/QJzEekRZxCRCOeGADWxM/Q6IQRLIX8gDQojA0tsygsjJvUM9GUBnxJeAwg0OXfqZ6dgsiAX+QcVMsFBXCHtC45PyQyYGr0YPlQqGeAHuwPvGu8n5kFTBfsDnw86STPqBLkLZQiHCTsARQ6fEwfTGGYKbYzMAS2HAbOVA1ONfwJriwYzBwcAYweDBXXhABkCowifAAEAywNTADUCqQeZABUAgT0BOQMjKwEd4QKLA48ILccBkSsB7yUEF78MEQDzM25GAsOtAoBmZp4F2VQCigJFMQFJIQQBSkNNA6tt3QDXAEcGD9tDARGnRscW3z8B22snAMMA9wABMQcBPQHJAe9pALMBWwstCZ6vsQFJ5SUAfwARZwHTAoUA2QAxAHvtAU8ASQVV9QXPAktFAQ0tFCdTXQG3AxsBLwEJAHUGx4mhxQMbBGkHzwIQFxXdAu8qB7EDItsTyULBAr3aUQAyEgo0CrUKtB9f81wvAi1uPUwACh+kPsM/SgVNO087VDtPO1Q7TztUO087VDtPO1QDk7veu94KaF9BYecMog3QRMQ6RRPXYE1gLhPELbMUvRXKJVIZORq4JwEl4FUFDwAtz2YsCCg0cRe4ADspZIM9Y4IeLApHHONTjVT0LRcArUueM6sNqBsRRDwFQ3XpYiYWCgoeAmR9AmI+V0mrVzccAqHzAmiUAmYFAp+AOBcHAmY3AmYiBGoEewN/DwN+jjkCOXMTOX46Hx8CbBkCMjI4BgJtwwJtquuGL2NBJwFjANoA3QBGAQeUDIkA+ge+AAmxAncrAnaeOwJ5Rz8CeLYZWNdFqkbTAnw7AnrEAn0FAnzsBVUFHEf8SHlfIAAnEUlUSlcRE0rIAtD9AtDISyMDiEsDh+JEwZEuAvKdXP8DA6pLykwpIctNSE2rAos7AorUvRcDGT9jAbMCjjMCjlg8k30CjtUCjlh0UbBTMQZS0FSBApP3ApMIAOUAGFUaVatVzAIsFymRgjLdeGJFNzUCl5sC765YHaQAVSEClosClniYAKVZqFoFfUkANwKWsQKWSlxAXM0CmccCmWBcxl0DFQKclzm+OpkCnBICn5cCnrSGABkLLSYLAp3tAp6OALE5YTBh6wKezwKgagGlAp6bGwKeSqFjxGQjIScCJ6sCJnoCoPcCoEgCotkCocACpisCpcoCp/sAeQKn7mh4aK3/RWoYas0CrN8CrKoCrWMCrP4CVxkCVdgCsd3TAx9KbJMCsrkJArLkE2zcbV9tRFsDJckCtlg3O26MAylBArhaArlDEQK5JnNwMnDdAr0VArvWcJIDMg0CvoRx/gMzbQK+FnMec0sCw8cCwwBzfnRHMUF03AM8owM8lgM9uwLFeALGQwLGDIUCyGVNAshAAslLAskqAmSZAt3OeHVdeKp5IUvMAxifZv4CYfAZ75Ugewdejl63DQLPZwLPaCtHT87vD5sAwqkCz28BJeYDTg5+RwEC3CMC24YC0ksDUlgDU1sA/QNViICFO8cS6VxBghiCz4LKg4kC2sMC2dqEDIRFpzgDhqEAKwNkCoZtVfUAUQLfYQLetG9zAuIr7RAB8ywjAfSXAfLOgwLr7wLpbHUC6vUC6uAA9UMBtQLuhQLrmJamlv8C7jsDhdyYdXDccZ0C8v8AZQOOEpmPAvcPA5FqA5KDAveUAvnVAvhimhiap7czmxoDnX8C/vYBFwA1nxifrwMFiQOmZgOm1QDNwQMGZqGEogEFAwxFAQsBGwdpBl21YwEAtwRnuw2HHq8JABNxNQAfAy8SSQOFewFfIx0AjOsAHQDmnwObjQizBhufwQCnBRG76R09PhZ4BWg3PkArQiFCtF9xEV+8AJbFBTIAkEwZm7k7JmAyEbrPDi8YxhiJyfYFVwVYBVcFWAVjBVgFVwVYBVcFWAVXBVgFVwVYRhUI14VnAgICCmRe6SsEyQOxBi+7uwC7BKe7AOdAKRayBUY+aT5wQj9Ctl91N1/oAFgRM6sAjP7Ma8v8pudGej0mIwQrFic2NX5t32rB8RnCLGkBa9duMBcFXwVqycHJuAjPSVsAAAAKfF59i74AMz+BAAMW0QblrSMFAIzDCwMBDQDlZR09JB9KQrFCvEE4I18nYDYnOCMJwT0KRD9DPng+gT5wPnECiUK8SUI7X8tOT2pNCixrVC9qC24fX+AzOhsJZ5sKYiMrPB0mQqtCvCvMAcv8X8kOHy4JCAkifp3fajotShfJq8msCWXBy8wKYEFfD+UQoxEAk40dRUIlG6ltOc44CjM/Qz5wQj8cBwodTEdsWywtWuG8Egp97R0rQj8cXQhKCQ4zVENCNwQ7Q5wsCoEbLUI/G/UIUyIjGDAxAAWPYfBeCnFkyWALYC0jbkNgGTkCGx5gswYCaxBlTmBNEQFk52AVYJVgfWCzYEtgkWgWFwa1DtxVqbxaC0MWqwG7K83BAh8VABwDHgF5AmwvMJVSgAGKCrhHGgDkI3SOCsoNpk3qAZsCh5xPBUBfAPf3BwA0FlcMC6UMJB+6r0eAgQw0ABUTnyuCCHoC0gtLZREbANhOBnUECh5aADEAtritAJQnCxZvqyQ4nxkBWwGGCfwD2e0PBqoGSga5AB3LValaCbthE4kLLT8OuwG7ASICR1ooKCggHh8hLBImBiEMjQBUAm5XkEmVAW4fD3FHAdN1D85RIBmpsE3qBxEFTF8A9/cHAHoGJGwKKwulODAtx69WDQsAX7wLAGNAlQh6AOpN7yIbvwAxALa4rQCUJy07Ds4CkBh7ULtYyHRyjsOlmw/ZFUkb7AEpEFwSBh/lAccJOhCTBQ8rDDYLABEAs+AiAQIApADhAJiCCrJrOS8AFABbG8YubHYqDcEQAjskHNPhHB4LG30CewTBCqrxbAAnLQ6mLs6hHAe7CQAQOg+7GkcczaF3HgE9Kl8cLs4RGQB9q9ocAuugCAHCAULz5B9lAb4Jtwz6CDwKPgAFwAs9AksNuwi8DTwKvAk8DrsFmAEbawouzqEqD4sa4QHDAREWOwCgCzsLuxC7BBiqe9wAO2sMPAACpgm8BRvQ9QUBvgH6bsoGewG7D00RErwBAQDqAQAAdBVbBhbLFPxvF7sYOxjbL7ZtvgNIqLsAB7sALrsC6w5WAAq7BAAeuwJVICp/FTwVuwG+J+QAsloBvSjgo7vIAAFbAAG7AAJbAALjAAg7AA67AgAbu6VbDr/EAPQAaPuoOwMBu5UnSwDn3Rm7CBp7CKEFCv9wAN+7p7sau6OLeXIG+6mbgwASuwYbCwG8AACGAG27BgALu6c7ARo7ugihnMoBuwvtB8CpOwDhewG/AADlABW7AAb7AAm7AGmLABq7GLuOaRX7AA5rAC5LHgAGuwAXuwghAA1KAcIAt68mAcAAALQADpsAHBsBv/7hCqEABcYLFRXbAAebAEK7AQIAabsAC3sAHbsACLsJoQAFygBunxnVAJEIIQAFygABOwAH2wAdmwghAAaaAAl7ABsrAG0bAOa7gAAIWwAUuwkhAAbKAOOLAAk7C6EOxPtfAAc7AG6cQEgARwADOwAJrQM3AAcbABl7Abv/Aab7AAobAAo7AAn7p+sGuwAJGwADCwAQOwAIPAAUOwARawAPiwAN6wANuwAZCwYWGwAVOwBumxm7ALobLgATOwMAaSsKAOFLAAI7AARSABd7BRsABtAAGLsAC/sAX7sAa/sA5IsBuwAXdgG8AAFyC6EABUoAbXYAB/sA5XsAHGseAXsoUgA5RQD+Bw0McgAoKnABpAUIXgG8XiMMCQdvS2xfKokfPBRiLTYDoQq0AdgAFgLRA24BdnJHUhQhA08CFT4BLAYDc0a8e1J6QAApADEB+wBTCtsAe5AsASsAduUNETJGAUoAVwUAAVABB4rMAHg7BCClAFoA1hUAlWg3H4sAzWuxAM/UFgjCdXMbGFYdCdEBiJCrIlNTTUgSPMKJ+QB/HDdAKSvgEZdPAHIBKSwwKUIZDwMwVQT3xe4AS2XcAGoCcQI/EXo6x3guNdUGBQAQGx0KCAwqBB8dKU5TTgi5ugAKEs0AJgABGgCGAIkAjjUA7gC0AOAAnTwAuwCrAKYAoQDyAJ8A0wCcAOsBDAEHAMAAeQBaAMsAzQEHANcA6wCIAKIBNQDjANgA1QMBByoz1NTU1LbA3M3QzkMyFwFNAVcvRwFVAWQBYwFWAUdLQ0VoDQFOFQcIAzI2DAcAIg0kJiksODo6PT09Pj8OQB5RUVFRU1NSUylUVVdWVhxdYWFgYmEjZmhwb3JycnJycnR0dHR0dHR0dHR0dnZ3dnVbAEDsAEUAlgB0AC4AYvIAigBTAFMAMwJz6QCH//LyAGAAj+wAmwBLAF4AYPn5qgCBAIEAZQBSAK0AHgCyAH8CPAI/APgA4wD6APoA5AD7AOUA5QDkAOIAKQJ3AU0BPAE6AVABOgE6AToBNQE0ATQBNAEYAVQPACsIAABNFwoWAxUWDgCKAJIAogBLAGQYAi0AcABpAJEDEgMkKgMeQT5HKQCLAksAwwJTAqAAugKSApICkgKSApICkgKHApICkgKSApICkgKSApECkQKUApwCkwKSApICkAKQApACkAKOApECcQHQApMCmwKSApICkRZ5CwD6BQOnAl0CNhcBUBA1At4RCisTAUo3E02RAXekPAFlWQD/Az1HAQAAkykeGI9qAClgAGkALgCJA5TMi/CuhFoFuisOwhEBndV0KgsEIzFsATNabAGyAN5+gH9+gH6BgoJ+g4aEfoWIhoCHgoiCiX6Kfot+jIqNfo5+j4KQfpF+kn6TfpSDlYiWgpd+2gLabOEC2GwAgmwkbKAAg2xsBEkERgRIBEsESQRPBEwERwRNBE8ETgRKBEwETwCWZmwAowOIbAC0ZgEFbADJUWxsAM9sAgxsAPZabAD2ARkA9gD0APQA9QD0A31ebNSEI2XAAPYA9AD0APUA9BxsbACJWmwA9gCJARkA9gCJAL4A6AAIAPYAiQN9XmzUhCNlwBxsAPdabAEZAPYA9gD0APQA9QD0APcA9AD0APUA9AN9XmzUhCNlwBxsbACJWmwBGQD2AIkA9gCJAu0A9gCJAL4CNwD3AIkDfV5s1IQjZcAcbAJDATZsAkoBOWwCS8FsbAJXbGwDnwLtA58DnwOgA6ADoAOg1IQjZcAGA31ebBxsbACJWmwBGQOfAIkDnwCJAu0DnwCJAL4CNwOfAInUhCNlwAYDfV5sHGwEPmwAiQQ/AIkGjTFtIDFs1m4DKGwDrAJsbABVWv4VMgJsbACJAmwAVAEAul5sAmxebGwAiV5sAmxebD3YAEls1gJsbEbCxxP/x5BApA0KYFA89AsjTx97EHmJQPyocItC2JnNFRCEnFU6SFTDoI0PxeRNRoNRWkpzVnWW8pTagkNmgf+jGupqZ3eu50LAFnc+OzfJwdub1AdpOy76VnijWNR/CMEevikQkFyQuLuPajxWi9chqOoMJ7qpCN4sx3LJG4Myu8kD68wC6+iAwt+pU1JEeY13rpCVkXSZfinVKn4xZpxsI3Lp8bJLrJ9ujkrIalMRBAcv/GSKEtowzcEn5XmJw2BagB8V2UWJoJHZ14SXhM7p0XeGFOuw6mlvyq99WYp5XxrO6ru9nn4RHcOkJ7hx5UqWtman7yVMLzYXQefQRUdIY70RYQE8+aAzCNSGQkXiHfnHYRMi+xczKDdZLk3AV1gzxkkSHLjBwuq8shIJ+/RAbqjqQbugFhe0rqklu432EERkM5k9y1DXzds46oLqKAx6OhPT2WiqEfhaITn7OF9Y694AmKmUvbpWp0xJqDaf3jeNJXnK6NpnGcFOmbclbARC+5+5U52ufw5b0Hh+2LrrNimvZe4eYmApRsZnJE310SqB+1xB6rSJfnV1f2D0awB18Oc0sXAFqIlgHgWiaZGdvP5CJUSsCTCQUC335+iSkwPlLJJ5lwjTSn9Lw22NbK1Tu8w+bUpHtDRDPho7Gun8aw2Jzu9i+N0Ot/kPMbLAb/rUQ82kfpk85qLDkfxLl39QPDngo72GYh/Xigbpcm1pA23D2ywt3D8GgMOao040wDqkHxOEx0OhC+ZmHiIdjK7yRbfJD2ouZbAedhD3p7s8WDmCJfNforgDYPGAXSI08fTjPZ5B37lc5VXGzc1vJmibDwBNVzXuaUzg7N5H4BxqjhJ+kz9HLUJys7bpBDYAPvbut13AwJCWd059tS8YTYgC8HwrkewBfa1LSSpmMr9uR2EekTiAMH+Mx4AGzgbquccwBDlLmRhgXL/YiLPCEb6d2k5qJ6o800qddABkpqt7NG+sc2uvHZwZs57W1AHTFM1KkMShasADAh2FvzbzJOzVDMS3ZlT2BSFKdnkZFB6JyqJbhm6XANis9TrtzJdlPVp+rl8v3nIke6Jou7m2TKu53Vounupgkz2LzrQPhhatLIG7rfF/gUKWp15X3LKt+ZvuCDSqPUigF9yJntimC1HJR7Yj/dUrLAXWrT+1tnwPJJLGKAlQ5VeNDWRKCTt2vz3rJuo4+gIt75/Mkfl/gSZblZ9r/SEeeosZXneli/xNh1WVCvkRt2RnyyjtMkMqhzXh1PVOCbILqv0r7rGYm0CHIyKdhHL90cl9E1I6eEtQTCt6RXj8M0HHrHCHLVRpNM6WIbT5BCMGVnL0o5895qSRbCJz+5I8PGMhAN/Xrj4BgIdlKqlHtBHqTJwmK169toZ2IWxNzrAbIG7zh85Q/LG2A4yBcaBel52zdunokB0lv3A7kXnTI7M6ZnfZ7nwuj5lkGhqSpW+w5CI/FmRlplBEbnZy1ZxS3DL8rf1YWhO5XivWZBSRh1gFsjjyj3qRG1cm/6ors7WsEif6WRxns1MKDZa6KrbfMQ/swIb+2nb0tqxHeii6FcgVeAjE/Xwac1owx04dJKG8R5YQgHNnEfHf0qb8WOnU0eQSjazq+IK7cSuCqYzPEUB/x+QgGZqM3dBoYvNvZVOHDkbgdilWdagqO5bkybXfLpyMPuGq8mvAAEZGbR6RwXGlW9ErOWTfnjfx6dXFJqBj0OBSGFz4lWQasNOmVJeN4SFWSLfOGB/7ehV5YuoNNROHZEG9ElVuMnqbDMMuDleOt/cN/gsWxGw128mwU8/HxkOKqdTZnI7dHka67WCTf/FmBrxpNCaKJ1GxBTCSS7MNfhNj8S4Gtotg6Z3AM9cAeVROnppUMaiV5jjudLnNqoVrKO1/FijLlAc74kxydxKX1RQuMqHR63eecYr5o6MJ+B78VsLlCrpelWh6GOrCOBIoQmIcdpJL1pwE2zzZqBkecGTdK8KMOB6r1eNRURyrz6M899TZaoS/vNOxHf+5gORU+OyYIcIW6diP25GHF6u8TNjuL/GJzCnLLXd01KrsjRa51v4+O/VIAWXESJxfxWjv628J+cWUQpoD+Yytzs3jSMRJ23/XT+vUdtUMLDQq1vnIoeg/GjWh88MT6k9dRqDaQ+vodilFgvjuNw5pJpId9mfwyYeLCGb3BmHXdfQfhfPRQaupe/f8TG4Bk3eDKlYBaEK3kZYNN2Sdxz47m/vYBxvIOKtnqplB1pebzuXmAr/MuzQCknKe653dzaWQQ7MUhWYWvzIZwLe1v0rXxImLaz+AkAu+sYikhouNF3EW6w4crZ6MuUiDbIAx8XhAfegcvW6x9BPb3/sCxGWu9YyatqExB+TSm69qIkI9IwhjrcnzME+jWBx4mNQm5WwLzUjSyY4FZ0aMF5YFlXUD4hL4XfOeYv5rDe2s2D/Cn+28fZ9UCnOQvXFMnQqfc0G+ZqOWWD9l/liqUPaNQzZjxCHpUAD8Rcc90MniQ02ugHWsUupFUvhC9usY7zNPt5F2jO7qgzhafsQSd50jgLrC6Qx6bpHbXR3WNAu1BzGmwbz+ebGmwTjdy006Y6zipP7n/OJlvSmbq+SY+nefAVKK6EBMPbce5n3IdRI8+vbxCpN53rw3TvgNds1SuMiuLGxt89L71mxPDeanGhyHvOjmO56tnVpoHalQnL6TqNuqKsHjHCIKB4pCgj4WyYPvRvYvqi5EMr7lN3MotPR/KH7JUD1lZbU0QzfbrEBJnuQiVAyAC9vwXWp2TRU1/0aapyAH2cbglEHVAdl+1rb1u147uV0td1eNoQZsqHrIMIYVPXtLk2TIU3cJE08PjoYNDpfF/IcJnYQHl6nsplczX3Rgah4NbJJHl//5scUufqsSd//kbIS406ZWoMP//+jhGUswX/5nVNz/jAj9KmXPtAmMiK+khhbn1w/mELzZMT/WxcW//y/jsHaOM/61oAW/CjYhJtY622/TtMYuP7bilBvbiT3vB9n8IcFPnwM78H0KfhYDRdY5PhWJ4jWRQzB+HT5NVZV56LG82hcQms+jOTT/c9Y9sx5rPi1/wB7f/+c5UfUCKk3iwwCuywUc2MGnAwsXf1E5hoI55x1Q/Qby+sWH8NRjavZ8VaDsdi1NUVhH86BJHX1yaFt1w1OYeL5LVmdN+5Q+KuTvXEPDzUCg6xp0HhsUhTWSe7MZMM/6rsTUb0/nbUE3YQlGGt48kT1/6cnf6yHnvHtQx9EosOXN077yyEq/jE3YTiG/5SEJmXFeocJJ1EAd6vKeK6VEdJLOZ1km/EwOnZWCQpzCLKPHxrfh4yJhGq//2dos2E/3+MOcdW5EsgIdmTQUQetzRy5fQHhDBl37XbWzsqO/cASEDjyst1/8NEROqVAxWnddQV+umJ8IrKVgKvGaTc0GsQ4s8h0Osql5QKwlddPDjJhKInyWqYUKmmlIts+FIcXZ6yM6cljbsjUG2ksSOkuIw4sYHffRNgBOLApvD6XrR6Rt0rV2Uf8IpnIUVnb9Twt91QjAaD/dStSWDxg7aYY+VXIgnuowYdOkjywa2hlgrnI6PjaU3e3UjQ5Yk5mdIJGyHnv3/P+1EkMav1yFyF+FeJE/RXnWBw+Nh0aOo6TGlKX7d+dkP9+brvr79SdtXJtcD/aXBGiMNfG6/NQniQHYQlK78FEHDqOh+bDI0o+2Ub0h53EL/vlzjrBczVEZz2bOtvIL+DIzDkk9nCWt7tlqsq3l9JMtJk3r5HG2iJ9b/X11TG6wwMAjHLQ2oasaMEsydh88QPvI+hmqIHhvalpKoKOueJR0eZ9J8G2alNOIOy98jwvbc87Ewk9d+5G/tUijTmlbjFlDKXV05HalKxaRTrucc73On7yzAPS6f2v4ogiaWyWeV73dv/MsQT5HjRrsYV9dLAcI3T+zC2qEVINyNpEhoKV+xVSuWtT4AhBfpnZ7unIM+HX3msI0HiI+P+z2PFgkjGi5PqEbG/wNIWeRUjPtDEgbbubN+I4JaDLrW9borRBDob7ZFx+JdKeFVUKVeWqb/c88Ol7DhM0suLtuEd8tkDSMTD3DFx8UphPINHMHi51hAPttXL4Ektt/lKEUG/R4qZKohHjVpAcPIMiHyWr6xR8/EWnNJvBFET76yCdk5er7ADB/1bgoImhpSiZ/omZjPKPCEeZsOwvPmXL+1vlJNeGO3TzySmGA1X6e58gLrazDM71jywM1XL8zKHN6G3kB31Y8vLtP982N975SZXk2JwDvmv7AY/aDsFFk1v+nE7/hbvuOWhBH4kuemeYozPk2K22Vx/YGiDTLU7YilpOt29u3RZMBh4UJjlTP5ItxTzWv6ebL9b+GSU1Vsm2S8LMfVfJczaBSqE8J1A4YUjpsALL7++bwCPXFhaufdpDFtBlHb9makeYbqdg9ltvK/HwF/rNE6KrtWUkEcxmTB7Iyu5TiVaIgW/YxzQhpArliIMkOoK5L7ShVtF+DYqV01mk7fwop04hQRwg4KFmr5z9nYf05VVqkSe7gfnx5bxxlQ0qEV0jiwzf064qG11iEqjHcUgDWWsDs/LEGlzX31T5KVL+7D4EoKim7HBagiqRo5JI3WfDBgpKIruWz9j/J6Hp5Q/EJbMWB8NeSMuFarNw3AEYPBJtYQO/4oD/ZgPTSQ06di0EeumX5EbrdThO+fvYEVSxLtZ3AJkee0Xn0sDwNtiiZhJjJRDuG1YRKB1vOulfd9JjHeyu+UHTmrtra/pm+8Rixh4WKiLaLOCxIbZNoWRZSyyUGLPjAaAo+SQBpfO2uruWrzFxLlpvrXJNMCWtlJDKGAnlWK5xpU2tcxXbeD+sbdfwYXt/qTwDk6UqXR/aUt099DhSNl4Nk8mXwpw+b0nvjKOG6Mg1PRXjrMUMANvNgEArv8nMJs3vj1aHi8MHz/UfJWWzkcrSpZTNBhduXlGR7i+ip/THDp5R9KRNcDKECgtwgXg4EFN5HHfikP/XvsoCkHTg+NbsD8Gl6eknk4Arwn/BWGJ0hgW0/gUKrzuGZhub7igRP3abetpIm+24xEOlWl3YKpm2qTBFvX8ddDRvm1LcwnCJuEfZx12qPY9TrntMIQsv316zvpyWnyStX8VU4j6tQk+CWlLBUCJR6MdH9Cp7g2qdn2WM9qFbREmejH09dlWEPm8hPF0L7RxwRRdiCs0DP8ewk6ApoELkKU9hckSdbnXm8UHJmaNXjxv/q0fTTpu8rnl9lN0vQCpDRbCtcz12rGRFEA7Cfg7FhZn5QFkNmv1ZURKEsiZce1nS9K7HrwpC7yJV4Xt3eAVbLJfoXHrtwG60Z8gwaSnmxoL3s2ZlRqggZN/MHo1oUS4L+GwObFI596Ld4Mvi8l+cQmF1gJpkpnDio7TuO35npaMHiWzFqPSX3qNgkIPGuX0qGYnPIVsM901Yu8oZnOZOY1TbtIdFUNKNq2dP8SJ4F/VCEzIjF0/Rh+7UrZj80tC6rognVH3mqa8eCs/lcQU1Pjj98kBmAKDbZUTwosv02UunRR3n0X6c+f73mtwB7/WbQ16gO431EtwZbNG1SM4TZPBnsQSESlsfG2JLQXx5xWf4bmQ/xcVCPISAX5897JxHKLD/Xkgu57+ABR2+MMtEbX64+MNlBHpKC7sjlWVEShf5qA+dGc59LFVlZrX/Enq9z/v+wnZ1HErmxmjJjxOA+hAjVUWgtq6ygAi/8ewJDjUMFw3zhQFtbyTLDPFd21Ji5S5QPZo9nMSxdg1+DGFSN0wlWt7XeYPbHqLfliV0J1kOhQNp0VbUPy0MS2Ms66OxtSWvaULaWHnfAA+sieVVgtjDwN3nKonWapkSKRN8BKKJQpCfqo8RQI5udhfu5s5+7vwsppmAJDgz2GNA7d43VdbV2l/SrvEu4RYslmNJmfSOVbssxAhSYy6WxpIQdDB0FVBpZ6IM8yr81QN+XLZ3n/wed/R+s6LslkxKbzzst/GkRbe6rFmtvJCwr1T44ETM+IMgOnjUO0eG6a1n2w7lwM1oFBvzMUWRkNFOvKcx3oSb5XdenZ5dXsute6nkRypBiSdAtA2fxAd8UdLOZW/MB7fZoEuFheQXijdaF8kuaRZoSeWdKOkKsGYEGaXfaDKTu0WMTcLniQs7KRCz9iK3SP+Y2xIjkfVGqFLSQ6vh+A1u6FdfwXsv1VPMfi2cxmdM+/xTgMXEyo2ZGcQ2YmPsghnYdv2+z48JpGZA4tUK1p1q2VdVxyfypXEXcrxKKtmt8UdW7sHWmKMqDuBBM3J/JUQx8eUYN4pJ5oRqvdiPHU1o/WPjiKvnlCqOdyxlxF54L9PrtLD1NejZ9aZDivVr6ZfMFK1/psVygoPIAnphcJWWb9+5IKMKmgRQULsTPZi6Bw4wP32zVEoKcHpP73CkFAqS98nSaGoWDjDJiaACJn4p5o1jq9R4Q4VcibhXF//LHP0bdf63kRVZdRbbhGe7sDQcyWS5tpkfeYHnff25WK+4FpzLlAcbaKmHdIBqOw3fImx1uqQIADH0TyHzFlqTG6nMoY81svP0T6BIyELMS8tMe+E1p6TFP6sVpZa6VNaTumufD5aj9goRa9SAmdJT4HhI2r0egj8UrgFb8L59wGLnYlzkLAiUd3m/WWIIEU61kPoEjd3gIVy/fiBcgqQqHnoXpL0SqLGdGGgn7DQeVMSYWHfjno1FngIKP9cjYaTlcRP6bZunjHP13/lbVm4awti894pTf/ZNNqr4OR+tDVie/m+rC8QpVnRbsCMPukOH87B2jM4AG6pHuXl1x9SiKdhYJVOhfo/+SCaGjUW2CoogL1FFhFGN9o+acoVLl0SXs/3vrSccmZeAF3NewFuOg/P12QYKQF+SH+KYcNnsAhIAELPBUgre/KRUJEA+KPD0MHRjv+3J/j2Z23MuJmkfy7leWcMsti8wXLSHgXFJTaksx1Woi6oljwxFVIJG12SBSZLNJDbXMYPekmiXT4FclKI35BFgqnYpKfcsr+f8HUXQoHJ9UYZ4J5YMiHHyAxg6eidhodgqJ2Htf/xYEx+G0zXchuzlt8hcAl+AT8NCQ4orFc4DerabF1enA7NTLnvtZh3FUwqIOvY7Q4DYmoDHwXTSw5UNNh6r7j0B/ezMYJMDcw4+6gCTZX4YQ+7Xs8de72vsR3cmfpxIX64/6KR1p3VX4F6vfHEzxzarh8aDH4G1DFoBBM6npXFpK+Rh+WrcFclAeAxi0PoaR9CpOxxGLSdvxKVSw8oOOanG/soKImRopN38AdcUhhM2GT/PgQeSQrG12njuJJD5Z7vWfAZmFybYLdSA91kB4aoBhoj1Z//KNIVVujqaLLRwCkbyn4vh0739C9V9iSjybeOIeSOvNs7LW1a7EUtNoKAnOGML4U8KBXpfrw73WjAszJG4Qscq+Xr3kZWR4Omm0xT6qE9y6FNSpstV4onMZSqCEJ+3VX9qjvdx5QVrM0WXxmPZxejdfnihcFAjzv5PjlTl6ickDbHe6+Lch52pjOPqk+m3RZ+bh2JSMGtFBuODbMchrpRVlt16NTQ05Ps0IDtWlUmWfP2vX8M4YDynIuOZ4Ck91+591B98Gw9fw+yQogTR8CSg0zaJu+rlBo/mr3A+1NziF+kdubz+whc857AZt6DwIBIF5+5yiaaf3ByQp1Fm3sOkZDAzwsYSQTM/Kv6idkugF63FDobDdUY3huruU+sCaBuRR+HmOowvmZoBjZHNh77SXFtmY/oOUE7ifN7nBHAo83S/xvcS6H4Ci2u/9Id62Wv6Ui+zMNLAzhfkTkVcW2BwrnYvpur0ZDlzs+ZLsmGTWvd1892t78gx1YjEJusGcxphjLkV0UfAKlekfSBVWHE2ahk4AbbRmHyL7GYdtKfdlINwrcdJuf3Cee1nfUojDQn/YmItESOFhtLzrkEv4k2XpMU9oaJQ3VUC+1INh6BE68pkHameGJm4Gvdb24Q0fXWxd9Tp3A9mzFSe4qXDGGDIV4AAGV1jIDfveknH1TwWpUT6HiQxKP3AAHJNkJeRlj/mXBmS4S1j8FK6YmpK7jyyAiRbsMCCLoJcx01fvgpMvKQRxu9IOwymconQjD56g7ksOrcOeoTbius4JnGesAS1DtgdaophYsw1wGIsMS3P7K6doE3K5czznqPQLSRRF/Ylzb5NtSKsL33SgskFNCF4khn5LWaDxI23ZRi2hzqN8uW8UzZEBYy68+VtGLSymQrXGUlr2nO2BbBIT5Vh1RmGAyDXaW0FPrpx3wv2UYdFk9tSl+906bMxCuXQaKDQP/U19UEcVGK4gmksL8lAorxQSAOwpeYX9xrZsh6yoGaL/X5O3tgQC8OM+/GvxnW9XvAtu/JxAigydfSmZfqZfg1XOcHNOpLlN8j64OZ36l5qawDBJ62YaTvxeNmm5gowCdBosgcpHOgNgwA+sknN8XmsR2IYChcafl9bGNMZ/nB5guWuvEziv6QI2bP2DtyKWG/qUjZMaxy+wASkkVGtuwGtywkTYG6MYrZBo18vYcww48G/+f+eITA/qMwbLlJC0S3+/ai2pPvkOhRRVmGTuSupaxhIk0xoXLtixCxSAn4Z3OnUS3wBqVscLI4P3GP7i/6gxYsswsVmkvDXFLhO/OKcur8flegCSKiqmVpIRvCzgbjEA0mXPn+RExXY/2OE1f/BYuWpRQY8gCDpMOYBx9Gn4tL3hihSIR1ixh2PIIT7cr2gUJbfs76EKYG52Jk0UZF/PQkBxGuFCEWXnG6ue/hTIqjTRq1sotVrKrwIGHDrITyuanUzbIYdgdEeV88K1VD82TYB2B61Ft+tB1KqHPmT9+hWoaV+iF3SuvtJqvnoLaA8wxrD56AUMULEgzO9SvBcBAfqz/dzMYzwMt/YLszDbmGe1bcHHfFMcvGql9bf/tp+Hrj4q18aNnftGjmXTfws39emn7/5IBxog9MrmftAA5Oq4awenm8HimWO72dwVlHcHmutVMdrMHw+p2vzpzT+B0iIZ+IEpplwWhClcXlxhxAsF3CHRnnaUEqq3ByQ+cqhe5SvR4SFxh/LZoQwtj8QZQGT1BzY2EMpYnUcZWQEPlwFZw+7UryK9qV8KgruYsvyMoK16KI2sN4SOblrVwhyiL8+IBZ8cpUhsJQSU7TFHAi+L2F0sn0y+FtDODlnuif2Mba8QddPZYYxjTsIgkMe3M6+7kXxUfZvbCUlyq71J1eNczGk6Vqw6rSx2K3vM+DjLxDRGzWepTO2qTT/W8S7u0QXcyFUahcB4vq8xCYTpy8iswtnyz7Kx6lgTEQJ9RqkgEIN6DOUqB0uRdeYuDa7AP7Zy9z+ZlTsmVR5vtV71m3dmdtNeWghbr5PnPJtjXAzcvZjxyV96VEx/B1TA0IEQSI50ywGuIbmAYdQg/l/rxhQLX+6uOLyFsaUt6mtjpAJkLfehnB6MlOHnNOrWLvCBqVBS07jcM+4RzLEed3f3/0Xwp92U+nataNHyEgnnuYR6PXEjRLETz0xrt3UglfK7Bn4aNlXG7cZco4lMziLv5+Mh2JCww3mz69Z9ZMRR/xv5EKJ38IFxKd9dw5CgPIXja/gzAshMbF14/qBIgNkdUQeP8YE7SrICGtiTnAKTyA9cXa3OauDHxZOdTP7yuYBzD1UcHstIO16FxF1bRUAlSkszI83YufTchU8OPnnozDl9bS0y6CnnjGwgj9M61cXcZsljjhLeT/Vq+30ScN2PcT/dOoxUDqDS38+OpCCzLDdnwHQc3ECQVIkaxmdPaZTSdfp2jjGzSdNLM5yPQsgJDl+ZnhclDQi8ltUnkqWJ323IvTZPN8rn0+EshL1cx9PiaLTzUsryn9Zp2Nt/detUAh4N/2I3dlMQqjHFxSihv0uykzflq5clMy2ZBaxoEb0/QMp03IQQus3vnZd/NOmSsmgqXqKFP3ozyDgY7RQS+npabe/hNG+5sa5FtvL8v0uYuag2NewYkcol3TOTadpuncCnDgOGpmLnTQ1PEPUN2cNsrW8LYfIv+hzfb7vod+ipXHzmbgj5Fzc6RcT/5PD7VQ8nTJBNj1urkVUx9uJvTWmqY08OC80rGDLaWXv243VB16gjt4Xtwp5H2UDR0LiKW24Ed/sOO8jl1yEU/XAb3h7ScKnCFy/V3sICrkY1D0K9fSokHIL0s5/7DLShLAPXRbV7fbv4qj6OwHC9d5PlEOX3LRpQ3P7hcSAKlIKPDM83ypz56U5+rJeo0cyUtC7wltL8wqEiNSgZsDWzACc7RFoZqhlD0+sihIBQlkQTXmvUyIOZhkQX2zqME5VRC7ms1sa3CY+odMn3mMBiTvCMKnnCxg5ZPLq4GUDB4jF8Br2K4x4sxfWjGXQatJ25I1JyrIv2Z4bP1jKw5C+B2/s0v4dGUOsaS6IPIQV3ETQ+F2fSl2BPBXHzyYN8VmwWIrKeMX9pyGWuAOVXwkxJsRBaBVzLhZDP8ONGncknL5DpTxHN32GgFWMwsc0GmL0oRDmRT8u2lvjAKUIi0MmXhIHSlFeh3Qh5pP6ap4YUd6b569ZIaHgya2AyD12cPxY0In/PBjzDctTaKJCU+xc6m9RkNLDEE8guvxtJP8sl8N9bLqw0F/qejaBlcHYqw31zYpsutQp07hsP1vhGdl4hJ1wA7OCsAHnKj9879uSHILEmuZ6vI1lT4tvnWCVKZhhYrWHW9oPKPKpbOC6FTjf/OtUvwmiXr2ykvyLzHGQeyS7BenZpL3N/CaF5T7Gkml7JXN5cj0PKaDpZVImD61FuMgFHPqSHvt4Ej4KBdAfdcoO3AjQPLwwtKsgGM+ty4lNZMBEItJSRLunG5ckrM/BeoXWoPZVvEoIzLgFQYPupMwZCXis4W2SCJ2zsefZqCj+aTfSq1FYdUj2UeJALvVTf7vuuikOE1Hit3UIAGUi/sqgMum9vw218y1FlY/9XnOji9nqhGAcMYICc7BiqLZj5N+cKEuSAuiyWbMg81ZD1lHovy/we2eaCcCv4MzEW3O0mVA/t2xdA0cxTVbXmFhn+tARDpvDz5ftLr15OAAmvo2QiAky+feVO4bGibv2nlBmBzqx0lEDfEm4UnEs11pbnwZlJ/0Y73/wBPYfTNZiJKR73TzdCW1BffiJq9bLjQmaKnU0+gN8sfe25IKSUCooQwxePDrFn3a/zUgWxvPoTYVXfobY/GV2qqTkeVDV9D8657fhY0/wiaJ5NfLxhXbE/naxs34N0hd6vxNfdm1TCnozm/NKSCThchoYgMF7Z2tzXFovRfsNVkf86JjrM60r7UIuV3bsmfrMOqzjXjN6HPBG25zCJ3QLueySbj9oFvX/HxWBqh31PBPxduCVAxMqC9HK+YL3oBZqBruoh6LKvdMqoz0PYXUBrwbiioyE8Tj5ImjJmiOOWLbAZvIZ/l9rIPljx3T5glJ2ewlfuIT5GlodQsAf/IEtmYkML5SRQGxxwW+rlZkD8belJNu09Itwx9xDULTnemVDeojdbgcd2gKGM9aO00Jivtbs7ZyOSE8IPh98GfvatD8Ud5uHcZfAfMiPSlIxd4UqeSDzuNfbKDuFepkyC/s3j9fawmhY1b9NqDi0ZS5eP35l7rL2eK5QlWLlyCmxx8AFaFiTuD2pMUxZV5mBSJuJduOaq2ZrWpu28DE8jl/hisBz7bGWH6qLF0ayWNq1Sejtcs8KQrQqJk5P9QHDYHOIolgNsMDmEaWcTelghbfFCDqWrq6YLwDWy+m68ec5nShgq2fduUBpQUuKKKgnttaUX9PRfMmxqJyU7e0RLr1bev+ge1KK0bZyhHKKDE8gQX9Vf7rNHWOxBtZcxwwGusyMpH77qWZxXsQmbgIGhtiO+gSSRCyu/ek+OFsz1HMiQH0IHV7PjJi3dszYfFp8ue9h4+AfKte4MTiehPvxNcm/T1t9vsFZx8rHN5ie77r2jzZOq/Em4Q+H9sNcZakf9HnzCc1fJixppxP8FQABmVnqa6GbJhwaka7WH7Wdoz1WxOjSNV8N9sgW5S3Ppgkut+TTCkjA+AodUOk1KIR+8G8S3WrSZG4nyqfJ6FEjXl6a/LEoRMHZUqfPRWvwqrtXYy9IUsmUGzkqi76ib4NANCe5DnyOxnFRZ9d8FdBVBjra3iNuZhJuWW5Omi/hBigqDsg0mu2AhfJDXdwyMIJ33HHHPfS2JtjegRejX11m41TbNL+Qp7mR0g9CPKTj9PIjuSycGN/YPozXI4zarXuAeLv5CHKtKcJKRbd6R2oLNiEt0T8+QIVJH7zt9ncKMgd49vV2P1AyScZ9Qzbu3m3LBnuu6dw7aE0b6r4kzVkI/GUS88mA53L/rLtntkFlZXGtIoqNP2mD3eVv08AVVPT3wJn81zpbJV9SuqZ6Pd1ge0Zz2RFHeCdV5CLPftH9V5o9+VzFu4R0QeumqDwUhXn3IyYotdJnxr1l3BqWnQVAeDBEOtPyJQx1q5+mODiClXtYeBLTWtsJ42AMBcf/IFIhpfhYO08hsg0Ik+DpQFNOKReK3o3cudkxWX0soPtI5eSFOA6yNylS+IQjrQtYQ/5s4UcixJfokumBUjpH9ofSjUTwPCapGFndfqqG5IHeMMvfg+88SXm7bNyjk6pGKzL+WxDAdqKtQ72WWVbOk3I+ueGuammmB2pvFZvqIcU/lvW3n9+r2lycnQLE4OX9R1jIgW4cDjJ3v8dAa66mVcfC7ptCr5io6mCaA9qI9T9FFWqo1ZAaMxgxAu8aXqmaOYryMND2sTUfoHvxcYK7hEiJhCLYFDx3PBhE97c2a0ub1/ePJcyJOqr7UaTAPTJ+xvZtjb/40sloY1ltRnTkWILmIP2b7S3AdXCR+YiArMUHwdncpjpyDGfzqGOUoAuaamWzAMacQtb34/M32FEgR5lUEf8fRzFrZUhzQj0fR7/6gdzdnVVvcSneLmtqJ930VCCDORY8CVdQWdo/S3PNkX3pQsPVKWIYGAMrFZoq8bQ/OJBDSXP7KSBdL3QN0Zqd393p6VFc7DnlnFiN00SY5Nux7yadeIM0Upl2rVsu8/VAI";const zd=new Map([[8217,"apostrophe"],[8260,"fraction slash"],[12539,"middle dot"]]),Vd=4;function QS(i){let t=0;function e(){return i[t++]<<8|i[t++]}let n=e(),r=1,s=[0,1];for(let M=1;M<n;M++)s.push(r+=e());let a=e(),o=t;t+=a;let c=0,l=0;function u(){return c==0&&(l=l<<8|i[t++],c=8),l>>--c&1}const h=31,f=2**h,d=f>>>1,g=d>>1,y=f-1;let m=0;for(let M=0;M<h;M++)m=m<<1|u();let p=[],b=0,S=f;for(;;){let M=Math.floor(((m-b+1)*r-1)/S),w=0,T=n;for(;T-w>1;){let R=w+T>>>1;M<s[R]?T=R:w=R}if(w==0)break;p.push(w);let x=b+Math.floor(S*s[w]/r),E=b+Math.floor(S*s[w+1]/r)-1;for(;((x^E)&d)==0;)m=m<<1&y|u(),x=x<<1&y,E=E<<1&y|1;for(;x&~E&g;)m=m&d|m<<1&y>>>1|u(),x=x<<1^d,E=(E^d)<<1|d|1;b=x,S=1+E-x}let v=n-4;return p.map(M=>{switch(M-v){case 3:return v+65792+(i[o++]<<16|i[o++]<<8|i[o++]);case 2:return v+256+(i[o++]<<8|i[o++]);case 1:return v+i[o++];default:return M-1}})}function ZS(i){let t=0;return()=>i[t++]}function gg(i){return ZS(QS($S(i)))}function $S(i){let t=[];[..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((r,s)=>t[r.charCodeAt(0)]=s);let e=i.length,n=new Uint8Array(6*e>>3);for(let r=0,s=0,a=0,o=0;r<e;r++)o=o<<6|t[i.charCodeAt(r)],a+=6,a>=8&&(n[s++]=o>>(a-=8));return n}function jS(i){return i&1?~i>>1:i>>1}function tE(i,t){let e=Array(i);for(let n=0,r=0;n<i;n++)e[n]=r+=jS(t());return e}function Ca(i,t=0){let e=[];for(;;){let n=i(),r=i();if(!r)break;t+=n;for(let s=0;s<r;s++)e.push(t+s);t+=r+1}return e}function yg(i){return Ra(()=>{let t=Ca(i);if(t.length)return t})}function xg(i){let t=[];for(;;){let e=i();if(e==0)break;t.push(eE(e,i))}for(;;){let e=i()-1;if(e<0)break;t.push(nE(e,i))}return t.flat()}function Ra(i){let t=[];for(;;){let e=i(t.length);if(!e)break;t.push(e)}return t}function _g(i,t,e){let n=Array(i).fill().map(()=>[]);for(let r=0;r<t;r++)tE(i,e).forEach((s,a)=>n[a].push(s));return n}function eE(i,t){let e=1+t(),n=t(),r=Ra(t);return _g(r.length,1+i,t).flatMap((a,o)=>{let[c,...l]=a;return Array(r[o]).fill().map((u,h)=>{let f=h*n;return[c+h*e,l.map(d=>d+f)]})})}function nE(i,t){let e=1+t();return _g(e,1+i,t).map(r=>[r[0],r.slice(1)])}function iE(i){let t=[],e=Ca(i);return r(n([]),[]),t;function n(s){let a=i(),o=Ra(()=>{let c=Ca(i).map(l=>e[l]);if(c.length)return n(c)});return{S:a,B:o,Q:s}}function r({S:s,B:a},o,c){if(!(s&4&&c===o[o.length-1])){s&2&&(c=o[o.length-1]),s&1&&t.push(o);for(let l of a)for(let u of l.Q)r(l,[...o,u],c)}}}function rE(i){return i.toString(16).toUpperCase().padStart(2,"0")}function vg(i){return`{${rE(i)}}`}function sE(i){let t=[];for(let e=0,n=i.length;e<n;){let r=i.codePointAt(e);e+=r<65536?1:2,t.push(r)}return t}function ks(i){let e=i.length;if(e<4096)return String.fromCodePoint(...i);let n=[];for(let r=0;r<e;)n.push(String.fromCodePoint(...i.slice(r,r+=4096)));return n.join("")}function aE(i,t){let e=i.length,n=e-t.length;for(let r=0;n==0&&r<e;r++)n=i[r]-t[r];return n}var oE="AEUDWAHSCGYATwDVADIAdgAiADQAFAAtABQAIQAPACcADQASAAsAGQAJABIACQARAAUACwAFAAwABQAQAAMABwAEAAoABQAJAAIACgABAAQAFAALAAIACwABAAIAAQAHAAMAAwAEAAsADAAMAAwACwANAA0AAwAKAAkABAAdAAYAZwDTAecDNACxCmIB8xhZAqfoC190UGcThgBurwf7PT09Pb09AjgJum8OjDllxHYUKXAPxzq6tABAxgK8ysUvWAgMPT09PT09PSs6LT2HcgWXWwFLoSMEEEl5RFVMKvO0XQ8ExDdJMnIgPi89uj00MsvBXxEPAGPCDwBnQKoEbwRwBHEEcgRzBHQEdQR2BHcEeAR6BHsEfAR+BIAEgfndBQoBYgULAWIFDAFiBNcE2ATZBRAFEQUvBdALFAsVDPcNBw13DYcOMA4xDjMB4BllHI0B2grbAMDpHLkQ7QHVAPRNQQFnGRUEg0yEB2uaJEMAJpIBpob5AERSMAKNoAXqaQLRBMCzEiC+AZ4EWRJJFbEu7QDQLARtEbgECxDwAb/RyAk1AV4nD2cEQQKTAzsAGpobPgAahAGPCrysdy0OAKwAfFIcBAQFUmoA/PtZADkBIadVj2UMUgx5Il4ANQC9vLIBDAHUGVsQ8wCzfQIbGVcCHBZHAZ8CBAgXOhG7AqMZ4M7+1M0UAPDNAWsC+mcJDe8AAQA99zkEXLICyQozAo6lAobcP5JvjQLFzwKD9gU/OD8FEQCtEQL6bW+nAKUEvzjDHsuRyUvOFHcacUz5AqIFRSE2kzsBEQCuaQL5DQTlcgO6twSpTiUgCwIFCAUXBHQEqQV6swAVxUlmTmsCwjqsP/wKJQmXb793UgZBEBsnpRD3DDMBtQE7De1L2ATxBjsEyR99GRkPzZWcCKUt3QztJuMuoYBaI/UqgwXtS/Q83QtNUWgPWQtlCeM6Y4FOAyEBDSKLCt0NOQhtEPMKyWsN5RFFBzkD1UmaAKUHAQsRHTUVtSYQYqwLCTl3Bvsa9guPJq8TKXr8BdMaIQZNASka/wDPLueFsFoxXBxPXwYDCyUjxxSoUCANJUC3eEgaGwcVJakCkUNwSodRNh6TIfY8PQ1mLhNRfAf1PAUZTwuBPJ5Gq0UOEdI+jT1IIklMLAQ1fywvJ4sJzw+FDLl8cgFZCSEJsQxxEzERFzfFCDkHGS2XJCcVCCFGlWCaBPefA/MT0QMLBT8JQQcTA7UcLRMuFSkFDYEk1wLzNtUuswKPVoABFwXLDyUf3xBQR+AO6QibAmUDgyXrAC0VIQAXIpsIQ2MAX4/YUwUuywjHamwjdANnFOdhEXMHkQ5XB6ccMxW/HOFwyF4Lhggoo68JWwF1CZkBXwTjCAk1W4ygIEFnU4tYGJsgYUE/XfwCMQxlFZ9EvYd4AosPaxIbATUBcwc5DQECdxHtEWsQlQjrhgQ1tTP4OiUETyGDIBEKJwNPbM4LJyb5DPhpAaMSYgMMND137merYLYkF/0HGTLFQWAh8QuST80MnBrBGEJULhnkB78D8xrzJ+pBVwX/A6MDEzpNM+4EvQtpCIsJPwBJDqMXB9cYagpxjNABMYsBt5kDV5GDAm+PBjcHCwBnC4cFeeUAHQKnCKMABQDPA1cAOQKtB50AGQCFQQE9AycvASHlAo8DkwgxywGVLwHzKQQbwwwVAPc3bkoCw7ECgGpmogXdWAKOAkk1AU0lBAVOR1EDr3HhANsASwYT30cBFatKyxrjQwHfbysAxwD7AAU1BwVBAc0B820AtwFfCzEJorO1AU3pKQCDABVrAdcCiQDdADUAf/EBUwBNBVn5BdMCT0kBETEYK1dhAbsDHwEzAQ0AeQbLjaXJBx8EbQfTAhAbFeEC7y4HtQEDIt8TzULFAr3eVaFgAmSBAmJCW02vWzcgAqH3AmiYAmYJAp+EOBsLAmY7AmYmBG4EfwN/EwN+kjkGOXcXOYI6IyMCbB0CMjY4CgJtxwJtru+KM2dFKwFnAN4A4QBKBQeYDI0A/gvCAA21AncvAnaiPwJ5S0MCeLodXNtFrkbXAnw/AnrIAn0JAnzwBVkFIEgASH1jJAKBbQKAAAKABQJ/rklYSlsVF0rMAtEBAtDMSycDiE8Dh+ZExZEyAvKhXQMDA65LzkwtJQPPTUxNrwKLPwKK2MEbBx1DZwW3Ao43Ao5cQJeBAo7ZAo5ceFG0UzUKUtRUhQKT+wKTDADpABxVHlWvVdAGLBsplYYy4XhmRTs5ApefAu+yWCGoAFklApaPApZ8nACpWaxaCYFNADsClrUClk5cRFzRApnLAplkXMpdBxkCnJs5wjqdApwWAp+bAp64igAdDzEqDwKd8QKekgC1PWE0Ye8CntMCoG4BqQKenx8Cnk6lY8hkJyUrAievAiZ+AqD7AqBMAqLdAqHEAqYvAqXOAqf/AH0Cp/JofGixAANJahxq0QKs4wKsrgKtZwKtAgJXHQJV3AKx4dcDH05slwKyvQ0CsugXbOBtY21IXwMlzQK2XDs/bpADKUUCuF4CuUcVArkqd3A2cOECvRkCu9pwlgMyEQK+iHICAzNxAr4acyJzTwLDywLDBHOCdEs1RXTgAzynAzyaAz2/AsV8AsZHAsYQiQLIaVECyEQCyU8CyS4CZJ0C3dJ4eWF4rnklS9ADGKNnAgJh9BnzlSR7C16SXrsRAs9rAs9sL0tT0vMTnwDGrQLPcwEp6gNOEn5LBQLcJwLbigLSTwNSXANTXwEBA1WMgIk/AMsW7WBFghyC04LOg40C2scC2d6EEIRJpzwDhqUALwNkDoZxWfkAVQLfZQLeuHN3AuIv7RQB8zAnAfSbAfLShwLr8wLpcHkC6vkC6uQA+UcBuQLuiQLrnJaqlwMC7j8DheCYeXDgcaEC8wMAaQOOFpmTAvcTA5FuA5KHAveYAvnZAvhmmhyaq7s3mx4DnYMC/voBGwA5nxyfswMFjQOmagOm2QDRxQMGaqGIogUJAwxJAtQAPwMA4UEXUwER8wNrB5dnBQCTLSu3r73bAYmZFH8RBDkB+ykFIQ6dCZ8Akv0TtRQrxQL3LScApQC3BbmOkRc/xqdtQS4UJo0uAUMBgPwBtSYAdQMOBG0ALAIWDKEAAAoCPQJqA90DfgSRASBFBSF8CgAFAEQAEwA2EgJ3AQAF1QNr7wrFAgD3Cp8nv7G35QGRIUFCAekUfxE0wIkABAAbAFoCRQKEiwAGOlM6lI1tALg6jzrQAI04wTrcAKUA6ADLATqBOjs5/Dn5O3aJOls7nok6bzkYAVYBMwFsBS81XTWeNa01ZjV1NbY1xTWCNZE10jXhNZ41rTXuNf01sjXBNgI2ETXGNdU2FjYnNd417TYuNj02LjUtITY6Nj02PDbJNwgEkDxXNjg23TcgNw82yiA3iTcwCgSwPGc2JDcZN2w6jTchQtRDB0LgQwscDw8JmyhtKFFVBgDpfwDpsAD+mxQ91wLpNSMArQC9BbeOkRdLxptzBL8MDAMMAQgDAAkKCwsLCQoGBAVVBI/DvwDz9b29kaUCb0QtsRTNLt4eGBcSHAMZFhYZEhYEARAEBUEcQRxBHEEcQRxBHEEaQRxBHEFCSTxBPElISUhBNkM2QTYbNklISVmBVIgELgEaJZkC7aMAoQCjBcGOmxdNxrsBvwGJAaQcEZ0ePCklMAAhMvAIMAL54gC7Bm8EescjzQMpARQpKgDUHqSvAj5Gqwr7YrMUACT9AN3rpF27H7fsd/twPt4l+UW1yQYKBt2Cgy7qJpGiLcdE2P1cQSImUbqJ6ICH27H4knQMIRMrFkHu3sx6tC35Y+eLIh4e4CMKJ4DfyV+8mfta499RCAJ0xfeZR8PsoYOApva9pjGn4PhvyZS7/h5JLuhaucfjuU+Z584wwqNO4hWYmaBCcjgQPale1bjoHzMUbut/zTgxHxBnAyrdKpF4IRMASLBtD/jviyLeCgj8twWjAd3HchN/uqaeRYeHJgl7JEY9/cTrvtfybx/r3Y/NtxJ9dp+MTVmiS9bwBH73s8Di56/Ma+mTPMHq4T1yEG1fWcqr0u+hrGnJEvU1JJAm/maQSrKrazIyvSkDFkj8UUlfBq8baniTGPng6YZRL661rDNw4w/1g2figG0IhXnL7wosd/sVNo5dYSmMBTP5c7rYLjRdCwg8quwljOMPf63D8ICAL0r71XRiyFHdgwHbwfgnPOf4Lzjf2v+j+IiDHG2isp5yUnzSDyDRb4i/Vs0qHSHq8PiEQ/JnBP7PxnjN0j6gT4AVAeRx/1o9VnEUlUwvFrzJqHk9jxAw4sYxCnrxaeBdCFFKbnE7z+x54F5W7ZZsU6kx8Qocul6FoAHHy01FGL/nne61mn4+uYXfQ1Uccn+HMLKE+cZzT8BB1E3FRskOgJrRsq25rauLm8+uamXpkS/bTy6y1wDbCrW4eD532kTWrtNUmVVZOIn/C+/JR9KVR5iG9TY8iaT67ubm/whL1xbKZoqtY+a6fNxMJrg211bGYJDUkYMNWA0BMB++9zOm6Eik4roqs9CCEFW0lyAK0PbvlzvoxrZuY/OEhNW/l/63U15Od/RSvmDvXpGLiVmeGi5PDSH2bYz5o2g6wFDQ2FbZgYgTF8rPlvA1ifjZD3NLtFdXdpSIJvgKR7GpjJWG7GZGawPomIH8B5tUmtHH9LpM+/KQKunEPa1GiQkCXv4Cnm9DLORo2joicHdPDZ64obQrPZ5bgqckkj0G6/NEiPYBY4bCkL7W8G5YzsUb6GakFjykSPkT7JGeLeB6uJOGMm+x7N381BCDfbJFx0dtLgV9Q477BfL1fvitX5anV/oYfxeYl+eF5x5bB8+Ep/L2nsmd56aKF4aAD4GbJWsdKyBW22xEmAD3XdbtsMyAFoR5mOla0gEd9U/YVB7zvHGpHbQonay9Sv0bQ8iZ8piaXVrKc5AG1AmqqgaEvzHSP2Wux7aZTWh6quVDVU01JtMIVRdCFwlSbbqqhoFlyzsotQzRexFvZ/MqUSFu3OhRIuNBbufvBpdVgb8XdGJ48/lJPCZ7dsOujTTbKPSEvGXkOnG2Xdi8/nM3EMRqITd5QeU7iOjKqC7URJY6TnLsHij22xAHKnVRD5MDtBYnoGFqZGMDmXCW6Oj+BAWw14hESY/xLF6bLku06AHkiXTHPCFZ0f9YSqqo27eAhhS67OrA2Het4M9JM3jm/yRX6bYxnfmzYl5qQdHxN08FsNuWDrWd4vMUY2QD3hr8vS73SCTkFoXZR3xNzOQt8d/6HfjBmXqvrE6EGkLzK6YK2U2/ksU/iUH+LvVIsJI+ri2AL/klo+ShdDyfs5A83i2prkMs51IKR7ZcqjZJi5X3+bd8GlyWvtddxKEoEqSgEO7A8jIgf2nH0h8FjM7oB6yte3X5mpL0i/E4Rx0CotKnILJj/vJqo4VkPQ93jRtRVfaitQPqldl5xRYPq8387Z0DcnZvOeION0Ht1+P27kFLGQIcLBX4FG3sffccNHh5cPfzp9INoRtqVtdViJfg8RjnXiIz/MNqEN6zvzX3hMzyWC7oSoXIT14ubc0abPX8Rp9GVa5NI/8iv+6ela1oTncbdimRKnrbRffDR/X4nH+bgqAuHWl7hOaeXPWVzIeRl7ga+JzD4Sx3mlj/q6Ra/E2HhDf21eEzTLNGfCZsY+/yxZzQzIAuijG65ii4O/waAJCrEJaWd/DRAKMQ5678Dw5AT7RCKzdadIwd8LsD+DgPBASmWsUlf8R0k1w/2k4lO2Wpb4zMI6EJVJs0xk/wn8/fRUPqrDKhbjHR41SqgFMx5RGMPuduFwlu5lK89tW11sTqiX/5EfGs5nO+y9FKvgXKPOEmgE05EKNL6Sjb3xS40H3BVPhm0ESOZgAjZoymc8be0inDVo4JdJVf+NKd3tN/CaB7GShhH27qf95NoFZVX/6ZkR2lX+CgWrQ2INgkh+bbMz68+uJ3Clsh8HSMPEQtAt+BBE6fXDab7KIlsKxU1lIXW/KWVstpdPanJ0pdXpQinDyUQjtY7ZVcfiecRxRDMAUhHFU2cEaciQ+htiPMPx1kdvtWG9T44w3r037ljHBFJdYR0r55qvMRixtAEFJAqA4T1ES87FAx7UozXasytg8MftZYt0rjYgLe6EJ5aWvy2qscBSBQ7yehoJIA3wIIZ9ukfkyBb6qnue5ko8W50rpV4kXqWjI5nbGRXrNW0tBZHXlY48nSgcUXBHWT4GcgLZJoLlKJnV96kCYpq9eWHh7xJzkCAyrQuQ5AJ0qq/uZ3toJglNterev+Qm0KXxPg/+YbFRJdfhbp1wOnVOEYdVHTya6CtO0afhEaBhx3oHwCb5Kq6RwHDzFMl2vfjL8GwzcCoTj7wZe+UFnYDV2yKpPU9dba29gYBdNqJg/KXozO+CJTlKmlKhnqTf5doeS35DZFV+cYJQVjd+oVY/Gtc/6XPzUxb1gMqf6cEjNNoRC8AObrp+fx0cVtGu4ffC2TgXRC8zPl8moUHCB5HZ25d87mlsiiK0aNwBtcEQjRNBT/QrXbw/8aVXdKMHn9EqYEKEyxSGTpYQOaes1G1Qq8pDgqkZtlO2HRyCXpmeM7TSrRPkAh004BfisVpF6zP44n2Jvxz/gOVocNCyy9V6lkod28QM4pbaMvVJigD/w3BrsjSJrXlqc4ulBYOCceiBN4b/gHajYyupbhEt63a619Ay4wsL6a6w6B+A7TnoyE7BliWHJfzVxxIKM/W3M/J8Bx99Op863Q8eNuIMGRx++VbYfjm+VGYBA3Ap/KEu/wxBNBpJJncwHPG45V8Gh98ZIrGCc20MwijGowZbcS7d1nEgcOW5cddZpHL2XPAIRbColiheZzXTvBxZOY3iMSDSKDrICyJ/iQs1vdplVdH/JrLJsQ2jtTnfCrITIghq3KFX3qAgLWAIp8IffNSdTYptnbGfc8s+qcr3zyzyHp1aJg+jxTF4kD1ry5Wauv5V3xnOGwTFecNzXSLHBW20/pCQjk4uorD0plIhMSTc79+/r4RKPClRYTBYex1Ob5crtfvRQBBv6re/6FhtCqtduag67glqRA77/3ulblh9YRtMdDxkCyJDeNnAuCLPQFmdRRWJtH20Z8DstfJf+5oj5SSB64d0iF5/Ya4KfTWxfivj9Ap2/zbYaTo/1gO3tM6RYsCZharMBFr7Fm61mLSrQnEI4OF1gbVS4k/JE9UotOrnLJZuswoWodCSV8zbybkJSVIP7n8UaE9xCR39rJZmf27HOAPVOGc9pdkQUcRrI0qyVF9Z3j1RHDbxIfwbWzmPVjwIdPJvtmBYwEQIUsIW1S939hcVikK00ozPRI02cqhzVUNzpOxVdrwRPvlh1aIOf0xFEqD3YkGnCnFah/cFN3J2gB7N+bZSGawwkKFu1tpQMrp1W+27YNkyT0TpcFpTqgOqqLabrgcCUPxh97mREOGy4xItzQ9xSl6rq+8BZsHcrQFReS+QeMxJ3P6CnL9EP/eOLDjumLhvrcQrpPiknsofbzBv9gTP0lU+TIVwE6E7CcKfT36q+ZiEOHJ9ayf0dyUJLezAb2M8aNHwd0+OJmsVgTzRWA";const Pa=44032,rc=4352,sc=4449,ac=4519,bg=19,wg=21,Gs=28,oc=wg*Gs,cE=bg*oc,lE=Pa+cE,uE=rc+bg,hE=sc+wg,fE=ac+Gs;function ua(i){return i>>24&255}function Ag(i){return i&16777215}let ku,Wd,Gu,ko;function dE(){let i=gg(oE);ku=new Map(yg(i).flatMap((t,e)=>t.map(n=>[n,e+1<<24]))),Wd=new Set(Ca(i)),Gu=new Map,ko=new Map;for(let[t,e]of xg(i)){if(!Wd.has(t)&&e.length==2){let[n,r]=e,s=ko.get(n);s||(s=new Map,ko.set(n,s)),s.set(r,t)}Gu.set(t,e.reverse())}}function Mg(i){return i>=Pa&&i<lE}function pE(i,t){if(i>=rc&&i<uE&&t>=sc&&t<hE)return Pa+(i-rc)*oc+(t-sc)*Gs;if(Mg(i)&&t>ac&&t<fE&&(i-Pa)%Gs==0)return i+(t-ac);{let e=ko.get(i);return e&&(e=e.get(t),e)?e:-1}}function Sg(i){ku||dE();let t=[],e=[],n=!1;function r(s){let a=ku.get(s);a&&(n=!0,s|=a),t.push(s)}for(let s of i)for(;;){if(s<128)t.push(s);else if(Mg(s)){let a=s-Pa,o=a/oc|0,c=a%oc/Gs|0,l=a%Gs;r(rc+o),r(sc+c),l>0&&r(ac+l)}else{let a=Gu.get(s);a?e.push(...a):r(s)}if(!e.length)break;s=e.pop()}if(n&&t.length>1){let s=ua(t[0]);for(let a=1;a<t.length;a++){let o=ua(t[a]);if(o==0||s<=o){s=o;continue}let c=a-1;for(;;){let l=t[c+1];if(t[c+1]=t[c],t[c]=l,!c||(s=ua(t[--c]),s<=o))break}s=ua(t[a])}}return t}function mE(i){let t=[],e=[],n=-1,r=0;for(let s of i){let a=ua(s),o=Ag(s);if(n==-1)a==0?n=o:t.push(o);else if(r>0&&r>=a)a==0?(t.push(n,...e),e.length=0,n=o):e.push(o),r=a;else{let c=pE(n,o);c>=0?n=c:r==0&&a==0?(t.push(n),n=o):(e.push(o),r=a)}}return n>=0&&t.push(n,...e),t}function Eg(i){return Sg(i).map(Ag)}function gE(i){return mE(Sg(i))}const Xd=45,Tg=".",Cg=65039,Rg=1,cc=i=>Array.from(i);function Ia(i,t){return i.P.has(t)||i.Q.has(t)}class yE extends Array{get is_emoji(){return!0}}let Hu,Pg,Lr,zu,Ig,Ps,Rl,bs,Mr,qd,Vu;function Nh(){if(Hu)return;let i=gg(JS);const t=()=>Ca(i),e=()=>new Set(t()),n=(u,h)=>h.forEach(f=>u.add(f));Hu=new Map(xg(i)),Pg=e(),Lr=t(),zu=new Set(t().map(u=>Lr[u])),Lr=new Set(Lr),Ig=e(),e();let r=yg(i),s=i();const a=()=>{let u=new Set;return t().forEach(h=>n(u,r[h])),n(u,t()),u};Ps=Ra(u=>{let h=Ra(i).map(f=>f+96);if(h.length){let f=u>=s;h[0]-=32,h=ks(h),f&&(h=`Restricted[${h}]`);let d=a(),g=a(),y=!i();return{N:h,P:d,Q:g,M:y,R:f}}}),Rl=e(),bs=new Map;let o=t().concat(cc(Rl)).sort((u,h)=>u-h);o.forEach((u,h)=>{let f=i(),d=o[h]=f?o[h-f]:{V:[],M:new Map};d.V.push(u),Rl.has(u)||bs.set(u,d)});for(let{V:u,M:h}of new Set(bs.values())){let f=[];for(let g of u){let y=Ps.filter(p=>Ia(p,g)),m=f.find(({G:p})=>y.some(b=>p.has(b)));m||(m={G:new Set,V:[]},f.push(m)),m.V.push(g),n(m.G,y)}let d=f.flatMap(g=>cc(g.G));for(let{G:g,V:y}of f){let m=new Set(d.filter(p=>!g.has(p)));for(let p of y)h.set(p,m)}}Mr=new Set;let c=new Set;const l=u=>Mr.has(u)?c.add(u):Mr.add(u);for(let u of Ps){for(let h of u.P)l(h);for(let h of u.Q)l(h)}for(let u of Mr)!bs.has(u)&&!c.has(u)&&bs.set(u,Rg);n(Mr,Eg(Mr)),qd=iE(i).map(u=>yE.from(u)).sort(aE),Vu=new Map;for(let u of qd){let h=[Vu];for(let f of u){let d=h.map(g=>{let y=g.get(f);return y||(y=new Map,g.set(f,y)),y});f===Cg?h.push(...d):h=d}for(let f of h)f.V=u}}function Lh(i){return(Ng(i)?"":`${Uh(Cc([i]))} `)+vg(i)}function Uh(i){return`"${i}"‎`}function xE(i){if(i.length>=4&&i[2]==Xd&&i[3]==Xd)throw new Error(`invalid label extension: "${ks(i.slice(0,4))}"`)}function _E(i){for(let e=i.lastIndexOf(95);e>0;)if(i[--e]!==95)throw new Error("underscore allowed only at start")}function vE(i){let t=i[0],e=zd.get(t);if(e)throw ma(`leading ${e}`);let n=i.length,r=-1;for(let s=1;s<n;s++){t=i[s];let a=zd.get(t);if(a){if(r==s)throw ma(`${e} + ${a}`);r=s+1,e=a}}if(r==n)throw ma(`trailing ${e}`)}function Cc(i,t=1/0,e=vg){let n=[];bE(i[0])&&n.push("◌"),i.length>t&&(t>>=1,i=[...i.slice(0,t),8230,...i.slice(-t)]);let r=0,s=i.length;for(let a=0;a<s;a++){let o=i[a];Ng(o)&&(n.push(ks(i.slice(r,a))),n.push(e(o)),r=a+1)}return n.push(ks(i.slice(r,s))),n.join("")}function bE(i,t){return Nh(),Lr.has(i)}function Ng(i){return Nh(),Ig.has(i)}function wE(i){return EE(AE(i,gE,RE))}function AE(i,t,e){if(!i)return[];Nh();let n=0;return i.split(Tg).map(r=>{let s=sE(r),a={input:s,offset:n};n+=s.length+1;try{let o=a.tokens=CE(s,t,e),c=o.length,l;if(!c)throw new Error("empty label");let u=a.output=o.flat();if(_E(u),!(a.emoji=c>1||o[0].is_emoji)&&u.every(f=>f<128))xE(u),l="ASCII";else{let f=o.flatMap(d=>d.is_emoji?[]:d);if(!f.length)l="Emoji";else{if(Lr.has(u[0]))throw ma("leading combining mark");for(let y=1;y<c;y++){let m=o[y];if(!m.is_emoji&&Lr.has(m[0]))throw ma(`emoji + combining mark: "${ks(o[y-1])} + ${Cc([m[0]])}"`)}vE(u);let d=cc(new Set(f)),[g]=SE(d);TE(g,f),ME(g,d),l=g.N}}a.type=l}catch(o){a.error=o}return a})}function ME(i,t){let e,n=[];for(let r of t){let s=bs.get(r);if(s===Rg)return;if(s){let a=s.M.get(r);if(e=e?e.filter(o=>a.has(o)):cc(a),!e.length)return}else n.push(r)}if(e){for(let r of e)if(n.every(s=>Ia(r,s)))throw new Error(`whole-script confusable: ${i.N}/${r.N}`)}}function SE(i){let t=Ps;for(let e of i){let n=t.filter(r=>Ia(r,e));if(!n.length)throw Ps.some(r=>Ia(r,e))?Ug(t[0],e):Lg(e);if(t=n,n.length==1)break}return t}function EE(i){return i.map(({input:t,error:e,output:n})=>{if(e){let r=e.message;throw new Error(i.length==1?r:`Invalid label ${Uh(Cc(t,63))}: ${r}`)}return ks(n)}).join(Tg)}function Lg(i){return new Error(`disallowed character: ${Lh(i)}`)}function Ug(i,t){let e=Lh(t),n=Ps.find(r=>r.P.has(t));return n&&(e=`${n.N} ${e}`),new Error(`illegal mixture: ${i.N} + ${e}`)}function ma(i){return new Error(`illegal placement: ${i}`)}function TE(i,t){for(let e of t)if(!Ia(i,e))throw Ug(i,e);if(i.M){let e=Eg(t);for(let n=1,r=e.length;n<r;n++)if(zu.has(e[n])){let s=n+1;for(let a;s<r&&zu.has(a=e[s]);s++)for(let o=n;o<s;o++)if(e[o]==a)throw new Error(`duplicate non-spacing marks: ${Lh(a)}`);if(s-n>Vd)throw new Error(`excessive non-spacing marks: ${Uh(Cc(e.slice(n-1,s)))} (${s-n}/${Vd})`);n=s}}}function CE(i,t,e){let n=[],r=[];for(i=i.slice().reverse();i.length;){let s=PE(i);if(s)r.length&&(n.push(t(r)),r=[]),n.push(e(s));else{let a=i.pop();if(Mr.has(a))r.push(a);else{let o=Hu.get(a);if(o)r.push(...o);else if(!Pg.has(a))throw Lg(a)}}}return r.length&&n.push(t(r)),n}function RE(i){return i.filter(t=>t!=Cg)}function PE(i,t){let e=Vu,n,r=i.length;for(;r&&(e=e.get(i[--r]),!!e);){let{V:s}=e;s&&(n=s,i.length=r)}return n}const Dg=new Uint8Array(32);Dg.fill(0);function Kd(i){return O(i.length!==0,"invalid ENS name; empty component","comp",i),i}function Dh(i){const t=ii(Fg(i)),e=[];if(i.length===0)return e;let n=0;for(let r=0;r<t.length;r++)t[r]===46&&(e.push(Kd(t.slice(n,r))),n=r+1);return O(n<t.length,"invalid ENS name; empty component","name",i),e.push(Kd(t.slice(n))),e}function Fg(i){try{if(i.length===0)throw new Error("empty label");return wE(i)}catch(t){O(!1,`invalid ENS name (${t.message})`,"name",i)}}function Yd(i){try{return Dh(i).length!==0}catch{}return!1}function Jd(i){O(typeof i=="string","invalid ENS name; not a string","name",i),O(i.length,"invalid ENS name (empty label)","name",i);let t=Dg;const e=Dh(i);for(;e.length;)t=Ge(Pe([t,Ge(e.pop())]));return _t(t)}function Qd(i,t){const e=t;return O(e<=255,"DNS encoded label cannot exceed 255","length",e),_t(Pe(Dh(i).map(n=>{O(n.length<=e,`label ${JSON.stringify(i)} exceeds ${e} bytes`,"name",i);const r=new Uint8Array(n.length+1);return r.set(n,1),r[0]=r.length-1,r})))+"00"}const Og=new Uint8Array(32);Og.fill(0);const IE=BigInt(-1),Bg=BigInt(0),kg=BigInt(1),NE=BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");function LE(i){const t=Zt(i),e=t.length%32;return e?Pe([t,Og.slice(e)]):_t(t)}const UE=fr(kg,32),DE=fr(Bg,32),Zd={name:"string",version:"string",chainId:"uint256",verifyingContract:"address",salt:"bytes32"},Pl=["name","version","chainId","verifyingContract","salt"];function $d(i){return function(t){return O(typeof t=="string",`invalid domain value for ${JSON.stringify(i)}`,`domain.${i}`,t),t}}const FE={name:$d("name"),version:$d("version"),chainId:function(i){const t=bt(i,"domain.chainId");return O(t>=0,"invalid chain ID","domain.chainId",i),Number.isSafeInteger(t)?Number(t):Zn(t)},verifyingContract:function(i){try{return he(i).toLowerCase()}catch{}O(!1,'invalid domain value "verifyingContract"',"domain.verifyingContract",i)},salt:function(i){const t=Zt(i,"domain.salt");return O(t.length===32,'invalid domain value "salt"',"domain.salt",i),_t(t)}};function Il(i){{const t=i.match(/^(u?)int(\d+)$/);if(t){const e=t[1]==="",n=parseInt(t[2]);O(n%8===0&&n!==0&&n<=256&&t[2]===String(n),"invalid numeric width","type",i);const r=Ir(NE,e?n-1:n),s=e?(r+kg)*IE:Bg;return function(a){const o=bt(a,"value");return O(o>=s&&o<=r,`value out-of-bounds for ${i}`,"value",o),fr(e?Em(o,256):o,32)}}}{const t=i.match(/^bytes(\d+)$/);if(t){const e=parseInt(t[1]);return O(e!==0&&e<=32&&t[1]===String(e),"invalid bytes width","type",i),function(n){const r=Zt(n);return O(r.length===e,`invalid length for ${i}`,"value",n),LE(n)}}}switch(i){case"address":return function(t){return Gi(he(t),32)};case"bool":return function(t){return t?UE:DE};case"bytes":return function(t){return Ge(t)};case"string":return function(t){return Xr(t)}}return null}function jd(i,t){return`${i}(${t.map(({name:e,type:n})=>n+" "+e).join(",")})`}function Eo(i){const t=i.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);return t?{base:t[1],index:t[2]+t[4],array:{base:t[1],prefix:t[1]+t[2],count:t[5]?parseInt(t[5]):-1}}:{base:i}}class Rn{primaryType;#t;get types(){return JSON.parse(this.#t)}#e;#n;constructor(t){this.#e=new Map,this.#n=new Map;const e=new Map,n=new Map,r=new Map,s={};Object.keys(t).forEach(c=>{s[c]=t[c].map(({name:l,type:u})=>{let{base:h,index:f}=Eo(u);return h==="int"&&!t.int&&(h="int256"),h==="uint"&&!t.uint&&(h="uint256"),{name:l,type:h+(f||"")}}),e.set(c,new Set),n.set(c,[]),r.set(c,new Set)}),this.#t=JSON.stringify(s);for(const c in s){const l=new Set;for(const u of s[c]){O(!l.has(u.name),`duplicate variable name ${JSON.stringify(u.name)} in ${JSON.stringify(c)}`,"types",t),l.add(u.name);const h=Eo(u.type).base;O(h!==c,`circular type reference to ${JSON.stringify(h)}`,"types",t),!Il(h)&&(O(n.has(h),`unknown type ${JSON.stringify(h)}`,"types",t),n.get(h).push(c),e.get(c).add(h))}}const a=Array.from(n.keys()).filter(c=>n.get(c).length===0);O(a.length!==0,"missing primary type","types",t),O(a.length===1,`ambiguous primary types or unused types: ${a.map(c=>JSON.stringify(c)).join(", ")}`,"types",t),Ft(this,{primaryType:a[0]});function o(c,l){O(!l.has(c),`circular type reference to ${JSON.stringify(c)}`,"types",t),l.add(c);for(const u of e.get(c))if(n.has(u)){o(u,l);for(const h of l)r.get(h).add(u)}l.delete(c)}o(this.primaryType,new Set);for(const[c,l]of r){const u=Array.from(l);u.sort(),this.#e.set(c,jd(c,s[c])+u.map(h=>jd(h,s[h])).join(""))}}getEncoder(t){let e=this.#n.get(t);return e||(e=this.#i(t),this.#n.set(t,e)),e}#i(t){{const r=Il(t);if(r)return r}const e=Eo(t).array;if(e){const r=e.prefix,s=this.getEncoder(r);return a=>{O(e.count===-1||e.count===a.length,`array length mismatch; expected length ${e.count}`,"value",a);let o=a.map(s);return this.#e.has(r)&&(o=o.map(Ge)),Ge(Pe(o))}}const n=this.types[t];if(n){const r=Xr(this.#e.get(t));return s=>{const a=n.map(({name:o,type:c})=>{const l=this.getEncoder(c)(s[o]);return this.#e.has(c)?Ge(l):l});return a.unshift(r),Pe(a)}}O(!1,`unknown type: ${t}`,"type",t)}encodeType(t){const e=this.#e.get(t);return O(e,`unknown type: ${JSON.stringify(t)}`,"name",t),e}encodeData(t,e){return this.getEncoder(t)(e)}hashStruct(t,e){return Ge(this.encodeData(t,e))}encode(t){return this.encodeData(this.primaryType,t)}hash(t){return this.hashStruct(this.primaryType,t)}_visit(t,e,n){if(Il(t))return n(t,e);const r=Eo(t).array;if(r)return O(r.count===-1||r.count===e.length,`array length mismatch; expected length ${r.count}`,"value",e),e.map(a=>this._visit(r.prefix,a,n));const s=this.types[t];if(s)return s.reduce((a,{name:o,type:c})=>(a[o]=this._visit(c,e[o],n),a),{});O(!1,`unknown type: ${t}`,"type",t)}visit(t,e){return this._visit(this.primaryType,t,e)}static from(t){return new Rn(t)}static getPrimaryType(t){return Rn.from(t).primaryType}static hashStruct(t,e,n){return Rn.from(e).hashStruct(t,n)}static hashDomain(t){const e=[];for(const n in t){if(t[n]==null)continue;const r=Zd[n];O(r,`invalid typed-data domain key: ${JSON.stringify(n)}`,"domain",t),e.push({name:n,type:r})}return e.sort((n,r)=>Pl.indexOf(n.name)-Pl.indexOf(r.name)),Rn.hashStruct("EIP712Domain",{EIP712Domain:e},t)}static encode(t,e,n){return Pe(["0x1901",Rn.hashDomain(t),Rn.from(e).hash(n)])}static hash(t,e,n){return Ge(Rn.encode(t,e,n))}static async resolveNames(t,e,n,r){t=Object.assign({},t);for(const o in t)t[o]==null&&delete t[o];const s={};t.verifyingContract&&!be(t.verifyingContract,20)&&(s[t.verifyingContract]="0x");const a=Rn.from(e);a.visit(n,(o,c)=>(o==="address"&&!be(c,20)&&(s[c]="0x"),c));for(const o in s)s[o]=await r(o);return t.verifyingContract&&s[t.verifyingContract]&&(t.verifyingContract=s[t.verifyingContract]),n=a.visit(n,(o,c)=>o==="address"&&s[c]?s[c]:c),{domain:t,value:n}}static getPayload(t,e,n){Rn.hashDomain(t);const r={},s=[];Pl.forEach(c=>{const l=t[c];l!=null&&(r[c]=FE[c](l),s.push({name:c,type:Zd[c]}))});const a=Rn.from(e);e=a.types;const o=Object.assign({},e);return O(o.EIP712Domain==null,"types must not contain EIP712Domain type","types.EIP712Domain",e),o.EIP712Domain=s,a.encode(n),{types:o,domain:r,primaryType:a.primaryType,message:a.visit(n,(c,l)=>{if(c.match(/^bytes(\d*)/))return _t(Zt(l));if(c.match(/^u?int/))return bt(l).toString();switch(c){case"address":return l.toLowerCase();case"bool":return!!l;case"string":return O(typeof l=="string","invalid string","value",l),l}O(!1,"unsupported type","type",c)})}}}function yn(i){const t=new Set;return i.forEach(e=>t.add(e)),Object.freeze(t)}const OE="external public payable override",BE=yn(OE.split(" ")),Gg="constant external internal payable private public pure view override",kE=yn(Gg.split(" ")),Hg="constructor error event fallback function receive struct",zg=yn(Hg.split(" ")),Vg="calldata memory storage payable indexed",GE=yn(Vg.split(" ")),HE="tuple returns",zE=[Hg,Vg,HE,Gg].join(" "),VE=yn(zE.split(" ")),WE={"(":"OPEN_PAREN",")":"CLOSE_PAREN","[":"OPEN_BRACKET","]":"CLOSE_BRACKET",",":"COMMA","@":"AT"},XE=new RegExp("^(\\s*)"),qE=new RegExp("^([0-9]+)"),KE=new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"),Wg=new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"),Xg=new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");class zn{#t;#e;get offset(){return this.#t}get length(){return this.#e.length-this.#t}constructor(t){this.#t=0,this.#e=t.slice()}clone(){return new zn(this.#e)}reset(){this.#t=0}#n(t=0,e=0){return new zn(this.#e.slice(t,e).map(n=>Object.freeze(Object.assign({},n,{match:n.match-t,linkBack:n.linkBack-t,linkNext:n.linkNext-t}))))}popKeyword(t){const e=this.peek();if(e.type!=="KEYWORD"||!t.has(e.text))throw new Error(`expected keyword ${e.text}`);return this.pop().text}popType(t){if(this.peek().type!==t){const e=this.peek();throw new Error(`expected ${t}; got ${e.type} ${JSON.stringify(e.text)}`)}return this.pop().text}popParen(){const t=this.peek();if(t.type!=="OPEN_PAREN")throw new Error("bad start");const e=this.#n(this.#t+1,t.match+1);return this.#t=t.match+1,e}popParams(){const t=this.peek();if(t.type!=="OPEN_PAREN")throw new Error("bad start");const e=[];for(;this.#t<t.match-1;){const n=this.peek().linkNext;e.push(this.#n(this.#t+1,n)),this.#t=n}return this.#t=t.match+1,e}peek(){if(this.#t>=this.#e.length)throw new Error("out-of-bounds");return this.#e[this.#t]}peekKeyword(t){const e=this.peekType("KEYWORD");return e!=null&&t.has(e)?e:null}peekType(t){if(this.length===0)return null;const e=this.peek();return e.type===t?e.text:null}pop(){const t=this.peek();return this.#t++,t}toString(){const t=[];for(let e=this.#t;e<this.#e.length;e++){const n=this.#e[e];t.push(`${n.type}:${n.text}`)}return`<TokenString ${t.join(" ")}>`}}function pr(i){const t=[],e=a=>{const o=s<i.length?JSON.stringify(i[s]):"$EOI";throw new Error(`invalid token ${o} at ${s}: ${a}`)};let n=[],r=[],s=0;for(;s<i.length;){let a=i.substring(s),o=a.match(XE);o&&(s+=o[1].length,a=i.substring(s));const c={depth:n.length,linkBack:-1,linkNext:-1,match:-1,type:"",text:"",offset:s,value:-1};t.push(c);let l=WE[a[0]]||"";if(l){if(c.type=l,c.text=a[0],s++,l==="OPEN_PAREN")n.push(t.length-1),r.push(t.length-1);else if(l=="CLOSE_PAREN")n.length===0&&e("no matching open bracket"),c.match=n.pop(),t[c.match].match=t.length-1,c.depth--,c.linkBack=r.pop(),t[c.linkBack].linkNext=t.length-1;else if(l==="COMMA")c.linkBack=r.pop(),t[c.linkBack].linkNext=t.length-1,r.push(t.length-1);else if(l==="OPEN_BRACKET")c.type="BRACKET";else if(l==="CLOSE_BRACKET"){let u=t.pop().text;if(t.length>0&&t[t.length-1].type==="NUMBER"){const h=t.pop().text;u=h+u,t[t.length-1].value=Xt(h)}if(t.length===0||t[t.length-1].type!=="BRACKET")throw new Error("missing opening bracket");t[t.length-1].text+=u}continue}if(o=a.match(KE),o){if(c.text=o[1],s+=c.text.length,VE.has(c.text)){c.type="KEYWORD";continue}if(c.text.match(Xg)){c.type="TYPE";continue}c.type="ID";continue}if(o=a.match(qE),o){c.text=o[1],c.type="NUMBER",s+=c.text.length;continue}throw new Error(`unexpected token ${JSON.stringify(a[0])} at position ${s}`)}return new zn(t.map(a=>Object.freeze(a)))}function tp(i,t){let e=[];for(const n in t.keys())i.has(n)&&e.push(n);if(e.length>1)throw new Error(`conflicting types: ${e.join(", ")}`)}function Rc(i,t){if(t.peekKeyword(zg)){const e=t.pop().text;if(e!==i)throw new Error(`expected ${i}, got ${e}`)}return t.popType("ID")}function zi(i,t){const e=new Set;for(;;){const n=i.peekType("KEYWORD");if(n==null||t&&!t.has(n))break;if(i.pop(),e.has(n))throw new Error(`duplicate keywords: ${JSON.stringify(n)}`);e.add(n)}return Object.freeze(e)}function qg(i){let t=zi(i,kE);return tp(t,yn("constant payable nonpayable".split(" "))),tp(t,yn("pure view payable nonpayable".split(" "))),t.has("view")?"view":t.has("pure")?"pure":t.has("payable")?"payable":t.has("nonpayable")?"nonpayable":t.has("constant")?"view":"nonpayable"}function Oi(i,t){return i.popParams().map(e=>Se.from(e,t))}function Kg(i){if(i.peekType("AT")){if(i.pop(),i.peekType("NUMBER"))return bt(i.pop().text);throw new Error("invalid gas")}return null}function qr(i){if(i.length)throw new Error(`unexpected tokens at offset ${i.offset}: ${i.toString()}`)}const YE=new RegExp(/^(.*)\[([0-9]*)\]$/);function ep(i){const t=i.match(Xg);if(O(t,"invalid type","type",i),i==="uint")return"uint256";if(i==="int")return"int256";if(t[2]){const e=parseInt(t[2]);O(e!==0&&e<=32,"invalid bytes length","type",i)}else if(t[3]){const e=parseInt(t[3]);O(e!==0&&e<=256&&e%8===0,"invalid numeric width","type",i)}return i}const Ne={},En=Symbol.for("_ethers_internal"),np="_ParamTypeInternal",ip="_ErrorInternal",rp="_EventInternal",sp="_ConstructorInternal",ap="_FallbackInternal",op="_FunctionInternal",cp="_StructInternal";class Se{name;type;baseType;indexed;components;arrayLength;arrayChildren;constructor(t,e,n,r,s,a,o,c){if(Fa(t,Ne,"ParamType"),Object.defineProperty(this,En,{value:np}),a&&(a=Object.freeze(a.slice())),r==="array"){if(o==null||c==null)throw new Error("")}else if(o!=null||c!=null)throw new Error("");if(r==="tuple"){if(a==null)throw new Error("")}else if(a!=null)throw new Error("");Ft(this,{name:e,type:n,baseType:r,indexed:s,components:a,arrayLength:o,arrayChildren:c})}format(t){if(t==null&&(t="sighash"),t==="json"){const n=this.name||"";if(this.isArray()){const s=JSON.parse(this.arrayChildren.format("json"));return s.name=n,s.type+=`[${this.arrayLength<0?"":String(this.arrayLength)}]`,JSON.stringify(s)}const r={type:this.baseType==="tuple"?"tuple":this.type,name:n};return typeof this.indexed=="boolean"&&(r.indexed=this.indexed),this.isTuple()&&(r.components=this.components.map(s=>JSON.parse(s.format(t)))),JSON.stringify(r)}let e="";return this.isArray()?(e+=this.arrayChildren.format(t),e+=`[${this.arrayLength<0?"":String(this.arrayLength)}]`):this.isTuple()?e+="("+this.components.map(n=>n.format(t)).join(t==="full"?", ":",")+")":e+=this.type,t!=="sighash"&&(this.indexed===!0&&(e+=" indexed"),t==="full"&&this.name&&(e+=" "+this.name)),e}isArray(){return this.baseType==="array"}isTuple(){return this.baseType==="tuple"}isIndexable(){return this.indexed!=null}walk(t,e){if(this.isArray()){if(!Array.isArray(t))throw new Error("invalid array value");if(this.arrayLength!==-1&&t.length!==this.arrayLength)throw new Error("array is wrong length");const n=this;return t.map(r=>n.arrayChildren.walk(r,e))}if(this.isTuple()){if(!Array.isArray(t))throw new Error("invalid tuple value");if(t.length!==this.components.length)throw new Error("array is wrong length");const n=this;return t.map((r,s)=>n.components[s].walk(r,e))}return e(this.type,t)}#t(t,e,n,r){if(this.isArray()){if(!Array.isArray(e))throw new Error("invalid array value");if(this.arrayLength!==-1&&e.length!==this.arrayLength)throw new Error("array is wrong length");const a=this.arrayChildren,o=e.slice();o.forEach((c,l)=>{a.#t(t,c,n,u=>{o[l]=u})}),r(o);return}if(this.isTuple()){const a=this.components;let o;if(Array.isArray(e))o=e.slice();else{if(e==null||typeof e!="object")throw new Error("invalid tuple value");o=a.map(c=>{if(!c.name)throw new Error("cannot use object value with unnamed components");if(!(c.name in e))throw new Error(`missing value for component ${c.name}`);return e[c.name]})}if(o.length!==this.components.length)throw new Error("array is wrong length");o.forEach((c,l)=>{a[l].#t(t,c,n,u=>{o[l]=u})}),r(o);return}const s=n(this.type,e);s.then?t.push((async function(){r(await s)})()):r(s)}async walkAsync(t,e){const n=[],r=[t];return this.#t(n,t,e,s=>{r[0]=s}),n.length&&await Promise.all(n),r[0]}static from(t,e){if(Se.isParamType(t))return t;if(typeof t=="string")try{return Se.from(pr(t),e)}catch{O(!1,"invalid param type","obj",t)}else if(t instanceof zn){let o="",c="",l=null;zi(t,yn(["tuple"])).has("tuple")||t.peekType("OPEN_PAREN")?(c="tuple",l=t.popParams().map(y=>Se.from(y)),o=`tuple(${l.map(y=>y.format()).join(",")})`):(o=ep(t.popType("TYPE")),c=o);let u=null,h=null;for(;t.length&&t.peekType("BRACKET");){const y=t.pop();u=new Se(Ne,"",o,c,null,l,h,u),h=y.value,o+=y.text,c="array",l=null}let f=null;if(zi(t,GE).has("indexed")){if(!e)throw new Error("");f=!0}const g=t.peekType("ID")?t.pop().text:"";if(t.length)throw new Error("leftover tokens");return new Se(Ne,g,o,c,f,l,h,u)}const n=t.name;O(!n||typeof n=="string"&&n.match(Wg),"invalid name","obj.name",n);let r=t.indexed;r!=null&&(O(e,"parameter cannot be indexed","obj.indexed",t.indexed),r=!!r);let s=t.type,a=s.match(YE);if(a){const o=parseInt(a[2]||"-1"),c=Se.from({type:a[1],components:t.components});return new Se(Ne,n||"",s,"array",r,null,o,c)}if(s==="tuple"||s.startsWith("tuple(")||s.startsWith("(")){const o=t.components!=null?t.components.map(l=>Se.from(l)):null;return new Se(Ne,n||"",s,"tuple",r,o,null,null)}return s=ep(t.type),new Se(Ne,n||"",s,s,r,null,null,null)}static isParamType(t){return t&&t[En]===np}}class Kr{type;inputs;constructor(t,e,n){Fa(t,Ne,"Fragment"),n=Object.freeze(n.slice()),Ft(this,{type:e,inputs:n})}static from(t){if(typeof t=="string"){try{Kr.from(JSON.parse(t))}catch{}return Kr.from(pr(t))}if(t instanceof zn)switch(t.peekKeyword(zg)){case"constructor":return Li.from(t);case"error":return wn.from(t);case"event":return fi.from(t);case"fallback":case"receive":return Ti.from(t);case"function":return di.from(t);case"struct":return kr.from(t)}else if(typeof t=="object"){switch(t.type){case"constructor":return Li.from(t);case"error":return wn.from(t);case"event":return fi.from(t);case"fallback":case"receive":return Ti.from(t);case"function":return di.from(t);case"struct":return kr.from(t)}it(!1,`unsupported type: ${t.type}`,"UNSUPPORTED_OPERATION",{operation:"Fragment.from"})}O(!1,"unsupported frgament object","obj",t)}static isConstructor(t){return Li.isFragment(t)}static isError(t){return wn.isFragment(t)}static isEvent(t){return fi.isFragment(t)}static isFunction(t){return di.isFragment(t)}static isStruct(t){return kr.isFragment(t)}}class Pc extends Kr{name;constructor(t,e,n,r){super(t,e,r),O(typeof n=="string"&&n.match(Wg),"invalid identifier","name",n),r=Object.freeze(r.slice()),Ft(this,{name:n})}}function Na(i,t){return"("+t.map(e=>e.format(i)).join(i==="full"?", ":",")+")"}class wn extends Pc{constructor(t,e,n){super(t,"error",e,n),Object.defineProperty(this,En,{value:ip})}get selector(){return Xr(this.format("sighash")).substring(0,10)}format(t){if(t==null&&(t="sighash"),t==="json")return JSON.stringify({type:"error",name:this.name,inputs:this.inputs.map(n=>JSON.parse(n.format(t)))});const e=[];return t!=="sighash"&&e.push("error"),e.push(this.name+Na(t,this.inputs)),e.join(" ")}static from(t){if(wn.isFragment(t))return t;if(typeof t=="string")return wn.from(pr(t));if(t instanceof zn){const e=Rc("error",t),n=Oi(t);return qr(t),new wn(Ne,e,n)}return new wn(Ne,t.name,t.inputs?t.inputs.map(Se.from):[])}static isFragment(t){return t&&t[En]===ip}}class fi extends Pc{anonymous;constructor(t,e,n,r){super(t,"event",e,n),Object.defineProperty(this,En,{value:rp}),Ft(this,{anonymous:r})}get topicHash(){return Xr(this.format("sighash"))}format(t){if(t==null&&(t="sighash"),t==="json")return JSON.stringify({type:"event",anonymous:this.anonymous,name:this.name,inputs:this.inputs.map(n=>JSON.parse(n.format(t)))});const e=[];return t!=="sighash"&&e.push("event"),e.push(this.name+Na(t,this.inputs)),t!=="sighash"&&this.anonymous&&e.push("anonymous"),e.join(" ")}static getTopicHash(t,e){return e=(e||[]).map(r=>Se.from(r)),new fi(Ne,t,e,!1).topicHash}static from(t){if(fi.isFragment(t))return t;if(typeof t=="string")try{return fi.from(pr(t))}catch{O(!1,"invalid event fragment","obj",t)}else if(t instanceof zn){const e=Rc("event",t),n=Oi(t,!0),r=!!zi(t,yn(["anonymous"])).has("anonymous");return qr(t),new fi(Ne,e,n,r)}return new fi(Ne,t.name,t.inputs?t.inputs.map(e=>Se.from(e,!0)):[],!!t.anonymous)}static isFragment(t){return t&&t[En]===rp}}class Li extends Kr{payable;gas;constructor(t,e,n,r,s){super(t,e,n),Object.defineProperty(this,En,{value:sp}),Ft(this,{payable:r,gas:s})}format(t){if(it(t!=null&&t!=="sighash","cannot format a constructor for sighash","UNSUPPORTED_OPERATION",{operation:"format(sighash)"}),t==="json")return JSON.stringify({type:"constructor",stateMutability:this.payable?"payable":"undefined",payable:this.payable,gas:this.gas!=null?this.gas:void 0,inputs:this.inputs.map(n=>JSON.parse(n.format(t)))});const e=[`constructor${Na(t,this.inputs)}`];return this.payable&&e.push("payable"),this.gas!=null&&e.push(`@${this.gas.toString()}`),e.join(" ")}static from(t){if(Li.isFragment(t))return t;if(typeof t=="string")try{return Li.from(pr(t))}catch{O(!1,"invalid constuctor fragment","obj",t)}else if(t instanceof zn){zi(t,yn(["constructor"]));const e=Oi(t),n=!!zi(t,BE).has("payable"),r=Kg(t);return qr(t),new Li(Ne,"constructor",e,n,r)}return new Li(Ne,"constructor",t.inputs?t.inputs.map(Se.from):[],!!t.payable,t.gas!=null?t.gas:null)}static isFragment(t){return t&&t[En]===sp}}class Ti extends Kr{payable;constructor(t,e,n){super(t,"fallback",e),Object.defineProperty(this,En,{value:ap}),Ft(this,{payable:n})}format(t){const e=this.inputs.length===0?"receive":"fallback";if(t==="json"){const n=this.payable?"payable":"nonpayable";return JSON.stringify({type:e,stateMutability:n})}return`${e}()${this.payable?" payable":""}`}static from(t){if(Ti.isFragment(t))return t;if(typeof t=="string")try{return Ti.from(pr(t))}catch{O(!1,"invalid fallback fragment","obj",t)}else if(t instanceof zn){const e=t.toString(),n=t.peekKeyword(yn(["fallback","receive"]));if(O(n,"type must be fallback or receive","obj",e),t.popKeyword(yn(["fallback","receive"]))==="receive"){const o=Oi(t);return O(o.length===0,"receive cannot have arguments","obj.inputs",o),zi(t,yn(["payable"])),qr(t),new Ti(Ne,[],!0)}let s=Oi(t);s.length?O(s.length===1&&s[0].type==="bytes","invalid fallback inputs","obj.inputs",s.map(o=>o.format("minimal")).join(", ")):s=[Se.from("bytes")];const a=qg(t);if(O(a==="nonpayable"||a==="payable","fallback cannot be constants","obj.stateMutability",a),zi(t,yn(["returns"])).has("returns")){const o=Oi(t);O(o.length===1&&o[0].type==="bytes","invalid fallback outputs","obj.outputs",o.map(c=>c.format("minimal")).join(", "))}return qr(t),new Ti(Ne,s,a==="payable")}if(t.type==="receive")return new Ti(Ne,[],!0);if(t.type==="fallback"){const e=[Se.from("bytes")],n=t.stateMutability==="payable";return new Ti(Ne,e,n)}O(!1,"invalid fallback description","obj",t)}static isFragment(t){return t&&t[En]===ap}}class di extends Pc{constant;outputs;stateMutability;payable;gas;constructor(t,e,n,r,s,a){super(t,"function",e,r),Object.defineProperty(this,En,{value:op}),s=Object.freeze(s.slice()),Ft(this,{constant:n==="view"||n==="pure",gas:a,outputs:s,payable:n==="payable",stateMutability:n})}get selector(){return Xr(this.format("sighash")).substring(0,10)}format(t){if(t==null&&(t="sighash"),t==="json")return JSON.stringify({type:"function",name:this.name,constant:this.constant,stateMutability:this.stateMutability!=="nonpayable"?this.stateMutability:void 0,payable:this.payable,gas:this.gas!=null?this.gas:void 0,inputs:this.inputs.map(n=>JSON.parse(n.format(t))),outputs:this.outputs.map(n=>JSON.parse(n.format(t)))});const e=[];return t!=="sighash"&&e.push("function"),e.push(this.name+Na(t,this.inputs)),t!=="sighash"&&(this.stateMutability!=="nonpayable"&&e.push(this.stateMutability),this.outputs&&this.outputs.length&&(e.push("returns"),e.push(Na(t,this.outputs))),this.gas!=null&&e.push(`@${this.gas.toString()}`)),e.join(" ")}static getSelector(t,e){return e=(e||[]).map(r=>Se.from(r)),new di(Ne,t,"view",e,[],null).selector}static from(t){if(di.isFragment(t))return t;if(typeof t=="string")try{return di.from(pr(t))}catch{O(!1,"invalid function fragment","obj",t)}else if(t instanceof zn){const n=Rc("function",t),r=Oi(t),s=qg(t);let a=[];zi(t,yn(["returns"])).has("returns")&&(a=Oi(t));const o=Kg(t);return qr(t),new di(Ne,n,s,r,a,o)}let e=t.stateMutability;return e==null&&(e="payable",typeof t.constant=="boolean"?(e="view",t.constant||(e="payable",typeof t.payable=="boolean"&&!t.payable&&(e="nonpayable"))):typeof t.payable=="boolean"&&!t.payable&&(e="nonpayable")),new di(Ne,t.name,e,t.inputs?t.inputs.map(Se.from):[],t.outputs?t.outputs.map(Se.from):[],t.gas!=null?t.gas:null)}static isFragment(t){return t&&t[En]===op}}class kr extends Pc{constructor(t,e,n){super(t,"struct",e,n),Object.defineProperty(this,En,{value:cp})}format(){throw new Error("@TODO")}static from(t){if(typeof t=="string")try{return kr.from(pr(t))}catch{O(!1,"invalid struct fragment","obj",t)}else if(t instanceof zn){const e=Rc("struct",t),n=Oi(t);return qr(t),new kr(Ne,e,n)}return new kr(Ne,t.name,t.inputs?t.inputs.map(Se.from):[])}static isFragment(t){return t&&t[En]===cp}}const si=new Map;si.set(0,"GENERIC_PANIC");si.set(1,"ASSERT_FALSE");si.set(17,"OVERFLOW");si.set(18,"DIVIDE_BY_ZERO");si.set(33,"ENUM_RANGE_ERROR");si.set(34,"BAD_STORAGE_DATA");si.set(49,"STACK_UNDERFLOW");si.set(50,"ARRAY_RANGE_ERROR");si.set(65,"OUT_OF_MEMORY");si.set(81,"UNINITIALIZED_FUNCTION_CALL");const JE=new RegExp(/^bytes([0-9]*)$/),QE=new RegExp(/^(u?int)([0-9]*)$/);let Nl=null,lp=1024;function ZE(i,t,e,n){let r="missing revert data",s=null;const a=null;let o=null;if(e){r="execution reverted";const l=Zt(e);if(e=_t(e),l.length===0)r+=" (no data present; likely require(false) occurred",s="require(false)";else if(l.length%32!==4)r+=" (could not decode reason; invalid data length)";else if(_t(l.slice(0,4))==="0x08c379a0")try{s=n.decode(["string"],l.slice(4))[0],o={signature:"Error(string)",name:"Error",args:[s]},r+=`: ${JSON.stringify(s)}`}catch{r+=" (could not decode reason; invalid string data)"}else if(_t(l.slice(0,4))==="0x4e487b71")try{const u=Number(n.decode(["uint256"],l.slice(4))[0]);o={signature:"Panic(uint256)",name:"Panic",args:[u]},s=`Panic due to ${si.get(u)||"UNKNOWN"}(${u})`,r+=`: ${s}`}catch{r+=" (could not decode panic code)"}else r+=" (unknown custom error)"}const c={to:t.to?he(t.to):null,data:t.data||"0x"};return t.from&&(c.from=he(t.from)),Re(r,"CALL_EXCEPTION",{action:i,data:e,reason:s,transaction:c,invocation:a,revert:o})}class Hs{#t(t){if(t.isArray())return new gS(this.#t(t.arrayChildren),t.arrayLength,t.name);if(t.isTuple())return new So(t.components.map(n=>this.#t(n)),t.name);switch(t.baseType){case"address":return new pS(t.name);case"bool":return new yS(t.name);case"string":return new ES(t.name);case"bytes":return new xS(t.name);case"":return new bS(t.name)}let e=t.type.match(QE);if(e){let n=parseInt(e[2]||"256");return O(n!==0&&n<=256&&n%8===0,"invalid "+e[1]+" bit length","param",t),new SS(n/8,e[1]==="int",t.name)}if(e=t.type.match(JE),e){let n=parseInt(e[1]);return O(n!==0&&n<=32,"invalid bytes length","param",t),new _S(n,t.name)}O(!1,"invalid type","type",t.type)}getDefaultValue(t){const e=t.map(r=>this.#t(Se.from(r)));return new So(e,"_").defaultValue()}encode(t,e){Am(e.length,t.length,"types/values length mismatch");const n=t.map(a=>this.#t(Se.from(a))),r=new So(n,"_"),s=new Nu;return r.encode(s,e),s.data}decode(t,e,n){const r=t.map(a=>this.#t(Se.from(a)));return new So(r,"_").decode(new wh(e,n,lp))}static _setDefaultMaxInflation(t){O(typeof t=="number"&&Number.isInteger(t),"invalid defaultMaxInflation factor","value",t),lp=t}static defaultAbiCoder(){return Nl==null&&(Nl=new Hs),Nl}static getBuiltinCallException(t,e,n){return ZE(t,e,n,Hs.defaultAbiCoder())}}class $E{fragment;name;signature;topic;args;constructor(t,e,n){const r=t.name,s=t.format();Ft(this,{fragment:t,name:r,signature:s,topic:e,args:n})}}class jE{fragment;name;args;signature;selector;value;constructor(t,e,n,r){const s=t.name,a=t.format();Ft(this,{fragment:t,name:s,args:n,signature:a,selector:e,value:r})}}class t1{fragment;name;args;signature;selector;constructor(t,e,n){const r=t.name,s=t.format();Ft(this,{fragment:t,name:r,args:n,signature:s,selector:e})}}class up{hash;_isIndexed;static isIndexed(t){return!!(t&&t._isIndexed)}constructor(t){Ft(this,{hash:t,_isIndexed:!0})}}const hp={0:"generic panic",1:"assert(false)",17:"arithmetic overflow",18:"division or modulo by zero",33:"enum overflow",34:"invalid encoded storage byte array accessed",49:"out-of-bounds array access; popping on an empty array",50:"out-of-bounds access of an array or bytesN",65:"out of memory",81:"uninitialized function"},fp={"0x08c379a0":{signature:"Error(string)",name:"Error",inputs:["string"],reason:i=>`reverted with reason string ${JSON.stringify(i)}`},"0x4e487b71":{signature:"Panic(uint256)",name:"Panic",inputs:["uint256"],reason:i=>{let t="unknown panic code";return i>=0&&i<=255&&hp[i.toString()]&&(t=hp[i.toString()]),`reverted with panic code 0x${i.toString(16)} (${t})`}}};class Tr{fragments;deploy;fallback;receive;#t;#e;#n;#i;constructor(t){let e=[];typeof t=="string"?e=JSON.parse(t):e=t,this.#n=new Map,this.#t=new Map,this.#e=new Map;const n=[];for(const a of e)try{n.push(Kr.from(a))}catch(o){console.log(`[Warning] Invalid Fragment ${JSON.stringify(a)}:`,o.message)}Ft(this,{fragments:Object.freeze(n)});let r=null,s=!1;this.#i=this.getAbiCoder(),this.fragments.forEach((a,o)=>{let c;switch(a.type){case"constructor":if(this.deploy){console.log("duplicate definition - constructor");return}Ft(this,{deploy:a});return;case"fallback":a.inputs.length===0?s=!0:(O(!r||a.payable!==r.payable,"conflicting fallback fragments",`fragments[${o}]`,a),r=a,s=r.payable);return;case"function":c=this.#n;break;case"event":c=this.#e;break;case"error":c=this.#t;break;default:return}const l=a.format();c.has(l)||c.set(l,a)}),this.deploy||Ft(this,{deploy:Li.from("constructor()")}),Ft(this,{fallback:r,receive:s})}format(t){const e=t?"minimal":"full";return this.fragments.map(r=>r.format(e))}formatJson(){const t=this.fragments.map(e=>e.format("json"));return JSON.stringify(t.map(e=>JSON.parse(e)))}getAbiCoder(){return Hs.defaultAbiCoder()}#r(t,e,n){if(be(t)){const s=t.toLowerCase();for(const a of this.#n.values())if(s===a.selector)return a;return null}if(t.indexOf("(")===-1){const s=[];for(const[a,o]of this.#n)a.split("(")[0]===t&&s.push(o);if(e){const a=e.length>0?e[e.length-1]:null;let o=e.length,c=!0;Fe.isTyped(a)&&a.type==="overrides"&&(c=!1,o--);for(let l=s.length-1;l>=0;l--){const u=s[l].inputs.length;u!==o&&(!c||u!==o-1)&&s.splice(l,1)}for(let l=s.length-1;l>=0;l--){const u=s[l].inputs;for(let h=0;h<e.length;h++)if(Fe.isTyped(e[h])){if(h>=u.length){if(e[h].type==="overrides")continue;s.splice(l,1);break}if(e[h].type!==u[h].baseType){s.splice(l,1);break}}}}if(s.length===1&&e&&e.length!==s[0].inputs.length){const a=e[e.length-1];(a==null||Array.isArray(a)||typeof a!="object")&&s.splice(0,1)}if(s.length===0)return null;if(s.length>1&&n){const a=s.map(o=>JSON.stringify(o.format())).join(", ");O(!1,`ambiguous function description (i.e. matches ${a})`,"key",t)}return s[0]}const r=this.#n.get(di.from(t).format());return r||null}getFunctionName(t){const e=this.#r(t,null,!1);return O(e,"no matching function","key",t),e.name}hasFunction(t){return!!this.#r(t,null,!1)}getFunction(t,e){return this.#r(t,e||null,!0)}forEachFunction(t){const e=Array.from(this.#n.keys());e.sort((n,r)=>n.localeCompare(r));for(let n=0;n<e.length;n++){const r=e[n];t(this.#n.get(r),n)}}#a(t,e,n){if(be(t)){const s=t.toLowerCase();for(const a of this.#e.values())if(s===a.topicHash)return a;return null}if(t.indexOf("(")===-1){const s=[];for(const[a,o]of this.#e)a.split("(")[0]===t&&s.push(o);if(e){for(let a=s.length-1;a>=0;a--)s[a].inputs.length<e.length&&s.splice(a,1);for(let a=s.length-1;a>=0;a--){const o=s[a].inputs;for(let c=0;c<e.length;c++)if(Fe.isTyped(e[c])&&e[c].type!==o[c].baseType){s.splice(a,1);break}}}if(s.length===0)return null;if(s.length>1&&n){const a=s.map(o=>JSON.stringify(o.format())).join(", ");O(!1,`ambiguous event description (i.e. matches ${a})`,"key",t)}return s[0]}const r=this.#e.get(fi.from(t).format());return r||null}getEventName(t){const e=this.#a(t,null,!1);return O(e,"no matching event","key",t),e.name}hasEvent(t){return!!this.#a(t,null,!1)}getEvent(t,e){return this.#a(t,e||null,!0)}forEachEvent(t){const e=Array.from(this.#e.keys());e.sort((n,r)=>n.localeCompare(r));for(let n=0;n<e.length;n++){const r=e[n];t(this.#e.get(r),n)}}getError(t,e){if(be(t)){const r=t.toLowerCase();if(fp[r])return wn.from(fp[r].signature);for(const s of this.#t.values())if(r===s.selector)return s;return null}if(t.indexOf("(")===-1){const r=[];for(const[s,a]of this.#t)s.split("(")[0]===t&&r.push(a);if(r.length===0)return t==="Error"?wn.from("error Error(string)"):t==="Panic"?wn.from("error Panic(uint256)"):null;if(r.length>1){const s=r.map(a=>JSON.stringify(a.format())).join(", ");O(!1,`ambiguous error description (i.e. ${s})`,"name",t)}return r[0]}if(t=wn.from(t).format(),t==="Error(string)")return wn.from("error Error(string)");if(t==="Panic(uint256)")return wn.from("error Panic(uint256)");const n=this.#t.get(t);return n||null}forEachError(t){const e=Array.from(this.#t.keys());e.sort((n,r)=>n.localeCompare(r));for(let n=0;n<e.length;n++){const r=e[n];t(this.#t.get(r),n)}}_decodeParams(t,e){return this.#i.decode(t,e)}_encodeParams(t,e){return this.#i.encode(t,e)}encodeDeploy(t){return this._encodeParams(this.deploy.inputs,t||[])}decodeErrorResult(t,e){if(typeof t=="string"){const n=this.getError(t);O(n,"unknown error","fragment",t),t=n}return O(De(e,0,4)===t.selector,`data signature does not match error ${t.name}.`,"data",e),this._decodeParams(t.inputs,De(e,4))}encodeErrorResult(t,e){if(typeof t=="string"){const n=this.getError(t);O(n,"unknown error","fragment",t),t=n}return Pe([t.selector,this._encodeParams(t.inputs,e||[])])}decodeFunctionData(t,e){if(typeof t=="string"){const n=this.getFunction(t);O(n,"unknown function","fragment",t),t=n}return O(De(e,0,4)===t.selector,`data signature does not match function ${t.name}.`,"data",e),this._decodeParams(t.inputs,De(e,4))}encodeFunctionData(t,e){if(typeof t=="string"){const n=this.getFunction(t);O(n,"unknown function","fragment",t),t=n}return Pe([t.selector,this._encodeParams(t.inputs,e||[])])}decodeFunctionResult(t,e){if(typeof t=="string"){const s=this.getFunction(t);O(s,"unknown function","fragment",t),t=s}let n="invalid length for result data";const r=dn(e);if(r.length%32===0)try{return this.#i.decode(t.outputs,r)}catch{n="could not decode result data"}it(!1,n,"BAD_DATA",{value:_t(r),info:{method:t.name,signature:t.format()}})}makeError(t,e){const n=Zt(t,"data"),r=Hs.getBuiltinCallException("call",e,n);if(r.message.startsWith("execution reverted (unknown custom error)")){const o=_t(n.slice(0,4)),c=this.getError(o);if(c)try{const l=this.#i.decode(c.inputs,n.slice(4));r.revert={name:c.name,signature:c.format(),args:l},r.reason=r.revert.signature,r.message=`execution reverted: ${r.reason}`}catch{r.message="execution reverted (coult not decode custom error)"}}const a=this.parseTransaction(e);return a&&(r.invocation={method:a.name,signature:a.signature,args:a.args}),r}encodeFunctionResult(t,e){if(typeof t=="string"){const n=this.getFunction(t);O(n,"unknown function","fragment",t),t=n}return _t(this.#i.encode(t.outputs,e||[]))}encodeFilterTopics(t,e){if(typeof t=="string"){const s=this.getEvent(t);O(s,"unknown event","eventFragment",t),t=s}it(e.length<=t.inputs.length,`too many arguments for ${t.format()}`,"UNEXPECTED_ARGUMENT",{count:e.length,expectedCount:t.inputs.length});const n=[];t.anonymous||n.push(t.topicHash);const r=(s,a)=>s.type==="string"?Xr(a):s.type==="bytes"?Ge(_t(a)):(s.type==="bool"&&typeof a=="boolean"?a=a?"0x01":"0x00":s.type.match(/^u?int/)?a=fr(a):s.type.match(/^bytes/)?a=bA(a,32):s.type==="address"&&this.#i.encode(["address"],[a]),Gi(_t(a),32));for(e.forEach((s,a)=>{const o=t.inputs[a];if(!o.indexed){O(s==null,"cannot filter non-indexed parameters; must be null","contract."+o.name,s);return}s==null?n.push(null):o.baseType==="array"||o.baseType==="tuple"?O(!1,"filtering with tuples or arrays not supported","contract."+o.name,s):Array.isArray(s)?n.push(s.map(c=>r(o,c))):n.push(r(o,s))});n.length&&n[n.length-1]===null;)n.pop();return n}encodeEventLog(t,e){if(typeof t=="string"){const a=this.getEvent(t);O(a,"unknown event","eventFragment",t),t=a}const n=[],r=[],s=[];return t.anonymous||n.push(t.topicHash),O(e.length===t.inputs.length,"event arguments/values mismatch","values",e),t.inputs.forEach((a,o)=>{const c=e[o];if(a.indexed)if(a.type==="string")n.push(Xr(c));else if(a.type==="bytes")n.push(Ge(c));else{if(a.baseType==="tuple"||a.baseType==="array")throw new Error("not implemented");n.push(this.#i.encode([a.type],[c]))}else r.push(a),s.push(c)}),{data:this.#i.encode(r,s),topics:n}}decodeEventLog(t,e,n){if(typeof t=="string"){const d=this.getEvent(t);O(d,"unknown event","eventFragment",t),t=d}if(n!=null&&!t.anonymous){const d=t.topicHash;O(be(n[0],32)&&n[0].toLowerCase()===d,"fragment/topic mismatch","topics[0]",n[0]),n=n.slice(1)}const r=[],s=[],a=[];t.inputs.forEach((d,g)=>{d.indexed?d.type==="string"||d.type==="bytes"||d.baseType==="tuple"||d.baseType==="array"?(r.push(Se.from({type:"bytes32",name:d.name})),a.push(!0)):(r.push(d),a.push(!1)):(s.push(d),a.push(!1))});const o=n!=null?this.#i.decode(r,Pe(n)):null,c=this.#i.decode(s,e,!0),l=[],u=[];let h=0,f=0;return t.inputs.forEach((d,g)=>{let y=null;if(d.indexed)if(o==null)y=new up(null);else if(a[g])y=new up(o[f++]);else try{y=o[f++]}catch(m){y=m}else try{y=c[h++]}catch(m){y=m}l.push(y),u.push(d.name||null)}),Ni.fromItems(l,u)}parseTransaction(t){const e=Zt(t.data,"tx.data"),n=bt(t.value!=null?t.value:0,"tx.value"),r=this.getFunction(_t(e.slice(0,4)));if(!r)return null;const s=this.#i.decode(r.inputs,e.slice(4));return new jE(r,r.selector,s,n)}parseCallResult(t){throw new Error("@TODO")}parseLog(t){const e=this.getEvent(t.topics[0]);return!e||e.anonymous?null:new $E(e,e.topicHash,this.decodeEventLog(e,t.data,t.topics))}parseError(t){const e=_t(t),n=this.getError(De(e,0,4));if(!n)return null;const r=this.#i.decode(n.inputs,De(e,4));return new t1(n,n.selector,r)}static from(t){return t instanceof Tr?t:typeof t=="string"?new Tr(JSON.parse(t)):typeof t.formatJson=="function"?new Tr(t.formatJson()):typeof t.format=="function"?new Tr(t.format("json")):new Tr(t)}}const Yg=BigInt(0);function Is(i){return i??null}function Be(i){return i==null?null:i.toString()}class dp{gasPrice;maxFeePerGas;maxPriorityFeePerGas;constructor(t,e,n){Ft(this,{gasPrice:Is(t),maxFeePerGas:Is(e),maxPriorityFeePerGas:Is(n)})}toJSON(){const{gasPrice:t,maxFeePerGas:e,maxPriorityFeePerGas:n}=this;return{_type:"FeeData",gasPrice:Be(t),maxFeePerGas:Be(e),maxPriorityFeePerGas:Be(n)}}}function lc(i){const t={};i.to&&(t.to=i.to),i.from&&(t.from=i.from),i.data&&(t.data=_t(i.data));const e="chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);for(const r of e)!(r in i)||i[r]==null||(t[r]=bt(i[r],`request.${r}`));const n="type,nonce".split(/,/);for(const r of n)!(r in i)||i[r]==null||(t[r]=Xt(i[r],`request.${r}`));return i.accessList&&(t.accessList=jr(i.accessList)),i.authorizationList&&(t.authorizationList=i.authorizationList.slice()),"blockTag"in i&&(t.blockTag=i.blockTag),"enableCcipRead"in i&&(t.enableCcipRead=!!i.enableCcipRead),"customData"in i&&(t.customData=i.customData),"blobVersionedHashes"in i&&i.blobVersionedHashes&&(t.blobVersionedHashes=i.blobVersionedHashes.slice()),"kzg"in i&&(t.kzg=i.kzg),"blobWrapperVersion"in i&&(t.blobWrapperVersion=i.blobWrapperVersion),"blobs"in i&&i.blobs&&(t.blobs=i.blobs.map(r=>bh(r)?_t(r):Object.assign({},r))),t}class e1{provider;number;hash;timestamp;parentHash;parentBeaconBlockRoot;nonce;difficulty;gasLimit;gasUsed;stateRoot;receiptsRoot;transactionsRoot;blobGasUsed;excessBlobGas;miner;prevRandao;extraData;baseFeePerGas;#t;constructor(t,e){this.#t=t.transactions.map(n=>typeof n!="string"?new Ha(n,e):n),Ft(this,{provider:e,hash:Is(t.hash),number:t.number,timestamp:t.timestamp,parentHash:t.parentHash,parentBeaconBlockRoot:t.parentBeaconBlockRoot,nonce:t.nonce,difficulty:t.difficulty,gasLimit:t.gasLimit,gasUsed:t.gasUsed,blobGasUsed:t.blobGasUsed,excessBlobGas:t.excessBlobGas,miner:t.miner,prevRandao:Is(t.prevRandao),extraData:t.extraData,baseFeePerGas:Is(t.baseFeePerGas),stateRoot:t.stateRoot,receiptsRoot:t.receiptsRoot,transactionsRoot:t.transactionsRoot})}get transactions(){return this.#t.map(t=>typeof t=="string"?t:t.hash)}get prefetchedTransactions(){const t=this.#t.slice();return t.length===0?[]:(it(typeof t[0]=="object","transactions were not prefetched with block request","UNSUPPORTED_OPERATION",{operation:"transactionResponses()"}),t)}toJSON(){const{baseFeePerGas:t,difficulty:e,extraData:n,gasLimit:r,gasUsed:s,hash:a,miner:o,prevRandao:c,nonce:l,number:u,parentHash:h,parentBeaconBlockRoot:f,stateRoot:d,receiptsRoot:g,transactionsRoot:y,timestamp:m,transactions:p}=this;return{_type:"Block",baseFeePerGas:Be(t),difficulty:Be(e),extraData:n,gasLimit:Be(r),gasUsed:Be(s),blobGasUsed:Be(this.blobGasUsed),excessBlobGas:Be(this.excessBlobGas),hash:a,miner:o,prevRandao:c,nonce:l,number:u,parentHash:h,timestamp:m,parentBeaconBlockRoot:f,stateRoot:d,receiptsRoot:g,transactionsRoot:y,transactions:p}}[Symbol.iterator](){let t=0;const e=this.transactions;return{next:()=>t<this.length?{value:e[t++],done:!1}:{value:void 0,done:!0}}}get length(){return this.#t.length}get date(){return this.timestamp==null?null:new Date(this.timestamp*1e3)}async getTransaction(t){let e;if(typeof t=="number")e=this.#t[t];else{const n=t.toLowerCase();for(const r of this.#t)if(typeof r=="string"){if(r!==n)continue;e=r;break}else{if(r.hash!==n)continue;e=r;break}}if(e==null)throw new Error("no such tx");return typeof e=="string"?await this.provider.getTransaction(e):e}getPrefetchedTransaction(t){const e=this.prefetchedTransactions;if(typeof t=="number")return e[t];t=t.toLowerCase();for(const n of e)if(n.hash===t)return n;O(!1,"no matching transaction","indexOrHash",t)}isMined(){return!!this.hash}isLondon(){return!!this.baseFeePerGas}orphanedEvent(){if(!this.isMined())throw new Error("");return n1(this)}}class Ga{provider;transactionHash;blockHash;blockNumber;removed;address;data;topics;index;transactionIndex;constructor(t,e){this.provider=e;const n=Object.freeze(t.topics.slice());Ft(this,{transactionHash:t.transactionHash,blockHash:t.blockHash,blockNumber:t.blockNumber,removed:t.removed,address:t.address,data:t.data,topics:n,index:t.index,transactionIndex:t.transactionIndex})}toJSON(){const{address:t,blockHash:e,blockNumber:n,data:r,index:s,removed:a,topics:o,transactionHash:c,transactionIndex:l}=this;return{_type:"log",address:t,blockHash:e,blockNumber:n,data:r,index:s,removed:a,topics:o,transactionHash:c,transactionIndex:l}}async getBlock(){const t=await this.provider.getBlock(this.blockHash);return it(!!t,"failed to find transaction","UNKNOWN_ERROR",{}),t}async getTransaction(){const t=await this.provider.getTransaction(this.transactionHash);return it(!!t,"failed to find transaction","UNKNOWN_ERROR",{}),t}async getTransactionReceipt(){const t=await this.provider.getTransactionReceipt(this.transactionHash);return it(!!t,"failed to find transaction receipt","UNKNOWN_ERROR",{}),t}removedEvent(){return i1(this)}}class Jg{provider;to;from;contractAddress;hash;index;blockHash;blockNumber;logsBloom;gasUsed;blobGasUsed;cumulativeGasUsed;gasPrice;blobGasPrice;type;status;root;#t;constructor(t,e){this.#t=Object.freeze(t.logs.map(r=>new Ga(r,e)));let n=Yg;t.effectiveGasPrice!=null?n=t.effectiveGasPrice:t.gasPrice!=null&&(n=t.gasPrice),Ft(this,{provider:e,to:t.to,from:t.from,contractAddress:t.contractAddress,hash:t.hash,index:t.index,blockHash:t.blockHash,blockNumber:t.blockNumber,logsBloom:t.logsBloom,gasUsed:t.gasUsed,cumulativeGasUsed:t.cumulativeGasUsed,blobGasUsed:t.blobGasUsed,gasPrice:n,blobGasPrice:t.blobGasPrice,type:t.type,status:t.status,root:t.root})}get logs(){return this.#t}toJSON(){const{to:t,from:e,contractAddress:n,hash:r,index:s,blockHash:a,blockNumber:o,logsBloom:c,logs:l,status:u,root:h}=this;return{_type:"TransactionReceipt",blockHash:a,blockNumber:o,contractAddress:n,cumulativeGasUsed:Be(this.cumulativeGasUsed),from:e,gasPrice:Be(this.gasPrice),blobGasUsed:Be(this.blobGasUsed),blobGasPrice:Be(this.blobGasPrice),gasUsed:Be(this.gasUsed),hash:r,index:s,logs:l,logsBloom:c,root:h,status:u,to:t}}get length(){return this.logs.length}[Symbol.iterator](){let t=0;return{next:()=>t<this.length?{value:this.logs[t++],done:!1}:{value:void 0,done:!0}}}get fee(){return this.gasUsed*this.gasPrice}async getBlock(){const t=await this.provider.getBlock(this.blockHash);if(t==null)throw new Error("TODO");return t}async getTransaction(){const t=await this.provider.getTransaction(this.hash);if(t==null)throw new Error("TODO");return t}async getResult(){return await this.provider.getTransactionResult(this.hash)}async confirmations(){return await this.provider.getBlockNumber()-this.blockNumber+1}removedEvent(){return Zg(this)}reorderedEvent(t){return it(!t||t.isMined(),"unmined 'other' transction cannot be orphaned","UNSUPPORTED_OPERATION",{operation:"reorderedEvent(other)"}),Qg(this,t)}}class Ha{provider;blockNumber;blockHash;index;hash;type;to;from;nonce;gasLimit;gasPrice;maxPriorityFeePerGas;maxFeePerGas;maxFeePerBlobGas;data;value;chainId;signature;accessList;blobVersionedHashes;authorizationList;#t;constructor(t,e){this.provider=e,this.blockNumber=t.blockNumber!=null?t.blockNumber:null,this.blockHash=t.blockHash!=null?t.blockHash:null,this.hash=t.hash,this.index=t.index,this.type=t.type,this.from=t.from,this.to=t.to||null,this.gasLimit=t.gasLimit,this.nonce=t.nonce,this.data=t.data,this.value=t.value,this.gasPrice=t.gasPrice,this.maxPriorityFeePerGas=t.maxPriorityFeePerGas!=null?t.maxPriorityFeePerGas:null,this.maxFeePerGas=t.maxFeePerGas!=null?t.maxFeePerGas:null,this.maxFeePerBlobGas=t.maxFeePerBlobGas!=null?t.maxFeePerBlobGas:null,this.chainId=t.chainId,this.signature=t.signature,this.accessList=t.accessList!=null?t.accessList:null,this.blobVersionedHashes=t.blobVersionedHashes!=null?t.blobVersionedHashes:null,this.authorizationList=t.authorizationList!=null?t.authorizationList:null,this.#t=-1}toJSON(){const{blockNumber:t,blockHash:e,index:n,hash:r,type:s,to:a,from:o,nonce:c,data:l,signature:u,accessList:h,blobVersionedHashes:f}=this;return{_type:"TransactionResponse",accessList:h,blockNumber:t,blockHash:e,blobVersionedHashes:f,chainId:Be(this.chainId),data:l,from:o,gasLimit:Be(this.gasLimit),gasPrice:Be(this.gasPrice),hash:r,maxFeePerGas:Be(this.maxFeePerGas),maxPriorityFeePerGas:Be(this.maxPriorityFeePerGas),maxFeePerBlobGas:Be(this.maxFeePerBlobGas),nonce:c,signature:u,to:a,index:n,type:s,value:Be(this.value)}}async getBlock(){let t=this.blockNumber;if(t==null){const n=await this.getTransaction();n&&(t=n.blockNumber)}if(t==null)return null;const e=this.provider.getBlock(t);if(e==null)throw new Error("TODO");return e}async getTransaction(){return this.provider.getTransaction(this.hash)}async confirmations(){if(this.blockNumber==null){const{tx:e,blockNumber:n}=await fn({tx:this.getTransaction(),blockNumber:this.provider.getBlockNumber()});return e==null||e.blockNumber==null?0:n-e.blockNumber+1}return await this.provider.getBlockNumber()-this.blockNumber+1}async wait(t,e){const n=t??1,r=e??0;let s=this.#t,a=-1,o=s===-1;const c=async()=>{if(o)return null;const{blockNumber:f,nonce:d}=await fn({blockNumber:this.provider.getBlockNumber(),nonce:this.provider.getTransactionCount(this.from)});if(d<this.nonce){s=f;return}if(o)return null;const g=await this.getTransaction();if(!(g&&g.blockNumber!=null))for(a===-1&&(a=s-3,a<this.#t&&(a=this.#t));a<=f;){if(o)return null;const y=await this.provider.getBlock(a,!0);if(y==null)return;for(const m of y)if(m===this.hash)return;for(let m=0;m<y.length;m++){const p=await y.getTransaction(m);if(p.from===this.from&&p.nonce===this.nonce){if(o)return null;const b=await this.provider.getTransactionReceipt(p.hash);if(b==null||f-b.blockNumber+1<n)return;let S="replaced";p.data===this.data&&p.to===this.to&&p.value===this.value?S="repriced":p.data==="0x"&&p.from===p.to&&p.value===Yg&&(S="cancelled"),it(!1,"transaction was replaced","TRANSACTION_REPLACED",{cancelled:S==="replaced"||S==="cancelled",reason:S,replacement:p.replaceableTransaction(s),hash:p.hash,receipt:b})}}a++}},l=f=>{if(f==null||f.status!==0)return f;it(!1,"transaction execution reverted","CALL_EXCEPTION",{action:"sendTransaction",data:null,reason:null,invocation:null,revert:null,transaction:{to:f.to,from:f.from,data:""},receipt:f})},u=await this.provider.getTransactionReceipt(this.hash);if(n===0)return l(u);if(u){if(n===1||await u.confirmations()>=n)return l(u)}else if(await c(),n===0)return null;return await new Promise((f,d)=>{const g=[],y=()=>{g.forEach(p=>p())};if(g.push(()=>{o=!0}),r>0){const p=setTimeout(()=>{y(),d(Re("wait for transaction timeout","TIMEOUT"))},r);g.push(()=>{clearTimeout(p)})}const m=async p=>{if(await p.confirmations()>=n){y();try{f(l(p))}catch(b){d(b)}}};if(g.push(()=>{this.provider.off(this.hash,m)}),this.provider.on(this.hash,m),s>=0){const p=async()=>{try{await c()}catch(b){if(en(b,"TRANSACTION_REPLACED")){y(),d(b);return}}o||this.provider.once("block",p)};g.push(()=>{this.provider.off("block",p)}),this.provider.once("block",p)}})}isMined(){return this.blockHash!=null}isLegacy(){return this.type===0}isBerlin(){return this.type===1}isLondon(){return this.type===2}isCancun(){return this.type===3}removedEvent(){return it(this.isMined(),"unmined transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),Zg(this)}reorderedEvent(t){return it(this.isMined(),"unmined transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),it(!t||t.isMined(),"unmined 'other' transaction canot be orphaned","UNSUPPORTED_OPERATION",{operation:"removeEvent()"}),Qg(this,t)}replaceableTransaction(t){O(Number.isInteger(t)&&t>=0,"invalid startBlock","startBlock",t);const e=new Ha(this,this.provider);return e.#t=t,e}}function n1(i){return{orphan:"drop-block",hash:i.hash,number:i.number}}function Qg(i,t){return{orphan:"reorder-transaction",tx:i,other:t}}function Zg(i){return{orphan:"drop-transaction",tx:i}}function i1(i){return{orphan:"drop-log",log:{transactionHash:i.transactionHash,blockHash:i.blockHash,blockNumber:i.blockNumber,address:i.address,data:i.data,topics:Object.freeze(i.topics.slice()),index:i.index}}}class Fh extends Ga{interface;fragment;args;constructor(t,e,n){super(t,t.provider);const r=e.decodeEventLog(n,t.data,t.topics);Ft(this,{args:r,fragment:n,interface:e})}get eventName(){return this.fragment.name}get eventSignature(){return this.fragment.format()}}class $g extends Ga{error;constructor(t,e){super(t,t.provider),Ft(this,{error:e})}}class r1 extends Jg{#t;constructor(t,e,n){super(n,e),this.#t=t}get logs(){return super.logs.map(t=>{const e=t.topics.length?this.#t.getEvent(t.topics[0]):null;if(e)try{return new Fh(t,this.#t,e)}catch(n){return new $g(t,n)}return t})}}class Oh extends Ha{#t;constructor(t,e,n){super(n,e),this.#t=t}async wait(t,e){const n=await super.wait(t,e);return n==null?null:new r1(this.#t,this.provider,n)}}class jg extends Tm{log;constructor(t,e,n,r){super(t,e,n),Ft(this,{log:r})}async getBlock(){return await this.log.getBlock()}async getTransaction(){return await this.log.getTransaction()}async getTransactionReceipt(){return await this.log.getTransactionReceipt()}}class s1 extends jg{constructor(t,e,n,r,s){super(t,e,n,new Fh(s,t.interface,r));const a=t.interface.decodeEventLog(r,this.log.data,this.log.topics);Ft(this,{args:a,fragment:r})}get eventName(){return this.fragment.name}get eventSignature(){return this.fragment.format()}}const pp=BigInt(0);function t0(i){return i&&typeof i.call=="function"}function e0(i){return i&&typeof i.estimateGas=="function"}function Ic(i){return i&&typeof i.resolveName=="function"}function n0(i){return i&&typeof i.sendTransaction=="function"}function i0(i){if(i!=null){if(Ic(i))return i;if(i.provider)return i.provider}}class a1{#t;fragment;constructor(t,e,n){if(Ft(this,{fragment:e}),e.inputs.length<n.length)throw new Error("too many arguments");const r=Yr(t.runner,"resolveName"),s=Ic(r)?r:null;this.#t=(async function(){const a=await Promise.all(e.inputs.map((o,c)=>n[c]==null?null:o.walkAsync(n[c],(u,h)=>u==="address"?Array.isArray(h)?Promise.all(h.map(f=>gn(f,s))):gn(h,s):h)));return t.interface.encodeFilterTopics(e,a)})()}getTopicFilter(){return this.#t}}function Yr(i,t){return i==null?null:typeof i[t]=="function"?i:i.provider&&typeof i.provider[t]=="function"?i.provider:null}function Ur(i){return i==null?null:i.provider||null}async function r0(i,t){const e=Fe.dereference(i,"overrides");O(typeof e=="object","invalid overrides parameter","overrides",i);const n=lc(e);return O(n.to==null||(t||[]).indexOf("to")>=0,"cannot override to","overrides.to",n.to),O(n.data==null||(t||[]).indexOf("data")>=0,"cannot override data","overrides.data",n.data),n.from&&(n.from=n.from),n}async function o1(i,t,e){const n=Yr(i,"resolveName"),r=Ic(n)?n:null;return await Promise.all(t.map((s,a)=>s.walkAsync(e[a],(o,c)=>(c=Fe.dereference(c,o),o==="address"?gn(c,r):c))))}function c1(i){const t=async function(a){const o=await r0(a,["data"]);o.to=await i.getAddress(),o.from&&(o.from=await gn(o.from,i0(i.runner)));const c=i.interface,l=bt(o.value||pp,"overrides.value")===pp,u=(o.data||"0x")==="0x";c.fallback&&!c.fallback.payable&&c.receive&&!u&&!l&&O(!1,"cannot send data to receive or send value to non-payable fallback","overrides",a),O(c.fallback||u,"cannot send data to receive-only contract","overrides.data",o.data);const h=c.receive||c.fallback&&c.fallback.payable;return O(h||l,"cannot send value to non-payable fallback","overrides.value",o.value),O(c.fallback||u,"cannot send data to receive-only contract","overrides.data",o.data),o},e=async function(a){const o=Yr(i.runner,"call");it(t0(o),"contract runner does not support calling","UNSUPPORTED_OPERATION",{operation:"call"});const c=await t(a);try{return await o.call(c)}catch(l){throw vh(l)&&l.data?i.interface.makeError(l.data,c):l}},n=async function(a){const o=i.runner;it(n0(o),"contract runner does not support sending transactions","UNSUPPORTED_OPERATION",{operation:"sendTransaction"});const c=await o.sendTransaction(await t(a)),l=Ur(i.runner);return new Oh(i.interface,l,c)},r=async function(a){const o=Yr(i.runner,"estimateGas");return it(e0(o),"contract runner does not support gas estimation","UNSUPPORTED_OPERATION",{operation:"estimateGas"}),await o.estimateGas(await t(a))},s=async a=>await n(a);return Ft(s,{_contract:i,estimateGas:r,populateTransaction:t,send:n,staticCall:e}),s}function l1(i,t){const e=function(...l){const u=i.interface.getFunction(t,l);return it(u,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:t,args:l}}),u},n=async function(...l){const u=e(...l);let h={};if(u.inputs.length+1===l.length&&(h=await r0(l.pop()),h.from&&(h.from=await gn(h.from,i0(i.runner)))),u.inputs.length!==l.length)throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");const f=await o1(i.runner,u.inputs,l);return Object.assign({},h,await fn({to:i.getAddress(),data:i.interface.encodeFunctionData(u,f)}))},r=async function(...l){const u=await o(...l);return u.length===1?u[0]:u},s=async function(...l){const u=i.runner;it(n0(u),"contract runner does not support sending transactions","UNSUPPORTED_OPERATION",{operation:"sendTransaction"});const h=await u.sendTransaction(await n(...l)),f=Ur(i.runner);return new Oh(i.interface,f,h)},a=async function(...l){const u=Yr(i.runner,"estimateGas");return it(e0(u),"contract runner does not support gas estimation","UNSUPPORTED_OPERATION",{operation:"estimateGas"}),await u.estimateGas(await n(...l))},o=async function(...l){const u=Yr(i.runner,"call");it(t0(u),"contract runner does not support calling","UNSUPPORTED_OPERATION",{operation:"call"});const h=await n(...l);let f="0x";try{f=await u.call(h)}catch(g){throw vh(g)&&g.data?i.interface.makeError(g.data,h):g}const d=e(...l);return i.interface.decodeFunctionResult(d,f)},c=async(...l)=>e(...l).constant?await r(...l):await s(...l);return Ft(c,{name:i.interface.getFunctionName(t),_contract:i,_key:t,getFragment:e,estimateGas:a,populateTransaction:n,send:s,staticCall:r,staticCallResult:o}),Object.defineProperty(c,"fragment",{configurable:!1,enumerable:!0,get:()=>{const l=i.interface.getFunction(t);return it(l,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:t}}),l}}),c}function u1(i,t){const e=function(...r){const s=i.interface.getEvent(t,r);return it(s,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:t,args:r}}),s},n=function(...r){return new a1(i,e(...r),r)};return Ft(n,{name:i.interface.getEventName(t),_contract:i,_key:t,getFragment:e}),Object.defineProperty(n,"fragment",{configurable:!1,enumerable:!0,get:()=>{const r=i.interface.getEvent(t);return it(r,"no matching fragment","UNSUPPORTED_OPERATION",{operation:"fragment",info:{key:t}}),r}}),n}const uc=Symbol.for("_ethersInternal_contract"),s0=new WeakMap;function h1(i,t){s0.set(i[uc],t)}function Pn(i){return s0.get(i[uc])}function f1(i){return i&&typeof i=="object"&&"getTopicFilter"in i&&typeof i.getTopicFilter=="function"&&i.fragment}async function Bh(i,t){let e,n=null;if(Array.isArray(t)){const s=function(a){if(be(a,32))return a;const o=i.interface.getEvent(a);return O(o,"unknown fragment","name",a),o.topicHash};e=t.map(a=>a==null?null:Array.isArray(a)?a.map(s):s(a))}else t==="*"?e=[null]:typeof t=="string"?be(t,32)?e=[t]:(n=i.interface.getEvent(t),O(n,"unknown fragment","event",t),e=[n.topicHash]):f1(t)?e=await t.getTopicFilter():"fragment"in t?(n=t.fragment,e=[n.topicHash]):O(!1,"unknown event name","event",t);e=e.map(s=>{if(s==null)return null;if(Array.isArray(s)){const a=Array.from(new Set(s.map(o=>o.toLowerCase())).values());return a.length===1?a[0]:(a.sort(),a)}return s.toLowerCase()});const r=e.map(s=>s==null?"null":Array.isArray(s)?s.join("|"):s).join("&");return{fragment:n,tag:r,topics:e}}async function ha(i,t){const{subs:e}=Pn(i);return e.get((await Bh(i,t)).tag)||null}async function mp(i,t,e){const n=Ur(i.runner);it(n,"contract runner does not support subscribing","UNSUPPORTED_OPERATION",{operation:t});const{fragment:r,tag:s,topics:a}=await Bh(i,e),{addr:o,subs:c}=Pn(i);let l=c.get(s);if(!l){const h={address:o||i,topics:a},f=m=>{let p=r;if(p==null)try{p=i.interface.getEvent(m.topics[0])}catch{}if(p){const b=p,S=r?i.interface.decodeEventLog(r,m.data,m.topics):[];Xu(i,e,S,v=>new s1(i,v,e,b,m))}else Xu(i,e,[],b=>new jg(i,b,e,m))};let d=[];l={tag:s,listeners:[],start:()=>{d.length||d.push(n.on(h,f))},stop:async()=>{if(d.length==0)return;let m=d;d=[],await Promise.all(m),n.off(h,f)}},c.set(s,l)}return l}let Wu=Promise.resolve();async function d1(i,t,e,n){await Wu;const r=await ha(i,t);if(!r)return!1;const s=r.listeners.length;return r.listeners=r.listeners.filter(({listener:a,once:o})=>{const c=Array.from(e);n&&c.push(n(o?null:a));try{a.call(i,...c)}catch{}return!o}),r.listeners.length===0&&(r.stop(),Pn(i).subs.delete(r.tag)),s>0}async function Xu(i,t,e,n){try{await Wu}catch{}const r=d1(i,t,e,n);return Wu=r,await r}const To=["then"];class ga{target;interface;runner;filters;[uc];fallback;constructor(t,e,n,r){O(typeof t=="string"||hg(t),"invalid value for Contract target","target",t),n==null&&(n=null);const s=Tr.from(e);Ft(this,{target:t,runner:n,interface:s}),Object.defineProperty(this,uc,{value:{}});let a,o=null,c=null;if(r){const h=Ur(n);c=new Oh(this.interface,h,r)}let l=new Map;if(typeof t=="string")if(be(t))o=t,a=Promise.resolve(t);else{const h=Yr(n,"resolveName");if(!Ic(h))throw Re("contract runner does not support name resolution","UNSUPPORTED_OPERATION",{operation:"resolveName"});a=h.resolveName(t).then(f=>{if(f==null)throw Re("an ENS name used for a contract target must be correctly configured","UNCONFIGURED_NAME",{value:t});return Pn(this).addr=f,f})}else a=t.getAddress().then(h=>{if(h==null)throw new Error("TODO");return Pn(this).addr=h,h});h1(this,{addrPromise:a,addr:o,deployTx:c,subs:l});const u=new Proxy({},{get:(h,f,d)=>{if(typeof f=="symbol"||To.indexOf(f)>=0)return Reflect.get(h,f,d);try{return this.getEvent(f)}catch(g){if(!en(g,"INVALID_ARGUMENT")||g.argument!=="key")throw g}},has:(h,f)=>To.indexOf(f)>=0?Reflect.has(h,f):Reflect.has(h,f)||this.interface.hasEvent(String(f))});return Ft(this,{filters:u}),Ft(this,{fallback:s.receive||s.fallback?c1(this):null}),new Proxy(this,{get:(h,f,d)=>{if(typeof f=="symbol"||f in h||To.indexOf(f)>=0)return Reflect.get(h,f,d);try{return h.getFunction(f)}catch(g){if(!en(g,"INVALID_ARGUMENT")||g.argument!=="key")throw g}},has:(h,f)=>typeof f=="symbol"||f in h||To.indexOf(f)>=0?Reflect.has(h,f):h.interface.hasFunction(f)})}connect(t){return new ga(this.target,this.interface,t)}attach(t){return new ga(t,this.interface,this.runner)}async getAddress(){return await Pn(this).addrPromise}async getDeployedCode(){const t=Ur(this.runner);it(t,"runner does not support .provider","UNSUPPORTED_OPERATION",{operation:"getDeployedCode"});const e=await t.getCode(await this.getAddress());return e==="0x"?null:e}async waitForDeployment(){const t=this.deploymentTransaction();if(t)return await t.wait(),this;if(await this.getDeployedCode()!=null)return this;const n=Ur(this.runner);return it(n!=null,"contract runner does not support .provider","UNSUPPORTED_OPERATION",{operation:"waitForDeployment"}),new Promise((r,s)=>{const a=async()=>{try{if(await this.getDeployedCode()!=null)return r(this);n.once("block",a)}catch(o){s(o)}};a()})}deploymentTransaction(){return Pn(this).deployTx}getFunction(t){return typeof t!="string"&&(t=t.format()),l1(this,t)}getEvent(t){return typeof t!="string"&&(t=t.format()),u1(this,t)}async queryTransaction(t){throw new Error("@TODO")}async queryFilter(t,e,n){e==null&&(e=0),n==null&&(n="latest");const{addr:r,addrPromise:s}=Pn(this),a=r||await s,{fragment:o,topics:c}=await Bh(this,t),l={address:a,topics:c,fromBlock:e,toBlock:n},u=Ur(this.runner);return it(u,"contract runner does not have a provider","UNSUPPORTED_OPERATION",{operation:"queryFilter"}),(await u.getLogs(l)).map(h=>{let f=o;if(f==null)try{f=this.interface.getEvent(h.topics[0])}catch{}if(f)try{return new Fh(h,this.interface,f)}catch(d){return new $g(h,d)}return new Ga(h,u)})}async on(t,e){const n=await mp(this,"on",t);return n.listeners.push({listener:e,once:!1}),n.start(),this}async once(t,e){const n=await mp(this,"once",t);return n.listeners.push({listener:e,once:!0}),n.start(),this}async emit(t,...e){return await Xu(this,t,e,null)}async listenerCount(t){if(t){const r=await ha(this,t);return r?r.listeners.length:0}const{subs:e}=Pn(this);let n=0;for(const{listeners:r}of e.values())n+=r.length;return n}async listeners(t){if(t){const r=await ha(this,t);return r?r.listeners.map(({listener:s})=>s):[]}const{subs:e}=Pn(this);let n=[];for(const{listeners:r}of e.values())n=n.concat(r.map(({listener:s})=>s));return n}async off(t,e){const n=await ha(this,t);if(!n)return this;if(e){const r=n.listeners.map(({listener:s})=>s).indexOf(e);r>=0&&n.listeners.splice(r,1)}return(e==null||n.listeners.length===0)&&(n.stop(),Pn(this).subs.delete(n.tag)),this}async removeAllListeners(t){if(t){const e=await ha(this,t);if(!e)return this;e.stop(),Pn(this).subs.delete(e.tag)}else{const{subs:e}=Pn(this);for(const{tag:n,stop:r}of e.values())r(),e.delete(n)}return this}async addListener(t,e){return await this.on(t,e)}async removeListener(t,e){return await this.off(t,e)}static buildClass(t){class e extends ga{constructor(r,s=null){super(r,t,s)}}return e}static from(t,e,n){return n==null&&(n=null),new this(t,e,n)}}function p1(){return ga}class ya extends p1(){}const fa=BigInt(60);function Ll(i){return i.match(/^ipfs:\/\/ipfs\//i)?i=i.substring(12):i.match(/^ipfs:\/\//i)?i=i.substring(7):O(!1,"unsupported IPFS format","link",i),`https://gateway.ipfs.io/ipfs/${i}`}class m1{name;constructor(t){Ft(this,{name:t})}connect(t){return this}supportsCoinType(t){return!1}async encodeAddress(t,e){throw new Error("unsupported coin")}async decodeAddress(t,e){throw new Error("unsupported coin")}}const a0=new RegExp("^(ipfs)://(.*)$","i"),gp=[new RegExp("^(https)://(.*)$","i"),new RegExp("^(data):(.*)$","i"),a0,new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$","i")];function yp(i){return i===fa||i>=2147483648&&i<=4294967295}class Pi{provider;address;name;#t;#e;constructor(t,e,n,r){Ft(this,{provider:t,address:e,name:n}),this.#t=r!=null?Promise.resolve(r):null,this.#e=new ya(e,["function supportsInterface(bytes4) view returns (bool)","function resolve(bytes, bytes) view returns (bytes)","function addr(bytes32) view returns (address)","function addr(bytes32, uint) view returns (bytes)","function text(bytes32, string) view returns (string)","function contenthash(bytes32) view returns (bytes)","function name(bytes32) view returns (string)"],t)}async supportsWildcard(){return this.#t==null&&(this.#t=(async()=>{try{return await this.#e.supportsInterface("0x9061b923")}catch(t){if(en(t,"CALL_EXCEPTION"))return!1;throw this.#t=null,t}})()),await this.#t}async#n(t,e){e=(e||[]).slice();const n=this.#e.interface;e.unshift(Jd(this.name));let r=null;await this.supportsWildcard()&&(r=n.getFunction(t),it(r,"missing fragment","UNKNOWN_ERROR",{info:{funcName:t}}),e=[Qd(this.name,255),n.encodeFunctionData(r,e)],t="resolve(bytes,bytes)"),e.push({enableCcipRead:!0});try{const s=await this.#e[t](...e);return r?n.decodeFunctionResult(r,s)[0]:s}catch(s){if(!en(s,"CALL_EXCEPTION"))throw s}return null}async getAddress(t){const e=t==null?fa:bt(t);if(e===fa)try{const s=await this.#n("addr(bytes32)");return s==null||s===ic?null:s}catch(s){if(en(s,"CALL_EXCEPTION"))return null;throw s}if(yp(e)){const s=await this.#n("addr(bytes32,uint)",[e]);return be(s,20)?he(s):null}if(e>=0&&e<2147483648){let s=e+BigInt(2147483648);const a=await this.#n("addr(bytes32,uint)",[s]);if(be(a,20))return he(a)}let n=null;for(const s of this.provider.plugins)if(s instanceof m1&&e<=2147483648&&s.supportsCoinType(Number(e))){n=s;break}if(n==null)return null;const r=await this.#n("addr(bytes32,uint)",[e]);if(r==null||r==="0x")return null;if(e<2147483648){const s=await n.decodeAddress(Number(e),r);if(s!=null)return s}it(!1,"invalid coin data","UNSUPPORTED_OPERATION",{operation:`getAddress(${e})`,info:{coinType:e,data:r}})}async getText(t){const e=await this.#n("text(bytes32,string)",[t]);return e==null||e==="0x"?null:e}async getContentHash(){const t=await this.#n("contenthash(bytes32)");if(t==null||t==="0x")return null;const e=t.match(/^0x(e3010170|e5010172)(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);if(e){const r=e[1]==="e3010170"?"ipfs":"ipns",s=parseInt(e[4],16);if(e[5].length===s*2)return`${r}://${AA("0x"+e[2])}`}const n=t.match(/^0xe40101fa011b20([0-9a-f]*)$/);if(n&&n[1].length===64)return`bzz://${n[1]}`;it(!1,"invalid or unsupported content hash data","UNSUPPORTED_OPERATION",{operation:"getContentHash()",info:{data:t}})}async getName(){return await this.#n("name(bytes32)")}async getAvatar(){return(await this._getAvatar()).url}async _getAvatar(){const t=[{type:"name",value:this.name}];try{const e=await this.getText("avatar");if(e==null)return t.push({type:"!avatar",value:""}),{url:null,linkage:t};t.push({type:"avatar",value:e});for(let n=0;n<gp.length;n++){const r=e.match(gp[n]);if(r==null)continue;const s=r[1].toLowerCase();switch(s){case"https":case"data":return t.push({type:"url",value:e}),{linkage:t,url:e};case"ipfs":{const a=Ll(e);return t.push({type:"ipfs",value:e}),t.push({type:"url",value:a}),{linkage:t,url:a}}case"erc721":case"erc1155":{const a=s==="erc721"?"tokenURI(uint256)":"uri(uint256)";t.push({type:s,value:e});const o=await this.getAddress();if(o==null)return t.push({type:"!owner",value:""}),{url:null,linkage:t};const c=(r[2]||"").split("/");if(c.length!==2)return t.push({type:`!${s}caip`,value:r[2]||""}),{url:null,linkage:t};const l=c[1],u=new ya(c[0],["function tokenURI(uint) view returns (string)","function ownerOf(uint) view returns (address)","function uri(uint) view returns (string)","function balanceOf(address, uint256) view returns (uint)"],this.provider);if(s==="erc721"){const y=await u.ownerOf(l);if(o!==y)return t.push({type:"!owner",value:y}),{url:null,linkage:t};t.push({type:"owner",value:y})}else if(s==="erc1155"){const y=await u.balanceOf(o,l);if(!y)return t.push({type:"!balance",value:"0"}),{url:null,linkage:t};t.push({type:"balance",value:y.toString()})}let h=await u[a](l);if(h==null||h==="0x")return t.push({type:"!metadata-url",value:""}),{url:null,linkage:t};t.push({type:"metadata-url-base",value:h}),s==="erc1155"&&(h=h.replace("{id}",fr(l,32).substring(2)),t.push({type:"metadata-url-expanded",value:h})),h.match(/^ipfs:/i)&&(h=Ll(h)),t.push({type:"metadata-url",value:h});let f={};const d=await new Hi(h).send();d.assertOk();try{f=d.bodyJson}catch{try{t.push({type:"!metadata",value:d.bodyText})}catch{const p=d.body;return p&&t.push({type:"!metadata",value:_t(p)}),{url:null,linkage:t}}return{url:null,linkage:t}}if(!f)return t.push({type:"!metadata",value:""}),{url:null,linkage:t};t.push({type:"metadata",value:JSON.stringify(f)});let g=f.image;if(typeof g!="string")return t.push({type:"!imageUrl",value:""}),{url:null,linkage:t};if(!g.match(/^(https:\/\/|data:)/i)){if(g.match(a0)==null)return t.push({type:"!imageUrl-ipfs",value:g}),{url:null,linkage:t};t.push({type:"imageUrl-ipfs",value:g}),g=Ll(g)}return t.push({type:"url",value:g}),{linkage:t,url:g}}}}}catch{}return{linkage:t,url:null}}static async getEnsAddress(t){const e=await t.getNetwork(),n=e.getPlugin("org.ethers.plugins.network.Ens");return it(n,"network does not support ENS","UNSUPPORTED_OPERATION",{operation:"getEnsAddress",info:{network:e}}),n.address}static async getUniversalResolverAddress(t){const n=(await t.getNetwork()).getPlugin("org.ethers.plugins.network.Ens");return n&&n.universalResolver?n.universalResolver:null}static async#i(t,e){const n=await Pi.getEnsAddress(t);try{const s=await new ya(n,["function resolver(bytes32) view returns (address)"],t).resolver(Jd(e),{enableCcipRead:!0});return s===ic?null:s}catch(r){throw r}return null}static async lookupAddress(t,e,n){const r=n==null?fa:bt(n);yp(r)&&(e=he(e));const s=await xp(t);if(s)try{const o=(await s.reverse(e,r,{enableCcipRead:!0})).primary;return Yd(o)?o:null}catch(a){if(en(a,"CALL_EXCEPTION")&&a.reason==="ResolverNotFound(bytes)")return null;throw a}it(r===fa,"lookupAddress coinType requires ENS Universal Resolver","UNSUPPORTED_OPERATION",{operation:"lookupAddress"});try{const a=await Pi.fromName(t,`${e.toLowerCase().substring(2)}.addr.reverse`);if(!a)return null;const o=await a.getName();return o==null||!Yd(o)||await t.resolveName(o)!==e?null:o}catch(a){if(en(a,"BAD_DATA")&&a.value==="0x"||en(a,"CALL_EXCEPTION"))return null;throw a}}static async fromName(t,e){const n=await xp(t);if(n){let s;try{s=Qd(Fg(e),255)}catch{return null}const a=await n.requireResolver(s);return new Pi(t,a.resolver,e,a.extended)}let r=e;for(;;){if(r===""||r==="."||e!=="eth"&&r==="eth")return null;const s=await Pi.#i(t,r);if(s!=null){const a=new Pi(t,s,e);return r!==e&&!await a.supportsWildcard()?null:a}r=r.split(".").slice(1).join(".")}}}async function xp(i){const t=await Pi.getUniversalResolverAddress(i);return t?new ya(t,["function requireResolver(bytes) view returns ((bytes name, uint256 offset, bytes32 node, address resolver, bool extended))","function findResolver(bytes) view returns (address resolver, bytes32 node, uint offset)","function resolve(bytes name, bytes data) view returns (bytes result, address resolver)","function reverse(bytes name, uint coinType) view returns (string primary, address resolver, address reverseResolver)","error ResolverNotFound(bytes name)","error ResolverNotContract(bytes name, address resolver)","error ReverseAddressMismatch(string primary, bytes primaryAddress)","error HttpError(uint16 statusCode, string statusMessage)"],i):null}const _p=BigInt(0);function te(i,t){return(function(e){return e==null?t:i(e)})}function La(i,t){return(e=>{if(t&&e==null)return null;if(!Array.isArray(e))throw new Error("not an array");return e.map(n=>i(n))})}function za(i,t){return(e=>{const n={};for(const r in i){let s=r;if(t&&r in t&&!(s in e)){for(const a of t[r])if(a in e){s=a;break}}try{const a=i[r](e[s]);a!==void 0&&(n[r]=a)}catch(a){const o=a instanceof Error?a.message:"not-an-error";it(!1,`invalid value for value.${r} (${o})`,"BAD_DATA",{value:e})}}return n})}function g1(i){switch(i){case!0:case"true":return!0;case!1:case"false":return!1}O(!1,`invalid boolean; ${JSON.stringify(i)}`,"value",i)}function zs(i){return O(be(i,!0),"invalid data","value",i),i}function tn(i){return O(be(i,32),"invalid hash","value",i),i}const y1=za({address:he,blockHash:tn,blockNumber:Xt,data:zs,index:Xt,removed:te(g1,!1),topics:La(tn),transactionHash:tn,transactionIndex:Xt},{index:["logIndex"]});function x1(i){return y1(i)}const _1=za({hash:te(tn),parentHash:tn,parentBeaconBlockRoot:te(tn,null),number:Xt,timestamp:Xt,nonce:te(zs),difficulty:bt,gasLimit:bt,gasUsed:bt,stateRoot:te(tn,null),receiptsRoot:te(tn,null),transactionsRoot:te(tn,null),blobGasUsed:te(bt,null),excessBlobGas:te(bt,null),miner:te(he),prevRandao:te(tn,null),extraData:zs,baseFeePerGas:te(bt)},{prevRandao:["mixHash"]});function v1(i){const t=_1(i);return t.transactions=i.transactions.map(e=>typeof e=="string"?e:o0(e)),t}const b1=za({transactionIndex:Xt,blockNumber:Xt,transactionHash:tn,address:he,topics:La(tn),data:zs,index:Xt,blockHash:tn},{index:["logIndex"]});function w1(i){return b1(i)}const A1=za({to:te(he,null),from:te(he,null),contractAddress:te(he,null),index:Xt,root:te(_t),gasUsed:bt,blobGasUsed:te(bt,null),logsBloom:te(zs),blockHash:tn,hash:tn,logs:La(w1),blockNumber:Xt,cumulativeGasUsed:bt,effectiveGasPrice:te(bt),blobGasPrice:te(bt,null),status:te(Xt),type:te(Xt,0)},{effectiveGasPrice:["gasPrice"],hash:["transactionHash"],index:["transactionIndex"]});function M1(i){return A1(i)}function o0(i){i.to&&bt(i.to)===_p&&(i.to="0x0000000000000000000000000000000000000000");const t=za({hash:tn,index:te(Xt,void 0),type:e=>e==="0x"||e==null?0:Xt(e),accessList:te(jr,null),blobVersionedHashes:te(La(tn,!0),null),authorizationList:te(La(e=>{let n;if(e.signature)n=e.signature;else{let r=e.yParity;r==="0x1b"?r=0:r==="0x1c"&&(r=1),n=Object.assign({},e,{yParity:r})}return{address:he(e.address),chainId:bt(e.chainId),nonce:bt(e.nonce),signature:Ie.from(n)}},!1),null),blockHash:te(tn,null),blockNumber:te(Xt,null),transactionIndex:te(Xt,null),from:he,gasPrice:te(bt),maxPriorityFeePerGas:te(bt),maxFeePerGas:te(bt),maxFeePerBlobGas:te(bt,null),gasLimit:bt,to:te(he,null),value:bt,nonce:Xt,data:zs,creates:te(he,null),chainId:te(bt,null)},{data:["input"],gasLimit:["gas"],index:["transactionIndex"]})(i);if(t.to==null&&t.creates==null&&(t.creates=dS(t)),(i.type===1||i.type===2)&&i.accessList==null&&(t.accessList=[]),i.signature?t.signature=Ie.from(i.signature):t.signature=Ie.from(i),t.chainId==null){const e=t.signature.legacyChainId;e!=null&&(t.chainId=e)}return t.blockHash&&bt(t.blockHash)===_p&&(t.blockHash=null),t}const S1="0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",E1=Symbol.for("nodejs.util.inspect.custom");class Va{name;constructor(t){Ft(this,{name:t})}[E1](){return this.toString()}toString(){return`${this.name} { }`}clone(){return new Va(this.name)}}class Nc extends Va{effectiveBlock;txBase;txCreate;txDataZero;txDataNonzero;txAccessListStorageKey;txAccessListAddress;constructor(t,e){t==null&&(t=0),super(`org.ethers.network.plugins.GasCost#${t||0}`);const n={effectiveBlock:t};function r(s,a){let o=(e||{})[s];o==null&&(o=a),O(typeof o=="number",`invalud value for ${s}`,"costs",e),n[s]=o}r("txBase",21e3),r("txCreate",32e3),r("txDataZero",4),r("txDataNonzero",16),r("txAccessListStorageKey",1900),r("txAccessListAddress",2400),Ft(this,n)}toString(){return`${this.name} { txBase: ${this.txBase}, txCreate: ${this.txCreate}, txDataZero: ${this.txDataZero}, txAccessListStorageKey: ${this.txAccessListStorageKey}, txAccessListAddress: ${this.txAccessListAddress} }`}clone(){return new Nc(this.effectiveBlock,this)}}class Lc extends Va{address;targetNetwork;universalResolver;constructor(t,e,n){super("org.ethers.plugins.network.Ens"),Ft(this,{address:t||S1,targetNetwork:e??1,universalResolver:n})}toString(){return`${this.name} { address: ${this.address}, targetNetwork: ${this.targetNetwork}, universalResolver: ${this.universalResolver} }`}clone(){return new Lc(this.address,this.targetNetwork,this.universalResolver)}}class T1 extends Va{#t;#e;get url(){return this.#t}get processFunc(){return this.#e}constructor(t,e){super("org.ethers.plugins.network.FetchUrlFeeDataPlugin"),this.#t=t,this.#e=e}toString(){return`${this.name} { url: ${this.url} }`}clone(){return this}}const C1=Symbol.for("nodejs.util.inspect.custom"),Ul=new Map;class Dn{#t;#e;#n;constructor(t,e){this.#t=t,this.#e=bt(e),this.#n=new Map}[C1](){return this.toString()}toString(){const t=[];for(const e of this.#n.values())t.push(e.toString());return`Network { name: ${this.name}, chainId: ${this.chainId}, plugins: [ ${t.join(", ")} ] }`}toJSON(){return{name:this.name,chainId:String(this.chainId)}}get name(){return this.#t}set name(t){this.#t=t}get chainId(){return this.#e}set chainId(t){this.#e=bt(t,"chainId")}matches(t){if(t==null)return!1;if(typeof t=="string"){try{return this.chainId===bt(t)}catch{}return this.name===t}if(typeof t=="number"||typeof t=="bigint"){try{return this.chainId===bt(t)}catch{}return!1}if(typeof t=="object"){if(t.chainId!=null){try{return this.chainId===bt(t.chainId)}catch{}return!1}return t.name!=null?this.name===t.name:!1}return!1}get plugins(){return Array.from(this.#n.values())}attachPlugin(t){if(this.#n.get(t.name))throw new Error(`cannot replace existing plugin: ${t.name} `);return this.#n.set(t.name,t.clone()),this}getPlugin(t){return this.#n.get(t)||null}getPlugins(t){return this.plugins.filter(e=>e.name.split("#")[0]===t)}clone(){const t=new Dn(this.name,this.chainId);return this.plugins.forEach(e=>{t.attachPlugin(e.clone())}),t}computeIntrinsicGas(t){const e=this.getPlugin("org.ethers.plugins.network.GasCost")||new Nc;let n=e.txBase;if(t.to==null&&(n+=e.txCreate),t.data)for(let r=2;r<t.data.length;r+=2)t.data.substring(r,r+2)==="00"?n+=e.txDataZero:n+=e.txDataNonzero;if(t.accessList){const r=jr(t.accessList);for(const s in r)n+=e.txAccessListAddress+e.txAccessListStorageKey*r[s].storageKeys.length}return n}static from(t){if(R1(),t==null)return Dn.from("mainnet");if(typeof t=="number"&&(t=BigInt(t)),typeof t=="string"||typeof t=="bigint"){const e=Ul.get(t);if(e)return e();if(typeof t=="bigint")return new Dn("unknown",t);O(!1,"unknown network","network",t)}if(typeof t.clone=="function")return t.clone();if(typeof t=="object"){O(typeof t.name=="string"&&typeof t.chainId=="number","invalid network object name or chainId","network",t);const e=new Dn(t.name,t.chainId),n=t;return(n.ensAddress||n.ensNetwork!=null||n.ensUniversalResolver)&&e.attachPlugin(new Lc(n.ensAddress,n.ensNetwork,n.ensUniversalResolver)),e}O(!1,"invalid network","network",t)}static register(t,e){typeof t=="number"&&(t=BigInt(t));const n=Ul.get(t);n&&O(!1,`conflicting network for ${JSON.stringify(n.name)}`,"nameOrChainId",t),Ul.set(t,e)}}function vp(i,t){const e=String(i);if(!e.match(/^[0-9.]+$/))throw new Error(`invalid gwei value: ${i}`);const n=e.split(".");if(n.length===1&&n.push(""),n.length!==2)throw new Error(`invalid gwei value: ${i}`);for(;n[1].length<t;)n[1]+="0";if(n[1].length>9){let r=BigInt(n[1].substring(0,9));n[1].substring(9).match(/^0+$/)||r++,n[1]=r.toString()}return BigInt(n[0]+n[1])}function bp(i){return new T1(i,async(t,e,n)=>{n.setHeader("User-Agent","ethers");let r;try{const[s,a]=await Promise.all([n.send(),t()]);r=s;const o=r.bodyJson.standard;return{gasPrice:a.gasPrice,maxFeePerGas:vp(o.maxFee,9),maxPriorityFeePerGas:vp(o.maxPriorityFee,9)}}catch(s){it(!1,`error encountered with polygon gas station (${JSON.stringify(n.url)})`,"SERVER_ERROR",{request:n,response:r,error:s})}})}let wp=!1;function R1(){if(wp)return;wp=!0;function i(e,n,r){const s=function(){const a=new Dn(e,n);return r.ensNetwork!=null&&a.attachPlugin(new Lc(null,r.ensNetwork,r.ensUniversalResolver)),a.attachPlugin(new Nc),(r.plugins||[]).forEach(o=>{a.attachPlugin(o)}),a};Dn.register(e,s),Dn.register(n,s),r.altNames&&r.altNames.forEach(a=>{Dn.register(a,s)})}const t="0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe";i("mainnet",1,{ensUniversalResolver:t,ensNetwork:1,altNames:["homestead"]}),i("ropsten",3,{ensNetwork:3}),i("rinkeby",4,{ensNetwork:4}),i("goerli",5,{ensNetwork:5}),i("kovan",42,{ensNetwork:42}),i("sepolia",11155111,{ensUniversalResolver:t,ensNetwork:11155111}),i("holesky",17e3,{ensNetwork:17e3}),i("classic",61,{}),i("classicKotti",6,{}),i("arbitrum",42161,{ensNetwork:1}),i("arbitrum-goerli",421613,{}),i("arbitrum-sepolia",421614,{}),i("base",8453,{ensNetwork:1}),i("base-goerli",84531,{}),i("base-sepolia",84532,{}),i("bnb",56,{ensNetwork:1}),i("bnbt",97,{}),i("filecoin",314,{}),i("filecoin-calibration",314159,{}),i("linea",59144,{ensNetwork:1}),i("linea-goerli",59140,{}),i("linea-sepolia",59141,{}),i("matic",137,{ensNetwork:1,plugins:[bp("https://gasstation.polygon.technology/v2")]}),i("matic-amoy",80002,{}),i("matic-mumbai",80001,{altNames:["maticMumbai","maticmum"],plugins:[bp("https://gasstation-testnet.polygon.technology/v2")]}),i("optimism",10,{ensNetwork:1,plugins:[]}),i("optimism-goerli",420,{}),i("optimism-sepolia",11155420,{}),i("xdai",100,{ensNetwork:1})}function qu(i){return JSON.parse(JSON.stringify(i))}class P1{#t;#e;#n;#i;constructor(t){this.#t=t,this.#e=null,this.#n=4e3,this.#i=-2}get pollingInterval(){return this.#n}set pollingInterval(t){this.#n=t}async#r(){try{const t=await this.#t.getBlockNumber();if(this.#i===-2){this.#i=t;return}if(t!==this.#i){for(let e=this.#i+1;e<=t;e++){if(this.#e==null)return;await this.#t.emit("block",e)}this.#i=t}}catch{}this.#e!=null&&(this.#e=this.#t._setTimeout(this.#r.bind(this),this.#n))}start(){this.#e||(this.#e=this.#t._setTimeout(this.#r.bind(this),this.#n),this.#r())}stop(){this.#e&&(this.#t._clearTimeout(this.#e),this.#e=null)}pause(t){this.stop(),t&&(this.#i=-2)}resume(){this.start()}}class kh{#t;#e;#n;constructor(t){this.#t=t,this.#n=!1,this.#e=e=>{this._poll(e,this.#t)}}async _poll(t,e){throw new Error("sub-classes must override this")}start(){this.#n||(this.#n=!0,this.#e(-2),this.#t.on("block",this.#e))}stop(){this.#n&&(this.#n=!1,this.#t.off("block",this.#e))}pause(t){this.stop()}resume(){this.start()}}class I1 extends kh{#t;#e;constructor(t,e){super(t),this.#t=e,this.#e=-2}pause(t){t&&(this.#e=-2),super.pause(t)}async _poll(t,e){const n=await e.getBlock(this.#t);n!=null&&(this.#e===-2?this.#e=n.number:n.number>this.#e&&(e.emit(this.#t,n.number),this.#e=n.number))}}class N1 extends kh{#t;constructor(t,e){super(t),this.#t=qu(e)}async _poll(t,e){throw new Error("@TODO")}}class L1 extends kh{#t;constructor(t,e){super(t),this.#t=e}async _poll(t,e){const n=await e.getTransactionReceipt(this.#t);n&&e.emit(this.#t,n)}}class Gh{#t;#e;#n;#i;#r;constructor(t,e){this.#t=t,this.#e=qu(e),this.#n=this.#a.bind(this),this.#i=!1,this.#r=-2}async#a(t){if(this.#r===-2)return;const e=qu(this.#e);e.fromBlock=this.#r+1,e.toBlock=t;const n=await this.#t.getLogs(e);if(n.length===0){this.#r<t-60&&(this.#r=t-60);return}for(const r of n)this.#t.emit(this.#e,r),this.#r=r.blockNumber}start(){this.#i||(this.#i=!0,this.#r===-2&&this.#t.getBlockNumber().then(t=>{this.#r=t}),this.#t.on("block",this.#n))}stop(){this.#i&&(this.#i=!1,this.#t.off("block",this.#n))}pause(t){this.stop(),t&&(this.#r=-2)}resume(){this.start()}}const U1=BigInt(2),D1=10;function Dl(i){return new Promise(t=>{setTimeout(t,i)})}function Co(i){return i&&typeof i.then=="function"}function Go(i,t){return i+":"+JSON.stringify(t,(e,n)=>{if(n==null)return"null";if(typeof n=="bigint")return`bigint:${n.toString()}`;if(typeof n=="string")return n.toLowerCase();if(typeof n=="object"&&!Array.isArray(n)){const r=Object.keys(n);return r.sort(),r.reduce((s,a)=>(s[a]=n[a],s),{})}return n})}class c0{name;constructor(t){Ft(this,{name:t})}start(){}stop(){}pause(t){}resume(){}}function F1(i){return JSON.parse(JSON.stringify(i))}function Ku(i){return i=Array.from(new Set(i).values()),i.sort(),i}async function Fl(i,t){if(i==null)throw new Error("invalid event");if(Array.isArray(i)&&(i={topics:i}),typeof i=="string")switch(i){case"block":case"debug":case"error":case"finalized":case"network":case"pending":case"safe":return{type:i,tag:i}}if(be(i,32)){const e=i.toLowerCase();return{type:"transaction",tag:Go("tx",{hash:e}),hash:e}}if(i.orphan){const e=i;return{type:"orphan",tag:Go("orphan",e),filter:F1(e)}}if(i.address||i.topics){const e=i,n={topics:(e.topics||[]).map(r=>r==null?null:Array.isArray(r)?Ku(r.map(s=>s.toLowerCase())):r.toLowerCase())};if(e.address){const r=[],s=[],a=o=>{be(o)?r.push(o):s.push((async()=>{r.push(await gn(o,t))})())};Array.isArray(e.address)?e.address.forEach(a):a(e.address),s.length&&await Promise.all(s),n.address=Ku(r.map(o=>o.toLowerCase()))}return{filter:n,tag:Go("event",n),type:"event"}}O(!1,"unknown ProviderEvent","event",i)}function Ro(){return new Date().getTime()}const O1={cacheTimeout:250,pollingInterval:4e3};class B1{#t;#e;#n;#i;#r;#a;#s;#o;#f;#l;#m;#p;#d;#u;constructor(t,e){if(this.#u=Object.assign({},O1,e||{}),t==="any")this.#a=!0,this.#r=null;else if(t){const n=Dn.from(t);this.#a=!1,this.#r=Promise.resolve(n),setTimeout(()=>{this.emit("network",n,null)},0)}else this.#a=!1,this.#r=null;this.#o=-1,this.#s=new Map,this.#t=new Map,this.#e=new Map,this.#n=null,this.#i=!1,this.#f=1,this.#l=new Map,this.#m=!1,this.#p=0,this.#d=[]}get _requestRate(){const t=this.#p;return t==0?null:t}set _requestRate(t){(t==null||t<0)&&(t=0),this.#p=Xt(t)}get pollingInterval(){return this.#u.pollingInterval}get provider(){return this}get plugins(){return Array.from(this.#e.values())}attachPlugin(t){if(this.#e.get(t.name))throw new Error(`cannot replace existing plugin: ${t.name} `);return this.#e.set(t.name,t.connect(this)),this}getPlugin(t){return this.#e.get(t)||null}get disableCcipRead(){return this.#m}set disableCcipRead(t){this.#m=!!t}#h(){let t=this.#p;if(t===0)return 0;const e=this.#d,n=Ro();e.push(n);const r=n-1e3;for(;e.length&&e[0]<r;)e.shift();return e.length<t?0:e[0]+1e3-n}async#c(t){const e=this.#u.cacheTimeout;if(e<0){const s=this.#h();return s&&await Dl(s),await this._perform(t)}const n=Go(t.method,t);let r=this.#s.get(n);if(!r){const s=this.#h();s&&await Dl(s),r=this._perform(t),this.#s.set(n,r),setTimeout(()=>{this.#s.get(n)===r&&this.#s.delete(n)},e)}return await r}async ccipReadFetch(t,e,n){if(this.disableCcipRead||n.length===0||t.to==null)return null;const r=t.to.toLowerCase(),s=e.toLowerCase(),a=[];for(let o=0;o<n.length;o++){const c=n[o],l=c.replace("{sender}",r).replace("{data}",s),u=new Hi(l);c.indexOf("{data}")===-1&&(u.body={data:s,sender:r}),this.emit("debug",{action:"sendCcipReadFetchRequest",request:u,index:o,urls:n});let h="unknown error",f;try{f=await u.send()}catch(d){a.push(d.message),this.emit("debug",{action:"receiveCcipReadFetchError",request:u,result:{error:d}});continue}try{const d=f.bodyJson;if(d.data)return this.emit("debug",{action:"receiveCcipReadFetchResult",request:u,result:d}),d.data;d.message&&(h=d.message),this.emit("debug",{action:"receiveCcipReadFetchError",request:u,result:d})}catch{}it(f.statusCode<400||f.statusCode>=500,`response not found during CCIP fetch: ${h}`,"OFFCHAIN_FAULT",{reason:"404_MISSING_RESOURCE",transaction:t,info:{url:c,errorMessage:h}}),a.push(h)}it(!1,`error encountered during CCIP fetch: ${a.map(o=>JSON.stringify(o)).join(", ")}`,"OFFCHAIN_FAULT",{reason:"500_SERVER_ERROR",transaction:t,info:{urls:n,errorMessages:a}})}_wrapBlock(t,e){return new e1(v1(t),this)}_wrapLog(t,e){return new Ga(x1(t),this)}_wrapTransactionReceipt(t,e){return new Jg(M1(t),this)}_wrapTransactionResponse(t,e){return new Ha(o0(t),this)}_detectNetwork(){it(!1,"sub-classes must implement this","UNSUPPORTED_OPERATION",{operation:"_detectNetwork"})}async _perform(t){it(!1,`unsupported method: ${t.method}`,"UNSUPPORTED_OPERATION",{operation:t.method,info:t})}async getBlockNumber(){const t=Xt(await this.#c({method:"getBlockNumber"}),"%response");return this.#o>=0&&(this.#o=t),t}_getAddress(t){return gn(t,this)}_getBlockTag(t){if(t==null)return"latest";switch(t){case"earliest":return"0x0";case"finalized":case"latest":case"pending":case"safe":return t}if(be(t))return be(t,32)?t:Zn(t);if(typeof t=="bigint"&&(t=Xt(t,"blockTag")),typeof t=="number")return t>=0?Zn(t):this.#o>=0?Zn(this.#o+t):this.getBlockNumber().then(e=>Zn(e+t));O(!1,"invalid blockTag","blockTag",t)}_getFilter(t){const e=(t.topics||[]).map(c=>c==null?null:Array.isArray(c)?Ku(c.map(l=>l.toLowerCase())):c.toLowerCase()),n="blockHash"in t?t.blockHash:void 0,r=(c,l,u)=>{let h;switch(c.length){case 0:break;case 1:h=c[0];break;default:c.sort(),h=c}if(n&&(l!=null||u!=null))throw new Error("invalid filter");const f={};return h&&(f.address=h),e.length&&(f.topics=e),l&&(f.fromBlock=l),u&&(f.toBlock=u),n&&(f.blockHash=n),f};let s=[];if(t.address)if(Array.isArray(t.address))for(const c of t.address)s.push(this._getAddress(c));else s.push(this._getAddress(t.address));let a;"fromBlock"in t&&(a=this._getBlockTag(t.fromBlock));let o;return"toBlock"in t&&(o=this._getBlockTag(t.toBlock)),s.filter(c=>typeof c!="string").length||a!=null&&typeof a!="string"||o!=null&&typeof o!="string"?Promise.all([Promise.all(s),a,o]).then(c=>r(c[0],c[1],c[2])):r(s,a,o)}_getTransactionRequest(t){const e=lc(t),n=[];if(["to","from"].forEach(r=>{if(e[r]==null)return;const s=gn(e[r],this);Co(s)?n.push((async function(){e[r]=await s})()):e[r]=s}),e.blockTag!=null){const r=this._getBlockTag(e.blockTag);Co(r)?n.push((async function(){e.blockTag=await r})()):e.blockTag=r}return n.length?(async function(){return await Promise.all(n),e})():e}async getNetwork(){if(this.#r==null){const r=(async()=>{try{const s=await this._detectNetwork();return this.emit("network",s,null),s}catch(s){throw this.#r===r&&(this.#r=null),s}})();return this.#r=r,(await r).clone()}const t=this.#r,[e,n]=await Promise.all([t,this._detectNetwork()]);return e.chainId!==n.chainId&&(this.#a?(this.emit("network",n,e),this.#r===t&&(this.#r=Promise.resolve(n))):it(!1,`network changed: ${e.chainId} => ${n.chainId} `,"NETWORK_ERROR",{event:"changed"})),e.clone()}async getFeeData(){const t=await this.getNetwork(),e=async()=>{const{_block:r,gasPrice:s,priorityFee:a}=await fn({_block:this.#b("latest",!1),gasPrice:(async()=>{try{const u=await this.#c({method:"getGasPrice"});return bt(u,"%response")}catch{}return null})(),priorityFee:(async()=>{try{const u=await this.#c({method:"getPriorityFee"});return bt(u,"%response")}catch{}return null})()});let o=null,c=null;const l=this._wrapBlock(r,t);return l&&l.baseFeePerGas&&(c=a??BigInt("1000000000"),o=l.baseFeePerGas*U1+c),new dp(s,o,c)},n=t.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");if(n){const r=new Hi(n.url),s=await n.processFunc(e,this,r);return new dp(s.gasPrice,s.maxFeePerGas,s.maxPriorityFeePerGas)}return await e()}async estimateGas(t){let e=this._getTransactionRequest(t);return Co(e)&&(e=await e),bt(await this.#c({method:"estimateGas",transaction:e}),"%response")}async#y(t,e,n){it(n<D1,"CCIP read exceeded maximum redirections","OFFCHAIN_FAULT",{reason:"TOO_MANY_REDIRECTS",transaction:Object.assign({},t,{blockTag:e,enableCcipRead:!0})});const r=lc(t);try{const s=this.#h();return s&&await Dl(s),_t(await this._perform({method:"call",transaction:r,blockTag:e}))}catch(s){if(!this.disableCcipRead&&vh(s)&&s.data&&n>=0&&e==="latest"&&r.to!=null&&De(s.data,0,4)==="0x556f1830"){const a=s.data,o=await gn(r.to,this);let c;try{c=V1(De(s.data,4))}catch(h){it(!1,h.message,"OFFCHAIN_FAULT",{reason:"BAD_DATA",transaction:r,info:{data:a}})}it(c.sender.toLowerCase()===o.toLowerCase(),"CCIP Read sender mismatch","CALL_EXCEPTION",{action:"call",data:a,reason:"OffchainLookup",transaction:r,invocation:null,revert:{signature:"OffchainLookup(address,string[],bytes,bytes4,bytes)",name:"OffchainLookup",args:c.errorArgs}});const l=await this.ccipReadFetch(r,c.calldata,c.urls);it(l!=null,"CCIP Read failed to fetch data","OFFCHAIN_FAULT",{reason:"FETCH_FAILED",transaction:r,info:{data:s.data,errorArgs:c.errorArgs}});const u={to:o,data:Pe([c.selector,z1([l,c.extraData])])};this.emit("debug",{action:"sendCcipReadCall",transaction:u});try{const h=await this.#y(u,e,n+1);return this.emit("debug",{action:"receiveCcipReadCallResult",transaction:Object.assign({},u),result:h}),h}catch(h){throw this.emit("debug",{action:"receiveCcipReadCallError",transaction:Object.assign({},u),error:h}),h}}throw s}}async#x(t){const{value:e}=await fn({network:this.getNetwork(),value:t});return e}async call(t){const{tx:e,blockTag:n}=await fn({tx:this._getTransactionRequest(t),blockTag:this._getBlockTag(t.blockTag)});return await this.#x(this.#y(e,n,t.enableCcipRead?0:-1))}async#g(t,e,n){let r=this._getAddress(e),s=this._getBlockTag(n);return(typeof r!="string"||typeof s!="string")&&([r,s]=await Promise.all([r,s])),await this.#x(this.#c(Object.assign(t,{address:r,blockTag:s})))}async getBalance(t,e){return bt(await this.#g({method:"getBalance"},t,e),"%response")}async getTransactionCount(t,e){return Xt(await this.#g({method:"getTransactionCount"},t,e),"%response")}async getCode(t,e){return _t(await this.#g({method:"getCode"},t,e))}async getStorage(t,e,n){const r=bt(e,"position");return _t(await this.#g({method:"getStorage",position:r},t,n))}async broadcastTransaction(t){const{blockNumber:e,hash:n,network:r}=await fn({blockNumber:this.getBlockNumber(),hash:this._perform({method:"broadcastTransaction",signedTransaction:t}),network:this.getNetwork()}),s=Qn.from(t);if(s.hash!==n)throw new Error("@TODO: the returned hash did not match");return this._wrapTransactionResponse(s,r).replaceableTransaction(e)}async#b(t,e){if(be(t,32))return await this.#c({method:"getBlock",blockHash:t,includeTransactions:e});let n=this._getBlockTag(t);return typeof n!="string"&&(n=await n),await this.#c({method:"getBlock",blockTag:n,includeTransactions:e})}async getBlock(t,e){const{network:n,params:r}=await fn({network:this.getNetwork(),params:this.#b(t,!!e)});return r==null?null:this._wrapBlock(r,n)}async getTransaction(t){const{network:e,params:n}=await fn({network:this.getNetwork(),params:this.#c({method:"getTransaction",hash:t})});return n==null?null:this._wrapTransactionResponse(n,e)}async getTransactionReceipt(t){const{network:e,params:n}=await fn({network:this.getNetwork(),params:this.#c({method:"getTransactionReceipt",hash:t})});if(n==null)return null;if(n.gasPrice==null&&n.effectiveGasPrice==null){const r=await this.#c({method:"getTransaction",hash:t});if(r==null)throw new Error("report this; could not find tx or effectiveGasPrice");n.effectiveGasPrice=r.gasPrice}return this._wrapTransactionReceipt(n,e)}async getTransactionResult(t){const{result:e}=await fn({network:this.getNetwork(),result:this.#c({method:"getTransactionResult",hash:t})});return e==null?null:_t(e)}async getLogs(t){let e=this._getFilter(t);Co(e)&&(e=await e);const{network:n,params:r}=await fn({network:this.getNetwork(),params:this.#c({method:"getLogs",filter:e})});return r.map(s=>this._wrapLog(s,n))}_getProvider(t){it(!1,"provider cannot connect to target network","UNSUPPORTED_OPERATION",{operation:"_getProvider()"})}async getResolver(t){return await Pi.fromName(this,t)}async getAvatar(t){const e=await this.getResolver(t);return e?await e.getAvatar():null}async resolveName(t,e){const n=await this.getResolver(t);return n?await n.getAddress(e):null}async lookupAddress(t,e){return await Pi.lookupAddress(this,t,e)}async waitForTransaction(t,e,n){const r=e??1;return r===0?this.getTransactionReceipt(t):new Promise(async(s,a)=>{let o=null;const c=(async l=>{try{const u=await this.getTransactionReceipt(t);if(u!=null&&l-u.blockNumber+1>=r){s(u),o&&(clearTimeout(o),o=null);return}}catch(u){console.log("EEE",u)}this.once("block",c)});n!=null&&(o=setTimeout(()=>{o!=null&&(o=null,this.off("block",c),a(Re("timeout","TIMEOUT",{reason:"timeout"})))},n)),c(await this.getBlockNumber())})}async waitForBlock(t){it(!1,"not implemented yet","NOT_IMPLEMENTED",{operation:"waitForBlock"})}_clearTimeout(t){const e=this.#l.get(t);e&&(e.timer&&clearTimeout(e.timer),this.#l.delete(t))}_setTimeout(t,e){e==null&&(e=0);const n=this.#f++,r=()=>{this.#l.delete(n),t()};if(this.paused)this.#l.set(n,{timer:null,func:r,time:e});else{const s=setTimeout(r,e);this.#l.set(n,{timer:s,func:r,time:Ro()})}return n}_forEachSubscriber(t){for(const e of this.#t.values())t(e.subscriber)}_getSubscriber(t){switch(t.type){case"debug":case"error":case"network":return new c0(t.type);case"block":{const e=new P1(this);return e.pollingInterval=this.pollingInterval,e}case"safe":case"finalized":return new I1(this,t.type);case"event":return new Gh(this,t.filter);case"transaction":return new L1(this,t.hash);case"orphan":return new N1(this,t.filter)}throw new Error(`unsupported event: ${t.type}`)}_recoverSubscriber(t,e){for(const n of this.#t.values())if(n.subscriber===t){n.started&&n.subscriber.stop(),n.subscriber=e,n.started&&e.start(),this.#n!=null&&e.pause(this.#n);break}}async#_(t,e){let n=await Fl(t,this);return n.type==="event"&&e&&e.length>0&&e[0].removed===!0&&(n=await Fl({orphan:"drop-log",log:e[0]},this)),this.#t.get(n.tag)||null}async#v(t){const e=await Fl(t,this),n=e.tag;let r=this.#t.get(n);return r||(r={subscriber:this._getSubscriber(e),tag:n,addressableMap:new WeakMap,nameMap:new Map,started:!1,listeners:[]},this.#t.set(n,r)),r}async on(t,e){const n=await this.#v(t);return n.listeners.push({listener:e,once:!1}),n.started||(n.subscriber.start(),n.started=!0,this.#n!=null&&n.subscriber.pause(this.#n)),this}async once(t,e){const n=await this.#v(t);return n.listeners.push({listener:e,once:!0}),n.started||(n.subscriber.start(),n.started=!0,this.#n!=null&&n.subscriber.pause(this.#n)),this}async emit(t,...e){const n=await this.#_(t,e);if(!n||n.listeners.length===0)return!1;const r=n.listeners.length;return n.listeners=n.listeners.filter(({listener:s,once:a})=>{const o=new Tm(this,a?null:s,t);try{s.call(this,...e,o)}catch{}return!a}),n.listeners.length===0&&(n.started&&n.subscriber.stop(),this.#t.delete(n.tag)),r>0}async listenerCount(t){if(t){const n=await this.#_(t);return n?n.listeners.length:0}let e=0;for(const{listeners:n}of this.#t.values())e+=n.length;return e}async listeners(t){if(t){const n=await this.#_(t);return n?n.listeners.map(({listener:r})=>r):[]}let e=[];for(const{listeners:n}of this.#t.values())e=e.concat(n.map(({listener:r})=>r));return e}async off(t,e){const n=await this.#_(t);if(!n)return this;if(e){const r=n.listeners.map(({listener:s})=>s).indexOf(e);r>=0&&n.listeners.splice(r,1)}return(!e||n.listeners.length===0)&&(n.started&&n.subscriber.stop(),this.#t.delete(n.tag)),this}async removeAllListeners(t){if(t){const{tag:e,started:n,subscriber:r}=await this.#v(t);n&&r.stop(),this.#t.delete(e)}else for(const[e,{started:n,subscriber:r}]of this.#t)n&&r.stop(),this.#t.delete(e);return this}async addListener(t,e){return await this.on(t,e)}async removeListener(t,e){return this.off(t,e)}get destroyed(){return this.#i}destroy(){this.removeAllListeners();for(const t of this.#l.keys())this._clearTimeout(t);this.#i=!0}get paused(){return this.#n!=null}set paused(t){!!t!==this.paused&&(this.paused?this.resume():this.pause(!1))}pause(t){if(this.#o=-1,this.#n!=null){if(this.#n==!!t)return;it(!1,"cannot change pause type; resume first","UNSUPPORTED_OPERATION",{operation:"pause"})}this._forEachSubscriber(e=>e.pause(t)),this.#n=!!t;for(const e of this.#l.values())e.timer&&clearTimeout(e.timer),e.time=Ro()-e.time}resume(){if(this.#n!=null){this._forEachSubscriber(t=>t.resume()),this.#n=null;for(const t of this.#l.values()){let e=t.time;e<0&&(e=0),t.time=Ro(),setTimeout(t.func,e)}}}}function k1(i,t){try{const e=Yu(i,t);if(e)return ec(e)}catch{}return null}function Yu(i,t){if(i==="0x")return null;try{const e=Xt(De(i,t,t+32)),n=Xt(De(i,e,e+32));return De(i,e+32,e+32+n)}catch{}return null}function Ap(i){const t=qe(i);if(t.length>32)throw new Error("internal; should not happen");const e=new Uint8Array(32);return e.set(t,32-t.length),e}function G1(i){if(i.length%32===0)return i;const t=new Uint8Array(Math.ceil(i.length/32)*32);return t.set(i),t}const H1=new Uint8Array([]);function z1(i){const t=[];let e=0;for(let n=0;n<i.length;n++)t.push(H1),e+=32;for(let n=0;n<i.length;n++){const r=Zt(i[n]);t[n]=Ap(e),t.push(Ap(r.length)),t.push(G1(r)),e+=32+Math.ceil(r.length/32)*32}return Pe(t)}const Mp="0x0000000000000000000000000000000000000000000000000000000000000000";function V1(i){const t={sender:"",urls:[],calldata:"",selector:"",extraData:"",errorArgs:[]};it(Cs(i)>=160,"insufficient OffchainLookup data","OFFCHAIN_FAULT",{reason:"insufficient OffchainLookup data"});const e=De(i,0,32);it(De(e,0,12)===De(Mp,0,12),"corrupt OffchainLookup sender","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup sender"}),t.sender=De(e,12);try{const n=[],r=Xt(De(i,32,64)),s=Xt(De(i,r,r+32)),a=De(i,r+32);for(let o=0;o<s;o++){const c=k1(a,o*32);if(c==null)throw new Error("abort");n.push(c)}t.urls=n}catch{it(!1,"corrupt OffchainLookup urls","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup urls"})}try{const n=Yu(i,64);if(n==null)throw new Error("abort");t.calldata=n}catch{it(!1,"corrupt OffchainLookup calldata","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup calldata"})}it(De(i,100,128)===De(Mp,0,28),"corrupt OffchainLookup callbaackSelector","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup callbaackSelector"}),t.selector=De(i,96,100);try{const n=Yu(i,128);if(n==null)throw new Error("abort");t.extraData=n}catch{it(!1,"corrupt OffchainLookup extraData","OFFCHAIN_FAULT",{reason:"corrupt OffchainLookup extraData"})}return t.errorArgs="sender,urls,calldata,selector,extraData".split(/,/).map(n=>t[n]),t}function Ar(i,t){if(i.provider)return i.provider;it(!1,"missing provider","UNSUPPORTED_OPERATION",{operation:t})}async function Sp(i,t){let e=lc(t);if(e.to!=null&&(e.to=gn(e.to,i)),e.from!=null){const n=e.from;e.from=Promise.all([i.getAddress(),gn(n,i)]).then(([r,s])=>(O(r.toLowerCase()===s.toLowerCase(),"transaction from mismatch","tx.from",s),r))}else e.from=i.getAddress();return await fn(e)}class W1{provider;constructor(t){Ft(this,{provider:t||null})}async getNonce(t){return Ar(this,"getTransactionCount").getTransactionCount(await this.getAddress(),t)}async populateCall(t){return await Sp(this,t)}async populateTransaction(t){const e=Ar(this,"populateTransaction"),n=await Sp(this,t);n.nonce==null&&(n.nonce=await this.getNonce("pending")),n.gasLimit==null&&(n.gasLimit=await this.estimateGas(n));const r=await this.provider.getNetwork();if(n.chainId!=null){const a=bt(n.chainId);O(a===r.chainId,"transaction chainId mismatch","tx.chainId",t.chainId)}else n.chainId=r.chainId;const s=n.maxFeePerGas!=null||n.maxPriorityFeePerGas!=null;if(n.gasPrice!=null&&(n.type===2||s)?O(!1,"eip-1559 transaction do not support gasPrice","tx",t):(n.type===0||n.type===1)&&s&&O(!1,"pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas","tx",t),(n.type===2||n.type==null)&&n.maxFeePerGas!=null&&n.maxPriorityFeePerGas!=null)n.type=2;else if(n.type===0||n.type===1){const a=await e.getFeeData();it(a.gasPrice!=null,"network does not support gasPrice","UNSUPPORTED_OPERATION",{operation:"getGasPrice"}),n.gasPrice==null&&(n.gasPrice=a.gasPrice)}else{const a=await e.getFeeData();if(n.type==null)if(a.maxFeePerGas!=null&&a.maxPriorityFeePerGas!=null)if(n.authorizationList&&n.authorizationList.length?n.type=4:n.type=2,n.gasPrice!=null){const o=n.gasPrice;delete n.gasPrice,n.maxFeePerGas=o,n.maxPriorityFeePerGas=o}else n.maxFeePerGas==null&&(n.maxFeePerGas=a.maxFeePerGas),n.maxPriorityFeePerGas==null&&(n.maxPriorityFeePerGas=a.maxPriorityFeePerGas);else a.gasPrice!=null?(it(!s,"network does not support EIP-1559","UNSUPPORTED_OPERATION",{operation:"populateTransaction"}),n.gasPrice==null&&(n.gasPrice=a.gasPrice),n.type=0):it(!1,"failed to get consistent fee data","UNSUPPORTED_OPERATION",{operation:"signer.getFeeData"});else(n.type===2||n.type===3||n.type===4)&&(n.maxFeePerGas==null&&(n.maxFeePerGas=a.maxFeePerGas),n.maxPriorityFeePerGas==null&&(n.maxPriorityFeePerGas=a.maxPriorityFeePerGas))}return await fn(n)}async populateAuthorization(t){const e=Object.assign({},t);return e.chainId==null&&(e.chainId=(await Ar(this,"getNetwork").getNetwork()).chainId),e.nonce==null&&(e.nonce=await this.getNonce()),e}async estimateGas(t){return Ar(this,"estimateGas").estimateGas(await this.populateCall(t))}async call(t){return Ar(this,"call").call(await this.populateCall(t))}async resolveName(t){return await Ar(this,"resolveName").resolveName(t)}async sendTransaction(t){const e=Ar(this,"sendTransaction"),n=await this.populateTransaction(t);delete n.from;const r=Qn.from(n);return await e.broadcastTransaction(await this.signTransaction(r))}authorize(t){it(!1,"authorization not implemented for this signer","UNSUPPORTED_OPERATION",{operation:"authorize"})}}function X1(i){return JSON.parse(JSON.stringify(i))}class l0{#t;#e;#n;#i;#r;#a;constructor(t){this.#t=t,this.#e=null,this.#n=this.#s.bind(this),this.#i=!1,this.#r=null,this.#a=!1}_subscribe(t){throw new Error("subclasses must override this")}_emitResults(t,e){throw new Error("subclasses must override this")}_recover(t){throw new Error("subclasses must override this")}async#s(t){try{this.#e==null&&(this.#e=this._subscribe(this.#t));let e=null;try{e=await this.#e}catch(s){if(!en(s,"UNSUPPORTED_OPERATION")||s.operation!=="eth_newFilter")throw s}if(e==null){this.#e=null,this.#t._recoverSubscriber(this,this._recover(this.#t));return}const n=await this.#t.getNetwork();if(this.#r||(this.#r=n),this.#r.chainId!==n.chainId)throw new Error("chaid changed");if(this.#a)return;const r=await this.#t.send("eth_getFilterChanges",[e]);await this._emitResults(this.#t,r)}catch(e){console.log("@TODO",e)}this.#t.once("block",this.#n)}#o(){const t=this.#e;t&&(this.#e=null,t.then(e=>{this.#t.destroyed||this.#t.send("eth_uninstallFilter",[e])}))}start(){this.#i||(this.#i=!0,this.#s(-2))}stop(){this.#i&&(this.#i=!1,this.#a=!0,this.#o(),this.#t.off("block",this.#n))}pause(t){t&&this.#o(),this.#t.off("block",this.#n)}resume(){this.start()}}class q1 extends l0{#t;constructor(t,e){super(t),this.#t=X1(e)}_recover(t){return new Gh(t,this.#t)}async _subscribe(t){return await t.send("eth_newFilter",[this.#t])}async _emitResults(t,e){for(const n of e)t.emit(this.#t,t._wrapLog(n,t._network))}}class K1 extends l0{async _subscribe(t){return await t.send("eth_newPendingTransactionFilter",[])}async _emitResults(t,e){for(const n of e)t.emit("pending",n)}}const Y1="bigint,boolean,function,number,string,symbol".split(/,/g);function Ho(i){if(i==null||Y1.indexOf(typeof i)>=0||typeof i.getAddress=="function")return i;if(Array.isArray(i))return i.map(Ho);if(typeof i=="object")return Object.keys(i).reduce((t,e)=>(t[e]=i[e],t),{});throw new Error(`should not happen: ${i} (${typeof i})`)}function J1(i){return new Promise(t=>{setTimeout(t,i)})}function _s(i){return i&&i.toLowerCase()}function Ep(i){return i&&typeof i.pollingInterval=="number"}const u0={polling:!1,staticNetwork:null,batchStallTime:10,batchMaxSize:1<<20,batchMaxCount:100,cacheTimeout:250,pollingInterval:4e3};class Ol extends W1{address;constructor(t,e){super(t),e=he(e),Ft(this,{address:e})}connect(t){it(!1,"cannot reconnect JsonRpcSigner","UNSUPPORTED_OPERATION",{operation:"signer.connect"})}async getAddress(){return this.address}async populateTransaction(t){return await this.populateCall(t)}async sendUncheckedTransaction(t){const e=Ho(t),n=[];if(e.from){const s=e.from;n.push((async()=>{const a=await gn(s,this.provider);O(a!=null&&a.toLowerCase()===this.address.toLowerCase(),"from address mismatch","transaction",t),e.from=a})())}else e.from=this.address;if(e.gasLimit==null&&n.push((async()=>{e.gasLimit=await this.provider.estimateGas({...e,from:this.address})})()),e.to!=null){const s=e.to;n.push((async()=>{e.to=await gn(s,this.provider)})())}n.length&&await Promise.all(n);const r=this.provider.getRpcTransaction(e);return this.provider.send("eth_sendTransaction",[r])}async sendTransaction(t){const e=await this.provider.getBlockNumber(),n=await this.sendUncheckedTransaction(t);return await new Promise((r,s)=>{const a=[1e3,100];let o=0;const c=async()=>{try{const l=await this.provider.getTransaction(n);if(l!=null){r(l.replaceableTransaction(e));return}}catch(l){if(en(l,"CANCELLED")||en(l,"BAD_DATA")||en(l,"NETWORK_ERROR")||en(l,"UNSUPPORTED_OPERATION")){l.info==null&&(l.info={}),l.info.sendTransactionHash=n,s(l);return}if(en(l,"INVALID_ARGUMENT")&&(o++,l.info==null&&(l.info={}),l.info.sendTransactionHash=n,o>10)){s(l);return}this.provider.emit("error",Re("failed to fetch transation after sending (will try again)","UNKNOWN_ERROR",{error:l}))}this.provider._setTimeout(()=>{c()},a.pop()||4e3)};c()})}async signTransaction(t){const e=Ho(t);if(e.from){const r=await gn(e.from,this.provider);O(r!=null&&r.toLowerCase()===this.address.toLowerCase(),"from address mismatch","transaction",t),e.from=r}else e.from=this.address;const n=this.provider.getRpcTransaction(e);return await this.provider.send("eth_signTransaction",[n])}async signMessage(t){const e=typeof t=="string"?ii(t):t;return await this.provider.send("personal_sign",[_t(e),this.address.toLowerCase()])}async signTypedData(t,e,n){const r=Ho(n),s=await Rn.resolveNames(t,e,r,async a=>{const o=await gn(a);return O(o!=null,"TypedData does not support null address","value",a),o});return await this.provider.send("eth_signTypedData_v4",[this.address.toLowerCase(),JSON.stringify(Rn.getPayload(s.domain,e,s.value))])}async unlock(t){return this.provider.send("personal_unlockAccount",[this.address.toLowerCase(),t,null])}async _legacySignMessage(t){const e=typeof t=="string"?ii(t):t;return await this.provider.send("eth_sign",[this.address.toLowerCase(),_t(e)])}}class Q1 extends B1{#t;#e;#n;#i;#r;#a;#s;#o(){if(this.#i)return;const t=this._getOption("batchMaxCount")===1?0:this._getOption("batchStallTime");this.#i=setTimeout(()=>{this.#i=null;const e=this.#n;for(this.#n=[];e.length;){const n=[e.shift()];for(;e.length&&n.length!==this.#t.batchMaxCount;)if(n.push(e.shift()),JSON.stringify(n.map(s=>s.payload)).length>this.#t.batchMaxSize){e.unshift(n.pop());break}(async()=>{const r=n.length===1?n[0].payload:n.map(s=>s.payload);this.emit("debug",{action:"sendRpcPayload",payload:r});try{const s=await this._send(r);this.emit("debug",{action:"receiveRpcResult",result:s});for(const{resolve:a,reject:o,payload:c}of n){if(this.destroyed){o(Re("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:c.method}));continue}const l=s.filter(u=>u.id===c.id)[0];if(l==null){const u=Re("missing response for request","BAD_DATA",{value:s,info:{payload:c}});this.emit("error",u),o(u);continue}if("error"in l){o(this.getRpcError(c,l));continue}a(l.result)}}catch(s){this.emit("debug",{action:"receiveRpcError",error:s});for(const{reject:a}of n)a(s)}})()}},t)}constructor(t,e){super(t,e),this.#e=1,this.#t=Object.assign({},u0,e||{}),this.#n=[],this.#i=null,this.#a=null,this.#s=null;{let r=null;const s=new Promise(a=>{r=a});this.#r={promise:s,resolve:r}}const n=this._getOption("staticNetwork");typeof n=="boolean"?(O(!n||t!=="any","staticNetwork cannot be used on special network 'any'","options",e),n&&t!=null&&(this.#a=Dn.from(t))):n&&(O(t==null||n.matches(t),"staticNetwork MUST match network object","options",e),this.#a=n)}_getOption(t){return this.#t[t]}get _network(){return it(this.#a,"network is not available yet","NETWORK_ERROR"),this.#a}async _perform(t){if(t.method==="call"||t.method==="estimateGas"){let n=t.transaction;if(n&&n.type!=null&&bt(n.type)&&n.maxFeePerGas==null&&n.maxPriorityFeePerGas==null){const r=await this.getFeeData();r.maxFeePerGas==null&&r.maxPriorityFeePerGas==null&&(t=Object.assign({},t,{transaction:Object.assign({},n,{type:void 0})}))}}const e=this.getRpcRequest(t);return e!=null?await this.send(e.method,e.args):super._perform(t)}async _detectNetwork(){const t=this._getOption("staticNetwork");if(t)if(t===!0){if(this.#a)return this.#a}else return t;return this.#s?await this.#s:this.ready?(this.#s=(async()=>{try{const e=Dn.from(bt(await this.send("eth_chainId",[])));return this.#s=null,e}catch(e){throw this.#s=null,e}})(),await this.#s):(this.#s=(async()=>{const e={id:this.#e++,method:"eth_chainId",params:[],jsonrpc:"2.0"};this.emit("debug",{action:"sendRpcPayload",payload:e});let n;try{n=(await this._send(e))[0],this.#s=null}catch(r){throw this.#s=null,this.emit("debug",{action:"receiveRpcError",error:r}),r}if(this.emit("debug",{action:"receiveRpcResult",result:n}),"result"in n)return Dn.from(bt(n.result));throw this.getRpcError(e,n)})(),await this.#s)}_start(){this.#r==null||this.#r.resolve==null||(this.#r.resolve(),this.#r=null,(async()=>{for(;this.#a==null&&!this.destroyed;)try{this.#a=await this._detectNetwork()}catch(t){if(this.destroyed)break;console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"),this.emit("error",Re("failed to bootstrap network detection","NETWORK_ERROR",{event:"initial-network-discovery",info:{error:t}})),await J1(1e3)}this.#o()})())}async _waitUntilReady(){if(this.#r!=null)return await this.#r.promise}_getSubscriber(t){return t.type==="pending"?new K1(this):t.type==="event"?this._getOption("polling")?new Gh(this,t.filter):new q1(this,t.filter):t.type==="orphan"&&t.filter.orphan==="drop-log"?new c0("orphan"):super._getSubscriber(t)}get ready(){return this.#r==null}getRpcTransaction(t){const e={};return["chainId","gasLimit","gasPrice","type","maxFeePerGas","maxPriorityFeePerGas","nonce","value"].forEach(n=>{if(t[n]==null)return;let r=n;n==="gasLimit"&&(r="gas"),e[r]=Zn(bt(t[n],`tx.${n}`))}),["from","to","data"].forEach(n=>{t[n]!=null&&(e[n]=_t(t[n]))}),t.accessList&&(e.accessList=jr(t.accessList)),t.blobVersionedHashes&&(e.blobVersionedHashes=t.blobVersionedHashes.map(n=>n.toLowerCase())),t.authorizationList&&(e.authorizationList=t.authorizationList.map(n=>{const r=mg(n);return{address:r.address,nonce:Zn(r.nonce),chainId:Zn(r.chainId),yParity:Zn(r.signature.yParity),r:Zn(r.signature.r),s:Zn(r.signature.s)}})),e}getRpcRequest(t){switch(t.method){case"chainId":return{method:"eth_chainId",args:[]};case"getBlockNumber":return{method:"eth_blockNumber",args:[]};case"getGasPrice":return{method:"eth_gasPrice",args:[]};case"getPriorityFee":return{method:"eth_maxPriorityFeePerGas",args:[]};case"getBalance":return{method:"eth_getBalance",args:[_s(t.address),t.blockTag]};case"getTransactionCount":return{method:"eth_getTransactionCount",args:[_s(t.address),t.blockTag]};case"getCode":return{method:"eth_getCode",args:[_s(t.address),t.blockTag]};case"getStorage":return{method:"eth_getStorageAt",args:[_s(t.address),"0x"+t.position.toString(16),t.blockTag]};case"broadcastTransaction":return{method:"eth_sendRawTransaction",args:[t.signedTransaction]};case"getBlock":if("blockTag"in t)return{method:"eth_getBlockByNumber",args:[t.blockTag,!!t.includeTransactions]};if("blockHash"in t)return{method:"eth_getBlockByHash",args:[t.blockHash,!!t.includeTransactions]};break;case"getTransaction":return{method:"eth_getTransactionByHash",args:[t.hash]};case"getTransactionReceipt":return{method:"eth_getTransactionReceipt",args:[t.hash]};case"call":return{method:"eth_call",args:[this.getRpcTransaction(t.transaction),t.blockTag]};case"estimateGas":return{method:"eth_estimateGas",args:[this.getRpcTransaction(t.transaction)]};case"getLogs":return t.filter&&t.filter.address!=null&&(Array.isArray(t.filter.address)?t.filter.address=t.filter.address.map(_s):t.filter.address=_s(t.filter.address)),{method:"eth_getLogs",args:[t.filter]}}return null}getRpcError(t,e){const{method:n}=t,{error:r}=e;if(n==="eth_estimateGas"&&r.message){const o=r.message;if(!o.match(/revert/i)&&o.match(/insufficient funds/i))return Re("insufficient funds","INSUFFICIENT_FUNDS",{transaction:t.params[0],info:{payload:t,error:r}});if(o.match(/nonce/i)&&o.match(/too low/i))return Re("nonce has already been used","NONCE_EXPIRED",{transaction:t.params[0],info:{payload:t,error:r}})}if(n==="eth_call"||n==="eth_estimateGas"){const o=Ju(r),c=Hs.getBuiltinCallException(n==="eth_call"?"call":"estimateGas",t.params[0],o?o.data:null);return c.info={error:r,payload:t},c}const s=JSON.stringify($1(r));if(typeof r.message=="string"&&r.message.match(/user denied|ethers-user-denied/i))return Re("user rejected action","ACTION_REJECTED",{action:{eth_sign:"signMessage",personal_sign:"signMessage",eth_signTypedData_v4:"signTypedData",eth_signTransaction:"signTransaction",eth_sendTransaction:"sendTransaction",eth_requestAccounts:"requestAccess",wallet_requestAccounts:"requestAccess"}[n]||"unknown",reason:"rejected",info:{payload:t,error:r}});if(n==="eth_sendRawTransaction"||n==="eth_sendTransaction"){const o=t.params[0];if(s.match(/insufficient funds|base fee exceeds gas limit/i))return Re("insufficient funds for intrinsic transaction cost","INSUFFICIENT_FUNDS",{transaction:o,info:{error:r}});if(s.match(/nonce/i)&&s.match(/too low/i))return Re("nonce has already been used","NONCE_EXPIRED",{transaction:o,info:{error:r}});if(s.match(/replacement transaction/i)&&s.match(/underpriced/i))return Re("replacement fee too low","REPLACEMENT_UNDERPRICED",{transaction:o,info:{error:r}});if(s.match(/only replay-protected/i))return Re("legacy pre-eip-155 transactions not supported","UNSUPPORTED_OPERATION",{operation:n,info:{transaction:o,info:{error:r}}})}let a=!!s.match(/the method .* does not exist/i);return a||r&&r.details&&r.details.startsWith("Unauthorized method:")&&(a=!0),a?Re("unsupported operation","UNSUPPORTED_OPERATION",{operation:t.method,info:{error:r,payload:t}}):Re("could not coalesce error","UNKNOWN_ERROR",{error:r,payload:t})}send(t,e){if(this.destroyed)return Promise.reject(Re("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:t}));const n=this.#e++,r=new Promise((s,a)=>{this.#n.push({resolve:s,reject:a,payload:{method:t,params:e,id:n,jsonrpc:"2.0"}})});return this.#o(),r}async getSigner(t){t==null&&(t=0);const e=this.send("eth_accounts",[]);if(typeof t=="number"){const r=await e;if(t>=r.length)throw new Error("no such account");return new Ol(this,r[t])}const{accounts:n}=await fn({network:this.getNetwork(),accounts:e});t=he(t);for(const r of n)if(he(r)===t)return new Ol(this,t);throw new Error("invalid account")}async listAccounts(){return(await this.send("eth_accounts",[])).map(e=>new Ol(this,e))}destroy(){this.#i&&(clearTimeout(this.#i),this.#i=null);for(const{payload:t,reject:e}of this.#n)e(Re("provider destroyed; cancelled request","UNSUPPORTED_OPERATION",{operation:t.method}));this.#n=[],super.destroy()}}class Z1 extends Q1{#t;constructor(t,e){super(t,e);let n=this._getOption("pollingInterval");n==null&&(n=u0.pollingInterval),this.#t=n}_getSubscriber(t){const e=super._getSubscriber(t);return Ep(e)&&(e.pollingInterval=this.#t),e}get pollingInterval(){return this.#t}set pollingInterval(t){if(!Number.isInteger(t)||t<0)throw new Error("invalid interval");this.#t=t,this._forEachSubscriber(e=>{Ep(e)&&(e.pollingInterval=this.#t)})}}function Ju(i){if(i==null)return null;if(typeof i.message=="string"&&i.message.match(/revert/i)&&be(i.data))return{message:i.message,data:i.data};if(typeof i=="object"){for(const t in i){const e=Ju(i[t]);if(e)return e}return null}if(typeof i=="string")try{return Ju(JSON.parse(i))}catch{}return null}function Qu(i,t){if(i!=null){if(typeof i.message=="string"&&t.push(i.message),typeof i=="object")for(const e in i)Qu(i[e],t);if(typeof i=="string")try{return Qu(JSON.parse(i),t)}catch{}}}function $1(i){const t=[];return Qu(i,t),t}class Cr extends Z1{#t;#e;constructor(t,e,n){const r=Object.assign({},n??{},{batchMaxCount:1});O(t&&t.request,"invalid EIP-1193 provider","ethereum",t),super(e,r),this.#e=null,n&&n.providerInfo&&(this.#e=n.providerInfo),this.#t=async(s,a)=>{const o={method:s,params:a};this.emit("debug",{action:"sendEip1193Request",payload:o});try{const c=await t.request(o);return this.emit("debug",{action:"receiveEip1193Result",result:c}),c}catch(c){const l=new Error(c.message);throw l.code=c.code,l.data=c.data,l.payload=o,this.emit("debug",{action:"receiveEip1193Error",error:l}),l}}}get providerInfo(){return this.#e}async send(t,e){return await this._start(),await super.send(t,e)}async _send(t){O(!Array.isArray(t),"EIP-1193 does not support batch request","payload",t);try{const e=await this.#t(t.method,t.params||[]);return[{id:t.id,result:e}]}catch(e){return[{id:t.id,error:{code:e.code,data:e.data,message:e.message}}]}}getRpcError(t,e){switch(e=JSON.parse(JSON.stringify(e)),e.error.code||-1){case 4001:e.error.message=`ethers-user-denied: ${e.error.message}`;break;case 4200:e.error.message=`ethers-unsupported: ${e.error.message}`;break}return super.getRpcError(t,e)}async hasSigner(t){t==null&&(t=0);const e=await this.send("eth_accounts",[]);return typeof t=="number"?e.length>t:(t=t.toLowerCase(),e.filter(n=>n.toLowerCase()===t).length!==0)}async getSigner(t){if(t==null&&(t=0),!await this.hasSigner(t))try{await this.#t("eth_requestAccounts",[])}catch(e){const n=e.payload;throw this.getRpcError(n,{id:n.id,error:e})}return await super.getSigner(t)}static async discover(t){if(t==null&&(t={}),t.provider)return new Cr(t.provider);const e=t.window?t.window:typeof window<"u"?window:null;if(e==null)return null;const n=t.anyProvider;if(n&&e.ethereum)return new Cr(e.ethereum);if(!("addEventListener"in e&&"dispatchEvent"in e&&"removeEventListener"in e))return null;const r=t.timeout?t.timeout:300;return r===0?null:await new Promise((s,a)=>{let o=[];const c=h=>{o.push(h.detail),n&&l()},l=()=>{if(clearTimeout(u),o.length)if(t&&t.filter){const h=t.filter(o.map(f=>Object.assign({},f.info)));if(h==null)s(null);else if(h instanceof Cr)s(h);else{let f=null;if(h.uuid&&(f=o.filter(g=>h.uuid===g.info.uuid)[0]),f){const{provider:d,info:g}=f;s(new Cr(d,void 0,{providerInfo:g}))}else a(Re("filter returned unknown info","UNSUPPORTED_OPERATION",{value:h}))}}else{const{provider:h,info:f}=o[0];s(new Cr(h,void 0,{providerInfo:f}))}else s(null);e.removeEventListener("eip6963:announceProvider",c)},u=setTimeout(()=>{l()},r);e.addEventListener("eip6963:announceProvider",c),e.dispatchEvent(new Event("eip6963:requestProvider"))})}}const j1=JSON.parse('[{"inputs":[{"internalType":"uint256","name":"initialMintPrice","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721IncorrectOwner","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721InsufficientApproval","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC721InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"ERC721InvalidOperator","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"ERC721InvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC721InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC721InvalidSender","type":"error"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ERC721NonexistentToken","type":"error"},{"inputs":[],"name":"EmptyVisualCode","type":"error"},{"inputs":[{"internalType":"uint256","name":"expected","type":"uint256"},{"internalType":"uint256","name":"received","type":"uint256"}],"name":"IncorrectMintPayment","type":"error"},{"inputs":[],"name":"InvalidContentHash","type":"error"},{"inputs":[],"name":"NotTokenController","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"inputs":[],"name":"TasteProfileTooLarge","type":"error"},{"inputs":[],"name":"VisualCodeTooLarge","type":"error"},{"inputs":[],"name":"WithdrawalFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_toTokenId","type":"uint256"}],"name":"BatchMetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"rendererVersion","type":"uint32"}],"name":"MemoryMinted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"rendererVersion","type":"uint32"}],"name":"MemoryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"MetadataUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"previousPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"MintPriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_TASTE_PROFILE_BYTES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_VISUAL_CODE_BYTES","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getMemory","outputs":[{"components":[{"internalType":"string","name":"visualCode","type":"string"},{"internalType":"string","name":"tasteProfile","type":"string"},{"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"internalType":"uint32","name":"rendererVersion","type":"uint32"},{"internalType":"uint64","name":"mintedAt","type":"uint64"},{"internalType":"uint64","name":"updatedAt","type":"uint64"}],"internalType":"struct PapagedonVisualMemory.VisualMemory","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"metadataUri","type":"string"},{"internalType":"string","name":"visualCode","type":"string"},{"internalType":"string","name":"tasteProfile","type":"string"},{"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"internalType":"uint32","name":"rendererVersion","type":"uint32"}],"name":"mintMemory","outputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"setMintPrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"string","name":"metadataUri","type":"string"},{"internalType":"string","name":"visualCode","type":"string"},{"internalType":"string","name":"tasteProfile","type":"string"},{"internalType":"bytes32","name":"contentHash","type":"bytes32"},{"internalType":"uint32","name":"rendererVersion","type":"uint32"}],"name":"updateMemory","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"recipient","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'),tT={abi:j1},Zu="0x279f",eT={chainId:Zu,chainName:"Monad Testnet",nativeCurrency:{name:"Monad",symbol:"MON",decimals:18},rpcUrls:[Ds.rpcUrl],blockExplorerUrls:[Ds.explorerUrl]};async function nT(i){if(await i.request({method:"eth_chainId"})!==Zu)try{await i.request({method:"wallet_switchEthereumChain",params:[{chainId:Zu}]})}catch(e){if(e.code!==4902)throw e;await i.request({method:"wallet_addEthereumChain",params:[eT]})}}async function ET(){const i=window.ethereum;if(!i)throw new Error("No browser wallet detected. Install or open an EVM wallet first.");await i.request({method:"eth_requestAccounts"}),await nT(i);const t=new Cr(i),e=await t.getSigner(),n=await e.getAddress(),r=await t.getBalance(n);return{provider:t,signer:e,address:n,balance:Dm(r)}}function iT({pack:i,sensitivity:t,autoMode:e,styleBrief:n}){const r=JSON.stringify({schema:"papagedon.visual.v1",rendererVersion:1,pack:{id:i.id,name:i.name,wave:i.wave,shaderMode:i.shaderMode,sceneMode:i.sceneMode??null,lift:i.lift,tilt:i.tilt,compression:i.compression,warp:i.warp,reflection:i.reflection,socket:i.socket,glowColor:i.glowColor??null},audioMapping:{bass:"surface-lift-and-impact",mids:"material-motion",treble:"edge-light-and-detail",sensitivity:t},playbackMode:e?"adaptive-auto":"manual"}),s=JSON.stringify({schema:"papagedon.taste.v1",styleBrief:n.trim(),preferredPack:i.id,preferredSensitivity:t,preferredMode:e?"auto":"manual"}),a=Ge(ii(`${r}\0${s}`)),o={name:`Papagedon Visual Memory: ${i.name}`,description:"A user-owned visual recipe and taste memory interpreted by Papagedon AEI.",external_url:"https://www.papagedon.com/monad",attributes:[{trait_type:"Renderer schema",value:"papagedon.visual.v1"},{trait_type:"Visual pack",value:i.name},{trait_type:"Wave system",value:i.wave},{trait_type:"Mode",value:e?"Adaptive Auto":"Manual"},{trait_type:"Renderer version",value:1}]};return{metadataUri:`data:application/json;base64,${sT(ii(JSON.stringify(o)))}`,visualCode:r,tasteProfile:s,contentHash:a,rendererVersion:1}}async function rT(i,t,e){const n=new ya(t,tT.abi,i),r=await n.mintPrice(),s=await n.mintMemory(e.metadataUri,e.visualCode,e.tasteProfile,e.contentHash,e.rendererVersion,{value:r}),a=await s.wait();let o=null;for(const c of a.logs)try{const l=n.interface.parseLog(c);l?.name==="MemoryMinted"&&(o=l.args.tokenId)}catch{}if(o===null)throw new Error("Mint succeeded but the token ID was not found.");return{tokenId:o,transactionHash:s.hash,mintPrice:Dm(r)}}function sT(i){let t="";for(const e of i)t+=String.fromCharCode(e);return btoa(t)}const aT={},oT=aT?.VITE_ENVIO_GRAPHQL_URL,cT=`
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
`;async function lT(i,t=oT){if(!t)return{configured:!1,memory:null};const e=await fetch(t,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({query:cT,variables:{owner:i.toLowerCase()}})}),n=await e.json();if(!e.ok||n.errors)throw new Error(n.errors?.[0]?.message||"Envio memory lookup failed.");return{configured:!0,memory:n.data?.VisualMemory?.[0]||null}}const uT={},hT=uT?.VITE_NANSEN_PROFILE_URL||"/api/integrations/nansen-profile";async function fT(i,t=hT){const e=await fetch(`${t}?address=${encodeURIComponent(i)}`,{headers:{accept:"application/json"}});if(!e.ok){const n=await e.json().catch(()=>({}));throw new Error(n.message||`Nansen profile request failed (${e.status}).`)}return e.json()}const dT=document.querySelector("#app"),pT=[["Surface packs",Un.filter(i=>!i.sceneMode)],["3D scenes",Un.filter(i=>i.sceneMode)]].map(([i,t])=>`<optgroup label="${i}">${t.map(e=>`<option value="${e.id}">${e.name}</option>`).join("")}</optgroup>`).join("");dT.innerHTML=`
  <div id="brandIntro" class="brand-intro" aria-label="Papagedon opening animation">
    <div class="brand-intro__aura" aria-hidden="true"></div>
    <div class="brand-intro__stage">
      <img class="brand-intro__logo" src="/monad/assets/papagedon-intro-logo.png" alt="Papagedon" />
      <div class="brand-intro__line" aria-hidden="true"></div>
    </div>
  </div>
  <section class="shell">
    <canvas id="visualizer" aria-label="Papagedon live music visualizer"></canvas>
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
        <span>Network</span><b>${Ds.name}</b>
      </div>

      <div class="pack-switch">
        <label for="packSelect">Visual Pack</label>
        <select id="packSelect">${pT}</select>
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
        <p id="walletConnectionState" class="wallet-connection-state" role="status" aria-live="polite">Wallet not connected</p>
        <button id="deployContractButton" type="button" disabled>Deployed</button>
        <button id="mintMemoryButton" class="mint-action" type="button" disabled>Mint Visual Memory · 0.2 MON</button>
        <p id="chainOutput" role="status">Contract: ${Ds.visualMemoryContract}</p>
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
`;const mT=document.querySelector("#visualizer"),oa=document.querySelector("#brandIntro"),Hh=fA(mT),Sn=document.querySelector("#trackAudio"),yi=R0(Sn),xa=document.querySelector("#listenButton"),Gr=document.querySelector("#listenState"),gT=document.querySelector("#musicLock"),Tp=document.querySelector("#impactState"),yT=document.querySelector("#packState"),Vi=document.querySelector("#packSelect"),zo=document.querySelector("#trackFile"),xT=document.querySelector("#selectTrackButton"),Hr=document.querySelector("#playTrackButton"),Bi=document.querySelector("#trackState"),$u=document.querySelector("#trackName"),Dr=document.querySelector("#trackSeek"),h0=document.querySelector("#trackTime"),f0=document.querySelector("#trackDuration"),_T=document.querySelector("#quoteButton"),vT=document.querySelector("#quoteOutput"),hc=document.querySelector("#packPrompt"),Vo=document.querySelector("#sensitivity"),bT=document.querySelector("#sensitivityValue"),d0=document.querySelector("#autoModeButton"),p0=document.querySelector("#manualModeButton"),wT=document.querySelector("#deployContractButton"),da=document.querySelector("#mintMemoryButton"),Fr=document.querySelector("#chainOutput"),_a=document.querySelector("#walletConnectionState"),zh=document.querySelector("#dynamicStatus"),AT=document.querySelector("#alchemyStatus"),Cp=document.querySelector("#envioStatus"),Rp=document.querySelector("#nansenStatus"),Pp=document.querySelector("#dynamicWalletRoot"),Vh=mA(Un);let ju=null;function MT(){oa&&(oa.classList.add("is-complete"),oa.addEventListener("transitionend",()=>oa.remove(),{once:!0}),window.setTimeout(()=>oa.remove(),900))}window.setTimeout(MT,window.matchMedia("(prefers-reduced-motion: reduce)").matches?500:3300);const Po={bass:document.querySelector("#bassMeter"),mid:document.querySelector("#midMeter"),treble:document.querySelector("#trebleMeter"),energy:document.querySelector("#energyMeter")};let va=!1,Ip=-1e3,Np=0,Wh=!0;Vh.start(performance.now(),Vi.value);Vo.addEventListener("input",()=>{yi.setSensitivity(Vo.value),bT.value=`${Number(Vo.value).toFixed(1)}x`});function Uc(i){Wh=i,d0.setAttribute("aria-pressed",String(i)),p0.setAttribute("aria-pressed",String(!i)),i&&Vh.start(performance.now(),Vi.value)}function Dc(i){Vi.value=i;const t=Hh.setVariant(i);yT.textContent=t.name}d0.addEventListener("click",()=>Uc(!0));p0.addEventListener("click",()=>Uc(!1));Vi.addEventListener("change",()=>{Uc(!1),Dc(Vi.value)});window.addEventListener("keydown",i=>{if(!["ArrowLeft","ArrowRight"].includes(i.key)||i.altKey||i.ctrlKey||i.metaKey||i.target instanceof Element&&i.target.closest("input, textarea, select, [contenteditable]"))return;i.preventDefault();const t=Un.findIndex(r=>r.id===Vi.value),e=i.key==="ArrowRight"?1:-1,n=Un[(t+e+Un.length)%Un.length];Uc(!1),Dc(n.id)});function Lp(i){if(!Number.isFinite(i))return"0:00";const t=Math.floor(i);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Fc(){const i=Sn.duration;h0.textContent=Lp(Sn.currentTime),f0.textContent=Lp(i),Dr.disabled=!Number.isFinite(i)||i<=0,Dr.matches(":active")||(Dr.value=Dr.disabled?0:Math.round(Sn.currentTime/i*1e3))}function Io(i,t){i.style.setProperty("--value",`${Math.round(t*100)}%`)}function m0(){const i=yi.sample();if(Wh){const e=Vh.maybeNext(performance.now(),i.beat,Vi.value);e&&Dc(e)}Hh.render(i),Io(Po.bass,i.bass),Io(Po.mid,i.mid),Io(Po.treble,i.treble),Io(Po.energy,i.energy),gT.textContent=i.musicDetected?"active":"waiting",i.beat>.72&&Np<=.72&&(Ip=performance.now()),Np=i.beat;const t=performance.now()-Ip<210;Tp.textContent=t?"hit":"ready",Tp.classList.toggle("active",t),requestAnimationFrame(m0)}xa.addEventListener("click",async()=>{if(va){await yi.stop(),va=!1,xa.textContent="Start Microphone",Gr.textContent="idle",Bi.textContent=Sn.src?"ready":"none";return}yi.pauseFile(),Hr.textContent="Play";try{await yi.start(),va=!0,xa.textContent="Stop Microphone",Gr.textContent="microphone",Bi.textContent=Sn.src?"paused":"none"}catch{Gr.textContent="mic unavailable",Bi.textContent=Sn.src?"ready":"none"}});xT.addEventListener("click",()=>zo.click());zo.addEventListener("change",async()=>{const i=zo.files?.[0];if(i){try{await yi.loadFile(i),va=!1,xa.textContent="Start Microphone",Gr.textContent="idle",Bi.textContent="ready",$u.textContent=i.name,Hr.disabled=!1,Hr.textContent="Play",Dr.value=0,h0.textContent="0:00",f0.textContent="0:00"}catch(t){Bi.textContent="error",$u.textContent=t.message}zo.value=""}});Hr.addEventListener("click",async()=>{if(!Sn.paused){yi.pauseFile(),Hr.textContent="Play",Bi.textContent="paused",Gr.textContent="idle";return}try{await yi.playFile(),va=!1,xa.textContent="Start Microphone",Hr.textContent="Pause",Bi.textContent="playing",Gr.textContent="track"}catch(i){Bi.textContent="error",$u.textContent=i.message}});Dr.addEventListener("input",()=>{Number.isFinite(Sn.duration)&&(Sn.currentTime=Sn.duration*Number(Dr.value)/1e3,Fc())});Sn.addEventListener("timeupdate",Fc);Sn.addEventListener("loadedmetadata",Fc);Sn.addEventListener("ended",()=>{yi.pauseFile(),Hr.textContent="Play",Bi.textContent="ready",Gr.textContent="idle",Fc()});window.addEventListener("pagehide",()=>{yi.dispose()});_T.addEventListener("click",()=>{const i=yA(hc.value);vT.textContent=`Preview: ${i.price} testnet MON for "${i.packName}". No payment is being requested.`});async function g0(i){ju=i;const t=`${i.address.slice(0,6)}...${i.address.slice(-4)}`;da.disabled=!1,_a.textContent=`Wallet Connected · ${t}`,_a.classList.add("is-connected"),zh.textContent="wallet connected",AT.textContent=`${Number(i.balance).toFixed(3)} MON`,Fr.textContent=`Wallet connected. Restoring onchain Visual DNA for ${t}...`;const[e,n]=await Promise.allSettled([lT(i.address),fT(i.address)]);if(e.status==="fulfilled"){const{configured:r,memory:s}=e.value;Cp.textContent=r?s?`memory #${s.id}`:"new identity":"add endpoint"}else Cp.textContent="unavailable";if(n.status==="fulfilled"){const r=n.value.visualDNA;Rp.textContent=`${n.value.labels.length} signals`,r?.preferredPack&&Un.some(s=>s.id===r.preferredPack)&&(Vi.value=r.preferredPack,Dc(r.preferredPack)),r?.styleBrief&&(hc.value=r.styleBrief)}else Rp.textContent="add API key";_a.textContent=`Wallet Connected · ${t}`,Fr.textContent=`Wallet connected. Envio memory and Nansen Visual DNA sync completed for ${t}.`}function y0(i){zh.textContent="error",_a.textContent="Wallet not connected",_a.classList.remove("is-connected"),Fr.textContent=i.shortMessage||i.message}zh.textContent="needs env ID";document.querySelector("#connectWalletButton").addEventListener("click",async()=>{Pp.innerHTML='<span class="wallet-loading">Loading secure wallet...</span>';const{mountDynamicWallet:i}=await T0(async()=>{const{mountDynamicWallet:t}=await import("./wallet-bridge-BflYxYe-.js").then(e=>e.ed);return{mountDynamicWallet:t}},[]);i(Pp,{onSession:g0,onError:y0,autoOpen:!0})});window.addEventListener("papagedon:wallet-session",async i=>{try{await g0(i.detail)}catch(t){y0(t)}});wT.addEventListener("click",async()=>{});da.addEventListener("click",async()=>{if(!ju)return;const i=hc.value.trim();if(!i){Fr.textContent="Describe your visual taste before minting.",hc.focus();return}const t=Un.find(n=>n.id===Vi.value),e=iT({pack:t,sensitivity:Number(Vo.value),autoMode:Wh,styleBrief:i});da.disabled=!0,Fr.textContent="Confirm the 0.2 testnet MON mint in your wallet...";try{const n=await rT(ju.signer,Ds.visualMemoryContract,e);da.textContent=`Minted Memory #${n.tokenId}`,Fr.textContent=`Visual Memory #${n.tokenId} minted. Transaction: ${n.transactionHash}`}catch(n){da.disabled=!1,Fr.textContent=n.shortMessage||n.message}});Hh.resize();m0();export{T0 as _,ET as c};
