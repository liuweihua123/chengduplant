// //	首页相关功能 index.php

// var lang = getCookie("lang");
// //	获取新闻动态
// $("#news").bootstrapTable({
// 	classes: "table table-sm table-hover border-bottom",
// 	url: hostUrl + "public/data/homepage_articles.json",
// 	method: 'get',
// 	ajaxOptions: {
// 		cache: false
// 	},
// 	queryParams: function() {
// 		return {}
// 	},
// 	dataType: 'json',
// 	uniqueId: 'ID',
// 	showLoading: false,
// 	undefinedText: "",
// 	iconsPrefix: "fas",
// 	showHeader: false,
// 	columns: [
// 		{
// 			field: "title",
// 			title: "标题",
// 			class: "clickable px-0 py-2",
// 			formatter: function(value, row) {
// 				var date;
// 				if (row.date) {
// 					date = row.date;
// 				} else {
// 					date = row.uploadTime;
// 				}
// 				var i18n, icon;
// 				switch(row.category) {
// 					case "业内资讯":
// 						i18n = "newsFrontiers";
// 						icon = 'compass';
// 						break;
// 					case "科研动态":
// 						i18n = "newsResearch";
// 						icon = 'flask';
// 						break;
// 					case "中国新物种":
// 						i18n = "newsNewSpecies";
// 						icon = 'leaf';
// 						break;
// 					case "系统与进化":
// 						i18n = "newsSystematics";
// 						icon = 'dna';
// 						break;
// 					case "标本支撑":
// 						i18n = "newsSpecimens";
// 						icon = 'leaf';
// 						break;
// 					case "生物多样性保护":
// 						i18n = "newsProtection";
// 						icon = 'umbrella';
// 						break;
// 					case "工作进展":
// 						i18n = "progress";
// 						icon = 'calendar-check';
// 						break;
// 					case "成果汇总":
// 						i18n = "newsProduction";
// 						icon = 'book';
// 						break;
// 					case "文章与专著":
// 						i18n = "newsPublication";
// 						icon = 'book';
// 						break;
// 					case "服务案例":
// 						i18n = "newsService";
// 						icon = 'book';
// 						break;
// 					default:
// 						i18n = "newsViewAll";
// 						icon = 'newspaper';
// 						category = "all";
// 				}
// 				return '<div class="d-flex justify-content-between"><h6 class="small mb-1"><strong class="text-default"><i class="fas fa-fw fa-' + icon + ' mr-1"></i>' + row.category + '</strong></h6><h6 class="small mb-1"><span class="text-secondary ml-2">' + date + '</span></h6></div><h6 class="my-0" style="max-width:100%">' + row.title + '</h6>';
// 			}
// 		}
// 	],
// 	onClickRow: function(row) {
// 		$(location).prop("href", "articles/details.php?id=" + row.article_id);
// 	},
// 	onLoadSuccess: function() {
// 		loadProperties();
// 	},
// 	formatLoadingMessage: function() {
// 		return '';
// 	}
// });

// //$("#image_uploader").fileinput({
// //	language: "zh",
// //	multiple: false,
// //	theme: "fas",
// //	showClose: false,
// //	showPreview: false,
// //	maxFileCount: 1,
// //	showUpload: false,
// //	showRemove: false,
// //	browseIcon: '<i class="fas fa-folder-open fa-fw"></i>',
// //	browseLabel: "浏览",
// //	browseClass: "btn btn-outline-secondary",
// //	uploadIcon: '<i class="fas fa-upload fa-fw"></i>',
// //	uploadLabel: "提交",
// //	uploadClass: "btn btn-default",
// //	msgPlaceholder: "仅限.jpg格式，大小不超过2MB",
// //	maxFileSize: 2048,
// //	elErrorContainer: "#file_upload_error",
// //	msgUploadEnd: "文件已提交 ✓",
// //	progressCompleteClass: "progress-bar bg-success"
// //});
// //
// //$('#image_uploader').on('change', function(ev){
// //	var reader = new FileReader();
// //	
// //	var image = ev.target.files[0];
// //	reader.onload = function (ev) {
// //		var image_base64 = ev.target.result;
// //		$('#image_preview').attr('src', image_base64);
// //		$('#image_submit').removeClass('d-none');
// //		$('#image_submit').click(function() {
// //			$.post(hostUrl + 'controller/spms/recognizer.php',
// //			{
// //				deviceid: "stu",
// //        image: image_base64
// //			},
// //			function(data) {
// //				console.log(JSON.stringify(data));
// //			});
// //		});
// //	};
// //	var result = reader.readAsDataURL(image);
// //});

// $(document).ready(function() {
// 	var width_o = $(window).width();
// 	if (width_o < 992) {
// 		$('#col1').removeClass('border-right');
// 	} else {
// 		$('#col1').addClass('border-right');
// 	}

// 	$(window).resize(function () {
// 		var width = $(window).width();
// 		if (width < 992) {
// 			$('#col1').removeClass('border-right');
// 		} else {
// 			$('#col1').addClass('border-right');
// 		}
// 	});
	
// 	$.fn.countTo = function (a) {
// 		a = a || {};
// 		return $(this).each(function () {
// 			var c = $.extend({},
// 				$.fn.countTo.defaults, {
// 					from: $(this).text()/20,
// 					to: $(this).text(),
// 					speed: 800,
// 					refreshInterval: $(this).data("refresh-interval"),
// 					decimals: $(this).data("decimals")
// 				},
// 				a);
// 			var h = Math.ceil(c.speed / c.refreshInterval),
// 				i = (c.to - c.from) / h;
// 			var j = this,
// 				f = $(this),
// 				e = 0,
// 				g = c.from,
// 				d = f.data("countTo") || {};
// 			f.data("countTo", d);
// 			if (d.interval) {
// 				clearInterval(d.interval)
// 			}
// 			d.interval = setInterval(k, c.refreshInterval);
// 			b(g);

// 			function k() {
// 				g += i;
// 				e++;
// 				b(g);
// 				if (typeof (c.onUpdate) == "function") {
// 					c.onUpdate.call(j, g)
// 				}
// 				if (e >= h) {
// 					f.removeData("countTo");
// 					clearInterval(d.interval);
// 					g = c.to;
// 					if (typeof (c.onComplete) == "function") {
// 						c.onComplete.call(j, g)
// 					}
// 				}
// 			}

// 			function b(m) {
// 				var l = c.formatter.call(j, m, c);
// 				f.html(l)
// 			}
// 		})
// 	};
// 	$.fn.countTo.defaults = {
// 		from: 0,
// 		to: 0,
// 		speed: 1000,
// 		refreshInterval: 100,
// 		decimals: 0,
// 		formatter: formatter,
// 		onUpdate: null,
// 		onComplete: null
// 	};

// 	function formatter(b, a) {
// 		return b.toFixed();
// 	}
// 	$(".timer").data("countToOptions", {
// 		formatter: function (b, a) {
// 			return b.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
// 		}
// 	});
// 	$(".timer").each(count);

// 	function count(a) {
// 		var b = $(this);
// 		a = $.extend({},
// 			a || {},
// 			b.data("countToOptions") || {});
// 		b.countTo(a)
// 	};
	
// 	if (lang === "en") {
// 		$(".card-source").addClass("small");
// 	}
	
// 	//	获取共建单位列表
// 	$.getJSON(hostUrl + "public/data/co_ins.json", function (data) {
// 		$.each(data, function (key, row) {
// //			var media = [
// //				'<div class="col-sm-6 col-lg-4 text-center my-3">',
// //					'<img src="' + hostUrl + 'public/images/co-ins-icons/' + row.icon + '" alt="' + row.code +'" style="max-width: 60px" />',
// //					'<p class="my-2"><a href="' + row.url + '" target="_blank" class="stretched-link text-secondary">' + row.name + '</a></p>',
// //				'</div>'
// //			].join("");
// 			var media = [
// 				'<div class="text-center my-3" style="width: 100px">',
// 					'<a href="' + row.url + '" target="_blank" class="text-secondary" data-toggle="tooltip" data-placement="top" title="' + row.name + '"><img src="' + hostUrl + 'public/images/co-ins-icons/' + row.icon + '" alt="' + row.code +'" style="max-height: 48px;" /></a>',
// 				'</div>'
// 			].join("");
// 			$('#institution_homepage').append(media);
// 		});
// 		var more_ins = [
// 			'<div class="ml-auto my-3">',
// 				'<div class="d-flex align-items-center" style="height: 48px">',
// 					'<a href="' + hostUrl + 'ins/list.php" class="btn btn-outline-dark align-center rounded-pill"><span data-i18n="otherIns">其它共建单位</span><i class="fas fa-angle-right ml-1"></i></a>',
// 				'</div>',
// 			'</div>'
// 		].join('');
// 		$('#institution_homepage').append(more_ins);
// 		loadProperties();
// 	});
	
// 	//	高级检索馆藏下拉菜单
// 	$("#institutionCode").selectpicker({
// 		style: "btn-multi-select",
// 		actionsBox: true,
// 		liveSearch: true,
// 		maxOptions: 5,
// 		size: 10,
// 		iconBase: "fa",
// 		tickIcon: "fa-check",
// 		noneSelectedText: "Herbarium",
// 		liveSearchPlaceholder: 'Search',
// 	});

// 	//	高级检索省份下拉菜单
// 	$("#stateProvince").selectpicker({
// 		style: "btn-multi-select",
// 		actionsBox: true,
// 		maxOptions: 5,
// 		size: 10,
// 		iconBase: "fas",
// 		tickIcon: "fa-check",
// 		multipleSeparator: "，",
// 		noneSelectedText: "Province",
// 	});

// 	if (lang !== "en") {
// 		$("#institutionCode").selectpicker('deselectAll');
// 		$("#stateProvince").selectpicker('deselectAll');
		
// 		$("#institutionCode").selectpicker('destroy');
// 		$("#institutionCode").selectpicker({
// 			style: "btn-multi-select",
// 			actionsBox: true,
// 			liveSearch: true,
// 			maxOptions: 5,
// 			size: 10,
// 			iconBase: "fa",
// 			tickIcon: "fa-check",
// 			liveSearchPlaceholder: "搜索名称或代码",
// 			maxOptionsText: "最多选择5个馆藏单位",
// 			noneSelectedText: "馆藏单位",
// 			noneResultsText: "搜索{0}无结果",
// 			selectAllText: '选择全部',
// 			deselectAllText: '清除选择'
// 		});

// 		$("#stateProvince").selectpicker('destroy');
// 		$("#stateProvince").selectpicker({
// 			style: "btn-multi-select",
// 			actionsBox: true,
// 			maxOptions: 5,
// 			maxOptionsText: "最多选择5个省份",
// 			size: 10,
// 			iconBase: "fas",
// 			tickIcon: "fa-check",
// 			multipleSeparator: "，",
// 			noneSelectedText: "采集省份",
// 			selectAllText: '选择全部',
// 			deselectAllText: '清除选择'
// 		});
// 	}
	
// 	$.getJSON(hostUrl + "public/data/her_info.json", function (data) {
// 		$.each(data, function (key, row) {
// 			$("#institutionCode").append('<option value="' + row.code + '!" data-subtext="' + row.name + '">' + row.code + '</option>');
// 		});

// 		//	获取URL传值
// 		$("#institutionCode").selectpicker("val", getMultiVariable("institutionCode"));
// 		$("#institutionCode").selectpicker("refresh");
// 	});

// 	$.getJSON(hostUrl + "public/data/province_list.json", function (data) {
// 		$.each(data, function (code, value) {
// 			$("#stateProvince").append('<option value="' + value[0] + '!" data-subtext="' + value[2] + '">' + value[1] + '</option>');
// 		});

// 		//	获取URL传值
// 		$("#stateProvince").selectpicker("val", getMultiVariable("stateProvince"));
// 		$("#stateProvince").selectpicker("refresh");
// 	});
	
// 	//	reset按钮清除下拉选择
// 	$("#search_reset").click(function() {
// 		$("#institutionCode").selectpicker('deselectAll');
// 		$("#stateProvince").selectpicker('deselectAll');
// 	});
	
// 	$("#institutionCode").on('loaded.bs.select', function () {
// 		$(".actions-btn").removeClass("btn-light").addClass("btn-outline-default");
// 		$(".bs-select-all").remove();
// 	});

// 	$("#stateProvince").on('loaded.bs.select', function () {
// 		$(".actions-btn").removeClass("btn-light").addClass("btn-outline-default");
// 		$(".bs-select-all").remove();
// 	});
	
// 	//	高级检索类群名taxonName自动补全
// 	$(function () {
// 		$("#taxonName").autocomplete({
// 				source: hostUrl + "controller/ajax/autocomplete.php", // 配置Ajax数据源
// 			})
// 			.autocomplete("instance")._renderItem = function (ul, item) {
// 				return $("<li>")
// 					.append('<div class="text-dark">' + item.format + ' <small class="text-muted">' + item.desc + "</small></div>")
// 					.appendTo(ul); // 每行搜索结果的格式
// 			};
// 	});
// });