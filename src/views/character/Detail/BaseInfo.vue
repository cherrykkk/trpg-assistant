<template>
    <touch-fold>
        <template v-slot:brief>
            <span>{{player.p_name}}</span>
            <span>{{player.p_sex}}</span>
            <span>{{player.p_class}}</span>
            <span>{{player.p_race}}</span>
        </template>
        <template v-slot:detail>
           
        </template>
    </touch-fold>
</template>

<script>
import TouchFold from '@/components/TouchFold.vue'
export default {
    components:{
        TouchFold
    },
    data () {
        return {
            player:{}
        }
    },
    watch:{
        '$root.refresh': {
            handler() {
                this.player = this.$root.getPlayer()
                console.log("immediate")
                console.log(this.player)
                
            },
            immediate: true
        }
    }
}
</script>

<style scoped>
.brief,.detail{
    display:inline-block;
    margin-left:10px;
    width:2em;
    vertical-align: top;
}
</style>
