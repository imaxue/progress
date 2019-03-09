$(function () {
  $('.submit').click(function () {
    $('.submit--success').show()
  })
  $('.submit--success .confirm').click(function () {
    $('.submit--success').hide()
  })
  var isValide = false
  $('.invalid').toggle(!isValide)
  $('.invalid .confirm').click(function () {
    $('.invalid').hide()
  })
})