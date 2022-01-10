<template>
  <div class="scene-switch">
    <div v-for="(e,i) in moduleData.scene" :key="i">
      <div>{{e.title}}</div>
    </div>
  </div>
</template>

<script>
import PlayerCard from './cards/PlayerCharacter.vue'
import NonPlayerCard from './cards/NonPlayerCharacter.vue'

export default {
  components:{
    PlayerCard,
    NonPlayerCard
  },
  data () {
    return {
      moduleConfig: {
        scene: []
      },
      moduleData: {
        scene: [{
          title: "狮盾商会",
          npc: ["利涅涅·灰风"],
          task: ["失而复得的武器"]
        },{
          title: "石丘旅社",
          npc: ["托布雷·石丘"]
        }]
      }
    }
  },
  created() {
    fetch('http://localhost:3000/nonPlayerCharacter?id=1,2').then(res=>res.json())
    .then(res=>{
      this.moduleData.nonPlayerCharacter = res
    })
  }
}
</script>
<style lang="less" scoped>
.scene-view {
  padding-bottom: 40px;
  .player-character-board {
    width: 300px;
  }
  .non-player-character-board {
    width: 300px;
  }
}
</style>
