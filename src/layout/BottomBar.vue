<template>
  <div class='bottom-bar'>
    <router-link :to="{path: '/memo'}">便签</router-link>
    <router-link :to="{path: '/sceneSwitch'}">场景</router-link>
    <router-link :to="{path: '/SpellBrowse'}">法术</router-link>
    <router-link :to="{path: '/EquipmentBrowse'}">装备</router-link>
    <router-link :to="{path: '/fight'}">战斗</router-link>
  </div>
</template>

<style lang="less" scoped>
.bottom-bar{
  position: fixed;
  width:100%;
  bottom:0;
  box-shadow: 0px 0px 3px 1px;
  background-color: white;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  a {
    width: 400px;
    text-decoration: none;
    height:40px;
    line-height: 40px;
    color: black;
  }
  a:hover {
    background-color: rgba(0,0,0,0.2)
  }
}


</style>

