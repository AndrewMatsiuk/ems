'use client';

import DashboardIcon from '@mui/icons-material/Dashboard';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();

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
          <ListItem onClick={() => router.push('/')}>
            <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
