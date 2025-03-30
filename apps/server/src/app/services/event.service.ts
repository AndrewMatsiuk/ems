import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(data: Partial<Event>) {
    const event = this.eventRepo.create(data);
    return await this.eventRepo.save(event);
  }

  async findAll(filters?: { category?: string; date?: string }) {
    const query = this.eventRepo.createQueryBuilder('event');

    if (filters?.category && filters.category !== 'all') {
      query.andWhere('event.category = :category', { category: filters.category });
    }

    if (filters?.date === 'newest') {
      query.orderBy('event.date', 'DESC');
    } else if (filters?.date === 'oldest') {
      query.orderBy('event.date', 'ASC');
    }

    return await query.getMany();
  }

  async findOne(id: number) {
    return await this.eventRepo.findOneBy({ id });
  }

  async update(id: number, data: Partial<Event>) {
    await this.eventRepo.update(id, data);
    return this.findOne(id); 
  }

  async delete(id: number) {
    return await this.eventRepo.delete(id);
  }
}
