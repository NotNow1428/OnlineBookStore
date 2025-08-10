import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../src/utils/baseURL";


const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: (builder.mutation)({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            })
        }),
        getOrderByEmail: (builder.query)({
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ['Orders']
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `/${id}` 
            }),
            providesTags: ['Orders']
        })
    })
})

export const { useCreateOrderMutation, useGetOrderByEmailQuery,useGetOrderByIdQuery } = ordersApi;

export default ordersApi;