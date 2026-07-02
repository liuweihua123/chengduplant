//	植物标本相关功能
//	标本列表/spms/list.php

// $(document).ready(function() {
// 	spmPagesInit();
// 	switch (search_param.sort) {
// 		case "withPhoto":
// 			if (search_param.order === "desc") {
// 				$("#order_withPhoto").data("order-type", "desc");
// 				$("#order_withPhoto").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
// 			} else {
// 				$("#order_withPhoto").data("order-type", "asc");
// 				$("#order_withPhoto").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
// 			}
// 			break;
// 		case "collectionCode":
// 			if (search_param.order === "desc") {
// 				$("#order_code").data("order-type", "desc");
// 				$("#order_code").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
// 			} else {
// 				$("#order_code").data("order-type", "asc");
// 				$("#order_code").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
// 			}
// 			break;
// 		case "taxonName":
// 			if (search_param.order === "desc") {
// 				$("#order_name").data("order-type", "desc");
// 				$("#order_name").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
// 			} else {
// 				$("#order_name").data("order-type", "asc");
// 				$("#order_name").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
// 			}
// 			break;
// 		case "locality":
// 			if (search_param.order === "desc") {
// 				$("#order_locality").data("order-type", "desc");
// 				$("#order_locality").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
// 			} else {
// 				$("#order_locality").data("order-type", "asc");
// 				$("#order_locality").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
// 			}
// 			break;
// 		case "recordedBy":
// 			if (search_param.order === "desc") {
// 				$("#order_collector").data("order-type", "desc");
// 				$("#order_collector").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
// 			} else {
// 				$("#order_collector").data("order-type", "asc");
// 				$("#order_collector").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
// 			}
// 			break;
// 		case "recordedYear":
// 			if (search_param.order === "desc") {
// 				$("#order_year").data("order-type", "desc");
// 				$("#order_year").children("i").removeClass(["text-grey", "sort"]).addClass(["text-dark", "fa-sort-up"]);
// 			} else {
// 				$("#order_year").data("order-type", "asc");
// 				$("#order_year").children("i").removeClass("text-grey").addClass(["text-dark", "fa-sort-down"]);
// 			}
// 			break;
// 	}
	
// 	$(".order-icon").click(function() {
// 		var order_type = $(this).data("order-type");
// 		if (order_type === "none") {
// 			search_param.sort  = $(this).data("sort-value");
// 			search_param.order = "asc";
// 			search_param.offset = 0;
// 			location.href = getSearchUrl(search_param);
// 		} else if (order_type === "asc"){
// 			search_param.sort  = $(this).data("sort-value");
// 			search_param.order = "desc";
// 			search_param.offset = 0;
// 			location.href = getSearchUrl(search_param)
// 		} else if (order_type === "desc"){
// 			search_param.sort  = "";
// 			search_param.order = "";
// 			search_param.offset = 0;
// 			location.href = getSearchUrl(search_param)
// 		} 
// 	});
	
// 	//	发送ajax请求
// 	$.getJSON(hostUrl + "controller/spms/list.php" + search_url,
// 	function(data) {
// 		//	清空容器
// 		$("#spms_list").html("");
		
// 		var chineseName, formattedName, taxonName, country, stateProvince, recordedBy, recordNumber, locality, spm_image;

// 		//	输出总记录数
// 		if (lang === "en") {
// 			$('#total').html(data.total + ' results');
// 		} else {
// 			$('#total').html('共' + data.total + '条结果');
// 		}
		
// 		//	输出分页参数
// 		var page_number = Math.ceil(data.offset / data.limit) + 1;
// 		var page_count  = Math.ceil(data.total / data.limit);
//     if (page_count > 10000) {
//       page_count = 10000;
//     }
// 		if ((data.offset - data.limit) < 0) {
// 			$("#previous_page").prop("disabled", true);
// 			if (data.total === 0) {
// 				$("#jump_to").prop("disabled", true);
// 			}
// 		}
// 		if (page_count <= 1) {
// 			if (lang === "en") {
// 				$("#jump_to").attr("placeholder", "page 1/1");
// 			} else {
// 				$("#jump_to").attr("placeholder", "第1/1页");
// 			}
// 		} else {
// 			if (lang === "en") {
// 				$("#jump_to").attr("placeholder", "page " + page_number + "/" + page_count);
// 			} else {
// 				$("#jump_to").attr("placeholder", "第" + page_number + "/" + page_count + "页");
// 			}
// 		}
// 		if ((data.offset + data.limit) >= data.total) {
// 			$("#next_page").prop("disabled", true);
// 		}
// 		$("#previous_page").click(function() {
// 			search_param.offset = data.offset - data.limit;
// 			location.href = getSearchUrl(search_param);
// 		});
// 		$("#next_page").click(function() {
// 			search_param.offset = data.offset + data.limit;
// 			location.href = getSearchUrl(search_param) ;
// 		});
		
// 		$("#jump_to").keypress(function(e) {
// 			if (e.which === 13) {
// 				var jump_to_page = $(this).val()
// 				if (jump_to_page <= 0) {
// 					jump_to_page = 1;
// 				} else if (jump_to_page > page_count) {
// 					jump_to_page = page_count;
// 				}
// 				search_param.offset = (jump_to_page - 1) * data.limit;
//         if (search_param.offset > 300000) {
//           search_param.offset = 9999 * data.limit;
//         }
// 				location.href = getSearchUrl(search_param);
// 			}
// 		});
		
// 		if (data.total === 0) {
// 			if (lang === "en") {
// 				table_row = '<tr><td colspan="6" class="text-center text-muted"><i class="fas fa-exclamation-triangle fa-fw"></i>No record to display</td></tr>';
// 			} else {
// 				table_row = '<tr><td colspan="6" class="text-center text-muted"><i class="fas fa-exclamation-triangle fa-fw"></i>没有找到符合条件的标本记录</td></tr>';
// 			}
// 			$("#spms_list").append(table_row);
// 			$("#pagination").remove();
// 		} else {
// 			//	遍历结果集，输出数组
// 			$.each(data.rows, function(key, row) {
// 				//	合并馆藏条码
// 				var collectionCode = [row.institutionCode, row.collectionCode].join(' ');
// 				//	生成缩略图
// 				if (row.withPhoto === '1') {
// 					spm_image = '<img src="https://image.cvh.ac.cn/files/s/' + row.institutionCode + '/' + row.collectionCode + '.jpg" style="max-height: 32px;max-width: 32px">';
// 				} else {
// 					spm_image = '';
// 				}
// 				//	生成模式标记
// 				if (row.isType === '1') {
// 					type_badge = '<span class="badge badge-default ml-1">T</badge>';
// 				} else {
// 					type_badge = '';
// 				}
				
// 				//	过滤空对象并合并采集人、采集号
// 				recordedBy = filter_null_object(row.recordedBy);
// 				recordNumber = filter_null_object(row.recordNumber);
// 				var recordInfo = [recordedBy, recordNumber].join(' ');
// 				//	合并类群名称
// 				chineseName = filter_null_object(row.chineseName);
// 				formattedName = filter_null_object(row.formattedName);
// 				taxonName = [chineseName, formattedName].join(' ');
// 				//	合并采集地
// 				country = filter_null_object(row.country);
// 				stateProvince = filter_null_object(row.stateProvince);
// 				locality = [country, stateProvince].join(' ');

// 				year = filter_null_object(row.year);
				
// 				//	输出表格
// 				table_row = [
// 					'<tr class="spms-row" data-collection-id="' + row.collectionID + '" style="transform: rotate(0);">',
// 						'<td class="align-middle clickable">' + spm_image + '</td>',
// 						'<td class="align-middle clickable">' + row.institutionCode + ' ' + row.collectionCode + type_badge + '</a>',
// 						'<td class="align-middle clickable">' + taxonName + '</td>',
// 						'<td class="align-middle clickable">' + recordInfo	+ '</td>',
// 						'<td class="align-middle clickable">' + locality + '</td>',
// 						'<td class="align-middle clickable">' + year + '</td>',
// 					'</tr>'
// 				];
// 				$("#spms_list").append(table_row.join(''));
// 			});
// 		}
		
// 		//	点击表格行进行跳转
// 		$(".spms-row").click(function() {
// 			var spm_id = $(this).attr('data-collection-id');
// 			window.open(hostUrl + "spms/detail.php?id=" + spm_id);
// 		});
// 	});
// });