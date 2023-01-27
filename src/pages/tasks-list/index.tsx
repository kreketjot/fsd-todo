import { useEffect } from "react";
import { Col, Empty, Layout, Row, Spin, Typography } from "antd";

import { TasksFilters } from "features/tasks-filter";
import { ToggleTask } from "features/toggle-task";

import { taskModel, TaskRow } from "enitities/task";

import styles from "./styles.module.scss";
import { useAppDispatch } from "app/store";

const TasksList = () => {
  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks list</Typography.Title>
        </Row>
        <Row justify="center">
          <TasksFilters />
        </Row>
      </Layout>
      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          {PageContent()}
        </Row>
      </Layout.Content>
    </Layout>
  );
};

const PageContent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => dispatch(taskModel.getTasksListAsync({})), [dispatch]);

  const isFetching = taskModel.useIsFetching();
  const filteredTasks = taskModel.useFilteredTasks();
  const isEmpty = taskModel.useIsTasksEmpty();

  if (isFetching) return <Spin size="large" />;

  if (isEmpty) return <Empty description="No tasks found" />;

  return filteredTasks.map((task) => (
    <Col key={task.id} span={24}>
      <TaskRow
        data={task}
        titleHref={`/${task.id}`}
        before={<ToggleTask taskId={task.id} withStatus={false} />}
      />
    </Col>
  ));
};

export default TasksList;
