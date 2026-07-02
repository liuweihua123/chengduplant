//	基础函数
//	Cookie
//	设置Cookie
function isIE() {
	if(!!window.ActiveXObject || "ActiveXObject" in window){
		return true;
	}else{
		return false;
 }
}

function setCookie(name, value, days) {
	var exp = new Date();
	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

//删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}

//	获取URL参数
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] === variable) {
			return pair[1];
		}
	}
	return (false);
}

//	获取URL数组（param=*!）
function getMultiVariable(param) {
	var str = decodeURI(window.location.search);
	eval('var reg = /' + param + '\\[\\]=(.*?)!/g;');
	var res = str.match(reg);
	var result = [];
	var i = 0;
	while( res = reg.exec(str))
	{
		result[i] = res[1] + '!';
		i ++;
	}
	return(result);
}

//	切换高级检索过滤器
function showFilter() {
	$(".filter").removeClass(["d-none","d-xl-block"]);
	$("#show_filter").html('<span data-i18n="filter">高级检索</span><i class="fas fa-caret-up fa-fw"></i>');
	$("#show_filter").attr("onClick", "hideFilter()");
	loadProperties();
}
function hideFilter() {
	$(".filter").addClass(["d-none","d-xl-block"]);
	$("#show_filter").attr("onClick", "showFilter()");
	$("#show_filter").html('<span data-i18n="filter">高级检索</span><i class="fas fa-caret-down fa-fw"></i>');
	loadProperties();
}

function formatCanonicalName(nameStr) {
  return '<em>' + nameStr.replace(' var. ', '</em> var. <em>').replace(' subsp. ', '</em> subsp. <em>').replace(' f. ', '</em> f. <em>') + '</em>'
}

//	为表单添加错误信息
function addAlertInfo(info) {
	return [
		'<div class="invalid-feedback">',
		info,
		'</div>'
	].join("");
}

//	过滤null对象
function filter_null_object(param) {
	if(! $.isEmptyObject(param)) {
		return param;
	} else {
		return '';
	}
}

//	URIdecode搜索参数
function decode_search_param(param) {
	var search_param = getQueryVariable(param) || "";
	var decoded_param = decodeURI(search_param);
	return decoded_param.replace(/\+/g, " ");
}

//	页面内搜索并跳转至目标位置
function content_search(selector, keyword) {
	$row = $(selector + ":contains('" + keyword + "')");
	$("html,body").animate(
	{
		scrollTop: $row.offset().top
	},
	200);
}

//	生成随机整数
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower+1)) + lower;
}

//	类群名称自动补全
function name_autocomplete(selector) {
	$(selector).autocomplete({
		source: hostUrl + "controller/ajax/autocomplete.php", // 配置Ajax数据源
	})
	.autocomplete("instance")._renderItem = function (ul, item) {
		return $("<li>")
			.append('<div class="text-dark">' + item.format + ' <small class="text-muted">' + item.desc + "</small></div>")
			.appendTo(ul); // 每行搜索结果的格式
	};
}

//	切换语言
function switchLanguage() {
	var lang = getCookie("lang");
	switch (lang) {
		case "en":
			delCookie("lang");
			break;
		default:
			setCookie("lang", "en")
	}
	location.reload();
}

//	i18n
var localI18n = {
	zh: {
		advanced: "高级检索",
		cardView: "卡片",
		filter: "检索",
		filterClear: "清空",
		homepage: "首页",
		lang: "切换语言",
		listView: "列表",
		statisticView: "统计"
	},
	en: {
		advanced: "Advanced",
		cardView: "Cards",
		filter: "Filter",
		filterClear: "Clear",
		homepage: "Home",
		lang: "Language",
		listView: "List",
		statisticView: "Statistics"
	}
};

function i18nText(key, fallback, lang) {
	var value = "";
	try {
		value = $.i18n.prop(key);
	} catch (ex) {}
	if (!value || value === key || value === "[" + key + "]" || value.toLowerCase() === "[" + key.toLowerCase() + "]") {
		value = (localI18n[lang] && localI18n[lang][key]) || fallback || key;
	}
	return value;
}

function applyLocalI18n(lang) {
	$('[data-i18n-placeholder]').each(function () {
		$(this).attr('placeholder', i18nText($(this).data('i18n-placeholder'), $(this).attr('placeholder'), lang));
	});
	$('[data-i18n]').each(function () {
		$(this).html(i18nText($(this).data('i18n'), $(this).html(), lang));
	});
	$('[data-i18n-value]').each(function () {
		$(this).val(i18nText($(this).data('i18n-value'), $(this).val(), lang));
	});
}

function loadProperties() {
	var lang = getCookie("lang");
	switch (lang) {
		case "en":
			lang = "en";
			$('html').attr('lang', 'en');
			break;
		default:
			lang = "zh";
			$('html').attr('lang', 'zh');
	}
	$.i18n.properties({
		name: 'strings',
		path: hostUrl + 'public/i18n/',
		mode: 'map',
		cache: true,
		language: lang,
		callback: function () {
			try {
				$('[data-i18n-src]').each(function () {
					$(this).attr('src', hostUrl + $.i18n.prop($(this).data('i18n-src')));
				});
				applyLocalI18n(lang);
			} catch (ex) {}
			}
	});
	applyLocalI18n(lang);
}

//	基本配置
//	设置绝对路径变量
var protocol = "http:";
if (window.location.protocol === "https:"){
	protocol = "https:";
}

var hostUrl;
if (window.location.host === "localhost:8801") {
	hostUrl = protocol + "//localhost:8801/";
} else if (window.location.host === "192.168.70.191") {
	hostUrl = protocol + "//192.168.70.191/";
} else if (window.location.host === "159.226.89.191") {
	hostUrl = protocol + "//159.226.89.191/";
} else {
	hostUrl = protocol + "//www.cvh.ac.cn/";
}
var imgUrl = protocol + "//www.cvh.ac.cn/cvhpic";
//	exa: http://www.cvh.ac.cn/cvhpic/spm-l/CZH/CZH0019001

//	BoostrapTable icon 配置项
var bt_icon = {
	'paginationSwitchDown': 'fa-caret-square-down fa-fw',
	'paginationSwitchUp': 'fa-caret-square-up fa-fw',
	'refresh': 'fa-sync fa-fw',
	'toggleOff': 'fa-toggle-off fa-fw',
	'toggleOn': 'fa-toggle-on fa-fw',
	'columns': 'fa-th-list fa-fw',
	'fullscreen': 'fa-arrows-alt fa-fw',
	'detailOpen': 'fa-plus text-green fa-fw',
	'detailClose': 'fa-minus text-green fa-fw'
};

loadProperties();

//	探针埋点
// var _paq = window._paq || [];
// _paq.push(['trackPageView']);
// _paq.push(['enableLinkTracking']);

// (function() {
// 	var u="//www.cvh.ac.cn/piwik/";
// 	_paq.push(['setTrackerUrl', u+'matomo.php']);
// 	_paq.push(['setSiteId', '1']);

// 	var secondaryTrackerUrl = '//analytics.escience.org.cn/piwik.php';
// 	var secondaryWebsiteId = 43;
// 	_paq.push(['addTracker', secondaryTrackerUrl, secondaryWebsiteId]);

// 	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
// 	g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
// })();

//	开启Bootstrap Tooltip
$(function() {$("[data-toggle='tooltip']").tooltip();});

//	自动补全
if ($("#quick_search").length > 0) {
	name_autocomplete($("#quick_search"));
}

if ($("#sidebar").length > 0) {
	if (0 < $("#sidebar")[0].scrollHeight && $("#sidebar")[0].scrollHeight <= $(window).height()) {
		$("#sidebar").css("overflow-y", "hidden");
	}
	var top_o = $("#sidebar").offset().top;
	var top_footer_o = $("footer").offset().top;
	$("#sidebar").css("max-height", $(window).height() - top_o);
	$("#sidebar").css("width", $("#sidebar").parent().width());
	$(window).scroll(function (){
		var top_n = $("#sidebar").offset().top;
		var top_d = top_n - $(window).scrollTop();
		var height = $("#sidebar").outerHeight();
		var max_height;
		var top_footer_n = $("footer").offset().top;
		if (top_footer_n > top_footer_o) {
			top_footer_o = top_footer_n;
		}
		var top_footer_d = top_footer_n - $(window).scrollTop();
		var content = ["sibar原始顶部距离：" + top_o, "sibar当前顶部距离：" + top_n, "sibar当前高度：" + height,"footer原始距离：" + top_footer_o,  "footer当前距离：" + top_footer_d, "窗口滚动距离：" + $(window).scrollTop()].join("<br />");
//			$("#sidebar_info").html(content);
		if (top_n > top_o) {
			max_height = top_footer_d;
		} else {
			max_height = $(window).height() - top_d;
		}
		if (max_height > $(window).height()) {
			max_height = $(window).height();
		}
		$('#sidebar').css("max-height", max_height);
		if (top_n >= top_o) {
			if (top_d <= 0) {
				if (top_footer_d > height) {
					$("#sidebar").addClass("fixed");
				}
			} else {
				$("#sidebar").removeClass("fixed");
			}
		} else {
			$("#sidebar").removeClass("fixed");
		}
	});
	$(window).resize(function() {
		$("#sidebar").css("width", $("#sidebar").parent().width());
	});
}

//	载入用户功能区
if ($("#user_dashboard").length > 0) {
	$.getJSON(hostUrl + "controller/users/user_info.php",
	{
		type: "status"
	},
	function(data) {
		var content = [];
		if (data.loginStatus === true) {
			var admin_item = '';
			if ((data.info.userGroup === "系统管理员") || (data.info.userGroup === "平台管理员")) {
				admin_item = '<a class="dropdown-item" href="' + hostUrl + 'admin/dashboard.php" data-i18n="administration">后台管理</a>';
			}
			content = [
				'<button id="logout" class="btn btn-link text-title"><strong data-i18n="logout">退出</strong></button>',
				'<div class="dropdown">',
					'<button type="button" class="btn btn-link text-title dropdown-toggle pl-0"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i><strong>' + data.info.username + '</strong></button>',
					'<div class="dropdown-menu">',
						'<a class="dropdown-item" href="' + hostUrl + 'users/info.php' + '" data-i18n="userInfo">个人中心</a>',
						admin_item,
					'</div>',
				'</div>'
			].join('');
			$("#user_dashboard").append(content);

			//	用户退出
			$("#logout").click(function() {
				$.post(hostUrl + "controller/users/logout.php",
				function(data, status){
					if (status === "success") {
						delCookie("username");
						delCookie("password");
						delCookie("autologin");
						location.replace(hostUrl);
					}
				});
			});
		} else {
			// content = [
			// 	'<a class="nav-link text-title pl-2" href="' + hostUrl + 'users/register.php"><strong data-i18n="register"></strong></a>',
			// 	'<a class="nav-link text-title pl-2" href="' + hostUrl + 'users/login.php"><strong data-i18n="login"></strong></a>'
      // ].join('');
      // content = [
			// 	'<a class="nav-link text-title pl-2" href="' + hostUrl + 'users/register.php"><strong data-i18n="register">注册</strong></a>',
			// 	'<a class="nav-link text-title pl-2" href="' + hostUrl + 'users/login.php"><strong data-i18n="login">登录</strong></a>'
			// ].join('');
			// $("#user_dashboard").append(content);
		}
		loadProperties();
	});
}

//	访问量计算
$.getJSON(hostUrl + "controller/ajax/probe.php");
