const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const Book = require('../books/book.model');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // Total orders
        const totalOrders = await Order.countDocuments();

        // Total sales (only approved orders)
        const totalSales = await Order.aggregate([
            { $match: { status: 'approved' } },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        //  Trending books statistics: 
        const trendingBooksCount = await Book.aggregate([
            { $match: { trending: true } },  
            { $count: "trendingBooksCount" } 
        ]);
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

        //  Total number of books
        const totalBooks = await Book.countDocuments();

        //  Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },  
                    totalSales: { $sum: "$totalPrice" },  
                    totalOrders: { $sum: 1 } 
                }
            },
            { $sort: { _id: 1 } }  
        ]);

        // Result summary
        res.status(200).json({  totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingBooks,
            totalBooks,
            monthlySales, });
      
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
})

// GET /api/books/search?query=someTerm
router.get('/books/search', async (req, res) => {
  const query = req.query.query || '';

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } }
      ]
    }).limit(50); // Limit to 50 results for performance

    res.status(200).json(books);
  } catch (error) {
    console.error("Error during book search:", error);
    res.status(500).json({ message: "Failed to perform search" });
  }
});

module.exports = router;