// Backend code for Orders functionality
const express = require('express');
const router = express.Router();
const { Order } = require('../components/orderdb');
const { authenticateUser } = require('../middlewares/auth');

// Fetch orders API
router.get('/orders', authenticateUser, async (req, res) => {
    const { type } = req.query; // 'open' or 'executed'
    const userId = req.user.id; // Authenticated user ID

    try {
        let query = { userId };
        if (type === 'open') {
            query.status = { $in: ['Awaiting Token Amount', 'Pending Payment Amount', 'Order Rejected'] };
        } else if (type === 'executed') {
            query.status = 'Completed';
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const orders = await Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await Order.countDocuments(query);

        res.status(200).json({
            orders,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Update order status API
router.patch('/orders/:id/status', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the user owns the order
        if (order.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        // Update status
        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Ensure all routes have callback functions
// router.get('/some-route', someControllerFunction);

module.exports = router;
