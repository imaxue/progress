const Koa = require('koa')
const logger = require('koa-logger')
const session = require('koa-session')
const app = new Koa()

app.keys = ['hi Luke']

app.use(logger())
app.use(session(app))

app.use(ctx => {
    if (ctx.path === '/favicon.ico') return
    if (ctx.path === '/') {
        var n = ctx.session.views || 0
        ctx.session.views = ++n
        console.log('session views', ctx.session) // {views: n}
        ctx.body = n + ' views'
    } else if(ctx.path === '/hi') {
        ctx.body = 'Hi Luke'
    } else {
        ctx.body = '404'
    }
})

app.listen(2333)


// koa 周边包

//HTTP服务
const Koa = require('koa');
const app = new Koa();

app.listen(3000);
console.log('listen 3000');

//Context对象 表示一次对话的上下文（HTTP请求和HTTP回复），通过加工这个对象，可以控制返回给用户的内容、
//Context.response.body 就是要发送给用户的内容
const main = ctx => {
    ctx.response.body = "hello world";
};

app.use(main);

//HTTP Response类型
//Context.request.accepts 判断客户端希望接收的数据类型
//Context.response.type 指定返回类型

const main = ctx =>{
    if(ctx.request.accepts('xml')){
        ctx.response.type = 'xml';
        ctx.response.body = '<data>hello xml</data>';
    }else if(ctx.request.accepts('json')){
        ctx.response.type = 'json';
        ctx.response.body = {data : 'Hello World'};
    }else if(ctx.request.accepts('html')){
        ctx.response.type = 'html';
        ctx.response.body = "<p>hello html</p>"
    }else{
        ctx.response.type = 'text';
        ctx.response.body = 'Hello text';
    }
}

//网页模板-- 返回模板文件
const fs = require('fs');

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('../index.html')
}

//路由
//通过Context.request.path获取用户请求的路径，实现简单路由。
const main = ctx => {
    if(ctx.request.path !== '/'){
        ctx.response.type = 'html';
        ctx.response.body = '<a href="/">Index Page</a>';
    }else{
        ctx.response.body = 'hello world';
    }
}

//koa-router 模块
const route = require('koa-route');

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
    ctx.response.body = 'Hello World';
}

app.use(route.get('/',main));
app.use(route.get('/about',about));

//静态资源 koa-static
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname));
app.use(main);

//重定向  如 用户登录后将其重定向到登录前的页面
//Context.response.redirect()
const redirect = ctx => {
    ctx.response.redirect('/');
    ctx.response.body = '<a href="/">Index page</a>'
};

app.use(route.get('/redirect',redirect));

//中间件 接收两个参数（Context对象，next函数）；
//app.use()用来加载中间件
//调用next()就把执行权交给下一个中间件了。
const logger = (ctx,next) => {
    console.log(`${Date.now()}  ${ctx.request.method} ${ctx.request.url}`);
    next();
}
app.use(logger);

//异步中间件  必须写成async函数
const main = async function (ctx,next) {
    ctx.response.type = 'html';
    ctx.response.body = await fs.readFile('./index.html','utf-8');
}

//中间件的合成
const compose = require('koa-compose');
const logger = (ctx,next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
    next();
}
const main = ctx => {
    ctx.response.body = 'Hello World';
}
const middlewares = compose([logger,main]);
app.use(middlewares);

//try...catch 捕获错误处理，可以让最外层的中间件，负责处理所有中间件的错误处理。
const handler = async (ctx,next) => {
    try{
        await next();
    }catch(err){
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        }
    }
}
const main = ctx => {
    ctx.throw(500);
}
app.use(handler);
app.use(main);

//Context.cookies 读写cookie
const main = function(ctx){
    const n = Number(ctx.cookies.get('view') || 0) + 1;
    ctx.cookies.set('view',n);
    ctx.response.body = n + ' views';
}

//表单处理 koa-body模块可以从POST请求的数据体里提取键值对。
const koaBody = require('koa-body');

const main = async function (ctx) {
    const body = ctx.request.body;
    if(!body.name) ctx.throw(400,'.name required');
    ctx.body = {name:body.name}
}
app.use(koaBody());
app.use(main);

//文件上传
const os = require('os');
const path = require('path');
const koaBody = require('koa-body');

const main = async function (ctx) {
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || {};

    for(let key in files){
        const file = files[key];
        const filePath = path.join(tmpdir,file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);

        reader.pipe(writer);
        filePath.push(filePath);
    }

    ctx.body = filePaths;
};

app.use(koaBody({multipart:true}));


//返回的router是函数,引入的同时调用。
const router = require('koa-router')();        

const app = new Koa();

app.use(async (ctx,next)=>{
    console.log(`Process ${ctx.request.method} - ${ctx.request.url}...`);
    await next();
});

//通过router.get('/path',async fn)  注册一个get请求
router.get('/hello/:name',async (ctx,next)=>{
    var name = ctx.params.name;                   //ctx.params.name访问变量name
    ctx.response.body = `<h1>hello,${name}!</h1>`
});

router.get('/',async (ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});

//POST请求：router.post('/path',async fn)  发送一个表单或JSON作为request的body发送，需要引入middleware--koa-bodyparser解析request.body
const bodyparser = require('koa-bodyparser');

router.post('/signin',async (ctx,next)=>{
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`singin with name:${name},password:${password}`);
    if(name == 'koa' && password === '12345'){
        ctx.response.body = `<h1>welcome,${name}!</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try again</a></p>`;
    }
})

app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000.....');