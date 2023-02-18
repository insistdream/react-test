import React, { useMemo } from 'react';
import ExceptionLayout from '@/layouts/ExceptionLayout';
import './index.less';

export default (props) => {
  // 属性
  const { error, height } = props;

  // 错误
  if (error) {
    // 无权限态
    if (error.error.msg === '403') {
      return (
        <ExceptionLayout icon={permissionIcon} title="你没有访问当前页面的权限" desc="如有切实管理需求请联系管理员为你添加权限" />
      );
    } else {
      return (
        <ExceptionLayout icon={errorIcon} title="服务开小差" desc="请联系系统管理员" />
      );
    }
  }

  // 加载态
  return (
    <div className="layout-abnormal" style={{ height }}>
      loading...
    </div>
  );
};
