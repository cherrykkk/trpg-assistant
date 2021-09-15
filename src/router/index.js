import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Players from '@/views/players/index.vue'
import SpellEdit from '@/views/spells/SpellEdit'
import Detail from '@/views/players/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/players',
    },{
      path: '/players',
      // name: 'Players',
      component: Players,
    },{
      path:'/spellEdit',
      // name: 'SpellEdit',
      component: SpellEdit
    },{
      path:'/player/detail',
      component: Detail
    }
  ]
})
