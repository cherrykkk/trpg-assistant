import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Players from '@/views/players/index.vue'
import SpellEdit from '@/views/spells/SpellEdit/SpellEdit.vue'
import Detail from '@/views/player/Detail/Detail.vue'
import Scene from '@/views/scene/index.vue'
import SpellBrowse from '@/views/spells/SpellBrowse/SpellBrowse.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Scene',
    },{
    //   path: '/players',
    //   // name: 'Players',
    //   component: Players,
    // },{
      path:'/spellEdit',
      // name: 'SpellEdit',
      component: SpellEdit
    },{
      path:'/player/detail',
      component: Detail
    },{
      path:'/Scene',
      component:Scene
    },{
      path:'/SpellBrowse',
      component:SpellBrowse
    }
  ]
})
