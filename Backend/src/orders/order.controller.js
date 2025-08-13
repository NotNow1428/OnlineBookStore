const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder =  await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const {email} = req.params;
    const orders = await Order.find({email}).sort({createdAt: -1});
    if(!orders) {
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


module.exports = {
  createAOrder,
  getOrderByEmail,
  getOrderById,
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus
};
