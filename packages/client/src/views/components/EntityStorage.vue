<template>
  <div class="entity-storage" ref="entityStorageRef">
    <div class="entity-menu">
      <div v-for="(stack, i) in manager.storage.value" :key="i" class="cell-container">
        <button
          class="clickable-cell"
          :class="{ 'drag-chosen': dragChosen.includes(i), 'edit-chosen': stackInDialog === stack }"
          @click.right.prevent="handleRightClick(i)"
          @click="handleClick(stack)"
        >
          {{ stack.name === "临时物品" ? stack.note : stack.name }}
        </button>
        <div class="num-badge">{{ (stack.num ?? 1) === 1 ? "" : `${stack.num}` }}</div>
      </div>
      <div class="add-item-button">
        <ElSelect
          placeholder="添加"
          @change="(info: EntityInfo)=>{manager.add(info._id);}"
          filterable
        >
          <ElOption v-for="item in database" :key="item._id" :label="item.name" :value="item"
        /></ElSelect>
      </div>
      <span style="font-weight: 500; font-size: 14px"
        >共计{{ manager.calculateWeight(manager.storage.value) }}</span
      >
    </div>
    <div v-if="stackInDialog" class="entity-editor">
      <h2>
        {{ stackInDialog.name }}{{ (stackInDialog.num ?? 1) === 1 ? "" : `*${stackInDialog.num}` }}
        <span style="font-weight: 500; font-size: 14px; margin: 40px">{{
          manager.calculateWeight(stackInDialog)
        }}</span>
        <button @click="remove" style="float: right">删除</button>
      </h2>
      <TextRender :text="stackInDialog.description" />
      <StringInput title="备注" v-model="stackInDialog.note" />
      <div>
        <NumberInput title="数量" v-model="stackInDialog.num" />
      </div>
    </div>
    <button v-if="dragChosen.length > 0">转移</button>
  </div>
</template>
<script lang="ts" setup>
import { type EntityInfo, type StoredStackData } from "@trpg/shared";
import { type PropType, ref, watch } from "vue";
import { useEntityManager } from "@/utils/EntityManager";
import { ElOption, ElSelect } from "element-plus";
import TextRender from "./TextRender.vue";
import NumberInput from "./editor/NumberInput.vue";
import StringInput from "./editor/StringInput.vue";

const props = defineProps({
  initStoredStackData: {
    type: Array as PropType<StoredStackData[]>,
    required: true,
  },
  database: {
    type: Array as PropType<EntityInfo[]>,
    required: true,
  },
});

defineExpose({
  getData: () => manager.toData(),
});
const emits = defineEmits<{ (event: "change", data: StoredStackData[]): void }>();

const manager = useEntityManager(() => props.database);
watch(
  props.initStoredStackData,
  () => {
    manager.loadData(props.initStoredStackData);
  },
  { immediate: true }
);

watch(
  () => manager.storage.value,
  () => {
    emits("change", manager.toData());
  },
  {
    deep: true,
  }
);

const dragChosen = ref<number[]>([]);
function handleRightClick(key: number) {
  if (dragChosen.value.includes(key)) {
    dragChosen.value = dragChosen.value.filter((e) => e !== key);
  } else {
    dragChosen.value.push(key);
  }
}

const stackInDialog = ref<null | (typeof manager.storage.value)[number]>(null);
function handleClick(stack: (typeof manager.storage.value)[number]) {
  stackInDialog.value = stack;
}

const entityStorageRef = ref<HTMLDivElement>();
addEventListener("click", (e) => {
  if (entityStorageRef.value && !e.composedPath().includes(entityStorageRef.value)) {
    stackInDialog.value = null;
  }
});

function remove() {
  if (!stackInDialog.value) return;

  const index = manager.storage.value.findIndex((e) => e === stackInDialog.value);
  manager.remove(stackInDialog.value);

  let newInEditor = manager.storage.value[index - 1];
  if (!newInEditor && manager.storage.value.length > 0) {
    newInEditor = manager.storage.value[0];
  }
  stackInDialog.value = newInEditor;
}
</script>

<style lang="less" scoped>
.entity-storage {
  font-size: 12px;
  .entity-menu {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 10px;
  }
  .entity-editor {
    padding: 2px 10px;
    height: 200px;
    overflow: auto;
  }
  .edit-chosen {
    box-shadow: 0 0 2px red;
  }
  .drag-chosen {
    border: 1px solid red;
  }

  .cell-container {
    cursor: pointer;
    position: relative;
    .clickable-cell {
      width: 40px;
      height: 40px;
      text-align: center;
      background-color: #f5f5f5;
      margin: 2px;
      overflow: hidden;
    }
    .num-badge {
      position: absolute;
      bottom: 2px;
      right: 2px;
      padding: 0 2px;
      background: #000;
      color: #fff;
      opacity: 0.2;
      font-size: 11px;
    }
  }
  .add-item-button {
    width: 100px;
    height: 40px;
  }
  .external-panel {
    background-color: white;
    border: 1px solid #bbb;
    position: absolute;
    width: 400px;
    min-height: 100px;
    padding: 2px 4px;
  }
}
</style>
