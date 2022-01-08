<template>
  <div class='bottom-bar'>
    <router-link :to="{path: '/Scene'}">场景</router-link>
    <router-link :to="{path: '/SpellBrowse'}">法术</router-link>
    <router-link :to="{path: '/EquipmentBrowse'}">装备</router-link>
    <router-link :to="{path: '/fight'}">战斗</router-link>
  </div>
</template>

<style scoped>
.bottom-bar{
  position: fixed;
  width:100%;
  height:40px;
  bottom:0;
  box-shadow: 0px 0px 3px 1px;
  background-color: white;
  z-index: 1;
}


</style>

