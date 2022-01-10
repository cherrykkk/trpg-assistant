<template>
  <div class="fixed-board" :style='position'>
    <img src="@/assets/icon/fixedNail_16.svg" @drag="move"  />
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    x: String,
    y: String,
    setStyleConfig: Function
  },
  data () {
    return {
      position: {
        left: "0",
        top: "0"
      }
    }
  },
  created () {
    if(this.x&&this.y) {
      console.log("已读取缓存数据 ",this.position.left,this.position.top)
      this.position.left = this.x 
      this.position.top = this.y
    }
  },
  mounted() {
    console.log("mounted,see props",this.x,this.y,this.setStyleConfig)
  },
  methods: {
    move(e) {
      if(e.clientX+e.clientY != 0) {//过滤最后一下的drag事件
        this.position.left = e.clientX+'px'
        this.position.top = e.clientY+'px'
        const setStyleConfig = this.setStyleConfig
        setStyleConfig(this.title,e.clientX+'px',e.clientY+'px')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.fixed-board {
  position: fixed;
  top: 0;
  padding: 4px;
  border-radius: 10px;
  border: 1px solid black;
  img {
    position: absolute;
    left: 1px;
    top: 1px;
    transition: 0.3s;
  }
  img:hover {
    transform: scale(2);
    left: -1px;
    top: -1px;
  }
}
</style>