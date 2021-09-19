<template>
    <div class="page">
        <spells-bag :player='player'></spells-bag>
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
import SpellList from '../components/SpellList.vue'
import ProvisoBar from '../components/ProvisoBar.vue'
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
            player:{}
        }
    },
    created(){
        this.player = JSON.parse(this.$route.query.player)
    },
    methods:{
        returnMain(){
            this.$router.push({ path: '/'});
        },
        setProvisoArgs(args){
            this.provisoArgs = args
        },
        addSpell(){
            const that = this
            this.$axios.get(`../api/addSpell.php?p_name=${this.player}`)
                .then(function (response) {
                    console.log("add success")
                })
                .catch(function (error) {
                    console.log(error);
                });
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