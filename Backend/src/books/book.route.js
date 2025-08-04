const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updatedBook, deleteBook } = require('./book.controller');
const router = express.Router();


//post a book
router.post("/create-book", postABook)

//get a book
router.get("/", getAllBooks);

//get single book
 router.get("/:id", getSingleBook);

//update book
router.put("/edit/:id", updatedBook);

//delete book
router.delete("/:id", deleteBook);
module.exports = router;