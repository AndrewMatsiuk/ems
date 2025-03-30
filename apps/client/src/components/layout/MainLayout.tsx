'use client';

import { Box } from '@mui/material';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useState } from 'react';
import CreateEventModal from '../events/CreateEventForm';
import EventList from '../events/EventList';
export default function MainLayout() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState<string>('all');
    const [sort, setSort] = useState<string>('newest');
    const [search, setSearch] = useState<string>('');
  
    return (
      <Box display="flex" height="100vh">
        <Box width="240px" borderRight="1px solid #e0e0e0">
          <Sidebar />
        </Box>
  
        <Box flex={1} display="flex" flexDirection="column" px={4} py={2}>
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
          <Box mt={2} flex={1} overflow="auto">
            <EventList category={category} sort={sort} search={search} />
          </Box>
        </Box>
      </Box>
    );
  }