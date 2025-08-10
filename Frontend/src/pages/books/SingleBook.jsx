import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery } from '../../redux/features/booksApi';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cartSlice';
import { getImgUrl } from '../../utils/getImgUrl';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (book) dispatch(addToCart(book));
    };

    if (isLoading) return <div className="p-6 text-center text-lg">Loading book details...</div>;
    if (isError) return <div className="p-6 text-center text-red-600">Error loading book.</div>;
    if (!book) return <div className="p-6 text-center">Book not found.</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 mt-10">
            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden md:flex border border-slate-700">

                {/* Book Image */}
                <div className="md:w-1/3 flex justify-center items-center p-6 bg-slate-900">
                    <img
                        src={book.coverImage ? getImgUrl(book.coverImage) : '/placeholder.jpg'}
                        alt={book.title}
                        className="rounded-lg shadow-md object-cover w-full max-h-[450px]"
                    />
                </div>

                {/* Book Details */}
                <div className="md:w-2/3 p-6 flex flex-col text-gray-200">
                    <h1 className="text-3xl font-bold text-white mb-4">{book.title}</h1>

                    <div className="space-y-2 text-gray-300">
                        <p><span className="font-semibold text-white">Author:</span> {book.author || 'Unknown'}</p>
                        <p><span className="font-semibold text-white">Published:</span> {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'N/A'}</p>
                        <p><span className="font-semibold text-white">Category:</span> {book.category || 'Uncategorized'}</p>
                    </div>

                    <p className="mt-4 leading-relaxed">{book.description}</p>

                    <p className="mt-4 text-lg font-semibold text-purple-400">
                        Price: NPR. {book.Price || 'N/A'}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all duration-200"
                    >
                        <FiShoppingCart size={20} />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleBook;
