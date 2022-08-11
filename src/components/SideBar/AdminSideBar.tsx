import DashboardIcon from '@mui/icons-material/Dashboard';
import { List } from '@mui/material';
import MultiMenuItem from '../Common/MultiMenuItem';
import SingleMenuItem from '../Common/SingleMenuItem';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export function AdminSideBar() {
  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        maxWidth: '300px',
        width: '240px',
        height: '100%',
        p: 0,
      }}
    >
      <SingleMenuItem icon={<DashboardIcon />} link='/admin/dashboard' title='Dashboard' />
      {/* Order */}
      <MultiMenuItem
        icon={<RestaurantMenuIcon />}
        label='Order'
        items={[
          { link: '/admin/orders/me', title: 'My list', variant: 'subtitle2' },
          { link: '/admin/orders', title: 'Manager', variant: 'subtitle2' },
        ]}
      />

      {/* Product */}
      <MultiMenuItem
        icon={<FastfoodIcon />}
        label='Food'
        items={[
          { link: '/admin/products/add', title: 'New food', variant: 'subtitle2' },
          { link: '/admin/products', title: 'Food manager', variant: 'subtitle2' },
        ]}
      />

      {/* Employee */}
      <SingleMenuItem icon={<AccountBoxIcon />} link='/admin/employees' title='Employee' />
    </List>
  );
}
