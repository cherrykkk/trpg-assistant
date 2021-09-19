<template>
    <div class='container'>
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
                <spell-cell title='法术' :player='player'></spell-cell>
            </li>
            <li>
                <info-cell title='背包' :list='list.bag'></info-cell>
            </li>
        </ul>
    </div>
</template>

<script>
import InfoCell from '../components/InfoCell.vue'
import AbilityCell from '../components/AbilityCell.vue'
import SpellCell from './SpellCell/SpellsBar.vue'
export default {
    components:{
        InfoCell,
        AbilityCell,
        SpellCell
    },
    data(){
        return {
            playerData:{},
            player:{},
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
        this.player = JSON.parse(this.$route.query.data)
        console.log("detail")
        console.log(this.player)
        this.playerData = JSON.parse(this.$route.query.data)
        this.newData = this.playerData
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
            console.log(this.list)
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
            this.list.spell = this.newData.p_spells
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

<style lang='less' scoped>
.container{
    position: relative;
    width:90%;
    margin:0 auto;
    li{
        padding:10px;
        box-shadow: 0px 0px 3px 1px;
    }
}
</style>