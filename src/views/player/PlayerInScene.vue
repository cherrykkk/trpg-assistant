<template>
    <v-touch @swipeleft='openDetail()' @swipeup='fold()'
    class='player-in-scene'>
        <div class='brief' @click='unfold()'>
            {{$root.players[playerIndex].p_name}}
        </div>
        <div
        :class="['more',[briefView? 'fold':'unfold']]">
            {{$root.players[playerIndex]}}
        </div>
    </v-touch>
</template>

<script>

export default {
    props:{
        data:Object,
        playerIndex:Number
    },
    data(){
        return{
            briefView:true
        }
    },
    methods:{
        unfold(){
            this.briefView = false
        },
        fold(){
            this.briefView = true
        },
        openDetail(){
            this.$router.push({ path: '/player/Detail', query: { playerIndex:this.playerIndex } });
        }
    }
}

</script>

<style lang='less' scoped>

.brief{
    width:90%;
    margin:0 auto;
}
.more{
    overflow: hidden;
    transition: 0.5s 0s;
}
.fold{
    max-height:0;
}
.unfold{
    max-height: 200px;
}

</style>
