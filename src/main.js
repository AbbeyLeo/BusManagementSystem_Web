// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from '@/assets/js/jq.js'
import Vuex from 'vuex'
import store from '@/store/store.js'

import leftMenu from '@/components/mainLeft/leftMenu'
import other from '@/components/otherpnl'
import htable from '@/components/tbl/htable'
import htable1 from '@/components/tbl/htable1'
import htable2 from '@/components/tbl/htable2'
import htable3 from '@/components/tbl/htable3'
import htable4 from '@/components/tbl/htable4'
import htable5 from '@/components/tbl/htable5'
import htable6 from '@/components/tbl/htable6'
import htable7 from '@/components/tbl/htable7'
import htable8 from '@/components/tbl/htable8'
import htable9 from '@/components/tbl/htable9'
import htable10 from '@/components/tbl/htable10'
import htable11 from '@/components/tbl/htable11'
import htable12 from '@/components/tbl/htable12'
import htable13 from '@/components/tbl/htable13'
import login from '@/components/user/login'
import userInfo from '@/components/forms/UserInfoForm.vue'
import canInfo from '@/components/forms/CanForm.vue'
import deviceInfo from '@/components/forms/DeviceForm.vue'
import driverInfo from '@/components/forms/DriverForm.vue'
import malfunctionInfo from '@/components/forms/MalfunctionForm.vue'
import routeInfo from '@/components/forms/RouteForm.vue'
import busInfo from '@/components/forms/BusForm.vue'
import standardInfo from '@/components/forms/StandardForm.vue'
import dex from "@/components/Dex"

Vue.config.productionTip = false

Vue.use(leftMenu);
Vue.component("leftmenu",leftMenu);
Vue.use(other);
Vue.component("other",other);
Vue.use(htable);
Vue.component("htable",htable);
Vue.use(login);
Vue.component("login",login);
Vue.use(userInfo);
Vue.component("user-info", userInfo);
Vue.use(canInfo);
Vue.component("can-info", canInfo);
Vue.use(deviceInfo);
Vue.component("device-info", deviceInfo);
Vue.use(driverInfo)
Vue.component("driver-info", driverInfo);
Vue.use(malfunctionInfo)
Vue.component("malfunction-info", malfunctionInfo);
Vue.use(routeInfo)
Vue.component("route-info", routeInfo);
Vue.use(busInfo)
Vue.component("bus-info", busInfo);
Vue.use(standardInfo)
Vue.component("standard-info", standardInfo);

Vue.use(dex)
/* eslint-disable no-new */
new Vue({
	el: '#app',
  	router,
  	store,
  	components: { dex },
 	 template: '<main-box/>'		
})

