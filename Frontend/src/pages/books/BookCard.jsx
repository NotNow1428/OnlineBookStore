import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-start gap-4">
        
        {/* Book Image Section */}
        <div className="w-40 h-60 overflow-hidden border rounded-md shadow-sm flex-shrink-0">
          <Link to={`/books/${book.id}`}>
            <img
              src={getImgUrl(book.coverImage)}
              alt={book?.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Book Details Section */}
        <div className="flex flex-col justify-between h-full sm:py-4">
          <Link to={`/books/${book.id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-4">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-4">
            NPR {book?.newPrice}
            <span className="line-through font-normal ml-2 text-gray-500">
              NPR {book?.oldPrice}
            </span>
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary px-6 py-2 space-x-1 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
