<template>
    <div class="rightBarArrow">
        <div class='selection'>
            <div v-on:click="routerToSpellEdit()">法术</div>
            <div v-on:click="routerToEquipmentEdit()">装备</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RightBar',
    props:{
        playerData:{
            type:Object
        }
    },
    data () {
        return {
        }
    },
    mounted(){
    },
    methods:{
        routerToSpellEdit(){
            this.$router.push({ path: '/SpellEdit', query: { playerData: this.playerData }});
        },
        routerToEquipmentEdit(){
            this.$router.push({ path: '/EquipmentEdit', query: { playerData: this.playerData }});
        }
    }
}
</script>

<style scoped>
.rightBarArrow{
    position: relative;
    left: 20px;
    border: medium double rgb(250,0,255);
}
.selection{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>
