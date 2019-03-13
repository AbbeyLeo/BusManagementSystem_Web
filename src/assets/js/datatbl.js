import $ from '@/assets/js/jq.js'
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
