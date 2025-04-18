import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Station, toTrainDto, TrainDto } from '../../types/Train';
import { useNavigate, useParams } from 'react-router-dom';
import { createTrain, updateTrain, getTrain, getStations } from '../../services/trainService';
import TrainDetailsForm from './TrainDetailsForm';
import TrainStationsForm from './TrainStationsForm';
import { handleApiError } from '../../utils/errorHandler';

export default function TrainFormWrapper() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<TrainDto>();

  const [stations, setStations] = useState<Station[]>();
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    getStations().then(res => setStations(res.data.data))
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
      if (data.departureStation === data.arrivalStation)
        throw new Error("Departure and arrival stations must be different.");
      if (new Date(data.arrivalTime) <= new Date(data.departureTime))
        throw new Error("Arrival time must be later than departure time.");

      isEdit
        ? await updateTrain(Number(id), data)
        : await createTrain(data);

      nav('/trains');
    } catch (e) {
      setError(handleApiError(e));
    }
  };





  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">{isEdit ? 'Update' : 'Add'} train</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <TrainDetailsForm register={register} errors={errors} />
      <TrainStationsForm register={register} errors={errors} stations={stations?stations:[]} />

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">{isEdit ? 'Update' : 'Create'}</button>
        <button type="button" className="btn btn-danger" onClick={() => nav('/trains')}>Cancel</button>
      </div>
    </form>
  );
}
