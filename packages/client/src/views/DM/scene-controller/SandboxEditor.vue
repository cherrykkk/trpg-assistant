<template>
  <template v-if="useSocketStore().canvasMapReady">
    <SandboxMap :map-info="mapInfo" :editable="true" @change="updateCanvasMapData"></SandboxMap>
  </template>
  <div v-else>
    <div>加载中...</div>
  </div>
  <div class="right-bar">
    <RightBar v-if="currentScene" :scene="currentScene" />
    <div class="map-info-editor">
      <h5>图层</h5>
      <LayerEditor v-if="mapInfo" :layer-list="mapInfo.layers" @change="updateCanvasLayer" />
      <h5>画布尺寸</h5>
      <input :value="mapInfo?.width" @blur="changeMapInfo($event, 'width')" />x<input
        :value="mapInfo?.height"
        @blur="changeMapInfo($event, 'height')"
      />
      <h5>网格尺寸</h5>
      <input type="number" :value="mapInfo?.gridSize" @input="changeMapInfo($event, 'gridSize')" />
      <h5>沙盘名</h5>
      <input :value="mapInfo?.mapName" @input="changeMapInfo($event, 'mapName')" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import SandboxMap from "@trpg/components/sandbox-canvas/SandboxMap.vue";
import LayerEditor from "@trpg/components/sandbox-canvas/LayerEditor.vue";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useSocketStore } from "@/stores/useSocketStore";
import RightBar from "./RightBar.vue";
import type { CanvasMap, LayerInfo } from "@trpg/shared";
import { updateCanvasMap, updateSceneInfo } from "@/api/socket-tasks";

const { currentScene } = storeToRefs(useSocketStore());
const mapInfo = computed({
  get: () => {
    return useSocketStore().allCanvasMap.find((e) => currentScene.value?.relatedMapId === e._id);
  },
  set: (newData) => {
    if (!newData) return;

    const index = useSocketStore().allCanvasMap.findIndex(
      (e) => currentScene.value?.relatedMapId === e._id
    );

    if (index !== -1) {
      useSocketStore().allCanvasMap[index] = newData;
    }
  },
});

console.log("mapInfo", mapInfo.value);

function updateCanvasMapData(newData: CanvasMap) {
  mapInfo.value = newData;
  updateCanvasMap(newData, (_id) => {
    if (currentScene.value && !newData._id) {
      newData._id = _id;
      currentScene.value.relatedMapId = _id;
      updateSceneInfo(currentScene.value);
    }
  });
}

function updateCanvasLayer(newLayer: LayerInfo[]) {
  if (mapInfo.value) {
    updateCanvasMapData({ ...mapInfo.value, layers: newLayer });
  }
}

function changeMapInfo(e: Event, type: "width" | "height" | "gridSize" | "mapName") {
  if (!mapInfo.value) return;
  updateCanvasMapData({
    ...mapInfo.value,
    [type]: (e.target as HTMLInputElement).value,
  });
}
</script>

<style lang="less" scoped>
.right-bar {
  overflow-y: auto;
  padding-bottom: 40px;
}
.map-info-editor {
  input {
    width: 5em;
  }
}
</style>
