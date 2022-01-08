<template>
  <div class="fight-view"  @click="clickOnView">
    <canvas ref="pixiCanvas" class="pixi-canvas"></canvas>
  </div>
</template>
<script>
import * as PIXI from 'pixi.js'
import img from '@/assets/grass_128.jpg'
import img2 from '@/assets/yysr.jpg'
export default {
  data () {
    return {
      viewSize: {
        width: 400,
        height: 600
      },
      player: [
        {
          id: "",
          name: "天璇虺"
        },{
          id: "",
          name: "诸葛墨"
        }
      ],
      pixiCanvasHandler: {
        app: null,
        tilingSprite: null
      }
    }
  },
  mounted() {
    this.stageInit()
  },
  methods: {
    stageInit() {
      const { width,height} = this.viewSize
      const pixiCanvas = this.$refs.pixiCanvas
      const app = new PIXI.Application({view: pixiCanvas,backgroundColor: 0x666666,width:width,height: height});
      let grassTexture = PIXI.Texture.from(img);
      const tilingSprite = new PIXI.TilingSprite(grassTexture,app.screen.width,app.screen.height)
      this.pixiCanvasHandler.app = app
      this.pixiCanvasHandler.tilingSprite = tilingSprite
      this.pixiCanvasHandler.app.stage.addChild(tilingSprite)
      this.avatar()
    },
    avatar() {
      const { app } = this.pixiCanvasHandler
      const texture = PIXI.Texture.from(img2);
      const graphics = new PIXI.Graphics();
      const dude = new PIXI.Sprite(texture);
      dude.x = app.screen.width / 2;
      dude.y = app.screen.height / 2;
      dude.anchor.set(0.5)
      dude.height = 100
      dude.width = 100
      app.stage.addChild(dude);
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
      let x = 0, y = 0, step = 1
      if(direction == "left") {
        x = step
      }
      else if(direction == "right") {
        x = -step
      }
      else if(direction == "forward") {
        y = step
      }
      else if(direction == "backward") {
        y = -step
      }
      else {
        console.log("无此方向！")
      }
      const {tilingSprite} = this.pixiCanvasHandler
      // app.ticker.add(() => {
      //   tiling.tilePosition.y += y;
      // })
      tilingSprite.tilePosition.y += y
      tilingSprite.tilePosition.x += x
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
  .click-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>