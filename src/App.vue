<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import layout from "@/layout/index.vue"
export default {
  components:{
    layout
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
#app ul{
  list-style-type: none;
  padding-inline-start: 0;
  margin:0;
}

.shadowStyle{
   box-shadow: 0px 0px 30px 1px;
}

.search-able{
  cursor: pointer;
}


</style>
