import Vue from 'vue'
import App from './App.vue'
import VueCompostionApi from '@vue/composition-api'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'

Vue.config.productionTip = false
Vue.use(VueCompostionApi)

const firebaseConfig = {
  apiKey: 'AIzaSyAx8uhIikqVKoTQdDDX161eVp27KDAjdKw',
  authDomain: 'new-entry-82d84.firebaseapp.com',
  databaseURL: 'https://new-entry-82d84.firebaseio.com',
  projectId: 'new-entry-82d84',
  storageBucket: 'new-entry-82d84.appspot.com',
  messagingSenderId: '105427077190',
  appId: '1:105427077190:web:f056d6fc9e58cbf5aa6247',
  measurementId: 'G-FNWFWSD0LC',
}
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
