<template>
<div class="col-md-12">
				<div class="card">
                            <div class="card-header">
                                <strong>总线</strong> {{formTitle}}
                            </div>
                            <div class="card-body card-block">
                                <form action="#" method="post" enctype="multipart/form-data" class="form-horizontal">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label class=" form-control-label">总线 id：</label></div>
                                        <div class="col-12 col-md-9">
                                            <p class="form-control-static">{{can.canId}}</p>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="text-input" class=" form-control-label">总线id：</label></div>
                                        <div class="col-12 col-md-9"><input id="canId" type="text" name="canId" :placeholder="can.canId" disabled="" class="form-control" :value="can.canId"><small class="form-text text-muted">填写修改的总线Id,不修改请留空</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="textarea-input" class=" form-control-label">详细描述</label></div>
                                        <div class="col-12 col-md-9"><textarea name="textarea-input" id="canDecription" rows="9" :placeholder="can.canDiscription" class="form-control"></textarea></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="disabledSelect" class=" form-control-label">启用状态</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="enable" id="enable" class="form-control">
                                                   <option value="">请选择</option>
                                                <option value="0">否</option>
                                                <option value="1">是</option>
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
	
	var canInfo = {
		name:"canInfo",
		data(){
			return {
					formTitle:"",
					can:{},
					list:[]
			}
		},
		install(Vue){
	  	Vue.component('can-info', canInfo)
	 },
		created(){
			this.$store.state.formTitle = "";
			this.formTitle = this.$store.state.formTitle;
		},
		mounted(){
			var tempObj = this.$route.params.objEdit;
			if(this.$route.params.tp == "edit"){
				console.log(tempObj.canId);
				this.getUpdateObj(tempObj.canId);
			}
			if((typeof(this.can.canId) == "undefined") && document.getElementById("canId").hasAttribute('disabled'))
				document.getElementById("canId").removeAttribute('disabled');
			else if (!document.getElementById("canId").hasAttribute('disabled')){
					document.getElementById("canId").setAttribute('disabled',"");
			}
		},
		updated(){
			this.formTitle = this.$store.state.formTitle;
		},
		methods:{
			submitForm(){
			if(this.$route.params.tp == "add"){
				const _this = this;
				var val1 = document.getElementById("enable").options[document.getElementById("enable").selectedIndex].value;
				console.log({
					 	canId:document.getElementById("canId").value,
					 	canDecription:document.getElementById("canDecription").value,
						 def01:val1
					});
				
				$.ajax({
					 url: "/BusManagementSystem/can/insert_can.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	canId:document.getElementById("canId").value,
					 	canDiscription:document.getElementById("canDecription").value,
						 def01:val1
					},
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"can"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = this.list;
									_this.$router.replace( {name:"htable",  params:{item:"",list:this.list}});
						        }
    					}
				})
			}
			else if(this.$route.params.tp == "edit"){
				const _this = this;
				var id = document.getElementById("canId").value == null ? _this.can.canId : document.getElementById("canId").value;
//				alert(id);
				var val1 = document.getElementById("enable").options[document.getElementById("enable").selectedIndex].value;
				var up = JSON.stringify([{
					 	canId: id,
					 	canDiscription:document.getElementById("canDecription").value,
						 def01:val1,
					}]);
				
				$.ajax({
					 url: "/BusManagementSystem/can/update_cans.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	cans:up
					 	
					 },
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
									_this.fetchData("/BusManagementSystem/"+"can"+"/getList.do?pageNum=1&pageSize=100");
									_this.$store.state.templist = this.list;
									_this.$router.replace( {name:"htable13",  params:{item:"",list:this.list}});
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
                    url: "/BusManagementSystem/can/search_cans.do",
                    async:false,
                    data:{
                    	values:val
                    },
                    success (res) {
                        var upTemplist = res.data;
                        _this.can = upTemplist[0];
                    }
                })
            }
			
		
			
			
		}
	}
	export default canInfo;
</script>

<style>
</style>