<template>
    <div class='playerCard'>
        <div>
            <h1>{{playerData.p_name}} </h1>
        </div>
        <div>
            <div>{{playerData.p_class}}</div>
            <div>{{playerData.p_race}}</div>
        </div>
        <!-- <div>
            <div>力量{{playerData.p_info.strength}}</div>
            <div>敏捷{{playerData.p_info.dexterity}}</div>
            <div>体质{{playerData.p_info.constitution}}</div>
            <div>智力{{playerData.p_info.intelligence}}</div>
            <div>感知{{playerData.p_info.wisdom}}</div>
            <div>魅力{{playerData.p_info.charisma}}</div>
        </div>
        <div>
            <div v-for="(item,i) in playerData.p_equipment" :key='i'>
                {{item.e_name}} 
            </div>
        </div>
        <div>
            <div v-for="(item,i) in playerData.p_spells" :key='i'>
                {{item.s_name}}
                <span>{{item.s_level}} {{item.descri}}</span>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'InfoBrief',
    components:{
    },
    props:{
        playerData:{
            type:Object
        }
    },
    data () {
        return {
            moreData:{}
        }
    },
    beforeCreate(){
        //console.log("infoBrief beforeCreate")
    },
    created(){
        //console.log("infoBrief created")
    },
    beforeMount(){
        //console.log("infoBrief beforeMount")
    },
    mounted(){
        //console.log("infoBrief mounted")
    },
    methods:{
        routerTo(){
            this.$router.push({ path: '/Spell', query: { playerData: this.playerData }});
        }
    }
}
</script>

<style scoped>
.playerCard{
    display:inline-flex;
    flex-direction:row;
    padding:5% 20%;
    /* border: medium double rgb(250,0,255); */
    background-image: url("../../../assets/border3.png");
    background-size: 100% 100%;
}
</style>
