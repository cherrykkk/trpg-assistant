<template>
    <div class='players'>
        <player-in-scene v-for='(item,index) in $root.players' :key='index'
         :playerIndex="index">
        </player-in-scene>
    </div>
</template>

<script>
import PlayerInScene from '@/views/player/PlayerInScene.vue'

export default {
    components:{
        PlayerInScene
    }
}

</script>
