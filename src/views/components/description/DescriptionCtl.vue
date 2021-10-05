<template>
    <div class='description'>
        <weapon-description v-if="type=='weapon'" :data='data'></weapon-description>
        <armor-description v-if="type=='armor'" :data='data'></armor-description>
        <spell-description v-if="type=='spell'" :data='data'></spell-description>
        <div v-if='type==null'>无结果</div>
    </div>
</template>

<script>
import WeaponDescription from './WeaponDescription.vue'
import ArmorDescription from './ArmorDescription.vue'
import SpellDescription from './SpellDescription.vue'

export default {
    components:{
        WeaponDescription,
        ArmorDescription,
        SpellDescription
    },
    props:{
        data:Object
    },
    data () {
        return {
            type:""
        }
    },
    watch:{
        data:{
            handler(data) {
                if(!data)
                    this.type = null
                else if(data['武器名称'])
                    this.type = "weapon"
                else if(data['护甲名称'])
                    this.type = 'armor'
                else if(data['法术名称'])
                    this.type = 'spell'
                else 
                    this.type = null
            },
            immediate: true
        }
    }
}

</script>

<style scoped>
.description{
    background-color: rgba(153, 153, 153,0.2);
}

</style>