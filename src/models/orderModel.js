const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
	userId: Number,
	productId: Number,
	amount: Number,
	isFreeAppUser: Boolean, 
	date: Number
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema) //users
