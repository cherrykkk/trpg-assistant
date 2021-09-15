<template>
    <div class='info-cell shadowStyle'>
        <h5>{{title}}</h5>
        <ul>
            <li v-for="(item,i) in list" :key='i' class='clickable'>
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'InfoCell',
    components:{
    },
    props:{
        title:{
            type:String
        },
        list:{
            type:Array
        }
    },
    data () {
        return {
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
        console.log("infoBrief mounted")
    },
    methods:{
    }
}
</script>

<style scoped>
</style>
