import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TrainDto } from '../../types/Train';

export default function TrainDetailsForm({
  register, errors
}: {
  register: UseFormRegister<TrainDto>,
  errors: FieldErrors<TrainDto>
}) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Train Number</label>
        <input type="text" className={`form-control ${errors.trainNumber ? 'is-invalid' : ''}`} 
        {...register('trainNumber', { required: 'Train number is required' })} />
        {errors.trainNumber && <div className="invalid-feedback">{errors.trainNumber.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Direction</label>
        <select className={`form-select ${errors.direction ? 'is-invalid' : ''}`} 
        {...register('direction', { required: 'Required' })}>
          <option value="">Select station</option>
          <option value="backward">backward</option>
          <option value="forward">forward</option>
        </select>
        {errors.direction && <div className="invalid-feedback">{errors.direction.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Departure Time</label>
        <input type="datetime-local" className={`form-control ${errors.departureTime ? 'is-invalid' : ''}`} 
        {...register('departureTime', { required: 'Departure time is required' })} />
        {errors.departureTime && <div className="invalid-feedback">{errors.departureTime.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Arrival Time</label>
        <input type="datetime-local" className={`form-control ${errors.arrivalTime ? 'is-invalid' : ''}`} {...register('arrivalTime', { required: 'Arrival time is required' })} />
        {errors.arrivalTime && <div className="invalid-feedback">{errors.arrivalTime.message}</div>}
      </div>
    </>
  );
}
