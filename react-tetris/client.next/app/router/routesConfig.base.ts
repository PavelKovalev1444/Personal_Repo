import Stats from '../../pages/Stats';
import Summary from '../../pages/Summary';
import Tetris from '../../pages/Tetris';
import type {RoutesConfig} from '../../types';

// Базовый конфиг без привязки к layout,
// чтобы его можно было переиспользовать без циклических импортов
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

