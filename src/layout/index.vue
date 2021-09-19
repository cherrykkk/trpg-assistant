<template>
  <div class='layout'>
    <top-bar></top-bar>
    <router-view />
  </div>
</template>

<script>
import TopBar from './TopBar/TopBar.vue'

export default {
  components:{
    TopBar
  }
}

</script>


<style>
.layout{
  position: relative;
  height:100%;
  width:100%;
  box-shadow: 0px 0px 3px 1px;
}
</style>
