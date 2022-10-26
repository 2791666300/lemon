const User = require('../Models/userModel')
const catchAsync = require('../Utils/catchAsync')
const AppError = require('../Utils/appError')


exports.getMe = (req, res, next) => {
    req.params.id = req.user.id
    next()
}


// 过滤
const filterObj = (obj, ...alloweFields) => {
    const newObj = {}
   
    Object.keys(obj).forEach(el => {
        if(!alloweFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj
}


// 更新当前用户的常规数据
exports.updateMe = catchAsync(async(req, res, next) => {
    
    // 1） 如果用户发布密码数据，则创建错误
    if(req.body.password || req.body.passwordConfirm) {
        return next(new AppError('如果想更改密码，请到/updateMyPassword', 400))
    } 

    if(req.body.name || req.body.email){
        return next(new AppError('不能更改email或者name', 400))
    }
   
    // 过滤掉不允许更新的不需要的字段名称
    const filteredBody = filterObj(req.body, 'name', 'email')
    
    // 2） 更新用户文档
    const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {new: true, runValidators: true})
    

    res.status(200).json({
        status: 'success',
        data: {
            updateUser
        }
    })

})

// 删除当前用户，也就是把当前用户的状态更改为不活跃
exports.deleteMe = catchAsync(async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false});

    res.status(204).json({
        status: 'success',
        data: null
    })
})



exports.getAllUsers = catchAsync(async (req, res) => {
        const users = await User.find()
        res.status(200).json({
            status: 'success',
            quantity: users.length,
            data: {
                users
            }
        })
})

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        
        return next(new AppError('找不到该ID的文档数据 ', 404))
    }
    res.status(200).json({
        status: 'success',
        data:{
            user
        }
    })
})


exports.creatUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: '请用 /singup 注册新用户'
    })
}

exports.updateUser = catchAsync(async (req, res, next) => {
    const newuser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true // 是否开启验证器
    }) 

    if(!newuser){
        console.log('sssss')
        return next(new AppError('找不到该ID的文档数据 ', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            newuser
        }
    })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const doc = await User.findByIdAndRemove(req.params.id)
    if(!doc){
        console.log('sssss')
        return next(new AppError('找不到该ID的文档数据 ', 404))
    }
    
    res.status(200).json({
        status: 'success',
        data: '删除成功！！'
    })
})
