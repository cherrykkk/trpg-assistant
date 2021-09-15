<template>
    <div>{{title}}</div>
</template>

<script>
export default {
    props:{
        title:String,
        item:Object
    },
}
</script>

<style scoped>
div{
    display: inline-block;
    padding:5px;
    background-image: url("../../../assets/border7.png");
    background-size: 100% 100%;
    background-position: center;
    margin:2px;
    /* 不适合不规则阴影 */
    /* box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
     /* filter: drop-shadow(2px 2px 10px rgba(0,0,0,.6)); */
}
</style>