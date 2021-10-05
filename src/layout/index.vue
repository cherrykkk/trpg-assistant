<template>
  <div class='layout'>
    <bottom-bar></bottom-bar>
    <router-view />
  </div>
</template>

<script>
import BottomBar from './BottomBar.vue'

export default {
  components:{
    BottomBar
  }
}
</script>

<style>
.layout{
  position: relative;
  margin:5% 0 0 0;
  height:95%;
  width:100%;
}
</style>
