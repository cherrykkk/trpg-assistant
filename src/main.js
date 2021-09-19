// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.config.productionTip = false


import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data(){
    return{
      players:[],
      playerIndex:0
    }
  },
  created(){
    this.getPlayers()
  },
  methods:{
    getPlayers(){
      const that = this
      this.$axios.get('../api/pllayers.json')
        .then(function (response) {
            that.players = response.data
            console.log("ok")
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    setPlayerIndex(index){
      this.playerIndex = index
      console.log("set "+index)
    }
  },
})
