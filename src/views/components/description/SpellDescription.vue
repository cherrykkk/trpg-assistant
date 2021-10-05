<template>
    <div class='detail'>
        <div class='description'>
            <p>{{data.法术说明}}</p>
            <p>{{data.法术升阶}}</p>
        </div>
        <div class='tag'>
            <span>{{data.等级}}</span>
            <span>{{data.派系}}</span>
            <span>{{data.法术成分}}</span>
            <span>{{data.施法时间}}</span>
            <span>{{data.持续时间}}</span>
            <span>{{data.施法距离}}</span>
            <span v-if='data.豁免'>{{data.豁免}}</span>
            <span v-if='data.专注'>{{data.专注}}</span>
            <span v-if='data.仪式'>{{data.仪式}}</span>
        </div>
        <div class='tag space'>
            <span v-for='(item,i) in classArr' :key='i'>{{item}}</span>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        data:Object
    },
    data(){
        return{
            fold:true
        }
    },
    computed:{
        classArr:function(){
            let classArr = ['圣武士','德鲁伊','术士','法师','游侠','牧师','诗人','邪术士']
            const that = this
            let result = classArr.filter(function(el){
                return that.data[el] != ""
            })
            return result
        }
    }
}
</script>

<style scoped>
.operator{
    display:inline-block;
}
.tag span{
    font-size:12px;
    padding:1px;
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.2);
}
.space span{
    margin:0 2px;
}
.detail{
    z-index: -1;
    width:80%;
    padding:2px 5%;
    margin:auto;
    max-height:300px;
}
.detail .description{
    font-size:10px;
    text-align: left;
    text-indent: 20px;
}
</style>