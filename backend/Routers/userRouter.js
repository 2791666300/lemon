const express = require('express')

const userControllers = require('../Controllers/userController')
const authContoller = require('../Controllers/authController')
const router = express.Router()

router.post('/signup', authContoller.signup)
router.post('/login', authContoller.login)
router.get('/logout', authContoller.logout)
// router.post('/forgotPassword', authContoller.forgotPassword)
// router.patch('/resetPassword/:token', authContoller.resetPassword)
router.post('/auth', authContoller.auth)

// 限制或保护对之后的路由， 利用中间件按顺序执行原理
router.use(authContoller.protect)

router.patch('/updatePassword', authContoller.protect, authContoller.updatePassword)

router.patch('/updateMe', authContoller.protect, userControllers.updateMe)

router.delete('/deleteMe', authContoller.protect, userControllers.deleteMe)

router.get('/Me', userControllers.getMe, userControllers.getUser)

// 之后的路由只允许 admin( 管理员 ) 用户执行
router.use(authContoller.restrictTo('admin'))

router
   .route('/')
   .get(userControllers.getAllUsers)
   .post(userControllers.creatUser)


router
   .route('/:id')
   .get(userControllers.getUser)
   .patch(userControllers.updateUser)
   .delete(userControllers.deleteUser)
//    .delete(authContoller.protect, authContoller.restrictTo('admin'), userControllers.deleteUser)

module.exports = router