const { count } = require("console")
const productModel= require("../models/productModel")

const createProduct= async function (req, res) {
    let data = req.body
    let savedData= await productModel.create(data)
    res.send({data: savedData})
}


// const createProduct= async function (req, res) {
//     let data = req.body
//     let authorId = data.dauthor_id
//     if(!authorId) return res.send({msg: 'AuthorId is mandatory in the request'})

//     let savedData= await authorModel.create(data)
//     res.send({data: savedData})
// }
module.exports.createProduct= createProduct
