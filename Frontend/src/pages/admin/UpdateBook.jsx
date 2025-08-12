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
    const [imageFileName, setImageFileName] = useState(''); // track filename

    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title);
            setValue('author', bookData.author);
            setValue('description', bookData.description);
            setValue('category', bookData.category);
            setValue('trending', bookData.trending);
            setValue('Price', bookData.Price);
            setValue('coverImage', bookData.coverImage);
            setImageFileName(bookData.coverImage); // set initial file name
        }
    }, [bookData, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFileName(file.name); // update file name state
        }
    };

    const onSubmit = async (data) => {
        const updateBookData = {
            title: data.title,
            author: data.author,
            description: data.description,
            category: data.category,
            trending: data.trending,
            Price: Number(data.Price),
            coverImage: imageFileName, // send file name here
        };
        try {
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
                    label="Author"
                    name="author"
                    placeholder="Enter book author"
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
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cover Image
                    </label>
                    <input
                        type="file"
                        accept="image/png"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            cursor-pointer"
                    />
                    {/* Show current selected file name */}
                    <p className="mt-2 text-sm text-gray-600">
                      Selected Image: {imageFileName || 'No image selected'}
                    </p>
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
