const express = require('express');
const { createAOrder, getOrderByEmail, getOrderById, getAllOrders, getAdminOrderById, updateOrderStatus } = require('./order.controller');

const router = express.Router();

// Create order endpoint
router.post("/", createAOrder);

// Get all orders (admin)
router.get("/", getAllOrders);

// Get orders by user email
router.get("/email/:email", getOrderByEmail);

// Get order by ID
router.get("/:id", getOrderById);

// admin-only endpoint
router.get('/admin/:id', getAdminOrderById);

//status
router.patch('/:id/status', updateOrderStatus);

module.exports = router;
