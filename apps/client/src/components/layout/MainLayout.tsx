'use client';

import { useEventContext } from '@/context/EventContext';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import CreateEventModal from '../events/CreateEventForm';
import EventList from '../events/EventList';
import EventMapWrapper from '../map/EventMapWrapper';
import Topbar from './Topbar';
import MapSection from '../map/MapSection';

export default function MainLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<string>('newest');
  const [search, setSearch] = useState<string>('');
  const { events } = useEventContext();

  return (
    <Box bgcolor="#f9fafb" minHeight="100vh">
      <Topbar
        onCreateClick={() => setIsModalOpen(true)}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onSearchChange={setSearch}
      />

      <CreateEventModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Container maxWidth="lg">
        {/* Event list section */}
        <Box mt={4}>
          <EventList category={category} sort={sort} search={search} />
        </Box>

        {/* Map section */}
        <Box mt={6}>
          <MapSection events={events} />
        </Box>
      </Container>
    </Box>
  );
}
