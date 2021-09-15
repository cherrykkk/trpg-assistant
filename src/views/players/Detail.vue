<template>
    <div class='container'>
        <h1>{{title}}</h1>
        <ul>
            <li>
                <info-cell title='基础' :list='list.base'></info-cell>
            </li>
            <li>
                <ability-cell title='属性' :listData='list.ability'></ability-cell>
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
</template>

<script>
import InfoCell from './components/InfoCell.vue'
import AbilityCell from './components/AbilityCell.vue'
import initDataP from './init.json'
export default {
    components:{
        InfoCell,
        AbilityCell
    },
    data(){
        return {
            playerData:{},
            newData:{},
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
    mounted(){
        this.playerData = initDataP[this.$route.query.i]
        this.newData = this.playerData
        console.log(this.playerData)
        this.init()
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
.container{
    position: relative;
    width:90%;
    margin:0 auto;
}
</style>