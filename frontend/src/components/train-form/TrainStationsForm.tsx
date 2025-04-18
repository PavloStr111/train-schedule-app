import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TrainDto, Station } from '../../types/Train';

export default function TrainStationsForm({
  register, errors, stations
}: {
  register: UseFormRegister<TrainDto>,
  errors: FieldErrors<TrainDto>,
  stations: Station[]
}) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Departure station</label>
        <select className={`form-select ${errors.departureStation ? 'is-invalid' : ''}`} 
        {...register('departureStation', { required: 'Required' })}>

          <option value="">Select station</option>
          {stations.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}

        </select>
        {errors.departureStation && <div className="invalid-feedback">{errors.departureStation.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Arrival Station</label>
        <select className={`form-select ${errors.arrivalStation ? 'is-invalid' : ''}`} 
        {...register('arrivalStation', { required: 'Required' })}>

          <option value="">Select station</option>
          {stations.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          
        </select>
        {errors.arrivalStation && <div className="invalid-feedback">{errors.arrivalStation.message}</div>}
      </div>
    </>
  );
}
