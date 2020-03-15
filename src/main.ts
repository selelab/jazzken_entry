import Vue from 'vue'
import App from './App.vue'
import VueCompostionApi from '@vue/composition-api'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueCompostionApi)

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
