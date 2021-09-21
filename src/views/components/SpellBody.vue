<template>
    <div class='detail' :class="{'unfold':!fold}">
        <div class='description'>
            <p>{{data.法术说明}}</p>
            <p>{{data.法术升阶}}</p>
        </div>
        <div class='tag'>
            <span>{{data.等级}}</span>
            <span>{{data.派系}}</span>
            <span>{{data.法术成分}}</span>
            <span>{{data.施法时间}}</span>
            <span>{{data.持续时间}}</span>
            <span>{{data.施法距离}}</span>
            <span v-if='data.豁免'>{{data.豁免}}</span>
            <span v-if='data.专注'>{{data.专注}}</span>
            <span v-if='data.仪式'>{{data.仪式}}</span>
        </div>
        <div class='tag space'>
            <span v-for='(item,i) in classArr' :key='i'>{{item}}</span>
        </div>
    </div>
</template>