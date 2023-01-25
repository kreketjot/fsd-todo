import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const TasksListPage = lazy(() => import('./tasks-list'));
const TaskDetailsPage = lazy(() => import('./task-details'));

export const Routing = () => (
  <Routes>
    <Route path="/" element={<TasksListPage />} />
    <Route path="/:taskId" element={<TaskDetailsPage />} />
  </Routes>
);
