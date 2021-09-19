<template>
    <div>
        <ul>
            <li v-for="(item,i) in listData" :key='i'>
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        listData:Array
    },
    data () {
        return {
        }
    },
    mounted(){
        console.log(this.data)
    }
}
</script>

<style scoped>
li{
    display:inline-block;
    margin-left:10px;
    width:2em;
}
</style>
