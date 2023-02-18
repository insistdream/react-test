import React from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import { blankLayoutRoutes } from '@/routes';

export default (props) => {
  const {
    children,
    pathname,
  } = props;

  // 根据路由切换布局
  // 空白布局
  if (blankLayoutRoutes.includes(pathname)) {
    HTML.body.style.paddingLeft = '0px';
    return children;
  }

  // 基本布局
  return (
    <BasicLayout pathname={pathname}>{children}</BasicLayout>
  );
};
