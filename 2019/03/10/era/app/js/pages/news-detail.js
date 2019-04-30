$(function () {
  var $doc = $(document)
  var news = {
    state: {
      star: 0,
      canEdit: false
    },
    init: function () {
      this.handleScore()
      this.handleStar()
      this.handleSubmit()
    },

    handleScore: function () {
      var _this = this
      $doc.on('mousemove', '.article-score-wrap.edit .score-item', function (e) {
        var $this = $(this),
        $parent = $this.parent(),
        index = $this.index() + 1,
        x = e.clientX,
        left = $this.offset().left,
        width = $this.width();
        var value = index
        if (x < (left + width / 2)) {
          $parent.addClass('is-half')
          index -= 1
          value = index + 0.5
        } else {
          $parent.removeClass('is-half')
        }
        $parent.addClass('score-' + index)
        var n = 5 - index
        _this.state.star = value
        while (n > 0) {
          $parent.removeClass('score-' + (n + index))
          n -= 1
        }
      })
    },

    handleStar: function () {
      var _this = this
      var $score = $('.article-score')
      var stars = 3.5
      if (this.state.canEdit) {
        $('.article-score-wrap').addClass('edit')
      } else {
        $('.score-button').hide()
        $score.addClass('score-' + Math.min(parseInt(stars), 5))
        if (stars % 1 === 0.5) {
          $score.addClass('is-half')
        }
      }
    },

    handleSubmit: function () {
      var _this = this
      $('.submit').click(function () {
        alert(_this.state.star)
      })
    }
  }

  news.init()

  new Tooltip($('.era-icon-wechart'), {
    placement: 'bottom',
    html: true,
    title: '<div class="era-tooltip"><img class="img-wechat" style="width: 100%;" src="/imgs/code.png" alt=""><p>微信扫一扫</p></div>'
  })
  $('.article-score').on('mouseenter', '.score-item', function () {
    $()
  })
});