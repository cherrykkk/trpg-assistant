<template>
  <div class="features-box">
    <div class="equipped-features" style="overflow: auto">
      <div v-for="e in leftFeatures" :key="e._id">
        <span>{{ e.name }}</span>
        <p>{{ e.description }}</p>
        <div v-if="spellIdToShowDescription.includes(e._id)" class="spell-on-character-info">
          <div class="delete-button" @click="() => handleRemoveItem(e._id)">-</div>
        </div>
      </div>
      <el-button class="switch-button" @click="() => (showCollection = !showCollection)">
        {{ showCollection ? `关闭列表` : `打开列表` }}
      </el-button>
    </div>
    <div v-if="showCollection" style="overflow: auto">
      <div v-for="e in collection">
        <span>{{ e.name }}</span>
        <p>{{ e.description }}</p>
        <div class="add-button" @click="handleAppendItem(e._id)">+</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type PropType, computed, ref } from "vue";
import type { EquippedFeature, FeatureDoc } from "@trpg/shared";

const props = defineProps({
  equipped: {
    type: Array as PropType<EquippedFeature[]>,
    required: true,
  },
  collection: {
    type: Array as PropType<FeatureDoc[]>,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "change", data: EquippedFeature[]): void;
}>();

const leftFeatures = computed(() => {
  const result: FeatureDoc[] = [];

  props.equipped.forEach((e) => {
    const doc = props.collection.find((e2) => e.featureId === e2._id);
    if (doc) {
      result.push(doc);
    }
  });
  return result;
});

const spellIdToShowDescription = ref<string[]>([]);
const showCollection = ref(false);

function handleRemoveItem(id: string) {
  emit(
    "change",
    props.equipped.filter((e) => e.featureId !== id)
  );
}

function handleAppendItem(id: string) {
  const data = [...props.equipped, { featureId: id, reason: "" }];
  emit("change", data);
}
</script>
<style lang="less" scoped>
.features-box {
  display: flex;
  border: 2px solid #ccc;
  position: relative;
  height: 600px;
  padding: 10px;
}

.equipped-features {
  width: 100%;
  overflow: auto;
  overscroll-behavior: contain;

  .switch-button {
    margin: 20px;
  }

  .spell-on-character-info {
    display: flex;
    justify-content: space-between;
    margin: 2px;
    line-height: 24px;
  }
}

.delete-button {
  background-color: #e18989;
  color: white;
  width: 24px;
  border-radius: 50%;
}

.add-button {
  background-color: #8fc58f;
  color: white;
  margin: 0 10px 10px 10px;
  cursor: pointer;
}
</style>
