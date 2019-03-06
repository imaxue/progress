$(function () {
    // 分页切换效果
    $('.pagination-item').click(function () {
        $('.pagination-item').removeClass('active');
        $(this).addClass('active');
    });
});