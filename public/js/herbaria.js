//	植物名称作者相关功能
//	名称作者列表/topics/authorship.php

$("#table_her").bootstrapTable({
	classes: "table table-hover",
	url: hostUrl + "controller/topics/herbaria.php",
	method: "get",
	dataType: "json",
	uniqueId: "ID",
	pageSize: 30,
	pagination: true,
	sidePagination: "server",
	paginationLoop: false,
	queryParams: function (params) {
		var chn_only;
		if($('#chn_only').is(':checked')) {
			chn_only = true;
		} else {
			chn_only = false;
		}
		return {
			offset: params.offset,
			limit: params.limit,
			sort: params.sort,
			order: params.order,
			institution: $("#her_institution").val(),
			locality: $("#her_locality").val()
		};
	},
	sortable: true,
	undefinedText: "",
	iconsPrefix: "fas",
	icons: bt_icon,
	columns: [
		{
			field: "institutionCode",
			title: "代码",
			class: "clickable",
			width:　8,
			widthUnit: "%",
			sortable: true
		},
		{
			field: "institution",
			title: "标本馆",
			class: "clickable",
			width: 37,
			widthUnit: "%",
			sortable : true
		},
		{
			field: "locality",
			title: "所在地",
			class: "clickable",
			width: 20,
			widthUnit: "%",
			sortable: true,
			formatter: function(value, row) {
				return (row.province + ' ' + row.city);
			}
		},
		{
			field: "contact",
			title: "联系人",
			class: "clickable",
			width: 20,
			widthUnit: "%"
		},
		{
			field: "revisionDate",
			title: "更新时间",
			class: "clickable",
			width: 15,
			widthUnit: "%",
			sortable : true
		},
	],
	onClickRow: function(row) {
		window.open(hostUrl + 'ins/info.php?queryType=her&code=' + row.institutionCode);
	},
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