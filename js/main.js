$(document).ready(function() {

	var CUR_CONTENT_ID = 0;

	function change_content(to_c_id) {
		var old_CUR_CONTENT_ID = CUR_CONTENT_ID;
		CUR_CONTENT_ID = to_c_id;
		$('.container .content[content-id=' + old_CUR_CONTENT_ID + ']').hide();
		$('.container .content[content-id=' + CUR_CONTENT_ID + ']').slideToggle();
		$('.container .button[content-id=' + old_CUR_CONTENT_ID + ']').removeClass('active-btn');
		$('.container .button[content-id=' + CUR_CONTENT_ID + ']').addClass('active-btn');
		location.hash = CUR_CONTENT_ID;
	}

	var hash = location.hash.replace('#', '');
	if (hash != '') {
		change_content(hash);
	}

	$('.container .nav-btn').click(function() {
		change_content( $(this).attr('content-id') );
	});

	$('.img-thumb').click(function() {
		$('#popbox-image-img').attr('src', $(this).attr('src'));
		$('#popbox-image-img').on('load', function() {
			$('#popbox-image').bPopup();
		});
	});

	var STROBE_MODE = false;

	function setStrobeMode(toValue) {
		if (toValue === true) {
			STROBE_MODE = true;
			$('#btn-toggle-strobe').addClass('active-btn');
			document.addEventListener('mousemove', handleMouseMove);
		} else {
			STROBE_MODE = false;
			$('#btn-toggle-strobe').removeClass('active-btn');
			document.removeEventListener('mousemove', handleMouseMove);
		}
	}

	$('#btn-toggle-strobe').click(function() {
		setStrobeMode(!STROBE_MODE);
	});

	if (is_touch_device()) {
	 setStrobeMode(true);
	}
});

function is_touch_device() {
	try {
		document.createEvent('TouchEvent');
		return true;
	} catch (e) {
		return false;
	}
}

function setLinGradOfEl(jsEl, deg0) {
	if (deg0 > 360) deg0 -= 360;
	var deg1 = deg0 + 90;
	if (deg1 > 360) deg1 -= 360;
	var deg2 = deg1 + 90;
	if (deg2 > 360) deg2 -= 360;
	var deg3 = deg2 + 90;
	if (deg3 > 360) deg3 -= 360;
	var bgStr =
		`linear-gradient(${deg0.toString()}deg, hsla(210, 98%, 46%, 1) 0%, hsla(210, 98%, 46%, 0) 70%),
 		 linear-gradient(${deg1.toString()}deg, hsla(22, 98%, 45%, 1) 10%, hsla(22, 98%, 45%, 0) 80%),
 		 linear-gradient(${deg2.toString()}deg, hsla(226, 94%, 47%, 1) 10%, hsla(226, 94%, 47%, 0) 80%),
 		 linear-gradient(${deg3.toString()}deg, hsla(177, 98%, 45%, 1) 100%, hsla(177, 98%, 45%, 0) 70%)`;
	jsEl.style.background = bgStr;
}

function rad2deg(radians) {
	var pi = Math.PI;
	return radians * (180/pi);
}

function handleMouseMove(event) {
	event = event || window.event; // IE-ism

	var eventDoc = (event.target && event.target.ownerDocument) || document;
	var doc = eventDoc.documentElement;
	var body = eventDoc.body;

	// If pageX/Y aren't available and clientX/Y are,
	// calculate pageX/Y - logic taken from jQuery.
	// (This is to support old IE)
	if (event.pageX == null && event.clientX != null) {
		event.pageX = event.clientX +
			(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
			(doc && doc.clientLeft || body && body.clientLeft || 0);
		event.pageY = event.clientY +
			(doc && doc.scrollTop  || body && body.scrollTop  || 0) -
			(doc && doc.clientTop  || body && body.clientTop  || 0 );
	}

	var a = event.pageX / doc.clientWidth - 0.5;
	var b = event.pageY / doc.clientHeight - 0.5;
	var c = Math.sqrt((a * a) + (b * b));
	var deg0 = (rad2deg(Math.acos(b/c))) - 90;
	if (a > 0) deg0 = 90 + (90 - deg0);
	deg0 -= 45;
	setLinGradOfEl(body, deg0);
	var btn = document.getElementById('btn-toggle-strobe');
	setLinGradOfEl(btn, deg0 + 180);
}
