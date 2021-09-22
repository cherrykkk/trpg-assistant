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
      playerIndex:0,
      refresh:true  //每次需要重新取players值时，置反
    }
  },
  created(){
    //重定向判定:若用户刷新时不在主页面，则回到主页面
    if(this.$route.path != '/Scene')
      this.$router.push({path:'/Scene'})

    this.getPlayers()
  },
  methods:{
    getPlayers(){
      const that = this
      this.$axios.get(`../api/pllayers.json?${Math.random()}`)
        .then(function (response) {
            that.players = response.data
            that.refresh = !that.refresh
            console.log("getPlayers done")
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getPlayer(){
      console.log("players="+this.players+" playerIndex="+this.playerIndex)
      return this.players[this.playerIndex]
    },
    setPlayerIndex(index){
      this.playerIndex = index
      console.log("set "+index)
    }
  },
})
