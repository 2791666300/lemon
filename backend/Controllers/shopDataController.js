const ShopData = require('../Models/shopDataModel')
const catchAsync = require('../Utils/catchAsync')
const AppError = require('../Utils/appError')


exports.getAllShopDatas = catchAsync(async (req, res) => {
    const shopdatas = await ShopData.find()
    res.status(200).json({
        status: 'success',
        quantity: shopdatas.length,
        data: {
            shopdatas
        }
    })
})


exports.createShopData = catchAsync(async (req, res) => {
    const shopDatas = await ShopData.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            shopDatas
        }
    })
})

exports.getShopdata = catchAsync(async (req, res, next) => {
    const shopData = await ShopData.findById(req.params.id)
    if (!shopData) {

        return next(new AppError('找不到该ID的文档数据 ', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            shopData
        }
    })
})


exports.updateShopdata = catchAsync(async (req, res, next) => {
    const newuShopData = await ShopData.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true // 是否开启验证器
    })

    if (!newuShopData) {
        console.log('sssss')
        return next(new AppError('找不到该ID的文档数据 ', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            newuShopData
        }
    })
})

exports.deleteShopdata = catchAsync(async (req, res, next) => {
    const doc = await ShopData.findByIdAndRemove(req.params.id)
    if (!doc) {
        console.log('sssss')
        return next(new AppError('找不到该ID的文档数据 ', 404))
    }

    res.status(200).json({
        status: 'success',
        data: '删除成功！！'
    })
})