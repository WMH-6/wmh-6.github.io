import{r as I,R as N}from"./index-AzMheu8t.js";const T=24,Pe=Math.PI*2,ke=`#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,Ce=`#version 300 es
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
}`,qe=["uCenter","uHalf","uRadius","uPx","uSpot","uEntry","uLineColor","uBaseColor","uIntensity","uWindow","uThickness","uGlow"],$=(o,u,f)=>Math.min(f,Math.max(u,o)),_=o=>o-Math.floor(o),he=(o,u,f,r,y)=>{const p=f-y,w=r-y,v=Math.PI/2*y,i=p+w+v,S=Math.abs(o),A=Math.abs(u),g=S-p,R=A-w;let d;return g>0&&R>0?d=w+Math.atan2(R,g)*y:g>R?d=Math.min(A,w):d=w+v+p-Math.min(S,p),o<0?d=u>=0?2*i-d:2*i+d:u<0&&(d=4*i-d),_(d/Math.max(4*i,1e-4))},Le=(o,u,f,r)=>{const y=u-r,p=f-r,w=Math.PI/2*r,v=y+p+w;let i=_(o)*4*v,S=1,A=1;i>3*v?(i=4*v-i,A=-1):i>2*v?(i-=2*v,S=-1,A=-1):i>v&&(i=2*v-i,S=-1);let g=y-(i-p-w),R=f;if(i<=p)g=u,R=i;else if(i<=p+w){const d=(i-p)/Math.max(r,1e-4);g=y+Math.cos(d)*r,R=p+Math.sin(d)*r}return[g*S,R*A]},me=(o,u,f)=>{const r=o.createShader(u);return r?(o.shaderSource(r,f),o.compileShader(r),o.getShaderParameter(r,o.COMPILE_STATUS)?r:(o.deleteShader(r),null)):null},Ie=o=>{const u=me(o,o.VERTEX_SHADER,ke),f=me(o,o.FRAGMENT_SHADER,Ce),r=o.createProgram();return!u||!f||!r?null:(o.attachShader(r,u),o.attachShader(r,f),o.bindAttribLocation(r,0,"aPosition"),o.linkProgram(r),o.deleteShader(u),o.deleteShader(f),o.getProgramParameter(r,o.LINK_STATUS)?r:(o.deleteProgram(r),null))},Fe=({children:o="Get Started",size:u="lg",radius:f=18,tint:r="#ffffff",tintOpacity:y=.04,blur:p=0,textColor:w="#f5f5f5",lineColor:v="#ffffff",baseColor:i="#525252",intensity:S=1,idleIntensity:A=.35,shineSize:g=10,shineFade:R=34,thickness:d=1.2,glow:pe=1,speed:xe=.35,followMouse:ve=!0,proximity:we=250,autoAnimate:be=!1,disabled:K=!1,onClick:ye,className:Q="",type:Me="button",style:ge,...Re})=>{const j=I.useRef(null),J=I.useRef(null),O=I.useRef(null),Z={radius:Math.max(0,f),lineColor:String(v),baseColor:String(i),intensity:Math.max(0,S),idleIntensity:$(A,0,1),shineSize:Math.max(0,g),shineFade:Math.max(0,R),thickness:Math.max(0,d),glow:Math.max(0,pe),speed:xe,followMouse:ve,proximity:Math.max(1,we),autoAnimate:be,disabled:K},H=I.useRef(Z);return H.current=Z,I.useEffect(()=>{const P=j.current,k=J.current,t=k?.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!P||!k||!t)return;const V=Ie(t);if(!V)return;const x={};for(const e of qe)x[e]=t.getUniformLocation(V,e);const ee=t.createBuffer(),U=t.createVertexArray();t.bindVertexArray(U),t.bindBuffer(t.ARRAY_BUFFER,ee),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindVertexArray(null);const L=document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),Ee=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,W=new Map,c={width:1,height:1,ratio:1},b={x:0,y:0,known:!1},a={spot:0,level:0,press:0,ready:!1};let F=0,B=0,X=!0;const te=e=>{if(W.has(e))return W.get(e);let n=[1,1,1];if(L){L.clearRect(0,0,1,1),L.fillStyle="#000000",L.fillStyle=e,L.fillRect(0,0,1,1);const[s,l,h]=L.getImageData(0,0,1,1).data;n=[s/255,l/255,h/255]}return W.set(e,n),n},ne=e=>Math.min(e.radius,c.width/2,c.height/2),z=e=>{const n=ne(e),s=n*(1-Math.SQRT1_2);return he(s-c.width/2,c.height/2-s,c.width/2,c.height/2,n)},Se=e=>{if(!e.followMouse||e.disabled||!b.known)return null;const n=P.getBoundingClientRect(),s=n.width/c.width||1,l=c.width/2,h=c.height/2,M=(b.x-n.left-n.width/2)/s,m=(n.top+n.height/2-b.y)/s,E=Math.hypot(Math.max(Math.abs(M)-l,0),Math.max(Math.abs(m)-h,0)),q=$(1-E/e.proximity,0,1),fe=q*q*(3-2*q),G=he(M,m,l,h,ne(e));if(E>0)return{spot:G,near:fe};const D=$(Math.min(l-Math.abs(M),h-Math.abs(m))/(h*.8),0,1),de=z(e)-M/l*.06-m/h*.02,Ae=de-G-Math.round(de-G);return{spot:_(G+Ae*D*D*(3-2*D)),near:fe}},oe=e=>{const{width:n,height:s}=c,l=k.width/(n+T*2),h=k.height/(s+T*2);t.viewport(0,0,k.width,k.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(V),t.uniform2f(x.uCenter,(T+n/2)*l,(T+s/2)*h),t.uniform2f(x.uHalf,n/2*l,s/2*h),t.uniform1f(x.uRadius,Math.min(e.radius,n/2,s/2)*l),t.uniform1f(x.uPx,c.ratio);const M=Math.min(e.radius,n/2,s/2),[m,E]=Le(a.spot,n/2,s/2,M),q=1-Math.min(.35*(s/2),Math.hypot(m,E))/Math.max(Math.hypot(m,E),1e-4);t.uniform1f(x.uSpot,a.spot),t.uniform2f(x.uEntry,m*q*l,E*q*h),t.uniform3fv(x.uLineColor,te(e.lineColor)),t.uniform3fv(x.uBaseColor,te(e.baseColor)),t.uniform1f(x.uIntensity,e.intensity*(a.level+a.press*.8)),t.uniform2f(x.uWindow,e.shineSize/360+a.press*.06,e.shineFade/360+1e-4),t.uniform1f(x.uThickness,e.thickness),t.uniform1f(x.uGlow,e.glow),t.bindVertexArray(U),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)},re=e=>{if(F=0,!X)return;const n=H.current,s=B?Math.min(.05,(e-B)/1e3):1/60;B=e;const l=Se(n),h=n.autoAnimate&&!Ee,M=!!l&&l.near>0;a.ready||(a.spot=z(n),a.level=n.autoAnimate?1:n.idleIntensity,a.ready=!0);let m=0;h&&!M?a.spot=_(a.spot+n.speed/Pe*s):(m=(M?l.spot:z(n))-a.spot,m-=Math.round(m),a.spot=_(a.spot+m*(1-Math.exp(-s*8))));const E=n.autoAnimate?1:n.idleIntensity+(1-n.idleIntensity)*(l?l.near:0);a.level+=(E-a.level)*(1-Math.exp(-s*7)),a.press*=Math.exp(-s*5),oe(n),Math.abs(m)>2e-4||Math.abs(E-a.level)>.001||a.press>.002||h&&!M?F=requestAnimationFrame(re):B=0},C=()=>{!F&&X&&(F=requestAnimationFrame(re))},ae=e=>{const n=e?.borderBoxSize?.[0];c.width=Math.max(1,n?n.inlineSize:P.offsetWidth),c.height=Math.max(1,n?n.blockSize:P.offsetHeight),c.ratio=Math.min(window.devicePixelRatio||1,3),k.width=Math.max(1,Math.round((c.width+T*2)*c.ratio)),k.height=Math.max(1,Math.round((c.height+T*2)*c.ratio)),a.ready&&oe(H.current),C()},ie=e=>{b.x=e.clientX,b.y=e.clientY,b.known=!0,C()},se=e=>{b.x=e.clientX,b.y=e.clientY,b.known=!0,H.current.disabled||(a.press=1),C()},Y=e=>{e.pointerType!=="mouse"&&(b.known=!1,C())},ce=()=>{b.known=!1,C()},le=new ResizeObserver(e=>ae(e[e.length-1]));le.observe(P);const ue=new IntersectionObserver(e=>{X=e.some(n=>n.isIntersecting),X&&(B=0,C())});return ue.observe(P),window.addEventListener("pointermove",ie,{passive:!0}),window.addEventListener("pointerup",Y,{passive:!0}),window.addEventListener("pointercancel",Y,{passive:!0}),document.documentElement.addEventListener("pointerleave",ce),P.addEventListener("pointerdown",se),ae(),O.current=C,()=>{cancelAnimationFrame(F),O.current=null,le.disconnect(),ue.disconnect(),window.removeEventListener("pointermove",ie),window.removeEventListener("pointerup",Y),window.removeEventListener("pointercancel",Y),document.documentElement.removeEventListener("pointerleave",ce),P.removeEventListener("pointerdown",se),t.deleteBuffer(ee),t.deleteVertexArray(U),t.deleteProgram(V)}},[]),I.useEffect(()=>{O.current?.()}),N.createElement("button",{ref:j,type:Me,disabled:K,onClick:ye,className:`specular-button specular-button--${u}${Q?` ${Q}`:""}`,style:{"--sb-radius":`${f}px`,"--sb-tint":r,"--sb-tint-opacity":y,"--sb-blur":`${p}px`,"--sb-text-color":w,...ge},...Re},N.createElement("canvas",{ref:J,className:"specular-button__light","aria-hidden":"true"}),N.createElement("span",{className:"specular-button__label"},o))};export{Fe as default};
