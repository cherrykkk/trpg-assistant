<template>
    <div class='spells-bag'>
        <ul>
            <li v-for='(e,i) in player.p_spells' :key='i'>
                {{e}}
            </li>
        </ul>
        <div :class="['detail',[fold?'fold':'unfold']]">dd</div>
    </div>
</template>

<script>

export default {
    props:{
        player:Object
    },
    data(){
        return {
            fold:true
        }
    }
}

</script>

<style scoped>
li{
    display: inline-block;
    padding:0 4px;
    border:dotted 1px;
    margin:2px 3px;
}
.detail{
    overflow: hidden;
}
.fold{
    max-height:0px
}
.unfold{
    max-height: 200px;
}

</style>