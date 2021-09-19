<template>
    <div class='info-cell'>
        <ul>
            <li v-for="(item,i) in list" :key='i' class='value'>
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    components:{
    },
    props:{
        title:{
            type:String
        },
        list:{
            type:Array
        }
    }
}
</script>

<style scoped>
.value{
    display: inline-block;
    margin:5px 5px;
}
</style>
