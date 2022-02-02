<template>
  <div class="scene-view">
    <fixed-board class='non-player-character-board' :globalStyleConfig='styleConfig' :index='0'>
      <non-player-card v-for='(item,index) in moduleData.nonPlayerCharacter' :key='index' :data="item">
      </non-player-card>
    </fixed-board>
    <fixed-board class='non-player-character-board' :globalStyleConfig='styleConfig' :index='1'>
      <player-card v-for='(item,index) in $root.players' :key='index' :playerIndex="index">
      </player-card>
    </fixed-board>
    <fixed-board class="scene-board" :globalStyleConfig='styleConfig' :index='2'>
      <single-scene v-for="(item,index) in moduleData.scene" :key="index" :data="item"></single-scene>
    </fixed-board>
  </div>
</template>

<script>
import PlayerCard from './cards/PlayerCharacter.vue'
import NonPlayerCard from './cards/NonPlayerCharacter.vue'
import FixedBoard from './FixedBoard.vue'

export default {
  components:{
    PlayerCard,
    NonPlayerCard,
    FixedBoard
  },
  data () {
    return {
      moduleConfig: {
        nonPlayerCharacter: "1,2,3,4,5,6,7,8",
        players: null,
        scene: "1"
      },
      moduleData: {
        nonPlayerCharacter: null,
        players: null,
        scene: null,
      },
      styleConfig: [
        [10,20],[10,20],[10,20]
      ],
      memoStyleConfig: {
        pcBoard: {
          x: "10px",
          y: "20px"
        },
        npcBoard: {
          x: "30px",
          y: "40px"
        },
        sceneBoard: {
          x: "30px",
          y: "40px"
        }
      }
    }
  },
  created() {
    //获取 npc 数据
    fetch('http://localhost:3000/nonPlayerCharacter?id='+this.moduleConfig.nonPlayerCharacter).then(res=>res.json())
    .then(res=>{
      this.moduleData.nonPlayerCharacter = res
    })
    // fetch('http://localhost:3000/scene?id='+this.moduleConfig.scene).then(res=>res.json())
    // .then(res=>{
    //   this.moduleData.scene = res
    // })
    // 获取布局配置
    const memoStyleConfig = localStorage.getItem("memoStyleConfig")
    if(memoStyleConfig) {
      console.log(memoStyleConfig)
      this.styleConfig = JSON.parse(localStorage.getItem("memoStyleConfig"))
    }
  },
  methods: {
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
    width: 200px;
  }
}
</style>
