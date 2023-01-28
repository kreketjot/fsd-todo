import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../config';
import type { Task } from './models';

const BASE_URL = '/todos';

export type GetTasksListParams = {
  userId?: number
  completed?: boolean
}

export type GetTaskByIdParams = {
  taskId: number
}

export const typicodeTasksApi = createApi({
  reducerPath: 'typicodeTasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getTasksList: builder.query<Task[], GetTasksListParams>({
      query: (params) => BASE_URL,
    }),
    getTaskById: builder.query<Task, GetTaskByIdParams>({
      query: (params) => `${BASE_URL}/${params.taskId}`,
    }),
  })
});

export const { useGetTasksListQuery, useGetTaskByIdQuery } = typicodeTasksApi;
