<template>
  <div class="page">
    <spells-bag :removing='removing' class='bag'></spells-bag>
    <div @click='removing=true' v-if='!removing'>开启删除</div>
    <div @click='removing=false' v-if='removing'>关闭删除</div>
    <proviso-bar @provisoChange='setProvisoArgs' class='proviso'></proviso-bar>
    <spell-list class='list'
     :provisoType="provisoConfig.type"
     :provisoSearching="provisoConfig.searching"
     :provisoTitle="provisoConfig.title"
     :adding="true"
     @addSpell='addSpell'></spell-list>
  </div>
</template>

<script>
import SpellList from './components/SpellList.vue'
import ProvisoBar from '@/views/components/ProvisoBar/ProvisoBar.vue'
import SpellsBag from '@/views/components/SpellsBag.vue'
export default {
    components:{
        SpellList,
        ProvisoBar,
        SpellsBag
    },
    data() {
        return {
            provisoConfig:{},
            spellsBag:[],
            player:{},
            playerIndex:"",
            removing:false
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
            this.provisoConfig = args
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
    position: fixed;
    height:100%;
}
.bag{
    position:relative;
    height:30%;
    overflow: scroll;
}
.proviso{
    height:20%;
}
.list{
    position: relative;
    height:40%;
    overflow: scroll;
}

</style>