<template>
    <div class="page">
        <div class="selectBar">
            <div class='close-btn' v-on:click='returnMain()'>×</div>
            <div class='search-tag-bar'>
                <input type="text" v-model="searchString" placeholder="输入搜索内容" />
            </div>
            <div class='search-tag-bar' >
                <ul>
                    <label v-for='(e,i) in schoolTags' :key='i'>
                        <span><input v-model="schoolTag" type='radio' :value="e" name='schoolTag'>{{e}}</span>
                    </label>
                </ul>
                <label>
                    <input v-model="filterType" type='radio' name='filterType' value='schoolTag'>学派
                </label>
            </div>
            <div class='search-tag-bar'>
                <ul>
                    <label v-for='(e,i) in classTags' :key='i'>
                        <span><input v-model="classTag" type='radio' :value="e" name='classTags'>{{e}}</span>
                    </label>
                </ul>
                <label>
                    <input v-model="filterType" type='radio' name='filterType' value='classTag'>职业
                </label>
            </div>
        </div>
        <spell-list 
         :filterType="filterType"
         :spellName="searchString"
         :schoolTag="schoolTag"
         :classTag="classTag"></spell-list>
    </div>
</template>

<script>
import PlayerBag from './components/PlayerBag.vue'
import SpellList from './components/SpellList.vue'
export default {
    name: 'SpellEdit',
    components:{
        PlayerBag,
        SpellList
    },
    data () {
        return {
            searchString:'',
            schoolTags:["防护","咒法","预言","附魔","塑能","幻术","死灵","变化"],
            schoolTag:"",
            classTags:['圣武士','德鲁伊','术士','法师','游侠','牧师','诗人','邪术士'],
            classTag:"",
            filterType:""
        }
    },
    created(){
    },
    methods:{
        returnMain(){
            this.$router.push({ path: '/'});
        }
    }
}
</script>

<style scoped>
.page{
    display:flex;
    flex-direction:column;
    padding-top:160px;
}
.exitButton{
    position: fixed;
    bottom: 0;
    background-color: white;
    margin: 0 auto;
    padding: 10px;
}
.selectBar{
    position: fixed;
    background-color: white;
    top:0;
    left:0;
    box-shadow: 0px 0px 3px 1px;
}

.search-tag-bar{
    position: relative;
    box-shadow: 0px 0px 3px 1px;
}
.search-tag-bar>ul{
    position: relative;
    display:inline-block;
    width:75%;
}
.search-tag-bar>label{
    position: relative;
    display:inline-block;
    width:20%;
}
span{
    white-space: nowrap;
}
</style>