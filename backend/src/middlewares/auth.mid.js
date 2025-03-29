const OrderModel = require("../models/order.model");
const { verify } = require('jsonwebtoken');
require('dotenv').config();

function authenticator(req,res,next){
    let token = req.headers.access_token;
    token = token.toString();
    if(!token) return res.status(401).send();
    try{
        const user = verify(token, process.env.JWT_SECRET);
        req.user = user;
        next()
    }catch(err){ 
        console.log("error",err.message);
        res.status(401).send(err);
    }
}

module.exports = {
    authenticator: authenticator
}