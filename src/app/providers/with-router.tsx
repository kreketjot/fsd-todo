import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (component: () => React.ReactNode) => () => (
  <BrowserRouter>
    <Suspense
      fallback={<Spin delay={300} className="overlay" size="large" />}
    ></Suspense>
  </BrowserRouter>
);
