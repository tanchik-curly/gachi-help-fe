import { Roles } from 'interfaces';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GradeIcon from '@mui/icons-material/Grade';
import GroupsIcon from '@mui/icons-material/Groups';
import HailIcon from '@mui/icons-material/Hail';
import HomeIcon from '@mui/icons-material/Home';

const menuItems = [
  { title: 'Домашня сторінка', path: '/home', icon: HomeIcon },
  { title: 'Отримання допомоги', path: '/request-help', icon: HailIcon },
  {
    title: 'Соціальна інформація',
    path: '/social-information',
    icon: GroupsIcon,
  },
  {
    title: 'Працевлаштування та сертифікації',
    path: '/certifications',
    icon: GradeIcon,
  },
];

export const getMenuItems = (role: Roles) =>
  role !== Roles.Worker
    ? menuItems
    : menuItems.concat({
        title: 'Користувачі',
        path: '/users',
        icon: AccountBoxIcon,
      });
