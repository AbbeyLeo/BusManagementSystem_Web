<template>
		 <div class="content">
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">详情表</strong>
                            </div>
                            <div class="card-body">
                            	<!--@list-event = 'getBusList'-->
                            	<!--<div>{{testVal}}</div>-->
                            	<!--<input type="text" name="" id="" :value="resultList" />-->
                                <table id="bootstrap-data-table" class="table table-striped table-bordered" >
                                    <thead>
                                        <tr>
                                            <th v-for="item in titlelist">{{item}}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="obj in valuelist" @mouseup="sendData($event)" >
                                            <td v-for="(val,key) in obj" :name='key'>{{val}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</template>

<script>
	import '@/assets/css/normalize.css'
	import '@/assets/css/bootstrap.min.css'
    import '@/assets/css/lib/datatable/dataTables.bootstrap.min.css'
    import '@/assets/css/style.css'
	  
    import $ from '@/assets/js/jq.js'
    import '@/assets/css/jq.min.css'
    import '@/assets/js/datatables.js'
    import '@/assets/js/init/datatables-init.js'
    import '@/assets/js/datatbl.js'
    import SetTableChild  from '@/components/tbl/setValueChild'
    import axios from 'axios'
    
	var HTable = {
		name:"htable",
		data(){ 
			return{
				titlelist:[],
				valuelist:[],
				list:[],
				delList:[],
				updateData:{},
				ttlist:[]
			}
		},
		props:['resultList','searchList'],
		mounted(){
			this.sendUpd();
			this.$store.state.page='table';
//			var item = this.$route.params.item;
			if(this.$route.params.item != null && this.$route.params.item != "")
				window.localStorage.setItem("tableType", this.$route.params.item.type);
			this.list = this.$route.params.list;
			if(window.localStorage.getItem("tableType") == "bus"){
				this.getBusList(this.list);
			}
			if(window.localStorage.getItem("tableType") == "driver"){
				this.getDriverList(this.list);}
			if(window.localStorage.getItem("tableType") == "user"){
				this.getUserList(this.list);}
			if(window.localStorage.getItem("tableType") == "device"){
				this.getDeviceList(this.list);}
			if(window.localStorage.getItem("tableType") == "malfunction"){
				this.getMalfunctionList(this.list);}
			if(window.localStorage.getItem("tableType") == "station"){
				this.getStationList(this.list);}
			if(window.localStorage.getItem("tableType") == "route"){
				this.getRouteList(this.list);}
			if(window.localStorage.getItem("tableType") == "power"){
				this.getPowerList(this.list);}
			if(window.localStorage.getItem("tableType") == "weight"){
				this.getWeightList(this.list);}
			if(window.localStorage.getItem("tableType") == "report"){
				this.getReportList(this.list);}
			if(window.localStorage.getItem("tableType") == "can"){
				this.getCanList(this.list);}
			$(document).ready(function() {
          $('#bootstrap-data-table').DataTable({
          	language:{
          		"lengthMenu":     "显示 _MENU_ 条记录",
          		"sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
          		"sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
          		"infoFiltered":   "(共 _MAX_ 条记录)",
          		"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "上页",
					"sNext": "下页",
					"sLast": "末页"
				},
          		sSearch:"查询",
			}

          });
      } );

		},
		 watch: {
		 	 searchList(newVal,oldVal){
		 	 	this.valuelist = [];
            	this.list = [];
            	this.list = newVal;
            	
//          	alert(window.localStorage.getItem("tableType"));
				console.log(this.list);
            	if(window.localStorage.getItem("tableType") == "bus"){
				this.getBusList(this.list);
			}
			if(window.localStorage.getItem("tableType") == "driver"){
				this.getDriverList(this.list);}
			if(window.localStorage.getItem("tableType") == "user"){
				this.getUserList(this.list);}
			if(window.localStorage.getItem("tableType") == "device"){
				this.getDeviceList(this.list);}
			if(window.localStorage.getItem("tableType") == "malfunction"){
				this.getMalfunctionList(this.list);}
			if(window.localStorage.getItem("tableType") == "station"){
				this.getStationList(this.list);}
			if(window.localStorage.getItem("tableType") == "route"){
				this.getRouteList(this.list);}
			if(window.localStorage.getItem("tableType") == "power"){
				this.getPowerList(this.list);}
			if(window.localStorage.getItem("tableType") == "weight"){
				this.getWeightList(this.list);}
			if(window.localStorage.getItem("tableType") == "report"){
				this.getReportList(this.list);}
			if(window.localStorage.getItem("tableType") == "can"){
				this.getCanList(this.list);}
           },
            resultList(newVal,oldVal){
//              this.list = newVal;  //newVal即是chartData
//              this.drawChart();
				this.valuelist = [];
//				alert("watch");
				this.fetchData("/BusManagementSystem/"+window.localStorage.getItem("tableType")+"/getList.do?pageNum=1&pageSize=100");
				if(window.localStorage.getItem("tableType") == "bus"){
				this.getBusList(this.list);
			}
			if(window.localStorage.getItem("tableType") == "driver"){
				this.getDriverList(this.list);}
			if(window.localStorage.getItem("tableType") == "user"){
				this.getUserList(this.list);}
			if(window.localStorage.getItem("tableType") == "device"){
				this.getDeviceList(this.list);}
			if(window.localStorage.getItem("tableType") == "malfunction"){
				this.getMalfunctionList(this.list);}
			if(window.localStorage.getItem("tableType") == "station"){
				this.getStationList(this.list);}
			if(window.localStorage.getItem("tableType") == "route"){
				this.getRouteList(this.list);}
			if(window.localStorage.getItem("tableType") == "power"){
				this.getPowerList(this.list);}
			if(window.localStorage.getItem("tableType") == "weight"){
				this.getWeightList(this.list);}
			if(window.localStorage.getItem("tableType") == "report"){
				this.getReportList(this.list);}
			if(window.localStorage.getItem("tableType") == "can"){
				this.getCanList(this.list);}
           }
        }
		,
		updated(){
			require('@/assets/js/init/datatables-init.js');
		    require('@/assets/js/datatbl.js');
//		    if(this.resultList == true)
//		    	this.resultList = null;
//		    console.log(this.resultList);
		}
		,
		install(Vue){
			Vue.component("htable", HTable);
		},components:{
			SetTableChild
		},
		methods:{
			getBusList(tlist){
				this.titlelist=["公交编号","公交名称","路线号","车牌号","生产日期",'生产商','核载','供能类型',"总线ID",'启用状态','创建时间','创建人','修改时间','修改人'];
				var busList =  tlist; 
				for(var i = 0; i<busList.length; i++)
				{
					
					var obj = busList[i];
					
					var b = {
						busId:obj.busId,
						busName:obj.busName,
						busRouteCode:obj.busRouteCode,
						busPlateNumber:obj.busPlateNumber,
						busCreateTime:obj.busCreateTime,
						busProducer:obj.busProducer,
						busSize:obj.busSize,
						busFuel:obj.busFuel,
						canId:obj.canId,
						def10:obj.def10,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getDriverList(tlist){
				this.titlelist=["司机编码","司机名字","身份证","手机号","负责路线",'驾驶车辆','所属部门','创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						driverCode:obj.driverCode,
						driverName:obj.driverName,
						driverIdentity:obj.driverIdentity,
						driverPhone:obj.driverPhone,
						driverRoute:obj.driverRoute,
						driverBus:obj.driverBus,
						driverOrganization:obj.driverOrganization,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
//					console.log(b);
					this.valuelist.push(b);
				}
			},
			getDeviceList(tlist){
				this.titlelist=["设备编码","设备名字","设备状态","关联公交","详细描述",'创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						deviceCode:obj.deviceCode,
						deviceName:obj.deviceName,
						deviceState:obj.deviceState,
						deviceBus:obj.deviceBus,
						def01:obj.def01,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modify,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getMalfunctionList(tlist){
				this.titlelist=["故障编码","故障名称","故障类型","故障设备","故障车辆","详细描述",'创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						malfunctionCode:obj.malfunctionCode,
						malfunctionName:obj.malfunctionName,
						malfunctionType:obj.malfunctionType,
						malfunctionDevice:obj.malfunctionDevice,
						malfunctionBus:obj.malfunctionBus,
						malfunctionDtail:obj.malfunctionDetail,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getRouteList(tlist){
				this.titlelist=["路线编码","路线站点编码","路线详情",'创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						routeCode:obj.routeCode,
						routeDetail:obj.routeDetail,
						def01:obj.def01,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getStationList(tlist){
				this.titlelist=["站点编码","站点名称",'创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						stationCode:obj.stationCode,
						stationName:obj.stationName,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getCanList(tlist){
				this.titlelist=["总线ID","总线描述",'启用状态','创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						canId:obj.canId,
						canDiscription:obj.canDiscription,
						def01:obj.def01,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getPowerList(tlist){
				this.titlelist=["权限编码","权限代号",'权限名称','权限描述','创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						pkId:obj.pkId,
						powerCode:obj.powerCode,
						powerName:obj.powerName,
						powerDiscription:obj.powerDiscription,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getUserList(tlist){
				this.titlelist=["用户编码","用户名",'手机号','用户权限','创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						userId:obj.userId,
						username:obj.username,
						mobile:obj.mobile,
						userPower:obj.userPower,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getReportList(tlist){
				this.titlelist=["报告编码","刹车",'速度','加速度','耗能','转向弧度','驾驶员编号','车辆','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						decisionId:obj.decisionId,
						brakeData:obj.brakeData,
						speedData:obj.speedData,
						accelerationData:obj.accelerationData,
						energyConsumption:obj.energyConsumption,
						steerData:obj.steerData,
						driverCode:obj.driverCode,
						busId:obj.busId,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			getWeightList(tlist){
				this.titlelist=["权重编码","权重代号",'权重名称','权重等级','创建时间','创建人','修改时间','修改人'];
				var LList =  tlist; 
				for(var i = 0; i<LList.length; i++)
				{
					
					var obj = LList[i];
					
					var b = {
						pkId:obj.pkId,
						weightCode:obj.weightCode,
						weightName:obj.weightName,
						weightLevel:obj.weightLevel,
						createTime:obj.createTime,
						creator:obj.creator,
						modifyTime:obj.modifyTime,
						modifier:obj.modifier
					}
					console.log(b);
					this.valuelist.push(b);
				}
			}
			,
			fetchData (url) {
                const _this = this
                $.ajax({
                    url: url,
                    async:false,
                    success (res) {
                    	console.log(res.data.list);
                        _this.list = res.data.list
                    }
                })
           },
           sendUpd(){
//         	alert("send");
           		this.$emit("sendUpd",this.RndNum(7));
           }
           ,
           sendData(obj){
           		console.log(obj.currentTarget.rowIndex);
           		var key = obj.currentTarget.childNodes[0].getAttribute("name");
           		var value = obj.currentTarget.childNodes[0].innerHTML;
           		var bgl = obj.currentTarget.className;
           		console.log(bgl == "rgba(0,0,0,0.7)");
           		if(bgl != "tr-bg")
           		{
           			obj.currentTarget.className = "tr-bg"
           			obj.currentTarget.style.background = "rgba(0,0,0,0.5)";
           			console.log(obj.currentTarget.style.background);
           			
           		}
           		else if(bgl == "tr-bg"){
           			obj.currentTarget.className = ""
           			obj.currentTarget.style.background = "rgba(255,255,255,1)";
           		}
           		var delTr= document.getElementsByClassName("tr-bg");
           		this.delList = [];
           		for(var i = 0; i < delTr.length; i++)
           		{
           				var delTrd = delTr[i].childNodes[0].getAttribute("name");
 	          			var temoj = {}
 	          			temoj[delTrd] = delTr[i].childNodes[0].innerHTML;
 	          			this.delList[i] = temoj;
           		}
           		console.log(this.delList);
           		this.$emit("sendList",this.delList);
           },
           menuclick(type,item){
				window.localStorage.setItem("tableType",type);
				this.fetchData("/BusManagementSystem/"+window.localStorage.getItem("tableType")+"/getList.do?pageNum=1&pageSize=100");
				this.$store.state.templist = this.list;
				this.$router.push( {name:item.name,  params:{item:item,list:this.list}});
			},
			fetchData (url) {
                const _this = this
                $.ajax({
                    url: url,
                    async:false,
                    success (res) {
                    	console.log(res.data.list);
                        _this.list = res.data.list
                    }
                })
           },
           RndNum(n){
		    var rnd="";
		    for(var i=0;i<n;i++)
		        rnd+=Math.floor(Math.random()*10);
		    return rnd;
			}
		}
	}
	export default HTable;
</script>

<style>
</style>