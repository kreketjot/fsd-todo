import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { taskModel } from "enitities/task";
import { typicodeTasksApi } from "shared/api/typicode/tasks";

export const store = configureStore({
  reducer: {
    tasks: taskModel.reducer,
    [typicodeTasksApi.reducerPath]: typicodeTasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(typicodeTasksApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch);
