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
    $('.news-swiper .swiper-slide').click(function () {
        $('.news-video-dialog').fadeIn('fast');
        $('body').css('overflow', 'hidden');
    });
});