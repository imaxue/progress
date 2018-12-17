module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);
    router.get('/send', controller.test.sentMail);
    router.get('/www.taobao.com', controller.news.taobao);
    router.get('/www.github.com', controller.news.github);
};
