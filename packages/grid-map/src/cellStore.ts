import { computed, onMounted, onUnmounted, reactive, ref, watch, watchEffect } from "vue";
import type { MapItem, CellPoint } from "./types";

import {
  addItemsInCells,
  handleDeleteItem,
  instance,
  isCellActive,
  moveItems,
  setCellsActivity,
} from "./instanceStore";
import { getUniqueId, parseCellId } from "./utils";

interface StickerData {
  name: string; // unique
  data: string; // base64
}

type showType = "selected" | "normal" | "canPutInUse" | "hidden";

export const operatorStatus = reactive({
  editingCellUsage: false,
  selectingCells: true,
  movingSelectedItems: false,
  attachingItems: "",
});

const draggingItems = ref<MapItem[]>([]);
const tempSelected = ref<CellPoint[]>([]);

export function switchEditingCellShowStatus(val?: boolean) {
  if (val === undefined) {
    val = !operatorStatus.editingCellUsage;
  }
  operatorStatus.editingCellUsage = val;

  if (val === false) {
    // Object.values(cellMapInstance)
    //   .filter((e) => !e.inUse)
    //   .forEach((e) => {
    //     selectedCells.value.delete(e);
    //   });
  }
}

export const startToAttachItem = (itemName: string) => {
  operatorStatus.attachingItems = itemName;
};

export const stopAttachingItem = () => {
  operatorStatus.attachingItems = "";
};

export const cellSize = ref(80);

const dragStartPoint = ref<CellPoint | null>(null);
const currentPoint = ref<CellPoint | null>(null);

const autoDragTimer = ref(0);
watch(dragStartPoint, (newVal, oldVal) => {
  if (oldVal === null) {
    autoDragTimer.value = window.setTimeout(() => {
      startToDragItems(Object.values(selectedItems.value).flat());
    }, 500);
  } else {
    clearTimeout(autoDragTimer.value);
    stopDragging();
  }
});

watch(currentPoint, () => {
  clearTimeout(autoDragTimer.value);
});

watch(currentPoint, (newVal, oldVal) => {
  if (operatorStatus.movingSelectedItems) {
    if (!newVal || !oldVal) return;
    if (dragStartPoint.value && oldVal !== newVal) {
      moveItems(draggingItems.value, oldVal, newVal);
    }
  }
});

watchEffect(() => {
  if (operatorStatus.attachingItems) {
    if (!dragStartPoint.value || !currentPoint.value) return;
    addItemsInCells([currentPoint.value], operatorStatus.attachingItems);
    return;
  }

  if (operatorStatus.selectingCells) {
    if (!dragStartPoint.value || !currentPoint.value) return;

    const [startX, startY] = parseCellId(dragStartPoint.value);
    const [endX, endY] = parseCellId(currentPoint.value);
    const x1 = Math.min(startX, endX);
    const x2 = Math.max(startX, endX);
    const y1 = Math.min(startY, endY);
    const y2 = Math.max(startY, endY);

    const points: string[] = [];
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        points.push(`${x},${y}`);
      }
    }

    tempSelected.value = points;

    return;
  }
});

export const selectedCells = ref<Set<CellPoint>>(new Set());
export const selectedItems = computed<Record<string, MapItem[]>>(() => {
  const items: MapItem[] = [];
  // todo: perf
  instance.items.forEach((e) => {
    if (selectedCells.value.has(e.attachedTo)) {
      items.push(e);
    }
  });

  //todo: Object.groupBy polyfill（core-js)

  //todo: examine ts support
  // @ts-ignore
  const result = Object.groupBy(items, ({ name }) => name);
  return result;
});

export function removeItemsInSelectedCells(name?: string) {
  selectedCells.value.forEach((cellId) => {
    if (name) {
      // todo: better performance
      instance.items = instance.items.filter((e) => !(e.attachedTo === cellId && e.name === name));
    } else {
      instance.items = instance.items.filter((e) => e.attachedTo !== cellId);
    }
  });
}

// only for dragging status
const tempShowStatus = ref<showType>("normal");

export const renderCellPosition = computed(() => {
  const cellIds: string[] = [];

  const { row, column } = instance.gridConfig;
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < column; y++) {
      cellIds.push(`${x},${y}`);
    }
  }

  return cellIds.map((key) => {
    const [xId, yId] = key.split(",");

    let showType: showType = "normal";

    if (isCellActive(key)) {
      showType = selectedCells.value.has(key) ? "selected" : "normal";
    } else {
      showType = operatorStatus.editingCellUsage ? "canPutInUse" : "hidden";
    }

    if (operatorStatus.selectingCells && tempSelected.value.includes(key)) {
      showType = tempShowStatus.value;
    }

    const isCellHasItemToDrag =
      operatorStatus.movingSelectedItems && draggingItems.value.find((e) => e.attachedTo === key);
    if (isCellHasItemToDrag) {
      showType = "selected";
    }

    const tempItems = tempSelectedItems.value.filter((e) => e.attachedTo === key);

    const isPreAttached = operatorStatus.attachingItems && currentPoint.value === key;
    if (isPreAttached) {
      tempItems.push({
        attachedTo: key,
        name: operatorStatus.attachingItems,
        data: null,
        id: getUniqueId(),
      });
    }

    return {
      cellId: key,
      x: Number(xId) * cellSize.value,
      y: Number(yId) * cellSize.value,
      // todo: items should have move status, like pre attached（lighter)
      items: [...instance.items.filter((e) => e.attachedTo === key), ...tempItems],
      showType,
    };
  });
});

export function getCellByCellId(id: string) {
  return renderCellPosition.value.find((e) => e.cellId === id);
}

export function handleAddItem(itemName: string) {
  addItemsInCells([...selectedCells.value.values()], itemName);
}

export function handlePointerdown(cellId: CellPoint) {
  dragStartPoint.value = cellId;
  currentPoint.value = cellId;

  if (operatorStatus.editingCellUsage) {
    if (instance.gridConfig.activeCells.includes(cellId)) {
      tempShowStatus.value = "canPutInUse";
    } else {
      tempShowStatus.value = "normal";
    }
  } else if (operatorStatus.selectingCells) {
    if (selectedCells.value.has(cellId)) {
      tempShowStatus.value = "normal";
    } else {
      tempShowStatus.value = "selected";
    }
  }
}

export function handlePointermove(cellId: CellPoint, e: PointerEvent) {
  currentPoint.value = cellId;
  (e.target as HTMLElement).releasePointerCapture(e.pointerId);
}

export function handlePointerup() {
  const startPoint = dragStartPoint.value;
  if (!startPoint) return;

  if (operatorStatus.editingCellUsage) {
    setCellsActivity(tempSelected.value, !instance.gridConfig.activeCells.includes(startPoint));
  } else if (operatorStatus.selectingCells) {
    setCellsSelected(tempSelected.value, !selectedCells.value.has(startPoint));
  }

  dragStartPoint.value = null;
  currentPoint.value = null;
}

const stickerList = ref<StickerData[]>([]);

// pick from cell and not included in cell
const tempSelectedItems = ref<MapItem[]>([]);

// todo: pointerdown for 2s will auto start drag mode
export const startToDragItems = (items: MapItem[]) => {
  operatorStatus.movingSelectedItems = true;
  operatorStatus.selectingCells = false;
  selectedCells.value.clear();
  draggingItems.value.push(...items);
};

export const stopDragging = () => {
  operatorStatus.movingSelectedItems = false;
  operatorStatus.selectingCells = true;
  draggingItems.value = [];
};

function setCellsSelected(cellIds: CellPoint[], selected: boolean) {
  cellIds.forEach((id) => {
    if (selected) {
      selectedCells.value.add(id);
    } else {
      selectedCells.value.delete(id);
    }
  });
}

export const initOperator = () => {
  const handlePointerdown = (e: PointerEvent) => {
    if (e.button === 2) {
      e.preventDefault();
      e.stopPropagation();
      stopAttachingItem();
    }
  };

  const preventContextmenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  onMounted(() => {
    addEventListener("pointerdown", handlePointerdown, {
      capture: true,
    });

    addEventListener("contextmenu", preventContextmenu);
  });

  onUnmounted(() => {
    removeEventListener("pointerdown", handlePointerdown, { capture: true });
    removeEventListener("contextmenu", preventContextmenu);
  });
};
