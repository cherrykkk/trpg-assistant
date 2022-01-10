<template>
    <div>
        <equipment-bag :player='player'></equipment-bag>
        <router-link :to="{path: '/equipmentEdit'}">编辑</router-link>
    </div>
</template>

<script>
import EquipmentBag from '@/views/equipment/EquipmentBag.vue'

export default {
    components:{
        EquipmentBag
    },
    props:{
        player:Object
    },
    mounted(){
    }
}

</script>

<style scoped>
li{
    display: inline-block;
    padding:0 5px;
}

</style>