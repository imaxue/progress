$(function () {
  jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
  });
  jQuery.validator.addClassRules({

  })
  var $doc = $(document)
  var profile = {
    state: {
      isValid: false,
      params: {
        file: '',
        fullname: '',
        region: '',
        province: '',
        city: '',
        town: ''
      }
    },

    // 初始化
    init: function () {
      var _this = this
      $('.submit').click(function () {
        _this._submit()
      })
      this._dialogAction()
      this._validate()
      this._selectAction()
    },

    // 验证
    _validate: function () {
      // 此处发起请求验证是否认证通过,并更新状态
      this.state.isValid = true
      // 判断是否未认证，是的话弹出未认证提示对话框
      $('.invalid').toggle(!this.state.isValid)
      // 初始化表单验证
      $('.infomation-edit>.form').validate({
        rules: {
          file: {
            required: true,
            accept: 'image/*'
          },
          fullname: {
            required: true,
            maxlength: 30
          }
        },
        messages: {
          file: '请上传头像',
          fullname: {
            required: '请输入公司全称',
            maxlength: '最多输入30个字'
          },
          prop: '请选择公司属性',
          region: '请选择地区',
          province: '请选择省份',
          city: '请选择城市',
          town: '请选择地区',
        }
      })
    },

    //表单提交
    _submit: function () {
      // 验证表单
      var valid = $('.infomation-edit>.form').valid()
      console.log(valid)
      if (valid) {

        // 表单提交成功的提示
        $('.submit--success').show()
      }
    },

    // 注册下拉列表点击事件
    _selectAction: function () {
      var _this = this
      $('.select').on('selected', function (e, params) {
        var $this = $(this)
        var $el = $this.children('input')
        if (!$el) return
        var name = $el.prop('name')
        $this.children('.select__label').html(params.label)
        $el.val(params.value)
        _this.state.params[name] = params.value
      })
    },

    // 注册弹框事件
    _dialogAction: function () {
      // 表单提交成功提示框关闭按钮
      $('.submit--success .confirm').click(function () {
        $('.submit--success').hide()
      })
      // 未认证弹框-关闭
      $('.invalid .confirm').click(function () {
        $('.invalid').hide()
      })

    }
    // 未认证
  }
  profile.init()
})