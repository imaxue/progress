$(function () {
  $('.tabs span').click(function () {
    var $this = $(this)
    $this.addClass('active').siblings().removeClass('active')
    $('.tabs-content input').eq($this.index()).show().siblings().hide()
  })
  $('.btn-add').click(function () {
    $('.list-wrap').show()
  })
})