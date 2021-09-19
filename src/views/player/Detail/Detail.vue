<template>
    <div class='container'>
        <ul>
            <li>
                <info-cell  :player='player'></info-cell>
            </li>
            <li>
                <ability-cell :player='player'></ability-cell>
            </li>
            <li>
                <info-cell :player='player'></info-cell>
            </li>
            <li>
                <spells-bar></spells-bar>
            </li>
            <li>
                <info-cell :player='player'></info-cell>
            </li>
        </ul>
    </div>
</template>

<script>
import InfoCell from '../components/InfoCell.vue'
import AbilityCell from '../components/AbilityCell.vue'
import SpellsBar from './SpellsBar/SpellsBar.vue'
export default {
    components:{
        InfoCell,
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
        this.player = this.$root.players[this.$root.playerIndex]
    },
    watch:{
        '$root.players'(){
            this.player = this.$root.player[this.$root.playerIndex]
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