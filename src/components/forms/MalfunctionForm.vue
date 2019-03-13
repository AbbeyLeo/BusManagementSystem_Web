<template>
<div class = "col-md-12">
	<div class="card">
                            <div class="card-header">
                                <strong>故障</strong> {{formTitle}}
                            </div>
                            <div class="card-body card-block">
                                <form action="#" method="post" enctype="multipart/form-data" class="form-horizontal">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label class=" form-control-label">故障编码</label></div>
                                        <div class="col-12 col-md-9">
                                            <p class="form-control-static">{{malfunction.malfunctionCode}}</p>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">故障类型</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="select" id="malfunctionType" class="form-control">
                                                <option value="">请选择</option>
                                                <option value="1">公交车故障</option>
                                                <option value="2">设备故障</option>
                                                <option value="3">未知故障</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">故障名称：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="malfunctionName" name="text-input" :placeholder="malfunction.malfunctionName" class="form-control"><small class="form-text text-muted">请填写故障名称</small></div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="textarea-input" class=" form-control-label">故障描述</label></div>
                                        <div class="col-12 col-md-9"><textarea name="textarea-input" id="malfunctionDetail" rows="9" :placeholder="malfunction.malfunctionDetail" class="form-control"></textarea></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">故障公交车</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="select" id="malfunctionBus" class="form-control">
                                                <option value="">请选择</option>
                                                <option v-for="bus in busList" :value="bus.busPlateNumber">{{bus.busName}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">故障设备</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="select" id="malfunctionDevice" class="form-control">
                                                <option value="">请选择</option>
                                                <option v-for="device in deviceList" :value="device.deviceCode">{{device.deviceName}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
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
	
	var malfunctionInfo = {
		name:"malfunctionInfo",
		data(){
			return {
					formTitle:"",
					malfunction:{},
					list:[],
					deviceList:[],
					busList:[]
			}
		},
		install(Vue){
	  	Vue.component('malfunction-info', malfunctionInfo)
	 },
		created(){
			this.$store.state.formTitle = "添加";
			this.canTitle = this.$store.state.formTitle;
		},
		mounted(){
			this.getSelectList();
			this.getSelectList1();
			var tempObj = this.$route.params.objEdit;
			if(this.$route.params.tp == "edit"){
				console.log(tempObj.malfunctionCode);
				this.getUpdateObj(tempObj.malfunctionCode);
				
			}
		}
		,
		updated(){
			this.canTitle = this.$store.state.formTitle;
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
						  console.log("busList");
						  console.log(_this.busList[0]);
    					}
				});
			}
			,
			getSelectList1(){
				const _this = this;
				$.ajax({
					 url: "/BusManagementSystem/device/getList.do?pageNum=1&pageSize=1000",
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
						        	_this.deviceList = response.data.list;
						        }
						  console.log("deviceList");
						  console.log(_this.deviceList[0]);
    					}
				});
			}
			
			,
			submitForm(){
			if(this.$route.params.tp == "add"){
				alert(this.$route.params.tp);
				const _this = this;
				var malfunctionBus = document.getElementById("malfunctionBus");
				var malfunctionType = document.getElementById("malfunctionType");
				var malfunctionDevice =  document.getElementById("malfunctionDevice");
				var malBus = document.getElementById("malfunctionBus").options[malfunctionBus.selectedIndex].value;
				var malType = document.getElementById("malfunctionType").options[malfunctionType.selectedIndex].value;
				var malDevice =  document.getElementById("malfunctionDevice").options[malfunctionDevice.selectedIndex].value;
				
//				var up = JSON.stringify([{
//						malfunctionCode:this.malfunction.malfunctionCode,
//					 	malfunctionName:document.getElementById("malfunctionName").value == null || document.getElementById("malfunctionName").value == "" ? _this.malfunction.malfunctionName : document.getElementById("malfunctionName").value,
//					 	malfunctionDetail:document.getElementById("malfunctionDetail").value || document.getElementById("malfunctionDetail").value == "" ? _this.malfunction.malfunctionDetail : document.getElementById("malfunctionDetail").value,
//					 	malfunctionType:malType  == null || malType == "" ? _this.malfunction.malfunctionType: malType,
//					 	malfunctionBus:malBus == null || malBus == "" ? _this.malfunction.malfunctionBus: malBus,
//					 	malfunctionDevice:malDevice == null || malDevice == "" ? _this.malfunction.malfunctionDevice: malDevice
//					 	
//				}]);
				
				$.ajax({
					 url: "/BusManagementSystem/malfunction/insert_malfunction.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
						malfunctionCode:this.malfunction.malfunctionCode,
					 	malfunctionName:document.getElementById("malfunctionName").value,
					 	malfunctionDetail:document.getElementById("malfunctionDetail").value,
					 	malfunctionType:malType,
					 	malfunctionBus:malBus,
					 	malfunctionDevice:malDevice
					 	
				},
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"malfunction"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:this.list}});
						        }
    					}
				})
			}
			else if(this.$route.params.tp == "edit"){
				const _this = this;
				var malfunctionBus = document.getElementById("malfunctionBus");
				var malfunctionType = document.getElementById("malfunctionType");
				var malfunctionDevice =  document.getElementById("malfunctionDevice");
				var malBus = document.getElementById("malfunctionBus").options[malfunctionBus.selectedIndex].value;
				var malType = document.getElementById("malfunctionType").options[malfunctionType.selectedIndex].value;
				var malDevice =  document.getElementById("malfunctionDevice").options[malfunctionDevice.selectedIndex].value;
//				var up = JSON.stringify([{
//						malfunctionCode:_this.malfunction.malfunctionCode,
//					 	malfunctionName:document.getElementById("malfunctionName").value == null || document.getElementById("malfunctionName").value == "" ? _this.malfunction.malfunctionName : document.getElementById("malfunctionName").value,
//					 	malfunctionDetail:document.getElementById("malfunctionDetail").value || document.getElementById("malfunctionDetail").value == "" ? _this.malfunction.malfunctionDetail : document.getElementById("malfunctionDetail").value,
//					 	malfunctionType:malType  == null || malType == "" ? _this.malfunction.malfunctionType: malType,
//					 	malfunctionBus:malBus == null || malBus == "" ? _this.malfunction.malfunctionBus: malBus,
//					 	malfunctionDevice:malDevice == null || malDevice == "" ? _this.malfunction.malfunctionDevice: malDevice
//					 	
//				}]);
				
				$.ajax({
					 url: "/BusManagementSystem/malfunction/update_malfunction.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
						malfunctionCode:this.malfunction.malfunctionCode,
					 	malfunctionName:document.getElementById("malfunctionName").value == null || document.getElementById("malfunctionName").value == "" ? _this.malfunction.malfunctionName : document.getElementById("malfunctionName").value,
					 	malfunctionDetail:document.getElementById("malfunctionDetail").value == null || document.getElementById("malfunctionDetail").value == "" ? _this.malfunction.malfunctionDetail : document.getElementById("malfunctionDetail").value,
					 	malfunctionType:malType  == null || malType == "" ? _this.malfunction.malfunctionType: malType,
					 	malfunctionBus:malBus == null || malBus == "" ? _this.malfunction.malfunctionBus: malBus,
					 	malfunctionDevice:malDevice == null || malDevice == "" ? _this.malfunction.malfunctionDevice: malDevice
					 	
				},
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"malfunction"+"/getList.do?pageNum=1&pageSize=100");
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
                    url: "/BusManagementSystem/malfunction/search_malfunction_code.do",
                    async:false,
                    data:{
                    	malfunctioncode:val
                    },
                    success (res) {
                    	console.log(res);
                        var upTemplist = res.data;
                        _this.malfunction = upTemplist[0];
                    }
                })
            }
			
		}
	}
	export default malfunctionInfo;
</script>

<style>
</style>