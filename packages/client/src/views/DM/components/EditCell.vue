<template>
  <el-input
    class=""
    v-if="typeof modelValue === 'string'"
    :modelValue="modelValue"
    @input="$emit('update:modelValue', $event)"
  >
    <template #prepend>
      {{ prefix }}
    </template>
  </el-input>
  <div v-else class="input-number-cell">
    <span>{{ prefix }}</span>
    <el-input-number :modelValue="modelValue" @input="$emit('update:modelValue', $event)" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  prefix: String,
  modelValue: [String, Number],
});

defineEmits(["update:modelValue"]);
</script>

<style lang="less" scoped>
.el-input {
  width: auto;
  margin: 4px 10px;
}

.input-number-cell {
  display: inline-block;
  margin: 4px 10px;
  span {
    margin-right: 6px;
  }
}
</style>
