import {  useNavigate } from "react-router-dom"
import { deleteTrain } from "../../services/trainService";

export default function TrainElement({
    id, 
    trainNumber, 
    direction, 
    departureTime, 
    arrivalTime,
    departureStation, 
    arrivalStation, 
    
    load}: 
{
    id:number, 
    trainNumber:string, 
    direction:string, 
    departureStation:{id:number, name:string}, 
    arrivalStation:{id:number, name:string}, 
    departureTime:string, 
    arrivalTime:string,
    load: () => void
})
{

    const nav = useNavigate();

    const onDelete = async (id: number) => {
        try{
            if (window.confirm('Confirm train deletion')) {
                await deleteTrain(id);
                load();
            }
        }
        catch (e) {
            alert(`Something went wrong... ${e}`)
        }
    };
    
    return (<>
    <tr key={id}>
        <td>{trainNumber}</td>
        <td>{direction}</td>
        <td>{departureStation.name}</td>
        <td>{arrivalStation.name}</td>
        <td>{departureTime}</td>
        <td>{arrivalTime}</td>
        <td>
            <button className="btn btn-sm btn-warning me-2"
            onClick={() => nav(`/trains/${id}/edit`)}>
            Update
            </button>
            <button className="btn btn-sm btn-danger"
            onClick={() => onDelete(id)}>
            Delete
            </button>
        </td>
        </tr>
        </>)
}