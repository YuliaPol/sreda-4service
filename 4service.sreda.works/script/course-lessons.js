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
                        if ($(element).find('.answer.input-shdw.lesson-name').attr('name')) {
                            prevName = $(element).find('.answer.input-shdw.lesson-name').attr('name').split("_");
                            prevName[2] = item;
                            newName = prevName.join('_');
                            $(element).find('.answer.input-shdw.lesson-name').attr('id', newName);
                            $(element).find('.answer.input-shdw.lesson-name').attr('name', newName);

                        }
                        if ($(element).find('.lesson-id').attr('name')) {
                            prevName = $(element).find('.lesson-id').attr('name').split("_");
                            prevName[2] = item;
                            newName = prevName.join('_');
                            $(element).find('.lesson-id').attr('id', newName);
                            $(element).find('.lesson-id').attr('name', newName);
                        }
                        if ($(element).find('.lesson-info').attr('id')) {
                            prevName = $(question).find('.lesson-info').attr('id').split("_");
                            prevName[2] = item;
                            newName = prevName.join('_');
                            $(element).find('.lesson-info').attr('id', newName);
                        }
                        var inputs = $(element).find('.lesson-info').find('input');
                        $(element).find('.lesson-info').attr('id', 'lesson-info_' + item);
                        inputs.each(function (index, input) {
                            prevName = $(input).attr('name').split("_");
                            prevName[2] = item;
                            newName = prevName.join('_');
                            $(input).attr('name', newName);
                            $(input).attr('id', newName);
                        });
                        var labels = $(element).find('.lesson-info').find('label');
                        labels.each(function (index, label) {
                            if ($(label).attr('for')) {
                                prevName = $(label).attr('for').split("_");
                                prevName[2] = item;
                                newName = prevName.join('_');
                                $(label).attr('for', newName);
                            }
                            if ($(label).attr('name')) {
                                prevName = $(label).attr('name').split("_");
                                prevName[2] = item;
                                newName = prevName.join('_');
                                $(label).attr('name', newName);
                                $(label).attr('id', newName);
                            }
                        });
                        var Selects = $(element).find('.lesson-info').find('select');
                        Selects.each(function (index, select) {
                            if ($(select).parents('.vac-settings__block-test').length === 0) {
                                prevName = $(select).attr('name').split("_");
                                prevName[2] = item;
                                newName = prevName.join('_');
                                $(select).attr('name', newName);
                                $(select).attr('id', newName);
                            }
                        });
                        var Textares = $(element).find('.lesson-info').find('textarea');
                        Textares.each(function (index, textarea) {
                            if ($(textarea).parents('.vac-settings__block-test').length === 0) {
                                prevName = $(textarea).attr('name').split("_");
                                prevName[2] = item;
                                newName = prevName.join('_');
                                $(textarea).attr('name', newName);
                                $(textarea).attr('id', newName);
                            }
                        });
                        var Links = $(element).find('.lesson-info').find('.add-inputfile');
                        Links.each(function (index, link) {
                            if ($(link).parents('.vac-settings__block-test').length === 0) {
                                $(link).data('lesson', item);
                            }
                        });
                        $(question).find('.lesson-info').find('.circle-add').attr('data-blockitem', item);
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
                            $(element).find('.answer.input-shdw.lesson-name').attr('id', 'block_' + question_id);
                            $(element).find('.answer.input-shdw.lesson-name').attr('name', 'block_' + question_id);
                            
                            $(element).find('.block-id').attr('id', 'blockid_' + question_id);
                            $(element).find('.block-id').attr('name', 'blockid_' + question_id);
                        }
                        else {
                            Items = $(element).children();
                            Items.each(function (index, item) {
                                if ($(item).find('.table-list').length !== 0 && $(item).find('.answer.input-shdw.lesson-name').attr('name')) {
                                    prevName = $(item).find('.answer.input-shdw.lesson-name').attr('name').split("_");
                                    prevName[1] = question_id;
                                    newName = prevName.join('_');
                                    $(item).find('.answer.input-shdw.lesson-name').attr('id', newName);
                                    $(item).find('.answer.input-shdw.lesson-name').attr('name', newName);
                                }
                                if ($(item).find('.table-list').length !== 0 && $(item).find('.lesson-id').attr('name')) {
                                    prevName = $(item).find('.lesson-id').attr('name').split("_");
                                    prevName[1] = question_id;
                                    newName = prevName.join('_');
                                    $(item).find('.lesson-id').attr('id', newName);
                                    $(item).find('.lesson-id').attr('name', newName);
                                }
                                if (item.hasAttribute('data-question' && $(item).parents('.test-table-constructor').length==0)) {
                                    $(item).attr('data-question', question_id);
                                }
                                if(item.hasAttribute('data-blockitem' && $(item).parents('.test-table-constructor').length>0)){
                                    $(item).attr('data-blockitem', question_id);
                                }
                            });
                        }
                    });
                    var inputs = $(question).find('.lesson-info').find('input');
                    if ($(question).find('.lesson-info').attr('id')) {
                        prevName = $(question).find('.lesson-info').attr('id').split("_");
                        prevName[1] = question_id;
                        newName = prevName.join('_');
                        $(question).find('.lesson-info').attr('id', newName);
                    }
                    $(question).find('.lesson-info').attr('id', 'lesson-info_' + question_id);
                    inputs.each(function (index, input) {
                        if( $(input).attr('name')){
                            prevName = $(input).attr('name').split("_");
                            prevName[1] = question_id;
                            newName = prevName.join('_');
                            $(input).attr('name', newName);
                            $(input).attr('id', newName);    
                        }
                    });
                    var labels = $(question).find('.lesson-info').find('label');
                    labels.each(function (index, label) {
                        if ($(label).attr('for')) {
                            prevName = $(label).attr('for').split("_");
                            prevName[1] = question_id;
                            newName = prevName.join('_');
                            $(label).attr('for', newName);
                        }
                        if ($(label).attr('name')) {
                            prevName = $(label).attr('name').split("_");
                            prevName[1] = question_id;
                            newName = prevName.join('_');
                            $(label).attr('name', newName);
                            $(label).attr('id', newName);
                        }
                    });
                    var Selects = $(question).find('.lesson-info').find('select');
                    Selects.each(function (index, select) {
                        if($(select).attr('name')) {
                            prevName = $(select).attr('name').split("_");
                            prevName[1] = question_id;
                            newName = prevName.join('_');
                            $(select).attr('name', newName);
                            $(select).attr('id', newName);    
                        }
                    });
                    var Textares = $(question).find('.lesson-info').find('textarea');
                    Textares.each(function (index, textarea) {
                        prevName = $(textarea).attr('name').split("_");
                        prevName[1] = question_id;
                        newName = prevName.join('_');
                        $(textarea).attr('name', newName);
                        $(textarea).attr('id', newName);
                    });
                    var Links = $(question).find('.lesson-info').find('.add-inputfile');
                    Links.each(function (index, link) {
                        $(link).data('block', question_id);
                    });
                    $(question).find('.lesson-info').find('.circle-add').attr('data-block', question_id);
                    question_id++;
                }

            });
        }

        //add new question
        $('.vacancy-settings').on('click', '.add-new-question', function () {
            var id_question = 1 + $(this).data('question');
            var newQuestion =
                '<div class="question-cont">' +
                '<div class="custom-table__row flex j-s-b mt-50">' +
                '    <div class="custom-table__cell course-content-name">' +
                '       <div class="course-content-name-cont">' +
                '            <span class="number">' + id_question + '.</span>' +
                '            <input type="text" class="answer input-shdw lesson-name" data-reqired="reqired" value="" id="block_' + id_question + '" name="block_' + id_question + '" placeholder="Введите название блока">' +
                '            <input type="hidden" value="" class="block-id"  id="blockid_' + id_question + '" name="blockid_' + id_question + '"></span>'+
                '       </div>' +
                '        <a href="#" class="circle-add add-answer add-new-question"' +
                '        data-question="' + id_question + '">+</a>' +
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
            $(newQuestion).appendTo($(this).parents('.custom-table__body'));
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
                $('#remove-course-popup h3').html('Вы действительно хотите удалить вопрос «' + $(this).data('name') + '» ?');
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
        $('.remove-popup').on('click', '.submit-remove-course', function () {
            var id = $(this).data('id');
            if ($(this).data('type') == 'question') {
                $('#' + id).parents('.question-cont').remove();
                var id_question = -1 + $('.add-new-question').data('question');
                $('.add-new-question').data('question', id_question);
                RefreshQuestion();
            }
            if ($(this).data('type') == 'item') {
                $('#' + id).parents('.lesson-wrap').remove();
                var id_item = -1 + $('#' + id).parents('.question-item-cont').find('.add-new-item').data('item');
                $('#' + id).parents('.question-item-cont').find('.add-new-item').data('item', id_item);
                RefreshItems();
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
                            url: "/corporate/constructor-courses/delete-material",
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
        });
        //delete questions item
        $('.vacancy-settings').on('click', '.delete-item', function () {
            var id_item = $(this).parents('.lesson-wrap').find('.table-list .answer.input-shdw.lesson-name').attr('id');
            $('#remove-course-popup .submit-remove-course').data('id', id_item);
            $('#remove-course-popup .submit-remove-course').data('type', 'item');
            if ($(this).parents('.custom-table__row').find('.table-list input').val().length > 0) {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить ответ на вопрос «' + $(this).parents('.custom-table__row').find('.table-list input').val() + '» ?');
            }
            else {
                $('#remove-course-popup h3').html('Вы действительно хотите удалить ответ на вопрос?');
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
            var id_item = 1 + parseInt($(this).attr('data-item'));
            var id_question = parseInt($(this).attr('data-question'));
            var newItem =
                '<div class="lesson-wrap">' +
                '<div class="custom-table__row flex j-s-b">' +
                '    <div class="custom-table__cell">' +
                '        <span class="table-list"><input type="text" class="answer input-shdw lesson-name" data-reqired="reqired" value="" id="lesson_' + id_question + '_' + id_item + '" name="lesson_' + id_question + '_' + id_item + '" placeholder="Введите название вопроса">' +
                '        <input type="hidden" value="" class="lesson-id"  id="lessonid_' + id_question + '_' + id_item + '" name="lessonid_' + id_question + '_' + id_item + '"></span>'+
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
                '    <div class="vac-settings__block-content">' +
                '        <div class="upload-field-wrap">' +
                '            <div class="upload-logo upload-lesson">' +
                '                <div class="input-group">' +
                '                    <input id="file-input_' + id_question + '_' + id_item + '" type="file" name="file-input_' + id_question + '_' + id_item + '">' +
                '                    <label for="file-input_' + id_question + '_' + id_item + '" id="file-label_' + id_question + '" name="file-label_' + id_question + '_' + id_item + '">' +
                '                        <img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png">' +
                '                    </label>' +
                '                </div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '    <div class="vac-settings__block-content">' +
                '            <div class="input-group  youtube-link">' +
                '                <input type="text" class="input-shdw" name="youtube-link_' + id_question + '_' + id_item + '"' +
                '                    placeholder="Укажите ссылку на видео с сервиса YouTube">' +
                '            </div>' +
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
                '        <div class="course-materials-wrap">' +
                '        <div class="inputs-wrap">' +
                '            <div class="input-group">' +
                '                <input type="text" class="input-shdw" name="course-materials_' + id_question + '_' + id_item + '_1"' +
                '                    placeholder="Укажите название документа рекомендованного к изучению, напр. «статья/книга/чек-лист» и т.д.">' +
                '            </div>' +
                '            <div class="upload-field-wrap">' +
                '                <div class="upload-logo upload-lesson">' +
                '                   <div class="input-group">' +
                '                        <input id="file-materials_' + id_question + '_' + id_item + '_1" type="file" name="file-materials_' + id_question + '_' + id_item + '_1">' +
                '                        <label for="file-materials_' + id_question + '_' + id_item + '_1" id="label-file-materials_' + id_question + '_' + id_item + '_1"  name="label-file-materials_' + id_question + '_' + id_item + '_1">' +
                '                            <img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png">' +
                '                        </label>' +
                '                    </div>' +
                '                </div>' +
                '            </div>' +
                '             </div>' +
                '                <a href="#remove-course-popup" title="Delete"' +
                '                    class="delete-input-file">' +
                '                    <img src="../../../img/corp/icons/trash.png"' +
                '                        alt="Delete">' +
                '                </a>' +
                '            </div>' +
                '            <a href="#" class="circle-add add-answer add-inputfile" data-inputfile="1" data-lesson="' + id_item + '" data-block="' + id_question + '">+</a>' +
                '        </div>' +
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
                '       </div>' +
                '   </div>' +
                '</div>';
            $(this).attr('data-item', id_item);
            $(newItem).insertBefore($(this));
            $('.vac-test__descr select').customSelect();
        });
        $('.vacancy-settings').on('click', '.edit-lesson', function () {
            if ($(this).parents('.lesson-wrap').find('.lesson-info').is(':visible')) {
                $(this).parents('.lesson-wrap').find('.lesson-info').fadeOut();
            }
            else {
                $(this).parents('.lesson-wrap').find('.lesson-info').fadeIn();
            }
        })
    });
});