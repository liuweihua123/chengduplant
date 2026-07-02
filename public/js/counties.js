//	植物名称作者相关功能
//	名称作者列表/topics/authorship.php

$("#table_counties").bootstrapTable({
	classes: "table table-hover",
	url: hostUrl + "controller/topics/counties.php",
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
			keyword: $("#counties_keyword").val(),
			locality_o: $("#counties_locality_o").val(),
			locality_n: $("#counties_locality_n").val(),
			province: $("#counties_province").val()
		};
	},
	sortable: true,
	undefinedText: "",
	iconsPrefix: "fas",
	columns: [
		{
			field: "province",
			title: "省份",
			width: 10,
			widthUnit: "%",
			sortable : true
		},
		{
			field: "place_o_en",
			title: "旧地名（西文）",
			width: 15,
			widthUnit: "%",
			sortable : true
		},
		{
			field: "place_o_ch",
			title: "旧地名",
			width:　10,
			widthUnit: "%",
			sortable: true
		},
		{
			field: "county_n",
			title: "现所属县市",
			width: 25,
			widthUnit: "%",
			sortable: true,
			formatter: function(value, row) {
				var county_n = '';
				var county_n_sta = '';
				if (row.county_n) {
					county_n = row.county_n;
				}
				if (row.county_n_sta) {
					county_n_sta = '（' + row.county_n_sta + '）';
				}
				return (county_n + county_n_sta);
			}
		},
		{
			field: "desc_o_ch",
			title: "补充说明",
			width: 40,
			widthUnit: "%"
		},
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
	$("#submit_counties").click(function() {
		$("#table_counties").bootstrapTable("refresh");
	});

	//	为表单绑定键盘事件
	$(".advanced-search").keypress(function(e) {
		if (e.which === 13) {
			$("#table_counties").bootstrapTable("refresh");
		}
	});
	
	//	清空按钮功能实现
	$("#search_reset").click(function() {
		$(".advanced-search").val("");
		$('#table_counties').bootstrapTable('refresh');
	});
	
	//	表单变动后自动刷新
	$(".advanced-search").change(function(){
		$('#table_counties').bootstrapTable('refresh');
	});

	$("#as_category").on("changed.bs.select", function (e) {
		$("#table_counties").bootstrapTable("refresh");
	});
});