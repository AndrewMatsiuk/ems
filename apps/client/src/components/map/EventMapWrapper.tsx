'use client';

import dynamic from 'next/dynamic';
import { CircularProgress, Box } from '@mui/material';
import { EventItem } from '@/types';

interface Props {
  events: EventItem[];
  fullScreen?: boolean;
}

const EventMap = dynamic(() => import('./EventMap'), {
  ssr: false,
  loading: () => (
    <Box display="flex" justifyContent="center" alignItems="center" height="400px">
      <CircularProgress />
    </Box>
  ),
});

export default function EventMapWrapper({ events, fullScreen = false }: Props) {
  return <EventMap events={events} fullScreen={fullScreen} />;
}
