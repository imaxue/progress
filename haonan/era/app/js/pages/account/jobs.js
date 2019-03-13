$(function () {
  var $doc = $(document)
  var jobs = {
    init: function () {
      this.dialogAction()
      this.loadData()
      this.bindEditEvent()
      this.bindRemoveEvent()
    },

    loadData: function () {
      // 获取职位列表
    },

    // 编辑
    bindEditEvent: function () {
      $doc.on('click', '.jobs-list-item__edit', function () {
        // 编辑职位
        $('.add-jobs').show()
      })
    },

    // 删除
    bindRemoveEvent: function () {
      $doc.on('click', '.jobs-list-item__delete', function () {
        // 编辑职位
        var $this = $(this)
        $this.closest('.jobs-list-item').remove()
      })
    },
    
    dialogAction: function () {
      var $dialog = $('.add-jobs')
      $('.jobs-add').click(function () {
        $dialog.show()
      })
      $('.add-jobs__confirm').click(function () {
        $dialog.hide()
      })
      $('.add-jobs__cancel').click(function () {
        $dialog.hide()
      })
    }
  }
  jobs.init()
});
