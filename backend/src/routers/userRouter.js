const express = require('express');
const FoodModel = require('../models/food.model');
const { sample_foods, sample_users } = require('../data');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// router.get('/seed', async (req, res)=>{
//     await UserModel.create(sample_users);
//     res.send('users seeded')
// })

router.post('/register', async (req, res)=>{ 
    try{
        const user = req.body;
        const dupUser = await UserModel.findOne({email:user.email});
        if(dupUser){
            res.status(HTTP_BAD_REQUEST)
            .send('User is already exist, please login!');
            return;
        }
        user.isAdmin = false;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const dbUser = await UserModel.create(user);
        res.send(generateJWT(dbUser));
    } catch(err){
        res.send({message:err.message});
    }
})

router.post('/login', async (req, res)=>{
    const user = await UserModel.find({email:req.body.email});
    let isMatch = false;
    if(user && user[0]) isMatch = await bcrypt.compare(req.body.password, user[0].password);
    if(user[0] && isMatch){
        res.send(generateJWT(user[0]));
    } else {
        res.status(400)
        .send({message:'Invalid email or password'});
    }
})

const generateJWT = (user) => {
    const token = jwt.sign({
        id: user.id, email:user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET,{
        expiresIn:"30d"
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    }
}

module.exports = router;