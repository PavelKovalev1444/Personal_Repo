import type {FC} from 'react';
import {BrowserRouter as ReactRouter, Route, Routes} from 'react-router-dom';

import {routesConfig} from './constants';

export const AppRouterProvider: FC = () => {
  return (
    <ReactRouter>
      <Routes>
        {routesConfig.map(({layout: Layout, routes}, index) => {
          return (
            <Route key={index} element={<Layout />}>
              {routes.map(({component: Component, path, name}) => {
                return Component && path && <Route key={name} element={<Component />} path={path} />;
              })}
            </Route>
          );
        })}
      </Routes>
    </ReactRouter>
  );
};
