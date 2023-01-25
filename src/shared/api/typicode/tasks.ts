import { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import type { Task } from './models';

const BASE_URL = '/todos';

export type GetTasksListParams = {
  userId?: number
  completed?: boolean
}

export const getTasksList = (
  params?: GetTasksListParams,
): AxiosPromise<Task[]> => apiInstance.get(BASE_URL, { params });

export type GetTaskByIdParams = {
  taskId: number
}

export const getTaskById = (
  params: GetTaskByIdParams,
): AxiosPromise<Task> => apiInstance.get(`${BASE_URL}/${params.taskId}`, { params });
