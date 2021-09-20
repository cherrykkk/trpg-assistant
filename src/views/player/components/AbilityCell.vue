<template>
    <div>
        <v-touch @swipeup='fold()'
         v-for="(item,i) in ability" :key='i' 
         class='v-touch'>
            <div @click='unfold()'>{{item[0]}}</div>
            <div :class="['more',[briefView? 'fold':'unfold']]"
             v-for="(item2,i2) in item" :key='i2' v-show='i2!=0'>
                {{item2}}
            </div>
        </v-touch>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ability:[],
            briefView:true
        }
    },
    created(){
        let data = this.$root.getPlayer()
        this.ability.push(   
                    ['力量'+data.strength,'运动'],
                    ['敏捷'+data.dexterity,'体操','巧手','隐匿'],
                    ['体质'+data.constitution],
                    ['智力'+data.intelligence,'奥秘','历史','调查','自然','宗教'],
                    ['感知'+data.wisdom,'驯兽','洞悉','医药','察觉','求生'],
                    ['魅力'+data.charisma,'欺瞒','威吓','表演','游说']
                )
    },
    methods:{
        unfold(){
            this.briefView = false
            console.log("undold")
        },
        fold(){
            this.briefView = true
        },
    }
}
</script>

<style scoped>
.v-touch{
    display:inline-block;
    margin-left:10px;
    width:2em;
    vertical-align: top;
}
.more{
    overflow: hidden;
    transition: 0.5s 0s;
}
.fold{
    max-height:0;
}
.unfold{
    max-height: 200px;
}
</style>
