import { Train, Station, TrainDto } from '../types/Train';
import api from './api';

export const getTrains = () => 
  api.get<{ data: Train[] }>('/trains');

export const getTrain = (id: number) => 
  api.get<{ data: Train }>('/trains/' + id);

export const getPaginatedTrains = (page: number) =>
  api.get<{ data:  {trains: Train[], total: number, pageNum: number, totalPages: number }}>
  ('/trains/', {
      params: {
        page: page,
        size: 5
        
      }});

export const createTrain = (dto: TrainDto) => 
  api.post('/trains', dto);

export const updateTrain = (id: number, dto: TrainDto) => 
  api.put('/trains/' + id, dto);

export const deleteTrain = (id: number) => 
  api.delete('/trains/' + id);

export const getStations = (search?: string) =>
  api.get<{ data: Station[] }>('/stations', {
    params: search ? { q: search } : {},
  });