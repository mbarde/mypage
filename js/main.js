$(document).ready( function() {

	var content_id = 0;

	function change_content(to_c_id) {
			var old_content_id = content_id;
			content_id = to_c_id;
			$('.container .content[content-id=' + old_content_id + ']').hide();
			$('.container .content[content-id=' + content_id + ']').slideToggle();
			$('.container .button[content-id=' + old_content_id + ']').removeClass("active-btn");
			$('.container .button[content-id=' + content_id + ']').addClass("active-btn");
			location.hash = content_id;
	}

	var hash = location.hash.replace('#','');

	if(hash != ''){
		change_content( hash );
	}

	$('.container .nav-btn').click( function() {
			change_content( $(this).attr('content-id') );
	});

	$('.img-thumb').click( function() {
		$('#popbox-image-img').attr("src", $(this).attr("src"));
		$('#popbox-image-img').on('load', function() {
			$('#popbox-image').bPopup();
		});
	});
});
