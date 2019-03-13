<template>
<div class="lowin lowin-blue">
		<div class="lowin lowin-blue">
		<div class="lowin-brand">
			<img src="@/assets/20190302090301.png" alt="logo">
		</div>
		<div class="lowin-wrapper">
			<div class="lowin-box lowin-login">
				<div class="lowin-box-inner">
						<p>{{phoneTitle}}</p>
						<div class="lowin-group">
							<label>手机号</label>
							<input id="tel" type="tell" autocomplete="tel" name="tel" class="lowin-input">
						</div>
						<div class="lowin-group password-group">
							<label>验证码 </label>
							<input id="verify" type="verify" name="verify" autocomplete="false" class="lowin-input limit_imp">
						</div>
						<button id="lbtn" class="lowin-btn login-btn" @click="loginPhone">
							登录
						</button>

						<div class="text-foot">
							获取不到验证码？ <a href="" class="register-link">用户名登录</a>
						</div>
				</div>
			</div>

			<div class="lowin-box lowin-register">
				<div class="lowin-box-inner">
						<p>用户名登录</p>
						<div class="lowin-group">
							<label>用户名</label>
							<input id= "username" type="text" name="name" autocomplete="false" class="lowin-input">
						</div>
						<div class="lowin-group">
							<label>密码</label>
							<input id= "password" type="password" name="password" autocomplete="current-password" class="lowin-input">
						</div>
						<button class="lowin-btn" @click="login">
							登录
						</button>

						<div class="text-foot">
							不记得密码了？ <a href="" class="login-link">短信登录</a>
						</div>
				</div>
			</div>
		</div>
	
		<footer class="lowin-footer">
			版权归HONG管控团队所有
		</footer>
	</div>
</div>
</template>

<script>
	import '@/assets/css/auth.css'
	import Auth from '@/assets/js/auth.js'
	import axios from 'axios'
	import $ from '@/assets/js/jq.js'
	import systemPower from '@/store/MenuConfig'
	import 'bootstrap/dist/css/bootstrap.css'
//	import '@/assets/js/bootstrap.js'
	import 'bootstrap'
	import BootstrapDialog from 'bootstrap-dialog'
	
	var Login = {
		name:"login",
		data(){
			return {
				phoneTitle:"手机号登录"
			}
		},
		mounted() {
		Auth.vars.lowin =  document.querySelector('.lowin');
		Auth.vars.lowin_brand =  document.querySelector('.lowin-brand');
		Auth.vars.lowin_wrapper =  document.querySelector('.lowin-wrapper');
		Auth.vars.lowin_login =  document.querySelector('.lowin-login');
		Auth.vars.lowin_wrapper_height =  0;
		Auth.vars.login_back_link =  document.querySelector('.login-back-link');
		Auth.vars.forgot_link =  document.querySelector('.forgot-link');
		Auth.vars.login_link =  document.querySelector('.login-link');
		Auth.vars.login_btn =  document.querySelector('.login-btn');
		Auth.vars.register_link =  document.querySelector('.register-link');
		Auth.vars.password_group =  document.querySelector('.password-group');
		Auth.vars.password_group_height =  0;
		Auth.vars.lowin_register =  document.querySelector('.lowin-register');
		Auth.vars.lowin_footer =  document.querySelector('.lowin-footer');
		Auth.vars.box =  document.getElementsByClassName('lowin-box');
		Auth.vars.inputt = document.getElementsByClassName('lowin-input'); 
		Auth.vars.limit_imp= document.getElementsByClassName('limit_imp');
		Auth.vars.option =  {};
			Auth.init({
			login_url: '#login',
			forgot_url: '#forgot'
		});
		Auth.unShow();		
		},
		methods:{
			loginPhone(){
				var temp = this;
				var url = null;
				var bt_value = document.getElementById("lbtn").innerText;
				var obj = {};
				var method = 'get';
				
				if("获取验证码" == bt_value) {
					url = "/BusManagementSystem/user/mobile_verify.do";
					obj = {
					  	mobileNum: document.getElementById("tel").value,
					  	prefix: 'login_',
					  };
					  method = 'get';
					  Auth.show();
				}
				if("登录" == bt_value){
					url = "/BusManagementSystem/user/mobile_login.do";
					obj = {
					  	mobileNum: document.getElementById("tel").value,
					  	verifyNum: document.getElementById("verify").value,
					 };
					 method = 'post';
				}
				//校检开始
				//校检结束
				axios({
						 headers: {
		        		'Content-Type': 'application/json;'
		   			 },
					  method: method,
					  url: url,
					  params:obj,
					  withCredentials: true
					})
					.then(function (response) {
    					console.log (response.data.status);
    					if(response != null &&  response.data.status == 1){
					           BootstrapDialog.show({
					           		title:'提示信息',
						            message: response.data.msg
						        });
						        Auth.unShow();
    					}
    					if(response != null &&  response.data.status == 0 && "登录" == bt_value){
    						BootstrapDialog.show({
					           		title:'提示信息',
						            message: response.data.msg
						        });
						    
    						let power = response.data.data.userPower;
    						temp.$store.state.user = response.data.data
    						if(power == 1) {//系统管理员
								temp.$store.state.itmList = systemPower.system_itmList;
								window.localStorage.setItem("itmList", systemPower.system_itmList);
								
							}
    						if(power == 2) {//系统管理员
								temp.$store.state.itmList = systemPower.system_itmList;
								window.localStorage.setItem("itmList",JSON.stringify(systemPower.system_itmList));
							}
    						if(power == 3) {//管理员
								temp.$store.state.itmList = systemPower.manage_itmList;
								window.localStorage.setItem("itmList", JSON.stringify(systemPower.manage_itmList));
							}
    						if(power == 4) {//安全管理员
								temp.$store.state.itmList = systemPower.safe_itmList;
								window.localStorage.setItem("itmList", JSON.stringify(systemPower.safe_itmList));
							}
    						if(power == 5) {//车辆技术员
								temp.$store.state.itmList = systemPower.technology_itmList;
								window.localStorage.setItem("itmList", JSON.stringify(systemPower.technology_itmList));
							}
    						if(power == 6) {//驾驶员
								temp.$store.state.itmList = systemPower.technology_itmList;
								window.localStorage.setItem("itmList", JSON.stringify(systemPower.technology_itmList));
							}
    						temp.$store.state.page = 'index';
    						temp.$router.push({path:'/main',replace:true});
    					}
 				 	});
			},
			login(){
				var temp = this;
				axios({
						 headers: {
		        		'Content-Type': 'application/json;'
		   			 },
					  method: 'post',
					  url: "/BusManagementSystem/user/login.do",
					  params:{
					  	username: document.getElementById("username").value,
					  	password: document.getElementById("password").value
					  },
					  withCredentials: true
				}).then(function (response) {
    					console.log (response.data.status);
    					if(response != null &&  response.data.status == 1){
					           BootstrapDialog.show({
					           		title:'提示信息',
						            message: response.data.msg
						        });
						        Auth.unShow();
    					}
    					if(response != null &&  response.data.status == 0){
    						window.localStorage.setItem("current_user",JSON.stringify(response.data.data));
    						BootstrapDialog.show({
					           		title:'登录成功',
						            message: response.data.msg
						        });
//						    console.log(JSON.parse(window.localStorage.getItem("current_user")));
    						let power = response.data.data.userPower;
    						temp.$store.state.user = response.data.data
    						if(power == 1) {//系统管理员
								temp.$store.state.itmList = systemPower.system_itmList;
								window.localStorage.setItem("itmList", systemPower.system_itmList);
								
							}
    						if(power == 2) {//系统管理员
								temp.$store.state.itmList = systemPower.system_itmList;
								window.localStorage.setItem("itmList",JSON.stringify(systemPower.system_itmList));
							}
    						if(power == 3) {//管理员
								temp.$store.state.itmList = systemPower.manage_itmList;
								window.localStorage.setItem("itmList", JSON.stringify(systemPower.manage_itmList));
							}
    						if(power == 4) {//安全管理员
								temp.$store.state.itmList = systemPower.safe_itmList;
								window.localStorage.setItem("itmList", JSON.stringify(systemPower.safe_itmList));
							}
    						if(power == 5) {//车辆技术员
								temp.$store.state.itmList = systemPower.technology_itmList;
								window.localStorage.setItem("itmList", JSON.stringify(systemPower.technology_itmList));
							}
    						if(power == 6) {//驾驶员
								temp.$store.state.itmList = systemPower.technology_itmList;
								window.localStorage.setItem("itmList", JSON.stringify(systemPower.technology_itmList));
							}
    						temp.$store.state.page = 'index';
    						temp.$router.push({path:'/main',replace:true});
    					}
 				 	});
		}
	}
	}
	export default Login;
</script>

<style>
</style>