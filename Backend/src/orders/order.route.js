const express = require('express');
const { createAOrder, getOrderByEmail, getOrderById } = require('./order.controller');

const router =  express.Router();

// create order endpoint
router.post("/", createAOrder);

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

// Get order by ID
router.get("/:id", getOrderById);

module.exports = router;