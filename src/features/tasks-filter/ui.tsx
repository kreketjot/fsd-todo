import { Radio } from "antd";
import { useAppDispatch } from "app/store";

import { DEFAULT_FILTER, filtersList } from "./config";
import { taskModel } from "enitities/task";
import { useGetTasksListQuery } from "shared/api/typicode/tasks";

export const TasksFilters = () => {
  const dispatch = useAppDispatch();

  const { isLoading } = useGetTasksListQuery({});

  const onFilterClick = (config: taskModel.QueryConfig) =>
    dispatch(taskModel.setQueryConfig(config));

  return (
    <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
      {filtersList.map(({ title, id, config }) => (
        <Radio.Button
          key={id}
          onClick={() => onFilterClick(config)}
          value={id}
          disabled={isLoading}
        >
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
