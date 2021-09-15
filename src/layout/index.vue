<template>
  <div class='layout'>
    <router-view/>
    <extend-description ></extend-description>
    <div style="display:none" ref='word'>无选择</div>
  </div>
</template>

<script>
import ExtendDescription from '@/components/ExtendDescription.vue'
export default {
    components:{
        ExtendDescription
    }
}
</script>

<style>
.layout{
  position: relative;
  height:100%;
  width:100%;
}
</style>
