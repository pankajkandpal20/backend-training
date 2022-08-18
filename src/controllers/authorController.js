const { count } = require("console")
const authorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let data= req.body

    let savedData2= await authorModel.create(data)
    res.send({msg: savedData2})
}

module.exports.createAuthor= createAuthor

