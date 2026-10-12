import { useEffect, useRef } from 'react';

const CYAN: [number, number, number] = [95, 224, 255];
const PE = 8;
const GA = 4;
const SQRT2 = Math.SQRT1_2;
const SE = { x: SQRT2, y: -SQRT2 };
const G = { x: SQRT2, y: SQRT2 };
const MAX_LIVE = 3;
const SPAWN_INTERVAL = [0.7, 2.0];
const LEN_RANGE = [180, 320];
const SPEED_RANGE = [170, 270];
const MAX_OPACITY = 0.55;
const LINE_WIDTH = 2.5;
const HEAD_GLOW = 10;
const HEAD_CORE = 1.6;

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function rgba(c: [number, number, number], alpha: number): string {
  return `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(3)})`;
}

interface GridSpec {
  W: number;
  H: number;
  L: number;
  start: { x: number; y: number };
}

interface StreakLine {
  B: { x: number; y: number };
  t0: number;
  t1: number;
}

interface ActiveStreak {
  line: StreakLine;
  age: number;
  len: number;
  speed: number;
}

function buildGrid(w: number, h: number): GridSpec {
  const l = (w + h) * SQRT2;
  return {
    W: w,
    H: h,
    L: l,
    start: {
      x: w / 2 - (SE.x * l) / 2,
      y: h / 2 - (SE.y * l) / 2,
    },
  };
}

function pickLine(g: GridSpec, slot: number): StreakLine | null {
  const a = slot * PE + PE - GA / 2;
  const s = {
    x: g.start.x + SE.x * a,
    y: g.start.y + SE.y * a,
  };
  const t0 = Math.max(-s.x / G.x, -s.y / G.y);
  const t1 = Math.min((g.W - s.x) / G.x, (g.H - s.y) / G.y);
  return t1 > t0 ? { B: s, t0, t1 } : null;
}

const ptAt = (b: { x: number; y: number }, t: number) => ({
  x: b.x + G.x * t,
  y: b.y + G.y * t,
});

export function StreaksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let grid: GridSpec | null = null;
    let liveStreaks: ActiveStreak[] = [];
    let nextSpawn = rand(0.4, 1.2);
    let lastTime = 0;
    let animId = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width) || window.innerWidth;
      const h = Math.round(rect.height) || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grid = buildGrid(w, h);
    }

    window.addEventListener('resize', resize);
    resize();

    function spawn() {
      if (!grid) return;
      for (let i = 0; i < 8; i++) {
        const slot = Math.floor(Math.random() * (grid.L / PE));
        const line = pickLine(grid, slot);
        if (line) {
          liveStreaks.push({
            line,
            age: 0,
            len: rand(LEN_RANGE[0], LEN_RANGE[1]),
            speed: rand(SPEED_RANGE[0], SPEED_RANGE[1]),
          });
          return;
        }
      }
    }

    function renderStreak(s: ActiveStreak): boolean {
      if (!ctx) return false;
      const { B, t0, t1 } = s.line;
      const headT = t0 + s.age * s.speed;
      const tailT = headT - s.len;
      if (tailT > t1) return false;

      const pTail = ptAt(B, tailT);
      const pHead = ptAt(B, headT);

      // Tail to head gradient
      const grad = ctx.createLinearGradient(pTail.x, pTail.y, pHead.x, pHead.y);
      grad.addColorStop(0, rgba(CYAN, 0));
      grad.addColorStop(0.7, rgba(CYAN, MAX_OPACITY * 0.45));
      grad.addColorStop(1, rgba(CYAN, MAX_OPACITY));

      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = 'round';
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(pTail.x, pTail.y);
      ctx.lineTo(pHead.x, pHead.y);
      ctx.stroke();

      // Head glow
      const headGlow = ctx.createRadialGradient(pHead.x, pHead.y, 0, pHead.x, pHead.y, HEAD_GLOW);
      headGlow.addColorStop(0, rgba(CYAN, 0.55));
      headGlow.addColorStop(0.35, rgba(CYAN, 0.16));
      headGlow.addColorStop(1, rgba(CYAN, 0));
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(pHead.x, pHead.y, HEAD_GLOW, 0, Math.PI * 2);
      ctx.fill();

      // Sharp core pin
      ctx.fillStyle = rgba([235, 250, 255], 0.95);
      ctx.beginPath();
      ctx.arc(pHead.x, pHead.y, HEAD_CORE, 0, Math.PI * 2);
      ctx.fill();

      return true;
    }

    function loop(time: number) {
      animId = requestAnimationFrame(loop);
      if (!ctx || !grid) return;
      const dt = Math.min(0.05, (time - lastTime) / 1000 || 0);
      lastTime = time;

      nextSpawn -= dt;
      if (nextSpawn <= 0 && liveStreaks.length < MAX_LIVE) {
        nextSpawn = rand(SPAWN_INTERVAL[0], SPAWN_INTERVAL[1]);
        spawn();
      }

      ctx.clearRect(0, 0, grid.W, grid.H);
      ctx.globalCompositeOperation = 'lighter';

      liveStreaks = liveStreaks.filter((s) => {
        s.age += dt;
        return renderStreak(s);
      });
    }

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="streaks"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full"
    />
  );
}
