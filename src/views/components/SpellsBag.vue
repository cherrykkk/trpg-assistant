<template>
    <touch-fold>
        <template v-slot:brief>
            <ul>
                <li v-for='(e,i) in player.p_spells' :key='i' @click='getDescription(e,i)'>
                    {{e}}
                    <cha v-if='removing' @click.native='remove(i)'></cha>
                </li>
            </ul>
        </template>
        <template v-slot:detail v-if='filtered'>
            <spell-cell :data='filtered[0]'></spell-cell>
        </template>
    </touch-fold>
</template>

<script>
import TouchFold from '@/components/TouchFold.vue'
import SpellCell from './SpellCell.vue'
import {getSpellDescription} from '@/api/getSpellDescription.js'
import {removeSpell} from '@/api/removeSpell.js'
import Cha from '@/components/Cha.vue'

export default {
    components:{
        TouchFold,
        SpellCell,
        Cha
    },
    props:{
        removing:false
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
        },
        remove(index){
            removeSpell(this.player.p_name,index)
            this.$root.getPlayers()
            console.log("remove")
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