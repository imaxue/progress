$(function () {
    $('.infomation-option-list li').click(function () {
        $(this).siblings().not('.infomation-option-label').css('color', '#74777D');
        $(this).css('color', '#4395FF');
    });
    $('.view-more').click(function () {
        $(this).hide();
    });
});