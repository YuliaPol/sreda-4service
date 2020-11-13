if(document.getElementById('left-menu') && $('#left-side-bar').length){var menuHTML = document.getElementById('left-menu').innerHTML;}
if(document.getElementById('header-bell') && $('#left-side-bar').length){menuHTML +=  document.getElementById('header-bell').innerHTML}
if(document.getElementById('mobile-menu')) {document.getElementById('mobile-menu').innerHTML = menuHTML;}
if ($(window).width() < 883) {
    if(!$('#left-side-bar').length){
        var MobileAside =     
        '    <aside id="left-side-bar" class="full-width-menu">'+
        '        <div id="mobile-menu">'+
        '        </div>'+
        '    </aside>';
    
        $(MobileAside).insertAfter('#header');
        if(document.getElementById('left-menu')){var menuHTML = document.getElementById('left-menu').innerHTML;}
        if(document.getElementById('mobile-menu')) {document.getElementById('mobile-menu').innerHTML = menuHTML;}
    }
}
else {
    $('.full-width-menu').remove();
}
$(window).resize(function() {
    if ($(window).width() < 883) {
        if(!$('#left-side-bar').length){
            var MobileAside =     
            '    <aside id="left-side-bar" class="full-width-menu">'+
            '        <div id="mobile-menu">'+
            '        </div>'+
            '    </aside>';
        
            $(MobileAside).insertAfter('#header');
            if(document.getElementById('left-menu')){var menuHTML = document.getElementById('left-menu').innerHTML;}
            if(document.getElementById('mobile-menu')) {document.getElementById('mobile-menu').innerHTML = menuHTML;}
        }
    }
    else {
        $('.full-width-menu').remove();
    }
});
