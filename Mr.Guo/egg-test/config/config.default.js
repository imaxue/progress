exports.keys = 'guojingyuan123..';
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0'
}
exports.middleware = ['robot'];
exports.robot = {
  ua: [
    /Baiduspider/i,
    /curl/i,
  ],
};
