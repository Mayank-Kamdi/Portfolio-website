import { useEffect, useRef } from 'react';

interface LiquidPortraitProps {
  imageSrc: string;
}

export const LiquidPortrait = ({ imageSrc }: LiquidPortraitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // --- Shaders ---
    const vsSource = `
      attribute vec4 aPosition;
      attribute vec2 aUv;
      varying vec2 vUv;
      uniform vec2 uMouse;
      void main() {
        // Parallax effect: shift slightly based on mouse
        vec4 pos = aPosition;
        pos.xy += (uMouse - 0.5) * 0.05; 
        gl_Position = pos;
        vUv = aUv;
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float uTime;
      uniform vec2 uMouse;

      // Pseudo-random function for noise
      float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 n) {
        const vec2 d = vec2(0.0, 1.0);
        vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
        return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
      }

      void main() {
        vec2 uv = vUv;
        
        // Vertical liquid displacement (Waterfall effect)
        // We use uTime to scroll the noise vertically
        float displacement = noise(vec2(uv.x * 15.0, uv.y * 5.0 + uTime * 2.0)) * 0.02;
        
        // Apply vertical-skewed displacement
        uv.y += displacement;
        uv.x += displacement * 0.5;

        vec4 color = texture2D(uTexture, uv);
        
        // Add a subtle bloom/glow based on displacement
        color.rgb += displacement * 2.0;

        gl_FragColor = color;
      }
    `;

    // --- Program Setup ---
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    // --- Buffers ---
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const uvs = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const aUv = gl.getAttribLocation(program, 'aUv');
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);

    // --- Texture ---
    const texture = gl.createTexture();
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    };

    // --- Uniforms ---
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');

    // --- Render Loop ---
    let startTime = Date.now();
    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };
    render();

    // --- Resize & Mouse ---
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - (e.clientY / window.innerHeight)
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [imageSrc]);

  return <canvas ref={canvasRef} className="w-full h-full object-cover" />;
};
