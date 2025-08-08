import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../redux/features/booksApi';

const ManageBook = () => {
    const navigate = useNavigate();
    const { data: books, refetch } = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete book:', error.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    const handleEditClick = (id) => {
        navigate(`dashboard/edit-book/${id}`);
    };

    return (
        <section className="py-6 px-6 bg-blueGray-50 w-full">
            <div className="mt-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">All Books</h3>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Table Section */}
                    <div className="block w-full overflow-x-auto max-h-[500px] overflow-y-scroll">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead className="sticky top-0 bg-white z-10">
                                <tr>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">#</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">Book Title</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">Category</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">Price</th>
                                    <th className="px-6 py-3 text-xs uppercase font-semibold text-left text-blueGray-500 border-b border-blueGray-100">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books && books.map((book, index) => (
                                    <tr key={book._id}>
                                        <td className="px-6 py-4 text-sm border-b border-blueGray-100">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm border-b border-blueGray-100">{book.title}</td>
                                        <td className="px-6 py-4 text-sm border-b border-blueGray-100">{book.category}</td>
                                        <td className="px-6 py-4 text-sm border-b border-blueGray-100">NPR.{book.Price}</td>
                                        <td className="px-6 py-4 text-sm border-b border-blueGray-100">
                                            <div className="flex space-x-2">
                                                <Link
                                                    to={`/dashboard/edit-book/${book._id}`}
                                                    className="text-indigo-600 hover:text-indigo-800 hover:underline px-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="bg-red-500 text-white px-4 py-1 rounded-full text-sm hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageBook;
