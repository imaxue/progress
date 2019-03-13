$(function () {
    $('.news-carousel').slick({
        arrows: false,
        dots: true,
        centerMode: true,
        slidesToShow: 1,
        centerPadding: '120px',
        autoplay: true,
        autoplaySpeed: 3000,
        draggable: false
    });
    // 遮罩相关
    $('.news-video-dialog .dialog-close').click(function () {
        $('body').css('overflow', 'auto');
        $('.news-video-dialog').fadeOut('fast');
    });
    $('.news-video-container').click(function () {
        var videoSrc = $(this).find('img').attr('video-src');
        $('.news-video-dialog').fadeIn('fast');
        $('body').css('overflow', 'hidden');
        $('.news-video-dialog video').attr('src', videoSrc);
    });
});