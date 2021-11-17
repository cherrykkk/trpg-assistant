<template>
    <div class='cell'>
        <span class='title'>{{data.武器名称}}</span>
    </div>
</template>

<script>
import AddIcon from '@/components/AddIcon.vue'

export default {
    components:{
        AddIcon
    },
    props:{
        data:Object,
        adding:Boolean
    },
    data(){
        return{
            fold:true
        }
    },
    mounted(){
        // console.log(this.data)
    },
    methods:{
        changeFold(){
            this.fold = !this.fold 
            console.log(this.data)
        }
    }
}
</script>

<style scoped>
.cell{

}
.title{
    display: inline-block;
    padding:10px 20px;
    background-image: url("../../assets/border7.png");
    background-size: 100% 100%;
    background-position: center;
}
</style>