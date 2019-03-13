
var MenuConfig = {
	system_itmList:[{
					title:"硬件管理",
					items:[
						{title:"公交状态",url:"/",name:"htable",type:"bus",method:"get"},
						{title:"设备状态",url:"/",name:"htable1",type:"device",method:""}		
					]
				},
				{
					title:"数据管理",
					items:[
						{title:"情绪查看",url:"/",name:"htable2",type:"report",method:""},
						{title:"故障管理",url:"/",name:"htable3",type:"malfunction",method:""}		
					]
				},
				{
					title:"用户管理",
					items:[
						{title:"权限查看",url:"/",name:"htable4",type:"power",method:""},
						{title:"用户详情",url:"/",name:"htable5",type:"user",method:""}		
					]
				},
				{
					title:"个人管理",
					items:[
						{title:"个人设置",url:"/",name:"userform",type:"userform",type2:"form",method:""},
					]
				}
	],
	technology_itmList:[{
					title:"车线管理",
					items:[
						
						{title:"站点管理",url:"/",name:"htable6",type:"station",method:""},
						{title:"故障上报",url:"/",name:"malfunctionform",type:"malfunctionform",type2:"form" , type3 : "add" ,method:""},
						{title:"设备管理",url:"/",name:"htable8",type:"device",method:""}
					]
				},
				{
					title:"资源分配",
					items:[
						{title:"车线分配",url:"/",name:"htable9",type:"bus",method:""},
						{title:"路线管理",url:"/",name:"htable10",type:"route",method:""}		
					]
				},
				{
					title:"个人管理",
					items:[
						{title:"个人设置",url:"/",name:"userform",type:"userform",type2:"form",method:""},
					]
				}
	],
	safe_itmList:[{
					title:"安全管理",
					items:[
						{title:"安全设置",url:"/",name:"standardform",type:"check",method:""},
//						{title:"情绪管理",url:"/",name:"",api:"",method:""},
//						{title:"不良行为",url:"/",name:"",api:"",method:""},
						{title:"总线管理",url:"/",name:"htable13",type:"can",method:""},
						{title:"驾驶员管理",url:"/htable12",name:"htable12",type:"driver",method:"get"}
					]
				},
//				{
//					title:"线路安全",
//					items:[
//						{title:"安全设置",url:"/",name:"standardform",type:"standard",type2:"form",method:""},
////						{title:"站点安全",url:"/",name:"standardform",type:"checkform",type2:"form",method:""}
////						{title:"线路安全",url:"/",name:"",api:"",method:""}		
//					]
//				},
				{
					title:"个人管理",
					items:[
						{title:"个人设置",url:"/",name:"userform",type:"checkform",type2:"form",method:""},
					]
				}
	],
	manage_itmList:[{
					title:"报表中心",
					items:[
						{title:"安全标准",url:"/",name:"standardform",type:"standard",type2:"form",method:""},
						{title:"安全报表",name:"htable11",type:"report",method:""},
					]
				},
				{
					title:"用户安全",
					items:[
						{title:"权限查看",url:"/",name:"htable4",type:"power",method:""},
						{title:"用户详情",url:"/",name:"htable5",type:"user",method:""}		
					]
				},
				{
					title:"个人管理",
					items:[
						{title:"个人设置",url:"/",name:"userform",type:"userform",type2:"form",method:""},
					]
				}
				
	]
}
export default MenuConfig;
