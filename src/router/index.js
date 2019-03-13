import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

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

import leftMenu from '@/components/mainLeft/leftMenu'
import other from '@/components/otherpnl'
import login from '@/components/user/login'
import userInfo from '@/components/forms/UserInfoForm.vue'
import canInfo from '@/components/forms/CanForm.vue'
import deviceInfo from '@/components/forms/DeviceForm.vue'
import driverInfo from '@/components/forms/DriverForm.vue'
import malfunctionInfo from '@/components/forms/MalfunctionForm.vue'
import routeInfo from '@/components/forms/RouteForm.vue'
import busInfo from '@/components/forms/BusForm.vue'
import standardInfo from '@/components/forms/StandardForm.vue'
import stationInfo from '@/components/forms/StationForm.vue'
import dex from "@/components/Dex"
import showYe from '@/components/ShouYe'

import Vuex from 'vuex'
import store from '@/store/store.js'

Vue.use(Vuex)
Vue.use(Router)

export default new Router({
	mode:'history',
	base:'/',
  routes: [
  {
      path: '/',
      name: 'login',
      components: {
      	mainBox:login
      	
      }
   },
    {
      path: '/main',
      name: 'index',
      components: {
      	mainMenu:leftMenu,
      	mainBox:other,
      },
      children: [
      {
      	path:'/',
      	name:'shouYe',
      	components:{
      		content:showYe
      	}
      },
      {
      	path:'/busform',
      	name:'busform',
      	components:{
      		content:busInfo
      	}
      },
      {
      	path:'/canform',
      	name:'canform',
      	components:{
      		content:canInfo
      	}
      },
      {
      	path:'/deviceform',
      	name:'deviceform',
      	components:{
      		content:deviceInfo
      	}
      },
      {
      	path:'/driverform',
      	name:'driverform',
      	components:{
      		content:driverInfo
      	}
      },
      {
      	path:'/device',
      	name:'deviceform',
      	components:{
      		content:deviceInfo
      	}
      },
      {
      	path:'/malfunctionform',
      	name:'malfunctionform',
      	components:{
      		content:malfunctionInfo
      	}
      },
      {
      	path:'/routeform',
      	name:'routeform',
      	components:{
      		content:routeInfo
      	}
      },
      {
      	path:'/standardform',
      	name:'standardform',
      	components:{
      		content:standardInfo
      	}
      },
      {
      	path:'/stationform',
      	name:'stationform',
      	components:{
      		content:stationInfo
      	}
      },
      {
      	path:'/userform',
      	name:'userform',
      	components:{
      		content:userInfo
      	}
      },
      {
      	path:'/htable',
      	name:'htable',
      	components:{
      		content:htable
      	}
      },
     {
     path:'/htable1',
      	name:'htable1',
      	components:{
      		content:htable1
      	}
     },
     {
     path:'/htable2',
      	name:'htable2',
      	components:{
      		content:htable2
      	}
     },
     {
     path:'/htable3',
      	name:'htable3',
      	components:{
      		content:htable3
      	}
     },
     {
     path:'/htable4',
      	name:'htable4',
      	components:{
      		content:htable4
      	}
     },
     {
     path:'/htable5',
      	name:'htable5',
      	components:{
      		content:htable5
      	}
     },
     {
     path:'/htable6',
      	name:'htable6',
      	components:{
      		content:htable6
      	}
     },
     {
     path:'/htable7',
      	name:'htable7',
      	components:{
      		content:htable7
      	}
     },
     {
     path:'/htable8',
      	name:'htable8',
      	components:{
      		content:htable8
      	}
     },
     {
     path:'/htable9',
      	name:'htable9',
      	components:{
      		content:htable9
      	}
     },
     {
     path:'/htable10',
      	name:'htable10',
      	components:{
      		content:htable10
      	}
     },
      {
     path:'/htable11',
      	name:'htable11',
      	components:{
      		content:htable11
      	}
     },
     {
     path:'/htable12',
      	name:'htable12',
      	components:{
      		content:htable12
      	}
     }
     ,
      {
     path:'/htable13',
      	name:'htable13',
      	components:{
      		content:htable13
      	}
     },
     
      ]
    }
  ]
})
