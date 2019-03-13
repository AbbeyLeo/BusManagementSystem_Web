<template>
	<div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong>驾驶员</strong> {{formTitle}}
                            </div>
                            <div class="card-body card-block">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label class=" form-control-label">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</label></div>
                                        <div class="col-12 col-md-9">
                                            <p class="form-control-static">{{driver.driverCode}}</p>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="driverCode" name="text-input" :placeholder="driver.driverCode" class="form-control"><small class="form-text text-muted ">请填写驾驶员编号</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;字：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="driverName" name="text-input" :placeholder="driver.driverName" class="form-control"><small class="form-text text-muted">请填写驾驶员名字</small></div>
                                    </div>
                                     <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">身份证号：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="driverIdentity" name="text-input" :placeholder="driver.driverIdentity" class="form-control"><small class="form-text text-muted">请填写驾驶员身份证号码</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：</label></div>
                                        <div class="col-12 col-md-9"><input type="tel" id="driverPhone" name="tel-input" :placeholder="driver.driverPhone" class="form-control"><small class="form-text text-muted">请填写驾驶员手机号码</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">所属组织：</label></div>
                                        <div class="col-12 col-md-9"><input type="tel" id="driverOrganization" name="tel-input" :placeholder="driver.driverOrganization" class="form-control"><small class="form-text text-muted">请填写驾驶员所属组织</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">公交车：</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="select" id="select" class="form-control">
                                                <option value="0">请选择</option>
                                                <option v-for="bus in busList" :value="bus.busId">{{bus.busName}}</option>
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
	
	var driverInfo = {
		name:"driverInfo",
		data(){
			return {
					formTitle:"",
					driver:{},
					list:[],
					busList:[]
			}
		},
		install(Vue){
	  	Vue.component('driver-info', driverInfo)
	 },
		created(){
			this.$store.state.formTitle = "添加";
			this.canTitle = this.$store.state.formTitle;
		},
		mounted(){
			this.getSelectList();
			var tempObj = this.$route.params.objEdit;
			if(this.$route.params.tp == "edit"){
//				console.log(tempObj.driverCode);
				this.getUpdateObj(tempObj.driverCode);
			}
		},
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
						  console.log("busList");
						  console.log(_this.busList[0]);
    					}
				});
			}
			,
			
			submitForm(){
			if(this.$route.params.tp == "add"){
				const _this = this;
				var selectObj = document.getElementById("select");
				var val1 = document.getElementById("select").options[selectObj.selectedIndex].value;
				console.log({
					 	driverCode:document.getElementById("driverCode").value,
					 	driverName:document.getElementById("driverName").value,
					 	driverIdentity:document.getElementById("driverIdentity").value,
					 	driverPhone:document.getElementById("driverPhone").value,
					 	driverBus:val1
					 	
					});
				
				$.ajax({
					 url: "/BusManagementSystem/driver/insert_driver.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	driverCode:document.getElementById("driverCode").value,
					 	driverName:document.getElementById("driverName").value,
					 	driverIdentity:document.getElementById("driverIdentity").value,
					 	driverPhone:document.getElementById("driverPhone").value,
					 	driverBus:val1
					 	
					},
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"driver"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:this.list}});
						        }
    					}
				})
			}
			else if(this.$route.params.tp == "edit"){
				const _this = this;
				var selectObj = document.getElementById("select");
				var val1 = document.getElementById("select").options[selectObj.selectedIndex].value;
				var up = JSON.stringify([{
					 	driverCode:_this.driver.driverCode,
					 	driverName:document.getElementById("driverName").value,
					 	driverIdentity:document.getElementById("driverIdentity").value,
					 	driverPhone:document.getElementById("driverPhone").value,
					 	driverBus:val1
					 	
					}]);
				
				$.ajax({
					 url: "/BusManagementSystem/driver/update_drivers.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	drivers:up
					 	
					 },
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"driver"+"/getList.do?pageNum=1&pageSize=100");
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
            },
            getUpdateObj (val) {
                const _this = this;
                $.ajax({
                    url: "/BusManagementSystem/driver/search_by_code.do",
                    async:false,
                    data:{
                    	code:val
                    },
                    success (res) {
                    	console.log(res);
                        var upTemp = res.data;
                        _this.driver = upTemp;
                    }
                })
            }
			
			
		}
	}
	export default driverInfo;
</script>

<style>
</style>