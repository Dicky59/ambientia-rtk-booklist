import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '../model/book.model';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    books: builder.query<Book[], void>({
      query: () => '/api/books',
      providesTags: ['Book'],
    }),
    book: builder.query<Book, string>({
      query: (id) => `/api/books/${id}`,
      providesTags: ['Book'],
    }),
    addBook: builder.mutation<{}, Book>({
      query: (book) => ({
        url: '/api/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation<void, Book>({
      query: ({ id, ...rest }) => ({
        url: `/api/books/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const {
  useBooksQuery,
  useBookQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
