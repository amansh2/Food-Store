const express = require('express');
const {FoodModel }= require('../models/food.model');
const { sample_foods } = require('../data');
const router = express.Router();


router.get('/',async (req, res)=>{
    const foods = await FoodModel.find();
    res.send(foods);
})




router.get('/tags',async (req, res)=>{
    const foodItems = await FoodModel.find();
    const tagsObj = foodItems.reduce((acc, item) => {
        if (!acc) acc = {}; 
        item.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
    }, {});
    const returnObj=[];
    Object.entries(tagsObj).forEach(([key, value]) => {
        returnObj.push({name:key, count:value});
    })
    const all= {name:'All', count:foodItems.length};
    returnObj.unshift(all);
    return res.send(returnObj);
})

router.get('/search/:searchTerm', async (req,res)=>{
    const term = req.params.searchTerm;
    const foodItems = await FoodModel.find({name:{$regex:term, $options: "i" }});
    return res.send(foodItems);
})

router.get('/tag/:tagName',async (req, res)=>{
    const tag = req.params.tagName;
    const foodItems = await FoodModel.find({ tags: { $in: [tag] } });
    return res.send(foodItems);
})

router.get('/:id',async (req, res)=>{
    const id = req.params.id;
    const foodItem = await FoodModel.find({_id:id});
    res.send(foodItem[0]);
})


module.exports = router;