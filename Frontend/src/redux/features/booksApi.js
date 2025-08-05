import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: `include`,
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', 'Bearer ${token}');
        }
        return Headers;
    }
})
const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]

        }),
        //forsinglebook
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, error, id) => [{ type: "Books", id }],
        }),
        //fetchinAPI for adding/post
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),
        //fetchingApi for update
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
        //fetchinapi for delete
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })

    })

})
export const { useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksApi;
export default booksApi;