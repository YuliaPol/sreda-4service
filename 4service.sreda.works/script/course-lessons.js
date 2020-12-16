jQuery(function ($) {
    $(document).ready(function () {
        $('.vacancy-settings').on('change', '.lesson-info .upload-logo .input-group input', function () {
            if (this.files[0]) // если выбрали файл
            {
                $(this).next('label').html(this.files[0].name + '<img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png">');
                $('<input type="hidden">'+this.files[0].name + '').insertAfter($(this));
            }
        });

        //drag question
        $('.constructor-course-table .custom-table__body').sortable(
            {
                appendTo: ".custom-table__body",
                cancel: ".title, .circle-add, input, select, label, .constructor-course-table .custom-table__body .vac-settings__block-content, textarea",
                axis: "y",
                deactivate: function (event, ui) {
                    RefreshQuestion();
                }
            }
        );
        $('.constructor-course-table .question-item-cont').sortable(
            {
                appendTo: ".custom-table__body .question-item-cont",
                cancel: ".title, .circle-add, input, select, label, textarea, .lesson-info",
                items: "> .lesson-wrap",
                axis: "y",
                deactivate: function (event, ui) {
                    RefreshItems();
                }
            }
        );
        function RefreshItems() {
            var item = 1;
            var Questions = $('.constructor-course-table .question-item-cont');
            Questions.each(function (index, question) {
                var Elements = $(question).children();
                item = 1;
                Elements.each(function (index, element) {
                    if ($(element).find('.table-list').length !== 0) {
                        // if ($(element).find('.answer.input-shdw.lesson-name').attr('name')) {
                        //     prevName = $(element).find('.answer.input-shdw.lesson-name').attr('name').split("_");
                        //     prevName[2] = item;
                        //     newName = prevName.join('_');
                        //     $(element).find('.answer.input-shdw.lesson-name').attr('id', newName);
                        //     $(element).find('.answer.input-shdw.lesson-name').attr('name', newName);

                        // }
                        // if ($(element).find('.lesson-id').attr('name')) {
                        //     prevName = $(element).find('.lesson-id').attr('name').split("_");
                        //     prevName[2] = item;
                        //     newName = prevName.join('_');
                        //     $(element).find('.lesson-id').attr('id', newName);
                        //     $(element).find('.lesson-id').attr('name', newName);
                        // }
                        // if ($(element).find('.lesson-info').attr('id')) {
                        //     prevName = $(question).find('.lesson-info').attr('id').split("_");
                        //     prevName[2] = item;
                        //     newName = prevName.join('_');
                        //     $(element).find('.lesson-info').attr('id', newName);
                        // }
                        // var inputs = $(element).find('.lesson-info').find('input');
                        // $(element).find('.lesson-info').attr('id', 'lesson-info_' + item);
                        // inputs.each(function (index, input) {
                        //     prevName = $(input).attr('name').split("_");
                        //     prevName[2] = item;
                        //     newName = prevName.join('_');
                        //     $(input).attr('name', newName);
                        //     $(input).attr('id', newName);
                        // });
                        // var labels = $(element).find('.lesson-info').find('label');
                        // labels.each(function (index, label) {
                        //     if ($(label).attr('for')) {
                        //         prevName = $(label).attr('for').split("_");
                        //         prevName[2] = item;
                        //         newName = prevName.join('_');
                        //         $(label).attr('for', newName);
                        //     }
                        //     if ($(label).attr('name')) {
                        //         prevName = $(label).attr('name').split("_");
                        //         prevName[2] = item;
                        //         newName = prevName.join('_');
                        //         $(label).attr('name', newName);
                        //         $(label).attr('id', newName);
                        //     }
                        // });
                        // var Selects = $(element).find('.lesson-info').find('select');
                        // Selects.each(function (index, select) {
                        //     if ($(select).parents('.vac-settings__block-test').length === 0) {
                        //         prevName = $(select).attr('name').split("_");
                        //         prevName[2] = item;
                        //         newName = prevName.join('_');
                        //         $(select).attr('name', newName);
                        //         $(select).attr('id', newName);
                        //     }
                        // });
                        // var Textares = $(element).find('.lesson-info').find('textarea');
                        // Textares.each(function (index, textarea) {
                        //     if ($(textarea).parents('.vac-settings__block-test').length === 0) {
                        //         prevName = $(textarea).attr('name').split("_");
                        //         prevName[2] = item;
                        //         newName = prevName.join('_');
                        //         $(textarea).attr('name', newName);
                        //         $(textarea).attr('id', newName);
                        //     }
                        // });
                        var Links = $(element).find('.lesson-info').find('.add-inputfile');
                        Links.each(function (index, link) {
                            if ($(link).parents('.vac-settings__block-test').length === 0) {
                                $(link).data('lesson', item);
                            }
                        });
                        // $(question).find('.lesson-info').find('.circle-add').attr('data-blockitem', item);
                        $(element).find('.lesson-order').val(item);
                        item++;
                    }
                });
            });
        }
        function RefreshQuestion() {
            var Elements = $('.constructor-course-table .custom-table__body').children();
            var question_id = 1;
            Elements.each(function (index, question) {
                if ($(question).children().length > 0) {
                    QeustionElement = $(question).children();
                    QeustionElement.each(function (index, element) {
                        if ($(element).find('.course-content-name-cont').length !== 0) {
                            $(element).find('.course-content-name-cont .number').html(question_id + '.');
                            $(element).find('.course-content-name-cont .block-order').val(question_id);
                            // $(element).find('.answer.input-shdw.lesson-name').attr('id', 'block_' + question_id);
                            // $(element).find('.answer.input-shdw.lesson-name').attr('name', 'block_' + question_id);
                            
                            // $(element).find('.block-id').attr('id', 'blockid_' + question_id);
                            // $(element).find('.block-id').attr('name', 'blockid_' + question_id);
                        }
                        else {
                            Items = $(element).children();
                            Items.each(function (index, item) {
                                // if ($(item).find('.table-list').length !== 0 && $(item).find('.answer.input-shdw.lesson-name').attr('name')) {
                                //     prevName = $(item).find('.answer.input-shdw.lesson-name').attr('name').split("_");
                                //     prevName[1] = question_id;
                                //     newName = prevName.join('_');
                                //     $(item).find('.answer.input-shdw.lesson-name').attr('id', newName);
                                //     $(item).find('.answer.input-shdw.lesson-name').attr('name', newName);
                                // }
                                // if ($(item).find('.table-list').length !== 0 && $(item).find('.lesson-id').attr('name')) {
                                //     prevName = $(item).find('.lesson-id').attr('name').split("_");
                                //     prevName[1] = question_id;
                                //     newName = prevName.join('_');
                                //     $(item).find('.lesson-id').attr('id', newName);
                                //     $(item).find('.lesson-id').attr('name', newName);
                                // }
                                if (item.hasAttribute('data-question' && $(item).parents('.test-table-constructor').length==0)) {
                                    $(item).attr('data-question', question_id);
                                }
                                // if(item.hasAttribute('data-blockitem' && $(item).parents('.test-table-constructor').length>0)){
                                //     $(item).attr('data-blockitem', question_id);
                                // }
                            });
                        }
                    });
                    // var inputs = $(question).find('.lesson-info').find('input');
                    // if ($(question).find('.lesson-info').attr('id')) {
                    //     prevName = $(question).find('.lesson-info').attr('id').split("_");
                    //     prevName[1] = question_id;
                    //     newName = prevName.join('_');
                    //     $(question).find('.lesson-info').attr('id', newName);
                    // }
                    // $(question).find('.lesson-info').attr('id', 'lesson-info_' + question_id);
                    // inputs.each(function (index, input) {
                    //     if( $(input).attr('name')){
                    //         prevName = $(input).attr('name').split("_");
                    //         prevName[1] = question_id;
                    //         newName = prevName.join('_');
                    //         $(input).attr('name', newName);
                    //         $(input).attr('id', newName);    
                    //     }
                    // });
                    // var labels = $(question).find('.lesson-info').find('label');
                    // labels.each(function (index, label) {
                    //     if ($(label).attr('for')) {
                    //         prevName = $(label).attr('for').split("_");
                    //         prevName[1] = question_id;
                    //         newName = prevName.join('_');
                    //         $(label).attr('for', newName);
                    //     }
                    //     if ($(label).attr('name')) {
                    //         prevName = $(label).attr('name').split("_");
                    //         prevName[1] = question_id;
                    //         newName = prevName.join('_');
                    //         $(label).attr('name', newName);
                    //         $(label).attr('id', newName);
                    //     }
                    // });
                    // var Selects = $(question).find('.lesson-info').find('select');
                    // Selects.each(function (index, select) {
                    //     if($(select).attr('name')) {
                    //         prevName = $(select).attr('name').split("_");
                    //         prevName[1] = question_id;
                    //         newName = prevName.join('_');
                    //         $(select).attr('name', newName);
                    //         $(select).attr('id', newName);    
                    //     }
                    // });
                    // var Textares = $(question).find('.lesson-info').find('textarea');
                    // Textares.each(function (index, textarea) {
                    //     prevName = $(textarea).attr('name').split("_");
                    //     prevName[1] = question_id;
                    //     newName = prevName.join('_');
                    //     $(textarea).attr('name', newName);
                    //     $(textarea).attr('id', newName);
                    // });
                    // var Links = $(question).find('.lesson-info').find('.add-inputfile');
                    // Links.each(function (index, link) {
                    //     $(link).data('block', question_id);
                    // });
                    // $(question).find('.lesson-info').find('.circle-add').attr('data-block', question_id);
                    question_id++;
                }

            });
        }

        //add new question
        $('.vacancy-settings').on('click', '.add-new-question', function () {
            // var id_question = 1 + $(this).data('question');
            // ajax
            // var id_question = Math.floor(Math.random() * 100000);
            var id_question;
            var courseId = $('#courseId').val();
            var length = parseInt($(this).parents('.custom-table__body').find('.question-cont').length);
            var id_number = 1 + length;
            var thisEl = this;
            // AddNewQuestionAjax(id_question, id_number, thisEl)
            if(courseId){
                $.ajax ({
                    type: 'POST',
                    url: "/corporate/ajax/create-block",
                    dataType: "json",
                    data: {
                        course_id: courseId,
                        block_id: id_number
                    },
                }).done(function (data) {
                    console.log(data);
                    id_question = parseInt(data);
                    AddNewQuestionAjax(id_question, id_number, thisEl);
                    console.log('Создан блок');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
        });

        function AddNewQuestionAjax(id_question, id_number, el){
            var newQuestion =
                '<div class="question-cont">' +
                '<div class="custom-table__row flex j-s-b mt-50">' +
                '    <div class="custom-table__cell course-content-name">' +
                '       <div class="course-content-name-cont">' +
                '            <span class="number">' + id_number + '.</span>' +
                '            <input type="text" class="answer input-shdw lesson-name" data-reqired="reqired" value="" id="block_' + id_question + '" name="block_' + id_question + '" placeholder="Введите название блока">' +
                '            <input type="hidden" value="'+ id_number + '" class="block-order"  id="blockorder_' + id_question + '" name="blockorder_' + id_question + '"></span>'+
                '       </div>' +
                '        <a href="#" class="circle-add add-answer add-new-question"' +
                '        data-question="' + id_number + '">+</a>' +
                '    </div>' +
                '    <div class="custom-table__cell">' +
                '        <a href="#" title="Delete" class="delete-question">' +
                '            <img src="../../../img/corp/icons/trash.png" alt="Delete" class="delete-question">' +
                '        </a>' +
                '        <a href="#" title="Move"  class="move-question">' +
                '            <img src="../../../img/corp/icons/movetest.png" alt="Move">' +
                '        </a>' +
                '    </div>' +
                '</div>' +
                '<div class="question-item-cont">' +
                '<a href="#" class="circle-add add-answer add-new-item" data-item="0" data-question="' + id_question + '">+</a>' +
                '</div>' +
                '</div>';
            $('.add-new-question').data('question', id_question);
            $(newQuestion).appendTo($(el).parents('.custom-table__body'));
            $('.constructor-course-table .question-item-cont').sortable(
                {
                    appendTo: ".custom-table__body .question-item-cont",
                    cancel: ".title, .circle-add, input, select, label, textarea, .lesson-info",
                    items: "> .lesson-wrap",
                    axis: "y",
                    deactivate: function (event, ui) {
                        RefreshItems();
                    }
                }
            );
        }
        let youtubeLinks = $('.vacancy-settings').find('.youtube-link-item');
        if(youtubeLinks.length>0){
            setYoutubeLinks(youtubeLinks);
        }
        function setYoutubeLinks(youtubeLinks){
            youtubeLinks.each(function (index, link) {
                if($(link).find('.youtube-link input:nth-child(1)').val() && $(link).find('.youtube-link input:nth-child(2)').val()){
                    console.log()
                    let duration = $(link).find('.youtube-link input:nth-child(2)').val();
                    if(duration > 0){
                        var youTubeText ;
                        if($(link).find('.youtube-link').parent().find('.text-youtube').length>0){
                            youTubeText = $(link).find('.youtube-link').parent().find('.text-youtube');
                        }
                        else {
                            var divText = '<div class="text-youtube"></div>';
                            $(divText).appendTo( $(link).find('.youtube-link').parent());
                            youTubeText = $(link).find('.youtube-link').parent().find('.text-youtube');
                        }
                        var labelTime = getTimeFromSecunds(duration);
                        youTubeText.html('Продолжительность урока: ' + labelTime);
                    }
                }
            });
        };
        //add youtube-link
        $('.vacancy-settings').on('click', '.add-new-youtube-link', function () {
            var id_link = 1 + parseInt($(this).parents('.youtube-links').find('.youtube-link').length);
            var id_block = $(this).parents('.lesson-wrap').find('.lesson-name').attr('name').split('_')[1];
            var id_lesson = $(this).parents('.lesson-wrap').find('.lesson-name').attr('name').split('_')[2];
            var newlink = 
                '<div class="youtube-link-item">'
                +'<div class="youtube-link-wrapper">'
                +'    <div class="input-group youtube-link">'
                +'      <input type="text"'
                +'          class="input-shdw"'
                +'          value=""'
                +'          name="youtube-link_'+ id_block + '_'+ id_lesson +'_'+ id_link +'"'
                +'          id="youtube-link_'+ id_block + '_'+ id_lesson +'_'+ id_link +'"'
                +'          placeholder="Укажите ссылку на видео с сервиса YouTube">'
                +'      <input type="hidden"'
                +'          class="input-shdw"'
                +'          value=""'
                +'          name="youtube-duration_'+ id_block + '_'+ id_lesson +'_'+ id_link +'"'
                +'          id="youtube-duration_'+ id_block + '_'+ id_lesson +'_'+ id_link +'">'
                +'  </div>'
                +'</div>'
                +'<a href="#remove-course-popup" title="Delete"'
                +'    class="delete-youtube-link">'
                +'    <img src="../../../img/corp/icons/trash.png"'
                +'       alt="Delete">'
                +'</a>'
                +'</div>';
            $(newlink).insertBefore($(this));
        });
        //add input-file
        $('.vacancy-settings').on('click', '.add-inputfile', function () {
            var id_inputfile = 1 + $(this).data('inputfile');
            var id_block = $(this).data('block');
            var id_lesson = $(this).data('lesson');
            var newInputfile =
                '<div class="course-materials-wrap">' +
                '<div class="inputs-wrap">' +
                '<div class="input-group">' +
                '    <input type="text" class="input-shdw" name="course-materials_' + id_block + '_' + id_lesson + '_' + id_inputfile + '"' +
                '        placeholder="Укажите название документа рекомендованного к изучению, напр. «статья/книга/чек-лист» и т.д.">' +
                '</div>' +
                '<div class="upload-field-wrap">' +
                '    <div class="upload-logo upload-lesson">' +
                '        <div class="input-group">' +
                '            <input id="file-materials_' + id_block + '_' + id_lesson + '_' + id_inputfile + '" type="file" name="file-materials_' + id_block + '_' + id_lesson + '_' + id_inputfile + '">' +
                '            <label for="file-materials_' + id_block + '_' + id_lesson + '_' + id_inputfile + '" id="label-file-materials_' + id_block + '_' + id_lesson + '_' + id_inputfile + '" name="label-file-materials_' + id_block + '_' + id_lesson + '_' + id_inputfile + '">' +
                '               <img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png">' +
                '            </label>' +
                '        </div>' +
                '    </div>' +
                '</div>' +
                '    </div>' +
                '    <a href="#remove-course-popup" title="Delete"' +
                '        class="delete-input-file">' +
                '        <img src="../../../img/corp/icons/trash.png"' +
                '            alt="Delete">' +
                '    </a>' +
                '</div';
            $(this).data('inputfile', id_inputfile);
            $(newInputfile).insertBefore($(this));
        });
        //delete question
        $('.vacancy-settings').on('click', '.delete-question', function () {
            var id_element = $(this).parents('.question-cont').find('.course-content-name-cont .answer.input-shdw.lesson-name').attr('id');
            $('#remove-course-popup .submit-remove-course').data('id', id_element);
            $('#remove-course-popup .submit-remove-course').data('type', 'question');
            if ($(this).data('name')) {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить блок «' + $(this).data('name') + '» ?');
            }
            else {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить блок?');
            }
            $.magnificPopup.open({
                items: [
                    {
                        src: '#remove-course-popup'
                    }
                ]
            });
        });
        //delete input-file
        $('.vacancy-settings').on('click', '.delete-input-file', function () {
            var id_element = $(this).parents('.course-materials-wrap').find('.upload-logo.upload-lesson input').attr('id');
            $('#remove-course-popup .submit-remove-course').data('id', id_element);
            $('#remove-course-popup .submit-remove-course').data('type', 'inputfile');
            $('#remove-course-popup h3').html('Вы действительно хотите удалить  материалы к занятию?');
            $.magnificPopup.open({
                items: [
                    {
                        src: '#remove-course-popup'
                    }
                ]
            });
        });
        //delete youtube-link
        $('.vacancy-settings').on('click', '.delete-youtube-link', function () {
            var id_element = $(this).parents('.youtube-link-item').find('.youtube-link input:nth-child(1)').attr('id');
            $('#remove-course-popup .submit-remove-course').data('id', id_element);
            $('#remove-course-popup .submit-remove-course').data('type', 'youtube');
            $('#remove-course-popup h3').html('Вы действительно хотите удалить видео?');
            $.magnificPopup.open({
                items: [
                    {
                        src: '#remove-course-popup'
                    }
                ]
            });
        });
        $('.remove-popup').on('click', '.submit-remove-course', function () {
            var id = $(this).data('id');
            if ($(this).data('type') == 'question') {
                //ajax
                var id_block = id.split('_')[1];
                if(id_block){
                    $.ajax ({
                        type: 'POST',
                        url: "/corporate/ajax/remove-block",
                        dataType: "json",
                        data: {
                            id: id_block
                        },
                    }).done(function (data) {
                        console.log(data);
                        $('#' + id).parents('.question-cont').remove();
                        var id_question = -1 + $('.add-new-question').data('question');
                        $('.add-new-question').data('question', id_question);
                        RefreshQuestion();
                        console.log('Удален блок');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }
            }
            if ($(this).data('type') == 'item') {
                var id_lesson = id.split('_')[2];
                console.log(id_lesson);
                if(id_lesson){
                    $.ajax ({
                        type: 'POST',
                        url: "/corporate/ajax/remove-lesson",
                        dataType: "json",
                        data: {
                            id: id_lesson
                        },
                    }).done(function (data) {
                        console.log(data);
                        $('#' + id).parents('.lesson-wrap').remove();
                        var id_item = -1 + $('#' + id).parents('.question-item-cont').find('.add-new-item').data('item');
                        $('#' + id).parents('.question-item-cont').find('.add-new-item').data('item', id_item);
                        RefreshItems();
                        console.log('Удален урок');
                    }).fail(function (data) {
                        // не удалось выполнить запрос к серверу
                        console.log(data);
                        console.log('Запрос не принят');
                    });
                }
            }
            if ($(this).data('type') == 'inputfile') {
                if($('#' + id).parents('.course-materials-wrap').length>0){
                    var name = $('#' + id).attr('name').split('_');
                    var courseId = $('#courseId').val();
                    var blockId  = name[1];
                    var lessonId  = name[2];
                    var materialId  = name[3];
                    if(courseId && blockId && lessonId && materialId){
                        $.ajax ({
                            type: 'POST',
                            url: "/corporate/ajax/delete-material",
                            dataType: "json",
                            data: {
                                course_id: courseId,
                                block_id: blockId,
                                lesson_id: lessonId,
                                material_id: materialId
                            },
                        }).done(function (data) {
                            console.log('Материалы удалены');
                        }).fail(function (data) {
                            // не удалось выполнить запрос к серверу
                            console.log('Запрос не принят');
                        });
                    }
                }
                $('#' + id).parents('.course-materials-wrap').remove();
            }
            if ($(this).data('type') == 'youtube') {
                var parents = $('#' + id).parents('.youtube-links');
                $('#' + id).parents('.youtube-link-item').remove();
                var Links = parents.find('.youtube-link-item');
                refreshYoutubeLinks(Links);
            }
        });
        function refreshYoutubeLinks(Links){
            console.log(Links);
            Links.each(function (index, link) {
                var inputs = $(link).find('input');
                inputs.each(function (index2, input) {
                    prevName = $(input).attr('name').split("_");
                    prevName[3] = index+1;
                    newName = prevName.join('_');
                    $(input).attr('id', newName);
                    $(input).attr('name', newName);
                });
            });
        }
        //delete questions item
        $('.vacancy-settings').on('click', '.delete-item', function () {
            var id_item = $(this).parents('.lesson-wrap').find('.table-list .answer.input-shdw.lesson-name').attr('id');
            $('#remove-course-popup .submit-remove-course').data('id', id_item);
            $('#remove-course-popup .submit-remove-course').data('type', 'item');
            if ($(this).parents('.custom-table__row').find('.table-list input').val().length > 0) {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить урок «' + $(this).parents('.custom-table__row').find('.table-list input').val() + '» ?');
            }
            else {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить урок?');
            }
            $.magnificPopup.open({
                items: [
                    {
                        src: '#remove-course-popup'
                    }
                ]
            });
        });
        //add qursetions item
        $(".vacancy-settings").on("click", ".add-new-item", function () {
            //random
            var id_question = $(this).parents('.question-cont').find('.course-content-name .course-content-name-cont .lesson-name').attr('name').split('_')[1];
            var order_item = parseInt($(this).parents('.question-item-cont').find('.lesson-wrap').length) + 1;
            var thisEl = this;
            var id_item;
            var id_item = Math.floor(Math.random() * 100000);
            // AddNewItemAjax(id_question, id_item, order_item, thisEl);
            if(id_question){
                $.ajax ({
                    type: 'POST',
                    url: "/corporate/ajax/create-lesson",
                    dataType: "json",
                    data: {
                        block_id: id_question,
                        lesson_order: order_item
                    },
                }).done(function (data) {
                    console.log(data);
                    id_item = parseInt(data);
                    AddNewItemAjax(id_question, id_item, order_item,  thisEl);
                    console.log('Создан урок');
                }).fail(function (data) {
                    // не удалось выполнить запрос к серверу
                    console.log(data);
                    console.log('Запрос не принят');
                });
            }
        });

        function AddNewItemAjax(id_question, id_item, order_item,  el ){
            var newItem =
                '<div class="lesson-wrap">' +
                '<div class="custom-table__row flex j-s-b">' +
                '    <div class="custom-table__cell">' +
                '        <span class="table-list"><input type="text" class="answer input-shdw lesson-name" data-reqired="reqired" value="" id="lesson_' + id_question + '_' + id_item + '" name="lesson_' + id_question + '_' + id_item + '" placeholder="Введите название вопроса">' +
                '        <input type="hidden" value="'+ order_item + '" class="lesson-order"  id="lessonorder_' + id_question + '_' + id_item + '" name="lessonorder_' + id_question + '_' + id_item + '"></span>'+
                '    </div>' +
                '    <div class="custom-table__cell">' +
                '        <a href="#" title="Edit" class="edit-lesson">' +
                '            <img src="../../../img/corp/icons/pencil.png" alt="Edit">' +
                '        </a>' +
                '        <a href="#" title="Delete" class="delete-item">' +
                '            <img src="../../../img/corp/icons/trash.png" alt="Delete">' +
                '         </a>' +
                '         <a href="#" title="Move"  class="move-question">' +
                '            <img src="../../../img/corp/icons/movetest.png" alt="Move">' +
                '          </a>' +
                '    </div>' +
                '</div>' +
                '    <div class="lesson-info" style="display: none;" id="lesson-info_' + id_question + '_' + id_item + '">' +
                '    <div class="vac-settings__block-content">' +
                '        <div class="input-group">' +
                '            <textarea placeholder="Введите информацию об уроке" name="lessoninfo_' + id_question + '_' + id_item + '"></textarea>' +
                '        </div>' +
                '    </div>' +
                // '    <div class="vac-settings__block-content">' +
                // '        <div class="upload-field-wrap">' +
                // '            <div class="upload-logo upload-lesson">' +
                // '                <div class="input-group">' +
                // '                    <input id="file-input_' + id_question + '_' + id_item + '" type="file" name="file-input_' + id_question + '_' + id_item + '">' +
                // '                    <label for="file-input_' + id_question + '_' + id_item + '" id="file-label_' + id_question + '" name="file-label_' + id_question + '_' + id_item + '">' +
                // '                        <img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png">' +
                // '                    </label>' +
                // '                </div>' +
                // '            </div>' +
                // '        </div>' +
                // '    </div>' +
                '    <div class="vac-settings__block-content">'
                +'        <div class="youtube-links">'
                +'          <div class="youtube-link-item">'
                +'              <div class="youtube-link-wrapper">'
                +'                  <div class="input-group youtube-link">'
                +'                      <input type="text"'
                +'                          class="input-shdw"'
                +'                          value=""'
                +'                          name="youtube-link_' + id_question + '_' + id_item + '_1"'
                +'                          id="youtube-link_' + id_question + '_' + id_item + '_1"'
                +'                          placeholder="Укажите ссылку на видео с сервиса YouTube">'
                +'                      <input type="hidden"'
                +'                          class="input-shdw"'
                +'                          value=""'
                +'                          name="youtube-duration_' + id_question + '_' + id_item + '_1"'
                +'                          id="youtube-duration_' + id_question + '_' + id_item + '_1">'
                +'                  </div>'
                +'              </div>'
                +'              <a href="#remove-course-popup" title="Delete"'
                +'                  class="delete-youtube-link">'
                +'                  <img src="../../../img/corp/icons/trash.png"'
                +'                      alt="Delete">'
                +'              </a>'
                +'          </div>'
                +'          <a href="#" class="circle-add add-answer add-new-youtube-link" >+</a>'
                +'      </div>'+
                '    </div>' +
                '    <div class="vac-settings__block vac-settings__materials">' +
                '        <h4 class="tools-title">' +
                '            <img src="../../../img/corp/icons/book_blue.png" alt="Book">' +
                '            Материалы к занятию' +
                '            <div class="vac-tools">' +
                '                <div class="input-group">' +
                '                    <input type="checkbox" class="checkbox" id="matterials_' + id_question + '_' + id_item + '" name="matterials_' + id_question + '_' + id_item + '"/>' +
                '                    <label for="matterials_' + id_question + '_' + id_item + '"></label>' +
                '                </div>' +
                '            </div>' +
                '        </h4>' +
                '        <div class="vac-settings__block-content " style="display: none;">' +
                '    </div>' +
                '    </div>' +
                '    <div class="vac-settings__block vac-settings__hw">' +
                '       <h4 class="tools-title">' +
                '           <img src="../../../img/corp/icons/essay.png" alt="Book">' +
                '           Домашнее задание' +
                '           <div class="vac-tools">' +
                '               <div class="input-group">' +
                '                   <input type="checkbox" class="checkbox" id="recomended_' + id_question + '_' + id_item + '" name="recomended_' + id_question + '_' + id_item + '"/>' +
                '                   <label for="recomended_' + id_question + '_' + id_item + '"></label>' +
                '               </div>' +
                '           </div>' +
                '       </h4>' +
                '       <div class="vac-settings__block-content"  style="display: none;">' +
                '   </div>' +
                '    <div class="vac-settings__block">' +
                '    <h4 class="title tools-title">' +
                '        Тест' +
                '        <div class="vac-tools">' +
                '            <div class="input-group">' +
                '                <input type="checkbox" class="checkbox lessons-test"' +
                '                    name="lessontest_' + id_question + '_' + id_item + '" id="lessontest_' + id_question + '_' + id_item + '"/>' +
                '                <label for="lessontest_' + id_question + '_' + id_item + '"></label>' +
                '            </div>' +
                '        </div>' +
                '    </h4>' +
                '    <div class="vac-settings__block-content" style="display: none;">' +

                '    </div>' +
                '</div>' +
                '</div>';
            $(el).attr('data-item', id_item);
            $(newItem).insertBefore($(el));
            // $('.default-add-section').remove();
            $('.vac-test__descr select').customSelect();
        }

        $('.vacancy-settings').on('click', '.vac-settings__hw .tools-title .checkbox', function(e){
            if($(this).is(':checked')){
                if($(this).parents('.tools-title').next().find('.hw-notice').length==0){
                    var id_question = $(this).attr('name').split('_')[1];
                    var id_item = $(this).attr('name').split('_')[2];
                    var homework = 
                    '           <div class="input-group">' +
                    '               <textarea name="homework_' + id_question + '_' + id_item + '" placeholder="Введите информацию"></textarea>' +
                    '           </div>' +
                    '           <div class="vac-test__descr">' +
                    '               <p class="hw-notice">Крайний срок подачи' +
                    '                   <select name="deadline_' + id_question + '_' + id_item + '">' +
                    '                       <option value="1">1</option>' +
                    '                       <option value="2">2</option>' +
                    '                       <option value="3">3</option>' +
                    '                       <option value="4">4</option>' +
                    '                       <option value="5">5</option>' +
                    '                       <option value="6">6</option>' +
                    '                       <option value="7">7</option>' +
                    '                       <option value="8">8</option>' +
                    '                       <option value="9">9</option>' +
                    '                       <option value="10">10</option>' +
                    '                   </select>' +
                    '                   дней' +
                    '               </p>' +
                    '           </div>' +
                    '           <div class="blck-chk-wrap course-hw-chk">' +
                    '               <label class="test-radio">' +
                    '                   <input type="checkbox" name="homework-file_' + id_question + '_' + id_item + '" />' +
                    '                   <div class="test-radio__answer">' +
                    '                       <span class="answer">ДЗ предусматривает загрузку  файла</span>' +
                    '                   </div>' +
                    '               </label>' +
                    '               <label class="test-radio">' +
                    '                   <input type="checkbox" name="homework-comment_' + id_question + '_' + id_item + '" />' +
                    '                   <div class="test-radio__answer"><span class="answer">ДЗ предусматривает' +
                    '                           текстовый комментарий</span></div>' +
                    '               </label>' +
                    '               <label class="test-radio">' +
                    '                   <input type="checkbox" name="homework-feedback_' + id_question + '_' + id_item + '" />' +
                    '                   <div class="test-radio__answer"><span class="answer">ДЗ предусматривает обратную' +
                    '                           связь</span></div>' +
                    '               </label>' +
                    '           </div>' +
                    '           <div class="vac-test__descr">' +
                    '               <p class="hw-notice">Срок обратной связи' +
                    '                   <select name="feedback-deadline_' + id_question + '_' + id_item + '">' +
                    '                       <option value="1">1</option>' +
                    '                       <option value="2">2</option>' +
                    '                       <option value="3">3</option>' +
                    '                       <option value="4">4</option>' +
                    '                       <option value="5">5</option>' +
                    '                       <option value="6">6</option>' +
                    '                       <option value="7">7</option>' +
                    '                       <option value="8">8</option>' +
                    '                       <option value="9">9</option>' +
                    '                       <option value="10">10</option>' +
                    '                   </select>' +
                    '                   дней' +
                    '               </p>' +
                    '           </div>' +
                    '       </div>';
                    $(homework).appendTo($(this).parents('.tools-title').next());
                    $('.vac-test__descr select').customSelect();
                }
            }
        });
        
        $('.vacancy-settings').on('click', '.vac-settings__materials .tools-title .checkbox', function(e){
            if($(this).is(':checked')){
                if($(this).parents('.tools-title').next().find('.add-inputfile').length==0){
                    var id_question = $(this).attr('name').split('_')[1];
                    var id_item = $(this).attr('name').split('_')[2];
                    var material = 
                    '<a href="#" class="circle-add add-answer add-inputfile" data-inputfile="1" data-lesson="' + id_item + '" data-block="' + id_question + '">+</a>';
                    $(material).appendTo($(this).parents('.tools-title').next());
                    $('.vac-test__descr select').customSelect();
                }
            }
        });
        $('.vacancy-settings').on('click', '.lessons-test', function(e){
            console.log($(this).is(':checked'));
            if($(this).is(':checked')){
                if($(this).parents('.tools-title').next().find('.course-test-settings').length==0){
                    var id_question = $(this).attr('name').split('_')[1];
                    var id_item = $(this).attr('name').split('_')[2];
                    var testSettings = 
                    '        <div class="course-test-settings">' +
                    '            <div class="vac-test__descr">' +
                    '                <p>Ограничить время прохождения теста</p>' +
                    '                <div class="form-group field-testdata-time_limit">' +
                    '                    <select  class="limit-time-test"  id="time_' + id_question + '_' + id_item + '" class="form-control" name="time_' + id_question + '_' + id_item + '" >' +
                    '                        <option value="0">10:00</option>' +
                    '                        <option value="1">15:00</option>' +
                    '                        <option value="2">20:00</option>' +
                    '                        <option value="3">30:00</option>' +
                    '                        <option data-myoption="true" value="myoption">Свой вариант</option>'+
                    '                    </select>' +
                    '                </div>' +
                    '                <div class="design-content__row">' +
                    '                    <label class="test-radio">' +
                    '                        <input type="checkbox" name="shuffle_' + id_question + '_' + id_item + '"  id="shuffle_' + id_question + '_' + id_item + '">' +
                    '                        <div class="test-radio__answer">' +
                    '                            <span class="answer">Перемешать ответы</span>' +
                    '                        </div>' +
                    '                    </label>' +
                    '                </div>' +
                    '                <p>Минимальный результат прохождения</p>' +
                    '                <div class="form-group field-testdata-min_result">' +
                    '                    <select id="minresult_' + id_question + '_' + id_item + '" class="form-control" name="minresult_' + id_question + '_' + id_item + '">' +
                    '                        <option value="50">50%</option>' +
                    '                        <option value="60">60%</option>' +
                    '                        <option value="70">70%</option>' +
                    '                        <option value="80">80%</option>' +
                    '                        <option value="90">90%</option>' +
                    '                    </select>' +
                    '                    <div class="help-block"></div>' +
                    '               </div>' +
                    '                <p>Количество повторных попыток</p>' +
                    '                <div class="form-group field-testdata-repeat_probes">' +
                    '                    <select id="probes_' + id_question + '_' + id_item + '" class="form-control" name="probes_' + id_question + '_' + id_item + '">' +
                    '                        <option value="0">0</option>' +
                    '                        <option value="1">1</option>' +
                    '                        <option value="2">2</option>' +
                    '                        <option value="3">3</option>' +
                    '                        <option value="4">4</option>' +
                    '                        <option value="5">5</option>' +
                    '                        <option value="6">Без ограничений</option>' +
                    '                    </select>' +
                    '                    <div class="help-block"></div>' +
                    '                </div>' +
                    '                <p>Подача теста</p>' +
                    '               <div class="form-group field-testdata-completeness">' +
                    '                    <select id="result_' + id_question + '_' + id_item + '" class="form-control" name="result_' + id_question + '_' + id_item + '">' +
                    '                        <option value="0">Все вопросы</option>' +
                    '                        <option value="1">Вопрос за вопросом</option>' +
                    '                        <option value="3">Раздел за разделом</option>' +
                    '                    </select>' +
                    '                    <div class="help-block"></div>' +
                    '                </div>' +
                    '            </div>' +
                    '        </div>' +
                    '        <div class="input-group">' +
                    '            <div class="form-group field-testdata-description">' +
                    '                <textarea id="testdecr_' + id_question + '_' + id_item + '" class="form-control" name="testdecr_' + id_question + '_' + id_item + '"' +
                    '                    placeholder="Введите описание теста"></textarea>' +
                    '                <div class="help-block"></div>' +
                    '            </div>' +
                    '            <h6 class="the-count"><span class="current-count">0</span>' +
                    '                <span class="max-count">/ 300 </span>' +
                    '            </h6>' +
                    '        </div>' +
                    '        <div class="table-wrap">' +
                    '            <div' +
                    '                class="custom-table test-edit test-edit-constructor test-table-constructor">' +
                    '                <div class="custom-table__header flex j-s-b">' +
                    '                    <div class="custom-table__col">Вопрос</div>' +
                    '                    <div class="custom-table__col">Тип вопроса' +
                    '                    </div>' +
                    '                    <div class="custom-table__col">Ответы</div>' +
                    '                    <div class="custom-table__col">Баллы</div>' +
                    '                    <div class="custom-table__col"></div>' +
                    '                </div>' +
                    '                <div class="custom-table__body default-add-section">' +
                    '                    <div class="custom-table__row flex j-s-b">' +
                    '                     <h4 class="title add-chapter">'+
                    '                       <a href="#" class="circle-add add-chapter-constructor" data-block="'+ id_question +'" data-blockitem="'+ id_item +'">' +
                    '                           <img src="../../../img/corp/icons/chapter-img02.png" alt="">' +
                    '                       </a>' +
                    '                        <div class="title">' +
                    '                            <span>Раздел 1: </span>' +
                    '                            <input type="text"' +
                    '                                class="answer input-shdw"' +
                    '                                placeholder="«Название»"' +
                    '                                id="chapter_' + id_question + '_' + id_item + '_1" name="chapter_' + id_question + '_' + id_item + '_1">' +
                    '                        </div>' +
                    '                        <div class="delete-chapter-cont">' +
                    '                            <a href="#" title="Delete" class="delete-chapter">' +
                    '                                <img src="../../../img/corp/icons/trash.png" alt="Delete">' +
                    '                            </a>' +
                    '                        </div>' +
                    '                        </h4>'+
                    '                    </div>' +
                    '                    <a href="#"' +
                    '                        class="circle-add add-chapter-question"' +
                    '                        data-section="1" data-question="0" data-block="'+ id_question + '" data-blockitem="'+ id_item + '" data-question="0">+</a>' +
                    '                </div>' +
                    '            </div>' +
                    '        </div>';
                    $(testSettings).appendTo($(this).parents('.tools-title').next());
                    $('.default-add-section').find('.add-chapter-constructor').click();
                    $('.vac-test__descr select').customSelect();
                }
            }
            else {
                $(this).parents('.tools-title').next().html(' ');
            }
        });
        $('.vacancy-settings').on('click', '.edit-lesson', function () {
            if ($(this).parents('.lesson-wrap').find('.lesson-info').is(':visible')) {
                $(this).parents('.lesson-wrap').find('.lesson-info').fadeOut();
            }
            else {
                $(this).parents('.lesson-wrap').find('.lesson-info').fadeIn();
            }
        });

        //youtube duration
        $('.vacancy-settings').on('input keydown keyup mousedown mouseup select contextmenu drop change', '.youtube-link input[type=text]', function(e){
            var url = $(this).val();
            var vidid = youtube_parser(url);
            var YOUR_API_KEY = "AIzaSyBNhDxp4JZ1B6RHz3YT3yZo_R-yfINbw0o";
            var inDuration = $(this).next('input');
            var youTubeText ;
            if($(this).parents('.youtube-link').parent().find('.text-youtube').length>0){
                youTubeText = $(this).parents('.youtube-link').parent().find('.text-youtube');
            }
            else {
                var divText = '<div class="text-youtube"></div>';
                $(divText).appendTo( $(this).parents('.youtube-link').parent());
                youTubeText = $(this).parents('.youtube-link').parent().find('.text-youtube');
            }
            if(vidid){
                $.ajax({
                    url: 'https://www.googleapis.com/youtube/v3/videos?id='+ vidid +'&key='+ YOUR_API_KEY + '&part=contentDetails,statistics',
                    dataType: "jsonp",
                    success: function (data) {
                        if(data.items.length !==0){
                            var durarion = data.items[0].contentDetails.duration
                            if(durarion){
                                var durationSec = convert_time(durarion);
                                inDuration.val(durationSec);
                                var labelTime = getTimeFromSecunds(durationSec);
                                youTubeText.html('Продолжительность урока: ' + labelTime);
                                console.log('Add YouTube video duration');
                            }
                            else {
                                youTubeText.html('Ошибка. Видео не найдено.');
                                console.log('YouTube API Error');
                            }
                        }
                        else {
                            youTubeText.html('Ошибка. Видео не найдено.');
                            console.log('YouTube API Error');
                        }
                    }
                });
            }
            else {
                youTubeText.html('Ошибка. Неправильная ссылка на видео.');
                console.log('YouTube API Error');
            }
        });
        function getTimeFromSecunds(totalSeconds){
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            var returnStr = ' ';
            if(hours !== 0) {
                returnStr += hours + ' часов ';
            }
            returnStr += minutes + ' минут ';
            returnStr += seconds + ' секунд ';
            return returnStr;
        }
        function youtube_parser(url){
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return (match&&match[7].length==11)? match[7] : false;
        }
        function convert_time(duration) {
            var a = duration.match(/\d+/g);
    
            if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
                a = [0, a[0], 0];
            }
    
            if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
                a = [a[0], 0, a[1]];
            }
            if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
                a = [a[0], 0, 0];
            }
    
            duration = 0;
    
            if (a.length == 3) {
                duration = duration + parseInt(a[0]) * 3600;
                duration = duration + parseInt(a[1]) * 60;
                duration = duration + parseInt(a[2]);
            }
    
            if (a.length == 2) {
                duration = duration + parseInt(a[0]) * 60;
                duration = duration + parseInt(a[1]);
            }
    
            if (a.length == 1) {
                duration = duration + parseInt(a[0]);
            }
            return duration
        }
    });
});