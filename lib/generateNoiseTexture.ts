let cachedParchmentNoise: string | null = null;
let cachedWoodNoise: string | null = null;

function makeNoiseDataUrl(
  size: number,
  dotAlphaRange: [number, number],
  baseColor: string
): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, size, size);

  const dotCount = Math.floor(size * size * 0.35);
  for (let i = 0; i < dotCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const alpha =
      dotAlphaRange[0] +
      Math.random() * (dotAlphaRange[1] - dotAlphaRange[0]);
    const shade = Math.random() > 0.5 ? 0 : 255;
    ctx.fillStyle = `rgba(${shade},${shade},${shade},${alpha})`;
    ctx.fillRect(x, y, 1, 1);
  }

  return canvas.toDataURL("image/png");
}

/** Cached, generated once per session — never regenerated per render. */
export function getParchmentNoiseTexture(): string {
  if (typeof document === "undefined") return "";
  if (!cachedParchmentNoise) {
    cachedParchmentNoise = makeNoiseDataUrl(96, [0.02, 0.06], "#e6d9b8");
  }
  return cachedParchmentNoise;
}

export function getWoodNoiseTexture(): string {
  if (typeof document === "undefined") return "";
  if (!cachedWoodNoise) {
    cachedWoodNoise = makeNoiseDataUrl(64, [0.03, 0.09], "#3a2a1d");
  }
  return cachedWoodNoise;
}
