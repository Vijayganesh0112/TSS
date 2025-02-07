const express = require('express');
const zod = require('zod');
const { Stock } = require('../components/stocksdb');

const router = express.Router();

router.use(express.json());

router.get('/stocks', async (req, res) => {
    try {
        const stocks = await Stock.find({});

        if (stocks.length === 0) {
            return res.status(404).json({
                message: "No stocks available at this time"
            });
        }

        res.json(stocks); 
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
});

const stockBody = zod.object({

})

// POST route to insert stock data
router.post('/stocks', async (req, res) => {
    try {
        const {
            companyName,
            stockPrice,
            marketCap,
            peRatio,
            pbRatio,
            debtToEquity,
            highLow,
            roe,
            profitLossStatementurl,
            balanceSheerurl,
            annualreporturl
        } = req.body;  
        // Create a new Stock document
        const newStock = new Stock({
            companyName,
            stockPrice,
            marketCap,
            peRatio,
            pbRatio,
            debtToEquity,
            highLow,
            roe,
            profitLossStatementurl,
            balanceSheerurl,
            annualreporturl
        });

        await newStock.save();

        res.status(201).json({
            message: 'Stock data inserted successfully',
            stock: newStock
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error inserting stock data',
            error: error.message
        });
    }
});


module.exports = router;