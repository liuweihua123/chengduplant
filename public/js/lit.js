//	植物名称作者相关功能
//	名称作者列表/topics/authorship.php
var query_author = getQueryVariable("author");
if (query_author) {
	$("#lit_author").val(decodeURI(query_author));
}
$("#table_lit").bootstrapTable({
	classes: "table",
	url: hostUrl + "controller/topics/lit.php",
	method: "get",
	dataType: "json",
	pagination: true,
	showHeader: false,
	sidePagination: "server",
	paginationLoop: false,
	queryParams: function (params) {
		return {
			offset: params.offset,
			keyword: $("#lit_keyword").val(),
			taxon: $("#lit_taxon").val(),
			author: $("#lit_author").val(),
			source: $("#lit_source").val()
		};
	},
	sortable: true,
	undefinedText: "",
	iconsPrefix: "fas",
	columns: [
		{
			field: "title",
			title: "题目",
			formatter: function(data, row) {
				if (! row.title) {
					return('<span class="text-secondary">无数据</span>')
				} else {
					var id = row.id;
					var content = [];
					content.push('<h6 class="text-dark font-weight-bold mt-1 mb-3">' + row.title + '</h6>');
					content.push('<h6 class="my-1">作者：' + row.authors + '</h6>');
					content.push('<h6 class="my-1">年代：' + row.time + '</h6>');
					content.push('<div class="d-flex justify-content-between"><h6 class="my-1">来源：' + row.source + ' ' + row.volume + '</h6><h6 class="my-1"><a data-toggle="collapse" href="#ab_' + id + '" role="button" aria-expanded="false" aria-controls="ab_' + id + '">摘要<i class="fas fa-caret-down fa-fw"></i></a></h6></div>');
					content.push('<div class="collapse" id="ab_' + id + '"><hr /><p class="text-secondary my-1">' + row.abstract + '</p></div>');
					return content.join('');
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
	//	单击按钮提交
	$("#submit_lit").click(function() {
		$("#table_lit").bootstrapTable("refresh");
	});

	//	为表单绑定键盘事件
	$(".advanced-search").keypress(function(e) {
		if (e.which === 13) {
			$("#table_lit").bootstrapTable("refresh");
		}
	});
	
	//	清空按钮功能实现
	$("#search_reset").click(function() {
		$(".advanced-search").val("");
		$('#table_lit').bootstrapTable('refresh');
	});
	
	//	表单变动后自动刷新
	$(".advanced-search").change(function(){
		$('#table_lit').bootstrapTable('refresh');
	});

	$("#as_category").on("changed.bs.select", function (e) {
		$("#table_lit").bootstrapTable("refresh");
	});
});