<template>
    <div class='border'>
        <div class='line' style='transform:rotate(90deg)'>
            <div class='line' style='transform:rotate(90deg)'></div>
        </div>
    </div>
</template>

<style scoped>
.border{
    display: inline-block;
    width:14px;
    height:14px;
    background-color:green;
    border-radius: 7px;
    line-height: 14px;
}
.line{
    position: relative;
    height:14px;
    width:2px;
    background-color: white;
    margin:0 auto;
}
</style>