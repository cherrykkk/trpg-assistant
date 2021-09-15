<template>
    <div class="page">
        <div class='close-btn' v-on:click='returnMain()'>×</div>
        <player-bag :bag='$route.query.bag'></player-bag>
        <div class="selectBar">
            <input type="text" v-model="search" placeholder="输入搜索内容" />
        </div>
        <spell-list :showList="filterSpells"></spell-list>
    </div>
</template>

<script>
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
            search:'',
            dictionary:[]
        }
    },
    created(){
    },
    mounted(){
        const that = this
        this.$axios.get('/api/spellDescription.json')
            .then(function (response) {
                console.log(response.data);
                that.dictionary = response.data
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods:{
        returnMain(){
            this.$router.push({ path: '/'});
        }
    },
    computed:{
        filterSpells: function () {
            let filtered = this.dictionary;
            let searchString = this.search;
			// let selected = this.selected;
            let selected = null

            if(!searchString && !selected){
				return filtered;
            }
			// else if(!searchString && selected){
			// 	filtered = filtered.filter(function(item){
			// 		if(item.e_type.toLowerCase().indexOf(selected) !== -1){
			// 			return item;
			// 		}
			// 	})
			// }
			else{
				searchString = searchString.trim().toLowerCase();

				filtered = filtered.filter(function(item){
					if(item['法术名称'].toLowerCase().indexOf(searchString) !== -1){
						return item;
					}
				})
            }
            // 返回过来后的数组
            return filtered;
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