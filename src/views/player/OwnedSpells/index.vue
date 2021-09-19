<template>
    <ul>
        <li v-for='(e,i) in datalist' :key='i'>
            {{e}}
        </li>
    </ul>
</template>

<script>

export default {
    props:{
        datalist:Array
    }
}

</script>
