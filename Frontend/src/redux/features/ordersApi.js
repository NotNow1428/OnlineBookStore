import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../src/utils/baseURL";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        // Create new order
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
            }),
            invalidatesTags: ['Orders'],
        }),

        // Get orders by user email
        getOrderByEmail: builder.query({
            query: (email) => `/email/${email}`,
            providesTags: ['Orders'],
        }),

        // Get single order by ID
        getOrderById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Orders'],
        }),

        // Get all orders (admin)
        getAllOrders: builder.query({
            query: () => `/`,
            providesTags: ['Orders'],
        }),

        // Get single order for admin panel
        getAdminOrderById: builder.query({
            query: (id) => `/admin/${id}`,
            providesTags: ['Orders'],
        }),

        // Update order status
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Orders'],
        }),

        // Approve order (alternative to status update)
        approveOrder: builder.mutation({
            query: (id) => ({
                url: `/${id}/approve`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Orders'],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderByEmailQuery,
    useGetOrderByIdQuery,
    useGetAllOrdersQuery,
    useGetAdminOrderByIdQuery,
    useUpdateOrderStatusMutation,
    useApproveOrderMutation,
} = ordersApi;

export default ordersApi;