
$('.attachedFile').submit(function(e){
	stopRestart = true;
	var fileForm = $(this).find('.inputfile').length;
	var fileFormVal = 0;
	var feedback_needs = $(this).find('.send-btn').attr('data-homework');
	if(fileForm > 0) {
		fileFormVal = $(this).find('.inputfile').val();
	}
	var form = this;
	if (fileForm!==0 && fileFormVal==0) {
		e.preventDefault();
		$(this).find('.upload_file_container').addClass('has-error')
		$(this).find('.upload_file_container').click(function(e){
			$(this).removeClass('has-error');
		});
		document.querySelector('.error-message-overlay').style.display = 'flex';
		document.querySelector('.close-message').addEventListener('click', function () {
			document.querySelector('.error-message-overlay').style.display = 'none';
		});
		return false;
	} else if($(this).find('.hw-comment').length > 0 && !$(this).find('.hw-comment').val()){
		e.preventDefault();
		$(this).find('.hw-comment').addClass('has-error');
		$(this).find('.hw-comment').click(function(e){
			$(this).removeClass('has-error');
		});
		document.querySelector('.error-message-overlay-message').style.display = 'flex';
		$('.error-message-overlay-message').on('click', '.close-message', function(e){
			$('.error-message-overlay-message').css('display', 'none');
		});
		return false;
	}
	 else {
		e.preventDefault();
		let blockShow = $('.success-message-overlay');
		if($(this).parents('.cursova-to-course').length > 0){
			blockShow = $('.success-message-overlay-cursova');
		}
		let checkDate = $(this).find('.send-btn').attr('data-chekelesson');
		if(checkDate){
			let days = "дней";
			if(checkDate == 1){
				days = "день";
			}
			if(checkDate > 1 && checkDate < 5){
				days = "дня";
			}
			let text = "Проверка домашнего задания занимает " + checkDate + " " + days;
			blockShow.find('.add-info:nth-child(1)').html(text);
		}
		else {
			blockShow.find('.add-info:nth-child(1)').html(" ");
		}
		blockShow.css('display','flex');
		if(!$(form).hasClass('send')){
			$(form).addClass('send');
			var formData = new FormData(this);
			if(feedback_needs!="1"){
				$(this).parents('.lesson-home_work').find('.homework-seen').val('true');
				checkPassedLesson($(this).parents('.contents_paragraphs_item'));
			}
			$.ajax ({
				type:'POST', // Тип запроса
				url: "/ajax/homework",
                data: formData, // Данные которые мы передаем
                cache:false, // В запросах POST отключено по умолчанию, но перестрахуемся
                contentType: false, // Тип кодирования данных мы задали в форме, это отключим
				processData: false, // Отключаем, так как передаем файл
			}).done(function (data) {
				console.log(data);
				console.log('ДЗ отправлено');
				$(form).fadeOut(300);
				$(form).parents('.upload_file_main-container').prev('.lesson-home_work').find('.homework-block .lesson-materials-title').fadeOut(300);
				$(form).parents('.home-work-materials').find('.homework-block').addClass('hidden');
			}).fail(function (data) {
				// не удалось выполнить запрос к серверу
				console.log(data);
				console.log('Запрос не принят');
			});
		}
		$('.close-success-message').click(function(e){
			$(this).parents('.success-message-overlay').css('display','none');
		});
		setTimeout(()=>{
			blockShow.find('.close-success-message').click();
		}, 5000);
		// document.querySelector('.close-success-message').addEventListener('click', function () {
		// 	blockShow.css('display','none');
        //     // window.removeEventListener('beforeunload', beforeLoad)
		// 	// form.submit();
		
		// });
		$(document).mouseup(function (e) {
			var popup = $('.attachedFile-success-message-popup');
			if (e.target != popup[0] && popup.has(e.target).length === 0) {
				blockShow.fadeOut();
				// window.removeEventListener('beforeunload', beforeLoad)
				// form.submit();
			}
		});
		return false;
	}
});
$(document).mouseup(function (e) {
	var popup = $('.error-message-popup');
	if (e.target != popup[0] && popup.has(e.target).length === 0) {
		$('.error-message-overlay').fadeOut();
	}
});
$(document).mouseup(function (e) {
	var popup = $('.error-message-popup');
	if (e.target != popup[0] && popup.has(e.target).length === 0) {
		$('.error-message-overlay-message').fadeOut();
	}
});

$('.attachedFileCursova').submit(function(e){
	stopRestart = true;
	var fileForm = $(this).find('.inputfile').length;
	var fileFormVal = 0;
	var feedback_needs = $(this).find('.send-btn').attr('data-homework');
	if(fileForm > 0) {
		fileFormVal = $(this).find('.inputfile').val();
	}
	var form = this;
	if (fileForm!==0 && fileFormVal==0) {
		e.preventDefault();
		$(this).find('.upload_file_container').addClass('has-error')
		$(this).find('.upload_file_container').click(function(e){
			$(this).removeClass('has-error');
		});
		document.querySelector('.error-message-overlay').style.display = 'flex';
		document.querySelector('.close-message').addEventListener('click', function () {
			document.querySelector('.error-message-overlay').style.display = 'none';
		});
		return false;
	} else if($(this).find('.hw-comment').length > 0 && !$(this).find('.hw-comment').val()){
		e.preventDefault();
		$(this).find('.hw-comment').addClass('has-error');
		$(this).find('.hw-comment').click(function(e){
			$(this).removeClass('has-error');
		});
		document.querySelector('.error-message-overlay-message').style.display = 'flex';
		$('.error-message-overlay-message').on('click', '.close-message', function(e){
			$('.error-message-overlay-message').css('display', 'none');
		});
		return false;
	} else {
		e.preventDefault();
		let blockShow = $('.success-message-overlay');
		if($(this).parents('.cursova-to-course'.length > 0)){
			blockShow = $('.success-message-overlay-cursova');
		}
		let checkDate = $(this).find('.send-btn').attr('data-chekelesson');
		let text = "";
		if(checkDate){
			let days = "дней";
			if(checkDate == 1){
				days = "день";
			}
			if(checkDate > 1 && checkDate < 5){
				days = "дня";
			}
			text = "Проверка курсовой работы занимает " + checkDate + " " + days;
			blockShow.find('.add-info:nth-child(1)').html(text);
		}
		else {
			blockShow.find('.add-info:nth-child(1)').html(" ");
		}
		blockShow.css('display','flex');
		setTimeout(()=>{
			blockShow.find('.close-success-message').click();
		}, 5000);
		if(!$(form).hasClass('send')){
			$(form).addClass('send');
			var formData = new FormData(this);
			if(feedback_needs!="1"){
				$(this).parents('.lesson-home_work').find('.homework-seen').val('true');
				checkPassedLesson($(this).parents('.contents_paragraphs_item'));
			}
			$.ajax ({
				type:'POST', // Тип запроса
				url: "/ajax/coursework",
                data: formData, // Данные которые мы передаем
                cache:false, // В запросах POST отключено по умолчанию, но перестрахуемся
                contentType: false, // Тип кодирования данных мы задали в форме, это отключим
				processData: false, // Отключаем, так как передаем файл
			}).done(function (data) {
				console.log(data);
				console.log('Курсова отправлено');
				$(form).fadeOut(300);
				$(form).parents('.cursova-to-course ').find('p.cursova-title:last-child()').html('Благодарим за выполнение курсовой работы! <br>' + text + '<br> О результатах Вы будете проинформированы в уведомлении');
				$(form).parents('.upload_file_main-container').prev('.lesson-home_work').find('.homework-block .lesson-materials-title').fadeOut(300);
			}).fail(function (data) {
				// не удалось выполнить запрос к серверу
				console.log(data);
				console.log('Запрос не принят');
			});
		}
		$('.close-success-message').click(function(e){
			$(this).parents('.success-message-overlay-cursova').css('display','none');
		});
		// document.querySelector('.close-success-message').addEventListener('click', function () {
		// 	blockShow.css('display','none');
        //     // window.removeEventListener('beforeunload', beforeLoad)
		// 	// form.submit();
		
		// });
		$(document).mouseup(function (e) {
			var popup = $('.attachedFile-success-message-popup');
			if (e.target != popup[0] && popup.has(e.target).length === 0) {
				blockShow.fadeOut();
				// window.removeEventListener('beforeunload', beforeLoad)
				// form.submit();
			}
		});
		return false;
	}
});
