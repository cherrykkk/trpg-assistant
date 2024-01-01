import { computed, type CSSProperties, reactive } from "vue";

export function useSandboxCamera() {
  const state = reactive({
    offsetX: 0,
    offsetY: 0,
    scale: 1,
  });

  const cameraTransformStyle = computed<CSSProperties>(() => {
    return {
      transform: `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`,
    };
  });

  function scaleCanvas(deltaY: number) {
    let { scale } = state;

    scale -= deltaY / 200;
    if (scale > 3) {
      scale = 3;
    }
    if (scale < 0.2) {
      scale = 0.2;
    }
    state.scale = scale;
  }

  function moveCanvas(deltaX: number, deltaY: number, mapWidth: number, mapHeight: number) {
    let { offsetX, offsetY } = state;
    offsetX -= deltaX;
    offsetY -= deltaY;

    const minX = 100 - mapWidth;
    const maxX = 100;
    const minY = 100 - mapHeight;
    const maxY = 100;

    offsetX = Math.min(maxX, offsetX);
    offsetX = Math.max(minX, offsetX);
    offsetY = Math.min(maxY, offsetY);
    offsetY = Math.max(minY, offsetY);

    state.offsetX = offsetX;
    state.offsetY = offsetY;
  }

  return {
    cameraTransformStyle,
    scaleCanvas,
    moveCanvas,
    cameraState: state,
  };
}
