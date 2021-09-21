<template>
    <div class="page">
        <spells-bag></spells-bag>
        <proviso-bar @provisoChange='setProvisoArgs'></proviso-bar>
        <spell-list 
         :filterType="provisoArgs.filterType"
         :spellName="provisoArgs.searchString"
         :schoolTag="provisoArgs.schoolTag"
         :classTag="provisoArgs.classTag"
         :operable="true"
         @addSpell='addSpell'></spell-list>
    </div>
</template>

<script>
import SpellList from './components/SpellList.vue'
import ProvisoBar from './components/ProvisoBar.vue'
import SpellsBag from '@/views/components/SpellsBag.vue'
export default {
    components:{
        SpellList,
        ProvisoBar,
        SpellsBag
    },
    data() {
        return {
            provisoArgs:{},
            spellsBag:[],
            player:{},
            playerIndex:""
        }
    },
    created(){
        this.player = this.$root.players[this.$root.playerIndex]
    },
    methods:{
        returnMain(){
            this.$router.push({ path: '/'});
        },
        setProvisoArgs(args){
            this.provisoArgs = args
        },
        addSpell(item){
            const that = this
            this.$axios.get(`../api/addSpell.php?playerName=${this.player.p_name}&newSpell=${item['法术名称']}`)
                .then(function (response) {
                    //let data = response.data
                    that.$root.getPlayers()
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    watch:{
        '$root.players'(){
            this.player = this.$root.players[this.$root.playerIndex]
        }
    }
}
</script>

<style scoped>
.page{
    display:flex;
    flex-direction:column;
    padding-top:160px;
}
.exitButton{
    position: fixed;
    bottom: 0;
    background-color: white;
    margin: 0 auto;
    padding: 10px;
}
.selectBar{
    position: fixed;
    background-color: white;
    top:0;
    left:0;
    width:100%;
    box-shadow: 0px 0px 3px 1px;
}

.search-tag-bar{
    position: relative;
    box-shadow: 0px 0px 3px 1px;
}
.search-tag-bar>ul{
    position: relative;
    display:inline-block;
    width:75%;
    text-align: left;
}
.search-tag-bar>label{
    position: relative;
    display:inline-block;
    width:20%;
}
.tag{
    display: inline-block;
    width:24%;
}
.tag2{
    display: inline-block;
    width:33%;
    text-align: left;
}
</style>