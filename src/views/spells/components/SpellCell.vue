<template>
  <div class="spell-cell">
    <div class="spell-name" @click='state.showDetail=!state.showDetail'>
      <div v-if="state.showEnglishName">{{data.法术名称}}</div>
      <div v-if="!state.showEnglishName">{{data.法术名称.replace(/[a-zA-Z'’/]+/g, "")}}</div>
    </div>
    <div class='spell-body' :class="{'unfold':state.showDetail}">
      <div class='description'>
        <p>{{data.法术说明}}</p>
        <p>{{data.法术升阶}}</p>
      </div>
      <div class='limit'>
        <span>{{data.等级}}</span>
        <span>{{data.派系}}</span>
        <span>{{data.法术成分}}</span>
        <span>{{data.施法时间}}</span>
        <span>{{data.持续时间}}</span>
        <span>{{data.施法距离}}</span>
        <span v-if='data.豁免'>{{data.豁免}}</span>
        <span v-if='data.专注'>{{data.专注}}</span>
        <span v-if='data.仪式'>{{data.仪式}}</span>
      </div>
      <div class='career'>
        <span v-for='(item,i) in classArr' :key='i'>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    data:Object,
    adding:Boolean
  },
  data(){
    return{
      state: {
        showEnglishName: false,
        showDetail: false
      },
    }
  },
  computed:{
    classArr:function(){
      let classArr = ['圣武士','德鲁伊','术士','法师','游侠','牧师','诗人','邪术士']
      const that = this
      let result = classArr.filter(function(el){
          return that.data[el] != ""
      })
      return result
    }
  }
}
</script>

<style lang="less" scoped>
.spell-cell {
  display: flex;
  align-items: center;
  .spell-name {
    display: inline-block;
    padding:10px 20px;
    background-image: url("~@/assets/border7.png");
    background-size: 100% 100%;
    background-position: center;
  }
  .spell-body {
    display: none;
    z-index: -1;
    width:80%;
    padding:2px 2%;
    margin:auto;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px inset;
    margin: 2px;
    .description {
      margin: 0 10px;
      font-size: 10px;
      text-align: left;
      text-indent: 20px;
    }
    .career {
      width: 60px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      span {
        margin:0 2px;
        font-size: 12px;
        padding: 1px;
      }
    }
    .limit {
      display: flex;
      flex-direction: column;
      width: 60px;
      flex-shrink: 0;
      span {
        font-size: 12px;
        padding: 1px;
        border: 1px solid rgba(0,0,0,0.2);
      }
    }
  }
  .unfold{
    display: flex;
  }
}
</style>