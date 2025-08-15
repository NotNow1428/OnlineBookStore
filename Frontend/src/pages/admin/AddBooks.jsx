import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../redux/features/booksApi';
import InputField from './InputField';
import SelectField from './SelectField';
import Swal from 'sweetalert2';

const AddBooks = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [imageFileName, setimageFileName] = useState('');
  const [addBook, { isLoading }] = useAddBookMutation();

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFileName
    };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Book Added",
        text: "Your book has been uploaded successfully",
        timer: 1500,
        showConfirmButton: false
      });
      reset();
      setimageFileName('');
      setimageFile(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add book",
        text: error?.data?.message || "Something went wrong"
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-800 border border-slate-700 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-100 mb-6">Add New Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
          className="bg-slate-700 text-gray-200 border-slate-600"
        />

        <InputField
          label="Author"
          name="author"
          placeholder="Enter book author"
          register={register}
          className="bg-slate-700 text-gray-200 border-slate-600"
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
          className="bg-slate-700 text-gray-200 border-slate-600"
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
          className="bg-slate-700 text-gray-200 border-slate-600"
        />

        {/* <div className="mb-4">
          <label className="inline-flex items-center text-gray-300">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-500 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold">Trending</span>
          </label>
        </div> */}

        <InputField
          label="Price"
          name="Price"
          type="number"
          placeholder="Enter price"
          register={register}
          className="bg-slate-700 text-gray-200 border-slate-600"
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              hover:file:bg-purple-100 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md transition"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
