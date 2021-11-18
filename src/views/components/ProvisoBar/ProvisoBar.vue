<template>
  <div class="proviso-bar">
    <div v-for="(e,i) in option" :key="i" class="tab">
      <div class="title" :class="{'title-actived':i==activedIndex}" @click="activeTab(i)">{{e.title}}</div>
      <div v-if="i==activedIndex && e.type=='text-input'" class="radio-panel">
        <input v-model="e.searching" @change="activeSearching()"/>
      </div>
      <div v-if="i==activedIndex && e.type=='radio'" class="radio-panel">
        <div v-for="(e2,i2) in e.data" :key="i2" class="radio" :class="{'radio-actived':e2==e.searching}" @click="activeSearching(i2)">{{e2}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import OPTION from "./ProvisoBar.js"
export default {
  name: 'SpellEdit',
  props: ["usage"],
  data () {
    return {
      filterType:"",
      option: OPTION[this.usage],
      activedIndex: 0
    }
  },
  methods:{
    activeTab(index){
      this.activedIndex = index
    },
    activeSearching(index){
      if( ! this.option[this.activedIndex].searching )
        this.$set(this.option[this.activedIndex],"searching","")
      if( this.option[this.activedIndex].type=="radio"){
        this.option[this.activedIndex].searching = this.option[this.activedIndex].data[index]
      }
      this.search()
    },
    search(){
      let provisoConfig = {
        title: this.option[this.activedIndex].title, 
        type:  this.option[this.activedIndex].type,
        searching: this.option[this.activedIndex].searching
      }
      console.log("正在搜索",provisoConfig)
      this.$emit('provisoChange',provisoConfig)
    },
    filterTypeChange(changeType){
      this.filterType = changeType
      this.reSearch()
    }
  }
}
</script>

<style lang='less' scoped>
.proviso-bar {
  background-color: white;
  width:100%;
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 0px 3px 1px;
  .tab {
    .title{
      padding: 5px;
    }
    .title-actived{
      border-bottom: 2px solid black;
    }
    .radio-panel {
      position: absolute;
      left: 0;
      width: 100%;
      background-color: white;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      box-shadow: 0px 3px 3px -3px;
      padding: 10px 0;
      .radio {
        padding:2px 5px;
      }
      .radio-actived {
        border-bottom: 1px solid black;
      }
    }
  }
}
</style>