import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '../../types';
import type { TodoFormInput } from '../../schemas/todo';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/todos' }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/',
      transformResponse: (response: Record<'todos', Todo[]>) => {
        return response.todos;
      },
    }),
    getTodo: builder.query<Todo, number>({
      query: (id: number) => `/${id}`,
    }),
    createTodo: builder.mutation<Todo, TodoFormInput>({
      query: (todo: TodoFormInput) => ({
        url: `/add`,
        method: 'POST',
        body: todo,
      }),
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo: Todo) => ({
        url: `/${todo.id}`,
        method: 'PUT',
        body: {
          todo: todo.todo,
          completed: todo.completed,
          userId: todo.userId,
        },
      }),
    }),
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useGetTodoQuery, useUpdateTodoMutation } =
  todoApi;
