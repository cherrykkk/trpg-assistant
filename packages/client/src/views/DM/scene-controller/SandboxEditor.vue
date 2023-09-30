<template>
  <SandboxMap :map-info="mapInfo" :editable="true" @change="updateCanvasMapData"></SandboxMap>
  <div>
    <RightBar v-if="currentScene" :scene="currentScene" />
    <LayerEditor v-if="mapInfo" :layer-list="mapInfo.layers" @change="updateCanvasLayer" />
  </div>
</template>
<script lang="ts" setup>
import SandboxMap from "@trpg/components/sandbox-canvas/SandboxMap.vue";
import LayerEditor from "@trpg/components/sandbox-canvas/LayerEditor.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSocketStore } from "@/stores/useSocketStore";
import RightBar from "./RightBar.vue";
import type { CanvasMap, LayerInfo } from "@trpg/shared";
import { updateCanvasMap, updateSceneInfo } from "@/api/socket-tasks";

const { currentScene } = storeToRefs(useSocketStore());
const existedMap = useSocketStore().allCanvasMap.find(
  (e) => currentScene.value?.relatedMapId === e._id
);

const mapInfo = ref(existedMap);

function updateCanvasMapData(newData: CanvasMap) {
  mapInfo.value = newData;
  updateCanvasMap(newData, (_id) => {
    if (currentScene.value && !newData._id) {
      newData._id = _id;
      currentScene.value.relatedMapId = _id;
      updateSceneInfo(currentScene.value?._id, currentScene.value);
    }
  });
}

function updateCanvasLayer(newLayer: LayerInfo[]) {
  if (mapInfo.value) {
    updateCanvasMapData({ ...mapInfo.value, layers: newLayer });
  }
}
</script>

<style lang="less" scoped>
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
