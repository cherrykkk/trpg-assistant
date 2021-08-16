import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Players from '@/view/players/Players'
import SpellEdit from '@/view/spells/SpellEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Players',
      component: Players
    },{
      path:'/spellEdit',
      // name: 'SpellEdit',
      component: SpellEdit
    }
  ]
})
