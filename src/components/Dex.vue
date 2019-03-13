<template>
	<div>
		<router-view name="mainMenu" @cTopisForm="setIsForm"/>
		<router-view name="mainBox"  :pToctempForm="tempForm"/>
	</div>
</template>

<script>
	export default {
		name:"main-box",
		data(){
			return {
				tempForm:""
			}
		},
		install(Vue){
			Vue.component('main-box', this);
		},
		watch:{
//			tempForm(newVal,oldVal){
//				this.tempForm = newVal;
//			}
		},
		methods:{
			setIsForm(data){
				this.tempForm = data;
//				alert("p get");
			}
		}
		
	}
</script>

<style>
</style>