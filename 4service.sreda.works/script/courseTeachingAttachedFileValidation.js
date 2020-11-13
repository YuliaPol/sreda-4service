
$('.attachedFile').submit(function(e){
	stopRestart = true;
	var fileName = document.getElementById('fileName').innerText;
	var form = this;
	if (fileName == '') {
		e.preventDefault();
		document.querySelector('.error-message-overlay').style.display = 'flex';
		document.querySelector('.close-message').addEventListener('click', function () {
			document.querySelector('.error-message-overlay').style.display = 'none';
		});
		return false;
	} else {
		e.preventDefault();
		document.querySelector('.success-message-overlay').style.display = 'flex';
		document.querySelector('.close-success-message').addEventListener('click', function () {
			document.querySelector('.success-message-overlay').style.display = 'none';
            // window.removeEventListener('beforeunload', beforeLoad)
			form.submit();
		});
		$(document).mouseup(function (e) {
			var popup = $('.attachedFile-success-message-popup');
			if (e.target != popup[0] && popup.has(e.target).length === 0) {
				$('.success-message-overlay').fadeOut();
				// window.removeEventListener('beforeunload', beforeLoad)
				form.submit();
			}
		});
	}
});
$(document).mouseup(function (e) {
	var popup = $('.error-message-popup');
	if (e.target != popup[0] && popup.has(e.target).length === 0) {
		$('.error-message-overlay').fadeOut();
	}
});