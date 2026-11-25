/**
 * The tab icon as a tiny RL episode: the reward curve draws itself when the page
 * opens, and the tab title notices when you leave and come back. Search engines
 * read the static icons in index.html; this only runs in the browser tab.
 */
const BLUE = "#1D4ED8";
const GREEN = "#4ADE80";
const AMBER = "#FBBF24";
const SIZE = 64;

// The same curve as public/favicon.svg, as two cubic segments.
const SEGMENTS: [number, number][][] = [
  [[13, 44], [24, 44], [27, 27], [36, 25]],
  [[36, 25], [45, 23], [45, 18], [50, 15]],
];
const at = (s: [number, number][], t: number): [number, number] => {
  const u = 1 - t;
  return [0, 1].map((k) => u ** 3 * s[0][k] + 3 * u * u * t * s[1][k] + 3 * u * t * t * s[2][k] + t ** 3 * s[3][k]) as [number, number];
};
const POINTS = SEGMENTS.flatMap((s, i) => Array.from({ length: 41 }, (_, j) => at(s, j / 40)).slice(i ? 1 : 0));

const draw = (ctx: CanvasRenderingContext2D, progress: number, dot: string, dotScale = 1) => {
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = BLUE;
  ctx.beginPath();
  ctx.roundRect(0, 0, SIZE, SIZE, 14);
  ctx.fill();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(12, 47);
  ctx.lineTo(52, 47);
  ctx.stroke();
  const n = Math.max(1, Math.round(progress * (POINTS.length - 1)));
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 6;
  ctx.beginPath();
  POINTS.slice(0, n + 1).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.stroke();
  const [x, y] = POINTS[n];
  ctx.fillStyle = BLUE;
  ctx.beginPath();
  ctx.arc(x, y, 7.25 * dotScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = dot;
  ctx.beginPath();
  ctx.arc(x, y, 5.5 * dotScale, 0, Math.PI * 2);
  ctx.fill();
};

export const startLiveFavicon = () => {
  if (typeof document === "undefined") return;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx || !("roundRect" in ctx)) return;

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  document.head.appendChild(link);
  const show = () => (link.href = canvas.toDataURL("image/png"));

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;

  // An episode: the curve climbs from the start to the reward, then the dot pops.
  const episode = () => {
    window.cancelAnimationFrame(frame);
    if (reduce) {
      draw(ctx, 1, GREEN);
      show();
      return;
    }
    const start = performance.now();
    let last = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      // Favicons only need ~15 fps; drawing every frame is wasted work.
      if (now - last > 66 || t === 1) {
        last = now;
        const eased = 1 - (1 - t) ** 3;
        const pop = t === 1 ? 1 : 1 + 0.35 * Math.sin(Math.PI * Math.max(0, (t - 0.8) / 0.2));
        draw(ctx, eased, GREEN, pop);
        show();
      }
      if (t < 1) frame = window.requestAnimationFrame(step);
    };
    frame = window.requestAnimationFrame(step);
  };

  const title = document.title;
  let restore = 0;
  document.addEventListener("visibilitychange", () => {
    window.clearTimeout(restore);
    if (document.hidden) {
      window.cancelAnimationFrame(frame);
      document.title = "⏸ Episode paused · Raafi Riyaz";
      draw(ctx, 1, AMBER);
      show();
    } else {
      document.title = "reward = +1.00 · welcome back";
      episode();
      restore = window.setTimeout(() => (document.title = title), 2500);
    }
  });

  episode();
};
