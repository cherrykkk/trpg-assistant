<template>
    <div class="page">
        <equipment-bag :removing='removing' class='bag'></equipment-bag>
        <div @click='removing=true' v-if='!removing'>开启删除</div>
        <div @click='removing=false' v-if='removing'>关闭删除</div>
        <proviso-bar @provisoChange='setProvisoArgs' class='proviso'></proviso-bar>
        <equipment-list class='list'
         :filterType="provisoArgs.filterType"
         :spellName="provisoArgs.searchString"
         :schoolTag="provisoArgs.schoolTag"
         :classTag="provisoArgs.classTag"
         :adding="true"
         @addSpell='addSpell'></equipment-list>
    </div>
</template>

<script>
import EquipmentList from './EquipmentList.vue'
import ProvisoBar from './ProvisoBar.vue'
import EquipmentBag from './EquipmentBag.vue'
export default {
    components:{
        EquipmentList,
        ProvisoBar,
        EquipmentBag
    },
    data() {
        return {
            provisoArgs:{},
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