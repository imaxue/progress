$(function () {
    $('.detail-nav-item').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
});