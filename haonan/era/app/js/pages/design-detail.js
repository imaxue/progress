$(function () {
    // 遮罩相关
    $('.download-app-dialog .dialog-close').click(function () {
        $('body').css('overflow', 'auto');
        $('.download-app-dialog').fadeOut('fast');
    });

    // 点击查看显示遮罩
    $('.recruitment-view').click(function () {
        $('.download-app-dialog').fadeIn('fast');
        $('body').css('overflow', 'hidden');
    });

    // 点击切换二维码
    $('.system-name').click(function () {
        // 切换效果
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        // 隐藏显示对应二维码
        $('.download-app-dialog img').hide();
        $('.download-app-dialog img[alt="'+ $(this).attr('type') +'"]').css('display', 'block');
    });

    // 点击tab切换当前显示模块
    $('.detail-tab span').click(function () {
        $('.detail-tab').removeClass('active');
        $(this).parent().addClass('active');
        // 切换模块显示
        $('.detail-content > div').hide();
        $('.detail-content > div[type='+ $(this).attr('type') +']').show();
    });

    // 企业项目点击每一个标签
    $('.company-project-label').click(function () {
        $('.company-project-label').removeClass('active');
        $(this).addClass('active');
    });

    // 企业相册上方切换相册类型
    $('.company-album-check span').click(function () {
        $('.company-album-check span').removeClass('active');
        $(this).addClass('active');
        // 切换模块显示
        $('.company-album-list').hide();
        $('.company-album-list[type='+ $(this).attr('type') +']').show();
    });

    $('.company-album-item img').mouseenter(function () {
        $(this).siblings('.company-album-item-cover').fadeIn('fast');
    });
    $('.company-album-item').mouseleave(function () {
        $(this).find('.company-album-item-cover').fadeOut('fast');
    });
});