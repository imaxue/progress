const Controller = require('egg').Controller;

class HomeContriller extends Controller {
    async index() {
        this.ctx.body = '访问成功';
    }
}

module.exports = HomeContriller;