const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    if(!book.author) res.send("Author id is mandatory")
    let author = await authorModel.findById(book.author)
    if(!author) res.send("author id is not valid")

    if(!book.publisher) {res.send("publisher id is mandatory")}
    let publisher = await publisherModel.findById(book.publisher);
    if (!publisher) res.send("Enter A Publisher Id is not valid");

    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorPublisherDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author publisher')
    res.send({data: specificBook})

}
const getBooksByPublishers = async function (req, res) {
    let publisher = await publisherModel.find({name : {$in :[ "Penguin" ,"HarperCollins"]}}).select({_id:1});
    let x = publisher.map((ele)=>ele._id)
    let book = await bookModel.find({publisher: {$in : x}}).update({$set : {isHardCover : true}})
    let result = await bookModel.find({isHardCover : true}).populate(['author','publisher'])
    res.send(result)
}
const getAuthorsWithRatings = async function (req, res) {
    let authors = await authorModel.find({rating : {$gt :3.5}}).select({_id:1});
    let x = authors.map((ele)=>ele._id)
    let book = await bookModel.updateMany({author : {$in : x}},{$set : {$inc :{ price :10}}})
    let result = await bookModel.find({author : {$in : x}}).populate('author')
    res.send(result)
  
  };
  


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorPublisherDetails
module.exports.getBooksByPublishers = getBooksByPublishers
module.exports.getAuthorsWithRatings = getAuthorsWithRatings