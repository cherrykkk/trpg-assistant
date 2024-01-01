<template>
  <div class="map-info-editor">
    <h5>图层</h5>
    <LayerEditor v-if="mapInfo" :layer-list="mapInfo.layers" />
    <h5>画布尺寸</h5>
    <input :value="mapInfo?.width" @blur="mapInfo.width = Number(getInputValue($event))" />x<input
      :value="mapInfo?.height"
      @blur="mapInfo.height = Number(getInputValue($event))"
    />
    <h5>网格尺寸</h5>
    <input
      type="number"
      :value="mapInfo?.gridSize"
      @input="mapInfo.gridSize = Number(getInputValue($event))"
    />
    <h5>沙盘名</h5>
    <input :value="mapInfo?.mapName" @input="mapInfo.mapName = getInputValue($event)" />
  </div>
</template>
<script lang="ts" setup>
import LayerEditor from "./LayerEditor.vue";
import { mapInstance as mapInfo } from "./store";

function getInputValue(e: Event) {
  return (e.target as HTMLInputElement).value;
}
</script>
