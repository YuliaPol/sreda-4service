jQuery(function ($) {
    $(document).ready(function () {
        $('.vacancy-settings').on('change', '.lesson-info .upload-logo .input-group input', function () {
            if (this.files[0]) // если выбрали файл
            {
                $(this).next('label').html(this.files[0].name + '<img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png">');
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
                            $(element).find('.answer.input-shdw.lesson-name').attr('id', 'new_question_' + question_id);
                            $(element).find('.answer.input-shdw.lesson-name').attr('name', 'new_question_' + question_id);
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
                                if (item.hasAttribute('data-question')) {
                                    $(item).attr('data-question', question_id);
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
                '<div class="question-cont"">' +
                '<div class="custom-table__row flex j-s-b mt-50">' +
                '    <div class="custom-table__cell course-content-name">' +
                '       <div class="course-content-name-cont">' +
                '            <span class="number">' + id_question + '.</span>' +
                '            <input type="text" class="answer input-shdw lesson-name" data-reqired="reqired" value="" id="new_question_' + id_question + '" name="new_question_' + id_question + '" placeholder="Введите название блока">' +
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
            console.log($(this).parents('.question-cont'));
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
                console.log(id);
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
                console.log(id);
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
                '        <span class="table-list"><input type="text" class="answer input-shdw lesson-name" data-reqired="reqired" value="" id="new-item_' + id_question + '_' + id_item + '" name="new-item_' + id_question + '_' + id_item + '" placeholder="Введите название вопроса"></span>' +
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
                '            <textarea placeholder="Введите информацию об уроке" name="info-lesson_' + id_question + '_' + id_item + '"></textarea>' +
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
                '    <div class="vac-settings__block">' +
                '    <h4 class="title tools-title">' +
                '        Тест' +
                '        <div class="vac-tools">' +
                '            <div class="input-group">' +
                '                <input type="checkbox" class="checkbox lessons-test"' +
                '                    name="lesson-test_' + id_question + '_' + id_item + '" id="lesson-test_' + id_question + '_' + id_item + '"/>' +
                '                <label for="lesson-test_' + id_question + '_' + id_item + '"></label>' +
                '            </div>' +
                '        </div>' +
                '    </h4>' +
                '    <div class="vac-settings__block-content" style="display: none;">' +
                '        <div class="course-test-settings">' +
                '            <div class="vac-test__descr">' +
                '                <p>Ограничить время прохождения теста</p>' +
                '                <div class="form-group field-testdata-time_limit">' +
                '                    <select id="testdata-time_limit" class="form-control" name="TestData_' + id_question + '_' + id_item + '[time_limit]" >' +
                '                        <option value="0">10:00</option>' +
                '                        <option value="1">15:00</option>' +
                '                        <option value="2">20:00</option>' +
                '                        <option value="3">30:00</option>' +
                '                    </select>' +
                '                    <div class="help-block"></div>' +
                '                </div>' +
                '                <div class="design-content__row">' +
                '                    <label class="test-radio">' +
                '                        <input type="checkbox" name="TestData_' + id_question + '_' + id_item + '[shufle_answers]">' +
                '                        <div class="test-radio__answer">' +
                '                            <span class="answer">Перемешать ответы</span>' +
                '                        </div>' +
                '                    </label>' +
                '                </div>' +
                '                <p>Минимальный результат прохождения</p>' +
                '                <div class="form-group field-testdata-min_result">' +
                '                    <select id="testdata-min_result" class="form-control" name="TestData_' + id_question + '_' + id_item + '[min_result]">' +
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
                '                    <select id="testdata-repeat_probes" class="form-control" name="TestData_' + id_question + '_' + id_item + '[repeat_probes]">' +
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
                '                    <select id="testdata-completeness" class="form-control" name="TestData_' + id_question + '_' + id_item + '[completeness]">' +
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
                '                <textarea id="testdata-description" class="form-control" name="TestData_' + id_question + '_' + id_item + '[description]"' +
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
                '                <div class="custom-table__body">' +
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
                '                                id="section_' + id_question + '_' + id_item + '_1" name="section_' + id_question + '_' + id_item + '_1">' +
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
                '        </div>' +
                '    </div>' +
                '</div>' +
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