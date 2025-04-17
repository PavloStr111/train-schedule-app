import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TrainDto, toTrainDto, Station } from '../../types/Train';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createTrain,
  updateTrain,
  getTrain,
  getStations
} from '../../services/trainService';
import { handleApiError } from '../../utils/errorHandler';

export default function TrainForm() {
  const { id } = useParams<{ id: string }>();
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
      if (isEdit) await updateTrain(Number(id), data);
      else await createTrain(data);
      nav('/trains');
    } catch (e) {
      setError(handleApiError(e));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">{isEdit ? 'Оновити' : 'Додати'} поїзд</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {['trainNumber', 'direction', 'departureTime', 'arrivalTime'].map((field) => (
        <div className="mb-3" key={field}>
          <label className="form-label">{field}</label>
          <input
            type={field.includes('Time') ? 'datetime-local' : 'text'}
            className={`form-control ${errors[field as keyof TrainDto] ? 'is-invalid' : ''}`}
            {...register(field as keyof TrainDto, { required: true })}
          />
          {errors[field as keyof TrainDto] && (
            <div className="invalid-feedback">Це поле обов’язкове</div>
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
            <option value="">Оберіть станцію</option>
            {stationOptions.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          {errors[field as keyof TrainDto] && (
            <div className="invalid-feedback">Станцію обов'язково обрати</div>
          )}
        </div>
      ))}

      <button className="btn btn-success">{isEdit ? 'Оновити' : 'Створити'}</button>
    </form>
  );
}
