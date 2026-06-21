import Stats from '../../pages/Stats';
import Summary from '../../pages/Summary';
import Tetris from '../../pages/Tetris';
import type {RoutesConfig} from '../../types';

export const baseRoutesConfig: RoutesConfig[0]['routes'] = [
  {
    name: 'summary',
    title: 'Сводка',
    component: Summary,
    path: '/',
  },
  {
    name: 'tetris',
    title: 'Tetris',
    component: Tetris,
    path: '/tetris',
  },
  {
    name: 'stats',
    title: 'Статистика',
    component: Stats,
    path: '/stats',
  },
];
