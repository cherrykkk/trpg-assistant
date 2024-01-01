import { reactive } from "vue";
import type { CellPoint, MapInstance, MapItem } from "./types";
import { getUniqueId, parseCellId } from "./utils";

const MAP_INSTANCE_DATA: MapInstance = {
  gridConfig: {
    row: 10,
    column: 10,
    cellSize: 80,
    activeCells: ["0,0", "0,1", "0,2", "1,2"],
  },
  items: [
    {
      attachedTo: "0,1",
      name: "wall",
      data: null,
      id: getUniqueId(),
    },
  ],
};

export const instance = reactive(MAP_INSTANCE_DATA);

export const handleDeleteItem = (itemId: number) => {
  instance.items = instance.items.filter((e) => e.id !== itemId);
};

export const addItemsInCells = (cellIds: CellPoint[], itemName: string) => {
  cellIds.forEach((cellId) => {
    instance.items.push({
      attachedTo: cellId,
      name: itemName,
      data: null,
      id: getUniqueId(),
    });
  });
};

export const setCellsActivity = (cellIds: CellPoint[], active: boolean) => {
  let activeIds = new Set(instance.gridConfig.activeCells);

  cellIds.forEach((id) => {
    if (active) {
      activeIds.add(id);
    } else {
      activeIds.delete(id);
    }
  });

  instance.gridConfig.activeCells = Array.from(activeIds);
};

export const isCellActive = (cellId: CellPoint) => {
  return instance.gridConfig.activeCells.includes(cellId);
};

export const moveItems = (items: MapItem[], oldCell: CellPoint, newCell: CellPoint) => {
  const [newX, newY] = parseCellId(newCell);
  const [oldX, oldY] = parseCellId(oldCell);

  items.forEach((e) => {
    const [x, y] = parseCellId(e.attachedTo);

    e.attachedTo = `${x + newX - oldX},${y + newY - oldY}`;
  });
};

/** temp init */
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    setCellsActivity([`${i},${j}`], true);
  }
}
