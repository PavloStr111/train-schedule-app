import React, { useEffect, useState } from 'react';
import { getTrains, deleteTrain } from '../../services/trainService';
import { Train } from '../../types/Train';
import { useNavigate } from 'react-router-dom';
import TrainElement from './TrainElement';

export default function TrainList() {

    const [trains, setTrains] = useState<Train[]>([]);

    const nav = useNavigate();

    const load = async () => {
        const res = await getTrains();
        console.log(res.data.data)
        setTrains(res.data.data);
    };

    useEffect(() => { 
        load(); 
    }, []);

    return (
        <div className="container mt-4">
        <button className="btn btn-primary mb-3" onClick={() => nav('/trains/new')}>
            Add train
        </button>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Train number</th>
                <th>Direction</th>
                <th>Departure station</th>
                <th>Arrival station</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
            </tr>
            </thead>
            <tbody>
            {trains.map(t => (
                <TrainElement key={t.id} {...t} load={load}/>
            ))}
            </tbody>
        </table>
        </div>
    );
}
