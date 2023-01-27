import { Checkbox } from "antd";
import { useAppDispatch } from "app/store";
import { taskModel } from "enitities/task";
import { getTaskStatus } from "enitities/task/lib";

export type ToggleTaskProps = {
  taskId: number;
  withStatus?: boolean;
};

export const ToggleTask = ({ taskId, withStatus = true }: ToggleTaskProps) => {
  const dispatch = useAppDispatch();

  const task = taskModel.useTask(taskId);

  const status = getTaskStatus(task);

  const onToggle = () => dispatch(taskModel.toggleTask(taskId));

  return (
    <Checkbox onClick={onToggle} checked={task.completed}>
      {withStatus && status}
    </Checkbox>
  );
};
