'use client';

import { Box, Typography, Button, Dialog, DialogContent, IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import EventMapWrapper from './EventMapWrapper'; 
import { EventItem } from '@/types';

interface Props {
  events: EventItem[];
}

export default function MapSection({ events }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Box mt={6} p={3} bgcolor="#f9f9f9" borderRadius={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Event Locations</Typography>
        <Button
          variant="outlined"
          startIcon={<MapIcon />}
          onClick={() => setOpen(true)}
        >
          View Full Map
        </Button>
      </Box>

      <EventMapWrapper events={events} fullScreen={false} />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen
      >
        <DialogContent sx={{ p: 0 }}>
          <Box position="absolute" top={8} right={16} zIndex={999}>
            <IconButton onClick={() => setOpen(false)} sx={{ bgcolor: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <EventMapWrapper events={events} fullScreen />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
