const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const globalErrorHandler = require('./controllers/errorController')

// 路由
const userRouter = require('./Routers/userRouter')
const shopDataRouter = require('./Routers/shopDataRouter')

const app = express()


app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1000')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

// 实现跨域请求
app.use(cors())
app.options('*', cors())

// 提供静态文件 中间件
app.use(express.static('./Public'))
// 开发日志
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


// 解析数据里面的cookie
app.use(cookieParser())

app.use(express.json())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/shopdata', shopDataRouter)

app.use(globalErrorHandler)
module.exports = app