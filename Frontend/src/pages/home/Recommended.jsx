import React, { useMemo } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/booksApi';
import { useGetAllOrdersQuery } from '../../redux/features/ordersApi';

const Recommended = () => {
  const { data: books = [], isLoading: booksLoading } = useFetchAllBooksQuery();
  const { data: orders = [], isLoading: ordersLoading } = useGetAllOrdersQuery();

  // --- Order-Based Recommendation Algorithm ---
  const recommendedBooks = useMemo(() => {
    if (!books?.length || !orders?.length) return [];

    // Step 1: Calculate book popularity from orders
    const bookPopularity = {};

    orders.forEach(order => {
      if (order?.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          const bookId = item?.bookId;
          if (bookId) {
            bookPopularity[bookId] = (bookPopularity[bookId] || 0) + (item.quantity || 1);
          }
        });
      }
    });

    // Step 2: Map books to their popularity
    const booksWithPopularity = books.map(book => ({
      ...book,
      popularity: bookPopularity[book._id] || 0,
    }));

    // Step 3: Sort by popularity and return top recommendations
    return booksWithPopularity
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);

  }, [books, orders]);

  if (booksLoading || ordersLoading) {
    return (
      <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended Books</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
        {recommendedBooks.map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommended;
