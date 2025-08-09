import React, { useState } from 'react';
import BookCard from '../../src/pages/books/BookCard';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';

import { useFetchAllBooksQuery } from '../../src/redux/features/booksApi';

// Icons
import { FaBusinessTime, FaRocket, FaGhost, FaMountain, FaHeart } from "react-icons/fa";

const iconSize = 28;

const categories = [
  { name: "Business", icon: <FaBusinessTime size={iconSize} /> },
  { name: "Sci-Fi", icon: <FaRocket size={iconSize} /> },
  { name: "Horror", icon: <FaGhost size={iconSize} /> },
  { name: "Adventure", icon: <FaMountain size={iconSize} /> },
  { name: "Love & Romance", icon: <FaHeart size={iconSize} /> },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState("Relevant");
  const { data: books = [] } = useFetchAllBooksQuery();

  // Filter books: showing all book yeti kunae choose gareko xoina bhne
  let filteredBooks = selectedCategory
    ? books.filter(
      (book) =>
        book.category?.toLowerCase() === selectedCategory.toLowerCase()
    )
    : books;

  // Apply sorting
  if (sortOption === "PriceLowHigh") {
    filteredBooks = [...filteredBooks].sort((a, b) => a.Price - b.Price);
  } else if (sortOption === "PriceHighLow") {
    filteredBooks = [...filteredBooks].sort((a, b) => b.Price - a.Price);
  }

  return (
    <div className="py-10">
      {/* Categories */}
      <h2 className="text-3xl font-semibold mb-8">Categories:</h2>
      <div className="flex gap-8 mb-12 flex-wrap">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex flex-col items-center p-3 rounded-lg border transition min-w-[90px] ${selectedCategory === cat.name
                ? "bg-purple-200 border-purple-500"
                : "bg-white border-gray-300"
              }`}
          >
            <span className="text-black">{cat.icon}</span>
            <span className="text-sm mt-2 text-black">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Book List Header */}
      <div className="flex flex-wrap items-center justify-between mt-22 mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            {selectedCategory ? selectedCategory : "Our"}{" "}
            <span className="text-purple-600">Book List</span>
          </h2>
          <p className="text-gray-500 text-sm">
            From timeless classics to modern masterpieces, find the perfect read
            for every moment
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-2xl fontsemibold ">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-[var(--card-bg)] rounded-md px-4 py-2 focus:outline-none border border-[var(--accent)])"
          >
            <option value="Relevant">Relevant</option>
            <option value="PriceLowHigh">Price: Low to High</option>
            <option value="PriceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Books */}
      {filteredBooks.length > 0 ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          grid={{ rows: 2, fill: 'row' }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
              grid: { rows: 2, fill: 'row' },
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              grid: { rows: 2, fill: 'row' },
            },
          }}
          modules={[Pagination, Navigation, Grid]}
          className="mySwiper"
        >
          {filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 h-full">
                {/* Force same height for BookCards */}
                <div className="h-[350px] flex flex-col">
                  <BookCard book={book} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-500">No books found in this category.</p>
      )}
    </div>
  );
};

export default Products;
