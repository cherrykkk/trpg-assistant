<template>
    <div>
        <div class='title' @click='changeFold()'>{{data.法术名称}}</div>
        <div class='detail' :class="{'unfold':!fold}">
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
    mounted(){
        // console.log(this.data)
    },
    methods:{
        changeFold(){
            this.fold = !this.fold 
            console.log(this.data)
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
.title{
    display: inline-block;
    padding:10px 20px;
    background-image: url("../../../assets/border7.png");
    background-size: 100% 100%;
    background-position: center;
    margin:2px;
    /* 不适合不规则阴影 */
    /* box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
     /* filter: drop-shadow(2px 2px 10px rgba(0,0,0,.6)); */
}
.detail{
    display:none;
    z-index: -1;
    width:80%;
    padding:2px 5%;
    margin:auto;
}
.detail .description{
    font-size:10px;
    text-align: left;
    text-indent: 20px;
}
.unfold{
    display:block;
    box-shadow: 0px 0px 3px 1px inset;
}
.tag span{
    font-size:12px;
    padding:1px;
    box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.2);
}
.space span{
    margin:0 2px;
}
</style>