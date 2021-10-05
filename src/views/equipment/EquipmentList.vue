<template>
    <ul>
        <li v-for="(item,i) in filtered" :key='i' class='spellCard'>
            <span v-if='item.武器名称'>{{item.武器名称}}</span>
        </li>
    </ul>
</template>

<script>
import DescriptionCtl from '@/views/components/description/DescriptionCtl.vue'
export default {
    components: { DescriptionCtl },
    props:{
        filterType:String,
        spellName:String,
        classTag:String,
        schoolTag:String,
        adding:Boolean
    },
    data(){
        return{
            originDictionary:[],
            weaponDictionary:[],
            armorDictionary:[]
        }
    },
    mounted(){
        const that = this
        fetch('../api/equipment.json')
            .then(response => response.json())
            .then(response=>{
                this.originDictionary = response
                this.weaponDictionary = response.weapon
                this.armorDictionary = response.armor
            })
    },
    methods:{
        addSpell(item){
            this.$emit('addSpell',item)
        },
    },
    computed:{
        filtered: function () {
            let filtered
            if(filterType == 'armor')
                filtered = this.armorDictionary;
            else
                filtered = this.weaponDictionary;
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