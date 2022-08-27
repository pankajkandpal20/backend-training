const userModel = require("../models/userModel");
const UserModel= require("../models/userModel")

const createUser = async function(req, res) {
    let data = req.body;
    console.log(data)
     let {isfreeappuser} = req.headers //destructuring
     console.log(req.headers)
    if(!isfreeappuser){
        res.send("Headers is not present it is mendatory")
    }
    let savedData2 = await userModel.create(data)
    res.send(savedData2)
}


const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
