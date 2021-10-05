<template>
    <div class="selectBar">
        <div class='filter-type'>
            <div @click="filterTypeChange('weapon')" ref='weapon'>武器</div>
            <div @click="filterTypeChange('armor')" ref='armor'>护甲</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SpellEdit',
    data () {
        return {
            filterType:""
        }
    },
    methods:{
        reSearch(){
            let provisoArgs = {
                filterType:this.filterType
            }
            this.$emit('provisoChange',provisoArgs)
        },
        filterTypeChange(changeType){
            this.filterType = changeType
            this.reSearch()
            this.$refs['weapon'].classList.remove('selected')
            this.$refs['armor'].classList.remove('selected')
            this.$refs[changeType].classList.add('selected')
        }
    },
}
</script>

<style lang='less' scoped>
.selectBar{
    background-color: white;
    width:100%;
    box-shadow: 0px 0px 3px 1px;
    .filter-type{
        display: flex;
        div{
            flex-grow: 1;
            box-shadow: 0px 0px 3px 1px;
        }
        .selected{
            box-shadow: 0px 0px 0px 0px;
        }
    }
    .order-by{
        width:30%;
    }
}
.select-tag-bar{
    position: relative;
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
    >input{
        margin-top:10px;
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