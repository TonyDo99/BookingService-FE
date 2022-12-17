// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'user',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'event',
    path: '/dashboard/events',
    icon: icon('ic_event'),
  },
  {
    title: 'ticket',
    path: '/dashboard/tickets',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
