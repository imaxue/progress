$(function () {
    // 如果列表数量大于10个，则显示查看更多按钮
    if ($('.activity-list-container').children().length > 10) {
        $('.activity-container .view-more').show();
        // 点击查看更多隐藏按钮
        $('.activity-container .view-more').click(function () {
            $(this).hide();
            $('.activity-list-container').css({
                overflow: 'visible',
                'max-height': 'none'
            });
        });
    }
});