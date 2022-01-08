<template>
  <ul>
    <li v-for="(item,i) in filterSpells" :key='i' class='spellCard'>
      <spell-cell :data='item' :adding='adding' @click.native='addSpell(item)'></spell-cell>
    </li>
  </ul>
</template>

<script>
import SpellCell from './SpellCell.vue'
import {filteredSpell} from "@/views/components/filter.js"
export default {
  components: { SpellCell },
  props:{
    adding:Boolean,
    provisoType: String,
    provisoTitle: String,
    provisoSearching: String,
  },
  data(){
    return{
      originDictionary:[]
    }
  },
  mounted(){
    const that = this
    this.$axios.get('../api/spellDescription.json')
        .then(function (response) {
            that.originDictionary = response.data
        })
        .catch(function (error) {
            console.log(error);
        });
  },
  methods:{
    addSpell(item){
      this.$emit('addSpell',item)
    },
  },
  computed:{
    filterSpells: function () {
      if( !(this.provisoType&&this.provisoTitle)) return
      
      let filtered = filteredSpell(this.originDictionary,this.provisoType,this.provisoTitle,this.provisoSearching)
      //按环排
      filtered.sort(function(a,b){ 
          return a['等级']-b['等级'] 
      });
      // 返回过来后的数组
      return filtered;
    }
  }
}
</script>