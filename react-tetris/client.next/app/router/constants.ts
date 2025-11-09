import type {RoutesConfig} from '../../types';
import MainLayout from '../layouts/MainLayout';

import {baseRoutesConfig} from './routesConfig.base';

export const routesConfig: RoutesConfig = [
  {
    layout: MainLayout,
    routes: baseRoutesConfig,
  },
];
