<template>
    <div class='container'>
        <ul>
            <li>
                <ability-cell :player='player'></ability-cell>
            </li>
            <li>
                <spells-bar></spells-bar>
            </li>
        </ul>
    </div>
</template>

<script>
import AbilityCell from './AbilityCell.vue'
import SpellsBar from './SpellsBar.vue'
export default {
    components:{
        AbilityCell,
        SpellsBar
    },
    data(){
        return {
            player:{},
            playerIndex:""
        }
    },
    created(){
        this.$root.setPlayerIndex( this.$route.query.playerIndex )
        this.player = this.$root.getPlayer()
    },
    watch:{
        '$root.players'(){
            this.player = this.$root.getPlayer()
        }
    }
}
</script>

<style lang='less' scoped>
.container{
    position: relative;
    width:90%;
    margin:0 auto;
    li{
        padding:10px;
        box-shadow: 0px 0px 3px 1px;
    }
}
</style>