<template>
    <div class='container'>
        <ul>
            <li>
                <base-info></base-info>
            </li>
            <li>
                <ability-cell></ability-cell>
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
import BaseInfo from './BaseInfo.vue'
export default {
    components:{
        AbilityCell,
        SpellsBar,
        BaseInfo
    },
    data(){
        return {
            player:{}
        }
    },
    watch:{
         '$root.refresh': {
            handler() {
                this.player = this.$root.getPlayer()
            },
            immediate: true
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