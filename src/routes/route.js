const express = require('express');
const router = express.Router();
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createBook", BookController.createBook  )

router.get("/getBooksData", BookController.getBooksData)

router.post("/getBooksInYear", BookController.getBooksInYear) 

router.get("getParticularBooks"),BookController.getParticularBooks

router.get("/getPriceBooks", BookController.getPriceBooks)

router.get("/getRandomBooks", BookController.getRandomBooks)

module.exports = router;