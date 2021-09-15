<template>
    <div class='info-cell'>
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
.info-cell{
    display:flex;
    flex-direction:row;
    /* border: medium double rgb(250,0,255); */
    /* background-image: url("../../../assets/img1.png");
    background-size: 100% 100%;
    background-position: 2px; */
}
li{
    display: inline-block;
    margin:0 1em;
}
ul{
    display: flex;
    flex-wrap: wrap;
    align-content:center;
}

</style>
