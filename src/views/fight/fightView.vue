<template>
  <div class="fight-view" ref="fightView">
    <div class="character-list">
      角色信息
      <div class="player-card" v-for="(e,i) in  $root.players" :key="i" :playerData='e' @click="chooseCharacter(e)">
        {{e.p_name}}
      </div>
    </div>
    <div class="detail-panel">
      详细面板
      <div>{{chosenCharacter.p_name}}</div>
      <div>
        血量{{chosenCharacter.p_HP}}
      </div>
       <div>
        {{chosenCharacter.p_race}}
        {{chosenCharacter.p_sex}}
        {{chosenCharacter.p_class}}
        <ability-board :characterData='chosenCharacter'></ability-board>
      </div>
      <div>当前位置：[{{chosenCharacter.x}},{{chosenCharacter.y}}]</div>
      <div class="direction-board">
        <div @click="move('forward')" class="forward"></div>
        <div @click="move('backward')" class="backward"></div>
        <div @click="move('left')" class="left"></div>
        <div @click="move('right')" class="right"></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as PIXI from 'pixi.js'
import { initApp } from './initApp.js'
import { createPlayer } from './createPlayer.js'
import AbilityBoard from './AbilityBoard.vue'
export default {
  components: {
    AbilityBoard
  },
  data () {
    return {
      viewSize: {
        width: 400,
        height: 400,
        cellSize: 20
      },
      player: [
        {
          id: "",
          name: "天璇虺",
          class: "吟游诗人",
          x: 100,
          y: 10
        },{
          id: "",
          name: "诸葛墨",
          class: "吟游诗人",
          x: 10,
          y: 10
        }
      ],
      pixiHandler: {
        app: null
      },
      chosenCharacter: {}
    }
  },
  mounted() {
    this.stageInit()
  },
  methods: {
    stageInit() {
      const { width,height,cellSize} = this.viewSize
      const app = initApp(width,height,cellSize)
      this.$refs.fightView.appendChild(app.view)
      this.pixiHandler.app = app
      app.loader.load(()=>{
        for( const pInfo of this.$root.players ) {
          if( !(pInfo.x && pInfo.y)) {
            pInfo.x = pInfo.y = 10
          }
          const player = createPlayer(pInfo,cellSize)
          pInfo.sprite = player
          app.stage.addChild(player)
        }
      })
    },
    chooseCharacter(character) {
      console.log(character)
      this.chosenCharacter = character
    },
    clickOnView(event) {
      const { width,height } = this.viewSize
      const { clientX : x, clientY : y } = event
      if( x > width/3 && x < width/3*2 ) {
        if( y < height/2 ) {
          this.move("forward")
        }
        else {
          this.move("backward")
        }
      }
      if( y > height/3 && y < height/3*2 ) {
        if( x < width/2 ) {
          this.move("left")
        }
        else {
          this.move("right")
        }
      }
    },
    move(direction) {
      console.log(direction)
      const character = this.chosenCharacter
      if(!this.chosenCharacter.p_name) {
        console.log("请选择角色再移动")
        return
      }
      if( character.x&&character.y ) {
        let x = 0, y = 0, step = 1
        if(direction == "left") {
          x = -step
        }
        else if(direction == "right") {
          x = step
        }
        else if(direction == "forward") {
          y = -step
        }
        else if(direction == "backward") {
          y = step
        }
        else {
          console.log("无此方向！")
        }
        character.sprite.x += x*this.viewSize.cellSize
        character.sprite.y += y*this.viewSize.cellSize
      }
      else {
        console.log("初始化角色至[10,10]")
        character.x = 10
        character.y = 10
      }
    }
  }
}
</script>
<style lang="less" scoped>
.fight-view {
  position: relative;
  .pixi-canvas {
    pointer-events: none;
  }
  .character-list {
    position: absolute;
    left: 0;
    width: 200px;
    .player-card {
      position: relative;
      margin:10px 5px;
      box-shadow: 0px 0px 2px 2px;
      padding: 10px;
      &:hover {
        box-shadow: 0 0 3px 1px;
      }
    }
  }
  .detail-panel {
    position: absolute;
    right: 0;
  }
  .direction-board {
    position: relative;
    width: 100px;
    height: 100px;
    div {
      position: absolute;
      width: 40px;
      height: 40px;
      background-color: red;
    }
    .forward {
      left: 30px;
      top: 0;
    }
    .backward {
      left: 30px;
      bottom: 0;
    }
    .left {
      left: 0;
      top: 30px;
    }
    .right {
      right: 0;
      top: 30px;
    }
  }
}

</style>
