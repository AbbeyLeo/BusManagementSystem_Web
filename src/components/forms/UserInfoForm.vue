<template>
	  <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong>{{user.id}}</strong> 用户信息
                            </div>
                            <div class="card-body card-block">
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label class=" form-control-label">用户名</label></div>
                                        <div class="col-12 col-md-9">
                                            <input type="text" id="username"  :placeholder="user.username" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="password-input" class=" form-control-label">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</label></div>
                                        <div class="col-12 col-md-9"><input type="password" id="password"  placeholder="Password" class="form-control" @keyup="checkPwd"><small class="help-block form-text" id="pwdAlert" >{{pwdAlert}}</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="password-input" class=" form-control-label">新密码：</label></div>
                                        <div class="col-12 col-md-9"><input type="password" id="passwordNew" placeholder="Password" class="form-control" @keyup="checkNewPwd"><small class="help-block form-text" id="newpwdAlert" >{{newpwdAlert}}</small></div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="disabledSelect" class=" form-control-label">权&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;限：</label></div>
                                        <div class="col-12 col-md-9">
                                            <select name="powerSelect" id="powerSelect" disabled="" class="form-control" :value="user.userPower">
                                                <option value="0">请选择</option>
                                                <option value="2">系统管理员</option>
                                                <option value="3">管理员</option>
                                                <option value="4">安全服务人员</option>
                                                <option value="5">车辆技术人员</option>
                                                <option value="6">驾驶员</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col col-md-3"><label for="disabled-input" class=" form-control-label">手机号码：</label></div>
                                        <div class="col-12 col-md-9"><input type="text" id="phone" name="phone" :placeholder="user.mobile" disabled="" class="form-control" @keyup="checkPhone"><small id="phoneAl" class="help-block form-text">{{phoneAlert}}</small></div>
                                    </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary btn-sm" @click = "submitForm">
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
	
	var userInfo = {
		name:"userInfo",
		data(){
			return {
					user:{},
					phoneAlert:"请输入新手机，不改则留空即可",
					newpwdAlert:"请输入新密码，不改则留空即可",
					pwdAlert:"输入要修改的密码"
			}
		},
		install(Vue){
	  	Vue.component('user-info', userInfo)
	 },
		created(){
			if(this.$route.params.tp != "add" || this.$route.params.tp != "edit"){
//				alert(1);
				this.user = JSON.parse(window.localStorage.getItem("current_user"));
			}
			else if(this.$route.params.tp == "edit"){
				var id = this.$route.params.objEdit;
				//查询一个obj
			}
			else{
				this.user = null;
			}
			
		},
		mounted(){
			var user1 = JSON.parse(window.localStorage.getItem("current_user"));
			if(this.user.userId == user1.userId && document.getElementById("phone").hasAttribute('disabled'))
				document.getElementById("phone").removeAttribute('disabled');
			else if (!document.getElementById("phone").hasAttribute('disabled')){
					document.getElementById("phone").setAttribute('disabled');
			}
			if(user1.userPower <= 2 || this.$route.params.tp == "add"){
					if(document.getElementById("powerSelect").hasAttribute('disabled'))
								document.getElementById("powerSelect").removeAttribute('disabled');
			}
			else{
				 if (!document.getElementById("powerSelect").hasAttribute('disabled',"")){
							document.getElementById("powerSelect").setAttribute('disabled',"");
					}
			}
		}
		,
		updated(){
			
		},
		methods:{
			submitForm(){
//				alert(this.$route.params.tp);
			if(this.$route.params.tp == "add"){
				const _this = this;
				var selectObj = document.getElementById("powerSelect");
				var val1 = document.getElementById("powerSelect").options[selectObj.selectedIndex].value;
				if(val1 == null || val1 == 0)
					val1 = 6;
				console.log({
					 	username:document.getElementById("username").value,
						password:document.getElementById("password").value,
						userPower:val1,
						mobile:document.getElementById("phone").value
					 });
				
				$.ajax({
					 url: "/BusManagementSystem/user/registerUser.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	username:document.getElementById("username").value,
						password:document.getElementById("password").value,
						userPower:val1,	
						mobile:document.getElementById("phone").value
					 },
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						alert(response.msg);
						        if(response.status == 0){
//									_this.fetchData("/BusManagementSystem/"+"bus"+"/getList.do?pageNum=1&pageSize=100");
//									_this.$store.state.templist = this.list;
//									_this.$router.replace( {name:"htable",  params:{item:"",list:this.list}});
						        }
    					}
				})
			}
			else if(this.$route.params.tp == "edit"){
				const _this = this;
				var up = JSON.stringify([{
					 	username:document.getElementById("username").value,
						password:document.getElementById("password").value,
						userPower:val1,
						mobile:document.getElementById("phone").value
					 }]);
				
				$.ajax({
					 url: "/BusManagementSystem/user/reset_userinfo.do",
					 xhrFields:{
					 		withCredentials:true
					 },
					 crossDomain:true,
					 method: 'post',
					 data:{
					 	username:document.getElementById("username").value,
					 	password:document.getElementById("password").value,
						userPower:val1,
						mobile:document.getElementById("phone").value
					 },
					 anysc:false,
					 dataType:'json',
				}).then(response=>{
					if(response != null ){
						if(response.status != 0)
								alert(response.msg);
						        if(response.status == 0){
						        	alert("用户名" + response.msg)
						        	if(document.getElementById("passwordNew").value != null && document.getElementById("passwordNew").value != "")
						        		{$.ajax({
																 url: "/BusManagementSystem/user/reset_password_logined.do",
																 xhrFields:{
																 		withCredentials:true
																 },
																 crossDomain:true,
																 method: 'post',
																 data:{
																 	passwordOld:document.getElementById("password").value,
																	passwordNew:document.getElementById("passwordNew").value
																 },
																 anysc:false,
																 dataType:'json'
															}).then(res=>{
																		alert(res.msg);
																		if(res.status == 0)
																			{
//																					alert(res.status);
																						window.localStorage.removeItem("current_user");
																					this.$router.push({path:"/"});
																			}
															})
															}
															
															
//									_this.fetchData("/BusManagementSystem/"+"bus"+"/getList.do?pageNum=1&pageSize=100");
//									_this.$store.state.templist = _this.list;
//									_this.$router.replace( {name:"htable",  params:{item:"",list:_this.list}});
											
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
                    url: "/BusManagementSystem/user/get_login_user_info.do",
                    async:false,
                    data:{
                    	busId:val
                    },
                    success (res) {
                        var upTemplist = res.data;
                        _this.user = upTemplist;
                    }
                })
            }
            ,
            checkPhone(){ 
									var phone = document.getElementById('phone').value;
									if(!(/^1[34578]\d{9}$/.test(phone))){ 
									    this.phoneAlert = "手机号码有误，请重填"; 
									    document.getElementById('phoneAl').style.color = "red";
									    return false; 
									} 
									else{
										this.phoneAlert = "手机格式正确";
										document.getElementById('phoneAl').style.color = "green";
										return true;
									}
							}
            ,
            checkNewPwd(){ 
									var pwd = document.getElementById('passwordNew').value;
									if(this.strlen(pwd) < 6){ 
									    this.newpwdAlert = "长度不够6位数"; 
									    document.getElementById('newpwdAlert').style.color = "red";
									    return false; 
									} 
									else{
										this.newpwdAlert = "格式正确";
										document.getElementById('newpwdAlert').style.color = "green";
										return true;
									}
							}
            ,
            checkPwd(){ 
									var pwd = document.getElementById('password').value;
									if(this.strlen(pwd) < 6){ 
									    this.pwdAlert = "长度不够6位数"; 
									    document.getElementById('pwdAlert').style.color = "red";
									    return false; 
									} 
									else{
										this.pwdAlert = "格式正确";
										document.getElementById('pwdAlert').style.color = "green";
										return true;
									}
							}
							,
							strlen(str){
						    var len = 0;
						    for (var i=0; i<str.length; i++) { 
						     var c = str.charCodeAt(i); 
						    //单字节加1 
						     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
						       len++; 
						     } 
						     else { 
						      len+=2; 
						     } 
						    } 
						    return len;
						}
		}
	}
	export default userInfo;
</script>
	
<style>
</style>