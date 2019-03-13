<template>
  <div id="right-panel" class="right-panel">

        <!-- Header-->
        <header id="header" class="header">
            <div class="top-left">
                <div class="navbar-header">
                    <a class="navbar-brand" href="./"><h3 class = "logo-title">公交车辆管控系统的设计与实现</h3></a>
                    <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
                </div>
            </div>
            <div class="top-right">
                <div class="header-menu">
                    <div class="user-area dropdown float-right">
                        <a href="#" class="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <a class="nav-link" href="#"><i class="fa fa-user"></i>  <span class="username-lb">{{username}}</span></a>
                        </a>

                        <div class="user-menu dropdown-menu">

                            <a class="nav-link" href="#"><i class="fa fa-cog"></i>个人中心</a>

                            <a class="nav-link" @click="logout"><i class="fa fa-power-off"></i>注销登录</a>
                        </div>
                    </div>
                </div>
            </div>
        </header><!-- /header -->
        <!-- Header-->

        <div class="breadcrumbs " id = "search-top">
            <div class="breadcrumbs-inner">
            		<div class="card-body card-block">
                                <div class="row form-group">
                                        <div class="col col-md-2 ipm-start">
                                            <select name="select" data-placeholder="请选择" id="selectVal" class="form-control" tabindex="1">
                                                <option value="" label="请选择" ></option>
                                                <option v-for="item in selectList" :value="item.key">{{item.value}}</option>
                                            </select>
                                        </div>
                                        <div class="col col-md-4 ipm"><input type="text" id="searchVal" name="searchInput" placeholder="输入值查询" class="form-control" ></div>
                                         <div class="col col-md-1 ipm" ><button id = "searchBtn" type="button" class="btn btn-primary" @click="searchM">查询</button></div>
                                				<div class="col col-sd-9 ">
		                                         <button id = "add" type="button" class="btn btn-primary"@click="addM">添加</button>
		                                         <button id="edit" type="button" class="btn btn-primary" @click="editM">修改</button>
		                                         <button id = "del" type="button" class="btn btn-danger" @click="delM">删除</button>
                                  			</div>
                                </div>
                </div>
                
            </div>
        </div>

        <div class="content">
            <div class="animated fadeIn">
                <div class="row">
                	<router-view name="content" :resultList="responseList" :searchList="resSearchList" @sendList="getDelList" @sendUpd = "getUpd"/>
                </div>
            </div><!-- .animated -->
        </div><!-- .content -->


        <div class="clearfix"></div>

        <footer class="site-footer">
            <div class="footer-inner bg-white">
                <div class="row">
                    <div class="col-sm-6">
                       	版权归HONG管控开发团队所有
                    </div>
                    <div class="col-sm-6 text-right"> Designed by Abbey Leo
                    </div>
                </div>
            </div>
        </footer>

    </div><!-- /#right-panel -->

</template>

<script>
	import $ from '@/assets/js/jq.js'
	import '@/assets/css/normalize.css'
	import '@/assets/css/bootstrap.min.css'
	import '@/assets/css/font-awesome.min.css'
	import '@/assets/css/style.css'
	import '@/assets/js/main.js' 
	import axios from 'axios'
	import 'bootstrap/dist/css/bootstrap.css'
//	import '@/assets/js/bootstrap.js'
	import 'bootstrap'
	import BootstrapDialog from 'bootstrap-dialog'
//	import htable from '@/components/tbl/htable'
//	Vue.component('htable', htable);
	var other = {
		name:"other",
		data(){
			return {
				selectList:[],
				username:"",
				delurl:"/BusManagementSystem/",
				delList:[],
				searchurl:"",
				add:"",
				edit:"",
				del:"",
				search:"",
				responseList:null,
				upd:null,
				resSearchList:null
				
			}
		},
		props:['pToctempForm'],
		install(Vue){
	  	Vue.component('other', other);
//	  	Vue.use(htable);
	 },
		created(){
		},
		mounted(){
			var user = JSON.parse(window.localStorage.getItem("current_user"));
			this.username = user["username"];
			if(this.$store.state.page == 'index')
				document.getElementById("search-top").style.display = "none";
				else{
				document.getElementById("search-top").style.display = '';
			}
				this.setInit();
				this.checkSearch();
		},
		 updated(){
		 	
			if(this.$store.state.page == 'index' || window.localStorage.getItem("tableType") == "index")
				document.getElementById("search-top").style.display = "none";
				else{
				document.getElementById("search-top").style.display = '';
			}
				this.checkSearch();
		},
		watch: {
			upd(newVal,oldVal){
//				alert(window.localStorage.getItem("tableType"));
				this.setInit();
				this.checkSearch();
			},
			pToctempForm(newVal,oldVal){
					this.$store.state.page = 'index';
					window.localStorage.getItem("tableType", "index");
					document.getElementById("search-top").style.display = "none";
//					alert("bro get");
			}
		}
		,
		methods:{
			setInit(){
			var type = window.localStorage.getItem("tableType");
			if(window.localStorage.getItem("tableType") == "bus"){
				this.bus();}
			if(window.localStorage.getItem("tableType") == "driver"){
				this.driver();}
			if(window.localStorage.getItem("tableType") == "user"){
				this.user();}
			if(window.localStorage.getItem("tableType") == "device"){
				this.device();}
			if(window.localStorage.getItem("tableType") == "malfunction"){
//				alert(1);
				this.malfunction();}
			if(window.localStorage.getItem("tableType") == "station"){
				this.station();}
			if(window.localStorage.getItem("tableType") == "route"){
				this.route();}
			if(window.localStorage.getItem("tableType") == "power"){
				this.route();}
			if(window.localStorage.getItem("tableType") == "weight"){
				this.weight();}
			if(window.localStorage.getItem("tableType") == "report"){
				this.report();}
			if(window.localStorage.getItem("tableType") == "can"){
				this.Can();}
			if(window.localStorage.getItem("tableType") == "power"){
				this.power();}
				this.add = window.localStorage.getItem("tableType") + "form"
				this.edit = window.localStorage.getItem("tableType") + 'form';
				this.searchurl = "/BusManagementSystem/"+window.localStorage.getItem("tableType");
				this.delurl = "/BusManagementSystem/"+window.localStorage.getItem("tableType")+"/delete_"+this.del + ".do";				
			},
			bus(){
				this.del = "buses";
					this.selectList = [
							{
								key:"busId",
								value:"公交车编号"
							},
							{
								key:"route",
								value:"公交车路线"
							},
							]
			},
			user(){
					this.del = "users";
					this.selectList = [
//							{
//								key:"busId",
//								value:"公交车编号"
//							},
//							{
//								key:"route",
//								value:"公交车路线"
//							},
							]
			},
			device(){
				this.del = "devices";
					this.selectList = [
							{
								key:"deviceCode",
								value:"设备编号"
							},
							{
								key:"busId",
								value:"公交车编号"
							},
							{
								key:"deviceName",
								value:"设备名字"
							}
							]
			},
			driver(){
				this.del = "drivers";
					this.selectList = [
							{
								key:"driverName",
								value:"驾驶员名字"
							},
							{
								key:"code",
								value:"驾驶员编号"
							},
							{
								key:"busId",
								value:"公交车编号"
							},
							{
								key:"routeCode",
								value:"路线编码"
							}
							]
			},
			malfunction(){
				this.del = "malfunctions";
					this.selectList = [
							{
								key:"malfunctioncode",
								value:"故障编号"
							},
							{
								key:"malfunctionName",
								value:"故障名称"
							},
							{
								key:"type",
								value:"故障类型"
							},
							{
								key:"devicecode",
								value:"设备编号"
							}
							,
							{
								key:"devicename",
								value:"设备名称"
							}
							]
			},
			station(){
				this.del = "stations";
					this.selectList = [
							{
								key:"stationCode",
								value:"站点编号"
							},
							{
								key:"stationName",
								value:"站点名字"
							},
							]
			},
			route(){
				this.del = "routes";
					this.selectList = [
							{
								key:"code",
								value:"路线编号"
							},
							{
								key:"detail",
								value:"路线详细编码"
							},
							{
								key:"stationName",
								value:"站点名称"
								
							},
							{
								key:"startEnd",
								value:"起点和终点"
							}
							]
			},
			power(){
					this.selectList = [
//							{
//								key:"busId",
//								value:"公交车编号"
//							},
//							{
//								key:"route",
//								value:"公交车路线"
//							},
							]
			},
			Can(){
					this.del = "cans";
					this.selectList = [
							{
								key:"values",
								value:"总线编号"
							}
							]
			},
			weight(){
					this.selectList = [
//							{
//								key:"busId",
//								value:"公交车编号"
//							},
//							{
//								key:"route",
//								value:"公交车路线"
//							}
							]
			},
			report(){
				this.selectList = []
			}
			,
			addM(){
//				alert(window.localStorage.getItem("tableType"));
				this.$router.push( {name: window.localStorage.getItem("tableType")+"form", params:{tp:"add"}});
				this.$store.state.page = 'index';
					window.localStorage.getItem("tableType", "index");
					document.getElementById("search-top").style.display = "none"
				this.pToctempForm = this.RndNum(7);
			},
			editM(){
//				alert(window.localStorage.getItem("tableType")+"form");
				if(this.delList.length >1)
					alert("只能选一条记录");
				else if(this.delList.length<=0)
					alert("请选一条记录");
				else{
					this.$router.push( {name: window.localStorage.getItem("tableType")+"form", params:{tp:"edit", objEdit:this.delList[0]}});
					this.$store.state.page = 'index';
					window.localStorage.getItem("tableType", "index");
					document.getElementById("search-top").style.display = "none"
					this.pToctempForm = this.RndNum(7);
				}
			},
			delM(){
				//调用的时候将del的值json化
				var _this = this;
				var indexx = this.del;
				var delTemp = {};
				delTemp[indexx] = JSON.stringify(this.delList);
				$.ajax({
					 url: _this.delurl,
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 dataType:'json',
					 data:delTemp
				}).then(response=>{
//					console.log(response.data.status)
					if(response != null ){
											_this.responseList = _this.RndNum(7);
					           BootstrapDialog.show({
					           		title:'提示信息',
						            message: response.msg
						        });
						        if(reponse.status == 0)
						        	_this.responseList = _this.RndNum(7);
    					}
				})
			},
			searchM(){
				this.setSearch();
//				var select = document.getElementById("selectVal");
//				var index = select.selectedIndex; // 选中索引
//				var value = select.options[index].value; // 选中值
				var value = this.search;
				var searchval = document.getElementById("searchVal").value;
				var _this = this;
//				this.searchurl = window.localStorage.getItem("selecturl");
				var param = {};
				param[value] = searchval;
//				var jsonParam = JSON.stringify(param);
					$.ajax({
					 url: _this.searchurl,
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'get',
					 dataType:'json',
					 data:param,
					 anysc:false
				}).then(response=>{
//					console.log(response.data.status)
					if(response != null){
//											_this.responseList = _this.RndNum(7);
							if(response.status != 0){
					           BootstrapDialog.show({
					           		title:'提示信息',
						            message: response.msg
						        	});
						  }
							if(response.status == 0){
//								console.log(response);
									_this.resSearchList = response.data;
									 BootstrapDialog.show({
					           		title:'提示信息',
						            message: "查询成功！"
						        	});
//									console.log(this.resSearchList)
							}
//						        if(reponse.status == 0)
//						        	_this.responseList = _this.RndNum(7);
						//					_this.resSearchList = 
											//_this.responseList = response.data.data;
    					}
				})
			},
			getDelList(delList){
				this.delList = delList;
				console.log("要删除的");
				console.log(this.delList);
			}
			,
			getUpd(u){
				this.upd = u;
			}
			,
			checkSearch(){
				var options = document.getElementById("selectVal").options;
				if(options.length < 2)
					{
							document.getElementById("searchVal").style.display = "none";
							document.getElementById("searchBtn").style.display = "none";
							document.getElementById("selectVal").style.display = "none";
					}
				if(options.length >= 2)
					{
							document.getElementById("searchVal").style.display = "";
							document.getElementById("searchBtn").style.display = "";
							document.getElementById("selectVal").style.display = "";
					}
					if(window.localStorage.getItem("tableType") == "power" ||  window.localStorage.getItem("tableType") == "report"){
							document.getElementById("add").style.display = "none";
							document.getElementById("edit").style.display = "none";
							document.getElementById("del").style.display = "none";
					}
					else if(window.localStorage.getItem("tableType") == "user"){
						document.getElementById("add").style.display = "";
							document.getElementById("del").style.display = "";
							document.getElementById("edit").style.display = "none";
					}
					else{
						document.getElementById("add").style.display = "";
							document.getElementById("edit").style.display = "";
							document.getElementById("del").style.display = "";
					}
			}
			,
			setSearch(){
				var val = document.getElementById("selectVal").options[document.getElementById("selectVal").selectedIndex].value;
				
			if(window.localStorage.getItem("tableType") == "bus"){
				console.log(document.getElementById("selectVal").options[document.getElementById("selectVal").selectedIndex].value);
					if(val == "busId"){
						
						 this.searchurl = "/BusManagementSystem/bus/search_buses_id.do"
						 this.search = "busId";
					}
					if(val == "route"){
						 this.searchurl = "/BusManagementSystem/bus/search_buses_route.do"
						 this.search = "route";
					}
			}
			if(window.localStorage.getItem("tableType") == "driver"){
						if(val == "driverName"){
						 this.searchurl = "/BusManagementSystem/driver/search_by_name.do"
						 this.search = "driverName";
						}
						if(val == "busId"){
						 this.searchurl = "/BusManagementSystem/driver/search_by_bus.do"
						 this.search = "busId";
						}
						if(val == "routeCode"){
						 this.searchurl = "/BusManagementSystem/driver/search_by_route.do"
						 this.search = "routeCode";
						}
						
			}
			if(window.localStorage.getItem("tableType") == "device"){
					if(val == "deviceCode"){
						 this.searchurl = "/BusManagementSystem/device/search_device_bycode.do"
						 this.search = "deviceCode";
						}
					if(val == "busId"){
						 this.searchurl = "/BusManagementSystem/device/search_device_bybusid.do"
						 this.search = "busId";
						}
					if(val == "deviceName"){
						 this.searchurl = "/BusManagementSystem/device/search_device_byname.do"
						 this.search = "deviceName";
						}
			}
			if(window.localStorage.getItem("tableType") == "malfunction"){
					if(val == "devicecode"){
						 this.searchurl = "/BusManagementSystem/malfunction/search_malfunction_devicecode.do"
						 this.search = "devicecode";
						}
					if(val == "malfunctioncode"){
						 this.searchurl = "/BusManagementSystem/malfunction/search_malfunction_code.do"
						 this.search = "malfunctioncode";
						}
					if(val == "malfunctionName"){
						 this.searchurl = "/BusManagementSystem/malfunction/search_malfunction_name.do"
						 this.search = "malfunctionName";
						}
					if(val == "type"){
						 this.searchurl = "/BusManagementSystem/malfunction/search_malfunction_type.do"
						 this.search = "type";
						}
					if(val == "name"){
						 this.searchurl = "/BusManagementSystem/malfunction/search_malfunction_devicename.do"
						 this.search = "name";
						}
					if(val == "busId"){
						 this.searchurl = "/BusManagementSystem/malfunction/search_malfunction_busid.do"
						 this.search = "busId";
						}search_malfunction_routecode
					if(val == "code"){
						 this.searchurl = "/BusManagementSystem/malfunction/search_malfunction_routecode.do"
						 this.search = "code";
						}
			}
			if(window.localStorage.getItem("tableType") == "station"){
				if(val == "stationCode"){
						 this.searchurl = "/BusManagementSystem/station/search_station_code.do"
						 this.search = "stationCode";
						}
				if(val == "search_station_name"){
						 this.searchurl = "/BusManagementSystem/station/search_station_name.do"
						 this.search = "stationName";
						}
				
			}
			if(window.localStorage.getItem("tableType") == "route"){
				if(val == "code"){
						 this.searchurl = "/BusManagementSystem/route/select_route_bycode.do"
						 this.search = "code";
						}
				if(val == "detail"){
						 this.searchurl = "/BusManagementSystem/route/search_route_bydetail.do"
						 this.search = "detail";
						}
				if(val == "stationName"){
						 this.searchurl = "/BusManagementSystem/route/search_route_by_stationName.do"
						 this.search = "stationName";
						}
				if(val == "detail"){
						 this.searchurl = "/BusManagementSystem/route/search_route_by_detail01.do"
						 this.search = "detail";
						}
				if(val == "startEnd"){
						 this.searchurl = "/BusManagementSystem/route/search_route_by_startend.do"
						 this.search = "startEnd";
						}
			}
//			if(window.localStorage.getItem("tableType") == "power"){
//				
//			}
//			if(window.localStorage.getItem("tableType") == "weight"){
//				
//			}
//			if(window.localStorage.getItem("tableType") == "report"){
//				
//			}
			if(window.localStorage.getItem("tableType") == "can"){
					if(val == "values"){
						 this.searchurl = "/BusManagementSystem/route/search_cans.do"
						 this.search = "values";
						}
			}
				
			}
			,
			Monchange(){
				this.responseList = document.getElementById("searchVal").value;
			},
			RndNum(n){
		    var rnd="";
		    for(var i=0;i<n;i++)
		        rnd+=Math.floor(Math.random()*10);
		    return rnd;
			}
			,
			logout(){
				$.ajax({
					 url: "/BusManagementSystem/user/logout.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'get',
					 dataType:'json',
					 anysc:false
				}).then(response=>{
//					console.log(response.data.status)
					if(response != null ){
					           BootstrapDialog.show({
					           		title:'提示信息',
						            message: response.msg
						        });
						        window.localStorage.removeItem("current_user");
						        this.$router.push({path:"/"});
						        
    					}
				})
			}
		}
	}
	export default other;
</script>

<style>
	.logo-title{
		margin-top: 0em;
		margin-left: -1em;
		/*padding: 2em;*/
		color: #00ACED;
	}
	
	.fa-user{
		color: #28A745;
	}
	
	.username-lb{
		color:#00ACED;
	}
	.ipm-start{
		margin-right: -1em;
	}
	.ipm{
		margin-left: -1em;
		margin-right: -1em;
	}
	.bbtn{
		margin:0.2em;
		margin-top: 2em;
	}
	.breadcrumbs-dsb{
		display:none;
	}
	
</style>