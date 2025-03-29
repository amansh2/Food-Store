const express = require('express');
const { authenticator } = require('../middlewares/auth.mid');
const OrderModel = require('../models/order.model');
const { OrderStatus } = require('../constants/order_status');
const router = express.Router();



router.post('/create', authenticator, async (req, res)=>{
    const requestOrder = req.body;
    if(requestOrder.items.length <= 0){
        return res.status(401).send('Cart Is Empty!');
    }

    try{
        const id = req.user.id;
        await OrderModel.deleteOne({user:id,status: OrderStatus.NEW});
        const newOrder = new OrderModel({...requestOrder,user: req.user.id});
        await newOrder.save();
        res.send(newOrder);
    }catch(err){
        console.log("error",err.message);
        res.status(401).send(err);
    }
})

router.get('/newOrderForCurrentUser',authenticator, async (req,res ) => {
    const order= await getNewOrderForCurrentUser(req);
    if(order) res.send(order);
    else res.status(400).send();
})

router.post('/pay', authenticator, async(req,res)=>{
    const {paymentId} = req.body;
    const order= await getNewOrderForCurrentUser(req);
    if(!order) return res.status(400).send('No order found');
    order.status = OrderStatus.PAID;
    order.paymentId = paymentId;
    await order.save();
    res.send(order._id);
})

router.get('/track/:id', async (req, res)=>{
    const id  = req.params.id;
    const order = await OrderModel.findById(id);
    console.log('order',order);
    if(order) res.send(order);
    else res.status(400).send();
})

router.get('/getAllUserOrders',authenticator, async (req, res)=>{ 
    try{
        const orders = await OrderModel.find({user:req.user.id});
        res.send(orders);
    }catch(err){
        res.status(400).send(err.message);
    }
})

async function getNewOrderForCurrentUser(req) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}

module.exports = router;