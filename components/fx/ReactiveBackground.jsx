"use client";

import { useEffect, useRef, useState } from "react";
import { Renderer, Triangle, Program, Mesh, Vec2 } from "ogl";

// Campo reativo em WebGL: ruído grafite em movimento lento + bloom vermelho
// que segue o ponteiro e reage à velocidade do scroll. Cai pra gradiente
// estático em prefers-reduced-motion ou se o WebGL falhar.

const FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uRes;
uniform vec2 uPointer;   // 0..1
uniform float uScroll;   // velocidade do scroll normalizada
uniform float uActive;   // 0..1 (fade in do bloom)

// simplex noise 2D — Ashima / Stefan Gustavson
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p){
  float f = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 5; i++){
    f += amp * snoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return f;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float aspect = uRes.x / uRes.y;
  vec2 p = uv;
  p.x *= aspect;

  float t = uTime * 0.02;

  // domain warp lento
  vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 5.2));
  float n = fbm(p * 2.1 + q * 0.9 + vec2(0.0, t * 0.6));
  n = n * 0.5 + 0.5;

  // base grafite quase preta
  float base = mix(0.011, 0.05, smoothstep(0.35, 0.9, n));
  vec3 col = vec3(base);
  col.r += base * 0.12; // leve calor pro preto não ficar azulado

  // veios vermelhos muito sutis onde o ruído concentra
  float veins = smoothstep(0.82, 0.99, n + uScroll * 0.12);
  col += vec3(0.55, 0.09, 0.13) * veins * 0.08;

  // bloom que segue o ponteiro
  vec2 ptr = uPointer;
  ptr.x *= aspect;
  float d = distance(p, ptr);
  float bloom = exp(-d * 3.6) * (0.055 + uScroll * 0.22);
  col += vec3(0.89, 0.16, 0.24) * bloom * uActive;

  // brilho de topo (nasce da headline)
  float top = exp(-uv.y * 2.8) * 0.03;
  col += vec3(0.8, 0.12, 0.18) * top;

  // vinheta
  float vig = smoothstep(1.15, 0.35, distance(uv, vec2(0.5)));
  col *= mix(0.55, 1.0, vig);

  // grão temporal leve pra matar banding
  float grain = fract(sin(dot(gl_FragCoord.xy + uTime, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.015;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export default function ReactiveBackground() {
  const wrapRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFailed(true);
      return;
    }

    const wrap = wrapRef.current;
    let renderer, program, mesh, raf;
    let disposed = false;

    try {
      renderer = new Renderer({
        alpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0.02, 0.02, 0.024, 1);
    wrap.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new Vec2(1, 1) },
        uPointer: { value: new Vec2(0.5, 0.35) },
        uScroll: { value: 0 },
        uActive: { value: 0 },
      },
    });
    mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uRes.value.set(gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ponteiro suavizado
    const target = { x: 0.5, y: 0.35 };
    const current = { x: 0.5, y: 0.35 };
    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // velocidade de scroll
    let lastScroll = window.scrollY;
    let scrollVel = 0;
    const onScroll = () => {
      const v = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      scrollVel = Math.min(1, scrollVel + v / 90);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let visible = true;
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const start = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || disposed) return;

      const time = (now - start) / 1000;
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      scrollVel *= 0.92;

      program.uniforms.uTime.value = time;
      program.uniforms.uPointer.value.set(current.x, current.y);
      program.uniforms.uScroll.value = scrollVel;
      program.uniforms.uActive.value = Math.min(1, time / 1.2);

      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
      try {
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        gl.canvas.remove();
      } catch {}
    };
  }, []);

  return (
    <div className="bg-field" ref={wrapRef} aria-hidden="true">
      {failed && <div className="bg-field__fallback" />}
    </div>
  );
}
