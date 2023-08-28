import { lazy } from 'react';
import CanBusDisplay from '../components/CanBusDisplay';
import DocumentPage from '../pages/docs/DocumentPage';
import DocumentsHomePage from '../pages/docs/DocumentsHomePage';
import CameraHome from '../pages/Camera/CameraHome';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/map',
    title: 'Map',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/CAN',
    title: 'CAN Bus',
    component: CanBusDisplay,
  },
  {
    path: '/docs/view/',
    title: 'Documentation',
    component: DocumentPage,
  },
  {
    path: '/docs/',
    title: 'Documentation',
    component: DocumentsHomePage,
  },
  {
    path: '/cameras/',
    title: 'Cameras',
    component: CameraHome,
  },
];

const routes = [...coreRoutes];
export default routes;
