import Vuex from 'vuex'
import Vue  from 'vue'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({

    state:{
			page:'',
             tableInfo:{},
			formTitle:"",
			itmList:[],
			user:{},
			tableList:[],
			templist:[]

      },
      mutations:{

           setTableInfo(tableInfo) {

                   state.tableInfo = tableInfo            

             },
			setCanTitle(formTitle) {

                   state.formTitle = formTitle            

             },
			setItmList(itmList) {

                   state.itmList = itmList            

             },
			setUser(user) {

                   state.user = user            

             },
			setPage(page){
				state.page = page;
			},
			setTableList(tableList){
				state.tableList = tableList;
			}

        },
	plugins: [createPersistedState()]
})
