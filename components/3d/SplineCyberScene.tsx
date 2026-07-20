"use client";

const SPLINE_PREVIEW_URL =
  "https://app.spline.design/file/8f4b578c-3e0d-47d5-98bd-04e61d7d32fe?view=preview";

export default function SplineCyberScene() {
  return (
    <div className="spline-cyber-scene" aria-label="Interactive CyberMannequin 3D model">
      <iframe
        src={SPLINE_PREVIEW_URL}
        title="Interactive CyberMannequin 3D scene"
        loading="eager"
        allow="autoplay; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />
      <p className="spline-cyber-hint">
        <span aria-hidden="true" /> Interactive 3D · Move cursor to inspect
      </p>
    </div>
  );
}
