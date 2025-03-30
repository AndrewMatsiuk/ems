'use client';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  { icon: <DashboardIcon />, label: 'Dashboard' },
  { icon: <EventIcon />, label: 'My Events' },
  { icon: <CalendarMonthIcon />, label: 'Calendar' },
  { icon: <MapIcon />, label: 'Map View' },
  { icon: <SettingsIcon />, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Box display="flex" flexDirection="column" height="100%">
        <Box p={2}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            EventFlow
          </Typography>
        </Box>

        <List>
          {navItems.map((item) => (
            <ListItem key={item.label}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
