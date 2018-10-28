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