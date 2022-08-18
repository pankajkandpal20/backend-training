const express = require('express');
const router = express.Router();
const BookController= require("../controllers/bookController")
const AuthorController= require("../controllers/authorController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", AuthorController.createAuthor  )

router.post("/createBook", BookController.createBook)

router.get("/listBooks" , BookController.listBooks);

router.get("/updatebook" , BookController.updatebook);

router.get("/bookrange", BookController.bookrange);


module.exports = router;