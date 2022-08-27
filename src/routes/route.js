const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const OrderController= require("../controllers/orderController")
const ProductController = require("../controllers/productController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createProduct", ProductController.createProduct)

router.post("/createUser", UserController.createUser)

router.post("/createOrder",
    commonMW.headerMiddleware,
    commonMW.bodyMiddleware,
    OrderController.createOrder
  );

router.get("/getOrderDetails" , OrderController.getOrderDetails)


router.post("/createUser", UserController.createUser)


module.exports = router;