import Transports from './scenes/Transports';
import Parkings from './scenes/Parkings';
import History from './scenes/History';
import Grants from './scenes/Grants';
import Checks from './scenes/Checks';
import Auth from './scenes/Auth';
import Profile from './scenes/Profile';
import Connect from './scenes/Connect';
import PenaltiesAndEvacuations from './scenes/PenaltiesAndEvacuations';
import Reconciliation from './scenes/Reconciliation';
import LimitSets from './scenes/LimitSets';

interface Route {
  id: number;
  path: string;
  params?: string;
  children: any;
  useWith: string[];
  title?: string;
  icon?: string;
}

const routes: Route[] = [
  {
    id: 1,
    path: '/',
    children: Auth,
    useWith: [],
  },
  {
    id: 5,
    path: 'parkings',
    title: 'Парковки',
    children: Parkings,
    useWith: ['organization', 'sidebar', 'header'],
    icon: 'parkings',
  },
  {
    id: 6,
    path: 'history',
    title: 'История операций',
    children: History,
    useWith: ['organization', 'sidebar', 'header'],
    icon: 'history',
  },
  {
    id: 7,
    path: 'grants',
    title: 'Абонементы',
    children: Grants,
    useWith: ['organization', 'sidebar', 'header'],
    icon: 'abonement',
  },
  {
    id: 8,
    path: 'checks',
    title: 'Счета',
    children: Checks,
    useWith: ['organization', 'header', 'sidebar'],
    icon: 'check',
  },
  {
    id: 9,
    path: 'transports',
    title: 'Транспорт',
    children: Transports,
    useWith: ['organization', 'sidebar', 'header'],
  },
  {
    id: 10,
    path: 'reconciliation',
    title: 'Сверка расчетов',
    children: Reconciliation,
    useWith: ['organization', 'sidebar', 'header'],
    icon: 'reconciliation',
  },
  {
    id: 12,
    path: 'profile',
    children: Profile,
    useWith: ['organization'],
  },
  {
    id: 13,
    path: 'connect',
    params: '/:role',
    title: 'Парковки',
    children: Connect,
    useWith: ['organization'],
  },
  {
    id: 14,
    path: 'penalties-and-evacuations',
    title: 'Штрафы и эвакуации',
    children: PenaltiesAndEvacuations,
    useWith: ['organization', 'sidebar', 'header'],
    icon: 'box',
  },
  {
    id: 15,
    path: 'limit-sets',
    title: 'Ограничения',
    children: LimitSets,
    useWith: ['organization', 'sidebar', 'header'],
    icon: 'box',
  },
];

export default routes;
