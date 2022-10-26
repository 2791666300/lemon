const express = require('express')

const shopDataController = require('../Controllers/shopDataController')
const authContoller = require('../Controllers/authController')

const router = express.Router()



router
   .route('/')
   .get(shopDataController.getAllShopDatas)
   .post(shopDataController.createShopData)

router
   .route('/:id')
   .get(shopDataController.getShopdata)
   .patch(shopDataController.updateShopdata)
   .delete(shopDataController.deleteShopdata)

module.exports = router