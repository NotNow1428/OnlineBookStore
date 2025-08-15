import React from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useFetchAllBooksQuery } from '../../redux/features/booksApi';

const LatestAdd = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  // sort on new
  const sortedBooks = [...books].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Latest Books</h2>

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
        {sortedBooks.length > 0 &&
          sortedBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default LatestAdd;
