//	植物名称作者相关功能
//	名称作者列表/topics/authorship.php

$("#table_as").bootstrapTable({
	classes: "table table-bordered",
	url: hostUrl + "controller/topics/authorship.php",
	method: "get",
	dataType: "json",
	uniqueId: "ID",
	pageSize: 30,
	pagination: true,
	detailView: true,
	detailViewByClick: true,
	detailFormatter: function detailFormatter(index, row) {
		var name_ch = row.name_ch;
		var name_full = row.name_full;
		var time = row.time;
		if (time === null) {
			time = '';
		} else {
			time = ', ' + time;
		}
		var name_item;
		if (name_ch === null) {
			if (name_full === null) {
				name_full = '';
			} else {
				name_full = '[ ' + name_full + ' ]';
			}
			name_item = ['<strong>', row.name_abr, '</strong>', name_full].join(' ');
		} else {
			if (name_full === null) {
				name_full = '';
			} else {
				name_full = name_full + ',';
			}
			name_item = ['<strong>', name_ch, '</strong> [ ', name_full, row.name_abr, ' ]'].join(' ');
		}
		name_item += time;
		
		var locality = [row.country, row.province, row.institution].join(' ');
		
		var content = ['<div class="pl-5 my-3"><h6 class="mb-3">', name_item, '</h6><h6>', locality, '</h6>', '<a href="' + hostUrl + 'topics/named_species.php?author=' + row.name_abr + '" target="_blank" type="button" class="btn btn-outline-default">查看该作者命名物种</a>', '</div>'].join('');
		return content;
	},
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
			name: $("#as_name").val(),
			country: $("#as_country").val(),
			speciality: $("#as_speciality").val(),
			category: $("#as_category").val(),
			chn_only: chn_only
		};
	},
	sortable: true,
	undefinedText: "",
	iconsPrefix: "fas",
	icons: bt_icon,
	columns: [
		{
			field: "name_abr",
			title: "缩写[ 全名 ]",
			class: "clickable",
			width:　25,
			widthUnit: "%",
			sortable: true,
			formatter: function(data, row) {
				var name_full = row.name_full;
				if (name_full === null) {
					name_full = '';
				} else {
					name_full = '[ ' + name_full + ' ]';
				}
				return('<strong>' + row.name_abr + '</strong> ' + name_full);
			}
		},
		{
			field: "name_ch",
			title: "中文名",
			class: "clickable",
			width: 10,
			widthUnit: "%",
			sortable : true
		},
		{
			field: "time",
			title: "生卒年或工作年份",
			class: "clickable",
			width: 10,
			widthUnit: "%"
		},
		{
			field: "locality",
			title: "地区",
			class: "clickable",
			width: 15,
			widthUnit: "%",
			sortable : true
		},
		{
			field: "major",
			title: "专长类群",
			class: "clickable",
			width: 30,
			widthUnit: "%"
		},
		{
			field: "category",
			title: "类型",
			class: "clickable",
			width: 10,
			widthUnit: "%",
			sortable : true,
			formatter: function(value, row) {
				switch(row.category) {
					case "A":
						return '<label class="badge badge-info my-1">命名人</label>';
						break;
					case "C":
						return '<label class="badge badge-warning my-1">采集人</label>';
						break;
					case "A,C":
						return '<label class="badge badge-info my-1 mr-1">命名人</label><label class="badge badge-warning my-1">采集人</label>';
						break;
					default:
						return '';
				}
			}
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
	//	初始化选择菜单
	$("#as_category").selectpicker({
		style: "btn-multi-select",
		iconBase: "fas",
		tickIcon: "fa-check",
		title: "命名人/采集人"
	});
	$("#as_category").selectpicker("render");

	//	单击按钮提交
	$("#submit_as").click(function() {
		$("#table_as").bootstrapTable("refresh");
	});

	//	为表单绑定键盘事件
	$(".advanced-search").keypress(function(e) {
		if (e.which === 13) {
			$("#table_as").bootstrapTable("refresh");
		}
	});
	
	//	清空按钮功能实现
	$("#search_reset").click(function() {
		$(".advanced-search").val("");
		$("#chn_only").prop("checked", false);
		$("#as_category").selectpicker('val', "");
		$('#table_as').bootstrapTable('refresh');
	});
	
	//	表单变动后自动刷新
	$(".advanced-search").change(function(){
		$('#table_as').bootstrapTable('refresh');
	});

	$("#as_category").on("changed.bs.select", function (e) {
		$("#table_as").bootstrapTable("refresh");
	});
});