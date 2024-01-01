<template>
  <div>
    <div class="layer-list">
      <div v-for="(e, i) in mapInfo.layers" @click="handleSelectLayer(e)" class="layer-item">
        <div v-if="!e.isSelected">
          {{ e.layerName }}
        </div>
        <div v-else class="is-selected">
          <div
            :contenteditable="layerNameEditingIndex === i"
            @click="handleClickLayerName(i)"
            @blur="handleLayerNameBlur"
          >
            {{ e.layerName }}
          </div>
          <button class="delete-button" @click="handleDeleteLayer(e)">删除</button>
        </div>
      </div>
    </div>
    <button @click="handleAddLayer" style="margin: 10px">新建图层</button>
  </div>
</template>

<script lang="ts" setup>
import type { LayerInfo } from "@trpg/shared";
import { ref, type PropType, computed, toRefs } from "vue";
import { mapInstance as mapInfo } from "./store";

function handleSelectLayer(l: LayerInfo) {
  mapInfo.layers.forEach((e) => (e.isSelected = false));
  l.isSelected = true;
}

function handleDeleteLayer(l: LayerInfo) {
  mapInfo.layers.filter((e) => e !== l);
}

function handleAddLayer() {
  mapInfo.layers.forEach((e) => (e.isSelected = false));
  const newLayer: LayerInfo = {
    playerVisible: true,
    brushActions: [],
    layerName: "新建图层",
    isSelected: true,
    key: Date.now(),
  };

  mapInfo.layers.push(newLayer);
}

const currentLayerIndex = computed(() => {
  return mapInfo.layers.findIndex((e) => e.isSelected);
});

const layerNameEditingIndex = ref(-1);
function handleClickLayerName(layerIndex: number) {
  if (layerIndex === currentLayerIndex.value) {
    layerNameEditingIndex.value = layerIndex;
  }
}
function handleLayerNameBlur(e: FocusEvent) {
  mapInfo.layers[layerNameEditingIndex.value].layerName = (e.target as HTMLDivElement).innerText;
}
</script>
<style lang="less" scoped>
.is-selected {
  color: red;
}

.layer-list {
  text-align: left;
  .layer-item {
    position: relative;
    cursor: pointer;
    &:hover {
      color: hsl(122, 71%, 7%);
      background-color: rgb(196, 234, 196);
    }
    .delete-button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>
