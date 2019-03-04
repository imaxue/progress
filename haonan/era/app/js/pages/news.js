$(function () {
    new Swiper('#newsSwiper .swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        autoplay: true,
        // slideToClickedSlide: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            progress: function () {
                for (i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i),
                        slideProgress = this.slides[i].progress,
                        modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                    }
                    var translate = slideProgress * modify * 260 + 'px',
                        scale = 1 - Math.abs(slideProgress) / 5,
                        zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function (transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }
            }
        }
    });
});