$(function () {
    // body代理点击事件，点击其他地方隐藏选项下拉菜单
    $('body').on('click', function (e) {
        if (!$(e.target).is('.select')) {
            $('.select-options').slideUp();
        }
    });
    // 分页切换效果
    $('.pagination-item').click(function () {
        $('.pagination-item').removeClass('active');
        $(this).addClass('active');
    });
    // 点击显示下拉框
    $('.select').click(function () {
        // 把其他的先收起
        $(this).siblings().find('.select-options').slideUp('fast');
        // 只展示当前的
        $(this).children('.select-options').slideToggle('fast');
    });
    // 点击下拉框选项并收起下拉框
    $('.select-options').on('click', function (e) {
        e.stopPropagation();
        $(this).slideUp('fast');
    });
});