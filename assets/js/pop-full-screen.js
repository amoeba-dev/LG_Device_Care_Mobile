$(document).ready(function () {

    // 썸네일 이미지 비율 계산
    resizeFullScreen();

    function resizeFullScreen() {
    var $fullScreenPortrait = $('.popup.popup-fulll-portrait');
    var $fullScreen = $('.popup.popup-fulll-portrait .popup-content .full-screen');
    var $fullScreenControlPortrait = $('.popup.popup-remote-control-portrait');
    var $fullScreenControl = $('.popup.popup-remote-control-portrait .popup-content .full-screen');
    var $fullScreenRotate = $('.popup .popup-content .full-screen .img-rotate');
    var fullScreenW = $fullScreenRotate.width();
    var fullScreenH = $fullScreenRotate.height();

    $fullScreenPortrait.css("width", fullScreenH + 48);
    $fullScreen.css("height", fullScreenW);

    $fullScreenControlPortrait.css("width", fullScreenH + 48 + 250);
    $fullScreenControl.css("height", fullScreenW);

    if (fullScreenH < 600) {
        $('.popup.popup-fulll').addClass("small-img");
        $('.popup.popup-remote-control').addClass("small-img");
    }

    console.log(fullScreenW);
    console.log(fullScreenH);
    };

    $( window ).resize( function() {
        resizeFullScreen();
    } );


});