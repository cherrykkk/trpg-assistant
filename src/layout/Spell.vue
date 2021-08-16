<template>
    <div class="Spells">
        <div>
            <div v-for="(item,i) in bagData" :key='i' class="spellCard">
                <div>{{item.s_name}}</div>
                <div>{{item.s_level}}</div>
                <div>{{item.s_descri}}</div>
                <div v-on:click="removeEquipment(e)">删除</div>
            </div>
        </div>
        <div class="selectBar">
            <input type="text" v-model="dictionarySearchString" placeholder="输入搜索内容" />
        </div>
        <div>
            <div v-for="(item,i) in filterDictionary" :key='i' class='spellCard'>
                <div>{{item.s_name}}</div>
                <div>{{item.s_descri}}</div>
                <div>{{item.s_info}}</div>
                <div v-on:click="addEquipment(item)">添加</div>
            </div>
        </div>
        <div v-on:click="returnMain()">退出</div>
    </div>
</template>

<script>

export default {
    name: 'Spell',
    components:{
    },
    data () {
        return {
            bagData:[   
            ],
            dictionarySearchString:'',
            dictionary:[
                {
                    s_name:'虔诚护盾',
                    s_level:'1环',
                    s_descri:''
                },{
                    s_name:'疗伤术', 
                    s_level:'1环',
                    s_descri:''
                }
            ],
            selected:''
        }
    },
    mounted(){
        this.bagData = this.$route.query.playerData.p_spells
        console.log(this.bagData)
    },
    methods:{
        returnMain(){
            this.$router.push({ path: '/'});
        }
    },
    computed:{
        filterDictionary: function () {
            let e_array = this.dictionary;
            let searchString = this.dictionarySearchString;
			let selected = this.selected;

            if(!searchString && !selected){
				return e_array;
            }
			else if(!searchString && selected){
				e_array = e_array.filter(function(item){
					if(item.e_type.toLowerCase().indexOf(selected) !== -1){
						return item;
					}
				})
			}
			else{
				searchString = searchString.trim().toLowerCase();

				e_array = e_array.filter(function(item){
					if(item.s_name.toLowerCase().indexOf(searchString) !== -1){
						return item;
					}
				})
            }
            // 返回过来后的数组
            return e_array;
        },
    }
}
</script>

<style scoped>
.Spell{
    display:flex;
    flex-direction:column;
    border: medium double rgb(250,0,255);
}
.spellCard{
    display:flex;
    flex-direction: row;
    background-color: #61a1bc;
    border-radius:20px;
    margin: 2px;
    padding: 2px;
}

</style>