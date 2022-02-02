<template>
  <div class="ability-board">
    <div v-for='(e,i) in ability' :key='i' class="ability-card">
      <img :src="e.icon" />
      <div class="number">{{characterData[e.name]}}</div>
      <div class="name">{{e.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    characterData: Object
  },
  data () {
    return {
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
  }
}
</script>
<style lang="less" scoped>
.ability-board {
  display: flex;
  justify-content: space-around;
  .ability-card {
    .number {
      font-size: 14px;
    }
    .name {
      display: none;
      position: absolute;
      right: 0;
    }
    &:hover {
      .name {
        display: block;
      } 
    } 
  }
}
</style>