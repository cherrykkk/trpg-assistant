<template>
    <ul>
        <li v-for="(item,i) in showList" :key='i' class='spellCard'>
           <spell-cell :title='item.法术名称'></spell-cell>
        </li>
    </ul>
</template>

<script>
import SpellCell from './SpellCell'
export default {
  components: { SpellCell },
    props:{
        showList:Array
    },
}
</script>

<style scoped>
ul{
    display:flex;
    flex-wrap: wrap;
    flex-direction: row;
    /* background-color: #61a1bc; */
    border-radius:20px;
}
</style>