<template>
	<div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong>站点</strong> {{formTitle}}
                            </div>
                            <div class="card-body card-block">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label class=" form-control-label">站点编号:</label></div>
                                        <div class="col-12 col-md-9">
                                            <p class="form-control-static">{{station.stationCode}}</p>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">站点编号：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="stationCode" name="stationCode" :placeholder="station.stationCode" class="form-control"><small class="form-text text-muted">请输入站点编号</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">站点名字：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="stationName" name="stationName" :placeholder="station.stationName" class="form-control"><small class="form-text text-muted">请输入名字</small></div>
                                    </div>
                            </div>
                            <div class="card-footer">
                                 <button type="button" class="btn btn-primary btn-sm" @click="submitForm">
                                    <i class="fa fa-dot-circle-o" ></i> Submit
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
	
	var stationInfo = {
		name:"stationInfo",
		data(){
			return {
					formTitle:"",
					station:{}
			}
		},
		install(Vue){
	  	Vue.component('route-info', stationInfo)
	 },
		created(){
			this.$store.state.formTitle = "";
			this.formTitle = this.$store.state.formTitle;
		},
		mounted(){
			var tempObj = this.$route.params.objEdit;
			if(this.$route.params.tp == "edit"){
				console.log(tempObj.stationCode);
				this.getUpdateObj(tempObj.stationCode);
				document.getElementById("stationCode").setAttribute('disabled',"");
			}else{
				document.getElementById("stationCode").removeAttribute('disabled');
			}
		},
		updated(){
			this.formTitle = this.$store.state.formTitle;
		},
		methods:{
			
			submitForm(){
			if(this.$route.params.tp == "add"){
				const _this = this;
				console.log({
					 	stationCode:document.getElementById("stationCode").value,
					 	stationName:document.getElementById("stationName").value
					 	
					});
				
				$.ajax({
					 url: "/BusManagementSystem/station/insert_station.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	stationCode:document.getElementById("stationCode").value,
					 	stationName:document.getElementById("stationName").value
					 	
					},
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"station"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:this.list}});
						        }
    					}
				})
			}
			else if(this.$route.params.tp == "edit"){
				const _this = this;
				var up = JSON.stringify([{
					 	stationCode:_this.station.stationCode,
					 	stationName:document.getElementById("stationName").value
					 	
					}]);
				
				$.ajax({
					 url: "/BusManagementSystem/station/update_stations.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	stations:up
					 	
					 },
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"station"+"/getList.do?pageNum=1&pageSize=100");
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
                    url: "/BusManagementSystem/station/search_station_code.do",
                    async:false,
                    data:{
                    	stationCode:val
                    },
                    success (res) {
                        var upTemplist = res.data;
                        _this.station = upTemplist[0];
                    }
                })
            }
			
		}
	}
	export default stationInfo;
</script>

<style>
</style>