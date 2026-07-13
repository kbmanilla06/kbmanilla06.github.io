export type PerformanceTier = "high" | "low";

/**
 * Cheap heuristic — no benchmark, just signals that correlate with
 * low-end hardware: capped device pixel ratio and a software/mobile
 * renderer string from the WebGL context.
 */
export function detectPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") return "high";

  try {
    const dpr = window.devicePixelRatio || 1;
    const cores = navigator.hardwareConcurrency ?? 8;

    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null);

    let rendererString = "";
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        rendererString = String(
          gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        ).toLowerCase();
      }
    } else {
      // No WebGL at all — definitely the low tier.
      return "low";
    }

    const looksSoftware =
      /swiftshader|software|llvmpipe|angle \(google, vulkan/i.test(
        rendererString
      );
    const looksLowPowerMobile =
      /mali-4|adreno 3|adreno 4|powervr sgx/i.test(rendererString);

    if (looksSoftware || looksLowPowerMobile) return "low";
    if (cores <= 4 && dpr <= 1) return "low";

    return "high";
  } catch {
    return "low";
  }
}
