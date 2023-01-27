import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "app/store";
import { schema, normalize } from "normalizr";

import { Task, typicodeApi } from "shared/api";

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
  status: "idle" | "loading" | "failed";
};
const initialState: TasksState = {
  data: {},
  queryConfig: {},
  status: "idle",
};

export const getTasksListAsync = createAsyncThunk(
  "tasks/fetchTasks",
  async (params: typicodeApi.tasks.GetTasksListParams) => {
    const response = await typicodeApi.tasks.getTasksList(params);
    return response.data;
  }
);

export const getTaskByIdAsync = createAsyncThunk(
  "tasks/fetchTask",
  async (params: typicodeApi.tasks.GetTaskByIdParams) => {
    const response = await typicodeApi.tasks.getTaskById(params);
    return response.data;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getTasksListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTasksListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = normalizeTasks(action.payload).entities.tasks;
      })
      .addCase(getTasksListAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getTaskByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTaskByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = {
          ...state.data,
          ...normalizeTask(action.payload).entities.tasks,
        };
      })
      .addCase(getTaskByIdAsync.pending, (state) => {
        state.status = "failed";
      });
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
const useStatus = () =>
  useAppSelector((state: RootState) => state.tasks.status);
export const useIsFetching = () => useStatus() === "loading";
export const useIsErrorOnFetching = () => useStatus() === "failed";

export const reducer = taskModel.reducer;
