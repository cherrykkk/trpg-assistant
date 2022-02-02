<template>
  <div class="fixed-board" :style='position'>
    <img src="@/assets/icon/fixedNail_16.svg" @drag="move"  />
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    index: Number,
    globalStyleConfig: Array
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
    const x = this.globalStyleConfig[this.index][0]
    const y = this.globalStyleConfig[this.index][1]
    if( x&&y ) {
      this.position.left = x + 'px' 
      this.position.top = y + 'px'
    }
  },
  methods: {
    move(e) {
      const { index } = this
      if(e.clientX+e.clientY != 0) {//过滤最后一下的drag事件
        this.position.left = e.clientX+'px'
        this.position.top = e.clientY+'px'
        const newStyleConfig = this.globalStyleConfig.slice(0) //数组深拷贝
        newStyleConfig[index] = [e.clientX,e.clientY]
        localStorage.setItem("memoStyleConfig",JSON.stringify(newStyleConfig))
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