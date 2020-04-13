import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'

import './assets/css/bootstrap.min.css'
import './assets/css/atlantis.css'
import './registerServiceWorker'

import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2'
import Role from './mixins/Role.js'

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueSweetalert2)
Vue.mixin(Role)

import 'sweetalert2/dist/sweetalert2.min.css';

import { mapActions, mapGetters } from 'vuex'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  computed: {
   	...mapGetters(['isAuth'])
   },
   methods: {
   	...mapActions('user', ['getUserLogin'])
   },
   created() {
   	if (this.isAuth) {
   		this.getUserLogin()
   	}
   }
})
