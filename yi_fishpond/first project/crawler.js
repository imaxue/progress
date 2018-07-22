var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');
var mongoose = require('mongoose');
// 打开数据库连接
mongoose.connect('mongodb://localhost/shucheng');
// 注册Schema，三步走
var Schema = mongoose.Schema;
var textSchema = new Schema({
  content: String
})
var Text = mongoose.model('Text', textSchema);

var url = 'http://wodeshucheng.com/book_11473/2944931.html';
function myRequest(url, callback){
  var options = {
    url: url,
    encoding: null
  }
  request(options, callback)
}

function getcontent(url){
  myRequest(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var html = iconv.decode(body, 'gb2312')
      // console.log(html) // Show the HTML for the Google homepage.
      var $ = cheerio.load(html);
      var urlPrev = $('a#pager_prev').attr('href');
      console.log(urlPrev)
      $('div#htmlContent').find('center').remove();
      $('div#htmlContent').find('div.chapter_Turnpage').remove();
      var content = $('div#htmlContent').text();
      var text = new Text();
      text.content = content;
      text.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          console.log('Successfully, saved to MongoDB.')
        }
      })
      fs.appendFile('fiction.txt', content);
      getcontent(urlPrev);
    }
  })
}

getcontent(url);
