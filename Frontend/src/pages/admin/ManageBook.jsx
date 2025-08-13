import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../redux/features/booksApi';
import Swal from 'sweetalert2';

const ManageBook = () => {
    const navigate = useNavigate();
    const { data: books, refetch, isLoading, isError } = useFetchAllBooksQuery();
    const [deleteBook] = useDeleteBookMutation();

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            Swal.fire({
                icon: 'success',
                title: 'Book deleted!',
                timer: 1500,
                showConfirmButton: false,
            });
            refetch();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Delete failed',
                text: error?.data?.message || 'Something went wrong',
            });
        }
    };

    if (isLoading) return <div className="text-center text-gray-300 mt-10">Loading...</div>;
    if (isError) return <div className="text-center text-red-500 mt-10">Error fetching books</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage Books</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-slate-800 border border-slate-700 rounded-lg">
                    <thead>
                        <tr className="bg-slate-700 text-gray-300 text-center">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Book Title</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Price (NPR)</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books?.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-400 py-4">
                                    No books found.
                                </td>
                            </tr>
                        ) : (
                            books.map((book, index) => (
                                <tr
                                    key={book._id}
                                    className="border-b border-slate-700 hover:bg-slate-700/50 transition text-center"
                                >
                                    <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                                    <td className="px-4 py-3 text-gray-300">{book.title}</td>
                                    <td className="px-4 py-3 text-gray-300 capitalize">{book.category}</td>
                                    <td className="px-4 py-3 text-purple-400 font-bold">{book.Price}</td>
                                    <td className="px-4 py-2 flex justify-center gap-2">
                                        <Link
                                            to={`/dashboard/edit-book/${book._id}`}
                                            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteBook(book._id)}
                                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBook;
