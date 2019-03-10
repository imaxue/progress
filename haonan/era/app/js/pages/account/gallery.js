$(function () {
  var $doc = $(document)
  var gallery = {
    init: function () {
      this.handleTabs()
      this.handleDelete()
      this.dialogAction()
    },

    handleDelete: function () {
      $doc.on('click', '.gallery--delete', function () {
        var $this = $(this)
        $this.closest('.gallery-list-item').remove()
      })
    },
    
    handleTabs: function () {
      $('.tabs__header-item').click(function () {
        var $this = $(this)
        var index = $this.index()
        $this.addClass('is-active').siblings().removeClass('is-active')
        $('.tabs__content').eq(index).show().siblings('.tabs__content').hide()
      })
    },

    // 弹框事件
    dialogAction: function () {
      var $imageDialog = $('.add-image')
      // 打开添加项目图片弹框
      $('.upload-button').click(function () {
        $imageDialog.show()
      })
      $('.add-image__confirm').click(function () {
        $imageDialog.hide()
      })
      $('.add-image__cancel').click(function () {
        $imageDialog.hide()
      })
    }
  }
  gallery.init()
});