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
    origin:["https://food-store-l2fx.onrender.com", "http://localhost:4200", 'https://savorstreet.netlify.app'] 
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);  // Ends the request-response cycle for preflight requests
    }

    next();  // Pass control to the next middleware or route handler
});
app.use('/api/foods',foodRouter)
app.use('/api/users',userRouter)
app.use('/api/orders', orderRouter)
const port = process.env.PORT || 3000
app.listen(port, () => {     
    console.log(`Server started on ${port} `);
});