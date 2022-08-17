const { count } = require("console")
const { Model } = require("mongoose")
const bookModel = require("../models/bookModel")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData = async function(req, res) {
    let allBooks = await BookModel.find().select({bookName: 1, authorName: 1, _id: 0})
    res.send({msg: allBooks})
}
const getBooksInYear = async function (req, res){
    let year = req.body.year
    let showData = await BookModel.find({year:{$eq:year}})
    res.send({msg: showData})
    
}
// const getParticularBooks = async function(req, res) {
//   let condition = req.body
//   let particular = await BookModel.find(req.body)
//   res.send({msg: particular})
// }
 const getPriceBooks = async function(req, res) {
    let allBooks = await BookModel.find({"prices.indianPrice" : { $in: ["100INR", "200INR", "500INR"] }     })
    res.send({msg: allBooks})
 }
 const getRandomBooks = async function(req, res) {
    let getBook = await BookModel.find({ $or: [{stockAvailable:true},{totalPages: {$gt: 500}}]})
    res.send({msg : getBook})
 }


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksInYear= getBooksInYear
module.exports.getPriceBooks= getPriceBooks
module.exports.getRandomBooks= getRandomBooks
//module.exports.getParticularBooks= getParticularBooksgetParticularBooks