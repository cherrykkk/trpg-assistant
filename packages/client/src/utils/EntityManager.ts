import { type ItemInfo } from "@trpg/shared";
import { reactive, ref } from "vue";

export function useEntityManager(database: ItemInfo[]) {
  type StackData = ReturnType<typeof addEntityStack>;

  let maxTempId = 0;
  const storage = ref<StackData[]>([]);

  function addEntityStack(id: number, num = 1, note = "") {
    const info = database.find((e) => e.id === id) || database[0];

    const stack = reactive({
      tempId: ++maxTempId,
      num,
      note,
      ...info,
    });
    storage.value.push(stack);
    return stack;
  }

  function calculateWeight(items: StackData | StackData[]) {
    if (!Array.isArray(items)) {
      items = [items];
    }

    let ounce = 0,
      pound = 0;
    items.forEach((e) => {
      const count = e.num ?? 1;
      ounce += (e.ounce ?? 0) * count;
      pound += (e.pound ?? 0) * count;
    });
    pound += Math.floor(ounce / 16);
    ounce = Math.round(ounce % 16);
    if (pound === 0) {
      return `${ounce} 盎司`;
    } else if (ounce === 0) {
      return `${pound} 磅`;
    } else {
      return ` ${pound} 磅 ${ounce} 盎司`;
    }
  }

  function toData() {
    return storage.value.map((e) => ({
      id: e.id,
      note: e.note,
      num: e.num,
    }));
  }

  return {
    add: addEntityStack,
    loadData(data: { id: number; num: number; note: string }[]) {
      storage.value = [];
      data.forEach((e) => {
        addEntityStack(e.id, e.num, e.note);
      });
    },
    remove(stack: StackData) {
      storage.value = storage.value.filter((e) => e !== stack);
    },
    calculateWeight,
    toData,
    storage,
  };
}
