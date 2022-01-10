import Vue from 'vue'
import Router from 'vue-router'
import { isMobile } from '../utils/isMobile'
import SpellEdit from '@/views/spells/SpellEdit.vue'
import Detail from '@/views/player/Detail/Detail.vue'
import memo from '@/views/Memo/memo.vue'
import SceneSwitch from '@/views/Scene/SceneSwitch.vue'
import SceneMobile from '@/views/Scene/SceneMobile.vue'
import SpellBrowse from '@/views/spells/SpellBrowse.vue'
import SpellBrowseMobile from '@/views/spells/SpellBrowseMobile.vue'
import EquipmentEdit from '@/views/equipment/EquipmentEdit.vue'
import EquipmentBrowse from '@/views/equipment/EquipmentBrowse.vue'
import fight from '@/views/fight/fightView'
import NonPlayerCharacterView from '@/views/character/NonPlayerCharacterView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/memo',
    },{
      path:'/spellEdit',
      component: SpellEdit
    },{
      path:'/player/detail',
      component: Detail
    },{
      path: '/character/nonPlayerCharacter',
      component: NonPlayerCharacterView
    },{
      path:'/memo',
      component: isMobile() ? SceneMobile : memo
    },{
      path: '/sceneSwitch',
      component: SceneSwitch
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
