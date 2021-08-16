<template>
    <div>
        <h4>已学法术</h4>
        <ul>
            <li v-for="(item,i) in bag" :key='i'>
                <spell-cell :title='item'></spell-cell>
            </li>
        </ul>
    </div>
</template>

<script>
import SpellCell from './SpellCell'
export default {
    components: { SpellCell },
    props:{
        bag:Array
    },
    data(){
        return{
        }
    }
}
</script>

<style scoped>
.ul{
    display:flex;
    flex-direction: row;
    margin: 2px;
    padding: 2px;
}
li{
    display: inline-block;
}
</style>
