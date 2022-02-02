
import * as PIXI from 'pixi.js'
export function initApp(width,height,cellSize) {
  const app = new PIXI.Application({backgroundColor: 0x666666,width:width,height:height});
  app.stage.sortableChildren = true
  const loader = new PIXI.Loader()
  app.loader = loader
  loader.add([
    {name:"吟游诗人",url:"static/img/yysr.jpg"},
    {name:"术士",url:"static/img/术士.png"},
    {name:"圣骑士",url:"static/img/圣骑士.jpg"},
    {name:"背景地砖",url:"static/img/grass_128.jpg"},
  ])
  // loader.add("吟游诗人","@/assets/yysr.jpg")
  // loader.add("背景地砖","../../assets/grass_128.jpg")
  loader.load(()=>{
    let grassTexture = PIXI.Texture.from("背景地砖");
    const tilingSprite = new PIXI.TilingSprite(grassTexture,app.screen.width,app.screen.height)
    tilingSprite.zIndex = 0
    app.stage.addChild(tilingSprite)
  })

  //画网格且标坐标
  const graphics = new PIXI.Graphics()
  graphics.lineStyle(1, 0x999999, 1);
  for( let i = 0;i<width && i<height;i+=cellSize) {
    graphics.moveTo(0,i)
    graphics.lineTo(width,i)
    graphics.moveTo(i,0)
    graphics.lineTo(i,height)
  }
  app.stage.addChild(graphics)
  graphics.zIndex = 1

  // for( let i = 0;i<width; i+=50 ) {
  //   console.log(i)
  //   for ( let j = 0;j < height;j+=50) {
  //     console.log(i,j)
  //     const number = new PIXI.Text(`${i},${j}`,{fontSize:10})
  //     number.x = i
  //     number.y = j
  //     number.zIndex = 100
  //     app.stage.addChild(number)
  //   }
  // }
  return app
}