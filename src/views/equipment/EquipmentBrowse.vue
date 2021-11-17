<template>
    <div class="page">
        <proviso-bar @provisoChange='setProvisoArgs' class='proviso'></proviso-bar>
        <equipment-list class='list'
         :filterType="provisoArgs.filterType"></equipment-list>
    </div>
</template>

<script>
import EquipmentList from './EquipmentList.vue'
import ProvisoBar from './ProvisoBar.vue'
export default {
    components:{
        EquipmentList,
        ProvisoBar
    },
    data() {
        return {
            provisoArgs:{}
        }
    },
    created(){
    },
    methods:{
        setProvisoArgs(args){
            this.provisoArgs = args
        },
    },
}
</script>

<style scoped>
.page{
    position: fixed;
    height:100%;
    width:100%;
}

</style>