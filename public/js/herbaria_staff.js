//	植物名称作者相关功能
//	名称作者列表/topics/authorship.php

$("#table_her").bootstrapTable({
	classes: "table table-hover",
	url: hostUrl + "controller/ins/staff.php",
	method: "get",
	dataType: "json",
	uniqueId: "ID",
	pageSize: 30,
	pagination: true,
	sidePagination: "server",
	paginationLoop: false,
	queryParams: function (params) {
		return {
			offset: params.offset,
			limit: params.limit,
			sort: params.sort,
			order: params.order,
			type: 'search',
			name: $("#her_name").val(),
			herbarium: $("#her_herbarium").val(),
			major: $("#her_major").val()
		};
	},
	sortable: true,
	undefinedText: "",
	iconsPrefix: "fas",
	icons: bt_icon,
	columns: [
		{
			field: "name",
			title: "姓名",
			width: 10,
			widthUnit: "%",
			sortable : true
		},
		{
			field: "herbarium",
			title: "所在标本馆",
			width: 30,
			widthUnit: "%",
			formatter: function(value, row) {
				return('<a href="' + hostUrl + 'ins/info.php?code=' + row.institutionCode + '">' + row.institutionCode + ' ' + row.institution + '</a>');
			}
		},
		{
			field: "birth",
			title: "生（卒）年",
			width: 10,
			widthUnit: "%"
		},
		{
			field: "major",
			title: "专长类群、学科",
			width: 50,
			widthUnit: "%"
		}
	],
	onLoadSuccess: function(data) {
		$("#total").text("共" + data.total + "条结果");
	},
	onAll: function() {
		$(".pagination-detail").remove();
	}
});
$(document).ready(function() {
	//	单击按钮提交
	$("#submit_her").click(function() {
		$("#table_her").bootstrapTable("refresh");
	});

	//	为表单绑定键盘事件
	$(".advanced-search").keypress(function(e) {
		if (e.which === 13) {
			$("#table_her").bootstrapTable("refresh");
		}
	});
	
	//	清空按钮功能实现
	$("#search_reset").click(function() {
		$(".advanced-search").val("");
		$('#table_her').bootstrapTable('refresh');
	});
	
	//	表单变动后自动刷新
	$(".advanced-search").change(function(){
		$('#table_her').bootstrapTable('refresh');
	});

	$("#as_category").on("changed.bs.select", function (e) {
		$("#table_her").bootstrapTable("refresh");
	});
});