<template>
	<div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong>判定标准</strong>设置
                            </div>
                            <div class="card-body card-block">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">刹车异常值：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="brakeData" name="text-input" :placeholder="standard.brakeData" class="form-control"><small class="form-text text-muted">请输入刹车异常监控值(单位:牛顿N)</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">刹车异常范围：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="brakeAllow" name="text-input" :placeholder="standard.brakeAllow" class="form-control"><small class="form-text text-muted">请输入刹车异常范围(单位:次times)</small></div>
                                    </div>
                                    
                                     <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">速度监控值：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="speedData" name="text-input" :placeholder="standard.speedData" class="form-control"><small class="form-text text-muted">请输入速度异常监控值(单位:千米每小时km/h)</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">速度异常范围：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="speedAllow" name="speedAllow" :placeholder="standard.speedAllow" class="form-control"><small class="form-text text-muted">请输入速度异常范围(单位:次times)</small></div>
                                    </div>
                                    
                                     <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">加速度监控值：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="accelerationData" name="text-input" :placeholder="standard.accelerationData" class="form-control"><small class="form-text text-muted">请输入加速度异常监控值(单位:m/s²)</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">加速度异常范围：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="accelerationAllow" name="text-input" :placeholder="standard.accelerationAllow" class="form-control"><small class="form-text text-muted">请输入加速度异常范围(次)</small></div>
                                    </div>
                                    
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">能耗监控值：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="energyConsumption" name="text-input" :placeholder="standard.energyConsumption" class="form-control"><small class="form-text text-muted">请输入能耗异常监控值(单位:焦耳J)</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">转向弧度监控值：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="steerData" name="text-input" :placeholder="standard.steerData" class="form-control"><small class="form-text text-muted">请输入转向弧度异常监控值(单位:弧度r)</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">转向速度监控值：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="steerSpeedData" name="text-input" :placeholder="standard.steerSpeedData" class="form-control"><small class="form-text text-muted">请输入转向速度监控值(单位:km/h)</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">平均速度监控值：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="averageSpeedData" name="text-input" :placeholder="standard.averageSpeedData" class="form-control"><small class="form-text text-muted">请输入平均速度监控值(单位:km/h)</small></div>
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
	
	var srandardInfo = {
		name:"srandardInfo",
		data(){
			return {
					formTitle:"",
					standard:{}
			}
		},
		install(Vue){
	  	Vue.component('standard-info', srandardInfo)
	 },
		created(){
			this.$store.state.formTitle = "更新";
			this.formTitle = this.$store.state.formTitle;
		},
		mounted(){
			this.getUpdateObj();
			var user1 = JSON.parse(window.localStorage.getItem("current_user"));
			if(user1.userPower != 4)
			{
				this.$route.params.tp = "fuckYou";
			}
			var tempObj = this.$route.params.objEdit;
			if(this.$route.params.tp == "edit"){
				console.log(tempObj);
				this.getUpdateObj();
			}
		},
		updated(){
			this.formTitle = this.$store.state.formTitle;
		},
		methods:{
			submitForm(){
			if(this.$route.params.tp == "edit"){
				const _this = this;
				var up = {
						decisionId:"001",
						brakeData:document.getElementById("brakeData").value,
						brakeAllow:document.getElementById("brakeAllow").value,
						speedData:document.getElementById("speedData").value,
						speedAllow:document.getElementById("speedAllow").value,
						accelerationData:document.getElementById("accelerationData").value,
						accelerationAllow:document.getElementById("accelerationAllow").value,
						energyConsumption:document.getElementById("energyConsumption").value,
						steerData:document.getElementById("steerData").value,
						steerSpeedData:document.getElementById("steerSpeedData").value,
						averageSpeedData:document.getElementById("averageSpeedData").value
					 	
				};
				$.ajax({
					 url: "/BusManagementSystem/safe/set_safety_standard.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:up,
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
////									_this.fetchData("/BusManagementSystem/"+"safe"+"/getList.do?pageNum=1&pageSize=100");
//									_this.$store.state.templist = _this.list;
//									_this.$router.replace( {name:"htable",  params:{item:"",list:_this.list}});
						        }
    					}
				})
				}
			else{
				alert("您无权修改该信息");
			}
			}
			
			,
			
			getUpdateObj () {
                const _this = this;
                $.ajax({
                    url: "/BusManagementSystem/safe/get_safety_standard.do",
                    async:false,
                    success (res) {
                        var upTemp = res.data;
                        _this.standard = upTemp;
                    }
                })
            }
			
		}
	}
	export default srandardInfo;
</script>

<style>
</style>