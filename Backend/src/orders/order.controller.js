const Order = require("./order.model");
const Book = require("../books/book.model");

const createAOrder = async (req, res) => {
  try {
    console.log("Received order data:", req.body);
    
    // Validate required fields
    const { name, email, address, phone, productIds, totalPrice } = req.body;
    
    if (!name || !email || !address || !phone || !productIds || !totalPrice) {
      return res.status(400).json({ 
        message: "Missing required fields", 
        missing: {
          name: !name,
          email: !email,
          address: !address,
          phone: !phone,
          productIds: !productIds,
          totalPrice: !totalPrice
        }
      });
    }

    // Create new order
    const newOrder = new Order({
      name,
      email,
      address,
      phone,
      productIds,
      totalPrice
    });
    
    const savedOrder = await newOrder.save();
    
    // Update order count for each book
    if (productIds && productIds.length > 0) {
      await Promise.all(productIds.map(async (bookId) => {
        await Book.findByIdAndUpdate(bookId, {
          $inc: { orderCount: 1 }
        });
      }));
    }
    
    console.log("Order created successfully:", savedOrder);
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ 
      message: "Failed to create order", 
      error: error.message 
    });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by ID", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// ✅ NEW: Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('productIds');

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};
// Get order by ID for admin (full details)
const getAdminOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Populate products for admin view
    const order = await Order.findById(id).populate('productIds');
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching admin order by ID", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// ✅ Approve order (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'approved', 'cancelled', 'shipped'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('productIds');

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
//counting orders
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // 2. Update orderCount
    await Promise.all(
      req.body.books.map(async (book) => {
        await Book.findByIdAndUpdate(book._id, {
          $inc: { orderCount: book.quantity } // Increment
        });
      })
    );
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  getOrderById,
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus
};