
import * as PIXI from 'pixi.js'

export function createPlayer(pInfo,SIZE) {
  if( !pInfo.p_class)
    return 
  let texture = PIXI.Texture.from(pInfo.p_class);
  if(!texture.valid) {
    console.log("暂无图片资源：",pInfo.p_class,"将启用默认替代头像")
    texture = PIXI.Texture.from("吟游诗人");
  }
  const player = new PIXI.Sprite(texture);
  player.x = pInfo.x*SIZE
  player.y = pInfo.y*SIZE
  // player.anchor.set(0.5)
  player.height = SIZE
  player.width = SIZE
  player.zIndex = 3
  return player
}