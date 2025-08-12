// import React from 'react';
// import BookCard from '../books/BookCard';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { useFetchAllBooksQuery } from '../../redux/features/booksApi';

// const Recommended = () => {
//   const { data: books = [] } = useFetchAllBooksQuery();

//   // Filter trending books and sort by highest price
//   const recommendedBooks = books
//     .filter(book => book.trending === true)
//     .sort((a, b) => b.Price - a.Price)
//     .slice(0, 10);

//   return (
//     <div className='py-16'>
//       <h2 className='text-3xl font-semibold mb-6'>Trending Premium Books</h2>

//       <Swiper
//         slidesPerView={1}
//         spaceBetween={30}
//         navigation={true}
//         breakpoints={{
//           640: { slidesPerView: 1, spaceBetween: 20 },
//           768: { slidesPerView: 2, spaceBetween: 40 },
//           1024: { slidesPerView: 2, spaceBetween: 50 },
//           1180: { slidesPerView: 3, spaceBetween: 50 }
//         }}
//         modules={[Pagination, Navigation]}
//         className="mySwiper"
//       >
//         {recommendedBooks.map((book, index) => (
//           <SwiperSlide key={index}>
//             <BookCard book={book} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default Recommended;
import React from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/booksApi';

const Recommended = () => {
  const { data: books = [] } = useFetchAllBooksQuery();

  // --- Trending Books Recommendation Algorithm ---
  function recommendTrendingBooks(bookList) {
    // Step 1: Filter trending books
    const trendingBooks = [];
    for (let i = 0; i < bookList.length; i++) {
      if (bookList[i].trending === true) {
        trendingBooks.push(bookList[i]);
      }
    }

    // Step 2: Sort by price (highest first) - Timsort internally
    trendingBooks.sort((a, b) => b.Price - a.Price);

    // Step 3: Select top 10
    const topBooks = trendingBooks.slice(0, 10);

    return topBooks;
  }

  // Get recommended books
  const recommendedBooks = recommendTrendingBooks(books);

  return (
    <div className='py-16'>
      <h2 className='text-3xl font-semibold mb-6'>Trending Premium Books</h2>

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
