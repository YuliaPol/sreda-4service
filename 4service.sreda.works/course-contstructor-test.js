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
        //hide move Question
        // $('.test-edit-constructor .move-question').fadeOut(0);
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


        $('.vacancy-settings .mytime input').inputFilterTime(function(value) {
            return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 99);
        });


        $('.vacancy-settings').on('change', '.limit-time-test', function(e){
            if($(this).find("option[data-myoption=true]:selected").length>0){
                if($(this).parent().find('.mytime').length==0){
                    var blockId= $(this).attr('name').split('_')[1];
                    var lessonId= $(this).attr('name').split('_')[2];
                    var  mytime = 
                    '<div class="mytime">'
                    +'    <input type="text" class="mytime__minute" name="mytimeMinute_'+ blockId +'_'+ lessonId +'" id="mytimeMinute_'+ blockId +'_'+ lessonId +'"> '
                    +'  <div>:</div> '
                    +'  <input type="text" class="mytime__second" name="mytimeSeconds_'+ blockId +'_'+ lessonId +'" id="mytimeSeconds_'+ blockId +'_'+ lessonId +'" value="00">'
                    +'</div>';
                    $(mytime).appendTo($(this).parent());
                    $(this).parent().find('.mytime .mytime__minute').focus();
                }
                $(this).parent().find('.mytime').fadeIn();
                $(this).parent().find('.mytime input').inputFilterTime(function(value) {
                    return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 99);
                });
                // $(this).parent().find('.mytime').mask("Mm:Pp");
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
            $(this).parents('.vac-test__descr').find('.limit-time-test option[data-myoption=true]').val(myvalue);
        });

        
        // //drag question
        $('.test-table-constructor .custom-table__body').sortable(
            {
                appendTo: ".custom-table__body",
                cancel: ".title, .circle-add, input, select, label",
                axis: "y",
                items: "> .custom-table__edit-row",
                deactivate: function (event, ui) {
                    RefreshQuestionCostructor(event);
                }
            }
        );
        //drag chapter
        $('.test-table-constructor').sortable(
            {
                appendTo: ".test-table-constructor",
                cancel: ".circle-add, input, select, label",
                axis: "y",
                items: "> .custom-table__body",
                deactivate: function (event, ui) {
                    RefreshOnStart();
                }
            }
        );

        // $('.test-table-constructor .custom-table__body .custom-table__edit-row').draggable({
        //     cursor: "move",
        //     connectToSortable: ".custom-table__body",
        //     containment: '.test-edit-constructor',
        //     cancel: ".title, .circle-add, input, select, label",
        //     stop: function( event, ui ) {
        //         let el = $(event.target);
        //         el.width('auto');
        //         el.height('auto');
        //         el.css('top', 'auto');
        //         el.css('left', 'auto');
        //         let chapterIdOld = el.find('.input-cont-constructor-test .input-shdw').attr('name').split('_')[3];
        //         let chapterIdNew = $(el.parents('.custom-table__body')[0]).find('.title .input-shdw').attr('name').split('_')[3];
        //         if(chapterIdOld !== chapterIdNew) {
        //             changeChapterId(chapterIdNew, el);
        //         }
        //         RefreshQuestionCostructor(event);
        //     }
        // });
        function changeChapterId(chapterIdNew, element){
            if($(element).find('.title span').next('.answer').length>0){
                prevName = $(element).find('.title span').next('.answer').attr('name').split("_");
                prevName[3] = chapterIdNew;
                newName = prevName.join('_');
                $(element).find('.title span').next('.answer').attr('name', newName);
                $(element).find('.title span').next('.answer').attr('id', newName);
            }
            var inputs = $(element).find('input');
            inputs.each(function (index, input) {
                prevName = $(input).attr('name').split("_");
                prevName[3] = chapterIdNew;
                newName = prevName.join('_');
                $(input).attr('name', newName);
                $(input).attr('id', newName);
            });
            var labels = $(element).find('label');
            labels.each(function (index, label) {
                if($(label).attr('for')){
                    prevName = $(label).attr('for').split("_");
                    prevName[3] = chapterIdNew;
                    newName = prevName.join('_');
                    $(label).attr('for', newName);
                }
            });
            var Selects = $(element).find('select');
            Selects.each(function (index, select) {
                prevName = $(select).attr('name').split("_");
                prevName[3] = chapterIdNew;
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
                var Questions = $(section).children();
                Questions.each(function (index, element) {
                    if ($(element).find('.title span')) {
                        $(element).find('.title span').text('Раздел ' + sectionOrder + ': ');
                    }

                    if($(element).find('.title span').next('.answer').length>0){
                        var prevName = $(element).find('.title span').next('.answer').attr('name').split("_");
                        if(prevName.length==5){
                            prevName[4] = sectionOrder;
                        }
                        else {
                            prevName.push(sectionOrder);
                        }
                        var newName = prevName.join('_');
                        $(element).find('.title span').next('.answer').attr('name', newName);
                        $(element).find('.title span').next('.answer').attr('id', newName);
                    }
                    if($(element).hasClass('add-chapter-question')){
                        $(element).attr('data-section', sectionOrder);
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
        function RefreshQuestionCostructor(event) {
            if($(event.target).parents('.test-table-constructor').parents('.lesson-info').length>0){
                if($(event.target)){
                    var questions = 0;
                    var Sections = $(event.target).parents('.test-table-constructor').find('.custom-table__body');
                    RefreshOnSections(Sections);
                }
            }
        }
        $('.test-table-constructor select').customSelect();
        //add  questions item (radio)
        $('.content-container').on('click', '.add-questions-item', function () {
            var section = $(this).attr('data-section');
            var chapterId = $(this).parents('.custom-table__edit-row').parent('.custom-table__body').find('.title .answer').attr('name').split('_')[3];
            var question = $(this).attr('data-question');
            // var questionId = $(this).parents('.custom-table__edit-row').find('.input-cont-constructor-test .input-shdw').attr('name').split('_')[4];
            // var item = 1 + parseInt($(this).attr('data-item'));
            var item = 1 + $(this).prev('ul').find('li').length;
            var block = parseInt($(this).attr('data-block'));
            var blockItem = parseInt($(this).attr('data-blockitem'));
            if(block && blockItem){
                var thisEl = this;
                // var quetionId = $(this).parents('.custom-table__edit-row').find('.input-cont-constructor-test .input-shdw').attr('name').split('_')[4];
                var questionId = $(this).parents('.custom-table__row.custom-table__edit-row').find('.delete-sections-question').data('item');
                // addQuestionsItemAjax(section, question, item, block, blockItem, thisEl, 850, chapterId, questionId);

                if(questionId){
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
                        addQuestionsItemAjax(section, question, item, block, blockItem, thisEl, itemID, chapterId, questionId);
                        console.log('Создан блок');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }

            }
            else {
                var newItem =
                '<li class="test-radio">' +
                '    <div class="test-radio__answer"></div>' +
                '    <label>' +
                '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="answer_' + section + '_' + question + '_' + item + '" id="answer_' + section + '_' + question + '_' + item + '">' +
                '    </label>' +
                '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired"  name="score_' + section + '_' + question + '_' + item + '" id="score_' + section + '_' + question + '_' + item + '">' +
                '</li>';
            var newInputfile = 
            '<div class="upload-answer">'+
            '    <div class="input-group">'+
            '        <input id="filename_' + section + '_' + question + '_' + item + '" type="file" name="filename_' + section + '_' + question + '_' + item + '" class="test-answer">'+
            '        <label for="filename_' + section + '_' + question + '_' + item + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '    </div>'+
            '    <a href="#" title="Delete" class="delete-test-questions-item">'+
            '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '    </a>'+
            '</div>';
            $(this).attr('data-item', item);
            $(newItem).appendTo($(this).parents('.custom-table__cell').find('.custom-table-test-list'));
            // $(newItem).insertBefore($(this));
            $(newInputfile).appendTo($(this).parents('.custom-table__cell').next('.custom-table__cell'));
            }
        });

        function addQuestionsItemAjax(section, question, item, block, blockItem, thisEl, itemID, chapterId, quetionId){
            var newItem =
            '<li class="test-radio">' +
            '    <div class="test-radio__answer"></div>' +
            '    <label>' +
            '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="answer_'+ block + '_' + blockItem + '_' + chapterId + '_' + quetionId + '_' + itemID + '" id="answer_'+ block + '_' + blockItem + '_' + chapterId + '_' + quetionId + '_' + itemID + '">' +
            '    </label>' +
            '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired"  name="score_'+ block + '_' + blockItem + '_' + chapterId + '_' + quetionId + '_' + itemID + '" id="score_'+ block + '_' + blockItem + '_' + chapterId + '_' + quetionId + '_' + itemID + '">' +
            '</li>';
            var newInputfile = 
            '<div class="upload-answer">'+
            '    <div class="input-group">'+
            '        <input id="filename_'+ block + '_' + blockItem + '_' + chapterId + '_' + quetionId + '_' + itemID + '" type="file" name="filename_'+ block + '_' + blockItem + '_' + chapterId + '_' + quetionId + '_' + itemID + '" class="test-answer">'+
            '        <label for="filename_'+ block + '_' + blockItem + '_' + chapterId + '_' + quetionId + '_' + itemID + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '    </div>'+
            '    <a href="#" title="Delete" class="delete-test-questions-item" data-item="' + itemID + '">'+
            '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '    </a>'+
            '</div>';
            $(thisEl).attr('data-item', item);
            $(newItem).appendTo($(thisEl).parents('.custom-table__cell').find('.custom-table-test-list'));
            // $(newItem).insertBefore($(this));
            $(newInputfile).appendTo($(thisEl).parents('.custom-table__cell').next('.custom-table__cell'));


            // var itemElements = $(thisEl).parents('.custom-table__cell').find('.custom-table-test-list .test-radio');
            // var itemIndex = 1;
            // itemElements.each(function (index, itemElement) {
            //     var prevName = $(itemElement).find('.answer').attr('name').split("_");
            //     prevName[5] = itemIndex;
            //     newName = prevName.join('_');
            //     $(itemElement).find('.answer').attr('id', newName);
            //     $(itemElement).find('.answer').attr('name', newName);

            //     var prevName = $(itemElement).find('.scores').attr('name').split("_");
            //     prevName[5] = itemIndex;
            //     newName = prevName.join('_');
            //     $(itemElement).find('.scores').attr('id', newName);
            //     $(itemElement).find('.scores').attr('name', newName);

            //     itemIndex++;
            // });
            // itemIndex = 1;
            // var fileElements = $(thisEl).parents('.custom-table__cell').next('.custom-table__cell').find('.upload-answer');
            // removeElement = 0;
            // fileElements.each(function (index, fileElement) {
            //     var prevName = $(fileElement).find('.test-answer').attr('name').split("_");
            //     prevName[5] = itemIndex;
            //     newName = prevName.join('_');
            //     $(fileElement).find('.test-answer').attr('id', newName);
            //     $(fileElement).find('.test-answer').attr('name', newName);

            //     var prevName = $(fileElement).find('label').attr('for').split("_");
            //     prevName[5] = itemIndex;
            //     newName = prevName.join('_');
            //     $(fileElement).find('label').attr('for', newName);
            //     itemIndex++;
            // });
            
        }
        //add  questions item (check)
        $('.content-container').on('click', '.add-questions-item-check', function () {
            var section = $(this).attr('data-section');
            var chapterId = $(this).parents('.custom-table__edit-row').parent('.custom-table__body').find('.title .answer').attr('name').split('_')[3];
            var question = $(this).attr('data-question');
            var item = 1 + $(this).prev('ul').find('li').length;
            var block = parseInt($(this).attr('data-block'));
            var blockItem = parseInt($(this).attr('data-blockitem'));
            if(block && blockItem){
                var thisEl = this;
                var questionId = $(this).parents('.custom-table__row.custom-table__edit-row').find('.delete-sections-question').data('item');
                // AddAjaxItemCheck(section, question, item, block, blockItem, thisEl, 850, chapterId, questionId);
                if(questionId){
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
                        AddAjaxItemCheck(section, question, item, block, blockItem, thisEl, itemID, chapterId, questionId);
                        console.log('Создан блок');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }

            }
            else {
                var newItem =
                '<li class="test-radio">' +
                '    <div class="test-radio__answer"></div>' +
                '    <label>' +
                '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + section + '_' + question + '_' + item + '" id="answer_' + section + '_' + question + '_' + item + '">' +
                '    </label>' +
                '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + section + '_' + question + '_' + item + '" id="score_' + section + '_' + question + '_' + item + '">' +
                '</li>';
                var newInputfile = 
                '<div class="upload-answer">'+
                '    <div class="input-group">'+
                '        <input id="filename_' + section + '_' + question + '_' + item + '" type="file" name="filename_' + section + '_' + question + '_' + item + '" class="test-answer">'+
                '        <label for="filename_' + section + '_' + question + '_' + item + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                '    </div>'+
                '    <a href="#" title="Delete" class="delete-test-questions-item">'+
                '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                '    </a>'+
                '</div>';
                $(this).attr('data-item', item);
                $(newItem).appendTo($(this).parents('.custom-table__cell').find('.custom-table-test-list'));
                $(newInputfile).appendTo($(this).parents('.custom-table__cell').next('.custom-table__cell'));
            }
        });

        function AddAjaxItemCheck(section, question, item, block, blockItem, thisEl, itemID, chapterId, questionId){
            var newItem =
            '<li class="test-radio">' +
            '    <div class="test-radio__answer"></div>' +
            '    <label>' +
            '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_'+ block + '_' + blockItem + '_' + chapterId + '_' + questionId + '_' + itemID + '" id="answer_'+ block + '_' + blockItem + '_'  + chapterId + '_' + questionId + '_' + itemID + '">' +
            '    </label>' +
            '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_'+ block + '_' + blockItem + '_' + chapterId + '_' + questionId + '_' + itemID + '" id="score_'+ block + '_' + blockItem + '_'  + chapterId + '_' + questionId + '_' + itemID + '">' +
            '</li>';
            var newInputfile = 
            '<div class="upload-answer">'+
            '    <div class="input-group">'+
            '        <input id="filename_'+ block + '_' + blockItem + '_'  + chapterId + '_' + questionId + '_' + itemID + '" type="file" name="filename_'+ block + '_' + blockItem + '_'  + chapterId + '_' + questionId + '_' + itemID + '" class="test-answer">'+
            '        <label for="filename_'+ block + '_' + blockItem + '_'  + chapterId + '_' + questionId + '_' + itemID + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '    </div>'+
            '    <a href="#" title="Delete" class="delete-test-questions-item" data-item="' + itemID + '">'+
            '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '    </a>'+
            '</div>';
            $(thisEl).attr('data-item', item);
            $(newItem).appendTo($(thisEl).parents('.custom-table__cell').find('.custom-table-test-list'));
            $(newInputfile).appendTo($(thisEl).parents('.custom-table__cell').next('.custom-table__cell'));
        }
        //add picture to question
        $('.content-container').on('change', '.question-picture', function (e) {
            let elemId = $(this).attr('id');
            let blockId = elemId.split('_')[1];
            let lessonId = elemId.split('_')[2];
            let chapterId = elemId.split('_')[3];
            let questionId = elemId.split('_')[4];
            var thisEl = this;
            if (this.files[0]) {
                $('#question_' + blockId + '_' + lessonId + '_' + chapterId + '_' + questionId).val(this.files[0].name);
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
        //add  question
        $('.content-container').on('click', '.add-chapter-question', function () {
            var section = $(this).attr('data-section');
            var chapterId = $(this).parent('.custom-table__body').find('.title .answer').attr('name').split('_')[3];
            // var question = 1 + parseInt($(this).attr('data-question'));
            var question = 1 + $(this).parent('.custom-table__body').find('.custom-table__edit-row').length;
            var block = parseInt($(this).attr('data-block'));
            var blockItem = parseInt($(this).attr('data-blockitem'));
            var newQuestion;
            if(!block && !blockItem && $(this).parents('.question-item-cont').length>0) {
                block = $(this).parents('.question-item-cont').find('.lesson-wrap .lesson-name').attr('name').split('_')[1];
                blockItem = $(this).parents('.question-item-cont').find('.lesson-wrap .lesson-name').attr('name').split('_')[2];
            }
            if(section && question && block && blockItem ){
                var idChapter = $(this).parent('.custom-table__body').find('.delete-chapter-cont .delete-chapter').data('chapter');
                var thisEl = this;
                section = parseInt($(this).parent('.custom-table__body').find('.title span').html());
                console.log(section);
                // var item = [1,2];
                // AddTestsQuestionAjax(section,question, block, blockItem, thisEl, 150, chapterId, item);
                if(idChapter){
                    $.ajax ({
                        type: 'POST',
                        url: "/corporate/ajax/create-test-question",
                        dataType: "json",
                        data: {
                            chapter_id: idChapter
                        },
                    }).done(function (data) {
                        qustionId = parseInt(data[0]);
                        var item = [1,2];
                        if(data[1]){
                            item[0] = data[1]
                        }
                        if(data[1]){
                            item[1] = data[2]
                        }
                        AddTestsQuestionAjax(section,question, block, blockItem, thisEl, qustionId, chapterId, item);
                        console.log('Создан урок');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }
            } else if (section && question) {
                newQuestion =
                    '<div class="custom-table__row custom-table__edit-row flex j-s-b">' +
                    '    <div class="custom-table__cell">' +
                    '        <div class="input-group">' +
                    '            <div class="input-cont-constructor-test">' +
                    '            <span>' + section + '/' + question + '.</span>' +
                    '            <input type="text" placeholder="Введите ваш вопрос" data-reqired="reqired" class="input-shdw" id="question_' + section + '_' + question + '" name="question_' + section + '_' + question + '">' +
                    '            </div>' +
                    '            <p class="alert-error" style="display: none;">Заполните, пожалуйста, поле..</p>' +
                    '        </div>' +
                    '        <div class="input-group">' +
                    '            <input type="text" placeholder="Описание вопроса (необязательно)" class="input-shdw"  id="questiondescription_' + section + '_' + question + '" name="questiondescription_' + section + '_' + question + '">' +
                    '        </div>' +
                    '    </div>' +
                    '    <div class="custom-table__cell">' +
                    '        <select id="questiontype_' + section + '_' + question + '" name="questiontype_' + section + '_' + question + '">' +
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
                    '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired" name="answer_' + section + '_' + question + '_1" id="answer_' + section + '_' + question + '_1" placeholder="Введите вариант ответа">' +
                    '            </label>' +
                    '        </li>' +
                    '        <li class="test-radio">' +
                    '            <div class="test-radio__answer"></div>' +
                    '            <label>' +
                    '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired"  name="answer_' + section + '_' + question + '_2" id="answer_' + section + '_' + question + '_2" placeholder="Введите вариант ответа">' +
                    '            </label>' +
                    '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + section + '_' + question + '_2" id="score_' + section + '_' + question + '_2">' +
                    '        </li>' +
                    '        </ul>' +
                    '        <a href="#" class="circle-add add-answer add-questions-item" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>' +
                    '    </div>' +
                    '     <div class="custom-table__cell">' +
                    '       <div class="upload-answer">'+
                    '           <div class="input-group">'+
                    '                <input id="filename_' + section + '_' + question + '_1" type="file" name="filename_' + section + '_' + question + '_1" class="test-answer">'+
                    '               <label for="filename_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '            <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '            </a>'+
                    '       </div>' +
                    '       <div class="upload-answer">'+
                    '            <div class="input-group">'+
                    '                <input id="filename_' + section + '_' + question + '_2" type="file" name="filename_' + section + '_' + question + '_2" class="test-answer">'+
                    '               <label for="filename_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
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
                $(newQuestion).insertBefore($(this));
                $(this).attr('data-question', question);
                $('.test-table-constructor select').customSelect();
                // if(question == 1 ){
                //     $('.test-table-constructor .custom-table__body').sortable(
                //         {
                //             appendTo: ".custom-table__body",
                //             cancel: ".title, .circle-add, input, select, label",
                //             axis: "y",
                //             items: "> .custom-table__edit-row",
                //             deactivate: function (event, ui) {
                //                 RefreshQuestionCostructor(event);
                //             }
                //         }
                //     );
                // }
            }
        });

        function AddTestsQuestionAjax(section,question, block, blockItem, thisEl, qustionId, chapterId, item){
            newQuestion =
            '<div class="custom-table__row custom-table__edit-row flex j-s-b">' +
            '    <div class="custom-table__cell">' +
            '        <div class="input-group">' +
            '            <div class="input-cont-constructor-test">' +
            '            <span>' + section + '/' + question + '.</span>' +
            '            <input type="text" placeholder="Введите ваш вопрос" data-reqired="reqired" class="input-shdw" id="question_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '" name="question_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '">' +
            '            <div class="input-file-question">'+
            '               <div class="input-group">'+
            '                   <input id="questionFile_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '" type="file"'+
            '                       name="questionFile_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '" class="question-picture">'+
            '                   <label for="questionFile_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '">'+
            '                       <img class="upload-image"'+
            '                           src="../../../img/corp/icons/download-arrow_blue.png">'+
            '                   </label>'+
            '               </div>'+
            '           </div>'+
            '            </div>' +
            '            <p class="alert-error" style="display: none;">Заполните, пожалуйста, поле..</p>' +
            '            <input type="hidden" class="question-order" id="questionorder_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '" name="questionorder_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '" value="'+ question + '">' +
            '        </div>' +
            '        <div class="input-group">' +
            '            <input type="text" placeholder="Описание вопроса (необязательно)" class="input-shdw"  id="questiondescription_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '" name="questiondescription_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '">' +
            '        </div>' +
            '    </div>' +
            '    <div class="custom-table__cell">' +
            '        <select id="questiontype_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '" name="questiontype_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '">' +
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
            '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired" name="answer_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_'+ item[0] +'" '+
            '               id="answer_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_'+ item[0] +'" placeholder="Введите вариант ответа">' +
            '            </label>' +
            '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_'+ item[0] +'" '+
            '                id="score_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_'+ item[0] +'">' +
            '        </li>' +
            '        <li class="test-radio">' +
            '            <div class="test-radio__answer"></div>' +
            '            <label>' +
            '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired"  name="answer_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_' + item[1] + '" id="answer_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_' + item[1] + '" placeholder="Введите вариант ответа">' +
            '            </label>' +
            '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_' + item[1] + '" id="score_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_' + item[1] + '">' +
            '        </li>' +
            '        </ul>' +
            '        <a href="#" class="circle-add add-answer add-questions-item" data-block="' + block + '" data-blockitem="' + blockItem + '" data-section="' + section + '" data-question="' + question + '" data-item="0">+</a>' +
            '    </div>' +
            '     <div class="custom-table__cell">' +
            '       <div class="upload-answer">'+
            '           <div class="input-group">'+
            '                <input id="filename_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_'+ item[0] +'" type="file" name="filename_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_'+ item[0] +'" class="test-answer">'+
            '               <label for="filename_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_'+ item[0] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '           </div>'+
            '            <a href="#" title="Delete" class="delete-test-questions-item" data-item="' + item[0] + '">'+
            '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '            </a>'+
            '       </div>' +
            '       <div class="upload-answer">'+
            '            <div class="input-group">'+
            '                <input id="filename_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_' + item[1] + '" type="file" name="filename_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_' + item[1] + '" class="test-answer">'+
            '               <label for="filename_' + block + '_' + blockItem + '_' + chapterId + '_' + qustionId + '_' + item[1] + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '           </div>'+
            '            <a href="#" title="Delete" class="delete-test-questions-item"  data-item="' + item[1] + '">'+
            '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '            </a>'+
            '       </div>' +
            '    </div>' +
            '    <div class="custom-table__cell">' +
            '        <a href="#" title="Delete" class="delete-sections-question" data-item="'+ qustionId + '">' +
            '            <img src="../../../img/corp/icons/trash.png" alt="Delete">' +
            '        </a>' +
            '        <a href="#" title="Move"  class="move-question">' +
            '            <img src="../../../img/corp/icons/movetest.png" alt="Move">' +
            '        </a>' +
            '    </div>' +
            '</div>';
            $(newQuestion).insertBefore($(thisEl));
            $(thisEl).attr('data-question', question);
            $('.test-table-constructor select').customSelect();
            $('.test-table-constructor .custom-table__body').sortable(
                {
                    appendTo: ".custom-table__body",
                    cancel: ".title, .circle-add, input, select, label",
                    axis: "y",
                    items: "> .custom-table__edit-row",
                    deactivate: function (event, ui) {
                        RefreshQuestionCostructor(event);
                    }
                }
            );
            // $('.test-table-constructor .custom-table__body .custom-table__edit-row').draggable({
            //     cursor: "move",
            //     connectToSortable: ".custom-table__body",
            //     containment: '.test-edit-constructor',
            //     cancel: ".title, .circle-add, input, select, label",
            //     stop: function( event, ui ) {
            //         let el = $(event.target);
            //         el.width('auto');
            //         el.height('auto');
            //         el.css('top', 'auto');
            //         el.css('left', 'auto');
            //         let chapterIdOld = el.find('.input-cont-constructor-test .input-shdw').attr('name').split('_')[3];
            //         let chapterIdNew = $(el.parents('.custom-table__body')[0]).find('.title .input-shdw').attr('name').split('_')[3];
            //         if(chapterIdOld !== chapterIdNew) {
            //             changeChapterId(chapterIdNew, el);
            //         }
            //         RefreshQuestionCostructor(event);
            //     }
            // });
            RefreshOnStart();
        }

        //delete question item
        $('.content-container').on('click', '.delete-test-questions-item', function () {
            if($(this).data('item')){
                $('#remove-course-popup .submit-remove-course').data('item', $(this).data('item'));
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
            if($(this).data('chapter')){
                $('#remove-course-popup .submit-remove-course').data('chapter', $(this).data('chapter'));
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
            if($(this).data('item')){
                $('#remove-course-popup .submit-remove-course').data('item', $(this).data('item'));
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

        });
        $('.content-container').on('click', '.add-chapter-constructor', function () {
            var section = $(this).parents('.custom-table__body').find('.add-chapter-question').attr('data-question');
            // var block = parseInt($(this).attr('data-block'));
            // var blockItem = parseInt($(this).attr('data-blockitem'));
            var block = $(this).attr('data-block');
            var blockItem = $(this).attr('data-blockitem');

            // console.log(block);
            // console.log(blockItem);


            if(block && blockItem){
                var thisEl = this;
                // AddNewChapterAjax(block, blockItem, section, thisEl, Math.floor(Math.random() * 100000))
                $.ajax ({
                    type: 'POST',
                    url: "/corporate/ajax/create-test-chapter",
                    dataType: "json",
                    data: {
                        id: blockItem
                    },
                }).done(function (data) {
                    console.log(data);
                    chapterId = parseInt(data.chapter_id);
                    AddNewChapterAjax(block, blockItem, section, thisEl, chapterId)
                    console.log('Создан раздел теста');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
            else {
                var newChapter =
                '<div class="custom-table__body">' +
                '    <div class="custom-table__row flex j-s-b">' +
                '        <h4 class="title add-chapter">' +
                '            <a href="#" class="circle-add add-chapter-constructor">' +
                '                <img src="../../../img/corp/icons/chapter-img02.png" alt="">' +
                '             </a>' +
                '             <div class="title">' +
                '               <span>Раздел ' + section + ': </span>' +
                '               <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="«Название»" id="chapter_' + section + '" name="chapter_' + section + '">' +
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
                '    <a href="#" class="circle-add add-chapter-question" data-section="' + section + '" data-question="0">+</a>' +
                '</div>';
                $(newChapter).insertBefore($(this).parents('.custom-table__body'));
                section = 1;
                var Sections = $('.test-table-constructor').find('.custom-table__body');
                Sections.each(function (index, section_el) {
                    var Questions = $(section_el).children();
                    Questions.each(function (index, element) {
                        if ($(element).find('.title span')) {
                            $(element).find('.title span').text('Раздел ' + section + ': ');
                        }
                        var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                        if (numbers[0]) {
                            numbers[0] = section;
                            $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                        }
                        var inputs = $(element).find('input');
                        inputs.each(function (index, input) {
                            prevName = $(input).attr('name').split("_");
                            prevName[1] = section;
                            newName = prevName.join('_');
                            $(input).attr('name', newName);
                            $(input).attr('id', newName);
                        });
                        var labels = $(element).find('label');
                        labels.each(function (index, label) {
                            if($(label).attr('for')){
                                prevName = $(label).attr('for').split("_");
                                prevName[1] = section;
                                newName = prevName.join('_');
                                $(label).attr('for', newName);
                            }
                        });
                        var Selects = $(element).find('select');
                        Selects.each(function (index, select) {
                            prevName = $(select).attr('name').split("_");
                            prevName[1] = section;
                            newName = prevName.join('_');
                            $(select).attr('name', newName);
                            $(select).attr('id', newName);
                        });
                        var Links = $(element).find('.add-questions-item');
                        Links.each(function (index, link) {
                            $(link).attr('data-section', section);
                        });

                        var Links = $(element).find('.add-questions-item-check');
                        Links.each(function (index, link) {
                            $(link).attr('data-section', section);
                        });
                        
                    });
                    var Links = $(section_el).find('.add-chapter-question');
                    Links.each(function (index, link) {
                        $(link).attr('data-section', section);
                    });
                    section++;
                });
            }
            // $('.test-table-constructor .custom-table__body').sortable(
            //     {
            //         appendTo: ".custom-table__body",
            //         cancel: ".title, .circle-add, input, select, label",
            //         axis: "y",
            //         items: "> .custom-table__edit-row",
            //         deactivate: function (event, ui) {
            //             RefreshQuestionCostructor(event);
            //         }
            //     }
            // );
        });

        function AddNewChapterAjax(block, blockItem, section, thisEl, chapterId){
            var section = $(this).parents('.lesson-info .custom-table__body').find('.add-chapter-question').attr('data-question');
            if(!section) {
                section = 1;
            }
            var newChapter =
            '<div class="custom-table__body">' +
            '    <div class="custom-table__row flex j-s-b">' +
            '        <h4 class="title add-chapter">' +
            '            <a href="#" class="circle-add add-chapter-constructor" data-block="'+ block +'" data-blockitem="'+ blockItem +'">' +
            '                <img src="../../../img/corp/icons/chapter-img02.png" alt="">' +
            '             </a>' +
            '             <div class="title">' +
            '               <span>Раздел ' + section + ': </span>' +
            '               <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="«Название»" id="chapter_' + block + '_' + blockItem + '_' + chapterId + '_' + section +  '" name="chapter_' + block + '_' + blockItem + '_' + chapterId + '_' + section +  '">' +
            '              </div>' +
            '              <div class="delete-chapter-cont">' +
            '               <a href="#" title="Delete" class="delete-chapter" data-chapter="'+ chapterId + '">' +
            '                   <img src="../../../img/corp/icons/trash.png" alt="Delete">' +
            '               </a>' +
            '                <a href="#" title="Move" class="move-chapter">'+
            '                   <img src="../../../img/corp/icons/movetest.png" alt="Move">'+
            '               </a>'+
            '              </div>' +
            '         </h4>' +
            '    </div>' +
            '    <a href="#" class="circle-add add-chapter-question" data-block="'+ block +'" data-blockitem="'+ blockItem +'" data-section="' + section + '" data-question="0">+</a>' +
            '</div>';
            $(newChapter).insertAfter($(thisEl).parents('.lesson-info .custom-table__body'));
            section = 1;
            var parents = $(thisEl).parents('.lesson-info');
            if($(thisEl).parents('.lesson-info').find('.default-add-section').length>0){
                $(thisEl).parents('.lesson-info').find('.default-add-section').remove();
            }
            // var Sections = parents.find('.test-table-constructor').find('.custom-table__body');
            // RefreshOnSections(Sections)
            RefreshOnStart();
            //drag chapter
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
        }
        // select type of questions
        $('.content-container').on('change', '.custom-table__row .custom-table__cell:nth-child(2) select', function () {
            var nameQuestion = $(this).attr('name').split('_');
            var newInputfile;
            var section;
            var question;
            var block;
            var blockItem;
            if(nameQuestion[1] && nameQuestion[2]  && nameQuestion[3]  && nameQuestion[4]){
                section = nameQuestion[3];
                question = nameQuestion[4];
                block = nameQuestion[1];
                blockItem = nameQuestion[2];
                thisEl = this;
                items = [182, 245];
                var idQuestion = question;
                var type = $(this).val();
                if(idQuestion, type){
                    $.ajax ({
                        type: 'POST',
                        url: "/corporate/ajax/change-test-type",
                        dataType: "json",
                        data: {
                            id: idQuestion,
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
                        changeTypeOfQuestionAjax(block,blockItem,section, question, items, thisEl);
                        console.log('Изменен тип вопроса');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }
            }
            else if (nameQuestion[1] && nameQuestion[2]){
                section = nameQuestion[1];
                question = nameQuestion[2];
                var newQuestion;
                if ($(this).val() == 0)
                {
                    newQuestion =
                        '<ul class="custom-table-test-list">'+
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + section + '_' + question + '_1" id="answer_' + section + '_' + question + '_1">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + section + '_' + question + '_1" id="score_' + section + '_' + question + '_1">' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="answer_' + section + '_' + question + '_2" id="answer_' + section + '_' + question + '_2">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + section + '_' + question + '_2" id="score_' + section + '_' + question + '_2">' +
                        '</li>' +
                        '</ul>' +
                        '<a href="#" class="circle-add add-answer add-questions-item" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                        newInputfile = 
                        '       <div class="upload-answer">'+
                        '           <div class="input-group">'+
                        '                <input id="filename_' + section + '_' + question + '_1" type="file" name="filename_' + section + '_' + question + '_1" class="test-answer">'+
                        '               <label for="filename_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '            <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '            </a>'+
                        '       </div>' +
                        '       <div class="upload-answer">'+
                        '            <div class="input-group">'+
                        '                <input id="filename_' + section + '_' + question + '_2" type="file" name="filename_' + section + '_' + question + '_2" class="test-answer">'+
                        '               <label for="filename_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '        <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '            <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '        </a>'+
                        '       </div>';
                }
                if ($(this).val() == 1) {
                    newQuestion =
                        '<ul class="custom-table-test-list">'+
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + section + '_' + question + '_1" id="answer_' + section + '_' + question + '_1">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + section + '_' + question + '_1" id="score_' + section + '_' + question + '_1">' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + section + '_' + question + '_2" id="answer_' + section + '_' + question + '_2">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + section + '_' + question + '_2" id="score_' + section + '_' + question + '_2">' +
                        '</li>' +
                        '</ul>'+
                        '<a href="#" class="circle-add add-answer add-questions-item-check" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                        newInputfile = 
                        '       <div class="upload-answer">'+
                        '           <div class="input-group">'+
                        '                <input id="filename_' + section + '_' + question + '_1" type="file" name="filename_' + section + '_' + question + '_1" class="test-answer">'+
                        '               <label for="filename_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '               <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '            </a>'+
                        '       </div>' +
                        '       <div class="upload-answer">'+
                        '            <div class="input-group">'+
                        '                <input id="filename_' + section + '_' + question + '_2" type="file" name="filename_' + section + '_' + question + '_2" class="test-answer">'+
                        '               <label for="filename_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '              <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '           </a>'+
                        '       </div>';
                }
                if ($(this).val() == 2) {
                    newQuestion =
                        '<div class="input-group test-scale">' +
                        '    <span>От <input type="number" min="1" max="10" value="1" name="answer_' + section + '_' + question + '_1" id="answer_' + section + '_' + question + '_1"></span>' +
                        '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + section + '_' + question + '_1" id="questionScaleDesc_' + section + '_' + question + '_1">' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" data-reqired="reqired" name="score_' + section + '_' + question + '_1" id="score_' + section + '_' + question + '_1">' +
                        '</div>' +
                        '<div class="input-group test-scale">' +
                        '    <span>До <input type="number" min="1" max="10" value="10" name="answer_' + section + '_' + question + '_2" id="answer_' + section + '_' + question + '_2"></span>' +
                        '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + section + '_' + question + '_2" id="questionScaleDesc_' + section + '_' + question + '_2">' +
                        '    <input class="scores input-shdw" type="text" data-reqired="reqired" value="10" name="score_' + section + '_' + question + '_2" id="score_' + section + '_' + question + '_2">' +
                        '</div>';
                        newInputfile = ' ';
                }
                if ($(this).val() == 3) {
                    newQuestion =
                        '<ul class="custom-table-test-list">'+
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer answer-yes_not"><span class="answer">Да</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="0" name="score_' + section + '_' + question + '_1" id="score_' + section + '_' + question + '_1"></div>' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer answer-yes_not"><span class="answer">Нет</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="100" name="score_' + section + '_' + question + '_2" id="score_' + section + '_' + question + '_2"></div>' +
                        '</li>'+
                        '</ul>';
                        newInputfile = ' ';
                }
                if ($(this).val() == 4) {
                    newQuestion =
                        '<div class="input-group">' +
                        '    <label>' +
                        '        <select id="answer_' + section + '_' + question + '_1"'+
                        '            name="answer_' + section + '_' + question + '_1" style="display: none;" class="input-shdw answer open-question">'+
                        '            <option value="0" selected>15+ символов</option>'+
                        '            <option value="1">20+ символов</option>'+
                        '            <option value="2">50+ символов</option>'+
                        '        </select>'+
                        '    </label>' +
                        '</div>';
                        newInputfile = '';
                }
                if (newQuestion) {
                    $(this).parents('.custom-table__cell').next('.custom-table__cell').html(newQuestion);
                    if(newInputfile) {
                        $(this).parents('.custom-table__cell').next('.custom-table__cell').next('.custom-table__cell').html(newInputfile);
                    }
                    else {
                        $(this).parents('.custom-table__cell').next('.custom-table__cell').next('.custom-table__cell').html(' ');
                    }
                    $('.custom-table__edit-row .open-question').customSelect();
                }
            }
        });

        function changeTypeOfQuestionAjax(block,blockItem,section, question, items, thisEl){
            var newQuestion;
            var newInputfile;
            if ($(thisEl).val() == 0)
            {
                newQuestion =
                    '<ul class="custom-table-test-list">'+
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer"></div>' +
                    '    <label>' +
                    '        <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" id="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'">' +
                    '    </label>' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" id="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'">' +
                    '</li>' +
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer"></div>' +
                    '    <label>' +
                    '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="answer_'  + block + '_' + blockItem + '_'  + section + '_' + question + '_'+ items[1] +'" id="answer_'  + block + '_' + blockItem + '_'  + section + '_' + question + '_'+ items[1] +'">' +
                    '    </label>' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" id="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'">' +
                    '</li>' +
                    '</ul>' +
                    '<a href="#" class="circle-add add-answer add-questions-item" data-block="' + block + '" data-blockitem="' + blockItem + '" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                    newInputfile = 
                    '       <div class="upload-answer">'+
                    '           <div class="input-group">'+
                    '                <input id="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" type="file" name="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" class="test-answer">'+
                    '               <label for="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '            <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '            </a>'+
                    '       </div>' +
                    '       <div class="upload-answer">'+
                    '            <div class="input-group">'+
                    '                <input id="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" type="file" name="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" class="test-answer">'+
                    '               <label for="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
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
                    '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" id="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'">' +
                    '    </label>' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" id="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'">' +
                    '</li>' +
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer"></div>' +
                    '    <label>' +
                    '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" id="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'">' +
                    '    </label>' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" id="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'">' +
                    '</li>' +
                    '</ul>'+
                    '<a href="#" class="circle-add add-answer add-questions-item-check" data-block="' + block + '" data-blockitem="' + blockItem + '" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                    newInputfile = 
                    '       <div class="upload-answer">'+
                    '           <div class="input-group">'+
                    '                <input id="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" type="file" name="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" class="test-answer">'+
                    '               <label for="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '               <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '            </a>'+
                    '       </div>' +
                    '       <div class="upload-answer">'+
                    '            <div class="input-group">'+
                    '                <input id="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" type="file" name="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" class="test-answer">'+
                    '               <label for="filename_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '              <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '           </a>'+
                    '       </div>';
            }
            if ($(thisEl).val() == 2) {
                newQuestion =
                    '<div class="input-group test-scale">' +
                    '    <span>От <input type="number" min="1" max="10" value="1" name="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" id="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'"></span>' +
                    '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" id="questionScaleDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" name="questionScaleDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'">' +
                    '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" data-reqired="reqired" name="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" id="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'">' +
                    '</div>' +
                    '<div class="input-group test-scale">' +
                    '    <span>До <input type="number" min="1" max="10" value="10" name="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" id="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'"></span>' +
                    '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" id="questionScaleDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'">' +
                    '    <input class="scores input-shdw" type="text" data-reqired="reqired" value="10" name="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" id="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'">' +
                    '</div>';
                    newInputfile = ' ';
            }
            if ($(thisEl).val() == 3) {
                newQuestion =
                    '<ul class="custom-table-test-list">'+
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer answer-yes_not"><span class="answer">Да</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="0" name="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'" id="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'"></div>' +
                    '</li>' +
                    '<li class="test-radio">' +
                    '    <div class="test-radio__answer answer-yes_not"><span class="answer">Нет</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="100" name="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" id="score_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'"></div>' +
                    '</li>'+
                    '</ul>';
                    newInputfile = ' ';
            }
            if ($(thisEl).val() == 4) {
                newQuestion =
                    '<div class="input-group">' +
                    '    <label>' +
                    '        <select id="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[0] +'"'+
                    '            name="answer_' + block + '_' + blockItem + '_' + section + '_' + question + '_'+ items[1] +'" style="display: none;" class="input-shdw answer open-question">'+
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
                if($('#' + childId).parents('.lesson-info').length>0){
                    var itemId = childId.split("_")[5];
                    var removeElement = 0;
                    var itemElements = $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.custom-table-test-list .test-radio');
                    itemElements.each(function (index, itemElement) {
                        if(parseInt($(itemElement).find('.answer').attr('name').split("_")[5])==itemId && removeElement == 0){
                            $(itemElement).remove();
                            removeElement = 1;
                        }
                        // if(parseInt($(itemElement).find('.answer').attr('name').split("_")[5])>itemId){
                        //     var prevName = $(itemElement).find('.answer').attr('name').split("_");
                        //     prevName[5] = prevName[5] - 1;
                        //     newName = prevName.join('_');
                        //     $(itemElement).find('.answer').attr('id', newName);
                        //     $(itemElement).find('.answer').attr('name', newName);
                        //     var prevName = $(itemElement).find('.scores').attr('name').split("_");
                        //     prevName[5] = prevName[5] - 1;
                        //     newName = prevName.join('_');
                        //     $(itemElement).find('.scores').attr('id', newName);
                        //     $(itemElement).find('.scores').attr('name', newName);
                        // }
                    });
                    var fileElements = $('#' + childId).parents('.custom-table__cell').find('.upload-answer');
                    removeElement = 0;
                    fileElements.each(function (index, fileElement) {
                        if(parseInt($(fileElement).find('.test-answer').attr('name').split("_")[5])==itemId && removeElement == 0){
                            $(fileElement).remove();
                            removeElement = 1;
                        }
                        // if(parseInt($(fileElement).find('.test-answer').attr('name').split("_")[5])>itemId){
                        //     var prevName = $(fileElement).find('.test-answer').attr('name').split("_");
                        //     prevName[5] = prevName[5] - 1;
                        //     newName = prevName.join('_');
                        //     $(fileElement).find('.test-answer').attr('id', newName);
                        //     $(fileElement).find('.test-answer').attr('name', newName);
    
                        //     var prevName = $(fileElement).find('label').attr('for').split("_");
                        //     prevName[5] = prevName[5] - 1;
                        //     newName = prevName.join('_');
                        //     $(fileElement).find('label').attr('for', newName);
                        // }                    
                    });
                    
                    var item = -1 + parseInt( $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.add-questions-item').attr('data-item'));
                    $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.add-questions-item').attr('data-item', item);    

                    var itemId = $(this).data('item');
                    // var question_id = childId.split('_')[4];
                    // var item_order = childId.split('_')[5];
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
                else {
                    var itemId = childId.split("_")[3];
                    var removeElement = 0;
                    var itemElements = $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.custom-table-test-list .test-radio');
                    itemElements.each(function (index, itemElement) {
                        if(parseInt($(itemElement).find('.answer').attr('name').split("_")[3])==itemId && removeElement == 0){
                            $(itemElement).remove();
                            removeElement = 1;
                        }
                        if(parseInt($(itemElement).find('.answer').attr('name').split("_")[3])>itemId){
                            var prevName = $(itemElement).find('.answer').attr('name').split("_");
                            prevName[3] = prevName[3] - 1;
                            newName = prevName.join('_');
                            $(itemElement).find('.answer').attr('id', newName);
                            $(itemElement).find('.answer').attr('name', newName);
    
                            var prevName = $(itemElement).find('.scores').attr('name').split("_");
                            prevName[3] = prevName[3] - 1;
                            newName = prevName.join('_');
                            $(itemElement).find('.scores').attr('id', newName);
                            $(itemElement).find('.scores').attr('name', newName);
    
                        }
                        
                    });
                    var fileElements = $('#' + childId).parents('.custom-table__cell').find('.upload-answer');
                    removeElement = 0;
                    fileElements.each(function (index, fileElement) {
                        if(parseInt($(fileElement).find('.test-answer').attr('name').split("_")[3])==itemId && removeElement == 0){
                            $(fileElement).remove();
                            removeElement = 1;
                        }
                        if(parseInt($(fileElement).find('.test-answer').attr('name').split("_")[3])>itemId){
                            var prevName = $(fileElement).find('.test-answer').attr('name').split("_");
                            prevName[3] = prevName[3] - 1;
                            newName = prevName.join('_');
                            $(fileElement).find('.test-answer').attr('id', newName);
                            $(fileElement).find('.test-answer').attr('name', newName);
    
                            var prevName = $(fileElement).find('label').attr('for').split("_");
                            prevName[3] = prevName[3] - 1;
                            newName = prevName.join('_');
                            $(fileElement).find('label').attr('for', newName);
                        }                    
                    });
                    var item = -1 + parseInt( $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.add-questions-item').attr('data-item'));
                    $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.add-questions-item').attr('data-item', item);    
                }
            }
            if($(this).data('type') == 'sectionsQuestion'){
                if($('#' + childId).parents('.lesson-info').length>0){
                    var nextElements = $('#' + childId).parents('.custom-table__row').nextAll();
                    nextElements.each(function (index, element) {
                        var Links = $(element).find('.add-questions-item');
                        Links.each(function (index, link) {
                            question = -1 + parseInt($(link).attr('data-question'));
                            $(link).attr('data-question', question);
                        });
                        var Links = $(element).find('.add-questions-item-check');
                        Links.each(function (index, link) {
                            question = -1 + parseInt($(link).attr('data-question'));
                            $(link).attr('data-question', question);
                        });
                        var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                        if (numbers[1]) {
                            numbers[1] = parseInt(numbers[1]) - 1;
                            $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                        }
                        if ($(element).find('.question-order')) {
                            $(element).find('.question-order').val(++index);
                        }
                        if (element.hasAttribute('data-question')) {
                            question = -1 + parseInt($(element).attr('data-question'));
                            $(element).attr('data-question', question);
                            return false;
                        }
                    });
                    $('#' + childId).parents('.custom-table__row').remove();

                    var itemId = $(this).data('item');
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
                else {
                    var nextElements = $('#' + childId).parents('.custom-table__row').nextAll();
                    nextElements.each(function (index, element) {
                        var inputs = $(element).find('input');
                        inputs.each(function (index, input) {
                            if($(input).attr('name')){
                                prevName = $(input).attr('name').split("_");
                                prevName[2] = prevName[2] - 1;
                                newName = prevName.join('_');
                                $(input).attr('name', newName);
                                $(input).attr('id', newName);
                            }
                        });
                        var labels = $(element).find('label');
                        labels.each(function (index, label) {
                            if($(label).attr('for')){
                                prevName = $(label).attr('for').split("_");
                                prevName[2] = prevName[2] - 1;
                                newName = prevName.join('_');
                                $(label).attr('for', newName);
                            }
                        });
                        var Selects = $(element).find('select');
                        Selects.each(function (index, select) {
                            if($(select).attr('name')){
                                prevName = $(select).attr('name').split("_");
                                prevName[2] = prevName[2] - 1;
                                newName = prevName.join('_');
                                $(select).attr('name', newName);
                                $(select).attr('id', newName);
                            }
                        });
                        var Links = $(element).find('.add-questions-item');
                        Links.each(function (index, link) {
                            question = -1 + parseInt($(link).attr('data-question'));
                            $(link).attr('data-question', question);
                        });
                        var Links = $(element).find('.add-questions-item-check');
                        Links.each(function (index, link) {
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
                    });
                    $('#' + childId).parents('.custom-table__row').remove();
                }
            }
            if($(this).data('type') == 'chapter') {
                if($('#' + childId).parents('.lesson-info').length>0){
                    section = 1;
                    var removesection = 0;
                    // Sections.each(function (index, section_el) {
                    //     if(section === parseInt($('#' + childId).parents('.lesson-info .custom-table__body').find('.title .answer').attr('name').split("_")[3]) && removesection===0){
                    //         removesection = 1;
                    //         console.log('remove')
                    //     }
                    //     else {
                    //         var Questions = $(section_el).children();
                    //         Questions.each(function (index, element) {
                    //             if ($(element).find('.title span')) {
                    //                 $(element).find('.title span').text('Раздел ' + section + ': ');
                    //             }
                    //             var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                    //             if (numbers[0]) {
                    //                 numbers[0] = section;
                    //                 $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                    //             }
                    //             if($(element).find('.title span').next('.answer').length>0){
                    //                 prevName = $(element).find('.title span').next('.answer').attr('name').split("_");
                    //                 if(prevName.length==5){
                    //                     prevName[4] = section;
                    //                 }
                    //                 else {
                    //                     prevNam.push(section);
                    //                 }
                    //                 newName = prevName.join('_');
                    //                 $(element).find('.title span').next('.answer').attr('name', newName);
                    //                 $(element).find('.title span').next('.answer').attr('id', newName);
                    //             }
                    //             // var inputs = $(element).find('input');
                    //             // inputs.each(function (index, input) {
                    //             //     prevName = $(input).attr('name').split("_");
                    //             //     prevName[3] = section;
                    //             //     newName = prevName.join('_');
                    //             //     $(input).attr('name', newName);
                    //             //     $(input).attr('id', newName);
                    //             // });
                    //             // var labels = $(element).find('label');
                    //             // labels.each(function (index, label) {
                    //             //     if($(label).attr('for')){
                    //             //         prevName = $(label).attr('for').split("_");
                    //             //         prevName[3] = section;
                    //             //         newName = prevName.join('_');
                    //             //         $(label).attr('for', newName);
                    //             //     }
                    //             // });
                    //             // var Selects = $(element).find('select');
                    //             // Selects.each(function (index, select) {
                    //             //     prevName = $(select).attr('name').split("_");
                    //             //     prevName[3] = section;
                    //             //     newName = prevName.join('_');
                    //             //     $(select).attr('name', newName);
                    //             //     $(select).attr('id', newName);
                    //             // });
                    //             // var Links = $(element).find('.add-questions-item');
                    //             // Links.each(function (index, link) {
                    //             //     $(link).attr('data-section', section);
                    //             // });
                    //             // var Links = $(element).find('.add-questions-item-check');
                    //             // Links.each(function (index, link) {
                    //             //     $(link).attr('data-section', section);
                    //             // });
                    //         });
                    //         // var Links = $(section_el).find('.add-chapter-question');
                    //         // Links.each(function (index, link) {
                    //         //     $(link).attr('data-section', section);
                    //         // });
                    //         section++;
                    //     }
                    // });
                    var parents = $('#' + childId).parents('.lesson-info');
                    $('#' + childId).parents('.lesson-info .custom-table__body').remove();
                    var Sections = parents.find('.test-table-constructor').find('.custom-table__body');
                    RefreshOnSections(Sections);
                    var chapterId = $(this).data('chapter');
                    if(chapterId) {
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
                else {
                    section = 1;
                    var Sections = $('.test-table-constructor').find('.custom-table__body');
                    Sections.each(function (index, section_el) {
                        var Questions = $(section_el).children();
                        Questions.each(function (index, element) {
                            if ($(element).find('.title span')) {
                                $(element).find('.title span').text('Раздел ' + section + ': ');
                            }
                            var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                            if (numbers[0]) {
                                numbers[0] = section;
                                $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                            }
                            var inputs = $(element).find('input');
                            inputs.each(function (index, input) {
                                prevName = $(input).attr('name').split("_");
                                prevName[1] = section;
                                newName = prevName.join('_');
                                $(input).attr('name', newName);
                                $(input).attr('id', newName);
                            });
                            var labels = $(element).find('label');
                            labels.each(function (index, label) {
                                if($(label).attr('for')){
                                    prevName = $(label).attr('for').split("_");
                                    prevName[1] = section;
                                    newName = prevName.join('_');
                                    $(label).attr('for', newName);
                                }
                            });
                            var Selects = $(element).find('select');
                            Selects.each(function (index, select) {
                                prevName = $(select).attr('name').split("_");
                                prevName[1] = section;
                                newName = prevName.join('_');
                                $(select).attr('name', newName);
                                $(select).attr('id', newName);
                            });
                            var Links = $(element).find('.add-questions-item');
                            Links.each(function (index, link) {
                                $(link).attr('data-section', section);
                            });
                            var Links = $(element).find('.add-questions-item-check');
                            Links.each(function (index, link) {
                                $(link).attr('data-section', section);
                            });
                        });
                        var Links = $(section_el).find('.add-chapter-question');
                        Links.each(function (index, link) {
                            $(link).attr('data-section', section);
                        });
                        section++;
                    });
                    $('#' + childId).parents('.custom-table__body').remove();
                }
            }
        });

        // var emptySections = $('.default-add-section');
        // if(emptySections.length>0){
        //     emptySections.each(function (index, section) {
        //         $(section).find('.add-chapter-constructor').trigger( "click" );
        //     });
        // }
        RefreshOnStart();
    });
});