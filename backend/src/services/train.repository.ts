import { AppDataSource } from "../data-source";
import { Train } from "../entity/Train";
import { Station } from "../entity/Station";
import { AppError } from "../errors/AppError";

const trainRepository = AppDataSource.getRepository(Train);
const stationRepository = AppDataSource.getRepository(Station);

export class TrainService{

    static async getAllTrains(): Promise<Train[]> {

        return await trainRepository.find();
    }

    static async getTrain(id: number): Promise<Train> {

        return await trainRepository.findOneBy({id: id});
    }
    static async getPaginatedTrains({ skip, limit }: { skip: number; limit: number }) {
        return trainRepository.findAndCount({
            skip, take: limit, order: {id: 'asc'}
        });
    }
    static async countTrains() {
        return trainRepository.count();
    }

    static async createTrain(
        trainNumber: string, 
        direction: string, 
        departureStationName: string,
        arrivalStationName: string, 
        departureTime: Date,
        arrivalTime: Date
    ): Promise<Train> {

        let arrivalStation = await stationRepository.findOneBy({ name: arrivalStationName });
        if (!arrivalStation) {
            arrivalStation = stationRepository.create({ name: arrivalStationName });
            arrivalStation = await stationRepository.save(arrivalStation);
        }

        let departureStation = await stationRepository.findOneBy({ name: departureStationName });
        if (!departureStation) {
            departureStation = stationRepository.create({ name: departureStationName });
            departureStation = await stationRepository.save(departureStation);
        }

        const train = trainRepository.create({ 
            trainNumber: trainNumber, 
            direction: direction, 
            departureStationId: departureStation.id, 
            arrivalStationId: arrivalStation.id, 
            departureTime: departureTime, 
            arrivalTime: arrivalTime
        });

        return await trainRepository.save(train);
    }

    static async updateTrain(
        trainId: number,
        trainNumber: string, 
        direction: string, 
        departureStationName: string,
        arrivalStationName: string, 
        departureTime: Date,
        arrivalTime: Date
    ): Promise<Train> {
        let train = await trainRepository.findOne({
            where: { id: trainId },
            relations: ['departureStation', 'arrivalStation'],
        });
    
        if (!train) {
            throw new AppError('Train for update not found', 404);
        }
    
        const departureStation = await stationRepository.findOneBy({ name: departureStationName });
        const arrivalStation = await stationRepository.findOneBy({ name: arrivalStationName });
    
        if (!departureStation || !arrivalStation) {
            throw new AppError('One or both stations not found', 400);
        }
    
        train.trainNumber = trainNumber;
        train.direction = direction;
        train.departureStation = departureStation;
        train.arrivalStation = arrivalStation;
        train.departureTime = departureTime;
        train.arrivalTime = arrivalTime;
    
        return await trainRepository.save(train);
    }

    static async deleteTrain(trainId: number): Promise<void> {

        const train = await trainRepository.findOneBy({ id: trainId });

        if (!train) 
            throw new AppError("Train not found", 404);
        await trainRepository.remove(train);
    }
}