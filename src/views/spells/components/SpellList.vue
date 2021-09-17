<template>
    <ul>
        <li v-for="(item,i) in filterSpells" :key='i' class='spellCard'>
           <spell-cell :data='item'></spell-cell>
        </li>
    </ul>
</template>

<script>
import SpellCell from './SpellCell'
export default {
    components: { SpellCell },
    props:{
        filterType:String,
        spellName:String,
        classTag:String,
        schoolTag:String
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
    computed:{
        filterSpells: function () {
            let filtered = this.originDictionary;
            let filterType = this.filterType

            if(this.spellName){
				let searchString = this.spellName.trim().toLowerCase();
				filtered = filtered.filter(function(item){
					if(item['法术名称'].toLowerCase().indexOf(searchString) !== -1){
						return item;
					}
				})
            }
            else if(filterType=="classTag"){
                let classTag = this.classTag.trim().toLowerCase();
				filtered = filtered.filter(function(item){
					if(item[classTag]){
						return item;
					}
				})
            }
            else if(filterType=="schoolTag"){
                let schoolTag = this.schoolTag.trim().toLowerCase();
				filtered = filtered.filter(function(item){
					if(item["派系"]==schoolTag){
						return item;
					}
				})
            }
			else{
                return filtered
            }
            // 返回过来后的数组
            return filtered;
        }
    }
}
</script>

<style scoped>
ul{
}
</style>