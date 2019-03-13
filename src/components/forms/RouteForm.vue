<template>
	<div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong>路线</strong> {{formTitle}}
                            </div>
                            <div class="card-body card-block">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label class=" form-control-label">路线编号:</label></div>
                                        <div class="col-12 col-md-9">
                                            <p class="form-control-static">{{route.routeCode}}</p>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label id = "routeCodePanel" for="text-input" class=" form-control-label">路线编号</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="routeCode" name="text-input" :placeholder="route.routeCode" class="form-control"><small class="form-text text-muted">请输入路线编号</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="textarea-input" class=" form-control-label">当前路线：</label></div>
                                        <div class="col-12 col-md-9"><!--<textarea name="textarea-input" id="nowRouteDetail" rows="9" placeholder="Content..."  disabled=""  class="form-control"></textarea>-->
                                        	<textarea name="textarea-input" id="routeDetail" rows="9" :placeholder="routeDetailNameValue"  disabled=""  class="form-control" ></textarea>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label">站点</label></div>
                                        <div class="col-12 col-md-9">
                                           <select name="select" data-placeholder="请选择" id="selectStation" class="form-control">
                                                <option value="0" label="请选择" ></option>
                                                 <option v-for="station in stationList" :value="station.stationCode" >{{station.stationName}}</option>
                                            </select>
                                        </div>
                                    </div>
                                     <div class="row form-group">
                                        <div class="col col-md-3"><label for="select" class=" form-control-label"></label></div>
		                                     <div class="col-20 col-md-10">
		                                        	<button type="button" class="btn btn-outline-secondary set-btn" @click="setStation">确定站点</button>
		                                        	<button type="button" class="btn btn-outline-secondary set-btn" @click="deleteStation">填错了</button>
		                                        </div>
		                             </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-sm" @click="submitForm">
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
	
	
	jQuery(document).ready(function() {
        jQuery(".standardSelect").chosen({
            disable_search_threshold: 10,
            no_results_text: "查询不到相应值!",
            width: "100%"
        });
    });
	
	var routeInfo = {
		name:"routeInfo",
		data(){
			return {
					formTitle:"",
					route:{},
					list:[],
					stationList:[],
					routeDetailList:[],
					routeDetailListValue:"",
					routeDetailNameList:[],
					routeDetailNameValue:""
			}
		},
		install(Vue){
	  	Vue.component('route-info', routeInfo)
	 },
		created(){
			this.$store.state.formTitle = "添加";
			this.formTitle = this.$store.state.formTitle;
		},
		mounted(){
			this.getSelectList();
			var tempObj = this.$route.params.objEdit;
			if(this.$route.params.tp == "edit"){
				console.log(tempObj.routeCode);
				this.getUpdateObj(tempObj.routeCode);
			}
			if(this.$route.params.tp == "edit"){
				document.getElementById("routeCodePanel").style.display = "none";
				document.getElementById("routeCode").style.display = "none";
				this.routeDetailNameValue = this.route.def01;
			}
			else{
				document.getElementById("routeCodePanel").style.display = "";
				document.getElementById("routeCode").style.display = "";
			}
		},
		updated(){
			this.formTitle = this.$store.state.formTitle;
		},
		methods:{
			remove(arr,val){
				if(arr.length >1) {
					Array.prototype.indexOf = function (val) {
					    for (var i = 0; i < this.length; i++) {
					        if (this[i] == val) return i;
					    }
					    return -1;
					};
				}
				else{
					arr = null;
				}
				
				Array.prototype.remove = function (val) {
				    var index = this.indexOf(val);
				    if (index > -1) {
				        this.splice(index, 1);
				    }
				};
				arr.remove(val);
			}
			
			,
			getSelectList(){
				const _this = this;
				$.ajax({
					 url: "/BusManagementSystem/station/getList.do?pageNum=1&pageSize=1000",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'get',
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
//						alert(1);
						console.log(response);
						        if(response.status == 0){
//						        	console.log(response.data);
						        	_this.stationList = response.data.list;
						        }
						  console.log("stationList");
						  console.log(_this.stationList[0]);
    					}
				});
			}
			
			,
			setStation(){
				var selectObj = document.getElementById("selectStation");
				var val1 = document.getElementById("selectStation").options[selectObj.selectedIndex].value;
				var check = 0;
				for(var i = 0; i< this.routeDetailList.length; i++){
					if(this.routeDetailList[i] == val1)
						check += 1;
					if(check >=1)
						break;
				}
				if(check <= 0 && val1 != "" && val1 != null){
					this.routeDetailList.push(val1);
					this.routeDetailNameList.push(document.getElementById("selectStation").options[selectObj.selectedIndex].innerHTML);
				}
				if(this.routeDetailList.length > 0){
					this.routeDetailListValue = this.routeDetailList[0];
					this.routeDetailNameValue = this.routeDetailNameList[0];
				}
				for(var i = 1; i< this.routeDetailList.length; i++){
					this.routeDetailListValue += '-' + this.routeDetailList[i];
					this.routeDetailNameValue += '-' + this.routeDetailNameList[i];
				}
				document.getElementById("routeDetail").value=this.routeDetailNameValue;
			}
			
			,
			deleteStation(){
				this.routeDetailList.pop();
				this.routeDetailNameList.pop();
				console.log(this.routeDetailList);
				console.log(this.routeDetailNameList);
				if(this.routeDetailList.length > 0){
					this.routeDetailListValue = this.routeDetailList[0];
					this.routeDetailNameValue = this.routeDetailNameList[0];
				}
				for(var i = 1; i< this.routeDetailList.length; i++){
					this.routeDetailListValue += '-' + this.routeDetailList[i];
					this.routeDetailNameValue += '-' + this.routeDetailNameList[i];
				}				
				document.getElementById("routeDetail").value=this.routeDetailNameValue;
			}
			,
			submitForm(){
			if(this.$route.params.tp == "add"){
				const _this = this;
				alert(_this.routeDetailListValue);
				console.log({
					 	routeCode:document.getElementById("routeCode").value,
					 	routeDetail:_this.routeDetailListValue,
					 	def01:_this.routeDetailNameValue
					 	
					});
				
				$.ajax({
					 url: "/BusManagementSystem/route/insert_route.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	routeCode:document.getElementById("routeCode").value,
					 	routeDetail:_this.routeDetailListValue,
					 	def01:_this.routeDetailNameValue
					 	
					},
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"route"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:this.list}});
						        }
    					}
				})
			}
			else if(this.$route.params.tp == "edit"){
				const _this = this;
				var up = JSON.stringify([{
					 	routeCode:_this.route.routeCode,
					 	routeDetail:_this.routeDetailListValue,
					 	def01:_this.routeDetailNameValue
					 	
					}]);
				
				$.ajax({
					 url: "/BusManagementSystem/route/update_routes.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	routes:up
					 	
					 },
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"route"+"/getList.do?pageNum=1&pageSize=100");
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
                    url: "/BusManagementSystem/route/select_route_bycode.do",
                    async:false,
                    data:{
                    	code:val
                    },
                    success (res) {
                        var upTemp = res.data;
                        _this.route = upTemp[0];
                    }
                })
            }
			
			
		}
	}
	export default routeInfo;
</script>

<style>
	.set-btn{
		margin-left:50%;
	}
</style>