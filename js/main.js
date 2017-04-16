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

	$('#container-form-contact h3').click( function() {
		$('#form-contact').slideToggle();
	});

	$('#btn-submit-contact').click( function() {
		$.ajax({
			url: 'php/contact.php',
			type: 'post',
			dataType: 'html',
			data: $('#form-contact').serialize(),
			success: function(response) {
				if (response.length < 5) {
					$('#container-form-contact').html("<p>Mail has successfully been sent. Thank you! I will answer it as fast as possible :)");
				} else {
					$('#form-contact .div-error').html(response);
				}
			}
		});
	});

	$('.img-thumb').click( function() {
		$('#popbox-image-img').attr("src", $(this).attr("src"));
		$('#popbox-image-img').on('load', function() {
			$('#popbox-image').bPopup();
		});
	});

	$('#popbox-image .active-btn').click( function() {
		
	});
});
