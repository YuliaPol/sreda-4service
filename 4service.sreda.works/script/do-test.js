let globalTestBlockIndex = 0;

if( window.location.href.indexOf('#done-test') > -1 ) {
    $('.test-result-overlay').css('display', 'flex');
}

document.addEventListener('DOMContentLoaded', function() {
    if( window.location.href.indexOf('#do_test') > -1) {
        $('#do_test').click();
    }
});


/**
 * Hide button <ПРОЙТИ ТЕСТ ПО КУРСУ>
 * Show First Test block
 * */
$('#do_test').on( 'click', function () {
    // Show Quiz First Block
    // before unload page
    window.addEventListener('beforeunload', (event) => {
        console.log($('body').hasClass('submit'));
        if(!$('body').hasClass('submit')){
            event.preventDefault();
            event.returnValue = '';
        }
    });
    
    const timer = new NITimer( '#timer', 1200, function () {
        // console.log(2222);
    } );
    $('#do_test').fadeOut();
    globalTestBlockIndex = 0;
    var mainTest = $(this).parents('.test-main-title').next('.main-test');
    mainTest.removeClass('hide');
    mainTest.find('.main-test_questions-wrapper').hide();
    mainTest.fadeIn();
    $(mainTest.find('.main-test_questions-wrapper')[0]).show();

    // add EventListner for buttons on quiz
    mainTest.find('.previous-question').on( 'click', function () {
            $(mainTest.find('.main-test_questions-wrapper')[globalTestBlockIndex]).hide();
            globalTestBlockIndex--;
            $(mainTest.find('.main-test_questions-wrapper')[globalTestBlockIndex]).show();
    } );
    mainTest.find('.next-question').on( 'click', function () {
            $(mainTest.find('.main-test_questions-wrapper')[globalTestBlockIndex]).hide();
            globalTestBlockIndex++;
            $(mainTest.find('.main-test_questions-wrapper')[globalTestBlockIndex]).show();
    } );
    mainTest.find('.send-question_btn').on( 'click', function () {
            window.removeEventListener('beforeunload', beforeLoad);
            $('body').addClass('submit');
            $('#form-test').submit();
            console.log('submit1');
    } );

});

$('#main').on('click', '.lesson-info-do-test', function () {
    var timerEl = $(this).parents('.lesson-test').find('.lesson-test-cont .lesson-timer');
    var testEl = $(this).parents('.lesson-test').find('.lesson-test-cont');
    var testForm = $(this).parents('.lesson-test').find('form');
    let timerTime = 1200;
    // before unload page
    window.addEventListener('beforeunload', (event) => {
        console.log($('body').hasClass('submit'));
        if(!$('body').hasClass('submit')){
            event.preventDefault();
            event.returnValue = '';
        }
    });
    
    if(timerEl.data('timer')){
        let timerTimeAr = timerEl.data('timer').split(':');
        console.log(timerTimeAr);
        timerTime = parseInt(timerTimeAr[0])*60*60 + parseInt(timerTimeAr[1])*60 + parseInt(timerTimeAr[2]);
        console.log(timerTime);
    }
    const timer = new NITimerLesson( timerEl, timerTime, function () {
    } );
    $(this).fadeOut();
    globalTestBlockIndex = 0;
    testEl.removeClass('hide');
    testEl.find('.main-test_questions-wrapper').hide();
    testEl.fadeIn();
    $(testEl.find('.main-test_questions-wrapper')[0]).show();

    // add EventListner for buttons on quiz
    // testEl.find('.previous-question').on( 'click', function () {
    //         $(testEl.find('.main-test_questions-wrapper')[globalTestBlockIndex]).hide();
    //         globalTestBlockIndex--;
    //         $(testEl.find('.main-test_questions-wrapper')[globalTestBlockIndex]).show();
    //         testEl.find('.main-test_questions-wrapper')[globalTestBlockIndex].scrollIntoView({ behavior: 'smooth', block: 'start'});
    // } );
    // testEl.find('.next-question').on( 'click', function () {
    //         $(testEl.find('.main-test_questions-wrapper')[globalTestBlockIndex]).hide();
    //         globalTestBlockIndex++;
    //         $(testEl.find('.main-test_questions-wrapper')[globalTestBlockIndex]).show();
    //         testEl.find('.main-test_questions-wrapper')[globalTestBlockIndex].scrollIntoView({ behavior: 'smooth', block: 'start'});
    // } );

    // testEl.find('.send-question_btn').on( 'click', function () {
    //         console.log(testForm);
    //         // console.log(validTest(testForm));
    //         testEl.find('form').click();
    //         // $('.test-result-overlay').css('display', 'flex');
    //         console.log('submit1');
    // } );
});

$('#main').on('click', '.send-question_btn, button', function(e){
    e.preventDefault();
    var testForm = $(this).parents('form');
    var el = testForm.find('input');
    var erroreArrayElemnts = [];
    for (var i = 0; i < el.length; i++){
        if (el[i].tagName === 'INPUT'){
            if($(el[i]).attr('type') == 'radio' || $(el[i]).attr('type') == 'text'){
                var name = el[i].getAttribute('name');
                if (document.querySelectorAll('[name=' + name + ']:checked').length === 0){
                    erroreArrayElemnts.push(el[i]);
                    $(el[i]).on('click', function () {
                        $(this).parents('.main-test_question-block').find('.error-block').hide();
                        $(this).parents('.main-test_question-block').removeClass('has-error');
                    })
                    $(el[i]).parents('.main-test_question-block').find('.error-block').show();
                    $(el[i]).parents('.main-test_question-block').addClass('has-error');
                }
            }
            else if($(el[i]).attr('type') == 'checkbox'){
                var name = el[i].getAttribute('name');
                if ($(el[i]).parents('.main-test_question-block').find('input:checked').length === 0){
                    erroreArrayElemnts.push(el[i]);
                    $(el[i]).on('click', function () {
                        $(this).parents('.main-test_question-block').find('.error-block').hide();
                        $(this).parents('.main-test_question-block').removeClass('has-error');
                    })
                    $(el[i]).parents('.main-test_question-block').find('.error-block').show();
                    $(el[i]).parents('.main-test_question-block').addClass('has-error');
                } 
            }
        }
    }
    document.querySelector('.closeMessage').addEventListener('click', function () {
        document.querySelector('.message-overlay').style.display = 'none';
    });
    $(document).mouseup(function (e) {
        var popup = $('.message-popup');
        if (e.target!=popup[0]&&popup.has(e.target).length === 0){
            $('.message-overlay').fadeOut();
        }
    });
    if(erroreArrayElemnts.length>0){
        console.log('Valid error');
        erroreArrayElemnts.sort(function(a, b){
            return parseInt($(a).parents('.main-test_question-block').offset().top)-parseInt($(b).parents('.main-test_question-block').offset().top)
        });
        $(erroreArrayElemnts[0]).parents('.main-test_question-block')[0].scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
    if (erroreArrayElemnts.length === 0) {
        $('body').addClass('submit');
        window.removeEventListener('beforeunload', beforeLoad);
        // document.querySelector('.message-overlay').style.display = 'flex';
        testForm.submit();
    }
});


/**
 * Test switch
 * Full list or step-by-step
 * */
// $('.test-switch').click(function(e) {
//     e.preventDefault();
//
//     if($('.step-by-step').is(':visible')) {
//         $('.step-by-step').hide();
//         $('.full-test').show();
//         $('.full-test').find('.main-test_questions-wrapper').show();
//     } else {
//         $('.step-by-step').show();
//         $('.full-test').hide();
//         $('.full-test').find('.main-test_questions-wrapper').hide();
//     }
// });



function doValidation( wrapper ) {
    /**
     * @variable nameArrays: array with names of all radio-inputs
     * @variable erroreArray: array with names of radio-inputs witch not-selected
     * @type {Array}
     */
    const nameArrays = [],
          erroreArray = [];
    Array.from($( wrapper[0] ).find('.radio_container input[type="radio"]')).forEach( (v) => {
        let name = $(v).attr('name');
        nameArrays.indexOf( name ) == -1 ?
            nameArrays.push( name ) :
            false;
    } );

    nameArrays.forEach( v => {
        $('[name='+v+']:checked').length > 0 ?
            console.log( v, 'true' ) :
            erroreArray.push(v);
    } );

    if( erroreArray.length > 0 ) {
        erroreArray.forEach( v => {
            $($( 'input[name="'+v+'"]' )[0]).parents('.main-test_question-wrapper').find('.input-radio-error').remove();
            $($( 'input[name="'+v+'"]' )[0]).parents('.main-test_question-wrapper').append('<p class="input-radio-error">Выберите ответ</p>');
            $( 'input[name="'+v+'"]').on('change', function () {
                $(this).parents('.main-test_question-wrapper').children('.input-radio-error').last().remove();
            });
        } )
        return false;
    }
    else {

        return true;
    }
}