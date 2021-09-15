<!--
    注释卡：传入一个词汇，在词典(dictionary.json)中查找相关资料并显示在底栏
-->
<template>
    <div class="extend-description">
        <div class='content'>
             <div class='boundary'></div>
            <h2>{{title}}</h2>
            <p>{{description}}</p>
        </div>
    </div>
</template>

<script>
import DICTIONARY from '../dictionary.json'
export default {
    props:{
        title:{
            type:String,
            default:"无"
        }
    },
    data () {
        return {
            //description:'description' 在computed中
        }
    },
    mounted(){
    },
    methods:{
        routerToSpellEdit(){
            this.$router.push({ path: '/SpellEdit', query: { playerData: this.playerData }});
        },
        routerToEquipmentEdit(){
            this.$router.push({ path: '/EquipmentEdit', query: { playerData: this.playerData }});
        }
    },
    computed:{
        description: function () {
            let e_array = DICTIONARY.spell_dictionary;
            let searchString = this.title;
            searchString = searchString.trim().toLowerCase();
            e_array = e_array.filter(function(item){
                if(item.s_name.toLowerCase().indexOf(searchString) !== -1){
                    return item;
                }
            })
            // 返回过来后的数组
            return e_array;
        },
    }
}
</script>

<style scoped>
.extend-description{
    position: fixed;
    bottom: 0;
    width:100%;
    height:15%;
}
.boundary{
    position: relative;
    width:100%;
    height: 30px;
    top:-30px;
    background-image: url('../assets/border9a.png');
    background-size: 100% 100%;
}
.content{
    width:100%;
    height: 100%;
    background-color:white;
}
h2{
    display: inline-block;
    left: 0;
    width:20%;
    height: 100%;
    margin:0;
}
p{
    display: inline-block;
    left: 0;
    width:20%;
    height: 100%;
    margin:0;
}
</style>
