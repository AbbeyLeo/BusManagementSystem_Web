<template>
	<div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong>设备</strong> {{formTitle}}
                            </div>
                            <div class="card-body card-block">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label class=" form-control-label">设备编码</label></div>
                                        <div class="col-12 col-md-9">
                                            <p class="form-control-static">{{device.deviceCode}}</p>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">设备编码：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="deviceCode1" name="text-input" disabled="" :placeholder="device.deviceCode" class="form-control"><small class="form-text text-muted">请填写设备编码</small></div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">设备名称：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="deviceName" name="text-input" :placeholder="device.deviceName" class="form-control"><small class="form-text text-muted">请填写设备名称</small></div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="textarea-input" class=" form-control-label">设备描述</label></div>
                                        <div class="col-12 col-md-9"><textarea name="textarea-input" id="deviceDecription" rows="9" :placeholder="device.deviceDecription" class="form-control"></textarea></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">所属公交车</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="select" id="select" class="form-control">
                                                <option value="0">请选择</option>
                                                <option v-for="bus in busList" :value="bus.busId">{{bus.busName}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">设备状态</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="select" id="deviceStatus" class="form-control">
                                                <option value="">请选择</option>
                                                <option  value="0">未使用</option>
                                                <option  value="1">使用中</option>
                                                <option  value="2">故障</option>
                                            </select>
                                        </div>
                                    </div>
                            </div>
                            <div class="card-footer">
                                 <button type="button" class="btn btn-primary btn-sm" @click="submitForm">
                                    <i class="fa fa-dot-circle-o" ></i> Submit
                                </button>
                                <button type="reset" class="btn btn-danger btn-sm">
                                    <i class="fa fa-ban"></i> Reset
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
	
	var deviceInfo = {
		name:"deviceInfo",
		data(){
			return {
					formTitle:"",
					device:{},
					busList:{},
					list:[]
			}
		},
		install(Vue){
	  	Vue.component('device-info', deviceInfo)
	 },
		created(){
			this.$store.state.formTitle = "添加";
			this.canTitle = this.$store.state.formTitle;
		},
		mounted(){
			this.getSelectList();
			var tempObj = this.$route.params.objEdit;
			if(this.$route.params.tp == "edit"){
				console.log(tempObj.deviceCode);
				this.getUpdateObj(tempObj.deviceCode);
			}
			console.log(document.getElementById("deviceCode1").hasAttribute('disabled'));
			
			if((typeof(this.device.deviceCode) == "undefined") && document.getElementById("deviceCode1").hasAttribute('disabled'))
				document.getElementById("deviceCode1").removeAttribute('disabled');
			else if (!document.getElementById("deviceCode1").hasAttribute('disabled')){
					document.getElementById("deviceCode1").setAttribute('disabled',"");
			}
			
		}
		,
		updated(){
			
		},
		methods:{
			getSelectList(){
				const _this = this;
				$.ajax({
					 url: "/BusManagementSystem/bus/getList.do?pageNum=1&pageSize=1000",
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
						        	_this.busList = response.data.list;
						        }
    					}
				});
			}
			,
			
			submitForm(){
			if(this.$route.params.tp == "add"){
				const _this = this;
				var SelectObj = document.getElementById("select");
				var val1 = document.getElementById("select").options[SelectObj.selectedIndex].value;
				var statusObj = document.getElementById("deviceStatus");
				var val2 = document.getElementById("deviceStatus").options[statusObj.selectedIndex].value;
				console.log({
					 	deviceCode:document.getElementById("deviceCode1").value,
					 	deviceName:document.getElementById("deviceName").value,
					 	deviceDecription:document.getElementById("deviceDecription").value,
					 	deviceBus:val1,
					 	deviceStatus:val2
					});
				
				$.ajax({
					 url: "/BusManagementSystem/device/insert_device.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	deviceCode:document.getElementById("deviceCode1").value,
					 	deviceName:document.getElementById("deviceName").value,
					 	deviceDecription:document.getElementById("deviceDecription").value,
					 	deviceBus:val1,
					 	deviceState:val2
					},
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"device"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:this.list}});
						        }
    					}
				})
			}
			else if(this.$route.params.tp == "edit"){
				const _this = this;
				var devName = null;
				if(document.getElementById("deviceName").value == null || document.getElementById("deviceName").value == "")
				{
					devName = this.device.deviceName;
				}
				else{
					devName =document.getElementById("deviceName").value;
				}
				var SelectObj = document.getElementById("select");
				var valRoute = document.getElementById("deviceStatus");
				var val1 = document.getElementById("select").options[SelectObj.selectedIndex].value;
				var val2 = document.getElementById("deviceStatus").options[valRoute.selectedIndex].value;
				var up = JSON.stringify([{
					 	deviceCode:_this.device.deviceCode,
					 	deviceName:devName,
					 	def01:document.getElementById("deviceDecription").value,
					 	deviceBus:val1,
					 	deviceState:val2
					}]);
				
				$.ajax({
					 url: "/BusManagementSystem/device/update_devices.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	devices:up
					 	
					 },
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"device"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = _this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:_this.list}});
						        }
    					}
				})
			}
			}
			
			,
			
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
            }
			
			,
			
			getUpdateObj (val) {
                const _this = this;
                $.ajax({
                    url: "/BusManagementSystem/device/search_device_bycode.do",
                    async:false,
                    data:{
                    	deviceCode:val
                    },
                    success (res) {
                        var upTemplist = res.data;
                        _this.device = upTemplist[0];
                    }
                })
            }
		}
	}
	export default deviceInfo;
</script>

<style>
</style>