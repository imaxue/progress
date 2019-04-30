$(function () {
  var tagHtml = '<div class="col col-8 add-tags-list-item">' +
  '<div class="input">' +
  '<input type="text" placeholder="标签内容">' +
  '</div>\n' +
  '<span class="add-tags__delete">删除</span>' +
  '</div>';

  var $doc = $(document)

  var project = {
    init: function () {
      this.editImage()
      this.removeImage()
      this.dialogAction()
    },

    // 编辑项目图片
    editImage: function () {
      var $list = $('.project-list')
      $list.on('click', '.toolbox__edit', function () {
        $('.add-image').show()
      })
    },

    // 删除项目图片
    removeImage: function () {
      var $list = $('.project-list')
      $list.on('click', '.toolbox__delete', function () {
        var $this = $(this)
        $this.closest('.project-list-item').remove()
      })
    },

    // 弹框事件
    dialogAction: function () {
      var $dialog = $('.add-tags')
      // 打开添加标签弹框
      $('.btn-addtag').click(function () {
        $dialog.show()
      })
      $('.add-tags__confirm').click(function () {
        $dialog.hide()
      })
      $('.add-tags__cancel').click(function () {
        $dialog.hide()
      })
      // 添加标签
      var $list = $('.add-tags-list')
      $('.add-tags__button').click(function () {
        $list.append(tagHtml)
      })
      // 删除标签
      $doc.on('click', '.add-tags__delete', function () {
        $(this).closest('.add-tags-list-item').remove()
      })

      var $imageDialog = $('.add-image')
      // 打开添加项目图片弹框
      $('.btn-add').click(function () {
        $imageDialog.show()
      })
      $('.add-image__confirm').click(function () {
        $imageDialog.hide()
      })
      $('.add-image__cancel').click(function () {
        $imageDialog.hide()
      })
    }
  };

  project.init()
});