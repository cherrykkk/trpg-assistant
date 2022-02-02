<template>
  <div class="scene-card" @click="state.showDetail=!state.showDetail">
    <img class="url-arrow" src="@/assets/icon/more.svg" @click='openDetail()' />
    <div class="brief">
      {{$root.players[playerIndex].p_name}}
    </div>
    <div :class="['more',[state.showDetail? 'unfold':'fold']]">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:Object,
    playerIndex:Number
  },
  data() {
    return{
      state: {
        showDetail: false
      }
    }
  },
  methods:{
    openDetail(){
      this.$root.setPlayerIndex( this.playerIndex )
      this.$router.push({ path: '/player/Detail', query: { playerIndex:this.playerIndex } });
    }
  }
}

</script>

<style lang='less' scoped>

.scene-card {
  position: relative;
  min-height:50px;
  margin:20px 5px;
  box-shadow: 0px 0px 3px 1px;
  padding: 10px;
  .url-arrow {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .brief{
    width:90%;
    margin:0 auto;
  }
  .more{
    overflow: hidden;
    transition: 0.5s 0s;
  }
  .fold{
    max-height:0;
  }
  .unfold{
    max-height: 200px;
  }
}

</style>
