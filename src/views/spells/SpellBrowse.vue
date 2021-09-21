<template>
    <div class="page">
        <proviso-bar @provisoChange='setProvisoArgs'></proviso-bar>
        <spell-list 
         :filterType="provisoArgs.filterType"
         :spellName="provisoArgs.searchString"
         :schoolTag="provisoArgs.schoolTag"
         :classTag="provisoArgs.classTag"></spell-list>
    </div>
</template>

<script>
import SpellList from './components/SpellList.vue'
import ProvisoBar from './components/ProvisoBar.vue'
export default {
    components:{
        SpellList,
        ProvisoBar,
    },
    data() {
        return {
            provisoArgs:{}
        }
    },
    methods:{
        returnMain(){
            this.$router.push({ path: '/'});
        },
        setProvisoArgs(args){
            this.provisoArgs = args
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