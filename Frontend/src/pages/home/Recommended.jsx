import React, { useState, useEffect } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useGetPopularBooksQuery } from '../../redux/features/booksApi';

const Recommended = () => {
  const { data: popularBooks = [], isLoading, isError, error } = useGetPopularBooksQuery();

  if (isLoading) {
    return (
      <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended Books</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended Books</h2>
        <div className="text-center text-red-500 py-8">
          <p>{error?.data?.message || 'Failed to load recommended books'}</p>
        </div>
      </div>
    );
  }

  if (!popularBooks || popularBooks.length === 0) {
    return (
      <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended Books</h2>
        <div className="text-center text-gray-500 py-8">
          <p>No recommended books available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='py-16'>
      <h2 className='text-3xl font-semibold mb-6'>Recommended Books</h2>
      
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
          1180: { slidesPerView: 3, spaceBetween: 50 }
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {popularBooks.map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
