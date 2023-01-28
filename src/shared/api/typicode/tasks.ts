import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Task } from "./models";
import { API_URL } from "../../config";
const BASE_URL = "/todos";

export type GetTasksListParams = {
  userId?: number;
  completed?: boolean;
};

export const getTasksList = (
  params?: GetTasksListParams
): AxiosPromise<Task[]> => apiInstance.get(BASE_URL, { params });

export type GetTaskByIdParams = {
  taskId: number;
};

export const getTaskById = (params: GetTaskByIdParams): AxiosPromise<Task> =>
  apiInstance.get(`${BASE_URL}/${params.taskId}`, { params });

export const typicodeApi = createApi({
  reducerPath: 'typicodeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL })
  endpoints: (builder) => ({
    getTasksList: builder.query<Task[], GetTasksListParams>({
      query: (params) => BASE_URL,
    })
  })
})

export const { useGetTasksList } = typicodeApi;