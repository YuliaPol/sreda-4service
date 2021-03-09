jQuery(function ($) {
    $(document).ready(function () {
        // Restricts input for the set of matched elements to the given inputFilterTime function.
        $.fn.inputFilterTime = function(inputFilterTime) {
            return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
                if (inputFilterTime(this.value) && this.value.length<3) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                    } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                    } else {
                    this.value = "";
                }
            });
        };
        
        //Upload image as test answer
        $('.content-container').on('change', '.test-answer', function (e) {
                let elemId = $(this).attr('id'),
                arr = elemId.split("_");
                arr[0] = "answer";
            if (this.files[0]) { // если выбрали файл
                $('#' + arr.join('_')).val(this.files[0].name);
                var reader = new FileReader();
                reader.onload = function(e) {
                    var image = '<div class="img-answer" style="background-image: url(' + e.target.result +'); padding-bottom: 60px;"></div>'
                    if($('#' + arr.join('_')).next('.preview-img').length>0){
                        $('#' + arr.join('_')).next('.preview-img').html(image);
                    }
                    else {
                        $('<div class="preview-img">'+ image + '</div>').insertAfter('#' + arr.join('_'));
                    }
                };
                reader.readAsDataURL(e.target.files[0]);
                $(this).parents('.input-group').css("padding-bottom", "60px");
            }
        });

        $('.content-container').on('change', '.question-picture', function (e) {
            let elemId = $(this).attr('id');
            let chapterId = elemId.split('_')[1];
            let questionId = elemId.split('_')[2];
            var thisEl = this;
            if (this.files[0]) {
                $('#question_' + chapterId + '_' + questionId).val(this.files[0].name);
                var reader = new FileReader();
                reader.onload = function(e) {
                    if($(thisEl).parents('.custom-table__cell').find('.preview-img').length==0){
                        var prevImage = '<div class="preview-img preview-img-question"></div>';
                        $(prevImage).appendTo($(thisEl).parents('.custom-table__cell'));
                    }
                    var image = '<div class="img-answer" style="background-image: url(' + e.target.result +'); padding-bottom: 60px;"></div>'
                    $(thisEl).parents('.custom-table__cell').find('.preview-img').html(image);
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        $('.vacancy-settings').on('change', '.field-certificationtest-time_limit select', function(e){
            if($(this).find("option[data-myoption=true]:selected").length>0){
                if($(this).parent().find('.mytime').length==0){
                    var  mytime = 
                    '<div class="mytime">'
                    +'    <input type="text" class="mytime__minute" name="mytimeMinute" id="mytimeMinute"> '
                    +'  <div>:</div> '
                    +'  <input type="text" class="mytime__second" name="mytimeSeconds" id="mytimeSeconds" value="00">'
                    +'</div>';
                    $(mytime).appendTo($(this).parent());
                    $(this).parent().find('.mytime .mytime__minute').focus();
                }
                $(this).parent().find('.mytime').fadeIn();
                $(this).parent().find('.mytime input').inputFilterTime(function(value) {
                    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 99);
                });
            }
            else {
                $(this).parents('.vac-test__descr').find('.mytime').remove();
            }
        });

        $('.vacancy-settings').on('input keydown keyup mousedown mouseup select contextmenu drop', '.mytime input', function(e){
            let minute = parseInt($(this).parents('.mytime').find('.mytime__minute').val());
            let seconds = parseInt($(this).parents('.mytime').find('.mytime__second').val());
            if(!minute) {
                minute = 0;
            }
            if(!seconds) {
                seconds = 0;
            }
            let myvalue = minute + ':' + seconds;
            $(this).parents('.vac-test__descr').find('.field-certificationtest-time_limit select option[data-myoption=true]').val(myvalue);
        });

        // //drag question
        $('.test-table-constructor .test-quetions-wrappper').sortable(
            {
                appendTo: ".test-quetions-wrappper",
                cancel: ".title, .circle-add, input, select, label",
                axis: "y",
                items: "> .custom-table__edit-row",
                deactivate: function (event, ui) {
                    RefreshQuestionCostructor(event);
                }
            }
        );
        $('.test-table-constructor .custom-table__body .test-quetions-wrappper .custom-table__edit-row').draggable({
            cursor: "move",
            connectToSortable: ".test-quetions-wrappper",
            containment: '.test-edit-constructor',
            cancel: ".title, .circle-add, input, select, label",
            stop: function( event, ui ) {
                let el = $(event.target);
                el.width('auto');
                el.height('auto');
                el.css('top', 'auto');
                el.css('left', 'auto');
                let chapterIdOld = el.find('.input-cont-constructor-test .input-shdw').attr('name').split('_')[1];
                let chapterIdNew = $(el.parents('.custom-table__body')[0]).find('.title .input-shdw').attr('name').split('_')[1];
                if(chapterIdOld !== chapterIdNew) {
                    changeChapterId(chapterIdNew, el);
                }
                RefreshQuestionCostructor(event);
            }
        });
        function changeChapterId(chapterIdNew, element){
            if($(element).find('.title span').next('.answer').length>0){
                prevName = $(element).find('.title span').next('.answer').attr('name').split("_");
                prevName[1] = chapterIdNew;
                newName = prevName.join('_');
                $(element).find('.title span').next('.answer').attr('name', newName);
                $(element).find('.title span').next('.answer').attr('id', newName);
            }
            var inputs = $(element).find('input');
            inputs.each(function (index, input) {
                prevName = $(input).attr('name').split("_");
                prevName[1] = chapterIdNew;
                newName = prevName.join('_');
                $(input).attr('name', newName);
                $(input).attr('id', newName);
            });
            var labels = $(element).find('label');
            labels.each(function (index, label) {
                if($(label).attr('for')){
                    prevName = $(label).attr('for').split("_");
                    prevName[1] = chapterIdNew;
                    newName = prevName.join('_');
                    $(label).attr('for', newName);
                }
            });
            var Selects = $(element).find('select');
            Selects.each(function (index, select) {
                prevName = $(select).attr('name').split("_");
                prevName[1] = chapterIdNew;
                newName = prevName.join('_');
                $(select).attr('name', newName);
                $(select).attr('id', newName);
            });
            var Links = $(element).find('.add-questions-item');
            Links.each(function (index, link) {
                $(link).attr('data-section', chapterIdNew);
            });
            var Links = $(element).find('.add-questions-item-check');
            Links.each(function (index, link) {
                $(link).attr('data-section', chapterIdNew);
            });
        }

        function RefreshQuestionCostructor(event) {
            if($(event.target).parents('.test-table-constructor').parents('.lesson-info').length>0){
                if($(event.target)){
                    var questions = 0;
                    var Sections = $(event.target).parents('.test-table-constructor').find('.custom-table__body');
                    Sections.each(function (index, section) {
                        questions = 0;
                        var Questions = $(section).find('.test-quetions-wrappper').children();
                        Questions.each(function (index, element) {
                            var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                            if (numbers[1]) {
                                questions++;
                                numbers[1] = questions;
                                $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                            }
                            var Links = $(element).find('.add-questions-item');
                            Links.each(function (index, link) {
                                $(link).attr('data-question', questions);
                            });

                            var Links2 = $(element).find('.add-questions-item-check');
                            Links2.each(function (index, link) {
                                $(link).attr('data-question', questions);
                            });

                        });
                    });
                }
            }
            else {
                if($(event.target)){
                    var questions = 0;
                    var Sections = $(event.target).parents('.test-table-constructor').find('.custom-table__body');
                    let sectionOrder = 1;
                    Sections.each(function (index, section) {
                        questions = 0;
                        var Questions = $(section).find('.test-quetions-wrappper').children();
                        Questions.each(function (index, element) {
                            var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                            if (numbers[1]) {
                                questions++;
                                numbers[1] = questions;
                                numbers[0] = sectionOrder;
                                $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                            }
                            if($(element).find('.question-order').length > 0){
                                $(element).find('.question-order').val(questions);
                            }
                            var Links = $(element).find('.add-questions-item');
                            Links.each(function (index, link) {
                                $(link).attr('data-question', questions);
                            });

                            var Links2 = $(element).find('.add-questions-item-check');
                            Links2.each(function (index, link) {
                                $(link).attr('data-question', questions);
                            });
                        });
                        sectionOrder ++;
                    });
                }
            }
        }
        $('.test-table-constructor select').customSelect();
        //add  questions item (radio)
        $('.content-container').on('click', '.add-questions-item', function () {
            var section = $(this).attr('data-section');
            var question = $(this).attr('data-question');
            var item = 1 + parseInt($(this).attr('data-item'));
            var thisEl = this;
            var chapterId = $(this).parents('.custom-table__edit-row').find('.input-cont-constructor-test input').attr('name').split('_')[1];
            var questionId = $(this).parents('.custom-table__edit-row').find('.input-cont-constructor-test input').attr('name').split('_')[2];
            // var itemID = Math.floor(Math.random() * 100000);
            // addItemCourseTest(section, question, item, thisEl, chapterId, questionId, itemID);

            if(questionId){
                // var itemID = Math.floor(Math.random() * 100000000) ;
                // addItemCourseTest(section, question, item, thisEl, chapterId, questionId, itemID);
                $.ajax ({
                    type: 'POST',
                    url: "/corporate/ajax/create-test-item",
                    dataType: "json",
                    data: {
                        question_id: questionId,
                    },
                }).done(function (data) {
                    console.log(data);
                    var itemID = parseInt(data);
                    addItemCourseTest(section, question, item, thisEl, chapterId, questionId, itemID);
                    console.log('Создан ответ');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
        });
        function addItemCourseTest(section, question, item, thisEl, chapterId, questionId, itemId){
            var newItem =
            '<li class="test-radio">' +
            '    <div class="test-radio__answer"></div>' +
            '    <label>' +
            '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="answer_' + chapterId + '_' + questionId + '_' + itemId + '" id="answer_' + chapterId + '_' + questionId + '_' + itemId + '">' +
            '    </label>' +
            '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired"  name="score_' + chapterId + '_' + questionId + '_' + itemId + '" id="score_' + chapterId + '_' + questionId + '_' + itemId + '">' +
            '</li>';
            var newInputfile = 
            '<div class="upload-answer">'+
            '    <div class="input-group">'+
            '        <input id="file-name_' + chapterId + '_' + questionId + '_' + itemId + '" type="file" name="file-name_' + chapterId + '_' + questionId + '_' + itemId + '" class="test-answer">'+
            '        <label for="file-name_' + chapterId + '_' + questionId + '_' + itemId + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '    </div>'+
            '    <a href="#" title="Delete" class="delete-test-questions-item">'+
            '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '    </a>'+
            '</div>';
            $(thisEl).attr('data-item', item);
            $(newItem).appendTo($(thisEl).parents('.custom-table__cell').find('.custom-table-test-list'));
            // $(newItem).insertBefore($(this));
            $(newInputfile).appendTo($(thisEl).parents('.custom-table__cell').next('.custom-table__cell'));
        }
        //add  questions item (check)
        $('.content-container').on('click', '.add-questions-item-check', function () {
            var section = $(this).attr('data-section');
            var question = $(this).attr('data-question');
            var item = 1 + parseInt($(this).attr('data-item'));
            var thisEl = this;
            var chapterId = $(this).parents('.custom-table__edit-row').find('.input-cont-constructor-test input').attr('name').split('_')[1];
            var questionId = $(this).parents('.custom-table__edit-row').find('.input-cont-constructor-test input').attr('name').split('_')[2];
            if(questionId){
                // var itemID = Math.floor(Math.random() * 100000000) ;
                // addItemCheckCourse(section,question, item, thisEl, chapterId, questionId, itemID);
                $.ajax ({
                    type: 'POST',
                    url: "/corporate/ajax/create-test-item",
                    dataType: "json",
                    data: {
                        question_id: questionId,
                    },
                }).done(function (data) {
                    console.log(data);
                    var itemID = parseInt(data);
                    addItemCheckCourse(section,question, item, thisEl, chapterId, questionId, itemID);
                    console.log('Создан ответ');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
        });

        function addItemCheckCourse(section,question, item, thisEl, chapterId, questionId, itemId){
            var newItem =
            '<li class="test-radio">' +
            '    <div class="test-radio__answer"></div>' +
            '    <label>' +
            '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + chapterId + '_' + questionId + '_' + itemId + '" id="answer_' + chapterId + '_' + questionId + '_' + itemId + '">' +
            '    </label>' +
            '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + chapterId + '_' + questionId + '_' + itemId + '" id="score_' + chapterId + '_' + questionId + '_' + itemId + '">' +
            '</li>';
            var newInputfile = 
            '<div class="upload-answer">'+
            '    <div class="input-group">'+
            '        <input id="file-name_' + chapterId + '_' + questionId + '_' + itemId + '" type="file" name="file-name_' + chapterId + '_' + questionId + '_' + itemId + '" class="test-answer">'+
            '        <label for="file-name_' + chapterId + '_' + questionId + '_' + itemId + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '    </div>'+
            '    <a href="#" title="Delete" class="delete-test-questions-item">'+
            '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '    </a>'+
            '</div>';
            $(thisEl).attr('data-item', item);
            $(newItem).appendTo($(thisEl).parents('.custom-table__cell').find('.custom-table-test-list'));
            $(newInputfile).appendTo($(thisEl).parents('.custom-table__cell').next('.custom-table__cell'));   
        }
        //add  question
        $('.content-container').on('click', '.add-chapter-question', function () {
            var section = $(this).attr('data-section');
            // var question = 1 + parseInt($(this).attr('data-question'));
            var question = 1 + $(this).parent('.custom-table__body').find('.custom-table__edit-row').length;
            var newQuestion;
            var idChapter = $(this).parents('.custom-table__body').find('.title.add-chapter .answer').attr('name').split('_')[1];
            var thisEl = this;

            // var qustionId = Math.floor(Math.random() * 10000);
            // var item = [Math.floor(Math.random() * 10000) , Math.floor(Math.random() * 10000)];
            // addQuestionTestCourse(section, idChapter, question, item, qustionId, thisEl);

            if(idChapter){

                // let qustionId = Math.floor(Math.random() * 100000000) ;
                // let item = [1,2];
                // item[0] = Math.floor(Math.random() * 100000000) ;
                // item[1] = Math.floor(Math.random() * 100000000) ;
                // addQuestionTestCourse(section, idChapter, question, item, qustionId, thisEl);

                $.ajax ({
                    type: 'POST',
                    url: "/corporate/ajax/create-test-question",
                    dataType: "json",
                    data: {
                        chapter_id: idChapter
                    },
                }).done(function (data) {
                    let qustionId = parseInt(data[0]);
                    let item = [1,2];
                    if(data[1]){
                        item[0] = data[1]
                    }
                    if(data[1]){
                        item[1] = data[2]
                    }
                    addQuestionTestCourse(section, idChapter, question, item, qustionId, thisEl);
                    console.log('Создан вопрос');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }

        });

        function addQuestionTestCourse(section, chaterId, question, items, qustionId, thisEl){
            newQuestion =
            '<div class="custom-table__row custom-table__edit-row flex j-s-b">' +
            '    <div class="custom-table__cell">' +
            '        <div class="input-group">' +
            '            <div class="input-cont-constructor-test">' +
            '            <span>' + section + '/' + question + '.</span>' +
            '            <input type="text" placeholder="Введите ваш вопрос" data-reqired="reqired" class="input-shdw" id="question_' + chaterId + '_' + qustionId + '" name="question_' + chaterId + '_' + qustionId + '">' +
            '            <div class="input-file-question">'+
            '               <div class="input-group">'+
            '                   <input id="questionFile_' + chaterId + '_' + qustionId + '" type="file"'+
            '                       name="questionFile_' + chaterId + '_' + qustionId + '" class="question-picture">'+
            '                   <label for="questionFile_' + chaterId + '_' + qustionId + '">'+
            '                       <img class="upload-image"'+
            '                           src="../../../img/corp/icons/download-arrow_blue.png">'+
            '                   </label>'+
            '               </div>'+
            '           </div>'+
            '            </div>' +
            '            <p class="alert-error" style="display: none;">Заполните, пожалуйста, поле..</p>' +
            '            <input type="hidden" class="question-order" id="questionorder_' + chaterId + '_' + qustionId + '" name="questionorder_'+ chaterId + '_' + qustionId + '" value="'+ question + '">' +
            '        </div>' +
            '        <div class="input-group">' +
            '            <input type="text" placeholder="Описание вопроса (необязательно)" class="input-shdw"  id="questionDesc_' + chaterId + '_' + qustionId + '" name="questionDesc_' + chaterId + '_' + qustionId + '">' +
            '        </div>' +
            '    </div>' +
            '    <div class="custom-table__cell">' +
            '        <select id="questiontype_' + chaterId + '_' + qustionId + '" name="questiontype_' + chaterId + '_' + qustionId + '">' +
            '            <option value="0" selected>Один из списка</option>' +
            '            <option value="1">Множественный выбор</option>' +
            '            <option value="2">Шкала</option>' +
            '            <option value="3">Закрытый "Да\Нет"</option>' +
            // '            <option value="4">Открытый вопрос</option>' +
            '        </select>' +
            '    </div>' +
            '    <div class="custom-table__cell">' +
            '    <ul class="custom-table-test-list">'+
            '        <li class="test-radio">' +
            '            <div class="test-radio__answer"></div>' +
            '            <label>' +
            '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired" name="answer_' + chaterId + '_' + qustionId + '_'+ items[0] +'" id="answer_' + chaterId + '_' + qustionId + '_'+ items[0] +'" placeholder="Введите вариант ответа">' +
            '            </label>' +
            '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + chaterId + '_' + qustionId + '_'+ items[0] +'" id="score_' + chaterId + '_' + qustionId + '_'+ items[0] +'">' +
            '        </li>' +
            '        <li class="test-radio">' +
            '            <div class="test-radio__answer"></div>' +
            '            <label>' +
            '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired"  name="answer_' + chaterId + '_' + qustionId + '_'+ items[1] +'" id="answer_' + chaterId + '_' + qustionId + '_'+ items[1] +'" placeholder="Введите вариант ответа">' +
            '            </label>' +
            '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + chaterId + '_' + qustionId + '_'+ items[1] +'" id="score_' + chaterId + '_' + qustionId + '_'+ items[1] +'">' +
            '        </li>' +
            '        </ul>' +
            '        <a href="#" class="circle-add add-answer add-questions-item" data-section="' + section + '" data-question="' + qustionId + '" data-item="2">+</a>' +
            '    </div>' +
            '     <div class="custom-table__cell">' +
            '       <div class="upload-answer">'+
            '           <div class="input-group">'+
            '                <input id="file-name_' + chaterId + '_' + qustionId + '_'+ items[0] +'" type="file" name="file-name_' + chaterId + '_' + qustionId + '_'+ items[0] +'" class="test-answer">'+
            '               <label for="file-name_' + chaterId + '_' + qustionId + '_'+ items[0] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '           </div>'+
            '            <a href="#" title="Delete" class="delete-test-questions-item">'+
            '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '            </a>'+
            '       </div>' +
            '       <div class="upload-answer">'+
            '            <div class="input-group">'+
            '                <input id="file-name_' + chaterId + '_' + qustionId + '_'+ items[1] +'" type="file" name="file-name_' + chaterId + '_' + qustionId + '_'+ items[1] +'" class="test-answer">'+
            '               <label for="file-name_' + chaterId + '_' + qustionId + '_'+ items[1] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '           </div>'+
            '            <a href="#" title="Delete" class="delete-test-questions-item">'+
            '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '            </a>'+
            '       </div>' +
            '    </div>' +
            '    <div class="custom-table__cell">' +
            '        <a href="#" title="Delete" class="delete-sections-question">' +
            '            <img src="../../../img/corp/icons/trash.png" alt="Delete">' +
            '        </a>' +
            '        <a href="#" title="Move"  class="move-question">' +
            '            <img src="../../../img/corp/icons/movetest.png" alt="Move">' +
            '        </a>' +
            '    </div>' +
            '</div>';
            // $(newQuestion).insertBefore($(thisEl));
            $(newQuestion).appendTo($(thisEl).prev('.test-quetions-wrappper'));
            $(thisEl).attr('data-question', question);
            $('.test-table-constructor select').customSelect();
            // if(question == 1 ){
            //     console.log(question);
            $('.test-table-constructor .custom-table__body .test-quetions-wrappper').sortable(
                {
                    appendTo: ".test-quetions-wrappper",
                    cancel: ".title, .circle-add, input, select, label",
                    axis: "y",
                    items: "> .custom-table__edit-row",
                    deactivate: function (event, ui) {
                        RefreshQuestionCostructor(event);
                    }
                }
            );

            $('.test-table-constructor .custom-table__body .test-quetions-wrappper .custom-table__edit-row').draggable({
                cursor: "move",
                connectToSortable: ".test-quetions-wrappper",
                containment: '.test-edit-constructor',
                cancel: ".title, .circle-add, input, select, label",
                stop: function( event, ui ) {
                    let el = $(event.target);
                    el.width('auto');
                    el.height('auto');
                    el.css('top', 'auto');
                    el.css('left', 'auto');
                    let chapterIdOld = el.find('.input-cont-constructor-test .input-shdw').attr('name').split('_')[1];
                    let chapterIdNew = $(el.parents('.custom-table__body')[0]).find('.title .input-shdw').attr('name').split('_')[1];
                    if(chapterIdOld !== chapterIdNew) {
                        changeChapterId(chapterIdNew, el);
                    }
                    RefreshQuestionCostructor(event);
                }
            });
            // }
        }
        //delete question item
        $('.content-container').on('click', '.delete-test-questions-item', function () {
            if($(this).data('id')){
                $('#remove-course-popup .submit-remove-course').data('id', $(this).data('id'));
            }
            $('#remove-course-popup .submit-remove-course').data('type','question-item');
            $('#remove-course-popup .submit-remove-course').data('childId',$(this).parents('.upload-answer').find('.test-answer').attr('id'));
            $('#remove-course-popup h3').html('Вы действительно хотите удалить варианта ответа?');
            $.magnificPopup.open({
                items: [
                    {
                        src: '#remove-course-popup'
                    }
                ]
            });
        });
        
        //delete-chapter
        $('.content-container').on('click', '.delete-chapter', function () {
            if($(this).data('id')){
                $('#remove-course-popup .submit-remove-course').data('id', $(this).data('id'));
            }
            $('#remove-course-popup .submit-remove-course').data('type','chapter');
            $('#remove-course-popup .submit-remove-course').data('childId',$(this).parents('.custom-table__row').find('.title .input-shdw').attr('id'));
            if($(this).parents('.custom-table__row').find('.title input').val().length > 0) {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить раздел «' + $(this).parents('.custom-table__row').find('.title input').val() + '» ?');
            }
            else {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить раздел?');
            }
            $.magnificPopup.open({
                items: [
                    {
                        src: '#remove-course-popup'
                    }
                ]
            });
        });
        //delete-question
        $('.content-container').on('click', '.delete-sections-question', function () {
            if($(this).data('id')){
                $('#remove-course-popup .submit-remove-course').data('id', $(this).data('id'));
            }
            $('#remove-course-popup .submit-remove-course').data('type','sectionsQuestion');
            $('#remove-course-popup .submit-remove-course').data('childId',$(this).parents('.custom-table__row').find('.input-cont-constructor-test .input-shdw').attr('id'));
            if($(this).parents('.custom-table__row').find('.input-cont-constructor-test input').val().length > 0) {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить вопрос «' + $(this).parents('.custom-table__row').find('.input-cont-constructor-test input').val() + '» ?');
            }
            else {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить вопрос?');
            }
            $.magnificPopup.open({
                items: [
                    {
                        src: '#remove-course-popup'
                    }
                ]
            });
            // if (confirm("Вы уверены что хотите удалить вопрос?")) {
            //     var nextElements = $(this).parents('.custom-table__row').nextAll();
            //     nextElements.each(function (index, element) {
            //         var inputs = $(element).find('input');
            //         inputs.each(function (index, input) {
            //             prevName = $(input).attr('name').split("_");
            //             prevName[2] = prevName[2] - 1;
            //             newName = prevName.join('_');
            //             $(input).attr('name', newName);
            //             $(input).attr('id', newName);
            //         });
            //         var labels = $(element).find('label');
            //         labels.each(function (index, label) {
            //             if($(label).attr('for')){
            //                 prevName = $(label).attr('for').split("_");
            //                 prevName[2] = prevName[2] - 1;
            //                 newName = prevName.join('_');
            //                 $(label).attr('for', newName);
            //             }
            //         });
            //         var Selects = $(element).find('select');
            //         Selects.each(function (index, select) {
            //             prevName = $(select).attr('name').split("_");
            //             prevName[2] = prevName[2] - 1;
            //             newName = prevName.join('_');
            //             $(select).attr('name', newName);
            //             $(select).attr('id', newName);
            //         });
            //         var Links = $(element).find('.add-questions-item');
            //         Links.each(function (index, link) {
            //             question = -1 + parseInt($(link).attr('data-question'));
            //             $(link).attr('data-question', question);
            //         });
            //         var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
            //         if (numbers[1]) {
            //             numbers[1] = parseInt(numbers[1]) - 1;
            //             $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
            //         }
            //         if (element.hasAttribute('data-question')) {
            //             question = -1 + parseInt($(element).attr('data-question'));
            //             $(element).attr('data-question', question);
            //             return false;
            //         }
            //     });
            //     $(this).parents('.custom-table__row').remove();
            // }
        });
        $('.content-container').on('click', '.add-chapter-constructor', function () {
            var section = $(this).parents('.custom-table__body').find('.add-chapter-question').attr('data-question');
            // var chapterId = Math.floor(Math.random() * 10000);
            var thidEl = this;
            var testId = $(this).parents('.vacancy-settings').find('.test-id').val();
            // addNewChapterTestCourse(chapterId, thidEl, Math.floor(Math.random() * 100000));
            console.log(testId);
            if(testId){
                $.ajax ({
                    type: 'POST',
                    url: "/corporate/ajax/create-test-chapter-course",
                    dataType: "json",
                    data: {
                        id: testId
                    },
                }).done(function (data) {
                    console.log(data);
                    var chapterId = data;
                    addNewChapterTestCourse(chapterId, thidEl, section);
                    console.log('Добавлен раздел');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
        });

        function addNewChapterTestCourse(chapterId, thidEl, section){
            var newChapter =
            '<div class="custom-table__body">' +
            '    <div class="custom-table__row flex j-s-b">' +
            '        <h4 class="title add-chapter">' +
            '            <a href="#" class="circle-add add-chapter-constructor">' +
            '                <img src="../../../img/corp/icons/chapter-img02.png" alt="">' +
            '             </a>' +
            '             <div class="title">' +
            '               <span>Раздел ' + section + ': </span>' +
            '               <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="«Название»" id="chapter_' + chapterId + '_' + section + '" name="chapter_' + chapterId  + '_' + section + '">' +
            '              </div>' +
            '              <div class="delete-chapter-cont">' +
            '               <a href="#" title="Delete" class="delete-chapter">' +
            '                   <img src="../../../img/corp/icons/trash.png" alt="Delete">' +
            '               </a>' +
            '                <a href="#" title="Move" class="move-chapter">'+
            '                   <img src="../../../img/corp/icons/movetest.png" alt="Move">'+
            '               </a>'+
            '              </div>' +
            '         </h4>' +
            '    </div>' +
            '   <div class="test-quetions-wrappper"></div>'+
            '    <a href="#" class="circle-add add-chapter-question" data-section="' + section + '" data-question="0">+</a>' +
            '</div>';
            $(newChapter).insertAfter($(thidEl).parents('.custom-table__body'));
            section = 1;
            var Sections = $('.test-table-constructor').find('.custom-table__body');
            $('.test-table-constructor').sortable(
                {
                    appendTo: ".test-table-constructor",
                    cancel: ".circle-add, input, select, label, .delete-chapter",
                    axis: "y",
                    items: "> .custom-table__body",
                    deactivate: function (event, ui) {
                        RefreshOnStart();
                    }
                }
            );
            RefreshOnSections(Sections);
            // Sections.each(function (index, section_el) {
            //     var Questions = $(section_el).children();
            //     Questions.each(function (index, element) {
            //         if ($(element).find('.title span')) {
            //             $(element).find('.title span').text('Раздел ' + section + ': ');
            //         }
            //         var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
            //         if (numbers[0]) {
            //             numbers[0] = section;
            //             $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
            //         }
            //         // var inputs = $(element).find('input');
            //         // inputs.each(function (index, input) {
            //         //     prevName = $(input).attr('name').split("_");
            //         //     prevName[1] = section;
            //         //     newName = prevName.join('_');
            //         //     $(input).attr('name', newName);
            //         //     $(input).attr('id', newName);
            //         // });
            //         // var labels = $(element).find('label');
            //         // labels.each(function (index, label) {
            //         //     if($(label).attr('for')){
            //         //         prevName = $(label).attr('for').split("_");
            //         //         prevName[1] = section;
            //         //         newName = prevName.join('_');
            //         //         $(label).attr('for', newName);
            //         //     }
            //         // });
            //         // var Selects = $(element).find('select');
            //         // Selects.each(function (index, select) {
            //         //     prevName = $(select).attr('name').split("_");
            //         //     prevName[1] = section;
            //         //     newName = prevName.join('_');
            //         //     $(select).attr('name', newName);
            //         //     $(select).attr('id', newName);
            //         // });
            //         var Links = $(element).find('.add-questions-item');
            //         Links.each(function (index, link) {
            //             $(link).attr('data-section', section);
            //         });
            //         var Links2 = $(element).find('.add-questions-item-check');
            //         Links2.each(function (index, link) {
            //             $(link).attr('data-section', section);
            //         });
            //     });
            //     var Links = $(section_el).find('.add-chapter-question');
            //     Links.each(function (index, link) {
            //         $(link).attr('data-section', section);
            //     });
            //     section++;
            // });
        }
        $('.test-table-constructor').sortable(
            {
                appendTo: ".test-table-constructor",
                cancel: ".circle-add, input, select, label, .delete-chapter",
                axis: "y",
                items: "> .custom-table__body",
                deactivate: function (event, ui) {
                    RefreshOnStart();
                }
            }
        );
        
        // select type of questions
        $('.content-container').on('change', '.custom-table__row .custom-table__cell:nth-child(2) select', function () {
            var nameQuestion = $(this).attr('name').split('_');
            var newInputfile;
            var section;
            var question;
            if (nameQuestion[1] && nameQuestion[2]){
                section = nameQuestion[1];
                question = nameQuestion[2];
                var chapterId = nameQuestion[1];
                var qustionId = nameQuestion[2];
                var thisEl = this;
                var type = $(this).val();
                if(qustionId, type){
                    $.ajax ({
                        type: 'POST',
                        url: "/corporate/ajax/change-test-type",
                        dataType: "json",
                        data: {
                            id: qustionId,
                            type: type,
                        },
                    }).done(function (data) {
                        console.log(data);
                        var items = [1,2];
                        if(data[1]){
                            items[0] = data[0]
                        }
                        if(data[1]){
                            items[1] = data[1]
                        }
                        changeTypeQuestionCourseTest(section,question,items, chapterId, qustionId, thisEl);
                        console.log('Изменен тип вопроса');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }
                // var items = [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]
            }
        });
        function changeTypeQuestionCourseTest(section,question,items, chapterId, qustionId, thisEl){
            var newQuestion;
            if ($(thisEl).val() == 0)
            {
                newQuestion =
                    '<ul class="custom-table-test-list">'+
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer"></div>' +
                    '    <label>' +
                    '        <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + chapterId + '_' + qustionId + '_'+ items[0] +'" id="answer_' + chapterId + '_' + qustionId + '_'+ items[0] +'">' +
                    '    </label>' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + chapterId + '_' + qustionId + '_'+ items[0] +'" id="score_' + chapterId + '_' + qustionId + '_'+ items[0] +'">' +
                    '</li>' +
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer"></div>' +
                    '    <label>' +
                    '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="answer_' + chapterId + '_' + qustionId + '_'+ items[1] +'" id="answer_' + chapterId + '_' + qustionId + '_'+ items[1] +'">' +
                    '    </label>' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + chapterId + '_' + qustionId + '_'+ items[1] +'" id="score_' + chapterId + '_' + qustionId + '_'+ items[1] +'">' +
                    '</li>' +
                    '</ul>' +
                    '<a href="#" class="circle-add add-answer add-questions-item" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                    newInputfile = 
                    '       <div class="upload-answer">'+
                    '           <div class="input-group">'+
                    '                <input id="file-name_' + chapterId + '_' + qustionId + '_'+ items[0] +'" type="file" name="file-name_' + chapterId + '_' + qustionId + '_'+ items[0] +'" class="test-answer">'+
                    '               <label for="file-name_' + chapterId + '_' + qustionId + '_'+ items[0] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '            <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '            </a>'+
                    '       </div>' +
                    '       <div class="upload-answer">'+
                    '            <div class="input-group">'+
                    '                <input id="file-name_' + chapterId + '_' + qustionId + '_'+ items[1] +'" type="file" name="file-name_' + chapterId + '_' + qustionId + '_'+ items[1] +'" class="test-answer">'+
                    '               <label for="file-name_' + chapterId + '_' + qustionId + '_'+ items[1] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '        <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '            <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '        </a>'+
                    '       </div>';
            }
            if ($(thisEl).val() == 1) {
                newQuestion =
                    '<ul class="custom-table-test-list">'+
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer"></div>' +
                    '    <label>' +
                    '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + chapterId + '_' + qustionId + '_'+ items[0] +'" id="answer_' + chapterId + '_' + qustionId + '_'+ items[0] +'">' +
                    '    </label>' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + chapterId + '_' + qustionId + '_'+ items[0] +'" id="score_' + chapterId + '_' + qustionId + '_'+ items[0] +'">' +
                    '</li>' +
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer"></div>' +
                    '    <label>' +
                    '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + chapterId + '_' + qustionId + '_'+ items[1] +'" id="answer_' + chapterId + '_' + qustionId + '_'+ items[1] +'">' +
                    '    </label>' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + chapterId + '_' + qustionId + '_'+ items[1] +'" id="score_' + chapterId + '_' + qustionId + '_'+ items[1] +'">' +
                    '</li>' +
                    '</ul>'+
                    '<a href="#" class="circle-add add-answer add-questions-item-check" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                    newInputfile = 
                    '       <div class="upload-answer">'+
                    '           <div class="input-group">'+
                    '                <input id="file-name_' + chapterId + '_' + qustionId + '_'+ items[0] +'" type="file" name="file-name_' + chapterId + '_' + qustionId + '_'+ items[0] +'" class="test-answer">'+
                    '               <label for="file-name_' + chapterId + '_' + qustionId + '_'+ items[0] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '               <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '            </a>'+
                    '       </div>' +
                    '       <div class="upload-answer">'+
                    '            <div class="input-group">'+
                    '                <input id="file-name_' + chapterId + '_' + qustionId + '_'+ items[1] +'" type="file" name="file-name_' + chapterId + '_' + qustionId + '_'+ items[1] +'" class="test-answer">'+
                    '               <label for="file-name_' + chapterId + '_' + qustionId + '_'+ items[1] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '              <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '           </a>'+
                    '       </div>';
            }
            if ($(thisEl).val() == 2) {
                newQuestion =
                    '<div class="input-group test-scale">' +
                    '    <span>От <input type="number" min="1" max="10" value="1" name="answer_' + chapterId + '_' + qustionId + '_'+ items[0] +'" id="answer_' + chapterId + '_' + qustionId + '_'+ items[0] +'"></span>' +
                    '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + chapterId + '_' + qustionId + '_'+ items[0] +'" id="questionScaleDesc_' + chapterId + '_' + qustionId + '_'+ items[0] +'">' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" data-reqired="reqired" name="score_' + chapterId + '_' + qustionId + '_'+ items[0] +'" id="score_' + chapterId + '_' + qustionId + '_'+ items[0] +'">' +
                    '</div>' +
                    '<div class="input-group test-scale">' +
                    '    <span>До <input type="number" min="1" max="10" value="10" name="answer_' + chapterId + '_' + qustionId + '_'+ items[1] +'" id="answer_' + chapterId + '_' + qustionId + '_'+ items[1] +'"></span>' +
                    '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + chapterId + '_' + qustionId + '_'+ items[1] +'" id="questionScaleDesc_' + chapterId + '_' + qustionId + '_'+ items[1] +'">' +
                    '    <input class="scores input-shdw" type="text" data-reqired="reqired" value="10" name="score_' + chapterId + '_' + qustionId + '_'+ items[1] +'" id="score_' + chapterId + '_' + qustionId + '_'+ items[1] +'">' +
                    '</div>';
                    newInputfile = ' ';
            }
            if ($(thisEl).val() == 3) {
                newQuestion =
                    '<ul class="custom-table-test-list">'+
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer answer-yes_not"><span class="answer">Да</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="0" name="score_' + chapterId + '_' + qustionId + '_'+ items[0] +'" id="score_' + chapterId + '_' + qustionId + '_'+ items[0] +'"></div>' +
                    '</li>' +
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer answer-yes_not"><span class="answer">Нет</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="100" name="score_' + chapterId + '_' + qustionId + '_'+ items[1] +'" id="score_' + chapterId + '_' + qustionId + '_'+ items[1] +'"></div>' +
                    '</li>'+
                    '</ul>';
                    newInputfile = ' ';
            }
            if ($(thisEl).val() == 4) {
                newQuestion =
                    '<div class="input-group">' +
                    '    <label>' +
                    '        <select id="answer_' + chapterId + '_' + qustionId + '"'+
                    '            name="answer_' + chapterId + '_' + qustionId + '" style="display: none;" class="input-shdw answer open-question">'+
                    '            <option value="0" selected>15+ символов</option>'+
                    '            <option value="1">20+ символов</option>'+
                    '            <option value="2">50+ символов</option>'+
                    '        </select>'+
                    '    </label>' +
                    '</div>';
                    newInputfile = '';
            }
            if (newQuestion) {
                $(thisEl).parents('.custom-table__cell').next('.custom-table__cell').html(newQuestion);
                if(newInputfile) {
                    $(thisEl).parents('.custom-table__cell').next('.custom-table__cell').next('.custom-table__cell').html(newInputfile);
                }
                else {
                    $(thisEl).parents('.custom-table__cell').next('.custom-table__cell').next('.custom-table__cell').html(' ');
                }
                $('.custom-table__edit-row .open-question').customSelect();
            }
        }
        // delete question
        $('.submit-remove-course').click(function(){
            var childId = $(this).data('childId');
            if($(this).data('type') =='question-item') {
                var itemId = childId.split("_")[3];
                var removeElement = 0;
                var itemElements = $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.custom-table-test-list .test-radio');
                itemElements.each(function (index, itemElement) {
                    if(parseInt($(itemElement).find('.answer').attr('name').split("_")[3])==itemId && removeElement == 0){
                        $(itemElement).remove();
                        removeElement = 1;
                    }
                });
                var fileElements = $('#' + childId).parents('.custom-table__cell').find('.upload-answer');
                removeElement = 0;
                fileElements.each(function (index, fileElement) {
                    if(parseInt($(fileElement).find('.test-answer').attr('name').split("_")[3])==itemId && removeElement == 0){
                        $(fileElement).remove();
                        removeElement = 1;
                    }                  
                });
                var item = -1 + parseInt( $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.add-questions-item').attr('data-item'));
                $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.add-questions-item').attr('data-item', item);

                console.log('itemId: '+ itemId);
                if(itemId) {
                    $.ajax ({
                        type: 'POST',
                        url: "/corporate/ajax/remove-test-item",
                        dataType: "json",
                        data: {
                            id: itemId,
                        },
                    }).done(function (data) {
                        console.log(data);
                        console.log('Удален ответ вопроса теста');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }

            }
            if($(this).data('type') == 'sectionsQuestion'){
                var parents = $('#' + childId).parents('.custom-table__row');
                var itemId = $('#' + childId).parents('.custom-table__row').find('.input-cont-constructor-test input').attr('name').split('_')[2];
                var nextElements = parents.nextAll();
                console.log(nextElements);
                nextElements.each(function (index, element) {
                    var Links = $(element).find('.add-questions-item');
                    Links.each(function (index, link) {
                        question = -1 + parseInt($(link).attr('data-question'));
                        $(link).attr('data-question', question);
                    });
                    var Links2 = $(element).find('.add-questions-item-check');
                    Links2.each(function (index, link) {
                        question = -1 + parseInt($(link).attr('data-question'));
                        $(link).attr('data-question', question);
                    });
                    var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                    if (numbers[1]) {
                        numbers[1] = parseInt(numbers[1]) - 1;
                        $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                    }
                    if (element.hasAttribute('data-question')) {
                        question = -1 + parseInt($(element).attr('data-question'));
                        $(element).attr('data-question', question);
                        return false;
                    }
                    if ($(element).find('.question-order')) {
                        $(element).find('.question-order').val(++index);
                    }
                });
                $('#' + childId).parents('.custom-table__row').remove();
                console.log(itemId);
                if(itemId) {
                    $.ajax ({
                        type: 'POST',
                        url: "/corporate/ajax/remove-test-question",
                        dataType: "json",
                        data: {
                            id: itemId,
                        },
                    }).done(function (data) {
                        console.log(data);
                        console.log('Удален вопрос теста');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }
            }
            if($(this).data('type') == 'chapter') {
                section = 1;
                var parents = $('#' + childId).parents('.custom-table__body');
                var chapterId = parents.find('.add-chapter .title input').attr('name').split('_')[1];
                $('#' + childId).parents('.custom-table__body').remove();

                var Sections = $('.test-table-constructor').find('.custom-table__body');
                RefreshOnSections(Sections);
                // Sections.each(function (index, section_el) {
                //     var Questions = $(section_el).children();
                //     Questions.each(function (index, element) {
                //         if ($(element).find('.title span')) {
                //             $(element).find('.title span').text('Раздел ' + section + ': ');
                //         }
                //         var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                //         if (numbers[0]) {
                //             numbers[0] = section;
                //             $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                //         }
                //         // var inputs = $(element).find('input');
                //         // inputs.each(function (index, input) {
                //         //     prevName = $(input).attr('name').split("_");
                //         //     prevName[1] = section;
                //         //     newName = prevName.join('_');
                //         //     $(input).attr('name', newName);
                //         //     $(input).attr('id', newName);
                //         // });
                //         // var labels = $(element).find('label');
                //         // labels.each(function (index, label) {
                //         //     if($(label).attr('for')){
                //         //         prevName = $(label).attr('for').split("_");
                //         //         prevName[1] = section;
                //         //         newName = prevName.join('_');
                //         //         $(label).attr('for', newName);
                //         //     }
                //         // });
                //         // var Selects = $(element).find('select');
                //         // Selects.each(function (index, select) {
                //         //     prevName = $(select).attr('name').split("_");
                //         //     prevName[1] = section;
                //         //     newName = prevName.join('_');
                //         //     $(select).attr('name', newName);
                //         //     $(select).attr('id', newName);
                //         // });
                //         var Links = $(element).find('.add-questions-item');
                //         Links.each(function (index, link) {
                //             $(link).attr('data-section', section);
                //         });
                //         var Links2 = $(element).find('.add-questions-item-check');
                //         Links2.each(function (index, link) {
                //             $(link).attr('data-section', section);
                //         });
                //     });
                //     var Links = $(section_el).find('.add-chapter-question');
                //     Links.each(function (index, link) {
                //         $(link).attr('data-section', section);
                //     });
                //     section++;
                // });
                console.log(chapterId);
                if(chapterId){
                    $.ajax ({
                        type: 'POST',
                        url: "/corporate/ajax/remove-test-chapter",
                        dataType: "json",
                        data: {
                            id: chapterId,
                        },
                    }).done(function (data) {
                        console.log(data);
                        console.log('Удален раздел теста');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }

            }
        });
        RefreshOnStart();
        function RefreshOnStart(){
            var Tests = $('.test-table-constructor');
            if(Tests.length>0){
                Tests.each(function (index, test) {
                    var Sections = $(test).find('.custom-table__body');
                    RefreshOnSections(Sections);
                });
            }
        }
        function RefreshOnSections(Sections){
            var sectionOrder = 1;
            Sections.each(function (index, section) {
                questions = 0;
                var Questions = $(section).find('.custom-table__row');
                if($(section).find('.add-chapter-question').length>0){
                    $(section).find('.add-chapter-question').attr('data-section', sectionOrder);
                }
                Questions.each(function (index, element) {
                    if ($(element).find('.title span')) {
                        $(element).find('.title span').text('Раздел ' + sectionOrder + ': ');
                    }
                    if($(element).find('.title span').next('.answer').length>0){
                        var prevName = $(element).find('.title span').next('.answer').attr('name').split("_");
                        if(prevName.length==3){
                            prevName[2] = sectionOrder;
                        }
                        else {
                            prevName.push(sectionOrder);
                        }
                        var newName = prevName.join('_');
                        $(element).find('.title span').next('.answer').attr('name', newName);
                        $(element).find('.title span').next('.answer').attr('id', newName);
                    }
                    if($(element).hasClass('custom-table__edit-row')){
                        if($(element).find('.add-questions-item')){
                            $(element).find('.add-questions-item').attr('data-section', sectionOrder);
                        }
                        var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                        if (numbers[1]) {
                            questions++;
                            numbers[1] = questions;
                            numbers[0] = sectionOrder;
                            $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                        }
                        else {
                            questions++;
                            numbers[1] = questions;
                            numbers[0] = sectionOrder;
                            $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                        }
                        if($(element).find('.question-order').length>0){
                            $(element).find('.question-order').val(questions);
                        }
                        var Links = $(element).find('.add-questions-item');
                        Links.each(function (index, link) {
                            $(link).attr('data-question', questions);
                        });
                        var Links = $(element).find('.add-questions-item-check');
                        Links.each(function (index, link) {
                            $(link).attr('data-question', questions);
                        });
                    }
                });
                sectionOrder++;
            });
            if(Sections.length==1){
                Sections.find('.delete-chapter').fadeOut(0);
            }
            else {
                Sections.find('.delete-chapter').fadeIn(0);
            }
        }
    });
});