<template>
  <div class="page">
    <proviso-bar class="proviso-bar" @provisoChange='setProvisoArgs' usage="装备"></proviso-bar>
    <ul>
      <li v-for="(item,i) in filtered" :key='i' class='spellCard'>
        <description-ctl :data='item'></description-ctl>
      </li>
    </ul>
    <!-- <equipment-list class='list'
      :filterType="provisoArgs.filterType"></equipment-list> -->
  </div>
</template>

<script>
import EquipmentList from './EquipmentList.vue'
import ProvisoBar from '@/views/components/ProvisoBar/ProvisoBar.vue'
import DescriptionCtl from '@/views/components/description/DescriptionCtl.vue'
import {filteredEquipment} from "@/views/components/filter.js"
export default {
  components:{
    EquipmentList,
    ProvisoBar,
    DescriptionCtl
  },
  data() {
    return {
      provisoArgs: {},
      filtered: null,
      originDictionary: null
    }
  },
  created(){
    fetch('../api/equipment.json')
    .then(response => response.json())
    .then(response=>{
      this.originDictionary = response
    })
  },
  methods:{
    setProvisoArgs(args){
      this.provisoArgs = args
      this.filtered = filteredEquipment(this.originDictionary,this.provisoArgs.type,this.provisoArgs.title,this.provisoArgs.searching)
    },
  },
}
</script>

<style lang="less" scoped>
.page{
  position: absolute;
  height:100%;
  width:100%;
  .proviso-bar {
    position: fixed;
    top: 0;
  }
}

</style>