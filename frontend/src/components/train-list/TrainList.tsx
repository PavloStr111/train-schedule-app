import React, { useEffect, useState } from 'react';
import { getTrains, deleteTrain } from '../../services/trainService';
import { Train } from '../../types/Train';
import { useNavigate } from 'react-router-dom';

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

    const onDelete = async (id: number) => {
        if (window.confirm('Confirm train deletion')) {
            await deleteTrain(id);
            load();
        }
    };

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
                <tr key={t.id}>
                <td>{t.trainNumber}</td>
                <td>{t.direction}</td>
                <td>{t.departureStation.name}</td>
                <td>{t.arrivalStation.name}</td>
                <td>{t.departureTime}</td>
                <td>{t.arrivalTime}</td>
                <td>
                    <button className="btn btn-sm btn-warning me-2"
                    onClick={() => nav(`/trains/${t.id}/edit`)}>
                    Update
                    </button>
                    <button className="btn btn-sm btn-danger"
                    onClick={() => onDelete(t.id)}>
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}
