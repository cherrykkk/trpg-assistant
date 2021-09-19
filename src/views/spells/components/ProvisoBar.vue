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
                        <div class='tag'><input v-model="schoolTag" type='radio' :value="e" name='schoolTag'>{{e}}</div>
                    </label>
                </ul>
                <label>
                    <input v-model="filterType" type='radio' name='filterType' value='schoolTag'>学派
                </label>
            </div>
            <div class='search-tag-bar'>
                <ul>
                    <label v-for='(e,i) in classTags' :key='i'>
                        <div class='tag2'><input v-model="classTag" type='radio' :value="e" name='classTags'>{{e}}</div>
                    </label>
                    <label></label>
                </ul>
                <label>
                    <input v-model="filterType" type='radio' name='filterType' value='classTag'>职业
                </label>
            </div>
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
        returnMain(){
            this.$router.push({ path: '/'});
        },
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
    width:100%;
    box-shadow: 0px 0px 3px 1px;
}

.search-tag-bar{
    position: relative;
    box-shadow: 0px 0px 3px 1px;
    >ul{
        position: relative;
        display:inline-block;
        width:75%;
        text-align: left;
    }
}
.search-tag-bar>label{
    position: relative;
    display:inline-block;
    width:20%;
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