import Vue from 'vue'
import Router from 'vue-router'
import { isMobile } from '../utils/isMobile'
// import HelloWorld from '@/components/HelloWorld'
// import Players from '@/views/players/index.vue'
import SpellEdit from '@/views/spells/SpellEdit.vue'
import Detail from '@/views/player/Detail/Detail.vue'
import Scene from '@/views/Scene/Scene.vue'
import SceneMobile from '@/views/Scene/SceneMobile.vue'
import SpellBrowse from '@/views/spells/SpellBrowse.vue'
import SpellBrowseMobile from '@/views/spells/SpellBrowseMobile.vue'
import EquipmentEdit from '@/views/equipment/EquipmentEdit.vue'
import EquipmentBrowse from '@/views/equipment/EquipmentBrowse.vue'
import fight from '@/views/fight/fightView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Scene',
    },{
      path:'/spellEdit',
      component: SpellEdit
    },{
      path:'/player/detail',
      component: Detail
    },{
      path:'/Scene',
      component: isMobile() ? SceneMobile : Scene
    },{
      path:'/SpellBrowse',
      component: isMobile() ? SpellBrowseMobile : SpellBrowse 
    },{
      path:'/equipmentEdit',
      component:EquipmentEdit
    },{
      path:'/equipmentBrowse',
      component:EquipmentBrowse
    },{
      path:'/fight',
      component:fight
    }
  ]
})
