### Koa API

**app.listen()**

	const http = require('http');
	const Koa = require('koa');
	conat app = new Koa();
	http.createServer(app.callback()).listen(3000);
	// 意味着可以启多个
	https.createServer(app.callback()).listen(3001);
	
**app.callback()**

	callback() {
		const fn = compose(this.middleware);
		
		return (req, res) => {
			const ctx = this.createContext(req,res);
			return this.handleRequest(ctx, fn)
		}
	}
	
**app.use()**

	use(fn) {
		this.middleware.push(fn);
		return this;
	}
	
**app.context**

> app.context是从其创建ctx的原型

	app.context.db = db();
	
	app.use(async ctx => {
		console.log(ctx.db);
	});
	
> Context 将node的request和response对象封装到单个对象中，提供了许多方法；每个请求都将创建一个Context，并在中间件中作为接收器引用

	createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  }
  
 
**ctx.state**

> 命名空间，用于通过中间件传递信息和中间视图

	ctx.state.user = await User.find(id);
	
**ctx.cookie.get(name,[options])**
**ctx.cookie.set(name,value,[options])**
**ctx.assert(value, [status], [msg], [properties])**
	
	ctx.assert(ctx.state.user, 401, 'User not find')

