<template>
  <div class="scene-view">
    <fixed-board class='player-character-board' title="pcBoard" :x='memoStyleConfig.pcBoard.x' :y='memoStyleConfig.pcBoard.y' :setStyleConfig='setStyleConfig'>
      <player-card v-for='(item,index) in $root.players' :key='index'
        :playerIndex="index">
      </player-card>
    </fixed-board>
    <fixed-board class='non-player-character-board' title='npcBoard' :x='memoStyleConfig.npcBoard.x' :y='memoStyleConfig.npcBoard.y' :setStyleConfig='setStyleConfig'>
      <non-player-card v-for='(item,index) in moduleData.nonPlayerCharacter' :key='index'
        :data="item">
      </non-player-card>
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
        nonPlayerCharacter: "1,2,3",
        players: null,
      },
      moduleData: {
        nonPlayerCharacter: null,
        players: null,
      },
      memoStyleConfig: {
        pcBoard: {
          x: "10px",
          y: "20px"
        },
        npcBoard: {
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
    // 获取布局配置
    this.memoStyleConfig = JSON.parse(localStorage.getItem("memoStyleConfig"))
  },
  methods: {
    setStyleConfig(boardName,x,y) {
      this.memoStyleConfig[boardName].x = x
      this.memoStyleConfig[boardName].y = y
      localStorage.setItem("memoStyleConfig",JSON.stringify(this.memoStyleConfig))
    },
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
