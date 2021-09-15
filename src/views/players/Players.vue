<template>
    <div class='players'>
        <!--简略属性 -->
        <div v-for='(item,i) in playersData' :key='i' v-on:click='showMore(i)'>
            <info-brief :playerData="item"></info-brief>
        </div>
        <!--详细属性 -->
        <div class='moreInfo'>
            <info-more :newData='showMoreData' :random='random'></info-more>
        </div>
    </div>
</template>

<script>
import InfoBrief from './components/InfoBrief.vue'
import InfoMore from './components/InfoMore.vue'
import initDataP from './init.json'
export default {
    components:{
        InfoBrief,
        InfoMore
    },
    data () {
        return {
            playersData:{},
            showMoreData:{},
            random:0,
            focusOn:'D&D'
        };
    },
    beforeCreate(){
        //console.log("players beforeCreate")
    },
    created(){
        //console.log("players created")
        this.playersData = initDataP.players
    },
    beforeMount(){
        //console.log("players beforeMount")
    },
    mounted(){
        //console.log("players mounted")
        console.log("player mounted")
        let clickable = document.getElementsByClassName("clickable")
        console.log(clickable)
        for(let i in clickable){
            console.log(clickable[i])
            // clickable[i].addEventListener("click",function(){console.log("clicked")})
        }
    },
    beforeUpdate(){
        // console.log("players beforeUpdate")
    },
    updated(){
        // console.log("players updated")
    },
    methods:{
        //更新 InfoMore 模组的数据
        showMore(index){
            this.showOrNot = true
            this.showMoreData = this.playersData[index]
            this.random = Math.random()
        }
    }
}
</script>

<style scoped>
.players{
    position: absolute;
    left:0;
    right:0;
    display:flex;
    flex-direction:column;
    /* border: medium double rgb(250,0,255); */
    /* background-image: url("../../assets/bg2.jpg"); */
}
.moreInfo{
    position: absolute;
    width:100%;
}
</style>
