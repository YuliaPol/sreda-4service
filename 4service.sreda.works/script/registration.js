$(document).ready(function () {
    PopUpHide();
    $(".form-registretion").submit(function (event) {
        PopUpShow();
    });
    $(".close-popup").click(function() {
        PopUpHide();
    });
    $('.checkforstudy input[type=checkbox]').change(function(e){
        if($(this).is(':checked')) {
            $('.company-input').fadeIn(300);
        }
        else {
            $('.company-input').fadeOut(300);
        }
    });
});
function PopUpShow() {
    $(".succes-box").show();
}
function PopUpHide() {
    $(".succes-box").hide();
}