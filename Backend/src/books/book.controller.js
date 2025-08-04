//logic for post,get,update,delete

const Book = require("./book.model");

const postABook = async (req, res) => {
    try{
        const newBook = await Book({...req.body})
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", book: newBook})
    }catch(error){
        console.error("Error occured while creating",error);
         res.status(200).send({message: "failed to post book"})

    }   
}

// for get book
const getAllBooks = async(req, res) => {
try{
    const books = await Book.find().sort({createdAt: -1});
    res.status(200).send(books)
}catch(error){
        console.error("fetching books error",error);
         res.status(200).send({message: "failed to get/fetch book"})

    }  
}

//for single book
const getSingleBook = async(req, res) => {
try{
    const {id} = req.params;
    const book = await Book.findById(id)
    if(!book){
        res.status(404).send({message: "Book not found"})
    }
     res.status(200).send(book)
} catch(error){
        console.error("fetching books error",error);
         res.status(200).send({message: "failed to get/fetch book"})

    } 
    
}

//update/edit
const updatedBook = async(req, res) => {
    try{
    const {id} = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new:true});
    if(!updatedBook){
        res.status(404).send({message: "Book not found"})
    }
     res.status(200).send({
        message: "Book updated successfully", book: updatedBook
     })
} catch(error){
        console.error("updating books error",error);
         res.status(200).send({message: "failed to update book"})

    } 
}

//for delete
const deleteBook = async (req, res) => {
    try{
        const {id} = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if(!deleteBook){
        res.status(404).send({message: "Book not found"})
    }
     res.status(200).send({
        message: "Book deleted successfully", book: deleteBook
     })
    }catch(error){
        console.error("deleting books error",error);
         res.status(200).send({message: "failed to delete book"})

    } 
}
module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updatedBook,
    deleteBook
}