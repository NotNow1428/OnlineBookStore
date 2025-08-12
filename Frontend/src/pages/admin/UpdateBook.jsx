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

    const [file, setFile] = useState(null);

    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title);
            setValue('author', bookData.author);
            setValue('description', bookData.description);
            setValue('category', bookData.category);
            setValue('trending', bookData.trending);
            setValue('Price', bookData.Price);
        }
    }, [bookData, setValue]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async (data) => {
        try {
            let imageUrl = bookData.coverImage;

            if (file) {
                const formData = new FormData();
                formData.append('image', file);


                const uploadRes = await axios.post(`${getBaseUrl()}/api/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                imageUrl = uploadRes.data.url;
            }

            const updateBookData = {
                title: data.title,
                description: data.description,
                category: data.category,
                trending: data.trending,
                Price: Number(data.Price),
                coverImage: imageUrl,
            };

            await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            Swal.fire({
                title: "Book Updated",
                text: "Your book has been updated successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            }).then(() => {
                navigate('/dashboard/manage-books');
            });

            await refetch();

        } catch (error) {
            console.log(error);
            alert("Failed to update book.");
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching book data</div>;

    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
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
                />

                {/* Trending Checkbox */}
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                <InputField
                    label="Price"
                    name="Price"
                    type="number"
                    placeholder="Price"
                    register={register}
                />

                {/* File Upload Styled */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cover Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700
               hover:file:bg-blue-100
               cursor-pointer"
                    />
                    {bookData?.coverImage && (
                        <img
                            src={`${getBaseUrl()}/uploads/${bookData.coverImage}`}
                            alt="Current cover"
                            className="mt-2 w-32 h-40 object-cover rounded"
                        />
                    )}
                </div>


                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default UpdateBook;
