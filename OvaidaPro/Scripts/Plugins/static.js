
$(document).ready(function () {
    //if (!isMobile()) {
    //    return;
    //}
    //$('#menuBar').hide();
});

function toggleMenu() {
    if (!isMobile()) {
        return;
    }

    $('#menuBar').slideUp();
}

function closePopup() {
    $('.modal').hide(300);
}

function navClicked() {
    $('#menuBar').slideToggle(500);
}

function openCloseAdminMenu(param) {
    debugger;
    if (param == 'adminArrow') {
        $('.sidebar-right').removeClass('col-sm-4'); //.addClass('marginbottom10')
        $('.homeadminRoute').removeClass('col-sm-8');
        $('#adminArrow').hide();
        $('#adminArrow2').show();
    }
    else {
        $('.sidebar-right').addClass('col-sm-4'); //.removeClass('marginbottom10')
        $('.homeadminRoute').addClass('col-sm-8');
        $('#adminArrow').show();
        $('#adminArrow2').hide();
    }
    $('#adminMenu').slideToggle(500);
}

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        return true;
    else
        return false;
}