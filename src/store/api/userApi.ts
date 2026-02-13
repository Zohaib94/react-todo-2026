import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/users' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/',
      transformResponse: (response: Record<'users', User[]>) => {
        return response.users;
      },
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
