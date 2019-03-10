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
      isValid: false
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
            accept: 'image/png,image/jpg,image/jpeg,image/bmp'
          },
          fullname: {
            required: true,
            maxlength: 30
          },
          intro: {
            required: true,
            maxlength: 200
          },
          license: {
            required: true,
            accept: 'image/png,image/jpg,image/jpeg,image/bmp'
          }
        },
        messages: {
          file: {
            required: '请上传头像',
            accept: '仅支持jpg/png/bmp格式'
          },
          fullname: {
            required: '请输入公司全称',
            maxlength: '最多输入30个字'
          },
          abbr: '请填写公司简称',
          prop: '请选择公司属性',
          region: '请选择地区',
          province: '请选择省份',
          city: '请选择城市',
          town: '请选择地区',
          year: '请选择成立年份',
          month: '请选择成立月份',
          scale: '请选择公司规模',
          industry: '请选择所在行业',
          keywords: '请选择关键词',
          intro: {
            required: '请填写公司介绍',
            maxlength: '最多200字'
          },
          size: '请输入主页图尺寸',
          size1: '请输入公司封面图尺寸',
          code: '请填写注册号',
          name: '请填写代表姓名',
          expire_year: '请选择年份',
          expire_month: '请选择月份',
          license: {
            required: '请上传营业执照',
            accept: '仅支持jpg/png/bmp格式'
          }
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