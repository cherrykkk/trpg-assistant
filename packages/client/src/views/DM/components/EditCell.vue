<template>
  <template v-if="styleType === 'textLine'">
    <el-input
      class="text-line-input"
      :modelValue="modelValue"
      @input="$emit('update:modelValue', $event)"
    />
  </template>
  <template v-else>
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
</template>

<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  prefix: String,
  modelValue: [String, Number],
  styleType: { type: String as PropType<"textLine" | "rectBlock">, default: "rectBlock" },
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
  white-space: nowrap;
  span {
    margin-right: 6px;
  }
}

.text-line-input {
  display: block;
  border: none;
}
</style>
