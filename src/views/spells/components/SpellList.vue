<template>
  <ul>
    <li v-for="(item,i) in filterSpells" :key='i' class='spellCard'>
      <spell-cell :data='item' :adding='adding' @click.native='addSpell(item)'></spell-cell>
    </li>
  </ul>
</template>

<script>
import SpellCell from '@/views/components/SpellCell.vue'
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
      let filtered = this.originDictionary;
      let searching = this.provisoSearching
      let titleMap = {
        spellName: "法术名称",
        "职业": "职业",
        "学派": "派系"
      }
      let filterTitle = titleMap[this.provisoTitle]
      filtered = filtered.filter(function(item){
        if( 
          (item[filterTitle]&&item[filterTitle]==searching) || 
          item[searching] ||
          item['法术名称'].toLowerCase().indexOf(searching)!=-1
        ){
          console.log( item['法术名称'].toLowerCase().indexOf(searching),searching)
          return item;
        }
      })
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