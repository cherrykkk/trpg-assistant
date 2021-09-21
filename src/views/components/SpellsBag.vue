<template>
    <touch-fold>
        <template v-slot:brief>
            <ul>
                <li v-for='(e,i) in player.p_spells' :key='i' @click='getDescription(e,i)'>
                    {{e}}
                </li>
            </ul>
        </template>
        <template v-slot:detail>
            <spell-cell :data='filtered[0]'></spell-cell>
        </template>
    </touch-fold>
</template>

<script>
import TouchFold from '@/components/TouchFold.vue'
import SpellCell from './SpellCell.vue'
import {getSpellDescription} from '@/api/getSpellDescription.js'

export default {
    components:{
        TouchFold,
        SpellCell
    },
    data(){
        return {
            player:{},
            filtered:""
        }
    },
    created(){
        this.player = this.$root.players[this.$root.playerIndex]
    },
    methods:{
        getDescription(spellName,index){
            this.filtered = getSpellDescription(spellName)
        }
    },
    watch:{
        '$root.refresh'(){
            this.player = this.$root.players[this.$root.playerIndex]
        }
    }
}

</script>

<style scoped>
li{
    display: inline-block;
    padding:0 4px;
    border:dotted 1px;
    margin:2px 3px;
}
.detail{
    overflow: hidden;
}
</style>