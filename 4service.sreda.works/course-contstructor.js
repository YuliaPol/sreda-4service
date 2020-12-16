jQuery(function ($) {
    $(document).ready(function () {
        //Upload image as test answer
        $('.content-container').on('change', '.test-answer', function (e) {
                let elemId = $(this).attr('id'),
                arr = elemId.split("_");
                arr[0] = "item";
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

        //drag question
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
        function RefreshQuestionCostructor(event) {
            if($(event.target).parents('.test-table-constructor').parents('.lesson-info').length>0){
                if($(event.target)){
                    var questions = 0;
                    var Sections = $(event.target).parents('.test-table-constructor').find('.custom-table__body');
                    Sections.each(function (index, section) {
                        questions = 0;
                        var Questions = $(section).children();
                        Questions.each(function (index, element) {
                            var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                            if (numbers[1]) {
                                questions++;
                                numbers[1] = questions;
                                $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                            }
                            var inputs = $(element).find('input');
                            inputs.each(function (index, input) {
                                prevName = $(input).attr('name').split("_");
                                prevName[4] = questions;
                                newName = prevName.join('_');
                                $(input).attr('name', newName);
                                $(input).attr('id', newName);
                            });
                            var labels = $(element).find('label');
                            labels.each(function (index, label) {
                                if($(label).attr('for')){
                                    prevName = $(label).attr('for').split("_");
                                    prevName[4] = questions;
                                    newName = prevName.join('_');
                                    $(label).attr('for', newName);
                                }
                            });
                            var Selects = $(element).find('select');
                            Selects.each(function (index, select) {
                                prevName = $(select).attr('name').split("_");
                                prevName[4] = questions;
                                newName = prevName.join('_');
                                $(select).attr('name', newName);
                                $(select).attr('id', newName);
                            });
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
                    Sections.each(function (index, section) {
                        questions = 0;
                        var Questions = $(section).children();
                        Questions.each(function (index, element) {
                            var numbers = $(element).find('.input-cont-constructor-test span').text().split('/');
                            if (numbers[1]) {
                                questions++;
                                numbers[1] = questions;
                                $(element).find('.input-cont-constructor-test span').html(numbers.join('/'));
                            }
                            var inputs = $(element).find('input');
                            inputs.each(function (index, input) {
                                prevName = $(input).attr('name').split("_");
                                prevName[2] = questions;
                                newName = prevName.join('_');
                                $(input).attr('name', newName);
                                $(input).attr('id', newName);
                            });
                            var labels = $(element).find('label');
                            labels.each(function (index, label) {
                                if($(label).attr('for')){
                                    prevName = $(label).attr('for').split("_");
                                    prevName[2] = questions;
                                    newName = prevName.join('_');
                                    $(label).attr('for', newName);
                                }
                            });
                            var Selects = $(element).find('select');
                            Selects.each(function (index, select) {
                                prevName = $(select).attr('name').split("_");
                                prevName[2] = questions;
                                newName = prevName.join('_');
                                $(select).attr('name', newName);
                                $(select).attr('id', newName);
                            });
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
        }
        $('.test-table-constructor select').customSelect();
        //add  questions item (radio)
        $('.content-container').on('click', '.add-questions-item', function () {
            var section = $(this).attr('data-section');
            var question = $(this).attr('data-question');
            var item = 1 + parseInt($(this).attr('data-item'));
            var block = parseInt($(this).attr('data-block'));
            var blockItem = parseInt($(this).attr('data-blockitem'));
            if(block && blockItem){
                var newItem =
                '<li class="test-radio">' +
                '    <div class="test-radio__answer"></div>' +
                '    <label>' +
                '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="item_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '" id="item_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '">' +
                '    </label>' +
                '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired"  name="itemScore_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '" id="itemScore_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '">' +
                '</li>';
                var newInputfile = 
                '<div class="upload-answer">'+
                '    <div class="input-group">'+
                '        <input id="file-name_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '" type="file" name="file-name_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '" class="test-answer">'+
                '        <label for="file-name_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                '    </div>'+
                '    <a href="#" title="Delete" class="delete-test-questions-item">'+
                '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                '    </a>'+
                '</div>';

            }
            else {
                var newItem =
                '<li class="test-radio">' +
                '    <div class="test-radio__answer"></div>' +
                '    <label>' +
                '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="item_' + section + '_' + question + '_' + item + '" id="item_' + section + '_' + question + '_' + item + '">' +
                '    </label>' +
                '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired"  name="itemScore_' + section + '_' + question + '_' + item + '" id="itemScore_' + section + '_' + question + '_' + item + '">' +
                '</li>';
            var newInputfile = 
            '<div class="upload-answer">'+
            '    <div class="input-group">'+
            '        <input id="file-name_' + section + '_' + question + '_' + item + '" type="file" name="file-name_' + section + '_' + question + '_' + item + '" class="test-answer">'+
            '        <label for="file-name_' + section + '_' + question + '_' + item + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
            '    </div>'+
            '    <a href="#" title="Delete" class="delete-test-questions-item">'+
            '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
            '    </a>'+
            '</div>';

            }
            $(this).attr('data-item', item);
            $(newItem).appendTo($(this).parents('.custom-table__cell').find('.custom-table-test-list'));
            // $(newItem).insertBefore($(this));
            $(newInputfile).appendTo($(this).parents('.custom-table__cell').next('.custom-table__cell'));
        });
        //add  questions item (check)
        $('.content-container').on('click', '.add-questions-item-check', function () {
            var section = $(this).attr('data-section');
            var question = $(this).attr('data-question');
            var item = 1 + parseInt($(this).attr('data-item'));
            var block = parseInt($(this).attr('data-block'));
            var blockItem = parseInt($(this).attr('data-blockitem'));
            if(block && blockItem){
                var newItem =
                '<li class="test-radio">' +
                '    <div class="test-radio__answer"></div>' +
                '    <label>' +
                '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="item_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '" id="item_'+ block + '_' + blockItem + '_'  + section + '_' + question + '_' + item + '">' +
                '    </label>' +
                '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_'+ block + '_' + blockItem + '_' + section + '_' + question + '_' + item + '" id="itemScore_'+ block + '_' + blockItem + '_'  + section + '_' + question + '_' + item + '">' +
                '</li>';
                var newInputfile = 
                '<div class="upload-answer">'+
                '    <div class="input-group">'+
                '        <input id="file-name_'+ block + '_' + blockItem + '_'  + section + '_' + question + '_' + item + '" type="file" name="file-name_'+ block + '_' + blockItem + '_'  + section + '_' + question + '_' + item + '" class="test-answer">'+
                '        <label for="file-name_'+ block + '_' + blockItem + '_'  + section + '_' + question + '_' + item + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                '    </div>'+
                '    <a href="#" title="Delete" class="delete-test-questions-item">'+
                '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                '    </a>'+
                '</div>';
            }
            else {
                var newItem =
                '<li class="test-radio">' +
                '    <div class="test-radio__answer"></div>' +
                '    <label>' +
                '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="item_' + section + '_' + question + '_' + item + '" id="item_' + section + '_' + question + '_' + item + '">' +
                '    </label>' +
                '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + section + '_' + question + '_' + item + '" id="itemScore_' + section + '_' + question + '_' + item + '">' +
                '</li>';
                var newInputfile = 
                '<div class="upload-answer">'+
                '    <div class="input-group">'+
                '        <input id="file-name_' + section + '_' + question + '_' + item + '" type="file" name="file-name_' + section + '_' + question + '_' + item + '" class="test-answer">'+
                '        <label for="file-name_' + section + '_' + question + '_' + item + '"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                '    </div>'+
                '    <a href="#" title="Delete" class="delete-test-questions-item">'+
                '        <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                '    </a>'+
                '</div>';
            }
            $(this).attr('data-item', item);
            $(newItem).appendTo($(this).parents('.custom-table__cell').find('.custom-table-test-list'));
            $(newInputfile).appendTo($(this).parents('.custom-table__cell').next('.custom-table__cell'));
        });
        //add  question
        $('.content-container').on('click', '.add-chapter-question', function () {
            var section = $(this).attr('data-section');
            var question = 1 + parseInt($(this).attr('data-question'));
            var block = parseInt($(this).attr('data-block'));
            var blockItem = parseInt($(this).attr('data-blockitem'));
            var newQuestion;
            if(section && question && block && blockItem ){
                newQuestion =
                    '<div class="custom-table__row custom-table__edit-row flex j-s-b">' +
                    '    <div class="custom-table__cell">' +
                    '        <div class="input-group">' +
                    '            <div class="input-cont-constructor-test">' +
                    '            <span>' + section + '/' + question + '.</span>' +
                    '            <input type="text" placeholder="Введите ваш вопрос" data-reqired="reqired" class="input-shdw" id="question_' + block + '_' + blockItem + '_' + section + '_' + question + '" name="question_' + block + '_' + blockItem + '_' + section + '_' + question + '">' +
                    '            </div>' +
                    '            <p class="alert-error" style="display: none;">Заполните, пожалуйста, поле..</p>' +
                    '        </div>' +
                    '        <div class="input-group">' +
                    '            <input type="text" placeholder="Описание вопроса (необязательно)" class="input-shdw"  id="questionDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '" name="questionDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '">' +
                    '        </div>' +
                    '    </div>' +
                    '    <div class="custom-table__cell">' +
                    '        <select id="typeQuestion_' + block + '_' + blockItem + '_' + section + '_' + question + '" name="typeQuestion_' + block + '_' + blockItem + '_' + section + '_' + question + '">' +
                    '            <option value="0" selected>Один из списка</option>' +
                    '            <option value="1">Множественный выбор</option>' +
                    '            <option value="2">Шкала</option>' +
                    '            <option value="3">Закрытый "Да\Нет"</option>' +
                    '            <option value="4">Открытый вопрос</option>' +
                    '        </select>' +
                    '    </div>' +
                    '    <div class="custom-table__cell">' +
                    '    <ul class="custom-table-test-list">'+
                    '        <li class="test-radio">' +
                    '            <div class="test-radio__answer"></div>' +
                    '            <label>' +
                    '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired" name="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" placeholder="Введите вариант ответа">' +
                    '            </label>' +
                    '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1">' +
                    '        </li>' +
                    '        <li class="test-radio">' +
                    '            <div class="test-radio__answer"></div>' +
                    '            <label>' +
                    '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired"  name="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" placeholder="Введите вариант ответа">' +
                    '            </label>' +
                    '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2">' +
                    '        </li>' +
                    '        </ul>' +
                    '        <a href="#" class="circle-add add-answer add-questions-item" data-block="' + block + '" data-blockitem="' + blockItem + '" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>' +
                    '    </div>' +
                    '     <div class="custom-table__cell">' +
                    '       <div class="upload-answer">'+
                    '           <div class="input-group">'+
                    '                <input id="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" type="file" name="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" class="test-answer">'+
                    '               <label for="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '            <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '            </a>'+
                    '       </div>' +
                    '       <div class="upload-answer">'+
                    '            <div class="input-group">'+
                    '                <input id="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" type="file" name="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" class="test-answer">'+
                    '               <label for="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
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
                    if(question == 1 ){
                        console.log(question);
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
                    '            <input type="text" placeholder="Описание вопроса (необязательно)" class="input-shdw"  id="questionDesc_' + section + '_' + question + '" name="questionDesc_' + section + '_' + question + '">' +
                    '        </div>' +
                    '    </div>' +
                    '    <div class="custom-table__cell">' +
                    '        <select id="typeQuestion_' + section + '_' + question + '" name="typeQuestion_' + section + '_' + question + '">' +
                    '            <option value="0" selected>Один из списка</option>' +
                    '            <option value="1">Множественный выбор</option>' +
                    '            <option value="2">Шкала</option>' +
                    '            <option value="3">Закрытый "Да\Нет"</option>' +
                    '            <option value="4">Открытый вопрос</option>' +
                    '        </select>' +
                    '    </div>' +
                    '    <div class="custom-table__cell">' +
                    '    <ul class="custom-table-test-list">'+
                    '        <li class="test-radio">' +
                    '            <div class="test-radio__answer"></div>' +
                    '            <label>' +
                    '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired" name="item_' + section + '_' + question + '_1" id="item_' + section + '_' + question + '_1" placeholder="Введите вариант ответа">' +
                    '            </label>' +
                    '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + section + '_' + question + '_1" id="itemScore_' + section + '_' + question + '_1">' +
                    '        </li>' +
                    '        <li class="test-radio">' +
                    '            <div class="test-radio__answer"></div>' +
                    '            <label>' +
                    '                <input type="text" class="answer input-shdw" value="" data-reqired="reqired"  name="item_' + section + '_' + question + '_2" id="item_' + section + '_' + question + '_2" placeholder="Введите вариант ответа">' +
                    '            </label>' +
                    '            <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + section + '_' + question + '_2" id="itemScore_' + section + '_' + question + '_2">' +
                    '        </li>' +
                    '        </ul>' +
                    '        <a href="#" class="circle-add add-answer add-questions-item" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>' +
                    '    </div>' +
                    '     <div class="custom-table__cell">' +
                    '       <div class="upload-answer">'+
                    '           <div class="input-group">'+
                    '                <input id="file-name_' + section + '_' + question + '_1" type="file" name="file-name_' + section + '_' + question + '_1" class="test-answer">'+
                    '               <label for="file-name_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                    '           </div>'+
                    '            <a href="#" title="Delete" class="delete-test-questions-item">'+
                    '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                    '            </a>'+
                    '       </div>' +
                    '       <div class="upload-answer">'+
                    '            <div class="input-group">'+
                    '                <input id="file-name_' + section + '_' + question + '_2" type="file" name="file-name_' + section + '_' + question + '_2" class="test-answer">'+
                    '               <label for="file-name_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
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
                if(question == 1 ){
                    console.log(question);
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
                }
            }
        });
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
            var block = parseInt($(this).attr('data-block'));
            var blockItem = parseInt($(this).attr('data-blockitem'));
            if(block && blockItem){
                section = $(this).parents('.lesson-info .custom-table__body').find('.add-chapter-question').attr('data-question');
                var newChapter =
                '<div class="custom-table__body">' +
                '    <div class="custom-table__row flex j-s-b">' +
                '        <h4 class="title add-chapter">' +
                '            <a href="#" class="circle-add add-chapter-constructor" data-block="'+ block +'" data-blockitem="'+ blockItem +'">' +
                '                <img src="../../../img/corp/icons/chapter-img02.png" alt="">' +
                '             </a>' +
                '             <div class="title">' +
                '               <span>Раздел ' + section + ': </span>' +
                '               <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="«Название»" id="section_' + block + '_' + blockItem + '_' + section + '" name="section_' + block + '_' + blockItem + '_' + section + '">' +
                '              </div>' +
                '              <div class="delete-chapter-cont">' +
                '               <a href="#" title="Delete" class="delete-chapter">' +
                '                   <img src="../../../img/corp/icons/trash.png" alt="Delete">' +
                '               </a>' +
                '              </div>' +
                '         </h4>' +
                '    </div>' +
                '    <a href="#" class="circle-add add-chapter-question" data-block="'+ block +'" data-blockitem="'+ blockItem +'" data-section="' + section + '" data-question="0">+</a>' +
                '</div>';
                $(newChapter).insertAfter($(this).parents('.lesson-info .custom-table__body'));
                console.log(section);
                section = 1;
                var Sections = $(this).parents('.lesson-info').find('.test-table-constructor').find('.custom-table__body');
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
                            prevName[3] = section;
                            newName = prevName.join('_');
                            $(input).attr('name', newName);
                            $(input).attr('id', newName);
                        });
                        var labels = $(element).find('label');
                        labels.each(function (index, label) {
                            if($(label).attr('for')){
                                prevName = $(label).attr('for').split("_");
                                prevName[3] = section;
                                newName = prevName.join('_');
                                $(label).attr('for', newName);
                            }
                        });
                        var Selects = $(element).find('select');
                        Selects.each(function (index, select) {
                            prevName = $(select).attr('name').split("_");
                            prevName[3] = section;
                            newName = prevName.join('_');
                            $(select).attr('name', newName);
                            $(select).attr('id', newName);
                        });
                        var Links = $(element).find('.add-questions-item');
                        Links.each(function (index, link) {
                            $(link).attr('data-section', section);
                        });

                        var Links2 = $(element).find('.add-questions-item-check');
                        Links2.each(function (index, link) {
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
                '               <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="«Название»" id="section_' + section + '" name="section_' + section + '">' +
                '              </div>' +
                '              <div class="delete-chapter-cont">' +
                '               <a href="#" title="Delete" class="delete-chapter">' +
                '                   <img src="../../../img/corp/icons/trash.png" alt="Delete">' +
                '               </a>' +
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
                        var Links2 = $(element).find('.add-questions-item-check');
                        Links2.each(function (index, link) {
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
        });
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
                console.log(nameQuestion);
                var newQuestion;
                if ($(this).val() == 0)
                {
                    newQuestion =
                        '<ul class="custom-table-test-list">'+
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="Введите вариант ответа" name="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_1">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1">' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="item_' + section + '_' + question + '_2" id="item_' + section + '_' + question + '_2">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2">' +
                        '</li>' +
                        '</ul>' +
                        '<a href="#" class="circle-add add-answer add-questions-item" data-block="' + block + '" data-blockitem="' + blockItem + '" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                        newInputfile = 
                        '       <div class="upload-answer">'+
                        '           <div class="input-group">'+
                        '                <input id="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" type="file" name="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" class="test-answer">'+
                        '               <label for="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '            <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '            </a>'+
                        '       </div>' +
                        '       <div class="upload-answer">'+
                        '            <div class="input-group">'+
                        '                <input id="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" type="file" name="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" class="test-answer">'+
                        '               <label for="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
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
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_1">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1">' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="item_' + block + '_' + blockItem + '_' + section + '_' + question + '_2">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2">' +
                        '</li>' +
                        '</ul>'+
                        '<a href="#" class="circle-add add-answer add-questions-item-check" data-block="' + block + '" data-blockitem="' + blockItem + '" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                        newInputfile = 
                        '       <div class="upload-answer">'+
                        '           <div class="input-group">'+
                        '                <input id="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" type="file" name="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" class="test-answer">'+
                        '               <label for="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '               <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '            </a>'+
                        '       </div>' +
                        '       <div class="upload-answer">'+
                        '            <div class="input-group">'+
                        '                <input id="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" type="file" name="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" class="test-answer">'+
                        '               <label for="file-name_' + block + '_' + blockItem + '_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '              <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '           </a>'+
                        '       </div>';
                }
                if ($(this).val() == 2) {
                    newQuestion =
                        '<div class="input-group test-scale">' +
                        '    <span>От <input type="number" min="1" max="10" value="1" name="questionScale_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="questionScale_' + block + '_' + blockItem + '_' + section + '_' + question + '_1"></span>' +
                        '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + section + '_' + question + '_1" id="questionScaleDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '_1">' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" data-reqired="reqired" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1">' +
                        '</div>' +
                        '<div class="input-group test-scale">' +
                        '    <span>До <input type="number" min="1" max="10" value="10" name="questionScale_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="questionScale_' + block + '_' + blockItem + '_' + section + '_' + question + '_2"></span>' +
                        '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="questionScaleDesc_' + block + '_' + blockItem + '_' + section + '_' + question + '_2">' +
                        '    <input class="scores input-shdw" type="text" data-reqired="reqired" value="10" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2">' +
                        '</div>';
                        newInputfile = ' ';
                }
                if ($(this).val() == 3) {
                    newQuestion =
                        '<ul class="custom-table-test-list">'+
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer answer-yes_not"><span class="answer">Да</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="0" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_1"></div>' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer answer-yes_not"><span class="answer">Нет</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="100" name="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2" id="itemScore_' + block + '_' + blockItem + '_' + section + '_' + question + '_2"></div>' +
                        '</li>'+
                        '</ul>';
                        newInputfile = ' ';
                }
                if ($(this).val() == 4) {
                    newQuestion =
                        '<div class="input-group">' +
                        '    <label>' +
                        '        <select id="item_' + block + '_' + blockItem + '_' + section + '_' + question + '"'+
                        '            name="item_' + block + '_' + blockItem + '_' + section + '_' + question + '" style="display: none;" class="input-shdw answer open-question">'+
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
                        '        <input type="text" class="answer input-shdw" value="" data-reqired="reqired" placeholder="Введите вариант ответа" name="item_' + section + '_' + question + '_1" id="item_' + section + '_' + question + '_1">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + section + '_' + question + '_1" id="itemScore_' + section + '_' + question + '_1">' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" value="" placeholder="Введите вариант ответа" name="item_' + section + '_' + question + '_2" id="item_' + section + '_' + question + '_2">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + section + '_' + question + '_2" id="itemScore_' + section + '_' + question + '_2">' +
                        '</li>' +
                        '</ul>' +
                        '<a href="#" class="circle-add add-answer add-questions-item" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                        newInputfile = 
                        '       <div class="upload-answer">'+
                        '           <div class="input-group">'+
                        '                <input id="file-name_' + section + '_' + question + '_1" type="file" name="file-name_' + section + '_' + question + '_1" class="test-answer">'+
                        '               <label for="file-name_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '            <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '                <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '            </a>'+
                        '       </div>' +
                        '       <div class="upload-answer">'+
                        '            <div class="input-group">'+
                        '                <input id="file-name_' + section + '_' + question + '_2" type="file" name="file-name_' + section + '_' + question + '_2" class="test-answer">'+
                        '               <label for="file-name_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
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
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="item_' + section + '_' + question + '_1" id="item_' + section + '_' + question + '_1">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + section + '_' + question + '_1" id="itemScore_' + section + '_' + question + '_1">' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer"></div>' +
                        '    <label>' +
                        '        <input type="text" class="answer input-shdw" data-reqired="reqired" placeholder="Введите вариант ответа" name="item_' + section + '_' + question + '_2" id="item_' + section + '_' + question + '_2">' +
                        '    </label>' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" name="itemScore_' + section + '_' + question + '_2" id="itemScore_' + section + '_' + question + '_2">' +
                        '</li>' +
                        '</ul>'+
                        '<a href="#" class="circle-add add-answer add-questions-item-check" data-section="' + section + '" data-question="' + question + '" data-item="2">+</a>';
                        newInputfile = 
                        '       <div class="upload-answer">'+
                        '           <div class="input-group">'+
                        '                <input id="file-name_' + section + '_' + question + '_1" type="file" name="file-name_' + section + '_' + question + '_1" class="test-answer">'+
                        '               <label for="file-name_' + section + '_' + question + '_1"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '               <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '            </a>'+
                        '       </div>' +
                        '       <div class="upload-answer">'+
                        '            <div class="input-group">'+
                        '                <input id="file-name_' + section + '_' + question + '_2" type="file" name="file-name_' + section + '_' + question + '_2" class="test-answer">'+
                        '               <label for="file-name_' + section + '_' + question + '_2"><img class="upload-image" src="../../../img/corp/icons/download-arrow_blue.png"></label>'+
                        '           </div>'+
                        '           <a href="#" title="Delete" class="delete-test-questions-item">'+
                        '              <img src="../../../img/corp/icons/trash.png" alt="Delete">'+
                        '           </a>'+
                        '       </div>';
                }
                if ($(this).val() == 2) {
                    newQuestion =
                        '<div class="input-group test-scale">' +
                        '    <span>От <input type="number" min="1" max="10" value="1" name="questionScale_' + section + '_' + question + '_1" id="questionScale_' + section + '_' + question + '_1"></span>' +
                        '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + section + '_' + question + '_1" id="questionScaleDesc_' + section + '_' + question + '_1">' +
                        '    <input class="scores input-shdw" type="text" value="0" data-reqired="reqired" data-reqired="reqired" name="itemScore_' + section + '_' + question + '_1" id="itemScore_' + section + '_' + question + '_1">' +
                        '</div>' +
                        '<div class="input-group test-scale">' +
                        '    <span>До <input type="number" min="1" max="10" value="10" name="questionScale_' + section + '_' + question + '_2" id="questionScale_' + section + '_' + question + '_2"></span>' +
                        '    <input type="text" class="input-shdw answer" placeholder="Подпись (необязательно)" name="questionScaleDesc_' + section + '_' + question + '_2" id="questionScaleDesc_' + section + '_' + question + '_2">' +
                        '    <input class="scores input-shdw" type="text" data-reqired="reqired" value="10" name="itemScore_' + section + '_' + question + '_2" id="itemScore_' + section + '_' + question + '_2">' +
                        '</div>';
                        newInputfile = ' ';
                }
                if ($(this).val() == 3) {
                    newQuestion =
                        '<ul class="custom-table-test-list">'+
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer answer-yes_not"><span class="answer">Да</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="0" name="itemScore_' + section + '_' + question + '_1" id="itemScore_' + section + '_' + question + '_1"></div>' +
                        '</li>' +
                        '<li class="test-radio">' +
                        '    <div class="test-radio__answer answer-yes_not"><span class="answer">Нет</span><input class="scores input-shdw" data-reqired="reqired" type="text" value="100" name="itemScore_' + section + '_' + question + '_2" id="itemScore_' + section + '_' + question + '_2"></div>' +
                        '</li>'+
                        '</ul>';
                        newInputfile = ' ';
                }
                if ($(this).val() == 4) {
                    newQuestion =
                        '<div class="input-group">' +
                        '    <label>' +
                        '        <select id="item_' + section + '_' + question + '"'+
                        '            name="item_' + section + '_' + question + '" style="display: none;" class="input-shdw answer open-question">'+
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
                        if(parseInt($(itemElement).find('.answer').attr('name').split("_")[5])>itemId){
                            var prevName = $(itemElement).find('.answer').attr('name').split("_");
                            prevName[5] = prevName[5] - 1;
                            newName = prevName.join('_');
                            $(itemElement).find('.answer').attr('id', newName);
                            $(itemElement).find('.answer').attr('name', newName);
    
                            var prevName = $(itemElement).find('.scores').attr('name').split("_");
                            prevName[5] = prevName[5] - 1;
                            newName = prevName.join('_');
                            $(itemElement).find('.scores').attr('id', newName);
                            $(itemElement).find('.scores').attr('name', newName);
    
                        }
                        
                    });
                    var fileElements = $('#' + childId).parents('.custom-table__cell').find('.upload-answer');
                    removeElement = 0;
                    fileElements.each(function (index, fileElement) {
                        if(parseInt($(fileElement).find('.test-answer').attr('name').split("_")[5])==itemId && removeElement == 0){
                            $(fileElement).remove();
                            removeElement = 1;
                        }
                        if(parseInt($(fileElement).find('.test-answer').attr('name').split("_")[5])>itemId){
                            var prevName = $(fileElement).find('.test-answer').attr('name').split("_");
                            prevName[5] = prevName[5] - 1;
                            newName = prevName.join('_');
                            $(fileElement).find('.test-answer').attr('id', newName);
                            $(fileElement).find('.test-answer').attr('name', newName);
    
                            var prevName = $(fileElement).find('label').attr('for').split("_");
                            prevName[5] = prevName[5] - 1;
                            newName = prevName.join('_');
                            $(fileElement).find('label').attr('for', newName);
                        }                    
                    });
                    var item = -1 + parseInt( $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.add-questions-item').attr('data-item'));
                    $('#' + childId).parents('.custom-table__cell').prev('.custom-table__cell').find('.add-questions-item').attr('data-item', item);    
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
                        var inputs = $(element).find('input');
                        inputs.each(function (index, input) {
                            if($(input).attr('name')){
                                prevName = $(input).attr('name').split("_");
                                prevName[4] = prevName[4] - 1;
                                newName = prevName.join('_');
                                $(input).attr('name', newName);
                                $(input).attr('id', newName);
                            }
                        });
                        var labels = $(element).find('label');
                        labels.each(function (index, label) {
                            if($(label).attr('for')){
                                prevName = $(label).attr('for').split("_");
                                prevName[4] = prevName[4] - 1;
                                newName = prevName.join('_');
                                $(label).attr('for', newName);
                            }
                        });
                        var Selects = $(element).find('select');
                        Selects.each(function (index, select) {
                            if($(select).attr('name')){
                                prevName = $(select).attr('name').split("_");
                                prevName[4] = prevName[4] - 1;
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
                    });
                    $('#' + childId).parents('.custom-table__row').remove();
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
                    });
                    $('#' + childId).parents('.custom-table__row').remove();
                }
            }
            if($(this).data('type') == 'chapter') {
                if($('#' + childId).parents('.lesson-info').length>0){
                    section = 1;
                    var removesection = 0;
                    var Sections = $('#' + childId).parents('.lesson-info').find('.test-table-constructor').find('.custom-table__body');
                    Sections.each(function (index, section_el) {
                        if(section === parseInt($('#' + childId).parents('.lesson-info .custom-table__body').find('.title .answer').attr('name').split("_")[3]) && removesection===0){
                            removesection = 1;
                            console.log('remove')
                        }
                        else {
                            console.log('section');
                            console.log(section);
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
                                    prevName[3] = section;
                                    newName = prevName.join('_');
                                    $(input).attr('name', newName);
                                    $(input).attr('id', newName);
                                });
                                var labels = $(element).find('label');
                                labels.each(function (index, label) {
                                    if($(label).attr('for')){
                                        prevName = $(label).attr('for').split("_");
                                        prevName[3] = section;
                                        newName = prevName.join('_');
                                        $(label).attr('for', newName);
                                    }
                                });
                                var Selects = $(element).find('select');
                                Selects.each(function (index, select) {
                                    prevName = $(select).attr('name').split("_");
                                    prevName[3] = section;
                                    newName = prevName.join('_');
                                    $(select).attr('name', newName);
                                    $(select).attr('id', newName);
                                });
                                var Links = $(element).find('.add-questions-item');
                                Links.each(function (index, link) {
                                    $(link).attr('data-section', section);
                                });
                                var Links2 = $(element).find('.add-questions-item-check');
                                Links2.each(function (index, link) {
                                    $(link).attr('data-question', section);
                                });
                            });
                            var Links = $(section_el).find('.add-chapter-question');
                            Links.each(function (index, link) {
                                $(link).attr('data-section', section);
                            });
                            section++;
                        }
                    });
                    $('#' + childId).parents('.lesson-info .custom-table__body').remove();
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
                            var Links2 = $(element).find('.add-questions-item-check');
                            Links2.each(function (index, link) {
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
    });
});