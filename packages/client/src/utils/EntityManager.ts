import type { EntityInfo, StoredStackData } from "@trpg/shared";
import { reactive, ref } from "vue";

export function useEntityManager(getDatabase: () => EntityInfo[]) {
  type StackData = ReturnType<typeof addEntityStack>;

  let maxTempId = 0;
  const storage = ref<StackData[]>([]);

  function addEntityStack(infoId: string, num = 1, note = "") {
    const database = getDatabase();
    const info = database.find((e) => e._id === infoId) ?? "";

    const stack = reactive({
      tempId: ++maxTempId,
      num,
      note,
      infoId,
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

  function toData(): StoredStackData[] {
    return storage.value.map((e) => ({
      infoId: e.infoId,
      note: e.note,
      num: e.num,
    }));
  }

  return {
    add: addEntityStack,
    loadData(data: StoredStackData[]) {
      storage.value = [];
      data.forEach((e) => {
        addEntityStack(e.infoId, e.num, e.note);
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
