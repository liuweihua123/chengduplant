//	种子标本相关功能

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

function setDefaultImage(param) {
	var search_param = getQueryVariable(param) || "";
	var decoded_param = decodeURI(search_param);
	return decoded_param.replace(/\+/g, " ");
}

function showDetail(id) {
	$.getJSON(hostUrl + 'controller/spms/seed.php',
	{
		collectionID: id
	},
	function(data) {
		if(data.status === 'success') {
			$('.seed-detail-info').text('');
			$('#detail_title').text('PE ' + data.info.collectionCode);
			$('#detail_sciName').html(data.info.formattedName);
			$('#detail_chName').html(data.info.chineseName);
			$('#detail_country').html(data.info.country);
			$('#detail_locality').html(data.info.locality);
			$('#detail_collector').html(data.info.recordedBy);
			$('#detail_year').html(data.info.year);
			$('#detail_code').html(data.info.recordNumber);
			if (data.info.images.length === 0) {
				$('#detail_img_list').append('<img src="' + hostUrl + 'public/images/no_image.jpg" alt="no_images" style="max-width: 100%">');
			} else {
				$.each(data.info.images, function(key, src) {
					$('#detail_img_list').append('<img src="' + src + '" alt="' + data.info.collectionCode + key + '" style="max-width: 100%">');
				});
			}
			$('#detail_modal').modal('show');
		}
	});
}

var lang = getCookie("lang");

var search_param = {
	taxonName : decodeSearchParam("taxonName"),
	family    : decodeSearchParam("family"),
	genus     : decodeSearchParam("genus"),
	year      : decodeSearchParam("year"),
	country   : decodeSearchParam("country"),
	locality  : decodeSearchParam("locality"),
	offset    : decodeSearchParam("offset"),
	limit     : decodeSearchParam("limit")
};

var search_url = getSearchUrl(search_param);

$("#taxonName").val(search_param.taxonName);
$("#family").val(search_param.family);
$("#genus").val(search_param.genus);
$("#year").val(search_param.year);
$("#country").val(search_param.country);
$("#locality").val(search_param.locality);

function spmPagesInit() {
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

$(document).ready(function() {
	spmPagesInit();
	switch (search_param.sort) {
		case "collectionCode":
			if (search_param.order === "desc") {
				$("#order_code").data("order-type", "desc");
				$("#order_code").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
			} else {
				$("#order_code").data("order-type", "asc");
				$("#order_code").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
			}
			break;
		case "taxonName":
			if (search_param.order === "desc") {
				$("#order_name").data("order-type", "desc");
				$("#order_name").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
			} else {
				$("#order_name").data("order-type", "asc");
				$("#order_name").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
			}
			break;
		case "locality":
			if (search_param.order === "desc") {
				$("#order_locality").data("order-type", "desc");
				$("#order_locality").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
			} else {
				$("#order_locality").data("order-type", "asc");
				$("#order_locality").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
			}
			break;
		case "recordedBy":
			if (search_param.order === "desc") {
				$("#order_collector").data("order-type", "desc");
				$("#order_collector").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
			} else {
				$("#order_collector").data("order-type", "asc");
				$("#order_collector").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
			}
			break;
		case "recordedYear":
			if (search_param.order === "desc") {
				$("#order_year").data("order-type", "desc");
				$("#order_year").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
			} else {
				$("#order_year").data("order-type", "asc");
				$("#order_year").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
			}
			break;
	}
	
	$(".order-icon").click(function() {
		var order_type = $(this).data("order-type");
		if (order_type === "none") {
			search_param.sort  = $(this).data("sort-value");
			search_param.order = "asc";
			search_param.offset = 0;
			location.href = getSearchUrl(search_param);
		} else if (order_type === "asc"){
			search_param.sort  = $(this).data("sort-value");
			search_param.order = "desc";
			search_param.offset = 0;
			location.href = getSearchUrl(search_param)
		} else if (order_type === "desc"){
			search_param.sort  = "";
			search_param.order = "";
			search_param.offset = 0;
			location.href = getSearchUrl(search_param)
		} 
	});
	
	//	发送ajax请求
	$.getJSON(hostUrl + "controller/spms/seed.php" + search_url,
	function(data) {
		//	清空容器
		$("#spms_list").html("");
		
		var chineseName, formattedName, taxonName, country, stateProvince, recordedBy, recordNumber, locality, spm_image;

		//	输出总记录数
		if (lang === "en") {
			$('#total').html(data.total + ' results');
		} else {
			$('#total').html('共' + data.total + '条结果');
		}
		
		//	输出分页参数
		var page_number = Math.ceil(data.offset / data.limit) + 1;
		var page_count  = Math.ceil(data.total / data.limit);
		if ((data.offset - data.limit) < 0) {
			$("#previous_page").prop("disabled", true);
			if (data.total === 0) {
				$("#jump_to").prop("disabled", true);
			}
		}
		if (page_count <= 1) {
			if (lang === "en") {
				$("#jump_to").attr("placeholder", "page 1/1");
			} else {
				$("#jump_to").attr("placeholder", "第1/1页");
			}
		} else {
			if (lang === "en") {
				$("#jump_to").attr("placeholder", "page " + page_number + "/" + page_count);
			} else {
				$("#jump_to").attr("placeholder", "第" + page_number + "/" + page_count + "页");
			}
		}
		if ((data.offset + data.limit) >= data.total) {
			$("#next_page").prop("disabled", true);
		}
		$("#previous_page").click(function() {
			search_param.offset = data.offset - data.limit;
			location.href = getSearchUrl(search_param);
		});
		$("#next_page").click(function() {
			search_param.offset = data.offset + data.limit;
			location.href = getSearchUrl(search_param) ;
		});
		
		$("#jump_to").keypress(function(e) {
			if (e.which === 13) {
				var jump_to_page = $(this).val()
				if (jump_to_page <= 0) {
					jump_to_page = 1;
				} else if (jump_to_page > page_count) {
					jump_to_page = page_count;
				}
				search_param.offset = (jump_to_page - 1) * data.limit;
				location.href = getSearchUrl(search_param);
			}
		});
		
		if (data.total === 0) {
			if (lang === "en") {
				table_row = '<div class="col"><div class="card"><div class="card-body"><i class="fas fa-exclamation-triangle fa-fw text-danger mr-2"></i>No record to display</div></div></div>';
			} else {
				table_row = '<div class="col"><div class="card"><div class="card-body"><i class="fas fa-exclamation-triangle fa-fw text-danger mr-2"></i>没有找到符合条件的记录</div></div></div>';
			}
			$("#spms_list").html(table_row);
			$("#total").remove();
			$("#page_selector").remove();
		} else {
			//	遍历结果集，输出数组
			$.each(data.rows, function(key, row) {
				//	合并馆藏条码
				var collectionCode = [row.institutionCode, row.collectionCode].join(' ');
				//	生成缩略图
				seed_image = imgUrl + '/seed/' + row.collectionCode.substring(0, 4) + '/' + row.collectionCode + '-1.jpg';
				
				//	过滤空对象并合并采集人、采集号
				recordedBy = filter_null_object(row.recordedBy);
				recordNumber = filter_null_object(row.recordNumber);
				var recordInfo = [recordedBy, recordNumber].join(' ');
				//	合并类群名称
				chineseName = filter_null_object(row.chineseName);
				formattedName = filter_null_object(row.formattedName);
				taxonName = [chineseName, formattedName].join(' ');
				//	合并采集地
				country = filter_null_object(row.country);
				locality = filter_null_object(row.locality);
				locality = [country, locality].join(' ');

				year = filter_null_object(row.year);

				//	输出表格
				list_card = [
					'<div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">',
						'<div class="card mb-4 clickable" data-collection-id="' + row.collectionID + '" style="min-height: 250px" onclick="showDetail(\'' + row.collectionID + '\')">',
							'<img src="' + seed_image + '" class="card-img-top img-seed" alt="cvh-seed-' + row.collectionCode + '" onerror="this.src=\'' + hostUrl + 'public/images/no_image.jpg\'">',
							'<div class="card-body py-2">',
								'<ul class="list-unstyled mb-0">',
									'<li class="text-secondary small">PE ' + row.collectionCode + '</li>',
									'<li class="font-weight-bold small">' + formattedName  + '</li>',
									'<li class="small">' + chineseName  + '</li>',
								'</ul>',
							'</div>',
						'</div>',
					'</div>'
				];
				$("#spms_list").append(list_card.join(''));
			});
		}
		
		//	点击表格行进行跳转
		$(".spms-row").click(function() {
			var spm_id = $(this).attr('data-collection-id');
			window.open(hostUrl + "spms/info.php?id=" + spm_id);
		});
	});
});