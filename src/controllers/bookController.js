const UserModel= require("../models/bookModel")
const AuthorModel = require("../models/authorModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const listBooks= async function (req, res) {
    let findauthor = await AuthorModel.find({author_name : "Chetan Bhagat"});
    console.log(findauthor)
    let findbook = await UserModel.find({author_id : {$eq : findauthor[0].author_id}});
  res.send({ msg : findbook});
}

const updatebook = async function (req,res) {
  let bookprice = await UserModel.findOneAndUpdate({ name : "Two states"},{$set : { price : 100} }, {new : true});
   let updateprice = bookprice.price;
  let authorupdate = await AuthorModel.find({author_id : {$eq : bookprice.author_id}}).select({author_name:1,_id:0});
  res.send({authorupdate ,updateprice});
}

const bookrange = async function(req,res) {
  let range = await UserModel.find({price : {$gte:50,$lte:100}});
   let a = range.map(x=>x.author_id);
   let newrange = await AuthorModel.find({author_id : a}).select({author_name:1, _id:0});
  res.send(newrange);
}



module.exports.createBook= createBook
module.exports.listBooks=listBooks
module.exports.updatebook=updatebook
module.exports.bookrange=bookrange;
