/*
	获取分类地位信息
	引用本文件前先准备一个id为taxon_rank的div
*/
function add_old_family(family) {
	var family_list = {
		'Asteraceae'   : 'Compositae',
		'Brassicaceae' : 'Cruciferae',
		'Poaceae'      : 'Gramineae',
		'Clusiaceae'   : 'Guttiferae',
		'Lamiaceae'    : 'Labiatae',
		'Fabaceae'     : 'Leguminosae',
		'Arecaceae'    : 'Palmae',
		'Apiaceae'     : 'Umbelliferae'
	};
	if(family_list.hasOwnProperty(family)) {
		return(family + '(' + family_list[family] + ')');
	} else {
		return(family);
	}
}

function get_taxon(selector, taxonName) {
	$.getJSON("../controller/species/taxon_info.php",
	{
		taxonName: taxonName
	},
	function(data, status){
		if (status != "success") {
			return;
		} else if(data.status === 'failed') {
			$(selector).html('<table class="table table-borderless table-sm mb-2"><tbody><tr><td id="taxon_info" class="text-secondary">无</td></tr></tbody></table>');
			$(selector).after("<hr />");
		} else {
			var taxon_rank = [
				'<table class="table table-borderless table-sm">',
					'<tr><td id="taxon_info" class="text-title pb-0">',
						'<h6><i class="fa fa-angle-down fa-fw text-default"></i><a id="taxon_phy_link" class="text-title"><span id="taxon_phy_c"></span> <span id="taxon_phy" class="ml-1"></span></a></h6>',
						'<h6><i class="ml-2 fa fa-angle-down fa-fw text-default"></i><span id="taxon_ord_c"></span><span id="taxon_ord" class="ml-1"></span></h6>',
						'<h6><i class="ml-3 fa fa-angle-down fa-fw text-default"></i><a id="taxon_fam_link" class="text-title"><span id="taxon_fam_c"></span><span id="taxon_fam" class="ml-1"></span></a></h6>',
						'<h6><i class="ml-4 fa fa-angle-right fa-fw text-default"></i><a id="taxon_gen_link" class="text-title"><span id="taxon_gen_c"></span><em id="taxon_gen" class="ml-1"></em></a></p></td></tr>',
					'<tr><td><a id="taxon_sp_link" class="text-dark"><h6 id="taxon_name" class="font-weight-bold mb-2 mt-2"><span id="taxon_acc_status" class="badge badge-pill badge-secondary mr-1"></span></h6></a><p class="text-muted mt-0 mb-0 small">自《中国植物物种名录》(2022)</p></td></tr>',
					'<tr class="d-none"><td class="small"><h6 class="my-0"><a id="trait_button" class="badge badge-default" data-toggle="collapse" href="#trait_card" role="button" aria-expanded="false" aria-controls="trait_card">物种描述</a><span id="trait_status" class="text-secondary small ml-2"></span></h6>',
					'<div id="trait_card" class="collapse py-2"><div class="card"><div class="card-body px-3 py-3"><div id="trait_info" class="text-justify"></div></div></div></td></tr>',
					'<tr class="d-none"><td class="small"><h6 class="my-0"><a id="gallary_button" class="badge badge-default" data-toggle="collapse" href="#gallary_card" role="button" aria-expanded="false" aria-controls="gallary_card">彩色照片</a><span id="gallary_status" class="text-secondary small ml-2"></span></h6>',
					'<div id="gallary_card" class="collapse py-2 w-100"><div id="gallary"></div></td></tr></div>',
				'</tbody></table>',
			].join('');

			$(selector).html(taxon_rank);
			$(selector).after("<hr />");
			
			var chineseName = '';
			if (data.info.chineseName) {
				chineseName = data.info.chineseName + '<br />';
			}
			$("#taxon_name").append(chineseName + '<span  style="font-family: Times;">' + data.info.formattedName + '</span>');
			if (data.info.acc_status === '1') {
				$('#taxon_info').removeClass('hide');
				$("#taxon_phy_c").html(data.info.phylum_c);
				$("#taxon_phy").html(data.info.phylum);
				$("#taxon_ord_c").html(data.info.order_c);
				$("#taxon_ord").html(data.info.order);
				$("#taxon_fam_c").html(data.info.family_c);
				$("#taxon_fam").html(add_old_family(data.info.family));
				$("#taxon_gen_c").html(data.info.genus_c);
				$("#taxon_gen").html(data.info.genus);
				$("#taxon_phy_link").attr("href","../species/taxon_tree.php?type=phy&param=" + data.info.phylum);
				$("#taxon_fam_link").attr("href","../species/taxon_tree.php?type=fam&param=" + data.info.family);
				$("#taxon_gen_link").attr("href","../species/taxon_tree.php?type=gen&param=" + data.info.genus);
				$("#taxon_sp_link").attr("href","../species/taxon_tree.php?type=sp&param=" + data.info.canonicalName);
				
				$.post(hostUrl + "controller/species/trait_info.php",
				{
					canonicalName: taxonName
				},
				function(data){
					if ((data.status === "success") && data.info.trait) {
						$('#trait_button')
							.append('<i class="fas fa-caret-down fa-fw"></i>')
							.parents('tr').removeClass('d-none');
						$("#trait_status").text('自《中国植物志》');
						var trait = data.info.trait || '';
						var locality = data.info.locality || '';
						if (trait !== '') {
							trait = '<p>　　' + trait + '</p>';
						}
						if (locality !== '') {
							locality = '<p>　　' + locality + '</p>';
						}
						$("#trait_info").html(trait + locality);
					} else {
						$('#trait_button').parents('tr').remove();
					}
				}, "JSON");

				$.post(hostUrl + "controller/species/living_photo.php",
				{
					canonicalName : taxonName,
					chineseName   : data.info.chineseName,
					scientificName: data.info.formattedName
				},
				function(data, status){
					if ((data.status === "success") && (data.total !== 0)) {
						$('#gallary_button')
							.append('<i class="fas fa-caret-down fa-fw"></i>')
							.parents('tr').removeClass('d-none');
						$("#gallary_status").text(data.total + '张');
						$.each(data.info, function(key,value) {
							var img = [
								'<img alt="' + value.canonicalName + '"',
								'src="' + value.reference + '"',
								'data-description="<strong>' + value.title + '</strong><br />' + filter_null_object(value.locality) + ' ' + filter_null_object(value.created) + ' ' + filter_null_object(value.creator) + ' 摄"',
								'>'
							].join('');
							$("#gallary").append(img);
						});
						$("#gallary").unitegallery({
							gallery_theme: "tiles",
		 					tiles_type: "justify",
							tiles_justified_row_height: 30,

							lightbox_textpanel_enable_title: false,
							lightbox_textpanel_enable_description: true,
						});
					} else {
						$('#gallary_button').parents('tr').remove();
					}
				}, "JSON");
			} else {
				$("#taxon_info").remove();
				$("#taxon_acc_status").text('异名');
				$("#taxon_sp_link").attr("href","../species/taxon_tree.php?type=sp&param=" + data.info.canonicalName);
			}

		}
	});
}