<template>
   <!-- Left Panel -->

    <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">

            <div id="main-menu" class="main-menu collapse navbar-collapse">
                <ul class="nav navbar-nav">
                	<!--<li class="menu-title"><span class= "item-title"></span></li>-->
                	<div class="nav navbar-nav" v-for = "itm in itmList">
	                    <li class="menu-title"><i class="menu-icon fa fa-arrow-circle-down"></i><span class= "item-title">{{itm.title}}</span></li><!-- /.menu-title -->
	                    <!--<li class="menu-item-has-children dropdown">@click = "menuclick"-->
	                    <li v-for="item in itm.items">
	                        <a @click = "menuclick(item.type,item)"  >
	                        	<i class="menu-icon"></i><i class="menu-icon fa fa-arrow-circle-right"></i><span class= "item-option">{{item.title}}</span>
	                        </a>
	                    </li>
                    </div>
                </ul>
            </div><!-- /.navbar-collapse -->
        </nav>
    </aside><!-- /#left-panel -->

    <!-- Left Panel -->
</template>

<script>
	
    import $ from '@/assets/js/jq.js'
	import '@/assets/css/normalize.css'
	import '@/assets/css/bootstrap.min.css'
	import '@/assets/css/font-awesome.min.css'
	import '@/assets/css/style.css'
	import '@/assets/css/themify-icons.css'
	import 'jquery-match-height'
	import '@/assets/js/main.js' 
	import systemPower from '@/store/MenuConfig'
	
	var leftMenu = {
		name:"leftmenu",
		data(){
			return {
				itmList:[{
					title:"硬件管理",
					items:[{title:"公交管理",url:"/"}]
				}],
				list:[]
			}
		},
		 created(){
			this.itmList = this.$store.state.itmList;
			console.log(JSON.parse(window.localStorage.getItem("itmList")))
			this.itmList =JSON.parse(window.localStorage.getItem("itmList"))
		},
		updated(){
			this.itmList = JSON.parse(window.localStorage.getItem("itmList"))
		},
		install(Vue){
	  	Vue.component('leftmenu', leftMenu)
	 },
		methods:{
			menuclick(type,item){
				window.localStorage.setItem("tableType",type);
//				alert(item.type2);
				if(item.type2 != "form"){
//					alert("ftr");
					this.fetchData("/BusManagementSystem/"+window.localStorage.getItem("tableType")+"/getList.do?pageNum=1&pageSize=100");
					this.$store.state.templist = this.list;
					this.$router.push( {name:item.name,  params:{item:item,list:this.list}});
				}
				if(item.type2 == "form" && item.type3 != "add")
				{
					this.$emit('cTopisForm',this.RndNum(6));
//					alert("c->p");
					this.$store.state.templist = this.list;
					this.$router.push( {name:item.name,  params:{item:item,list:this.list, tp:"edit"}});
				}
				if(item.type3 == "add") {
					this.$emit('cTopisForm',this.RndNum(6));
//					alert("c->p");
					this.$store.state.templist = this.list;
					this.$router.push( {name:item.name,  params:{item:item,list:this.list, tp:"add"}});
				}
				
			},
			fetchData (url) {
                const _this = this
                $.ajax({
                    url: url,
                    async:false,
                    success (res) {
                    	console.log(res.data.list);
                        _this.list = res.data.list
                    },
                    error(res){
                    	console.log(res);
                    }
                })
            }
			,
			RndNum(n){
		    var rnd="";
		    for(var i=0;i<n;i++)
		        rnd+=Math.floor(Math.random()*10);
		    return rnd;
			}
			
		}
	}
	export default leftMenu;
</script>

<style>
	.navbar{
		background:#FFFFFF;
		border:none;
	}
	.item-title{
		margin-left: 2em;
		font-size: 1.2em;
	}
	.menu-title{
		font-size: 2em;
	}
	.item-option{
		font-size: 1.2em;
	}
	.item-option{
		margin-left: -2em;
	}
</style>