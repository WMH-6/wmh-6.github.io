import{T as G,A as ht,_ as N}from"./index-D4id0EEv.js";const T=24,kt=Math.PI*2,Ct=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,qt=`#version 300 es
precision highp float;
uniform vec2 uCenter;
uniform vec2 uHalf;
uniform float uRadius;
uniform float uPx;
uniform float uSpot;
uniform vec2 uEntry;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform vec2 uWindow;
uniform float uThickness;
uniform float uGlow;
out vec4 outColor;

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float loopPosition(vec2 p, vec2 b, float r) {
  vec2 inner = b - r;
  float arc = 1.5707963 * r;
  float quarter = inner.x + inner.y + arc;
  vec2 a = abs(p);
  vec2 q = a - inner;
  float s = q.x > 0.0 && q.y > 0.0
    ? inner.y + atan(q.y, q.x) * r
    : (q.x > q.y ? min(a.y, inner.y) : inner.y + arc + inner.x - min(a.x, inner.x));
  if (p.x < 0.0) s = p.y >= 0.0 ? 2.0 * quarter - s : 2.0 * quarter + s;
  else if (p.y < 0.0) s = 4.0 * quarter - s;
  return s / max(4.0 * quarter, 0.0001);
}

float lobe(float position, float center) {
  float gap = abs(fract(position - center + 0.5) - 0.5);
  return 1.0 - smoothstep(uWindow.x, uWindow.x + uWindow.y, gap);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = roundedBox(p, uHalf, uRadius);
  float position = loopPosition(p, uHalf, uRadius);
  float key = lobe(position, uSpot);
  float back = lobe(position, uSpot + 0.5);
  float streak = key + back * 0.45;
  float width = max(uThickness * uPx * mix(1.0, max(key, back), 0.6), 0.35);
  float band = smoothstep(-width - 0.6, -width + 0.6, d) * (1.0 - smoothstep(-0.6, 0.6, d));
  float hair = smoothstep(-uPx - 0.6, -uPx + 0.6, d) * (1.0 - smoothstep(-0.6, 0.6, d));
  float inside = 1.0 - smoothstep(-0.6, 0.6, d);
  vec2 pool = (p - uEntry) / (uHalf.y * vec2(1.6, 1.1));
  float glow = streak * 0.2 * exp(-abs(d + width * 0.5) / (5.0 * uPx)) + inside * 0.08 * exp(-dot(pool, pool));
  float light = clamp((band * streak + glow * uGlow) * uIntensity, 0.0, 1.0);
  vec4 base = vec4(uBaseColor, 1.0) * hair * 0.6;
  outColor = vec4(uLineColor, 1.0) * light + base * (1.0 - light);
}`,Lt=["uCenter","uHalf","uRadius","uPx","uSpot","uEntry","uLineColor","uBaseColor","uIntensity","uWindow","uThickness","uGlow"],$=(o,u,f)=>Math.min(f,Math.max(u,o)),_=o=>o-Math.floor(o),mt=(o,u,f,r,y)=>{const p=f-y,w=r-y,v=Math.PI/2*y,i=p+w+v,R=Math.abs(o),E=Math.abs(u),g=R-p,A=E-w;let d;return g>0&&A>0?d=w+Math.atan2(A,g)*y:g>A?d=Math.min(E,w):d=w+v+p-Math.min(R,p),o<0?d=u>=0?2*i-d:2*i+d:u<0&&(d=4*i-d),_(d/Math.max(4*i,1e-4))},Tt=(o,u,f,r)=>{const y=u-r,p=f-r,w=Math.PI/2*r,v=y+p+w;let i=_(o)*4*v,R=1,E=1;i>3*v?(i=4*v-i,E=-1):i>2*v?(i-=2*v,R=-1,E=-1):i>v&&(i=2*v-i,R=-1);let g=y-(i-p-w),A=f;if(i<=p)g=u,A=i;else if(i<=p+w){const d=(i-p)/Math.max(r,1e-4);g=y+Math.cos(d)*r,A=p+Math.sin(d)*r}return[g*R,A*E]},pt=(o,u,f)=>{const r=o.createShader(u);return r?(o.shaderSource(r,f),o.compileShader(r),o.getShaderParameter(r,o.COMPILE_STATUS)?r:(o.deleteShader(r),null)):null},It=o=>{const u=pt(o,o.VERTEX_SHADER,Ct),f=pt(o,o.FRAGMENT_SHADER,qt),r=o.createProgram();return!u||!f||!r?null:(o.attachShader(r,u),o.attachShader(r,f),o.bindAttribLocation(r,0,"aPosition"),o.linkProgram(r),o.deleteShader(u),o.deleteShader(f),o.getProgramParameter(r,o.LINK_STATUS)?r:(o.deleteProgram(r),null))},_t=({children:o="Get Started",size:u="lg",radius:f=18,tint:r="#ffffff",tintOpacity:y=.04,blur:p=0,textColor:w="#f5f5f5",lineColor:v="#ffffff",baseColor:i="#525252",intensity:R=1,idleIntensity:E=.35,shineSize:g=10,shineFade:A=34,thickness:d=1.2,glow:xt=1,speed:vt=.35,followMouse:wt=!0,proximity:bt=250,autoAnimate:yt=!1,disabled:K=!1,onClick:Mt,className:Q="",type:gt="button",style:At,...St})=>{const j=G(null),J=G(null),O=G(null),Z={radius:Math.max(0,f),lineColor:String(v),baseColor:String(i),intensity:Math.max(0,R),idleIntensity:$(E,0,1),shineSize:Math.max(0,g),shineFade:Math.max(0,A),thickness:Math.max(0,d),glow:Math.max(0,xt),speed:vt,followMouse:wt,proximity:Math.max(1,bt),autoAnimate:yt,disabled:K},B=G(Z);return B.current=Z,ht(()=>{const P=j.current,k=J.current,e=k?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!P||!k||!e)return;const H=It(e);if(!H)return;const x={};for(const t of Lt)x[t]=e.getUniformLocation(H,t);const tt=e.createBuffer(),U=e.createVertexArray();e.bindVertexArray(U),e.bindBuffer(e.ARRAY_BUFFER,tt),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindVertexArray(null);const L=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),Rt=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,W=new Map,c={width:1,height:1,ratio:1},b={x:0,y:0,known:!1},a={spot:0,level:0,press:0,ready:!1};let I=0,F=0,V=!0;const et=t=>{if(W.has(t))return W.get(t);let n=[1,1,1];if(L){L.clearRect(0,0,1,1),L.fillStyle="#000000",L.fillStyle=t,L.fillRect(0,0,1,1);const[s,l,h]=L.getImageData(0,0,1,1).data;n=[s/255,l/255,h/255]}return W.set(t,n),n},nt=t=>Math.min(t.radius,c.width/2,c.height/2),z=t=>{const n=nt(t),s=n*(1-Math.SQRT1_2);return mt(s-c.width/2,c.height/2-s,c.width/2,c.height/2,n)},Et=t=>{if(!t.followMouse||t.disabled||!b.known)return null;const n=P.getBoundingClientRect(),s=n.width/c.width||1,l=c.width/2,h=c.height/2,M=(b.x-n.left-n.width/2)/s,m=(n.top+n.height/2-b.y)/s,S=Math.hypot(Math.max(Math.abs(M)-l,0),Math.max(Math.abs(m)-h,0)),q=$(1-S/t.proximity,0,1),ft=q*q*(3-2*q),Y=mt(M,m,l,h,nt(t));if(S>0)return{spot:Y,near:ft};const D=$(Math.min(l-Math.abs(M),h-Math.abs(m))/(h*.8),0,1),dt=z(t)-M/l*.06-m/h*.02,Pt=dt-Y-Math.round(dt-Y);return{spot:_(Y+Pt*D*D*(3-2*D)),near:ft}},ot=t=>{const{width:n,height:s}=c,l=k.width/(n+T*2),h=k.height/(s+T*2);e.viewport(0,0,k.width,k.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(H),e.uniform2f(x.uCenter,(T+n/2)*l,(T+s/2)*h),e.uniform2f(x.uHalf,n/2*l,s/2*h),e.uniform1f(x.uRadius,Math.min(t.radius,n/2,s/2)*l),e.uniform1f(x.uPx,c.ratio);const M=Math.min(t.radius,n/2,s/2),[m,S]=Tt(a.spot,n/2,s/2,M),q=1-Math.min(.35*(s/2),Math.hypot(m,S))/Math.max(Math.hypot(m,S),1e-4);e.uniform1f(x.uSpot,a.spot),e.uniform2f(x.uEntry,m*q*l,S*q*h),e.uniform3fv(x.uLineColor,et(t.lineColor)),e.uniform3fv(x.uBaseColor,et(t.baseColor)),e.uniform1f(x.uIntensity,t.intensity*(a.level+a.press*.8)),e.uniform2f(x.uWindow,t.shineSize/360+a.press*.06,t.shineFade/360+1e-4),e.uniform1f(x.uThickness,t.thickness),e.uniform1f(x.uGlow,t.glow),e.bindVertexArray(U),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)},rt=t=>{if(I=0,!V)return;const n=B.current,s=F?Math.min(.05,(t-F)/1e3):1/60;F=t;const l=Et(n),h=n.autoAnimate&&!Rt,M=!!l&&l.near>0;a.ready||(a.spot=z(n),a.level=n.autoAnimate?1:n.idleIntensity,a.ready=!0);let m=0;h&&!M?a.spot=_(a.spot+n.speed/kt*s):(m=(M?l.spot:z(n))-a.spot,m-=Math.round(m),a.spot=_(a.spot+m*(1-Math.exp(-s*8))));const S=n.autoAnimate?1:n.idleIntensity+(1-n.idleIntensity)*(l?l.near:0);a.level+=(S-a.level)*(1-Math.exp(-s*7)),a.press*=Math.exp(-s*5),ot(n),Math.abs(m)>2e-4||Math.abs(S-a.level)>.001||a.press>.002||h&&!M?I=requestAnimationFrame(rt):F=0},C=()=>{!I&&V&&(I=requestAnimationFrame(rt))},at=t=>{const n=t?.borderBoxSize?.[0];c.width=Math.max(1,n?n.inlineSize:P.offsetWidth),c.height=Math.max(1,n?n.blockSize:P.offsetHeight),c.ratio=Math.min(window.devicePixelRatio||1,3),k.width=Math.max(1,Math.round((c.width+T*2)*c.ratio)),k.height=Math.max(1,Math.round((c.height+T*2)*c.ratio)),a.ready&&ot(B.current),C()},it=t=>{b.x=t.clientX,b.y=t.clientY,b.known=!0,C()},st=t=>{b.x=t.clientX,b.y=t.clientY,b.known=!0,B.current.disabled||(a.press=1),C()},X=t=>{t.pointerType!=="mouse"&&(b.known=!1,C())},ct=()=>{b.known=!1,C()},lt=new ResizeObserver(t=>at(t[t.length-1]));lt.observe(P);const ut=new IntersectionObserver(t=>{V=t.some(n=>n.isIntersecting),V&&(F=0,C())});return ut.observe(P),window.addEventListener("pointermove",it,{passive:!0}),window.addEventListener("pointerup",X,{passive:!0}),window.addEventListener("pointercancel",X,{passive:!0}),document.documentElement.addEventListener("pointerleave",ct),P.addEventListener("pointerdown",st),at(),O.current=C,()=>{cancelAnimationFrame(I),O.current=null,lt.disconnect(),ut.disconnect(),window.removeEventListener("pointermove",it),window.removeEventListener("pointerup",X),window.removeEventListener("pointercancel",X),document.documentElement.removeEventListener("pointerleave",ct),P.removeEventListener("pointerdown",st),e.deleteBuffer(tt),e.deleteVertexArray(U),e.deleteProgram(H)}},[]),ht(()=>{O.current?.()}),N.createElement("button",{ref:j,type:gt,disabled:K,onClick:Mt,className:`specular-button specular-button--${u}${Q?` ${Q}`:""}`,style:{"--sb-radius":`${f}px`,"--sb-tint":r,"--sb-tint-opacity":y,"--sb-blur":`${p}px`,"--sb-text-color":w,...At},...St},N.createElement("canvas",{ref:J,className:"specular-button__light","aria-hidden":"true"}),N.createElement("span",{className:"specular-button__label"},o))};export{_t as default};
