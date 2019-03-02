$(function () {
    // 登录后头部头像点击显示下拉菜单
    $('#headerCompanyLogo').click(function () {
        $('#headerCompanyMenu').slideDown();
    });
    // 点击“退出登录”
    $('#logout').click(function () {
        $('#headerCompanyMenu').hide();
    });
});