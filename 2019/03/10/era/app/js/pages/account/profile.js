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
      this._selectAction()
      this._buttonAction()
      this.loadData()
    },

    loadData: function () {
      var _this = this
      // 此处获取用户信息
      // 模拟请求
      setTimeout(function () {
        var response = {
          code: 200,
          data: {
            valid: true, // 已认证
            company_name: '反重力建国际教育研究中心',
            prop: '民营',
            address: '浙江省   杭州市   上城区',
            create_time: '2016年   6月',
            industry: '建筑',
            scale: '20-50',
            keywords: '建筑  景观  园林',
            intro: '企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容。企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍内容企业自我介绍。'
          }
        }
        _this._validate(response.data.valid)
      }, 500)
    },

    // 验证
    _validate: function (valid) {
      this.state.isValid = valid
      // 判断是否未认证，是的话弹出未认证提示对话框
      $('.invalid').toggle(!valid)
      $('.infomation-company').toggle(valid)
      $('.infomation-edit').toggle(!valid)
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
        // 获取表单数据
        var fields = $('.infomation-edit>.form').serializeArray()
        // 表单提交成功的提示
        $('.submit--success').show()
      }
    },

    // 注册下拉列表点击事件
    _selectAction: function () {
      var _this = this
      $('.select').on('selected', function (e, params) {
        var $this = $(this)
        var $el = $this.children('input[name]')
        if (!$el) return
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

    },
    // 按钮点击事件
    _buttonAction: function () {
      // 编辑
      $('.btn-edit').click(function () {
        $('.infomation-company').hide()
        $('.infomation-edit').show()
      })
    }
  }
  profile.init()

  // 二维码提示

  var instance = new Tooltip($('#wechat'), {
    placement: 'bottom',
    title: '<div class="era-tooltip"><img class="img-wechat" src="/imgs/code.png" alt=""></div>',
    html: true,
    trigger: 'hover'
  })
  instance.show().hide()
  $('.third-party').on('click', 'span', function () {
    var $this = $(this)
    var className = $this.attr('data-class')
    var $edit = $('.third-party .third-party__edit')
    $edit.show()
    if (className) {
      $edit.children().hide()
      $('.' + className).show()
    }
  })
})