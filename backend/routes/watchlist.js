const express = require('express');
const mongoose = require('mongoose');
const User = require('../components/db');  // Import User model
const Stock = require('../components/stocksdb');  // Import Stock model
const router = express.Router();

// 1. Add a stock to the user's watchlist
router.post('/watchlist/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { stockId } = req.body;  // The ID of the stock to add to the watchlist

        // Check if the stock exists in the database
        const stock = await Stock.findById(stockId);
        if (!stock) {
            return res.status(404).json({
                message: 'Stock not found'
            });
        }

        // Find the user and add the stock to their watchlist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Add the stock ID to the user's watchlist if it's not already there
        if (user.watchlist.includes(stockId)) {
            return res.status(400).json({
                message: 'Stock already in watchlist'
            });
        }

        user.watchlist.push(stockId);
        await user.save();

        res.status(200).json({
            message: 'Stock added to watchlist',
            watchlist: user.watchlist
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
});

// 2. Remove a stock from the user's watchlist
router.delete('/watchlist/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { stockId } = req.body;  // The ID of the stock to remove from the watchlist

        // Find the user and remove the stock from their watchlist
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Remove the stock from the watchlist
        user.watchlist = user.watchlist.filter(id => id.toString() !== stockId);

        // Save the updated user document
        await user.save();

        res.status(200).json({
            message: 'Stock removed from watchlist',
            watchlist: user.watchlist
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
});

// 3. Get the user's watchlist
router.get('/watchlist/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user and populate the watchlist with stock details
        const user = await User.findById(userId).populate('watchlist');
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            watchlist: user.watchlist
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error',
            error: err.message
        });
    }
});

module.exports = router;
