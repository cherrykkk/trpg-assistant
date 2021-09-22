<template>
    <div>
        <equipment-bag :player='player'></equipment-bag>
        <router-link :to="{path: '/spellEdit'}">编辑</router-link>
    </div>
</template>

<script>
import SpellsBag from '@/views/components/SpellsBag.vue'

export default {
    components:{
        SpellsBag
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