<template>
  <div class="non-player-card" @click="state.showDetail=!state.showDetail">
    <div class="button-detail" @click='openDetail()'>
      <img class="url-arrow" src="@/assets/icon/more.svg" />
    </div>
    <div class="npc-name">
      {{data.name}}
    </div>
    <div class="npc-title">
      <div v-for="(e,i) in data.title" :key="i">{{e}}</div>
    </div>
    <div :class="['more',[state.showDetail? 'unfold':'fold']]">
      {{data.race}}
      {{data.sex}}
      {{data.class}}
      <div class="description">
        <p v-for="(e,i) in data.description" :key="i">{{e}}</p>
      </div>
      <div class="ability-board">
        <div v-for='(e,i) in ability' :key='i'>
          <img :src="e.icon" />
          <div class="number"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    data: Object,
    playerIndex: Number
  },
  data() {
    return{
      state: {
        showDetail: false
      },
      ability: [
        {
          name: "strength",
          icon: require('@/assets/icon/ability_strength.svg')
        },{
          name: "dexterity",
          icon: require('@/assets/icon/ability_dexterity.svg')
        },{
          name: "constitution",
          icon: require('@/assets/icon/ability_constitution.svg')
        },{
          name: "intelligence",
          icon: require('@/assets/icon/ability_intelligence.svg')
        },{
          name: "wisdom",
          icon: require('@/assets/icon/ability_wisdom.svg')
        },{
          name: "charisma",
          icon: require('@/assets/icon/ability_charisma.svg')
        },
      ]
    }
  },
  methods:{
    openDetail(){
      this.$router.push({ path: '/character/nonPlayerCharacter', query: { id: this.data.id } });
    }
  }
}

</script>

<style lang='less' scoped>

.non-player-card {
  position: relative;
  margin:10px 5px;
  box-shadow: 0px 0px 3px 1px;
  padding: 10px;
  border-radius: 20px;
  .button-detail {
    position: absolute;
    right: 0;
    height: 100%;
    width: 20px;
    top: 0;
    border-radius: 0 21px 21px 0;
    cursor: pointer;
    .url-arrow {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      background: rgba(0,0,0,0.2);
    }
  }
  .npc-title {
    font-size: 12px;
  }
  .npc-title{
    width:90%;
    margin:0 auto;
    display: flex;
    div {
      padding: 0 2px;
    }
  }
  .more{
    overflow: hidden;
    transition: 0.5s 0s;
    .description {
      font-size: 10px;
      text-align: left;
      white-space: nowrap;
    }
  }
  .fold{
    max-height:0;
  }
  .unfold{
    max-height: 300px;
  }
  .ability-board {
    display: flex;
    justify-content: space-around;
    .number {
      font-size: 14px;
    }
  }
}

</style>
