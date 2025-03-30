'use client';

import EventCard from './EventCard';
import { useEventContext } from '@/context/EventContext';

interface EventListProps {
    category: string;
    sort: string;
    search: string;
  }
  
  export default function EventList({ category, sort, search }: EventListProps) {
    const { events } = useEventContext();
  
    const filtered = events
    .filter(event =>
      category === 'all' || event.category?.toLowerCase() === category.toLowerCase()
    )
    .filter(event =>
      (event.title?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (event.description?.toLowerCase() || '').includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sort === 'newest' ? dateB - dateA : dateA - dateB;
    });
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((event, index) => (
          <EventCard key={event.id ?? index} {...event} />
        ))}
      </div>
    );
  }
