<template>
  <div @click="handleStartEdit" v-if="!isEditing" class="tap-to-edit-description" >
    <span v-if="modelValue === ''" style="color: #ccc">点此编辑</span>
    <span>{{ modelValue }}</span>
  </div>
  <el-input v-show="isEditing"  size="small" :modelValue="modelValue" ref="inputRef"
    @input="handleInput" @blur="()=>isEditing=false" />
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);

function handleInput(event:string) {
  emits('update:modelValue', event)
}

const isEditing = ref(false)

const inputRef = ref()
function handleStartEdit() {
  isEditing.value = true
  inputRef.value?.focus()
}
</script>
  
<style lang="less" scoped>
.el-input {
  width: auto;
}
.tap-to-edit-description {
  cursor: pointer;
  color: #999;
}
</style>
  