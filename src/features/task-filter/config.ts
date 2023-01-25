export type Filter = {
  id: number
  title: string
  config: import('enitities/task').taskModel.QueryConfig
}

export const filters: Record<number, Filter> = {
  1: {
    id: 1,
    title: 'All',
    config: {},
  },
  2: {
    id: 2,
    title: 'Opened',
    config: {
      completed: false,
    },
  },
  3: {
    id: 3,
    title: 'Closed',
    config: {
      completed: true,
    },
  },
};
