<template>
    <div class='title'>
        {{name}}
        <add-icon v-if='adding'></add-icon>
    </div>
</template>

<script>
import AddIcon from '@/components/AddIcon.vue'

export default{
    components:{
        AddIcon
    },
    props:{
        name:String,
        adding:{
            default:false,
            type:Boolean
        }
    }
}

</script>
