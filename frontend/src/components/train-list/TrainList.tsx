import { useEffect, useState } from 'react';
import { getTrains } from '../../services/trainService';
import { Train } from '../../types/Train';
import { useNavigate } from 'react-router-dom';
import TrainElement from './TrainElement';

export default function TrainList() {

    const [trains, setTrains] = useState<Train[]>([]);

    const nav = useNavigate();

    const load = async () => {
        try{
            const res = await getTrains();
            setTrains(res.data.data);
        }
        catch (e) {
            alert(`Error when loading ${e}`)
        }
    };
    const logout = ()=>{
        localStorage.removeItem('token');
        nav('/login');
    }

    useEffect(() => { 
        load(); 
    }, []);

    return (
        <div className="container mt-4">
        <div className='container d-flex justify-content-end'>
            <button className='btn btn-outline-danger' onClick={logout}>Log out</button>
                
        </div>
        <div className='container '>
            <h2 className='text-center text-bold'>Train Schedule</h2>
            </div>
            <div className='container mt-4 d-flex justify-content-start'>
            <button className="btn btn-primary mb-3 text-center" onClick={() => nav('/trains/new')}>
                Add train
            </button>
            </div>
                
        
        
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
            {
                (!trains ) ? 
                <p>There no trains yet...</p>
                : trains.map(t => (
                    <TrainElement key={t.id} {...t} load={load}/>
            ))}
            </tbody>
        </table>
        </div>
    );
}
