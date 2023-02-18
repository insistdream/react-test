import React, {Suspense,lazy,useState} from 'react';
import SwitchLayout from './layouts/SwitchLayout';
import AbnormalLayout from '@/layouts/AbnormalLayout';
import ExceptionLayout from '@/layouts/ExceptionLayout';
import { AppRouter, AppRoute } from '@ice/stark';
import { subAppRoutes } from './routes'

// 路由守卫
function beforeEach(pathname) {
  // 如果当前页面是不需要授权的页面，返回
  // if (noAuthRoutes.some((item) => pathname.indexOf(item) > -1)) return true;

  // 未登录跳登录
  // if (decisionLoginSuccess()[0] === false) {
  //   // 打开登录页
  //   pageOpenLogin();
  //   return false;
  // }


  // 无权限态
  // if (decisionMenus()[0] === false) {
  //   // 重复阻止
  //   if (pathname === '/tenant/no-menus') return;
  //   // 跳转
  //   pageOpen({
  //     url     : '/tenant/no-menus',
  //     openType: 'replace',
  //   });
  //   // 返回
  //   return;
  // }


  return true;
}

function App() {
  const [routeChangeInit, setRouteChangeInit] = useState(null)
  const [pathname, setPathname] = useState(null)

  // 如有需求，可根据 pathname 切换 layout 的形态
  const handleRouteChange = (pathname, query, hash, type) => {
    console.log('route change', pathname, query, hash, type);

    // 重复初始化，退出
    if (routeChangeInit && type === 'init') {
      console.log('重复初始化');
      return;
    }

    // 路由未初始化
    if (type === 'init') {
      setRouteChangeInit(true)
    }

    // 路由未初始化，退出
    if (routeChangeInit === undefined) {
      console.log('异常初始化');
      return;
    }

    setPathname(pathname)

    // 路由守卫
    // beforeEach(pathname);
  };
  return (
    <SwitchLayout pathname={pathname}>
      <AppRouter
        prefetch={process.env.NODE_ENV === 'production'}
        onRouteChange={handleRouteChange}
        NotFoundComponent={<ExceptionLayout title="模块加载失败" desc="请联系管理员" />}
        LoadingComponent={<AbnormalLayout height="100vh" />}
      >
        {subAppRoutes.map(item => {
          return (
            <AppRoute
              cached
              key={item.key}
              path={item.path}
              title={'测试标题'}
              component={item.component}
            />
          );
        })}
      </AppRouter>
    </SwitchLayout>
  )
}

export default App
