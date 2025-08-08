import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../redux/features/booksApi';
import InputField from './InputField';
import SelectField from './SelectField';
import Swal from 'sweetalert2';


const AddBooks = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setimageFile] = useState(null)
  const [imageFileName, setimageFileName] = useState('')
  const [addBook, { isLoading, isError }] = useAddBookMutation()

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFileName
    }
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Book Added",
        text: "Your Book is Uploaded",
        icon: "Success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, It's Okay!"
      });
      reset();
      setimageFileName('')
      setimageFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add book")

    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  }
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>

        {/* Reusable Input Field for Title */}
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        {/* Reusable Input Field for Author */}
        <InputField
          label="Author"
          name="author"
          placeholder="Enter book author"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}

        />

        {/* Reusable Select Field for Category */}
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
            // Add more options as needed
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

        {/*Price */}
        <InputField
          label="Price"
          name="Price"
          type="number"
          placeholder="Price"
          register={register}
        />

        {/* Cover Image Upload */}
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
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
          {
            isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
          }
        </button>
      </form>
    </div>
  )
};

export default AddBooks;
