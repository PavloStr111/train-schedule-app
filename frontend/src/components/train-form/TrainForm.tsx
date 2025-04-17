import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrainDto, toTrainDto, Station } from '../../types/Train';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  createTrain,
  updateTrain,
  getTrain,
  getStations
} from '../../services/trainService';
import { handleApiError } from '../../utils/errorHandler';

export default function TrainForm() {

  const { id } = useParams<{ id: string }>();

  // Whether it is a form for update or creation
  const isEdit = Boolean(id);

  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TrainDto>();

  const [stationOptions, setStationOptions] = useState<Station[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStations()
      .then(res => setStationOptions(res.data.data))
      .catch(err => setError(handleApiError(err)));

    if (isEdit) {
      getTrain(Number(id))
        .then(res => {
          const dto = toTrainDto(res.data.data);
          (Object.keys(dto) as (keyof TrainDto)[]).forEach(key => {
            setValue(key, dto[key]);
          });
        })
        .catch(err => setError(handleApiError(err)));
    }
  }, [id, isEdit, setValue]);

  const onSubmit = async (data: TrainDto) => {
    try {
      if(data.departureStation === data.arrivalStation)
        throw new Error("You cannot select the same station twice");
      console.log('Ku')
      console.log(data)
      if (isEdit) {
        
        await updateTrain(Number(id), data);
      }
      else {
        await createTrain(data);
      }

      nav('/trains');

    } catch (e) {
      setError(handleApiError(e));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">{isEdit ? 'Update' : 'Add'} train</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* List of label - input pairs */}
      {['trainNumber', 'direction', 'departureTime', 'arrivalTime'].map((field) => (

        <div className="mb-3" key={field}>
          <label className="form-label">{field}</label>
          <input
            type={field.includes('Time') ? 'datetime-local' : 'text'} // Special type for datetime values
            className={`form-control ${errors[field as keyof TrainDto] ? 'is-invalid' : ''}`} // styling in case of error
            {...register(field as keyof TrainDto, { required: true })}
          />
          {/* Error line */}
          {errors[field as keyof TrainDto] && (
            <div className="invalid-feedback">{
              errors[field as keyof TrainDto] ? 
                errors[field as keyof TrainDto]?.message: "Unknown error"}
            </div>
          )}
        </div>

      ))}

      {['departureStation', 'arrivalStation'].map((field) => (
        <div className="mb-3" key={field}>

          <label className="form-label">{field}</label>
          <select
            className={`form-select ${errors[field as keyof TrainDto] ? 'is-invalid' : ''}`}
            {...register(field as keyof TrainDto, { required: true })}
          >
            <option value="">Select station</option>
            {stationOptions.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Error line */}
          {errors[field as keyof TrainDto] && (
            <div className="invalid-feedback">{
              errors[field as keyof TrainDto] ? 
                errors[field as keyof TrainDto]?.message: "Unknown error"}
            </div>
          )}
        </div>
      ))}

      <button className="btn btn-success">{isEdit ? 'Update' : 'Create'}</button>
      <button className="btn btn-danger"><Link to='/trains'>Cancel</Link></button>
    </form>
  );
}
