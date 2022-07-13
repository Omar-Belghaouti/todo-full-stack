import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Todo } from "../../models";

interface TodoApi {
  id: number;
  text: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], null>({
      query: () => "/todos",
      transformResponse: (response: TodoApi[]) =>
        response
          .map((todo) => ({
            ...todo,
            createdAt: todo.created_at,
            updatedAt: todo.updated_at,
          }))
          .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
      providesTags: ["Todos"],
    }),
    getTodo: builder.query<Todo, { id: number }>({
      query: ({ id }) => `/todos/${id}`,
      transformResponse: (response: TodoApi) => ({
        ...response,
        createdAt: response.created_at,
        updatedAt: response.updated_at,
      }),
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<Todo, { text: string }>({
      query: (data) => ({
        method: "POST",
        url: "/todos",
        body: data,
      }),
      transformResponse: (response: TodoApi) => ({
        ...response,
        createdAt: response.created_at,
        updatedAt: response.updated_at,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<
      Todo,
      { id: number; text: string; completed: boolean }
    >({
      query: (data) => ({
        method: "PUT",
        url: `/todos/${data.id}`,
        body: data,
      }),
      transformResponse: (response: TodoApi) => ({
        ...response,
        createdAt: response.created_at,
        updatedAt: response.updated_at,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<Todo, { id: number }>({
      query: (data) => ({
        method: "DELETE",
        url: `/todos/${data.id}`,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
