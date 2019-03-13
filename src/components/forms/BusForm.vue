<template>
	<div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong>公交车</strong> {{formTitle}}
                            </div>
                            <div class="card-body card-block">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label class=" form-control-label">公交车编号:</label></div>
                                        <div class="col-12 col-md-9">
                                            <p class="form-control-static">{{bus.busId}}</p>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">公交车名称：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="busName" name="busName" :placeholder="bus.busName" class="form-control"><small class="form-text text-muted">请输入公交车名称</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">生产日期：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="busCreateTime" name="busSize" readonly="" :placeholder="bus.busCreateTime" class="form-control"><small class="form-text text-muted">公交车生产日期</small></div>
                                    </div>
                                    
                                     <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">生产商：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="busProducer" name="busProducer" :placeholder="bus.busProducer" class="form-control"><small class="form-text text-muted">输入生产商</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">核载规格：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="busSize" name="busSize" :placeholder="bus.busSize" class="form-control"><small class="form-text text-muted">核载规格(人)</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">车牌号码：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="busPlateNumber" name="busPlateNumber" :placeholder="bus.busPlateNumber" class="form-control"><small class="form-text text-muted">车牌号码</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">供能类型：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="busFuel" name="busFuel" :placeholder="bus.busFuel" class="form-control"><small class="form-text text-muted">输入供能类型</small></div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">总线绑定：</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="select" data-placeholder="请选择" id="selectCan" class="form-control">
                                                <option value="" label="请选择" ></option>
                                                 <option v-for="can in canList" :value="can.canId" >{{can.canId}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" id = "statusLabel" class=" form-control-label">公交车状态：</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="select" data-placeholder="请选择" id="selectStatus" class="form-control">
                                                <option value="" label="请选择" ></option>
                                                <option value="1" >离线</option>
                                                <option value="2" >在线</option>
                                                <option value="3" >故障</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="textarea-input" class=" form-control-label">路线详情：</label></div>
                                        <div class="col-12 col-md-9"><textarea name="textarea-input" id="textDetail" rows="9" :placeholder="rdetail"  disabled=""  class="form-control"></textarea></div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">路线编号：</label></div>
                                        <div class="col-12 col-md-9">
                                           <select name="select" data-placeholder="请选择" id="selectRoute" class="form-control"  @change="showRoute($event)">
                                           		 <option value="0" label="请选择" ></option>
				                                <option v-for="route in routeList" :value="route.routeCode">{{route.def01}}</option>
				                            </select>
                                        </div>
                                    </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-sm" @click="submitForm()">
                                    <i class="fa fa-dot-circle-o"></i> 提交
                                </button>
                                <button type="reset" class="btn btn-danger btn-sm">
                                    <i class="fa fa-ban"></i> 重置
                                </button>
                            </div>
                        </div>
                 </div> 
</template>

<script>
	import '@/assets/css/normalize.css'
	import 'bootstrap/dist/css/bootstrap.css'
//  import '@/assets/css/lib/datatable/dataTables.bootstrap.min.css'
    import '@/assets/css/style.css'
    
	import $ from '@/assets/js/jq.js'
	import 'bootstrap'
    import 'jquery-match-height'
	import '@/assets/js/main.js'
	import '@/assets/css/lib/chosen/chosen.min.css'
	import '@/assets/js/lib/chosen/chosen.jquery.min.js'
	import axios from 'axios'
	import '@/assets/js/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.js'
	import '@/assets/js/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js'
	import '@/assets/js/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.css'
	
	
	
	jQuery(document).ready(function() {
        jQuery(".standardSelect").chosen({
            disable_search_threshold: 10,
            no_results_text: "查询不到相应值!",
            width: "100%"
        });
    });
	
	var busInfo = {
		name:"busInfo",
		data(){
			return {
					formTitle:"",
					Code:"",
					bus:{},
					routeList:[],
					canList:[],
					rdetail:[],
					list:[]
			}
		},
		install(Vue){
	  	Vue.component('bus-info', busInfo)
	 },
		created(){
			this.formTitle = this.$store.state.formTitle;
			
		},
		mounted(){
			var user1 = JSON.parse(window.localStorage.getItem("current_user"));
			
			$("#busCreateTime").datetimepicker({
			    			todayBtn : "linked",
							autoclose : true,
							todayHighlight : true,
							format: "yyyy-mm-dd",
							endDate : new Date(),
							language:'zh-CN',
							minView: "month"
			});
			this.getSelectList();
			this.getSelectList1();
			var temBusId = this.$route.params.objEdit;
			if(this.$route.params.tp == "edit"){
//				console.log(temBusId.busId);
				this.getUpdateObj(temBusId.busId);
				if(user1.userPower >2)
				{
					document.getElementById("selectStatus").style.display = "none";
					document.getElementById("statusLabel").style.display = "none";
				}
				else{
					document.getElementById("selectStatus").style.display = "";
					document.getElementById("statusLabel").style.display = "none";
				}
			}
		}
		,
		updated(){
			this.formTitle = this.$store.state.formTitle;
		},
		methods:{
			getSelectList(){
				const _this = this;
				$.ajax({
					 url: "/BusManagementSystem/route/getList.do?pageNum=1&pageSize=1000",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'get',
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						console.log(response);
						        if(response.status == 0){
//						        	console.log(response.data);
						        	_this.routeList = response.data.list;
						        }
						  console.log("routeList");
						  console.log(_this.routeList[0]);
    					}
				});
			}
			,
			getSelectList1(){
				const _this = this;
				$.ajax({
					 url: "/BusManagementSystem/can/getList.do?pageNum=1&pageSize=1000",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'get',
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						console.log(response);
						        if(response.status == 0){
//						        	console.log(response.data);
						        	_this.canList = response.data.list;
						        }
						  console.log("canList");
						  console.log(_this.canList[0]);
    					}
				})
			}
			,
			showRoute(evn){
				var val = evn.currentTarget.options[evn.currentTarget.selectedIndex].innerHTML
				document.getElementById("textDetail").value = val;
			}
			,
			submitForm(){
			if(this.$route.params.tp == "add"){
				const _this = this;
				var valCan = document.getElementById("selectCan");
				var valRoute = document.getElementById("selectRoute");
				var valStatus = document.getElementById("selectStatus");
				var val1 = document.getElementById("selectCan").options[valCan.selectedIndex].value;
				var val2 = document.getElementById("selectRoute").options[valRoute.selectedIndex].value;
				var val4 = valStatus.options[valStatus.selectedIndex].value;
				var val3 = null;
				if(val2 != null)
					val3 = document.getElementById("selectRoute").options[valRoute.selectedIndex].innerHTML;
//				console.log({
//					 	busName:document.getElementById("busName").value,
//					 	busProducer:document.getElementById("busProducer").value,
//					 	busFuel:document.getElementById("busFuel").value,
//					 	busSize:document.getElementById("busSize").value,
//					 	busPlateNumber:document.getElementById("busPlateNumber").value,
//					 	canId:val1,
//					 	busRouteCode:val2,
//					 	busRoute:val3,
//					 	def10:val4
//					});
				
				$.ajax({
					 url: "/BusManagementSystem/bus/insertBus.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	busName:document.getElementById("busName").value,
					 	busProducer:document.getElementById("busProducer").value,
					 	busFuel:document.getElementById("busFuel").value,
					 	busSize:document.getElementById("busSize").value,
					 	busPlateNumber:document.getElementById("busPlateNumber").value,
					 	canId:val1,
					 	busRouteCode:val2,
					 	busRoute:val3,
					 	def10:val4,
					 	busCreateTime:document.getElementById("busCreateTime").value
					 	
				},
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"bus"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:this.list}});
						        }
    					}
				})
			}
			else if(this.$route.params.tp == "edit"){
				const _this = this;
				var valCan = document.getElementById("selectCan");
				var valRoute = document.getElementById("selectRoute");
				var val1 = document.getElementById("selectCan").options[valCan.selectedIndex].value;
				var val2 = document.getElementById("selectRoute").options[valRoute.selectedIndex].value;
				var valStatus = document.getElementById("selectStatus");
				var val4 = valStatus.options[valStatus.selectedIndex].value;
				var val3 = null;
				if(val2 != null)
					val3 = document.getElementById("selectRoute").options[valRoute.selectedIndex].innerHTML;
				var up = JSON.stringify([{
						busId:this.bus.busId,
					 	busName:document.getElementById("busName").value,
					 	busProducer:document.getElementById("busProducer").value,
					 	busFuel:document.getElementById("busFuel").value,
					 	busSize:document.getElementById("busSize").value,
					 	busPlateNumber:document.getElementById("busPlateNumber").value,
					 	canId:val1,
					 	busRouteCode:val2,
					 	busRoute:val3,
					 	def10:val4,
					 	busCreateTime:document.getElementById("busCreateTime").value
					 	
				}]);
				
				$.ajax({
					 url: "/BusManagementSystem/bus/update_buses.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	buses:up
					 	
					 },
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"bus"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = _this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:_this.list}});
						        }
    					}
				})
			}
			},
			fetchData (url) {
                const _this = this;
                $.ajax({
                    url: url,
                    async:false,
                    success (res) {
                    	console.log(res.data.list);
                        _this.list = res.data.list
                    }
                })
            },
            getUpdateObj (val) {
                const _this = this;
                $.ajax({
                    url: "/BusManagementSystem/bus/search_buses_id.do",
                    async:false,
                    data:{
                    	busId:val
                    },
                    success (res) {
                        var upTemplist = res.data;
                        _this.bus = upTemplist[0];
                    }
                })
            }
			
		}
	}
	export default busInfo;
</script>

<style>
</style>