const express = require('express');
const cors = require('cors');
const { sample_foods, sample_users } = require('./data');
const foodRouter = require('./routers/foodRouter');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');
const dbConnect = require('./configs/database.config');
const app = express();
require('dotenv').config();

dbConnect();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"] 
}));
app.use('/api/foods',foodRouter)
app.use('/api/users',userRouter)
app.use('/api/orders', orderRouter)
const port = process.env.PORT || 3000
app.listen(port, () => {     
    console.log(`Server started on ${port} `);
});