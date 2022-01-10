<template>
  <div class='non-player-character-view' v-if='data.name'>
    <img class="url-arrow" src="@/assets/icon/goBack_32.svg" @click='$router.go(-1)' />
    <div class="character-name">{{data.name}}</div>
    <div class="character-basic">
      {{data.race}}
      {{data.sex}}
      {{data.class}}
    </div>
    <div class="character-story">
      <div class="ability-board" v-if="data.ability">
        <div v-for='(e,i) in ability' :key='i'>
          <img :src="e.icon" />
          <div class="number"></div>
        </div>
      </div>
    </div>
    <div class="description">
      <p v-for="(e,i) in data.description" :key="i">{{e}}</p>
    </div>
    <div class="task-board">
      <div v-for="(e,i) in data.task" :key="i">
        <b>{{e.title}}</b>
        <div>{{e.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      data: {}
    }
  },
  created() {
    const id = this.$route.query.id
    fetch('http://localhost:3000/nonPlayerCharacter?id='+id).then(res=>res.json())
    .then(data=>{
      this.data = data[0]
    })
  },
  methods: {
  },
  watch:{
    '$root.refresh': {
      handler() {
        this.player = this.$root.getPlayer()
      },
      immediate: true
    }
  }
}
</script>

<style lang='less' scoped>
.container{
  position: relative;
  width:90%;
  margin:0 auto;
  li{
    padding:10px;
    box-shadow: 0px 0px 3px 1px;
  }
}
</style>