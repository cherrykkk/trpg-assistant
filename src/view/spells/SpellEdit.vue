<template>
    <div class="page">
        <div class='close-btn' v-on:click='returnMain()'>×</div>
        <player-bag :bag='$route.query.bag'></player-bag>
        <div class="selectBar">
            <input type="text" v-model="dictionarySearchString" placeholder="输入搜索内容" />
        </div>
        <spell-list :showList="filterDictionary"></spell-list>
    </div>
</template>

<script>
import DICTIONARY from '@/dictionary.json'
import PlayerBag from './components/PlayerBag.vue'
import SpellList from './components/SpellList.vue'
export default {
    name: 'SpellEdit',
    components:{
        PlayerBag,
        SpellList
    },
    data () {
        return {
            dictionarySearchString:''
        }
    },
    created(){
    },
    mounted(){
    },
    methods:{
        returnMain(){
            this.$router.push({ path: '/'});
        }
    },
    computed:{
        filterDictionary: function () {
            let e_array = DICTIONARY.spell_dictionary;
            let searchString = this.dictionarySearchString;
			let selected = this.selected;

            if(!searchString && !selected){
				return e_array;
            }
			else if(!searchString && selected){
				e_array = e_array.filter(function(item){
					if(item.e_type.toLowerCase().indexOf(selected) !== -1){
						return item;
					}
				})
			}
			else{
				searchString = searchString.trim().toLowerCase();

				e_array = e_array.filter(function(item){
					if(item.s_name.toLowerCase().indexOf(searchString) !== -1){
						return item;
					}
				})
            }
            // 返回过来后的数组
            return e_array;
        },
    }
}
</script>

<style scoped>
.page{
    display:flex;
    flex-direction:column;
    border: medium double rgb(250,0,255);
}
.exitButton{
    position: fixed;
    bottom: 0;
    background-color: white;
    margin: 0 auto;
    padding: 10px;
}
</style>