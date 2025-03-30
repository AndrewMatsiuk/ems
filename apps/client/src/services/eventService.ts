import { api } from "@/api/api";

export interface EventItem {
    id: number;
    title: string;
    date: string;
    location: string;
    category: string;
    description: string;
    imageUrl: string;
}

export interface CreateEventDtoI {
    title: string;
    date: string;
    location: string;
    category: string;
    description: string;
    imageUrl: string;
  }

export type CreateEventDto = Omit<EventItem, 'id'>;

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
      body: JSON.stringify(data),
    }),
  update: (id: number, data: Partial<EventItem>) =>
    api<EventItem>(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    api(`/events/${id}`, {
      method: 'DELETE',
    }),
};
