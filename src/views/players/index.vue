<template>
    <div class='container'>
        <!--简略属性 -->
        <div v-for='(item,i) in playersData' :key='i' v-on:click='showMore(i)'>
            <brief :playerData="item" class='brief shadowStyle'>ddd</brief>
        </div>
    </div>
</template>

<script>
import Brief from './Brief.vue'
import initDataP from './init.json'
export default {
    components:{
        Brief
    },
    data () {
        return {
            playersData:[],
            showMoreData:{},
            random:0,
            focusOn:'D&D'
        };
    },
    mounted(){
        this.playersData = initDataP
    },
    methods:{
        showMore(i){
            this.$router.push({ path: '/player/detail', query:{"i":i}})
        }
    }
}
</script>

<style scoped>
.brief{
    width:90%;
    margin:0 auto;
}
</style>
