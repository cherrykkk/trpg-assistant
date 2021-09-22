<template>
    <div>
        <div class='description'>
            <p>{{data.护甲名称}}</p>
            <p>{{data.护甲种类}}</p>
        </div>
        <div class='tag'>
            <!-- <span>{{data.等级}}</span>
            <span>{{data.派系}}</span>
            <span>{{data.法术成分}}</span>
            <span>{{data.施法时间}}</span>
            <span>{{data.持续时间}}</span>
            <span>{{data.施法距离}}</span>
            <span v-if='data.豁免'>{{data.豁免}}</span>
            <span v-if='data.专注'>{{data.专注}}</span>
            <span v-if='data.仪式'>{{data.仪式}}</span> -->
        </div>
        <div class='tag space'>
            <!-- <span v-for='(item,i) in classArr' :key='i'>{{item}}</span> -->
        </div>
    </div>
</template>

<script>

export default {
    props:{
        data:Object
    }
}
</script>

<style scoped>

.tag span{
    font-size:12px;
    padding:1px;
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.2);
}
.space span{
    margin:0 2px;
}
</style>