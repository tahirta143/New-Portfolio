// Shared scroll state between DOM and Three.js (module-level singleton)
export const scrollState = {
  progress: 0,       // 0 to 1 overall scroll progress
  mouseX: 0,         // -1 to 1 normalized mouse X
  mouseY: 0,         // -1 to 1 normalized mouse Y
};
