//	鉴定和描述术语相关功能
//	鉴定和描述术语列表/topics/terminology.php

//	定义术语库页面表单关联函数
function changeOption(key) {
	var option = new Array();
	switch (key) {
		case '根':
			option = ['根的类型', '根的形态', '根的组成'];
			break;
		case '茎':
			option = ['茎的类型', '茎的形态', '茎的组成'];
			break;
		case '叶':
			option = ['叶的排列方式', '叶的相关术语', '叶的形态', '叶的着生方式', '叶的组成', '叶基', '叶尖', '叶裂类型', '叶脉式', '叶缘'];
			break;
		case '花':
			option = ['传粉系统', '雌蕊群', '花被', '花部的着生方式', '花的对称性', '花的性别', '花的组成', '花结构数', '开花时间', '雄蕊群'];
			break;
		case '花序':
			option = ['花序的类型', '花序的形态', '花序的组成'];
			break;
		case '果实':
			option = ['果实的类型','果实的组成'];
			break;
		case '表面':
			option = [];
			break;
		default:
			option = [];
	}
	return option;
}

$('#table_term').bootstrapTable({
	classes: 'table',
	url: hostUrl + 'controller/topics/terminology.php',
	method: 'get',
	dataType: 'json',
	uniqueId: 'ID',
	showHeader: false,
	pageSize: 20,
	pagination: true,
	sidePagination: 'server',
	paginationLoop: false,
	queryParams: function(params) {
		return {
			offset: params.offset,
			limit: params.limit,
			sort: params.sort,
			order: params.order,
			term: $("#term_term").val(),
			cate1: $("#cate_first").val(),
			cate2: $("#cate_second").val(),
				};
			},
	sortable: true,
	undefinedText: '',
	iconsPrefix: 'fas',
	icons: bt_icon,
	columns: [
		{
			field: 'term',
			title: '名词',
			widthUnit: "%",
			sortable: false,
			formatter: function(index, row) {
				if (! row.term_en) {
					return('<span class="text-secondary">无数据</span>')
				} else {
					var cursor = 'cursor:zoom-in';
					if (isIE()) {
						cursor = 'cursor:pointer';
					}
					var img = '';
					$.each(row.img, function(key, value) {
						img = img + '<img class="term-img ml-2" style="max-height: 80px; ' + cursor + '" src="' + value + '" alt="' + row.term_en + '" />';
					});
					var desc = [
						'<div class="d-flex justify-content-between">',
						'<dl class="my-2">',
							'<dt class="mb-2">' + row.term_ch + ' ' + row.term_en + '</dt>',
							'<dd class="my-0">' + row.desc_ch + '</dd>',
							'<dd class="my-0">' + row.desc_en + '</dd>',
						'</dl>',
						'<div class="my-2">',
							img,
						'</div>',
						'</div>'
					].join('');

					return desc;
				}
			}
		},
	],
	onLoadSuccess: function(data) {
		$("#total").text("共" + data.total + "条结果");
		$(".term-img").viewer({
			navbar: false,
			toolbar: {
				zoomIn: 1,
				zoomOut: 1,
				oneToOne: 1,
				reset: 1,
				prev: 0,
				play: 0,
				next: 0,
				rotateLeft: 1,
				rotateRight: 1,
				flipHorizontal: 0,
				flipVertical: 0,
			}
		});
	},
	onAll: function() {
		$(".pagination-detail").remove();
	}
});

$('#cate_first').selectpicker({
	style: "btn-multi-select",
	showTick: true,
	iconBase: 'fas',
	tickIcon: 'fa-check',
	title: '选择类型'
});
$("#cate_first").selectpicker('render');

$('#cate_second').selectpicker({
	style: "btn-multi-select",
	showTick: true,
	iconBase: 'fas',
	tickIcon: 'fa-check',
	title: '选择子类型'
});
$("#cate_second").selectpicker('render');

// 单击按钮提交
$('#submit_term').click(function() {
	$('#table_term').bootstrapTable('refresh');
});

// 为表单绑定键盘事件
$(".advanced-search").keydown(function(event) {
	if (event.which == 13) {
		$('#table_term').bootstrapTable('refresh');
	}
});

//	清空按钮功能实现
$("#search_reset").click(function() {
	$(".advanced-search").val("");
	$("#cate_first").selectpicker('val', "");
	$("#cate_second").selectpicker('val', "");
	$('#table_term').bootstrapTable('refresh');
});

//	级联表单功能实现
$('#cate_first').on('changed.bs.select', function(e) {
	$('#cate_second').html('<option value="" selected>全部子类型</option>');
	var cate2Option = changeOption($('#cate_first').val());
	console.log(cate2Option);
	$.each(cate2Option, function(key, value) {
		$('#cate_second').append('<option value="' + value + '">'+ value + '</option>');
	});
	$('#cate_second').selectpicker('refresh');
	$('#table_term').bootstrapTable('refresh');
});
$('#cate_second').on('changed.bs.select', function (e) {
	$('#table_term').bootstrapTable('refresh');
});