import {
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "app/store";
import { schema, normalize } from "normalizr";

import { Task } from "shared/api";

export type QueryConfig = {
  completed?: boolean;
  userId?: number;
};

type NormalizedTasks = Record<number, Task>;
type TaskEntities = {
  tasks: NormalizedTasks;
};
type TaskIds = number[];

export const taskScheme = new schema.Entity<Task>("tasks");
export const normalizeTask = (data: Task) =>
  normalize<Task, TaskEntities, TaskIds>(data, taskScheme);
export const normalizeTasks = (data: Task[]) =>
  normalize<Task[], TaskEntities, TaskIds>(data, [taskScheme]);

export type TasksState = {
  data: NormalizedTasks;
  queryConfig?: QueryConfig;
};
const initialState: TasksState = {
  data: {},
  queryConfig: {},
};

export const taskModel = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.data[action.payload];
      task.completed = !task.completed;
    },
    setQueryConfig: (state, action: PayloadAction<QueryConfig>) => {
      state.queryConfig = action.payload;
    },
  },
});

export const { toggleTask, setQueryConfig } = taskModel.actions;

export const useFilteredTasks = () =>
  useAppSelector(
    createSelector(
      (state: RootState) => state.tasks.data,
      (state: RootState) => state.tasks.queryConfig,
      (tasks, queryConfig) =>
        Object.values(tasks).filter(
          (task) =>
            queryConfig?.completed === undefined ||
            task?.completed === queryConfig.completed
        )
    )
  );
export const useIsTasksEmpty = () =>
  useAppSelector(
    createSelector(
      (state: RootState) => state.tasks.data,
      (tasks) => Object.keys(tasks).length === 0
    )
  );
export const useTask = (taskId: number) =>
  useAppSelector((state: RootState) => state.tasks.data[taskId]);

export const reducer = taskModel.reducer;
