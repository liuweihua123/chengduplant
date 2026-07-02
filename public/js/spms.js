//	植物标本相关功能

function decodeSearchParam(param) {
	var search_param = getQueryVariable(param) || "";
	var decoded_param = decodeURI(search_param);
	return decoded_param.replace(/\+/g, " ");
}

function getSearchUrl(params) {
	var url = "?";
	$.each(params, function(key, value) {
		if (Array.isArray(value)) {
			$.each(value, function(array_key, array_value) {
				url += "&" + key + "[]=" + encodeURI(array_value);
			});
		} else {
			if (value !== "") {
				url += "&" + key + "=" + encodeURI(value);
			}
		}
	});
	return url;
}

var lang = getCookie("lang");

var search_param = {
	institutionCode : getMultiVariable("institutionCode"),
	collectionCode  : decodeSearchParam("collectionCode"),
	stateProvince   : getMultiVariable("stateProvince"),
	taxonName       : decodeSearchParam("taxonName"),
	family          : decodeSearchParam("family"),
	genus           : decodeSearchParam("genus"),
	recordNumber    : decodeSearchParam("recordNumber"),
	recordedBy      : decodeSearchParam("recordedBy"),
	year            : decodeSearchParam("year"),
	country         : decodeSearchParam("country"),
	county          : decodeSearchParam("county"),
	locality        : decodeSearchParam("locality"),
	minimumElevation: decodeSearchParam("minimumElevation"),
	maximumElevation: decodeSearchParam("maximumElevation"),
	identifiedBy    : decodeSearchParam("identifiedBy"),
	dateIdentified  : decodeSearchParam("dateIdentified"),
	hasFlower       : decodeSearchParam("hasFlower"),
	hasFruit        : decodeSearchParam("hasFruit"),
	withPhoto       : decodeSearchParam("withPhoto"),
  hasMolecularMaterial: decodeSearchParam("hasMolecularMaterial"),
	typesOnly       : decodeSearchParam("typesOnly"),
	sort            : decodeSearchParam("sort"),
	order           : decodeSearchParam("order"),
	offset          : decodeSearchParam("offset"),
	limit           : decodeSearchParam("limit")
};

var search_url = getSearchUrl(search_param);

$("#collectionCode").val(search_param.collectionCode);
$("#taxonName").val(search_param.taxonName);
$("#family").val(search_param.family);
$("#genus").val(search_param.genus);
$("#recordNumber").val(search_param.recordNumber);
$("#recordedBy").val(search_param.recordedBy);
$("#year").val(search_param.year);
$("#country").val(search_param.country);
$("#county").val(search_param.county);
$("#locality").val(search_param.locality);
$("#minimumElevation").val(search_param.minimumElevation);
$("#maximumElevation").val(search_param.maximumElevation);
$("#identifiedBy").val(search_param.identifiedBy);
$("#dateIdentified").val(search_param.dateIdentified);
if (search_param.withPhoto === "true") {
	$("#withPhoto").prop("checked", true);
}
if (search_param.typesOnly === "true") {
	$("#typesOnly").prop("checked", true);
}
if (search_param.hasFlower === "true") {
	$("#hasFlower").prop("checked", true);
}
if (search_param.hasFruit === "true") {
	$("#hasFruit").prop("checked", true);
}
if (search_param.hasMolecularMaterial === "true") {
	$("#hasMolecularMaterial").prop("checked", true);
}

function spmPagesInit() {
	//	跳转至其他视图
	$("#list_view").attr('href', hostUrl + "spms/list.php" + window.location.search);
	$("#card_view").attr('href', hostUrl + "spms/card.php" + window.location.search);
	$("#statistic_view").attr('href', hostUrl + "spms/statistic.php" + window.location.search);
	if(isIE()) {
		$("#map_view").click(function() {
			alert("您的浏览器不支持此功能");
		});
	} else {
		$("#map_view").attr('href', hostUrl + "spms/counties.php" + window.location.search);
	}

	//	高级检索馆藏下拉菜单
	$("#institutionCode").selectpicker({
		style: "btn-multi-select",
		actionsBox: true,
		liveSearch: true,
		maxOptions: 5,
		size: 10,
		iconBase: "fa",
		tickIcon: "fa-check",
		noneSelectedText: "Herbarium",
		liveSearchPlaceholder: 'Search',
	});

	//	高级检索省份下拉菜单
	$("#stateProvince").selectpicker({
		style: "btn-multi-select",
		actionsBox: true,
		maxOptions: 5,
		size: 10,
		iconBase: "fas",
		tickIcon: "fa-check",
		multipleSeparator: "，",
		noneSelectedText: "Province",
	});

	if (lang !== "en") {
		$("#institutionCode").selectpicker('deselectAll');
		$("#stateProvince").selectpicker('deselectAll');
		
		$("#institutionCode").selectpicker('destroy');
		$("#institutionCode").selectpicker({
			style: "btn-multi-select",
			actionsBox: true,
			liveSearch: true,
			maxOptions: 5,
			size: 10,
			iconBase: "fa",
			tickIcon: "fa-check",
			liveSearchPlaceholder: "搜索名称或代码",
			maxOptionsText: "最多选择5个馆藏单位",
			noneSelectedText: "馆藏单位",
			noneResultsText: "搜索{0}无结果",
			selectAllText: '选择全部',
			deselectAllText: '清除选择'
		});

		$("#stateProvince").selectpicker('destroy');
		$("#stateProvince").selectpicker({
			style: "btn-multi-select",
			actionsBox: true,
			maxOptions: 5,
			maxOptionsText: "最多选择5个省份",
			size: 10,
			iconBase: "fas",
			tickIcon: "fa-check",
			multipleSeparator: "，",
			noneSelectedText: "采集省份",
			selectAllText: '选择全部',
			deselectAllText: '清除选择'
		});
	}

	$.getJSON(hostUrl + "public/data/her_info.json", function (data) {
		$.each(data, function (key, row) {
			$("#institutionCode").append('<option value="' + row.code + '!" data-subtext="' + row.name + '">' + row.code + '</option>');
		});

		//	获取URL传值
		$("#institutionCode").selectpicker("val", getMultiVariable("institutionCode"));
		$("#institutionCode").selectpicker("refresh");
	});

	$.getJSON(hostUrl + "public/data/province_list.json", function (data) {
		$.each(data, function (code, value) {
			$("#stateProvince").append('<option value="' + value[0] + '!" data-subtext="' + value[2] + '">' + value[1] + '</option>');
		});

		//	获取URL传值
		$("#stateProvince").selectpicker("val", getMultiVariable("stateProvince"));
		$("#stateProvince").selectpicker("refresh");
	});
	
	//	reset按钮清除下拉选择
	$("#search_reset").click(function() {
		$("#institutionCode").selectpicker('deselectAll');
		$("#stateProvince").selectpicker('deselectAll');
	});
	
	$("#institutionCode").on('loaded.bs.select', function () {
		$(".actions-btn").removeClass("btn-light").addClass("btn-outline-default");
		$(".bs-select-all").remove();
	});

	$("#stateProvince").on('loaded.bs.select', function () {
		$(".actions-btn").removeClass("btn-light").addClass("btn-outline-default");
		$(".bs-select-all").remove();
	});

	//	高级检索类群名taxonName自动补全
	$(function () {
		$("#taxonName").autocomplete({
				source: hostUrl + "controller/ajax/autocomplete.php", // 配置Ajax数据源
			})
			.autocomplete("instance")._renderItem = function (ul, item) {
				return $("<li>")
					.append('<div class="text-dark">' + item.format + ' <small class="text-muted">' + item.desc + "</small></div>")
					.appendTo(ul); // 每行搜索结果的格式
			};
	});
}