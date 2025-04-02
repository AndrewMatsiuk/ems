'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { eventService } from '@/services/eventService';
import { CreateEventDto, EventContextType, EventItem } from '@/types';

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<EventItem[]>([]);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAll();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events', err);
    }
  };

  const createEvent = async (data: CreateEventDto) => {
    try {
      console.log(data);
      const newEvent = await eventService.create(data);
      setEvents((prev) => [newEvent, ...prev]);
    } catch (err) {
      console.error('Failed to create event', err);
    }
  };

  const updateEvent = async (id: number, data: Partial<EventItem>) => {
    try {
      const updated = await eventService.update(id, data);
      setEvents((prev) => prev.map((e) => (e.id === id ? updated : e)));
      await fetchEvents();
    } catch (err) {
      console.error('Failed to update event', err);
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await eventService.delete(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Failed to delete event', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{ events, fetchEvents, createEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};
