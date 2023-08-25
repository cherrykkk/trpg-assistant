<template>
  <div class="entity-storage">
    <div v-for="(stack, i) in manager.storage.value" :key="i" class="cell-container">
      <button
        class="clickable-cell"
        :class="{ 'drag-chosen': dragChosen.includes(i) }"
        @click.right.prevent="handleRightClick(i)"
        @click="handleClick(stack)"
      >
        {{ stack.name }}{{ (stack.num ?? 1) === 1 ? "" : `*${stack.num}` }}
      </button>
    </div>
    <div class="add-item-button">
      <ElSelect
        placeholder="添加"
        @change="(info: ItemInfo)=>{manager.add(info.id); $emit('change',manager.toData())}"
        filterable
      >
        <ElOption v-for="item in ENTITY_DATABASE" :key="item.id" :label="item.name" :value="item"
      /></ElSelect>
    </div>
  </div>
  <ElDialog class="external-panel" v-model="showDialog">
    <template v-if="stackInDialog">
      <div>
        <el-descriptions>
          <template #title>
            {{ stackInDialog.name
            }}{{ (stackInDialog.num ?? 1) === 1 ? "" : `*${stackInDialog.num}` }}
            <span style="font-weight: 500; font-size: 14px; margin: 40px">{{
              manager.calculateWeight(stackInDialog)
            }}</span>
          </template>
          <el-descriptions-item>{{ stackInDialog.description }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="item-object-editor">
        <el-form>
          <el-form-item label="额外描述：">
            <el-input type="textarea" v-model="stackInDialog.note" />
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number label="数量" v-model="stackInDialog.num" />
          </el-form-item>
        </el-form>
      </div>
      <button
        @click="
          manager.remove(stackInDialog);
          showDialog = false;
        "
      >
        删除
      </button>
    </template>
  </ElDialog>
  <button v-if="dragChosen.length > 0">转移</button>
</template>
<script lang="ts" setup>
import { ENTITY_DATABASE, type ItemInfo, type StoredStackData } from "@trpg/shared";
import { type PropType, ref, watch } from "vue";
import { useEntityManager } from "@/utils/EntityManager";
import { ElDialog, ElOption, ElSelect } from "element-plus";

const props = defineProps({
  initStoredStackData: {
    type: Array as PropType<StoredStackData[]>,
    required: true,
  },
});

defineExpose({
  getData: () => manager.toData(),
});
const emits = defineEmits<{ (event: "change", data: StoredStackData[]): void }>();

const manager = useEntityManager(ENTITY_DATABASE);
watch(
  props.initStoredStackData,
  () => {
    manager.loadData(props.initStoredStackData);
  },
  { immediate: true }
);

const dragChosen = ref<number[]>([]);
function handleRightClick(key: number) {
  if (dragChosen.value.includes(key)) {
    dragChosen.value = dragChosen.value.filter((e) => e !== key);
  } else {
    dragChosen.value.push(key);
  }
}

const showDialog = ref(false);
const stackInDialog = ref<null | (typeof manager.storage.value)[number]>(null);
function handleClick(stack: (typeof manager.storage.value)[number]) {
  stackInDialog.value = stack;
  showDialog.value = true;
}
</script>

<style lang="less" scoped>
.entity-storage {
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  min-height: 60px;
  padding: 5px 10px;
  .drag-chosen {
    border: 1px solid red;
  }

  .cell-container {
    cursor: pointer;
    .clickable-cell {
      width: 40px;
      height: 40px;
      text-align: center;
      background-color: #f5f5f5;
      margin: 2px;
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
