import React from 'react';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-[#0f172a] text-white rounded-lg p-4 shadow flex flex-col sm:flex-row gap-5 max-w-2xl w-full">
      
      {/* Book Cover */}
      <Link to={`/books/${book.id}`} className="w-full sm:w-32 h-48 overflow-hidden rounded-md flex-shrink-0">
        <img
          src={getImgUrl(book.coverImage)}
          alt={book?.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </Link>

      {/* Book Info */}
      <div className="flex flex-col justify-between flex-1">
        {/* Title */}
        <Link to={`/books/${book.id}`}>
          <h3 className="text-lg font-semibold hover:text-blue-400 mb-3">
            {book?.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          {book?.description?.length > 80
            ? `${book.description.slice(0, 80)}...`
            : book?.description}
        </p>

        {/* Price */}
        <p className="text-white font-semibold text-base mb-6">
          NPR {book?.Price}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(book)}
          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold px-4 py-2 rounded-md w-fit">
          <HiOutlineShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
