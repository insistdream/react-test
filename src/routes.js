import React from 'react';

import Home from './pages/Home'

const appRoutes = [
    {
      path : '/',
      title: '测试',
      component  : Home
    },
]

/* 空白布局页面 */
export const blankLayoutRoutes = [
    '/auth/login',
    '/auth/register',
];

/* 子应用 */
export const subAppRoutes = appRoutes.map((item, index) => {
    return {
      ...item,
      key: index,
    };
  });