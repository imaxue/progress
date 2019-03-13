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
      $doc.on('mouseenter', '.article-score-wrap.edit .score-item', function () {
        var $this = $(this)
        var $parent = $this.parent()
        var index = $this.index() + 1
        $parent.addClass('score-' + index)
        var n = 5 - index
        _this.state.star = index
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
});