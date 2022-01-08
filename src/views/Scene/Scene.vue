<template>
  <div class="scene-view">
    <div class='players'>
      <player-card v-for='(item,index) in $root.players' :key='index'
        :playerIndex="index">
      </player-card>
    </div>
  </div>
</template>

<script>
import PlayerCard from './cards/Player.vue'

export default {
  components:{
    PlayerCard
  }
}
</script>
<style lang="less" scoped>
.scene-view {
  .players {
    width: 300px;
  }
}
</style>
