//	植物名称作者相关功能
//	名称作者列表/topics/authorship.php

$("#table_lit").bootstrapTable({
	classes: "table",
	url: hostUrl + "controller/topics/lit.php",
	method: "get",
	dataType: "json",
	queryParams: function (params) {
		return {
			type: 'author',
			offset: params.offset,
			author: $("#lit_author").val()
		};
	},
	pageSize: 30,
	pagination: true,
	sidePagination: "server",
	paginationLoop: false,
	detailView: true,
	detailViewByClick: true,
	detailFormatter: function detailFormatter(index, row) {
		$.ajaxSetup({async: false});
		$.getJSON(hostUrl + "controller/topics/lit.php",
		{
			type: 'list',
			author_id: row.author_id,
		},
		function (data) {
			var list = ['<div class="ml-5">'];
			if (data.total !== 0) {
				$.each(data.rows, function(key, value) {
					if (key < 20) {
						list.push('<h6 class="small text-secondary mt-3">' + value.authors + '</h6>');
						
						list.push('<h6 class="mb-3">' + value.time + '. ' + [value.title, value.source, value.volume].join(' ') + '<a data-toggle="collapse" href="#ab_' + value.author_id + '_' + key + '" role="button" aria-expanded="false" aria-controls="ab_' + value.author_id + '_' + key + '" class="ml-2">摘要<i class="fas fa-caret-down fa-fw text-default"></i></a></h6>');
						
						list.push('<div class="collapse" id="ab_' + value.author_id + '_' + key + '"><p class="text-secondary my-0 pb-3">' + value.abstract + '</p></div>');
						
						list.push('<hr class="my-0" />');
					} else {
						list.push('<a href="literatures.php?author=' + row.author + '" type="button" class="btn btn-default my-2">仅显示前20条，点击查看全部</a>');
						list.push('<hr class="my-0" />');
						return false;
					}
				});
				list.pop();
			}
			list.push('</div>');
			$("#templist").html(list.join(''));
		});
		var info = $("#templist").html();
		return info;
	},
	undefinedText: "",
	iconsPrefix: "fa-fw fas",
	columns: [
		{
			field: "author",
			class: 'clickable',
			title: '作者（文献数）',
			formatter: function(data, row) {
				return(data + '<span class="badge badge-pill badge-default ml-2">' + row.count + '</span>');
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
	
	//	表单变动后自动刷新
	$(".advanced-search").change(function(){
		$('#table_lit').bootstrapTable('refresh');
	});
});