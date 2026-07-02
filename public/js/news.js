//	新闻动态相关功能
//	新闻动态列表/articles/news.php

var category, i18n, title;
switch(getQueryVariable("category")) {
	case "1":
		$('#cate_1').addClass('active');
		i18n = "newsFrontiers";
		category = "1";
		break;
	case "2":
		$('#cate_2').addClass('active');
		i18n = "newsResearch";
		category = "2";
		break;
	case "201":
		$('#cate_201').addClass('active');
		i18n = "newsNewSpecies";
		category = "201";
		break;
	case "202":
		$('#cate_202').addClass('active');
		i18n = "newsSystematics";
		category = "202";
		break;
	case "203":
		$('#cate_203').addClass('active');
		i18n = "newsSpecimens";
		category = "203";
		break;
	case "3":
		$('#cate_3').addClass('active');
		i18n = "newsProtection";
		category = "3";
		break;
	case "4":
		$('#cate_4').addClass('active');
		i18n = "progress";
		category = "4";
		break;
	case "5":
		$('#cate_5').addClass('active');
		i18n = "newsProduction";
		category = "5";
		break;
	case "501":
		$('#cate_501').addClass('active');
		i18n = "newsPublication";
		category = "501";
		break;
	case "502":
		$('#cate_502').addClass('active');
		i18n = "newsService";
		category = "502";
		break;
	default:
		$('#cate_all').addClass('active');
		i18n = "newsViewAll";
		category = "all";
}

$('#news_list').bootstrapTable({
	classes: 'table border-bottom',
	url: hostUrl + 'controller/search/articles.php',
	method: 'get',
	dataType: 'json',
	uniqueId: 'ID',
	pagination: true,
	sidePagination: 'client',
	paginationLoop: false,
	pageSize: 15,
	queryParams: function (params) {
		return {
			category: category,
				};
			},
	undefinedText: "",
	iconsPrefix: "fas",
	showHeader: false,
	columns: [
		{
			field: "info",
			title: "信息",
			class: "clickable",
			width: "100",
			widthUnit: "%",
			formatter: function (value, row) {
				return ([
					'<div>',
					'<h6 class="text-secondary small">' + row.uploadTime + '<span class="text-default ml-2">' + row.author + '</span></h6>',
					'<h6><strong>' + row.title + '</strong></h6>',
					'<p class="text-secondary small mb-2">' + row.summary + '</p>',
					'</div>'
				].join(''));
			}
		}
	],
	onClickRow: function(row) {
		$(location).prop("href", "details.php?id=" + row.article_id);
	},
	onAll: function() {
		$(".pagination-detail").remove();
	},
	formatLoadingMessage: function() {
		return '';
	},
	formatNoMatches: function() {
		return '此分类下暂无新闻公告';
	}
});