$(function () {
  var $doc = $(document)
  var $edit = $('.service-edit')
  var $add = $('.service-add')
  // 添加
  $add.click(function () {
    $edit.show()
    $(this).hide()
  })
  // 编辑
  $doc.on('click', '.service-item__edit', function () {
    $edit.show()
    $add.hide()
  })
  // 删除
  $doc.on('click', '.service-item__delete', function () {
    // 此处删除一条记录
  })
  // 取消编辑
  $('.cancel').click(function () {
    $edit.hide()
    $add.show()
  })
  // 添加确认
  $('.confirm').click(function () {
    // 保存
  })
})