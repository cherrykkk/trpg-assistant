<template>
    <div>
        <weapon-description v-if="type=='weapon'" :data='data'></weapon-description>
        <armor-description v-if="type=='armor'" :data='data'></armor-description>
    </div>
</template>

<script>
import WeaponDescription from './WeaponDescription.vue'
import ArmorDescription from './ArmorDescription.vue'

export default {
    components:{
        WeaponDescription,
        ArmorDescription
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
                if(data.护甲名称 == '轻甲'||"中甲"||"重甲")
                    this.type = "armor"
                else 
                    this.type = 'weapon'
            },
            immediate: true
        }
    }
}

</script>
