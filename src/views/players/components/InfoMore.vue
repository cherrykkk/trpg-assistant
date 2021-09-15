<template>
    <div class='mask-layer' v-if='showOrNot'>
    <div class='infoMore'>
        <div class='close-btn' v-on:click='close()'>×</div>
        <h1>{{title}}</h1>
        <ul>
            <li>
                <info-cell title='基础' :list='list.base'></info-cell>
            </li>
            <li>
                <info-cell title='属性' :list='list.ability'></info-cell>
            </li>
            <li>
                <info-cell title='装备' :list='list.equipment'></info-cell>
            </li>
            <li>
                <info-cell title='法术' :list='list.spell'></info-cell>
                <!-- <router-link to='/a'>编辑</router-link> -->
                <router-link :to="{path: '/spellEdit', query: {bag:list.spell}}">编辑</router-link>
            </li>
            <li>
                <info-cell title='背包' :list='list.bag'></info-cell>
            </li>
        </ul>
    </div>
    </div>
</template>

<script>
import InfoCell from './InfoCell.vue'
export default {
    name:'InfoMore',
    components:{
        InfoCell
    },
    props:{
        newData:{
            type:Object
        },
        random:Number
    },
    data(){
        return {
            showOrNot:false,
            title:'maintitle',
            list:{
                base:null,
                ability:null,
                equipment:null,
                spell:null,
                bag:null
            }
        }
    },
    beforeCreate(){
        //console.log("infoMore beforeCreate")
    },
    created(){
        //console.log("infoMore created")
    },
    beforeMount(){
        //console.log("infoMore beforeMount")
    },
    mounted(){
        //console.log("infoMore mounted")
        this.init()
    },
    beforeUpdate(){
        // console.log("beforeUpdate")
    },
    updated(){
        // console.log("infoMore updated")
    },
    methods:{
        init(){
        },
        updateValue(){
            this.showOrNot = true
            this.title = this.newData.p_name
            this.valueBase()
            this.valueAbility()
            this.valueEquipment()
            this.valueSpell()
            this.valueBag()
        },
        valueBase(){
            let arr = []
            arr.push(this.newData.p_sex)
            arr.push(this.newData.p_class)
            arr.push(this.newData.p_race)
            this.list.base = arr
        },
        valueAbility(){
            let arr = []
            let data = this.newData
            arr.push(   '力量'+data.strength,
                        '敏捷'+data.dexterity,
                        '体质'+data.constitution,
                        '智力'+data.intelligence,
		                '感知'+data.wisdom,
		                '魅力'+data.charisma
                    )
            this.list.ability = arr
        },
        valueEquipment(){
            let arr = []
            let data = this.newData.p_equipment
            for(let e of data){
                arr.push(e.e_name)
            }
            this.list.equipment = arr
        },
        valueSpell(){
            let arr = []
            let data = this.newData.p_spells
            for(let e of data){
                arr.push(e.s_name)
            }
            this.list.spell = arr
        },
        valueBag(){
        },
        close(){
            this.showOrNot = false
        }
    },
    watch:{
        newData(){
            this.updateValue()
            console.log("infoMore watch")
        },
        random(){
            this.showOrNot = true
        }
    }
}
</script>

<style scoped>
.mask-layer{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgb(0, 0, 0,0.6);;
}
.infoMore{
    position: relative;
    width:60%;
    height: 75%;
    margin:0 auto;
    padding:2% 10%;
    /* border: medium double rgb(250,0,255); */
    /* background-image: 
        url("../../../assets/border5b.png")
        ,url("../../../assets/border5c.png"); */
    background-image: url("../../../assets/border8a.png");
    background-size: 100% 100%;
    background-color: white;
    background-repeat: no-repeat;
    background-position: 0 0;
}
.close-btn{
    position: absolute;
    height: 60px;
    width: 60px;
    right: 0;
}
.selection{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>