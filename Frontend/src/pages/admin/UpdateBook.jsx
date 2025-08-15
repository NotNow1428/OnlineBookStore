import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchBookByIdQuery } from '../../redux/features/booksApi';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';
import axios from 'axios';
import getBaseUrl from '../../utils/baseURL';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
    const { register, handleSubmit, setValue } = useForm();
    const [imageFileName, setImageFileName] = useState('');

    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title);
            setValue('author', bookData.author);
            setValue('description', bookData.description);
            setValue('category', bookData.category);
            // setValue('trending', bookData.trending);
            setValue('Price', bookData.Price);
            setValue('coverImage', bookData.coverImage);
            setImageFileName(bookData.coverImage);
        }
    }, [bookData, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFileName(file.name);
        }
    };

    const onSubmit = async (data) => {
        const updateBookData = {
            title: data.title,
            author: data.author,
            description: data.description,
            category: data.category,
            // trending: data.trending,
            Price: Number(data.Price),
            coverImage: imageFileName,
        };
        try {
            await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            Swal.fire({
                title: "Book Updated",
                text: "Your book has been updated successfully!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                navigate('/dashboard/manage-books');
            });

            await refetch();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error?.response?.data?.message || 'Something went wrong',
            });
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center text-red-500 mt-10">Error fetching book data</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-slate-800 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">Update Book</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                    className="bg-slate-700 text-gray-200"
                />
                <InputField
                    label="Author"
                    name="author"
                    placeholder="Enter book author"
                    register={register}
                    className="bg-slate-700 text-gray-200"
                />
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                    className="bg-slate-700 text-gray-200"
                />
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'love & romance', label: 'Love & Romance' },
                        { value: 'sci-fi', label: 'Sci-Fi' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                    className="bg-slate-700 text-gray-200"
                />
                {/* <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        {...register('trending')}
                        className="rounded text-blue-500 focus:ring focus:ring-offset-2 focus:ring-blue-400"
                    />
                    <span className="ml-2 text-sm font-semibold text-gray-300">Trending</span>
                </div> */}
                <InputField
                    label="Price"
                    name="Price"
                    type="number"
                    placeholder="Price"
                    register={register}
                    className="bg-slate-700 text-gray-200"
                />
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Cover Image
                    </label>
                    <input
                        type="file"
                        accept="image/png"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-slate-600 file:text-gray-100
              hover:file:bg-slate-500
              cursor-pointer"
                    />
                    <p className="mt-2 text-sm text-gray-400">
                        Selected Image: {imageFileName || 'No image selected'}
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBook;
