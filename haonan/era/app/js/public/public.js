$(function () {
    // body代理点击事件，点击其他地方隐藏头部下拉菜单
    $('body').on('click', function (e) {
        if (!$(e.target).parents().is('#headerCompany')) {
            $('#headerCompanyMenu').slideUp();
        }
    });

    // 登录后头部头像点击显示下拉菜单
    $('#headerCompanyLogo').click(function () {
        $('#headerCompanyMenu').slideToggle();
    });

    // 点击“退出登录”
    $('#logout').click(function () {
        $('#headerCompanyMenu').hide();
    });
});