const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.js');
const stockRouter = require('./routes/stocks.js');
const watchlistRouter = require ('./routes/watchlist.js');
const orderRouter = require('./routes/order.js');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/',userRouter);
app.use('/api/',stockRouter);
app.use('/api/',watchlistRouter);
app.use('/api/',orderRouter);

app.listen(3000,()=>{ 
    console.log("Backend is up!,listening at port:3000")
});