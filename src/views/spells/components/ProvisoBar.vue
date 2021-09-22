<template>
    <div class="selectBar">
        <div class='filter-type'>
            <span @click="filterType='spellName'">名称</span>
            <span @click="filterType='schoolTag'">学派</span>
            <span @click="filterType='classTag'">职业</span>
        </div>
        <div class='select-tag-bar' v-if="filterType=='spellName'">
            <input type="text" v-model="searchString" placeholder="输入搜索内容" />
        </div>
        <div class='select-tag-bar' v-if="filterType=='schoolTag'">
            <ul>
                <label v-for='(e,i) in schoolTags' :key='i'>
                    <div class='tag'><input v-model="schoolTag" type='radio' :value="e" name='schoolTag'>{{e}}</div>
                </label>
            </ul>
        </div>
        <div class='select-tag-bar' v-if="filterType=='classTag'">
            <ul>
                <label v-for='(e,i) in classTags' :key='i'>
                    <div class='tag2'><input v-model="classTag" type='radio' :value="e" name='classTags'>{{e}}</div>
                </label>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpellEdit',
    data () {
        return {
            searchString:'',
            schoolTags:["防护","咒法","预言","附魔","塑能","幻术","死灵","变化"],
            schoolTag:"",
            classTags:['圣武士','德鲁伊','邪术士','术士','法师','游侠','牧师','诗人'],
            classTag:"",
            filterType:""
        }
    },
    created(){
    },
    methods:{
        provisoChange(){
            let provisoArgs = {
                searchString:this.searchString,
                schoolTag:this.schoolTag,
                classTag:this.classTag,
                filterType:this.filterType
            }
            this.$emit('provisoChange',provisoArgs)
        }
    },
    watch:{
        searchString(){
            this.provisoChange()
        },
        schoolTag(){
            this.provisoChange()
        },
        classTag(){
            this.provisoChange()
        },
        filterType(){
            this.provisoChange()
        }
    }
}
</script>

<style lang='less' scoped>
.selectBar{
    background-color: white;
    width:100%;
    box-shadow: 0px 0px 3px 1px;
}
.select-tag-bar{
    position: relative;
    box-shadow: 0px 0px 3px 1px;
    height:60px;
    >ul{
        position: relative;
        display:inline-block;
        width:75%;
        text-align: left;
    }
    >label{
        position: relative;
        display:inline-block;
        width:20%;
    }
}
.tag{
    display: inline-block;
    width:24%;
}
.tag2{
    display: inline-block;
    width:33%;
    text-align: left;
}
</style>