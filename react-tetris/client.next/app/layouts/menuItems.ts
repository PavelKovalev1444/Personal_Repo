import type {MenuItem} from '@gravity-ui/navigation';

import {baseRoutesConfig} from '../router/routesConfig.base';

export const menuItems: MenuItem[] = baseRoutesConfig.map(route => ({
  id: route.name,
  title: route.title,
  link: route.path,
  type: 'regular',
}));
