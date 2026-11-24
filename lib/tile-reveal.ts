// Canvas engine for the hero's tile effect: tiles of a photo spring in over whatever is underneath.
// One canvas replaces several hundred DOM nodes, and frames only run while something is changing.

type Point = { x: number; y: number };
type Options = { aspect: number; focus: Point };

const HOLD_MS = 420;
const BURST_HOLD_MS = 1100;
const INTRO_MS = 2400;
const INTRO_DELAY_MS = 500;
const RIPPLE_MS = 750;
const BRUSH_TILES = 2.2;
const BURST_TILES = 3.2;
// Underdamped on the way in, for a slight pop. Overdamped on the way out, so tiles don't bounce back.
const SPRING_IN = { stiffness: 300, damping: 22 };
const SPRING_OUT = { stiffness: 170, damping: 28 };

// Where the opening sweep travels, as fractions of the hero: across the roof and down the house.
const INTRO_PATH: Point[] = [
  { x: 0.45, y: 0.42 },
  { x: 0.66, y: 0.2 },
  { x: 0.92, y: 0.3 },
  { x: 0.72, y: 0.52 },
  { x: 0.94, y: 0.68 },
  { x: 0.62, y: 0.84 },
];

export function createTileReveal(canvas: HTMLCanvasElement, photo: HTMLImageElement, { aspect, focus }: Options) {
  const context = canvas.getContext("2d");
  const cover = document.createElement("canvas");
  const coverContext = cover.getContext("2d");
  if (!context || !coverContext) return null;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let columns = 1;
  let rows = 1;
  let amount = new Float32Array(0);
  let speed = new Float32Array(0);
  let heldUntil = new Float64Array(0);

  let frame = 0;
  let previousTime = 0;
  let pointer: Point | null = null;
  let isReady = false;
  let isPinned = false;
  let pin = { x: 0, y: 0, at: 0 };
  let introAt: number | null = null;
  let hasInteracted = false;

  function schedule() {
    if (frame) return;
    previousTime = performance.now();
    frame = requestAnimationFrame(tick);
  }

  // Pre-render the photo with the same crop as object-fit: cover, so tiles line up with the image below.
  function renderCover() {
    if (!coverContext || !width || !photo.complete || !photo.naturalWidth) return;
    cover.width = width;
    cover.height = height;
    const coverWidth = Math.max(width, height * aspect);
    const coverHeight = coverWidth / aspect;
    coverContext.drawImage(photo, (width - coverWidth) * focus.x, (height - coverHeight) * focus.y, coverWidth, coverHeight);
    isReady = true;
    if (introAt === null && !hasInteracted && !reducedMotion.matches) introAt = performance.now() + INTRO_DELAY_MS;
    schedule();
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    const density = Math.min(window.devicePixelRatio, 2);
    width = canvas.width = Math.round(bounds.width * density);
    height = canvas.height = Math.round(bounds.height * density);
    if (!width || !height) return;

    columns = bounds.width < 768 ? 12 : 24;
    rows = Math.max(1, Math.round(height / ((width / columns) * 0.8)));
    amount = new Float32Array(columns * rows).fill(isPinned ? 1 : 0);
    speed = new Float32Array(columns * rows);
    heldUntil = new Float64Array(columns * rows);
    pointer = null;
    renderCover();
  }

  function stamp(point: Point, radiusInTiles: number, until: number) {
    const tileWidth = width / columns;
    const tileHeight = height / rows;
    const radius = tileWidth * radiusInTiles;
    const lastColumn = Math.min(columns - 1, Math.floor((point.x + radius) / tileWidth));
    const lastRow = Math.min(rows - 1, Math.floor((point.y + radius) / tileHeight));

    for (let row = Math.max(0, Math.floor((point.y - radius) / tileHeight)); row <= lastRow; row++) {
      for (let column = Math.max(0, Math.floor((point.x - radius) / tileWidth)); column <= lastColumn; column++) {
        const distance = Math.hypot((column + 0.5) * tileWidth - point.x, (row + 0.5) * tileHeight - point.y);
        if (distance > radius) continue;
        const index = row * columns + column;
        // The middle of the brush lingers, so the trail breaks up from its edges.
        heldUntil[index] = Math.max(heldUntil[index], until - (distance / radius) * 160);
      }
    }
  }

  // A fast pointer skips tiles between events, so fill in the line it travelled.
  function paintTo(point: Point, now: number) {
    const from = pointer ?? point;
    const steps = Math.max(1, Math.ceil(Math.hypot(point.x - from.x, point.y - from.y) / (width / columns)));
    for (let step = 1; step <= steps; step++) {
      const x = from.x + ((point.x - from.x) * step) / steps;
      const y = from.y + ((point.y - from.y) * step) / steps;
      stamp({ x, y }, BRUSH_TILES, now + HOLD_MS);
    }
    pointer = point;
  }

  // Returns whether the opening sweep still needs frames.
  function playIntro(now: number) {
    if (introAt === null || hasInteracted) return false;
    const progress = (now - introAt) / INTRO_MS;
    if (progress < 0) return true;
    if (progress >= 1) {
      hasInteracted = true;
      pointer = null;
      return false;
    }
    const position = progress * (INTRO_PATH.length - 1);
    const from = INTRO_PATH[Math.floor(position)];
    const to = INTRO_PATH[Math.floor(position) + 1];
    const mix = position % 1;
    paintTo({ x: (from.x + (to.x - from.x) * mix) * width, y: (from.y + (to.y - from.y) * mix) * height }, now);
    return true;
  }

  function targetFor(index: number, now: number) {
    if (!isPinned) return heldUntil[index] > now ? 1 : 0;
    const x = (((index % columns) + 0.5) / columns) * width;
    const y = ((Math.floor(index / columns) + 0.5) / rows) * height;
    const delay = (Math.hypot(x - pin.x, y - pin.y) / Math.hypot(width, height)) * RIPPLE_MS;
    return reducedMotion.matches || now >= pin.at + delay ? 1 : 0;
  }

  function animateTile(index: number, target: number, seconds: number) {
    if (reducedMotion.matches) {
      amount[index] = target;
      return false;
    }
    const spring = target ? SPRING_IN : SPRING_OUT;
    speed[index] += ((target - amount[index]) * spring.stiffness - speed[index] * spring.damping) * seconds;
    amount[index] += speed[index] * seconds;
    if (Math.abs(target - amount[index]) < 0.004 && Math.abs(speed[index]) < 0.05) {
      amount[index] = target;
      speed[index] = 0;
      return false;
    }
    return true;
  }

  function drawTile(index: number) {
    const value = amount[index];
    if (!context || value <= 0.004) return;
    const column = index % columns;
    const row = Math.floor(index / columns);
    const left = Math.round((column * width) / columns);
    const top = Math.round((row * height) / rows);
    const tileWidth = Math.round(((column + 1) * width) / columns) - left;
    const tileHeight = Math.round(((row + 1) * height) / rows) - top;
    const scale = 0.5 + 0.5 * value;

    context.globalAlpha = Math.min(1, value);
    context.drawImage(
      cover,
      left,
      top,
      tileWidth,
      tileHeight,
      left + (tileWidth * (1 - scale)) / 2,
      top + (tileHeight * (1 - scale)) / 2,
      tileWidth * scale,
      tileHeight * scale,
    );
  }

  function tick(now: number) {
    frame = 0;
    if (!context || !isReady) return;
    // Clamped, because a spring explodes after a long gap such as a background tab.
    const seconds = Math.min(Math.max(now - previousTime, 0), 32) / 1000;
    previousTime = now;

    let needsFrame = playIntro(now);
    context.clearRect(0, 0, width, height);
    for (let index = 0; index < amount.length; index++) {
      const target = targetFor(index, now);
      const isMoving = animateTile(index, target, seconds);
      const willChange = isPinned ? target === 0 : heldUntil[index] > now;
      if (isMoving || willChange) needsFrame = true;
      drawTile(index);
    }
    if (needsFrame) frame = requestAnimationFrame(tick);
  }

  function toCanvasPoint(clientX: number, clientY: number): Point {
    const bounds = canvas.getBoundingClientRect();
    return { x: ((clientX - bounds.left) * width) / bounds.width, y: ((clientY - bounds.top) * height) / bounds.height };
  }

  function takeOver() {
    if (hasInteracted) return;
    hasInteracted = true;
    pointer = null;
  }

  photo.addEventListener("load", renderCover);
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  return {
    move(clientX: number, clientY: number) {
      if (!isReady || isPinned || reducedMotion.matches) return;
      takeOver();
      paintTo(toCanvasPoint(clientX, clientY), performance.now());
      schedule();
    },
    burst(clientX: number, clientY: number) {
      if (!isReady || isPinned || reducedMotion.matches) return;
      takeOver();
      pointer = toCanvasPoint(clientX, clientY);
      stamp(pointer, BURST_TILES, performance.now() + BURST_HOLD_MS);
      schedule();
    },
    release() {
      if (hasInteracted) pointer = null;
    },
    setPinned(next: boolean) {
      takeOver();
      isPinned = next;
      pin = { x: width * 0.75, y: height * 0.5, at: performance.now() };
      heldUntil.fill(0);
      schedule();
    },
    destroy() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      photo.removeEventListener("load", renderCover);
    },
  };
}

export type TileRevealEngine = NonNullable<ReturnType<typeof createTileReveal>>;
