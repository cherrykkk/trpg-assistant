<template>
    <div class='playerCard'>
        <div>
            <h1>{{playerData.p_name}} </h1>
        </div>
        <div>
            <div>{{playerData.p_class}}</div>
            <div>{{playerData.p_race}}</div>
        </div>
    </div>
</template>

<script>
export default {
    components:{
    },
    props:{
        playerData:Object
    },
    data () {
        return {
        }
    },
    methods:{
        routerTo(){
            console.log(JSON.stringif(this.playerData))
            //this.$router.push({ path: '/Spell', query: { playerData: JSON.stringif(this.playerData) } });
        }
    }
}
</script>

<style scoped>
.playerCard{

}
</style>
