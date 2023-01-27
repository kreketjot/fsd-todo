import { Radio } from "antd";
import { useAppDispatch } from "app/store";

import { DEFAULT_FILTER, filtersList } from "./config";
import { taskModel } from "enitities/task";

export const TasksFilters = () => {
  const dispatch = useAppDispatch();

  const isFetching = taskModel.useIsFetching();

  const onFilterClick = (config: taskModel.QueryConfig) =>
    dispatch(taskModel.setQueryConfig(config));

  return (
    <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
      {filtersList.map(({ title, id, config }) => (
        <Radio.Button
          key={id}
          onClick={() => onFilterClick(config)}
          value={id}
          disabled={isFetching}
        >
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
