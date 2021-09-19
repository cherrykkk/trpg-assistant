<template>
    <div class='players'>
        <player-in-scene v-for='(item,i) in players' :key='i'
         :data="item">
        </player-in-scene>
    </div>
</template>

<script>
import PlayerInScene from '@/views/player/PlayerInScene/index.vue'

export default {
    components:{
        PlayerInScene
    },
    data(){
        return {
            players:[]
        }
    },
    mounted(){
        this.fetchPlayers()
    },
    methods:{
        fetchPlayers(){
            const that = this
            this.$axios.get('../api/players.json')
                .then(function (response) {
                    that.players = response.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}

</script>
