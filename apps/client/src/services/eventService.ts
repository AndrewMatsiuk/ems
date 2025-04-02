import { api } from "@/api/api";
import { CreateEventDtoI, EventItem } from '@/types';

export const eventService = {
  getAll: (filters?: { category?: string; date?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters?.date) {
      params.append('date', filters.date);
    }

    const query = params.toString() ? `?${params.toString()}` : '';
    return api<EventItem[]>(`/events${query}`);
  },

  getById: (id: number) => api<EventItem>(`/events/${id}`),

  create: (data: CreateEventDtoI) =>
    api<EventItem>('/events', {
      method: 'POST',
      data,
    }),

  update: (id: number, data: Partial<EventItem>) =>
    api<EventItem>(`/events/${id}`, {
      method: 'PUT',
      data,
    }),

  delete: (id: number) =>
    api(`/events/${id}`, {
      method: 'DELETE',
    }),
};
