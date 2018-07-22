const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        // const dataList = {
        //     list: [
        //         { id: 1, title: 'this is news1', url: 'www.taobao.com' },
        //         { id: 2, title: 'this is news2', url: 'www.github.com' },
        //     ]
        // };
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const newsList = await ctx.service.new.list(page);
        await ctx.render('news/list.tpl', { list: newsList.list });
    }

    async taobao() {
        const s = '欢迎来到淘宝';
        this.ctx.body = s;
    }

    async github() {
        const s = '欢迎来到github';
        this.ctx.body = s;
    }
}

module.exports = NewsController;